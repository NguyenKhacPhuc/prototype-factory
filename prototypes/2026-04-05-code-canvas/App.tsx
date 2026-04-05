const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const themes = {
    light: {
      bg: '#F8FAFC',
      card: '#FFFFFF',
      cardBorder: '#E2E8F0',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      navBg: '#FFFFFF',
      navBorder: '#E2E8F0',
      surface: '#F1F5F9',
      inputBg: '#F1F5F9',
    },
    dark: {
      bg: '#0F172A',
      card: '#1E293B',
      cardBorder: '#334155',
      text: '#F8FAFC',
      textSecondary: '#CBD5E1',
      textMuted: '#64748B',
      navBg: '#1E293B',
      navBorder: '#334155',
      surface: '#334155',
      inputBg: '#334155',
    },
  };

  const t = darkMode ? themes.dark : themes.light;
  const cta = '#22C55E';
  const accent = '#6366F1';
  const warning = '#F59E0B';

  const screens = {
    home: HomeScreen,
    canvas: CanvasScreen,
    remix: RemixScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Challenges', icon: 'Zap' },
    { id: 'canvas', label: 'Canvas', icon: 'Layers' },
    { id: 'remix', label: 'Remix', icon: 'GitFork' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement(
    'div',
    {
      style: {
        minHeight: '100vh',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"IBM Plex Sans", sans-serif',
        padding: '20px',
      },
    },
    React.createElement(
      'style',
      null,
      `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes shimmer {
        0% { background-position: -400px 0; }
        100% { background-position: 400px 0; }
      }
      @keyframes paintIn {
        from { transform: scale(0); opacity: 0; border-radius: 50%; }
        to { transform: scale(1); opacity: 1; border-radius: 3px; }
      }
      @keyframes streakPop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.18); }
      }
      .screen-anim { animation: fadeIn 0.28s ease forwards; }
      .card-hover { transition: transform 0.18s ease, box-shadow 0.18s ease; cursor: pointer; }
      .card-hover:hover { transform: translateY(-2px); }
      .btn-press { transition: transform 0.1s ease; }
      .btn-press:active { transform: scale(0.95); }
      ::-webkit-scrollbar { display: none; }
    `
    ),
    React.createElement(
      'div',
      {
        style: {
          width: '375px',
          height: '812px',
          background: t.bg,
          borderRadius: '44px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: darkMode
            ? '0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 50px 100px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
        },
      },
      React.createElement(
        'div',
        {
          key: activeScreen,
          className: 'screen-anim',
          style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' },
        },
        React.createElement(screens[activeScreen], {
          t,
          darkMode,
          setDarkMode,
          setActiveScreen,
          cta,
          accent,
          warning,
        })
      ),
      React.createElement(
        'div',
        {
          style: {
            height: '72px',
            background: t.navBg,
            borderTop: `1px solid ${t.navBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: '8px',
            flexShrink: 0,
          },
        },
        navItems.map((item) => {
          const IconComp = window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          return React.createElement(
            'button',
            {
              key: item.id,
              onClick: () => setActiveScreen(item.id),
              className: 'btn-press',
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '6px 14px',
                minWidth: '44px',
                minHeight: '44px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? cta : t.textMuted,
                transition: 'color 0.2s ease',
                justifyContent: 'center',
              },
            },
            React.createElement(IconComp, { size: 20, strokeWidth: isActive ? 2.5 : 1.5 }),
            React.createElement(
              'span',
              {
                style: {
                  fontSize: '10px',
                  fontWeight: isActive ? '700' : '400',
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  lineHeight: 1,
                },
              },
              item.label
            )
          );
        })
      )
    )
  );
}

// ─────────────────────────────────────────
// HOME SCREEN — Daily Brushstroke Challenges
// ─────────────────────────────────────────
function HomeScreen({ t, darkMode, setDarkMode, cta, accent, warning }) {
  const FlameIcon = window.lucide.Flame;
  const ZapIcon = window.lucide.Zap;
  const ClockIcon = window.lucide.Clock;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const StarIcon = window.lucide.Star;
  const UsersIcon = window.lucide.Users;
  const TrophyIcon = window.lucide.Trophy;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const PlayIcon = window.lucide.Play;

  const diffColor = { Easy: '#22C55E', Medium: '#F59E0B', Hard: '#EF4444' };

  const challenges = [
    {
      id: 1,
      title: 'Array Deduplication',
      desc: 'Remove dupes from sorted array in O(n) time, zero extra space.',
      diff: 'Easy',
      lang: 'TypeScript',
      time: '5 min',
      xp: 50,
      solvers: 1247,
      langColor: '#3B82F6',
    },
    {
      id: 2,
      title: 'LRU Cache Micro',
      desc: 'Implement minimal LRU cache — get/put both O(1).',
      diff: 'Medium',
      lang: 'Python',
      time: '12 min',
      xp: 120,
      solvers: 834,
      langColor: '#F59E0B',
    },
    {
      id: 3,
      title: 'Debounce Utility',
      desc: 'Write debounce that delays invocation until after wait ms.',
      diff: 'Easy',
      lang: 'JavaScript',
      time: '8 min',
      xp: 75,
      solvers: 2103,
      langColor: '#EAB308',
    },
  ];

  return React.createElement(
    'div',
    { style: { height: '100%', overflowY: 'auto', background: t.bg } },

    // ── Header ──
    React.createElement(
      'div',
      { style: { padding: '22px 20px 0' } },
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            {
              style: {
                fontSize: '11px',
                color: cta,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '3px',
              },
            },
            'GOOD MORNING'
          ),
          React.createElement(
            'h1',
            {
              style: {
                fontSize: '22px',
                fontWeight: '800',
                fontFamily: '"JetBrains Mono", monospace',
                color: t.text,
                lineHeight: 1.1,
              },
            },
            'alex_dev.tsx'
          )
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '20px',
                padding: '5px 10px',
                animation: 'streakPop 2.5s ease infinite',
              },
            },
            React.createElement(FlameIcon, { size: 13, color: '#F59E0B' }),
            React.createElement(
              'span',
              {
                style: {
                  fontSize: '13px',
                  fontWeight: '800',
                  color: '#F59E0B',
                  fontFamily: '"JetBrains Mono", monospace',
                },
              },
              '14'
            )
          ),
          React.createElement(
            'button',
            {
              onClick: () => setDarkMode(!darkMode),
              style: {
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: `1px solid ${t.cardBorder}`,
                background: t.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: t.textSecondary,
              },
            },
            darkMode
              ? React.createElement(SunIcon, { size: 15 })
              : React.createElement(MoonIcon, { size: 15 })
          )
        )
      ),

      // XP bar
      React.createElement(
        'div',
        {
          style: {
            background: t.card,
            borderRadius: '16px',
            padding: '13px 16px',
            border: `1px solid ${t.cardBorder}`,
            marginBottom: '22px',
            boxShadow: darkMode ? 'none' : '0 1px 4px rgba(0,0,0,0.05)',
          },
        },
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
          React.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
            React.createElement(TrophyIcon, { size: 13, color: '#F59E0B' }),
            React.createElement(
              'span',
              {
                style: {
                  fontSize: '12px',
                  fontWeight: '600',
                  color: t.textSecondary,
                  fontFamily: '"JetBrains Mono", monospace',
                },
              },
              'Level 12 · Craftsman'
            )
          ),
          React.createElement(
            'span',
            {
              style: {
                fontSize: '11px',
                color: cta,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: '700',
              },
            },
            '2,340 / 3,000 XP'
          )
        ),
        React.createElement(
          'div',
          {
            style: { height: '6px', background: t.surface, borderRadius: '3px', overflow: 'hidden' },
          },
          React.createElement('div', {
            style: {
              height: '100%',
              width: '78%',
              background: `linear-gradient(90deg, ${cta} 0%, #16A34A 100%)`,
              borderRadius: '3px',
            },
          })
        )
      )
    ),

    // ── Featured Daily Challenge ──
    React.createElement(
      'div',
      { style: { padding: '0 20px' } },
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' } },
        React.createElement(ZapIcon, { size: 13, color: cta }),
        React.createElement(
          'span',
          {
            style: {
              fontSize: '10px',
              fontWeight: '700',
              color: cta,
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '1.5px',
            },
          },
          "TODAY'S FEATURED BRUSHSTROKE"
        )
      ),

      React.createElement(
        'div',
        {
          className: 'card-hover btn-press',
          style: {
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '22px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(34,197,94,0.18)',
            border: '1px solid rgba(34,197,94,0.22)',
          },
        },
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '130px',
            height: '130px',
            background: 'rgba(34,197,94,0.07)',
            borderRadius: '50%',
          },
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: '-20px',
            left: '30px',
            width: '80px',
            height: '80px',
            background: 'rgba(99,102,241,0.05)',
            borderRadius: '50%',
          },
        }),
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', position: 'relative' } },
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.35)',
                  borderRadius: '8px',
                  padding: '3px 9px',
                  marginBottom: '9px',
                },
              },
              React.createElement(
                'span',
                {
                  style: {
                    fontSize: '10px',
                    fontWeight: '700',
                    color: cta,
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: '0.5px',
                  },
                },
                '✦ DAILY CHALLENGE'
              )
            ),
            React.createElement(
              'h2',
              {
                style: {
                  fontSize: '19px',
                  fontWeight: '800',
                  color: '#F8FAFC',
                  fontFamily: '"JetBrains Mono", monospace',
                  lineHeight: 1.25,
                  marginBottom: '6px',
                },
              },
              'Binary Tree Traversal'
            ),
            React.createElement(
              'p',
              { style: { fontSize: '13px', color: '#94A3B8', lineHeight: 1.55 } },
              'Implement all 3 DFS traversals with minimal code. Elegance score heavily weighted.'
            )
          ),
          React.createElement(
            'div',
            {
              style: {
                background: 'rgba(34,197,94,0.12)',
                borderRadius: '14px',
                padding: '10px 12px',
                textAlign: 'center',
                flexShrink: 0,
                marginLeft: '12px',
              },
            },
            React.createElement(
              'div',
              {
                style: {
                  fontSize: '22px',
                  fontWeight: '800',
                  color: cta,
                  fontFamily: '"JetBrains Mono", monospace',
                  lineHeight: 1,
                },
              },
              '200'
            ),
            React.createElement(
              'div',
              { style: { fontSize: '9px', color: '#475569', fontFamily: '"JetBrains Mono", monospace', marginTop: '2px' } },
              'XP'
            )
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '14px',
              position: 'relative',
            },
          },
          React.createElement(
            'span',
            {
              style: {
                fontSize: '11px',
                fontWeight: '700',
                background: 'rgba(239,68,68,0.18)',
                color: '#EF4444',
                borderRadius: '6px',
                padding: '3px 8px',
              },
            },
            'Hard'
          ),
          React.createElement(
            'span',
            {
              style: {
                fontSize: '11px',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              },
            },
            React.createElement(ClockIcon, { size: 11 }),
            ' 15 min'
          ),
          React.createElement(
            'span',
            {
              style: {
                fontSize: '11px',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              },
            },
            React.createElement(UsersIcon, { size: 11 }),
            ' 421 solved'
          )
        ),
        React.createElement(
          'button',
          {
            className: 'btn-press',
            style: {
              width: '100%',
              padding: '13px',
              background: cta,
              borderRadius: '12px',
              border: 'none',
              color: '#0F172A',
              fontSize: '14px',
              fontWeight: '700',
              fontFamily: '"JetBrains Mono", monospace',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              position: 'relative',
            },
          },
          React.createElement(PlayIcon, { size: 15 }),
          'Start Brushstroke'
        )
      ),

      // ── More Brushstrokes ──
      React.createElement(
        'p',
        {
          style: {
            fontSize: '10px',
            fontWeight: '700',
            color: t.textMuted,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '1.5px',
            marginBottom: '10px',
          },
        },
        'MORE BRUSHSTROKES'
      ),

      challenges.map((ch, i) =>
        React.createElement(
          'div',
          {
            key: ch.id,
            className: 'card-hover btn-press',
            style: {
              background: t.card,
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '10px',
              border: `1px solid ${t.cardBorder}`,
              boxShadow: darkMode ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
              animation: `slideUp 0.3s ease ${i * 0.08}s both`,
            },
          },
          React.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement(
              'div',
              { style: { flex: 1 } },
              React.createElement(
                'div',
                { style: { display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '5px' } },
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '10px',
                      fontWeight: '700',
                      color: diffColor[ch.diff],
                      background: `${diffColor[ch.diff]}18`,
                      borderRadius: '5px',
                      padding: '2px 7px',
                    },
                  },
                  ch.diff
                ),
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '10px',
                      color: ch.langColor,
                      background: `${ch.langColor}14`,
                      borderRadius: '5px',
                      padding: '2px 7px',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontWeight: '600',
                    },
                  },
                  ch.lang
                )
              ),
              React.createElement(
                'h3',
                {
                  style: {
                    fontSize: '14px',
                    fontWeight: '700',
                    color: t.text,
                    fontFamily: '"JetBrains Mono", monospace',
                    marginBottom: '3px',
                  },
                },
                ch.title
              ),
              React.createElement(
                'p',
                { style: { fontSize: '12px', color: t.textSecondary, lineHeight: 1.45 } },
                ch.desc
              ),
              React.createElement(
                'div',
                { style: { display: 'flex', gap: '12px', marginTop: '8px' } },
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '11px',
                      color: t.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    },
                  },
                  React.createElement(ClockIcon, { size: 10 }),
                  ch.time
                ),
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '11px',
                      color: t.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    },
                  },
                  React.createElement(UsersIcon, { size: 10 }),
                  `${ch.solvers.toLocaleString()} solved`
                ),
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '11px',
                      color: cta,
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    },
                  },
                  React.createElement(StarIcon, { size: 10 }),
                  `+${ch.xp} XP`
                )
              )
            ),
            React.createElement(ChevronRightIcon, { size: 16, color: t.textMuted, style: { marginTop: '4px', flexShrink: 0 } })
          )
        )
      ),
      React.createElement('div', { style: { height: '24px' } })
    )
  );
}

// ─────────────────────────────────────────
// CANVAS SCREEN — Shared Masterpiece
// ─────────────────────────────────────────
function CanvasScreen({ t, cta, accent }) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const ZapIcon = window.lucide.Zap;
  const UsersIcon = window.lucide.Users;
  const LayersIcon = window.lucide.Layers;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const EyeIcon = window.lucide.Eye;
  const GitMergeIcon = window.lucide.GitMerge;

  const colorPalette = [
    '#22C55E', '#16A34A', '#15803D',
    '#6366F1', '#4F46E5', '#4338CA',
    '#F59E0B', '#D97706',
    '#06B6D4', '#0891B2',
    '#EC4899',
    '#1E293B', '#334155', '#475569',
  ];

  const gridCells = Array.from({ length: 14 * 12 }, (_, i) => ({
    id: i,
    color: colorPalette[Math.floor((i * 7 + 3) % colorPalette.length)],
    opacity: 0.35 + ((i * 13) % 65) / 100,
    filled: (i * 3 + 7) % 10 > 1,
  }));

  const feed = [
    { user: 'sarah_k', action: 'Patched cache invalidation', lang: 'TypeScript', ago: '2m', dot: '#6366F1' },
    { user: 'devraj_m', action: 'Optimized sort pipeline', lang: 'Python', ago: '5m', dot: '#22C55E' },
    { user: 'lei_x', action: 'Fixed async race handler', lang: 'Go', ago: '11m', dot: '#06B6D4' },
    { user: 'max_w', action: 'Refactored parser module', lang: 'Rust', ago: '18m', dot: '#F59E0B' },
  ];

  const stats = [
    { Icon: UsersIcon, value: '2,847', label: 'Contributors' },
    { Icon: LayersIcon, value: '14,203', label: 'Patches' },
    { Icon: TrendingUpIcon, value: '94%', label: 'Complete' },
  ];

  return React.createElement(
    'div',
    { style: { height: '100%', overflowY: 'auto', background: t.bg } },

    // Header
    React.createElement(
      'div',
      { style: { padding: '22px 20px 14px' } },
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' } },
        React.createElement(
          'h1',
          {
            style: {
              fontSize: '22px',
              fontWeight: '800',
              fontFamily: '"JetBrains Mono", monospace',
              color: t.text,
            },
          },
          'Shared Masterpiece'
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.28)',
              borderRadius: '20px',
              padding: '4px 10px',
            },
          },
          React.createElement('div', {
            style: {
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: cta,
              animation: 'pulse 1.4s ease infinite',
            },
          }),
          React.createElement(
            'span',
            {
              style: {
                fontSize: '10px',
                fontWeight: '700',
                color: cta,
                fontFamily: '"JetBrains Mono", monospace',
              },
            },
            'LIVE'
          )
        )
      ),
      React.createElement(
        'p',
        { style: { fontSize: '13px', color: t.textSecondary } },
        'v0.4.2 · MicroCache Engine'
      )
    ),

    // Stats row
    React.createElement(
      'div',
      { style: { display: 'flex', gap: '10px', padding: '0 20px', marginBottom: '16px' } },
      stats.map(({ Icon, value, label }, i) =>
        React.createElement(
          'div',
          {
            key: i,
            style: {
              flex: 1,
              background: t.card,
              borderRadius: '14px',
              padding: '11px 8px',
              border: `1px solid ${t.cardBorder}`,
              textAlign: 'center',
            },
          },
          React.createElement(Icon, { size: 14, color: cta, style: { margin: '0 auto 5px' } }),
          React.createElement(
            'div',
            {
              style: {
                fontSize: '15px',
                fontWeight: '800',
                color: t.text,
                fontFamily: '"JetBrains Mono", monospace',
              },
            },
            value
          ),
          React.createElement('div', { style: { fontSize: '9px', color: t.textMuted, letterSpacing: '0.5px' } }, label)
        )
      )
    ),

    // Masterpiece grid
    React.createElement(
      'div',
      { style: { padding: '0 20px', marginBottom: '14px' } },
      React.createElement(
        'div',
        {
          style: {
            background: '#0A1628',
            borderRadius: '18px',
            padding: '14px',
            border: '1px solid #1E293B',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          },
        },
        React.createElement(
          'div',
          {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(14, 1fr)',
              gap: '2px',
            },
          },
          gridCells.map((cell, i) =>
            React.createElement('div', {
              key: i,
              onMouseEnter: () => setHoveredCell(i),
              onMouseLeave: () => setHoveredCell(null),
              style: {
                aspectRatio: '1',
                borderRadius: hoveredCell === i ? '5px' : '3px',
                background: cell.filled ? cell.color : 'rgba(255,255,255,0.03)',
                opacity: hoveredCell === i ? 1 : cell.filled ? cell.opacity : 1,
                transform: hoveredCell === i ? 'scale(1.5)' : 'scale(1)',
                transition: 'all 0.15s ease',
                cursor: cell.filled ? 'pointer' : 'default',
                animation: cell.filled ? `paintIn 0.4s ease ${(i % 28) * 0.015}s both` : 'none',
                zIndex: hoveredCell === i ? 10 : 1,
                position: 'relative',
              },
            })
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.55)',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            },
          },
          React.createElement(EyeIcon, { size: 10, color: '#64748B' }),
          React.createElement(
            'span',
            {
              style: { fontSize: '9px', color: '#64748B', fontFamily: '"JetBrains Mono", monospace' },
            },
            'Hover to inspect'
          )
        )
      )
    ),

    // My contribution banner
    React.createElement(
      'div',
      { style: { padding: '0 20px', marginBottom: '16px' } },
      React.createElement(
        'div',
        {
          style: {
            background: darkMode =>
              `linear-gradient(135deg, rgba(34,197,94,0.08), rgba(99,102,241,0.08))`,
            border: '1px solid rgba(34,197,94,0.18)',
            borderRadius: '14px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundImage: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(99,102,241,0.08))',
          },
        },
        React.createElement(
          'div',
          {
            style: {
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: cta,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            },
          },
          React.createElement(ZapIcon, { size: 18, color: '#0F172A' })
        ),
        React.createElement(
          'div',
          { style: { flex: 1 } },
          React.createElement(
            'p',
            {
              style: {
                fontSize: '13px',
                fontWeight: '700',
                color: t.text,
                fontFamily: '"JetBrains Mono", monospace',
                marginBottom: '2px',
              },
            },
            'Your patches: 47 cells'
          ),
          React.createElement(
            'p',
            { style: { fontSize: '11px', color: t.textSecondary } },
            'Rows 3–6 · cache-invalidation module'
          )
        ),
        React.createElement(
          'button',
          {
            className: 'btn-press',
            style: {
              padding: '8px 14px',
              background: cta,
              borderRadius: '10px',
              border: 'none',
              color: '#0F172A',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: '"JetBrains Mono", monospace',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            },
          },
          'View'
        )
      )
    ),

    // Live feed
    React.createElement(
      'div',
      { style: { padding: '0 20px' } },
      React.createElement(
        'p',
        {
          style: {
            fontSize: '10px',
            fontWeight: '700',
            color: t.textMuted,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '1.5px',
            marginBottom: '10px',
          },
        },
        'LIVE ACTIVITY'
      ),
      feed.map((f, i) =>
        React.createElement(
          'div',
          {
            key: i,
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              background: t.card,
              borderRadius: '12px',
              marginBottom: '8px',
              border: `1px solid ${t.cardBorder}`,
              animation: `slideUp 0.3s ease ${i * 0.07}s both`,
            },
          },
          React.createElement('div', {
            style: { width: '8px', height: '8px', borderRadius: '50%', background: f.dot, flexShrink: 0 },
          }),
          React.createElement(
            'div',
            { style: { flex: 1, minWidth: 0 } },
            React.createElement(
              'span',
              {
                style: {
                  fontSize: '12px',
                  fontWeight: '700',
                  color: t.text,
                  fontFamily: '"JetBrains Mono", monospace',
                },
              },
              f.user + ' '
            ),
            React.createElement('span', { style: { fontSize: '12px', color: t.textSecondary } }, f.action)
          ),
          React.createElement(
            'span',
            {
              style: {
                fontSize: '10px',
                color: f.dot,
                background: `${f.dot}14`,
                borderRadius: '5px',
                padding: '2px 6px',
                fontFamily: '"JetBrains Mono", monospace',
                whiteSpace: 'nowrap',
                fontWeight: '600',
              },
            },
            f.lang
          ),
          React.createElement(
            'span',
            { style: { fontSize: '10px', color: t.textMuted, whiteSpace: 'nowrap' } },
            f.ago
          )
        )
      ),
      React.createElement('div', { style: { height: '24px' } })
    )
  );
}

// ─────────────────────────────────────────
// REMIX SCREEN — Community Solutions
// ─────────────────────────────────────────
function RemixScreen({ t, cta, accent }) {
  const [filter, setFilter] = useState('All');
  const [liked, setLiked] = useState([]);
  const SearchIcon = window.lucide.Search;
  const GitForkIcon = window.lucide.GitFork;
  const HeartIcon = window.lucide.Heart;
  const StarIcon = window.lucide.Star;
  const ChevronRightIcon = window.lucide.ChevronRight;

  const filters = ['All', 'TypeScript', 'Python', 'Go', 'Rust'];
  const langColor = { TypeScript: '#3B82F6', Python: '#F59E0B', Go: '#06B6D4', Rust: '#EF4444', JavaScript: '#EAB308' };

  const solutions = [
    {
      id: 1,
      challenge: 'Binary Tree Traversal',
      author: 'sarah_k',
      lang: 'TypeScript',
      elegance: 98,
      forks: 47,
      hearts: 203,
      lines: 12,
      badge: 'Top Elegant',
      badgeColor: '#F59E0B',
      preview: 'const traverse = (node, res=[]) => {\n  if (!node) return res;\n  return [...traverse(node.left),\n    node.val, ...traverse(node.right)];\n};',
    },
    {
      id: 2,
      challenge: 'LRU Cache Micro',
      author: 'devraj_m',
      lang: 'Python',
      elegance: 94,
      forks: 31,
      hearts: 156,
      lines: 18,
      badge: 'Most Forked',
      badgeColor: '#6366F1',
      preview: 'from collections import OrderedDict\n\nclass LRU(OrderedDict):\n  def __init__(self, n): self.n = n\n  def get(self, k):\n    self.move_to_end(k); return super().get(k)',
    },
    {
      id: 3,
      challenge: 'Debounce Utility',
      author: 'max_w',
      lang: 'Go',
      elegance: 91,
      forks: 22,
      hearts: 89,
      lines: 9,
      badge: 'Most Concise',
      badgeColor: '#22C55E',
      preview: 'func Debounce(fn func(), d time.Duration) func() {\n  var t *time.Timer\n  return func() {\n    if t != nil { t.Stop() }\n    t = time.AfterFunc(d, fn)\n  }\n}',
    },
  ];

  return React.createElement(
    'div',
    { style: { height: '100%', overflowY: 'auto', background: t.bg } },

    // Header
    React.createElement(
      'div',
      { style: { padding: '22px 20px 0' } },
      React.createElement(
        'h1',
        {
          style: {
            fontSize: '22px',
            fontWeight: '800',
            fontFamily: '"JetBrains Mono", monospace',
            color: t.text,
            marginBottom: '4px',
          },
        },
        'Remix & Refine'
      ),
      React.createElement(
        'p',
        { style: { fontSize: '13px', color: t.textSecondary, marginBottom: '16px' } },
        'Fork community solutions · propose better ones'
      ),

      // Search
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: t.card,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: '14px',
            padding: '11px 14px',
            marginBottom: '14px',
          },
        },
        React.createElement(SearchIcon, { size: 15, color: t.textMuted }),
        React.createElement(
          'span',
          { style: { fontSize: '14px', color: t.textMuted } },
          'Search solutions...'
        )
      ),

      // Filters
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'none',
          },
        },
        filters.map((f) =>
          React.createElement(
            'button',
            {
              key: f,
              onClick: () => setFilter(f),
              className: 'btn-press',
              style: {
                padding: '6px 15px',
                borderRadius: '20px',
                border: `1px solid ${filter === f ? cta : t.cardBorder}`,
                background: filter === f ? 'rgba(34,197,94,0.12)' : t.card,
                color: filter === f ? cta : t.textSecondary,
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: '"JetBrains Mono", monospace',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                minHeight: '44px',
              },
            },
            f
          )
        )
      )
    ),

    // Solutions
    React.createElement(
      'div',
      { style: { padding: '0 20px' } },
      solutions.map((sol, i) =>
        React.createElement(
          'div',
          {
            key: sol.id,
            className: 'card-hover',
            style: {
              background: t.card,
              borderRadius: '18px',
              padding: '16px',
              marginBottom: '12px',
              border: `1px solid ${t.cardBorder}`,
              animation: `slideUp 0.3s ease ${i * 0.1}s both`,
            },
          },

          // Top row
          React.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' } },
            React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                { style: { display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '5px' } },
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '10px',
                      fontWeight: '700',
                      color: langColor[sol.lang] || '#94A3B8',
                      background: `${langColor[sol.lang] || '#94A3B8'}18`,
                      borderRadius: '5px',
                      padding: '2px 7px',
                      fontFamily: '"JetBrains Mono", monospace',
                    },
                  },
                  sol.lang
                ),
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '10px',
                      fontWeight: '600',
                      color: sol.badgeColor,
                      background: `${sol.badgeColor}14`,
                      borderRadius: '5px',
                      padding: '2px 7px',
                    },
                  },
                  sol.badge
                )
              ),
              React.createElement(
                'p',
                {
                  style: {
                    fontSize: '14px',
                    fontWeight: '700',
                    color: t.text,
                    fontFamily: '"JetBrains Mono", monospace',
                  },
                },
                sol.challenge
              )
            ),
            // Elegance ring
            React.createElement(
              'div',
              {
                style: {
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: `conic-gradient(${cta} ${sol.elegance}%, ${t.surface} 0%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: '10px',
                },
              },
              React.createElement(
                'div',
                {
                  style: {
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: t.card,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '11px',
                      fontWeight: '800',
                      color: cta,
                      fontFamily: '"JetBrains Mono", monospace',
                    },
                  },
                  sol.elegance
                )
              )
            )
          ),

          // Code preview
          React.createElement(
            'div',
            {
              style: {
                background: '#0F172A',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '12px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                color: '#94A3B8',
                lineHeight: 1.65,
                whiteSpace: 'pre',
                overflow: 'hidden',
                maxHeight: '76px',
                borderLeft: `3px solid ${langColor[sol.lang] || cta}`,
              },
            },
            sol.preview
          ),

          // Footer
          React.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement(
              'div',
              { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
              React.createElement(
                'div',
                {
                  style: {
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: langColor[sol.lang] || cta,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white',
                    fontWeight: '800',
                  },
                },
                sol.author[0].toUpperCase()
              ),
              React.createElement(
                'span',
                {
                  style: {
                    fontSize: '12px',
                    color: t.textSecondary,
                    fontFamily: '"JetBrains Mono", monospace',
                  },
                },
                sol.author
              ),
              React.createElement(
                'span',
                { style: { fontSize: '11px', color: t.textMuted } },
                `· ${sol.lines}L`
              )
            ),
            React.createElement(
              'div',
              { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
              React.createElement(
                'button',
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setLiked((p) => (p.includes(sol.id) ? p.filter((x) => x !== sol.id) : [...p, sol.id]));
                  },
                  className: 'btn-press',
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: liked.includes(sol.id) ? '#EC4899' : t.textMuted,
                    minWidth: '44px',
                    minHeight: '44px',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease',
                    padding: '0 4px',
                  },
                },
                React.createElement(HeartIcon, { size: 14, fill: liked.includes(sol.id) ? '#EC4899' : 'none' }),
                React.createElement('span', { style: { fontSize: '11px' } }, liked.includes(sol.id) ? sol.hearts + 1 : sol.hearts)
              ),
              React.createElement(
                'button',
                {
                  className: 'btn-press',
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.22)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: cta,
                    padding: '7px 12px',
                    minHeight: '44px',
                    fontSize: '11px',
                    fontWeight: '700',
                    fontFamily: '"JetBrains Mono", monospace',
                    transition: 'all 0.2s ease',
                  },
                },
                React.createElement(GitForkIcon, { size: 12 }),
                'Fork'
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { height: '24px' } })
    )
  );
}

// ─────────────────────────────────────────
// PROFILE SCREEN — Dev-Art Gallery
// ─────────────────────────────────────────
function ProfileScreen({ t, darkMode, setDarkMode, cta, accent, warning }) {
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const FlameIcon = window.lucide.Flame;
  const TrophyIcon = window.lucide.Trophy;
  const StarIcon = window.lucide.Star;
  const GitForkIcon = window.lucide.GitFork;
  const BarChart2Icon = window.lucide.BarChart2;
  const AwardIcon = window.lucide.Award;
  const ZapIcon = window.lucide.Zap;
  const SettingsIcon = window.lucide.Settings;

  const brushstrokes = [
    { title: 'Array Dedup', lang: 'TS', score: 98, forks: 47, color: '#6366F1' },
    { title: 'Quicksort', lang: 'PY', score: 95, forks: 31, color: '#22C55E' },
    { title: 'Trie Insert', lang: 'GO', score: 93, forks: 19, color: '#06B6D4' },
    { title: 'BFS Walker', lang: 'TS', score: 91, forks: 28, color: '#F59E0B' },
  ];

  const badges = [
    { Icon: FlameIcon, label: '14-Day Streak', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    { Icon: TrophyIcon, label: 'Top 5% Elegance', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    { Icon: StarIcon, label: '100+ Solutions', color: '#6366F1', bg: 'rgba(99,102,241,0.12)' },
    { Icon: GitForkIcon, label: '500+ Forks', color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
    { Icon: AwardIcon, label: 'Early Adopter', color: '#EC4899', bg: 'rgba(236,72,153,0.12)' },
  ];

  const weekData = [65, 80, 45, 90, 70, 85, 95];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxVal = Math.max(...weekData);

  return React.createElement(
    'div',
    { style: { height: '100%', overflowY: 'auto', background: t.bg } },

    // Hero header (always dark)
    React.createElement(
      'div',
      {
        style: {
          background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
          padding: '24px 20px 22px',
          position: 'relative',
          overflow: 'hidden',
        },
      },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(34,197,94,0.1) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(99,102,241,0.08) 0%, transparent 40%)',
        },
      }),

      // Top row
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            position: 'relative',
            marginBottom: '18px',
          },
        },
        React.createElement(
          'div',
          { style: { display: 'flex', gap: '14px', alignItems: 'flex-start' } },
          // Avatar
          React.createElement(
            'div',
            {
              style: {
                width: '62px',
                height: '62px',
                borderRadius: '18px',
                background: `linear-gradient(135deg, ${cta}, #16A34A)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: '800',
                color: '#0F172A',
                fontFamily: '"JetBrains Mono", monospace',
                boxShadow: `0 0 0 3px rgba(34,197,94,0.28)`,
                flexShrink: 0,
              },
            },
            'A'
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'h1',
              {
                style: {
                  fontSize: '20px',
                  fontWeight: '800',
                  fontFamily: '"JetBrains Mono", monospace',
                  color: '#F8FAFC',
                  marginBottom: '2px',
                },
              },
              'alex_dev'
            ),
            React.createElement(
              'p',
              { style: { fontSize: '12px', color: '#94A3B8', marginBottom: '8px' } },
              'Full Stack · San Francisco'
            ),
            React.createElement(
              'div',
              {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.28)',
                  borderRadius: '8px',
                  padding: '4px 9px',
                },
              },
              React.createElement(TrophyIcon, { size: 11, color: cta }),
              React.createElement(
                'span',
                {
                  style: {
                    fontSize: '11px',
                    fontWeight: '700',
                    color: cta,
                    fontFamily: '"JetBrains Mono", monospace',
                  },
                },
                'Level 12 · Craftsman'
              )
            )
          )
        ),
        React.createElement(
          'button',
          {
            onClick: () => setDarkMode(!darkMode),
            style: {
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#94A3B8',
            },
          },
          darkMode ? React.createElement(SunIcon, { size: 15 }) : React.createElement(MoonIcon, { size: 15 })
        )
      ),

      // Stat tiles
      React.createElement(
        'div',
        {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            position: 'relative',
          },
        },
        [
          { label: 'Elegance', value: '96.4', icon: StarIcon, iconColor: '#F59E0B' },
          { label: 'Brushstrokes', value: '247', icon: ZapIcon, iconColor: cta },
          { label: 'Day Streak', value: '14', icon: FlameIcon, iconColor: '#F59E0B' },
        ].map((s, i) =>
          React.createElement(
            'div',
            {
              key: i,
              style: {
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '14px',
                padding: '11px 8px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.07)',
              },
            },
            React.createElement(s.icon, { size: 13, color: s.iconColor, style: { margin: '0 auto 5px' } }),
            React.createElement(
              'div',
              {
                style: {
                  fontSize: '20px',
                  fontWeight: '800',
                  color: cta,
                  fontFamily: '"JetBrains Mono", monospace',
                  lineHeight: 1,
                },
              },
              s.value
            ),
            React.createElement(
              'div',
              { style: { fontSize: '9px', color: '#64748B', marginTop: '3px', letterSpacing: '0.4px' } },
              s.label
            )
          )
        )
      )
    ),

    // Badges
    React.createElement(
      'div',
      { style: { padding: '16px 20px 0' } },
      React.createElement(
        'p',
        {
          style: {
            fontSize: '10px',
            fontWeight: '700',
            color: t.textMuted,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '1.5px',
            marginBottom: '10px',
          },
        },
        'ACHIEVEMENTS'
      ),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
          },
        },
        badges.map((b, i) =>
          React.createElement(
            'div',
            {
              key: i,
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '11px 10px',
                background: b.bg,
                border: `1px solid ${b.color}28`,
                borderRadius: '14px',
                minWidth: '72px',
                animation: `fadeIn 0.35s ease ${i * 0.08}s both`,
                flexShrink: 0,
              },
            },
            React.createElement(b.Icon, { size: 18, color: b.color }),
            React.createElement(
              'span',
              {
                style: {
                  fontSize: '9px',
                  fontWeight: '700',
                  color: b.color,
                  textAlign: 'center',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                },
              },
              b.label
            )
          )
        )
      )
    ),

    // Weekly activity chart
    React.createElement(
      'div',
      { style: { padding: '14px 20px 0' } },
      React.createElement(
        'div',
        {
          style: {
            background: t.card,
            borderRadius: '16px',
            padding: '14px 16px',
            border: `1px solid ${t.cardBorder}`,
          },
        },
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' } },
          React.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
            React.createElement(BarChart2Icon, { size: 14, color: cta }),
            React.createElement(
              'span',
              {
                style: {
                  fontSize: '13px',
                  fontWeight: '700',
                  color: t.text,
                  fontFamily: '"JetBrains Mono", monospace',
                },
              },
              'Weekly Activity'
            )
          ),
          React.createElement(
            'span',
            { style: { fontSize: '11px', color: cta, fontFamily: '"JetBrains Mono", monospace', fontWeight: '600' } },
            '+12% this week'
          )
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', gap: '6px', alignItems: 'flex-end', height: '64px' } },
          weekData.map((v, i) =>
            React.createElement(
              'div',
              {
                key: i,
                style: {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                },
              },
              React.createElement('div', {
                style: {
                  width: '100%',
                  height: `${(v / maxVal) * 48}px`,
                  background: i === 6 ? cta : `rgba(34,197,94,0.28)`,
                  borderRadius: '4px 4px 2px 2px',
                  transition: 'height 0.4s ease',
                },
              }),
              React.createElement(
                'span',
                { style: { fontSize: '9px', color: t.textMuted } },
                days[i]
              )
            )
          )
        )
      )
    ),

    // Top Brushstrokes gallery
    React.createElement(
      'div',
      { style: { padding: '14px 20px' } },
      React.createElement(
        'p',
        {
          style: {
            fontSize: '10px',
            fontWeight: '700',
            color: t.textMuted,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '1.5px',
            marginBottom: '10px',
          },
        },
        'TOP BRUSHSTROKES'
      ),
      React.createElement(
        'div',
        { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
        brushstrokes.map((bs, i) =>
          React.createElement(
            'div',
            {
              key: i,
              className: 'card-hover btn-press',
              style: {
                background: t.card,
                borderRadius: '14px',
                padding: '13px',
                border: `1px solid ${t.cardBorder}`,
                position: 'relative',
                overflow: 'hidden',
                animation: `slideUp 0.3s ease ${i * 0.07}s both`,
              },
            },
            React.createElement('div', {
              style: {
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '3px',
                background: bs.color,
              },
            }),
            React.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
              React.createElement(
                'span',
                {
                  style: {
                    fontSize: '10px',
                    fontWeight: '700',
                    color: bs.color,
                    background: `${bs.color}18`,
                    borderRadius: '5px',
                    padding: '2px 6px',
                    fontFamily: '"JetBrains Mono", monospace',
                  },
                },
                bs.lang
              ),
              React.createElement(
                'span',
                {
                  style: {
                    fontSize: '16px',
                    fontWeight: '800',
                    color: bs.color,
                    fontFamily: '"JetBrains Mono", monospace',
                  },
                },
                bs.score
              )
            ),
            React.createElement(
              'p',
              {
                style: {
                  fontSize: '12px',
                  fontWeight: '700',
                  color: t.text,
                  fontFamily: '"JetBrains Mono", monospace',
                  marginBottom: '5px',
                },
              },
              bs.title
            ),
            React.createElement(
              'div',
              { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
              React.createElement(GitForkIcon, { size: 10, color: t.textMuted }),
              React.createElement(
                'span',
                { style: { fontSize: '10px', color: t.textMuted } },
                `${bs.forks} forks`
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { height: '24px' } })
    )
  );
}
