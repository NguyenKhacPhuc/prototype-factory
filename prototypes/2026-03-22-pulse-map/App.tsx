
const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F4F8',
    surface: '#FFFFFF',
    surfaceAlt: '#F7FAFC',
    card: '#FFFFFF',
    text: '#0F1923',
    textSecondary: '#4A5568',
    textMuted: '#718096',
    primary: '#00B4D8',
    primaryDark: '#0096B7',
    primaryLight: '#E0F7FC',
    accent: '#FF6B35',
    accentLight: '#FFF0EB',
    success: '#38B2AC',
    successLight: '#E6FFFA',
    warning: '#F6AD55',
    warningLight: '#FFFAF0',
    danger: '#FC5B5B',
    dangerLight: '#FFF5F5',
    border: '#E2E8F0',
    borderLight: '#EDF2F7',
    navBg: '#FFFFFF',
    statusBar: '#0F1923',
    shadow: 'rgba(0,0,0,0.08)',
    mapBg: '#D1E8F0',
    badge: '#00B4D8',
  },
  dark: {
    bg: '#0A0F14',
    surface: '#141C24',
    surfaceAlt: '#1A2535',
    card: '#1E2D3D',
    text: '#F0F6FF',
    textSecondary: '#A8BBCC',
    textMuted: '#607080',
    primary: '#00D4FF',
    primaryDark: '#00B4D8',
    primaryLight: 'rgba(0,212,255,0.15)',
    accent: '#FF7A47',
    accentLight: 'rgba(255,122,71,0.15)',
    success: '#4ECDC4',
    successLight: 'rgba(78,205,196,0.15)',
    warning: '#FFB347',
    warningLight: 'rgba(255,179,71,0.15)',
    danger: '#FF6B6B',
    dangerLight: 'rgba(255,107,107,0.15)',
    border: '#253545',
    borderLight: '#1E2D3D',
    navBg: '#0E1820',
    statusBar: '#F0F6FF',
    shadow: 'rgba(0,0,0,0.4)',
    mapBg: '#0D1F2D',
    badge: '#00D4FF',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Feed', icon: window.lucide.Layers },
    { id: 'map', label: 'Map', icon: window.lucide.Map },
    { id: 'alerts', label: 'Alerts', icon: window.lucide.Bell },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'settings', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    map: MapScreen,
    alerts: AlertsScreen,
    explore: ExploreScreen,
    settings: SettingsScreen,
  };

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#C8D6E0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    React.createElement('style', null, fontLink),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: `0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15)`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          background: '#000',
          borderRadius: 20,
          zIndex: 100,
        }
      }),

      // Status Bar
      React.createElement('div', {
        style: {
          height: 54,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingBottom: 8,
          paddingLeft: 20,
          paddingRight: 20,
          flexShrink: 0,
          background: t.surface,
          zIndex: 50,
        }
      },
        React.createElement('span', {
          style: { fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: '-0.2px' }
        }, '9:41'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: t.text }),
        ),
      ),

      // Screen Content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }
      },
        React.createElement(screens[activeTab], { t, isDark, setIsDark })
      ),

      // Bottom Nav
      React.createElement('div', {
        style: {
          height: 80,
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 14,
          paddingTop: 8,
          flexShrink: 0,
          boxShadow: `0 -4px 20px ${t.shadow}`,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: 12,
              background: activeTab === tab.id ? t.primaryLight : 'transparent',
              transition: 'all 0.2s ease',
              minWidth: 52,
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                letterSpacing: '0.2px',
              }
            }, tab.label)
          )
        )
      ),
    )
  );
}

// ─── HOME SCREEN ────────────────────────────────────────────────────────────

function HomeScreen({ t, isDark }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Transit', 'Weather', 'Civic', 'Safety'];

  const stories = [
    {
      id: 1,
      category: 'Transit',
      categoryColor: t.primary,
      categoryBg: t.primaryLight,
      urgency: 'high',
      title: 'Blue Line delays up to 25 min due to signal failure at Central Station',
      impact: 'Affects your usual morning commute on Route 7→Blue Line',
      location: 'Central Station · 0.4 mi away',
      time: '12 min ago',
      readTime: '2 min read',
      icon: window.lucide.Train,
      hasAlert: true,
    },
    {
      id: 2,
      category: 'Weather',
      categoryColor: t.warning,
      categoryBg: t.warningLight,
      urgency: 'medium',
      title: 'Flash flood watch issued for downtown district until 6 PM today',
      impact: 'Riverside Drive may flood — affects your saved route to Eastside',
      location: 'Downtown District · 1.2 mi away',
      time: '28 min ago',
      readTime: '3 min read',
      icon: window.lucide.CloudRain,
      hasAlert: false,
    },
    {
      id: 3,
      category: 'Civic',
      categoryColor: t.success,
      categoryBg: t.successLight,
      urgency: 'low',
      title: 'City Council votes tonight on rezoning Maple Street corridor',
      impact: 'Could affect property values and parking near your home address',
      location: 'Maple St Corridor · 0.8 mi away',
      time: '1 hr ago',
      readTime: '5 min read',
      icon: window.lucide.Landmark,
      hasAlert: false,
    },
    {
      id: 4,
      category: 'Safety',
      categoryColor: t.danger,
      categoryBg: t.dangerLight,
      urgency: 'high',
      title: 'Water main break closes Oak Ave between 3rd and 5th St',
      impact: 'Your saved route to Sunridge Daycare passes through this closure',
      location: 'Oak Ave · 0.6 mi away',
      time: '45 min ago',
      readTime: '2 min read',
      icon: window.lucide.Droplets,
      hasAlert: true,
    },
    {
      id: 5,
      category: 'Transit',
      categoryColor: t.primary,
      categoryBg: t.primaryLight,
      urgency: 'low',
      title: 'New bus rapid transit line opens on Market Street next Monday',
      impact: 'New express option for your weekly Westside trips',
      location: 'Market St · 1.5 mi away',
      time: '2 hr ago',
      readTime: '4 min read',
      icon: window.lucide.Bus,
      hasAlert: false,
    },
  ];

  const filtered = activeFilter === 'All' ? stories : stories.filter(s => s.category === activeFilter);

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg, display: 'flex', flexDirection: 'column' }
  },
    // Header
    React.createElement('div', {
      style: {
        background: t.surface,
        padding: '12px 20px 14px',
        borderBottom: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 11, fontWeight: 600, color: t.primary, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 2 }
          }, 'Pulse Map'),
          React.createElement('div', {
            style: { fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }
          }, 'Your Area'),
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 10 }
        },
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 5,
              background: t.primaryLight, borderRadius: 20,
              padding: '5px 10px',
            }
          },
            React.createElement(window.lucide.MapPin, { size: 12, color: t.primary }),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.primary } }, 'Midtown'),
          ),
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: 17,
              background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(window.lucide.Bell, { size: 16, color: '#fff' })
          ),
        ),
      ),
      // Filter chips
      React.createElement('div', {
        style: { display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }
      },
        filters.map(f =>
          React.createElement('div', {
            key: f,
            onClick: () => setActiveFilter(f),
            style: {
              padding: '5px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: activeFilter === f ? t.primary : t.surfaceAlt,
              color: activeFilter === f ? '#fff' : t.textSecondary,
              border: `1px solid ${activeFilter === f ? t.primary : t.border}`,
              transition: 'all 0.15s',
              flexShrink: 0,
            }
          }, f)
        )
      ),
    ),

    // Impact bar
    React.createElement('div', {
      style: {
        margin: '12px 16px',
        background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}15)`,
        border: `1px solid ${t.primary}33`,
        borderRadius: 14,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }
    },
      React.createElement('div', {
        style: {
          width: 34, height: 34, borderRadius: 10,
          background: t.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }
      },
        React.createElement(window.lucide.Zap, { size: 18, color: '#fff' })
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, '2 active disruptions near you'),
        React.createElement('div', { style: { fontSize: 11, color: t.textSecondary } }, 'Transit + Safety · Updated just now'),
      ),
      React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted, style: { marginLeft: 'auto' } }),
    ),

    // Stories
    React.createElement('div', {
      style: { padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }
    },
      filtered.map(story =>
        React.createElement('div', {
          key: story.id,
          style: {
            background: t.card,
            borderRadius: 16,
            padding: '14px',
            boxShadow: `0 2px 12px ${t.shadow}`,
            border: story.urgency === 'high' ? `1px solid ${story.categoryColor}44` : `1px solid ${t.border}`,
            cursor: 'pointer',
          }
        },
          // Top row
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }
          },
            React.createElement('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: 6,
                background: story.categoryBg,
                borderRadius: 8, padding: '3px 8px',
              }
            },
              React.createElement(story.icon, { size: 12, color: story.categoryColor }),
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: story.categoryColor, textTransform: 'uppercase', letterSpacing: '0.5px' } }, story.category),
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 }
            },
              story.hasAlert && React.createElement('div', {
                style: {
                  width: 8, height: 8, borderRadius: 4,
                  background: t.danger,
                  boxShadow: `0 0 6px ${t.danger}`,
                }
              }),
              React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, story.time),
            ),
          ),

          // Title
          React.createElement('div', {
            style: { fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.4, marginBottom: 8 }
          }, story.title),

          // Impact box
          React.createElement('div', {
            style: {
              background: story.categoryBg,
              borderRadius: 8,
              padding: '6px 10px',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 6,
            }
          },
            React.createElement(window.lucide.UserCheck, { size: 12, color: story.categoryColor, style: { marginTop: 1, flexShrink: 0 } }),
            React.createElement('span', { style: { fontSize: 11, color: story.categoryColor, fontWeight: 600, lineHeight: 1.4 } }, story.impact),
          ),

          // Bottom row
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement(window.lucide.MapPin, { size: 11, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, story.location),
            ),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, story.readTime),
          ),
        )
      )
    ),
  );
}

// ─── MAP SCREEN ─────────────────────────────────────────────────────────────

function MapScreen({ t }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [mapLayer, setMapLayer] = useState('impact');

  const pins = [
    { id: 1, x: 55, y: 38, type: 'transit', color: '#00B4D8', label: 'Train Delay', icon: window.lucide.Train, urgent: true },
    { id: 2, x: 72, y: 55, type: 'weather', color: '#F6AD55', label: 'Flood Watch', icon: window.lucide.CloudRain, urgent: false },
    { id: 3, x: 35, y: 62, type: 'safety', color: '#FC5B5B', label: 'Road Closed', icon: window.lucide.Droplets, urgent: true },
    { id: 4, x: 60, y: 72, type: 'civic', color: '#38B2AC', label: 'Council Vote', icon: window.lucide.Landmark, urgent: false },
    { id: 5, x: 80, y: 30, type: 'transit', color: '#00B4D8', label: 'New BRT Line', icon: window.lucide.Bus, urgent: false },
  ];

  const layers = ['Impact', 'Transit', 'Weather'];

  return React.createElement('div', {
    style: { flex: 1, display: 'flex', flexDirection: 'column', background: t.bg, overflow: 'hidden' }
  },
    // Header
    React.createElement('div', {
      style: {
        background: t.surface,
        padding: '12px 20px',
        borderBottom: `1px solid ${t.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Live Map'),
        React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, '5 stories in your radius'),
      ),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 6,
          background: t.primaryLight, borderRadius: 20, padding: '6px 12px',
        }
      },
        React.createElement(window.lucide.LocateFixed, { size: 14, color: t.primary }),
        React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.primary } }, '5 mi radius'),
      ),
    ),

    // Layer toggles
    React.createElement('div', {
      style: {
        background: t.surface,
        padding: '8px 16px 10px',
        display: 'flex',
        gap: 6,
        borderBottom: `1px solid ${t.border}`,
      }
    },
      layers.map(l =>
        React.createElement('div', {
          key: l,
          onClick: () => setMapLayer(l.toLowerCase()),
          style: {
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            background: mapLayer === l.toLowerCase() ? t.primary : t.surfaceAlt,
            color: mapLayer === l.toLowerCase() ? '#fff' : t.textSecondary,
            border: `1px solid ${mapLayer === l.toLowerCase() ? t.primary : t.border}`,
          }
        }, l)
      )
    ),

    // Map area
    React.createElement('div', {
      style: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        background: t.mapBg,
      }
    },
      // Grid lines (simulating map)
      ...Array.from({ length: 8 }, (_, i) =>
        React.createElement('div', {
          key: `h${i}`,
          style: {
            position: 'absolute',
            left: 0, right: 0,
            top: `${12.5 * i}%`,
            height: 1,
            background: `${t.border}55`,
          }
        })
      ),
      ...Array.from({ length: 6 }, (_, i) =>
        React.createElement('div', {
          key: `v${i}`,
          style: {
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${16.66 * i}%`,
            width: 1,
            background: `${t.border}55`,
          }
        })
      ),

      // Roads
      React.createElement('div', {
        style: {
          position: 'absolute', top: '40%', left: 0, right: 0,
          height: 3, background: `${t.primary}33`,
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, bottom: 0, left: '50%',
          width: 3, background: `${t.primary}33`,
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', top: '65%', left: 0, right: 0,
          height: 2, background: `${t.border}88`,
        }
      }),

      // User location
      React.createElement('div', {
        style: {
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16,
          borderRadius: 8,
          background: t.primary,
          border: '2px solid #fff',
          boxShadow: `0 0 0 6px ${t.primary}33`,
          zIndex: 10,
        }
      }),

      // Radius circle
      React.createElement('div', {
        style: {
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180, height: 180,
          borderRadius: '50%',
          border: `1.5px dashed ${t.primary}55`,
          background: `${t.primary}08`,
          zIndex: 5,
        }
      }),

      // Pins
      ...pins.map(pin =>
        React.createElement('div', {
          key: pin.id,
          onClick: () => setSelectedPin(selectedPin?.id === pin.id ? null : pin),
          style: {
            position: 'absolute',
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: pin.color,
              border: `2px solid #fff`,
              boxShadow: pin.urgent ? `0 0 12px ${pin.color}88` : `0 2px 8px rgba(0,0,0,0.2)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(pin.icon, { size: 16, color: '#fff' })
          ),
          pin.urgent && React.createElement('div', {
            style: {
              position: 'absolute', top: 0, right: 0,
              width: 10, height: 10, borderRadius: 5,
              background: '#FC5B5B',
              border: '1.5px solid #fff',
            }
          }),
        )
      ),

      // Selected pin popup
      selectedPin && React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 16, left: 16, right: 16,
          background: t.surface,
          borderRadius: 16,
          padding: 14,
          boxShadow: `0 8px 30px ${t.shadow}`,
          border: `1px solid ${selectedPin.color}44`,
          zIndex: 30,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 10 }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: selectedPin.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(selectedPin.icon, { size: 18, color: '#fff' })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, selectedPin.label),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Tap for full story'),
            ),
          ),
          React.createElement('div', {
            onClick: () => setSelectedPin(null),
            style: { cursor: 'pointer' }
          },
            React.createElement(window.lucide.X, { size: 18, color: t.textMuted })
          ),
        ),
        React.createElement('div', {
          style: {
            marginTop: 10, padding: '8px 12px',
            background: `${selectedPin.color}15`,
            borderRadius: 8,
            fontSize: 12, color: selectedPin.color, fontWeight: 600,
          }
        }, selectedPin.urgent ? 'High impact on your routes — tap to view details' : 'Low-medium impact — informational update'),
      ),
    ),
  );
}

// ─── ALERTS SCREEN ───────────────────────────────────────────────────────────

function AlertsScreen({ t }) {
  const [activeSection, setActiveSection] = useState('active');

  const activeAlerts = [
    {
      id: 1,
      type: 'urgent',
      icon: window.lucide.Train,
      color: t.primary,
      bg: t.primaryLight,
      title: 'Blue Line delays: 25 min',
      body: 'Signal failure at Central Station. Next unaffected departure: 10:15 AM',
      time: 'Just now',
      action: 'View alternatives',
    },
    {
      id: 2,
      type: 'urgent',
      icon: window.lucide.Droplets,
      color: t.danger,
      bg: t.dangerLight,
      title: 'Road closure: Oak Ave',
      body: 'Water main break between 3rd–5th St. Affects your Sunridge Daycare route.',
      time: '45 min ago',
      action: 'Reroute now',
    },
    {
      id: 3,
      type: 'warning',
      icon: window.lucide.CloudRain,
      color: t.warning,
      bg: t.warningLight,
      title: 'Flash flood watch until 6 PM',
      body: 'Riverside Drive flooding possible. Consider alternative route.',
      time: '1 hr ago',
      action: 'See map',
    },
  ];

  const pastAlerts = [
    {
      id: 4, icon: window.lucide.Wind, color: t.textMuted, bg: t.surfaceAlt,
      title: 'Wind advisory expired', time: 'Yesterday 8 PM',
    },
    {
      id: 5, icon: window.lucide.Bus, color: t.textMuted, bg: t.surfaceAlt,
      title: 'Bus 42 back to normal schedule', time: 'Yesterday 3 PM',
    },
    {
      id: 6, icon: window.lucide.Landmark, color: t.textMuted, bg: t.surfaceAlt,
      title: 'Council meeting rescheduled', time: 'Mon, Mar 20',
    },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: {
        background: t.surface,
        padding: '12px 20px 0',
        borderBottom: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Alerts'),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, '3 active near you'),
        ),
        React.createElement('div', {
          style: {
            background: t.danger,
            borderRadius: 20, padding: '4px 10px',
            display: 'flex', alignItems: 'center', gap: 4,
          }
        },
          React.createElement('div', { style: { width: 6, height: 6, borderRadius: 3, background: '#fff' } }),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#fff' } }, '3 Active'),
        ),
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 0 }
      },
        ['active', 'past'].map(s =>
          React.createElement('div', {
            key: s,
            onClick: () => setActiveSection(s),
            style: {
              flex: 1, textAlign: 'center',
              paddingBottom: 10, paddingTop: 4,
              fontSize: 13, fontWeight: 700,
              color: activeSection === s ? t.primary : t.textMuted,
              borderBottom: `2px solid ${activeSection === s ? t.primary : 'transparent'}`,
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.15s',
            }
          }, s === 'active' ? 'Active' : 'Past')
        )
      ),
    ),

    React.createElement('div', {
      style: { padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }
    },
      activeSection === 'active' ? activeAlerts.map(alert =>
        React.createElement('div', {
          key: alert.id,
          style: {
            background: t.card,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: `0 2px 12px ${t.shadow}`,
            border: `1px solid ${alert.color}33`,
          }
        },
          React.createElement('div', {
            style: {
              height: 3,
              background: `linear-gradient(90deg, ${alert.color}, ${alert.color}66)`,
            }
          }),
          React.createElement('div', { style: { padding: 14 } },
            React.createElement('div', {
              style: { display: 'flex', gap: 12, marginBottom: 10 }
            },
              React.createElement('div', {
                style: {
                  width: 38, height: 38, borderRadius: 12,
                  background: alert.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }
              },
                React.createElement(alert.icon, { size: 18, color: alert.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 }
                }, alert.title),
                React.createElement('div', {
                  style: { fontSize: 12, color: t.textSecondary, lineHeight: 1.4 }
                }, alert.body),
              ),
              React.createElement('div', {
                style: { fontSize: 10, color: t.textMuted, whiteSpace: 'nowrap' }
              }, alert.time),
            ),
            React.createElement('div', {
              style: {
                background: alert.color,
                borderRadius: 8, padding: '7px 12px',
                textAlign: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
                cursor: 'pointer',
              }
            }, alert.action),
          ),
        )
      ) : pastAlerts.map(alert =>
        React.createElement('div', {
          key: alert.id,
          style: {
            background: t.card,
            borderRadius: 14,
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
            border: `1px solid ${t.border}`,
            opacity: 0.7,
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: alert.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }
          },
            React.createElement(alert.icon, { size: 16, color: alert.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, alert.title),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, alert.time),
          ),
          React.createElement(window.lucide.CheckCircle, { size: 16, color: t.success }),
        )
      ),

      // Alert prefs card
      activeSection === 'active' && React.createElement('div', {
        style: {
          background: t.card,
          borderRadius: 16,
          padding: 14,
          border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        React.createElement('div', {
          style: {
            width: 38, height: 38, borderRadius: 12,
            background: t.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.Settings2, { size: 18, color: t.primary })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Alert Preferences'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Manage what disrupts your day'),
        ),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }),
      ),
    ),
  );
}

// ─── EXPLORE SCREEN ──────────────────────────────────────────────────────────

function ExploreScreen({ t }) {
  const [searchValue, setSearchValue] = useState('');

  const neighborhoods = [
    { name: 'Midtown', stories: 8, following: true, color: t.primary },
    { name: 'East Village', stories: 3, following: false, color: t.accent },
    { name: 'Riverside', stories: 5, following: true, color: t.success },
    { name: 'Downtown Core', stories: 12, following: false, color: t.warning },
  ];

  const routes = [
    { name: 'Home → Work', via: 'Blue Line + Route 7', status: 'delayed', statusColor: t.danger },
    { name: 'Home → Sunridge Daycare', via: 'Oak Ave route', status: 'disrupted', statusColor: t.danger },
    { name: 'Weekend Market Loop', via: 'Market St BRT', status: 'normal', statusColor: t.success },
  ];

  const trending = [
    { topic: '#CityStrike', count: '2.3k', tag: 'transit' },
    { topic: '#FloodWatch2026', count: '890', tag: 'weather' },
    { topic: '#MapleRezone', count: '445', tag: 'civic' },
    { topic: '#OakAveRepairs', count: '312', tag: 'safety' },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: {
        background: t.surface,
        padding: '12px 20px 14px',
        borderBottom: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 10 } }, 'Explore'),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.surfaceAlt,
          borderRadius: 12, padding: '9px 14px',
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
        React.createElement('span', { style: { fontSize: 13, color: t.textMuted } }, 'Search neighborhoods, routes…'),
      ),
    ),

    React.createElement('div', { style: { padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 18 } },

      // My Neighborhoods
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 10, display: 'flex', justifyContent: 'space-between' }
        },
          'Neighborhoods',
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, '+ Add'),
        ),
        React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', gap: 8 }
        },
          neighborhoods.map(n =>
            React.createElement('div', {
              key: n.name,
              style: {
                background: t.card,
                borderRadius: 14,
                padding: '11px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
                border: `1px solid ${t.border}`,
                cursor: 'pointer',
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10,
                  background: `${n.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(window.lucide.MapPin, { size: 16, color: n.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, n.name),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${n.stories} active stories`),
              ),
              n.following
                ? React.createElement('div', {
                  style: {
                    padding: '3px 8px', borderRadius: 8,
                    background: t.primaryLight, fontSize: 10,
                    fontWeight: 700, color: t.primary,
                  }
                }, 'Following')
                : React.createElement('div', {
                  style: {
                    padding: '3px 8px', borderRadius: 8,
                    background: t.surfaceAlt, fontSize: 10,
                    fontWeight: 700, color: t.textSecondary,
                    border: `1px solid ${t.border}`,
                  }
                }, 'Follow'),
            )
          )
        ),
      ),

      // My Routes
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 10, display: 'flex', justifyContent: 'space-between' }
        },
          'My Routes',
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, '+ Add'),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          routes.map(r =>
            React.createElement('div', {
              key: r.name,
              style: {
                background: t.card,
                borderRadius: 14,
                padding: '11px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10,
                  background: `${r.statusColor}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(window.lucide.Navigation, { size: 16, color: r.statusColor })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, r.name),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, r.via),
              ),
              React.createElement('div', {
                style: {
                  padding: '3px 8px', borderRadius: 8,
                  background: `${r.statusColor}20`,
                  fontSize: 10, fontWeight: 700, color: r.statusColor,
                  textTransform: 'capitalize',
                }
              }, r.status),
            )
          )
        ),
      ),

      // Trending topics
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 10 } }, 'Trending in Your Area'),
        React.createElement('div', {
          style: { display: 'flex', flexWrap: 'wrap', gap: 8 }
        },
          trending.map(tr =>
            React.createElement('div', {
              key: tr.topic,
              style: {
                background: t.card,
                borderRadius: 20, padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: 6,
                border: `1px solid ${t.border}`,
                cursor: 'pointer',
              }
            },
              React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, tr.topic),
              React.createElement('span', {
                style: {
                  fontSize: 10, color: t.textMuted,
                  background: t.surfaceAlt, borderRadius: 6,
                  padding: '1px 5px',
                }
              }, tr.count),
            )
          )
        ),
      ),
    ),
  );
}

// ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────

function SettingsScreen({ t, isDark, setIsDark }) {
  const [notifTransit, setNotifTransit] = useState(true);
  const [notifWeather, setNotifWeather] = useState(true);
  const [notifCivic, setNotifCivic] = useState(false);
  const [radiusMi, setRadiusMi] = useState(5);

  const Toggle = ({ value, onChange, color }) => React.createElement('div', {
    onClick: () => onChange(!value),
    style: {
      width: 44, height: 24, borderRadius: 12,
      background: value ? (color || t.primary) : t.border,
      position: 'relative', cursor: 'pointer',
      transition: 'background 0.2s',
      flexShrink: 0,
    }
  },
    React.createElement('div', {
      style: {
        position: 'absolute',
        top: 2,
        left: value ? 22 : 2,
        width: 20, height: 20,
        borderRadius: 10,
        background: '#fff',
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }
    })
  );

  const SettingRow = ({ icon: Icon, label, sub, right, color }) =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 0',
        borderBottom: `1px solid ${t.borderLight}`,
      }
    },
      React.createElement('div', {
        style: {
          width: 34, height: 34, borderRadius: 10,
          background: `${color || t.primary}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }
      },
        React.createElement(Icon, { size: 16, color: color || t.primary })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, label),
        sub && React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, sub),
      ),
      right,
    );

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg }
  },
    // Profile header
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
        padding: '20px 20px 24px',
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 14 }
      },
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: 28,
            background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.5)',
          }
        },
          React.createElement(window.lucide.User, { size: 26, color: '#fff' })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: '#fff' } }, 'Alex Johnson'),
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 } }, 'Midtown · 4 routes · 2 neighborhoods'),
        ),
        React.createElement('div', {
          style: {
            marginLeft: 'auto',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 10, padding: '6px 10px',
            fontSize: 11, fontWeight: 700, color: '#fff',
          }
        }, 'Edit'),
      ),

      // Stats
      React.createElement('div', {
        style: {
          display: 'flex', gap: 0,
          marginTop: 16,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 12,
          overflow: 'hidden',
        }
      },
        [
          { label: 'Stories Read', val: '248' },
          { label: 'Alerts Received', val: '31' },
          { label: 'Disruptions Avoided', val: '12' },
        ].map((stat, i, arr) =>
          React.createElement('div', {
            key: stat.label,
            style: {
              flex: 1, textAlign: 'center', padding: '8px 4px',
              borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }
          },
            React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: '#fff' } }, stat.val),
            React.createElement('div', { style: { fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginTop: 1 } }, stat.label),
          )
        )
      ),
    ),

    React.createElement('div', { style: { padding: '0 16px 20px' } },

      // Appearance
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16,
          padding: '4px 14px',
          marginTop: 14,
          boxShadow: `0 2px 8px ${t.shadow}`,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', padding: '10px 0 4px' }
        }, 'Appearance'),
        React.createElement(SettingRow, {
          icon: isDark ? window.lucide.Moon : window.lucide.Sun,
          label: 'Dark Mode',
          sub: isDark ? 'Currently dark' : 'Currently light',
          color: isDark ? t.warning : t.primary,
          right: React.createElement(Toggle, { value: isDark, onChange: setIsDark }),
        }),
      ),

      // Notifications
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16,
          padding: '4px 14px',
          marginTop: 10,
          boxShadow: `0 2px 8px ${t.shadow}`,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', padding: '10px 0 4px' }
        }, 'Notifications'),
        React.createElement(SettingRow, {
          icon: window.lucide.Train, label: 'Transit alerts', sub: 'Delays, closures, reroutes',
          color: t.primary,
          right: React.createElement(Toggle, { value: notifTransit, onChange: setNotifTransit }),
        }),
        React.createElement(SettingRow, {
          icon: window.lucide.CloudRain, label: 'Weather alerts', sub: 'Storms, flood watches',
          color: t.warning,
          right: React.createElement(Toggle, { value: notifWeather, onChange: setNotifWeather }),
        }),
        React.createElement(SettingRow, {
          icon: window.lucide.Landmark, label: 'Civic updates', sub: 'Council, policy, permits',
          color: t.success,
          right: React.createElement(Toggle, { value: notifCivic, onChange: setNotifCivic }),
        }),
      ),

      // Radius
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16,
          padding: '12px 14px',
          marginTop: 10,
          boxShadow: `0 2px 8px ${t.shadow}`,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Alert Radius'),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'How far to scan for news'),
          ),
          React.createElement('div', {
            style: {
              background: t.primaryLight, borderRadius: 8,
              padding: '4px 10px', fontSize: 14, fontWeight: 800, color: t.primary,
            }
          }, `${radiusMi} mi`),
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 6 }
        },
          [1, 2, 5, 10, 20].map(r =>
            React.createElement('div', {
              key: r,
              onClick: () => setRadiusMi(r),
              style: {
                flex: 1, textAlign: 'center',
                padding: '6px 0',
                borderRadius: 8,
                fontSize: 12, fontWeight: 700,
                cursor: 'pointer',
                background: radiusMi === r ? t.primary : t.surfaceAlt,
                color: radiusMi === r ? '#fff' : t.textSecondary,
                border: `1px solid ${radiusMi === r ? t.primary : t.border}`,
                transition: 'all 0.15s',
              }
            }, `${r}`)
          )
        ),
      ),

      // Account
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16,
          padding: '4px 14px',
          marginTop: 10,
          boxShadow: `0 2px 8px ${t.shadow}`,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', padding: '10px 0 4px' }
        }, 'Account'),
        React.createElement(SettingRow, {
          icon: window.lucide.MapPinned, label: 'Manage Addresses', sub: 'Home, work, saved places',
          color: t.accent,
          right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }),
        }),
        React.createElement(SettingRow, {
          icon: window.lucide.Shield, label: 'Privacy & Data', sub: 'Location usage, history',
          color: t.success,
          right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }),
        }),
        React.createElement(SettingRow, {
          icon: window.lucide.HelpCircle, label: 'Help & Feedback',
          color: t.warning,
          right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }),
        }),
      ),
    ),
  );
}
