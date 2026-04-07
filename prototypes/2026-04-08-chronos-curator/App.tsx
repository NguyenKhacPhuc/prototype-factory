const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animateIn, setAnimateIn] = useState(true);
  const [activeEcho, setActiveEcho] = useState(0);
  const [completedEchoes, setCompletedEchoes] = useState([0, 1, 2]);
  const [activeArc, setActiveArc] = useState(null);
  const [showWisdom, setShowWisdom] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);

  const themes = {
    dark: {
      bg: '#0F172A',
      surface: '#1E293B',
      surfaceAlt: '#334155',
      card: '#1E293B',
      cardHover: '#273548',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaHover: '#EA580C',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#334155',
      overlay: 'rgba(15,23,42,0.85)',
      gradient1: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
      gradient3: 'linear-gradient(135deg, #059669 0%, #2563EB 100%)',
      shadow: '0 4px 24px rgba(0,0,0,0.4)',
      shadowSm: '0 2px 8px rgba(0,0,0,0.3)',
    },
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F5F9',
      card: '#FFFFFF',
      cardHover: '#F1F5F9',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaHover: '#EA580C',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      border: '#E2E8F0',
      overlay: 'rgba(248,250,252,0.85)',
      gradient1: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
      gradient3: 'linear-gradient(135deg, #059669 0%, #2563EB 100%)',
      shadow: '0 4px 24px rgba(0,0,0,0.08)',
      shadowSm: '0 2px 8px rgba(0,0,0,0.05)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 30);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const icons = window.lucide || {};

  const LucideIcon = ({ name, size = 24, color, style = {} }) => {
    const iconRef = useRef(null);
    useEffect(() => {
      if (iconRef.current && icons[name]) {
        iconRef.current.innerHTML = '';
        const svg = icons[name];
        if (typeof svg === 'function') {
          // lucide-react style
        } else if (svg) {
          const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          el.setAttribute('width', size);
          el.setAttribute('height', size);
          el.setAttribute('viewBox', '0 0 24 24');
          el.setAttribute('fill', 'none');
          el.setAttribute('stroke', color || t.text);
          el.setAttribute('stroke-width', '2');
          el.setAttribute('stroke-linecap', 'round');
          el.setAttribute('stroke-linejoin', 'round');
          el.innerHTML = typeof svg === 'string' ? svg : '';
          iconRef.current.appendChild(el);
        }
      }
    }, [name, size, color, isDark]);
    return React.createElement('span', { ref: iconRef, style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style } });
  };

  const Icon = ({ name, size = 24, color, style = {} }) => {
    const iconMap = {
      'sun': 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 6a6 6 0 100 12 6 6 0 000-12z',
      'moon': 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
      'home': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10',
      'compass': 'M12 2a10 10 0 100 20 10 10 0 000-20z M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
      'image': 'M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M21 15l-5-5L5 21',
      'book-open': 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z',
      'user': 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z',
      'camera': 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z M12 13a4 4 0 100-8 4 4 0 000 8z',
      'clock': 'M12 2a10 10 0 100 20 10 10 0 000-20z M12 6v6l4 2',
      'award': 'M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
      'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      'zap': 'M13 2L3 14h9l-1 10 10-12h-9l1-10z',
      'leaf': 'M11 20A7 7 0 019.8 6.9C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
      'sparkles': 'M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.962 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.582a.5.5 0 010 .962L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.962 0z M20 3v4 M22 5h-4',
      'trophy': 'M6 9H4.5a2.5 2.5 0 010-5H6 M18 9h1.5a2.5 2.5 0 000-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 1012 0V2z',
      'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z',
      'check': 'M20 6L9 17l-5-5',
      'chevron-right': 'M9 18l6-6-6-6',
      'chevron-left': 'M15 18l-6-6 6-6',
      'lock': 'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4',
      'gift': 'M20 12v10H4V12 M2 7h20v5H2V7z M12 22V7 M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z',
      'flame': 'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
      'mountain': 'M8 3l4 8 5-5 7 14H2L8 3z',
      'snowflake': 'M2 12h20 M12 2v20 M20 16l-4-4 4-4 M4 8l4 4-4 4 M16 4l-4 4-4-4 M8 20l4-4 4 4',
      'palette': 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z M7.5 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M12 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M16.5 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M9 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
      'settings': 'M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z M12 8a4 4 0 100 8 4 4 0 000-8z',
      'filter': 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
    };

    const path = iconMap[name] || iconMap['star'];
    const paths = path.split(' M').map((p, i) => i === 0 ? p : 'M' + p);

    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color || t.text,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }
    }, paths.map((d, i) => React.createElement('path', { key: i, d })));
  };

  // Data
  const currentEcho = {
    title: 'Golden Hour Silhouettes',
    description: 'Find a silhouette against the setting sun and learn about ancient solstice rituals practiced by civilizations around the world.',
    category: 'Spring Equinox',
    difficulty: 'Moderate',
    timeLeft: '3 days',
    xp: 120,
    wisdomTeaser: 'Did you know? The Stonehenge alignment...',
  };

  const weeklyEchoes = [
    { title: 'First Bloom Watch', desc: 'Capture the first spring flower you spot', done: true, xp: 80 },
    { title: 'Rain Patterns', desc: 'Photograph rain on different surfaces', done: true, xp: 60 },
    { title: 'Golden Hour Silhouettes', desc: 'Silhouette against the setting sun', done: false, xp: 120, active: true },
    { title: 'Budding Branches', desc: 'Document tree buds opening this week', done: false, xp: 90 },
  ];

  const arcs = [
    { name: 'Spring Awakening', progress: 65, total: 8, completed: 5, color: '#059669', icon: 'leaf', locked: false },
    { name: 'Harvest Moon Mysteries', progress: 0, total: 6, completed: 0, color: '#F97316', icon: 'moon', locked: true },
    { name: 'Solstice Seekers', progress: 30, total: 10, completed: 3, color: '#2563EB', icon: 'sun', locked: false },
    { name: 'Winter Whispers', progress: 0, total: 7, completed: 0, color: '#8B5CF6', icon: 'snowflake', locked: true },
  ];

  const badges = [
    { name: 'Dawn Watcher', desc: 'Captured 5 sunrises', earned: true, icon: 'sun' },
    { name: 'Petal Scholar', desc: 'Completed Bloom series', earned: true, icon: 'leaf' },
    { name: 'Storm Chaser', desc: 'Captured 3 weather events', earned: false, icon: 'zap' },
    { name: 'Night Owl', desc: 'Moon phase documentation', earned: false, icon: 'moon' },
    { name: 'Trailblazer', desc: 'Visited 10 unique locations', earned: true, icon: 'map-pin' },
    { name: 'Flame Keeper', desc: '7-day observation streak', earned: false, icon: 'flame' },
  ];

  const chronicleEntries = [
    { title: 'Cherry Blossom Rain', date: 'Apr 5, 2026', arc: 'Spring Awakening', img: 1, wisdom: 'Cherry blossoms (sakura) have been celebrated in Japanese culture for over 1,000 years, symbolizing the ephemeral nature of life.' },
    { title: 'Morning Dew Crystals', date: 'Apr 3, 2026', arc: 'Spring Awakening', img: 2, wisdom: 'Dew forms through a process called nucleation, where water vapor condenses on cool surfaces as temperatures drop overnight.' },
    { title: 'Sunset Over the Ridge', date: 'Mar 30, 2026', arc: 'Solstice Seekers', img: 3, wisdom: 'Red sunsets occur because longer wavelengths of light are scattered less by the atmosphere, a phenomenon called Rayleigh scattering.' },
    { title: 'First Robin of Spring', date: 'Mar 26, 2026', arc: 'Spring Awakening', img: 4, wisdom: 'American Robins were named by early colonists after the European Robin due to their similar red breast, though the two species are not closely related.' },
    { title: 'Ice Crystals on Glass', date: 'Mar 20, 2026', arc: 'Solstice Seekers', img: 5, wisdom: 'Frost patterns on windows form through a process called desublimation, where water vapor transitions directly from gas to solid ice crystals.' },
    { title: 'Cloud Formations', date: 'Mar 15, 2026', arc: 'Solstice Seekers', img: 6, wisdom: 'Luke Howard first classified clouds in 1802 into three main types: cumulus, stratus, and cirrus, from the Latin for heap, layer, and curl of hair.' },
  ];

  const placeholderGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  ];

  const wisdomWeaves = [
    { fact: 'The ancient Egyptians oriented the Great Pyramid of Giza to align with the spring equinox, when day and night are nearly equal in length.', source: 'Archaeoastronomy' },
    { fact: 'Impressionist painters like Claude Monet deliberately painted the same scenes at different times of day to capture how light transforms perception.', source: 'Art History' },
    { fact: 'The Japanese concept of "Shinrin-yoku" (forest bathing) has been scientifically shown to reduce cortisol levels and boost immune function.', source: 'Environmental Science' },
  ];

  const styleTag = React.createElement('style', {
    dangerouslySetInnerHTML: { __html: `
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
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 8px rgba(37,99,235,0.3); }
        50% { box-shadow: 0 0 20px rgba(37,99,235,0.6); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      .screen-enter { animation: fadeIn 0.35s ease-out forwards; }
      .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .card-hover:hover { transform: translateY(-2px); }
      .card-hover:active { transform: scale(0.98); }
      .btn-press { transition: transform 0.15s ease, opacity 0.15s ease; }
      .btn-press:active { transform: scale(0.95); opacity: 0.85; }
      .tab-active { transition: all 0.25s ease; }
      * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
      ::-webkit-scrollbar { width: 0; height: 0; }
    `}
  });

  // ========== HOME SCREEN ==========
  const HomeScreen = () => {
    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '20px 16px 16px', minHeight: '100%' }
    },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.textSecondary, fontFamily: font, marginBottom: 2 } }, 'Good evening'),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.5px' } }, 'Your Echoes')
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          className: 'btn-press',
          style: { width: 44, height: 44, borderRadius: 22, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${t.border}` }
        }, React.createElement(Icon, { name: isDark ? 'sun' : 'moon', size: 20, color: t.cta }))
      ),

      // Current Echo - Hero Card
      React.createElement('div', {
        className: 'card-hover',
        style: {
          background: t.gradient1,
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(37,99,235,0.3)',
        },
        onClick: () => setShowWisdom(true)
      },
        // Decorative geometric shapes
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, right: 40, width: 70, height: 70, borderRadius: 16, background: 'rgba(255,255,255,0.07)', transform: 'rotate(30deg)' } }),

        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          React.createElement(Icon, { name: 'sparkles', size: 16, color: '#FCD34D' }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#FCD34D', fontFamily: font, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Active Echo'),
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#FFFFFF', fontFamily: font, letterSpacing: '-0.3px', marginBottom: 8 } }, currentEcho.title),
        React.createElement('div', { style: { fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.8)', fontFamily: font, lineHeight: 1.5, marginBottom: 16 } }, currentEcho.description),

        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 12px' } },
            React.createElement(Icon, { name: 'clock', size: 14, color: '#FFFFFF' }),
            React.createElement('span', { style: { fontSize: 13, color: '#FFFFFF', fontFamily: font, fontWeight: 500 } }, currentEcho.timeLeft),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 12px' } },
            React.createElement(Icon, { name: 'zap', size: 14, color: '#FCD34D' }),
            React.createElement('span', { style: { fontSize: 13, color: '#FFFFFF', fontFamily: font, fontWeight: 500 } }, `${currentEcho.xp} XP`),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 12px' } },
            React.createElement(Icon, { name: 'leaf', size: 14, color: '#6EE7B7' }),
            React.createElement('span', { style: { fontSize: 13, color: '#FFFFFF', fontFamily: font, fontWeight: 500 } }, currentEcho.category),
          ),
        ),

        // Capture button
        React.createElement('div', {
          className: 'btn-press',
          style: { marginTop: 20, background: '#FFFFFF', borderRadius: 14, padding: '14px 0', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
          onClick: (e) => { e.stopPropagation(); setShowWisdom(true); }
        },
          React.createElement(Icon, { name: 'camera', size: 20, color: '#2563EB' }),
          React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: '#2563EB', fontFamily: font } }, 'Capture This Echo'),
        ),
      ),

      // Weekly Progress
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, 'This Week'),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: t.cta, fontFamily: font } }, '2 of 4 complete'),
        ),
        // Progress bar
        React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, marginBottom: 16, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '50%', borderRadius: 3, background: t.gradient1, transition: 'width 0.5s ease' } }),
        ),

        weeklyEchoes.map((echo, i) =>
          React.createElement('div', {
            key: i,
            className: 'card-hover',
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: echo.active ? (isDark ? 'rgba(37,99,235,0.12)' : 'rgba(37,99,235,0.06)') : t.surface,
              borderRadius: 14, marginBottom: 8, cursor: 'pointer', border: echo.active ? `1.5px solid ${t.primary}` : `1px solid ${t.border}`,
              transition: 'all 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: echo.done ? '#059669' : echo.active ? t.primary : t.surfaceAlt,
              }
            }, echo.done
              ? React.createElement(Icon, { name: 'check', size: 18, color: '#FFFFFF' })
              : React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: echo.active ? '#FFFFFF' : t.textMuted, fontFamily: font } }, i + 1)
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, echo.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, echo.desc),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 } },
              React.createElement(Icon, { name: 'zap', size: 14, color: t.cta }),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font } }, echo.xp),
            ),
          )
        ),
      ),

      // Arc Progress
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, 'Active Arcs'),
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: 500, color: t.primary, fontFamily: font, cursor: 'pointer' },
            onClick: () => setActiveScreen('explore')
          }, 'See all'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, marginRight: -16 } },
          arcs.filter(a => !a.locked).map((arc, i) =>
            React.createElement('div', {
              key: i,
              className: 'card-hover',
              style: { minWidth: 150, background: t.surface, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`, cursor: 'pointer' },
              onClick: () => setActiveScreen('explore')
            },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${arc.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 } },
                React.createElement(Icon, { name: arc.icon, size: 22, color: arc.color })
              ),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } }, arc.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginBottom: 10 } }, `${arc.completed}/${arc.total} echoes`),
              React.createElement('div', { style: { height: 4, borderRadius: 2, background: t.surfaceAlt, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${arc.progress}%`, borderRadius: 2, background: arc.color } })
              ),
            )
          )
        ),
      ),
    );
  };

  // ========== CHRONICLE SCREEN ==========
  const ChronicleScreen = () => {
    const [selectedEntry, setSelectedEntry] = useState(null);

    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '20px 16px 16px', minHeight: '100%' }
    },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', marginBottom: 6 } }, 'Chronicle'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 20 } }, 'Your visual & intellectual diary'),

      // Stats bar
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        [{ label: 'Echoes', value: '24', icon: 'sparkles' }, { label: 'Streak', value: '12d', icon: 'flame' }, { label: 'Badges', value: '5', icon: 'award' }].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, background: t.surface, borderRadius: 14, padding: '14px 12px', textAlign: 'center', border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 } },
              React.createElement(Icon, { name: stat.icon, size: 16, color: t.cta }),
              React.createElement('span', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font } }, stat.value),
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, stat.label),
          )
        )
      ),

      // Filter pills
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
        ['All', 'Spring Awakening', 'Solstice Seekers'].map((filter, i) =>
          React.createElement('div', {
            key: i,
            className: 'btn-press',
            style: {
              padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer', whiteSpace: 'nowrap',
              background: i === 0 ? t.primary : 'transparent', color: i === 0 ? '#FFFFFF' : t.textSecondary,
              border: i === 0 ? 'none' : `1px solid ${t.border}`,
            }
          }, filter)
        )
      ),

      // Masonry-ish gallery
      selectedEntry !== null ? (
        // Detail view
        React.createElement('div', {
          className: 'screen-enter',
          style: { animation: 'fadeIn 0.3s ease' }
        },
          React.createElement('div', {
            className: 'btn-press',
            onClick: () => setSelectedEntry(null),
            style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, cursor: 'pointer', color: t.primary, fontSize: 15, fontWeight: 500, fontFamily: font }
          },
            React.createElement(Icon, { name: 'chevron-left', size: 18, color: t.primary }),
            'Back to Gallery'
          ),
          React.createElement('div', {
            style: { width: '100%', height: 260, borderRadius: 20, background: placeholderGradients[selectedEntry], marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            React.createElement(Icon, { name: 'image', size: 48, color: 'rgba(255,255,255,0.4)' })
          ),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px', marginBottom: 4 } }, chronicleEntries[selectedEntry].title),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginBottom: 16 } }, `${chronicleEntries[selectedEntry].date} \u00B7 ${chronicleEntries[selectedEntry].arc}`),

          // Wisdom Weave section
          React.createElement('div', {
            style: { background: isDark ? 'rgba(249,115,22,0.1)' : 'rgba(249,115,22,0.06)', borderRadius: 16, padding: 20, border: `1px solid ${isDark ? 'rgba(249,115,22,0.2)' : 'rgba(249,115,22,0.15)'}` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
              React.createElement(Icon, { name: 'book-open', size: 18, color: t.cta }),
              React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.cta, fontFamily: font } }, 'Wisdom Weave'),
            ),
            React.createElement('div', { style: { fontSize: 15, color: t.text, fontFamily: font, lineHeight: 1.6 } }, chronicleEntries[selectedEntry].wisdom),
          ),
        )
      ) : (
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          chronicleEntries.map((entry, i) =>
            React.createElement('div', {
              key: i,
              className: 'card-hover',
              onClick: () => setSelectedEntry(i),
              style: {
                borderRadius: 16, overflow: 'hidden', cursor: 'pointer', background: t.surface, border: `1px solid ${t.border}`,
                gridRow: i % 3 === 0 ? 'span 2' : 'span 1',
              }
            },
              React.createElement('div', {
                style: { width: '100%', height: i % 3 === 0 ? 180 : 120, background: placeholderGradients[i % 6], display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }
              },
                React.createElement(Icon, { name: 'image', size: 32, color: 'rgba(255,255,255,0.3)' }),
              ),
              React.createElement('div', { style: { padding: '12px 12px 14px' } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4, lineHeight: 1.3 } }, entry.title),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, entry.date),
              ),
            )
          )
        )
      ),
    );
  };

  // ========== EXPLORE SCREEN ==========
  const ExploreScreen = () => {
    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '20px 16px 16px', minHeight: '100%' }
    },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', marginBottom: 6 } }, 'Explore'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 24 } }, 'Seasonal arcs & lore badges'),

      // Seasonal Arcs
      React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Seasonal Arcs'),
      arcs.map((arc, i) =>
        React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: {
            background: t.surface, borderRadius: 16, padding: 18, marginBottom: 12, border: `1px solid ${t.border}`,
            cursor: arc.locked ? 'default' : 'pointer', opacity: arc.locked ? 0.5 : 1, position: 'relative', overflow: 'hidden',
          },
          onClick: () => !arc.locked && setActiveArc(activeArc === i ? null : i)
        },
          arc.locked && React.createElement('div', { style: { position: 'absolute', top: 14, right: 14 } },
            React.createElement(Icon, { name: 'lock', size: 16, color: t.textMuted })
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            React.createElement('div', {
              style: { width: 52, height: 52, borderRadius: 16, background: `${arc.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
            },
              React.createElement(Icon, { name: arc.icon, size: 28, color: arc.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 2 } }, arc.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginBottom: 8 } },
                arc.locked ? 'Complete Spring Awakening to unlock' : `${arc.completed} of ${arc.total} echoes completed`
              ),
              React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${arc.progress}%`, borderRadius: 3, background: arc.color, transition: 'width 0.6s ease' } })
              ),
            ),
          ),
          activeArc === i && !arc.locked && React.createElement('div', {
            style: { marginTop: 16, paddingTop: 16, borderTop: `1px solid ${t.border}`, animation: 'fadeIn 0.3s ease' }
          },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 10 } }, 'Arc Echoes'),
            [0, 1, 2].map(j =>
              React.createElement('div', { key: j, style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
                React.createElement('div', {
                  style: { width: 28, height: 28, borderRadius: 14, background: j < arc.completed ? '#059669' : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                }, j < arc.completed ? React.createElement(Icon, { name: 'check', size: 14, color: '#FFF' }) : null),
                React.createElement('span', { style: { fontSize: 14, color: j < arc.completed ? t.textSecondary : t.text, fontFamily: font, textDecoration: j < arc.completed ? 'line-through' : 'none' } },
                  ['Morning Light Study', 'Flora Documentation', 'Weather Patterns'][j]
                )
              )
            )
          ),
        )
      ),

      // Lore Badges
      React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 14, marginTop: 24 } }, 'Lore Badges'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 } },
        badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            className: 'card-hover',
            style: {
              background: t.surface, borderRadius: 16, padding: '18px 10px', textAlign: 'center', border: `1px solid ${t.border}`,
              cursor: 'pointer', opacity: badge.earned ? 1 : 0.45,
            }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 26, margin: '0 auto 10px',
                background: badge.earned ? (isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.08)') : t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: badge.earned ? '0 0 12px rgba(249,115,22,0.2)' : 'none',
              }
            },
              React.createElement(Icon, { name: badge.icon, size: 24, color: badge.earned ? t.cta : t.textMuted })
            ),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 2 } }, badge.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, lineHeight: 1.3 } }, badge.desc),
          )
        )
      ),
    );
  };

  // ========== PROFILE SCREEN ==========
  const ProfileScreen = () => {
    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '20px 16px 16px', minHeight: '100%' }
    },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', marginBottom: 24 } }, 'Profile'),

      // Avatar + info
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 } },
        React.createElement('div', {
          style: { width: 72, height: 72, borderRadius: 36, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }
        },
          React.createElement(Icon, { name: 'user', size: 32, color: '#FFFFFF' })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.3px' } }, 'Alex Chen'),
          React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, 'Seasonal Observer since Mar 2026'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 } },
            React.createElement('div', { style: { padding: '3px 10px', borderRadius: 12, background: isDark ? 'rgba(5,150,105,0.15)' : 'rgba(5,150,105,0.08)', fontSize: 12, fontWeight: 600, color: '#059669', fontFamily: font } }, 'Level 7'),
            React.createElement('div', { style: { padding: '3px 10px', borderRadius: 12, background: isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.08)', fontSize: 12, fontWeight: 600, color: t.cta, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'flame', size: 12, color: t.cta }),
              '12 day streak'
            ),
          ),
        ),
      ),

      // XP Progress
      React.createElement('div', {
        style: { background: t.surface, borderRadius: 16, padding: 18, marginBottom: 16, border: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, 'Season XP'),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.primary, fontFamily: font } }, '1,840 / 2,500'),
        ),
        React.createElement('div', { style: { height: 8, borderRadius: 4, background: t.surfaceAlt, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '73%', borderRadius: 4, background: t.gradient1 } })
        ),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 8 } }, '660 XP to reach Level 8'),
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 } },
        [
          { label: 'Total Echoes', value: '24', icon: 'sparkles', color: t.primary },
          { label: 'Lore Badges', value: '5', icon: 'award', color: t.cta },
          { label: 'Arcs Completed', value: '1', icon: 'trophy', color: '#059669' },
          { label: 'Wisdom Weaves', value: '18', icon: 'book-open', color: '#8B5CF6' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.surface, borderRadius: 16, padding: 18, border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${stat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
              React.createElement(Icon, { name: stat.icon, size: 22, color: stat.color })
            ),
            React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: '-0.5px' } }, stat.value),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, stat.label),
          )
        )
      ),

      // Settings section
      React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 12 } }, 'Settings'),
      [
        { label: 'Appearance', desc: isDark ? 'Dark mode' : 'Light mode', icon: isDark ? 'moon' : 'sun', action: () => setIsDark(!isDark) },
        { label: 'Aesthetic Enhancers', desc: '3 filters unlocked', icon: 'palette', action: null },
        { label: 'Notifications', desc: 'Echo reminders on', icon: 'clock', action: null },
        { label: 'Location', desc: 'Pacific Northwest', icon: 'map-pin', action: null },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: t.surface, borderRadius: 14, marginBottom: 8,
            border: `1px solid ${t.border}`, cursor: 'pointer',
          },
          onClick: item.action
        },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: item.icon, size: 20, color: t.textSecondary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.text, fontFamily: font } }, item.label),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, item.desc),
          ),
          React.createElement(Icon, { name: 'chevron-right', size: 18, color: t.textMuted }),
        )
      ),
    );
  };

  // Wisdom Modal
  const WisdomModal = () => {
    if (!showWisdom) return null;
    const w = wisdomWeaves[Math.floor(Math.random() * wisdomWeaves.length)];
    return React.createElement('div', {
      style: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)',
      },
      onClick: () => setShowWisdom(false)
    },
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 24, padding: 28, width: '100%', maxWidth: 320, boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.4s ease',
        },
        onClick: (e) => e.stopPropagation()
      },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 32, background: isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            animation: 'float 3s ease-in-out infinite',
          }
        },
          React.createElement(Icon, { name: 'book-open', size: 32, color: t.cta })
        ),
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font, textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', marginBottom: 8 } }, 'Wisdom Weave'),
        React.createElement('div', { style: { fontSize: 17, fontWeight: 400, color: t.text, fontFamily: font, lineHeight: 1.6, textAlign: 'center', marginBottom: 16 } }, w.fact),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, textAlign: 'center', marginBottom: 24 } }, `Source: ${w.source}`),
        React.createElement('div', {
          className: 'btn-press',
          onClick: () => setShowWisdom(false),
          style: { background: t.primary, borderRadius: 14, padding: '14px 0', textAlign: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#FFFFFF', fontFamily: font }
        }, 'Continue Observing'),
      ),
    );
  };

  const screens = { home: HomeScreen, chronicle: ChronicleScreen, explore: ExploreScreen, profile: ProfileScreen };
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'chronicle', label: 'Chronicle', icon: 'image' },
    { id: 'explore', label: 'Explore', icon: 'compass' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' } },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column',
      }
    },
      // Content area
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }
      },
        React.createElement(screens[activeScreen]),
        React.createElement(WisdomModal),
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '10px 8px 28px',
          background: t.surface, borderTop: `1px solid ${t.border}`, flexShrink: 0,
        }
      },
        navItems.map(item =>
          React.createElement('div', {
            key: item.id,
            className: 'btn-press tab-active',
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              cursor: 'pointer', padding: '6px 16px', borderRadius: 12,
              minWidth: 60, minHeight: 44,
            }
          },
            React.createElement(Icon, {
              name: item.icon, size: 22,
              color: activeScreen === item.id ? t.primary : t.textMuted
            }),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: activeScreen === item.id ? 600 : 400,
                color: activeScreen === item.id ? t.primary : t.textMuted,
                fontFamily: font,
              }
            }, item.label),
          )
        )
      ),
    ),
  );
}
