const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F0E8',
    surface: '#EDE8DC',
    surfaceAlt: '#E8E2D4',
    card: '#FDFAF4',
    cardAlt: '#F0EBE0',
    border: '#D4C9B0',
    borderLight: '#E8E0CC',
    text: '#2C2826',
    textSec: '#5C5248',
    textMuted: '#8C8278',
    teal: '#1B5C6B',
    tealLight: '#2A7A8C',
    tealPale: '#C8DFE4',
    gold: '#B8962E',
    goldLight: '#D4AA44',
    goldPale: '#F0E4BC',
    accent: '#8B3A2A',
    navBg: '#1B5C6B',
    navText: '#F5F0E8',
    pill: '#2C2826',
    pillText: '#F5F0E8',
    shadow: 'rgba(44,40,38,0.12)',
    shadowMd: 'rgba(44,40,38,0.18)',
  },
  dark: {
    bg: '#1A1F22',
    surface: '#242B2F',
    surfaceAlt: '#2C3438',
    card: '#2E3740',
    cardAlt: '#263038',
    border: '#3A464E',
    borderLight: '#344048',
    text: '#EDE8DC',
    textSec: '#B8B0A4',
    textMuted: '#7A7570',
    teal: '#4AABB8',
    tealLight: '#5EC4D2',
    tealPale: '#1A3A42',
    gold: '#D4AA44',
    goldLight: '#E8C060',
    goldPale: '#2E2614',
    accent: '#D4786A',
    navBg: '#0E1618',
    navText: '#EDE8DC',
    pill: '#4AABB8',
    pillText: '#0E1618',
    shadow: 'rgba(0,0,0,0.35)',
    shadowMd: 'rgba(0,0,0,0.5)',
  }
};

const clubs = [
  { id: 'debt', name: 'Debt Demolishers', emoji: '⚡', members: 2847, quests: 12, tag: 'Elimination', color: '#8B3A2A', desc: 'Strategic debt payoff methods and victories.' },
  { id: 'home', name: 'First-Time Homebuyers', emoji: '🏡', members: 5120, quests: 8, tag: 'Real Estate', color: '#1B5C6B', desc: 'Navigating the path to your first home together.' },
  { id: 'retire', name: 'Early Retirement Planners', emoji: '🌿', members: 3690, quests: 15, tag: 'FIRE', color: '#4A7A3A', desc: 'Building freedom decades ahead of schedule.' },
  { id: 'crypto', name: 'Crypto Curious', emoji: '₿', members: 4280, quests: 10, tag: 'Digital Assets', color: '#7A4AB0', desc: 'Sober exploration of digital asset fundamentals.' },
  { id: 'hustle', name: 'Side Hustle Strategists', emoji: '🚀', members: 6100, quests: 18, tag: 'Income', color: '#B8962E', desc: 'Building multiple income streams methodically.' },
  { id: 'invest', name: 'Index Investors', emoji: '📈', members: 7830, quests: 9, tag: 'Passive', color: '#1B5C6B', desc: 'The quiet power of consistent, boring investing.' },
];

const scrolls = [
  { id: 1, club: 'Debt Demolishers', author: 'Mariela V.', avatar: 'MV', title: 'How I paid off $34k in 18 months on a teacher\'s salary', tag: 'Strategy', reads: 1284, kudos: 342, time: '2d ago', color: '#8B3A2A' },
  { id: 2, club: 'First-Time Homebuyers', author: 'James T.', avatar: 'JT', title: 'Comparing 3 mortgage brokers: what the fine print actually said', tag: 'Research', reads: 876, kudos: 218, time: '4d ago', color: '#1B5C6B' },
  { id: 3, club: 'Side Hustle Strategists', author: 'Priya N.', avatar: 'PN', title: 'My Etsy shop generated $8,400 last quarter — here\'s the breakdown', tag: 'Progress', reads: 2130, kudos: 490, time: '1d ago', color: '#B8962E' },
  { id: 4, club: 'Early Retirement Planners', author: 'Kwame A.', avatar: 'KA', title: 'The 4% rule stress-tested against 2008, 2020, and inflation', tag: 'Analysis', reads: 3420, kudos: 780, time: '6d ago', color: '#4A7A3A' },
];

const quests = [
  { id: 1, title: 'Analyze three mortgage options', status: 'active', contributors: 34, deadline: 'Dec 20', tag: 'Research' },
  { id: 2, title: 'Build a 6-month emergency fund plan', status: 'completed', contributors: 67, deadline: 'Nov 30', tag: 'Planning' },
  { id: 3, title: 'Compare PMI vs 20% down scenarios', status: 'active', contributors: 22, deadline: 'Jan 5', tag: 'Analysis' },
];

const milestones = [
  { title: 'First Scroll Published', icon: '📜', earned: true, date: 'Oct 12' },
  { title: 'Quest Contributor', icon: '🎯', earned: true, date: 'Oct 28' },
  { title: 'Wisdom Weaver', icon: '✨', earned: true, date: 'Nov 3' },
  { title: 'Club Sage', icon: '🏛️', earned: false, date: null },
  { title: 'Collective 100', icon: '💫', earned: false, date: null },
  { title: 'Folio Master', icon: '👑', earned: false, date: null },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [joinedClubs, setJoinedClubs] = useState(['debt', 'home']);
  const [activeClub, setActiveClub] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('scrolls');

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(100,100,100,0.3); border-radius: 2px; }
  `;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    vault: VaultScreen,
    profile: ProfileScreen,
    clubDetail: ClubDetailScreen,
  };

  const nav = [
    { id: 'home', label: 'Home', icon: 'BookOpen' },
    { id: 'explore', label: 'Clubs', icon: 'Compass' },
    { id: 'vault', label: 'Vault', icon: 'Archive' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  function HomeScreen() {
    const [pressed, setPressed] = useState(null);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '24px 20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontFamily: 'Fraunces, serif', fontSize: 11, letterSpacing: 3, color: t.textMuted, textTransform: 'uppercase', margin: 0 }
          }, 'Good Morning'),
          React.createElement('h1', {
            style: { fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: t.text, margin: '2px 0 0', lineHeight: 1.1 }
          }, 'Your Folio')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: t.pill, color: t.pillText, border: 'none',
            borderRadius: 20, padding: '6px 14px', fontFamily: 'Fraunces, serif',
            fontSize: 11, cursor: 'pointer', letterSpacing: 1
          }
        }, isDark ? '☀ Light' : '◑ Dark')
      ),

      // Featured Scroll — asymmetric hero card
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('p', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 10, letterSpacing: 3, color: t.gold, textTransform: 'uppercase', margin: '0 0 10px' }
        }, '★ Featured Scroll'),
        React.createElement('div', {
          onClick: () => setActiveScreen('vault'),
          style: {
            background: t.teal, borderRadius: '24px 24px 24px 4px',
            padding: '24px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
            boxShadow: `0 8px 32px ${t.shadowMd}`
          }
        },
          // Decorative element
          React.createElement('div', {
            style: {
              position: 'absolute', top: -20, right: -20,
              width: 120, height: 120, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)'
            }
          }),
          React.createElement('div', {
            style: {
              display: 'inline-block', background: t.goldLight,
              color: '#1A1400', borderRadius: 4, padding: '3px 10px',
              fontFamily: 'Fraunces, serif', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', marginBottom: 12, fontWeight: 700
            }
          }, 'Strategy'),
          React.createElement('h2', {
            style: {
              fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700,
              color: '#F5F0E8', margin: '0 0 12px', lineHeight: 1.3,
              fontStyle: 'italic'
            }
          }, 'How I paid off $34k in 18 months on a teacher\'s salary'),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 12 }
          },
            React.createElement('div', {
              style: {
                width: 30, height: 30, borderRadius: '50%',
                background: t.goldPale, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: 'Fraunces, serif',
                fontSize: 11, fontWeight: 700, color: t.teal
              }
            }, 'MV'),
            React.createElement('div', null,
              React.createElement('p', { style: { margin: 0, color: 'rgba(245,240,232,0.9)', fontSize: 12, fontFamily: 'Fraunces, serif' } }, 'Mariela V.'),
              React.createElement('p', { style: { margin: 0, color: 'rgba(245,240,232,0.55)', fontSize: 11, fontFamily: 'Fraunces, serif' } }, 'Debt Demolishers · 2d ago')
            ),
            React.createElement('div', { style: { marginLeft: 'auto', textAlign: 'right' } },
              React.createElement('p', { style: { margin: 0, color: 'rgba(245,240,232,0.9)', fontSize: 14, fontFamily: 'Fraunces, serif', fontWeight: 700 } }, '342'),
              React.createElement('p', { style: { margin: 0, color: 'rgba(245,240,232,0.55)', fontSize: 10, letterSpacing: 1 } }, 'KUDOS')
            )
          )
        )
      ),

      // My Clubs section
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }
        },
          React.createElement('p', {
            style: { fontFamily: 'Fraunces, serif', fontSize: 13, letterSpacing: 2, color: t.textMuted, textTransform: 'uppercase', margin: 0 }
          }, 'My Clubs'),
          React.createElement('span', {
            onClick: () => setActiveScreen('explore'),
            style: { fontFamily: 'Fraunces, serif', fontSize: 12, color: t.tealLight, cursor: 'pointer', textDecoration: 'underline' }
          }, 'Explore all')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          clubs.filter(c => joinedClubs.includes(c.id)).map(club =>
            React.createElement('div', {
              key: club.id,
              onClick: () => { setActiveClub(club.id); setActiveScreen('clubDetail'); },
              style: {
                minWidth: 140, background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 16, padding: '14px', cursor: 'pointer',
                borderLeft: `4px solid ${club.color}`,
                boxShadow: `0 2px 12px ${t.shadow}`
              }
            },
              React.createElement('div', { style: { fontSize: 22, marginBottom: 6 } }, club.emoji),
              React.createElement('p', {
                style: { fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 4px', lineHeight: 1.2 }
              }, club.name),
              React.createElement('p', {
                style: { fontFamily: 'Fraunces, serif', fontSize: 10, color: t.textMuted, margin: 0 }
              }, `${club.quests} quests active`)
            )
          )
        )
      ),

      // Recent Scrolls
      React.createElement('div', { style: { padding: '24px 20px 16px' } },
        React.createElement('p', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 13, letterSpacing: 2, color: t.textMuted, textTransform: 'uppercase', margin: '0 0 14px' }
        }, 'Recent Scrolls'),
        scrolls.slice(0, 3).map((scroll, i) =>
          React.createElement('div', {
            key: scroll.id,
            onClick: () => setActiveScreen('vault'),
            style: {
              background: t.card,
              border: `1px solid ${t.border}`,
              borderRadius: i % 2 === 0 ? '16px 16px 16px 4px' : '4px 16px 16px 16px',
              padding: '16px', marginBottom: 10, cursor: 'pointer',
              boxShadow: `0 2px 8px ${t.shadow}`
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: scroll.color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#F5F0E8', fontSize: 12, fontWeight: 700,
                  fontFamily: 'Fraunces, serif'
                }
              }, scroll.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' } },
                  React.createElement('span', {
                    style: {
                      background: t.goldPale, color: t.gold, borderRadius: 4,
                      padding: '2px 8px', fontFamily: 'Fraunces, serif', fontSize: 9,
                      letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700
                    }
                  }, scroll.tag),
                  React.createElement('span', {
                    style: { fontFamily: 'Fraunces, serif', fontSize: 10, color: t.textMuted, padding: '2px 0' }
                  }, scroll.club)
                ),
                React.createElement('p', {
                  style: {
                    fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 600,
                    color: t.text, margin: '0 0 8px', lineHeight: 1.35
                  }
                }, scroll.title),
                React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } }, `${scroll.kudos} kudos`),
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } }, scroll.time)
                )
              )
            )
          )
        )
      )
    );
  }

  function ExploreScreen() {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'FIRE', 'Real Estate', 'Income', 'Digital Assets', 'Elimination', 'Passive'];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg }
    },
      // Header
      React.createElement('div', {
        style: { padding: '24px 20px 20px', background: t.teal }
      },
        React.createElement('p', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 10, letterSpacing: 3, color: 'rgba(245,240,232,0.6)', textTransform: 'uppercase', margin: '0 0 4px' }
        }, 'Discovery'),
        React.createElement('h1', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, color: '#F5F0E8', margin: '0 0 16px', fontStyle: 'italic' }
        }, 'Financial Clubs'),
        React.createElement('div', {
          style: {
            display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4
          }
        },
          filters.map(f =>
            React.createElement('button', {
              key: f,
              onClick: () => setFilter(f),
              style: {
                background: filter === f ? t.goldLight : 'rgba(255,255,255,0.12)',
                color: filter === f ? '#1A1400' : 'rgba(245,240,232,0.8)',
                border: 'none', borderRadius: 20, padding: '6px 14px',
                fontFamily: 'Fraunces, serif', fontSize: 11, cursor: 'pointer',
                whiteSpace: 'nowrap', letterSpacing: 0.5
              }
            }, f)
          )
        )
      ),

      // Club Grid — alternating asymmetric layout
      React.createElement('div', { style: { padding: '20px' } },
        clubs.filter(c => filter === 'All' || c.tag === filter).map((club, i) => {
          const joined = joinedClubs.includes(club.id);
          return React.createElement('div', {
            key: club.id,
            style: {
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: i % 3 === 0 ? '24px 24px 24px 4px' : i % 3 === 1 ? '4px 24px 24px 24px' : '24px 4px 24px 24px',
              padding: '20px', marginBottom: 12, cursor: 'pointer',
              boxShadow: `0 2px 12px ${t.shadow}`
            },
            onClick: () => { setActiveClub(club.id); setActiveScreen('clubDetail'); }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
              React.createElement('div', {
                style: {
                  width: 52, height: 52, borderRadius: 14, background: club.color + '20',
                  border: `2px solid ${club.color}40`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 24, flexShrink: 0
                }
              }, club.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 } },
                  React.createElement('span', {
                    style: {
                      background: t.goldPale, color: t.gold, borderRadius: 4,
                      padding: '2px 8px', fontFamily: 'Fraunces, serif', fontSize: 9,
                      letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700
                    }
                  }, club.tag),
                  React.createElement('button', {
                    onClick: (e) => {
                      e.stopPropagation();
                      setJoinedClubs(prev =>
                        joined ? prev.filter(id => id !== club.id) : [...prev, club.id]
                      );
                    },
                    style: {
                      background: joined ? t.tealPale : t.teal,
                      color: joined ? t.tealLight : '#F5F0E8',
                      border: `1px solid ${joined ? t.tealLight : t.teal}`,
                      borderRadius: 20, padding: '4px 12px',
                      fontFamily: 'Fraunces, serif', fontSize: 11, cursor: 'pointer'
                    }
                  }, joined ? '✓ Joined' : '+ Join')
                ),
                React.createElement('h3', {
                  style: { fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: t.text, margin: '4px 0 4px', lineHeight: 1.2 }
                }, club.name),
                React.createElement('p', {
                  style: { fontFamily: 'Fraunces, serif', fontSize: 12, color: t.textSec, margin: '0 0 10px', lineHeight: 1.4 }
                }, club.desc),
                React.createElement('div', { style: { display: 'flex', gap: 16 } },
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } },
                    `${(club.members / 1000).toFixed(1)}k members`),
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } },
                    `${club.quests} active quests`)
                )
              )
            )
          );
        })
      )
    );
  }

  function ClubDetailScreen() {
    const club = clubs.find(c => c.id === activeClub) || clubs[1];
    const [tab, setTab] = useState('scrolls');

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg }
    },
      // Back + Hero
      React.createElement('div', {
        style: { background: club.color, padding: '16px 20px 24px', position: 'relative', overflow: 'hidden' }
      },
        React.createElement('div', {
          style: { position: 'absolute', bottom: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }
        }),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: {
            background: 'rgba(255,255,255,0.15)', border: 'none', color: '#F5F0E8',
            borderRadius: 20, padding: '6px 14px', fontFamily: 'Fraunces, serif',
            fontSize: 12, cursor: 'pointer', marginBottom: 16
          }
        }, '← Back'),
        React.createElement('div', { style: { fontSize: 36, marginBottom: 8 } }, club.emoji),
        React.createElement('h1', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#F5F0E8', margin: '0 0 6px', lineHeight: 1.2 }
        }, club.name),
        React.createElement('p', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 13, color: 'rgba(245,240,232,0.75)', margin: '0 0 14px' }
        }, club.desc),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700, color: '#F5F0E8', margin: 0 } }, club.members.toLocaleString()),
            React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 10, color: 'rgba(245,240,232,0.6)', margin: 0, letterSpacing: 1 } }, 'MEMBERS')
          ),
          React.createElement('div', { style: { width: 1, background: 'rgba(255,255,255,0.2)' } }),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700, color: '#F5F0E8', margin: 0 } }, club.quests),
            React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 10, color: 'rgba(245,240,232,0.6)', margin: 0, letterSpacing: 1 } }, 'QUESTS')
          )
        )
      ),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        ['scrolls', 'quests'].map(tabId =>
          React.createElement('button', {
            key: tabId,
            onClick: () => setTab(tabId),
            style: {
              flex: 1, padding: '14px', background: 'none',
              border: 'none', borderBottom: tab === tabId ? `2px solid ${club.color}` : '2px solid transparent',
              fontFamily: 'Fraunces, serif', fontSize: 13, letterSpacing: 1,
              color: tab === tabId ? t.text : t.textMuted, cursor: 'pointer',
              textTransform: 'uppercase'
            }
          }, tabId)
        )
      ),

      // Content
      React.createElement('div', { style: { padding: '16px 20px' } },
        tab === 'scrolls' ? (
          scrolls.filter(s => s.club === club.name).length > 0
            ? scrolls.filter(s => s.club === club.name).map((scroll, i) =>
              React.createElement('div', {
                key: scroll.id,
                style: {
                  background: t.card, border: `1px solid ${t.border}`,
                  borderRadius: i % 2 === 0 ? '20px 20px 20px 4px' : '4px 20px 20px 20px',
                  padding: '18px', marginBottom: 12,
                  boxShadow: `0 2px 8px ${t.shadow}`
                }
              },
                React.createElement('div', {
                  style: {
                    display: 'inline-block', background: t.goldPale, color: t.gold,
                    borderRadius: 4, padding: '2px 8px', fontFamily: 'Fraunces, serif',
                    fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 10
                  }
                }, scroll.tag),
                React.createElement('h3', {
                  style: { fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 12px', lineHeight: 1.3 }
                }, scroll.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                  React.createElement('div', {
                    style: {
                      width: 28, height: 28, borderRadius: '50%', background: scroll.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#F5F0E8', fontSize: 10, fontWeight: 700, fontFamily: 'Fraunces, serif'
                    }
                  }, scroll.avatar),
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 12, color: t.textSec } }, scroll.author),
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted, marginLeft: 'auto' } }, `${scroll.kudos} kudos`)
                )
              )
            )
            : React.createElement('div', {
              style: { textAlign: 'center', padding: '40px 20px' }
            },
              React.createElement('div', { style: { fontSize: 36, marginBottom: 12 } }, '📜'),
              React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 15, color: t.textMuted, fontStyle: 'italic' } }, 'No scrolls yet. Be the first to share your insights.')
            )
        ) : (
          quests.map((quest, i) =>
            React.createElement('div', {
              key: quest.id,
              style: {
                background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 16, padding: '16px', marginBottom: 10,
                borderLeft: quest.status === 'completed' ? `4px solid #4A7A3A` : `4px solid ${t.gold}`,
                boxShadow: `0 2px 8px ${t.shadow}`
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('h3', {
                  style: { fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 600, color: t.text, margin: 0, flex: 1, lineHeight: 1.3 }
                }, quest.title),
                React.createElement('span', {
                  style: {
                    background: quest.status === 'completed' ? '#4A7A3A20' : t.goldPale,
                    color: quest.status === 'completed' ? '#4A7A3A' : t.gold,
                    borderRadius: 20, padding: '3px 10px', fontFamily: 'Fraunces, serif',
                    fontSize: 10, letterSpacing: 1, marginLeft: 8, flexShrink: 0
                  }
                }, quest.status === 'completed' ? '✓ Done' : 'Active')
              ),
              React.createElement('div', { style: { display: 'flex', gap: 14 } },
                React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } }, `${quest.contributors} contributors`),
                React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } }, quest.status !== 'completed' ? `Due ${quest.deadline}` : 'Completed')
              )
            )
          )
        )
      )
    );
  }

  function VaultScreen() {
    const [query, setQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');
    const tags = ['All', 'Strategy', 'Research', 'Progress', 'Analysis'];

    const filtered = scrolls.filter(s => {
      const matchTag = selectedTag === 'All' || s.tag === selectedTag;
      const matchQ = query === '' || s.title.toLowerCase().includes(query.toLowerCase()) || s.club.toLowerCase().includes(query.toLowerCase());
      return matchTag && matchQ;
    });

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg }
    },
      // Header
      React.createElement('div', {
        style: { padding: '24px 20px 20px', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('p', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 10, letterSpacing: 3, color: t.gold, textTransform: 'uppercase', margin: '0 0 4px' }
        }, '◈ Wisdom Vault'),
        React.createElement('h1', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 700, color: t.text, margin: '0 0 16px', fontStyle: 'italic' }
        }, 'Curated Knowledge'),
        // Search
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 12, padding: '10px 14px'
          }
        },
          React.createElement('span', { style: { fontSize: 14, color: t.textMuted } }, '🔍'),
          React.createElement('input', {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: 'Search scrolls, clubs, strategies...',
            style: {
              flex: 1, border: 'none', background: 'transparent',
              fontFamily: 'Fraunces, serif', fontSize: 13, color: t.text,
              outline: 'none'
            }
          })
        )
      ),

      // Tag filters
      React.createElement('div', {
        style: { display: 'flex', gap: 8, padding: '14px 20px', overflowX: 'auto' }
      },
        tags.map(tag =>
          React.createElement('button', {
            key: tag,
            onClick: () => setSelectedTag(tag),
            style: {
              background: selectedTag === tag ? t.teal : t.card,
              color: selectedTag === tag ? '#F5F0E8' : t.textSec,
              border: `1px solid ${selectedTag === tag ? t.teal : t.border}`,
              borderRadius: 20, padding: '6px 16px', fontFamily: 'Fraunces, serif',
              fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap'
            }
          }, tag)
        )
      ),

      // Top scrolls — asymmetric editorial layout
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        // Big feature card for first result
        filtered.length > 0 && React.createElement('div', {
          style: {
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: '24px 24px 4px 24px', padding: '22px',
            marginBottom: 12, boxShadow: `0 4px 20px ${t.shadow}`
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('div', {
              style: {
                background: t.goldPale, color: t.gold, borderRadius: 4,
                padding: '2px 10px', fontFamily: 'Fraunces, serif', fontSize: 9,
                letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700
              }
            }, filtered[0].tag),
            React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } }, '#1 this week')
          ),
          React.createElement('h2', {
            style: { fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700, color: t.text, margin: '0 0 10px', lineHeight: 1.3, fontStyle: 'italic' }
          }, filtered[0].title),
          React.createElement('p', {
            style: { fontFamily: 'Fraunces, serif', fontSize: 12, color: t.textSec, margin: '0 0 14px' }
          }, filtered[0].club),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: '50%', background: filtered[0].color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F5F0E8', fontSize: 10, fontWeight: 700, fontFamily: 'Fraunces, serif'
                }
              }, filtered[0].avatar),
              React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 12, color: t.textSec } }, filtered[0].author)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 12, color: t.gold, fontWeight: 600 } }, `★ ${filtered[0].kudos}`),
              React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } }, `${filtered[0].reads} reads`)
            )
          )
        ),

        // Remaining cards
        filtered.slice(1).map((scroll, i) =>
          React.createElement('div', {
            key: scroll.id,
            style: {
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: i % 2 === 0 ? '4px 20px 20px 20px' : '20px 4px 20px 20px',
              padding: '16px', marginBottom: 10, boxShadow: `0 2px 8px ${t.shadow}`
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 12, background: scroll.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F5F0E8', fontSize: 12, fontWeight: 700, fontFamily: 'Fraunces, serif',
                  flexShrink: 0
                }
              }, scroll.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 4 } },
                  React.createElement('span', {
                    style: {
                      background: t.goldPale, color: t.gold, borderRadius: 4,
                      padding: '1px 6px', fontFamily: 'Fraunces, serif', fontSize: 9,
                      letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700
                    }
                  }, scroll.tag)
                ),
                React.createElement('p', {
                  style: { fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 600, color: t.text, margin: '0 0 6px', lineHeight: 1.3 }
                }, scroll.title),
                React.createElement('div', { style: { display: 'flex', gap: 12 } },
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.gold } }, `★ ${scroll.kudos}`),
                  React.createElement('span', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted } }, scroll.club)
                )
              )
            )
          )
        ),

        filtered.length === 0 && React.createElement('div', {
          style: { textAlign: 'center', padding: '40px 20px' }
        },
          React.createElement('p', { style: { fontSize: 32, marginBottom: 10 } }, '🔍'),
          React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 15, color: t.textMuted, fontStyle: 'italic' } }, 'No scrolls found. Try a different search.')
        )
      )
    );
  }

  function ProfileScreen() {
    const earned = milestones.filter(m => m.earned).length;

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg }
    },
      // Profile Hero
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, ${t.teal} 0%, ${isDark ? '#0E2830' : '#0F3A48'} 100%)`,
          padding: '28px 20px 24px', position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }
        }),
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: '50%',
            background: t.goldLight, border: '3px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, color: '#1A1400',
            marginBottom: 14
          }
        }, 'AK'),
        React.createElement('h1', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#F5F0E8', margin: '0 0 4px' }
        }, 'Alex Kim'),
        React.createElement('p', {
          style: { fontFamily: 'Fraunces, serif', fontSize: 13, color: 'rgba(245,240,232,0.65)', margin: '0 0 20px' }
        }, 'Joined October 2024 · 2 clubs'),
        React.createElement('div', { style: { display: 'flex', gap: 20 } },
          [['12', 'Scrolls'], ['340', 'Kudos Given'], ['5', 'Quests']].map(([val, label]) =>
            React.createElement('div', { key: label },
              React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700, color: '#F5F0E8', margin: 0 } }, val),
              React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 9, color: 'rgba(245,240,232,0.6)', margin: 0, letterSpacing: 1.5, textTransform: 'uppercase' } }, label)
            )
          )
        )
      ),

      React.createElement('div', { style: { padding: '20px' } },
        // Milestone Markers
        React.createElement('div', {
          style: {
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: '24px 4px 24px 24px', padding: '20px', marginBottom: 16,
            boxShadow: `0 4px 16px ${t.shadow}`
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 } },
            React.createElement('p', {
              style: { fontFamily: 'Fraunces, serif', fontSize: 13, letterSpacing: 2, color: t.textMuted, textTransform: 'uppercase', margin: 0 }
            }, 'Milestone Markers'),
            React.createElement('span', {
              style: { fontFamily: 'Fraunces, serif', fontSize: 13, color: t.gold, fontWeight: 700 }
            }, `${earned} / ${milestones.length}`)
          ),
          // Progress bar
          React.createElement('div', {
            style: { background: t.border, borderRadius: 4, height: 6, marginBottom: 16, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                width: `${(earned / milestones.length) * 100}%`, height: '100%',
                background: `linear-gradient(90deg, ${t.teal}, ${t.goldLight})`,
                borderRadius: 4, transition: 'width 0.6s ease'
              }
            })
          ),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
            milestones.map((m, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: '1 1 calc(50% - 5px)',
                  background: m.earned ? t.goldPale : t.surface,
                  border: `1px solid ${m.earned ? t.gold + '60' : t.border}`,
                  borderRadius: 12, padding: '12px',
                  opacity: m.earned ? 1 : 0.5
                }
              },
                React.createElement('div', { style: { fontSize: 20, marginBottom: 4 } }, m.icon),
                React.createElement('p', {
                  style: { fontFamily: 'Fraunces, serif', fontSize: 11, fontWeight: 700, color: t.text, margin: '0 0 2px', lineHeight: 1.2 }
                }, m.title),
                React.createElement('p', {
                  style: { fontFamily: 'Fraunces, serif', fontSize: 10, color: t.textMuted, margin: 0 }
                }, m.earned ? m.date : 'Locked')
              )
            )
          )
        ),

        // My Clubs
        React.createElement('div', {
          style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: '4px 24px 24px 24px', padding: '20px', boxShadow: `0 2px 12px ${t.shadow}` }
        },
          React.createElement('p', {
            style: { fontFamily: 'Fraunces, serif', fontSize: 13, letterSpacing: 2, color: t.textMuted, textTransform: 'uppercase', margin: '0 0 14px' }
          }, 'My Clubs'),
          clubs.filter(c => joinedClubs.includes(c.id)).map(club =>
            React.createElement('div', {
              key: club.id,
              onClick: () => { setActiveClub(club.id); setActiveScreen('clubDetail'); },
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
                borderBottom: `1px solid ${t.borderLight}`, cursor: 'pointer'
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10, background: club.color + '20',
                  border: `2px solid ${club.color}40`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18
                }
              }, club.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 1px' } }, club.name),
                React.createElement('p', { style: { fontFamily: 'Fraunces, serif', fontSize: 11, color: t.textMuted, margin: 0 } }, `${club.quests} active quests`)
              ),
              React.createElement('span', { style: { color: t.textMuted, fontSize: 16 } }, '›')
            )
          )
        )
      )
    );
  }

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Fraunces, serif', padding: '20px'
    }
  },
    React.createElement('style', null, fontStyle),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg,
        borderRadius: 44, overflow: 'hidden', position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        border: `2px solid ${isDark ? '#333' : '#D0C8BC'}`
      }
    },
      // App content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column' }
      },
        React.createElement(ScreenComponent)
      ),

      // Hub-and-spoke Navigation
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${isDark ? '#2A3438' : '#0F3A48'}`,
          padding: '10px 8px 20px', display: 'flex', justifyContent: 'space-around'
        }
      },
        nav.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', padding: '6px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer', opacity: activeScreen === item.id ? 1 : 0.45,
              transition: 'opacity 0.2s'
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 10, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: activeScreen === item.id ? t.goldLight + '25' : 'transparent',
                transition: 'background 0.2s'
              }
            },
              (() => {
                const iconEl = window.lucide && window.lucide[item.icon];
                if (iconEl) return React.createElement(iconEl, { size: 16, color: activeScreen === item.id ? t.goldLight : t.navText });
                return React.createElement('span', { style: { fontSize: 14, color: t.navText } }, '•');
              })()
            ),
            React.createElement('span', {
              style: {
                fontFamily: 'Fraunces, serif', fontSize: 9, letterSpacing: 0.5,
                color: activeScreen === item.id ? t.goldLight : t.navText,
                textTransform: 'uppercase'
              }
            }, item.label)
          )
        )
      )
    )
  );
}
