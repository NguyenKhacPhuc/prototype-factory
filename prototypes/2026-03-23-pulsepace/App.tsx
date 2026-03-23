
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0A0F',
    surface: '#13131A',
    surface2: '#1C1C27',
    surface3: '#252533',
    text: '#FFFFFF',
    textSecondary: '#9090A8',
    textMuted: '#55556A',
    primary: '#6C63FF',
    primaryLight: '#8B84FF',
    primaryDark: '#4A42CC',
    primaryGlow: 'rgba(108,99,255,0.3)',
    accent: '#FF6B6B',
    accentGreen: '#4ECDC4',
    accentOrange: '#FFB347',
    border: '#252533',
    cardBg: '#13131A',
    navBg: '#0D0D15',
    success: '#4ECDC4',
    warning: '#FFB347',
    danger: '#FF6B6B',
  },
  light: {
    bg: '#F0F0F8',
    surface: '#FFFFFF',
    surface2: '#F5F5FF',
    surface3: '#EAEAF8',
    text: '#0A0A1A',
    textSecondary: '#5555AA',
    textMuted: '#9090C0',
    primary: '#6C63FF',
    primaryLight: '#8B84FF',
    primaryDark: '#4A42CC',
    primaryGlow: 'rgba(108,99,255,0.2)',
    accent: '#FF6B6B',
    accentGreen: '#4ECDC4',
    accentOrange: '#FFB347',
    border: '#E0E0F0',
    cardBg: '#FFFFFF',
    navBg: '#FFFFFF',
    success: '#4ECDC4',
    warning: '#FFB347',
    danger: '#FF6B6B',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'analyze', label: 'Analyze', icon: window.lucide.Video },
    { id: 'train', label: 'Train', icon: window.lucide.Zap },
    { id: 'progress', label: 'Progress', icon: window.lucide.TrendingUp },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    analyze: AnalyzeScreen,
    train: TrainScreen,
    progress: ProgressScreen,
    settings: SettingsScreen,
  };

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#1A1A2E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(108,99,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(78,205,196,0.1) 0%, transparent 60%)',
  };

  const phoneStyle = {
    width: '375px',
    height: '812px',
    backgroundColor: theme.bg,
    borderRadius: '50px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
  };

  const statusBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px 0',
    height: '44px',
    flexShrink: 0,
  };

  const dynamicIslandStyle = {
    width: '120px',
    height: '34px',
    backgroundColor: '#000000',
    borderRadius: '20px',
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
  };

  const navStyle = {
    height: '84px',
    backgroundColor: theme.navBg,
    borderTop: `1px solid ${theme.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 8px 16px',
    flexShrink: 0,
  };

  return React.createElement('div', { style: containerStyle },
    React.createElement('style', null, fontLink),
    React.createElement('div', { style: phoneStyle },
      React.createElement('div', { style: dynamicIslandStyle }),
      React.createElement('div', { style: statusBarStyle },
        React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: theme.text } }, '9:41'),
        React.createElement('div', { style: { width: '120px' } }),
        React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: theme.text }),
          React.createElement(window.lucide.Signal, { size: 14, color: theme.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: theme.text }),
        )
      ),
      React.createElement('div', { style: contentStyle },
        React.createElement(screens[activeTab], { theme, isDark, setIsDark })
      ),
      React.createElement('div', { style: navStyle },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '16px',
            transition: 'all 0.2s ease',
            backgroundColor: isActive ? theme.primaryGlow : 'transparent',
            flex: 1,
          };
          const labelStyle = {
            fontSize: '10px',
            fontWeight: isActive ? '700' : '500',
            color: isActive ? theme.primary : theme.textMuted,
            letterSpacing: '0.3px',
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle,
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? theme.primary : theme.textMuted, strokeWidth: isActive ? 2.5 : 1.8 }),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}

function HomeScreen({ theme }) {
  const [pressedCard, setPressedCard] = useState(null);

  const headerStyle = {
    padding: '20px 20px 0',
  };

  const sectionStyle = {
    padding: '20px 20px 0',
  };

  const cardStyle = (id) => ({
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
    transform: pressedCard === id ? 'scale(0.97)' : 'scale(1)',
    transition: 'transform 0.15s ease',
    cursor: 'pointer',
    boxShadow: `0 8px 30px ${theme.primaryGlow}`,
  });

  const surfaceCardStyle = {
    backgroundColor: theme.surface,
    borderRadius: '16px',
    padding: '16px',
    border: `1px solid ${theme.border}`,
  };

  const drillItems = [
    { name: 'First-Touch Turn Drills', time: '8 min', intensity: 'High', sport: 'Soccer', icon: '⚽' },
    { name: 'Lateral Quickness Set', time: '12 min', intensity: 'Medium', sport: 'Basketball', icon: '🏀' },
    { name: 'Defensive Close-out Work', time: '10 min', intensity: 'High', sport: 'Soccer', icon: '⚽' },
  ];

  const insights = [
    { label: 'Late Closeouts', value: '-18%', positive: true, color: theme.accentGreen },
    { label: 'First Touch', value: '+12%', positive: true, color: theme.accentGreen },
    { label: 'Recovery Gap', value: '2.4s avg', positive: false, color: theme.accentOrange },
  ];

  return React.createElement('div', { style: { paddingBottom: '20px' } },
    React.createElement('div', { style: headerStyle },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '13px', color: theme.textSecondary, marginBottom: '2px', fontWeight: '500' } }, 'Good morning,'),
          React.createElement('h1', { style: { fontSize: '26px', fontWeight: '800', color: theme.text, margin: 0, letterSpacing: '-0.5px' } }, 'Marcus 👋'),
        ),
        React.createElement('div', {
          style: {
            width: '42px', height: '42px', borderRadius: '14px',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accentGreen})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement('span', { style: { fontSize: '18px' } }, '⚡')
        )
      ),

      React.createElement('div', {
        style: cardStyle('hero'),
        onMouseDown: () => setPressedCard('hero'),
        onMouseUp: () => setPressedCard(null),
        onTouchStart: () => setPressedCard('hero'),
        onTouchEnd: () => setPressedCard(null),
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' } }, "Today's Focus"),
            React.createElement('h2', { style: { fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0, letterSpacing: '-0.3px' } }, 'First-Touch Turns'),
          ),
          React.createElement('div', { style: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '6px 10px' } },
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: '#fff' } }, '8 min')
          )
        ),
        React.createElement('p', { style: { fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px', lineHeight: '1.5' } },
          'Based on Saturday\'s clip — your turn-under-pressure timing is 0.4s slower vs last month.'
        ),
        React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
          React.createElement('div', { style: { flex: 1, height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px' } },
            React.createElement('div', { style: { width: '35%', height: '100%', backgroundColor: '#fff', borderRadius: '2px' } })
          ),
          React.createElement('span', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: '600' } }, '35% done')
        )
      )
    ),

    React.createElement('div', { style: sectionStyle },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, margin: 0 } }, 'Performance Insights'),
        React.createElement('span', { style: { fontSize: '12px', color: theme.primary, fontWeight: '600' } }, 'From last clip')
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' } },
        insights.map((insight, i) =>
          React.createElement('div', { key: i, style: { ...surfaceCardStyle, textAlign: 'center', padding: '14px 8px' } },
            React.createElement('p', { style: { fontSize: '18px', fontWeight: '800', color: insight.color, margin: '0 0 4px' } }, insight.value),
            React.createElement('p', { style: { fontSize: '10px', color: theme.textSecondary, margin: 0, fontWeight: '500', lineHeight: '1.3' } }, insight.label)
          )
        )
      )
    ),

    React.createElement('div', { style: sectionStyle },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, margin: 0 } }, 'Upcoming Drills'),
        React.createElement('span', { style: { fontSize: '12px', color: theme.primary, fontWeight: '600' } }, 'View all')
      ),
      drillItems.map((drill, i) =>
        React.createElement('div', {
          key: i,
          style: {
            ...surfaceCardStyle,
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '10px',
            transform: pressedCard === `drill-${i}` ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 0.15s ease',
            cursor: 'pointer',
          },
          onMouseDown: () => setPressedCard(`drill-${i}`),
          onMouseUp: () => setPressedCard(null),
          onTouchStart: () => setPressedCard(`drill-${i}`),
          onTouchEnd: () => setPressedCard(null),
        },
          React.createElement('div', {
            style: {
              width: '44px', height: '44px', borderRadius: '14px',
              backgroundColor: theme.surface2, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0,
            }
          }, drill.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '14px', fontWeight: '600', color: theme.text, margin: '0 0 2px' } }, drill.name),
            React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: '12px', color: theme.textSecondary } }, drill.time),
              React.createElement('span', { style: { fontSize: '10px', color: theme.textMuted } }, '•'),
              React.createElement('span', {
                style: {
                  fontSize: '11px', fontWeight: '600',
                  color: drill.intensity === 'High' ? theme.danger : theme.accentOrange,
                  backgroundColor: drill.intensity === 'High' ? `${theme.danger}20` : `${theme.accentOrange}20`,
                  padding: '1px 7px', borderRadius: '6px',
                }
              }, drill.intensity)
            )
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })
        )
      )
    ),

    React.createElement('div', { style: sectionStyle },
      React.createElement('div', { style: { ...surfaceCardStyle, background: `linear-gradient(135deg, ${theme.surface} 0%, ${theme.surface2} 100%)` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
          React.createElement('h3', { style: { fontSize: '14px', fontWeight: '700', color: theme.text, margin: 0 } }, 'Next Game'),
          React.createElement('span', { style: { fontSize: '12px', color: theme.primary, fontWeight: '600' } }, 'Thursday 6PM')
        ),
        React.createElement('p', { style: { fontSize: '13px', color: theme.textSecondary, margin: '0 0 12px' } },
          'Adjusting intensity for pre-game taper. Recovery drills recommended tomorrow.'
        ),
        React.createElement('div', { style: { display: 'flex', gap: '8px' } },
          ['Rest', 'Drills', 'Game'].map((label, i) =>
            React.createElement('div', { key: i, style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  height: '4px', borderRadius: '2px', marginBottom: '4px',
                  backgroundColor: i <= 1 ? theme.primary : theme.surface3,
                }
              }),
              React.createElement('p', { style: { fontSize: '10px', color: theme.textSecondary, margin: 0, textAlign: 'center', fontWeight: '500' } }, label)
            )
          )
        )
      )
    )
  );
}

function AnalyzeScreen({ theme }) {
  const [uploadState, setUploadState] = useState('idle');
  const [analysisStep, setAnalysisStep] = useState(0);

  const handleUpload = () => {
    setUploadState('analyzing');
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);
      if (step >= 4) {
        clearInterval(interval);
        setUploadState('complete');
      }
    }, 900);
  };

  const analysisSteps = [
    { label: 'Detecting movement patterns', icon: '🎯' },
    { label: 'Measuring tempo & timing', icon: '⏱️' },
    { label: 'Spotting fatigue signals', icon: '📊' },
    { label: 'Building drill recommendations', icon: '⚡' },
  ];

  const recentClips = [
    { name: 'Saturday League Match', date: '2 days ago', sport: 'Soccer', insights: 3, duration: '90 min' },
    { name: 'Thursday Scrimmage', date: '5 days ago', sport: 'Soccer', insights: 5, duration: '45 min' },
    { name: 'Pickup Game', date: '1 week ago', sport: 'Basketball', insights: 2, duration: '60 min' },
  ];

  const findings = [
    { issue: 'Late Closeouts', frequency: '8 of 12 defensive plays', severity: 'high', recommendation: 'Focus on first-step reaction drills' },
    { issue: 'Rushed Final Pass', frequency: '5 of 9 chances', severity: 'medium', recommendation: 'Add decision-timing exercises' },
    { issue: 'Post-sub Intensity Drop', frequency: '3 times in 2nd half', severity: 'low', recommendation: 'Re-entry activation routine' },
  ];

  const surfaceCardStyle = {
    backgroundColor: theme.surface,
    borderRadius: '16px',
    padding: '16px',
    border: `1px solid ${theme.border}`,
    marginBottom: '12px',
  };

  return React.createElement('div', { style: { padding: '20px 20px 20px', paddingBottom: '20px' } },
    React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('h1', { style: { fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 4px', letterSpacing: '-0.5px' } }, 'Analyze'),
      React.createElement('p', { style: { fontSize: '14px', color: theme.textSecondary, margin: 0 } }, 'Upload clips to unlock personalized drills')
    ),

    uploadState === 'idle' && React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${theme.surface2} 0%, ${theme.surface} 100%)`,
        borderRadius: '20px',
        padding: '28px',
        textAlign: 'center',
        border: `2px dashed ${theme.primary}40`,
        marginBottom: '20px',
        cursor: 'pointer',
      },
      onClick: handleUpload
    },
      React.createElement('div', { style: { fontSize: '36px', marginBottom: '12px' } }, '🎥'),
      React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 6px' } }, 'Upload Game Clip'),
      React.createElement('p', { style: { fontSize: '13px', color: theme.textSecondary, margin: '0 0 16px', lineHeight: '1.5' } },
        'Tap to upload a match clip or scrimmage. Even 2-3 minutes is enough to detect patterns.'
      ),
      React.createElement('div', {
        style: {
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          backgroundColor: theme.primary, borderRadius: '12px',
          padding: '10px 20px',
        }
      },
        React.createElement(window.lucide.Upload, { size: 16, color: '#fff' }),
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '700', color: '#fff' } }, 'Choose Video')
      )
    ),

    uploadState === 'analyzing' && React.createElement('div', {
      style: {
        ...surfaceCardStyle,
        background: `linear-gradient(135deg, ${theme.surface} 0%, ${theme.surface2} 100%)`,
        marginBottom: '20px',
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' } },
        React.createElement('div', { style: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.primary, animation: 'pulse 1s infinite' } }),
        React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: theme.text, margin: 0 } }, 'Analyzing your clip...')
      ),
      analysisSteps.map((step, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' } },
          React.createElement('span', { style: { fontSize: '16px' } }, i < analysisStep ? '✅' : step.icon),
          React.createElement('span', {
            style: {
              fontSize: '13px',
              color: i < analysisStep ? theme.text : theme.textMuted,
              fontWeight: i < analysisStep ? '600' : '400',
            }
          }, step.label)
        )
      ),
      React.createElement('div', { style: { marginTop: '12px', height: '4px', backgroundColor: theme.surface3, borderRadius: '2px' } },
        React.createElement('div', {
          style: {
            width: `${(analysisStep / 4) * 100}%`,
            height: '100%',
            backgroundColor: theme.primary,
            borderRadius: '2px',
            transition: 'width 0.5s ease',
          }
        })
      )
    ),

    uploadState === 'complete' && React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('div', {
        style: {
          ...surfaceCardStyle,
          background: `linear-gradient(135deg, ${theme.primary}15, ${theme.surface} 60%)`,
          borderColor: `${theme.primary}30`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: theme.text, margin: '0 0 2px' } }, 'Saturday League Match'),
            React.createElement('span', { style: { fontSize: '12px', color: theme.textSecondary } }, '3 key findings identified')
          ),
          React.createElement('span', { style: { fontSize: '22px' } }, '⚽')
        ),
        findings.map((finding, i) =>
          React.createElement('div', {
            key: i,
            style: {
              backgroundColor: theme.surface2,
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '8px',
              borderLeft: `3px solid ${finding.severity === 'high' ? theme.danger : finding.severity === 'medium' ? theme.warning : theme.accentGreen}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
              React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: theme.text } }, finding.issue),
              React.createElement('span', {
                style: {
                  fontSize: '10px', fontWeight: '600',
                  color: finding.severity === 'high' ? theme.danger : finding.severity === 'medium' ? theme.warning : theme.accentGreen,
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                }
              }, finding.severity)
            ),
            React.createElement('p', { style: { fontSize: '11px', color: theme.textSecondary, margin: '0 0 4px' } }, finding.frequency),
            React.createElement('p', { style: { fontSize: '12px', color: theme.primary, margin: 0, fontWeight: '500' } }, `💡 ${finding.recommendation}`)
          )
        )
      )
    ),

    React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 12px' } }, 'Recent Clips'),
    recentClips.map((clip, i) =>
      React.createElement('div', { key: i, style: surfaceCardStyle },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('h4', { style: { fontSize: '14px', fontWeight: '600', color: theme.text, margin: '0 0 4px' } }, clip.name),
            React.createElement('div', { style: { display: 'flex', gap: '8px' } },
              React.createElement('span', { style: { fontSize: '12px', color: theme.textSecondary } }, clip.date),
              React.createElement('span', { style: { fontSize: '12px', color: theme.textMuted } }, '·'),
              React.createElement('span', { style: { fontSize: '12px', color: theme.textSecondary } }, clip.duration),
            )
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { fontSize: '16px', fontWeight: '800', color: theme.primary, margin: '0 0 2px' } }, clip.insights),
            React.createElement('p', { style: { fontSize: '10px', color: theme.textSecondary, margin: 0 } }, 'insights')
          )
        )
      )
    )
  );
}

function TrainScreen({ theme }) {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [completedDrills, setCompletedDrills] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(480);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const workouts = [
    {
      id: 'w1',
      title: 'First-Touch Turn Set',
      duration: '8 min',
      totalSeconds: 480,
      sport: '⚽',
      intensity: 'High',
      drills: [
        { name: 'Dynamic Stretch & Activation', time: '90s', reps: null },
        { name: 'Ball-at-Feet Turn Reps (L)', time: '90s', reps: '15 reps' },
        { name: 'Ball-at-Feet Turn Reps (R)', time: '90s', reps: '15 reps' },
        { name: 'Pressure Receive & Turn', time: '2 min', reps: '8 reps' },
        { name: 'Match-Speed Combo', time: '90s', reps: '6 reps' },
      ]
    },
    {
      id: 'w2',
      title: 'Defensive Reaction Drills',
      duration: '12 min',
      totalSeconds: 720,
      sport: '⚽',
      intensity: 'High',
      drills: [
        { name: 'Lateral Shuffle Warm-Up', time: '2 min', reps: null },
        { name: 'Close-out Sprint (3m)', time: '3 min', reps: '10 reps' },
        { name: 'Mirror Drill', time: '3 min', reps: '8 pairs' },
        { name: 'Recovery Run + Set', time: '4 min', reps: '6 reps' },
      ]
    },
    {
      id: 'w3',
      title: 'Post-Sub Re-Entry Routine',
      duration: '5 min',
      totalSeconds: 300,
      sport: '⚽',
      intensity: 'Low',
      drills: [
        { name: 'Heart Rate Ramp-Up Jog', time: '90s', reps: null },
        { name: 'Dynamic Hip Mobility', time: '60s', reps: null },
        { name: 'Short Sprint Bursts x4', time: '90s', reps: '4 bursts' },
        { name: 'Mental Reset Cue', time: '30s', reps: null },
      ]
    }
  ];

  const surfaceCardStyle = {
    backgroundColor: theme.surface,
    borderRadius: '16px',
    padding: '16px',
    border: `1px solid ${theme.border}`,
    marginBottom: '12px',
  };

  if (activeWorkout) {
    const workout = workouts.find(w => w.id === activeWorkout);
    const progress = (workout.totalSeconds - timeLeft) / workout.totalSeconds;

    return React.createElement('div', { style: { padding: '20px', paddingBottom: '20px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' } },
        React.createElement('div', {
          style: { cursor: 'pointer', display: 'flex', alignItems: 'center' },
          onClick: () => { setActiveWorkout(null); setTimerActive(false); setTimeLeft(480); setCompletedDrills([]); }
        },
          React.createElement(window.lucide.ArrowLeft, { size: 20, color: theme.text })
        ),
        React.createElement('h1', { style: { fontSize: '20px', fontWeight: '800', color: theme.text, margin: 0 } }, workout.title)
      ),

      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
          borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '20px',
          boxShadow: `0 8px 30px ${theme.primaryGlow}`,
        }
      },
        React.createElement('div', { style: { position: 'relative', width: '100px', height: '100px', margin: '0 auto 16px' } },
          React.createElement('svg', { width: '100', height: '100', style: { transform: 'rotate(-90deg)' } },
            React.createElement('circle', { cx: '50', cy: '50', r: '44', fill: 'none', stroke: 'rgba(255,255,255,0.2)', strokeWidth: '6' }),
            React.createElement('circle', {
              cx: '50', cy: '50', r: '44', fill: 'none',
              stroke: '#fff', strokeWidth: '6',
              strokeDasharray: `${2 * Math.PI * 44}`,
              strokeDashoffset: `${2 * Math.PI * 44 * (1 - progress)}`,
              strokeLinecap: 'round',
              style: { transition: 'stroke-dashoffset 1s linear' }
            })
          ),
          React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement('span', { style: { fontSize: '22px', fontWeight: '800', color: '#fff' } }, formatTime(timeLeft))
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: '12px', justifyContent: 'center' } },
          React.createElement('div', {
            style: {
              backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px 20px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
            },
            onClick: () => setTimerActive(t => !t)
          },
            React.createElement(timerActive ? window.lucide.Pause : window.lucide.Play, { size: 18, color: '#fff' }),
            React.createElement('span', { style: { color: '#fff', fontWeight: '700', fontSize: '14px' } }, timerActive ? 'Pause' : 'Start')
          )
        )
      ),

      React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: theme.text, margin: '0 0 12px' } }, 'Drill Sequence'),
      workout.drills.map((drill, i) => {
        const done = completedDrills.includes(i);
        return React.createElement('div', {
          key: i,
          style: {
            ...surfaceCardStyle,
            display: 'flex', alignItems: 'center', gap: '12px',
            opacity: done ? 0.6 : 1,
            cursor: 'pointer',
          },
          onClick: () => setCompletedDrills(prev => done ? prev.filter(d => d !== i) : [...prev, i])
        },
          React.createElement('div', {
            style: {
              width: '28px', height: '28px', borderRadius: '8px',
              backgroundColor: done ? theme.primary : theme.surface2,
              border: `2px solid ${done ? theme.primary : theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          },
            done ? React.createElement(window.lucide.Check, { size: 14, color: '#fff' }) : React.createElement('span', { style: { fontSize: '11px', color: theme.textMuted, fontWeight: '700' } }, i + 1)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '14px', fontWeight: '600', color: theme.text, margin: '0 0 2px', textDecoration: done ? 'line-through' : 'none' } }, drill.name),
            React.createElement('div', { style: { display: 'flex', gap: '8px' } },
              React.createElement('span', { style: { fontSize: '12px', color: theme.textSecondary } }, drill.time),
              drill.reps && React.createElement('span', { style: { fontSize: '12px', color: theme.primary, fontWeight: '600' } }, drill.reps)
            )
          )
        );
      })
    );
  }

  return React.createElement('div', { style: { padding: '20px', paddingBottom: '20px' } },
    React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('h1', { style: { fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 4px', letterSpacing: '-0.5px' } }, 'Train'),
      React.createElement('p', { style: { fontSize: '14px', color: theme.textSecondary, margin: 0 } }, 'Micro-drills built from your game clips')
    ),

    React.createElement('div', {
      style: {
        backgroundColor: theme.surface2,
        borderRadius: '16px',
        padding: '14px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: `1px solid ${theme.accentGreen}30`,
      }
    },
      React.createElement('span', { style: { fontSize: '20px' } }, '📅'),
      React.createElement('div', null,
        React.createElement('p', { style: { fontSize: '13px', fontWeight: '700', color: theme.text, margin: '0 0 2px' } }, 'Game Thursday @ 6PM'),
        React.createElement('p', { style: { fontSize: '12px', color: theme.textSecondary, margin: 0 } }, 'Tapering intensity — focus on quality over volume')
      )
    ),

    workouts.map((workout, i) =>
      React.createElement('div', {
        key: workout.id,
        style: {
          ...surfaceCardStyle,
          cursor: 'pointer',
        },
        onClick: () => { setActiveWorkout(workout.id); setTimeLeft(workout.totalSeconds); }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            React.createElement('span', { style: { fontSize: '24px' } }, workout.sport),
            React.createElement('div', null,
              React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: theme.text, margin: '0 0 2px' } }, workout.title),
              React.createElement('span', { style: { fontSize: '12px', color: theme.textSecondary } }, `${workout.drills.length} drills`)
            )
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { fontSize: '16px', fontWeight: '800', color: theme.primary, margin: '0 0 2px' } }, workout.duration),
            React.createElement('span', {
              style: {
                fontSize: '11px', fontWeight: '600',
                color: workout.intensity === 'High' ? theme.danger : workout.intensity === 'Low' ? theme.accentGreen : theme.warning,
              }
            }, workout.intensity)
          )
        ),
        React.createElement('div', {
          style: {
            backgroundColor: theme.surface2, borderRadius: '10px',
            padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px',
          }
        },
          React.createElement(window.lucide.Play, { size: 14, color: theme.primary }),
          React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: theme.primary } }, 'Start Workout')
        )
      )
    )
  );
}

function ProgressScreen({ theme }) {
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
  const closeoutData = [55, 62, 58, 70, 75, 82];
  const firstTouchData = [48, 55, 60, 63, 68, 74];

  const maxVal = 100;
  const chartH = 100;

  const metrics = [
    { label: 'Late Closeouts Fixed', before: '67%', after: '82%', change: '+15%', positive: true },
    { label: 'First-Touch Accuracy', before: '48%', after: '74%', change: '+26%', positive: true },
    { label: 'Recovery Gap (avg)', before: '3.2s', after: '2.4s', change: '-0.8s', positive: true },
    { label: 'Post-Sub Intensity', before: '61%', after: '69%', change: '+8%', positive: true },
  ];

  const recentSessions = [
    { date: 'Mon Mar 18', name: 'First-Touch Turns', completed: true, improvement: '+4%' },
    { date: 'Sat Mar 16', name: 'Match Clip Uploaded', completed: true, improvement: '3 insights' },
    { date: 'Wed Mar 13', name: 'Defensive Reactions', completed: true, improvement: '+6%' },
    { date: 'Mon Mar 11', name: 'Recovery Routine', completed: false, improvement: null },
  ];

  const surfaceCardStyle = {
    backgroundColor: theme.surface,
    borderRadius: '16px',
    padding: '16px',
    border: `1px solid ${theme.border}`,
    marginBottom: '12px',
  };

  const polylinePoints = (data) => {
    const w = 295;
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = chartH - (v / maxVal) * chartH;
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  return React.createElement('div', { style: { padding: '20px', paddingBottom: '20px' } },
    React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('h1', { style: { fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 4px', letterSpacing: '-0.5px' } }, 'Progress'),
      React.createElement('p', { style: { fontSize: '14px', color: theme.textSecondary, margin: 0 } }, 'Real-game improvement over time')
    ),

    React.createElement('div', { style: { ...surfaceCardStyle, marginBottom: '16px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
        React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: theme.text, margin: 0 } }, 'In-Game Improvement'),
        React.createElement('div', { style: { display: 'flex', gap: '12px', fontSize: '11px' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
            React.createElement('div', { style: { width: '12px', height: '3px', backgroundColor: theme.primary, borderRadius: '2px' } }),
            React.createElement('span', { style: { color: theme.textSecondary } }, 'Closeouts')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
            React.createElement('div', { style: { width: '12px', height: '3px', backgroundColor: theme.accentGreen, borderRadius: '2px' } }),
            React.createElement('span', { style: { color: theme.textSecondary } }, 'First Touch')
          )
        )
      ),
      React.createElement('svg', { width: '100%', viewBox: '0 0 295 110', style: { overflow: 'visible' } },
        React.createElement('defs', null,
          React.createElement('linearGradient', { id: 'grad1', x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
            React.createElement('stop', { offset: '0%', stopColor: theme.primary, stopOpacity: '0.3' }),
            React.createElement('stop', { offset: '100%', stopColor: theme.primary, stopOpacity: '0' })
          ),
          React.createElement('linearGradient', { id: 'grad2', x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
            React.createElement('stop', { offset: '0%', stopColor: theme.accentGreen, stopOpacity: '0.3' }),
            React.createElement('stop', { offset: '100%', stopColor: theme.accentGreen, stopOpacity: '0' })
          )
        ),
        [0, 25, 50, 75, 100].map(v =>
          React.createElement('line', {
            key: v, x1: 0, y1: chartH - (v / maxVal) * chartH,
            x2: 295, y2: chartH - (v / maxVal) * chartH,
            stroke: theme.border, strokeWidth: '1',
          })
        ),
        React.createElement('polyline', { points: polylinePoints(closeoutData), fill: 'none', stroke: theme.primary, strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }),
        React.createElement('polyline', { points: polylinePoints(firstTouchData), fill: 'none', stroke: theme.accentGreen, strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }),
        weeks.map((w, i) =>
          React.createElement('text', {
            key: i,
            x: (i / (weeks.length - 1)) * 295,
            y: 115,
            textAnchor: 'middle',
            fill: theme.textMuted,
            fontSize: '10',
            fontFamily: 'Plus Jakarta Sans',
          }, w)
        )
      )
    ),

    React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 12px' } }, 'Habit Changes'),
    metrics.map((m, i) =>
      React.createElement('div', { key: i, style: { ...surfaceCardStyle, display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: theme.text, margin: '0 0 6px' } }, m.label),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
            React.createElement('span', { style: { fontSize: '12px', color: theme.textMuted } }, m.before),
            React.createElement(window.lucide.ArrowRight, { size: 12, color: theme.primary }),
            React.createElement('span', { style: { fontSize: '12px', color: theme.text, fontWeight: '600' } }, m.after)
          )
        ),
        React.createElement('div', {
          style: {
            backgroundColor: m.positive ? `${theme.accentGreen}20` : `${theme.danger}20`,
            borderRadius: '10px', padding: '6px 10px',
          }
        },
          React.createElement('span', { style: { fontSize: '13px', fontWeight: '800', color: m.positive ? theme.accentGreen : theme.danger } }, m.change)
        )
      )
    ),

    React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, margin: '16px 0 12px' } }, 'Activity Log'),
    recentSessions.map((session, i) =>
      React.createElement('div', { key: i, style: { ...surfaceCardStyle, display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement('div', {
          style: {
            width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
            backgroundColor: session.completed ? `${theme.primary}20` : theme.surface2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          session.completed
            ? React.createElement(window.lucide.Check, { size: 16, color: theme.primary })
            : React.createElement(window.lucide.X, { size: 16, color: theme.textMuted })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: theme.text, margin: '0 0 2px' } }, session.name),
          React.createElement('p', { style: { fontSize: '11px', color: theme.textSecondary, margin: 0 } }, session.date)
        ),
        session.improvement && React.createElement('span', {
          style: { fontSize: '12px', fontWeight: '700', color: theme.accentGreen }
        }, session.improvement)
      )
    )
  );
}

function SettingsScreen({ theme, isDark, setIsDark }) {
  const surfaceCardStyle = {
    backgroundColor: theme.surface,
    borderRadius: '16px',
    padding: '0',
    border: `1px solid ${theme.border}`,
    marginBottom: '12px',
    overflow: 'hidden',
  };

  const rowStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: `1px solid ${theme.border}`,
    cursor: 'pointer',
  };

  const lastRowStyle = { ...rowStyle, borderBottom: 'none' };

  const sports = ['⚽ Soccer', '🏀 Basketball', '🏃 Running', '🎾 Tennis'];
  const notifSettings = [
    { label: 'Pre-Game Warmup Prompts', on: true },
    { label: 'Recovery Reminders', on: true },
    { label: 'Clip Analysis Ready', on: true },
    { label: 'Weekly Progress Report', on: false },
  ];

  return React.createElement('div', { style: { padding: '20px', paddingBottom: '20px' } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' } },
      React.createElement('h1', { style: { fontSize: '26px', fontWeight: '800', color: theme.text, margin: 0, letterSpacing: '-0.5px' } }, 'Settings'),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: theme.surface2, borderRadius: '12px', padding: '8px 14px',
          cursor: 'pointer', border: `1px solid ${theme.border}`,
        },
        onClick: () => setIsDark(d => !d)
      },
        React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 16, color: theme.primary }),
        React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: theme.text } }, isDark ? 'Light Mode' : 'Dark Mode')
      )
    ),

    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
        borderRadius: '20px', padding: '20px', marginBottom: '20px',
        display: 'flex', alignItems: 'center', gap: '16px',
      }
    },
      React.createElement('div', {
        style: {
          width: '56px', height: '56px', borderRadius: '18px',
          backgroundColor: 'rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0,
        }
      }, '⚡'),
      React.createElement('div', null,
        React.createElement('h2', { style: { fontSize: '18px', fontWeight: '800', color: '#fff', margin: '0 0 2px' } }, 'Marcus Chen'),
        React.createElement('p', { style: { fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: '0 0 8px' } }, 'Soccer Midfielder · Intermediate'),
        React.createElement('div', { style: { display: 'flex', gap: '8px' } },
          ['12 Clips', '24 Drills', '8 Habits Fixed'].map((label, i) =>
            React.createElement('div', {
              key: i,
              style: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '3px 8px' }
            },
              React.createElement('span', { style: { fontSize: '11px', fontWeight: '600', color: '#fff' } }, label)
            )
          )
        )
      )
    ),

    React.createElement('h3', { style: { fontSize: '13px', fontWeight: '700', color: theme.textSecondary, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '1px' } }, 'Sports Profile'),
    React.createElement('div', { style: surfaceCardStyle },
      React.createElement('div', { style: rowStyle },
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.text } }, 'Primary Sport'),
        React.createElement('span', { style: { fontSize: '14px', color: theme.primary, fontWeight: '600' } }, '⚽ Soccer')
      ),
      React.createElement('div', { style: rowStyle },
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.text } }, 'Position'),
        React.createElement('span', { style: { fontSize: '14px', color: theme.textSecondary } }, 'Central Midfielder')
      ),
      React.createElement('div', { style: lastRowStyle },
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.text } }, 'Game Frequency'),
        React.createElement('span', { style: { fontSize: '14px', color: theme.textSecondary } }, '1–2x / week')
      )
    ),

    React.createElement('h3', { style: { fontSize: '13px', fontWeight: '700', color: theme.textSecondary, margin: '16px 0 8px', textTransform: 'uppercase', letterSpacing: '1px' } }, 'Notifications'),
    React.createElement('div', { style: surfaceCardStyle },
      notifSettings.map((notif, i) =>
        React.createElement('div', { key: i, style: i < notifSettings.length - 1 ? rowStyle : lastRowStyle },
          React.createElement('span', { style: { fontSize: '14px', fontWeight: '500', color: theme.text } }, notif.label),
          React.createElement('div', {
            style: {
              width: '44px', height: '24px', borderRadius: '12px',
              backgroundColor: notif.on ? theme.primary : theme.surface3,
              display: 'flex', alignItems: 'center',
              padding: '2px',
              justifyContent: notif.on ? 'flex-end' : 'flex-start',
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { width: '20px', height: '20px', borderRadius: '10px', backgroundColor: '#fff' } })
          )
        )
      )
    ),

    React.createElement('h3', { style: { fontSize: '13px', fontWeight: '700', color: theme.textSecondary, margin: '16px 0 8px', textTransform: 'uppercase', letterSpacing: '1px' } }, 'Calendar & Schedule'),
    React.createElement('div', { style: surfaceCardStyle },
      React.createElement('div', { style: rowStyle },
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.text } }, 'Connect Calendar'),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })
      ),
      React.createElement('div', { style: rowStyle },
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.text } }, 'Sleep Tracking'),
        React.createElement('span', { style: { fontSize: '13px', color: theme.accentGreen, fontWeight: '600' } }, 'Connected')
      ),
      React.createElement('div', { style: lastRowStyle },
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.text } }, 'Soreness Check-ins'),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })
      )
    ),

    React.createElement('div', {
      style: {
        ...surfaceCardStyle,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '14px', gap: '8px', cursor: 'pointer',
      }
    },
      React.createElement(window.lucide.LogOut, { size: 16, color: theme.danger }),
      React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.danger } }, 'Sign Out')
    )
  );
}
