const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [joinedRituals, setJoinedRituals] = useState({});
  const [activeCoven, setActiveCoven] = useState(null);
  const [selectedDay, setSelectedDay] = useState(2);
  const [whisperActive, setWhisperActive] = useState(null);
  const [starlightPoints, setStarlightPoints] = useState(1247);
  const [showRitualDetail, setShowRitualDetail] = useState(null);
  const [userLevel, setUserLevel] = useState(7);

  const themes = {
    light: {
      bg: '#FAF5FF',
      surface: '#FFFFFF',
      surfaceAlt: '#F3E8FF',
      card: '#FFFFFF',
      cardAlt: '#F5F0FF',
      text: '#1A0533',
      textSecondary: '#6B5B7B',
      textTertiary: '#9B8AAD',
      border: '#E9D5FF',
      primary: '#7C3AED',
      primaryLight: '#A78BFA',
      primaryFaint: '#EDE9FE',
      cta: '#22C55E',
      ctaLight: '#DCFCE7',
      danger: '#EF4444',
      overlay: 'rgba(124, 58, 237, 0.08)',
      shadow: 'rgba(124, 58, 237, 0.12)',
      navBg: 'rgba(255,255,255,0.92)',
    },
    dark: {
      bg: '#0F0A1A',
      surface: '#1A1128',
      surfaceAlt: '#241836',
      card: '#1E1432',
      cardAlt: '#281C40',
      text: '#F3E8FF',
      textSecondary: '#B8A5CC',
      textTertiary: '#7B6A8E',
      border: '#3D2B5A',
      primary: '#A78BFA',
      primaryLight: '#7C3AED',
      primaryFaint: '#2D1F4E',
      cta: '#22C55E',
      ctaLight: '#0B3D1F',
      danger: '#EF4444',
      overlay: 'rgba(167, 139, 250, 0.08)',
      shadow: 'rgba(0, 0, 0, 0.4)',
      navBg: 'rgba(15,10,26,0.92)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = React.createElement('style', { dangerouslySetInnerHTML: { __html: `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.85; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes livePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
      50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes waveform {
      0%, 100% { height: 8px; }
      50% { height: 20px; }
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
  `}});

  const Icon = ({ name, size = 20, color, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color: color || t.text, style, strokeWidth: 1.8 });
  };

  // ============ HOME SCREEN ============
  const HomeScreen = () => {
    const liveRituals = [
      { id: 'r1', name: 'Midnight Recharge', type: 'Meditation', participants: 23, live: true, startTime: '11:30 PM', icon: 'Moon' },
      { id: 'r2', name: 'Dawn Wind-Down', type: 'Breathing', participants: 15, live: false, startTime: '5:00 AM', icon: 'Sunrise' },
      { id: 'r3', name: 'Power Hour Prep', type: 'Meal Prep', participants: 8, live: false, startTime: '9:00 PM', icon: 'ChefHat' },
    ];

    const covenActivity = [
      { user: 'Sarah M.', action: 'completed Dawn Wind-Down', time: '2m ago', avatar: '#A78BFA' },
      { user: 'Marcus T.', action: 'joined Security Sentinels', time: '15m ago', avatar: '#22C55E' },
      { user: 'Priya K.', action: 'earned Starlight Badge', time: '1h ago', avatar: '#F59E0B' },
    ];

    const progressPercent = (starlightPoints % 500) / 500 * 100;
    const nextLevel = Math.floor(starlightPoints / 500) + 1;

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.textSecondary, fontFamily: font } }, 'Good evening'),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Night Owl')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.primary })),
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 20,
              background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: 'User', size: 18, color: '#FFF' }))
        )
      ),

      // Starlight Progress Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #7C3AED, #5B21B6, #4C1D95)`,
          borderRadius: 20, padding: '20px', marginBottom: 20,
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
          position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: 50, background: 'rgba(255,255,255,0.08)'
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, left: -10, width: 80, height: 80,
            borderRadius: 40, background: 'rgba(255,255,255,0.05)'
          }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 } }, 'Starlight XP'),
            React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: '#FFF', fontFamily: font, letterSpacing: -0.5 } }, starlightPoints.toLocaleString())
          ),
          React.createElement('div', {
            style: {
              background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '6px 12px',
              display: 'flex', alignItems: 'center', gap: 6
            }
          },
            React.createElement(Icon, { name: 'Star', size: 14, color: '#FDE68A' }),
            React.createElement('span', { style: { color: '#FDE68A', fontSize: 13, fontWeight: 700, fontFamily: font } }, `Level ${userLevel}`)
          )
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 8 } },
          React.createElement('div', { style: {
            width: `${progressPercent}%`, height: '100%',
            background: 'linear-gradient(90deg, #22C55E, #4ADE80)',
            borderRadius: 6, transition: 'width 0.5s ease'
          }})
        ),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: font } },
          `${500 - (starlightPoints % 500)} XP to Level ${nextLevel}`
        )
      ),

      // Live Rituals
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font } }, 'Tonight\'s Rituals'),
        React.createElement('button', {
          onClick: () => setActiveScreen('rituals'),
          style: { background: 'none', border: 'none', color: t.primary, fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer' }
        }, 'See all')
      ),

      ...liveRituals.map((ritual, i) =>
        React.createElement('div', {
          key: ritual.id,
          onClick: () => {
            if (ritual.live) {
              setJoinedRituals(prev => ({ ...prev, [ritual.id]: !prev[ritual.id] }));
              if (!joinedRituals[ritual.id]) setStarlightPoints(p => p + 25);
            } else {
              setActiveScreen('rituals');
            }
          },
          style: {
            background: t.card, borderRadius: 16, padding: '16px',
            marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14,
            border: `1px solid ${ritual.live ? 'rgba(34,197,94,0.3)' : t.border}`,
            boxShadow: `0 2px 8px ${t.shadow}`,
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`
          }
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 14,
              background: ritual.live ? 'linear-gradient(135deg, #22C55E, #16A34A)' : t.primaryFaint,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              animation: ritual.live ? 'livePulse 2s infinite' : 'none'
            }
          }, React.createElement(Icon, { name: ritual.icon, size: 22, color: ritual.live ? '#FFF' : t.primary })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 } },
              React.createElement('span', { style: { fontSize: 16, fontWeight: 600, color: t.text, fontFamily: font } }, ritual.name),
              ritual.live && React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: 700, color: '#FFF', background: '#22C55E',
                  borderRadius: 6, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: 0.5
                }
              }, 'LIVE')
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } },
              `${ritual.type} \u00B7 ${ritual.participants} joined \u00B7 ${ritual.startTime}`
            )
          ),
          joinedRituals[ritual.id]
            ? React.createElement('div', { style: { width: 36, height: 36, borderRadius: 18, background: t.ctaLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Check', size: 18, color: t.cta }))
            : React.createElement(Icon, { name: 'ChevronRight', size: 20, color: t.textTertiary })
        )
      ),

      // Coven Activity
      React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font, marginTop: 10, marginBottom: 14 } }, 'Coven Activity'),
      ...covenActivity.map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
            borderBottom: i < covenActivity.length - 1 ? `1px solid ${t.border}` : 'none',
            animation: `fadeIn 0.4s ease ${0.3 + i * 0.1}s both`
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18, background: item.avatar,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement('span', { style: { color: '#FFF', fontSize: 14, fontWeight: 700, fontFamily: font } }, item.user[0])),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, color: t.text, fontFamily: font } },
              React.createElement('span', { style: { fontWeight: 600 } }, item.user), ` ${item.action}`
            ),
            React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: font } }, item.time)
          )
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ============ RITUALS SCREEN ============
  const RitualsScreen = () => {
    const [filter, setFilter] = useState('all');
    const categories = ['all', 'meditation', 'breathing', 'movement', 'social', 'meal prep'];

    const rituals = [
      { id: 'r1', name: 'Midnight Recharge', category: 'meditation', desc: 'Reset your mind with guided meditation', time: '11:30 PM', duration: '20 min', participants: 23, live: true, icon: 'Moon', color: '#7C3AED' },
      { id: 'r2', name: 'Dawn Wind-Down', category: 'breathing', desc: 'Gentle breathing to prepare for rest', time: '5:00 AM', duration: '15 min', participants: 15, live: false, icon: 'Sunrise', color: '#F59E0B' },
      { id: 'r3', name: 'Power Hour Prep', category: 'meal prep', desc: 'Cook nutritious meals for your shift week', time: '9:00 PM', duration: '45 min', participants: 8, live: false, icon: 'ChefHat', color: '#EF4444' },
      { id: 'r4', name: 'Night Flow Yoga', category: 'movement', desc: 'Low-impact yoga for tired muscles', time: '10:00 PM', duration: '30 min', participants: 19, live: true, icon: 'Heart', color: '#EC4899' },
      { id: 'r5', name: 'Shift Swap Stories', category: 'social', desc: 'Share funny and wild shift stories', time: '1:00 AM', duration: '25 min', participants: 31, live: false, icon: 'MessageCircle', color: '#22C55E' },
      { id: 'r6', name: 'Pre-Shift Power Up', category: 'movement', desc: 'Quick energizing routine before clocking in', time: '8:30 PM', duration: '10 min', participants: 12, live: false, icon: 'Zap', color: '#3B82F6' },
    ];

    const filtered = filter === 'all' ? rituals : rituals.filter(r => r.category === filter);

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'Rituals'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 20 } }, 'Scheduled group activities for your well-being'),

      // Category pills
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 } },
        ...categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setFilter(cat),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', whiteSpace: 'nowrap',
              background: filter === cat ? t.primary : t.surfaceAlt,
              color: filter === cat ? '#FFF' : t.textSecondary,
              fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer',
              transition: 'all 0.2s ease', textTransform: 'capitalize'
            }
          }, cat)
        )
      ),

      // Ritual cards
      ...filtered.map((ritual, i) =>
        React.createElement('div', {
          key: ritual.id,
          onClick: () => {
            setJoinedRituals(prev => ({ ...prev, [ritual.id]: !prev[ritual.id] }));
            if (!joinedRituals[ritual.id]) setStarlightPoints(p => p + 25);
          },
          style: {
            background: t.card, borderRadius: 20, padding: 0, marginBottom: 14,
            border: `1px solid ${t.border}`, boxShadow: `0 4px 16px ${t.shadow}`,
            overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`
          }
        },
          // Top bar with color
          React.createElement('div', { style: { height: 4, background: ritual.color } }),
          React.createElement('div', { style: { padding: '16px 18px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
              React.createElement('div', {
                style: {
                  width: 52, height: 52, borderRadius: 16,
                  background: `${ritual.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }
              }, React.createElement(Icon, { name: ritual.icon, size: 24, color: ritual.color })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                  React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, ritual.name),
                  ritual.live && React.createElement('span', {
                    style: {
                      fontSize: 10, fontWeight: 700, color: '#FFF', background: '#22C55E',
                      borderRadius: 6, padding: '2px 8px', textTransform: 'uppercase',
                      animation: 'pulse 2s infinite'
                    }
                  }, 'LIVE')
                ),
                React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, marginBottom: 10 } }, ritual.desc),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                    React.createElement(Icon, { name: 'Clock', size: 14, color: t.textTertiary }),
                    React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, `${ritual.time} \u00B7 ${ritual.duration}`)
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                    React.createElement(Icon, { name: 'Users', size: 14, color: t.textTertiary }),
                    React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, `${ritual.participants}`)
                  )
                )
              ),
              React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); setJoinedRituals(prev => ({ ...prev, [ritual.id]: !prev[ritual.id] })); if (!joinedRituals[ritual.id]) setStarlightPoints(p => p + 25); },
                style: {
                  width: 44, height: 44, borderRadius: 14, border: 'none',
                  background: joinedRituals[ritual.id] ? t.cta : t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s ease', flexShrink: 0
                }
              }, React.createElement(Icon, { name: joinedRituals[ritual.id] ? 'Check' : 'Plus', size: 20, color: '#FFF' }))
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ============ COVENS SCREEN ============
  const CovensScreen = () => {
    const covens = [
      { id: 'c1', name: 'Healthcare Heroes', members: 48, desc: 'Nurses, doctors, and medical staff thriving together', icon: 'HeartPulse', color: '#EF4444', xp: 8420, level: 12, active: 6 },
      { id: 'c2', name: 'Logistics Legends', members: 35, desc: 'Warehouse and delivery crew keeping the world moving', icon: 'Truck', color: '#3B82F6', xp: 6100, level: 9, active: 3 },
      { id: 'c3', name: 'Security Sentinels', members: 27, desc: 'Guards and protectors watching over the night', icon: 'Shield', color: '#F59E0B', xp: 5500, level: 8, active: 5 },
      { id: 'c4', name: 'Code Owls', members: 22, desc: 'Developers and engineers coding through the night', icon: 'Code', color: '#A78BFA', xp: 7200, level: 10, active: 8 },
    ];

    const chatMessages = [
      { user: 'Alex R.', msg: 'Anyone else doing the Dawn Wind-Down tonight?', time: '11:42 PM', color: '#A78BFA' },
      { user: 'Jamie L.', msg: 'Count me in! Could really use it after today', time: '11:44 PM', color: '#22C55E' },
      { user: 'Morgan S.', msg: 'I just completed the Midnight Recharge \u2013 feeling amazing', time: '11:48 PM', color: '#F59E0B' },
      { user: 'Taylor K.', msg: 'Nice! What level did you hit?', time: '11:50 PM', color: '#3B82F6' },
    ];

    if (activeCoven) {
      const coven = covens.find(c => c.id === activeCoven);
      return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.3s ease' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 } },
          React.createElement('button', {
            onClick: () => setActiveCoven(null),
            style: { width: 44, height: 44, borderRadius: 14, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: 'ArrowLeft', size: 20 })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font } }, coven.name),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${coven.members} members \u00B7 ${coven.active} online`)
          )
        ),

        // Chat area
        React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 20, padding: 16, marginBottom: 16, minHeight: 300 } },
          ...chatMessages.map((msg, i) =>
            React.createElement('div', {
              key: i,
              style: { marginBottom: 16, animation: `slideUp 0.3s ease ${i * 0.08}s both` }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                React.createElement('div', {
                  style: { width: 28, height: 28, borderRadius: 14, background: msg.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                }, React.createElement('span', { style: { color: '#FFF', fontSize: 11, fontWeight: 700, fontFamily: font } }, msg.user[0])),
                React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font } }, msg.user),
                React.createElement('span', { style: { fontSize: 11, color: t.textTertiary, fontFamily: font } }, msg.time)
              ),
              React.createElement('div', {
                style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginLeft: 36, background: t.card, padding: '10px 14px', borderRadius: '4px 16px 16px 16px' }
              }, msg.msg)
            )
          )
        ),

        // Input
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('div', {
            style: {
              flex: 1, background: t.surfaceAlt, borderRadius: 24, padding: '12px 18px',
              fontSize: 15, color: t.textTertiary, fontFamily: font, border: `1px solid ${t.border}`
            }
          }, 'Message your coven...'),
          React.createElement('button', {
            style: { width: 48, height: 48, borderRadius: 24, background: t.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: 'Send', size: 20, color: '#FFF' }))
        )
      );
    }

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'Covens'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 20 } }, 'Your identity-based communities'),

      // Create coven CTA
      React.createElement('div', {
        style: {
          background: t.surfaceAlt, borderRadius: 20, padding: '20px',
          marginBottom: 20, border: `2px dashed ${t.border}`,
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer'
        }
      },
        React.createElement('div', {
          style: { width: 48, height: 48, borderRadius: 14, background: t.primaryFaint, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, React.createElement(Icon, { name: 'Plus', size: 22, color: t.primary })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 16, fontWeight: 600, color: t.text, fontFamily: font } }, 'Create a New Coven'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, 'Gather your shift crew together')
        )
      ),

      // Coven cards
      ...covens.map((coven, i) =>
        React.createElement('div', {
          key: coven.id,
          onClick: () => setActiveCoven(coven.id),
          style: {
            background: t.card, borderRadius: 20, padding: '18px',
            marginBottom: 14, border: `1px solid ${t.border}`,
            boxShadow: `0 4px 16px ${t.shadow}`, cursor: 'pointer',
            transition: 'transform 0.2s', animation: `slideUp 0.4s ease ${i * 0.1}s both`
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 } },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: `${coven.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: coven.icon, size: 24, color: coven.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, coven.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, coven.desc)
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 16 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, coven.members)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Star', size: 14, color: '#FDE68A' }),
                React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, `Lv ${coven.level}`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#22C55E' } }),
                React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, `${coven.active} active`)
              )
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
          )
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ============ PLANNER SCREEN ============
  const PlannerScreen = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = [7, 8, 9, 10, 11, 12, 13];

    const shifts = [
      { day: 0, label: 'Night Shift', time: '10 PM \u2013 6 AM', color: '#7C3AED' },
      { day: 1, label: 'Night Shift', time: '10 PM \u2013 6 AM', color: '#7C3AED' },
      { day: 2, label: 'Night Shift', time: '11 PM \u2013 7 AM', color: '#5B21B6' },
      { day: 3, label: 'Off', time: 'Rest Day', color: '#22C55E' },
      { day: 4, label: 'Night Shift', time: '10 PM \u2013 6 AM', color: '#7C3AED' },
      { day: 5, label: 'Night Shift', time: '10 PM \u2013 6 AM', color: '#7C3AED' },
      { day: 6, label: 'Off', time: 'Rest Day', color: '#22C55E' },
    ];

    const suggestedRituals = [
      { time: '9:00 PM', name: 'Pre-Shift Power Up', type: 'Movement', duration: '10 min', autoScheduled: true },
      { time: '2:00 AM', name: 'Midnight Recharge', type: 'Meditation', duration: '20 min', autoScheduled: true },
      { time: '6:30 AM', name: 'Dawn Wind-Down', type: 'Breathing', duration: '15 min', autoScheduled: false },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'ShiftSync'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 20 } }, 'Your planner, synced to your rhythm'),

      // Week selector
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 20 } },
        ...days.map((day, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => setSelectedDay(i),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 16, border: 'none',
              background: selectedDay === i ? t.primary : t.surfaceAlt,
              cursor: 'pointer', transition: 'all 0.2s ease',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
            }
          },
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: selectedDay === i ? 'rgba(255,255,255,0.7)' : t.textTertiary, fontFamily: font } }, day),
            React.createElement('span', { style: { fontSize: 16, fontWeight: 700, color: selectedDay === i ? '#FFF' : t.text, fontFamily: font } }, dates[i])
          )
        )
      ),

      // Today's shift
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${shifts[selectedDay].color}, ${shifts[selectedDay].color}CC)`,
          borderRadius: 20, padding: '20px', marginBottom: 20,
          boxShadow: `0 8px 24px ${shifts[selectedDay].color}40`
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 } },
          React.createElement(Icon, { name: shifts[selectedDay].label === 'Off' ? 'BedDouble' : 'Briefcase', size: 22, color: '#FFF' }),
          React.createElement('span', { style: { fontSize: 20, fontWeight: 700, color: '#FFF', fontFamily: font } }, shifts[selectedDay].label)
        ),
        React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.8)', fontFamily: font } }, shifts[selectedDay].time),
        shifts[selectedDay].label !== 'Off' && React.createElement('div', {
          style: { marginTop: 12, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }
        },
          React.createElement(Icon, { name: 'Sparkles', size: 16, color: '#FDE68A' }),
          React.createElement('span', { style: { fontSize: 13, color: '#FFF', fontFamily: font } }, '3 rituals auto-suggested for this shift')
        )
      ),

      // Suggested rituals timeline
      React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Suggested Rituals'),
      ...suggestedRituals.map((ritual, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', gap: 14, marginBottom: 16,
            animation: `slideUp 0.4s ease ${i * 0.1}s both`
          }
        },
          // Timeline line
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 50, flexShrink: 0 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textSecondary, fontFamily: font, marginBottom: 6 } }, ritual.time),
            React.createElement('div', { style: { width: 10, height: 10, borderRadius: 5, background: t.primary, flexShrink: 0 } }),
            i < suggestedRituals.length - 1 && React.createElement('div', { style: { width: 2, flex: 1, background: t.border, marginTop: 4 } })
          ),
          // Card
          React.createElement('div', {
            style: {
              flex: 1, background: t.card, borderRadius: 16, padding: '14px 16px',
              border: `1px solid ${t.border}`, boxShadow: `0 2px 8px ${t.shadow}`
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, ritual.name),
                React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${ritual.type} \u00B7 ${ritual.duration}`)
              ),
              ritual.autoScheduled
                ? React.createElement('div', { style: { background: t.ctaLight, borderRadius: 8, padding: '4px 10px' } },
                    React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.cta, fontFamily: font } }, 'Auto'))
                : React.createElement('button', {
                    style: { background: t.primaryFaint, borderRadius: 8, padding: '4px 10px', border: 'none', cursor: 'pointer' }
                  }, React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.primary, fontFamily: font } }, 'Add'))
            )
          )
        )
      ),

      // Sleep stats
      React.createElement('div', {
        style: { background: t.card, borderRadius: 20, padding: '18px', marginTop: 4, border: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Sleep Window'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement(Icon, { name: 'BedDouble', size: 20, color: t.primary, style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font } }, '7:30 AM'),
            React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: font } }, 'Bedtime')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
            React.createElement(Icon, { name: 'ArrowRight', size: 20, color: t.textTertiary })
          ),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement(Icon, { name: 'AlarmClock', size: 20, color: t.cta, style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font } }, '3:30 PM'),
            React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: font } }, 'Wake Up')
          ),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement(Icon, { name: 'Timer', size: 20, color: '#F59E0B', style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font } }, '8h'),
            React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: font } }, 'Duration')
          )
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ============ WHISPER SCREEN ============
  const WhisperScreen = () => {
    const channels = [
      { id: 'w1', name: 'Post-Shift Debrief', desc: 'Decompress and share your night', listeners: 12, speakers: 3, live: true, icon: 'Coffee' },
      { id: 'w2', name: 'Morning Meditation', desc: 'Guided wind-down before sleep', listeners: 28, speakers: 1, live: true, icon: 'CloudMoon' },
      { id: 'w3', name: 'Night Owl Lounge', desc: 'Open mic for night shift chat', listeners: 7, speakers: 2, live: false, icon: 'Mic' },
      { id: 'w4', name: 'Gratitude Circle', desc: 'Share one thing you are grateful for', listeners: 15, speakers: 4, live: false, icon: 'Heart' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'Whisper'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 8 } }, 'Low-light, audio-first spaces'),

      // Tip banner
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primaryFaint}, ${t.surfaceAlt})`,
          borderRadius: 16, padding: '14px 16px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
          border: `1px solid ${t.border}`
        }
      },
        React.createElement(Icon, { name: 'Volume1', size: 20, color: t.primary }),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, 'Whisper channels use low-light mode. Easy on your eyes after a long shift.')
      ),

      ...channels.map((ch, i) =>
        React.createElement('div', {
          key: ch.id,
          onClick: () => setWhisperActive(whisperActive === ch.id ? null : ch.id),
          style: {
            background: whisperActive === ch.id ? `linear-gradient(135deg, ${t.primary}15, ${t.primary}08)` : t.card,
            borderRadius: 20, padding: '18px', marginBottom: 14,
            border: `1px solid ${whisperActive === ch.id ? t.primary + '40' : t.border}`,
            boxShadow: `0 4px 16px ${t.shadow}`, cursor: 'pointer',
            transition: 'all 0.3s ease',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 } },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: ch.live ? `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})` : t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: ch.icon, size: 22, color: ch.live ? '#FFF' : t.textSecondary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, ch.name),
                ch.live && React.createElement('div', {
                  style: { width: 8, height: 8, borderRadius: 4, background: '#22C55E', animation: 'pulse 2s infinite' }
                })
              ),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, ch.desc)
            )
          ),

          // Waveform and stats
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 14 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Headphones', size: 14, color: t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, `${ch.listeners} listening`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Mic', size: 14, color: t.textTertiary }),
                React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font } }, `${ch.speakers} speaking`)
              )
            ),
            whisperActive === ch.id
              ? React.createElement('button', {
                  onClick: (e) => { e.stopPropagation(); setWhisperActive(null); },
                  style: { background: t.danger, border: 'none', borderRadius: 12, padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
                },
                  React.createElement(Icon, { name: 'PhoneOff', size: 14, color: '#FFF' }),
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#FFF', fontFamily: font } }, 'Leave')
                )
              : React.createElement('button', {
                  onClick: (e) => { e.stopPropagation(); setWhisperActive(ch.id); },
                  style: { background: t.primary, border: 'none', borderRadius: 12, padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
                },
                  React.createElement(Icon, { name: 'Headphones', size: 14, color: '#FFF' }),
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#FFF', fontFamily: font } }, 'Tune In')
                )
          ),

          // Active waveform when joined
          whisperActive === ch.id && React.createElement('div', {
            style: { marginTop: 14, background: t.surfaceAlt, borderRadius: 12, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }
          },
            ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((_, idx) =>
              React.createElement('div', {
                key: idx,
                style: {
                  width: 3, borderRadius: 2, background: t.primary,
                  animation: `waveform ${0.5 + Math.random() * 0.8}s ease-in-out ${idx * 0.05}s infinite alternate`,
                  opacity: 0.4 + Math.random() * 0.6
                }
              })
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ============ NAV & LAYOUT ============
  const screens = { home: HomeScreen, rituals: RitualsScreen, covens: CovensScreen, planner: PlannerScreen, whisper: WhisperScreen };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'rituals', label: 'Rituals', icon: 'Sparkles' },
    { id: 'covens', label: 'Covens', icon: 'Users' },
    { id: 'planner', label: 'Planner', icon: 'Calendar' },
    { id: 'whisper', label: 'Whisper', icon: 'Headphones' },
  ];

  const ScreenContent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg, borderRadius: 40,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease'
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 }
      },
        React.createElement(ScreenContent)
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`, padding: '8px 8px 24px',
          display: 'flex', justifyContent: 'space-around'
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => { setActiveScreen(item.id); if (item.id === 'covens') setActiveCoven(null); },
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '6px 12px', borderRadius: 12,
              minWidth: 48, minHeight: 44,
              transition: 'all 0.2s ease',
              opacity: activeScreen === item.id ? 1 : 0.5
            }
          },
            React.createElement(Icon, {
              name: item.icon, size: 22,
              color: activeScreen === item.id ? t.primary : t.textSecondary
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === item.id ? 700 : 500,
                color: activeScreen === item.id ? t.primary : t.textSecondary,
                fontFamily: font
              }
            }, item.label)
          )
        )
      )
    )
  );
}
