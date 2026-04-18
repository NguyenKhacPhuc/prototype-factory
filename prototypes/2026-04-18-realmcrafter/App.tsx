const { useState, useEffect, useRef, useCallback } = React;

const icons = window.lucide;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [animatingScreen, setAnimatingScreen] = useState(false);
  const [screenOpacity, setScreenOpacity] = useState(1);
  const [likedPrompts, setLikedPrompts] = useState({});
  const [expandedChallenge, setExpandedChallenge] = useState(null);
  const [mapPins, setMapPins] = useState([
    { id: 1, x: 45, y: 35, name: 'Valdris Keep', type: 'castle' },
    { id: 2, x: 70, y: 55, name: 'Ember Falls', type: 'landmark' },
    { id: 3, x: 25, y: 60, name: 'Whispering Woods', type: 'forest' },
    { id: 4, x: 60, y: 25, name: 'Port Ashenmoor', type: 'city' },
    { id: 5, x: 35, y: 78, name: 'Crystal Caverns', type: 'dungeon' },
  ]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [compendiumFilter, setCompendiumFilter] = useState('all');

  const colors = {
    primary: '#2F4858',
    secondary: '#D7B079',
    cta: '#EB6841',
    bg: isDark ? '#1C2023' : '#F5F0E8',
    bgCard: isDark ? '#262B2F' : '#EDE8DF',
    bgCardHover: isDark ? '#2E3439' : '#E5DFD4',
    text: isDark ? '#E8E0D4' : '#2F4858',
    textSecondary: isDark ? '#9A8E7F' : '#6B5E4F',
    textMuted: isDark ? '#6B5E4F' : '#9A8E7F',
    border: isDark ? '#3A3F44' : '#D4CEC4',
    surface: isDark ? '#232729' : '#EAE4DA',
    glow: 'rgba(215, 176, 121, 0.15)',
    ctaGlow: 'rgba(235, 104, 65, 0.2)',
  };

  const fontFamily = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

  const navigateTo = (screen, tab) => {
    setScreenOpacity(0);
    setTimeout(() => {
      setActiveScreen(screen);
      setActiveTab(tab || screen);
      setScreenOpacity(1);
    }, 150);
  };

  const textureOverlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: isDark
      ? 'radial-gradient(ellipse at 30% 20%, rgba(215,176,121,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(47,72,88,0.08) 0%, transparent 50%)'
      : 'radial-gradient(ellipse at 30% 20%, rgba(215,176,121,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(47,72,88,0.04) 0%, transparent 50%)',
    pointerEvents: 'none',
  };

  const noiseTexture = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: isDark ? 0.03 : 0.02,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
  };

  // Lore Compendium Data
  const loreEntries = [
    { id: 1, type: 'character', name: 'Aelindra Voss', subtitle: 'Archmage of Valdris', description: 'A powerful sorceress who guards the ancient wards protecting the realm from the Shadow Blight. Known for her silver eyes and the constellation tattoos that shift with the phases of the moon.', connections: [2, 4], icon: 'User' },
    { id: 2, type: 'location', name: 'Valdris Keep', subtitle: 'Citadel of the Arcane Council', description: 'A towering fortress built upon a convergence of three ley lines. Its walls are infused with crystallized mana, making it nearly impervious to magical assault.', connections: [1, 3], icon: 'Castle' },
    { id: 3, type: 'magic', name: 'The Weave of Echoes', subtitle: 'Primordial Magic System', description: 'An ancient form of magic that draws upon the residual energy of past events. Practitioners can replay, alter, or amplify echoes of historical moments.', connections: [1, 5], icon: 'Sparkles' },
    { id: 4, type: 'event', name: 'The Sundering of Ashenmoor', subtitle: 'Year 847, Third Age', description: 'A cataclysmic event that split the continent and created the Shattered Isles. Triggered by the misuse of an ancient artifact known as the Worldheart.', connections: [2, 5], icon: 'Flame' },
    { id: 5, type: 'race', name: 'The Thornborn', subtitle: 'Children of the Wild', description: 'A race of beings who emerged from the Great Forest after the Sundering. Their bodies are intertwined with living wood and they communicate through root networks.', connections: [3, 4], icon: 'TreePine' },
    { id: 6, type: 'religion', name: 'The Cult of Pale Stars', subtitle: 'Forbidden Worship', description: 'A secretive order that worships entities from beyond the veil of reality. Their rituals involve stargazing and dreamwalking.', connections: [1, 3], icon: 'Moon' },
  ];

  // Prompts & Challenges
  const dailyPrompts = [
    { id: 1, text: 'Describe the most feared creature in your world. What makes it terrifying — its appearance, its intelligence, or something else entirely?', category: 'Bestiary', difficulty: 'Medium' },
    { id: 2, text: 'A traveler arrives at a crossroads and finds a message carved into an ancient stone. What does it say, and who left it?', category: 'Narrative', difficulty: 'Easy' },
    { id: 3, text: 'Design a currency system for a nomadic desert civilization. What materials do they value and why?', category: 'Culture', difficulty: 'Hard' },
  ];

  const weeklyChallenges = [
    { id: 1, title: 'The Lost Library', description: 'Create a detailed entry for an ancient repository of forbidden knowledge. Include its location, its guardians, the dangers within, and at least three unique tomes found on its shelves.', participants: 234, daysLeft: 4, reward: '500 Lore Points' },
    { id: 2, title: 'Rival Factions', description: 'Design two opposing factions with conflicting ideologies. Map their territories, key figures, and the central conflict driving them apart.', participants: 187, daysLeft: 6, reward: '750 Lore Points' },
  ];

  // Story Circles
  const storyCircles = [
    { id: 1, name: 'The Shattered Realms', members: 12, activity: 'Very Active', description: 'A collaborative dark fantasy universe spanning multiple continents and timelines.', avatar: '🌍', lastActive: '2 min ago' },
    { id: 2, name: 'Neon Mythos', members: 8, activity: 'Active', description: 'Cyberpunk meets ancient mythology in this genre-blending shared world.', avatar: '⚡', lastActive: '15 min ago' },
    { id: 3, name: 'Starweave Chronicles', members: 23, activity: 'Very Active', description: 'A vast space opera with interconnected alien civilizations and ancient cosmic threats.', avatar: '✨', lastActive: '5 min ago' },
    { id: 4, name: 'The Verdant Throne', members: 5, activity: 'New', description: 'An ecological fantasy where nature itself is a sentient political force.', avatar: '🌿', lastActive: '1 hr ago' },
  ];

  const renderIcon = (name, size = 20, color = colors.text, strokeWidth = 1.5) => {
    const IconComponent = icons[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth });
  };

  // ===== SCREENS =====

  function HomeScreen() {
    const recentWorlds = [
      { name: 'Aethermoor', entries: 47, lastEdited: '2 hours ago', progress: 0.72 },
      { name: 'Iron Wastes', entries: 23, lastEdited: 'Yesterday', progress: 0.38 },
      { name: 'Celestine Empire', entries: 89, lastEdited: '3 days ago', progress: 0.91 },
    ];

    return React.createElement('div', { style: { padding: '0 20px 100px', position: 'relative' } },
      // Header
      React.createElement('div', { style: { paddingTop: 60, paddingBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.secondary, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 } }, 'Welcome back, Worldsmith'),
          React.createElement('div', { style: { fontSize: 34, fontFamily, fontWeight: '700', color: colors.text, letterSpacing: -0.5 } }, 'RealmCrafter')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 8 } },
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 20, background: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` }
          }, renderIcon(isDark ? 'Sun' : 'Moon', 18, colors.secondary)),
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 20, background: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` }
          }, renderIcon('Bell', 18, colors.secondary))
        )
      ),

      // Daily Prompt Card
      React.createElement('div', {
        onClick: () => setShowPromptModal(true),
        style: {
          background: `linear-gradient(135deg, ${colors.primary} 0%, #1A3040 100%)`,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid rgba(215,176,121,0.2)`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(215,176,121,0.1)`,
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(215,176,121,0.08)', filter: 'blur(20px)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          renderIcon('Scroll', 16, colors.secondary),
          React.createElement('span', { style: { fontSize: 13, fontFamily, color: colors.secondary, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: '600' } }, "Today's Prompt")
        ),
        React.createElement('div', { style: { fontSize: 15, fontFamily, color: '#E8E0D4', lineHeight: 1.5, marginBottom: 16 } },
          '"A traveler arrives at a crossroads and finds a message carved into an ancient stone..."'
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, color: colors.cta, fontSize: 13, fontFamily, fontWeight: '600' } },
          React.createElement('span', null, 'Begin Writing'),
          renderIcon('ArrowRight', 14, colors.cta)
        )
      ),

      // Quick Actions
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 } },
        [
          { icon: 'Map', label: 'World Map', screen: 'map', tab: 'map' },
          { icon: 'BookOpen', label: 'Compendium', screen: 'compendium', tab: 'compendium' },
          { icon: 'Lightbulb', label: 'Prompts', screen: 'prompts', tab: 'prompts' },
          { icon: 'Users', label: 'Circles', screen: 'circles', tab: 'circles' },
        ].map((action, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => navigateTo(action.screen, action.tab),
            style: {
              background: colors.bgCard,
              borderRadius: 14,
              padding: '16px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              border: `1px solid ${colors.border}`,
              transition: 'all 0.2s ease',
              boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.2 : 0.05})`,
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: `linear-gradient(135deg, ${colors.primary}, ${isDark ? '#1A3040' : '#3A5868'})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px rgba(47,72,88,0.3)`,
              }
            }, renderIcon(action.icon, 18, colors.secondary)),
            React.createElement('span', { style: { fontSize: 15, fontFamily, color: colors.text, fontWeight: '600' } }, action.label)
          )
        )
      ),

      // Recent Worlds
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('span', { style: { fontSize: 22, fontFamily, fontWeight: '700', color: colors.text } }, 'Recent Worlds'),
          React.createElement('span', { style: { fontSize: 13, fontFamily, color: colors.cta, fontWeight: '600', cursor: 'pointer' } }, 'View All')
        ),
        recentWorlds.map((world, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: colors.bgCard,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.15 : 0.04})`,
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 17, fontFamily, fontWeight: '600', color: colors.text, marginBottom: 2 } }, world.name),
                React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.textSecondary } }, `${world.entries} entries · ${world.lastEdited}`)
              ),
              renderIcon('ChevronRight', 18, colors.textMuted)
            ),
            React.createElement('div', { style: { height: 4, borderRadius: 2, background: colors.border, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${world.progress * 100}%`, borderRadius: 2, background: `linear-gradient(90deg, ${colors.secondary}, ${colors.cta})`, transition: 'width 0.5s ease' } })
            )
          )
        )
      ),

      // Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 } },
        [
          { value: '159', label: 'Entries', icon: 'FileText' },
          { value: '3', label: 'Worlds', icon: 'Globe' },
          { value: '12', label: 'Streak', icon: 'Flame' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: colors.bgCard, borderRadius: 14, padding: '14px 10px', textAlign: 'center',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.15 : 0.04})`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } }, renderIcon(stat.icon, 16, colors.secondary)),
            React.createElement('div', { style: { fontSize: 22, fontFamily, fontWeight: '700', color: colors.text } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, fontFamily, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 } }, stat.label)
          )
        )
      )
    );
  }

  function MapScreen() {
    const terrainGradients = {
      water: isDark ? '#1A3040' : '#4A7A9A',
      land: isDark ? '#2A3A2A' : '#7A9A6A',
      mountain: isDark ? '#3A3A3A' : '#8A8A7A',
    };

    return React.createElement('div', { style: { position: 'relative', height: '100%' } },
      // Header
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          padding: '50px 20px 16px',
          background: `linear-gradient(180deg, ${colors.bg} 60%, transparent)`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.secondary, letterSpacing: 1.5, textTransform: 'uppercase' } }, 'World Map'),
            React.createElement('div', { style: { fontSize: 22, fontFamily, fontWeight: '700', color: colors.text } }, 'Aethermoor')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 18, background: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.border}`, cursor: 'pointer' }
            }, renderIcon('Layers', 16, colors.secondary)),
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 18, background: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.border}`, cursor: 'pointer' }
            }, renderIcon('Download', 16, colors.secondary))
          )
        )
      ),

      // Map Canvas
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 80,
          background: isDark
            ? 'radial-gradient(ellipse at 50% 40%, #1A3545 0%, #162530 40%, #0F1A22 100%)'
            : 'radial-gradient(ellipse at 50% 40%, #6AA0B8 0%, #4A8090 40%, #3A6878 100%)',
          overflow: 'hidden',
        }
      },
        // Map grid lines
        ...Array.from({ length: 8 }, (_, i) =>
          React.createElement('div', {
            key: `h${i}`,
            style: {
              position: 'absolute', left: 0, right: 0,
              top: `${(i + 1) * 12}%`,
              height: 1,
              background: `rgba(215,176,121,${isDark ? 0.05 : 0.08})`,
            }
          })
        ),
        ...Array.from({ length: 6 }, (_, i) =>
          React.createElement('div', {
            key: `v${i}`,
            style: {
              position: 'absolute', top: 0, bottom: 0,
              left: `${(i + 1) * 16}%`,
              width: 1,
              background: `rgba(215,176,121,${isDark ? 0.05 : 0.08})`,
            }
          })
        ),

        // Continent shapes (SVG-like divs)
        React.createElement('div', {
          style: {
            position: 'absolute', left: '15%', top: '20%', width: '55%', height: '55%',
            background: isDark
              ? 'radial-gradient(ellipse at 40% 40%, #2A3D2A 0%, #1E2D1E 60%, transparent 100%)'
              : 'radial-gradient(ellipse at 40% 40%, #8AB07A 0%, #6A9060 60%, transparent 100%)',
            borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
            transform: `scale(${mapZoom})`,
            transition: 'transform 0.3s ease',
            boxShadow: isDark ? '0 0 40px rgba(42,61,42,0.5)' : '0 0 40px rgba(106,144,96,0.3)',
          }
        },
          // Mountain range
          React.createElement('div', {
            style: {
              position: 'absolute', left: '30%', top: '20%', width: '40%', height: '15%',
              background: isDark
                ? 'linear-gradient(180deg, #4A4A3A 0%, #3A3A2A 100%)'
                : 'linear-gradient(180deg, #9A9A8A 0%, #8A8A7A 100%)',
              borderRadius: '50% 50% 30% 30%',
              opacity: 0.7,
            }
          }),
          // Forest area
          React.createElement('div', {
            style: {
              position: 'absolute', left: '10%', top: '50%', width: '30%', height: '25%',
              background: isDark ? 'rgba(30,60,30,0.6)' : 'rgba(60,120,60,0.4)',
              borderRadius: '50%',
              filter: 'blur(8px)',
            }
          }),
          // Desert area
          React.createElement('div', {
            style: {
              position: 'absolute', right: '15%', bottom: '20%', width: '25%', height: '20%',
              background: isDark ? 'rgba(80,65,30,0.5)' : 'rgba(180,160,100,0.4)',
              borderRadius: '40%',
              filter: 'blur(6px)',
            }
          })
        ),

        // Islands
        React.createElement('div', {
          style: {
            position: 'absolute', right: '10%', top: '30%', width: '12%', height: '10%',
            background: isDark
              ? 'radial-gradient(ellipse, #2A3D2A 0%, transparent 70%)'
              : 'radial-gradient(ellipse, #8AB07A 0%, transparent 70%)',
            borderRadius: '50%',
            transform: `scale(${mapZoom})`,
            transition: 'transform 0.3s ease',
          }
        }),

        // Map Pins
        ...mapPins.map(pin =>
          React.createElement('div', {
            key: pin.id,
            onClick: (e) => { e.stopPropagation(); setSelectedPin(selectedPin === pin.id ? null : pin.id); },
            style: {
              position: 'absolute',
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: `translate(-50%, -50%) scale(${mapZoom})`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              zIndex: selectedPin === pin.id ? 5 : 2,
            }
          },
            // Pin glow
            React.createElement('div', {
              style: {
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: selectedPin === pin.id ? 40 : 20,
                height: selectedPin === pin.id ? 40 : 20,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
                transition: 'all 0.3s ease',
              }
            }),
            // Pin dot
            React.createElement('div', {
              style: {
                width: 12, height: 12, borderRadius: 6,
                background: pin.type === 'castle' ? colors.cta : pin.type === 'city' ? colors.secondary : pin.type === 'forest' ? '#6A9A5A' : pin.type === 'dungeon' ? '#9A5AAA' : colors.secondary,
                border: `2px solid ${isDark ? '#E8E0D4' : '#FFF'}`,
                boxShadow: `0 2px 8px rgba(0,0,0,0.4)`,
                position: 'relative', zIndex: 1,
              }
            }),
            // Pin label
            selectedPin === pin.id && React.createElement('div', {
              style: {
                position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                marginBottom: 8,
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: '8px 12px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }
            },
              React.createElement('div', { style: { fontSize: 13, fontFamily, fontWeight: '600', color: colors.text } }, pin.name),
              React.createElement('div', { style: { fontSize: 11, fontFamily, color: colors.textSecondary, textTransform: 'capitalize' } }, pin.type)
            )
          )
        ),

        // Compass rose
        React.createElement('div', {
          style: {
            position: 'absolute', right: 16, bottom: 100,
            width: 44, height: 44, borderRadius: 22,
            background: `${colors.bgCard}E0`,
            border: `1px solid ${colors.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }
        }, renderIcon('Compass', 22, colors.secondary)),
      ),

      // Zoom controls
      React.createElement('div', {
        style: {
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 4, zIndex: 10,
        }
      },
        React.createElement('div', {
          onClick: () => setMapZoom(Math.min(mapZoom + 0.2, 2)),
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: `${colors.bgCard}E0`, border: `1px solid ${colors.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }
        }, renderIcon('Plus', 16, colors.text)),
        React.createElement('div', {
          onClick: () => setMapZoom(Math.max(mapZoom - 0.2, 0.6)),
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: `${colors.bgCard}E0`, border: `1px solid ${colors.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }
        }, renderIcon('Minus', 16, colors.text))
      ),

      // Add pin button
      React.createElement('div', {
        style: {
          position: 'absolute', left: 16, bottom: 100, zIndex: 10,
          padding: '10px 16px', borderRadius: 12,
          background: colors.cta,
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          boxShadow: `0 4px 16px ${colors.ctaGlow}`,
        }
      },
        renderIcon('MapPin', 16, '#FFF'),
        React.createElement('span', { style: { fontSize: 13, fontFamily, fontWeight: '600', color: '#FFF' } }, 'Add Pin')
      ),

      // AI Generate button
      React.createElement('div', {
        style: {
          position: 'absolute', left: 120, bottom: 100, zIndex: 10,
          padding: '10px 16px', borderRadius: 12,
          background: `${colors.bgCard}E0`,
          border: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          backdropFilter: 'blur(10px)',
        }
      },
        renderIcon('Wand2', 16, colors.secondary),
        React.createElement('span', { style: { fontSize: 13, fontFamily, fontWeight: '600', color: colors.text } }, 'AI Generate')
      )
    );
  }

  function CompendiumScreen() {
    const categories = [
      { key: 'all', label: 'All', icon: 'BookOpen' },
      { key: 'character', label: 'Characters', icon: 'User' },
      { key: 'location', label: 'Locations', icon: 'MapPin' },
      { key: 'magic', label: 'Magic', icon: 'Sparkles' },
      { key: 'event', label: 'Events', icon: 'Flame' },
      { key: 'race', label: 'Races', icon: 'TreePine' },
      { key: 'religion', label: 'Religion', icon: 'Moon' },
    ];

    const filtered = compendiumFilter === 'all' ? loreEntries : loreEntries.filter(e => e.type === compendiumFilter);

    const typeColors = {
      character: '#6A8AAA',
      location: '#8A6AAA',
      magic: '#AA8A6A',
      event: colors.cta,
      race: '#6AAA6A',
      religion: '#AA6A8A',
    };

    if (selectedEntry) {
      const entry = loreEntries.find(e => e.id === selectedEntry);
      const connected = loreEntries.filter(e => entry.connections.includes(e.id));

      return React.createElement('div', { style: { padding: '0 20px 100px', position: 'relative' } },
        // Back header
        React.createElement('div', { style: { paddingTop: 50, paddingBottom: 16, display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', {
            onClick: () => setSelectedEntry(null),
            style: { width: 36, height: 36, borderRadius: 18, background: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` }
          }, renderIcon('ArrowLeft', 18, colors.text)),
          React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 } }, entry.type)
        ),

        // Entry detail
        React.createElement('div', {
          style: {
            background: colors.bgCard, borderRadius: 20, padding: 24, marginBottom: 20,
            border: `1px solid ${colors.border}`,
            boxShadow: `0 4px 24px rgba(0,0,0,${isDark ? 0.2 : 0.08})`,
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60,
              background: `${typeColors[entry.type]}15`, filter: 'blur(30px)',
            }
          }),
          React.createElement('div', {
            style: {
              width: 56, height: 56, borderRadius: 16,
              background: `linear-gradient(135deg, ${typeColors[entry.type]}30, ${typeColors[entry.type]}10)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              border: `1px solid ${typeColors[entry.type]}30`,
            }
          }, renderIcon(entry.icon, 24, typeColors[entry.type])),
          React.createElement('div', { style: { fontSize: 22, fontFamily, fontWeight: '700', color: colors.text, marginBottom: 4 } }, entry.name),
          React.createElement('div', { style: { fontSize: 15, fontFamily, color: colors.secondary, marginBottom: 16, fontStyle: 'italic' } }, entry.subtitle),
          React.createElement('div', { style: { fontSize: 15, fontFamily, color: colors.textSecondary, lineHeight: 1.7 } }, entry.description)
        ),

        // Connections
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('div', { style: { fontSize: 17, fontFamily, fontWeight: '600', color: colors.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 } },
            renderIcon('Link', 16, colors.secondary),
            'Connections'
          ),
          connected.map(conn =>
            React.createElement('div', {
              key: conn.id,
              onClick: () => setSelectedEntry(conn.id),
              style: {
                background: colors.bgCard, borderRadius: 12, padding: 14, marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                border: `1px solid ${colors.border}`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10,
                  background: `${typeColors[conn.type]}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, renderIcon(conn.icon, 16, typeColors[conn.type])),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontFamily, fontWeight: '600', color: colors.text } }, conn.name),
                React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.textSecondary } }, conn.subtitle)
              ),
              renderIcon('ChevronRight', 16, colors.textMuted)
            )
          )
        ),

        // Relationship web visualization
        React.createElement('div', {
          style: {
            background: colors.bgCard, borderRadius: 16, padding: 20, marginBottom: 20,
            border: `1px solid ${colors.border}`,
          }
        },
          React.createElement('div', { style: { fontSize: 15, fontFamily, fontWeight: '600', color: colors.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 } },
            renderIcon('GitBranch', 16, colors.secondary),
            'Relationship Web'
          ),
          React.createElement('div', {
            style: {
              height: 150, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            // Center node
            React.createElement('div', {
              style: {
                width: 50, height: 50, borderRadius: 25,
                background: `linear-gradient(135deg, ${typeColors[entry.type]}50, ${typeColors[entry.type]}20)`,
                border: `2px solid ${typeColors[entry.type]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'absolute', zIndex: 2,
                boxShadow: `0 0 20px ${typeColors[entry.type]}40`,
              }
            }, renderIcon(entry.icon, 20, typeColors[entry.type])),
            // Connection nodes
            connected.map((conn, i) => {
              const angle = (i / connected.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * 60;
              const y = Math.sin(angle) * 50;
              return React.createElement(React.Fragment, { key: conn.id },
                // Line
                React.createElement('div', {
                  style: {
                    position: 'absolute', left: '50%', top: '50%',
                    width: Math.sqrt(x * x + y * y),
                    height: 1,
                    background: `linear-gradient(90deg, ${typeColors[entry.type]}60, ${typeColors[conn.type]}60)`,
                    transform: `rotate(${Math.atan2(y, x)}rad)`,
                    transformOrigin: '0 0',
                  }
                }),
                // Node
                React.createElement('div', {
                  style: {
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    width: 36, height: 36, borderRadius: 18,
                    background: `${typeColors[conn.type]}30`,
                    border: `1.5px solid ${typeColors[conn.type]}80`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2,
                  }
                }, renderIcon(conn.icon, 14, typeColors[conn.type]))
              );
            })
          )
        ),

        // Actions
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('div', {
            style: {
              flex: 1, padding: '14px 0', borderRadius: 12,
              background: colors.cta, textAlign: 'center',
              fontSize: 15, fontFamily, fontWeight: '600', color: '#FFF', cursor: 'pointer',
              boxShadow: `0 4px 16px ${colors.ctaGlow}`,
            }
          }, 'Edit Entry'),
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 12,
              background: colors.bgCard, border: `1px solid ${colors.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }
          }, renderIcon('Share2', 18, colors.text))
        )
      );
    }

    return React.createElement('div', { style: { padding: '0 20px 100px', position: 'relative' } },
      // Header
      React.createElement('div', { style: { paddingTop: 60, paddingBottom: 16 } },
        React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 } }, 'Lore Compendium'),
        React.createElement('div', { style: { fontSize: 34, fontFamily, fontWeight: '700', color: colors.text } }, 'Compendium')
      ),

      // Search
      React.createElement('div', {
        style: {
          background: colors.bgCard, borderRadius: 12, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          border: `1px solid ${colors.border}`,
        }
      },
        renderIcon('Search', 18, colors.textMuted),
        React.createElement('span', { style: { fontSize: 15, fontFamily, color: colors.textMuted } }, 'Search entries...')
      ),

      // Category filters
      React.createElement('div', {
        style: {
          display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 8,
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }
      },
        categories.map(cat =>
          React.createElement('div', {
            key: cat.key,
            onClick: () => setCompendiumFilter(cat.key),
            style: {
              padding: '8px 14px', borderRadius: 20,
              background: compendiumFilter === cat.key ? colors.primary : colors.bgCard,
              border: `1px solid ${compendiumFilter === cat.key ? colors.secondary + '40' : colors.border}`,
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'all 0.2s ease',
            }
          },
            renderIcon(cat.icon, 14, compendiumFilter === cat.key ? colors.secondary : colors.textSecondary),
            React.createElement('span', {
              style: {
                fontSize: 13, fontFamily, fontWeight: '500',
                color: compendiumFilter === cat.key ? colors.secondary : colors.textSecondary,
              }
            }, cat.label)
          )
        )
      ),

      // Entries
      filtered.map(entry =>
        React.createElement('div', {
          key: entry.id,
          onClick: () => setSelectedEntry(entry.id),
          style: {
            background: colors.bgCard, borderRadius: 14, padding: 16, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.15 : 0.04})`,
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              background: `linear-gradient(135deg, ${typeColors[entry.type]}25, ${typeColors[entry.type]}08)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              border: `1px solid ${typeColors[entry.type]}25`,
            }
          }, renderIcon(entry.icon, 20, typeColors[entry.type])),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { fontSize: 17, fontFamily, fontWeight: '600', color: colors.text, marginBottom: 2 } }, entry.name),
            React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, entry.subtitle)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 } },
            React.createElement('div', { style: { fontSize: 11, fontFamily, color: colors.textMuted, background: colors.surface, padding: '3px 8px', borderRadius: 6 } }, `${entry.connections.length}`),
            renderIcon('ChevronRight', 16, colors.textMuted)
          )
        )
      ),

      // Add new entry button
      React.createElement('div', {
        style: {
          position: 'fixed', bottom: 100, right: 30,
          width: 56, height: 56, borderRadius: 28,
          background: `linear-gradient(135deg, ${colors.cta}, #D05030)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: `0 6px 24px ${colors.ctaGlow}`,
          zIndex: 20,
        }
      }, renderIcon('Plus', 24, '#FFF', 2))
    );
  }

  function PromptsScreen() {
    return React.createElement('div', { style: { padding: '0 20px 100px', position: 'relative' } },
      // Header
      React.createElement('div', { style: { paddingTop: 60, paddingBottom: 20 } },
        React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 } }, 'Inspiration'),
        React.createElement('div', { style: { fontSize: 34, fontFamily, fontWeight: '700', color: colors.text } }, 'Prompts')
      ),

      // Weekly Challenge Banner
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
          renderIcon('Trophy', 18, colors.secondary),
          React.createElement('span', { style: { fontSize: 17, fontFamily, fontWeight: '600', color: colors.text } }, 'Weekly Challenges')
        ),
        weeklyChallenges.map(challenge =>
          React.createElement('div', {
            key: challenge.id,
            onClick: () => setExpandedChallenge(expandedChallenge === challenge.id ? null : challenge.id),
            style: {
              background: `linear-gradient(135deg, ${colors.primary} 0%, #1A3545 100%)`,
              borderRadius: 16, padding: 18, marginBottom: 10,
              border: `1px solid rgba(215,176,121,0.15)`,
              boxShadow: `0 4px 20px rgba(0,0,0,0.25)`,
              cursor: 'pointer', overflow: 'hidden',
              position: 'relative',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: -10, right: -10, width: 80, height: 80,
                borderRadius: 40, background: 'rgba(235,104,65,0.08)', filter: 'blur(20px)',
              }
            }),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', { style: { fontSize: 17, fontFamily, fontWeight: '700', color: '#E8E0D4' } }, challenge.title),
              React.createElement('div', {
                style: {
                  padding: '4px 10px', borderRadius: 8,
                  background: 'rgba(235,104,65,0.2)',
                  fontSize: 11, fontFamily, fontWeight: '600', color: colors.cta,
                }
              }, `${challenge.daysLeft}d left`)
            ),
            expandedChallenge === challenge.id && React.createElement('div', {
              style: { fontSize: 14, fontFamily, color: '#B0A898', lineHeight: 1.6, marginBottom: 12, transition: 'all 0.3s ease' }
            }, challenge.description),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  renderIcon('Users', 12, '#9A8E7F'),
                  React.createElement('span', { style: { fontSize: 12, fontFamily, color: '#9A8E7F' } }, `${challenge.participants} joined`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  renderIcon('Award', 12, colors.secondary),
                  React.createElement('span', { style: { fontSize: 12, fontFamily, color: colors.secondary } }, challenge.reward)
                )
              ),
              renderIcon(expandedChallenge === challenge.id ? 'ChevronUp' : 'ChevronDown', 16, '#9A8E7F')
            )
          )
        )
      ),

      // Daily Prompts
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
          renderIcon('Scroll', 18, colors.secondary),
          React.createElement('span', { style: { fontSize: 17, fontFamily, fontWeight: '600', color: colors.text } }, 'Daily Prompts')
        ),
        dailyPrompts.map(prompt =>
          React.createElement('div', {
            key: prompt.id,
            style: {
              background: colors.bgCard, borderRadius: 14, padding: 16, marginBottom: 10,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.15 : 0.04})`,
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 10 } },
              React.createElement('div', {
                style: {
                  padding: '3px 10px', borderRadius: 6,
                  background: `${colors.primary}40`, fontSize: 11, fontFamily, color: colors.secondary, fontWeight: '500',
                }
              }, prompt.category),
              React.createElement('div', {
                style: {
                  padding: '3px 10px', borderRadius: 6,
                  background: prompt.difficulty === 'Easy' ? 'rgba(106,170,106,0.15)' : prompt.difficulty === 'Medium' ? 'rgba(215,176,121,0.15)' : 'rgba(235,104,65,0.15)',
                  fontSize: 11, fontFamily, fontWeight: '500',
                  color: prompt.difficulty === 'Easy' ? '#6AAA6A' : prompt.difficulty === 'Medium' ? colors.secondary : colors.cta,
                }
              }, prompt.difficulty)
            ),
            React.createElement('div', { style: { fontSize: 15, fontFamily, color: colors.text, lineHeight: 1.6, marginBottom: 14 } }, prompt.text),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', {
                style: {
                  padding: '8px 16px', borderRadius: 10,
                  background: colors.cta, fontSize: 13, fontFamily, fontWeight: '600', color: '#FFF', cursor: 'pointer',
                }
              }, 'Start Writing'),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('div', {
                  onClick: (e) => { e.stopPropagation(); setLikedPrompts({ ...likedPrompts, [prompt.id]: !likedPrompts[prompt.id] }); },
                  style: { width: 36, height: 36, borderRadius: 10, background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` }
                }, renderIcon(likedPrompts[prompt.id] ? 'Heart' : 'Heart', 16, likedPrompts[prompt.id] ? colors.cta : colors.textMuted)),
                React.createElement('div', {
                  style: { width: 36, height: 36, borderRadius: 10, background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` }
                }, renderIcon('Share', 16, colors.textMuted))
              )
            )
          )
        )
      ),

      // Generate custom prompt
      React.createElement('div', {
        style: {
          background: colors.bgCard, borderRadius: 14, padding: 18,
          border: `1px dashed ${colors.secondary}40`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }
      },
        renderIcon('Wand2', 18, colors.secondary),
        React.createElement('span', { style: { fontSize: 15, fontFamily, fontWeight: '600', color: colors.secondary } }, 'Generate AI Prompt')
      )
    );
  }

  function CirclesScreen() {
    const activityColors = {
      'Very Active': '#6AAA6A',
      'Active': colors.secondary,
      'New': colors.cta,
    };

    return React.createElement('div', { style: { padding: '0 20px 100px', position: 'relative' } },
      // Header
      React.createElement('div', { style: { paddingTop: 60, paddingBottom: 20 } },
        React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 } }, 'Collaborative'),
        React.createElement('div', { style: { fontSize: 34, fontFamily, fontWeight: '700', color: colors.text } }, 'Story Circles')
      ),

      // Search & Create
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        React.createElement('div', {
          style: {
            flex: 1, background: colors.bgCard, borderRadius: 12, padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            border: `1px solid ${colors.border}`,
          }
        },
          renderIcon('Search', 18, colors.textMuted),
          React.createElement('span', { style: { fontSize: 15, fontFamily, color: colors.textMuted } }, 'Find circles...')
        ),
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: 12,
            background: colors.cta, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: `0 4px 16px ${colors.ctaGlow}`,
          }
        }, renderIcon('Plus', 20, '#FFF', 2))
      ),

      // My Circles
      React.createElement('div', { style: { fontSize: 17, fontFamily, fontWeight: '600', color: colors.text, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 } },
        renderIcon('BookMarked', 16, colors.secondary),
        'My Circles'
      ),

      storyCircles.map(circle =>
        React.createElement('div', {
          key: circle.id,
          style: {
            background: colors.bgCard, borderRadius: 16, padding: 18, marginBottom: 12,
            border: `1px solid ${colors.border}`,
            boxShadow: `0 2px 12px rgba(0,0,0,${isDark ? 0.15 : 0.05})`,
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: -20, right: -20, width: 80, height: 80,
              borderRadius: 40, background: colors.glow, filter: 'blur(20px)',
            }
          }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 50, height: 50, borderRadius: 14,
                background: `linear-gradient(135deg, ${colors.primary}, #1A3040)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
                border: `1px solid ${colors.border}`,
              }
            }, circle.avatar),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
                React.createElement('div', { style: { fontSize: 17, fontFamily, fontWeight: '600', color: colors.text } }, circle.name),
                React.createElement('div', { style: { fontSize: 11, fontFamily, color: colors.textMuted } }, circle.lastActive)
              ),
              React.createElement('div', { style: { fontSize: 13, fontFamily, color: colors.textSecondary, marginBottom: 10, lineHeight: 1.4 } }, circle.description),
              React.createElement('div', { style: { display: 'flex', alignItems: