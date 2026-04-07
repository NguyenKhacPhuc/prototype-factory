const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const [submittedSnippet, setSubmittedSnippet] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReflectionDetail, setShowReflectionDetail] = useState(null);
  const [tapestryProgress, setTapestryProgress] = useState(0);
  const [pulseActive, setPulseActive] = useState(true);

  const themes = {
    dark: {
      bg: '#0F0A1A',
      surface: '#1A1128',
      surfaceAlt: '#231840',
      card: '#2A1F45',
      cardHover: '#352A55',
      text: '#F8F0FF',
      textSecondary: '#B8A5D4',
      textMuted: '#7A6899',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      accent: '#8B5CF6',
      border: 'rgba(236,72,153,0.15)',
      glow: 'rgba(236,72,153,0.3)',
      ctaGlow: 'rgba(6,182,212,0.3)',
      overlay: 'rgba(15,10,26,0.85)',
    },
    light: {
      bg: '#FDF2F8',
      surface: '#FFFFFF',
      surfaceAlt: '#FEE2F0',
      card: '#FFFFFF',
      cardHover: '#FFF0F7',
      text: '#1A0A2E',
      textSecondary: '#6B4C8A',
      textMuted: '#9B7DB8',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      accent: '#8B5CF6',
      border: 'rgba(236,72,153,0.2)',
      glow: 'rgba(236,72,153,0.15)',
      ctaGlow: 'rgba(6,182,212,0.15)',
      overlay: 'rgba(253,242,248,0.9)',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [activeScreen]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTapestryProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const styleTag = React.createElement('style', null, `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.85; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes waveform {
      0%, 100% { height: 8px; }
      50% { height: 28px; }
    }
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes tapestryWeave {
      0% { clip-path: circle(0% at 50% 50%); }
      100% { clip-path: circle(75% at 50% 50%); }
    }
  `);

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  // ─── HOME SCREEN ───
  function HomeScreen() {
    const [promptExpanded, setPromptExpanded] = useState(false);
    const currentHour = 3;
    const promptText = "The hum of your 3 AM world";
    const promptSubtext = "What sounds fill your space right now? Capture the ambient symphony of your unconventional hour.";
    const contributorCount = 247;
    const nextBroadcast = '6:00 AM';

    return React.createElement('div', {
      style: { padding: '0 20px 100px', animation: 'fadeInUp 0.5s ease-out' }
    },
      // Greeting
      React.createElement('div', {
        style: { paddingTop: 20, marginBottom: 24 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 15, color: t.textMuted, fontWeight: 500, margin: 0 }
            }, 'Cycle #127 \u2022 3:14 AM'),
            React.createElement('h1', {
              style: {
                fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text,
                margin: '4px 0 0', letterSpacing: -0.5
              }
            }, 'Tonight\'s Canvas')
          ),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 44, height: 44, borderRadius: 22, border: 'none',
              background: t.surfaceAlt, display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer',
              transition: 'all 0.2s ease'
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary }))
        )
      ),

      // Active Prompt Card
      React.createElement('div', {
        onClick: () => setPromptExpanded(!promptExpanded),
        style: {
          background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}22, ${t.cta}22)`,
          borderRadius: 24, padding: 24, marginBottom: 20,
          border: `1px solid ${t.border}`,
          cursor: 'pointer', transition: 'all 0.3s ease',
          position: 'relative', overflow: 'hidden'
        }
      },
        // Decorative circle
        React.createElement('div', {
          style: {
            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
            borderRadius: 60, background: `radial-gradient(circle, ${t.primary}15, transparent)`,
            animation: 'pulse 3s ease-in-out infinite'
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative' }
        },
          React.createElement(Icon, { name: 'Sparkles', size: 16, color: t.primary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary, textTransform: 'uppercase', letterSpacing: 1 }
          }, 'Tonight\'s Prompt')
        ),
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text,
            margin: '0 0 8px', letterSpacing: -0.3, position: 'relative'
          }
        }, `"${promptText}"`),
        promptExpanded && React.createElement('p', {
          style: {
            fontFamily: font, fontSize: 15, color: t.textSecondary, lineHeight: 1.5,
            margin: '12px 0 0', animation: 'fadeInUp 0.3s ease-out'
          }
        }, promptSubtext),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, position: 'relative' }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6 }
          },
            React.createElement(Icon, { name: 'Users', size: 14, color: t.cta }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 600 }
            }, `${contributorCount} weaving`)
          ),
          React.createElement('div', {
            style: { width: 4, height: 4, borderRadius: 2, background: t.textMuted }
          }),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6 }
          },
            React.createElement(Icon, { name: 'Clock', size: 14, color: t.textSecondary }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
            }, `Broadcast at ${nextBroadcast}`)
          )
        )
      ),

      // Quick Capture CTA
      React.createElement('button', {
        onClick: () => setActiveScreen('capture'),
        style: {
          width: '100%', padding: '18px 24px', borderRadius: 16, border: 'none',
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          color: '#FFFFFF', fontFamily: font, fontSize: 17, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, marginBottom: 24, transition: 'all 0.2s ease',
          boxShadow: `0 8px 32px ${t.glow}`
        }
      },
        React.createElement(Icon, { name: 'Plus', size: 22, color: '#FFFFFF' }),
        React.createElement('span', null, 'Add Your Snippet')
      ),

      // Tapestry Status
      React.createElement('div', {
        style: { marginBottom: 24 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }
        },
          React.createElement('h3', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }
          }, 'Tapestry Forming'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted }
          }, '73% woven')
        ),
        React.createElement('div', {
          style: {
            height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden'
          }
        },
          React.createElement('div', {
            style: {
              height: '100%', width: '73%', borderRadius: 3,
              background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
              transition: 'width 1s ease'
            }
          })
        )
      ),

      // Recent Snippets Preview
      React.createElement('div', {
        style: { marginBottom: 24 }
      },
        React.createElement('h3', {
          style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 16px' }
        }, 'Latest Threads'),
        ...[
          { type: 'text', content: '"The refrigerator hum becomes a bassline at 2 AM..."', time: '12m ago', icon: 'Type' },
          { type: 'audio', content: 'Rain on a warehouse roof \u2022 0:14', time: '23m ago', icon: 'Mic' },
          { type: 'image', content: 'Neon reflections in an empty parking lot', time: '41m ago', icon: 'Camera' },
        ].map((snippet, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: t.surface, borderRadius: 16, marginBottom: 10,
              border: `1px solid ${t.border}`,
              animation: `slideInRight 0.4s ease-out ${i * 0.1}s both`,
              transition: 'all 0.2s ease', cursor: 'pointer'
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: `linear-gradient(135deg, ${t.primary}20, ${t.cta}20)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            }, React.createElement(Icon, { name: snippet.icon, size: 18, color: t.primary })),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', {
                style: {
                  fontFamily: font, fontSize: 15, color: t.text, margin: 0,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }
              }, snippet.content),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '4px 0 0' }
              }, snippet.time)
            )
          )
        )
      ),

      // Upcoming Broadcasts
      React.createElement('div', null,
        React.createElement('h3', {
          style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 16px' }
        }, 'Upcoming Broadcasts'),
        ...[
          { time: '6:00 AM', title: 'Dawn Chorus Tapestry', listeners: 1240 },
          { time: '2:00 PM', title: 'Midday Interlude', listeners: 890 },
        ].map((broadcast, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setActiveScreen('live'),
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px',
              background: t.card, borderRadius: 16, marginBottom: 10,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              transition: 'all 0.2s ease'
            }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${t.cta}30, ${t.primary}30)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            }, React.createElement(Icon, { name: 'Radio', size: 22, color: t.cta })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
              }, broadcast.title),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
              }, `${broadcast.time} \u2022 ${broadcast.listeners} listeners`)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
          )
        )
      )
    );
  }

  // ─── CAPTURE SCREEN ───
  function CaptureScreen() {
    const mediaTypes = [
      { id: 'text', icon: 'Type', label: 'Text' },
      { id: 'photo', icon: 'Camera', label: 'Photo' },
      { id: 'audio', icon: 'Mic', label: 'Audio' },
      { id: 'video', icon: 'Video', label: 'Video' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', animation: 'fadeInUp 0.5s ease-out' }
    },
      React.createElement('div', { style: { paddingTop: 20, marginBottom: 24 } },
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }
        }, 'Capture'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '6px 0 0' }
        }, 'Add your voice to tonight\'s tapestry')
      ),

      // Current prompt reminder
      React.createElement('div', {
        style: {
          padding: '16px 20px', borderRadius: 16, marginBottom: 24,
          background: `linear-gradient(135deg, ${t.primary}15, ${t.accent}10)`,
          border: `1px solid ${t.border}`
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
        },
          React.createElement(Icon, { name: 'Sparkles', size: 14, color: t.primary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary }
          }, 'TONIGHT\'S PROMPT')
        ),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0, lineHeight: 1.4 }
        }, '"The hum of your 3 AM world"')
      ),

      // Media type selector
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 24 }
      },
        ...mediaTypes.map((mt) =>
          React.createElement('button', {
            key: mt.id,
            onClick: () => { setSelectedMedia(mt.id); setSubmittedSnippet(false); },
            style: {
              flex: 1, padding: '14px 8px', borderRadius: 14, border: 'none',
              background: selectedMedia === mt.id
                ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})`
                : t.surface,
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 6, transition: 'all 0.25s ease',
              boxShadow: selectedMedia === mt.id ? `0 4px 20px ${t.glow}` : 'none'
            }
          },
            React.createElement(Icon, {
              name: mt.icon, size: 20,
              color: selectedMedia === mt.id ? '#FFFFFF' : t.textSecondary
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 13, fontWeight: 600,
                color: selectedMedia === mt.id ? '#FFFFFF' : t.textSecondary
              }
            }, mt.label)
          )
        )
      ),

      // Capture area
      selectedMedia === 'text' && React.createElement('div', {
        style: { marginBottom: 24 }
      },
        React.createElement('textarea', {
          value: textInput,
          onChange: (e) => setTextInput(e.target.value),
          placeholder: 'Describe the hum of your world right now...',
          style: {
            width: '100%', minHeight: 160, padding: 20, borderRadius: 20,
            border: `2px solid ${t.border}`, background: t.surface,
            color: t.text, fontFamily: font, fontSize: 17, lineHeight: 1.6,
            resize: 'vertical', outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s ease'
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 }
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted }
          }, `${textInput.length}/280 characters`),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted }
          }, 'Anonymous')
        )
      ),

      selectedMedia === 'photo' && React.createElement('div', {
        style: {
          height: 240, borderRadius: 20, border: `2px dashed ${t.border}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 12, marginBottom: 24, background: t.surface
        }
      },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 20, background: `${t.primary}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        }, React.createElement(Icon, { name: 'Camera', size: 28, color: t.primary })),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0 }
        }, 'Tap to capture a photo'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
        }, 'or choose from your gallery')
      ),

      selectedMedia === 'audio' && React.createElement('div', {
        style: {
          padding: 24, borderRadius: 20, background: t.surface,
          border: `1px solid ${t.border}`, marginBottom: 24,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }
        },
          ...[12, 20, 28, 16, 24, 32, 18, 26, 14, 22, 30, 20, 16, 24].map((h, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 4, borderRadius: 2,
                background: `linear-gradient(to top, ${t.primary}, ${t.cta})`,
                animation: `waveform ${0.6 + i * 0.1}s ease-in-out infinite`,
                animationDelay: `${i * 0.05}s`
              }
            })
          )
        ),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0 }
        }, 'Tap the button below to record'),
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: 36,
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 24px ${t.glow}`, cursor: 'pointer'
          }
        }, React.createElement(Icon, { name: 'Mic', size: 28, color: '#FFFFFF' })),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
        }, 'Max 30 seconds')
      ),

      selectedMedia === 'video' && React.createElement('div', {
        style: {
          height: 240, borderRadius: 20, background: t.surface,
          border: `2px dashed ${t.border}`, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24
        }
      },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 20, background: `${t.cta}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        }, React.createElement(Icon, { name: 'Video', size: 28, color: t.cta })),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0 }
        }, 'Record a micro-video'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
        }, 'Up to 15 seconds')
      ),

      // Submit button
      !submittedSnippet ? React.createElement('button', {
        onClick: () => setSubmittedSnippet(true),
        style: {
          width: '100%', padding: '18px 24px', borderRadius: 16, border: 'none',
          background: `linear-gradient(135deg, ${t.cta}, #0891B2)`,
          color: '#FFFFFF', fontFamily: font, fontSize: 17, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, boxShadow: `0 8px 32px ${t.ctaGlow}`, transition: 'all 0.2s ease'
        }
      },
        React.createElement(Icon, { name: 'Send', size: 20, color: '#FFFFFF' }),
        React.createElement('span', null, 'Weave Into Tapestry')
      ) : React.createElement('div', {
        style: {
          width: '100%', padding: '20px 24px', borderRadius: 16,
          background: `linear-gradient(135deg, #10B98120, #06B6D420)`,
          border: `1px solid #10B98140`, textAlign: 'center',
          animation: 'fadeInUp 0.4s ease-out', boxSizing: 'border-box'
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }
        },
          React.createElement(Icon, { name: 'Check', size: 22, color: '#10B981' }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: '#10B981' }
          }, 'Snippet Woven!')
        ),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '8px 0 0' }
        }, 'Your contribution will appear in the next tapestry')
      ),

      // Tips
      React.createElement('div', {
        style: { marginTop: 24, padding: '16px 20px', borderRadius: 16, background: t.surfaceAlt }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
        },
          React.createElement(Icon, { name: 'Lightbulb', size: 16, color: t.accent }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.accent }
          }, 'CAPTURE TIP')
        ),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.5 }
        }, 'The most powerful snippets capture the raw, unfiltered moments. Don\'t overthink it \u2014 the AI weaver finds beauty in the authentic.')
      )
    );
  }

  // ─── LIVE SCREEN ───
  function LiveScreen() {
    const [showChat, setShowChat] = useState(false);

    return React.createElement('div', {
      style: { padding: '0 20px 100px', animation: 'fadeInUp 0.5s ease-out' }
    },
      React.createElement('div', { style: { paddingTop: 20, marginBottom: 24 } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
        },
          React.createElement('h1', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }
          }, 'Live'),
          isPlaying && React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              borderRadius: 20, background: '#EF444420'
            }
          },
            React.createElement('div', {
              style: {
                width: 8, height: 8, borderRadius: 4, background: '#EF4444',
                animation: 'pulse 1.5s ease-in-out infinite'
              }
            }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#EF4444' }
            }, 'LIVE')
          )
        ),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '6px 0 0' }
        }, 'Experience the collective tapestry')
      ),

      // Tapestry Visualization
      React.createElement('div', {
        style: {
          height: 280, borderRadius: 24, marginBottom: 20, position: 'relative',
          overflow: 'hidden',
          background: isPlaying
            ? `linear-gradient(135deg, ${t.primary}40, ${t.accent}30, ${t.cta}40)`
            : t.surface,
          border: `1px solid ${t.border}`,
          transition: 'all 0.5s ease'
        }
      },
        // Animated background layers
        isPlaying && React.createElement('div', {
          style: {
            position: 'absolute', inset: 0,
            background: `linear-gradient(45deg, ${t.primary}20, ${t.cta}20, ${t.accent}20, ${t.primary}20)`,
            backgroundSize: '300% 300%',
            animation: 'gradientShift 4s ease infinite'
          }
        }),
        isPlaying && React.createElement('div', {
          style: {
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 160, height: 160, borderRadius: 80,
            border: `2px solid ${t.primary}40`,
            animation: 'ripple 2s ease-out infinite'
          }
        }),
        isPlaying && React.createElement('div', {
          style: {
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 160, height: 160, borderRadius: 80,
            border: `2px solid ${t.cta}40`,
            animation: 'ripple 2s ease-out infinite 0.6s'
          }
        }),

        // Center content
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12
          }
        },
          isPlaying ? React.createElement('div', {
            style: { animation: 'float 3s ease-in-out infinite' }
          },
            React.createElement('div', {
              style: {
                width: 72, height: 72, borderRadius: 36,
                background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 40px ${t.glow}`,
                animation: 'spinSlow 8s linear infinite'
              }
            }, React.createElement(Icon, { name: 'Waves', size: 32, color: '#FFFFFF' }))
          ) : React.createElement('div', {
            style: {
              width: 72, height: 72, borderRadius: 36, background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: 'Radio', size: 32, color: t.textMuted })),
          React.createElement('p', {
            style: {
              fontFamily: font, fontSize: 17, fontWeight: 600,
              color: isPlaying ? t.text : t.textMuted, margin: 0
            }
          }, isPlaying ? 'Dawn Chorus Tapestry' : 'Next broadcast at 6:00 AM'),
          isPlaying && React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: 0 }
          }, '1,247 listening now')
        )
      ),

      // Playback controls
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
          marginBottom: 24
        }
      },
        React.createElement('button', {
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surfaceAlt, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer'
          }
        }, React.createElement(Icon, { name: 'SkipBack', size: 20, color: t.textSecondary })),
        React.createElement('button', {
          onClick: () => setIsPlaying(!isPlaying),
          style: {
            width: 64, height: 64, borderRadius: 32, border: 'none',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: `0 6px 24px ${t.glow}`,
            transition: 'all 0.2s ease'
          }
        }, React.createElement(Icon, {
          name: isPlaying ? 'Pause' : 'Play', size: 28, color: '#FFFFFF'
        })),
        React.createElement('button', {
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surfaceAlt, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer'
          }
        }, React.createElement(Icon, { name: 'SkipForward', size: 20, color: t.textSecondary }))
      ),

      // Progress bar
      isPlaying && React.createElement('div', {
        style: { marginBottom: 24 }
      },
        React.createElement('div', {
          style: { height: 4, borderRadius: 2, background: t.surfaceAlt, marginBottom: 8 }
        },
          React.createElement('div', {
            style: {
              height: '100%', width: `${tapestryProgress}%`, borderRadius: 2,
              background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
              transition: 'width 0.1s linear'
            }
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between' }
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted }
          }, `${Math.floor(tapestryProgress * 0.048)}:${String(Math.floor(tapestryProgress * 2.88) % 60).padStart(2, '0')}`),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted }
          }, '4:48')
        )
      ),

      // Current segment info
      isPlaying && React.createElement('div', {
        style: {
          padding: 20, borderRadius: 20, background: t.surface,
          border: `1px solid ${t.border}`, marginBottom: 20,
          animation: 'fadeInUp 0.4s ease-out'
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }
        },
          React.createElement(Icon, { name: 'Layers', size: 16, color: t.cta }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta }
          }, 'NOW WEAVING')
        ),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.text, margin: '0 0 6px', lineHeight: 1.5 }
        }, 'Ambient sounds blending with whispered text fragments \u2014 a night worker\'s meditation on solitude'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
        }, '14 snippets \u2022 8 contributors')
      ),

      // Reactions
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 20 }
      },
        ...['Heart', 'Flame', 'Star', 'Zap'].map((icon, i) =>
          React.createElement('button', {
            key: i,
            style: {
              flex: 1, padding: '12px', borderRadius: 14, border: `1px solid ${t.border}`,
              background: t.surface, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6, cursor: 'pointer',
              transition: 'all 0.2s ease'
            }
          },
            React.createElement(Icon, { name: icon, size: 18, color: t.primary }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
            }, [142, 89, 67, 34][i])
          )
        )
      ),

      // Listener bubbles
      React.createElement('div', {
        style: {
          padding: 20, borderRadius: 20, background: t.surfaceAlt
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
          }, 'Fellow Night Owls'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted }
          }, '1,247 tuned in')
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: -4 }
        },
          ...Array(8).fill(0).map((_, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 36, height: 36, borderRadius: 18, marginLeft: i > 0 ? -8 : 0,
                background: `linear-gradient(135deg, ${['#EC4899', '#8B5CF6', '#06B6D4', '#F59E0B', '#10B981', '#EF4444', '#6366F1', '#EC4899'][i]}, ${['#F472B6', '#A78BFA', '#22D3EE', '#FBBF24', '#34D399', '#F87171', '#818CF8', '#F472B6'][i]})`,
                border: `2px solid ${t.bg}`, position: 'relative', zIndex: 8 - i
              }
            })
          ),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18, marginLeft: -8,
              background: t.surface, border: `2px solid ${t.bg}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 0
            }
          },
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.textMuted }
            }, '+1.2k')
          )
        )
      )
    );
  }

  // ─── REFLECT SCREEN ───
  function ReflectScreen() {
    const pastTapestries = [
      {
        id: 1, title: 'Midnight Symphony #126', date: 'Apr 7',
        theme: 'Urban nocturnes and machine lullabies',
        contributors: 312, snippets: 487, rating: 4.8,
        insights: [
          'A recurring motif of fluorescent light imagery emerged across 23% of text submissions',
          'Audio contributions showed a 40% increase in ambient/environmental recordings',
          'The AI detected an unexpected harmonic resonance between three independent audio clips'
        ]
      },
      {
        id: 2, title: 'Graveyard Blues #125', date: 'Apr 6',
        theme: 'The weight of silence between shifts',
        contributors: 289, snippets: 421, rating: 4.6,
        insights: [
          'Text submissions were notably more introspective compared to previous cycles',
          'Photography leaned heavily into chiaroscuro compositions',
        ]
      },
      {
        id: 3, title: 'Dawn Watchers #124', date: 'Apr 5',
        theme: 'First light through tired eyes',
        contributors: 356, snippets: 534, rating: 4.9,
        insights: [
          'Highest participation rate this month with unique perspectives on dawn rituals',
        ]
      },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', animation: 'fadeInUp 0.5s ease-out' }
    },
      React.createElement('div', { style: { paddingTop: 20, marginBottom: 24 } },
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }
        }, 'Reflect'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '6px 0 0' }
        }, 'Curator\'s notes from past tapestries')
      ),

      // Stats overview
      React.createElement('div', {
        style: {
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24
        }
      },
        ...[
          { label: 'Tapestries', value: '126', icon: 'Layers' },
          { label: 'Contributors', value: '4.2k', icon: 'Users' },
          { label: 'Snippets', value: '52k', icon: 'Puzzle' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '16px 12px', borderRadius: 16, background: t.surface,
              border: `1px solid ${t.border}`, textAlign: 'center',
              animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12,
                background: `${t.primary}15`, margin: '0 auto 8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: stat.icon, size: 18, color: t.primary })),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
            }, stat.label)
          )
        )
      ),

      // Past tapestries
      ...pastTapestries.map((tp, i) =>
        React.createElement('div', {
          key: tp.id,
          onClick: () => setShowReflectionDetail(showReflectionDetail === tp.id ? null : tp.id),
          style: {
            padding: 20, borderRadius: 20, background: t.card, marginBottom: 14,
            border: `1px solid ${showReflectionDetail === tp.id ? t.primary + '40' : t.border}`,
            cursor: 'pointer', transition: 'all 0.3s ease',
            animation: `slideInRight 0.4s ease-out ${i * 0.1}s both`
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }
          },
            React.createElement('div', null,
              React.createElement('h3', {
                style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }
              }, tp.title),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '4px 0 0' }
              }, tp.date)
            ),
            React.createElement('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 10,
                background: `${t.primary}15`
              }
            },
              React.createElement(Icon, { name: 'Star', size: 14, color: t.primary }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary }
              }, tp.rating)
            )
          ),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 12px', lineHeight: 1.4, fontStyle: 'italic' }
          }, `"${tp.theme}"`),
          React.createElement('div', {
            style: { display: 'flex', gap: 16 }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 }
            },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted }
              }, tp.contributors)
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 }
            },
              React.createElement(Icon, { name: 'Puzzle', size: 14, color: t.textMuted }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted }
              }, `${tp.snippets} snippets`)
            )
          ),

          // Expanded insights
          showReflectionDetail === tp.id && React.createElement('div', {
            style: {
              marginTop: 16, paddingTop: 16,
              borderTop: `1px solid ${t.border}`,
              animation: 'fadeInUp 0.3s ease-out'
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
            },
              React.createElement(Icon, { name: 'Brain', size: 16, color: t.cta }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta, textTransform: 'uppercase', letterSpacing: 0.5 }
              }, 'AI Curator\'s Notes')
            ),
            ...tp.insights.map((insight, j) =>
              React.createElement('div', {
                key: j,
                style: {
                  display: 'flex', gap: 10, marginBottom: 10, padding: '10px 12px',
                  borderRadius: 12, background: `${t.cta}08`
                }
              },
                React.createElement('div', {
                  style: {
                    width: 6, minHeight: 6, borderRadius: 3, background: t.cta,
                    marginTop: 7, flexShrink: 0
                  }
                }),
                React.createElement('p', {
                  style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.5 }
                }, insight)
              )
            )
          )
        )
      )
    );
  }

  // ─── PROFILE SCREEN ───
  function ProfileScreen() {
    const stats = [
      { label: 'Snippets Shared', value: '47', icon: 'Send' },
      { label: 'Tapestries Heard', value: '89', icon: 'Headphones' },
      { label: 'Streak', value: '12d', icon: 'Flame' },
      { label: 'Featured', value: '3x', icon: 'Award' },
    ];

    const settings = [
      { label: 'Notification Preferences', icon: 'Bell', desc: 'Manage alerts for broadcasts and prompts' },
      { label: 'Schedule & Timezone', icon: 'Clock', desc: 'Set your Chronos cycle rhythm' },
      { label: 'Privacy Settings', icon: 'Shield', desc: 'Control your anonymous identity' },
      { label: 'Audio Quality', icon: 'Sliders', desc: 'Streaming and recording quality' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', animation: 'fadeInUp 0.5s ease-out' }
    },
      React.createElement('div', { style: { paddingTop: 20, marginBottom: 24 } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
        },
          React.createElement('h1', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }
          }, 'Profile'),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', borderRadius: 12, border: `1px solid ${t.border}`,
              background: t.surface, cursor: 'pointer'
            }
          },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.primary }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary }
            }, isDark ? 'Light' : 'Dark')
          )
        )
      ),

      // Avatar
      React.createElement('div', {
        style: { textAlign: 'center', marginBottom: 28 }
      },
        React.createElement('div', {
          style: {
            width: 88, height: 88, borderRadius: 44, margin: '0 auto 14px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.accent}, ${t.cta})`,
            backgroundSize: '200% 200%',
            animation: 'gradientShift 4s ease infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 32px ${t.glow}`
          }
        }, React.createElement(Icon, { name: 'Ghost', size: 40, color: '#FFFFFF' })),
        React.createElement('h2', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 4px' }
        }, 'Anonymous Weaver'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: 0 }
        }, 'Night Owl \u2022 Since Jan 2026'),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 20, marginTop: 10,
            background: `${t.primary}15`, border: `1px solid ${t.primary}30`
          }
        },
          React.createElement(Icon, { name: 'Moon', size: 14, color: t.primary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary }
          }, 'Nocturnal Creator')
        )
      ),

      // Stats grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }
      },
        ...stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '18px 16px', borderRadius: 18, background: t.card,
              border: `1px solid ${t.border}`,
              animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both`
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }
            },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: 10,
                  background: `${[t.primary, t.cta, '#F59E0B', t.accent][i]}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }
              }, React.createElement(Icon, {
                name: stat.icon, size: 16,
                color: [t.primary, t.cta, '#F59E0B', t.accent][i]
              }))
            ),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 26, fontWeight: 800, color: t.text, margin: '0 0 2px' }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
            }, stat.label)
          )
        )
      ),

      // Your Rhythm
      React.createElement('div', {
        style: {
          padding: 20, borderRadius: 20, marginBottom: 24,
          background: `linear-gradient(135deg, ${t.primary}10, ${t.cta}10)`,
          border: `1px solid ${t.border}`
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }
        },
          React.createElement(Icon, { name: 'Activity', size: 16, color: t.primary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
          }, 'Your Chronos Rhythm')
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 3, alignItems: 'flex-end', height: 48 }
        },
          ...[15, 42, 68, 85, 92, 78, 45, 20, 10, 8, 5, 4, 3, 5, 8, 12, 18, 25, 35, 55, 72, 88, 65, 38].map((h, i) =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1, height: `${h}%`, borderRadius: 2, minHeight: 3,
                background: h > 60
                  ? `linear-gradient(to top, ${t.primary}, ${t.secondary})`
                  : `${t.textMuted}30`,
                transition: 'all 0.3s ease'
              }
            })
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 }
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 11, color: t.textMuted }
          }, '12AM'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 11, color: t.textMuted }
          }, '6AM'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 11, color: t.textMuted }
          }, '12PM'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 11, color: t.textMuted }
          }, '6PM')
        ),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '12px 0 0', textAlign: 'center' }
        }, 'Most active between 10 PM \u2013 4 AM')
      ),

      // Settings
      ...settings.map((setting, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '16px',
            borderRadius: 16, background: t.card, marginBottom: 8,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 0.2s ease'
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(Icon, { name: setting.icon, size: 18, color: t.textSecondary })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
            }, setting.label),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
            }, setting.desc)
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
        )
      )
    );
  }

  // ─── NAVIGATION ───
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'capture', icon: 'PlusCircle', label: 'Capture' },
    { id: 'live', icon: 'Radio', label: 'Live' },
    { id: 'reflect', icon: 'Brain', label: 'Reflect' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const screens = {
    home: HomeScreen,
    capture: CaptureScreen,
    live: LiveScreen,
    reflect: ReflectScreen,
    profile: ProfileScreen,
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: font, padding: '20px 0'
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44,
        background: t.bg, position: 'relative', overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column'
      }
    },
      // Scrollable content area
      React.createElement('div', {
        key: animKey,
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch'
        }
      },
        React.createElement(screens[activeScreen])
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: isDark ? 'rgba(15,10,26,0.92)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          padding: '8px 0 28px', zIndex: 100
        }
      },
        ...tabs.map((tab) =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, border: 'none', background: 'transparent',
              cursor: 'pointer', padding: '4px 12px', minWidth: 44, minHeight: 44,
              transition: 'all 0.2s ease'
            }
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.primary : t.textMuted
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 11, fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.primary : t.textMuted,
                transition: 'all 0.2s ease'
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
