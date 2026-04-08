const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [remixMode, setRemixMode] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  const [profileTab, setProfileTab] = useState('forges');

  const themes = {
    dark: {
      bg: '#0F172A',
      surface: '#1E293B',
      surfaceAlt: '#334155',
      card: '#1E293B',
      cardBorder: '#334155',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaLight: '#FDBA74',
      accent: '#8B5CF6',
      success: '#10B981',
      danger: '#EF4444',
      overlay: 'rgba(15,23,42,0.8)',
      navBg: '#1E293B',
      navBorder: '#334155',
      inputBg: '#334155',
      shadow: '0 4px 24px rgba(0,0,0,0.4)',
      cardShadow: '0 4px 16px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)',
    },
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F5F9',
      card: '#FFFFFF',
      cardBorder: '#E2E8F0',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaLight: '#FED7AA',
      accent: '#8B5CF6',
      success: '#10B981',
      danger: '#EF4444',
      overlay: 'rgba(248,250,252,0.8)',
      navBg: '#FFFFFF',
      navBorder: '#E2E8F0',
      inputBg: '#F1F5F9',
      shadow: '0 4px 24px rgba(0,0,0,0.08)',
      cardShadow: '0 4px 16px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};

  const createIcon = (IconComponent, size = 24, color = t.text, style = {}) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 2 });
  };

  // Notification helper
  const notify = (msg) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const toggleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    if (!likedItems[id]) notify('Added to favorites!');
  };

  // ==================== STYLES ====================
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
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(37,99,235,0.3); }
      50% { box-shadow: 0 0 20px rgba(37,99,235,0.6); }
    }
  `);

  // ==================== HOME SCREEN ====================
  function HomeScreen() {
    const greeting = (() => {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning';
      if (h < 17) return 'Good afternoon';
      return 'Good evening';
    })();

    const streakDays = 12;
    const xp = 2840;
    const level = 7;

    const dailyChallenges = [
      { id: 'dc1', title: 'Explain Quantum Entanglement', subtitle: 'As a comic strip', type: 'Visual', difficulty: 'Medium', xp: 150, color: '#8B5CF6', icon: icons.Atom },
      { id: 'dc2', title: 'The French Revolution', subtitle: 'As a podcast script', type: 'Audio', difficulty: 'Hard', xp: 250, color: '#EC4899', icon: icons.Mic },
      { id: 'dc3', title: 'Machine Learning Basics', subtitle: 'As an interactive flowchart', type: 'Diagram', difficulty: 'Easy', xp: 100, color: '#10B981', icon: icons.GitBranch },
    ];

    const recentForges = [
      { id: 'rf1', title: 'DNA Replication Dance', type: 'Animation', views: 342, likes: 58, timeAgo: '2h ago' },
      { id: 'rf2', title: 'Keynesian Economics Map', type: 'Infographic', views: 128, likes: 24, timeAgo: '1d ago' },
      { id: 'rf3', title: 'Neural Networks Song', type: 'Mnemonic', views: 891, likes: 156, timeAgo: '3d ago' },
    ];

    const trendingTopics = [
      { label: 'AI Ethics', count: '2.4k forges' },
      { label: 'Climate Science', count: '1.8k forges' },
      { label: 'Blockchain', count: '1.2k forges' },
      { label: 'Neuroscience', count: '956 forges' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, fontWeight: 500, marginBottom: 2 } }, greeting),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'ThoughtForge'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, 'Level ' + level + ' Creator · ' + xp.toLocaleString() + ' XP'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 12, border: `2px solid ${t.cardBorder}`,
              background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }
          }, createIcon(isDark ? icons.Sun : icons.Moon, 18, t.textSecondary)),
          React.createElement('button', {
            style: {
              width: 40, height: 40, borderRadius: 12, border: `2px solid ${t.cardBorder}`,
              background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative',
            }
          },
            createIcon(icons.Bell, 18, t.textSecondary),
            React.createElement('div', { style: {
              position: 'absolute', top: -2, right: -2, width: 10, height: 10,
              borderRadius: 5, background: t.cta, border: `2px solid ${t.surface}`,
            } })
          ),
        ),
      ),

      // Streak & Stats Bar
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 20, padding: '16px 18px', marginBottom: 20,
          border: '3px solid rgba(255,255,255,0.15)',
          boxShadow: '0 6px 24px rgba(37,99,235,0.35), 0 2px 8px rgba(37,99,235,0.2)',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: {
              width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.3)',
              animation: 'float 3s ease-in-out infinite',
            } }, createIcon(icons.Flame, 22, '#FFF')),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: '#FFF', fontFamily: font, letterSpacing: -0.5 } }, streakDays + ' Day Streak'),
              React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font } }, 'Keep forging to maintain it!'),
            ),
          ),
          React.createElement('div', { style: {
            background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 14px',
            border: '2px solid rgba(255,255,255,0.3)',
          } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: '#FFF', fontFamily: font, textAlign: 'center' } }, '3/5'),
            React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: font } }, 'daily'),
          ),
        ),
      ),

      // Daily Challenges
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Daily Challenges'),
          React.createElement('button', {
            onClick: () => setActiveScreen('challenges'),
            style: { fontSize: 15, color: t.primary, fontFamily: font, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }
          },
            React.createElement('span', null, 'See all'),
          ),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, margin: '0 -16px', padding: '0 16px 8px' } },
          dailyChallenges.map((ch, i) =>
            React.createElement('div', {
              key: ch.id,
              onClick: () => { setActiveChallenge(ch); setActiveScreen('remix'); },
              style: {
                minWidth: 200, borderRadius: 20, padding: 16,
                background: t.card, border: `3px solid ${ch.color}30`,
                boxShadow: t.cardShadow, cursor: 'pointer',
                transition: 'all 0.2s', animation: `slideRight 0.4s ease ${i * 0.1}s both`,
              }
            },
              React.createElement('div', { style: {
                width: 44, height: 44, borderRadius: 14,
                background: ch.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 12, border: `2px solid ${ch.color}40`,
              } }, createIcon(ch.icon, 22, ch.color)),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 4 } }, ch.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginBottom: 10 } }, ch.subtitle),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: {
                  fontSize: 11, fontWeight: 600, color: ch.color, fontFamily: font,
                  background: ch.color + '15', padding: '3px 8px', borderRadius: 8,
                } }, ch.difficulty),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.cta, fontFamily: font } }, '+' + ch.xp + ' XP'),
              ),
            )
          ),
        ),
      ),

      // Trending Topics
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 14 } }, 'Trending Topics'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          trendingTopics.map((topic, i) =>
            React.createElement('button', {
              key: i,
              onClick: () => { setSearchQuery(topic.label); setActiveScreen('library'); },
              style: {
                padding: '10px 16px', borderRadius: 14, background: t.surface,
                border: `2px solid ${t.cardBorder}`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }
            },
              createIcon(icons.TrendingUp, 14, t.primary),
              React.createElement('div', null,
                React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font } }, topic.label),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginLeft: 6 } }, topic.count),
              ),
            )
          ),
        ),
      ),

      // Recent Forges
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 14 } }, 'Your Recent Forges'),
        recentForges.map((forge, i) =>
          React.createElement('div', {
            key: forge.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: t.card, borderRadius: 16, marginBottom: 10,
              border: `2px solid ${t.cardBorder}`, boxShadow: t.cardShadow,
              cursor: 'pointer', transition: 'all 0.2s',
              animation: `fadeIn 0.4s ease ${i * 0.1}s both`,
            }
          },
            React.createElement('div', { style: {
              width: 48, height: 48, borderRadius: 14,
              background: [t.primary + '20', t.accent + '20', t.cta + '20'][i],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${[t.primary + '30', t.accent + '30', t.cta + '30'][i]}`,
              flexShrink: 0,
            } }, createIcon([icons.Play, icons.Image, icons.Music][i], 20, [t.primary, t.accent, t.cta][i])),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, forge.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, forge.type + ' · ' + forge.timeAgo),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
                createIcon(icons.Eye, 12, t.textMuted), forge.views
              ),
              React.createElement('div', { style: { fontSize: 13, color: t.cta, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 } },
                createIcon(icons.Heart, 12, t.cta), forge.likes
              ),
            ),
          )
        ),
      ),
    );
  }

  // ==================== LIBRARY SCREEN ====================
  function LibraryScreen() {
    const categories = [
      { id: 'all', label: 'All', icon: icons.Grid3x3 },
      { id: 'science', label: 'Science', icon: icons.Atom },
      { id: 'history', label: 'History', icon: icons.Landmark },
      { id: 'tech', label: 'Tech', icon: icons.Cpu },
      { id: 'arts', label: 'Arts', icon: icons.Palette },
      { id: 'math', label: 'Math', icon: icons.Pi },
    ];

    const sources = [
      { id: 's1', title: 'The Paradox of Quantum Computing', category: 'science', type: 'Article', duration: '12 min', difficulty: 'Advanced', author: 'MIT Tech Review', remixes: 48, color: '#8B5CF6', desc: 'How quantum superposition challenges our classical understanding of computation and opens doors to solving previously intractable problems.' },
      { id: 's2', title: 'Rise and Fall of the Roman Empire', category: 'history', type: 'Video Series', duration: '45 min', difficulty: 'Intermediate', author: 'History Channel', remixes: 132, color: '#EC4899', desc: 'A comprehensive overview of Roman civilization from its mythic founding through centuries of expansion to its eventual decline.' },
      { id: 's3', title: 'Neural Networks Demystified', category: 'tech', type: 'Interactive', duration: '20 min', difficulty: 'Beginner', author: 'DeepLearning.ai', remixes: 89, color: '#10B981', desc: 'Step-by-step walkthrough of how artificial neural networks learn, from basic perceptrons to deep learning architectures.' },
      { id: 's4', title: 'Game Theory in Economics', category: 'math', type: 'Article', duration: '15 min', difficulty: 'Intermediate', author: 'Khan Academy', remixes: 56, color: '#F59E0B', desc: 'Understanding strategic decision-making through Nash equilibrium, prisoner\'s dilemma, and real-world market applications.' },
      { id: 's5', title: 'The Art of Renaissance Masters', category: 'arts', type: 'Gallery', duration: '30 min', difficulty: 'Beginner', author: 'The Met', remixes: 74, color: '#EF4444', desc: 'Exploring techniques of Da Vinci, Michelangelo, and Raphael — how they revolutionized perspective, anatomy, and composition.' },
      { id: 's6', title: 'CRISPR Gene Editing Explained', category: 'science', type: 'Article', duration: '18 min', difficulty: 'Advanced', author: 'Nature', remixes: 67, color: '#06B6D4', desc: 'How CRISPR-Cas9 works at the molecular level and its implications for medicine, agriculture, and bioethics.' },
    ];

    const filtered = sources.filter(s =>
      (selectedCategory === 'all' || s.category === selectedCategory) &&
      (!searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'Source Library'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 18 } }, 'Discover ideas worth remixing'),

      // Search
      React.createElement('div', { style: {
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
        background: t.inputBg, borderRadius: 16, marginBottom: 16,
        border: `2px solid ${t.cardBorder}`,
      } },
        createIcon(icons.Search, 18, t.textMuted),
        React.createElement('input', {
          placeholder: 'Search topics, concepts, ideas...',
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          style: {
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 15, color: t.text, fontFamily: font,
          }
        }),
        searchQuery && React.createElement('button', {
          onClick: () => setSearchQuery(''),
          style: { background: 'none', border: 'none', cursor: 'pointer', padding: 4 }
        }, createIcon(icons.X, 16, t.textMuted)),
      ),

      // Categories
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 } },
        categories.map(cat =>
          React.createElement('button', {
            key: cat.id,
            onClick: () => setSelectedCategory(cat.id),
            style: {
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 12, whiteSpace: 'nowrap',
              background: selectedCategory === cat.id ? t.primary : t.surface,
              color: selectedCategory === cat.id ? '#FFF' : t.textSecondary,
              border: `2px solid ${selectedCategory === cat.id ? t.primary : t.cardBorder}`,
              fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer',
              transition: 'all 0.2s',
            }
          },
            createIcon(cat.icon, 14, selectedCategory === cat.id ? '#FFF' : t.textSecondary),
            React.createElement('span', null, cat.label),
          )
        ),
      ),

      // Source Cards
      filtered.map((source, i) =>
        React.createElement('div', {
          key: source.id,
          onClick: () => { setActiveChallenge({ title: source.title, subtitle: 'Your remix', type: source.type, difficulty: source.difficulty, xp: 200, color: source.color }); setActiveScreen('remix'); },
          style: {
            background: t.card, borderRadius: 20, padding: 18, marginBottom: 14,
            border: `3px solid ${source.color}25`, boxShadow: t.cardShadow,
            cursor: 'pointer', transition: 'all 0.2s',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                React.createElement('span', { style: {
                  fontSize: 11, fontWeight: 600, color: source.color, fontFamily: font,
                  background: source.color + '15', padding: '3px 8px', borderRadius: 8,
                } }, source.type),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, source.duration),
              ),
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 4 } }, source.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, lineHeight: 1.4 } }, source.desc),
            ),
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
                createIcon(icons.User, 12, t.textMuted), source.author
              ),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
                createIcon(icons.Shuffle, 12, t.textMuted), source.remixes + ' remixes'
              ),
            ),
            React.createElement('span', { style: {
              fontSize: 11, fontWeight: 600, fontFamily: font,
              color: source.difficulty === 'Beginner' ? t.success : source.difficulty === 'Advanced' ? t.danger : t.cta,
            } }, source.difficulty),
          ),
        )
      ),

      filtered.length === 0 && React.createElement('div', { style: {
        textAlign: 'center', padding: '40px 20px', color: t.textMuted, fontFamily: font,
      } },
        createIcon(icons.SearchX, 40, t.textMuted),
        React.createElement('div', { style: { fontSize: 17, fontWeight: 600, marginTop: 12 } }, 'No sources found'),
        React.createElement('div', { style: { fontSize: 14, marginTop: 4 } }, 'Try a different search or category'),
      ),
    );
  }

  // ==================== REMIX / CREATE SCREEN ====================
  function RemixScreen() {
    const challenge = activeChallenge || {
      title: 'Photosynthesis Process', subtitle: 'Create your remix', type: 'Open', difficulty: 'Medium', xp: 200, color: t.primary
    };

    const remixTools = [
      { id: 'diagram', label: 'Diagram', icon: icons.GitBranch, desc: 'Flowcharts & mind maps', color: '#8B5CF6' },
      { id: 'timeline', label: 'Timeline', icon: icons.Clock, desc: 'Interactive timeline', color: '#10B981' },
      { id: 'mnemonic', label: 'Mnemonic', icon: icons.Music, desc: 'Musical memory aid', color: '#EC4899' },
      { id: 'analogy', label: 'Analogy', icon: icons.Lightbulb, desc: 'Visual metaphor', color: '#F59E0B' },
      { id: 'story', label: 'Story', icon: icons.BookOpen, desc: 'Narrative thread', color: '#EF4444' },
      { id: 'simulation', label: 'Simulation', icon: icons.Play, desc: 'Micro-simulation', color: '#06B6D4' },
    ];

    const aiSuggestions = [
      'Try comparing this to a factory assembly line',
      'A timeline format would highlight the sequence',
      'Consider a "before and after" visual metaphor',
    ];

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      // Header with back
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 } },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: {
            width: 44, height: 44, borderRadius: 14, background: t.surface,
            border: `2px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        }, createIcon(icons.ArrowLeft, 20, t.text)),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Remix Studio'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, 'Create your thought-forge'),
        ),
      ),

      // Challenge Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${challenge.color}18, ${challenge.color}08)`,
          borderRadius: 20, padding: 18, marginBottom: 20,
          border: `3px solid ${challenge.color}30`, boxShadow: t.cardShadow,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
          createIcon(icons.Sparkles, 16, challenge.color),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: challenge.color, fontFamily: font } }, 'CHALLENGE'),
          React.createElement('span', { style: { fontSize: 13, color: t.cta, fontWeight: 700, fontFamily: font, marginLeft: 'auto' } }, '+' + challenge.xp + ' XP'),
        ),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 4 } }, challenge.title),
        React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font } }, challenge.subtitle),
      ),

      // Remix Tools
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Choose Your Format'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 } },
        remixTools.map((tool, i) =>
          React.createElement('button', {
            key: tool.id,
            onClick: () => setRemixMode(remixMode === tool.id ? null : tool.id),
            style: {
              padding: '16px 10px', borderRadius: 18, background: remixMode === tool.id ? tool.color + '18' : t.card,
              border: `3px solid ${remixMode === tool.id ? tool.color : t.cardBorder}`,
              boxShadow: remixMode === tool.id ? `0 4px 16px ${tool.color}30` : t.cardShadow,
              cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
              animation: `bounceIn 0.4s ease ${i * 0.06}s both`,
            }
          },
            React.createElement('div', { style: {
              width: 44, height: 44, borderRadius: 14, margin: '0 auto 8px',
              background: tool.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${tool.color}40`,
            } }, createIcon(tool.icon, 22, tool.color)),
            React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font } }, tool.label),
            React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, tool.desc),
          )
        ),
      ),

      // AI Suggestions
      React.createElement('div', { style: {
        background: t.surface, borderRadius: 18, padding: 16, marginBottom: 20,
        border: `2px solid ${t.primary}30`,
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          React.createElement('div', { style: {
            width: 28, height: 28, borderRadius: 10, background: t.primary + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          } }, createIcon(icons.Sparkles, 14, t.primary)),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, 'AI Suggestions'),
        ),
        aiSuggestions.map((s, i) =>
          React.createElement('div', { key: i, style: {
            padding: '10px 12px', background: t.inputBg, borderRadius: 12,
            marginBottom: i < aiSuggestions.length - 1 ? 8 : 0,
            fontSize: 13, color: t.textSecondary, fontFamily: font, lineHeight: 1.4,
            border: `1px solid ${t.cardBorder}`, cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8,
          } },
            createIcon(icons.Zap, 14, t.cta),
            s,
          )
        ),
      ),

      // Workspace / Canvas Area
      remixMode && React.createElement('div', { style: {
        background: t.card, borderRadius: 20, padding: 20, marginBottom: 20,
        border: `3px solid ${t.cardBorder}`, minHeight: 160,
        boxShadow: t.cardShadow, position: 'relative',
      } },
        React.createElement('div', { style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: 140,
        } },
          React.createElement('div', { style: {
            width: 56, height: 56, borderRadius: 18, background: t.primary + '15',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
            border: `2px dashed ${t.primary}40`, animation: 'pulse 2s ease-in-out infinite',
          } }, createIcon(icons.Plus, 24, t.primary)),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } },
            'Start Building Your ' + remixTools.find(r => r.id === remixMode)?.label
          ),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, textAlign: 'center' } },
            'Drag elements or tap to add components'
          ),
        ),
        // Toolbar
        React.createElement('div', { style: {
          display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16,
          borderTop: `1px solid ${t.cardBorder}`, paddingTop: 14,
        } },
          [icons.Type, icons.Image, icons.Shapes, icons.Palette, icons.Layers].map((ic, i) =>
            React.createElement('button', {
              key: i,
              style: {
                width: 44, height: 44, borderRadius: 12, background: t.inputBg,
                border: `2px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }
            }, createIcon(ic, 18, t.textSecondary))
          ),
        ),
      ),

      // Start Forging CTA
      React.createElement('button', {
        onClick: () => notify('Forge started! Creating your remix...'),
        style: {
          width: '100%', padding: '16px 24px', borderRadius: 16,
          background: `linear-gradient(135deg, ${t.cta}, #EA580C)`,
          border: '3px solid rgba(255,255,255,0.2)',
          color: '#FFF', fontSize: 17, fontWeight: 700, fontFamily: font,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: `0 6px 24px ${t.cta}50`,
          transition: 'all 0.2s',
        }
      },
        createIcon(icons.Hammer, 20, '#FFF'),
        'Start Forging',
      ),
    );
  }

  // ==================== COMMUNITY / GALLERY SCREEN ====================
  function CommunityScreen() {
    const feedItems = [
      {
        id: 'f1', author: 'Elena K.', avatar: 'EK', level: 12,
        title: 'Black Holes as Cosmic Vacuum Cleaners', type: 'Visual Analogy',
        desc: 'An interactive visualization comparing black hole physics to everyday household cleaning — surprisingly accurate analogy for gravitational pull, event horizon, and Hawking radiation.',
        likes: 234, comments: 45, remixes: 18, timeAgo: '3h ago',
        color: '#8B5CF6', tags: ['Physics', 'Space', 'Analogy'],
      },
      {
        id: 'f2', author: 'Marcus T.', avatar: 'MT', level: 8,
        title: 'Evolution of Programming Languages', type: 'Interactive Timeline',
        desc: 'A scrollable timeline from Assembly to Rust, showing how each language influenced the next with branching paths for different paradigms.',
        likes: 187, comments: 32, remixes: 24, timeAgo: '6h ago',
        color: '#10B981', tags: ['CS', 'History', 'Timeline'],
      },
      {
        id: 'f3', author: 'Priya S.', avatar: 'PS', level: 15,
        title: 'Periodic Table Rap Battle', type: 'Musical Mnemonic',
        desc: 'Each element group has its own verse and beat — alkali metals vs. noble gases. 97% retention rate in student tests after one listen.',
        likes: 567, comments: 89, remixes: 43, timeAgo: '1d ago',
        color: '#EC4899', tags: ['Chemistry', 'Music', 'Education'],
      },
      {
        id: 'f4', author: 'James W.', avatar: 'JW', level: 10,
        title: 'Supply & Demand: A Coffee Shop Sim', type: 'Micro-Simulation',
        desc: 'Run your own coffee shop and watch real-time graphs of supply, demand, price elasticity, and equilibrium shift as you make business decisions.',
        likes: 312, comments: 67, remixes: 31, timeAgo: '2d ago',
        color: '#F59E0B', tags: ['Economics', 'Simulation', 'Interactive'],
      },
    ];

    const feedFilter = ['Featured', 'New', 'Top', 'Following'];
    const [activeFeedFilter, setActiveFeedFilter] = useState('Featured');

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'Community'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 18 } }, 'Discover thought-forges from creators'),

      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
        feedFilter.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setActiveFeedFilter(f),
            style: {
              padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: font,
              background: activeFeedFilter === f ? t.primary : t.surface,
              color: activeFeedFilter === f ? '#FFF' : t.textSecondary,
              border: `2px solid ${activeFeedFilter === f ? t.primary : t.cardBorder}`,
              cursor: 'pointer', transition: 'all 0.2s',
            }
          }, React.createElement('span', null, f))
        ),
      ),

      // Feed
      feedItems.map((item, i) =>
        React.createElement('div', {
          key: item.id,
          style: {
            background: t.card, borderRadius: 20, padding: 18, marginBottom: 14,
            border: `3px solid ${item.color}20`, boxShadow: t.cardShadow,
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
          }
        },
          // Author row
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
            React.createElement('div', { style: {
              width: 40, height: 40, borderRadius: 12, background: item.color + '25',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: item.color, fontFamily: font,
              border: `2px solid ${item.color}40`,
            } }, item.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, item.author),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, 'Level ' + item.level + ' · ' + item.timeAgo),
            ),
            React.createElement('button', {
              style: { background: 'none', border: 'none', cursor: 'pointer', padding: 4 }
            }, createIcon(icons.MoreHorizontal, 18, t.textMuted)),
          ),

          // Content
          React.createElement('div', { style: {
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
          } },
            React.createElement('span', { style: {
              fontSize: 11, fontWeight: 600, color: item.color, fontFamily: font,
              background: item.color + '15', padding: '3px 8px', borderRadius: 8,
            } }, item.type),
          ),
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 6 } }, item.title),
          React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, lineHeight: 1.5, marginBottom: 12 } }, item.desc),

          // Tags
          React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' } },
            item.tags.map(tag =>
              React.createElement('span', { key: tag, style: {
                fontSize: 12, color: t.textMuted, fontFamily: font,
                background: t.inputBg, padding: '4px 10px', borderRadius: 8,
                border: `1px solid ${t.cardBorder}`,
              } }, '#' + tag)
            ),
          ),

          // Actions
          React.createElement('div', { style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: `1px solid ${t.cardBorder}`, paddingTop: 12,
          } },
            React.createElement('button', {
              onClick: () => toggleLike(item.id),
              style: {
                display: 'flex', alignItems: 'center', gap: 6, background: 'none',
                border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 10,
                transition: 'all 0.2s',
              }
            },
              createIcon(likedItems[item.id] ? icons.Heart : icons.Heart, 18, likedItems[item.id] ? t.cta : t.textMuted),
              React.createElement('span', { style: { fontSize: 14, color: likedItems[item.id] ? t.cta : t.textMuted, fontFamily: font, fontWeight: 600 } },
                item.likes + (likedItems[item.id] ? 1 : 0)
              ),
            ),
            React.createElement('button', {
              style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 10 }
            },
              createIcon(icons.MessageCircle, 18, t.textMuted),
              React.createElement('span', { style: { fontSize: 14, color: t.textMuted, fontFamily: font } }, item.comments),
            ),
            React.createElement('button', {
              style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 10 }
            },
              createIcon(icons.Shuffle, 18, t.textMuted),
              React.createElement('span', { style: { fontSize: 14, color: t.textMuted, fontFamily: font } }, item.remixes),
            ),
            React.createElement('button', {
              style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 10 }
            }, createIcon(icons.Bookmark, 18, t.textMuted)),
          ),
        )
      ),
    );
  }

  // ==================== PROFILE SCREEN ====================
  function ProfileScreen() {
    const stats = [
      { label: 'Forges', value: '47', icon: icons.Hammer },
      { label: 'Followers', value: '1.2K', icon: icons.Users },
      { label: 'XP', value: '2,840', icon: icons.Zap },
      { label: 'Streak', value: '12d', icon: icons.Flame },
    ];

    const badges = [
      { label: 'First Forge', color: '#F59E0B', icon: icons.Award },
      { label: 'Streak Master', color: '#EF4444', icon: icons.Flame },
      { label: 'Science Guru', color: '#8B5CF6', icon: icons.Atom },
      { label: 'Community Star', color: '#10B981', icon: icons.Star },
      { label: 'Remix King', color: '#EC4899', icon: icons.Shuffle },
    ];

    const myForges = [
      { title: 'DNA Replication Dance', type: 'Animation', views: 342, likes: 58 },
      { title: 'Keynesian Economics Map', type: 'Infographic', views: 128, likes: 24 },
      { title: 'Neural Networks Song', type: 'Mnemonic', views: 891, likes: 156 },
      { title: 'French Revolution Timeline', type: 'Timeline', views: 210, likes: 37 },
    ];

    const cognitiveProfile = [
      { skill: 'Visual Thinking', level: 85, color: '#8B5CF6' },
      { skill: 'Musical Memory', level: 62, color: '#EC4899' },
      { skill: 'Narrative Craft', level: 74, color: '#F59E0B' },
      { skill: 'Analytical', level: 91, color: '#10B981' },
      { skill: 'Simulation Design', level: 48, color: '#06B6D4' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      // Profile Header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 24 } },
        React.createElement('div', { style: {
          width: 80, height: 80, borderRadius: 24, margin: '0 auto 14px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `3px solid ${t.cardBorder}`,
          boxShadow: `0 6px 24px ${t.primary}40`,
          fontSize: 28, fontWeight: 800, color: '#FFF', fontFamily: font,
        } }, 'AJ'),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Alex Johnson'),
        React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, 'Level 7 Creator'),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 4 } }, 'Curious mind, visual thinker. Turning complex ideas into memorable experiences.'),
      ),

      // Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 20 } },
        stats.map(s =>
          React.createElement('div', { key: s.label, style: {
            background: t.card, borderRadius: 16, padding: '12px 8px', textAlign: 'center',
            border: `2px solid ${t.cardBorder}`, boxShadow: t.cardShadow,
          } },
            React.createElement('div', { style: { marginBottom: 4, display: 'flex', justifyContent: 'center' } },
              createIcon(s.icon, 16, t.primary)
            ),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font } }, s.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, s.label),
          )
        ),
      ),

      // Badges
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12 } }, 'Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          badges.map((b, i) =>
            React.createElement('div', { key: i, style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 60,
            } },
              React.createElement('div', { style: {
                width: 48, height: 48, borderRadius: 16, background: b.color + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${b.color}40`,
                animation: `float 3s ease-in-out ${i * 0.3}s infinite`,
              } }, createIcon(b.icon, 22, b.color)),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, fontFamily: font, textAlign: 'center', whiteSpace: 'nowrap' } }, b.label),
            )
          ),
        ),
      ),

      // Cognitive Profile
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12 } }, 'Cognitive Profile'),
        React.createElement('div', { style: {
          background: t.card, borderRadius: 18, padding: 16,
          border: `2px solid ${t.cardBorder}`, boxShadow: t.cardShadow,
        } },
          cognitiveProfile.map((cp, i) =>
            React.createElement('div', { key: i, style: { marginBottom: i < cognitiveProfile.length - 1 ? 14 : 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font } }, cp.skill),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: cp.color, fontFamily: font } }, cp.level + '%'),
              ),
              React.createElement('div', { style: {
                height: 8, borderRadius: 4, background: t.inputBg, overflow: 'hidden',
              } },
                React.createElement('div', { style: {
                  width: cp.level + '%', height: '100%', borderRadius: 4,
                  background: `linear-gradient(90deg, ${cp.color}, ${cp.color}CC)`,
                  transition: 'width 1s ease',
                } }),
              ),
            )
          ),
        ),
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 16 } },
        ['forges', 'saved'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setProfileTab(tab),
            style: {
              flex: 1, padding: '10px 0', fontSize: 15, fontWeight: 600, fontFamily: font,
              color: profileTab === tab ? t.primary : t.textMuted,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: `3px solid ${profileTab === tab ? t.primary : t.cardBorder}`,
              transition: 'all 0.2s',
            }
          }, React.createElement('span', null, tab === 'forges' ? 'My Forges' : 'Saved'))
        ),
      ),

      // Forge list
      myForges.map((f, i) =>
        React.createElement('div', { key: i, style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
          background: t.card, borderRadius: 14, marginBottom: 8,
          border: `2px solid ${t.cardBorder}`, cursor: 'pointer',
          animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
        } },
          React.createElement('div', { style: {
            width: 44, height: 44, borderRadius: 12,
            background: t.primary + '15', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${t.primary}25`,
          } }, createIcon(icons.FileText, 18, t.primary)),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, f.title),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, f.type),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 3 } },
              createIcon(icons.Eye, 12, t.textMuted), f.views
            ),
            React.createElement('span', { style: { fontSize: 12, color: t.cta, fontFamily: font, display: 'flex', alignItems: 'center', gap: 3 } },
              createIcon(icons.Heart, 12, t.cta), f.likes
            ),
          ),
        )
      ),

      // Settings button
      React.createElement('button', {
        style: {
          width: '100%', padding: '14px', borderRadius: 14, marginTop: 12,
          background: t.surface, border: `2px solid ${t.cardBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer', fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: font,
        }
      },
        createIcon(icons.Settings, 18, t.textSecondary),
        React.createElement('span', null, 'Settings'),
      ),
    );
  }

  // ==================== CHALLENGES SCREEN ====================
  function ChallengesScreen() {
    const challenges = [
      { id: 'c1', title: 'Explain Cellular Respiration', format: 'As a short film script', category: 'Biology', xp: 200, difficulty: 'Medium', color: '#10B981', icon: icons.Film, timeLeft: '23h', participants: 156 },
      { id: 'c2', title: 'Visualize Blockchain', format: 'As an infographic', category: 'Technology', xp: 250, difficulty: 'Hard', color: '#8B5CF6', icon: icons.Image, timeLeft: '12h', participants: 89 },
      { id: 'c3', title: 'Pythagorean Theorem', format: 'As a musical mnemonic', category: 'Mathematics', xp: 150, difficulty: 'Easy', color: '#EC4899', icon: icons.Music, timeLeft: '2d', participants: 234 },
      { id: 'c4', title: 'World War II Alliances', format: 'As an interactive map', category: 'History', xp: 300, difficulty: 'Hard', color: '#F59E0B', icon: icons.Map, timeLeft: '1d', participants: 112 },
      { id: 'c5', title: 'How DNS Works', format: 'As a comic strip', category: 'Technology', xp: 175, difficulty: 'Medium', color: '#06B6D4', icon: icons.Pen, timeLeft: '3d', participants: 67 },
      { id: 'c6', title: 'Photosynthesis Cycle', format: 'As a micro-simulation', category: 'Biology', xp: 350, difficulty: 'Expert', color: '#EF4444', icon: icons.Play, timeLeft: '5d', participants: 45 },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 } },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: {
            width: 44, height: 44, borderRadius: 14, background: t.surface,
            border: `2px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        }, createIcon(icons.ArrowLeft, 20, t.text)),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Remix Challenges'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, 'Test your creative understanding'),
        ),
      ),

      // Weekly Challenge Banner
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.cta}, #DC2626)`,
          borderRadius: 20, padding: 20, marginBottom: 20,
          border: '3px solid rgba(255,255,255,0.15)',
          boxShadow: `0 6px 24px ${t.cta}40`,
          animation: 'glow 3s ease-in-out infinite',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
          createIcon(icons.Trophy, 18, '#FFF'),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: font, letterSpacing: 1 } }, 'WEEKLY CHALLENGE'),
        ),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: '#FFF', fontFamily: font, marginBottom: 4 } }, 'Explain AI Ethics to a 10-year-old'),
        React.createElement('div', { style: { fontSize: 14, color: 'rgba(255,255,255,0.85)', fontFamily: font, marginBottom: 12 } }, 'Any format. 500 XP prize. 312 entries so far.'),
        React.createElement('button', {
          onClick: () => { setActiveChallenge({ title: 'AI Ethics for Kids', subtitle: 'Any format', type: 'Weekly', difficulty: 'Open', xp: 500, color: t.cta }); setActiveScreen('remix'); },
          style: {
            padding: '10px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.3)', color: '#FFF',
            fontSize: 15, fontWeight: 700, fontFamily: font, cursor: 'pointer',
          }
        }, React.createElement('span', null, 'Enter Challenge')),
      ),

      // Challenge List
      challenges.map((ch, i) =>
        React.createElement('div', {
          key: ch.id,
          onClick: () => { setActiveChallenge(ch); setActiveScreen('remix'); },
          style: {
            background: t.card, borderRadius: 18, padding: 16, marginBottom: 12,
            border: `3px solid ${ch.color}20`, boxShadow: t.cardShadow,
            cursor: 'pointer', transition: 'all 0.2s',
            animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
            React.createElement('div', { style: {
              width: 50, height: 50, borderRadius: 16, background: ch.color + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${ch.color}35`, flexShrink: 0,
            } }, createIcon(ch.icon, 24, ch.color)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: ch.color, background: ch.color + '15', padding: '2px 8px', borderRadius: 6, fontFamily: font } }, ch.category),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, ch.timeLeft + ' left'),
              ),
              React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 2 } }, ch.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginBottom: 8 } }, ch.format),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', { style: {
                    fontSize: 12, fontWeight: 600, fontFamily: font,
                    color: ch.difficulty === 'Easy' ? t.success : ch.difficulty === 'Expert' ? t.danger : ch.difficulty === 'Hard' ? t.cta : t.primary,
                  } }, ch.difficulty),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 3 } },
                    createIcon(icons.Users, 11, t.textMuted), ch.participants
                  ),
                ),
                React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.cta, fontFamily: font } }, '+' + ch.xp + ' XP'),
              ),
            ),
          ),
        )
      ),
    );
  }

  // ==================== SCREEN ROUTER ====================
  const screens = {
    home: HomeScreen,
    library: LibraryScreen,
    remix: RemixScreen,
    community: CommunityScreen,
    profile: ProfileScreen,
    challenges: ChallengesScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'library', label: 'Library', icon: icons.BookOpen },
    { id: 'remix', label: 'Create', icon: icons.Plus, isCenter: true },
    { id: 'community', label: 'Gallery', icon: icons.Users },
    { id: 'profile', label: 'Profile', icon: icons.User },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: font, padding: '20px 0',
    }
  },
    styleTag,

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40,
        background: t.bg, position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingBottom: 90,
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(ActiveScreen),
      ),

      // Notification Toast
      showNotification && React.createElement('div', {
        style: {
          position: 'absolute', top: 16, left: 16, right: 16,
          background: t.surface, borderRadius: 16, padding: '14px 18px',
          border: `2px solid ${t.success}40`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: 10,
          animation: 'slideUp 0.3s ease', zIndex: 100,
        }
      },
        createIcon(icons.CheckCircle, 20, t.success),
        React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, showNotification),
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          padding: '8px 12px 28px', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          backdropFilter: 'blur(20px)',
        }
      },
        navItems.map(item =>
          item.isCenter ?
            React.createElement('button', {
              key: item.id,
              onClick: () => { setActiveChallenge(null); setRemixMode(null); setActiveScreen(item.id); },
              style: {
                width: 52, height: 52, borderRadius: 18,
                background: `linear-gradient(135deg, ${t.cta}, #EA580C)`,
                border: '3px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', marginTop: -20,
                boxShadow: `0 4px 16px ${t.cta}50`,
                transition: 'all 0.2s',
              }
            },
              createIcon(item.icon, 24, '#FFF'),
              React.createElement('span', { style: { position: 'absolute', fontSize: 0 } }, item.label),
            )
          :
            React.createElement('button', {
              key: item.id,
              onClick: () => setActiveScreen(item.id),
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 8px', minWidth: 56, minHeight: 44,
                transition: 'all 0.2s',
              }
            },
              createIcon(item.icon, 22, activeScreen === item.id ? t.primary : t.textMuted),
              React.createElement('span', {
                style: {
                  fontSize: 11, fontWeight: activeScreen === item.id ? 600 : 500,
                  color: activeScreen === item.id ? t.primary : t.textMuted, fontFamily: font,
                }
              }, item.label),
            )
        ),
      ),
    ),
  );
}
