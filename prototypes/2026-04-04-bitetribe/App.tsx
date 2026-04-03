const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F5EFE6',
    primary: '#E05C3A',
    primaryLight: '#F4A98A',
    primaryDark: '#B8432A',
    accent: '#2D4A3E',
    text: '#1A1A1A',
    textSecondary: '#6B5E52',
    textMuted: '#9B8F86',
    border: '#E8DDD4',
    navBg: '#FFFFFF',
    cardBg: '#FFFFFF',
    tag: '#FDF0EB',
    tagText: '#E05C3A',
    mapBg: '#E8E0D5',
    statusBar: '#1A1A1A',
  },
  dark: {
    bg: '#1A1410',
    surface: '#26201A',
    surfaceAlt: '#312820',
    primary: '#F07050',
    primaryLight: '#F4A98A',
    primaryDark: '#C85030',
    accent: '#5B9A7E',
    text: '#F5EEE6',
    textSecondary: '#C4B8AD',
    textMuted: '#7A6E65',
    border: '#3D3028',
    navBg: '#1E1812',
    cardBg: '#26201A',
    tag: '#3D2518',
    tagText: '#F07050',
    mapBg: '#2A221A',
    statusBar: '#F5EEE6',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [activeStreak, setActiveStreak] = useState(7);
  const [likedDishes, setLikedDishes] = useState({});
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'map', label: 'Map', icon: window.lucide.Map },
    { id: 'pods', label: 'Pods', icon: window.lucide.Users },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    map: MapScreen,
    pods: PodsScreen,
    discover: DiscoverScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
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
          paddingLeft: 24,
          paddingRight: 20,
          paddingBottom: 8,
          flexShrink: 0,
          background: t.bg,
          zIndex: 10,
        }
      },
        React.createElement('span', {
          style: { fontSize: 13, fontWeight: 600, color: t.statusBar, fontFamily: "'Inter', sans-serif" }
        }, '9:41'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Battery, { size: 18, color: t.statusBar }),
        )
      ),
      // Main content
      React.createElement('div', {
        style: {
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }
      },
        React.createElement(ActiveScreen, { t, isDark, setIsDark, activeStreak, likedDishes, setLikedDishes })
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
          paddingBottom: 12,
          paddingTop: 8,
          flexShrink: 0,
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
              transition: 'all 0.2s',
              transform: pressedTab === tab.id ? 'scale(0.92)' : 'scale(1)',
            },
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            onTouchStart: () => setPressedTab(tab.id),
            onTouchEnd: () => setPressedTab(null),
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: 0.3,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}

// ---- HOME SCREEN ----
function HomeScreen({ t, likedDishes, setLikedDishes }) {
  const [streakPop, setStreakPop] = useState(false);

  const dishes = [
    {
      id: 1,
      name: "Grandma's Jerk Chicken",
      chef: 'Marvella P.',
      neighborhood: 'Crown Heights',
      heritage: 'Jamaican',
      streak: 3,
      rating: 4.9,
      tasteCount: 34,
      color: '#E8C5B0',
      emoji: '🍗',
      story: 'Recipe passed down 4 generations',
    },
    {
      id: 2,
      name: 'Secret Mapo Tofu',
      chef: 'Wei & Sons',
      neighborhood: 'Flushing',
      heritage: 'Sichuan',
      streak: 5,
      rating: 5.0,
      tasteCount: 67,
      color: '#C8D8C0',
      emoji: '🥢',
      story: '1940s Chengdu original',
    },
    {
      id: 3,
      name: 'Birria Consommé',
      chef: 'La Familia Ruiz',
      neighborhood: 'Bushwick',
      heritage: 'Jalisco',
      streak: 2,
      rating: 4.8,
      tasteCount: 52,
      color: '#DCC8B0',
      emoji: '🌮',
      story: 'Sunday ritual since 1987',
    },
  ];

  return React.createElement('div', {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: t.bg,
      paddingBottom: 16,
    }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '8px 24px 16px',
        background: t.bg,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: {
              fontSize: 11,
              fontFamily: "'Inter', sans-serif",
              color: t.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 4,
            }
          }, 'Saturday, April 4'),
          React.createElement('h1', {
            style: {
              fontFamily: "'Playfair Display', serif",
              fontSize: 30,
              fontWeight: 900,
              color: t.text,
              lineHeight: 1.1,
            }
          }, 'Your\nFood Tribe')
        ),
        React.createElement('div', {
          style: {
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: t.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }
        },
          React.createElement('span', { style: { fontSize: 20 } }, '🧑🏽‍🍳')
        )
      )
    ),

    // Streak Banner
    React.createElement('div', {
      style: {
        margin: '0 24px 20px',
        background: t.primary,
        borderRadius: 20,
        padding: '18px 20px',
        cursor: 'pointer',
        transform: streakPop ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.15s',
        position: 'relative',
        overflow: 'hidden',
      },
      onClick: () => { setStreakPop(true); setTimeout(() => setStreakPop(false), 150); }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -20, right: -20, width: 100, height: 100,
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }
          }, 'Current Streak'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6 } },
            React.createElement('span', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: '#FFF', lineHeight: 1 }
            }, '7'),
            React.createElement('span', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }
            }, 'days')
          ),
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', {
            style: { fontSize: 32, marginBottom: 4 }
          }, '🔥'),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.75)' }
          }, 'Taste today\nto keep it alive')
        )
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 6, marginTop: 14 }
      },
        ['M','T','W','T','F','S','S'].map((day, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              textAlign: 'center',
            }
          },
            React.createElement('div', {
              style: {
                height: 28,
                borderRadius: 6,
                background: i < 7 ? (i < 5 ? 'rgba(255,255,255,0.9)' : i === 6 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.4)') : 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
              }
            },
              i < 5 ? React.createElement('span', { style: { fontSize: 12 } }, '✓') : null
            ),
            React.createElement('span', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.7)' }
            }, day)
          )
        )
      )
    ),

    // Section: Featured Heirlooms
    React.createElement('div', { style: { padding: '0 24px', marginBottom: 8 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
        React.createElement('h2', {
          style: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: t.text,
          }
        }, 'Heirloom Dishes'),
        React.createElement('span', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.primary, fontWeight: 500 }
        }, 'See all →')
      ),
      React.createElement('p', {
        style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 2 }
      }, 'Taste to unlock secret recipes')
    ),

    // Angled overlapping cards
    React.createElement('div', {
      style: { position: 'relative', height: 240, marginLeft: 24, marginRight: 24, marginBottom: 24 }
    },
      dishes.slice(0, 3).map((dish, i) =>
        React.createElement('div', {
          key: dish.id,
          style: {
            position: 'absolute',
            width: i === 0 ? 220 : i === 1 ? 210 : 200,
            background: t.cardBg,
            borderRadius: 20,
            padding: '14px 16px',
            boxShadow: `0 ${4 + i * 3}px ${12 + i * 6}px rgba(0,0,0,${0.08 + i * 0.03})`,
            border: `1px solid ${t.border}`,
            top: i === 0 ? 0 : i === 1 ? 20 : 40,
            left: i === 0 ? 0 : i === 1 ? 80 : 145,
            transform: `rotate(${i === 0 ? '-3deg' : i === 1 ? '1.5deg' : '4deg'})`,
            zIndex: 3 - i,
            cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: '100%', height: 80, borderRadius: 12,
              background: dish.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 10, fontSize: 36,
            }
          }, dish.emoji),
          React.createElement('div', {
            style: {
              display: 'inline-block', background: t.tag, borderRadius: 6, padding: '2px 8px', marginBottom: 6
            }
          },
            React.createElement('span', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 10, color: t.tagText, fontWeight: 600, letterSpacing: 1 }
            }, dish.heritage.toUpperCase())
          ),
          React.createElement('p', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 }
          }, dish.name),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted }
          }, `${dish.chef} · ${dish.neighborhood}`),
        )
      )
    ),

    // Quick Stats Row
    React.createElement('div', {
      style: { display: 'flex', gap: 12, padding: '0 24px', marginBottom: 24 }
    },
      [
        { label: 'Dishes Tasted', value: '42', icon: '🍽️' },
        { label: 'Tribe Members', value: '128', icon: '🫂' },
        { label: 'Recipes Unlocked', value: '6', icon: '📜' },
      ].map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            flex: 1, background: t.surface, borderRadius: 16, padding: '12px 10px',
            textAlign: 'center', border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { fontSize: 20, marginBottom: 4 } }, stat.icon),
          React.createElement('p', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text }
          }, stat.value),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 10, color: t.textMuted }
          }, stat.label)
        )
      )
    ),

    // Story Snippets
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('h2', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, 'Fresh Stories'),
      [
        { chef: 'Marvella P.', time: '2h ago', text: 'My grandmother brought this recipe from Kingston in 1962. The secret is the Scotch bonnet ratio…', emoji: '🍗' },
        { chef: 'Wei Chen', time: '5h ago', text: 'Sichuan peppercorns must be toasted for exactly 90 seconds. That\'s the lineage secret.', emoji: '🌶️' },
      ].map((story, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surface, borderRadius: 18, padding: '14px 16px', marginBottom: 12,
            border: `1px solid ${t.border}`, display: 'flex', gap: 12, alignItems: 'flex-start',
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: '50%', background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22,
            }
          }, story.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
              React.createElement('span', {
                style: { fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: t.text }
              }, story.chef),
              React.createElement('span', {
                style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted }
              }, story.time)
            ),
            React.createElement('p', {
              style: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 13, color: t.textSecondary, lineHeight: 1.5 }
            }, `"${story.text}"`),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }
            },
              React.createElement(window.lucide.Play, { size: 14, color: t.primary }),
              React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.primary, fontWeight: 500 } }, 'Play audio story')
            )
          )
        )
      )
    )
  );
}

// ---- MAP SCREEN ----
function MapScreen({ t }) {
  const [activeLayer, setActiveLayer] = useState('all');

  const layers = [
    { id: 'all', label: 'All', color: t.primary },
    { id: 'heirloom', label: 'Heirlooms', color: '#8B5E3C' },
    { id: 'hidden', label: 'Hidden', color: '#3D7A5A' },
    { id: 'trending', label: 'Trending', color: '#C44B2A' },
  ];

  const spots = [
    { id: 1, name: "Marvella's Kitchen", cuisine: 'Jamaican', x: 120, y: 160, size: 'large', unlocked: true, emoji: '🍗' },
    { id: 2, name: 'Wei Family', cuisine: 'Sichuan', x: 240, y: 110, size: 'medium', unlocked: true, emoji: '🥢' },
    { id: 3, name: 'La Ruiz', cuisine: 'Jalisco', x: 80, y: 250, size: 'medium', unlocked: true, emoji: '🌮' },
    { id: 4, name: '???', cuisine: 'Unknown', x: 190, y: 210, size: 'small', unlocked: false, emoji: '🔒' },
    { id: 5, name: 'Nana Osei', cuisine: 'Ghanaian', x: 290, y: 200, size: 'small', unlocked: false, emoji: '🔒' },
    { id: 6, name: 'Babcia Zofia', cuisine: 'Polish', x: 155, y: 310, size: 'medium', unlocked: true, emoji: '🥟' },
  ];

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    React.createElement('div', { style: { padding: '8px 24px 12px' } },
      React.createElement('h1', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: t.text }
      }, 'Cultural Map'),
      React.createElement('p', {
        style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 2 }
      }, 'Your neighborhood\'s culinary atlas')
    ),

    // Layer filters
    React.createElement('div', {
      style: { display: 'flex', gap: 8, padding: '0 24px', marginBottom: 16, overflowX: 'auto' }
    },
      layers.map(layer =>
        React.createElement('button', {
          key: layer.id,
          onClick: () => setActiveLayer(layer.id),
          style: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: 20,
            border: `1.5px solid ${activeLayer === layer.id ? layer.color : t.border}`,
            background: activeLayer === layer.id ? layer.color : 'transparent',
            color: activeLayer === layer.id ? '#FFF' : t.textSecondary,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }
        }, layer.label)
      )
    ),

    // Map Area
    React.createElement('div', {
      style: {
        margin: '0 24px', borderRadius: 24, overflow: 'hidden',
        border: `1px solid ${t.border}`, position: 'relative', marginBottom: 20,
      }
    },
      React.createElement('div', {
        style: {
          width: '100%', height: 340, background: t.mapBg, position: 'relative',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 30px, ${t.border}40 30px, ${t.border}40 31px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, ${t.border}40 30px, ${t.border}40 31px)
          `,
        }
      },
        // Map blobs (neighborhoods)
        React.createElement('div', {
          style: {
            position: 'absolute', width: 160, height: 120, borderRadius: '60% 40% 55% 45%',
            background: `${t.primaryLight}30`, border: `1.5px solid ${t.primaryLight}60`,
            top: 80, left: 60,
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', width: 130, height: 100, borderRadius: '45% 55% 40% 60%',
            background: `${t.accent}20`, border: `1.5px solid ${t.accent}40`,
            top: 60, left: 190,
          }
        }),
        // Spots
        ...spots.map(spot =>
          React.createElement('div', {
            key: spot.id,
            style: {
              position: 'absolute',
              left: spot.x,
              top: spot.y,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: spot.size === 'large' ? 52 : spot.size === 'medium' ? 44 : 36,
                height: spot.size === 'large' ? 52 : spot.size === 'medium' ? 44 : 36,
                borderRadius: '50%',
                background: spot.unlocked ? t.surface : t.surfaceAlt,
                border: `2.5px solid ${spot.unlocked ? t.primary : t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: spot.size === 'large' ? 22 : spot.size === 'medium' ? 18 : 14,
                boxShadow: spot.unlocked ? `0 4px 12px ${t.primary}40` : 'none',
              }
            }, spot.emoji),
            spot.unlocked && React.createElement('div', {
              style: {
                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                background: t.text, borderRadius: 8, padding: '3px 8px', marginTop: 4, whiteSpace: 'nowrap',
              }
            },
              React.createElement('span', {
                style: { fontFamily: "'Inter', sans-serif", fontSize: 9, color: t.bg, fontWeight: 600 }
              }, spot.name)
            )
          )
        ),
        // You are here
        React.createElement('div', {
          style: {
            position: 'absolute', left: 175, top: 270,
            width: 16, height: 16, borderRadius: '50%',
            background: '#4A90E2', border: '3px solid #FFF',
            boxShadow: '0 0 0 6px rgba(74,144,226,0.25)',
          }
        })
      )
    ),

    // Nearby Unlockable
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('h2', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 }
      }, 'Unlock Nearby'),
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', gap: 14,
        }
      },
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: 16, background: t.surfaceAlt,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }
        }, '🔒'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: t.text }
          }, 'Mystery Kitchen'),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 2 }
          }, 'Taste 2 more dishes to reveal'),
          React.createElement('div', {
            style: { display: 'flex', gap: 4, marginTop: 8 }
          },
            [1,2,3].map(i =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: 1, height: 4, borderRadius: 4,
                  background: i <= 1 ? t.primary : t.border,
                }
              })
            )
          )
        )
      )
    )
  );
}

// ---- PODS SCREEN ----
function PodsScreen({ t }) {
  const [joinedPod, setJoinedPod] = useState(null);

  const myPod = {
    name: 'Flavor Wanderers',
    members: 5,
    nextTasting: 'Sun, Apr 7 · 3PM',
    location: 'Prospect Park, BK',
    streak: 12,
    dishes: ['🍗', '🌮', '🥟', '🍜', '🥘'],
  };

  const pods = [
    {
      id: 1, name: 'Heritage Hunters', members: 8, cuisine: 'Diverse',
      nextEvent: 'Sat, Apr 5', description: 'Seeking family recipes and stories from 6+ generations',
      tags: ['#heirloom', '#stories'], active: true,
    },
    {
      id: 2, name: 'Spice Seekers', members: 6, cuisine: 'South Asian',
      nextEvent: 'Mon, Apr 8', description: 'Navigating heat levels and regional spice traditions',
      tags: ['#spicy', '#authentic'], active: false,
    },
    {
      id: 3, name: 'Dumpling Dynasty', members: 11, cuisine: 'East Asian',
      nextEvent: 'Fri, Apr 11', description: 'Every fold tells a story. On a quest for the perfect wrap.',
      tags: ['#dumplings', '#craft'], active: false,
    },
  ];

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 16 }
  },
    React.createElement('div', { style: { padding: '8px 24px 16px' } },
      React.createElement('h1', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: t.text }
      }, 'Meal Pods'),
      React.createElement('p', {
        style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted }
      }, 'Your food squads')
    ),

    // My Pod - featured card at angle
    React.createElement('div', { style: { padding: '0 24px', marginBottom: 24 } },
      React.createElement('p', {
        style: { fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: t.textMuted, marginBottom: 10 }
      }, 'Your Active Pod'),
      React.createElement('div', {
        style: {
          background: t.primary, borderRadius: 24, padding: '20px', position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }
        }),
        React.createElement('div', {
          style: { position: 'absolute', bottom: -20, left: 80, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, textTransform: 'uppercase' }
            }, 'Pod'),
            React.createElement('h2', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: '#FFF' }
            }, myPod.name)
          ),
          React.createElement('div', {
            style: { textAlign: 'right' }
          },
            React.createElement('p', { style: { fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: '#FFF', lineHeight: 1 } }, myPod.streak),
            React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.7)' } }, 'day streak')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: -8, marginBottom: 12 } },
          myPod.dishes.map((dish, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, marginLeft: i > 0 ? -8 : 0, border: '2px solid rgba(255,255,255,0.5)',
              }
            }, dish)
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('div', null,
            React.createElement(window.lucide.Calendar, { size: 14, color: 'rgba(255,255,255,0.8)' }),
          ),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.85)' }
          }, myPod.nextTasting),
        ),
        React.createElement('p', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4 }
        }, `📍 ${myPod.location} · ${myPod.members} members`)
      )
    ),

    // Discover Pods
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 } },
        React.createElement('h2', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: t.text }
        }, 'Discover Pods'),
        React.createElement('span', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.primary, fontWeight: 500 }
        }, 'Filter →')
      ),
      pods.map(pod =>
        React.createElement('div', {
          key: pod.id,
          style: {
            background: t.surface, borderRadius: 20, padding: '16px', marginBottom: 12,
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement('h3', {
                style: { fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: t.text }
              }, pod.name),
              React.createElement('p', {
                style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted, marginTop: 2 }
              }, `${pod.members} members · ${pod.cuisine}`)
            ),
            React.createElement('button', {
              onClick: () => setJoinedPod(joinedPod === pod.id ? null : pod.id),
              style: {
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
                padding: '6px 14px', borderRadius: 20,
                background: joinedPod === pod.id ? t.primary : 'transparent',
                color: joinedPod === pod.id ? '#FFF' : t.primary,
                border: `1.5px solid ${t.primary}`,
                cursor: 'pointer', transition: 'all 0.2s',
              }
            }, joinedPod === pod.id ? 'Joined ✓' : 'Join')
          ),
          React.createElement('p', {
            style: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 13, color: t.textSecondary, lineHeight: 1.5, marginBottom: 10 }
          }, `"${pod.description}"`),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              pod.tags.map(tag =>
                React.createElement('span', {
                  key: tag,
                  style: {
                    fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500,
                    background: t.tag, color: t.tagText, padding: '3px 8px', borderRadius: 10,
                  }
                }, tag)
              )
            ),
            React.createElement('span', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted }
            }, `Next: ${pod.nextEvent}`)
          )
        )
      )
    )
  );
}

// ---- DISCOVER SCREEN ----
function DiscoverScreen({ t, likedDishes, setLikedDishes }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Caribbean', 'Asian', 'Latin', 'African', 'European'];

  const dishes = [
    { id: 1, name: "Oxtail Stew", chef: 'Delroy A.', hood: 'Flatbush', cuisine: 'Caribbean', streak: 4, rating: 4.9, color: '#D4A89A', emoji: '🍖', locked: false },
    { id: 2, name: 'Pho Bo Dac Biet', chef: 'Nguyen Family', hood: 'Sunset Park', cuisine: 'Asian', streak: 6, rating: 5.0, color: '#A8C4B8', emoji: '🍜', locked: false },
    { id: 3, name: 'Egusi Soup', chef: 'Mama Chioma', hood: 'Bronx', cuisine: 'African', streak: 2, rating: 4.8, color: '#D4B896', emoji: '🥘', locked: true },
    { id: 4, name: 'Pierogi Ruskie', chef: 'Babcia Zofia', hood: 'Greenpoint', cuisine: 'European', streak: 8, rating: 4.9, color: '#C8C4D4', emoji: '🥟', locked: false },
    { id: 5, name: 'Birria Consommé', chef: 'La Familia Ruiz', hood: 'Bushwick', cuisine: 'Latin', streak: 3, rating: 4.7, color: '#D4B8A0', emoji: '🌮', locked: false },
    { id: 6, name: 'Mapo Tofu Special', chef: 'Wei Family', hood: 'Flushing', cuisine: 'Asian', streak: 5, rating: 5.0, color: '#C0CCC0', emoji: '🥢', locked: true },
  ];

  const filtered = activeFilter === 'All' ? dishes : dishes.filter(d => d.cuisine === activeFilter);

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 16 }
  },
    React.createElement('div', { style: { padding: '8px 24px 12px' } },
      React.createElement('h1', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: t.text }
      }, 'Discover'),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, background: t.surface, borderRadius: 14, padding: '10px 14px', border: `1px solid ${t.border}` }
      },
        React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
        React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 14, color: t.textMuted } }, 'Search heirloom dishes…')
      )
    ),
    // Filters
    React.createElement('div', {
      style: { display: 'flex', gap: 8, padding: '8px 24px', overflowX: 'auto', marginBottom: 8 }
    },
      filters.map(f =>
        React.createElement('button', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
            padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activeFilter === f ? t.primary : t.border}`,
            background: activeFilter === f ? t.primary : 'transparent',
            color: activeFilter === f ? '#FFF' : t.textSecondary,
            cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
          }
        }, f)
      )
    ),

    // Angled featured cards at top
    React.createElement('div', {
      style: { position: 'relative', height: 200, margin: '0 24px', marginBottom: 24 }
    },
      filtered.slice(0, 2).map((dish, i) =>
        React.createElement('div', {
          key: dish.id,
          style: {
            position: 'absolute',
            width: 160, borderRadius: 20, padding: '16px',
            background: t.cardBg, border: `1px solid ${t.border}`,
            boxShadow: `0 ${4 + i * 4}px ${12 + i * 8}px rgba(0,0,0,${0.07 + i * 0.03})`,
            top: i === 0 ? 0 : 20, left: i === 0 ? 0 : 150,
            transform: `rotate(${i === 0 ? '-2.5deg' : '3deg'})`,
            zIndex: 2 - i,
          }
        },
          React.createElement('div', {
            style: {
              width: '100%', height: 80, borderRadius: 14,
              background: dish.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, marginBottom: 10,
            }
          }, dish.locked ? '🔒' : dish.emoji),
          React.createElement('p', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: t.text }
          }, dish.name),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted, marginTop: 2 }
          }, dish.chef),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 } },
            React.createElement('span', { style: { fontSize: 12 } }, '⭐'),
            React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.text, fontWeight: 600 } }, dish.rating)
          )
        )
      )
    ),

    // List
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('h2', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, `${filtered.length} Dishes Found`),
      filtered.map(dish =>
        React.createElement('div', {
          key: dish.id,
          style: {
            background: t.surface, borderRadius: 20, padding: '14px', marginBottom: 12,
            border: `1px solid ${t.border}`, display: 'flex', gap: 14, alignItems: 'center',
          }
        },
          React.createElement('div', {
            style: {
              width: 56, height: 56, borderRadius: 16, background: dish.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0,
            }
          }, dish.locked ? '🔒' : dish.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
              React.createElement('p', {
                style: { fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: t.text }
              }, dish.name),
              React.createElement('div', {
                onClick: () => setLikedDishes(prev => ({ ...prev, [dish.id]: !prev[dish.id] })),
                style: { cursor: 'pointer' }
              },
                React.createElement(window.lucide.Heart, {
                  size: 18,
                  color: likedDishes[dish.id] ? t.primary : t.textMuted,
                  fill: likedDishes[dish.id] ? t.primary : 'none',
                })
              )
            ),
            React.createElement('p', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 2 }
            }, `${dish.chef} · ${dish.hood}`),
            React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 6, alignItems: 'center' } },
              React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.primary, fontWeight: 500 } }, `🔥 ${dish.streak} streak`),
              React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted } }, `⭐ ${dish.rating}`),
              dish.locked && React.createElement('span', {
                style: {
                  fontFamily: "'Inter', sans-serif", fontSize: 10, background: t.tag, color: t.tagText,
                  padding: '2px 8px', borderRadius: 8, fontWeight: 500,
                }
              }, 'Locked')
            )
          )
        )
      )
    )
  );
}

// ---- PROFILE SCREEN ----
function ProfileScreen({ t, isDark, setIsDark, activeStreak }) {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  const badges = [
    { emoji: '🏆', name: 'Week Warrior', desc: '7-day streak' },
    { emoji: '🗺️', name: 'Map Pioneer', desc: '5 areas explored' },
    { emoji: '📜', name: 'Recipe Keeper', desc: '3 heirlooms unlocked' },
    { emoji: '🫂', name: 'Pod Leader', desc: 'Founded a Pod' },
    { emoji: '🌶️', name: 'Spice Sage', desc: 'Taste 10 spicy dishes' },
    { emoji: '🔒', name: '???', desc: 'Keep tasting to unlock' },
  ];

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 16 }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '12px 24px 20px', background: t.bg,
        borderBottom: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 16 } },
        React.createElement('div', {
          style: {
            width: 70, height: 70, borderRadius: 22, background: t.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
            flexShrink: 0, border: `3px solid ${t.primaryLight}`,
          }
        }, '🧑🏽‍🍳'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h1', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: t.text }
          }, 'Marcus Rivera'),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 2 }
          }, 'Brooklyn · Flavor Wanderers Pod'),
          React.createElement('div', {
            style: {
              display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8,
              background: t.tag, borderRadius: 10, padding: '4px 10px',
            }
          },
            React.createElement('span', { style: { fontSize: 14 } }, '🔥'),
            React.createElement('span', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: t.tagText }
            }, `${activeStreak} day streak`)
          )
        )
      ),
      // Stats row
      React.createElement('div', {
        style: { display: 'flex', gap: 0, marginTop: 18, background: t.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}` }
      },
        [
          { label: 'Dishes', value: '42' },
          { label: 'Recipes', value: '6' },
          { label: 'Tribes', value: '2' },
          { label: 'Stories', value: '18' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, textAlign: 'center', padding: '12px 0',
              borderRight: i < 3 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('p', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: t.text }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 10, color: t.textMuted }
            }, stat.label)
          )
        )
      )
    ),

    // Badges
    React.createElement('div', { style: { padding: '20px 24px' } },
      React.createElement('h2', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, 'Badges Earned'),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }
      },
        badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: badge.name === '???' ? t.surfaceAlt : t.surface,
              borderRadius: 16, padding: '12px 10px', textAlign: 'center',
              border: `1px solid ${t.border}`,
              opacity: badge.name === '???' ? 0.6 : 1,
            }
          },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 6 } }, badge.emoji),
            React.createElement('p', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: t.text, marginBottom: 2 }
            }, badge.name),
            React.createElement('p', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 9, color: t.textMuted }
            }, badge.desc)
          )
        )
      )
    ),

    // Settings
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('h2', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, 'Settings'),
      [
        {
          label: 'Dark Mode', icon: window.lucide.Moon, value: isDark,
          onToggle: () => setIsDark(!isDark),
        },
        {
          label: 'Notifications', icon: window.lucide.Bell, value: notifications,
          onToggle: () => setNotifications(!notifications),
        },
        {
          label: 'Location', icon: window.lucide.MapPin, value: location,
          onToggle: () => setLocation(!location),
        },
      ].map((setting, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px', background: t.surface, borderRadius: 16,
            marginBottom: 8, border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement(setting.icon, { size: 18, color: t.primary }),
            React.createElement('span', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: t.text }
            }, setting.label)
          ),
          React.createElement('div', {
            onClick: setting.onToggle,
            style: {
              width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
              background: setting.value ? t.primary : t.border,
              position: 'relative', transition: 'background 0.25s',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3, left: setting.value ? 21 : 3,
                width: 20, height: 20, borderRadius: '50%',
                background: '#FFF', transition: 'left 0.25s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }
            })
          )
        )
      ),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '16px', marginTop: 8, cursor: 'pointer',
        }
      },
        React.createElement(window.lucide.LogOut, { size: 16, color: t.textMuted }),
        React.createElement('span', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 14, color: t.textMuted }
        }, 'Sign Out')
      )
    )
  );
}
