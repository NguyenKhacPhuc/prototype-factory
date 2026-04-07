const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  light: {
    primary: '#2979FF',
    secondary: '#FF5252',
    cta: '#EC4899',
    background: '#FAFAFA',
    card: '#FFFFFF',
    cardBorder: 'rgba(0,0,0,0.06)',
    text: '#1A1A2E',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    surface: '#F3F4F6',
    tabBar: 'rgba(255,255,255,0.95)',
    tabBarBorder: 'rgba(0,0,0,0.08)',
    overlay: 'rgba(0,0,0,0.4)',
  },
  dark: {
    primary: '#448AFF',
    secondary: '#FF6E6E',
    cta: '#F472B6',
    background: '#0A0A1A',
    card: '#141428',
    cardBorder: 'rgba(255,255,255,0.06)',
    text: '#F0F0FF',
    textSecondary: '#9CA3C0',
    textTertiary: '#6B7290',
    surface: '#1A1A32',
    tabBar: 'rgba(10,10,26,0.95)',
    tabBarBorder: 'rgba(255,255,255,0.06)',
    overlay: 'rgba(0,0,0,0.7)',
  }
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState('idle');
  const [breathScale, setBreathScale] = useState(1);
  const [sosActive, setSosActive] = useState(false);
  const [sosTimer, setSosTimer] = useState(60);
  const [sleepTrack, setSleepTrack] = useState(null);
  const [screenTransition, setScreenTransition] = useState(1);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [commuteMode, setCommuteMode] = useState(false);

  const theme = isDark ? COLORS.dark : COLORS.light;
  const timerRef = useRef(null);
  const breathRef = useRef(null);
  const progressRef = useRef(null);

  const navigateTo = useCallback((screen, tab) => {
    setScreenTransition(0);
    setTimeout(() => {
      setActiveScreen(screen);
      if (tab) setActiveTab(tab);
      setTimeout(() => setScreenTransition(1), 20);
    }, 150);
  }, []);

  useEffect(() => {
    if (sosActive && sosTimer > 0) {
      timerRef.current = setInterval(() => {
        setSosTimer(t => {
          if (t <= 1) {
            setSosActive(false);
            clearInterval(timerRef.current);
            return 60;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [sosActive]);

  useEffect(() => {
    if (sosActive) {
      const phases = ['inhale', 'hold', 'exhale', 'hold'];
      let idx = 0;
      const cycle = () => {
        const phase = phases[idx % 4];
        setBreathPhase(phase);
        setBreathScale(phase === 'inhale' ? 1.6 : phase === 'exhale' ? 1 : breathScale);
        idx++;
      };
      cycle();
      breathRef.current = setInterval(cycle, 4000);
      return () => clearInterval(breathRef.current);
    } else {
      setBreathPhase('idle');
      setBreathScale(1);
    }
  }, [sosActive]);

  useEffect(() => {
    if (isPlaying) {
      progressRef.current = setInterval(() => {
        setPlayerProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 300);
      return () => clearInterval(progressRef.current);
    }
  }, [isPlaying]);

  const Icon = ({ name, size = 24, color = theme.text, strokeWidth = 2 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) {
      return React.createElement('div', {
        style: { width: size, height: size, borderRadius: size / 2, background: color + '20' }
      });
    }
    return React.createElement(LucideIcon, { size, color, strokeWidth });
  };

  const meditations = [
    { id: 1, title: 'Pre-Shift Centering', duration: '10 min', category: 'pre-shift', icon: 'Sunrise', color: '#FF9800', desc: 'Ground yourself before your shift begins' },
    { id: 2, title: 'Mid-Shift Calm', duration: '5 min', category: 'mid-shift', icon: 'CloudMoon', color: '#2979FF', desc: 'Quick stress relief between tasks' },
    { id: 3, title: 'Post-Shift Wind Down', duration: '15 min', category: 'post-shift', icon: 'Moon', color: '#7C4DFF', desc: 'Decompress and let go of the shift' },
    { id: 4, title: 'Body Scan Release', duration: '12 min', category: 'mid-shift', icon: 'Scan', color: '#00BCD4', desc: 'Release tension from head to toe' },
    { id: 5, title: 'Compassion Reset', duration: '8 min', category: 'post-shift', icon: 'Heart', color: '#EC4899', desc: 'Reconnect with your inner compassion' },
    { id: 6, title: 'Energy Boost Breath', duration: '5 min', category: 'pre-shift', icon: 'Zap', color: '#FF5252', desc: 'Energizing breathwork for alertness' },
  ];

  const soundscapes = [
    { id: 1, title: 'Deep Ocean Bioluminescence', icon: 'Waves', color: '#0D47A1', duration: '∞' },
    { id: 2, title: 'Nebula Drift', icon: 'Sparkles', color: '#7C4DFF', duration: '∞' },
    { id: 3, title: 'Midnight Rain', icon: 'CloudRain', color: '#455A64', duration: '∞' },
    { id: 4, title: 'Forest Night', icon: 'TreePine', color: '#2E7D32', duration: '∞' },
    { id: 5, title: 'White Noise Cocoon', icon: 'Radio', color: '#78909C', duration: '∞' },
    { id: 6, title: 'Gentle Piano', icon: 'Music', color: '#EC407A', duration: '45 min' },
  ];

  const HomeScreen = () => {
    const hour = new Date().getHours();
    const greeting = hour < 6 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const shiftSuggestion = hour >= 18 || hour < 6 ? 'mid-shift' : hour >= 6 && hour < 14 ? 'post-shift' : 'pre-shift';

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100 }
    },
      React.createElement('div', {
        style: { paddingTop: 60, marginBottom: 24 }
      },
        React.createElement('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4
          }
        },
          React.createElement('span', {
            style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, fontWeight: '500' }
          }, greeting),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 20, background: theme.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'all 0.3s ease'
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: theme.textSecondary }))
        ),
        React.createElement('h1', {
          style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: 0, lineHeight: 1.15 }
        }, 'Shift Solace'),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, margin: '4px 0 0', fontWeight: '400' }
        }, 'Your nightly sanctuary')
      ),

      // SOS Button
      React.createElement('div', {
        onClick: () => { setSosActive(true); setSosTimer(60); navigateTo('sos', 'home'); },
        style: {
          background: `linear-gradient(135deg, ${theme.secondary}, ${theme.cta})`,
          borderRadius: 20, padding: '20px 24px', marginBottom: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: `0 8px 32px ${theme.secondary}40`,
          transition: 'transform 0.2s ease',
        }
      },
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }
        }, React.createElement(Icon, { name: 'HeartPulse', size: 28, color: '#FFF' })),
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 17, fontFamily: FONT, fontWeight: '700', color: '#FFF' }
          }, 'SOS Moment'),
          React.createElement('div', {
            style: { fontSize: 13, fontFamily: FONT, color: 'rgba(255,255,255,0.85)', marginTop: 2 }
          }, '1-minute guided breathwork reset')
        ),
        React.createElement('div', { style: { marginLeft: 'auto' } },
          React.createElement(Icon, { name: 'ChevronRight', size: 20, color: 'rgba(255,255,255,0.7)' })
        )
      ),

      // Suggested for You
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h2', {
          style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: '0 0 12px' }
        }, 'Suggested for You'),
        ...meditations.filter(m => m.category === shiftSuggestion).slice(0, 2).map(med =>
          React.createElement('div', {
            key: med.id,
            onClick: () => { setSelectedSession(med); navigateTo('player', 'home'); },
            style: {
              background: theme.card, borderRadius: 16, padding: '16px 20px', marginBottom: 12,
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              border: `1px solid ${theme.cardBorder}`,
              transition: 'transform 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14, background: med.color + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            }, React.createElement(Icon, { name: med.icon, size: 24, color: med.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text }
              }, med.title),
              React.createElement('div', {
                style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, marginTop: 2 }
              }, med.duration + ' · ' + med.desc)
            ),
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 18, background: theme.primary + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: 'Play', size: 16, color: theme.primary }))
          )
        )
      ),

      // Quick Access
      React.createElement('h2', {
        style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: '0 0 12px' }
      }, 'Quick Access'),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }
      },
        [
          { label: 'Commute Mode', icon: 'Car', color: '#FF9800', screen: 'commute' },
          { label: 'Sleep Sounds', icon: 'Moon', color: '#7C4DFF', screen: 'sleep' },
          { label: 'Breathwork', icon: 'Wind', color: '#00BCD4', screen: 'meditate' },
          { label: 'All Sessions', icon: 'LayoutGrid', color: '#EC4899', screen: 'meditate' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => navigateTo(item.screen, item.screen === 'meditate' ? 'meditate' : item.screen === 'sleep' ? 'sleep' : 'home'),
            style: {
              background: theme.card, borderRadius: 16, padding: '20px 16px',
              cursor: 'pointer', border: `1px solid ${theme.cardBorder}`,
              transition: 'all 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14, background: item.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10
              }
            }, React.createElement(Icon, { name: item.icon, size: 22, color: item.color })),
            React.createElement('div', {
              style: { fontSize: 15, fontFamily: FONT, fontWeight: '600', color: theme.text }
            }, item.label)
          )
        )
      ),

      // Recent
      React.createElement('h2', {
        style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: '0 0 12px' }
      }, 'Continue'),
      React.createElement('div', {
        style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }
      },
        meditations.slice(0, 3).map(med =>
          React.createElement('div', {
            key: med.id,
            onClick: () => { setSelectedSession(med); navigateTo('player', 'home'); },
            style: {
              minWidth: 140, background: `linear-gradient(145deg, ${med.color}20, ${med.color}08)`,
              borderRadius: 16, padding: 16, cursor: 'pointer',
              border: `1px solid ${med.color}20`,
            }
          },
            React.createElement(Icon, { name: med.icon, size: 24, color: med.color }),
            React.createElement('div', {
              style: { fontSize: 15, fontFamily: FONT, fontWeight: '600', color: theme.text, marginTop: 10 }
            }, med.title),
            React.createElement('div', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, marginTop: 4 }
            }, med.duration),
            React.createElement('div', {
              style: {
                height: 3, background: theme.surface, borderRadius: 2, marginTop: 10, overflow: 'hidden'
              }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${30 + Math.random() * 50}%`,
                  background: med.color, borderRadius: 2
                }
              })
            )
          )
        )
      )
    );
  };

  const MeditateScreen = () => {
    const [filter, setFilter] = useState('all');
    const filtered = filter === 'all' ? meditations : meditations.filter(m => m.category === filter);

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100 }
    },
      React.createElement('div', { style: { paddingTop: 60, marginBottom: 20 } },
        React.createElement('h1', {
          style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Meditate')
      ),

      // Filter pills
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }
      },
        [
          { key: 'all', label: 'All' },
          { key: 'pre-shift', label: 'Pre-Shift' },
          { key: 'mid-shift', label: 'Mid-Shift' },
          { key: 'post-shift', label: 'Post-Shift' },
        ].map(f =>
          React.createElement('div', {
            key: f.key,
            onClick: () => setFilter(f.key),
            style: {
              padding: '8px 18px', borderRadius: 20, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: FONT, fontSize: 15, fontWeight: '600',
              background: filter === f.key ? theme.primary : theme.surface,
              color: filter === f.key ? '#FFF' : theme.textSecondary,
              transition: 'all 0.25s ease',
            }
          }, f.label)
        )
      ),

      // Sessions list
      ...filtered.map(med =>
        React.createElement('div', {
          key: med.id,
          onClick: () => { setSelectedSession(med); setPlayerProgress(0); navigateTo('player'); },
          style: {
            background: theme.card, borderRadius: 16, padding: '16px 20px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            border: `1px solid ${theme.cardBorder}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 52, height: 52, borderRadius: 16, background: med.color + '15',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(Icon, { name: med.icon, size: 26, color: med.color })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text }
            }, med.title),
            React.createElement('div', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, marginTop: 3 }
            }, med.desc),
            React.createElement('div', {
              style: {
                fontSize: 13, fontFamily: FONT, color: med.color, marginTop: 4, fontWeight: '500',
                display: 'flex', alignItems: 'center', gap: 4
              }
            },
              React.createElement(Icon, { name: 'Clock', size: 12, color: med.color }),
              med.duration
            )
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: theme.textTertiary })
        )
      )
    );
  };

  const SleepScreen = () => {
    const [activeSleep, setActiveSleep] = useState(null);

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100 }
    },
      React.createElement('div', { style: { paddingTop: 60, marginBottom: 8 } },
        React.createElement('h1', {
          style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Sleep'),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, margin: '6px 0 20px' }
        }, 'Transition gently into restful sleep')
      ),

      // Timer
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${isDark ? '#1A1A40' : '#E8EAF6'}, ${isDark ? '#0D0D2B' : '#C5CAE9'})`,
          borderRadius: 20, padding: 24, marginBottom: 20, textAlign: 'center'
        }
      },
        React.createElement(Icon, { name: 'Timer', size: 28, color: '#7C4DFF' }),
        React.createElement('div', {
          style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, marginTop: 8 }
        }, 'Sleep Timer'),
        React.createElement('div', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, marginTop: 4, marginBottom: 16 }
        }, 'Auto-stop after set time'),
        React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center' } },
          ['15m', '30m', '45m', '60m'].map(t =>
            React.createElement('div', {
              key: t,
              style: {
                padding: '8px 16px', borderRadius: 12, cursor: 'pointer',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text
              }
            }, t)
          )
        )
      ),

      // Soundscapes
      React.createElement('h2', {
        style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: '0 0 12px' }
      }, 'Soundscapes'),
      ...soundscapes.map(sound =>
        React.createElement('div', {
          key: sound.id,
          onClick: () => setActiveSleep(activeSleep === sound.id ? null : sound.id),
          style: {
            background: activeSleep === sound.id
              ? `linear-gradient(135deg, ${sound.color}20, ${sound.color}08)`
              : theme.card,
            borderRadius: 16, padding: '16px 20px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            border: `1px solid ${activeSleep === sound.id ? sound.color + '40' : theme.cardBorder}`,
            transition: 'all 0.3s ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 14, background: sound.color + '18',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(Icon, { name: sound.icon, size: 24, color: sound.color })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text }
            }, sound.title),
            React.createElement('div', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, marginTop: 2 }
            }, sound.duration)
          ),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: activeSleep === sound.id ? sound.color : theme.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
            }
          },
            React.createElement(Icon, {
              name: activeSleep === sound.id ? 'Pause' : 'Play',
              size: 16,
              color: activeSleep === sound.id ? '#FFF' : theme.textSecondary
            })
          )
        )
      )
    );
  };

  const ProfileScreen = () => {
    const stats = [
      { label: 'Sessions', value: '47', icon: 'Activity' },
      { label: 'Minutes', value: '382', icon: 'Clock' },
      { label: 'Streak', value: '12', icon: 'Flame' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px', paddingBottom: 100 }
    },
      React.createElement('div', { style: { paddingTop: 60, marginBottom: 24 } },
        React.createElement('h1', {
          style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Profile')
      ),

      // Avatar & Name
      React.createElement('div', {
        style: { textAlign: 'center', marginBottom: 28 }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 40, margin: '0 auto 12px',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.cta})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('span', {
            style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: '#FFF' }
          }, 'N')
        ),
        React.createElement('div', {
          style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text }
        }, 'Night Owl Nurse'),
        React.createElement('div', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, marginTop: 4 }
        }, 'Night Shift · ICU')
      ),

      // Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 12, marginBottom: 24 }
      },
        stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: theme.card, borderRadius: 16, padding: '16px 12px',
              textAlign: 'center', border: `1px solid ${theme.cardBorder}`
            }
          },
            React.createElement(Icon, { name: s.icon, size: 20, color: theme.primary }),
            React.createElement('div', {
              style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, marginTop: 6 }
            }, s.value),
            React.createElement('div', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, marginTop: 2 }
            }, s.label)
          )
        )
      ),

      // Settings
      React.createElement('h2', {
        style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: '0 0 12px' }
      }, 'Settings'),
      ...[
        { icon: isDark ? 'Moon' : 'Sun', label: 'Dark Mode', value: isDark ? 'On' : 'Off', action: () => setIsDark(!isDark) },
        { icon: 'Bell', label: 'Notifications', value: 'Enabled' },
        { icon: 'Clock', label: 'Shift Schedule', value: '7PM - 7AM' },
        { icon: 'Volume2', label: 'Audio Quality', value: 'High' },
        { icon: 'Shield', label: 'Privacy', value: '' },
        { icon: 'HelpCircle', label: 'Help & Support', value: '' },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          onClick: item.action || undefined,
          style: {
            background: theme.card, borderRadius: 14, padding: '14px 18px', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 14,
            cursor: item.action ? 'pointer' : 'default',
            border: `1px solid ${theme.cardBorder}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, background: theme.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: item.icon, size: 18, color: theme.primary })),
          React.createElement('div', {
            style: { flex: 1, fontSize: 17, fontFamily: FONT, fontWeight: '500', color: theme.text }
          }, item.label),
          item.value && React.createElement('span', {
            style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary }
          }, item.value),
          React.createElement(Icon, { name: 'ChevronRight', size: 16, color: theme.textTertiary })
        )
      )
    );
  };

  const PlayerScreen = () => {
    if (!selectedSession) return null;
    const session = selectedSession;

    return React.createElement('div', {
      style: {
        padding: '0 20px', height: '100%', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${session.color}12 0%, ${theme.background} 60%)`,
      }
    },
      // Header
      React.createElement('div', {
        style: { paddingTop: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }
      },
        React.createElement('div', {
          onClick: () => { setIsPlaying(false); setPlayerProgress(0); navigateTo('home', 'home'); },
          style: {
            width: 36, height: 36, borderRadius: 18, background: theme.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }
        }, React.createElement(Icon, { name: 'ChevronDown', size: 20, color: theme.text })),
        React.createElement('div', {
          style: { fontSize: 15, fontFamily: FONT, fontWeight: '600', color: theme.textSecondary }
        }, 'Now Playing'),
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 18, background: theme.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }
        }, React.createElement(Icon, { name: 'MoreHorizontal', size: 20, color: theme.text }))
      ),

      // Visual
      React.createElement('div', {
        style: {
          width: 200, height: 200, margin: '0 auto 40px', borderRadius: '50%',
          background: `radial-gradient(circle, ${session.color}40 0%, ${session.color}10 50%, transparent 70%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: isPlaying ? undefined : undefined,
          transform: `scale(${isPlaying ? 1 + Math.sin(Date.now() / 1000) * 0.05 : 1})`,
          transition: 'transform 2s ease-in-out',
        }
      },
        React.createElement('div', {
          style: {
            width: 120, height: 120, borderRadius: '50%',
            background: `radial-gradient(circle, ${session.color}60 0%, ${session.color}20 70%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: isPlaying ? `0 0 60px ${session.color}30` : 'none',
            transition: 'all 0.5s ease',
          }
        },
          React.createElement(Icon, { name: session.icon, size: 48, color: session.color })
        )
      ),

      // Info
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 32 } },
        React.createElement('div', {
          style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text }
        }, session.title),
        React.createElement('div', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, marginTop: 6 }
        }, session.desc)
      ),

      // Progress
      React.createElement('div', { style: { marginBottom: 32, padding: '0 8px' } },
        React.createElement('div', {
          style: {
            height: 4, background: theme.surface, borderRadius: 2, overflow: 'hidden', marginBottom: 8
          }
        },
          React.createElement('div', {
            style: {
              height: '100%', width: `${playerProgress}%`,
              background: `linear-gradient(90deg, ${session.color}, ${theme.primary})`,
              borderRadius: 2, transition: 'width 0.3s linear',
            }
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between' }
        },
          React.createElement('span', {
            style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary }
          }, `${Math.floor(playerProgress / 100 * parseInt(session.duration))}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`),
          React.createElement('span', {
            style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary }
          }, session.duration)
        )
      ),

      // Controls
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 32
        }
      },
        React.createElement('div', {
          style: { cursor: 'pointer', opacity: 0.6 }
        }, React.createElement(Icon, { name: 'SkipBack', size: 28, color: theme.text })),
        React.createElement('div', {
          onClick: () => setIsPlaying(!isPlaying),
          style: {
            width: 72, height: 72, borderRadius: 36,
            background: `linear-gradient(135deg, ${session.color}, ${theme.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: `0 8px 32px ${session.color}40`,
            transition: 'transform 0.2s ease',
          }
        }, React.createElement(Icon, { name: isPlaying ? 'Pause' : 'Play', size: 32, color: '#FFF' })),
        React.createElement('div', {
          style: { cursor: 'pointer', opacity: 0.6 }
        }, React.createElement(Icon, { name: 'SkipForward', size: 28, color: theme.text }))
      ),

      // Bottom actions
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'center', gap: 40 }
      },
        [
          { icon: 'Repeat', label: 'Loop' },
          { icon: 'Volume2', label: 'Volume' },
          { icon: 'Heart', label: 'Save' },
        ].map((a, i) =>
          React.createElement('div', {
            key: i,
            style: { textAlign: 'center', cursor: 'pointer' }
          },
            React.createElement(Icon, { name: a.icon, size: 20, color: theme.textSecondary }),
            React.createElement('div', {
              style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary, marginTop: 4 }
            }, a.label)
          )
        )
      )
    );
  };

  const SOSScreen = () => {
    const phaseText = {
      inhale: 'Breathe In',
      hold: 'Hold',
      exhale: 'Breathe Out',
      idle: 'Ready'
    };

    const phaseColor = {
      inhale: '#448AFF',
      hold: '#7C4DFF',
      exhale: '#EC4899',
      idle: theme.textSecondary
    };

    return React.createElement('div', {
      style: {
        height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 20,
        background: isDark
          ? 'radial-gradient(ellipse at center, #1A1040 0%, #0A0A1A 70%)'
          : 'radial-gradient(ellipse at center, #EDE7F6 0%, #FAFAFA 70%)',
      }
    },
      // Close button
      React.createElement('div', {
        onClick: () => { setSosActive(false); setSosTimer(60); navigateTo('home', 'home'); },
        style: {
          position: 'absolute', top: 54, left: 20,
          width: 36, height: 36, borderRadius: 18, background: theme.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }
      }, React.createElement(Icon, { name: 'X', size: 20, color: theme.text })),

      React.createElement('div', {
        style: { fontSize: 13, fontFamily: FONT, fontWeight: '600', color: theme.secondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 40 }
      }, 'SOS MOMENT'),

      // Breathing circle
      React.createElement('div', {
        style: {
          width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${(phaseColor[breathPhase] || theme.primary)}30 0%, transparent 70%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 40,
        }
      },
        React.createElement('div', {
          style: {
            width: 140, height: 140, borderRadius: '50%',
            background: `radial-gradient(circle, ${(phaseColor[breathPhase] || theme.primary)}50 0%, ${(phaseColor[breathPhase] || theme.primary)}15 70%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `scale(${breathPhase === 'inhale' ? 1.3 : breathPhase === 'exhale' ? 0.85 : 1.1})`,
            transition: 'transform 4s ease-in-out',
            boxShadow: `0 0 60px ${(phaseColor[breathPhase] || theme.primary)}25`,
          }
        },
          React.createElement('div', {
            style: {
              width: 80, height: 80, borderRadius: '50%',
              background: (phaseColor[breathPhase] || theme.primary) + '40',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${breathPhase === 'inhale' ? 1.2 : breathPhase === 'exhale' ? 0.8 : 1})`,
              transition: 'transform 4s ease-in-out',
            }
          })
        )
      ),

      React.createElement('div', {
        style: {
          fontSize: 28, fontFamily: FONT, fontWeight: '700',
          color: phaseColor[breathPhase] || theme.text,
          marginBottom: 8, transition: 'color 0.5s ease',
        }
      }, sosActive ? phaseText[breathPhase] : 'Tap to Start'),

      React.createElement('div', {
        style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, marginBottom: 40 }
      }, sosActive ? `${sosTimer}s remaining` : 'One minute reset'),

      !sosActive && React.createElement('div', {
        onClick: () => { setSosActive(true); setSosTimer(60); },
        style: {
          padding: '16px 48px', borderRadius: 28,
          background: `linear-gradient(135deg, ${theme.secondary}, ${theme.cta})`,
          fontSize: 17, fontFamily: FONT, fontWeight: '700', color: '#FFF', cursor: 'pointer',
          boxShadow: `0 8px 32px ${theme.secondary}40`,
        }
      }, 'Begin'),

      sosActive && React.createElement('div', {
        onClick: () => { setSosActive(false); setSosTimer(60); },
        style: {
          padding: '12px 32px', borderRadius: 20,
          background: theme.surface, cursor: 'pointer',
          fontSize: 15, fontFamily: FONT, fontWeight: '600', color: theme.textSecondary,
        }
      }, 'End Early')
    );
  };

  const CommuteScreen = () => {
    const tracks = [
      { title: 'Shift Debrief', desc: 'Process and release your shift', duration: '12 min', icon: 'MessageCircle', color: '#FF9800' },
      { title: 'Gratitude Walk', desc: 'Appreciate the small wins', duration: '8 min', icon: 'Heart', color: '#EC4899' },
      { title: 'Mind Clearing', desc: 'Empty your mental load', duration: '10 min', icon: 'Brain', color: '#7C4DFF' },
      { title: 'Body Relaxation', desc: 'Progressive tension release', duration: '15 min', icon: 'Smile', color: '#00BCD4' },
    ];

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', padding: '0 20px' }
    },
      React.createElement('div', {
        style: { paddingTop: 54, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
      },
        React.createElement('div', {
          onClick: () => navigateTo('home', 'home'),
          style: {
            width: 36, height: 36, borderRadius: 18, background: theme.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 20, color: theme.text })),
        React.createElement('h1', {
          style: { fontSize: 22, fontFamily: FONT, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Quiet Commute Mode')
      ),

      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #FF980020, #FF980008)`,
          borderRadius: 16, padding: 20, marginBottom: 24,
          border: `1px solid #FF980020`,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
          React.createElement(Icon, { name: 'EyeOff', size: 20, color: '#FF9800' }),
          React.createElement('span', {
            style: { fontSize: 17, fontFamily: FONT, fontWeight: '700', color: theme.text }
          }, 'Audio Only')
        ),
        React.createElement('div', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, lineHeight: 1.5 }
        }, 'Screen-free guided sessions for safe use during your commute. Close your eyes or keep them on the road.')
      ),

      ...tracks.map((t, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => { setSelectedSession({ ...t, category: 'commute' }); setPlayerProgress(0); navigateTo('player'); },
          style: {
            background: theme.card, borderRadius: 16, padding: '16px 20px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            border: `1px solid ${theme.cardBorder}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 14, background: t.color + '15',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(Icon, { name: t.icon, size: 22, color: t.color })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text }
            }, t.title),
            React.createElement('div', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, marginTop: 2 }
            }, t.desc + ' · ' + t.duration)
          ),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18, background: t.color + '15',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: 'Headphones', size: 16, color: t.color }))
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    meditate: MeditateScreen,
    sleep: SleepScreen,
    profile: ProfileScreen,
    player: PlayerScreen,
    sos: SOSScreen,
    commute: CommuteScreen,
  };

  const showTabBar = !['player', 'sos', 'commute'].includes(activeScreen);

  const tabItems = [
    { key: 'home', icon: 'Home', label: 'Home' },
    { key: 'meditate', icon: 'Wind', label: 'Meditate' },
    { key: 'sleep', icon: 'Moon', label: 'Sleep' },
    { key: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      fontFamily: FONT,
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        background: theme.background,
        boxShadow: '0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, height: 44, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 30px', fontSize: 15, fontWeight: '600', color: theme.text,
        }
      },
        React.createElement('span', null, '9:41'),
        React.createElement('div', {
          style: { display: 'flex', gap: 6, alignItems: 'center' }
        },
          React.createElement(Icon, { name: 'Signal', size: 14, color: theme.text }),
          React.createElement(Icon, { name: 'Wifi', size: 14, color: theme.text }),
          React.createElement(Icon, { name: 'Battery', size: 18, color: theme.text })
        )
      ),

      // Screen content
      React.createElement('div', {
        style: {
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          opacity: screenTransition,
          transform: `translateY(${(1 - screenTransition) * 10}px)`,
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }
      },
        React.createElement(screens[activeScreen] || HomeScreen)
      ),

      // Tab bar
      showTabBar && React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: theme.tabBar,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `0.5px solid ${theme.tabBarBorder}`,
          paddingBottom: 28, paddingTop: 8,
          display: 'flex', justifyContent: 'space-around',
        }
      },
        tabItems.map(tab =>
          React.createElement('div', {
            key: tab.key,
            onClick: () => navigateTo(tab.key, tab.key),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer', padding: '4px 12px',
              transition: 'all 0.2s ease',
            }
          },
            React.createElement(Icon, {
              name: tab.icon,
              size: 22,
              color: activeTab === tab.key ? theme.primary : theme.textTertiary,
              strokeWidth: activeTab === tab.key ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontFamily: FONT, fontWeight: activeTab === tab.key ? '600' : '500',
                color: activeTab === tab.key ? theme.primary : theme.textTertiary,
                transition: 'color 0.2s ease',
              }
            }, tab.label)
          )
        )
      ),

      // Home indicator
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 3,
          background: theme.text + '30',
        }
      })
    )
  );
}