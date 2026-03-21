// Spark Draft - Turn rough ideas into polished creative directions
// Single-file React prototype with Babel standalone

function App() {
  const { useState, useEffect, useRef } = React;

  // Theme
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeScreen, setActiveScreen] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);

  const themes = {
    light: {
      bg: '#F5F3FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE9FE',
      card: '#FFFFFF',
      cardBorder: '#E9E5FF',
      primary: '#7C3AED',
      primaryLight: '#A78BFA',
      primaryDark: '#5B21B6',
      primaryGradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      accent: '#F59E0B',
      accentAlt: '#EC4899',
      text: '#1E1B4B',
      textSub: '#6D6A8A',
      textMuted: '#A09EC0',
      border: '#E9E5FF',
      inputBg: '#F5F3FF',
      navBg: '#FFFFFF',
      navBorder: '#E9E5FF',
      tag: '#EDE9FE',
      tagText: '#7C3AED',
      statusBar: '#7C3AED',
    },
    dark: {
      bg: '#0F0C1E',
      surface: '#1A1530',
      surfaceAlt: '#231D3F',
      card: '#1A1530',
      cardBorder: '#2D2550',
      primary: '#A78BFA',
      primaryLight: '#C4B5FD',
      primaryDark: '#7C3AED',
      primaryGradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      accent: '#FBBF24',
      accentAlt: '#F472B6',
      text: '#F0EEFF',
      textSub: '#B8B0E8',
      textMuted: '#7870A8',
      border: '#2D2550',
      inputBg: '#231D3F',
      navBg: '#1A1530',
      navBorder: '#2D2550',
      tag: '#2D2550',
      tagText: '#C4B5FD',
      statusBar: '#0F0C1E',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  // Load Google Font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const fontBase = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  // ── Shared helpers ────────────────────────────────────────────────────────

  function PressBtn({ onClick, style = {}, children, id }) {
    const isPressed = pressedBtn === id;
    return (
      React.createElement('button', {
        onMouseDown: () => setPressedBtn(id),
        onMouseUp: () => { setPressedBtn(null); onClick && onClick(); },
        onMouseLeave: () => setPressedBtn(null),
        onTouchStart: () => setPressedBtn(id),
        onTouchEnd: () => { setPressedBtn(null); onClick && onClick(); },
        style: {
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          transform: isPressed ? 'scale(0.96)' : 'scale(1)',
          transition: 'transform 0.12s ease',
          ...style
        }
      }, children)
    );
  }

  function Tag({ label, color }) {
    return React.createElement('span', {
      style: {
        ...fontBase,
        fontSize: 11, fontWeight: 600, padding: '3px 9px',
        borderRadius: 20, background: color || t.tag, color: t.tagText,
        letterSpacing: 0.3
      }
    }, label);
  }

  function Avatar({ initials, size = 30, color }) {
    return React.createElement('div', {
      style: {
        width: size, height: size, borderRadius: '50%',
        background: color || t.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...fontBase, fontSize: size * 0.38, fontWeight: 700, color: '#fff',
        flexShrink: 0
      }
    }, initials);
  }

  function ColorDot({ hex }) {
    return React.createElement('div', {
      style: {
        width: 22, height: 22, borderRadius: '50%', background: hex,
        border: `2px solid ${t.border}`, flexShrink: 0
      }
    });
  }

  function SectionLabel({ label }) {
    return React.createElement('div', {
      style: {
        ...fontBase, fontSize: 11, fontWeight: 700, color: t.textMuted,
        letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10
      }
    }, label);
  }

  function Card({ children, style = {}, onClick }) {
    return React.createElement('div', {
      onClick,
      style: {
        background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`,
        padding: 16, cursor: onClick ? 'pointer' : 'default',
        ...style
      }
    }, children);
  }

  // ── STATUS BAR ────────────────────────────────────────────────────────────

  function StatusBar() {
    return React.createElement('div', {
      style: {
        background: t.surface, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', padding: '10px 20px 6px',
        ...fontBase, fontSize: 12, fontWeight: 600, color: t.text
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', {
        style: { display: 'flex', gap: 5, alignItems: 'center' }
      },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
        React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
        React.createElement(window.lucide.Battery, { size: 18, color: t.text })
      )
    );
  }

  // ── DYNAMIC ISLAND ────────────────────────────────────────────────────────

  function DynamicIsland() {
    return React.createElement('div', {
      style: {
        position: 'absolute', top: 12, left: '50%',
        transform: 'translateX(-50%)',
        width: 120, height: 34, background: '#000',
        borderRadius: 20, zIndex: 10
      }
    });
  }

  // ── HOME SCREEN ───────────────────────────────────────────────────────────

  function HomeScreen() {
    const [inputText, setInputText] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [selectedMode, setSelectedMode] = useState('text');

    const modes = [
      { id: 'text', icon: window.lucide.FileText, label: 'Text' },
      { id: 'photo', icon: window.lucide.Camera, label: 'Photo' },
      { id: 'voice', icon: window.lucide.Mic, label: 'Voice' },
      { id: 'sketch', icon: window.lucide.PenTool, label: 'Sketch' },
    ];

    function handleGenerate() {
      if (!inputText.trim()) return;
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        setShowResult(true);
      }, 1800);
    }

    const sampleResult = {
      title: 'Urban Café Branding',
      brief: 'A minimal, industrial-chic brand identity for a specialty coffee shop in a creative district. Tone is warm but refined.',
      themes: ['Minimalism', 'Industrial', 'Warm Tones', 'Craft'],
      palette: ['#2C2416', '#8B6C42', '#D4A96A', '#F5ECD7', '#FFFFFF'],
      style: 'Bauhaus-inspired typography with organic texture accents.',
      nextMoves: [
        'Draft a mood board with 6 visual references',
        'Sketch 3 logo mark directions',
        'Write brand voice guidelines (2–3 adjectives)',
      ]
    };

    if (showResult) {
      return React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }
        },
          React.createElement('button', {
            onClick: () => setShowResult(false),
            style: {
              background: t.surfaceAlt, border: 'none', borderRadius: 10,
              width: 34, height: 34, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement(window.lucide.ArrowLeft, { size: 16, color: t.primary })
          ),
          React.createElement('span', {
            style: { ...fontBase, fontSize: 16, fontWeight: 700, color: t.text }
          }, 'Creative Brief')
        ),

        // Title card
        React.createElement('div', {
          style: {
            background: t.primaryGradient, borderRadius: 18,
            padding: 18, marginBottom: 12
          }
        },
          React.createElement('div', {
            style: { ...fontBase, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 4 }
          }, 'DRAFT TITLE'),
          React.createElement('div', {
            style: { ...fontBase, fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }
          }, sampleResult.title),
          React.createElement('div', {
            style: { ...fontBase, fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }
          }, sampleResult.brief)
        ),

        // Themes
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Themes' }),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
            ...sampleResult.themes.map(th =>
              React.createElement(Tag, { key: th, label: th })
            )
          )
        ),

        // Palette
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Color Direction' }),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            ...sampleResult.palette.map(hex =>
              React.createElement('div', { key: hex },
                React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 12, background: hex,
                    border: `2px solid ${t.border}`, marginBottom: 4
                  }
                }),
                React.createElement('div', {
                  style: { ...fontBase, fontSize: 9, color: t.textMuted, textAlign: 'center' }
                }, hex)
              )
            )
          )
        ),

        // Style note
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Aesthetic Direction' }),
          React.createElement('div', {
            style: { ...fontBase, fontSize: 13, color: t.text, lineHeight: 1.6 }
          }, sampleResult.style)
        ),

        // Next moves
        React.createElement(Card, { style: { marginBottom: 16 } },
          React.createElement(SectionLabel, { label: 'Next Moves' }),
          ...sampleResult.nextMoves.map((move, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'flex-start', gap: 10,
                marginBottom: i < sampleResult.nextMoves.length - 1 ? 10 : 0
              }
            },
              React.createElement('div', {
                style: {
                  width: 22, height: 22, borderRadius: 8,
                  background: t.primaryGradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }
              },
                React.createElement('span', {
                  style: { ...fontBase, fontSize: 11, fontWeight: 800, color: '#fff' }
                }, i + 1)
              ),
              React.createElement('span', {
                style: { ...fontBase, fontSize: 13, color: t.text, lineHeight: 1.5 }
              }, move)
            )
          )
        ),

        // Actions
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: () => setActiveTab('drafts'),
            style: {
              flex: 1, padding: '13px 0',
              background: t.primaryGradient,
              border: 'none', borderRadius: 14,
              ...fontBase, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer'
            }
          }, 'Save Draft'),
          React.createElement('button', {
            onClick: () => setActiveTab('collab'),
            style: {
              flex: 1, padding: '13px 0',
              background: t.surfaceAlt, border: `1px solid ${t.border}`,
              borderRadius: 14,
              ...fontBase, fontSize: 14, fontWeight: 700, color: t.primary, cursor: 'pointer'
            }
          }, 'Share')
        )
      );
    }

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      // Header
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 20
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { ...fontBase, fontSize: 22, fontWeight: 800, color: t.text }
          }, 'Spark Draft'),
          React.createElement('div', {
            style: { ...fontBase, fontSize: 13, color: t.textSub }
          }, 'Drop your raw idea below')
        ),
        React.createElement('div', {
          style: {
            width: 38, height: 38, borderRadius: 12,
            background: t.primaryGradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement(window.lucide.Zap, { size: 18, color: '#fff' })
        )
      ),

      // Input mode tabs
      React.createElement('div', {
        style: {
          display: 'flex', gap: 6, marginBottom: 12,
          background: t.inputBg, borderRadius: 14, padding: 4
        }
      },
        ...modes.map(m =>
          React.createElement('button', {
            key: m.id,
            onClick: () => setSelectedMode(m.id),
            style: {
              flex: 1, padding: '8px 0',
              background: selectedMode === m.id ? t.primary : 'transparent',
              border: 'none', borderRadius: 11, cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              transition: 'background 0.2s'
            }
          },
            React.createElement(m.icon, {
              size: 15,
              color: selectedMode === m.id ? '#fff' : t.textSub
            }),
            React.createElement('span', {
              style: {
                ...fontBase, fontSize: 10, fontWeight: 600,
                color: selectedMode === m.id ? '#fff' : t.textSub
              }
            }, m.label)
          )
        )
      ),

      // Text area
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 16,
          border: `1.5px solid ${inputText ? t.primary : t.border}`,
          padding: 14, marginBottom: 12,
          transition: 'border-color 0.2s'
        }
      },
        React.createElement('textarea', {
          value: inputText,
          onChange: e => setInputText(e.target.value),
          placeholder: "e.g. 'Saw an amazing hand-painted café sign, warm earthy tones, very craft-brewery vibes, want to explore this for a brand project'",
          style: {
            width: '100%', border: 'none', outline: 'none',
            background: 'transparent',
            ...fontBase, fontSize: 14, color: t.text,
            resize: 'none', minHeight: 90, lineHeight: 1.6,
            '::placeholder': { color: t.textMuted }
          }
        }),
        React.createElement('div', {
          style: {
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginTop: 8
          }
        },
          React.createElement('div', {
            style: { display: 'flex', gap: 8 }
          },
            [window.lucide.Image, window.lucide.Mic, window.lucide.Link2].map((Icon, i) =>
              React.createElement('button', {
                key: i,
                style: {
                  width: 28, height: 28, borderRadius: 8,
                  background: t.surfaceAlt, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }
              },
                React.createElement(Icon, { size: 13, color: t.textSub })
              )
            )
          ),
          React.createElement('span', {
            style: { ...fontBase, fontSize: 11, color: t.textMuted }
          }, `${inputText.length} chars`)
        )
      ),

      // Generate button
      React.createElement('button', {
        onClick: handleGenerate,
        disabled: !inputText.trim() || generating,
        style: {
          width: '100%', padding: '15px 0',
          background: inputText.trim() ? t.primaryGradient : t.surfaceAlt,
          border: 'none', borderRadius: 16, cursor: inputText.trim() ? 'pointer' : 'default',
          ...fontBase, fontSize: 15, fontWeight: 700,
          color: inputText.trim() ? '#fff' : t.textMuted,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 20, transition: 'all 0.2s'
        }
      },
        generating
          ? React.createElement(window.lucide.Loader, { size: 16, color: '#fff', style: { animation: 'spin 1s linear infinite' } })
          : React.createElement(window.lucide.Sparkles, { size: 16, color: inputText.trim() ? '#fff' : t.textMuted }),
        generating ? 'Generating creative brief…' : 'Generate Brief'
      ),

      // Quick prompts
      React.createElement(SectionLabel, { label: 'Quick Sparks' }),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        [
          { emoji: '☕', text: 'Turn a café photo into a brand identity brief' },
          { emoji: '🎙️', text: 'Convert a voice brainstorm into podcast episodes' },
          { emoji: '📸', text: 'Transform a moodboard sketch into a shot list' },
        ].map((q, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => setInputText(q.text),
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              borderRadius: 14, padding: '12px 14px', cursor: 'pointer', textAlign: 'left'
            }
          },
            React.createElement('span', { style: { fontSize: 20 } }, q.emoji),
            React.createElement('span', {
              style: { ...fontBase, fontSize: 13, color: t.text, lineHeight: 1.4 }
            }, q.text)
          )
        )
      )
    );
  }

  // ── DRAFTS SCREEN ─────────────────────────────────────────────────────────

  function DraftsScreen() {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Branding', 'Content', 'Social', 'Product'];

    const drafts = [
      {
        id: 1, title: 'Urban Café Branding', tag: 'Branding',
        preview: 'Industrial-chic brand identity for a specialty coffee shop in a creative district.',
        palette: ['#2C2416', '#8B6C42', '#D4A96A', '#F5ECD7'],
        date: 'Today, 2:14 PM', moves: 3, comments: 2
      },
      {
        id: 2, title: 'Travel Podcast Series', tag: 'Content',
        preview: 'A 6-episode audio journey through overlooked Southeast Asian cities for curious nomads.',
        palette: ['#1E3A5F', '#2E86AB', '#A8DADC', '#F1FAEE'],
        date: 'Yesterday', moves: 5, comments: 1
      },
      {
        id: 3, title: 'Indie Film Social Campaign', tag: 'Social',
        preview: 'Pre-launch social media visual strategy for a documentary on urban farming.',
        palette: ['#1A1A2E', '#16213E', '#0F3460', '#E94560'],
        date: 'Mar 19', moves: 4, comments: 4
      },
      {
        id: 4, title: 'App Icon Refresh', tag: 'Product',
        preview: 'Exploring softer, more playful icon directions for a productivity app redesign.',
        palette: ['#6C63FF', '#3F3D56', '#F2F2F2', '#FF6584'],
        date: 'Mar 17', moves: 2, comments: 0
      },
    ];

    const filtered = filter === 'All' ? drafts : drafts.filter(d => d.tag === filter);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 16
        }
      },
        React.createElement('div', {
          style: { ...fontBase, fontSize: 22, fontWeight: 800, color: t.text }
        }, 'My Drafts'),
        React.createElement('button', {
          style: {
            background: t.primaryGradient, border: 'none',
            borderRadius: 10, width: 34, height: 34, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement(window.lucide.Plus, { size: 16, color: '#fff' })
        )
      ),

      // Search
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 8,
          background: t.inputBg, borderRadius: 12, padding: '10px 14px', marginBottom: 14
        }
      },
        React.createElement(window.lucide.Search, { size: 15, color: t.textMuted }),
        React.createElement('input', {
          placeholder: 'Search drafts…',
          style: {
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            ...fontBase, fontSize: 14, color: t.text
          }
        })
      ),

      // Filters
      React.createElement('div', {
        style: { display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto' }
      },
        ...filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilter(f),
            style: {
              padding: '6px 14px', borderRadius: 20, cursor: 'pointer', whiteSpace: 'nowrap',
              border: filter === f ? 'none' : `1px solid ${t.border}`,
              background: filter === f ? t.primary : t.surface,
              ...fontBase, fontSize: 12, fontWeight: 600,
              color: filter === f ? '#fff' : t.textSub
            }
          }, f)
        )
      ),

      // Draft cards
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        ...filtered.map(draft =>
          React.createElement(Card, { key: draft.id },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 }
            },
              React.createElement('div', {
                style: { ...fontBase, fontSize: 15, fontWeight: 700, color: t.text }
              }, draft.title),
              React.createElement(Tag, { label: draft.tag })
            ),
            React.createElement('div', {
              style: { ...fontBase, fontSize: 12, color: t.textSub, lineHeight: 1.5, marginBottom: 10 }
            }, draft.preview),

            // Palette strip
            React.createElement('div', {
              style: {
                display: 'flex', gap: 4, marginBottom: 12,
                borderRadius: 8, overflow: 'hidden', height: 22
              }
            },
              ...draft.palette.map((hex, i) =>
                React.createElement('div', {
                  key: i,
                  style: { flex: 1, background: hex }
                })
              )
            ),

            React.createElement('div', {
              style: {
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center'
              }
            },
              React.createElement('span', {
                style: { ...fontBase, fontSize: 11, color: t.textMuted }
              }, draft.date),
              React.createElement('div', { style: { display: 'flex', gap: 12 } },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 4 }
                },
                  React.createElement(window.lucide.ArrowRight, { size: 12, color: t.textMuted }),
                  React.createElement('span', {
                    style: { ...fontBase, fontSize: 11, color: t.textMuted }
                  }, `${draft.moves} moves`)
                ),
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 4 }
                },
                  React.createElement(window.lucide.MessageCircle, { size: 12, color: t.textMuted }),
                  React.createElement('span', {
                    style: { ...fontBase, fontSize: 11, color: t.textMuted }
                  }, draft.comments)
                )
              )
            )
          )
        )
      )
    );
  }

  // ── MOODBOARD SCREEN ──────────────────────────────────────────────────────

  function MoodboardScreen() {
    const [selectedBoard, setSelectedBoard] = useState(null);

    const boards = [
      {
        id: 1,
        title: 'Urban Café Branding',
        keywords: ['Warm', 'Industrial', 'Craft', 'Tactile'],
        palette: ['#2C2416', '#8B6C42', '#D4A96A', '#F5ECD7', '#E8D5B0'],
        refs: [
          { label: 'Kinfolk Magazine', type: 'Editorial', color: '#D4A96A' },
          { label: 'Workshop Coffee', type: 'Brand', color: '#8B6C42' },
          { label: 'Brutalist Fonts', type: 'Typography', color: '#2C2416' },
          { label: 'Raw Concrete Tex', type: 'Texture', color: '#9E9E9E' },
        ],
        fonts: ['Playfair Display', 'IBM Plex Mono'],
        mood: 'Warm, considered, artisanal. Like a well-worn journal in a sunlit corner.'
      },
      {
        id: 2,
        title: 'Travel Podcast',
        keywords: ['Vibrant', 'Wanderlust', 'Authentic', 'Layered'],
        palette: ['#1E3A5F', '#2E86AB', '#A8DADC', '#F1FAEE', '#E63946'],
        refs: [
          { label: 'Monocle Travel', type: 'Editorial', color: '#2E86AB' },
          { label: 'Airbnb Magazine', type: 'Brand', color: '#A8DADC' },
          { label: 'Stamp Textures', type: 'Texture', color: '#1E3A5F' },
          { label: 'Hand Lettering', type: 'Typography', color: '#E63946' },
        ],
        fonts: ['Sora', 'DM Serif Display'],
        mood: 'Discovery and depth. Like flipping through passport stamps in a busy café.'
      },
    ];

    if (selectedBoard) {
      const b = boards.find(x => x.id === selectedBoard);
      return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }
        },
          React.createElement('button', {
            onClick: () => setSelectedBoard(null),
            style: {
              background: t.surfaceAlt, border: 'none', borderRadius: 10,
              width: 34, height: 34, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement(window.lucide.ArrowLeft, { size: 16, color: t.primary })
          ),
          React.createElement('span', {
            style: { ...fontBase, fontSize: 16, fontWeight: 700, color: t.text }
          }, b.title)
        ),

        // Palette
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Color Palette' }),
          React.createElement('div', {
            style: { borderRadius: 12, overflow: 'hidden', height: 64, display: 'flex', marginBottom: 10 }
          },
            ...b.palette.map((hex, i) =>
              React.createElement('div', { key: i, style: { flex: 1, background: hex } })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6 } },
            ...b.palette.map((hex, i) =>
              React.createElement('div', { key: i, style: { flex: 1 } },
                React.createElement('div', {
                  style: {
                    fontSize: 9, ...fontBase, color: t.textMuted,
                    textAlign: 'center', marginTop: 4
                  }
                }, hex)
              )
            )
          )
        ),

        // Style keywords
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Style Keywords' }),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
            ...b.keywords.map(k =>
              React.createElement(Tag, { key: k, label: k })
            )
          )
        ),

        // Visual references
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Visual References' }),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
            ...b.refs.map((ref, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 0',
                  borderBottom: i < b.refs.length - 1 ? `1px solid ${t.border}` : 'none'
                }
              },
                React.createElement('div', {
                  style: {
                    width: 36, height: 36, borderRadius: 10, background: ref.color,
                    flexShrink: 0
                  }
                }),
                React.createElement('div', null,
                  React.createElement('div', {
                    style: { ...fontBase, fontSize: 13, fontWeight: 600, color: t.text }
                  }, ref.label),
                  React.createElement('div', {
                    style: { ...fontBase, fontSize: 11, color: t.textMuted }
                  }, ref.type)
                )
              )
            )
          )
        ),

        // Typography
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Typography Pairing' }),
          ...b.fonts.map((font, i) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '8px 0',
                borderBottom: i < b.fonts.length - 1 ? `1px solid ${t.border}` : 'none'
              }
            },
              React.createElement('div', {
                style: { ...fontBase, fontSize: 13, fontWeight: 600, color: t.text }
              }, font),
              React.createElement('div', {
                style: { ...fontBase, fontSize: 11, color: t.textMuted }
              }, i === 0 ? 'Display / Headlines' : 'Body / Captions')
            )
          )
        ),

        // Mood statement
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Mood Statement' }),
          React.createElement('div', {
            style: {
              ...fontBase, fontSize: 14, color: t.text,
              lineHeight: 1.6, fontStyle: 'italic'
            }
          }, `"${b.mood}"`)
        )
      );
    }

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      React.createElement('div', {
        style: { ...fontBase, fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }
      }, 'Moodboards'),
      React.createElement('div', {
        style: { ...fontBase, fontSize: 13, color: t.textSub, marginBottom: 20 }
      }, 'Visual direction for your creative briefs'),

      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        ...boards.map(board =>
          React.createElement(Card, { key: board.id, onClick: () => setSelectedBoard(board.id) },
            // Palette strip
            React.createElement('div', {
              style: {
                height: 56, borderRadius: 10, overflow: 'hidden',
                display: 'flex', marginBottom: 12
              }
            },
              ...board.palette.map((hex, i) =>
                React.createElement('div', { key: i, style: { flex: 1, background: hex } })
              )
            ),
            React.createElement('div', {
              style: {
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: 8
              }
            },
              React.createElement('div', {
                style: { ...fontBase, fontSize: 15, fontWeight: 700, color: t.text }
              }, board.title),
              React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
            ),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
              ...board.keywords.map(k => React.createElement(Tag, { key: k, label: k }))
            )
          )
        )
      ),

      React.createElement('button', {
        onClick: () => setActiveTab('home'),
        style: {
          width: '100%', marginTop: 16, padding: '14px 0',
          background: t.primaryGradient, border: 'none', borderRadius: 14,
          ...fontBase, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }
      },
        React.createElement(window.lucide.Plus, { size: 16, color: '#fff' }),
        'Generate New Moodboard'
      )
    );
  }

  // ── COLLAB SCREEN ─────────────────────────────────────────────────────────

  function CollabScreen() {
    const [activeCard, setActiveCard] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [approved, setApproved] = useState({});

    const cards = [
      {
        id: 1,
        title: 'Urban Café Branding',
        sharedBy: 'Alex K.',
        sharedAt: 'Today, 9:41 AM',
        status: 'Awaiting Review',
        palette: ['#2C2416', '#8B6C42', '#D4A96A', '#F5ECD7'],
        themes: ['Industrial', 'Warm', 'Craft'],
        collaborators: [
          { initials: 'AK', color: '#7C3AED' },
          { initials: 'MB', color: '#0EA5E9' },
          { initials: 'JL', color: '#10B981' },
        ],
        comments: [
          { author: 'AK', time: '9:43 AM', text: 'Love the warm palette. Could we push the contrast a bit more?', avatar: '#7C3AED' },
          { author: 'MB', time: '10:02 AM', text: 'The industrial references feel just right for this brief!', avatar: '#0EA5E9' },
        ]
      },
      {
        id: 2,
        title: 'Travel Podcast Series',
        sharedBy: 'You',
        sharedAt: 'Yesterday, 3:15 PM',
        status: 'Approved',
        palette: ['#1E3A5F', '#2E86AB', '#A8DADC', '#F1FAEE'],
        themes: ['Wanderlust', 'Authentic', 'Layered'],
        collaborators: [
          { initials: 'YO', color: '#F59E0B' },
          { initials: 'SR', color: '#EC4899' },
        ],
        comments: [
          { author: 'SR', time: 'Yesterday, 4:00 PM', text: 'Episode structure is perfect. Let\'s move to production.', avatar: '#EC4899' },
        ]
      },
    ];

    if (activeCard !== null) {
      const card = cards.find(c => c.id === activeCard);
      const isApproved = approved[activeCard] || card.status === 'Approved';

      return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }
        },
          React.createElement('button', {
            onClick: () => setActiveCard(null),
            style: {
              background: t.surfaceAlt, border: 'none', borderRadius: 10,
              width: 34, height: 34, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement(window.lucide.ArrowLeft, { size: 16, color: t.primary })
          ),
          React.createElement('span', {
            style: { ...fontBase, fontSize: 16, fontWeight: 700, color: t.text }
          }, card.title)
        ),

        // Status badge
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 20,
            background: isApproved ? '#D1FAE5' : t.surfaceAlt,
            marginBottom: 14
          }
        },
          React.createElement('div', {
            style: {
              width: 6, height: 6, borderRadius: '50%',
              background: isApproved ? '#10B981' : t.primary
            }
          }),
          React.createElement('span', {
            style: { ...fontBase, fontSize: 12, fontWeight: 600, color: isApproved ? '#10B981' : t.primary }
          }, isApproved ? 'Approved' : 'Awaiting Review')
        ),

        // Palette
        React.createElement('div', {
          style: {
            height: 50, borderRadius: 12, overflow: 'hidden',
            display: 'flex', marginBottom: 12
          }
        },
          ...card.palette.map((hex, i) =>
            React.createElement('div', { key: i, style: { flex: 1, background: hex } })
          )
        ),

        // Themes
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' } },
          ...card.themes.map(th => React.createElement(Tag, { key: th, label: th }))
        ),

        // Collaborators
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: 'Collaborators' }),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            ...card.collaborators.map((c, i) =>
              React.createElement(Avatar, { key: i, initials: c.initials, color: c.color })
            ),
            React.createElement('button', {
              style: {
                width: 30, height: 30, borderRadius: '50%',
                background: t.surfaceAlt, border: `1.5px dashed ${t.border}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement(window.lucide.Plus, { size: 12, color: t.textMuted })
            )
          )
        ),

        // Comments
        React.createElement(Card, { style: { marginBottom: 10 } },
          React.createElement(SectionLabel, { label: `Comments (${card.comments.length})` }),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
            ...card.comments.map((c, i) =>
              React.createElement('div', { key: i, style: { display: 'flex', gap: 10 } },
                React.createElement(Avatar, { initials: c.author, size: 28, color: c.avatar }),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', {
                    style: {
                      display: 'flex', justifyContent: 'space-between',
                      marginBottom: 3
                    }
                  },
                    React.createElement('span', {
                      style: { ...fontBase, fontSize: 12, fontWeight: 700, color: t.text }
                    }, c.author),
                    React.createElement('span', {
                      style: { ...fontBase, fontSize: 11, color: t.textMuted }
                    }, c.time)
                  ),
                  React.createElement('div', {
                    style: { ...fontBase, fontSize: 12, color: t.textSub, lineHeight: 1.5 }
                  }, c.text)
                )
              )
            )
          ),
          // Comment input
          React.createElement('div', {
            style: {
              marginTop: 12, display: 'flex', gap: 8, alignItems: 'flex-end'
            }
          },
            React.createElement('input', {
              value: commentText,
              onChange: e => setCommentText(e.target.value),
              placeholder: 'Add a comment…',
              style: {
                flex: 1, background: t.inputBg, border: `1px solid ${t.border}`,
                borderRadius: 10, padding: '8px 12px', outline: 'none',
                ...fontBase, fontSize: 13, color: t.text
              }
            }),
            React.createElement('button', {
              style: {
                width: 34, height: 34, borderRadius: 10,
                background: commentText ? t.primary : t.surfaceAlt,
                border: 'none', cursor: commentText ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement(window.lucide.Send, { size: 14, color: commentText ? '#fff' : t.textMuted })
            )
          )
        ),

        // Approve
        !isApproved && React.createElement('button', {
          onClick: () => setApproved(prev => ({ ...prev, [activeCard]: true })),
          style: {
            width: '100%', padding: '14px 0',
            background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
            border: 'none', borderRadius: 14,
            ...fontBase, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }
        },
          React.createElement(window.lucide.CheckCircle, { size: 16, color: '#fff' }),
          'Approve Draft'
        )
      );
    }

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      React.createElement('div', {
        style: { ...fontBase, fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }
      }, 'Collaboration'),
      React.createElement('div', {
        style: { ...fontBase, fontSize: 13, color: t.textSub, marginBottom: 20 }
      }, 'Share and review creative concepts'),

      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        ...cards.map(card =>
          React.createElement(Card, { key: card.id, onClick: () => setActiveCard(card.id) },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 }
            },
              React.createElement('div', null,
                React.createElement('div', {
                  style: { ...fontBase, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 3 }
                }, card.title),
                React.createElement('div', {
                  style: { ...fontBase, fontSize: 11, color: t.textMuted }
                }, `Shared by ${card.sharedBy} · ${card.sharedAt}`)
              ),
              React.createElement('div', {
                style: {
                  padding: '4px 10px', borderRadius: 12,
                  background: card.status === 'Approved' ? '#D1FAE5' : t.surfaceAlt,
                  ...fontBase, fontSize: 11, fontWeight: 600,
                  color: card.status === 'Approved' ? '#10B981' : t.primary
                }
              }, card.status)
            ),
            React.createElement('div', {
              style: {
                height: 40, borderRadius: 10, overflow: 'hidden',
                display: 'flex', marginBottom: 10
              }
            },
              ...card.palette.map((hex, i) =>
                React.createElement('div', { key: i, style: { flex: 1, background: hex } })
              )
            ),
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            },
              React.createElement('div', { style: { display: 'flex', gap: -4 } },
                ...card.collaborators.map((c, i) =>
                  React.createElement('div', {
                    key: i,
                    style: {
                      width: 26, height: 26, borderRadius: '50%',
                      background: c.color, border: `2px solid ${t.card}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginLeft: i > 0 ? -8 : 0, zIndex: card.collaborators.length - i,
                      ...fontBase, fontSize: 9, fontWeight: 700, color: '#fff'
                    }
                  }, c.initials)
                )
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4 }
              },
                React.createElement(window.lucide.MessageCircle, { size: 13, color: t.textMuted }),
                React.createElement('span', {
                  style: { ...fontBase, fontSize: 12, color: t.textMuted }
                }, card.comments.length),
                React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
              )
            )
          )
        )
      )
    );
  }

  // ── SETTINGS SCREEN ───────────────────────────────────────────────────────

  function SettingsScreen() {
    const settingGroups = [
      {
        title: 'Account',
        items: [
          { icon: window.lucide.User, label: 'Profile', value: 'Alex Kim' },
          { icon: window.lucide.Mail, label: 'Email', value: 'alex@studio.co' },
          { icon: window.lucide.Crown, label: 'Plan', value: 'Pro · $9/mo', badge: 'PRO' },
        ]
      },
      {
        title: 'Preferences',
        items: [
          { icon: window.lucide.Bell, label: 'Notifications', value: 'On' },
          { icon: window.lucide.Globe, label: 'Language', value: 'English' },
          { icon: window.lucide.Palette, label: 'Default AI Style', value: 'Creative' },
        ]
      },
      {
        title: 'Data',
        items: [
          { icon: window.lucide.Download, label: 'Export Drafts', value: 'PDF / Notion' },
          { icon: window.lucide.Trash2, label: 'Clear History', value: '', danger: true },
        ]
      }
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      // Profile card
      React.createElement('div', {
        style: {
          background: t.primaryGradient, borderRadius: 20, padding: 20, marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 14
        }
      },
        React.createElement('div', {
          style: {
            width: 54, height: 54, borderRadius: 16,
            background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            ...fontBase, fontSize: 22, fontWeight: 800, color: '#fff'
          }
        }, 'AK'),
        React.createElement('div', null,
          React.createElement('div', {
            style: { ...fontBase, fontSize: 17, fontWeight: 700, color: '#fff' }
          }, 'Alex Kim'),
          React.createElement('div', {
            style: { ...fontBase, fontSize: 12, color: 'rgba(255,255,255,0.75)' }
          }, 'Creative Director · Pro'),
          React.createElement('div', {
            style: {
              marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,255,255,0.2)',
              padding: '3px 8px', borderRadius: 8
            }
          },
            React.createElement(window.lucide.Zap, { size: 11, color: '#FBBF24' }),
            React.createElement('span', {
              style: { ...fontBase, fontSize: 11, fontWeight: 700, color: '#fff' }
            }, '24 drafts this month')
          )
        )
      ),

      // Theme toggle
      React.createElement(Card, { style: { marginBottom: 16 } },
        React.createElement('div', {
          style: {
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: 10,
                background: t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              isDark
                ? React.createElement(window.lucide.Moon, { size: 16, color: t.primary })
                : React.createElement(window.lucide.Sun, { size: 16, color: t.primary })
            ),
            React.createElement('div', null,
              React.createElement('div', {
                style: { ...fontBase, fontSize: 14, fontWeight: 600, color: t.text }
              }, 'Appearance'),
              React.createElement('div', {
                style: { ...fontBase, fontSize: 12, color: t.textMuted }
              }, isDark ? 'Dark mode' : 'Light mode')
            )
          ),
          React.createElement('button', {
            onClick: () => setIsDark(d => !d),
            style: {
              width: 50, height: 28, borderRadius: 14,
              background: isDark ? t.primary : t.border,
              border: 'none', cursor: 'pointer', position: 'relative',
              transition: 'background 0.25s'
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3,
                left: isDark ? 24 : 3,
                width: 22, height: 22, borderRadius: '50%',
                background: '#fff', transition: 'left 0.25s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }
            })
          )
        )
      ),

      // Settings groups
      ...settingGroups.map(group =>
        React.createElement('div', { key: group.title, style: { marginBottom: 14 } },
          React.createElement(SectionLabel, { label: group.title }),
          React.createElement(Card, { style: { padding: 0 } },
            ...group.items.map((item, i) =>
              React.createElement('div', {
                key: item.label,
                style: {
                  display: 'flex', alignItems: 'center',
                  padding: '12px 16px', gap: 12,
                  borderBottom: i < group.items.length - 1 ? `1px solid ${t.border}` : 'none',
                  cursor: 'pointer'
                }
              },
                React.createElement('div', {
                  style: {
                    width: 32, height: 32, borderRadius: 9,
                    background: item.danger ? '#FEE2E2' : t.surfaceAlt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }
                },
                  React.createElement(item.icon, { size: 15, color: item.danger ? '#EF4444' : t.primary })
                ),
                React.createElement('span', {
                  style: {
                    flex: 1, ...fontBase, fontSize: 14, fontWeight: 500,
                    color: item.danger ? '#EF4444' : t.text
                  }
                }, item.label),
                item.badge && React.createElement('span', {
                  style: {
                    ...fontBase, fontSize: 10, fontWeight: 700,
                    background: t.primaryGradient, color: '#fff',
                    padding: '2px 7px', borderRadius: 6
                  }
                }, item.badge),
                item.value && React.createElement('span', {
                  style: { ...fontBase, fontSize: 12, color: t.textMuted }
                }, item.value),
                React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
              )
            )
          )
        )
      ),

      React.createElement('div', {
        style: { ...fontBase, fontSize: 11, color: t.textMuted, textAlign: 'center', marginTop: 8 }
      }, 'Spark Draft v1.0.0 · Made for creative minds')
    );
  }

  // ── RENDER ────────────────────────────────────────────────────────────────

  const navTabs = [
    { id: 'home', icon: window.lucide.Zap, label: 'Create' },
    { id: 'drafts', icon: window.lucide.FolderOpen, label: 'Drafts' },
    { id: 'mood', icon: window.lucide.Layers, label: 'Mood' },
    { id: 'collab', icon: window.lucide.Users, label: 'Collab' },
    { id: 'settings', icon: window.lucide.Settings, label: 'Settings' },
  ];

  const screenMap = {
    home: React.createElement(HomeScreen),
    drafts: React.createElement(DraftsScreen),
    mood: React.createElement(MoodboardScreen),
    collab: React.createElement(CollabScreen),
    settings: React.createElement(SettingsScreen),
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#E8E4F5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...fontBase
    }
  },
    // Inject keyframes
    React.createElement('style', null, `
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      * { box-sizing: border-box; }
      textarea::placeholder, input::placeholder { color: #A09EC0; }
      ::-webkit-scrollbar { width: 0; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.surface,
        borderRadius: 48, overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(60,30,120,0.25), 0 0 0 10px #1a1040',
        position: 'relative', display: 'flex', flexDirection: 'column'
      }
    },
      // Dynamic island
      React.createElement(DynamicIsland),

      // Status bar
      React.createElement('div', { style: { paddingTop: 52 } },
        React.createElement(StatusBar)
      ),

      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }
      },
        screenMap[activeTab]
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 20px',
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`
        }
      },
        ...navTabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '4px 12px',
              opacity: activeTab === tab.id ? 1 : 0.5,
              transition: 'opacity 0.2s'
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 10,
                background: activeTab === tab.id ? t.surfaceAlt : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s'
              }
            },
              React.createElement(tab.icon, {
                size: 18,
                color: activeTab === tab.id ? t.primary : t.textMuted
              })
            ),
            React.createElement('span', {
              style: {
                ...fontBase, fontSize: 10, fontWeight: 600,
                color: activeTab === tab.id ? t.primary : t.textMuted
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
