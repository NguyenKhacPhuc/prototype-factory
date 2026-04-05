
const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F9FF',
    surface: '#FFFFFF',
    surfaceAlt: '#E0F2FE',
    primary: '#0EA5E9',
    secondary: '#38BDF8',
    cta: '#F97316',
    text: '#0C4A6E',
    textSub: '#0369A1',
    textMuted: '#7CB9E8',
    border: '#BAE6FD',
    card: '#FFFFFF',
    navBg: '#FFFFFF',
    navBorder: '#E0F2FE',
    tapestryBg: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 50%, #7DD3FC 100%)',
  },
  dark: {
    bg: '#0C1A2E',
    surface: '#112240',
    surfaceAlt: '#1A3050',
    primary: '#38BDF8',
    secondary: '#0EA5E9',
    cta: '#F97316',
    text: '#E0F2FE',
    textSub: '#BAE6FD',
    textMuted: '#5B8DB8',
    border: '#1A3050',
    card: '#112240',
    navBg: '#0C1A2E',
    navBorder: '#1A3050',
    tapestryBg: 'linear-gradient(135deg, #0C1A2E 0%, #112240 50%, #1A3050 100%)',
  }
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.06); opacity: 0.85; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes ripple { 0% { transform: scale(0); opacity: 0.6; } 100% { transform: scale(4); opacity: 0; } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    @keyframes weave { 0% { opacity: 0.3; transform: scale(0.95) rotate(-2deg); } 50% { opacity: 0.7; transform: scale(1.02) rotate(1deg); } 100% { opacity: 0.3; transform: scale(0.95) rotate(-2deg); } }
    @keyframes glow { 0%, 100% { box-shadow: 0 0 8px rgba(14,165,233,0.4); } 50% { box-shadow: 0 0 24px rgba(14,165,233,0.8), 0 0 48px rgba(56,189,248,0.3); } }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 0; }
  `;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    contribute: ContributeScreen,
    almanac: AlmanacScreen,
  };

  const ScreenComponent = screens[activeScreen];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '24px 0' }
  },
    React.createElement('style', null, styleTag),
    React.createElement('div', {
      style: {
        width: 375, minHeight: 812, background: theme.bg, borderRadius: 40,
        boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)',
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease',
      }
    },
      React.createElement(ScreenComponent, { theme, isDark, setIsDark, setActiveScreen }),
      React.createElement(BottomNav, { activeScreen, setActiveScreen, theme })
    )
  );
}

// ─── Bottom Navigation ───────────────────────────────────────────────────────
function BottomNav({ activeScreen, setActiveScreen, theme }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Tapestry', icon: 'Globe' },
    { id: 'contribute', label: 'Contribute', icon: 'Sparkles' },
    { id: 'almanac', label: 'Almanac', icon: 'BookOpen' },
  ];

  return React.createElement('div', {
    style: {
      position: 'sticky', bottom: 0, background: theme.navBg, borderTop: `1px solid ${theme.navBorder}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 20px', zIndex: 100, transition: 'background 0.3s, border-color 0.3s'
    }
  },
    tabs.map(tab => {
      const active = activeScreen === tab.id;
      const Icon = window.lucide[tab.icon];
      return React.createElement('button', {
        key: tab.id,
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer', padding: '6px 16px',
          minWidth: 44, minHeight: 44, borderRadius: 16,
          color: active ? theme.primary : theme.textMuted,
          transition: 'color 0.2s, transform 0.15s',
          transform: active ? 'scale(1.08)' : 'scale(1)',
        }
      },
        Icon ? React.createElement(Icon, { size: 20, strokeWidth: active ? 2.5 : 1.8 }) : null,
        React.createElement('span', {
          style: { fontSize: 10, fontWeight: active ? 700 : 400, letterSpacing: 0.3 }
        }, tab.label)
      );
    })
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────
function HomeScreen({ theme, isDark, setIsDark, setActiveScreen }) {
  const [pressed, setPressed] = useState(null);

  const recentLumens = [
    { id: 1, text: 'The whisper of ancient stones beneath my feet', location: 'Kyoto, Japan', time: '2h ago', color: '#0EA5E9' },
    { id: 2, text: 'Scent of rain on cobblestones near the old cathedral', location: 'Prague, Czech Republic', time: '4h ago', color: '#38BDF8' },
    { id: 3, text: 'A moment of silence overlooking the terracotta rooftops', location: 'Florence, Italy', time: '6h ago', color: '#7DD3FC' },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', animation: 'fadeIn 0.4s ease' }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '52px 24px 24px',
        background: `linear-gradient(180deg, ${isDark ? '#0C1A2E' : '#E0F2FE'} 0%, ${theme.bg} 100%)`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: theme.primary, textTransform: 'uppercase', marginBottom: 4 }
          }, 'Lumen Loci'),
          React.createElement('h1', {
            style: { fontSize: 26, fontWeight: 800, color: theme.text, margin: 0, lineHeight: 1.2 }
          }, 'Welcome back,', React.createElement('br'), React.createElement('span', { style: { color: theme.primary } }, 'Mindful Explorer')),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 22, background: theme.surface, border: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(14,165,233,0.15)', transition: 'all 0.2s',
          }
        },
          (() => {
            const Icon = isDark ? window.lucide.Sun : window.lucide.Moon;
            return Icon ? React.createElement(Icon, { size: 18, color: theme.primary }) : null;
          })()
        )
      ),
      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 24 } },
        [
          { label: 'Lumens', value: '142', icon: 'Sparkles' },
          { label: 'Locations', value: '23', icon: 'MapPin' },
          { label: 'Global Weavers', value: '8.4k', icon: 'Users' },
        ].map(stat => {
          const Icon = window.lucide[stat.icon];
          return React.createElement('div', {
            key: stat.label,
            style: {
              flex: 1, background: theme.surface, borderRadius: 16, padding: '12px 10px',
              textAlign: 'center', boxShadow: `0 2px 12px rgba(14,165,233,0.1)`,
              border: `1px solid ${theme.border}`, transition: 'transform 0.2s',
            }
          },
            Icon ? React.createElement(Icon, { size: 16, color: theme.primary, style: { margin: '0 auto 4px', display: 'block' } }) : null,
            React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: theme.text } }, stat.value),
            React.createElement('div', { style: { fontSize: 10, color: theme.textMuted, fontWeight: 500 } }, stat.label)
          );
        })
      )
    ),

    // Daily Prompt Card
    React.createElement('div', { style: { padding: '0 24px 20px' } },
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)`,
          borderRadius: 24, padding: '20px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(14,165,233,0.35)', animation: 'glow 3s ease-in-out infinite',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: '50%', background: 'rgba(255,255,255,0.12)', animation: 'float 4s ease-in-out infinite'
          }
        }),
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 } }, "Today's Lumen Prompt"),
        React.createElement('p', { style: { fontSize: 15, color: '#fff', fontWeight: 500, margin: '0 0 16px', lineHeight: 1.5 } },
          '"Listen for a sound that makes you feel at peace. Describe its texture and rhythm."'
        ),
        React.createElement('button', {
          onClick: () => setActiveScreen('contribute'),
          style: {
            background: '#fff', color: '#0EA5E9', border: 'none', borderRadius: 12, padding: '10px 20px',
            fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'transform 0.15s',
          }
        },
          (() => { const I = window.lucide.Plus; return I ? React.createElement(I, { size: 14 }) : null; })(),
          React.createElement('span', null, 'Add Your Lumen')
        )
      )
    ),

    // Recent Lumens
    React.createElement('div', { style: { padding: '0 24px 24px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
        React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, color: theme.text, margin: 0 } }, 'Recent Lumens'),
        React.createElement('button', {
          onClick: () => setActiveScreen('almanac'),
          style: { background: 'none', border: 'none', color: theme.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }
        }, 'See all')
      ),
      recentLumens.map((lumen, i) => React.createElement('div', {
        key: lumen.id,
        style: {
          background: theme.card, borderRadius: 16, padding: '16px', marginBottom: 10,
          border: `1px solid ${theme.border}`, boxShadow: '0 2px 8px rgba(14,165,233,0.08)',
          animation: `slideUp ${0.3 + i * 0.1}s ease both`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }
      },
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
          React.createElement('div', {
            style: { width: 36, height: 36, borderRadius: 18, background: lumen.color, flexShrink: 0, animation: 'pulse 3s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            (() => { const I = window.lucide.Feather; return I ? React.createElement(I, { size: 16, color: '#fff' }) : null; })()
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 13, color: theme.text, margin: '0 0 6px', lineHeight: 1.4, fontStyle: 'italic' } }, `"${lumen.text}"`),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                (() => { const I = window.lucide.MapPin; return I ? React.createElement(I, { size: 10, color: theme.textMuted }) : null; })(),
                React.createElement('span', { style: { fontSize: 10, color: theme.textMuted, fontWeight: 500 } }, lumen.location)
              ),
              React.createElement('span', { style: { fontSize: 10, color: theme.textMuted } }, lumen.time)
            )
          )
        )
      ))
    )
  );
}

// ─── Explore Screen (Tapestry) ────────────────────────────────────────────────
function ExploreScreen({ theme, setActiveScreen }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [tapestryProgress] = useState(73);

  const locations = [
    { id: 1, name: 'Kyoto', country: 'Japan', lumens: 1842, progress: 87, unlocked: 5, color: '#0EA5E9', echoes: ['Ancient cedar breathes patience', 'Stone lanterns whisper of centuries'] },
    { id: 2, name: 'Prague', country: 'Czech Republic', lumens: 1203, progress: 62, unlocked: 3, color: '#38BDF8', echoes: ['River fog carries forgotten songs'] },
    { id: 3, name: 'Florence', country: 'Italy', lumens: 2341, progress: 94, unlocked: 7, color: '#7DD3FC', echoes: ['Marble holds the warmth of a thousand suns', 'Art breathes when no one watches'] },
    { id: 4, name: 'Reykjavik', country: 'Iceland', lumens: 891, progress: 45, unlocked: 2, color: '#0EA5E9', echoes: ['Silence here is a living thing'] },
  ];

  if (selectedLocation) {
    const loc = locations.find(l => l.id === selectedLocation);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', animation: 'fadeIn 0.3s ease' } },
      // Tapestry visual
      React.createElement('div', {
        style: {
          height: 260, background: `linear-gradient(135deg, #0C1A2E 0%, #0EA5E9 40%, #38BDF8 70%, #7DD3FC 100%)`,
          position: 'relative', overflow: 'hidden',
        }
      },
        // Animated weave elements
        ...Array.from({ length: 8 }, (_, i) => React.createElement('div', {
          key: i,
          style: {
            position: 'absolute', borderRadius: '50%',
            width: 40 + i * 20, height: 40 + i * 20,
            border: `2px solid rgba(255,255,255,${0.1 + i * 0.04})`,
            top: `${10 + (i * 11) % 60}%`, left: `${5 + (i * 17) % 70}%`,
            animation: `weave ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }
        })),
        React.createElement('button', {
          onClick: () => setSelectedLocation(null),
          style: {
            position: 'absolute', top: 52, left: 20, width: 40, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        }, (() => { const I = window.lucide.ArrowLeft; return I ? React.createElement(I, { size: 18, color: '#fff' }) : null; })()),
        React.createElement('div', { style: { position: 'absolute', bottom: 24, left: 24 } },
          React.createElement('h2', { style: { color: '#fff', fontSize: 28, fontWeight: 800, margin: 0 } }, loc.name),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '4px 0 0' } }, loc.country)
        )
      ),

      React.createElement('div', { style: { padding: '20px 24px 100px' } },
        // Progress
        React.createElement('div', { style: { background: theme.card, borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid ${theme.border}` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: theme.text } }, 'Tapestry Completion'),
            React.createElement('span', { style: { fontSize: 20, fontWeight: 800, color: theme.primary } }, `${loc.progress}%`)
          ),
          React.createElement('div', { style: { height: 8, background: theme.surfaceAlt, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%', width: `${loc.progress}%`,
                background: `linear-gradient(90deg, #0EA5E9, #38BDF8)`,
                borderRadius: 4, transition: 'width 1s ease',
                backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite',
              }
            })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 10 } },
            React.createElement('span', { style: { fontSize: 12, color: theme.textMuted } }, `${loc.lumens.toLocaleString()} Lumens contributed`),
            React.createElement('span', { style: { fontSize: 12, color: theme.primary, fontWeight: 600 } }, `${loc.unlocked} Echoes unlocked`)
          )
        ),

        // Echoes
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 12 } }, 'Revealed Echoes'),
        loc.echoes.map((echo, i) => React.createElement('div', {
          key: i,
          style: {
            background: `linear-gradient(135deg, ${theme.surface}, ${theme.surfaceAlt})`,
            borderRadius: 16, padding: '16px', marginBottom: 10,
            border: `1px solid ${theme.border}`, animation: `slideUp ${0.2 + i * 0.1}s ease both`,
          }
        },
          (() => { const I = window.lucide.Feather; return I ? React.createElement(I, { size: 14, color: theme.primary, style: { marginBottom: 8 } }) : null; })(),
          React.createElement('p', { style: { fontSize: 14, color: theme.text, fontStyle: 'italic', margin: 0, lineHeight: 1.5 } }, `"${echo}"`)
        )),

        React.createElement('button', {
          onClick: () => setActiveScreen('contribute'),
          style: {
            width: '100%', background: `linear-gradient(135deg, #0EA5E9, #38BDF8)`, color: '#fff',
            border: 'none', borderRadius: 16, padding: '16px', fontWeight: 700, fontSize: 15,
            cursor: 'pointer', marginTop: 8, boxShadow: '0 4px 20px rgba(14,165,233,0.4)',
          }
        }, 'Contribute a Lumen Here')
      )
    );
  }

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { padding: '52px 24px 20px' } },
      React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: theme.text, margin: '0 0 4px' } }, 'Serenity Tapestry'),
      React.createElement('p', { style: { fontSize: 13, color: theme.textMuted, margin: 0 } }, 'Explore collective mindful artwork')
    ),

    // Global tapestry preview
    React.createElement('div', {
      style: {
        margin: '0 24px 24px', borderRadius: 24, height: 160, overflow: 'hidden',
        background: 'linear-gradient(135deg, #0C1A2E 0%, #0EA5E9 35%, #38BDF8 65%, #7DD3FC 100%)',
        position: 'relative', boxShadow: '0 8px 32px rgba(14,165,233,0.3)',
      }
    },
      ...Array.from({ length: 12 }, (_, i) => React.createElement('div', {
        key: i,
        style: {
          position: 'absolute', borderRadius: '50%',
          width: 20 + i * 12, height: 20 + i * 12,
          background: `rgba(255,255,255,${0.03 + i * 0.02})`,
          top: `${(i * 23) % 70}%`, left: `${(i * 19) % 80}%`,
          animation: `weave ${2 + i * 0.4}s ease-in-out infinite`,
          animationDelay: `${i * 0.25}s`,
        }
      })),
      React.createElement('div', { style: { position: 'absolute', bottom: 16, left: 20, right: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
          React.createElement('span', { style: { color: '#fff', fontSize: 13, fontWeight: 600 } }, 'Global Tapestry'),
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 700 } }, '73%')
        ),
        React.createElement('div', { style: { height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '73%', background: '#fff', borderRadius: 3, animation: 'shimmer 2s linear infinite' } })
        )
      )
    ),

    // Locations
    React.createElement('div', { style: { padding: '0 24px 100px' } },
      React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 16 } }, 'Active Locations'),
      locations.map((loc, i) => React.createElement('div', {
        key: loc.id,
        onClick: () => setSelectedLocation(loc.id),
        style: {
          background: theme.card, borderRadius: 20, padding: '16px 20px', marginBottom: 12,
          border: `1px solid ${theme.border}`, cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(14,165,233,0.08)',
          animation: `slideUp ${0.2 + i * 0.08}s ease both`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: theme.text } }, loc.name),
            React.createElement('div', { style: { fontSize: 11, color: theme.textMuted, marginTop: 2 } }, loc.country)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: theme.primary } }, `${loc.progress}%`),
            React.createElement('div', { style: { fontSize: 10, color: theme.textMuted } }, `${loc.lumens.toLocaleString()} lumens`)
          )
        ),
        React.createElement('div', { style: { height: 6, background: theme.surfaceAlt, borderRadius: 3, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', width: `${loc.progress}%`,
              background: `linear-gradient(90deg, #0EA5E9, #38BDF8)`,
              borderRadius: 3,
            }
          })
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 } },
          (() => { const I = window.lucide.Unlock; return I ? React.createElement(I, { size: 12, color: theme.primary }) : null; })(),
          React.createElement('span', { style: { fontSize: 11, color: theme.primary, fontWeight: 600 } }, `${loc.unlocked} Echoes revealed`)
        )
      ))
    )
  );
}

// ─── Contribute Screen ────────────────────────────────────────────────────────
function ContributeScreen({ theme }) {
  const [step, setStep] = useState(0);
  const [selectedSense, setSelectedSense] = useState(null);
  const [luemenText, setLumenText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const prompts = [
    { sense: 'Sound', icon: 'Volume2', color: '#0EA5E9', prompt: 'Listen carefully. What calming sound surrounds you? Describe its rhythm and texture.' },
    { sense: 'Scent', icon: 'Wind', color: '#38BDF8', prompt: 'Close your eyes and breathe deeply. What fragrance anchors you to this moment?' },
    { sense: 'Touch', icon: 'Hand', color: '#7DD3FC', prompt: 'Feel your surroundings. Describe a texture that brings you stillness or wonder.' },
    { sense: 'Sight', icon: 'Eye', color: '#0EA5E9', prompt: 'Look slowly around you. What visual detail makes this place uniquely peaceful?' },
    { sense: 'Space', icon: 'Compass', color: '#38BDF8', prompt: 'Feel the energy of this place. What makes this space feel sacred or significant?' },
  ];

  if (submitted) {
    return React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: {
          width: 100, height: 100, borderRadius: 50, background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
          animation: 'glow 2s ease-in-out infinite', boxShadow: '0 0 40px rgba(14,165,233,0.5)'
        }
      },
        (() => { const I = window.lucide.Sparkles; return I ? React.createElement(I, { size: 40, color: '#fff' }) : null; })()
      ),
      React.createElement('h2', { style: { fontSize: 24, fontWeight: 800, color: theme.text, textAlign: 'center', marginBottom: 12 } }, 'Lumen Woven!'),
      React.createElement('p', { style: { fontSize: 14, color: theme.textMuted, textAlign: 'center', lineHeight: 1.6, marginBottom: 32, maxWidth: 280 } },
        'Your mindful observation has been woven into the Serenity Tapestry. Thank you for contributing to our collective calm.'
      ),
      React.createElement('div', {
        style: {
          background: theme.surface, borderRadius: 20, padding: '20px', width: '100%',
          border: `1px solid ${theme.border}`, marginBottom: 24,
        }
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: theme.primary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 } }, 'Your Lumen'),
        React.createElement('p', { style: { fontSize: 14, color: theme.text, fontStyle: 'italic', margin: 0, lineHeight: 1.5 } }, `"${luemenText}"`)
      ),
      React.createElement('button', {
        onClick: () => { setSubmitted(false); setStep(0); setSelectedSense(null); setLumenText(''); },
        style: {
          background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)', color: '#fff', border: 'none',
          borderRadius: 16, padding: '16px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(14,165,233,0.4)',
        }
      }, 'Contribute Another Lumen')
    );
  }

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { padding: '52px 24px 20px' } },
      React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: theme.text, margin: '0 0 4px' } }, 'Add a Lumen'),
      React.createElement('p', { style: { fontSize: 13, color: theme.textMuted, margin: 0 } }, 'Record a mindful moment to weave into the tapestry')
    ),

    React.createElement('div', { style: { padding: '0 24px 100px' } },
      // Location card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #0EA5E9, #38BDF8)`, borderRadius: 20, padding: '16px 20px',
          marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        (() => { const I = window.lucide.MapPin; return I ? React.createElement(I, { size: 20, color: '#fff' }) : null; })(),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Current Location'),
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)' } }, 'Kyoto, Japan · Fushimi Inari')
        )
      ),

      // Sense selector
      React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 12 } }, 'Choose your sense'),
      React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 } },
        prompts.map(p => {
          const Icon = window.lucide[p.icon];
          const active = selectedSense === p.sense;
          return React.createElement('button', {
            key: p.sense,
            onClick: () => setSelectedSense(p.sense),
            style: {
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
              borderRadius: 20, border: `2px solid ${active ? p.color : theme.border}`,
              background: active ? `${p.color}22` : theme.surface,
              color: active ? p.color : theme.textSub, fontWeight: 600, fontSize: 12,
              cursor: 'pointer', transition: 'all 0.2s', minHeight: 44,
            }
          },
            Icon ? React.createElement(Icon, { size: 14 }) : null,
            React.createElement('span', null, p.sense)
          );
        })
      ),

      // Prompt display
      selectedSense && React.createElement('div', {
        style: {
          background: theme.surface, borderRadius: 20, padding: '20px', marginBottom: 20,
          border: `1px solid ${theme.border}`, animation: 'slideUp 0.25s ease',
        }
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: theme.primary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 } }, 'Your Prompt'),
        React.createElement('p', { style: { fontSize: 14, color: theme.text, lineHeight: 1.6, margin: '0 0 16px', fontStyle: 'italic' } },
          prompts.find(p => p.sense === selectedSense)?.prompt
        ),
        React.createElement('textarea', {
          value: luemenText,
          onChange: e => setLumenText(e.target.value),
          placeholder: 'Describe your mindful observation...',
          style: {
            width: '100%', minHeight: 120, background: theme.surfaceAlt, border: `1px solid ${theme.border}`,
            borderRadius: 12, padding: '12px 14px', fontSize: 14, color: theme.text,
            fontFamily: 'Inter, sans-serif', resize: 'none', outline: 'none', lineHeight: 1.5,
          }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 } },
          React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, `${luemenText.length} / 200 characters`),
          React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, 'Heartfelt observations only')
        )
      ),

      // Submit
      React.createElement('button', {
        onClick: () => luemenText.length > 10 && setSubmitted(true),
        style: {
          width: '100%', padding: '16px', borderRadius: 16, border: 'none',
          background: luemenText.length > 10 ? 'linear-gradient(135deg, #0EA5E9, #38BDF8)' : theme.surfaceAlt,
          color: luemenText.length > 10 ? '#fff' : theme.textMuted,
          fontWeight: 700, fontSize: 15, cursor: luemenText.length > 10 ? 'pointer' : 'default',
          transition: 'all 0.3s', boxShadow: luemenText.length > 10 ? '0 4px 20px rgba(14,165,233,0.4)' : 'none',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 } },
          (() => { const I = window.lucide.Sparkles; return I ? React.createElement(I, { size: 16 }) : null; })(),
          React.createElement('span', null, 'Weave into Tapestry')
        )
      )
    )
  );
}

// ─── Almanac Screen ───────────────────────────────────────────────────────────
function AlmanacScreen({ theme }) {
  const [activeTab, setActiveTab] = useState('mine');

  const myEntries = [
    { id: 1, sense: 'Sound', text: 'The distant toll of temple bells fading into mountain mist', location: 'Kyoto, Japan', date: 'Apr 3, 2026', mood: 'Serene' },
    { id: 2, sense: 'Scent', text: 'Pine resin warming in afternoon sun, carrying centuries of quiet devotion', location: 'Nikko, Japan', date: 'Mar 28, 2026', mood: 'Reverent' },
    { id: 3, sense: 'Sight', text: 'Cherry blossom petals drifting upward in a momentary gust, pausing time', location: 'Tokyo, Japan', date: 'Mar 15, 2026', mood: 'Wonder' },
    { id: 4, sense: 'Space', text: 'The peculiar stillness that exists inside ancient stone walls during rainfall', location: 'Kyoto, Japan', date: 'Feb 20, 2026', mood: 'Peace' },
  ];

  const locationAlmanacs = [
    { location: 'Kyoto', country: 'Japan', echoes: 5, lumens: 1842, thumbnail: '#0EA5E9' },
    { location: 'Prague', country: 'Czech Republic', echoes: 3, lumens: 1203, thumbnail: '#38BDF8' },
    { location: 'Santorini', country: 'Greece', echoes: 6, lumens: 2105, thumbnail: '#7DD3FC' },
  ];

  const senseColors = { Sound: '#0EA5E9', Scent: '#38BDF8', Sight: '#7DD3FC', Touch: '#0EA5E9', Space: '#38BDF8' };

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { padding: '52px 24px 20px' } },
      React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: theme.text, margin: '0 0 4px' } }, 'Journey Almanac'),
      React.createElement('p', { style: { fontSize: 13, color: theme.textMuted, margin: 0 } }, 'Your mindful travel journal')
    ),

    // Tabs
    React.createElement('div', { style: { display: 'flex', margin: '0 24px 20px', background: theme.surface, borderRadius: 12, padding: 4, border: `1px solid ${theme.border}` } },
      ['mine', 'locations'].map(tab => React.createElement('button', {
        key: tab,
        onClick: () => setActiveTab(tab),
        style: {
          flex: 1, padding: '10px', borderRadius: 10, border: 'none',
          background: activeTab === tab ? `linear-gradient(135deg, #0EA5E9, #38BDF8)` : 'transparent',
          color: activeTab === tab ? '#fff' : theme.textMuted,
          fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.25s',
        }
      }, tab === 'mine' ? 'My Lumens' : 'Locations'))
    ),

    React.createElement('div', { style: { padding: '0 24px 100px' } },
      activeTab === 'mine'
        ? React.createElement('div', null,
            // Summary card
            React.createElement('div', {
              style: {
                background: `linear-gradient(135deg, #0EA5E9, #38BDF8)`, borderRadius: 20, padding: '20px',
                marginBottom: 20, boxShadow: '0 8px 32px rgba(14,165,233,0.3)',
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 } }, 'Your Journey'),
                  React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: '#fff', marginTop: 4 } }, '142'),
                  React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)' } }, 'Lumens contributed')
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 } }, 'Streak'),
                  React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: '#fff', marginTop: 4 } }, '12'),
                  React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)' } }, 'Days active')
                )
              )
            ),

            myEntries.map((entry, i) => React.createElement('div', {
              key: entry.id,
              style: {
                background: theme.card, borderRadius: 20, padding: '18px', marginBottom: 12,
                border: `1px solid ${theme.border}`, boxShadow: '0 2px 12px rgba(14,165,233,0.07)',
                animation: `slideUp ${0.2 + i * 0.08}s ease both`,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
                React.createElement('div', {
                  style: {
                    padding: '3px 10px', borderRadius: 20,
                    background: `${senseColors[entry.sense]}22`,
                    color: senseColors[entry.sense], fontSize: 11, fontWeight: 700,
                  }
                }, entry.sense),
                React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, entry.date)
              ),
              React.createElement('p', { style: { fontSize: 14, color: theme.text, fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.5 } },
                `"${entry.text}"`
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  (() => { const I = window.lucide.MapPin; return I ? React.createElement(I, { size: 11, color: theme.textMuted }) : null; })(),
                  React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, entry.location)
                ),
                React.createElement('div', {
                  style: {
                    padding: '2px 8px', borderRadius: 10,
                    background: theme.surfaceAlt, color: theme.textSub, fontSize: 10, fontWeight: 600,
                  }
                }, entry.mood)
              )
            ))
          )
        : React.createElement('div', null,
            locationAlmanacs.map((loc, i) => React.createElement('div', {
              key: loc.location,
              style: {
                background: theme.card, borderRadius: 20, overflow: 'hidden', marginBottom: 16,
                border: `1px solid ${theme.border}`, animation: `slideUp ${0.2 + i * 0.1}s ease both`,
              }
            },
              React.createElement('div', {
                style: {
                  height: 80, background: `linear-gradient(135deg, ${loc.thumbnail}, #38BDF8)`,
                  position: 'relative', overflow: 'hidden',
                }
              },
                ...Array.from({ length: 5 }, (_, j) => React.createElement('div', {
                  key: j,
                  style: {
                    position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                    width: 30 + j * 15, height: 30 + j * 15,
                    top: `${j * 20}%`, left: `${j * 25}%`,
                    animation: `weave ${2 + j * 0.4}s ease-in-out infinite`,
                  }
                })),
                React.createElement('div', { style: { position: 'absolute', bottom: 10, left: 16 } },
                  React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#fff' } }, loc.location),
                  React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.8)' } }, loc.country)
                )
              ),
              React.createElement('div', { style: { padding: '14px 16px' } },
                React.createElement('div', { style: { display: 'flex', gap: 16 } },
                  React.createElement('div', { style: { textAlign: 'center' } },
                    React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: theme.primary } }, loc.lumens.toLocaleString()),
                    React.createElement('div', { style: { fontSize: 10, color: theme.textMuted } }, 'Lumens')
                  ),
                  React.createElement('div', { style: { width: 1, background: theme.border } }),
                  React.createElement('div', { style: { textAlign: 'center' } },
                    React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: theme.primary } }, loc.echoes),
                    React.createElement('div', { style: { fontSize: 10, color: theme.textMuted } }, 'Echoes')
                  ),
                  React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', alignItems: 'center' } },
                    React.createElement('button', {
                      style: {
                        background: `linear-gradient(135deg, #0EA5E9, #38BDF8)`, color: '#fff',
                        border: 'none', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }
                    }, 'View Tapestry')
                  )
                )
              )
            ))
          )
    )
  );
}
