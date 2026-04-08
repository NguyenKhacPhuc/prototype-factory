const { useState, useEffect, useRef, useCallback } = React;

const FONTS = {
  system: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif"
};

const LIGHT_THEME = {
  primary: '#2979FF',
  secondary: '#FF5252',
  cta: '#EC4899',
  bg: '#FAFAFA',
  card: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  navBg: 'rgba(255,255,255,0.95)',
  cardShadow: '0 2px 12px rgba(0,0,0,0.08)',
  overlay: 'rgba(0,0,0,0.03)'
};

const DARK_THEME = {
  primary: '#448AFF',
  secondary: '#FF6E6E',
  cta: '#F472B6',
  bg: '#0F0F1A',
  card: '#1A1A2E',
  text: '#F0F0FF',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  border: '#2A2A3E',
  navBg: 'rgba(15,15,26,0.95)',
  cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
  overlay: 'rgba(255,255,255,0.03)'
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [screenTransition, setScreenTransition] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [breathTimer, setBreathTimer] = useState(4);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [sleepMixes, setSleepMixes] = useState({ rain: 0.7, ocean: 0.3, wind: 0, fire: 0, birds: 0, white: 0 });
  const [journalEntries, setJournalEntries] = useState([
    { id: 1, date: '2024-01-15', mood: 4, text: 'Good shift tonight. Connected with a patient who was scared.', gratitude: 'Grateful for my supportive team.' },
    { id: 2, date: '2024-01-14', mood: 3, text: 'Tough night, lost a patient. Need to process.', gratitude: 'Grateful I could be there for the family.' },
    { id: 3, date: '2024-01-13', mood: 5, text: 'Amazing shift! New nurse shadowed me and I loved mentoring.', gratitude: 'Grateful for growth opportunities.' }
  ]);
  const [newEntry, setNewEntry] = useState({ mood: 3, text: '', gratitude: '' });
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedBreathTechnique, setSelectedBreathTechnique] = useState(null);
  const breathIntervalRef = useRef(null);

  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  const navigateTo = useCallback((screen, tab) => {
    setScreenTransition(true);
    setTimeout(() => {
      setActiveScreen(screen);
      if (tab) setActiveTab(tab);
      setScreenTransition(false);
    }, 150);
  }, []);

  const breathTechniques = [
    { id: 'box', name: 'Box Breathing', desc: '4-4-4-4 pattern for calm focus', phases: [{ name: 'Inhale', duration: 4 }, { name: 'Hold', duration: 4 }, { name: 'Exhale', duration: 4 }, { name: 'Hold', duration: 4 }], color: '#2979FF' },
    { id: '478', name: '4-7-8 Breathing', desc: 'Deep relaxation technique', phases: [{ name: 'Inhale', duration: 4 }, { name: 'Hold', duration: 7 }, { name: 'Exhale', duration: 8 }], color: '#7C3AED' },
    { id: 'calm', name: 'Calming Breath', desc: 'Extended exhale for instant relief', phases: [{ name: 'Inhale', duration: 4 }, { name: 'Exhale', duration: 8 }], color: '#059669' }
  ];

  const meditations = [
    { id: 1, title: 'Pre-Shift Centering', duration: '5 min', category: 'pre-shift', desc: 'Ground yourself before your shift begins', icon: 'Sun', color: '#F59E0B' },
    { id: 2, title: 'Mid-Shift Calm', duration: '3 min', category: 'mid-shift', desc: 'Quick reset during a hectic night', icon: 'Pause', color: '#2979FF' },
    { id: 3, title: 'Emotional Release', duration: '10 min', category: 'mid-shift', desc: 'Process difficult moments with compassion', icon: 'Heart', color: '#EC4899' },
    { id: 4, title: 'Post-Shift Wind Down', duration: '15 min', category: 'post-shift', desc: 'Transition from work to rest mode', icon: 'Moon', color: '#7C3AED' },
    { id: 5, title: 'Fatigue Fighter', duration: '5 min', category: 'mid-shift', desc: 'Gentle energy boost without caffeine', icon: 'Zap', color: '#FF5252' },
    { id: 6, title: 'Gratitude Practice', duration: '8 min', category: 'post-shift', desc: 'Find meaning in your caregiving work', icon: 'Sparkles', color: '#059669' }
  ];

  useEffect(() => {
    if (breathingActive && selectedBreathTechnique) {
      const technique = breathTechniques.find(t => t.id === selectedBreathTechnique);
      let phaseIndex = 0;
      let countdown = technique.phases[0].duration;

      setBreathPhase(technique.phases[0].name);
      setBreathTimer(countdown);

      breathIntervalRef.current = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
          phaseIndex = (phaseIndex + 1) % technique.phases.length;
          if (phaseIndex === 0) {
            setBreathCount(prev => prev + 1);
          }
          countdown = technique.phases[phaseIndex].duration;
          setBreathPhase(technique.phases[phaseIndex].name);
        }
        setBreathTimer(countdown);
      }, 1000);

      return () => clearInterval(breathIntervalRef.current);
    }
  }, [breathingActive, selectedBreathTechnique]);

  useEffect(() => {
    let interval;
    if (isPlaying && selectedMeditation) {
      interval = setInterval(() => {
        setPlayProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedMeditation]);

  const Icon = ({ name, size = 24, color = theme.text, style = {} }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
    return React.createElement(LucideIcon, { size, color, style, strokeWidth: 1.5 });
  };

  const StatusBar = () => {
    return React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 20px 0', height: 44, fontFamily: FONTS.system,
        fontSize: 15, fontWeight: '600', color: theme.text
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
        React.createElement(Icon, { name: 'Signal', size: 16, color: theme.text }),
        React.createElement(Icon, { name: 'Wifi', size: 16, color: theme.text }),
        React.createElement(Icon, { name: 'BatteryFull', size: 16, color: theme.text })
      )
    );
  };

  const TabBar = () => {
    const tabs = [
      { id: 'home', icon: 'Home', label: 'Home', screen: 'home' },
      { id: 'meditate', icon: 'Headphones', label: 'Meditate', screen: 'meditate' },
      { id: 'breathe', icon: 'Wind', label: 'Breathe', screen: 'breathe' },
      { id: 'sleep', icon: 'Moon', label: 'Sleep', screen: 'sleep' },
      { id: 'journal', icon: 'BookOpen', label: 'Journal', screen: 'journal' }
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: theme.navBg, backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${theme.border}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        paddingTop: 8, paddingBottom: 28, zIndex: 100
      }
    },
      tabs.map(tab =>
        React.createElement('button', {
          key: tab.id,
          onClick: () => navigateTo(tab.screen, tab.id),
          style: {
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2, padding: '4px 12px',
            transition: 'all 0.2s ease'
          }
        },
          React.createElement(Icon, {
            name: tab.icon, size: 22,
            color: activeTab === tab.id ? theme.primary : theme.textTertiary
          }),
          React.createElement('span', {
            style: {
              fontFamily: FONTS.system, fontSize: 10, fontWeight: '500',
              color: activeTab === tab.id ? theme.primary : theme.textTertiary,
              transition: 'color 0.2s ease'
            }
          }, tab.label)
        )
      )
    );
  };

  const HomeScreen = () => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 6) return 'Good night';
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    };

    const quickActions = [
      { icon: 'Wind', label: 'Quick\nBreath', color: '#2979FF', action: () => navigateTo('breathe', 'breathe') },
      { icon: 'Headphones', label: 'Mid-Shift\nCalm', color: '#7C3AED', action: () => { setSelectedMeditation(meditations[1]); navigateTo('player', 'meditate'); } },
      { icon: 'Moon', label: 'Sleep\nSounds', color: '#059669', action: () => navigateTo('sleep', 'sleep') },
      { icon: 'BookOpen', label: 'Quick\nLog', color: '#EC4899', action: () => { setShowNewEntry(true); navigateTo('journal', 'journal'); } }
    ];

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100, overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', { style: { paddingTop: 12, marginBottom: 24 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }
        },
          React.createElement('span', {
            style: { fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary, fontWeight: '500' }
          }, getGreeting()),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              background: theme.card, border: `1px solid ${theme.border}`,
              borderRadius: 20, width: 40, height: 40, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: theme.cardShadow, transition: 'all 0.3s ease'
            }
          },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: theme.primary })
          )
        ),
        React.createElement('h1', {
          style: {
            fontFamily: FONTS.system, fontSize: 34, fontWeight: '700',
            color: theme.text, margin: 0, lineHeight: 1.1
          }
        }, 'Lunar Lull'),
        React.createElement('p', {
          style: {
            fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary,
            margin: '4px 0 0', fontWeight: '400'
          }
        }, 'Your serene shift companion ✨')
      ),

      // Featured card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${theme.primary}, #7C3AED)`,
          borderRadius: 20, padding: 24, marginBottom: 24, position: 'relative',
          overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s ease'
        },
        onClick: () => { setSelectedMeditation(meditations[3]); navigateTo('player', 'meditate'); },
        onMouseEnter: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)'
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -20, right: 40, width: 80, height: 80,
            borderRadius: '50%', background: 'rgba(255,255,255,0.08)'
          }
        }),
        React.createElement('div', {
          style: {
            display: 'inline-flex', padding: '4px 12px', background: 'rgba(255,255,255,0.2)',
            borderRadius: 12, marginBottom: 12
          }
        },
          React.createElement('span', {
            style: { fontFamily: FONTS.system, fontSize: 13, color: '#fff', fontWeight: '600' }
          }, '🌙 Tonight\'s Pick')
        ),
        React.createElement('h2', {
          style: {
            fontFamily: FONTS.system, fontSize: 22, fontWeight: '700',
            color: '#fff', margin: '0 0 6px'
          }
        }, 'Post-Shift Wind Down'),
        React.createElement('p', {
          style: {
            fontFamily: FONTS.system, fontSize: 15, color: 'rgba(255,255,255,0.8)',
            margin: '0 0 16px'
          }
        }, '15 min guided meditation to transition into restful sleep'),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.2)', borderRadius: 24,
            padding: '10px 20px'
          }
        },
          React.createElement(Icon, { name: 'Play', size: 16, color: '#fff' }),
          React.createElement('span', {
            style: { fontFamily: FONTS.system, fontSize: 15, color: '#fff', fontWeight: '600' }
          }, 'Begin Session')
        )
      ),

      // Quick Actions
      React.createElement('h3', {
        style: {
          fontFamily: FONTS.system, fontSize: 17, fontWeight: '600',
          color: theme.text, margin: '0 0 12px'
        }
      }, 'Quick Actions'),
      React.createElement('div', {
        style: {
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 24
        }
      },
        quickActions.map((action, i) =>
          React.createElement('button', {
            key: i,
            onClick: action.action,
            style: {
              background: theme.card, border: `1px solid ${theme.border}`,
              borderRadius: 16, padding: '16px 8px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              boxShadow: theme.cardShadow, transition: 'all 0.2s ease'
            },
            onMouseEnter: (e) => e.currentTarget.style.transform = 'scale(0.95)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)'
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14,
                background: action.color + '18', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement(Icon, { name: action.icon, size: 22, color: action.color })
            ),
            React.createElement('span', {
              style: {
                fontFamily: FONTS.system, fontSize: 11, color: theme.text,
                fontWeight: '500', textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre-line'
              }
            }, action.label)
          )
        )
      ),

      // Recent meditations
      React.createElement('h3', {
        style: {
          fontFamily: FONTS.system, fontSize: 17, fontWeight: '600',
          color: theme.text, margin: '0 0 12px'
        }
      }, 'Recommended for You'),
      meditations.slice(0, 3).map(med =>
        React.createElement('div', {
          key: med.id,
          onClick: () => { setSelectedMeditation(med); navigateTo('player', 'meditate'); },
          style: {
            background: theme.card, borderRadius: 16, padding: 16, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow,
            transition: 'all 0.2s ease'
          },
          onMouseEnter: (e) => e.currentTarget.style.transform = 'translateX(4px)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'translateX(0)'
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 14,
              background: med.color + '18', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          },
            React.createElement(Icon, { name: med.icon, size: 24, color: med.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h4', {
              style: {
                fontFamily: FONTS.system, fontSize: 17, fontWeight: '600',
                color: theme.text, margin: '0 0 2px'
              }
            }, med.title),
            React.createElement('p', {
              style: {
                fontFamily: FONTS.system, fontSize: 13, color: theme.textSecondary,
                margin: 0
              }
            }, med.duration + ' • ' + med.desc)
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 20, color: theme.textTertiary })
        )
      )
    );
  };

  const MeditateScreen = () => {
    const [filter, setFilter] = useState('all');
    const categories = [
      { id: 'all', label: 'All' },
      { id: 'pre-shift', label: 'Pre-Shift' },
      { id: 'mid-shift', label: 'Mid-Shift' },
      { id: 'post-shift', label: 'Post-Shift' }
    ];

    const filtered = filter === 'all' ? meditations : meditations.filter(m => m.category === filter);

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100, overflowY: 'auto', height: '100%' }
    },
      React.createElement('h1', {
        style: {
          fontFamily: FONTS.system, fontSize: 34, fontWeight: '700',
          color: theme.text, margin: '12px 0 4px'
        }
      }, 'Meditate'),
      React.createElement('p', {
        style: {
          fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary,
          margin: '0 0 20px'
        }
      }, 'Shift-specific guided sessions'),

      // Filter chips
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }
      },
        categories.map(cat =>
          React.createElement('button', {
            key: cat.id,
            onClick: () => setFilter(cat.id),
            style: {
              background: filter === cat.id ? theme.primary : theme.card,
              color: filter === cat.id ? '#fff' : theme.text,
              border: `1px solid ${filter === cat.id ? theme.primary : theme.border}`,
              borderRadius: 20, padding: '8px 18px', cursor: 'pointer',
              fontFamily: FONTS.system, fontSize: 15, fontWeight: '500',
              whiteSpace: 'nowrap', transition: 'all 0.2s ease'
            }
          }, cat.label)
        )
      ),

      // Meditation cards
      filtered.map(med =>
        React.createElement('div', {
          key: med.id,
          onClick: () => { setSelectedMeditation(med); navigateTo('player', 'meditate'); },
          style: {
            background: theme.card, borderRadius: 20, padding: 20, marginBottom: 12,
            cursor: 'pointer', border: `1px solid ${theme.border}`,
            boxShadow: theme.cardShadow, transition: 'all 0.2s ease',
            position: 'relative', overflow: 'hidden'
          },
          onMouseEnter: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)'
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: -20, right: -20, width: 80, height: 80,
              borderRadius: '50%', background: med.color + '10'
            }
          }),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'flex-start', gap: 14 }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: med.color + '18', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              React.createElement(Icon, { name: med.icon, size: 26, color: med.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
              },
                React.createElement('h3', {
                  style: {
                    fontFamily: FONTS.system, fontSize: 17, fontWeight: '600',
                    color: theme.text, margin: 0
                  }
                }, med.title),
                React.createElement('span', {
                  style: {
                    fontFamily: FONTS.system, fontSize: 13, color: theme.textSecondary,
                    background: theme.overlay, padding: '4px 10px', borderRadius: 8
                  }
                }, med.duration)
              ),
              React.createElement('p', {
                style: {
                  fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary,
                  margin: '6px 0 0', lineHeight: 1.4
                }
              }, med.desc),
              React.createElement('span', {
                style: {
                  display: 'inline-block', marginTop: 8,
                  fontFamily: FONTS.system, fontSize: 13,
                  color: med.color, fontWeight: '600',
                  background: med.color + '12', padding: '3px 10px', borderRadius: 8
                }
              }, med.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()))
            )
          )
        )
      )
    );
  };

  const PlayerScreen = () => {
    const med = selectedMeditation || meditations[0];
    const [circleScale, setCircleScale] = useState(1);

    useEffect(() => {
      if (isPlaying) {
        const interval = setInterval(() => {
          setCircleScale(prev => prev === 1 ? 1.1 : 1);
        }, 2000);
        return () => clearInterval(interval);
      }
    }, [isPlaying]);

    return React.createElement('div', {
      style: {
        padding: '0 20px', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative'
      }
    },
      // Back button
      React.createElement('button', {
        onClick: () => { setIsPlaying(false); setPlayProgress(0); navigateTo('meditate', 'meditate'); },
        style: {
          position: 'absolute', top: 12, left: 20, background: theme.card,
          border: `1px solid ${theme.border}`, borderRadius: 14,
          width: 40, height: 40, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', boxShadow: theme.cardShadow
        }
      },
        React.createElement(Icon, { name: 'ChevronLeft', size: 20, color: theme.text })
      ),

      // Visualscape circle
      React.createElement('div', {
        style: {
          width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${med.color}40, ${med.color}10)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 40, position: 'relative',
          transform: `scale(${circleScale})`,
          transition: 'transform 2s ease-in-out',
          boxShadow: `0 0 60px ${med.color}30`
        }
      },
        React.createElement('div', {
          style: {
            width: 140, height: 140, borderRadius: '50%',
            background: `radial-gradient(circle, ${med.color}60, ${med.color}20)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement(Icon, { name: med.icon, size: 48, color: med.color })
        ),
        // Orbiting dots
        ...[0, 1, 2].map(i =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute', width: 8, height: 8, borderRadius: '50%',
              background: med.color, opacity: 0.4 + i * 0.2,
              top: 10 + i * 30, left: i % 2 === 0 ? -4 : undefined,
              right: i % 2 !== 0 ? -4 : undefined,
              animation: isPlaying ? `pulse ${2 + i}s ease-in-out infinite` : 'none'
            }
          })
        )
      ),

      React.createElement('h2', {
        style: {
          fontFamily: FONTS.system, fontSize: 22, fontWeight: '700',
          color: theme.text, margin: '0 0 6px', textAlign: 'center'
        }
      }, med.title),
      React.createElement('p', {
        style: {
          fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary,
          margin: '0 0 30px', textAlign: 'center'
        }
      }, med.desc),

      // Progress bar
      React.createElement('div', {
        style: {
          width: '100%', maxWidth: 280, height: 4, background: theme.border,
          borderRadius: 2, marginBottom: 8, overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: {
            width: `${playProgress}%`, height: '100%',
            background: med.color, borderRadius: 2,
            transition: 'width 0.1s linear'
          }
        })
      ),
      React.createElement('div', {
        style: {
          width: '100%', maxWidth: 280, display: 'flex',
          justifyContent: 'space-between', marginBottom: 30
        }
      },
        React.createElement('span', {
          style: { fontFamily: FONTS.system, fontSize: 13, color: theme.textTertiary }
        }, `${Math.floor(playProgress / 100 * parseInt(med.duration))}:${String(Math.floor((playProgress / 100 * parseInt(med.duration) % 1) * 60)).padStart(2, '0')}`),
        React.createElement('span', {
          style: { fontFamily: FONTS.system, fontSize: 13, color: theme.textTertiary }
        }, med.duration)
      ),

      // Controls
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 28 }
      },
        React.createElement('button', {
          onClick: () => setPlayProgress(Math.max(0, playProgress - 10)),
          style: {
            background: 'none', border: 'none', cursor: 'pointer', padding: 8
          }
        },
          React.createElement(Icon, { name: 'SkipBack', size: 28, color: theme.textSecondary })
        ),
        React.createElement('button', {
          onClick: () => setIsPlaying(!isPlaying),
          style: {
            background: med.color, border: 'none', borderRadius: '50%',
            width: 72, height: 72, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 20px ${med.color}40`,
            transition: 'transform 0.2s ease'
          },
          onMouseEnter: (e) => e.currentTarget.style.transform = 'scale(0.95)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)'
        },
          React.createElement(Icon, { name: isPlaying ? 'Pause' : 'Play', size: 32, color: '#fff' })
        ),
        React.createElement('button', {
          onClick: () => setPlayProgress(Math.min(100, playProgress + 10)),
          style: {
            background: 'none', border: 'none', cursor: 'pointer', padding: 8
          }
        },
          React.createElement(Icon, { name: 'SkipForward', size: 28, color: theme.textSecondary })
        )
      )
    );
  };

  const BreatheScreen = () => {
    if (breathingActive && selectedBreathTechnique) {
      const technique = breathTechniques.find(t => t.id === selectedBreathTechnique);
      const isInhale = breathPhase === 'Inhale';
      const isExhale = breathPhase === 'Exhale';
      const circleSize = isInhale ? 200 : isExhale ? 120 : 160;

      return React.createElement('div', {
        style: {
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '0 20px',
          position: 'relative'
        }
      },
        React.createElement('button', {
          onClick: () => { setBreathingActive(false); setBreathCount(0); clearInterval(breathIntervalRef.current); },
          style: {
            position: 'absolute', top: 12, left: 20, background: theme.card,
            border: `1px solid ${theme.border}`, borderRadius: 14,
            width: 40, height: 40, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement(Icon, { name: 'X', size: 20, color: theme.text })
        ),

        React.createElement('p', {
          style: {
            fontFamily: FONTS.system, fontSize: 13, color: theme.textTertiary,
            marginBottom: 8, fontWeight: '500'
          }
        }, `Cycle ${breathCount + 1} • ${technique.name}`),

        // Breathing circle
        React.createElement('div', {
          style: {
            width: circleSize, height: circleSize, borderRadius: '50%',
            background: `radial-gradient(circle, ${technique.color}50, ${technique.color}15)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 1s ease-in-out', marginBottom: 40,
            boxShadow: `0 0 ${circleSize / 2}px ${technique.color}25`
          }
        },
          React.createElement('div', {
            style: {
              width: circleSize * 0.6, height: circleSize * 0.6, borderRadius: '50%',
              background: `radial-gradient(circle, ${technique.color}70, ${technique.color}30)`,
              transition: 'all 1s ease-in-out', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement('span', {
              style: {
                fontFamily: FONTS.system, fontSize: 34, fontWeight: '700',
                color: '#fff'
              }
            }, breathTimer)
          )
        ),

        React.createElement('h2', {
          style: {
            fontFamily: FONTS.system, fontSize: 28, fontWeight: '700',
            color: theme.text, margin: '0 0 8px'
          }
        }, breathPhase),
        React.createElement('p', {
          style: {
            fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary
          }
        }, isInhale ? 'Breathe in slowly...' : isExhale ? 'Release gently...' : 'Hold steadily...'),

        React.createElement('button', {
          onClick: () => { setBreathingActive(false); setBreathCount(0); },
          style: {
            marginTop: 40, background: theme.card, border: `1px solid ${theme.border}`,
            borderRadius: 16, padding: '14px 32px', cursor: 'pointer',
            fontFamily: FONTS.system, fontSize: 17, fontWeight: '600', color: theme.text
          }
        }, 'End Session')
      );
    }

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100, overflowY: 'auto', height: '100%' }
    },
      React.createElement('h1', {
        style: {
          fontFamily: FONTS.system, fontSize: 34, fontWeight: '700',
          color: theme.text, margin: '12px 0 4px'
        }
      }, 'Breathe'),
      React.createElement('p', {
        style: {
          fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary,
          margin: '0 0 24px'
        }
      }, 'Quick-reset breathing techniques'),

      breathTechniques.map(tech =>
        React.createElement('div', {
          key: tech.id,
          onClick: () => { setSelectedBreathTechnique(tech.id); setBreathingActive(true); setBreathCount(0); },
          style: {
            background: theme.card, borderRadius: 20, padding: 24, marginBottom: 14,
            cursor: 'pointer', border: `1px solid ${theme.border}`,
            boxShadow: theme.cardShadow, position: 'relative', overflow: 'hidden',
            transition: 'all 0.2s ease'
          },
          onMouseEnter: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)'
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: -30, right: -30, width: 100, height: 100,
              borderRadius: '50%', background: tech.color + '10'
            }
          }),
          React.createElement('div', {
            style: {
              width: 56, height: 56, borderRadius: 18,
              background: tech.color + '18', display: 'flex',
              alignItems: 'center', justifyContent: 'center', marginBottom: 14
            }
          },
            React.createElement(Icon, { name: 'Wind', size: 28, color: tech.color })
          ),
          React.createElement('h3', {
            style: {
              fontFamily: FONTS.system, fontSize: 22, fontWeight: '700',
              color: theme.text, margin: '0 0 6px'
            }
          }, tech.name),
          React.createElement('p', {
            style: {
              fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary,
              margin: '0 0 12px'
            }
          }, tech.desc),
          React.createElement('div', {
            style: { display: 'flex', gap: 6 }
          },
            tech.phases.map((phase, i) =>
              React.createElement('span', {
                key: i,
                style: {
                  fontFamily: FONTS.system, fontSize: 13, color: tech.color,
                  background: tech.color + '15', padding: '4px 10px',
                  borderRadius: 8, fontWeight: '500'
                }
              }, `${phase.name} ${phase.duration}s`)
            )
          ),
          React.createElement('div', {
            style: {
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 16, background: tech.color, borderRadius: 14,
              padding: '10px 20px'
            }
          },
            React.createElement(Icon, { name: 'Play', size: 16, color: '#fff' }),
            React.createElement('span', {
              style: { fontFamily: FONTS.system, fontSize: 15, color: '#fff', fontWeight: '600' }
            }, 'Start')
          )
        )
      )
    );
  };

  const SleepScreen = () => {
    const soundOptions = [
      { id: 'rain', icon: 'CloudRain', label: 'Rain', color: '#2979FF' },
      { id: 'ocean', icon: 'Waves', label: 'Ocean', color: '#06B6D4' },
      { id: 'wind', icon: 'Wind', label: 'Wind', color: '#8B5CF6' },
      { id: 'fire', icon: 'Flame', label: 'Fireplace', color: '#F59E0B' },
      { id: 'birds', icon: 'Bird', label: 'Birds', color: '#059669' },
      { id: 'white', icon: 'Radio', label: 'White Noise', color: '#6B7280' }
    ];

    const [sleepTimerMin, setSleepTimerMin] = useState(30);
    const [sleepPlaying, setSleepPlaying] = useState(false);

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100, overflowY: 'auto', height: '100%' }
    },
      React.createElement('h1', {
        style: {
          fontFamily: FONTS.system, fontSize: 34, fontWeight: '700',
          color: theme.text, margin: '12px 0 4px'
        }
      }, 'Sleep'),
      React.createElement('p', {
        style: {
          fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary,
          margin: '0 0 24px'
        }
      }, 'Custom ambient sound mixes'),

      // Sound mix controls
      React.createElement('div', {
        style: {
          background: theme.card, borderRadius: 20, padding: 20,
          border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow,
          marginBottom: 16
        }
      },
        React.createElement('h3', {
          style: {
            fontFamily: FONTS.system, fontSize: 17, fontWeight: '600',
            color: theme.text, margin: '0 0 16px'
          }
        }, 'Sound Mix'),
        soundOptions.map(sound =>
          React.createElement('div', {
            key: sound.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: sound.color + '18', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              React.createElement(Icon, { name: sound.icon, size: 20, color: sound.color })
            ),
            React.createElement('span', {
              style: {
                fontFamily: FONTS.system, fontSize: 15, color: theme.text,
                fontWeight: '500', width: 80, flexShrink: 0
              }
            }, sound.label),
            React.createElement('div', {
              style: { flex: 1, position: 'relative', height: 32, display: 'flex', alignItems: 'center' }
            },
              React.createElement('input', {
                type: 'range', min: 0, max: 1, step: 0.1,
                value: sleepMixes[sound.id],
                onChange: (e) => setSleepMixes(prev => ({ ...prev, [sound.id]: parseFloat(e.target.value) })),
                style: {
                  width: '100%', height: 6, appearance: 'none', WebkitAppearance: 'none',
                  background: `linear-gradient(to right, ${sound.color} ${sleepMixes[sound.id] * 100}%, ${theme.border} ${sleepMixes[sound.id] * 100}%)`,
                  borderRadius: 3, outline: 'none', cursor: 'pointer'
                }
              })
            ),
            React.createElement('span', {
              style: {
                fontFamily: FONTS.system, fontSize: 13, color: theme.textTertiary,
                width: 30, textAlign: 'right'
              }
            }, `${Math.round(sleepMixes[sound.id] * 100)}%`)
          )
        )
      ),

      // Sleep timer
      React.createElement('div', {
        style: {
          background: theme.card, borderRadius: 20, padding: 20,
          border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow,
          marginBottom: 16
        }
      },
        React.createElement('h3', {
          style: {
            fontFamily: FONTS.system, fontSize: 17, fontWeight: '600',
            color: theme.text, margin: '0 0 14px'
          }
        }, 'Sleep Timer'),
        React.createElement('div', {
          style: { display: 'flex', gap: 8 }
        },
          [15, 30, 45, 60, 90].map(min =>
            React.createElement('button', {
              key: min,
              onClick: () => setSleepTimerMin(min),
              style: {
                flex: 1, background: sleepTimerMin === min ? theme.primary : 'transparent',
                color: sleepTimerMin === min ? '#fff' : theme.textSecondary,
                border: `1px solid ${sleepTimerMin === min ? theme.primary : theme.border}`,
                borderRadius: 12, padding: '10px 4px', cursor: 'pointer',
                fontFamily: FONTS.system, fontSize: 15, fontWeight: '600',
                transition: 'all 0.2s ease'
              }
            }, `${min}m`)
          )
        )
      ),

      // Play button
      React.createElement('button', {
        onClick: () => setSleepPlaying(!sleepPlaying),
        style: {
          width: '100%', background: sleepPlaying ? theme.secondary : theme.primary,
          border: 'none', borderRadius: 16, padding: '18px 0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: `0 4px 20px ${sleepPlaying ? theme.secondary : theme.primary}30`,
          transition: 'all 0.3s ease'
        }
      },
        React.createElement(Icon, { name: sleepPlaying ? 'Pause' : 'Play', size: 22, color: '#fff' }),
        React.createElement('span', {
          style: {
            fontFamily: FONTS.system, fontSize: 17, color: '#fff', fontWeight: '700'
          }
        }, sleepPlaying ? 'Stop Sounds' : 'Start Sleep Sounds')
      )
    );
  };

  const JournalScreen = () => {
    const moodEmojis = ['😔', '😐', '🙂', '😊', '🌟'];

    if (showNewEntry) {
      return React.createElement('div', {
        style: { padding: '0 20px', paddingBottom: 100, overflowY: 'auto', height: '100%' }
      },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 12, marginBottom: 20
          }
        },
          React.createElement('button', {
            onClick: () => setShowNewEntry(false),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: FONTS.system, fontSize: 17, color: theme.primary
            }
          }, '← Back'),
          React.createElement('h2', {
            style: {
              fontFamily: FONTS.system, fontSize: 17, fontWeight: '600', color: theme.text
            }
          }, 'New Entry'),
          React.createElement('div', { style: { width: 50 } })
        ),

        // Mood selector
        React.createElement('div', {
          style: {
            background: theme.card, borderRadius: 20, padding: 20,
            border: `1px solid ${theme.border}`, marginBottom: 14
          }
        },
          React.createElement('h3', {
            style: {
              fontFamily: FONTS.system, fontSize: 15, fontWeight: '600',
              color: theme.textSecondary, margin: '0 0 12px'
            }
          }, 'How are you feeling?'),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-around' }
          },
            moodEmojis.map((emoji, i) =>
              React.createElement('button', {
                key: i,
                onClick: () => setNewEntry(prev => ({ ...prev, mood: i + 1 })),
                style: {
                  fontSize: 32, background: newEntry.mood === i + 1 ? theme.primary + '20' : 'transparent',
                  border: `2px solid ${newEntry.mood === i + 1 ? theme.primary : 'transparent'}`,
                  borderRadius: 16, width: 56, height: 56, cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }
              }, emoji)
            )
          )
        ),

        // Reflection text
        React.createElement('div', {
          style: {
            background: theme.card, borderRadius: 20, padding: 20,
            border: `1px solid ${theme.border}`, marginBottom: 14
          }
        },
          React.createElement('h3', {
            style: {
              fontFamily: FONTS.system, fontSize: 15, fontWeight: '600',
              color: theme.textSecondary, margin: '0 0 10px'
            }
          }, 'Shift Reflection'),
          React.createElement('textarea', {
            value: newEntry.text,
            onChange: (e) => setNewEntry(prev => ({ ...prev, text: e.target.value })),
            placeholder: 'How was your shift? What stood out?',
            style: {
              width: '100%', minHeight: 100, background: theme.overlay,
              border: `1px solid ${theme.border}`, borderRadius: 12,
              padding: 14, fontFamily: FONTS.system, fontSize: 15,
              color: theme.text, resize: 'vertical', outline: 'none',
              boxSizing: 'border-box'
            }
          })
        ),

        // Gratitude
        React.createElement('div', {
          style: {
            background: theme.card, borderRadius: 20, padding: 20,
            border: `1px solid ${theme.border}`, marginBottom: 20
          }
        },
          React.createElement('h3', {
            style: {
              fontFamily: FONTS.system, fontSize: 15, fontWeight: '600',
              color: theme.textSecondary, margin: '0 0 10px'
            }
          }, '✨ Gratitude Moment'),
          React.createElement('textarea', {
            value: newEntry.gratitude,
            onChange: (e) => setNewEntry(prev => ({ ...prev, gratitude: e.target.value })),
            placeholder: 'What are you grateful for?',
            style: {
              width: '100%', minHeight: 70, background: theme.overlay,
              border: `1px solid ${theme.border}`, borderRadius: 12,
              padding: 14, fontFamily: FONTS.system, fontSize: 15,
              color: theme.text, resize: 'vertical', outline: 'none',
              boxSizing: 'border-box'
            }
          })
        ),

        // Save button
        React.createElement('button', {
          onClick: () => {
            if (newEntry.text || newEntry.gratitude) {
              setJournalEntries(prev => [{
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                mood: newEntry.mood,
                text: newEntry.text,
                gratitude: newEntry.gratitude
              }, ...prev]);
              setNewEntry({ mood: 3, text: '', gratitude: '' });
              setShowNewEntry(false);
            }
          },
          style: {
            width: '100%', background: theme.cta, border: 'none', borderRadius: 16,
            padding: '18px 0', cursor: 'pointer', fontFamily: FONTS.system,
            fontSize: 17, fontWeight: '700', color: '#fff',
            boxShadow: `0 4px 20px ${theme.cta}40`
          }
        }, 'Save Entry')
      );
    }

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100, overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 12, marginBottom: 20
        }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: {
              fontFamily: FONTS.system, fontSize: 34, fontWeight: '700',
              color: theme.text, margin: '0 0 4px'
            }
          }, 'Journal'),
          React.createElement('p', {
            style: {
              fontFamily: FONTS.system, fontSize: 15, color: theme.textSecondary, margin: 0
            }
          }, 'Moment of reflection log')
        ),
        React.createElement('button', {
          onClick: () => setShowNewEntry(true),
          style: {
            background: theme.cta, border: 'none', borderRadius: 14,
            width: 44, height: 44, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 12px ${theme.cta}40`
          }
        },
          React.createElement(Icon, { name: 'Plus', size: 22, color: '#fff' })
        )
      ),

      // Weekly mood chart
      React.createElement('div', {
        style: {
          background: theme.card, borderRadius: 20, padding: 20,
          border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow,
          marginBottom: 16
        }
      },
        React.createElement('h3', {
          style: {
            fontFamily: FONTS.system, fontSize: 15, fontWeight: '600',
            color: theme.textSecondary, margin: '0 0 14px'
          }
        }, 'This Week\'s Mood'),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 60, gap: 8 }
        },
          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const moodVal = [3, 4, 2, 5, 4, 3, 0][i];
            return React.createElement('div', {
              key: day,
              style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }
            },
              React.createElement('div', {
                style: {
                  width: '100%', height: moodVal ? moodVal * 10 : 2,
                  background: moodVal ? `${theme.primary}${Math.floor(40 + moodVal * 12).toString(16)}` : theme.border,
                  borderRadius: 6, transition: 'height 0.3s ease'
                }
              }),
              React.createElement('span', {
                style: { fontFamily: FONTS.system, fontSize: 11, color: theme.textTertiary }
              }, day)
            );
          })
        )
      ),

      // Journal entries
      journalEntries.map(entry =>
        React.createElement('div', {
          key: entry.id,
          style: {
            background: theme.card, borderRadius: 20, padding: 18,
            border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow,
            marginBottom: 10
          }
        },
          React.createElement('div', {
            style: {
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 10
            }
          },
            React.createElement('span', {
              style: { fontFamily: FONTS.system, fontSize: 13, color: theme.textTertiary }
            }, entry.date),
            React.createElement('span', { style: { fontSize: 24 } }, moodEmojis[entry.mood - 1])
          ),
          React.createElement('p', {
            style: {
              fontFamily: FONTS.system, fontSize: 15, color: theme.text,
              margin: '0 0 8px', lineHeight: 1.5
            }
          }, entry.text),
          entry.gratitude && React.createElement('div', {
            style: {
              background: '#059669' + '12', borderRadius: 10, padding: '8px 12px',
              borderLeft: `3px solid #059669`
            }
          },
            React.createElement('span', {
              style: {
                fontFamily: FONTS.system, fontSize: 13, color: '#059669', fontWeight: '500'
              }
            }, `✨ ${entry.gratitude}`)
          )
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    meditate: MeditateScreen,
    breathe: BreatheScreen,
    sleep: SleepScreen,
    journal: JournalScreen,
    player: PlayerScreen
  };

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONTS.system,
      padding: '20px 0'
    }
  },
    // Add global style for range inputs
    React.createElement('style', null, `
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        cursor: pointer;
      }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: theme.bg,
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column'
      }
    },
      // Notch
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 150, height: 30, background: '#000', borderRadius: '0 0 20px 20px',
          zIndex: 200
        }
      }),

      React.createElement(StatusBar),

      // Screen content
      React.createElement('div', {
        style: {
          flex: 1, overflow: 'hidden', position: 'relative',
          opacity: screenTransition ?