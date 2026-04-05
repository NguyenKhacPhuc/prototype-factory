const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [joinedGuilds, setJoinedGuilds] = useState(['mythic-sound-mages']);
  const [activeSession, setActiveSession] = useState(null);
  const [sessionPhase, setSessionPhase] = useState('lobby');
  const [contributions, setContributions] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [echoProgress, setEchoProgress] = useState(0);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);
  const [inputText, setInputText] = useState('');
  const [notification, setNotification] = useState(null);

  const themes = {
    dark: {
      bg: '#1a0a14',
      surface: '#2a1520',
      surfaceAlt: '#3a1f30',
      card: '#2e1825',
      cardHover: '#3d2235',
      text: '#FDF2F8',
      textSecondary: '#d4a0b9',
      textMuted: '#8a5a70',
      border: '#4a2a3a',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      ctaHover: '#22D3EE',
      background: '#FDF2F8',
      navBg: 'rgba(26, 10, 20, 0.95)',
      overlay: 'rgba(26, 10, 20, 0.8)',
      gradient1: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)',
      gradient2: 'linear-gradient(135deg, #1a0a14 0%, #2a1520 100%)',
      gradient3: 'linear-gradient(180deg, rgba(236,72,153,0.15) 0%, transparent 60%)',
      shadow: '0 4px 20px rgba(236,72,153,0.15)',
      shadowStrong: '0 8px 32px rgba(236,72,153,0.25)',
    },
    light: {
      bg: '#FDF2F8',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF0F7',
      card: '#FFFFFF',
      cardHover: '#FFF5FA',
      text: '#1a0a14',
      textSecondary: '#6B2148',
      textMuted: '#9A5A78',
      border: '#F0D0E0',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      ctaHover: '#0891B2',
      background: '#FDF2F8',
      navBg: 'rgba(253, 242, 248, 0.95)',
      overlay: 'rgba(253, 242, 248, 0.8)',
      gradient1: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)',
      gradient2: 'linear-gradient(135deg, #FDF2F8 0%, #FFF0F7 100%)',
      gradient3: 'linear-gradient(180deg, rgba(236,72,153,0.08) 0%, transparent 60%)',
      shadow: '0 4px 20px rgba(0,0,0,0.08)',
      shadowStrong: '0 8px 32px rgba(0,0,0,0.12)',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const fontStack = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const guilds = [
    { id: 'mythic-sound-mages', name: 'Mythic Sound Mages', members: 24, icon: 'Wand2', desc: 'Medieval meets futuristic sonic alchemy', color: '#8B5CF6', nextSession: '15 min' },
    { id: 'neo-abstract-weavers', name: 'Neo-Abstract Weavers', members: 31, icon: 'Paintbrush', desc: 'Deconstructing form through collaborative abstraction', color: '#EC4899', nextSession: '2 hrs' },
    { id: 'cipher-poets', name: 'Cipher Poets', members: 18, icon: 'BookOpen', desc: 'Encrypted narratives and hidden verse layers', color: '#06B6D4', nextSession: '45 min' },
    { id: 'dream-cartographers', name: 'Dream Cartographers', members: 27, icon: 'Map', desc: 'Mapping the geography of subconscious landscapes', color: '#F59E0B', nextSession: '1 hr' },
    { id: 'glitch-botanists', name: 'Glitch Botanists', members: 15, icon: 'Flower2', desc: 'Growing digital flora from corrupted seeds', color: '#10B981', nextSession: '3 hrs' },
    { id: 'temporal-sculptors', name: 'Temporal Sculptors', members: 22, icon: 'Clock', desc: 'Bending time into tangible artistic forms', color: '#F97316', nextSession: '30 min' },
  ];

  const sessions = [
    { id: 1, guild: 'mythic-sound-mages', title: 'Enchanted Frequencies', status: 'live', participants: 12, seed: 'Medieval lute melody + aurora borealis timelapse', timeLeft: '18:42' },
    { id: 2, guild: 'cipher-poets', title: 'Recursive Whispers', status: 'upcoming', participants: 0, seed: 'A redacted love letter from 2089', startsIn: '45 min' },
    { id: 3, guild: 'neo-abstract-weavers', title: 'Chromatic Dissolution', status: 'upcoming', participants: 0, seed: 'Satellite imagery of ocean currents', startsIn: '2 hrs' },
    { id: 4, guild: 'temporal-sculptors', title: 'Frozen Moments', status: 'upcoming', participants: 0, seed: 'The sound of a clock stopping', startsIn: '30 min' },
  ];

  const microPrompts = [
    'Add a futuristic synth layer to the melody',
    'Describe the hidden emotion in three words',
    'Generate a whispered counter-narrative',
    'Interpret this sound as a color and shape',
    'What memory does this evoke? Capture it.',
    'Layer a heartbeat rhythm underneath',
    'Translate this feeling into a texture',
  ];

  const echoArchives = [
    { id: 1, guild: 'mythic-sound-mages', title: 'Astral Harmonics', contributors: 8, timeLeft: '23h 14m', layers: 24, mood: 'Ethereal' },
    { id: 2, guild: 'neo-abstract-weavers', title: 'Shattered Prisms', contributors: 11, timeLeft: '14h 52m', layers: 31, mood: 'Chaotic' },
    { id: 3, guild: 'cipher-poets', title: 'Encrypted Dawn', contributors: 6, timeLeft: '8h 03m', layers: 18, mood: 'Mysterious' },
  ];

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 1.5 });
  };

  const PulsingDot = ({ color = '#EC4899' }) => (
    React.createElement('div', { style: {
      width: 8, height: 8, borderRadius: '50%', background: color,
      animation: 'pulse 2s ease-in-out infinite', boxShadow: `0 0 8px ${color}`,
    }})
  );

  const Badge = ({ text, color = t.cta }) => (
    React.createElement('span', { style: {
      fontSize: 11, fontWeight: 700, fontFamily: fontStack,
      background: color, color: '#fff', padding: '3px 8px',
      borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.5px',
    }}, text)
  );

  // ===== HOME SCREEN =====
  const HomeScreen = () => {
    const liveSession = sessions.find(s => s.status === 'live');
    const userGuild = guilds.find(g => g.id === 'mythic-sound-mages');

    return React.createElement('div', { style: {
      padding: '20px 16px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none',
    }},
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }},
        React.createElement('div', null,
          React.createElement('h1', { style: {
            fontSize: 34, fontWeight: 800, fontFamily: fontStack, color: t.text,
            letterSpacing: '-0.5px', margin: 0, lineHeight: 1.1,
          }}, 'Echo Loom'),
          React.createElement('p', { style: {
            fontSize: 15, fontFamily: fontStack, color: t.textSecondary, margin: '4px 0 0',
          }}, 'Weave fleeting ideas into shared artistry')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' }},
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: t.surfaceAlt, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.2s', boxShadow: t.shadow,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.9)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.primary })
          ),
          React.createElement('button', {
            onClick: () => setActiveScreen('profile'),
            style: {
              width: 40, height: 40, borderRadius: 20, border: `2px solid ${t.primary}`,
              background: t.gradient1, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(Icon, { name: 'User', size: 18, color: '#fff' })
          )
        )
      ),

      // Live Session Card
      liveSession && React.createElement('div', {
        onClick: () => { setActiveSession(liveSession); setActiveScreen('session'); },
        style: {
          background: t.gradient1, borderRadius: 20, padding: 20,
          marginBottom: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden',
          boxShadow: t.shadowStrong, transition: 'transform 0.2s',
          animation: 'shimmer 3s ease-in-out infinite',
        },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
      },
        React.createElement('div', { style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 }},
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }},
            React.createElement(PulsingDot, { color: '#fff' }),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, fontFamily: fontStack, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}, 'Live Now'),
            React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: 'rgba(255,255,255,0.7)', marginLeft: 'auto' }}, liveSession.timeLeft + ' remaining')
          ),
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, fontFamily: fontStack, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.3px' }}, liveSession.title),
          React.createElement('p', { style: { fontSize: 15, fontFamily: fontStack, color: 'rgba(255,255,255,0.8)', margin: '0 0 12px' }}, 'Seed: ' + liveSession.seed),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 }},
            React.createElement(Icon, { name: 'Users', size: 16, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: 'rgba(255,255,255,0.9)' }}, liveSession.participants + ' weaving'),
            React.createElement('div', { style: {
              marginLeft: 'auto', background: 'rgba(255,255,255,0.25)', borderRadius: 12,
              padding: '6px 16px', fontFamily: fontStack, fontSize: 13, fontWeight: 600, color: '#fff',
            }}, 'Join Session')
          )
        )
      ),

      // Your Guild
      React.createElement('div', { style: { marginBottom: 24 }},
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text, margin: '0 0 12px' }}, 'Your Guild'),
        React.createElement('div', {
          onClick: () => { setSelectedGuild(userGuild); setActiveScreen('guildDetail'); },
          style: {
            background: t.card, borderRadius: 16, padding: 16, cursor: 'pointer',
            border: `1px solid ${t.border}`, boxShadow: t.shadow,
            transition: 'all 0.2s',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 }},
            React.createElement('div', { style: {
              width: 48, height: 48, borderRadius: 14, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${userGuild.color}33, ${userGuild.color}11)`,
              border: `1px solid ${userGuild.color}44`,
            }},
              React.createElement(Icon, { name: userGuild.icon, size: 24, color: userGuild.color })
            ),
            React.createElement('div', { style: { flex: 1 }},
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text }}, userGuild.name),
              React.createElement('div', { style: { fontSize: 13, fontFamily: fontStack, color: t.textSecondary }}, userGuild.members + ' members')
            ),
            React.createElement('div', { style: { textAlign: 'right' }},
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, fontFamily: fontStack, color: t.cta }}, 'Next session'),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, fontFamily: fontStack, color: t.text }}, userGuild.nextSession)
            )
          )
        )
      ),

      // Upcoming Sessions
      React.createElement('div', { style: { marginBottom: 24 }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }},
          React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text, margin: 0 }}, 'Upcoming Sessions'),
          React.createElement('button', {
            onClick: () => setActiveScreen('sessions'),
            style: { background: 'none', border: 'none', fontSize: 15, fontFamily: fontStack, color: t.cta, cursor: 'pointer', fontWeight: 600 },
          }, 'See All')
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 }},
          sessions.filter(s => s.status === 'upcoming').slice(0, 2).map(session => {
            const guild = guilds.find(g => g.id === session.guild);
            return React.createElement('div', {
              key: session.id,
              onClick: () => { setActiveSession(session); setActiveScreen('session'); },
              style: {
                background: t.card, borderRadius: 14, padding: 14, cursor: 'pointer',
                border: `1px solid ${t.border}`, transition: 'all 0.2s',
              },
              onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
              onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 }},
                React.createElement('div', { style: {
                  width: 40, height: 40, borderRadius: 12,
                  background: `${guild.color}22`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }},
                  React.createElement(Icon, { name: guild.icon, size: 20, color: guild.color })
                ),
                React.createElement('div', { style: { flex: 1 }},
                  React.createElement('div', { style: { fontSize: 15, fontWeight: 600, fontFamily: fontStack, color: t.text }}, session.title),
                  React.createElement('div', { style: { fontSize: 13, fontFamily: fontStack, color: t.textSecondary }}, guild.name)
                ),
                React.createElement('div', { style: {
                  fontSize: 13, fontWeight: 600, fontFamily: fontStack, color: t.primary,
                  background: `${t.primary}15`, padding: '4px 10px', borderRadius: 8,
                }}, session.startsIn)
              )
            );
          })
        )
      ),

      // Echo Archives Teaser
      React.createElement('div', null,
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }},
          React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text, margin: 0 }}, 'Fading Echos'),
          React.createElement('button', {
            onClick: () => setActiveScreen('archive'),
            style: { background: 'none', border: 'none', fontSize: 15, fontFamily: fontStack, color: t.cta, cursor: 'pointer', fontWeight: 600 },
          }, 'View All')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }},
          echoArchives.map(echo => (
            React.createElement('div', {
              key: echo.id,
              onClick: () => setActiveScreen('archive'),
              style: {
                minWidth: 160, background: t.card, borderRadius: 16, padding: 14,
                border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: t.shadow,
              },
            },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, fontFamily: fontStack, color: t.text, marginBottom: 6 }}, echo.title),
              React.createElement('div', { style: { fontSize: 13, fontFamily: fontStack, color: t.textMuted, marginBottom: 8 }}, echo.mood),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 }},
                React.createElement(Icon, { name: 'Timer', size: 12, color: t.primary }),
                React.createElement('span', { style: { fontSize: 11, fontFamily: fontStack, color: t.primary, fontWeight: 600 }}, echo.timeLeft)
              )
            )
          ))
        )
      )
    );
  };

  // ===== SESSIONS SCREEN =====
  const SessionsScreen = () => {
    return React.createElement('div', { style: {
      padding: '20px 16px 100px', animation: animateIn ? 'slideUp 0.4s ease' : 'none',
    }},
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, fontFamily: fontStack, color: t.text, letterSpacing: '-0.5px', margin: '0 0 6px' }}, 'Loom Sessions'),
      React.createElement('p', { style: { fontSize: 15, fontFamily: fontStack, color: t.textSecondary, margin: '0 0 20px' }}, 'Scheduled creative rituals across all guilds'),

      // Live filter pills
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 }},
        ['All', 'Live', 'Upcoming', 'My Guilds'].map((filter, i) => (
          React.createElement('button', {
            key: filter,
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontFamily: fontStack, fontSize: 13, fontWeight: 600,
              background: i === 0 ? t.primary : t.surfaceAlt,
              color: i === 0 ? '#fff' : t.textSecondary,
              transition: 'all 0.2s',
            },
          }, filter)
        ))
      ),

      // Session cards
      sessions.map(session => {
        const guild = guilds.find(g => g.id === session.guild);
        const isLive = session.status === 'live';
        return React.createElement('div', {
          key: session.id,
          onClick: () => { setActiveSession(session); setActiveScreen('session'); },
          style: {
            background: isLive ? t.gradient1 : t.card,
            borderRadius: 18, padding: 18, marginBottom: 12, cursor: 'pointer',
            border: isLive ? 'none' : `1px solid ${t.border}`,
            boxShadow: isLive ? t.shadowStrong : t.shadow,
            transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          isLive && React.createElement('div', { style: {
            position: 'absolute', top: 0, right: 0, width: 120, height: 120,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}),
          React.createElement('div', { style: { position: 'relative', zIndex: 1 }},
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }},
              isLive && React.createElement(PulsingDot, { color: '#fff' }),
              React.createElement(Badge, { text: isLive ? 'Live' : 'Upcoming', color: isLive ? 'rgba(255,255,255,0.3)' : t.cta }),
              React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: isLive ? 'rgba(255,255,255,0.7)' : t.textMuted, marginLeft: 'auto' }},
                isLive ? session.timeLeft + ' left' : 'Starts in ' + session.startsIn
              )
            ),
            React.createElement('h3', { style: { fontSize: 20, fontWeight: 700, fontFamily: fontStack, color: isLive ? '#fff' : t.text, margin: '0 0 4px' }}, session.title),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }},
              React.createElement(Icon, { name: guild.icon, size: 14, color: isLive ? '#fff' : guild.color }),
              React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: isLive ? 'rgba(255,255,255,0.8)' : t.textSecondary }}, guild.name)
            ),
            React.createElement('div', { style: {
              fontSize: 13, fontFamily: fontStack, color: isLive ? 'rgba(255,255,255,0.7)' : t.textMuted,
              background: isLive ? 'rgba(255,255,255,0.1)' : t.surfaceAlt,
              padding: '8px 12px', borderRadius: 10, marginBottom: 12,
            }},
              React.createElement(Icon, { name: 'Sparkles', size: 12, color: isLive ? '#fff' : t.primary, style: { marginRight: 6, verticalAlign: 'middle' } }),
              'Seed: ' + session.seed
            ),
            isLive && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 }},
              React.createElement(Icon, { name: 'Users', size: 14, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: 'rgba(255,255,255,0.9)' }}, session.participants + ' weaving now')
            )
          )
        );
      })
    );
  };

  // ===== SESSION DETAIL / LIVE SESSION =====
  const SessionScreen = () => {
    const session = activeSession || sessions[0];
    const guild = guilds.find(g => g.id === session.guild);
    const isLive = session.status === 'live';
    const prompt = microPrompts[currentPrompt % microPrompts.length];

    const handleContribute = () => {
      if (!inputText.trim()) return;
      setContributions(prev => [...prev, { text: inputText, time: 'just now', user: 'You' }]);
      setInputText('');
      setEchoProgress(prev => Math.min(prev + 14, 100));
      if (currentPrompt < microPrompts.length - 1) {
        setTimeout(() => setCurrentPrompt(prev => prev + 1), 1500);
      }
      showNotif('Contribution woven into the Echo!');
    };

    return React.createElement('div', { style: {
      padding: '0 0 100px', animation: animateIn ? 'slideUp 0.3s ease' : 'none',
    }},
      // Header
      React.createElement('div', { style: { background: t.gradient1, padding: '20px 16px 24px', position: 'relative', overflow: 'hidden' }},
        React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)' }}),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 }},
          React.createElement('button', {
            onClick: () => setActiveScreen('home'),
            style: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 12, padding: '8px 12px', cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 },
          },
            React.createElement(Icon, { name: 'ArrowLeft', size: 16, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 15, fontFamily: fontStack, color: '#fff' }}, 'Back')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }},
            isLive && React.createElement(PulsingDot, { color: '#fff' }),
            React.createElement(Badge, { text: isLive ? 'Live Session' : 'Upcoming', color: 'rgba(255,255,255,0.25)' })
          ),
          React.createElement('h2', { style: { fontSize: 26, fontWeight: 800, fontFamily: fontStack, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.5px' }}, session.title),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 }},
            React.createElement(Icon, { name: guild.icon, size: 14, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 15, fontFamily: fontStack, color: 'rgba(255,255,255,0.85)' }}, guild.name)
          )
        )
      ),

      // Echo Progress
      isLive && React.createElement('div', { style: { padding: '16px 16px 0' }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }},
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, fontFamily: fontStack, color: t.textSecondary }}, 'Echo Formation'),
          React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: t.primary, fontWeight: 700 }}, echoProgress + '%')
        ),
        React.createElement('div', { style: { height: 6, background: t.surfaceAlt, borderRadius: 3, overflow: 'hidden' }},
          React.createElement('div', { style: {
            height: '100%', width: echoProgress + '%', background: t.gradient1,
            borderRadius: 3, transition: 'width 0.8s ease',
          }})
        )
      ),

      // AI Weave Agent Prompt
      isLive && React.createElement('div', { style: {
        margin: '16px 16px 0', background: t.card, borderRadius: 16,
        border: `1px solid ${t.cta}44`, padding: 16, position: 'relative',
        boxShadow: `0 0 20px ${t.cta}15`,
      }},
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }},
          React.createElement('div', { style: {
            width: 28, height: 28, borderRadius: 8, background: `${t.cta}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }},
            React.createElement(Icon, { name: 'Bot', size: 16, color: t.cta })
          ),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, fontFamily: fontStack, color: t.cta, textTransform: 'uppercase', letterSpacing: '0.5px' }}, 'AI Weave Agent'),
          React.createElement('span', { style: { fontSize: 11, fontFamily: fontStack, color: t.textMuted, marginLeft: 'auto' }}, 'Prompt ' + (currentPrompt + 1) + '/' + microPrompts.length)
        ),
        React.createElement('p', { style: {
          fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text,
          margin: 0, lineHeight: 1.4, fontStyle: 'italic',
        }}, '"' + prompt + '"')
      ),

      // Contribution Input
      isLive && React.createElement('div', { style: { padding: '16px 16px 0' }},
        React.createElement('div', { style: {
          background: t.card, borderRadius: 16, border: `1px solid ${t.border}`,
          padding: 12, display: 'flex', flexDirection: 'column', gap: 10,
        }},
          React.createElement('textarea', {
            value: inputText,
            onChange: (e) => setInputText(e.target.value),
            placeholder: 'Weave your response...',
            style: {
              background: 'transparent', border: 'none', outline: 'none',
              fontFamily: fontStack, fontSize: 15, color: t.text, resize: 'none',
              height: 60, padding: 0,
            }
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }},
            React.createElement('div', { style: { display: 'flex', gap: 8 }},
              ['Mic', 'Image', 'Music'].map(icon => (
                React.createElement('button', {
                  key: icon,
                  style: {
                    width: 36, height: 36, borderRadius: 10, border: `1px solid ${t.border}`,
                    background: t.surfaceAlt, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  },
                },
                  React.createElement(Icon, { name: icon, size: 16, color: t.textMuted })
                )
              ))
            ),
            React.createElement('button', {
              onClick: handleContribute,
              style: {
                background: t.gradient1, border: 'none', borderRadius: 12,
                padding: '10px 20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                opacity: inputText.trim() ? 1 : 0.5, transition: 'all 0.2s',
              },
            },
              React.createElement(Icon, { name: 'Send', size: 16, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 15, fontWeight: 600, fontFamily: fontStack, color: '#fff' }}, 'Weave')
            )
          )
        )
      ),

      // Contributions Feed
      React.createElement('div', { style: { padding: '16px' }},
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text, margin: '0 0 12px' }}, 'Woven Threads'),
        contributions.length === 0
          ? React.createElement('div', { style: { textAlign: 'center', padding: 30, color: t.textMuted, fontSize: 15, fontFamily: fontStack }},
              React.createElement(Icon, { name: 'Layers', size: 32, color: t.textMuted, style: { marginBottom: 8, display: 'block', margin: '0 auto 8px' } }),
              isLive ? 'Be the first to weave into this Echo' : 'Session hasn\'t started yet'
            )
          : contributions.map((c, i) => (
              React.createElement('div', {
                key: i,
                style: {
                  background: t.surfaceAlt, borderRadius: 14, padding: 12,
                  marginBottom: 8, animation: 'fadeIn 0.3s ease',
                  borderLeft: `3px solid ${t.primary}`,
                }
              },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 }},
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 600, fontFamily: fontStack, color: t.primary }}, c.user),
                  React.createElement('span', { style: { fontSize: 11, fontFamily: fontStack, color: t.textMuted }}, c.time)
                ),
                React.createElement('p', { style: { fontSize: 15, fontFamily: fontStack, color: t.text, margin: 0 }}, c.text)
              )
            ))
      )
    );
  };

  // ===== GUILDS / EXPLORE SCREEN =====
  const ExploreScreen = () => {
    return React.createElement('div', { style: {
      padding: '20px 16px 100px', animation: animateIn ? 'slideUp 0.4s ease' : 'none',
    }},
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, fontFamily: fontStack, color: t.text, letterSpacing: '-0.5px', margin: '0 0 6px' }}, 'Guilds'),
      React.createElement('p', { style: { fontSize: 15, fontFamily: fontStack, color: t.textSecondary, margin: '0 0 20px' }}, 'Find your creative tribe'),

      // Search
      React.createElement('div', { style: {
        background: t.surfaceAlt, borderRadius: 14, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        border: `1px solid ${t.border}`,
      }},
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
        React.createElement('input', {
          placeholder: 'Search guilds...',
          style: {
            background: 'transparent', border: 'none', outline: 'none',
            fontFamily: fontStack, fontSize: 15, color: t.text, flex: 1,
          }
        })
      ),

      // Category pills
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }},
        ['All', 'Sound', 'Visual', 'Poetry', 'Mixed Media'].map((cat, i) => (
          React.createElement('button', {
            key: cat,
            style: {
              padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontFamily: fontStack, fontSize: 13, fontWeight: 600,
              background: i === 0 ? t.primary : t.surfaceAlt,
              color: i === 0 ? '#fff' : t.textSecondary,
              transition: 'all 0.15s',
            },
          }, cat)
        ))
      ),

      // Guild Cards
      guilds.map(guild => {
        const isJoined = joinedGuilds.includes(guild.id);
        return React.createElement('div', {
          key: guild.id,
          onClick: () => { setSelectedGuild(guild); setActiveScreen('guildDetail'); },
          style: {
            background: t.card, borderRadius: 18, padding: 16, marginBottom: 12,
            border: `1px solid ${isJoined ? guild.color + '44' : t.border}`,
            cursor: 'pointer', transition: 'all 0.2s', boxShadow: t.shadow,
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }},
            React.createElement('div', { style: {
              width: 52, height: 52, borderRadius: 16,
              background: `linear-gradient(135deg, ${guild.color}33, ${guild.color}11)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${guild.color}44`,
            }},
              React.createElement(Icon, { name: guild.icon, size: 26, color: guild.color })
            ),
            React.createElement('div', { style: { flex: 1 }},
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text }}, guild.name),
              React.createElement('div', { style: { fontSize: 13, fontFamily: fontStack, color: t.textSecondary, marginTop: 2 }}, guild.desc)
            )
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }},
            React.createElement('div', { style: { display: 'flex', gap: 12 }},
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 }},
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: t.textMuted }}, guild.members)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 }},
                React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: t.textMuted }}, 'Next: ' + guild.nextSession)
              )
            ),
            React.createElement('button', {
              onClick: (e) => {
                e.stopPropagation();
                if (isJoined) {
                  setJoinedGuilds(prev => prev.filter(id => id !== guild.id));
                  showNotif('Left ' + guild.name);
                } else {
                  setJoinedGuilds(prev => [...prev, guild.id]);
                  showNotif('Joined ' + guild.name + '!');
                }
              },
              style: {
                padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: fontStack, fontSize: 13, fontWeight: 600,
                background: isJoined ? t.surfaceAlt : t.cta,
                color: isJoined ? t.textSecondary : '#fff',
                transition: 'all 0.2s', minWidth: 80,
              },
            }, isJoined ? 'Joined' : 'Join')
          )
        );
      })
    );
  };

  // ===== ARCHIVE SCREEN =====
  const ArchiveScreen = () => {
    return React.createElement('div', { style: {
      padding: '20px 16px 100px', animation: animateIn ? 'slideUp 0.4s ease' : 'none',
    }},
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, fontFamily: fontStack, color: t.text, letterSpacing: '-0.5px', margin: '0 0 6px' }}, 'Echo Archive'),
      React.createElement('p', { style: { fontSize: 15, fontFamily: fontStack, color: t.textSecondary, margin: '0 0 20px' }}, 'Ephemeral artifacts from completed sessions'),

      React.createElement('div', { style: {
        background: `${t.primary}11`, borderRadius: 14, padding: '12px 14px',
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        border: `1px solid ${t.primary}22`,
      }},
        React.createElement(Icon, { name: 'Info', size: 16, color: t.primary }),
        React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: t.primary }}, 'Echos dissolve 24-48 hours after creation')
      ),

      echoArchives.map(echo => {
        const guild = guilds.find(g => g.id === echo.guild);
        return React.createElement('div', {
          key: echo.id,
          style: {
            background: t.card, borderRadius: 20, padding: 0, marginBottom: 16,
            border: `1px solid ${t.border}`, overflow: 'hidden',
            boxShadow: t.shadow, transition: 'all 0.2s',
          },
        },
          // Echo visualization placeholder
          React.createElement('div', { style: {
            height: 140, background: t.gradient1, position: 'relative', overflow: 'hidden',
          }},
            React.createElement('div', { style: {
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(6,182,212,0.3) 0%, transparent 50%)',
              animation: 'shimmer 4s ease-in-out infinite',
            }}),
            // Layers visualization
            Array.from({ length: 5 }).map((_, i) => (
              React.createElement('div', {
                key: i,
                style: {
                  position: 'absolute',
                  left: 20 + i * 60, top: 20 + (i % 3) * 30,
                  width: 50 + i * 10, height: 50 + i * 10,
                  borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                  animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
                }
              })
            )),
            React.createElement('div', { style: {
              position: 'absolute', bottom: 12, left: 16,
              display: 'flex', alignItems: 'center', gap: 6,
            }},
              React.createElement(Icon, { name: 'Layers', size: 14, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: '#fff', fontWeight: 600 }}, echo.layers + ' layers')
            )
          ),
          React.createElement('div', { style: { padding: 16 }},
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }},
              React.createElement('div', null,
                React.createElement('h3', { style: { fontSize: 20, fontWeight: 700, fontFamily: fontStack, color: t.text, margin: '0 0 4px' }}, echo.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 }},
                  guild && React.createElement(Icon, { name: guild.icon, size: 14, color: guild.color }),
                  React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: t.textSecondary }}, guild ? guild.name : '')
                )
              ),
              React.createElement('div', { style: {
                background: `${t.primary}15`, borderRadius: 10, padding: '6px 10px',
                display: 'flex', alignItems: 'center', gap: 4,
              }},
                React.createElement(Icon, { name: 'Timer', size: 14, color: t.primary }),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, fontFamily: fontStack, color: t.primary }}, echo.timeLeft)
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 12 }},
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 }},
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: t.textMuted }}, echo.contributors + ' contributors')
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 }},
                React.createElement(Icon, { name: 'Sparkles', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, fontFamily: fontStack, color: t.textMuted }}, echo.mood)
              )
            ),
            React.createElement('button', {
              style: {
                width: '100%', marginTop: 14, padding: '12px 0', borderRadius: 12,
                border: `1px solid ${t.border}`, background: t.surfaceAlt,
                cursor: 'pointer', fontFamily: fontStack, fontSize: 15, fontWeight: 600,
                color: t.text, transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              },
            },
              React.createElement(Icon, { name: 'Play', size: 16, color: t.primary }),
              'Experience Echo'
            )
          )
        );
      }),

      // Dissolved section
      React.createElement('div', { style: { marginTop: 12 }},
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.textMuted, margin: '0 0 12px' }}, 'Dissolved'),
        ['Sonic Tapestry', 'Liquid Verses', 'Phantom Canvas'].map((name, i) => (
          React.createElement('div', {
            key: i,
            style: {
              background: t.surfaceAlt, borderRadius: 14, padding: 14,
              marginBottom: 8, opacity: 0.6, display: 'flex',
              alignItems: 'center', gap: 12,
            }
          },
            React.createElement(Icon, { name: 'CloudOff', size: 18, color: t.textMuted }),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 15, fontFamily: fontStack, color: t.textMuted, textDecoration: 'line-through' }}, name),
              React.createElement('div', { style: { fontSize: 11, fontFamily: fontStack, color: t.textMuted }}, (i + 1) + ' day' + (i > 0 ? 's' : '') + ' ago')
            )
          )
        ))
      )
    );
  };

  // ===== PROFILE SCREEN =====
  const ProfileScreen = () => {
    const stats = [
      { label: 'Sessions', value: '23', icon: 'Zap' },
      { label: 'Guilds', value: '3', icon: 'Shield' },
      { label: 'Echos', value: '47', icon: 'Waves' },
      { label: 'Streak', value: '7d', icon: 'Flame' },
    ];

    return React.createElement('div', { style: {
      padding: '20px 16px 100px', animation: animateIn ? 'slideUp 0.4s ease' : 'none',
    }},
      // Profile Header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 28 }},
        React.createElement('div', { style: {
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px',
          background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: t.shadowStrong,
        }},
          React.createElement(Icon, { name: 'User', size: 36, color: '#fff' })
        ),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, fontFamily: fontStack, color: t.text, margin: '0 0 4px' }}, 'Luna Meridian'),
        React.createElement('p', { style: { fontSize: 15, fontFamily: fontStack, color: t.textSecondary, margin: 0 }}, 'Sound Alchemist & Visual Dreamer'),
        React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }},
          React.createElement(Badge, { text: 'Founding Weaver', color: t.primary }),
          React.createElement(Badge, { text: 'Echo Master', color: '#8B5CF6' })
        )
      ),

      // Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }},
        stats.map(stat => (
          React.createElement('div', {
            key: stat.label,
            style: {
              background: t.card, borderRadius: 16, padding: '16px 14px',
              border: `1px solid ${t.border}`, textAlign: 'center',
              boxShadow: t.shadow,
            }
          },
            React.createElement('div', { style: {
              width: 36, height: 36, borderRadius: 10, margin: '0 auto 8px',
              background: `${t.primary}15`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }},
              React.createElement(Icon, { name: stat.icon, size: 18, color: t.primary })
            ),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, fontFamily: fontStack, color: t.text }}, stat.value),
            React.createElement('div', { style: { fontSize: 13, fontFamily: fontStack, color: t.textMuted }}, stat.label)
          )
        ))
      ),

      // My Guilds
      React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text, margin: '0 0 12px' }}, 'My Guilds'),
      guilds.filter(g => joinedGuilds.includes(g.id)).map(guild => (
        React.createElement('div', {
          key: guild.id,
          style: {
            background: t.card, borderRadius: 14, padding: 14, marginBottom: 8,
            border: `1px solid ${t.border}`, display: 'flex',
            alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', { style: {
            width: 40, height: 40, borderRadius: 12,
            background: `${guild.color}22`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }},
            React.createElement(Icon, { name: guild.icon, size: 20, color: guild.color })
          ),
          React.createElement('div', { style: { flex: 1 }},
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, fontFamily: fontStack, color: t.text }}, guild.name),
            React.createElement('div', { style: { fontSize: 13, fontFamily: fontStack, color: t.textMuted }}, guild.members + ' members')
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
        )
      )),

      // Settings
      React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text, margin: '20px 0 12px' }}, 'Settings'),
      [
        { icon: isDark ? 'Sun' : 'Moon', label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode', action: () => setIsDark(!isDark) },
        { icon: 'Bell', label: 'Session Notifications', action: () => showNotif('Notifications enabled') },
        { icon: 'Shield', label: 'Privacy & Data', action: () => {} },
        { icon: 'HelpCircle', label: 'Help & Support', action: () => {} },
      ].map((item, i) => (
        React.createElement('button', {
          key: i,
          onClick: item.action,
          style: {
            width: '100%', background: t.card, borderRadius: 14, padding: '14px 14px',
            marginBottom: 6, border: `1px solid ${t.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
            textAlign: 'left', transition: 'all 0.15s',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(Icon, { name: item.icon, size: 20, color: t.textSecondary }),
          React.createElement('span', { style: { fontSize: 15, fontFamily: fontStack, color: t.text, flex: 1 }}, item.label),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
        )
      ))
    );
  };

  // ===== GUILD DETAIL SCREEN =====
  const GuildDetailScreen = () => {
    const guild = selectedGuild || guilds[0];
    const isJoined = joinedGuilds.includes(guild.id);

    return React.createElement('div', { style: {
      padding: '0 0 100px', animation: animateIn ? 'slideUp 0.3s ease' : 'none',
    }},
      // Header
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${guild.color}dd, ${guild.color}88)`,
        padding: '20px 16px 28px', position: 'relative', overflow: 'hidden',
      }},
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)' }}),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 }},
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 12, padding: '8px 12px', cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 },
          },
            React.createElement(Icon, { name: 'ArrowLeft', size: 16, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 15, fontFamily: fontStack, color: '#fff' }}, 'Guilds')
          ),
          React.createElement('div', { style: {
            width: 64, height: 64, borderRadius: 20, marginBottom: 12,
            background: 'rgba(255,255,255,0.2)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }},
            React.createElement(Icon, { name: guild.icon, size: 32, color: '#fff' })
          ),
          React.createElement('h2', { style: { fontSize: 26, fontWeight: 800, fontFamily: fontStack, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.5px' }}, guild.name),
          React.createElement('p', { style: { fontSize: 15, fontFamily: fontStack, color: 'rgba(255,255,255,0.85)', margin: '0 0 16px' }}, guild.desc),
          React.createElement('div', { style: { display: 'flex', gap: 12 }},
            React.createElement('button', {
              onClick: () => {
                if (isJoined) {
                  setJoinedGuilds(prev => prev.filter(id => id !== guild.id));
                } else {
                  setJoinedGuilds(prev => [...prev, guild.id]);
                }
              },
              style: {
                padding: '10px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                fontFamily: fontStack, fontSize: 15, fontWeight: 600,
                background: isJoined ? 'rgba(255,255,255,0.2)' : '#fff',
                color: isJoined ? '#fff' : guild.color,
                transition: 'all 0.2s',
              },
            }, isJoined ? 'Leave Guild' : 'Join Guild'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 }},
              React.createElement(Icon, { name: 'Users', size: 16, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 15, fontFamily: fontStack, color: '#fff' }}, guild.members + ' members')
            )
          )
        )
      ),

      // Content
      React.createElement('div', { style: { padding: '20px 16px' }},
        // Next Session
        React.createElement('div', { style: {
          background: t.card, borderRadius: 16, padding: 16, marginBottom: 16,
          border: `1px solid ${t.border}`, boxShadow: t.shadow,
        }},
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }},
            React.createElement(Icon, { name: 'Calendar', size: 18, color: t.cta }),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, fontFamily: fontStack, color: t.text }}, 'Next Loom Session')
          ),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, fontFamily: fontStack, color: t.text, marginBottom: 4 }}, 'Enchanted Frequencies II'),
          React.createElement('div', { style: { fontSize: 13, fontFamily: fontStack, color: t.textSecondary, marginBottom: 12 }}, 'Starting in ' + guild.nextSession),
          React.createElement('button', {
            style: {
              width: '100%', padding: '12px', borderRadius: 12, border: 'none',
              background: t.cta, cursor: 'pointer', fontFamily: fontStack,
              fontSize: 15, fontWeight: 600, color: '#fff', transition: 'all 0.2s',
            },
          }, 'Set Reminder')
        ),

        // Recent Activity
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, fontFamily: fontStack, color: t.text, margin: '0 0 12px' }}, 'Recent Activity'),
        [
          { text: 'Completed "Astral Harmonics" echo with 8 contributors', time: '2h ago', icon: 'CheckCircle' },
          { text: 'New member @SonicDrifter joined the guild', time: '5h ago', icon: 'UserPlus' },
          { text: 'Session "Crystal Resonance" scheduled for tomorrow', time: '1d ago', icon: 'Calendar' },
        ].map((activity, i) => (
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: 14, marginBottom: 8,
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'start', gap: 10,
            }
          },
            React.createElement('div', { style: {
              width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: `${guild.color}15`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }},
              React.createElement(Icon, { name: activity.icon, size: 16, color: guild.color })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 15, fontFamily: fontStack, color: t.text, lineHeight: 1.4 }}, activity.text),
              React.createElement('div', { style: { fontSize: 11, fontFamily: fontStack, color: t.textMuted, marginTop: 4 }}, activity.time)
            )
          )
        ))
      )
    );
  };

  // Screen mapping
  const screens = {
    home: HomeScreen,
    sessions: SessionsScreen,
    session: SessionScreen,
    explore: ExploreScreen,
    archive: ArchiveScreen,
    profile: ProfileScreen,
    guildDetail: GuildDetailScreen,
  };

  // Tab config
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'sessions', label: 'Sessions', icon: 'Radio' },
    { id: 'explore', label: 'Guilds', icon: 'Compass' },
    { id: 'archive', label: 'Archive', icon: 'Disc' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', { style: {
    minHeight: '100vh', background: '#f0f0f0',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: fontStack, padding: '20px 0',
  }},
    // CSS Animations
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.2); }
      }
      @keyframes shimmer {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      textarea::placeholder, input::placeholder { color: ${t.textMuted}; }
    `),

    // Phone Frame
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 40,
      background: t.bg, position: 'relative', overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      border: '4px solid #333',
    }},
      // Scroll container
      React.createElement('div', { style: {
        height: '100%', overflowY: 'auto', overflowX: 'hidden',
        background: t.gradient3,
      }},
        React.createElement(ActiveScreen)
      ),

      // Notification toast
      notification && React.createElement('div', { style: {
        position: 'absolute', top: 16, left: 16, right: 16,
        background: t.card, borderRadius: 14, padding: '12px 16px',
        boxShadow: t.shadowStrong, animation: 'slideDown 0.3s ease',
        display: 'flex', alignItems: 'center', gap: 10,
        border: `1px solid ${t.border}`, zIndex: 100,
      }},
        React.createElement(Icon, { name: 'CheckCircle', size: 18, color: '#10B981' }),
        React.createElement('span', { style: { fontSize: 15, fontFamily: fontStack, color: t.text }}, notification)
      ),

      // Bottom Tab Bar
      React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.navBg, backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.border}`,
        padding: '6px 0 24px', display: 'flex', justifyContent: 'space-around',
        zIndex: 50,
      }},
        tabs.map(tab => {
          const isActive = activeScreen === tab.id || (tab.id === 'sessions' && activeScreen === 'session') || (tab.id === 'explore' && activeScreen === 'guildDetail');
          return React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 2, padding: '6px 12px', minWidth: 56, minHeight: 44,
              transition: 'all 0.2s',
            },
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: isActive ? t.primary : t.textMuted,
            }),
            React.createElement('span', { style: {
              fontSize: 10, fontFamily: fontStack, fontWeight: isActive ? 600 : 400,
              color: isActive ? t.primary : t.textMuted,
            }}, tab.label)
          );
        })
      )
    )
  );
}
