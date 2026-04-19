const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeRitual, setActiveRitual] = useState(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const themes = {
    light: {
      primary: '#7C3AED',
      secondary: '#A78BFA',
      cta: '#22C55E',
      bg: '#FAF5FF',
      card: '#FFFFFF',
      cardBorder: 'rgba(124,58,237,0.08)',
      text: '#1A1033',
      textSecondary: '#6B5B7B',
      textTertiary: '#9B8DAD',
      surface: '#F3EAFF',
      surfaceAlt: '#EDE5FF',
      navBg: 'rgba(255,255,255,0.92)',
      navBorder: 'rgba(124,58,237,0.1)',
      overlay: 'rgba(26,16,51,0.5)',
    },
    dark: {
      primary: '#A78BFA',
      secondary: '#7C3AED',
      cta: '#22C55E',
      bg: '#13091F',
      card: '#1E1230',
      cardBorder: 'rgba(167,139,250,0.12)',
      text: '#F3EAFF',
      textSecondary: '#B8A5D0',
      textTertiary: '#7B6A92',
      surface: '#241640',
      surfaceAlt: '#2D1C4E',
      navBg: 'rgba(19,9,31,0.95)',
      navBorder: 'rgba(167,139,250,0.15)',
      overlay: 'rgba(0,0,0,0.7)',
    },
  };

  const t = darkMode ? themes.dark : themes.light;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2200);
  };

  useEffect(() => {
    let interval;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      showToast('Ritual complete!');
      setJournalOpen(true);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const hearthRooms = [
    { id: 1, name: 'Dawn Deep Work', circle: 'Deep Work Scribes', participants: 12, maxP: 20, time: 'Live now', sound: 'Rain & Thunder', duration: '50 min', color: '#7C3AED' },
    { id: 2, name: 'Mindful Morning', circle: 'Morning Meditators', participants: 8, maxP: 15, time: 'Live now', sound: 'Singing Bowls', duration: '20 min', color: '#22C55E' },
    { id: 3, name: 'Creative Flow Hour', circle: 'Creative Spirits', participants: 5, maxP: 12, time: 'In 30 min', sound: 'Lo-fi Ambient', duration: '60 min', color: '#F59E0B' },
    { id: 4, name: 'Evening Wind Down', circle: 'Digital Detoxers', participants: 3, maxP: 10, time: '7:00 PM', sound: 'Ocean Waves', duration: '30 min', color: '#EC4899' },
  ];

  const circles = [
    { id: 1, name: 'Morning Meditators', members: 2340, icon: 'Sun', desc: 'Start each day with presence and clarity', color: '#F59E0B' },
    { id: 2, name: 'Deep Work Scribes', members: 1872, icon: 'PenTool', desc: 'Focused writing and intellectual work sessions', color: '#7C3AED' },
    { id: 3, name: 'Digital Detoxers', members: 956, icon: 'Wifi', desc: 'Intentional breaks from screen overload', color: '#EC4899' },
    { id: 4, name: 'Creative Spirits', members: 1543, icon: 'Palette', desc: 'Art, music, and creative expression rituals', color: '#22C55E' },
    { id: 5, name: 'Body Movers', members: 1120, icon: 'Dumbbell', desc: 'Movement, yoga, and physical practice', color: '#EF4444' },
    { id: 6, name: 'Night Owls', members: 789, icon: 'Moon', desc: 'Late night focus for those who thrive after dark', color: '#6366F1' },
  ];

  const soundscapes = [
    { name: 'Rain & Thunder', icon: 'CloudRain' },
    { name: 'Singing Bowls', icon: 'Bell' },
    { name: 'Forest Dawn', icon: 'Trees' },
    { name: 'Ocean Waves', icon: 'Waves' },
    { name: 'Lo-fi Ambient', icon: 'Music' },
    { name: 'Crackling Fire', icon: 'Flame' },
  ];

  const ritualPath = [
    { level: 1, name: 'Ember', xp: 100, unlocked: true },
    { level: 2, name: 'Spark', xp: 250, unlocked: true },
    { level: 3, name: 'Flame', xp: 500, unlocked: true },
    { level: 4, name: 'Blaze', xp: 800, unlocked: false },
    { level: 5, name: 'Inferno', xp: 1200, unlocked: false },
  ];

  const LucideIcon = ({ name, size = 20, color, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color: color || t.text, style, strokeWidth: 1.8 });
  };

  // --- SCREENS ---

  function HomeScreen() {
    const streak = 14;
    const totalRituals = 87;
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontWeight: 500, letterSpacing: 0.2 } }, 'Welcome back'),
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, lineHeight: 1.15 } }, 'Your Hearth'),
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(LucideIcon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Streak Card
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary}, ${darkMode ? '#5B21B6' : '#9333EA'})`,
        borderRadius: 20, padding: '20px 22px', marginBottom: 20, position: 'relative', overflow: 'hidden',
      } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, right: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginBottom: 4 } }, 'Current Streak'),
            React.createElement('div', { style: { fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: -1, lineHeight: 1 } }, `${streak} days`),
            React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 } }, `${totalRituals} rituals completed`),
          ),
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(LucideIcon, { name: 'Flame', size: 28, color: '#FCD34D' })
          ),
        ),
      ),

      // Quick Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 } },
        [{ label: 'Focus Hours', value: '42h', icon: 'Clock' }, { label: 'Circles', value: '4', icon: 'Users' }, { label: 'Tokens', value: '12', icon: 'Gem' }].map((s) =>
          React.createElement('div', { key: s.label, style: { background: t.card, borderRadius: 16, padding: '14px 12px', textAlign: 'center', border: `1px solid ${t.cardBorder}`, boxShadow: '0 2px 8px rgba(124,58,237,0.04)' } },
            React.createElement(LucideIcon, { name: s.icon, size: 18, color: t.primary, style: { margin: '0 auto 6px' } }),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text } }, s.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textTertiary, fontWeight: 500, marginTop: 2 } }, s.label),
          )
        )
      ),

      // Live Hearth Rooms
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3 } }, 'Live Hearth Rooms'),
        React.createElement('button', { onClick: () => setActiveScreen('explore'), style: { background: 'none', border: 'none', color: t.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer', padding: '4px 0' } }, 'See all'),
      ),

      hearthRooms.filter((r) => r.time === 'Live now').map((room) =>
        React.createElement('button', {
          key: room.id,
          onClick: () => { setActiveRitual(room); setTimerSeconds(parseInt(room.duration) * 60); setActiveScreen('ritual'); },
          style: {
            width: '100%', background: t.card, borderRadius: 18, padding: '16px 18px', marginBottom: 12,
            border: `1px solid ${t.cardBorder}`, boxShadow: '0 2px 12px rgba(124,58,237,0.06)',
            cursor: 'pointer', textAlign: 'left', display: 'block', transition: 'transform 0.15s, box-shadow 0.15s',
          },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: t.cta, animation: 'pulse 2s infinite' } }),
                React.createElement('span', { style: { fontSize: 13, color: t.cta, fontWeight: 600 } }, 'Live now'),
              ),
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 4 } }, room.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary } }, room.circle),
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 } },
                React.createElement(LucideIcon, { name: 'Users', size: 14, color: t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontWeight: 500 } }, `${room.participants}/${room.maxP}`),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(LucideIcon, { name: 'Clock', size: 14, color: t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary } }, room.duration),
              ),
            ),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 } },
            React.createElement(LucideIcon, { name: 'Music', size: 14, color: t.primary }),
            React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 500 } }, room.sound),
          ),
        )
      ),

      // Upcoming
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, marginTop: 8, marginBottom: 14 } }, 'Upcoming'),
      hearthRooms.filter((r) => r.time !== 'Live now').map((room) =>
        React.createElement('div', {
          key: room.id,
          style: {
            background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
            border: `1px solid ${t.cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          },
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 2 } }, room.name),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary } }, `${room.circle} \u00B7 ${room.duration}`),
          ),
          React.createElement('div', { style: { background: t.surface, borderRadius: 10, padding: '6px 12px' } },
            React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.primary } }, room.time),
          ),
        )
      ),
    );
  }

  function ExploreScreen() {
    const [searchText, setSearchText] = useState('');
    const [tab, setTab] = useState('circles');
    const filteredCircles = circles.filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase()));
    const filteredRooms = hearthRooms.filter((r) => !selectedCircle || r.circle === selectedCircle);

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 18 } }, 'Explore'),

      // Search
      React.createElement('div', { style: {
        display: 'flex', alignItems: 'center', gap: 10, background: t.surface, borderRadius: 14, padding: '12px 16px', marginBottom: 18,
      } },
        React.createElement(LucideIcon, { name: 'Search', size: 18, color: t.textTertiary }),
        React.createElement('input', {
          value: searchText, onChange: (e) => setSearchText(e.target.value),
          placeholder: 'Search circles, rooms, soundscapes...',
          style: { flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 15, color: t.text, fontFamily: font },
        }),
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
        ['circles', 'rooms', 'soundscapes'].map((tb) =>
          React.createElement('button', {
            key: tb, onClick: () => setTab(tb),
            style: {
              padding: '8px 18px', borderRadius: 20, border: 'none', fontSize: 15, fontWeight: 600,
              background: tab === tb ? t.primary : t.surface,
              color: tab === tb ? '#fff' : t.textSecondary,
              cursor: 'pointer', transition: 'all 0.2s',
            },
          }, tb.charAt(0).toUpperCase() + tb.slice(1))
        )
      ),

      // Circles Tab
      tab === 'circles' && React.createElement('div', null,
        filteredCircles.map((circle) =>
          React.createElement('button', {
            key: circle.id,
            onClick: () => { setSelectedCircle(circle.name); setTab('rooms'); },
            style: {
              width: '100%', background: t.card, borderRadius: 18, padding: '16px 18px', marginBottom: 12,
              border: `1px solid ${t.cardBorder}`, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14,
              transition: 'transform 0.15s', boxShadow: '0 2px 8px rgba(124,58,237,0.04)',
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${circle.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(LucideIcon, { name: circle.icon, size: 24, color: circle.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 3 } }, circle.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginBottom: 4 } }, circle.desc),
              React.createElement('div', { style: { fontSize: 13, color: t.textTertiary, fontWeight: 500 } }, `${circle.members.toLocaleString()} members`),
            ),
            React.createElement(LucideIcon, { name: 'ChevronRight', size: 18, color: t.textTertiary }),
          )
        )
      ),

      // Rooms Tab
      tab === 'rooms' && React.createElement('div', null,
        selectedCircle && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
          React.createElement('button', {
            onClick: () => setSelectedCircle(null),
            style: { background: t.surface, border: 'none', borderRadius: 10, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 },
          },
            React.createElement(LucideIcon, { name: 'X', size: 14, color: t.primary }),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.primary } }, selectedCircle),
          ),
        ),
        filteredRooms.map((room) =>
          React.createElement('button', {
            key: room.id,
            onClick: () => { setActiveRitual(room); setTimerSeconds(parseInt(room.duration) * 60); setActiveScreen('ritual'); },
            style: {
              width: '100%', background: t.card, borderRadius: 18, padding: '16px 18px', marginBottom: 12,
              border: `1px solid ${t.cardBorder}`, cursor: 'pointer', textAlign: 'left', display: 'block',
              transition: 'transform 0.15s', boxShadow: '0 2px 8px rgba(124,58,237,0.04)',
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
              React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text } }, room.name),
              room.time === 'Live now'
                ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                    React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: t.cta, animation: 'pulse 2s infinite' } }),
                    React.createElement('span', { style: { fontSize: 13, color: t.cta, fontWeight: 600 } }, 'Live'),
                  )
                : React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontWeight: 500 } }, room.time),
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginBottom: 8 } }, `${room.circle} \u00B7 ${room.duration} \u00B7 ${room.sound}`),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(LucideIcon, { name: 'Users', size: 14, color: t.textTertiary }),
              React.createElement('span', { style: { fontSize: 13, color: t.textTertiary } }, `${room.participants} joined`),
              React.createElement('div', { style: { flex: 1 } }),
              React.createElement('div', { style: { background: t.primary, borderRadius: 10, padding: '6px 14px' } },
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#fff' } }, 'Join'),
              ),
            ),
          )
        ),
      ),

      // Soundscapes Tab
      tab === 'soundscapes' && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
        soundscapes.map((s) =>
          React.createElement('button', {
            key: s.name,
            onClick: () => showToast(`Playing ${s.name}`),
            style: {
              background: t.card, borderRadius: 18, padding: '22px 16px', border: `1px solid ${t.cardBorder}`,
              cursor: 'pointer', textAlign: 'center', transition: 'transform 0.15s, box-shadow 0.2s',
              boxShadow: '0 2px 8px rgba(124,58,237,0.04)',
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.96)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' } },
              React.createElement(LucideIcon, { name: s.icon, size: 22, color: t.primary })
            ),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text } }, s.name),
          )
        )
      ),
    );
  }

  function RitualScreen() {
    const room = activeRitual || hearthRooms[0];
    const [soundOn, setSoundOn] = useState(true);
    const [videoOn, setVideoOn] = useState(false);
    const progress = 1 - timerSeconds / (parseInt(room.duration) * 60);

    const participants = ['Aria', 'Kael', 'Lumi', 'Sage', 'Wren', 'Nyx', 'Finn', 'Opal'];

    return React.createElement('div', { style: { padding: '0', animation: 'fadeIn 0.4s ease', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' } },

      // Top bar
      React.createElement('div', { style: { padding: '16px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('button', {
          onClick: () => { setActiveScreen('home'); setTimerRunning(false); setTimerSeconds(25 * 60); },
          style: { width: 44, height: 44, borderRadius: 14, background: t.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
        }, React.createElement(LucideIcon, { name: 'ChevronLeft', size: 20, color: t.text })),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.textSecondary } }, room.circle),
        ),
        React.createElement('button', {
          onClick: () => setSoundOn(!soundOn),
          style: { width: 44, height: 44, borderRadius: 14, background: t.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
        }, React.createElement(LucideIcon, { name: soundOn ? 'Volume2' : 'VolumeX', size: 20, color: t.text })),
      ),

      // Timer
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px' } },
        React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 8 } }, room.name),

        // Circular timer
        React.createElement('div', { style: { position: 'relative', width: 220, height: 220, marginBottom: 20 } },
          React.createElement('svg', { width: 220, height: 220, viewBox: '0 0 220 220', style: { transform: 'rotate(-90deg)' } },
            React.createElement('circle', { cx: 110, cy: 110, r: 100, fill: 'none', stroke: t.surface, strokeWidth: 8 }),
            React.createElement('circle', {
              cx: 110, cy: 110, r: 100, fill: 'none', stroke: t.primary, strokeWidth: 8,
              strokeDasharray: `${2 * Math.PI * 100}`, strokeDashoffset: `${2 * Math.PI * 100 * (1 - progress)}`,
              strokeLinecap: 'round', style: { transition: 'stroke-dashoffset 1s linear' },
            }),
          ),
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
            React.createElement('div', { style: { fontSize: 48, fontWeight: 800, color: t.text, letterSpacing: -2, fontVariantNumeric: 'tabular-nums' } }, formatTime(timerSeconds)),
            React.createElement('div', { style: { fontSize: 13, color: t.textTertiary, marginTop: 4 } }, timerRunning ? 'Focus time' : 'Ready'),
          ),
        ),

        // Controls
        React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 } },
          React.createElement('button', {
            onClick: () => { setTimerSeconds(parseInt(room.duration) * 60); setTimerRunning(false); },
            style: { width: 48, height: 48, borderRadius: 24, background: t.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
          }, React.createElement(LucideIcon, { name: 'RotateCcw', size: 20, color: t.textSecondary })),
          React.createElement('button', {
            onClick: () => setTimerRunning(!timerRunning),
            style: {
              width: 72, height: 72, borderRadius: 36, background: timerRunning ? t.secondary : t.cta,
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: `0 4px 20px ${timerRunning ? t.secondary : t.cta}40`, transition: 'all 0.2s',
            },
          }, React.createElement(LucideIcon, { name: timerRunning ? 'Pause' : 'Play', size: 28, color: '#fff' })),
          React.createElement('button', {
            onClick: () => setVideoOn(!videoOn),
            style: { width: 48, height: 48, borderRadius: 24, background: videoOn ? `${t.primary}20` : t.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
          }, React.createElement(LucideIcon, { name: videoOn ? 'Video' : 'VideoOff', size: 20, color: videoOn ? t.primary : t.textSecondary })),
        ),

        // Soundscape
        soundOn && React.createElement('div', { style: {
          display: 'flex', alignItems: 'center', gap: 8, background: t.surface, borderRadius: 12, padding: '10px 16px', marginBottom: 16,
        } },
          React.createElement(LucideIcon, { name: 'Music', size: 16, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: t.textSecondary } }, room.sound),
          React.createElement('div', { style: { width: 60, height: 4, borderRadius: 2, background: `${t.primary}30`, overflow: 'hidden', marginLeft: 8 } },
            React.createElement('div', { style: { width: '60%', height: '100%', borderRadius: 2, background: t.primary, animation: 'shimmer 2s infinite' } }),
          ),
        ),
      ),

      // Participants
      React.createElement('div', { style: { padding: '0 16px 100px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.textSecondary, marginBottom: 12 } }, `${participants.length} focusing together`),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          participants.map((p) =>
            React.createElement('div', { key: p, style: {
              display: 'flex', alignItems: 'center', gap: 6, background: t.surface, borderRadius: 20, padding: '6px 12px 6px 6px',
            } },
              React.createElement('div', { style: {
                width: 28, height: 28, borderRadius: 14,
                background: `hsl(${p.charCodeAt(0) * 7 % 360}, 60%, ${darkMode ? '35%' : '75%'})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: darkMode ? '#fff' : '#fff',
              } }, p[0]),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: t.textSecondary } }, p),
            )
          )
        ),
      ),

      // Journal modal
      journalOpen && React.createElement('div', { style: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: t.overlay,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50, animation: 'fadeIn 0.3s ease',
      } },
        React.createElement('div', { style: {
          background: t.card, borderRadius: '24px 24px 0 0', padding: '24px 20px 40px', width: '100%',
          animation: 'slideUp 0.4s ease',
        } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text } }, 'Moment of Clarity'),
            React.createElement('button', {
              onClick: () => { setJournalOpen(false); setJournalText(''); },
              style: { width: 36, height: 36, borderRadius: 18, background: t.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
            }, React.createElement(LucideIcon, { name: 'X', size: 18, color: t.textSecondary })),
          ),
          React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, marginBottom: 16 } }, 'What insight or feeling arose during this ritual? Take a moment to reflect.'),
          React.createElement('textarea', {
            value: journalText, onChange: (e) => setJournalText(e.target.value),
            placeholder: 'Write your reflection here...',
            style: {
              width: '100%', height: 120, background: t.surface, border: `1px solid ${t.cardBorder}`, borderRadius: 14,
              padding: 14, fontSize: 15, color: t.text, fontFamily: font, resize: 'none', outline: 'none', boxSizing: 'border-box',
            },
          }),
          React.createElement('button', {
            onClick: () => { setJournalOpen(false); showToast('Reflection saved'); setJournalText(''); },
            style: {
              width: '100%', padding: '14px', borderRadius: 14, border: 'none', background: t.primary, color: '#fff',
              fontSize: 17, fontWeight: 600, cursor: 'pointer', marginTop: 14, fontFamily: font,
            },
          }, 'Save Reflection'),
        ),
      ),
    );
  }

  function ProfileScreen() {
    const currentXP = 620;
    const currentLevel = ritualPath.find((l) => !l.unlocked) || ritualPath[ritualPath.length - 1];
    const prevLevel = ritualPath[ritualPath.indexOf(currentLevel) - 1] || ritualPath[0];
    const xpProgress = (currentXP - prevLevel.xp) / (currentLevel.xp - prevLevel.xp);

    const tokens = [
      { name: 'First Flame', desc: 'Complete your first ritual', icon: 'Flame', earned: true },
      { name: '7-Day Streak', desc: 'Maintain 7 consecutive days', icon: 'Zap', earned: true },
      { name: 'Circle Joiner', desc: 'Join 3 Identity Circles', icon: 'Users', earned: true },
      { name: 'Deep Diver', desc: '10 hours of deep work', icon: 'Brain', earned: false },
      { name: 'Soundscaper', desc: 'Try all soundscapes', icon: 'Music', earned: false },
    ];

    const journalEntries = [
      { date: 'Today', text: 'Found deep calm during the morning meditation. The singing bowls helped me stay present.' },
      { date: 'Yesterday', text: 'The creative session unlocked a new perspective on my project. Grateful for the co-presence.' },
      { date: 'Apr 17', text: 'Struggled to focus today but staying in the room helped me push through the resistance.' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 } }, 'Profile'),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
        }, React.createElement(LucideIcon, { name: 'Settings', size: 20, color: t.textSecondary })),
      ),

      // Avatar & name
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 } },
        React.createElement('div', { style: {
          width: 68, height: 68, borderRadius: 22, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        } },
          React.createElement(LucideIcon, { name: 'User', size: 30, color: '#fff' })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 2 } }, 'Alex Rivera'),
          React.createElement('div', { style: { fontSize: 15, color: t.textSecondary } }, 'Joined March 2026'),
          React.createElement('div', { style: { fontSize: 13, color: t.primary, fontWeight: 600, marginTop: 2 } }, `Level ${prevLevel.level}: ${prevLevel.name}`),
        ),
      ),

      // Ritual Path
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, marginBottom: 14 } }, 'Ritual Path'),
      React.createElement('div', { style: {
        background: t.card, borderRadius: 18, padding: '18px', marginBottom: 20,
        border: `1px solid ${t.cardBorder}`, boxShadow: '0 2px 12px rgba(124,58,237,0.06)',
      } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 } },
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text } }, `${currentXP} XP`),
          React.createElement('span', { style: { fontSize: 13, color: t.textTertiary } }, `${currentLevel.xp} XP to ${currentLevel.name}`),
        ),
        React.createElement('div', { style: { height: 10, borderRadius: 5, background: t.surface, overflow: 'hidden', marginBottom: 16 } },
          React.createElement('div', { style: { width: `${xpProgress * 100}%`, height: '100%', borderRadius: 5, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, transition: 'width 0.5s' } }),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          ritualPath.map((l) =>
            React.createElement('div', { key: l.level, style: { textAlign: 'center' } },
              React.createElement('div', { style: {
                width: 36, height: 36, borderRadius: 12,
                background: l.unlocked ? `${t.primary}20` : t.surface,
                border: l.unlocked ? `2px solid ${t.primary}` : `2px solid ${t.cardBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',
              } },
                React.createElement(LucideIcon, { name: l.unlocked ? 'Check' : 'Lock', size: 16, color: l.unlocked ? t.primary : t.textTertiary })
              ),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: l.unlocked ? t.text : t.textTertiary } }, l.name),
            )
          )
        ),
      ),

      // Crystallized Intentions
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, marginBottom: 14 } }, 'Crystallized Intentions'),
      React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, marginBottom: 20 } },
        tokens.map((tk) =>
          React.createElement('div', { key: tk.name, style: {
            minWidth: 130, background: t.card, borderRadius: 16, padding: '16px 14px', textAlign: 'center',
            border: `1px solid ${tk.earned ? t.primary + '30' : t.cardBorder}`, opacity: tk.earned ? 1 : 0.5,
            boxShadow: tk.earned ? `0 2px 12px ${t.primary}15` : 'none',
          } },
            React.createElement('div', { style: {
              width: 44, height: 44, borderRadius: 14,
              background: tk.earned ? `${t.primary}18` : t.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
            } },
              React.createElement(LucideIcon, { name: tk.icon, size: 22, color: tk.earned ? t.primary : t.textTertiary })
            ),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, tk.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textTertiary } }, tk.desc),
          )
        )
      ),

      // Journal
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, marginBottom: 14 } }, 'Clarity Journal'),
      journalEntries.map((entry) =>
        React.createElement('div', { key: entry.date, style: {
          background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
          border: `1px solid ${t.cardBorder}`, borderLeft: `3px solid ${t.primary}`,
        } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.primary, marginBottom: 4 } }, entry.date),
          React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, lineHeight: 1.5 } }, entry.text),
        )
      ),
    );
  }

  // --- NAV & LAYOUT ---

  const screens = { home: HomeScreen, explore: ExploreScreen, ritual: RitualScreen, profile: ProfileScreen };
  const navItems = [
    { id: 'home', label: 'Hearth', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'ritual', label: 'Ritual', icon: 'Timer' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' } },
    // Style tag
    React.createElement('style', null, `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
      input::placeholder, textarea::placeholder { color: ${t.textTertiary}; }
    `),

    // Phone frame
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 44, background: t.bg, position: 'relative', overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
    } },
      // Content
      React.createElement('div', { style: { height: '100%', overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(screens[activeScreen]),
      ),

      // Bottom nav
      React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.navBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.navBorder}`, padding: '8px 0 28px',
        display: 'flex', justifyContent: 'space-around',
      } },
        navItems.map((item) =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              minWidth: 60, minHeight: 44, transition: 'all 0.2s',
            },
          },
            React.createElement(LucideIcon, { name: item.icon, size: 22, color: activeScreen === item.id ? t.primary : t.textTertiary }),
            React.createElement('span', { style: { fontSize: 11, fontWeight: activeScreen === item.id ? 700 : 500, color: activeScreen === item.id ? t.primary : t.textTertiary } }, item.label),
          )
        )
      ),

      // Toast
      toastMsg && React.createElement('div', { style: {
        position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
        background: t.text, color: t.bg, padding: '10px 20px', borderRadius: 12,
        fontSize: 15, fontWeight: 600, zIndex: 100, animation: 'fadeIn 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      } }, toastMsg),
    ),
  );
}
