const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#2C5E4E',
  secondary: '#B8926A',
  cta: '#5BA878',
  background: '#1C2E2A',
  backgroundLight: '#243B35',
  backgroundLighter: '#2D4A42',
  text: '#E8E0D4',
  textSecondary: '#A8B5A0',
  textMuted: '#6B7F6B',
  danger: '#C45B5B',
  dangerDark: '#8B3A3A',
  gold: '#D4A856',
  glow: '#5BA878',
  dark: '#141F1C',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const icons = {
  home: () => window.lucide && window.lucide.createIcon ? null : React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }), React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })),
  flame: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' })),
  book: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }), React.createElement('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })),
  settings: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 3 }), React.createElement('path', { d: 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' })),
  plus: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('line', { x1: 12, y1: 5, x2: 12, y2: 19 }), React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 })),
  check: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polyline', { points: '20 6 9 17 4 12' })),
  chevronRight: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polyline', { points: '9 18 15 12 9 6' })),
  shield: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })),
  heart: () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor', stroke: 'none' }, React.createElement('path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' })),
  star: () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor', stroke: 'none' }, React.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })),
  moon: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })),
  sun: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 5 }), React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 3 }), React.createElement('line', { x1: 12, y1: 21, x2: 12, y2: 23 }), React.createElement('line', { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }), React.createElement('line', { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }), React.createElement('line', { x1: 1, y1: 12, x2: 3, y2: 12 }), React.createElement('line', { x1: 21, y1: 12, x2: 23, y2: 12 }), React.createElement('line', { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }), React.createElement('line', { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 })),
  bell: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }), React.createElement('path', { d: 'M13.73 21a2 2 0 0 1-3.46 0' })),
  edit: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }), React.createElement('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' })),
  x: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('line', { x1: 18, y1: 6, x2: 6, y2: 18 }), React.createElement('line', { x1: 6, y1: 6, x2: 18, y2: 18 })),
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Meditation', icon: '🧘', streak: 12, completed: false, category: 'Mind', frequency: 'Daily', reminder: '7:00 AM' },
    { id: 2, name: 'Read 30 Pages', icon: '📖', streak: 8, completed: true, category: 'Growth', frequency: 'Daily', reminder: '9:00 PM' },
    { id: 3, name: 'Exercise', icon: '💪', streak: 5, completed: false, category: 'Body', frequency: 'Daily', reminder: '6:00 AM' },
    { id: 4, name: 'Journal Writing', icon: '✍️', streak: 15, completed: true, category: 'Mind', frequency: 'Daily', reminder: '8:00 PM' },
    { id: 5, name: 'Drink Water', icon: '💧', streak: 20, completed: false, category: 'Body', frequency: 'Daily', reminder: '8:00 AM' },
  ]);
  const [journalEntries, setJournalEntries] = useState([
    { id: 1, date: 'Dec 15, 2024', title: 'Breakthrough in meditation', content: 'Today I managed to hold focus for the entire 20 minutes. The stillness felt profound, like touching something ancient within myself.', mood: '✨' },
    { id: 2, date: 'Dec 14, 2024', title: 'Struggled with exercise', content: 'The cold morning made it hard to get out of bed. But I remembered my avatar and pushed through. The warmth came after the first mile.', mood: '🔥' },
    { id: 3, date: 'Dec 13, 2024', title: 'Deep reading session', content: 'Finished the chapter on stoic philosophy. The parallels with cultivating inner strength feel deeply connected to this journey.', mood: '📚' },
  ]);
  const [vigorLevel, setVigorLevel] = useState(72);
  const [avatarStage, setAvatarStage] = useState(3);
  const [showNewHabit, setShowNewHabit] = useState(false);
  const [showNewJournal, setShowNewJournal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newJournalTitle, setNewJournalTitle] = useState('');
  const [newJournalContent, setNewJournalContent] = useState('');
  const [animatingHabit, setAnimatingHabit] = useState(null);
  const [screenTransition, setScreenTransition] = useState(false);
  const [pulseAnim, setPulseAnim] = useState(0);
  const [crisisAlert, setCrisisAlert] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnim(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const completed = habits.filter(h => h.completed).length;
    const total = habits.length;
    const newVigor = Math.round((completed / total) * 100);
    setVigorLevel(newVigor);
    if (newVigor >= 80) setAvatarStage(4);
    else if (newVigor >= 60) setAvatarStage(3);
    else if (newVigor >= 40) setAvatarStage(2);
    else setAvatarStage(1);
  }, [habits]);

  useEffect(() => {
    const uncompleted = habits.filter(h => !h.completed && h.streak > 5);
    if (uncompleted.length > 0 && !crisisAlert) {
      const timer = setTimeout(() => {
        setCrisisAlert(uncompleted[0]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [habits]);

  const switchScreen = (screen) => {
    setScreenTransition(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setScreenTransition(false);
    }, 150);
  };

  const toggleHabit = (id) => {
    setAnimatingHabit(id);
    setTimeout(() => setAnimatingHabit(null), 600);
    setHabits(prev => prev.map(h =>
      h.id === id ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : h.streak - 1 } : h
    ));
  };

  const addHabit = () => {
    if (newHabitName.trim()) {
      const emojiList = ['🌟', '⚡', '🌿', '🎯', '🔮'];
      setHabits(prev => [...prev, {
        id: Date.now(),
        name: newHabitName,
        icon: emojiList[Math.floor(Math.random() * emojiList.length)],
        streak: 0,
        completed: false,
        category: 'Custom',
        frequency: 'Daily',
        reminder: 'None'
      }]);
      setNewHabitName('');
      setShowNewHabit(false);
    }
  };

  const addJournal = () => {
    if (newJournalTitle.trim() && newJournalContent.trim()) {
      setJournalEntries(prev => [{
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        title: newJournalTitle,
        content: newJournalContent,
        mood: '🌿'
      }, ...prev]);
      setNewJournalTitle('');
      setNewJournalContent('');
      setShowNewJournal(false);
    }
  };

  const theme = isDark ? {
    bg: COLORS.background,
    bgCard: COLORS.backgroundLight,
    bgCardHover: COLORS.backgroundLighter,
    text: COLORS.text,
    textSecondary: COLORS.textSecondary,
    textMuted: COLORS.textMuted,
    border: 'rgba(91, 168, 120, 0.15)',
  } : {
    bg: '#F5F0E8',
    bgCard: '#FFFFFF',
    bgCardHover: '#F0EBE0',
    text: '#1C2E2A',
    textSecondary: '#4A6358',
    textMuted: '#8A9A8A',
    border: 'rgba(44, 94, 78, 0.15)',
  };

  const glowIntensity = Math.sin(pulseAnim * Math.PI / 180) * 0.3 + 0.7;

  const VigorAvatar = ({ size = 180, showDetails = true }) => {
    const stageColors = [
      { core: '#4A3A3A', glow: '#6B4A4A', ring: '#5A4040' },
      { core: '#3A5A4A', glow: '#4A7A5A', ring: '#5BA878' },
      { core: '#2C5E4E', glow: '#5BA878', ring: '#7CC89A' },
      { core: '#1E8A5E', glow: '#5BA878', ring: '#B8926A' },
    ];
    const stage = stageColors[Math.min(avatarStage - 1, 3)];
    const breathScale = 1 + Math.sin(pulseAnim * Math.PI / 180) * 0.03;
    const orbits = avatarStage >= 2 ? Math.min(avatarStage, 4) : 0;

    return React.createElement('div', {
      style: {
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    },
      // Outer glow
      React.createElement('div', {
        style: {
          position: 'absolute',
          width: size * 0.9,
          height: size * 0.9,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${stage.glow}${Math.round(glowIntensity * 40).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          transform: `scale(${breathScale * 1.2})`,
          transition: 'all 0.3s ease',
        }
      }),
      // Ring
      React.createElement('div', {
        style: {
          position: 'absolute',
          width: size * 0.75,
          height: size * 0.75,
          borderRadius: '50%',
          border: `2px solid ${stage.ring}${Math.round(glowIntensity * 80).toString(16).padStart(2, '0')}`,
          transform: `scale(${breathScale}) rotate(${pulseAnim}deg)`,
          transition: 'all 0.3s ease',
        }
      }),
      // Orbital particles
      ...Array.from({ length: orbits }, (_, i) => {
        const angle = (pulseAnim * 2 + i * (360 / orbits)) * Math.PI / 180;
        const radius = size * 0.35;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return React.createElement('div', {
          key: `orb-${i}`,
          style: {
            position: 'absolute',
            width: 6 + i * 2,
            height: 6 + i * 2,
            borderRadius: '50%',
            background: stage.ring,
            boxShadow: `0 0 ${8 + i * 4}px ${stage.glow}`,
            transform: `translate(${x}px, ${y}px)`,
            opacity: glowIntensity,
            transition: 'opacity 0.3s ease',
          }
        });
      }),
      // Core
      React.createElement('div', {
        style: {
          width: size * 0.45,
          height: size * 0.45,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${stage.glow}, ${stage.core})`,
          boxShadow: `0 0 ${20 * glowIntensity}px ${stage.glow}80, inset 0 0 20px rgba(0,0,0,0.3)`,
          transform: `scale(${breathScale})`,
          transition: 'all 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      },
        React.createElement('div', {
          style: {
            fontSize: size * 0.18,
            filter: `brightness(${0.8 + glowIntensity * 0.4})`,
          }
        }, avatarStage >= 4 ? '🌳' : avatarStage >= 3 ? '🌿' : avatarStage >= 2 ? '🌱' : '🥀')
      ),
      // Stage label
      showDetails && React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: -5,
          fontSize: 11,
          fontFamily: FONT,
          color: stage.ring,
          fontWeight: '600',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }
      }, avatarStage >= 4 ? 'Ascended' : avatarStage >= 3 ? 'Thriving' : avatarStage >= 2 ? 'Growing' : 'Dormant')
    );
  };

  const CrisisAlertBanner = () => {
    if (!crisisAlert) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 50,
        left: 16,
        right: 16,
        background: `linear-gradient(135deg, ${COLORS.dangerDark}, ${COLORS.backgroundLighter})`,
        borderRadius: 16,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 100,
        border: `1px solid ${COLORS.danger}40`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
        animation: 'slideDown 0.4s ease',
      }
    },
      React.createElement('div', { style: { fontSize: 24 } }, '⚠️'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontSize: 13, fontFamily: FONT, fontWeight: '600', color: '#E8C4C4', marginBottom: 2 }
        }, 'Guardian Alert'),
        React.createElement('div', {
          style: { fontSize: 12, fontFamily: FONT, color: '#C4A8A8' }
        }, `"${crisisAlert.name}" streak (${crisisAlert.streak} days) is at risk!`)
      ),
      React.createElement('div', {
        onClick: () => setCrisisAlert(null),
        style: { cursor: 'pointer', color: '#C4A8A8', padding: 4 }
      }, icons.x())
    );
  };

  const HomeScreen = () => {
    const completedCount = habits.filter(h => h.completed).length;
    const totalCount = habits.length;

    return React.createElement('div', {
      style: {
        flex: 1,
        padding: '0 20px',
        paddingTop: 56,
        paddingBottom: 90,
        overflowY: 'auto',
        overflowX: 'hidden',
      }
    },
      // Header
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 13, fontFamily: FONT, color: theme.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }
          }, 'Good evening'),
          React.createElement('div', {
            style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text, letterSpacing: -0.5 }
          }, 'Guardian')
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 40,
            height: 40,
            borderRadius: 20,
            background: theme.bgCard,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: theme.textSecondary,
            border: `1px solid ${theme.border}`,
          }
        }, isDark ? icons.sun() : icons.moon())
      ),

      // Avatar Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(145deg, ${isDark ? COLORS.backgroundLight : '#FFF8F0'}, ${isDark ? COLORS.backgroundLighter : '#F5EFE5'})`,
          borderRadius: 24,
          padding: '24px 20px',
          marginBottom: 24,
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Ambient texture
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at 50% 30%, ${COLORS.cta}10 0%, transparent 60%)`,
            pointerEvents: 'none',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }
        },
          React.createElement(VigorAvatar, { size: 160 })
        ),
        // Vigor bar
        React.createElement('div', {
          style: { marginTop: 8 }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }
          },
            React.createElement('div', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, fontWeight: '500' }
            }, 'Vigor Essence'),
            React.createElement('div', {
              style: { fontSize: 15, fontFamily: FONT, color: COLORS.cta, fontWeight: '700' }
            }, `${vigorLevel}%`)
          ),
          React.createElement('div', {
            style: {
              height: 6,
              borderRadius: 3,
              background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }
          },
            React.createElement('div', {
              style: {
                height: '100%',
                width: `${vigorLevel}%`,
                borderRadius: 3,
                background: vigorLevel > 60 ? `linear-gradient(90deg, ${COLORS.cta}, ${COLORS.secondary})` : vigorLevel > 30 ? `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.danger})` : COLORS.danger,
                boxShadow: `0 0 8px ${vigorLevel > 60 ? COLORS.cta : COLORS.danger}60`,
                transition: 'width 0.8s ease, background 0.5s ease',
              }
            })
          )
        ),
        // Stats row
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-around', marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.border}` }
        },
          ...[
            { label: 'Completed', value: `${completedCount}/${totalCount}`, icon: '✓' },
            { label: 'Best Streak', value: '20 days', icon: '🔥' },
            { label: 'Stage', value: avatarStage >= 4 ? 'IV' : avatarStage >= 3 ? 'III' : avatarStage >= 2 ? 'II' : 'I', icon: '⚔️' },
          ].map((stat, i) =>
            React.createElement('div', {
              key: i,
              style: { textAlign: 'center' }
            },
              React.createElement('div', {
                style: { fontSize: 17, fontFamily: FONT, fontWeight: '700', color: theme.text }
              }, stat.value),
              React.createElement('div', {
                style: { fontSize: 11, fontFamily: FONT, color: theme.textMuted, marginTop: 2 }
              }, stat.label)
            )
          )
        )
      ),

      // Today's Habits
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
      },
        React.createElement('div', {
          style: { fontSize: 22, fontFamily: FONT, fontWeight: '600', color: theme.text }
        }, "Today's Rites"),
        React.createElement('div', {
          onClick: () => setShowNewHabit(true),
          style: {
            width: 32,
            height: 32,
            borderRadius: 16,
            background: COLORS.cta,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            boxShadow: `0 4px 12px ${COLORS.cta}40`,
          }
        }, icons.plus())
      ),

      ...habits.map(habit =>
        React.createElement('div', {
          key: habit.id,
          style: {
            background: theme.bgCard,
            borderRadius: 16,
            padding: '14px 16px',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            border: `1px solid ${habit.completed ? COLORS.cta + '30' : theme.border}`,
            transform: animatingHabit === habit.id ? 'scale(0.97)' : 'scale(1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            opacity: habit.completed ? 0.85 : 1,
          },
          onClick: () => toggleHabit(habit.id)
        },
          // Checkbox
          React.createElement('div', {
            style: {
              width: 28,
              height: 28,
              borderRadius: 14,
              border: habit.completed ? 'none' : `2px solid ${theme.textMuted}`,
              background: habit.completed ? COLORS.cta : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              boxShadow: habit.completed ? `0 2px 8px ${COLORS.cta}40` : 'none',
            }
          }, habit.completed && React.createElement('span', { style: { color: '#fff' } }, icons.check())),
          // Icon
          React.createElement('div', {
            style: { fontSize: 22, flexShrink: 0 }
          }, habit.icon),
          // Info
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', {
              style: {
                fontSize: 15,
                fontFamily: FONT,
                fontWeight: '600',
                color: habit.completed ? theme.textMuted : theme.text,
                textDecoration: habit.completed ? 'line-through' : 'none',
                transition: 'all 0.3s ease',
              }
            }, habit.name),
            React.createElement('div', {
              style: { fontSize: 12, fontFamily: FONT, color: theme.textMuted, marginTop: 2 }
            }, `${habit.streak} day streak · ${habit.category}`)
          ),
          // Streak indicator
          habit.streak > 5 && React.createElement('div', {
            style: {
              fontSize: 11,
              fontFamily: FONT,
              color: COLORS.secondary,
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }
          }, '🔥', habit.streak)
        )
      )
    );
  };

  const HabitsScreen = () => {
    return React.createElement('div', {
      style: {
        flex: 1,
        padding: '0 20px',
        paddingTop: 56,
        paddingBottom: 90,
        overflowY: 'auto',
      }
    },
      React.createElement('div', {
        style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text, marginBottom: 6 }
      }, 'Habit Forge'),
      React.createElement('div', {
        style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, marginBottom: 24 }
      }, 'Shape your rituals. Forge your path.'),

      // Stats summary
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 24,
        }
      },
        ...[
          { label: 'Active Habits', value: habits.length, color: COLORS.cta },
          { label: 'Completed Today', value: habits.filter(h => h.completed).length, color: COLORS.secondary },
          { label: 'Total Streak Days', value: habits.reduce((a, h) => a + h.streak, 0), color: COLORS.gold },
          { label: 'Consistency', value: `${Math.round((habits.filter(h => h.completed).length / habits.length) * 100)}%`, color: COLORS.primary },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.bgCard,
              borderRadius: 16,
              padding: '16px',
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: { fontSize: 24, fontFamily: FONT, fontWeight: '700', color: stat.color }
            }, stat.value),
            React.createElement('div', {
              style: { fontSize: 12, fontFamily: FONT, color: theme.textMuted, marginTop: 4 }
            }, stat.label)
          )
        )
      ),

      // Habit details
      React.createElement('div', {
        style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text, marginBottom: 14 }
      }, 'All Habits'),

      ...habits.map(habit =>
        React.createElement('div', {
          key: habit.id,
          style: {
            background: theme.bgCard,
            borderRadius: 16,
            padding: '16px',
            marginBottom: 10,
            border: `1px solid ${theme.border}`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }
          },
            React.createElement('div', { style: { fontSize: 28 } }, habit.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text }
              }, habit.name),
              React.createElement('div', {
                style: { fontSize: 13, fontFamily: FONT, color: theme.textMuted }
              }, `${habit.category} · ${habit.frequency}`)
            ),
            React.createElement('div', {
              style: { color: theme.textMuted }
            }, icons.chevronRight())
          ),
          // Mini streak visualization
          React.createElement('div', {
            style: { display: 'flex', gap: 4, marginBottom: 8 }
          },
            ...Array.from({ length: 7 }, (_, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: i < Math.min(habit.streak, 7) ? COLORS.cta : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                  transition: 'background 0.3s ease',
                }
              })
            )
          ),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('div', {
              style: { fontSize: 12, fontFamily: FONT, color: theme.textMuted }
            }, `🔥 ${habit.streak} days · ⏰ ${habit.reminder}`),
            React.createElement('div', {
              style: {
                fontSize: 11,
                fontFamily: FONT,
                color: habit.completed ? COLORS.cta : COLORS.danger,
                fontWeight: '600',
                padding: '3px 10px',
                borderRadius: 10,
                background: habit.completed ? `${COLORS.cta}20` : `${COLORS.danger}20`,
              }
            }, habit.completed ? 'Done' : 'Pending')
          )
        )
      ),

      // Add new habit button
      React.createElement('div', {
        onClick: () => setShowNewHabit(true),
        style: {
          background: 'transparent',
          borderRadius: 16,
          padding: '16px',
          marginBottom: 10,
          border: `2px dashed ${theme.textMuted}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
          color: theme.textMuted,
        }
      },
        icons.plus(),
        React.createElement('span', {
          style: { fontSize: 15, fontFamily: FONT, fontWeight: '500' }
        }, 'Add New Habit')
      )
    );
  };

  const JournalScreen = () => {
    return React.createElement('div', {
      style: {
        flex: 1,
        padding: '0 20px',
        paddingTop: 56,
        paddingBottom: 90,
        overflowY: 'auto',
      }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text }
          }, 'Journal'),
          React.createElement('div', {
            style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, marginTop: 4 }
          }, 'Reflections of your journey')
        ),
        React.createElement('div', {
          onClick: () => setShowNewJournal(true),
          style: {
            width: 36,
            height: 36,
            borderRadius: 18,
            background: COLORS.cta,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            boxShadow: `0 4px 12px ${COLORS.cta}40`,
          }
        }, icons.edit())
      ),

      // Companion mini avatar
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${isDark ? COLORS.backgroundLight : '#FFF8F0'}, ${isDark ? COLORS.backgroundLighter : '#F5EFE5'})`,
          borderRadius: 20,
          padding: '20px',
          marginBottom: 24,
          border: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }
      },
        React.createElement(VigorAvatar, { size: 70, showDetails: false }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontSize: 15, fontFamily: FONT, fontWeight: '600', color: theme.text, marginBottom: 4 }
          }, 'Your Guardian whispers...'),
          React.createElement('div', {
            style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, fontStyle: 'italic', lineHeight: 1.4 }
          }, vigorLevel > 60
            ? '"Your discipline nurtures me. I grow stronger with each passing day."'
            : '"I feel my essence waning... Please, tend to your rites."')
        )
      ),

      // Journal entries
      ...journalEntries.map((entry, index) =>
        React.createElement('div', {
          key: entry.id,
          style: {
            background: theme.bgCard,
            borderRadius: 16,
            padding: '18px',
            marginBottom: 12,
            border: `1px solid ${theme.border}`,
            borderLeft: `3px solid ${COLORS.secondary}`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
          },
            React.createElement('div', {
              style: { fontSize: 12, fontFamily: FONT, color: theme.textMuted }
            }, entry.date),
            React.createElement('div', { style: { fontSize: 18 } }, entry.mood)
          ),
          React.createElement('div', {
            style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text, marginBottom: 8 }
          }, entry.title),
          React.createElement('div', {
            style: { fontSize: 14, fontFamily: FONT, color: theme.textSecondary, lineHeight: 1.6 }
          }, entry.content)
        )
      )
    );
  };

  const SettingsScreen = () => {
    const settingsSections = [
      {
        title: 'Avatar',
        items: [
          { label: 'Avatar Name', value: 'Verdant Sentinel', icon: '🛡️' },
          { label: 'Evolution Stage', value: `Stage ${avatarStage}`, icon: '⚔️' },
          { label: 'Reset Avatar', value: '', icon: '🔄' },
        ]
      },
      {
        title: 'Notifications',
        items: [
          { label: 'Habit Reminders', value: 'Enabled', icon: '🔔' },
          { label: 'Crisis Alerts', value: 'Enabled', icon: '⚠️' },
          { label: 'Daily Summary', value: '9:00 PM', icon: '📊' },
        ]
      },
      {
        title: 'Appearance',
        items: [
          { label: 'Theme', value: isDark ? 'Dark' : 'Light', icon: isDark ? '🌙' : '☀️', action: () => setIsDark(!isDark) },
          { label: 'Avatar Animations', value: 'On', icon: '✨' },
        ]
      },
      {
        title: 'About',
        items: [
          { label: 'Version', value: '1.0.0', icon: '📱' },
          { label: 'Aethel Philosophy', value: '', icon: '📜' },
        ]
      },
    ];

    return React.createElement('div', {
      style: {
        flex: 1,
        padding: '0 20px',
        paddingTop: 56,
        paddingBottom: 90,
        overflowY: 'auto',
      }
    },
      React.createElement('div', {
        style: { fontSize: 34, fontFamily: FONT, fontWeight: '700', color: theme.text, marginBottom: 24 }
      }, 'Settings'),

      // Profile card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${isDark ? COLORS.backgroundLight : '#FFF8F0'}, ${isDark ? COLORS.backgroundLighter : '#F5EFE5'})`,
          borderRadius: 20,
          padding: '20px',
          marginBottom: 24,
          border: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }
      },
        React.createElement('div', {
          style: {
            width: 56,
            height: 56,
            borderRadius: 28,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.cta})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }
        }, '🌿'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontSize: 17, fontFamily: FONT, fontWeight: '600', color: theme.text }
          }, 'Guardian'),
          React.createElement('div', {
            style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary }
          }, `${habits.length} active rites · Stage ${avatarStage}`)
        ),
        React.createElement('div', { style: { color: theme.textMuted } }, icons.chevronRight())
      ),

      ...settingsSections.map((section, si) =>
        React.createElement('div', { key: si, style: { marginBottom: 24 } },
          React.createElement('div', {
            style: { fontSize: 13, fontFamily: FONT, color: theme.textMuted, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4 }
          }, section.title),
          React.createElement('div', {
            style: {
              background: theme.bgCard,
              borderRadius: 16,
              overflow: 'hidden',
              border: `1px solid ${theme.border}`,
            }
          },
            ...section.items.map((item, ii) =>
              React.createElement('div', {
                key: ii,
                onClick: item.action,
                style: {
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  borderBottom: ii < section.items.length - 1 ? `1px solid ${theme.border}` : 'none',
                  cursor: item.action ? 'pointer' : 'default',
                }
              },
                React.createElement('div', { style: { fontSize: 18 } }, item.icon),
                React.createElement('div', {
                  style: { flex: 1, fontSize: 15, fontFamily: FONT, color: theme.text }
                }, item.label),
                item.value && React.createElement('div', {
                  style: { fontSize: 15, fontFamily: FONT, color: theme.textMuted }
                }, item.value),
                React.createElement('div', { style: { color: theme.textMuted } }, icons.chevronRight())
              )
            )
          )
        )
      )
    );
  };

  const Modal = ({ visible, onClose, title, children }) => {
    if (!visible) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'flex-end',
        zIndex: 200,
      },
      onClick: onClose,
    },
      React.createElement('div', {
        style: {
          background: theme.bg,
          borderRadius: '24px 24px 0 0',
          padding: '24px 20px',
          paddingBottom: 40,
          width: '100%',
          maxHeight: '70%',
          overflowY: 'auto',
        },
        onClick: (e) => e.stopPropagation(),
      },
        React.createElement('div', {
          style: {
            width: 36,
            height: 4,
            borderRadius: 2,
            background: theme.textMuted,
            margin: '0 auto 20px',
          }
        }),
        React.createElement('div', {
          style: { fontSize: 22, fontFamily: FONT, fontWeight: '600', color: theme.text, marginBottom: 20 }
        }, title),
        children
      )
    );
  };

  const TabBar = () => {
    const tabs = [
      { id: 'home', label: 'Home', iconFn: icons.home },
      { id: 'habits', label: 'Forge', iconFn: icons.flame },
      { id: 'journal', label: 'Journal', iconFn: icons.book },
      { id: 'settings', label: 'Settings', iconFn: icons.settings },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 84,
        background: isDark ? 'rgba(20, 31, 28, 0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 20,
        zIndex: 50,
      }
    },
      ...tabs.map(tab =>
        React.createElement('div', {
          key: tab.id,
          onClick: () => switchScreen(tab.id),
          style: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
            color: activeScreen === tab.id ? COLORS.cta : theme.textMuted,
            transition: 'color 0.2s ease',
          }
        },
          tab.iconFn(),
          React.createElement('span', {
            style: {
              fontSize: 10,
              fontFamily: FONT,
              fontWeight: activeScreen === tab.id ? '600' : '400',
            }
          }, tab.label)
        )
      )
    );
  };

  const screens = { home: HomeScreen, habits: HabitsScreen, journal: JournalScreen, settings: SettingsScreen };
  const ActiveScreenComponent = screens[activeScreen];

  return React.createElement('div', {
    style: {
      width: '100vw',
      height: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        background: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.4s ease',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: `${theme.bg}CC`,
          backdropFilter: 'blur(10px)',
        }
      },
        React.createElement('div', {
          style: {
            width: 120,
            height: 32,
            borderRadius: 16,
            background: isDark ? '#000' : '#1C2E2A',
            position: 'absolute',
            top: 0,
          }
        })
      ),

      // Ambient background
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(ellipse at 50% 20%, ${COLORS.cta}08 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${COLORS.secondary}06 0%, transparent 40%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }),

      // Screen content
      React.createElement('div', {
        style: {
          flex: 1,
          position: 'relative',
          zIndex: 1,
          opacity: screenTransition ? 0.5 : 1,
          transform: screenTransition ? 'translateY(4px)' : 'translateY(0)',
          transition: 'all 0.15s ease',
          display: 'flex',
          flexDirection: 'column',
        }
      },
        React.createElement(ActiveScreenComponent)
      ),

      // Crisis Alert
      React.createElement(CrisisAlertBanner),

      // Tab bar
      React.createElement(TabBar),

      // New Habit Modal
      React.createElement(Modal, {
        visible: showNewHabit,
        onClose: () => setShowNewHabit(false),
        title: 'Forge New Habit',
      },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Name your ritual...',
          value: newHabitName,
          onChange: (e) => setNewHabitName(e.target.value),
          style: {
            width: '100%',
            padding: '14px 16px',
            borderRadius: 12,
            border: `1px solid ${theme.border}`,
            background: theme.bgCard,
            color: theme.text,
            fontSize: 17,
            fontFamily: FONT,
            outline: 'none',
            marginBottom: 16,
            boxSizing: 'border-box',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }
        },
          ...['Mind', 'Body', 'Growth', 'Spirit', 'Custom'].map(cat =>
            React.createElement('div', {
              key: cat,
              style: {
                padding: '8px 16px',
                borderRadius: 20,
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                fontSize: 13,
                fontFamily: FONT,
                color: theme.textSecondary,
                cursor: 'pointer',
              }
            }, cat)
          )
        ),
        React.createElement('div', {
          onClick: addHabit,
          style: {
            width: '100%',
            padding: '16px',
            borderRadius: 14,
            background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.primary})`,
            color: '#fff',
            fontSize: 17,
            fontFamily: FONT,
            fontWeight: '600',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: `0 6px 20px ${COLORS.cta}40`,
          }
        }, 'Begin This Rite')
      ),

      // New Journal Modal
      React.createElement(Modal, {
        visible: showNewJournal,
        onClose: () => setShowNewJournal(false),
        title: 'New Reflection',
      },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Title your reflection...',
          value: newJournalTitle,
          onChange: (e) => setNewJournalTitle(e.target.value),
          style: {
            width: '100%',
            padding: '14px 16px',
            borderRadius: 12,
            border: `1px solid ${theme.border}`,
            background: theme.bgCard,
            color: theme.text,
            fontSize: 17,
            fontFamily: FONT,
            outline: 'none',
            marginBottom: 12,
            boxSizing: 'border-box',
          }
        }),
        React.createElement('textarea', {
          placeholder: 'Write your thoughts...',
          value: newJournalContent,
          onChange: (e) => setNewJournalContent(e.target.value),
          rows: 5,
          style: {
            width: '100%',
            padding: '14px 16px',
            borderRadius: 12,
            border: `1px solid ${theme.border}`,
            background: theme.bgCard,
            color: theme.text,
            fontSize: 15,
            fontFamily: FONT,
            outline: 'none',
            marginBottom: 16,
            resize: 'none',
            lineHeight: 1.6,
            boxSizing: 'border-box',
          }
        }),
        React.createElement('div', {
          onClick: addJournal,
          style: {
            width: '100%',
            padding: '16px',
            borderRadius: 14,
            background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.primary})`,
            color: '#fff',
            fontSize: 17,
            fontFamily: FONT,
            fontWeight: '600',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: `0 6px 20px ${COLORS.secondary}40`,
          }
        }, 'Seal This Reflection')
      ),

      // Home indicator
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          borderRadius: 3,
          background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          zIndex: 100,
        }
      })
    )
  );
}