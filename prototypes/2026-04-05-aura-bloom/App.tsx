// Aura Bloom — Interactive Mobile App Prototype
// Design: Skeuomorphic Tactile | Palette: Ruby Red #D32F2F + Gold #FFD54F on Charcoal #212121
// Font: Righteous | Mood: Dreamy Watercolor Calm

function App() {
  const { useState, useEffect, useRef } = React;

  // ─── Theme System ─────────────────────────────────────────────────
  const themes = {
    light: {
      bg: '#FFF8F0',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF3E0',
      primary: '#D32F2F',
      primaryLight: '#FFCDD2',
      primaryDark: '#B71C1C',
      gold: '#FFD54F',
      goldLight: '#FFF9C4',
      goldDark: '#F9A825',
      charcoal: '#212121',
      text: '#212121',
      textMuted: '#6D4C41',
      textLight: '#A1887F',
      border: '#FFE0B2',
      borderFocus: '#FFCCBC',
      navBg: '#212121',
      navActive: '#FFD54F',
      navInactive: '#6D4C41',
      shadow: 'rgba(211, 47, 47, 0.2)',
      shadowSoft: 'rgba(0, 0, 0, 0.07)',
      shadowMed: 'rgba(0, 0, 0, 0.12)',
    },
    dark: {
      bg: '#1C1008',
      surface: '#2A1A08',
      surfaceAlt: '#1A1005',
      primary: '#EF5350',
      primaryLight: '#4A1515',
      primaryDark: '#C62828',
      gold: '#FFD54F',
      goldLight: '#3D2E00',
      goldDark: '#F9A825',
      charcoal: '#F5F5F5',
      text: '#F5E6D3',
      textMuted: '#BCAAA4',
      textLight: '#8D6E63',
      border: '#3D2518',
      borderFocus: '#5D3A22',
      navBg: '#100A02',
      navActive: '#FFD54F',
      navInactive: '#5D4037',
      shadow: 'rgba(255, 213, 79, 0.12)',
      shadowSoft: 'rgba(0, 0, 0, 0.3)',
      shadowMed: 'rgba(0, 0, 0, 0.4)',
    },
  };

  const [isDark, setIsDark] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const t = isDark ? themes.dark : themes.light;

  const navItems = [
    { id: 'home',       label: 'Home',    icon: 'Home'      },
    { id: 'scan',       label: 'Scan',    icon: 'Camera'    },
    { id: 'collection', label: 'Bloom',   icon: 'Sparkles'  },
    { id: 'league',     label: 'League',  icon: 'Trophy'    },
    { id: 'challenges', label: 'Quests',  icon: 'Target'    },
  ];

  // ─── Shared style tokens ─────────────────────────────────────────
  const card = {
    background: t.surface,
    borderRadius: '16px',
    border: `1.5px solid ${t.border}`,
    boxShadow: `0 4px 14px ${t.shadowSoft}, 0 1px 3px ${t.shadowMed}, inset 0 1px 0 rgba(255,255,255,0.4)`,
    padding: '14px',
  };

  // ─── Bottom Navigation ────────────────────────────────────────────
  function BottomNav() {
    return React.createElement('div', {
      style: {
        height: '68px',
        background: t.navBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexShrink: 0,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.35)',
        borderTop: `1.5px solid rgba(255,213,79,0.1)`,
      },
    },
      navItems.map(item => {
        const isActive = activeScreen === item.id;
        const Icon = window.lucide[item.icon];
        return React.createElement('button', {
          key: item.id,
          onClick: () => setActiveScreen(item.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '12px',
            transition: 'transform 0.18s ease',
            transform: isActive ? 'translateY(-3px)' : 'none',
          },
        },
          Icon && React.createElement(Icon, {
            size: 20,
            color: isActive ? t.navActive : t.navInactive,
            strokeWidth: isActive ? 2.5 : 1.8,
          }),
          React.createElement('span', {
            style: {
              fontSize: '9px',
              color: isActive ? t.navActive : t.navInactive,
              fontFamily: 'Righteous, cursive',
              letterSpacing: '0.3px',
            },
          }, item.label)
        );
      })
    );
  }

  // ─── Home Screen ─────────────────────────────────────────────────
  function HomeScreen() {
    const [slideIndex, setSlideIndex] = useState(0);
    const slides = ["Today's Auras", 'Recent Blooms'];

    const auras = [
      { id: 1, icon: '🍃', title: 'Upcycle Opportunity', location: 'Your Kitchen', pts: 45, status: 'active' },
      { id: 2, icon: '⚡', title: 'Energy Saver Spot',   location: 'Living Room',  pts: 30, status: 'active' },
      { id: 3, icon: '💧', title: 'Water Hero Glow',     location: 'Garden',       pts: 60, status: 'bloomed' },
    ];

    const blooms = [
      { name: 'Mossy Pete', icon: '🌿', date: 'Today',     pts: 45 },
      { name: 'Solar Fern', icon: '☀️', date: 'Yesterday', pts: 80 },
      { name: 'Drip Drop',  icon: '💧', date: 'Apr 3',     pts: 60 },
      { name: 'Terra Bud',  icon: '🌱', date: 'Apr 2',     pts: 25 },
    ];

    return React.createElement('div', {
      style: { width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', fontFamily: 'Righteous, cursive', overflow: 'hidden' },
    },
      // ── Header ──
      React.createElement('div', {
        style: {
          padding: '18px 20px 0',
          background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)`,
          flexShrink: 0,
        },
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
        },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: '11px', color: t.textLight, marginBottom: '1px', letterSpacing: '0.5px' } }, 'Good morning,'),
            React.createElement('h1', { style: { fontSize: '21px', color: t.text, fontFamily: 'Righteous, cursive', lineHeight: 1.2 } }, 'Eco Explorer 🌿'),
          ),
          React.createElement('div', { style: { display: 'flex', gap: '10px', alignItems: 'center' } },
            React.createElement('button', {
              onClick: () => setIsDark(!isDark),
              style: {
                width: '34px', height: '34px', borderRadius: '50%',
                background: t.surfaceAlt, border: `1.5px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${t.shadowSoft}, inset 0 1px 0 rgba(255,255,255,0.5)`,
              },
            },
              isDark
                ? React.createElement(window.lucide.Sun,  { size: 15, color: t.gold })
                : React.createElement(window.lucide.Moon, { size: 15, color: t.textMuted })
            ),
            React.createElement('div', {
              style: {
                width: '38px', height: '38px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.primary}, ${t.gold})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', boxShadow: `0 4px 12px ${t.shadow}`,
              },
            }, '🌸')
          )
        ),

        // Stats row
        React.createElement('div', {
          style: { display: 'flex', gap: '8px', marginBottom: '14px' },
        },
          [
            { label: 'Bloom Pts', value: '2,840', icon: '⭐' },
            { label: 'Buddies',   value: '23',    icon: '🌱' },
            { label: 'Streak',    value: '7d 🔥', icon: '' },
          ].map((stat, i) => React.createElement('div', {
            key: i,
            style: {
              flex: 1, ...card, padding: '10px 6px', textAlign: 'center',
            },
          },
            React.createElement('div', { style: { fontSize: '16px', marginBottom: '2px' } }, stat.icon),
            React.createElement('div', { style: { fontSize: '13px', color: t.text, fontFamily: 'Righteous, cursive' } }, stat.value),
            React.createElement('div', { style: { fontSize: '9px', color: t.textLight, marginTop: '1px' } }, stat.label)
          ))
        )
      ),

      // ── Flora AI Nudge ──
      React.createElement('div', {
        style: {
          margin: '0 20px 14px',
          background: `linear-gradient(135deg, ${t.primaryLight}88, ${t.goldLight}88)`,
          borderRadius: '16px',
          padding: '12px 14px',
          border: `1.5px solid ${t.borderFocus}`,
          display: 'flex', gap: '10px', alignItems: 'flex-start',
          boxShadow: `0 6px 20px ${t.shadow}`,
          flexShrink: 0,
        },
      },
        React.createElement('div', {
          style: {
            width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
            background: `linear-gradient(135deg, ${t.primary}, ${t.gold})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', boxShadow: `0 3px 10px ${t.shadow}`,
          },
        }, '🌺'),
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '10px', color: t.primary, fontFamily: 'Righteous, cursive', marginBottom: '3px', letterSpacing: '0.5px' } }, 'FLORA SAYS:'),
          React.createElement('p', { style: { fontSize: '12px', color: t.text, lineHeight: '1.45' } },
            "I spotted 3 new Auras near you! Head to your kitchen — there's an upcycling glow shimmering at 87% intensity. 🍃"
          )
        )
      ),

      // ── Horizontal slide tabs ──
      React.createElement('div', { style: { flexShrink: 0, padding: '0 20px 10px' } },
        React.createElement('div', { style: { display: 'flex', gap: '8px' } },
          slides.map((slide, i) => React.createElement('button', {
            key: i,
            onClick: () => setSlideIndex(i),
            style: {
              padding: '7px 18px', borderRadius: '20px',
              border: `1.5px solid ${slideIndex === i ? t.primary : t.border}`,
              background: slideIndex === i
                ? `linear-gradient(145deg, ${t.primary}, ${t.primaryDark})`
                : t.surface,
              color: slideIndex === i ? '#FFF' : t.textMuted,
              fontFamily: 'Righteous, cursive', fontSize: '12px', cursor: 'pointer',
              boxShadow: slideIndex === i ? `0 4px 12px ${t.shadow}` : 'none',
              transition: 'all 0.2s ease',
            },
          }, slide))
        )
      ),

      // ── Slide Content ──
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', position: 'relative' },
      },
        React.createElement('div', {
          style: {
            display: 'flex', width: '200%', height: '100%',
            transform: `translateX(${slideIndex === 0 ? '0%' : '-50%'})`,
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
          // Slide 1 — Today's Auras
          React.createElement('div', {
            style: { width: '50%', height: '100%', overflowY: 'auto', padding: '0 20px 8px' },
          },
            auras.map(aura => React.createElement('div', {
              key: aura.id,
              onClick: () => setActiveScreen('scan'),
              style: {
                ...card,
                marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer',
                borderLeft: `4px solid ${aura.status === 'bloomed' ? t.gold : t.primary}`,
              },
            },
              React.createElement('div', {
                style: {
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: aura.status === 'bloomed'
                    ? `linear-gradient(135deg, ${t.goldLight}, ${t.gold}44)`
                    : `linear-gradient(135deg, ${t.primaryLight}, ${t.primary}22)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                  border: `1.5px solid ${aura.status === 'bloomed' ? t.gold + '66' : t.primaryLight}`,
                  boxShadow: `0 2px 8px ${aura.status === 'bloomed' ? 'rgba(255,213,79,0.25)' : t.shadow}`,
                },
              }, aura.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: '13px', color: t.text, fontFamily: 'Righteous, cursive' } }, aura.title),
                React.createElement('p', { style: { fontSize: '11px', color: t.textLight, marginTop: '2px' } }, aura.location),
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('p', { style: { fontSize: '14px', color: t.gold, fontFamily: 'Righteous, cursive' } }, `+${aura.pts}`),
                React.createElement('p', {
                  style: { fontSize: '9px', color: aura.status === 'bloomed' ? t.gold : t.primary, textTransform: 'uppercase', marginTop: '2px', letterSpacing: '0.5px' },
                }, aura.status)
              )
            ))
          ),

          // Slide 2 — Recent Blooms
          React.createElement('div', {
            style: { width: '50%', height: '100%', overflowY: 'auto', padding: '0 20px 8px' },
          },
            React.createElement('div', {
              style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
            },
              blooms.map((bloom, i) => React.createElement('div', {
                key: i,
                onClick: () => setActiveScreen('collection'),
                style: { ...card, textAlign: 'center', padding: '14px 10px', cursor: 'pointer' },
              },
                React.createElement('div', { style: { fontSize: '32px', marginBottom: '6px' } }, bloom.icon),
                React.createElement('p', { style: { fontSize: '12px', color: t.text, fontFamily: 'Righteous, cursive' } }, bloom.name),
                React.createElement('p', { style: { fontSize: '10px', color: t.textLight, marginTop: '2px' } }, bloom.date),
                React.createElement('p', { style: { fontSize: '11px', color: t.gold, marginTop: '4px', fontFamily: 'Righteous, cursive' } }, `⭐ ${bloom.pts}`)
              ))
            )
          )
        )
      ),

      React.createElement(BottomNav)
    );
  }

  // ─── Scan Screen ─────────────────────────────────────────────────
  function ScanScreen() {
    const [scanning, setScanning] = useState(false);
    const [detected, setDetected] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);

    const startScan = () => {
      setScanning(true); setDetected(false); setProgress(0);
      let p = 0;
      timerRef.current = setInterval(() => {
        p += 4;
        setProgress(p);
        if (p >= 100) { clearInterval(timerRef.current); setScanning(false); setDetected(true); }
      }, 80);
    };

    useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

    const aura = {
      icon: '🫙', name: 'Reusable Wonder', category: 'Upcycling',
      intensity: 87, pts: 45, action: 'Repurpose that glass jar into a planter',
    };

    return React.createElement('div', {
      style: { width: '100%', height: '100%', background: '#09121F', display: 'flex', flexDirection: 'column', fontFamily: 'Righteous, cursive', overflow: 'hidden' },
    },
      // AR viewport
      React.createElement('div', {
        style: { flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #09121F 0%, #141F10 55%, #1A1208 100%)' },
      },
        // Grid overlay
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(211,47,47,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(211,47,47,0.06) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          },
        }),

        // Floating ambient auras
        ...[
          { top: '12%', left: '18%',  size: 62, glow: 'rgba(211,47,47,0.45)',  emoji: '🍃', delay: '0s'   },
          { top: '38%', right: '12%', size: 78, glow: 'rgba(255,213,79,0.35)', emoji: '⚡', delay: '0.6s' },
          { top: '62%', left: '32%',  size: 50, glow: 'rgba(76,175,80,0.4)',   emoji: '💧', delay: '1.1s' },
        ].map((a, i) => React.createElement('div', {
          key: i,
          style: {
            position: 'absolute', top: a.top, left: a.left, right: a.right,
            width: `${a.size}px`, height: `${a.size}px`, borderRadius: '50%',
            background: a.glow,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: `${a.size * 0.42}px`,
            boxShadow: `0 0 ${a.size * 0.6}px ${a.glow}, 0 0 ${a.size * 1.2}px ${a.glow}55`,
            animation: `aura-pulse 2.2s ease-in-out infinite`,
            animationDelay: a.delay,
          },
        }, a.emoji)),

        // Corner brackets (AR frame)
        ...[['t','l'],['t','r'],['b','l'],['b','r']].map(([v, h]) => React.createElement('div', {
          key: `${v}${h}`,
          style: {
            position: 'absolute', width: '28px', height: '28px',
            top:    v === 't' ? '24px'  : 'auto',
            bottom: v === 'b' ? '88px'  : 'auto',
            left:   h === 'l' ? '18px'  : 'auto',
            right:  h === 'r' ? '18px'  : 'auto',
            borderTop:    v === 't' ? `2px solid ${t.primary}` : 'none',
            borderBottom: v === 'b' ? `2px solid ${t.primary}` : 'none',
            borderLeft:   h === 'l' ? `2px solid ${t.primary}` : 'none',
            borderRight:  h === 'r' ? `2px solid ${t.primary}` : 'none',
            borderRadius: `${v==='t'?h==='l'?'4px 0 0 0':'0 4px 0 0':h==='l'?'0 0 0 4px':'0 0 4px 0'}`,
          },
        })),

        // Scan progress overlay
        scanning && React.createElement('div', {
          style: { position: 'absolute', top: '50%', left: '10%', right: '10%', transform: 'translateY(-50%)', textAlign: 'center' },
        },
          React.createElement('div', {
            style: { height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', marginBottom: '10px', overflow: 'hidden' },
          },
            React.createElement('div', {
              style: {
                height: '100%', width: `${progress}%`,
                background: `linear-gradient(90deg, ${t.primary}, ${t.gold})`,
                borderRadius: '2px', boxShadow: `0 0 10px ${t.primary}`, transition: 'width 0.1s linear',
              },
            })
          ),
          React.createElement('p', {
            style: { color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Righteous, cursive', letterSpacing: '1px' },
          }, `SCANNING… ${progress}%`)
        ),

        // Detected aura panel
        detected && React.createElement('div', {
          style: {
            position: 'absolute', bottom: '88px', left: '12px', right: '12px',
            background: isDark ? 'rgba(18,10,2,0.96)' : 'rgba(33,16,4,0.96)',
            borderRadius: '20px', padding: '14px',
            border: `1.5px solid ${t.gold}88`,
            boxShadow: `0 0 40px rgba(255,213,79,0.25), 0 8px 30px rgba(0,0,0,0.5)`,
          },
        },
          React.createElement('div', { style: { display: 'flex', gap: '12px', marginBottom: '12px' } },
            React.createElement('div', {
              style: {
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(211,47,47,0.25), rgba(255,213,79,0.3))',
                border: `1.5px solid ${t.gold}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', boxShadow: `0 0 20px rgba(255,213,79,0.35)`,
              },
            }, aura.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('p', { style: { fontSize: '14px', color: '#F5E6D3', fontFamily: 'Righteous, cursive' } }, aura.name),
                React.createElement('span', {
                  style: {
                    fontSize: '11px', background: `linear-gradient(135deg, ${t.gold}, ${t.goldDark})`,
                    color: '#212121', padding: '2px 8px', borderRadius: '8px', fontFamily: 'Righteous, cursive',
                  },
                }, `+${aura.pts} pts`)
              ),
              React.createElement('p', { style: { fontSize: '10px', color: t.gold, marginTop: '2px' } }, `${aura.intensity}% intensity · ${aura.category}`),
              React.createElement('p', { style: { fontSize: '12px', color: 'rgba(245,230,211,0.65)', marginTop: '5px', lineHeight: '1.4' } }, aura.action),
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px' } },
            React.createElement('button', {
              onClick: () => setActiveScreen('collection'),
              style: {
                flex: 1, padding: '10px', background: `linear-gradient(145deg, ${t.gold}, ${t.goldDark})`,
                border: 'none', borderRadius: '10px', color: '#212121',
                fontFamily: 'Righteous, cursive', fontSize: '13px', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255,213,79,0.4)',
              },
            }, React.createElement('span', null, '🌸 Bloom It!')),
            React.createElement('button', {
              onClick: () => setDetected(false),
              style: {
                padding: '10px 14px', background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
                color: 'rgba(245,230,211,0.6)', fontFamily: 'Righteous, cursive', fontSize: '13px', cursor: 'pointer',
              },
            }, 'Skip')
          )
        ),

        // Top header overlay
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '14px 18px',
            background: 'linear-gradient(180deg, rgba(9,18,31,0.85) 0%, transparent 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          },
        },
          React.createElement('button', {
            onClick: () => setActiveScreen('home'),
            style: {
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '10px', padding: '7px 12px', color: 'white',
              display: 'flex', alignItems: 'center', gap: '5px',
              cursor: 'pointer', fontFamily: 'Righteous, cursive', fontSize: '12px',
            },
          },
            React.createElement(window.lucide.ArrowLeft, { size: 13, color: 'white' }),
            React.createElement('span', null, 'Back')
          ),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontFamily: 'Righteous, cursive' } }, 'Aura Vision'),
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, rgba(211,47,47,0.25), rgba(255,213,79,0.25))`,
              border: `1px solid ${t.gold}55`,
              borderRadius: '10px', padding: '5px 10px',
              fontSize: '11px', color: t.gold, fontFamily: 'Righteous, cursive',
            },
          }, '3 nearby')
        )
      ),

      // Scan button dock
      React.createElement('div', {
        style: {
          padding: '14px 20px',
          background: '#0A1320',
          display: 'flex', justifyContent: 'center',
          borderTop: '1px solid rgba(211,47,47,0.25)',
          flexShrink: 0,
        },
      },
        React.createElement('button', {
          onClick: !scanning ? startScan : undefined,
          style: {
            width: '68px', height: '68px', borderRadius: '50%',
            background: scanning
              ? 'rgba(255,255,255,0.08)'
              : `linear-gradient(145deg, ${t.primary}, #7B0000)`,
            border: `3px solid ${scanning ? 'rgba(255,255,255,0.2)' : t.primary}80`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: scanning ? 'default' : 'pointer',
            boxShadow: scanning ? 'none' : `0 0 32px ${t.primary}55, 0 8px 24px rgba(0,0,0,0.4)`,
            fontSize: '26px', transition: 'all 0.2s ease',
          },
        }, scanning
          ? React.createElement('div', {
              style: { width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${t.gold}`, borderTopColor: 'transparent', animation: 'scan-spin 0.8s linear infinite' },
            })
          : '👁️'
        )
      ),

      React.createElement(BottomNav)
    );
  }

  // ─── Collection Screen ────────────────────────────────────────────
  function CollectionScreen() {
    const [catIndex, setCatIndex] = useState(0);
    const categories = ['All', 'Nature', 'Urban', 'Water', 'Energy'];

    const buddies = [
      { name: 'Mossy Pete',  icon: '🌿', cat: 'Nature', rarity: 'Common',   pts: 45 },
      { name: 'Solar Fern',  icon: '☀️', cat: 'Energy', rarity: 'Rare',     pts: 80 },
      { name: 'Drip Drop',   icon: '💧', cat: 'Water',  rarity: 'Common',   pts: 60 },
      { name: 'Terra Bud',   icon: '🌱', cat: 'Nature', rarity: 'Uncommon', pts: 25 },
      { name: 'Jarvis Jade', icon: '🫙', cat: 'Urban',  rarity: 'Uncommon', pts: 45 },
      { name: 'Breeze Wisp', icon: '🌬️', cat: 'Nature', rarity: 'Rare',     pts: 70 },
      { name: 'Volt Vine',   icon: '⚡', cat: 'Energy', rarity: 'Epic',     pts: 120 },
      { name: 'Puddle Pals', icon: '🌧️', cat: 'Water',  rarity: 'Common',   pts: 35 },
      { name: '???', icon: '❓', cat: 'Urban',  rarity: '?', pts: 0, locked: true },
      { name: '???', icon: '❓', cat: 'Energy', rarity: '?', pts: 0, locked: true },
    ];

    const rarityPalette = {
      Common:   '#7CB87C',
      Uncommon: '#4CAF50',
      Rare:     '#42A5F5',
      Epic:     t.primary,
      '?':      '#555',
    };

    const visible = catIndex === 0 ? buddies : buddies.filter(b => b.cat === categories[catIndex]);

    return React.createElement('div', {
      style: { width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', fontFamily: 'Righteous, cursive', overflow: 'hidden' },
    },
      // Header
      React.createElement('div', { style: { padding: '18px 20px 10px', flexShrink: 0 } },
        React.createElement('h1', { style: { fontSize: '21px', color: t.text, fontFamily: 'Righteous, cursive', marginBottom: '3px' } }, '🌸 Bloom Collection'),
        React.createElement('p', { style: { fontSize: '12px', color: t.textMuted } },
          `${buddies.filter(b => !b.locked).length} collected · ${buddies.filter(b => b.locked).length} undiscovered`
        )
      ),

      // Category filter — horizontal slide
      React.createElement('div', { style: { padding: '0 20px 12px', flexShrink: 0 } },
        React.createElement('div', {
          style: { display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '2px' },
        },
          categories.map((cat, i) => React.createElement('button', {
            key: i,
            onClick: () => setCatIndex(i),
            style: {
              padding: '7px 16px', borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0,
              border: `1.5px solid ${catIndex === i ? t.primary : t.border}`,
              background: catIndex === i
                ? `linear-gradient(145deg, ${t.primary}, ${t.primaryDark})`
                : t.surface,
              color: catIndex === i ? '#FFF' : t.textMuted,
              fontFamily: 'Righteous, cursive', fontSize: '12px', cursor: 'pointer',
              boxShadow: catIndex === i ? `0 4px 12px ${t.shadow}` : 'none',
              transition: 'all 0.2s ease',
            },
          }, cat))
        )
      ),

      // Grid
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '0 20px 14px', scrollbarWidth: 'none' },
      },
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' },
        },
          visible.map((b, i) => React.createElement('div', {
            key: i,
            style: {
              background: b.locked ? (isDark ? '#1A1208' : '#F5F0EA') : t.surface,
              borderRadius: '14px', padding: '12px 8px', textAlign: 'center',
              border: `1.5px solid ${b.locked ? t.border : rarityPalette[b.rarity] + '55'}`,
              boxShadow: b.locked ? 'none' : `0 3px 12px ${t.shadowSoft}, 0 0 0 1px ${rarityPalette[b.rarity]}18`,
              opacity: b.locked ? 0.45 : 1, cursor: b.locked ? 'default' : 'pointer',
            },
          },
            React.createElement('div', {
              style: { fontSize: '28px', marginBottom: '6px', filter: b.locked ? 'grayscale(1) blur(2px)' : 'none' },
            }, b.icon),
            React.createElement('p', {
              style: { fontSize: '10px', color: t.text, fontFamily: 'Righteous, cursive', marginBottom: '4px', lineHeight: '1.2' },
            }, b.name),
            !b.locked && React.createElement('span', {
              style: { fontSize: '9px', color: rarityPalette[b.rarity], fontFamily: 'Righteous, cursive', letterSpacing: '0.3px' },
            }, b.rarity)
          ))
        )
      ),

      React.createElement(BottomNav)
    );
  }

  // ─── League Screen ───────────────────────────────────────────────
  function LeagueScreen() {
    const [tab, setTab] = useState(0);
    const tabs = ['Weekly', 'Monthly'];

    const weekly = [
      { rank: 1, name: 'GreenGuru Sarah', pts: 3240, buddies: 34, avatar: '🌿', trend: '+2' },
      { rank: 2, name: 'You',             pts: 2840, buddies: 23, avatar: '🌸', trend: '—', isMe: true },
      { rank: 3, name: 'EcoWarrior Jake', pts: 2690, buddies: 28, avatar: '🌳', trend: '-1' },
      { rank: 4, name: 'BloomMaster Kim', pts: 2450, buddies: 21, avatar: '🌻', trend: '+3' },
      { rank: 5, name: 'NatureLover Mo',  pts: 2210, buddies: 19, avatar: '🍀', trend: '-2' },
      { rank: 6, name: 'TerraCycle Alex', pts: 1980, buddies: 17, avatar: '♻️', trend: '+1' },
    ];

    const monthly = [
      { rank: 1, name: 'BloomMaster Kim', pts: 11200, buddies: 89, avatar: '🌻', trend: '+1' },
      { rank: 2, name: 'GreenGuru Sarah', pts: 10800, buddies: 94, avatar: '🌿', trend: '-1' },
      { rank: 3, name: 'You',             pts: 9650,  buddies: 78, avatar: '🌸', trend: '+4', isMe: true },
      { rank: 4, name: 'EcoWarrior Jake', pts: 8900,  buddies: 81, avatar: '🌳', trend: '-1' },
      { rank: 5, name: 'TerraCycle Alex', pts: 7400,  buddies: 65, avatar: '♻️', trend: '+2' },
    ];

    const leaders = tab === 0 ? weekly : monthly;

    return React.createElement('div', {
      style: { width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', fontFamily: 'Righteous, cursive', overflow: 'hidden' },
    },
      // Header
      React.createElement('div', {
        style: { padding: '18px 20px 14px', flexShrink: 0, background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)` },
      },
        React.createElement('h1', { style: { fontSize: '21px', color: t.text, fontFamily: 'Righteous, cursive', marginBottom: '3px' } }, '🏆 Flourish League'),
        React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, marginBottom: '14px' } }, 'Friendly eco-competition · Local Area'),

        // Tab switcher (horizontal slide indicator)
        React.createElement('div', {
          style: {
            display: 'flex', background: isDark ? '#1A1005' : '#F5EAD8',
            borderRadius: '13px', padding: '3px',
            border: `1.5px solid ${t.border}`,
          },
        },
          tabs.map((label, i) => React.createElement('button', {
            key: i,
            onClick: () => setTab(i),
            style: {
              flex: 1, padding: '8px', borderRadius: '10px', border: 'none',
              background: tab === i ? `linear-gradient(145deg, ${t.primary}, ${t.primaryDark})` : 'transparent',
              color: tab === i ? '#FFF' : t.textMuted,
              fontFamily: 'Righteous, cursive', fontSize: '13px', cursor: 'pointer',
              transition: 'all 0.2s ease', boxShadow: tab === i ? `0 3px 10px ${t.shadow}` : 'none',
            },
          }, label))
        )
      ),

      // Sliding content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement('div', {
          style: {
            display: 'flex', width: '200%', height: '100%',
            transform: `translateX(${tab === 0 ? '0%' : '-50%'})`,
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
          [weekly, monthly].map((list, tabIdx) =>
            React.createElement('div', {
              key: tabIdx,
              style: { width: '50%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
            },
              // Podium top 3
              React.createElement('div', {
                style: {
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  gap: '8px', padding: '4px 24px 14px', flexShrink: 0,
                },
              },
                [list[1], list[0], list[2]].filter(Boolean).map((leader, i) => {
                  const heights = [68, 88, 58];
                  const isFirst = i === 1;
                  return React.createElement('div', { key: leader.rank, style: { flex: 1, textAlign: 'center' } },
                    React.createElement('div', { style: { fontSize: '22px', marginBottom: '3px' } }, leader.avatar),
                    React.createElement('p', { style: { fontSize: '9px', color: t.text, fontFamily: 'Righteous, cursive', marginBottom: '3px' } },
                      leader.name.split(' ').slice(-1)[0]
                    ),
                    React.createElement('div', {
                      style: {
                        height: `${heights[i]}px`,
                        background: isFirst
                          ? `linear-gradient(180deg, ${t.gold}, ${t.goldDark})`
                          : `linear-gradient(180deg, ${t.primary}99, ${t.primaryDark}99)`,
                        borderRadius: '8px 8px 0 0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', fontFamily: 'Righteous, cursive',
                        color: isFirst ? '#212121' : '#FFF',
                        boxShadow: isFirst ? `0 0 20px ${t.gold}55` : 'none',
                        fontWeight: 'bold',
                      },
                    }, `#${leader.rank}`)
                  );
                })
              ),

              // Full list
              React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 14px' } },
                list.map(leader => React.createElement('div', {
                  key: leader.rank,
                  style: {
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '11px 12px', marginBottom: '7px',
                    background: leader.isMe
                      ? `linear-gradient(135deg, ${t.primaryLight}88, ${t.goldLight}88)`
                      : t.surface,
                    borderRadius: '13px',
                    border: `1.5px solid ${leader.isMe ? t.primary : t.border}`,
                    boxShadow: leader.isMe ? `0 4px 16px ${t.shadow}` : `0 2px 8px ${t.shadowSoft}`,
                  },
                },
                  React.createElement('span', {
                    style: {
                      fontSize: '12px', color: leader.rank <= 3 ? t.gold : t.textLight,
                      fontFamily: 'Righteous, cursive', width: '22px', textAlign: 'center',
                    },
                  }, `#${leader.rank}`),
                  React.createElement('div', { style: { fontSize: '22px' } }, leader.avatar),
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('p', { style: { fontSize: '13px', color: t.text, fontFamily: 'Righteous, cursive' } }, leader.name),
                    React.createElement('p', { style: { fontSize: '10px', color: t.textLight } }, `${leader.buddies} Buddies`),
                  ),
                  React.createElement('div', { style: { textAlign: 'right' } },
                    React.createElement('p', { style: { fontSize: '13px', color: t.gold, fontFamily: 'Righteous, cursive' } }, leader.pts.toLocaleString()),
                    React.createElement('p', {
                      style: {
                        fontSize: '10px',
                        color: leader.trend.startsWith('+') ? '#66BB6A' : leader.trend === '—' ? t.textLight : '#EF9A9A',
                      },
                    }, leader.trend)
                  )
                ))
              )
            )
          )
        )
      ),

      React.createElement(BottomNav)
    );
  }

  // ─── Challenges Screen ───────────────────────────────────────────
  function ChallengesScreen() {
    const [tab, setTab] = useState(0);
    const tabs = ['Daily', 'Weekly'];

    const daily = [
      {
        id: 1, icon: '🌿', title: 'Green Commuter',
        desc: 'Choose walking, cycling, or public transport today',
        pts: 50, progress: 0, total: 1, cat: 'Transport', diff: 'Easy',
      },
      {
        id: 2, icon: '♻️', title: 'Zero Waste Lunch',
        desc: 'Use items that would otherwise go to waste',
        pts: 75, progress: 1, total: 1, cat: 'Food', diff: 'Medium', done: true,
      },
      {
        id: 3, icon: '💡', title: 'Energy Detective',
        desc: 'Find and fix 2 energy waste spots in your home',
        pts: 60, progress: 1, total: 2, cat: 'Energy', diff: 'Medium',
      },
    ];

    const weekly = [
      {
        id: 4, icon: '🌱', title: 'Bloom Collector',
        desc: 'Bloom 5 Auras this week',
        pts: 200, progress: 2, total: 5, cat: 'Blooms', diff: 'Medium',
      },
      {
        id: 5, icon: '🚴', title: 'Car-Free Week',
        desc: 'Avoid personal car use for 5 consecutive days',
        pts: 300, progress: 3, total: 5, cat: 'Transport', diff: 'Hard',
      },
      {
        id: 6, icon: '🌊', title: 'Water Guardian',
        desc: 'Reduce water usage by 20% this week',
        pts: 150, progress: 0, total: 7, cat: 'Water', diff: 'Easy',
      },
    ];

    const diffColor = { Easy: '#66BB6A', Medium: t.goldDark, Hard: t.primary };

    return React.createElement('div', {
      style: { width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', fontFamily: 'Righteous, cursive', overflow: 'hidden' },
    },
      // Header
      React.createElement('div', { style: { padding: '18px 20px 12px', flexShrink: 0 } },
        React.createElement('h1', { style: { fontSize: '21px', color: t.text, fontFamily: 'Righteous, cursive', marginBottom: '3px' } }, '🎯 Eco-Sphere Quests'),
        React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, marginBottom: '14px' } }, 'Guided by Flora · Personalized for you'),

        React.createElement('div', {
          style: {
            display: 'flex', background: isDark ? '#1A1005' : '#F5EAD8',
            borderRadius: '13px', padding: '3px', border: `1.5px solid ${t.border}`,
          },
        },
          tabs.map((label, i) => React.createElement('button', {
            key: i,
            onClick: () => setTab(i),
            style: {
              flex: 1, padding: '8px', borderRadius: '10px', border: 'none',
              background: tab === i ? `linear-gradient(145deg, ${t.primary}, ${t.primaryDark})` : 'transparent',
              color: tab === i ? '#FFF' : t.textMuted,
              fontFamily: 'Righteous, cursive', fontSize: '13px', cursor: 'pointer',
              transition: 'all 0.2s ease', boxShadow: tab === i ? `0 3px 10px ${t.shadow}` : 'none',
            },
          }, label))
        )
      ),

      // Sliding challenge cards
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement('div', {
          style: {
            display: 'flex', width: '200%', height: '100%',
            transform: `translateX(${tab === 0 ? '0%' : '-50%'})`,
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
          [daily, weekly].map((list, idx) =>
            React.createElement('div', {
              key: idx,
              style: { width: '50%', height: '100%', overflowY: 'auto', padding: '0 20px 14px' },
            },
              list.map(ch => React.createElement('div', {
                key: ch.id,
                style: {
                  ...card,
                  marginBottom: '12px', opacity: ch.done ? 0.72 : 1,
                  borderLeft: `4px solid ${ch.done ? '#66BB6A' : diffColor[ch.diff]}`,
                },
              },
                // Top row
                React.createElement('div', { style: { display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' } },
                  React.createElement('div', {
                    style: {
                      width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                      background: ch.done
                        ? 'linear-gradient(135deg, #E8F5E9, #81C784)'
                        : `linear-gradient(135deg, ${t.primaryLight}88, ${t.goldLight}88)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px',
                      border: `1.5px solid ${ch.done ? '#66BB6A55' : t.borderFocus}`,
                    },
                  }, ch.done ? '✅' : ch.icon),
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('div', {
                      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
                    },
                      React.createElement('p', { style: { fontSize: '13px', color: t.text, fontFamily: 'Righteous, cursive' } }, ch.title),
                      React.createElement('span', {
                        style: {
                          fontSize: '11px', color: t.gold,
                          background: `${t.gold}22`, padding: '2px 8px',
                          borderRadius: '8px', fontFamily: 'Righteous, cursive',
                        },
                      }, `+${ch.pts}`)
                    ),
                    React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, lineHeight: '1.4' } }, ch.desc)
                  )
                ),

                // Progress bar
                !ch.done && React.createElement('div', null,
                  React.createElement('div', {
                    style: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' },
                  },
                    React.createElement('span', { style: { fontSize: '10px', color: t.textLight } }, `${ch.progress} / ${ch.total}`),
                    React.createElement('span', {
                      style: { fontSize: '10px', color: diffColor[ch.diff], fontFamily: 'Righteous, cursive' },
                    }, ch.diff)
                  ),
                  React.createElement('div', {
                    style: {
                      height: '6px', background: isDark ? '#2D1A0A' : '#F5E6D3',
                      borderRadius: '3px', overflow: 'hidden', border: `1px solid ${t.border}`,
                    },
                  },
                    React.createElement('div', {
                      style: {
                        height: '100%', width: `${(ch.progress / ch.total) * 100}%`,
                        background: `linear-gradient(90deg, ${diffColor[ch.diff]}, ${diffColor[ch.diff]}BB)`,
                        borderRadius: '3px',
                        boxShadow: `0 0 6px ${diffColor[ch.diff]}66`,
                        transition: 'width 0.5s ease',
                      },
                    })
                  )
                ),

                // CTA
                React.createElement('div', { style: { marginTop: '12px' } },
                  ch.done
                    ? React.createElement('p', {
                        style: { textAlign: 'center', fontSize: '12px', color: '#66BB6A', fontFamily: 'Righteous, cursive' },
                      }, '✓ Completed · Buddy Unlocked!')
                    : React.createElement('button', {
                        onClick: () => setActiveScreen('scan'),
                        style: {
                          width: '100%', padding: '10px',
                          background: `linear-gradient(145deg, ${t.primary}, ${t.primaryDark})`,
                          color: '#FFF', border: 'none', borderRadius: '10px',
                          fontFamily: 'Righteous, cursive', fontSize: '13px', cursor: 'pointer',
                          boxShadow: `0 4px 14px ${t.shadow}`,
                        },
                      }, React.createElement('span', null, '👁️ Scan to Complete'))
                )
              ))
            )
          )
        )
      ),

      React.createElement(BottomNav)
    );
  }

  // ─── Screen Registry ─────────────────────────────────────────────
  const screens = {
    home:       HomeScreen,
    scan:       ScanScreen,
    collection: CollectionScreen,
    league:     LeagueScreen,
    challenges: ChallengesScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  // ─── Root Render ─────────────────────────────────────────────────
  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Righteous, cursive',
    },
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      @keyframes aura-pulse {
        0%,100% { transform: scale(1);    opacity: 0.75; }
        50%      { transform: scale(1.1); opacity: 1;    }
      }
      @keyframes scan-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `),
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        borderRadius: '44px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 10px #2A2A2A, 0 0 0 12px #444',
        display: 'flex',
        flexDirection: 'column',
      },
    },
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' },
      },
        React.createElement(ActiveScreen)
      )
    )
  );
}
