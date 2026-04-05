const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeWeave, setActiveWeave] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [userBadges, setUserBadges] = useState(['Spark Igniter', 'Detail Weaver']);
  const [contributionText, setContributionText] = useState('');
  const [likedItems, setLikedItems] = useState({});
  const [pressedBtn, setPressedBtn] = useState(null);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [toastMsg, setToastMsg] = useState('');

  const themes = {
    light: {
      primary: '#0D9488',
      secondary: '#14B8A6',
      cta: '#F97316',
      bg: '#F0FDFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F0FDFA',
      text: '#0F172A',
      textSecondary: '#475569',
      textTertiary: '#94A3B8',
      border: '#E2E8F0',
      cardShadow: '0 2px 12px rgba(13,148,136,0.08)',
      cardShadowHover: '0 4px 20px rgba(13,148,136,0.15)',
      tabBg: '#FFFFFF',
      navShadow: '0 -1px 12px rgba(0,0,0,0.06)',
    },
    dark: {
      primary: '#14B8A6',
      secondary: '#0D9488',
      cta: '#F97316',
      bg: '#0C1917',
      surface: '#132624',
      surfaceAlt: '#1A332F',
      text: '#F0FDFA',
      textSecondary: '#94A3B8',
      textTertiary: '#64748B',
      border: '#1E3A36',
      cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
      cardShadowHover: '0 4px 20px rgba(20,184,166,0.2)',
      tabBg: '#132624',
      navShadow: '0 -1px 12px rgba(0,0,0,0.3)',
    }
  };

  const t = darkMode ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2000);
  };

  const toggleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleContribute = () => {
    if (!contributionText.trim()) return;
    const newContribution = {
      id: Date.now(),
      user: 'You',
      avatar: 'Y',
      text: contributionText,
      time: 'Just now',
      likes: 0,
      type: 'text'
    };
    setContributions(prev => [newContribution, ...prev]);
    setContributionText('');
    setShowContributeModal(false);
    showToast('Insight contributed!');
  };

  const dailyWeaves = [
    {
      id: 1,
      title: 'Future of Remote Work',
      theme: 'Workplace Innovation',
      participants: 234,
      timeLeft: '4h 23m',
      progress: 0.67,
      color: '#0D9488',
      prompts: [
        'Share one tool that transformed your remote workflow',
        'Describe your ideal hybrid workspace in 3 sentences',
        'What unexpected benefit of remote work have you discovered?'
      ],
      contributions: 156
    },
    {
      id: 2,
      title: 'Sustainable City Design',
      theme: 'Urban Planning',
      participants: 189,
      timeLeft: '6h 10m',
      progress: 0.42,
      color: '#14B8A6',
      prompts: [
        'Name one city feature that promotes walking over driving',
        'How could vertical gardens change urban life?',
        'Share an image concept of your dream sustainable neighborhood'
      ],
      contributions: 89
    },
    {
      id: 3,
      title: 'AI in Creative Arts',
      theme: 'Technology & Creativity',
      participants: 312,
      timeLeft: '2h 45m',
      progress: 0.81,
      color: '#F97316',
      prompts: [
        'Find one unexpected way AI assists musicians',
        'How can AI enhance rather than replace human creativity?',
        'Share a brief story about human-AI artistic collaboration'
      ],
      contributions: 267
    }
  ];

  const foresightFlicks = [
    { id: 1, user: 'Maya R.', avatar: 'M', insight: 'Remote work revealed that most meetings are just emails that could have been—wait, emails that could have been Slack messages that could have been nothing.', weave: 'Future of Remote Work', likes: 47, badge: 'Synthesizer', time: '12m ago' },
    { id: 2, user: 'James K.', avatar: 'J', insight: 'Singapore\'s Supertree Grove shows that infrastructure can be both functional (solar energy, rainwater collection) and awe-inspiring. We need more projects that refuse to choose between utility and beauty.', weave: 'Sustainable City Design', likes: 83, badge: 'Spark Igniter', time: '28m ago' },
    { id: 3, user: 'Lena W.', avatar: 'L', insight: 'AI-generated music stems are allowing bedroom producers to create full orchestral arrangements. The democratization of music production is accelerating faster than anyone predicted.', weave: 'AI in Creative Arts', likes: 61, badge: 'Detail Weaver', time: '45m ago' },
    { id: 4, user: 'Carlos D.', avatar: 'C', insight: 'The most productive remote teams I\'ve studied share one trait: they over-communicate asynchronously and under-schedule synchronous meetings.', weave: 'Future of Remote Work', likes: 92, badge: 'Synthesizer', time: '1h ago' },
    { id: 5, user: 'Aisha T.', avatar: 'A', insight: 'Copenhagen\'s bicycle superhighways reduced commute stress by 40% in test groups. Mental health infrastructure hiding in plain sight.', weave: 'Sustainable City Design', likes: 55, badge: 'Spark Igniter', time: '2h ago' },
  ];

  const sampleContributions = [
    { id: 101, user: 'Priya S.', avatar: 'P', text: 'Notion + Loom combo changed everything. Screen recordings replaced 80% of my meetings.', time: '15m ago', likes: 23, type: 'text' },
    { id: 102, user: 'Tom H.', avatar: 'T', text: 'My ideal hybrid: 2 days in a collaborative hub with whiteboards and good coffee, 3 days from a home office with a standing desk and natural light. No cubicles anywhere.', time: '32m ago', likes: 18, type: 'text' },
    { id: 103, user: 'Rina M.', avatar: 'R', text: 'The unexpected benefit? My rescue dog became my accountability partner. She keeps me on a schedule better than any manager.', time: '1h ago', likes: 45, type: 'text' },
  ];

  const allBadges = [
    { name: 'Synthesizer', desc: 'Connects ideas across contributions', icon: 'Sparkles', color: '#8B5CF6', earned: true },
    { name: 'Spark Igniter', desc: 'Creates ideas others build upon', icon: 'Zap', color: '#F97316', earned: true },
    { name: 'Detail Weaver', desc: 'Adds depth with specific examples', icon: 'Layers', color: '#0D9488', earned: true },
    { name: 'Pattern Finder', desc: 'Identifies recurring themes', icon: 'Search', color: '#EC4899', earned: false },
    { name: 'Bridge Builder', desc: 'Links different Weaves together', icon: 'GitBranch', color: '#3B82F6', earned: false },
    { name: 'First Light', desc: 'Among first to contribute daily', icon: 'Sunrise', color: '#EAB308', earned: false },
  ];

  const userStats = { weaves: 23, contributions: 87, streak: 7, rank: 'Explorer' };

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  // --- SCREENS ---

  function HomeScreen() {
    return React.createElement('div', { style: { padding: '0 0 20px 0', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', margin: 0 } }, 'Insight Weave'),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '2px 0 0' } }, 'Discover & Create Together')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setDarkMode(!darkMode),
            style: { width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('button', {
            onClick: () => setActiveScreen('profile'),
            style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement('span', { style: { color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: font } }, 'S'))
        )
      ),

      // Streak Banner
      React.createElement('div', { style: { margin: '8px 20px 16px', padding: '14px 18px', borderRadius: 16, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(13,148,136,0.25)' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(Icon, { name: 'Flame', size: 24, color: '#FCD34D' }),
          React.createElement('div', null,
            React.createElement('p', { style: { color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: font, margin: 0 } }, '7-Day Streak!'),
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: font, margin: '2px 0 0' } }, 'Keep weaving to unlock new badges')
          )
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '6px 14px' } },
          React.createElement('span', { style: { color: '#fff', fontSize: 22, fontWeight: 800, fontFamily: font } }, '87'),
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: font, marginLeft: 4 } }, 'pts')
        )
      ),

      // Section: Today's Weaves
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', margin: 0 } }, "Today's Weaves"),
          React.createElement('button', { onClick: () => setActiveScreen('explore'), style: { background: 'none', border: 'none', color: t.primary, fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer', padding: '4px 0' } }, 'See All')
        )
      ),

      // Weave Cards (horizontal scroll)
      React.createElement('div', { style: { display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 4px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } },
        dailyWeaves.map((weave, i) =>
          React.createElement('div', {
            key: weave.id,
            onClick: () => { setActiveWeave(weave); setActiveScreen('weaveDetail'); },
            style: {
              minWidth: 260, padding: '18px', borderRadius: 20, background: t.surface, boxShadow: t.cardShadow,
              cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0,
              animation: `slideUp 0.4s ease ${i * 0.1}s both`,
              border: `1px solid ${t.border}`
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: weave.color, background: `${weave.color}15`, padding: '4px 10px', borderRadius: 8, fontFamily: font, textTransform: 'uppercase', letterSpacing: '0.5px' } }, weave.theme),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Clock', size: 14, color: t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, weave.timeLeft)
              )
            ),
            React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 10px', lineHeight: 1.3 } }, weave.title),
            // Progress bar
            React.createElement('div', { style: { height: 6, borderRadius: 3, background: `${weave.color}20`, marginBottom: 12 } },
              React.createElement('div', { style: { height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${weave.color}, ${weave.color}CC)`, width: `${weave.progress * 100}%`, transition: 'width 1s ease' } })
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textSecondary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${weave.participants} weavers`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'MessageCircle', size: 14, color: t.textSecondary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${weave.contributions}`)
              )
            )
          )
        )
      ),

      // Quick Contribute Section
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', margin: '0 0 12px' } }, 'Quick Contribute'),
        React.createElement('div', {
          onClick: () => { setActiveWeave(dailyWeaves[0]); setShowContributeModal(true); },
          style: { padding: '16px 18px', borderRadius: 16, background: t.surface, border: `1.5px dashed ${t.primary}40`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s ease' }
        },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${t.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Plus', size: 22, color: t.primary })
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, 'Share a micro-insight'),
            React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: '2px 0 0' } }, 'Contribute to "Future of Remote Work"')
          )
        )
      ),

      // Trending Insights
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', margin: 0 } }, 'Trending Insights'),
          React.createElement('button', { onClick: () => setActiveScreen('feed'), style: { background: 'none', border: 'none', color: t.primary, fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer' } }, 'More')
        ),
        foresightFlicks.slice(0, 2).map((flick, i) =>
          React.createElement('div', {
            key: flick.id,
            style: {
              padding: '16px', borderRadius: 16, background: t.surface, marginBottom: 10,
              boxShadow: t.cardShadow, border: `1px solid ${t.border}`,
              animation: `slideUp 0.4s ease ${0.3 + i * 0.1}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 16, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('span', { style: { color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: font } }, flick.avatar)
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, flick.user),
                React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, marginLeft: 8 } }, flick.time)
              ),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#8B5CF6', background: '#8B5CF615', padding: '3px 8px', borderRadius: 6, fontFamily: font } }, flick.badge)
            ),
            React.createElement('p', { style: { fontSize: 15, color: t.text, fontFamily: font, lineHeight: 1.5, margin: '0 0 10px' } }, flick.insight),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, flick.weave),
              React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); toggleLike(flick.id); },
                style: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }
              },
                React.createElement(Icon, { name: likedItems[flick.id] ? 'Heart' : 'Heart', size: 16, color: likedItems[flick.id] ? '#EF4444' : t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: likedItems[flick.id] ? '#EF4444' : t.textTertiary, fontFamily: font } }, likedItems[flick.id] ? flick.likes + 1 : flick.likes)
              )
            )
          )
        )
      )
    );
  }

  function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['All', 'Technology', 'Design', 'Science', 'Culture', 'Business'];
    const [activeCategory, setActiveCategory] = useState('All');

    const pastWeaves = [
      { id: 10, title: 'The Psychology of Color in Branding', theme: 'Design', participants: 456, contributions: 389, complete: true, color: '#EC4899' },
      { id: 11, title: 'Quantum Computing for Beginners', theme: 'Science', participants: 278, contributions: 201, complete: true, color: '#3B82F6' },
      { id: 12, title: 'Ethical AI in Healthcare', theme: 'Technology', participants: 523, contributions: 445, complete: false, color: '#8B5CF6' },
      { id: 13, title: 'Street Food Culture Around the World', theme: 'Culture', participants: 612, contributions: 534, complete: true, color: '#EAB308' },
    ];

    return React.createElement('div', { style: { padding: '0 0 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', margin: '0 0 14px' } }, 'Explore'),
        // Search
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 14, background: t.surfaceAlt, border: `1px solid ${t.border}` } },
          React.createElement(Icon, { name: 'Search', size: 18, color: t.textTertiary }),
          React.createElement('input', {
            type: 'text', placeholder: 'Search Weaves, topics, insights...',
            value: searchQuery, onChange: (e) => setSearchQuery(e.target.value),
            style: { background: 'none', border: 'none', outline: 'none', fontSize: 15, color: t.text, fontFamily: font, flex: 1, width: '100%' }
          })
        )
      ),
      // Categories
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto', scrollbarWidth: 'none' } },
        categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setActiveCategory(cat),
            style: {
              padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: activeCategory === cat ? t.primary : t.surfaceAlt,
              color: activeCategory === cat ? '#fff' : t.textSecondary,
              fontSize: 14, fontWeight: 600, fontFamily: font, whiteSpace: 'nowrap',
              transition: 'all 0.2s ease', flexShrink: 0
            }
          }, cat)
        )
      ),

      // Active Weaves
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', margin: '0 0 12px' } }, 'Active Weaves'),
        dailyWeaves.map((weave, i) =>
          React.createElement('div', {
            key: weave.id,
            onClick: () => { setActiveWeave(weave); setActiveScreen('weaveDetail'); },
            style: {
              padding: '16px', borderRadius: 16, background: t.surface, marginBottom: 10,
              boxShadow: t.cardShadow, border: `1px solid ${t.border}`,
              cursor: 'pointer', transition: 'all 0.2s ease',
              display: 'flex', gap: 14, alignItems: 'center',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { width: 50, height: 50, borderRadius: 14, background: `linear-gradient(135deg, ${weave.color}, ${weave.color}AA)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: 'Lightbulb', size: 24, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 4px' } }, weave.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${weave.participants} weavers`),
                React.createElement('span', { style: { fontSize: 13, color: t.cta, fontWeight: 600, fontFamily: font } }, weave.timeLeft + ' left')
              )
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
          )
        ),

        // Completed Weaves
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', margin: '20px 0 12px' } }, 'Past Weaves'),
        pastWeaves.map((weave, i) =>
          React.createElement('div', {
            key: weave.id,
            style: {
              padding: '16px', borderRadius: 16, background: t.surface, marginBottom: 10,
              boxShadow: t.cardShadow, border: `1px solid ${t.border}`,
              cursor: 'pointer', transition: 'all 0.2s ease',
              display: 'flex', gap: 14, alignItems: 'center',
              opacity: weave.complete ? 0.85 : 1,
              animation: `slideUp 0.4s ease ${0.3 + i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { width: 50, height: 50, borderRadius: 14, background: `linear-gradient(135deg, ${weave.color}40, ${weave.color}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: weave.complete ? 'CheckCircle' : 'Lightbulb', size: 24, color: weave.color })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 4px' } }, weave.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${weave.contributions} insights`),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: weave.complete ? '#22C55E' : t.cta, background: weave.complete ? '#22C55E15' : `${t.cta}15`, padding: '2px 8px', borderRadius: 6, fontFamily: font } }, weave.complete ? 'Complete' : 'Active')
              )
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
          )
        )
      )
    );
  }

  function FeedScreen() {
    return React.createElement('div', { style: { padding: '0 0 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', margin: '0 0 4px' } }, 'Foresight Flicks'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: 0 } }, 'Discover the most surprising insights')
      ),
      React.createElement('div', { style: { padding: '0 20px' } },
        foresightFlicks.map((flick, i) =>
          React.createElement('div', {
            key: flick.id,
            style: {
              padding: '18px', borderRadius: 20, background: t.surface, marginBottom: 12,
              boxShadow: t.cardShadow, border: `1px solid ${t.border}`,
              animation: `slideUp 0.4s ease ${i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('span', { style: { color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: font } }, flick.avatar)
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, flick.user),
                React.createElement('p', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, margin: 0 } }, flick.time)
              ),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#8B5CF6', background: '#8B5CF615', padding: '4px 10px', borderRadius: 8, fontFamily: font } }, flick.badge)
            ),
            React.createElement('p', { style: { fontSize: 17, color: t.text, fontFamily: font, lineHeight: 1.55, margin: '0 0 14px' } }, flick.insight),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'Tag', size: 14, color: t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 500, fontFamily: font } }, flick.weave)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
                React.createElement('button', {
                  onClick: () => toggleLike(flick.id),
                  style: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', padding: '6px 10px', borderRadius: 10, transition: 'all 0.15s ease', minWidth: 44, minHeight: 44, justifyContent: 'center' }
                },
                  React.createElement(Icon, { name: 'Heart', size: 18, color: likedItems[flick.id] ? '#EF4444' : t.textTertiary }),
                  React.createElement('span', { style: { fontSize: 14, color: likedItems[flick.id] ? '#EF4444' : t.textTertiary, fontWeight: 600, fontFamily: font } }, likedItems[flick.id] ? flick.likes + 1 : flick.likes)
                ),
                React.createElement('button', {
                  onClick: () => showToast('Insight bookmarked!'),
                  style: { background: 'none', border: 'none', cursor: 'pointer', padding: '6px', minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                }, React.createElement(Icon, { name: 'Bookmark', size: 18, color: t.textTertiary }))
              )
            )
          )
        )
      )
    );
  }

  function WeaveDetailScreen() {
    const weave = activeWeave || dailyWeaves[0];
    const allContribs = [...contributions, ...sampleContributions];

    return React.createElement('div', { style: { padding: '0 0 20px', animation: 'fadeIn 0.3s ease' } },
      // Header
      React.createElement('div', { style: { padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { width: 44, height: 44, borderRadius: 12, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: t.text })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h2', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: 0 } }, weave.title),
          React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: 0 } }, weave.theme)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: `${t.cta}15`, padding: '6px 12px', borderRadius: 10 } },
          React.createElement(Icon, { name: 'Clock', size: 14, color: t.cta }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font } }, weave.timeLeft)
        )
      ),

      // Stats bar
      React.createElement('div', { style: { display: 'flex', gap: 12, padding: '0 20px 16px' } },
        [
          { icon: 'Users', label: `${weave.participants}`, sub: 'Weavers' },
          { icon: 'MessageCircle', label: `${weave.contributions}`, sub: 'Insights' },
          { icon: 'TrendingUp', label: `${Math.round(weave.progress * 100)}%`, sub: 'Complete' },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, padding: '12px', borderRadius: 14, background: t.surfaceAlt, textAlign: 'center', border: `1px solid ${t.border}` } },
            React.createElement(Icon, { name: stat.icon, size: 18, color: t.primary }),
            React.createElement('p', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '4px 0 0' } }, stat.label),
            React.createElement('p', { style: { fontSize: 11, color: t.textTertiary, fontFamily: font, margin: 0 } }, stat.sub)
          )
        )
      ),

      // Prompts
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 10px' } }, 'Contribution Prompts'),
        weave.prompts.map((prompt, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => { setSelectedPromptIdx(i); setShowContributeModal(true); },
            style: {
              padding: '14px 16px', borderRadius: 14, background: selectedPromptIdx === i ? `${t.primary}10` : t.surface,
              border: `1px solid ${selectedPromptIdx === i ? t.primary : t.border}`,
              marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
              transition: 'all 0.2s ease'
            }
          },
            React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: `${weave.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: weave.color, fontFamily: font } }, i + 1)
            ),
            React.createElement('p', { style: { fontSize: 15, color: t.text, fontFamily: font, margin: 0, lineHeight: 1.4, flex: 1 } }, prompt),
            React.createElement(Icon, { name: 'PenLine', size: 16, color: t.primary })
          )
        )
      ),

      // Synthesis Visualization (simple)
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 10px' } }, 'Synthesis Map'),
        React.createElement('div', { style: { padding: '20px', borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}08, ${t.secondary}12)`, border: `1px solid ${t.border}`, position: 'relative', minHeight: 140, overflow: 'hidden' } },
          // Central node
          React.createElement('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 60, height: 60, borderRadius: 30, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${t.primary}40`, animation: 'pulse 2s ease infinite', zIndex: 2 } },
            React.createElement(Icon, { name: 'Sparkles', size: 24, color: '#fff' })
          ),
          // Orbiting nodes
          ...['Productivity', 'Tools', 'Culture', 'Balance', 'Growth'].map((label, i) => {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const radius = 55;
            return React.createElement('div', {
              key: label,
              style: {
                position: 'absolute', top: `calc(50% + ${Math.sin(angle) * radius}px)`, left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                transform: 'translate(-50%,-50%)',
                padding: '4px 10px', borderRadius: 10, background: t.surface, border: `1px solid ${t.border}`,
                fontSize: 11, fontWeight: 600, color: t.textSecondary, fontFamily: font, zIndex: 1,
                boxShadow: t.cardShadow
              }
            }, label);
          })
        )
      ),

      // Contributions
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 10px' } }, 'Recent Contributions'),
        allContribs.map((c, i) =>
          React.createElement('div', {
            key: c.id,
            style: { padding: '14px', borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, marginBottom: 8, animation: `slideUp 0.3s ease ${i * 0.06}s both` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
              React.createElement('div', { style: { width: 30, height: 30, borderRadius: 15, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: font } }, c.avatar)
              ),
              React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font, flex: 1 } }, c.user),
              React.createElement('span', { style: { fontSize: 12, color: t.textTertiary, fontFamily: font } }, c.time)
            ),
            React.createElement('p', { style: { fontSize: 15, color: t.text, fontFamily: font, lineHeight: 1.5, margin: '0 0 8px' } }, c.text),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement('button', {
                onClick: () => toggleLike(c.id),
                style: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 8px', borderRadius: 8, minWidth: 44, minHeight: 44 }
              },
                React.createElement(Icon, { name: 'Heart', size: 15, color: likedItems[c.id] ? '#EF4444' : t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: likedItems[c.id] ? '#EF4444' : t.textTertiary, fontFamily: font } }, likedItems[c.id] ? c.likes + 1 : c.likes)
              )
            )
          )
        )
      ),

      // FAB
      React.createElement('button', {
        onClick: () => setShowContributeModal(true),
        style: {
          position: 'sticky', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          width: 56, height: 56, borderRadius: 28,
          background: `linear-gradient(135deg, ${t.cta}, #FB923C)`,
          border: 'none', boxShadow: `0 6px 20px ${t.cta}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s ease', zIndex: 10
        }
      }, React.createElement(Icon, { name: 'Plus', size: 26, color: '#fff' }))
    );
  }

  function ProfileScreen() {
    return React.createElement('div', { style: { padding: '0 0 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 24px', textAlign: 'center' } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 4px 20px ${t.primary}40` } },
          React.createElement('span', { style: { color: '#fff', fontSize: 32, fontWeight: 800, fontFamily: font } }, 'S')
        ),
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 4px' } }, 'Sarah Chen'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 4px' } }, 'Explorer rank'),
        React.createElement('p', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, margin: 0 } }, 'Weaving insights since March 2026')
      ),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '0 20px 20px' } },
        [
          { label: 'Weaves', value: userStats.weaves, icon: 'Layers' },
          { label: 'Insights', value: userStats.contributions, icon: 'MessageCircle' },
          { label: 'Streak', value: `${userStats.streak}d`, icon: 'Flame' },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, padding: '16px 12px', borderRadius: 16, background: t.surface, textAlign: 'center', boxShadow: t.cardShadow, border: `1px solid ${t.border}`, animation: `slideUp 0.4s ease ${i * 0.1}s both` } },
            React.createElement(Icon, { name: stat.icon, size: 20, color: t.primary }),
            React.createElement('p', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, margin: '6px 0 2px' } }, stat.value),
            React.createElement('p', { style: { fontSize: 12, color: t.textTertiary, fontFamily: font, margin: 0 } }, stat.label)
          )
        )
      ),

      // Badges
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', margin: '0 0 12px' } }, 'Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          allBadges.map((badge, i) =>
            React.createElement('div', {
              key: badge.name,
              style: {
                padding: '16px', borderRadius: 16, background: t.surface, border: `1px solid ${badge.earned ? badge.color + '30' : t.border}`,
                boxShadow: t.cardShadow, opacity: badge.earned ? 1 : 0.5,
                animation: `slideUp 0.4s ease ${i * 0.06}s both`,
                position: 'relative', overflow: 'hidden'
              }
            },
              badge.earned && React.createElement('div', { style: { position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: 9, background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Check', size: 11, color: '#fff' })
              ),
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${badge.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
                React.createElement(Icon, { name: badge.icon, size: 20, color: badge.color })
              ),
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 2px' } }, badge.name),
              React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font, margin: 0, lineHeight: 1.3 } }, badge.desc)
            )
          )
        )
      ),

      // Settings-like section
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', margin: '0 0 12px' } }, 'Settings'),
        [
          { icon: darkMode ? 'Sun' : 'Moon', label: darkMode ? 'Light Mode' : 'Dark Mode', action: () => setDarkMode(!darkMode) },
          { icon: 'Bell', label: 'Notifications', action: () => showToast('Notifications settings') },
          { icon: 'Shield', label: 'Privacy', action: () => showToast('Privacy settings') },
          { icon: 'HelpCircle', label: 'Help & Support', action: () => showToast('Help center') },
        ].map((item, i) =>
          React.createElement('button', {
            key: item.label,
            onClick: item.action,
            style: {
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14, background: t.surface,
              border: `1px solid ${t.border}`, marginBottom: 8, cursor: 'pointer',
              transition: 'all 0.15s ease', textAlign: 'left'
            }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: item.icon, size: 18, color: t.primary })
            ),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 500, color: t.text, fontFamily: font, flex: 1 } }, item.label),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
          )
        )
      )
    );
  }

  // Contribute Modal
  function ContributeModal() {
    if (!showContributeModal) return null;
    const weave = activeWeave || dailyWeaves[0];
    return React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100,
        display: 'flex', alignItems: 'flex-end', animation: 'fadeIn 0.2s ease'
      },
      onClick: (e) => { if (e.target === e.currentTarget) setShowContributeModal(false); }
    },
      React.createElement('div', {
        style: {
          width: '100%', background: t.surface, borderRadius: '24px 24px 0 0',
          padding: '20px', animation: 'slideUp 0.3s ease', maxHeight: '70%', overflowY: 'auto'
        }
      },
        React.createElement('div', { style: { width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 16px' } }),
        React.createElement('h3', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 6px' } }, 'Contribute Insight'),
        React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, margin: '0 0 16px', lineHeight: 1.4 } },
          weave.prompts[selectedPromptIdx]
        ),
        React.createElement('textarea', {
          value: contributionText,
          onChange: (e) => setContributionText(e.target.value),
          placeholder: 'Share your micro-insight...',
          style: {
            width: '100%', height: 120, padding: '14px 16px', borderRadius: 14,
            border: `1.5px solid ${t.border}`, background: t.surfaceAlt,
            fontSize: 15, color: t.text, fontFamily: font, resize: 'none',
            outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s ease'
          },
          onFocus: (e) => e.target.style.borderColor = t.primary,
          onBlur: (e) => e.target.style.borderColor = t.border
        }),
        React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 14 } },
          React.createElement('button', {
            onClick: () => setShowContributeModal(false),
            style: { flex: 1, padding: '14px', borderRadius: 14, border: `1px solid ${t.border}`, background: t.surface, fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: font, cursor: 'pointer', minHeight: 48 }
          }, 'Cancel'),
          React.createElement('button', {
            onClick: handleContribute,
            style: {
              flex: 2, padding: '14px', borderRadius: 14, border: 'none',
              background: contributionText.trim() ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.border,
              fontSize: 15, fontWeight: 700, color: contributionText.trim() ? '#fff' : t.textTertiary,
              fontFamily: font, cursor: contributionText.trim() ? 'pointer' : 'default',
              minHeight: 48, transition: 'all 0.2s ease'
            }
          }, 'Contribute')
        )
      )
    );
  }

  // Toast
  function Toast() {
    if (!toastMsg) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
        padding: '10px 20px', borderRadius: 12, background: t.text,
        color: t.bg, fontSize: 14, fontWeight: 600, fontFamily: font,
        zIndex: 200, animation: 'fadeIn 0.2s ease', boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
      }
    }, toastMsg);
  }

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    feed: FeedScreen,
    weaveDetail: WeaveDetailScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'feed', icon: 'Sparkles', label: 'Flicks' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const currentScreen = activeScreen === 'weaveDetail' ? 'home' : activeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0', fontFamily: font }
  },
    // Style tag for animations
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
        0%, 100% { box-shadow: 0 4px 16px rgba(13,148,136,0.4); }
        50% { box-shadow: 0 4px 28px rgba(13,148,136,0.65); }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
      textarea::placeholder { color: #94A3B8; }
      input::placeholder { color: #94A3B8; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, background: t.bg,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column'
      }
    },
      // Content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 8, paddingBottom: 80, scrollbarWidth: 'none' }
      },
        React.createElement(screens[activeScreen] || HomeScreen)
      ),

      // Contribute Modal
      React.createElement(ContributeModal),

      // Toast
      React.createElement(Toast),

      // Bottom Nav
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.tabBg, boxShadow: t.navShadow,
          padding: '8px 16px 24px', display: 'flex', justifyContent: 'space-around',
          borderTop: `1px solid ${t.border}`,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)'
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '6px 16px', borderRadius: 12, minWidth: 56, minHeight: 44,
              transition: 'all 0.2s ease',
              opacity: currentScreen === item.id ? 1 : 0.5
            }
          },
            React.createElement(Icon, {
              name: item.icon, size: 22,
              color: currentScreen === item.id ? t.primary : t.textSecondary
            }),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: currentScreen === item.id ? 700 : 500,
                color: currentScreen === item.id ? t.primary : t.textSecondary,
                fontFamily: font
              }
            }, item.label)
          )
        )
      )
    )
  );
}
