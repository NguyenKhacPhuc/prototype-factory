const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F3FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FE',
    card: '#FFFFFF',
    cardBorder: '#E9E3FF',
    text: '#1A1033',
    textSecondary: '#6B5FA6',
    textMuted: '#9C8EC4',
    primary: '#7C3AED',
    primaryLight: '#EDE9FE',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    success: '#10B981',
    successLight: '#D1FAE5',
    danger: '#EF4444',
    nav: '#FFFFFF',
    navBorder: '#EDE9FE',
    statusBar: '#7C3AED',
    inputBg: '#F5F3FF',
    shadow: 'rgba(124, 58, 237, 0.12)',
  },
  dark: {
    bg: '#0F0A1E',
    surface: '#1A1033',
    surfaceAlt: '#231644',
    card: '#1E1240',
    cardBorder: '#2D1B5E',
    text: '#F0EBFF',
    textSecondary: '#C4B5FD',
    textMuted: '#7C6AAD',
    primary: '#A855F7',
    primaryLight: '#2D1B5E',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    accent: '#F59E0B',
    accentLight: '#2D1F00',
    success: '#34D399',
    successLight: '#0A2E22',
    danger: '#F87171',
    nav: '#1A1033',
    navBorder: '#2D1B5E',
    statusBar: '#0F0A1E',
    inputBg: '#231644',
    shadow: 'rgba(168, 85, 247, 0.2)',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeKey, setThemeKey] = useState('light');
  const theme = themes[themeKey];
  const toggleTheme = () => setThemeKey(k => k === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:0px;}`;
    document.head.appendChild(style);
  }, []);

  const tabs = [
    { id: 'home', label: 'Today', icon: window.lucide.Zap },
    { id: 'explore', label: 'Explore', icon: window.lucide.Search },
    { id: 'progress', label: 'Progress', icon: window.lucide.BarChart2 },
    { id: 'library', label: 'Library', icon: window.lucide.BookOpen },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    progress: ProgressScreen,
    library: LibraryScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];
  const screenProps = { theme, toggleTheme, themeKey };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#e8e0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: theme.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 8px #1a1a2e',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          background: '#000',
          borderRadius: 20,
          zIndex: 100,
        }
      }),
      // Status bar
      React.createElement('div', {
        style: {
          height: 54,
          background: theme.bg,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingLeft: 28,
          paddingRight: 24,
          paddingBottom: 6,
          flexShrink: 0,
          zIndex: 50,
        }
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: theme.text, letterSpacing: 0.2 } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(window.lucide.Wifi, { size: 14, color: theme.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: theme.text }),
        )
      ),
      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      },
        React.createElement(ActiveScreen, screenProps)
      ),
      // Bottom nav
      React.createElement('div', {
        style: {
          height: 80,
          background: theme.nav,
          borderTop: `1px solid ${theme.navBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 12,
          flexShrink: 0,
        }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: 12,
            transition: 'all 0.2s',
            background: isActive ? theme.primaryLight : 'transparent',
          };
          const labelStyle = {
            fontSize: 10,
            fontWeight: isActive ? 700 : 500,
            color: isActive ? theme.primary : theme.textMuted,
            letterSpacing: 0.3,
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle,
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? theme.primary : theme.textMuted }),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────

function HomeScreen({ theme }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [lessonStep, setLessonStep] = useState(0);

  const upcomingLessons = [
    {
      id: 1,
      time: 'In 45 min',
      title: 'Explaining Charts Clearly',
      context: 'Client demo at 11:00 AM',
      icon: '📊',
      duration: '4 min',
      color: '#7C3AED',
      steps: [
        { title: 'The Golden Rule', content: 'Lead with the insight, not the data. Say "Sales grew 40% after the campaign" before showing the chart — not after.' },
        { title: 'Anticipate Questions', content: 'Common questions: "What caused this spike?" and "How does this compare to last year?" Prepare 2–3 answers before the demo.' },
        { title: 'Keep It Simple', content: 'Remove every element that does not support your key message. Gridlines, extra labels, and legends can distract.' },
        { title: 'Practice Prompt', content: 'Look at your chart right now and say out loud: "The most important thing this shows is…" If you hesitate, simplify.' },
      ]
    },
    {
      id: 2,
      time: 'Tonight, 7 PM',
      title: 'Fractions for Parents',
      context: 'Maya\'s homework session',
      icon: '🍕',
      duration: '3 min',
      color: '#F59E0B',
      steps: [
        { title: 'Use Visual Wholes', content: 'Use pizza slices or folded paper. Show the whole first, then split it. Children grasp fractions physically before symbolically.' },
        { title: 'Same vs Different', content: 'Adding same denominators: just add tops. Different denominators: find a shared whole first. Don\'t rush to rules.' },
        { title: 'Common Mistakes', content: 'Kids often add denominators too (1/2 + 1/3 = 2/5 is wrong). Show why visually with two pieces of paper.' },
        { title: 'Encouragement Script', content: '"Fractions are tricky for everyone at first. Let\'s try it with real objects." Reduce anxiety, increase curiosity.' },
      ]
    },
    {
      id: 3,
      time: 'Tomorrow, 9 AM',
      title: 'Reading a Medical Form',
      context: 'Dr. Kim appointment',
      icon: '🏥',
      duration: '5 min',
      color: '#10B981',
      steps: [
        { title: 'Key Terms to Know', content: '"Chief complaint" = your main reason for visiting. "HPI" = History of Present Illness — a timeline of your symptoms.' },
        { title: 'What to Bring', content: 'List of current medications with dosages, insurance card, photo ID, and dates of any recent tests or procedures.' },
        { title: 'Questions to Ask', content: '"What are my options?" "What happens if I don\'t treat this?" "Are there side effects?" Write these down before you go.' },
        { title: 'After the Visit', content: 'Ask for a printed summary or access to your patient portal. Notes fade fast — document your understanding same day.' },
      ]
    },
  ];

  const dailyStreak = 7;

  if (activeLesson) {
    const lesson = upcomingLessons.find(l => l.id === activeLesson);
    const step = lesson.steps[lessonStep];
    const totalSteps = lesson.steps.length;
    const progress = ((lessonStep + 1) / totalSteps) * 100;

    return React.createElement('div', { style: { padding: '20px 20px 32px', minHeight: '100%', background: theme.bg } },
      // Back button
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, cursor: 'pointer' },
        onClick: () => { setActiveLesson(null); setLessonStep(0); }
      },
        React.createElement(window.lucide.ArrowLeft, { size: 20, color: theme.primary }),
        React.createElement('span', { style: { fontSize: 14, color: theme.primary, fontWeight: 600 } }, 'Back to Today'),
      ),
      // Lesson header
      React.createElement('div', {
        style: {
          background: lesson.color,
          borderRadius: 20,
          padding: '24px 20px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { fontSize: 36, marginBottom: 8 } }, lesson.icon),
        React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 } }, lesson.title),
        React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)' } }, lesson.context),
      ),
      // Progress bar
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
          React.createElement('span', { style: { fontSize: 12, color: theme.textMuted, fontWeight: 600 } }, `Step ${lessonStep + 1} of ${totalSteps}`),
          React.createElement('span', { style: { fontSize: 12, color: theme.primary, fontWeight: 700 } }, `${Math.round(progress)}%`),
        ),
        React.createElement('div', { style: { height: 6, background: theme.surfaceAlt, borderRadius: 3 } },
          React.createElement('div', { style: { height: '100%', width: `${progress}%`, background: lesson.color, borderRadius: 3, transition: 'width 0.4s ease' } })
        )
      ),
      // Step content
      React.createElement('div', {
        style: {
          background: theme.card,
          borderRadius: 20,
          padding: '24px 20px',
          border: `1px solid ${theme.cardBorder}`,
          marginBottom: 20,
          minHeight: 200,
        }
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: lesson.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 } }, `Tip ${lessonStep + 1}`),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 14, lineHeight: 1.3 } }, step.title),
        React.createElement('div', { style: { fontSize: 15, color: theme.textSecondary, lineHeight: 1.7 } }, step.content),
      ),
      // Navigation
      React.createElement('div', { style: { display: 'flex', gap: 12 } },
        lessonStep > 0 && React.createElement('button', {
          onClick: () => setLessonStep(s => s - 1),
          style: {
            flex: 1, padding: '14px 0', borderRadius: 14, border: `2px solid ${lesson.color}`,
            background: 'transparent', color: lesson.color, fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }
        }, 'Previous'),
        React.createElement('button', {
          onClick: () => {
            if (lessonStep < totalSteps - 1) setLessonStep(s => s + 1);
            else { setActiveLesson(null); setLessonStep(0); }
          },
          style: {
            flex: 2, padding: '14px 0', borderRadius: 14, border: 'none',
            background: lesson.color, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }
        }, lessonStep < totalSteps - 1 ? 'Next →' : '✓ Complete'),
      )
    );
  }

  return React.createElement('div', { style: { padding: '0 0 24px' } },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 20px 20px',
        background: theme.primaryGrad,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 2 } }, 'Monday, March 23'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: '#fff' } }, 'Good morning, Alex 👋'),
        ),
        React.createElement('div', {
          style: {
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 14,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }
        },
          React.createElement('span', { style: { fontSize: 16 } }, '🔥'),
          React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: '#fff' } }, `${dailyStreak}`),
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 } }, 'days'),
        )
      ),
      // Smart insight
      React.createElement('div', {
        style: {
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 14,
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }
      },
        React.createElement(window.lucide.Calendar, { size: 16, color: 'rgba(255,255,255,0.9)' }),
        React.createElement('span', { style: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 500 } }, '3 lessons ready for today\'s events'),
      )
    ),
    // Lessons
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 14 } }, 'Coming Up Today'),
      upcomingLessons.map(lesson =>
        React.createElement('div', {
          key: lesson.id,
          onClick: () => setActiveLesson(lesson.id),
          style: {
            background: theme.card,
            borderRadius: 18,
            padding: '16px',
            marginBottom: 12,
            border: `1px solid ${theme.cardBorder}`,
            cursor: 'pointer',
            boxShadow: `0 4px 16px ${theme.shadow}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 14,
                background: lesson.color + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }
            }, lesson.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: theme.text } }, lesson.title),
                React.createElement('div', {
                  style: {
                    fontSize: 11, fontWeight: 700, color: '#fff',
                    background: lesson.color, borderRadius: 8, padding: '3px 8px',
                  }
                }, lesson.duration),
              ),
              React.createElement('div', { style: { fontSize: 12, color: theme.textMuted, marginBottom: 8 } }, lesson.context),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(window.lucide.Clock, { size: 12, color: lesson.color }),
                React.createElement('span', { style: { fontSize: 12, color: lesson.color, fontWeight: 600 } }, lesson.time),
              )
            )
          )
        )
      ),
      // Quick tip
      React.createElement('div', {
        style: {
          background: theme.accentLight,
          borderRadius: 16,
          padding: '14px 16px',
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }
      },
        React.createElement('span', { style: { fontSize: 22 } }, '💡'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 2 } }, 'Did you know?'),
          React.createElement('div', { style: { fontSize: 12, color: theme.textSecondary, lineHeight: 1.5 } }, 'Lessons before an event boost retention by 3×. You\'re set!'),
        )
      )
    )
  );
}

// ─── EXPLORE SCREEN ──────────────────────────────────────────────────────────

function ExploreScreen({ theme }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Work', 'Family', 'Health', 'Finance', 'Tech'];

  const lessons = [
    { title: 'Running Effective 1:1s', category: 'Work', icon: '🤝', duration: '4 min', rating: 4.9 },
    { title: 'Explaining Insurance to Kids', category: 'Family', icon: '🏡', duration: '3 min', rating: 4.7 },
    { title: 'Reading Blood Test Results', category: 'Health', icon: '🩸', duration: '5 min', rating: 4.8 },
    { title: 'Negotiating Salary', category: 'Work', icon: '💼', duration: '6 min', rating: 4.9 },
    { title: 'Understanding a Lease Agreement', category: 'Finance', icon: '📄', duration: '5 min', rating: 4.6 },
    { title: 'Explaining AI to Parents', category: 'Tech', icon: '🤖', duration: '4 min', rating: 4.5 },
    { title: 'Helping with Anxiety Before Tests', category: 'Family', icon: '🧸', duration: '3 min', rating: 4.8 },
    { title: 'Asking for a Raise', category: 'Work', icon: '📈', duration: '4 min', rating: 4.7 },
  ];

  const filtered = lessons.filter(l =>
    (selectedCategory === 'All' || l.category === selectedCategory) &&
    (searchQuery === '' || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return React.createElement('div', { style: { padding: '16px 20px 24px' } },
    React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 16 } }, 'Explore Lessons'),
    // Search
    React.createElement('div', {
      style: {
        background: theme.inputBg,
        borderRadius: 14,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        border: `1px solid ${theme.cardBorder}`,
      }
    },
      React.createElement(window.lucide.Search, { size: 16, color: theme.textMuted }),
      React.createElement('input', {
        placeholder: 'Search lessons...',
        value: searchQuery,
        onChange: e => setSearchQuery(e.target.value),
        style: {
          background: 'none', border: 'none', outline: 'none',
          fontSize: 14, color: theme.text, flex: 1,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }
      })
    ),
    // Categories
    React.createElement('div', {
      style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }
    },
      categories.map(cat =>
        React.createElement('div', {
          key: cat,
          onClick: () => setSelectedCategory(cat),
          style: {
            padding: '7px 14px',
            borderRadius: 20,
            background: selectedCategory === cat ? theme.primary : theme.surfaceAlt,
            color: selectedCategory === cat ? '#fff' : theme.textSecondary,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }
        }, cat)
      )
    ),
    // Lessons grid
    filtered.map((lesson, i) =>
      React.createElement('div', {
        key: i,
        style: {
          background: theme.card,
          borderRadius: 16,
          padding: '14px',
          marginBottom: 10,
          border: `1px solid ${theme.cardBorder}`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          cursor: 'pointer',
        }
      },
        React.createElement('div', {
          style: {
            width: 46, height: 46, borderRadius: 12,
            background: theme.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
          }
        }, lesson.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 4 } }, lesson.title),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('span', { style: { fontSize: 11, color: theme.primary, fontWeight: 600, background: theme.primaryLight, padding: '2px 8px', borderRadius: 6 } }, lesson.category),
            React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, lesson.duration),
            React.createElement('span', { style: { fontSize: 11, color: theme.accent } }, `⭐ ${lesson.rating}`),
          )
        ),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted }),
      )
    )
  );
}

// ─── PROGRESS SCREEN ─────────────────────────────────────────────────────────

function ProgressScreen({ theme }) {
  const situations = [
    { label: 'Client Presentations', mastered: true, lessons: 8, icon: '📊' },
    { label: 'Parent Tutoring', mastered: true, lessons: 5, icon: '📚' },
    { label: 'Medical Appointments', mastered: false, lessons: 3, icon: '🏥' },
    { label: 'Salary Negotiation', mastered: false, lessons: 2, icon: '💼' },
    { label: 'Home Repairs', mastered: false, lessons: 1, icon: '🔧' },
    { label: 'Financial Planning', mastered: false, lessons: 4, icon: '💰' },
  ];

  const weeklyData = [3, 1, 4, 2, 5, 3, 2];
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxVal = Math.max(...weeklyData);

  const stats = [
    { label: 'Lessons Done', value: '23', icon: '📖' },
    { label: 'Day Streak', value: '7', icon: '🔥' },
    { label: 'Min Saved', value: '92', icon: '⏱️' },
    { label: 'Situations', value: '6', icon: '🎯' },
  ];

  return React.createElement('div', { style: { padding: '16px 20px 32px' } },
    React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 20 } }, 'My Progress'),
    // Stats grid
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 } },
      stats.map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: theme.card, borderRadius: 16, padding: '14px',
            border: `1px solid ${theme.cardBorder}`,
          }
        },
          React.createElement('div', { style: { fontSize: 22, marginBottom: 6 } }, s.icon),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.primary, marginBottom: 2 } }, s.value),
          React.createElement('div', { style: { fontSize: 11, color: theme.textMuted, fontWeight: 600 } }, s.label),
        )
      )
    ),
    // Weekly chart
    React.createElement('div', {
      style: {
        background: theme.card, borderRadius: 18, padding: '18px 16px',
        border: `1px solid ${theme.cardBorder}`, marginBottom: 20,
      }
    },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 16 } }, 'This Week'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 8 } },
        weeklyData.map((val, i) =>
          React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
            React.createElement('div', {
              style: {
                width: '100%',
                height: `${(val / maxVal) * 64}px`,
                background: i === 6 ? theme.textMuted + '44' : theme.primaryGrad,
                borderRadius: 6,
                transition: 'height 0.5s ease',
              }
            }),
            React.createElement('span', { style: { fontSize: 10, color: theme.textMuted, fontWeight: 600 } }, weekDays[i]),
          )
        )
      )
    ),
    // Situation mastery
    React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12 } }, 'Situation Mastery Map'),
    situations.map((s, i) =>
      React.createElement('div', {
        key: i,
        style: {
          background: theme.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8,
          border: `1px solid ${theme.cardBorder}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        React.createElement('span', { style: { fontSize: 20 } }, s.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 3 } }, s.label),
          React.createElement('div', { style: { fontSize: 11, color: theme.textMuted } }, `${s.lessons} lessons completed`),
        ),
        s.mastered
          ? React.createElement('div', {
            style: {
              background: theme.successLight, color: theme.success,
              fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
            }
          }, '✓ Mastered')
          : React.createElement('div', {
            style: {
              background: theme.primaryLight, color: theme.primary,
              fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
            }
          }, 'In Progress'),
      )
    )
  );
}

// ─── LIBRARY SCREEN ──────────────────────────────────────────────────────────

function LibraryScreen({ theme }) {
  const [activeFilter, setActiveFilter] = useState('saved');

  const saved = [
    { title: 'Handling Difficult Questions', icon: '🎤', duration: '4 min', offline: true },
    { title: 'Reading a Prescription Label', icon: '💊', duration: '3 min', offline: true },
    { title: 'Explaining a Budget to Family', icon: '💸', duration: '5 min', offline: false },
    { title: 'Science Fair Support Guide', icon: '🔬', duration: '6 min', offline: true },
    { title: 'Job Interview Confidence', icon: '🎯', duration: '5 min', offline: false },
  ];

  const completed = [
    { title: 'Presenting Data Visually', icon: '📊', completedDate: 'Mar 22', score: 95 },
    { title: 'Fraction Basics for Tutors', icon: '✏️', completedDate: 'Mar 21', score: 88 },
    { title: 'Active Listening Techniques', icon: '👂', completedDate: 'Mar 19', score: 91 },
  ];

  const filters = [
    { id: 'saved', label: 'Saved' },
    { id: 'offline', label: 'Offline' },
    { id: 'completed', label: 'Completed' },
  ];

  const displayItems = activeFilter === 'completed' ? completed
    : activeFilter === 'offline' ? saved.filter(s => s.offline)
    : saved;

  return React.createElement('div', { style: { padding: '16px 20px 32px' } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text } }, 'My Library'),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 6,
          background: theme.primaryLight, padding: '6px 12px', borderRadius: 10,
        }
      },
        React.createElement(window.lucide.Download, { size: 14, color: theme.primary }),
        React.createElement('span', { style: { fontSize: 12, color: theme.primary, fontWeight: 700 } }, '3 offline'),
      )
    ),
    // Filters
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
      filters.map(f =>
        React.createElement('div', {
          key: f.id,
          onClick: () => setActiveFilter(f.id),
          style: {
            padding: '8px 16px', borderRadius: 20,
            background: activeFilter === f.id ? theme.primary : theme.surfaceAlt,
            color: activeFilter === f.id ? '#fff' : theme.textSecondary,
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }
        }, f.label)
      )
    ),
    // Items
    displayItems.map((item, i) =>
      React.createElement('div', {
        key: i,
        style: {
          background: theme.card, borderRadius: 16, padding: '14px',
          marginBottom: 10, border: `1px solid ${theme.cardBorder}`,
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
        }
      },
        React.createElement('div', {
          style: {
            width: 46, height: 46, borderRadius: 12,
            background: theme.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
          }
        }, item.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 4 } }, item.title),
          activeFilter === 'completed'
            ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, item.completedDate),
              React.createElement('span', { style: { fontSize: 11, color: theme.success, fontWeight: 700 } }, `${item.score}% score`),
            )
            : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, item.duration),
              item.offline && React.createElement('span', { style: { fontSize: 11, color: theme.success, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(window.lucide.WifiOff, { size: 10 }),
                ' Available offline',
              ),
            ),
        ),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted }),
      )
    )
  );
}

// ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────

function SettingsScreen({ theme, toggleTheme, themeKey }) {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [calendarSync, setCalendarSync] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const Toggle = ({ value, onToggle }) =>
    React.createElement('div', {
      onClick: onToggle,
      style: {
        width: 44, height: 24, borderRadius: 12,
        background: value ? theme.primary : theme.surfaceAlt,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.3s',
        flexShrink: 0,
      }
    },
      React.createElement('div', {
        style: {
          width: 18, height: 18, borderRadius: 9, background: '#fff',
          position: 'absolute', top: 3,
          left: value ? 23 : 3,
          transition: 'left 0.3s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }
      })
    );

  const SettingRow = ({ icon, label, sublabel, right }) =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 0',
        borderBottom: `1px solid ${theme.cardBorder}`,
      }
    },
      React.createElement('div', {
        style: {
          width: 38, height: 38, borderRadius: 10,
          background: theme.primaryLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
        }
      }, icon),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: theme.text } }, label),
        sublabel && React.createElement('div', { style: { fontSize: 11, color: theme.textMuted, marginTop: 1 } }, sublabel),
      ),
      right,
    );

  return React.createElement('div', { style: { padding: '16px 20px 32px' } },
    // Profile
    React.createElement('div', {
      style: {
        background: theme.primaryGrad,
        borderRadius: 20, padding: '20px',
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16,
      }
    },
      React.createElement('div', {
        style: {
          width: 60, height: 60, borderRadius: 18,
          background: 'rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }
      }, '👤'),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: '#fff' } }, 'Alex Morgan'),
        React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 4 } }, 'alex@example.com'),
        React.createElement('div', {
          style: {
            display: 'inline-block', background: 'rgba(255,255,255,0.2)',
            borderRadius: 8, padding: '3px 10px', fontSize: 11, color: '#fff', fontWeight: 700,
          }
        }, '🏅 Pro Learner'),
      )
    ),
    React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 8 } }, 'Appearance'),
    React.createElement('div', {
      style: {
        background: theme.card, borderRadius: 16, padding: '4px 16px',
        border: `1px solid ${theme.cardBorder}`, marginBottom: 20,
      }
    },
      React.createElement(SettingRow, {
        icon: '🌙',
        label: 'Dark Mode',
        sublabel: 'Switch between light and dark themes',
        right: React.createElement(Toggle, { value: themeKey === 'dark', onToggle: toggleTheme }),
      }),
    ),
    React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 8 } }, 'Integrations'),
    React.createElement('div', {
      style: {
        background: theme.card, borderRadius: 16, padding: '4px 16px',
        border: `1px solid ${theme.cardBorder}`, marginBottom: 20,
      }
    },
      React.createElement(SettingRow, {
        icon: '📅',
        label: 'Calendar Sync',
        sublabel: 'Predict lessons from upcoming events',
        right: React.createElement(Toggle, { value: calendarSync, onToggle: () => setCalendarSync(v => !v) }),
      }),
      React.createElement(SettingRow, {
        icon: '🔔',
        label: 'Smart Notifications',
        sublabel: 'Alert before relevant events',
        right: React.createElement(Toggle, { value: notificationsOn, onToggle: () => setNotificationsOn(v => !v) }),
      }),
      React.createElement(SettingRow, {
        icon: '📴',
        label: 'Offline Mode',
        sublabel: 'Auto-download upcoming lessons',
        right: React.createElement(Toggle, { value: offlineMode, onToggle: () => setOfflineMode(v => !v) }),
      }),
    ),
    React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 8 } }, 'Learning Goals'),
    React.createElement('div', {
      style: {
        background: theme.card, borderRadius: 16, padding: '4px 16px',
        border: `1px solid ${theme.cardBorder}`, marginBottom: 20,
      }
    },
      ['Work & Career', 'Family & Parenting', 'Health & Wellness'].map((goal, i) =>
        React.createElement(SettingRow, {
          key: i,
          icon: ['💼', '👨‍👩‍👧', '🍎'][i],
          label: goal,
          right: React.createElement(window.lucide.Check, { size: 18, color: theme.success }),
        })
      )
    ),
    React.createElement('div', {
      style: {
        textAlign: 'center', fontSize: 11, color: theme.textMuted, fontWeight: 600
      }
    }, 'SkillMap Pulse v1.0 · Privacy Policy · Terms'),
  );
}
