const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#4C786F',
  primaryLight: '#5A8A80',
  primaryDark: '#3D6259',
  secondary: '#C7A28C',
  secondaryLight: '#D4B5A2',
  cta: '#FFB347',
  ctaHover: '#FFA52E',
  background: '#F8F6F4',
  backgroundDark: '#1A1F1E',
  cardDark: '#242B29',
  textDark: '#2D3B38',
  textMedium: '#5A6B67',
  textLight: '#8A9B97',
  white: '#FFFFFF',
  border: '#E8E4E0',
  borderDark: '#3A4240',
  success: '#6ABF69',
  warning: '#FFB347',
  danger: '#E07A5F',
  surfaceLight: 'rgba(76, 120, 111, 0.08)',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [animatingScreen, setAnimatingScreen] = useState(false);
  const [previousScreen, setPreviousScreen] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [journalExpanded, setJournalExpanded] = useState(null);

  const theme = darkMode ? {
    bg: COLORS.backgroundDark,
    card: COLORS.cardDark,
    text: '#E8EDE8',
    textSecondary: '#9AABA7',
    textCaption: '#6B7C78',
    border: COLORS.borderDark,
    surface: 'rgba(76, 120, 111, 0.15)',
    statusBar: COLORS.backgroundDark,
  } : {
    bg: COLORS.background,
    card: COLORS.white,
    text: COLORS.textDark,
    textSecondary: COLORS.textMedium,
    textCaption: COLORS.textLight,
    border: COLORS.border,
    surface: COLORS.surfaceLight,
    statusBar: COLORS.background,
  };

  const navigateTo = (screen) => {
    if (screen === activeScreen) return;
    setPreviousScreen(activeScreen);
    setAnimatingScreen(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setAnimatingScreen(false);
    }, 150);
  };

  const StatusBar = () => {
    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px 8px',
        fontFamily: FONT,
        fontSize: '15px',
        fontWeight: '600',
        color: theme.text,
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', {
        style: { display: 'flex', gap: '6px', alignItems: 'center' }
      },
        React.createElement('div', {
          style: { width: 16, height: 10, display: 'flex', gap: 1, alignItems: 'flex-end' }
        },
          ...[4, 6, 8, 10].map((h, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 3,
                height: h,
                backgroundColor: theme.text,
                borderRadius: 1,
              }
            })
          )
        ),
        React.createElement('div', {
          style: {
            width: 22,
            height: 11,
            border: `1.5px solid ${theme.text}`,
            borderRadius: 3,
            padding: 1.5,
            position: 'relative',
          }
        },
          React.createElement('div', {
            style: {
              width: '75%',
              height: '100%',
              backgroundColor: COLORS.success,
              borderRadius: 1.5,
            }
          })
        )
      )
    );
  };

  const TabBar = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: 'Home' },
      { id: 'diagnosis', label: 'Diagnose', icon: 'ScanLine' },
      { id: 'plants', label: 'My Plants', icon: 'Sprout' },
      { id: 'community', label: 'Community', icon: 'Users' },
      { id: 'journal', label: 'Journal', icon: 'BookOpen' },
    ];

    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '8px 0 28px',
        backgroundColor: theme.card,
        borderTop: `0.5px solid ${theme.border}`,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }
    },
      tabs.map(tab => {
        const isActive = activeScreen === tab.id;
        const IconComponent = window.lucide && window.lucide[tab.icon];
        return React.createElement('button', {
          key: tab.id,
          onClick: () => navigateTo(tab.id),
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            background: 'none',
            border: 'none',
            padding: '4px 8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
          }
        },
          IconComponent ? React.createElement(IconComponent, {
            size: 22,
            color: isActive ? COLORS.primary : theme.textCaption,
            strokeWidth: isActive ? 2.2 : 1.8,
          }) : React.createElement('div', {
            style: { width: 22, height: 22, backgroundColor: theme.textCaption, borderRadius: 4 }
          }),
          React.createElement('span', {
            style: {
              fontFamily: FONT,
              fontSize: '10px',
              fontWeight: isActive ? '600' : '400',
              color: isActive ? COLORS.primary : theme.textCaption,
              letterSpacing: '-0.1px',
            }
          }, tab.label)
        );
      })
    );
  };

  const HomeScreen = () => {
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    }, []);

    const quickActions = [
      { icon: 'Camera', label: 'Scan Plant', color: COLORS.primary, action: () => navigateTo('diagnosis') },
      { icon: 'Droplets', label: 'Water Log', color: '#5B9BD5', action: () => {} },
      { icon: 'Sun', label: 'Light Check', color: COLORS.cta, action: () => {} },
      { icon: 'Pill', label: 'Treat Plant', color: COLORS.danger, action: () => {} },
    ];

    const alerts = [
      { plant: 'Monstera Deliciosa', message: 'Needs watering today', icon: 'Droplets', color: '#5B9BD5', time: '2h overdue' },
      { plant: 'Peace Lily', message: 'Fertilize this week', icon: 'Zap', color: COLORS.success, time: 'In 2 days' },
      { plant: 'Fiddle Leaf Fig', message: 'Rotate for even growth', icon: 'RotateCw', color: COLORS.secondary, time: 'Today' },
    ];

    const tips = [
      { title: 'Yellow leaves? Don\'t panic!', desc: 'Most yellow leaves are simply old growth making way for new.', emoji: '🍂' },
      { title: 'Humidity hack', desc: 'Group plants together to create a natural humidity bubble.', emoji: '💧' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      // Header
      React.createElement('div', {
        style: { padding: '8px 0 20px' }
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
          }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: {
                fontFamily: FONT,
                fontSize: '15px',
                color: theme.textSecondary,
                margin: 0,
              }
            }, greeting + ' 🌱'),
            React.createElement('h1', {
              style: {
                fontFamily: FONT,
                fontSize: '34px',
                fontWeight: '700',
                color: theme.text,
                margin: '4px 0 0',
                letterSpacing: '-0.5px',
              }
            }, 'RootDoctor')
          ),
          React.createElement('button', {
            onClick: () => setDarkMode(!darkMode),
            style: {
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.surface,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          },
            window.lucide && React.createElement(
              darkMode ? window.lucide.Sun : window.lucide.Moon,
              { size: 20, color: theme.text }
            )
          )
        )
      ),

      // Wellness Summary Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
          borderRadius: 20,
          padding: '20px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -20,
            right: -20,
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: 'rgba(255,255,255,0.08)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: -30,
            right: 40,
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: 'rgba(255,255,255,0.05)',
          }
        }),
        React.createElement('p', {
          style: {
            fontFamily: FONT,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 8px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }
        }, '🌿 Plant Wellness Overview'),
        React.createElement('div', {
          style: { display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '16px' }
        },
          React.createElement('div', {
            style: {
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          },
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: '28px', fontWeight: '700', color: COLORS.white }
            }, '92')
          ),
          React.createElement('div', null,
            React.createElement('p', {
              style: {
                fontFamily: FONT,
                fontSize: '17px',
                fontWeight: '600',
                color: COLORS.white,
                margin: 0,
              }
            }, 'Overall Health Score'),
            React.createElement('p', {
              style: {
                fontFamily: FONT,
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                margin: '2px 0 0',
              }
            }, '12 plants • 3 need attention')
          )
        ),
        React.createElement('div', {
          style: {
            height: 6,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 3,
            overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              width: '92%',
              height: '100%',
              backgroundColor: COLORS.cta,
              borderRadius: 3,
              transition: 'width 1s ease',
            }
          })
        )
      ),

      // Quick Actions
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '24px',
        }
      },
        quickActions.map((action, i) => {
          const Icon = window.lucide && window.lucide[action.icon];
          return React.createElement('button', {
            key: i,
            onClick: action.action,
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 8px',
              backgroundColor: theme.card,
              borderRadius: 16,
              border: 'none',
              cursor: 'pointer',
              boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.95)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: action.color + '18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            },
              Icon && React.createElement(Icon, { size: 20, color: action.color })
            ),
            React.createElement('span', {
              style: {
                fontFamily: FONT,
                fontSize: '11px',
                fontWeight: '500',
                color: theme.textSecondary,
                textAlign: 'center',
              }
            }, action.label)
          );
        })
      ),

      // Care Alerts
      React.createElement('div', { style: { marginBottom: '24px' } },
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }
        },
          React.createElement('h2', {
            style: {
              fontFamily: FONT,
              fontSize: '22px',
              fontWeight: '700',
              color: theme.text,
              margin: 0,
            }
          }, 'Care Alerts'),
          React.createElement('span', {
            style: {
              fontFamily: FONT,
              fontSize: '15px',
              color: COLORS.primary,
              fontWeight: '500',
              cursor: 'pointer',
            }
          }, 'See All')
        ),
        alerts.map((alert, i) => {
          const Icon = window.lucide && window.lucide[alert.icon];
          return React.createElement('div', {
            key: i,
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 16px',
              backgroundColor: theme.card,
              borderRadius: 14,
              marginBottom: '8px',
              boxShadow: darkMode ? 'none' : '0 1px 4px rgba(0,0,0,0.03)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: alert.color + '18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }
            },
              Icon && React.createElement(Icon, { size: 18, color: alert.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '15px',
                  fontWeight: '600',
                  color: theme.text,
                  margin: 0,
                }
              }, alert.plant),
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '13px',
                  color: theme.textSecondary,
                  margin: '2px 0 0',
                }
              }, alert.message)
            ),
            React.createElement('span', {
              style: {
                fontFamily: FONT,
                fontSize: '12px',
                color: theme.textCaption,
                fontWeight: '500',
              }
            }, alert.time)
          );
        })
      ),

      // Daily Tips
      React.createElement('div', { style: { marginBottom: '20px' } },
        React.createElement('h2', {
          style: {
            fontFamily: FONT,
            fontSize: '22px',
            fontWeight: '700',
            color: theme.text,
            margin: '0 0 12px',
          }
        }, 'Daily Tips'),
        tips.map((tip, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '16px',
              backgroundColor: theme.surface,
              borderRadius: 14,
              marginBottom: '8px',
            }
          },
            React.createElement('p', {
              style: {
                fontFamily: FONT,
                fontSize: '15px',
                fontWeight: '600',
                color: theme.text,
                margin: '0 0 4px',
              }
            }, tip.emoji + ' ' + tip.title),
            React.createElement('p', {
              style: {
                fontFamily: FONT,
                fontSize: '13px',
                color: theme.textSecondary,
                margin: 0,
                lineHeight: '1.4',
              }
            }, tip.desc)
          )
        )
      )
    );
  };

  const DiagnosisScreen = () => {
    const [diagStep, setDiagStep] = useState(scanComplete ? 'result' : 'camera');
    const [localProgress, setLocalProgress] = useState(0);

    const startScan = () => {
      setDiagStep('scanning');
      setLocalProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            setDiagStep('result');
            setScanComplete(true);
          }, 500);
        }
        setLocalProgress(Math.min(progress, 100));
      }, 200);
    };

    if (diagStep === 'camera') {
      return React.createElement('div', {
        style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
      },
        React.createElement('div', { style: { padding: '8px 0 20px' } },
          React.createElement('h1', {
            style: {
              fontFamily: FONT,
              fontSize: '34px',
              fontWeight: '700',
              color: theme.text,
              margin: 0,
            }
          }, 'AI Diagnosis'),
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '15px',
              color: theme.textSecondary,
              margin: '4px 0 0',
            }
          }, 'Snap a photo for instant plant health analysis')
        ),

        // Camera viewfinder
        React.createElement('div', {
          style: {
            width: '100%',
            height: 300,
            borderRadius: 24,
            backgroundColor: darkMode ? '#1a2420' : '#E8F0EC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
            border: `2px dashed ${COLORS.primary}40`,
          }
        },
          // Corner marks
          ...['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((pos, i) => {
            const isTop = pos.includes('top');
            const isLeft = pos.includes('Left');
            return React.createElement('div', {
              key: pos,
              style: {
                position: 'absolute',
                top: isTop ? 20 : 'auto',
                bottom: !isTop ? 20 : 'auto',
                left: isLeft ? 20 : 'auto',
                right: !isLeft ? 20 : 'auto',
                width: 30,
                height: 30,
                borderTop: isTop ? `3px solid ${COLORS.primary}` : 'none',
                borderBottom: !isTop ? `3px solid ${COLORS.primary}` : 'none',
                borderLeft: isLeft ? `3px solid ${COLORS.primary}` : 'none',
                borderRight: !isLeft ? `3px solid ${COLORS.primary}` : 'none',
                borderRadius: 4,
              }
            });
          }),
          React.createElement('span', {
            style: { fontSize: '48px', marginBottom: '12px' }
          }, '🌿'),
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '17px',
              fontWeight: '600',
              color: COLORS.primary,
              margin: 0,
            }
          }, 'Position your plant here'),
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '13px',
              color: theme.textCaption,
              margin: '4px 0 0',
            }
          }, 'Ensure good lighting for best results')
        ),

        // Scan button
        React.createElement('button', {
          onClick: startScan,
          style: {
            width: '100%',
            padding: '18px',
            backgroundColor: COLORS.primary,
            color: COLORS.white,
            border: 'none',
            borderRadius: 16,
            fontFamily: FONT,
            fontSize: '17px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '12px',
            transition: 'transform 0.2s',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          window.lucide && React.createElement(window.lucide.ScanLine, { size: 22, color: COLORS.white }),
          'Scan with OliScan AI'
        ),

        React.createElement('button', {
          onClick: startScan,
          style: {
            width: '100%',
            padding: '16px',
            backgroundColor: theme.surface,
            color: COLORS.primary,
            border: `1.5px solid ${COLORS.primary}30`,
            borderRadius: 16,
            fontFamily: FONT,
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }
        },
          window.lucide && React.createElement(window.lucide.Upload, { size: 18, color: COLORS.primary }),
          'Upload from Gallery'
        ),

        // Recent scans
        React.createElement('div', { style: { marginTop: '24px' } },
          React.createElement('h3', {
            style: {
              fontFamily: FONT,
              fontSize: '17px',
              fontWeight: '600',
              color: theme.text,
              margin: '0 0 12px',
            }
          }, 'Recent Scans'),
          [
            { name: 'Monstera', issue: 'Root Rot', severity: 'Medium', emoji: '🪴', date: '2 days ago' },
            { name: 'Snake Plant', issue: 'Healthy', severity: 'None', emoji: '🌵', date: '1 week ago' },
          ].map((scan, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setDiagStep('result'),
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                backgroundColor: theme.card,
                borderRadius: 14,
                marginBottom: '8px',
                cursor: 'pointer',
                boxShadow: darkMode ? 'none' : '0 1px 4px rgba(0,0,0,0.03)',
              }
            },
              React.createElement('span', { style: { fontSize: '28px' } }, scan.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: '15px', fontWeight: '600', color: theme.text, margin: 0 }
                }, scan.name),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: '13px', color: theme.textSecondary, margin: '2px 0 0' }
                }, scan.issue)
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', {
                  style: {
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 8,
                    backgroundColor: scan.severity === 'None' ? COLORS.success + '20' : COLORS.warning + '20',
                    fontFamily: FONT,
                    fontSize: '12px',
                    fontWeight: '600',
                    color: scan.severity === 'None' ? COLORS.success : COLORS.warning,
                    marginBottom: '2px',
                  }
                }, scan.severity === 'None' ? 'Healthy' : scan.severity),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: '11px', color: theme.textCaption, margin: '2px 0 0' }
                }, scan.date)
              )
            )
          )
        )
      );
    }

    if (diagStep === 'scanning') {
      return React.createElement('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 40px 80px',
        }
      },
        React.createElement('div', {
          style: {
            width: 120,
            height: 120,
            borderRadius: 60,
            border: `4px solid ${COLORS.primary}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            position: 'relative',
            background: `conic-gradient(${COLORS.primary} ${localProgress * 3.6}deg, ${theme.surface} 0deg)`,
          }
        },
          React.createElement('div', {
            style: {
              width: 104,
              height: 104,
              borderRadius: 52,
              backgroundColor: theme.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          },
            React.createElement('span', { style: { fontSize: '40px' } }, '🔬')
          )
        ),
        React.createElement('h2', {
          style: {
            fontFamily: FONT,
            fontSize: '22px',
            fontWeight: '700',
            color: theme.text,
            margin: '0 0 8px',
            textAlign: 'center',
          }
        }, 'Analyzing Your Plant'),
        React.createElement('p', {
          style: {
            fontFamily: FONT,
            fontSize: '15px',
            color: theme.textSecondary,
            textAlign: 'center',
            margin: '0 0 24px',
            lineHeight: '1.4',
          }
        }, 'Our AI is examining leaf patterns, discoloration, and growth indicators...'),
        React.createElement('div', {
          style: {
            width: '100%',
            height: 8,
            backgroundColor: theme.surface,
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: '12px',
          }
        },
          React.createElement('div', {
            style: {
              width: `${localProgress}%`,
              height: '100%',
              backgroundColor: COLORS.primary,
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }
          })
        ),
        React.createElement('p', {
          style: {
            fontFamily: FONT,
            fontSize: '13px',
            color: theme.textCaption,
            fontWeight: '500',
          }
        }, `${Math.round(localProgress)}% complete`)
      );
    }

    // Result screen
    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 0 16px',
        }
      },
        React.createElement('button', {
          onClick: () => { setDiagStep('camera'); setScanComplete(false); },
          style: {
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: FONT,
            fontSize: '17px',
            color: COLORS.primary,
            cursor: 'pointer',
            padding: 0,
          }
        },
          window.lucide && React.createElement(window.lucide.ChevronLeft, { size: 22, color: COLORS.primary }),
          'New Scan'
        ),
        React.createElement('button', {
          style: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }
        },
          window.lucide && React.createElement(window.lucide.Share2, { size: 20, color: theme.text })
        )
      ),

      // Diagnosis result card
      React.createElement('div', {
        style: {
          backgroundColor: theme.card,
          borderRadius: 20,
          padding: '20px',
          marginBottom: '16px',
          boxShadow: darkMode ? 'none' : '0 4px 16px rgba(0,0,0,0.06)',
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }
        },
          React.createElement('div', {
            style: {
              width: 72,
              height: 72,
              borderRadius: 18,
              backgroundColor: COLORS.warning + '20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            }
          }, '🪴'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h2', {
              style: {
                fontFamily: FONT,
                fontSize: '22px',
                fontWeight: '700',
                color: theme.text,
                margin: 0,
              }
            }, 'Monstera Deliciosa'),
            React.createElement('div', {
              style: {
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 8,
                backgroundColor: COLORS.warning + '20',
                marginTop: '6px',
              }
            },
              React.createElement('span', {
                style: {
                  fontFamily: FONT,
                  fontSize: '13px',
                  fontWeight: '600',
                  color: COLORS.warning,
                }
              }, '⚠️ Moderate Concern')
            )
          )
        ),

        // Diagnosis details
        React.createElement('div', {
          style: {
            backgroundColor: theme.surface,
            borderRadius: 14,
            padding: '16px',
            marginBottom: '16px',
          }
        },
          React.createElement('h3', {
            style: {
              fontFamily: FONT,
              fontSize: '17px',
              fontWeight: '600',
              color: theme.text,
              margin: '0 0 12px',
            }
          }, 'Diagnosis: Early Root Rot'),
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '15px',
              color: theme.textSecondary,
              margin: '0 0 12px',
              lineHeight: '1.5',
            }
          }, 'Signs of overwatering detected. Yellowing lower leaves and soft, brown root tips indicate early-stage root rot caused by excess moisture retention.'),
          React.createElement('div', {
            style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }
          },
            [
              { label: 'Confidence', value: '94%', color: COLORS.primary },
              { label: 'Severity', value: 'Medium', color: COLORS.warning },
              { label: 'Urgency', value: 'Act Now', color: COLORS.danger },
            ].map((stat, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: 1,
                  minWidth: 80,
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: theme.card,
                  borderRadius: 10,
                }
              },
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: '11px', color: theme.textCaption, margin: '0 0 2px', fontWeight: '500' }
                }, stat.label),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: '17px', fontWeight: '700', color: stat.color, margin: 0 }
                }, stat.value)
              )
            )
          )
        )
      ),

      // Treatment Plan
      React.createElement('div', {
        style: {
          backgroundColor: theme.card,
          borderRadius: 20,
          padding: '20px',
          marginBottom: '16px',
          boxShadow: darkMode ? 'none' : '0 4px 16px rgba(0,0,0,0.06)',
        }
      },
        React.createElement('h3', {
          style: {
            fontFamily: FONT,
            fontSize: '17px',
            fontWeight: '700',
            color: theme.text,
            margin: '0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }
        }, '💊 Treatment Plan'),
        [
          { step: 1, title: 'Remove from pot', desc: 'Gently remove the plant and shake off old soil', done: false },
          { step: 2, title: 'Trim damaged roots', desc: 'Cut away any brown, mushy roots with sterile scissors', done: false },
          { step: 3, title: 'Apply fungicide', desc: 'Dust remaining roots with cinnamon or fungicide powder', done: false },
          { step: 4, title: 'Repot in fresh soil', desc: 'Use well-draining mix with perlite', done: false },
          { step: 5, title: 'Reduce watering', desc: 'Wait 5-7 days before first watering', done: false },
        ].map((step, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex',
              gap: '14px',
              marginBottom: i < 4 ? '16px' : 0,
              alignItems: 'flex-start',
            }
          },
            React.createElement('div', {
              style: {
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: COLORS.primary + '18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT,
                fontSize: '13px',
                fontWeight: '700',
                color: COLORS.primary,
                flexShrink: 0,
                marginTop: 2,
              }
            }, step.step),
            React.createElement('div', null,
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '15px',
                  fontWeight: '600',
                  color: theme.text,
                  margin: 0,
                }
              }, step.title),
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '13px',
                  color: theme.textSecondary,
                  margin: '2px 0 0',
                  lineHeight: '1.4',
                }
              }, step.desc)
            )
          )
        )
      ),

      // Save button
      React.createElement('button', {
        style: {
          width: '100%',
          padding: '18px',
          backgroundColor: COLORS.cta,
          color: '#2D3B38',
          border: 'none',
          borderRadius: 16,
          fontFamily: FONT,
          fontSize: '17px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }
      },
        window.lucide && React.createElement(window.lucide.BookmarkPlus, { size: 20, color: '#2D3B38' }),
        'Save Treatment Plan'
      )
    );
  };

  const PlantsScreen = () => {
    const plants = [
      { id: 1, name: 'Monstera Deliciosa', species: 'Swiss Cheese Plant', health: 72, emoji: '🪴', lastWatered: '2 days ago', nextWater: 'Tomorrow', light: 'Bright indirect', issues: 1 },
      { id: 2, name: 'Peace Lily', species: 'Spathiphyllum', health: 95, emoji: '🌸', lastWatered: 'Yesterday', nextWater: 'In 3 days', light: 'Low to medium', issues: 0 },
      { id: 3, name: 'Fiddle Leaf Fig', species: 'Ficus lyrata', health: 88, emoji: '🌳', lastWatered: '3 days ago', nextWater: 'Today', light: 'Bright indirect', issues: 0 },
      { id: 4, name: 'Snake Plant', species: 'Sansevieria', health: 98, emoji: '🌵', lastWatered: '1 week ago', nextWater: 'In 5 days', light: 'Any light', issues: 0 },
      { id: 5, name: 'Pothos', species: 'Epipremnum aureum', health: 85, emoji: '🌿', lastWatered: '4 days ago', nextWater: 'Today', light: 'Low to bright', issues: 0 },
      { id: 6, name: 'Calathea', species: 'Calathea ornata', health: 65, emoji: '🍃', lastWatered: 'Yesterday', nextWater: 'In 2 days', light: 'Medium indirect', issues: 2 },
    ];

    const getHealthColor = (health) => {
      if (health >= 90) return COLORS.success;
      if (health >= 70) return COLORS.warning;
      return COLORS.danger;
    };

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0 20px',
        }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: {
              fontFamily: FONT,
              fontSize: '34px',
              fontWeight: '700',
              color: theme.text,
              margin: 0,
            }
          }, 'My Plants'),
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '15px',
              color: theme.textSecondary,
              margin: '4px 0 0',
            }
          }, `${plants.length} plants in your garden`)
        ),
        React.createElement('button', {
          style: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: COLORS.primary,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        },
          window.lucide && React.createElement(window.lucide.Plus, { size: 22, color: COLORS.white })
        )
      ),

      // Summary stats
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '20px',
        }
      },
        [
          { label: 'Thriving', value: '4', color: COLORS.success, icon: 'Heart' },
          { label: 'Needs Care', value: '1', color: COLORS.warning, icon: 'AlertTriangle' },
          { label: 'Critical', value: '1', color: COLORS.danger, icon: 'AlertCircle' },
        ].map((stat, i) => {
          const Icon = window.lucide && window.lucide[stat.icon];
          return React.createElement('div', {
            key: i,
            style: {
              padding: '14px 12px',
              backgroundColor: theme.card,
              borderRadius: 14,
              textAlign: 'center',
              boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
            }
          },
            Icon && React.createElement(Icon, {
              size: 18,
              color: stat.color,
              style: { marginBottom: 4 }
            }),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: '22px', fontWeight: '700', color: stat.color, margin: '4px 0 2px' }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: '11px', color: theme.textCaption, margin: 0, fontWeight: '500' }
            }, stat.label)
          );
        })
      ),

      // Plant list
      plants.map((plant, i) =>
        React.createElement('div', {
          key: plant.id,
          onClick: () => setSelectedPlant(selectedPlant === plant.id ? null : plant.id),
          style: {
            backgroundColor: theme.card,
            borderRadius: 18,
            padding: '16px',
            marginBottom: '10px',
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: selectedPlant === plant.id ? `2px solid ${COLORS.primary}40` : '2px solid transparent',
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: '14px' }
          },
            React.createElement('div', {
              style: {
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: theme.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
              }
            }, plant.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
              },
                React.createElement('p', {
                  style: {
                    fontFamily: FONT,
                    fontSize: '17px',
                    fontWeight: '600',
                    color: theme.text,
                    margin: 0,
                  }
                }, plant.name),
                React.createElement('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: getHealthColor(plant.health),
                    }
                  }),
                  React.createElement('span', {
                    style: {
                      fontFamily: FONT,
                      fontSize: '15px',
                      fontWeight: '600',
                      color: getHealthColor(plant.health),
                    }
                  }, plant.health + '%')
                )
              ),
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '13px',
                  color: theme.textCaption,
                  margin: '2px 0 8px',
                }
              }, plant.species),
              // Health bar
              React.createElement('div', {
                style: {
                  height: 4,
                  backgroundColor: theme.surface,
                  borderRadius: 2,
                  overflow: 'hidden',
                }
              },
                React.createElement('div', {
                  style: {
                    width: `${plant.health}%`,
                    height: '100%',
                    backgroundColor: getHealthColor(plant.health),
                    borderRadius: 2,
                    transition: 'width 0.8s ease',
                  }
                })
              )
            )
          ),

          // Expanded details
          selectedPlant === plant.id && React.createElement('div', {
            style: {
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: `1px solid ${theme.border}`,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
            }
          },
            [
              { icon: 'Droplets', label: 'Last Watered', value: plant.lastWatered, color: '#5B9BD5' },
              { icon: 'Clock', label: 'Next Water', value: plant.nextWater, color: COLORS.primary },
              { icon: 'Sun', label: 'Light Needs', value: plant.light, color: COLORS.cta },
              { icon: 'AlertTriangle', label: 'Active Issues', value: plant.issues > 0 ? `${plant.issues} found` : 'None', color: plant.issues > 0 ? COLORS.danger : COLORS.success },
            ].map((detail, j) => {
              const Icon = window.lucide && window.lucide[detail.icon];
              return React.createElement('div', {
                key: j,
                style: {
                  padding: '10px',
                  backgroundColor: theme.surface,
                  borderRadius: 10,
                }
              },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }
                },
                  Icon && React.createElement(Icon, { size: 14, color: detail.color }),
                  React.createElement('span', {
                    style: { fontFamily: FONT, fontSize: '11px', color: theme.textCaption, fontWeight: '500' }
                  }, detail.label)
                ),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: '13px', fontWeight: '600', color: theme.text, margin: 0 }
                }, detail.value)
              );
            })
          )
        )
      )
    );
  };

  const CommunityScreen = () => {
    const posts = [
      {
        id: 1,
        user: 'PlantMama_Sarah',
        avatar: '👩‍🌾',
        time: '2h ago',
        content: 'My Monstera just unfurled its biggest leaf yet! After the root rot scare last month, I\'m so relieved. The treatment plan from RootDoctor saved it! 🌿✨',
        likes: 47,
        comments: 12,
        tag: 'Success Story',
        tagColor: COLORS.success,
      },
      {
        id: 2,
        user: 'UrbanJungle_Tom',
        avatar: '🧔',
        time: '5h ago',
        content: 'Has anyone dealt with spider mites on Calathea? I\'ve tried neem oil but they keep coming back. Any tips appreciated! 🕷️😫',
        likes: 23,
        comments: 31,
        tag: 'Help Needed',
        tagColor: COLORS.warning,
      },
      {
        id: 3,
        user: 'GreenThumb_Lisa',
        avatar: '👩',
        time: '8h ago',
        content: 'Pro tip: Add a layer of LECA at the bottom of your pots for better drainage. Game changer for my tropical collection! 🪴💡',
        likes: 89,
        comments: 8,
        tag: 'Tip',
        tagColor: COLORS.primary,
      },
      {
        id: 4,
        user: 'BotanyBoy',
        avatar: '👨‍🔬',
        time: '1d ago',
        content: 'Just propagated 15 pothos cuttings. If anyone in the NYC area wants to swap, hit me up! I\'m looking for philodendron varieties. 🌱🔄',
        likes: 56,
        comments: 22,
        tag: 'Plant Swap',
        tagColor: COLORS.secondary,
      },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0 16px',
        }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: {
              fontFamily: FONT,
              fontSize: '34px',
              fontWeight: '700',
              color: theme.text,
              margin: 0,
            }
          }, 'Community'),
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '15px',
              color: theme.textSecondary,
              margin: '4px 0 0',
            }
          }, 'GreenThumb Hub • 12.4k members')
        ),
        React.createElement('button', {
          style: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: COLORS.cta,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        },
          window.lucide && React.createElement(window.lucide.PenSquare, { size: 20, color: '#2D3B38' })
        )
      ),

      // Filter tabs
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }
      },
        ['All', 'Help', 'Tips', 'Success', 'Swaps'].map((tab, i) =>
          React.createElement('button', {
            key: tab,
            style: {
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              backgroundColor: i === 0 ? COLORS.primary : theme.surface,
              color: i === 0 ? COLORS.white : theme.textSecondary,
              fontFamily: FONT,
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }
          }, tab)
        )
      ),

      // Posts
      posts.map(post =>
        React.createElement('div', {
          key: post.id,
          style: {
            backgroundColor: theme.card,
            borderRadius: 18,
            padding: '16px',
            marginBottom: '12px',
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
          }
        },
          // Post header
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }
          },
            React.createElement('div', {
              style: {
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }
            }, post.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '15px',
                  fontWeight: '600',
                  color: theme.text,
                  margin: 0,
                }
              }, post.user),
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: '12px', color: theme.textCaption, margin: '1px 0 0' }
              }, post.time)
            ),
            React.createElement('div', {
              style: {
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: post.tagColor + '18',
              }
            },
              React.createElement('span', {
                style: {
                  fontFamily: FONT,
                  fontSize: '11px',
                  fontWeight: '600',
                  color: post.tagColor,
                }
              }, post.tag)
            )
          ),

          // Content
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '15px',
              color: theme.text,
              margin: '0 0 14px',
              lineHeight: '1.5',
            }
          }, post.content),

          // Actions
          React.createElement('div', {
            style: {
              display: 'flex',
              gap: '20px',
              paddingTop: '12px',
              borderTop: `1px solid ${theme.border}`,
            }
          },
            React.createElement('button', {
              onClick: (e) => {
                e.stopPropagation();
                setLikedPosts(prev => ({ ...prev, [post.id]: !prev[post.id] }));
              },
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'transform 0.2s',
              }
            },
              window.lucide && React.createElement(window.lucide.Heart, {
                size: 18,
                color: likedPosts[post.id] ? COLORS.danger : theme.textCaption,
                fill: likedPosts[post.id] ? COLORS.danger : 'none',
              }),
              React.createElement('span', {
                style: {
                  fontFamily: FONT,
                  fontSize: '13px',
                  color: likedPosts[post.id] ? COLORS.danger : theme.textCaption,
                  fontWeight: '500',
                }
              }, likedPosts[post.id] ? post.likes + 1 : post.likes)
            ),
            React.createElement('button', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }
            },
              window.lucide && React.createElement(window.lucide.MessageCircle, { size: 18, color: theme.textCaption }),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: '13px', color: theme.textCaption, fontWeight: '500' }
              }, post.comments)
            ),
            React.createElement('button', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 'auto',
              }
            },
              window.lucide && React.createElement(window.lucide.Bookmark, { size: 18, color: theme.textCaption })
            )
          )
        )
      )
    );
  };

  const JournalScreen = () => {
    const journals = [
      {
        id: 1,
        plant: 'Monstera Deliciosa',
        emoji: '🪴',
        entries: [
          { date: 'Dec 15, 2024', note: 'New leaf unfurling! Beautiful fenestrations starting to show.', type: 'milestone', photo: '📸' },
          { date: 'Dec 10, 2024', note: 'Repotted into larger container. Roots look much healthier now.', type: 'care', photo: null },
          { date: 'Dec 3, 2024', note: 'Started root rot treatment plan. Trimmed affected roots.', type: 'treatment', photo: '📸' },
          { date: 'Nov 28, 2024', note: 'Diagnosed with early root rot via OliScan.', type: 'diagnosis', photo: '📸' },
        ]
      },
      {
        id: 2,
        plant: 'Calathea Ornata',
        emoji: '🍃',
        entries: [
          { date: 'Dec 14, 2024', note: 'Moved to bathroom for higher humidity. Leaves already perking up!', type: 'care', photo: null },
          { date: 'Dec 8, 2024', note: 'Brown leaf tips noticed. Adjusting watering schedule.', type: 'observation', photo: '📸' },
        ]
      },
      {
        id: 3,
        plant: 'Fiddle Leaf Fig',
        emoji: '🌳',
        entries: [
          { date: 'Dec 12, 2024', note: '3 new leaves this month! Rotation schedule is working wonders.', type: 'milestone', photo: '📸' },
          { date: 'Nov 30, 2024', note: 'Started weekly rotation for even growth.', type: 'care', photo: null },
        ]
      },
    ];

    const getEntryTypeColor = (type) => {
      switch (type) {
        case 'milestone': return COLORS.success;
        case 'treatment': return COLORS.danger;
        case 'diagnosis': return COLORS.warning;
        case 'care': return COLORS.primary;
        case 'observation': return COLORS.secondary;
        default: return theme.textCaption;
      }
    };

    const getEntryTypeIcon = (type) => {
      switch (type) {
        case 'milestone': return 'Trophy';
        case 'treatment': return 'Pill';
        case 'diagnosis': return 'ScanLine';
        case 'care': return 'Heart';
        case 'observation': return 'Eye';
        default: return 'FileText';
      }
    };

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0 20px',
        }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: {
              fontFamily: FONT,
              fontSize: '34px',
              fontWeight: '700',
              color: theme.text,
              margin: 0,
            }
          }, 'Journal'),
          React.createElement('p', {
            style: {
              fontFamily: FONT,
              fontSize: '15px',
              color: theme.textSecondary,
              margin: '4px 0 0',
            }
          }, 'Document your plant journeys')
        ),
        React.createElement('button', {
          style: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: COLORS.cta,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        },
          window.lucide && React.createElement(window.lucide.Plus, { size: 22, color: '#2D3B38' })
        )
      ),

      // Stats bar
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
        }
      },
        [
          { label: 'Total Entries', value: '28', icon: 'FileText' },
          { label: 'This Month', value: '8', icon: 'Calendar' },
          { label: 'Photos', value: '15', icon: 'Camera' },
        ].map((stat, i) => {
          const Icon = window.lucide && window.lucide[stat.icon];
          return React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              padding: '12px',
              backgroundColor: theme.card,
              borderRadius: 14,
              textAlign: 'center',
              boxShadow: darkMode ? 'none' : '0 2px 6px rgba(0,0,0,0.03)',
            }
          },
            Icon && React.createElement(Icon, { size: 16, color: COLORS.primary, style: { marginBottom: 4 } }),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: '20px', fontWeight: '700', color: theme.text, margin: '2px 0' }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: '11px', color: theme.textCaption, margin: 0, fontWeight: '500' }
            }, stat.label)
          );
        })
      ),

      // Journal entries by plant
      journals.map(journal =>
        React.createElement('div', {
          key: journal.id,
          style: {
            backgroundColor: theme.card,
            borderRadius: 18,
            marginBottom: '12px',
            overflow: 'hidden',
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
          }
        },
          // Plant header
          React.createElement('button', {
            onClick: () => setJournalExpanded(journalExpanded === journal.id ? null : journal.id),
            style: {
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }
          },
            React.createElement('span', { style: { fontSize: '28px' } }, journal.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '17px',
                  fontWeight: '600',
                  color: theme.text,
                  margin: 0,
                }
              }, journal.plant),
              React.createElement('p', {
                style: {
                  fontFamily: FONT,
                  fontSize: '13px',
                  color: theme.textCaption,
                  margin: '2px 0 0',
                }
              }, `${journal.entries.length} entries`)
            ),
            window.lucide && React.createElement(
              journalExpanded === journal.id ? window.lucide.ChevronUp : window.lucide.ChevronDown,
              { size: 20, color: theme.textCaption }
            )
          ),

          // Expanded entries
          journalExpanded === journal.id && React.createElement('div', {
            style: {
              padding: '0 16px 16px',
              borderTop: `1px solid ${theme.border}`,
            }
          },
            journal.entries.map((entry, i) => {
              const EntryIcon = window.lucide && window.lucide[getEntryTypeIcon(entry.type)];
              return React.createElement('div', {
                key: i,
                style: {
                  display: 'flex',
                  gap: '12px',
                  paddingTop: '14px',
                  position: 'relative',
                }
              },
                // Timeline line
                React.createElement('div', {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 24,
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: getEntryTypeColor(entry.type) + '20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  },
                    EntryIcon && React.createElement(EntryIcon, { size: 12, color: getEntryTypeColor(entry.type) })
                  ),
                  i < journal.entries.length - 1 && React.createElement('div', {
                    style: {
                      width: 2,
                      flex: 1,
                      backgroundColor: theme.border,
                      marginTop: 4,
                    }
                  })
                ),
                React.createElement('div', {
                  style: {
                    flex: 1,
                    paddingBottom: i < journal.entries.length - 1 ? '12px' : 0,
                  }
                },
                  React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }
                  },
                    React.createElement('span', {
                      style: {
                        fontFamily: FONT,
                        fontSize: '12px',
                        color: theme.textCaption,
                        fontWeight: '500',
                      }
                    }, entry.date),
                    entry.photo && React.createElement('span', {
                      style: { fontSize: '12px' }
                    }, entry.photo),
                    React.createElement('span', {
                      style: {
                        fontFamily: FONT,
                        fontSize: '10px',
                        fontWeight: '600',
                        color: getEntryTypeColor(entry.type),
                        backgroundColor: getEntryTypeColor(entry.type) + '15',
                        padding: '2px 8px',
                        borderRadius: 6,
                        textTransform: 'capitalize',
                      }
                    }, entry.type)
                  ),
                  React.createElement('p', {
                    style: {
                      fontFamily: FONT,
                      fontSize: '14px',
                      color: theme.text,
                      margin: 0,
                      lineHeight: '1.4',
                    }
                  }, entry.note)
                )
              );
            })
          )
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    diagnosis: DiagnosisScreen,
    plants: PlantsScreen,
    community: CommunityScreen,
    journal: JournalScreen,
  };

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: FONT,
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        backgroundColor: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)',
        border: `8px solid ${darkMode ? '#1a1a1a' : '#2a2a2a'}`,
      }
    },
      // Dynamic island
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 32,
          borderRadius: 20,
          backgroundColor: '#000',
          zIndex: 100,
        }
      }),

      // Status bar
      React.createElement(StatusBar, null),

      // Screen content
      React.createElement('div', {
        style: {
          height: 'calc(100% - 40px)',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            height: '100%',
            opacity: animatingScreen ? 0.5 : 1,
            transform: animatingScreen ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 0.15s ease',
          }
        },
          React.createElement(ScreenComponent, null)
        ),

        // Tab bar
        React.createElement(TabBar, null)
      )
    )
  );
}