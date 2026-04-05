
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#000000',
    surface: '#0F0F23',
    surfaceAlt: '#1E1B4B',
    card: '#0F0F23',
    cardAlt: '#161630',
    border: 'rgba(255,255,255,0.08)',
    text: '#FFFFFF',
    textSecondary: '#A0A0C0',
    textMuted: '#606080',
    cta: '#E11D48',
    ctaHover: '#F43F5E',
    accent: '#7C3AED',
    accentSoft: 'rgba(124,58,237,0.2)',
    teal: '#0D9488',
    navBg: 'rgba(15,15,35,0.95)',
    overlay: 'rgba(0,0,0,0.7)',
    pill: '#1E1B4B',
  },
  light: {
    bg: '#F8F7FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FE',
    card: '#FFFFFF',
    cardAlt: '#F3F0FF',
    border: 'rgba(0,0,0,0.08)',
    text: '#0F0F23',
    textSecondary: '#4B4B6B',
    textMuted: '#8B8BAB',
    cta: '#E11D48',
    ctaHover: '#F43F5E',
    accent: '#7C3AED',
    accentSoft: 'rgba(124,58,237,0.1)',
    teal: '#0D9488',
    navBg: 'rgba(255,255,255,0.95)',
    overlay: 'rgba(0,0,0,0.4)',
    pill: '#EDE9FE',
  }
};

const keyframeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.97); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(225,29,72,0.4); }
    50% { transform: scale(1.04); box-shadow: 0 0 0 16px rgba(225,29,72,0); }
  }

  @keyframes waveform {
    0%, 100% { height: 6px; }
    50% { height: 22px; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .serene-scroll::-webkit-scrollbar { display: none; }
  .serene-scroll { -ms-overflow-style: none; scrollbar-width: none; }

  .nav-tab:hover { opacity: 0.9; }
  .btn-press:active { transform: scale(0.96); }
  .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .card-hover:hover { transform: translateY(-2px); }
`;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [isCreating, setIsCreating] = useState(false);
  const t = themes[theme];

  const screens = {
    home: HomeScreen,
    create: CreateScreen,
    archive: ArchiveScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'create', label: 'Create', icon: 'Plus' },
    { id: 'archive', label: 'Archive', icon: 'Grid' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '20px',
    }
  },
    React.createElement('style', null, keyframeStyles),
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        background: t.bg,
        borderRadius: '44px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: '80px',
          className: 'serene-scroll',
        },
        className: 'serene-scroll',
      },
        React.createElement(screens[activeScreen], { t, theme, setTheme, setActiveScreen })
      ),
      React.createElement('nav', {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: t.navBg,
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px 12px',
          zIndex: 100,
        }
      },
        navItems.map(item => {
          const isActive = activeScreen === item.id;
          const isCreateBtn = item.id === 'create';
          const IconComp = window.lucide[item.icon];

          if (isCreateBtn) {
            return React.createElement('button', {
              key: item.id,
              onClick: () => setActiveScreen(item.id),
              className: 'btn-press',
              style: {
                width: '56px',
                height: '56px',
                borderRadius: '18px',
                background: isActive
                  ? `linear-gradient(135deg, ${t.cta}, #F43F5E)`
                  : `linear-gradient(135deg, ${t.cta}, #F43F5E)`,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 20px rgba(225,29,72,0.5)`,
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.2s ease',
                marginBottom: '4px',
              }
            },
              IconComp ? React.createElement(IconComp, { size: 22, color: '#FFFFFF', strokeWidth: 2.5 }) : null,
              React.createElement('span', { style: { display: 'none' } }, item.label)
            );
          }

          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            className: 'nav-tab btn-press',
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              minWidth: '60px',
              transition: 'opacity 0.15s ease',
            }
          },
            IconComp ? React.createElement(IconComp, {
              size: 22,
              color: isActive ? t.cta : t.textMuted,
              strokeWidth: isActive ? 2.5 : 1.8,
            }) : null,
            React.createElement('span', {
              style: {
                fontSize: '10px',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? t.cta : t.textMuted,
                letterSpacing: '0.02em',
              }
            }, item.label)
          );
        })
      )
    )
  );
}

// ─── HOME SCREEN ────────────────────────────────────────────────────────────

function HomeScreen({ t, theme, setTheme, setActiveScreen }) {
  const [todayPrompt, setTodayPrompt] = useState(0);
  const [activeWave, setActiveWave] = useState(false);

  const prompts = [
    "Find one texture that feels soft today",
    "Capture the light through a window",
    "Notice where stillness lives near you",
    "Photograph something that made you pause",
  ];

  const recentStitches = [
    { id: 1, title: 'Morning Fog', duration: '8s', mood: 'Serene', gradient: 'linear-gradient(135deg, #1E1B4B, #0D9488)', time: '7:42 AM' },
    { id: 2, title: 'Kitchen Light', duration: '5s', mood: 'Warm', gradient: 'linear-gradient(135deg, #7C3AED, #E11D48)', time: 'Yesterday' },
    { id: 3, title: 'Rain Window', duration: '12s', mood: 'Calm', gradient: 'linear-gradient(135deg, #0F0F23, #1E40AF)', time: 'Mon' },
  ];

  useEffect(() => {
    const int = setInterval(() => setTodayPrompt(p => (p + 1) % prompts.length), 3500);
    return () => clearInterval(int);
  }, []);

  return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
    // Header
    React.createElement('div', {
      style: {
        padding: '24px 24px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
    },
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontSize: '12px', color: t.textMuted, fontWeight: '500', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }
        }, 'Sunday, April 5'),
        React.createElement('h1', {
          style: { fontSize: '26px', fontWeight: '800', color: t.text, letterSpacing: '-0.5px', lineHeight: '1.1' }
        }, 'Good Morning')
      ),
      React.createElement('button', {
        onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        className: 'btn-press',
        style: {
          width: '44px', height: '44px', borderRadius: '14px',
          background: t.pill, border: `1px solid ${t.border}`,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        theme === 'dark'
          ? React.createElement(window.lucide.Sun, { size: 18, color: t.textSecondary })
          : React.createElement(window.lucide.Moon, { size: 18, color: t.textSecondary })
      )
    ),

    // Today's Stitch Hero CTA
    React.createElement('div', {
      style: {
        margin: '20px 24px 0',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1E1B4B 50%, #2D1B69 100%)',
        border: `1px solid rgba(124,58,237,0.3)`,
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeIn 0.5s ease 0.1s both',
      }
    },
      // Decorative circles
      React.createElement('div', {
        style: {
          position: 'absolute', top: '-20px', right: '-20px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: '-10px', left: '60px',
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225,29,72,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }
      }),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'
        }
      },
        React.createElement('div', {
          style: {
            width: '8px', height: '8px', borderRadius: '50%',
            background: t.cta, animation: 'pulse 2s infinite',
          }
        }),
        React.createElement('span', {
          style: { fontSize: '11px', fontWeight: '600', color: t.cta, letterSpacing: '0.1em', textTransform: 'uppercase' }
        }, "Today's Prompt")
      ),
      React.createElement('p', {
        key: todayPrompt,
        style: {
          fontSize: '17px', fontWeight: '600', color: '#FFFFFF',
          lineHeight: '1.4', marginBottom: '20px',
          animation: 'slideUp 0.4s ease',
        }
      }, `"${prompts[todayPrompt]}"`),
      React.createElement('button', {
        onClick: () => setActiveScreen('create'),
        className: 'btn-press',
        style: {
          display: 'flex', alignItems: 'center', gap: '8px',
          background: t.cta, border: 'none', borderRadius: '14px',
          padding: '12px 20px', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(225,29,72,0.4)',
        }
      },
        React.createElement(window.lucide.Scissors, { size: 16, color: '#FFF', strokeWidth: 2.5 }),
        React.createElement('span', {
          style: { fontSize: '14px', fontWeight: '700', color: '#FFF' }
        }, 'Start Stitching')
      )
    ),

    // Daily Mood Snapshot
    React.createElement('div', {
      style: { padding: '24px 24px 0' }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }
      },
        React.createElement('h2', {
          style: { fontSize: '15px', fontWeight: '700', color: t.text }
        }, 'Your Calm Streak'),
        React.createElement('span', {
          style: { fontSize: '12px', color: t.accent, fontWeight: '600' }
        }, '12 days ✦')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: '6px' }
      },
        ['M','T','W','T','F','S','S'].map((day, i) => {
          const filled = i < 5;
          const today = i === 6;
          return React.createElement('div', {
            key: i,
            style: {
              flex: 1, textAlign: 'center',
            }
          },
            React.createElement('div', {
              style: {
                height: '36px', borderRadius: '10px',
                background: filled ? `linear-gradient(135deg, ${t.accent}, ${t.cta})` : today ? t.surfaceAlt : t.surface,
                border: today ? `2px solid ${t.cta}` : `1px solid ${t.border}`,
                marginBottom: '5px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              filled ? React.createElement(window.lucide.Check, { size: 14, color: '#FFF', strokeWidth: 3 }) : null
            ),
            React.createElement('span', {
              style: { fontSize: '10px', color: t.textMuted, fontWeight: '500' }
            }, day)
          );
        })
      )
    ),

    // Recent Stitches
    React.createElement('div', {
      style: { padding: '24px 24px 0' }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }
      },
        React.createElement('h2', {
          style: { fontSize: '15px', fontWeight: '700', color: t.text }
        }, 'Recent Stitches'),
        React.createElement('button', {
          onClick: () => setActiveScreen('archive'),
          style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: t.accent, fontWeight: '600' }
        }, 'See all')
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        recentStitches.map((s, i) =>
          React.createElement('div', {
            key: s.id,
            className: 'card-hover',
            style: {
              display: 'flex', alignItems: 'center', gap: '14px',
              background: t.card, borderRadius: '16px',
              border: `1px solid ${t.border}`,
              padding: '12px 16px',
              cursor: 'pointer',
              animation: `fadeIn 0.4s ease ${0.1 + i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: '52px', height: '52px', borderRadius: '12px',
                background: s.gradient, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(window.lucide.Play, { size: 16, color: 'rgba(255,255,255,0.8)', strokeWidth: 2 })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', {
                style: { fontSize: '14px', fontWeight: '600', color: t.text, marginBottom: '3px' }
              }, s.title),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
              },
                React.createElement('span', {
                  style: {
                    fontSize: '11px', fontWeight: '600', color: t.accent,
                    background: t.accentSoft, padding: '2px 8px', borderRadius: '20px',
                  }
                }, s.mood),
                React.createElement('span', {
                  style: { fontSize: '11px', color: t.textMuted }
                }, `${s.duration} · ${s.time}`)
              )
            ),
            React.createElement('div', {
              style: {
                display: 'flex', alignItems: 'flex-end', gap: '2px', height: '22px'
              }
            },
              [1,2,3,4,5].map((b, j) =>
                React.createElement('div', {
                  key: j,
                  style: {
                    width: '3px', borderRadius: '2px',
                    background: t.textMuted, opacity: 0.6,
                    animation: `waveform ${0.5 + j * 0.15}s ease-in-out infinite alternate`,
                    animationDelay: `${j * 0.1}s`,
                  }
                })
              )
            )
          )
        )
      )
    ),

    // Sensory Tips
    React.createElement('div', {
      style: {
        margin: '20px 24px 24px',
        padding: '16px',
        background: t.surfaceAlt,
        borderRadius: '16px',
        border: `1px solid ${t.border}`,
        display: 'flex', alignItems: 'center', gap: '12px',
        animation: 'fadeIn 0.5s ease 0.4s both',
      }
    },
      React.createElement('div', {
        style: {
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #0D9488, #0F766E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }
      },
        React.createElement(window.lucide.Sparkles, { size: 18, color: '#FFF' })
      ),
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontSize: '13px', fontWeight: '600', color: t.text, marginBottom: '2px' }
        }, 'Sensory tip'),
        React.createElement('p', {
          style: { fontSize: '12px', color: t.textSecondary, lineHeight: '1.4' }
        }, 'Binaural theta waves work best with your morning stitches.')
      )
    )
  );
}

// ─── CREATE SCREEN ───────────────────────────────────────────────────────────

function CreateScreen({ t, theme, setTheme, setActiveScreen }) {
  const [step, setStep] = useState(0); // 0=upload, 1=adjust, 2=processing, 3=done
  const [slots, setSlots] = useState([false, false, false]);
  const [aesthetic, setAesthetic] = useState('serene');
  const [soundscape, setSoundscape] = useState('rain');
  const [progress, setProgress] = useState(0);

  const aesthetics = [
    { id: 'serene', label: 'Serene', color: '#0D9488' },
    { id: 'warm', label: 'Warm', color: '#F59E0B' },
    { id: 'moody', label: 'Moody', color: '#7C3AED' },
    { id: 'crisp', label: 'Crisp', color: '#3B82F6' },
  ];

  const soundscapes = [
    { id: 'rain', label: 'Rain', icon: 'CloudRain' },
    { id: 'forest', label: 'Forest', icon: 'Trees' },
    { id: 'waves', label: 'Waves', icon: 'Waves' },
    { id: 'binaural', label: 'Binaural', icon: 'Headphones' },
  ];

  const addSlot = (i) => {
    const newSlots = [...slots];
    newSlots[i] = true;
    setSlots(newSlots);
  };

  const startProcessing = () => {
    setStep(2);
    let p = 0;
    const int = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(int);
        setTimeout(() => setStep(3), 400);
      }
      setProgress(Math.min(p, 100));
    }, 280);
  };

  const filledSlots = slots.filter(Boolean).length;

  if (step === 3) {
    return React.createElement('div', {
      style: { padding: '32px 24px', textAlign: 'center', animation: 'fadeIn 0.5s ease' }
    },
      React.createElement('div', {
        style: {
          width: '140px', height: '140px', borderRadius: '28px',
          background: 'linear-gradient(135deg, #0F0F23, #1E1B4B, #7C3AED)',
          margin: '20px auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(124,58,237,0.4)',
          animation: 'float 3s ease-in-out infinite',
        }
      },
        React.createElement(window.lucide.Play, { size: 40, color: '#FFF', strokeWidth: 1.5 })
      ),
      React.createElement('h2', {
        style: { fontSize: '24px', fontWeight: '800', color: t.text, marginBottom: '8px' }
      }, 'Your Stitch is Ready'),
      React.createElement('p', {
        style: { fontSize: '14px', color: t.textSecondary, lineHeight: '1.5', marginBottom: '32px' }
      }, '"Morning Mist" — a 9s Serene loop with Rain soundscape'),
      React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '16px' } },
        React.createElement('button', {
          className: 'btn-press',
          style: {
            flex: 1, height: '52px', borderRadius: '16px',
            background: t.cta, border: 'none', cursor: 'pointer',
            fontSize: '15px', fontWeight: '700', color: '#FFF',
            boxShadow: '0 4px 20px rgba(225,29,72,0.4)',
          }
        }, 'Save to Archive'),
        React.createElement('button', {
          className: 'btn-press',
          style: {
            width: '52px', height: '52px', borderRadius: '16px',
            background: t.surface, border: `1px solid ${t.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.Share2, { size: 20, color: t.textSecondary })
        )
      ),
      React.createElement('button', {
        onClick: () => { setStep(0); setSlots([false,false,false]); setProgress(0); },
        style: {
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '13px', color: t.textMuted, fontWeight: '500',
        }
      }, 'Create another stitch')
    );
  }

  if (step === 2) {
    return React.createElement('div', {
      style: {
        padding: '60px 24px', textAlign: 'center', animation: 'fadeIn 0.4s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }
    },
      React.createElement('div', {
        style: {
          width: '88px', height: '88px', borderRadius: '50%',
          background: 'conic-gradient(#E11D48 0deg, #7C3AED 120deg, #0D9488 240deg, #E11D48 360deg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'spin 2s linear infinite',
          marginBottom: '32px',
        }
      },
        React.createElement('div', {
          style: {
            width: '70px', height: '70px', borderRadius: '50%',
            background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.Scissors, { size: 28, color: t.cta })
        )
      ),
      React.createElement('h2', {
        style: { fontSize: '20px', fontWeight: '800', color: t.text, marginBottom: '8px' }
      }, 'Stitching your calm…'),
      React.createElement('p', {
        style: { fontSize: '13px', color: t.textMuted, marginBottom: '32px' }
      }, 'Blending visuals · Tuning soundscape · Applying aesthetics'),
      React.createElement('div', {
        style: {
          width: '100%', height: '6px', borderRadius: '3px',
          background: t.surface, overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            height: '100%', borderRadius: '3px',
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${t.accent}, ${t.cta})`,
            transition: 'width 0.3s ease',
          }
        })
      ),
      React.createElement('p', {
        style: { marginTop: '12px', fontSize: '12px', color: t.textMuted }
      }, `${Math.round(progress)}%`)
    );
  }

  return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
    // Header
    React.createElement('div', {
      style: { padding: '24px 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }
    },
      React.createElement('h1', {
        style: { fontSize: '22px', fontWeight: '800', color: t.text, letterSpacing: '-0.3px' }
      }, step === 0 ? 'New Stitch' : 'Adjust & Style')
    ),

    step === 0 && React.createElement('div', { style: { padding: '20px 24px 0' } },
      React.createElement('p', {
        style: { fontSize: '13px', color: t.textSecondary, marginBottom: '20px', lineHeight: '1.5' }
      }, 'Add 1–3 photos or video clips from your day. The engine will stitch them into a unique calm loop.'),
      React.createElement('div', { style: { display: 'flex', gap: '12px', marginBottom: '24px' } },
        slots.map((filled, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => addSlot(i),
            className: 'btn-press',
            style: {
              flex: 1, aspectRatio: '1', borderRadius: '20px',
              background: filled ? `linear-gradient(135deg, ${t.accent}, ${t.cta})` : t.surface,
              border: filled ? 'none' : `2px dashed ${t.border}`,
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '6px', transition: 'all 0.2s ease',
              boxShadow: filled ? '0 8px 24px rgba(124,58,237,0.3)' : 'none',
            }
          },
            filled
              ? React.createElement(window.lucide.Check, { size: 28, color: '#FFF', strokeWidth: 3 })
              : React.createElement(window.lucide.Plus, { size: 28, color: t.textMuted }),
            React.createElement('span', {
              style: { fontSize: '10px', fontWeight: '600', color: filled ? 'rgba(255,255,255,0.8)' : t.textMuted }
            }, filled ? `Clip ${i+1}` : `+ Add`)
          )
        )
      ),
      filledSlots > 0 && React.createElement('button', {
        onClick: () => setStep(1),
        className: 'btn-press',
        style: {
          width: '100%', height: '52px', borderRadius: '16px',
          background: t.cta, border: 'none', cursor: 'pointer',
          fontSize: '15px', fontWeight: '700', color: '#FFF',
          boxShadow: '0 4px 20px rgba(225,29,72,0.4)',
          animation: 'fadeIn 0.3s ease',
        }
      }, `Continue with ${filledSlots} clip${filledSlots > 1 ? 's' : ''} →`),

      // Daily prompt nudge
      React.createElement('div', {
        style: {
          marginTop: '20px', padding: '14px 16px',
          background: t.surfaceAlt, borderRadius: '14px',
          border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', gap: '10px',
        }
      },
        React.createElement(window.lucide.Lightbulb, { size: 16, color: '#F59E0B' }),
        React.createElement('p', {
          style: { fontSize: '12px', color: t.textSecondary, lineHeight: '1.4' }
        }, 'Today: "Find one texture that feels soft"')
      )
    ),

    step === 1 && React.createElement('div', { style: { padding: '20px 24px 0' } },
      React.createElement('h3', {
        style: { fontSize: '13px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }
      }, 'Visual Aesthetic'),
      React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '24px' } },
        aesthetics.map(a =>
          React.createElement('button', {
            key: a.id,
            onClick: () => setAesthetic(a.id),
            className: 'btn-press',
            style: {
              flex: 1, height: '42px', borderRadius: '12px', border: 'none',
              background: aesthetic === a.id ? a.color : t.surface,
              cursor: 'pointer', fontSize: '12px', fontWeight: '600',
              color: aesthetic === a.id ? '#FFF' : t.textSecondary,
              border: `1px solid ${aesthetic === a.id ? a.color : t.border}`,
              transition: 'all 0.2s ease',
              boxShadow: aesthetic === a.id ? `0 4px 12px ${a.color}50` : 'none',
            }
          }, a.label)
        )
      ),
      React.createElement('h3', {
        style: { fontSize: '13px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }
      }, 'Soundscape'),
      React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '24px' } },
        soundscapes.map(s => {
          const IconComp = window.lucide[s.icon];
          return React.createElement('button', {
            key: s.id,
            onClick: () => setSoundscape(s.id),
            className: 'btn-press',
            style: {
              flex: 1, padding: '10px 0', borderRadius: '12px',
              background: soundscape === s.id ? `linear-gradient(135deg, ${t.accent}, ${t.teal})` : t.surface,
              border: `1px solid ${soundscape === s.id ? t.accent : t.border}`,
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
              transition: 'all 0.2s ease',
              boxShadow: soundscape === s.id ? `0 4px 16px rgba(124,58,237,0.3)` : 'none',
            }
          },
            IconComp ? React.createElement(IconComp, { size: 16, color: soundscape === s.id ? '#FFF' : t.textMuted }) : null,
            React.createElement('span', {
              style: { fontSize: '10px', fontWeight: '600', color: soundscape === s.id ? '#FFF' : t.textMuted }
            }, s.label)
          );
        })
      ),

      // Duration slider visual
      React.createElement('div', { style: { marginBottom: '28px' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }
        },
          React.createElement('h3', {
            style: { fontSize: '13px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }
          }, 'Duration'),
          React.createElement('span', {
            style: { fontSize: '13px', fontWeight: '700', color: t.accent }
          }, '9s')
        ),
        React.createElement('div', {
          style: {
            height: '6px', borderRadius: '3px',
            background: t.surface, position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: 0, left: 0, height: '100%',
              width: '60%', borderRadius: '3px',
              background: `linear-gradient(90deg, ${t.teal}, ${t.accent})`,
            }
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: '6px' }
        },
          React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, '3s'),
          React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, '15s')
        )
      ),

      React.createElement('button', {
        onClick: startProcessing,
        className: 'btn-press',
        style: {
          width: '100%', height: '52px', borderRadius: '16px',
          background: `linear-gradient(135deg, ${t.cta}, #F43F5E)`,
          border: 'none', cursor: 'pointer',
          fontSize: '15px', fontWeight: '700', color: '#FFF',
          boxShadow: '0 4px 20px rgba(225,29,72,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }
      },
        React.createElement(window.lucide.Scissors, { size: 18, color: '#FFF', strokeWidth: 2.5 }),
        React.createElement('span', null, 'Stitch It')
      )
    )
  );
}

// ─── ARCHIVE SCREEN ──────────────────────────────────────────────────────────

function ArchiveScreen({ t, theme, setTheme, setActiveScreen }) {
  const [view, setView] = useState('grid');
  const [selectedMood, setSelectedMood] = useState('all');

  const moods = ['all', 'Serene', 'Warm', 'Moody', 'Calm', 'Crisp'];

  const stitches = [
    { id: 1, title: 'Morning Fog', duration: '8s', mood: 'Serene', gradient: 'linear-gradient(135deg, #1E1B4B, #0D9488)', date: 'Apr 5', plays: 12 },
    { id: 2, title: 'Kitchen Light', duration: '5s', mood: 'Warm', gradient: 'linear-gradient(135deg, #7C3AED, #E11D48)', date: 'Apr 4', plays: 7 },
    { id: 3, title: 'Rain Window', duration: '12s', mood: 'Calm', gradient: 'linear-gradient(135deg, #0F0F23, #1E40AF)', date: 'Apr 3', plays: 18 },
    { id: 4, title: 'Leaf Shadow', duration: '6s', mood: 'Serene', gradient: 'linear-gradient(135deg, #064E3B, #10B981)', date: 'Apr 2', plays: 5 },
    { id: 5, title: 'Candlelight', duration: '9s', mood: 'Warm', gradient: 'linear-gradient(135deg, #92400E, #F59E0B)', date: 'Apr 1', plays: 22 },
    { id: 6, title: 'Ceiling Fan', duration: '4s', mood: 'Crisp', gradient: 'linear-gradient(135deg, #1E3A5F, #3B82F6)', date: 'Mar 31', plays: 3 },
    { id: 7, title: 'Garden Path', duration: '11s', mood: 'Moody', gradient: 'linear-gradient(135deg, #2D1B69, #7C3AED)', date: 'Mar 30', plays: 9 },
    { id: 8, title: 'Steam Mug', duration: '7s', mood: 'Calm', gradient: 'linear-gradient(135deg, #1F2937, #6B7280)', date: 'Mar 29', plays: 14 },
  ];

  const filtered = selectedMood === 'all' ? stitches : stitches.filter(s => s.mood === selectedMood);

  return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
    // Header
    React.createElement('div', {
      style: { padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('h1', {
        style: { fontSize: '22px', fontWeight: '800', color: t.text }
      }, 'Calm Archive'),
      React.createElement('div', { style: { display: 'flex', gap: '8px' } },
        ['grid', 'list'].map(v =>
          React.createElement('button', {
            key: v,
            onClick: () => setView(v),
            className: 'btn-press',
            style: {
              width: '36px', height: '36px', borderRadius: '10px',
              background: view === v ? t.accent : t.surface,
              border: `1px solid ${view === v ? t.accent : t.border}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            v === 'grid'
              ? React.createElement(window.lucide.Grid, { size: 15, color: view === v ? '#FFF' : t.textMuted })
              : React.createElement(window.lucide.List, { size: 15, color: view === v ? '#FFF' : t.textMuted })
          )
        )
      )
    ),

    // Mood Map teaser
    React.createElement('div', {
      style: {
        margin: '16px 24px 0',
        padding: '16px',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(13,148,136,0.15))',
        borderRadius: '16px',
        border: `1px solid rgba(124,58,237,0.2)`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }
    },
      React.createElement('div', null,
        React.createElement('p', { style: { fontSize: '12px', fontWeight: '600', color: t.accent, marginBottom: '3px' } }, 'Mood Map'),
        React.createElement('p', { style: { fontSize: '13px', color: t.text, fontWeight: '600' } }, 'Mostly Serene this week'),
        React.createElement('p', { style: { fontSize: '11px', color: t.textMuted } }, '8 stitches · 87 total plays')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: '4px', alignItems: 'flex-end' }
      },
        [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1.0].map((h, i) =>
          React.createElement('div', {
            key: i,
            style: {
              width: '10px', height: `${h * 36}px`, borderRadius: '4px',
              background: `linear-gradient(to top, ${t.accent}, ${t.teal})`,
              opacity: 0.8,
            }
          })
        )
      )
    ),

    // Filter chips
    React.createElement('div', {
      style: {
        padding: '16px 24px 0',
        display: 'flex', gap: '8px', overflowX: 'auto',
        className: 'serene-scroll',
      },
      className: 'serene-scroll',
    },
      moods.map(m =>
        React.createElement('button', {
          key: m,
          onClick: () => setSelectedMood(m),
          className: 'btn-press',
          style: {
            padding: '7px 14px', borderRadius: '20px', border: 'none',
            background: selectedMood === m ? t.cta : t.pill,
            color: selectedMood === m ? '#FFF' : t.textSecondary,
            fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0,
            transition: 'all 0.2s ease',
            boxShadow: selectedMood === m ? '0 2px 8px rgba(225,29,72,0.4)' : 'none',
          }
        }, m === 'all' ? 'All' : m)
      )
    ),

    // Grid or List
    view === 'grid'
      ? React.createElement('div', {
          style: {
            padding: '16px 24px 0',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }
        },
          filtered.map((s, i) =>
            React.createElement('div', {
              key: s.id,
              className: 'card-hover',
              style: {
                borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                background: s.gradient, aspectRatio: '1',
                position: 'relative',
                animation: `fadeIn 0.4s ease ${i * 0.06}s both`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }
            },
              React.createElement('div', {
                style: {
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                  padding: '10px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                }
              },
                React.createElement('p', {
                  style: { fontSize: '12px', fontWeight: '700', color: '#FFF', marginBottom: '2px' }
                }, s.title),
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
                },
                  React.createElement('span', { style: { fontSize: '10px', color: 'rgba(255,255,255,0.7)' } }, s.duration),
                  React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', gap: '3px' }
                  },
                    React.createElement(window.lucide.Play, { size: 10, color: 'rgba(255,255,255,0.7)' }),
                    React.createElement('span', { style: { fontSize: '10px', color: 'rgba(255,255,255,0.7)' } }, s.plays)
                  )
                )
              )
            )
          )
        )
      : React.createElement('div', {
          style: { padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: '8px' }
        },
          filtered.map((s, i) =>
            React.createElement('div', {
              key: s.id,
              className: 'card-hover',
              style: {
                display: 'flex', alignItems: 'center', gap: '12px',
                background: t.card, borderRadius: '14px',
                border: `1px solid ${t.border}`, padding: '12px',
                cursor: 'pointer', animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
              }
            },
              React.createElement('div', {
                style: {
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: s.gradient, flexShrink: 0,
                }
              }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, s.title),
                React.createElement('p', { style: { fontSize: '11px', color: t.textMuted } }, `${s.duration} · ${s.date} · ${s.plays} plays`)
              ),
              React.createElement(window.lucide.MoreVertical, { size: 16, color: t.textMuted })
            )
          )
        )
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────

function ProfileScreen({ t, theme, setTheme, setActiveScreen }) {
  const [notifications, setNotifications] = useState(true);
  const [autoSound, setAutoSound] = useState(true);
  const [haptics, setHaptics] = useState(false);

  const stats = [
    { label: 'Stitches', value: '47', icon: 'Scissors' },
    { label: 'Day Streak', value: '12', icon: 'Flame' },
    { label: 'Calm Hours', value: '3.2h', icon: 'Clock' },
  ];

  const preferences = [
    { label: 'Preferred Aesthetic', value: 'Serene', icon: 'Palette' },
    { label: 'Default Soundscape', value: 'Rain', icon: 'CloudRain' },
    { label: 'Loop Duration', value: '6–12s', icon: 'Timer' },
  ];

  const toggleRow = (state, setter, label) =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px',
        borderBottom: `1px solid ${t.border}`,
      }
    },
      React.createElement('span', { style: { fontSize: '14px', fontWeight: '500', color: t.text } }, label),
      React.createElement('button', {
        onClick: () => setter(!state),
        className: 'btn-press',
        style: {
          width: '46px', height: '26px', borderRadius: '13px',
          background: state ? t.cta : t.surface,
          border: `1px solid ${state ? t.cta : t.border}`,
          cursor: 'pointer', position: 'relative',
          transition: 'all 0.2s ease',
          boxShadow: state ? '0 2px 8px rgba(225,29,72,0.4)' : 'none',
        }
      },
        React.createElement('div', {
          style: {
            width: '20px', height: '20px', borderRadius: '50%',
            background: '#FFF',
            position: 'absolute', top: '2px',
            left: state ? '23px' : '2px',
            transition: 'left 0.2s ease',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }
        })
      )
    );

  return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
    // Header + Avatar
    React.createElement('div', {
      style: {
        padding: '28px 24px 0', textAlign: 'center',
      }
    },
      React.createElement('div', {
        style: {
          width: '80px', height: '80px', borderRadius: '26px', margin: '0 auto 12px',
          background: 'linear-gradient(135deg, #7C3AED, #E11D48)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
          animation: 'float 3s ease-in-out infinite',
        }
      },
        React.createElement(window.lucide.User, { size: 36, color: '#FFF', strokeWidth: 1.5 })
      ),
      React.createElement('h2', {
        style: { fontSize: '20px', fontWeight: '800', color: t.text, marginBottom: '3px' }
      }, 'Sarah Chen'),
      React.createElement('p', {
        style: { fontSize: '13px', color: t.textSecondary }
      }, 'Joined March 2026 · 47 stitches crafted')
    ),

    // Stats
    React.createElement('div', {
      style: {
        margin: '20px 24px 0',
        display: 'flex', gap: '10px',
      }
    },
      stats.map(s => {
        const IconComp = window.lucide[s.icon];
        return React.createElement('div', {
          key: s.label,
          style: {
            flex: 1, background: t.card, borderRadius: '16px',
            border: `1px solid ${t.border}`, padding: '14px 10px',
            textAlign: 'center',
          }
        },
          IconComp ? React.createElement(IconComp, { size: 18, color: t.accent, style: { margin: '0 auto 6px', display: 'block' } }) : null,
          React.createElement('p', {
            style: { fontSize: '18px', fontWeight: '800', color: t.text, marginBottom: '2px' }
          }, s.value),
          React.createElement('p', {
            style: { fontSize: '10px', color: t.textMuted, fontWeight: '500' }
          }, s.label)
        );
      })
    ),

    // Calm Preferences
    React.createElement('div', {
      style: { padding: '20px 24px 0' }
    },
      React.createElement('h3', {
        style: { fontSize: '12px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }
      }, 'Calm Preferences'),
      React.createElement('div', {
        style: { background: t.card, borderRadius: '16px', border: `1px solid ${t.border}`, overflow: 'hidden' }
      },
        preferences.map((p, i) => {
          const IconComp = window.lucide[p.icon];
          return React.createElement('div', {
            key: p.label,
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              borderBottom: i < preferences.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: '10px' }
            },
              IconComp ? React.createElement('div', {
                style: {
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(IconComp, { size: 15, color: t.accent })) : null,
              React.createElement('span', { style: { fontSize: '14px', fontWeight: '500', color: t.text } }, p.label)
            ),
            React.createElement('span', {
              style: { fontSize: '13px', color: t.textMuted, fontWeight: '500' }
            }, p.value)
          );
        })
      )
    ),

    // App Settings
    React.createElement('div', {
      style: { padding: '16px 24px 0' }
    },
      React.createElement('h3', {
        style: { fontSize: '12px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }
      }, 'App Settings'),
      React.createElement('div', {
        style: { background: t.card, borderRadius: '16px', border: `1px solid ${t.border}`, overflow: 'hidden' }
      },
        toggleRow(notifications, setNotifications, 'Daily Flow Prompts'),
        toggleRow(autoSound, setAutoSound, 'Auto-play Soundscape'),
        toggleRow(haptics, setHaptics, 'Haptic Feedback'),
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
          }
        },
          React.createElement('span', { style: { fontSize: '14px', fontWeight: '500', color: t.text } }, 'Theme'),
          React.createElement('button', {
            onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
            className: 'btn-press',
            style: {
              display: 'flex', alignItems: 'center', gap: '6px',
              background: t.pill, border: `1px solid ${t.border}`,
              borderRadius: '10px', padding: '6px 12px', cursor: 'pointer',
            }
          },
            theme === 'dark'
              ? React.createElement(window.lucide.Moon, { size: 14, color: t.textSecondary })
              : React.createElement(window.lucide.Sun, { size: 14, color: t.textSecondary }),
            React.createElement('span', {
              style: { fontSize: '12px', fontWeight: '600', color: t.textSecondary }
            }, theme === 'dark' ? 'Dark' : 'Light')
          )
        )
      )
    ),

    // Export section
    React.createElement('div', {
      style: { padding: '16px 24px 24px' }
    },
      React.createElement('button', {
        className: 'btn-press',
        style: {
          width: '100%', height: '48px', borderRadius: '14px',
          background: 'none', border: `1px solid ${t.border}`,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', transition: 'all 0.2s ease',
        }
      },
        React.createElement(window.lucide.Download, { size: 16, color: t.textSecondary }),
        React.createElement('span', {
          style: { fontSize: '14px', fontWeight: '600', color: t.textSecondary }
        }, 'Export All Stitches')
      )
    )
  );
}
