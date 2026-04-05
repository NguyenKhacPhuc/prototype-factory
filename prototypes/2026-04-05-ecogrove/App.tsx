const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [terraShards, setTerraShards] = useState(1247);
  const [completedMoves, setCompletedMoves] = useState([]);
  const [plantedSeeds, setPlantedSeeds] = useState([
    { id: 1, name: 'Luminara Fern', type: 'flora', rarity: 'common', color: '#22C55E', x: 30, y: 40 },
    { id: 2, name: 'Crystal Bloom', type: 'flora', rarity: 'rare', color: '#F97316', x: 60, y: 55 },
    { id: 3, name: 'Ember Moth', type: 'fauna', rarity: 'uncommon', color: '#FB923C', x: 45, y: 30 },
    { id: 4, name: 'Dewdrop Vine', type: 'flora', rarity: 'common', color: '#34D399', x: 75, y: 65 },
    { id: 5, name: 'Starweaver Beetle', type: 'fauna', rarity: 'rare', color: '#FBBF24', x: 20, y: 60 },
  ]);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const themes = {
    dark: {
      bg: '#1F2937',
      surface: '#374151',
      surfaceAlt: '#2D3748',
      card: '#374151',
      cardAlt: '#4B5563',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      textMuted: '#9CA3AF',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      border: '#4B5563',
      overlay: 'rgba(17,24,39,0.85)',
    },
    light: {
      bg: '#F3F4F6',
      surface: '#FFFFFF',
      surfaceAlt: '#F9FAFB',
      card: '#FFFFFF',
      cardAlt: '#F3F4F6',
      text: '#1F2937',
      textSecondary: '#4B5563',
      textMuted: '#6B7280',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      border: '#E5E7EB',
      overlay: 'rgba(0,0,0,0.5)',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  const ecoMoves = [
    { id: 'm1', title: 'Morning Stretch Flow', duration: '5 min', type: 'movement', shards: 25, icon: 'Zap', description: 'Gentle full-body stretches to awaken your muscles' },
    { id: 'm2', title: 'Mindful Breathing', duration: '3 min', type: 'meditation', shards: 15, icon: 'Wind', description: 'Box breathing technique for calm focus' },
    { id: 'm3', title: 'Power Walk Burst', duration: '10 min', type: 'cardio', shards: 40, icon: 'Footprints', description: 'Brisk interval walking with varied pace' },
    { id: 'm4', title: 'Desk Reset', duration: '4 min', type: 'movement', shards: 20, icon: 'RotateCcw', description: 'Posture correction and shoulder release' },
    { id: 'm5', title: 'Gratitude Pause', duration: '2 min', type: 'meditation', shards: 10, icon: 'Heart', description: 'Reflect on three things you appreciate today' },
  ];

  const weeklyChallenges = [
    { id: 'c1', title: 'Forest Guardian', description: 'Complete 7 movement Eco-Moves this week', progress: 4, goal: 7, reward: 150, seedReward: 'Legendary Phantom Orchid', daysLeft: 3, difficulty: 'Medium' },
    { id: 'c2', title: 'Inner Calm', description: 'Practice 5 meditation sessions', progress: 2, goal: 5, reward: 100, seedReward: 'Rare Moonpetal Lily', daysLeft: 3, difficulty: 'Easy' },
    { id: 'c3', title: 'Eco-Warrior Sprint', description: 'Earn 200 Terra Shards in a single day', progress: 0, goal: 200, reward: 250, seedReward: 'Epic Thunderroot Tree', daysLeft: 3, difficulty: 'Hard' },
  ];

  const availableSeeds = [
    { id: 's1', name: 'Shimmer Fern', cost: 50, rarity: 'common', type: 'flora', color: '#22C55E' },
    { id: 's2', name: 'Blaze Orchid', cost: 120, rarity: 'uncommon', type: 'flora', color: '#F97316' },
    { id: 's3', name: 'Twilight Moth', cost: 200, rarity: 'rare', type: 'fauna', color: '#A78BFA' },
    { id: 's4', name: 'Coral Sprout', cost: 75, rarity: 'common', type: 'flora', color: '#FB923C' },
    { id: 's5', name: 'Glacial Beetle', cost: 300, rarity: 'epic', type: 'fauna', color: '#38BDF8' },
    { id: 's6', name: 'Aurora Vine', cost: 90, rarity: 'uncommon', type: 'flora', color: '#34D399' },
  ];

  const rarityColors = { common: '#9CA3AF', uncommon: '#22C55E', rare: '#F97316', epic: '#A78BFA', legendary: '#FBBF24' };

  const completeMove = (move) => {
    if (completedMoves.includes(move.id)) return;
    setCompletedMoves([...completedMoves, move.id]);
    setTerraShards(terraShards + move.shards);
  };

  const plantSeed = (seed) => {
    if (terraShards < seed.cost) return;
    setTerraShards(terraShards - seed.cost);
    setPlantedSeeds([...plantedSeeds, {
      ...seed,
      id: Date.now(),
      x: 15 + Math.random() * 70,
      y: 20 + Math.random() * 55,
    }]);
    setShowPlantModal(false);
  };

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 2 });
  };

  // --- SCREENS ---

  function HomeScreen() {
    const streak = 12;
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 28, fontWeight: 700, color: t.text, margin: 0, letterSpacing: '-0.5px' } }, 'Good Morning'),
          React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 14, color: t.textMuted, margin: '4px 0 0' } }, 'Your biome is thriving'),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: 44, height: 44, borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Stats Row
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 24 } },
        // Terra Shards
        React.createElement('div', { style: { flex: 1, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, borderRadius: 16, padding: '16px', position: 'relative', overflow: 'hidden' } },
          React.createElement('div', { style: { position: 'absolute', top: -10, right: -10, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
          React.createElement(Icon, { name: 'Diamond', size: 18, color: '#fff' }),
          React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 26, fontWeight: 700, color: '#fff', margin: '6px 0 2px' } }, terraShards.toLocaleString()),
          React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.8)', margin: 0 } }, 'Terra Shards'),
        ),
        // Streak
        React.createElement('div', { style: { flex: 1, background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` } },
          React.createElement(Icon, { name: 'Flame', size: 18, color: '#EF4444' }),
          React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 26, fontWeight: 700, color: t.text, margin: '6px 0 2px' } }, `${streak}`),
          React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: t.textMuted, margin: 0 } }, 'Day Streak'),
        ),
        // Biome
        React.createElement('div', {
          style: { flex: 1, background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}`, cursor: 'pointer' },
          onClick: () => setActiveScreen('biome'),
        },
          React.createElement(Icon, { name: 'TreePine', size: 18, color: t.cta }),
          React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 26, fontWeight: 700, color: t.text, margin: '6px 0 2px' } }, plantedSeeds.length),
          React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: t.textMuted, margin: 0 } }, 'Species'),
        ),
      ),

      // Biome Preview Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, #064E3B, #065F46, #047857)`,
          borderRadius: 20, padding: '20px', marginBottom: 24, cursor: 'pointer', position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)', transition: 'transform 0.2s',
        },
        onClick: () => setActiveScreen('biome'),
      },
        React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 70% 30%, rgba(34,197,94,0.3), transparent 60%)' } }),
        plantedSeeds.slice(0, 5).map((seed, i) =>
          React.createElement('div', {
            key: seed.id,
            style: {
              position: 'absolute', left: `${seed.x}%`, top: `${seed.y}%`,
              width: 10 + Math.random() * 8, height: 10 + Math.random() * 8,
              borderRadius: seed.type === 'flora' ? '50% 50% 50% 0' : '50%',
              background: seed.color, opacity: 0.7 + Math.random() * 0.3,
              animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
              boxShadow: `0 0 12px ${seed.color}60`,
            }
          })
        ),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('h2', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 } }, 'Your Biome'),
              React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '4px 0 0' } }, `${plantedSeeds.length} species flourishing`),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 12px' } },
              React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: '#fff' } }, 'View'),
              React.createElement(Icon, { name: 'ArrowRight', size: 14, color: '#fff' }),
            ),
          ),
        ),
      ),

      // Today's Eco-Moves
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 20, fontWeight: 700, color: t.text, margin: 0 } }, "Today's Eco-Moves"),
          React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: t.primary, fontWeight: 600 } }, `${completedMoves.length}/${ecoMoves.length} done`),
        ),
        ecoMoves.map((move, i) => {
          const done = completedMoves.includes(move.id);
          const typeColors = { movement: '#F97316', meditation: '#A78BFA', cardio: '#EF4444' };
          return React.createElement('div', {
            key: move.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: done ? (isDark ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.05)') : t.card,
              borderRadius: 14, marginBottom: 10, border: `1px solid ${done ? 'rgba(34,197,94,0.3)' : t.border}`,
              cursor: done ? 'default' : 'pointer', transition: 'all 0.2s',
              opacity: done ? 0.7 : 1, animation: `slideUp ${0.3 + i * 0.08}s ease`,
            },
            onClick: () => completeMove(move),
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? t.cta : `${typeColors[move.type]}20`, flexShrink: 0,
              }
            }, React.createElement(Icon, { name: done ? 'Check' : move.icon, size: 20, color: done ? '#fff' : typeColors[move.type] })),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 15, fontWeight: 600, color: t.text, margin: 0, textDecoration: done ? 'line-through' : 'none' } }, move.title),
              React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: t.textMuted, margin: '2px 0 0' } }, move.description),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' } },
                React.createElement(Icon, { name: 'Diamond', size: 12, color: t.primary }),
                React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 14, fontWeight: 700, color: t.primary } }, `+${move.shards}`),
              ),
              React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: t.textMuted } }, move.duration),
            ),
          );
        }),
      ),
    );
  }

  function BiomeScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 28, fontWeight: 700, color: t.text, margin: 0 } }, 'Your Biome'),
        React.createElement('button', {
          onClick: () => setShowPlantModal(true),
          style: {
            display: 'flex', alignItems: 'center', gap: 6, background: t.cta, border: 'none',
            borderRadius: 12, padding: '10px 16px', cursor: 'pointer', transition: 'all 0.2s',
          },
        },
          React.createElement(Icon, { name: 'Plus', size: 16, color: '#fff' }),
          React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 14, fontWeight: 600, color: '#fff' } }, 'Plant Seed'),
        ),
      ),

      // Biome Visualization
      React.createElement('div', {
        style: {
          background: 'linear-gradient(180deg, #064E3B 0%, #065F46 40%, #047857 70%, #059669 100%)',
          borderRadius: 24, height: 320, position: 'relative', overflow: 'hidden', marginBottom: 20,
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        }
      },
        // Sky gradient overlay
        React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(180deg, rgba(30,58,138,0.3), transparent)' } }),
        // Stars
        ...[...Array(8)].map((_, i) =>
          React.createElement('div', {
            key: `star-${i}`,
            style: {
              position: 'absolute', left: `${10 + Math.random() * 80}%`, top: `${5 + Math.random() * 25}%`,
              width: 3, height: 3, borderRadius: '50%', background: '#fff',
              opacity: 0.4 + Math.random() * 0.4, animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            }
          })
        ),
        // Ground
        React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.2))' } }),
        // Planted elements
        plantedSeeds.map((seed, i) => {
          const isFlora = seed.type === 'flora';
          const size = seed.rarity === 'rare' ? 28 : seed.rarity === 'epic' ? 32 : seed.rarity === 'uncommon' ? 24 : 20;
          return React.createElement('div', {
            key: seed.id,
            onClick: () => setSelectedSeed(selectedSeed?.id === seed.id ? null : seed),
            style: {
              position: 'absolute', left: `${seed.x}%`, top: `${seed.y}%`,
              cursor: 'pointer', transition: 'transform 0.3s',
              transform: selectedSeed?.id === seed.id ? 'scale(1.4)' : 'scale(1)',
              zIndex: selectedSeed?.id === seed.id ? 10 : 1,
            }
          },
            isFlora
              ? React.createElement('div', { style: {
                  width: size, height: size * 1.2,
                  background: seed.color, borderRadius: '50% 50% 50% 0',
                  boxShadow: `0 0 ${size}px ${seed.color}50`,
                  animation: `pulse ${2 + i * 0.4}s ease-in-out infinite`,
                  transform: `rotate(${-20 + Math.random() * 40}deg)`,
                } })
              : React.createElement('div', { style: {
                  width: size, height: size,
                  background: seed.color, borderRadius: '50%',
                  boxShadow: `0 0 ${size}px ${seed.color}50`,
                  animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
                } })
          );
        }),
        // Biome name
        React.createElement('div', {
          style: { position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' } }, 'Emerald Canopy'),
          React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, `${plantedSeeds.length} species`),
        ),
      ),

      // Selected Seed Info
      selectedSeed && React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: '16px', marginBottom: 16,
          border: `2px solid ${selectedSeed.color}40`, animation: 'slideUp 0.3s ease',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 14,
              background: `${selectedSeed.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(Icon, { name: selectedSeed.type === 'flora' ? 'Flower2' : 'Bug', size: 24, color: selectedSeed.color })),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 18, fontWeight: 700, color: t.text, margin: 0 } }, selectedSeed.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 } },
              React.createElement('span', {
                style: {
                  fontFamily: '"Barlow", sans-serif', fontSize: 11, fontWeight: 600,
                  color: rarityColors[selectedSeed.rarity], textTransform: 'uppercase', letterSpacing: 1,
                }
              }, selectedSeed.rarity),
              React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: t.textMuted } }, `\u2022 ${selectedSeed.type}`),
            ),
          ),
        ),
      ),

      // Seed Collection
      React.createElement('h2', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 14px' } }, 'Seed Collection'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
        plantedSeeds.map((seed) =>
          React.createElement('div', {
            key: seed.id,
            onClick: () => setSelectedSeed(seed),
            style: {
              background: t.card, borderRadius: 14, padding: '14px 10px', textAlign: 'center',
              border: `1px solid ${selectedSeed?.id === seed.id ? seed.color : t.border}`,
              cursor: 'pointer', transition: 'all 0.2s',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10, margin: '0 auto 8px',
                background: `${seed.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(Icon, { name: seed.type === 'flora' ? 'Leaf' : 'Bug', size: 18, color: seed.color })),
            React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 12, fontWeight: 600, color: t.text, margin: 0 } }, seed.name),
            React.createElement('span', {
              style: { fontFamily: '"Barlow", sans-serif', fontSize: 10, color: rarityColors[seed.rarity], textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }
            }, seed.rarity),
          )
        ),
      ),

      // Plant Modal
      showPlantModal && React.createElement('div', {
        style: {
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: t.overlay,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100,
          animation: 'fadeIn 0.2s ease',
        },
        onClick: (e) => { if (e.target === e.currentTarget) setShowPlantModal(false); }
      },
        React.createElement('div', {
          style: {
            width: '100%', maxWidth: 375, background: t.bg, borderRadius: '24px 24px 0 0',
            padding: '24px 16px 40px', maxHeight: '70%', overflowY: 'auto',
            animation: 'slideUp 0.3s ease',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
            React.createElement('h2', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'Plant a Seed'),
            React.createElement('button', {
              onClick: () => setShowPlantModal(false),
              style: { width: 36, height: 36, borderRadius: 10, background: t.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, React.createElement(Icon, { name: 'X', size: 18, color: t.textMuted })),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: '8px 12px', background: t.surface, borderRadius: 10 } },
            React.createElement(Icon, { name: 'Diamond', size: 14, color: t.primary }),
            React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 14, fontWeight: 600, color: t.text } }, `${terraShards} shards available`),
          ),
          availableSeeds.map((seed) =>
            React.createElement('div', {
              key: seed.id,
              style: {
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px',
                background: t.card, borderRadius: 14, marginBottom: 10, border: `1px solid ${t.border}`,
                opacity: terraShards < seed.cost ? 0.5 : 1,
              }
            },
              React.createElement('div', {
                style: { width: 44, height: 44, borderRadius: 12, background: `${seed.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
              }, React.createElement(Icon, { name: seed.type === 'flora' ? 'Flower2' : 'Bug', size: 22, color: seed.color })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, seed.name),
                React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: rarityColors[seed.rarity], textTransform: 'uppercase', fontWeight: 600 } }, seed.rarity),
              ),
              React.createElement('button', {
                onClick: () => plantSeed(seed),
                disabled: terraShards < seed.cost,
                style: {
                  display: 'flex', alignItems: 'center', gap: 4, background: terraShards >= seed.cost ? t.cta : t.cardAlt,
                  border: 'none', borderRadius: 10, padding: '8px 14px', cursor: terraShards >= seed.cost ? 'pointer' : 'default',
                }
              },
                React.createElement(Icon, { name: 'Diamond', size: 12, color: '#fff' }),
                React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 13, fontWeight: 600, color: '#fff' } }, seed.cost),
              ),
            )
          ),
        ),
      ),
    );
  }

  function ChallengesScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 28, fontWeight: 700, color: t.text, margin: '0 0 6px' } }, 'Eco-Challenges'),
      React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 14, color: t.textMuted, margin: '0 0 24px' } }, 'Weekly events with rare rewards'),

      // Featured Challenge
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #7C3AED, #5B21B6)`,
          borderRadius: 20, padding: '20px', marginBottom: 20, position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(124,58,237,0.3)',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
            React.createElement(Icon, { name: 'Crown', size: 18, color: '#FBBF24' }),
            React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 13, fontWeight: 600, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: 1 } }, 'Limited Event'),
          ),
          React.createElement('h2', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px' } }, 'Bloom Festival'),
          React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 16px' } }, 'Complete 15 Eco-Moves before the festival ends to unlock the mythical Aurora Blossom.'),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 8, height: 8, marginBottom: 8, overflow: 'hidden' } },
            React.createElement('div', { style: { width: '45%', height: '100%', background: '#FBBF24', borderRadius: 8, transition: 'width 0.5s ease' } }),
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' } }, '7 / 15 Eco-Moves'),
            React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: '#FBBF24' } }, '2 days left'),
          ),
        ),
      ),

      // Weekly Challenges
      React.createElement('h2', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 14px' } }, 'This Week'),
      weeklyChallenges.map((ch, i) => {
        const diffColors = { Easy: '#22C55E', Medium: '#F97316', Hard: '#EF4444' };
        const progress = ch.id === 'c3' ? (ch.progress / ch.goal) : (ch.progress / ch.goal);
        return React.createElement('div', {
          key: ch.id,
          onClick: () => setActiveChallenge(activeChallenge === ch.id ? null : ch.id),
          style: {
            background: t.card, borderRadius: 16, padding: '16px', marginBottom: 12,
            border: `1px solid ${activeChallenge === ch.id ? t.primary : t.border}`,
            cursor: 'pointer', transition: 'all 0.2s', animation: `slideUp ${0.3 + i * 0.1}s ease`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                React.createElement('h3', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, ch.title),
                React.createElement('span', {
                  style: {
                    fontFamily: '"Barlow", sans-serif', fontSize: 10, fontWeight: 600,
                    color: diffColors[ch.difficulty], background: `${diffColors[ch.difficulty]}15`,
                    padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase',
                  }
                }, ch.difficulty),
              ),
              React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 13, color: t.textMuted, margin: 0 } }, ch.description),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, marginLeft: 12 } },
              React.createElement(Icon, { name: 'Clock', size: 12, color: t.textMuted }),
              React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: t.textMuted } }, `${ch.daysLeft}d`),
            ),
          ),
          // Progress bar
          React.createElement('div', { style: { background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', borderRadius: 6, height: 6, marginBottom: 10, overflow: 'hidden' } },
            React.createElement('div', { style: { width: `${progress * 100}%`, height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`, borderRadius: 6, transition: 'width 0.5s ease' } }),
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: t.textMuted } }, `${ch.progress} / ${ch.goal}`),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Diamond', size: 12, color: t.primary }),
                React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 13, fontWeight: 600, color: t.primary } }, `+${ch.reward}`),
              ),
            ),
          ),
          // Expanded reward info
          activeChallenge === ch.id && React.createElement('div', {
            style: {
              marginTop: 12, padding: '12px', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              borderRadius: 10, animation: 'fadeIn 0.2s ease',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
              React.createElement(Icon, { name: 'Gift', size: 14, color: '#FBBF24' }),
              React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 13, fontWeight: 600, color: '#FBBF24' } }, 'Seed Reward'),
            ),
            React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 13, color: t.textSecondary, margin: 0 } }, ch.seedReward),
          ),
        );
      }),

      // Past Challenges
      React.createElement('h2', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 20, fontWeight: 700, color: t.text, margin: '8px 0 14px' } }, 'Completed'),
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}`,
          opacity: 0.6,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${t.cta}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'CheckCircle', size: 22, color: t.cta }),
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, 'Spring Awakening'),
            React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: t.textMuted, margin: '2px 0 0' } }, 'Earned: Crystal Dewdrop Vine'),
          ),
        ),
      ),
    );
  }

  function InsightsScreen() {
    const weeklyData = [35, 55, 40, 70, 50, 85, 60];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = Math.max(...weeklyData);

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 28, fontWeight: 700, color: t.text, margin: '0 0 6px' } }, 'Eco-Insights'),
      React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 14, color: t.textMuted, margin: '0 0 24px' } }, 'Your wellness journey at a glance'),

      // Summary Cards
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 } },
        [
          { label: 'Eco-Moves This Week', value: '23', icon: 'Activity', color: t.primary, sub: '+15% vs last week' },
          { label: 'Shards Earned', value: '486', icon: 'Diamond', color: '#FBBF24', sub: 'Best week yet' },
          { label: 'Biome Growth', value: '+3', icon: 'Sprout', color: t.cta, sub: 'New species added' },
          { label: 'Mindful Minutes', value: '42', icon: 'Brain', color: '#A78BFA', sub: 'Avg 6 min/day' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}`,
              animation: `slideUp ${0.3 + i * 0.08}s ease`,
            }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
              React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color }),
            ),
            React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 28, fontWeight: 700, color: t.text, margin: '0 0 2px' } }, stat.value),
            React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 13, fontWeight: 600, color: t.textSecondary, margin: '0 0 4px' } }, stat.label),
            React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: stat.color } }, stat.sub),
          )
        ),
      ),

      // Weekly Activity Chart
      React.createElement('div', {
        style: { background: t.card, borderRadius: 20, padding: '20px', marginBottom: 20, border: `1px solid ${t.border}` }
      },
        React.createElement('h3', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 18, fontWeight: 700, color: t.text, margin: '0 0 20px' } }, 'Weekly Activity'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, marginBottom: 8 } },
          weeklyData.map((val, i) =>
            React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
              React.createElement('div', {
                style: {
                  width: '100%', height: `${(val / maxVal) * 100}px`,
                  background: i === 5 ? `linear-gradient(180deg, ${t.primary}, ${t.secondary})` : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
                  borderRadius: 6, transition: 'height 0.5s ease', minHeight: 8,
                }
              }),
            )
          ),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          days.map((day, i) =>
            React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center' } },
              React.createElement('span', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 11, color: i === 5 ? t.primary : t.textMuted } }, day),
            )
          ),
        ),
      ),

      // Activity Breakdown
      React.createElement('div', {
        style: { background: t.card, borderRadius: 20, padding: '20px', marginBottom: 20, border: `1px solid ${t.border}` }
      },
        React.createElement('h3', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 18, fontWeight: 700, color: t.text, margin: '0 0 16px' } }, 'Activity Breakdown'),
        [
          { type: 'Movement', pct: 45, color: '#F97316', icon: 'Zap' },
          { type: 'Meditation', pct: 30, color: '#A78BFA', icon: 'Wind' },
          { type: 'Cardio', pct: 25, color: '#EF4444', icon: 'Footprints' },
        ].map((act, i) =>
          React.createElement('div', { key: i, style: { marginBottom: i < 2 ? 14 : 0 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement(Icon, { name: act.icon, size: 14, color: act.color }),
                React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 14, fontWeight: 600, color: t.text } }, act.type),
              ),
              React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 14, fontWeight: 600, color: act.color } }, `${act.pct}%`),
            ),
            React.createElement('div', { style: { background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', borderRadius: 4, height: 6, overflow: 'hidden' } },
              React.createElement('div', { style: { width: `${act.pct}%`, height: '100%', background: act.color, borderRadius: 4, transition: 'width 0.5s ease' } }),
            ),
          )
        ),
      ),

      // Biome Health
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #064E3B, #065F46)`,
          borderRadius: 20, padding: '20px', position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.15)' } }),
        React.createElement('h3', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 14px' } }, 'Biome Health'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('div', {
            style: {
              width: 72, height: 72, borderRadius: '50%', border: '4px solid #22C55E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(34,197,94,0.1)',
            }
          },
            React.createElement('span', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 26, fontWeight: 700, color: '#22C55E' } }, '92'),
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: '"Barlow Condensed", sans-serif', fontSize: 16, fontWeight: 600, color: '#fff', margin: '0 0 4px' } }, 'Thriving'),
            React.createElement('p', { style: { fontFamily: '"Barlow", sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0 } }, 'Your consistent activity keeps your biome vibrant and biodiverse. Keep nurturing it!'),
          ),
        ),
      ),
    );
  }

  // --- NAVIGATION ---

  const screens = { home: HomeScreen, biome: BiomeScreen, challenges: ChallengesScreen, insights: InsightsScreen };
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'biome', label: 'Biome', icon: 'TreePine' },
    { id: 'challenges', label: 'Challenges', icon: 'Trophy' },
    { id: 'insights', label: 'Insights', icon: 'BarChart3' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0', fontFamily: '"Barlow", sans-serif' }
  },
    // Style tag for fonts and animations
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.15); opacity: 1; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 0; }
    `),

    // Phone Frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
        background: t.bg, position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable Content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      },
        React.createElement(screens[activeScreen]),
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: isDark ? 'rgba(31,41,55,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          padding: '8px 0 24px', display: 'flex', justifyContent: 'space-around',
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
              minWidth: 56, minHeight: 44, transition: 'all 0.2s',
            }
          },
            React.createElement(Icon, {
              name: item.icon, size: 22,
              color: activeScreen === item.id ? t.primary : t.textMuted,
            }),
            React.createElement('span', {
              style: {
                fontFamily: '"Barlow Condensed", sans-serif', fontSize: 11, fontWeight: 600,
                color: activeScreen === item.id ? t.primary : t.textMuted,
                letterSpacing: 0.3,
              }
            }, item.label),
            activeScreen === item.id && React.createElement('div', {
              style: { width: 4, height: 4, borderRadius: '50%', background: t.primary, marginTop: 1 }
            }),
          )
        ),
      ),
    ),
  );
}
