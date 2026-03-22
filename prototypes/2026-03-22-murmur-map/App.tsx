const { useState, useEffect, useRef } = React;

function App() {
  const globalStyle = React.createElement('style', { key: 'gs' }, `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Space Grotesk', sans-serif; }
    ::-webkit-scrollbar { display: none; }
    @keyframes pulseRing1 { 0%,100% { transform: scale(1); opacity: 0.55; } 50% { transform: scale(1.65); opacity: 0; } }
    @keyframes pulseRing2 { 0%,100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(2.1); opacity: 0; } }
    @keyframes waveBeat { 0%,100% { transform: scaleY(0.25); } 50% { transform: scaleY(1); } }
    @keyframes slideUp { from { transform: translateY(18px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes spinArc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
    .pr1 { animation: pulseRing1 2.2s ease-in-out infinite; }
    .pr2 { animation: pulseRing2 2.2s ease-in-out infinite 0.45s; }
    .wb { transform-origin: bottom center; animation: waveBeat 0.75s ease-in-out infinite; }
    .wb:nth-child(1)  { animation-delay: 0s; }
    .wb:nth-child(2)  { animation-delay: 0.08s; }
    .wb:nth-child(3)  { animation-delay: 0.16s; }
    .wb:nth-child(4)  { animation-delay: 0.24s; }
    .wb:nth-child(5)  { animation-delay: 0.12s; }
    .wb:nth-child(6)  { animation-delay: 0.20s; }
    .wb:nth-child(7)  { animation-delay: 0.04s; }
    .wb:nth-child(8)  { animation-delay: 0.18s; }
    .wb:nth-child(9)  { animation-delay: 0.06s; }
    .wb:nth-child(10) { animation-delay: 0.22s; }
    .wb:nth-child(11) { animation-delay: 0.10s; }
    .wb:nth-child(12) { animation-delay: 0.14s; }
    .wb:nth-child(13) { animation-delay: 0.02s; }
    .slideUp { animation: slideUp 0.38s ease-out; }
    .spin { animation: spinArc 1s linear infinite; }
    .blink { animation: blink 1.2s ease-in-out infinite; }
  `);

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [recordState, setRecordState] = useState('idle');
  const [recordTimer, setRecordTimer] = useState(0);
  const [selectedSound, setSelectedSound] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const timerRef = useRef(null);

  const themes = {
    dark: {
      bg: '#07071A',
      surface: '#0D0D20',
      card: '#141428',
      cardAlt: '#1A1A32',
      border: '#22223A',
      primary: '#8B3DFF',
      primaryDim: '#6B1FDD',
      primaryGlow: 'rgba(139,61,255,0.32)',
      accent: '#00DCBC',
      accentGlow: 'rgba(0,220,188,0.22)',
      text: '#EEEEFF',
      textSub: '#7777AA',
      textMuted: '#3C3C60',
      danger: '#FF4455',
      dangerBg: 'rgba(255,68,85,0.14)',
      warning: '#FFAA22',
      warningBg: 'rgba(255,170,34,0.14)',
      success: '#00DCBC',
      successBg: 'rgba(0,220,188,0.12)',
      info: '#3388FF',
      infoBg: 'rgba(51,136,255,0.12)',
      navBg: '#09091C',
    },
    light: {
      bg: '#EAEAF8',
      surface: '#F6F6FF',
      card: '#FFFFFF',
      cardAlt: '#F2F2FE',
      border: '#DCDCF0',
      primary: '#7B28EF',
      primaryDim: '#6010CF',
      primaryGlow: 'rgba(123,40,239,0.14)',
      accent: '#00A890',
      accentGlow: 'rgba(0,168,144,0.14)',
      text: '#16163A',
      textSub: '#50507A',
      textMuted: '#9090B8',
      danger: '#CC2233',
      dangerBg: 'rgba(204,34,51,0.1)',
      warning: '#CC8800',
      warningBg: 'rgba(204,136,0,0.1)',
      success: '#008866',
      successBg: 'rgba(0,136,102,0.1)',
      info: '#1155CC',
      infoBg: 'rgba(17,85,204,0.1)',
      navBg: '#FFFFFF',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const sounds = [
    {
      id: 1,
      title: 'Rhythmic Metallic Tapping',
      source: 'HVAC Expansion',
      urgency: 'low',
      time: '2:14 AM',
      date: 'Today',
      location: 'Bedroom',
      coords: { x: 55, y: 36 },
      confidence: 87,
      category: 'hvac',
      description: 'Thermal expansion in HVAC ductwork. Metal expands when the system activates and contracts as it cools, producing a rhythmic tapping that is typically harmless.',
      nextSteps: ['Monitor if tapping correlates with AC startup', 'Schedule routine HVAC check', 'Insulate exposed ducts to reduce expansion noise'],
      duration: '0:08',
    },
    {
      id: 2,
      title: 'Low-Frequency Buzzing',
      source: 'Transformer / Ballast',
      urgency: 'monitor',
      time: '8:30 AM',
      date: 'Today',
      location: 'Home Office',
      coords: { x: 70, y: 52 },
      confidence: 73,
      category: 'electrical',
      description: 'Consistent 60Hz hum pattern indicating a nearby electrical transformer or aging fluorescent ballast fixture cycling on.',
      nextSteps: ['Locate nearest transformer or light fixture', 'Replace fluorescent ballast if accessible', 'Report to facilities if in a commercial building'],
      duration: '0:12',
    },
    {
      id: 3,
      title: 'Intermittent Clicking',
      source: 'Pest Activity',
      urgency: 'high',
      time: '11:45 PM',
      date: 'Yesterday',
      location: 'Kitchen',
      coords: { x: 34, y: 60 },
      confidence: 68,
      category: 'wildlife',
      description: 'Irregular clicking and scratching pattern consistent with wood-boring beetle activity or rodent movement in wall cavities.',
      nextSteps: ['Contact pest control immediately', 'Seal visible entry gaps at baseboards', 'Document timing — nightly bursts suggest rodents'],
      duration: '0:09',
    },
    {
      id: 4,
      title: 'Repetitive Whooping',
      source: 'Water Hammer',
      urgency: 'monitor',
      time: '6:15 AM',
      date: 'Yesterday',
      location: 'Bathroom',
      coords: { x: 46, y: 70 },
      confidence: 91,
      category: 'plumbing',
      description: 'Classic water hammer from sudden pipe pressure changes. Common when appliances like washing machines shut off water flow abruptly.',
      nextSteps: ['Install water hammer arrestors on supply lines', 'Check pressure reducing valve setting', 'Not urgent — schedule a plumber visit within the month'],
      duration: '0:07',
    },
    {
      id: 5,
      title: 'High-Pitched Whine',
      source: 'Fan Bearing Failure',
      urgency: 'high',
      time: '3:00 PM',
      date: '2 days ago',
      location: 'Living Room',
      coords: { x: 62, y: 42 },
      confidence: 82,
      category: 'hvac',
      description: 'Bearing wear in the HVAC blower motor. The whine worsens progressively and will eventually cause complete motor failure if not addressed.',
      nextSteps: ['Call HVAC technician within a week', 'Reduce system load — avoid maximum speed', 'Prepare for bearing replacement or full motor swap'],
      duration: '0:15',
    },
    {
      id: 6,
      title: 'Scratching Wall Pattern',
      source: 'Rodent Activity',
      urgency: 'high',
      time: '1:30 AM',
      date: '3 days ago',
      location: 'Bedroom Wall',
      coords: { x: 27, y: 44 },
      confidence: 79,
      category: 'wildlife',
      description: 'Scratching and scurrying sounds consistent with mouse or rat activity in the wall cavity. Common near kitchen and utility runs.',
      nextSteps: ['Set snap traps along wall baseboards tonight', 'Call licensed exterminator', 'Inspect exterior for entry gaps larger than 6mm'],
      duration: '0:11',
    },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'hvac', label: 'HVAC' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'wildlife', label: 'Wildlife' },
  ];

  const urgencyConfig = {
    low:     { color: t.success,  bg: t.successBg,  label: 'Low Priority' },
    monitor: { color: t.warning,  bg: t.warningBg,  label: 'Monitor' },
    high:    { color: t.danger,   bg: t.dangerBg,   label: 'Act Now' },
  };

  const categoryColors = {
    hvac:       t.info,
    plumbing:   '#3399FF',
    electrical: t.warning,
    wildlife:   '#77CC33',
    structural: '#FF8844',
  };

  const startRec = () => {
    setRecordState('recording');
    setRecordTimer(0);
    timerRef.current = setInterval(() => {
      setRecordTimer(p => {
        const next = parseFloat((p + 0.1).toFixed(1));
        if (next >= 10) {
          clearInterval(timerRef.current);
          triggerAnalysis();
          return 10;
        }
        return next;
      });
    }, 100);
  };

  const stopRec = () => {
    clearInterval(timerRef.current);
    triggerAnalysis();
  };

  const triggerAnalysis = () => {
    setRecordState('analyzing');
    setTimeout(() => {
      setSelectedSound(sounds[Math.floor(Math.random() * sounds.length)]);
      setRecordState('result');
    }, 2800);
  };

  const resetRec = () => {
    clearInterval(timerRef.current);
    setRecordState('idle');
    setRecordTimer(0);
    setSelectedSound(null);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const filteredSounds = activeCategory === 'all' ? sounds : sounds.filter(s => s.category === activeCategory);

  // ─── STATUS BAR ────────────────────────────────────────────────────────────
  const StatusBar = () => React.createElement('div', {
    style: {
      height: '50px', background: t.surface, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 22px', paddingTop: '8px',
      flexShrink: 0, position: 'relative',
    }
  },
    React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: t.text, zIndex: 2 } }, '9:41'),
    React.createElement('div', {
      style: {
        width: '126px', height: '34px', background: '#000', borderRadius: '20px',
        position: 'absolute', top: '9px', left: '50%', transform: 'translateX(-50%)', zIndex: 1,
      }
    }),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px', zIndex: 2 } },
      React.createElement(window.lucide.Signal, { size: 13, color: t.text }),
      React.createElement(window.lucide.Wifi, { size: 13, color: t.text }),
      React.createElement(window.lucide.Battery, { size: 15, color: t.text }),
    )
  );

  // ─── NAV BAR ───────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',     label: 'Record',   icon: window.lucide.Mic },
    { id: 'library',  label: 'Library',  icon: window.lucide.BookOpen },
    { id: 'map',      label: 'Map',      icon: window.lucide.Map },
    { id: 'reports',  label: 'Reports',  icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const NavBar = () => React.createElement('div', {
    style: {
      height: '80px', background: t.navBg, borderTop: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      paddingBottom: '14px', flexShrink: 0,
    }
  },
    tabs.map(tab => {
      const isActive = activeTab === tab.id;
      const navItemStyle = {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
        padding: '8px 10px', cursor: 'pointer', position: 'relative',
        color: isActive ? t.primary : t.textMuted,
      };
      const labelStyle = {
        fontSize: '10px', fontWeight: isActive ? '700' : '500',
        color: isActive ? t.primary : t.textMuted,
      };
      return React.createElement('div', {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        style: navItemStyle,
      },
        isActive && React.createElement('div', {
          style: {
            position: 'absolute', top: '-1px', width: '22px', height: '2px',
            background: t.primary, borderRadius: '0 0 3px 3px',
          }
        }),
        React.createElement(tab.icon, { size: 21 }),
        React.createElement('span', { style: labelStyle }, tab.label),
      );
    })
  );

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const urg = selectedSound ? urgencyConfig[selectedSound.urgency] : null;

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, overflowY: 'auto' }
    },
      React.createElement('div', { style: { padding: '16px 20px 14px', background: t.surface, flexShrink: 0 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '21px', fontWeight: '700', color: t.text } }, 'Murmur Map'),
            React.createElement('div', { style: { fontSize: '12px', color: t.textSub, marginTop: '1px' } }, 'Decode the sounds around you'),
          ),
          React.createElement('div', {
            style: {
              width: '36px', height: '36px', borderRadius: '50%',
              background: t.primaryGlow, border: `1px solid ${t.primary}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }
          },
            React.createElement(window.lucide.Bell, { size: 17, color: t.primary })
          ),
        )
      ),

      React.createElement('div', {
        style: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }
      },

        // ── IDLE STATE ──
        recordState === 'idle' && React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', marginTop: '10px', width: '100%' }
        },
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: '15px', color: t.textSub } }, 'Hear something strange?'),
            React.createElement('div', { style: { fontSize: '13px', color: t.textMuted, marginTop: '4px' } }, 'Tap record and hold it near the source'),
          ),
          React.createElement('div', { style: { position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement('div', {
              className: 'pr1',
              style: { position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', border: `2px solid ${t.primary}` }
            }),
            React.createElement('div', {
              className: 'pr2',
              style: { position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', border: `1px solid ${t.primary}` }
            }),
            React.createElement('div', {
              onClick: startRec,
              style: {
                width: '92px', height: '92px', borderRadius: '50%',
                background: `linear-gradient(140deg, ${t.primary}, ${t.primaryDim})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: `0 0 36px ${t.primaryGlow}`,
                position: 'relative', zIndex: 2,
              }
            },
              React.createElement(window.lucide.Mic, { size: 36, color: '#FFF' })
            )
          ),
          React.createElement('div', { style: { fontSize: '12px', color: t.textMuted } }, 'Records up to 10 seconds'),

          // Recent detections
          React.createElement('div', { style: { width: '100%' } },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }
            },
              React.createElement('span', { style: { fontSize: '14px', fontWeight: '700', color: t.text } }, 'Recent Detections'),
              React.createElement('span', {
                onClick: () => setActiveTab('library'),
                style: { fontSize: '12px', color: t.primary, cursor: 'pointer', fontWeight: '600' }
              }, 'See all →'),
            ),
            ...sounds.slice(0, 3).map(sound => {
              const u = urgencyConfig[sound.urgency];
              return React.createElement('div', {
                key: sound.id,
                onClick: () => { setSelectedSound(sound); setRecordState('result'); },
                style: {
                  padding: '11px 13px', background: t.card, borderRadius: '13px',
                  border: `1px solid ${t.border}`, marginBottom: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '11px',
                }
              },
                React.createElement('div', {
                  style: {
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: u.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }
                },
                  React.createElement(window.lucide.Volume2, { size: 18, color: u.color })
                ),
                React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                  React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: t.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, sound.title),
                  React.createElement('div', { style: { fontSize: '11px', color: t.textSub, marginTop: '2px' } }, `${sound.location} · ${sound.time}`),
                ),
                React.createElement('div', {
                  style: { fontSize: '10px', fontWeight: '700', color: u.color, padding: '3px 8px', background: u.bg, borderRadius: '20px', flexShrink: 0 }
                }, u.label),
              );
            }),
          ),
        ),

        // ── RECORDING STATE ──
        recordState === 'recording' && React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', marginTop: '12px', width: '100%' }
        },
          React.createElement('div', {
            className: 'blink',
            style: { display: 'flex', alignItems: 'center', gap: '7px', fontSize: '14px', fontWeight: '700', color: t.danger }
          },
            React.createElement('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: t.danger } }),
            'Listening...',
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px', height: '64px' } },
            ...[28, 44, 20, 58, 36, 52, 24, 60, 32, 48, 22, 54, 30].map((h, i) =>
              React.createElement('div', {
                key: i, className: 'wb',
                style: { width: '5px', height: `${h}px`, background: t.primary, borderRadius: '3px' }
              })
            )
          ),
          React.createElement('div', { style: { fontSize: '34px', fontWeight: '700', color: t.text, letterSpacing: '3px', fontVariantNumeric: 'tabular-nums' } },
            `${Math.floor(recordTimer)}:${String(Math.round((recordTimer % 1) * 10)).padStart(1, '0')}`
          ),
          React.createElement('div', { style: { width: '280px', height: '4px', background: t.border, borderRadius: '2px' } },
            React.createElement('div', {
              style: {
                width: `${(recordTimer / 10) * 100}%`, height: '100%',
                background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
                borderRadius: '2px', transition: 'width 0.1s linear',
              }
            })
          ),
          React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, 'Tap stop when the noise repeats'),
          React.createElement('div', {
            onClick: stopRec,
            style: {
              width: '66px', height: '66px', borderRadius: '50%', background: t.danger,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: `0 0 24px rgba(255,68,85,0.4)`, marginTop: '4px',
            }
          },
            React.createElement(window.lucide.Square, { size: 26, color: '#FFF', fill: '#FFF' })
          ),
        ),

        // ── ANALYZING STATE ──
        recordState === 'analyzing' && React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', marginTop: '20px', width: '100%' }
        },
          React.createElement('div', {
            className: 'spin',
            style: {
              width: '62px', height: '62px', borderRadius: '50%',
              border: `3px solid ${t.border}`, borderTop: `3px solid ${t.primary}`,
            }
          }),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: '17px', fontWeight: '700', color: t.text } }, 'Analyzing Sound Pattern'),
            React.createElement('div', { style: { fontSize: '13px', color: t.textSub, marginTop: '6px' } }, 'Matching frequency, rhythm, and context...'),
          ),
          React.createElement('div', { style: { width: '100%', display: 'flex', flexDirection: 'column', gap: '9px' } },
            [
              { label: 'Frequency analysis',     done: true },
              { label: 'Rhythm pattern matching', done: true },
              { label: 'Location context check',  done: false },
              { label: 'Generating diagnosis',    done: false },
            ].map((step, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 14px',
                  background: t.card, borderRadius: '11px', border: `1px solid ${t.border}`,
                }
              },
                step.done
                  ? React.createElement(window.lucide.CheckCircle, { size: 16, color: t.success })
                  : React.createElement('div', {
                      className: 'spin',
                      style: { width: '16px', height: '16px', border: `2px solid ${t.border}`, borderTop: `2px solid ${t.primary}`, borderRadius: '50%', flexShrink: 0 }
                    }),
                React.createElement('span', { style: { fontSize: '13px', color: step.done ? t.text : t.textSub } }, step.label),
              )
            )
          ),
        ),

        // ── RESULT STATE ──
        recordState === 'result' && selectedSound && React.createElement('div', {
          className: 'slideUp',
          style: { width: '100%', display: 'flex', flexDirection: 'column', gap: '13px' }
        },
          // Result card
          React.createElement('div', {
            style: {
              padding: '15px', background: t.card, borderRadius: '16px',
              border: `1px solid ${t.border}`, borderLeft: `4px solid ${urg.color}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' } },
              React.createElement('div', { style: { flex: 1, marginRight: '10px' } },
                React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: t.text } }, selectedSound.title),
                React.createElement('div', { style: { fontSize: '13px', color: t.primary, marginTop: '2px', fontWeight: '600' } }, selectedSound.source),
              ),
              React.createElement('div', {
                style: {
                  padding: '4px 10px', background: urg.bg, borderRadius: '20px',
                  fontSize: '11px', fontWeight: '700', color: urg.color, flexShrink: 0,
                }
              }, urg.label)
            ),
            React.createElement('div', { style: { fontSize: '13px', color: t.textSub, lineHeight: '1.55' } }, selectedSound.description),
            React.createElement('div', { style: { display: 'flex', gap: '14px', marginTop: '11px' } },
              React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: '3px' } },
                React.createElement(window.lucide.Activity, { size: 11, color: t.textMuted }),
                `${selectedSound.confidence}% match`
              ),
              React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: '3px' } },
                React.createElement(window.lucide.MapPin, { size: 11, color: t.textMuted }),
                selectedSound.location
              ),
            )
          ),

          // Next steps
          React.createElement('div', {
            style: { padding: '14px 15px', background: t.card, borderRadius: '16px', border: `1px solid ${t.border}` }
          },
            React.createElement('div', {
              style: { fontSize: '11px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '11px' }
            }, 'Recommended Steps'),
            ...selectedSound.nextSteps.map((step, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0',
                  borderBottom: i < selectedSound.nextSteps.length - 1 ? `1px solid ${t.border}` : 'none',
                }
              },
                React.createElement('div', {
                  style: {
                    width: '20px', height: '20px', borderRadius: '50%', background: t.primaryGlow,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px',
                  }
                },
                  React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: t.primary } }, i + 1)
                ),
                React.createElement('span', { style: { fontSize: '13px', color: t.textSub, lineHeight: '1.5' } }, step),
              )
            )
          ),

          // Action buttons
          React.createElement('div', { style: { display: 'flex', gap: '9px' } },
            React.createElement('div', {
              style: {
                flex: 1, padding: '12px', cursor: 'pointer', borderRadius: '12px',
                background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
              }
            },
              React.createElement(window.lucide.FileText, { size: 16, color: '#FFF' }),
              React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: '#FFF' } }, 'Create Report'),
            ),
            React.createElement('div', {
              style: {
                padding: '12px 14px', background: t.card, borderRadius: '12px',
                border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(window.lucide.Share2, { size: 18, color: t.primary })
            ),
            React.createElement('div', {
              onClick: resetRec,
              style: {
                padding: '12px 14px', background: t.card, borderRadius: '12px',
                border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(window.lucide.RotateCcw, { size: 18, color: t.textSub })
            ),
          ),
        ),
      )
    );
  };

  // ─── LIBRARY SCREEN ────────────────────────────────────────────────────────
  const LibraryScreen = () => React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }
  },
    React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, flexShrink: 0 } },
      React.createElement('div', { style: { fontSize: '21px', fontWeight: '700', color: t.text, marginBottom: '12px' } }, 'Sound Library'),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
          background: t.card, borderRadius: '12px', border: `1px solid ${t.border}`,
        }
      },
        React.createElement(window.lucide.Search, { size: 15, color: t.textMuted }),
        React.createElement('span', { style: { fontSize: '14px', color: t.textMuted } }, 'Search sounds...'),
      ),
    ),
    React.createElement('div', {
      style: {
        padding: '10px 20px', display: 'flex', gap: '8px', overflowX: 'auto',
        background: t.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0,
      }
    },
      categories.map(cat =>
        React.createElement('div', {
          key: cat.id,
          onClick: () => setActiveCategory(cat.id),
          style: {
            padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
            whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
            background: activeCategory === cat.id ? t.primary : t.card,
            color: activeCategory === cat.id ? '#FFF' : t.textSub,
            border: `1px solid ${activeCategory === cat.id ? t.primary : t.border}`,
          }
        }, cat.label)
      )
    ),
    React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }
    },
      filteredSounds.map(sound => {
        const u = urgencyConfig[sound.urgency];
        const catColor = categoryColors[sound.category] || t.primary;
        return React.createElement('div', {
          key: sound.id,
          style: { padding: '14px', background: t.card, borderRadius: '14px', border: `1px solid ${t.border}`, cursor: 'pointer' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '12px' } },
            React.createElement('div', {
              style: {
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${catColor}1A`, border: `1px solid ${catColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement(window.lucide.Volume2, { size: 20, color: catColor })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' } },
                React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text, flex: 1, marginRight: '8px' } }, sound.title),
                React.createElement('div', {
                  style: { padding: '2px 8px', background: u.bg, borderRadius: '20px', fontSize: '10px', fontWeight: '700', color: u.color, flexShrink: 0 }
                }, u.label),
              ),
              React.createElement('div', { style: { fontSize: '12px', color: t.primary, fontWeight: '600', marginBottom: '5px' } }, sound.source),
              React.createElement('div', { style: { fontSize: '12px', color: t.textSub, lineHeight: '1.4' } }, sound.description.slice(0, 82) + '…'),
              React.createElement('div', { style: { display: 'flex', gap: '12px', marginTop: '9px', flexWrap: 'wrap' } },
                React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: '3px' } },
                  React.createElement(window.lucide.MapPin, { size: 11, color: t.textMuted }), sound.location
                ),
                React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: '3px' } },
                  React.createElement(window.lucide.Clock, { size: 11, color: t.textMuted }), `${sound.date}, ${sound.time}`
                ),
                React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, `${sound.confidence}% match`),
              )
            )
          )
        );
      })
    )
  );

  // ─── MAP SCREEN ────────────────────────────────────────────────────────────
  const MapScreen = () => {
    const [hoveredPin, setHoveredPin] = useState(null);
    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, flexShrink: 0 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '21px', fontWeight: '700', color: t.text } }, 'Sound Map'),
            React.createElement('div', { style: { fontSize: '12px', color: t.textSub, marginTop: '1px' } }, '6 sounds near you'),
          ),
          React.createElement('div', {
            style: {
              padding: '7px 12px', background: t.card, borderRadius: '10px',
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
            }
          },
            React.createElement(window.lucide.Layers, { size: 14, color: t.textSub }),
            React.createElement('span', { style: { fontSize: '12px', color: t.textSub } }, 'Layers'),
          )
        )
      ),

      React.createElement('div', { style: { flex: 1, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', {
          style: { width: '100%', height: '100%', background: isDark ? '#0F0F2A' : '#E0E0F2', position: 'relative' }
        },
          // Grid
          ...Array.from({ length: 8 }, (_, i) => React.createElement('div', {
            key: `hg${i}`,
            style: { position: 'absolute', left: 0, right: 0, top: `${(i + 1) * 12.5}%`, height: '1px', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }
          })),
          ...Array.from({ length: 8 }, (_, i) => React.createElement('div', {
            key: `vg${i}`,
            style: { position: 'absolute', top: 0, bottom: 0, left: `${(i + 1) * 12.5}%`, width: '1px', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }
          })),

          // Roads
          React.createElement('div', {
            style: { position: 'absolute', left: '20%', right: '20%', top: '44%', height: '5px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', borderRadius: '3px' }
          }),
          React.createElement('div', {
            style: { position: 'absolute', top: '15%', bottom: '15%', left: '52%', width: '5px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', borderRadius: '3px' }
          }),
          React.createElement('div', {
            style: { position: 'absolute', left: '10%', right: '40%', top: '68%', height: '3px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: '2px' }
          }),

          // Building blocks
          ...[
            { x: 15, y: 20, w: 60, h: 40 },
            { x: 75, y: 15, w: 55, h: 50 },
            { x: 10, y: 55, w: 45, h: 35 },
            { x: 60, y: 58, w: 65, h: 42 },
            { x: 160, y: 22, w: 48, h: 38 },
            { x: 180, y: 60, w: 52, h: 44 },
          ].map((b, i) =>
            React.createElement('div', {
              key: `blk${i}`,
              style: {
                position: 'absolute', left: `${b.x}px`, top: `${b.y}px`,
                width: `${b.w}px`, height: `${b.h}px`,
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
                borderRadius: '4px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
              }
            })
          ),

          // Location dot (you)
          React.createElement('div', {
            style: {
              position: 'absolute', left: '43%', top: '46%',
              width: '30px', height: '30px', borderRadius: '50%',
              background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 18px ${t.accentGlow}, 0 0 0 6px ${t.accentGlow}`, zIndex: 10,
              transform: 'translate(-50%, -50%)',
            }
          },
            React.createElement(window.lucide.Navigation, { size: 14, color: '#FFF' })
          ),
          React.createElement('div', {
            style: {
              position: 'absolute', left: '43%', top: 'calc(46% + 20px)',
              transform: 'translateX(-50%)',
              fontSize: '10px', color: t.accent, fontWeight: '700', whiteSpace: 'nowrap', zIndex: 10,
            }
          }, 'You'),

          // Sound pins
          ...sounds.map(s => {
            const u = urgencyConfig[s.urgency];
            const isHovered = hoveredPin === s.id;
            return React.createElement('div', {
              key: s.id,
              style: { position: 'absolute', left: `${s.coords.x}%`, top: `${s.coords.y}%`, transform: 'translate(-50%, -50%)', zIndex: 5 }
            },
              React.createElement('div', {
                onMouseEnter: () => setHoveredPin(s.id),
                onMouseLeave: () => setHoveredPin(null),
                style: {
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: u.bg, border: `2px solid ${u.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  boxShadow: `0 0 14px ${u.color}66`,
                  transition: 'transform 0.2s',
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                }
              },
                React.createElement(window.lucide.Volume2, { size: 14, color: u.color })
              ),
              isHovered && React.createElement('div', {
                style: {
                  position: 'absolute', bottom: '38px', left: '50%', transform: 'translateX(-50%)',
                  background: t.card, border: `1px solid ${t.border}`, borderRadius: '8px',
                  padding: '6px 10px', whiteSpace: 'nowrap', fontSize: '11px',
                  color: t.text, fontWeight: '600', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 20,
                }
              },
                React.createElement('div', {}, s.source),
                React.createElement('div', { style: { fontSize: '10px', color: u.color, fontWeight: '700' } }, u.label)
              )
            );
          }),
        )
      ),

      // Stats footer
      React.createElement('div', {
        style: { padding: '14px 20px', background: t.surface, borderTop: `1px solid ${t.border}`, flexShrink: 0 }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around' } },
          [
            { label: 'Total',        value: String(sounds.length),                                    color: t.text    },
            { label: 'Act Now',      value: String(sounds.filter(s => s.urgency === 'high').length),   color: t.danger  },
            { label: 'Monitoring',   value: String(sounds.filter(s => s.urgency === 'monitor').length), color: t.warning },
            { label: 'Resolved',     value: '7',                                                       color: t.success },
          ].map((stat, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: '22px', fontWeight: '700', color: stat.color } }, stat.value),
              React.createElement('div', { style: { fontSize: '10px', color: t.textSub, marginTop: '2px' } }, stat.label),
            )
          )
        )
      )
    );
  };

  // ─── REPORTS SCREEN ────────────────────────────────────────────────────────
  const ReportsScreen = () => {
    const weekData = [
      { day: 'M', count: 2 }, { day: 'T', count: 1 }, { day: 'W', count: 4 },
      { day: 'T', count: 3 }, { day: 'F', count: 1 }, { day: 'S', count: 5 }, { day: 'S', count: 2 },
    ];
    const maxCount = Math.max(...weekData.map(d => d.count));

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, overflowY: 'auto' }
    },
      React.createElement('div', { style: { padding: '16px 20px 14px', background: t.surface, flexShrink: 0 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { fontSize: '21px', fontWeight: '700', color: t.text } }, 'Reports'),
          React.createElement('div', {
            style: {
              padding: '7px 13px', cursor: 'pointer', borderRadius: '10px',
              background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
              display: 'flex', alignItems: 'center', gap: '6px',
            }
          },
            React.createElement(window.lucide.Plus, { size: 14, color: '#FFF' }),
            React.createElement('span', { style: { fontSize: '12px', color: '#FFF', fontWeight: '700' } }, 'New'),
          )
        )
      ),

      React.createElement('div', {
        style: { flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }
      },
        // Weekly chart
        React.createElement('div', {
          style: { padding: '16px', background: t.card, borderRadius: '16px', border: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' } },
            React.createElement('div', {},
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '700', color: t.text } }, 'Activity This Week'),
              React.createElement('div', { style: { fontSize: '12px', color: t.textSub, marginTop: '2px' } }, '18 total detections'),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', background: t.successBg, borderRadius: '20px' } },
              React.createElement(window.lucide.TrendingUp, { size: 13, color: t.success }),
              React.createElement('span', { style: { fontSize: '12px', color: t.success, fontWeight: '700' } }, '+23%'),
            ),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: '7px', height: '72px' } },
            weekData.map((d, i) =>
              React.createElement('div', {
                key: i,
                style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }
              },
                React.createElement('div', {
                  style: {
                    width: '100%', height: `${(d.count / maxCount) * 56}px`,
                    background: i === 5 ? `linear-gradient(180deg, ${t.primary}, ${t.primaryDim})` : `${t.primary}44`,
                    borderRadius: '4px 4px 0 0', minHeight: '4px',
                  }
                }),
                React.createElement('span', { style: { fontSize: '10px', color: t.textMuted } }, d.day),
              )
            )
          )
        ),

        // Summary stat cards
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
          [
            { label: 'High Priority', value: '3', icon: window.lucide.AlertTriangle, color: t.danger,   bg: t.dangerBg   },
            { label: 'Monitoring',    value: '8', icon: window.lucide.Activity,      color: t.warning,  bg: t.warningBg  },
            { label: 'Resolved',      value: '7', icon: window.lucide.CheckCircle,   color: t.success,  bg: t.successBg  },
            { label: 'Reports Sent',  value: '4', icon: window.lucide.Share2,        color: t.info,     bg: t.infoBg     },
          ].map((stat, i) =>
            React.createElement('div', {
              key: i,
              style: { padding: '14px', background: stat.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }
            },
              React.createElement(stat.icon, { size: 20, color: stat.color }),
              React.createElement('div', {},
                React.createElement('div', { style: { fontSize: '22px', fontWeight: '700', color: stat.color } }, stat.value),
                React.createElement('div', { style: { fontSize: '11px', color: t.textSub } }, stat.label),
              )
            )
          )
        ),

        // Recent incidents
        React.createElement('div', {},
          React.createElement('div', { style: { fontSize: '14px', fontWeight: '700', color: t.text, marginBottom: '11px' } }, 'Incident Reports'),
          ...sounds.slice(0, 5).map(sound => {
            const u = urgencyConfig[sound.urgency];
            return React.createElement('div', {
              key: sound.id,
              style: {
                padding: '12px 13px', background: t.card, borderRadius: '12px',
                border: `1px solid ${t.border}`, marginBottom: '8px',
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
              }
            },
              React.createElement('div', { style: { width: '9px', height: '9px', borderRadius: '50%', background: u.color, flexShrink: 0 } }),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: t.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, sound.title),
                React.createElement('div', { style: { fontSize: '11px', color: t.textSub, marginTop: '2px' } }, `${sound.location} · ${sound.date}`),
              ),
              React.createElement(window.lucide.Download, { size: 16, color: t.textMuted }),
            );
          })
        )
      )
    );
  };

  // ─── SETTINGS SCREEN ───────────────────────────────────────────────────────
  const SettingsScreen = () => React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, overflowY: 'auto' }
  },
    React.createElement('div', { style: { padding: '16px 20px 14px', background: t.surface, flexShrink: 0 } },
      React.createElement('div', { style: { fontSize: '21px', fontWeight: '700', color: t.text } }, 'Settings'),
    ),

    React.createElement('div', { style: { flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' } },

      // Profile
      React.createElement('div', {
        style: {
          padding: '16px', background: t.card, borderRadius: '16px', border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
        }
      },
        React.createElement('div', {
          style: {
            width: '52px', height: '52px', borderRadius: '50%',
            background: `linear-gradient(140deg, ${t.primary}, ${t.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.User, { size: 24, color: '#FFF' })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: '15px', fontWeight: '700', color: t.text } }, 'Alex Martinez'),
          React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, 'alex@example.com'),
          React.createElement('div', { style: { fontSize: '11px', color: t.primary, marginTop: '2px', fontWeight: '700' } }, 'Pro Member'),
        ),
        React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }),
      ),

      // Appearance section
      React.createElement('div', {},
        React.createElement('div', {
          style: { fontSize: '11px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: '8px', paddingLeft: '4px' }
        }, 'Appearance'),
        React.createElement('div', {
          style: { background: t.card, borderRadius: '16px', border: `1px solid ${t.border}`, overflow: 'hidden' }
        },
          // Theme toggle row
          React.createElement('div', {
            style: { padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: `1px solid ${t.border}` }
          },
            React.createElement('div', {
              style: {
                width: '36px', height: '36px', borderRadius: '10px',
                background: t.primaryGlow, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: t.primary })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, 'Dark Mode'),
              React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, isDark ? 'Active — dark theme' : 'Active — light theme'),
            ),
            React.createElement('div', {
              onClick: () => setIsDark(!isDark),
              style: {
                width: '48px', height: '28px', borderRadius: '14px',
                background: isDark ? t.primary : t.border,
                position: 'relative', cursor: 'pointer', transition: 'background 0.3s',
              }
            },
              React.createElement('div', {
                style: {
                  position: 'absolute', top: '4px', left: isDark ? '24px' : '4px',
                  width: '20px', height: '20px', borderRadius: '50%', background: '#FFF',
                  transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }
              })
            ),
          ),
          React.createElement('div', {
            style: { padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }
          },
            React.createElement('div', {
              style: { width: '36px', height: '36px', borderRadius: '10px', background: t.infoBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }
            },
              React.createElement(window.lucide.Bell, { size: 18, color: t.info })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, 'Notifications'),
              React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, 'Alerts for high priority sounds'),
            ),
            React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }),
          ),
        )
      ),

      // Detection section
      React.createElement('div', {},
        React.createElement('div', {
          style: { fontSize: '11px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: '8px', paddingLeft: '4px' }
        }, 'Sound Detection'),
        React.createElement('div', {
          style: { background: t.card, borderRadius: '16px', border: `1px solid ${t.border}`, overflow: 'hidden' }
        },
          ...[
            { icon: window.lucide.Activity, label: 'Sensitivity',     sub: 'High — captures faint sounds',     color: t.success, bg: t.successBg },
            { icon: window.lucide.MapPin,   label: 'Location Access', sub: 'Always on for context clues',      color: t.info,    bg: t.infoBg    },
            { icon: window.lucide.Shield,   label: 'Privacy Mode',    sub: 'Audio processed on-device only',   color: t.warning, bg: t.warningBg },
          ].map((item, i, arr) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
              }
            },
              React.createElement('div', {
                style: { width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              },
                React.createElement(item.icon, { size: 18, color: item.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, item.label),
                React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, item.sub),
              ),
              React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }),
            )
          )
        )
      ),

      // About section
      React.createElement('div', {},
        React.createElement('div', {
          style: { background: t.card, borderRadius: '16px', border: `1px solid ${t.border}`, overflow: 'hidden' }
        },
          ...[
            { icon: window.lucide.HelpCircle, label: 'Help & Support',    sub: 'FAQs, tutorials, contact us', color: t.primary, bg: t.primaryGlow },
            { icon: window.lucide.Info,        label: 'About Murmur Map', sub: 'Version 2.4.1 · Build 418',  color: t.textSub, bg: t.cardAlt     },
          ].map((item, i, arr) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
              }
            },
              React.createElement('div', {
                style: { width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              },
                React.createElement(item.icon, { size: 18, color: item.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, item.label),
                React.createElement('div', { style: { fontSize: '12px', color: t.textSub } }, item.sub),
              ),
              React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }),
            )
          )
        )
      ),

      // Gradient accent bar at bottom
      React.createElement('div', {
        style: {
          padding: '14px 16px', borderRadius: '14px',
          background: `linear-gradient(135deg, ${t.primaryGlow}, ${t.accentGlow})`,
          border: `1px solid ${t.primary}44`,
          display: 'flex', alignItems: 'center', gap: '12px',
        }
      },
        React.createElement(window.lucide.Zap, { size: 20, color: t.primary }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.text } }, 'Upgrade to Pro Max'),
          React.createElement('div', { style: { fontSize: '11px', color: t.textSub } }, 'AI reports, unlimited history, export'),
        ),
        React.createElement('div', {
          style: {
            padding: '6px 12px', background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
            borderRadius: '20px', fontSize: '11px', fontWeight: '700', color: '#FFF', cursor: 'pointer',
          }
        }, 'Upgrade'),
      ),
    )
  );

  // ─── SCREEN REGISTRY ───────────────────────────────────────────────────────
  const screens = {
    home:     HomeScreen,
    library:  LibraryScreen,
    map:      MapScreen,
    reports:  ReportsScreen,
    settings: SettingsScreen,
  };

  // ─── ROOT RENDER ───────────────────────────────────────────────────────────
  return React.createElement(React.Fragment, {},
    globalStyle,
    React.createElement('div', {
      style: {
        minHeight: '100vh',
        background: isDark
          ? 'radial-gradient(ellipse at 30% 20%, #1A0A3A 0%, #05050F 60%)'
          : 'radial-gradient(ellipse at 30% 20%, #D8D0F0 0%, #C8C8E8 60%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px',
      }
    },
      React.createElement('div', {
        style: {
          width: '375px', height: '812px', background: t.bg, borderRadius: '44px',
          overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
          boxShadow: isDark
            ? '0 50px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.6)',
        }
      },
        React.createElement(StatusBar),
        React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
          React.createElement(screens[activeTab])
        ),
        React.createElement(NavBar),
      )
    )
  );
}
