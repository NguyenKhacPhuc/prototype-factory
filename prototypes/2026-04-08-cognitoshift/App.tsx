const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);
  const [selectedLens, setSelectedLens] = useState(null);
  const [inputContent, setInputContent] = useState('');
  const [showTransform, setShowTransform] = useState(false);
  const [activeWeave, setActiveWeave] = useState(null);

  const themes = {
    light: {
      bg: '#FDF2F8',
      surface: '#FFFFFF',
      surfaceAlt: '#FEE2E2',
      card: '#FFFFFF',
      cardAlt: '#FFF1F2',
      text: '#1A1A2E',
      textSecondary: '#6B7280',
      textTertiary: '#9CA3AF',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      ctaLight: '#ECFEFF',
      border: '#F3E8FF',
      navBg: 'rgba(255,255,255,0.92)',
      gradient1: 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #06B6D4 100%)',
      gradient2: 'linear-gradient(135deg, #06B6D4 0%, #EC4899 100%)',
      gradient3: 'linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 100%)',
      shadow: '0 2px 16px rgba(236,72,153,0.10)',
      shadowLg: '0 8px 32px rgba(236,72,153,0.15)',
    },
    dark: {
      bg: '#0F0A1A',
      surface: '#1A1128',
      surfaceAlt: '#251A35',
      card: '#1E1530',
      cardAlt: '#2A1F3D',
      text: '#F8F0FF',
      textSecondary: '#A78BBA',
      textTertiary: '#6B5A7D',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      ctaLight: '#0A2A30',
      border: '#2D1F42',
      navBg: 'rgba(15,10,26,0.95)',
      gradient1: 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #06B6D4 100%)',
      gradient2: 'linear-gradient(135deg, #06B6D4 0%, #EC4899 100%)',
      gradient3: 'linear-gradient(180deg, #0F0A1A 0%, #1A1128 100%)',
      shadow: '0 2px 16px rgba(0,0,0,0.3)',
      shadowLg: '0 8px 32px rgba(0,0,0,0.4)',
    }
  };

  const t = darkMode ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const Icon = ({ name, size = 24, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  // ─── HOME SCREEN ───
  function HomeScreen() {
    const [greeting] = useState(() => {
      const h = new Date().getHours();
      return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    });

    const recentTransforms = [
      { title: 'Quantum Computing Basics', lens: 'Cyberpunk Noir', progress: 78, color: '#EC4899' },
      { title: 'Neural Networks Deep Dive', lens: 'Quest Tree', progress: 45, color: '#06B6D4' },
      { title: 'Climate Science Report', lens: 'Socratic Debate', progress: 92, color: '#F472B6' },
    ];

    const suggestedLenses = [
      { name: 'Detective Mystery', icon: 'Search', desc: 'Uncover facts like clues', gradient: 'linear-gradient(135deg, #7C3AED, #EC4899)' },
      { name: 'Time Traveler', icon: 'Clock', desc: 'Learn through eras', gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)' },
      { name: 'Game Quest', icon: 'Gamepad2', desc: 'Level up your knowledge', gradient: 'linear-gradient(135deg, #F59E0B, #EC4899)' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontSize: 15, color: t.textSecondary, fontFamily: font, fontWeight: 500, marginBottom: 2 }
          }, greeting),
          React.createElement('h1', {
            style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 }
          }, 'CognitoShift')
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surface, boxShadow: t.shadow, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s ease',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.9)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.primary })
        )
      ),

      // Quick Input Card
      React.createElement('div', {
        style: {
          background: t.gradient1, borderRadius: 20, padding: 24, marginBottom: 24,
          boxShadow: t.shadowLg, position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -40, right: -40, width: 120, height: 120,
            borderRadius: 60, background: 'rgba(255,255,255,0.1)', animation: 'pulse 3s ease infinite',
          }
        }),
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: 700, color: '#FFF', fontFamily: font, margin: '0 0 8px', letterSpacing: -0.3 }
        }, 'Start a New Remix'),
        React.createElement('p', {
          style: { fontSize: 15, color: 'rgba(255,255,255,0.85)', fontFamily: font, margin: '0 0 16px' }
        }, 'Paste a URL, text, or upload content to transform'),
        React.createElement('button', {
          onClick: () => setActiveScreen('create'),
          style: {
            background: '#FFF', color: '#EC4899', border: 'none', borderRadius: 14,
            padding: '14px 24px', fontSize: 17, fontWeight: 700, fontFamily: font,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.96)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(Icon, { name: 'Sparkles', size: 20, color: '#EC4899' }),
          React.createElement('span', null, 'Transform Content')
        )
      ),

      // Recent Transforms
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('h3', {
            style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: 0, letterSpacing: -0.3 }
          }, 'Continue Learning'),
          React.createElement('button', {
            style: { background: 'none', border: 'none', color: t.cta, fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer' }
          }, 'See All')
        ),
        recentTransforms.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
              boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', transition: 'transform 0.15s ease, box-shadow 0.2s ease',
              animation: `slideUp 0.4s ease ${i * 0.1}s both`,
              border: `1px solid ${t.border}`,
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement(Icon, { name: 'BookOpen', size: 22, color: item.color })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', {
                style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
              }, item.title),
              React.createElement('p', {
                style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 }
              }, `${item.lens} Lens`),
              React.createElement('div', {
                style: { marginTop: 6, height: 4, borderRadius: 2, background: t.border, overflow: 'hidden' }
              },
                React.createElement('div', {
                  style: { width: `${item.progress}%`, height: '100%', borderRadius: 2, background: item.color, transition: 'width 0.6s ease' }
                })
              )
            ),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 700, color: item.color, fontFamily: font }
            }, `${item.progress}%`)
          )
        )
      ),

      // Suggested Lenses
      React.createElement('h3', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 14px', letterSpacing: -0.3 }
      }, 'Suggested Lenses'),
      React.createElement('div', {
        style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, margin: '0 -16px', padding: '0 16px 8px' }
      },
        suggestedLenses.map((lens, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => { setSelectedLens(lens); setActiveScreen('lenses'); },
            style: {
              minWidth: 140, borderRadius: 18, padding: 18, cursor: 'pointer',
              background: lens.gradient, position: 'relative', overflow: 'hidden',
              transition: 'transform 0.15s ease',
              animation: `slideUp 0.5s ease ${i * 0.12}s both`,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.95)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }
            },
              React.createElement(Icon, { name: lens.icon, size: 22, color: '#FFF' })
            ),
            React.createElement('p', {
              style: { fontSize: 15, fontWeight: 700, color: '#FFF', fontFamily: font, margin: '0 0 4px' }
            }, lens.name),
            React.createElement('p', {
              style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font, margin: 0 }
            }, lens.desc)
          )
        )
      )
    );
  }

  // ─── CREATE / TRANSFORM SCREEN ───
  function CreateScreen() {
    const [step, setStep] = useState(0);
    const [chosenLens, setChosenLens] = useState(null);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformed, setTransformed] = useState(false);

    const inputMethods = [
      { icon: 'Link', label: 'Paste URL', desc: 'Article, video, or webpage' },
      { icon: 'FileText', label: 'Text Input', desc: 'Paste or type content' },
      { icon: 'Mic', label: 'Record Audio', desc: 'Lectures or notes' },
      { icon: 'Upload', label: 'Upload File', desc: 'PDF, DOCX, TXT' },
    ];

    const lensOptions = [
      { name: 'Cyberpunk Noir Detective', icon: 'Search', color: '#7C3AED', desc: 'Unravel knowledge through dark, atmospheric storytelling' },
      { name: 'Socratic Debate Simulator', icon: 'MessageCircle', color: '#EC4899', desc: 'Challenge ideas through philosophical dialogue' },
      { name: 'Gamified Quest Tree', icon: 'Gamepad2', color: '#F59E0B', desc: 'Level up with branching skill paths' },
      { name: 'Visual Mind Palace', icon: 'Brain', color: '#06B6D4', desc: 'Spatial memory technique with rich imagery' },
      { name: 'Storyteller Chronicle', icon: 'BookOpen', color: '#10B981', desc: 'Transform facts into epic narratives' },
    ];

    const handleTransform = () => {
      setIsTransforming(true);
      setTimeout(() => { setIsTransforming(false); setTransformed(true); }, 2500);
    };

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
      },
        step > 0 && React.createElement('button', {
          onClick: () => { if (transformed) { setTransformed(false); setStep(1); } else setStep(step - 1); },
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surface, boxShadow: t.shadow, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 22 })),
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 }
        }, transformed ? 'Your Remix' : step === 0 ? 'Add Content' : 'Choose Lens')
      ),

      // Progress dots
      !transformed && React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }
      },
        [0, 1].map(i =>
          React.createElement('div', {
            key: i,
            style: {
              width: step === i ? 24 : 8, height: 8, borderRadius: 4,
              background: step >= i ? t.primary : t.border,
              transition: 'all 0.3s ease',
            }
          })
        )
      ),

      // Step 0: Input method
      step === 0 && React.createElement('div', null,
        inputMethods.map((method, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => setStep(1),
            style: {
              width: '100%', background: t.card, border: `1px solid ${t.border}`,
              borderRadius: 16, padding: 18, marginBottom: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14,
              transition: 'all 0.15s ease', textAlign: 'left',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
              boxShadow: t.shadow,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${t.primary}15, ${t.cta}20)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: method.icon, size: 22, color: t.primary })),
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 2px' }
              }, method.label),
              React.createElement('p', {
                style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 }
              }, method.desc)
            ),
            React.createElement('div', { style: { marginLeft: 'auto' } },
              React.createElement(Icon, { name: 'ChevronRight', size: 20, color: t.textTertiary })
            )
          )
        ),
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 16, padding: 18, marginTop: 14,
            border: `1px solid ${t.border}`, boxShadow: t.shadow,
          }
        },
          React.createElement('textarea', {
            placeholder: 'Or paste content directly here...',
            value: inputContent,
            onChange: (e) => setInputContent(e.target.value),
            style: {
              width: '100%', minHeight: 100, border: 'none', background: 'transparent',
              fontSize: 15, fontFamily: font, color: t.text, resize: 'vertical', outline: 'none',
              boxSizing: 'border-box',
            }
          }),
          inputContent && React.createElement('button', {
            onClick: () => setStep(1),
            style: {
              marginTop: 12, background: t.gradient1, color: '#FFF', border: 'none',
              borderRadius: 12, padding: '12px 20px', fontSize: 15, fontWeight: 600,
              fontFamily: font, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }
          },
            React.createElement(Icon, { name: 'ArrowRight', size: 18, color: '#FFF' }),
            React.createElement('span', null, 'Continue')
          )
        )
      ),

      // Step 1: Choose Lens
      step === 1 && !isTransforming && !transformed && React.createElement('div', null,
        lensOptions.map((lens, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => { setChosenLens(lens); handleTransform(); },
            style: {
              width: '100%', background: chosenLens === lens ? `${lens.color}15` : t.card,
              border: `2px solid ${chosenLens === lens ? lens.color : t.border}`,
              borderRadius: 18, padding: 18, marginBottom: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              transition: 'all 0.2s ease',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
              boxShadow: t.shadow,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: `linear-gradient(135deg, ${lens.color}30, ${lens.color}60)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: lens.icon, size: 24, color: lens.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 3px' }
              }, lens.name),
              React.createElement('p', {
                style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0, lineHeight: 1.4 }
              }, lens.desc)
            )
          )
        )
      ),

      // Transforming animation
      isTransforming && React.createElement('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: 300, animation: 'fadeIn 0.3s ease',
        }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 40,
            background: t.gradient1, animation: 'pulse 1.2s ease infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          }
        }, React.createElement(Icon, { name: 'Sparkles', size: 36, color: '#FFF' })),
        React.createElement('p', {
          style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 8 }
        }, 'Transforming...'),
        React.createElement('p', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, textAlign: 'center' }
        }, `Applying ${chosenLens?.name || ''} lens to your content`),
        React.createElement('div', {
          style: {
            marginTop: 24, width: 200, height: 6, borderRadius: 3,
            background: t.border, overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              width: '100%', height: '100%', borderRadius: 3,
              background: t.gradient1, animation: 'shimmer 1.5s ease infinite',
              transformOrigin: 'left',
            }
          })
        )
      ),

      // Transformed Result
      transformed && React.createElement('div', { style: { animation: 'slideUp 0.5s ease' } },
        React.createElement('div', {
          style: {
            background: t.gradient1, borderRadius: 20, padding: 22,
            marginBottom: 16, position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: -20, right: -20, width: 80, height: 80,
              borderRadius: 40, background: 'rgba(255,255,255,0.1)',
            }
          }),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }
          },
            React.createElement(Icon, { name: chosenLens?.icon || 'Sparkles', size: 20, color: '#FFF' }),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: font }
            }, `${chosenLens?.name || ''} Lens Applied`)
          ),
          React.createElement('h3', {
            style: { fontSize: 22, fontWeight: 700, color: '#FFF', fontFamily: font, margin: '0 0 6px' }
          }, 'The Case of the Quantum Enigma'),
          React.createElement('p', {
            style: { fontSize: 15, color: 'rgba(255,255,255,0.85)', fontFamily: font, lineHeight: 1.5, margin: 0 }
          }, 'Chapter 1: The rain hammered the neon-soaked streets as Detective Qubit stared at the holographic evidence board...')
        ),

        // Content sections
        ['Chapter 1: The Double Slit Mystery', 'Chapter 2: Entangled Evidence', 'Chapter 3: The Observer Effect'].map((ch, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
              border: `1px solid ${t.border}`, boxShadow: t.shadow,
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              transition: 'transform 0.15s ease',
              animation: `slideUp 0.4s ease ${(i + 1) * 0.1}s both`,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12,
                background: `${chosenLens?.color || t.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: i === 0 ? 'Play' : 'Lock', size: 20, color: chosenLens?.color || t.primary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 2px' }
              }, ch),
              React.createElement('p', {
                style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 }
              }, i === 0 ? 'Ready to explore' : 'Complete previous chapter')
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
          )
        ),

        React.createElement('button', {
          onClick: () => setActiveScreen('weave'),
          style: {
            width: '100%', background: t.cta, color: '#FFF', border: 'none',
            borderRadius: 14, padding: '16px 24px', fontSize: 17, fontWeight: 700,
            fontFamily: font, cursor: 'pointer', marginTop: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'transform 0.15s ease', boxShadow: '0 4px 16px rgba(6,182,212,0.3)',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(Icon, { name: 'Layers', size: 20, color: '#FFF' }),
          React.createElement('span', null, 'Add to Knowledge Weave')
        )
      )
    );
  }

  // ─── LENSES SCREEN ───
  function LensesScreen() {
    const [tab, setTab] = useState('community');

    const communityLenses = [
      { name: 'Film Noir Detective', author: 'StorySmith', icon: 'Search', uses: '12.4k', rating: 4.9, color: '#7C3AED', tags: ['narrative', 'mystery'] },
      { name: 'Socratic Seminar', author: 'PhiloBot', icon: 'MessageCircle', uses: '8.7k', rating: 4.8, color: '#EC4899', tags: ['dialogue', 'critical thinking'] },
      { name: 'RPG Quest Map', author: 'GameLearner', icon: 'Map', uses: '15.2k', rating: 4.7, color: '#F59E0B', tags: ['gamified', 'visual'] },
      { name: 'Comic Strip Explainer', author: 'VizWiz', icon: 'Image', uses: '6.3k', rating: 4.6, color: '#10B981', tags: ['visual', 'humor'] },
      { name: 'Debate Arena', author: 'ArgueWell', icon: 'Swords', uses: '4.1k', rating: 4.5, color: '#EF4444', tags: ['argument', 'persuasion'] },
      { name: 'Mind Palace Builder', author: 'MemoryPro', icon: 'Brain', uses: '9.8k', rating: 4.9, color: '#06B6D4', tags: ['spatial', 'memory'] },
    ];

    const myLenses = [
      { name: 'Sci-Fi Navigator', icon: 'Rocket', color: '#3B82F6', desc: 'Space opera narrative style' },
      { name: 'Minimalist Summary', icon: 'AlignLeft', color: '#6B7280', desc: 'Clean, concise breakdowns' },
    ];

    const tabs = [
      { id: 'community', label: 'Community', icon: 'Globe' },
      { id: 'mine', label: 'My Lenses', icon: 'User' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 20px' }
      }, 'Lens Library'),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex', gap: 6, marginBottom: 20, background: t.surface,
          borderRadius: 14, padding: 4, boxShadow: t.shadow,
        }
      },
        tabs.map(tb =>
          React.createElement('button', {
            key: tb.id,
            onClick: () => setTab(tb.id),
            style: {
              flex: 1, padding: '10px 16px', borderRadius: 10, border: 'none',
              background: tab === tb.id ? t.primary : 'transparent',
              color: tab === tb.id ? '#FFF' : t.textSecondary,
              fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.2s ease',
            }
          },
            React.createElement(Icon, { name: tb.icon, size: 16, color: tab === tb.id ? '#FFF' : t.textSecondary }),
            React.createElement('span', null, tb.label)
          )
        )
      ),

      // Community tab
      tab === 'community' && communityLenses.map((lens, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 18, padding: 16, marginBottom: 12,
            border: `1px solid ${t.border}`, boxShadow: t.shadow,
            cursor: 'pointer', transition: 'transform 0.15s ease',
            animation: `slideUp 0.4s ease ${i * 0.06}s both`,
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${lens.color}30, ${lens.color}60)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: lens.icon, size: 22, color: lens.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 2px' }
              }, lens.name),
              React.createElement('p', {
                style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 }
              }, `by ${lens.author}`)
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement(Icon, { name: 'Star', size: 14, color: '#F59E0B' }),
              React.createElement('span', {
                style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
              }, lens.rating)
            )
          ),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              lens.tags.map((tag, j) =>
                React.createElement('span', {
                  key: j,
                  style: {
                    fontSize: 11, fontWeight: 600, color: lens.color, fontFamily: font,
                    background: `${lens.color}15`, padding: '4px 10px', borderRadius: 8,
                  }
                }, tag)
              )
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement(Icon, { name: 'Users', size: 12, color: t.textTertiary }),
              React.createElement('span', {
                style: { fontSize: 11, color: t.textTertiary, fontFamily: font }
              }, lens.uses)
            )
          )
        )
      ),

      // My Lenses tab
      tab === 'mine' && React.createElement('div', null,
        React.createElement('button', {
          onClick: () => {},
          style: {
            width: '100%', background: 'transparent',
            border: `2px dashed ${t.primary}40`, borderRadius: 18,
            padding: 24, marginBottom: 14, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            transition: 'all 0.2s ease',
          },
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 24, background: `${t.primary}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(Icon, { name: 'Plus', size: 24, color: t.primary })),
          React.createElement('p', {
            style: { fontSize: 17, fontWeight: 600, color: t.primary, fontFamily: font, margin: 0 }
          }, 'Create New Lens'),
          React.createElement('p', {
            style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 }
          }, 'Design your perfect learning experience')
        ),
        myLenses.map((lens, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 18, padding: 18, marginBottom: 12,
              border: `1px solid ${t.border}`, boxShadow: t.shadow,
              display: 'flex', alignItems: 'center', gap: 14,
              animation: `slideUp 0.4s ease ${i * 0.1}s both`,
            },
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${lens.color}30, ${lens.color}60)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: lens.icon, size: 22, color: lens.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 2px' }
              }, lens.name),
              React.createElement('p', {
                style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 }
              }, lens.desc)
            ),
            React.createElement(Icon, { name: 'Settings', size: 18, color: t.textTertiary })
          )
        )
      )
    );
  }

  // ─── WEAVE SCREEN ───
  function WeaveScreen() {
    const weaves = [
      {
        title: 'Quantum Physics Journey',
        topics: 4,
        lenses: 3,
        progress: 67,
        color: '#7C3AED',
        items: ['Wave-Particle Duality', 'Quantum Entanglement', 'Superposition', 'Measurement Problem'],
      },
      {
        title: 'AI & Machine Learning',
        topics: 6,
        lenses: 2,
        progress: 34,
        color: '#06B6D4',
        items: ['Neural Networks', 'Backpropagation', 'Transformers', 'Reinforcement Learning'],
      },
      {
        title: 'Creative Writing Mastery',
        topics: 3,
        lenses: 4,
        progress: 89,
        color: '#EC4899',
        items: ['Character Arcs', 'World Building', 'Dialogue Craft'],
      },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 8px' }
      }, 'Knowledge Weaves'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 24px' }
      }, 'Interconnected learning paths across topics'),

      // Stats bar
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 24,
        }
      },
        [
          { label: 'Weaves', value: '3', icon: 'Layers', color: t.primary },
          { label: 'Topics', value: '13', icon: 'BookOpen', color: t.cta },
          { label: 'Hours', value: '47', icon: 'Clock', color: '#F59E0B' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 16, padding: '14px 12px',
              border: `1px solid ${t.border}`, boxShadow: t.shadow,
              textAlign: 'center', animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', marginBottom: 6 }
            }, React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })),
            React.createElement('p', {
              style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, margin: '0 0 2px' }
            }, stat.value),
            React.createElement('p', {
              style: { fontSize: 11, color: t.textSecondary, fontFamily: font, margin: 0, fontWeight: 500 }
            }, stat.label)
          )
        )
      ),

      // Weave cards
      weaves.map((weave, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 20, padding: 20, marginBottom: 14,
            border: `1px solid ${t.border}`, boxShadow: t.shadow,
            cursor: 'pointer', transition: 'transform 0.15s ease',
            animation: `slideUp 0.5s ease ${(i + 1) * 0.1}s both`,
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          // Header
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }
          },
            React.createElement('div', null,
              React.createElement('h3', {
                style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 4px' }
              }, weave.title),
              React.createElement('p', {
                style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 }
              }, `${weave.topics} topics · ${weave.lenses} lenses`)
            ),
            React.createElement('span', {
              style: {
                fontSize: 13, fontWeight: 700, color: weave.color, fontFamily: font,
                background: `${weave.color}15`, padding: '4px 10px', borderRadius: 8,
              }
            }, `${weave.progress}%`)
          ),

          // Progress bar
          React.createElement('div', {
            style: { height: 6, borderRadius: 3, background: t.border, marginBottom: 14, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                width: `${weave.progress}%`, height: '100%', borderRadius: 3,
                background: `linear-gradient(90deg, ${weave.color}, ${weave.color}80)`,
                transition: 'width 0.8s ease',
              }
            })
          ),

          // Topic pills
          React.createElement('div', {
            style: { display: 'flex', flexWrap: 'wrap', gap: 6 }
          },
            weave.items.map((item, j) =>
              React.createElement('span', {
                key: j,
                style: {
                  fontSize: 12, fontWeight: 500, color: t.textSecondary, fontFamily: font,
                  background: t.surfaceAlt, padding: '5px 10px', borderRadius: 8,
                  border: `1px solid ${t.border}`,
                }
              }, item)
            )
          )
        )
      ),

      // Create new weave button
      React.createElement('button', {
        style: {
          width: '100%', background: 'transparent',
          border: `2px dashed ${t.cta}40`, borderRadius: 18,
          padding: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }
      },
        React.createElement(Icon, { name: 'Plus', size: 20, color: t.cta }),
        React.createElement('span', {
          style: { fontSize: 15, fontWeight: 600, color: t.cta, fontFamily: font }
        }, 'Start New Knowledge Weave')
      )
    );
  }

  // ─── PROFILE SCREEN ───
  function ProfileScreen() {
    const stats = [
      { label: 'Remixes', value: '47', icon: 'Sparkles' },
      { label: 'Lenses', value: '12', icon: 'Eye' },
      { label: 'Streak', value: '14d', icon: 'Flame' },
    ];

    const achievements = [
      { name: 'First Remix', icon: 'Award', earned: true, color: '#F59E0B' },
      { name: 'Lens Crafter', icon: 'Wrench', earned: true, color: '#EC4899' },
      { name: 'Knowledge Weaver', icon: 'Layers', earned: true, color: '#7C3AED' },
      { name: 'Community Star', icon: 'Star', earned: false, color: '#6B7280' },
    ];

    const settings = [
      { label: 'Notification Preferences', icon: 'Bell' },
      { label: 'Learning Goals', icon: 'Target' },
      { label: 'Data & Privacy', icon: 'Shield' },
      { label: 'Help & Support', icon: 'HelpCircle' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' }
    },
      // Profile header
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }
      },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 }
        }, 'Profile'),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surface, boxShadow: t.shadow, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Avatar + name
      React.createElement('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28,
          animation: 'slideUp 0.5s ease both',
        }
      },
        React.createElement('div', {
          style: {
            width: 88, height: 88, borderRadius: 44,
            background: t.gradient1, display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: 14, boxShadow: t.shadowLg,
          }
        }, React.createElement(Icon, { name: 'User', size: 40, color: '#FFF' })),
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 4px' }
        }, 'Alex Rivera'),
        React.createElement('p', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: 0 }
        }, 'Curious learner · Lens architect')
      ),

      // Stats
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 28,
        }
      },
        stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 16, padding: '16px 12px',
              border: `1px solid ${t.border}`, boxShadow: t.shadow, textAlign: 'center',
              animation: `slideUp 0.4s ease ${i * 0.1}s both`,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', marginBottom: 6 }
            }, React.createElement(Icon, { name: stat.icon, size: 20, color: t.primary })),
            React.createElement('p', {
              style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, margin: '0 0 2px' }
            }, stat.value),
            React.createElement('p', {
              style: { fontSize: 12, color: t.textSecondary, fontFamily: font, margin: 0 }
            }, stat.label)
          )
        )
      ),

      // Achievements
      React.createElement('h3', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 14px', letterSpacing: -0.3 }
      }, 'Achievements'),
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 28 }
      },
        achievements.map((ach, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, textAlign: 'center', opacity: ach.earned ? 1 : 0.4,
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: ach.earned ? `linear-gradient(135deg, ${ach.color}30, ${ach.color}60)` : t.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 6px', boxShadow: ach.earned ? `0 4px 12px ${ach.color}20` : 'none',
              }
            }, React.createElement(Icon, { name: ach.icon, size: 22, color: ach.earned ? ach.color : t.textTertiary })),
            React.createElement('p', {
              style: { fontSize: 11, fontWeight: 600, color: t.textSecondary, fontFamily: font, margin: 0 }
            }, ach.name)
          )
        )
      ),

      // Settings list
      React.createElement('h3', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 14px', letterSpacing: -0.3 }
      }, 'Settings'),
      settings.map((item, i) =>
        React.createElement('button', {
          key: i,
          style: {
            width: '100%', background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '14px 16px', marginBottom: 8, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            transition: 'transform 0.15s ease', boxShadow: t.shadow,
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(Icon, { name: item.icon, size: 20, color: t.textSecondary }),
          React.createElement('span', {
            style: { fontSize: 17, fontWeight: 500, color: t.text, fontFamily: font, flex: 1 }
          }, item.label),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
        )
      )
    );
  }

  // ─── SCREENS MAP ───
  const screens = {
    home: HomeScreen,
    create: CreateScreen,
    lenses: LensesScreen,
    weave: WeaveScreen,
    profile: ProfileScreen,
  };

  // ─── BOTTOM NAV ───
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'create', label: 'Create', icon: 'PlusCircle' },
    { id: 'lenses', label: 'Lenses', icon: 'Eye' },
    { id: 'weave', label: 'Weave', icon: 'Layers' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px 0',
      fontFamily: font,
    }
  },
    // CSS Animations
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.08); opacity: 0.8; }
      }
      @keyframes shimmer {
        0% { transform: scaleX(0); }
        50% { transform: scaleX(1); }
        100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: t.bg,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(ScreenComponent)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          padding: '8px 8px 28px',
          display: 'flex',
          justifyContent: 'space-around',
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '6px 12px', borderRadius: 12,
              minWidth: 52, minHeight: 44,
              transition: 'transform 0.15s ease',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.88)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement(Icon, {
              name: item.icon,
              size: 24,
              color: activeScreen === item.id ? t.primary : t.textTertiary,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === item.id ? 700 : 500,
                color: activeScreen === item.id ? t.primary : t.textTertiary,
                fontFamily: font,
              }
            }, item.label)
          )
        )
      )
    )
  );
}
