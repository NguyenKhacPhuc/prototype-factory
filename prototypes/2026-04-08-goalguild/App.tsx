const { useState, useEffect, useRef, useCallback } = React;

const THEMES = {
  light: {
    primary: '#18181B',
    secondary: '#3F3F46',
    cta: '#2563EB',
    background: '#FAFAFA',
    card: '#FFFFFF',
    cardBorder: 'rgba(0,0,0,0.06)',
    text: '#18181B',
    textSecondary: '#3F3F46',
    textTertiary: '#71717A',
    surface: '#F4F4F5',
    surfaceAlt: '#E4E4E7',
    tabBar: 'rgba(255,255,255,0.92)',
    tabBarBorder: 'rgba(0,0,0,0.08)',
    overlay: 'rgba(0,0,0,0.4)',
    badge: '#EFF6FF',
    badgeText: '#2563EB',
    success: '#16A34A',
    warning: '#F59E0B',
    cardShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
    cardShadowHover: '0 2px 8px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
  },
  dark: {
    primary: '#FAFAFA',
    secondary: '#A1A1AA',
    cta: '#3B82F6',
    background: '#09090B',
    card: '#18181B',
    cardBorder: 'rgba(255,255,255,0.06)',
    text: '#FAFAFA',
    textSecondary: '#A1A1AA',
    textTertiary: '#71717A',
    surface: '#27272A',
    surfaceAlt: '#3F3F46',
    tabBar: 'rgba(9,9,11,0.92)',
    tabBarBorder: 'rgba(255,255,255,0.06)',
    overlay: 'rgba(0,0,0,0.7)',
    badge: '#1E3A5F',
    badgeText: '#60A5FA',
    success: '#22C55E',
    warning: '#FBBF24',
    cardShadow: '0 1px 3px rgba(0,0,0,0.3)',
    cardShadowHover: '0 2px 8px rgba(0,0,0,0.5)',
  }
};

const FONT = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

const GUILD_DATA = [
  { id: 'g1', name: 'Night Owl Navigators', members: 1247, desc: 'For shift workers mastering money on a non-traditional schedule', icon: 'Moon', color: '#6366F1' },
  { id: 'g2', name: 'Early Retirement Architects', members: 3891, desc: 'Building the blueprint for financial independence', icon: 'Building2', color: '#059669' },
  { id: 'g3', name: 'Side Hustle Syndicate', members: 2106, desc: 'Turning passion projects into income streams', icon: 'Zap', color: '#F59E0B' },
  { id: 'g4', name: 'Debt Demolition Crew', members: 1832, desc: 'Strategies to crush debt and reclaim your freedom', icon: 'Hammer', color: '#EF4444' },
];

const EXPERIMENTS = [
  { id: 'e1', title: '30-Day No-Spend Challenge', author: 'Sarah M.', guild: 'Night Owl Navigators', day: 22, totalDays: 30, status: 'active', updates: 14, insights: 8, forks: 3, avatar: 'S' },
  { id: 'e2', title: 'Automate 15% Savings', author: 'Marcus J.', guild: 'Early Retirement Architects', day: 45, totalDays: 90, status: 'active', updates: 9, insights: 12, forks: 7, avatar: 'M' },
  { id: 'e3', title: 'Cash Envelope System', author: 'Priya K.', guild: 'Debt Demolition Crew', day: 60, totalDays: 60, status: 'completed', updates: 22, insights: 18, forks: 11, avatar: 'P' },
  { id: 'e4', title: 'Meal Prep Savings Tracker', author: 'David L.', guild: 'Side Hustle Syndicate', day: 15, totalDays: 30, status: 'active', updates: 7, insights: 4, forks: 1, avatar: 'D' },
];

const STORYBOARD_ENTRIES = [
  { type: 'text', day: 1, content: 'Starting my no-spend challenge today. Set up my tracking sheet and told my accountability partner.', time: '11:42 PM' },
  { type: 'voice', day: 5, content: 'Voice note: 2:14 — Struggled today with impulse to order food after shift. Made pasta instead. Saved ~$18.', time: '3:15 AM' },
  { type: 'text', day: 12, content: 'Found the pattern: my biggest spend triggers happen between 1-3 AM during break. Started bringing a thermos of good coffee.', time: '2:30 AM' },
  { type: 'milestone', day: 15, content: 'Halfway milestone reached! Saved $247 so far. The guild feedback on my coffee strategy was incredibly helpful.', time: '12:00 AM' },
  { type: 'text', day: 22, content: 'Week 3 done. The hardest part isn\'t the money — it\'s the social pressure from coworkers ordering in. Created a "shift buddy" system.', time: '4:10 AM' },
];

const BADGES = [
  { name: 'First Experiment', icon: 'FlaskConical', earned: true },
  { name: '7-Day Streak', icon: 'Flame', earned: true },
  { name: 'Insight Giver', icon: 'Lightbulb', earned: true },
  { name: 'Guild Leader', icon: 'Crown', earned: false },
  { name: 'Fork Master', icon: 'GitFork', earned: false },
  { name: '30-Day Champion', icon: 'Trophy', earned: false },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [screenTransition, setScreenTransition] = useState(1);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [activeGuild, setActiveGuild] = useState(null);
  const [pressedCard, setPressedCard] = useState(null);
  const [showNewExperiment, setShowNewExperiment] = useState(false);
  const [experimentTitle, setExperimentTitle] = useState('');
  const [experimentDuration, setExperimentDuration] = useState('30');

  const theme = isDark ? THEMES.dark : THEMES.light;

  const navigateTo = useCallback((screen) => {
    setScreenTransition(0);
    setTimeout(() => {
      setActiveScreen(screen);
      setTimeout(() => setScreenTransition(1), 30);
    }, 150);
  }, []);

  const Icon = ({ name, size = 20, color, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color: color || theme.text, style, strokeWidth: 1.8 });
  };

  const styleTag = React.createElement('style', { dangerouslySetInnerHTML: { __html: `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(100%); }
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
    @keyframes progressFill {
      from { width: 0%; }
    }
    @keyframes badgePop {
      0% { transform: scale(0.5); opacity: 0; }
      60% { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
  `}});

  // ─── HOME SCREEN ───
  const HomeScreen = () => {
    const progress = 22 / 30;
    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.3s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: theme.cta, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 } }, 'Welcome back'),
          React.createElement('div', { style: { fontSize: 34, fontFamily: FONT, fontWeight: 800, color: theme.text, letterSpacing: -0.5 } }, 'GoalGuild')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 20, background: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: theme.textSecondary })),
          React.createElement('div', {
            onClick: () => navigateTo('profile'),
            style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${theme.cta}, #7C3AED)`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 700, color: '#FFF' } }, 'S'))
        )
      ),

      // Active experiment card
      React.createElement('div', {
        onClick: () => { setSelectedExperiment(EXPERIMENTS[0]); navigateTo('storyboard'); },
        style: {
          background: `linear-gradient(135deg, ${theme.cta}, #7C3AED)`,
          borderRadius: 20, padding: 24, marginBottom: 20, cursor: 'pointer',
          animation: 'fadeInUp 0.4s ease', position: 'relative', overflow: 'hidden',
          transition: 'transform 0.2s ease', transform: pressedCard === 'active' ? 'scale(0.98)' : 'scale(1)'
        },
        onMouseDown: () => setPressedCard('active'),
        onMouseUp: () => setPressedCard(null),
        onMouseLeave: () => setPressedCard(null)
      },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative', zIndex: 1 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 4 } }, 'YOUR ACTIVE EXPERIMENT'),
            React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: '#FFF', letterSpacing: -0.3 } }, '30-Day No-Spend Challenge')
          ),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '6px 12px' } },
            React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: '#FFF' } }, 'Day 22')
          )
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 6, height: 6, marginBottom: 12, position: 'relative', zIndex: 1, overflow: 'hidden' } },
          React.createElement('div', { style: { width: `${progress * 100}%`, height: '100%', borderRadius: 6, background: '#FFF', animation: 'progressFill 1s ease', transition: 'width 0.5s ease' } })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 20, position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'FileText', size: 14, color: 'rgba(255,255,255,0.8)' }),
            React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, color: 'rgba(255,255,255,0.8)' } }, '14 updates')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'Lightbulb', size: 14, color: 'rgba(255,255,255,0.8)' }),
            React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, color: 'rgba(255,255,255,0.8)' } }, '8 insights')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'GitFork', size: 14, color: 'rgba(255,255,255,0.8)' }),
            React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, color: 'rgba(255,255,255,0.8)' } }, '3 forks')
          )
        )
      ),

      // Quick actions
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 24, animation: 'fadeInUp 0.5s ease' } },
        [
          { label: 'New Update', icon: 'Plus', action: () => { setSelectedExperiment(EXPERIMENTS[0]); navigateTo('storyboard'); } },
          { label: 'Voice Note', icon: 'Mic', action: () => {} },
          { label: 'New Experiment', icon: 'FlaskConical', action: () => setShowNewExperiment(true) },
        ].map((btn, i) =>
          React.createElement('div', {
            key: i, onClick: btn.action,
            style: {
              flex: 1, background: theme.card, borderRadius: 16, padding: '16px 8px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              cursor: 'pointer', border: `1px solid ${theme.cardBorder}`,
              boxShadow: theme.cardShadow, transition: 'all 0.2s ease',
              transform: pressedCard === `qa-${i}` ? 'scale(0.96)' : 'scale(1)'
            },
            onMouseDown: () => setPressedCard(`qa-${i}`),
            onMouseUp: () => setPressedCard(null),
            onMouseLeave: () => setPressedCard(null)
          },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: theme.badge, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: btn.icon, size: 20, color: theme.cta })
            ),
            React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: theme.text } }, btn.label)
          )
        )
      ),

      // Your Guilds
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, animation: 'fadeInUp 0.6s ease' } },
        React.createElement('span', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, letterSpacing: -0.3 } }, 'Your Guilds'),
        React.createElement('span', {
          onClick: () => navigateTo('guilds'),
          style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.cta, cursor: 'pointer' }
        }, 'See all')
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeInUp 0.7s ease' } },
        GUILD_DATA.slice(0, 2).map((guild, i) =>
          React.createElement('div', {
            key: guild.id,
            onClick: () => { setActiveGuild(guild); navigateTo('guildDetail'); },
            style: {
              background: theme.card, borderRadius: 16, padding: 16,
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', border: `1px solid ${theme.cardBorder}`,
              boxShadow: theme.cardShadow, transition: 'all 0.2s ease',
              transform: pressedCard === `g-${i}` ? 'scale(0.98)' : 'scale(1)'
            },
            onMouseDown: () => setPressedCard(`g-${i}`),
            onMouseUp: () => setPressedCard(null),
            onMouseLeave: () => setPressedCard(null)
          },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${guild.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: guild.icon, size: 22, color: guild.color })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, marginBottom: 2 } }, guild.name),
              React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary } }, `${guild.members.toLocaleString()} members`)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: theme.textTertiary })
          )
        )
      ),

      // Recent Insights
      React.createElement('div', { style: { marginTop: 24, animation: 'fadeInUp 0.8s ease' } },
        React.createElement('span', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, letterSpacing: -0.3 } }, 'Recent Insights'),
        React.createElement('div', { style: { marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 } },
          [
            { from: 'Marcus J.', content: 'Great tip on the coffee thermos strategy! I\'ve been spending $6/night on vending machine coffee. Trying this next shift.', type: 'insight' },
            { from: 'Priya K.', content: 'What if you tried batch-cooking on your days off? I fork-tested this with my envelope system and saved 40% more.', type: 'fork' },
          ].map((insight, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: theme.card, borderRadius: 14, padding: 14,
                border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
                React.createElement('div', { style: { width: 32, height: 32, borderRadius: 16, background: insight.type === 'fork' ? '#F59E0B22' : `${theme.cta}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: insight.type === 'fork' ? 'GitFork' : 'Lightbulb', size: 16, color: insight.type === 'fork' ? '#F59E0B' : theme.cta })
                ),
                React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text } }, insight.from),
                React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, fontWeight: 600, color: insight.type === 'fork' ? '#F59E0B' : theme.cta, background: insight.type === 'fork' ? '#F59E0B18' : `${theme.cta}18`, borderRadius: 6, padding: '2px 8px', marginLeft: 'auto' } }, insight.type === 'fork' ? 'Fork Card' : 'Insight Card')
              ),
              React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, lineHeight: 1.5 } }, insight.content)
            )
          )
        )
      )
    );
  };

  // ─── EXPLORE SCREEN ───
  const ExploreScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('trending');
    const filters = ['trending', 'recent', 'completed', 'most forked'];

    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontFamily: FONT, fontWeight: 800, color: theme.text, letterSpacing: -0.5, marginBottom: 20 } }, 'Explore'),

      // Search
      React.createElement('div', { style: { position: 'relative', marginBottom: 18 } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: 13 } },
          React.createElement(Icon, { name: 'Search', size: 18, color: theme.textTertiary })
        ),
        React.createElement('input', {
          placeholder: 'Search experiments, guilds...',
          value: searchQuery, onChange: e => setSearchQuery(e.target.value),
          style: {
            width: '100%', height: 46, borderRadius: 14, border: `1px solid ${theme.cardBorder}`,
            background: theme.card, paddingLeft: 44, paddingRight: 16, fontSize: 15,
            fontFamily: FONT, color: theme.text, outline: 'none',
            boxShadow: theme.cardShadow, transition: 'border 0.2s ease'
          }
        })
      ),

      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 22, overflowX: 'auto', paddingBottom: 4 } },
        filters.map(f =>
          React.createElement('div', {
            key: f, onClick: () => setFilter(f),
            style: {
              padding: '8px 16px', borderRadius: 20, cursor: 'pointer',
              background: filter === f ? theme.cta : theme.surface,
              color: filter === f ? '#FFF' : theme.textSecondary,
              fontSize: 13, fontFamily: FONT, fontWeight: 600, whiteSpace: 'nowrap',
              transition: 'all 0.2s ease', textTransform: 'capitalize'
            }
          }, f)
        )
      ),

      // Experiments
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        EXPERIMENTS.map((exp, i) =>
          React.createElement('div', {
            key: exp.id,
            onClick: () => { setSelectedExperiment(exp); navigateTo('storyboard'); },
            style: {
              background: theme.card, borderRadius: 18, padding: 18,
              border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow,
              cursor: 'pointer', transition: 'all 0.2s ease',
              animation: `fadeInUp ${0.3 + i * 0.1}s ease`,
              transform: pressedCard === `exp-${i}` ? 'scale(0.98)' : 'scale(1)'
            },
            onMouseDown: () => setPressedCard(`exp-${i}`),
            onMouseUp: () => setPressedCard(null),
            onMouseLeave: () => setPressedCard(null)
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${theme.cta}, #7C3AED)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 700, color: '#FFF' } }, exp.avatar)
              ),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text } }, exp.title),
                React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary } }, `${exp.author} · ${exp.guild}`)
              ),
              exp.status === 'completed'
                ? React.createElement('div', { style: { background: '#16A34A18', borderRadius: 8, padding: '4px 10px' } },
                    React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, fontWeight: 600, color: theme.success } }, 'Completed'))
                : React.createElement('div', { style: { background: `${theme.cta}18`, borderRadius: 8, padding: '4px 10px' } },
                    React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, fontWeight: 600, color: theme.cta } }, `Day ${exp.day}/${exp.totalDays}`))
            ),
            // Progress bar
            React.createElement('div', { style: { background: theme.surface, borderRadius: 4, height: 4, marginBottom: 12, overflow: 'hidden' } },
              React.createElement('div', { style: { width: `${(exp.day / exp.totalDays) * 100}%`, height: '100%', borderRadius: 4, background: exp.status === 'completed' ? theme.success : theme.cta, transition: 'width 0.5s ease' } })
            ),
            React.createElement('div', { style: { display: 'flex', gap: 16 } },
              [
                { icon: 'FileText', label: `${exp.updates} updates` },
                { icon: 'Lightbulb', label: `${exp.insights} insights` },
                { icon: 'GitFork', label: `${exp.forks} forks` },
              ].map((stat, si) =>
                React.createElement('div', { key: si, style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Icon, { name: stat.icon, size: 14, color: theme.textTertiary }),
                  React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary } }, stat.label)
                )
              )
            )
          )
        )
      )
    );
  };

  // ─── GUILDS SCREEN ───
  const GuildsScreen = () => {
    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontFamily: FONT, fontWeight: 800, color: theme.text, letterSpacing: -0.5, marginBottom: 6 } }, 'Guild Halls'),
      React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, color: theme.textTertiary, marginBottom: 24 } }, 'Find your people. Join the journey.'),

      // Featured
      React.createElement('div', {
        onClick: () => { setActiveGuild(GUILD_DATA[0]); navigateTo('guildDetail'); },
        style: {
          background: `linear-gradient(135deg, ${GUILD_DATA[0].color}, ${GUILD_DATA[0].color}CC)`,
          borderRadius: 22, padding: 24, marginBottom: 20, cursor: 'pointer',
          position: 'relative', overflow: 'hidden', animation: 'fadeInUp 0.4s ease'
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
          React.createElement(Icon, { name: 'Star', size: 14, color: '#FFF' }),
          React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 1 } }, 'Featured Guild')
        ),
        React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: '#FFF', marginBottom: 6 } }, GUILD_DATA[0].name),
        React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, color: 'rgba(255,255,255,0.8)', marginBottom: 14, lineHeight: 1.4 } }, GUILD_DATA[0].desc),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(Icon, { name: 'Users', size: 14, color: 'rgba(255,255,255,0.7)' }),
          React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, color: 'rgba(255,255,255,0.7)' } }, `${GUILD_DATA[0].members.toLocaleString()} members`)
        )
      ),

      // All Guilds
      React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, marginBottom: 14 } }, 'All Guilds'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        GUILD_DATA.map((guild, i) =>
          React.createElement('div', {
            key: guild.id,
            onClick: () => { setActiveGuild(guild); navigateTo('guildDetail'); },
            style: {
              background: theme.card, borderRadius: 18, padding: 18,
              border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow,
              cursor: 'pointer', animation: `fadeInUp ${0.4 + i * 0.1}s ease`,
              display: 'flex', alignItems: 'center', gap: 14,
              transition: 'all 0.2s ease',
              transform: pressedCard === `gld-${i}` ? 'scale(0.98)' : 'scale(1)'
            },
            onMouseDown: () => setPressedCard(`gld-${i}`),
            onMouseUp: () => setPressedCard(null),
            onMouseLeave: () => setPressedCard(null)
          },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${guild.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: guild.icon, size: 24, color: guild.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, marginBottom: 3 } }, guild.name),
              React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary, lineHeight: 1.4 } }, guild.desc),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 } },
                React.createElement(Icon, { name: 'Users', size: 12, color: theme.textTertiary }),
                React.createElement('span', { style: { fontSize: 12, fontFamily: FONT, color: theme.textTertiary } }, `${guild.members.toLocaleString()} members`)
              )
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: theme.textTertiary })
          )
        )
      )
    );
  };

  // ─── GUILD DETAIL SCREEN ───
  const GuildDetailScreen = () => {
    const guild = activeGuild || GUILD_DATA[0];
    const guildExperiments = EXPERIMENTS.filter(e => e.guild === guild.name);
    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { onClick: () => navigateTo('guilds'), style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, cursor: 'pointer' } },
        React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: theme.cta }),
        React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.cta } }, 'Guilds')
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 } },
        React.createElement('div', { style: { width: 56, height: 56, borderRadius: 18, background: `${guild.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: guild.icon, size: 28, color: guild.color })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, letterSpacing: -0.3 } }, guild.name),
          React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary } }, `${guild.members.toLocaleString()} members`)
        )
      ),
      React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, lineHeight: 1.5, marginBottom: 24 } }, guild.desc),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
        [
          { label: 'Active', value: '28', icon: 'FlaskConical' },
          { label: 'Completed', value: '142', icon: 'CheckCircle' },
          { label: 'Insights', value: '891', icon: 'Lightbulb' },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: theme.card, borderRadius: 14, padding: 14, textAlign: 'center', border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 8 } },
              React.createElement(Icon, { name: stat.icon, size: 18, color: theme.cta })
            ),
            React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary, fontWeight: 500 } }, stat.label)
          )
        )
      ),

      // Experiments in guild
      React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, marginBottom: 14 } }, 'Recent Experiments'),
      guildExperiments.length > 0 ? guildExperiments.map((exp, i) =>
        React.createElement('div', {
          key: exp.id,
          onClick: () => { setSelectedExperiment(exp); navigateTo('storyboard'); },
          style: { background: theme.card, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${theme.cardBorder}`, cursor: 'pointer', boxShadow: theme.cardShadow }
        },
          React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text } }, exp.title),
          React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary, marginTop: 4 } }, `${exp.author} · Day ${exp.day}/${exp.totalDays}`)
        )
      ) : React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, color: theme.textTertiary, textAlign: 'center', padding: 40 } }, 'No experiments yet. Start one!')
    );
  };

  // ─── STORYBOARD SCREEN ───
  const StoryboardScreen = () => {
    const exp = selectedExperiment || EXPERIMENTS[0];
    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { onClick: () => navigateTo('explore'), style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, cursor: 'pointer' } },
        React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: theme.cta }),
        React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.cta } }, 'Back')
      ),
      React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, letterSpacing: -0.3, marginBottom: 6 } }, exp.title),
      React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, color: theme.textTertiary, marginBottom: 20 } }, `by ${exp.author} · ${exp.guild}`),

      // Progress
      React.createElement('div', { style: { background: theme.card, borderRadius: 16, padding: 16, marginBottom: 20, border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
          React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: theme.textSecondary } }, 'Progress'),
          React.createElement('span', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 700, color: theme.cta } }, `${Math.round((exp.day / exp.totalDays) * 100)}%`)
        ),
        React.createElement('div', { style: { background: theme.surface, borderRadius: 6, height: 8, overflow: 'hidden' } },
          React.createElement('div', { style: { width: `${(exp.day / exp.totalDays) * 100}%`, height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${theme.cta}, #7C3AED)`, animation: 'progressFill 1.2s ease' } })
        )
      ),

      // Timeline
      React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, marginBottom: 14 } }, 'Storyboard Timeline'),
      React.createElement('div', { style: { position: 'relative', paddingLeft: 24 } },
        // Vertical line
        React.createElement('div', { style: { position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: theme.surfaceAlt, borderRadius: 1 } }),
        STORYBOARD_ENTRIES.map((entry, i) =>
          React.createElement('div', {
            key: i,
            style: { position: 'relative', marginBottom: 18, animation: `fadeInUp ${0.3 + i * 0.1}s ease` }
          },
            // Dot
            React.createElement('div', { style: {
              position: 'absolute', left: -20, top: 6, width: 12, height: 12, borderRadius: 6,
              background: entry.type === 'milestone' ? theme.success : entry.type === 'voice' ? '#7C3AED' : theme.cta,
              border: `2px solid ${theme.background}`
            }}),
            React.createElement('div', { style: { background: theme.card, borderRadius: 14, padding: 14, border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Icon, { name: entry.type === 'voice' ? 'Mic' : entry.type === 'milestone' ? 'Award' : 'FileText', size: 14, color: entry.type === 'milestone' ? theme.success : theme.textTertiary }),
                  React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, fontWeight: 600, color: entry.type === 'milestone' ? theme.success : theme.textTertiary, textTransform: 'uppercase' } }, entry.type === 'milestone' ? 'Milestone' : entry.type === 'voice' ? 'Voice Note' : 'Update')
                ),
                React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary, marginLeft: 'auto' } }, `Day ${entry.day} · ${entry.time}`)
              ),
              React.createElement('div', { style: {
                fontSize: 15, fontFamily: FONT, color: theme.text, lineHeight: 1.5,
                ...(entry.type === 'milestone' ? { fontWeight: 600 } : {})
              }}, entry.content),
              entry.type === 'voice' && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, background: theme.surface, borderRadius: 10, padding: '8px 12px' } },
                React.createElement('div', { style: { width: 32, height: 32, borderRadius: 16, background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
                  React.createElement(Icon, { name: 'Play', size: 14, color: '#FFF' })
                ),
                React.createElement('div', { style: { flex: 1, height: 4, background: theme.surfaceAlt, borderRadius: 2, overflow: 'hidden' } },
                  React.createElement('div', { style: { width: '35%', height: '100%', background: '#7C3AED', borderRadius: 2 } })
                ),
                React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary } }, '2:14')
              )
            )
          )
        )
      ),

      // Action buttons
      React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 8 } },
        React.createElement('div', {
          style: {
            flex: 1, height: 48, borderRadius: 14, background: theme.cta,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer', transition: 'all 0.2s ease'
          }
        },
          React.createElement(Icon, { name: 'Lightbulb', size: 18, color: '#FFF' }),
          React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: '#FFF' } }, 'Send Insight')
        ),
        React.createElement('div', {
          style: {
            flex: 1, height: 48, borderRadius: 14, background: theme.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer', border: `1px solid ${theme.cardBorder}`, transition: 'all 0.2s ease'
          }
        },
          React.createElement(Icon, { name: 'GitFork', size: 18, color: theme.text }),
          React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text } }, 'Fork This')
        )
      )
    );
  };

  // ─── PROFILE SCREEN ───
  const ProfileScreen = () => {
    return React.createElement('div', { style: { padding: '20px 20px 24px', animation: 'fadeIn 0.3s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 } },
        React.createElement('div', { style: { width: 68, height: 68, borderRadius: 22, background: `linear-gradient(135deg, ${theme.cta}, #7C3AED)`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInUp 0.3s ease' } },
          React.createElement('span', { style: { fontSize: 28, fontFamily: FONT, fontWeight: 700, color: '#FFF' } }, 'S')
        ),
        React.createElement('div', { style: { animation: 'fadeInUp 0.4s ease' } },
          React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, letterSpacing: -0.3 } }, 'Sarah Mitchell'),
          React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary } }, 'Night shift RN · Member since Jan 2026'),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 6 } },
            React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, fontWeight: 600, color: theme.cta, background: `${theme.cta}18`, borderRadius: 6, padding: '2px 8px' } }, 'Night Owl Navigators'),
            React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, fontWeight: 600, color: '#059669', background: '#05966918', borderRadius: 6, padding: '2px 8px' } }, 'Early Retirement')
          )
        )
      ),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 28, animation: 'fadeInUp 0.5s ease' } },
        [
          { value: '4', label: 'Experiments' },
          { value: '23', label: 'Insights Given' },
          { value: '156', label: 'Day Streak' },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: theme.card, borderRadius: 14, padding: 14, textAlign: 'center', border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow } },
            React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary, fontWeight: 500 } }, stat.label)
          )
        )
      ),

      // Mastery Path
      React.createElement('div', { style: { marginBottom: 28, animation: 'fadeInUp 0.6s ease' } },
        React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, marginBottom: 14 } }, 'Mastery Path'),
        React.createElement('div', { style: { background: theme.card, borderRadius: 18, padding: 18, border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text } }, 'Night Owl Navigator'),
              React.createElement('div', { style: { fontSize: 13, fontFamily: FONT, color: theme.textTertiary } }, 'Level 3 — Pathfinder')
            ),
            React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.cta } }, '68%')
          ),
          React.createElement('div', { style: { background: theme.surface, borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 16 } },
            React.createElement('div', { style: { width: '68%', height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${theme.cta}, #7C3AED)`, animation: 'progressFill 1.2s ease' } })
          ),
          // Milestones
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            ['Novice', 'Explorer', 'Pathfinder', 'Master', 'Legend'].map((level, i) =>
              React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
                React.createElement('div', { style: {
                  width: 28, height: 28, borderRadius: 14,
                  background: i <= 2 ? theme.cta : theme.surface,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }},
                  i <= 2
                    ? React.createElement(Icon, { name: 'Check', size: 14, color: '#FFF' })
                    : React.createElement('span', { style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary } }, i + 1)
                ),
                React.createElement('span', { style: { fontSize: 9, fontFamily: FONT, color: i <= 2 ? theme.cta : theme.textTertiary, fontWeight: 500 } }, level)
              )
            )
          )
        )
      ),

      // Badges
      React.createElement('div', { style: { animation: 'fadeInUp 0.7s ease' } },
        React.createElement('div', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, marginBottom: 14 } }, 'Badges Earned'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          BADGES.map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: theme.card, borderRadius: 16, padding: 16, textAlign: 'center',
                border: `1px solid ${theme.cardBorder}`, boxShadow: theme.cardShadow,
                opacity: badge.earned ? 1 : 0.4,
                animation: badge.earned ? `badgePop ${0.3 + i * 0.1}s ease` : 'none'
              }
            },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 22, background: badge.earned ? `${theme.cta}18` : theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
                React.createElement(Icon, { name: badge.icon, size: 22, color: badge.earned ? theme.cta : theme.textTertiary })
              ),
              React.createElement('div', { style: { fontSize: 12, fontFamily: FONT, fontWeight: 600, color: theme.text, lineHeight: 1.3 } }, badge.name)
            )
          )
        )
      ),

      // Settings
      React.createElement('div', { style: { marginTop: 28, animation: 'fadeInUp 0.8s ease' } },
        [
          { icon: 'Settings', label: 'Preferences' },
          { icon: 'Bell', label: 'Notifications' },
          { icon: 'Shield', label: 'Privacy & Data' },
          { icon: 'HelpCircle', label: 'Help & Support' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
              borderBottom: i < 3 ? `1px solid ${theme.cardBorder}` : 'none',
              cursor: 'pointer'
            }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: item.icon, size: 18, color: theme.textSecondary })
            ),
            React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 500, color: theme.text, flex: 1 } }, item.label),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: theme.textTertiary })
          )
        )
      )
    );
  };

  // ─── NEW EXPERIMENT MODAL ───
  const NewExperimentModal = () => {
    if (!showNewExperiment) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, background: theme.overlay, display: 'flex',
        alignItems: 'flex-end', zIndex: 100, animation: 'fadeIn 0.2s ease'
      },
      onClick: (e) => { if (e.target === e.currentTarget) setShowNewExperiment(false); }
    },
      React.createElement('div', { style: {
        width: '100%', background: theme.card, borderRadius: '24px 24px 0 0',
        padding: 24, animation: 'slideUp 0.3s ease'
      }},
        React.createElement('div', { style: { width: 36, height: 4, borderRadius: 2, background: theme.surfaceAlt, margin: '0 auto 20px' } }),
        React.createElement('div', { style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, marginBottom: 20, letterSpacing: -0.3 } }, 'Forge New Experiment'),

        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block' } }, 'Experiment Name'),
          React.createElement('input', {
            value: experimentTitle, onChange: e => setExperimentTitle(e.target.value),
            placeholder: 'e.g., 30-day no-spend challenge',
            style: {
              width: '100%', height: 48, borderRadius: 12, border: `1px solid ${theme.cardBorder}`,
              background: theme.surface, padding: '0 16px', fontSize: 15, fontFamily: FONT,
              color: theme.text, outline: 'none'
            }
          })
        ),

        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('label', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block' } }, 'Duration (days)'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            ['7', '14', '30', '60', '90'].map(d =>
              React.createElement('div', {
                key: d, onClick: () => setExperimentDuration(d),
                style: {
                  flex: 1, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: experimentDuration === d ? theme.cta : theme.surface,
                  color: experimentDuration === d ? '#FFF' : theme.textSecondary,
                  fontSize: 15, fontFamily: FONT, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }
              }, d)
            )
          )
        ),

        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('label', { style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block' } }, 'Guild'),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
            GUILD_DATA.slice(0, 3).map(guild =>
              React.createElement('div', {
                key: guild.id,
                style: {
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 12, background: theme.surface, cursor: 'pointer', border: `1px solid ${theme.cardBorder}`
                }
              },
                React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `${guild.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: guild.icon, size: 16, color: guild.color })
                ),
                React.createElement('span', { style: { fontSize: 15, fontFamily: FONT, fontWeight: 500, color: theme.text } }, guild.name)
              )
            )
          )
        ),

        React.createElement('div', {
          onClick: () => setShowNewExperiment(false),
          style: {
            height: 52, borderRadius: 16, background: theme.cta,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s ease'
          }
        },
          React.createElement(Icon, { name: 'FlaskConical', size: 18, color: '#FFF' }),
          React.createElement('span', { style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: '#FFF', marginLeft: 8 } }, 'Start Experiment')
        )
      )
    );
  };

  // ─── SCREEN ROUTER ───
  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    guilds: GuildsScreen,
    guildDetail: GuildDetailScreen,
    storyboard: StoryboardScreen,
    profile: ProfileScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'guilds', label: 'Guilds', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, padding: '20px 0' } },
    styleTag,
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
      background: theme.background, position: 'relative',
      boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)',
      display: 'flex', flexDirection: 'column'
    }},
      // Content area
      React.createElement('div', { style: {
        flex: 1, overflow: 'auto', paddingTop: 12, paddingBottom: 86,
        opacity: screenTransition, transition: 'opacity 0.15s ease',
        WebkitOverflowScrolling: 'touch'
      }},
        React.createElement(ScreenComponent)
      ),

      // New experiment modal
      React.createElement(NewExperimentModal),

      // Bottom tab bar
      React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: theme.tabBar, backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${theme.tabBarBorder}`,
        padding: '8px 16px 28px', display: 'flex', justifyContent: 'space-around'
      }},
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => navigateTo(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer', padding: '6px 12px', borderRadius: 12,
              transition: 'all 0.2s ease', minWidth: 54, minHeight: 44,
              justifyContent: 'center'
            }
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id || (tab.id === 'home' && activeScreen === 'home') ? theme.cta : theme.textTertiary
            }),
            React.createElement('span', { style: {
              fontSize: 10, fontFamily: FONT, fontWeight: 600,
              color: activeScreen === tab.id || (tab.id === 'home' && activeScreen === 'home') ? theme.cta : theme.textTertiary,
              transition: 'color 0.2s ease'
            }}, tab.label)
          )
        )
      )
    )
  );
}