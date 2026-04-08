const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [glyphEnergy, setGlyphEnergy] = useState(2847);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [glyphProgress, setGlyphProgress] = useState(0.68);
  const [showUnlock, setShowUnlock] = useState(false);
  const [animatingQuest, setAnimatingQuest] = useState(null);

  const themes = {
    light: {
      bg: '#ECFDF5',
      card: '#FFFFFF',
      cardBorder: 'rgba(5,150,105,0.08)',
      text: '#064E3B',
      textSecondary: '#047857',
      textMuted: '#6B7280',
      primary: '#059669',
      secondary: '#10B981',
      cta: '#0891B2',
      surface: '#F0FDF4',
      surfaceAlt: '#D1FAE5',
      navBg: '#FFFFFF',
      navBorder: 'rgba(5,150,105,0.12)',
      shadow: 'rgba(5,150,105,0.1)',
      shadowStrong: 'rgba(5,150,105,0.18)',
      overlay: 'rgba(6,78,59,0.6)',
      accent: '#059669',
      danger: '#DC2626',
      warning: '#F59E0B',
      glyphBg: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 50%, #6EE7B7 100%)',
      tabActive: '#059669',
      tabInactive: '#9CA3AF',
    },
    dark: {
      bg: '#022C22',
      card: '#064E3B',
      cardBorder: 'rgba(16,185,129,0.15)',
      text: '#ECFDF5',
      textSecondary: '#A7F3D0',
      textMuted: '#6EE7B7',
      primary: '#10B981',
      secondary: '#34D399',
      cta: '#22D3EE',
      surface: '#053F32',
      surfaceAlt: '#065F46',
      navBg: '#042F25',
      navBorder: 'rgba(16,185,129,0.2)',
      shadow: 'rgba(0,0,0,0.3)',
      shadowStrong: 'rgba(0,0,0,0.5)',
      overlay: 'rgba(2,44,34,0.85)',
      accent: '#10B981',
      danger: '#EF4444',
      warning: '#FBBF24',
      glyphBg: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)',
      tabActive: '#10B981',
      tabInactive: '#6B7280',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};
  const createIcon = (IconComponent, size = 24, color = t.text, strokeWidth = 2) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth });
  };

  // Glyph procedural generation
  const GlyphCanvas = ({ progress, size = 200 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = size * 2;
      const h = size * 2;
      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;
      const maxRadius = w * 0.4;
      const segments = Math.floor(progress * 48) + 6;
      const layers = Math.floor(progress * 5) + 1;

      for (let layer = 0; layer < layers; layer++) {
        const layerProgress = Math.min(1, (progress * layers - layer) / 1);
        if (layerProgress <= 0) continue;

        const radius = maxRadius * (0.3 + (layer / layers) * 0.7) * layerProgress;
        const points = segments + layer * 3;
        const rotation = layer * Math.PI / 6 + Date.now() * 0.0001 * (layer % 2 === 0 ? 1 : -1);

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2 + rotation;
          const wobble = Math.sin(angle * 3 + layer) * radius * 0.15;
          const r = radius + wobble;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        const alpha = 0.15 + layerProgress * 0.25;
        if (isDark) {
          gradient.addColorStop(0, `rgba(16,185,129,${alpha + 0.1})`);
          gradient.addColorStop(0.5, `rgba(5,150,105,${alpha})`);
          gradient.addColorStop(1, `rgba(8,145,178,${alpha - 0.05})`);
        } else {
          gradient.addColorStop(0, `rgba(16,185,129,${alpha + 0.15})`);
          gradient.addColorStop(0.5, `rgba(5,150,105,${alpha + 0.05})`);
          gradient.addColorStop(1, `rgba(8,145,178,${alpha})`);
        }
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = isDark ? `rgba(52,211,153,${0.3 + layerProgress * 0.4})` : `rgba(5,150,105,${0.3 + layerProgress * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Center core
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * 0.2);
      coreGrad.addColorStop(0, isDark ? 'rgba(52,211,153,0.8)' : 'rgba(5,150,105,0.7)');
      coreGrad.addColorStop(1, 'rgba(8,145,178,0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.2 * progress, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Particles
      const particleCount = Math.floor(progress * 30);
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const dist = maxRadius * (0.5 + Math.sin(Date.now() * 0.002 + i) * 0.3);
        const px = centerX + Math.cos(angle + Date.now() * 0.001) * dist;
        const py = centerY + Math.sin(angle + Date.now() * 0.001) * dist;
        const pSize = 2 + Math.sin(i * 1.5) * 1.5;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(52,211,153,${0.3 + Math.sin(i) * 0.3})` : `rgba(5,150,105,${0.3 + Math.sin(i) * 0.3})`;
        ctx.fill();
      }
    }, [progress, size, isDark]);

    // Animate
    useEffect(() => {
      let frameId;
      const animate = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          // Re-trigger the draw
          canvasRef.current.dispatchEvent(new Event('redraw'));
        }
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }, []);

    return React.createElement('canvas', {
      ref: canvasRef,
      style: {
        width: size,
        height: size,
        borderRadius: '50%',
      }
    });
  };

  // HOME SCREEN
  const HomeScreen = () => {
    const milestone = Math.floor(glyphProgress * 100);
    const nextUnlock = milestone >= 75 ? 'Pop-up Zero-Waste Market' : milestone >= 50 ? 'Community Composting Workshop' : 'Eco-Friendly Park Bench';

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 13, fontWeight: 600, color: t.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4, fontFamily: font }
          }, 'YOUR COMMUNITY'),
          React.createElement('h1', {
            style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, fontFamily: font }
          }, 'Greenwood')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s ease',
          }
        }, createIcon(isDark ? icons.Sun : icons.Moon, 20, t.textSecondary))
      ),

      // Glyph Card
      React.createElement('div', {
        style: {
          background: t.glyphBg, borderRadius: 24, padding: 24,
          marginBottom: 20, position: 'relative', overflow: 'hidden',
          boxShadow: `0 8px 32px ${t.shadow}`,
          border: `1px solid ${t.cardBorder}`,
        }
      },
        React.createElement('div', {
          style: { textAlign: 'center', position: 'relative', zIndex: 1 }
        },
          React.createElement('div', {
            style: { fontSize: 13, fontWeight: 600, color: t.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, fontFamily: font }
          }, 'COMMUNITY TERRAGLYPH'),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'center', marginBottom: 16 }
          },
            React.createElement(GlyphCanvas, { progress: glyphProgress, size: 180 })
          ),
          // Progress bar
          React.createElement('div', {
            style: { background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)', borderRadius: 8, height: 8, marginBottom: 12, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                width: `${glyphProgress * 100}%`, height: '100%', borderRadius: 8,
                background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
                transition: 'width 0.6s ease',
                animation: 'shimmer 2s infinite',
              }
            })
          ),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: font }
          },
            React.createElement('span', { style: { fontSize: 15, color: t.textSecondary, fontWeight: 500 } }, `${milestone}% Complete`),
            React.createElement('span', { style: { fontSize: 15, color: t.cta, fontWeight: 600 } }, `${glyphEnergy} Energy`)
          )
        )
      ),

      // Next Unlock Card
      React.createElement('div', {
        onClick: () => setShowUnlock(true),
        style: {
          background: t.card, borderRadius: 16, padding: 16, marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
      },
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: 14, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
            flexShrink: 0,
          }
        }, createIcon(icons.Gift, 22, '#FFFFFF')),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontWeight: 500, fontFamily: font, marginBottom: 2 } }, 'NEXT SURPRISE UNLOCK'),
          React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, nextUnlock)
        ),
        createIcon(icons.ChevronRight, 20, t.textMuted)
      ),

      // Stats Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }
      },
        ...[
          { icon: icons.Zap, label: 'Today\'s Energy', value: '+142', color: t.primary },
          { icon: icons.Users, label: 'Contributors', value: '1,247', color: t.cta },
          { icon: icons.Target, label: 'Quests Done', value: '38', color: t.secondary },
          { icon: icons.TrendingUp, label: 'Weekly Streak', value: '5 days', color: t.warning },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16,
              boxShadow: `0 2px 8px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
              transition: 'transform 0.15s ease',
              cursor: 'pointer',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12, marginBottom: 10,
                background: isDark ? `${stat.color}22` : `${stat.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, createIcon(stat.icon, 20, stat.color)),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, stat.value),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontWeight: 500, fontFamily: font, marginTop: 2 } }, stat.label),
          )
        )
      ),

      // Recent Activity
      React.createElement('div', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 14 }
      }, 'Recent Activity'),
      ...[
        { user: 'Sarah K.', action: 'Recycled electronics properly', time: '12m ago', energy: '+8' },
        { user: 'Marcus T.', action: 'Used public transport', time: '34m ago', energy: '+5' },
        { user: 'Aisha L.', action: 'Composted food waste', time: '1h ago', energy: '+6' },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 14, padding: 14, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: `0 1px 4px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 20,
              background: `linear-gradient(135deg, ${t.surfaceAlt}, ${t.surface})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, color: t.primary, fontFamily: font,
            }
          }, item.user.split(' ').map(n => n[0]).join('')),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, item.user),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, item.action)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.primary, fontFamily: font } }, item.energy),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, item.time)
          )
        )
      ),

      // Unlock Modal
      showUnlock && React.createElement('div', {
        onClick: () => setShowUnlock(false),
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: t.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, animation: 'fadeIn 0.3s ease', padding: 24,
        }
      },
        React.createElement('div', {
          onClick: (e) => e.stopPropagation(),
          style: {
            background: t.card, borderRadius: 24, padding: 28, width: '100%',
            textAlign: 'center', animation: 'slideUp 0.3s ease',
            boxShadow: `0 24px 48px ${t.shadowStrong}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: 20, margin: '0 auto 16px',
              background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, createIcon(icons.Gift, 32, '#FFFFFF')),
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 8px', letterSpacing: -0.5 } }, 'Next Community Unlock'),
          React.createElement('p', { style: { fontSize: 17, color: t.textSecondary, fontFamily: font, margin: '0 0 16px', lineHeight: 1.5 } },
            `Your community is ${100 - milestone}% away from unlocking a ${nextUnlock}!`
          ),
          React.createElement('div', {
            style: { background: t.surface, borderRadius: 12, padding: 14, marginBottom: 20 }
          },
            React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 6 } }, 'Energy Needed'),
            React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.primary, fontFamily: font, letterSpacing: -0.5 } },
              `${Math.ceil((1 - glyphProgress) * 4200)}`
            )
          ),
          React.createElement('button', {
            onClick: () => { setShowUnlock(false); setActiveScreen('quests'); },
            style: {
              width: '100%', padding: '16px 24px', borderRadius: 14, border: 'none',
              background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
              color: '#FFFFFF', fontSize: 17, fontWeight: 700, fontFamily: font,
              cursor: 'pointer', transition: 'transform 0.15s ease',
              minHeight: 50,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('span', null, 'Start Quests'),
            React.createElement('span', { style: { marginLeft: 8 } }, '\u2192')
          )
        )
      )
    );
  };

  // QUESTS SCREEN
  const QuestsScreen = () => {
    const quests = [
      { id: 'q1', title: 'Opt for Tap Water', desc: 'Choose tap water over bottled at any cafe today', energy: 8, icon: icons.Droplets, difficulty: 'Easy', timeLeft: '6h left' },
      { id: 'q2', title: 'Sort Your Recyclables', desc: 'Properly sort this week\'s recycling into correct bins', energy: 12, icon: icons.Recycle, difficulty: 'Medium', timeLeft: '23h left' },
      { id: 'q3', title: 'Take Public Transport', desc: 'Use bus or train for at least one trip today', energy: 10, icon: icons.Bus, difficulty: 'Easy', timeLeft: '18h left' },
      { id: 'q4', title: 'Zero Food Waste Meal', desc: 'Prepare a meal using only what you already have', energy: 15, icon: icons.ChefHat, difficulty: 'Medium', timeLeft: '23h left' },
      { id: 'q5', title: 'Plant Something Green', desc: 'Plant a seed, herb, or re-pot an existing plant', energy: 20, icon: icons.Sprout, difficulty: 'Hard', timeLeft: '2d left' },
      { id: 'q6', title: 'Eco-Friendly Shopping', desc: 'Bring reusable bags for your next grocery run', energy: 8, icon: icons.ShoppingBag, difficulty: 'Easy', timeLeft: '23h left' },
    ];

    const handleComplete = (questId, energy) => {
      if (completedQuests.includes(questId)) return;
      setAnimatingQuest(questId);
      setTimeout(() => {
        setCompletedQuests(prev => [...prev, questId]);
        setGlyphEnergy(prev => prev + energy);
        setGlyphProgress(prev => Math.min(1, prev + energy / 4200));
        setAnimatingQuest(null);
      }, 600);
    };

    const diffColors = { Easy: t.secondary, Medium: t.warning, Hard: t.danger };

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' }
      }, 'Daily Quests'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textMuted, fontFamily: font, margin: '0 0 20px' }
      }, 'Complete quests to grow your community\'s TerraGlyph'),

      // Daily bonus bar
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}15, ${t.cta}15)`,
          borderRadius: 16, padding: 16, marginBottom: 20,
          border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        createIcon(icons.Flame, 24, t.primary),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, 'Daily Bonus Active'),
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, 'Complete 3 quests for 2x energy boost')
        ),
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: 700, color: t.primary, fontFamily: font }
        }, `${Math.min(completedQuests.length, 3)}/3`)
      ),

      // Quest list
      ...quests.map((quest, i) => {
        const done = completedQuests.includes(quest.id);
        const animating = animatingQuest === quest.id;
        return React.createElement('div', {
          key: quest.id,
          style: {
            background: done ? (isDark ? `${t.primary}15` : `${t.primary}08`) : t.card,
            borderRadius: 18, padding: 16, marginBottom: 12,
            boxShadow: `0 2px 10px ${t.shadow}`, border: `1px solid ${done ? t.primary + '30' : t.cardBorder}`,
            opacity: done ? 0.7 : 1, transition: 'all 0.3s ease',
            transform: animating ? 'scale(0.95)' : 'scale(1)',
            animation: `slideUp 0.3s ease ${i * 0.05}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: done ? t.primary : (isDark ? `${t.primary}20` : `${t.primary}10`),
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'all 0.3s ease',
              }
            }, done ? createIcon(icons.Check, 22, '#FFFFFF') : createIcon(quest.icon, 22, t.primary)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, textDecoration: done ? 'line-through' : 'none' } }, quest.title),
                React.createElement('span', {
                  style: {
                    fontSize: 11, fontWeight: 700, color: diffColors[quest.difficulty],
                    background: `${diffColors[quest.difficulty]}18`, padding: '2px 8px',
                    borderRadius: 6, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5,
                  }
                }, quest.difficulty)
              ),
              React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 10, lineHeight: 1.4 } }, quest.desc),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                  React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: t.textMuted, fontFamily: font } },
                    createIcon(icons.Clock, 14, t.textMuted), quest.timeLeft
                  ),
                  React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: font } },
                    createIcon(icons.Zap, 14, t.primary), `+${quest.energy}`
                  )
                ),
                !done && React.createElement('button', {
                  onClick: () => handleComplete(quest.id, quest.energy),
                  style: {
                    padding: '8px 18px', borderRadius: 10, border: 'none',
                    background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                    color: '#FFFFFF', fontSize: 13, fontWeight: 700, fontFamily: font,
                    cursor: 'pointer', minHeight: 36, minWidth: 80,
                    transition: 'transform 0.15s ease',
                  },
                  onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.95)',
                  onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
                },
                  React.createElement('span', null, 'Complete')
                )
              )
            )
          )
        );
      })
    );
  };

  // LEADERBOARD SCREEN
  const LeaderboardScreen = () => {
    const [tab, setTab] = useState('weekly');
    const leaders = [
      { rank: 1, name: 'Olivia Chen', energy: 482, streak: 14, avatar: 'OC' },
      { rank: 2, name: 'James Rivera', energy: 431, streak: 11, avatar: 'JR' },
      { rank: 3, name: 'Amara Okafor', energy: 398, streak: 9, avatar: 'AO' },
      { rank: 4, name: 'You', energy: 342, streak: 5, avatar: 'ME', isUser: true },
      { rank: 5, name: 'Liam Foster', energy: 318, streak: 7, avatar: 'LF' },
      { rank: 6, name: 'Sofia Nguyen', energy: 287, streak: 6, avatar: 'SN' },
      { rank: 7, name: 'Dev Patel', energy: 264, streak: 4, avatar: 'DP' },
      { rank: 8, name: 'Emma Wilson', energy: 241, streak: 8, avatar: 'EW' },
    ];

    const topThreeColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' }
      }, 'Leaderboard'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textMuted, fontFamily: font, margin: '0 0 20px' }
      }, 'Greenwood\'s top eco-contributors'),

      // Tab switcher
      React.createElement('div', {
        style: {
          display: 'flex', background: t.surface, borderRadius: 12, padding: 4, marginBottom: 24,
        }
      },
        ...['weekly', 'monthly', 'allTime'].map(tabKey =>
          React.createElement('button', {
            key: tabKey,
            onClick: () => setTab(tabKey),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              background: tab === tabKey ? t.card : 'transparent',
              color: tab === tabKey ? t.text : t.textMuted,
              fontSize: 15, fontWeight: tab === tabKey ? 600 : 500, fontFamily: font,
              cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: tab === tabKey ? `0 2px 8px ${t.shadow}` : 'none',
              minHeight: 44,
            }
          },
            React.createElement('span', null, tabKey === 'allTime' ? 'All Time' : tabKey.charAt(0).toUpperCase() + tabKey.slice(1))
          )
        )
      ),

      // Top 3 podium
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 12, marginBottom: 28, padding: '0 8px' }
      },
        ...[1, 0, 2].map(idx => {
          const leader = leaders[idx];
          const isFirst = idx === 0;
          return React.createElement('div', {
            key: idx,
            style: {
              textAlign: 'center', flex: 1,
              animation: `slideUp 0.4s ease ${idx * 0.1}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: isFirst ? 72 : 56, height: isFirst ? 72 : 56, borderRadius: '50%',
                background: `linear-gradient(135deg, ${topThreeColors[idx]}, ${topThreeColors[idx]}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 8px', fontSize: isFirst ? 20 : 16, fontWeight: 800,
                color: idx === 0 ? '#422006' : '#FFFFFF', fontFamily: font,
                boxShadow: `0 4px 16px ${topThreeColors[idx]}44`,
                border: `3px solid ${topThreeColors[idx]}`,
              }
            }, leader.avatar),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 2 } }, leader.name.split(' ')[0]),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: font } }, `${leader.energy} Energy`),
            React.createElement('div', {
              style: {
                background: isDark ? `${topThreeColors[idx]}20` : `${topThreeColors[idx]}15`,
                borderRadius: 8, padding: '4px 10px', marginTop: 6, display: 'inline-block',
                fontSize: 11, fontWeight: 700, color: topThreeColors[idx], fontFamily: font,
              }
            }, `#${leader.rank}`)
          );
        })
      ),

      // Rest of list
      ...leaders.slice(3).map((leader, i) =>
        React.createElement('div', {
          key: leader.rank,
          style: {
            background: leader.isUser ? `linear-gradient(135deg, ${t.primary}12, ${t.cta}12)` : t.card,
            borderRadius: 16, padding: 14, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: `0 2px 8px ${t.shadow}`,
            border: leader.isUser ? `2px solid ${t.primary}40` : `1px solid ${t.cardBorder}`,
            animation: `slideUp 0.3s ease ${(i + 3) * 0.05}s both`,
          }
        },
          React.createElement('div', {
            style: { fontSize: 17, fontWeight: 800, color: t.textMuted, fontFamily: font, width: 28, textAlign: 'center' }
          }, `#${leader.rank}`),
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 22,
              background: leader.isUser ? `linear-gradient(135deg, ${t.primary}, ${t.cta})` : t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: leader.isUser ? '#FFFFFF' : t.primary, fontFamily: font,
            }
          }, leader.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: leader.isUser ? 700 : 600, color: t.text, fontFamily: font } }, leader.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
                createIcon(icons.Flame, 12, t.primary), `${leader.streak} day streak`
              )
            )
          ),
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.primary, fontFamily: font } }, leader.energy)
        )
      )
    );
  };

  // DISCOVER SCREEN
  const DiscoverScreen = () => {
    const [discoverTab, setDiscoverTab] = useState('initiatives');

    const initiatives = [
      { title: 'Greenwood Community Garden', desc: 'A shared growing space that provides fresh produce to 120+ families. Join weekend planting sessions.', status: 'Active', icon: icons.Flower2, impact: '2.4 tons CO2 saved' },
      { title: 'Bike Share Expansion', desc: 'New stations coming to 5 locations in Greenwood this spring. Vote on preferred locations.', status: 'Upcoming', icon: icons.Bike, impact: '800 fewer car trips/month' },
      { title: 'Solar Panel Co-op', desc: 'Community-owned solar installation powering 40 homes with clean energy since 2024.', status: 'Active', icon: icons.Sun, impact: '18 tons CO2/year reduced' },
    ];

    const businesses = [
      { name: 'Green Bean Cafe', type: 'Zero-Waste Cafe', rating: 4.8, distance: '0.3 mi', icon: icons.Coffee, discount: '10% with TerraGlyph' },
      { name: 'EcoMart', type: 'Sustainable Groceries', rating: 4.6, distance: '0.7 mi', icon: icons.Store, discount: '5% on reusable items' },
      { name: 'Pedal Power', type: 'Bike Repair & Rental', rating: 4.9, distance: '0.5 mi', icon: icons.Wrench, discount: 'Free tune-up at 500 energy' },
      { name: 'The Refillery', type: 'Package-Free Shop', rating: 4.7, distance: '1.1 mi', icon: icons.Package, discount: '15% first visit' },
    ];

    const ecoFacts = [
      { fact: 'Your community has saved the equivalent of 14 trees this month through recycling efforts.', icon: icons.TreePine },
      { fact: 'Public transport usage in Greenwood is up 23% since TerraGlyph launched.', icon: icons.TrendingUp },
      { fact: 'Collectively, your neighborhood has prevented 892 lbs of waste from reaching landfills.', icon: icons.Leaf },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' }
      }, 'Discover'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textMuted, fontFamily: font, margin: '0 0 20px' }
      }, 'Explore local eco-initiatives and businesses'),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }
      },
        ...['initiatives', 'businesses', 'impact'].map(tabKey =>
          React.createElement('button', {
            key: tabKey,
            onClick: () => setDiscoverTab(tabKey),
            style: {
              padding: '10px 20px', borderRadius: 12, border: 'none',
              background: discoverTab === tabKey ? t.primary : t.surface,
              color: discoverTab === tabKey ? '#FFFFFF' : t.textMuted,
              fontSize: 15, fontWeight: 600, fontFamily: font,
              cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              minHeight: 44,
            }
          },
            React.createElement('span', null, tabKey.charAt(0).toUpperCase() + tabKey.slice(1))
          )
        )
      ),

      // Initiatives tab
      discoverTab === 'initiatives' && initiatives.map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 18, padding: 18, marginBottom: 14,
            boxShadow: `0 4px 16px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
            animation: `slideUp 0.3s ease ${i * 0.08}s both`,
            cursor: 'pointer', transition: 'transform 0.15s ease',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: `linear-gradient(135deg, ${t.primary}20, ${t.cta}20)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, createIcon(item.icon, 24, t.primary)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, item.title),
                React.createElement('span', {
                  style: {
                    fontSize: 11, fontWeight: 700,
                    color: item.status === 'Active' ? t.primary : t.cta,
                    background: item.status === 'Active' ? `${t.primary}15` : `${t.cta}15`,
                    padding: '3px 8px', borderRadius: 6, fontFamily: font,
                  }
                }, item.status)
              ),
              React.createElement('p', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, margin: '0 0 10px', lineHeight: 1.5 } }, item.desc),
              React.createElement('div', {
                style: {
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: t.surface, borderRadius: 8, padding: '6px 10px', display: 'inline-flex',
                }
              },
                createIcon(icons.Leaf, 14, t.secondary),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.secondary, fontFamily: font } }, item.impact)
              )
            )
          )
        )
      ),

      // Businesses tab
      discoverTab === 'businesses' && businesses.map((biz, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 18, padding: 16, marginBottom: 12,
            boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
            animation: `slideUp 0.3s ease ${i * 0.06}s both`,
            cursor: 'pointer', transition: 'transform 0.15s ease',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, createIcon(biz.icon, 24, t.primary)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, biz.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginBottom: 4 } }, biz.type),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('span', { style: { fontSize: 13, color: t.warning, fontWeight: 600, fontFamily: font, display: 'flex', alignItems: 'center', gap: 3 } },
                  createIcon(icons.Star, 12, t.warning), biz.rating
                ),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, biz.distance)
              )
            ),
            React.createElement('div', {
              style: {
                background: `${t.primary}12`, borderRadius: 10, padding: '6px 10px',
                fontSize: 11, fontWeight: 700, color: t.primary, fontFamily: font,
                textAlign: 'center', maxWidth: 90, lineHeight: 1.3,
              }
            }, biz.discount)
          )
        )
      ),

      // Impact tab
      discoverTab === 'impact' && React.createElement('div', null,
        // Impact summary card
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
            borderRadius: 20, padding: 24, marginBottom: 20, textAlign: 'center',
          }
        },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: 1, textTransform: 'uppercase', fontFamily: font, marginBottom: 8 } }, 'GREENWOOD TOTAL IMPACT'),
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: '#FFFFFF', fontFamily: font, letterSpacing: -0.5 } }, '12,847'),
          React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.9)', fontFamily: font, marginBottom: 16 } }, 'Eco-Actions Completed'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around' } },
            ...[
              { label: 'CO2 Saved', value: '4.2 tons' },
              { label: 'Waste Diverted', value: '892 lbs' },
              { label: 'Trees Equivalent', value: '14' },
            ].map((stat, i) =>
              React.createElement('div', { key: i },
                React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: '#FFFFFF', fontFamily: font } }, stat.value),
                React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: font } }, stat.label)
              )
            )
          )
        ),

        // Eco facts
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 14 } }, 'Eco Insights'),
        ...ecoFacts.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
              display: 'flex', alignItems: 'flex-start', gap: 12,
              boxShadow: `0 2px 8px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
              animation: `slideUp 0.3s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: `${t.secondary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, createIcon(item.icon, 20, t.secondary)),
            React.createElement('p', { style: { fontSize: 15, color: t.text, fontFamily: font, margin: 0, lineHeight: 1.5 } }, item.fact)
          )
        )
      )
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    const badges = [
      { name: 'First Step', desc: 'Complete your first quest', earned: true, icon: icons.Footprints },
      { name: 'Streak Master', desc: '7-day contribution streak', earned: true, icon: icons.Flame },
      { name: 'Recycler Pro', desc: 'Complete 10 recycling quests', earned: true, icon: icons.Recycle },
      { name: 'Community Pillar', desc: 'Top 10 contributor', earned: false, icon: icons.Award },
      { name: 'Glyph Architect', desc: 'Contribute 1000+ energy', earned: false, icon: icons.Hexagon },
      { name: 'Eco Sage', desc: 'Complete all quest categories', earned: false, icon: icons.GraduationCap },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      // Profile header
      React.createElement('div', {
        style: { textAlign: 'center', marginBottom: 28 }
      },
        React.createElement('div', {
          style: {
            width: 88, height: 88, borderRadius: 44, margin: '0 auto 14px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 800, color: '#FFFFFF', fontFamily: font,
            boxShadow: `0 8px 24px ${t.primary}40`,
          }
        }, 'ME'),
        React.createElement('h1', {
          style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 4px', letterSpacing: -0.5 }
        }, 'Alex Thompson'),
        React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font } }, 'Greenwood Contributor since Jan 2026')
      ),

      // Stats row
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 24,
        }
      },
        ...[
          { label: 'Energy', value: glyphEnergy.toString(), icon: icons.Zap },
          { label: 'Rank', value: '#4', icon: icons.Trophy },
          { label: 'Streak', value: '5d', icon: icons.Flame },
          { label: 'Quests', value: '38', icon: icons.Target },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 14, padding: 12, textAlign: 'center',
              boxShadow: `0 2px 8px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
              createIcon(s.icon, 18, t.primary)
            ),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, s.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, s.label)
          )
        )
      ),

      // Theme toggle
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: 16, marginBottom: 20,
          boxShadow: `0 2px 8px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            createIcon(isDark ? icons.Moon : icons.Sun, 20, t.primary),
            React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, 'Dark Mode')
          ),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 52, height: 30, borderRadius: 15, border: 'none', padding: 3,
              background: isDark ? t.primary : '#D1D5DB',
              cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative',
              minHeight: 30,
            }
          },
            React.createElement('div', {
              style: {
                width: 24, height: 24, borderRadius: 12, background: '#FFFFFF',
                transform: isDark ? 'translateX(22px)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }
            })
          )
        )
      ),

      // Badges
      React.createElement('div', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 14 }
      }, 'Badges'),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }
      },
        ...badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 14, textAlign: 'center',
              boxShadow: `0 2px 8px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
              opacity: badge.earned ? 1 : 0.45,
              animation: `slideUp 0.3s ease ${i * 0.06}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 22, margin: '0 auto 8px',
                background: badge.earned ? `linear-gradient(135deg, ${t.primary}, ${t.cta})` : t.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, createIcon(badge.icon, 20, badge.earned ? '#FFFFFF' : t.textMuted)),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 2 } }, badge.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, lineHeight: 1.3 } }, badge.desc)
          )
        )
      ),

      // Settings links
      React.createElement('div', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 14 }
      }, 'Settings'),
      ...[
        { label: 'Notifications', icon: icons.Bell },
        { label: 'Privacy', icon: icons.Shield },
        { label: 'Help & Support', icon: icons.HelpCircle },
        { label: 'About TerraGlyph', icon: icons.Info },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 14, padding: 14, marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            boxShadow: `0 1px 4px ${t.shadow}`, border: `1px solid ${t.cardBorder}`,
            transition: 'transform 0.15s ease',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, createIcon(item.icon, 18, t.textSecondary)),
          React.createElement('span', { style: { flex: 1, fontSize: 17, fontWeight: 500, color: t.text, fontFamily: font } }, item.label),
          createIcon(icons.ChevronRight, 18, t.textMuted)
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    quests: QuestsScreen,
    leaderboard: LeaderboardScreen,
    discover: DiscoverScreen,
    profile: ProfileScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'quests', label: 'Quests', icon: icons.Compass },
    { id: 'leaderboard', label: 'Ranks', icon: icons.Trophy },
    { id: 'discover', label: 'Discover', icon: icons.Search },
    { id: 'profile', label: 'Profile', icon: icons.User },
  ];

  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      fontFamily: font,
    }
  },
    // Style tag for animations
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes glow {
        0% { box-shadow: 0 0 8px rgba(5,150,105,0.3); }
        50% { box-shadow: 0 0 20px rgba(5,150,105,0.6); }
        100% { box-shadow: 0 0 8px rgba(5,150,105,0.3); }
      }
      * { -webkit-tap-highlight-color: transparent; }
      *::-webkit-scrollbar { width: 0; height: 0; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: t.bg,
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
        transition: 'background 0.3s ease',
      }
    },
      // Scrollable content area
      React.createElement('div', {
        style: {
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(CurrentScreen)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          paddingTop: 8, paddingBottom: 28, paddingLeft: 4, paddingRight: 4,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          transition: 'background 0.3s ease',
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
              minWidth: 56, minHeight: 44, transition: 'all 0.2s ease',
              transform: activeScreen === tab.id ? 'scale(1.05)' : 'scale(1)',
            }
          },
            createIcon(tab.icon, 22, activeScreen === tab.id ? t.tabActive : t.tabInactive),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: activeScreen === tab.id ? 700 : 500,
                color: activeScreen === tab.id ? t.tabActive : t.tabInactive,
                fontFamily: font, transition: 'color 0.2s ease',
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
