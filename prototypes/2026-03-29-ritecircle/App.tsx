const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1A1410',
    surface: '#231E18',
    surfaceAlt: '#2D261E',
    card: '#2D261E',
    cardBorder: '#3D3328',
    primary: '#E8724A',
    primaryLight: '#F08B6A',
    accent: '#C4956A',
    text: '#F5EDE0',
    textMuted: '#A89880',
    textFaint: '#6B5C4E',
    navBg: '#1A1410',
    navBorder: '#2D261E',
    statusBar: '#F5EDE0',
    tag: '#3D3328',
    tagText: '#E8724A',
  },
  light: {
    bg: '#FAF6F0',
    surface: '#FFFFFF',
    surfaceAlt: '#F5EDE0',
    card: '#FFFFFF',
    cardBorder: '#E8DDD0',
    primary: '#E8724A',
    primaryLight: '#F08B6A',
    accent: '#C4956A',
    text: '#2A1F14',
    textMuted: '#7A6050',
    textFaint: '#B0968A',
    navBg: '#FFFFFF',
    navBorder: '#E8DDD0',
    statusBar: '#2A1F14',
    tag: '#F5EDE0',
    tagText: '#E8724A',
  }
};

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 0px; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes ripple { 0%{transform:scale(0.95);opacity:0.8} 100%{transform:scale(1);opacity:1} }
`;

const CIRCLES = [
  { id: 1, name: 'Morning Ink', tag: 'Writing', members: 8, time: '6:30 AM', days: 'Daily', keeper: 'Amara J.', color: '#E8724A', streak: 14, nextIn: '2h 30m', description: 'Morning pages & creative writing prompts to start the day with intention.' },
  { id: 2, name: 'Diaspora Roots', tag: 'Heritage', members: 11, time: '8:00 PM', days: 'Tue & Thu', keeper: 'Kofi M.', color: '#C4956A', streak: 7, nextIn: 'Tomorrow', description: 'West African storytelling traditions, music, and cultural practice.' },
  { id: 3, name: 'Stillness', tag: 'Mindfulness', members: 6, time: '7:00 AM', days: 'Daily', keeper: 'Yuki T.', color: '#8FA888', streak: 21, nextIn: '3h 45m', description: 'Guided breathwork and silent sitting for community grounding.' },
  { id: 4, name: 'Cipher Sundays', tag: 'Music', members: 9, time: '4:00 PM', days: 'Sunday', keeper: 'Darius C.', color: '#7B8FA8', streak: 5, nextIn: '4 days', description: 'Freestyle sessions, beat sharing, and lyric workshopping.' },
];

const TOKENS = [
  { id: 1, label: 'RiteKeeper', count: 3, icon: '👑', color: '#E8724A' },
  { id: 2, label: 'Streak 21', count: 1, icon: '🔥', color: '#C4956A' },
  { id: 3, label: 'First Circle', count: 1, icon: '⭕', color: '#8FA888' },
  { id: 4, label: 'Storyteller', count: 5, icon: '📖', color: '#7B8FA8' },
];

const FEED_EVENTS = [
  { id: 1, circle: 'Morning Ink', user: 'Amara J.', action: 'led today\'s ritual', time: '2h ago', type: 'keeper', avatar: 'AJ' },
  { id: 2, circle: 'Stillness', user: 'Yuki T.', action: 'hit a 21-day streak 🔥', time: '5h ago', type: 'streak', avatar: 'YT' },
  { id: 3, circle: 'Diaspora Roots', user: 'Kofi M.', action: 'shared a new story token', time: '8h ago', type: 'token', avatar: 'KM' },
];

function Avatar({ initials, size = 36, color = '#E8724A', t }) {
  return React.createElement('div', {
    style: {
      width: size, height: size, borderRadius: '50%',
      background: color + '30',
      border: `2px solid ${color}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      fontSize: size * 0.33, fontWeight: 600,
      color: color, flexShrink: 0,
    }
  }, initials);
}

function Tag({ label, t }) {
  return React.createElement('span', {
    style: {
      background: t.tag, color: t.tagText,
      fontFamily: "'Inter', sans-serif",
      fontSize: 10, fontWeight: 600,
      padding: '3px 9px', borderRadius: 20,
      letterSpacing: '0.08em', textTransform: 'uppercase',
    }
  }, label);
}

function HomeScreen({ t }) {
  const [pressed, setPressed] = useState(null);
  const todayCircles = CIRCLES.filter(c => c.nextIn.includes('h') || c.nextIn.includes('m'));

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    // Hero header
    React.createElement('div', {
      style: {
        padding: '20px 24px 0',
        background: t.bg,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 } },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }
          }, 'Sunday, Mar 29'),
          React.createElement('h1', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: t.text, lineHeight: 1.1 }
          }, 'Your\nRituals'),
        ),
        React.createElement(Avatar, { initials: 'SL', size: 42, color: t.primary, t }),
      ),
    ),

    // Today's live ribbon
    React.createElement('div', {
      style: { padding: '20px 24px 12px' }
    },
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16
        }
      },
        React.createElement('div', {
          style: {
            width: 8, height: 8, borderRadius: '50%', background: '#E85A5A',
            animation: 'pulse 1.5s infinite',
            boxShadow: '0 0 6px #E85A5A'
          }
        }),
        React.createElement('span', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#E85A5A', letterSpacing: '0.08em', textTransform: 'uppercase' }
        }, 'Live Today'),
      ),

      // Angled overlapping cards
      React.createElement('div', { style: { position: 'relative', height: 200, marginBottom: 16 } },
        todayCircles.map((circle, i) =>
          React.createElement('div', {
            key: circle.id,
            onClick: () => setPressed(pressed === circle.id ? null : circle.id),
            style: {
              position: 'absolute',
              left: i * 18,
              top: i * 12,
              width: 280,
              background: t.card,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 18,
              padding: '16px 18px',
              transform: `rotate(${i === 0 ? -2 : i === 1 ? 1.5 : -0.5}deg) scale(${pressed === circle.id ? 0.97 : 1})`,
              boxShadow: `0 ${4 + i * 4}px ${16 + i * 8}px rgba(0,0,0,0.18)`,
              zIndex: todayCircles.length - i,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              borderLeft: `4px solid ${circle.color}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement(Tag, { label: circle.tag, t }),
                React.createElement('h3', {
                  style: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: t.text, marginTop: 6 }
                }, circle.name),
              ),
              React.createElement('div', {
                style: {
                  background: circle.color + '20', border: `1px solid ${circle.color}40`,
                  borderRadius: 10, padding: '4px 10px',
                  fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: circle.color
                }
              }, circle.nextIn),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(window.lucide.Clock, { size: 13, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, circle.time),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(window.lucide.Crown, { size: 13, color: t.accent }),
                React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, circle.keeper),
              ),
            ),
          )
        ),
      ),
    ),

    // Streak bar
    React.createElement('div', {
      style: {
        margin: '0 24px 24px',
        background: t.surface,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 14,
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 14,
      }
    },
      React.createElement('span', { style: { fontSize: 24 } }, '🔥'),
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: t.text }
        }, '14-Day Streak'),
        React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, 'Morning Ink — keep it alive today'),
      ),
      React.createElement('div', {
        style: { marginLeft: 'auto', display: 'flex', gap: 3 }
      },
        [1,2,3,4,5,6,7].map(d =>
          React.createElement('div', {
            key: d,
            style: {
              width: 6, height: 24, borderRadius: 3,
              background: d <= 5 ? t.primary : t.tag
            }
          })
        )
      ),
    ),

    // Activity feed
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('h2', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, 'Circle Activity'),
      FEED_EVENTS.map(ev =>
        React.createElement('div', {
          key: ev.id,
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 16, padding: '12px 14px',
            background: t.surface, borderRadius: 12,
            border: `1px solid ${t.cardBorder}`,
          }
        },
          React.createElement(Avatar, { initials: ev.avatar, size: 36, color: t.primary, t }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 13, color: t.text, lineHeight: 1.4 }
            },
              React.createElement('strong', null, ev.user), ' ', ev.action,
            ),
            React.createElement('p', {
              style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted, marginTop: 2 }
            }, ev.circle + ' · ' + ev.time),
          ),
        )
      ),
    ),
  );
}

function CirclesScreen({ t }) {
  const [selected, setSelected] = useState(null);
  const [joined, setJoined] = useState([1, 3]);

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    React.createElement('div', { style: { padding: '20px 24px 16px' } },
      React.createElement('h1', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: t.text, marginBottom: 4 }
      }, 'Find Your\nCircle'),
      React.createElement('p', {
        style: { fontFamily: "'Inter', sans-serif", fontSize: 13, color: t.textMuted }
      }, '5–12 members · Sync rituals · Real accountability'),
    ),

    // Search bar
    React.createElement('div', {
      style: {
        margin: '0 24px 20px',
        background: t.surface, border: `1px solid ${t.cardBorder}`,
        borderRadius: 12, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }
    },
      React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
      React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 14, color: t.textFaint } }, 'Search by name, tag, or ritual…'),
    ),

    // Circles list
    CIRCLES.map((circle, i) => {
      const isJoined = joined.includes(circle.id);
      const isOpen = selected === circle.id;
      return React.createElement('div', {
        key: circle.id,
        style: {
          margin: `0 ${i % 2 === 0 ? 24 : 20}px 16px ${i % 2 === 0 ? 20 : 24}px`,
          background: t.card,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 18,
          overflow: 'hidden',
          transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.1)`,
          transition: 'transform 0.2s',
        }
      },
        // Card top strip
        React.createElement('div', {
          style: {
            height: 5, background: circle.color,
          }
        }),
        React.createElement('div', {
          onClick: () => setSelected(isOpen ? null : circle.id),
          style: { padding: '16px 18px', cursor: 'pointer' }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement(Tag, { label: circle.tag, t }),
              React.createElement('h3', {
                style: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: t.text, marginTop: 6, lineHeight: 1.2 }
              }, circle.name),
            ),
            isJoined ? React.createElement('div', {
              style: {
                background: circle.color + '20', border: `1px solid ${circle.color}`,
                borderRadius: 20, padding: '4px 12px',
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: circle.color
              }
            }, 'Joined') : null,
          ),
          React.createElement('p', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, lineHeight: 1.5 }
          }, circle.description),
          isOpen ? React.createElement('div', {
            style: { marginTop: 14, padding: '12px 0', borderTop: `1px solid ${t.cardBorder}` }
          },
            React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 12 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(window.lucide.Users, { size: 14, color: t.accent }),
                React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, `${circle.members}/12 members`),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(window.lucide.Clock, { size: 14, color: t.accent }),
                React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, `${circle.time} · ${circle.days}`),
              ),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement(window.lucide.Crown, { size: 14, color: circle.color }),
              React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, `RiteKeeper today: ${circle.keeper}`),
            ),
            React.createElement('button', {
              onClick: (e) => {
                e.stopPropagation();
                setJoined(isJoined ? joined.filter(id => id !== circle.id) : [...joined, circle.id]);
              },
              style: {
                marginTop: 14, width: '100%',
                background: isJoined ? 'transparent' : circle.color,
                border: `1.5px solid ${circle.color}`,
                borderRadius: 12, padding: '11px',
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                color: isJoined ? circle.color : '#fff',
                cursor: 'pointer',
              }
            }, isJoined ? 'Leave Circle' : 'Join Circle'),
          ) : null,
        ),
      );
    }),
  );
}

function LiveScreen({ t }) {
  const [phase, setPhase] = useState('waiting'); // waiting | active | complete
  const [timer, setTimer] = useState(300);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    if (phase === 'active' && timer > 0) {
      const id = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [phase, timer]);

  const fmt = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const reactions = ['🙏', '✨', '💫', '🔥', '❤️'];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    // Live header
    React.createElement('div', {
      style: {
        background: t.surface,
        padding: '20px 24px 20px',
        borderBottom: `1px solid ${t.cardBorder}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
        React.createElement('div', {
          style: {
            width: 8, height: 8, borderRadius: '50%',
            background: phase === 'active' ? '#E85A5A' : t.textFaint,
            animation: phase === 'active' ? 'pulse 1.5s infinite' : 'none',
            boxShadow: phase === 'active' ? '0 0 6px #E85A5A' : 'none',
          }
        }),
        React.createElement('span', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: phase === 'active' ? '#E85A5A' : t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase' }
        }, phase === 'active' ? 'Live Now' : phase === 'waiting' ? 'Starting Soon' : 'Completed'),
      ),
      React.createElement('h1', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: t.text, lineHeight: 1.2 }
      }, 'Morning Ink'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 } },
        React.createElement(Avatar, { initials: 'AJ', size: 28, color: t.primary, t }),
        React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 13, color: t.textMuted } }, 'Amara J. · RiteKeeper Today'),
        React.createElement(window.lucide.Crown, { size: 14, color: t.primary }),
      ),
    ),

    // Main ritual area
    React.createElement('div', { style: { padding: '24px 24px 0' } },
      phase === 'waiting' ? React.createElement('div', {
        style: {
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 20, padding: '32px 24px', textAlign: 'center',
          marginBottom: 20,
        }
      },
        React.createElement('div', {
          style: {
            fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
            fontSize: 48, fontWeight: 400, color: t.primary, marginBottom: 8,
          }
        }, '6:30'),
        React.createElement('p', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 4 }
        }, 'Ritual begins in'),
        React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 13, color: t.textMuted } }, 'Get your journal ready'),
        React.createElement('button', {
          onClick: () => setPhase('active'),
          style: {
            marginTop: 20, background: t.primary, border: 'none',
            borderRadius: 14, padding: '14px 36px',
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff',
            cursor: 'pointer',
          }
        }, 'I\'m Ready →'),
      ) : phase === 'active' ? React.createElement('div', null,
        // Timer
        React.createElement('div', {
          style: { textAlign: 'center', marginBottom: 20 }
        },
          React.createElement('div', {
            style: {
              fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 900,
              color: t.primary, lineHeight: 1,
            }
          }, fmt(timer)),
          React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 4 } }, 'Ritual in progress'),
        ),

        // Prompt card
        React.createElement('div', {
          style: {
            background: t.card, border: `1px solid ${t.primary}40`,
            borderRadius: 18, padding: '22px 20px', marginBottom: 20,
            borderLeft: `4px solid ${t.primary}`,
          }
        },
          React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.primary, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 } }, "Today's Prompt from Amara"),
          React.createElement('p', {
            style: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 18, color: t.text, lineHeight: 1.6 }
          }, '"Write about a moment you felt fully seen by a stranger. What happened next?"'),
        ),

        // Members present
        React.createElement('div', {
          style: {
            background: t.surface, border: `1px solid ${t.cardBorder}`,
            borderRadius: 16, padding: '16px 18px', marginBottom: 20,
          }
        },
          React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 } }, '7 of 8 present'),
          React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
            ['AJ', 'KM', 'YT', 'DC', 'SL', 'RP', 'TN'].map((init, i) =>
              React.createElement(Avatar, { key: i, initials: init, size: 34, color: i === 4 ? t.primary : t.accent, t })
            ),
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: '50%',
                background: t.tag, border: `2px dashed ${t.cardBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textFaint,
              }
            }, '+1'),
          ),
        ),

        // Reactions
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }
        },
          reactions.map(r =>
            React.createElement('button', {
              key: r, onClick: () => { setReaction(r); setTimeout(() => setReaction(null), 1000); },
              style: {
                background: reaction === r ? t.primary + '30' : t.tag,
                border: `1px solid ${reaction === r ? t.primary : t.cardBorder}`,
                borderRadius: 30, width: 44, height: 44,
                fontSize: 20, cursor: 'pointer',
                transition: 'all 0.2s',
                transform: reaction === r ? 'scale(1.2)' : 'scale(1)',
              }
            }, r)
          ),
        ),

        React.createElement('button', {
          onClick: () => setPhase('complete'),
          style: {
            width: '100%', background: 'transparent',
            border: `1.5px solid ${t.cardBorder}`, borderRadius: 14, padding: '13px',
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: t.textMuted,
            cursor: 'pointer',
          }
        }, 'End Session'),
      ) : React.createElement('div', {
        style: { textAlign: 'center', padding: '40px 0' }
      },
        React.createElement('div', { style: { fontSize: 48, marginBottom: 16 } }, '✨'),
        React.createElement('h2', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: t.text, marginBottom: 8 }
        }, 'Ritual Complete'),
        React.createElement('p', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 14, color: t.textMuted, marginBottom: 24 }
        }, 'Morning Ink · 14-day streak 🔥'),
        React.createElement('div', {
          style: {
            background: t.card, border: `1px solid ${t.primary}30`,
            borderRadius: 16, padding: '16px 20px', textAlign: 'left', marginBottom: 20,
          }
        },
          React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.primary, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 } }, 'Token Earned'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('span', { style: { fontSize: 28 } }, '📖'),
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: t.text } }, 'Storyteller Token'),
              React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, 'Awarded by your circle'),
            ),
          ),
        ),
        React.createElement('button', {
          onClick: () => { setPhase('waiting'); setTimer(300); },
          style: {
            background: t.primary, border: 'none', borderRadius: 14, padding: '14px 36px',
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff',
            cursor: 'pointer',
          }
        }, 'Back to Circle'),
      ),
    ),
  );
}

function ProfileScreen({ t, toggleTheme, isDark }) {
  const [activeToken, setActiveToken] = useState(null);

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    // Profile hero — angled cards approach
    React.createElement('div', {
      style: {
        padding: '20px 24px 0',
        position: 'relative',
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          React.createElement(Avatar, { initials: 'SL', size: 56, color: t.primary, t }),
          React.createElement('div', null,
            React.createElement('h2', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: t.text }
            }, 'Steve L.'),
            React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 12, color: t.textMuted } }, 'Member since Jan 2025'),
          ),
        ),
        React.createElement('button', {
          onClick: toggleTheme,
          style: {
            background: t.tag, border: `1px solid ${t.cardBorder}`,
            borderRadius: 20, padding: '7px 14px',
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: t.textMuted,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 14, color: t.textMuted }),
          isDark ? 'Light' : 'Dark',
        ),
      ),

      // Stats row
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 24,
        }
      },
        [
          { label: 'Circles', val: 2 },
          { label: 'Rituals', val: 47 },
          { label: 'RiteKept', val: 3 },
        ].map(s =>
          React.createElement('div', {
            key: s.label,
            style: {
              flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`,
              borderRadius: 14, padding: '14px 10px', textAlign: 'center',
            }
          },
            React.createElement('p', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: t.primary }
            }, s.val),
            React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted } }, s.label),
          )
        ),
      ),
    ),

    // Identity tokens — overlapping angle layout
    React.createElement('div', { style: { padding: '0 24px 20px' } },
      React.createElement('h3', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, 'Identity Tokens'),
      React.createElement('div', { style: { position: 'relative', height: 130 } },
        TOKENS.map((tk, i) =>
          React.createElement('div', {
            key: tk.id,
            onClick: () => setActiveToken(activeToken === tk.id ? null : tk.id),
            style: {
              position: 'absolute',
              left: i * 60,
              top: i % 2 === 0 ? 0 : 15,
              width: 140,
              background: t.card,
              border: `1.5px solid ${tk.color}40`,
              borderRadius: 16,
              padding: '14px 14px',
              transform: `rotate(${[-2, 2, -1.5, 1][i]}deg) scale(${activeToken === tk.id ? 1.05 : 1})`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.12)`,
              zIndex: activeToken === tk.id ? 10 : TOKENS.length - i,
              cursor: 'pointer',
              transition: 'transform 0.2s, z-index 0s',
            }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 6 } }, tk.icon),
            React.createElement('p', {
              style: { fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13, color: t.text, lineHeight: 1.2 }
            }, tk.label),
            React.createElement('p', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: tk.color, marginTop: 2 } }, `×${tk.count}`),
          )
        ),
      ),
    ),

    // My Circles
    React.createElement('div', { style: { padding: '0 24px 24px' } },
      React.createElement('h3', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, 'My Circles'),
      [CIRCLES[0], CIRCLES[2]].map(circle =>
        React.createElement('div', {
          key: circle.id,
          style: {
            display: 'flex', alignItems: 'center', gap: 14,
            background: t.card, border: `1px solid ${t.cardBorder}`,
            borderRadius: 14, padding: '14px 16px', marginBottom: 10,
            borderLeft: `4px solid ${circle.color}`,
          }
        },
          React.createElement('div', null,
            React.createElement('h4', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 2 }
            }, circle.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement(Tag, { label: circle.tag, t }),
              React.createElement('span', { style: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: t.textMuted } }, `${circle.streak}d streak`),
            ),
          ),
          React.createElement('div', {
            style: {
              marginLeft: 'auto',
              background: circle.color + '20', border: `1px solid ${circle.color}40`,
              borderRadius: 10, padding: '4px 10px',
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: circle.color,
            }
          }, circle.nextIn),
        )
      ),
    ),

    // Settings section
    React.createElement('div', { style: { padding: '0 24px 24px' } },
      React.createElement('h3', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 14 }
      }, 'Settings'),
      ['Notification Preferences', 'Ritual Reminders', 'Privacy & Visibility', 'Account'].map(item =>
        React.createElement('div', {
          key: item,
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 0', borderBottom: `1px solid ${t.cardBorder}`,
          }
        },
          React.createElement('span', {
            style: { fontFamily: "'Inter', sans-serif", fontSize: 14, color: t.text }
          }, item),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textFaint }),
        )
      ),
    ),
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'circles', label: 'Circles', icon: window.lucide.Users },
    { id: 'live', label: 'Live', icon: window.lucide.Radio },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    circles: CirclesScreen,
    live: LiveScreen,
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
      fontFamily: "'Inter', sans-serif",
      padding: '20px',
    }
  },
    React.createElement('style', null, fontStyle),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 50,
          background: t.bg,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 28px 8px',
          flexShrink: 0,
          zIndex: 10,
        }
      },
        React.createElement('span', {
          style: { fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: t.statusBar }
        }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 34,
            background: '#000',
            borderRadius: 20,
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 5 }
        },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Battery, { size: 16, color: t.statusBar }),
        ),
      ),

      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }
      },
        React.createElement(ActiveScreen, { t, toggleTheme: () => setIsDark(!isDark), isDark }),
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 80,
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 8,
          flexShrink: 0,
        }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            cursor: 'pointer',
            padding: '8px 0',
            transition: 'all 0.2s',
          };
          const labelStyle = {
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: isActive ? 700 : 400,
            color: isActive ? t.primary : t.textFaint,
            letterSpacing: '0.02em',
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle,
          },
            tab.id === 'live'
              ? React.createElement('div', {
                  style: {
                    width: 44, height: 44,
                    background: isActive ? t.primary : t.tag,
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isActive ? `0 4px 16px ${t.primary}50` : 'none',
                    transition: 'all 0.2s',
                    marginBottom: -4,
                  }
                },
                  React.createElement(tab.icon, { size: 20, color: isActive ? '#fff' : t.textFaint }),
                )
              : React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textFaint }),
            React.createElement('span', { style: labelStyle }, tab.label),
          );
        }),
      ),
    ),
  );
}
