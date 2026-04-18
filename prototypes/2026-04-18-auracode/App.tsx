const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#6C298B',
  secondary: '#A8FF32',
  cta: '#FF6B6B',
  background: '#1F132F',
  backgroundLight: '#2A1B3D',
  cardBg: '#2D1F42',
  cardBgLight: '#372854',
  textPrimary: '#FFFFFF',
  textSecondary: '#B8A5C8',
  textCaption: '#8B7A9E',
  border: '#3D2B55',
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#FF6B6B',
  info: '#60A5FA',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [prevScreen, setPrevScreen] = useState('home');
  const [slideDirection, setSlideDirection] = useState('left');

  const navigateTo = (screen) => {
    if (screen === activeScreen) return;
    setSlideDirection('left');
    setPrevScreen(activeScreen);
    setAnimating(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setTimeout(() => setAnimating(false), 50);
    }, 150);
  };

  const theme = isDark ? {
    bg: COLORS.background,
    cardBg: COLORS.cardBg,
    cardBgLight: COLORS.cardBgLight,
    text: COLORS.textPrimary,
    textSecondary: COLORS.textSecondary,
    textCaption: COLORS.textCaption,
    border: COLORS.border,
    statusBar: 'light',
  } : {
    bg: '#F8F5FC',
    cardBg: '#FFFFFF',
    cardBgLight: '#F0EBF5',
    text: '#1A1025',
    textSecondary: '#6B5B7B',
    textCaption: '#9B8AAE',
    border: '#E0D5EB',
    statusBar: 'dark',
  };

  const HomeScreen = () => {
    const [greeting, setGreeting] = useState('');
    const [pulseAnim, setPulseAnim] = useState(false);

    useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');

      const interval = setInterval(() => setPulseAnim(p => !p), 2000);
      return () => clearInterval(interval);
    }, []);

    const recentAudits = [
      { name: 'auth-service.ts', lang: 'TypeScript', score: 87, issues: 3, time: '2h ago' },
      { name: 'api-routes.py', lang: 'Python', score: 92, issues: 1, time: '5h ago' },
      { name: 'Dashboard.jsx', lang: 'React', score: 78, issues: 7, time: '1d ago' },
    ];

    const quickStats = [
      { label: 'Audits Today', value: '12', icon: 'FileSearch', color: COLORS.secondary },
      { label: 'Issues Fixed', value: '34', icon: 'CheckCircle', color: COLORS.success },
      { label: 'Score Avg', value: '89', icon: 'TrendingUp', color: COLORS.info },
    ];

    const getScoreColor = (score) => {
      if (score >= 90) return COLORS.success;
      if (score >= 75) return COLORS.warning;
      return COLORS.error;
    };

    const LucideIcon = ({ name, size = 20, color = theme.text, style = {} }) => {
      const IconComponent = window.lucide && window.lucide[name];
      if (!IconComponent) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
      return React.createElement(IconComponent, { size, color, style });
    };

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      // Header
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 20 }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, margin: 0 }
            }, greeting),
            React.createElement('h1', {
              style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: '4px 0 0' }
            }, 'Alex Rivera')
          ),
          React.createElement('div', {
            style: {
              display: 'flex', gap: 12, alignItems: 'center'
            }
          },
            React.createElement('button', {
              onClick: () => setIsDark(!isDark),
              style: {
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }
            }, React.createElement(LucideIcon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: COLORS.secondary })),
            React.createElement('div', {
              style: {
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            },
              React.createElement('span', { style: { fontFamily: FONT, fontSize: 17, fontWeight: '600', color: '#fff' } }, 'A')
            )
          )
        )
      ),

      // Aura Score Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.primary}dd, ${COLORS.backgroundLight})`,
          borderRadius: 20,
          padding: 24,
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${COLORS.primary}55`,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `${COLORS.secondary}15`,
            filter: 'blur(20px)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `${COLORS.primary}30`,
            filter: 'blur(15px)',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 13, color: `${COLORS.secondary}cc`, margin: 0, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: '600' }
            }, 'Your Aura Score'),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }
            },
              React.createElement('span', {
                style: {
                  fontFamily: FONT,
                  fontSize: 48,
                  fontWeight: '700',
                  color: COLORS.secondary,
                  textShadow: `0 0 ${pulseAnim ? '20px' : '10px'} ${COLORS.secondary}40`,
                  transition: 'text-shadow 2s ease',
                }
              }, '89'),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 20, color: COLORS.secondary + '88', fontWeight: '500' }
              }, '/100')
            ),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 13, color: '#ffffffaa', margin: '4px 0 0' }
            }, '↑ 4 points from last week')
          ),
          React.createElement('div', {
            style: {
              width: 64,
              height: 64,
              borderRadius: 16,
              background: `${COLORS.secondary}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${COLORS.secondary}30`,
            }
          },
            React.createElement(LucideIcon, { name: 'Sparkles', size: 28, color: COLORS.secondary })
          )
        )
      ),

      // Quick Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 12, marginBottom: 24 }
      },
        ...quickStats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              background: theme.cardBg,
              borderRadius: 16,
              padding: '16px 12px',
              textAlign: 'center',
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement(LucideIcon, { name: stat.icon, size: 20, color: stat.color, style: { margin: '0 auto 8px' } }),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 22, fontWeight: '700', color: theme.text, margin: 0 }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 11, color: theme.textCaption, margin: '4px 0 0' }
            }, stat.label)
          )
        )
      ),

      // Quick Actions
      React.createElement('div', {
        style: { marginBottom: 24 }
      },
        React.createElement('h2', {
          style: { fontFamily: FONT, fontSize: 20, fontWeight: '600', color: theme.text, margin: '0 0 16px' }
        }, 'Quick Actions'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
        },
          React.createElement('button', {
            onClick: () => navigateTo('audit'),
            style: {
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}aa)`,
              border: `1px solid ${COLORS.primary}88`,
              borderRadius: 16,
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'transform 0.2s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement(LucideIcon, { name: 'Code2', size: 24, color: COLORS.secondary }),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: '#fff', margin: '12px 0 4px' }
            }, 'Snippet Audit'),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 12, color: '#ffffff88', margin: 0 }
            }, 'Paste & analyze')
          ),
          React.createElement('button', {
            onClick: () => navigateTo('projects'),
            style: {
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'transform 0.2s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement(LucideIcon, { name: 'FolderGit2', size: 24, color: COLORS.info }),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text, margin: '12px 0 4px' }
            }, 'Health Check'),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 12, color: theme.textCaption, margin: 0 }
            }, 'Full project scan')
          )
        )
      ),

      // Recent Audits
      React.createElement('div', null,
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
        },
          React.createElement('h2', {
            style: { fontFamily: FONT, fontSize: 20, fontWeight: '600', color: theme.text, margin: 0 }
          }, 'Recent Audits'),
          React.createElement('button', {
            style: { background: 'none', border: 'none', fontFamily: FONT, fontSize: 15, color: COLORS.secondary, cursor: 'pointer' }
          }, 'See all')
        ),
        ...recentAudits.map((audit, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => navigateTo('report'),
            style: {
              background: theme.cardBg,
              borderRadius: 16,
              padding: 16,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${getScoreColor(audit.score)}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }
            },
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 15, fontWeight: '700', color: getScoreColor(audit.score) }
              }, audit.score)
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
              }, audit.name),
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption, margin: '2px 0 0' }
              }, `${audit.lang} · ${audit.issues} issues · ${audit.time}`)
            ),
            React.createElement(LucideIcon, { name: 'ChevronRight', size: 18, color: theme.textCaption })
          )
        )
      )
    );
  };

  const AuditScreen = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('JavaScript');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [progress, setProgress] = useState(0);

    const languages = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java'];

    const sampleCode = `function fetchUserData(id) {
  var data = fetch('/api/users/' + id)
  data.then(res => {
    if (res.status == 200) {
      return res.json()
    }
  }).then(user => {
    console.log(user.name)
    document.getElementById('user').innerHTML = user.bio
  })
}`;

    const mockResults = {
      score: 72,
      issues: [
        { severity: 'error', title: 'XSS Vulnerability', line: 8, desc: 'Using innerHTML with user data can lead to cross-site scripting attacks. Use textContent or sanitize input.', fix: "document.getElementById('user').textContent = user.bio;" },
        { severity: 'warning', title: 'Missing Error Handling', line: 3, desc: 'Promise chain lacks .catch() handler. Unhandled rejections can crash your application.', fix: '.catch(err => console.error("Failed to fetch:", err))' },
        { severity: 'warning', title: 'Loose Equality', line: 4, desc: 'Using == instead of === can lead to unexpected type coercion. Always prefer strict equality.', fix: 'if (res.status === 200) {' },
        { severity: 'info', title: 'Use const/let', line: 2, desc: 'var is function-scoped and can lead to bugs. Use const for values that don\'t change, let otherwise.', fix: 'const data = fetch(...)' },
        { severity: 'info', title: 'Template Literals', line: 2, desc: 'String concatenation can be replaced with template literals for better readability.', fix: 'fetch(`/api/users/${id}`)' },
      ],
      metrics: { security: 45, performance: 78, readability: 82, bestPractices: 68 }
    };

    const runAudit = () => {
      if (!code.trim()) return;
      setIsAnalyzing(true);
      setProgress(0);
      setResults(null);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setResults(mockResults);
            return 100;
          }
          return p + Math.random() * 15 + 5;
        });
      }, 200);
    };

    const getSeverityColor = (s) => {
      if (s === 'error') return COLORS.error;
      if (s === 'warning') return COLORS.warning;
      return COLORS.info;
    };

    const getSeverityIcon = (s) => {
      if (s === 'error') return 'AlertCircle';
      if (s === 'warning') return 'AlertTriangle';
      return 'Info';
    };

    const LucideIcon = ({ name, size = 20, color = theme.text, style = {} }) => {
      const IconComponent = window.lucide && window.lucide[name];
      if (!IconComponent) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
      return React.createElement(IconComponent, { size, color, style });
    };

    const getScoreColor = (score) => {
      if (score >= 90) return COLORS.success;
      if (score >= 75) return COLORS.warning;
      return COLORS.error;
    };

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 16 }
      },
        React.createElement('h1', {
          style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Smart Snippet Audit'),
        React.createElement('p', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, margin: '4px 0 0' }
        }, 'Paste code for instant AI-powered review')
      ),

      // Language selector
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }
      },
        ...languages.map(lang =>
          React.createElement('button', {
            key: lang,
            onClick: () => setLanguage(lang),
            style: {
              background: language === lang ? COLORS.primary : theme.cardBg,
              border: `1px solid ${language === lang ? COLORS.primary : theme.border}`,
              borderRadius: 10,
              padding: '8px 14px',
              fontFamily: FONT,
              fontSize: 13,
              color: language === lang ? '#fff' : theme.textSecondary,
              cursor: 'pointer',
              fontWeight: language === lang ? '600' : '400',
              transition: 'all 0.2s',
            }
          }, lang)
        )
      ),

      // Code input
      React.createElement('div', {
        style: {
          background: theme.cardBg,
          borderRadius: 16,
          border: `1px solid ${theme.border}`,
          marginBottom: 16,
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }
        },
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption }
          }, `${language} · ${code.split('\n').length} lines`),
          React.createElement('button', {
            onClick: () => setCode(sampleCode),
            style: {
              background: `${COLORS.secondary}15`,
              border: `1px solid ${COLORS.secondary}30`,
              borderRadius: 8,
              padding: '4px 10px',
              fontFamily: FONT,
              fontSize: 12,
              color: COLORS.secondary,
              cursor: 'pointer',
            }
          }, 'Load sample')
        ),
        React.createElement('textarea', {
          value: code,
          onChange: (e) => setCode(e.target.value),
          placeholder: 'Paste your code here...',
          style: {
            width: '100%',
            minHeight: 160,
            background: 'transparent',
            border: 'none',
            padding: 16,
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: 13,
            color: theme.text,
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.6,
            boxSizing: 'border-box',
          }
        })
      ),

      // Audit button
      React.createElement('button', {
        onClick: runAudit,
        disabled: isAnalyzing || !code.trim(),
        style: {
          width: '100%',
          padding: 16,
          borderRadius: 14,
          border: 'none',
          background: isAnalyzing ? theme.cardBgLight : (!code.trim() ? theme.cardBg : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.cta})`),
          fontFamily: FONT,
          fontSize: 17,
          fontWeight: '600',
          color: !code.trim() ? theme.textCaption : '#fff',
          cursor: isAnalyzing || !code.trim() ? 'default' : 'pointer',
          marginBottom: 20,
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }
      },
        isAnalyzing ?
          React.createElement('div', {
            style: {
              width: 20, height: 20, border: `2px solid #ffffff44`, borderTopColor: '#fff', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }
          }) : React.createElement(LucideIcon, { name: 'Sparkles', size: 20, color: !code.trim() ? theme.textCaption : '#fff' }),
        isAnalyzing ? `Analyzing... ${Math.min(Math.round(progress), 100)}%` : 'Run AI Audit'
      ),

      // Progress bar when analyzing
      isAnalyzing && React.createElement('div', {
        style: {
          height: 4,
          background: theme.cardBg,
          borderRadius: 2,
          marginBottom: 20,
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: 2,
            transition: 'width 0.3s ease',
          }
        })
      ),

      // Results
      results && React.createElement('div', null,
        // Score
        React.createElement('div', {
          style: {
            background: theme.cardBg,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            border: `1px solid ${theme.border}`,
            textAlign: 'center',
          }
        },
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 }
          }, 'Code Quality Score'),
          React.createElement('span', {
            style: {
              fontFamily: FONT, fontSize: 48, fontWeight: '700', color: getScoreColor(results.score),
              textShadow: `0 0 20px ${getScoreColor(results.score)}30`,
            }
          }, results.score),
          React.createElement('div', {
            style: { display: 'flex', gap: 12, marginTop: 16, justifyContent: 'center' }
          },
            ...Object.entries(results.metrics).map(([key, val]) =>
              React.createElement('div', { key, style: { flex: 1 } },
                React.createElement('div', {
                  style: { height: 4, background: `${theme.border}`, borderRadius: 2, marginBottom: 6, overflow: 'hidden' }
                },
                  React.createElement('div', {
                    style: { height: '100%', width: `${val}%`, background: getScoreColor(val), borderRadius: 2 }
                  })
                ),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 11, color: theme.textCaption, margin: 0, textTransform: 'capitalize' }
                }, key.replace(/([A-Z])/g, ' $1'))
              )
            )
          )
        ),

        // Issues list
        React.createElement('h3', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: '600', color: theme.text, margin: '0 0 12px' }
        }, `${results.issues.length} Issues Found`),
        ...results.issues.map((issue, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setSelectedIssue(selectedIssue === i ? null : i),
            style: {
              background: theme.cardBg,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              border: `1px solid ${selectedIssue === i ? getSeverityColor(issue.severity) + '55' : theme.border}`,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 12 }
            },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: 10,
                  background: `${getSeverityColor(issue.severity)}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }
              },
                React.createElement(LucideIcon, { name: getSeverityIcon(issue.severity), size: 16, color: getSeverityColor(issue.severity) })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text, margin: 0 }
                }, issue.title),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 12, color: theme.textCaption, margin: '2px 0 0' }
                }, `Line ${issue.line} · ${issue.severity}`)
              ),
              React.createElement(LucideIcon, {
                name: selectedIssue === i ? 'ChevronUp' : 'ChevronDown',
                size: 16,
                color: theme.textCaption,
              })
            ),
            selectedIssue === i && React.createElement('div', {
              style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${theme.border}` }
            },
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 14, color: theme.textSecondary, margin: '0 0 12px', lineHeight: 1.5 }
              }, issue.desc),
              React.createElement('div', {
                style: {
                  background: `${COLORS.secondary}10`,
                  border: `1px solid ${COLORS.secondary}25`,
                  borderRadius: 10,
                  padding: 12,
                }
              },
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 12, color: COLORS.secondary, margin: '0 0 6px', fontWeight: '600' }
                }, '✨ Suggested Fix'),
                React.createElement('code', {
                  style: { fontFamily: "'SF Mono', monospace", fontSize: 12, color: theme.text, lineHeight: 1.5 }
                }, issue.fix)
              )
            )
          )
        )
      )
    );
  };

  const ProjectsScreen = () => {
    const [activeTab, setActiveTab] = useState('projects');

    const LucideIcon = ({ name, size = 20, color = theme.text, style = {} }) => {
      const IconComponent = window.lucide && window.lucide[name];
      if (!IconComponent) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
      return React.createElement(IconComponent, { size, color, style });
    };

    const projects = [
      { name: 'e-commerce-api', repo: 'github.com/alex/ecommerce', score: 84, files: 47, lastScan: '2h ago', status: 'healthy', lang: 'TypeScript' },
      { name: 'portfolio-v3', repo: 'github.com/alex/portfolio', score: 91, files: 23, lastScan: '1d ago', status: 'healthy', lang: 'React' },
      { name: 'payment-gateway', repo: 'github.com/client/payments', score: 62, files: 89, lastScan: '3d ago', status: 'critical', lang: 'Python' },
    ];

    const policies = [
      { name: 'Strict TypeScript', rules: 24, active: true, icon: 'Shield' },
      { name: 'Security First', rules: 18, active: true, icon: 'Lock' },
      { name: 'Performance Optimized', rules: 15, active: false, icon: 'Zap' },
      { name: 'Client: Acme Corp', rules: 31, active: true, icon: 'Building2' },
    ];

    const getScoreColor = (score) => {
      if (score >= 90) return COLORS.success;
      if (score >= 75) return COLORS.warning;
      return COLORS.error;
    };

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 16 }
      },
        React.createElement('h1', {
          style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: 0 }
        }, 'Projects'),
        React.createElement('p', {
          style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, margin: '4px 0 0' }
        }, 'Manage repos, policies & health checks')
      ),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex',
          background: theme.cardBg,
          borderRadius: 12,
          padding: 4,
          marginBottom: 20,
          border: `1px solid ${theme.border}`,
        }
      },
        ...['projects', 'policies'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              border: 'none',
              background: activeTab === tab ? COLORS.primary : 'transparent',
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: '600',
              color: activeTab === tab ? '#fff' : theme.textSecondary,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      activeTab === 'projects' ? React.createElement('div', null,
        // Connect repo button
        React.createElement('button', {
          style: {
            width: '100%',
            padding: 16,
            borderRadius: 14,
            border: `2px dashed ${theme.border}`,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 20,
            cursor: 'pointer',
          }
        },
          React.createElement(LucideIcon, { name: 'GitBranch', size: 20, color: COLORS.secondary }),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: COLORS.secondary }
          }, 'Connect Git Repository')
        ),

        // Project cards
        ...projects.map((proj, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => navigateTo('report'),
            style: {
              background: theme.cardBg,
              borderRadius: 16,
              padding: 18,
              marginBottom: 12,
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              transition: 'transform 0.2s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }
            },
              React.createElement('div', null,
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 17, fontWeight: '600', color: theme.text, margin: 0 }
                }, proj.name),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 12, color: theme.textCaption, margin: '4px 0 0' }
                }, proj.repo)
              ),
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 12,
                  background: `${getScoreColor(proj.score)}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${getScoreColor(proj.score)}30`,
                }
              },
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 17, fontWeight: '700', color: getScoreColor(proj.score) }
                }, proj.score)
              )
            ),
            React.createElement('div', {
              style: { display: 'flex', gap: 16 }
            },
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 6 }
              },
                React.createElement(LucideIcon, { name: 'FileCode2', size: 14, color: theme.textCaption }),
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption }
                }, `${proj.files} files`)
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 6 }
              },
                React.createElement(LucideIcon, { name: 'Clock', size: 14, color: theme.textCaption }),
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption }
                }, proj.lastScan)
              ),
              React.createElement('div', {
                style: {
                  marginLeft: 'auto',
                  padding: '3px 10px',
                  borderRadius: 8,
                  background: proj.status === 'healthy' ? `${COLORS.success}15` : `${COLORS.error}15`,
                }
              },
                React.createElement('span', {
                  style: {
                    fontFamily: FONT, fontSize: 12, fontWeight: '600',
                    color: proj.status === 'healthy' ? COLORS.success : COLORS.error,
                  }
                }, proj.status)
              )
            )
          )
        )
      ) :
      // Policies tab
      React.createElement('div', null,
        React.createElement('button', {
          style: {
            width: '100%',
            padding: 16,
            borderRadius: 14,
            border: `2px dashed ${theme.border}`,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 20,
            cursor: 'pointer',
          }
        },
          React.createElement(LucideIcon, { name: 'Plus', size: 20, color: COLORS.secondary }),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: COLORS.secondary }
          }, 'Create New Policy')
        ),

        ...policies.map((policy, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.cardBg,
              borderRadius: 16,
              padding: 18,
              marginBottom: 12,
              border: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12,
                background: policy.active ? `${COLORS.primary}25` : `${theme.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(LucideIcon, { name: policy.icon, size: 20, color: policy.active ? COLORS.secondary : theme.textCaption })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text, margin: 0 }
              }, policy.name),
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption, margin: '2px 0 0' }
              }, `${policy.rules} rules`)
            ),
            React.createElement('div', {
              style: {
                width: 44, height: 26, borderRadius: 13,
                background: policy.active ? COLORS.secondary : theme.border,
                padding: 2,
                cursor: 'pointer',
                transition: 'background 0.3s',
                position: 'relative',
              }
            },
              React.createElement('div', {
                style: {
                  width: 22, height: 22, borderRadius: 11,
                  background: '#fff',
                  position: 'absolute',
                  top: 2,
                  left: policy.active ? 20 : 2,
                  transition: 'left 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }
              })
            )
          )
        )
      )
    );
  };

  const ReportScreen = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const LucideIcon = ({ name, size = 20, color = theme.text, style = {} }) => {
      const IconComponent = window.lucide && window.lucide[name];
      if (!IconComponent) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
      return React.createElement(IconComponent, { size, color, style });
    };

    const sections = [
      { id: 'overview', label: 'Overview', icon: 'BarChart3' },
      { id: 'security', label: 'Security', icon: 'Shield' },
      { id: 'performance', label: 'Perf', icon: 'Zap' },
    ];

    const metrics = [
      { label: 'Overall Score', value: 84, change: '+4', trend: 'up' },
      { label: 'Security', value: 72, change: '+12', trend: 'up' },
      { label: 'Performance', value: 91, change: '-2', trend: 'down' },
      { label: 'Maintainability', value: 88, change: '+7', trend: 'up' },
    ];

    const securityItems = [
      { severity: 'critical', title: 'SQL Injection in user query', file: 'db/queries.py:45', status: 'open' },
      { severity: 'high', title: 'Exposed API key in config', file: 'config/settings.py:12', status: 'fixed' },
      { severity: 'medium', title: 'CORS misconfiguration', file: 'middleware/cors.py:8', status: 'open' },
      { severity: 'low', title: 'Missing Content-Security-Policy', file: 'middleware/headers.py:3', status: 'open' },
    ];

    const getScoreColor = (score) => {
      if (score >= 90) return COLORS.success;
      if (score >= 75) return COLORS.warning;
      return COLORS.error;
    };

    const getSeverityBg = (sev) => {
      const map = { critical: COLORS.error, high: '#FF8C42', medium: COLORS.warning, low: COLORS.info };
      return map[sev] || COLORS.info;
    };

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 16 }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('div', null,
            React.createElement('h1', {
              style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: theme.text, margin: 0 }
            }, 'Quality Report'),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 15, color: theme.textSecondary, margin: '4px 0 0' }
            }, 'payment-gateway · Dec 15, 2024')
          ),
          React.createElement('button', {
            style: {
              background: `${COLORS.secondary}15`,
              border: `1px solid ${COLORS.secondary}30`,
              borderRadius: 12,
              padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer',
            }
          },
            React.createElement(LucideIcon, { name: 'Share2', size: 16, color: COLORS.secondary }),
            React.createElement('span', {
              style: { fontFamily: FONT, fontSize: 13, fontWeight: '600', color: COLORS.secondary }
            }, 'Export')
          )
        )
      ),

      // Section tabs
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 8,
          marginBottom: 20,
        }
      },
        ...sections.map(sec =>
          React.createElement('button', {
            key: sec.id,
            onClick: () => setActiveSection(sec.id),
            style: {
              flex: 1,
              padding: '10px 8px',
              borderRadius: 12,
              border: `1px solid ${activeSection === sec.id ? COLORS.primary : theme.border}`,
              background: activeSection === sec.id ? `${COLORS.primary}30` : theme.cardBg,
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: '600',
              color: activeSection === sec.id ? COLORS.secondary : theme.textSecondary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s',
            }
          },
            React.createElement(LucideIcon, { name: sec.icon, size: 14, color: activeSection === sec.id ? COLORS.secondary : theme.textCaption }),
            sec.label
          )
        )
      ),

      activeSection === 'overview' && React.createElement('div', null,
        // Score grid
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }
        },
          ...metrics.map((m, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: theme.cardBg,
                borderRadius: 16,
                padding: 18,
                border: `1px solid ${theme.border}`,
              }
            },
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 12, color: theme.textCaption, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 }
              }, m.label),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'baseline', gap: 8 }
              },
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 28, fontWeight: '700', color: getScoreColor(m.value) }
                }, m.value),
                React.createElement('span', {
                  style: {
                    fontFamily: FONT, fontSize: 13, fontWeight: '600',
                    color: m.trend === 'up' ? COLORS.success : COLORS.error,
                  }
                }, m.change)
              ),
              // Mini bar
              React.createElement('div', {
                style: { height: 4, background: `${theme.border}`, borderRadius: 2, marginTop: 10, overflow: 'hidden' }
              },
                React.createElement('div', {
                  style: {
                    height: '100%',
                    width: `${m.value}%`,
                    background: `linear-gradient(90deg, ${getScoreColor(m.value)}, ${getScoreColor(m.value)}88)`,
                    borderRadius: 2,
                    transition: 'width 1s ease',
                  }
                })
              )
            )
          )
        ),

        // Client report preview
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.backgroundLight})`,
            borderRadius: 16,
            padding: 20,
            border: `1px solid ${COLORS.primary}40`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }
          },
            React.createElement(LucideIcon, { name: 'FileText', size: 22, color: COLORS.secondary }),
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 17, fontWeight: '600', color: '#fff', margin: 0 }
              }, 'Client-Ready Report'),
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 13, color: '#ffffffaa', margin: '2px 0 0' }
              }, 'Professional PDF with charts & insights')
            )
          ),
          React.createElement('button', {
            style: {
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: 'none',
              background: COLORS.secondary,
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: '600',
              color: '#1a1a1a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }
          },
            React.createElement(LucideIcon, { name: 'Download', size: 18, color: '#1a1a1a' }),
            'Generate Report'
          )
        )
      ),

      activeSection === 'security' && React.createElement('div', null,
        // Security summary
        React.createElement('div', {
          style: {
            background: theme.cardBg,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            border: `1px solid ${theme.border}`,
            textAlign: 'center',
          }
        },
          React.createElement(LucideIcon, { name: 'ShieldAlert', size: 32, color: COLORS.warning, style: { margin: '0 auto 12px' } }),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 22, fontWeight: '700', color: COLORS.warning, margin: 0 }
          }, '4 Vulnerabilities'),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption, margin: '6px 0 0' }
          }, '1 Critical · 1 High · 1 Medium · 1 Low')
        ),

        ...securityItems.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.cardBg,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              border: `1px solid ${theme.border}`,
              borderLeftWidth: 3,
              borderLeftColor: getSeverityBg(item.severity),
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
            },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }
                },
                  React.createElement('span', {
                    style: {
                      padding: '2px 8px', borderRadius: 6,
                      background: `${getSeverityBg(item.severity)}20`,
                      fontFamily: FONT, fontSize: 11, fontWeight: '600',
                      color: getSeverityBg(item.severity),
                      textTransform: 'uppercase',
                    }
                  }, item.severity),
                  item.status === 'fixed' && React.createElement('span', {
                    style: {
                      padding: '2px 8px', borderRadius: 6,
                      background: `${COLORS.success}15`,
                      fontFamily: FONT, fontSize: 11, fontWeight: '600',
                      color: COLORS.success,
                    }
                  }, '✓ Fixed')
                ),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text, margin: 0 }
                }, item.title),
                React.createElement('p', {
                  style: { fontFamily: FONT, fontSize: 12, color: theme.textCaption, margin: '4px 0 0', fontFamily: "'SF Mono', monospace" }
                }, item.file)
              ),
              React.createElement(LucideIcon, { name: 'ChevronRight', size: 18, color: theme.textCaption })
            )
          )
        )
      ),

      activeSection === 'performance' && React.createElement('div', null,
        React.createElement('div', {
          style: {
            background: theme.cardBg,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            border: `1px solid ${theme.border}`,
            textAlign: 'center',
          }
        },
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 48, fontWeight: '700', color: COLORS.success }
          }, '91'),
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption, margin: '4px 0 0' }
          }, 'Performance Score')
        ),
        ...[
          { label: 'Bundle Size', value: '142KB', target: '< 200KB', status: 'good' },
          { label: 'Avg Response Time', value: '187ms', target: '< 300ms', status: 'good' },
          { label: 'Memory Usage', value: '89MB', target: '< 128MB', status: 'warning' },
          { label: 'CPU Complexity', value: 'O(n²)', target: 'O(n log n)', status: 'bad' },
        ].map((perf, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.cardBg,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              border: `1px solid ${theme.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }
          },
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text, margin: 0 }
              }, perf.label),
              React.createElement('p', {
                style: { fontFamily: FONT, fontSize: 12, color: theme.textCaption, margin: '2px 0 0' }
              }, `Target: ${perf.target}`)
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 8 }
            },
              React.createElement('span', {
                style: {
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 15,
                  fontWeight: '600',
                  color: perf.status === 'good' ? COLORS.success : perf.status === 'warning' ? COLORS.warning : COLORS.error,
                }
              }, perf.value),
              React.createElement('div', {
                style: {
                  width: 8, height: 8, borderRadius: 4,
                  background: perf.status === 'good' ? COLORS.success : perf.status === 'warning' ? COLORS.warning : COLORS.error,
                }
              })
            )
          )
        )
      )
    );
  };

  const AssistantScreen = () => {
    const [messages, setMessages] = useState([
      { role: 'assistant', content: 'Hello Alex! 👋 I\'m your Explain & Rectify Assistant. Paste any code issue and I\'ll help you understand and fix it. What would you like to explore?', time: '10:30 AM' },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const LucideIcon = ({ name, size = 20, color = theme.text, style = {} }) => {
      const IconComponent = window.lucide && window.lucide[name];
      if (!IconComponent) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
      return React.createElement(IconComponent, { size, color, style });
    };

    const quickPrompts = [
      'Explain the XSS vulnerability',
      'How to fix SQL injection?',
      'Optimize my async/await pattern',
      'Review my error handling',
    ];

    const sendMessage = (text) => {
      const msg = text || input;
      if (!msg.trim()) return;
      setMessages(prev => [...prev, { role: 'user', content: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const responses = {
          'Explain the XSS vulnerability': `**Cross-Site Scripting (XSS)** occurs when user-controlled data is inserted into the DOM without sanitization.\n\n⚠️ **In your code:**\n\`document.getElementById('user').innerHTML = user.bio\`\n\nThis allows an attacker to inject malicious scripts through the \`bio\` field.\n\n✅ **Fix:** Use \`textContent\` instead:\n\`document.getElementById('user').textContent = user.bio\`\n\nOr sanitize with DOMPurify:\n\`innerHTML = DOMPurify.sanitize(user.bio)\``,
          default: `Great question! Let me analyze that for you.\n\n🔍 **Analysis:** This is a common pattern that can be improved by following best practices for error handling and type safety.\n\n✅ **Recommendation:** Consider using try/catch blocks with specific error types, and leverage TypeScript's strict mode for additional safety.\n\nWould you like me to generate a refactored version?`
        };

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: responses[msg] || responses.default,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      }, 1500);
    };

    return React.createElement('div', {
      style: { display: 'flex', flexDirection: 'column', height: '100%' }
    },
      // Header
      React.createElement('div', {
        style: { padding: '60px 20px 16px', borderBottom: `1px solid ${theme.border}` }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary}55)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(LucideIcon, { name: 'Bot', size: 22, color: COLORS.secondary })
          ),
          React.createElement('div', null,
            React.createElement('h1', {
              style: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: theme.text, margin: 0 }
            }, 'AI Assistant'),
            React.createElement('p', {
              style: { fontFamily: FONT, fontSize: 12, color: COLORS.success, margin: 0 }
            }, '● Online')
          )
        )
      ),

      // Messages
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '16px 20px' }
      },
        ...messages.map((msg, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 14,
            }
          },
            React.createElement('div', {
              style: {
                maxWidth: '85%',
                background: msg.role === 'user' ? COLORS.primary : theme.cardBg,
                borderRadius: 16,
                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 16,
                padding: '12px 16px',
                border: msg.role === 'assistant' ? `1px solid ${theme.border}` : 'none',
              }
            },
              React.createElement('p', {
                style: {
                  fontFamily: FONT, fontSize: 15, color: msg.role === 'user' ? '#fff' : theme.text,
                  margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap',
                }
              }, msg.content),
              React.createElement('p', {
                style: {
                  fontFamily: FONT, fontSize: 11,
                  color: msg.role === 'user' ? '#ffffff88' : theme.textCaption,
                  margin: '6px 0 0', textAlign: 'right',
                }
              }, msg.time)
            )
          )
        ),
        isTyping && React.createElement('div', {
          style: { display: 'flex', justifyContent: 'flex-start', marginBottom: 14 }
        },
          React.createElement('div', {
            style: {
              background: theme.cardBg,
              borderRadius: 16,
              borderBottomLeftRadius: 4,
              padding: '14px 20px',
              border: `1px solid ${theme.border}`,
              display: 'flex',
              gap: 6,
            }
          },
            ...[0, 1, 2].map(j =>
              React.createElement('div', {
                key: j,
                style: {
                  width: 8, height: 8, borderRadius: 4,
                  background: COLORS.secondary,
                  opacity: 0.4 + (j * 0.2),
                  animation: `pulse 1.4s infinite ${j * 0.2}s`,
                }
              })
            )
          )
        ),

        // Quick prompts
        messages.length <= 1 && React.createElement('div', {
          style: { marginTop: 8 }
        },
          React.createElement('p', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textCaption, margin: '0 0 10px' }
          }, 'Quick prompts:'),
          ...quickPrompts.map((prompt, i) =>
            React.createElement('button', {
              key: i,
              onClick: () => sendMessage(prompt),
              style: {
                display: 'block',
                width: '100%',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 8,
                textAlign: 'left',
                fontFamily: FONT,
                fontSize: 14,
                color: theme.text,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }
            },
              React.createElement('span', { style: { marginRight: 8 } }, '💡'),
              prompt
            )
          )
        )
      ),

      // Input
      React.createElement('div', {
        style: {
          padding: '12px 20px 30px',
          borderTop: `1px solid ${theme.border}`,
          background: theme.bg,
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: 10,
            alignItems: 'flex-end',
          }
        },
          React.createElement('div', {
            style: {
              flex: 1,
              background: theme.cardBg,
              borderRadius: 14,
              border: `1px solid ${theme.border}`,
              overflow: 'hidden',
            }
          },
            React.createElement('input', {
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyDown: (e) => e.key === 'Enter' && sendMessage(),
              placeholder: 'Ask about code issues...',
              style: {
                width: '100%',
                padding: '14px 16px',
                background: 'transparent',
                border: 'none',
                fontFamily: FONT,
                fontSize: 15,
                color: theme.text,
                outline: 'none',
                boxSizing: 'border-box',
              }
            })
          ),
          React.createElement('button', {
            onClick: () => sendMessage(),
            style: {
              width: 48, height: 48, borderRadius: 14,
              background: input.trim() ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.cta})` : theme.cardBg,
              border: input.trim() ? 'none' : `1px solid ${theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              flexShrink: 0,
              transition: 'all 0.3s',
            }
          },
            React.createElement(LucideIcon, { name: 'Send', size: 20, color: input.trim() ? '#fff' : theme.textCaption })
          )
        )
      )
    );
  };

  // Tab Bar
  const TabBar = () => {
    const LucideIcon = ({ name, size = 20, color = theme.text, style = {} }) => {
      const IconComponent = window.lucide && window.lucide[name];
      if (!IconComponent) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
      return React.createElement(IconComponent, { size, color, style });
    };

    const tabs = [
      { id: 'home', label: 'Home', icon: 'Home' },
      { id: 'audit', label: 'Audit', icon: 'Code2' },
      { id: 'projects', label: 'Projects', icon: 'FolderGit2' },
      { id: 'report', label: 'Reports', icon: 'BarChart3' },
      { id: 'assistant', label: 'AI Chat', icon: 'Bot' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: `${theme.bg}ee`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        paddingBottom: 20,
        paddingTop: 8,
        zIndex: 100,
      }
    },
      ...tabs.map(tab =>
        React.createElement('button', {
          key: tab.id,
          onClick: () => navigateTo(tab.id),
          style: {
            flex: 1,
            background: 'none',
            border: 'none',
            padding: '6px 0',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            position: 'relative',
          }
        },
          activeScreen === tab.id && React.createElement('div', {
            style: {
              position: 'absolute',
              top: -8,
              width: 20,
              height: 3,
              borderRadius: 2,
              background: COLORS.secondary,
              boxShadow: `0 0 8px ${COLORS.secondary}60`,
            }
          }),
          React.createElement(LucideIcon, {
            name: tab.icon,
            size: 22,
            color: activeScreen === tab.id ? COLORS.secondary : theme.textCaption,
          }),
          React.createElement('span', {
            style: {
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: activeScreen === tab.id ? '600' : '400',
              color: activeScreen === tab.id ? COLORS.secondary : theme.textCaption,
            }
          }, tab.label)
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    audit: AuditScreen,
    projects: ProjectsScreen,
    report: ReportScreen,
    assistant: AssistantScreen,
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
    // CSS animations
    React.createElement('style', null, `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1.1); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 0; display: none; }
      input::placeholder, textarea::placeholder { color: ${theme.textCaption}; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: theme.bg,
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset',
        border: '8px solid #1a1a1a',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 28px',
          zIndex: 200,
        }
      },
        React.createElement('span', {
          style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: theme.text }
        }, '9:41'),
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 30,
            background: '#000',
            borderRadius: '0 0 18px 18px',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', gap: 6, alignItems: 'center' }
        },
          React.createElement('div', {
            style: { display: 'flex', gap: 1, alignItems: 'flex-end' }
          },
            ...[8, 10, 12, 14].map((h, i) =>
              React.createElement('div', {
                key: i,
                style: { width: 3, height: h, borderRadius: 1, background: theme.text }
              })
            )
          ),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, fontWeight: '600', color: theme.text, marginLeft: 4 }
          }, '5G'),
          React.createElement('div', {
            style: {
              width: 25, height: 12, borderRadius: 3, border: `1px solid ${theme.text}`,
              display: 'flex', alignItems: 'center', padding: 1,
              position: 'relative',
            }
          },
            React.createElement('div', {
              style: {
                width: '75%', height: '100%', borderRadius: 1.5, background: COLORS.success,
              }
            }),
            React.createElement('div', {
              style: {
                position: 'absolute', right: -3, top: 3, width: 2, height: 5, borderRadius: '0 1px 1px 0', background: theme.text,
              }
            })
          )
        )
      ),

      // Screen content with animation
      React.createElement('div', {
        style: {
          height: '100%',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateX(-10px)' : 'translateX(0)',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }
      },
        React.createElement(CurrentScreen)
      ),

      // Tab bar
      React.createElement(TabBar)
    )
  );
}