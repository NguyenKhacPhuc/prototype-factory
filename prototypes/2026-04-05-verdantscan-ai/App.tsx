const { useState, useEffect, useRef, useCallback } = React;

const icons = window.lucide;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showScanResult, setShowScanResult] = useState(false);
  const [thriveScore, setThriveScore] = useState(78);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [tabTransition, setTabTransition] = useState(false);
  const [previousScreen, setPreviousScreen] = useState('home');
  const [notificationCount, setNotificationCount] = useState(3);
  const [likedPosts, setLikedPosts] = useState({});
  const [scanProgress, setScanProgress] = useState(0);

  const theme = {
    primary: '#2979FF',
    secondary: '#FF5252',
    cta: '#EC4899',
    bg: darkMode ? '#121212' : '#FAFAFA',
    card: darkMode ? '#1E1E1E' : '#FFFFFF',
    text: darkMode ? '#FFFFFF' : '#1C1C1E',
    textSecondary: darkMode ? '#A0A0A0' : '#8E8E93',
    border: darkMode ? '#333333' : '#E5E5EA',
    surface: darkMode ? '#2C2C2E' : '#F2F2F7',
  };

  const fontFamily = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

  useEffect(() => {
    if (activeScreen === 'home') {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        if (current >= thriveScore) {
          current = thriveScore;
          clearInterval(interval);
        }
        setAnimatedScore(current);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [activeScreen, thriveScore]);

  useEffect(() => {
    if (scanAnimation) {
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setScanAnimation(false);
              setShowScanResult(true);
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [scanAnimation]);

  const switchScreen = (screen) => {
    if (screen === activeScreen) return;
    setTabTransition(true);
    setPreviousScreen(activeScreen);
    setTimeout(() => {
      setActiveScreen(screen);
      setTabTransition(false);
    }, 150);
  };

  const myPlants = [
    { id: 1, name: 'Monstera Deliciosa', nickname: 'Monty', health: 92, image: '🌿', nextWater: '2 hours', issue: null },
    { id: 2, name: 'Fiddle Leaf Fig', nickname: 'Figgy', health: 45, image: '🌳', nextWater: 'Overdue!', issue: 'Yellow leaves detected' },
    { id: 3, name: 'Snake Plant', nickname: 'Snakey', health: 88, image: '🪴', nextWater: '3 days', issue: null },
    { id: 4, name: 'Peace Lily', nickname: 'Lily', health: 67, image: '🌸', nextWater: 'Tomorrow', issue: 'Needs fertilizer' },
  ];

  const communityPosts = [
    { id: 1, user: 'PlantMama_23', avatar: '👩‍🌾', text: 'My monstera just unfurled a new leaf with 6 fenestrations! 🎉', likes: 234, comments: 45, time: '2h ago', image: '🌿' },
    { id: 2, user: 'UrbanJungle', avatar: '🧑‍🌾', text: 'Tips for dealing with spider mites on calathea? Tried neem oil but...', likes: 89, comments: 67, time: '4h ago', image: '🕷️' },
    { id: 3, user: 'SucculentQueen', avatar: '👸', text: 'Propagation station update: Week 4 and we have ROOTS! 🌱', likes: 567, comments: 92, time: '6h ago', image: '🌱' },
  ];

  const careSchedule = [
    { id: 1, plant: 'Fiddle Leaf Fig', task: 'Water', time: 'Overdue', urgent: true, icon: '💧' },
    { id: 2, plant: 'Peace Lily', task: 'Fertilize', time: 'Today', urgent: false, icon: '🧪' },
    { id: 3, plant: 'Monstera', task: 'Water', time: 'In 2 hours', urgent: false, icon: '💧' },
    { id: 4, plant: 'Snake Plant', task: 'Rotate', time: 'Tomorrow', urgent: false, icon: '🔄' },
    { id: 5, plant: 'Monstera', task: 'Prune', time: 'This week', urgent: false, icon: '✂️' },
  ];

  const Icon = ({ name, size = 24, color = theme.text, strokeWidth = 2, style = {} }) => {
    const IconComponent = icons[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth, style });
  };

  const StatusBar = () => (
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 20px 4px', fontFamily, fontSize: 12, fontWeight: 600,
        color: theme.text,
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', { style: { display: 'flex', gap: 4, alignItems: 'center' } },
        React.createElement(Icon, { name: 'Signal', size: 14, color: theme.text }),
        React.createElement(Icon, { name: 'Wifi', size: 14, color: theme.text }),
        React.createElement(Icon, { name: 'BatteryFull', size: 14, color: theme.text })
      )
    )
  );

  const TabBar = () => {
    const tabs = [
      { id: 'home', icon: 'Home', label: 'Home' },
      { id: 'care', icon: 'Calendar', label: 'Care' },
      { id: 'scan', icon: 'ScanLine', label: 'Scan' },
      { id: 'community', icon: 'Users', label: 'Community' },
      { id: 'library', icon: 'BookOpen', label: 'Library' },
    ];

    return React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
        padding: '8px 0 24px', borderTop: `1px solid ${theme.border}`,
        background: theme.card, position: 'relative',
      }
    },
      tabs.map(tab => {
        const isActive = activeScreen === tab.id;
        const isScan = tab.id === 'scan';

        if (isScan) {
          return React.createElement('div', {
            key: tab.id,
            onClick: () => switchScreen('scan'),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              cursor: 'pointer', marginTop: -20, position: 'relative',
            }
          },
            React.createElement('div', {
              style: {
                width: 56, height: 56, borderRadius: 28,
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.cta})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 15px ${theme.primary}66`,
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s ease',
              }
            },
              React.createElement(Icon, { name: 'ScanLine', size: 26, color: '#FFFFFF' })
            ),
            React.createElement('span', {
              style: {
                fontFamily, fontSize: 10, marginTop: 4, fontWeight: 600,
                color: isActive ? theme.primary : theme.textSecondary,
              }
            }, tab.label)
          );
        }

        return React.createElement('div', {
          key: tab.id,
          onClick: () => switchScreen(tab.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            cursor: 'pointer', padding: '4px 12px',
            transition: 'all 0.2s ease',
          }
        },
          React.createElement(Icon, {
            name: tab.icon, size: 24,
            color: isActive ? theme.primary : theme.textSecondary,
            strokeWidth: isActive ? 2.5 : 1.5,
          }),
          React.createElement('span', {
            style: {
              fontFamily, fontSize: 10, marginTop: 2,
              color: isActive ? theme.primary : theme.textSecondary,
              fontWeight: isActive ? 600 : 400,
            }
          }, tab.label)
        );
      })
    );
  };

  const ThriveScoreRing = ({ score, size = 120 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const color = score > 70 ? '#4CAF50' : score > 40 ? '#FF9800' : theme.secondary;

    return React.createElement('div', {
      style: { position: 'relative', width: size, height: size }
    },
      React.createElement('svg', {
        width: size, height: size,
        style: { transform: 'rotate(-90deg)' }
      },
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          stroke: theme.surface, strokeWidth, fill: 'none',
        }),
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          stroke: color, strokeWidth, fill: 'none',
          strokeDasharray: circumference,
          strokeDashoffset: circumference - progress,
          strokeLinecap: 'round',
          style: { transition: 'stroke-dashoffset 1s ease-out' },
        })
      ),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement('span', {
          style: { fontFamily, fontSize: 32, fontWeight: 700, color: theme.text }
        }, score),
        React.createElement('span', {
          style: { fontFamily, fontSize: 11, color: theme.textSecondary, fontWeight: 500 }
        }, 'Thrive Score')
      )
    );
  };

  const PlantCard = ({ plant }) => {
    const healthColor = plant.health > 70 ? '#4CAF50' : plant.health > 40 ? '#FF9800' : theme.secondary;

    return React.createElement('div', {
      onClick: () => { setSelectedPlant(plant); },
      style: {
        background: theme.card, borderRadius: 16, padding: 16,
        minWidth: 150, cursor: 'pointer',
        boxShadow: darkMode ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
        border: `1px solid ${theme.border}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      },
      onMouseEnter: (e) => { e.currentTarget.style.transform = 'scale(1.02)'; },
      onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
    },
      React.createElement('div', {
        style: { fontSize: 40, marginBottom: 8 }
      }, plant.image),
      React.createElement('div', {
        style: { fontFamily, fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 2 }
      }, plant.nickname),
      React.createElement('div', {
        style: { fontFamily, fontSize: 12, color: theme.textSecondary, marginBottom: 8 }
      }, plant.name),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }
      },
        React.createElement('div', {
          style: {
            flex: 1, height: 4, borderRadius: 2, background: theme.surface,
          }
        },
          React.createElement('div', {
            style: {
              width: `${plant.health}%`, height: '100%', borderRadius: 2,
              background: healthColor, transition: 'width 1s ease-out',
            }
          })
        ),
        React.createElement('span', {
          style: { fontFamily, fontSize: 11, fontWeight: 600, color: healthColor }
        }, `${plant.health}%`)
      ),
      plant.issue && React.createElement('div', {
        style: {
          fontFamily, fontSize: 11, color: theme.secondary, fontWeight: 500,
          background: `${theme.secondary}15`, borderRadius: 6, padding: '3px 6px',
          display: 'inline-block',
        }
      }, `⚠️ ${plant.issue}`),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }
      },
        React.createElement('span', { style: { fontSize: 12 } }, '💧'),
        React.createElement('span', {
          style: {
            fontFamily, fontSize: 11,
            color: plant.nextWater === 'Overdue!' ? theme.secondary : theme.textSecondary,
            fontWeight: plant.nextWater === 'Overdue!' ? 600 : 400,
          }
        }, plant.nextWater)
      )
    );
  };

  const HomeScreen = () => {
    const greeting = 'Good morning';

    return React.createElement('div', {
      style: { flex: 1, overflow: 'auto', background: theme.bg }
    },
      React.createElement('div', {
        style: {
          padding: '16px 20px 8px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily, fontSize: 15, color: theme.textSecondary }
          }, greeting + ' 👋'),
          React.createElement('div', {
            style: { fontFamily, fontSize: 28, fontWeight: 700, color: theme.text, marginTop: 2 }
          }, 'Plant Parent')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('div', {
            onClick: () => setDarkMode(!darkMode),
            style: { cursor: 'pointer', padding: 4 }
          },
            React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 22, color: theme.textSecondary })
          ),
          React.createElement('div', {
            style: { position: 'relative', cursor: 'pointer', padding: 4 }
          },
            React.createElement(Icon, { name: 'Bell', size: 22, color: theme.textSecondary }),
            notificationCount > 0 && React.createElement('div', {
              style: {
                position: 'absolute', top: 0, right: 0,
                width: 16, height: 16, borderRadius: 8,
                background: theme.secondary, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement('span', {
                style: { fontFamily, fontSize: 10, color: '#FFF', fontWeight: 700 }
              }, notificationCount)
            )
          )
        )
      ),

      // Thrive Score Card
      React.createElement('div', {
        style: {
          margin: '12px 20px', padding: 20, borderRadius: 20,
          background: `linear-gradient(135deg, ${theme.primary}15, ${theme.cta}10)`,
          border: `1px solid ${theme.primary}20`,
          display: 'flex', alignItems: 'center', gap: 20,
        }
      },
        React.createElement(ThriveScoreRing, { score: animatedScore }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily, fontSize: 17, fontWeight: 600, color: theme.text, marginBottom: 4 }
          }, 'Garden Health'),
          React.createElement('div', {
            style: { fontFamily, fontSize: 13, color: theme.textSecondary, lineHeight: '18px' }
          }, '3 of 4 plants thriving. Figgy needs attention!'),
          React.createElement('div', {
            onClick: () => switchScreen('care'),
            style: {
              fontFamily, fontSize: 13, fontWeight: 600, color: theme.primary,
              marginTop: 8, cursor: 'pointer',
            }
          }, 'View Care Tasks →')
        )
      ),

      // Quick Actions
      React.createElement('div', {
        style: {
          padding: '0 20px', display: 'flex', gap: 10, marginBottom: 16,
        }
      },
        [
          { label: 'Scan Plant', icon: 'Camera', color: theme.primary, screen: 'scan' },
          { label: 'Get Expert Help', icon: 'Video', color: theme.cta, screen: null },
          { label: 'Plant Library', icon: 'BookOpen', color: '#4CAF50', screen: 'library' },
        ].map((action, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => action.screen && switchScreen(action.screen),
            style: {
              flex: 1, background: theme.card, borderRadius: 14, padding: '14px 8px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              cursor: 'pointer', border: `1px solid ${theme.border}`,
              boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: `${action.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(Icon, { name: action.icon, size: 20, color: action.color })
            ),
            React.createElement('span', {
              style: { fontFamily, fontSize: 11, fontWeight: 600, color: theme.text, textAlign: 'center' }
            }, action.label)
          )
        )
      ),

      // My Plants
      React.createElement('div', {
        style: { padding: '0 20px', marginBottom: 8 }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('span', {
            style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text }
          }, 'My Plants'),
          React.createElement('span', {
            style: { fontFamily, fontSize: 13, color: theme.primary, fontWeight: 600, cursor: 'pointer' }
          }, 'See All')
        )
      ),
      React.createElement('div', {
        style: {
          display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 16px',
          WebkitOverflowScrolling: 'touch',
        }
      },
        myPlants.map(plant =>
          React.createElement(PlantCard, { key: plant.id, plant })
        )
      ),

      // Alerts
      React.createElement('div', {
        style: { padding: '0 20px 20px' }
      },
        React.createElement('div', {
          style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
        }, 'Health Alerts'),
        React.createElement('div', {
          style: {
            background: `${theme.secondary}10`, borderRadius: 14, padding: 16,
            border: `1px solid ${theme.secondary}25`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }
          },
            React.createElement(Icon, { name: 'AlertTriangle', size: 20, color: theme.secondary }),
            React.createElement('span', {
              style: { fontFamily, fontSize: 15, fontWeight: 600, color: theme.secondary }
            }, 'Figgy needs help!')
          ),
          React.createElement('div', {
            style: { fontFamily, fontSize: 13, color: theme.textSecondary, lineHeight: '18px', marginBottom: 10 }
          }, 'Yellow leaves detected. Possible overwatering or nutrient deficiency. Scan for detailed diagnosis.'),
          React.createElement('div', {
            onClick: () => switchScreen('scan'),
            style: {
              background: theme.secondary, color: '#FFF', borderRadius: 10,
              padding: '10px 0', textAlign: 'center', fontFamily, fontSize: 14,
              fontWeight: 600, cursor: 'pointer',
            }
          }, 'Scan Now')
        )
      ),
      React.createElement('div', { style: { height: 10 } })
    );
  };

  const CareScreen = () => {
    const [completedTasks, setCompletedTasks] = useState({});

    const toggleTask = (id) => {
      setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return React.createElement('div', {
      style: { flex: 1, overflow: 'auto', background: theme.bg }
    },
      React.createElement('div', {
        style: { padding: '16px 20px 8px' }
      },
        React.createElement('div', {
          style: { fontFamily, fontSize: 34, fontWeight: 700, color: theme.text }
        }, 'Care Schedule'),
        React.createElement('div', {
          style: { fontFamily, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, 'Today · ' + new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }))
      ),

      // Weather Card
      React.createElement('div', {
        style: {
          margin: '16px 20px', padding: 16, borderRadius: 16,
          background: `linear-gradient(135deg, #2979FF, #1565C0)`,
          color: '#FFF',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily, fontSize: 13, opacity: 0.8 } }, 'Local Conditions'),
            React.createElement('div', { style: { fontFamily, fontSize: 22, fontWeight: 700, marginTop: 4 } }, '72°F · Partly Cloudy'),
            React.createElement('div', { style: { fontFamily, fontSize: 13, opacity: 0.8, marginTop: 4 } }, 'Humidity: 65% · UV: Moderate')
          ),
          React.createElement('span', { style: { fontSize: 40 } }, '⛅')
        ),
        React.createElement('div', {
          style: {
            marginTop: 12, padding: '8px 12px', background: 'rgba(255,255,255,0.2)',
            borderRadius: 10, fontFamily, fontSize: 12,
          }
        }, '💡 Good conditions for outdoor plants today. Consider misting tropical plants.')
      ),

      // Tasks
      React.createElement('div', { style: { padding: '8px 20px 20px' } },
        React.createElement('div', {
          style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
        }, "Today's Tasks"),
        careSchedule.map(task =>
          React.createElement('div', {
            key: task.id,
            onClick: () => toggleTask(task.id),
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14, marginBottom: 8, borderRadius: 14,
              background: theme.card, border: `1px solid ${task.urgent && !completedTasks[task.id] ? theme.secondary + '40' : theme.border}`,
              cursor: 'pointer',
              opacity: completedTasks[task.id] ? 0.6 : 1,
              transition: 'all 0.3s ease',
            }
          },
            React.createElement('div', {
              style: {
                width: 24, height: 24, borderRadius: 12,
                border: `2px solid ${completedTasks[task.id] ? '#4CAF50' : theme.border}`,
                background: completedTasks[task.id] ? '#4CAF50' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease', flexShrink: 0,
              }
            },
              completedTasks[task.id] && React.createElement(Icon, { name: 'Check', size: 14, color: '#FFF' })
            ),
            React.createElement('span', { style: { fontSize: 20 } }, task.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  fontFamily, fontSize: 15, fontWeight: 600, color: theme.text,
                  textDecoration: completedTasks[task.id] ? 'line-through' : 'none',
                }
              }, `${task.task} ${task.plant}`),
              React.createElement('div', {
                style: {
                  fontFamily, fontSize: 12,
                  color: task.urgent ? theme.secondary : theme.textSecondary,
                  fontWeight: task.urgent ? 600 : 400,
                }
              }, task.time)
            ),
            task.urgent && !completedTasks[task.id] && React.createElement('div', {
              style: {
                background: theme.secondary, color: '#FFF', borderRadius: 6,
                padding: '3px 8px', fontFamily, fontSize: 10, fontWeight: 700,
              }
            }, 'URGENT')
          )
        )
      ),

      // Weekly Overview
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
        }, 'This Week'),
        React.createElement('div', {
          style: { display: 'flex', gap: 6 }
        },
          ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
            const isToday = i === new Date().getDay() - 1;
            const hasTasks = [0, 1, 3, 5].includes(i);
            return React.createElement('div', {
              key: i,
              style: {
                flex: 1, padding: '10px 0', borderRadius: 12, textAlign: 'center',
                background: isToday ? theme.primary : theme.card,
                border: `1px solid ${isToday ? theme.primary : theme.border}`,
              }
            },
              React.createElement('div', {
                style: {
                  fontFamily, fontSize: 12, fontWeight: 600,
                  color: isToday ? '#FFF' : theme.textSecondary,
                }
              }, day),
              React.createElement('div', {
                style: {
                  width: 6, height: 6, borderRadius: 3, margin: '4px auto 0',
                  background: hasTasks ? (isToday ? '#FFF' : theme.primary) : 'transparent',
                }
              })
            );
          })
        )
      ),
      React.createElement('div', { style: { height: 10 } })
    );
  };

  const ScanScreen = () => {
    return React.createElement('div', {
      style: { flex: 1, overflow: 'auto', background: theme.bg }
    },
      React.createElement('div', {
        style: { padding: '16px 20px 8px' }
      },
        React.createElement('div', {
          style: { fontFamily, fontSize: 34, fontWeight: 700, color: theme.text }
        }, 'Plant Scanner'),
        React.createElement('div', {
          style: { fontFamily, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, 'AI-powered plant diagnostics')
      ),

      !scanAnimation && !showScanResult && React.createElement('div', {
        style: { padding: '20px' }
      },
        // Camera Preview Mock
        React.createElement('div', {
          style: {
            width: '100%', height: 280, borderRadius: 24,
            background: darkMode ? '#2C2C2E' : '#E8E8ED',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 16,
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
            }
          }),
          React.createElement('div', {
            style: {
              width: 140, height: 140, border: `3px solid ${theme.primary}`,
              borderRadius: 20, position: 'relative',
            }
          },
            // Corner indicators
            ...['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((corner, i) => {
              const positions = {
                topLeft: { top: -3, left: -3 },
                topRight: { top: -3, right: -3 },
                bottomLeft: { bottom: -3, left: -3 },
                bottomRight: { bottom: -3, right: -3 },
              };
              return React.createElement('div', {
                key: corner,
                style: {
                  position: 'absolute', ...positions[corner],
                  width: 20, height: 20,
                  borderTop: corner.includes('top') ? `4px solid ${theme.primary}` : 'none',
                  borderBottom: corner.includes('bottom') ? `4px solid ${theme.primary}` : 'none',
                  borderLeft: corner.includes('Left') ? `4px solid ${theme.primary}` : 'none',
                  borderRight: corner.includes('Right') ? `4px solid ${theme.primary}` : 'none',
                  borderRadius: corner === 'topLeft' ? '8px 0 0 0' :
                    corner === 'topRight' ? '0 8px 0 0' :
                    corner === 'bottomLeft' ? '0 0 0 8px' : '0 0 8px 0',
                }
              });
            })
          ),
          React.createElement('span', {
            style: { fontFamily, fontSize: 14, color: theme.textSecondary, fontWeight: 500 }
          }, 'Position plant in frame'),
          React.createElement('span', { style: { fontSize: 60, position: 'absolute', opacity: 0.3 } }, '🌿')
        ),

        // Scan Button
        React.createElement('div', {
          onClick: () => { setScanAnimation(true); setShowScanResult(false); },
          style: {
            marginTop: 20, padding: '16px 0', borderRadius: 16, textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.cta})`,
            color: '#FFF', fontFamily, fontSize: 17, fontWeight: 700,
            cursor: 'pointer', boxShadow: `0 4px 20px ${theme.primary}40`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 } },
            React.createElement(Icon, { name: 'Camera', size: 22, color: '#FFF' }),
            React.createElement('span', null, 'Take Photo & Scan')
          )
        ),

        // Or upload
        React.createElement('div', {
          style: {
            marginTop: 12, padding: '14px 0', borderRadius: 16, textAlign: 'center',
            border: `2px solid ${theme.border}`, background: theme.card,
            color: theme.text, fontFamily, fontSize: 15, fontWeight: 600,
            cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 } },
            React.createElement(Icon, { name: 'Upload', size: 20, color: theme.primary }),
            React.createElement('span', null, 'Upload from Gallery')
          )
        ),

        // Recent Scans
        React.createElement('div', { style: { marginTop: 24 } },
          React.createElement('div', {
            style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
          }, 'Recent Scans'),
          [
            { plant: 'Fiddle Leaf Fig', date: '2 days ago', result: 'Overwatering', emoji: '🌳' },
            { plant: 'Rose Bush', date: '1 week ago', result: 'Aphid Infestation', emoji: '🌹' },
          ].map((scan, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 12, marginBottom: 8, borderRadius: 12,
                background: theme.card, border: `1px solid ${theme.border}`,
              }
            },
              React.createElement('span', { style: { fontSize: 32 } }, scan.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { fontFamily, fontSize: 15, fontWeight: 600, color: theme.text }
                }, scan.plant),
                React.createElement('div', {
                  style: { fontFamily, fontSize: 12, color: theme.textSecondary }
                }, scan.date)
              ),
              React.createElement('div', {
                style: {
                  background: `${theme.secondary}15`, borderRadius: 8,
                  padding: '4px 8px', fontFamily, fontSize: 12, color: theme.secondary, fontWeight: 600,
                }
              }, scan.result)
            )
          )
        )
      ),

      // Scanning Animation
      scanAnimation && React.createElement('div', {
        style: {
          padding: 20, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', minHeight: 500,
        }
      },
        React.createElement('div', {
          style: {
            width: 200, height: 200, borderRadius: 24,
            background: darkMode ? '#2C2C2E' : '#E8E8ED',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('span', { style: { fontSize: 80 } }, '🌳'),
          React.createElement('div', {
            style: {
              position: 'absolute', top: 0, left: 0, right: 0,
              height: `${scanProgress}%`,
              background: `linear-gradient(180deg, ${theme.primary}30, ${theme.primary}10)`,
              borderBottom: `2px solid ${theme.primary}`,
              transition: 'height 0.1s linear',
            }
          })
        ),
        React.createElement('div', {
          style: { marginTop: 24, fontFamily, fontSize: 17, fontWeight: 600, color: theme.text }
        }, 'Analyzing plant...'),
        React.createElement('div', {
          style: { marginTop: 8, fontFamily, fontSize: 13, color: theme.textSecondary }
        }, `${scanProgress}% complete`),
        React.createElement('div', {
          style: {
            marginTop: 16, width: 200, height: 4, borderRadius: 2, background: theme.surface,
          }
        },
          React.createElement('div', {
            style: {
              width: `${scanProgress}%`, height: '100%', borderRadius: 2,
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.cta})`,
              transition: 'width 0.1s linear',
            }
          })
        ),
        React.createElement('div', {
          style: { marginTop: 20, fontFamily, fontSize: 12, color: theme.textSecondary }
        },
          scanProgress < 30 ? '🔍 Identifying species...' :
          scanProgress < 60 ? '🧬 Analyzing leaf patterns...' :
          scanProgress < 85 ? '🦠 Checking for diseases...' :
          '✅ Generating diagnosis...'
        )
      ),

      // Scan Result
      showScanResult && React.createElement('div', {
        style: { padding: 20 }
      },
        // Result Header
        React.createElement('div', {
          style: {
            background: `${theme.secondary}10`, borderRadius: 20, padding: 20,
            border: `1px solid ${theme.secondary}25`, marginBottom: 16,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 16 }
          },
            React.createElement('span', { style: { fontSize: 60 } }, '🌳'),
            React.createElement('div', null,
              React.createElement('div', {
                style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text }
              }, 'Fiddle Leaf Fig'),
              React.createElement('div', {
                style: {
                  fontFamily, fontSize: 13, color: theme.secondary, fontWeight: 600,
                  marginTop: 4, display: 'flex', alignItems: 'center', gap: 4,
                }
              },
                React.createElement(Icon, { name: 'AlertCircle', size: 14, color: theme.secondary }),
                'Issue Detected'
              )
            )
          ),
          React.createElement('div', {
            style: {
              marginTop: 16, padding: 14, borderRadius: 12,
              background: theme.card, border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: { fontFamily, fontSize: 17, fontWeight: 700, color: theme.secondary, marginBottom: 4 }
            }, '🦠 Leaf Spot Disease'),
            React.createElement('div', {
              style: { fontFamily, fontSize: 13, color: theme.textSecondary, lineHeight: '18px' }
            }, 'Caused by Cercospora fungus. Characterized by brown spots with yellow halos on older leaves. Confidence: 94%')
          )
        ),

        // Treatment Plan
        React.createElement('div', {
          style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
        }, '💊 Treatment Plan'),
        [
          { step: 1, title: 'Remove Affected Leaves', desc: 'Carefully cut away all leaves showing brown spots using sterilized scissors.', type: 'immediate' },
          { step: 2, title: 'Apply Fungicide', desc: 'Use a copper-based fungicide or neem oil solution. Spray both sides of remaining leaves.', type: 'treatment' },
          { step: 3, title: 'Improve Air Circulation', desc: 'Move plant away from walls. Consider a small fan on low setting.', type: 'prevention' },
          { step: 4, title: 'Reduce Watering', desc: 'Water only when top 2 inches of soil are dry. Avoid wetting leaves.', type: 'ongoing' },
        ].map(step =>
          React.createElement('div', {
            key: step.step,
            style: {
              display: 'flex', gap: 12, marginBottom: 12,
              padding: 14, borderRadius: 14, background: theme.card,
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: {
                width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                background: step.type === 'immediate' ? theme.secondary :
                  step.type === 'treatment' ? theme.primary : '#4CAF50',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFF', fontFamily, fontSize: 13, fontWeight: 700,
              }
            }, step.step),
            React.createElement('div', null,
              React.createElement('div', {
                style: { fontFamily, fontSize: 15, fontWeight: 600, color: theme.text }
              }, step.title),
              React.createElement('div', {
                style: { fontFamily, fontSize: 13, color: theme.textSecondary, marginTop: 2, lineHeight: '17px' }
              }, step.desc)
            )
          )
        ),

        // Actions
        React.createElement('div', {
          style: {
            marginTop: 8, padding: '14px 0', borderRadius: 14, textAlign: 'center',
            background: theme.primary, color: '#FFF', fontFamily, fontSize: 15,
            fontWeight: 700, cursor: 'pointer',
          }
        }, 'Save to My Plants'),
        React.createElement('div', {
          onClick: () => { setShowScanResult(false); setScanAnimation(false); },
          style: {
            marginTop: 8, padding: '14px 0', borderRadius: 14, textAlign: 'center',
            border: `2px solid ${theme.border}`, background: theme.card,
            color: theme.text, fontFamily, fontSize: 15, fontWeight: 600,
            cursor: 'pointer',
          }
        }, 'Scan Another Plant'),
        React.createElement('div', { style: { height: 10 } })
      )
    );
  };

  const CommunityScreen = () => {
    const toggleLike = (id) => {
      setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return React.createElement('div', {
      style: { flex: 1, overflow: 'auto', background: theme.bg }
    },
      React.createElement('div', {
        style: { padding: '16px 20px 8px' }
      },
        React.createElement('div', {
          style: { fontFamily, fontSize: 34, fontWeight: 700, color: theme.text }
        }, 'Community'),
        React.createElement('div', {
          style: { fontFamily, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, 'Connect with plant lovers')
      ),

      // Search
      React.createElement('div', {
        style: { padding: '8px 20px 16px' }
      },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 8,
            background: theme.surface, borderRadius: 12, padding: '10px 14px',
          }
        },
          React.createElement(Icon, { name: 'Search', size: 18, color: theme.textSecondary }),
          React.createElement('span', {
            style: { fontFamily, fontSize: 15, color: theme.textSecondary }
          }, 'Search community...')
        )
      ),

      // Trending Topics
      React.createElement('div', {
        style: { padding: '0 20px 16px' }
      },
        React.createElement('div', {
          style: { display: 'flex', gap: 8, overflowX: 'auto' }
        },
          ['🔥 Trending', '🌿 Monstera', '🐛 Pest Help', '💧 Watering', '🌱 Propagation', '☀️ Light'].map((tag, i) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '6px 14px', borderRadius: 20, whiteSpace: 'nowrap',
                background: i === 0 ? theme.primary : theme.surface,
                color: i === 0 ? '#FFF' : theme.text,
                fontFamily, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }
            }, tag)
          )
        )
      ),

      // Expert Consultation Banner
      React.createElement('div', {
        style: {
          margin: '0 20px 16px', padding: 16, borderRadius: 16,
          background: `linear-gradient(135deg, ${theme.cta}15, ${theme.cta}05)`,
          border: `1px solid ${theme.cta}30`,
          display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12,
            background: `${theme.cta}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(Icon, { name: 'Video', size: 22, color: theme.cta })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily, fontSize: 14, fontWeight: 700, color: theme.text }
          }, 'Expert Consultation'),
          React.createElement('div', {
            style: { fontFamily, fontSize: 12, color: theme.textSecondary }
          }, '3 certified experts online now')
        ),
        React.createElement('div', {
          style: {
            background: theme.cta, color: '#FFF', borderRadius: 10,
            padding: '6px 12px', fontFamily, fontSize: 12, fontWeight: 700,
            cursor: 'pointer',
          }
        }, 'PRO')
      ),

      // Posts
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        communityPosts.map(post =>
          React.createElement('div', {
            key: post.id,
            style: {
              background: theme.card, borderRadius: 16, padding: 16,
              marginBottom: 12, border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 18,
                  background: theme.surface, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }
              }, post.avatar),
              React.createElement('div', null,
                React.createElement('div', {
                  style: { fontFamily, fontSize: 14, fontWeight: 600, color: theme.text }
                }, post.user),
                React.createElement('div', {
                  style: { fontFamily, fontSize: 11, color: theme.textSecondary }
                }, post.time)
              )
            ),
            React.createElement('div', {
              style: { fontFamily, fontSize: 15, color: theme.text, lineHeight: '21px', marginBottom: 12 }
            }, post.text),
            post.image && React.createElement('div', {
              style: {
                height: 120, borderRadius: 12, background: theme.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 50, marginBottom: 12,
              }
            }, post.image),
            React.createElement('div', {
              style: { display: 'flex', gap: 20, alignItems: 'center' }
            },
              React.createElement('div', {
                onClick: () => toggleLike(post.id),
                style: {
                  display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }
              },
                React.createElement(Icon, {
                  name: likedPosts[post.id] ? 'Heart' : 'Heart',
                  size: 18,
                  color: likedPosts[post.id] ? theme.secondary : theme.textSecondary,
                  style: {
                    fill: likedPosts[post.id] ? theme.secondary : 'none',
                    transition: 'all 0.3s ease',
                  }
                }),
                React.createElement('span', {
                  style: {
                    fontFamily, fontSize: 13,
                    color: likedPosts[post.id] ? theme.secondary : theme.textSecondary,
                    fontWeight: likedPosts[post.id] ? 600 : 400,
                  }
                }, likedPosts[post.id] ? post.likes + 1 : post.likes)
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4 }
              },
                React.createElement(Icon, { name: 'MessageCircle', size: 18, color: theme.textSecondary }),
                React.createElement('span', {
                  style: { fontFamily, fontSize: 13, color: theme.textSecondary }
                }, post.comments)
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }
              },
                React.createElement(Icon, { name: 'Share', size: 18, color: theme.textSecondary })
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 10 } })
    );
  };

  const LibraryScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const categories = [
      { name: 'Tropical', emoji: '🌴', count: 156 },
      { name: 'Succulents', emoji: '🌵', count: 89 },
      { name: 'Flowering', emoji: '🌸', count: 124 },
      { name: 'Herbs', emoji: '🌿', count: 67 },
      { name: 'Ferns', emoji: '🌾', count: 45 },
      { name: 'Trees', emoji: '🌳', count: 78 },
    ];

    const popularPlants = [
      { name: 'Monstera Deliciosa', difficulty: 'Easy', light: 'Indirect', water: 'Weekly', emoji: '🌿' },
      { name: 'Pothos', difficulty: 'Easy', light: 'Low-Bright', water: 'When dry', emoji: '🪴' },
      { name: 'Fiddle Leaf Fig', difficulty: 'Hard', light: 'Bright', water: 'Careful', emoji: '🌳' },
      { name: 'Snake Plant', difficulty: 'Easy', light: 'Any', water: 'Monthly', emoji: '🐍' },
      { name: 'Calathea', difficulty: 'Hard', light: 'Indirect', water: 'Moist', emoji: '🌺' },
    ];

    return React.createElement('div', {
      style: { flex: 1, overflow: 'auto', background: theme.bg }
    },
      React.createElement('div', {
        style: { padding: '16px 20px 8px' }
      },
        React.createElement('div', {
          style: { fontFamily, fontSize: 34, fontWeight: 700, color: theme.text }
        }, 'Plant Library'),
        React.createElement('div', {
          style: { fontFamily, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, '559 plants and counting')
      ),

      // Search
      React.createElement('div', {
        style: { padding: '8px 20px 16px' }
      },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 8,
            background: theme.surface, borderRadius: 12, padding: '10px 14px',
          }
        },
          React.createElement(Icon, { name: 'Search', size: 18, color: theme.textSecondary }),
          React.createElement('input', {
            placeholder: 'Search plants...',
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            style: {
              border: 'none', outline: 'none', background: 'transparent',
              fontFamily, fontSize: 15, color: theme.text, flex: 1,
            }
          })
        )
      ),

      // Categories
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', {
          style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
        }, 'Categories'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }
        },
          categories.map((cat, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: theme.card, borderRadius: 14, padding: 14,
                textAlign: 'center', cursor: 'pointer',
                border: `1px solid ${theme.border}`,
                transition: 'transform 0.2s ease',
              },
              onMouseEnter: (e) => { e.currentTarget.style.transform = 'scale(1.03)'; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            },
              React.createElement('div', { style: { fontSize: 28, marginBottom: 4 } }, cat.emoji),
              React.createElement('div', {
                style: { fontFamily, fontSize: 13, fontWeight: 600, color: theme.text }
              }, cat.name),
              React.createElement('div', {
                style: { fontFamily, fontSize: 11, color: theme.textSecondary }
              }, `${cat.count} plants`)
            )
          )
        )
      ),

      // Popular Plants
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
        }, 'Popular Plants'),
        popularPlants.map((plant, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14,
              padding: 14, marginBottom: 8, borderRadius: 14,
              background: theme.card, border: `1px solid ${theme.border}`,
              cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: 50, height: 50, borderRadius: 14, background: theme.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }
            }, plant.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily, fontSize: 15, fontWeight: 600, color: theme.text }
              }, plant.name),
              React.createElement('div', {
                style: { display: 'flex', gap: 8, marginTop: 4 }
              },
                React.createElement('span', {
                  style: {
                    fontFamily, fontSize: 11, padding: '2px 8px', borderRadius: 6,
                    background: plant.difficulty === 'Easy' ? '#4CAF5020' : '#FF980020',
                    color: plant.difficulty === 'Easy' ? '#4CAF50' : '#FF9800',
                    fontWeight: 600,
                  }
                }, plant.difficulty),
                React.createElement('span', {
                  style: {
                    fontFamily, fontSize: 11, padding: '2px 8px', borderRadius: 6,
                    background: `${theme.primary}15`, color: theme.primary, fontWeight: 500,
                  }
                }, `☀️ ${plant.light}`),
                React.createElement('span', {
                  style: {
                    fontFamily, fontSize: 11, padding: '2px 8px', borderRadius: 6,
                    background: `${theme.primary}15`, color: theme.primary, fontWeight: 500,
                  }
                }, `💧 ${plant.water}`)
              )
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: theme.textSecondary })
          )
        )
      ),

      // Care Guides
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: { fontFamily, fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }
        }, 'Care Guides'),
        [
          { title: 'Beginner\'s Guide to Indoor Plants', reads: '12.5K', time: '5 min', icon: '📖' },
          { title: 'Understanding Light Requirements', reads: '8.2K', time: '7 min', icon: '☀️' },
          { title: 'Common Plant Diseases & Cures', reads: '15.3K', time: '10 min', icon: '🦠' },
        ].map((guide, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14, marginBottom: 8, borderRadius: 14,
              background: theme.card, border: `1px solid ${theme.border}`,
              cursor: 'pointer',
            }
          },
            React.createElement('span', { style: { fontSize: 28 } }, guide.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily, fontSize: 14, fontWeight: 600, color: theme.text }
              }, guide.title