const { useState, useEffect } = React;

const LIGHT = {
  bg: '#F2F2F2',
  card: '#FFFFFF',
  primary: '#1B3FFF',
  accent: '#FF6B1A',
  green: '#00C48C',
  text: '#0A0A0A',
  sub: '#666666',
  border: '#0A0A0A',
  nav: '#FFFFFF',
  shadow: '3px 3px 0px #0A0A0A',
  muted: '#E8E8E8',
};

const DARK = {
  bg: '#0F0F0F',
  card: '#1E1E1E',
  primary: '#4060FF',
  accent: '#FF6B1A',
  green: '#00C48C',
  text: '#F0F0F0',
  sub: '#888888',
  border: '#333333',
  nav: '#141414',
  shadow: '3px 3px 0px #333333',
  muted: '#262626',
};

function StatusBar({ t }) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px 4px',
      fontFamily: '"Archivo Black", sans-serif',
      fontSize: '12px',
      color: t.text,
      flexShrink: 0,
    }
  },
    React.createElement('span', null, '9:41'),
    React.createElement('div', {
      style: { width: '110px', height: '28px', background: '#0A0A0A', borderRadius: '14px' }
    }),
    React.createElement('div', { style: { display: 'flex', gap: '4px', alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 13, color: t.text }),
      React.createElement(window.lucide.Battery, { size: 13, color: t.text })
    )
  );
}

function FloatingTimerIsland({ t, isDark, timerRunning, setTimerRunning, timerSeconds, setTimerSeconds, activeChallengeName }) {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const display = `${mins}:${secs.toString().padStart(2, '0')}`;
  return React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: '12px',
      left: '16px',
      right: '16px',
      background: timerRunning ? t.primary : t.card,
      border: `2px solid ${t.border}`,
      borderRadius: '12px',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: timerRunning ? `4px 4px 0px ${t.accent}` : t.shadow,
      animation: timerRunning ? 'pulse-ring 2s ease-in-out infinite' : 'none',
      zIndex: 50,
    }
  },
    React.createElement('div', null,
      React.createElement('div', {
        style: {
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: timerRunning ? 'rgba(255,255,255,0.65)' : t.sub,
          marginBottom: '2px',
          maxWidth: '180px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }
      }, activeChallengeName),
      React.createElement('div', {
        style: {
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '28px',
          color: timerRunning ? '#FFFFFF' : t.text,
          lineHeight: '1',
        }
      }, display)
    ),
    React.createElement('div', { style: { display: 'flex', gap: '8px' } },
      timerRunning && React.createElement('button', {
        onClick: () => { setTimerRunning(false); setTimerSeconds(0); },
        style: {
          background: '#FFFFFF',
          color: t.primary,
          border: `2px solid ${isDark ? '#555' : '#0A0A0A'}`,
          borderRadius: '8px',
          padding: '7px 12px',
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '11px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }
      },
        React.createElement(window.lucide.CheckCircle, { size: 13, color: t.primary }),
        'DONE'
      ),
      React.createElement('button', {
        onClick: () => setTimerRunning(!timerRunning),
        style: {
          background: timerRunning ? t.accent : t.primary,
          color: '#FFFFFF',
          border: `2px solid ${isDark ? '#555' : '#0A0A0A'}`,
          borderRadius: '8px',
          padding: '7px 16px',
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '11px',
          cursor: 'pointer',
        }
      }, timerRunning ? 'PAUSE' : 'START')
    )
  );
}

function HomeScreen({ t, isDark, setTimerRunning, setTimerSeconds, setActiveChallengeName }) {
  const pods = [
    { id: 1, name: 'Morning Focus Sprint', type: 'FOCUS', dur: '5 min', members: ['AK', 'MJ', 'TL'], done: 2, total: 3, color: '#1B3FFF' },
    { id: 2, name: 'Write 200 Words', type: 'WRITING', dur: '10 min', members: ['RS', 'EK'], done: 1, total: 2, color: '#FF6B1A' },
    { id: 3, name: 'Idea Brainstorm', type: 'CREATIVE', dur: '5 min', members: ['AK', 'MJ', 'TL', 'RS'], done: 3, total: 4, color: '#00C48C' },
  ];
  const quick = ['Stretch 2 min', 'Read 1 page', 'Deep breath', 'Write 1 line'];
  return React.createElement('div', { style: { overflowY: 'auto', height: '100%', paddingBottom: '130px' } },
    React.createElement('div', {
      style: { padding: '14px 20px 12px', borderBottom: `2px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', color: t.text, lineHeight: '1' } }, 'YOUR SQUAD'),
        React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '12px', color: t.sub, marginTop: '3px' } }, 'Sunday · March 29')
      ),
      React.createElement('div', {
        style: {
          background: t.accent,
          border: `2px solid ${t.border}`,
          borderRadius: '8px',
          padding: '6px 12px',
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '12px',
          color: '#FFFFFF',
          boxShadow: t.shadow,
        }
      }, '🔥 7 STREAK')
    ),
    React.createElement('div', {
      style: { display: 'flex', padding: '12px 20px', gap: '10px', borderBottom: `2px solid ${t.border}` }
    },
      ...[{ label: 'DONE', value: '12' }, { label: 'SQUAD XP', value: '840' }, { label: 'CLIPS', value: '8' }].map(s =>
        React.createElement('div', {
          key: s.label,
          style: {
            flex: 1,
            background: t.card,
            border: `2px solid ${t.border}`,
            borderRadius: '8px',
            padding: '10px 8px',
            boxShadow: t.shadow,
            textAlign: 'center',
          }
        },
          React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '22px', color: t.primary } }, s.value),
          React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '8px', color: t.sub, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' } }, s.label)
        )
      )
    ),
    React.createElement('div', { style: { padding: '14px 20px' } },
      React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: t.sub, marginBottom: '12px' } }, 'ACTIVE PODS'),
      ...pods.map(pod =>
        React.createElement('div', {
          key: pod.id,
          style: { background: t.card, border: `2px solid ${t.border}`, borderRadius: '10px', padding: '14px', marginBottom: '10px', boxShadow: t.shadow }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('div', { style: { flex: 1, marginRight: '10px' } },
              React.createElement('div', {
                style: { display: 'inline-block', background: pod.color, color: '#FFFFFF', fontFamily: '"Archivo Black", sans-serif', fontSize: '9px', padding: '2px 8px', borderRadius: '4px', marginBottom: '6px' }
              }, pod.type),
              React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '15px', color: t.text, lineHeight: '1.2' } }, pod.name),
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '11px', color: t.sub, marginTop: '3px' } }, `⏱ ${pod.dur}`)
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
              React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '14px', color: pod.color } }, `${pod.done}/${pod.total}`),
              React.createElement('div', { style: { display: 'flex', gap: '2px', marginTop: '6px' } },
                ...pod.members.map(m =>
                  React.createElement('div', {
                    key: m,
                    style: { width: '22px', height: '22px', borderRadius: '50%', background: pod.color, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Archivo Black", sans-serif', fontSize: '7px', color: '#FFFFFF' }
                  }, m)
                )
              )
            )
          ),
          React.createElement('div', {
            style: { marginTop: '10px', height: '6px', background: t.muted, border: `1.5px solid ${t.border}`, borderRadius: '3px', overflow: 'hidden' }
          },
            React.createElement('div', { style: { width: `${(pod.done / pod.total) * 100}%`, height: '100%', background: pod.color } })
          ),
          React.createElement('button', {
            onClick: () => { setActiveChallengeName(pod.name); setTimerRunning(false); setTimerSeconds(0); },
            style: {
              marginTop: '10px', width: '100%', background: 'transparent', border: `2px solid ${t.border}`, borderRadius: '7px', padding: '8px',
              fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', color: t.text, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px',
            }
          }, '▶ START CHALLENGE')
        )
      )
    ),
    React.createElement('div', { style: { padding: '0 20px 16px', borderTop: `2px solid ${t.border}` } },
      React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: t.sub, margin: '14px 0 10px' } }, 'QUICK WINS'),
      React.createElement('div', { style: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' } },
        ...quick.map((q, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flexShrink: 0, background: i % 2 === 0 ? t.primary : t.accent, border: `2px solid ${t.border}`, borderRadius: '8px',
              padding: '9px 14px', fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', color: '#FFFFFF', boxShadow: t.shadow, cursor: 'pointer', whiteSpace: 'nowrap',
            }
          }, q)
        )
      )
    )
  );
}

function QuestsScreen({ t, isDark, setActiveChallengeName, setTimerRunning, setTimerSeconds }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const bundles = [
    { title: 'FLOW STATE PACK', by: '@ProductivityPro', tasks: ['5-min focus sprint', 'Write your first thought', '10 deep breaths'], xp: 300, expires: '2d left', color: '#1B3FFF', isNew: true },
    { title: 'CREATIVE BURST', by: '@IdeaLab', tasks: ['Sketch one concept', 'Voice memo your idea', 'Share a surprise'], xp: 250, expires: '5d left', color: '#FF6B1A', isNew: false },
    { title: 'TEAM SYNC', by: '@SquadGoals', tasks: ['Shoutout a teammate', 'Complete together', 'Share progress clip'], xp: 400, expires: '1d left', color: '#00C48C', isNew: true },
  ];
  const cats = ['ALL', 'FOCUS', 'CREATIVE', 'SOCIAL', 'WELLNESS'];
  return React.createElement('div', { style: { overflowY: 'auto', height: '100%', paddingBottom: '130px' } },
    React.createElement('div', { style: { padding: '14px 20px 12px', borderBottom: `2px solid ${t.border}` } },
      React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', color: t.text } }, 'QUEST DROPS'),
      React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '12px', color: t.sub } }, 'Fresh bundles, every week')
    ),
    React.createElement('div', { style: { display: 'flex', padding: '10px 20px', gap: '8px', overflowX: 'auto', borderBottom: `2px solid ${t.border}` } },
      ...cats.map(cat =>
        React.createElement('div', {
          key: cat,
          onClick: () => setActiveCategory(cat),
          style: {
            flexShrink: 0, background: activeCategory === cat ? t.primary : 'transparent', border: `2px solid ${activeCategory === cat ? t.primary : t.border}`,
            borderRadius: '6px', padding: '5px 12px', fontFamily: '"Archivo Black", sans-serif', fontSize: '10px', color: activeCategory === cat ? '#FFFFFF' : t.text, cursor: 'pointer',
          }
        }, cat)
      )
    ),
    React.createElement('div', { style: { padding: '14px 20px' } },
      ...bundles.map((b, i) =>
        React.createElement('div', {
          key: i,
          style: { background: t.card, border: `2px solid ${t.border}`, borderRadius: '10px', marginBottom: '12px', overflow: 'hidden', boxShadow: t.shadow }
        },
          React.createElement('div', {
            style: { background: b.color, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '17px', color: '#FFFFFF' } }, b.title),
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.75)' } }, b.by)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              b.isNew && React.createElement('div', {
                style: { background: '#FFFFFF', color: b.color, fontFamily: '"Archivo Black", sans-serif', fontSize: '9px', padding: '2px 7px', borderRadius: '4px', marginBottom: '4px', display: 'inline-block' }
              }, 'NEW DROP'),
              React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '14px', color: '#FFFFFF' } }, `+${b.xp} XP`)
            )
          ),
          React.createElement('div', { style: { padding: '12px 14px' } },
            ...b.tasks.map((task, ti) =>
              React.createElement('div', {
                key: ti,
                style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: ti < b.tasks.length - 1 ? `1px dashed ${isDark ? '#333' : '#E0E0E0'}` : 'none' }
              },
                React.createElement('div', {
                  style: { width: '18px', height: '18px', border: `2px solid ${b.color}`, borderRadius: '4px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                },
                  React.createElement('div', { style: { width: '7px', height: '7px', background: b.color, borderRadius: '2px' } })
                ),
                React.createElement('span', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '13px', color: t.text } }, task)
              )
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' } },
              React.createElement('span', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '10px', color: t.sub } }, `⏰ ${b.expires}`),
              React.createElement('button', {
                onClick: () => { setActiveChallengeName(b.title); setTimerRunning(false); setTimerSeconds(0); },
                style: { background: b.color, color: '#FFFFFF', border: `2px solid ${t.border}`, borderRadius: '7px', padding: '7px 16px', fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', cursor: 'pointer' }
              }, 'JOIN QUEST')
            )
          )
        )
      )
    )
  );
}

function FeedScreen({ t, isDark }) {
  const clips = [
    { initials: 'AK', name: 'Alex K.', challenge: 'Morning Focus Sprint', ago: '2h', likes: 12, replies: 3, type: 'VIDEO', dur: '0:24', color: '#1B3FFF' },
    { initials: 'MJ', name: 'Maya J.', challenge: 'Write 200 Words', ago: '3h', likes: 8, replies: 1, type: 'VOICE', dur: '0:18', color: '#FF6B1A' },
    { initials: 'TL', name: 'Tom L.', challenge: 'Idea Brainstorm', ago: '5h', likes: 15, replies: 5, type: 'VIDEO', dur: '0:29', color: '#00C48C' },
    { initials: 'RS', name: 'Riya S.', challenge: 'Team Sync', ago: '6h', likes: 20, replies: 8, type: 'VOICE', dur: '0:15', color: '#FF6B1A' },
  ];
  return React.createElement('div', { style: { overflowY: 'auto', height: '100%', paddingBottom: '16px' } },
    React.createElement('div', {
      style: { padding: '14px 20px 12px', borderBottom: `2px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', color: t.text } }, 'REMIX FEED'),
      React.createElement('button', {
        style: {
          background: t.primary, color: '#FFFFFF', border: `2px solid ${t.border}`, borderRadius: '8px', padding: '7px 14px',
          fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', cursor: 'pointer', boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: '5px',
        }
      },
        React.createElement(window.lucide.Plus, { size: 13, color: '#FFFFFF' }),
        'NEW CLIP'
      )
    ),
    React.createElement('div', { style: { padding: '12px 20px 0' } },
      ...clips.map((clip, i) =>
        React.createElement('div', {
          key: i,
          style: { background: t.card, border: `2px solid ${t.border}`, borderRadius: '10px', marginBottom: '12px', overflow: 'hidden', boxShadow: t.shadow }
        },
          React.createElement('div', { style: { padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' } },
            React.createElement('div', {
              style: { width: '38px', height: '38px', borderRadius: '50%', background: clip.color, border: `2px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Archivo Black", sans-serif', fontSize: '12px', color: '#FFFFFF', flexShrink: 0 }
            }, clip.initials),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '14px', color: t.text } }, clip.name),
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '11px', color: t.sub } }, `${clip.challenge} · ${clip.ago} ago`)
            ),
            React.createElement('div', {
              style: { background: clip.type === 'VIDEO' ? t.primary : '#FF6B1A', color: '#FFFFFF', fontFamily: '"Archivo Black", sans-serif', fontSize: '9px', padding: '3px 8px', borderRadius: '4px' }
            }, clip.type)
          ),
          React.createElement('div', {
            style: { margin: '0 14px', height: '78px', background: isDark ? '#0A0A0A' : '#F0F0F0', border: `2px solid ${t.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }
          },
            React.createElement('div', {
              style: { width: '38px', height: '38px', background: clip.color, border: `2px solid ${t.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }
            },
              React.createElement(clip.type === 'VIDEO' ? window.lucide.Play : window.lucide.Mic, { size: 16, color: '#FFFFFF' })
            ),
            React.createElement('div', { style: { position: 'absolute', bottom: '8px', right: '10px', fontFamily: '"Archivo Black", sans-serif', fontSize: '10px', color: t.sub } }, clip.dur)
          ),
          React.createElement('div', { style: { padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '16px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' } },
              React.createElement(window.lucide.Heart, { size: 16, color: '#FF6B1A' }),
              React.createElement('span', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '12px', color: t.text } }, clip.likes)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' } },
              React.createElement(window.lucide.MessageCircle, { size: 16, color: t.sub }),
              React.createElement('span', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '12px', color: t.text } }, clip.replies)
            ),
            React.createElement('div', { style: { marginLeft: 'auto', cursor: 'pointer' } },
              React.createElement(window.lucide.Share2, { size: 16, color: t.sub })
            )
          )
        )
      )
    )
  );
}

function ProfileScreen({ t, isDark, setIsDark }) {
  const stats = [
    { val: '47', label: 'CHALLENGES', icon: '⚡' },
    { val: '23', label: 'CLIPS', icon: '🎬' },
    { val: '3', label: 'SQUADS', icon: '👥' },
    { val: '7', label: 'DAY STREAK', icon: '🔥' },
  ];
  const achievements = [
    { title: 'EARLY RISER', desc: '7-day morning streak', icon: '🌅', earned: true },
    { title: 'CLIP MASTER', desc: '10 clips created', icon: '🎬', earned: true },
    { title: 'TEAM PLAYER', desc: 'Complete 5 co-op quests', icon: '🤝', earned: false },
    { title: 'QUEST HUNTER', desc: 'Join 3 quest bundles', icon: '⚡', earned: true },
  ];
  return React.createElement('div', { style: { overflowY: 'auto', height: '100%', paddingBottom: '16px' } },
    React.createElement('div', {
      style: { background: t.primary, padding: '16px 20px 18px', borderBottom: `2px solid ${t.border}` }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', { style: { display: 'flex', gap: '14px', alignItems: 'center' } },
          React.createElement('div', {
            style: { width: '58px', height: '58px', borderRadius: '50%', background: '#FF6B1A', border: '3px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Archivo Black", sans-serif', fontSize: '20px', color: '#FFFFFF' }
          }, 'AK'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '20px', color: '#FFFFFF' } }, 'Alex Kim'),
            React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.75)' } }, '@alexkim · Level 8')
          )
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: '#FFFFFF', border: '2px solid #FFFFFF', borderRadius: '8px', padding: '6px 10px',
            fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', color: t.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
          }
        },
          React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 13, color: t.primary }),
          isDark ? 'LIGHT' : 'DARK'
        )
      )
    ),
    React.createElement('div', { style: { padding: '14px 20px', borderBottom: `2px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
        React.createElement('span', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', color: t.sub, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'LEVEL 8 PROGRESS'),
        React.createElement('span', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '12px', color: t.primary } }, '840 / 1000 XP')
      ),
      React.createElement('div', { style: { height: '10px', background: t.muted, border: `2px solid ${t.border}`, borderRadius: '5px', overflow: 'hidden' } },
        React.createElement('div', { style: { width: '84%', height: '100%', background: t.primary } })
      )
    ),
    React.createElement('div', { style: { padding: '14px 20px', borderBottom: `2px solid ${t.border}` } },
      React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', color: t.sub, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' } }, 'STATS'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
        ...stats.map(s =>
          React.createElement('div', {
            key: s.label,
            style: { background: t.card, border: `2px solid ${t.border}`, borderRadius: '8px', padding: '12px', boxShadow: t.shadow }
          },
            React.createElement('div', { style: { fontSize: '18px', marginBottom: '4px' } }, s.icon),
            React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '24px', color: t.primary } }, s.val),
            React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '9px', color: t.sub, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' } }, s.label)
          )
        )
      )
    ),
    React.createElement('div', { style: { padding: '14px 20px' } },
      React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', color: t.sub, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' } }, 'ACHIEVEMENTS'),
      ...achievements.map((a, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
            background: a.earned ? t.card : t.muted,
            border: `2px solid ${a.earned ? t.border : (isDark ? '#2A2A2A' : '#CCCCCC')}`,
            borderRadius: '8px', marginBottom: '8px', opacity: a.earned ? 1 : 0.55, boxShadow: a.earned ? t.shadow : 'none',
          }
        },
          React.createElement('div', {
            style: { width: '40px', height: '40px', background: a.earned ? t.primary : t.muted, border: `2px solid ${t.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }
          }, a.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '13px', color: a.earned ? t.text : t.sub } }, a.title),
            React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: '11px', color: t.sub } }, a.desc)
          ),
          a.earned && React.createElement(window.lucide.CheckCircle, { size: 18, color: '#00C48C' })
        )
      )
    )
  );
}

function App() {
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600&display=swap');
      @keyframes pulse-ring {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.015); box-shadow: 5px 5px 0px #FF6B1A, 0 0 24px rgba(27,63,255,0.25); }
      }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeChallengeName, setActiveChallengeName] = useState('Morning Focus Sprint');

  const t = isDark ? DARK : LIGHT;

  useEffect(() => {
    let id;
    if (timerRunning) { id = setInterval(() => setTimerSeconds(s => s + 1), 1000); }
    return () => clearInterval(id);
  }, [timerRunning]);

  const showTimerIsland = activeTab === 'home' || activeTab === 'quests';

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'quests', label: 'Quests', icon: window.lucide.Zap },
    { id: 'feed', label: 'Feed', icon: window.lucide.Play },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = { home: HomeScreen, quests: QuestsScreen, feed: FeedScreen, profile: ProfileScreen };

  const screenProps = { t, isDark, setIsDark, timerRunning, setTimerRunning, timerSeconds, setTimerSeconds, activeChallengeName, setActiveChallengeName };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Archivo, sans-serif',
    }
  },
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        background: t.bg,
        borderRadius: '44px',
        overflow: 'hidden',
        boxShadow: '0 30px 70px rgba(0,0,0,0.35), 0 0 0 3px #0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }
    },
      React.createElement(StatusBar, { t }),
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(screens[activeTab], screenProps),
        showTimerIsland && React.createElement(FloatingTimerIsland, screenProps)
      ),
      React.createElement('div', {
        style: { background: t.nav, borderTop: `2px solid ${t.border}`, display: 'flex', flexShrink: 0, paddingBottom: '8px' }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '10px 0 4px', cursor: 'pointer' }
          },
            React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.sub, strokeWidth: activeTab === tab.id ? 2.5 : 1.5 }),
            React.createElement('span', {
              style: { fontFamily: '"Archivo Black", sans-serif', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px', color: activeTab === tab.id ? t.primary : t.sub }
            }, tab.label)
          )
        )
      )
    )
  );
}
