const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeSprintTab, setActiveSprintTab] = useState('active');
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [submittedVote, setSubmittedVote] = useState(false);
  const [squadTab, setSquadTab] = useState('my');
  const [profileTab, setProfileTab] = useState('stats');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

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
      cta: '#22C55E',
      ctaHover: '#16A34A',
      danger: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
      purple: '#A855F7',
      tabBg: '#0F172A',
      tabBorder: '#1E293B',
      inputBg: '#0F172A',
      codeBg: '#020617',
      overlay: 'rgba(0,0,0,0.7)',
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
      cta: '#22C55E',
      ctaHover: '#16A34A',
      danger: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
      purple: '#A855F7',
      tabBg: '#FFFFFF',
      tabBorder: '#E2E8F0',
      inputBg: '#F1F5F9',
      codeBg: '#1E293B',
      overlay: 'rgba(0,0,0,0.5)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    let interval;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const sprints = [
    { id: 1, title: 'Null Reference in User Auth', lang: 'TypeScript', difficulty: 'Medium', points: 150, participants: 47, timeLeft: '2:34', category: 'Security', code: `function authenticate(user) {\n  const token = db.getToken(user.id);\n  if (token.isValid()) {\n    return { auth: true, role: token.role };\n  }\n  return { auth: false };\n}` },
    { id: 2, title: 'Memory Leak in Event Listener', lang: 'JavaScript', difficulty: 'Hard', points: 250, participants: 31, timeLeft: '4:12', category: 'Performance', code: `class DataStream {\n  constructor() {\n    this.handler = (e) => this.process(e);\n    window.addEventListener('data', this.handler);\n  }\n  process(event) {\n    this.data = transform(event.detail);\n    this.render();\n  }\n}` },
    { id: 3, title: 'Race Condition in Cache', lang: 'Python', difficulty: 'Hard', points: 300, participants: 22, timeLeft: '1:48', category: 'Concurrency', code: `class Cache:\n  def get_or_set(self, key, compute_fn):\n    if key not in self._store:\n      value = compute_fn()\n      self._store[key] = value\n    return self._store[key]` },
    { id: 4, title: 'SQL Injection Vector', lang: 'Python', difficulty: 'Easy', points: 100, participants: 89, timeLeft: '5:00', category: 'Security', code: `def search_users(name):\n  query = f"SELECT * FROM users\n    WHERE name LIKE '%{name}%'"\n  return db.execute(query)` },
  ];

  const squads = [
    { id: 1, name: 'Bug Busters', members: 5, wins: 23, streak: 7, rank: 3, avatar: '#22C55E' },
    { id: 2, name: 'Code Surgeons', members: 4, wins: 18, streak: 3, rank: 7, avatar: '#3B82F6' },
  ];

  const openSquads = [
    { id: 3, name: 'Rust Raiders', members: 3, maxMembers: 5, wins: 12, focus: 'Systems', avatar: '#F59E0B' },
    { id: 4, name: 'React Wreckers', members: 4, maxMembers: 5, wins: 31, focus: 'Frontend', avatar: '#A855F7' },
    { id: 5, name: 'Pythonistas', members: 2, maxMembers: 5, wins: 8, focus: 'Backend', avatar: '#EF4444' },
  ];

  const solutions = [
    { id: 1, author: 'dev_ninja42', votes: 12, code: 'const token = db.getToken(user?.id);\nif (token?.isValid()) { ... }', approach: 'Optional chaining with nullish checks' },
    { id: 2, author: 'rustacean_x', votes: 8, code: 'if (!user?.id) throw new AuthError();\nconst token = db.getToken(user.id);', approach: 'Early return with guard clause' },
    { id: 3, author: 'clean_coder', votes: 15, code: 'const token = user?.id\n  ? db.getToken(user.id)\n  : null;\nif (!token?.isValid()) return ...;', approach: 'Ternary with comprehensive null handling' },
  ];

  const skillTrees = [
    { name: 'Security', level: 7, xp: 2340, maxXp: 3000, color: '#EF4444', icon: 'Shield' },
    { name: 'Performance', level: 5, xp: 1200, maxXp: 2000, color: '#F59E0B', icon: 'Zap' },
    { name: 'Concurrency', level: 3, xp: 800, maxXp: 1500, color: '#A855F7', icon: 'GitBranch' },
    { name: 'Frontend', level: 6, xp: 1850, maxXp: 2500, color: '#3B82F6', icon: 'Layout' },
    { name: 'Backend', level: 4, xp: 950, maxXp: 1500, color: '#22C55E', icon: 'Server' },
  ];

  const badges = [
    { name: 'First Blood', desc: 'Solve your first sprint', earned: true },
    { name: 'Speed Demon', desc: 'Solve in under 60s', earned: true },
    { name: 'Squad Leader', desc: 'Lead a squad to 10 wins', earned: true },
    { name: 'Bug Hunter', desc: 'Find 50 security bugs', earned: false },
    { name: 'Glitch Master', desc: 'Submit 10 featured glitches', earned: false },
    { name: 'Streak King', desc: '30-day sprint streak', earned: false },
  ];

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 1.8 });
  };

  const difficultyColor = (d) => d === 'Easy' ? '#22C55E' : d === 'Medium' ? '#F59E0B' : '#EF4444';

  // ─── HOME SCREEN ───
  const HomeScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.3s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Sprints'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0', fontWeight: 400 } }, '4 active glitches today')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.cta}, #3B82F6)`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'User', size: 18, color: '#fff' })
          )
        )
      ),

      // Streak banner
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.cta}15, ${t.info}15)`,
        borderRadius: 16, padding: '14px 16px', marginBottom: 20,
        border: `1px solid ${t.cta}30`, display: 'flex', alignItems: 'center', gap: 12
      } },
        React.createElement(Icon, { name: 'Flame', size: 22, color: '#F59E0B' }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, '12-day streak!'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '2px 0 0' } }, 'Keep solving to maintain your streak')
        ),
        React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.cta } }, '12')
      ),

      // Tab selector
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 18 } },
        ['active', 'upcoming', 'completed'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setActiveSprintTab(tab),
            style: {
              fontFamily: font, fontSize: 13, fontWeight: 600, padding: '8px 16px',
              borderRadius: 20, border: 'none', cursor: 'pointer',
              background: activeSprintTab === tab ? t.cta : t.surfaceAlt,
              color: activeSprintTab === tab ? '#fff' : t.textSecondary,
              transition: 'all 0.2s ease', textTransform: 'capitalize'
            }
          }, tab)
        )
      ),

      // Sprint cards
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        sprints.map(sprint =>
          React.createElement('button', {
            key: sprint.id,
            onClick: () => { setSelectedSprint(sprint); setActiveScreen('sprint'); setTimerSeconds(180); setTimerRunning(true); setSubmittedVote(false); setSelectedSolution(null); },
            style: {
              background: t.card, borderRadius: 16, padding: 16,
              border: `1px solid ${t.cardBorder}`, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s ease', boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
              width: '100%'
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: `${difficultyColor(sprint.difficulty)}20`, color: difficultyColor(sprint.difficulty), textTransform: 'uppercase', letterSpacing: 0.5 } }, sprint.difficulty),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: `${t.info}20`, color: t.info } }, sprint.category)
                ),
                React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, sprint.title)
              ),
              React.createElement('div', { style: { background: `${t.cta}15`, borderRadius: 10, padding: '6px 10px', textAlign: 'center' } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.cta, margin: 0 } }, `+${sprint.points}`),
                React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: 0 } }, 'pts')
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Code2', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, sprint.lang)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, sprint.participants)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' } },
                React.createElement(Icon, { name: 'Clock', size: 14, color: t.warning }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.warning } }, sprint.timeLeft)
              )
            )
          )
        )
      )
    );
  };

  // ─── SPRINT SCREEN ───
  const SprintScreen = () => {
    const sprint = selectedSprint || sprints[0];
    const progress = timerSeconds / 180;
    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.3s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 } },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: 'ArrowLeft', size: 18, color: t.text })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, sprint.title),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: 0 } }, `${sprint.lang} \u00B7 ${sprint.category}`)
        )
      ),

      // Timer
      React.createElement('div', { style: {
        background: t.card, borderRadius: 16, padding: 16, marginBottom: 16,
        border: `1px solid ${t.cardBorder}`, textAlign: 'center'
      } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 10 } },
          React.createElement(Icon, { name: 'Timer', size: 20, color: timerSeconds < 30 ? t.danger : t.cta }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: timerSeconds < 30 ? t.danger : t.text, letterSpacing: -0.5 } }, formatTime(timerSeconds))
        ),
        React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
          React.createElement('div', { style: {
            height: '100%', borderRadius: 3, width: `${progress * 100}%`,
            background: timerSeconds < 30 ? t.danger : `linear-gradient(90deg, ${t.cta}, ${t.info})`,
            transition: 'width 1s linear'
          } })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }), `${sprint.participants} solving`
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Trophy', size: 14, color: t.warning }), `+${sprint.points} pts`
          )
        )
      ),

      // Code block
      React.createElement('div', { style: {
        background: t.codeBg, borderRadius: 14, padding: 14, marginBottom: 16,
        border: `1px solid ${isDark ? '#334155' : '#1E293B'}`, position: 'relative', overflow: 'hidden'
      } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Buggy Code'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: `${difficultyColor(sprint.difficulty)}20`, color: difficultyColor(sprint.difficulty) } }, sprint.difficulty)
        ),
        React.createElement('pre', { style: { fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12, color: '#E2E8F0', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 } }, sprint.code)
      ),

      // Solutions
      React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 12px' } }, 'Squad Solutions'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        solutions.map(sol =>
          React.createElement('button', {
            key: sol.id,
            onClick: () => setSelectedSolution(sol.id),
            style: {
              background: selectedSolution === sol.id ? `${t.cta}15` : t.card,
              borderRadius: 14, padding: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
              border: selectedSolution === sol.id ? `2px solid ${t.cta}` : `1px solid ${t.cardBorder}`,
              transition: 'all 0.2s ease'
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { width: 28, height: 28, borderRadius: 14, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: 'User', size: 14, color: t.textSecondary })
                ),
                React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text } }, sol.author)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'ThumbsUp', size: 14, color: selectedSolution === sol.id ? t.cta : t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: selectedSolution === sol.id ? t.cta : t.textMuted } }, sol.votes)
              )
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '0 0 8px', fontWeight: 500 } }, sol.approach),
            React.createElement('pre', { style: { fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 11, color: '#94A3B8', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5, background: t.codeBg, padding: 8, borderRadius: 8 } }, sol.code)
          )
        )
      ),

      // Vote button
      selectedSolution && !submittedVote && React.createElement('button', {
        onClick: () => setSubmittedVote(true),
        style: {
          width: '100%', padding: '16px', borderRadius: 14, border: 'none',
          background: `linear-gradient(135deg, ${t.cta}, #16A34A)`, color: '#fff',
          fontFamily: font, fontSize: 17, fontWeight: 700, cursor: 'pointer',
          marginTop: 16, transition: 'all 0.2s ease',
          boxShadow: `0 4px 15px ${t.cta}40`
        }
      }, 'Vote for this Solution'),

      submittedVote && React.createElement('div', { style: {
        marginTop: 16, padding: 16, borderRadius: 14, textAlign: 'center',
        background: `${t.cta}15`, border: `1px solid ${t.cta}30`, animation: 'slideUp 0.3s ease'
      } },
        React.createElement(Icon, { name: 'CheckCircle', size: 28, color: t.cta }),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.cta, margin: '8px 0 0' } }, 'Vote submitted! Results after timer ends.')
      )
    );
  };

  // ─── SQUADS SCREEN ───
  const SquadsScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.3s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Squads'),
        React.createElement('button', {
          style: { width: 40, height: 40, borderRadius: 12, background: t.cta, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: 'Plus', size: 18, color: '#fff' }))
      ),

      // Tab switch
      React.createElement('div', { style: { display: 'flex', background: t.surfaceAlt, borderRadius: 12, padding: 3, marginBottom: 20 } },
        ['my', 'discover'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setSquadTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: font, fontSize: 15, fontWeight: 600,
              background: squadTab === tab ? t.card : 'transparent',
              color: squadTab === tab ? t.text : t.textMuted,
              boxShadow: squadTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease', textTransform: 'capitalize'
            }
          }, tab === 'my' ? 'My Squads' : 'Discover')
        )
      ),

      squadTab === 'my' ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        squads.map(squad =>
          React.createElement('div', {
            key: squad.id,
            style: {
              background: t.card, borderRadius: 16, padding: 16,
              border: `1px solid ${t.cardBorder}`, transition: 'all 0.2s ease',
              boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.08)'
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 } },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${squad.avatar}, ${squad.avatar}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Shield', size: 22, color: '#fff' })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, squad.name),
                React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '2px 0 0' } }, `${squad.members} members \u00B7 Rank #${squad.rank}`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: `${t.warning}15`, padding: '4px 10px', borderRadius: 8 } },
                React.createElement(Icon, { name: 'Flame', size: 14, color: t.warning }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.warning } }, squad.streak)
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '10px 12px', textAlign: 'center' } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: 0 } }, squad.wins),
                React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: 0 } }, 'Wins')
              ),
              React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '10px 12px', textAlign: 'center' } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.cta, margin: 0 } }, squad.streak),
                React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: 0 } }, 'Streak')
              ),
              React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '10px 12px', textAlign: 'center' } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.purple, margin: 0 } }, `#${squad.rank}`),
                React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: 0 } }, 'Rank')
              )
            )
          )
        ),
        // Squad activity
        React.createElement('div', { style: { marginTop: 8 } },
          React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 12px' } }, 'Recent Activity'),
          ...[
            { user: 'Alex', action: 'solved Null Reference sprint', time: '5m ago', icon: 'CheckCircle', color: t.cta },
            { user: 'Maya', action: 'voted on Memory Leak fix', time: '12m ago', icon: 'ThumbsUp', color: t.info },
            { user: 'Sam', action: 'joined Bug Busters', time: '1h ago', icon: 'UserPlus', color: t.purple },
          ].map((activity, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${t.cardBorder}` : 'none' } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${activity.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: activity.icon, size: 16, color: activity.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.text, margin: 0 } },
                  React.createElement('span', { style: { fontWeight: 600 } }, activity.user), ` ${activity.action}`
                ),
                React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: 0 } }, activity.time)
              )
            )
          )
        )
      ) :
      // Discover tab
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        openSquads.map(squad =>
          React.createElement('div', {
            key: squad.id,
            style: {
              background: t.card, borderRadius: 16, padding: 16,
              border: `1px solid ${t.cardBorder}`, transition: 'all 0.2s ease'
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${squad.avatar}, ${squad.avatar}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Users', size: 22, color: '#fff' })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, squad.name),
                React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '2px 0 0' } }, `${squad.members}/${squad.maxMembers} members \u00B7 ${squad.focus}`),
                React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '2px 0 0' } }, `${squad.wins} wins`)
              ),
              React.createElement('button', {
                style: {
                  padding: '8px 16px', borderRadius: 10, border: 'none',
                  background: t.cta, color: '#fff', fontFamily: font,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer'
                }
              }, 'Join')
            )
          )
        )
      )
    );
  };

  // ─── SUBMIT SCREEN ───
  const SubmitScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.3s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 6px' } }, 'My Glitches'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 24px' } }, 'Submit bugs for the community to solve'),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        [
          { label: 'Submitted', value: '8', icon: 'Upload', color: t.info },
          { label: 'Featured', value: '3', icon: 'Star', color: t.warning },
          { label: 'Karma', value: '420', icon: 'Heart', color: t.danger },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.card, borderRadius: 14, padding: '14px 10px', textAlign: 'center', border: `1px solid ${t.cardBorder}` } },
            React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color, style: { margin: '0 auto 6px' } }),
            React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: 0 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: 0 } }, stat.label)
          )
        )
      ),

      // Submit button
      React.createElement('button', {
        onClick: () => setShowSubmitModal(true),
        style: {
          width: '100%', padding: '16px', borderRadius: 14, border: `2px dashed ${t.cta}50`,
          background: `${t.cta}08`, color: t.cta, fontFamily: font, fontSize: 15, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 20, transition: 'all 0.2s ease'
        }
      },
        React.createElement(Icon, { name: 'PlusCircle', size: 20, color: t.cta }),
        'Submit New Glitch'
      ),

      // Previous submissions
      React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 12px' } }, 'Your Submissions'),
      ...[
        { title: 'Async Race in Promise.all', status: 'Featured', lang: 'JavaScript', solves: 156, karma: 85, featured: true },
        { title: 'Off-by-one in Binary Search', status: 'Active', lang: 'Python', solves: 42, karma: 30, featured: false },
        { title: 'Stale Closure in useEffect', status: 'In Review', lang: 'React', solves: 0, karma: 0, featured: false },
      ].map((sub, i) =>
        React.createElement('div', { key: i, style: {
          background: t.card, borderRadius: 14, padding: 14, marginBottom: 10,
          border: sub.featured ? `1px solid ${t.warning}40` : `1px solid ${t.cardBorder}`,
          transition: 'all 0.2s ease'
        } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement('h4', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, sub.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '2px 0 0' } }, sub.lang)
            ),
            React.createElement('span', { style: {
              fontFamily: font, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 8,
              background: sub.status === 'Featured' ? `${t.warning}20` : sub.status === 'Active' ? `${t.cta}20` : `${t.info}20`,
              color: sub.status === 'Featured' ? t.warning : sub.status === 'Active' ? t.cta : t.info
            } }, sub.status)
          ),
          sub.solves > 0 && React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 12, color: t.textMuted }), `${sub.solves} solves`
            ),
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Heart', size: 12, color: t.danger }), `+${sub.karma} karma`
            )
          )
        )
      ),

      // Submit modal
      showSubmitModal && React.createElement('div', { style: {
        position: 'absolute', inset: 0, background: t.overlay, display: 'flex', alignItems: 'flex-end',
        zIndex: 100, animation: 'fadeIn 0.2s ease'
      }, onClick: () => setShowSubmitModal(false) },
        React.createElement('div', { style: {
          width: '100%', background: t.bg, borderRadius: '24px 24px 0 0', padding: '24px 16px 40px',
          animation: 'slideUp 0.3s ease'
        }, onClick: e => e.stopPropagation() },
          React.createElement('div', { style: { width: 36, height: 4, borderRadius: 2, background: t.surfaceAlt, margin: '0 auto 20px' } }),
          React.createElement('h3', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 20px' } }, 'Submit a Glitch'),
          ...[
            { label: 'Title', placeholder: 'e.g. Race condition in cache invalidation' },
            { label: 'Language', placeholder: 'e.g. Python, TypeScript, Rust' },
            { label: 'Category', placeholder: 'e.g. Security, Performance, Concurrency' },
          ].map((field, i) =>
            React.createElement('div', { key: i, style: { marginBottom: 14 } },
              React.createElement('label', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary, display: 'block', marginBottom: 6 } }, field.label),
              React.createElement('input', { placeholder: field.placeholder, style: {
                width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.cardBorder}`,
                background: t.inputBg, color: t.text, fontFamily: font, fontSize: 15, outline: 'none',
                boxSizing: 'border-box'
              } })
            )
          ),
          React.createElement('div', { style: { marginBottom: 14 } },
            React.createElement('label', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary, display: 'block', marginBottom: 6 } }, 'Code Snippet'),
            React.createElement('textarea', { placeholder: 'Paste your buggy code here...', rows: 5, style: {
              width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.cardBorder}`,
              background: t.inputBg, color: t.text, fontFamily: "'SF Mono', monospace", fontSize: 13, outline: 'none',
              resize: 'none', boxSizing: 'border-box'
            } })
          ),
          React.createElement('button', { style: {
            width: '100%', padding: '16px', borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${t.cta}, #16A34A)`, color: '#fff',
            fontFamily: font, fontSize: 17, fontWeight: 700, cursor: 'pointer',
            boxShadow: `0 4px 15px ${t.cta}40`
          } }, 'Submit Glitch')
        )
      )
    );
  };

  // ─── PROFILE SCREEN ───
  const ProfileScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.3s ease' } },
      // Profile header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 24 } },
        React.createElement('div', { style: {
          width: 80, height: 80, borderRadius: 24, margin: '0 auto 12px',
          background: `linear-gradient(135deg, ${t.cta}, ${t.info}, ${t.purple})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 25px ${t.cta}30`
        } },
          React.createElement(Icon, { name: 'Code2', size: 36, color: '#fff' })
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'dev_ninja42'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0' } }, 'Full-Stack Developer'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: `${t.cta}20`, color: t.cta } }, 'Rank #42'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: `${t.purple}20`, color: t.purple } }, 'Level 7')
        )
      ),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        [
          { label: 'Sprints', value: '234', color: t.cta },
          { label: 'Win Rate', value: '68%', color: t.info },
          { label: 'Points', value: '12.4k', color: t.warning },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.card, borderRadius: 14, padding: '14px 10px', textAlign: 'center', border: `1px solid ${t.cardBorder}` } },
            React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: stat.color, margin: 0 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: '2px 0 0' } }, stat.label)
          )
        )
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
        ['stats', 'badges'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setProfileTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: font, fontSize: 15, fontWeight: 600, textTransform: 'capitalize',
              background: profileTab === tab ? t.surfaceAlt : 'transparent',
              color: profileTab === tab ? t.text : t.textMuted,
              transition: 'all 0.2s ease'
            }
          }, tab === 'stats' ? 'Skill Trees' : 'Badges')
        )
      ),

      profileTab === 'stats' ?
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          skillTrees.map((skill, i) =>
            React.createElement('div', { key: i, style: { background: t.card, borderRadius: 14, padding: 14, border: `1px solid ${t.cardBorder}` } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: skill.icon, size: 18, color: skill.color })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                    React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, skill.name),
                    React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: skill.color } }, `Lv ${skill.level}`)
                  ),
                  React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '2px 0 0' } }, `${skill.xp} / ${skill.maxXp} XP`)
                )
              ),
              React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', borderRadius: 3, width: `${(skill.xp / skill.maxXp) * 100}%`, background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`, transition: 'width 0.5s ease' } })
              )
            )
          )
        ) :
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          badges.map((badge, i) =>
            React.createElement('div', { key: i, style: {
              background: t.card, borderRadius: 14, padding: 14, textAlign: 'center',
              border: `1px solid ${t.cardBorder}`, opacity: badge.earned ? 1 : 0.45,
              transition: 'all 0.2s ease'
            } },
              React.createElement('div', { style: {
                width: 44, height: 44, borderRadius: 22, margin: '0 auto 8px',
                background: badge.earned ? `linear-gradient(135deg, ${t.warning}, #F97316)` : t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: badge.earned ? `0 4px 12px ${t.warning}30` : 'none'
              } },
                React.createElement(Icon, { name: badge.earned ? 'Award' : 'Lock', size: 20, color: badge.earned ? '#fff' : t.textMuted })
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, margin: '0 0 2px' } }, badge.name),
              React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: 0 } }, badge.desc)
            )
          )
        )
    );
  };

  const screens = { home: HomeScreen, sprint: SprintScreen, squads: SquadsScreen, submit: SubmitScreen, profile: ProfileScreen };

  const tabs = [
    { id: 'home', label: 'Sprints', icon: 'Zap' },
    { id: 'squads', label: 'Squads', icon: 'Shield' },
    { id: 'submit', label: 'Submit', icon: 'Upload' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: font }
  },
    React.createElement('style', null, `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 0; background: transparent; }
      input::placeholder, textarea::placeholder { color: #64748B; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column'
      }
    },
      // Scrollable content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 8 } },
        React.createElement(screens[activeScreen])
      ),

      // Bottom tab bar
      activeScreen !== 'sprint' && React.createElement('div', {
        style: {
          background: t.tabBg, borderTop: `1px solid ${t.tabBorder}`,
          display: 'flex', padding: '8px 0 28px', position: 'relative',
          backdropFilter: 'blur(20px)'
        }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
              minHeight: 44, minWidth: 44, justifyContent: 'center'
            }
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.cta : t.textMuted
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 10, fontWeight: 600,
                color: activeScreen === tab.id ? t.cta : t.textMuted
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
