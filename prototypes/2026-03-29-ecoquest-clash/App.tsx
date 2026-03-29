const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [claimedQuest, setClaimedQuest] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');`;
    document.head.appendChild(style);
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0'));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const themes = {
    light: {
      bg: '#F2E8D0',
      surface: '#EDE0C4',
      surfaceAlt: '#E8D5AA',
      card: '#FDFAF3',
      cardAlt: '#F5EDD8',
      text: '#1A1208',
      textSec: '#4A3B1C',
      textMuted: '#7A6840',
      primary: '#4A7C3F',
      primaryLight: '#6BA85A',
      secondary: '#D4A017',
      teal: '#1B6B7B',
      tealLight: '#2A8FA3',
      accent: '#C0392B',
      border: '#3A2A10',
      navBg: '#1A1208',
      navText: '#F2E8D0',
      navActive: '#D4A017',
      tear1: '#4A7C3F',
      tear2: '#D4A017',
      tear3: '#1B6B7B',
    },
    dark: {
      bg: '#0F1A10',
      surface: '#1A2B1C',
      surfaceAlt: '#152218',
      card: '#1E2F20',
      cardAlt: '#243526',
      text: '#F2E8D0',
      textSec: '#D4C8A8',
      textMuted: '#8A9E7A',
      primary: '#6BA85A',
      primaryLight: '#88C874',
      secondary: '#E8B420',
      teal: '#2A8FA3',
      tealLight: '#3DB5CE',
      accent: '#E74C3C',
      border: '#4A7C3F',
      navBg: '#0A1008',
      navText: '#F2E8D0',
      navActive: '#E8B420',
      tear1: '#2A4A20',
      tear2: '#5A4010',
      tear3: '#0D3A45',
    }
  };

  const t = darkMode ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'quests', label: 'Quests', icon: window.lucide.Compass },
    { id: 'league', label: 'League', icon: window.lucide.Trophy },
    { id: 'tales', label: 'Tales', icon: window.lucide.BookOpen },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const claimQuest = (id) => {
    setClaimedQuest(id);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2500);
  };

  // ─── STATUS BAR ────────────────────────────────────────────────
  const StatusBar = () => React.createElement('div', {
    style: {
      height: 44,
      background: t.navBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
    }
  },
    React.createElement('span', { style: { color: t.navText, fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 14 } }, currentTime),
    React.createElement('div', { style: { width: 120, height: 28, background: '#0A0A0A', borderRadius: 14, border: '2px solid #333' } }),
    React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 14, color: t.navText }),
      React.createElement(window.lucide.Battery, { size: 14, color: t.navText }),
    )
  );

  // ─── TORN PAPER DIVIDER ────────────────────────────────────────
  const TornDivider = ({ color = t.primary, flip = false }) => React.createElement('div', {
    style: {
      height: 18,
      background: color,
      position: 'relative',
      flexShrink: 0,
      clipPath: flip
        ? 'polygon(0 0, 5% 100%, 10% 20%, 15% 100%, 22% 10%, 28% 90%, 35% 5%, 42% 85%, 50% 0, 58% 95%, 65% 15%, 72% 100%, 80% 5%, 88% 85%, 95% 10%, 100% 80%, 100% 0)'
        : 'polygon(0 100%, 5% 0, 10% 80%, 15% 0, 22% 90%, 28% 10%, 35% 95%, 42% 15%, 50% 100%, 58% 5%, 65% 85%, 72% 0, 80% 95%, 88% 15%, 95% 90%, 100% 20%, 100% 100%)',
    }
  });

  // ─── HOME SCREEN ───────────────────────────────────────────────
  const HomeScreen = () => {
    const [miniDone, setMiniDone] = useState(false);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },

      // Hero banner — collage punk header
      React.createElement('div', {
        style: {
          background: t.primary,
          padding: '22px 20px 10px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Diagonal slash decorations
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: t.secondary, transform: 'rotate(45deg)', opacity: 0.3 } }),
        React.createElement('div', { style: { position: 'absolute', bottom: 0, left: -10, width: 80, height: 80, background: t.teal, transform: 'rotate(30deg)', opacity: 0.25 } }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#B8E8A0', fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 2px' } }, 'Welcome back,'),
              React.createElement('h1', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 36, margin: 0, letterSpacing: 2, lineHeight: 1 } }, 'ECO-RAIDER'),
              React.createElement('h2', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.secondary, fontSize: 20, margin: '2px 0 0', letterSpacing: 1 } }, 'MAYA CHEN'),
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { background: t.secondary, borderRadius: 4, padding: '4px 10px', display: 'inline-block', border: '2px solid #1A1208' } },
                React.createElement('span', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#1A1208', fontSize: 18, letterSpacing: 1 } }, 'LVL 12'),
              ),
              React.createElement('div', { style: { marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' } },
                React.createElement(window.lucide.Zap, { size: 14, color: '#FFD700' }),
                React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: '#FFD700', fontSize: 13, fontWeight: 700 } }, '2,840 XP'),
              )
            )
          ),
          // XP bar
          React.createElement('div', { style: { marginTop: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 2, height: 8, border: '1px solid rgba(255,255,255,0.2)' } },
            React.createElement('div', { style: { width: '68%', background: `linear-gradient(90deg, ${t.secondary}, #FFD700)`, height: '100%', borderRadius: 2 } })
          ),
          React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#B8E8A0', fontSize: 11, margin: '4px 0 0', fontWeight: 600 } }, '2,840 / 4,000 XP TO LEVEL 13'),
        )
      ),

      React.createElement(TornDivider, { color: t.primary }),

      // Daily mini-quest — overlapping panel style
      React.createElement('div', { style: { padding: '0 16px', marginTop: -8, position: 'relative', zIndex: 2 } },
        React.createElement('div', {
          style: {
            background: t.secondary,
            border: `3px solid #1A1208`,
            borderRadius: 4,
            padding: '14px 16px',
            transform: 'rotate(-1deg)',
            boxShadow: '4px 4px 0 #1A1208',
            position: 'relative',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: -10, left: 12,
              background: t.accent, color: '#fff',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 1,
              padding: '2px 10px', border: '2px solid #1A1208', borderRadius: 2,
              transform: 'rotate(1deg)',
            }
          }, '⚡ DAILY QUEST'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 } },
            React.createElement('div', null,
              React.createElement('h3', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#1A1208', fontSize: 22, margin: 0, letterSpacing: 1 } }, 'SPOT A POLLINATOR'),
              React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#3A2A10', fontSize: 12, margin: '4px 0 0', fontWeight: 600 } }, 'Photo proof = +150 XP + mystery badge'),
            ),
            React.createElement('button', {
              onClick: () => { handlePress('mini'); claimQuest('mini'); setMiniDone(true); },
              style: {
                background: miniDone ? t.primary : '#1A1208',
                color: '#F2E8D0',
                border: 'none',
                borderRadius: 3,
                padding: '10px 14px',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 16,
                letterSpacing: 1,
                cursor: 'pointer',
                transform: pressedBtn === 'mini' ? 'scale(0.94)' : 'scale(1)',
                transition: 'transform 0.1s',
                flexShrink: 0,
              }
            }, miniDone ? '✓ DONE' : 'CLAIM')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 10 } },
            React.createElement('div', { style: { background: 'rgba(0,0,0,0.15)', borderRadius: 3, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(window.lucide.Clock, { size: 11, color: '#3A2A10' }),
              React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", fontSize: 11, color: '#3A2A10', fontWeight: 700 } }, 'RESETS IN 6H 22M'),
            ),
            React.createElement('div', { style: { background: 'rgba(0,0,0,0.15)', borderRadius: 3, padding: '3px 8px' } },
              React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", fontSize: 11, color: '#3A2A10', fontWeight: 700 } }, '🔥 3-DAY STREAK'),
            ),
          )
        )
      ),

      // Reward flash
      showReward && React.createElement('div', {
        style: {
          position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)',
          background: t.primary, color: '#F2E8D0', padding: '16px 28px',
          borderRadius: 4, border: '3px solid #1A1208',
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 2,
          boxShadow: '6px 6px 0 #1A1208', zIndex: 999,
          animation: 'none',
          textAlign: 'center',
        }
      }, React.createElement('div', null, '+150 XP EARNED!'), React.createElement('div', { style: { fontSize: 14, fontFamily: "'Barlow', sans-serif", marginTop: 4 } }, '🏅 POLLINATOR SCOUT badge unlocked')),

      // Neighborhood league snapshot
      React.createElement('div', { style: { padding: '18px 16px 8px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('h2', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.text, fontSize: 26, margin: 0, letterSpacing: 1 } }, 'NEIGHBORHOOD LEAGUE'),
          React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", fontSize: 11, color: t.teal, fontWeight: 700, textDecoration: 'underline' } }, 'SEE ALL'),
        ),
        // Team card
        React.createElement('div', {
          style: {
            background: t.teal,
            border: `3px solid #1A1208`,
            borderRadius: 4,
            padding: '14px 16px',
            transform: 'rotate(0.5deg)',
            boxShadow: '4px 4px 0 #1A1208',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#A8D8E0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 2px', letterSpacing: 1 } }, 'Your Team'),
              React.createElement('h3', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 24, margin: 0, letterSpacing: 1 } }, 'CREEK DEFENDERS'),
            ),
            React.createElement('div', {
              style: {
                background: t.secondary, border: '2px solid #1A1208',
                borderRadius: 3, padding: '6px 12px', textAlign: 'center'
              }
            },
              React.createElement('div', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#1A1208', fontSize: 26, lineHeight: 1 } }, '#2'),
              React.createElement('div', { style: { fontFamily: "'Barlow', sans-serif", fontSize: 10, color: '#3A2A10', fontWeight: 700 } }, 'DISTRICT'),
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 10 } },
            [{ label: 'Points', val: '4,820' }, { label: 'Members', val: '14' }, { label: 'Quests', val: '38' }].map(stat =>
              React.createElement('div', { key: stat.label, style: { background: 'rgba(0,0,0,0.2)', borderRadius: 3, padding: '6px 10px', flex: 1, textAlign: 'center' } },
                React.createElement('div', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 18, letterSpacing: 1 } }, stat.val),
                React.createElement('div', { style: { fontFamily: "'Barlow', sans-serif", color: '#A8D8E0', fontSize: 10, fontWeight: 600 } }, stat.label),
              )
            )
          ),
          React.createElement('div', { style: { marginTop: 10 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
              React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: '#A8D8E0', fontSize: 11, fontWeight: 600 } }, 'WEEKLY GOAL: 500 PTS'),
              React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: '#F2E8D0', fontSize: 11, fontWeight: 700 } }, '82%'),
            ),
            React.createElement('div', { style: { background: 'rgba(0,0,0,0.3)', borderRadius: 2, height: 6 } },
              React.createElement('div', { style: { width: '82%', background: t.secondary, height: '100%', borderRadius: 2 } })
            )
          )
        )
      ),

      // Active eco-mystery hunt
      React.createElement('div', { style: { padding: '8px 16px 8px' } },
        React.createElement('div', {
          style: {
            background: '#1A1208',
            border: `3px solid ${t.secondary}`,
            borderRadius: 4,
            padding: '14px 16px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `4px 4px 0 ${t.secondary}`,
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: t.accent, opacity: 0.15, transform: 'rotate(45deg) translate(20px,-20px)' } }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
            React.createElement('div', { style: { background: t.accent, borderRadius: 3, padding: 8, flexShrink: 0 } },
              React.createElement(window.lucide.Flame, { size: 22, color: '#F2E8D0' }),
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: "'Barlow', sans-serif", color: t.secondary, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 } }, '🔥 ECO-MYSTERY HUNT LIVE'),
              React.createElement('h3', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 20, margin: 0, letterSpacing: 1 } }, 'THE VANISHING CREEK SAGA'),
              React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#8A9E7A', fontSize: 12, margin: '4px 0 0' } }, 'Community needs 2,000 more pts to unlock Chapter 3'),
              React.createElement('div', { style: { marginTop: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 2, height: 6 } },
                React.createElement('div', { style: { width: '73%', background: t.primary, height: '100%', borderRadius: 2 } })
              ),
              React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#6BA85A', fontSize: 11, margin: '4px 0 0', fontWeight: 600 } }, '73% COMPLETE — ENDS IN 2 DAYS'),
            )
          )
        )
      ),

      // Eco-fact drop
      React.createElement('div', { style: { padding: '8px 16px 20px' } },
        React.createElement('div', {
          style: {
            background: t.primary,
            borderRadius: 4, border: `3px solid #1A1208`,
            padding: '12px 14px',
            display: 'flex', gap: 12, alignItems: 'flex-start',
            transform: 'rotate(-0.5deg)',
            boxShadow: '3px 3px 0 #1A1208',
          }
        },
          React.createElement('span', { style: { fontSize: 24, flexShrink: 0 } }, '🌿'),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#B8E8A0', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 3px' } }, 'DID YOU KNOW?'),
            React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#F2E8D0', fontSize: 13, margin: 0, lineHeight: 1.4 } }, 'Urban creek corridors support 40% more bird species than isolated parks. Your Willowdale quest protects 3 nesting sites.'),
          )
        )
      ),
    );
  };

  // ─── QUESTS SCREEN ─────────────────────────────────────────────
  const QuestsScreen = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const questData = [
      { id: 1, title: 'PLANT 3 NATIVE SEEDS', cat: 'active', xp: 300, time: '3 days', diff: 'EASY', icon: '🌱', color: t.primary },
      { id: 2, title: 'MICRO CLEANUP BLITZ', cat: 'active', xp: 450, time: '1 day', diff: 'MEDIUM', icon: '🧹', color: t.teal },
      { id: 3, title: 'WATER SAVINGS HACK', cat: 'active', xp: 200, time: '5 days', diff: 'EASY', icon: '💧', color: t.tealLight },
      { id: 4, title: 'COMPOST STARTER', cat: 'completed', xp: 500, time: 'Done', diff: 'HARD', icon: '♻️', color: t.secondary },
      { id: 5, title: 'SOLAR AUDIT PHOTO', cat: 'ai', xp: 350, time: '2 days', diff: 'MEDIUM', icon: '☀️', color: '#E67E22' },
    ];

    const filtered = activeFilter === 'all' ? questData : questData.filter(q => q.cat === activeFilter);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
      // Header
      React.createElement('div', { style: { background: '#1A1208', padding: '20px 20px 14px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 100, height: 100, background: t.teal, opacity: 0.2, transform: 'rotate(45deg)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: 20, width: 70, height: 70, background: t.secondary, opacity: 0.15, transform: 'rotate(25deg)' } }),
        React.createElement('h1', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 34, margin: 0, letterSpacing: 2 } }, 'QUEST BOARD'),
        React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#8A9E7A', fontSize: 13, margin: '4px 0 0' } }, 'Complete quests. Earn XP. Save the planet.'),
      ),
      React.createElement(TornDivider, { color: '#1A1208' }),

      // AI quest remix banner
      React.createElement('div', { style: { padding: '12px 16px 6px' } },
        React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.teal}, #0D3A45)`, border: `3px solid #1A1208`, borderRadius: 4, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '3px 3px 0 #1A1208' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#A8D8E0', fontSize: 11, fontWeight: 700, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: 1 } }, '🤖 AI Quest Remix'),
            React.createElement('p', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 18, margin: 0, letterSpacing: 1 } }, 'PERSONALIZED FOR YOU'),
          ),
          React.createElement('button', {
            onClick: () => handlePress('remix'),
            style: {
              background: t.secondary, border: '2px solid #1A1208', borderRadius: 3,
              padding: '8px 14px', fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 16, color: '#1A1208', cursor: 'pointer', letterSpacing: 1,
              transform: pressedBtn === 'remix' ? 'scale(0.94)' : 'scale(1)',
              transition: 'transform 0.1s',
            }
          }, 'REMIX!')
        )
      ),

      // Filters
      React.createElement('div', { style: { padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto' } },
        [['all', 'ALL'], ['active', 'ACTIVE'], ['ai', 'AI CRAFTED'], ['completed', 'DONE']].map(([id, label]) =>
          React.createElement('button', {
            key: id,
            onClick: () => setActiveFilter(id),
            style: {
              background: activeFilter === id ? t.primary : t.surface,
              color: activeFilter === id ? '#F2E8D0' : t.textMuted,
              border: `2px solid ${activeFilter === id ? '#1A1208' : t.border}`,
              borderRadius: 3, padding: '5px 14px', cursor: 'pointer',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 1,
              flexShrink: 0,
              boxShadow: activeFilter === id ? '2px 2px 0 #1A1208' : 'none',
            }
          }, label)
        )
      ),

      // Quest cards
      React.createElement('div', { style: { padding: '6px 16px 20px', display: 'flex', flexDirection: 'column', gap: 12 } },
        filtered.map((q, i) =>
          React.createElement('div', {
            key: q.id,
            style: {
              background: t.card, border: `3px solid #1A1208`, borderRadius: 4,
              overflow: 'hidden', transform: i % 2 === 0 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)',
              boxShadow: `4px 4px 0 ${q.color}`,
            }
          },
            // Color top stripe
            React.createElement('div', { style: { background: q.color, height: 6 } }),
            React.createElement('div', { style: { padding: '12px 14px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                  React.createElement('span', { style: { fontSize: 26 } }, q.icon),
                  React.createElement('div', null,
                    React.createElement('h3', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.text, fontSize: 20, margin: 0, letterSpacing: 1 } }, q.title),
                    React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 3 } },
                      React.createElement('span', {
                        style: {
                          background: q.diff === 'EASY' ? '#E8F5E9' : q.diff === 'MEDIUM' ? '#FFF9C4' : '#FFEBEE',
                          color: q.diff === 'EASY' ? '#2E7D32' : q.diff === 'MEDIUM' ? '#F57F17' : '#C62828',
                          fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700,
                          padding: '2px 6px', borderRadius: 2, border: '1px solid currentColor',
                        }
                      }, q.diff),
                      React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: t.textMuted, fontSize: 11, display: 'flex', alignItems: 'center', gap: 3 } },
                        React.createElement(window.lucide.Clock, { size: 10, color: t.textMuted }), q.time
                      ),
                    )
                  )
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontFamily: "'Bebas Neue', sans-serif", color: q.color, fontSize: 22, letterSpacing: 1 } }, `+${q.xp}`),
                  React.createElement('div', { style: { fontFamily: "'Barlow', sans-serif", color: t.textMuted, fontSize: 10, fontWeight: 600 } }, 'XP'),
                )
              ),
              q.cat !== 'completed' && React.createElement('button', {
                onClick: () => { handlePress(`q${q.id}`); claimQuest(q.id); },
                style: {
                  marginTop: 10, width: '100%',
                  background: claimedQuest === q.id ? t.primary : '#1A1208',
                  color: '#F2E8D0', border: 'none', borderRadius: 3,
                  padding: '9px', fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 16, letterSpacing: 1, cursor: 'pointer',
                  transform: pressedBtn === `q${q.id}` ? 'scale(0.97)' : 'scale(1)',
                  transition: 'transform 0.1s',
                }
              }, claimedQuest === q.id ? '✓ QUEST ACCEPTED!' : 'START QUEST'),
              q.cat === 'completed' && React.createElement('div', {
                style: { marginTop: 10, background: '#E8F5E9', borderRadius: 3, padding: '8px', textAlign: 'center', border: '1px solid #4CAF50' }
              },
                React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: '#2E7D32', fontSize: 13, fontWeight: 700 } }, '✓ COMPLETED — XP EARNED')
              ),
            )
          )
        )
      )
    );
  };

  // ─── LEAGUE SCREEN ─────────────────────────────────────────────
  const LeagueScreen = () => {
    const teams = [
      { rank: 1, name: 'RIVERSIDE REBELS', pts: 6240, members: 18, change: '+2', badge: '🏆' },
      { rank: 2, name: 'CREEK DEFENDERS', pts: 4820, members: 14, change: '—', badge: '🥈', isUser: true },
      { rank: 3, name: 'URBAN CANOPY CREW', pts: 4310, members: 11, change: '-1', badge: '🥉' },
      { rank: 4, name: 'SOLAR SQUAD', pts: 3890, members: 9, change: '+3', badge: '4️⃣' },
      { rank: 5, name: 'SEED BOMBERS', pts: 3200, members: 16, change: '-2', badge: '5️⃣' },
      { rank: 6, name: 'WETLAND WARRIORS', pts: 2750, members: 8, change: '—', badge: '6️⃣' },
    ];

    const soloLeaders = [
      { rank: 1, name: 'Alex R.', pts: 1840, quests: 24, avatar: '🌿' },
      { rank: 2, name: 'Maya C.', pts: 1620, quests: 21, avatar: '🌊', isUser: true },
      { rank: 3, name: 'Jordan K.', pts: 1490, quests: 19, avatar: '🌱' },
      { rank: 4, name: 'Sam T.', pts: 1240, quests: 16, avatar: '☀️' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
      // Header
      React.createElement('div', { style: { background: t.secondary, padding: '20px 20px 12px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 90, height: 90, background: '#1A1208', opacity: 0.1, transform: 'rotate(45deg)' } }),
        React.createElement('h1', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#1A1208', fontSize: 34, margin: 0, letterSpacing: 2 } }, 'RIVAL BOARDS'),
        React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#3A2A10', fontSize: 13, margin: '4px 0 0', fontWeight: 600 } }, 'DISTRICT RANKINGS — WEEK 13'),
      ),
      React.createElement(TornDivider, { color: t.secondary }),

      // Top teams podium
      React.createElement('div', { style: { padding: '14px 16px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('h2', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.text, fontSize: 24, margin: 0, letterSpacing: 1 } }, 'TEAM LEAGUE'),
          React.createElement('div', { style: { background: t.teal, borderRadius: 3, padding: '3px 10px' } },
            React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: '#F2E8D0', fontSize: 11, fontWeight: 700 } }, 'LIVE')
          )
        ),
        teams.map(team =>
          React.createElement('div', {
            key: team.rank,
            style: {
              background: team.isUser ? t.teal : t.card,
              border: `${team.isUser ? 3 : 2}px solid #1A1208`,
              borderRadius: 4,
              padding: '10px 14px',
              marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 10,
              transform: team.isUser ? 'scale(1.02)' : 'scale(1)',
              boxShadow: team.isUser ? `3px 3px 0 ${t.secondary}` : '2px 2px 0 rgba(0,0,0,0.1)',
            }
          },
            React.createElement('span', { style: { fontSize: 20, flexShrink: 0, width: 28 } }, team.badge),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontFamily: "'Bebas Neue', sans-serif", color: team.isUser ? '#F2E8D0' : t.text, fontSize: 17, letterSpacing: 1 } }, team.name),
                React.createElement('span', { style: { fontFamily: "'Bebas Neue', sans-serif", color: team.isUser ? t.secondary : t.primary, fontSize: 18, letterSpacing: 1 } }, team.pts.toLocaleString()),
              ),
              React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 2 } },
                React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: team.isUser ? '#A8D8E0' : t.textMuted, fontSize: 11 } }, `${team.members} members`),
                React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: team.change.startsWith('+') ? '#4CAF50' : team.change === '—' ? t.textMuted : '#E53935', fontSize: 11, fontWeight: 700 } }, team.change !== '—' ? `${team.change} this week` : 'no change'),
              )
            )
          )
        )
      ),

      // Eco-fact divider
      React.createElement('div', { style: { margin: '8px 16px' } },
        React.createElement('div', { style: { background: t.primary, borderRadius: 4, padding: '10px 14px', border: '2px solid #1A1208', transform: 'rotate(-0.5deg)' } },
          React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#F2E8D0', fontSize: 12, margin: 0, fontStyle: 'italic' } }, '🌍 Fact Drop: Riverside Rebels\' micro-cleanups removed an estimated 48kg of litter this week. That\'s 3 garbage bags worth!'),
        )
      ),

      // Solo leaders
      React.createElement('div', { style: { padding: '12px 16px 20px' } },
        React.createElement('h2', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.text, fontSize: 24, margin: '0 0 10px', letterSpacing: 1 } }, 'TOP SOLO ECO-RAIDERS'),
        soloLeaders.map(p =>
          React.createElement('div', {
            key: p.rank,
            style: {
              background: p.isUser ? `${t.primary}22` : t.card,
              border: `2px solid ${p.isUser ? t.primary : '#1A1208'}`,
              borderRadius: 4, padding: '10px 14px', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 10,
            }
          },
            React.createElement('span', { style: { fontSize: 22, flexShrink: 0, width: 32 } }, p.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: t.text, fontSize: 14, fontWeight: 700 } }, p.name + (p.isUser ? ' (You)' : '')),
                React.createElement('span', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.secondary, fontSize: 18, letterSpacing: 1 } }, p.pts.toLocaleString() + ' pts'),
              ),
              React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: t.textMuted, fontSize: 11 } }, `${p.quests} quests completed`),
            )
          )
        )
      )
    );
  };

  // ─── ECO TALES SCREEN ──────────────────────────────────────────
  const TalesScreen = () => {
    const [openTale, setOpenTale] = useState(null);
    const tales = [
      {
        id: 1, title: 'THE WILLOWDALE SPRINGS', subtitle: 'Chapter 1 of 4', locked: false,
        icon: '🌊', color: t.teal,
        preview: 'In 1923, Willowdale Creek supported 14 species of native fish. Urban expansion buried 60% underground...',
        full: 'Willowdale Creek once flowed openly through what is now your neighborhood. In 1923, residents documented 14 species of native fish including the now-rare Brook Silverside. As the city expanded in the 1950s, developers buried 60% of the creek in concrete culverts. Today, restoration projects led by local teams have uncovered 800 meters of historic streambed.',
      },
      {
        id: 2, title: 'THE MONARCH HIGHWAY', subtitle: 'Chapter 2 of 3', locked: false,
        icon: '🦋', color: t.secondary,
        preview: 'Your neighborhood sits on a critical migration corridor used by 40 million monarch butterflies annually...',
        full: 'Your neighborhood sits at the intersection of two ancient monarch butterfly migration routes. Every autumn, an estimated 40 million monarchs pass through this precise corridor. The milkweed gardens planted by EcoQuest teams this year have created 23 new resting waypoints, equivalent to adding 2.3 hectares of critical habitat.',
      },
      {
        id: 3, title: 'LOST OAK GROVE MYSTERY', subtitle: 'Chapter 1 of 5', locked: true,
        icon: '🌳', color: '#8B5E3C',
        preview: 'Unlock by completing 3 more native planting quests...',
        full: '',
      },
      {
        id: 4, title: 'UNDERGROUND MYCELIUM MAP', subtitle: 'Chapter 1 of 3', locked: true,
        icon: '🍄', color: '#7B5EA7',
        preview: 'Need 500 more community points to reveal...',
        full: '',
      },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
      // Header — pulled paper texture style
      React.createElement('div', { style: { background: '#1A1208', padding: '20px 20px 10px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, background: t.primary, opacity: 0.15, transform: 'skewX(-10deg) translateX(20px)' } }),
        React.createElement('h1', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 34, margin: 0, letterSpacing: 2 } }, 'ECO-TALES'),
        React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#8A9E7A', fontSize: 13, margin: '4px 0 0' } }, 'Unlock local environmental history through quests'),
      ),
      React.createElement(TornDivider, { color: '#1A1208' }),

      // Progress callout
      React.createElement('div', { style: { padding: '14px 16px 8px' } },
        React.createElement('div', { style: { background: t.secondary, border: '3px solid #1A1208', borderRadius: 4, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '3px 3px 0 #1A1208' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#3A2A10', fontSize: 11, fontWeight: 700, margin: '0 0 2px', textTransform: 'uppercase' } }, 'Tales Unlocked'),
            React.createElement('span', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#1A1208', fontSize: 28, letterSpacing: 1 } }, '2 / 4'),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#3A2A10', fontSize: 11, fontWeight: 700, margin: '0 0 2px' } }, 'UNLOCK ALL FOR'),
            React.createElement('span', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.primary, fontSize: 18, letterSpacing: 1 } }, '3 MORE QUESTS'),
          )
        )
      ),

      // Tales list
      React.createElement('div', { style: { padding: '8px 16px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
        tales.map((tale, i) =>
          React.createElement('div', { key: tale.id },
            React.createElement('div', {
              onClick: () => !tale.locked && setOpenTale(openTale === tale.id ? null : tale.id),
              style: {
                background: tale.locked ? t.surfaceAlt : t.card,
                border: `3px solid #1A1208`,
                borderRadius: 4,
                padding: '14px',
                cursor: tale.locked ? 'not-allowed' : 'pointer',
                transform: i % 2 === 1 ? 'rotate(-0.8deg)' : 'rotate(0.5deg)',
                boxShadow: tale.locked ? '2px 2px 0 rgba(0,0,0,0.2)' : `4px 4px 0 ${tale.color}`,
                opacity: tale.locked ? 0.8 : 1,
                position: 'relative',
                overflow: 'hidden',
              }
            },
              // Color accent bar
              React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: tale.color } }),
              React.createElement('div', { style: { paddingLeft: 10 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                    React.createElement('span', { style: { fontSize: 28 } }, tale.icon),
                    React.createElement('div', null,
                      React.createElement('h3', { style: { fontFamily: "'Bebas Neue', sans-serif", color: tale.locked ? t.textMuted : t.text, fontSize: 19, margin: 0, letterSpacing: 1 } }, tale.title),
                      React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: tale.color, fontSize: 11, margin: '2px 0 0', fontWeight: 700 } }, tale.subtitle),
                    )
                  ),
                  tale.locked
                    ? React.createElement(window.lucide.Lock, { size: 20, color: t.textMuted })
                    : React.createElement(window.lucide.ChevronDown, {
                        size: 20, color: t.primary,
                        style: { transform: openTale === tale.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }
                      })
                ),
                React.createElement('p', {
                  style: { fontFamily: "'Barlow', sans-serif", color: tale.locked ? t.textMuted : t.textSec, fontSize: 13, margin: '8px 0 0', lineHeight: 1.5, fontStyle: tale.locked ? 'italic' : 'normal' }
                }, tale.preview),
                // Expanded content
                openTale === tale.id && !tale.locked && React.createElement('div', {
                  style: { marginTop: 12, padding: '12px', background: `${tale.color}15`, borderRadius: 3, borderLeft: `3px solid ${tale.color}` }
                },
                  React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: t.textSec, fontSize: 13, margin: 0, lineHeight: 1.6 } }, tale.full),
                  React.createElement('button', {
                    style: {
                      marginTop: 10, background: tale.color, border: '2px solid #1A1208',
                      borderRadius: 3, padding: '8px 16px',
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: '#F2E8D0',
                      cursor: 'pointer', letterSpacing: 1,
                    }
                  }, 'SHARE THIS TALE')
                )
              )
            )
          )
        )
      )
    );
  };

  // ─── PROFILE SCREEN ────────────────────────────────────────────
  const ProfileScreen = () => {
    const badges = [
      { icon: '🌱', label: 'SEED STARTER' }, { icon: '🌊', label: 'CREEK KEEPER' },
      { icon: '♻️', label: 'ZERO WASTE', locked: true }, { icon: '🦋', label: 'POLLINATOR', locked: true },
      { icon: '☀️', label: 'SOLAR SCOUT' }, { icon: '🌿', label: 'NATIVE PLANTER' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
      // Profile header — overlapping cut-out panels
      React.createElement('div', { style: { background: t.primary, padding: '22px 20px 60px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', bottom: -30, right: -30, width: 120, height: 120, background: t.secondary, borderRadius: 4, transform: 'rotate(20deg)' } }),
        React.createElement('div', { style: { position: 'absolute', top: -30, left: -10, width: 80, height: 80, background: '#1A1208', opacity: 0.15, transform: 'rotate(45deg)' } }),
        React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center', position: 'relative', zIndex: 1 } },
          React.createElement('div', {
            style: {
              width: 72, height: 72, background: t.secondary, border: '3px solid #1A1208',
              borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, transform: 'rotate(-3deg)', boxShadow: '3px 3px 0 #1A1208',
              flexShrink: 0,
            }
          }, '🌿'),
          React.createElement('div', null,
            React.createElement('h1', { style: { fontFamily: "'Bebas Neue', sans-serif", color: '#F2E8D0', fontSize: 28, margin: 0, letterSpacing: 2 } }, 'MAYA CHEN'),
            React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#B8E8A0', fontSize: 12, margin: '3px 0', fontWeight: 600 } }, 'ECO-RAIDER · LEVEL 12'),
            React.createElement('p', { style: { fontFamily: "'Barlow', sans-serif", color: '#D4F0C8', fontSize: 12, margin: 0 } }, '📍 Willowdale District'),
          )
        )
      ),

      // Stats strip overlapping the header
      React.createElement('div', { style: { margin: '-36px 16px 0', position: 'relative', zIndex: 2 } },
        React.createElement('div', {
          style: {
            background: '#1A1208', border: `3px solid ${t.secondary}`, borderRadius: 4,
            padding: '14px 16px', display: 'flex', justifyContent: 'space-around',
            boxShadow: `4px 4px 0 ${t.secondary}`,
          }
        },
          [{ val: '2,840', label: 'XP' }, { val: '21', label: 'QUESTS' }, { val: '9', label: 'BADGES' }, { val: '38', label: 'DAYS' }].map(s =>
            React.createElement('div', { key: s.label, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.secondary, fontSize: 24, letterSpacing: 1, lineHeight: 1 } }, s.val),
              React.createElement('div', { style: { fontFamily: "'Barlow', sans-serif", color: '#8A9E7A', fontSize: 10, fontWeight: 700 } }, s.label),
            )
          )
        )
      ),

      // Badges section
      React.createElement('div', { style: { padding: '16px 16px 8px' } },
        React.createElement('h2', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.text, fontSize: 24, margin: '0 0 10px', letterSpacing: 1 } }, 'ECO-BADGES'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          badges.map(b =>
            React.createElement('div', {
              key: b.label,
              style: {
                background: b.locked ? t.surfaceAlt : t.card,
                border: `2px solid ${b.locked ? t.textMuted : '#1A1208'}`,
                borderRadius: 4, padding: '12px 8px', textAlign: 'center',
                opacity: b.locked ? 0.5 : 1,
                boxShadow: b.locked ? 'none' : '2px 2px 0 #1A1208',
              }
            },
              React.createElement('div', { style: { fontSize: 28, marginBottom: 4, filter: b.locked ? 'grayscale(1)' : 'none' } }, b.icon),
              React.createElement('div', { style: { fontFamily: "'Bebas Neue', sans-serif", color: b.locked ? t.textMuted : t.text, fontSize: 12, letterSpacing: 0.5, lineHeight: 1.2 } }, b.label),
              b.locked && React.createElement('div', { style: { marginTop: 3 } }, React.createElement(window.lucide.Lock, { size: 10, color: t.textMuted })),
            )
          )
        )
      ),

      // Settings
      React.createElement('div', { style: { padding: '8px 16px 24px' } },
        React.createElement('h2', { style: { fontFamily: "'Bebas Neue', sans-serif", color: t.text, fontSize: 24, margin: '0 0 10px', letterSpacing: 1 } }, 'SETTINGS'),
        React.createElement('div', { style: { background: t.card, border: '2px solid #1A1208', borderRadius: 4, overflow: 'hidden' } },
          [
            { label: 'Dark Mode', action: () => setDarkMode(!darkMode), isToggle: true, toggleVal: darkMode },
            { label: 'Notifications', action: () => {}, isToggle: true, toggleVal: true },
            { label: 'Team: Creek Defenders', action: () => {} },
            { label: 'Privacy Settings', action: () => {} },
            { label: 'Help & Feedback', action: () => {} },
          ].map((item, idx) =>
            React.createElement('div', {
              key: item.label,
              onClick: item.action,
              style: {
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '13px 14px',
                borderBottom: idx < 4 ? `1px solid ${t.border}20` : 'none',
                cursor: 'pointer',
              }
            },
              React.createElement('span', { style: { fontFamily: "'Barlow', sans-serif", color: t.text, fontSize: 14, fontWeight: 600 } }, item.label),
              item.isToggle
                ? React.createElement('div', {
                    style: {
                      width: 44, height: 24, borderRadius: 12, border: '2px solid #1A1208',
                      background: item.toggleVal ? t.primary : t.surfaceAlt,
                      position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                    }
                  },
                    React.createElement('div', {
                      style: {
                        position: 'absolute', top: 2, left: item.toggleVal ? 18 : 2,
                        width: 16, height: 16, borderRadius: '50%',
                        background: '#F2E8D0', border: '1px solid #1A1208',
                        transition: 'left 0.2s',
                      }
                    })
                  )
                : React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })
            )
          )
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    quests: QuestsScreen,
    league: LeagueScreen,
    tales: TalesScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Barlow', sans-serif",
      padding: '20px 0',
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3), 0 0 0 10px #1A1208, 0 0 0 12px #3A2A10',
        position: 'relative',
      }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
        React.createElement(ActiveScreen)
      ),
      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg,
          display: 'flex',
          borderTop: `3px solid ${t.secondary}`,
          paddingBottom: 6,
          flexShrink: 0,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 4px 4px',
              cursor: 'pointer',
              position: 'relative',
            }
          },
            activeTab === tab.id && React.createElement('div', {
              style: {
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 28, height: 3, background: t.navActive, borderRadius: '0 0 2px 2px',
              }
            }),
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.navActive : '#4A6040',
            }),
            React.createElement('span', {
              style: {
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 10,
                letterSpacing: 0.5,
                color: activeTab === tab.id ? t.navActive : '#4A6040',
                marginTop: 2,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
