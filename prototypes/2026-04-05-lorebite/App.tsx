function App() {
  const { useState, useEffect, useRef } = React;
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const themes = {
    light: {
      bg: '#FEF2F2',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF5F5',
      primary: '#DC2626',
      secondary: '#F87171',
      cta: '#CA8A04',
      text: '#1A0A0A',
      textSecondary: '#6B2020',
      textMuted: '#9B6060',
      border: '#FECACA',
      navBg: '#FFFFFF',
      cardShadow: '0 4px 20px rgba(220, 38, 38, 0.10)',
      mapBg: '#FFF0E5',
      inputBg: '#FFF8F8',
    },
    dark: {
      bg: '#1A0A0A',
      surface: '#2A1010',
      surfaceAlt: '#3A1818',
      primary: '#F87171',
      secondary: '#DC2626',
      cta: '#FCD34D',
      text: '#FEF2F2',
      textSecondary: '#FECACA',
      textMuted: '#C08080',
      border: '#4A2020',
      navBg: '#200E0E',
      cardShadow: '0 4px 20px rgba(0,0,0,0.4)',
      mapBg: '#1F1508',
      inputBg: '#2A1010',
    }
  };

  const t = themes[isDark ? 'dark' : 'light'];

  const styleContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@400;700&family=Karla:wght@300;400;500;600;700&display=swap');

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.06); opacity: 0.85; }
    }
    @keyframes shimmer {
      0% { background-position: -300% center; }
      100% { background-position: 300% center; }
    }
    @keyframes mapPop {
      0%, 100% { transform: translate(-50%, -100%) scale(1); }
      50% { transform: translate(-50%, -100%) scale(1.18); }
    }
    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-4px); opacity: 1; }
    }
    .lore-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .lore-card:hover { transform: translateY(-3px); }
    .btn-press:active { transform: scale(0.95) !important; }
    .nav-tab { transition: opacity 0.15s ease; }
    .nav-tab:active { opacity: 0.6; }
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 0; }
  `;

  const loreBites = [
    {
      id: 1,
      title: "The Forgotten Saffron of Valencia",
      location: "Old Quarter · 0.3 mi",
      story: "Medieval silk merchants once cultivated saffron in these very cobblestone streets. Revive the lost paella negra recipe that sustained an empire's trade routes.",
      difficulty: "Medium",
      active: true,
      category: "Recipe Revival",
      color: '#DC2626',
      accent: '#CA8A04',
      tags: ['Saffron', 'Medieval', 'Paella'],
    },
    {
      id: 2,
      title: "Grandmother's Fermented Honey",
      location: "River District · 0.8 mi",
      story: "Beekeepers along the Millbrook have kept mead-making secrets for over 400 years. This is one of the last surviving recipes from a vanishing tradition.",
      difficulty: "Easy",
      active: false,
      category: "Ingredient Folklore",
      color: '#CA8A04',
      accent: '#F87171',
      tags: ['Honey', 'Mead', 'Artisan'],
    },
    {
      id: 3,
      title: "The Baker's Guild Sourdough",
      location: "Market Square · 1.2 mi",
      story: "A 200-year-old starter culture was rediscovered behind a market wall last spring. Bakers' guilds once protected this formula with sworn oaths.",
      difficulty: "Hard",
      active: true,
      category: "Ancestral Recipe",
      color: '#7C2D12',
      accent: '#F87171',
      tags: ['Sourdough', 'Guild', 'Heritage'],
    },
  ];

  const communityPosts = [
    {
      id: 1,
      user: "María C.",
      avatar: "MC",
      avatarColor: '#DC2626',
      dish: "Saffron Paella Negra Revival",
      time: "2h ago",
      likes: 47,
      comments: 12,
      gradient: 'linear-gradient(135deg, #DC2626 0%, #CA8A04 100%)',
      caption: "Finally attempted the Valencia saffron lore bite! Used local squid ink from the harbor market. The flavors are unlike anything I've tasted — history on a plate.",
      badges: ['Heritage Keeper', '7-day streak'],
    },
    {
      id: 2,
      user: "James R.",
      avatar: "JR",
      avatarColor: '#CA8A04',
      dish: "River District Wildflower Mead",
      time: "5h ago",
      likes: 23,
      comments: 8,
      gradient: 'linear-gradient(135deg, #CA8A04 0%, #F87171 100%)',
      caption: "Week 3 of the honey fermentation journey. The Millbrook beekeepers actually stopped by to taste it — they said it reminds them of the old way.",
      badges: ['Local Legend'],
    },
    {
      id: 3,
      user: "Priya S.",
      avatar: "PS",
      avatarColor: '#7C2D12',
      dish: "Baker's Guild Sourdough Day 14",
      time: "1d ago",
      likes: 89,
      comments: 31,
      gradient: 'linear-gradient(135deg, #7C2D12 0%, #DC2626 100%)',
      caption: "The 200-year starter is thriving. My loaves now carry that characteristic tang the guild archives described. This lore bite changed how I think about bread.",
      badges: ['Culinary Scholar', 'Top Contributor'],
    },
  ];

  const foragerQuests = [
    {
      id: 1,
      title: "Dawn Market Run",
      location: "Old Quarter Market",
      distance: "0.4 mi",
      reward: "+150 Heritage Points",
      ingredients: ["Wild saffron threads", "Local squid ink", "Stone-ground flour"],
      deadline: "Ends Sunday",
      progress: 2,
      total: 3,
      color: '#DC2626',
    },
    {
      id: 2,
      title: "River Honey Trail",
      location: "Millbrook Apiary",
      distance: "1.1 mi",
      reward: "+200 Heritage Points",
      ingredients: ["Raw wildflower honey", "River herbs", "Beeswax"],
      deadline: "Ends in 4 days",
      progress: 1,
      total: 3,
      color: '#CA8A04',
    },
  ];

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  function HomeScreen() {
    const [hoveredCard, setHoveredCard] = useState(null);
    const MapPin = window.lucide.MapPin;
    const Flame = window.lucide.Flame;
    const ChevronRight = window.lucide.ChevronRight;
    const Sun = window.lucide.Sun;
    const Moon = window.lucide.Moon;
    const Sparkles = window.lucide.Sparkles;
    const TrendingUp = window.lucide.TrendingUp;

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Karla', sans-serif", animation: 'fadeIn 0.35s ease' }
    },
      // ── Header
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.textMuted, fontSize: 12, margin: '0 0 2px', fontFamily: "'Karla', sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' } }, 'Good morning, Keeper'),
            React.createElement('h1', { style: { fontFamily: "'Playfair Display SC', serif", color: t.primary, fontSize: 28, fontWeight: 700, margin: 0, lineHeight: 1.1 } }, 'LoreBite'),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 } },
            React.createElement('button', {
              onClick: () => setIsDark(!isDark),
              style: { background: t.surface, border: `1.5px solid ${t.border}`, borderRadius: 20, width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, React.createElement(isDark ? Sun : Moon, { size: 16, color: t.primary })),
            React.createElement('div', {
              style: { background: 'linear-gradient(135deg, #DC2626, #CA8A04)', borderRadius: 20, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 5, animation: 'pulse 2.5s infinite' }
            },
              React.createElement(Flame, { size: 14, color: '#fff' }),
              React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: "'Karla', sans-serif" } }, '7 Day Streak'),
            ),
          ),
        ),

        // ── Heritage bar
        React.createElement('div', {
          style: { marginTop: 18, background: t.surface, borderRadius: 18, padding: 16, boxShadow: t.cardShadow, border: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(TrendingUp, { size: 14, color: t.cta }),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, 'Heritage Points'),
            ),
            React.createElement('span', { style: { fontSize: 16, fontWeight: 700, color: t.cta, fontFamily: "'Playfair Display SC', serif" } }, '1,240'),
          ),
          React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', {
              style: { height: '100%', width: '72%', borderRadius: 4, background: 'linear-gradient(90deg, #DC2626, #CA8A04, #F87171, #CA8A04)', backgroundSize: '300% auto', animation: 'shimmer 3s linear infinite' }
            }),
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 7 } },
            React.createElement('span', { style: { fontSize: 10, color: t.primary, fontFamily: "'Karla', sans-serif", fontWeight: 700 } }, 'Heritage Keeper'),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, '484 pts to Cultural Guardian'),
          ),
        ),
      ),

      // ── Today's Challenge Banner
      React.createElement('div', {
        style: { margin: '18px 20px 0', background: 'linear-gradient(130deg, #DC2626 0%, #7C2D12 60%, #CA8A04 100%)', borderRadius: 20, padding: '18px 18px', position: 'relative', overflow: 'hidden', cursor: 'pointer' },
        onClick: () => setActiveScreen('ai'),
      },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 10px)' } }),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
            React.createElement(Sparkles, { size: 13, color: '#FCD34D' }),
            React.createElement('span', { style: { fontSize: 10, color: '#FCD34D', fontFamily: "'Karla', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' } }, "Today's Lore Bite Challenge"),
          ),
          React.createElement('h3', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 16, color: '#fff', margin: '0 0 6px', lineHeight: 1.3 } }, 'The Forgotten Saffron of Valencia'),
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: '0 0 14px', lineHeight: 1.4, fontFamily: "'Karla', sans-serif" } }, 'Revive a 600-year-old paella negra recipe using saffron from the Old Quarter market.'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              ...['Saffron', 'Squid Ink', 'Heritage Rice'].map(tag =>
                React.createElement('span', { key: tag, style: { fontSize: 10, background: 'rgba(255,255,255,0.18)', color: '#fff', padding: '3px 8px', borderRadius: 10, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, tag)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '6px 12px' } },
              React.createElement('span', { style: { fontSize: 12, color: '#fff', fontFamily: "'Karla', sans-serif", fontWeight: 700 } }, 'Start Cooking'),
              React.createElement(ChevronRight, { size: 13, color: '#fff' }),
            ),
          ),
        ),
      ),

      // ── Nearby Lore Bites
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, 'Nearby Lore Bites'),
          React.createElement('button', {
            onClick: () => setActiveScreen('map'),
            style: { display: 'flex', alignItems: 'center', gap: 2, background: 'none', border: 'none', color: t.primary, fontSize: 13, cursor: 'pointer', fontFamily: "'Karla', sans-serif", fontWeight: 700, padding: 0 }
          }, React.createElement('span', null, 'View Map'), React.createElement(ChevronRight, { size: 14 })),
        ),

        ...loreBites.map((bite, i) =>
          React.createElement('div', {
            key: bite.id,
            className: 'lore-card btn-press',
            onMouseEnter: () => setHoveredCard(bite.id),
            onMouseLeave: () => setHoveredCard(null),
            onClick: () => setActiveScreen('ai'),
            style: {
              background: t.surface, borderRadius: 20, overflow: 'hidden', marginBottom: 14,
              boxShadow: hoveredCard === bite.id ? `0 10px 32px rgba(220,38,38,0.2)` : t.cardShadow,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', { style: { height: 5, background: `linear-gradient(90deg, ${bite.color}, ${bite.accent})` } }),
            React.createElement('div', { style: { padding: '14px 16px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
                React.createElement('div', { style: { flex: 1, paddingRight: 10 } },
                  React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: bite.color, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Karla', sans-serif" } }, bite.category),
                  React.createElement('h3', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 15, fontWeight: 700, color: t.text, margin: '4px 0 6px', lineHeight: 1.3 } }, bite.title),
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 } },
                  bite.active && React.createElement('div', { style: { background: 'linear-gradient(135deg, #DC2626, #CA8A04)', borderRadius: 10, padding: '4px 9px', fontSize: 10, color: '#fff', fontWeight: 700, fontFamily: "'Karla', sans-serif", whiteSpace: 'nowrap' } }, 'Active'),
                  React.createElement('span', { style: { fontSize: 10, background: t.surfaceAlt, color: t.textSecondary, padding: '3px 8px', borderRadius: 8, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, bite.difficulty),
                ),
              ),
              React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, lineHeight: 1.5, margin: '0 0 12px', fontFamily: "'Karla', sans-serif" } }, bite.story),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(MapPin, { size: 12, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, bite.location),
                ),
                React.createElement('div', { style: { display: 'flex', gap: 6 } },
                  ...bite.tags.slice(0, 2).map(tag =>
                    React.createElement('span', { key: tag, style: { fontSize: 10, background: t.surfaceAlt, color: t.textSecondary, padding: '3px 8px', borderRadius: 8, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, tag)
                  )
                ),
              ),
            ),
          )
        ),
      ),

      React.createElement('div', { style: { height: 80 } }),
    );
  }

  // ─── MAP SCREEN ────────────────────────────────────────────────────────────
  function MapScreen() {
    const [selectedPin, setSelectedPin] = useState(null);
    const MapPin = window.lucide.MapPin;
    const X = window.lucide.X;
    const ChevronRight = window.lucide.ChevronRight;
    const Navigation = window.lucide.Navigation;
    const Compass = window.lucide.Compass;

    const mapPins = [
      { id: 1, x: 54, y: 30, label: "Saffron Quarter", color: '#DC2626', bite: loreBites[0] },
      { id: 2, x: 22, y: 58, label: "River District", color: '#CA8A04', bite: loreBites[1] },
      { id: 3, x: 71, y: 62, label: "Market Square", color: '#7C2D12', bite: loreBites[2] },
      { id: 4, x: 38, y: 82, label: "Spice Alley", color: '#F87171', bite: null },
      { id: 5, x: 82, y: 38, label: "Grain Mill", color: '#CA8A04', bite: null },
    ];

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: "'Karla', sans-serif", display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.35s ease' }
    },
      React.createElement('div', { style: { padding: '20px 20px 14px', flexShrink: 0 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
          React.createElement('div', null,
            React.createElement('h2', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 24, color: t.primary, margin: 0 } }, 'Lore Map'),
            React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '4px 0 0', fontFamily: "'Karla', sans-serif" } }, '5 Lore Bites within 2 miles'),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: t.surface, borderRadius: 12, padding: '7px 12px', border: `1px solid ${t.border}` } },
            React.createElement(Navigation, { size: 13, color: t.primary }),
            React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, 'Old Quarter'),
          ),
        ),
      ),

      // ── Map Canvas
      React.createElement('div', {
        style: { margin: '0 16px', borderRadius: 24, overflow: 'hidden', position: 'relative', height: 310, background: t.mapBg, border: `2px solid ${t.border}`, boxShadow: t.cardShadow, flexShrink: 0 }
      },
        // Grid
        ...Array.from({ length: 5 }, (_, i) =>
          React.createElement('div', { key: `h${i}`, style: { position: 'absolute', left: 0, right: 0, top: `${(i + 1) * 16.6}%`, height: 1, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' } })
        ),
        ...Array.from({ length: 5 }, (_, i) =>
          React.createElement('div', { key: `v${i}`, style: { position: 'absolute', top: 0, bottom: 0, left: `${(i + 1) * 16.6}%`, width: 1, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' } })
        ),
        // Streets
        React.createElement('div', { style: { position: 'absolute', left: '15%', right: '12%', top: '50%', height: 4, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', borderRadius: 2 } }),
        React.createElement('div', { style: { position: 'absolute', left: '15%', right: '25%', top: '35%', height: 3, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: 2, transform: 'rotate(-6deg)' } }),
        React.createElement('div', { style: { position: 'absolute', left: '50%', top: '10%', bottom: '10%', width: 4, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', borderRadius: 2 } }),
        React.createElement('div', { style: { position: 'absolute', left: '30%', top: '20%', bottom: '30%', width: 3, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: 2, transform: 'rotate(8deg)' } }),
        // Blocks (buildings)
        ...[[18, 15, 24, 20], [60, 12, 18, 15], [72, 28, 16, 14], [15, 66, 20, 16], [58, 68, 22, 18]].map(([x, y, w, h], i) =>
          React.createElement('div', { key: `b${i}`, style: { position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: 6 } })
        ),
        // User dot
        React.createElement('div', {
          style: { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 16, background: '#3B82F6', borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 0 0 6px rgba(59,130,246,0.25)', zIndex: 10 }
        }),
        // Pins
        ...mapPins.map(pin =>
          React.createElement('div', {
            key: pin.id,
            onClick: () => setSelectedPin(selectedPin?.id === pin.id ? null : pin),
            style: { position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -100%)', cursor: 'pointer', zIndex: pin.bite ? 8 : 5, animation: pin.bite ? 'mapPop 2.5s infinite' : 'none' }
          },
            React.createElement('div', {
              style: { width: pin.bite ? 44 : 32, height: pin.bite ? 44 : 32, background: selectedPin?.id === pin.id ? '#CA8A04' : pin.color, borderRadius: '50% 50% 50% 4px', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2.5px solid #fff', boxShadow: `0 4px 14px ${pin.color}55` }
            },
              React.createElement('div', { style: { transform: 'rotate(45deg)' } },
                React.createElement(MapPin, { size: pin.bite ? 18 : 13, color: '#fff' })
              )
            ),
          )
        ),
        // Legend
        React.createElement('div', {
          style: { position: 'absolute', bottom: 12, right: 12, background: isDark ? 'rgba(26,10,10,0.92)' : 'rgba(255,255,255,0.92)', borderRadius: 12, padding: '8px 12px', backdropFilter: 'blur(8px)', border: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 } },
            React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#3B82F6', border: '2px solid white' } }),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, 'You'),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement('div', { style: { width: 9, height: 9, background: '#DC2626', borderRadius: '50% 50% 50% 2px', transform: 'rotate(-45deg)' } }),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, 'Lore Bite'),
          ),
        ),
      ),

      // ── Pin Detail Card
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 16px 80px' } },
        selectedPin && selectedPin.bite &&
          React.createElement('div', {
            style: { background: t.surface, borderRadius: 20, overflow: 'hidden', marginBottom: 14, boxShadow: t.cardShadow, border: `1px solid ${t.border}`, animation: 'slideUp 0.25s ease' }
          },
            React.createElement('div', { style: { height: 4, background: `linear-gradient(90deg, ${selectedPin.color}, #CA8A04)` } }),
            React.createElement('div', { style: { padding: 16 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('h3', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 15, color: t.text, margin: 0, flex: 1, paddingRight: 8 } }, selectedPin.bite.title),
                React.createElement('button', { onClick: () => setSelectedPin(null), style: { background: 'none', border: 'none', cursor: 'pointer', padding: 2 } }, React.createElement(X, { size: 18, color: t.textMuted })),
              ),
              React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.5, fontFamily: "'Karla', sans-serif" } }, selectedPin.bite.story),
              React.createElement('button', {
                onClick: () => setActiveScreen('ai'),
                className: 'btn-press',
                style: { width: '100%', background: 'linear-gradient(135deg, #DC2626, #CA8A04)', color: '#fff', border: 'none', borderRadius: 14, padding: '13px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Karla', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44 }
              }, React.createElement('span', null, 'Start Cooking This Lore Bite'), React.createElement(ChevronRight, { size: 16, color: '#fff' })),
            ),
          ),

        // List
        React.createElement('h3', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 15, color: t.text, margin: '0 0 12px' } }, 'All Lore Bites Nearby'),
        ...loreBites.map(bite =>
          React.createElement('div', {
            key: bite.id,
            onClick: () => setActiveScreen('ai'),
            style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${t.border}`, cursor: 'pointer' }
          },
            React.createElement('div', { style: { width: 44, height: 44, background: bite.color, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(MapPin, { size: 20, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Karla', sans-serif" } }, bite.title),
              React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, bite.location),
            ),
            React.createElement(ChevronRight, { size: 16, color: t.textMuted }),
          )
        ),
      ),
    );
  }

  // ─── COMMUNITY SCREEN ──────────────────────────────────────────────────────
  function CommunityScreen() {
    const [likedPosts, setLikedPosts] = useState({});
    const Heart = window.lucide.Heart;
    const MessageCircle = window.lucide.MessageCircle;
    const Share2 = window.lucide.Share2;
    const Award = window.lucide.Award;
    const Plus = window.lucide.Plus;
    const Users = window.lucide.Users;

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: "'Karla', sans-serif", display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.35s ease' }
    },
      React.createElement('div', { style: { padding: '20px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 } },
        React.createElement('div', null,
          React.createElement('h2', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 22, color: t.primary, margin: 0 } }, 'Community Hearth'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 } },
            React.createElement('div', { style: { width: 7, height: 7, background: '#22C55E', borderRadius: '50%', animation: 'pulse 2s infinite' } }),
            React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0, fontFamily: "'Karla', sans-serif" } }, '128 neighbors cooking right now'),
          ),
        ),
        React.createElement('button', {
          className: 'btn-press',
          style: { width: 46, height: 46, background: 'linear-gradient(135deg, #DC2626, #CA8A04)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(220,38,38,0.35)' }
        }, React.createElement(Plus, { size: 22, color: '#fff' })),
      ),

      // Filter tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px 14px', overflowX: 'auto', flexShrink: 0 } },
        ...['For You', 'Trending', 'Following', 'Local'].map((tab, i) =>
          React.createElement('button', {
            key: tab,
            style: { background: i === 0 ? t.primary : t.surface, color: i === 0 ? '#fff' : t.textMuted, border: `1.5px solid ${i === 0 ? t.primary : t.border}`, borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Karla', sans-serif", minHeight: 34 }
          }, tab)
        )
      ),

      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 80px' } },
        ...communityPosts.map((post, i) =>
          React.createElement('div', {
            key: post.id,
            style: { background: t.surface, borderRadius: 22, overflow: 'hidden', marginBottom: 16, boxShadow: t.cardShadow, border: `1px solid ${t.border}`, animation: `slideUp 0.4s ease ${i * 0.1}s both` }
          },
            // Post header
            React.createElement('div', { style: { padding: '14px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', { style: { width: 42, height: 42, background: post.avatarColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Karla', sans-serif", flexShrink: 0 } }, post.avatar),
                React.createElement('div', null,
                  React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Karla', sans-serif" } }, post.user),
                  React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, post.time),
                ),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: t.surfaceAlt, borderRadius: 10, padding: '4px 9px' } },
                React.createElement(Award, { size: 11, color: t.cta }),
                React.createElement('span', { style: { fontSize: 10, color: t.textSecondary, fontFamily: "'Karla', sans-serif", fontWeight: 700 } }, post.badges[0]),
              ),
            ),
            // Image
            React.createElement('div', { style: { height: 190, background: post.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 9px)' } }),
              React.createElement('div', { style: { position: 'absolute', bottom: 12, left: 14, right: 14, background: 'rgba(0,0,0,0.45)', borderRadius: 12, padding: '8px 12px', backdropFilter: 'blur(6px)' } },
                React.createElement('p', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 13, color: '#fff', margin: 0, textAlign: 'center' } }, post.dish),
              ),
            ),
            // Caption + actions
            React.createElement('div', { style: { padding: '12px 16px 14px' } },
              React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, lineHeight: 1.55, margin: '0 0 12px', fontFamily: "'Karla', sans-serif" } }, post.caption),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('button', {
                  onClick: () => setLikedPosts(p => ({ ...p, [post.id]: !p[post.id] })),
                  className: 'btn-press',
                  style: { display: 'flex', alignItems: 'center', gap: 5, background: likedPosts[post.id] ? '#FEF2F2' : 'none', border: likedPosts[post.id] ? `1px solid #FECACA` : 'none', borderRadius: 10, padding: '7px 12px', cursor: 'pointer', minHeight: 44 }
                },
                  React.createElement(Heart, { size: 17, color: likedPosts[post.id] ? '#DC2626' : t.textMuted, fill: likedPosts[post.id] ? '#DC2626' : 'none' }),
                  React.createElement('span', { style: { fontSize: 13, color: likedPosts[post.id] ? '#DC2626' : t.textMuted, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, post.likes + (likedPosts[post.id] ? 1 : 0)),
                ),
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: '7px 12px', cursor: 'pointer', minHeight: 44 } },
                  React.createElement(MessageCircle, { size: 17, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, post.comments),
                ),
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: '7px 12px', cursor: 'pointer', marginLeft: 'auto', minHeight: 44 } },
                  React.createElement(Share2, { size: 17, color: t.textMuted }),
                ),
              ),
            ),
          )
        ),
      ),
    );
  }

  // ─── AI GUIDE SCREEN ───────────────────────────────────────────────────────
  function AIScreen() {
    const [messages, setMessages] = useState([
      { role: 'ai', text: "I'm your Local Kitchen AI Guide — I've mapped 3 active Lore Bites near you. The Saffron of Valencia story has the richest historical context this season. Shall I walk you through sourcing the ingredients and the 16th-century technique?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const Bot = window.lucide.Bot;
    const Send = window.lucide.Send;
    const ChefHat = window.lucide.ChefHat;
    const Leaf = window.lucide.Leaf;
    const BookOpen = window.lucide.BookOpen;
    const Sparkles = window.lucide.Sparkles;

    const aiResponses = [
      "For the Valencia Saffron Paella Negra, visit the Old Quarter market before 8am — heritage saffron growers sell their threads there. The medieval recipe calls for a 1:8 saffron-to-liquid ratio. I'd suggest substituting squid ink from the harbor for the traditional cuttlefish preparation. Would you like a step-by-step technique walkthrough?",
      "To maintain your 7-day streak, complete the saffron lore bite today. The Baker's Guild sourdough challenge expires in 48 hours. That 200-year starter needs feeding every 12h — I can send you a hydration schedule aligned with the guild's original notes.",
      "The River District honey fermentation takes 21 days minimum. Millbrook Apiary carries the specific wildflower variety from the 1847 folklore record. I've also found a local herb market at GPS coordinates near the river walk. Want me to add this to your active Forager Quest?",
      "The paella negra technique was documented in a 1612 merchant's ledger found in the Valencia archives. The key is toasting the rice in bone marrow fat before adding the saffron-infused stock — no stirring once the socarrat begins to form. Heritage Keepers who completed this bite report a 4.8/5 satisfaction rate.",
    ];

    const handleSend = () => {
      if (!input.trim()) return;
      const userMsg = { role: 'user', text: input };
      setMessages(m => [...m, userMsg]);
      setInput('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(m => [...m, { role: 'ai', text: aiResponses[Math.floor(Math.random() * aiResponses.length)] }]);
        if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 1400);
    };

    const quickPrompts = ["Guide me through Saffron Paella", "Find local ingredients nearby", "Explain the Baker's Guild lore", "How do I keep my streak?"];

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: "'Karla', sans-serif", display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.35s ease' }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 14px', borderBottom: `1px solid ${t.border}`, flexShrink: 0 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 } },
          React.createElement('div', { style: { width: 50, height: 50, background: 'linear-gradient(135deg, #DC2626, #CA8A04)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 3s infinite', boxShadow: '0 4px 14px rgba(220,38,38,0.3)' } },
            React.createElement(Bot, { size: 26, color: '#fff' })
          ),
          React.createElement('div', null,
            React.createElement('h2', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 18, color: t.text, margin: 0 } }, 'Kitchen AI Guide'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 } },
              React.createElement('div', { style: { width: 6, height: 6, background: '#22C55E', borderRadius: '50%' } }),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, margin: 0, fontFamily: "'Karla', sans-serif" } }, 'Hyper-local culinary heritage expert'),
            ),
          ),
        ),
        // Chip row
        React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 } },
          ...[{ icon: ChefHat, label: "Today's Lore" }, { icon: Leaf, label: 'Ingredients' }, { icon: BookOpen, label: 'History' }, { icon: Sparkles, label: 'My Streak' }].map(({ icon: Icon, label }) =>
            React.createElement('button', {
              key: label,
              onClick: () => { setInput(label); },
              style: { display: 'flex', alignItems: 'center', gap: 5, background: t.surface, border: `1.5px solid ${t.border}`, borderRadius: 20, padding: '6px 13px', fontSize: 11, color: t.textSecondary, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Karla', sans-serif", fontWeight: 600, minHeight: 34 }
            }, React.createElement(Icon, { size: 12, color: t.primary }), React.createElement('span', null, label))
          )
        ),
      ),

      // Messages
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 16px 8px' } },
        ...messages.map((msg, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12, alignItems: 'flex-end', gap: 8, animation: 'slideUp 0.25s ease' }
          },
            msg.role === 'ai' && React.createElement('div', { style: { width: 30, height: 30, background: 'linear-gradient(135deg, #DC2626, #CA8A04)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Bot, { size: 15, color: '#fff' })
            ),
            React.createElement('div', {
              style: { maxWidth: '76%', background: msg.role === 'ai' ? t.surface : 'linear-gradient(135deg, #DC2626, #CA8A04)', borderRadius: msg.role === 'ai' ? '16px 16px 16px 4px' : '16px 16px 4px 16px', padding: '11px 14px', border: msg.role === 'ai' ? `1px solid ${t.border}` : 'none', boxShadow: t.cardShadow }
            },
              React.createElement('p', { style: { margin: 0, fontSize: 13, color: msg.role === 'ai' ? t.text : '#fff', lineHeight: 1.55, fontFamily: "'Karla', sans-serif" } }, msg.text)
            ),
          )
        ),
        isTyping && React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 } },
          React.createElement('div', { style: { width: 30, height: 30, background: 'linear-gradient(135deg, #DC2626, #CA8A04)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Bot, { size: 15, color: '#fff' })
          ),
          React.createElement('div', { style: { background: t.surface, borderRadius: '16px 16px 16px 4px', padding: '12px 16px', border: `1px solid ${t.border}`, display: 'flex', gap: 5, alignItems: 'center' } },
            ...[0, 1, 2].map(i =>
              React.createElement('div', { key: i, style: { width: 7, height: 7, borderRadius: '50%', background: t.primary, animation: `typing 1.2s infinite ${i * 0.18}s` } })
            )
          ),
        ),
        React.createElement('div', { ref: messagesEndRef }),
      ),

      // Quick prompts
      React.createElement('div', { style: { padding: '0 16px 8px', display: 'flex', gap: 7, overflowX: 'auto', flexShrink: 0 } },
        ...quickPrompts.map(p =>
          React.createElement('button', {
            key: p,
            onClick: () => setInput(p),
            style: { background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 14, padding: '5px 11px', fontSize: 11, color: t.textSecondary, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Karla', sans-serif", fontWeight: 600 }
          }, p)
        )
      ),

      // Input
      React.createElement('div', { style: { padding: '8px 16px 82px', borderTop: `1px solid ${t.border}`, flexShrink: 0 } },
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('input', {
            value: input,
            onChange: e => setInput(e.target.value),
            onKeyDown: e => e.key === 'Enter' && handleSend(),
            placeholder: 'Ask about a Lore Bite...',
            style: { flex: 1, background: t.inputBg, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '12px 16px', fontSize: 13, color: t.text, fontFamily: "'Karla', sans-serif", outline: 'none', minHeight: 44 }
          }),
          React.createElement('button', {
            onClick: handleSend,
            className: 'btn-press',
            style: { width: 46, height: 46, background: input.trim() ? 'linear-gradient(135deg, #DC2626, #CA8A04)' : t.border, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: input.trim() ? 'pointer' : 'default', transition: 'background 0.2s ease', flexShrink: 0 }
          }, React.createElement(Send, { size: 18, color: '#fff' })),
        ),
      ),
    );
  }

  // ─── PROFILE / QUESTS SCREEN ───────────────────────────────────────────────
  function ProfileScreen() {
    const Trophy = window.lucide.Trophy;
    const MapPin = window.lucide.MapPin;
    const Calendar = window.lucide.Calendar;
    const ChevronRight = window.lucide.ChevronRight;
    const Flame = window.lucide.Flame;
    const Star = window.lucide.Star;
    const Compass = window.lucide.Compass;
    const Leaf = window.lucide.Leaf;

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: "'Karla', sans-serif", overflowY: 'auto', animation: 'fadeIn 0.35s ease' }
    },
      // Profile hero
      React.createElement('div', {
        style: { padding: '24px 20px 24px', background: 'linear-gradient(150deg, #DC2626 0%, #7C2D12 50%, #CA8A04 100%)', position: 'relative', overflow: 'hidden' }
      },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 11px)' } }),
        React.createElement('div', { style: { position: 'relative', display: 'flex', alignItems: 'center', gap: 14 } },
          React.createElement('div', { style: { width: 66, height: 66, background: 'rgba(255,255,255,0.22)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid rgba(255,255,255,0.4)', fontSize: 26, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display SC', serif", flexShrink: 0 } }, 'A'),
          React.createElement('div', null,
            React.createElement('h2', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 20, color: '#fff', margin: '0 0 4px' } }, 'Alex M.'),
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: 0, fontFamily: "'Karla', sans-serif" } }, 'Heritage Keeper · Old Quarter'),
          ),
        ),
        React.createElement('div', { style: { position: 'relative', display: 'flex', gap: 10, marginTop: 20 } },
          ...[{ label: 'Heritage Pts', value: '1,240' }, { label: 'Lore Bites', value: '23' }, { label: 'Day Streak', value: '7' }].map(s =>
            React.createElement('div', { key: s.label, style: { flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '10px 6px', textAlign: 'center', backdropFilter: 'blur(8px)' } },
              React.createElement('p', { style: { margin: 0, fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display SC', serif" } }, s.value),
              React.createElement('p', { style: { margin: '2px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: "'Karla', sans-serif" } }, s.label),
            )
          )
        ),
      ),

      // Badges
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h3', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 16, color: t.text, margin: '0 0 14px' } }, 'Your Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          ...[
            { name: 'Heritage Keeper', color: '#DC2626', icon: Trophy },
            { name: 'Streak Master', color: '#CA8A04', icon: Flame },
            { name: 'Map Explorer', color: '#7C2D12', icon: Compass },
            { name: 'Star Reviewer', color: '#F87171', icon: Star },
            { name: 'Wild Forager', color: '#15803D', icon: Leaf },
          ].map(({ name, color, icon: Icon }) =>
            React.createElement('div', { key: name, style: { flexShrink: 0, background: t.surface, borderRadius: 16, padding: '12px 12px', textAlign: 'center', border: `1px solid ${t.border}`, boxShadow: t.cardShadow, minWidth: 80 } },
              React.createElement('div', { style: { width: 40, height: 40, background: color, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
                React.createElement(Icon, { size: 20, color: '#fff' })
              ),
              React.createElement('p', { style: { margin: 0, fontSize: 9, color: t.textSecondary, fontFamily: "'Karla', sans-serif", fontWeight: 700, lineHeight: 1.3 } }, name),
            )
          )
        ),
      ),

      // Forager Quests
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h3', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 16, color: t.text, margin: 0 } }, 'Seasonal Forager Quests'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontFamily: "'Karla', sans-serif", fontWeight: 700, background: '#FEF2F2', borderRadius: 10, padding: '3px 10px', border: `1px solid ${t.border}` } }, '2 Active'),
        ),
        ...foragerQuests.map((quest, i) =>
          React.createElement('div', {
            key: quest.id,
            style: { background: t.surface, borderRadius: 22, overflow: 'hidden', marginBottom: 16, boxShadow: t.cardShadow, border: `1px solid ${t.border}`, animation: `slideUp 0.4s ease ${i * 0.1}s both` }
          },
            React.createElement('div', { style: { background: `linear-gradient(120deg, ${quest.color} 0%, ${quest.color}99 100%)`, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', null,
                React.createElement('h4', { style: { fontFamily: "'Playfair Display SC', serif", fontSize: 15, color: '#fff', margin: '0 0 4px' } }, quest.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                  React.createElement(MapPin, { size: 11, color: 'rgba(255,255,255,0.8)' }),
                  React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: "'Karla', sans-serif" } }, `${quest.location} · ${quest.distance}`),
                ),
              ),
              React.createElement('div', { style: { background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '6px 11px', backdropFilter: 'blur(8px)' } },
                React.createElement('p', { style: { margin: 0, fontSize: 10, color: '#fff', fontFamily: "'Karla', sans-serif", fontWeight: 700 } }, quest.reward),
              ),
            ),
            React.createElement('div', { style: { padding: 16 } },
              React.createElement('div', { style: { marginBottom: 12 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, 'Ingredients Sourced'),
                  React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: quest.color, fontFamily: "'Karla', sans-serif" } }, `${quest.progress}/${quest.total}`),
                ),
                React.createElement('div', { style: { height: 7, background: t.border, borderRadius: 4, overflow: 'hidden' } },
                  React.createElement('div', { style: { height: '100%', width: `${(quest.progress / quest.total) * 100}%`, background: quest.color, borderRadius: 4, transition: 'width 0.6s ease' } })
                ),
              ),
              React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 } },
                ...quest.ingredients.map((ing, j) =>
                  React.createElement('span', { key: ing, style: { fontSize: 11, padding: '4px 10px', borderRadius: 10, background: j < quest.progress ? quest.color : t.surfaceAlt, color: j < quest.progress ? '#fff' : t.textMuted, fontFamily: "'Karla', sans-serif", fontWeight: 600 } }, j < quest.progress ? `✓ ${ing}` : ing)
                )
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Calendar, { size: 12, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Karla', sans-serif" } }, quest.deadline),
                ),
                React.createElement('button', {
                  onClick: () => setActiveScreen('map'),
                  className: 'btn-press',
                  style: { background: quest.color, color: '#fff', border: 'none', borderRadius: 12, padding: '9px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Karla', sans-serif", display: 'flex', alignItems: 'center', gap: 4, minHeight: 44 }
                }, React.createElement('span', null, 'Continue Quest'), React.createElement(ChevronRight, { size: 13, color: '#fff' })),
              ),
            ),
          )
        ),
      ),

      React.createElement('div', { style: { height: 80 } }),
    );
  }

  // ─── BOTTOM NAV ────────────────────────────────────────────────────────────
  function BottomNav() {
    const Home = window.lucide.Home;
    const Map = window.lucide.Map;
    const Users = window.lucide.Users;
    const Bot = window.lucide.Bot;
    const Compass = window.lucide.Compass;

    const tabs = [
      { id: 'home', icon: Home, label: 'Discover' },
      { id: 'map', icon: Map, label: 'Lore Map' },
      { id: 'community', icon: Users, label: 'Hearth' },
      { id: 'ai', icon: Bot, label: 'AI Guide' },
      { id: 'profile', icon: Compass, label: 'Quests' },
    ];

    return React.createElement('div', {
      style: { position: 'absolute', bottom: 0, left: 0, right: 0, background: t.navBg, borderTop: `1.5px solid ${t.border}`, display: 'flex', padding: '6px 0 10px', boxShadow: '0 -4px 24px rgba(0,0,0,0.07)', zIndex: 100 }
    },
      ...tabs.map(tab =>
        React.createElement('button', {
          key: tab.id,
          onClick: () => setActiveScreen(tab.id),
          className: 'nav-tab',
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 2px', minHeight: 44 }
        },
          React.createElement('div', {
            style: { width: 38, height: 34, borderRadius: 11, background: activeScreen === tab.id ? 'linear-gradient(135deg, #DC2626, #CA8A04)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', boxShadow: activeScreen === tab.id ? '0 3px 10px rgba(220,38,38,0.35)' : 'none' }
          },
            React.createElement(tab.icon, { size: 18, color: activeScreen === tab.id ? '#fff' : t.textMuted })
          ),
          React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: activeScreen === tab.id ? t.primary : t.textMuted, fontFamily: "'Karla', sans-serif", transition: 'color 0.2s ease' } }, tab.label),
        )
      )
    );
  }

  const screens = { home: HomeScreen, map: MapScreen, community: CommunityScreen, ai: AIScreen, profile: ProfileScreen };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Karla', sans-serif" }
  },
    React.createElement('style', null, styleContent),
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 42, overflow: 'hidden', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1.5px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)' }
    },
      React.createElement(screens[activeScreen]),
      React.createElement(BottomNav),
    ),
  );
}
