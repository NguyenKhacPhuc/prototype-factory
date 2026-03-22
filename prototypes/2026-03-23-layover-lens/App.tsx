
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080D1C',
    surface: '#0F1526',
    card: '#1A2238',
    cardAlt: '#151E30',
    border: '#252E45',
    primary: '#2DD4BF',
    primaryDim: '#1A8C7D',
    primaryGlow: 'rgba(45,212,191,0.15)',
    secondary: '#F59E0B',
    danger: '#F87171',
    success: '#34D399',
    text: '#F1F5F9',
    textSub: '#94A3B8',
    textMuted: '#4B5E7A',
    navBg: '#0C1322',
    statusBar: '#080D1C',
    riskLow: '#34D399',
    riskMed: '#F59E0B',
    riskHigh: '#F87171',
    overlayBg: 'rgba(8,13,28,0.95)',
  },
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#EEF3FF',
    border: '#DDE3F0',
    primary: '#0D9488',
    primaryDim: '#CCFBF1',
    primaryGlow: 'rgba(13,148,136,0.12)',
    secondary: '#D97706',
    danger: '#EF4444',
    success: '#10B981',
    text: '#0F172A',
    textSub: '#475569',
    textMuted: '#94A3B8',
    navBg: '#FFFFFF',
    statusBar: '#FFFFFF',
    riskLow: '#10B981',
    riskMed: '#D97706',
    riskHigh: '#EF4444',
    overlayBg: 'rgba(240,244,255,0.97)',
  }
};

function App() {
  const [activeTheme, setActiveTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMode, setSelectedMode] = useState('eat');
  const [layoverTime, setLayoverTime] = useState(240);
  const [activeItinerary, setActiveItinerary] = useState(null);
  const [pressedTab, setPressedTab] = useState(null);

  const t = themes[activeTheme];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'itinerary', label: 'My Trip', icon: window.lucide.Route },
    { id: 'settings', label: 'Settings', icon: window.lucide.SlidersHorizontal },
  ];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    * { scrollbar-width: none; }
  `;

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 48,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: activeTheme === 'dark'
      ? '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)'
      : '0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
    flexShrink: 0,
  };

  const outerStyle = {
    minHeight: '100vh',
    background: activeTheme === 'dark' ? '#030508' : '#CDD5E8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Space Grotesk', sans-serif",
  };

  const screens = { home: HomeScreen, explore: ExploreScreen, itinerary: ItineraryScreen, settings: SettingsScreen };
  const ActiveScreen = screens[activeTab];

  return React.createElement('div', { style: outerStyle },
    React.createElement('style', null, fontStyle),
    React.createElement('div', { style: phoneStyle },
      React.createElement(DynamicIsland, { t }),
      React.createElement(StatusBar, { t, activeTheme, setActiveTheme }),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 50, left: 0, right: 0, bottom: 70,
          overflowY: 'auto', overflowX: 'hidden',
        }
      },
        React.createElement(ActiveScreen, {
          t, activeTheme, setActiveTheme,
          selectedMode, setSelectedMode,
          layoverTime, setLayoverTime,
          activeItinerary, setActiveItinerary,
          setActiveTab,
        })
      ),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 4,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, cursor: 'pointer', padding: '6px 12px', borderRadius: 12,
              transition: 'all 0.2s',
              opacity: activeTab === tab.id ? 1 : 0.45,
              transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.2 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 600,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                letterSpacing: 0.3,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}

function DynamicIsland({ t }) {
  return React.createElement('div', {
    style: {
      position: 'absolute', top: 12, left: '50%',
      transform: 'translateX(-50%)',
      width: 120, height: 34,
      background: '#000',
      borderRadius: 20,
      zIndex: 100,
    }
  });
}

function StatusBar({ t, activeTheme, setActiveTheme }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return React.createElement('div', {
    style: {
      position: 'absolute', top: 0, left: 0, right: 0, height: 50,
      background: t.statusBar,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      paddingLeft: 24, paddingRight: 20, paddingBottom: 8,
      zIndex: 50,
    }
  },
    React.createElement('span', {
      style: { fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: 0.5 }
    }, time),
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 5 }
    },
      React.createElement(window.lucide.Wifi, { size: 14, color: t.text, strokeWidth: 2 }),
      React.createElement(window.lucide.Signal, { size: 14, color: t.text, strokeWidth: 2 }),
      React.createElement('div', {
        style: {
          width: 22, height: 11, borderRadius: 3,
          border: `1.5px solid ${t.text}`,
          position: 'relative', display: 'flex', alignItems: 'center',
        }
      },
        React.createElement('div', {
          style: {
            width: '75%', height: '65%', background: t.success,
            borderRadius: 2, marginLeft: 1.5,
          }
        }),
        React.createElement('div', {
          style: {
            width: 2, height: 5, background: t.text,
            position: 'absolute', right: -4, borderRadius: 1,
          }
        })
      )
    )
  );
}

function HomeScreen({ t, selectedMode, setSelectedMode, layoverTime, setLayoverTime, setActiveTab, setActiveItinerary }) {
  const [riskLevel, setRiskLevel] = useState('low');
  const [selectedAirport, setSelectedAirport] = useState('NRT');

  const airports = [
    { code: 'NRT', city: 'Tokyo', terminal: 'Terminal 2', gate: 'Gate 44B' },
    { code: 'LIS', city: 'Lisbon', terminal: 'Terminal 1', gate: 'Gate 22A' },
    { code: 'SIN', city: 'Singapore', terminal: 'T3', gate: 'Gate B12' },
  ];

  const airport = airports.find(a => a.code === selectedAirport);

  const modes = [
    { id: 'eat', label: 'Eat', icon: window.lucide.UtensilsCrossed, color: '#F59E0B' },
    { id: 'see', label: 'See', icon: window.lucide.Camera, color: '#818CF8' },
    { id: 'reset', label: 'Reset', icon: window.lucide.Sparkles, color: '#34D399' },
    { id: 'work', label: 'Work', icon: window.lucide.Laptop, color: '#60A5FA' },
  ];

  const hours = Math.floor(layoverTime / 60);
  const mins = layoverTime % 60;

  const riskColors = { low: t.riskLow, medium: t.riskMed, high: t.riskHigh };
  const riskLabels = { low: 'Low Risk', medium: 'Moderate', high: 'High Risk' };
  const riskScore = { low: 22, medium: 55, high: 82 };

  const suggestions = {
    NRT: {
      eat: { title: 'Tsukiji Outer Market', sub: '2 stops · Sobu Line', time: '45 min', risk: 'low', distance: '8km', emoji: '🍣' },
      see: { title: 'Senso-ji Temple', sub: '3 stops · Narita Express', time: '65 min', risk: 'medium', distance: '14km', emoji: '⛩️' },
      reset: { title: 'Airport Onsen Spa', sub: 'Terminal 2 · Level B1', time: '20 min', risk: 'low', distance: '0.2km', emoji: '♨️' },
      work: { title: 'ANA Lounge', sub: 'Terminal 2 · Gate 40s', time: '5 min', risk: 'low', distance: '0.1km', emoji: '💼' },
    },
    LIS: {
      eat: { title: 'Time Out Market', sub: 'Tram 15E · Cais Sodré', time: '30 min', risk: 'low', distance: '6km', emoji: '🍷' },
      see: { title: 'Miradouro Portas Sol', sub: 'Bus 705 · 4 stops', time: '40 min', risk: 'medium', distance: '9km', emoji: '🌅' },
      reset: { title: 'Termas Belavista', sub: 'Terminal 1 · Level 2', time: '10 min', risk: 'low', distance: '0.3km', emoji: '🧘' },
      work: { title: 'TAP Premium Lounge', sub: 'Terminal 1 · Pier 1', time: '8 min', risk: 'low', distance: '0.2km', emoji: '💻' },
    },
    SIN: {
      eat: { title: 'Jewel Changi Forest', sub: 'Skytrain · T1 Link', time: '15 min', risk: 'low', distance: '0.5km', emoji: '🌿' },
      see: { title: 'Merlion Park', sub: 'MRT · City Hall', time: '55 min', risk: 'medium', distance: '17km', emoji: '🦁' },
      reset: { title: 'Ambassador Transit Hotel', sub: 'Terminal 3 · Transit Area', time: '5 min', risk: 'low', distance: '0.1km', emoji: '🛁' },
      work: { title: 'SingTel Lounge', sub: 'Terminal 3 · Level 2', time: '8 min', risk: 'low', distance: '0.2km', emoji: '📶' },
    }
  };

  const spot = suggestions[selectedAirport][selectedMode];

  return React.createElement('div', { style: { padding: '20px 20px 24px' } },
    // Airport selector
    React.createElement('div', {
      style: {
        background: t.card, borderRadius: 20, padding: '16px 18px',
        border: `1px solid ${t.border}`, marginBottom: 16,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' } }, 'Current Airport'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6 } },
            React.createElement('span', { style: { fontSize: 28, fontWeight: 700, color: t.text } }, airport.code),
            React.createElement('span', { style: { fontSize: 14, color: t.textSub, fontWeight: 500 } }, airport.city)
          )
        ),
        React.createElement('div', {
          style: {
            background: t.primaryGlow, borderRadius: 12, padding: '8px 12px',
            border: `1px solid ${t.primary}30`,
          }
        },
          React.createElement(window.lucide.PlaneLanding, { size: 22, color: t.primary })
        )
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 8, fontSize: 11, color: t.textSub }
      },
        React.createElement('span', {
          style: {
            background: t.cardAlt, borderRadius: 6, padding: '4px 8px',
            border: `1px solid ${t.border}`,
          }
        }, airport.terminal),
        React.createElement('span', {
          style: {
            background: t.cardAlt, borderRadius: 6, padding: '4px 8px',
            border: `1px solid ${t.border}`,
          }
        }, airport.gate),
        React.createElement('span', {
          style: {
            background: `${t.primary}20`, borderRadius: 6, padding: '4px 8px',
            color: t.primary, fontWeight: 600,
          }
        }, 'Checked In')
      ),
      // Airport toggle row
      React.createElement('div', {
        style: { display: 'flex', gap: 6, marginTop: 12 }
      },
        airports.map(a => React.createElement('button', {
          key: a.code,
          onClick: () => setSelectedAirport(a.code),
          style: {
            flex: 1, padding: '6px 0', borderRadius: 8, border: 'none',
            background: selectedAirport === a.code ? t.primary : t.cardAlt,
            color: selectedAirport === a.code ? '#000' : t.textMuted,
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s',
          }
        }, a.code))
      )
    ),

    // Time window
    React.createElement('div', {
      style: {
        background: t.card, borderRadius: 20, padding: '16px 18px',
        border: `1px solid ${t.border}`, marginBottom: 16,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
      },
        React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontWeight: 600 } }, 'Layover Window'),
        React.createElement('div', {
          style: {
            background: t.primaryGlow, borderRadius: 8, padding: '4px 10px',
            fontSize: 12, color: t.primary, fontWeight: 700,
          }
        }, `${hours}h ${mins}m`)
      ),
      React.createElement('input', {
        type: 'range', min: 60, max: 480, step: 15, value: layoverTime,
        onChange: e => setLayoverTime(Number(e.target.value)),
        style: {
          width: '100%', accentColor: t.primary, cursor: 'pointer',
          height: 4,
        }
      }),
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 }
      },
        React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, '1h'),
        React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, '8h')
      ),
      React.createElement('div', {
        style: {
          display: 'flex', gap: 4, marginTop: 12,
          background: t.cardAlt, borderRadius: 10, padding: 4,
        }
      },
        [
          { label: 'No Luggage', icon: window.lucide.Backpack },
          { label: 'Has Bags', icon: window.lucide.Luggage },
        ].map((opt, i) =>
          React.createElement('button', {
            key: i,
            style: {
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 5, padding: '6px 0', borderRadius: 8, border: 'none',
              background: i === 0 ? t.primary : 'transparent',
              color: i === 0 ? '#000' : t.textMuted,
              fontSize: 11, fontWeight: 600, cursor: 'pointer',
            }
          },
            React.createElement(opt.icon, { size: 13 }),
            opt.label
          )
        )
      )
    ),

    // Mode selector
    React.createElement('p', {
      style: { fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }
    }, 'I want to...'),
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }
    },
      modes.map(mode =>
        React.createElement('button', {
          key: mode.id,
          onClick: () => setSelectedMode(mode.id),
          style: {
            background: selectedMode === mode.id ? `${mode.color}20` : t.card,
            border: `1.5px solid ${selectedMode === mode.id ? mode.color : t.border}`,
            borderRadius: 14, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', transition: 'all 0.2s',
          }
        },
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: 10,
              background: selectedMode === mode.id ? `${mode.color}25` : t.cardAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(mode.icon, { size: 16, color: mode.color })
          ),
          React.createElement('span', {
            style: {
              fontSize: 13, fontWeight: 700,
              color: selectedMode === mode.id ? mode.color : t.textSub,
            }
          }, mode.label)
        )
      )
    ),

    // Recommended spot card
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.primary}18, ${t.primaryDim}08)`,
        border: `1px solid ${t.primary}40`,
        borderRadius: 20, padding: '18px',
        marginBottom: 16,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }
      },
        React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' } }, 'Best Match'),
        React.createElement('div', {
          style: {
            background: spot.risk === 'low' ? `${t.riskLow}20` : `${t.riskMed}20`,
            borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 700,
            color: spot.risk === 'low' ? t.riskLow : t.riskMed,
          }
        }, spot.risk === 'low' ? 'Safe to go' : 'Moderate risk')
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('span', { style: { fontSize: 32 } }, spot.emoji),
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 2 } }, spot.title),
          React.createElement('p', { style: { fontSize: 12, color: t.textSub } }, spot.sub)
        )
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginTop: 14 }
      },
        [
          { icon: window.lucide.Clock, label: `${spot.time} total` },
          { icon: window.lucide.MapPin, label: spot.distance },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 5,
              background: t.overlayBg, borderRadius: 8, padding: '5px 10px',
              fontSize: 11, color: t.textSub, fontWeight: 600,
            }
          },
            React.createElement(item.icon, { size: 12, color: t.primary }),
            item.label
          )
        )
      ),
      React.createElement('button', {
        onClick: () => { setActiveItinerary(spot); setActiveTab('itinerary'); },
        style: {
          width: '100%', marginTop: 12, padding: '13px 0',
          background: t.primary, border: 'none', borderRadius: 13,
          color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          letterSpacing: 0.3,
        }
      }, 'Build My Itinerary →')
    )
  );
}

function ExploreScreen({ t, selectedMode, setSelectedMode }) {
  const [filter, setFilter] = useState('all');

  const spots = [
    { emoji: '🍜', name: 'Ichiran Ramen', cat: 'eat', area: 'Shibuya', walk: '12 min', rating: 4.9, risk: 'low', badge: 'Luggage OK' },
    { emoji: '⛩️', name: 'Meiji Shrine', cat: 'see', area: 'Harajuku', walk: '28 min', rating: 4.8, risk: 'low', badge: 'Free Entry' },
    { emoji: '♨️', name: 'SPA LaQua', cat: 'reset', area: 'Korakuen', walk: '22 min', rating: 4.7, risk: 'medium', badge: 'Towel Incl.' },
    { emoji: '☕', name: 'Blue Bottle Roppongi', cat: 'work', area: 'Roppongi', walk: '35 min', rating: 4.6, risk: 'low', badge: 'Fast WiFi' },
    { emoji: '🌸', name: 'Shinjuku Gyoen', cat: 'see', area: 'Shinjuku', walk: '30 min', rating: 4.9, risk: 'low', badge: '¥500 Entry' },
    { emoji: '🍱', name: 'Tsukiji Fish Market', cat: 'eat', area: 'Tsukiji', walk: '18 min', rating: 4.7, risk: 'low', badge: 'Open Early' },
    { emoji: '🧘', name: 'Airport Yoga Room', cat: 'reset', area: 'Terminal 2', walk: '3 min', rating: 4.5, risk: 'low', badge: 'In Terminal' },
    { emoji: '🗼', name: 'Tokyo Tower View', cat: 'see', area: 'Shiba Park', walk: '40 min', rating: 4.8, risk: 'medium', badge: 'Iconic Shot' },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'eat', label: 'Eat' },
    { id: 'see', label: 'See' },
    { id: 'reset', label: 'Reset' },
    { id: 'work', label: 'Work' },
  ];

  const filtered = filter === 'all' ? spots : spots.filter(s => s.cat === filter);
  const riskColor = r => r === 'low' ? t.riskLow : r === 'medium' ? t.riskMed : t.riskHigh;

  return React.createElement('div', { style: { padding: '20px 20px 24px' } },
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
    },
      React.createElement('div', null,
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text } }, 'Explore'),
        React.createElement('p', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, 'Tokyo Narita · NRT')
      ),
      React.createElement('div', {
        style: {
          width: 38, height: 38, borderRadius: 12,
          background: t.card, border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement(window.lucide.SlidersHorizontal, { size: 18, color: t.textSub })
      )
    ),

    // Search bar
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.border}`,
        borderRadius: 14, padding: '11px 14px',
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      }
    },
      React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
      React.createElement('span', { style: { fontSize: 13, color: t.textMuted } }, 'Search spots, areas, or vibes...')
    ),

    // Filter chips
    React.createElement('div', {
      style: { display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto' }
    },
      filters.map(f =>
        React.createElement('button', {
          key: f.id,
          onClick: () => setFilter(f.id),
          style: {
            padding: '6px 14px', borderRadius: 20, border: 'none',
            background: filter === f.id ? t.primary : t.card,
            color: filter === f.id ? '#000' : t.textSub,
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0,
            border: `1px solid ${filter === f.id ? t.primary : t.border}`,
          }
        }, f.label)
      )
    ),

    // Grid of spots
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
      filtered.map((spot, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 16, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }
        },
          React.createElement('span', { style: { fontSize: 28, flexShrink: 0 } }, spot.emoji),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }
            },
              React.createElement('p', {
                style: { fontSize: 14, fontWeight: 700, color: t.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
              }, spot.name),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 3 }
              },
                React.createElement(window.lucide.Star, { size: 12, color: '#F59E0B', fill: '#F59E0B' }),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.text } }, spot.rating)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
              React.createElement('span', { style: { fontSize: 11, color: t.textSub } }, spot.area),
              React.createElement('span', { style: { width: 3, height: 3, borderRadius: '50%', background: t.textMuted } }),
              React.createElement('span', { style: { fontSize: 11, color: t.textSub } }, spot.walk + ' walk'),
              React.createElement('span', {
                style: {
                  background: `${riskColor(spot.risk)}18`, borderRadius: 5, padding: '2px 6px',
                  fontSize: 10, fontWeight: 700, color: riskColor(spot.risk),
                }
              }, spot.risk === 'low' ? 'Safe' : 'Moderate'),
              React.createElement('span', {
                style: {
                  background: t.cardAlt, borderRadius: 5, padding: '2px 6px',
                  fontSize: 10, fontWeight: 600, color: t.textMuted,
                }
              }, spot.badge)
            )
          )
        )
      )
    )
  );
}

function ItineraryScreen({ t, activeItinerary, setActiveItinerary }) {
  const [step, setStep] = useState(0);
  const [riskOpen, setRiskOpen] = useState(false);

  const defaultItinerary = {
    title: 'Tokyo Ramen Run',
    emoji: '🍜',
    totalTime: '3h 45m',
    returnBuffer: '45 min',
    stops: [
      {
        emoji: '🚇', name: 'Narita Express', sub: 'Dep. 10:22 → Shinjuku', duration: '55 min',
        status: 'done', type: 'transit',
        tips: ['Board at platform 1', 'IC Card works'],
      },
      {
        emoji: '🍜', name: 'Ichiran Ramen', sub: '2F · 1 Chome, Shinjuku', duration: '30 min',
        status: 'active', type: 'stop',
        tips: ['Solo booth seating', 'Order by ticket machine', 'Extra noodles free'],
      },
      {
        emoji: '🏪', name: 'Explore Omoide Yokocho', sub: 'Memory Lane · Shinjuku', duration: '20 min',
        status: 'pending', type: 'stop',
        tips: ['Compact alley', 'Luggage-friendly', 'Great photo spot'],
      },
      {
        emoji: '🚆', name: 'Return · Narita Express', sub: 'Dep. 13:05 → Terminal 2', duration: '55 min',
        status: 'pending', type: 'transit',
        tips: ['Last safe train', 'Platform 3', '¥3,070'],
      },
      {
        emoji: '✈️', name: 'Back at Gate 44B', sub: 'Buffer: 45 min to boarding', duration: '45 min',
        status: 'pending', type: 'gate',
        tips: ['Security fast lane available', 'Boarding: 14:20'],
      },
    ],
    riskFactors: [
      { label: 'Train Frequency', score: 10, status: 'good', note: 'Every 30 min — on track' },
      { label: 'Station Congestion', score: 35, status: 'ok', note: 'Moderate — weekday afternoon' },
      { label: 'Weather', score: 5, status: 'good', note: 'Clear skies, 18°C' },
      { label: 'Immigration Buffer', score: 20, status: 'good', note: '45 min buffer allocated' },
    ],
  };

  const itin = activeItinerary ? defaultItinerary : defaultItinerary;

  const statusColors = {
    done: t.textMuted,
    active: t.primary,
    pending: t.textMuted,
  };
  const statusBg = {
    done: t.cardAlt,
    active: `${t.primary}20`,
    pending: t.cardAlt,
  };

  const overallRisk = 22;

  return React.createElement('div', { style: { padding: '20px 20px 24px' } },
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
    },
      React.createElement('div', null,
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text } }, 'My Trip'),
        React.createElement('p', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, 'Active itinerary')
      ),
      React.createElement('div', {
        style: {
          background: `${t.riskLow}20`, borderRadius: 10, padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
        }
      },
        React.createElement(window.lucide.ShieldCheck, { size: 14, color: t.riskLow }),
        React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.riskLow } }, 'Low Risk')
      )
    ),

    // Trip header card
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.primary}22, ${t.card})`,
        border: `1px solid ${t.primary}40`, borderRadius: 20, padding: 18, marginBottom: 14,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 } },
        React.createElement('span', { style: { fontSize: 36 } }, itin.emoji),
        React.createElement('div', null,
          React.createElement('h3', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, itin.title),
          React.createElement('p', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, 'Shinjuku district · NRT')
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        [
          { icon: window.lucide.Timer, label: itin.totalTime, sub: 'Total time' },
          { icon: window.lucide.AlarmClock, label: itin.returnBuffer, sub: 'Gate buffer' },
          { icon: window.lucide.TrendingDown, label: `${overallRisk}%`, sub: 'Risk score' },
        ].map((m, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.overlayBg, borderRadius: 12, padding: '10px 8px',
              textAlign: 'center',
            }
          },
            React.createElement(m.icon, { size: 14, color: t.primary, style: { marginBottom: 4 } }),
            React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, m.label),
            React.createElement('p', { style: { fontSize: 9, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase' } }, m.sub)
          )
        )
      )
    ),

    // Risk meter expandable
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.border}`,
        borderRadius: 16, overflow: 'hidden', marginBottom: 14,
      }
    },
      React.createElement('div', {
        onClick: () => setRiskOpen(!riskOpen),
        style: {
          padding: '14px 16px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', cursor: 'pointer',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(window.lucide.Gauge, { size: 16, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Risk Meter')
        ),
        React.createElement(riskOpen ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 16, color: t.textMuted })
      ),
      riskOpen && React.createElement('div', { style: { padding: '0 16px 14px', borderTop: `1px solid ${t.border}` } },
        React.createElement('div', { style: { paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 } },
          itin.riskFactors.map((rf, i) =>
            React.createElement('div', { key: i },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }
              },
                React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.textSub } }, rf.label),
                React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, rf.note)
              ),
              React.createElement('div', {
                style: { height: 5, background: t.cardAlt, borderRadius: 10, overflow: 'hidden' }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', borderRadius: 10,
                    width: `${rf.score}%`,
                    background: rf.score < 30 ? t.riskLow : rf.score < 60 ? t.riskMed : t.riskHigh,
                    transition: 'width 0.5s',
                  }
                })
              )
            )
          )
        )
      )
    ),

    // Stop timeline
    React.createElement('p', {
      style: { fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }
    }, 'Stop-by-stop'),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 0 } },
      itin.stops.map((stop, i) =>
        React.createElement('div', {
          key: i,
          style: { display: 'flex', gap: 12, position: 'relative' }
        },
          // Timeline line
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 36, flexShrink: 0 } },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: '50%',
                background: statusBg[stop.status],
                border: `2px solid ${stop.status === 'active' ? t.primary : t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, zIndex: 1, position: 'relative',
                flexShrink: 0,
              }
            }, stop.emoji),
            i < itin.stops.length - 1 && React.createElement('div', {
              style: {
                width: 2, flex: 1, minHeight: 20,
                background: stop.status === 'done' ? t.primary : t.border,
                margin: '3px 0',
              }
            })
          ),
          React.createElement('div', {
            style: {
              flex: 1, background: stop.status === 'active' ? `${t.primary}10` : t.card,
              border: `1px solid ${stop.status === 'active' ? t.primary + '50' : t.border}`,
              borderRadius: 14, padding: '12px 14px', marginBottom: 8,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }
            },
              React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, stop.name),
                React.createElement('p', { style: { fontSize: 11, color: t.textSub, marginTop: 2 } }, stop.sub)
              ),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: 700,
                  color: stop.status === 'active' ? t.primary : t.textMuted,
                  background: stop.status === 'active' ? `${t.primary}15` : t.cardAlt,
                  borderRadius: 6, padding: '3px 7px',
                }
              }, stop.duration)
            ),
            stop.status === 'active' && React.createElement('div', {
              style: { display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }
            },
              stop.tips.map((tip, ti) =>
                React.createElement('span', {
                  key: ti,
                  style: {
                    background: t.primaryGlow, borderRadius: 6, padding: '3px 8px',
                    fontSize: 10, color: t.primary, fontWeight: 600,
                  }
                }, '✓ ' + tip)
              )
            )
          )
        )
      )
    )
  );
}

function SettingsScreen({ t, activeTheme, setActiveTheme }) {
  const [notifications, setNotifications] = useState(true);
  const [liveRisk, setLiveRisk] = useState(true);
  const [metric, setMetric] = useState(false);
  const [mobilityMode, setMobilityMode] = useState(false);

  const Toggle = ({ value, onChange }) =>
    React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 44, height: 24, borderRadius: 12,
        background: value ? t.primary : t.border,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s',
      }
    },
      React.createElement('div', {
        style: {
          width: 18, height: 18, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 3,
          left: value ? 23 : 3,
          transition: 'left 0.2s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }
      })
    );

  const Row = ({ icon, label, sub, right }) =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 16px',
        borderBottom: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', {
          style: {
            width: 34, height: 34, borderRadius: 10,
            background: t.primaryGlow, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(icon, { size: 16, color: t.primary })
        ),
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, label),
          sub && React.createElement('p', { style: { fontSize: 11, color: t.textMuted, marginTop: 1 } }, sub)
        )
      ),
      right
    );

  return React.createElement('div', { style: { padding: '20px 20px 24px' } },
    React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 20 } }, 'Settings'),

    // Profile card
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.primary}20, ${t.card})`,
        border: `1px solid ${t.primary}30`, borderRadius: 20, padding: 18, marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 14,
      }
    },
      React.createElement('div', {
        style: {
          width: 52, height: 52, borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }
      }, '✈️'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Alex Traveler'),
        React.createElement('p', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, '47 layovers · 18 countries'),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6,
            background: `${t.primary}20`, borderRadius: 6, padding: '3px 8px',
          }
        },
          React.createElement(window.lucide.Star, { size: 10, color: t.primary, fill: t.primary }),
          React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 700 } }, 'Frequent Flyer Pro')
        )
      )
    ),

    // Appearance
    React.createElement('div', {
      style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 14 }
    },
      React.createElement('p', {
        style: { fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '12px 16px 0' }
      }, 'Appearance'),
      React.createElement(Row, {
        icon: activeTheme === 'dark' ? window.lucide.Moon : window.lucide.Sun,
        label: 'Theme',
        sub: activeTheme === 'dark' ? 'Dark mode active' : 'Light mode active',
        right: React.createElement('button', {
          onClick: () => setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark'),
          style: {
            padding: '6px 14px', borderRadius: 10, border: 'none',
            background: t.primary, color: '#000',
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }
        }, activeTheme === 'dark' ? 'Light' : 'Dark')
      }),
      React.createElement(Row, {
        icon: window.lucide.Ruler,
        label: 'Units',
        sub: metric ? 'Kilometers' : 'Miles',
        right: React.createElement(Toggle, { value: metric, onChange: setMetric })
      })
    ),

    // Preferences
    React.createElement('div', {
      style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 14 }
    },
      React.createElement('p', {
        style: { fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '12px 16px 0' }
      }, 'Preferences'),
      React.createElement(Row, {
        icon: window.lucide.Bell,
        label: 'Return Reminders',
        sub: 'Get alerts 30 min before return',
        right: React.createElement(Toggle, { value: notifications, onChange: setNotifications })
      }),
      React.createElement(Row, {
        icon: window.lucide.Gauge,
        label: 'Live Risk Data',
        sub: 'Real-time traffic & conditions',
        right: React.createElement(Toggle, { value: liveRisk, onChange: setLiveRisk })
      }),
      React.createElement(Row, {
        icon: window.lucide.Accessibility,
        label: 'Mobility Mode',
        sub: 'Filter accessible stops only',
        right: React.createElement(Toggle, { value: mobilityMode, onChange: setMobilityMode })
      })
    ),

    // Stats
    React.createElement('div', {
      style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 14 }
    },
      React.createElement('p', {
        style: { fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '12px 16px 8px' }
      }, 'Your Stats'),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: t.border }
      },
        [
          { label: '47', sub: 'Layovers used' },
          { label: '312h', sub: 'Time explored' },
          { label: '18', sub: 'Countries visited' },
          { label: '0', sub: 'Missed flights' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.card, padding: '14px 16px', textAlign: 'center' }
          },
            React.createElement('p', { style: { fontSize: 20, fontWeight: 700, color: t.primary } }, s.label),
            React.createElement('p', { style: { fontSize: 10, color: t.textMuted, marginTop: 2, fontWeight: 600 } }, s.sub)
          )
        )
      )
    ),

    React.createElement('div', {
      style: { display: 'flex', gap: 8 }
    },
      React.createElement('button', {
        style: {
          flex: 1, padding: '13px 0', borderRadius: 13,
          background: t.card, border: `1px solid ${t.border}`,
          color: t.textSub, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }
      }, 'Privacy Policy'),
      React.createElement('button', {
        style: {
          flex: 1, padding: '13px 0', borderRadius: 13,
          background: `${t.danger}15`, border: `1px solid ${t.danger}40`,
          color: t.danger, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }
      }, 'Sign Out')
    )
  );
}
