const { useState, useEffect, useRef, useCallback } = React;

const THEME = {
  dark: {
    bg: '#1A1121',
    primary: '#340C48',
    secondary: '#00D0B3',
    cta: '#FF6F00',
    text: '#FFFFFF',
    textSecondary: '#A0A0B8',
    cardBg: '#241832',
    cardBorder: '#3D2456',
    surfaceBg: '#1E1529',
    inputBg: '#2A1D3A',
    success: '#00D0B3',
    warning: '#FF6F00',
    danger: '#FF4757',
    info: '#6C5CE7',
  },
  light: {
    bg: '#F5F3F7',
    primary: '#340C48',
    secondary: '#00D0B3',
    cta: '#FF6F00',
    text: '#1A1121',
    textSecondary: '#6B6B80',
    cardBg: '#FFFFFF',
    cardBorder: '#E0DCE6',
    surfaceBg: '#EDE9F2',
    inputBg: '#FFFFFF',
    success: '#00B89C',
    warning: '#FF6F00',
    danger: '#E84040',
    info: '#5A4BD1',
  }
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [previousScreen, setPreviousScreen] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [scanResults, setScanResults] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const [activeTab, setActiveTab] = useState('home');

  const t = isDark ? THEME.dark : THEME.light;

  const navigateTo = useCallback((screen) => {
    setFadeIn(false);
    setTimeout(() => {
      setPreviousScreen(activeScreen);
      setActiveScreen(screen);
      setActiveTab(screen);
      setFadeIn(true);
    }, 150);
  }, [activeScreen]);

  const startScan = useCallback(() => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResults({
            score: 87,
            issues: 12,
            critical: 2,
            warnings: 5,
            info: 5,
            performance: 92,
            security: 78,
            maintainability: 91,
            findings: [
              { type: 'critical', title: 'SQL Injection Vulnerability', file: 'api/users.js:42', desc: 'Unsanitized user input in database query' },
              { type: 'critical', title: 'Exposed API Key', file: 'config/env.js:8', desc: 'Hardcoded credentials detected in source' },
              { type: 'warning', title: 'Memory Leak Pattern', file: 'hooks/useData.ts:23', desc: 'Missing cleanup in useEffect subscription' },
              { type: 'warning', title: 'N+1 Query Pattern', file: 'services/orders.js:67', desc: 'Database queries inside loop detected' },
              { type: 'warning', title: 'Deprecated API Usage', file: 'utils/crypto.js:15', desc: 'Using deprecated crypto.createCipher' },
              { type: 'info', title: 'Code Duplication', file: 'components/*.tsx', desc: '3 similar code blocks could be refactored' },
              { type: 'info', title: 'Missing Error Boundaries', file: 'App.tsx', desc: 'No error boundaries in component tree' },
            ]
          });
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 100);
  }, []);

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  const StatusBar = () => (
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 20px 4px', fontFamily: FONT, fontSize: 13, fontWeight: 600,
        color: t.text
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
        React.createElement(Icon, { name: 'Signal', size: 14 }),
        React.createElement(Icon, { name: 'Wifi', size: 14 }),
        React.createElement(Icon, { name: 'BatteryFull', size: 18 })
      )
    )
  );

  const TabBar = () => {
    const tabs = [
      { id: 'home', icon: 'Shield', label: 'Home' },
      { id: 'scan', icon: 'ScanLine', label: 'Scan' },
      { id: 'insights', icon: 'BarChart3', label: 'Insights' },
      { id: 'settings', icon: 'Settings', label: 'Settings' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: isDark ? 'rgba(26, 17, 33, 0.95)' : 'rgba(245, 243, 247, 0.95)',
        backdropFilter: 'blur(20px)', borderTop: `1px solid ${t.cardBorder}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        paddingTop: 8, paddingBottom: 28, zIndex: 100
      }
    },
      tabs.map(tab =>
        React.createElement('button', {
          key: tab.id,
          onClick: () => navigateTo(tab.id),
          style: {
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '4px 16px', transition: 'all 0.2s ease',
            transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
          }
        },
          React.createElement('div', {
            style: {
              padding: 4, borderRadius: 8,
              background: activeTab === tab.id ? `${t.secondary}20` : 'transparent',
              transition: 'all 0.3s ease',
            }
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeTab === tab.id ? t.secondary : t.textSecondary
            })
          ),
          React.createElement('span', {
            style: {
              fontFamily: FONT, fontSize: 11, fontWeight: 500,
              color: activeTab === tab.id ? t.secondary : t.textSecondary,
              transition: 'color 0.3s ease'
            }
          }, tab.label)
        )
      )
    );
  };

  const Card = ({ children, style = {}, onClick = null }) => (
    React.createElement('div', {
      onClick,
      style: {
        background: t.cardBg, border: `1px solid ${t.cardBorder}`,
        borderRadius: 4, padding: 16, cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease', ...style
      }
    }, children)
  );

  const Badge = ({ text, color, style = {} }) => (
    React.createElement('span', {
      style: {
        fontFamily: FONT, fontSize: 11, fontWeight: 700,
        color: '#FFFFFF', background: color, padding: '3px 8px',
        borderRadius: 2, textTransform: 'uppercase', letterSpacing: 0.5,
        ...style
      }
    }, text)
  );

  const ProgressBar = ({ value, color = t.secondary, height = 4, style = {} }) => (
    React.createElement('div', {
      style: {
        width: '100%', height, background: `${t.textSecondary}30`,
        borderRadius: 2, overflow: 'hidden', ...style
      }
    },
      React.createElement('div', {
        style: {
          width: `${Math.min(value, 100)}%`, height: '100%',
          background: color, borderRadius: 2,
          transition: 'width 0.3s ease',
          boxShadow: `0 0 8px ${color}60`
        }
      })
    )
  );

  const ScoreRing = ({ score, size = 120, strokeWidth = 8, color = t.secondary }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return React.createElement('div', {
      style: { position: 'relative', width: size, height: size }
    },
      React.createElement('svg', {
        width: size, height: size,
        style: { transform: 'rotate(-90deg)' }
      },
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          fill: 'none', stroke: `${t.textSecondary}20`,
          strokeWidth
        }),
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          fill: 'none', stroke: color, strokeWidth,
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          strokeLinecap: 'square',
          style: { transition: 'stroke-dashoffset 1s ease' }
        })
      ),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center'
        }
      },
        React.createElement('span', {
          style: { fontFamily: FONT, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -1 }
        }, score),
        React.createElement('span', {
          style: { fontFamily: FONT, fontSize: 11, color: t.textSecondary, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }
        }, 'SCORE')
      )
    );
  };

  const PulsingDot = ({ color = t.secondary }) => {
    const [pulse, setPulse] = useState(false);
    useEffect(() => {
      const interval = setInterval(() => setPulse(p => !p), 1500);
      return () => clearInterval(interval);
    }, []);
    return React.createElement('div', {
      style: {
        width: 8, height: 8, borderRadius: 4, background: color,
        boxShadow: pulse ? `0 0 12px ${color}` : `0 0 4px ${color}60`,
        transition: 'box-shadow 0.8s ease'
      }
    });
  };

  // HOME SCREEN
  const HomeScreen = () => {
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
      const h = new Date().getHours();
      setGreeting(h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening');
    }, []);

    const recentProjects = [
      { name: 'E-Commerce API', lang: 'Node.js', score: 92, status: 'clean', lastScan: '2h ago' },
      { name: 'Dashboard UI', lang: 'React/TS', score: 87, status: 'warnings', lastScan: '5h ago' },
      { name: 'Auth Service', lang: 'Go', score: 71, status: 'issues', lastScan: '1d ago' },
    ];

    const quickStats = [
      { label: 'Scans Today', value: '7', icon: 'ScanLine', color: t.secondary },
      { label: 'Issues Fixed', value: '23', icon: 'CheckCircle', color: t.success },
      { label: 'Alerts', value: '3', icon: 'AlertTriangle', color: t.warning },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflow: 'auto', height: '100%' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 12, marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 15, color: t.textSecondary, margin: 0, marginBottom: 4 }
          }, greeting),
          React.createElement('h1', {
            style: { fontFamily: FONT, fontSize: 28, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }
          }, 'AegisCode')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              background: t.cardBg, border: `1px solid ${t.cardBorder}`,
              borderRadius: 4, padding: 8, cursor: 'pointer', display: 'flex'
            }
          },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })
          ),
          React.createElement('button', {
            style: {
              background: t.cardBg, border: `1px solid ${t.cardBorder}`,
              borderRadius: 4, padding: 8, cursor: 'pointer', display: 'flex',
              position: 'relative'
            }
          },
            React.createElement(Icon, { name: 'Bell', size: 18, color: t.textSecondary }),
            notificationCount > 0 && React.createElement('div', {
              style: {
                position: 'absolute', top: -4, right: -4,
                width: 16, height: 16, borderRadius: 8,
                background: t.danger, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT, fontSize: 9, fontWeight: 700, color: '#FFF'
              }
            }, notificationCount)
          )
        )
      ),

      // Quick Action
      React.createElement('button', {
        onClick: () => { navigateTo('scan'); setTimeout(startScan, 300); },
        style: {
          width: '100%', padding: '18px 20px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.primary}CC)`,
          border: `1px solid ${t.secondary}40`,
          borderRadius: 4, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24, position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, right: 0, width: 120, height: 120,
            background: `${t.secondary}08`, borderRadius: '0 0 0 120px'
          }
        }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 } },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 4,
              background: `${t.secondary}20`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${t.secondary}40`
            }
          },
            React.createElement(Icon, { name: 'Zap', size: 22, color: t.secondary })
          ),
          React.createElement('div', { style: { textAlign: 'left' } },
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 17, fontWeight: 700, color: '#FFF', margin: 0 }
            }, 'Quick Scan'),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 13, color: `${t.secondary}CC`, margin: 0, marginTop: 2 }
            }, 'Paste code or upload file')
          )
        ),
        React.createElement(Icon, { name: 'ArrowRight', size: 20, color: t.secondary, style: { zIndex: 1 } })
      ),

      // Stats Row
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 24 }
      },
        quickStats.map((stat, i) =>
          React.createElement(Card, {
            key: i,
            style: { flex: 1, padding: 14, textAlign: 'center' }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', marginBottom: 8 }
            },
              React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })
            ),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 11, color: t.textSecondary, margin: 0, marginTop: 4, letterSpacing: 0.3 }
            }, stat.label)
          )
        )
      ),

      // Recent Projects
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
      },
        React.createElement('h2', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }
        }, 'Recent Projects'),
        React.createElement('button', {
          style: {
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: FONT, fontSize: 13, color: t.secondary, fontWeight: 600
          }
        }, 'View All')
      ),

      recentProjects.map((proj, i) =>
        React.createElement(Card, {
          key: i,
          onClick: () => navigateTo('insights'),
          style: { marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 4,
                background: proj.status === 'clean' ? `${t.success}15` : proj.status === 'warnings' ? `${t.warning}15` : `${t.danger}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${proj.status === 'clean' ? `${t.success}30` : proj.status === 'warnings' ? `${t.warning}30` : `${t.danger}30`}`
              }
            },
              React.createElement(Icon, {
                name: proj.status === 'clean' ? 'ShieldCheck' : proj.status === 'warnings' ? 'AlertTriangle' : 'ShieldAlert',
                size: 18,
                color: proj.status === 'clean' ? t.success : proj.status === 'warnings' ? t.warning : t.danger
              })
            ),
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
              }, proj.name),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 } },
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 12, color: t.textSecondary }
                }, proj.lang),
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 12, color: t.textSecondary }
                }, `• ${proj.lastScan}`)
              )
            )
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('span', {
              style: {
                fontFamily: FONT, fontSize: 22, fontWeight: 800,
                color: proj.score >= 90 ? t.success : proj.score >= 80 ? t.warning : t.danger
              }
            }, proj.score),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 11, color: t.textSecondary, margin: 0 }
            }, '/100')
          )
        )
      ),

      // Feature Highlights
      React.createElement('h2', {
        style: { fontFamily: FONT, fontSize: 17, fontWeight: 700, color: t.text, margin: '24px 0 12px' }
      }, 'AI Capabilities'),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        [
          { icon: 'Brain', title: 'Smart Refactor', desc: 'Context-aware suggestions', color: t.info },
          { icon: 'Eye', title: 'Client Lens', desc: 'Deliverable analysis', color: t.secondary },
          { icon: 'Gauge', title: 'Performance', desc: 'Optimization insights', color: t.cta },
          { icon: 'Lock', title: 'Security', desc: 'Vulnerability scanning', color: t.danger },
        ].map((feat, i) =>
          React.createElement(Card, {
            key: i,
            style: { padding: 14 }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 4,
                background: `${feat.color}15`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${feat.color}30`, marginBottom: 10
              }
            },
              React.createElement(Icon, { name: feat.icon, size: 18, color: feat.color })
            ),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 14, fontWeight: 700, color: t.text, margin: 0 }
            }, feat.title),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 12, color: t.textSecondary, margin: '4px 0 0' }
            }, feat.desc)
          )
        )
      )
    );
  };

  // SCAN SCREEN
  const ScanScreen = () => {
    const [codeInput, setCodeInput] = useState('');
    const languages = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'PHP', 'Java'];

    const sampleCode = `function fetchUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  const result = db.execute(query);
  const apiKey = "sk-1234567890abcdef";
  
  for (let order of result.orders) {
    const details = db.query(
      "SELECT * FROM order_details WHERE id=" + order.id
    );
    order.details = details;
  }
  
  return result;
}`;

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflow: 'auto', height: '100%' }
    },
      React.createElement('h1', {
        style: { fontFamily: FONT, fontSize: 28, fontWeight: 800, color: t.text, margin: '12px 0 4px', letterSpacing: -0.5 }
      }, 'Code Scanner'),
      React.createElement('p', {
        style: { fontFamily: FONT, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' }
      }, 'Analyze your code for issues, vulnerabilities & optimizations'),

      // Language selector
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }
      },
        languages.map(lang =>
          React.createElement('button', {
            key: lang,
            onClick: () => setSelectedLanguage(lang),
            style: {
              padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
              fontFamily: FONT, fontSize: 13, fontWeight: 600,
              whiteSpace: 'nowrap',
              background: selectedLanguage === lang ? `${t.secondary}20` : t.cardBg,
              color: selectedLanguage === lang ? t.secondary : t.textSecondary,
              border: `1px solid ${selectedLanguage === lang ? t.secondary : t.cardBorder}`,
              transition: 'all 0.2s ease'
            }
          }, lang)
        )
      ),

      // Code input area
      React.createElement('div', { style: { position: 'relative', marginBottom: 16 } },
        React.createElement('textarea', {
          value: codeInput,
          onChange: (e) => setCodeInput(e.target.value),
          placeholder: 'Paste your code here...',
          style: {
            width: '100%', height: 200, padding: 16,
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: 12, lineHeight: 1.6,
            background: t.inputBg, color: t.text,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: 4, resize: 'none',
            outline: 'none', boxSizing: 'border-box'
          }
        }),
        React.createElement('button', {
          onClick: () => setCodeInput(sampleCode),
          style: {
            position: 'absolute', top: 8, right: 8,
            padding: '4px 10px', borderRadius: 2,
            background: `${t.secondary}20`, border: `1px solid ${t.secondary}40`,
            fontFamily: FONT, fontSize: 11, color: t.secondary,
            cursor: 'pointer', fontWeight: 600
          }
        }, 'LOAD SAMPLE')
      ),

      // Upload option
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 20 }
      },
        React.createElement(Card, {
          style: {
            flex: 1, padding: 14, display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', borderStyle: 'dashed'
          }
        },
          React.createElement(Icon, { name: 'Upload', size: 18, color: t.textSecondary }),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: t.textSecondary }
          }, 'Upload File')
        ),
        React.createElement(Card, {
          style: {
            flex: 1, padding: 14, display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', borderStyle: 'dashed'
          }
        },
          React.createElement(Icon, { name: 'FolderGit2', size: 18, color: t.textSecondary }),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: t.textSecondary }
          }, 'Git Repo')
        )
      ),

      // Scan button
      React.createElement('button', {
        onClick: startScan,
        disabled: isScanning,
        style: {
          width: '100%', padding: 16, borderRadius: 4,
          background: isScanning ? t.cardBg : t.cta,
          border: isScanning ? `1px solid ${t.cardBorder}` : 'none',
          fontFamily: FONT, fontSize: 17, fontWeight: 700,
          color: isScanning ? t.textSecondary : '#FFFFFF',
          cursor: isScanning ? 'default' : 'pointer',
          marginBottom: 20, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 10,
          transition: 'all 0.3s ease'
        }
      },
        isScanning && React.createElement(Icon, { name: 'Loader2', size: 20, color: t.secondary, style: { animation: 'spin 1s linear infinite' } }),
        isScanning ? 'Analyzing...' : 'Run Full Analysis'
      ),

      // Progress
      isScanning && React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 }
        },
          React.createElement('span', { style: { fontFamily: FONT, fontSize: 13, color: t.textSecondary } },
            scanProgress < 30 ? 'Parsing code structure...' :
            scanProgress < 60 ? 'Analyzing patterns & vulnerabilities...' :
            scanProgress < 90 ? 'Generating recommendations...' : 'Finalizing report...'
          ),
          React.createElement('span', { style: { fontFamily: FONT, fontSize: 13, color: t.secondary, fontWeight: 700 } },
            `${Math.round(scanProgress)}%`
          )
        ),
        React.createElement(ProgressBar, { value: scanProgress, height: 6 })
      ),

      // Results
      scanResults && React.createElement('div', null,
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24, padding: 20
          }
        },
          React.createElement(ScoreRing, {
            score: scanResults.score,
            color: scanResults.score >= 90 ? t.success : scanResults.score >= 75 ? t.warning : t.danger
          })
        ),

        // Metric bars
        React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
          [
            { label: 'Perf', value: scanResults.performance, color: t.success },
            { label: 'Security', value: scanResults.security, color: scanResults.security < 80 ? t.danger : t.success },
            { label: 'Maintain', value: scanResults.maintainability, color: t.info },
          ].map((m, i) =>
            React.createElement(Card, { key: i, style: { flex: 1, padding: 12, textAlign: 'center' } },
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 20, fontWeight: 800, color: m.color, margin: 0 }
              }, m.value),
              React.createElement(ProgressBar, { value: m.value, color: m.color, style: { margin: '8px 0' } }),
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 11, color: t.textSecondary, margin: 0 }
              }, m.label)
            )
          )
        ),

        // Findings
        React.createElement('h3', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 12px' }
        }, `Findings (${scanResults.findings.length})`),

        scanResults.findings.map((finding, i) =>
          React.createElement(Card, {
            key: i,
            onClick: () => navigateTo('insights'),
            style: {
              marginBottom: 8, padding: 14,
              borderLeft: `3px solid ${finding.type === 'critical' ? t.danger : finding.type === 'warning' ? t.warning : t.info}`
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement(Badge, {
                  text: finding.type,
                  color: finding.type === 'critical' ? t.danger : finding.type === 'warning' ? t.warning : t.info
                }),
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: t.text }
                }, finding.title)
              ),
              React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textSecondary })
            ),
            React.createElement('p', {
              style: { fontFamily: "'SF Mono', monospace", fontSize: 11, color: t.secondary, margin: '0 0 4px' }
            }, finding.file),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 13, color: t.textSecondary, margin: 0 }
            }, finding.desc)
          )
        )
      )
    );
  };

  // INSIGHTS SCREEN
  const InsightsScreen = () => {
    const [activeInsightTab, setActiveInsightTab] = useState('overview');

    const weeklyData = [65, 72, 58, 89, 92, 87, 91];
    const maxVal = Math.max(...weeklyData);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const categories = [
      { name: 'Code Smells', count: 15, trend: -3, icon: 'Bug', color: t.warning },
      { name: 'Security', count: 4, trend: -2, icon: 'Shield', color: t.danger },
      { name: 'Performance', count: 8, trend: +1, icon: 'Gauge', color: t.info },
      { name: 'Best Practices', count: 11, trend: -5, icon: 'BookOpen', color: t.secondary },
    ];

    const clientReadiness = [
      { metric: 'Documentation Coverage', score: 82, target: 90 },
      { metric: 'Error Handling', score: 76, target: 85 },
      { metric: 'Test Coverage', score: 68, target: 80 },
      { metric: 'Code Consistency', score: 94, target: 90 },
      { metric: 'API Contract Compliance', score: 88, target: 85 },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflow: 'auto', height: '100%' }
    },
      React.createElement('h1', {
        style: { fontFamily: FONT, fontSize: 28, fontWeight: 800, color: t.text, margin: '12px 0 4px', letterSpacing: -0.5 }
      }, 'Insights'),
      React.createElement('p', {
        style: { fontFamily: FONT, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' }
      }, 'Your code quality analytics & trends'),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 0, marginBottom: 20, background: t.cardBg, borderRadius: 4, border: `1px solid ${t.cardBorder}` }
      },
        ['overview', 'client', 'trends'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveInsightTab(tab),
            style: {
              flex: 1, padding: '10px 0', background: activeInsightTab === tab ? `${t.secondary}20` : 'transparent',
              border: 'none', borderBottom: activeInsightTab === tab ? `2px solid ${t.secondary}` : '2px solid transparent',
              fontFamily: FONT, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              color: activeInsightTab === tab ? t.secondary : t.textSecondary,
              textTransform: 'capitalize', transition: 'all 0.2s ease'
            }
          }, tab)
        )
      ),

      activeInsightTab === 'overview' && React.createElement('div', null,
        // Score Chart
        React.createElement(Card, { style: { marginBottom: 16, padding: 20 } },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
          },
            React.createElement('h3', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, margin: 0 }
            }, 'Weekly Score Trend'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'TrendingUp', size: 16, color: t.success }),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 13, fontWeight: 600, color: t.success }
              }, '+12%')
            )
          ),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, gap: 6 }
          },
            weeklyData.map((val, i) =>
              React.createElement('div', {
                key: i,
                style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }
              },
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 10, color: t.textSecondary, fontWeight: 600 }
                }, val),
                React.createElement('div', {
                  style: {
                    width: '100%', height: `${(val / maxVal) * 90}%`,
                    background: i === 6 ? t.secondary : `${t.secondary}40`,
                    borderRadius: 2, minHeight: 4,
                    transition: 'height 0.5s ease',
                    boxShadow: i === 6 ? `0 0 10px ${t.secondary}40` : 'none'
                  }
                }),
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 10, color: t.textSecondary }
                }, days[i])
              )
            )
          )
        ),

        // Issue Categories
        React.createElement('h3', {
          style: { fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 12px' }
        }, 'Issue Categories'),

        categories.map((cat, i) =>
          React.createElement(Card, {
            key: i,
            style: { marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 4,
                  background: `${cat.color}15`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${cat.color}30`
                }
              },
                React.createElement(Icon, { name: cat.icon, size: 16, color: cat.color })
              ),
              React.createElement('div', null,
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }
                }, cat.name),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 12, color: t.textSecondary, margin: '2px 0 0' }
                }, `${cat.count} issues found`)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, {
                name: cat.trend < 0 ? 'ArrowDown' : 'ArrowUp',
                size: 14,
                color: cat.trend < 0 ? t.success : t.danger
              }),
              React.createElement('span', {
                style: {
                  fontFamily: FONT, fontSize: 13, fontWeight: 600,
                  color: cat.trend < 0 ? t.success : t.danger
                }
              }, Math.abs(cat.trend))
            )
          )
        )
      ),

      activeInsightTab === 'client' && React.createElement('div', null,
        React.createElement(Card, { style: { marginBottom: 16, padding: 20, textAlign: 'center' } },
          React.createElement(ScoreRing, { score: 82, size: 100, strokeWidth: 6, color: t.cta }),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, margin: '12px 0 4px' }
          }, 'Client Readiness Index'),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 13, color: t.textSecondary, margin: 0 }
          }, 'Based on industry standards & best practices')
        ),

        React.createElement('h3', {
          style: { fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 12px' }
        }, 'Deliverable Metrics'),

        clientReadiness.map((item, i) =>
          React.createElement(Card, {
            key: i,
            style: { marginBottom: 8, padding: 14 }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 }
            },
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: t.text }
              }, item.metric),
              React.createElement('span', {
                style: {
                  fontFamily: FONT, fontSize: 14, fontWeight: 700,
                  color: item.score >= item.target ? t.success : t.warning
                }
              }, `${item.score}%`)
            ),
            React.createElement('div', {
              style: { position: 'relative' }
            },
              React.createElement(ProgressBar, {
                value: item.score,
                color: item.score >= item.target ? t.success : t.warning,
                height: 6
              }),
              React.createElement('div', {
                style: {
                  position: 'absolute', left: `${item.target}%`, top: -2,
                  width: 2, height: 10, background: t.text,
                  borderRadius: 1, opacity: 0.5
                }
              })
            ),
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'flex-end', marginTop: 4 }
            },
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 11, color: t.textSecondary }
              }, `Target: ${item.target}%`)
            )
          )
        )
      ),

      activeInsightTab === 'trends' && React.createElement('div', null,
        React.createElement(Card, { style: { marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
            React.createElement(Icon, { name: 'TrendingUp', size: 20, color: t.success }),
            React.createElement('h3', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, margin: 0 }
            }, 'Improvement Over Time')
          ),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 13, color: t.textSecondary, margin: '0 0 16px' }
          }, 'Your code quality has improved 34% in the last 30 days.'),
          [
            { label: '30 days ago', score: 62 },
            { label: '20 days ago', score: 71 },
            { label: '10 days ago', score: 79 },
            { label: 'Today', score: 87 },
          ].map((entry, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }
            },
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 12, color: t.textSecondary, width: 80, flexShrink: 0 }
              }, entry.label),
              React.createElement(ProgressBar, { value: entry.score, height: 8, color: i === 3 ? t.secondary : `${t.secondary}60` }),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 14, fontWeight: 700, color: t.text, width: 30, textAlign: 'right' }
              }, entry.score)
            )
          )
        ),

        React.createElement(Card, { style: { marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
            React.createElement(Icon, { name: 'Code2', size: 20, color: t.info }),
            React.createElement('h3', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, margin: 0 }
            }, 'Language Breakdown')
          ),
          [
            { lang: 'JavaScript/TS', pct: 45, color: '#F7DF1E' },
            { lang: 'Python', pct: 25, color: '#3776AB' },
            { lang: 'Go', pct: 18, color: '#00ADD8' },
            { lang: 'Rust', pct: 12, color: '#DEA584' },
          ].map((l, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }
            },
              React.createElement('div', {
                style: { width: 10, height: 10, borderRadius: 2, background: l.color, flexShrink: 0 }
              }),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 13, color: t.text, width: 100, flexShrink: 0 }
              }, l.lang),
              React.createElement(ProgressBar, { value: l.pct, color: l.color, height: 6 }),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 13, fontWeight: 600, color: t.textSecondary, width: 35, textAlign: 'right' }
              }, `${l.pct}%`)
            )
          )
        )
      )
    );
  };

  // SETTINGS SCREEN
  const SettingsScreen = () => {
    const [autoScan, setAutoScan] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [strictMode, setStrictMode] = useState(false);
    const [scanDepth, setScanDepth] = useState('standard');

    const Toggle = ({ value, onChange }) => (
      React.createElement('button', {
        onClick: () => onChange(!value),
        style: {
          width: 50, height: 28, borderRadius: 14,
          background: value ? t.secondary : `${t.textSecondary}40`,
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background 0.3s ease', padding: 0
        }
      },
        React.createElement('div', {
          style: {
            width: 24, height: 24, borderRadius: 12,
            background: '#FFFFFF', position: 'absolute',
            top: 2, left: value ? 24 : 2,
            transition: 'left 0.3s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }
        })
      )
    );

    const SettingRow = ({ icon, title, subtitle, right }) => (
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 0', borderBottom: `1px solid ${t.cardBorder}`
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 4,
              background: `${t.secondary}10`, display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement(Icon, { name: icon, size: 18, color: t.secondary })
          ),
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
            }, title),
            subtitle && React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 12, color: t.textSecondary, margin: '2px 0 0' }
            }, subtitle)
          )
        ),
        right
      )
    );

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflow: 'auto', height: '100%' }
    },
      React.createElement('h1', {
        style: { fontFamily: FONT, fontSize: 28, fontWeight: 800, color: t.text, margin: '12px 0 4px', letterSpacing: -0.5 }
      }, 'Settings'),
      React.createElement('p', {
        style: { fontFamily: FONT, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' }
      }, 'Configure your AegisCode experience'),

      // Profile Card
      React.createElement(Card, {
        style: { marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }
      },
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: 4,
            background: `linear-gradient(135deg, ${t.secondary}, ${t.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${t.secondary}40`
          }
        },
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 22, fontWeight: 800, color: '#FFF' }
          }, 'JD')
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }
          }, 'Jane Developer'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 } },
            React.createElement(Badge, { text: 'PRO', color: t.cta }),
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 12, color: t.textSecondary }
            }, '142 scans this month')
          )
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textSecondary })
      ),

      // Appearance
      React.createElement('h3', {
        style: { fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.textSecondary, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }
      }, 'Appearance'),
      React.createElement(Card, { style: { marginBottom: 20 } },
        React.createElement(SettingRow, {
          icon: isDark ? 'Moon' : 'Sun',
          title: 'Dark Mode',
          subtitle: isDark ? 'Dark theme active' : 'Light theme active',
          right: React.createElement(Toggle, { value: isDark, onChange: setIsDark })
        })
      ),

      // Analysis Settings
      React.createElement('h3', {
        style: { fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.textSecondary, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }
      }, 'Analysis'),
      React.createElement(Card, { style: { marginBottom: 20 } },
        React.createElement(SettingRow, {
          icon: 'RefreshCw', title: 'Auto-Scan on Paste',
          subtitle: 'Automatically analyze pasted code',
          right: React.createElement(Toggle, { value: autoScan, onChange: setAutoScan })
        }),
        React.createElement(SettingRow, {
          icon: 'ShieldAlert', title: 'Strict Mode',
          subtitle: 'Enforce stricter security rules',
          right: React.createElement(Toggle, { value: strictMode, onChange: setStrictMode })
        }),
        React.createElement(SettingRow, {
          icon: 'Layers', title: 'Scan Depth',
          subtitle: scanDepth === 'standard' ? 'Standard analysis' : 'Deep analysis',
          right: React.createElement('div', { style: { display: 'flex', gap: 4 } },
            ['standard', 'deep'].map(depth =>
              React.createElement('button', {
                key: depth,
                onClick: () => setScanDepth(depth),
                style: {
                  padding: '6px 12px', borderRadius: 2,
                  background: scanDepth === depth ? `${t.secondary}20` : 'transparent',
                  border: `1px solid ${scanDepth === depth ? t.secondary : t.cardBorder}`,
                  fontFamily: FONT, fontSize: 11, fontWeight: 600,
                  color: scanDepth === depth ? t.secondary : t.textSecondary,
                  cursor: 'pointer', textTransform: 'capitalize'
                }
              }, depth)
            )
          )
        }),
        React.createElement(SettingRow, {
          icon: 'Bell', title: 'Notifications',
          subtitle: 'Scan completion alerts',
          right: React.createElement(Toggle, { value: notifications, onChange: setNotifications })
        })
      ),

      // Integrations
      React.createElement('h3', {
        style: { fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.textSecondary, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }
      }, 'Integrations'),
      React.createElement(Card, { style: { marginBottom: 20 } },
        [
          { icon: 'Github', title: 'GitHub', sub: 'Connected', connected: true },
          { icon: 'GitBranch', title: 'GitLab', sub: 'Not connected', connected: false },
          { icon: 'Terminal', title: 'VS Code', sub: 'Extension active', connected: true },
        ].map((int, i) =>
          React.createElement(SettingRow, {
            key: i, icon: int.icon, title: int.title, subtitle: int.sub,
            right: React.createElement(PulsingDot, { color: int.connected ? t.success : t.textSecondary })
          })
        )
      ),

      // Supported Languages
      React.createElement('h3', {
        style: { fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.textSecondary, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }
      }, 'Supported Languages'),
      React.createElement('div', {
        style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }
      },
        ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'PHP', 'Java', 'C#', 'Ruby', 'Swift', 'Kotlin', 'Dart'].map(lang =>
          React.createElement('span', {
            key: lang,
            style: {
              padding: '6px 12px', borderRadius: 2,
              background: t.cardBg, border: `1px solid ${t.cardBorder}`,
              fontFamily: FONT, fontSize: 12, fontWeight: 600, color: t.text
            }
          }, lang)
        )
      ),

      // Footer
      React.createElement('div', { style: { textAlign: 'center', padding: '20px 0' } },
        React.createElement('p', {
          style: { fontFamily: FONT, fontSize: 13, color: t.textSecondary, margin: 0 }
        }, 'AegisCode v2.4.1'),
        React.createElement('p', {
          style: { fontFamily: FONT, fontSize: 11, color: `${t.textSecondary}80`, margin: '4px 0 0' }
        }, 'Your AI Guardian for Perfect Code Delivery')
      )
    );
  };

  const screens = {
    home: HomeScreen,
    scan: ScanScreen,
    insights: InsightsScreen,
    settings: SettingsScreen
  };

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  // CSS animation for spinner
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      ::-webkit-scrollbar { width: 0; height: 0; }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      padding: '20px 0'
    }
  },
    // Phone Frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        borderRadius: 44,
        background: t.bg,
        overflow: 'hidden',
        position: 'relative',
        boxShadow