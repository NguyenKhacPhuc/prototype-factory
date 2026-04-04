const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1A1A1A',
    surface: '#242424',
    surfaceAlt: '#2C2C2C',
    border: '#3A3A3A',
    text: '#F5F0EE',
    textMuted: '#A09890',
    textSubtle: '#6A6460',
    primary: '#E91E63',
    primaryLight: '#FF4081',
    accent: '#FF8A65',
    tag: '#3A2830',
    tagText: '#E91E63',
    cardBg: '#2C2C2C',
    navBg: '#1A1A1A',
    navBorder: '#2A2A2A',
    inputBg: '#2C2C2C',
    overlay: 'rgba(26,26,26,0.7)',
  },
  light: {
    bg: '#FFF0F0',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF8F8',
    border: '#EED8D8',
    text: '#2C2C2C',
    textMuted: '#7A6A6A',
    textSubtle: '#B09A9A',
    primary: '#E91E63',
    primaryLight: '#FF4081',
    accent: '#E64A19',
    tag: '#FCE4EC',
    tagText: '#C2185B',
    cardBg: '#FFFFFF',
    navBg: '#FFF0F0',
    navBorder: '#EED8D8',
    inputBg: '#FFFFFF',
    overlay: 'rgba(255,240,240,0.7)',
  }
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 0px; }
    .btn-press:active { transform: scale(0.96); }
    .hover-lift:hover { transform: translateY(-2px); }
  `;

  const screens = { home: HomeScreen, explore: ExploreScreen, create: CreateScreen, fabledex: FabledexScreen };
  const ActiveScreen = screens[activeScreen];

  return (
    React.createElement('div', {
      style: { background: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo', sans-serif", padding: '20px' }
    },
      React.createElement('style', null, fontStyle),
      React.createElement('div', {
        style: { width: 375, height: 812, background: t.bg, borderRadius: 40, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.35)', border: `1px solid ${t.border}` }
      },
        React.createElement(ActiveScreen, { t, setActiveScreen, isDark, setIsDark }),
        React.createElement(BottomNav, { t, activeScreen, setActiveScreen })
      )
    )
  );
}

function BottomNav({ t, activeScreen, setActiveScreen }) {
  const HomeIcon = window.lucide?.Home || (() => React.createElement('span', null, '⌂'));
  const CompassIcon = window.lucide?.Compass || (() => React.createElement('span', null, '◎'));
  const PlusCircleIcon = window.lucide?.PlusCircle || (() => React.createElement('span', null, '+'));
  const BookOpenIcon = window.lucide?.BookOpen || (() => React.createElement('span', null, '📖'));

  const tabs = [
    { id: 'home', label: 'Club', Icon: HomeIcon },
    { id: 'explore', label: 'Explore', Icon: CompassIcon },
    { id: 'create', label: 'Create', Icon: PlusCircleIcon },
    { id: 'fabledex', label: 'Fabledex', Icon: BookOpenIcon },
  ];

  return (
    React.createElement('div', {
      style: { background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', padding: '8px 0 16px', flexShrink: 0 }
    },
      tabs.map(({ id, label, Icon }) => {
        const active = activeScreen === id;
        return React.createElement('button', {
          key: id,
          className: 'btn-press',
          onClick: () => setActiveScreen(id),
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }
        },
          React.createElement(Icon, { size: 22, color: active ? t.primary : t.textSubtle, strokeWidth: active ? 2.5 : 1.8 }),
          React.createElement('span', {
            style: { fontSize: 10, fontFamily: "'Archivo Black', sans-serif", color: active ? t.primary : t.textSubtle, letterSpacing: '0.5px', textTransform: 'uppercase' }
          }, label)
        );
      })
    )
  );
}

function HomeScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [activeTab, setActiveTab] = useState('hot');
  const SunIcon = window.lucide?.Sun || (() => null);
  const MoonIcon = window.lucide?.Moon || (() => null);
  const TrendingUpIcon = window.lucide?.TrendingUp || (() => null);
  const FlameIcon = window.lucide?.Flame || (() => null);
  const StarIcon = window.lucide?.Star || (() => null);
  const BookmarkIcon = window.lucide?.Bookmark || (() => null);
  const MessageSquareIcon = window.lucide?.MessageSquare || (() => null);
  const AwardIcon = window.lucide?.Award || (() => null);

  const fables = [
    {
      id: 1,
      title: "The Freelancer's Down Payment Dilemma",
      summary: "Maya earns $6k/mo but struggles to save while managing $42k in student debt and a $280k home goal.",
      author: "quietcents",
      avatar: "QC",
      avatarColor: '#FF6B9D',
      solvers: 24,
      strategies: 47,
      badge: 'Hot',
      badgeColor: '#FF4081',
      tags: ['Housing', 'Debt', 'Freelance'],
      timeAgo: '2h ago',
      solved: false,
      gradient: 'linear-gradient(135deg, #1a0a12 0%, #3d0a2e 100%)',
    },
    {
      id: 2,
      title: "Theo's Inheritance & Investment Crossroads",
      summary: "A 28-year-old inherits $85k and must decide: pay off car loan, invest in index funds, or start a business.",
      author: "wealthwarden",
      avatar: "WW",
      avatarColor: '#64B5F6',
      solvers: 61,
      strategies: 112,
      badge: 'Solved',
      badgeColor: '#4CAF50',
      tags: ['Investing', 'Inheritance', 'Decision'],
      timeAgo: '1d ago',
      solved: true,
      gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2744 100%)',
    },
    {
      id: 3,
      title: "Single Parent Emergency Fund Sprint",
      summary: "Jordan earns $3,800/mo with two kids, no emergency fund, and a car that needs $2k in repairs immediately.",
      author: "survivorbudget",
      avatar: "SB",
      avatarColor: '#FFB74D',
      solvers: 18,
      strategies: 33,
      badge: 'New',
      badgeColor: '#9C27B0',
      tags: ['Emergency Fund', 'Single Parent'],
      timeAgo: '5h ago',
      solved: false,
      gradient: 'linear-gradient(135deg, #1a1200 0%, #3d2800 100%)',
    },
  ];

  return (
    React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }
    },
      // Full-bleed header
      React.createElement('div', {
        style: { background: 'linear-gradient(160deg, #3d0a2e 0%, #1A0015 60%, #1A1A1A 100%)', padding: '28px 24px 20px', position: 'relative', flexShrink: 0 }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, fontFamily: "'Archivo Black', sans-serif", color: t.primary, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 6 } }, 'FableFi Club'),
            React.createElement('h1', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 26, color: '#F5F0EE', margin: 0, lineHeight: 1.1 } },
              'Money Mysteries', React.createElement('br'), 'Await.'
            )
          ),
          React.createElement('button', {
            className: 'btn-press',
            onClick: () => setIsDark(!isDark),
            style: { background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          },
            isDark ? React.createElement(SunIcon, { size: 16, color: '#FFD54F' }) : React.createElement(MoonIcon, { size: 16, color: '#B0BEC5' })
          )
        ),
        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          [['847', 'Active Fables'], ['3.2k', 'Solvers'], ['12k', 'Strategies']].map(([num, label]) =>
            React.createElement('div', { key: label },
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: t.primary } }, num),
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(245,240,238,0.5)', letterSpacing: '1px', textTransform: 'uppercase' } }, label)
            )
          )
        )
      ),

      // Tab filter
      React.createElement('div', {
        style: { display: 'flex', padding: '0 24px', borderBottom: `1px solid ${t.border}`, background: t.bg, flexShrink: 0 }
      },
        [['hot', FlameIcon, 'Hot'], ['new', StarIcon, 'New'], ['trending', TrendingUpIcon, 'Trending']].map(([id, Icon, label]) =>
          React.createElement('button', {
            key: id,
            className: 'btn-press',
            onClick: () => setActiveTab(id),
            style: { display: 'flex', alignItems: 'center', gap: 5, padding: '12px 16px 10px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === id ? t.primary : 'transparent'}`, cursor: 'pointer', color: activeTab === id ? t.primary : t.textSubtle, marginBottom: -1 }
          },
            React.createElement(Icon, { size: 14, color: activeTab === id ? t.primary : t.textSubtle }),
            React.createElement('span', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase' } }, label)
          )
        )
      ),

      // Fable cards
      React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
        fables.map(fable =>
          React.createElement('div', {
            key: fable.id,
            className: 'btn-press hover-lift',
            onClick: () => setActiveScreen('explore'),
            style: { background: fable.gradient, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: `1px solid rgba(233,30,99,0.15)`, transition: 'transform 0.2s' }
          },
            React.createElement('div', { style: { padding: '18px 18px 14px' } },
              // Header
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
                React.createElement('div', { style: { display: 'flex', gap: 6 } },
                  fable.tags.slice(0, 2).map(tag =>
                    React.createElement('span', {
                      key: tag,
                      style: { fontSize: 10, fontFamily: "'Archivo Black', sans-serif", color: 'rgba(245,240,238,0.7)', background: 'rgba(255,255,255,0.08)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.5px', textTransform: 'uppercase' }
                    }, tag)
                  )
                ),
                React.createElement('span', {
                  style: { fontSize: 10, fontFamily: "'Archivo Black', sans-serif", color: fable.badgeColor, background: `${fable.badgeColor}22`, borderRadius: 4, padding: '3px 8px', border: `1px solid ${fable.badgeColor}44` }
                }, fable.badge)
              ),
              // Title
              React.createElement('h3', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: '#F5F0EE', margin: '0 0 8px', lineHeight: 1.3 } }, fable.title),
              // Summary
              React.createElement('p', { style: { fontSize: 12, color: 'rgba(245,240,238,0.6)', margin: '0 0 14px', lineHeight: 1.5 } }, fable.summary),
              // Footer
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('div', { style: { width: 24, height: 24, borderRadius: 12, background: fable.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontFamily: "'Archivo Black', sans-serif", color: '#fff' } }, fable.avatar),
                  React.createElement('span', { style: { fontSize: 11, color: 'rgba(245,240,238,0.5)' } }, `@${fable.author} · ${fable.timeAgo}`)
                ),
                React.createElement('div', { style: { display: 'flex', gap: 12 } },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(MessageSquareIcon, { size: 12, color: 'rgba(245,240,238,0.4)' }),
                    React.createElement('span', { style: { fontSize: 11, color: 'rgba(245,240,238,0.4)' } }, fable.strategies)
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(AwardIcon, { size: 12, color: 'rgba(245,240,238,0.4)' }),
                    React.createElement('span', { style: { fontSize: 11, color: 'rgba(245,240,238,0.4)' } }, fable.solvers)
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

function ExploreScreen({ t, setActiveScreen }) {
  const [selected, setSelected] = useState(null);
  const SearchIcon = window.lucide?.Search || (() => null);
  const ArrowRightIcon = window.lucide?.ArrowRight || (() => null);
  const BookmarkPlusIcon = window.lucide?.BookmarkPlus || (() => null);
  const UsersIcon = window.lucide?.Users || (() => null);
  const TrophyIcon = window.lucide?.Trophy || (() => null);
  const ChevronRightIcon = window.lucide?.ChevronRight || (() => null);
  const XIcon = window.lucide?.X || (() => null);

  const collections = [
    { id: 'firstinvestor', label: 'First-Time Investor Fables', count: 34, emoji: '📈', color: '#E91E63', bg: 'linear-gradient(135deg, #3d0a2e 0%, #1a0a18 100%)' },
    { id: 'debtfree', label: 'Debt-Free Journeys', count: 28, emoji: '🔓', color: '#FF8A65', bg: 'linear-gradient(135deg, #2d1a00 0%, #1a0d00 100%)' },
    { id: 'sidehustle', label: 'Side Hustle Builders', count: 19, emoji: '⚡', color: '#FFD54F', bg: 'linear-gradient(135deg, #2d2800 0%, #1a1800 100%)' },
    { id: 'familyplan', label: 'Family Finance Plans', count: 41, emoji: '🏠', color: '#4FC3F7', bg: 'linear-gradient(135deg, #002d3d 0%, #001a24 100%)' },
  ];

  const featuredFable = {
    title: "The Inheritance & Investment Crossroads",
    detail: "Theo, 28, inherits $85,000 unexpectedly. He carries a $14k car loan at 7.5% APR and rents at $1,400/mo in Denver. His take-home is $4,200/mo from his software job. He dreams of starting a coffee roasting business but also recognizes this may be his only wealth-building head start. What should Theo do?",
    strategies: [
      { user: 'fiscalphilosopher', avatar: 'FP', color: '#FF6B9D', tip: 'Pay off the car loan first — guaranteed 7.5% return. Then build 6-month emergency fund ($25k). Remainder into low-cost index fund (VTI).', votes: 34 },
      { user: 'compoundking', avatar: 'CK', color: '#64B5F6', tip: 'Dollar-cost average $60k into S&P 500 over 12 months. Keep $15k liquid. Car loan interest is below long-term equity returns historically.', votes: 28 },
      { user: 'quietcents', avatar: 'QC', color: '#A5D6A7', tip: 'Allocate $10k to a business fund, pay off the car, invest the rest. Testing entrepreneurship with a small budget is low-risk with this cushion.', votes: 19 },
    ]
  };

  if (selected) {
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
      // Full-bleed header
      React.createElement('div', {
        style: { background: 'linear-gradient(160deg, #0a1628 0%, #0d2244 50%, #1A1A1A 100%)', padding: '28px 22px 24px', position: 'relative' }
      },
        React.createElement('button', { onClick: () => setSelected(null), style: { background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 20, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 14 } },
          React.createElement(XIcon, { size: 16, color: '#F5F0EE' })
        ),
        React.createElement('div', { style: { fontSize: 10, color: t.primary, fontFamily: "'Archivo Black', sans-serif", letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 } }, '★ Featured Fable'),
        React.createElement('h2', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#F5F0EE', margin: '0 0 12px', lineHeight: 1.2 } }, featuredFable.title),
        React.createElement('p', { style: { fontSize: 12, color: 'rgba(245,240,238,0.65)', lineHeight: 1.6, margin: 0 } }, featuredFable.detail)
      ),
      React.createElement('div', { style: { padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.primary, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 } }, 'Top Strategies'),
        featuredFable.strategies.map((s, i) =>
          React.createElement('div', { key: i, style: { background: t.cardBg, borderRadius: 12, padding: '14px 16px', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
              React.createElement('div', { style: { width: 28, height: 28, borderRadius: 14, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: "'Archivo Black', sans-serif", color: '#fff' } }, s.avatar),
              React.createElement('span', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.text } }, `@${s.user}`),
              React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, background: `${t.primary}18`, borderRadius: 8, padding: '3px 8px' } },
                React.createElement(TrophyIcon, { size: 10, color: t.primary }),
                React.createElement('span', { style: { fontSize: 11, color: t.primary, fontFamily: "'Archivo Black', sans-serif" } }, s.votes)
              )
            ),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, margin: 0, lineHeight: 1.6 } }, s.tip)
          )
        )
      )
    );
  }

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
    // Header
    React.createElement('div', { style: { padding: '28px 22px 20px', background: t.bg, flexShrink: 0 } },
      React.createElement('h2', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: t.text, margin: '0 0 6px' } }, 'Explore'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '0 0 16px' } }, 'Curated fable collections & featured mysteries'),
      // Search
      React.createElement('div', { style: { background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px' } },
        React.createElement(SearchIcon, { size: 16, color: t.textSubtle }),
        React.createElement('span', { style: { fontSize: 13, color: t.textSubtle } }, 'Search fables, tags, topics...')
      )
    ),

    // Featured
    React.createElement('div', { style: { padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: t.primary, letterSpacing: '3px', textTransform: 'uppercase' } }, 'Featured Collection'),

      React.createElement('button', {
        className: 'btn-press',
        onClick: () => setSelected('featured'),
        style: { background: 'linear-gradient(135deg, #3d0a2e 0%, #0d2244 100%)', borderRadius: 16, overflow: 'hidden', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '22px 20px' }
      },
        React.createElement('div', { style: { fontSize: 11, color: t.primary, fontFamily: "'Archivo Black', sans-serif", letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 } }, '★ This Week\'s Top Fable'),
        React.createElement('h3', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 17, color: '#F5F0EE', margin: '0 0 10px', lineHeight: 1.3 } }, 'The Inheritance & Investment Crossroads'),
        React.createElement('p', { style: { fontSize: 12, color: 'rgba(245,240,238,0.6)', margin: '0 0 16px', lineHeight: 1.5 } }, '61 solvers. 112 strategies. A 28-year-old\'s $85k windfall and the 3 paths ahead.'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('div', { style: { fontSize: 12, color: t.primary, fontFamily: "'Archivo Black', sans-serif" } }, 'Read Fable'),
          React.createElement(ArrowRightIcon, { size: 14, color: t.primary })
        )
      ),

      // Collections
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: t.primary, letterSpacing: '3px', textTransform: 'uppercase', marginTop: 4 } }, 'Collections'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        collections.map(col =>
          React.createElement('div', {
            key: col.id,
            className: 'btn-press',
            style: { background: col.bg, borderRadius: 14, padding: '18px 14px', cursor: 'pointer', border: `1px solid rgba(255,255,255,0.05)` }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 10 } }, col.emoji),
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: '#F5F0EE', lineHeight: 1.3, marginBottom: 6 } }, col.label),
            React.createElement('div', { style: { fontSize: 11, color: col.color, display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(UsersIcon, { size: 10, color: col.color }),
              `${col.count} fables`
            )
          )
        )
      ),

      // Top solvers
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: t.primary, letterSpacing: '3px', textTransform: 'uppercase', marginTop: 4 } }, 'Top Solvers This Week'),
      [
        { name: 'fiscalphilosopher', pts: '2,840 pts', badge: '🏆', color: '#FFD54F' },
        { name: 'compoundking', pts: '1,920 pts', badge: '🥈', color: '#B0BEC5' },
        { name: 'quietcents', pts: '1,540 pts', badge: '🥉', color: '#FFAB40' },
      ].map((solver, i) =>
        React.createElement('div', { key: solver.name, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: t.cardBg, borderRadius: 10, border: `1px solid ${t.border}` } },
          React.createElement('span', { style: { fontSize: 16 } }, solver.badge),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.text } }, `@${solver.name}`),
            React.createElement('div', { style: { fontSize: 11, color: solver.color } }, solver.pts)
          ),
          React.createElement(ChevronRightIcon, { size: 16, color: t.textSubtle })
        )
      )
    )
  );
}

function CreateScreen({ t }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [challenge, setChallenge] = useState('');
  const [goal, setGoal] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const SparklesIcon = window.lucide?.Sparkles || (() => null);
  const ChevronRightIcon = window.lucide?.ChevronRight || (() => null);
  const CheckIcon = window.lucide?.Check || (() => null);

  const tags = ['Housing', 'Debt', 'Investing', 'Freelance', 'Family', 'Emergency', 'Retirement', 'Startup'];

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const steps = ['Setup', 'Challenge', 'Goals', 'Publish'];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
    // Header
    React.createElement('div', { style: { padding: '28px 22px 20px', flexShrink: 0 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
        React.createElement(SparklesIcon, { size: 18, color: t.primary }),
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: t.primary, letterSpacing: '3px', textTransform: 'uppercase' } }, 'New Fable')
      ),
      React.createElement('h2', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: t.text, margin: '0 0 20px' } }, 'Craft Your\nMoney Mystery'),
      // Step indicator
      React.createElement('div', { style: { display: 'flex', gap: 0 } },
        steps.map((s, i) => {
          const isActive = step === i + 1;
          const isDone = step > i + 1;
          return React.createElement('div', { key: s, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { width: '100%', height: 3, background: isDone || isActive ? t.primary : t.border, borderRadius: 2, marginBottom: 4 } }),
            React.createElement('span', { style: { fontSize: 9, fontFamily: "'Archivo Black', sans-serif", color: isActive ? t.primary : isDone ? t.textMuted : t.textSubtle, letterSpacing: '1px', textTransform: 'uppercase' } }, s)
          );
        })
      )
    ),

    React.createElement('div', { style: { padding: '4px 22px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 } },

      step === 1 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        React.createElement('div', null,
          React.createElement('label', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textMuted, display: 'block', marginBottom: 6, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Fable Title'),
          React.createElement('input', {
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "e.g. The Freelancer's Down Payment Dilemma",
            style: { width: '100%', background: t.inputBg, border: `1px solid ${title ? t.primary : t.border}`, borderRadius: 10, padding: '12px 14px', fontSize: 13, color: t.text, outline: 'none', fontFamily: "'Archivo', sans-serif" }
          })
        ),
        React.createElement('div', null,
          React.createElement('label', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textMuted, display: 'block', marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Category Tags'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            tags.map(tag => {
              const active = selectedTags.includes(tag);
              return React.createElement('button', {
                key: tag,
                className: 'btn-press',
                onClick: () => toggleTag(tag),
                style: { padding: '6px 12px', borderRadius: 8, border: `1px solid ${active ? t.primary : t.border}`, background: active ? `${t.primary}18` : 'transparent', color: active ? t.primary : t.textMuted, fontSize: 12, fontFamily: "'Archivo Black', sans-serif", cursor: 'pointer', transition: 'all 0.15s' }
              }, tag);
            })
          )
        )
      ),

      step === 2 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        React.createElement('div', { style: { background: `${t.primary}12`, border: `1px solid ${t.primary}30`, borderRadius: 10, padding: '12px 14px' } },
          React.createElement('p', { style: { fontSize: 12, color: t.textMuted, margin: 0, lineHeight: 1.6 } }, '💡 Describe a fictional character\'s financial situation. Include income, expenses, debts, and context. The richer the detail, the better the solutions.')
        ),
        React.createElement('div', null,
          React.createElement('label', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textMuted, display: 'block', marginBottom: 6, letterSpacing: '1px', textTransform: 'uppercase' } }, 'The Challenge'),
          React.createElement('textarea', {
            value: challenge,
            onChange: (e) => setChallenge(e.target.value),
            placeholder: "Alex earns $5,400/mo as a freelance designer. They have $38k in student loans at 5.8% and want to buy a home in 4 years (target: $320k in Seattle). Monthly expenses total $3,100...",
            rows: 6,
            style: { width: '100%', background: t.inputBg, border: `1px solid ${challenge ? t.primary : t.border}`, borderRadius: 10, padding: '12px 14px', fontSize: 13, color: t.text, outline: 'none', resize: 'none', fontFamily: "'Archivo', sans-serif", lineHeight: 1.6 }
          })
        )
      ),

      step === 3 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        React.createElement('div', null,
          React.createElement('label', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textMuted, display: 'block', marginBottom: 6, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Achievement Goal'),
          React.createElement('textarea', {
            value: goal,
            onChange: (e) => setGoal(e.target.value),
            placeholder: "What does success look like? e.g. 'Within 4 years, Alex has a 20% down payment saved, student loans under $15k, and maintains a 6-month emergency fund.'",
            rows: 4,
            style: { width: '100%', background: t.inputBg, border: `1px solid ${goal ? t.primary : t.border}`, borderRadius: 10, padding: '12px 14px', fontSize: 13, color: t.text, outline: 'none', resize: 'none', fontFamily: "'Archivo', sans-serif", lineHeight: 1.6 }
          })
        ),
        React.createElement('div', null,
          React.createElement('label', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textMuted, display: 'block', marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Fable Difficulty'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            ['Beginner', 'Intermediate', 'Complex'].map((d, i) =>
              React.createElement('button', {
                key: d,
                className: 'btn-press',
                style: { flex: 1, padding: '10px 0', borderRadius: 8, border: `1px solid ${i === 1 ? t.primary : t.border}`, background: i === 1 ? `${t.primary}18` : 'transparent', color: i === 1 ? t.primary : t.textMuted, fontSize: 11, fontFamily: "'Archivo Black', sans-serif", cursor: 'pointer' }
              }, d)
            )
          )
        )
      ),

      step === 4 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', paddingTop: 20 } },
        React.createElement('div', { style: { width: 64, height: 64, borderRadius: 32, background: `${t.primary}20`, border: `2px solid ${t.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(CheckIcon, { size: 28, color: t.primary })
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('h3', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: t.text, margin: '0 0 8px' } }, 'Ready to Publish!'),
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, lineHeight: 1.6, margin: 0 } }, 'Your fable will be visible to all club members. Solvers will start contributing strategies.')
        ),
        React.createElement('div', { style: { width: '100%', background: t.cardBg, borderRadius: 12, padding: '16px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: t.text, marginBottom: 8 } }, title || 'Untitled Fable'),
          React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
            selectedTags.map(tag =>
              React.createElement('span', { key: tag, style: { fontSize: 10, background: `${t.primary}18`, color: t.primary, borderRadius: 4, padding: '2px 7px', fontFamily: "'Archivo Black', sans-serif" } }, tag)
            )
          )
        ),
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setStep(1),
          style: { width: '100%', background: t.primary, border: 'none', borderRadius: 12, padding: '14px', color: '#fff', fontFamily: "'Archivo Black', sans-serif", fontSize: 14, cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase' }
        }, 'Publish Fable')
      ),

      step < 4 && React.createElement('button', {
        className: 'btn-press',
        onClick: () => setStep(s => Math.min(4, s + 1)),
        style: { marginTop: 'auto', width: '100%', background: t.primary, border: 'none', borderRadius: 12, padding: '14px', color: '#fff', fontFamily: "'Archivo Black', sans-serif", fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: '1px', textTransform: 'uppercase' }
      },
        React.createElement('span', null, step === 3 ? 'Preview & Publish' : 'Continue'),
        React.createElement(ChevronRightIcon, { size: 16, color: '#fff' })
      )
    )
  );
}

function FabledexScreen({ t }) {
  const [activeTab, setActiveTab] = useState('reflections');
  const BookIcon = window.lucide?.Book || (() => null);
  const PlusIcon = window.lucide?.Plus || (() => null);
  const AwardIcon = window.lucide?.Award || (() => null);
  const StarIcon = window.lucide?.Star || (() => null);
  const TrendingUpIcon = window.lucide?.TrendingUp || (() => null);
  const EditIcon = window.lucide?.Edit3 || (() => null);

  const badges = [
    { name: 'First Solve', icon: '🎯', earned: true, color: '#FFD54F' },
    { name: 'Strategy Master', icon: '🧠', earned: true, color: '#FF6B9D' },
    { name: 'Debt Wizard', icon: '🔮', earned: true, color: '#B39DDB' },
    { name: 'Budget Sage', icon: '📊', earned: false, color: '#78909C' },
    { name: 'Investment Pro', icon: '📈', earned: false, color: '#78909C' },
    { name: 'Fable Author', icon: '✍️', earned: false, color: '#78909C' },
  ];

  const reflections = [
    {
      fable: "The Freelancer's Down Payment Dilemma",
      lesson: "The 50/30/20 rule doesn't work for variable income. Percentage-based saving tied to actual monthly receipts is more resilient.",
      applied: "Started saving 22% of each invoice payment directly to a HYSA instead of a fixed monthly amount.",
      date: 'Mar 28',
      color: '#FF6B9D',
    },
    {
      fable: "Theo's Inheritance Crossroads",
      lesson: "High-interest debt repayment is a guaranteed return. Even optimistic stock market assumptions don't beat a sure 7.5% risk-free gain.",
      applied: "Paid off my 8.9% personal loan before adding more to my brokerage.",
      date: 'Mar 14',
      color: '#64B5F6',
    },
    {
      fable: "Emergency Fund Sprint",
      lesson: "Micro-saving with automation beats willpower. Even $50/paycheck compounds psychologically — you start protecting it.",
      applied: "Set up a $75 auto-transfer every Friday to a separate emergency fund account.",
      date: 'Feb 22',
      color: '#A5D6A7',
    },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
    // Full-bleed profile header
    React.createElement('div', {
      style: { background: 'linear-gradient(160deg, #1a0015 0%, #2d0a22 50%, #1a1a00 100%)', padding: '28px 22px 24px' }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 16 } },
        React.createElement('div', {
          style: { width: 56, height: 56, borderRadius: 28, background: 'linear-gradient(135deg, #E91E63, #FF8A65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#fff', flexShrink: 0 }
        }, 'S'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: '#F5F0EE', marginBottom: 2 } }, 'steve_learns'),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(245,240,238,0.5)', letterSpacing: '1px' } }, 'Member since Jan 2026')
        )
      ),
      // Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 } },
        [['12', 'Fables Solved'], ['3', 'Fables Created'], ['847', 'Solver Points']].map(([n, l]) =>
          React.createElement('div', { key: l, style: { background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px', textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: t.primary } }, n),
            React.createElement('div', { style: { fontSize: 9, color: 'rgba(245,240,238,0.45)', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.3 } }, l)
          )
        )
      )
    ),

    // Tabs
    React.createElement('div', { style: { display: 'flex', borderBottom: `1px solid ${t.border}`, background: t.bg, flexShrink: 0 } },
      [['reflections', BookIcon, 'Reflections'], ['badges', AwardIcon, 'Badges']].map(([id, Icon, label]) =>
        React.createElement('button', {
          key: id,
          className: 'btn-press',
          onClick: () => setActiveTab(id),
          style: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === id ? t.primary : 'transparent'}`, cursor: 'pointer', color: activeTab === id ? t.primary : t.textSubtle, marginBottom: -1 }
        },
          React.createElement(Icon, { size: 14 }),
          React.createElement('span', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase' } }, label)
        )
      )
    ),

    React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 } },

      activeTab === 'reflections' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'Lessons you\'ve applied to real life'),
          React.createElement('button', { className: 'btn-press', style: { display: 'flex', alignItems: 'center', gap: 4, background: `${t.primary}18`, border: `1px solid ${t.primary}30`, borderRadius: 8, padding: '6px 10px', cursor: 'pointer' } },
            React.createElement(PlusIcon, { size: 12, color: t.primary }),
            React.createElement('span', { style: { fontSize: 11, color: t.primary, fontFamily: "'Archivo Black', sans-serif" } }, 'Add')
          )
        ),
        reflections.map((r, i) =>
          React.createElement('div', { key: i, style: { background: t.cardBg, borderRadius: 12, padding: '14px 16px', border: `1px solid ${t.border}`, borderLeft: `3px solid ${r.color}` } },
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: r.color, marginBottom: 6, letterSpacing: '0.5px' } }, r.fable),
            React.createElement('div', { style: { fontSize: 12, color: t.text, lineHeight: 1.5, marginBottom: 8 } }, `"${r.lesson}"`),
            React.createElement('div', { style: { background: `${r.color}12`, borderRadius: 8, padding: '8px 10px' } },
              React.createElement('div', { style: { fontSize: 10, color: r.color, fontFamily: "'Archivo Black', sans-serif", letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 3 } }, 'Applied'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, lineHeight: 1.5 } }, r.applied)
            ),
            React.createElement('div', { style: { fontSize: 10, color: t.textSubtle, marginTop: 8 } }, r.date)
          )
        )
      ),

      activeTab === 'badges' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginBottom: 4 } }, `${badges.filter(b => b.earned).length} of ${badges.length} badges earned`),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          badges.map((badge, i) =>
            React.createElement('div', { key: i, style: { background: t.cardBg, borderRadius: 12, padding: '14px 8px', textAlign: 'center', border: `1px solid ${badge.earned ? badge.color + '44' : t.border}`, opacity: badge.earned ? 1 : 0.45 } },
              React.createElement('div', { style: { fontSize: 24, marginBottom: 6, filter: badge.earned ? 'none' : 'grayscale(1)' } }, badge.icon),
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 10, color: badge.earned ? badge.color : t.textSubtle, lineHeight: 1.3, letterSpacing: '0.3px' } }, badge.name)
            )
          )
        )
      )
    )
  );
}
