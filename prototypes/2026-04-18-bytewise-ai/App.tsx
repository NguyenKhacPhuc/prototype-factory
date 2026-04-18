const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#5A2C8A',
  secondary: '#C7EBEE',
  cta: '#3CFF84',
  background: '#0E0E1E',
  surface: '#1A1A2E',
  surfaceLight: '#252540',
  text: '#FFFFFF',
  textSecondary: '#A0A0C0',
  textMuted: '#6B6B8A',
  border: '#2A2A45',
  danger: '#FF4A6B',
  warning: '#FFB84A',
  info: '#4A9AFF',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const icons = {
  Home: () => React.createElement(window.lucide?.Home || 'span', { size: 22, strokeWidth: 1.8 }),
  Code: () => React.createElement(window.lucide?.Code || 'span', { size: 22, strokeWidth: 1.8 }),
  Shield: () => React.createElement(window.lucide?.Shield || 'span', { size: 22, strokeWidth: 1.8 }),
  FileText: () => React.createElement(window.lucide?.FileText || 'span', { size: 22, strokeWidth: 1.8 }),
  Settings: () => React.createElement(window.lucide?.Settings || 'span', { size: 22, strokeWidth: 1.8 }),
  ChevronRight: () => React.createElement(window.lucide?.ChevronRight || 'span', { size: 18, strokeWidth: 2 }),
  Upload: () => React.createElement(window.lucide?.Upload || 'span', { size: 24, strokeWidth: 1.8 }),
  GitBranch: () => React.createElement(window.lucide?.GitBranch || 'span', { size: 20, strokeWidth: 1.8 }),
  AlertTriangle: () => React.createElement(window.lucide?.AlertTriangle || 'span', { size: 18, strokeWidth: 1.8 }),
  CheckCircle: () => React.createElement(window.lucide?.CheckCircle || 'span', { size: 18, strokeWidth: 1.8 }),
  XCircle: () => React.createElement(window.lucide?.XCircle || 'span', { size: 18, strokeWidth: 1.8 }),
  Zap: () => React.createElement(window.lucide?.Zap || 'span', { size: 20, strokeWidth: 1.8 }),
  Lock: () => React.createElement(window.lucide?.Lock || 'span', { size: 20, strokeWidth: 1.8 }),
  Eye: () => React.createElement(window.lucide?.Eye || 'span', { size: 20, strokeWidth: 1.8 }),
  TrendingUp: () => React.createElement(window.lucide?.TrendingUp || 'span', { size: 20, strokeWidth: 1.8 }),
  Star: () => React.createElement(window.lucide?.Star || 'span', { size: 16, strokeWidth: 1.8 }),
  Download: () => React.createElement(window.lucide?.Download || 'span', { size: 20, strokeWidth: 1.8 }),
  Share2: () => React.createElement(window.lucide?.Share2 || 'span', { size: 20, strokeWidth: 1.8 }),
  ArrowLeft: () => React.createElement(window.lucide?.ArrowLeft || 'span', { size: 22, strokeWidth: 1.8 }),
  Moon: () => React.createElement(window.lucide?.Moon || 'span', { size: 20, strokeWidth: 1.8 }),
  Sun: () => React.createElement(window.lucide?.Sun || 'span', { size: 20, strokeWidth: 1.8 }),
  Copy: () => React.createElement(window.lucide?.Copy || 'span', { size: 16, strokeWidth: 1.8 }),
  Sparkles: () => React.createElement(window.lucide?.Sparkles || 'span', { size: 20, strokeWidth: 1.8 }),
  Activity: () => React.createElement(window.lucide?.Activity || 'span', { size: 20, strokeWidth: 1.8 }),
  BarChart3: () => React.createElement(window.lucide?.BarChart3 || 'span', { size: 20, strokeWidth: 1.8 }),
  Clock: () => React.createElement(window.lucide?.Clock || 'span', { size: 16, strokeWidth: 1.8 }),
  Layers: () => React.createElement(window.lucide?.Layers || 'span', { size: 20, strokeWidth: 1.8 }),
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('left');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [pressedTab, setPressedTab] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const theme = isDark ? {
    bg: COLORS.background,
    surface: COLORS.surface,
    surfaceLight: COLORS.surfaceLight,
    text: COLORS.text,
    textSecondary: COLORS.textSecondary,
    textMuted: COLORS.textMuted,
    border: COLORS.border,
  } : {
    bg: '#F5F5FA',
    surface: '#FFFFFF',
    surfaceLight: '#F0F0F8',
    text: '#1A1A2E',
    textSecondary: '#6B6B8A',
    textMuted: '#A0A0B0',
    border: '#E0E0F0',
  };

  const navigateTo = (screen) => {
    if (screen === activeScreen) return;
    setSlideDirection('left');
    setAnimating(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setAnimating(false);
    }, 150);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            navigateTo('analysis');
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const StatusBar = () => React.createElement('div', {
    style: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 20px 0', height: 44, fontFamily: FONT, fontSize: 15,
      fontWeight: 600, color: theme.text,
    }
  },
    React.createElement('span', null, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
      React.createElement('div', { style: { width: 16, height: 10, border: `1.5px solid ${theme.text}`, borderRadius: 2, position: 'relative' } },
        React.createElement('div', { style: { position: 'absolute', right: -4, top: 2.5, width: 2, height: 5, background: theme.text, borderRadius: '0 1px 1px 0' } }),
        React.createElement('div', { style: { width: '75%', height: '100%', background: COLORS.cta, borderRadius: 0.5 } })
      )
    )
  );

  const TabBar = () => {
    const tabs = [
      { id: 'home', icon: 'Home', label: 'Home' },
      { id: 'analyze', icon: 'Code', label: 'Analyze' },
      { id: 'reports', icon: 'FileText', label: 'Reports' },
      { id: 'settings', icon: 'Settings', label: 'Settings' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 84,
        background: isDark ? 'rgba(14,14,30,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)', borderTop: `0.5px solid ${theme.border}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
        paddingTop: 8, zIndex: 100,
      }
    }, tabs.map(tab => {
      const isActive = activeScreen === tab.id || (activeScreen === 'analysis' && tab.id === 'analyze');
      return React.createElement('div', {
        key: tab.id,
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          cursor: 'pointer', padding: '4px 16px',
          transform: pressedTab === tab.id ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.1s ease',
        },
        onMouseDown: () => setPressedTab(tab.id),
        onMouseUp: () => { setPressedTab(null); navigateTo(tab.id); },
        onMouseLeave: () => setPressedTab(null),
      },
        React.createElement('div', {
          style: { color: isActive ? COLORS.cta : theme.textMuted, transition: 'color 0.2s ease' }
        }, React.createElement(icons[tab.icon])),
        React.createElement('span', {
          style: {
            fontFamily: FONT, fontSize: 10, fontWeight: 500,
            color: isActive ? COLORS.cta : theme.textMuted,
            transition: 'color 0.2s ease',
          }
        }, tab.label)
      );
    }));
  };

  const GlowOrb = ({ top, left, color, size }) => React.createElement('div', {
    style: {
      position: 'absolute', top, left, width: size || 200, height: size || 200,
      borderRadius: '50%', background: color || COLORS.primary,
      opacity: 0.08, filter: 'blur(60px)', pointerEvents: 'none',
    }
  });

  const ScoreRing = ({ score, size = 120, strokeWidth = 8, label }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const color = score >= 80 ? COLORS.cta : score >= 60 ? COLORS.warning : COLORS.danger;

    return React.createElement('div', {
      style: { position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }
    },
      React.createElement('svg', { width: size, height: size, style: { transform: 'rotate(-90deg)', position: 'absolute' } },
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          fill: 'none', stroke: theme.border, strokeWidth,
        }),
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          fill: 'none', stroke: color, strokeWidth,
          strokeDasharray: circumference,
          strokeDashoffset: circumference - progress,
          strokeLinecap: 'round',
          style: { transition: 'stroke-dashoffset 1s ease, stroke 0.3s ease', filter: `drop-shadow(0 0 6px ${color}40)` },
        })
      ),
      React.createElement('div', { style: { textAlign: 'center', zIndex: 1 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: size > 80 ? 34 : 22, fontWeight: 700, color: theme.text, lineHeight: 1 }
        }, Math.round(score)),
        label && React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary, marginTop: 2 }
        }, label)
      )
    );
  };

  const HomeScreen = () => {
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
      const hour = new Date().getHours();
      setGreeting(hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening');
    }, []);

    const recentScans = [
      { name: 'auth-service.ts', score: 87, issues: 3, time: '2h ago', lang: 'TypeScript' },
      { name: 'api-router.py', score: 72, issues: 8, time: '5h ago', lang: 'Python' },
      { name: 'payment.jsx', score: 94, issues: 1, time: '1d ago', lang: 'React' },
    ];

    const quickStats = [
      { icon: 'Shield', label: 'Security', value: '94%', color: COLORS.cta },
      { icon: 'Zap', label: 'Performance', value: '87%', color: COLORS.warning },
      { icon: 'Eye', label: 'Readability', value: '91%', color: COLORS.info },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement(GlowOrb, { top: -50, left: -50, color: COLORS.primary }),
      React.createElement(GlowOrb, { top: 100, left: 200, color: COLORS.cta, size: 150 }),

      React.createElement('div', { style: { paddingTop: 10, marginBottom: 24 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, marginBottom: 4 }
        }, greeting),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 34, fontWeight: 700, color: theme.text, letterSpacing: -0.5 }
        }, 'ByteWise AI'),
        React.createElement('div', {
          style: {
            fontFamily: FONT, fontSize: 13, color: COLORS.cta, marginTop: 4,
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement(icons.Sparkles),
          'Your AI code companion'
        )
      ),

      // Overall Score Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.primary}30, ${theme.surface})`,
          borderRadius: 20, padding: 24, marginBottom: 20,
          border: `1px solid ${COLORS.primary}40`,
          display: 'flex', alignItems: 'center', gap: 20,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: '50%', background: COLORS.cta, opacity: 0.05, filter: 'blur(30px)',
          }
        }),
        React.createElement(ScoreRing, { score: 88, size: 100, strokeWidth: 7, label: 'Overall' }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 17, fontWeight: 600, color: theme.text, marginBottom: 8 }
          }, 'Code Health Score'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, lineHeight: 1.5 }
          }, 'Based on 12 recent scans across 4 projects. Your code quality is improving!'),
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 4, marginTop: 8,
              color: COLORS.cta, fontFamily: FONT, fontSize: 13, fontWeight: 500,
            }
          },
            React.createElement(icons.TrendingUp),
            '+5% this week'
          )
        )
      ),

      // Quick Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 24 }
      }, quickStats.map((stat, i) => React.createElement('div', {
        key: i,
        style: {
          flex: 1, background: theme.surface, borderRadius: 16, padding: '16px 12px',
          border: `1px solid ${theme.border}`, textAlign: 'center',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
          transform: hoveredCard === `stat-${i}` ? 'translateY(-2px)' : 'none',
          borderColor: hoveredCard === `stat-${i}` ? stat.color + '60' : theme.border,
          cursor: 'pointer',
        },
        onMouseEnter: () => setHoveredCard(`stat-${i}`),
        onMouseLeave: () => setHoveredCard(null),
      },
        React.createElement('div', { style: { color: stat.color, marginBottom: 8, display: 'flex', justifyContent: 'center' } },
          React.createElement(icons[stat.icon])
        ),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 22, fontWeight: 700, color: theme.text }
        }, stat.value),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary, marginTop: 2 }
        }, stat.label)
      ))),

      // Quick Action
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.cta}CC)`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', transition: 'transform 0.15s ease',
          boxShadow: `0 4px 20px ${COLORS.cta}30`,
        },
        onClick: () => navigateTo('analyze'),
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(icons.Upload),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 17, fontWeight: 600, color: COLORS.background }
            }, 'Analyze New Code'),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 13, color: COLORS.background + 'AA' }
            }, 'Upload or paste your code')
          )
        ),
        React.createElement('div', { style: { color: COLORS.background } },
          React.createElement(icons.ChevronRight)
        )
      ),

      // Recent Scans
      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 14 }
      }, 'Recent Scans'),

      ...recentScans.map((scan, i) => React.createElement('div', {
        key: i,
        style: {
          background: theme.surface, borderRadius: 14, padding: '16px 18px',
          marginBottom: 10, border: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', transition: 'all 0.2s ease',
          transform: hoveredCard === `scan-${i}` ? 'translateX(4px)' : 'none',
        },
        onMouseEnter: () => setHoveredCard(`scan-${i}`),
        onMouseLeave: () => setHoveredCard(null),
        onClick: () => navigateTo('analysis'),
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          React.createElement(ScoreRing, { score: scan.score, size: 44, strokeWidth: 3 }),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: 600, color: theme.text }
            }, scan.name),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }
            },
              React.createElement('span', {
                style: {
                  background: COLORS.primary + '30', color: COLORS.secondary,
                  padding: '1px 8px', borderRadius: 6, fontSize: 11,
                }
              }, scan.lang),
              React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(icons.Clock),
                scan.time
              )
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          scan.issues > 0 && React.createElement('span', {
            style: {
              background: scan.issues > 5 ? COLORS.danger + '20' : COLORS.warning + '20',
              color: scan.issues > 5 ? COLORS.danger : COLORS.warning,
              padding: '3px 10px', borderRadius: 10, fontFamily: FONT, fontSize: 12, fontWeight: 600,
            }
          }, `${scan.issues} issues`),
          React.createElement('div', { style: { color: theme.textMuted } },
            React.createElement(icons.ChevronRight)
          )
        )
      ))
    );
  };

  const AnalyzeScreen = () => {
    const [codeInput, setCodeInput] = useState(`function fetchUserData(id) {
  var data = fetch('/api/users/' + id)
  eval(data.response)
  return data
}`);
    const [selectedLang, setSelectedLang] = useState('JavaScript');
    const languages = ['JavaScript', 'TypeScript', 'Python', 'React', 'Go'];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement(GlowOrb, { top: -30, left: 100, color: COLORS.primary }),

      React.createElement('div', { style: { paddingTop: 10, marginBottom: 20 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 34, fontWeight: 700, color: theme.text, letterSpacing: -0.5 }
        }, 'Analyze'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, 'Paste code or connect a repository')
      ),

      // Language Selector
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }
      }, languages.map(lang => React.createElement('div', {
        key: lang,
        style: {
          padding: '8px 16px', borderRadius: 20, fontFamily: FONT, fontSize: 13, fontWeight: 500,
          background: selectedLang === lang ? COLORS.primary : theme.surface,
          color: selectedLang === lang ? '#fff' : theme.textSecondary,
          border: `1px solid ${selectedLang === lang ? COLORS.primary : theme.border}`,
          cursor: 'pointer', transition: 'all 0.2s ease',
        },
        onClick: () => setSelectedLang(lang),
      }, lang))),

      // Code Input
      React.createElement('div', {
        style: {
          background: theme.surface, borderRadius: 16, padding: 4,
          border: `1px solid ${theme.border}`, marginBottom: 16,
          position: 'relative',
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 14px 6px', borderBottom: `1px solid ${theme.border}`,
          }
        },
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textMuted }
          }, 'Code Input'),
          React.createElement('div', {
            style: { color: theme.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 },
          },
            React.createElement(icons.Copy),
            React.createElement('span', { style: { fontFamily: FONT, fontSize: 11 } }, 'Paste')
          )
        ),
        React.createElement('textarea', {
          value: codeInput,
          onChange: (e) => setCodeInput(e.target.value),
          style: {
            width: '100%', minHeight: 180, background: 'transparent', border: 'none',
            color: COLORS.cta, fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: 13, lineHeight: 1.6, padding: '12px 14px', resize: 'none',
            outline: 'none', boxSizing: 'border-box',
          },
          placeholder: 'Paste your code here...',
        })
      ),

      // Connect Git
      React.createElement('div', {
        style: {
          background: theme.surface, borderRadius: 14, padding: '16px 18px',
          border: `1px dashed ${theme.border}`, marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          transition: 'border-color 0.2s ease',
        },
      },
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12, background: COLORS.primary + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.primary,
          }
        }, React.createElement(icons.GitBranch)),
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 15, fontWeight: 600, color: theme.text }
          }, 'Connect Git Repository'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
          }, 'GitHub, GitLab, Bitbucket')
        ),
        React.createElement('div', { style: { marginLeft: 'auto', color: theme.textMuted } },
          React.createElement(icons.ChevronRight)
        )
      ),

      // Review Options
      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 17, fontWeight: 600, color: theme.text, marginBottom: 12 }
      }, 'Review Dimensions'),

      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }
      }, [
        { icon: 'Shield', label: 'Security', desc: 'Vulnerability scan', active: true },
        { icon: 'Zap', label: 'Performance', desc: 'Bottleneck detection', active: true },
        { icon: 'Eye', label: 'Readability', desc: 'Clean code standards', active: true },
        { icon: 'Layers', label: 'Architecture', desc: 'Pattern analysis', active: false },
      ].map((dim, i) => React.createElement('div', {
        key: i,
        style: {
          background: dim.active ? COLORS.primary + '15' : theme.surface,
          borderRadius: 14, padding: '14px 14px',
          border: `1px solid ${dim.active ? COLORS.primary + '50' : theme.border}`,
          cursor: 'pointer', transition: 'all 0.2s ease',
        },
      },
        React.createElement('div', {
          style: { color: dim.active ? COLORS.cta : theme.textMuted, marginBottom: 8 }
        }, React.createElement(icons[dim.icon])),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: theme.text }
        }, dim.label),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary }
        }, dim.desc)
      ))),

      // Analyze Button
      isAnalyzing ? React.createElement('div', {
        style: {
          background: theme.surface, borderRadius: 16, padding: '24px 20px',
          border: `1px solid ${COLORS.primary}40`, textAlign: 'center',
        }
      },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: 600, color: theme.text, marginBottom: 12 }
        }, 'Analyzing Code...'),
        React.createElement('div', {
          style: {
            height: 6, background: theme.surfaceLight, borderRadius: 3,
            overflow: 'hidden', marginBottom: 8,
          }
        },
          React.createElement('div', {
            style: {
              height: '100%', width: `${Math.min(analysisProgress, 100)}%`,
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.cta})`,
              borderRadius: 3, transition: 'width 0.3s ease',
              boxShadow: `0 0 10px ${COLORS.cta}40`,
            }
          })
        ),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
        }, `${Math.min(Math.round(analysisProgress), 100)}% — Scanning for vulnerabilities...`)
      ) : React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.cta}CC)`,
          borderRadius: 16, padding: '18px 24px', textAlign: 'center',
          cursor: 'pointer', fontFamily: FONT, fontSize: 17, fontWeight: 600,
          color: COLORS.background, boxShadow: `0 4px 20px ${COLORS.cta}30`,
          transition: 'transform 0.15s ease',
        },
        onClick: startAnalysis,
      }, '✨ Start AI Analysis')
    );
  };

  const AnalysisScreen = () => {
    const issues = [
      {
        severity: 'critical', title: 'Use of eval() detected',
        file: 'line 3', description: 'eval() is a dangerous function that executes arbitrary code. This creates a severe code injection vulnerability.',
        suggestion: '// Replace eval with JSON.parse\nconst parsed = JSON.parse(data.response);',
        category: 'Security',
      },
      {
        severity: 'warning', title: 'Using var instead of const/let',
        file: 'line 2', description: 'var has function-scoped behavior which can lead to unexpected bugs. Use const for immutable references and let for mutable ones.',
        suggestion: 'const data = await fetch(...)',
        category: 'Best Practice',
      },
      {
        severity: 'warning', title: 'Missing async/await',
        file: 'line 2', description: 'fetch() returns a Promise. Without await, the variable holds a Promise object, not the response.',
        suggestion: 'const data = await fetch(`/api/users/${id}`);',
        category: 'Bug Risk',
      },
      {
        severity: 'info', title: 'String concatenation for URL',
        file: 'line 2', description: 'Template literals are more readable and less error-prone for string interpolation.',
        suggestion: "const url = `/api/users/${id}`;",
        category: 'Readability',
      },
      {
        severity: 'warning', title: 'No input validation',
        file: 'line 1', description: 'The id parameter is used directly without validation, potentially allowing injection attacks.',
        suggestion: 'function fetchUserData(id: string) {\n  if (!id || typeof id !== "string") throw new Error("Invalid ID");\n  ...\n}',
        category: 'Security',
      },
    ];

    const severityConfig = {
      critical: { color: COLORS.danger, bg: COLORS.danger + '15', icon: 'XCircle', label: 'Critical' },
      warning: { color: COLORS.warning, bg: COLORS.warning + '15', icon: 'AlertTriangle', label: 'Warning' },
      info: { color: COLORS.info, bg: COLORS.info + '15', icon: 'Activity', label: 'Info' },
    };

    const scores = [
      { label: 'Security', score: 42, color: COLORS.danger },
      { label: 'Performance', score: 68, color: COLORS.warning },
      { label: 'Readability', score: 71, color: COLORS.warning },
      { label: 'Maintainability', score: 55, color: COLORS.warning },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement(GlowOrb, { top: -40, left: 50, color: COLORS.danger, size: 180 }),

      // Header
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 12, paddingTop: 10, marginBottom: 20 }
      },
        React.createElement('div', {
          style: { color: theme.textSecondary, cursor: 'pointer', padding: 4 },
          onClick: () => navigateTo('analyze'),
        }, React.createElement(icons.ArrowLeft)),
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 22, fontWeight: 700, color: theme.text }
          }, 'Analysis Results'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
          }, 'fetchUserData.js • JavaScript')
        )
      ),

      // Score Overview
      React.createElement('div', {
        style: {
          background: theme.surface, borderRadius: 20, padding: 20, marginBottom: 18,
          border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 20,
        }
      },
        React.createElement(ScoreRing, { score: 56, size: 90, strokeWidth: 6, label: 'Score' }),
        React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 10 } },
          scores.map((s, i) => React.createElement('div', { key: i },
            React.createElement('div', {
              style: {
                display: 'flex', justifyContent: 'space-between', fontFamily: FONT,
                fontSize: 12, color: theme.textSecondary, marginBottom: 4,
              }
            },
              React.createElement('span', null, s.label),
              React.createElement('span', { style: { color: s.color, fontWeight: 600 } }, `${s.score}%`)
            ),
            React.createElement('div', {
              style: { height: 4, background: theme.surfaceLight, borderRadius: 2, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${s.score}%`, background: s.color,
                  borderRadius: 2, transition: 'width 0.8s ease',
                }
              })
            )
          ))
        )
      ),

      // Issues Summary
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 18 }
      }, [
        { label: 'Critical', count: 1, color: COLORS.danger },
        { label: 'Warnings', count: 3, color: COLORS.warning },
        { label: 'Info', count: 1, color: COLORS.info },
      ].map((cat, i) => React.createElement('div', {
        key: i,
        style: {
          flex: 1, background: cat.color + '10', borderRadius: 12, padding: '12px 10px',
          border: `1px solid ${cat.color}30`, textAlign: 'center',
        }
      },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 22, fontWeight: 700, color: cat.color }
        }, cat.count),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary }
        }, cat.label)
      ))),

      // Issues List
      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 17, fontWeight: 600, color: theme.text, marginBottom: 12 }
      }, 'Issues Found'),

      ...issues.map((issue, i) => {
        const config = severityConfig[issue.severity];
        const isExpanded = selectedIssue === i;

        return React.createElement('div', {
          key: i,
          style: {
            background: theme.surface, borderRadius: 14, marginBottom: 10,
            border: `1px solid ${isExpanded ? config.color + '40' : theme.border}`,
            overflow: 'hidden', cursor: 'pointer',
            transition: 'all 0.3s ease',
          },
          onClick: () => setSelectedIssue(isExpanded ? null : i),
        },
          React.createElement('div', {
            style: { padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 8, background: config.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: config.color, flexShrink: 0,
              }
            }, React.createElement(icons[config.icon])),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: theme.text }
              }, issue.title),
              React.createElement('div', {
                style: {
                  display: 'flex', gap: 8, marginTop: 4, fontFamily: FONT, fontSize: 11,
                  color: theme.textSecondary,
                }
              },
                React.createElement('span', {
                  style: { color: config.color, fontWeight: 500 }
                }, config.label),
                React.createElement('span', null, '•'),
                React.createElement('span', null, issue.file),
                React.createElement('span', null, '•'),
                React.createElement('span', null, issue.category)
              )
            )
          ),
          isExpanded && React.createElement('div', {
            style: { padding: '0 16px 16px', borderTop: `1px solid ${theme.border}`, paddingTop: 12 }
          },
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, lineHeight: 1.6, marginBottom: 12 }
            }, issue.description),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 12, fontWeight: 600, color: COLORS.cta, marginBottom: 8 }
            }, '💡 Suggested Fix:'),
            React.createElement('div', {
              style: {
                background: COLORS.background, borderRadius: 10, padding: '12px 14px',
                fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12,
                color: COLORS.cta, lineHeight: 1.6, whiteSpace: 'pre-wrap',
                border: `1px solid ${COLORS.cta}20`,
              }
            }, issue.suggestion)
          )
        );
      }),

      // Generate Report Button
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}CC)`,
          borderRadius: 16, padding: '18px 24px', marginTop: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', fontFamily: FONT, fontSize: 17, fontWeight: 600,
          color: '#fff', boxShadow: `0 4px 20px ${COLORS.primary}40`,
        },
        onClick: () => navigateTo('reports'),
      },
        React.createElement(icons.FileText),
        'Generate Client Report'
      )
    );
  };

  const ReportsScreen = () => {
    const reports = [
      {
        name: 'Auth Service Review',
        date: 'Dec 15, 2024',
        score: 87,
        status: 'sent',
        client: 'Acme Corp',
        files: 8,
      },
      {
        name: 'API Router Audit',
        date: 'Dec 14, 2024',
        score: 72,
        status: 'draft',
        client: 'TechStart Inc',
        files: 12,
      },
      {
        name: 'Payment Module',
        date: 'Dec 12, 2024',
        score: 94,
        status: 'sent',
        client: 'FinanceApp',
        files: 5,
      },
      {
        name: 'Dashboard Components',
        date: 'Dec 10, 2024',
        score: 89,
        status: 'draft',
        client: 'Internal',
        files: 15,
      },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement(GlowOrb, { top: -40, left: 180, color: COLORS.primary }),

      React.createElement('div', { style: { paddingTop: 10, marginBottom: 24 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 34, fontWeight: 700, color: theme.text, letterSpacing: -0.5 }
        }, 'Reports'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, marginTop: 4 }
        }, 'Client-ready quality summaries')
      ),

      // Stats Summary
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 22,
        }
      }, [
        { label: 'Total Reports', value: '24', icon: 'FileText', color: COLORS.primary },
        { label: 'Sent to Clients', value: '18', icon: 'Share2', color: COLORS.cta },
        { label: 'Avg Score', value: '85', icon: 'Star', color: COLORS.warning },
      ].map((stat, i) => React.createElement('div', {
        key: i,
        style: {
          flex: 1, background: theme.surface, borderRadius: 14, padding: '14px 10px',
          border: `1px solid ${theme.border}`, textAlign: 'center',
        }
      },
        React.createElement('div', { style: { color: stat.color, display: 'flex', justifyContent: 'center', marginBottom: 6 } },
          React.createElement(icons[stat.icon])
        ),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 20, fontWeight: 700, color: theme.text }
        }, stat.value),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 10, color: theme.textSecondary }
        }, stat.label)
      ))),

      // Report Cards
      ...reports.map((report, i) => React.createElement('div', {
        key: i,
        style: {
          background: theme.surface, borderRadius: 16, padding: '18px 18px',
          marginBottom: 12, border: `1px solid ${theme.border}`,
          transition: 'all 0.2s ease',
          transform: hoveredCard === `report-${i}` ? 'translateY(-2px)' : 'none',
          boxShadow: hoveredCard === `report-${i}` ? `0 8px 24px ${COLORS.background}40` : 'none',
          cursor: 'pointer',
        },
        onMouseEnter: () => setHoveredCard(`report-${i}`),
        onMouseLeave: () => setHoveredCard(null),
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 16, fontWeight: 600, color: theme.text }
            }, report.name),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, marginTop: 4 }
            }, `${report.client} • ${report.files} files`)
          ),
          React.createElement(ScoreRing, { score: report.score, size: 44, strokeWidth: 3 })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('span', {
              style: {
                padding: '4px 12px', borderRadius: 20, fontFamily: FONT, fontSize: 11, fontWeight: 600,
                background: report.status === 'sent' ? COLORS.cta + '15' : COLORS.warning + '15',
                color: report.status === 'sent' ? COLORS.cta : COLORS.warning,
              }
            }, report.status === 'sent' ? '✓ Sent' : '◌ Draft'),
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 12, color: theme.textMuted }
            }, report.date)
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: 10, background: theme.surfaceLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: theme.textSecondary, cursor: 'pointer',
              }
            }, React.createElement(icons.Download)),
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: 10, background: COLORS.primary + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: COLORS.secondary, cursor: 'pointer',
              }
            }, React.createElement(icons.Share2))
          )
        )
      ))
    );
  };

  const SettingsScreen = () => {
    const [notifications, setNotifications] = useState(true);
    const [autoScan, setAutoScan] = useState(true);
    const [strictMode, setStrictMode] = useState(false);

    const Toggle = ({ value, onToggle }) => React.createElement('div', {
      style: {
        width: 51, height: 31, borderRadius: 16,
        background: value ? COLORS.cta : theme.surfaceLight,
        padding: 2, cursor: 'pointer',
        transition: 'background 0.3s ease',
        position: 'relative',
      },
      onClick: onToggle,
    },
      React.createElement('div', {
        style: {
          width: 27, height: 27, borderRadius: '50%', background: '#fff',
          transition: 'transform 0.3s ease',
          transform: value ? 'translateX(20px)' : 'translateX(0)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }
      })
    );

    const SettingRow = ({ icon, label, desc, right, onClick }) => React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0',
        borderBottom: `0.5px solid ${theme.border}`, cursor: onClick ? 'pointer' : 'default',
      },
      onClick,
    },
      React.createElement('div', {
        style: {
          width: 36, height: 36, borderRadius: 10, background: COLORS.primary + '15',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: COLORS.secondary, flexShrink: 0,
        }
      }, icon),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 16, color: theme.text }
        }, label),
        desc && React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 12, color: theme.textSecondary, marginTop: 2 }
        }, desc)
      ),
      right || React.createElement('div', { style: { color: theme.textMuted } }, React.createElement(icons.ChevronRight))
    );

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement(GlowOrb, { top: -30, left: -40, color: COLORS.primary }),

      React.createElement('div', { style: { paddingTop: 10, marginBottom: 24 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 34, fontWeight: 700, color: theme.text, letterSpacing: -0.5 }
        }, 'Settings')
      ),

      // Profile Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.primary}30, ${theme.surface})`,
          borderRadius: 20, padding: 20, marginBottom: 24,
          border: `1px solid ${COLORS.primary}30`,
          display: 'flex', alignItems: 'center', gap: 16,
        }
      },
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: 16,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.cta})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONT, fontSize: 22, fontWeight: 700, color: '#fff',
          }
        }, 'JD'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 18, fontWeight: 600, color: theme.text }
          }, 'Jane Developer'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
          }, 'Pro Plan • 847 scans'),
          React.createElement('div', {
            style: {
              display: 'inline-flex', marginTop: 6, padding: '3px 10px', borderRadius: 8,
              background: COLORS.cta + '15', fontFamily: FONT, fontSize: 11,
              color: COLORS.cta, fontWeight: 600,
            }
          }, '⭐ Top 5% Quality')
        )
      ),

      // Settings Groups
      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }
      }, 'Preferences'),

      React.createElement('div', { style: { background: theme.surface, borderRadius: 16, padding: '0 18px', marginBottom: 24, border: `1px solid ${theme.border}` } },
        React.createElement(SettingRow, {
          icon: React.createElement(isDark ? icons.Moon : icons.Sun),
          label: 'Dark Mode',
          desc: 'Toggle interface theme',
          right: React.createElement(Toggle, { value: isDark, onToggle: () => setIsDark(!isDark) }),
        }),
        React.createElement(SettingRow, {
          icon: React.createElement(icons.Activity),
          label: 'Notifications',
          desc: 'Analysis completion alerts',
          right: React.createElement(Toggle, { value: notifications, onToggle: () => setNotifications(!notifications) }),
        }),
        React.createElement(SettingRow, {
          icon: React.createElement(icons.Zap),
          label: 'Auto-scan on Push',
          desc: 'Analyze connected repos automatically',
          right: React.createElement(Toggle, { value: autoScan, onToggle: () => setAutoScan(!autoScan) }),
        }),
        React.createElement(SettingRow, {
          icon: React.createElement(icons.Shield),
          label: 'Strict Security Mode',
          desc: 'Flag all potential vulnerabilities',
          right: React.createElement(Toggle, { value: strictMode, onToggle: () => setStrictMode(!strictMode) }),
        })
      ),

      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }
      }, 'Customization'),

      React.createElement('div', { style: { background: theme.surface, borderRadius: 16, padding: '0 18px', marginBottom: 24, border: `1px solid ${theme.border}` } },
        React.createElement(SettingRow, {
          icon: React.createElement(icons.Layers),
          label: 'Review Rules',
          desc: 'Custom linting & style guides',
        }),
        React.createElement(SettingRow, {
          icon: React.createElement(icons.GitBranch),
          label: 'Connected Repos',
          desc: '3 repositories connected',
        }),
        React.createElement(SettingRow, {
          icon: React.createElement(icons.Code),
          label: 'Language Preferences',
          desc: 'JS, TS, Python, Go',
        })
      ),

      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }
      }, 'About'),

      React.createElement('div', { style: { background: theme.surface, borderRadius: 16, padding: '0 18px', marginBottom: 20, border: `1px solid ${theme.border}` } },
        React.createElement(SettingRow, {
          icon: React.createElement(icons.Star),
          label: 'Rate ByteWise AI',
        }),
        React.createElement(SettingRow, {
          icon: React.createElement(icons.FileText),
          label: 'Privacy Policy',
        })
      ),

      React.createElement('div', {
        style: {
          textAlign: 'center', fontFamily: FONT, fontSize: 13, color: theme.textMuted,
          padding: '10px 0',
        }
      }, 'ByteWise AI v2.1.0 • Made with 💚')
    );
  };

  const screens = {
    home: HomeScreen,
    analyze: AnalyzeScreen,
    analysis: AnalysisScreen,
    reports: ReportsScreen,
    settings: SettingsScreen,
  };

  const CurrentScreen = screens[activeScreen] || HomeScreen;

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
        background: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 2px ${isDark ? '#2A2A45' : '#D0D0E0'}, inset 0 0 80px ${COLORS.primary}08`,
      }
    },
      // Notch
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 150, height: 30, background: '#000', borderRadius: '0 0 20px 20px', zIndex: 200,
        }
      }),

      // Dynamic Island indicator
      React.createElement('div', {
        style: {
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 6, borderRadius: 3,
          background: isAnalyzing ? COLORS.cta : 'transparent',
          opacity: isAnalyzing ? 0.6 : 0,
          transition: 'all 0.3s ease',
          filter: isAnalyzing ? `blur(2px)` : 'none',
          zIndex: 201,
        }
      }),

      // Status Bar
      React.createElement(StatusBar),

      // Screen Content
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 44,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateX(-20px)' : 'translateX(0)',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
          overflow: 'hidden',
        }
      },
        React.createElement(CurrentScreen)
      ),

      // Holographic accent line at top
      React.createElement('div', {
        style: {
          position: 'absolute', top: 44, left: 20, right: 20, height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.primary}40, ${COLORS.cta}30, transparent)`,
          zIndex: 50,
        }
      }),

      // Tab Bar
      React.createElement(TabBar),

      // Home indicator
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 3,
          background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
          zIndex: 200,
        }
      })
    )
  );