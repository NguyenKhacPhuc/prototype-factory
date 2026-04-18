const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#007B87',
  secondary: '#FFC107',
  cta: '#FF6B6B',
  bgDark: '#1A1E26',
  bgDarkSecondary: '#232830',
  bgDarkTertiary: '#2C3240',
  bgLight: '#F5F6F8',
  bgLightSecondary: '#FFFFFF',
  bgLightTertiary: '#E8EAF0',
  textDark: '#FFFFFF',
  textDarkSecondary: '#A0A8B8',
  textLight: '#1A1E26',
  textLightSecondary: '#6B7280',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#EF4444',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [previousScreen, setPreviousScreen] = useState('home');
  const [animating, setAnimating] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const theme = isDark ? {
    bg: COLORS.bgDark,
    bgSecondary: COLORS.bgDarkSecondary,
    bgTertiary: COLORS.bgDarkTertiary,
    text: COLORS.textDark,
    textSecondary: COLORS.textDarkSecondary,
    cardBg: COLORS.bgDarkSecondary,
    cardBorder: 'rgba(255,255,255,0.06)',
    glow: 'rgba(0,123,135,0.15)',
    statusBar: 'light',
  } : {
    bg: COLORS.bgLight,
    bgSecondary: COLORS.bgLightSecondary,
    bgTertiary: COLORS.bgLightTertiary,
    text: COLORS.textLight,
    textSecondary: COLORS.textLightSecondary,
    cardBg: COLORS.bgLightSecondary,
    cardBorder: 'rgba(0,0,0,0.06)',
    glow: 'rgba(0,123,135,0.08)',
    statusBar: 'dark',
  };

  const navigate = (screen) => {
    if (screen === activeScreen) return;
    setPreviousScreen(activeScreen);
    setAnimating(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setTimeout(() => setAnimating(false), 50);
    }, 150);
  };

  const Icon = ({ name, size = 20, color = theme.text, strokeWidth = 1.8 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(LucideIcon, { size, color, strokeWidth });
  };

  // StatusBar
  const StatusBar = () => React.createElement('div', {
    style: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 20px 0', height: 44,
      fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text,
    }
  },
    React.createElement('span', { style: { fontWeight: '700' } }, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
      React.createElement(Icon, { name: 'Signal', size: 16 }),
      React.createElement(Icon, { name: 'Wifi', size: 16 }),
      React.createElement(Icon, { name: 'BatteryFull', size: 20 })
    )
  );

  // Tab Bar
  const TabBar = () => {
    const tabs = [
      { id: 'home', icon: 'Home', label: 'Home' },
      { id: 'review', icon: 'ScanSearch', label: 'Review' },
      { id: 'dashboard', icon: 'BarChart3', label: 'Dashboard' },
      { id: 'settings', icon: 'Settings', label: 'Settings' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: isDark ? 'rgba(26,30,38,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${theme.cardBorder}`,
        display: 'flex', justifyContent: 'space-around',
        padding: '8px 0 28px', zIndex: 100,
      }
    },
      tabs.map(tab => React.createElement('button', {
        key: tab.id,
        onClick: () => navigate(tab.id),
        style: {
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          padding: '4px 12px', transition: 'all 0.2s',
          transform: activeScreen === tab.id ? 'scale(1.05)' : 'scale(1)',
        }
      },
        React.createElement(Icon, {
          name: tab.icon, size: 22,
          color: activeScreen === tab.id ? COLORS.primary : theme.textSecondary
        }),
        React.createElement('span', {
          style: {
            fontFamily: FONT, fontSize: 10, fontWeight: '600',
            color: activeScreen === tab.id ? COLORS.primary : theme.textSecondary,
            transition: 'color 0.2s',
          }
        }, tab.label)
      ))
    );
  };

  // Card component
  const Card = ({ children, style = {}, glow = false, onClick }) => React.createElement('div', {
    onClick,
    style: {
      background: theme.cardBg,
      borderRadius: 16, padding: 16,
      border: `1px solid ${theme.cardBorder}`,
      boxShadow: glow ? `0 0 20px ${theme.glow}, 0 4px 12px rgba(0,0,0,0.15)` : '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }
  }, children);

  // Pulse animation dot
  const PulseDot = ({ color = COLORS.success }) => {
    const [pulse, setPulse] = useState(false);
    useEffect(() => {
      const interval = setInterval(() => setPulse(p => !p), 1500);
      return () => clearInterval(interval);
    }, []);
    return React.createElement('div', {
      style: {
        width: 8, height: 8, borderRadius: '50%', background: color,
        boxShadow: pulse ? `0 0 8px ${color}` : 'none',
        transition: 'box-shadow 0.5s ease',
      }
    });
  };

  // Progress Ring
  const ProgressRing = ({ progress, size = 80, strokeWidth = 6, color = COLORS.primary }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return React.createElement('svg', {
      width: size, height: size,
      style: { transform: 'rotate(-90deg)' }
    },
      React.createElement('circle', {
        cx: size / 2, cy: size / 2, r: radius,
        fill: 'none', stroke: theme.bgTertiary, strokeWidth,
      }),
      React.createElement('circle', {
        cx: size / 2, cy: size / 2, r: radius,
        fill: 'none', stroke: color, strokeWidth,
        strokeDasharray: circumference, strokeDashoffset: offset,
        strokeLinecap: 'round',
        style: { transition: 'stroke-dashoffset 1s ease' },
      })
    );
  };

  // Score Badge
  const ScoreBadge = ({ score, label }) => {
    const getColor = (s) => s >= 80 ? COLORS.success : s >= 60 ? COLORS.warning : COLORS.error;
    return React.createElement('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }
    },
      React.createElement('div', { style: { position: 'relative' } },
        React.createElement(ProgressRing, { progress: score, color: getColor(score) }),
        React.createElement('span', {
          style: {
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotate(0deg)',
            fontFamily: FONT, fontSize: 20, fontWeight: '700', color: theme.text,
          }
        }, score)
      ),
      React.createElement('span', {
        style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary, fontWeight: '600' }
      }, label)
    );
  };

  // HOME SCREEN
  const HomeScreen = () => {
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
      const hour = new Date().getHours();
      setGreeting(hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening');
    }, []);

    const recentProjects = [
      { name: 'PaymentAPI', lang: 'TypeScript', score: 87, issues: 3, icon: 'CreditCard' },
      { name: 'AuthService', lang: 'Python', score: 92, issues: 1, icon: 'Shield' },
      { name: 'DataPipeline', lang: 'Go', score: 74, issues: 8, icon: 'Database' },
    ];

    const quickStats = [
      { label: 'Reviews Today', value: '12', icon: 'ScanSearch', color: COLORS.primary },
      { label: 'Issues Fixed', value: '34', icon: 'CheckCircle', color: COLORS.success },
      { label: 'Avg Score', value: '86', icon: 'TrendingUp', color: COLORS.secondary },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      // Header
      React.createElement('div', { style: { paddingTop: 8, marginBottom: 24 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, marginBottom: 4 }
            }, greeting),
            React.createElement('h1', {
              style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: 0, lineHeight: '34px' }
            }, 'FlowSense AI')
          ),
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 20,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 16px ${COLORS.primary}40`,
            }
          }, React.createElement(Icon, { name: 'User', size: 20, color: '#fff' }))
        )
      ),

      // AI Status
      React.createElement(Card, {
        glow: true,
        style: { marginBottom: 20, background: isDark ? 'linear-gradient(135deg, #1a2a2c, #1e2830)' : 'linear-gradient(135deg, #e8f5f5, #f0f8ff)' }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(PulseDot, {}),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: COLORS.success, fontWeight: '600' }
          }, 'AI Engine Online'),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, marginLeft: 'auto' }
          }, 'v3.2.1')
        ),
        React.createElement('p', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.text, marginTop: 12, marginBottom: 12, lineHeight: '22px' }
        }, 'Ready for intelligent code analysis. Paste code or scan a file to begin.'),
        React.createElement('button', {
          onClick: () => navigate('review'),
          style: {
            width: '100%', padding: '14px', border: 'none', borderRadius: 12,
            background: COLORS.primary, color: '#fff',
            fontFamily: FONT, fontSize: 15, fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: `0 4px 16px ${COLORS.primary}50`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.97)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        },
          React.createElement(Icon, { name: 'Sparkles', size: 18, color: '#fff' }),
          'Start New Review'
        )
      ),

      // Quick Stats
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }
      },
        quickStats.map((stat, i) => React.createElement(Card, {
          key: i, style: { padding: 14, textAlign: 'center' }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, margin: '0 auto 8',
              background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 22, fontWeight: '700', color: theme.text }
          }, stat.value),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary, fontWeight: '500' }
          }, stat.label)
        ))
      ),

      // Recent Projects
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('h2', {
            style: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: theme.text, margin: 0 }
          }, 'Recent Projects'),
          React.createElement('button', {
            onClick: () => navigate('dashboard'),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: FONT, fontSize: 13, color: COLORS.primary, fontWeight: '600',
            }
          }, 'View All')
        ),
        recentProjects.map((project, i) => React.createElement(Card, {
          key: i,
          onClick: () => { setSelectedProject(project); navigate('dashboard'); },
          style: {
            marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14,
            padding: 14,
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              background: `${COLORS.primary}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          }, React.createElement(Icon, { name: project.icon, size: 22, color: COLORS.primary })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text }
            }, project.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 } },
              React.createElement('span', {
                style: {
                  fontFamily: FONT, fontSize: 11, color: COLORS.primary, fontWeight: '600',
                  background: `${COLORS.primary}15`, padding: '2px 8px', borderRadius: 6,
                }
              }, project.lang),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary }
              }, `${project.issues} issues`)
            )
          ),
          React.createElement('div', {
            style: {
              fontFamily: FONT, fontSize: 20, fontWeight: '700',
              color: project.score >= 80 ? COLORS.success : project.score >= 60 ? COLORS.warning : COLORS.error,
            }
          }, project.score)
        ))
      ),

      // Activity Feed
      React.createElement('h2', {
        style: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: theme.text, marginBottom: 14 }
      }, 'Activity'),
      ...[
        { time: '2m ago', text: 'Security scan completed for AuthService', icon: 'ShieldCheck', color: COLORS.success },
        { time: '15m ago', text: 'Refactoring proposal generated', icon: 'GitBranch', color: COLORS.secondary },
        { time: '1h ago', text: 'PEP8 compliance check passed', icon: 'CheckCircle', color: COLORS.primary },
      ].map((item, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 0',
          borderBottom: i < 2 ? `1px solid ${theme.cardBorder}` : 'none',
        }
      },
        React.createElement('div', {
          style: {
            width: 32, height: 32, borderRadius: 8,
            background: `${item.color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        }, React.createElement(Icon, { name: item.icon, size: 16, color: item.color })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.text, margin: 0, lineHeight: '18px' }
          }, item.text),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary, margin: '2px 0 0' }
          }, item.time)
        )
      ))
    );
  };

  // REVIEW SCREEN
  const ReviewScreen = () => {
    const [codeInput, setCodeInput] = useState(
`def process_payment(amount, user_id):
    conn = db.connect()
    query = "SELECT * FROM users WHERE id=" + user_id
    result = conn.execute(query)
    if amount > 0:
        balance = result[0]['balance']
        new_balance = balance - amount
        conn.execute("UPDATE users SET balance=" + str(new_balance))
        conn.close()
        return True
    return False`
    );
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);

    const issues = [
      {
        severity: 'critical', category: 'Security',
        title: 'SQL Injection Vulnerability',
        line: 3, icon: 'ShieldAlert',
        description: 'String concatenation in SQL query allows injection attacks. Use parameterized queries instead.',
        fix: 'query = "SELECT * FROM users WHERE id=?"\nresult = conn.execute(query, (user_id,))',
      },
      {
        severity: 'critical', category: 'Security',
        title: 'Second SQL Injection',
        line: 7, icon: 'ShieldAlert',
        description: 'UPDATE query also vulnerable to SQL injection via string concatenation.',
        fix: 'conn.execute("UPDATE users SET balance=? WHERE id=?", (new_balance, user_id))',
      },
      {
        severity: 'warning', category: 'Reliability',
        title: 'Missing Error Handling',
        line: 5, icon: 'AlertTriangle',
        description: 'No try/except block for database operations. Connection may not close on error.',
        fix: 'Use context manager: with db.connect() as conn:',
      },
      {
        severity: 'warning', category: 'Logic',
        title: 'Missing Balance Check',
        line: 6, icon: 'AlertCircle',
        description: 'No verification that user has sufficient balance before deduction.',
        fix: 'if new_balance >= 0:\n    # proceed with update',
      },
      {
        severity: 'info', category: 'Style',
        title: 'PEP8: Type Hints Missing',
        line: 1, icon: 'Info',
        description: 'Function parameters and return type should have type annotations per PEP8.',
        fix: 'def process_payment(amount: float, user_id: int) -> bool:',
      },
    ];

    const startAnalysis = () => {
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      setShowResults(false);
      const interval = setInterval(() => {
        setAnalysisProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsAnalyzing(false);
              setShowResults(true);
            }, 300);
            return 100;
          }
          return p + Math.random() * 15 + 5;
        });
      }, 200);
    };

    const getSeverityColor = (s) => s === 'critical' ? COLORS.error : s === 'warning' ? COLORS.warning : COLORS.primary;

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', { style: { paddingTop: 8, marginBottom: 20 } },
        React.createElement('h1', {
          style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Code Review'),
        React.createElement('p', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, 'Paste your code for AI analysis')
      ),

      // Language selector
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }
      },
        ['Python', 'TypeScript', 'Go', 'Rust', 'Java'].map((lang, i) => React.createElement('button', {
          key: lang,
          style: {
            padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontFamily: FONT, fontSize: 13, fontWeight: '600',
            background: i === 0 ? COLORS.primary : theme.bgTertiary,
            color: i === 0 ? '#fff' : theme.textSecondary,
            transition: 'all 0.2s',
          }
        }, lang))
      ),

      // Code input
      React.createElement(Card, { style: { marginBottom: 16, padding: 0, overflow: 'hidden' } },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderBottom: `1px solid ${theme.cardBorder}`,
          }
        },
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, fontWeight: '600' }
          }, 'process_payment.py'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement(Icon, { name: 'Copy', size: 16, color: theme.textSecondary }),
            React.createElement(Icon, { name: 'Upload', size: 16, color: theme.textSecondary })
          )
        ),
        React.createElement('textarea', {
          value: codeInput,
          onChange: (e) => setCodeInput(e.target.value),
          style: {
            width: '100%', minHeight: 160, padding: 14, border: 'none', resize: 'vertical',
            fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12,
            background: 'transparent', color: theme.text, lineHeight: '20px',
            boxSizing: 'border-box', outline: 'none',
          }
        })
      ),

      // Analyze button
      React.createElement('button', {
        onClick: startAnalysis,
        disabled: isAnalyzing,
        style: {
          width: '100%', padding: 16, border: 'none', borderRadius: 14,
          background: isAnalyzing ? theme.bgTertiary : COLORS.cta, color: '#fff',
          fontFamily: FONT, fontSize: 17, fontWeight: '700', cursor: isAnalyzing ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginBottom: 20, boxShadow: isAnalyzing ? 'none' : `0 4px 20px ${COLORS.cta}40`,
          transition: 'all 0.3s',
        }
      },
        isAnalyzing ? React.createElement(React.Fragment, null,
          React.createElement('div', {
            style: {
              width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }
          }),
          `Analyzing... ${Math.min(100, Math.round(analysisProgress))}%`
        ) : React.createElement(React.Fragment, null,
          React.createElement(Icon, { name: 'Zap', size: 20, color: '#fff' }),
          'Analyze Code'
        )
      ),

      // Progress bar during analysis
      isAnalyzing && React.createElement('div', {
        style: {
          height: 4, background: theme.bgTertiary, borderRadius: 2,
          marginBottom: 20, overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            height: '100%', width: `${Math.min(100, analysisProgress)}%`,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: 2, transition: 'width 0.3s ease',
          }
        })
      ),

      // Results
      showResults && React.createElement(React.Fragment, null,
        // Score Summary
        React.createElement(Card, {
          glow: true, style: { marginBottom: 20 }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-around', alignItems: 'center' }
          },
            React.createElement(ScoreBadge, { score: 38, label: 'Overall' }),
            React.createElement(ScoreBadge, { score: 15, label: 'Security' }),
            React.createElement(ScoreBadge, { score: 45, label: 'Quality' }),
            React.createElement(ScoreBadge, { score: 60, label: 'Style' })
          )
        ),

        // Issues count
        React.createElement('div', {
          style: { display: 'flex', gap: 10, marginBottom: 16 }
        },
          [
            { label: 'Critical', count: 2, color: COLORS.error },
            { label: 'Warning', count: 2, color: COLORS.warning },
            { label: 'Info', count: 1, color: COLORS.primary },
          ].map((item, i) => React.createElement('div', {
            key: i,
            style: {
              flex: 1, padding: '10px 12px', borderRadius: 10,
              background: `${item.color}12`, border: `1px solid ${item.color}30`,
              textAlign: 'center',
            }
          },
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: item.color }
            }, item.count),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 11, color: item.color, fontWeight: '600' }
            }, item.label)
          ))
        ),

        // Issues list
        React.createElement('h3', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: '700', color: theme.text, marginBottom: 12 }
        }, 'Issues Found'),

        issues.map((issue, i) => React.createElement(Card, {
          key: i,
          onClick: () => setSelectedIssue(selectedIssue === i ? null : i),
          style: {
            marginBottom: 10, padding: 14,
            borderLeft: `3px solid ${getSeverityColor(issue.severity)}`,
            borderRadius: '4px 16px 16px 4px',
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'flex-start', gap: 12 }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: `${getSeverityColor(issue.severity)}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(Icon, { name: issue.icon, size: 16, color: getSeverityColor(issue.severity) })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', {
                  style: {
                    fontFamily: FONT, fontSize: 11, fontWeight: '700', textTransform: 'uppercase',
                    color: getSeverityColor(issue.severity), letterSpacing: 0.5,
                  }
                }, issue.severity),
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary }
                }, `Line ${issue.line}`)
              ),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text, marginTop: 4 }
              }, issue.title),
              React.createElement('span', {
                style: {
                  fontFamily: FONT, fontSize: 11, color: COLORS.primary, fontWeight: '600',
                  background: `${COLORS.primary}15`, padding: '2px 8px', borderRadius: 4,
                  display: 'inline-block', marginTop: 6,
                }
              }, issue.category),

              // Expanded content
              selectedIssue === i && React.createElement('div', {
                style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.cardBorder}` }
              },
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, lineHeight: '20px', margin: '0 0 10px' }
                }, issue.description),
                React.createElement('div', {
                  style: {
                    background: isDark ? '#0d1117' : '#f6f8fa',
                    borderRadius: 8, padding: 10,
                    fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 11,
                    color: COLORS.success, lineHeight: '18px', whiteSpace: 'pre-wrap',
                  }
                }, '✓ Suggested Fix:\n' + issue.fix),
                React.createElement('button', {
                  style: {
                    marginTop: 10, padding: '8px 16px', border: 'none', borderRadius: 8,
                    background: COLORS.primary, color: '#fff',
                    fontFamily: FONT, fontSize: 13, fontWeight: '600', cursor: 'pointer',
                  }
                }, 'Apply Fix')
              )
            )
          )
        ))
      )
    );
  };

  // DASHBOARD SCREEN
  const DashboardScreen = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [animatedValues, setAnimatedValues] = useState({ reviews: 0, score: 0, fixed: 0 });

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedValues({ reviews: 47, score: 86, fixed: 143 });
      }, 300);
      return () => clearTimeout(timer);
    }, []);

    const weeklyData = [
      { day: 'Mon', reviews: 8, score: 82 },
      { day: 'Tue', reviews: 5, score: 85 },
      { day: 'Wed', reviews: 12, score: 79 },
      { day: 'Thu', reviews: 7, score: 88 },
      { day: 'Fri', reviews: 10, score: 91 },
      { day: 'Sat', reviews: 3, score: 87 },
      { day: 'Sun', reviews: 2, score: 90 },
    ];

    const maxReviews = Math.max(...weeklyData.map(d => d.reviews));

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', { style: { paddingTop: 8, marginBottom: 20 } },
        React.createElement('h1', {
          style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Dashboard'),
        React.createElement('p', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, 'Project quality overview')
      ),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex', gap: 4, marginBottom: 20,
          background: theme.bgTertiary, borderRadius: 12, padding: 4,
        }
      },
        ['overview', 'metrics', 'reports'].map(tab => React.createElement('button', {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: {
            flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, cursor: 'pointer',
            fontFamily: FONT, fontSize: 13, fontWeight: '600', textTransform: 'capitalize',
            background: activeTab === tab ? COLORS.primary : 'transparent',
            color: activeTab === tab ? '#fff' : theme.textSecondary,
            transition: 'all 0.3s',
          }
        }, tab))
      ),

      // Hero Stats
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }
      },
        [
          { label: 'Total Reviews', value: animatedValues.reviews, icon: 'FileSearch', color: COLORS.primary },
          { label: 'Avg Score', value: animatedValues.score, icon: 'Target', color: COLORS.success },
          { label: 'Issues Fixed', value: animatedValues.fixed, icon: 'Wrench', color: COLORS.secondary },
        ].map((stat, i) => React.createElement(Card, {
          key: i, glow: true, style: { padding: 14 }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, marginBottom: 10,
              background: `${stat.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })),
          React.createElement('div', {
            style: {
              fontFamily: FONT, fontSize: 24, fontWeight: '700', color: theme.text,
              transition: 'all 0.5s',
            }
          }, stat.value),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary, fontWeight: '500', marginTop: 2 }
          }, stat.label)
        ))
      ),

      // Weekly Chart
      React.createElement(Card, { style: { marginBottom: 20 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
        },
          React.createElement('h3', {
            style: { fontFamily: FONT, fontSize: 17, fontWeight: '700', color: theme.text, margin: 0 }
          }, 'Weekly Activity'),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 4 }
          },
            React.createElement(Icon, { name: 'TrendingUp', size: 14, color: COLORS.success }),
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 13, color: COLORS.success, fontWeight: '600' }
            }, '+12%')
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, gap: 8 }
        },
          weeklyData.map((d, i) => React.createElement('div', {
            key: i,
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }
          },
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 10, color: theme.textSecondary, fontWeight: '600' }
            }, d.reviews),
            React.createElement('div', {
              style: {
                width: '100%', borderRadius: 6, minHeight: 4,
                height: `${(d.reviews / maxReviews) * 80}px`,
                background: i === 4 ? COLORS.primary : `${COLORS.primary}40`,
                transition: 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: i === 4 ? `0 0 10px ${COLORS.primary}50` : 'none',
              }
            }),
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 10, color: theme.textSecondary, fontWeight: '500' }
            }, d.day)
          ))
        )
      ),

      // Quality Breakdown
      React.createElement(Card, { style: { marginBottom: 20 } },
        React.createElement('h3', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: '700', color: theme.text, margin: '0 0 16px' }
        }, 'Quality Breakdown'),
        [
          { label: 'Code Security', value: 78, color: COLORS.error },
          { label: 'Performance', value: 85, color: COLORS.primary },
          { label: 'Maintainability', value: 92, color: COLORS.success },
          { label: 'Style Compliance', value: 88, color: COLORS.secondary },
        ].map((item, i) => React.createElement('div', {
          key: i, style: { marginBottom: i < 3 ? 14 : 0 }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }
          },
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 13, color: theme.text, fontWeight: '500' }
            }, item.label),
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 13, color: item.color, fontWeight: '700' }
            }, `${item.value}%`)
          ),
          React.createElement('div', {
            style: {
              height: 6, background: theme.bgTertiary, borderRadius: 3, overflow: 'hidden',
            }
          },
            React.createElement('div', {
              style: {
                height: '100%', width: `${item.value}%`,
                background: item.color, borderRadius: 3,
                transition: 'width 1s ease',
              }
            })
          )
        ))
      ),

      // Generate Report Button
      React.createElement(Card, {
        onClick: () => {},
        style: {
          display: 'flex', alignItems: 'center', gap: 14, padding: 16,
          background: isDark ? 'linear-gradient(135deg, #1a2a2c, #2c1a28)' : 'linear-gradient(135deg, #e8f5f5, #f5e8f0)',
          cursor: 'pointer',
        }
      },
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12,
            background: `${COLORS.secondary}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'FileText', size: 22, color: COLORS.secondary })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text }
          }, 'Generate Client Report'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, marginTop: 2 }
          }, 'Professional PDF quality report')
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 20, color: theme.textSecondary })
      )
    );
  };

  // SETTINGS SCREEN
  const SettingsScreen = () => {
    const [notifications, setNotifications] = useState(true);
    const [autoAnalyze, setAutoAnalyze] = useState(false);
    const [selectedStandard, setSelectedStandard] = useState('PEP8');

    const Toggle = ({ value, onChange }) => React.createElement('button', {
      onClick: () => onChange(!value),
      style: {
        width: 51, height: 31, borderRadius: 16, border: 'none', cursor: 'pointer',
        background: value ? COLORS.primary : theme.bgTertiary,
        position: 'relative', transition: 'background 0.3s',
        boxShadow: value ? `0 0 12px ${COLORS.primary}40` : 'none',
      }
    },
      React.createElement('div', {
        style: {
          width: 27, height: 27, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 2,
          left: value ? 22 : 2,
          transition: 'left 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }
      })
    );

    const SettingsRow = ({ icon, iconColor, label, sublabel, right, onClick }) => React.createElement('div', {
      onClick,
      style: {
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
        borderBottom: `1px solid ${theme.cardBorder}`,
        cursor: onClick ? 'pointer' : 'default',
      }
    },
      React.createElement('div', {
        style: {
          width: 36, height: 36, borderRadius: 10,
          background: `${iconColor || COLORS.primary}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }
      }, React.createElement(Icon, { name: icon, size: 18, color: iconColor || COLORS.primary })),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.text, fontWeight: '500' }
        }, label),
        sublabel && React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, marginTop: 2 }
        }, sublabel)
      ),
      right || React.createElement(Icon, { name: 'ChevronRight', size: 18, color: theme.textSecondary })
    );

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', { style: { paddingTop: 8, marginBottom: 24 } },
        React.createElement('h1', {
          style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Settings')
      ),

      // Profile Card
      React.createElement(Card, { glow: true, style: { marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: 18,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 16px ${COLORS.primary}40`,
          }
        }, React.createElement(Icon, { name: 'User', size: 28, color: '#fff' })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 17, fontWeight: '700', color: theme.text }
          }, 'Alex Rivera'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
          }, 'Freelance Developer • Pro Plan'),
          React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 6 } },
            React.createElement('span', {
              style: {
                fontFamily: FONT, fontSize: 11, fontWeight: '600',
                background: `${COLORS.secondary}20`, color: COLORS.secondary,
                padding: '2px 8px', borderRadius: 6,
              }
            }, '⭐ 47 Reviews')
          )
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 20, color: theme.textSecondary })
      ),

      // Appearance
      React.createElement('h3', {
        style: {
          fontFamily: FONT, fontSize: 13, fontWeight: '700', color: theme.textSecondary,
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
        }
      }, 'Appearance'),
      React.createElement(Card, { style: { marginBottom: 24, padding: '4px 16px' } },
        React.createElement(SettingsRow, {
          icon: isDark ? 'Moon' : 'Sun',
          iconColor: COLORS.secondary,
          label: 'Dark Mode',
          sublabel: isDark ? 'Enabled' : 'Disabled',
          right: React.createElement(Toggle, { value: isDark, onChange: setIsDark })
        }),
        React.createElement(SettingsRow, {
          icon: 'Bell',
          iconColor: COLORS.cta,
          label: 'Notifications',
          sublabel: 'Review completion alerts',
          right: React.createElement(Toggle, { value: notifications, onChange: setNotifications })
        })
      ),

      // Code Analysis
      React.createElement('h3', {
        style: {
          fontFamily: FONT, fontSize: 13, fontWeight: '700', color: theme.textSecondary,
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
        }
      }, 'Code Analysis'),
      React.createElement(Card, { style: { marginBottom: 24, padding: '4px 16px' } },
        React.createElement(SettingsRow, {
          icon: 'Wand2',
          label: 'Auto-Analyze on Paste',
          sublabel: 'Instant review when code is pasted',
          right: React.createElement(Toggle, { value: autoAnalyze, onChange: setAutoAnalyze })
        }),
        React.createElement(SettingsRow, {
          icon: 'BookOpen',
          label: 'Coding Standard',
          sublabel: selectedStandard,
          right: React.createElement('div', {
            style: {
              display: 'flex', gap: 4, alignItems: 'center',
            }
          },
            React.createElement('span', {
              style: {
                fontFamily: FONT, fontSize: 13, color: COLORS.primary, fontWeight: '600',
                background: `${COLORS.primary}15`, padding: '4px 10px', borderRadius: 6,
              }
            }, selectedStandard),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: theme.textSecondary })
          )
        }),
        React.createElement(SettingsRow, {
          icon: 'Shield',
          iconColor: COLORS.success,
          label: 'Security Scan Level',
          sublabel: 'Strict (OWASP Top 10)',
        }),
        React.createElement(SettingsRow, {
          icon: 'Sliders',
          label: 'Custom Rules',
          sublabel: '3 project rules configured',
        })
      ),

      // Coding Standards Picker
      React.createElement('h3', {
        style: {
          fontFamily: FONT, fontSize: 13, fontWeight: '700', color: theme.textSecondary,
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
        }
      }, 'Quick Standard Switch'),
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }
      },
        ['PEP8', 'Airbnb', 'Google', 'Standard', 'ESLint', 'Custom'].map(std => React.createElement('button', {
          key: std,
          onClick: () => setSelectedStandard(std),
          style: {
            padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
            fontFamily: FONT, fontSize: 13, fontWeight: '600',
            background: selectedStandard === std ? COLORS.primary : theme.bgTertiary,
            color: selectedStandard === std ? '#fff' : theme.textSecondary,
            transition: 'all 0.2s',
            boxShadow: selectedStandard === std ? `0 2px 12px ${COLORS.primary}40` : 'none',
          }
        }, std))
      ),

      // About
      React.createElement('h3', {
        style: {
          fontFamily: FONT, fontSize: 13, fontWeight: '700', color: theme.textSecondary,
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
        }
      }, 'About'),
      React.createElement(Card, { style: { padding: '4px 16px', marginBottom: 20 } },
        React.createElement(SettingsRow, {
          icon: 'HelpCircle',
          label: 'Help & Support',
          sublabel: 'FAQ, tutorials, contact',
        }),
        React.createElement(SettingsRow, {
          icon: 'Star',
          iconColor: COLORS.secondary,
          label: 'Rate FlowSense AI',
          sublabel: 'Love the app? Leave a review!',
        }),
        React.createElement(SettingsRow, {
          icon: 'Info',
          label: 'Version',
          right: React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary }
          }, '3.2.1')
        })
      ),

      // Sign Out
      React.createElement('button', {
        style: {
          width: '100%', padding: 16, border: 'none', borderRadius: 14,
          background: `${COLORS.cta}15`, color: COLORS.cta,
          fontFamily: FONT, fontSize: 15, fontWeight: '600', cursor: 'pointer',
          marginBottom: 20,
        }
      }, 'Sign Out')
    );
  };

  const screens = {
    home: HomeScreen,
    review: ReviewScreen,
    dashboard: DashboardScreen,
    settings: SettingsScreen,
  };

  // Inject keyframes
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      padding: '20px 0',
    }
  },
    // Phone Frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        background: theme.bg,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        transition: 'background 0.4s ease',
      }
    },
      // Notch
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 150, height: 30, borderRadius: '0 0 20px 20px',
          background: '#000', zIndex: 200,
        }
      }),

      // Status Bar
      React.createElement(StatusBar, {}),

      // Screen Content
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 44, left: 0, right: 0, bottom: 0,
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          key: activeScreen,
          style: {
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            animation: 'fadeIn 0.3s ease',
            paddingTop: 8,
          }
        },
          React.createElement(ScreenComponent, {})
        )
      ),

      // Tab Bar
      React.createElement(TabBar, {}),

      // Home Indicator
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 3,
          background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
          zIndex: 200,
        }
      })
    )
  );
}