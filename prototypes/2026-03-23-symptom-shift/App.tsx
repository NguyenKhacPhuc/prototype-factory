const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#EFF9F8',
    surface: '#FFFFFF',
    surfaceAlt: '#F0FDFC',
    card: '#FFFFFF',
    primary: '#0891B2',
    primaryLight: '#CFFAFE',
    primaryGrad: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    secondary: '#7C3AED',
    secondaryLight: '#EDE9FE',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    success: '#10B981',
    successLight: '#D1FAE5',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    text: '#0F172A',
    textSec: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    navBg: '#FFFFFF',
    statusText: '#0F172A',
    inputBg: '#F8FAFC',
  },
  dark: {
    bg: '#070D1A',
    surface: '#0D1829',
    surfaceAlt: '#111F36',
    card: '#0F1F38',
    primary: '#22D3EE',
    primaryLight: '#083344',
    primaryGrad: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
    secondary: '#A78BFA',
    secondaryLight: '#2E1065',
    accent: '#FCD34D',
    accentLight: '#451A03',
    success: '#34D399',
    successLight: '#064E3B',
    danger: '#F87171',
    dangerLight: '#450A0A',
    text: '#F1F5F9',
    textSec: '#94A3B8',
    textMuted: '#475569',
    border: '#1E3A5F',
    navBg: '#0D1829',
    statusText: '#F1F5F9',
    inputBg: '#111F36',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  const phone = {
    width: 375, height: 812,
    background: t.bg,
    borderRadius: 50,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow: '0 50px 100px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(255,255,255,0.12)',
    position: 'relative',
  };

  function StatusBar() {
    return React.createElement('div', {
      style: {
        background: t.surface,
        padding: '14px 24px 6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        flexShrink: 0,
      }
    },
      React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.statusText } }, '9:41'),
      React.createElement('div', {
        style: {
          position: 'absolute', left: '50%', top: 10,
          transform: 'translateX(-50%)',
          width: 120, height: 32,
          background: '#000',
          borderRadius: 20,
          zIndex: 10,
        }
      }),
      React.createElement('div', {
        style: { display: 'flex', gap: 5, alignItems: 'center' }
      },
        React.createElement('span', { style: { fontSize: 11, color: t.statusText } }, '●●●'),
        React.createElement('span', { style: { fontSize: 11, color: t.statusText, fontWeight: 700 } }, '100%')
      )
    );
  }

  function HomeScreen() {
    const today = [
      { time: '2:30 PM', name: 'Headache', severity: 6, icon: '🧠', tag: 'Migrating', tagColor: t.accent },
      { time: '11:00 AM', name: 'Fatigue', severity: 7, icon: '😴', tag: 'Worsening', tagColor: t.danger },
      { time: '8:15 AM', name: 'Nausea', severity: 4, icon: '🤢', tag: 'Stable', tagColor: t.success },
    ];
    const alerts = [
      { msg: 'Headache shifted — now peaks post-lunch, not morning', color: t.accent },
      { msg: 'Fatigue severity ↑ 40% since starting Medication B', color: t.danger },
    ];
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', {
        style: {
          background: t.surface,
          padding: '16px 20px 20px',
          borderBottom: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
        },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, margin: 0, fontWeight: 600, letterSpacing: '0.3px' } }, 'MON, MARCH 23'),
            React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: '2px 0 0' } }, 'Health Overview')
          ),
          React.createElement('div', {
            style: {
              width: 42, height: 42, borderRadius: 21,
              background: t.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          }, React.createElement(window.lucide.Bell, { size: 18, color: t.primary }))
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          ...[
            { label: 'Day Streak', value: '14', icon: '🔥' },
            { label: 'Logged Today', value: '3', icon: '📋' },
            { label: 'Drift Alerts', value: '2', icon: '⚡' },
          ].map((s, i) => React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              borderRadius: 16,
              padding: '12px 8px',
              textAlign: 'center',
            }
          },
            React.createElement('div', { style: { fontSize: 18, marginBottom: 4 } }, s.icon),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, lineHeight: 1 } }, s.value),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600, marginTop: 3 } }, s.label)
          ))
        )
      ),
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
        },
          React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: t.text } }, '⚡ Pattern Drifts'),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary, cursor: 'pointer' } }, 'View all →')
        ),
        alerts.map((a, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.card,
            border: `1px solid ${t.border}`,
            borderLeft: `4px solid ${a.color}`,
            borderRadius: 12,
            padding: '11px 14px',
            marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 10,
          }
        },
          React.createElement(window.lucide.AlertTriangle, { size: 14, color: a.color }),
          React.createElement('span', { style: { fontSize: 12, color: t.text, fontWeight: 500, lineHeight: 1.4 } }, a.msg)
        ))
      ),
      React.createElement('div', { style: { padding: '14px 20px 20px' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
        },
          React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: t.text } }, "Today's Symptoms"),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary, cursor: 'pointer' } }, 'Timeline →')
        ),
        today.map((s, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.card,
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            padding: '12px 14px',
            marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 42, height: 42, borderRadius: 21,
              background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }
          }, s.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }
            },
              React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, s.name),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, s.time)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', {
                style: {
                  flex: 1, height: 5, background: t.border, borderRadius: 3, overflow: 'hidden'
                }
              },
                React.createElement('div', {
                  style: {
                    width: `${s.severity * 10}%`, height: '100%', borderRadius: 3,
                    background: s.severity >= 7 ? t.danger : s.severity >= 5 ? t.accent : t.success,
                  }
                })
              ),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: 700,
                  color: s.tagColor,
                  padding: '2px 8px', borderRadius: 10,
                  background: s.tag === 'Worsening' ? t.dangerLight : s.tag === 'Migrating' ? t.accentLight : t.successLight,
                }
              }, s.tag)
            )
          )
        )),
        React.createElement('div', {
          onClick: () => setActiveTab('log'),
          style: {
            background: t.primaryGrad,
            borderRadius: 16, padding: '15px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.Plus, { size: 18, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: '#fff' } }, 'Log a Symptom')
        )
      )
    );
  }

  function LogScreen() {
    const [step, setStep] = useState(0);
    const [symptom, setSymptom] = useState('');
    const [sev, setSev] = useState(5);
    const [ctx, setCtx] = useState([]);
    const [recording, setRecording] = useState(false);
    const sevColor = sev >= 8 ? t.danger : sev >= 5 ? t.accent : t.success;
    const sevLabel = sev >= 8 ? 'Severe' : sev >= 6 ? 'Moderate' : sev >= 4 ? 'Mild' : 'Minimal';
    const quickSymptoms = [
      { n: 'Headache', e: '🧠' }, { n: 'Fatigue', e: '😴' }, { n: 'Nausea', e: '🤢' },
      { n: 'Chest Pain', e: '💔' }, { n: 'Dizziness', e: '🌀' }, { n: 'Cough', e: '😷' },
      { n: 'Fever', e: '🌡️' }, { n: 'Rash', e: '🔴' },
    ];
    const ctxOpts = [
      { l: 'After Coffee', e: '☕' }, { l: 'After Meal', e: '🍽️' }, { l: 'Poor Sleep', e: '😴' },
      { l: 'Stressed', e: '😰' }, { l: 'On Medication', e: '💊' }, { l: 'Dehydrated', e: '💧' },
      { l: 'Exercise', e: '🏃' }, { l: 'Travel', e: '✈️' },
    ];
    const hdr = (title, sub, back) => React.createElement('div', { style: { marginBottom: 20 } },
      back && React.createElement('div', {
        onClick: () => setStep(step - 1),
        style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, cursor: 'pointer' }
      },
        React.createElement(window.lucide.ChevronLeft, { size: 18, color: t.textSec }),
        React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.textSec } }, 'Back')
      ),
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' } }, title),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0, fontWeight: 500 } }, sub)
    );
    if (step === 0) return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: 20 } },
      hdr('Log Symptom', 'How are you feeling right now?', false),
      React.createElement('div', {
        onClick: () => setRecording(!recording),
        style: {
          background: recording ? `linear-gradient(135deg, ${t.danger}, #DC2626)` : t.primaryGrad,
          borderRadius: 20, padding: '18px',
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 20, cursor: 'pointer',
        }
      },
        React.createElement('div', {
          style: {
            width: 50, height: 50, borderRadius: 25,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(window.lucide.Mic, { size: 22, color: '#fff' })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: '#fff' } }, recording ? '🔴 Recording...' : 'Voice Note'),
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)' } }, recording ? 'Tap to stop & analyze' : 'Describe how you feel in your own words')
        )
      ),
      React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, margin: '0 0 10px', letterSpacing: '0.5px' } }, 'QUICK SELECT'),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 } },
        quickSymptoms.map((s, i) => React.createElement('div', {
          key: i,
          onClick: () => { setSymptom(s.n); setStep(1); },
          style: {
            padding: '8px 14px', borderRadius: 20,
            background: t.card,
            border: `1px solid ${t.border}`,
            color: t.text,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement('span', null, s.e),
          React.createElement('span', null, s.n)
        ))
      ),
      React.createElement('div', {
        style: {
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 16,
          padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
        }
      },
        React.createElement(window.lucide.Activity, { size: 16, color: t.textMuted }),
        React.createElement('input', {
          placeholder: 'Or describe your symptom...',
          value: symptom,
          onChange: e => setSymptom(e.target.value),
          style: {
            flex: 1, border: 'none', background: 'transparent',
            fontSize: 14, color: t.text, outline: 'none',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }
        })
      ),
      symptom && React.createElement('div', {
        onClick: () => setStep(1),
        style: { background: t.primaryGrad, borderRadius: 16, padding: '15px', textAlign: 'center', cursor: 'pointer' }
      }, React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: '#fff' } }, `Continue with "${symptom}" →`))
    );
    if (step === 1) return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: 20 } },
      hdr(`Rate: ${symptom}`, 'How severe is it right now? (1 = minimal, 10 = severe)', true),
      React.createElement('div', {
        style: {
          background: t.card, border: `1px solid ${t.border}`,
          borderRadius: 24, padding: '24px', marginBottom: 20, textAlign: 'center',
        }
      },
        React.createElement('div', { style: { fontSize: 64, fontWeight: 800, color: sevColor, lineHeight: 1, marginBottom: 6 } }, sev),
        React.createElement('div', {
          style: {
            display: 'inline-block',
            fontSize: 13, fontWeight: 700, color: sevColor,
            background: sev >= 8 ? t.dangerLight : sev >= 5 ? t.accentLight : t.successLight,
            padding: '4px 14px', borderRadius: 20, marginBottom: 20,
          }
        }, sevLabel),
        React.createElement('input', {
          type: 'range', min: 1, max: 10, value: sev,
          onChange: e => setSev(parseInt(e.target.value)),
          style: { width: '100%', accentColor: sevColor, height: 6 }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.textMuted, marginTop: 6 }
        },
          React.createElement('span', null, '1 · Minimal'),
          React.createElement('span', null, '10 · Severe')
        )
      ),
      React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, margin: '0 0 10px', letterSpacing: '0.5px' } }, 'ADD CONTEXT (optional)'),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 } },
        ctxOpts.map((c, i) => {
          const sel = ctx.includes(c.l);
          return React.createElement('div', {
            key: i,
            onClick: () => setCtx(sel ? ctx.filter(x => x !== c.l) : [...ctx, c.l]),
            style: {
              padding: '8px 12px', borderRadius: 20,
              background: sel ? t.secondaryLight : t.card,
              border: `1px solid ${sel ? t.secondary : t.border}`,
              color: sel ? t.secondary : t.text,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }
          },
            React.createElement('span', null, c.e),
            React.createElement('span', null, c.l)
          );
        })
      ),
      React.createElement('div', {
        onClick: () => setStep(2),
        style: { background: t.primaryGrad, borderRadius: 16, padding: '15px', textAlign: 'center', cursor: 'pointer' }
      }, React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: '#fff' } }, 'Save & Analyze →'))
    );
    return React.createElement('div', {
      style: {
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 28px', textAlign: 'center',
      }
    },
      React.createElement('div', {
        style: {
          width: 76, height: 76, borderRadius: 38,
          background: t.successLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, marginBottom: 18,
        }
      }, '✓'),
      React.createElement('h2', { style: { fontSize: 24, fontWeight: 800, color: t.text, margin: '0 0 8px' } }, 'Logged!'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '0 0 24px', lineHeight: 1.6 } },
        `${symptom} (${sevLabel}, ${sev}/10) saved with ${ctx.length} context tag${ctx.length !== 1 ? 's' : ''}.`
      ),
      React.createElement('div', {
        style: {
          background: t.card, border: `1px solid ${t.border}`,
          borderRadius: 18, padding: '16px', width: '100%', marginBottom: 16, textAlign: 'left',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
          React.createElement(window.lucide.Zap, { size: 14, color: t.primary }),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.primary, letterSpacing: '0.3px' } }, 'PATTERN UPDATE')
        ),
        React.createElement('p', { style: { fontSize: 13, color: t.text, margin: 0, lineHeight: 1.5 } },
          `This is your 4th ${symptom} this week. Severity is trending upward. Check your caffeine & hydration patterns.`
        )
      ),
      React.createElement('div', {
        onClick: () => { setStep(0); setSymptom(''); setSev(5); setCtx([]); setActiveTab('home'); },
        style: { background: t.primaryGrad, borderRadius: 16, padding: '15px', textAlign: 'center', cursor: 'pointer', width: '100%' }
      }, React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: '#fff' } }, 'Back to Dashboard'))
    );
  }

  function TimelineScreen() {
    const groups = [
      { date: 'Today', items: [
        { time: '2:30 PM', n: 'Headache', sev: 6, e: '🧠', note: 'Started after lunch, temples throbbing', tags: ['After Meal', 'Stressed'], status: 'Migrating' },
        { time: '11:00 AM', n: 'Fatigue', sev: 7, e: '😴', note: 'Heavy limbs, brain fog, hard to focus', tags: ['Poor Sleep'], status: 'Worsening' },
        { time: '8:15 AM', n: 'Nausea', sev: 4, e: '🤢', note: 'Morning before breakfast, mild', tags: ['On Medication'], status: 'Stable' },
      ]},
      { date: 'Yesterday', items: [
        { time: '9:45 PM', n: 'Headache', sev: 8, e: '🧠', note: 'Back of head, throbbing, light sensitive', tags: ['Dehydrated'], status: 'Severe' },
        { time: '3:00 PM', n: 'Fatigue', sev: 5, e: '😴', note: 'Afternoon slump, needed caffeine', tags: ['After Coffee'], status: 'Stable' },
      ]},
      { date: 'Mar 21', items: [
        { time: '7:20 PM', n: 'Rash', sev: 3, e: '🔴', note: 'Small red patch on left forearm', tags: ['New Medication'], status: 'New' },
        { time: '1:45 PM', n: 'Headache', sev: 5, e: '🧠', note: 'Post-lunch, front of head', tags: ['After Meal'], status: 'Stable' },
      ]},
    ];
    const sc = (s) => s === 'Worsening' || s === 'Severe' ? t.danger : s === 'Migrating' || s === 'New' ? t.accent : t.success;
    const sb = (s) => s === 'Worsening' || s === 'Severe' ? t.dangerLight : s === 'Migrating' || s === 'New' ? t.accentLight : t.successLight;
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', {
        style: {
          background: t.surface, padding: '16px 20px',
          borderBottom: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: 0 } }, 'Timeline'),
        React.createElement('div', {
          style: {
            background: t.primaryLight, borderRadius: 12,
            padding: '6px 12px', fontSize: 12, fontWeight: 700, color: t.primary,
            display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.Filter, { size: 12, color: t.primary }),
          React.createElement('span', null, 'All Types')
        )
      ),
      React.createElement('div', { style: { padding: '16px 20px' } },
        groups.map((g, gi) => React.createElement('div', { key: gi },
          React.createElement('div', {
            style: {
              fontSize: 11, fontWeight: 700, color: t.textMuted,
              letterSpacing: '0.5px', marginBottom: 10, marginTop: gi > 0 ? 20 : 0,
            }
          }, g.date.toUpperCase()),
          g.items.map((item, i) => React.createElement('div', {
            key: i, style: { display: 'flex', gap: 10, marginBottom: 10 }
          },
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18 } },
              React.createElement('div', {
                style: {
                  width: 10, height: 10, borderRadius: 5, flexShrink: 0,
                  background: sc(item.status), marginTop: 18,
                }
              }),
              (i < g.items.length - 1 || gi < groups.length - 1) && React.createElement('div', {
                style: { width: 2, flex: 1, background: t.border, marginTop: 4, minHeight: 16 }
              })
            ),
            React.createElement('div', {
              style: {
                flex: 1, background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 16, padding: '12px 14px',
              }
            },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', { style: { fontSize: 18 } }, item.e),
                  React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, item.n)
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginBottom: 3 } }, item.time),
                  React.createElement('span', {
                    style: {
                      fontSize: 10, fontWeight: 700, color: sc(item.status),
                      background: sb(item.status), padding: '2px 7px', borderRadius: 8,
                    }
                  }, item.status)
                )
              ),
              React.createElement('p', { style: { fontSize: 12, color: t.textSec, margin: '0 0 8px', lineHeight: 1.4 } }, item.note),
              React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 5 } },
                item.tags.map((tag, ti) => React.createElement('span', {
                  key: ti,
                  style: {
                    fontSize: 10, fontWeight: 600, color: t.primary,
                    background: t.primaryLight, padding: '2px 8px', borderRadius: 10,
                  }
                }, tag))
              )
            )
          ))
        ))
      )
    );
  }

  function InsightsScreen() {
    const [tab, setTab] = useState('patterns');
    const patterns = [
      {
        title: 'Afternoon Headache Cluster',
        desc: 'Headaches spike 3–4 PM on 6 of last 7 days. Strong correlation with caffeine drop (last coffee avg 12:30 PM).',
        icon: '🧠', confidence: 87, action: 'Try shifting last coffee to 1:30 PM', sev: 'moderate',
      },
      {
        title: 'Fatigue Post-Medication B',
        desc: 'Fatigue severity ↑ 40% on days you take Medication B. Strongest within a 2-hour window after dosage.',
        icon: '💊', confidence: 91, action: 'Discuss dosage timing with your doctor', sev: 'high',
      },
      {
        title: 'Sleep → Symptom Load',
        desc: 'Days with under 6 hrs sleep show avg 4.2 symptoms vs 1.8 on 7+ hour nights. Clearest pattern this week.',
        icon: '😴', confidence: 78, action: 'Prioritize 7+ hrs for 5 consecutive nights', sev: 'moderate',
      },
    ];
    const week = [
      { d: 'M', h: 3, f: 2 }, { d: 'T', h: 5, f: 4 }, { d: 'W', h: 7, f: 6 },
      { d: 'T', h: 6, f: 7 }, { d: 'F', h: 8, f: 7 }, { d: 'S', h: 4, f: 5 }, { d: 'S', h: 6, f: 8 },
    ];
    const exportRows = [
      { k: 'Patient', v: 'Sarah Chen, 28F' },
      { k: 'Report Period', v: 'Mar 17–23, 2026' },
      { k: 'Chief Complaints', v: 'Headache, Fatigue, Nausea' },
      { k: 'Peak Severity', v: 'Headache 8/10 (Mar 22)' },
      { k: 'Pattern Drifts', v: '2 detected this week' },
      { k: 'Medications Logged', v: 'Medication B (daily)' },
    ];
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', {
        style: { background: t.surface, padding: '16px 20px', borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 14px' } }, 'Insights'),
        React.createElement('div', {
          style: {
            display: 'flex', gap: 4, background: t.surfaceAlt,
            borderRadius: 12, padding: 4, border: `1px solid ${t.border}`,
          }
        },
          ['patterns', 'week', 'export'].map(id => React.createElement('div', {
            key: id,
            onClick: () => setTab(id),
            style: {
              flex: 1, padding: '8px 4px', borderRadius: 9,
              background: tab === id ? t.primary : 'transparent',
              color: tab === id ? '#fff' : t.textMuted,
              fontSize: 12, fontWeight: 700, textAlign: 'center', cursor: 'pointer',
              textTransform: 'capitalize',
            }
          }, id))
        )
      ),
      React.createElement('div', { style: { padding: '16px 20px' } },
        tab === 'patterns' && patterns.map((p, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 20, padding: '16px', marginBottom: 14,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('span', { style: { fontSize: 22 } }, p.icon),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, p.title),
                React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: p.confidence > 85 ? t.success : t.accent, marginTop: 2 } }, `${p.confidence}% confidence`)
              )
            ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 700,
                color: p.sev === 'high' ? t.danger : t.accent,
                background: p.sev === 'high' ? t.dangerLight : t.accentLight,
                padding: '3px 9px', borderRadius: 10,
              }
            }, p.sev.toUpperCase())
          ),
          React.createElement('p', { style: { fontSize: 13, color: t.textSec, margin: '0 0 12px', lineHeight: 1.5 } }, p.desc),
          React.createElement('div', {
            style: {
              background: t.surfaceAlt, borderRadius: 10,
              padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8,
              border: `1px solid ${t.border}`,
            }
          },
            React.createElement(window.lucide.Zap, { size: 13, color: t.primary }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.primary } }, p.action)
          )
        )),
        tab === 'week' && React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, margin: '0 0 12px', letterSpacing: '0.5px' } }, 'THIS WEEK — SYMPTOM SEVERITY'),
          React.createElement('div', {
            style: {
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: 20, padding: '20px', marginBottom: 14,
            }
          },
            React.createElement('div', {
              style: {
                display: 'flex', alignItems: 'flex-end', gap: 6,
                height: 110, borderBottom: `1px solid ${t.border}`,
                paddingBottom: 8, marginBottom: 8,
              }
            },
              week.map((d, i) => React.createElement('div', {
                key: i,
                style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 2 }
              },
                React.createElement('div', {
                  style: {
                    width: '100%', borderRadius: '4px 4px 0 0', minHeight: 4,
                    background: t.primaryGrad,
                    height: `${(d.h / 10) * 85}%`,
                  }
                }),
                React.createElement('div', {
                  style: {
                    width: '100%', borderRadius: 2, minHeight: 3, opacity: 0.55,
                    background: t.secondary,
                    height: `${(d.f / 10) * 85}%`,
                  }
                })
              ))
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              week.map((d, i) => React.createElement('div', {
                key: i, style: { flex: 1, textAlign: 'center', fontSize: 10, color: t.textMuted, fontWeight: 600 }
              }, d.d))
            ),
            React.createElement('div', { style: { display: 'flex', gap: 20, marginTop: 12, justifyContent: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('div', { style: { width: 10, height: 10, borderRadius: 2, background: t.primary } }),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, 'Headache')
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('div', { style: { width: 10, height: 10, borderRadius: 2, background: t.secondary } }),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, 'Fatigue')
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            ...[
              { l: 'Avg Severity', v: '6.1', c: '↑ 0.8', up: true },
              { l: 'Total Logs', v: '23', c: '↑ 4', up: false },
              { l: 'Symptom Types', v: '4', c: 'active', up: null },
            ].map((s, i) => React.createElement('div', {
              key: i,
              style: {
                flex: 1, background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 16, padding: '14px 10px', textAlign: 'center',
              }
            },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, s.v),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, margin: '2px 0', fontWeight: 500 } }, s.l),
              React.createElement('div', {
                style: {
                  fontSize: 10, fontWeight: 700,
                  color: s.up === null ? t.textMuted : s.up ? t.danger : t.success,
                }
              }, s.c)
            ))
          )
        ),
        tab === 'export' && React.createElement('div', null,
          React.createElement('div', {
            style: {
              background: t.primaryGrad, borderRadius: 20,
              padding: '24px', marginBottom: 16, textAlign: 'center',
            }
          },
            React.createElement('div', { style: { fontSize: 38, marginBottom: 12 } }, '📋'),
            React.createElement('h3', { style: { fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 8px' } }, 'Clinician Summary'),
            React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.82)', margin: '0 0 18px', lineHeight: 1.5 } },
              'A 7-day report with charts, patterns, context — bring it to your next appointment.'
            ),
            React.createElement('div', {
              style: {
                background: 'rgba(255,255,255,0.2)', borderRadius: 12,
                padding: '12px 20px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8, cursor: 'pointer',
              }
            },
              React.createElement(window.lucide.Download, { size: 17, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: '#fff' } }, 'Generate PDF Report')
            )
          ),
          React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, margin: '0 0 10px', letterSpacing: '0.5px' } }, 'REPORT PREVIEW'),
          exportRows.map((r, i) => React.createElement('div', {
            key: i,
            style: {
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: '11px 14px',
              marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }
          },
            React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 500 } }, r.k),
            React.createElement('span', { style: { fontSize: 12, color: t.text, fontWeight: 700 } }, r.v)
          ))
        )
      )
    );
  }

  function SettingsScreen() {
    const [notifs, setNotifs] = useState(true);
    const [driftAlerts, setDriftAlerts] = useState(true);
    const [weekly, setWeekly] = useState(false);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', {
        style: { background: t.surface, padding: '16px 20px 20px', borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 16px' } }, 'Settings'),
        React.createElement('div', {
          style: {
            background: t.surfaceAlt, borderRadius: 20, padding: '14px',
            display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 50, height: 50, borderRadius: 25,
              background: t.primaryGrad,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }
          }, '👤'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Sarah Chen'),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'sarah.chen@email.com')
          ),
          React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })
        )
      ),
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, margin: '0 0 8px', letterSpacing: '0.5px' } }, 'APPEARANCE'),
        React.createElement('div', {
          style: {
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 16, padding: '14px 16px', marginBottom: 16,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 18,
                background: isDark ? t.primaryLight : t.accentLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              isDark
                ? React.createElement(window.lucide.Moon, { size: 16, color: t.primary })
                : React.createElement(window.lucide.Sun, { size: 16, color: t.accent })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, isDark ? 'Dark Mode' : 'Light Mode'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Tap switch to toggle')
            )
          ),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 48, height: 28, borderRadius: 14,
              background: isDark ? t.primary : t.border,
              position: 'relative', cursor: 'pointer',
              transition: 'background 0.3s',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', width: 22, height: 22, borderRadius: 11,
                background: '#fff', top: 3,
                left: isDark ? 22 : 3,
                transition: 'left 0.3s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }
            })
          )
        ),
        React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, margin: '0 0 8px', letterSpacing: '0.5px' } }, 'NOTIFICATIONS'),
        React.createElement('div', {
          style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }
        },
          ...[
            { e: '🔔', l: 'Check-in Reminders', s: 'Twice daily prompts', v: notifs, set: setNotifs },
            { e: '⚡', l: 'Drift Alerts', s: 'Pattern change notifications', v: driftAlerts, set: setDriftAlerts },
            { e: '📋', l: 'Weekly Summary', s: 'Sunday evening digest', v: weekly, set: setWeekly },
          ].map((item, i, arr) => React.createElement('div', {
            key: i,
            style: {
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('span', { style: { fontSize: 16 } }, item.e),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, item.l),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, item.s)
              )
            ),
            React.createElement('div', {
              onClick: () => item.set(!item.v),
              style: {
                width: 44, height: 26, borderRadius: 13,
                background: item.v ? t.success : t.border,
                position: 'relative', cursor: 'pointer',
                transition: 'background 0.3s', flexShrink: 0,
              }
            },
              React.createElement('div', {
                style: {
                  position: 'absolute', width: 20, height: 20, borderRadius: 10,
                  background: '#fff', top: 3,
                  left: item.v ? 20 : 3,
                  transition: 'left 0.3s',
                }
              })
            )
          ))
        ),
        React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, margin: '0 0 8px', letterSpacing: '0.5px' } }, 'HEALTH PROFILE'),
        React.createElement('div', {
          style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
        },
          ...[
            { e: '💊', l: 'Medications', v: '2 active' },
            { e: '🩺', l: 'Conditions', v: 'Migraine' },
            { e: '🔬', l: 'Allergies', v: '1 logged' },
            { e: '🏥', l: 'Primary Care', v: 'Dr. Patel' },
          ].map((item, i, arr) => React.createElement('div', {
            key: i,
            style: {
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('span', { style: { fontSize: 16 } }, item.e),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, item.l)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, item.v),
              React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })
            )
          ))
        ),
        React.createElement('p', { style: { textAlign: 'center', fontSize: 11, color: t.textMuted } }, 'Symptom Shift v1.0.2 · Decode symptoms before they drift.')
      )
    );
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'log', label: 'Log', icon: window.lucide.Plus },
    { id: 'timeline', label: 'Timeline', icon: window.lucide.Clock },
    { id: 'insights', label: 'Insights', icon: window.lucide.TrendingUp },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = { home: HomeScreen, log: LogScreen, timeline: TimelineScreen, insights: InsightsScreen, settings: SettingsScreen };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#DDE3EA',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }
  },
    React.createElement('div', { style: phone },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(screens[activeTab])
      ),
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', paddingBottom: 18, paddingTop: 8, flexShrink: 0,
        }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, padding: '4px 0', cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: activeTab === tab.id ? t.primaryLight : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }
          },
            React.createElement(tab.icon, { size: 19, color: activeTab === tab.id ? t.primary : t.textMuted })
          ),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? t.primary : t.textMuted,
            }
          }, tab.label)
        ))
      )
    )
  );
}
