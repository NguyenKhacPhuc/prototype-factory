
function App() {
  const { useState, useEffect, useRef } = React;

  // Inject Google Font
  const fontStyle = React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #E8E8F0; }
  `);

  const themes = {
    light: {
      bg: '#F5F4FF',
      surface: '#FFFFFF',
      surface2: '#F0EFFF',
      card: '#FFFFFF',
      text: '#12112A',
      textSub: '#6B6880',
      textMuted: '#A8A5B8',
      primary: '#5B6AF0',
      primaryLight: '#EEF0FF',
      primaryDark: '#3D4ED4',
      accent: '#FF6B6B',
      accentGreen: '#2ECC96',
      accentOrange: '#FF9F43',
      border: '#E8E6F5',
      navBg: '#FFFFFF',
      statusBar: 'rgba(245,244,255,0.9)',
      shadow: 'rgba(91,106,240,0.12)',
      overlay: 'rgba(18,17,42,0.06)',
      gradient1: 'linear-gradient(135deg, #5B6AF0 0%, #8B6FF5 100%)',
      gradient2: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F43 100%)',
      gradient3: 'linear-gradient(135deg, #2ECC96 0%, #1AA3D8 100%)',
    },
    dark: {
      bg: '#0E0D1F',
      surface: '#1A1930',
      surface2: '#231F3D',
      card: '#1A1930',
      text: '#F2F0FF',
      textSub: '#9B98B5',
      textMuted: '#5E5A78',
      primary: '#7C8DF5',
      primaryLight: '#1E1E40',
      primaryDark: '#5B6AF0',
      accent: '#FF7B7B',
      accentGreen: '#3DD6A3',
      accentOrange: '#FFB053',
      border: '#2A2745',
      navBg: '#14122A',
      statusBar: 'rgba(14,13,31,0.9)',
      shadow: 'rgba(91,106,240,0.25)',
      overlay: 'rgba(242,240,255,0.04)',
      gradient1: 'linear-gradient(135deg, #5B6AF0 0%, #8B6FF5 100%)',
      gradient2: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F43 100%)',
      gradient3: 'linear-gradient(135deg, #2ECC96 0%, #1AA3D8 100%)',
    }
  };

  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const ff = "'Plus Jakarta Sans', sans-serif";

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'scan', label: 'Scan', icon: window.lucide.Camera },
    { id: 'design', label: 'Design', icon: window.lucide.Layers },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  // ── STATUS BAR ──────────────────────────────────────────────
  function StatusBar() {
    return React.createElement('div', {
      style: {
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 44, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
        fontFamily: ff,
        background: t.statusBar,
        backdropFilter: 'blur(8px)',
      }
    },
      React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, '9:41'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
        React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
        React.createElement('div', {
          style: {
            width: 22, height: 12, borderRadius: 3, border: `1.5px solid ${t.text}`,
            display: 'flex', alignItems: 'center', padding: '0 1px', position: 'relative'
          }
        },
          React.createElement('div', {
            style: { width: '75%', height: '70%', borderRadius: 2, background: t.accentGreen }
          }),
          React.createElement('div', {
            style: {
              width: 2, height: 6, background: t.text, borderRadius: 1,
              position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)'
            }
          })
        )
      )
    );
  }

  // ── HOME SCREEN ──────────────────────────────────────────────
  function HomeScreen() {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office'];

    const projects = [
      { name: 'Living Room Refresh', date: 'Mar 20', rooms: 3, color: '#5B6AF0', img: '🛋️', status: 'In Progress' },
      { name: 'Home Office Setup', date: 'Mar 18', rooms: 2, color: '#FF6B6B', img: '🖥️', status: 'Complete' },
      { name: 'Master Bedroom', date: 'Mar 15', rooms: 4, color: '#2ECC96', img: '🛏️', status: 'Complete' },
      { name: 'Kitchen Nook', date: 'Mar 10', rooms: 1, color: '#FF9F43', img: '🍳', status: 'Draft' },
    ];

    const tips = [
      { icon: '🎨', title: 'Test Before You Buy', desc: 'Preview paint colors with real lighting effects' },
      { icon: '📐', title: 'Scale Matters', desc: 'Drag furniture at true-to-life proportions' },
      { icon: '📸', title: 'Snap & Design', desc: 'Any room photo becomes your canvas instantly' },
    ];

    const [tipIdx, setTipIdx] = useState(0);

    useEffect(() => {
      const id = setInterval(() => setTipIdx(i => (i + 1) % tips.length), 3000);
      return () => clearInterval(id);
    }, []);

    return React.createElement('div', {
      style: {
        flex: 1, overflowY: 'auto', fontFamily: ff,
        background: t.bg, paddingBottom: 80,
      }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '60px 20px 16px',
          background: t.bg,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontWeight: 500, marginBottom: 2 } }, 'Good morning,'),
            React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text } }, 'Alex Rivera 👋')
          ),
          React.createElement('div', {
            style: {
              width: 42, height: 42, borderRadius: 14,
              background: t.gradient1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 16px ${t.shadow}`,
              cursor: 'pointer',
            }
          },
            React.createElement('span', { style: { fontSize: 18 } }, '🏠')
          )
        )
      ),

      // Hero CTA
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: {
            borderRadius: 20, padding: '20px',
            background: t.gradient1,
            boxShadow: `0 8px 32px ${t.shadow}`,
            cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: -20, right: -20,
              width: 120, height: 120, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: -30, right: 20,
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }
          }),
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 } }, 'Start New Project'),
          React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 } }, 'Design Your Space'),
          React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 16, lineHeight: 1.5 } }, 'Snap a photo and transform any room with AI-powered design tools'),
          React.createElement('div', {
            onClick: () => setActiveTab('scan'),
            style: {
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', borderRadius: 30, padding: '10px 18px',
              cursor: 'pointer',
            }
          },
            React.createElement(window.lucide.Camera, { size: 16, color: themes.light.primary }),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: themes.light.primary } }, 'Scan a Room')
          )
        )
      ),

      // Tip carousel
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: {
            borderRadius: 16, padding: '14px 16px',
            background: t.surface2,
            border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 14,
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12,
              background: t.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }
          }, tips[tipIdx].icon),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.primary, marginBottom: 2 } }, tips[tipIdx].title),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub, lineHeight: 1.4 } }, tips[tipIdx].desc)
          ),
          React.createElement('div', { style: { display: 'flex', gap: 4, marginLeft: 'auto', flexShrink: 0 } },
            tips.map((_, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  width: i === tipIdx ? 16 : 6,
                  height: 6, borderRadius: 3,
                  background: i === tipIdx ? t.primary : t.border,
                  transition: 'all 0.3s ease',
                }
              })
            )
          )
        )
      ),

      // Quick stats
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          [
            { label: 'Projects', value: '12', icon: '📁', color: t.primary },
            { label: 'Designs', value: '47', icon: '🎨', color: t.accentGreen },
            { label: 'Saved', value: '8', icon: '⭐', color: t.accentOrange },
          ].map((stat, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.surface,
                borderRadius: 16, padding: '14px 12px',
                border: `1px solid ${t.border}`,
                textAlign: 'center',
                boxShadow: `0 2px 8px ${t.overlay}`,
              }
            },
              React.createElement('div', { style: { fontSize: 22, marginBottom: 4 } }, stat.icon),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: stat.color, marginBottom: 2 } }, stat.value),
              React.createElement('div', { style: { fontSize: 11, color: t.textSub, fontWeight: 500 } }, stat.label)
            )
          )
        )
      ),

      // Recent Projects
      React.createElement('div', { style: { padding: '0 20px 12px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, 'Recent Projects'),
          React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 600, cursor: 'pointer' } }, 'See all')
        ),

        // Filter pills
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto' } },
          filters.map(f =>
            React.createElement('div', {
              key: f,
              onClick: () => setActiveFilter(f),
              style: {
                padding: '6px 14px', borderRadius: 20, flexShrink: 0,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: activeFilter === f ? t.primary : t.surface,
                color: activeFilter === f ? '#fff' : t.textSub,
                border: `1.5px solid ${activeFilter === f ? t.primary : t.border}`,
                transition: 'all 0.2s ease',
              }
            }, f)
          )
        ),

        // Project cards
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          projects.map((proj, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setActiveTab('design'),
              style: {
                background: t.surface,
                borderRadius: 16, padding: '14px',
                border: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${t.overlay}`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: proj.color + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }
              }, proj.img),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 } }, proj.name),
                React.createElement('p', { style: { fontSize: 12, color: t.textSub } }, `${proj.rooms} rooms · ${proj.date}`)
              ),
              React.createElement('div', {
                style: {
                  padding: '4px 10px', borderRadius: 20,
                  fontSize: 11, fontWeight: 600,
                  background: proj.status === 'Complete' ? '#2ECC9620' : proj.status === 'In Progress' ? t.primaryLight : t.surface2,
                  color: proj.status === 'Complete' ? '#2ECC96' : proj.status === 'In Progress' ? t.primary : t.textMuted,
                }
              }, proj.status)
            )
          )
        )
      )
    );
  }

  // ── SCAN SCREEN ──────────────────────────────────────────────
  function ScanScreen() {
    const [scanState, setScanState] = useState('idle'); // idle, scanning, complete
    const [progress, setProgress] = useState(0);
    const [detected, setDetected] = useState([]);
    const allDetected = ['Walls', 'Floor', 'Furniture', 'Windows', 'Light Source'];

    const startScan = () => {
      setScanState('scanning');
      setProgress(0);
      setDetected([]);
      let p = 0;
      const id = setInterval(() => {
        p += 4;
        setProgress(p);
        if (p % 20 === 0 && allDetected.length > detected.length) {
          const idx = Math.floor(p / 20) - 1;
          if (idx < allDetected.length) {
            setDetected(prev => [...prev, allDetected[idx]]);
          }
        }
        if (p >= 100) {
          clearInterval(id);
          setScanState('complete');
        }
      }, 80);
    };

    return React.createElement('div', {
      style: {
        flex: 1, display: 'flex', flexDirection: 'column',
        background: t.bg, fontFamily: ff, paddingBottom: 80,
      }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '60px 20px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Scan Room'),
          React.createElement('p', { style: { fontSize: 13, color: t.textSub } }, 'Point camera at any room')
        ),
        React.createElement('div', {
          style: {
            width: 38, height: 38, borderRadius: 12,
            background: t.surface, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.HelpCircle, { size: 18, color: t.textSub })
        )
      ),

      // Camera viewfinder
      React.createElement('div', { style: { padding: '0 20px', flex: 1 } },
        React.createElement('div', {
          style: {
            borderRadius: 24, overflow: 'hidden',
            position: 'relative', height: 280,
            background: isDark ? '#0A0918' : '#1A1930',
            boxShadow: `0 12px 40px ${t.shadow}`,
          }
        },
          // Room mock image background
          React.createElement('div', {
            style: {
              position: 'absolute', inset: 0,
              background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            // Simulated room drawing
            React.createElement('svg', { width: '100%', height: '100%', viewBox: '0 0 335 280', style: { position: 'absolute', inset: 0 } },
              // Back wall
              React.createElement('rect', { x: 40, y: 30, width: 255, height: 160, fill: '#2a2550', stroke: '#3d3870', strokeWidth: 1 }),
              // Floor
              React.createElement('polygon', { points: '0,280 375,280 295,190 40,190', fill: '#1d1b3a', stroke: '#2d2b50', strokeWidth: 1 }),
              // Left wall
              React.createElement('polygon', { points: '0,280 40,190 40,30 0,60', fill: '#221f42' }),
              // Window
              React.createElement('rect', { x: 160, y: 50, width: 80, height: 90, fill: '#4a7ab5', stroke: '#5a8ac5', strokeWidth: 1, opacity: 0.7 }),
              React.createElement('line', { x1: 200, y1: 50, x2: 200, y2: 140, stroke: '#5a8ac5', strokeWidth: 1 }),
              React.createElement('line', { x1: 160, y1: 95, x2: 240, y2: 95, stroke: '#5a8ac5', strokeWidth: 1 }),
              // Light glow from window
              React.createElement('ellipse', { cx: 200, cy: 190, rx: 80, ry: 20, fill: '#4a7ab5', opacity: 0.15 }),
              // Couch
              React.createElement('rect', { x: 60, y: 200, width: 130, height: 50, rx: 6, fill: '#3d2b6d' }),
              React.createElement('rect', { x: 60, y: 195, width: 130, height: 18, rx: 6, fill: '#4d3b7d' }),
              React.createElement('rect', { x: 60, y: 200, width: 20, height: 50, rx: 4, fill: '#4d3b7d' }),
              React.createElement('rect', { x: 170, y: 200, width: 20, height: 50, rx: 4, fill: '#4d3b7d' }),
              // Table
              React.createElement('rect', { x: 210, y: 220, width: 70, height: 35, rx: 4, fill: '#5c3d2e' }),
              React.createElement('rect', { x: 213, y: 252, width: 6, height: 18, fill: '#4a3020' }),
              React.createElement('rect', { x: 271, y: 252, width: 6, height: 18, fill: '#4a3020' }),
            ),

            // Scan grid overlay
            scanState === 'scanning' && React.createElement('div', {
              style: {
                position: 'absolute', inset: 0,
                background: `repeating-linear-gradient(0deg, transparent, transparent 28px, ${t.primary}15 28px, ${t.primary}15 29px),
                             repeating-linear-gradient(90deg, transparent, transparent 28px, ${t.primary}15 28px, ${t.primary}15 29px)`,
                animation: 'none',
              }
            }),

            // Scan line
            scanState === 'scanning' && React.createElement('div', {
              style: {
                position: 'absolute', left: 0, right: 0,
                height: 2, background: t.primary,
                boxShadow: `0 0 12px ${t.primary}`,
                top: `${progress}%`,
                transition: 'top 0.08s linear',
              }
            }),

            // Corner brackets
            React.createElement('div', { style: { position: 'absolute', top: 12, left: 12 } },
              React.createElement('div', { style: { width: 20, height: 20, borderTop: `3px solid ${t.primary}`, borderLeft: `3px solid ${t.primary}`, borderRadius: '2px 0 0 0' } })
            ),
            React.createElement('div', { style: { position: 'absolute', top: 12, right: 12 } },
              React.createElement('div', { style: { width: 20, height: 20, borderTop: `3px solid ${t.primary}`, borderRight: `3px solid ${t.primary}`, borderRadius: '0 2px 0 0' } })
            ),
            React.createElement('div', { style: { position: 'absolute', bottom: 12, left: 12 } },
              React.createElement('div', { style: { width: 20, height: 20, borderBottom: `3px solid ${t.primary}`, borderLeft: `3px solid ${t.primary}`, borderRadius: '0 0 0 2px' } })
            ),
            React.createElement('div', { style: { position: 'absolute', bottom: 12, right: 12 } },
              React.createElement('div', { style: { width: 20, height: 20, borderBottom: `3px solid ${t.primary}`, borderRight: `3px solid ${t.primary}`, borderRadius: '0 0 2px 0' } })
            ),

            // Complete overlay
            scanState === 'complete' && React.createElement('div', {
              style: {
                position: 'absolute', inset: 0,
                background: 'rgba(46,204,150,0.12)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(2px)',
              }
            },
              React.createElement('div', {
                style: {
                  width: 56, height: 56, borderRadius: '50%',
                  background: '#2ECC96', marginBottom: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(window.lucide.Check, { size: 28, color: '#fff' })
              ),
              React.createElement('p', { style: { color: '#fff', fontWeight: 700, fontSize: 16, fontFamily: ff } }, 'Scan Complete!')
            )
          )
        )
      ),

      // Detected objects
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, 'AI Detection'),
          detected.length > 0 && React.createElement('span', {
            style: { fontSize: 12, color: t.accentGreen, fontWeight: 600 }
          }, `${detected.length}/${allDetected.length} objects`)
        ),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 } },
          allDetected.map((item, i) => {
            const isFound = detected.includes(item);
            return React.createElement('div', {
              key: i,
              style: {
                padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: isFound ? '#2ECC9620' : t.surface,
                color: isFound ? t.accentGreen : t.textMuted,
                border: `1.5px solid ${isFound ? '#2ECC96' : t.border}`,
                transition: 'all 0.3s ease',
                display: 'flex', alignItems: 'center', gap: 5,
              }
            },
              isFound && React.createElement(window.lucide.Check, { size: 12 }),
              item
            );
          })
        ),

        // Scan button
        scanState === 'idle' && React.createElement('button', {
          onClick: startScan,
          style: {
            width: '100%', padding: '15px', borderRadius: 16, border: 'none',
            background: t.gradient1, color: '#fff',
            fontSize: 15, fontWeight: 700, fontFamily: ff, cursor: 'pointer',
            boxShadow: `0 6px 20px ${t.shadow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement(window.lucide.Scan, { size: 18 }),
          'Start AI Scan'
        ),

        scanState === 'scanning' && React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 16, padding: '14px',
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
            React.createElement('p', { style: { fontSize: 13, color: t.text, fontWeight: 600 } }, 'Scanning...'),
            React.createElement('p', { style: { fontSize: 13, color: t.primary, fontWeight: 700 } }, `${progress}%`)
          ),
          React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%', borderRadius: 4,
                width: `${progress}%`, background: t.gradient1,
                transition: 'width 0.08s linear',
              }
            })
          )
        ),

        scanState === 'complete' && React.createElement('button', {
          onClick: () => setActiveTab('design'),
          style: {
            width: '100%', padding: '15px', borderRadius: 16, border: 'none',
            background: t.gradient3, color: '#fff',
            fontSize: 15, fontWeight: 700, fontFamily: ff, cursor: 'pointer',
            boxShadow: `0 6px 20px rgba(46,204,150,0.35)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement(window.lucide.ArrowRight, { size: 18 }),
          'Open in Design Canvas'
        )
      )
    );
  }

  // ── DESIGN SCREEN ──────────────────────────────────────────────
  function DesignScreen() {
    const [activeTool, setActiveTool] = useState('paint');
    const [selectedColor, setSelectedColor] = useState('#5B6AF0');
    const [wallColor, setWallColor] = useState('#E8E4D8');
    const [floorColor, setFloorColor] = useState('#B08B6E');
    const [showCompare, setShowCompare] = useState(false);

    const tools = [
      { id: 'paint', icon: window.lucide.Paintbrush, label: 'Paint' },
      { id: 'furniture', icon: window.lucide.Sofa, label: 'Furniture' },
      { id: 'decor', icon: window.lucide.Frame, label: 'Decor' },
      { id: 'light', icon: window.lucide.Sun, label: 'Lighting' },
    ];

    const paintColors = [
      { name: 'Ocean Mist', hex: '#A8C4D0' },
      { name: 'Sage', hex: '#8FAF8B' },
      { name: 'Warm Ivory', hex: '#E8E4D8' },
      { name: 'Slate Blue', hex: '#7B8FA6' },
      { name: 'Terracotta', hex: '#C97B5A' },
      { name: 'Lilac', hex: '#B8A9D0' },
      { name: 'Forest', hex: '#4A7B5A' },
      { name: 'Charcoal', hex: '#3D3D4A' },
    ];

    const furniture = [
      { name: 'Mid-Century Sofa', icon: '🛋️', price: '$899' },
      { name: 'Arc Floor Lamp', icon: '💡', price: '$249' },
      { name: 'Boho Rug 8×10', icon: '🪵', price: '$189' },
      { name: 'Gallery Wall Set', icon: '🖼️', price: '$149' },
    ];

    return React.createElement('div', {
      style: {
        flex: 1, display: 'flex', flexDirection: 'column',
        background: t.bg, fontFamily: ff, paddingBottom: 80,
        overflowY: 'auto',
      }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '60px 20px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Living Room Refresh'),
          React.createElement('p', { style: { fontSize: 12, color: t.textSub } }, 'Tap any surface to redesign')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('div', {
            onClick: () => setShowCompare(!showCompare),
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: showCompare ? t.primary : t.surface,
              border: `1px solid ${showCompare ? t.primary : t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            React.createElement(window.lucide.Columns2, { size: 16, color: showCompare ? '#fff' : t.textSub })
          ),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: t.surface, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            React.createElement(window.lucide.Share2, { size: 16, color: t.textSub })
          )
        )
      ),

      // Canvas preview
      React.createElement('div', { style: { padding: '0 20px 14px' } },
        React.createElement('div', {
          style: {
            borderRadius: 20, overflow: 'hidden',
            position: 'relative', height: 200,
            boxShadow: `0 8px 32px ${t.shadow}`,
          }
        },
          // Room render
          React.createElement('svg', {
            width: '100%', height: '100%', viewBox: '0 0 335 200',
            style: { display: 'block' }
          },
            // Background wall
            React.createElement('rect', { x: 0, y: 0, width: 335, height: 200, fill: wallColor }),
            // Floor
            React.createElement('polygon', { points: '0,200 335,200 270,145 65,145', fill: floorColor }),
            // Left shadow
            React.createElement('polygon', { points: '0,200 65,145 65,60 0,80', fill: 'rgba(0,0,0,0.12)' }),
            // Window
            React.createElement('rect', { x: 140, y: 25, width: 80, height: 90, fill: '#C8DFF0', stroke: '#B0CAE0', strokeWidth: 2, rx: 2 }),
            React.createElement('line', { x1: 180, y1: 25, x2: 180, y2: 115, stroke: '#B0CAE0', strokeWidth: 1.5 }),
            React.createElement('line', { x1: 140, y1: 70, x2: 220, y2: 70, stroke: '#B0CAE0', strokeWidth: 1.5 }),
            // Light spill
            React.createElement('polygon', { points: '140,115 220,115 260,200 100,200', fill: 'rgba(255,255,200,0.12)' }),
            // Couch
            React.createElement('rect', { x: 55, y: 153, width: 120, height: 40, rx: 6, fill: '#7B8FA6' }),
            React.createElement('rect', { x: 55, y: 148, width: 120, height: 16, rx: 5, fill: '#8FA0B5' }),
            React.createElement('rect', { x: 55, y: 153, width: 16, height: 40, rx: 4, fill: '#9BAFC5' }),
            React.createElement('rect', { x: 159, y: 153, width: 16, height: 40, rx: 4, fill: '#9BAFC5' }),
            // Table
            React.createElement('rect', { x: 190, y: 167, width: 60, height: 28, rx: 4, fill: '#C4956A' }),
            React.createElement('rect', { x: 194, y: 193, width: 5, height: 14, fill: '#A67A52' }),
            React.createElement('rect', { x: 241, y: 193, width: 5, height: 14, fill: '#A67A52' }),
            // Rug
            React.createElement('ellipse', { cx: 150, cy: 196, rx: 90, ry: 8, fill: 'rgba(180,130,100,0.35)' }),

            // Applied color preview badge
            React.createElement('rect', { x: 8, y: 8, width: 65, height: 22, rx: 8, fill: 'rgba(0,0,0,0.45)' }),
            React.createElement('rect', { x: 12, y: 13, width: 12, height: 12, rx: 3, fill: wallColor }),
            React.createElement('text', { x: 28, y: 23, fill: '#fff', fontSize: 8, fontFamily: ff, fontWeight: 600 }, 'Wall Color'),
          ),

          // Compare handle
          showCompare && React.createElement('div', {
            style: {
              position: 'absolute', top: 0, bottom: 0, left: '50%',
              width: 3, background: '#fff',
              boxShadow: '0 0 8px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement('div', {
              style: {
                width: 24, height: 24, borderRadius: '50%',
                background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'ew-resize',
              }
            },
              React.createElement(window.lucide.GripVertical, { size: 12, color: '#666' })
            )
          ),

          // Active tool badge
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: 10, right: 10,
              background: t.primary, borderRadius: 10, padding: '4px 10px',
              fontSize: 11, fontWeight: 700, color: '#fff',
              display: 'flex', alignItems: 'center', gap: 4,
            }
          },
            React.createElement(window.lucide.Wand2, { size: 12 }),
            'AI Enhanced'
          )
        )
      ),

      // Tool tabs
      React.createElement('div', { style: { padding: '0 20px 12px' } },
        React.createElement('div', {
          style: {
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
          }
        },
          tools.map(tool =>
            React.createElement('div', {
              key: tool.id,
              onClick: () => setActiveTool(tool.id),
              style: {
                padding: '10px 8px', borderRadius: 14, textAlign: 'center',
                cursor: 'pointer',
                background: activeTool === tool.id ? t.primary : t.surface,
                border: `1.5px solid ${activeTool === tool.id ? t.primary : t.border}`,
                transition: 'all 0.2s ease',
              }
            },
              React.createElement(tool.icon, {
                size: 18,
                color: activeTool === tool.id ? '#fff' : t.textSub,
              }),
              React.createElement('p', {
                style: {
                  fontSize: 11, fontWeight: 600, marginTop: 4,
                  color: activeTool === tool.id ? '#fff' : t.textSub,
                }
              }, tool.label)
            )
          )
        )
      ),

      // Tool content
      activeTool === 'paint' && React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { marginBottom: 12 } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Wall Colors'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 } },
            paintColors.map((c, i) =>
              React.createElement('div', {
                key: i,
                onClick: () => { setSelectedColor(c.hex); setWallColor(c.hex); },
                style: {
                  borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                  border: wallColor === c.hex ? `2px solid ${t.primary}` : `2px solid transparent`,
                  boxShadow: wallColor === c.hex ? `0 0 0 2px ${t.primaryLight}` : 'none',
                }
              },
                React.createElement('div', { style: { height: 40, background: c.hex } }),
                React.createElement('div', {
                  style: {
                    background: t.surface, padding: '4px',
                    border: `1px solid ${t.border}`, borderTop: 'none',
                  }
                },
                  React.createElement('p', { style: { fontSize: 9, fontWeight: 600, color: t.text, textAlign: 'center' } }, c.name)
                )
              )
            )
          )
        )
      ),

      activeTool === 'furniture' && React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Drag to Place'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          furniture.map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.surface, borderRadius: 14, padding: '12px 14px',
                border: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'grab',
              }
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 12,
                  background: t.surface2, fontSize: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, item.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, item.name),
                React.createElement('p', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, item.price)
              ),
              React.createElement(window.lucide.GripVertical, { size: 16, color: t.textMuted })
            )
          )
        )
      ),

      activeTool === 'decor' && React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Gallery Wall Builder'),
        React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: 14, border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 10 } },
            ['🌿', '🎨', '📷', '🏞️', '✨', '🖼️'].map((em, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  height: 56, borderRadius: 10, background: t.surface2,
                  border: `1px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, cursor: 'pointer',
                }
              }, em)
            )
          ),
          React.createElement('button', {
            style: {
              width: '100%', padding: '10px', borderRadius: 12, border: 'none',
              background: t.primaryLight, color: t.primary,
              fontSize: 13, fontWeight: 700, fontFamily: ff, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }
          },
            React.createElement(window.lucide.Wand2, { size: 14 }),
            'Generate AI Gallery Wall'
          )
        )
      ),

      activeTool === 'light' && React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Lighting Simulation'),
        React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: 14, border: `1px solid ${t.border}` } },
          [
            { label: 'Natural Light', val: 75 },
            { label: 'Warm Ambience', val: 55 },
            { label: 'Task Lighting', val: 40 },
          ].map((item, i) =>
            React.createElement('div', { key: i, style: { marginBottom: i < 2 ? 14 : 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                React.createElement('p', { style: { fontSize: 12, fontWeight: 600, color: t.text } }, item.label),
                React.createElement('p', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, `${item.val}%`)
              ),
              React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3 } },
                React.createElement('div', {
                  style: {
                    height: '100%', borderRadius: 3,
                    width: `${item.val}%`, background: t.gradient1,
                  }
                })
              )
            )
          )
        )
      )
    );
  }

  // ── EXPLORE SCREEN ──────────────────────────────────────────────
  function ExploreScreen() {
    const [activeStyle, setActiveStyle] = useState('All');
    const styles = ['All', 'Modern', 'Scandi', 'Boho', 'Industrial', 'Japandi'];

    const featured = [
      { name: 'Nordic Living Room', style: 'Scandi', likes: 2841, icon: '🪵', colors: ['#F5F0E8', '#8FAF8B', '#C4956A', '#4A4A4A'] },
      { name: 'Urban Loft Office', style: 'Industrial', likes: 1923, icon: '🏙️', colors: ['#3D3D4A', '#C97B5A', '#A8A8B0', '#E8E0D0'] },
    ];

    const trending = [
      { name: 'Japandi Bedroom', style: 'Japandi', saves: 890, icon: '🌿' },
      { name: 'Boho Reading Nook', style: 'Boho', saves: 654, icon: '📚' },
      { name: 'Minimalist Bath', style: 'Modern', saves: 1203, icon: '🛁' },
      { name: 'Gallery Kitchen', style: 'Modern', saves: 477, icon: '🍳' },
      { name: 'Cozy Home Office', style: 'Scandi', saves: 789, icon: '💻' },
      { name: 'Moody Dining', style: 'Industrial', saves: 567, icon: '🕯️' },
    ];

    return React.createElement('div', {
      style: {
        flex: 1, overflowY: 'auto', fontFamily: ff,
        background: t.bg, paddingBottom: 80,
      }
    },
      // Header
      React.createElement('div', { style: { padding: '60px 20px 12px' } },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Explore Styles'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub, marginBottom: 14 } }, 'Find your perfect design direction'),

        // Search bar
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.surface, borderRadius: 14, padding: '10px 14px',
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
          React.createElement('span', { style: { fontSize: 14, color: t.textMuted } }, 'Search rooms, styles, colors...')
        )
      ),

      // Style filters
      React.createElement('div', { style: { padding: '0 20px 14px' } },
        React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto' } },
          styles.map(s =>
            React.createElement('div', {
              key: s,
              onClick: () => setActiveStyle(s),
              style: {
                padding: '7px 16px', borderRadius: 20, flexShrink: 0,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: activeStyle === s ? t.primary : t.surface,
                color: activeStyle === s ? '#fff' : t.textSub,
                border: `1.5px solid ${activeStyle === s ? t.primary : t.border}`,
                transition: 'all 0.2s ease',
              }
            }, s)
          )
        )
      ),

      // Featured
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 } },
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 800, color: t.text } }, 'Featured Designs'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto' } },
          featured.map((item, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setActiveTab('design'),
              style: {
                width: 200, flexShrink: 0, background: t.surface,
                borderRadius: 18, overflow: 'hidden',
                border: `1px solid ${t.border}`, cursor: 'pointer',
                boxShadow: `0 4px 16px ${t.overlay}`,
              }
            },
              // Color palette preview
              React.createElement('div', { style: { height: 100, display: 'flex' } },
                item.colors.map((c, ci) =>
                  React.createElement('div', { key: ci, style: { flex: 1, background: c } })
                )
              ),
              React.createElement('div', {
                style: {
                  display: 'flex', gap: 2, padding: '0 10px 0',
                  marginTop: -14, position: 'relative',
                }
              },
                item.colors.map((c, ci) =>
                  React.createElement('div', {
                    key: ci,
                    style: {
                      width: 24, height: 24, borderRadius: 6,
                      background: c, border: `2px solid ${t.surface}`,
                    }
                  })
                )
              ),
              React.createElement('div', { style: { padding: '8px 10px 12px' } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('div', null,
                    React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, item.name),
                    React.createElement('span', {
                      style: {
                        fontSize: 11, fontWeight: 600, color: t.primary,
                        background: t.primaryLight, padding: '2px 8px', borderRadius: 10,
                      }
                    }, item.style)
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 } },
                    React.createElement(window.lucide.Heart, { size: 12, color: t.accent }),
                    React.createElement('span', { style: { fontSize: 11, color: t.textSub } }, item.likes.toLocaleString())
                  )
                )
              )
            )
          )
        )
      ),

      // Trending grid
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 } },
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 800, color: t.text } }, 'Trending This Week'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'View more')
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          trending.map((item, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setActiveTab('design'),
              style: {
                background: t.surface, borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${t.border}`, cursor: 'pointer',
              }
            },
              React.createElement('div', {
                style: {
                  height: 80, background: t.surface2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                }
              }, item.icon),
              React.createElement('div', { style: { padding: '10px' } },
                React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 4 } }, item.name),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('span', {
                    style: {
                      fontSize: 10, fontWeight: 600, color: t.primary,
                      background: t.primaryLight, padding: '2px 7px', borderRadius: 8,
                    }
                  }, item.style),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 2 } },
                    React.createElement(window.lucide.Bookmark, { size: 10, color: t.textMuted }),
                    React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, item.saves)
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  // ── PROFILE SCREEN ──────────────────────────────────────────────
  function ProfileScreen() {
    const [notifications, setNotifications] = useState(true);
    const [arMode, setArMode] = useState(true);
    const [autoSave, setAutoSave] = useState(false);

    const Toggle = ({ value, onChange }) => React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
        background: value ? t.primary : t.border,
        position: 'relative', transition: 'background 0.25s ease',
        flexShrink: 0,
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 3,
          left: value ? 21 : 3,
          width: 20, height: 20, borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          transition: 'left 0.25s ease',
        }
      })
    );

    const menuItems = [
      { icon: window.lucide.Crown, label: 'RoomLens Pro', sub: 'Upgrade for unlimited scans', action: true, color: t.accentOrange },
      { icon: window.lucide.FolderOpen, label: 'My Projects', sub: '12 active projects' },
      { icon: window.lucide.Bookmark, label: 'Saved Designs', sub: '47 saved items' },
      { icon: window.lucide.Share2, label: 'Shared Boards', sub: '3 collaboration boards' },
      { icon: window.lucide.Ruler, label: 'Room Measurements', sub: 'Saved dimensions for 5 rooms' },
      { icon: window.lucide.HelpCircle, label: 'Help & Support', sub: 'FAQ, tutorials, contact' },
    ];

    return React.createElement('div', {
      style: {
        flex: 1, overflowY: 'auto', fontFamily: ff,
        background: t.bg, paddingBottom: 80,
      }
    },
      // Header / Profile card
      React.createElement('div', {
        style: {
          padding: '60px 20px 20px',
          background: t.surface,
          borderBottom: `1px solid ${t.border}`,
          marginBottom: 16,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 } },
          React.createElement('div', {
            style: {
              width: 62, height: 62, borderRadius: 20,
              background: t.gradient1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, boxShadow: `0 6px 20px ${t.shadow}`,
            }
          }, '👤'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h2', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, 'Alex Rivera'),
            React.createElement('p', { style: { fontSize: 13, color: t.textSub } }, 'alex.rivera@email.com'),
            React.createElement('div', {
              style: {
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: t.accentOrange + '20', borderRadius: 10, padding: '3px 8px', marginTop: 4,
              }
            },
              React.createElement('span', { style: { fontSize: 10, color: t.accentOrange, fontWeight: 700 } }, '⭐ Free Plan')
            )
          ),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: t.surface2, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            React.createElement(window.lucide.Settings, { size: 16, color: t.textSub })
          )
        ),

        // Stats row
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 } },
          [
            { label: 'Designs', value: '47' },
            { label: 'Projects', value: '12' },
            { label: 'Saves', value: '89' },
          ].map((s, i) =>
            React.createElement('div', {
              key: i,
              style: {
                textAlign: 'center', padding: '10px 0',
                borderRight: i < 2 ? `1px solid ${t.border}` : 'none',
              }
            },
              React.createElement('p', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, s.value),
              React.createElement('p', { style: { fontSize: 11, color: t.textSub } }, s.label)
            )
          )
        )
      ),

      // Theme toggle
      React.createElement('div', { style: { padding: '0 20px 12px' } },
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 16, padding: '14px',
            border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 38, height: 38, borderRadius: 11,
              background: isDark ? '#1E1E40' : '#FFF8E6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            isDark
              ? React.createElement(window.lucide.Moon, { size: 18, color: '#7C8DF5' })
              : React.createElement(window.lucide.Sun, { size: 18, color: '#FF9F43' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, isDark ? 'Dark Mode' : 'Light Mode'),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub } }, 'Toggle app appearance')
          ),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 56, height: 30, borderRadius: 15, cursor: 'pointer',
              background: isDark ? t.primary : t.border,
              position: 'relative', transition: 'background 0.25s ease',
              flexShrink: 0,
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3,
                left: isDark ? 28 : 3,
                width: 24, height: 24, borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                transition: 'left 0.25s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12,
              }
            }, isDark ? '🌙' : '☀️')
          )
        )
      ),

      // Settings toggles
      React.createElement('div', { style: { padding: '0 20px 12px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Preferences'),
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 16,
            border: `1px solid ${t.border}`, overflow: 'hidden',
          }
        },
          [
            { label: 'Push Notifications', sub: 'Design tips and reminders', val: notifications, set: setNotifications },
            { label: 'AR Mode', sub: 'Use camera for live preview', val: arMode, set: setArMode },
            { label: 'Auto-save Designs', sub: 'Save changes automatically', val: autoSave, set: setAutoSave },
          ].map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
                borderTop: i > 0 ? `1px solid ${t.border}` : 'none',
              }
            },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, item.label),
                React.createElement('p', { style: { fontSize: 11, color: t.textSub } }, item.sub)
              ),
              React.createElement(Toggle, { value: item.val, onChange: item.set })
            )
          )
        )
      ),

      // Menu items
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Account'),
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 16,
            border: `1px solid ${t.border}`, overflow: 'hidden',
          }
        },
          menuItems.map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
                borderTop: i > 0 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10,
                  background: item.color ? item.color + '20' : t.surface2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(item.icon, { size: 16, color: item.color || t.textSub })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: item.action ? item.color : t.text } }, item.label),
                React.createElement('p', { style: { fontSize: 11, color: t.textSub } }, item.sub)
              ),
              React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
            )
          )
        )
      ),

      React.createElement('div', { style: { padding: '16px 20px 0', textAlign: 'center' } },
        React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, 'RoomLens v2.1.0 · Made with ❤️')
      )
    );
  }

  // ── SCREENS MAP ──────────────────────────────────────────────
  const screens = {
    home: HomeScreen,
    scan: ScanScreen,
    design: DesignScreen,
    explore: ExploreScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  // ── RENDER ──────────────────────────────────────────────────
  return React.createElement('div', null,
    fontStyle,
    React.createElement('div', {
      style: {
        minHeight: '100vh', background: '#E0DFF5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }
    },
      // Phone frame
      React.createElement('div', {
        style: {
          width: 375, height: 812,
          borderRadius: 50, overflow: 'hidden',
          position: 'relative', display: 'flex', flexDirection: 'column',
          background: t.bg,
          boxShadow: `0 40px 100px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(255,255,255,0.12)`,
        }
      },
        // Dynamic Island
        React.createElement('div', {
          style: {
            position: 'absolute', top: 12, left: '50%',
            transform: 'translateX(-50%)',
            width: 120, height: 34, borderRadius: 20,
            background: '#000',
            zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'space-around',
            padding: '0 16px',
          }
        },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' } }),
          React.createElement('div', { style: { width: 20, height: 20, borderRadius: '50%', background: '#1a1a1a' } }),
        ),

        // Status bar
        React.createElement(StatusBar),

        // Main content area
        React.createElement('div', {
          style: {
            flex: 1, display: 'flex', flexDirection: 'column',
            overflow: 'hidden', paddingTop: 44,
          }
        },
          React.createElement(ActiveScreen)
        ),

        // Bottom navigation
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 80,
            background: t.navBg,
            borderTop: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center',
            paddingBottom: 16,
            boxShadow: `0 -8px 32px ${t.overlay}`,
            backdropFilter: 'blur(12px)',
          }
        },
          tabs.map(tab =>
            React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: {
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 4, cursor: 'pointer',
                paddingTop: 8,
              }
            },
              tab.id === 'scan'
                ? React.createElement('div', {
                    style: {
                      width: 44, height: 44, borderRadius: 15,
                      background: activeTab === 'scan' ? t.gradient1 : t.surface2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: activeTab === 'scan' ? `0 4px 16px ${t.shadow}` : 'none',
                      transition: 'all 0.2s ease',
                      marginTop: -8,
                    }
                  },
                    React.createElement(tab.icon, { size: 20, color: activeTab === 'scan' ? '#fff' : t.textSub })
                  )
                : React.createElement('div', {
                    style: {
                      width: 36, height: 28, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: activeTab === tab.id ? t.primaryLight : 'transparent',
                      transition: 'all 0.2s ease',
                    }
                  },
                    React.createElement(tab.icon, {
                      size: 20,
                      color: activeTab === tab.id ? t.primary : t.textMuted,
                    })
                  ),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: 600,
                  color: activeTab === tab.id ? t.primary : t.textMuted,
                  fontFamily: ff,
                }
              }, tab.label)
            )
          )
        )
      )
    )
  );
}
