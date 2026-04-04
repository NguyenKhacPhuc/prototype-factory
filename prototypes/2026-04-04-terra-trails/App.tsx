function App() {
  const { useState, useEffect, useRef } = React;

  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [pressedBtn, setPressedBtn] = useState(null);

  const themes = {
    dark: {
      bg: '#141A09',
      surface: '#1E2710',
      surfaceAlt: '#252E14',
      surfaceRaised: '#2E3A1A',
      border: '#3D4E22',
      borderAccent: '#C4622D',
      text: '#F0E6CC',
      textMuted: '#A89870',
      textDim: '#6B5E42',
      primary: '#4A7C1F',
      primaryLight: '#6BA32B',
      terracotta: '#C4622D',
      terracottaLight: '#D97840',
      gold: '#B8860B',
      goldLight: '#D4A017',
      sandstone: '#8B7355',
      cream: '#F0E6CC',
      green: '#2D5016',
      greenLight: '#3D6B1E',
    },
    light: {
      bg: '#F5EDD6',
      surface: '#EDE0C4',
      surfaceAlt: '#E5D5B0',
      surfaceRaised: '#FFFFFF',
      border: '#C8B48A',
      borderAccent: '#C4622D',
      text: '#2D3A12',
      textMuted: '#6B5230',
      textDim: '#9A7D55',
      primary: '#3A6B14',
      primaryLight: '#4A7C1F',
      terracotta: '#B5521F',
      terracottaLight: '#C4622D',
      gold: '#9A7009',
      goldLight: '#B8860B',
      sandstone: '#8B7355',
      cream: '#FAF4E8',
      green: '#2D5016',
      greenLight: '#3D6B1E',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const handlePress = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    if (fn) fn();
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.1s ease',
    cursor: 'pointer',
  });

  // Inject font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #3D4E22; border-radius: 2px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────────
  function HomeScreen() {
    const MapPin = window.lucide.MapPin;
    const Trophy = window.lucide.Trophy;
    const Sparkles = window.lucide.Sparkles;
    const Compass = window.lucide.Compass;
    const Leaf = window.lucide.Leaf;
    const Sun = window.lucide.Sun;
    const Moon = window.lucide.Moon;
    const ChevronRight = window.lucide.ChevronRight;
    const Flame = window.lucide.Flame;

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Bitter', serif" }
    },
      // Header strip
      React.createElement('div', {
        style: {
          background: t.surface,
          borderBottom: `2px solid ${t.border}`,
          padding: '20px 20px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, letterSpacing: 3, color: t.textDim, textTransform: 'uppercase', marginBottom: 2 } }, 'Terra Trails'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.1 } }, 'Good morning,'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.terracotta, lineHeight: 1.1 } }, 'Explorer Kai'),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: t.surfaceRaised,
            border: `2px solid ${t.border}`,
            borderRadius: 8,
            padding: '8px 10px',
            cursor: 'pointer',
            color: t.gold,
            display: 'flex',
            alignItems: 'center',
          }
        },
          isDark
            ? React.createElement(Sun, { size: 18, color: t.gold })
            : React.createElement(Moon, { size: 18, color: t.gold })
        )
      ),

      // Terra Score card — offset asymmetric
      React.createElement('div', {
        style: { padding: '20px 20px 0', position: 'relative' }
      },
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary} 0%, ${t.green} 60%, ${t.surfaceRaised} 100%)`,
            borderRadius: '4px 16px 16px 4px',
            padding: '18px 20px',
            border: `2px solid ${t.primaryLight}`,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          // decorative notch
          React.createElement('div', {
            style: {
              position: 'absolute', top: -12, right: 40,
              width: 60, height: 60,
              borderRadius: '50%',
              background: t.terracotta,
              opacity: 0.15,
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: -20, left: 20,
              width: 80, height: 80,
              borderRadius: '50%',
              background: t.gold,
              opacity: 0.1,
            }
          }),
          React.createElement('div', { style: { fontSize: 10, letterSpacing: 3, color: 'rgba(240,230,204,0.6)', textTransform: 'uppercase', marginBottom: 4 } }, 'Terra Score'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6 } },
            React.createElement('div', { style: { fontSize: 52, fontWeight: 700, color: '#F0E6CC', lineHeight: 1 } }, '4,720'),
            React.createElement('div', { style: { fontSize: 13, color: 'rgba(240,230,204,0.7)', fontStyle: 'italic' } }, 'pts'),
          ),
          React.createElement('div', { style: { marginTop: 10, display: 'flex', gap: 16, alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Flame, { size: 13, color: t.terracotta }),
              React.createElement('span', { style: { fontSize: 12, color: 'rgba(240,230,204,0.8)', fontWeight: 600 } }, '14-day streak'),
            ),
            React.createElement('div', { style: { width: 1, height: 12, background: 'rgba(240,230,204,0.2)' } }),
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(240,230,204,0.8)' } }, 'Rank #38 in Portland'),
          ),
          // progress bar
          React.createElement('div', { style: { marginTop: 12 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
              React.createElement('span', { style: { fontSize: 10, color: 'rgba(240,230,204,0.5)', letterSpacing: 1, textTransform: 'uppercase' } }, 'Next rank: Verdant Warden'),
              React.createElement('span', { style: { fontSize: 10, color: t.goldLight } }, '4,720 / 5,000'),
            ),
            React.createElement('div', { style: { height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' } },
              React.createElement('div', { style: { width: '94.4%', height: '100%', background: t.goldLight, borderRadius: 3 } }),
            )
          ),
        )
      ),

      // Daily Quest banner
      React.createElement('div', { style: { padding: '14px 20px 0' } },
        React.createElement('div', {
          style: {
            background: t.surface,
            border: `2px solid ${t.terracotta}`,
            borderRadius: '16px 4px 16px 4px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
          },
          onClick: () => handlePress('quest', () => setActiveScreen('quests'))
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44,
              background: `${t.terracotta}22`,
              border: `2px solid ${t.terracotta}`,
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }
          },
            React.createElement(Sun, { size: 20, color: t.terracotta })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 10, letterSpacing: 2, color: t.terracotta, textTransform: 'uppercase', marginBottom: 2 } }, 'Daily Quest'),
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.3 } }, 'Find 3 items for composting near you'),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, '+120 pts · expires in 6h'),
          ),
          React.createElement(ChevronRight, { size: 16, color: t.textDim }),
        )
      ),

      // Hub Cards
      React.createElement('div', { style: { padding: '20px 20px 12px' } },
        React.createElement('div', { style: { fontSize: 11, letterSpacing: 2, color: t.textDim, textTransform: 'uppercase', marginBottom: 12 } }, 'Explore'),
      ),

      // Asymmetric 2-col grid
      React.createElement('div', { style: { padding: '0 20px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },

        // Eco-Spots — tall card
        React.createElement('div', {
          style: btnStyle('eco-spots', {
            gridRow: 'span 2',
            background: t.surfaceAlt,
            border: `2px solid ${t.border}`,
            borderRadius: '4px 16px 16px 16px',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 180,
            cursor: 'pointer',
          }),
          onClick: () => handlePress('eco-spots', () => setActiveScreen('explore'))
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: {
                width: 40, height: 40,
                background: `${t.primaryLight}33`,
                border: `2px solid ${t.primaryLight}`,
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 12,
              }
            },
              React.createElement(MapPin, { size: 20, color: t.primaryLight })
            ),
            React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.2, marginBottom: 6 } }, 'Eco-Spot Expeditions'),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, lineHeight: 1.5 } }, 'Discover geo-tagged sustainable locations near you'),
          ),
          React.createElement('div', {
            style: {
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: `${t.primaryLight}22`,
              border: `1px solid ${t.primaryLight}55`,
              borderRadius: 20, padding: '4px 10px',
            }
          },
            React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.primaryLight } }),
            React.createElement('span', { style: { fontSize: 10, color: t.primaryLight, fontWeight: 600 } }, '7 nearby'),
          )
        ),

        // Collection
        React.createElement('div', {
          style: btnStyle('collection', {
            background: `linear-gradient(135deg, ${t.surfaceAlt}, ${t.surface})`,
            border: `2px solid ${t.gold}55`,
            borderRadius: '16px 4px 16px 16px',
            padding: 14,
            cursor: 'pointer',
          }),
          onClick: () => handlePress('collection', () => setActiveScreen('collection'))
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36,
              background: `${t.gold}22`,
              border: `2px solid ${t.gold}`,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 10,
            }
          },
            React.createElement(Sparkles, { size: 18, color: t.goldLight })
          ),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, 'Flora & Fauna'),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 4 } }, '12 / 48 collected'),
        ),

        // Leaderboard
        React.createElement('div', {
          style: btnStyle('leaderboard', {
            background: t.surfaceAlt,
            border: `2px solid ${t.terracotta}55`,
            borderRadius: '16px 16px 4px 16px',
            padding: 14,
            cursor: 'pointer',
          }),
          onClick: () => handlePress('leaderboard', () => setActiveScreen('leaderboard'))
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36,
              background: `${t.terracotta}22`,
              border: `2px solid ${t.terracotta}`,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 10,
            }
          },
            React.createElement(Trophy, { size: 18, color: t.terracotta })
          ),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, 'Leaderboard'),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 4 } }, 'Eco-Squad: #3'),
        ),
      )
    );
  }

  // ─── EXPLORE SCREEN ───────────────────────────────────────────────────────────
  function ExploreScreen() {
    const MapPin = window.lucide.MapPin;
    const ChevronLeft = window.lucide.ChevronLeft;
    const Navigation = window.lucide.Navigation;
    const Filter = window.lucide.Filter;
    const Recycle = window.lucide.Recycle;
    const Leaf = window.lucide.Leaf;
    const Coffee = window.lucide.Coffee;
    const Zap = window.lucide.Zap;
    const Star = window.lucide.Star;
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedSpot, setSelectedSpot] = useState(null);

    const filters = ['all', 'recycle', 'garden', 'cafe', 'energy'];
    const filterIcons = {
      all: MapPin,
      recycle: Recycle,
      garden: Leaf,
      cafe: Coffee,
      energy: Zap,
    };

    const spots = [
      { id: 1, name: 'Hawthorne Recycling Hub', type: 'recycle', dist: '0.3 mi', pts: 80, tag: 'Multi-material drop-off', challenge: 'Sort 5 items correctly', rating: 4.8, verified: true },
      { id: 2, name: 'Buckman Community Garden', type: 'garden', dist: '0.6 mi', pts: 120, tag: 'Volunteer-run', challenge: 'Log 30 min of gardening', rating: 4.9, verified: true },
      { id: 3, name: 'Woodstock Green Roasters', type: 'cafe', dist: '0.9 mi', pts: 60, tag: 'Zero-waste certified', challenge: 'Bring your own cup', rating: 4.6, verified: true },
      { id: 4, name: 'SE Energy Co-op Station', type: 'energy', dist: '1.1 mi', pts: 100, tag: 'Solar EV charging', challenge: 'Check solar output at noon', rating: 4.7, verified: false },
      { id: 5, name: 'Richmond Worm Farm', type: 'garden', dist: '1.4 mi', pts: 90, tag: 'Compost exchange', challenge: 'Drop off food scraps', rating: 4.5, verified: true },
    ];

    const spotColors = { recycle: t.primaryLight, garden: '#5A8C2F', cafe: t.terracotta, energy: t.goldLight };
    const filtered = activeFilter === 'all' ? spots : spots.filter(s => s.type === activeFilter);

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, fontFamily: "'Bitter', serif" }
    },
      // Header
      React.createElement('div', {
        style: { background: t.surface, borderBottom: `2px solid ${t.border}`, padding: '16px 20px 12px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: t.text, display: 'flex' }
        },
          React.createElement(ChevronLeft, { size: 22, color: t.text })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, 'Eco-Spot Expeditions'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Portland, OR · 7 spots nearby'),
        ),
        React.createElement('div', {
          style: {
            width: 34, height: 34,
            background: `${t.primaryLight}22`,
            border: `1px solid ${t.primaryLight}`,
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        },
          React.createElement(Navigation, { size: 16, color: t.primaryLight })
        )
      ),

      // Faux map
      React.createElement('div', {
        style: {
          height: 160,
          background: isDark
            ? 'linear-gradient(135deg, #1A2408 0%, #253012 50%, #1E2A0E 100%)'
            : 'linear-gradient(135deg, #C8D9A0 0%, #A8C278 50%, #B8D090 100%)',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `2px solid ${t.border}`,
        }
      },
        // Grid lines
        ...Array.from({length: 6}, (_, i) =>
          React.createElement('div', {
            key: `h${i}`,
            style: { position: 'absolute', left: 0, right: 0, top: `${i * 27}px`, height: 1, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)' }
          })
        ),
        ...Array.from({length: 8}, (_, i) =>
          React.createElement('div', {
            key: `v${i}`,
            style: { position: 'absolute', top: 0, bottom: 0, left: `${i * 50}px`, width: 1, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)' }
          })
        ),
        // Pins
        ...[
          { x: 60, y: 40, c: t.primaryLight, label: 'R' },
          { x: 160, y: 70, c: '#5A8C2F', label: 'G' },
          { x: 240, y: 35, c: t.terracotta, label: 'C' },
          { x: 310, y: 90, c: t.goldLight, label: 'E' },
          { x: 120, y: 110, c: '#5A8C2F', label: 'G' },
        ].map((pin, i) =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute', left: pin.x, top: pin.y,
              width: 28, height: 28,
              background: pin.c,
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement('span', {
              style: { transform: 'rotate(45deg)', fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: "'Bitter', serif" }
            }, pin.label)
          )
        ),
        // Location label
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: 10, right: 10,
            background: isDark ? 'rgba(20,26,9,0.85)' : 'rgba(255,255,255,0.85)',
            borderRadius: 6, padding: '4px 8px',
            fontSize: 10, color: t.text, fontFamily: "'Bitter', serif",
            border: `1px solid ${t.border}`,
          }
        }, '📍 SE Portland')
      ),

      // Filter pills
      React.createElement('div', {
        style: {
          padding: '12px 16px',
          display: 'flex', gap: 8, overflowX: 'auto',
          background: t.surface,
          borderBottom: `1px solid ${t.border}`,
          flexShrink: 0,
        }
      },
        ...filters.map(f => {
          const Icon = filterIcons[f];
          const active = activeFilter === f;
          return React.createElement('button', {
            key: f,
            onClick: () => setActiveFilter(f),
            style: {
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px',
              background: active ? t.primaryLight : t.surfaceAlt,
              border: `1.5px solid ${active ? t.primaryLight : t.border}`,
              borderRadius: 20,
              color: active ? '#fff' : t.textMuted,
              fontSize: 11, fontWeight: active ? 600 : 400,
              cursor: 'pointer', flexShrink: 0,
              fontFamily: "'Bitter', serif",
            }
          },
            React.createElement(Icon, { size: 11 }),
            React.createElement('span', null, f.charAt(0).toUpperCase() + f.slice(1))
          );
        })
      ),

      // Spots list
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 16px' } },
        ...filtered.map((spot, i) => {
          const dotColor = spotColors[spot.type] || t.primaryLight;
          const isOdd = i % 2 !== 0;
          return React.createElement('div', {
            key: spot.id,
            onClick: () => setSelectedSpot(selectedSpot === spot.id ? null : spot.id),
            style: {
              background: t.surface,
              border: `2px solid ${selectedSpot === spot.id ? dotColor : t.border}`,
              borderRadius: isOdd ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              padding: '14px 14px',
              marginBottom: 10,
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 42, height: 42, flexShrink: 0,
                  background: `${dotColor}22`,
                  border: `2px solid ${dotColor}`,
                  borderRadius: isOdd ? '4px 10px 10px 10px' : 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(MapPin, { size: 18, color: dotColor })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.3, paddingRight: 8 } }, spot.name),
                  React.createElement('div', {
                    style: {
                      background: `${t.goldLight}22`,
                      border: `1px solid ${t.goldLight}`,
                      borderRadius: 6, padding: '2px 7px',
                      fontSize: 11, fontWeight: 600, color: t.goldLight, whiteSpace: 'nowrap',
                    }
                  }, `+${spot.pts}`)
                ),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 3 } },
                  `${spot.dist} · ${spot.tag}`,
                  spot.verified && React.createElement('span', { style: { marginLeft: 6, color: t.primaryLight, fontWeight: 600 } }, '✓ verified')
                ),
              )
            ),
            selectedSpot === spot.id && React.createElement('div', {
              style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` }
            },
              React.createElement('div', { style: { fontSize: 11, color: t.textDim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 } }, 'Active Challenge'),
              React.createElement('div', { style: { fontSize: 13, color: t.text, marginBottom: 12 } }, spot.challenge),
              React.createElement('button', {
                style: {
                  width: '100%', padding: '10px',
                  background: dotColor,
                  border: 'none', borderRadius: 10,
                  color: '#fff', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'Bitter', serif",
                }
              }, 'Start Challenge →')
            )
          );
        })
      )
    );
  }

  // ─── COLLECTION SCREEN ───────────────────────────────────────────────────────
  function CollectionScreen() {
    const ChevronLeft = window.lucide.ChevronLeft;
    const Sparkles = window.lucide.Sparkles;
    const Lock = window.lucide.Lock;
    const [selectedCreature, setSelectedCreature] = useState(null);

    const creatures = [
      { id: 1, name: 'Moss Sentinel', emoji: '🦎', rarity: 'Common', region: 'Pacific NW', unlocked: true, pts: 250, desc: 'A guardian of damp forest floors, this ancient lizard spirit absorbs moisture and transforms it into vital nutrients for the soil.' },
      { id: 2, name: 'Amber Pollinator', emoji: '🦋', rarity: 'Uncommon', region: 'Urban Meadow', unlocked: true, pts: 400, desc: 'Drifting between rooftop gardens and window boxes, the Amber Pollinator bridges city blocks with invisible threads of life.' },
      { id: 3, name: 'Root Wanderer', emoji: '🦔', rarity: 'Rare', region: 'Community Park', unlocked: true, pts: 700, desc: 'Rarely seen in daylight, this hedgehog spirit aerates compacted earth beneath city sidewalks, enabling urban tree survival.' },
      { id: 4, name: 'Tide Oracle', emoji: '🦭', rarity: 'Epic', region: 'Coastal', unlocked: false, pts: 1200, desc: '???' },
      { id: 5, name: 'Solar Crane', emoji: '🕊️', rarity: 'Rare', region: 'Wetland', unlocked: true, pts: 800, desc: 'This luminous bird carries seeds across water bodies, its wings refracting sunlight to mark safe nesting zones.' },
      { id: 6, name: 'Storm Mycelia', emoji: '🍄', rarity: 'Uncommon', region: 'Forest Edge', unlocked: true, pts: 450, desc: 'A fungal spirit that emerges after rain, connecting tree root systems in an underground communication network.' },
      { id: 7, name: 'Quartz Salamander', emoji: '🦕', rarity: 'Epic', region: 'River Gorge', unlocked: false, pts: 1500, desc: '???' },
      { id: 8, name: 'Copper Fox', emoji: '🦊', rarity: 'Legendary', region: 'Old Growth', unlocked: false, pts: 3000, desc: '???' },
      { id: 9, name: 'Dew Mantis', emoji: '🪲', rarity: 'Common', region: 'Garden', unlocked: true, pts: 300, desc: 'An expert at capturing morning dew, this spirit teaches micro-irrigation techniques to backyard gardeners.' },
      { id: 10, name: 'Basalt Owl', emoji: '🦉', rarity: 'Uncommon', region: 'Volcanic Plains', unlocked: false, pts: 600, desc: '???' },
      { id: 11, name: 'Lichen Bear', emoji: '🐻', rarity: 'Legendary', region: 'Alpine', unlocked: false, pts: 5000, desc: '???' },
      { id: 12, name: 'Verdant Frog', emoji: '🐸', rarity: 'Common', region: 'Pond Edge', unlocked: true, pts: 280, desc: 'A sensitive indicator of water quality, the Verdant Frog spirit alerts communities to nearby pollution sources through behavioral signals.' },
    ];

    const rarityColors = { Common: t.textMuted, Uncommon: t.primaryLight, Rare: t.terracotta, Epic: t.goldLight, Legendary: '#E040FB' };
    const unlocked = creatures.filter(c => c.unlocked).length;

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, fontFamily: "'Bitter', serif" }
    },
      // Header
      React.createElement('div', {
        style: { background: t.surface, borderBottom: `2px solid ${t.border}`, padding: '16px 20px 14px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { background: 'none', border: 'none', cursor: 'pointer', color: t.text, display: 'flex', padding: 2 }
        },
          React.createElement(ChevronLeft, { size: 22, color: t.text })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, 'Flora & Fauna'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${unlocked} of ${creatures.length} spirits discovered`),
        ),
        React.createElement(Sparkles, { size: 20, color: t.goldLight })
      ),

      // Progress bar
      React.createElement('div', { style: { padding: '12px 20px', background: t.surfaceAlt, borderBottom: `1px solid ${t.border}`, flexShrink: 0 } },
        React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              width: `${(unlocked / creatures.length) * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${t.primaryLight}, ${t.goldLight})`,
              borderRadius: 4,
            }
          })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 5 } },
          React.createElement('span', { style: { fontSize: 10, color: t.textDim, letterSpacing: 1, textTransform: 'uppercase' } }, 'Collection Progress'),
          React.createElement('span', { style: { fontSize: 10, color: t.goldLight, fontWeight: 600 } }, `${Math.round((unlocked / creatures.length) * 100)}%`),
        )
      ),

      // Grid
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
      },
        ...creatures.map((c, i) => {
          const isOdd = i % 2 !== 0;
          const isSelected = selectedCreature === c.id;
          const rarityColor = rarityColors[c.rarity];

          if (isSelected && c.unlocked) {
            return React.createElement('div', {
              key: c.id,
              gridColumn: 'span 2',
              style: {
                gridColumn: 'span 2',
                background: t.surface,
                border: `2px solid ${rarityColor}`,
                borderRadius: isOdd ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                padding: 16,
                cursor: 'pointer',
              },
              onClick: () => setSelectedCreature(null)
            },
              React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
                React.createElement('div', {
                  style: {
                    fontSize: 48, lineHeight: 1,
                    width: 72, height: 72, flexShrink: 0,
                    background: `${rarityColor}15`,
                    border: `2px solid ${rarityColor}55`,
                    borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }
                }, c.emoji),
                React.createElement('div', null,
                  React.createElement('div', {
                    style: {
                      display: 'inline-block', padding: '2px 8px',
                      background: `${rarityColor}22`, border: `1px solid ${rarityColor}`,
                      borderRadius: 4, fontSize: 9, color: rarityColor, fontWeight: 700,
                      letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6,
                    }
                  }, c.rarity),
                  React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 4 } }, c.name),
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginBottom: 8 } }, `📍 ${c.region}`),
                  React.createElement('div', { style: { fontSize: 12, color: t.text, lineHeight: 1.6, fontStyle: 'italic' } }, `"${c.desc}"`),
                )
              )
            );
          }

          return React.createElement('div', {
            key: c.id,
            onClick: () => setSelectedCreature(isSelected ? null : c.id),
            style: {
              background: c.unlocked ? t.surface : t.surfaceAlt,
              border: `2px solid ${c.unlocked ? rarityColor + '55' : t.border}`,
              borderRadius: isOdd ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
              padding: 12,
              cursor: 'pointer',
              opacity: c.unlocked ? 1 : 0.55,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', gap: 6,
              position: 'relative',
            }
          },
            !c.unlocked && React.createElement('div', {
              style: {
                position: 'absolute', top: 6, right: 6,
                background: t.surfaceRaised,
                borderRadius: 4, padding: 3,
              }
            },
              React.createElement(Lock, { size: 10, color: t.textDim })
            ),
            React.createElement('div', {
              style: {
                fontSize: 32, lineHeight: 1,
                width: 56, height: 56,
                background: c.unlocked ? `${rarityColor}15` : t.border + '33',
                border: `1.5px solid ${c.unlocked ? rarityColor + '55' : t.border}`,
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: c.unlocked ? 'none' : 'grayscale(100%) blur(2px)',
              }
            }, c.emoji),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: c.unlocked ? t.text : t.textDim, lineHeight: 1.2 } }, c.unlocked ? c.name : '???'),
            React.createElement('div', {
              style: {
                fontSize: 9, color: rarityColor,
                fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
              }
            }, c.rarity),
          );
        })
      )
    );
  }

  // ─── LEADERBOARD SCREEN ───────────────────────────────────────────────────────
  function LeaderboardScreen() {
    const ChevronLeft = window.lucide.ChevronLeft;
    const Trophy = window.lucide.Trophy;
    const Users = window.lucide.Users;
    const User = window.lucide.User;
    const TrendingUp = window.lucide.TrendingUp;
    const [tab, setTab] = useState('individual');

    const individuals = [
      { rank: 1, name: 'Nadia W.', pts: 12840, badge: '🌿', streak: 42, change: 0 },
      { rank: 2, name: 'Marcus T.', pts: 11650, badge: '🦋', streak: 35, change: 1 },
      { rank: 3, name: 'Priya L.', pts: 10980, badge: '🍃', streak: 28, change: -1 },
      { rank: 4, name: 'Sam R.', pts: 9760, badge: '🌱', streak: 20, change: 2 },
      { rank: 5, name: 'Jo B.', pts: 8920, badge: '🌻', streak: 17, change: 0 },
      { rank: 38, name: 'Explorer Kai', pts: 4720, badge: '🦎', streak: 14, change: 3, isMe: true },
    ];

    const squads = [
      { rank: 1, name: 'Green Willamette', members: 8, pts: 68400, emblem: '🌊' },
      { rank: 2, name: 'Sellwood Sprouts', members: 6, pts: 54200, emblem: '🌿' },
      { rank: 3, name: 'Eastside Eco Squad', members: 5, pts: 42800, emblem: '🦋', isMe: true },
      { rank: 4, name: 'Mt. Tabor Trackers', members: 7, pts: 38600, emblem: '⛰️' },
      { rank: 5, name: 'Pearl District Planters', members: 4, pts: 31200, emblem: '🌱' },
    ];

    const rankColors = ['#B8860B', '#9E9E9E', '#8B5E3C'];

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, fontFamily: "'Bitter', serif" }
    },
      // Header
      React.createElement('div', {
        style: { background: t.surface, borderBottom: `2px solid ${t.border}`, padding: '16px 20px 14px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { background: 'none', border: 'none', cursor: 'pointer', color: t.text, display: 'flex', padding: 2 }
        },
          React.createElement(ChevronLeft, { size: 22, color: t.text })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, 'Leaderboard'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Portland, OR · April 2026'),
        ),
        React.createElement(Trophy, { size: 20, color: t.gold })
      ),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', background: t.surfaceAlt, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }
      },
        ['individual', 'squads'].map(tab_ =>
          React.createElement('button', {
            key: tab_,
            onClick: () => setTab(tab_),
            style: {
              flex: 1, padding: '12px',
              background: tab === tab_ ? t.surface : 'transparent',
              border: 'none',
              borderBottom: tab === tab_ ? `2px solid ${t.terracotta}` : '2px solid transparent',
              color: tab === tab_ ? t.terracotta : t.textMuted,
              fontSize: 13, fontWeight: tab === tab_ ? 700 : 400,
              cursor: 'pointer', fontFamily: "'Bitter', serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }
          },
            tab_ === 'individual'
              ? React.createElement(User, { size: 14 })
              : React.createElement(Users, { size: 14 }),
            React.createElement('span', null, tab_ === 'individual' ? 'Explorers' : 'Eco-Squads')
          )
        )
      ),

      // Top 3 podium
      tab === 'individual' && React.createElement('div', {
        style: { padding: '16px 20px 8px', background: t.surface, borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, flexShrink: 0 }
      },
        // 2nd
        React.createElement('div', { style: { textAlign: 'center', flex: 1 } },
          React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, '🦋'),
          React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.text, marginBottom: 2 } }, 'Marcus T.'),
          React.createElement('div', {
            style: {
              background: '#9E9E9E', color: '#fff', borderRadius: '6px 6px 0 0',
              padding: '8px 4px 4px', fontSize: 20, fontWeight: 700, textAlign: 'center',
            }
          }, '2'),
        ),
        // 1st
        React.createElement('div', { style: { textAlign: 'center', flex: 1 } },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 4 } }, '🌿'),
          React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.goldLight, marginBottom: 2 } }, 'Nadia W.'),
          React.createElement('div', {
            style: {
              background: t.gold, color: '#fff', borderRadius: '6px 6px 0 0',
              padding: '14px 4px 4px', fontSize: 22, fontWeight: 700, textAlign: 'center',
            }
          }, '1'),
        ),
        // 3rd
        React.createElement('div', { style: { textAlign: 'center', flex: 1 } },
          React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, '🍃'),
          React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.text, marginBottom: 2 } }, 'Priya L.'),
          React.createElement('div', {
            style: {
              background: '#8B5E3C', color: '#fff', borderRadius: '6px 6px 0 0',
              padding: '4px 4px', fontSize: 18, fontWeight: 700, textAlign: 'center',
            }
          }, '3'),
        ),
      ),

      // List
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '10px 16px 20px' } },
        ...(tab === 'individual' ? individuals : squads).map((item, i) => {
          const isTop3 = item.rank <= 3;
          const isOdd = i % 2 !== 0;
          const isMe = item.isMe;
          return React.createElement('div', {
            key: item.rank,
            style: {
              background: isMe ? `${t.primaryLight}18` : t.surface,
              border: `2px solid ${isMe ? t.primaryLight : isTop3 ? rankColors[item.rank - 1] + '55' : t.border}`,
              borderRadius: isOdd ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
              padding: '12px 14px',
              marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 12,
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, flexShrink: 0,
                background: isTop3 ? rankColors[item.rank - 1] + '33' : t.surfaceAlt,
                border: `1.5px solid ${isTop3 ? rankColors[item.rank - 1] : t.border}`,
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: isTop3 ? rankColors[item.rank - 1] : t.textMuted,
              }
            }, `#${item.rank}`),
            React.createElement('div', { style: { fontSize: 20 } }, item.badge || item.emblem),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: isMe ? t.primaryLight : t.text } },
                  item.name + (isMe ? ' (You)' : '')
                ),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.goldLight } },
                  item.pts?.toLocaleString() + ' pts'
                ),
              ),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } },
                item.streak ? `🔥 ${item.streak}-day streak` : `${item.members} members`,
                item.change !== undefined && item.change !== 0 && React.createElement('span', {
                  style: {
                    marginLeft: 8,
                    color: item.change > 0 ? t.primaryLight : t.terracotta,
                    fontWeight: 600,
                  }
                }, item.change > 0 ? `↑${item.change}` : `↓${Math.abs(item.change)}`)
              )
            )
          );
        })
      )
    );
  }

  // ─── QUESTS SCREEN ────────────────────────────────────────────────────────────
  function QuestsScreen() {
    const ChevronLeft = window.lucide.ChevronLeft;
    const Sun = window.lucide.Sun;
    const CheckCircle = window.lucide.CheckCircle;
    const Circle = window.lucide.Circle;
    const Zap = window.lucide.Zap;
    const Clock = window.lucide.Clock;
    const [completed, setCompleted] = useState([]);

    const toggle = (id) => setCompleted(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

    const quests = [
      { id: 1, title: 'Find 3 compostable items', desc: 'Identify three food scraps or plant material for composting at home or work.', pts: 120, timeLeft: '6h', category: 'Waste', color: t.primaryLight },
      { id: 2, title: 'Walk or bike to one errand', desc: 'Skip the car for at least one errand today — store, cafe, park, or post office.', pts: 90, timeLeft: '12h', category: 'Transport', color: t.terracotta },
      { id: 3, title: 'Check energy usage', desc: 'Read your smart meter or utility app and note your kWh usage since last week.', pts: 60, timeLeft: '18h', category: 'Energy', color: t.goldLight },
      { id: 4, title: 'Water-saving tip', desc: 'Discover and apply one water-saving behavior. Log it here with a note.', pts: 75, timeLeft: '24h', category: 'Water', color: '#5B9BD5' },
    ];

    const weeklyQuests = [
      { id: 5, title: 'Visit 2 Eco-Spots', desc: 'Complete challenges at two different geo-tagged locations this week.', pts: 300, progress: 1, total: 2 },
      { id: 6, title: 'Earn 500 pts', desc: 'Accumulate 500 points from any combination of daily quests.', pts: 150, progress: 340, total: 500 },
      { id: 7, title: 'Recruit a friend', desc: 'Invite someone to Terra Trails and have them complete their first eco-spot.', pts: 500, progress: 0, total: 1 },
    ];

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, fontFamily: "'Bitter', serif" }
    },
      // Header
      React.createElement('div', {
        style: { background: t.surface, borderBottom: `2px solid ${t.border}`, padding: '16px 20px 14px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { background: 'none', border: 'none', cursor: 'pointer', color: t.text, display: 'flex', padding: 2 }
        },
          React.createElement(ChevronLeft, { size: 22, color: t.text })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, 'Daily Eco-Quests'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Saturday, April 4 · 3 of 4 remaining'),
        ),
        React.createElement(Sun, { size: 20, color: t.goldLight })
      ),

      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 16px' } },
        // Daily label
        React.createElement('div', {
          style: { fontSize: 10, letterSpacing: 2, color: t.textDim, textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }
        },
          React.createElement(Zap, { size: 12, color: t.goldLight }),
          'Today\'s Quests'
        ),

        // Daily quest cards — asymmetric layout
        ...quests.map((q, i) => {
          const done = completed.includes(q.id);
          const isOdd = i % 2 !== 0;
          return React.createElement('div', {
            key: q.id,
            style: {
              background: done ? `${q.color}15` : t.surface,
              border: `2px solid ${done ? q.color : t.border}`,
              borderRadius: isOdd ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              padding: '14px 14px',
              marginBottom: 10,
              opacity: done ? 0.8 : 1,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
              React.createElement('button', {
                onClick: () => toggle(q.id),
                style: { background: 'none', border: 'none', cursor: 'pointer', padding: 2, marginTop: 1, flexShrink: 0, color: q.color }
              },
                done
                  ? React.createElement(CheckCircle, { size: 20, color: q.color })
                  : React.createElement(Circle, { size: 20, color: t.textDim })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 } },
                  React.createElement('div', {
                    style: {
                      fontSize: 13, fontWeight: 700, color: done ? t.textMuted : t.text,
                      lineHeight: 1.3,
                      textDecoration: done ? 'line-through' : 'none',
                    }
                  }, q.title),
                  React.createElement('div', {
                    style: {
                      background: `${q.color}22`, border: `1px solid ${q.color}`,
                      borderRadius: 6, padding: '2px 7px',
                      fontSize: 11, color: q.color, fontWeight: 600, flexShrink: 0,
                    }
                  }, `+${q.pts}`)
                ),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 4, lineHeight: 1.5 } }, q.desc),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 } },
                  React.createElement(Clock, { size: 10, color: t.textDim }),
                  React.createElement('span', { style: { fontSize: 10, color: t.textDim } }, `Expires in ${q.timeLeft}`),
                  React.createElement('span', { style: { marginLeft: 6, fontSize: 10, color: q.color, fontWeight: 600 } }, q.category),
                )
              )
            )
          );
        }),

        // Weekly section
        React.createElement('div', {
          style: { fontSize: 10, letterSpacing: 2, color: t.textDim, textTransform: 'uppercase', margin: '18px 0 10px', display: 'flex', alignItems: 'center', gap: 8 }
        },
          React.createElement(Sun, { size: 12, color: t.terracotta }),
          'Weekly Challenges'
        ),

        ...weeklyQuests.map((q, i) => {
          const pct = Math.min((q.progress / q.total) * 100, 100);
          const isOdd = i % 2 !== 0;
          return React.createElement('div', {
            key: q.id,
            style: {
              background: t.surface,
              border: `2px solid ${t.border}`,
              borderRadius: isOdd ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              padding: '14px 14px',
              marginBottom: 10,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.3 } }, q.title),
              React.createElement('div', {
                style: {
                  background: `${t.terracotta}22`, border: `1px solid ${t.terracotta}`,
                  borderRadius: 6, padding: '2px 7px',
                  fontSize: 11, color: t.terracotta, fontWeight: 600,
                }
              }, `+${q.pts}`)
            ),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginBottom: 10, lineHeight: 1.5 } }, q.desc),
            React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden', marginBottom: 4 } },
              React.createElement('div', { style: { width: `${pct}%`, height: '100%', background: t.terracotta, borderRadius: 3 } })
            ),
            React.createElement('div', { style: { fontSize: 10, color: t.textDim } },
              typeof q.progress === 'number' && q.total > 1 ? `${q.progress} / ${q.total}` : q.progress === 0 ? 'Not started' : 'In progress'
            )
          );
        })
      )
    );
  }

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    collection: CollectionScreen,
    leaderboard: LeaderboardScreen,
    quests: QuestsScreen,
  };

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Bitter', serif",
      padding: '20px 0',
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: isDark
          ? '0 30px 80px rgba(0,0,0,0.6), 0 0 0 8px #2A2A2A, inset 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 30px 80px rgba(0,0,0,0.25), 0 0 0 8px #3A3A3A, inset 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }
    },
      React.createElement('div', { style: { flex: 1, overflow: 'hidden' } },
        React.createElement(ScreenComponent)
      )
    )
  );
}
