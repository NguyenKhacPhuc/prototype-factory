function App() {
  const { useState } = React;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Righteous&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.35); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  `;

  const themes = {
    light: {
      bg: '#FAF8F5', surface: '#FFFFFF', primary: '#1A2744', secondary: '#E84B3A',
      accent: '#F5A623', text: '#1A2744', textSub: '#6B7A99', border: '#E2DDD5',
      cardBg: '#FFFFFF', navBg: '#FFFFFF', dim: 'rgba(26,39,68,0.07)',
    },
    dark: {
      bg: '#0D1321', surface: '#162035', primary: '#FAF8F5', secondary: '#E84B3A',
      accent: '#F5A623', text: '#FAF8F5', textSub: '#8899BB', border: '#243355',
      cardBg: '#1A2744', navBg: '#0D1321', dim: 'rgba(250,248,245,0.06)',
    },
  };

  const [isDark, setIsDark] = useState(false);
  const t = themes[isDark ? 'dark' : 'light'];

  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [onboardStep, setOnboardStep] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [liked, setLiked] = useState({});
  const [joined, setJoined] = useState({ 1: true, 2: true });
  const [pressed, setPressed] = useState(null);
  const [challengeFilter, setChallengeFilter] = useState('All');

  const press = (id) => { setPressed(id); setTimeout(() => setPressed(null), 150); };

  const challenges = [
    { id: 1, title: 'No Takeout November', creator: 'Sarah Chen', members: 8, progress: 65, daysLeft: 7, category: 'Spending', cc: '#E84B3A' },
    { id: 2, title: 'Save $50 Weekly · 8 Wks', creator: 'Marcus Johnson', members: 12, progress: 40, daysLeft: 36, category: 'Savings', cc: '#F5A623' },
    { id: 3, title: 'Index Fund Kickoff', creator: 'Priya Patel', members: 5, progress: 20, daysLeft: 56, category: 'Investing', cc: '#10B981' },
    { id: 4, title: '$30 Coffee Budget', creator: 'Alex Kim', members: 9, progress: 85, daysLeft: 8, category: 'Spending', cc: '#8B6CF0' },
  ];

  const checkins = [
    { id: 1, user: 'Sarah C.', ini: 'SC', challenge: 'No Takeout November', text: 'Cooked pasta from scratch instead of ordering. Saved ~$28 tonight. Getting creative with spices!', time: '2h ago', likes: 14, type: 'photo', color: '#E84B3A' },
    { id: 2, user: 'Marcus J.', ini: 'MJ', challenge: 'Save $50 Weekly', text: 'Transferred $52 to savings — beat my goal by $2! Week 3 down, 5 to go. Circle keeping me honest.', time: '5h ago', likes: 23, type: 'text', color: '#F5A623' },
    { id: 3, user: 'Jordan R.', ini: 'JR', challenge: 'No Takeout November', text: 'Meal prepped Sunday, ate home 5 days straight. My fridge has never looked this good lol', time: '1d ago', likes: 18, type: 'video', color: '#1A2744' },
    { id: 4, user: 'Emma T.', ini: 'ET', challenge: 'Index Fund Kickoff', text: 'Opened my first brokerage account today. Baby steps but it\'s real — $25 deployed into VTSAX.', time: '2d ago', likes: 31, type: 'photo', color: '#10B981' },
  ];

  const scrapbook = [
    { id: 1, title: 'Week 1 Complete', challenge: 'Save $50 Weekly', date: 'Oct 7', text: 'First week done. Skipped two coffee runs and packed lunch 4 days.', badge: 'FIRST STACK', xp: 50, color: '#F5A623' },
    { id: 2, title: '5 Days Home-Cooked', challenge: 'No Takeout November', date: 'Nov 8', text: 'Meal prep saved ~$120 this week. The group check-ins genuinely help more than I expected.', badge: 'STREAK X5', xp: 75, color: '#E84B3A' },
    { id: 3, title: 'First Investment', challenge: 'Index Fund Kickoff', date: 'Nov 12', text: '$25 into a total market index fund. Feels tiny but the habit is what matters.', badge: 'INVESTOR', xp: 100, color: '#10B981' },
  ];

  // ─── ONBOARDING ─────────────────────────────────────────────────
  const onboardSlides = [
    { title: 'Build Wealth\nTogether', body: 'Join a Circle of friends with shared financial goals and grow through creative weekly challenges', icon: 'Users', headerBg: '#1A2744', btnBg: '#F5A623', btnText: '#1A2744' },
    { title: 'Challenge &\nBe Challenged', body: 'Design missions, post proof of progress, and celebrate wins asynchronously with your group', icon: 'Target', headerBg: '#E84B3A', btnBg: '#1A2744', btnText: '#FAF8F5' },
    { title: 'Your Financial\nScrapbook', body: 'Every check-in becomes a permanent record of growth — earn badges and level up together', icon: 'BookOpen', headerBg: '#F5A623', btnBg: '#1A2744', btnText: '#FAF8F5' },
  ];

  const OnboardingScreen = () => {
    const s = onboardSlides[onboardStep];
    const IconComp = window.lucide[s.icon];
    const isLast = onboardStep === onboardSlides.length - 1;
    return React.createElement('div', { style: { height: '100%', background: s.headerBg, display: 'flex', flexDirection: 'column', padding: '0 28px 36px', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', top: 50, right: -40, width: 180, height: 180, background: 'rgba(255,255,255,0.06)', transform: 'rotate(45deg)', borderRadius: 12 } }),
      React.createElement('div', { style: { position: 'absolute', bottom: 100, left: -60, width: 200, height: 200, background: 'rgba(255,255,255,0.04)', transform: 'rotate(45deg)', borderRadius: 16 } }),
      React.createElement('div', { style: { position: 'absolute', top: 190, left: 16, width: 36, height: 36, background: '#F5A623', transform: 'rotate(45deg)', opacity: onboardStep === 2 ? 0.4 : 1 } }),
      React.createElement('div', { onClick: () => setHasOnboarded(true), style: { alignSelf: 'flex-end', marginTop: 12, padding: '8px 12px', color: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer' } }, 'Skip'),
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 28 } },
        React.createElement('div', { style: { width: 110, height: 110, background: onboardStep === 0 ? '#E84B3A' : onboardStep === 1 ? '#1A2744' : '#1A2744', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '6px 6px 0 rgba(0,0,0,0.25)', borderRadius: 0 } },
          React.createElement(IconComp, { size: 48, color: '#FAF8F5', strokeWidth: 1.5 })
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('h1', { style: { fontFamily: "'Righteous',cursive", fontSize: 34, color: '#FAF8F5', margin: '0 0 14px', lineHeight: 1.2, whiteSpace: 'pre-line' } }, s.title),
          React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, margin: 0 } }, s.body),
        ),
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 } },
        onboardSlides.map((_, i) => React.createElement('div', { key: i, style: { height: 8, width: i === onboardStep ? 28 : 8, background: i === onboardStep ? '#F5A623' : 'rgba(255,255,255,0.28)', borderRadius: 4, transition: 'width 0.3s ease' } }))
      ),
      React.createElement('button', {
        onClick: () => isLast ? setHasOnboarded(true) : setOnboardStep(s => s + 1),
        onMouseDown: () => press('ob'), onMouseUp: () => setPressed(null),
        style: { background: s.btnBg, color: s.btnText, border: 'none', padding: '17px 0', fontFamily: "'Righteous',cursive", fontSize: 18, cursor: 'pointer', boxShadow: '4px 4px 0 rgba(0,0,0,0.22)', transform: pressed === 'ob' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s', borderRadius: 0 }
      }, isLast ? 'Start My Journey →' : 'Next →')
    );
  };

  // ─── HOME SCREEN ────────────────────────────────────────────────
  const HomeScreen = () =>
    React.createElement('div', { style: { background: t.bg, minHeight: '100%', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { background: '#1A2744', padding: '18px 20px 22px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -22, right: -22, width: 110, height: 110, background: '#E84B3A', transform: 'rotate(45deg)', opacity: 0.28 } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -28, left: 50, width: 80, height: 80, background: '#F5A623', transform: 'rotate(45deg)', opacity: 0.2 } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, marginBottom: 18 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", color: 'rgba(255,255,255,0.55)', fontSize: 12, marginBottom: 3, letterSpacing: 0.5 } }, 'WELCOME BACK'),
            React.createElement('h2', { style: { fontFamily: "'Righteous',cursive", color: '#FAF8F5', fontSize: 24, lineHeight: 1 } }, 'Jordan Rivera'),
          ),
          React.createElement('div', { style: { width: 42, height: 42, background: '#E84B3A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 0 rgba(0,0,0,0.3)', borderRadius: 0 } },
            React.createElement(window.lucide.Bell, { size: 18, color: '#FAF8F5' })
          )
        ),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
            React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", color: '#F5A623', fontSize: 11, fontWeight: 700, letterSpacing: 1.2 } }, 'STACK XP'),
            React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", color: 'rgba(255,255,255,0.55)', fontSize: 11 } }, '225 / 300'),
          ),
          React.createElement('div', { style: { height: 7, background: 'rgba(255,255,255,0.14)', borderRadius: 0 } },
            React.createElement('div', { style: { height: '100%', width: '75%', background: '#F5A623', borderRadius: 0 } })
          ),
        ),
      ),
      React.createElement('div', { style: { display: 'flex' } },
        [{ l: 'Circles', v: '2', bg: '#F5A623', tc: '#1A2744' }, { l: 'Streak', v: '12d', bg: '#E84B3A', tc: '#FAF8F5' }, { l: 'Saved', v: '$284', bg: t.surface, tc: t.text }]
          .map((s, i) => React.createElement('div', { key: i, style: { flex: 1, background: s.bg, padding: '11px 6px', textAlign: 'center', borderRight: i < 2 ? '2px solid #1A2744' : 'none', borderBottom: '2px solid #1A2744' } },
            React.createElement('div', { style: { fontFamily: "'Righteous',cursive", fontSize: 20, color: s.tc } }, s.v),
            React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: i === 1 ? 'rgba(255,255,255,0.75)' : i === 0 ? 'rgba(26,39,68,0.65)' : t.textSub, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 1 } }, s.l),
          ))
      ),
      React.createElement('div', { style: { padding: '20px 20px 6px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h3', { style: { fontFamily: "'Righteous',cursive", fontSize: 17, color: t.text } }, 'Active Challenges'),
          React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#E84B3A', fontWeight: 700, cursor: 'pointer', letterSpacing: 0.3 } }, 'See All'),
        ),
        challenges.filter(c => joined[c.id]).map(c =>
          React.createElement('div', { key: c.id, style: { background: t.cardBg, border: `2px solid #1A2744`, padding: '14px', marginBottom: 12, position: 'relative', boxShadow: `4px 4px 0 ${c.cc}`, animation: 'fadeIn 0.3s ease' } },
            React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 30px 30px 0', borderColor: `transparent ${c.cc} transparent transparent` } }),
            React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: c.cc, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase' } }, c.category),
            React.createElement('h4', { style: { fontFamily: "'Righteous',cursive", fontSize: 15, color: t.text, margin: '4px 0 2px', paddingRight: 18 } }, c.title),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: t.textSub, marginBottom: 10 } }, `${c.daysLeft} days left · ${c.members} members`),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', { style: { flex: 1, height: 5, background: t.dim, borderRadius: 0 } },
                React.createElement('div', { style: { height: '100%', width: `${c.progress}%`, background: c.cc } })
              ),
              React.createElement('span', { style: { fontFamily: "'Righteous',cursive", fontSize: 13, color: c.cc, minWidth: 34 } }, `${c.progress}%`),
            )
          )
        ),
      ),
      React.createElement('div', { style: { padding: '8px 20px 24px' } },
        React.createElement('h3', { style: { fontFamily: "'Righteous',cursive", fontSize: 17, color: t.text, marginBottom: 12 } }, 'Circle Activity'),
        checkins.slice(0, 2).map(c =>
          React.createElement('div', { key: c.id, style: { display: 'flex', gap: 12, marginBottom: 12, padding: '12px', background: t.cardBg, border: `2px solid ${t.border}` } },
            React.createElement('div', { style: { width: 38, height: 38, background: c.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Righteous',cursive", fontSize: 12, color: '#FAF8F5', borderRadius: 0 } }, c.ini),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 3 } },
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: t.text } }, c.user),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: t.textSub } }, c.time),
              ),
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: t.textSub, marginBottom: 4, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, c.text),
              React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: c.color, fontWeight: 600 } }, c.challenge),
            )
          )
        ),
      )
    );

  // ─── CHALLENGES SCREEN (TIMELINE) ────────────────────────────────
  const ChallengesScreen = () => {
    const filters = ['All', 'Savings', 'Spending', 'Investing'];
    const filtered = challengeFilter === 'All' ? challenges : challenges.filter(c => c.category === challengeFilter);
    return React.createElement('div', { style: { background: t.bg, minHeight: '100%', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { background: '#1A2744', padding: '18px 20px 20px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -12, right: 18, width: 64, height: 64, background: '#E84B3A', transform: 'rotate(45deg)', opacity: 0.4 } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, right: 60, width: 50, height: 50, background: '#F5A623', transform: 'rotate(45deg)', opacity: 0.3 } }),
        React.createElement('h2', { style: { fontFamily: "'Righteous',cursive", fontSize: 24, color: '#FAF8F5', marginBottom: 2, position: 'relative', zIndex: 1 } }, 'Challenges'),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', position: 'relative', zIndex: 1 } }, 'Missions for your Circle'),
      ),
      React.createElement('div', { style: { padding: '14px 20px 0' } },
        React.createElement('button', {
          onMouseDown: () => press('new'), onMouseUp: () => setPressed(null),
          style: { width: '100%', background: '#E84B3A', border: '2px solid #1A2744', padding: '13px', fontFamily: "'Righteous',cursive", fontSize: 15, color: '#FAF8F5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '4px 4px 0 #1A2744', transform: pressed === 'new' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s', borderRadius: 0 }
        }, React.createElement(window.lucide.Plus, { size: 16 }), 'Create New Challenge'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6, padding: '12px 20px 4px', overflowX: 'auto' } },
        filters.map(f => React.createElement('button', {
          key: f, onClick: () => setChallengeFilter(f),
          style: { padding: '5px 12px', background: challengeFilter === f ? '#1A2744' : 'transparent', color: challengeFilter === f ? '#FAF8F5' : t.textSub, border: `2px solid ${challengeFilter === f ? '#1A2744' : t.border}`, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', borderRadius: 0 }
        }, f))
      ),
      React.createElement('div', { style: { padding: '8px 20px 24px', position: 'relative' } },
        React.createElement('div', { style: { position: 'absolute', left: 33, top: 8, bottom: 24, width: 3, background: 'linear-gradient(to bottom,#1A2744,#E84B3A,#F5A623,#10B981)', opacity: 0.6 } }),
        filtered.map((c, idx) => {
          const isJoined = joined[c.id];
          return React.createElement('div', { key: c.id, style: { display: 'flex', gap: 14, marginBottom: 18, position: 'relative', animation: `fadeIn 0.3s ease ${idx * 0.07}s both` } },
            React.createElement('div', { style: { width: 28, height: 28, background: isJoined ? c.cc : t.bg, border: `3px solid ${c.cc}`, transform: 'rotate(45deg)', flexShrink: 0, marginTop: 12, marginLeft: -1, zIndex: 1, transition: 'background 0.2s', boxShadow: isJoined ? `0 0 0 3px ${c.cc}30` : 'none' } }),
            React.createElement('div', { style: { flex: 1, background: t.cardBg, border: `2px solid #1A2744`, padding: '12px 13px', position: 'relative', boxShadow: `4px 4px 0 ${isJoined ? c.cc : '#1A2744'}`, transition: 'box-shadow 0.2s' } },
              React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 26px 26px 0', borderColor: `transparent ${c.cc} transparent transparent` } }),
              React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: c.cc, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase' } }, c.category),
              React.createElement('h4', { style: { fontFamily: "'Righteous',cursive", fontSize: 14, color: t.text, margin: '3px 0 2px', paddingRight: 16 } }, c.title),
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: t.textSub, marginBottom: 8 } }, `by ${c.creator} · ${c.members} members · ${c.daysLeft}d left`),
              React.createElement('div', { style: { marginBottom: 9 } },
                React.createElement('div', { style: { height: 4, background: t.dim, borderRadius: 0, marginBottom: 2 } },
                  React.createElement('div', { style: { height: '100%', width: `${c.progress}%`, background: c.cc } })
                ),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: t.textSub } }, `${c.progress}% group progress`),
              ),
              React.createElement('button', {
                onClick: () => setJoined(j => ({ ...j, [c.id]: !j[c.id] })),
                style: { background: isJoined ? 'transparent' : c.cc, color: isJoined ? c.cc : '#FAF8F5', border: `2px solid ${c.cc}`, padding: '5px 12px', fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.8, transition: 'all 0.15s', borderRadius: 0 }
              }, isJoined ? '✓ JOINED' : 'JOIN CHALLENGE')
            )
          );
        })
      )
    );
  };

  // ─── CHECK-IN SCREEN (TIMELINE) ─────────────────────────────────
  const CheckinScreen = () =>
    React.createElement('div', { style: { background: t.bg, minHeight: '100%', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { background: '#E84B3A', padding: '18px 20px 20px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -16, left: -16, width: 70, height: 70, background: '#1A2744', transform: 'rotate(45deg)', opacity: 0.3 } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, right: 28, width: 52, height: 52, background: '#F5A623', transform: 'rotate(45deg)', opacity: 0.45 } }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('h2', { style: { fontFamily: "'Righteous',cursive", fontSize: 24, color: '#FAF8F5', marginBottom: 2 } }, 'Check-Ins'),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.7)' } }, "Your circle's progress feed"),
          ),
          React.createElement('button', {
            onMouseDown: () => press('post'), onMouseUp: () => setPressed(null),
            style: { background: '#FAF8F5', color: '#E84B3A', border: 'none', padding: '9px 14px', fontFamily: "'Righteous',cursive", fontSize: 13, cursor: 'pointer', boxShadow: '3px 3px 0 rgba(0,0,0,0.22)', transform: pressed === 'post' ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.12s', borderRadius: 0 }
          }, '+ Post'),
        )
      ),
      React.createElement('div', { style: { padding: '16px 20px 24px', position: 'relative' } },
        React.createElement('div', { style: { position: 'absolute', left: 38, top: 16, bottom: 24, width: 2, backgroundImage: 'repeating-linear-gradient(to bottom,#1A2744 0,#1A2744 8px,transparent 8px,transparent 16px)', opacity: 0.5 } }),
        checkins.map((c, idx) =>
          React.createElement('div', { key: c.id, style: { display: 'flex', gap: 12, marginBottom: 18, position: 'relative', animation: `fadeIn 0.3s ease ${idx * 0.09}s both` } },
            React.createElement('div', { style: { width: 38, height: 38, background: c.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Righteous',cursive", fontSize: 12, color: '#FAF8F5', border: '2px solid #1A2744', zIndex: 1, borderRadius: 0 } }, c.ini),
            React.createElement('div', { style: { flex: 1, background: t.cardBg, border: `2px solid #1A2744`, padding: '11px 13px', boxShadow: `3px 3px 0 ${c.color}` } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
                React.createElement('div', null,
                  React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: t.text } }, c.user),
                  React.createElement('br'),
                  React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: c.color, fontWeight: 600, letterSpacing: 0.3 } }, c.challenge),
                ),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: c.color, background: isDark ? 'rgba(255,255,255,0.08)' : `${c.color}18`, padding: '2px 6px', textTransform: 'uppercase' } }, c.type),
              ),
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: t.textSub, marginBottom: 8, lineHeight: 1.6 } }, c.text),
              c.type !== 'text' && React.createElement('div', { style: { height: 64, background: isDark ? 'rgba(255,255,255,0.05)' : '#F0EDE8', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}` } },
                React.createElement(c.type === 'photo' ? window.lucide.Image : window.lucide.Play, { size: 22, color: t.textSub })
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('button', {
                  onClick: () => setLiked(l => ({ ...l, [c.id]: !l[c.id] })),
                  style: { display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: liked[c.id] ? '#E84B3A' : t.textSub, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, transition: 'color 0.15s', animation: liked[c.id] ? 'bounce 0.3s ease' : 'none' }
                }, React.createElement(window.lucide.Heart, { size: 14, fill: liked[c.id] ? '#E84B3A' : 'none', color: liked[c.id] ? '#E84B3A' : t.textSub }), c.likes + (liked[c.id] ? 1 : 0)),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: t.textSub } }, c.time),
              )
            )
          )
        )
      )
    );

  // ─── SCRAPBOOK SCREEN ───────────────────────────────────────────
  const ScrapbookScreen = () => {
    const badges = ['FIRST STACK', 'WEEK WARRIOR', 'INVESTOR', 'STREAK X5', 'CIRCLE MVP'];
    const earned = [0, 1, 2, 3];
    return React.createElement('div', { style: { background: t.bg, minHeight: '100%', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { background: '#1A2744', padding: '18px 20px 22px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', right: -12, top: -12, width: 84, height: 84, background: '#F5A623', transform: 'rotate(45deg)', opacity: 0.22 } }),
        React.createElement('div', { style: { position: 'absolute', right: 28, top: 8, width: 32, height: 32, background: '#E84B3A', transform: 'rotate(45deg)', opacity: 0.5 } }),
        React.createElement('h2', { style: { fontFamily: "'Righteous',cursive", fontSize: 24, color: '#FAF8F5', marginBottom: 2, position: 'relative', zIndex: 1 } }, 'Scrapbook'),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', position: 'relative', zIndex: 1 } }, 'Your financial journey, captured'),
      ),
      React.createElement('div', { style: { padding: '16px 20px 4px' } },
        React.createElement('h3', { style: { fontFamily: "'Righteous',cursive", fontSize: 15, color: t.text, marginBottom: 10 } }, 'Achievement Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4 } },
          badges.map((b, i) => React.createElement('div', {
            key: b,
            style: { flexShrink: 0, background: earned.includes(i) ? '#1A2744' : t.dim, border: `2px solid ${earned.includes(i) ? '#F5A623' : t.border}`, padding: '7px 11px', opacity: earned.includes(i) ? 1 : 0.4, transition: 'all 0.2s' }
          }, React.createElement('div', { style: { fontFamily: "'Righteous',cursive", fontSize: 9, color: earned.includes(i) ? '#F5A623' : t.textSub, letterSpacing: 1 } }, b)))
        ),
      ),
      React.createElement('div', { style: { margin: '14px 20px', background: '#F5A623', border: '2px solid #1A2744', padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '4px 4px 0 #1A2744' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: '#1A2744', fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 2 } }, 'Total Stack XP'),
          React.createElement('div', { style: { fontFamily: "'Righteous',cursive", fontSize: 26, color: '#1A2744' } }, '225 XP'),
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: '#1A2744', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 } }, 'Next Tier'),
          React.createElement('div', { style: { fontFamily: "'Righteous',cursive", fontSize: 15, color: '#1A2744' } }, '300 XP · Gold'),
        )
      ),
      React.createElement('div', { style: { padding: '4px 20px 24px' } },
        React.createElement('h3', { style: { fontFamily: "'Righteous',cursive", fontSize: 15, color: t.text, marginBottom: 12 } }, 'Journey Entries'),
        scrapbook.map((e, idx) =>
          React.createElement('div', { key: e.id, style: { background: t.cardBg, border: `2px solid #1A2744`, marginBottom: 14, animation: `fadeIn 0.3s ease ${idx * 0.1}s both` } },
            React.createElement('div', { style: { height: 5, background: e.color } }),
            React.createElement('div', { style: { padding: '11px 13px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
                React.createElement('div', null,
                  React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: e.color, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' } }, e.badge),
                  React.createElement('h4', { style: { fontFamily: "'Righteous',cursive", fontSize: 15, color: t.text, marginTop: 3 } }, e.title),
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontFamily: "'Righteous',cursive", fontSize: 14, color: e.color } }, `+${e.xp} XP`),
                  React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: t.textSub } }, e.date),
                )
              ),
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: t.textSub, marginBottom: 7, lineHeight: 1.6 } }, e.text),
              React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: e.color, fontWeight: 600 } }, e.challenge),
            )
          )
        ),
      )
    );
  };

  // ─── PROFILE SCREEN ─────────────────────────────────────────────
  const ProfileScreen = () =>
    React.createElement('div', { style: { background: t.bg, minHeight: '100%', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { background: '#1A2744', padding: '18px 20px 28px', position: 'relative', overflow: 'hidden', textAlign: 'center' } },
        React.createElement('div', { style: { position: 'absolute', top: -22, left: -22, width: 100, height: 100, background: '#E84B3A', transform: 'rotate(45deg)', opacity: 0.2 } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, right: -18, width: 120, height: 120, background: '#F5A623', transform: 'rotate(45deg)', opacity: 0.14 } }),
        React.createElement('div', { style: { position: 'relative', display: 'inline-block', marginBottom: 11 } },
          React.createElement('div', { style: { width: 68, height: 68, background: '#E84B3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Righteous',cursive", fontSize: 24, color: '#FAF8F5', border: '3px solid #F5A623', borderRadius: 0, position: 'relative', zIndex: 1 } }, 'JR'),
          React.createElement('div', { style: { position: 'absolute', bottom: -4, right: -4, width: 20, height: 20, background: '#F5A623', border: '2px solid #1A2744', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 } }, React.createElement(window.lucide.Zap, { size: 10, color: '#1A2744' })),
        ),
        React.createElement('h2', { style: { fontFamily: "'Righteous',cursive", fontSize: 21, color: '#FAF8F5', marginBottom: 3, position: 'relative', zIndex: 1 } }, 'Jordan Rivera'),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', position: 'relative', zIndex: 1 } }, '@jordan_stacks · Member since Oct 2024'),
      ),
      React.createElement('div', { style: { display: 'flex', borderBottom: '2px solid #1A2744' } },
        [{ l: 'Circles', v: '2' }, { l: 'Done', v: '3' }, { l: 'Streak', v: '12d' }].map((s, i) =>
          React.createElement('div', { key: i, style: { flex: 1, padding: '12px 6px', textAlign: 'center', background: t.surface, borderRight: i < 2 ? '2px solid #1A2744' : 'none' } },
            React.createElement('div', { style: { fontFamily: "'Righteous',cursive", fontSize: 20, color: '#E84B3A' } }, s.v),
            React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: t.textSub, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 } }, s.l),
          )
        )
      ),
      React.createElement('div', { style: { padding: '18px 20px 0' } },
        React.createElement('div', { style: { background: t.cardBg, border: `2px solid #1A2744`, marginBottom: 10, padding: '13px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '3px 3px 0 #1A2744' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 11 } },
            React.createElement('div', { style: { width: 34, height: 34, background: isDark ? 'rgba(245,166,35,0.15)' : '#FAF8F5', border: `2px solid #1A2744`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 } },
              React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 15, color: isDark ? '#F5A623' : '#1A2744' })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: t.text } }, 'Dark Mode'),
              React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: t.textSub } }, isDark ? 'Navy dark active' : 'Light theme active'),
            )
          ),
          React.createElement('div', {
            onClick: () => setIsDark(d => !d),
            style: { width: 50, height: 29, background: isDark ? '#E84B3A' : '#E2DDD5', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', border: '2px solid #1A2744', borderRadius: 0 }
          }, React.createElement('div', { style: { width: 21, height: 21, background: '#FAF8F5', position: 'absolute', top: 2, left: isDark ? 23 : 2, transition: 'left 0.2s', borderRadius: 0, border: '1px solid rgba(0,0,0,0.1)' } }))
        ),
        [
          { icon: 'Users', label: 'My Circles', sub: '2 active circles', color: '#1A2744' },
          { icon: 'Bell', label: 'Notifications', sub: 'Check-in reminders on', color: '#E84B3A' },
          { icon: 'Shield', label: 'Privacy', sub: 'Visible to circle only', color: '#10B981' },
          { icon: 'HelpCircle', label: 'Help & Support', sub: 'FAQs and contact', color: '#F5A623' },
        ].map((item, i) => {
          const IC = window.lucide[item.icon];
          return React.createElement('div', {
            key: i,
            style: { background: t.cardBg, border: `2px solid ${t.border}`, marginBottom: 8, padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 11 } },
              React.createElement('div', { style: { width: 34, height: 34, background: `${item.color}15`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 } },
                React.createElement(IC, { size: 15, color: item.color })
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: t.text } }, item.label),
                React.createElement('div', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: t.textSub } }, item.sub),
              )
            ),
            React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textSub })
          );
        }),
        React.createElement('button', { style: { width: '100%', background: 'transparent', border: `2px solid #E84B3A`, color: '#E84B3A', padding: '13px', fontFamily: "'Righteous',cursive", fontSize: 15, cursor: 'pointer', marginTop: 8, marginBottom: 24, borderRadius: 0 } }, 'Sign Out'),
      )
    );

  // ─── NAV + RENDER ───────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'challenges', label: 'Challenges', icon: window.lucide.Target },
    { id: 'checkin', label: 'Check In', icon: window.lucide.Camera },
    { id: 'scrapbook', label: 'Scrapbook', icon: window.lucide.BookOpen },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = { home: HomeScreen, challenges: ChallengesScreen, checkin: CheckinScreen, scrapbook: ScrapbookScreen, profile: ProfileScreen };

  const headerBgs = { home: '#1A2744', challenges: '#1A2744', checkin: '#E84B3A', scrapbook: '#1A2744', profile: '#1A2744' };

  return React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f0f0', padding: 20 } },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: { width: 375, height: 812, borderRadius: 44, border: '8px solid #1a1a1a', overflow: 'hidden', position: 'relative', boxShadow: '0 28px 64px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(255,255,255,0.08)', background: t.bg, display: 'flex', flexDirection: 'column' }
    },
      React.createElement('div', { style: { position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 118, height: 31, borderRadius: 20, background: '#000', zIndex: 100 } }),
      React.createElement('div', {
        style: { height: 54, padding: '14px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: hasOnboarded ? headerBgs[activeTab] : (onboardStep === 1 ? '#E84B3A' : onboardStep === 2 ? '#F5A623' : '#1A2744'), flexShrink: 0, transition: 'background 0.25s' }
      },
        React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: (hasOnboarded && onboardStep === 2) ? '#1A2744' : '#FAF8F5', fontFamily: "'Righteous',cursive" } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 13, color: (hasOnboarded && onboardStep === 2) ? '#1A2744' : '#FAF8F5' }),
          React.createElement(window.lucide.Signal, { size: 13, color: (hasOnboarded && onboardStep === 2) ? '#1A2744' : '#FAF8F5' }),
          React.createElement(window.lucide.Battery, { size: 13, color: (hasOnboarded && onboardStep === 2) ? '#1A2744' : '#FAF8F5' }),
        )
      ),
      !hasOnboarded
        ? React.createElement('div', { style: { flex: 1, overflow: 'hidden' } }, React.createElement(OnboardingScreen))
        : React.createElement(React.Fragment, null,
            React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
              React.createElement(screens[activeTab])
            ),
            React.createElement('div', {
              style: { height: 78, background: t.navBg, borderTop: `2px solid #1A2744`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 6, flexShrink: 0 }
            },
              tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return React.createElement('div', {
                  key: tab.id,
                  onClick: () => setActiveTab(tab.id),
                  style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px', cursor: 'pointer', position: 'relative', transition: 'all 0.15s', minWidth: 48 }
                },
                  isActive && React.createElement('div', { style: { position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', width: 20, height: 3, background: '#E84B3A' } }),
                  React.createElement(tab.icon, { size: 21, color: isActive ? '#E84B3A' : t.textSub, strokeWidth: isActive ? 2.5 : 1.8 }),
                  React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: 8, fontWeight: isActive ? 700 : 500, color: isActive ? '#E84B3A' : t.textSub, letterSpacing: 0.3, textTransform: 'uppercase' } }, tab.label)
                );
              })
            )
          )
    )
  );
}
