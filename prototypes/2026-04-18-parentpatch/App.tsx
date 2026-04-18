const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#D88D70',
  primaryLight: '#E8A88E',
  primaryDark: '#C07A5E',
  secondary: '#8DAB96',
  secondaryLight: '#A8C4B0',
  secondaryDark: '#6E8F78',
  cta: '#F2C94C',
  ctaLight: '#F5D76E',
  ctaDark: '#D4A933',
  background: '#FBF7F1',
  backgroundDark: '#1C1B1A',
  cardDark: '#2A2826',
  textDark: '#3A3230',
  textDarkTheme: '#F0EBE5',
  textSecondary: '#8A7E78',
  textSecondaryDark: '#A09890',
  white: '#FFFFFF',
  border: '#EDE6DC',
  borderDark: '#3A3632',
  urgent: '#E85D5D',
  success: '#6BBF7B',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [previousScreen, setPreviousScreen] = useState('home');
  const [animating, setAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('left');
  const [showUrgentModal, setShowUrgentModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [patchPoints, setPatchPoints] = useState(245);
  const [notifications, setNotifications] = useState(3);
  const [acceptedTasks, setAcceptedTasks] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const bg = darkMode ? COLORS.backgroundDark : COLORS.background;
  const cardBg = darkMode ? COLORS.cardDark : COLORS.white;
  const textPrimary = darkMode ? COLORS.textDarkTheme : COLORS.textDark;
  const textSecondary = darkMode ? COLORS.textSecondaryDark : COLORS.textSecondary;
  const borderColor = darkMode ? COLORS.borderDark : COLORS.border;

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const navigateTo = (screen) => {
    if (screen === activeScreen || animating) return;
    const screenOrder = ['home', 'tasks', 'library', 'circles', 'profile'];
    const currentIndex = screenOrder.indexOf(activeScreen);
    const nextIndex = screenOrder.indexOf(screen);
    setSlideDirection(nextIndex > currentIndex ? 'left' : 'right');
    setPreviousScreen(activeScreen);
    setAnimating(true);
    setActiveScreen(screen);
    setTimeout(() => setAnimating(false), 300);
  };

  const Icon = ({ name, size = 24, color = textPrimary, strokeWidth = 1.8 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(LucideIcon, { size, color, strokeWidth });
  };

  const Toast = () => {
    if (!showToast) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        background: COLORS.secondary,
        color: COLORS.white,
        padding: '14px 20px',
        borderRadius: 16,
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        zIndex: 1000,
        animation: 'fadeInUp 0.3s ease',
        boxShadow: '0 8px 24px rgba(141,171,150,0.4)',
      }
    }, toastMessage);
  };

  const Avatar = ({ name, size = 40, color = COLORS.primary }) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return React.createElement('div', {
      style: {
        width: size,
        height: size,
        borderRadius: size / 2,
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.white,
        fontFamily: FONT,
        fontSize: size * 0.38,
        fontWeight: '700',
        flexShrink: 0,
      }
    }, initials);
  };

  const Badge = ({ count, style = {} }) => {
    if (!count) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: -4,
        right: -4,
        background: COLORS.urgent,
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '700',
        fontFamily: FONT,
        width: 18,
        height: 18,
        borderRadius: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${bg}`,
        ...style,
      }
    }, count);
  };

  const StatusBar = () => {
    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px 0',
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: '600',
        color: textPrimary,
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
        React.createElement(Icon, { name: 'Signal', size: 16, color: textPrimary }),
        React.createElement(Icon, { name: 'Wifi', size: 16, color: textPrimary }),
        React.createElement(Icon, { name: 'Battery', size: 16, color: textPrimary })
      )
    );
  };

  const TabBar = () => {
    const tabs = [
      { id: 'home', icon: 'Home', label: 'Home' },
      { id: 'tasks', icon: 'ClipboardList', label: 'Tasks' },
      { id: 'library', icon: 'BookOpen', label: 'Library' },
      { id: 'circles', icon: 'Users', label: 'Circles' },
      { id: 'profile', icon: 'User', label: 'Profile' },
    ];

    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0 28px',
        background: cardBg,
        borderTop: `1px solid ${borderColor}`,
        position: 'relative',
        zIndex: 10,
      }
    }, tabs.map(tab =>
      React.createElement('button', {
        key: tab.id,
        onClick: () => navigateTo(tab.id),
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          border: 'none',
          background: 'none',
          padding: '4px 12px',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.2s',
          transform: activeScreen === tab.id ? 'scale(1.05)' : 'scale(1)',
        }
      },
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement(Icon, {
            name: tab.icon,
            size: 24,
            color: activeScreen === tab.id ? COLORS.primary : textSecondary,
            strokeWidth: activeScreen === tab.id ? 2.2 : 1.6,
          }),
          tab.id === 'home' && notifications > 0 ? React.createElement(Badge, { count: notifications }) : null
        ),
        React.createElement('span', {
          style: {
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: activeScreen === tab.id ? '600' : '400',
            color: activeScreen === tab.id ? COLORS.primary : textSecondary,
          }
        }, tab.label)
      )
    ));
  };

  const HomeScreen = () => {
    const [urgentPulse, setUrgentPulse] = useState(true);

    useEffect(() => {
      const timer = setInterval(() => setUrgentPulse(p => !p), 1200);
      return () => clearInterval(timer);
    }, []);

    const nearbyTasks = [
      { id: 1, name: 'Sarah M.', task: 'Can someone watch my 2 kids (ages 4 & 6) for 15 mins while I run to the pharmacy?', time: '5 min ago', distance: '0.2 mi', urgent: true, points: 30 },
      { id: 2, name: 'Mike T.', task: 'Need a cup of flour for baking — can anyone spare some?', time: '12 min ago', distance: '0.1 mi', urgent: false, points: 10 },
      { id: 3, name: 'Lisa K.', task: 'Could use help carrying groceries upstairs — just 3 bags!', time: '25 min ago', distance: '0.3 mi', urgent: false, points: 15 },
    ];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontFamily: FONT, fontSize: 28, fontWeight: '800', color: textPrimary, margin: 0, letterSpacing: -0.5 }
          }, '👋 Hi, Jamie!'),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 15, color: textSecondary, margin: '4px 0 0' }
          }, 'Your village is active today')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setDarkMode(!darkMode),
            style: {
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: 12,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }
          }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20 })),
          React.createElement('div', {
            style: {
              position: 'relative',
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: 12,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }
          },
            React.createElement(Icon, { name: 'Bell', size: 20 }),
            React.createElement(Badge, { count: notifications })
          )
        )
      ),

      // PatchPoints Card
      React.createElement('div', {
        style: {
          margin: '0 20px 16px',
          padding: '20px',
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
          borderRadius: 20,
          boxShadow: '0 8px 24px rgba(216,141,112,0.3)',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: '500' } }, 'Your PatchPoints'),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 34, color: COLORS.white, margin: '4px 0 0', fontWeight: '800', letterSpacing: -1 } }, patchPoints),
          ),
          React.createElement('div', {
            style: {
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 16,
              padding: '12px 16px',
              backdropFilter: 'blur(10px)',
            }
          },
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 11, color: 'rgba(255,255,255,0.8)', margin: 0, textAlign: 'center' } }, 'This week'),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 20, color: COLORS.white, margin: '2px 0 0', fontWeight: '700', textAlign: 'center' } }, '+45'),
          ),
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 10, marginTop: 16 }
        },
          React.createElement('button', {
            onClick: () => { setShowNewTaskModal(true); },
            style: {
              flex: 1,
              background: COLORS.cta,
              color: COLORS.textDark,
              border: 'none',
              borderRadius: 14,
              padding: '12px',
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 4px 12px rgba(242,201,76,0.3)',
            }
          }, React.createElement(Icon, { name: 'Plus', size: 18, color: COLORS.textDark }), 'Post a Task'),
          React.createElement('button', {
            onClick: () => navigateTo('tasks'),
            style: {
              flex: 1,
              background: 'rgba(255,255,255,0.2)',
              color: COLORS.white,
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 14,
              padding: '12px',
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }
          }, React.createElement(Icon, { name: 'Search', size: 18, color: COLORS.white }), 'Find Help')
        )
      ),

      // Urgent Alert
      React.createElement('div', {
        onClick: () => setShowUrgentModal(true),
        style: {
          margin: '0 20px 16px',
          padding: '16px 20px',
          background: darkMode ? '#3A2020' : '#FFF0F0',
          borderRadius: 16,
          border: `1.5px solid ${COLORS.urgent}40`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }
      },
        React.createElement('div', {
          style: {
            width: 44,
            height: 44,
            borderRadius: 22,
            background: `${COLORS.urgent}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: urgentPulse ? 1 : 0.6,
            transition: 'opacity 0.6s',
          }
        }, React.createElement(Icon, { name: 'AlertTriangle', size: 22, color: COLORS.urgent })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, fontWeight: '700', color: COLORS.urgent, margin: 0 } }, 'Urgent Patch Alert'),
          React.createElement('p', { style: { fontFamily: FONT, fontSize: 13, color: textSecondary, margin: '2px 0 0' } }, 'Tap to send an urgent request to neighbors nearby'),
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 20, color: COLORS.urgent }),
      ),

      // Nearby Tasks
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: textPrimary, margin: 0 } }, 'Nearby Requests'),
          React.createElement('button', {
            onClick: () => navigateTo('tasks'),
            style: { background: 'none', border: 'none', fontFamily: FONT, fontSize: 14, color: COLORS.primary, fontWeight: '600', cursor: 'pointer' }
          }, 'See All'),
        ),
        nearbyTasks.map(task =>
          React.createElement('div', {
            key: task.id,
            style: {
              background: cardBg,
              borderRadius: 16,
              padding: '16px',
              marginBottom: 12,
              border: task.urgent ? `1.5px solid ${COLORS.urgent}40` : `1px solid ${borderColor}`,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                React.createElement(Avatar, { name: task.name, size: 36, color: task.urgent ? COLORS.urgent : COLORS.secondary }),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: textPrimary, margin: 0 } }, task.name),
                  React.createElement('p', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary, margin: 0 } }, task.distance, ' · ', task.time),
                )
              ),
              task.urgent ? React.createElement('span', {
                style: {
                  background: `${COLORS.urgent}18`,
                  color: COLORS.urgent,
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: 20,
                }
              }, '⚡ URGENT') : null,
            ),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, color: textPrimary, margin: '0 0 12px', lineHeight: '22px' } }, task.task),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('span', {
                style: {
                  fontFamily: FONT,
                  fontSize: 13,
                  color: COLORS.cta,
                  fontWeight: '600',
                  background: `${COLORS.cta}18`,
                  padding: '4px 10px',
                  borderRadius: 10,
                }
              }, `+${task.points} pts`),
              React.createElement('button', {
                onClick: (e) => {
                  e.stopPropagation();
                  if (!acceptedTasks.includes(task.id)) {
                    setAcceptedTasks([...acceptedTasks, task.id]);
                    showToastMessage(`You offered to help ${task.name}! 🎉`);
                  }
                },
                style: {
                  background: acceptedTasks.includes(task.id) ? COLORS.secondary : COLORS.primary,
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: 12,
                  padding: '8px 20px',
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }
              }, acceptedTasks.includes(task.id) ? '✓ Offered' : 'I Can Help'),
            )
          )
        )
      ),

      // Quick Actions
      React.createElement('div', { style: { padding: '8px 20px 20px' } },
        React.createElement('h2', { style: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: textPrimary, margin: '0 0 12px' } }, 'Quick Actions'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          [
            { icon: 'Baby', label: 'Kid Watch', desc: '15 min', color: COLORS.primary },
            { icon: 'ShoppingBag', label: 'Borrow Item', desc: 'Quick swap', color: COLORS.secondary },
            { icon: 'Dog', label: 'Dog Walk', desc: '20 min', color: COLORS.cta },
            { icon: 'Wrench', label: 'Quick Fix', desc: 'Handy help', color: COLORS.primaryDark },
          ].map((action, i) =>
            React.createElement('button', {
              key: i,
              onClick: () => { setShowNewTaskModal(true); },
              style: {
                background: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 16,
                padding: '18px 14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s',
              }
            },
              React.createElement('div', {
                style: {
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${action.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              }, React.createElement(Icon, { name: action.icon, size: 24, color: action.color })),
              React.createElement('span', { style: { fontFamily: FONT, fontSize: 14, fontWeight: '600', color: textPrimary } }, action.label),
              React.createElement('span', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary } }, action.desc),
            )
          )
        )
      ),

      React.createElement('div', { style: { height: 20 } })
    );
  };

  const TasksScreen = () => {
    const [activeTab, setActiveTab] = useState('available');
    const [searchText, setSearchText] = useState('');

    const tasks = [
      { id: 1, name: 'Emma R.', task: 'Need someone to pick up my Amazon package from the porch — I\'m stuck at work!', time: '2 min ago', distance: '0.1 mi', category: 'Errand', points: 15, urgent: false },
      { id: 2, name: 'David L.', task: 'Can anyone help my son (age 8) with 15 minutes of math homework?', time: '8 min ago', distance: '0.3 mi', category: 'Tutoring', points: 25, urgent: false },
      { id: 3, name: 'Ana P.', task: 'Locked out! Can someone watch my toddler for 10 min while locksmith comes?', time: '1 min ago', distance: '0.05 mi', category: 'Kid Watch', points: 35, urgent: true },
      { id: 4, name: 'Tom B.', task: 'Making cookies — need 2 eggs! Happy to share the final batch 🍪', time: '15 min ago', distance: '0.2 mi', category: 'Borrow', points: 10, urgent: false },
      { id: 5, name: 'Nina W.', task: 'Dog needs a quick walk — I\'m down with a migraine 🐕', time: '20 min ago', distance: '0.4 mi', category: 'Pet Care', points: 20, urgent: false },
    ];

    const myTasks = [
      { id: 10, task: 'Looking for someone to water plants this weekend', status: 'Active', responses: 2, time: 'Posted 1h ago' },
      { id: 11, task: 'Need a ride to pediatrician for 3pm appointment', status: 'Fulfilled', responses: 1, time: 'Posted yesterday' },
    ];

    const filteredTasks = tasks.filter(t => 
      searchText === '' || t.task.toLowerCase().includes(searchText.toLowerCase()) || t.category.toLowerCase().includes(searchText.toLowerCase())
    );

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' } },
      React.createElement('div', { style: { padding: '16px 20px 8px' } },
        React.createElement('h1', { style: { fontFamily: FONT, fontSize: 28, fontWeight: '800', color: textPrimary, margin: '0 0 16px', letterSpacing: -0.5 } }, 'Task Board'),
        
        // Search
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 14,
            padding: '10px 14px',
            marginBottom: 14,
            gap: 10,
          }
        },
          React.createElement(Icon, { name: 'Search', size: 20, color: textSecondary }),
          React.createElement('input', {
            placeholder: 'Search tasks or skills...',
            value: searchText,
            onChange: (e) => setSearchText(e.target.value),
            style: {
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: FONT,
              fontSize: 15,
              color: textPrimary,
              flex: 1,
            }
          })
        ),

        // Tabs
        React.createElement('div', {
          style: { display: 'flex', gap: 0, background: darkMode ? '#333' : '#EDE6DC', borderRadius: 12, padding: 3, marginBottom: 16 }
        },
          ['available', 'my-tasks'].map(tab =>
            React.createElement('button', {
              key: tab,
              onClick: () => setActiveTab(tab),
              style: {
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRadius: 10,
                background: activeTab === tab ? cardBg : 'transparent',
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: '600',
                color: activeTab === tab ? textPrimary : textSecondary,
                cursor: 'pointer',
                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }
            }, tab === 'available' ? 'Available' : 'My Tasks')
          )
        ),
      ),

      activeTab === 'available' ? React.createElement('div', { style: { padding: '0 20px' } },
        // Category pills
        React.createElement('div', {
          style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 14, paddingBottom: 4 }
        },
          ['All', 'Kid Watch', 'Errand', 'Borrow', 'Pet Care', 'Tutoring'].map(cat =>
            React.createElement('button', {
              key: cat,
              style: {
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${borderColor}`,
                background: cat === 'All' ? COLORS.primary : cardBg,
                color: cat === 'All' ? COLORS.white : textPrimary,
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }
            }, cat)
          )
        ),
        filteredTasks.map(task =>
          React.createElement('div', {
            key: task.id,
            style: {
              background: cardBg,
              borderRadius: 16,
              padding: '16px',
              marginBottom: 12,
              border: task.urgent ? `1.5px solid ${COLORS.urgent}40` : `1px solid ${borderColor}`,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                React.createElement(Avatar, { name: task.name, size: 32, color: task.urgent ? COLORS.urgent : COLORS.secondary }),
                React.createElement('div', null,
                  React.createElement('span', { style: { fontFamily: FONT, fontSize: 14, fontWeight: '600', color: textPrimary } }, task.name),
                  React.createElement('span', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary, marginLeft: 8 } }, task.distance),
                ),
              ),
              React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
                task.urgent ? React.createElement('span', {
                  style: { background: `${COLORS.urgent}18`, color: COLORS.urgent, fontFamily: FONT, fontSize: 11, fontWeight: '700', padding: '3px 8px', borderRadius: 10 }
                }, '⚡') : null,
                React.createElement('span', {
                  style: { background: `${COLORS.secondary}20`, color: COLORS.secondary, fontFamily: FONT, fontSize: 11, fontWeight: '600', padding: '3px 8px', borderRadius: 10 }
                }, task.category),
              ),
            ),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, color: textPrimary, margin: '0 0 10px', lineHeight: '21px' } }, task.task),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
                React.createElement('span', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary } }, task.time),
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 13, color: COLORS.cta, fontWeight: '600' }
                }, `+${task.points} pts`),
              ),
              React.createElement('button', {
                onClick: () => {
                  if (!acceptedTasks.includes(task.id)) {
                    setAcceptedTasks([...acceptedTasks, task.id]);
                    setPatchPoints(p => p + task.points);
                    showToastMessage(`Helping ${task.name}! +${task.points} PatchPoints 🌟`);
                  }
                },
                style: {
                  background: acceptedTasks.includes(task.id) ? COLORS.secondary : COLORS.primary,
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: 10,
                  padding: '7px 16px',
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: '600',
                  cursor: 'pointer',
                }
              }, acceptedTasks.includes(task.id) ? '✓ Offered' : 'Help Out'),
            )
          )
        ),
        React.createElement('div', { style: { height: 20 } })
      ) :
      // My Tasks tab
      React.createElement('div', { style: { padding: '0 20px' } },
        myTasks.map(task =>
          React.createElement('div', {
            key: task.id,
            style: {
              background: cardBg,
              borderRadius: 16,
              padding: '16px',
              marginBottom: 12,
              border: `1px solid ${borderColor}`,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('span', {
                style: {
                  background: task.status === 'Active' ? `${COLORS.secondary}20` : `${COLORS.primary}20`,
                  color: task.status === 'Active' ? COLORS.secondary : COLORS.primary,
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: 10,
                }
              }, task.status),
              React.createElement('span', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary } }, task.time),
            ),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, color: textPrimary, margin: '0 0 10px', lineHeight: '21px' } }, task.task),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(Icon, { name: 'MessageCircle', size: 16, color: textSecondary }),
              React.createElement('span', { style: { fontFamily: FONT, fontSize: 13, color: textSecondary } }, `${task.responses} response${task.responses !== 1 ? 's' : ''}`),
            ),
          )
        ),
        React.createElement('button', {
          onClick: () => setShowNewTaskModal(true),
          style: {
            width: '100%',
            padding: '14px',
            background: COLORS.primary,
            color: COLORS.white,
            border: 'none',
            borderRadius: 14,
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 4px 16px rgba(216,141,112,0.3)',
          }
        }, React.createElement(Icon, { name: 'Plus', size: 20, color: COLORS.white }), 'Create New Task'),
        React.createElement('div', { style: { height: 20 } })
      )
    );
  };

  const LibraryScreen = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    
    const items = [
      { id: 1, name: 'Pack n Play', owner: 'Maria S.', category: 'Baby Gear', condition: 'Great', available: true, image: '🛏️' },
      { id: 2, name: 'Harry Potter Set (1-7)', owner: 'James K.', category: 'Kids Books', condition: 'Good', available: true, image: '📚' },
      { id: 3, name: 'Power Drill', owner: 'Rob T.', category: 'Tools', condition: 'Like New', available: true, image: '🔧' },
      { id: 4, name: 'Bounce House (small)', owner: 'Priya D.', category: 'Party Supplies', condition: 'Great', available: false, image: '🏰' },
      { id: 5, name: 'High Chair', owner: 'Chen W.', category: 'Baby Gear', condition: 'Good', available: true, image: '🪑' },
      { id: 6, name: 'Art Easel (kids)', owner: 'Sara L.', category: 'Toys', condition: 'Good', available: true, image: '🎨' },
      { id: 7, name: 'Stroller (jogging)', owner: 'Mike D.', category: 'Baby Gear', condition: 'Like New', available: true, image: '🏃' },
      { id: 8, name: 'Cake Stand Set', owner: 'Linda F.', category: 'Party Supplies', condition: 'Great', available: true, image: '🎂' },
    ];

    const categories = ['all', 'Baby Gear', 'Kids Books', 'Tools', 'Party Supplies', 'Toys'];
    const filtered = activeCategory === 'all' ? items : items.filter(i => i.category === activeCategory);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' } },
      React.createElement('div', { style: { padding: '16px 20px 8px' } },
        React.createElement('h1', { style: { fontFamily: FONT, fontSize: 28, fontWeight: '800', color: textPrimary, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Swap & Lend'),
        React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, color: textSecondary, margin: '0 0 16px' } }, 'Share items with your neighborhood'),
      ),

      // Categories
      React.createElement('div', {
        style: { display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 14px', WebkitOverflowScrolling: 'touch' }
      },
        categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setActiveCategory(cat),
            style: {
              padding: '8px 16px',
              borderRadius: 20,
              border: activeCategory === cat ? 'none' : `1px solid ${borderColor}`,
              background: activeCategory === cat ? COLORS.secondary : cardBg,
              color: activeCategory === cat ? COLORS.white : textPrimary,
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.2s',
            }
          }, cat === 'all' ? 'All Items' : cat)
        )
      ),

      // Items Grid
      React.createElement('div', {
        style: { padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
      },
        filtered.map(item =>
          React.createElement('div', {
            key: item.id,
            onClick: () => {
              if (item.available) {
                showToastMessage(`Requesting "${item.name}" from ${item.owner} 📦`);
              }
            },
            style: {
              background: cardBg,
              borderRadius: 16,
              padding: '16px',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: item.available ? 'pointer' : 'default',
              opacity: item.available ? 1 : 0.6,
              transition: 'transform 0.2s',
            }
          },
            React.createElement('div', {
              style: {
                fontSize: 36,
                textAlign: 'center',
                marginBottom: 10,
                background: darkMode ? '#333' : '#F5EDE5',
                borderRadius: 12,
                padding: '16px 0',
              }
            }, item.image),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 14, fontWeight: '600', color: textPrimary, margin: '0 0 4px' } }, item.name),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary, margin: '0 0 6px' } }, item.owner),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('span', {
                style: {
                  fontFamily: FONT,
                  fontSize: 11,
                  color: item.available ? COLORS.success : COLORS.urgent,
                  fontWeight: '600',
                }
              }, item.available ? '● Available' : '● Borrowed'),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 11, color: textSecondary }
              }, item.condition),
            )
          )
        )
      ),

      // Add Item Button
      React.createElement('div', { style: { padding: '20px' } },
        React.createElement('button', {
          onClick: () => showToastMessage('List an item feature coming soon! 🎁'),
          style: {
            width: '100%',
            padding: '14px',
            background: 'transparent',
            color: COLORS.secondary,
            border: `2px dashed ${COLORS.secondary}60`,
            borderRadius: 14,
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }
        }, React.createElement(Icon, { name: 'Plus', size: 20, color: COLORS.secondary }), 'List an Item'),
      ),

      React.createElement('div', { style: { height: 20 } })
    );
  };

  const CirclesScreen = () => {
    const circles = [
      { id: 1, name: 'Maple Street Parents', members: 24, active: true, color: COLORS.primary, requests: 5 },
      { id: 2, name: 'Oakwood Elementary PTA', members: 68, active: true, color: COLORS.secondary, requests: 12 },
      { id: 3, name: 'Toddler Crew 👶', members: 15, active: true, color: COLORS.cta, requests: 3 },
    ];

    const suggested = [
      { id: 4, name: 'Riverside Dog Walkers', members: 32, distance: '0.5 mi', color: COLORS.primaryDark },
      { id: 5, name: 'Weekend Soccer Families', members: 19, distance: '0.3 mi', color: COLORS.secondaryDark },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' } },
      React.createElement('div', { style: { padding: '16px 20px 8px' } },
        React.createElement('h1', { style: { fontFamily: FONT, fontSize: 28, fontWeight: '800', color: textPrimary, margin: '0 0 4px', letterSpacing: -0.5 } }, 'My Circles'),
        React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, color: textSecondary, margin: '0 0 16px' } }, 'Your trusted neighborhood groups'),
      ),

      // Verified badge
      React.createElement('div', {
        style: {
          margin: '0 20px 16px',
          padding: '14px 18px',
          background: `${COLORS.secondary}15`,
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          border: `1px solid ${COLORS.secondary}30`,
        }
      },
        React.createElement('div', {
          style: {
            width: 36,
            height: 36,
            borderRadius: 18,
            background: COLORS.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'ShieldCheck', size: 20, color: COLORS.white })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: FONT, fontSize: 14, fontWeight: '600', color: textPrimary, margin: 0 } }, 'Address Verified ✓'),
          React.createElement('p', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary, margin: '2px 0 0' } }, '142 Maple Street · Verified 3 months ago'),
        ),
      ),

      // My Circles
      React.createElement('div', { style: { padding: '0 20px' } },
        circles.map(circle =>
          React.createElement('div', {
            key: circle.id,
            style: {
              background: cardBg,
              borderRadius: 16,
              padding: '18px',
              marginBottom: 12,
              border: `1px solid ${borderColor}`,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
                React.createElement('div', {
                  style: {
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${circle.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                }, React.createElement(Icon, { name: 'Users', size: 24, color: circle.color })),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontFamily: FONT, fontSize: 16, fontWeight: '600', color: textPrimary, margin: 0 } }, circle.name),
                  React.createElement('p', { style: { fontFamily: FONT, fontSize: 13, color: textSecondary, margin: '2px 0 0' } }, `${circle.members} members · ${circle.requests} active requests`),
                ),
              ),
              React.createElement(Icon, { name: 'ChevronRight', size: 20, color: textSecondary }),
            )
          )
        ),

        // Suggested
        React.createElement('h2', { style: { fontFamily: FONT, fontSize: 18, fontWeight: '700', color: textPrimary, margin: '20px 0 12px' } }, 'Suggested Circles'),
        suggested.map(circle =>
          React.createElement('div', {
            key: circle.id,
            style: {
              background: cardBg,
              borderRadius: 16,
              padding: '16px 18px',
              marginBottom: 12,
              border: `1px solid ${borderColor}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
              React.createElement('div', {
                style: {
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${circle.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              }, React.createElement(Icon, { name: 'Users', size: 22, color: circle.color })),
              React.createElement('div', null,
                React.createElement('p', { style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: textPrimary, margin: 0 } }, circle.name),
                React.createElement('p', { style: { fontFamily: FONT, fontSize: 12, color: textSecondary, margin: '2px 0 0' } }, `${circle.members} members · ${circle.distance}`),
              ),
            ),
            React.createElement('button', {
              onClick: () => showToastMessage(`Request to join "${circle.name}" sent! 🙌`),
              style: {
                background: COLORS.primary,
                color: COLORS.white,
                border: 'none',
                borderRadius: 10,
                padding: '8px 16px',
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: '600',
                cursor: 'pointer',
              }
            }, 'Join'),
          )
        ),

        // Create Circle
        React.createElement('button', {
          onClick: () => showToastMessage('Create circle feature coming soon! 🏘️'),
          style: {
            width: '100%',
            padding: '14px',
            background: 'transparent',
            color: COLORS.primary,
            border: `2px dashed ${COLORS.primary}50`,
            borderRadius: 14,
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 4,
          }
        }, React.createElement(Icon, { name: 'Plus', size: 20, color: COLORS.primary }), 'Create New Circle'),
      ),

      React.createElement('div', { style: { height: 20 } })
    );
  };

  const ProfileScreen = () => {
    const skills = ['Baking Help', 'Quick Repairs', 'Pet Sitting', 'Math Tutoring'];
    const [availability, setAvailability] = useState(['Morning', 'Evening']);

    const stats = [
      { label: 'Tasks Helped', value: '23', icon: 'HandHelping' },
      { label: 'Items Shared', value: '8', icon: 'Package' },
      { label: 'Avg Rating', value: '4.9', icon: 'Star' },
    ];

    const toggleAvailability = (time) => {
      if (availability.includes(time)) {
        setAvailability(availability.filter(a => a !== time));
      } else {
        setAvailability([...availability, time]);
      }
    };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' } },
      // Profile Header
      React.createElement('div', {
        style: {
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      },
        React.createElement('h1', { style: { fontFamily: FONT, fontSize: 28, fontWeight: '800', color: textPrimary, margin: 0, letterSpacing: -0.5 } }, 'Profile'),
        React.createElement('button', {
          onClick: () => showToastMessage('Settings page coming soon! ⚙️'),
          style: {
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 12,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }
        }, React.createElement(Icon, { name: 'Settings', size: 20 })),
      ),

      // Profile Card
      React.createElement('div', {
        style: {
          margin: '0 20px 16px',
          padding: '24px',
          background: cardBg,
          borderRadius: 20,
          border: `1px solid ${borderColor}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          textAlign: 'center',
        }
      },
        React.createElement(Avatar, { name: 'Jamie Anderson', size: 72, color: COLORS.primary }),
        React.createElement('h2', { style: { fontFamily: FONT, fontSize: 22, fontWeight: '700', color: textPrimary, margin: '12px 0 4px' } }, 'Jamie Anderson'),
        React.createElement('p', { style: { fontFamily: FONT, fontSize: 14, color: textSecondary, margin: '0 0 4px' } }, '142 Maple Street'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 } },
          React.createElement(Icon, { name: 'ShieldCheck', size: 16, color: COLORS.secondary }),
          React.createElement('span', { style: { fontFamily: FONT, fontSize: 13, color: COLORS.secondary, fontWeight: '600' } }, 'Verified Neighbor'),
        ),

        // PatchPoints display
        React.createElement('div', {
          style: {
            background: `${COLORS.cta}18`,
            borderRadius: 14,
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }
        },
          React.createElement(Icon, { name: 'Sparkles', size: 20, color: COLORS.ctaDark }),
          React.createElement('span', { style: { fontFamily: FONT, fontSize: 18, fontWeight: '800', color: COLORS.ctaDark } }, `${patchPoints} PatchPoints`),
        ),
      ),

      // Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 10, margin: '0 20px 16px' }
      },
        stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              background: cardBg,
              borderRadius: 14,
              padding: '14px 8px',
              textAlign: 'center',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', {
              style: {
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `${COLORS.primary}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
              }
            }, React.createElement(Icon, { name: stat.icon, size: 18, color: COLORS.primary })),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 20, fontWeight: '800', color: textPrimary, margin: 0 } }, stat.value),
            React.createElement('p', { style: { fontFamily: FONT, fontSize: 11, color: textSecondary, margin: '2px 0 0' } }, stat.label),
          )
        )
      ),

      // Skills
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 16 } },
        React.createElement('h3', { style: { fontFamily: FONT, fontSize: 18, fontWeight: '700', color: textPrimary, margin: '0 0 10px' } }, 'My Skills'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          skills.map((skill, i) =>
            React.createElement('span', {
              key: i,
              style: {
                background: `${COLORS.secondary}18`,
                color: COLORS.secondaryDark,
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: '600',
                padding: '8px 14px',
                borderRadius: 20,
                border: `1px solid ${COLORS.secondary}30`,
              }
            }, skill)
          ),
          React.createElement('button', {
            onClick: () => showToastMessage('Add skill feature coming soon! 🛠️'),
            style: {
              background: 'transparent',
              color: COLORS.primary,
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: '600',
              padding: '8px 14px',
              borderRadius: 20,
              border: `1.5px dashed ${COLORS.primary}60`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }
          }, React.createElement(Icon, { name: 'Plus', size: 14, color: COLORS.primary }), 'Add')
        ),
      ),

      // Availability
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 16 } },
        React.createElement('h3', { style: { fontFamily: FONT, fontSize: 18, fontWeight: '700', color: textPrimary, margin: '0 0 10px' } }, 'Availability'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          ['Morning', 'Afternoon', 'Evening', 'Weekend'].map(time =>
            React.createElement('button', {
              key: time,
              onClick: () => toggleAvailability(time),
              style: {
                flex: 1,
                padding: '10px 4px',
                borderRadius: 12,
                border: availability.includes(time) ? `2px solid ${COLORS.secondary}` : `1px solid ${borderColor}`,
                background: availability.includes(time) ? `${COLORS.secondary}15` : cardBg,
                color: availability.includes(time) ? COLORS.secondaryDark : textSecondary,
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
              }
            }, time)
          )
        ),
      ),

      // Theme Toggle
      React.createElement('div', {
        style: {
          margin: '0 20px',
          padding: '16px 18px',
          background: cardBg,
          borderRadius: 14,
          border: `1px solid ${borderColor