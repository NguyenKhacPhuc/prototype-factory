const { useState, useEffect, useRef, useCallback } = React;

const FONT_FAMILY = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const themes = {
  dark: {
    bg: '#0D1117',
    bgSecondary: '#161B22',
    bgTertiary: '#21262D',
    surface: '#1C2128',
    surfaceHover: '#252C35',
    text: '#F0F6FC',
    textSecondary: '#8B949E',
    textTertiary: '#6E7681',
    primary: '#2979FF',
    secondary: '#FF5252',
    cta: '#EC4899',
    accent: '#2979FF',
    border: '#30363D',
    success: '#3FB950',
    warning: '#D29922',
    danger: '#FF5252',
    cardBg: '#161B22',
    streakGold: '#F0B429',
  },
  light: {
    bg: '#FAFAFA',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#F3F4F6',
    surface: '#FFFFFF',
    surfaceHover: '#F9FAFB',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    primary: '#2979FF',
    secondary: '#FF5252',
    cta: '#EC4899',
    accent: '#2979FF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#FF5252',
    cardBg: '#FFFFFF',
    streakGold: '#F59E0B',
  }
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design system review', subtitle: 'Update color tokens', priority: 'high', completed: false, flowBlock: true, dueDate: 'Today', createdAt: Date.now(), decay: 1.0 },
    { id: 2, title: 'Write API documentation', subtitle: '3 endpoints remaining', priority: 'medium', completed: false, flowBlock: true, dueDate: 'Today', createdAt: Date.now() - 86400000, decay: 0.85 },
    { id: 3, title: 'Team standup notes', subtitle: 'Summarize blockers', priority: 'low', completed: true, flowBlock: false, dueDate: 'Today', createdAt: Date.now(), decay: 1.0 },
    { id: 4, title: 'Client presentation prep', subtitle: 'Slide deck + talking points', priority: 'high', completed: false, flowBlock: false, dueDate: 'Tomorrow', createdAt: Date.now() - 172800000, decay: 0.6 },
    { id: 5, title: 'Refactor auth module', subtitle: 'Token refresh logic', priority: 'medium', completed: false, flowBlock: true, dueDate: 'Today', createdAt: Date.now() - 43200000, decay: 0.95 },
    { id: 6, title: 'Update dependencies', subtitle: 'Security patches', priority: 'low', completed: false, flowBlock: false, dueDate: 'Wed', createdAt: Date.now() - 259200000, decay: 0.4 },
  ]);
  const [flowBlocksUsed, setFlowBlocksUsed] = useState(3);
  const [flowBlocksTotal] = useState(5);
  const [streak, setStreak] = useState(7);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [swipedTaskId, setSwipedTaskId] = useState(null);
  const [animatingComplete, setAnimatingComplete] = useState(null);
  const [screenTransition, setScreenTransition] = useState(false);
  const [prevScreen, setPrevScreen] = useState('home');

  const theme = isDark ? themes.dark : themes.light;

  const navigateTo = useCallback((screen) => {
    if (screen === activeScreen) return;
    setScreenTransition(true);
    setPrevScreen(activeScreen);
    setTimeout(() => {
      setActiveScreen(screen);
      setTimeout(() => setScreenTransition(false), 50);
    }, 150);
  }, [activeScreen]);

  useEffect(() => {
    let interval;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
      setTimerSeconds(25 * 60);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => prev.map(t => {
        if (!t.completed) {
          const age = (Date.now() - t.createdAt) / (1000 * 60 * 60 * 24);
          const newDecay = Math.max(0.2, 1 - (age * 0.15));
          return { ...t, decay: newDecay };
        }
        return t;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleTask = (id) => {
    setAnimatingComplete(id);
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
      setAnimatingComplete(null);
    }, 400);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      subtitle: '',
      priority: 'medium',
      completed: false,
      flowBlock: false,
      dueDate: 'Today',
      createdAt: Date.now(),
      decay: 1.0,
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setSwipedTaskId(null);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const priorityColors = {
    high: theme.secondary,
    medium: theme.warning,
    low: theme.success,
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? completedCount / totalCount : 0;

  const Icon = ({ name, size = 20, color = theme.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 2 });
  };

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const flowBlockTasks = tasks.filter(t => t.flowBlock && !t.completed);
    const otherTasks = tasks.filter(t => !t.flowBlock);

    return React.createElement('div', {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.bg,
        overflow: 'hidden',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          padding: '12px 20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 13,
          fontWeight: 600,
          color: theme.text,
          fontFamily: FONT_FAMILY,
        }
      },
        React.createElement('span', null, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(Icon, { name: 'Signal', size: 14 }),
          React.createElement(Icon, { name: 'Wifi', size: 14 }),
          React.createElement(Icon, { name: 'BatteryFull', size: 14 }),
        )
      ),

      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px 100px',
          WebkitOverflowScrolling: 'touch',
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
            React.createElement('p', {
              style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT_FAMILY, margin: 0, marginBottom: 4 }
            }, greeting),
            React.createElement('h1', {
              style: { fontSize: 34, fontWeight: 700, color: theme.text, fontFamily: FONT_FAMILY, margin: 0, letterSpacing: -0.5 }
            }, 'FlowTime'),
          ),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 44,
              height: 44,
              borderRadius: 22,
              background: theme.bgTertiary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }
          },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: theme.textSecondary })
          )
        ),

        // Streak & Progress card
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${theme.primary}22, ${theme.cta}22)`,
            borderRadius: 20,
            padding: 20,
            marginBottom: 24,
            border: `1px solid ${theme.border}`,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          // Decorative circles
          React.createElement('div', {
            style: {
              position: 'absolute', top: -20, right: -20, width: 80, height: 80,
              borderRadius: 40, background: `${theme.primary}15`,
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: -10, right: 40, width: 50, height: 50,
              borderRadius: 25, background: `${theme.cta}10`,
            }
          }),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement(Icon, { name: 'Flame', size: 24, color: theme.streakGold }),
              React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT_FAMILY, margin: 0 } }, 'Current Streak'),
                React.createElement('p', { style: { fontSize: 28, fontWeight: 800, color: theme.text, fontFamily: FONT_FAMILY, margin: 0 } }, `${streak} days`),
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('p', { style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT_FAMILY, margin: 0 } }, 'Today\'s Progress'),
              React.createElement('p', { style: { fontSize: 28, fontWeight: 800, color: theme.primary, fontFamily: FONT_FAMILY, margin: 0 } }, `${completedCount}/${totalCount}`),
            )
          ),
          // Progress bar
          React.createElement('div', {
            style: {
              height: 6,
              borderRadius: 3,
              background: theme.bgTertiary,
              overflow: 'hidden',
              position: 'relative',
            }
          },
            React.createElement('div', {
              style: {
                height: '100%',
                width: `${progress * 100}%`,
                borderRadius: 3,
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.cta})`,
                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }
            })
          ),
        ),

        // Flow Blocks section
        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
          },
            React.createElement('h2', {
              style: { fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: FONT_FAMILY, margin: 0 }
            }, '⚡ Flow Blocks'),
            React.createElement('div', {
              style: { display: 'flex', gap: 6 }
            },
              ...Array.from({ length: flowBlocksTotal }, (_, i) =>
                React.createElement('div', {
                  key: i,
                  style: {
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: i < flowBlocksUsed ? theme.primary : `${theme.primary}30`,
                    transition: 'background 0.3s',
                    transform: i < flowBlocksUsed ? 'scale(1)' : 'scale(0.85)',
                  }
                })
              )
            )
          ),
          React.createElement('p', {
            style: { fontSize: 13, color: theme.textTertiary, fontFamily: FONT_FAMILY, margin: '0 0 12px' }
          }, `${flowBlocksTotal - flowBlocksUsed} blocks remaining — use them wisely`),

          ...flowBlockTasks.map(task =>
            React.createElement('div', {
              key: task.id,
              onClick: () => { setActiveTaskId(task.id); navigateTo('focus'); },
              style: {
                background: theme.surface,
                borderRadius: 16,
                padding: 16,
                marginBottom: 10,
                border: `1px solid ${theme.primary}40`,
                borderLeft: `4px solid ${theme.primary}`,
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
                opacity: task.decay,
                position: 'relative',
                overflow: 'hidden',
              }
            },
              React.createElement('div', {
                style: {
                  position: 'absolute', top: 0, right: 0, padding: '4px 10px',
                  background: `${theme.primary}20`, borderRadius: '0 0 0 12px',
                  fontSize: 11, fontWeight: 600, color: theme.primary, fontFamily: FONT_FAMILY,
                }
              }, '⚡ FLOW'),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 12 }
              },
                React.createElement('div', {
                  onClick: (e) => { e.stopPropagation(); toggleTask(task.id); },
                  style: {
                    width: 24, height: 24, borderRadius: 12,
                    border: `2px solid ${theme.primary}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    background: animatingComplete === task.id ? theme.primary : 'transparent',
                    transition: 'all 0.3s',
                  }
                },
                  animatingComplete === task.id && React.createElement(Icon, { name: 'Check', size: 14, color: '#fff' })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('p', {
                    style: { fontSize: 17, fontWeight: 600, color: theme.text, fontFamily: FONT_FAMILY, margin: 0 }
                  }, task.title),
                  task.subtitle && React.createElement('p', {
                    style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT_FAMILY, margin: '4px 0 0' }
                  }, task.subtitle),
                ),
                React.createElement('div', {
                  style: {
                    width: 8, height: 8, borderRadius: 4,
                    background: priorityColors[task.priority],
                  }
                })
              )
            )
          )
        ),

        // Other Tasks
        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('h2', {
            style: { fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: FONT_FAMILY, margin: '0 0 12px' }
          }, 'All Tasks'),

          ...otherTasks.map(task =>
            React.createElement('div', {
              key: task.id,
              style: {
                background: theme.surface,
                borderRadius: 14,
                padding: 14,
                marginBottom: 8,
                border: `1px solid ${theme.border}`,
                opacity: task.completed ? 0.5 : task.decay,
                transition: 'opacity 0.3s, transform 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }
            },
              swipedTaskId === task.id && React.createElement('div', {
                style: {
                  position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
                  background: theme.danger, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '0 14px 14px 0', cursor: 'pointer',
                },
                onClick: () => deleteTask(task.id),
              },
                React.createElement(Icon, { name: 'Trash2', size: 20, color: '#fff' })
              ),
              React.createElement('div', {
                onClick: () => setSwipedTaskId(swipedTaskId === task.id ? null : task.id),
                style: { display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }
              },
                React.createElement('div', {
                  onClick: (e) => { e.stopPropagation(); toggleTask(task.id); },
                  style: {
                    width: 22, height: 22, borderRadius: 11,
                    border: `2px solid ${task.completed ? theme.success : theme.textTertiary}`,
                    background: task.completed ? theme.success : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }
                },
                  task.completed && React.createElement(Icon, { name: 'Check', size: 12, color: '#fff' })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('p', {
                    style: {
                      fontSize: 15, fontWeight: 500, color: theme.text, fontFamily: FONT_FAMILY, margin: 0,
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }
                  }, task.title),
                  React.createElement('div', {
                    style: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }
                  },
                    React.createElement('span', {
                      style: { fontSize: 11, color: theme.textTertiary, fontFamily: FONT_FAMILY }
                    }, task.dueDate),
                    task.decay < 0.7 && React.createElement('span', {
                      style: {
                        fontSize: 10, color: theme.warning, fontFamily: FONT_FAMILY,
                        background: `${theme.warning}20`, padding: '2px 6px', borderRadius: 4, fontWeight: 600,
                      }
                    }, 'Fading'),
                  )
                ),
                React.createElement('div', {
                  style: {
                    width: 8, height: 8, borderRadius: 4,
                    background: priorityColors[task.priority],
                  }
                })
              )
            )
          )
        ),
      ),

      // FAB
      React.createElement('div', {
        onClick: () => setShowAddTask(true),
        style: {
          position: 'absolute',
          bottom: 90,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.cta})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: `0 4px 20px ${theme.primary}50`,
          transition: 'transform 0.2s',
          zIndex: 10,
        }
      },
        React.createElement(Icon, { name: 'Plus', size: 28, color: '#fff' })
      ),

      // Add task modal
      showAddTask && React.createElement('div', {
        style: {
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'flex-end', zIndex: 100,
          animation: 'fadeIn 0.2s ease',
        },
        onClick: () => setShowAddTask(false),
      },
        React.createElement('div', {
          onClick: (e) => e.stopPropagation(),
          style: {
            width: '100%', background: theme.surface, borderRadius: '20px 20px 0 0',
            padding: '20px 20px 40px',
          }
        },
          React.createElement('div', {
            style: { width: 36, height: 4, borderRadius: 2, background: theme.bgTertiary, margin: '0 auto 20px' }
          }),
          React.createElement('h3', {
            style: { fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: FONT_FAMILY, margin: '0 0 16px' }
          }, 'New Task'),
          React.createElement('div', {
            style: {
              display: 'flex', gap: 10, marginBottom: 16,
            }
          },
            React.createElement('input', {
              value: newTaskTitle,
              onChange: (e) => setNewTaskTitle(e.target.value),
              onKeyDown: (e) => e.key === 'Enter' && addTask(),
              placeholder: 'What needs to be done?',
              autoFocus: true,
              style: {
                flex: 1, padding: '14px 16px', borderRadius: 12,
                border: `1px solid ${theme.border}`, background: theme.bgTertiary,
                color: theme.text, fontSize: 17, fontFamily: FONT_FAMILY,
                outline: 'none',
              }
            }),
            React.createElement('div', {
              onClick: () => { setIsListening(!isListening); },
              style: {
                width: 50, height: 50, borderRadius: 14,
                background: isListening ? `${theme.secondary}20` : theme.bgTertiary,
                border: isListening ? `2px solid ${theme.secondary}` : `1px solid ${theme.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s',
              }
            },
              React.createElement(Icon, { name: 'Mic', size: 22, color: isListening ? theme.secondary : theme.textSecondary })
            ),
          ),
          isListening && React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
              padding: '10px 14px', borderRadius: 10, background: `${theme.secondary}10`,
            }
          },
            React.createElement('div', {
              style: {
                width: 10, height: 10, borderRadius: 5, background: theme.secondary,
                animation: 'pulse 1s infinite',
              }
            }),
            React.createElement('span', {
              style: { fontSize: 13, color: theme.secondary, fontFamily: FONT_FAMILY }
            }, 'Listening... speak your task'),
          ),
          React.createElement('div', {
            onClick: addTask,
            style: {
              padding: '16px', borderRadius: 14, textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.cta})`,
              color: '#fff', fontSize: 17, fontWeight: 600, fontFamily: FONT_FAMILY,
              cursor: 'pointer',
            }
          }, 'Add Task'),
        )
      ),
    );
  };

  // ---- FOCUS SCREEN ----
  const FocusScreen = () => {
    const task = tasks.find(t => t.id === activeTaskId) || tasks.find(t => t.flowBlock && !t.completed) || tasks[0];
    const circumference = 2 * Math.PI * 90;
    const timerProgress = timerSeconds / (25 * 60);
    const offset = circumference * (1 - timerProgress);

    return React.createElement('div', {
      style: {
        height: '100%', display: 'flex', flexDirection: 'column',
        background: theme.bg, alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }
    },
      // Back button
      React.createElement('div', {
        onClick: () => { setTimerActive(false); navigateTo('home'); },
        style: {
          position: 'absolute', top: 50, left: 20, width: 40, height: 40,
          borderRadius: 20, background: theme.bgTertiary, display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }
      },
        React.createElement(Icon, { name: 'ChevronLeft', size: 22, color: theme.textSecondary })
      ),

      React.createElement('p', {
        style: { fontSize: 13, color: theme.textTertiary, fontFamily: FONT_FAMILY, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }
      }, '⚡ FLOW BLOCK ACTIVE'),

      React.createElement('h2', {
        style: { fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: FONT_FAMILY, margin: '0 0 40px', textAlign: 'center' }
      }, task ? task.title : 'Focus Time'),

      // Timer circle
      React.createElement('div', {
        style: { position: 'relative', width: 220, height: 220, marginBottom: 40 }
      },
        React.createElement('svg', { width: 220, height: 220, style: { transform: 'rotate(-90deg)' } },
          React.createElement('circle', {
            cx: 110, cy: 110, r: 90, fill: 'none',
            stroke: theme.bgTertiary, strokeWidth: 8,
          }),
          React.createElement('circle', {
            cx: 110, cy: 110, r: 90, fill: 'none',
            stroke: timerActive ? theme.primary : theme.textTertiary,
            strokeWidth: 8,
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            strokeLinecap: 'round',
            style: { transition: 'stroke-dashoffset 1s linear, stroke 0.3s' },
          }),
        ),
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('span', {
            style: {
              fontSize: 48, fontWeight: 200, color: theme.text, fontFamily: FONT_FAMILY,
              letterSpacing: 2,
            }
          }, formatTime(timerSeconds)),
          React.createElement('span', {
            style: { fontSize: 13, color: theme.textTertiary, fontFamily: FONT_FAMILY, marginTop: 4 }
          }, timerActive ? 'Focusing...' : 'Ready'),
        ),
      ),

      // Controls
      React.createElement('div', {
        style: { display: 'flex', gap: 20, alignItems: 'center' }
      },
        React.createElement('div', {
          onClick: () => { setTimerSeconds(25 * 60); setTimerActive(false); },
          style: {
            width: 50, height: 50, borderRadius: 25, background: theme.bgTertiary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        },
          React.createElement(Icon, { name: 'RotateCcw', size: 20, color: theme.textSecondary })
        ),
        React.createElement('div', {
          onClick: () => setTimerActive(!timerActive),
          style: {
            width: 80, height: 80, borderRadius: 40,
            background: timerActive
              ? `linear-gradient(135deg, ${theme.secondary}, #FF8A65)`
              : `linear-gradient(135deg, ${theme.primary}, ${theme.cta})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 8px 30px ${timerActive ? theme.secondary : theme.primary}40`,
            transition: 'all 0.3s',
          }
        },
          React.createElement(Icon, { name: timerActive ? 'Pause' : 'Play', size: 32, color: '#fff' })
        ),
        React.createElement('div', {
          onClick: () => { if (task) { toggleTask(task.id); setTimerActive(false); setTimerSeconds(25 * 60); } },
          style: {
            width: 50, height: 50, borderRadius: 25, background: theme.bgTertiary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        },
          React.createElement(Icon, { name: 'CheckCircle', size: 20, color: theme.success })
        ),
      ),

      // Tip
      React.createElement('div', {
        style: {
          marginTop: 40, padding: '12px 20px', borderRadius: 12,
          background: `${theme.primary}10`, maxWidth: 280, textAlign: 'center',
        }
      },
        React.createElement('p', {
          style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT_FAMILY, margin: 0 }
        }, '💡 Stay in flow — minimize distractions during your block')
      ),
    );
  };

  // ---- STATS SCREEN ----
  const StatsScreen = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = [4, 5, 3, 6, 4, 2, completedCount];
    const maxVal = Math.max(...weekData, 1);
    const streakDays = [true, true, true, true, true, true, true];

    return React.createElement('div', {
      style: {
        height: '100%', display: 'flex', flexDirection: 'column',
        background: theme.bg, overflow: 'hidden',
      }
    },
      // Header
      React.createElement('div', {
        style: { padding: '50px 20px 0' }
      },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 700, color: theme.text, fontFamily: FONT_FAMILY, margin: 0 }
        }, 'Statistics'),
      ),

      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }
      },
        // Streak card
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${theme.streakGold}20, ${theme.secondary}10)`,
            borderRadius: 20, padding: 24, marginBottom: 20,
            border: `1px solid ${theme.streakGold}30`,
            textAlign: 'center',
          }
        },
          React.createElement('div', {
            style: { fontSize: 48, marginBottom: 8 }
          }, '🔥'),
          React.createElement('h2', {
            style: { fontSize: 40, fontWeight: 800, color: theme.streakGold, fontFamily: FONT_FAMILY, margin: '0 0 4px' }
          }, `${streak} Days`),
          React.createElement('p', {
            style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT_FAMILY, margin: 0 }
          }, 'Momentum Streak — Keep it going!'),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }
          },
            ...streakDays.map((active, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  width: 36, height: 36, borderRadius: 10,
                  background: active ? `${theme.streakGold}20` : theme.bgTertiary,
                  border: `2px solid ${active ? theme.streakGold : theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, color: active ? theme.streakGold : theme.textTertiary,
                  fontFamily: FONT_FAMILY,
                }
              }, weekDays[i].charAt(0))
            )
          ),
        ),

        // Weekly chart
        React.createElement('div', {
          style: {
            background: theme.surface, borderRadius: 20, padding: 24,
            marginBottom: 20, border: `1px solid ${theme.border}`,
          }
        },
          React.createElement('h3', {
            style: { fontSize: 17, fontWeight: 600, color: theme.text, fontFamily: FONT_FAMILY, margin: '0 0 20px' }
          }, 'Tasks Completed This Week'),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, gap: 8 }
          },
            ...weekData.map((val, i) =>
              React.createElement('div', {
                key: i,
                style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }
              },
                React.createElement('span', {
                  style: { fontSize: 11, fontWeight: 600, color: theme.textSecondary, fontFamily: FONT_FAMILY, marginBottom: 6 }
                }, val),
                React.createElement('div', {
                  style: {
                    width: '100%', maxWidth: 30, borderRadius: 8,
                    height: `${(val / maxVal) * 80}px`,
                    background: i === 6
                      ? `linear-gradient(180deg, ${theme.primary}, ${theme.cta})`
                      : `${theme.primary}40`,
                    transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    minHeight: 8,
                  }
                }),
                React.createElement('span', {
                  style: { fontSize: 11, color: theme.textTertiary, fontFamily: FONT_FAMILY, marginTop: 8 }
                }, weekDays[i]),
              )
            )
          ),
        ),

        // Flow Blocks usage
        React.createElement('div', {
          style: {
            background: theme.surface, borderRadius: 20, padding: 24,
            marginBottom: 20, border: `1px solid ${theme.border}`,
          }
        },
          React.createElement('h3', {
            style: { fontSize: 17, fontWeight: 600, color: theme.text, fontFamily: FONT_FAMILY, margin: '0 0 16px' }
          }, 'Flow Block Usage'),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between' }
          },
            ...[
              { label: 'Used Today', value: flowBlocksUsed, color: theme.primary },
              { label: 'Remaining', value: flowBlocksTotal - flowBlocksUsed, color: theme.warning },
              { label: 'Avg/Week', value: '4.2', color: theme.success },
            ].map((item, i) =>
              React.createElement('div', {
                key: i, style: { textAlign: 'center', flex: 1 }
              },
                React.createElement('p', {
                  style: { fontSize: 28, fontWeight: 800, color: item.color, fontFamily: FONT_FAMILY, margin: 0 }
                }, item.value),
                React.createElement('p', {
                  style: { fontSize: 11, color: theme.textTertiary, fontFamily: FONT_FAMILY, margin: '4px 0 0' }
                }, item.label),
              )
            )
          ),
        ),

        // Priority decay info
        React.createElement('div', {
          style: {
            background: `${theme.warning}10`, borderRadius: 16, padding: 16,
            border: `1px solid ${theme.warning}30`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
            React.createElement(Icon, { name: 'AlertTriangle', size: 18, color: theme.warning }),
            React.createElement('span', {
              style: { fontSize: 15, fontWeight: 600, color: theme.warning, fontFamily: FONT_FAMILY }
            }, 'Priority Decay Alert'),
          ),
          React.createElement('p', {
            style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT_FAMILY, margin: 0, lineHeight: 1.5 }
          }, '2 tasks are fading in priority. Address them soon before they lose their urgency.'),
        ),
      ),
    );
  };

  // ---- SETTINGS SCREEN ----
  const SettingsScreen = () => {
    const [flowBlockCount, setFlowBlockCount] = useState(5);
    const [notifications, setNotifications] = useState(true);
    const [streakReminder, setStreakReminder] = useState(true);
    const [decayEnabled, setDecayEnabled] = useState(true);

    const Toggle = ({ value, onChange }) =>
      React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 51, height: 31, borderRadius: 16,
          background: value ? theme.primary : theme.bgTertiary,
          padding: 2, cursor: 'pointer',
          transition: 'background 0.3s',
          display: 'flex', alignItems: 'center',
        }
      },
        React.createElement('div', {
          style: {
            width: 27, height: 27, borderRadius: 14,
            background: '#fff',
            transform: value ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }
        })
      );

    const SettingRow = ({ icon, label, desc, right }) =>
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', padding: '16px 0',
          borderBottom: `1px solid ${theme.border}`,
        }
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 10, background: `${theme.primary}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14,
          }
        },
          React.createElement(Icon, { name: icon, size: 18, color: theme.primary })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontSize: 17, fontWeight: 500, color: theme.text, fontFamily: FONT_FAMILY, margin: 0 }
          }, label),
          desc && React.createElement('p', {
            style: { fontSize: 13, color: theme.textTertiary, fontFamily: FONT_FAMILY, margin: '2px 0 0' }
          }, desc),
        ),
        right,
      );

    return React.createElement('div', {
      style: {
        height: '100%', display: 'flex', flexDirection: 'column',
        background: theme.bg, overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { padding: '50px 20px 0' } },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 700, color: theme.text, fontFamily: FONT_FAMILY, margin: 0 }
        }, 'Settings'),
      ),

      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }
      },
        // Appearance
        React.createElement('h3', {
          style: { fontSize: 13, fontWeight: 600, color: theme.textTertiary, fontFamily: FONT_FAMILY, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }
        }, 'Appearance'),
        React.createElement('div', {
          style: { background: theme.surface, borderRadius: 16, padding: '0 16px', marginBottom: 24, border: `1px solid ${theme.border}` }
        },
          React.createElement(SettingRow, {
            icon: isDark ? 'Moon' : 'Sun',
            label: 'Dark Mode',
            desc: 'Reduce eye strain',
            right: React.createElement(Toggle, { value: isDark, onChange: setIsDark }),
          }),
        ),

        // Flow Blocks
        React.createElement('h3', {
          style: { fontSize: 13, fontWeight: 600, color: theme.textTertiary, fontFamily: FONT_FAMILY, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }
        }, 'Flow Blocks'),
        React.createElement('div', {
          style: { background: theme.surface, borderRadius: 16, padding: '0 16px', marginBottom: 24, border: `1px solid ${theme.border}` }
        },
          React.createElement(SettingRow, {
            icon: 'Zap',
            label: 'Daily Flow Blocks',
            desc: 'Maximum blocks per day',
            right: React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 12 }
            },
              React.createElement('div', {
                onClick: () => setFlowBlockCount(Math.max(1, flowBlockCount - 1)),
                style: {
                  width: 32, height: 32, borderRadius: 10, background: theme.bgTertiary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }
              }, React.createElement(Icon, { name: 'Minus', size: 16, color: theme.textSecondary })),
              React.createElement('span', {
                style: { fontSize: 20, fontWeight: 700, color: theme.primary, fontFamily: FONT_FAMILY, minWidth: 24, textAlign: 'center' }
              }, flowBlockCount),
              React.createElement('div', {
                onClick: () => setFlowBlockCount(Math.min(10, flowBlockCount + 1)),
                style: {
                  width: 32, height: 32, borderRadius: 10, background: theme.bgTertiary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }
              }, React.createElement(Icon, { name: 'Plus', size: 16, color: theme.textSecondary })),
            ),
          }),
          React.createElement(SettingRow, {
            icon: 'TrendingDown',
            label: 'Priority Decay',
            desc: 'Tasks fade when unaddressed',
            right: React.createElement(Toggle, { value: decayEnabled, onChange: setDecayEnabled }),
          }),
        ),

        // Notifications
        React.createElement('h3', {
          style: { fontSize: 13, fontWeight: 600, color: theme.textTertiary, fontFamily: FONT_FAMILY, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }
        }, 'Notifications'),
        React.createElement('div', {
          style: { background: theme.surface, borderRadius: 16, padding: '0 16px', marginBottom: 24, border: `1px solid ${theme.border}` }
        },
          React.createElement(SettingRow, {
            icon: 'Bell',
            label: 'Push Notifications',
            desc: 'Task reminders & updates',
            right: React.createElement(Toggle, { value: notifications, onChange: setNotifications }),
          }),
          React.createElement(SettingRow, {
            icon: 'Flame',
            label: 'Streak Reminders',
            desc: 'Alert when streak is at risk',
            right: React.createElement(Toggle, { value: streakReminder, onChange: setStreakReminder }),
          }),
        ),

        // About
        React.createElement('div', {
          style: { textAlign: 'center', padding: '20px 0' }
        },
          React.createElement('p', {
            style: { fontSize: 13, color: theme.textTertiary, fontFamily: FONT_FAMILY, margin: 0 }
          }, 'FlowTime v1.0.0'),
          React.createElement('p', {
            style: { fontSize: 13, color: theme.textTertiary, fontFamily: FONT_FAMILY, margin: '4px 0 0' }
          }, 'Conquer your day. Cultivate unstoppable momentum.'),
        ),
      ),
    );
  };

  const screens = {
    home: HomeScreen,
    focus: FocusScreen,
    stats: StatsScreen,
    settings: SettingsScreen,
  };

  const tabItems = [
    { key: 'home', icon: 'Home', label: 'Home' },
    { key: 'focus', icon: 'Timer', label: 'Focus' },
    { key: 'stats', icon: 'BarChart3', label: 'Stats' },
    { key: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  return React.createElement('div', {
    style: {
      width: '100vw',
      height: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_FAMILY,
    }
  },
    // Keyframes style
    React.createElement('style', null, `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      input::placeholder { color: ${theme.textTertiary}; }
      ::-webkit-scrollbar { display: none; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        background: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 2px rgba(0,0,0,0.1)',
      }
    },
      // Screen content
      React.createElement('div', {
        style: {
          height: '100%',
          opacity: screenTransition ? 0.5 : 1,
          transform: screenTransition ? 'scale(0.98)' : 'scale(1)',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }
      },
        React.createElement(screens[activeScreen] || HomeScreen)
      ),

      // Tab bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 83,
          background: isDark ? 'rgba(13,17,23,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `0.5px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          paddingTop: 8,
          paddingBottom: 20,
          zIndex: 50,
        }
      },
        ...tabItems.map(item =>
          React.createElement('div', {
            key: item.key,
            onClick: () => navigateTo(item.key),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              padding: '4px 16px',
              transition: 'transform 0.15s',
            }
          },
            React.createElement(Icon, {
              name: item.icon,
              size: 24,
              color: activeScreen === item.key ? theme.primary : theme.textTertiary,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeScreen === item.key ? 600 : 400,
                color: activeScreen === item.key ? theme.primary : theme.textTertiary,
                fontFamily: FONT_FAMILY,
              }
            }, item.label),
          )
        )
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
          zIndex: 60,
        }
      }),
    ),
  );
}