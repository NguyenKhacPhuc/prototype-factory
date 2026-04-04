function App() {
  const { useState, useEffect, useRef } = React;

  const [isDark, setIsDark] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [flowActive, setFlowActive] = useState(false);
  const [flowSeconds, setFlowSeconds] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [guildTab, setGuildTab] = useState('explore');
  const [entryMode, setEntryMode] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState('Forest Rain');
  const [pressedBtn, setPressedBtn] = useState(null);

  const light = {
    bg: '#F5EFE0',
    surface: '#EDE5D0',
    card: '#E8DEC8',
    cardAlt: '#DFD4BA',
    primary: '#3D5A40',
    primaryDark: '#28402B',
    secondary: '#2D2B55',
    secondaryDark: '#1A193A',
    gold: '#C9A44A',
    goldDark: '#A6812A',
    terracotta: '#B5633A',
    terracottaDark: '#8A421D',
    text: '#2C2415',
    textMuted: '#7A6B55',
    textFaint: '#A89880',
    border: '#B0987A',
    divider: '#CDB898',
    overlay: 'rgba(44,36,21,0.06)',
  };

  const dark = {
    bg: '#1A1812',
    surface: '#252219',
    card: '#2E2B20',
    cardAlt: '#38342A',
    primary: '#5A8A5E',
    primaryDark: '#3D5A40',
    secondary: '#6B68C0',
    secondaryDark: '#4A4895',
    gold: '#D4A84A',
    goldDark: '#B88A2A',
    terracotta: '#C97050',
    terracottaDark: '#A04A28',
    text: '#EDE5D0',
    textMuted: '#A89880',
    textFaint: '#7A6B55',
    border: '#4A4535',
    divider: '#3A3525',
    overlay: 'rgba(255,255,255,0.04)',
  };

  const c = isDark ? dark : light;

  // Retro paper texture via background lines
  const paperTexture = {
    backgroundImage: isDark
      ? `repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(255,255,255,0.018) 23px, rgba(255,255,255,0.018) 24px)`
      : `repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(44,36,21,0.04) 23px, rgba(44,36,21,0.04) 24px)`,
  };

  // Flow timer
  useEffect(() => {
    let interval;
    if (flowActive) {
      interval = setInterval(() => setFlowSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [flowActive]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const guilds = [
    { id: 'dawn-writers', name: 'The Dawn Writers', icon: '✍', members: 47, ritual: 'Morning Pages', time: '6:00 AM', frequency: 'Daily', desc: 'Awakening the creative voice through daily morning writing rituals at the edge of dawn.', color: '#C9A44A', joined: true, streak: 12, duration: '30 min', category: 'Writing' },
    { id: 'mindful-mavericks', name: 'Mindful Mavericks', icon: '◎', members: 83, ritual: 'Silent Meditation', time: '7:30 AM', frequency: 'Daily', desc: 'Finding collective stillness in the noise of the modern world. Together in silence.', color: '#3D5A40', joined: true, streak: 7, duration: '20 min', category: 'Meditation' },
    { id: 'code-cadets', name: 'The Code Cadets', icon: '⌨', members: 124, ritual: 'Deep Work Sprint', time: '9:00 AM', frequency: 'Weekdays', desc: 'Building software and sharpening craft through disciplined, focused daily practice.', color: '#2D2B55', joined: false, streak: 0, duration: '60 min', category: 'Study' },
    { id: 'urban-meditators', name: 'Urban Meditators', icon: '⟡', members: 61, ritual: 'Body Scan', time: '12:00 PM', frequency: 'Daily', desc: 'Reclaiming inner peace within the relentless rhythm of city life.', color: '#B5633A', joined: false, streak: 0, duration: '25 min', category: 'Meditation' },
    { id: 'stoic-scholars', name: 'Stoic Scholars', icon: '𝕊', members: 39, ritual: 'Evening Reflection', time: '9:00 PM', frequency: 'Daily', desc: 'Practicing ancient wisdom for modern resilience. Philosophy as daily discipline.', color: '#7A6B55', joined: false, streak: 0, duration: '30 min', category: 'Study' },
    { id: 'movement-collective', name: 'Movement Collective', icon: '◈', members: 92, ritual: 'Flow Movement', time: '6:30 AM', frequency: 'Daily', desc: 'Physical practice as moving meditation. The body as the first instrument of growth.', color: '#3D5A40', joined: false, streak: 0, duration: '40 min', category: 'Movement' },
  ];

  const myGuilds = guilds.filter(g => g.joined);
  const exploreGuilds = guilds.filter(g => !g.joined);

  const upcomingFlows = [
    { guild: 'The Dawn Writers', time: 'Today, 6:00 AM', duration: '30 min', members: 18, icon: '✍' },
    { guild: 'Mindful Mavericks', time: 'Today, 7:30 AM', duration: '20 min', members: 24, icon: '◎' },
    { guild: 'The Dawn Writers', time: 'Tomorrow, 6:00 AM', duration: '30 min', members: 21, icon: '✍' },
  ];

  const journalEntries = [
    { date: 'Apr 4', guild: 'Dawn Writers', excerpt: 'Found clarity in the fog of early morning. Three pages flowed like water — no resistance, only current.', mood: '🌅', duration: '32 min' },
    { date: 'Apr 3', guild: 'Mindful Mavericks', excerpt: 'The collective stillness was palpable today. Felt genuinely held by the silent presence of the others.', mood: '🍃', duration: '21 min' },
    { date: 'Apr 2', guild: 'Dawn Writers', excerpt: 'Struggled to begin, but the guild presence kept me anchored to the page. Gratitude for accountability.', mood: '✨', duration: '28 min' },
    { date: 'Apr 1', guild: 'Mindful Mavericks', excerpt: 'A restless session, but showing up matters more than perfection. The ritual holds even when the mind wanders.', mood: '🌿', duration: '20 min' },
  ];

  const guildMembers = [
    { name: 'Aria', initials: 'AK', status: 'active', minutes: 14 },
    { name: 'Marcus', initials: 'MW', status: 'active', minutes: 14 },
    { name: 'Suki', initials: 'ST', status: 'deep', minutes: 10 },
    { name: 'Devon', initials: 'DL', status: 'active', minutes: 13 },
    { name: 'Priya', initials: 'PB', status: 'paused', minutes: 5 },
    { name: 'Finn', initials: 'FC', status: 'deep', minutes: 12 },
  ];

  const soundscapes = ['Forest Rain', 'Deep Focus', 'Ancient Library', 'Morning Birds', 'Fireplace'];

  const getPresenceColor = (status) => {
    if (status === 'active') return '#5A8A5E';
    if (status === 'deep') return '#6B68C0';
    if (status === 'paused') return '#7A6B55';
    return '#7A6B55';
  };

  const getPresenceLabel = (status) => {
    if (status === 'active') return 'In Flow';
    if (status === 'deep') return 'Deep';
    if (status === 'paused') return 'Away';
    return '';
  };

  const btnStyle = (id, base) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.97) translateY(1px)' : 'scale(1)',
    transition: 'transform 0.1s, opacity 0.1s',
    cursor: 'pointer',
  });

  // ─── HOME SCREEN ────────────────────────────────────────────────────────────
  const HomeScreen = () =>
    React.createElement('div', {
      style: {
        height: '100%',
        overflowY: 'auto',
        background: c.bg,
        ...paperTexture,
        fontFamily: "'Bitter', Georgia, serif",
      }
    },
      // ── Header
      React.createElement('div', {
        style: {
          padding: '20px 20px 14px',
          borderBottom: `2px solid ${c.gold}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(201,164,74,0.06)',
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 10, color: c.gold, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }
          }, '— Guild Hall —'),
          React.createElement('div', {
            style: { fontSize: 22, fontWeight: 700, color: c.text, marginTop: 2, letterSpacing: -0.5 }
          }, 'Momentum Guilds'),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 20,
            padding: '5px 12px',
            fontSize: 11,
            color: c.textMuted,
            cursor: 'pointer',
            fontFamily: "'Bitter', serif",
            fontWeight: 600,
          }
        }, isDark ? '☀ Light' : '☽ Dark'),
      ),

      // ── Greeting
      React.createElement('div', { style: { padding: '14px 20px 4px' } },
        React.createElement('div', { style: { fontSize: 12, color: c.textMuted } }, 'Saturday, April 4th — Good morning'),
        React.createElement('div', { style: { fontSize: 19, color: c.text, fontWeight: 700, marginTop: 2 } }, 'Welcome back, Scout.'),
      ),

      // ── Gold rule
      React.createElement('div', {
        style: { margin: '12px 20px 0', height: 1, background: `linear-gradient(to right, transparent, ${c.gold}80, transparent)` }
      }),

      // ── Your Guilds — horizontal scroll
      React.createElement('div', { style: { padding: '14px 20px 4px' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('div', {
            style: { fontSize: 11, color: c.gold, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700 }
          }, '✦  Your Guilds'),
          React.createElement('button', {
            onClick: () => setActiveScreen('guilds'),
            style: { background: 'none', border: 'none', color: c.gold, fontSize: 12, cursor: 'pointer', fontFamily: "'Bitter', serif", textDecoration: 'underline' }
          }, 'Browse all →'),
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }
        },
          ...myGuilds.map(guild =>
            React.createElement('div', {
              key: guild.id,
              onClick: () => { setSelectedGuild(guild); setActiveScreen('flow'); },
              style: {
                minWidth: 155,
                background: c.card,
                border: `2px solid ${c.border}`,
                borderRadius: 4,
                padding: '14px 12px',
                cursor: 'pointer',
                boxShadow: `3px 3px 0 ${c.divider}`,
                flexShrink: 0,
              }
            },
              React.createElement('div', {
                style: {
                  width: 38, height: 38,
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  borderRadius: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, marginBottom: 8,
                }
              }, guild.icon),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: c.text, lineHeight: 1.3, marginBottom: 4 } }, guild.name),
              React.createElement('div', { style: { fontSize: 11, color: c.textMuted, marginBottom: 8 } }, guild.ritual),
              React.createElement('div', {
                style: {
                  display: 'inline-block',
                  background: c.primary,
                  color: '#fff',
                  fontSize: 10,
                  padding: '2px 7px',
                  borderRadius: 2,
                  fontWeight: 700,
                }
              }, `${guild.streak}-day streak`),
            )
          ),
        ),
      ),

      // ── Gold rule
      React.createElement('div', {
        style: { margin: '10px 20px', height: 1, background: `linear-gradient(to right, transparent, ${c.gold}80, transparent)` }
      }),

      // ── Upcoming Flows
      React.createElement('div', { style: { padding: '4px 20px 4px' } },
        React.createElement('div', {
          style: { fontSize: 11, color: c.gold, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }
        }, '✦  Upcoming Flows'),
        ...upcomingFlows.map((flow, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setActiveScreen('flow'),
            style: {
              display: 'flex', alignItems: 'center',
              padding: '11px 12px',
              marginBottom: 7,
              background: c.card,
              border: `1px solid ${c.border}`,
              borderLeft: `4px solid ${c.primary}`,
              borderRadius: 3,
              cursor: 'pointer',
              boxShadow: `2px 2px 0 ${c.divider}`,
            }
          },
            React.createElement('div', { style: { fontSize: 18, marginRight: 10 } }, flow.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: c.text } }, flow.guild),
              React.createElement('div', { style: { fontSize: 11, color: c.textMuted, marginTop: 2 } }, `${flow.time} · ${flow.duration} · ${flow.members} members`),
            ),
            React.createElement('div', {
              style: {
                fontSize: 11, color: c.primary,
                border: `1px solid ${c.primary}`,
                padding: '3px 9px', borderRadius: 2, fontWeight: 700,
              }
            }, 'Join'),
          )
        ),
      ),

      // ── Gold rule
      React.createElement('div', {
        style: { margin: '10px 20px', height: 1, background: `linear-gradient(to right, transparent, ${c.gold}80, transparent)` }
      }),

      // ── Hub-and-Spoke Quick Access
      React.createElement('div', { style: { padding: '4px 20px 24px' } },
        React.createElement('div', {
          style: { fontSize: 11, color: c.gold, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }
        }, '✦  Quick Access'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
        },
          // Guilds spoke
          React.createElement('div', {
            onClick: () => setActiveScreen('guilds'),
            style: {
              background: c.primary,
              borderRadius: 4,
              padding: '18px 14px',
              cursor: 'pointer',
              border: `2px solid ${c.primaryDark}`,
              boxShadow: `3px 3px 0 ${c.primaryDark}`,
            }
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, '⚔'),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 700, color: '#fff', display: 'block', lineHeight: 1.2 }
            }, 'Explore Guilds'),
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.65)', display: 'block', marginTop: 3 } }, 'Find your people'),
          ),
          // Flow spoke
          React.createElement('div', {
            onClick: () => setActiveScreen('flow'),
            style: {
              background: c.secondary,
              borderRadius: 4,
              padding: '18px 14px',
              cursor: 'pointer',
              border: `2px solid ${c.secondaryDark}`,
              boxShadow: `3px 3px 0 ${c.secondaryDark}`,
            }
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, '◉'),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 700, color: '#fff', display: 'block', lineHeight: 1.2 }
            }, 'Start a Flow'),
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.65)', display: 'block', marginTop: 3 } }, 'Enter your practice'),
          ),
          // Journal spoke
          React.createElement('div', {
            onClick: () => setActiveScreen('journal'),
            style: {
              background: c.card,
              borderRadius: 4,
              padding: '18px 14px',
              cursor: 'pointer',
              border: `2px solid ${c.border}`,
              boxShadow: `3px 3px 0 ${c.border}`,
            }
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, '📔'),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 700, color: c.text, display: 'block', lineHeight: 1.2 }
            }, 'Ritual Journal'),
            React.createElement('span', { style: { fontSize: 10, color: c.textMuted, display: 'block', marginTop: 3 } }, 'Reflect & record'),
          ),
          // Progress spoke
          React.createElement('div', {
            style: {
              background: c.terracotta,
              borderRadius: 4,
              padding: '18px 14px',
              cursor: 'pointer',
              border: `2px solid ${c.terracottaDark}`,
              boxShadow: `3px 3px 0 ${c.terracottaDark}`,
            }
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, '🏆'),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 700, color: '#fff', display: 'block', lineHeight: 1.2 }
            }, 'My Progress'),
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.65)', display: 'block', marginTop: 3 } }, '12-day streak'),
          ),
        ),
      ),
    );

  // ─── GUILDS SCREEN ──────────────────────────────────────────────────────────
  const GuildsScreen = () => {
    const categories = ['All', 'Writing', 'Meditation', 'Movement', 'Craft', 'Study', 'Creative'];
    const [catFilter, setCatFilter] = useState('All');

    const filtered = exploreGuilds.filter(g => catFilter === 'All' || g.category === catFilter);

    return React.createElement('div', {
      style: {
        height: '100%',
        overflowY: 'auto',
        background: c.bg,
        ...paperTexture,
        fontFamily: "'Bitter', Georgia, serif",
      }
    },
      // ── Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 14px',
          borderBottom: `2px solid ${c.gold}`,
          display: 'flex', alignItems: 'center', gap: 12,
          background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(201,164,74,0.06)',
        }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: c.text, padding: 0, lineHeight: 1 }
        }, '←'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 10, color: c.gold, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 } }, '— Registry —'),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: c.text } }, 'Guild Registry'),
        ),
      ),

      // ── Tabs
      React.createElement('div', {
        style: { display: 'flex', borderBottom: `1px solid ${c.divider}` }
      },
        ['explore', 'mine'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setGuildTab(tab),
            style: {
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: guildTab === tab ? `3px solid ${c.primary}` : '3px solid transparent',
              color: guildTab === tab ? c.primary : c.textMuted,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Bitter', serif",
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }
          }, tab === 'explore' ? 'Discover' : 'My Guilds')
        ),
      ),

      guildTab === 'explore'
        ? React.createElement('div', null,
            // Featured banner
            React.createElement('div', {
              style: {
                margin: '14px 20px 4px',
                padding: '18px',
                background: c.secondary,
                borderRadius: 4,
                border: `2px solid ${c.secondaryDark}`,
                boxShadow: `4px 4px 0 ${c.secondaryDark}`,
              }
            },
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 } }, '✦ Featured Guild ✦'),
              React.createElement('div', { style: { fontSize: 19, color: '#fff', fontWeight: 700, marginBottom: 6 } }, 'The Stoic Scholars'),
              React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: '0 0 12px', lineHeight: 1.6 } }, 'Evening reflections rooted in Stoic philosophy. Build equanimity through nightly practice.'),
              React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 } },
                ['39 Members', '9:00 PM Daily', '30 min'].map(tag =>
                  React.createElement('span', {
                    key: tag,
                    style: { background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 10, padding: '3px 8px', borderRadius: 2, fontWeight: 600 }
                  }, tag)
                ),
              ),
              React.createElement('button', {
                style: {
                  background: c.gold,
                  border: 'none',
                  color: '#2C2415',
                  padding: '9px 18px',
                  borderRadius: 3,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Bitter', serif",
                }
              }, 'Request Entry →'),
            ),

            // Category filters — horizontal scroll
            React.createElement('div', { style: { padding: '14px 20px 4px' } },
              React.createElement('div', { style: { fontSize: 11, color: c.gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 } }, 'Filter by Discipline'),
              React.createElement('div', {
                style: { display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }
              },
                categories.map(cat =>
                  React.createElement('button', {
                    key: cat,
                    onClick: () => setCatFilter(cat),
                    style: {
                      whiteSpace: 'nowrap',
                      padding: '5px 12px',
                      background: catFilter === cat ? c.primary : c.card,
                      border: `1px solid ${catFilter === cat ? c.primary : c.border}`,
                      borderRadius: 2,
                      fontSize: 12,
                      color: catFilter === cat ? '#fff' : c.text,
                      cursor: 'pointer',
                      fontFamily: "'Bitter', serif",
                      fontWeight: catFilter === cat ? 700 : 400,
                    }
                  }, cat)
                ),
              ),
            ),

            // Guild list
            React.createElement('div', { style: { padding: '8px 20px 20px' } },
              React.createElement('div', { style: { fontSize: 11, color: c.gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 } }, `${filtered.length} Open Guilds`),
              ...filtered.map(guild =>
                React.createElement('div', {
                  key: guild.id,
                  style: {
                    marginBottom: 10,
                    padding: '14px',
                    background: c.card,
                    border: `2px solid ${c.border}`,
                    borderRadius: 4,
                    boxShadow: `3px 3px 0 ${c.divider}`,
                    cursor: 'pointer',
                  }
                },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
                    React.createElement('div', {
                      style: {
                        width: 46, height: 46, flexShrink: 0,
                        background: c.surface,
                        border: `2px solid ${c.border}`,
                        borderRadius: 4,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                      }
                    }, guild.icon),
                    React.createElement('div', { style: { flex: 1 } },
                      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: c.text, marginBottom: 3 } }, guild.name),
                      React.createElement('div', { style: { fontSize: 11, color: c.textMuted, marginBottom: 8, lineHeight: 1.5 } }, guild.desc),
                      React.createElement('div', { style: { display: 'flex', gap: 5, flexWrap: 'wrap' } },
                        React.createElement('span', { style: { background: c.surface, border: `1px solid ${c.border}`, fontSize: 10, padding: '2px 6px', borderRadius: 2, color: c.textMuted } }, `${guild.members} members`),
                        React.createElement('span', { style: { background: c.surface, border: `1px solid ${c.border}`, fontSize: 10, padding: '2px 6px', borderRadius: 2, color: c.textMuted } }, `${guild.time} · ${guild.duration}`),
                        React.createElement('span', { style: { background: c.primary, fontSize: 10, padding: '2px 6px', borderRadius: 2, color: '#fff', fontWeight: 600 } }, guild.frequency),
                      ),
                    ),
                  ),
                )
              ),
            ),
          )
        : // My Guilds tab
          React.createElement('div', { style: { padding: '14px 20px 20px' } },
            ...myGuilds.map(guild =>
              React.createElement('div', {
                key: guild.id,
                onClick: () => { setSelectedGuild(guild); setActiveScreen('flow'); },
                style: {
                  marginBottom: 12,
                  padding: '16px',
                  background: c.card,
                  border: `2px solid ${c.border}`,
                  borderRadius: 4,
                  boxShadow: `3px 3px 0 ${c.divider}`,
                  cursor: 'pointer',
                }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 } },
                  React.createElement('div', {
                    style: {
                      width: 50, height: 50,
                      background: guild.color + '18',
                      border: `2px solid ${guild.color}60`,
                      borderRadius: 4,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24,
                    }
                  }, guild.icon),
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: c.text } }, guild.name),
                    React.createElement('div', { style: { fontSize: 12, color: c.textMuted, marginTop: 2 } }, guild.ritual),
                  ),
                  React.createElement('div', {
                    style: {
                      background: c.primary,
                      color: '#fff',
                      fontSize: 14,
                      padding: '6px 10px',
                      borderRadius: 3,
                      fontWeight: 700,
                      textAlign: 'center',
                      minWidth: 44,
                    }
                  },
                    React.createElement('div', null, guild.streak),
                    React.createElement('div', { style: { fontSize: 9, opacity: 0.75, fontWeight: 400 } }, 'days'),
                  ),
                ),
                React.createElement('div', {
                  style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    borderTop: `1px solid ${c.divider}`,
                    paddingTop: 12,
                  }
                },
                  [['Members', guild.members], ['Next Flow', guild.time], ['Duration', guild.duration]].map(([label, val]) =>
                    React.createElement('div', { key: label, style: { textAlign: 'center' } },
                      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: c.text } }, val),
                      React.createElement('div', { style: { fontSize: 10, color: c.textMuted, marginTop: 2 } }, label),
                    )
                  ),
                ),
                React.createElement('button', {
                  onClick: (e) => { e.stopPropagation(); setSelectedGuild(guild); setActiveScreen('flow'); },
                  style: {
                    marginTop: 12,
                    width: '100%',
                    background: c.primary,
                    border: 'none',
                    borderRadius: 3,
                    padding: '9px',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: "'Bitter', serif",
                    letterSpacing: 0.5,
                  }
                }, 'Enter Flow →'),
              )
            ),
          ),
    );
  };

  // ─── FLOW SCREEN ────────────────────────────────────────────────────────────
  const FlowScreen = () => {
    const guild = selectedGuild || guilds[0];
    const activeMembers = guildMembers.filter(m => m.status !== 'paused').length;

    return React.createElement('div', {
      style: {
        height: '100%',
        overflowY: 'auto',
        background: isDark ? '#0D0C08' : '#111E13',
        fontFamily: "'Bitter', Georgia, serif",
      }
    },
      // ── Header
      React.createElement('div', {
        style: {
          padding: '16px 20px',
          borderBottom: `1px solid rgba(201,164,74,0.25)`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.2)',
        }
      },
        React.createElement('button', {
          onClick: () => { setFlowActive(false); setActiveScreen('home'); },
          style: {
            background: 'none',
            border: `1px solid rgba(255,255,255,0.18)`,
            borderRadius: 3,
            padding: '5px 11px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 11,
            cursor: 'pointer',
            fontFamily: "'Bitter', serif",
            fontWeight: 600,
          }
        }, '← Leave'),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 10, color: '#C9A44A', letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700 } }, guild.ritual),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 2 } }, guild.name),
        ),
        React.createElement('div', {
          style: {
            background: flowActive ? 'rgba(61,90,64,0.35)' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${flowActive ? '#5A8A5E' : 'rgba(255,255,255,0.18)'}`,
            borderRadius: 3,
            padding: '5px 10px',
            fontSize: 10,
            color: flowActive ? '#7FC480' : 'rgba(255,255,255,0.5)',
            fontWeight: 700,
            letterSpacing: 1,
          }
        }, flowActive ? '● LIVE' : '○ READY'),
      ),

      // ── Ambient timer circle
      React.createElement('div', {
        style: {
          margin: '20px 20px 0',
          padding: '28px 20px',
          background: 'rgba(201,164,74,0.04)',
          border: `1px solid rgba(201,164,74,0.15)`,
          borderRadius: 4,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Concentric decorative rings
        ...[100, 150, 200].map((size, i) =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size, height: size,
              borderRadius: '50%',
              border: `1px solid rgba(201,164,74,${0.08 - i * 0.02})`,
              pointerEvents: 'none',
            }
          })
        ),

        React.createElement('div', { style: { fontSize: 10, color: 'rgba(201,164,74,0.7)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 700, position: 'relative' } }, '✦ Duration ✦'),
        React.createElement('div', {
          style: {
            fontSize: 48,
            fontWeight: 700,
            color: flowActive ? '#fff' : 'rgba(255,255,255,0.5)',
            letterSpacing: 5,
            fontVariantNumeric: 'tabular-nums',
            position: 'relative',
            lineHeight: 1,
          }
        }, formatTime(flowSeconds)),
        React.createElement('div', {
          style: { fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 8, position: 'relative' }
        }, flowActive ? 'Session in progress — breathe' : 'Begin when you are ready'),

        // Controls
        React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', marginTop: 22, position: 'relative' } },
          React.createElement('button', {
            onClick: () => setFlowActive(!flowActive),
            style: {
              background: flowActive ? '#8A421D' : '#3D5A40',
              border: `1px solid ${flowActive ? '#6B2010' : '#28402B'}`,
              borderRadius: 3,
              padding: '11px 30px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Bitter', serif",
              letterSpacing: 0.5,
            }
          }, flowActive ? '⏸  Pause' : '▶  Begin Flow'),
          flowActive && React.createElement('button', {
            onClick: () => { setFlowActive(false); setFlowSeconds(0); setEntryMode(true); setActiveScreen('journal'); },
            style: {
              background: 'transparent',
              border: `1px solid rgba(255,255,255,0.2)`,
              borderRadius: 3,
              padding: '11px 16px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: "'Bitter', serif",
            }
          }, 'End & Journal'),
        ),
      ),

      // ── Presence Panes
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
        },
          React.createElement('div', { style: { fontSize: 10, color: '#C9A44A', letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700 } }, '✦ Presence Panes'),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.35)' } }, `${activeMembers} of ${guildMembers.length} in flow`),
        ),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }
        },
          ...guildMembers.map((member, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: member.status === 'deep'
                  ? 'rgba(45,43,85,0.55)'
                  : member.status === 'active'
                  ? 'rgba(61,90,64,0.4)'
                  : 'rgba(50,46,38,0.4)',
                border: `1px solid ${getPresenceColor(member.status)}35`,
                borderRadius: 4,
                padding: '12px 8px',
                textAlign: 'center',
              }
            },
              React.createElement('div', {
                style: {
                  width: 38, height: 38,
                  borderRadius: '50%',
                  background: `${getPresenceColor(member.status)}20`,
                  border: `2px solid ${getPresenceColor(member.status)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  color: getPresenceColor(member.status),
                  margin: '0 auto 7px',
                }
              }, member.initials),
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 700 } }, member.name),
              React.createElement('div', { style: { fontSize: 9, color: getPresenceColor(member.status), marginTop: 2, fontWeight: 600 } }, getPresenceLabel(member.status)),
              member.status !== 'paused' && React.createElement('div', { style: { fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2 } }, `${member.minutes}m`),
            )
          ),
        ),
      ),

      // ── Ambient Soundscape — horizontal scroll
      React.createElement('div', { style: { padding: '16px 20px 24px' } },
        React.createElement('div', { style: { fontSize: 10, color: '#C9A44A', letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 } }, '✦ Ambient Soundscape'),
        React.createElement('div', {
          style: { display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }
        },
          soundscapes.map(sound =>
            React.createElement('button', {
              key: sound,
              onClick: () => setActiveSoundscape(sound),
              style: {
                whiteSpace: 'nowrap',
                padding: '7px 13px',
                background: activeSoundscape === sound ? 'rgba(61,90,64,0.55)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeSoundscape === sound ? '#5A8A5E' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 3,
                fontSize: 11,
                color: activeSoundscape === sound ? '#7FC480' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer',
                fontFamily: "'Bitter', serif",
                fontWeight: activeSoundscape === sound ? 700 : 400,
              }
            }, sound)
          ),
        ),
      ),
    );
  };

  // ─── JOURNAL SCREEN ─────────────────────────────────────────────────────────
  const JournalScreen = () => {
    const [filterGuild, setFilterGuild] = useState('All');

    const filtered = filterGuild === 'All' ? journalEntries : journalEntries.filter(e => e.guild === filterGuild);

    return React.createElement('div', {
      style: {
        height: '100%',
        overflowY: 'auto',
        background: c.bg,
        ...paperTexture,
        fontFamily: "'Bitter', Georgia, serif",
      }
    },
      // ── Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 14px',
          borderBottom: `2px solid ${c.gold}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(201,164,74,0.06)',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('button', {
            onClick: () => { setActiveScreen('home'); setEntryMode(false); },
            style: { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: c.text, padding: 0 }
          }, '←'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 10, color: c.gold, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 } }, '— Chronicle —'),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: c.text } }, 'Ritual Journal'),
          ),
        ),
        React.createElement('button', {
          onClick: () => setEntryMode(!entryMode),
          style: {
            background: entryMode ? c.card : c.primary,
            border: `1px solid ${entryMode ? c.border : c.primaryDark}`,
            borderRadius: 3,
            padding: '6px 13px',
            color: entryMode ? c.text : '#fff',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Bitter', serif",
          }
        }, entryMode ? '← Back' : '+ New Entry'),
      ),

      entryMode
        ? // ── New Entry Form
          React.createElement('div', { style: { padding: '18px 20px 24px' } },
            React.createElement('div', {
              style: {
                padding: '12px 14px',
                background: c.card,
                border: `1px dashed ${c.border}`,
                borderRadius: 4,
                marginBottom: 16,
              }
            },
              React.createElement('div', { style: { fontSize: 12, color: c.textMuted, fontStyle: 'italic' } }, 'Post-flow reflection'),
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: c.text, marginTop: 3 } }, 'The Dawn Writers · Apr 4, 6:32 AM'),
            ),

            // Mood selector
            React.createElement('div', { style: { marginBottom: 16 } },
              React.createElement('label', { style: { fontSize: 11, color: c.gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 8 } }, 'How was the flow?'),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                ['🌅', '🌿', '⚡', '🌊', '🔥', '✨'].map(emoji =>
                  React.createElement('button', {
                    key: emoji,
                    style: {
                      fontSize: 22,
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: 4,
                      background: c.card,
                      border: `1px solid ${c.border}`,
                      lineHeight: 1,
                    }
                  }, emoji)
                ),
              ),
            ),

            // Reflection textarea
            React.createElement('div', { style: { marginBottom: 14 } },
              React.createElement('label', { style: { fontSize: 11, color: c.gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 8 } }, 'Your Reflection'),
              React.createElement('textarea', {
                value: journalText,
                onChange: (e) => setJournalText(e.target.value),
                placeholder: 'What arose during your practice today? What did you notice? What do you carry forward into the rest of your day?',
                style: {
                  width: '100%',
                  height: 110,
                  background: c.card,
                  border: `2px solid ${c.border}`,
                  borderRadius: 4,
                  padding: '10px 12px',
                  fontSize: 13,
                  color: c.text,
                  fontFamily: "'Bitter', Georgia, serif",
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.7,
                  boxSizing: 'border-box',
                }
              }),
            ),

            // Intention
            React.createElement('div', { style: { marginBottom: 20 } },
              React.createElement('label', { style: { fontSize: 11, color: c.gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 8 } }, 'Intention for Tomorrow'),
              React.createElement('input', {
                placeholder: 'I intend to...',
                style: {
                  width: '100%',
                  background: c.card,
                  border: `2px solid ${c.border}`,
                  borderRadius: 4,
                  padding: '10px 12px',
                  fontSize: 13,
                  color: c.text,
                  fontFamily: "'Bitter', Georgia, serif",
                  outline: 'none',
                  boxSizing: 'border-box',
                }
              }),
            ),

            // Actions
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                style: {
                  flex: 1,
                  background: c.primary,
                  border: 'none',
                  borderRadius: 3,
                  padding: '12px',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Bitter', serif",
                }
              }, '✓ Save Entry'),
              React.createElement('button', {
                style: {
                  flex: 1,
                  background: c.secondary,
                  border: 'none',
                  borderRadius: 3,
                  padding: '12px',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Bitter', serif",
                }
              }, '⟡ Share with Guild'),
            ),
          )
        : // ── Entries list
          React.createElement('div', null,
            // Stats strip
            React.createElement('div', {
              style: {
                margin: '14px 20px 4px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                background: c.card,
                border: `2px solid ${c.border}`,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: `3px 3px 0 ${c.divider}`,
              }
            },
              [['19', 'Sessions'], ['12', 'Day Streak'], ['47m', 'Avg Time']].map(([val, label], i) =>
                React.createElement('div', {
                  key: label,
                  style: {
                    padding: '13px 8px',
                    textAlign: 'center',
                    borderRight: i < 2 ? `1px solid ${c.divider}` : 'none',
                  }
                },
                  React.createElement('div', { style: { fontSize: 19, fontWeight: 700, color: c.primary } }, val),
                  React.createElement('div', { style: { fontSize: 9, color: c.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 } }, label),
                )
              ),
            ),

            // Guild filter — horizontal scroll
            React.createElement('div', { style: { padding: '12px 20px 4px' } },
              React.createElement('div', { style: { fontSize: 11, color: c.gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 } }, 'Filter by Guild'),
              React.createElement('div', {
                style: { display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }
              },
                ['All', 'Dawn Writers', 'Mindful Mavericks'].map(f =>
                  React.createElement('button', {
                    key: f,
                    onClick: () => setFilterGuild(f),
                    style: {
                      whiteSpace: 'nowrap',
                      padding: '5px 13px',
                      background: filterGuild === f ? c.primary : c.card,
                      border: `1px solid ${filterGuild === f ? c.primary : c.border}`,
                      borderRadius: 2,
                      fontSize: 12,
                      color: filterGuild === f ? '#fff' : c.text,
                      cursor: 'pointer',
                      fontFamily: "'Bitter', serif",
                      fontWeight: filterGuild === f ? 700 : 400,
                    }
                  }, f)
                ),
              ),
            ),

            // Entries
            React.createElement('div', { style: { padding: '8px 20px 24px' } },
              React.createElement('div', { style: { fontSize: 11, color: c.gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 } }, `${filtered.length} Reflections`),
              ...filtered.map((entry, i) =>
                React.createElement('div', {
                  key: i,
                  style: {
                    marginBottom: 10,
                    padding: '14px',
                    background: c.card,
                    border: `1px solid ${c.border}`,
                    borderLeft: `4px solid ${c.gold}`,
                    borderRadius: 3,
                    boxShadow: `2px 2px 0 ${c.divider}`,
                  }
                },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'flex-start' } },
                    React.createElement('div', null,
                      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: c.secondary } }, entry.guild),
                      React.createElement('div', { style: { fontSize: 10, color: c.textMuted, marginTop: 2 } }, `${entry.date} · ${entry.duration}`),
                    ),
                    React.createElement('span', { style: { fontSize: 20 } }, entry.mood),
                  ),
                  React.createElement('p', {
                    style: { fontSize: 13, color: c.text, margin: 0, lineHeight: 1.6, fontStyle: 'italic' }
                  }, `"${entry.excerpt}"`),
                )
              ),
            ),
          ),
    );
  };

  const screens = { home: HomeScreen, guilds: GuildsScreen, flow: FlowScreen, journal: JournalScreen };
  const ActiveScreen = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Bitter', Georgia, serif",
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      textarea { font-family: 'Bitter', Georgia, serif; }
      input { font-family: 'Bitter', Georgia, serif; }
      textarea:focus { border-color: #C9A44A !important; box-shadow: 0 0 0 2px rgba(201,164,74,0.15) !important; }
      input:focus { border-color: #C9A44A !important; box-shadow: 0 0 0 2px rgba(201,164,74,0.15) !important; }
      button { transition: transform 0.08s, opacity 0.08s; }
      button:active { transform: scale(0.96) !important; opacity: 0.85; }
    `),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 42,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.38), 0 0 0 1px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.15)',
        position: 'relative',
        background: isDark ? '#1A1812' : '#F5EFE0',
      }
    },
      React.createElement(ActiveScreen),
    ),
  );
}
