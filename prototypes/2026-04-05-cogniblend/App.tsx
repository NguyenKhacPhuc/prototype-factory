function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#0A0A0F',
      surface: '#12121A',
      surfaceAlt: '#1A1A26',
      border: '#2A2A3A',
      text: '#F0F0F8',
      textMuted: '#7070A0',
      textDim: '#3A3A5A',
      primary: '#2979FF',
      primaryDim: '#1A3A8A',
      accent: '#FF5252',
      accentDim: '#8A1A1A',
      tag: '#1E2A4A',
    },
    light: {
      bg: '#F5F5F5',
      surface: '#FFFFFF',
      surfaceAlt: '#EAEAF5',
      border: '#DDDDE8',
      text: '#0A0A1A',
      textMuted: '#5050780',
      textDim: '#B0B0C8',
      primary: '#2979FF',
      primaryDim: '#D0E0FF',
      accent: '#FF5252',
      accentDim: '#FFD0D0',
      tag: '#E0E8FF',
    }
  };

  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #2979FF44; border-radius: 2px; }
  `;

  // ── HOME SCREEN ──────────────────────────────────────────────────────────────
  function HomeScreen() {
    const [pressedCard, setPressedCard] = useState(null);

    const recentMixes = [
      { id: 1, title: 'Quantum Entanglement 101', sources: 3, duration: '18 min', progress: 72, color: '#2979FF' },
      { id: 2, title: 'Cold War: Multiple Perspectives', sources: 5, duration: '34 min', progress: 45, color: '#FF5252' },
      { id: 3, title: 'Neural Networks Demystified', sources: 4, duration: '22 min', progress: 91, color: '#00BFA5' },
    ];

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, overflowY: 'auto', fontFamily: 'Orbitron, monospace' }
    },
      // Asymmetric Header
      React.createElement('div', {
        style: { display: 'flex', height: 200, overflow: 'hidden', borderBottom: `1px solid ${t.border}` }
      },
        // Left panel — identity
        React.createElement('div', {
          style: {
            flex: '0 0 58%', background: t.primary, padding: '28px 20px 20px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 9, color: '#FFFFFF88', letterSpacing: 3, marginBottom: 4 } }, 'KNOWLEDGE DJ STUDIO'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 } }, 'COGNI'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 } }, 'BLEND')
          ),
          React.createElement('div', {
            style: { fontSize: 9, color: '#FFFFFF99', letterSpacing: 2 }
          }, 'REMIX · CREATE · UNDERSTAND')
        ),
        // Right panel — stats
        React.createElement('div', {
          style: { flex: 1, background: t.surfaceAlt, padding: '28px 16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }
        },
          React.createElement('div', {
            style: {
              width: 32, height: 32, borderRadius: '50%',
              background: isDark ? '#1A1A26' : '#EAEAF5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: `1px solid ${t.border}`
            },
            onClick: () => setIsDark(!isDark)
          },
            React.createElement('span', { style: { fontSize: 14 } }, isDark ? '☀️' : '🌙')
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: t.accent } }, '12'),
            React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 2 } }, 'ACTIVE MIXES'),
            React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text, marginTop: 8 } }, '47'),
            React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 2 } }, 'SOURCES')
          )
        )
      ),

      // Quick Action
      React.createElement('div', { style: { padding: '16px 20px 8px' } },
        React.createElement('button', {
          style: {
            width: '100%', height: 52, background: t.accent, border: 'none',
            borderRadius: 4, fontFamily: 'Orbitron, monospace', fontSize: 11,
            fontWeight: 700, color: '#FFFFFF', letterSpacing: 3, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
          },
          onClick: () => setActiveScreen('remix')
        },
          React.createElement(window.lucide.Plus, { size: 16, color: '#FFFFFF' }),
          React.createElement('span', null, 'NEW MIX')
        )
      ),

      // Navigation Cards — Hub & Spoke
      React.createElement('div', { style: { padding: '8px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        [
          { id: 'remix', icon: 'Sliders', label: 'REMIX CANVAS', sub: 'Build & Blend', color: t.primary },
          { id: 'stitcher', icon: 'Cpu', label: 'AI STITCHER', sub: 'Smart Connects', color: t.accent },
          { id: 'graph', icon: 'Network', label: 'CONCEPT GRAPH', sub: '3D Mindmap', color: '#00BFA5' },
          { id: 'vault', icon: 'Archive', label: 'REMIX VAULT', sub: 'Your Library', color: '#FFB300' },
        ].map(nav => React.createElement('button', {
          key: nav.id,
          style: {
            background: pressedCard === nav.id ? t.surfaceAlt : t.surface,
            border: `1px solid ${pressedCard === nav.id ? nav.color : t.border}`,
            borderRadius: 6, padding: '14px 12px', cursor: 'pointer',
            textAlign: 'left', transform: pressedCard === nav.id ? 'scale(0.97)' : 'scale(1)',
            transition: 'all 0.12s ease'
          },
          onClick: () => setActiveScreen(nav.id),
          onMouseDown: () => setPressedCard(nav.id),
          onMouseUp: () => setPressedCard(null),
          onTouchStart: () => setPressedCard(nav.id),
          onTouchEnd: () => setPressedCard(null),
        },
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement(window.lucide[nav.icon], { size: 18, color: nav.color })
          ),
          React.createElement('div', { style: { fontSize: 9, fontWeight: 700, color: t.text, letterSpacing: 1.5, marginBottom: 2 } }, nav.label),
          React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 1 } }, nav.sub)
        ))
      ),

      // Recent Mixes
      React.createElement('div', { style: { padding: '12px 20px' } },
        React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 3, marginBottom: 12 } }, 'RECENT MIXES'),
        recentMixes.map(mix => React.createElement('div', {
          key: mix.id,
          style: {
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 6, padding: '14px', marginBottom: 8, cursor: 'pointer'
          },
          onClick: () => setActiveScreen('remix')
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.text, marginBottom: 4 } }, mix.title),
              React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 1 } }, `${mix.sources} SOURCES · ${mix.duration}`)
            ),
            React.createElement('div', { style: { fontSize: 9, color: mix.color, fontWeight: 700 } }, `${mix.progress}%`)
          ),
          React.createElement('div', { style: { height: 2, background: t.border, borderRadius: 1 } },
            React.createElement('div', { style: { height: '100%', width: `${mix.progress}%`, background: mix.color, borderRadius: 1 } })
          )
        ))
      )
    );
  }

  // ── REMIX CANVAS ──────────────────────────────────────────────────────────────
  function RemixScreen() {
    const [activeSource, setActiveSource] = useState(null);
    const [playing, setPlaying] = useState(false);

    const sources = [
      { id: 1, type: 'TEXT', label: 'Lecture Notes — Quantum Ch.3', color: t.primary, duration: '8min read' },
      { id: 2, type: 'AUDIO', label: 'MIT Podcast — Superposition', color: '#00BFA5', duration: '12:30' },
      { id: 3, type: 'VIDEO', label: 'TED-Ed — Wave Functions', color: t.accent, duration: '6:45' },
    ];

    const tracks = [
      { id: 1, label: 'INTRO', start: 0, width: 18, source: 1 },
      { id: 2, label: 'CORE', start: 20, width: 32, source: 2 },
      { id: 3, label: 'VISUAL', start: 22, width: 28, source: 3 },
      { id: 4, label: 'OUTRO', start: 54, width: 20, source: 1 },
    ];

    const sourceColors = { 1: t.primary, 2: '#00BFA5', 3: t.accent };

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: 'Orbitron, monospace', display: 'flex', flexDirection: 'column' }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('button', {
          style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
          onClick: () => setActiveScreen('home')
        }, React.createElement(window.lucide.ChevronLeft, { size: 20, color: t.textMuted })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: 1 } }, 'REMIX CANVAS'),
          React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 2 } }, 'QUANTUM ENTANGLEMENT 101')
        ),
        React.createElement('div', {
          style: {
            background: t.accent, borderRadius: 4, padding: '6px 12px',
            fontSize: 8, color: '#FFF', fontWeight: 700, letterSpacing: 2, cursor: 'pointer'
          }
        }, 'EXPORT')
      ),

      // Asymmetric Split — Sources (left) + Canvas (right)
      React.createElement('div', { style: { display: 'flex', flex: 1, overflow: 'hidden' } },
        // Left: Source Library
        React.createElement('div', {
          style: { width: 130, borderRight: `1px solid ${t.border}`, overflowY: 'auto', padding: '12px 10px' }
        },
          React.createElement('div', { style: { fontSize: 7, color: t.textMuted, letterSpacing: 2, marginBottom: 10 } }, 'SOURCES'),
          sources.map(src => React.createElement('div', {
            key: src.id,
            style: {
              background: activeSource === src.id ? src.color + '22' : t.surface,
              border: `1px solid ${activeSource === src.id ? src.color : t.border}`,
              borderRadius: 4, padding: '10px 8px', marginBottom: 8, cursor: 'pointer',
              transition: 'all 0.15s'
            },
            onClick: () => setActiveSource(activeSource === src.id ? null : src.id)
          },
            React.createElement('div', {
              style: { fontSize: 7, color: src.color, fontWeight: 700, letterSpacing: 1.5, marginBottom: 4 }
            }, src.type),
            React.createElement('div', { style: { fontSize: 8, color: t.text, lineHeight: 1.3, marginBottom: 4 } }, src.label),
            React.createElement('div', { style: { fontSize: 7, color: t.textMuted } }, src.duration)
          )),
          React.createElement('button', {
            style: {
              width: '100%', background: 'none', border: `1px dashed ${t.border}`,
              borderRadius: 4, padding: '10px 8px', cursor: 'pointer',
              fontFamily: 'Orbitron, monospace', fontSize: 7, color: t.textMuted,
              letterSpacing: 1
            }
          }, '+ ADD SOURCE')
        ),

        // Right: Timeline Canvas
        React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px' } },
          React.createElement('div', { style: { fontSize: 7, color: t.textMuted, letterSpacing: 2, marginBottom: 10 } }, 'TIMELINE'),

          // Timeline Rows
          ['AUDIO', 'VISUAL', 'TEXT'].map((layer, li) =>
            React.createElement('div', { key: layer, style: { marginBottom: 8 } },
              React.createElement('div', { style: { fontSize: 6, color: t.textMuted, letterSpacing: 2, marginBottom: 4 } }, layer),
              React.createElement('div', {
                style: { height: 36, background: t.surface, borderRadius: 4, position: 'relative', border: `1px solid ${t.border}` }
              },
                tracks.filter((_, i) => i % 3 === li).map(track =>
                  React.createElement('div', {
                    key: track.id,
                    style: {
                      position: 'absolute', top: 4, height: 28,
                      left: `${track.start}%`, width: `${track.width}%`,
                      background: (sourceColors[track.source] || t.primary) + '33',
                      border: `1px solid ${sourceColors[track.source] || t.primary}`,
                      borderRadius: 3, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: 'grab'
                    }
                  },
                    React.createElement('span', { style: { fontSize: 6, color: sourceColors[track.source] || t.primary, fontWeight: 700, letterSpacing: 1 } }, track.label)
                  )
                )
              )
            )
          ),

          // Playhead + Controls
          React.createElement('div', {
            style: { marginTop: 16, background: t.surface, borderRadius: 6, padding: '12px', border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 } },
              React.createElement('button', {
                style: {
                  width: 36, height: 36, borderRadius: '50%', background: t.primary,
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                },
                onClick: () => setPlaying(!playing)
              }, React.createElement(playing ? window.lucide.Pause : window.lucide.Play, { size: 14, color: '#FFF' })),
              React.createElement('div', { style: { flex: 1, height: 3, background: t.border, borderRadius: 2, position: 'relative' } },
                React.createElement('div', { style: { width: '35%', height: '100%', background: t.primary, borderRadius: 2 } }),
                React.createElement('div', {
                  style: { position: 'absolute', top: -4, left: '35%', width: 10, height: 10, borderRadius: '50%', background: t.primary, marginLeft: -5 }
                })
              ),
              React.createElement('span', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 1 } }, '6:18')
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center' } },
              [
                { icon: 'Scissors', label: 'CUT' },
                { icon: 'Copy', label: 'COPY' },
                { icon: 'Trash2', label: 'DEL' },
                { icon: 'Wand2', label: 'AI FIX' },
              ].map(tool => React.createElement('button', {
                key: tool.label,
                style: {
                  background: tool.label === 'AI FIX' ? t.primary + '22' : t.surfaceAlt,
                  border: `1px solid ${tool.label === 'AI FIX' ? t.primary : t.border}`,
                  borderRadius: 4, padding: '6px 10px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3
                }
              },
                React.createElement(window.lucide[tool.icon], { size: 12, color: tool.label === 'AI FIX' ? t.primary : t.textMuted }),
                React.createElement('span', { style: { fontSize: 6, color: tool.label === 'AI FIX' ? t.primary : t.textMuted, letterSpacing: 1 } }, tool.label)
              ))
            )
          )
        )
      )
    );
  }

  // ── AI STITCHER ──────────────────────────────────────────────────────────────
  function StitcherScreen() {
    const [activeTab, setActiveTab] = useState('suggestions');
    const [expanded, setExpanded] = useState(null);

    const suggestions = [
      {
        id: 1, type: 'BRIDGE', confidence: 94,
        title: 'Conceptual Bridge Detected',
        body: 'Your podcast clip on superposition directly parallels the wave function formulas in your notes. Suggest inserting a visual diagram here to unify both framings.',
        tags: ['QUANTUM', 'VISUAL', 'BRIDGE'],
        action: 'INSERT VISUAL'
      },
      {
        id: 2, type: 'REFRAME', confidence: 87,
        title: 'Alternative Framing Available',
        body: 'The TED-Ed video explains quantum tunneling using a "wall analogy." Your notes use probability density. Consider presenting both to reinforce understanding.',
        tags: ['ANALOGY', 'DUAL-VIEW'],
        action: 'ADD ANALOGY'
      },
      {
        id: 3, type: 'GAP', confidence: 78,
        title: 'Knowledge Gap Identified',
        body: 'Your current mix references Schrödinger\'s equation but provides no derivation context. Adding a 2-min explainer here could prevent comprehension blocks.',
        tags: ['PREREQUISITE', 'MATH'],
        action: 'FILL GAP'
      },
    ];

    const patterns = [
      { label: 'Visual Learner', value: 78, color: t.primary },
      { label: 'Auditory Blend', value: 55, color: '#00BFA5' },
      { label: 'Conceptual First', value: 91, color: t.accent },
    ];

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: 'Orbitron, monospace', display: 'flex', flexDirection: 'column' }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 0', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
          React.createElement('button', {
            style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
            onClick: () => setActiveScreen('home')
          }, React.createElement(window.lucide.ChevronLeft, { size: 20, color: t.textMuted })),
          React.createElement('div', {
            style: { width: 28, height: 28, borderRadius: '50%', background: t.accent + '22', border: `1px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(window.lucide.Cpu, { size: 14, color: t.accent })),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: 1 } }, 'AI STITCHER'),
            React.createElement('div', { style: { fontSize: 7, color: t.accent, letterSpacing: 2 } }, '● ACTIVE — ANALYZING')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 0 } },
          ['suggestions', 'profile'].map(tab => React.createElement('button', {
            key: tab,
            style: {
              flex: 1, background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab ? t.primary : 'transparent'}`,
              padding: '8px 0', fontFamily: 'Orbitron, monospace', fontSize: 8,
              color: activeTab === tab ? t.primary : t.textMuted, letterSpacing: 2, cursor: 'pointer'
            },
            onClick: () => setActiveTab(tab)
          }, tab === 'suggestions' ? 'SUGGESTIONS' : 'LEARNING PROFILE'))
        )
      ),

      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 20px' } },
        activeTab === 'suggestions'
          ? React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, marginBottom: 14 } }, `${suggestions.length} ACTIVE SUGGESTIONS`),
              suggestions.map(s => React.createElement('div', {
                key: s.id,
                style: {
                  background: t.surface, border: `1px solid ${expanded === s.id ? t.primary : t.border}`,
                  borderRadius: 6, marginBottom: 10, overflow: 'hidden', cursor: 'pointer'
                },
                onClick: () => setExpanded(expanded === s.id ? null : s.id)
              },
                React.createElement('div', { style: { padding: '12px 14px' } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
                    React.createElement('div', {
                      style: { fontSize: 7, color: s.type === 'BRIDGE' ? t.primary : s.type === 'REFRAME' ? '#00BFA5' : t.accent, fontWeight: 700, letterSpacing: 2 }
                    }, `◆ ${s.type}`),
                    React.createElement('div', { style: { fontSize: 8, color: t.textMuted } }, `${s.confidence}% MATCH`)
                  ),
                  React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.text, marginBottom: expanded === s.id ? 8 : 0 } }, s.title),
                  expanded === s.id && React.createElement('div', null,
                    React.createElement('div', { style: { fontSize: 9, color: t.textMuted, lineHeight: 1.6, marginBottom: 10 } }, s.body),
                    React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 } },
                      s.tags.map(tag => React.createElement('span', {
                        key: tag,
                        style: { background: t.tag, border: `1px solid ${t.border}`, borderRadius: 3, padding: '3px 7px', fontSize: 7, color: t.textMuted, letterSpacing: 1 }
                      }, tag))
                    ),
                    React.createElement('button', {
                      style: {
                        background: t.primary, border: 'none', borderRadius: 4, padding: '8px 16px',
                        fontFamily: 'Orbitron, monospace', fontSize: 8, color: '#FFF', fontWeight: 700,
                        letterSpacing: 2, cursor: 'pointer'
                      }
                    }, s.action)
                  )
                )
              ))
            )
          : React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, marginBottom: 14 } }, 'YOUR LEARNING PROFILE'),
              React.createElement('div', {
                style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, padding: '16px', marginBottom: 14 }
              },
                React.createElement('div', { style: { fontSize: 9, color: t.text, fontWeight: 600, marginBottom: 14, letterSpacing: 1 } }, 'MODALITY BREAKDOWN'),
                patterns.map(p => React.createElement('div', { key: p.label, style: { marginBottom: 12 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                    React.createElement('span', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 1 } }, p.label),
                    React.createElement('span', { style: { fontSize: 8, color: p.color, fontWeight: 700 } }, `${p.value}%`)
                  ),
                  React.createElement('div', { style: { height: 4, background: t.border, borderRadius: 2 } },
                    React.createElement('div', { style: { width: `${p.value}%`, height: '100%', background: p.color, borderRadius: 2 } })
                  )
                ))
              ),
              [
                { label: 'MIXES CREATED', value: '12' },
                { label: 'AVG RETENTION SCORE', value: '84%' },
                { label: 'FAVORITE MODALITY', value: 'VISUAL+TEXT' },
                { label: 'TOPICS COVERED', value: '7' },
              ].map(stat => React.createElement('div', {
                key: stat.label,
                style: {
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: `1px solid ${t.border}`
                }
              },
                React.createElement('span', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 2 } }, stat.label),
                React.createElement('span', { style: { fontSize: 11, color: t.text, fontWeight: 700 } }, stat.value)
              ))
            )
      )
    );
  }

  // ── CONCEPT GRAPH ──────────────────────────────────────────────────────────────
  function GraphScreen() {
    const [selected, setSelected] = useState('quantum');

    const nodes = [
      { id: 'quantum', label: 'QUANTUM\nMECHANICS', x: 160, y: 160, size: 44, color: t.primary, primary: true },
      { id: 'wave', label: 'WAVE\nFUNCTION', x: 80, y: 90, size: 32, color: '#00BFA5' },
      { id: 'super', label: 'SUPER-\nPOSITION', x: 250, y: 100, size: 32, color: '#00BFA5' },
      { id: 'tunnel', label: 'QUANTUM\nTUNNEL', x: 260, y: 230, size: 28, color: t.accent },
      { id: 'entangle', label: 'ENTANGLE-\nMENT', x: 80, y: 240, size: 30, color: t.accent },
      { id: 'observer', label: 'OBSERVER\nEFFECT', x: 168, y: 290, size: 24, color: '#FFB300' },
      { id: 'schrodinger', label: 'SCHRÖDINGER\nEQ.', x: 60, y: 170, size: 22, color: '#FFB300' },
    ];

    const edges = [
      ['quantum', 'wave'], ['quantum', 'super'], ['quantum', 'tunnel'],
      ['quantum', 'entangle'], ['quantum', 'observer'], ['quantum', 'schrodinger'],
      ['wave', 'super'], ['entangle', 'observer']
    ];

    const selectedNode = nodes.find(n => n.id === selected);

    const details = {
      quantum: { sources: 3, coverage: 92, desc: 'Core framework. Well covered across all sources.' },
      wave: { sources: 2, coverage: 78, desc: 'Strong in notes + video. Podcast lacks depth.' },
      super: { sources: 2, coverage: 71, desc: 'Podcast covers this best. Needs visual supplement.' },
      tunnel: { sources: 1, coverage: 44, desc: 'Only mentioned in video. Major gap — add a source.' },
      entangle: { sources: 2, coverage: 65, desc: 'Good conceptual coverage. Weak on math.' },
      observer: { sources: 1, coverage: 38, desc: 'Undercovered. AI suggests adding a source.' },
      schrodinger: { sources: 1, coverage: 55, desc: 'Notes reference but don\'t explain derivation.' },
    };

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: 'Orbitron, monospace', display: 'flex', flexDirection: 'column' }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('button', {
          style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
          onClick: () => setActiveScreen('home')
        }, React.createElement(window.lucide.ChevronLeft, { size: 20, color: t.textMuted })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: 1 } }, 'CONCEPT GRAPH'),
          React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 2 } }, 'QUANTUM ENTANGLEMENT 101')
        )
      ),

      // Graph SVG
      React.createElement('div', { style: { position: 'relative', height: 340, background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('svg', { width: '100%', height: '100%', viewBox: '0 0 335 330' },
          // Edges
          edges.map(([from, to], i) => {
            const a = nodes.find(n => n.id === from);
            const b = nodes.find(n => n.id === to);
            return React.createElement('line', {
              key: i, x1: a.x, y1: a.y, x2: b.x, y2: b.y,
              stroke: t.border, strokeWidth: 1, opacity: 0.7
            });
          }),
          // Nodes
          nodes.map(node => React.createElement('g', {
            key: node.id,
            style: { cursor: 'pointer' },
            onClick: () => setSelected(node.id)
          },
            React.createElement('circle', {
              cx: node.x, cy: node.y, r: node.size / 2,
              fill: node.id === selected ? node.color : node.color + '22',
              stroke: node.color, strokeWidth: node.id === selected ? 2 : 1,
              opacity: node.id === selected ? 1 : 0.8
            }),
            node.label.split('\n').map((line, li) =>
              React.createElement('text', {
                key: li, x: node.x, y: node.y - 4 + li * 9,
                textAnchor: 'middle', fontSize: 5.5, fontWeight: 700,
                fill: node.id === selected ? '#FFF' : node.color,
                fontFamily: 'Orbitron, monospace'
              }, line)
            )
          ))
        )
      ),

      // Node Detail Panel
      selectedNode && React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 20px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 } },
          React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: selectedNode.color } }),
          React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, letterSpacing: 1 } }, selectedNode.label.replace('\n', ' '))
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 } },
          [
            { label: 'SOURCES', value: details[selected]?.sources || 0 },
            { label: 'COVERAGE', value: `${details[selected]?.coverage || 0}%` },
          ].map(stat => React.createElement('div', {
            key: stat.label,
            style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, padding: '12px' }
          },
            React.createElement('div', { style: { fontSize: 18, fontWeight: 900, color: selectedNode.color, marginBottom: 4 } }, stat.value),
            React.createElement('div', { style: { fontSize: 7, color: t.textMuted, letterSpacing: 2 } }, stat.label)
          ))
        ),
        React.createElement('div', {
          style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, padding: '14px' }
        },
          React.createElement('div', { style: { fontSize: 9, color: t.textMuted, lineHeight: 1.6 } }, details[selected]?.desc),
          (details[selected]?.coverage || 0) < 60 && React.createElement('button', {
            style: {
              marginTop: 10, background: t.accent + '22', border: `1px solid ${t.accent}`,
              borderRadius: 4, padding: '8px 14px', fontFamily: 'Orbitron, monospace',
              fontSize: 8, color: t.accent, fontWeight: 700, letterSpacing: 2, cursor: 'pointer'
            }
          }, '+ FILL THIS GAP')
        )
      )
    );
  }

  // ── VAULT ──────────────────────────────────────────────────────────────────
  function VaultScreen() {
    const [filter, setFilter] = useState('ALL');

    const mixes = [
      { id: 1, title: 'Neural Networks Demystified', subject: 'COMPUTER SCIENCE', sources: 4, duration: '22 min', score: 91, tags: ['AI', 'MATH'], color: '#00BFA5', date: '2 days ago' },
      { id: 2, title: 'Quantum Entanglement 101', subject: 'PHYSICS', sources: 3, duration: '18 min', score: 72, tags: ['QUANTUM', 'THEORY'], color: t.primary, date: '5 days ago' },
      { id: 3, title: 'Cold War: Multiple Perspectives', subject: 'HISTORY', sources: 5, duration: '34 min', score: 45, tags: ['POLITICS', 'ERA'], color: t.accent, date: '1 week ago' },
      { id: 4, title: 'Macroeconomics: Supply & Demand', subject: 'ECONOMICS', sources: 3, duration: '15 min', score: 88, tags: ['ECON', 'GRAPHS'], color: '#FFB300', date: '2 weeks ago' },
      { id: 5, title: 'DNA Replication Explained', subject: 'BIOLOGY', sources: 4, duration: '20 min', score: 95, tags: ['BIOLOGY', 'CELL'], color: '#AB47BC', date: '3 weeks ago' },
    ];

    const filters = ['ALL', 'PHYSICS', 'CS', 'HISTORY', 'BIOLOGY'];

    return React.createElement('div', {
      style: { height: '100%', background: t.bg, fontFamily: 'Orbitron, monospace', display: 'flex', flexDirection: 'column' }
    },
      // Asymmetric header
      React.createElement('div', { style: { display: 'flex', height: 110, overflow: 'hidden', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('button', {
              style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
              onClick: () => setActiveScreen('home')
            }, React.createElement(window.lucide.ChevronLeft, { size: 20, color: t.textMuted })),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: 1 } }, 'REMIX VAULT'),
              React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 2 } }, 'YOUR LEARNING LIBRARY')
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 14 } },
            [{ v: '5', l: 'MIXES' }, { v: '19', l: 'SOURCES' }, { v: '84%', l: 'AVG SCORE' }].map(s =>
              React.createElement('div', { key: s.l },
                React.createElement('div', { style: { fontSize: 16, fontWeight: 900, color: t.primary } }, s.v),
                React.createElement('div', { style: { fontSize: 7, color: t.textMuted, letterSpacing: 1 } }, s.l)
              )
            )
          )
        ),
        React.createElement('div', {
          style: { width: 90, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement(window.lucide.Archive, { size: 24, color: '#FFF' }),
            React.createElement('div', { style: { fontSize: 7, color: '#FFFFFF99', letterSpacing: 2, marginTop: 4 } }, 'VAULT')
          )
        )
      ),

      // Filter Tabs
      React.createElement('div', {
        style: { display: 'flex', overflowX: 'auto', padding: '12px 20px 0', gap: 8, borderBottom: `1px solid ${t.border}` }
      },
        filters.map(f => React.createElement('button', {
          key: f,
          style: {
            background: filter === f ? t.primary : 'none',
            border: `1px solid ${filter === f ? t.primary : t.border}`,
            borderRadius: 3, padding: '5px 12px', fontFamily: 'Orbitron, monospace',
            fontSize: 7, color: filter === f ? '#FFF' : t.textMuted, letterSpacing: 1.5,
            cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: 12
          },
          onClick: () => setFilter(f)
        }, f))
      ),

      // Mix List
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 20px' } },
        mixes.map(mix => React.createElement('div', {
          key: mix.id,
          style: {
            display: 'flex', gap: 12, marginBottom: 12, cursor: 'pointer',
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 6, padding: '14px', alignItems: 'flex-start'
          },
          onClick: () => setActiveScreen('remix')
        },
          // Color indicator
          React.createElement('div', {
            style: { width: 3, borderRadius: 2, background: mix.color, alignSelf: 'stretch', minHeight: 60, flexShrink: 0 }
          }),
          // Content
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 7, color: mix.color, letterSpacing: 2, marginBottom: 4, fontWeight: 700 } }, mix.subject),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.text, marginBottom: 6 } }, mix.title),
            React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 8 } },
              [
                `${mix.sources} SOURCES`,
                mix.duration,
                mix.date
              ].map((item, i) => React.createElement('span', {
                key: i, style: { fontSize: 7, color: t.textMuted, letterSpacing: 1 }
              }, item))
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              mix.tags.map(tag => React.createElement('span', {
                key: tag,
                style: { background: t.tag, border: `1px solid ${t.border}`, borderRadius: 3, padding: '3px 7px', fontSize: 7, color: t.textMuted, letterSpacing: 1 }
              }, tag))
            )
          ),
          // Score
          React.createElement('div', { style: { textAlign: 'center', flexShrink: 0 } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: 900, color: mix.score > 80 ? '#00BFA5' : mix.score > 60 ? '#FFB300' : t.accent } }, `${mix.score}`),
            React.createElement('div', { style: { fontSize: 6, color: t.textMuted, letterSpacing: 1 } }, 'SCORE')
          )
        ))
      )
    );
  }

  const screens = {
    home: HomeScreen,
    remix: RemixScreen,
    stitcher: StitcherScreen,
    graph: GraphScreen,
    vault: VaultScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.25), 0 0 0 8px #1A1A1A',
        background: t.bg
      }
    },
      React.createElement(ActiveScreen)
    )
  );
}
