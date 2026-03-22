const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080D1A',
    surface: '#111827',
    surfaceAlt: '#1A2235',
    card: '#15202F',
    border: '#1E2D42',
    primary: '#00D4AA',
    primaryDim: '#00D4AA22',
    primaryGlow: '#00D4AA40',
    accent: '#7C6FFF',
    accentDim: '#7C6FFF22',
    warning: '#FFB547',
    warningDim: '#FFB54722',
    danger: '#FF6B6B',
    dangerDim: '#FF6B6B22',
    text: '#F0F6FF',
    textSub: '#8CA0BC',
    textMuted: '#4A5E78',
    navBg: '#0D1420',
    statusBar: '#080D1A',
    pill: '#1E2D42',
    gradient1: 'linear-gradient(135deg, #00D4AA18, #7C6FFF18)',
    gradient2: 'linear-gradient(135deg, #00D4AA, #00A882)',
    gradient3: 'linear-gradient(135deg, #7C6FFF, #5A4FCC)',
  },
  light: {
    bg: '#F0F5FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F7FAFF',
    card: '#FFFFFF',
    border: '#E2EAF4',
    primary: '#00B894',
    primaryDim: '#00B89418',
    primaryGlow: '#00B89430',
    accent: '#6C5CE7',
    accentDim: '#6C5CE718',
    warning: '#F39C12',
    warningDim: '#F39C1218',
    danger: '#E74C3C',
    dangerDim: '#E74C3C18',
    text: '#0A1628',
    textSub: '#4A6080',
    textMuted: '#8AA0BC',
    navBg: '#FFFFFF',
    statusBar: '#F0F5FF',
    pill: '#E8F0FE',
    gradient1: 'linear-gradient(135deg, #00B89412, #6C5CE712)',
    gradient2: 'linear-gradient(135deg, #00B894, #009B7D)',
    gradient3: 'linear-gradient(135deg, #6C5CE7, #5549C0)',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeKey, setThemeKey] = useState('dark');
  const t = themes[themeKey];

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const tabs = [
    { id: 'home', label: 'Now', icon: window.lucide.Zap },
    { id: 'tasks', label: 'Tasks', icon: window.lucide.CheckSquare },
    { id: 'momentum', label: 'Sprint', icon: window.lucide.Flame },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings2 },
  ];

  const screens = {
    home: HomeScreen,
    tasks: TasksScreen,
    momentum: MomentumScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  const fontLink = React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0; }
    body { background: #0A0A0A; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; }
  `);

  const outerBg = { background: themeKey === 'dark' ? '#0A0A12' : '#C8D6EC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' };

  const phoneShadow = themeKey === 'dark'
    ? '0 40px 120px rgba(0,212,170,0.12), 0 0 0 1px #1E2D42'
    : '0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px #C0CDE0';

  const phoneStyle = {
    width: '375px',
    height: '812px',
    borderRadius: '52px',
    background: t.bg,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: phoneShadow,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: t.navBg,
    borderTop: `1px solid ${t.border}`,
    paddingBottom: '16px',
    paddingTop: '10px',
    flexShrink: 0,
  };

  return React.createElement(React.Fragment, null,
    fontLink,
    React.createElement('div', { style: outerBg },
      React.createElement('div', { style: phoneStyle },

        // Dynamic Island + Status Bar
        React.createElement('div', {
          style: {
            background: t.statusBar,
            paddingTop: '14px',
            paddingBottom: '8px',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            position: 'relative',
          }
        },
          React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, timeStr),
          // Dynamic Island
          React.createElement('div', {
            style: {
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '10px',
              width: '120px',
              height: '34px',
              background: '#000',
              borderRadius: '20px',
            }
          }),
          React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
            React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
            React.createElement(window.lucide.Battery, { size: 16, color: t.text }),
          )
        ),

        // Screen content
        React.createElement('div', { style: contentStyle },
          React.createElement(screens[activeTab], { t, themeKey, setThemeKey, activeTab, setActiveTab })
        ),

        // Bottom nav
        React.createElement('div', { style: navStyle },
          tabs.map(tab =>
            React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                cursor: 'pointer',
                padding: '4px 10px',
                borderRadius: '12px',
                transition: 'all 0.2s',
                background: activeTab === tab.id ? t.primaryDim : 'transparent',
              }
            },
              React.createElement(tab.icon, {
                size: 22,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
              }),
              React.createElement('span', {
                style: {
                  fontSize: '10px',
                  fontWeight: activeTab === tab.id ? '700' : '500',
                  color: activeTab === tab.id ? t.primary : t.textMuted,
                  letterSpacing: '0.3px',
                }
              }, tab.label)
            )
          )
        )
      )
    )
  );
}

// ─── HOME SCREEN ────────────────────────────────────────────────────────────

function HomeScreen({ t }) {
  const [dismissed, setDismissed] = useState(false);
  const [tapped, setTapped] = useState(null);

  const windowMins = 23;
  const tasks = [
    { id: 1, title: 'Approve Q2 expense report', effort: 'low', mins: 4, icon: window.lucide.FileCheck, tag: 'Finance', color: '#00D4AA' },
    { id: 2, title: 'Reply to Priya re: design review', effort: 'low', mins: 6, icon: window.lucide.MessageSquare, tag: 'Comms', color: '#7C6FFF' },
    { id: 3, title: 'Review pull request #214', effort: 'medium', mins: 15, icon: window.lucide.GitPullRequest, tag: 'Dev', color: '#FFB547' },
  ];

  const effortColor = { low: t.primary, medium: t.warning, high: t.danger };
  const effortBg = { low: t.primaryDim, medium: t.warningDim, high: t.dangerDim };

  return React.createElement('div', { style: { padding: '0 20px 20px', color: t.text } },

    // Context banner
    React.createElement('div', {
      style: {
        background: t.gradient1,
        border: `1px solid ${t.border}`,
        borderRadius: '20px',
        padding: '18px',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: '-20px', right: '-20px',
          width: '100px', height: '100px',
          background: t.primaryGlow,
          borderRadius: '50%',
          filter: 'blur(30px)',
        }
      }),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' } },
        React.createElement('div', {
          style: { width: '8px', height: '8px', borderRadius: '50%', background: t.primary, boxShadow: `0 0 8px ${t.primary}` }
        }),
        React.createElement('span', { style: { fontSize: '12px', fontWeight: '600', color: t.primary, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Live Window Detected'),
      ),
      React.createElement('div', { style: { fontSize: '28px', fontWeight: '800', color: t.text, lineHeight: 1.1 } },
        windowMins, React.createElement('span', { style: { fontSize: '16px', fontWeight: '600', color: t.textSub, marginLeft: '4px' } }, 'min free')
      ),
      React.createElement('div', { style: { fontSize: '13px', color: t.textSub, marginTop: '4px' } },
        'Before: Team standup at 3:30 PM · Location: Coffee shop'
      ),
      React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' } },
        ['Calendar sync', 'Low focus', 'Mobile-friendly'].map(tag =>
          React.createElement('span', {
            key: tag,
            style: {
              fontSize: '11px', fontWeight: '600', color: t.textSub,
              background: t.pill, borderRadius: '20px',
              padding: '3px 10px', border: `1px solid ${t.border}`,
            }
          }, tag)
        )
      )
    ),

    // Suggested tasks
    React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' } },
      'Suggested for right now'
    ),

    tasks.map((task, i) =>
      React.createElement('div', {
        key: task.id,
        onClick: () => setTapped(tapped === task.id ? null : task.id),
        style: {
          background: tapped === task.id ? task.color + '18' : t.card,
          border: `1px solid ${tapped === task.id ? task.color + '60' : t.border}`,
          borderRadius: '18px',
          padding: '16px',
          marginBottom: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          transform: tapped === task.id ? 'scale(0.98)' : 'scale(1)',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
          React.createElement('div', {
            style: {
              width: '42px', height: '42px', borderRadius: '13px',
              background: task.color + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          },
            React.createElement(task.icon, { size: 20, color: task.color })
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text, marginBottom: '3px' } }, task.title),
            React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
              React.createElement('span', {
                style: {
                  fontSize: '11px', fontWeight: '700', color: effortColor[task.effort],
                  background: effortBg[task.effort], borderRadius: '6px', padding: '2px 7px',
                }
              }, task.effort),
              React.createElement('span', { style: { fontSize: '12px', color: t.textSub } }, `~${task.mins} min`),
              React.createElement('span', { style: { fontSize: '12px', color: t.textMuted } }, task.tag),
            )
          ),
          React.createElement('div', {
            style: {
              width: '32px', height: '32px', borderRadius: '50%',
              background: tapped === task.id ? task.color : t.pill,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              transition: 'all 0.2s',
            }
          },
            React.createElement(window.lucide.ArrowRight, { size: 16, color: tapped === task.id ? '#fff' : t.textMuted })
          )
        ),
        tapped === task.id && React.createElement('div', {
          style: {
            marginTop: '12px', paddingTop: '12px',
            borderTop: `1px solid ${task.color + '30'}`,
            display: 'flex', gap: '8px',
          }
        },
          React.createElement('button', {
            style: {
              flex: 1, padding: '10px', borderRadius: '12px',
              background: task.color, border: 'none', color: '#fff',
              fontSize: '13px', fontWeight: '700', cursor: 'pointer',
            }
          }, 'Start Now'),
          React.createElement('button', {
            style: {
              padding: '10px 14px', borderRadius: '12px',
              background: t.pill, border: `1px solid ${t.border}`, color: t.textSub,
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }
          }, 'Skip'),
        )
      )
    ),

    // Friction note shortcut
    React.createElement('div', {
      style: {
        background: t.surfaceAlt,
        border: `1px dashed ${t.border}`,
        borderRadius: '16px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '4px',
        cursor: 'pointer',
      }
    },
      React.createElement(window.lucide.MessageCircle, { size: 18, color: t.textMuted }),
      React.createElement('span', { style: { fontSize: '13px', color: t.textMuted, fontWeight: '500' } }, 'Nothing feels right? Leave a friction note'),
    )
  );
}

// ─── TASKS SCREEN ───────────────────────────────────────────────────────────

function TasksScreen({ t }) {
  const [filter, setFilter] = useState('all');
  const [checked, setChecked] = useState({});

  const filters = ['all', 'quick', 'focus', 'mobile'];

  const tasks = [
    { id: 1, title: 'Respond to legal team email', effort: 'low', mins: 5, focus: 1, mobile: true, tag: 'Comms', icon: window.lucide.Mail },
    { id: 2, title: 'Update project status in Notion', effort: 'low', mins: 8, focus: 1, mobile: true, tag: 'Admin', icon: window.lucide.FileText },
    { id: 3, title: 'Approve contractor invoice #88', effort: 'low', mins: 3, focus: 1, mobile: true, tag: 'Finance', icon: window.lucide.ReceiptText },
    { id: 4, title: 'Review brand guidelines doc', effort: 'medium', mins: 20, focus: 2, mobile: false, tag: 'Design', icon: window.lucide.Palette },
    { id: 5, title: 'Write unit tests for auth module', effort: 'high', mins: 45, focus: 3, mobile: false, tag: 'Dev', icon: window.lucide.Code2 },
    { id: 6, title: 'Schedule Q3 kickoff meeting', effort: 'low', mins: 5, focus: 1, mobile: true, tag: 'Planning', icon: window.lucide.CalendarPlus },
    { id: 7, title: 'Refactor dashboard API calls', effort: 'high', mins: 60, focus: 3, mobile: false, tag: 'Dev', icon: window.lucide.Wrench },
  ];

  const filtered = tasks.filter(task => {
    if (filter === 'quick') return task.mins <= 10;
    if (filter === 'focus') return task.focus >= 3;
    if (filter === 'mobile') return task.mobile;
    return true;
  });

  const focusBar = (level) => {
    const colors = ['', t.primary, t.warning, t.danger];
    return React.createElement('div', { style: { display: 'flex', gap: '2px' } },
      [1,2,3].map(i =>
        React.createElement('div', {
          key: i,
          style: { width: '6px', height: '10px', borderRadius: '2px', background: i <= level ? colors[level] : t.pill }
        })
      )
    );
  };

  return React.createElement('div', { style: { padding: '0 20px 20px', color: t.text } },

    React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', marginBottom: '4px' } }, 'Your Tasks'),
    React.createElement('div', { style: { fontSize: '13px', color: t.textSub, marginBottom: '20px' } }, `${tasks.length} tasks · sorted by effort`),

    // Filter pills
    React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' } },
      filters.map(f =>
        React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          style: {
            padding: '7px 16px',
            borderRadius: '20px',
            border: `1px solid ${filter === f ? t.primary : t.border}`,
            background: filter === f ? t.primaryDim : t.pill,
            color: filter === f ? t.primary : t.textSub,
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            transition: 'all 0.2s',
          }
        }, f === 'all' ? 'All tasks' : f === 'quick' ? '⚡ Quick wins' : f === 'focus' ? '🧠 Deep focus' : '📱 Mobile-only')
      )
    ),

    filtered.map(task =>
      React.createElement('div', {
        key: task.id,
        style: {
          background: checked[task.id] ? t.surfaceAlt : t.card,
          border: `1px solid ${t.border}`,
          borderRadius: '18px',
          padding: '14px 16px',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          opacity: checked[task.id] ? 0.5 : 1,
          transition: 'all 0.2s',
        },
        onClick: () => setChecked(c => ({ ...c, [task.id]: !c[task.id] }))
      },
        React.createElement('div', {
          style: {
            width: '24px', height: '24px', borderRadius: '8px', flexShrink: 0,
            border: `2px solid ${checked[task.id] ? t.primary : t.border}`,
            background: checked[task.id] ? t.primary : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }
        },
          checked[task.id] && React.createElement(window.lucide.Check, { size: 14, color: '#fff', strokeWidth: 3 })
        ),
        React.createElement('div', {
          style: {
            width: '36px', height: '36px', borderRadius: '10px',
            background: t.pill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          React.createElement(task.icon, { size: 17, color: t.textSub })
        ),
        React.createElement('div', { style: { flex: 1, minWidth: 0 } },
          React.createElement('div', {
            style: {
              fontSize: '14px', fontWeight: '600', color: t.text,
              textDecoration: checked[task.id] ? 'line-through' : 'none', marginBottom: '4px',
            }
          }, task.title),
          React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, task.tag),
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `${task.mins}m`),
            task.mobile && React.createElement(window.lucide.Smartphone, { size: 11, color: t.primary }),
          )
        ),
        focusBar(task.focus),
      )
    )
  );
}

// ─── MOMENTUM SCREEN ────────────────────────────────────────────────────────

function MomentumScreen({ t }) {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState([]);

  const sprint = [
    { id: 0, title: 'Approve expense report #Q2', mins: 4, icon: window.lucide.FileCheck },
    { id: 1, title: 'Reply to Priya about design review', mins: 5, icon: window.lucide.MessageSquare },
    { id: 2, title: 'Schedule next 1:1 with Marcus', mins: 3, icon: window.lucide.CalendarPlus },
    { id: 3, title: 'Mark 3 emails as read/archive', mins: 2, icon: window.lucide.Mail },
  ];

  const totalMins = sprint.reduce((s, t) => s + t.mins, 0);
  const progress = done.length / sprint.length;

  const handleComplete = () => {
    setDone(d => [...d, current]);
    if (current < sprint.length - 1) setCurrent(current + 1);
    else setActive(false);
  };

  return React.createElement('div', { style: { padding: '0 20px 20px', color: t.text } },

    React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', marginBottom: '4px' } }, 'Sprint Mode'),
    React.createElement('div', { style: { fontSize: '13px', color: t.textSub, marginBottom: '20px' } }, 'Knock out tasks in a single focused burst'),

    !active ? React.createElement(React.Fragment, null,

      // Sprint card
      React.createElement('div', {
        style: {
          background: t.gradient1,
          border: `1px solid ${t.border}`,
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '16px',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' } },
          React.createElement('div', {
            style: {
              width: '48px', height: '48px', borderRadius: '16px',
              background: t.gradient2, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(window.lucide.Flame, { size: 24, color: '#fff' })
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: '18px', fontWeight: '800' } }, 'Admin Blitz'),
            React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, `${sprint.length} tasks · ~${totalMins} min total`),
          )
        ),

        sprint.map((task, i) =>
          React.createElement('div', {
            key: task.id,
            style: {
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 0',
              borderBottom: i < sprint.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: '28px', height: '28px', borderRadius: '8px',
                background: t.pill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement(task.icon, { size: 14, color: t.textSub })
            ),
            React.createElement('div', { style: { flex: 1, fontSize: '13px', fontWeight: '500', color: t.text } }, task.title),
            React.createElement('span', { style: { fontSize: '12px', color: t.textMuted } }, `${task.mins}m`),
          )
        ),
      ),

      React.createElement('button', {
        onClick: () => { setActive(true); setCurrent(0); setDone([]); },
        style: {
          width: '100%', padding: '16px', borderRadius: '18px',
          background: t.gradient2, border: 'none', color: '#fff',
          fontSize: '15px', fontWeight: '800', cursor: 'pointer',
          letterSpacing: '0.3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }
      },
        React.createElement(window.lucide.Zap, { size: 18, color: '#fff' }),
        'Start Sprint'
      )

    ) : React.createElement(React.Fragment, null,

      // Progress
      React.createElement('div', { style: { marginBottom: '20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
          React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: t.primary } }, `${done.length}/${sprint.length} done`),
          React.createElement('span', { style: { fontSize: '12px', color: t.textMuted } }, `${totalMins - done.reduce((s, i) => s + sprint[i].mins, 0)}m left`),
        ),
        React.createElement('div', { style: { height: '6px', background: t.pill, borderRadius: '3px', overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', borderRadius: '3px',
              width: `${progress * 100}%`,
              background: t.gradient2,
              transition: 'width 0.4s ease',
            }
          })
        )
      ),

      // Active task card
      React.createElement('div', {
        style: {
          background: t.gradient2,
          borderRadius: '24px',
          padding: '28px 24px',
          marginBottom: '12px',
          textAlign: 'center',
        }
      },
        React.createElement('div', { style: { fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' } }, `Task ${current + 1} of ${sprint.length}`),
        React.createElement('div', { style: { fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '8px', lineHeight: 1.3 } }, sprint[current].title),
        React.createElement('div', { style: { fontSize: '13px', color: 'rgba(255,255,255,0.75)' } }, `~${sprint[current].mins} minutes`),
      ),

      React.createElement('button', {
        onClick: handleComplete,
        style: {
          width: '100%', padding: '16px', borderRadius: '18px',
          background: t.primary, border: 'none', color: '#fff',
          fontSize: '15px', fontWeight: '800', cursor: 'pointer',
          marginBottom: '10px',
        }
      }, current < sprint.length - 1 ? '✓ Done, next task' : '🎉 Finish sprint'),

      React.createElement('button', {
        onClick: () => setActive(false),
        style: {
          width: '100%', padding: '14px', borderRadius: '18px',
          background: t.pill, border: `1px solid ${t.border}`, color: t.textSub,
          fontSize: '14px', fontWeight: '600', cursor: 'pointer',
        }
      }, 'Pause sprint')
    )
  );
}

// ─── INSIGHTS SCREEN ────────────────────────────────────────────────────────

function InsightsScreen({ t }) {
  const bars = [
    { label: 'Mon', val: 0.6 }, { label: 'Tue', val: 0.85 }, { label: 'Wed', val: 0.4 },
    { label: 'Thu', val: 0.9 }, { label: 'Fri', val: 0.7 }, { label: 'Sat', val: 0.2 }, { label: 'Sun', val: 0.3 },
  ];

  const contexts = [
    { label: 'Morning commute', rate: 82, tasks: 'Quick replies, expense approvals', icon: window.lucide.Train, color: t.primary },
    { label: 'Coffee shop', rate: 74, tasks: 'Async comms, light admin', icon: window.lucide.Coffee, color: t.accent },
    { label: 'Post-lunch', rate: 45, tasks: 'Focus work harder', icon: window.lucide.Sun, color: t.warning },
    { label: 'Late evening', rate: 67, tasks: 'Reading, planning, review', icon: window.lucide.Moon, color: t.accent },
  ];

  const frictions = [
    { reason: 'Task took longer than estimated', count: 8 },
    { reason: 'Lost focus mid-task', count: 5 },
    { reason: 'Wrong context (needed laptop)', count: 4 },
    { reason: 'Interrupted by notification', count: 3 },
  ];

  return React.createElement('div', { style: { padding: '0 20px 20px', color: t.text } },

    React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', marginBottom: '4px' } }, 'Your Patterns'),
    React.createElement('div', { style: { fontSize: '13px', color: t.textSub, marginBottom: '20px' } }, 'Last 7 days of momentum data'),

    // Stats row
    React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '20px' } },
      [
        { label: 'Tasks done', val: '47', sub: '+12 vs last wk', color: t.primary },
        { label: 'Avg window', val: '18m', sub: 'captured', color: t.accent },
        { label: 'Streak', val: '5d', sub: 'personal best', color: t.warning },
      ].map(s =>
        React.createElement('div', {
          key: s.label,
          style: {
            flex: 1, background: t.card, border: `1px solid ${t.border}`,
            borderRadius: '16px', padding: '14px 12px', textAlign: 'center',
          }
        },
          React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: s.color } }, s.val),
          React.createElement('div', { style: { fontSize: '10px', fontWeight: '600', color: t.textMuted, marginTop: '2px' } }, s.label),
          React.createElement('div', { style: { fontSize: '10px', color: t.textMuted, marginTop: '1px' } }, s.sub),
        )
      )
    ),

    // Bar chart
    React.createElement('div', {
      style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '16px', marginBottom: '16px' }
    },
      React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.text, marginBottom: '16px' } }, 'Completion rate this week'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' } },
        bars.map((b, i) =>
          React.createElement('div', {
            key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }
          },
            React.createElement('div', {
              style: {
                width: '100%',
                height: `${b.val * 64}px`,
                borderRadius: '6px 6px 3px 3px',
                background: b.label === 'Thu' ? t.primary : (t.primary + '55'),
                transition: 'height 0.3s ease',
              }
            }),
            React.createElement('div', { style: { fontSize: '10px', color: t.textMuted, fontWeight: '600' } }, b.label)
          )
        )
      )
    ),

    // Context performance
    React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' } }, 'Context performance'),
    contexts.map(ctx =>
      React.createElement('div', {
        key: ctx.label,
        style: {
          background: t.card, border: `1px solid ${t.border}`,
          borderRadius: '16px', padding: '14px', marginBottom: '8px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }
      },
        React.createElement('div', {
          style: {
            width: '38px', height: '38px', borderRadius: '12px',
            background: ctx.color + '22',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          React.createElement(ctx.icon, { size: 18, color: ctx.color })
        ),
        React.createElement('div', { style: { flex: 1, minWidth: 0 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, ctx.label),
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: ctx.color } }, `${ctx.rate}%`),
          ),
          React.createElement('div', { style: { height: '4px', background: t.pill, borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' } },
            React.createElement('div', { style: { height: '100%', width: `${ctx.rate}%`, borderRadius: '2px', background: ctx.color } })
          ),
          React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, ctx.tasks),
        )
      )
    ),

    // Friction log
    React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', marginTop: '8px' } }, 'Top friction patterns'),
    React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: '18px', overflow: 'hidden' } },
      frictions.map((f, i) =>
        React.createElement('div', {
          key: i,
          style: {
            padding: '13px 16px',
            borderBottom: i < frictions.length - 1 ? `1px solid ${t.border}` : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
          }
        },
          React.createElement('span', { style: { fontSize: '13px', color: t.text, flex: 1 } }, f.reason),
          React.createElement('span', {
            style: {
              fontSize: '12px', fontWeight: '700', color: t.danger,
              background: t.dangerDim, borderRadius: '8px', padding: '2px 8px',
            }
          }, `${f.count}x`)
        )
      )
    )
  );
}

// ─── SETTINGS SCREEN ────────────────────────────────────────────────────────

function SettingsScreen({ t, themeKey, setThemeKey }) {
  const [notifs, setNotifs] = useState(true);
  const [calSync, setCalSync] = useState(true);
  const [locCtx, setLocCtx] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  const Toggle = ({ value, onToggle, color }) =>
    React.createElement('div', {
      onClick: onToggle,
      style: {
        width: '44px', height: '26px', borderRadius: '13px',
        background: value ? (color || t.primary) : t.pill,
        border: `1px solid ${value ? (color || t.primary) : t.border}`,
        position: 'relative', cursor: 'pointer', transition: 'all 0.25s', flexShrink: 0,
      }
    },
      React.createElement('div', {
        style: {
          width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
          position: 'absolute', top: '2px',
          left: value ? '21px' : '2px',
          transition: 'left 0.25s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }
      })
    );

  const Row = ({ icon: Icon, label, sub, right }) =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '15px 16px',
      }
    },
      React.createElement('div', {
        style: {
          width: '36px', height: '36px', borderRadius: '11px',
          background: t.pill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }
      },
        React.createElement(Icon, { size: 17, color: t.primary })
      ),
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, label),
        sub && React.createElement('div', { style: { fontSize: '12px', color: t.textMuted, marginTop: '1px' } }, sub),
      ),
      right,
    );

  const divider = React.createElement('div', { style: { height: '1px', background: t.border, marginLeft: '66px' } });

  return React.createElement('div', { style: { padding: '0 20px 20px', color: t.text } },

    React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', marginBottom: '20px' } }, 'Settings'),

    // Profile card
    React.createElement('div', {
      style: {
        background: t.gradient1, border: `1px solid ${t.border}`,
        borderRadius: '20px', padding: '20px', marginBottom: '20px',
        display: 'flex', alignItems: 'center', gap: '14px',
      }
    },
      React.createElement('div', {
        style: {
          width: '52px', height: '52px', borderRadius: '16px',
          background: t.gradient2, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement('span', { style: { fontSize: '22px', fontWeight: '800', color: '#fff' } }, 'S')
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: t.text } }, 'Steve'),
        React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, 'Pro plan · Sync active'),
      ),
      React.createElement('div', { style: { marginLeft: 'auto' } },
        React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })
      )
    ),

    // Theme toggle
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.border}`,
        borderRadius: '20px', padding: '6px', marginBottom: '16px', overflow: 'hidden',
        display: 'flex',
      }
    },
      ['dark', 'light'].map(tk =>
        React.createElement('button', {
          key: tk,
          onClick: () => setThemeKey(tk),
          style: {
            flex: 1, padding: '10px', borderRadius: '14px',
            background: themeKey === tk ? t.primary : 'transparent',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s',
          }
        },
          React.createElement(tk === 'dark' ? window.lucide.Moon : window.lucide.Sun, {
            size: 16,
            color: themeKey === tk ? '#fff' : t.textMuted,
          }),
          React.createElement('span', {
            style: {
              fontSize: '13px', fontWeight: '700',
              color: themeKey === tk ? '#fff' : t.textMuted,
            }
          }, tk === 'dark' ? 'Dark mode' : 'Light mode')
        )
      )
    ),

    // Settings groups
    [
      {
        title: 'Integrations',
        rows: [
          { icon: window.lucide.Calendar, label: 'Calendar sync', sub: 'Google Calendar connected', right: React.createElement(Toggle, { value: calSync, onToggle: () => setCalSync(v => !v) }) },
          { icon: window.lucide.MapPin, label: 'Location context', sub: 'Used for smarter suggestions', right: React.createElement(Toggle, { value: locCtx, onToggle: () => setLocCtx(v => !v) }) },
          { icon: window.lucide.Bell, label: 'Notifications', sub: 'Time window alerts', right: React.createElement(Toggle, { value: notifs, onToggle: () => setNotifs(v => !v) }) },
        ]
      },
      {
        title: 'Focus',
        rows: [
          { icon: window.lucide.BrainCircuit, label: 'Focus mode', sub: 'Hides low-effort tasks', right: React.createElement(Toggle, { value: focusMode, onToggle: () => setFocusMode(v => !v), color: t.accent }) },
          { icon: window.lucide.Sliders, label: 'Effort thresholds', sub: 'Customize task scoring', right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }) },
          { icon: window.lucide.RefreshCw, label: 'Learning model', sub: 'Reset personalization', right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }) },
        ]
      },
    ].map(group =>
      React.createElement('div', { key: group.title, style: { marginBottom: '16px' } },
        React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '4px' } }, group.title),
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: '20px', overflow: 'hidden' } },
          group.rows.map((row, i) =>
            React.createElement(React.Fragment, { key: row.label },
              React.createElement(Row, row),
              i < group.rows.length - 1 && divider,
            )
          )
        )
      )
    ),

    React.createElement('div', {
      style: { textAlign: 'center', fontSize: '12px', color: t.textMuted, marginTop: '8px' }
    }, 'Time Anchor v1.0 · Built for real life')
  );
}
