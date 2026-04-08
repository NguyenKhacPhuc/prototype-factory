const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const themes = {
    light: {
      primary: '#18181B',
      secondary: '#3F3F46',
      cta: '#EC4899',
      bg: '#FAFAFA',
      card: '#FFFFFF',
      cardBorder: '#E4E4E7',
      muted: '#71717A',
      caption: '#A1A1AA',
      surfaceAlt: '#F4F4F5',
      ctaLight: 'rgba(236,72,153,0.08)',
      ctaMedium: 'rgba(236,72,153,0.15)',
    },
    dark: {
      primary: '#FAFAFA',
      secondary: '#D4D4D8',
      cta: '#EC4899',
      bg: '#09090B',
      card: '#18181B',
      cardBorder: '#27272A',
      muted: '#A1A1AA',
      caption: '#71717A',
      surfaceAlt: '#1C1C1F',
      ctaLight: 'rgba(236,72,153,0.12)',
      ctaMedium: 'rgba(236,72,153,0.2)',
    },
  };

  const t = darkMode ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes weaveRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.04); }
    }
    * { -webkit-tap-highlight-color: transparent; }
  `;

  // ─── HOME SCREEN ───
  function HomeScreen() {
    const [expandedWeave, setExpandedWeave] = useState(null);

    const featuredWeaves = [
      { id: 1, title: 'Cyberpunk Haiku City', contributors: 47, echoes: 312, color: '#7C3AED', desc: 'Neon-lit verses pulse through digital streets', activity: 'Active now' },
      { id: 2, title: 'Whispering Biome', contributors: 23, echoes: 189, color: '#0EA5E9', desc: 'An evolving ecosystem of sound and light', activity: '3m ago' },
      { id: 3, title: 'Dreamcore Archive', contributors: 61, echoes: 548, color: '#F59E0B', desc: 'Liminal spaces rendered in collective memory', activity: '12m ago' },
    ];

    const recentEchoes = [
      { user: 'aria.m', text: 'A chrome butterfly lands on a rusted antenna...', weave: 'Cyberpunk Haiku City', time: '2m ago' },
      { user: 'sol.k', text: 'The moss hums a frequency only roots understand', weave: 'Whispering Biome', time: '8m ago' },
      { user: 'nyx.r', text: 'Hallways that remember footsteps never taken', weave: 'Dreamcore Archive', time: '15m ago' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease-out' } },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.primary, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Echo Weave'),
          React.createElement('p', { style: { fontSize: 13, color: t.muted, margin: '2px 0 0', fontFamily: font } }, 'Weave dreams. Discover realities.')
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, border: 'none', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(darkMode ? window.lucide.Sun : window.lucide.Moon, { size: 20, color: t.muted }))
      ),

      // Active Weaves
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.primary, margin: 0, fontFamily: font, letterSpacing: -0.3 } }, 'Active Weaves'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'none', border: 'none', fontSize: 15, color: t.cta, fontWeight: 600, cursor: 'pointer', fontFamily: font, padding: '4px 0' }
          }, 'See All')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, marginRight: -20 } },
          ...featuredWeaves.map((w, i) =>
            React.createElement('div', {
              key: w.id,
              onClick: () => setExpandedWeave(expandedWeave === w.id ? null : w.id),
              style: {
                minWidth: 220, borderRadius: 20, padding: '20px 18px', cursor: 'pointer',
                background: `linear-gradient(135deg, ${w.color}18, ${w.color}08)`,
                border: `1px solid ${w.color}25`,
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                transform: expandedWeave === w.id ? 'scale(0.97)' : 'scale(1)',
                animation: `slideUp 0.5s ease-out ${i * 0.1}s both`,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
                React.createElement('div', { style: { width: 10, height: 10, borderRadius: 5, background: w.color, animation: w.activity === 'Active now' ? 'breathe 2s ease-in-out infinite' : 'none' } }),
                React.createElement('span', { style: { fontSize: 13, color: t.muted, fontFamily: font } }, w.activity)
              ),
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.primary, margin: '0 0 6px', fontFamily: font } }, w.title),
              React.createElement('p', { style: { fontSize: 13, color: t.muted, margin: '0 0 14px', fontFamily: font, lineHeight: 1.4 } }, w.desc),
              React.createElement('div', { style: { display: 'flex', gap: 16 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Users, { size: 14, color: t.muted }),
                  React.createElement('span', { style: { fontSize: 13, color: t.muted, fontFamily: font } }, w.contributors)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Sparkles, { size: 14, color: w.color }),
                  React.createElement('span', { style: { fontSize: 13, color: t.muted, fontFamily: font } }, w.echoes)
                )
              )
            )
          )
        )
      ),

      // Recent Echoes
      React.createElement('div', { style: { padding: '28px 20px 0' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.primary, margin: '0 0 14px', fontFamily: font, letterSpacing: -0.3 } }, 'Recent Echoes'),
        ...recentEchoes.map((e, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: '16px 18px', marginBottom: 10,
              border: `1px solid ${t.cardBorder}`, animation: `fadeIn 0.4s ease-out ${0.2 + i * 0.1}s both`,
              cursor: 'pointer', transition: 'background 150ms ease',
            },
            onMouseEnter: (ev) => ev.currentTarget.style.background = t.surfaceAlt,
            onMouseLeave: (ev) => ev.currentTarget.style.background = t.card,
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.primary, fontFamily: font } }, e.user),
              React.createElement('span', { style: { fontSize: 13, color: t.caption, fontFamily: font } }, e.time)
            ),
            React.createElement('p', { style: { fontSize: 15, color: t.secondary, margin: '0 0 8px', fontFamily: font, lineHeight: 1.5, fontStyle: 'italic' } }, `"${e.text}"`),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(window.lucide.Layers, { size: 13, color: t.cta }),
              React.createElement('span', { style: { fontSize: 13, color: t.cta, fontWeight: 500, fontFamily: font } }, e.weave)
            )
          )
        )
      ),

      // Quick Add CTA
      React.createElement('div', { style: { padding: '20px 20px 100px' } },
        React.createElement('button', {
          onClick: () => setActiveScreen('create'),
          style: {
            width: '100%', padding: '18px', borderRadius: 16, border: 'none',
            background: t.cta, color: '#FFFFFF', fontSize: 17, fontWeight: 700,
            fontFamily: font, cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10, transition: 'transform 150ms ease, opacity 150ms ease',
          },
          onMouseDown: (ev) => ev.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (ev) => ev.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(window.lucide.Plus, { size: 20, color: '#FFFFFF' }),
          'Add an Echo'
        )
      )
    );
  }

  // ─── EXPLORE SCREEN ───
  function ExploreScreen() {
    const [filter, setFilter] = useState('all');
    const filters = ['all', 'visual', 'narrative', 'sound', 'world'];

    const weaves = [
      { id: 1, title: 'Cyberpunk Haiku City', type: 'narrative', contributors: 47, echoes: 312, color: '#7C3AED', desc: 'Neon-lit verses pulse through digital streets. A collective poem-city grows with each contribution.' },
      { id: 2, title: 'Whispering Biome', type: 'sound', contributors: 23, echoes: 189, color: '#0EA5E9', desc: 'An evolving ecosystem of sound and light where nature meets technology.' },
      { id: 3, title: 'Dreamcore Archive', type: 'visual', contributors: 61, echoes: 548, color: '#F59E0B', desc: 'Liminal spaces rendered in collective memory. Hallways, pools, empty malls.' },
      { id: 4, title: 'Solarpunk Gardens', type: 'world', contributors: 35, echoes: 267, color: '#10B981', desc: 'Build a utopian future one rooftop garden at a time.' },
      { id: 5, title: 'Ghost Frequencies', type: 'sound', contributors: 18, echoes: 94, color: '#EF4444', desc: 'Lost radio transmissions from parallel timelines.' },
      { id: 6, title: 'Neon Mythology', type: 'narrative', contributors: 52, echoes: 410, color: '#8B5CF6', desc: 'Ancient gods reimagined in a cyberpunk metropolis.' },
    ];

    const filtered = filter === 'all' ? weaves : weaves.filter(w => w.type === filter);

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.primary, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Explore'),
        React.createElement('p', { style: { fontSize: 15, color: t.muted, margin: '4px 0 0', fontFamily: font } }, 'Discover weaves to join')
      ),

      // Search bar
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, borderRadius: 14, padding: '12px 16px' } },
          React.createElement(window.lucide.Search, { size: 18, color: t.muted }),
          React.createElement('span', { style: { fontSize: 15, color: t.caption, fontFamily: font } }, 'Search weaves, themes, creators...')
        )
      ),

      // Filters
      React.createElement('div', { style: { padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto' } },
        ...filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilter(f),
            style: {
              padding: '8px 18px', borderRadius: 20, border: 'none', fontSize: 14, fontWeight: 600,
              fontFamily: font, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 200ms ease',
              background: filter === f ? t.cta : t.surfaceAlt,
              color: filter === f ? '#FFFFFF' : t.muted,
            }
          }, f.charAt(0).toUpperCase() + f.slice(1))
        )
      ),

      // Weave Grid
      React.createElement('div', { style: { padding: '0 20px 100px', display: 'flex', flexDirection: 'column', gap: 12 } },
        ...filtered.map((w, i) =>
          React.createElement('div', {
            key: w.id,
            style: {
              background: t.card, borderRadius: 20, overflow: 'hidden',
              border: `1px solid ${t.cardBorder}`, animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
              cursor: 'pointer', transition: 'transform 200ms ease, box-shadow 200ms ease',
            },
            onMouseEnter: (ev) => { ev.currentTarget.style.transform = 'translateY(-2px)'; ev.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; },
            onMouseLeave: (ev) => { ev.currentTarget.style.transform = 'translateY(0)'; ev.currentTarget.style.boxShadow = 'none'; },
          },
            // Color header bar
            React.createElement('div', { style: { height: 4, background: `linear-gradient(90deg, ${w.color}, ${w.color}66)` } }),
            React.createElement('div', { style: { padding: '16px 18px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('div', null,
                  React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.primary, margin: 0, fontFamily: font } }, w.title),
                  React.createElement('span', { style: { fontSize: 13, color: w.color, fontWeight: 600, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5 } }, w.type)
                ),
                React.createElement('button', {
                  style: { padding: '8px 16px', borderRadius: 20, border: 'none', background: t.ctaLight, color: t.cta, fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer', transition: 'background 150ms' },
                  onMouseEnter: (ev) => ev.currentTarget.style.background = t.ctaMedium,
                  onMouseLeave: (ev) => ev.currentTarget.style.background = t.ctaLight,
                }, 'Join')
              ),
              React.createElement('p', { style: { fontSize: 15, color: t.muted, margin: '0 0 12px', fontFamily: font, lineHeight: 1.45 } }, w.desc),
              React.createElement('div', { style: { display: 'flex', gap: 20 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                  React.createElement(window.lucide.Users, { size: 14, color: t.caption }),
                  React.createElement('span', { style: { fontSize: 13, color: t.caption, fontFamily: font } }, `${w.contributors} weavers`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                  React.createElement(window.lucide.Sparkles, { size: 14, color: t.caption }),
                  React.createElement('span', { style: { fontSize: 13, color: t.caption, fontFamily: font } }, `${w.echoes} echoes`)
                )
              )
            )
          )
        )
      )
    );
  }

  // ─── CREATE / ADD ECHO SCREEN ───
  function CreateScreen() {
    const [echoType, setEchoType] = useState('text');
    const [selectedWeave, setSelectedWeave] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const echoTypes = [
      { id: 'text', label: 'Text', icon: window.lucide.Type },
      { id: 'image', label: 'Image', icon: window.lucide.Image },
      { id: 'sound', label: 'Sound', icon: window.lucide.Music },
      { id: 'mood', label: 'Mood', icon: window.lucide.Heart },
    ];

    const myWeaves = [
      { id: 1, title: 'Cyberpunk Haiku City', color: '#7C3AED' },
      { id: 2, title: 'Whispering Biome', color: '#0EA5E9' },
      { id: 3, title: 'Dreamcore Archive', color: '#F59E0B' },
    ];

    const prompts = {
      text: 'Describe a scene, character, or moment...',
      image: 'Describe an image concept or visual idea...',
      sound: 'Describe a sound, rhythm, or ambience...',
      mood: 'Describe an emotion, feeling, or atmosphere...',
    };

    if (submitted) {
      return React.createElement('div', {
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40, animation: 'fadeIn 0.5s ease-out', textAlign: 'center' }
      },
        React.createElement('div', {
          style: { width: 80, height: 80, borderRadius: 40, background: t.ctaLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, animation: 'breathe 2s ease-in-out infinite' }
        }, React.createElement(window.lucide.Sparkles, { size: 36, color: t.cta })),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.primary, margin: '0 0 8px', fontFamily: font } }, 'Echo Sent!'),
        React.createElement('p', { style: { fontSize: 15, color: t.muted, margin: '0 0 32px', fontFamily: font, lineHeight: 1.5 } }, 'The Weaver is processing your contribution. Watch the Weave evolve with your ideas woven in.'),
        React.createElement('button', {
          onClick: () => setSubmitted(false),
          style: { padding: '14px 32px', borderRadius: 14, border: 'none', background: t.cta, color: '#FFFFFF', fontSize: 17, fontWeight: 700, fontFamily: font, cursor: 'pointer' }
        }, 'Add Another Echo')
      );
    }

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.primary, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Create'),
        React.createElement('p', { style: { fontSize: 15, color: t.muted, margin: '4px 0 0', fontFamily: font } }, 'Add your Echo to a Weave')
      ),

      // Select Weave
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: t.muted, margin: '0 0 10px', fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Select Weave'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          ...myWeaves.map(w =>
            React.createElement('button', {
              key: w.id,
              onClick: () => setSelectedWeave(w.id),
              style: {
                flex: 1, padding: '14px 10px', borderRadius: 14, border: `2px solid ${selectedWeave === w.id ? w.color : t.cardBorder}`,
                background: selectedWeave === w.id ? `${w.color}12` : t.card, cursor: 'pointer', transition: 'all 200ms ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }
            },
              React.createElement('div', { style: { width: 12, height: 12, borderRadius: 6, background: w.color } }),
              React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.primary, fontFamily: font, textAlign: 'center', lineHeight: 1.3 } }, w.title)
            )
          )
        )
      ),

      // Echo Type
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: t.muted, margin: '0 0 10px', fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Echo Type'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          ...echoTypes.map(et =>
            React.createElement('button', {
              key: et.id,
              onClick: () => setEchoType(et.id),
              style: {
                flex: 1, padding: '14px 8px', borderRadius: 14, border: `2px solid ${echoType === et.id ? t.cta : t.cardBorder}`,
                background: echoType === et.id ? t.ctaLight : t.card, cursor: 'pointer', transition: 'all 200ms ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }
            },
              React.createElement(et.icon, { size: 22, color: echoType === et.id ? t.cta : t.muted }),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: echoType === et.id ? t.cta : t.muted, fontFamily: font } }, et.label)
            )
          )
        )
      ),

      // Text input area
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('div', {
          style: {
            background: t.surfaceAlt, borderRadius: 16, padding: '16px 18px', minHeight: 140,
            border: `1px solid ${t.cardBorder}`,
          }
        },
          React.createElement('p', { style: { fontSize: 15, color: t.caption, margin: 0, fontFamily: font, lineHeight: 1.6 } }, prompts[echoType])
        )
      ),

      // Submit
      React.createElement('div', { style: { padding: '24px 20px 100px' } },
        React.createElement('button', {
          onClick: () => selectedWeave && setSubmitted(true),
          style: {
            width: '100%', padding: '18px', borderRadius: 16, border: 'none',
            background: selectedWeave ? t.cta : t.cardBorder, color: selectedWeave ? '#FFFFFF' : t.caption,
            fontSize: 17, fontWeight: 700, fontFamily: font, cursor: selectedWeave ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'all 200ms ease',
          },
          onMouseDown: (ev) => selectedWeave && (ev.currentTarget.style.transform = 'scale(0.97)'),
          onMouseUp: (ev) => selectedWeave && (ev.currentTarget.style.transform = 'scale(1)'),
        },
          React.createElement(window.lucide.Send, { size: 18, color: selectedWeave ? '#FFFFFF' : t.caption }),
          'Send Echo'
        )
      )
    );
  }

  // ─── INSIGHTS / WEAVER SCREEN ───
  function InsightsScreen() {
    const [activeTab, setActiveTab] = useState('feed');

    const feedItems = [
      {
        weave: 'Cyberpunk Haiku City', time: '14 min ago', color: '#7C3AED',
        title: 'New district emerged',
        desc: 'The Weaver combined 8 echoes about rain and neon signs to generate "The Drizzle Quarter"—a new district where every haiku drips with electric moisture.',
        impact: 'Major shift',
      },
      {
        weave: 'Whispering Biome', time: '1h ago', color: '#0EA5E9',
        title: 'Harmonic convergence',
        desc: 'Three sound-concept echoes aligned on low-frequency hums. The biome now features a "Resonance Cavern" where bioluminescent fungi pulse to a shared rhythm.',
        impact: 'Evolution',
      },
      {
        weave: 'Dreamcore Archive', time: '3h ago', color: '#F59E0B',
        title: 'Spatial paradox resolved',
        desc: 'Conflicting echoes about infinite staircases and flat plains were synthesized into "The Plateau of Steps"—stairs that go up but the horizon never changes.',
        impact: 'Fork candidate',
      },
    ];

    const weaverLog = [
      { time: '12:34', action: 'Processed echo from aria.m', detail: 'Interpreted "chrome butterfly" as mechanical fauna → added to creature index', icon: window.lucide.Cpu },
      { time: '12:31', action: 'Synthesis cycle complete', detail: 'Merged 4 echoes into narrative thread: "The Antenna Garden"', icon: window.lucide.Zap },
      { time: '12:28', action: 'Conflict detected', detail: 'Two echoes suggest opposing weather. Resolved via probability weighting.', icon: window.lucide.AlertTriangle },
      { time: '12:20', action: 'Theme drift analysis', detail: 'Cyberpunk Haiku City shifting toward bio-organic themes (+12% in 24h)', icon: window.lucide.TrendingUp },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.primary, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Insights'),
        React.createElement('p', { style: { fontSize: 15, color: t.muted, margin: '4px 0 0', fontFamily: font } }, 'Watch the Weaver at work')
      ),

      // Tab switcher
      React.createElement('div', { style: { padding: '16px 20px', display: 'flex', gap: 4, background: t.surfaceAlt, borderRadius: 14, margin: '16px 20px 0' } },
        ...[['feed', 'Discovery Feed'], ['log', 'Weaver Log']].map(([id, label]) =>
          React.createElement('button', {
            key: id,
            onClick: () => setActiveTab(id),
            style: {
              flex: 1, padding: '10px', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600,
              fontFamily: font, cursor: 'pointer', transition: 'all 200ms ease',
              background: activeTab === id ? t.card : 'transparent',
              color: activeTab === id ? t.primary : t.muted,
              boxShadow: activeTab === id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            }
          }, label)
        )
      ),

      // Content
      activeTab === 'feed' ?
        React.createElement('div', { style: { padding: '16px 20px 100px' } },
          ...feedItems.map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card, borderRadius: 20, padding: '18px', marginBottom: 12,
                border: `1px solid ${t.cardBorder}`, animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
                cursor: 'pointer', transition: 'transform 200ms ease',
              },
              onMouseEnter: (ev) => ev.currentTarget.style.transform = 'translateY(-1px)',
              onMouseLeave: (ev) => ev.currentTarget.style.transform = 'translateY(0)',
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: item.color } }),
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: item.color, fontFamily: font } }, item.weave)
                ),
                React.createElement('span', { style: { fontSize: 13, color: t.caption, fontFamily: font } }, item.time)
              ),
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.primary, margin: '0 0 6px', fontFamily: font } }, item.title),
              React.createElement('p', { style: { fontSize: 15, color: t.muted, margin: '0 0 12px', fontFamily: font, lineHeight: 1.5 } }, item.desc),
              React.createElement('div', {
                style: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: `${item.color}15` }
              },
                React.createElement(window.lucide.Sparkles, { size: 13, color: item.color }),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: item.color, fontFamily: font } }, item.impact)
              )
            )
          )
        )
      :
        React.createElement('div', { style: { padding: '16px 20px 100px' } },
          ...weaverLog.map((log, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', gap: 14, padding: '14px 0',
                borderBottom: i < weaverLog.length - 1 ? `1px solid ${t.cardBorder}` : 'none',
                animation: `fadeIn 0.4s ease-out ${i * 0.1}s both`,
              }
            },
              React.createElement('div', {
                style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
              }, React.createElement(log.icon, { size: 18, color: t.muted })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                  React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.primary, fontFamily: font } }, log.action),
                  React.createElement('span', { style: { fontSize: 13, color: t.caption, fontFamily: font } }, log.time)
                ),
                React.createElement('p', { style: { fontSize: 13, color: t.muted, margin: 0, fontFamily: font, lineHeight: 1.4 } }, log.detail)
              )
            )
          )
        )
    );
  }

  // ─── PROFILE SCREEN ───
  function ProfileScreen() {
    const stats = [
      { label: 'Echoes Sent', value: '142', icon: window.lucide.Sparkles },
      { label: 'Weaves Joined', value: '7', icon: window.lucide.Layers },
      { label: 'Forks Created', value: '3', icon: window.lucide.GitBranch },
    ];

    const archivedWeaves = [
      { title: 'Solarpunk Gardens v2.4', date: 'Mar 28', echoes: 89, color: '#10B981' },
      { title: 'Ghost Frequencies v1.0', date: 'Mar 15', echoes: 42, color: '#EF4444' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.primary, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Profile'),
      ),

      // User card
      React.createElement('div', {
        style: { margin: '20px 20px 0', padding: '24px', borderRadius: 24, background: `linear-gradient(135deg, ${t.cta}12, ${t.cta}04)`, border: `1px solid ${t.cta}20`, textAlign: 'center' }
      },
        React.createElement('div', {
          style: { width: 72, height: 72, borderRadius: 36, background: t.cta, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: '#FFFFFF', fontFamily: font } }, 'S')),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.primary, margin: '0 0 4px', fontFamily: font } }, 'stellarweaver'),
        React.createElement('p', { style: { fontSize: 15, color: t.muted, margin: 0, fontFamily: font } }, 'Weaving since January 2026')
      ),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '20px 20px 0' } },
        ...stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, padding: '16px 10px', borderRadius: 16, background: t.card,
              border: `1px solid ${t.cardBorder}`, textAlign: 'center',
              animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
            }
          },
            React.createElement(s.icon, { size: 20, color: t.cta, style: { marginBottom: 8 } }),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.primary, fontFamily: font, letterSpacing: -0.3 } }, s.value),
            React.createElement('div', { style: { fontSize: 12, color: t.muted, fontFamily: font, marginTop: 2 } }, s.label)
          )
        )
      ),

      // Archived
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: t.muted, margin: '0 0 12px', fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Archived Weaves'),
        ...archivedWeaves.map((w, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`, marginBottom: 10,
              cursor: 'pointer', transition: 'background 150ms',
            },
            onMouseEnter: (ev) => ev.currentTarget.style.background = t.surfaceAlt,
            onMouseLeave: (ev) => ev.currentTarget.style.background = t.card,
          },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: `${w.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide.Archive, { size: 20, color: w.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.primary, fontFamily: font } }, w.title),
              React.createElement('div', { style: { fontSize: 13, color: t.muted, fontFamily: font, marginTop: 2 } }, `${w.echoes} echoes · Archived ${w.date}`)
            ),
            React.createElement(window.lucide.ChevronRight, { size: 18, color: t.caption })
          )
        )
      ),

      // Settings links
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: t.muted, margin: '0 0 12px', fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Settings'),
        ...[
          { label: 'Notifications', icon: window.lucide.Bell },
          { label: 'Privacy', icon: window.lucide.Lock },
          { label: 'Theme', icon: darkMode ? window.lucide.Moon : window.lucide.Sun, action: () => setDarkMode(!darkMode) },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            onClick: item.action || undefined,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`, marginBottom: 10,
              cursor: 'pointer', transition: 'background 150ms',
            },
            onMouseEnter: (ev) => ev.currentTarget.style.background = t.surfaceAlt,
            onMouseLeave: (ev) => ev.currentTarget.style.background = t.card,
          },
            React.createElement(item.icon, { size: 20, color: t.muted }),
            React.createElement('span', { style: { flex: 1, fontSize: 15, fontWeight: 500, color: t.primary, fontFamily: font } }, item.label),
            React.createElement(window.lucide.ChevronRight, { size: 18, color: t.caption })
          )
        )
      ),

      React.createElement('div', { style: { height: 100 } })
    );
  }

  // ─── NAVIGATION ───
  const screens = { home: HomeScreen, explore: ExploreScreen, create: CreateScreen, insights: InsightsScreen, profile: ProfileScreen };

  const navItems = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'create', label: 'Create', icon: window.lucide.PlusCircle },
    { id: 'insights', label: 'Insights', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font }
  },
    React.createElement('style', null, styleTag),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 24px 80px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }
      },
        React.createElement(ActiveScreen)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0, background: t.card,
          borderTop: `1px solid ${t.cardBorder}`, padding: '8px 0 28px',
          display: 'flex', justifyContent: 'space-around',
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 12px',
              minWidth: 44, minHeight: 44, transition: 'all 150ms ease',
            }
          },
            React.createElement(item.icon, {
              size: 24,
              color: activeScreen === item.id ? t.cta : t.caption,
              strokeWidth: activeScreen === item.id ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: activeScreen === item.id ? 700 : 500,
                color: activeScreen === item.id ? t.cta : t.caption, fontFamily: font,
              }
            }, item.label)
          )
        )
      )
    )
  );
}
