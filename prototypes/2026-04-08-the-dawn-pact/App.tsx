const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const themes = {
    dark: {
      bg: '#1a1025',
      surface: '#241735',
      surfaceAlt: '#2d1f42',
      card: '#2d1f42',
      cardHover: '#362650',
      text: '#f5f0ff',
      textSecondary: '#b8a5d4',
      textMuted: '#8b7aab',
      primary: '#7C3AED',
      primaryLight: '#A78BFA',
      secondary: '#A78BFA',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      border: '#3d2d55',
      overlay: 'rgba(26,16,37,0.85)',
      navBg: '#1a1025',
      inputBg: '#241735',
      progressBg: '#3d2d55',
      badge: '#7C3AED',
    },
    light: {
      bg: '#FAF5FF',
      surface: '#FFFFFF',
      surfaceAlt: '#F3E8FF',
      card: '#FFFFFF',
      cardHover: '#F5EFFF',
      text: '#1a1025',
      textSecondary: '#6B5A8A',
      textMuted: '#9585B0',
      primary: '#7C3AED',
      primaryLight: '#A78BFA',
      secondary: '#A78BFA',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      border: '#E9D5FF',
      overlay: 'rgba(250,245,255,0.9)',
      navBg: '#FFFFFF',
      inputBg: '#F3E8FF',
      progressBg: '#E9D5FF',
      badge: '#7C3AED',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.85; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes breathe {
      0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
      50% { box-shadow: 0 0 0 12px rgba(124,58,237,0); }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 0; height: 0; }
  `;

  // Icons helper
  const Icon = ({ name, size = 24, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 2 });
  };

  // ====== HOME SCREEN ======
  const HomeScreen = () => {
    const [expandedQuest, setExpandedQuest] = useState(null);

    const quests = [
      { id: 1, title: 'Master 3 Yoga Poses', circle: 'Morning Flow', progress: 0.65, daysLeft: 3, slot: 'Sunrise Scroll · 6 AM GMT', members: 8, streak: 5 },
      { id: 2, title: 'Write 500 Words Daily', circle: 'Twilight Writers', progress: 0.40, daysLeft: 7, slot: 'Twilight Bloom · 11 PM PST', members: 12, streak: 3 },
      { id: 3, title: 'Learn 50 Spanish Words', circle: 'Lingua Dawn', progress: 0.85, daysLeft: 2, slot: 'Midday Focus · 12 PM CET', members: 6, streak: 8 },
    ];

    const upcomingRitual = { time: '06:00 AM GMT', label: 'Sunrise Scroll', circle: 'Morning Flow', inMinutes: 23 };

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.textSecondary, fontFamily: font, marginBottom: 2 } }, 'Good morning,'),
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Seeker'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary })),
          React.createElement('button', {
            style: { width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }
          },
            React.createElement(Icon, { name: 'Bell', size: 20, color: t.text }),
            React.createElement('div', { style: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, background: t.cta } })
          ),
        ),
      ),

      // Upcoming Ritual Card
      React.createElement('div', {
        onClick: () => setActiveScreen('live'),
        style: {
          background: `linear-gradient(135deg, ${t.primary}, #5B21B6)`,
          borderRadius: 20,
          padding: 20,
          marginBottom: 24,
          cursor: 'pointer',
          animation: 'breathe 3s ease-in-out infinite',
          transition: 'transform 0.2s',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative' } },
          React.createElement(Icon, { name: 'Flame', size: 18, color: '#FCD34D' }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 } }, 'Next Ritual'),
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font, marginBottom: 4, position: 'relative' } }, upcomingRitual.label),
        React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.75)', fontFamily: font, marginBottom: 16, position: 'relative' } }, `${upcomingRitual.circle} · ${upcomingRitual.time}`),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement(Icon, { name: 'Clock', size: 16, color: '#FCD34D' }),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: '#FCD34D', fontFamily: font } }, `Starts in ${upcomingRitual.inMinutes} min`),
          ),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 16px', fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: font } }, 'Join Early'),
        ),
      ),

      // Active Quests
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3 } }, 'Active Quests'),
        React.createElement('button', {
          onClick: () => setActiveScreen('circles'),
          style: { fontSize: 15, fontWeight: 600, color: t.primary, background: 'none', border: 'none', cursor: 'pointer', fontFamily: font, padding: '8px 0' }
        }, 'See All'),
      ),

      ...quests.map((quest, i) =>
        React.createElement('div', {
          key: quest.id,
          onClick: () => setExpandedQuest(expandedQuest === quest.id ? null : quest.id),
          style: {
            background: t.card,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            transition: 'all 0.2s',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } }, quest.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 12, color: t.textMuted }),
                `${quest.circle} · ${quest.members} members`,
              ),
            ),
            React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 10, padding: '4px 10px', fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: font, whiteSpace: 'nowrap' } }, `${quest.daysLeft}d left`),
          ),
          // Progress bar
          React.createElement('div', { style: { background: t.progressBg, borderRadius: 6, height: 8, marginBottom: 8, overflow: 'hidden' } },
            React.createElement('div', { style: { width: `${quest.progress * 100}%`, height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`, transition: 'width 0.6s ease' } }),
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, `${Math.round(quest.progress * 100)}% complete`),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Flame', size: 14, color: '#F59E0B' }),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#F59E0B', fontFamily: font } }, `${quest.streak} day streak`),
            ),
          ),
          expandedQuest === quest.id && React.createElement('div', { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}`, animation: 'fadeIn 0.3s ease' } },
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
              React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
              quest.slot,
            ),
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); setActiveScreen('live'); },
              style: { width: '100%', padding: '12px', borderRadius: 12, background: t.primary, color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: font, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }
            }, 'Enter Ritual Session'),
          ),
        )
      ),

      // Stats row
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 12 } },
        [
          { label: 'Total Hours', value: '47', icon: 'Timer' },
          { label: 'Quests Done', value: '12', icon: 'Trophy' },
          { label: 'Best Streak', value: '14', icon: 'Zap' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.card, borderRadius: 14, padding: '14px 10px', textAlign: 'center', border: `1px solid ${t.border}`, animation: `fadeIn 0.4s ease ${0.3 + i * 0.1}s both` }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
              React.createElement(Icon, { name: stat.icon, size: 18, color: t.primary }),
            ),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, stat.label),
          )
        ),
      ),
    );
  };

  // ====== CIRCLES SCREEN ======
  const CirclesScreen = () => {
    const [activeTab, setActiveTab] = useState('my');

    const myCircles = [
      { id: 1, name: 'Morning Flow', members: 8, quest: 'Yoga & Movement', nextSlot: 'Sunrise Scroll · 6 AM GMT', active: true, color: '#7C3AED' },
      { id: 2, name: 'Twilight Writers', members: 12, quest: 'Creative Writing', nextSlot: 'Twilight Bloom · 11 PM PST', active: false, color: '#EC4899' },
      { id: 3, name: 'Lingua Dawn', members: 6, quest: 'Language Learning', nextSlot: 'Midday Focus · 12 PM CET', active: true, color: '#F59E0B' },
    ];

    const discover = [
      { id: 4, name: 'Code Forge', members: 15, quest: 'Coding Practice', nextSlot: 'Night Owl · 2 AM UTC', color: '#22C55E' },
      { id: 5, name: 'Zen Garden', members: 9, quest: 'Meditation & Mindfulness', nextSlot: 'Dawn Whisper · 5 AM EST', color: '#06B6D4' },
      { id: 6, name: 'Sketch Society', members: 7, quest: 'Daily Drawing', nextSlot: 'Golden Hour · 6 PM JST', color: '#F97316' },
      { id: 7, name: 'Reading Guild', members: 20, quest: 'Read 30 min Daily', nextSlot: 'Eventide · 9 PM GMT', color: '#8B5CF6' },
    ];

    const circles = activeTab === 'my' ? myCircles : discover;

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Pact Circles'),
        React.createElement('button', { style: { width: 44, height: 44, borderRadius: 14, background: t.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
          React.createElement(Icon, { name: 'Plus', size: 22, color: '#fff' }),
        ),
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 20, background: t.surfaceAlt, borderRadius: 12, padding: 3 } },
        ['my', 'discover'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer', transition: 'all 0.2s',
              background: activeTab === tab ? t.primary : 'transparent',
              color: activeTab === tab ? '#fff' : t.textMuted,
            }
          }, tab === 'my' ? 'My Circles' : 'Discover')
        ),
      ),

      // Search bar
      React.createElement('div', { style: { position: 'relative', marginBottom: 20 } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' } },
          React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
        ),
        React.createElement('input', {
          placeholder: 'Search circles...',
          style: { width: '100%', padding: '13px 16px 13px 42px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.inputBg, fontSize: 15, fontFamily: font, color: t.text, outline: 'none' }
        }),
      ),

      ...circles.map((circle, i) =>
        React.createElement('div', {
          key: circle.id,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${circle.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: 'Shield', size: 24, color: circle.color }),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, circle.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, circle.quest),
            ),
            circle.active !== undefined && React.createElement('div', { style: { width: 10, height: 10, borderRadius: 5, background: circle.active ? t.cta : t.textMuted } }),
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: t.textMuted, fontFamily: font } },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
              `${circle.members} members`,
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: t.textSecondary, fontFamily: font } },
              React.createElement(Icon, { name: 'Clock', size: 14, color: t.textSecondary }),
              circle.nextSlot,
            ),
          ),
          activeTab === 'discover' && React.createElement('button', {
            style: { width: '100%', marginTop: 12, padding: '10px', borderRadius: 10, background: `${t.primary}15`, border: `1px solid ${t.primary}40`, color: t.primary, fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer', transition: 'all 0.2s' }
          }, 'Request to Join'),
        )
      ),
    );
  };

  // ====== LIVE SESSION SCREEN ======
  const LiveScreen = () => {
    const [sessionTime, setSessionTime] = useState(0);
    const [isJoined, setIsJoined] = useState(false);
    const [collectiveProgress, setCollectiveProgress] = useState(63);

    useEffect(() => {
      if (!isJoined) return;
      const interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        if (Math.random() > 0.7) setCollectiveProgress(prev => Math.min(100, prev + 1));
      }, 1000);
      return () => clearInterval(interval);
    }, [isJoined]);

    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const members = [
      { initials: 'AK', color: '#7C3AED', active: true },
      { initials: 'MJ', color: '#EC4899', active: true },
      { initials: 'RD', color: '#22C55E', active: true },
      { initials: 'SL', color: '#F59E0B', active: true },
      { initials: 'YT', color: '#06B6D4', active: true },
      { initials: 'BW', color: '#F97316', active: false },
      { initials: 'KP', color: '#8B5CF6', active: true },
      { initials: 'NM', color: '#EF4444', active: true },
    ];

    if (!isJoined) {
      return React.createElement('div', { style: { padding: '20px 16px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 600, animation: 'fadeIn 0.4s ease' } },
        React.createElement('div', { style: { width: 100, height: 100, borderRadius: 50, background: `linear-gradient(135deg, ${t.primary}, #5B21B6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, animation: 'breathe 3s ease-in-out infinite' } },
          React.createElement(Icon, { name: 'Flame', size: 44, color: '#FCD34D' }),
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 8, textAlign: 'center' } }, 'Sunrise Scroll'),
        React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 4, textAlign: 'center' } }, 'Morning Flow · 8 seekers present'),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginBottom: 32, textAlign: 'center' } }, 'Session in progress · 12:34 elapsed'),

        // Member mosaic preview
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 32, maxWidth: 220 } },
          ...members.map((m, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 44, height: 44, borderRadius: 12, background: `${m.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: m.active ? `2px solid ${m.color}` : `2px solid ${t.border}`,
                animation: m.active ? `pulse 2s ease-in-out ${i * 0.3}s infinite` : 'none', opacity: m.active ? 1 : 0.5,
              }
            },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: m.color, fontFamily: font } }, m.initials),
            )
          ),
        ),

        React.createElement('button', {
          onClick: () => setIsJoined(true),
          style: { width: '100%', maxWidth: 300, padding: '16px', borderRadius: 16, background: `linear-gradient(135deg, ${t.cta}, #16A34A)`, color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: font, border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: `0 4px 20px ${t.cta}40` }
        }, 'Enter the Ritual'),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 12 } }, 'You will be muted upon entry'),
      );
    }

    // Active session view
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Session header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 } },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: t.cta, animation: 'pulse 1.5s ease infinite' } }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 } }, 'Live Session'),
        ),
        React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, formatTime(sessionTime)),
        React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font } }, 'Sunrise Scroll · Morning Flow'),
      ),

      // Member mosaic
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 } },
        ...members.map((m, i) =>
          React.createElement('div', {
            key: i,
            style: {
              aspectRatio: '1', borderRadius: 14, background: `${m.color}15`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${m.active ? m.color : t.border}`, transition: 'all 0.3s',
              position: 'relative', overflow: 'hidden',
            }
          },
            m.active && React.createElement('div', { style: { position: 'absolute', bottom: 4, right: 4, width: 8, height: 8, borderRadius: 4, background: t.cta } }),
            React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: m.color, fontFamily: font } }, m.initials),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: font, marginTop: 2 } }, m.active ? 'Focused' : 'Away'),
          )
        ),
      ),

      // Oath Scroll
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
          React.createElement(Icon, { name: 'ScrollText', size: 20, color: t.primary }),
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, 'Oath Scroll'),
          React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginLeft: 'auto' } }, 'Collective Progress'),
        ),

        // Circular progress
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 } },
          React.createElement('div', { style: { width: 120, height: 120, borderRadius: 60, background: `conic-gradient(${t.primary} ${collectiveProgress * 3.6}deg, ${t.progressBg} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' } },
            React.createElement('div', { style: { width: 96, height: 96, borderRadius: 48, background: t.card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font } }, `${collectiveProgress}%`),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, 'Group Focus'),
            ),
          ),
        ),

        // Stats grid
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 } },
          [
            { label: 'Active Now', value: '7/8', icon: 'Users' },
            { label: 'Tasks Done', value: '23', icon: 'CheckCircle' },
            { label: 'Focus Mins', value: formatTime(sessionTime), icon: 'Timer' },
          ].map((stat, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center', padding: 10, borderRadius: 12, background: t.surfaceAlt } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 4 } },
                React.createElement(Icon, { name: stat.icon, size: 16, color: t.primary }),
              ),
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, stat.value),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, stat.label),
            )
          ),
        ),
      ),

      // Action button
      React.createElement('button', {
        onClick: () => setIsJoined(false),
        style: { width: '100%', padding: '16px', borderRadius: 16, background: t.surfaceAlt, color: t.textSecondary, fontSize: 15, fontWeight: 600, fontFamily: font, border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s' }
      }, 'Leave Session'),
    );
  };

  // ====== INSIGHTS SCREEN ======
  const InsightsScreen = () => {
    const weekData = [35, 42, 28, 55, 48, 60, 45];
    const maxVal = Math.max(...weekData);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const insights = [
      { title: 'Sunrise Scroll', date: 'Today · 6:00 AM', circle: 'Morning Flow', duration: '45 min', tasksCompleted: 3, groupFocus: '78%' },
      { title: 'Twilight Bloom', date: 'Yesterday · 11:00 PM', circle: 'Twilight Writers', duration: '30 min', tasksCompleted: 1, groupFocus: '65%' },
      { title: 'Midday Focus', date: 'Apr 6 · 12:00 PM', circle: 'Lingua Dawn', duration: '25 min', tasksCompleted: 5, groupFocus: '82%' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 20 } }, 'Insights'),

      // Weekly overview card
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: 20, marginBottom: 20, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, 'Weekly Focus Time'),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font, background: `${t.cta}15`, padding: '4px 10px', borderRadius: 8 } }, '+12% vs last week'),
        ),

        // Bar chart
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, marginBottom: 8 } },
          ...weekData.map((val, i) => {
            const isToday = i === 6;
            return React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
              React.createElement('div', {
                style: {
                  width: '100%', height: `${(val / maxVal) * 80}px`, borderRadius: 8,
                  background: isToday ? `linear-gradient(180deg, ${t.primary}, ${t.cta})` : `${t.primary}30`,
                  transition: 'height 0.5s ease',
                }
              }),
            );
          }),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          ...days.map((day, i) =>
            React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center', fontSize: 11, color: i === 6 ? t.primary : t.textMuted, fontWeight: i === 6 ? 600 : 400, fontFamily: font } }, day),
          ),
        ),
      ),

      // Summary stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 } },
        [
          { label: 'Sessions This Week', value: '7', icon: 'Calendar', color: t.primary },
          { label: 'Quests Completed', value: '2', icon: 'Trophy', color: '#F59E0B' },
          { label: 'Total Focus Hours', value: '5.2h', icon: 'Timer', color: t.cta },
          { label: 'Consistency Score', value: '94%', icon: 'Target', color: '#EC4899' },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 14, padding: 14, border: `1px solid ${t.border}`, animation: `fadeIn 0.4s ease ${i * 0.1}s both` } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: stat.icon, size: 16, color: stat.color }),
              ),
            ),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font } }, stat.value),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, stat.label),
          )
        ),
      ),

      // Ritual replays
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, marginBottom: 14 } }, 'Ritual Replays'),

      ...insights.map((insight, i) =>
        React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${t.border}`, animation: `slideUp 0.4s ease ${0.2 + i * 0.1}s both` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, insight.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, insight.date),
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, background: t.surfaceAlt, padding: '4px 10px', borderRadius: 8 } }, insight.circle),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: t.textSecondary, fontFamily: font } },
              React.createElement(Icon, { name: 'Clock', size: 14, color: t.textSecondary }),
              insight.duration,
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: t.textSecondary, fontFamily: font } },
              React.createElement(Icon, { name: 'CheckCircle', size: 14, color: t.cta }),
              `${insight.tasksCompleted} tasks`,
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: t.textSecondary, fontFamily: font } },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.primary }),
              insight.groupFocus,
            ),
          ),
        )
      ),
    );
  };

  // ====== PROFILE SCREEN ======
  const ProfileScreen = () => {
    const achievements = [
      { title: 'Early Riser', desc: 'Complete 7 sunrise sessions', icon: 'Sunrise', earned: true },
      { title: 'Wordsmith', desc: 'Write 10,000 total words', icon: 'Pen', earned: true },
      { title: 'Circle Leader', desc: 'Create and lead a Pact Circle', icon: 'Crown', earned: false },
      { title: 'Iron Will', desc: '30-day streak', icon: 'Shield', earned: false },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Profile'),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: 44, height: 44, borderRadius: 14, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: 'Settings', size: 20, color: t.text })),
      ),

      // Profile card
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.primary}20, ${t.cta}10)`, borderRadius: 20, padding: 24, marginBottom: 20, border: `1px solid ${t.border}`, textAlign: 'center' } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${t.primary}, #5B21B6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 4px 20px ${t.primary}40` } },
          React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: font } }, 'S'),
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 2 } }, 'Seeker'),
        React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 16 } }, 'Joined March 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 24 } },
          [
            { label: 'Quests', value: '12' },
            { label: 'Circles', value: '3' },
            { label: 'Hours', value: '47' },
          ].map((s, i) =>
            React.createElement('div', { key: i },
              React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font } }, s.value),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, s.label),
            )
          ),
        ),
      ),

      // Current streak
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 20, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', { style: { width: 52, height: 52, borderRadius: 14, background: '#F59E0B15', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: 'Flame', size: 28, color: '#F59E0B' }),
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, '8-Day Streak'),
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, 'Your longest: 14 days'),
        ),
        React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: '#F59E0B', fontFamily: font } }, '8'),
      ),

      // Achievements
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, marginBottom: 14 } }, 'Achievements'),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 } },
        ...achievements.map((a, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 14, padding: 14, border: `1px solid ${a.earned ? t.primary + '40' : t.border}`, opacity: a.earned ? 1 : 0.55, animation: `fadeIn 0.4s ease ${i * 0.1}s both` } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: a.earned ? `${t.primary}20` : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 } },
              React.createElement(Icon, { name: a.icon, size: 20, color: a.earned ? t.primary : t.textMuted }),
            ),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 2 } }, a.title),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, a.desc),
          )
        ),
      ),

      // Moment of Resolve section
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.primary}, #5B21B6)`, borderRadius: 20, padding: 20, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -15, right: -15, width: 70, height: 70, borderRadius: 35, background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, position: 'relative' } },
          React.createElement(Icon, { name: 'Sparkles', size: 20, color: '#FCD34D' }),
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: font } }, 'Moment of Resolve'),
        ),
        React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.8)', fontFamily: font, marginBottom: 14, position: 'relative', lineHeight: 1.4 } }, 'Your "Master 3 Yoga Poses" quest ends in 3 days. Prepare to share your journey with your Pact Circle.'),
        React.createElement('button', { style: { padding: '12px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: font, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' } }, 'Preview My Resolve'),
      ),
    );
  };

  // Screen map
  const screens = {
    home: HomeScreen,
    circles: CirclesScreen,
    live: LiveScreen,
    insights: InsightsScreen,
    profile: ProfileScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'circles', label: 'Circles', icon: 'Users' },
    { id: 'live', label: 'Ritual', icon: 'Radio' },
    { id: 'insights', label: 'Insights', icon: 'BarChart3' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font }
  },
    React.createElement('style', null, styleTag),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
      }
    },
      // Main content
      React.createElement('div', {
        style: { height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 }
      },
        React.createElement(screens[activeScreen] || HomeScreen),
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', padding: '8px 0 24px', paddingTop: 8,
          backdropFilter: 'blur(20px)',
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
              transition: 'all 0.2s', minHeight: 44, minWidth: 44, justifyContent: 'center',
            }
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.primary : t.textMuted,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.primary : t.textMuted,
                fontFamily: font,
              }
            }, tab.label),
            activeScreen === tab.id && React.createElement('div', {
              style: { width: 4, height: 4, borderRadius: 2, background: t.primary, marginTop: 1 }
            }),
          )
        ),
      ),
    ),
  );
}
