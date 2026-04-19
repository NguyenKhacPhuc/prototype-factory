const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [ignited, setIgnited] = useState({});
  const [kudos, setKudos] = useState({});
  const [streak, setStreak] = useState(7);
  const [selectedSpark, setSelectedSpark] = useState(null);
  const [activeCircle, setActiveCircle] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);

  const themes = {
    light: {
      bg: '#FDF2F8',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF1F7',
      card: '#FFFFFF',
      cardBorder: 'rgba(236,72,153,0.12)',
      text: '#1A1A2E',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      accent: '#8B5CF6',
      navBg: 'rgba(255,255,255,0.95)',
      navBorder: 'rgba(236,72,153,0.1)',
      streakBg: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
      inputBg: '#F9FAFB',
      shadow: '0 2px 12px rgba(0,0,0,0.08)',
      cardShadow: '0 4px 16px rgba(236,72,153,0.1)',
      overlay: 'rgba(0,0,0,0.3)',
    },
    dark: {
      bg: '#0A0A0F',
      surface: '#12121A',
      surfaceAlt: '#1A1A28',
      card: '#16161F',
      cardBorder: 'rgba(236,72,153,0.15)',
      text: '#F1F1F5',
      textSecondary: '#A0A0B8',
      textMuted: '#6B6B80',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      accent: '#8B5CF6',
      navBg: 'rgba(10,10,15,0.95)',
      navBorder: 'rgba(236,72,153,0.1)',
      streakBg: 'linear-gradient(135deg, #1A0A1A 0%, #0F0A1A 100%)',
      inputBg: '#1E1E2A',
      shadow: '0 2px 12px rgba(0,0,0,0.4)',
      cardShadow: '0 4px 20px rgba(236,72,153,0.08)',
      overlay: 'rgba(0,0,0,0.6)',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const sparks = [
    { id: 1, title: '30-Day Sketch Marathon', category: 'Visual Art', creator: 'Aria Chen', avatar: '🎨', desc: 'One sketch per day for 30 days. Any medium, any subject. Build your daily drawing habit.', participants: 234, deadline: '14 days left', difficulty: 'Beginner', kudosReward: 150 },
    { id: 2, title: 'Micro-Fiction Flash', category: 'Writing', creator: 'Marcus Bell', avatar: '✍️', desc: 'Write a complete story in exactly 100 words. Theme: "The door that shouldn\'t exist."', participants: 89, deadline: '3 days left', difficulty: 'Intermediate', kudosReward: 200 },
    { id: 3, title: 'Sound Collage Challenge', category: 'Music', creator: 'Luna Park', avatar: '🎵', desc: 'Create a 2-minute audio piece using only sounds recorded on your phone today.', participants: 56, deadline: '7 days left', difficulty: 'Advanced', kudosReward: 300 },
    { id: 4, title: 'Reimagine a Classic', category: 'Design', creator: 'Dev Patel', avatar: '🖌️', desc: 'Pick any famous painting and recreate it in your own style using digital tools.', participants: 178, deadline: '10 days left', difficulty: 'Intermediate', kudosReward: 250 },
    { id: 5, title: 'Poetry in Motion', category: 'Writing', creator: 'Sage Rivers', avatar: '📝', desc: 'Write a poem inspired by the last photo you took. Share the photo alongside.', participants: 142, deadline: '5 days left', difficulty: 'Beginner', kudosReward: 120 },
    { id: 6, title: 'One Color World', category: 'Photography', creator: 'Kim Sato', avatar: '📸', desc: 'Capture 5 photos where a single color dominates the frame. Tell a story through hue.', participants: 203, deadline: '8 days left', difficulty: 'Beginner', kudosReward: 180 },
  ];

  const circles = [
    { id: 1, name: 'Ink & Coffee Crew', members: 8, active: true, spark: '30-Day Sketch Marathon', lastActivity: '2 min ago', progress: 72 },
    { id: 2, name: 'Word Weavers', members: 5, active: true, spark: 'Micro-Fiction Flash', lastActivity: '15 min ago', progress: 45 },
    { id: 3, name: 'Pixel Perfect Collective', members: 12, active: false, spark: 'Reimagine a Classic', lastActivity: '1 hour ago', progress: 60 },
  ];

  const chronicle = [
    { id: 1, title: '30-Day Sketch Marathon', completedDate: 'Apr 12', kudosEarned: 150, feedback: 23, category: 'Visual Art' },
    { id: 2, title: 'Haiku Every Hour', completedDate: 'Apr 5', kudosEarned: 200, feedback: 31, category: 'Writing' },
    { id: 3, title: 'Color Theory Deep Dive', completedDate: 'Mar 28', kudosEarned: 180, feedback: 18, category: 'Design' },
    { id: 4, title: 'Sound of Silence', completedDate: 'Mar 15', kudosEarned: 250, feedback: 42, category: 'Music' },
  ];

  const categories = ['All', 'Visual Art', 'Writing', 'Music', 'Design', 'Photography'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleIgnite = (id) => {
    setIgnited(prev => ({ ...prev, [id]: !prev[id] }));
    if (!ignited[id]) setStreak(s => s + 1);
  };

  const toggleKudo = (id) => {
    setKudos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  // Home Screen
  const HomeScreen = () => {
    const greeting = (() => {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning';
      if (h < 17) return 'Good afternoon';
      return 'Good evening';
    })();

    return React.createElement('div', { style: { padding: '20px 20px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, fontWeight: 500, marginBottom: 2 } }, greeting),
          React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Your Spark Deck'),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Streak Card
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`,
        borderRadius: 20, padding: '20px 24px', marginBottom: 24, position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
      } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -40, left: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
          React.createElement(Icon, { name: 'Flame', size: 28, color: '#FFF' }),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500, margin: 0 } }, 'Ignition Streak'),
            React.createElement('p', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#FFF', margin: 0, letterSpacing: -0.5, lineHeight: 1 } }, `${streak} Days`),
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 4 } },
          ...Array.from({ length: 7 }, (_, i) =>
            React.createElement('div', { key: i, style: {
              flex: 1, height: 6, borderRadius: 3,
              background: i < streak % 7 ? '#FFF' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s ease',
            } })
          )
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 0 } }, '1,240 Total Kudos Earned'),
      ),

      // Quick Stats
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 28 } },
        ...[
          { icon: 'Zap', label: 'Active', value: '3', color: t.primary },
          { icon: 'CheckCircle', label: 'Completed', value: '12', color: '#10B981' },
          { icon: 'Users', label: 'Circles', value: '3', color: t.cta },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: {
            flex: 1, background: t.card, borderRadius: 16, padding: '16px 12px', textAlign: 'center',
            border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, transition: 'transform 0.2s ease',
          } },
            React.createElement(Icon, { name: stat.icon, size: 22, color: stat.color, style: { marginBottom: 8 } }),
            React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: 0 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textSecondary, margin: 0, marginTop: 2 } }, stat.label),
          )
        )
      ),

      // Recommended Sparks
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, margin: 0 } }, 'Recommended Sparks'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: { background: 'none', border: 'none', fontFamily: font, fontSize: 14, color: t.primary, fontWeight: 600, cursor: 'pointer', padding: '8px 0' }
        }, React.createElement('span', null, 'See All'))
      ),

      ...sparks.slice(0, 3).map((spark, i) =>
        React.createElement('div', {
          key: spark.id,
          onClick: () => { setSelectedSpark(spark); setActiveScreen('detail'); },
          style: {
            background: t.card, borderRadius: 16, padding: 18, marginBottom: 12,
            border: `1px solid ${t.cardBorder}`, cursor: 'pointer',
            boxShadow: t.cardShadow, transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                React.createElement('span', { style: {
                  fontFamily: font, fontSize: 11, fontWeight: 600, color: t.primary,
                  background: `${t.primary}18`, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 0.5,
                } }, spark.category),
                React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: t.textMuted } }, spark.difficulty),
              ),
              React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, spark.title),
            ),
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); toggleIgnite(spark.id); },
              style: {
                width: 44, height: 44, borderRadius: 22, border: 'none', cursor: 'pointer',
                background: ignited[spark.id] ? t.primary : t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease', transform: ignited[spark.id] ? 'scale(1.1)' : 'scale(1)',
              }
            }, React.createElement(Icon, { name: 'Flame', size: 20, color: ignited[spark.id] ? '#FFF' : t.textMuted }))
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 12px', lineHeight: 1.5 } }, spark.desc),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `${spark.participants}`),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, spark.deadline),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Award', size: 14, color: t.primary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.primary, fontWeight: 600 } }, `${spark.kudosReward} Kudos`),
            ),
          ),
        )
      ),
    );
  };

  // Explore Screen
  const ExploreScreen = () => {
    const [search, setSearch] = useState('');
    const filtered = sparks.filter(s =>
      (selectedCategory === 'All' || s.category === selectedCategory) &&
      (search === '' || s.title.toLowerCase().includes(search.toLowerCase()))
    );

    return React.createElement('div', { style: { padding: '20px 20px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 20px' } }, 'Explore Sparks'),

      // Search
      React.createElement('div', { style: {
        display: 'flex', alignItems: 'center', gap: 10, background: t.inputBg,
        borderRadius: 14, padding: '12px 16px', marginBottom: 20, border: `1px solid ${t.cardBorder}`,
      } },
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
        React.createElement('input', {
          placeholder: 'Search sparks...',
          value: search,
          onChange: (e) => setSearch(e.target.value),
          style: {
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontFamily: font, fontSize: 16, color: t.text,
          }
        }),
      ),

      // Categories
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 } },
        ...categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setSelectedCategory(cat),
            style: {
              padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: font, fontSize: 14, fontWeight: 600,
              background: selectedCategory === cat ? t.primary : t.surfaceAlt,
              color: selectedCategory === cat ? '#FFF' : t.textSecondary,
              transition: 'all 0.2s ease',
            }
          }, cat)
        )
      ),

      // Trending Section
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
        React.createElement(Icon, { name: 'TrendingUp', size: 18, color: t.primary }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, margin: 0 } }, 'Trending Now'),
      ),

      // Horizontal scroll cards
      React.createElement('div', { style: { display: 'flex', gap: 14, overflowX: 'auto', marginBottom: 28, paddingBottom: 8 } },
        ...sparks.slice(3).map((spark, i) =>
          React.createElement('div', {
            key: spark.id,
            onClick: () => { setSelectedSpark(spark); setActiveScreen('detail'); },
            style: {
              minWidth: 200, background: `linear-gradient(135deg, ${t.primary}20 0%, ${t.accent}15 100%)`,
              borderRadius: 16, padding: 18, cursor: 'pointer',
              border: `1px solid ${t.cardBorder}`, transition: 'transform 0.2s ease',
            }
          },
            React.createElement('span', { style: {
              fontFamily: font, fontSize: 11, fontWeight: 600, color: t.cta,
              background: `${t.cta}18`, padding: '3px 10px', borderRadius: 12,
            } }, spark.category),
            React.createElement('h3', { style: { fontFamily: font, fontSize: 16, fontWeight: 700, color: t.text, margin: '10px 0 6px' } }, spark.title),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: 0 } }, `${spark.participants} ignited`),
          )
        )
      ),

      // All Sparks
      React.createElement('h2', { style: { fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, margin: '0 0 16px' } }, 'All Sparks'),

      ...filtered.map((spark, i) =>
        React.createElement('div', {
          key: spark.id,
          onClick: () => { setSelectedSpark(spark); setActiveScreen('detail'); },
          style: {
            display: 'flex', alignItems: 'center', gap: 14, background: t.card,
            borderRadius: 14, padding: 14, marginBottom: 10, cursor: 'pointer',
            border: `1px solid ${t.cardBorder}`, transition: 'all 0.2s ease',
            animation: `slideUp 0.3s ease ${i * 0.05}s both`,
          }
        },
          React.createElement('div', { style: {
            width: 48, height: 48, borderRadius: 14,
            background: `linear-gradient(135deg, ${t.primary}30, ${t.accent}30)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          } },
            React.createElement(Icon, { name: 'Sparkles', size: 22, color: t.primary }),
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('h3', { style: { fontFamily: font, fontSize: 16, fontWeight: 600, color: t.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, spark.title),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '2px 0 0' } }, `${spark.category} · ${spark.deadline}`),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Award', size: 14, color: t.primary }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary } }, spark.kudosReward),
          ),
        )
      ),
    );
  };

  // Circles Screen
  const CirclesScreen = () => {
    return React.createElement('div', { style: { padding: '20px 20px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Accountability'),
        React.createElement('button', { style: {
          width: 44, height: 44, borderRadius: 22, background: t.primary, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(236,72,153,0.4)',
        } },
          React.createElement(Icon, { name: 'Plus', size: 22, color: '#FFF' }),
        ),
      ),

      // Active Circles
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
        React.createElement(Icon, { name: 'Users', size: 18, color: t.primary }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, margin: 0 } }, 'Your Circles'),
      ),

      ...circles.map((circle, i) =>
        React.createElement('div', {
          key: circle.id,
          onClick: () => setActiveCircle(activeCircle === circle.id ? null : circle.id),
          style: {
            background: t.card, borderRadius: 18, padding: 18, marginBottom: 12,
            border: `1px solid ${activeCircle === circle.id ? t.primary : t.cardBorder}`,
            boxShadow: activeCircle === circle.id ? `0 0 0 2px ${t.primary}30` : t.cardShadow,
            cursor: 'pointer', transition: 'all 0.25s ease',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('div', null,
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, circle.name),
                circle.active && React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#10B981', animation: 'pulse 2s infinite' } }),
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: 0 } }, circle.spark),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, circle.members),
            ),
          ),

          // Progress bar
          React.createElement('div', { style: { marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textSecondary } }, 'Group Progress'),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.primary } }, `${circle.progress}%`),
            ),
            React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
              React.createElement('div', { style: {
                height: '100%', borderRadius: 3, width: `${circle.progress}%`,
                background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
                transition: 'width 0.6s ease',
              } }),
            ),
          ),

          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Clock', size: 13, color: t.textMuted }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, `Active ${circle.lastActivity}`),
          ),

          // Expanded content
          activeCircle === circle.id && React.createElement('div', { style: {
            marginTop: 16, paddingTop: 16, borderTop: `1px solid ${t.cardBorder}`,
            animation: 'fadeIn 0.3s ease',
          } },
            React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12 } },
              ...['Update', 'Nudge', 'Share'].map(action =>
                React.createElement('button', {
                  key: action,
                  style: {
                    flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontFamily: font, fontSize: 13, fontWeight: 600,
                    background: action === 'Update' ? t.primary : t.surfaceAlt,
                    color: action === 'Update' ? '#FFF' : t.textSecondary,
                    transition: 'all 0.2s ease',
                  }
                }, action)
              )
            ),
            // Member avatars row
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: -4 } },
              ...Array.from({ length: Math.min(circle.members, 5) }, (_, i) =>
                React.createElement('div', { key: i, style: {
                  width: 32, height: 32, borderRadius: 16,
                  background: `hsl(${280 + i * 30}, 60%, ${isDark ? 35 : 75}%)`,
                  border: `2px solid ${t.card}`, marginLeft: i > 0 ? -8 : 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                } },
                  React.createElement(Icon, { name: 'User', size: 14, color: '#FFF' }),
                )
              ),
              circle.members > 5 && React.createElement('span', { style: {
                fontFamily: font, fontSize: 12, color: t.textMuted, marginLeft: 8,
              } }, `+${circle.members - 5} more`),
            ),
          ),
        )
      ),

      // Join New Circle CTA
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.cta}15, ${t.primary}10)`,
        borderRadius: 18, padding: 24, textAlign: 'center', marginTop: 12,
        border: `1px dashed ${t.cta}40`,
      } },
        React.createElement(Icon, { name: 'UserPlus', size: 32, color: t.cta, style: { marginBottom: 12 } }),
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 6px' } }, 'Find Your People'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 16px' } }, 'Join a circle to stay accountable and get feedback on your creative work.'),
        React.createElement('button', { style: {
          background: t.cta, color: '#FFF', border: 'none', borderRadius: 12,
          padding: '12px 28px', fontFamily: font, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(6,182,212,0.3)',
        } }, 'Browse Circles'),
      ),
    );
  };

  // Profile / Chronicle Screen
  const ProfileScreen = () => {
    const totalKudos = chronicle.reduce((sum, c) => sum + c.kudosEarned, 0);

    return React.createElement('div', { style: { padding: '20px 20px 100px', animation: 'fadeIn 0.4s ease' } },
      // Profile Header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 28 } },
        React.createElement('div', { style: {
          width: 80, height: 80, borderRadius: 40, margin: '0 auto 14px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(236,72,153,0.3)',
        } },
          React.createElement(Icon, { name: 'User', size: 36, color: '#FFF' }),
        ),
        React.createElement('h1', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' } }, 'Alex Rivera'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: 0 } }, 'Multidisciplinary Creative'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 } },
          ...['Visual Art', 'Writing', 'Design'].map(tag =>
            React.createElement('span', { key: tag, style: {
              fontFamily: font, fontSize: 11, fontWeight: 600, color: t.primary,
              background: `${t.primary}15`, padding: '4px 10px', borderRadius: 10,
            } }, tag)
          ),
        ),
      ),

      // Stats Row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 28 } },
        ...[
          { label: 'Kudos', value: totalKudos.toLocaleString(), icon: 'Award', color: t.primary },
          { label: 'Streak', value: `${streak}d`, icon: 'Flame', color: '#F59E0B' },
          { label: 'Sparks', value: chronicle.length, icon: 'Sparkles', color: t.accent },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: {
            flex: 1, background: t.card, borderRadius: 16, padding: '14px 10px', textAlign: 'center',
            border: `1px solid ${t.cardBorder}`,
          } },
            React.createElement(Icon, { name: stat.icon, size: 20, color: stat.color, style: { marginBottom: 6 } }),
            React.createElement('p', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text, margin: 0 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textSecondary, margin: '2px 0 0' } }, stat.label),
          )
        )
      ),

      // Theme Toggle
      React.createElement('div', { style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: t.card, borderRadius: 14, padding: '14px 18px', marginBottom: 20,
        border: `1px solid ${t.cardBorder}`,
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(Icon, { name: isDark ? 'Moon' : 'Sun', size: 18, color: t.primary }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text } }, isDark ? 'Dark Mode' : 'Light Mode'),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 52, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer', position: 'relative',
            background: isDark ? t.primary : '#D1D5DB', transition: 'background 0.3s ease',
          }
        },
          React.createElement('div', { style: {
            width: 24, height: 24, borderRadius: 12, background: '#FFF', position: 'absolute', top: 3,
            left: isDark ? 25 : 3, transition: 'left 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          } }),
        ),
      ),

      // Creative Chronicle
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
        React.createElement(Icon, { name: 'BookOpen', size: 18, color: t.primary }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, margin: 0 } }, 'Creative Chronicle'),
      ),

      ...chronicle.map((item, i) =>
        React.createElement('div', { key: item.id, style: {
          display: 'flex', alignItems: 'center', gap: 14, background: t.card,
          borderRadius: 14, padding: 16, marginBottom: 10,
          border: `1px solid ${t.cardBorder}`, animation: `slideUp 0.3s ease ${i * 0.08}s both`,
        } },
          React.createElement('div', { style: {
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, ${t.primary}25, ${t.cta}20)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          } },
            React.createElement(Icon, { name: 'CheckCircle', size: 22, color: '#10B981' }),
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, item.title),
            React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 4 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, item.completedDate),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.primary, fontWeight: 600 } }, `${item.kudosEarned} Kudos`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(Icon, { name: 'MessageCircle', size: 12, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, item.feedback),
              ),
            ),
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted }),
        )
      ),

      // Share Chronicle Button
      React.createElement('button', { style: {
        width: '100%', padding: '14px 0', borderRadius: 14, border: `2px solid ${t.primary}`,
        background: 'transparent', cursor: 'pointer', marginTop: 8,
        fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'all 0.2s ease',
      } },
        React.createElement(Icon, { name: 'Share2', size: 18, color: t.primary }),
        React.createElement('span', null, 'Share Your Chronicle'),
      ),
    );
  };

  // Spark Detail Screen
  const DetailScreen = () => {
    const spark = selectedSpark || sparks[0];
    return React.createElement('div', { style: { padding: '20px 20px 100px', animation: 'fadeIn 0.3s ease' } },
      // Back button
      React.createElement('button', {
        onClick: () => setActiveScreen('home'),
        style: {
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          cursor: 'pointer', padding: '8px 0', marginBottom: 16,
        }
      },
        React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: t.primary }),
        React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: t.primary, fontWeight: 600 } }, 'Back'),
      ),

      // Hero
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary}20, ${t.accent}15)`,
        borderRadius: 22, padding: 28, marginBottom: 20, textAlign: 'center',
        border: `1px solid ${t.cardBorder}`,
      } },
        React.createElement('div', { style: {
          width: 64, height: 64, borderRadius: 20, margin: '0 auto 16px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(236,72,153,0.3)',
        } },
          React.createElement(Icon, { name: 'Sparkles', size: 30, color: '#FFF' }),
        ),
        React.createElement('span', { style: {
          fontFamily: font, fontSize: 12, fontWeight: 600, color: t.cta,
          background: `${t.cta}18`, padding: '4px 14px', borderRadius: 12,
        } }, spark.category),
        React.createElement('h1', { style: { fontFamily: font, fontSize: 24, fontWeight: 800, color: t.text, margin: '12px 0 8px', letterSpacing: -0.5 } }, spark.title),
        React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: 0 } }, `by ${spark.creator}`),
      ),

      // Details
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 20, marginBottom: 14, border: `1px solid ${t.cardBorder}` } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 10px' } }, 'About this Spark'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, lineHeight: 1.6, margin: 0 } }, spark.desc),
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 } },
        ...[
          { icon: 'Users', label: 'Participants', value: spark.participants, color: t.cta },
          { icon: 'Clock', label: 'Time Left', value: spark.deadline.replace(' left', ''), color: '#F59E0B' },
          { icon: 'Award', label: 'Kudos Reward', value: spark.kudosReward, color: t.primary },
          { icon: 'BarChart3', label: 'Difficulty', value: spark.difficulty, color: t.accent },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 14, padding: 16,
            border: `1px solid ${t.cardBorder}`, textAlign: 'center',
          } },
            React.createElement(Icon, { name: item.icon, size: 20, color: item.color, style: { marginBottom: 8 } }),
            React.createElement('p', { style: { fontFamily: font, fontSize: 18, fontWeight: 800, color: t.text, margin: 0 } }, item.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textSecondary, margin: '2px 0 0' } }, item.label),
          )
        )
      ),

      // Recent Activity
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, marginBottom: 20, border: `1px solid ${t.cardBorder}` } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 14px' } }, 'Recent Submissions'),
        ...[
          { name: 'Taylor K.', time: '2h ago', status: 'Submitted final piece' },
          { name: 'Jordan M.', time: '5h ago', status: 'Shared progress update' },
          { name: 'Sam L.', time: '1d ago', status: 'Joined the spark' },
        ].map((activity, i) =>
          React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
            borderBottom: i < 2 ? `1px solid ${t.cardBorder}` : 'none',
          } },
            React.createElement('div', { style: {
              width: 36, height: 36, borderRadius: 18,
              background: `hsl(${300 + i * 40}, 50%, ${isDark ? 30 : 80}%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            } },
              React.createElement(Icon, { name: 'User', size: 16, color: '#FFF' }),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, margin: 0 } }, activity.name),
              React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: 0 } }, activity.status),
            ),
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, activity.time),
          )
        ),
      ),

      // Ignite CTA
      React.createElement('button', {
        onClick: () => toggleIgnite(spark.id),
        style: {
          width: '100%', padding: '16px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
          background: ignited[spark.id] ? '#10B981' : `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
          fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: ignited[spark.id] ? '0 4px 20px rgba(16,185,129,0.4)' : '0 4px 20px rgba(236,72,153,0.4)',
          transition: 'all 0.3s ease',
        }
      },
        React.createElement(Icon, { name: ignited[spark.id] ? 'CheckCircle' : 'Flame', size: 22, color: '#FFF' }),
        React.createElement('span', null, ignited[spark.id] ? 'Ignited!' : 'Ignite This Spark'),
      ),
    );
  };

  const screens = { home: HomeScreen, explore: ExploreScreen, circles: CirclesScreen, profile: ProfileScreen, detail: DetailScreen };

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'circles', icon: 'Users', label: 'Circles' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
  },
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: 200px 0; }
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      input::placeholder { color: ${t.textMuted}; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: { height: '100%', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }
      },
        React.createElement(screens[activeScreen] || HomeScreen),
      ),

      // Bottom Nav
      activeScreen !== 'detail' && React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.navBorder}`,
          padding: '8px 16px 28px', display: 'flex', justifyContent: 'space-around',
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px',
              minWidth: 44, minHeight: 44, transition: 'all 0.2s ease',
            }
          },
            React.createElement(Icon, {
              name: item.icon, size: 24,
              color: activeScreen === item.id ? t.primary : t.textMuted,
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 10, fontWeight: activeScreen === item.id ? 700 : 500,
                color: activeScreen === item.id ? t.primary : t.textMuted,
              }
            }, item.label),
          )
        )
      ),
    ),
  );
}
