
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0D1F1F',
    surface: '#122929',
    surfaceAlt: '#1A3535',
    card: '#1E3F3F',
    cardAlt: '#243A2A',
    primary: '#00838F',
    primaryLight: '#00ACC1',
    accent: '#BF360C',
    accentLight: '#E64A19',
    text: '#FFF8E1',
    textMuted: '#A5C8C8',
    textDim: '#5A8A8A',
    sand: '#2A3030',
    border: '#2A4A4A',
    fab: '#00838F',
  },
  light: {
    bg: '#FFF8E1',
    surface: '#FFF3CC',
    surfaceAlt: '#FFE8A0',
    card: '#FFFDE7',
    cardAlt: '#E8F5E9',
    primary: '#00838F',
    primaryLight: '#00ACC1',
    accent: '#BF360C',
    accentLight: '#E64A19',
    text: '#1A2626',
    textMuted: '#3D6060',
    textDim: '#7A9A9A',
    sand: '#FFF8E1',
    border: '#B2DFDB',
    fab: '#00838F',
  }
};

function App() {
  const [activeScreen, setActiveScreen] = useState('garden');
  const [isDark, setIsDark] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);
  const [playingBlossom, setPlayingBlossom] = useState(null);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    * { scrollbar-width: none; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes waveFloat { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-8px) scale(1.05); } }
    @keyframes ripple { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
    @keyframes bloomIn { 0% { transform: scale(0) rotate(-180deg); opacity: 0; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fabRotate { from { transform: rotate(0deg); } to { transform: rotate(45deg); } }
  `;

  const screens = {
    garden: GardenScreen,
    seeds: SeedsScreen,
    weave: WeaveScreen,
    seasons: SeasonsScreen,
  };

  const navItems = [
    { id: 'garden', label: 'My Garden', icon: '🌸' },
    { id: 'seeds', label: 'Sonic Seeds', icon: '🌱' },
    { id: 'weave', label: 'Community Weave', icon: '🎵' },
    { id: 'seasons', label: 'Seasons', icon: '🍂' },
  ];

  const ScreenComponent = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '20px',
    }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        background: t.bg,
        borderRadius: '40px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        border: `3px solid ${t.border}`,
      }
    },
      React.createElement(ScreenComponent, { t, isDark, setIsDark, setActiveScreen, playingBlossom, setPlayingBlossom }),

      // FAB Navigation
      React.createElement('div', {
        style: { position: 'absolute', bottom: '24px', right: '20px', zIndex: 100 }
      },
        // Menu items
        fabOpen && navItems.map((item, i) =>
          React.createElement('div', {
            key: item.id,
            onClick: () => { setActiveScreen(item.id); setFabOpen(false); },
            style: {
              position: 'absolute',
              bottom: `${(i + 1) * 60}px`,
              right: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: `slideUp 0.2s ease ${i * 0.05}s both`,
              cursor: 'pointer',
            }
          },
            React.createElement('span', {
              style: {
                background: t.card,
                color: t.text,
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontFamily: 'Bebas Neue',
                letterSpacing: '1px',
                border: `2px solid ${activeScreen === item.id ? t.primary : t.border}`,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }
            }, item.label),
            React.createElement('div', {
              style: {
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: activeScreen === item.id ? t.primary : t.surfaceAlt,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: `2px solid ${activeScreen === item.id ? t.primaryLight : t.border}`,
              }
            }, item.icon)
          )
        ),

        // Main FAB button
        React.createElement('div', {
          onClick: () => setFabOpen(!fabOpen),
          style: {
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 6px 20px ${t.primary}66`,
            fontSize: '24px',
            transition: 'transform 0.3s ease',
            transform: fabOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            position: 'relative',
            zIndex: 101,
          }
        },
          fabOpen ? '✕' : '🌊'
        )
      ),

      // Theme toggle
      React.createElement('div', {
        onClick: () => setIsDark(!isDark),
        style: {
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: t.surfaceAlt,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: `2px solid ${t.border}`,
          zIndex: 99,
          fontSize: '18px',
        }
      }, isDark ? '☀️' : '🌙')
    )
  );
}

// ─── GARDEN SCREEN ───────────────────────────────────────────────────────────
function GardenScreen({ t, setActiveScreen }) {
  const [selectedBlossom, setSelectedBlossom] = useState(null);

  const blossoms = [
    { id: 1, name: 'Rain Shimmer', color: '#00838F', shape: '◆', desc: 'Gentle patter on glass', duration: '0:32', earned: 'Day 1' },
    { id: 2, name: 'Ember Hum', color: '#BF360C', shape: '●', desc: 'Low resonant warmth', duration: '0:28', earned: 'Day 3' },
    { id: 3, name: 'Birch Breath', color: '#2E7D32', shape: '▲', desc: 'Wind through rustling leaves', duration: '0:45', earned: 'Day 5' },
    { id: 4, name: 'Deep Blue', color: '#1565C0', shape: '★', desc: 'Ocean undertow pulse', duration: '0:38', earned: 'Day 7' },
    { id: 5, name: 'Golden Hour', color: '#F9A825', shape: '⬟', desc: 'Warm harmonic overtone', duration: '0:41', earned: 'Day 9' },
    { id: 6, name: 'Void Chord', color: '#4A148C', shape: '■', desc: 'Mysterious low drone', duration: '0:55', earned: 'Day 12' },
  ];

  const rows = [
    [blossoms[0], blossoms[1], blossoms[2]],
    [blossoms[3], blossoms[4], blossoms[5]],
  ];

  return React.createElement('div', {
    style: {
      height: '812px',
      background: t.bg,
      overflowY: 'auto',
      paddingBottom: '100px',
    }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '60px 20px 20px',
        background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)`,
      }
    },
      React.createElement('div', {
        style: {
          fontFamily: 'Bebas Neue',
          fontSize: '42px',
          color: t.primary,
          letterSpacing: '3px',
          lineHeight: 1,
        }
      }, 'MY ECHO GARDEN'),
      React.createElement('p', {
        style: { color: t.textMuted, fontSize: '13px', marginTop: '4px' }
      }, '12 Sound Blossoms collected • Day 12 streak 🔥')
    ),

    // Progress bar
    React.createElement('div', { style: { padding: '0 20px 20px' } },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          alignItems: 'center',
        }
      },
        React.createElement('span', {
          style: { fontFamily: 'Bebas Neue', fontSize: '16px', color: t.textMuted, letterSpacing: '1px' }
        }, 'GARDEN GROWTH'),
        React.createElement('span', {
          style: { fontFamily: 'Bebas Neue', fontSize: '16px', color: t.accent, letterSpacing: '1px' }
        }, '67%')
      ),
      React.createElement('div', {
        style: {
          height: '8px',
          background: t.surfaceAlt,
          borderRadius: '4px',
          overflow: 'hidden',
          border: `2px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: {
            width: '67%',
            height: '100%',
            background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
            borderRadius: '4px',
          }
        })
      )
    ),

    // Horizontal scroll rows - LAYOUT TWIST
    rows.map((row, rowIdx) =>
      React.createElement('div', { key: rowIdx, style: { marginBottom: '16px' } },
        React.createElement('div', {
          style: {
            fontFamily: 'Bebas Neue',
            fontSize: '14px',
            color: t.textDim,
            letterSpacing: '2px',
            padding: '0 20px 8px',
          }
        }, rowIdx === 0 ? 'EARLY BLOSSOMS' : 'RECENT BLOOMS'),
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            padding: '4px 20px 8px',
          }
        },
          row.map(blossom =>
            React.createElement('div', {
              key: blossom.id,
              onClick: () => setSelectedBlossom(selectedBlossom?.id === blossom.id ? null : blossom),
              style: {
                minWidth: '130px',
                background: selectedBlossom?.id === blossom.id ? blossom.color + '33' : t.card,
                borderRadius: '20px',
                padding: '16px',
                cursor: 'pointer',
                border: `3px solid ${selectedBlossom?.id === blossom.id ? blossom.color : t.border}`,
                transition: 'all 0.2s ease',
                transform: selectedBlossom?.id === blossom.id ? 'scale(1.05)' : 'scale(1)',
                flexShrink: 0,
              }
            },
              React.createElement('div', {
                style: {
                  fontSize: '36px',
                  color: blossom.color,
                  textAlign: 'center',
                  marginBottom: '8px',
                  animation: selectedBlossom?.id === blossom.id ? 'waveFloat 2s ease-in-out infinite' : 'none',
                  display: 'block',
                }
              }, blossom.shape),
              React.createElement('div', {
                style: {
                  fontFamily: 'Bebas Neue',
                  fontSize: '15px',
                  color: t.text,
                  letterSpacing: '1px',
                  textAlign: 'center',
                }
              }, blossom.name),
              React.createElement('div', {
                style: {
                  fontSize: '11px',
                  color: t.textMuted,
                  textAlign: 'center',
                  marginTop: '4px',
                }
              }, blossom.duration)
            )
          )
        )
      )
    ),

    // Selected blossom detail
    selectedBlossom && React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        background: selectedBlossom.color + '22',
        borderRadius: '20px',
        padding: '20px',
        border: `3px solid ${selectedBlossom.color}`,
        animation: 'bloomIn 0.3s ease',
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' } },
        React.createElement('span', { style: { fontSize: '40px', color: selectedBlossom.color } }, selectedBlossom.shape),
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: 'Bebas Neue', fontSize: '22px', color: t.text, letterSpacing: '2px' }
          }, selectedBlossom.name),
          React.createElement('div', { style: { fontSize: '12px', color: t.textMuted } }, `Earned: ${selectedBlossom.earned}`)
        )
      ),
      React.createElement('p', { style: { color: t.textMuted, fontSize: '13px', marginBottom: '14px' } }, selectedBlossom.desc),
      React.createElement('div', {
        style: {
          background: selectedBlossom.color,
          borderRadius: '12px',
          padding: '12px 20px',
          textAlign: 'center',
          fontFamily: 'Bebas Neue',
          fontSize: '16px',
          letterSpacing: '2px',
          color: '#FFF8E1',
          cursor: 'pointer',
        }
      }, '▶ PLAY BLOSSOM')
    ),

    // Daily prompt teaser
    React.createElement('div', {
      onClick: () => setActiveScreen('seeds'),
      style: {
        margin: '0 20px',
        background: `linear-gradient(135deg, ${t.primary}44, ${t.accent}44)`,
        borderRadius: '20px',
        padding: '18px',
        border: `3px solid ${t.primary}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }
    },
      React.createElement('div', { style: { fontSize: '36px' } }, '🌱'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontFamily: 'Bebas Neue', fontSize: '16px', color: t.primary, letterSpacing: '2px' }
        }, 'TODAY\'S SONIC SEED'),
        React.createElement('div', { style: { fontSize: '13px', color: t.textMuted, marginTop: '2px' } },
          'Identify the timbres in a forest dawn chorus →')
      )
    )
  );
}

// ─── SEEDS SCREEN ─────────────────────────────────────────────────────────────
function SeedsScreen({ t, setActiveScreen }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [aiText, setAiText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const challenge = {
    title: 'DAWN CHORUS TIMBRE',
    subtitle: 'Identify distinct timbres',
    waveform: ['▂','▄','█','▅','▇','▃','▆','▂','▅','█','▄','▇','▂','▃','▅'],
    options: [
      { id: 'a', label: 'Flute-like bird calls', icon: '🐦' },
      { id: 'b', label: 'Percussion of water drops', icon: '💧' },
      { id: 'c', label: 'Buzzing insect drones', icon: '🦗' },
      { id: 'd', label: 'Wind harmonic swells', icon: '🌬️' },
    ],
    correct: ['a', 'b', 'c'],
  };

  const aiResponses = [
    'Great ear! The flute-like birdsongs are created by birds controlling airflow through their syrinx — nature\'s own flute. Each species has a unique timbre fingerprint.',
    'You noticed the water drops too! Those crisp percussive pops create a rhythmic backbone in natural soundscapes. Your Sound Blossom will capture this quality.',
    'Excellent choice on the insect drones — they form the harmonic "bass layer" of many dawn choruses. This continuous tone creates acoustic space for other sounds to emerge.'
  ];

  const startTyping = (text) => {
    setIsTyping(true);
    setAiText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setAiText(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
  };

  const handleSelect = (optId) => {
    if (selected) return;
    setSelected(optId);
    const idx = challenge.options.findIndex(o => o.id === optId);
    startTyping(aiResponses[Math.min(idx, aiResponses.length - 1)]);
    setTimeout(() => setStep(1), 3000);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  if (completed) {
    return React.createElement('div', {
      style: { height: '812px', background: t.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', overflowY: 'auto' }
    },
      React.createElement('div', { style: { fontSize: '80px', animation: 'bloomIn 0.6s ease', textAlign: 'center' } }, '🌸'),
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '48px', color: t.primary, letterSpacing: '4px', textAlign: 'center', marginTop: '16px' }
      }, 'SOUND BLOSSOM\nGENERATED!'),
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #00838F33, #BF360C33)`,
          borderRadius: '24px',
          padding: '24px',
          margin: '24px 0',
          border: `3px solid ${t.primary}`,
          textAlign: 'center',
          width: '100%',
        }
      },
        React.createElement('div', { style: { fontSize: '60px' } }, '◈'),
        React.createElement('div', {
          style: { fontFamily: 'Bebas Neue', fontSize: '26px', color: t.text, letterSpacing: '2px', marginTop: '8px' }
        }, 'DAWN SHIMMER'),
        React.createElement('div', { style: { color: t.textMuted, fontSize: '13px', marginTop: '6px' } },
          'A layered ambient loop blending flute-tones, water percussion, and insect drones')
      ),
      React.createElement('p', { style: { color: t.textMuted, fontSize: '13px', textAlign: 'center', marginBottom: '24px' } },
        'This blossom has been added to your Echo Garden and woven into the Community Weave!'),
      React.createElement('div', {
        onClick: () => setActiveScreen('garden'),
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
          borderRadius: '16px',
          padding: '16px 40px',
          fontFamily: 'Bebas Neue',
          fontSize: '20px',
          letterSpacing: '2px',
          color: '#FFF8E1',
          cursor: 'pointer',
        }
      }, '🌸 VIEW IN GARDEN')
    );
  }

  return React.createElement('div', {
    style: { height: '812px', background: t.bg, overflowY: 'auto', paddingBottom: '100px' }
  },
    React.createElement('div', {
      style: { padding: '60px 20px 20px', background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)` }
    },
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: t.accent, letterSpacing: '3px' }
      }, 'DAY 13 • SONIC SEED'),
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '36px', color: t.text, letterSpacing: '2px', lineHeight: 1.1, marginTop: '4px' }
      }, challenge.title),
      React.createElement('p', { style: { color: t.textMuted, fontSize: '13px', marginTop: '6px' } },
        challenge.subtitle)
    ),

    // Waveform visualization
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        background: t.card,
        borderRadius: '16px',
        padding: '20px',
        border: `3px solid ${t.border}`,
      }
    },
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '12px', color: t.textDim, letterSpacing: '2px', marginBottom: '12px' }
      }, '▶ LISTENING EXERCISE — TAP TO PLAY'),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'flex-end', gap: '3px', height: '50px', justifyContent: 'center' }
      },
        challenge.waveform.map((bar, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              background: i % 3 === 0 ? t.primary : i % 3 === 1 ? t.accent : t.primaryLight,
              borderRadius: '3px',
              height: `${(bar.charCodeAt(0) - 9600) * 10 + 20}%`,
              animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
            }
          })
        )
      ),
      React.createElement('div', {
        style: {
          marginTop: '12px',
          background: t.primary,
          borderRadius: '10px',
          padding: '10px',
          textAlign: 'center',
          fontFamily: 'Bebas Neue',
          fontSize: '14px',
          letterSpacing: '2px',
          color: '#FFF8E1',
          cursor: 'pointer',
        }
      }, '▶ PLAY 15-SECOND CLIP')
    ),

    // AI Conductor
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        background: t.cardAlt,
        borderRadius: '16px',
        padding: '16px',
        border: `3px solid ${t.accent}55`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' } },
        React.createElement('div', {
          style: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.accent}, ${t.primary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }
        }, '🎼'),
        React.createElement('span', {
          style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: t.accent, letterSpacing: '2px' }
        }, 'CONVERSATIONAL CONDUCTOR')
      ),
      React.createElement('p', { style: { color: t.textMuted, fontSize: '13px', lineHeight: 1.5 } },
        selected
          ? (aiText + (isTyping ? '▌' : ''))
          : 'Listen carefully to the audio clip. Which distinct timbres can you identify in this dawn forest recording? Select all that you notice.'
      )
    ),

    // Options
    step === 0 && React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: t.textDim, letterSpacing: '2px', marginBottom: '12px' }
      }, 'WHAT DO YOU HEAR?'),
      challenge.options.map(opt =>
        React.createElement('div', {
          key: opt.id,
          onClick: () => handleSelect(opt.id),
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 16px',
            marginBottom: '10px',
            background: selected === opt.id
              ? (challenge.correct.includes(opt.id) ? t.primary + '44' : t.accent + '44')
              : t.card,
            border: `3px solid ${selected === opt.id
              ? (challenge.correct.includes(opt.id) ? t.primary : t.accent)
              : t.border}`,
            borderRadius: '14px',
            cursor: selected ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('span', { style: { fontSize: '24px' } }, opt.icon),
          React.createElement('span', {
            style: { color: t.text, fontSize: '14px', flex: 1 }
          }, opt.label),
          selected === opt.id && React.createElement('span', null,
            challenge.correct.includes(opt.id) ? '✓' : '✗'
          )
        )
      )
    ),

    step === 1 && React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', {
        onClick: handleComplete,
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
          borderRadius: '16px',
          padding: '18px',
          textAlign: 'center',
          fontFamily: 'Bebas Neue',
          fontSize: '22px',
          letterSpacing: '3px',
          color: '#FFF8E1',
          cursor: 'pointer',
          boxShadow: `0 8px 24px ${t.primary}66`,
        }
      }, '🌸 GENERATE MY SOUND BLOSSOM')
    )
  );
}

// ─── WEAVE SCREEN ─────────────────────────────────────────────────────────────
function WeaveScreen({ t }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLayer, setActiveLayer] = useState(null);
  const animRef = useRef(0);

  useEffect(() => {
    animRef.current = setInterval(() => {}, 100);
    return () => clearInterval(animRef.current);
  }, []);

  const layers = [
    { id: 'rain', label: 'Rain Layers', count: '2,847', color: '#00838F', shape: '◆', active: true },
    { id: 'wind', label: 'Wind Drones', count: '1,923', color: '#2E7D32', shape: '▲', active: true },
    { id: 'ember', label: 'Ember Tones', count: '3,102', color: '#BF360C', shape: '●', active: false },
    { id: 'deep', label: 'Deep Pulses', count: '984', color: '#1565C0', shape: '■', active: true },
    { id: 'golden', label: 'Golden Hums', count: '2,211', color: '#F9A825', shape: '★', active: false },
  ];

  const contributors = [
    { name: 'luna.weave', blossoms: 47, color: '#00838F' },
    { name: 'solstice_k', blossoms: 89, color: '#BF360C' },
    { name: 'ambirex', blossoms: 23, color: '#2E7D32' },
    { name: 'tidal_w', blossoms: 156, color: '#F9A825' },
    { name: 'you', blossoms: 12, color: '#9C27B0' },
  ];

  return React.createElement('div', {
    style: { height: '812px', background: t.bg, overflowY: 'auto', paddingBottom: '100px' }
  },
    // Header
    React.createElement('div', {
      style: { padding: '60px 20px 20px', background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)` }
    },
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '42px', color: t.primary, letterSpacing: '3px', lineHeight: 1 }
      }, 'COMMUNITY\nWEAVE'),
      React.createElement('p', { style: { color: t.textMuted, fontSize: '13px', marginTop: '6px' } },
        '11,067 blossoms • 4,821 weavers contributing')
    ),

    // Live visualizer
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        background: t.card,
        borderRadius: '20px',
        padding: '20px',
        border: `3px solid ${t.primary}`,
        textAlign: 'center',
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          height: '80px',
          marginBottom: '16px',
        }
      },
        Array.from({ length: 20 }).map((_, i) =>
          React.createElement('div', {
            key: i,
            style: {
              width: '8px',
              background: i % 4 === 0 ? t.primary : i % 4 === 1 ? t.accent : i % 4 === 2 ? '#2E7D32' : '#F9A825',
              borderRadius: '4px',
              height: `${30 + Math.abs(Math.sin(i * 0.8)) * 50}%`,
              animation: isPlaying ? `pulse ${0.8 + i * 0.05}s ease-in-out infinite` : 'none',
            }
          })
        )
      ),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }
      },
        React.createElement('div', {
          style: {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#4CAF50',
            animation: 'pulse 1s ease-in-out infinite',
          }
        }),
        React.createElement('span', {
          style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: '#4CAF50', letterSpacing: '2px' }
        }, 'LIVE — 4,821 LISTENING NOW')
      ),
      React.createElement('div', {
        onClick: () => setIsPlaying(!isPlaying),
        style: {
          display: 'inline-block',
          background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
          borderRadius: '12px',
          padding: '10px 30px',
          fontFamily: 'Bebas Neue',
          fontSize: '18px',
          letterSpacing: '2px',
          color: '#FFF8E1',
          cursor: 'pointer',
        }
      }, isPlaying ? '⏸ PAUSE WEAVE' : '▶ RESUME WEAVE')
    ),

    // Horizontal scroll — LAYOUT TWIST: Layer toggle row
    React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: t.textDim, letterSpacing: '2px', padding: '0 20px 10px' }
      }, 'ACTIVE LAYERS — SCROLL TO EXPLORE'),
      React.createElement('div', {
        style: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 20px 8px' }
      },
        layers.map(layer =>
          React.createElement('div', {
            key: layer.id,
            onClick: () => setActiveLayer(activeLayer === layer.id ? null : layer.id),
            style: {
              minWidth: '100px',
              background: activeLayer === layer.id ? layer.color + '33' : t.card,
              borderRadius: '16px',
              padding: '14px 12px',
              border: `3px solid ${activeLayer === layer.id ? layer.color : t.border}`,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }
          },
            React.createElement('div', { style: { fontSize: '28px', color: layer.color, marginBottom: '6px' } }, layer.shape),
            React.createElement('div', {
              style: { fontFamily: 'Bebas Neue', fontSize: '12px', color: t.text, letterSpacing: '1px', marginBottom: '4px' }
            }, layer.label),
            React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, layer.count),
            React.createElement('div', {
              style: {
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: layer.active ? '#4CAF50' : t.textDim,
                margin: '6px auto 0',
              }
            })
          )
        )
      )
    ),

    // Top contributors horizontal scroll — LAYOUT TWIST 2
    React.createElement('div', null,
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: t.textDim, letterSpacing: '2px', padding: '0 20px 10px' }
      }, 'TOP WEAVERS TODAY'),
      React.createElement('div', {
        style: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 20px 8px' }
      },
        contributors.map((c, i) =>
          React.createElement('div', {
            key: c.name,
            style: {
              minWidth: '90px',
              background: c.name === 'you' ? `${t.primary}22` : t.card,
              borderRadius: '16px',
              padding: '14px 10px',
              border: `3px solid ${c.name === 'you' ? t.primary : t.border}`,
              textAlign: 'center',
              flexShrink: 0,
            }
          },
            React.createElement('div', {
              style: {
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: c.color,
                margin: '0 auto 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Bebas Neue',
                fontSize: '16px',
                color: '#FFF8E1',
              }
            }, `#${i + 1}`),
            React.createElement('div', {
              style: { fontFamily: 'Bebas Neue', fontSize: '11px', color: t.text, letterSpacing: '1px' }
            }, c.name),
            React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, marginTop: '2px' } }, `${c.blossoms} 🌸`)
          )
        )
      )
    )
  );
}

// ─── SEASONS SCREEN ───────────────────────────────────────────────────────────
function SeasonsScreen({ t, setActiveScreen }) {
  const [expandedSeason, setExpandedSeason] = useState('current');

  const currentSeason = {
    id: 'current',
    name: 'SPRING BLOOM',
    emoji: '🌸',
    color: '#E91E63',
    ends: '17 days left',
    progress: 62,
    goal: 'Collect 20 Nature Blossoms',
    reward: 'Cherry Blossom Weave Unlocked',
    seeds: [
      { name: 'Forest Dawn', done: true, icon: '🌲' },
      { name: 'Rainfall Patterns', done: true, icon: '🌧️' },
      { name: 'Bird Migration Song', done: false, icon: '🐦' },
      { name: 'River Current Tones', done: false, icon: '🏞️' },
    ]
  };

  const pastSeasons = [
    { id: 'winter', name: 'WINTER ECHO', emoji: '❄️', color: '#1565C0', completed: '42 seeds', blossoms: 42 },
    { id: 'autumn', name: 'AUTUMN DRIFT', emoji: '🍂', color: '#E65100', completed: '38 seeds', blossoms: 38 },
    { id: 'summer', name: 'SUMMER SURGE', emoji: '☀️', color: '#F9A825', completed: '51 seeds', blossoms: 51 },
  ];

  return React.createElement('div', {
    style: { height: '812px', background: t.bg, overflowY: 'auto', paddingBottom: '100px' }
  },
    // Header
    React.createElement('div', {
      style: { padding: '60px 20px 20px', background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)` }
    },
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '42px', color: t.primary, letterSpacing: '3px', lineHeight: 1 }
      }, 'SEEDLING\nSEASONS'),
      React.createElement('p', { style: { color: t.textMuted, fontSize: '13px', marginTop: '6px' } },
        'Themed seasonal journeys through sound')
    ),

    // Current season — large card
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        background: `linear-gradient(135deg, ${currentSeason.color}33, ${t.primary}22)`,
        borderRadius: '24px',
        padding: '24px',
        border: `4px solid ${currentSeason.color}`,
        cursor: 'pointer',
      },
      onClick: () => setExpandedSeason(expandedSeason === 'current' ? null : 'current')
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' } },
        React.createElement('span', { style: { fontSize: '40px' } }, currentSeason.emoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: 'Bebas Neue', fontSize: '28px', color: t.text, letterSpacing: '2px', lineHeight: 1 }
          }, currentSeason.name),
          React.createElement('div', {
            style: {
              display: 'inline-block',
              background: currentSeason.color,
              borderRadius: '10px',
              padding: '3px 10px',
              fontFamily: 'Bebas Neue',
              fontSize: '12px',
              letterSpacing: '1px',
              color: '#FFF8E1',
              marginTop: '4px',
            }
          }, '● ACTIVE SEASON')
        ),
        React.createElement('span', { style: { fontSize: '20px' } }, expandedSeason === 'current' ? '▲' : '▼')
      ),

      React.createElement('div', { style: { marginBottom: '12px' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }
        },
          React.createElement('span', { style: { fontSize: '13px', color: t.textMuted } }, currentSeason.goal),
          React.createElement('span', {
            style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: currentSeason.color, letterSpacing: '1px' }
          }, `${currentSeason.progress}%`)
        ),
        React.createElement('div', {
          style: { height: '8px', background: t.surfaceAlt, borderRadius: '4px', overflow: 'hidden', border: `2px solid ${t.border}` }
        },
          React.createElement('div', {
            style: { width: `${currentSeason.progress}%`, height: '100%', background: currentSeason.color, borderRadius: '4px' }
          })
        )
      ),

      React.createElement('div', {
        style: { fontSize: '12px', color: t.textMuted, marginBottom: expandedSeason === 'current' ? '14px' : '0' }
      }, `⏰ ${currentSeason.ends} • 🏆 ${currentSeason.reward}`),

      expandedSeason === 'current' && React.createElement('div', null,
        React.createElement('div', {
          style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: t.textDim, letterSpacing: '2px', marginBottom: '10px' }
        }, 'SEASONAL SEEDS'),
        currentSeason.seeds.map(seed =>
          React.createElement('div', {
            key: seed.name,
            onClick: (e) => { e.stopPropagation(); if (!seed.done) setActiveScreen('seeds'); },
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: seed.done ? currentSeason.color + '22' : t.card,
              borderRadius: '12px',
              marginBottom: '8px',
              border: `2px solid ${seed.done ? currentSeason.color : t.border}`,
              cursor: seed.done ? 'default' : 'pointer',
            }
          },
            React.createElement('span', { style: { fontSize: '24px' } }, seed.icon),
            React.createElement('span', { style: { flex: 1, color: t.text, fontSize: '14px' } }, seed.name),
            React.createElement('span', {
              style: {
                fontFamily: 'Bebas Neue',
                fontSize: '14px',
                color: seed.done ? currentSeason.color : t.textDim,
                letterSpacing: '1px',
              }
            }, seed.done ? '✓ DONE' : 'START →')
          )
        )
      )
    ),

    // Past seasons horizontal scroll — LAYOUT TWIST
    React.createElement('div', null,
      React.createElement('div', {
        style: { fontFamily: 'Bebas Neue', fontSize: '14px', color: t.textDim, letterSpacing: '2px', padding: '0 20px 10px' }
      }, 'PAST SEASONS — YOUR HISTORY'),
      React.createElement('div', {
        style: { display: 'flex', gap: '12px', overflowX: 'auto', padding: '4px 20px 8px' }
      },
        pastSeasons.map(s =>
          React.createElement('div', {
            key: s.id,
            style: {
              minWidth: '130px',
              background: t.card,
              borderRadius: '20px',
              padding: '20px 14px',
              border: `3px solid ${s.color}55`,
              textAlign: 'center',
              flexShrink: 0,
            }
          },
            React.createElement('div', { style: { fontSize: '36px', marginBottom: '10px' } }, s.emoji),
            React.createElement('div', {
              style: { fontFamily: 'Bebas Neue', fontSize: '15px', color: t.text, letterSpacing: '1px', marginBottom: '6px' }
            }, s.name),
            React.createElement('div', {
              style: {
                background: s.color + '33',
                border: `2px solid ${s.color}`,
                borderRadius: '10px',
                padding: '4px 10px',
                fontSize: '12px',
                color: s.color,
                fontFamily: 'Bebas Neue',
                letterSpacing: '1px',
                marginBottom: '6px',
              }
            }, `${s.blossoms} 🌸`),
            React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, s.completed)
          )
        )
      )
    )
  );
}
