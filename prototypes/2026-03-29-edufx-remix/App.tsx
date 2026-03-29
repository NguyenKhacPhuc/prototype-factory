const { useState, useEffect, useRef } = React;

const THEMES = {
  light: {
    bg: '#F0F0F8',
    surface: '#FFFFFF',
    surfaceAlt: '#E8E8F4',
    primary: '#1845FF',
    secondary: '#FF6B00',
    accent: '#00C896',
    text: '#0A0A1E',
    textMuted: '#6060888',
    border: '#C8C8E0',
    navBg: '#FFFFFF',
    tag: '#E6EBFF',
    tagText: '#1845FF',
    chip: '#F0F0F8',
    isDark: false,
  },
  dark: {
    bg: '#0A0A1A',
    surface: '#141428',
    surfaceAlt: '#0F0F1E',
    primary: '#4D72FF',
    secondary: '#FF7A1A',
    accent: '#00E0A8',
    text: '#EEEEFF',
    textMuted: '#7070A0',
    border: '#252545',
    navBg: '#0D0D22',
    tag: '#1A1A44',
    tagText: '#4D72FF',
    chip: '#1A1A30',
    isDark: true,
  }
};

function StatusBar({ theme }) {
  return React.createElement('div', {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 22,
      paddingRight: 18,
      paddingTop: 6,
      flexShrink: 0,
    }
  },
    React.createElement('span', {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: theme.text,
        fontFamily: "'Orbitron', sans-serif",
        letterSpacing: 1,
      }
    }, '9:41'),
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 5 }
    },
      React.createElement(window.lucide.Wifi, { size: 13, color: theme.text }),
      React.createElement(window.lucide.Signal, { size: 13, color: theme.text }),
      React.createElement(window.lucide.Battery, { size: 15, color: theme.text })
    )
  );
}

function DynamicIsland() {
  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'center', marginBottom: 6, flexShrink: 0 }
  },
    React.createElement('div', {
      style: { width: 118, height: 32, background: '#000', borderRadius: 20 }
    })
  );
}

// ─── HOME SCREEN ────────────────────────────────────────────────────────────

function HomeScreen({ theme }) {
  const [activeModule, setActiveModule] = useState(0);
  const [pressedBtn, setPressedBtn] = useState(null);

  const modules = [
    { title: 'Quantum Chemistry Remix', progress: 68, subject: 'CHEMISTRY', color: theme.primary, blocks: 6 },
    { title: 'Ancient Rome Narrative', progress: 34, subject: 'HISTORY', color: theme.secondary, blocks: 4 },
    { title: 'Code Logic Lab', progress: 91, subject: 'CS', color: theme.accent, blocks: 9 },
  ];

  const trending = ['MATH · CALCULUS', 'PHYSICS · WAVES', 'BIO · GENETICS', 'HISTORY · WW2'];

  return React.createElement('div', { style: { paddingBottom: 20 } },

    // ── Hero header ──
    React.createElement('div', {
      style: {
        background: theme.primary,
        padding: '14px 20px 22px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: { position: 'absolute', right: -24, top: -24, width: 110, height: 110, border: '3px solid rgba(255,255,255,0.12)', transform: 'rotate(45deg)' }
      }),
      React.createElement('div', {
        style: { position: 'absolute', right: 12, bottom: -36, width: 80, height: 80, background: 'rgba(255,107,0,0.22)', transform: 'rotate(45deg)' }
      }),
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: { color: 'rgba(255,255,255,0.65)', fontSize: 10, fontFamily: "'Orbitron', sans-serif", letterSpacing: 2.5, marginBottom: 3 }
          }, 'WELCOME BACK'),
          React.createElement('h1', {
            style: { color: '#FFF', fontSize: 24, fontFamily: "'Orbitron', sans-serif", fontWeight: 900, letterSpacing: -0.5, lineHeight: 1 }
          }, 'REMIX HUB')
        ),
        React.createElement('div', {
          style: {
            background: theme.secondary,
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }
        },
          React.createElement(window.lucide.Zap, { size: 13, color: '#FFF' }),
          React.createElement('span', { style: { color: '#FFF', fontSize: 11, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" } }, '14 DAY')
        )
      )
    ),

    // ── Asymmetric stats grid (3-panel: wide + 2 stacked) ──
    React.createElement('div', {
      style: { padding: '14px 14px 0', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }
    },
      React.createElement('div', {
        style: {
          background: theme.secondary,
          padding: '16px',
          position: 'relative',
          overflow: 'hidden',
          gridRow: 'span 2',
        }
      },
        React.createElement('div', { style: { position: 'absolute', right: -12, top: -12, width: 70, height: 70, border: '2px solid rgba(255,255,255,0.18)', transform: 'rotate(45deg)' } }),
        React.createElement('p', {
          style: { color: 'rgba(255,255,255,0.7)', fontSize: 9, fontFamily: "'Orbitron', sans-serif", letterSpacing: 2, marginBottom: 6 }
        }, 'REMIXES CREATED'),
        React.createElement('p', {
          style: { color: '#FFF', fontSize: 40, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", lineHeight: 1 }
        }, '47'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 10, marginTop: 6 } }, '+3 this week'),
        React.createElement('div', {
          style: { marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(window.lucide.TrendingUp, { size: 14, color: 'rgba(255,255,255,0.8)' }),
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 10 } }, '↑ 18% vs last wk')
        )
      ),
      React.createElement('div', {
        style: { background: theme.surface, border: `2px solid ${theme.border}`, padding: '12px 10px' }
      },
        React.createElement('p', { style: { color: theme.textMuted, fontSize: 8, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, marginBottom: 3 } }, 'TOTAL XP'),
        React.createElement('p', { style: { color: theme.primary, fontSize: 20, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", lineHeight: 1 } }, '3.2K')
      ),
      React.createElement('div', {
        style: { background: theme.surface, border: `2px solid ${theme.border}`, padding: '12px 10px' }
      },
        React.createElement('p', { style: { color: theme.textMuted, fontSize: 8, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, marginBottom: 3 } }, 'GLOBAL RANK'),
        React.createElement('p', { style: { color: theme.text, fontSize: 20, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", lineHeight: 1 } }, '#142')
      )
    ),

    // ── Active remixes ──
    React.createElement('div', { style: { padding: '18px 14px 0' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
      },
        React.createElement('h2', {
          style: { fontSize: 11, fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color: theme.text, letterSpacing: 1.5 }
        }, 'ACTIVE REMIXES'),
        React.createElement('span', { style: { fontSize: 11, color: theme.primary, fontWeight: 600 } }, 'View all →')
      ),
      modules.map((mod, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setActiveModule(i),
          style: {
            marginBottom: 8,
            padding: '12px 14px',
            background: theme.surface,
            border: `2px solid ${i === activeModule ? mod.color : theme.border}`,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.2s',
          }
        },
          React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: mod.color } }),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: 10 }
          },
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontSize: 8, color: mod.color, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, fontWeight: 700, marginBottom: 3 }
              }, mod.subject),
              React.createElement('p', { style: { fontSize: 12, fontWeight: 600, color: theme.text } }, mod.title),
              React.createElement('p', { style: { fontSize: 10, color: theme.textMuted, marginTop: 2 } }, `${mod.blocks} module blocks`)
            ),
            React.createElement('span', {
              style: { fontSize: 20, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", color: mod.color, flexShrink: 0 }
            }, `${mod.progress}%`)
          ),
          React.createElement('div', {
            style: { marginTop: 10, marginLeft: 10, height: 3, background: theme.surfaceAlt }
          },
            React.createElement('div', {
              style: { height: '100%', width: `${mod.progress}%`, background: mod.color, transition: 'width 0.4s' }
            })
          )
        )
      )
    ),

    // ── Trending ──
    React.createElement('div', { style: { padding: '18px 14px 0' } },
      React.createElement('h2', {
        style: { fontSize: 11, fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color: theme.text, letterSpacing: 1.5, marginBottom: 10 }
      }, 'TRENDING BLUEPRINTS'),
      React.createElement('div', {
        style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }
      },
        trending.map((t, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flexShrink: 0,
              padding: '9px 14px',
              background: i % 2 === 0 ? theme.primary : theme.secondary,
              cursor: 'pointer',
            }
          },
            React.createElement('p', {
              style: { color: '#FFF', fontSize: 9, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, letterSpacing: 1, whiteSpace: 'nowrap' }
            }, t)
          )
        )
      )
    ),

    // ── Quick actions ──
    React.createElement('div', {
      style: { padding: '18px 14px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }
    },
      [
        { label: 'NEW REMIX', icon: window.lucide.Plus, bg: theme.primary },
        { label: 'EXPLORE', icon: window.lucide.Compass, bg: theme.secondary },
      ].map((btn, i) =>
        React.createElement('button', {
          key: i,
          onMouseDown: () => setPressedBtn(i),
          onMouseUp: () => setPressedBtn(null),
          onTouchStart: () => setPressedBtn(i),
          onTouchEnd: () => setPressedBtn(null),
          style: {
            padding: '14px',
            background: btn.bg,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transform: pressedBtn === i ? 'scale(0.96)' : 'scale(1)',
            transition: 'transform 0.1s',
          }
        },
          React.createElement(btn.icon, { size: 16, color: '#FFF' }),
          React.createElement('span', {
            style: { color: '#FFF', fontSize: 10, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, letterSpacing: 1 }
          }, btn.label)
        )
      )
    )
  );
}

// ─── CANVAS SCREEN ──────────────────────────────────────────────────────────

function CanvasScreen({ theme }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showAdded, setShowAdded] = useState(false);

  const blockDefs = [
    { id: 1, type: 'VIDEO',     title: 'Molecular Structures Intro',    meta: '4:32',    color: theme.primary,   icon: window.lucide.Play },
    { id: 2, type: 'QUIZ',      title: 'Element Properties Check',      meta: '5 Qs',    color: theme.secondary, icon: window.lucide.CheckSquare },
    { id: 3, type: 'CHALLENGE', title: 'Build-a-Molecule Interactive',  meta: '+150 XP', color: theme.accent,    icon: window.lucide.Zap },
    { id: 4, type: 'VIDEO',     title: 'Reaction Mechanics Deep Dive',  meta: '7:18',    color: theme.primary,   icon: window.lucide.Play },
    { id: 5, type: 'NOTE',      title: 'My Custom Study Notes',         meta: 'Text',    color: '#A855F7',       icon: window.lucide.FileText },
  ];

  const selected = blockDefs.find(b => b.id === selectedId);

  const handleAddBlock = () => {
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  // Asymmetric blueprint grid layout
  return React.createElement('div', { style: { paddingBottom: 20 } },

    // Header
    React.createElement('div', {
      style: {
        padding: '14px 18px',
        borderBottom: `2px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.surface,
      }
    },
      React.createElement('div', null,
        React.createElement('p', { style: { fontSize: 9, color: theme.textMuted, fontFamily: "'Orbitron', sans-serif", letterSpacing: 2, marginBottom: 2 } }, 'ACTIVE PROJECT'),
        React.createElement('h2', { style: { fontSize: 15, fontWeight: 900, color: theme.text, fontFamily: "'Orbitron', sans-serif", letterSpacing: 0.5 } }, 'REMIX CANVAS')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 7 } },
        React.createElement('button', {
          style: {
            padding: '7px 12px',
            background: 'transparent',
            border: `2px solid ${theme.primary}`,
            color: theme.primary,
            fontSize: 9,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.5,
          }
        }, 'PREVIEW'),
        React.createElement('button', {
          style: {
            padding: '7px 12px',
            background: theme.secondary,
            border: 'none',
            color: '#FFF',
            fontSize: 9,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.5,
          }
        }, 'PUBLISH')
      )
    ),

    // Legend
    React.createElement('div', {
      style: {
        padding: '10px 14px',
        display: 'flex',
        gap: 14,
        borderBottom: `1px solid ${theme.border}`,
        background: theme.surfaceAlt,
      }
    },
      [
        { label: 'VIDEO', color: theme.primary },
        { label: 'QUIZ', color: theme.secondary },
        { label: 'CHALLENGE', color: theme.accent },
        { label: 'NOTE', color: '#A855F7' },
      ].map((t, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement('div', { style: { width: 8, height: 8, background: t.color } }),
          React.createElement('span', { style: { fontSize: 8, color: theme.textMuted, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1 } }, t.label)
        )
      )
    ),

    // ── Asymmetric Blueprint Grid ──
    React.createElement('div', { style: { padding: '14px' } },

      // Row 1: wide (3fr) + narrow (2fr)
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 8, marginBottom: 8 }
      },
        // Block 1 – large
        React.createElement('div', {
          onClick: () => setSelectedId(selectedId === 1 ? null : 1),
          style: {
            padding: '14px',
            background: theme.surface,
            border: `2px solid ${selectedId === 1 ? blockDefs[0].color : theme.border}`,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: blockDefs[0].color } }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 8, color: blockDefs[0].color, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, fontWeight: 700 } }, 'VIDEO'),
            React.createElement(window.lucide.Play, { size: 14, color: blockDefs[0].color })
          ),
          React.createElement('p', { style: { fontSize: 11, fontWeight: 600, color: theme.text } }, blockDefs[0].title),
          React.createElement('p', { style: { fontSize: 10, color: theme.textMuted, marginTop: 4 } }, blockDefs[0].meta)
        ),
        // Block 2 – small
        React.createElement('div', {
          onClick: () => setSelectedId(selectedId === 2 ? null : 2),
          style: {
            padding: '14px',
            background: theme.surface,
            border: `2px solid ${selectedId === 2 ? blockDefs[1].color : theme.border}`,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: blockDefs[1].color } }),
          React.createElement('span', { style: { fontSize: 8, color: blockDefs[1].color, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, fontWeight: 700 } }, 'QUIZ'),
          React.createElement('p', { style: { fontSize: 11, fontWeight: 600, color: theme.text, marginTop: 6 } }, blockDefs[1].title),
          React.createElement('p', { style: { fontSize: 10, color: theme.textMuted, marginTop: 4 } }, blockDefs[1].meta)
        )
      ),

      // Row 2: full-width challenge block
      React.createElement('div', {
        onClick: () => setSelectedId(selectedId === 3 ? null : 3),
        style: {
          padding: '14px 16px',
          background: theme.surface,
          border: `2px solid ${selectedId === 3 ? blockDefs[2].color : theme.border}`,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: blockDefs[2].color } }),
        React.createElement('div', { style: { marginLeft: 10 } },
          React.createElement('span', { style: { fontSize: 8, color: blockDefs[2].color, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, fontWeight: 700 } }, 'CHALLENGE'),
          React.createElement('p', { style: { fontSize: 12, fontWeight: 600, color: theme.text, marginTop: 3 } }, blockDefs[2].title)
        ),
        React.createElement('div', {
          style: { background: blockDefs[2].color, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }
        },
          React.createElement(window.lucide.Zap, { size: 11, color: '#FFF' }),
          React.createElement('span', { style: { color: '#FFF', fontSize: 10, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" } }, '+150XP')
        )
      ),

      // Row 3: 2fr + 3fr
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 8, marginBottom: 8 }
      },
        React.createElement('div', {
          onClick: () => setSelectedId(selectedId === 5 ? null : 5),
          style: {
            padding: '14px',
            background: theme.surface,
            border: `2px solid ${selectedId === 5 ? blockDefs[4].color : theme.border}`,
            cursor: 'pointer',
            position: 'relative',
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: blockDefs[4].color } }),
          React.createElement('span', { style: { fontSize: 8, color: blockDefs[4].color, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, fontWeight: 700 } }, 'NOTE'),
          React.createElement('p', { style: { fontSize: 10, fontWeight: 600, color: theme.text, marginTop: 6 } }, blockDefs[4].title)
        ),
        React.createElement('div', {
          onClick: () => setSelectedId(selectedId === 4 ? null : 4),
          style: {
            padding: '14px',
            background: theme.surface,
            border: `2px solid ${selectedId === 4 ? blockDefs[3].color : theme.border}`,
            cursor: 'pointer',
            position: 'relative',
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: blockDefs[3].color } }),
          React.createElement('span', { style: { fontSize: 8, color: blockDefs[3].color, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, fontWeight: 700 } }, 'VIDEO'),
          React.createElement('p', { style: { fontSize: 11, fontWeight: 600, color: theme.text, marginTop: 6 } }, blockDefs[3].title),
          React.createElement('p', { style: { fontSize: 10, color: theme.textMuted, marginTop: 3 } }, blockDefs[3].meta)
        )
      ),

      // Add block
      React.createElement('button', {
        onClick: handleAddBlock,
        style: {
          width: '100%',
          padding: '13px',
          background: showAdded ? theme.accent : 'transparent',
          border: `2px dashed ${showAdded ? theme.accent : theme.border}`,
          color: showAdded ? '#FFF' : theme.textMuted,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'all 0.25s',
        }
      },
        React.createElement(showAdded ? window.lucide.Check : window.lucide.Plus, { size: 15, color: showAdded ? '#FFF' : theme.textMuted }),
        React.createElement('span', {
          style: { fontSize: 10, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1, fontWeight: 700 }
        }, showAdded ? 'BLOCK ADDED!' : 'ADD MODULE BLOCK')
      )
    ),

    // Selected block panel
    selected && React.createElement('div', {
      style: {
        margin: '0 14px',
        padding: '16px',
        background: selected.color,
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', right: -14, top: -14, width: 60, height: 60, border: '2px solid rgba(255,255,255,0.25)', transform: 'rotate(45deg)' } }),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 9, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5 } }, 'SELECTED BLOCK'),
      React.createElement('p', { style: { color: '#FFF', fontSize: 14, fontWeight: 700, marginTop: 4 } }, selected.title),
      React.createElement('div', { style: { display: 'flex', gap: 7, marginTop: 12 } },
        ['EDIT', 'DUPLICATE', 'REMOVE'].map((a, i) =>
          React.createElement('button', {
            key: i,
            onClick: i === 2 ? () => setSelectedId(null) : undefined,
            style: {
              flex: 1,
              padding: '8px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#FFF',
              fontSize: 9,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.5,
            }
          }, a)
        )
      )
    )
  );
}

// ─── MARKET SCREEN ──────────────────────────────────────────────────────────

function MarketScreen({ theme }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', 'SCIENCE', 'HISTORY', 'MATH', 'CODING', 'ART'];

  const remixes = [
    { title: 'Quantum Physics Journey', author: 'Dr. Chen', subject: 'PHYSICS', remixes: 234, rating: 4.8, hot: true },
    { title: 'Ancient Civilizations Mix', author: 'HistoryLab', subject: 'HISTORY', remixes: 187, rating: 4.6, hot: false },
    { title: 'Algebra Adventure Pack', author: 'MathMaster', subject: 'MATH', remixes: 312, rating: 4.9, hot: true },
    { title: 'Python Basics Remix', author: 'CodeJourney', subject: 'CODING', remixes: 445, rating: 4.7, hot: false },
    { title: 'Cell Biology Visualized', author: 'BioBlend', subject: 'SCIENCE', remixes: 156, rating: 4.5, hot: false },
  ];

  return React.createElement('div', { style: { paddingBottom: 20 } },

    // Header
    React.createElement('div', {
      style: {
        background: theme.primary,
        padding: '14px 18px 18px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', right: -20, top: -20, width: 90, height: 90, border: '3px solid rgba(255,255,255,0.1)', transform: 'rotate(45deg)' } }),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 9, fontFamily: "'Orbitron', sans-serif", letterSpacing: 2.5, marginBottom: 2, position: 'relative' } }, 'COMMUNITY'),
      React.createElement('h2', { style: { color: '#FFF', fontSize: 20, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", position: 'relative' } }, 'REMIX MARKET'),
      React.createElement('div', {
        style: {
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255,255,255,0.13)',
          padding: '10px 14px',
          border: '1px solid rgba(255,255,255,0.25)',
          position: 'relative',
        }
      },
        React.createElement(window.lucide.Search, { size: 15, color: 'rgba(255,255,255,0.65)' }),
        React.createElement('span', { style: { fontSize: 13, color: 'rgba(255,255,255,0.45)' } }, 'Search blueprints...')
      )
    ),

    // Categories
    React.createElement('div', {
      style: { display: 'flex', gap: 6, padding: '10px 14px', overflowX: 'auto', borderBottom: `2px solid ${theme.border}`, background: theme.surface }
    },
      categories.map(cat =>
        React.createElement('button', {
          key: cat,
          onClick: () => setActiveCategory(cat),
          style: {
            flexShrink: 0,
            padding: '6px 12px',
            background: cat === activeCategory ? theme.secondary : 'transparent',
            border: `2px solid ${cat === activeCategory ? theme.secondary : theme.border}`,
            color: cat === activeCategory ? '#FFF' : theme.textMuted,
            fontSize: 8,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 1,
          }
        }, cat)
      )
    ),

    // Featured
    React.createElement('div', {
      style: {
        margin: '14px 14px 0',
        background: theme.secondary,
        padding: '18px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', right: -18, top: -18, width: 80, height: 80, border: '3px solid rgba(255,255,255,0.15)', transform: 'rotate(45deg)' } }),
      React.createElement('div', { style: { position: 'absolute', right: 10, bottom: -28, width: 60, height: 60, background: 'rgba(255,255,255,0.08)', transform: 'rotate(45deg)' } }),
      React.createElement('span', {
        style: { fontSize: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Orbitron', sans-serif", letterSpacing: 2, fontWeight: 700 }
      }, '★ FEATURED THIS WEEK'),
      React.createElement('h3', {
        style: { color: '#FFF', fontSize: 17, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", marginTop: 6, lineHeight: 1.2, position: 'relative' }
      }, 'QUANTUM MECHANICS\nVISUALIZED'),
      React.createElement('p', {
        style: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 6, position: 'relative' }
      }, '6 modules · 24 interactive challenges · Rated #1 this month'),
      React.createElement('div', {
        style: { marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }
      },
        React.createElement('div', { style: { display: 'flex', gap: 14 } },
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.9)', fontSize: 11 } }, '⭐ 4.9'),
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.9)', fontSize: 11 } }, '1.2K remixes')
        ),
        React.createElement('button', {
          style: {
            background: '#FFF',
            border: 'none',
            padding: '8px 14px',
            color: theme.secondary,
            fontSize: 9,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            cursor: 'pointer',
            letterSpacing: 0.5,
          }
        }, 'REMIX IT')
      )
    ),

    // List
    React.createElement('div', { style: { padding: '14px 14px 0' } },
      React.createElement('h3', {
        style: { fontSize: 10, fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color: theme.text, letterSpacing: 1.5, marginBottom: 10 }
      }, 'POPULAR BLUEPRINTS'),
      remixes.map((remix, i) =>
        React.createElement('div', {
          key: i,
          style: {
            marginBottom: 8,
            padding: '12px 14px',
            background: theme.surface,
            border: `2px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }
        },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 } },
              React.createElement('span', {
                style: {
                  fontSize: 8,
                  color: theme.tagText,
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: 1,
                  fontWeight: 700,
                  background: theme.tag,
                  padding: '2px 6px',
                }
              }, remix.subject),
              remix.hot && React.createElement('span', {
                style: { fontSize: 9, color: theme.secondary, fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }
              }, '🔥 HOT')
            ),
            React.createElement('p', { style: { fontSize: 12, fontWeight: 600, color: theme.text } }, remix.title),
            React.createElement('p', { style: { fontSize: 10, color: theme.textMuted, marginTop: 2 } }, `by ${remix.author}`)
          ),
          React.createElement('div', { style: { textAlign: 'right', flexShrink: 0, marginLeft: 10 } },
            React.createElement('p', { style: { fontSize: 14, fontWeight: 800, color: theme.primary, fontFamily: "'Orbitron', sans-serif" } }, `${remix.rating}`),
            React.createElement('p', { style: { fontSize: 9, color: theme.textMuted, marginTop: 1 } }, `${remix.remixes} ↺`)
          )
        )
      )
    )
  );
}

// ─── PROFILE SCREEN ─────────────────────────────────────────────────────────

function ProfileScreen({ theme, isDark, setIsDark }) {
  const [activeGoal, setActiveGoal] = useState(0);

  const goals = [
    { title: 'Chemistry Mastery Path', progress: 68, subject: 'CHEMISTRY', deadline: '14 DAYS', color: theme.primary },
    { title: 'Code Fundamentals', progress: 34, subject: 'CODING', deadline: '21 DAYS', color: theme.secondary },
    { title: 'Ancient History Narrative', progress: 91, subject: 'HISTORY', deadline: '3 DAYS', color: theme.accent },
  ];

  const badges = [
    { label: 'REMIX PRO', icon: '⚡', color: theme.secondary },
    { label: 'STREAK X14', icon: '🔥', color: '#E84393' },
    { label: 'CREATOR', icon: '🎨', color: theme.primary },
    { label: 'SCHOLAR', icon: '📚', color: theme.accent },
  ];

  return React.createElement('div', { style: { paddingBottom: 20 } },

    // Profile hero
    React.createElement('div', {
      style: {
        background: theme.primary,
        padding: '18px 18px 24px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', right: -28, top: -28, width: 120, height: 120, border: '3px solid rgba(255,255,255,0.08)', transform: 'rotate(45deg)' } }),
      React.createElement('div', { style: { position: 'absolute', right: 18, top: 18, width: 60, height: 60, border: '2px solid rgba(255,107,0,0.35)', transform: 'rotate(45deg)' } }),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, position: 'relative' } },
        React.createElement('div', {
          style: {
            width: 60,
            height: 60,
            background: theme.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 900,
            color: '#FFF',
            fontFamily: "'Orbitron', sans-serif",
            flexShrink: 0,
          }
        }, 'AJ'),
        React.createElement('div', null,
          React.createElement('h2', { style: { color: '#FFF', fontSize: 16, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", letterSpacing: 0.5 } }, 'ALEX JORDAN'),
          React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 5 } },
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontFamily: "'Orbitron', sans-serif", letterSpacing: 0.5 } }, 'LVL 14'),
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.5)' } }, '·'),
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.8)' } }, 'REMIX ARTISAN')
          )
        )
      ),
      // XP progress
      React.createElement('div', { style: { marginTop: 16, position: 'relative' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
          React.createElement('span', { style: { fontSize: 9, color: 'rgba(255,255,255,0.65)', fontFamily: "'Orbitron', sans-serif" } }, '3,200 XP'),
          React.createElement('span', { style: { fontSize: 9, color: 'rgba(255,255,255,0.65)', fontFamily: "'Orbitron', sans-serif" } }, '5,000 XP → LVL 15')
        ),
        React.createElement('div', { style: { height: 6, background: 'rgba(255,255,255,0.15)' } },
          React.createElement('div', { style: { width: '64%', height: '100%', background: theme.secondary } })
        )
      )
    ),

    // Stats – equal 3-column grid
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: `2px solid ${theme.border}` }
    },
      [
        { label: 'REMIXES', value: '47', color: theme.primary },
        { label: 'SHARED', value: '12', color: theme.secondary },
        { label: 'STREAK', value: '14d', color: theme.accent },
      ].map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            padding: '14px 10px',
            textAlign: 'center',
            borderRight: i < 2 ? `2px solid ${theme.border}` : 'none',
            background: theme.surface,
          }
        },
          React.createElement('p', { style: { fontSize: 22, fontWeight: 900, fontFamily: "'Orbitron', sans-serif", color: s.color, lineHeight: 1 } }, s.value),
          React.createElement('p', { style: { fontSize: 8, color: theme.textMuted, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5, marginTop: 4 } }, s.label)
        )
      )
    ),

    // Badges
    React.createElement('div', { style: { padding: '14px 14px 0' } },
      React.createElement('h3', {
        style: { fontSize: 10, fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color: theme.text, letterSpacing: 1.5, marginBottom: 10 }
      }, 'ACHIEVEMENTS'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        badges.map((b, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              padding: '10px 6px',
              background: theme.surface,
              border: `2px solid ${b.color}`,
              textAlign: 'center',
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { fontSize: 18, marginBottom: 4 } }, b.icon),
            React.createElement('p', { style: { fontSize: 7, color: b.color, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, letterSpacing: 0.5 } }, b.label)
          )
        )
      )
    ),

    // Goal tracks
    React.createElement('div', { style: { padding: '16px 14px 0' } },
      React.createElement('h3', {
        style: { fontSize: 10, fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color: theme.text, letterSpacing: 1.5, marginBottom: 10 }
      }, 'GOAL TRACKS'),
      goals.map((g, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setActiveGoal(i),
          style: {
            marginBottom: 8,
            padding: '12px 14px',
            background: theme.surface,
            border: `2px solid ${i === activeGoal ? g.color : theme.border}`,
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: 8, color: g.color, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1, fontWeight: 700 } }, g.subject),
              React.createElement('p', { style: { fontSize: 12, fontWeight: 600, color: theme.text, marginTop: 2 } }, g.title)
            ),
            React.createElement('span', { style: { fontSize: 8, color: theme.secondary, fontFamily: "'Orbitron', sans-serif", fontWeight: 700 } }, g.deadline)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { flex: 1, height: 5, background: theme.surfaceAlt } },
              React.createElement('div', { style: { width: `${g.progress}%`, height: '100%', background: g.color } })
            ),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: g.color, fontFamily: "'Orbitron', sans-serif" } }, `${g.progress}%`)
          )
        )
      )
    ),

    // Settings
    React.createElement('div', { style: { padding: '16px 14px 0' } },
      React.createElement('h3', {
        style: { fontSize: 10, fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color: theme.text, letterSpacing: 1.5, marginBottom: 10 }
      }, 'SETTINGS'),

      // Theme toggle
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '13px 14px',
          background: theme.surface,
          border: `2px solid ${theme.border}`,
          marginBottom: 8,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 16, color: theme.primary }),
          React.createElement('span', { style: { fontSize: 13, color: theme.text } }, isDark ? 'Dark Mode' : 'Light Mode')
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 46,
            height: 24,
            background: isDark ? theme.primary : theme.border,
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.3s',
            flexShrink: 0,
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute',
              top: 3,
              left: isDark ? 23 : 3,
              width: 18,
              height: 18,
              background: '#FFF',
              transition: 'left 0.3s',
            }
          })
        )
      ),

      ...['Notification Preferences', 'Learning Analytics', 'Privacy & Data', 'Help & Support'].map((label, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '13px 14px',
            background: theme.surface,
            border: `2px solid ${theme.border}`,
            marginBottom: 8,
            cursor: 'pointer',
          }
        },
          React.createElement('span', { style: { fontSize: 13, color: theme.text } }, label),
          React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })
        )
      )
    )
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? THEMES.dark : THEMES.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f0f0f0; }
    ::-webkit-scrollbar { display: none; }
  `;

  const tabs = [
    { id: 'home',    label: 'Home',    icon: window.lucide.Home },
    { id: 'canvas',  label: 'Canvas',  icon: window.lucide.Layers },
    { id: 'market',  label: 'Market',  icon: window.lucide.ShoppingBag },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home:    HomeScreen,
    canvas:  CanvasScreen,
    market:  MarketScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
    }
  },
    React.createElement('style', null, fontStyle),

    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: theme.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif",
      }
    },

      // Status bar
      React.createElement(StatusBar, { theme }),

      // Dynamic island
      React.createElement(DynamicIsland, null),

      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: 4,
        }
      },
        React.createElement(ActiveScreen, { theme, isDark, setIsDark })
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 70,
          background: theme.navBg,
          borderTop: `2px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 6,
          flexShrink: 0,
        }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '6px 14px',
              background: isActive
                ? (isDark ? 'rgba(77,114,255,0.14)' : 'rgba(24,69,255,0.08)')
                : 'transparent',
              transition: 'all 0.18s',
            }
          },
            React.createElement(tab.icon, {
              size: 21,
              color: isActive ? theme.primary : theme.textMuted,
              strokeWidth: isActive ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: 9,
                fontWeight: isActive ? 800 : 400,
                color: isActive ? theme.primary : theme.textMuted,
                fontFamily: isActive ? "'Orbitron', sans-serif" : "'Inter', sans-serif",
                letterSpacing: isActive ? 0.8 : 0,
              }
            }, tab.label)
          );
        })
      )
    )
  );
}
