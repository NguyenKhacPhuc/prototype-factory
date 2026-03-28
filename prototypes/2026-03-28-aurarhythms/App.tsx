function App() {
  const { useState, useEffect, useRef } = React;

  // ─── Theme ────────────────────────────────────────────────────────────────
  const themes = {
    dark: {
      bg: '#0A0812',
      surface: '#130F1F',
      surfaceAlt: '#1C1730',
      border: '#2E2550',
      text: '#F0EAF8',
      textSecondary: '#9B8BB8',
      textMuted: '#5C4E78',
      primary: '#9B6DFF',
      primaryGlow: 'rgba(155,109,255,0.35)',
      secondary: '#FF6B9D',
      accent: '#4ECDC4',
      gold: '#FFD166',
      cardBg: '#1A1530',
      navBg: '#0F0B1A',
      statusBar: '#0A0812',
      seasonGradient: 'linear-gradient(135deg, #1a0a3e 0%, #0d1f3c 50%, #1a0a3e 100%)',
      auraColors: ['#9B6DFF', '#FF6B9D', '#4ECDC4', '#FFD166'],
    },
    light: {
      bg: '#F5F0FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE6FF',
      border: '#D4C3FF',
      text: '#1A0A3E',
      textSecondary: '#6B4CA0',
      textMuted: '#9E84CC',
      primary: '#7B3FE4',
      primaryGlow: 'rgba(123,63,228,0.2)',
      secondary: '#E8447A',
      accent: '#2BAAAA',
      gold: '#E8A020',
      cardBg: '#FFFFFF',
      navBg: '#FFFFFF',
      statusBar: '#F5F0FF',
      seasonGradient: 'linear-gradient(135deg, #e8d5ff 0%, #c5e0ff 50%, #e8d5ff 100%)',
      auraColors: ['#7B3FE4', '#E8447A', '#2BAAAA', '#E8A020'],
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [playingSound, setPlayingSound] = useState(null);
  const [auraLevel, setAuraLevel] = useState(67);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [expandedLore, setExpandedLore] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const btnPress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  // ─── Data ─────────────────────────────────────────────────────────────────
  const currentSeason = { name: 'Spring', emoji: '🌸', color: '#FF6B9D', secondColor: '#9B6DFF' };

  const challenges = [
    {
      id: 1, title: 'Dawn Ritual Composer', category: 'Creative Ritual',
      season: 'Spring', difficulty: 'Gentle', xp: 120,
      description: 'Design a 5-minute morning ceremony using three sensory elements that symbolize renewal.',
      badge: '🌅', progress: 60, time: '5 min', completed: false,
      lore: 'Ancient Celtic dawn rituals used the rising sun as a canvas for setting intention — they believed the first light carried the energy of possibility.',
    },
    {
      id: 2, title: 'Petal Memory Weave', category: 'Seasonal Lore',
      season: 'Spring', difficulty: 'Reflective', xp: 85,
      description: 'Match five Japanese Hanami traditions to their hidden psychological meanings.',
      badge: '🌸', progress: 100, time: '3 min', completed: true,
      lore: 'Hanami (花見) literally means "flower viewing" — but its deeper practice is about embracing impermanence, a concept called mono no aware.',
    },
    {
      id: 3, title: 'Sonic Bloom Pattern', category: 'Sound Alchemy',
      season: 'Spring', difficulty: 'Creative', xp: 150,
      description: 'Arrange four elemental sounds into a 16-beat pattern that evokes spring awakening.',
      badge: '🎵', progress: 30, time: '8 min', completed: false,
      lore: 'Biophonic soundscapes — the sounds of living organisms — activate the parasympathetic nervous system within 4 minutes of listening.',
    },
    {
      id: 4, title: 'Ancient Green Decoder', category: 'Wisdom Quest',
      season: 'Spring', difficulty: 'Curious', xp: 95,
      description: 'Decode three plant-based metaphors from Persian poetry and connect them to your current emotional state.',
      badge: '🌿', progress: 0, time: '6 min', completed: false,
      lore: 'Persian poets used specific flowers as emotional codes — the narcissus meant self-awareness, the rose meant divine love, cypress meant steadfastness.',
    },
  ];

  const communityPosts = [
    { user: 'Luna Vex', handle: '@lunav', auraColor: '#9B6DFF', level: 'Spring Elder', badge: '🌅', activity: 'completed Dawn Ritual Composer', time: '2m', likes: 24, streak: 12 },
    { user: 'Kai Storm', handle: '@kaistorm', auraColor: '#4ECDC4', level: 'Spring Adept', badge: '🎵', activity: 'reached Aura Level 80', time: '8m', likes: 41, streak: 7 },
    { user: 'Nova Ash', handle: '@novaash', auraColor: '#FF6B9D', level: 'Spring Seeker', badge: '🌸', activity: 'unlocked Petal Memory Weave', time: '15m', likes: 18, streak: 5 },
    { user: 'Zephyr', handle: '@zeph_r', auraColor: '#FFD166', level: 'Winter Sage', badge: '⚡', activity: 'mastered 3 quests this week', time: '1h', likes: 67, streak: 31 },
    { user: 'Mira Solaris', handle: '@miras', auraColor: '#FF6B9D', level: 'Spring Adept', badge: '🌿', activity: 'composed a new sonic bloom', time: '2h', likes: 33, streak: 9 },
  ];

  const soundscapes = [
    { id: 'forest', name: 'Spring Forest', icon: '🌿', desc: 'Rain on leaves, birds, soft breeze' },
    { id: 'rain', name: 'Gentle Rain', icon: '🌧️', desc: 'Rhythmic drops, distant thunder' },
    { id: 'bloom', name: 'Bloom Frequency', icon: '🌸', desc: '432Hz tones with floral harmonics' },
    { id: 'cosmic', name: 'Cosmic Spring', icon: '✨', desc: 'Synthesized nature meets space ambience' },
  ];

  const achievements = [
    { title: 'First Bloom', desc: 'Complete your first spring quest', icon: '🌸', earned: true },
    { title: 'Dawn Keeper', desc: 'Check in 7 mornings in a row', icon: '🌅', earned: true },
    { title: 'Sound Weaver', desc: 'Create 3 sonic patterns', icon: '🎵', earned: false },
    { title: 'Lore Scholar', desc: 'Read all seasonal lore entries', icon: '📖', earned: false },
    { title: 'Aura Elder', desc: 'Reach aura level 90', icon: '⚡', earned: false },
    { title: 'Tribe Leader', desc: 'Get 50 likes on posts', icon: '👑', earned: false },
  ];

  // ─── Aura Ring Component ──────────────────────────────────────────────────
  const AuraRing = ({ size = 160, level = 67, colors = t.auraColors, animated = true }) => {
    const r = size / 2 - 16;
    const circ = 2 * Math.PI * r;
    const progress = (level / 100) * circ;
    const center = size / 2;

    return React.createElement('div', {
      style: { position: 'relative', width: size, height: size, flexShrink: 0 }
    },
      React.createElement('svg', { width: size, height: size, style: { position: 'absolute', top: 0, left: 0 } },
        React.createElement('defs', null,
          React.createElement('linearGradient', { id: 'auraGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
            React.createElement('stop', { offset: '0%', stopColor: colors[0] }),
            React.createElement('stop', { offset: '50%', stopColor: colors[1] }),
            React.createElement('stop', { offset: '100%', stopColor: colors[2] }),
          ),
          React.createElement('filter', { id: 'glow' },
            React.createElement('feGaussianBlur', { stdDeviation: '3', result: 'coloredBlur' }),
            React.createElement('feMerge', null,
              React.createElement('feMergeNode', { in: 'coloredBlur' }),
              React.createElement('feMergeNode', { in: 'SourceGraphic' }),
            )
          )
        ),
        // Background ring
        React.createElement('circle', {
          cx: center, cy: center, r,
          fill: 'none', stroke: isDark ? '#2E2550' : '#D4C3FF', strokeWidth: 8
        }),
        // Progress ring
        React.createElement('circle', {
          cx: center, cy: center, r,
          fill: 'none', stroke: 'url(#auraGrad)', strokeWidth: 8,
          strokeLinecap: 'round',
          strokeDasharray: `${progress} ${circ}`,
          strokeDashoffset: circ * 0.25,
          style: { filter: 'url(#glow)', transition: 'stroke-dasharray 0.8s ease' },
          transform: `rotate(-90, ${center}, ${center})`,
        }),
        // Outer glow ring
        React.createElement('circle', {
          cx: center, cy: center, r: r + 10,
          fill: 'none', stroke: colors[0], strokeWidth: 1,
          opacity: 0.3,
        }),
      ),
      // Center content
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement('span', { style: { fontSize: size > 120 ? 28 : 20, marginBottom: 2 } }, currentSeason.emoji),
        React.createElement('div', {
          style: { fontSize: size > 120 ? 24 : 16, fontWeight: 700, color: t.primary, lineHeight: 1 }
        }, `${level}`),
        React.createElement('div', {
          style: { fontSize: size > 120 ? 10 : 8, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 }
        }, 'AURA'),
      )
    );
  };

  // ─── Home Screen ──────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const dailyQuote = '"The cherry blossom teaches us beauty lives in the brief, the bold, the brave."';

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      // Hero section
      React.createElement('div', {
        style: {
          background: t.seasonGradient,
          padding: '16px 20px 28px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Decorative particles
        ...[...Array(6)].map((_, i) =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute',
              width: [6,4,8,5,7,4][i],
              height: [6,4,8,5,7,4][i],
              borderRadius: '50%',
              background: t.auraColors[i % 4],
              opacity: 0.4,
              top: `${[20,60,40,80,15,70][i]}%`,
              left: `${[10,80,50,20,90,65][i]}%`,
            }
          })
        ),
        // Greeting
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginBottom: 4 } },
            `Saturday, March 28 · ${currentSeason.emoji} ${currentSeason.name}`
          ),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text } },
            'Evening Check-in 🌙'
          ),
        ),
        // Aura ring center
        React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }
        },
          React.createElement(AuraRing, { size: 160, level: auraLevel, colors: t.auraColors }),
          React.createElement('div', {
            style: { marginTop: 12, textAlign: 'center' }
          },
            React.createElement('div', {
              style: { fontSize: 16, fontWeight: 700, color: t.text }
            }, 'Spring Adept'),
            React.createElement('div', {
              style: { fontSize: 12, color: t.textSecondary, marginTop: 2 }
            }, `${100 - auraLevel} XP to Spring Elder`),
          ),
        ),
        // Check-in button
        React.createElement('button', {
          onClick: () => { setCheckedIn(!checkedIn); if (!checkedIn) setAuraLevel(Math.min(100, auraLevel + 3)); btnPress('checkin'); },
          style: {
            width: '100%', padding: '14px', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: checkedIn
              ? `linear-gradient(135deg, ${t.accent}, ${t.primary})`
              : `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            color: '#fff', fontSize: 15, fontWeight: 700,
            transform: pressedBtn === 'checkin' ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.15s ease, background 0.3s ease',
            boxShadow: `0 4px 20px ${t.primaryGlow}`,
          }
        }, checkedIn ? '✓ Checked In — Aura Glowing' : '✦ Begin Evening Check-in'),
      ),

      // Daily quote
      React.createElement('div', {
        style: {
          margin: '16px 16px 0',
          padding: '14px 16px',
          background: t.cardBg,
          borderRadius: 16,
          borderLeft: `3px solid ${t.primary}`,
        }
      },
        React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 } }, 'Today\'s Insight'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontStyle: 'italic', lineHeight: 1.6 } }, dailyQuote),
      ),

      // Active quests
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Active Quests'),
          React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all'),
        ),
        ...challenges.filter(c => !c.completed).slice(0, 2).map(c =>
          React.createElement('div', {
            key: c.id,
            onClick: () => { setActiveChallenge(c); setActiveTab('challenges'); },
            style: {
              background: t.cardBg,
              borderRadius: 16,
              padding: '14px',
              marginBottom: 10,
              border: `1px solid ${t.border}`,
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: 10 } },
              React.createElement('span', { style: { fontSize: 24, marginRight: 12 } }, c.badge),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, c.title),
                React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 2 } }, `${c.category} · ${c.time} · +${c.xp} XP`),
              ),
            ),
            React.createElement('div', {
              style: { height: 4, background: isDark ? '#2E2550' : '#E8D5FF', borderRadius: 2, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${c.progress}%`,
                  background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                  borderRadius: 2, transition: 'width 0.6s ease',
                }
              })
            ),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 4 } }, `${c.progress}% complete`),
          )
        ),
      ),

      // Ambient section
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Ambient Atmosphere'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          soundscapes.map(s =>
            React.createElement('div', {
              key: s.id,
              onClick: () => { setPlayingSound(playingSound === s.id ? null : s.id); btnPress(s.id); },
              style: {
                background: playingSound === s.id ? `linear-gradient(135deg, ${t.primary}22, ${t.secondary}22)` : t.cardBg,
                border: `1px solid ${playingSound === s.id ? t.primary : t.border}`,
                borderRadius: 14, padding: '12px',
                cursor: 'pointer',
                transform: pressedBtn === s.id ? 'scale(0.96)' : 'scale(1)',
                transition: 'all 0.15s ease',
              }
            },
              React.createElement('div', { style: { fontSize: 22, marginBottom: 6 } }, s.icon),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 2 } }, s.name),
              React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, lineHeight: 1.4 } }, s.desc),
              playingSound === s.id && React.createElement('div', {
                style: { marginTop: 6, fontSize: 10, color: t.primary, fontWeight: 600 }
              }, '▶ Playing'),
            )
          )
        ),
      ),
    );
  };

  // ─── Challenges Screen ────────────────────────────────────────────────────
  const ChallengesScreen = () => {
    const [filter, setFilter] = useState('all');
    const filters = ['all', 'active', 'completed'];

    const filtered = filter === 'all' ? challenges
      : filter === 'completed' ? challenges.filter(c => c.completed)
      : challenges.filter(c => !c.completed);

    if (activeChallenge) {
      const c = activeChallenge;
      return React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
      },
        // Header
        React.createElement('div', {
          style: { padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            onClick: () => setActiveChallenge(null),
            style: {
              width: 36, height: 36, borderRadius: 12, background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          }, React.createElement(window.lucide.ArrowLeft, { size: 18, color: t.text })),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Quest Details'),
        ),
        // Challenge card
        React.createElement('div', { style: { padding: '0 16px' } },
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${t.primary}22 0%, ${t.secondary}22 100%)`,
              border: `1px solid ${t.primary}44`,
              borderRadius: 20, padding: 20, marginBottom: 16, textAlign: 'center',
            }
          },
            React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, c.badge),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 6 } }, c.title),
            React.createElement('div', {
              style: {
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: t.surfaceAlt, borderRadius: 20, padding: '4px 12px',
              }
            },
              React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, c.category),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, '·'),
              React.createElement('span', { style: { fontSize: 12, color: t.textSecondary } }, c.time),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, '·'),
              React.createElement('span', { style: { fontSize: 12, color: t.gold, fontWeight: 600 } }, `+${c.xp} XP`),
            ),
          ),
          // Progress
          React.createElement('div', {
            style: { background: t.cardBg, borderRadius: 16, padding: 16, marginBottom: 16 }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 }
            },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, 'Progress'),
              React.createElement('div', { style: { fontSize: 13, color: t.primary, fontWeight: 700 } }, `${c.progress}%`),
            ),
            React.createElement('div', {
              style: { height: 8, background: isDark ? '#2E2550' : '#E8D5FF', borderRadius: 4, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${c.progress}%`,
                  background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                  borderRadius: 4,
                }
              })
            ),
          ),
          // Description
          React.createElement('div', {
            style: { background: t.cardBg, borderRadius: 16, padding: 16, marginBottom: 16 }
          },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 8 } }, 'The Quest'),
            React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, lineHeight: 1.7 } }, c.description),
          ),
          // Lore
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${t.primary}18, ${t.accent}18)`,
              border: `1px solid ${t.primary}33`,
              borderRadius: 16, padding: 16, marginBottom: 16,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
            },
              React.createElement('span', { style: { fontSize: 18 } }, '📜'),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.primary } }, 'Seasonal Lore'),
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, lineHeight: 1.7 } }, c.lore),
          ),
          // CTA
          React.createElement('button', {
            onClick: () => btnPress('startquest'),
            style: {
              width: '100%', padding: 16, borderRadius: 16, border: 'none',
              background: c.completed
                ? `linear-gradient(135deg, ${t.accent}, #2bcc99)`
                : `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
              transform: pressedBtn === 'startquest' ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s ease',
              boxShadow: `0 4px 24px ${t.primaryGlow}`,
            }
          }, c.completed ? '✓ Quest Completed' : c.progress > 0 ? '▶ Continue Quest' : '✦ Begin Quest'),
        ),
      );
    }

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, `${currentSeason.emoji} Spring Quests`),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginTop: 2 } }, '4 challenges · Season ends in 12 days'),
      ),
      // Filter pills
      React.createElement('div', {
        style: { display: 'flex', gap: 8, padding: '0 16px 16px' }
      },
        filters.map(f =>
          React.createElement('button', {
            key: f, onClick: () => setFilter(f),
            style: {
              padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: filter === f ? t.primary : t.surfaceAlt,
              color: filter === f ? '#fff' : t.textSecondary,
              fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
              transition: 'all 0.2s ease',
            }
          }, f)
        )
      ),
      // Season progress
      React.createElement('div', {
        style: { margin: '0 16px 16px', padding: 16, background: t.cardBg, borderRadius: 16, border: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, 'Season Progress'),
          React.createElement('div', { style: { fontSize: 13, color: t.gold, fontWeight: 700 } }, '1/4 Complete'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          challenges.map((c, i) =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1, height: 6, borderRadius: 3,
                background: c.completed
                  ? `linear-gradient(90deg, ${t.primary}, ${t.secondary})`
                  : c.progress > 0 ? `linear-gradient(90deg, ${t.primary}88, ${t.border})`
                  : t.border,
              }
            })
          )
        ),
      ),
      // Challenge list
      React.createElement('div', { style: { padding: '0 16px' } },
        filtered.map(c =>
          React.createElement('div', {
            key: c.id,
            onClick: () => setActiveChallenge(c),
            style: {
              background: t.cardBg,
              borderRadius: 18, padding: 16, marginBottom: 12,
              border: `1px solid ${c.completed ? t.accent + '44' : t.border}`,
              cursor: 'pointer', opacity: c.completed ? 0.85 : 1,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
              React.createElement('div', {
                style: {
                  width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                  background: c.completed ? `linear-gradient(135deg, ${t.accent}33, ${t.primary}33)` : `linear-gradient(135deg, ${t.primary}22, ${t.secondary}22)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                }
              }, c.badge),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, c.title),
                  c.completed
                    ? React.createElement('div', { style: { fontSize: 11, color: t.accent, fontWeight: 700 } }, '✓ DONE')
                    : React.createElement('div', { style: { fontSize: 11, color: t.gold, fontWeight: 600 } }, `+${c.xp} XP`),
                ),
                React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginBottom: 8 } },
                  `${c.category} · ${c.difficulty} · ${c.time}`
                ),
                !c.completed && React.createElement('div', {
                  style: { height: 4, background: isDark ? '#2E2550' : '#E8D5FF', borderRadius: 2, overflow: 'hidden' }
                },
                  React.createElement('div', {
                    style: {
                      height: '100%', width: `${c.progress}%`,
                      background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                      borderRadius: 2,
                    }
                  })
                ),
              ),
            ),
          )
        )
      ),
    );
  };

  // ─── Community Screen ─────────────────────────────────────────────────────
  const CommunityScreen = () => {
    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Tribal Wall 🌀'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginTop: 2 } }, '127 spring seekers active today'),
      ),
      // Season banner
      React.createElement('div', {
        style: {
          margin: '0 16px 16px',
          background: t.seasonGradient,
          borderRadius: 18, padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginBottom: 4 } }, 'Shared Aura Event'),
          React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: t.text } }, '🌸 Cherry Blossom Gathering'),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 2 } }, 'Ends in 3 days · 89 participating'),
        ),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            borderRadius: 12, padding: '8px 14px',
            color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }
        }, 'Join'),
      ),
      // My aura share card
      React.createElement('div', {
        style: {
          margin: '0 16px 16px', padding: 16,
          background: t.cardBg, borderRadius: 18,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginBottom: 12, fontWeight: 600 } }, 'YOUR AURA BADGE'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          React.createElement(AuraRing, { size: 72, level: auraLevel, colors: t.auraColors }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Spring Adept'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 2, marginBottom: 8 } },
              `Level ${auraLevel} · 🔥 5 day streak`
            ),
            React.createElement('button', {
              onClick: () => btnPress('share'),
              style: {
                padding: '8px 18px', borderRadius: 10, border: 'none',
                background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                transform: pressedBtn === 'share' ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.15s',
              }
            }, '✦ Share to Wall'),
          ),
        ),
      ),
      // Community feed
      React.createElement('div', { style: { padding: '0 16px' } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Live Activity'),
        communityPosts.map((p, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.cardBg, borderRadius: 16, padding: 14,
              marginBottom: 10, border: `1px solid ${t.border}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 } },
              // Avatar with aura ring
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${p.auraColor}44, ${p.auraColor}22)`,
                  border: `2px solid ${p.auraColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }
              }, p.badge),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, p.user),
                  React.createElement('div', {
                    style: {
                      fontSize: 9, fontWeight: 600, color: p.auraColor,
                      background: p.auraColor + '22', borderRadius: 6, padding: '2px 6px',
                    }
                  }, p.level),
                ),
                React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 2 } },
                  p.activity
                ),
              ),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, p.time),
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8, borderTop: `1px solid ${t.border}` }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(window.lucide.Heart, { size: 14, color: t.secondary }),
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary } }, p.likes),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, `🔥 ${p.streak} day streak`),
              ),
            ),
          )
        ),
      ),
    );
  };

  // ─── Profile Screen ────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      // Profile header
      React.createElement('div', {
        style: {
          background: t.seasonGradient, padding: '20px 20px 28px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }
      },
        React.createElement(AuraRing, { size: 130, level: auraLevel, colors: t.auraColors }),
        React.createElement('div', { style: { marginTop: 14, textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Solara Moon'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginTop: 2 } }, '@solaramoon · Spring Adept'),
          React.createElement('div', {
            style: { display: 'flex', gap: 20, marginTop: 14, justifyContent: 'center' }
          },
            [['12', 'Quests'], ['5', 'Streak'], ['148', 'Tribe']].map(([val, label]) =>
              React.createElement('div', { key: label, style: { textAlign: 'center' } },
                React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.primary } }, val),
                React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 1 } }, label),
              )
            )
          ),
        ),
      ),
      // Badges
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Achievements'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          achievements.map((a, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.cardBg,
                border: `1px solid ${a.earned ? t.primary + '44' : t.border}`,
                borderRadius: 14, padding: '12px 8px', textAlign: 'center',
                opacity: a.earned ? 1 : 0.5,
              }
            },
              React.createElement('div', { style: { fontSize: 26, marginBottom: 6 } }, a.icon),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: a.earned ? t.text : t.textMuted, lineHeight: 1.3 } }, a.title),
              React.createElement('div', { style: { fontSize: 9, color: t.textMuted, marginTop: 3, lineHeight: 1.3 } }, a.desc),
              a.earned && React.createElement('div', {
                style: { fontSize: 9, color: t.accent, fontWeight: 700, marginTop: 4 }
              }, '✓ EARNED'),
            )
          )
        ),
      ),
      // Settings
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Settings'),
        [
          { icon: window.lucide.Bell, label: 'Evening Reminders', value: 'On · 8:30 PM' },
          { icon: window.lucide.Music, label: 'Default Soundscape', value: 'Spring Forest' },
          { icon: window.lucide.Globe, label: 'Season Region', value: 'Northern Hemisphere' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.cardBg, borderRadius: 14, padding: '12px 16px',
              marginBottom: 8, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(s.icon, { size: 16, color: t.primary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, color: t.text, fontWeight: 600 } }, s.label),
              React.createElement('div', { style: { fontSize: 11, color: t.textSecondary } }, s.value),
            ),
            React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }),
          )
        ),
        // Theme toggle
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: t.cardBg, borderRadius: 14, padding: '12px 16px',
            marginBottom: 8, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 16, color: t.gold })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, color: t.text, fontWeight: 600 } }, 'Appearance'),
            React.createElement('div', { style: { fontSize: 11, color: t.textSecondary } }, isDark ? 'Dark Mode' : 'Light Mode'),
          ),
          // Toggle
          React.createElement('div', {
            style: {
              width: 44, height: 24, borderRadius: 12,
              background: isDark ? t.primary : '#ccc',
              position: 'relative', transition: 'background 0.3s',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3, left: isDark ? 23 : 3,
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                transition: 'left 0.3s ease',
              }
            })
          ),
        ),
      ),
    );
  };

  // ─── Navigation ───────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'challenges', label: 'Quests', icon: window.lucide.Zap },
    { id: 'community', label: 'Tribe', icon: window.lucide.Users },
    { id: 'profile', label: 'Aura', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    challenges: ChallengesScreen,
    community: CommunityScreen,
    profile: ProfileScreen,
  };

  // ─── Root Render ──────────────────────────────────────────────────────────
  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Sora', sans-serif",
    }
  },
    // Google Font
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #3d3060; border-radius: 2px; }
      button { font-family: 'Sora', sans-serif; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 48,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
        position: 'relative',
        transition: 'background 0.3s ease',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 44, background: t.statusBar,
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 24px 8px',
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }
      },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: {
            width: 120, height: 32,
            background: '#000',
            borderRadius: 20,
            position: 'absolute', top: 6, left: '50%',
            transform: 'translateX(-50%)',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', gap: 6, alignItems: 'center' }
        },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 14, color: t.text }),
        ),
      ),

      // Screen area
      React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }
      },
        React.createElement(screens[activeTab])
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 80, background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'flex-start',
          paddingTop: 8,
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => { setActiveTab(tab.id); if (tab.id !== 'challenges') setActiveChallenge(null); },
            style: {
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, cursor: 'pointer',
              paddingTop: 4,
            }
          },
            React.createElement('div', {
              style: {
                padding: '6px 16px', borderRadius: 20,
                background: activeTab === tab.id ? t.primary + '22' : 'transparent',
                transition: 'background 0.2s ease',
              }
            },
              React.createElement(tab.icon, {
                size: 22,
                color: activeTab === tab.id ? t.primary : t.textMuted,
              })
            ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 600,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                transition: 'color 0.2s ease',
              }
            }, tab.label)
          )
        )
      ),
    )
  );
}
