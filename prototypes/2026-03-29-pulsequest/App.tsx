
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [activeQuest, setActiveQuest] = useState(null);
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintTime, setSprintTime] = useState(300);
  const [upvoted, setUpvoted] = useState({});
  const timerRef = useRef(null);

  const themes = {
    light: {
      bg: '#FAF7F4',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F0EB',
      primary: '#E8614D',
      primaryLight: '#F2A58E',
      primaryPale: '#FDE8E4',
      text: '#1A1209',
      textSecondary: '#6B5B4E',
      textMuted: '#A89080',
      border: '#E8DDD5',
      navBg: '#FFFFFF',
      cardShadow: 'rgba(232,97,77,0.12)',
    },
    dark: {
      bg: '#1C1410',
      surface: '#2A1E18',
      surfaceAlt: '#332620',
      primary: '#E8614D',
      primaryLight: '#F2A58E',
      primaryPale: '#3D1F19',
      text: '#FAF0E8',
      textSecondary: '#C4A898',
      textMuted: '#7A5F55',
      border: '#3D2E26',
      navBg: '#231A14',
      cardShadow: 'rgba(0,0,0,0.4)',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    if (sprintActive && sprintTime > 0) {
      timerRef.current = setInterval(() => setSprintTime(s => s - 1), 1000);
    } else {
      clearInterval(timerRef.current);
      if (sprintTime === 0) setSprintActive(false);
    }
    return () => clearInterval(timerRef.current);
  }, [sprintActive, sprintTime]);

  const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0; }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity:0; } to { transform: translateY(0); opacity:1; } }
    @keyframes tilt1 { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(-1deg); } }
    @keyframes tilt2 { 0%,100% { transform: rotate(2deg); } 50% { transform: rotate(1deg); } }
  `;

  const quests = [
    { id: 1, theme: 'Mindful Moments', week: 'Week 12', color: '#E8614D', members: 4, progress: 67, tagline: 'Five breaths, five minutes.', tasks: ['Morning stretch clip', 'Gratitude note', 'Desk tidy sprint', 'Quiet moment capture'] },
    { id: 2, theme: 'DIY Mini Projects', week: 'Week 12', color: '#D4A853', members: 6, progress: 42, tagline: 'Build something tiny, share it.', tasks: ['Origami fold', 'Desk organizer hack', 'Plant repot sprint', 'Sketch a logo'] },
    { id: 3, theme: 'Digital Detox Burst', week: 'Week 12', color: '#5E8B72', members: 3, progress: 88, tagline: 'Analog wins this week.', tasks: ['Handwritten note', 'Book page sprint', 'Paper sketch session', 'No-phone meal'] },
  ];

  const discoveries = [
    { id: 1, title: 'Inbox Zero Dash', emoji: '⚡', badge: 'Trending', desc: 'Your squad\'s email habits suggest a 3-min inbox blitz. 4 teams did it today.', difficulty: 'Easy', time: '3 min' },
    { id: 2, title: 'The Power Sketch', emoji: '✏️', badge: 'New for You', desc: 'Based on your creative sprints, try a 5-min blind contour drawing session.', difficulty: 'Medium', time: '5 min' },
    { id: 3, title: 'Silence Protocol', emoji: '🔇', badge: 'Cohort Pick', desc: 'Your cohort collectively chose silence sprints 67% more this month.', difficulty: 'Hard', time: '5 min' },
    { id: 4, title: 'Rally Reset', emoji: '🎯', badge: 'Weekly', desc: 'Global trend: end-of-day 5-min priority sort. 12k squads joined yesterday.', difficulty: 'Easy', time: '5 min' },
  ];

  const squadMembers = [
    { name: 'Alex K.', avatar: '🦊', role: 'Spark Lead', clips: 14, streak: 7, status: 'in-sprint' },
    { name: 'Priya M.', avatar: '🐝', role: 'Chronicler', clips: 22, streak: 14, status: 'idle' },
    { name: 'Dex L.', avatar: '🦋', role: 'Wildcard', clips: 8, streak: 3, status: 'done' },
    { name: 'Sam R.', avatar: '🐺', role: 'Anchor', clips: 18, streak: 10, status: 'idle' },
    { name: 'Yuki T.', avatar: '🦅', role: 'Scout', clips: 31, streak: 21, status: 'in-sprint' },
  ];

  const clips = [
    { id: 1, user: 'Priya M.', avatar: '🐝', task: 'Gratitude note', duration: '4:52', likes: 12, time: '2m ago', quest: 'Mindful Moments' },
    { id: 2, user: 'Yuki T.', avatar: '🦅', task: 'Origami fold', duration: '5:00', likes: 28, time: '8m ago', quest: 'DIY Mini Projects' },
    { id: 3, user: 'Alex K.', avatar: '🦊', task: 'Morning stretch', duration: '4:38', duration2: '4:38', likes: 9, time: '15m ago', quest: 'Mindful Moments' },
    { id: 4, user: 'Sam R.', avatar: '🐺', task: 'Inbox Zero Dash', duration: '3:01', likes: 17, time: '1h ago', quest: 'Discovery' },
  ];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Flame },
    { id: 'squad', label: 'Squad', icon: window.lucide.Users },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'feed', label: 'Feed', icon: window.lucide.Play },
    { id: 'settings', label: 'You', icon: window.lucide.User },
  ];

  // ---- SCREENS ----

  function HomeScreen() {
    const [activeQuestId, setActiveQuestId] = useState(null);
    const questRef = quests[0];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 }
    },
      // Header
      React.createElement('div', {
        style: { padding: '20px 24px 16px', background: t.bg }
      },
        React.createElement('p', {
          style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.primary, fontWeight: 600, marginBottom: 4 }
        }, 'Week 12 · Pulse Edition'),
        React.createElement('h1', {
          style: { fontFamily: 'Playfair Display', fontSize: 30, fontWeight: 900, color: t.text, lineHeight: 1.15, marginBottom: 6 }
        }, 'Your Quest\nAwakens.'),
        React.createElement('p', {
          style: { fontFamily: 'Inter', fontSize: 13, color: t.textSecondary, lineHeight: 1.5 }
        }, 'Sprint. Share. Unlock. Repeat.')
      ),

      // Sprint CTA card
      React.createElement('div', {
        style: { margin: '0 20px 24px', background: t.primary, borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden' }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }
        }),
        React.createElement('div', {
          style: { position: 'absolute', bottom: -30, left: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }
        }),
        React.createElement('p', {
          style: { fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }
        }, 'Active Quest'),
        React.createElement('h2', {
          style: { fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4, fontStyle: 'italic' }
        }, 'Mindful Moments'),
        React.createElement('p', {
          style: { fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 16 }
        }, 'Five breaths, five minutes.'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('button', {
            onClick: () => { setSprintActive(true); setSprintTime(300); },
            style: { background: '#fff', color: t.primary, border: 'none', borderRadius: 24, padding: '10px 20px', fontFamily: 'Inter', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
          },
            React.createElement(window.lucide.Zap, { size: 14 }),
            sprintActive ? formatTime(sprintTime) : 'Start Sprint'
          ),
          React.createElement('div', {
            style: { fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.85)' }
          }, '4 members ready')
        )
      ),

      // Overlapping Quest Cards (angled)
      React.createElement('div', {
        style: { padding: '0 24px', marginBottom: 28 }
      },
        React.createElement('p', {
          style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 16 }
        }, 'This Week\'s Quests'),
        React.createElement('div', {
          style: { position: 'relative', height: 200 }
        },
          // Card 3 (bottom)
          React.createElement('div', {
            style: { position: 'absolute', top: 30, left: 8, width: 260, background: '#5E8B72', borderRadius: 14, padding: '16px 18px', transform: 'rotate(3deg)', boxShadow: `4px 6px 18px rgba(0,0,0,0.15)` }
          },
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 4 } }, 'Digital Detox Burst'),
            React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 700, color: '#fff', fontStyle: 'italic' } }, '88%'),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.65)' } }, 'Squad progress')
          ),
          // Card 2 (middle)
          React.createElement('div', {
            style: { position: 'absolute', top: 16, left: 24, width: 260, background: '#D4A853', borderRadius: 14, padding: '16px 18px', transform: 'rotate(-1.5deg)', boxShadow: `4px 6px 18px rgba(0,0,0,0.15)` }
          },
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 4 } }, 'DIY Mini Projects'),
            React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 700, color: '#fff', fontStyle: 'italic' } }, '42%'),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.65)' } }, 'Squad progress')
          ),
          // Card 1 (top, coral)
          React.createElement('div', {
            style: { position: 'absolute', top: 0, left: 12, width: 272, background: t.surface, borderRadius: 14, padding: '16px 18px', transform: 'rotate(-0.5deg)', boxShadow: `6px 8px 24px ${t.cardShadow}`, border: `1.5px solid ${t.border}` }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', {},
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.12em', color: t.primary, textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 } }, 'Mindful Moments'),
                React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: t.text } }, 'Week 12')
              ),
              React.createElement('div', { style: { background: t.primaryPale, borderRadius: 20, padding: '4px 10px' } },
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: t.primary, fontWeight: 600 } }, '67%')
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textSecondary, background: t.surfaceAlt, borderRadius: 12, padding: '3px 8px' } }, '4 members'),
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textSecondary, background: t.surfaceAlt, borderRadius: 12, padding: '3px 8px' } }, '2 clips today')
            )
          )
        )
      ),

      // Daily prompt
      React.createElement('div', {
        style: { margin: '0 20px 20px', background: t.surfaceAlt, borderRadius: 14, padding: 18, borderLeft: `3px solid ${t.primary}` }
      },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.primary, marginBottom: 8, fontWeight: 600 } }, 'Today\'s Prompt'),
        React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 17, color: t.text, fontStyle: 'italic', lineHeight: 1.45, marginBottom: 10 } }, '"Capture the one thing you\'ve been avoiding. Make it a 5-minute burst."'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            style: { flex: 1, background: t.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 0', fontFamily: 'Inter', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
          }, React.createElement(window.lucide.Camera, { size: 13 }), 'Record Clip'),
          React.createElement('button', {
            style: { background: t.surface, color: t.textSecondary, border: `1.5px solid ${t.border}`, borderRadius: 10, padding: '10px 16px', fontFamily: 'Inter', fontSize: 12, cursor: 'pointer' }
          }, 'Skip')
        )
      ),

      // Badges teaser
      React.createElement('div', { style: { padding: '0 24px' } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 12 } }, 'Unlocked Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [{ emoji: '🔥', name: '7-Day Streak' }, { emoji: '⚡', name: 'Sprint King' }, { emoji: '🎯', name: 'On Target' }, { emoji: '🌿', name: 'Mindful' }].map((b, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: t.surface, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: `0 2px 8px ${t.cardShadow}` } }, b.emoji),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, color: t.textMuted, textAlign: 'center', width: 48 } }, b.name)
            )
          )
        )
      )
    );
  }

  function SquadScreen() {
    const [selectedMember, setSelectedMember] = useState(null);

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 }
    },
      React.createElement('div', { style: { padding: '20px 24px 12px' } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.primary, marginBottom: 4, fontWeight: 600 } }, 'Cohort Alpha · 5 Members'),
        React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: 28, fontWeight: 900, color: t.text, lineHeight: 1.2 } }, 'Your\nMicro-Crew.')
      ),

      // Squad stats bar
      React.createElement('div', {
        style: { margin: '8px 20px 20px', background: t.surface, borderRadius: 14, padding: '16px 20px', display: 'flex', justifyContent: 'space-around', boxShadow: `0 3px 12px ${t.cardShadow}`, border: `1px solid ${t.border}` }
      },
        [{ v: '47', l: 'Total Clips' }, { v: '3', l: 'Active Now' }, { v: '68%', l: 'Quest Done' }].map((s, i) =>
          React.createElement('div', { key: i, style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: t.primary } }, s.v),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: t.textMuted, letterSpacing: '0.08em' } }, s.l)
          )
        )
      ),

      // Members
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 12 } }, 'Members'),
        squadMembers.map((m, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setSelectedMember(selectedMember === i ? null : i),
            style: { background: selectedMember === i ? t.primaryPale : t.surface, borderRadius: 14, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, border: `1.5px solid ${selectedMember === i ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.2s' }
          },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, m.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 } },
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: t.text } }, m.name),
                React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 9, padding: '2px 7px', borderRadius: 8, background: m.status === 'in-sprint' ? '#FDE8E4' : t.surfaceAlt, color: m.status === 'in-sprint' ? t.primary : t.textMuted, fontWeight: 600, letterSpacing: '0.06em' } }, m.status === 'in-sprint' ? '⚡ SPRINTING' : m.status === 'done' ? '✓ done' : 'idle')
              ),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textSecondary } }, m.role)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: t.text } }, m.clips),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, color: t.textMuted } }, 'clips'),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: t.primary, marginTop: 2 } }, `🔥 ${m.streak}`)
            )
          )
        )
      ),

      // Overlapping narrative cards (angled) — cohort story
      React.createElement('div', { style: { padding: '0 24px' } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 16 } }, 'Cohort Story'),
        React.createElement('div', { style: { position: 'relative', height: 160 } },
          React.createElement('div', {
            style: { position: 'absolute', top: 20, left: 20, width: 250, background: t.surfaceAlt, borderRadius: 14, padding: 16, transform: 'rotate(2.5deg)', boxShadow: `4px 5px 16px rgba(0,0,0,0.1)`, border: `1px solid ${t.border}` }
          },
            React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 13, fontStyle: 'italic', color: t.textSecondary } }, '"Week 10 was our turning point — Yuki\'s sketch unlocked the Explorer badge."')
          ),
          React.createElement('div', {
            style: { position: 'absolute', top: 8, left: 8, width: 258, background: t.surface, borderRadius: 14, padding: 16, transform: 'rotate(-1.5deg)', boxShadow: `6px 8px 20px ${t.cardShadow}`, border: `1.5px solid ${t.border}` }
          },
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.primary, marginBottom: 6, fontWeight: 600 } }, 'Chapter 12 · This Week'),
            React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 14, color: t.text, fontStyle: 'italic', lineHeight: 1.45 } }, '"Alpha Cohort finds stillness in motion — three consecutive Mindful quests completed."')
          )
        )
      )
    );
  }

  function DiscoverScreen() {
    const [pressedId, setPressedId] = useState(null);

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 }
    },
      React.createElement('div', { style: { padding: '20px 24px 12px' } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.primary, marginBottom: 4, fontWeight: 600 } }, 'Powered by your habits'),
        React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: 28, fontWeight: 900, color: t.text, lineHeight: 1.2, marginBottom: 4 } }, 'Discover\nthe Unexpected.'),
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 13, color: t.textSecondary } }, 'Challenges curated just for your crew.')
      ),

      // Trend banner
      React.createElement('div', {
        style: { margin: '8px 20px 20px', background: `linear-gradient(135deg, ${t.primary} 0%, #D4505E 100%)`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
      },
        React.createElement('div', {},
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 } }, 'Global Pulse'),
          React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: '#fff', fontStyle: 'italic' } }, '48k sprints today'),
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.75)' } }, 'across 3,200 cohorts')
        ),
        React.createElement('div', { style: { fontSize: 36 } }, '🌍')
      ),

      // Discovery cards
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 14 } }, 'For Your Squad'),
        discoveries.map((d, i) =>
          React.createElement('div', {
            key: d.id,
            onMouseDown: () => setPressedId(d.id),
            onMouseUp: () => setPressedId(null),
            style: { background: t.surface, borderRadius: 16, padding: '18px 16px', marginBottom: 12, border: `1.5px solid ${t.border}`, boxShadow: pressedId === d.id ? 'none' : `0 3px 14px ${t.cardShadow}`, transform: pressedId === d.id ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s', cursor: 'pointer' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 13, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 } }, d.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                  React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: t.text } }, d.title),
                  React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 9, padding: '2px 8px', borderRadius: 8, background: t.primaryPale, color: t.primary, fontWeight: 600, letterSpacing: '0.06em' } }, d.badge)
                ),
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, color: t.textSecondary, lineHeight: 1.5, marginBottom: 10 } }, d.desc),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 10, padding: '3px 10px', borderRadius: 10, background: t.surfaceAlt, color: t.textSecondary } }, `⏱ ${d.time}`),
                  React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 10, padding: '3px 10px', borderRadius: 10, background: t.surfaceAlt, color: t.textSecondary } }, d.difficulty),
                  React.createElement('button', {
                    style: { marginLeft: 'auto', background: t.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '6px 14px', fontFamily: 'Inter', fontSize: 11, fontWeight: 600, cursor: 'pointer' }
                  }, 'Accept')
                )
              )
            )
          )
        )
      )
    );
  }

  function FeedScreen() {
    const toggleUpvote = (id) => setUpvoted(u => ({ ...u, [id]: !u[id] }));

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 }
    },
      React.createElement('div', { style: { padding: '20px 24px 12px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' } },
        React.createElement('div', {},
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.primary, marginBottom: 4, fontWeight: 600 } }, 'Live from the squad'),
          React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: 28, fontWeight: 900, color: t.text, lineHeight: 1.2 } }, 'Clip\nFeed.')
        ),
        React.createElement('button', {
          style: { background: t.primary, color: '#fff', border: 'none', borderRadius: 12, padding: '10px 16px', fontFamily: 'Inter', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
        }, React.createElement(window.lucide.Plus, { size: 14 }), 'Add Clip')
      ),

      // Filter tabs
      React.createElement('div', {
        style: { padding: '8px 20px 16px', display: 'flex', gap: 8 }
      },
        ['All', 'Mindful', 'DIY', 'Discovery'].map((f, i) =>
          React.createElement('button', {
            key: i,
            style: { fontFamily: 'Inter', fontSize: 11, fontWeight: i === 0 ? 700 : 500, padding: '5px 14px', borderRadius: 20, border: `1.5px solid ${i === 0 ? t.primary : t.border}`, background: i === 0 ? t.primary : 'transparent', color: i === 0 ? '#fff' : t.textSecondary, cursor: 'pointer' }
          }, f)
        )
      ),

      // Clips
      React.createElement('div', { style: { padding: '0 20px' } },
        clips.map((c, i) =>
          React.createElement('div', {
            key: c.id,
            style: { background: t.surface, borderRadius: 16, marginBottom: 14, overflow: 'hidden', border: `1.5px solid ${t.border}`, boxShadow: `0 3px 14px ${t.cardShadow}` }
          },
            // Video placeholder
            React.createElement('div', {
              style: { height: 160, background: `linear-gradient(135deg, ${i%2===0 ? '#2C1A14' : '#1A2C1F'} 0%, ${i%2===0 ? '#E8614D22' : '#5E8B7222'} 100%)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }
            },
              React.createElement('div', { style: { width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' } },
                React.createElement(window.lucide.Play, { size: 22, color: '#fff', fill: '#fff' })
              ),
              React.createElement('div', { style: { position: 'absolute', bottom: 10, right: 12, background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '3px 8px' } },
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: '#fff', fontWeight: 600 } }, c.duration)
              ),
              React.createElement('div', { style: { position: 'absolute', top: 10, left: 12, background: t.primaryPale, borderRadius: 10, padding: '3px 8px' } },
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, color: t.primary, fontWeight: 600, letterSpacing: '0.08em' } }, c.quest.toUpperCase())
              )
            ),
            // Clip meta
            React.createElement('div', { style: { padding: '14px 16px' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
                React.createElement('div', { style: { width: 32, height: 32, borderRadius: 9, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 } }, c.avatar),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: t.text } }, c.user),
                  React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: t.textMuted } }, c.time)
                )
              ),
              React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 15, color: t.text, fontStyle: 'italic', marginBottom: 12 } }, `"${c.task}"`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
                React.createElement('button', {
                  onClick: () => toggleUpvote(c.id),
                  style: { display: 'flex', alignItems: 'center', gap: 6, background: upvoted[c.id] ? t.primaryPale : 'transparent', border: `1.5px solid ${upvoted[c.id] ? t.primary : t.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', transition: 'all 0.2s' }
                },
                  React.createElement(window.lucide.Heart, { size: 14, color: upvoted[c.id] ? t.primary : t.textMuted, fill: upvoted[c.id] ? t.primary : 'none' }),
                  React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 12, color: upvoted[c.id] ? t.primary : t.textMuted, fontWeight: 600 } }, c.likes + (upvoted[c.id] ? 1 : 0))
                ),
                React.createElement('button', {
                  style: { display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: `1.5px solid ${t.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer' }
                },
                  React.createElement(window.lucide.MessageCircle, { size: 14, color: t.textMuted }),
                  React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 12, color: t.textMuted } }, 'Reply')
                ),
                React.createElement('button', {
                  style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', cursor: 'pointer' }
                },
                  React.createElement(window.lucide.Share2, { size: 16, color: t.textMuted })
                )
              )
            )
          )
        )
      )
    );
  }

  function SettingsScreen() {
    const [notifs, setNotifs] = useState(true);
    const [sounds, setSounds] = useState(false);
    const [publicProfile, setPublicProfile] = useState(true);

    const Toggle = ({ val, onToggle }) => React.createElement('div', {
      onClick: onToggle,
      style: { width: 44, height: 24, borderRadius: 12, background: val ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }
    },
      React.createElement('div', { style: { width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: val ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' } })
    );

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 }
    },
      // Profile hero
      React.createElement('div', {
        style: { padding: '28px 24px 20px', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 } },
          React.createElement('div', {
            style: { width: 64, height: 64, borderRadius: 18, background: t.primaryPale, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, border: `2px solid ${t.primary}` }
          }, '🦊'),
          React.createElement('div', {},
            React.createElement('h2', { style: { fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: t.text } }, 'Jordan Lee'),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, color: t.textSecondary, marginTop: 2 } }, 'Spark Lead · Alpha Cohort'),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 6 } },
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 10, padding: '2px 8px', borderRadius: 8, background: t.primaryPale, color: t.primary, fontWeight: 600 } }, '🔥 7 days'),
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 10, padding: '2px 8px', borderRadius: 8, background: t.surfaceAlt, color: t.textSecondary } }, '47 clips total')
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 0, background: t.surfaceAlt, borderRadius: 12, padding: 3 } },
          ['Stats', 'Badges', 'History'].map((tab, i) =>
            React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 10, background: i === 0 ? t.surface : 'transparent', boxShadow: i === 0 ? `0 1px 4px rgba(0,0,0,0.08)` : 'none', cursor: 'pointer' } },
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? t.text : t.textMuted } }, tab)
            )
          )
        )
      ),

      // Stats row
      React.createElement('div', {
        style: { padding: '16px 20px', display: 'flex', gap: 10, marginBottom: 8 }
      },
        [{ v: '47', l: 'Clips' }, { v: '7', l: 'Streak' }, { v: '312', l: 'Hearts' }, { v: '3', l: 'Badges' }].map((s, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.surface, borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: t.primary } }, s.v),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, color: t.textMuted, marginTop: 2 } }, s.l)
          )
        )
      ),

      // Settings
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 12 } }, 'Preferences'),
        [
          { label: 'Dark Mode', val: isDark, toggle: () => setIsDark(d => !d), icon: window.lucide.Moon },
          { label: 'Notifications', val: notifs, toggle: () => setNotifs(n => !n), icon: window.lucide.Bell },
          { label: 'Sprint Sounds', val: sounds, toggle: () => setSounds(s => !s), icon: window.lucide.Volume2 },
          { label: 'Public Profile', val: publicProfile, toggle: () => setPublicProfile(p => !p), icon: window.lucide.Globe },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: t.surface, borderRadius: 12, marginBottom: 8, border: `1px solid ${t.border}` } },
            React.createElement(item.icon, { size: 18, color: t.primary }),
            React.createElement('p', { style: { flex: 1, fontFamily: 'Inter', fontSize: 14, color: t.text } }, item.label),
            React.createElement(Toggle, { val: item.val, onToggle: item.toggle })
          )
        ),

        React.createElement('button', {
          style: { width: '100%', background: 'transparent', border: `1.5px solid ${t.border}`, borderRadius: 12, padding: 14, fontFamily: 'Inter', fontSize: 13, color: '#E8614D', cursor: 'pointer', marginTop: 8 }
        }, 'Sign Out')
      )
    );
  }

  const screens = {
    home: HomeScreen,
    squad: SquadScreen,
    discover: DiscoverScreen,
    feed: FeedScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
  },
    React.createElement('style', null, fontStyle),

    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.1)', position: 'relative', display: 'flex', flexDirection: 'column' }
    },
      // Status bar
      React.createElement('div', {
        style: { height: 44, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0, zIndex: 10 }
      },
        React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: t.text } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: { width: 120, height: 32, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
        },
          sprintActive && React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#E8614D', animation: 'pulse 1s infinite' } }),
          sprintActive && React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: '#fff' } }, formatTime(sprintTime))
        ),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: t.text })
        )
      ),

      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden' }
      },
        React.createElement(ActiveScreen)
      ),

      // Bottom nav
      React.createElement('div', {
        style: { height: 80, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', paddingBottom: 12, flexShrink: 0, boxShadow: `0 -4px 16px ${t.cardShadow}` }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', paddingTop: 10 }
          },
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: activeTab === tab.id ? t.primaryPale : 'transparent', transition: 'background 0.2s' }
            },
              React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted })
            ),
            React.createElement('span', {
              style: { fontFamily: 'Inter', fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? t.primary : t.textMuted, letterSpacing: '0.02em' }
            }, tab.label)
          )
        )
      )
    )
  );
}
