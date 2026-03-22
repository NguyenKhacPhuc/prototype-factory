function App() {
  const { useState, useEffect, useRef } = React;

  // ===== THEMES =====
  const themes = {
    dark: {
      bg: '#080B12',
      surface: '#0F1420',
      card: '#141C2E',
      cardAlt: '#1B2438',
      border: '#242E48',
      text: '#EDF1FF',
      textSec: '#8895BA',
      textMuted: '#4A587A',
      primary: '#00C9FF',
      primaryGrad: 'linear-gradient(135deg, #00C9FF 0%, #7B61FF 100%)',
      primaryGradHoriz: 'linear-gradient(90deg, #00C9FF 0%, #7B61FF 100%)',
      accent: '#7B61FF',
      success: '#00E5A0',
      warning: '#FFB020',
      danger: '#FF4D6D',
      navBg: '#0A0E1A',
      statusBg: '#080B12',
      overlayBg: 'rgba(8, 11, 18, 0.95)',
    },
    light: {
      bg: '#F2F5FF',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      cardAlt: '#EBF0FF',
      border: '#D2DCEF',
      text: '#0A1030',
      textSec: '#4A587A',
      textMuted: '#8895BA',
      primary: '#0099CC',
      primaryGrad: 'linear-gradient(135deg, #0099CC 0%, #6348CC 100%)',
      primaryGradHoriz: 'linear-gradient(90deg, #0099CC 0%, #6348CC 100%)',
      accent: '#6348CC',
      success: '#00AA78',
      warning: '#D49010',
      danger: '#E0354E',
      navBg: '#FFFFFF',
      statusBg: '#F2F5FF',
      overlayBg: 'rgba(242, 245, 255, 0.95)',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const t = isDark ? themes.dark : themes.light;

  // ===== HOME SCREEN =====
  function HomeScreen() {
    const [pressedAction, setPressedAction] = useState(null);

    const recentFlows = [
      { id: 1, name: 'Checkout Flow', status: 'anomaly', steps: 14, time: '2m ago', issues: 3, duration: '3.2s', tags: ['payment', 'cart'] },
      { id: 2, name: 'Login → Dashboard', status: 'passing', steps: 8, time: '1h ago', issues: 0, duration: '1.8s', tags: ['auth'] },
      { id: 3, name: 'Payment Retry Loop', status: 'failing', steps: 22, time: '3h ago', issues: 7, duration: '8.7s', tags: ['payment'] },
      { id: 4, name: 'Profile Update', status: 'passing', steps: 5, time: 'Yesterday', issues: 0, duration: '0.9s', tags: ['profile'] },
    ];

    const statusColor = (s) => s === 'passing' ? t.success : s === 'failing' ? t.danger : t.warning;
    const statusLabel = (s) => s === 'passing' ? 'Passing' : s === 'failing' ? 'Failing' : 'Anomaly';
    const statusDot = (s) => s === 'passing' ? '✓' : s === 'failing' ? '✗' : '⚠';

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', padding: '0 16px' }
    },
      // Header
      React.createElement('div', { style: { paddingTop: 18, marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 } }, 'Sunday, Mar 22'),
            React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: t.text, letterSpacing: -0.5 } }, 'Good morning, Dev'),
            React.createElement('div', { style: { fontSize: 13, color: t.textSec, marginTop: 3 } }, 'MyApp v2.4.1 is connected')
          ),
          React.createElement('div', {
            style: {
              width: 42, height: 42, borderRadius: 21,
              background: t.primaryGrad,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: `0 4px 14px ${isDark ? 'rgba(0,201,255,0.3)' : 'rgba(0,153,204,0.25)'}`
            }
          }, '🔥')
        )
      ),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 18 } },
        [
          { label: 'Flows', value: '24', icon: React.createElement(window.lucide.GitBranch, { size: 16, color: t.primary }) },
          { label: 'Bugs Caught', value: '11', icon: React.createElement(window.lucide.Bug, { size: 16, color: t.danger }) },
          { label: 'Shared', value: '6', icon: React.createElement(window.lucide.Share2, { size: 16, color: t.accent }) },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 14, padding: '12px 10px',
              border: `1px solid ${t.border}`, textAlign: 'center',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } }, stat.icon),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1 } }, stat.value),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 500, marginTop: 3 } }, stat.label)
          )
        )
      ),

      // Quick Record CTA
      React.createElement('div', {
        onClick: () => {
          setPressedAction('record');
          setTimeout(() => { setPressedAction(null); setActiveTab('record'); }, 150);
        },
        style: {
          background: t.primaryGrad,
          borderRadius: 18, padding: '18px 20px', marginBottom: 22,
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          transform: pressedAction === 'record' ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 0.15s ease',
          boxShadow: `0 8px 28px ${isDark ? 'rgba(0,201,255,0.28)' : 'rgba(0,153,204,0.22)'}`
        }
      },
        React.createElement('div', {
          style: {
            width: 50, height: 50, borderRadius: 25,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement(window.lucide.CircleDot, { size: 26, color: '#fff' })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 2 } }, 'Start Recording'),
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.72)' } }, 'Capture a new flow from your connected app')
        ),
        React.createElement(window.lucide.ChevronRight, { size: 20, color: 'rgba(255,255,255,0.7)' })
      ),

      // Recent Flows
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Recent Flows'),
          React.createElement('div', {
            onClick: () => setActiveTab('flows'),
            style: { fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }
          }, 'See all →')
        ),

        recentFlows.map(flow =>
          React.createElement('div', {
            key: flow.id,
            onClick: () => setActiveTab('flows'),
            style: {
              background: t.card, borderRadius: 16, padding: '14px 16px',
              marginBottom: 10, border: `1px solid ${t.border}`, cursor: 'pointer',
              boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'transform 0.15s'
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }
            },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 } }, flow.name),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${flow.steps} steps • ${flow.duration} • ${flow.time}`)
              ),
              React.createElement('div', {
                style: {
                  fontSize: 10, fontWeight: 700, color: statusColor(flow.status),
                  background: `${statusColor(flow.status)}1A`,
                  padding: '3px 9px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4
                }
              },
                React.createElement('span', null, statusDot(flow.status)),
                React.createElement('span', null, statusLabel(flow.status))
              )
            ),
            // Mini timeline bar
            React.createElement('div', { style: { display: 'flex', gap: 2.5, height: 5 } },
              Array.from({ length: Math.min(flow.steps, 20) }).map((_, i) => {
                const errorStart = flow.steps - flow.issues;
                const isError = i >= Math.floor((errorStart / flow.steps) * Math.min(flow.steps, 20));
                return React.createElement('div', {
                  key: i,
                  style: {
                    height: 5, flex: 1, borderRadius: 3,
                    background: isError
                      ? `${t.danger}90`
                      : `${statusColor(flow.status)}55`
                  }
                });
              })
            )
          )
        )
      ),

      React.createElement('div', { style: { height: 24 } })
    );
  }

  // ===== RECORD SCREEN =====
  function RecordScreen() {
    const [isRecording, setIsRecording] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [steps, setSteps] = useState([]);
    const [showAnnotate, setShowAnnotate] = useState(false);
    const scrollRef = useRef(null);
    const intervalRef = useRef(null);
    const stepIntervalRef = useRef(null);
    const stepIdxRef = useRef(0);

    const mockSteps = [
      { type: 'tap', label: 'Tap: "Add to Cart"', api: null, ms: null, delta: 0.4 },
      { type: 'api', label: 'POST /cart/items', api: '201 Created', ms: '124ms', delta: 0.8, ok: true },
      { type: 'tap', label: 'Tap: "Proceed to Checkout"', api: null, ms: null, delta: 1.3 },
      { type: 'api', label: 'GET /user/addresses', api: '200 OK', ms: '89ms', delta: 1.7, ok: true },
      { type: 'api', label: 'GET /cart/summary', api: '200 OK', ms: '210ms', delta: 2.0, ok: true },
      { type: 'api', label: 'POST /payment/validate', api: '408 Timeout', ms: '3001ms', delta: 2.6, ok: false, error: true },
      { type: 'system', label: 'Auto-retry #1 triggered', api: null, ms: null, delta: 2.8, warning: true },
      { type: 'api', label: 'POST /payment/validate', api: '200 OK', ms: '342ms', delta: 3.2, ok: true },
      { type: 'tap', label: 'Tap: "Confirm Order"', api: null, ms: null, delta: 3.6 },
      { type: 'api', label: 'POST /orders/create', api: '201 Created', ms: '187ms', delta: 4.0, ok: true },
    ];

    useEffect(() => {
      if (isRecording) {
        intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
        stepIdxRef.current = 0;
        stepIntervalRef.current = setInterval(() => {
          if (stepIdxRef.current < mockSteps.length) {
            const step = { ...mockSteps[stepIdxRef.current], id: stepIdxRef.current };
            setSteps(prev => [...prev, step]);
            stepIdxRef.current++;
          } else {
            clearInterval(stepIntervalRef.current);
          }
        }, 650);
      } else {
        clearInterval(intervalRef.current);
        clearInterval(stepIntervalRef.current);
      }
      return () => {
        clearInterval(intervalRef.current);
        clearInterval(stepIntervalRef.current);
      };
    }, [isRecording]);

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [steps]);

    const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

    const stepColor = (step) => {
      if (step.error) return t.danger;
      if (step.warning) return t.warning;
      if (step.type === 'api' && step.ok) return t.primary;
      if (step.type === 'system') return t.accent;
      return t.success;
    };

    const StepIcon = (step) => {
      if (step.type === 'api') return window.lucide.Globe;
      if (step.type === 'system') return window.lucide.Zap;
      return window.lucide.MousePointerClick;
    };

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', padding: '0 16px' }
    },
      // Header
      React.createElement('div', { style: { paddingTop: 18, marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 3 } }, 'Live Capture'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('div', {
            style: {
              width: 7, height: 7, borderRadius: 4,
              background: isRecording ? t.success : t.textMuted
            }
          }),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted } },
            isRecording ? 'Recording — MyApp v2.4.1 (iPhone 15 Pro)' : 'Connected — MyApp v2.4.1 (iPhone 15 Pro)'
          )
        )
      ),

      // Recording Control Card
      React.createElement('div', {
        style: {
          background: isRecording ? `${t.danger}12` : t.card,
          border: `2px solid ${isRecording ? t.danger + '60' : t.border}`,
          borderRadius: 20, padding: '20px', marginBottom: 16, textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: isRecording ? `0 0 24px ${t.danger}25` : 'none'
        }
      },
        React.createElement('div', {
          style: {
            fontSize: 40, fontWeight: 700,
            color: isRecording ? t.danger : t.textMuted,
            marginBottom: 4, letterSpacing: 2, fontVariantNumeric: 'tabular-nums',
            transition: 'color 0.3s ease'
          }
        }, formatTime(elapsed)),

        React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginBottom: 18 } },
          isRecording ? `${steps.length} steps captured` : 'Tap to begin capturing user flow'
        ),

        React.createElement('div', { style: { display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => {
              if (isRecording) {
                setIsRecording(false);
              } else {
                setElapsed(0);
                setSteps([]);
                stepIdxRef.current = 0;
                setIsRecording(true);
              }
            },
            style: {
              width: 68, height: 68, borderRadius: 34,
              background: isRecording ? t.danger : t.primaryGrad,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isRecording ? `0 0 24px ${t.danger}55` : `0 4px 20px ${t.primary}45`,
              transition: 'all 0.3s ease'
            }
          },
            React.createElement(isRecording ? window.lucide.Square : window.lucide.CircleDot, { size: 30, color: '#fff' })
          ),
          isRecording && React.createElement('button', {
            onClick: () => setShowAnnotate(!showAnnotate),
            style: {
              width: 50, height: 50, borderRadius: 25,
              background: showAnnotate ? `${t.accent}30` : t.cardAlt,
              border: `1.5px solid ${showAnnotate ? t.accent : t.border}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement(window.lucide.Tag, { size: 20, color: showAnnotate ? t.accent : t.textSec })
          ),
          isRecording && React.createElement('button', {
            style: {
              width: 50, height: 50, borderRadius: 25,
              background: t.cardAlt, border: `1.5px solid ${t.border}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement(window.lucide.Flag, { size: 20, color: t.warning })
          )
        ),

        showAnnotate && isRecording && React.createElement('div', {
          style: {
            marginTop: 14, background: t.cardAlt, borderRadius: 12,
            border: `1px solid ${t.border}`, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8
          }
        },
          React.createElement(window.lucide.MessageSquare, { size: 14, color: t.textMuted }),
          React.createElement('input', {
            placeholder: 'Add annotation to this step...',
            style: {
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 12, color: t.text, fontFamily: 'Space Grotesk, sans-serif'
            }
          })
        )
      ),

      // Timeline
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 } },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 } }, 'Capture Timeline'),
        React.createElement('div', { ref: scrollRef, style: { flex: 1, overflowY: 'auto' } },
          steps.length === 0 && React.createElement('div', {
            style: { textAlign: 'center', color: t.textMuted, fontSize: 13, paddingTop: 28 }
          },
            React.createElement('div', { style: { fontSize: 36, marginBottom: 10 } }, '🎬'),
            React.createElement('div', { style: { fontWeight: 500 } }, 'Tap record to start capturing'),
            React.createElement('div', { style: { fontSize: 11, marginTop: 4 } }, 'All taps, API calls and state changes will appear here')
          ),
          steps.map((step, i) =>
            React.createElement('div', {
              key: step.id,
              style: { display: 'flex', gap: 10, marginBottom: 8 }
            },
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28 } },
                React.createElement('div', {
                  style: {
                    width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                    background: `${stepColor(step)}18`,
                    border: `1.5px solid ${stepColor(step)}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }
                },
                  React.createElement(StepIcon(step), { size: 12, color: stepColor(step) })
                ),
                i < steps.length - 1 && React.createElement('div', {
                  style: { width: 1.5, flex: 1, background: t.border, marginTop: 3, minHeight: 8 }
                })
              ),
              React.createElement('div', {
                style: {
                  flex: 1, background: t.card, borderRadius: 10, padding: '9px 12px',
                  border: `1px solid ${step.error ? t.danger + '40' : step.warning ? t.warning + '30' : t.border}`,
                  marginBottom: 0
                }
              },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text } }, step.label),
                  step.api && React.createElement('div', {
                    style: { fontSize: 10, fontWeight: 700, color: step.error ? t.danger : t.success, flexShrink: 0, marginLeft: 8 }
                  }, step.api)
                ),
                React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 3 } },
                  React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, `+${step.delta}s`),
                  step.ms && React.createElement('div', { style: { fontSize: 10, color: step.error ? t.danger : t.textMuted } }, step.ms)
                )
              )
            )
          ),
          steps.length > 0 && !isRecording && React.createElement('div', { style: { marginTop: 12 } },
            React.createElement('button', {
              onClick: () => setActiveTab('flows'),
              style: {
                width: '100%', background: t.primaryGrad, border: 'none', borderRadius: 12,
                padding: '13px', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                boxShadow: `0 4px 14px ${t.primary}40`
              }
            }, '↗ Save & View in Flow Library')
          ),
          React.createElement('div', { style: { height: 20 } })
        )
      )
    );
  }

  // ===== FLOWS SCREEN =====
  function FlowsScreen() {
    const [filter, setFilter] = useState('all');
    const [expandedFlow, setExpandedFlow] = useState(null);
    const [search, setSearch] = useState('');

    const flows = [
      {
        id: 1, name: 'Checkout Flow', status: 'anomaly', steps: 14, duration: '3.2s',
        date: 'Today', issues: 3, tags: ['payment', 'cart'],
        timeline: ['Tap Add to Cart', 'POST /cart/items', 'Tap Checkout', 'GET /addresses', 'GET /cart/summary', 'POST /payment (Timeout)', 'Retry #1', 'POST /payment (OK)', 'Tap Confirm', 'POST /orders/create']
      },
      {
        id: 2, name: 'Login → Dashboard', status: 'passing', steps: 8, duration: '1.8s',
        date: 'Today', issues: 0, tags: ['auth', 'onboarding'],
        timeline: ['Enter email', 'Enter password', 'Tap Sign In', 'POST /auth/login', 'GET /user/profile', 'GET /dashboard/data', 'Render home feed']
      },
      {
        id: 3, name: 'Payment Retry Loop', status: 'failing', steps: 22, duration: '8.7s',
        date: 'Yesterday', issues: 7, tags: ['payment', 'critical'],
        timeline: ['POST /payment', 'Timeout #1', 'Retry attempt', 'Timeout #2', 'Retry attempt', 'Timeout #3', 'Circuit breaker OPEN', 'Error screen shown']
      },
      {
        id: 4, name: 'Profile Update', status: 'passing', steps: 5, duration: '0.9s',
        date: 'Mar 21', issues: 0, tags: ['profile', 'settings'],
        timeline: ['Tap Edit Profile', 'Update fields', 'PATCH /user/profile', 'GET /user/profile', 'Success toast']
      },
      {
        id: 5, name: 'Image Upload Fail', status: 'failing', steps: 10, duration: '5.1s',
        date: 'Mar 20', issues: 4, tags: ['upload', 'storage'],
        timeline: ['Tap upload', 'Select image', 'POST /storage/upload', '500 Internal Error', 'Memory spike 340MB', 'Crash on older device']
      },
    ];

    const statusColor = (s) => s === 'passing' ? t.success : s === 'failing' ? t.danger : t.warning;

    const filtered = flows.filter(f => {
      const matchFilter = filter === 'all' || f.status === filter;
      const matchSearch = search === '' || f.name.toLowerCase().includes(search.toLowerCase()) || f.tags.some(tag => tag.includes(search.toLowerCase()));
      return matchFilter && matchSearch;
    });

    const isError = (step) => step.toLowerCase().includes('timeout') || step.toLowerCase().includes('fail') || step.toLowerCase().includes('error') || step.toLowerCase().includes('crash') || step.toLowerCase().includes('500');
    const isWarn = (step) => step.toLowerCase().includes('retry') || step.toLowerCase().includes('spike') || step.toLowerCase().includes('circuit');

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', padding: '0 16px' }
    },
      // Header
      React.createElement('div', { style: { paddingTop: 18, marginBottom: 14 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Flow Library'),
        // Search
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 8,
            background: t.card, borderRadius: 12, padding: '9px 14px',
            border: `1px solid ${t.border}`, marginBottom: 12
          }
        },
          React.createElement(window.lucide.Search, { size: 14, color: t.textMuted }),
          React.createElement('input', {
            value: search,
            onChange: e => setSearch(e.target.value),
            placeholder: 'Search flows or tags...',
            style: {
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 13, color: t.text, fontFamily: 'Space Grotesk, sans-serif'
            }
          })
        ),
        // Filter pills
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          ['all', 'passing', 'anomaly', 'failing'].map(f =>
            React.createElement('button', {
              key: f,
              onClick: () => setFilter(f),
              style: {
                background: filter === f ? t.primaryGrad : t.card,
                border: `1px solid ${filter === f ? 'transparent' : t.border}`,
                borderRadius: 20, padding: '6px 14px', cursor: 'pointer',
                fontSize: 11, fontWeight: 700,
                color: filter === f ? '#fff' : t.textSec,
                fontFamily: 'Space Grotesk, sans-serif',
                textTransform: 'capitalize', transition: 'all 0.2s ease'
              }
            }, f === 'all' ? `All (${flows.length})` : f.charAt(0).toUpperCase() + f.slice(1))
          )
        )
      ),

      // Flow list
      React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
        filtered.map(flow =>
          React.createElement('div', { key: flow.id, style: { marginBottom: 10 } },
            React.createElement('div', {
              onClick: () => setExpandedFlow(expandedFlow === flow.id ? null : flow.id),
              style: {
                background: t.card, borderRadius: 16, padding: '14px 16px',
                border: `1px solid ${expandedFlow === flow.id ? t.primary + '40' : t.border}`,
                cursor: 'pointer', transition: 'border 0.2s ease',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)'
              }
            },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }
              },
                React.createElement('div', { style: { flex: 1, paddingRight: 8 } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 } }, flow.name),
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${flow.steps} steps • ${flow.duration} • ${flow.date}`)
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 } },
                  React.createElement('div', {
                    style: {
                      fontSize: 10, fontWeight: 700, color: statusColor(flow.status),
                      background: `${statusColor(flow.status)}18`,
                      padding: '3px 9px', borderRadius: 8, textTransform: 'uppercase'
                    }
                  }, flow.status),
                  flow.issues > 0 && React.createElement('div', {
                    style: { fontSize: 10, color: t.danger, fontWeight: 600 }
                  }, `${flow.issues} issues`)
                )
              ),
              // Tags
              React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 10 } },
                flow.tags.map(tag =>
                  React.createElement('div', {
                    key: tag,
                    style: {
                      fontSize: 10, color: t.textMuted, background: t.cardAlt,
                      border: `1px solid ${t.border}`, borderRadius: 6, padding: '2px 8px', fontWeight: 500
                    }
                  }, `#${tag}`)
                )
              ),
              // Timeline bar
              React.createElement('div', { style: { display: 'flex', gap: 2 } },
                flow.timeline.map((step, i) =>
                  React.createElement('div', {
                    key: i,
                    style: {
                      height: 5, flex: 1, borderRadius: 3,
                      background: isError(step) ? `${t.danger}90` : isWarn(step) ? `${t.warning}80` : `${statusColor(flow.status)}55`
                    }
                  })
                )
              ),

              // Expanded
              expandedFlow === flow.id && React.createElement('div', {
                style: { marginTop: 14, borderTop: `1px solid ${t.border}`, paddingTop: 14 }
              },
                React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 } }, 'Step Trace'),
                flow.timeline.map((step, i) =>
                  React.createElement('div', {
                    key: i,
                    style: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 7 }
                  },
                    React.createElement('div', {
                      style: {
                        width: 20, height: 20, borderRadius: 10,
                        background: isError(step) ? `${t.danger}20` : isWarn(step) ? `${t.warning}20` : t.cardAlt,
                        border: `1px solid ${isError(step) ? t.danger + '50' : isWarn(step) ? t.warning + '50' : t.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, color: t.textMuted, flexShrink: 0, fontWeight: 700
                      }
                    }, i + 1),
                    React.createElement('div', {
                      style: {
                        fontSize: 12, fontWeight: 500,
                        color: isError(step) ? t.danger : isWarn(step) ? t.warning : t.textSec
                      }
                    }, step)
                  )
                ),
                React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 14 } },
                  React.createElement('button', {
                    style: {
                      flex: 1, background: t.primaryGrad, border: 'none', borderRadius: 10,
                      padding: '11px', fontSize: 12, fontWeight: 700, color: '#fff',
                      cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif'
                    }
                  }, '↗ Share Replay'),
                  React.createElement('button', {
                    style: {
                      flex: 1, background: t.cardAlt, border: `1px solid ${t.border}`,
                      borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700,
                      color: t.text, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif'
                    }
                  }, '⚡ Gen Test Case')
                )
              )
            )
          )
        ),
        React.createElement('div', { style: { height: 20 } })
      )
    );
  }

  // ===== INSIGHTS SCREEN =====
  function InsightsScreen() {
    const [activeInsight, setActiveInsight] = useState(null);

    const metrics = [
      { label: 'Avg Flow Duration', value: '2.8s', trend: '+12%', bad: true },
      { label: 'API Error Rate', value: '4.2%', trend: '-2.1%', bad: false },
      { label: 'Retry Events', value: '18', trend: '+5', bad: true },
      { label: 'P95 Latency', value: '1.4s', trend: '-0.3s', bad: false },
    ];

    const anomalies = [
      {
        id: 1, title: 'Payment Timeout Loop', severity: 'critical',
        description: 'POST /payment retried 3× in 8.7s. Circuit breaker triggered after third failure. Users dropped at checkout.',
        flow: 'Payment Retry Loop', count: 7, icon: '💳'
      },
      {
        id: 2, title: 'Slow Checkout Init', severity: 'warning',
        description: 'GET /checkout takes avg 1.4s (p99: 3.2s). Exceeds 1s threshold. Noticeable lag before checkout renders.',
        flow: 'Checkout Flow', count: 3, icon: '🐢'
      },
      {
        id: 3, title: 'Auth Token Race Condition', severity: 'warning',
        description: 'Concurrent auth requests detected within 200ms window on cold start. Possible duplicate session creation.',
        flow: 'Login → Dashboard', count: 2, icon: '⚡'
      },
      {
        id: 4, title: 'Upload Memory Spike', severity: 'critical',
        description: 'Memory spikes to 340MB during image upload. Causes OOM crash on devices with 3GB RAM or less.',
        flow: 'Image Upload Fail', count: 4, icon: '💥'
      },
    ];

    const sevColor = (s) => s === 'critical' ? t.danger : t.warning;

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', padding: '0 16px' }
    },
      React.createElement('div', { style: { paddingTop: 18, marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 2 } }, 'Insights'),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted } }, 'Last 7 days • 24 flows analyzed')
      ),

      // Metrics grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 } },
        metrics.map((m, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: '14px 16px',
              border: `1px solid ${t.border}`,
              boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)'
            }
          },
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500, marginBottom: 8 } }, m.label),
            React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 4 } }, m.value),
            React.createElement('div', {
              style: {
                fontSize: 11, fontWeight: 700,
                color: m.bad ? t.danger : t.success,
                display: 'flex', alignItems: 'center', gap: 3
              }
            },
              React.createElement(m.bad ? window.lucide.TrendingUp : window.lucide.TrendingDown, { size: 12, color: m.bad ? t.danger : t.success }),
              m.trend
            )
          )
        )
      ),

      // Anomaly Feed
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Anomaly Feed'),
          React.createElement('div', {
            style: {
              fontSize: 11, fontWeight: 700, color: t.danger,
              background: `${t.danger}18`, padding: '3px 9px', borderRadius: 8
            }
          }, `${anomalies.length} active`)
        ),

        anomalies.map(a =>
          React.createElement('div', {
            key: a.id,
            onClick: () => setActiveInsight(activeInsight === a.id ? null : a.id),
            style: {
              background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
              border: `1px solid ${activeInsight === a.id ? sevColor(a.severity) + '60' : t.border}`,
              borderLeft: `3px solid ${sevColor(a.severity)}`,
              cursor: 'pointer', transition: 'border 0.2s ease',
              boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)'
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center', flex: 1 } },
                React.createElement('div', { style: { fontSize: 20 } }, a.icon),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, a.title),
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 1 } }, `↳ ${a.flow}`)
                )
              ),
              React.createElement('div', {
                style: {
                  fontSize: 10, fontWeight: 700, color: sevColor(a.severity),
                  background: `${sevColor(a.severity)}18`, padding: '3px 9px', borderRadius: 8,
                  textTransform: 'uppercase', flexShrink: 0
                }
              }, a.severity)
            ),

            activeInsight === a.id && React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 12, color: t.textSec, lineHeight: 1.6, marginBottom: 12 } }, a.description),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', {
                  style: {
                    fontSize: 11, color: t.primary, fontWeight: 600,
                    background: `${t.primary}18`, padding: '3px 9px', borderRadius: 6
                  }
                }, `${a.count} occurrences in 7d`),
                React.createElement('button', {
                  style: {
                    background: t.primaryGrad, border: 'none', borderRadius: 8,
                    padding: '7px 12px', fontSize: 11, fontWeight: 700, color: '#fff',
                    cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif'
                  }
                }, 'Create Test Case →')
              )
            ),

            activeInsight !== a.id && React.createElement('div', { style: { fontSize: 11, color: t.textMuted } },
              `${a.count} occurrences — tap to expand`
            )
          )
        )
      ),

      React.createElement('div', { style: { height: 24 } })
    );
  }

  // ===== SETTINGS SCREEN =====
  function SettingsScreen() {
    const [notifs, setNotifs] = useState(true);
    const [autoShare, setAutoShare] = useState(false);
    const [compression, setCompression] = useState(true);
    const [autoAnnotate, setAutoAnnotate] = useState(true);

    const Toggle = ({ value, onChange }) =>
      React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 46, height: 26, borderRadius: 13,
          background: value ? t.primaryGradHoriz : t.cardAlt,
          border: `1.5px solid ${value ? t.primary : t.border}`,
          cursor: 'pointer', position: 'relative', transition: 'all 0.25s ease', flexShrink: 0
        }
      },
        React.createElement('div', {
          style: {
            width: 20, height: 20, borderRadius: 10, background: '#fff',
            position: 'absolute', top: 1, left: value ? 22 : 1,
            transition: 'left 0.25s ease',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
          }
        })
      );

    const connectedApps = [
      { name: 'MyApp iOS', version: 'v2.4.1', device: 'iPhone 15 Pro', status: 'connected', color: '#555' },
      { name: 'MyApp Android', version: 'v2.3.9', device: 'Pixel 8', status: 'disconnected', color: '#3DDC84' },
    ];

    const settingGroups = [
      {
        title: 'Capture',
        items: [
          { label: 'Anomaly Notifications', sub: 'Alert when issues are detected', value: notifs, onChange: setNotifs },
          { label: 'Auto-Annotate API Calls', sub: 'Tag requests automatically', value: autoAnnotate, onChange: setAutoAnnotate },
          { label: 'Auto-Share on Stop', sub: 'Generate link when recording ends', value: autoShare, onChange: setAutoShare },
          { label: 'Compress Recordings', sub: 'Reduce storage for long flows', value: compression, onChange: setCompression },
        ]
      }
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', padding: '0 16px' }
    },
      // Profile header
      React.createElement('div', { style: { paddingTop: 18, marginBottom: 18 } },
        React.createElement('div', {
          style: {
            background: t.primaryGrad, borderRadius: 20, padding: '20px',
            display: 'flex', alignItems: 'center', gap: 16,
            boxShadow: `0 8px 24px ${isDark ? 'rgba(0,201,255,0.25)' : 'rgba(0,153,204,0.18)'}`
          }
        },
          React.createElement('div', {
            style: {
              width: 54, height: 54, borderRadius: 27,
              background: 'rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
            }
          }, '👨‍💻'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 3 } }, 'Alex Chen'),
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.72)', marginBottom: 3 } }, 'alex@acmecorp.dev'),
            React.createElement('div', {
              style: {
                fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.18)', padding: '2px 9px', borderRadius: 8, display: 'inline-block'
              }
            }, 'Pro Plan • 24/50 flows')
          )
        )
      ),

      // Appearance
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: '14px 16px',
          marginBottom: 12, border: `1px solid ${t.border}`,
          boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)'
        }
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 } }, 'Appearance'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: isDark ? `${t.accent}25` : `${t.warning}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: isDark ? t.accent : t.warning })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, isDark ? 'Dark Mode' : 'Light Mode'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Switch app appearance')
            )
          ),
          React.createElement(Toggle, { value: isDark, onChange: setIsDark })
        )
      ),

      // Settings groups
      settingGroups.map((group, gi) =>
        React.createElement('div', {
          key: gi,
          style: {
            background: t.card, borderRadius: 16, padding: '14px 16px',
            marginBottom: 12, border: `1px solid ${t.border}`,
            boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)'
          }
        },
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 } }, group.title),
          group.items.map((pref, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: i < group.items.length - 1 ? 14 : 0,
                marginBottom: i < group.items.length - 1 ? 14 : 0,
                borderBottom: i < group.items.length - 1 ? `1px solid ${t.border}` : 'none'
              }
            },
              React.createElement('div', { style: { flex: 1, paddingRight: 12 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 500, color: t.text, marginBottom: 2 } }, pref.label),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, pref.sub)
              ),
              React.createElement(Toggle, { value: pref.value, onChange: pref.onChange })
            )
          )
        )
      ),

      // Connected Apps
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: '14px 16px',
          marginBottom: 12, border: `1px solid ${t.border}`,
          boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)'
        }
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 } }, 'Connected Apps'),
        connectedApps.map((app, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: i < connectedApps.length - 1 ? 14 : 0,
              marginBottom: i < connectedApps.length - 1 ? 14 : 0,
              borderBottom: i < connectedApps.length - 1 ? `1px solid ${t.border}` : 'none'
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: {
                  width: 34, height: 34, borderRadius: 10, background: t.cardAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                }
              }, app.name.includes('iOS') ? '📱' : '🤖'),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, app.name),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${app.version} • ${app.device}`)
              )
            ),
            React.createElement('div', {
              style: {
                fontSize: 10, fontWeight: 700,
                color: app.status === 'connected' ? t.success : t.textMuted,
                background: app.status === 'connected' ? `${t.success}18` : t.cardAlt,
                padding: '3px 9px', borderRadius: 8, textTransform: 'uppercase'
              }
            }, app.status)
          )
        ),
        React.createElement('button', {
          style: {
            marginTop: 14, width: '100%', background: 'none',
            border: `1.5px dashed ${t.border}`, borderRadius: 10, padding: '11px',
            fontSize: 12, fontWeight: 600, color: t.textMuted, cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif'
          }
        }, '+ Connect New App')
      ),

      // Version info
      React.createElement('div', {
        style: { textAlign: 'center', padding: '8px 0 28px' }
      },
        React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'FlowForge v1.0.0-beta'),
        React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 3 } }, 'Turn app chaos into testable flows.')
      )
    );
  }

  // ===== NAVIGATION CONFIG =====
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'record', label: 'Record', icon: window.lucide.CircleDot },
    { id: 'flows', label: 'Flows', icon: window.lucide.GitBranch },
    { id: 'insights', label: 'Insights', icon: window.lucide.Zap },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    record: RecordScreen,
    flows: FlowsScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  // ===== ROOT RENDER =====
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: isDark ? '#0D0F1A' : '#C8D4F0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif",
      padding: '20px',
      transition: 'background 0.4s ease'
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      input::placeholder { color: #4A587A; }
      button, input { font-family: 'Space Grotesk', sans-serif; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 55, overflow: 'hidden',
        boxShadow: isDark
          ? '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)'
          : '0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column', position: 'relative',
        border: isDark ? '8px solid #12161F' : '8px solid #BCC8E0',
        transition: 'background 0.3s ease, border 0.3s ease'
      }
    },

      // Status bar
      React.createElement('div', {
        style: {
          background: t.statusBg, height: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: 24, paddingRight: 20, flexShrink: 0, position: 'relative'
        }
      },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, letterSpacing: 0.2, zIndex: 1 } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: {
            width: 126, height: 36, background: '#000',
            borderRadius: 20, position: 'absolute',
            left: '50%', transform: 'translateX(-50%)', top: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }
        },
          React.createElement('div', { style: { width: 10, height: 10, borderRadius: 5, background: '#1C1C1E' } }),
          React.createElement('div', { style: { width: 12, height: 12, borderRadius: 6, background: '#1C1C1E' } })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center', zIndex: 1 } },
          React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
            React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text } }, '87'),
            React.createElement(window.lucide.Battery, { size: 16, color: t.text })
          )
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(screens[activeTab])
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          paddingBottom: 20, paddingTop: 6, display: 'flex',
          justifyContent: 'space-around', alignItems: 'flex-end',
          flexShrink: 0, transition: 'background 0.3s ease'
        }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const isRecord = tab.id === 'record';

          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, cursor: 'pointer', padding: '4px 10px',
              opacity: isActive && !isRecord ? 1 : isRecord ? 1 : 0.45,
              transition: 'all 0.2s ease', minWidth: 56
            }
          },
            isRecord
              ? React.createElement('div', {
                  style: {
                    width: 50, height: 50, borderRadius: 25,
                    background: isActive ? t.primaryGrad : `${t.primary}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: -22,
                    boxShadow: isActive ? `0 4px 18px ${t.primary}60` : 'none',
                    border: `2px solid ${isActive ? 'transparent' : t.primary + '60'}`,
                    transition: 'all 0.25s ease'
                  }
                },
                  React.createElement(tab.icon, { size: 22, color: isActive ? '#fff' : t.primary })
                )
              : React.createElement('div', {
                  style: {
                    width: 36, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 10,
                    background: isActive ? `${t.primary}18` : 'transparent',
                    transition: 'background 0.2s ease'
                  }
                },
                  React.createElement(tab.icon, { size: 20, color: isActive ? t.primary : t.textMuted })
                ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: isActive ? 700 : 500,
                color: isActive ? t.primary : t.textMuted,
                marginTop: isRecord ? 4 : 0,
                transition: 'color 0.2s ease'
              }
            }, tab.label)
          );
        })
      )
    )
  );
}
