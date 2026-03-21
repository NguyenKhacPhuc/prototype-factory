const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F4F0FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE8FF',
    card: '#FFFFFF',
    cardAlt: '#F9F6FF',
    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    primaryDark: '#5B21B6',
    secondary: '#EC4899',
    accent: '#F59E0B',
    text: '#1A0A2E',
    textSecondary: '#6B5B8E',
    textMuted: '#9D8EB8',
    border: '#E5DFF7',
    navBg: '#FFFFFF',
    navBorder: '#E5DFF7',
    statusBar: '#1A0A2E',
    gradientStart: '#7C3AED',
    gradientEnd: '#EC4899',
    tagBg: '#EDE8FF',
    tagText: '#7C3AED',
    success: '#10B981',
    danger: '#EF4444',
    overlay: 'rgba(124,58,237,0.08)',
  },
  dark: {
    bg: '#0D0618',
    surface: '#1A0F2E',
    surfaceAlt: '#231640',
    card: '#1E1235',
    cardAlt: '#261845',
    primary: '#A78BFA',
    primaryLight: '#C4B5FD',
    primaryDark: '#7C3AED',
    secondary: '#F472B6',
    accent: '#FBBF24',
    text: '#F5F0FF',
    textSecondary: '#C4B5FD',
    textMuted: '#8B7BAE',
    border: '#2D1F4A',
    navBg: '#1A0F2E',
    navBorder: '#2D1F4A',
    statusBar: '#F5F0FF',
    gradientStart: '#A78BFA',
    gradientEnd: '#F472B6',
    tagBg: '#2D1F4A',
    tagText: '#C4B5FD',
    success: '#34D399',
    danger: '#F87171',
    overlay: 'rgba(167,139,250,0.12)',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeKey, setThemeKey] = useState('light');
  const theme = themes[themeKey];
  const toggleTheme = () => setThemeKey(k => k === 'light' ? 'dark' : 'light');

  // Inject Google Font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const fontFamily = "'Plus Jakarta Sans', sans-serif";

  const containerStyle = {
    width: 375,
    height: 812,
    borderRadius: 44,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    background: theme.bg,
    fontFamily,
    boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
    transition: 'background 0.3s ease',
  };

  const pageStyle = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily }}>
      <div style={containerStyle}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 8px', zIndex: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: theme.statusBar }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: theme.statusBar })}
            {React.createElement(window.lucide.Battery, { size: 16, color: theme.statusBar })}
          </div>
        </div>

        {/* Page Content */}
        <div style={pageStyle}>
          {activeTab === 'home' && <HomeScreen theme={theme} themeKey={themeKey} fontFamily={fontFamily} />}
          {activeTab === 'scenes' && <ScenesScreen theme={theme} fontFamily={fontFamily} />}
          {activeTab === 'play' && <PlayScreen theme={theme} fontFamily={fontFamily} />}
          {activeTab === 'social' && <SocialScreen theme={theme} fontFamily={fontFamily} />}
          {activeTab === 'settings' && <SettingsScreen theme={theme} themeKey={themeKey} toggleTheme={toggleTheme} fontFamily={fontFamily} />}
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 16px', borderTop: `1px solid ${theme.navBorder}`, background: theme.navBg, flexShrink: 0, zIndex: 50 }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 12px' }}>
            {React.createElement(window.lucide.Sparkles, { size: 22, color: activeTab === 'home' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'home' ? theme.primary : theme.textMuted, fontFamily }}>Discover</span>
          </button>
          <button onClick={() => setActiveTab('scenes')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 12px' }}>
            {React.createElement(window.lucide.Film, { size: 22, color: activeTab === 'scenes' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'scenes' ? theme.primary : theme.textMuted, fontFamily }}>Scenes</span>
          </button>
          <button onClick={() => setActiveTab('play')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 4px' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${theme.primary}55`, marginTop: -16 }}>
              {React.createElement(window.lucide.Play, { size: 22, color: '#fff', fill: '#fff' })}
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'play' ? theme.primary : theme.textMuted, fontFamily, marginTop: 2 }}>Play</span>
          </button>
          <button onClick={() => setActiveTab('social')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 12px' }}>
            {React.createElement(window.lucide.Users, { size: 22, color: activeTab === 'social' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'social' ? theme.primary : theme.textMuted, fontFamily }}>Social</span>
          </button>
          <button onClick={() => setActiveTab('settings')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 12px' }}>
            {React.createElement(window.lucide.User, { size: 22, color: activeTab === 'settings' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'settings' ? theme.primary : theme.textMuted, fontFamily }}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ theme, themeKey, fontFamily }) {
  const [activeGenre, setActiveGenre] = useState('All');
  const genres = ['All', 'Noir', 'Sci-Fi', 'Romance', 'Comedy', 'Fantasy'];
  const moments = [
    { id: 1, context: 'Morning Commute', genre: 'Noir', title: 'The Last Train to Nowhere', duration: '8 min', mood: 'Tense', color: '#7C3AED', emoji: '🚆', progress: 0 },
    { id: 2, context: 'Lunch Break', genre: 'Fantasy', title: 'The Enchanted Sandwich Shop', duration: '6 min', mood: 'Whimsical', color: '#EC4899', emoji: '🍜', progress: 40 },
    { id: 3, context: 'Post-Work Wind Down', genre: 'Sci-Fi', title: 'Signal from Sector 7', duration: '10 min', mood: 'Epic', color: '#06B6D4', emoji: '🚀', progress: 0 },
    { id: 4, context: 'Rainy Evening', genre: 'Romance', title: 'Coffee & Conversations', duration: '7 min', mood: 'Cozy', color: '#F59E0B', emoji: '☕', progress: 75 },
  ];

  return (
    <div style={{ padding: '0 0 20px' }}>
      {/* Header */}
      <div style={{ padding: '4px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, letterSpacing: 1, textTransform: 'uppercase', fontFamily }}>Good afternoon, Alex</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily, lineHeight: 1.2, marginTop: 2 }}>Your Moments{'\n'}Await 🎬</div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 20 }}>🎭</span>
        </div>
      </div>

      {/* Context Banner */}
      <div style={{ margin: '0 20px 20px', borderRadius: 18, background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 72, opacity: 0.2 }}>🚆</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: 0.5, fontFamily }}>DETECTED MOMENT</div>
        <div style={{ fontSize: 18, color: '#fff', fontWeight: 800, fontFamily, marginTop: 4 }}>Commute Mode Active</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily, marginTop: 4 }}>Tuesday 3:47 PM · Moving · Subway</div>
        <button style={{ marginTop: 12, background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 10, padding: '7px 16px', color: '#fff', fontSize: 13, fontWeight: 700, fontFamily, cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
          Generate Scene →
        </button>
      </div>

      {/* Genre Filter */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 16 }}>
        {genres.map(g => (
          <button key={g} onClick={() => setActiveGenre(g)} style={{ background: activeGenre === g ? theme.primary : theme.surfaceAlt, border: 'none', borderRadius: 20, padding: '6px 14px', color: activeGenre === g ? '#fff' : theme.textSecondary, fontSize: 12, fontWeight: 700, fontFamily, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s' }}>
            {g}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: theme.text, fontFamily }}>Ready to Play</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: theme.primary, fontFamily }}>See all</span>
      </div>

      {/* Scene Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px' }}>
        {moments.map(m => (
          <div key={m.id} style={{ background: theme.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${theme.border}`, boxShadow: `0 2px 12px ${theme.overlay}` }}>
            <div style={{ background: `linear-gradient(135deg, ${m.color}22, ${m.color}11)`, padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${m.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                {m.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: m.color, background: `${m.color}18`, padding: '2px 8px', borderRadius: 6, fontFamily }}>{m.genre}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: theme.textMuted, background: theme.surfaceAlt, padding: '2px 8px', borderRadius: 6, fontFamily }}>{m.duration}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, fontFamily, lineHeight: 1.3 }}>{m.title}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontFamily, marginTop: 2 }}>{m.context} · {m.mood}</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${m.color}, ${m.color}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide.Play, { size: 16, color: '#fff', fill: '#fff' })}
              </div>
            </div>
            {m.progress > 0 && (
              <div style={{ padding: '8px 16px 10px', borderTop: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: theme.textMuted, fontFamily }}>Continue where you left off</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: m.color, fontFamily }}>{m.progress}%</span>
                </div>
                <div style={{ height: 4, background: theme.surfaceAlt, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${m.progress}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}aa)`, borderRadius: 2 }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenesScreen({ theme, fontFamily }) {
  const [tab, setTab] = useState('my');
  const myScenes = [
    { id: 1, title: 'The Last Train', genre: 'Noir', branches: 3, plays: 12, emoji: '🚆', status: 'complete' },
    { id: 2, title: 'Signal from Sector 7', genre: 'Sci-Fi', branches: 5, plays: 7, emoji: '🚀', status: 'in-progress' },
    { id: 3, title: 'The Enchanted Café', genre: 'Fantasy', branches: 2, plays: 21, emoji: '☕', status: 'complete' },
    { id: 4, title: 'Tuesday Noir', genre: 'Noir', branches: 4, plays: 3, emoji: '🕵️', status: 'draft' },
  ];

  const statusColors = { complete: theme.success, 'in-progress': theme.accent, draft: theme.textMuted };
  const statusLabels = { complete: 'Complete', 'in-progress': 'In Progress', draft: 'Draft' };

  return (
    <div style={{ padding: '0 0 20px' }}>
      <div style={{ padding: '4px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily }}>My Scenes</div>
        <button style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {React.createElement(window.lucide.Plus, { size: 18, color: '#fff' })}
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 10, padding: '0 20px', marginBottom: 20 }}>
        {[{ label: 'Scenes', value: '4' }, { label: 'Total Plays', value: '43' }, { label: 'Remixes', value: '8' }].map(s => (
          <div key={s.label} style={{ flex: 1, background: theme.card, borderRadius: 14, padding: '12px 10px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.primary, fontFamily }}>{s.value}</div>
            <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600, fontFamily }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, padding: '0 20px', marginBottom: 16, background: theme.surfaceAlt, borderRadius: 14, margin: '0 20px 16px', padding: 4 }}>
        {[{ id: 'my', label: 'My Scenes' }, { id: 'remixed', label: 'Remixed' }, { id: 'saved', label: 'Saved' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? theme.card : 'transparent', border: 'none', borderRadius: 10, padding: '7px 0', color: tab === t.id ? theme.primary : theme.textMuted, fontSize: 12, fontWeight: 700, fontFamily, cursor: 'pointer', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px' }}>
        {myScenes.map(s => (
          <div key={s.id} style={{ background: theme.card, borderRadius: 18, padding: '14px 16px', border: `1px solid ${theme.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: theme.text, fontFamily }}>{s.title}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: statusColors[s.status], background: `${statusColors[s.status]}18`, padding: '2px 6px', borderRadius: 5, fontFamily }}>{statusLabels[s.status]}</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>{s.genre}</span>
                <span style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>🌿 {s.branches} branches</span>
                <span style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>▶ {s.plays} plays</span>
              </div>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })}
          </div>
        ))}
      </div>

      {/* Generate Button */}
      <div style={{ padding: '16px 20px 0' }}>
        <button style={{ width: '100%', background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, border: 'none', borderRadius: 16, padding: '14px 0', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {React.createElement(window.lucide.Wand2, { size: 18, color: '#fff' })}
          Generate New Scene
        </button>
      </div>
    </div>
  );
}

function PlayScreen({ theme, fontFamily }) {
  const [phase, setPhase] = useState('setup'); // setup, playing, choice, result
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [choiceMade, setChoiceMade] = useState(false);
  const [storyBeat, setStoryBeat] = useState(0);

  const story = {
    title: 'The Last Train to Nowhere',
    genre: 'Noir',
    emoji: '🚆',
    context: 'Evening Commute · Tuesday',
    beats: [
      { text: "The fluorescent lights of the underground flicker once, twice. Your reflection stares back from the dark window — tired eyes, sharp collar. A briefcase under your arm contains something you shouldn't have taken from the office.", choices: ['Examine the briefcase', 'Look around the carriage'] },
      { text: "The carriage holds three strangers. A woman in red reads a newspaper from last Thursday. An old man counts coins that never seem to run out. In the corner, a figure in a grey coat watches you. Directly.", choices: ['Approach the grey coat', 'Sit near the woman in red'] },
      { text: "She doesn't look up when you sit. 'You shouldn't be carrying that,' she says quietly, still reading. 'They already know.' The train shudders to a halt between stations. The lights go out.", choices: ['Ask who "they" are', 'Open the briefcase now'] },
    ]
  };

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setChoiceMade(true);
    setTimeout(() => {
      if (storyBeat < story.beats.length - 1) {
        setStoryBeat(b => b + 1);
        setChoiceMade(false);
        setSelectedChoice(null);
      } else {
        setPhase('result');
      }
    }, 900);
  };

  const beat = story.beats[storyBeat];

  if (phase === 'setup') {
    return (
      <div style={{ padding: '0 0 20px' }}>
        <div style={{ padding: '4px 20px 16px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily }}>Now Playing</div>
        </div>
        {/* Featured Card */}
        <div style={{ margin: '0 20px 20px', borderRadius: 24, background: `linear-gradient(160deg, #1a1a3e, #7C3AED)`, padding: '28px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{story.emoji}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 1, fontFamily, marginBottom: 4 }}>{story.genre} · {story.context}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily, marginBottom: 8 }}>{story.title}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily, marginBottom: 20, lineHeight: 1.5 }}>A cinematic mystery tailored to your evening commute. Every choice changes the story.</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
            {[{ icon: window.lucide.Clock, label: '8 min' }, { icon: window.lucide.GitBranch, label: '5 endings' }, { icon: window.lucide.Zap, label: 'Medium' }].map((tag, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                {React.createElement(tag.icon, { size: 12, color: 'rgba(255,255,255,0.9)' })}
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontFamily }}>{tag.label}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setPhase('playing')} style={{ background: '#fff', border: 'none', borderRadius: 16, padding: '14px 40px', color: theme.primary, fontSize: 16, fontWeight: 800, fontFamily, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Begin Scene
          </button>
        </div>

        {/* Up Next */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, fontFamily, marginBottom: 10 }}>Up Next</div>
          {[
            { title: 'Signal from Sector 7', genre: 'Sci-Fi', emoji: '🚀', duration: '10 min' },
            { title: 'The Enchanted Café', genre: 'Fantasy', emoji: '☕', duration: '6 min' },
          ].map((item, i) => (
            <div key={i} style={{ background: theme.card, borderRadius: 16, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 28 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, fontFamily }}>{item.title}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>{item.genre} · {item.duration}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16, marginTop: 20 }}>🎬</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily, textAlign: 'center', marginBottom: 8 }}>Scene Complete!</div>
        <div style={{ fontSize: 14, color: theme.textSecondary, fontFamily, textAlign: 'center', marginBottom: 24, lineHeight: 1.6 }}>You reached Ending #3: "The Whistleblower". Your choices shaped a gripping tale of secrets and last-minute decisions.</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {[{ label: 'Choices', val: '3' }, { label: 'Ending', val: '#3' }, { label: 'Time', val: '4m 12s' }].map(s => (
            <div key={s.label} style={{ background: theme.card, borderRadius: 14, padding: '12px 16px', textAlign: 'center', border: `1px solid ${theme.border}`, minWidth: 70 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: theme.primary, fontFamily }}>{s.val}</div>
              <div style={{ fontSize: 10, color: theme.textMuted, fontFamily }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, border: 'none', borderRadius: 16, padding: '14px 0', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily, cursor: 'pointer', marginBottom: 10 }}>
          Share & Remix →
        </button>
        <button onClick={() => { setPhase('setup'); setStoryBeat(0); setSelectedChoice(null); setChoiceMade(false); }} style={{ width: '100%', background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '14px 0', color: theme.text, fontSize: 15, fontWeight: 700, fontFamily, cursor: 'pointer' }}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Story Header */}
      <div style={{ padding: '4px 20px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={() => setPhase('setup')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          {React.createElement(window.lucide.ArrowLeft, { size: 20, color: theme.textSecondary })}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: theme.text, fontFamily }}>{story.title}</div>
          <div style={{ fontSize: 10, color: theme.textMuted, fontFamily }}>Beat {storyBeat + 1} of {story.beats.length}</div>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {story.beats.map((_, i) => (
            <div key={i} style={{ width: i <= storyBeat ? 24 : 8, height: 4, borderRadius: 2, background: i <= storyBeat ? theme.primary : theme.border, transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Story Text */}
      <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>
        <div style={{ background: theme.card, borderRadius: 20, padding: '20px', border: `1px solid ${theme.border}`, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.primary, letterSpacing: 0.5, fontFamily, marginBottom: 12 }}>SCENE {storyBeat + 1}</div>
          <div style={{ fontSize: 15, color: theme.text, fontFamily, lineHeight: 1.7, fontWeight: 400 }}>{beat.text}</div>
        </div>

        {/* Choices */}
        <div style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, fontFamily, marginBottom: 10, letterSpacing: 0.5 }}>WHAT DO YOU DO?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
          {beat.choices.map((choice, i) => (
            <button key={i} onClick={() => !choiceMade && handleChoice(choice)} style={{ background: choiceMade && selectedChoice === choice ? `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})` : choiceMade ? theme.surfaceAlt : theme.card, border: `2px solid ${choiceMade && selectedChoice === choice ? 'transparent' : theme.border}`, borderRadius: 16, padding: '14px 16px', textAlign: 'left', cursor: choiceMade ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.3s' }}>
              <div style={{ width: 28, height: 28, borderRadius: 10, background: choiceMade && selectedChoice === choice ? 'rgba(255,255,255,0.25)' : theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: choiceMade && selectedChoice === choice ? '#fff' : theme.primary, fontFamily }}>{String.fromCharCode(65 + i)}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: choiceMade && selectedChoice === choice ? '#fff' : theme.text, fontFamily }}>{choice}</span>
              {choiceMade && selectedChoice === choice && React.createElement(window.lucide.Check, { size: 16, color: '#fff', style: { marginLeft: 'auto' } })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialScreen({ theme, fontFamily }) {
  const [activeSection, setActiveSection] = useState('feed');
  const remixes = [
    { user: 'Maya K.', avatar: '🦊', scene: 'The Last Train', action: 'added an ending', time: '2m ago', preview: '"She opened the briefcase. Inside: a single ticket to 1987."', likes: 14, comments: 3 },
    { user: 'Jordan T.', avatar: '🐺', scene: 'Signal from Sector 7', action: 'remixed your scene', time: '18m ago', preview: '"The signal wasn\'t alien. It was a voicemail from your past self."', likes: 31, comments: 7 },
    { user: 'Priya S.', avatar: '🦋', scene: 'Coffee & Conversations', action: 'branched the story', time: '1h ago', preview: '"The barista knew your order before you said a word."', likes: 9, comments: 1 },
    { user: 'Carlos M.', avatar: '🐉', scene: 'Tuesday Noir', action: 'co-created with you', time: '3h ago', preview: '"The neon sign flickered S-E-C-R-E-T-S."', likes: 22, comments: 5 },
  ];

  return (
    <div style={{ padding: '0 0 20px' }}>
      <div style={{ padding: '4px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily }}>Remix Feed</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {React.createElement(window.lucide.Bell, { size: 20, color: theme.textSecondary })}
          {React.createElement(window.lucide.Search, { size: 20, color: theme.textSecondary })}
        </div>
      </div>

      {/* Active Collab Banner */}
      <div style={{ margin: '0 20px 16px', background: `linear-gradient(135deg, ${theme.gradientStart}22, ${theme.gradientEnd}22)`, borderRadius: 18, padding: '14px 16px', border: `1px solid ${theme.primary}33`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 28 }}>🎭</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: theme.primary, fontFamily }}>Live Collab Active</div>
          <div style={{ fontSize: 11, color: theme.textSecondary, fontFamily }}>Maya K. is writing an ending for your Noir scene right now...</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: theme.success, flexShrink: 0, boxShadow: `0 0 6px ${theme.success}` }} />
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: 0, margin: '0 20px 16px', background: theme.surfaceAlt, borderRadius: 14, padding: 4 }}>
        {[{ id: 'feed', label: 'Activity' }, { id: 'trending', label: 'Trending' }, { id: 'friends', label: 'Friends' }].map(t => (
          <button key={t.id} onClick={() => setActiveSection(t.id)} style={{ flex: 1, background: activeSection === t.id ? theme.card : 'transparent', border: 'none', borderRadius: 10, padding: '7px 0', color: activeSection === t.id ? theme.primary : theme.textMuted, fontSize: 12, fontWeight: 700, fontFamily, cursor: 'pointer', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px' }}>
        {remixes.map((r, i) => (
          <div key={i} style={{ background: theme.card, borderRadius: 18, padding: '14px 16px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{r.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, fontFamily }}>{r.user} <span style={{ color: theme.textSecondary, fontWeight: 500 }}>{r.action}</span></div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>{r.scene} · {r.time}</div>
              </div>
            </div>
            <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: '10px 12px', marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: theme.textSecondary, fontFamily, fontStyle: 'italic', lineHeight: 1.5 }}>{r.preview}</div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', padding: 0 }}>
                {React.createElement(window.lucide.Heart, { size: 14, color: theme.textMuted })}
                <span style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>{r.likes}</span>
              </button>
              <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', padding: 0 }}>
                {React.createElement(window.lucide.MessageCircle, { size: 14, color: theme.textMuted })}
                <span style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>{r.comments}</span>
              </button>
              <button style={{ marginLeft: 'auto', background: theme.surfaceAlt, border: 'none', borderRadius: 8, padding: '5px 12px', color: theme.primary, fontSize: 11, fontWeight: 700, fontFamily, cursor: 'pointer' }}>
                Remix
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen({ theme, themeKey, toggleTheme, fontFamily }) {
  const [notifications, setNotifications] = useState(true);
  const [locationContext, setLocationContext] = useState(true);
  const [voiceLines, setVoiceLines] = useState(false);

  const Toggle = ({ value, onToggle }) => (
    <button onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: value ? theme.primary : theme.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </button>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', fontFamily, padding: '0 20px', marginBottom: 8 }}>{title}</div>
      <div style={{ background: theme.card, marginLeft: 20, marginRight: 20, borderRadius: 18, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>{children}</div>
    </div>
  );

  const Row = ({ icon, label, right, last }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: last ? 'none' : `1px solid ${theme.border}` }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: theme.text, fontFamily }}>{label}</span>
      {right}
    </div>
  );

  return (
    <div style={{ padding: '0 0 20px' }}>
      <div style={{ padding: '4px 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily }}>Profile</div>
      </div>

      {/* Profile Card */}
      <div style={{ margin: '0 20px 20px', background: `linear-gradient(135deg, ${theme.gradientStart}18, ${theme.gradientEnd}18)`, borderRadius: 20, padding: '20px', border: `1px solid ${theme.primary}22`, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: 20, background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>🎭</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: theme.text, fontFamily }}>Alex Rivera</div>
          <div style={{ fontSize: 12, color: theme.textSecondary, fontFamily }}>@alexrivera · Story Explorer</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            <span style={{ fontSize: 11, color: theme.primary, fontWeight: 700, fontFamily }}>4 scenes created</span>
            <span style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>Level 3 Storyteller</span>
          </div>
        </div>
      </div>

      <Section title="Appearance">
        <Row
          icon={React.createElement(themeKey === 'light' ? window.lucide.Sun : window.lucide.Moon, { size: 16, color: theme.primary })}
          label={themeKey === 'light' ? 'Light Mode' : 'Dark Mode'}
          right={
            <button onClick={toggleTheme} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '5px 12px', color: theme.primary, fontSize: 12, fontWeight: 700, fontFamily, cursor: 'pointer' }}>
              Switch
            </button>
          }
        />
        <Row
          icon={React.createElement(window.lucide.Type, { size: 16, color: theme.primary })}
          label="Font Size"
          right={<span style={{ fontSize: 13, color: theme.textMuted, fontFamily }}>Medium</span>}
          last
        />
      </Section>

      <Section title="Experience">
        <Row
          icon={React.createElement(window.lucide.Bell, { size: 16, color: theme.primary })}
          label="Moment Notifications"
          right={<Toggle value={notifications} onToggle={() => setNotifications(v => !v)} />}
        />
        <Row
          icon={React.createElement(window.lucide.MapPin, { size: 16, color: theme.primary })}
          label="Location Context"
          right={<Toggle value={locationContext} onToggle={() => setLocationContext(v => !v)} />}
        />
        <Row
          icon={React.createElement(window.lucide.Mic, { size: 16, color: theme.primary })}
          label="Voice Lines"
          right={<Toggle value={voiceLines} onToggle={() => setVoiceLines(v => !v)} />}
          last
        />
      </Section>

      <Section title="Account">
        <Row icon={React.createElement(window.lucide.Shield, { size: 16, color: theme.primary })} label="Privacy Settings" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })} />
        <Row icon={React.createElement(window.lucide.HelpCircle, { size: 16, color: theme.primary })} label="Help & Feedback" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })} />
        <Row icon={React.createElement(window.lucide.LogOut, { size: 16, color: theme.danger })} label="Sign Out" right={null} last />
      </Section>

      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        <div style={{ fontSize: 11, color: theme.textMuted, fontFamily }}>SceneSwap v1.0.0 · Turn moments into playable stories.</div>
      </div>
    </div>
  );
}
