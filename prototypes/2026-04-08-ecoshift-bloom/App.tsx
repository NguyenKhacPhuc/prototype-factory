const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [completedTasks, setCompletedTasks] = useState({});
  const [streak, setStreak] = useState(7);
  const [biodomeLevel, setBiodomeLevel] = useState(3);
  const [species, setSpecies] = useState(12);
  const [showSeedDrop, setShowSeedDrop] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [groveJoined, setGroveJoined] = useState(false);
  const [shiftType, setShiftType] = useState('night');

  const themes = {
    dark: {
      bg: '#1F2937',
      bgSecondary: '#111827',
      card: '#374151',
      cardAlt: '#2D3748',
      text: '#F9FAFB',
      textSecondary: '#9CA3AF',
      textMuted: '#6B7280',
      border: '#4B5563',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      danger: '#EF4444',
      overlay: 'rgba(17,24,39,0.85)',
      tabBg: '#111827',
      inputBg: '#1F2937',
    },
    light: {
      bg: '#F3F4F6',
      bgSecondary: '#FFFFFF',
      card: '#FFFFFF',
      cardAlt: '#F9FAFB',
      text: '#111827',
      textSecondary: '#4B5563',
      textMuted: '#9CA3AF',
      border: '#E5E7EB',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      danger: '#EF4444',
      overlay: 'rgba(0,0,0,0.5)',
      tabBg: '#FFFFFF',
      inputBg: '#F3F4F6',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const toggleTask = (id) => {
    setCompletedTasks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      const completed = Object.values(next).filter(Boolean).length;
      if (completed > 0 && completed % 3 === 0 && !prev[id]) {
        setShowSeedDrop(true);
        setSpecies(s => s + 1);
        setTimeout(() => setShowSeedDrop(false), 3000);
      }
      return next;
    });
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const wellnessScore = Math.min(100, Math.round((completedCount / 8) * 100));

  // Icons helper
  const icon = (name, size = 20, color = t.text) => {
    const Icon = window.lucide[name];
    if (!Icon) return null;
    return React.createElement(Icon, { size, color, strokeWidth: 2 });
  };

  // Style tag for animations
  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes seedDrop {
      0% { opacity: 0; transform: translateY(-60px) scale(0.3) rotate(-20deg); }
      50% { opacity: 1; transform: translateY(10px) scale(1.1) rotate(10deg); }
      70% { transform: translateY(-5px) scale(0.95) rotate(-5deg); }
      100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(249,115,22,0.3); }
      50% { box-shadow: 0 0 24px rgba(249,115,22,0.6); }
    }
    @keyframes ripple {
      to { transform: scale(2.5); opacity: 0; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `);

  // Seed Drop Overlay
  const SeedDropOverlay = () => {
    if (!showSeedDrop) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: t.overlay, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', zIndex: 100,
        animation: 'fadeIn 0.3s ease',
      }
    },
      React.createElement('div', {
        style: {
          animation: 'seedDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          background: 'linear-gradient(135deg, #F97316, #22C55E)',
          borderRadius: 24, padding: 32, textAlign: 'center',
          boxShadow: '0 0 40px rgba(249,115,22,0.4), 0 0 80px rgba(34,197,94,0.2)',
        }
      },
        React.createElement('div', {
          style: { fontSize: 48, marginBottom: 12, animation: 'float 2s ease-in-out infinite' }
        }, icon('Sparkles', 48, '#FFF')),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#FFF', marginBottom: 8, letterSpacing: -0.5 }
        }, 'Surprise Seed Drop!'),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 220 }
        }, 'A rare Lunar Fern has sprouted in your biodome!')
      )
    );
  };

  // ===== HOME SCREEN =====
  const HomeScreen = () => {
    const tasks = [
      { id: 'wind-down', label: 'Post-shift wind-down routine', icon: 'Moon', time: '7:00 AM', category: 'Sleep' },
      { id: 'meal-prep', label: 'Prepare a balanced meal', icon: 'UtensilsCrossed', time: '8:30 AM', category: 'Nutrition' },
      { id: 'stretch', label: 'Mid-shift stretch break', icon: 'Activity', time: '2:00 AM', category: 'Activity' },
      { id: 'hydrate', label: 'Hydration check (500ml)', icon: 'Droplets', time: 'Ongoing', category: 'Hydration' },
      { id: 'mindful', label: '5-min guided breathing', icon: 'Wind', time: '3:30 AM', category: 'Mindfulness' },
      { id: 'light', label: 'Blue light filter activated', icon: 'Sun', time: '5:00 AM', category: 'Light' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 24px', animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginBottom: 20 }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, fontWeight: 400, marginBottom: 2 }
          }, shiftType === 'night' ? 'Night Shift Active' : 'Day Schedule'),
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }
          }, 'Good Morning')
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 22, background: t.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', border: `1px solid ${t.border}`,
            transition: 'all 0.2s ease',
          }
        }, icon(isDark ? 'Sun' : 'Moon', 20, t.primary))
      ),

      // Wellness Score Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 20, padding: 24, marginBottom: 20,
          boxShadow: '0 8px 32px rgba(249,115,22,0.25)',
          animation: 'slideUp 0.5s ease',
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }
            }, 'Wellness Score'),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 48, fontWeight: 800, color: '#FFF', letterSpacing: -1, lineHeight: 1 }
            }, `${wellnessScore}%`),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 8 }
            }, `${streak}-day streak `, icon('Flame', 16, '#FFF'))
          ),
          React.createElement('div', {
            style: {
              width: 72, height: 72, borderRadius: 36,
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              animation: 'pulse 3s ease-in-out infinite',
            }
          }, icon('TreePine', 36, '#FFF'))
        ),
        // Progress bar
        React.createElement('div', {
          style: { marginTop: 16, background: 'rgba(255,255,255,0.2)', borderRadius: 8, height: 8 }
        },
          React.createElement('div', {
            style: {
              width: `${wellnessScore}%`, height: 8, borderRadius: 8,
              background: '#FFF', transition: 'width 0.5s ease',
            }
          })
        )
      ),

      // Quick Stats
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20, animation: 'slideUp 0.6s ease' }
      },
        [
          { label: 'Species', value: species, ic: 'Leaf', color: t.cta },
          { label: 'Biodome', value: `Lv.${biodomeLevel}`, ic: 'Globe', color: t.primary },
          { label: 'Seeds', value: 24, ic: 'Sparkles', color: t.secondary },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: '16px 12px',
              textAlign: 'center', border: `1px solid ${t.border}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            },
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 16px ${stat.color}33`; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; },
          },
            React.createElement('div', {
              style: { marginBottom: 8, display: 'flex', justifyContent: 'center' }
            }, icon(stat.ic, 22, stat.color)),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 }
            }, stat.value),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary, marginTop: 2 }
            }, stat.label)
          )
        )
      ),

      // Today's Tasks
      React.createElement('div', {
        style: { marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 }
        }, "Today's Wellness Plan"),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 13, color: t.primary, fontWeight: 600 }
        }, `${completedCount}/${tasks.length}`)
      ),

      ...tasks.map((task, i) =>
        React.createElement('div', {
          key: task.id,
          onClick: () => toggleTask(task.id),
          style: {
            display: 'flex', alignItems: 'center', gap: 14,
            background: completedTasks[task.id] ? (isDark ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.08)') : t.card,
            borderRadius: 16, padding: '14px 16px', marginBottom: 10,
            border: `1px solid ${completedTasks[task.id] ? t.cta + '40' : t.border}`,
            cursor: 'pointer', transition: 'all 0.2s ease',
            animation: `slideUp ${0.4 + i * 0.08}s ease`,
            opacity: completedTasks[task.id] ? 0.75 : 1,
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              background: completedTasks[task.id] ? t.cta : `${t.primary}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease', flexShrink: 0,
            }
          }, completedTasks[task.id] ? icon('Check', 20, '#FFF') : icon(task.icon, 20, t.primary)),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', {
              style: {
                fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text,
                textDecoration: completedTasks[task.id] ? 'line-through' : 'none',
              }
            }, task.label),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 2 }
            }, `${task.time} · ${task.category}`)
          ),
          React.createElement('div', {
            style: {
              fontFamily: font, fontSize: 11, fontWeight: 600, color: t.cta,
              background: `${t.cta}15`, borderRadius: 8, padding: '4px 8px',
            }
          }, completedTasks[task.id] ? '+5 seeds' : 'To do')
        )
      )
    );
  };

  // ===== BIODOME SCREEN =====
  const BiodomeScreen = () => {
    const floraData = [
      { name: 'Lunar Fern', rarity: 'Rare', health: 92, icon: 'Leaf', color: '#22C55E' },
      { name: 'Ember Orchid', rarity: 'Uncommon', health: 87, icon: 'Flower2', color: '#F97316' },
      { name: 'Twilight Moss', rarity: 'Common', health: 100, icon: 'Shrub', color: '#10B981' },
      { name: 'Dawn Lily', rarity: 'Epic', health: 78, icon: 'Flower', color: '#A855F7' },
      { name: 'Starlight Vine', rarity: 'Rare', health: 95, icon: 'Grape', color: '#3B82F6' },
      { name: 'Horizon Cactus', rarity: 'Common', health: 100, icon: 'Cactus', color: '#EAB308' },
    ];

    const rarityColors = { Common: '#9CA3AF', Uncommon: '#22C55E', Rare: '#3B82F6', Epic: '#A855F7', Legendary: '#F97316' };

    return React.createElement('div', {
      style: { padding: '0 20px 24px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: { paddingTop: 16, marginBottom: 20 }
      },
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }
        }, 'Biodome'),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginTop: 2 }
        }, `Level ${biodomeLevel} · ${species} species discovered`)
      ),

      // Biodome Visualization
      React.createElement('div', {
        style: {
          background: `linear-gradient(180deg, ${isDark ? '#0F172A' : '#E0F2FE'} 0%, ${isDark ? '#064E3B' : '#D1FAE5'} 50%, ${isDark ? '#14532D' : '#BBF7D0'} 100%)`,
          borderRadius: 24, height: 220, marginBottom: 20, position: 'relative',
          overflow: 'hidden', border: `2px solid ${t.cta}30`,
          boxShadow: `0 0 40px ${t.cta}15`,
        }
      },
        // Stars/dots
        ...[...Array(20)].map((_, i) =>
          React.createElement('div', {
            key: `star-${i}`,
            style: {
              position: 'absolute',
              top: `${Math.random() * 40}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: '#FFF',
              borderRadius: '50%',
              opacity: Math.random() * 0.6 + 0.2,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }
          })
        ),
        // Trees
        ...[
          { left: '10%', bottom: 20, size: 40, delay: '0s' },
          { left: '25%', bottom: 30, size: 52, delay: '0.5s' },
          { left: '45%', bottom: 15, size: 36, delay: '1s' },
          { left: '65%', bottom: 35, size: 56, delay: '0.3s' },
          { left: '80%', bottom: 25, size: 44, delay: '0.8s' },
        ].map((tree, i) =>
          React.createElement('div', {
            key: `tree-${i}`,
            style: {
              position: 'absolute', left: tree.left, bottom: tree.bottom,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: tree.delay,
            }
          }, icon('TreePine', tree.size, i % 2 === 0 ? '#22C55E' : '#10B981'))
        ),
        // Ground
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
            background: isDark ? '#14532D' : '#86EFAC', borderRadius: '50% 50% 0 0',
          }
        }),
        // Biodome label
        React.createElement('div', {
          style: {
            position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)',
            borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          icon('Globe', 14, '#22C55E'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: '#FFF', fontWeight: 600 }
          }, `Biodome Lv.${biodomeLevel}`)
        )
      ),

      // Biodome Health
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: 20, marginBottom: 20,
          border: `1px solid ${t.border}`, animation: 'slideUp 0.5s ease',
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
        },
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text }
          }, 'Ecosystem Health'),
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.cta }
          }, '94%')
        ),
        ...[
          { label: 'Air Quality', value: 96, color: '#22C55E' },
          { label: 'Soil Nutrients', value: 88, color: '#F97316' },
          { label: 'Water Level', value: 91, color: '#3B82F6' },
          { label: 'Biodiversity', value: 78, color: '#A855F7' },
        ].map((m, i) =>
          React.createElement('div', { key: i, style: { marginBottom: i < 3 ? 12 : 0 } },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 }
            },
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
              }, m.label),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: m.color, fontWeight: 600 }
              }, `${m.value}%`)
            ),
            React.createElement('div', {
              style: { background: `${m.color}20`, borderRadius: 6, height: 6 }
            },
              React.createElement('div', {
                style: {
                  width: `${m.value}%`, height: 6, borderRadius: 6,
                  background: m.color, transition: 'width 0.8s ease',
                }
              })
            )
          )
        )
      ),

      // Flora Collection
      React.createElement('div', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 12 }
      }, 'Flora Collection'),

      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
      },
        ...floraData.map((flora, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              transition: 'all 0.2s ease', animation: `slideUp ${0.4 + i * 0.1}s ease`,
            },
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${flora.color}25`; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; },
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `${flora.color}20`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: 10,
              }
            }, icon(flora.icon, 24, flora.color)),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 }
            }, flora.name),
            React.createElement('div', {
              style: {
                fontFamily: font, fontSize: 11, fontWeight: 700, color: rarityColors[flora.rarity],
                textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8,
              }
            }, flora.rarity),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 }
            },
              React.createElement('div', {
                style: { flex: 1, background: `${flora.color}20`, borderRadius: 4, height: 4 }
              },
                React.createElement('div', {
                  style: { width: `${flora.health}%`, height: 4, borderRadius: 4, background: flora.color }
                })
              ),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 11, color: t.textMuted }
              }, `${flora.health}%`)
            )
          )
        )
      )
    );
  };

  // ===== CHALLENGES SCREEN =====
  const ChallengesScreen = () => {
    const echoChallenges = [
      { id: 'water', title: 'Water Guardian', desc: 'Reduce water usage by 10% this week', reward: 'Rare Coral Reef', progress: 65, icon: 'Droplets', color: '#3B82F6', duration: '5 days left' },
      { id: 'waste', title: 'Zero Waste Hero', desc: 'Avoid single-use plastics for 3 days', reward: 'Bamboo Grove', progress: 33, icon: 'Recycle', color: '#22C55E', duration: '2 days left' },
      { id: 'energy', title: 'Power Down', desc: 'Unplug devices when not in use for 1 week', reward: 'Solar Bloom', progress: 85, icon: 'Zap', color: '#EAB308', duration: '1 day left' },
    ];

    const wellnessChallenges = [
      { id: 'sleep7', title: '7-Day Sleep Champion', desc: 'Hit your sleep target 7 days in a row', reward: 'Moonstone Crystal', progress: 71, icon: 'Moon', streak: '5/7 days' },
      { id: 'hydrate3', title: 'Hydration Streak', desc: 'Drink 2L water daily for 3 days', reward: 'Ocean Kelp', progress: 100, icon: 'GlassWater', streak: 'Complete!' },
      { id: 'mindful5', title: 'Mindful Minutes', desc: '50 minutes of mindfulness this week', reward: 'Zen Garden Rock', progress: 40, icon: 'Brain', streak: '20/50 min' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 24px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: { paddingTop: 16, marginBottom: 20 }
      },
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }
        }, 'Challenges'),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginTop: 2 }
        }, 'Complete tasks, grow your ecosystem')
      ),

      // Active streak banner
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.cta}, #10B981)`,
          borderRadius: 20, padding: 20, marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 16,
          animation: 'slideUp 0.5s ease', boxShadow: '0 8px 32px rgba(34,197,94,0.25)',
        }
      },
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: 16,
            background: 'rgba(255,255,255,0.2)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            animation: 'pulse 2s ease-in-out infinite',
          }
        }, icon('Flame', 28, '#FFF')),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#FFF', letterSpacing: -0.5 }
          }, `${streak}-Day Streak!`),
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 }
          }, 'Keep going to unlock the Aurora Borealis event')
        )
      ),

      // Echo Challenges
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }
      },
        icon('Globe', 20, t.cta),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 }
        }, 'Echo Challenges'),
      ),
      React.createElement('div', {
        style: { fontFamily: font, fontSize: 13, color: t.textSecondary, marginBottom: 16, lineHeight: 1.4 }
      }, 'Real-world eco actions that grow your biodome'),

      ...echoChallenges.map((ch, i) =>
        React.createElement('div', {
          key: ch.id,
          onClick: () => setActiveChallenge(activeChallenge === ch.id ? null : ch.id),
          style: {
            background: t.card, borderRadius: 20, padding: 18, marginBottom: 12,
            border: `1px solid ${activeChallenge === ch.id ? ch.color : t.border}`,
            cursor: 'pointer', transition: 'all 0.25s ease',
            animation: `slideUp ${0.4 + i * 0.1}s ease`,
            boxShadow: activeChallenge === ch.id ? `0 4px 20px ${ch.color}25` : 'none',
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'flex-start', gap: 14 }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `${ch.color}20`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, icon(ch.icon, 24, ch.color)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }
              },
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text }
                }, ch.title),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 11, color: t.textMuted, fontWeight: 500 }
                }, ch.duration),
              ),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary, marginBottom: 10, lineHeight: 1.4 }
              }, ch.desc),
              React.createElement('div', {
                style: { background: `${ch.color}15`, borderRadius: 8, height: 8, marginBottom: 8 }
              },
                React.createElement('div', {
                  style: { width: `${ch.progress}%`, height: 8, borderRadius: 8, background: ch.color, transition: 'width 0.5s ease' }
                })
              ),
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
              },
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: ch.color, fontWeight: 600 }
                }, `${ch.progress}% complete`),
                React.createElement('div', {
                  style: {
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: `${t.primary}15`, borderRadius: 8, padding: '4px 10px',
                  }
                },
                  icon('Gift', 12, t.primary),
                  React.createElement('span', {
                    style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.primary }
                  }, ch.reward)
                )
              )
            )
          )
        )
      ),

      // Wellness Challenges
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, marginTop: 24 }
      },
        icon('Heart', 20, t.primary),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 }
        }, 'Wellness Streaks'),
      ),

      ...wellnessChallenges.map((ch, i) =>
        React.createElement('div', {
          key: ch.id,
          style: {
            background: ch.progress === 100 ? (isDark ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.05)') : t.card,
            borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${ch.progress === 100 ? t.cta + '40' : t.border}`,
            display: 'flex', alignItems: 'center', gap: 14,
            animation: `slideUp ${0.5 + i * 0.1}s ease`,
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              background: ch.progress === 100 ? t.cta : `${t.primary}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          }, icon(ch.icon, 22, ch.progress === 100 ? '#FFF' : t.primary)),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 2 }
            }, ch.title),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted }
            }, ch.streak)
          ),
          ch.progress === 100
            ? React.createElement('div', {
                style: {
                  background: `${t.cta}20`, borderRadius: 10, padding: '6px 12px',
                  display: 'flex', alignItems: 'center', gap: 4,
                }
              },
                icon('Check', 14, t.cta),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta }
                }, 'Claim')
              )
            : React.createElement('div', {
                style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary }
              }, `${ch.progress}%`)
        )
      )
    );
  };

  // ===== COMMUNITY SCREEN =====
  const CommunityScreen = () => {
    const groves = [
      { name: 'Night Owls United', members: 234, trees: 12847, badge: 'Gold', icon: 'Moon', active: true },
      { name: 'ER Night Crew', members: 89, trees: 5621, badge: 'Silver', icon: 'Stethoscope', active: false },
      { name: 'Factory Floor Warriors', members: 156, trees: 9430, badge: 'Gold', icon: 'Factory', active: false },
    ];

    const leaderboard = [
      { name: 'Sarah K.', score: 2847, avatar: 'S', rank: 1 },
      { name: 'Marcus J.', score: 2651, avatar: 'M', rank: 2 },
      { name: 'You', score: 2450, avatar: 'Y', rank: 3 },
      { name: 'Lisa T.', score: 2380, avatar: 'L', rank: 4 },
      { name: 'David R.', score: 2210, avatar: 'D', rank: 5 },
    ];

    const rankColors = { 1: '#EAB308', 2: '#9CA3AF', 3: '#CD7F32' };

    return React.createElement('div', {
      style: { padding: '0 20px 24px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: { paddingTop: 16, marginBottom: 20 }
      },
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }
        }, 'Community'),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginTop: 2 }
        }, 'Grow together with other shift workers')
      ),

      // Global Impact Banner
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #3B82F6, #8B5CF6)`,
          borderRadius: 20, padding: 20, marginBottom: 24,
          animation: 'slideUp 0.5s ease', boxShadow: '0 8px 32px rgba(59,130,246,0.25)',
        }
      },
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }
        }, 'Global Community Impact'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }
        },
          [
            { label: 'Members', value: '12.4K' },
            { label: 'Trees Grown', value: '847K' },
            { label: 'Challenges', value: '2.1M' },
          ].map((stat, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: '#FFF', letterSpacing: -0.5 }
              }, stat.value),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.75)' }
              }, stat.label)
            )
          )
        )
      ),

      // Conservation Groves
      React.createElement('div', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 14 }
      }, 'Conservation Groves'),

      ...groves.map((grove, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 20, padding: 18, marginBottom: 12,
            border: `1px solid ${grove.active ? t.cta + '40' : t.border}`,
            animation: `slideUp ${0.4 + i * 0.1}s ease`,
            cursor: 'pointer', transition: 'all 0.2s ease',
          },
          onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; },
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: grove.active ? `${t.cta}20` : `${t.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, icon(grove.icon, 26, grove.active ? t.cta : t.primary)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 8 }
              },
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text }
                }, grove.name),
                grove.active && React.createElement('span', {
                  style: {
                    fontFamily: font, fontSize: 11, fontWeight: 700, color: t.cta,
                    background: `${t.cta}15`, borderRadius: 6, padding: '2px 8px',
                  }
                }, 'Joined')
              ),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 2 }
              }, `${grove.members} members · ${grove.trees.toLocaleString()} trees`)
            ),
            React.createElement('div', {
              style: {
                background: grove.badge === 'Gold' ? '#EAB30820' : '#9CA3AF20',
                borderRadius: 10, padding: '6px 10px',
              }
            },
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: grove.badge === 'Gold' ? '#EAB308' : '#9CA3AF' }
              }, grove.badge)
            )
          ),
          !grove.active && React.createElement('div', {
            onClick: (e) => { e.stopPropagation(); setGroveJoined(true); },
            style: {
              background: t.cta, borderRadius: 12, padding: '12px 0',
              textAlign: 'center', fontFamily: font, fontSize: 15,
              fontWeight: 600, color: '#FFF', cursor: 'pointer',
              transition: 'all 0.2s ease',
            },
            onMouseEnter: (e) => { e.currentTarget.style.background = t.ctaHover; },
            onMouseLeave: (e) => { e.currentTarget.style.background = t.cta; },
          }, 'Join Grove')
        )
      ),

      // Leaderboard
      React.createElement('div', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 14, marginTop: 24 }
      }, 'Weekly Leaderboard'),

      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: 4,
          border: `1px solid ${t.border}`, animation: 'slideUp 0.6s ease',
        }
      },
        ...leaderboard.map((user, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 16,
              background: user.name === 'You' ? `${t.primary}10` : 'transparent',
            }
          },
            React.createElement('div', {
              style: {
                fontFamily: font, fontSize: 17, fontWeight: 800,
                color: rankColors[user.rank] || t.textMuted,
                width: 28, textAlign: 'center',
              }
            }, `#${user.rank}`),
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: user.name === 'You' ? `${t.primary}20` : `${t.textMuted}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: font, fontSize: 17, fontWeight: 700,
                color: user.name === 'You' ? t.primary : t.textSecondary,
              }
            }, user.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 15, fontWeight: user.name === 'You' ? 700 : 500, color: t.text }
              }, user.name)
            ),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary }
            }, user.score.toLocaleString()),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted, marginLeft: 2 }
            }, 'pts')
          )
        )
      )
    );
  };

  // ===== PROFILE SCREEN =====
  const ProfileScreen = () => {
    const stats = [
      { label: 'Days Active', value: 47, icon: 'Calendar' },
      { label: 'Tasks Done', value: 312, icon: 'CheckCircle' },
      { label: 'Species Found', value: species, icon: 'Leaf' },
      { label: 'Eco Actions', value: 28, icon: 'Globe' },
    ];

    const achievements = [
      { name: 'Early Adopter', desc: 'Joined during beta', icon: 'Star', unlocked: true },
      { name: 'Night Guardian', desc: '30-day streak', icon: 'Shield', unlocked: true },
      { name: 'Biodome Builder', desc: 'Reach Level 5', icon: 'Building', unlocked: false },
      { name: 'Eco Warrior', desc: '50 eco challenges', icon: 'Swords', unlocked: false },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 24px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: { paddingTop: 16, marginBottom: 24, textAlign: 'center' }
      },
        React.createElement('div', {
          style: {
            width: 88, height: 88, borderRadius: 28, margin: '0 auto 16px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 32px ${t.primary}40`,
            animation: 'pulse 3s ease-in-out infinite',
          }
        }, icon('User', 40, '#FFF')),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 }
        }, 'Alex Rivera'),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginTop: 4 }
        }, 'Night Shift RN · Level 3 Cultivator'),
      ),

      // Stats Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24, animation: 'slideUp 0.5s ease' }
      },
        ...stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 18,
              border: `1px solid ${t.border}`, textAlign: 'center',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', marginBottom: 8 }
            }, icon(stat.icon, 22, t.primary)),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5 }
            }, stat.value),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary, marginTop: 2 }
            }, stat.label)
          )
        )
      ),

      // Shift Schedule
      React.createElement('div', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 14 }
      }, 'Shift Schedule'),
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: 20, marginBottom: 24,
          border: `1px solid ${t.border}`, animation: 'slideUp 0.55s ease',
        }
      },
        React.createElement('div', {
          style: { display: 'flex', gap: 8, marginBottom: 16 }
        },
          ['night', 'evening', 'rotating'].map(type =>
            React.createElement('div', {
              key: type,
              onClick: () => setShiftType(type),
              style: {
                flex: 1, padding: '10px 0', borderRadius: 12, textAlign: 'center',
                background: shiftType === type ? t.primary : `${t.primary}15`,
                fontFamily: font, fontSize: 13, fontWeight: 600,
                color: shiftType === type ? '#FFF' : t.primary,
                cursor: 'pointer', transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }
            }, type)
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }
        },
          icon('Clock', 18, t.primary),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, color: t.text }
          }, shiftType === 'night' ? '11:00 PM – 7:00 AM' : shiftType === 'evening' ? '3:00 PM – 11:00 PM' : 'Rotating Schedule')
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          icon('CalendarDays', 18, t.secondary),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, color: t.text }
          }, 'Mon, Tue, Wed, Thu')
        )
      ),

      // Achievements
      React.createElement('div', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 14 }
      }, 'Achievements'),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }
      },
        ...achievements.map((ach, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16,
              border: `1px solid ${ach.unlocked ? t.primary + '40' : t.border}`,
              opacity: ach.unlocked ? 1 : 0.5, textAlign: 'center',
              animation: `slideUp ${0.5 + i * 0.1}s ease`,
            }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14, margin: '0 auto 10px',
                background: ach.unlocked ? `${t.primary}20` : `${t.textMuted}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, icon(ach.icon, 24, ach.unlocked ? t.primary : t.textMuted)),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 2 }
            }, ach.name),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted }
            }, ach.desc)
          )
        )
      ),

      // Theme Toggle
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: 18,
          border: `1px solid ${t.border}`, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 12,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          icon(isDark ? 'Moon' : 'Sun', 20, t.primary),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text }
          }, isDark ? 'Dark Mode' : 'Light Mode')
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 52, height: 30, borderRadius: 15,
            background: isDark ? t.primary : t.border,
            position: 'relative', cursor: 'pointer',
            transition: 'background 0.3s ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 24, height: 24, borderRadius: 12, background: '#FFF',
              position: 'absolute', top: 3,
              left: isDark ? 25 : 3,
              transition: 'left 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }
          })
        )
      ),

      // Settings links
      ...['Notification Preferences', 'Data & Privacy', 'Help & Support'].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 16, padding: '16px 18px',
            border: `1px solid ${t.border}`, display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 10, cursor: 'pointer', transition: 'all 0.2s ease',
          },
          onMouseEnter: (e) => { e.currentTarget.style.background = t.cardAlt; },
          onMouseLeave: (e) => { e.currentTarget.style.background = t.card; },
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text }
          }, item),
          icon('ChevronRight', 18, t.textMuted)
        )
      )
    );
  };

  // Screen map
  const screens = {
    home: HomeScreen,
    biodome: BiodomeScreen,
    challenges: ChallengesScreen,
    community: CommunityScreen,
    profile: ProfileScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'biodome', label: 'Biodome', icon: 'TreePine' },
    { id: 'challenges', label: 'Challenges', icon: 'Target' },
    { id: 'community', label: 'Groves', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: font, padding: '20px 0',
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40,
        background: t.bg, position: 'relative',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
      }
    },
      // Scrollable Content
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingBottom: 80,
          WebkitOverflowScrolling: 'touch',
        }
      }, React.createElement(screens[activeScreen])),

      // Seed Drop Overlay
      React.createElement(SeedDropOverlay),

      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.tabBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', paddingBottom: 20, paddingTop: 8,
          boxShadow: `0 -4px 20px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)'}`,
        }
      },
        ...tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, cursor: 'pointer',
              padding: '6px 0', transition: 'all 0.2s ease',
              opacity: activeScreen === tab.id ? 1 : 0.5,
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 28, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                borderRadius: 14,
                background: activeScreen === tab.id ? `${t.primary}20` : 'transparent',
                transition: 'all 0.2s ease',
              }
            }, icon(tab.icon, 22, activeScreen === tab.id ? t.primary : t.textMuted)),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 11, fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.primary : t.textMuted,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
