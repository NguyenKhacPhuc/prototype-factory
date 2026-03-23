// TaskWeave - Turn scattered tasks into smooth action
// Single-file React prototype with Babel standalone

function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
  }, []);

  const themes = {
    dark: {
      bg: '#0A0A0F',
      surface: '#13131A',
      surfaceAlt: '#1C1C27',
      surfaceHover: '#252535',
      card: '#1A1A26',
      cardBorder: '#2A2A3E',
      text: '#F0F0FF',
      textSecondary: '#8888AA',
      textMuted: '#55556A',
      primary: '#7C3AED',
      primaryLight: '#9D5FF5',
      primaryGlow: 'rgba(124, 58, 237, 0.3)',
      accent: '#06D6A0',
      accentGlow: 'rgba(6, 214, 160, 0.25)',
      warning: '#FFB347',
      danger: '#FF4E6A',
      info: '#4EA8FF',
      navBg: '#13131A',
      navBorder: '#1F1F30',
      statusBar: '#0A0A0F',
      gradient1: 'linear-gradient(135deg, #7C3AED 0%, #4EA8FF 100%)',
      gradient2: 'linear-gradient(135deg, #06D6A0 0%, #4EA8FF 100%)',
      gradient3: 'linear-gradient(135deg, #7C3AED 0%, #FF4E6A 100%)',
      sprintCard: 'linear-gradient(135deg, #1E1535 0%, #1A2040 100%)',
    },
    light: {
      bg: '#F0EFF8',
      surface: '#FFFFFF',
      surfaceAlt: '#F7F6FE',
      surfaceHover: '#EEE9FF',
      card: '#FFFFFF',
      cardBorder: '#E5E0F5',
      text: '#1A1228',
      textSecondary: '#6B5F8A',
      textMuted: '#A89CC0',
      primary: '#7C3AED',
      primaryLight: '#9D5FF5',
      primaryGlow: 'rgba(124, 58, 237, 0.15)',
      accent: '#05B88A',
      accentGlow: 'rgba(5, 184, 138, 0.15)',
      warning: '#E08C00',
      danger: '#E0294A',
      info: '#2B7FD8',
      navBg: '#FFFFFF',
      navBorder: '#E8E3F5',
      statusBar: '#F0EFF8',
      gradient1: 'linear-gradient(135deg, #7C3AED 0%, #4EA8FF 100%)',
      gradient2: 'linear-gradient(135deg, #05B88A 0%, #4EA8FF 100%)',
      gradient3: 'linear-gradient(135deg, #7C3AED 0%, #FF4E6A 100%)',
      sprintCard: 'linear-gradient(135deg, #F0EAFF 0%, #E8F0FF 100%)',
    }
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [currentTime, setCurrentTime] = useState('9:41');

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  // ── shared state ──────────────────────────────────────────────
  const [energyLevel, setEnergyLevel] = useState(2); // 0=low,1=mid,2=high
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Reply to Sarah re: Q2 budget', context: 'phone', time: 3, done: false, tag: 'work', priority: 'high' },
    { id: 2, title: 'Pay electricity bill', context: 'phone', time: 5, done: false, tag: 'admin', priority: 'high' },
    { id: 3, title: 'Voice-note ideas for product roadmap', context: 'phone', time: 4, done: true, tag: 'work', priority: 'mid' },
    { id: 4, title: 'Outline slides for Thursday presentation', context: 'laptop', time: 25, done: false, tag: 'work', priority: 'high' },
    { id: 5, title: 'Gather data for market analysis', context: 'laptop', time: 40, done: false, tag: 'work', priority: 'mid' },
    { id: 6, title: 'Order birthday gift for mom', context: 'phone', time: 8, done: false, tag: 'personal', priority: 'mid' },
    { id: 7, title: 'Schedule dentist appointment', context: 'phone', time: 2, done: false, tag: 'health', priority: 'low' },
    { id: 8, title: 'Read research paper on LLM prompting', context: 'laptop', time: 30, done: false, tag: 'learning', priority: 'low' },
    { id: 9, title: 'Sync with design team on mockups', context: 'laptop', time: 20, done: false, tag: 'work', priority: 'high' },
    { id: 10, title: 'Update project status in Notion', context: 'laptop', time: 10, done: false, tag: 'work', priority: 'mid' },
    { id: 11, title: 'Renew gym membership', context: 'phone', time: 3, done: false, tag: 'health', priority: 'low' },
    { id: 12, title: 'Review pull request from dev team', context: 'laptop', time: 15, done: false, tag: 'work', priority: 'high' },
  ]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;

  const tabs = [
    { id: 'home', label: 'Today', icon: window.lucide.Zap },
    { id: 'sprints', label: 'Sprints', icon: window.lucide.Timer },
    { id: 'tasks', label: 'Tasks', icon: window.lucide.ListTodo },
    { id: 'insights', label: 'Insights', icon: window.lucide.TrendingUp },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings2 },
  ];

  const screens = {
    home: HomeScreen,
    sprints: SprintsScreen,
    tasks: TasksScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  // ── Status Bar ────────────────────────────────────────────────
  const StatusBar = () =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px 4px',
        backgroundColor: t.statusBar,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }
    },
      React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, currentTime),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.textSecondary }),
        React.createElement(window.lucide.Signal, { size: 14, color: t.textSecondary }),
        React.createElement('div', {
          style: {
            width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${t.textSecondary}`,
            display: 'flex', alignItems: 'center', padding: '1px 1.5px', gap: 1, position: 'relative'
          }
        },
          React.createElement('div', { style: { width: '70%', height: '100%', borderRadius: 1.5, background: t.accent } }),
          React.createElement('div', { style: { position: 'absolute', right: -3.5, top: '50%', transform: 'translateY(-50%)', width: 2, height: 5, borderRadius: 1, background: t.textSecondary } })
        )
      )
    );

  // ── Dynamic Island ────────────────────────────────────────────
  const DynamicIsland = () =>
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'center', paddingBottom: 8,
        backgroundColor: t.statusBar,
      }
    },
      React.createElement('div', {
        style: {
          width: 120, height: 32, borderRadius: 20,
          backgroundColor: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }
      },
        React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#1A1A1A', border: '1.5px solid #333' } }),
        React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#1A1A1A', border: '1.5px solid #333' } })
      )
    );

  // ── Bottom Nav ────────────────────────────────────────────────
  const BottomNav = () =>
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '10px 4px 16px',
        backgroundColor: t.navBg,
        borderTop: `1px solid ${t.navBorder}`,
      }
    },
      tabs.map(tab =>
        React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '6px 10px', borderRadius: 12, cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeTab === tab.id ? t.primaryGlow : 'transparent',
            transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
          }
        },
          React.createElement(tab.icon, {
            size: 22,
            color: activeTab === tab.id ? t.primary : t.textMuted,
            strokeWidth: activeTab === tab.id ? 2.5 : 1.8
          }),
          React.createElement('span', {
            style: {
              fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? t.primary : t.textMuted,
            }
          }, tab.label)
        )
      )
    );

  // ── HOME SCREEN ───────────────────────────────────────────────
  function HomeScreen() {
    const contextMap = { phone: 'Phone tasks', laptop: 'Laptop work', offline: 'Offline errands' };
    const sprintTasks = tasks.filter(t => !t.done && t.context === 'phone').slice(0, 3);
    const upcomingWindow = tasks.filter(t => !t.done && t.context === 'laptop').slice(0, 2);
    const energyLabels = ['Low Energy', 'Medium Energy', 'High Energy'];
    const energyColors = [t.info, t.warning, t.accent];
    const energyIcons = [window.lucide.Battery, window.lucide.BatteryMedium, window.lucide.BatteryFull];
    const EIcon = energyIcons[energyLevel];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg, padding: '16px 0 8px' }
    },
      // Header
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('p', { style: { margin: 0, fontSize: 13, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 } }, 'Good morning, Alex'),
            React.createElement('h1', { style: { margin: '2px 0 0', fontSize: 26, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: -0.5 } }, 'Your Today')
          ),
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 14, background: t.gradient1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement('span', { style: { fontSize: 18 } }, '👤')
          )
        ),
        // Progress
        React.createElement('div', { style: { marginTop: 14, background: t.surface, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.cardBorder}` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            React.createElement('span', { style: { fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, color: t.textSecondary } }, `${completedCount} of ${totalCount} tasks done`),
            React.createElement('span', { style: { fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.primary } }, `${Math.round(completedCount / totalCount * 100)}%`)
          ),
          React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${completedCount / totalCount * 100}%`, borderRadius: 3, background: t.gradient1, transition: 'width 0.5s' } })
          )
        )
      ),
      // Context signals
      React.createElement('div', { style: { padding: '0 20px 12px' } },
        React.createElement('p', { style: { margin: '0 0 10px', fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Context signals'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          [
            { icon: window.lucide.MapPin, label: 'Coffee Shop', color: t.accent },
            { icon: window.lucide.Wifi, label: 'Wi-Fi Active', color: t.info },
            { icon: window.lucide.Calendar, label: '12 min free', color: t.warning },
          ].map((sig, i) =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1, background: t.surface, border: `1px solid ${t.cardBorder}`,
                borderRadius: 12, padding: '8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
              }
            },
              React.createElement(sig.icon, { size: 15, color: sig.color }),
              React.createElement('span', { style: { fontSize: 9.5, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, color: t.textSecondary, textAlign: 'center' } }, sig.label)
            )
          )
        )
      ),
      // Energy
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('p', { style: { margin: '0 0 10px', fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Energy level'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          ['Low', 'Medium', 'High'].map((label, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setEnergyLevel(i),
              style: {
                flex: 1, padding: '8px 4px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                background: energyLevel === i ? energyColors[i] + '22' : t.surface,
                border: `1.5px solid ${energyLevel === i ? energyColors[i] : t.cardBorder}`,
                transition: 'all 0.2s',
              }
            },
              React.createElement('span', { style: { fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: energyLevel === i ? energyColors[i] : t.textSecondary } }, label)
            )
          )
        )
      ),
      // Active Sprint
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('p', { style: { margin: 0, fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Active micro-sprint'),
          React.createElement('div', {
            style: {
              background: t.accent + '22', border: `1px solid ${t.accent}44`,
              borderRadius: 20, padding: '3px 10px',
              display: 'flex', alignItems: 'center', gap: 4
            }
          },
            React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.accent } }),
            React.createElement('span', { style: { fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.accent } }, '12 min')
          )
        ),
        React.createElement('div', {
          style: {
            borderRadius: 18, padding: 16, background: t.sprintCard,
            border: `1px solid ${t.cardBorder}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.primaryGlow, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide.Smartphone, { size: 16, color: t.primary })
            ),
            React.createElement('div', null,
              React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Phone Sprint'),
              React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, '3 tasks • 10 min total')
            )
          ),
          sprintTasks.map((task, i) =>
            React.createElement('div', {
              key: task.id,
              onClick: () => toggleTask(task.id),
              style: {
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0',
                borderTop: i > 0 ? `1px solid ${t.cardBorder}` : 'none', cursor: 'pointer',
              }
            },
              React.createElement('div', {
                style: {
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  background: task.done ? t.primary : 'transparent',
                  border: `2px solid ${task.done ? t.primary : t.cardBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }
              },
                task.done && React.createElement(window.lucide.Check, { size: 11, color: '#fff', strokeWidth: 3 })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 600, color: task.done ? t.textMuted : t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: task.done ? 'line-through' : 'none' } }, task.title)
              ),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, `${task.time}m`)
            )
          ),
          React.createElement('div', {
            onClick: () => setActiveTab('sprints'),
            style: {
              marginTop: 12, padding: '10px 0', borderRadius: 12, background: t.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              cursor: 'pointer', transition: 'opacity 0.2s',
            }
          },
            React.createElement(window.lucide.Play, { size: 14, color: '#fff', fill: '#fff' }),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Start Sprint')
          )
        )
      ),
      // Upcoming
      React.createElement('div', { style: { padding: '0 20px 24px' } },
        React.createElement('p', { style: { margin: '0 0 10px', fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Up next'),
        upcomingWindow.map((task, i) =>
          React.createElement('div', {
            key: task.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              marginBottom: 8, background: t.surface, borderRadius: 14,
              border: `1px solid ${t.cardBorder}`,
            }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.gradient2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(window.lucide.Laptop, { size: 16, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, task.title),
              React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, `${task.time} min • ${task.tag}`)
            ),
            React.createElement('div', { style: { background: t.primaryGlow, borderRadius: 8, padding: '4px 8px' } },
              React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, `${task.time}m`)
            )
          )
        )
      )
    );
  }

  // ── SPRINTS SCREEN ────────────────────────────────────────────
  function SprintsScreen() {
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = ['all', 'phone', 'laptop', 'offline'];

    const sprintGroups = [
      {
        id: 'quick', title: 'Quick Phone Sprint', icon: window.lucide.Smartphone,
        duration: '12 min', context: 'phone', color: t.primary,
        tasks: tasks.filter(tk => !tk.done && tk.context === 'phone').slice(0, 3),
        desc: 'Perfect for your 12-minute gap'
      },
      {
        id: 'deep', title: 'Deep Work Session', icon: window.lucide.Laptop,
        duration: '45 min', context: 'laptop', color: t.accent,
        tasks: tasks.filter(tk => !tk.done && tk.context === 'laptop').slice(0, 3),
        desc: 'Wi-Fi detected • Focus mode ready'
      },
      {
        id: 'admin', title: 'Admin Blitz', icon: window.lucide.ClipboardList,
        duration: '20 min', context: 'phone', color: t.warning,
        tasks: tasks.filter(tk => !tk.done && tk.tag === 'admin' || tk.tag === 'health').slice(0, 3),
        desc: 'Clear your admin backlog'
      },
    ];

    const filtered = activeFilter === 'all' ? sprintGroups : sprintGroups.filter(s => s.context === activeFilter);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg, padding: '16px 0 8px' } },
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h2', { style: { margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Micro-Sprints'),
        React.createElement('p', { style: { margin: 0, fontSize: 13, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Context-aware task bundles')
      ),
      // Filters
      React.createElement('div', { style: { padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto' } },
        filters.map(f =>
          React.createElement('div', {
            key: f,
            onClick: () => setActiveFilter(f),
            style: {
              padding: '6px 14px', borderRadius: 20, cursor: 'pointer', flexShrink: 0,
              background: activeFilter === f ? t.primary : t.surface,
              border: `1.5px solid ${activeFilter === f ? t.primary : t.cardBorder}`,
              transition: 'all 0.2s',
            }
          },
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", color: activeFilter === f ? '#fff' : t.textSecondary, textTransform: 'capitalize' } }, f)
          )
        )
      ),
      // Sprint cards
      React.createElement('div', { style: { padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 14 } },
        filtered.map(sprint =>
          React.createElement('div', {
            key: sprint.id,
            style: {
              background: t.surface, borderRadius: 20, border: `1px solid ${t.cardBorder}`,
              overflow: 'hidden'
            }
          },
            // Header
            React.createElement('div', { style: { padding: '14px 16px 10px', background: sprint.color + '12' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                  React.createElement('div', { style: { width: 36, height: 36, borderRadius: 12, background: sprint.color + '22', border: `1.5px solid ${sprint.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement(sprint.icon, { size: 17, color: sprint.color })
                  ),
                  React.createElement('div', null,
                    React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, sprint.title),
                    React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, sprint.desc)
                  )
                ),
                React.createElement('div', { style: { background: sprint.color + '22', borderRadius: 10, padding: '4px 10px' } },
                  React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: sprint.color, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, sprint.duration)
                )
              )
            ),
            // Tasks
            React.createElement('div', { style: { padding: '8px 16px 12px' } },
              sprint.tasks.map((task, i) =>
                React.createElement('div', {
                  key: task.id,
                  onClick: () => toggleTask(task.id),
                  style: {
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                    borderBottom: i < sprint.tasks.length - 1 ? `1px solid ${t.cardBorder}` : 'none',
                    cursor: 'pointer',
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                      background: task.done ? sprint.color : 'transparent',
                      border: `2px solid ${task.done ? sprint.color : t.textMuted}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }
                  }, task.done && React.createElement(window.lucide.Check, { size: 10, color: '#fff', strokeWidth: 3 })),
                  React.createElement('span', { style: { flex: 1, fontSize: 12.5, fontWeight: 600, color: task.done ? t.textMuted : t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: task.done ? 'line-through' : 'none' } }, task.title),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, `${task.time}m`)
                )
              ),
              React.createElement('div', {
                style: {
                  marginTop: 12, padding: '10px 0', borderRadius: 12,
                  background: sprint.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  cursor: 'pointer',
                }
              },
                React.createElement(window.lucide.Play, { size: 14, color: '#fff', fill: '#fff' }),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" } }, `Launch Sprint`)
              )
            )
          )
        )
      )
    );
  }

  // ── TASKS SCREEN ──────────────────────────────────────────────
  function TasksScreen() {
    const [filter, setFilter] = useState('all');
    const [showSplitter, setShowSplitter] = useState(false);
    const [expandedTask, setExpandedTask] = useState(null);
    const tagColors = { work: t.primary, admin: t.warning, personal: t.accent, health: t.info, learning: '#FF6B9D' };

    const subTasks = {
      4: ['Create slide outline structure', 'Gather key data points', 'Design title & agenda slides', 'Rehearse delivery timing'],
      5: ['Define research scope', 'Collect competitor data', 'Analyze trends & patterns', 'Compile findings report'],
    };

    const filtered = filter === 'all' ? tasks : tasks.filter(tk => tk.tag === filter);
    const tags = ['all', ...new Set(tasks.map(t => t.tag))];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg, padding: '16px 0 8px' } },
      React.createElement('div', { style: { padding: '0 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h2', { style: { margin: 0, fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'All Tasks'),
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 12, background: t.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.Plus, { size: 20, color: '#fff' })
        )
      ),
      // Tag filters
      React.createElement('div', { style: { padding: '0 20px 14px', display: 'flex', gap: 8, overflowX: 'auto' } },
        tags.map(tg =>
          React.createElement('div', {
            key: tg,
            onClick: () => setFilter(tg),
            style: {
              padding: '5px 12px', borderRadius: 20, cursor: 'pointer', flexShrink: 0,
              background: filter === tg ? (tagColors[tg] || t.primary) : t.surface,
              border: `1.5px solid ${filter === tg ? (tagColors[tg] || t.primary) : t.cardBorder}`,
            }
          },
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", color: filter === tg ? '#fff' : t.textSecondary, textTransform: 'capitalize' } }, tg)
          )
        )
      ),
      // Smart splitter banner
      React.createElement('div', {
        onClick: () => setShowSplitter(!showSplitter),
        style: {
          margin: '0 20px 14px', padding: '12px 14px', borderRadius: 14,
          background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}22)`,
          border: `1px solid ${t.primary}44`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 10,
        }
      },
        React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(window.lucide.Wand2, { size: 15, color: '#fff' })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Smart Task Splitter'),
          React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Break vague tasks into concrete steps')
        ),
        React.createElement(showSplitter ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 16, color: t.textSecondary })
      ),
      showSplitter && React.createElement('div', { style: { margin: '-4px 20px 14px', padding: '12px 14px', background: t.surface, borderRadius: 14, border: `1px solid ${t.cardBorder}` } },
        React.createElement('p', { style: { margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Tap any task below to expand it into sub-steps'),
        ['work on presentation', 'prepare for client call', 'clean up codebase'].map((ex, i) =>
          React.createElement('div', { key: i, style: { padding: '7px 10px', marginBottom: 6, background: t.surfaceAlt, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement(window.lucide.ChevronRight, { size: 13, color: t.primary }),
            React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, ex)
          )
        )
      ),
      // Task list
      React.createElement('div', { style: { padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 } },
        filtered.map(task =>
          React.createElement('div', {
            key: task.id,
            style: { background: t.surface, borderRadius: 14, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer' },
              onClick: () => toggleTask(task.id)
            },
              React.createElement('div', {
                style: {
                  width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                  background: task.done ? t.primary : 'transparent',
                  border: `2px solid ${task.done ? t.primary : t.cardBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }
              }, task.done && React.createElement(window.lucide.Check, { size: 12, color: '#fff', strokeWidth: 3 })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 600, color: task.done ? t.textMuted : t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: task.done ? 'line-through' : 'none' } }, task.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 } },
                  React.createElement('div', { style: { padding: '2px 7px', borderRadius: 6, background: (tagColors[task.tag] || t.primary) + '22' } },
                    React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: tagColors[task.tag] || t.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, task.tag)
                  ),
                  React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, `${task.time}m`),
                  task.context === 'laptop' && React.createElement(window.lucide.Laptop, { size: 11, color: t.textMuted }),
                  task.context === 'phone' && React.createElement(window.lucide.Smartphone, { size: 11, color: t.textMuted })
                )
              ),
              subTasks[task.id] && React.createElement('div', {
                onClick: (e) => { e.stopPropagation(); setExpandedTask(expandedTask === task.id ? null : task.id); },
                style: { padding: 6 }
              },
                React.createElement(expandedTask === task.id ? window.lucide.ChevronUp : window.lucide.Scissors, { size: 15, color: t.primary })
              )
            ),
            expandedTask === task.id && subTasks[task.id] && React.createElement('div', { style: { padding: '0 14px 12px', borderTop: `1px solid ${t.cardBorder}` } },
              React.createElement('p', { style: { margin: '8px 0 8px', fontSize: 11, fontWeight: 700, color: t.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Smart-split steps:'),
              subTasks[task.id].map((step, i) =>
                React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < subTasks[task.id].length - 1 ? `1px solid ${t.cardBorder}` : 'none' } },
                  React.createElement('div', { style: { width: 16, height: 16, borderRadius: 5, border: `2px solid ${t.cardBorder}`, flexShrink: 0 } }),
                  React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, step)
                )
              )
            )
          )
        )
      )
    );
  }

  // ── INSIGHTS SCREEN ───────────────────────────────────────────
  function InsightsScreen() {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const completions = [6, 8, 4, 9, 7, 3, 2];
    const max = Math.max(...completions);

    const patterns = [
      { icon: window.lucide.Clock, color: t.accent, title: 'Peak productivity', value: '10–11am', sub: 'You complete 3× more tasks' },
      { icon: window.lucide.MapPin, color: t.primary, title: 'Best location', value: 'Home office', sub: '82% completion rate' },
      { icon: window.lucide.Zap, color: t.warning, title: 'Fastest context', value: 'Phone tasks', sub: 'Avg 4.2 min each' },
    ];

    const predictions = [
      { task: 'Reply to Sarah re: Q2 budget', likelihood: 92, when: 'This morning' },
      { task: 'Outline slides for Thursday', likelihood: 78, when: 'After 10am' },
      { task: 'Schedule dentist appointment', likelihood: 45, when: 'Likely deferred' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg, padding: '16px 0 8px' } },
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h2', { style: { margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Insights'),
        React.createElement('p', { style: { margin: 0, fontSize: 13, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Your productivity patterns')
      ),
      // Weekly chart
      React.createElement('div', { style: { margin: '0 20px 16px', padding: '16px', background: t.surface, borderRadius: 18, border: `1px solid ${t.cardBorder}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Weekly completions'),
          React.createElement('p', { style: { margin: 0, fontSize: 12, color: t.accent, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 } }, '39 this week')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 } },
          days.map((day, i) =>
            React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
              React.createElement('div', {
                style: {
                  width: '100%', height: `${(completions[i] / max) * 64}px`,
                  borderRadius: '4px 4px 2px 2px',
                  background: i === 4 ? t.gradient1 : t.primary + '44',
                  transition: 'height 0.5s',
                }
              }),
              React.createElement('span', { style: { fontSize: 10, color: i === 4 ? t.primary : t.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: i === 4 ? 700 : 500 } }, day)
            )
          )
        )
      ),
      // Pattern cards
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('p', { style: { margin: '0 0 10px', fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Your patterns'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          patterns.map((p, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: t.surface, borderRadius: 14, border: `1px solid ${t.cardBorder}` }
            },
              React.createElement('div', { style: { width: 38, height: 38, borderRadius: 12, background: p.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(p.icon, { size: 18, color: p.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, p.title),
                React.createElement('p', { style: { margin: '1px 0 1px', fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, p.value),
                React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, p.sub)
              )
            )
          )
        )
      ),
      // Predictions
      React.createElement('div', { style: { padding: '0 20px 24px' } },
        React.createElement('p', { style: { margin: '0 0 10px', fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Completion predictions'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          predictions.map((pred, i) =>
            React.createElement('div', { key: i, style: { padding: '12px 14px', background: t.surface, borderRadius: 14, border: `1px solid ${t.cardBorder}` } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('p', { style: { margin: 0, fontSize: 12.5, fontWeight: 600, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", flex: 1, paddingRight: 8 } }, pred.task),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: pred.likelihood > 70 ? t.accent : pred.likelihood > 50 ? t.warning : t.danger, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, `${pred.likelihood}%`)
              ),
              React.createElement('div', { style: { height: 4, borderRadius: 2, background: t.surfaceAlt, overflow: 'hidden', marginBottom: 6 } },
                React.createElement('div', { style: { height: '100%', width: `${pred.likelihood}%`, borderRadius: 2, background: pred.likelihood > 70 ? t.accent : pred.likelihood > 50 ? t.warning : t.danger } })
              ),
              React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, pred.when)
            )
          )
        )
      )
    );
  }

  // ── SETTINGS SCREEN ───────────────────────────────────────────
  function SettingsScreen() {
    const [notifs, setNotifs] = useState(true);
    const [autoSprint, setAutoSprint] = useState(true);
    const [locationAccess, setLocationAccess] = useState(true);
    const [calSync, setCalSync] = useState(false);

    const Toggle = ({ value, onChange }) =>
      React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
          background: value ? t.primary : t.surfaceAlt,
          position: 'relative', transition: 'background 0.2s', flexShrink: 0,
          border: `2px solid ${value ? t.primary : t.cardBorder}`,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 2, left: value ? 18 : 2,
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }
        })
      );

    const SettingRow = ({ icon: Icon, label, sub, value, onChange }) =>
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: `1px solid ${t.cardBorder}` }
      },
        React.createElement('div', { style: { width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(Icon, { size: 17, color: t.primary })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, label),
          sub && React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, sub)
        ),
        React.createElement(Toggle, { value, onChange })
      );

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg, padding: '16px 0 8px' } },
      // Header with theme toggle
      React.createElement('div', { style: { padding: '0 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h2', { style: { margin: 0, fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Settings'),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 40, height: 40, borderRadius: 14,
            background: isDark ? t.surfaceHover : t.surfaceAlt,
            border: `1.5px solid ${t.cardBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        },
          isDark
            ? React.createElement(window.lucide.Sun, { size: 18, color: t.warning })
            : React.createElement(window.lucide.Moon, { size: 18, color: t.primary })
        )
      ),
      // Profile card
      React.createElement('div', { style: { margin: '0 20px 20px', padding: '16px', background: t.surface, borderRadius: 18, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', { style: { width: 52, height: 52, borderRadius: 18, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, '👤'),
        React.createElement('div', null,
          React.createElement('p', { style: { margin: 0, fontSize: 16, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Alex Morgan'),
          React.createElement('p', { style: { margin: 0, fontSize: 12, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'alex@example.com'),
          React.createElement('div', { style: { marginTop: 4, display: 'flex', gap: 6 } },
            React.createElement('div', { style: { padding: '2px 8px', borderRadius: 6, background: t.primaryGlow } },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Pro Plan')
            )
          )
        )
      ),
      // Context settings
      React.createElement('div', { style: { margin: '0 20px 20px' } },
        React.createElement('p', { style: { margin: '0 0 8px', fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Context & Automation'),
        React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: '0 14px', border: `1px solid ${t.cardBorder}` } },
          React.createElement(SettingRow, { icon: window.lucide.MapPin, label: 'Location Access', sub: 'For location-aware sprints', value: locationAccess, onChange: setLocationAccess }),
          React.createElement(SettingRow, { icon: window.lucide.Calendar, label: 'Calendar Sync', sub: 'Detect free time windows', value: calSync, onChange: setCalSync }),
          React.createElement(SettingRow, { icon: window.lucide.Zap, label: 'Auto-Sprint Builder', sub: 'Auto-create sprints from context', value: autoSprint, onChange: setAutoSprint }),
          React.createElement('div', { style: { borderBottom: 'none' } },
            React.createElement(SettingRow, { icon: window.lucide.Bell, label: 'Sprint Notifications', sub: 'Get reminded about gaps', value: notifs, onChange: setNotifs })
          )
        )
      ),
      // Appearance
      React.createElement('div', { style: { margin: '0 20px 20px' } },
        React.createElement('p', { style: { margin: '0 0 8px', fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2 } }, 'Appearance'),
        React.createElement('div', { style: { background: t.surface, borderRadius: 16, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' } },
          React.createElement('div', { style: { padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', { style: { width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                isDark ? React.createElement(window.lucide.Moon, { size: 17, color: t.primary }) : React.createElement(window.lucide.Sun, { size: 17, color: t.warning })
              ),
              React.createElement('div', null,
                React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Theme'),
                React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, isDark ? 'Dark mode active' : 'Light mode active')
              )
            ),
            React.createElement('div', {
              onClick: () => setIsDark(!isDark),
              style: { display: 'flex', background: t.surfaceAlt, borderRadius: 10, overflow: 'hidden', border: `1px solid ${t.cardBorder}` }
            },
              React.createElement('div', {
                onClick: (e) => { e.stopPropagation(); setIsDark(false); },
                style: { padding: '6px 12px', background: !isDark ? t.warning + '22' : 'transparent', display: 'flex', alignItems: 'center', gap: 4 }
              },
                React.createElement(window.lucide.Sun, { size: 13, color: !isDark ? t.warning : t.textMuted })
              ),
              React.createElement('div', {
                onClick: (e) => { e.stopPropagation(); setIsDark(true); },
                style: { padding: '6px 12px', background: isDark ? t.primary + '22' : 'transparent', display: 'flex', alignItems: 'center', gap: 4 }
              },
                React.createElement(window.lucide.Moon, { size: 13, color: isDark ? t.primary : t.textMuted })
              )
            )
          )
        )
      ),
      // App info
      React.createElement('div', { style: { margin: '0 20px 32px', padding: '14px 16px', background: t.surface, borderRadius: 16, border: `1px solid ${t.cardBorder}` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 14, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Zap, { size: 18, color: '#fff', fill: '#fff' })
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'TaskWeave'),
            React.createElement('p', { style: { margin: 0, fontSize: 12, color: t.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Version 1.0.0 • Turn scattered tasks into smooth action')
          )
        )
      )
    );
  }

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#1A1A2E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        borderRadius: 48,
        overflow: 'hidden',
        background: t.bg,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)',
        position: 'relative',
      }
    },
      React.createElement(StatusBar),
      React.createElement(DynamicIsland),
      React.createElement(ActiveScreen),
      React.createElement(BottomNav)
    )
  );
}
