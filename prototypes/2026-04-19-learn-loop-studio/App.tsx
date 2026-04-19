const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);
  const [screenTransition, setScreenTransition] = useState(false);
  const [selectedLoop, setSelectedLoop] = useState(null);
  const [clipboardItems, setClipboardItems] = useState([
    { id: 1, type: 'text', source: 'Wikipedia', title: 'Quantum Entanglement Basics', preview: 'Two particles become interconnected...', color: '#6366F1' },
    { id: 2, type: 'video', source: 'YouTube', title: '3Blue1Brown - Linear Algebra', preview: 'Chapter 4: Matrix Multiplication', color: '#EF4444' },
    { id: 3, type: 'audio', source: 'Podcast', title: 'Lex Fridman #412', preview: 'Discussion on neural networks...', color: '#F59E0B' },
    { id: 4, type: 'image', source: 'Textbook', title: 'Cell Division Diagram', preview: 'Mitosis phases illustrated', color: '#10B981' },
  ]);
  const [aiLevel, setAiLevel] = useState('intermediate');
  const [expandedSnippet, setExpandedSnippet] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateTo = useCallback((screen) => {
    setScreenTransition(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setScreenTransition(false);
    }, 150);
  }, []);

  const themes = {
    dark: {
      bg: '#000000',
      surface: '#18181B',
      surfaceAlt: '#27272A',
      card: '#1C1C1E',
      cardHover: '#2C2C2E',
      text: '#F8FAFC',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
      accent: '#F8FAFC',
      accentSoft: 'rgba(248,250,252,0.1)',
      border: 'rgba(248,250,252,0.08)',
      gradient1: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      gradient2: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      gradient3: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      tabBg: 'rgba(24,24,27,0.95)',
    },
    light: {
      bg: '#FFFFFF',
      surface: '#F4F4F5',
      surfaceAlt: '#E4E4E7',
      card: '#FFFFFF',
      cardHover: '#F9F9FB',
      text: '#18181B',
      textSecondary: '#52525B',
      textMuted: '#A1A1AA',
      accent: '#18181B',
      accentSoft: 'rgba(24,24,27,0.06)',
      border: 'rgba(24,24,27,0.1)',
      gradient1: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      gradient2: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      gradient3: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      tabBg: 'rgba(255,255,255,0.95)',
    }
  };

  const t = themes[theme];
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.05); opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes ripple {
      0% { transform: scale(0); opacity: 0.5; }
      100% { transform: scale(4); opacity: 0; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    * { -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 0; height: 0; }
  `);

  // Icons helper
  const Icon = ({ name, size = 20, color, style: extraStyle = {} }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return null;
    return React.createElement(LucideIcon, { size, color: color || t.text, style: extraStyle });
  };

  // Animated number
  const AnimatedProgress = ({ value, max = 100 }) => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => setCurrent(value), 300);
      return () => clearTimeout(timer);
    }, [value]);
    const pct = (current / max) * 100;
    return React.createElement('div', { style: { width: '100%', height: 4, borderRadius: 2, background: t.surfaceAlt, overflow: 'hidden' } },
      React.createElement('div', { style: {
        width: `${pct}%`, height: '100%', borderRadius: 2,
        background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
        transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
      }})
    );
  };

  // ============ HOME SCREEN ============
  const HomeScreen = () => {
    const [greeting] = useState(() => {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning';
      if (h < 17) return 'Good afternoon';
      return 'Good evening';
    });

    const myLoops = [
      { id: 1, title: 'Quantum Computing Fundamentals', snippets: 12, mastery: 72, gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', icon: 'Atom', lastStudied: '2h ago' },
      { id: 2, title: 'Machine Learning Basics', snippets: 8, mastery: 45, gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)', icon: 'Brain', lastStudied: '1d ago' },
      { id: 3, title: 'Cell Biology Essentials', snippets: 15, mastery: 88, gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)', icon: 'Microscope', lastStudied: '3h ago' },
    ];

    const dailyChallenge = { title: 'Remix Challenge', desc: 'Combine 3 snippets about neural networks into a quiz loop', xp: 50 };

    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, fontWeight: 500, margin: 0, letterSpacing: 0.2 } }, greeting),
          React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, margin: '2px 0 0', letterSpacing: -0.5 } }, 'Your Studio')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
            style: { width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }
          }, React.createElement(Icon, { name: theme === 'dark' ? 'Sun' : 'Moon', size: 18 })),
          React.createElement('button', {
            onClick: () => navigateTo('profile'),
            style: { width: 40, height: 40, borderRadius: 20, background: t.gradient1, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: 'User', size: 18, color: '#FFF' }))
        )
      ),

      // Streak Card
      React.createElement('div', {
        style: {
          background: t.gradient1, borderRadius: 20, padding: '18px 20px', marginBottom: 20,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)', animation: 'pulse 3s ease infinite' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
              React.createElement(Icon, { name: 'Flame', size: 20, color: '#FDE68A' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#FFF' } }, '7 Day Streak')
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 } }, '42 loops completed this week')
          ),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#FFF', lineHeight: 1, letterSpacing: -1 } }, '1,240'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'XP')
          )
        )
      ),

      // Daily Challenge
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: '16px 18px', marginBottom: 24,
          border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s',
        },
        onClick: () => navigateTo('compose'),
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #F59E0B, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Zap', size: 20, color: '#FFF' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text } }, dailyChallenge.title),
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: '#F59E0B', background: 'rgba(245,158,11,0.15)', padding: '2px 8px', borderRadius: 10 } }, `+${dailyChallenge.xp} XP`)
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '4px 0 0' } }, dailyChallenge.desc)
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
        )
      ),

      // My Loops
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, 'My Loops'),
        React.createElement('button', {
          onClick: () => navigateTo('compose'),
          style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#8B5CF6', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }
        }, 'See All')
      ),

      ...myLoops.map((loop, i) =>
        React.createElement('div', {
          key: loop.id,
          style: {
            background: t.card, borderRadius: 16, padding: '16px 18px', marginBottom: 10,
            border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s',
            animation: `slideUp 0.4s ease ${0.1 * i}s both`,
          },
          onClick: () => { setSelectedLoop(loop); navigateTo('compose'); },
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: loop.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: loop.icon, size: 22, color: '#FFF' })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, loop.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, `${loop.snippets} snippets`),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, `Studied ${loop.lastStudied}`)
              ),
              React.createElement('div', { style: { marginTop: 8 } },
                React.createElement(AnimatedProgress, { value: loop.mastery })
              )
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text } }, `${loop.mastery}%`),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted } }, 'mastery')
            )
          )
        )
      ),

      // Quick Clipboard
      React.createElement('div', { style: { marginTop: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, 'Clipboard'),
          React.createElement('button', {
            onClick: () => navigateTo('clipboard'),
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#8B5CF6', background: 'none', border: 'none', cursor: 'pointer' }
          }, 'Manage')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          ...clipboardItems.map((item, i) => {
            const typeIcon = { text: 'FileText', video: 'Play', audio: 'Headphones', image: 'Image' }[item.type];
            return React.createElement('div', {
              key: item.id,
              style: {
                minWidth: 140, background: t.card, borderRadius: 14, padding: 14,
                border: `1px solid ${t.border}`, flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s',
                animation: `slideInRight 0.4s ease ${0.08 * i}s both`,
              }
            },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 8, background: item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
                React.createElement(Icon, { name: typeIcon, size: 16, color: item.color })
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, margin: 0, lineHeight: 1.3 } }, item.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: '4px 0 0' } }, item.source)
            );
          })
        )
      )
    );
  };

  // ============ CLIPBOARD SCREEN ============
  const ClipboardScreen = () => {
    const [activeTab, setActiveTab] = useState('all');
    const tabs = ['all', 'text', 'video', 'audio', 'image'];

    const allItems = [
      ...clipboardItems,
      { id: 5, type: 'text', source: 'arXiv Paper', title: 'Transformer Architecture Explained', preview: 'Self-attention mechanism allows...', color: '#6366F1' },
      { id: 6, type: 'video', source: 'Khan Academy', title: 'Organic Chemistry - Reactions', preview: 'Substitution and elimination', color: '#EF4444' },
      { id: 7, type: 'text', source: 'My Notes', title: 'Study Plan Week 12', preview: 'Focus on integration techniques...', color: '#8B5CF6' },
      { id: 8, type: 'image', source: 'Lecture Slides', title: 'Neural Network Architecture', preview: 'CNN layer visualization', color: '#10B981' },
    ];

    const filtered = activeTab === 'all' ? allItems : allItems.filter(i => i.type === activeTab);

    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 } }, 'Clipboard'),
        React.createElement('button', {
          style: { width: 44, height: 44, borderRadius: 22, background: t.gradient1, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        },
          React.createElement(Icon, { name: 'Plus', size: 20, color: '#FFF' })
        )
      ),

      // Search
      React.createElement('div', { style: { position: 'relative', marginBottom: 18 } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 1 } },
          React.createElement(Icon, { name: 'Search', size: 16, color: t.textMuted })
        ),
        React.createElement('input', {
          placeholder: 'Search snippets...',
          style: {
            width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', borderRadius: 12,
            background: t.surface, border: `1px solid ${t.border}`, color: t.text, fontFamily: font,
            fontSize: 15, outline: 'none',
          }
        })
      ),

      // Filter tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: font,
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s',
              background: activeTab === tab ? t.text : t.surfaceAlt,
              color: activeTab === tab ? t.bg : t.textSecondary,
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Items
      ...filtered.map((item, i) => {
        const typeIcon = { text: 'FileText', video: 'Play', audio: 'Headphones', image: 'Image' }[item.type];
        const isExpanded = expandedSnippet === item.id;

        return React.createElement('div', {
          key: item.id,
          style: {
            background: t.card, borderRadius: 16, padding: '16px', marginBottom: 10,
            border: `1px solid ${isExpanded ? '#6366F1' : t.border}`, cursor: 'pointer',
            transition: 'all 0.25s', animation: `fadeIn 0.3s ease ${0.06 * i}s both`,
          },
          onClick: () => setExpandedSnippet(isExpanded ? null : item.id),
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 10, background: item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: typeIcon, size: 18, color: item.color })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, item.title),
                React.createElement(Icon, { name: isExpanded ? 'ChevronUp' : 'ChevronDown', size: 16, color: t.textMuted })
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: item.color, fontWeight: 500 } }, item.type.toUpperCase()),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, `from ${item.source}`)
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '6px 0 0', lineHeight: 1.4 } }, item.preview),
            )
          ),
          isExpanded && React.createElement('div', { style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}`, animation: 'fadeIn 0.2s ease' } },
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '0 0 12px', lineHeight: 1.5 } },
              'Tap the AI button below to get an explanation tailored to your level.'
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                style: { flex: 1, padding: '10px', borderRadius: 10, background: t.gradient1, border: 'none', fontFamily: font, fontSize: 13, fontWeight: 600, color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
              }, React.createElement(Icon, { name: 'Sparkles', size: 14, color: '#FFF' }), 'AI Explain'),
              React.createElement('button', {
                style: { flex: 1, padding: '10px', borderRadius: 10, background: t.surfaceAlt, border: 'none', fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
              }, React.createElement(Icon, { name: 'Plus', size: 14 }), 'Add to Loop')
            )
          )
        );
      })
    );
  };

  // ============ COMPOSE SCREEN ============
  const ComposeScreen = () => {
    const [composerTab, setComposerTab] = useState('arrange');
    const loopSteps = [
      { id: 1, type: 'snippet', title: 'What is Quantum Entanglement?', source: 'Wikipedia', icon: 'FileText', color: '#6366F1' },
      { id: 2, type: 'quiz', title: 'Quick Check: Entanglement Basics', icon: 'HelpCircle', color: '#F59E0B' },
      { id: 3, type: 'snippet', title: 'Spooky Action at a Distance', source: 'Einstein Paper', icon: 'BookOpen', color: '#8B5CF6' },
      { id: 4, type: 'annotation', title: 'My Voice Note: Key Takeaway', icon: 'Mic', color: '#EF4444' },
      { id: 5, type: 'prompt', title: 'Reflect: How does this connect?', icon: 'MessageCircle', color: '#10B981' },
      { id: 6, type: 'snippet', title: 'Bell\'s Theorem Visualized', source: '3Blue1Brown', icon: 'Play', color: '#EC4899' },
    ];

    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 } }, 'Composer'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' } }, 'Quantum Computing Fundamentals')
        ),
        React.createElement('button', {
          style: { padding: '10px 18px', borderRadius: 12, background: t.gradient1, border: 'none', fontFamily: font, fontSize: 13, fontWeight: 700, color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
        }, React.createElement(Icon, { name: 'Play', size: 14, color: '#FFF' }), 'Preview')
      ),

      // Composer tabs
      React.createElement('div', { style: { display: 'flex', background: t.surface, borderRadius: 12, padding: 3, marginBottom: 20 } },
        ...['arrange', 'settings', 'ai'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setComposerTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: font, fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
              background: composerTab === tab ? t.card : 'transparent',
              color: composerTab === tab ? t.text : t.textMuted,
              boxShadow: composerTab === tab ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      composerTab === 'arrange' && React.createElement('div', null,
        // Timeline
        ...loopSteps.map((step, i) =>
          React.createElement('div', {
            key: step.id,
            style: {
              display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 4,
              animation: `slideUp 0.3s ease ${0.06 * i}s both`,
            }
          },
            // Timeline line
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 } },
              React.createElement('div', { style: { width: 24, height: 24, borderRadius: 12, background: step.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${step.color}` } },
                React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: step.color } })
              ),
              i < loopSteps.length - 1 && React.createElement('div', { style: { width: 2, height: 52, background: t.border, marginTop: 4 } })
            ),
            // Card
            React.createElement('div', {
              style: {
                flex: 1, background: t.card, borderRadius: 14, padding: '14px 16px',
                border: `1px solid ${t.border}`, cursor: 'grab', transition: 'all 0.2s',
                marginBottom: 8,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: step.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                  React.createElement(Icon, { name: step.icon, size: 16, color: step.color })
                ),
                React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: step.color, textTransform: 'uppercase', letterSpacing: 0.5 } }, step.type),
                  React.createElement('h4', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, step.title)
                ),
                React.createElement(Icon, { name: 'GripVertical', size: 16, color: t.textMuted })
              )
            )
          )
        ),

        // Add step button
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16,
            borderRadius: 14, border: `2px dashed ${t.border}`, cursor: 'pointer', marginTop: 8,
            transition: 'all 0.2s',
          },
          onClick: () => navigateTo('clipboard'),
        },
          React.createElement(Icon, { name: 'Plus', size: 18, color: t.textMuted }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.textMuted } }, 'Add Step from Clipboard')
        )
      ),

      composerTab === 'settings' && React.createElement('div', { style: { animation: 'fadeIn 0.3s ease' } },
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, border: `1px solid ${t.border}`, marginBottom: 12 } },
          React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: '0 0 14px' } }, 'Loop Settings'),
          ...[
            { label: 'Auto-advance', desc: 'Move to next step automatically', icon: 'FastForward' },
            { label: 'Shuffle Mode', desc: 'Randomize step order each session', icon: 'Shuffle' },
            { label: 'Spaced Repetition', desc: 'Schedule reviews based on mastery', icon: 'Calendar' },
          ].map((setting, i) => {
            const [on, setOn] = useState(i === 0);
            return React.createElement('div', {
              key: setting.label,
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: i > 0 ? `1px solid ${t.border}` : 'none' }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement(Icon, { name: setting.icon, size: 18, color: t.textMuted }),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text, margin: 0 } }, setting.label),
                  React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '2px 0 0' } }, setting.desc)
                )
              ),
              React.createElement('div', {
                onClick: () => setOn(!on),
                style: { width: 48, height: 28, borderRadius: 14, background: on ? '#6366F1' : t.surfaceAlt, cursor: 'pointer', transition: 'background 0.2s', position: 'relative', flexShrink: 0 }
              },
                React.createElement('div', { style: { width: 22, height: 22, borderRadius: 11, background: '#FFF', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' } })
              )
            );
          })
        )
      ),

      composerTab === 'ai' && React.createElement('div', { style: { animation: 'fadeIn 0.3s ease' } },
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, border: `1px solid ${t.border}`, marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
            React.createElement(Icon, { name: 'Sparkles', size: 20, color: '#8B5CF6' }),
            React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, 'AI Explainer Level')
          ),
          ...['beginner', 'intermediate', 'advanced', 'expert'].map(level =>
            React.createElement('button', {
              key: level,
              onClick: () => setAiLevel(level),
              style: {
                width: '100%', padding: '12px 16px', borderRadius: 12, marginBottom: 8, cursor: 'pointer',
                background: aiLevel === level ? '#6366F120' : t.surface,
                border: aiLevel === level ? '1.5px solid #6366F1' : `1px solid ${t.border}`,
                fontFamily: font, fontSize: 14, fontWeight: 600, textAlign: 'left', transition: 'all 0.2s',
                color: aiLevel === level ? '#6366F1' : t.textSecondary,
              }
            }, level.charAt(0).toUpperCase() + level.slice(1))
          )
        ),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, border: `1px solid ${t.border}` } },
          React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: '0 0 12px' } }, 'Learning Style'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            ...['Analogy-based', 'Step-by-step', 'Visual', 'Socratic', 'Example-first'].map((style, i) => {
              const [selected, setSelected] = useState(i < 2);
              return React.createElement('button', {
                key: style, onClick: () => setSelected(!selected),
                style: {
                  padding: '8px 14px', borderRadius: 20, cursor: 'pointer', fontFamily: font, fontSize: 13,
                  fontWeight: 600, transition: 'all 0.2s', border: 'none',
                  background: selected ? '#6366F1' : t.surfaceAlt,
                  color: selected ? '#FFF' : t.textSecondary,
                }
              }, style);
            })
          )
        )
      )
    );
  };

  // ============ EXPLORE SCREEN ============
  const ExploreScreen = () => {
    const [exploreTab, setExploreTab] = useState('trending');
    const communityLoops = [
      { id: 1, title: 'Calculus Made Visual', author: 'MathWhiz', likes: 2341, loops: 18, mastery: null, gradient: 'linear-gradient(135deg, #6366F1, #EC4899)', icon: 'TrendingUp', tags: ['Math', 'Calculus'] },
      { id: 2, title: 'CRISPR Gene Editing 101', author: 'BioNerd42', likes: 1892, loops: 12, mastery: null, gradient: 'linear-gradient(135deg, #10B981, #06B6D4)', icon: 'Dna', tags: ['Biology', 'Genetics'] },
      { id: 3, title: 'History of AI: Timeline', author: 'TechSage', likes: 3105, loops: 24, mastery: null, gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)', icon: 'Clock', tags: ['CS', 'AI'] },
      { id: 4, title: 'Organic Chemistry Reactions', author: 'ChemGuru', likes: 978, loops: 9, mastery: null, gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)', icon: 'FlaskConical', tags: ['Chemistry'] },
      { id: 5, title: 'Shakespeare\'s Sonnets Decoded', author: 'LitCritic', likes: 654, loops: 7, mastery: null, gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)', icon: 'BookOpen', tags: ['Literature'] },
    ];

    const expertPicks = [
      { title: 'Prof. Chen\'s Physics Series', followers: '12.4K', avatar: '#6366F1' },
      { title: 'Dr. Sarah\'s Neuro Deep Dives', followers: '8.7K', avatar: '#EC4899' },
      { title: 'CodeMaster JS Fundamentals', followers: '15.1K', avatar: '#F59E0B' },
    ];

    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, margin: '0 0 18px', letterSpacing: -0.5 } }, 'Explore'),

      // Search
      React.createElement('div', { style: { position: 'relative', marginBottom: 18 } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' } },
          React.createElement(Icon, { name: 'Search', size: 16, color: t.textMuted })
        ),
        React.createElement('input', {
          placeholder: 'Search community loops...',
          style: { width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, color: t.text, fontFamily: font, fontSize: 15, outline: 'none' }
        })
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
        ...['trending', 'new', 'experts', 'subjects'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setExploreTab(tab),
            style: {
              padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: font,
              fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
              background: exploreTab === tab ? t.text : t.surfaceAlt,
              color: exploreTab === tab ? t.bg : t.textSecondary,
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Expert Picks horizontal
      (exploreTab === 'trending' || exploreTab === 'experts') && React.createElement('div', { style: { marginBottom: 22 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Expert Creators'),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 } },
          ...expertPicks.map((expert, i) =>
            React.createElement('div', {
              key: i,
              style: {
                minWidth: 160, background: t.card, borderRadius: 16, padding: 16, textAlign: 'center',
                border: `1px solid ${t.border}`, flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s',
                animation: `scaleIn 0.3s ease ${0.1 * i}s both`,
              }
            },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 24, background: expert.avatar, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'GraduationCap', size: 22, color: '#FFF' })
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, margin: 0 } }, expert.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '4px 0 0' } }, `${expert.followers} followers`)
            )
          )
        )
      ),

      // Community loops
      React.createElement('h2', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Community Loops'),
      ...communityLoops.map((loop, i) =>
        React.createElement('div', {
          key: loop.id,
          style: {
            background: t.card, borderRadius: 16, marginBottom: 10, overflow: 'hidden',
            border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s',
            animation: `slideUp 0.4s ease ${0.08 * i}s both`,
          }
        },
          React.createElement('div', { style: { height: 6, background: loop.gradient } }),
          React.createElement('div', { style: { padding: '14px 16px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: loop.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(Icon, { name: loop.icon, size: 20, color: '#FFF' })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, loop.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, `by ${loop.author}`),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, `${loop.loops} steps`)
                )
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Heart', size: 14, color: '#EF4444' }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary } }, loop.likes.toLocaleString())
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10 } },
              ...loop.tags.map(tag =>
                React.createElement('span', { key: tag, style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.textMuted, background: t.surfaceAlt, padding: '3px 10px', borderRadius: 10 } }, tag)
              )
            )
          )
        )
      )
    );
  };

  // ============ PROFILE SCREEN ============
  const ProfileScreen = () => {
    const stats = [
      { label: 'Loops Created', value: '23', icon: 'Layers' },
      { label: 'Total XP', value: '1,240', icon: 'Zap' },
      { label: 'Day Streak', value: '7', icon: 'Flame' },
      { label: 'Shared', value: '5', icon: 'Share2' },
    ];

    const masteryTopics = [
      { name: 'Quantum Physics', level: 72, color: '#6366F1' },
      { name: 'Machine Learning', level: 45, color: '#F59E0B' },
      { name: 'Cell Biology', level: 88, color: '#10B981' },
      { name: 'Linear Algebra', level: 61, color: '#EC4899' },
      { name: 'Organic Chemistry', level: 33, color: '#8B5CF6' },
    ];

    const suggestions = [
      { title: 'Try: Wave-Particle Duality', reason: 'Based on your Quantum Physics progress', icon: 'Lightbulb', color: '#6366F1' },
      { title: 'Remix Challenge: Neural Nets', reason: 'Strengthen weak spots in ML basics', icon: 'RefreshCw', color: '#F59E0B' },
    ];

    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.4s ease' } },
      // Profile header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 24 } },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 40, background: t.gradient1, margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
          }
        }, React.createElement(Icon, { name: 'User', size: 36, color: '#FFF' })),
        React.createElement('h1', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 2px', letterSpacing: -0.3 } }, 'Alex Rivera'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 } }, 'Knowledge DJ since March 2026'),
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: { marginTop: 12, padding: '8px 18px', borderRadius: 20, background: t.surfaceAlt, border: 'none', fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(Icon, { name: theme === 'dark' ? 'Sun' : 'Moon', size: 14, color: t.textSecondary }),
          `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 } },
        ...stats.map((stat, i) =>
          React.createElement('div', {
            key: stat.label,
            style: {
              background: t.card, borderRadius: 16, padding: 16, textAlign: 'center',
              border: `1px solid ${t.border}`, animation: `scaleIn 0.3s ease ${0.08 * i}s both`,
            }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
              React.createElement(Icon, { name: stat.icon, size: 18, color: t.textSecondary })
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 } }, stat.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, marginTop: 2 } }, stat.label)
          )
        )
      ),

      // AI Suggestions
      React.createElement('h2', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'AI Suggestions'),
      ...suggestions.map((sug, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 14, padding: '14px 16px', marginBottom: 10,
            border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s',
            animation: `slideInRight 0.4s ease ${0.1 * i}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 10, background: sug.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: sug.icon, size: 18, color: sug.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, margin: 0 } }, sug.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '2px 0 0' } }, sug.reason)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted })
          )
        )
      ),

      // Mastery Pathways
      React.createElement('h2', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '20px 0 12px' } }, 'Mastery Pathways'),
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, border: `1px solid ${t.border}` } },
        ...masteryTopics.map((topic, i) =>
          React.createElement('div', {
            key: topic.name,
            style: { marginBottom: i < masteryTopics.length - 1 ? 16 : 0, animation: `fadeIn 0.3s ease ${0.08 * i}s both` }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 500, color: t.text } }, topic.name),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: topic.color } }, `${topic.level}%`)
            ),
            React.createElement('div', { style: { width: '100%', height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
              React.createElement('div', { style: { width: `${topic.level}%`, height: '100%', borderRadius: 3, background: topic.color, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' } })
            )
          )
        )
      )
    );
  };

  // ============ NAVIGATION ============
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'clipboard', label: 'Clips', icon: 'Clipboard' },
    { id: 'compose', label: 'Compose', icon: 'Layers' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const screens = {
    home: HomeScreen,
    clipboard: ClipboardScreen,
    compose: ComposeScreen,
    explore: ExploreScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: font }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Content area
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: 16, paddingBottom: 80,
          opacity: screenTransition ? 0 : 1,
          transition: 'opacity 0.15s ease',
        }
      },
        React.createElement(ActiveScreen)
      ),

      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.tabBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `0.5px solid ${t.border}`,
          padding: '8px 8px 24px', display: 'flex', justifyContent: 'space-around',
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => navigateTo(tab.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              minWidth: 44, minHeight: 44, transition: 'all 0.2s',
              opacity: activeScreen === tab.id ? 1 : 0.5,
              transform: activeScreen === tab.id ? 'scale(1.05)' : 'scale(1)',
            }
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? (theme === 'dark' ? '#F8FAFC' : '#6366F1') : t.textMuted
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 10, fontWeight: 600,
                color: activeScreen === tab.id ? (theme === 'dark' ? '#F8FAFC' : '#6366F1') : t.textMuted,
                letterSpacing: 0.2,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
