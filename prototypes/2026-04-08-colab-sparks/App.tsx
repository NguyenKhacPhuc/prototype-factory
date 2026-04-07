const { useState, useEffect, useRef } = React;

const THEMES = {
  light: {
    bg: '#F0FDFA', surface: '#FFFFFF', surfaceAlt: '#E6FAF7', surfaceDim: '#D5F5F0',
    text: '#0A2E2A', textSub: '#3D6B66', textMuted: '#7BA8A3',
    primary: '#0D9488', primarySoft: 'rgba(13,148,136,0.10)',
    secondary: '#14B8A6', secondarySoft: 'rgba(20,184,166,0.10)',
    cta: '#F97316', ctaSoft: 'rgba(249,115,22,0.12)',
    border: '#C8EDE8', success: '#10B981', successSoft: 'rgba(16,185,129,0.10)',
    warning: '#EAB308', warningSoft: 'rgba(234,179,8,0.10)',
    purple: '#8B5CF6', purpleSoft: 'rgba(139,92,246,0.10)',
    navBg: '#FFFFFF', navBorder: '#D5F5F0',
    progressBg: '#D5F5F0', progressFill: '#0D9488',
    cardBg: '#FFFFFF', cardBorder: '#C8EDE8',
  },
  dark: {
    bg: '#0A1A18', surface: '#112220', surfaceAlt: '#1A302D', surfaceDim: '#0F1E1C',
    text: '#E0F5F2', textSub: '#8EC5BE', textMuted: '#5A8F88',
    primary: '#14B8A6', primarySoft: 'rgba(20,184,166,0.15)',
    secondary: '#2DD4BF', secondarySoft: 'rgba(45,212,191,0.12)',
    cta: '#FB923C', ctaSoft: 'rgba(251,146,60,0.15)',
    border: '#1F3D39', success: '#34D399', successSoft: 'rgba(52,211,153,0.12)',
    warning: '#FACC15', warningSoft: 'rgba(250,204,21,0.12)',
    purple: '#A78BFA', purpleSoft: 'rgba(167,139,250,0.12)',
    navBg: '#112220', navBorder: '#1F3D39',
    progressBg: '#1A302D', progressFill: '#14B8A6',
    cardBg: '#112220', cardBorder: '#1F3D39',
  },
};

const CAMPAIGNS = [
  {
    id: 1, name: 'Digital Oasis Restoration', icon: 'TreePalm', color: '#0D9488',
    desc: 'Restore the forgotten digital oasis by completing productivity quests together.',
    participants: 342, progress: 67, timeLeft: '2d 14h', tasksTotal: 500, tasksDone: 335,
    tiles: 24, tilesRevealed: 16, category: 'Restoration',
  },
  {
    id: 2, name: 'Cosmic Code Cleanup', icon: 'Rocket', color: '#8B5CF6',
    desc: 'Venture through the stars and clean up cosmic debris through focused work sessions.',
    participants: 218, progress: 43, timeLeft: '4d 8h', tasksTotal: 400, tasksDone: 172,
    tiles: 20, tilesRevealed: 9, category: 'Exploration',
  },
  {
    id: 3, name: 'Ember Workshop', icon: 'Flame', color: '#F97316',
    desc: 'Forge powerful artifacts in the ember workshop by completing creative micro-tasks.',
    participants: 156, progress: 28, timeLeft: '6d 2h', tasksTotal: 350, tasksDone: 98,
    tiles: 18, tilesRevealed: 5, category: 'Creation',
  },
];

const TASKS = [
  { id: 1, title: 'Draft 3 compelling email headlines', xp: 15, time: '5 min', icon: 'Mail', campaign: 1, done: false },
  { id: 2, title: 'Review a 15-minute learning module', xp: 25, time: '15 min', icon: 'BookOpen', campaign: 1, done: false },
  { id: 3, title: 'Organize 5 desktop files into folders', xp: 10, time: '3 min', icon: 'FolderOpen', campaign: 1, done: true },
  { id: 4, title: 'Brainstorm 5 content hooks for a blog post', xp: 20, time: '8 min', icon: 'Lightbulb', campaign: 2, done: false },
  { id: 5, title: 'Refine 3 email subject lines', xp: 12, time: '4 min', icon: 'PenLine', campaign: 2, done: false },
  { id: 6, title: 'Review and annotate one design mockup', xp: 30, time: '12 min', icon: 'Palette', campaign: 3, done: false },
  { id: 7, title: 'Write a 100-word product description', xp: 18, time: '6 min', icon: 'FileText', campaign: 3, done: false },
  { id: 8, title: 'Log 3 key takeaways from a meeting', xp: 10, time: '3 min', icon: 'ClipboardList', campaign: 1, done: true },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [tasks, setTasks] = useState(TASKS);
  const [streak, setStreak] = useState(7);
  const [glimmers, setGlimmers] = useState(1240);
  const [focusActive, setFocusActive] = useState(false);
  const [focusTime, setFocusTime] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showTaskComplete, setShowTaskComplete] = useState(false);
  const timerRef = useRef(null);

  const t = isDark ? THEMES.dark : THEMES.light;
  const ff = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    if (focusActive) {
      timerRef.current = setInterval(() => setFocusTime(p => p + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [focusActive]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const completeTask = (taskId) => {
    setTasks(prev => prev.map(tk => tk.id === taskId ? { ...tk, done: true } : tk));
    setGlimmers(g => g + 15);
    setShowTaskComplete(true);
    setTimeout(() => setShowTaskComplete(false), 1500);
  };

  const Icon = ({ name, size = 20, color }) => {
    const icon = window.lucide[name];
    if (!icon) return null;
    return React.createElement(icon, { size, color: color || t.text });
  };

  const styleTag = React.createElement('style', { dangerouslySetInnerHTML: { __html: `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 8px rgba(13,148,136,0.3); } 50% { box-shadow: 0 0 20px rgba(13,148,136,0.6); } }
    @keyframes tileReveal { from { opacity: 0; transform: scale(0.8) rotateY(90deg); } to { opacity: 1; transform: scale(1) rotateY(0deg); } }
    * { -webkit-tap-highlight-color: transparent; }
  ` } });

  /* ─── HOME SCREEN ─── */
  const HomeScreen = () => {
    const activeTasks = tasks.filter(tk => !tk.done);
    const completedToday = tasks.filter(tk => tk.done).length;
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      /* Header */
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 15, color: t.textSub, margin: 0, fontWeight: 500, fontFamily: ff } }, 'Good afternoon'),
            React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, margin: '2px 0 0', letterSpacing: -0.5, fontFamily: ff } }, 'Sparks')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
            React.createElement('button', {
              onClick: () => setIsDark(!isDark),
              style: { width: 44, height: 44, borderRadius: 22, border: `2px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
            }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.primary })),
            React.createElement('div', {
              style: { width: 44, height: 44, borderRadius: 22, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, React.createElement('span', { style: { color: '#fff', fontWeight: 700, fontSize: 17, fontFamily: ff } }, 'A'))
          )
        )
      ),

      /* Streak + Glimmers bar */
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '16px 20px', animation: 'fadeIn 0.4s ease' } },
        React.createElement('div', { style: { flex: 1, background: t.ctaSoft, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(Icon, { name: 'Flame', size: 22, color: t.cta }),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 22, fontWeight: 700, color: t.cta, margin: 0, fontFamily: ff } }, `${streak} days`),
            React.createElement('p', { style: { fontSize: 13, color: t.textSub, margin: 0, fontFamily: ff } }, 'Streak')
          )
        ),
        React.createElement('div', { style: { flex: 1, background: t.primarySoft, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(Icon, { name: 'Sparkles', size: 22, color: t.primary }),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 22, fontWeight: 700, color: t.primary, margin: 0, fontFamily: ff } }, glimmers.toLocaleString()),
            React.createElement('p', { style: { fontSize: 13, color: t.textSub, margin: 0, fontFamily: ff } }, 'Glimmers')
          )
        )
      ),

      /* Active Campaign */
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '12px 0 10px', fontFamily: ff } }, 'Active Campaign'),
        React.createElement('div', {
          onClick: () => { setSelectedCampaign(CAMPAIGNS[0]); setActiveScreen('campaign'); },
          style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 20, padding: 20, cursor: 'pointer', transition: 'transform 0.15s', animation: 'slideUp 0.5s ease' }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: 'rgba(13,148,136,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'TreePalm', size: 24, color: '#0D9488' })
              ),
              React.createElement('div', null,
                React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, margin: 0, fontFamily: ff } }, 'Digital Oasis Restoration'),
                React.createElement('p', { style: { fontSize: 13, color: t.textSub, margin: '2px 0 0', fontFamily: ff } }, '342 contributors')
              )
            ),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, background: t.ctaSoft, padding: '4px 10px', borderRadius: 8, fontFamily: ff } }, '2d 14h')
          ),
          /* Progress */
          React.createElement('div', { style: { marginTop: 16 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontSize: 13, color: t.textSub, fontWeight: 600, fontFamily: ff } }, 'Lore Map Progress'),
              React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 700, fontFamily: ff } }, '67%')
            ),
            React.createElement('div', { style: { height: 8, borderRadius: 4, background: t.progressBg, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: '67%', borderRadius: 4, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, transition: 'width 0.6s ease' } })
            )
          ),
          /* Mosaic preview */
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3, marginTop: 14 } },
            ...Array.from({ length: 24 }, (_, i) => React.createElement('div', {
              key: i,
              style: {
                aspectRatio: '1', borderRadius: 4,
                background: i < 16 ? `hsl(${170 + i * 4}, ${50 + i * 2}%, ${40 + i * 2}%)` : t.progressBg,
                opacity: i < 16 ? 1 : 0.4,
                animation: i < 16 ? `tileReveal 0.4s ease ${i * 0.03}s both` : 'none',
              }
            }))
          ),
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '10px 0 0', fontFamily: ff, textAlign: 'center' } }, '16 of 24 tiles revealed')
        )
      ),

      /* Today's Tasks */
      React.createElement('div', { style: { padding: '0 20px', marginTop: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: 0, fontFamily: ff } }, 'Micro-Tasks'),
          React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 600, fontFamily: ff } }, `${completedToday} done today`)
        ),
        ...activeTasks.slice(0, 3).map((task, i) =>
          React.createElement('div', {
            key: task.id,
            style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, animation: `slideUp 0.4s ease ${(i + 1) * 0.1}s both`, cursor: 'pointer', transition: 'transform 0.15s' },
            onClick: () => completeTask(task.id)
          },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: task.icon, size: 18, color: t.primary })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', { style: { fontSize: 15, fontWeight: 600, color: t.text, margin: 0, fontFamily: ff } }, task.title),
              React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 4 } },
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: ff } }, task.time),
                React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 600, fontFamily: ff } }, `+${task.xp} XP`)
              )
            ),
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 16, border: `2px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: 'Check', size: 14, color: t.textMuted })
            )
          )
        )
      )
    );
  };

  /* ─── CAMPAIGNS SCREEN ─── */
  const CampaignsScreen = () => {
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5, fontFamily: ff } }, 'Campaigns'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSub, margin: '4px 0 16px', fontFamily: ff } }, 'Join a Spark Campaign and build together')
      ),

      /* Filter chips */
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' } },
        ...['All', 'Restoration', 'Exploration', 'Creation'].map((cat, i) =>
          React.createElement('button', {
            key: cat,
            style: { padding: '8px 16px', borderRadius: 20, border: i === 0 ? 'none' : `1.5px solid ${t.border}`, background: i === 0 ? t.primary : 'transparent', color: i === 0 ? '#fff' : t.textSub, fontSize: 13, fontWeight: 600, fontFamily: ff, cursor: 'pointer', whiteSpace: 'nowrap', minHeight: 44 }
          },
            React.createElement('span', null, cat)
          )
        )
      ),

      /* Campaign cards */
      React.createElement('div', { style: { padding: '0 20px' } },
        ...CAMPAIGNS.map((c, i) =>
          React.createElement('div', {
            key: c.id,
            onClick: () => { setSelectedCampaign(c); setActiveScreen('campaign'); },
            style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 20, padding: 20, marginBottom: 12, cursor: 'pointer', animation: `slideUp 0.4s ease ${i * 0.1}s both`, transition: 'transform 0.15s' }
          },
            React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
              React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(Icon, { name: c.icon, size: 26, color: c.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, margin: 0, fontFamily: ff } }, c.name),
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, background: t.ctaSoft, padding: '3px 8px', borderRadius: 6, fontFamily: ff, flexShrink: 0 } }, c.timeLeft)
                ),
                React.createElement('p', { style: { fontSize: 15, color: t.textSub, margin: '6px 0 0', lineHeight: 1.4, fontFamily: ff } }, c.desc)
              )
            ),
            React.createElement('div', { style: { marginTop: 16, display: 'flex', gap: 16 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: ff } }, `${c.participants}`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'LayoutGrid', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: ff } }, `${c.tilesRevealed}/${c.tiles} tiles`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'CheckCircle', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: ff } }, `${c.tasksDone}/${c.tasksTotal}`)
              )
            ),
            React.createElement('div', { style: { marginTop: 12 } },
              React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.progressBg, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${c.progress}%`, borderRadius: 3, background: c.color, transition: 'width 0.6s ease' } })
              )
            )
          )
        )
      )
    );
  };

  /* ─── CAMPAIGN DETAIL SCREEN ─── */
  const CampaignScreen = () => {
    const c = selectedCampaign || CAMPAIGNS[0];
    const campaignTasks = tasks.filter(tk => tk.campaign === c.id);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      /* Back + header */
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('button', {
          onClick: () => setActiveScreen('campaigns'),
          style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, minHeight: 44 }
        },
          React.createElement(Icon, { name: 'ChevronLeft', size: 20, color: t.primary }),
          React.createElement('span', { style: { fontSize: 17, color: t.primary, fontWeight: 600, fontFamily: ff } }, 'Back')
        )
      ),
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 18, background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: c.icon, size: 28, color: c.color })
          ),
          React.createElement('div', null,
            React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5, fontFamily: ff } }, c.name),
            React.createElement('p', { style: { fontSize: 15, color: t.textSub, margin: '2px 0 0', fontFamily: ff } }, `${c.participants} contributors`)
          )
        ),
        React.createElement('p', { style: { fontSize: 15, color: t.textSub, lineHeight: 1.5, margin: '0 0 16px', fontFamily: ff } }, c.desc)
      ),

      /* Narrative Mosaic */
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 10px', fontFamily: ff } }, 'Narrative Mosaic'),
        React.createElement('div', { style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 20, padding: 16 } },
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(c.tiles))}, 1fr)`, gap: 4 } },
            ...Array.from({ length: c.tiles }, (_, i) => {
              const revealed = i < c.tilesRevealed;
              const hue = c.color === '#0D9488' ? 170 : c.color === '#8B5CF6' ? 260 : 25;
              return React.createElement('div', {
                key: i,
                style: {
                  aspectRatio: '1', borderRadius: 6,
                  background: revealed ? `hsl(${hue + i * 6}, ${45 + i * 3}%, ${35 + i * 3}%)` : t.progressBg,
                  opacity: revealed ? 1 : 0.35,
                  animation: revealed ? `tileReveal 0.5s ease ${i * 0.05}s both` : 'none',
                  transition: 'all 0.3s',
                }
              });
            })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 12 } },
            React.createElement('span', { style: { fontSize: 13, color: t.textSub, fontFamily: ff } }, `${c.tilesRevealed} of ${c.tiles} fragments revealed`),
            React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 700, fontFamily: ff } }, `${c.progress}%`)
          )
        )
      ),

      /* Campaign tasks */
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 10px', fontFamily: ff } }, 'Available Tasks'),
        ...campaignTasks.map((task, i) =>
          React.createElement('div', {
            key: task.id,
            style: {
              background: task.done ? t.successSoft : t.cardBg,
              border: `1.5px solid ${task.done ? t.success : t.cardBorder}`,
              borderRadius: 16, padding: '14px 16px', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: task.done ? 0.7 : 1, cursor: task.done ? 'default' : 'pointer',
              animation: `slideUp 0.3s ease ${i * 0.08}s both`,
            },
            onClick: () => !task.done && completeTask(task.id)
          },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: task.done ? t.successSoft : `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: task.done ? 'CheckCircle' : task.icon, size: 18, color: task.done ? t.success : c.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 15, fontWeight: 600, color: t.text, margin: 0, fontFamily: ff, textDecoration: task.done ? 'line-through' : 'none' } }, task.title),
              React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 4 } },
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: ff } }, task.time),
                React.createElement('span', { style: { fontSize: 13, color: c.color, fontWeight: 600, fontFamily: ff } }, `+${task.xp} XP`)
              )
            )
          )
        )
      ),

      /* Stats */
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '16px 20px' } },
        React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 16, padding: 14, textAlign: 'center' } },
          React.createElement('p', { style: { fontSize: 22, fontWeight: 700, color: t.primary, margin: 0, fontFamily: ff } }, c.tasksDone),
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '2px 0 0', fontFamily: ff } }, 'Completed')
        ),
        React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 16, padding: 14, textAlign: 'center' } },
          React.createElement('p', { style: { fontSize: 22, fontWeight: 700, color: t.cta, margin: 0, fontFamily: ff } }, c.timeLeft),
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '2px 0 0', fontFamily: ff } }, 'Remaining')
        )
      )
    );
  };

  /* ─── FOCUS SCREEN ─── */
  const FocusScreen = () => {
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20, display: 'flex', flexDirection: 'column' } },
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5, fontFamily: ff } }, 'Focus Mode'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSub, margin: '4px 0 0', fontFamily: ff } }, 'Earn bonus Glimmers while you focus')
      ),

      /* Timer circle */
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' } },
        React.createElement('div', {
          style: {
            width: 200, height: 200, borderRadius: 100,
            border: `4px solid ${focusActive ? t.primary : t.border}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            animation: focusActive ? 'glowPulse 2s ease infinite' : 'none',
            transition: 'all 0.3s',
          }
        },
          React.createElement('p', { style: { fontSize: 42, fontWeight: 800, color: t.text, margin: 0, fontFamily: ff, letterSpacing: -1 } }, formatTime(focusTime)),
          React.createElement('p', { style: { fontSize: 13, color: focusActive ? t.primary : t.textMuted, margin: '4px 0 0', fontWeight: 600, fontFamily: ff } }, focusActive ? 'Focusing...' : 'Ready')
        ),

        /* Focus aura indicator */
        focusActive && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, background: t.primarySoft, padding: '10px 20px', borderRadius: 20, animation: 'pulse 2s ease infinite' } },
          React.createElement(Icon, { name: 'Zap', size: 16, color: t.primary }),
          React.createElement('span', { style: { fontSize: 15, color: t.primary, fontWeight: 600, fontFamily: ff } }, 'Focus Aura Active'),
          React.createElement('span', { style: { fontSize: 13, color: t.textSub, fontFamily: ff } }, '+2x Glimmers')
        ),

        /* Start/Stop button */
        React.createElement('button', {
          onClick: () => {
            if (focusActive) {
              setFocusActive(false);
              const earned = Math.floor(focusTime / 10);
              setGlimmers(g => g + earned);
              setFocusTime(0);
            } else {
              setFocusActive(true);
              setFocusTime(0);
            }
          },
          style: {
            marginTop: 32, width: '100%', maxWidth: 280, padding: '16px 0', borderRadius: 16,
            border: 'none', background: focusActive ? t.cardBg : t.cta,
            color: focusActive ? t.cta : '#fff',
            fontSize: 17, fontWeight: 700, fontFamily: ff, cursor: 'pointer',
            boxShadow: focusActive ? 'none' : '0 4px 16px rgba(249,115,22,0.35)',
            transition: 'all 0.2s', minHeight: 52,
            ...(focusActive ? { border: `2px solid ${t.cta}` } : {}),
          }
        }, focusActive ? 'End Session' : 'Start Focus Session'),

        /* Current task */
        React.createElement('div', { style: { marginTop: 24, width: '100%', maxWidth: 320 } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 8px', fontFamily: ff } }, 'Current Task'),
          React.createElement('div', { style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: 'Mail', size: 18, color: t.primary })
            ),
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 15, fontWeight: 600, color: t.text, margin: 0, fontFamily: ff } }, 'Draft 3 email headlines'),
              React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '2px 0 0', fontFamily: ff } }, 'Digital Oasis Restoration')
            )
          )
        )
      ),

      /* Quick presets */
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 10px', fontFamily: ff } }, 'Quick Presets'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          ...['5 min', '15 min', '25 min', '45 min'].map(label =>
            React.createElement('button', {
              key: label,
              style: { flex: 1, padding: '12px 0', borderRadius: 12, border: `1.5px solid ${t.border}`, background: t.cardBg, color: t.text, fontSize: 15, fontWeight: 600, fontFamily: ff, cursor: 'pointer', minHeight: 44, transition: 'all 0.15s' }
            }, label)
          )
        )
      )
    );
  };

  /* ─── PROFILE SCREEN ─── */
  const ProfileScreen = () => {
    const badges = [
      { name: 'First Spark', icon: 'Zap', color: t.cta, earned: true },
      { name: '7-Day Streak', icon: 'Flame', color: '#EF4444', earned: true },
      { name: 'Mosaic Builder', icon: 'LayoutGrid', color: t.primary, earned: true },
      { name: 'Focus Master', icon: 'Target', color: t.purple, earned: false },
      { name: 'Campaign Hero', icon: 'Trophy', color: '#EAB308', earned: false },
      { name: 'Co-Op Legend', icon: 'Crown', color: '#EC4899', earned: false },
    ];
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5, fontFamily: ff } }, 'Profile')
      ),

      /* Avatar section */
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px', animation: 'fadeIn 0.5s ease' } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('span', { style: { color: '#fff', fontSize: 34, fontWeight: 800, fontFamily: ff } }, 'A')
        ),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '12px 0 2px', fontFamily: ff } }, 'Alex Chen'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSub, margin: 0, fontFamily: ff } }, 'Spark Contributor since March 2026'),

        /* Stats row */
        React.createElement('div', { style: { display: 'flex', gap: 20, marginTop: 20 } },
          ...[
            { label: 'Glimmers', value: glimmers.toLocaleString(), color: t.primary },
            { label: 'Tasks Done', value: '47', color: t.cta },
            { label: 'Streak', value: `${streak}d`, color: '#EF4444' },
          ].map(stat =>
            React.createElement('div', { key: stat.label, style: { textAlign: 'center' } },
              React.createElement('p', { style: { fontSize: 22, fontWeight: 700, color: stat.color, margin: 0, fontFamily: ff } }, stat.value),
              React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '2px 0 0', fontFamily: ff } }, stat.label)
            )
          )
        )
      ),

      /* Artifacts/Badges */
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '12px 0 12px', fontFamily: ff } }, 'Artifacts & Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          ...badges.map((badge, i) =>
            React.createElement('div', {
              key: badge.name,
              style: {
                background: badge.earned ? t.cardBg : t.surfaceDim,
                border: `1.5px solid ${badge.earned ? t.cardBorder : t.border}`,
                borderRadius: 16, padding: '16px 8px', textAlign: 'center',
                opacity: badge.earned ? 1 : 0.5,
                animation: `slideUp 0.4s ease ${i * 0.06}s both`,
              }
            },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 22, background: badge.earned ? `${badge.color}18` : t.progressBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
                React.createElement(Icon, { name: badge.icon, size: 22, color: badge.earned ? badge.color : t.textMuted })
              ),
              React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: badge.earned ? t.text : t.textMuted, margin: 0, fontFamily: ff } }, badge.name)
            )
          )
        )
      ),

      /* Campaign History */
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 12px', fontFamily: ff } }, 'Campaign History'),
        React.createElement('div', { style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 } },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.successSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'CheckCircle', size: 20, color: t.success })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 15, fontWeight: 600, color: t.text, margin: 0, fontFamily: ff } }, 'Aurora Signal Relay'),
            React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '2px 0 0', fontFamily: ff } }, 'Completed \u00B7 18 tasks \u00B7 +280 Glimmers')
          )
        ),
        React.createElement('div', { style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.successSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'CheckCircle', size: 20, color: t.success })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 15, fontWeight: 600, color: t.text, margin: 0, fontFamily: ff } }, 'Crystal Archive Rescue'),
            React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: '2px 0 0', fontFamily: ff } }, 'Completed \u00B7 12 tasks \u00B7 +195 Glimmers')
          )
        )
      ),

      /* Theme toggle in settings */
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 12px', fontFamily: ff } }, 'Settings'),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: { background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', minHeight: 52 }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary }),
            React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: ff } }, isDark ? 'Light Mode' : 'Dark Mode')
          ),
          React.createElement('div', {
            style: { width: 48, height: 28, borderRadius: 14, background: isDark ? t.primary : t.progressBg, display: 'flex', alignItems: 'center', padding: 2, transition: 'background 0.2s' }
          },
            React.createElement('div', { style: { width: 24, height: 24, borderRadius: 12, background: '#fff', transition: 'transform 0.2s', transform: isDark ? 'translateX(20px)' : 'translateX(0)' } })
          )
        )
      )
    );
  };

  const screens = { home: HomeScreen, campaigns: CampaignsScreen, campaign: CampaignScreen, focus: FocusScreen, profile: ProfileScreen };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'campaigns', label: 'Campaigns', icon: 'Compass' },
    { id: 'focus', label: 'Focus', icon: 'Target' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const navTab = activeScreen === 'campaign' ? 'campaigns' : activeScreen;

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: ff } },
    styleTag,

    /* Task completion toast */
    showTaskComplete && React.createElement('div', {
      style: {
        position: 'fixed', top: 40, left: '50%', transform: 'translateX(-50%)',
        background: THEMES.light.primary, color: '#fff', padding: '12px 24px',
        borderRadius: 16, fontSize: 15, fontWeight: 700, fontFamily: ff,
        zIndex: 1000, animation: 'slideUp 0.3s ease',
        display: 'flex', alignItems: 'center', gap: 8,
      }
    },
      React.createElement(Icon, { name: 'Sparkles', size: 18, color: '#fff' }),
      'Task Complete! +15 Glimmers'
    ),

    /* Phone frame */
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, background: t.bg,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        position: 'relative', border: `1px solid ${t.border}`,
      }
    },
      /* Screen content */
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
        React.createElement(screens[activeScreen] || HomeScreen)
      ),

      /* Bottom nav */
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 28px', background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 16px',
              minWidth: 64, minHeight: 44, transition: 'all 0.15s',
            }
          },
            React.createElement(Icon, { name: item.icon, size: 22, color: navTab === item.id ? t.primary : t.textMuted }),
            React.createElement('span', {
              style: { fontSize: 11, fontWeight: navTab === item.id ? 700 : 500, color: navTab === item.id ? t.primary : t.textMuted, fontFamily: ff }
            }, item.label)
          )
        )
      )
    )
  );
}