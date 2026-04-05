const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [veridianEnergy, setVeridianEnergy] = useState(1247);
  const [streak, setStreak] = useState(12);
  const [loggedActions, setLoggedActions] = useState([
    { id: 1, name: 'Bike to work', points: 25, time: '8:15 AM', icon: 'Bike' },
    { id: 2, name: 'Reusable bag', points: 10, time: '12:30 PM', icon: 'ShoppingBag' },
    { id: 3, name: 'Composted waste', points: 20, time: '6:45 PM', icon: 'Leaf' },
  ]);
  const [discoveredSpecies, setDiscoveredSpecies] = useState(14);
  const [communityLevel, setCommunityLevel] = useState(7);
  const [animateLog, setAnimateLog] = useState(false);
  const [selectedCodexItem, setSelectedCodexItem] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);

  const themes = {
    light: {
      primary: '#0891B2',
      secondary: '#22D3EE',
      cta: '#22C55E',
      background: '#ECFEFF',
      surface: '#FFFFFF',
      surfaceAlt: '#F0FDFA',
      card: '#FFFFFF',
      text: '#0C4A6E',
      textSecondary: '#64748B',
      textMuted: '#94A3B8',
      border: '#E0F2FE',
      borderAlt: '#CFFAFE',
      tabBar: '#FFFFFF',
      tabInactive: '#94A3B8',
      overlay: 'rgba(12, 74, 110, 0.5)',
      shadow: 'rgba(8, 145, 178, 0.08)',
      shadowStrong: 'rgba(8, 145, 178, 0.15)',
      gradient1: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
      gradient2: 'linear-gradient(135deg, #22C55E 0%, #86EFAC 100%)',
      gradient3: 'linear-gradient(135deg, #0891B2 0%, #22C55E 100%)',
    },
    dark: {
      primary: '#22D3EE',
      secondary: '#0891B2',
      cta: '#22C55E',
      background: '#0C1B2A',
      surface: '#132337',
      surfaceAlt: '#1A2D42',
      card: '#162B3F',
      text: '#E0F2FE',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#1E3A5F',
      borderAlt: '#1A3050',
      tabBar: '#132337',
      tabInactive: '#64748B',
      overlay: 'rgba(0, 0, 0, 0.6)',
      shadow: 'rgba(0, 0, 0, 0.2)',
      shadowStrong: 'rgba(0, 0, 0, 0.35)',
      gradient1: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
      gradient2: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
      gradient3: 'linear-gradient(135deg, #0891B2 0%, #22C55E 100%)',
    },
  };

  const t = darkMode ? themes.dark : themes.light;

  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const iconFn = window.lucide && window.lucide[name];
    if (!iconFn) return null;
    const svgStr = iconFn.toString ? null : null;
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current && window.lucide) {
        const iconData = window.lucide[name];
        if (iconData) {
          const [tag, attrs, children] = iconData;
          let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
          if (children) {
            children.forEach(([childTag, childAttrs]) => {
              let attrStr = Object.entries(childAttrs || {}).map(([k, v]) => `${k}="${v}"`).join(' ');
              svg += `<${childTag} ${attrStr}/>`;
            });
          }
          svg += '</svg>';
          ref.current.innerHTML = svg;
        }
      }
    }, [name, size, color]);
    return React.createElement('span', { ref, style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, ...style } });
  };

  const LucideIcon = ({ name, size = 20, color = t.text, strokeWidth = 2 }) => {
    const ref = useRef(null);
    useEffect(() => {
      if (!ref.current) return;
      const iconPaths = {
        Home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        Globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
        Target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        Trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
        Book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/>',
        Leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
        Bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
        ShoppingBag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
        Droplets: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 14.69c1.56 0 2.82-1.3 2.82-2.87 0-.82-.4-1.6-1.21-2.26-.78-.65-1.42-1.42-1.61-2.26-.19 1.02-.81 2.01-1.62 2.66-.8.66-1.2 1.44-1.2 2.26 0 1.57 1.26 2.87 2.82 2.87z"/><path d="M17.5 12.35c.94 0 1.7-.78 1.7-1.73 0-.5-.24-.96-.73-1.36-.47-.39-.85-.86-.97-1.36-.12.61-.49 1.21-.98 1.6-.48.4-.72.86-.72 1.36 0 .95.76 1.73 1.7 1.73z"/>',
        Zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
        Moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
        Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
        ChevronRight: '<path d="m9 18 6-6-6-6"/>',
        ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
        Award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
        TrendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
        Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        MapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        Check: '<path d="M20 6 9 17l-5-5"/>',
        X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
        TreePine: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14l-3-3.3a1 1 0 0 1 .7-1.7h3.6L7 7.7A1 1 0 0 1 7.7 6h8.6a1 1 0 0 1 .7 1.7L15.6 9h3.7a1 1 0 0 1 .7 1.7L17 14Z"/><path d="M12 22v-3"/>',
        Fish: '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C4.72 10.42 2.73 9.26 2 8c.74 1.87 1.67 3.33 3 4.67L2 16c1.5-1.33 3.5-2.67 5-3.33"/>',
        Bird: '<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/>',
        Flower2: '<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',
        Sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
        Recycle: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>',
        Settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
        Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        Sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
        Mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
        Waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
        Lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        CircleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
      };
      const pathData = iconPaths[name] || '';
      ref.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${pathData}</svg>`;
    }, [name, size, color, strokeWidth]);
    return React.createElement('span', {
      ref,
      style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, flexShrink: 0 }
    });
  };

  // Style tag for animations
  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
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
      50% { transform: translateY(-6px); }
    }
    @keyframes growIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes ripple {
      0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.3); }
      100% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-15px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `);

  // ============ HOME SCREEN ============
  const HomeScreen = () => {
    const progressPercent = (veridianEnergy % 500) / 500 * 100;
    const level = Math.floor(veridianEnergy / 500) + 1;

    const quickActions = [
      { id: 'bike', label: 'Bike Ride', icon: 'Bike', points: 25, color: '#0891B2' },
      { id: 'bag', label: 'Reusable Bag', icon: 'ShoppingBag', points: 10, color: '#22C55E' },
      { id: 'compost', label: 'Compost', icon: 'Sprout', points: 20, color: '#F59E0B' },
      { id: 'water', label: 'Save Water', icon: 'Droplets', points: 15, color: '#3B82F6' },
    ];

    const handleQuickLog = (action) => {
      setVeridianEnergy(prev => prev + action.points);
      setAnimateLog(true);
      setLoggedActions(prev => [{
        id: Date.now(), name: action.label, points: action.points,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        icon: action.icon
      }, ...prev]);
      setTimeout(() => setAnimateLog(false), 600);
    };

    return React.createElement('div', {
      style: { padding: '0 20px 20px', animation: 'fadeIn 0.3s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 12px' }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 15, fontWeight: 500, color: t.textSecondary, fontFamily: font }
          }, 'Good afternoon'),
          React.createElement('div', {
            style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.5px' }
          }, 'Your Bloom')
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s ease'
          }
        }, React.createElement(LucideIcon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.text }))
      ),

      // Veridian Energy Card
      React.createElement('div', {
        style: {
          background: t.gradient3, borderRadius: 20, padding: '24px',
          marginBottom: 20, position: 'relative', overflow: 'hidden',
          boxShadow: `0 8px 32px ${t.shadowStrong}`
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -20, left: -20, width: 80, height: 80,
            borderRadius: '50%', background: 'rgba(255,255,255,0.08)'
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative' }
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', fontFamily: font, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }
            }, 'Veridian Energy'),
            React.createElement('div', {
              style: {
                fontSize: 40, fontWeight: 800, color: '#fff', fontFamily: font, letterSpacing: '-1px',
                animation: animateLog ? 'pulse 0.4s ease' : 'none'
              }
            }, veridianEnergy.toLocaleString())
          ),
          React.createElement('div', {
            style: {
              background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 14px',
              display: 'flex', alignItems: 'center', gap: 6
            }
          },
            React.createElement(LucideIcon, { name: 'Flame', size: 16, color: '#FCD34D' }),
            React.createElement('span', {
              style: { fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: font }
            }, `${streak} day streak`)
          )
        ),
        // Progress bar
        React.createElement('div', {
          style: { marginBottom: 8 }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }
          },
            React.createElement('span', {
              style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font }
            }, `Level ${level}`),
            React.createElement('span', {
              style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font }
            }, `${500 - (veridianEnergy % 500)} to next level`)
          ),
          React.createElement('div', {
            style: { height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                height: '100%', borderRadius: 3, background: '#FCD34D',
                width: `${progressPercent}%`, transition: 'width 0.5s ease'
              }
            })
          )
        )
      ),

      // Quick Log Actions
      React.createElement('div', {
        style: { marginBottom: 20 }
      },
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 12 }
        }, 'Quick Log'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }
        },
          ...quickActions.map((action, i) =>
            React.createElement('button', {
              key: action.id,
              onClick: () => handleQuickLog(action),
              style: {
                background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16,
                padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 8, cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: `0 2px 8px ${t.shadow}`, animation: `fadeIn 0.3s ease ${i * 0.05}s both`
              },
              onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.95)'; },
              onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; }
            },
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 12,
                  background: action.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }
              }, React.createElement(LucideIcon, { name: action.icon, size: 20, color: action.color })),
              React.createElement('span', {
                style: { fontSize: 12, fontWeight: 500, color: t.textSecondary, fontFamily: font, textAlign: 'center' }
              }, action.label),
              React.createElement('span', {
                style: { fontSize: 11, fontWeight: 600, color: t.cta, fontFamily: font }
              }, `+${action.points}`)
            )
          )
        )
      ),

      // Today's Activity
      React.createElement('div', null,
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('span', {
            style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font }
          }, "Today's Activity"),
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: 500, color: t.primary, fontFamily: font, cursor: 'pointer' }
          }, 'See all')
        ),
        ...loggedActions.slice(0, 4).map((action, i) =>
          React.createElement('div', {
            key: action.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: t.card, borderRadius: 14, marginBottom: 8,
              boxShadow: `0 1px 4px ${t.shadow}`, border: `1px solid ${t.border}`,
              animation: `slideIn 0.3s ease ${i * 0.06}s both`, transition: 'all 0.15s ease'
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: `${t.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(LucideIcon, { name: action.icon, size: 18, color: t.primary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font }
              }, action.name),
              React.createElement('div', {
                style: { fontSize: 13, color: t.textMuted, fontFamily: font }
              }, action.time)
            ),
            React.createElement('div', {
              style: {
                fontSize: 15, fontWeight: 700, color: t.cta, fontFamily: font,
                background: `${t.cta}12`, padding: '4px 10px', borderRadius: 8
              }
            }, `+${action.points}`)
          )
        )
      )
    );
  };

  // ============ ECO SPHERE SCREEN ============
  const EcoSphereScreen = () => {
    const [selectedBiome, setSelectedBiome] = useState(null);

    const biomes = [
      { id: 'forest', name: 'Verdant Forest', progress: 78, icon: 'TreePine', color: '#22C55E', species: 12, description: 'A thriving digital forest fueled by your community\'s composting and tree-planting efforts. 3 rare fern species discovered this week.' },
      { id: 'river', name: 'Crystal River', progress: 52, icon: 'Waves', color: '#3B82F6', species: 8, description: 'The river clarity improves as water conservation acts increase. Spotted: Digital Trout species emerging near the falls.' },
      { id: 'meadow', name: 'Bloom Meadow', progress: 91, icon: 'Flower2', color: '#EC4899', species: 15, description: 'Nearly fully bloomed! Wildflower diversity peaked after the weekend cycling challenge. 2 butterflies unlocked.' },
      { id: 'mountain', name: 'Summit Ridge', progress: 35, icon: 'Mountain', color: '#8B5CF6', species: 4, description: 'Early stages of growth. Needs more energy-saving actions to unlock the alpine ecosystem. Next milestone: Snow Leopard habitat.' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 20px', animation: 'fadeIn 0.3s ease' }
    },
      React.createElement('div', {
        style: { padding: '16px 0 8px' }
      },
        React.createElement('div', {
          style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.5px' }
        }, 'Eco Sphere'),
        React.createElement('div', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginTop: 4 }
        }, 'Your community\'s digital world')
      ),

      // Community Stats Banner
      React.createElement('div', {
        style: {
          background: t.gradient1, borderRadius: 18, padding: '20px',
          marginBottom: 20, marginTop: 8, display: 'flex', justifyContent: 'space-around',
          boxShadow: `0 6px 24px ${t.shadowStrong}`
        }
      },
        ...[
          { label: 'Community Level', value: communityLevel, icon: 'Award' },
          { label: 'Active Members', value: '2.4k', icon: 'Users' },
          { label: 'Species Found', value: discoveredSpecies, icon: 'Sparkles' },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: { textAlign: 'center' }
          },
            React.createElement(LucideIcon, { name: stat.icon, size: 18, color: '#FCD34D' }),
            React.createElement('div', {
              style: { fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font, marginTop: 4 }
            }, stat.value),
            React.createElement('div', {
              style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: font, marginTop: 2 }
            }, stat.label)
          )
        )
      ),

      // Biomes
      React.createElement('div', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 12 }
      }, 'Active Biomes'),

      ...biomes.map((biome, i) =>
        React.createElement('div', {
          key: biome.id,
          onClick: () => setSelectedBiome(selectedBiome === biome.id ? null : biome.id),
          style: {
            background: t.card, borderRadius: 16, padding: '18px',
            marginBottom: 10, cursor: 'pointer', border: `1.5px solid ${selectedBiome === biome.id ? biome.color : t.border}`,
            boxShadow: `0 2px 10px ${t.shadow}`, transition: 'all 0.25s ease',
            animation: `slideUp 0.3s ease ${i * 0.07}s both`
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: selectedBiome === biome.id ? 14 : 0 }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: biome.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: selectedBiome === biome.id ? 'float 2s ease infinite' : 'none'
              }
            }, React.createElement(LucideIcon, { name: biome.icon, size: 24, color: biome.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
              },
                React.createElement('span', {
                  style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font }
                }, biome.name),
                React.createElement('span', {
                  style: { fontSize: 13, fontWeight: 600, color: biome.color, fontFamily: font }
                }, `${biome.progress}%`)
              ),
              React.createElement('div', {
                style: { height: 5, borderRadius: 3, background: t.border, marginTop: 8, overflow: 'hidden' }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', borderRadius: 3, background: biome.color,
                    width: `${biome.progress}%`, transition: 'width 0.8s ease'
                  }
                })
              ),
              React.createElement('div', {
                style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }
              },
                React.createElement(LucideIcon, { name: 'Sparkles', size: 12, color: t.textMuted }),
                `${biome.species} species discovered`
              )
            )
          ),
          selectedBiome === biome.id ? React.createElement('div', {
            style: {
              fontSize: 14, lineHeight: 1.6, color: t.textSecondary, fontFamily: font,
              padding: '12px 14px', background: t.surfaceAlt, borderRadius: 12,
              animation: 'fadeIn 0.2s ease', borderLeft: `3px solid ${biome.color}`
            }
          }, biome.description) : null
        )
      )
    );
  };

  // ============ CHALLENGES SCREEN ============
  const ChallengesScreen = () => {
    const [activeTab, setActiveTab] = useState('daily');

    const challenges = {
      daily: [
        { id: 1, name: 'Meatless Monday', desc: 'Skip meat for all meals today', points: 30, progress: 1, total: 3, icon: 'Leaf', color: '#22C55E', enrolled: true },
        { id: 2, name: 'Walk & Talk', desc: 'Walk for 20 minutes instead of driving', points: 25, progress: 0, total: 1, icon: 'MapPin', color: '#0891B2', enrolled: false },
        { id: 3, name: 'Light Out', desc: 'Turn off all lights for 1 hour', points: 15, progress: 0, total: 1, icon: 'Zap', color: '#F59E0B', enrolled: false },
      ],
      weekly: [
        { id: 4, name: 'Plastic-Free Patrol', desc: 'Avoid single-use plastic for 7 days', points: 100, progress: 4, total: 7, icon: 'Recycle', color: '#8B5CF6', enrolled: true },
        { id: 5, name: 'Green Commuter', desc: 'Use public transit or bike 5 times this week', points: 80, progress: 3, total: 5, icon: 'Bike', color: '#0891B2', enrolled: true },
        { id: 6, name: 'Local Harvest', desc: 'Buy from local farmers 3 times', points: 60, progress: 1, total: 3, icon: 'Sprout', color: '#22C55E', enrolled: false },
      ],
    };

    const leaderboard = [
      { rank: 1, name: 'Green Valley Team', points: 12840, avatar: '🌿', trend: 'up' },
      { rank: 2, name: 'EcoWarriors SF', points: 11250, avatar: '🌊', trend: 'up' },
      { rank: 3, name: 'Your Neighborhood', points: 9870, avatar: '🌸', trend: 'same', isYou: true },
      { rank: 4, name: 'Sunrise District', points: 8920, avatar: '☀️', trend: 'down' },
      { rank: 5, name: 'Riverside Crew', points: 7650, avatar: '🏞️', trend: 'up' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 20px', animation: 'fadeIn 0.3s ease' }
    },
      React.createElement('div', {
        style: { padding: '16px 0 8px' }
      },
        React.createElement('div', {
          style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.5px' }
        }, 'Challenges'),
        React.createElement('div', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginTop: 4 }
        }, 'Earn bonus Veridian Energy')
      ),

      // Tab switcher
      React.createElement('div', {
        style: {
          display: 'flex', background: t.surfaceAlt, borderRadius: 12, padding: 4,
          marginBottom: 20, marginTop: 8
        }
      },
        ...['daily', 'weekly', 'leaderboard'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              background: activeTab === tab ? t.card : 'transparent',
              color: activeTab === tab ? t.primary : t.textMuted,
              fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer',
              boxShadow: activeTab === tab ? `0 2px 8px ${t.shadow}` : 'none',
              transition: 'all 0.2s ease', textTransform: 'capitalize'
            }
          }, tab)
        )
      ),

      // Challenge cards
      activeTab !== 'leaderboard' ? React.createElement('div', null,
        ...challenges[activeTab].map((challenge, i) =>
          React.createElement('div', {
            key: challenge.id,
            style: {
              background: t.card, borderRadius: 16, padding: '18px',
              marginBottom: 10, border: `1.5px solid ${challenge.enrolled ? challenge.color + '40' : t.border}`,
              boxShadow: `0 2px 10px ${t.shadow}`,
              animation: `slideUp 0.3s ease ${i * 0.06}s both`, transition: 'all 0.2s ease'
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'flex-start', gap: 14 }
            },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: challenge.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }
              }, React.createElement(LucideIcon, { name: challenge.icon, size: 22, color: challenge.color })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }
                },
                  React.createElement('span', {
                    style: { fontSize: 16, fontWeight: 600, color: t.text, fontFamily: font }
                  }, challenge.name),
                  React.createElement('span', {
                    style: {
                      fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: font,
                      background: t.cta, padding: '3px 10px', borderRadius: 20
                    }
                  }, `+${challenge.points}`)
                ),
                React.createElement('div', {
                  style: { fontSize: 14, color: t.textSecondary, fontFamily: font, marginBottom: 10 }
                }, challenge.desc),
                challenge.enrolled ? React.createElement('div', null,
                  React.createElement('div', {
                    style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }
                  },
                    React.createElement('span', {
                      style: { fontSize: 12, color: t.textMuted, fontFamily: font }
                    }, `${challenge.progress}/${challenge.total} completed`),
                    React.createElement('span', {
                      style: { fontSize: 12, fontWeight: 600, color: challenge.color, fontFamily: font }
                    }, `${Math.round(challenge.progress / challenge.total * 100)}%`)
                  ),
                  React.createElement('div', {
                    style: { height: 5, borderRadius: 3, background: t.border, overflow: 'hidden' }
                  },
                    React.createElement('div', {
                      style: {
                        height: '100%', borderRadius: 3, background: challenge.color,
                        width: `${(challenge.progress / challenge.total) * 100}%`, transition: 'width 0.5s ease'
                      }
                    })
                  )
                ) : React.createElement('button', {
                  style: {
                    background: 'transparent', border: `1.5px solid ${challenge.color}`,
                    color: challenge.color, borderRadius: 10, padding: '8px 20px',
                    fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  },
                  onMouseDown: (e) => {
                    e.currentTarget.style.background = challenge.color;
                    e.currentTarget.style.color = '#fff';
                  },
                  onMouseUp: (e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = challenge.color;
                  }
                }, 'Join Challenge')
              )
            )
          )
        )
      ) :
      // Leaderboard
      React.createElement('div', null,
        ...leaderboard.map((entry, i) =>
          React.createElement('div', {
            key: entry.rank,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: entry.isYou ? `${t.primary}10` : t.card,
              borderRadius: 14, marginBottom: 8,
              border: entry.isYou ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
              boxShadow: `0 2px 8px ${t.shadow}`,
              animation: `slideIn 0.3s ease ${i * 0.06}s both`
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 10, fontFamily: font,
                background: entry.rank <= 3 ? ['#FCD34D', '#C0C0C0', '#CD7F32'][entry.rank - 1] + '25' : t.surfaceAlt,
                color: entry.rank <= 3 ? ['#B8860B', '#6B7280', '#92400E'][entry.rank - 1] : t.textMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 700
              }
            }, entry.rank),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font,
                  display: 'flex', alignItems: 'center', gap: 6
                }
              }, entry.name, entry.isYou ? React.createElement('span', {
                style: { fontSize: 11, fontWeight: 600, color: t.primary, background: `${t.primary}15`, padding: '2px 8px', borderRadius: 6 }
              }, 'YOU') : null),
              React.createElement('div', {
                style: { fontSize: 13, color: t.textMuted, fontFamily: font }
              }, `${entry.points.toLocaleString()} VE`)
            ),
            React.createElement(LucideIcon, {
              name: entry.trend === 'up' ? 'TrendingUp' : entry.trend === 'down' ? 'ChevronRight' : 'Check',
              size: 18, color: entry.trend === 'up' ? t.cta : entry.trend === 'down' ? '#EF4444' : t.textMuted
            })
          )
        )
      )
    );
  };

  // ============ CODEX SCREEN ============
  const CodexScreen = () => {
    const species = [
      { id: 1, name: 'Emerald Fern', type: 'Flora', biome: 'Verdant Forest', rarity: 'Common', unlocked: true, icon: 'Leaf', color: '#22C55E', fact: 'Ferns are one of the oldest plant groups, with fossils dating back 360 million years. They thrive in moist environments and produce spores instead of seeds.' },
      { id: 2, name: 'Crystal Trout', type: 'Fauna', biome: 'Crystal River', rarity: 'Uncommon', unlocked: true, icon: 'Fish', color: '#3B82F6', fact: 'Trout are indicators of clean water. They require high oxygen levels and cool temperatures, making them sensitive to pollution and warming.' },
      { id: 3, name: 'Bloom Butterfly', type: 'Fauna', biome: 'Bloom Meadow', rarity: 'Rare', unlocked: true, icon: 'Bird', color: '#EC4899', fact: 'Butterflies taste with their feet and can see ultraviolet light. Some species migrate thousands of miles, using the Earth\'s magnetic field for navigation.' },
      { id: 4, name: 'Solar Orchid', type: 'Flora', biome: 'Bloom Meadow', rarity: 'Epic', unlocked: true, icon: 'Flower2', color: '#F59E0B', fact: 'Orchids are the largest family of flowering plants, with over 28,000 species. They form symbiotic relationships with fungi to obtain nutrients.' },
      { id: 5, name: 'Pine Guardian', type: 'Flora', biome: 'Summit Ridge', rarity: 'Legendary', unlocked: false, icon: 'TreePine', color: '#8B5CF6', fact: 'Unlock by reaching 50% on Summit Ridge biome.' },
      { id: 6, name: 'Mist Fox', type: 'Fauna', biome: 'Verdant Forest', rarity: 'Epic', unlocked: false, icon: 'Sparkles', color: '#6366F1', fact: 'Unlock by discovering 20 species total.' },
    ];

    const rarityColors = {
      Common: '#6B7280',
      Uncommon: '#22C55E',
      Rare: '#3B82F6',
      Epic: '#F59E0B',
      Legendary: '#8B5CF6',
    };

    return React.createElement('div', {
      style: { padding: '0 20px 20px', animation: 'fadeIn 0.3s ease' }
    },
      React.createElement('div', {
        style: { padding: '16px 0 8px' }
      },
        React.createElement('div', {
          style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.5px' }
        }, 'Discovery Codex'),
        React.createElement('div', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginTop: 4 }
        }, `${discoveredSpecies} of 42 species discovered`)
      ),

      // Progress overview
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: '18px', marginTop: 8, marginBottom: 20,
          border: `1px solid ${t.border}`, boxShadow: `0 2px 10px ${t.shadow}`
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 }
        },
          React.createElement('span', {
            style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font }
          }, 'Collection Progress'),
          React.createElement('span', {
            style: { fontSize: 15, fontWeight: 700, color: t.primary, fontFamily: font }
          }, `${Math.round((discoveredSpecies / 42) * 100)}%`)
        ),
        React.createElement('div', {
          style: { height: 8, borderRadius: 4, background: t.border, overflow: 'hidden', marginBottom: 14 }
        },
          React.createElement('div', {
            style: {
              height: '100%', borderRadius: 4,
              background: t.gradient3, width: `${(discoveredSpecies / 42) * 100}%`,
              transition: 'width 0.8s ease'
            }
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-around' }
        },
          ...Object.entries(rarityColors).map(([rarity, color]) => {
            const count = species.filter(s => s.rarity === rarity && s.unlocked).length;
            const total = species.filter(s => s.rarity === rarity).length;
            return React.createElement('div', {
              key: rarity,
              style: { textAlign: 'center' }
            },
              React.createElement('div', {
                style: { width: 8, height: 8, borderRadius: 4, background: color, margin: '0 auto 4px' }
              }),
              React.createElement('div', {
                style: { fontSize: 11, color: t.textMuted, fontFamily: font }
              }, rarity),
              React.createElement('div', {
                style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
              }, `${count}/${total}`)
            );
          })
        )
      ),

      // Species Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
      },
        ...species.map((sp, i) =>
          React.createElement('div', {
            key: sp.id,
            onClick: () => sp.unlocked && setSelectedCodexItem(selectedCodexItem === sp.id ? null : sp.id),
            style: {
              background: t.card, borderRadius: 16, padding: '16px',
              border: `1.5px solid ${selectedCodexItem === sp.id ? sp.color : t.border}`,
              boxShadow: `0 2px 8px ${t.shadow}`, cursor: sp.unlocked ? 'pointer' : 'default',
              opacity: sp.unlocked ? 1 : 0.6, position: 'relative', overflow: 'hidden',
              animation: `growIn 0.3s ease ${i * 0.06}s both`, transition: 'all 0.2s ease'
            }
          },
            !sp.unlocked ? React.createElement('div', {
              style: {
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: t.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 14, zIndex: 1
              }
            }, React.createElement(LucideIcon, { name: 'Lock', size: 24, color: '#fff' })) : null,
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: sp.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px', animation: sp.unlocked ? 'float 3s ease infinite' : 'none',
                animationDelay: `${i * 0.3}s`
              }
            }, React.createElement(LucideIcon, { name: sp.icon, size: 24, color: sp.color })),
            React.createElement('div', {
              style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font, textAlign: 'center', marginBottom: 4 }
            }, sp.name),
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center' }
            },
              React.createElement('span', {
                style: {
                  fontSize: 11, fontWeight: 600, color: rarityColors[sp.rarity], fontFamily: font,
                  background: rarityColors[sp.rarity] + '15', padding: '2px 8px', borderRadius: 6
                }
              }, sp.rarity)
            ),
            React.createElement('div', {
              style: { fontSize: 11, color: t.textMuted, fontFamily: font, textAlign: 'center', marginTop: 4 }
            }, sp.biome),
            selectedCodexItem === sp.id && sp.unlocked ? React.createElement('div', {
              style: {
                fontSize: 12, lineHeight: 1.5, color: t.textSecondary, fontFamily: font,
                marginTop: 10, padding: '10px', background: t.surfaceAlt, borderRadius: 10,
                animation: 'fadeIn 0.2s ease'
              }
            }, sp.fact) : null
          )
        )
      )
    );
  };

  // ============ PROFILE SCREEN ============
  const ProfileScreen = () => {
    const stats = [
      { label: 'Total Actions', value: '347', icon: 'Check' },
      { label: 'CO₂ Saved', value: '128kg', icon: 'Leaf' },
      { label: 'Best Streak', value: '24 days', icon: 'Flame' },
      { label: 'Rank', value: '#42', icon: 'Trophy' },
    ];

    const badges = [
      { name: 'First Bloom', desc: 'Log your first action', icon: 'Sprout', color: '#22C55E', earned: true },
      { name: 'Week Warrior', desc: '7-day streak', icon: 'Flame', color: '#F59E0B', earned: true },
      { name: 'Eco Explorer', desc: 'Discover 10 species', icon: 'Sparkles', color: '#8B5CF6', earned: true },
      { name: 'Community Hero', desc: 'Join 5 challenges', icon: 'Award', color: '#0891B2', earned: true },
      { name: 'Carbon Crusher', desc: 'Save 500kg CO₂', icon: 'Zap', color: '#EC4899', earned: false },
      { name: 'Legendary Bloom', desc: 'Reach level 20', icon: 'Star', color: '#F59E0B', earned: false },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 20px', animation: 'fadeIn 0.3s ease' }
    },
      // Profile header
      React.createElement('div', {
        style: {
          textAlign: 'center', padding: '24px 0 20px', position: 'relative'
        }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 24,
            background: t.gradient3, margin: '0 auto 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 20px ${t.shadowStrong}`,
            animation: 'float 3s ease infinite'
          }
        }, React.createElement(LucideIcon, { name: 'Leaf', size: 36, color: '#fff' })),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px' }
        }, 'Alex Green'),
        React.createElement('div', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
        },
          React.createElement(LucideIcon, { name: 'MapPin', size: 14, color: t.textSecondary }),
          'San Francisco, CA'
        ),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10,
            background: `${t.cta}15`, padding: '6px 16px', borderRadius: 20
          }
        },
          React.createElement(LucideIcon, { name: 'Award', size: 14, color: t.cta }),
          React.createElement('span', {
            style: { fontSize: 14, fontWeight: 600, color: t.cta, fontFamily: font }
          }, 'Level 3 Cultivator')
        ),
        // Theme toggle
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: {
            position: 'absolute', top: 16, right: 0, width: 44, height: 44,
            borderRadius: 22, border: 'none', background: t.surfaceAlt,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }
        }, React.createElement(LucideIcon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.text }))
      ),

      // Stats Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }
      },
        ...stats.map((stat, i) =>
          React.createElement('div', {
            key: stat.label,
            style: {
              background: t.card, borderRadius: 14, padding: '16px',
              border: `1px solid ${t.border}`, boxShadow: `0 2px 8px ${t.shadow}`,
              animation: `growIn 0.3s ease ${i * 0.06}s both`
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
            },
              React.createElement(LucideIcon, { name: stat.icon, size: 16, color: t.primary }),
              React.createElement('span', {
                style: { fontSize: 13, color: t.textMuted, fontFamily: font }
              }, stat.label)
            ),
            React.createElement('div', {
              style: { fontSize: 24, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.5px' }
            }, stat.value)
          )
        )
      ),

      // Badges
      React.createElement('div', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 12 }
      }, 'Badges'),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }
      },
        ...badges.map((badge, i) =>
          React.createElement('div', {
            key: badge.name,
            style: {
              background: t.card, borderRadius: 14, padding: '14px 10px',
              border: `1px solid ${t.border}`, boxShadow: `0 2px 8px ${t.shadow}`,
              textAlign: 'center', opacity: badge.earned ? 1 : 0.5,
              animation: `growIn 0.3s ease ${i * 0.05}s both`, transition: 'all 0.2s ease',
              position: 'relative'
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: badge.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 8px'
              }
            }, React.createElement(LucideIcon, { name: badge.icon, size: 20, color: badge.color })),
            React.createElement('div', {
              style: { fontSize: 12, fontWeight: 600, color: t.text, fontFamily: font }
            }, badge.name),
            React.createElement('div', {
              style: { fontSize: 10, color: t.textMuted, fontFamily: font, marginTop: 2 }
            }, badge.desc),
            badge.earned ? React.createElement('div', {
              style: {
                position: 'absolute', top: 6, right: 6
              }
            }, React.createElement(LucideIcon, { name: 'CircleCheck', size: 14, color: t.cta })) : null
          )
        )
      ),

      // Settings links
      React.createElement('div', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 12 }
      }, 'Settings'),
      ...['Notification Preferences', 'Privacy & Data', 'Community Settings', 'Help & Support'].map((item, i) =>
        React.createElement('div', {
          key: item,
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', background: t.card, borderRadius: 12, marginBottom: 6,
            border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.15s ease'
          },
          onMouseDown: (e) => { e.currentTarget.style.background = t.surfaceAlt; },
          onMouseUp: (e) => { e.currentTarget.style.background = t.card; },
          onMouseLeave: (e) => { e.currentTarget.style.background = t.card; }
        },
          React.createElement('span', {
            style: { fontSize: 15, fontWeight: 500, color: t.text, fontFamily: font }
          }, item),
          React.createElement(LucideIcon, { name: 'ChevronRight', size: 18, color: t.textMuted })
        )
      )
    );
  };

  // ============ SCREENS MAP ============
  const screens = {
    home: HomeScreen,
    ecosphere: EcoSphereScreen,
    challenges: ChallengesScreen,
    codex: CodexScreen,
    profile: ProfileScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'ecosphere', label: 'Eco Sphere', icon: 'Globe' },
    { id: 'challenges', label: 'Challenges', icon: 'Target' },
    { id: 'codex', label: 'Codex', icon: 'Book' },
    { id: 'profile', label: 'Profile', icon: 'Award' },
  ];

  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: font
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40,
        background: t.background, overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
        display: 'flex', flexDirection: 'column', position: 'relative'
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingBottom: 80,
          WebkitOverflowScrolling: 'touch'
        }
      }, React.createElement(CurrentScreen)),

      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.tabBar, borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 24px', zIndex: 10,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, border: 'none', background: 'none', cursor: 'pointer',
              padding: '6px 12px', minWidth: 56, minHeight: 44,
              transition: 'all 0.2s ease'
            }
          },
            React.createElement(LucideIcon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.primary : t.tabInactive,
              strokeWidth: activeScreen === tab.id ? 2.5 : 2
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === tab.id ? 600 : 500,
                color: activeScreen === tab.id ? t.primary : t.tabInactive,
                fontFamily: font
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
