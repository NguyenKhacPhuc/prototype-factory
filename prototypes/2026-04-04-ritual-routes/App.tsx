const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1a1410',
    surface: '#241c14',
    card: '#2e2218',
    cardAlt: '#332818',
    border: '#4a3828',
    primary: '#c4674a',
    primaryLight: '#d4826a',
    secondary: '#5a7a54',
    secondaryLight: '#7a9e73',
    text: '#e8ddd0',
    textMuted: '#a89880',
    textFaint: '#7a6a58',
    accent: '#d4a060',
    accentSoft: '#c49050',
    navBg: '#1a1410',
    inputBg: '#2e2218',
    tag: '#3a2e20',
    tagText: '#c4a070',
  },
  light: {
    bg: '#f5ede0',
    surface: '#faf4ea',
    card: '#fff8ee',
    cardAlt: '#f0e8d8',
    border: '#d4c0a8',
    primary: '#b85a3c',
    primaryLight: '#c87050',
    secondary: '#4a6a44',
    secondaryLight: '#5a8a54',
    text: '#2a1e10',
    textMuted: '#6a5040',
    textFaint: '#9a8070',
    accent: '#c07030',
    accentSoft: '#d08040',
    navBg: '#faf4ea',
    inputBg: '#f0e8d8',
    tag: '#e8dcc8',
    tagText: '#8a5030',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [moodSelected, setMoodSelected] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);

  const t = themes[theme];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Map },
    { id: 'team', label: 'Team', icon: window.lucide.Users },
    { id: 'journal', label: 'Journal', icon: window.lucide.BookOpen },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
    * { font-family: 'Lora', Georgia, serif; box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
    .ritual-btn:active { transform: scale(0.96); }
  `;

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const scrollRef = useRef(null);
    const rituals = [
      { id: 1, title: 'Morning Breath', place: 'Riverside Park', icon: '🌬️', duration: '5 min', locked: false, progress: 70 },
      { id: 2, title: 'Stone Garden Pause', place: 'Old Quarter', icon: '🪨', duration: '10 min', locked: false, progress: 40 },
      { id: 3, title: 'Lantern Gratitude', place: 'Silk Market', icon: '🏮', duration: '7 min', locked: true, progress: 0 },
      { id: 4, title: 'Twilight Journaling', place: 'Harbor Steps', icon: '📖', duration: '12 min', locked: true, progress: 0 },
    ];

    const moods = [
      { id: 'calm', label: 'Calm', emoji: '🌿' },
      { id: 'curious', label: 'Curious', emoji: '✨' },
      { id: 'tired', label: 'Tired', emoji: '🌙' },
      { id: 'joyful', label: 'Joyful', emoji: '☀️' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', {
        style: {
          padding: '20px 20px 16px',
          background: t.surface,
          borderBottom: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', {},
            React.createElement('p', { style: { color: t.textFaint, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' } }, 'Saturday, April 4'),
            React.createElement('h1', { style: { color: t.text, fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.2 } }, 'Good morning,'),
            React.createElement('h1', { style: { color: t.primary, fontSize: 22, fontWeight: 700, margin: 0, fontStyle: 'italic' } }, 'Wanderer'),
          ),
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: '50%', background: t.secondary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${t.secondaryLight}`,
            }
          }, React.createElement('span', { style: { fontSize: 20 } }, '🌿'))
        ),
        // Team quest progress
        React.createElement('div', {
          style: {
            marginTop: 16, padding: '12px 14px', background: t.card,
            borderRadius: 14, border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            React.createElement('span', { style: { color: t.textMuted, fontSize: 12, fontStyle: 'italic' } }, 'Team Quest — Kyoto Serenity Path'),
            React.createElement('span', { style: { color: t.accent, fontSize: 12, fontWeight: 600 } }, '3/7'),
          ),
          React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' } },
            React.createElement('div', { style: { width: '43%', height: '100%', background: `linear-gradient(90deg, ${t.secondary}, ${t.secondaryLight})`, borderRadius: 3, transition: 'width 0.5s ease' } })
          ),
          React.createElement('p', { style: { color: t.textFaint, fontSize: 11, marginTop: 6, marginBottom: 0 } }, '4 rituals to unlock Bamboo Forest Audio Story'),
        )
      ),

      // Mood check
      React.createElement('div', { style: { padding: '18px 20px 10px' } },
        React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 600, margin: '0 0 12px', letterSpacing: '0.02em' } }, 'How are you feeling today?'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          moods.map(m =>
            React.createElement('div', {
              key: m.id,
              onClick: () => setMoodSelected(m.id),
              style: {
                flex: 1, padding: '10px 6px', textAlign: 'center',
                background: moodSelected === m.id ? t.primary : t.card,
                border: `1.5px solid ${moodSelected === m.id ? t.primaryLight : t.border}`,
                borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s ease',
              }
            },
              React.createElement('div', { style: { fontSize: 20, marginBottom: 4 } }, m.emoji),
              React.createElement('div', { style: { color: moodSelected === m.id ? '#fff' : t.textMuted, fontSize: 11, fontWeight: moodSelected === m.id ? 600 : 400 } }, m.label),
            )
          )
        )
      ),

      // Today's rituals - horizontal scroll
      React.createElement('div', { style: { padding: '14px 0 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 12px' } },
          React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 600, margin: 0 } }, "Today's Rituals"),
          React.createElement('span', { style: { color: t.primary, fontSize: 12, fontStyle: 'italic', cursor: 'pointer' } }, 'View all →')
        ),
        React.createElement('div', {
          ref: scrollRef,
          style: {
            display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 4px',
            scrollbarWidth: 'none',
          }
        },
          rituals.map(r =>
            React.createElement('div', {
              key: r.id,
              style: {
                minWidth: 160, padding: '14px 14px 12px',
                background: r.locked ? t.card : t.cardAlt,
                border: `1.5px solid ${r.locked ? t.border : t.secondary + '60'}`,
                borderRadius: 16, flexShrink: 0, opacity: r.locked ? 0.6 : 1,
                position: 'relative', overflow: 'hidden',
              }
            },
              r.locked && React.createElement('div', {
                style: {
                  position: 'absolute', top: 8, right: 8,
                  color: t.textFaint, display: 'flex',
                }
              }, React.createElement(window.lucide.Lock, { size: 14 })),
              React.createElement('div', { style: { fontSize: 28, marginBottom: 8 } }, r.icon),
              React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 600, marginBottom: 2 } }, r.title),
              React.createElement('div', { style: { color: t.textFaint, fontSize: 11, marginBottom: r.locked ? 0 : 10, fontStyle: 'italic' } }, r.place),
              !r.locked && React.createElement('div', {},
                React.createElement('div', { style: { height: 3, background: t.border, borderRadius: 2, overflow: 'hidden' } },
                  React.createElement('div', { style: { width: `${r.progress}%`, height: '100%', background: t.secondary, borderRadius: 2 } })
                ),
                React.createElement('div', { style: { color: t.textFaint, fontSize: 10, marginTop: 4 } }, r.duration),
              )
            )
          )
        )
      ),

      // Gentle reminder
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: {
            padding: '14px 16px', background: t.card,
            border: `1.5px dashed ${t.accent + '60'}`,
            borderRadius: 14,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('span', { style: { fontSize: 22 } }, '🕯️'),
            React.createElement('div', {},
              React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 600, marginBottom: 2 } }, 'Gentle Nudge'),
              React.createElement('div', { style: { color: t.textMuted, fontSize: 12, fontStyle: 'italic', lineHeight: 1.5 } }, '"The Morning Breath ritual awaits you at Riverside Park. Your team is ready."'),
            )
          )
        )
      ),

      // Unlocked reward preview
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: {
            padding: '16px', background: `linear-gradient(135deg, ${t.secondary + '30'}, ${t.card})`,
            border: `1.5px solid ${t.secondary + '50'}`, borderRadius: 16,
            display: 'flex', alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 12, background: t.secondary,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          }, React.createElement('span', { style: { fontSize: 24 } }, '🎵')),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { color: t.secondaryLight, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 } }, 'Recently Unlocked'),
            React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, 'Kyoto Rain Meditation'),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 12, fontStyle: 'italic' } }, '12-minute guided audio · Local sounds'),
          ),
          React.createElement(window.lucide.Play, { size: 20, color: t.secondaryLight })
        )
      )
    );
  };

  // ---- EXPLORE SCREEN ----
  const ExploreScreen = () => {
    const [selectedCity, setSelectedCity] = useState('kyoto');

    const cities = [
      { id: 'kyoto', name: 'Kyoto', country: 'Japan', emoji: '⛩️', rituals: 7, unlocked: 3 },
      { id: 'lisbon', name: 'Lisbon', country: 'Portugal', emoji: '🏛️', rituals: 5, unlocked: 1 },
      { id: 'oaxaca', name: 'Oaxaca', country: 'Mexico', emoji: '🌺', rituals: 6, unlocked: 0 },
      { id: 'bali', name: 'Bali', country: 'Indonesia', emoji: '🌊', rituals: 8, unlocked: 5 },
    ];

    const places = [
      { name: 'Arashiyama Bamboo', type: 'Forest', ritual: 'Walking Silence', status: 'done', icon: '🎋' },
      { name: 'Philosopher\'s Path', type: 'Canal Walk', ritual: 'Cherry Contemplation', status: 'active', icon: '🌸' },
      { name: 'Fushimi Inari', type: 'Shrine', ritual: 'Gate Breathing', status: 'locked', icon: '⛩️' },
      { name: 'Gion Corner', type: 'District', ritual: 'Evening Stillness', status: 'locked', icon: '🏮' },
      { name: 'Nishiki Market', type: 'Market', ritual: 'Sensory Grounding', status: 'locked', icon: '🍵' },
    ];

    const statusColors = {
      done: t.secondary,
      active: t.primary,
      locked: t.textFaint,
    };
    const statusLabels = {
      done: '✓ Complete',
      active: '◉ Active',
      locked: '🔒 Locked',
    };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', {
        style: { padding: '20px 20px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 4px' } }, 'Ritual Map'),
        React.createElement('p', { style: { color: t.textMuted, fontSize: 13, margin: 0, fontStyle: 'italic' } }, 'Discover places through local wellness traditions'),
      ),

      // City horizontal scroll
      React.createElement('div', { style: { padding: '16px 0 0' } },
        React.createElement('p', { style: { color: t.textFaint, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 20px', marginBottom: 10 } }, 'Journey Destinations'),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 4px' } },
          cities.map(c =>
            React.createElement('div', {
              key: c.id,
              onClick: () => setSelectedCity(c.id),
              style: {
                minWidth: 130, padding: '12px 14px',
                background: selectedCity === c.id ? t.primary : t.card,
                border: `1.5px solid ${selectedCity === c.id ? t.primaryLight : t.border}`,
                borderRadius: 16, cursor: 'pointer', flexShrink: 0,
                transition: 'all 0.2s ease',
              }
            },
              React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, c.emoji),
              React.createElement('div', { style: { color: selectedCity === c.id ? '#fff' : t.text, fontSize: 14, fontWeight: 600 } }, c.name),
              React.createElement('div', { style: { color: selectedCity === c.id ? 'rgba(255,255,255,0.7)' : t.textFaint, fontSize: 11, fontStyle: 'italic', marginBottom: 6 } }, c.country),
              React.createElement('div', { style: { color: selectedCity === c.id ? 'rgba(255,255,255,0.85)' : t.textMuted, fontSize: 11 } }, `${c.unlocked}/${c.rituals} rituals`),
            )
          )
        )
      ),

      // Map visual placeholder
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('div', {
          style: {
            height: 160, background: t.card, borderRadius: 18,
            border: `1.5px solid ${t.border}`, position: 'relative',
            overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('div', { style: { position: 'absolute', inset: 0, opacity: 0.08 } },
            React.createElement('div', { style: { position: 'absolute', top: 20, left: 30, width: 80, height: 60, background: t.secondary, borderRadius: '50% 40% 60% 50%' } }),
            React.createElement('div', { style: { position: 'absolute', top: 40, left: 80, width: 120, height: 80, background: t.secondary, borderRadius: '40% 60% 50% 40%' } }),
            React.createElement('div', { style: { position: 'absolute', bottom: 20, right: 40, width: 100, height: 70, background: t.secondary, borderRadius: '60% 40% 40% 60%' } }),
          ),
          // Map pins
          [{ x: 30, y: 35, active: true }, { x: 55, y: 55, active: true }, { x: 70, y: 30, active: false }, { x: 80, y: 60, active: false }].map((pin, i) =>
            React.createElement('div', {
              key: i,
              style: {
                position: 'absolute',
                left: `${pin.x}%`, top: `${pin.y}%`,
                width: 10, height: 10, borderRadius: '50%',
                background: pin.active ? t.primary : t.textFaint,
                border: `2px solid ${pin.active ? t.primaryLight : t.border}`,
                boxShadow: pin.active ? `0 0 8px ${t.primary}60` : 'none',
              }
            })
          ),
          React.createElement('div', { style: { color: t.textFaint, fontSize: 13, fontStyle: 'italic', zIndex: 1 } }, '⛩️ Kyoto Ritual Map'),
        )
      ),

      // Places list - horizontal scroll
      React.createElement('div', { style: { padding: '0 0 0' } },
        React.createElement('p', { style: { color: t.textFaint, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 20px', marginBottom: 10 } }, 'Sacred Sites'),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 16px' } },
          places.map((p, i) =>
            React.createElement('div', {
              key: i,
              style: {
                minWidth: 150, padding: '14px 14px 12px',
                background: t.card, border: `1.5px solid ${t.border}`,
                borderRadius: 16, flexShrink: 0,
              }
            },
              React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, p.icon),
              React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 600, marginBottom: 2 } }, p.name),
              React.createElement('div', { style: { color: t.textFaint, fontSize: 11, fontStyle: 'italic', marginBottom: 6 } }, p.type),
              React.createElement('div', { style: { color: t.textMuted, fontSize: 11, marginBottom: 8 } }, p.ritual),
              React.createElement('div', {
                style: {
                  display: 'inline-block', padding: '3px 8px',
                  background: statusColors[p.status] + '20',
                  border: `1px solid ${statusColors[p.status] + '40'}`,
                  borderRadius: 8, color: statusColors[p.status], fontSize: 10,
                }
              }, statusLabels[p.status])
            )
          )
        )
      ),
    );
  };

  // ---- TEAM SCREEN ----
  const TeamScreen = () => {
    const members = [
      { name: 'Yuki', avatar: '🧘', rituals: 12, streak: 5, status: 'Active now' },
      { name: 'Marco', avatar: '🌿', rituals: 9, streak: 3, status: '2h ago' },
      { name: 'Amara', avatar: '🌸', rituals: 15, streak: 8, status: 'Active now' },
      { name: 'You', avatar: '✨', rituals: 7, streak: 4, status: 'That\'s you!' },
    ];

    const quests = [
      { title: 'Dawn Collective', desc: 'All members complete a morning ritual within 2 hours of sunrise', progress: 75, reward: '🎵 Sunrise Meditation', deadline: 'Today, 9am' },
      { title: 'Stillness Streak', desc: 'Team achieves 3 consecutive days of mindful pauses', progress: 40, reward: '🗺️ Hidden Places Map', deadline: '2 days left' },
      { title: 'Gratitude Circle', desc: 'Share reflections at the same landmark within 48 hours', progress: 20, reward: '🕯️ Candlelight Audio', deadline: '3 days left' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', {
        style: { padding: '20px 20px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 4px' } }, 'Your Team'),
        React.createElement('p', { style: { color: t.textMuted, fontSize: 13, margin: 0, fontStyle: 'italic' } }, 'The Wandering Lotus • 4 members'),
      ),

      // Members
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h3', { style: { color: t.text, fontSize: 14, fontWeight: 600, margin: '0 0 12px' } }, 'Fellow Wanderers'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          members.map((m, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 14px', background: t.card,
                border: `1.5px solid ${t.border}`, borderRadius: 14,
              }
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: '50%',
                  background: t.cardAlt, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 22,
                  border: `2px solid ${t.border}`,
                }
              }, m.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, m.name),
                React.createElement('div', { style: { color: t.textFaint, fontSize: 11, fontStyle: 'italic' } }, m.status),
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { style: { color: t.accent, fontSize: 13, fontWeight: 600 } }, `${m.rituals}`),
                React.createElement('div', { style: { color: t.textFaint, fontSize: 10 } }, 'rituals'),
                React.createElement('div', { style: { color: t.secondary, fontSize: 11, marginTop: 2 } }, `🔥 ${m.streak}d`),
              )
            )
          )
        )
      ),

      // Collective quests
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h3', { style: { color: t.text, fontSize: 14, fontWeight: 600, margin: '0 0 12px' } }, 'Collective Quests'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          quests.map((q, i) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '14px', background: t.card,
                border: `1.5px solid ${t.border}`, borderRadius: 16,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
                React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, q.title),
                React.createElement('div', { style: { color: t.textFaint, fontSize: 11, fontStyle: 'italic' } }, q.deadline),
              ),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 12, margin: '0 0 10px', lineHeight: 1.5, fontStyle: 'italic' } }, q.desc),
              React.createElement('div', { style: { height: 5, background: t.border, borderRadius: 3, overflow: 'hidden', marginBottom: 8 } },
                React.createElement('div', { style: { width: `${q.progress}%`, height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3 } })
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { color: t.textFaint, fontSize: 11 } }, `${q.progress}% complete`),
                React.createElement('div', { style: { color: t.accent, fontSize: 11, fontStyle: 'italic' } }, `Unlock: ${q.reward}`),
              )
            )
          )
        )
      ),

      // Invite
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          onClick: () => handlePress('invite'),
          style: {
            padding: '14px', background: t.card,
            border: `1.5px dashed ${t.primary + '60'}`,
            borderRadius: 14, textAlign: 'center', cursor: 'pointer',
            transform: pressedBtn === 'invite' ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 0.15s ease',
          }
        },
          React.createElement('span', { style: { fontSize: 20, marginRight: 8 } }, '＋'),
          React.createElement('span', { style: { color: t.primary, fontSize: 13, fontWeight: 600 } }, 'Invite a fellow wanderer'),
        )
      ),
    );
  };

  // ---- JOURNAL SCREEN ----
  const JournalScreen = () => {
    const entries = [
      {
        date: 'Apr 3', ritual: 'Morning Breath', place: 'Riverside Park',
        mood: 'Calm', emoji: '🌿', reflection: '"The river moved slowly today. I noticed I\'ve been rushing — even my thoughts. Five minutes of stillness felt like medicine."',
        teamReactions: ['🙏', '💚', '✨'],
      },
      {
        date: 'Apr 2', ritual: 'Stone Garden Pause', place: 'Old Quarter',
        mood: 'Curious', emoji: '✨', reflection: '"Marco and Amara completed theirs at almost the same time. Something about synchronized stillness feels deeply comforting."',
        teamReactions: ['🌸', '💚'],
      },
      {
        date: 'Apr 1', ritual: 'Lantern Gratitude', place: 'Silk Market',
        mood: 'Joyful', emoji: '☀️', reflection: '"Wrote three things I\'m grateful for. Shared with team. Yuki wrote: \'the smell of old paper in bookshops\'. Perfect."',
        teamReactions: ['🙏', '🏮', '💚', '✨'],
      },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', {
        style: { padding: '20px 20px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 4px' } }, 'Reflection Log'),
        React.createElement('p', { style: { color: t.textMuted, fontSize: 13, margin: 0, fontStyle: 'italic' } }, 'Your ritual memories & emotional thread'),
      ),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '16px 20px 0' } },
        [
          { label: 'Rituals', value: '7', icon: '🌿' },
          { label: 'Streak', value: '4d', icon: '🔥' },
          { label: 'Team Logs', value: '23', icon: '💚' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, padding: '12px 10px', background: t.card,
              border: `1.5px solid ${t.border}`, borderRadius: 14, textAlign: 'center',
            }
          },
            React.createElement('div', { style: { fontSize: 20, marginBottom: 4 } }, s.icon),
            React.createElement('div', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, s.value),
            React.createElement('div', { style: { color: t.textFaint, fontSize: 11, fontStyle: 'italic' } }, s.label),
          )
        )
      ),

      // New entry button
      React.createElement('div', { style: { padding: '14px 20px 0' } },
        React.createElement('div', {
          onClick: () => handlePress('newentry'),
          style: {
            padding: '13px 16px', background: t.primary,
            borderRadius: 14, cursor: 'pointer', display: 'flex',
            alignItems: 'center', gap: 10,
            transform: pressedBtn === 'newentry' ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 0.15s ease',
          }
        },
          React.createElement(window.lucide.PenLine, { size: 18, color: '#fff' }),
          React.createElement('span', { style: { color: '#fff', fontSize: 14, fontWeight: 600 } }, 'Record today\'s reflection'),
        )
      ),

      // Entries
      React.createElement('div', { style: { padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 } },
        entries.map((e, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '16px', background: t.card,
              border: `1.5px solid ${t.border}`, borderRadius: 18,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', {},
                React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, e.ritual),
                React.createElement('div', { style: { color: t.textFaint, fontSize: 11, fontStyle: 'italic' } }, `${e.place} · ${e.date}`),
              ),
              React.createElement('div', {
                style: {
                  padding: '4px 8px', background: t.tag,
                  borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4,
                }
              },
                React.createElement('span', { style: { fontSize: 12 } }, e.emoji),
                React.createElement('span', { style: { color: t.tagText, fontSize: 11 } }, e.mood),
              )
            ),
            React.createElement('p', {
              style: {
                color: t.textMuted, fontSize: 13, lineHeight: 1.7,
                fontStyle: 'italic', margin: '0 0 10px',
              }
            }, e.reflection),
            React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
              React.createElement('span', { style: { color: t.textFaint, fontSize: 11 } }, 'Team:'),
              e.teamReactions.map((r, ri) =>
                React.createElement('span', { key: ri, style: { fontSize: 14 } }, r)
              )
            )
          )
        )
      ),
    );
  };

  // ---- SETTINGS SCREEN ----
  const SettingsScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [shareLog, setShareLog] = useState(true);

    const Toggle = ({ value, onChange }) =>
      React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
          background: value ? t.secondary : t.border,
          position: 'relative', transition: 'background 0.2s ease',
          border: `1px solid ${value ? t.secondaryLight : t.border}`,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 3, left: value ? 22 : 2,
            width: 16, height: 16, borderRadius: '50%',
            background: value ? '#fff' : t.textFaint,
            transition: 'left 0.2s ease',
          }
        })
      );

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', {
        style: { padding: '20px 20px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 4px' } }, 'Settings'),
        React.createElement('p', { style: { color: t.textMuted, fontSize: 13, margin: 0, fontStyle: 'italic' } }, 'Personalize your ritual journey'),
      ),

      // Profile
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px', background: t.card, borderRadius: 16,
            border: `1.5px solid ${t.border}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 56, height: 56, borderRadius: '50%', background: t.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, border: `2px solid ${t.primaryLight}`,
            }
          }, '✨'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, 'Wanderer'),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 12, fontStyle: 'italic' } }, 'The Wandering Lotus · Level 4'),
            React.createElement('div', { style: { color: t.secondary, fontSize: 11, marginTop: 2 } }, '7 rituals · 4-day streak'),
          ),
          React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textFaint }),
        )
      ),

      // Theme toggle
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: {
            padding: '14px 16px', background: t.card,
            border: `1.5px solid ${t.border}`, borderRadius: 14,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('span', { style: { fontSize: 20 } }, theme === 'dark' ? '🌙' : '☀️'),
              React.createElement('div', {},
                React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, theme === 'dark' ? 'Dark Mode' : 'Light Mode'),
                React.createElement('div', { style: { color: t.textFaint, fontSize: 11, fontStyle: 'italic' } }, 'Switch appearance'),
              )
            ),
            React.createElement(Toggle, { value: theme === 'dark', onChange: (v) => setTheme(v ? 'dark' : 'light') })
          )
        )
      ),

      // Other settings
      React.createElement('div', { style: { padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 } },
        [
          { label: 'Gentle Reminders', sub: 'Nudges to complete daily rituals', value: notifs, onChange: setNotifs, icon: '🕯️' },
          { label: 'Share Reflection Log', sub: 'Team can see your entries', value: shareLog, onChange: setShareLog, icon: '💚' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '14px 16px', background: t.card,
              border: `1.5px solid ${t.border}`, borderRadius: 14,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('span', { style: { fontSize: 20 } }, s.icon),
              React.createElement('div', {},
                React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, s.label),
                React.createElement('div', { style: { color: t.textFaint, fontSize: 11, fontStyle: 'italic' } }, s.sub),
              )
            ),
            React.createElement(Toggle, { value: s.value, onChange: s.onChange })
          )
        )
      ),

      // About
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('div', {
          style: {
            padding: '16px', background: t.card,
            border: `1.5px dashed ${t.border}`, borderRadius: 14,
            textAlign: 'center',
          }
        },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 8 } }, '🌿'),
          React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 600, marginBottom: 4 } }, 'Ritual Routes'),
          React.createElement('div', { style: { color: t.textMuted, fontSize: 12, fontStyle: 'italic', lineHeight: 1.6 } }, '"Discover calm journeys via shared daily rituals"'),
          React.createElement('div', { style: { color: t.textFaint, fontSize: 11, marginTop: 8 } }, 'Version 1.0 · Made with intention'),
        )
      ),
    );
  };

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    team: TeamScreen,
    journal: JournalScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }
  },
    React.createElement('style', {}, fontStyle),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg,
        borderRadius: 50, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
        fontFamily: "'Lora', Georgia, serif",
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 50, background: t.surface, display: 'flex',
          alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 24px 10px', flexShrink: 0,
        }
      },
        React.createElement('span', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: {
            width: 126, height: 36, background: '#000', borderRadius: 20,
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' } })
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 14, color: t.text }),
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 80, background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          padding: '0 8px 16px', flexShrink: 0,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, cursor: 'pointer', padding: '8px 12px',
              borderRadius: 12, transition: 'all 0.15s ease',
              background: activeTab === tab.id ? t.primary + '20' : 'transparent',
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textFaint,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, color: activeTab === tab.id ? t.primary : t.textFaint,
                fontWeight: activeTab === tab.id ? 600 : 400,
                fontFamily: "'Lora', Georgia, serif",
              }
            }, tab.label)
          )
        )
      ),
    )
  );
}
