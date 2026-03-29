const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const themes = {
    light: {
      bg: '#F5EFE6',
      surface: '#FDF8F2',
      card: '#FFFFFF',
      primary: '#2A7B7B',
      secondary: '#E8A090',
      accent: '#C4856A',
      text: '#2C3E35',
      textSub: '#6B7C74',
      textMuted: '#A0B0A8',
      border: '#E2D8CC',
      navBg: '#FDF8F2',
      statusBg: 'transparent',
    },
    dark: {
      bg: '#1A2420',
      surface: '#222E2A',
      card: '#2A3830',
      primary: '#4AADAD',
      secondary: '#E8A090',
      accent: '#D4956A',
      text: '#EAE4DC',
      textSub: '#9DB0A8',
      textMuted: '#5A7068',
      border: '#3A4E48',
      navBg: '#1E2C28',
      statusBg: 'transparent',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
    .press-effect { transition: transform 0.12s ease, opacity 0.12s ease; }
    .press-effect:active { transform: scale(0.96); opacity: 0.85; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
    @keyframes ripple { from { transform: scale(0.8); opacity: 0.6; } to { transform: scale(2); opacity: 0; } }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'map', label: 'Explore', icon: window.lucide.Map },
    { id: 'journey', label: 'Journey', icon: window.lucide.Compass },
    { id: 'community', label: 'Circle', icon: window.lucide.Users },
    { id: 'journal', label: 'Journal', icon: window.lucide.BookOpen },
  ];

  const screens = {
    home: HomeScreen,
    map: MapScreen,
    journey: JourneyScreen,
    community: CommunityScreen,
    journal: JournalScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Lora', Georgia, serif", padding: '20px' }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)', position: 'relative' }
    },
      // Dynamic Island
      React.createElement('div', {
        style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#0a0a0a', borderRadius: 20, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
      },
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #2a2a2a' } }),
        React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: '#222' } })
      ),
      // Status bar
      React.createElement('div', {
        style: { height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingInline: 28, paddingBottom: 6, background: t.bg, flexShrink: 0 }
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Lora', serif" } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: t.text })
        )
      ),
      // Main content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }
      },
        React.createElement(ActiveScreen, { t, isDark, setIsDark })
      ),
      // Bottom navigation
      React.createElement('div', {
        style: { height: 76, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingInline: 8, paddingBottom: 12, flexShrink: 0 }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          className: 'press-effect',
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 12px', borderRadius: 16, background: activeTab === tab.id ? `${t.primary}18` : 'transparent', transition: 'background 0.2s ease' }
        },
          React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted, strokeWidth: activeTab === tab.id ? 2.2 : 1.8 }),
          React.createElement('span', { style: { fontSize: 10, color: activeTab === tab.id ? t.primary : t.textMuted, fontFamily: "'Lora', serif", fontWeight: activeTab === tab.id ? 600 : 400, letterSpacing: 0.2 } }, tab.label)
        ))
      )
    )
  );
}

function HomeScreen({ t, isDark, setIsDark }) {
  const [activeRitual, setActiveRitual] = useState(null);

  const rituals = [
    { id: 1, name: 'Morning Mist Walk', location: 'Kyoto, Japan', emoji: '🌿', duration: '15 min', mood: 'Calm', progress: 68, color: '#2A7B7B', desc: 'A mindful stroll through morning fog, focusing on the soft sounds of bamboo rustling.' },
    { id: 2, name: 'Alpine Tea Ceremony', location: 'Swiss Alps', emoji: '🍵', duration: '20 min', mood: 'Grounded', progress: 42, color: '#C4856A', desc: 'Brew mountain herbal tea with intentional breath, honoring the stillness of altitude.' },
    { id: 3, name: 'Seaside Breathing', location: 'Bali, Indonesia', emoji: '🌊', duration: '10 min', mood: 'Serene', progress: 85, color: '#E8A090', desc: 'Four-count breath cycles synced to the rhythm of waves, releasing tension.' },
  ];

  const groupMembers = [
    { name: 'Mia', color: '#2A7B7B', initial: 'M', status: 'active' },
    { name: 'Kai', color: '#C4856A', initial: 'K', status: 'active' },
    { name: 'Sara', color: '#E8A090', initial: 'S', status: 'away' },
    { name: 'Leo', color: '#7BA8A0', initial: 'L', status: 'active' },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.3s ease' }
  },
    // Header
    React.createElement('div', {
      style: { padding: '16px 24px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontStyle: 'italic', letterSpacing: 0.5 } }, 'Sunday, March 29'),
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.2 } }, 'Your Rituals')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          className: 'press-effect',
          style: { width: 36, height: 36, borderRadius: 12, background: t.surface, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        },
          React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 16, color: t.primary })
        ),
        React.createElement('div', {
          style: { width: 36, height: 36, borderRadius: 12, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement('span', { style: { color: '#fff', fontSize: 14, fontWeight: 700 } }, 'Y')
        )
      )
    ),

    // Group banner with organic shape
    React.createElement('div', {
      style: { margin: '0 20px 16px', background: `linear-gradient(135deg, ${t.primary}22, ${t.secondary}22)`, borderRadius: 20, padding: '16px 18px', border: `1.5px solid ${t.primary}30`, position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', {
        style: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${t.primary}15` }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 } }, 'Your Circle'),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text } }, 'Wanderers of Calm')
        ),
        React.createElement('div', { style: { background: `${t.primary}20`, borderRadius: 10, padding: '4px 10px', fontSize: 11, color: t.primary, fontWeight: 600 } }, '14 day streak 🔥')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 12 } },
        groupMembers.map((m, i) => React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${m.status === 'active' ? '#4CAF50' : t.border}` } },
            React.createElement('span', { style: { color: '#fff', fontSize: 13, fontWeight: 700 } }, m.initial)
          ),
          React.createElement('span', { style: { fontSize: 9, color: t.textSub } }, m.name)
        ))
      )
    ),

    // Horizontal scroll — Active Rituals
    React.createElement('div', { style: { marginBottom: 16 } },
      React.createElement('div', { style: { paddingInline: 24, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text, margin: 0 } }, 'Active Rituals'),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontStyle: 'italic', cursor: 'pointer' } }, 'see all')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 14, paddingInline: 24, overflowX: 'auto', paddingBottom: 4 }
      },
        rituals.map(r => React.createElement('div', {
          key: r.id,
          className: 'press-effect',
          onClick: () => setActiveRitual(activeRitual === r.id ? null : r.id),
          style: { minWidth: 180, background: t.surface, borderRadius: 20, padding: '16px 14px', border: `1.5px solid ${activeRitual === r.id ? r.color : t.border}`, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: activeRitual === r.id ? `0 4px 20px ${r.color}30` : 'none' }
        },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 8 } }, r.emoji),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3, lineHeight: 1.3 } }, r.name),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginBottom: 10, fontStyle: 'italic' } }, r.location),
          activeRitual === r.id && React.createElement('div', { style: { fontSize: 11, color: t.textSub, marginBottom: 10, lineHeight: 1.5, borderTop: `1px solid ${t.border}`, paddingTop: 8 } }, r.desc),
          React.createElement('div', { style: { height: 5, background: t.border, borderRadius: 10, marginBottom: 6 } },
            React.createElement('div', { style: { height: '100%', width: `${r.progress}%`, background: r.color, borderRadius: 10, transition: 'width 0.6s ease' } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, r.duration),
            React.createElement('span', { style: { fontSize: 10, color: r.color, fontWeight: 600 } }, `${r.progress}%`)
          )
        ))
      )
    ),

    // Today's Quest Section
    React.createElement('div', {
      style: { margin: '0 20px 16px', background: t.surface, borderRadius: 20, overflow: 'hidden', border: `1.5px solid ${t.border}` }
    },
      // Curved top section
      React.createElement('div', {
        style: { background: `linear-gradient(135deg, ${t.primary}, #1A5C5C)`, padding: '18px 18px 28px', position: 'relative' }
      },
        React.createElement('div', {
          style: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 20, background: t.surface, borderRadius: '50% 50% 0 0 / 20px 20px 0 0' }
        }),
        React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 } }, "Today's Quest"),
        React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 } }, 'Complete 2 rituals with your circle'),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('div', { style: { flex: 1, height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 10 } },
            React.createElement('div', { style: { height: '100%', width: '50%', background: '#fff', borderRadius: 10 } })
          ),
          React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 600 } }, '1 / 2')
        )
      ),
      React.createElement('div', { style: { padding: '14px 18px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('div', { style: { background: `${t.primary}18`, borderRadius: 10, padding: '5px 10px', fontSize: 11, color: t.primary, fontWeight: 600 } }, '+120 XP'),
          React.createElement('div', { style: { background: `${t.secondary}28`, borderRadius: 10, padding: '5px 10px', fontSize: 11, color: t.accent, fontWeight: 600 } }, 'Badge unlock')
        ),
        React.createElement('div', {
          className: 'press-effect',
          style: { background: t.primary, borderRadius: 12, padding: '8px 16px', fontSize: 12, color: '#fff', fontWeight: 600, cursor: 'pointer' }
        }, 'Start')
      )
    ),

    // Unlocked today
    React.createElement('div', { style: { paddingInline: 24, marginBottom: 20 } },
      React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 10, margin: '0 0 10px' } }, 'Newly Unlocked'),
      React.createElement('div', {
        style: { background: `linear-gradient(120deg, ${t.secondary}25, ${t.accent}15)`, borderRadius: 18, padding: '14px 16px', border: `1.5px solid ${t.secondary}40`, display: 'flex', gap: 14, alignItems: 'center' }
      },
        React.createElement('div', { style: { fontSize: 32 } }, '🏔️'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, 'Dolomite Dawn Stretch'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontStyle: 'italic', marginBottom: 8 } }, 'Dolomites, Italy • Unlocked by Leo'),
          React.createElement('div', {
            className: 'press-effect',
            style: { display: 'inline-block', background: t.accent, borderRadius: 10, padding: '5px 14px', fontSize: 11, color: '#fff', fontWeight: 600, cursor: 'pointer' }
          }, 'Preview Ritual')
        )
      )
    )
  );
}

function MapScreen({ t }) {
  const [selected, setSelected] = useState(null);

  const locations = [
    { id: 1, name: 'Kyoto', country: 'Japan', x: 78, y: 32, rituals: 8, unlocked: 5, emoji: '⛩️', color: '#2A7B7B' },
    { id: 2, name: 'Bali', country: 'Indonesia', x: 68, y: 52, rituals: 6, unlocked: 6, emoji: '🌊', color: '#E8A090' },
    { id: 3, name: 'Alps', country: 'Switzerland', x: 42, y: 22, rituals: 5, unlocked: 2, emoji: '🏔️', color: '#C4856A' },
    { id: 4, name: 'Marrakech', country: 'Morocco', x: 35, y: 36, rituals: 7, unlocked: 1, emoji: '🕌', color: '#A07B50' },
    { id: 5, name: 'Patagonia', country: 'Argentina', x: 22, y: 74, rituals: 4, unlocked: 0, emoji: '🌿', color: '#7BA8A0' },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.3s ease' }
  },
    React.createElement('div', { style: { padding: '16px 24px 12px' } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 3px' } }, 'Ritual Map'),
      React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontStyle: 'italic' } }, 'Discover wellness across the world')
    ),

    // Search bar
    React.createElement('div', {
      style: { margin: '0 20px 16px', background: t.surface, borderRadius: 16, padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'center', border: `1.5px solid ${t.border}` }
    },
      React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
      React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontStyle: 'italic' } }, 'Search destinations...')
    ),

    // Map visualization
    React.createElement('div', {
      style: { margin: '0 20px 16px', background: `linear-gradient(160deg, ${t.primary}18, ${t.secondary}12, ${t.primary}08)`, borderRadius: 24, height: 220, position: 'relative', overflow: 'hidden', border: `1.5px solid ${t.border}` }
    },
      // Decorative wave lines for organic feel
      React.createElement('svg', { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }, viewBox: '0 0 335 220' },
        React.createElement('path', { d: 'M0 60 Q80 40 160 70 Q240 100 335 60', stroke: t.primary, strokeWidth: 1.5, fill: 'none' }),
        React.createElement('path', { d: 'M0 110 Q100 90 180 120 Q260 150 335 110', stroke: t.primary, strokeWidth: 1.5, fill: 'none' }),
        React.createElement('path', { d: 'M0 160 Q90 140 200 165 Q280 185 335 155', stroke: t.primary, strokeWidth: 1.5, fill: 'none' }),
        React.createElement('text', { x: 20, y: 100, fill: t.primary, fontSize: 9, fontFamily: 'serif', opacity: 0.5 }, 'Atlantic'),
        React.createElement('text', { x: 220, y: 80, fill: t.primary, fontSize: 9, fontFamily: 'serif', opacity: 0.5 }, 'Pacific'),
      ),
      locations.map(loc => React.createElement('div', {
        key: loc.id,
        onClick: () => setSelected(selected === loc.id ? null : loc.id),
        className: 'press-effect',
        style: { position: 'absolute', left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-50%)', cursor: 'pointer', zIndex: 10 }
      },
        React.createElement('div', {
          style: { width: selected === loc.id ? 42 : 34, height: selected === loc.id ? 42 : 34, borderRadius: '50%', background: loc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: selected === loc.id ? 18 : 14, transition: 'all 0.2s ease', boxShadow: `0 2px 12px ${loc.color}60`, border: `2px solid rgba(255,255,255,0.5)` }
        }, loc.emoji),
        selected === loc.id && React.createElement('div', {
          style: { position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)', background: t.card, borderRadius: 12, padding: '8px 12px', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: `1px solid ${t.border}`, zIndex: 20 }
        },
          React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, loc.name),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, `${loc.unlocked}/${loc.rituals} rituals`)
        )
      ))
    ),

    // Horizontal scroll — destination cards
    React.createElement('div', { style: { marginBottom: 8 } },
      React.createElement('div', { style: { paddingInline: 24, marginBottom: 10, display: 'flex', justifyContent: 'space-between' } },
        React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text, margin: 0 } }, 'Destinations'),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontStyle: 'italic' } }, 'filter')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 14, paddingInline: 24, overflowX: 'auto', paddingBottom: 4 }
      },
        locations.map(loc => React.createElement('div', {
          key: loc.id,
          className: 'press-effect',
          onClick: () => setSelected(loc.id),
          style: { minWidth: 150, background: t.surface, borderRadius: 18, overflow: 'hidden', border: `1.5px solid ${selected === loc.id ? loc.color : t.border}`, cursor: 'pointer', transition: 'all 0.2s ease' }
        },
          React.createElement('div', { style: { height: 70, background: `linear-gradient(135deg, ${loc.color}40, ${loc.color}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, position: 'relative' } },
            loc.emoji,
            loc.unlocked === loc.rituals && React.createElement('div', {
              style: { position: 'absolute', top: 8, right: 8, background: '#4CAF50', borderRadius: 8, padding: '2px 6px', fontSize: 9, color: '#fff', fontWeight: 700 }
            }, '✓ Complete')
          ),
          React.createElement('div', { style: { padding: '10px 12px' } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, loc.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginBottom: 8 } }, loc.country),
            React.createElement('div', { style: { height: 4, background: t.border, borderRadius: 10 } },
              React.createElement('div', { style: { height: '100%', width: `${(loc.unlocked / loc.rituals) * 100}%`, background: loc.color, borderRadius: 10 } })
            ),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 4 } }, `${loc.unlocked} of ${loc.rituals} unlocked`)
          )
        ))
      )
    ),

    // Nearby section
    React.createElement('div', { style: { margin: '12px 20px 20px' } },
      React.createElement('div', {
        style: { background: `${t.primary}15`, borderRadius: 18, padding: '14px 16px', border: `1.5px dashed ${t.primary}50`, display: 'flex', gap: 12, alignItems: 'center' }
      },
        React.createElement(window.lucide.MapPin, { size: 20, color: t.primary }),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, 'Enable location for nearby rituals'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontStyle: 'italic' } }, 'Discover geo-triggered wellness moments')
        ),
        React.createElement('div', {
          className: 'press-effect',
          style: { background: t.primary, borderRadius: 10, padding: '6px 12px', fontSize: 11, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }
        }, 'Enable')
      )
    )
  );
}

function JourneyScreen({ t }) {
  const [expandedPhase, setExpandedPhase] = useState(1);

  const journeys = [
    {
      id: 1, title: 'Path of the Morning Wanderer', destination: 'Kyoto', progress: 65,
      phases: [
        { id: 1, name: 'Arrival Grounding', status: 'done', rituals: ['Stone Garden Gaze', 'Temple Bell Breath'] },
        { id: 2, name: 'Forest Immersion', status: 'active', rituals: ['Bamboo Grove Walk', 'Moss Contemplation', 'Rain Sound Rest'] },
        { id: 3, name: 'Tea Mind', status: 'locked', rituals: ['Matcha Intention', 'Ceramic Warmth Hold'] },
      ]
    }
  ];

  const quests = [
    { id: 1, title: 'Weekend Water', desc: 'Find 3 water rituals before Sunday', due: 'Sun', xp: 200, icon: '💧', progress: 1, total: 3 },
    { id: 2, title: 'Circle Harmony', desc: 'Complete a ritual simultaneously with your group', due: 'Mon', xp: 350, icon: '🤝', progress: 0, total: 1 },
    { id: 3, title: 'Altitude Mind', desc: 'Unlock any mountain ritual', due: 'Open', xp: 150, icon: '⛰️', progress: 0, total: 1 },
  ];

  const journey = journeys[0];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.3s ease' }
  },
    React.createElement('div', { style: { padding: '16px 24px 12px' } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 3px' } }, 'Journeys'),
      React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontStyle: 'italic' } }, 'Progressive wellness quests')
    ),

    // Active journey card with curved section
    React.createElement('div', {
      style: { margin: '0 20px 20px', background: t.surface, borderRadius: 24, overflow: 'hidden', border: `1.5px solid ${t.border}` }
    },
      React.createElement('div', {
        style: { background: `linear-gradient(160deg, #1A5C5C, ${t.primary})`, padding: '20px 20px 34px', position: 'relative' }
      },
        React.createElement('div', {
          style: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 24, background: t.surface, borderRadius: '50% 50% 0 0 / 24px 24px 0 0' }
        }),
        React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 } }, 'Active Journey'),
        React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 } }, journey.title),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginBottom: 14 } }, `📍 ${journey.destination}, Japan`),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('div', { style: { flex: 1, height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 10 } },
            React.createElement('div', { style: { height: '100%', width: `${journey.progress}%`, background: '#fff', borderRadius: 10 } })
          ),
          React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 700 } }, `${journey.progress}%`)
        )
      ),
      React.createElement('div', { style: { padding: '14px 18px 16px' } },
        journey.phases.map((phase, i) => React.createElement('div', { key: phase.id, style: { marginBottom: i < journey.phases.length - 1 ? 10 : 0 } },
          React.createElement('div', {
            onClick: () => setExpandedPhase(expandedPhase === phase.id ? null : phase.id),
            className: 'press-effect',
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '10px 12px', borderRadius: 14, background: phase.status === 'active' ? `${t.primary}15` : t.bg, border: `1px solid ${phase.status === 'active' ? t.primary : t.border}30` }
          },
            React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
              React.createElement('div', { style: { width: 26, height: 26, borderRadius: '50%', background: phase.status === 'done' ? '#4CAF50' : phase.status === 'active' ? t.primary : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                phase.status === 'done' ? React.createElement(window.lucide.Check, { size: 12, color: '#fff' }) :
                phase.status === 'active' ? React.createElement(window.lucide.Play, { size: 10, color: '#fff' }) :
                React.createElement(window.lucide.Lock, { size: 11, color: t.textMuted })
              ),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: phase.status === 'locked' ? t.textMuted : t.text } }, phase.name)
            ),
            React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted, style: { transform: expandedPhase === phase.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' } })
          ),
          expandedPhase === phase.id && React.createElement('div', { style: { paddingLeft: 12, paddingTop: 6 } },
            phase.rituals.map((r, ri) => React.createElement('div', { key: ri, style: { display: 'flex', gap: 8, alignItems: 'center', paddingBlock: 5 } },
              React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: phase.status === 'locked' ? t.border : t.primary } }),
              React.createElement('span', { style: { fontSize: 12, color: phase.status === 'locked' ? t.textMuted : t.textSub, fontStyle: phase.status === 'locked' ? 'italic' : 'normal' } }, r)
            ))
          )
        ))
      )
    ),

    // Horizontal scroll — Active Quests
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('div', { style: { paddingInline: 24, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text, margin: 0 } }, 'Quests'),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontStyle: 'italic' } }, 'view all')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 14, paddingInline: 24, overflowX: 'auto', paddingBottom: 4 }
      },
        quests.map(q => React.createElement('div', {
          key: q.id,
          className: 'press-effect',
          style: { minWidth: 175, background: t.surface, borderRadius: 18, padding: '14px', border: `1.5px solid ${t.border}`, cursor: 'pointer' }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('span', { style: { fontSize: 24 } }, q.icon),
            React.createElement('div', { style: { background: `${t.primary}18`, borderRadius: 8, padding: '3px 8px', fontSize: 10, color: t.primary, fontWeight: 600 } }, `+${q.xp} XP`)
          ),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3 } }, q.title),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginBottom: 10, lineHeight: 1.4 } }, q.desc),
          React.createElement('div', { style: { height: 4, background: t.border, borderRadius: 10, marginBottom: 6 } },
            React.createElement('div', { style: { height: '100%', width: `${(q.progress / q.total) * 100}%`, background: t.primary, borderRadius: 10 } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, `${q.progress}/${q.total} done`),
            React.createElement('span', { style: { fontSize: 10, color: t.accent, fontWeight: 600 } }, `Due: ${q.due}`)
          )
        ))
      )
    )
  );
}

function CommunityScreen({ t }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const posts = [
    { id: 1, author: 'Mia', initial: 'M', color: '#2A7B7B', ritual: 'Morning Mist Walk', location: 'Kyoto', time: '2h ago', mood: '😌', likes: 12, comment: 'The fog this morning was absolutely still. I stood for 10 minutes just watching dew form on bamboo. Felt like the world paused.', tags: ['mindful', 'nature'] },
    { id: 2, author: 'Kai', initial: 'K', color: '#C4856A', ritual: 'Alpine Tea Ceremony', location: 'Zermatt', time: '5h ago', mood: '🍵', likes: 8, comment: 'Brewed rooibos at altitude. The slower boiling at 2000m becomes a ritual in itself. Kai\'s tip: let it steep longer.', tags: ['tea', 'altitude'] },
    { id: 3, author: 'Leo', initial: 'L', color: '#7BA8A0', ritual: 'Seaside Breathing', location: 'Seminyak', time: '1d ago', mood: '🌊', likes: 20, comment: 'Box breathing with waves as your timekeeper is something else. Found myself staying an extra hour.', tags: ['breathwork', 'ocean'] },
  ];

  const filters = ['all', 'circle', 'trending', 'nearby'];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.3s ease' }
  },
    React.createElement('div', { style: { padding: '16px 24px 12px' } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 3px' } }, 'The Circle'),
      React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontStyle: 'italic' } }, 'Shared ritual moments')
    ),

    // Filter tabs
    React.createElement('div', {
      style: { display: 'flex', gap: 8, paddingInline: 24, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }
    },
      filters.map(f => React.createElement('div', {
        key: f,
        onClick: () => setActiveFilter(f),
        className: 'press-effect',
        style: { padding: '6px 16px', borderRadius: 20, background: activeFilter === f ? t.primary : t.surface, color: activeFilter === f ? '#fff' : t.textSub, fontSize: 12, fontWeight: activeFilter === f ? 600 : 400, border: `1px solid ${activeFilter === f ? t.primary : t.border}`, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease', textTransform: 'capitalize' }
      }, f))
    ),

    // Community invite banner
    React.createElement('div', {
      style: { margin: '0 20px 16px', background: `linear-gradient(120deg, ${t.secondary}30, ${t.accent}20)`, borderRadius: 18, padding: '14px 16px', border: `1.5px solid ${t.secondary}40`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, 'Invite friends to your circle'),
        React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Up to 6 members per group')
      ),
      React.createElement('div', {
        className: 'press-effect',
        style: { background: t.accent, borderRadius: 12, padding: '8px 14px', fontSize: 12, color: '#fff', fontWeight: 600, cursor: 'pointer' }
      }, '+ Invite')
    ),

    // Feed posts
    posts.map(post => React.createElement('div', {
      key: post.id,
      style: { margin: '0 20px 14px', background: t.surface, borderRadius: 20, padding: '16px', border: `1.5px solid ${t.border}` }
    },
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' } },
        React.createElement('div', { style: { width: 38, height: 38, borderRadius: '50%', background: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement('span', { style: { color: '#fff', fontSize: 15, fontWeight: 700 } }, post.initial)
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, post.author),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, marginLeft: 6 } }, post.time)
            ),
            React.createElement('span', { style: { fontSize: 18 } }, post.mood)
          ),
          React.createElement('div', { style: { fontSize: 11, color: t.primary, fontStyle: 'italic', marginTop: 1 } }, `${post.ritual} · ${post.location}`)
        )
      ),
      React.createElement('p', { style: { fontSize: 13, color: t.textSub, lineHeight: 1.6, margin: '0 0 12px', fontStyle: 'italic' } }, `"${post.comment}"`),
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' } },
        post.tags.map(tag => React.createElement('div', { key: tag, style: { background: `${t.primary}15`, borderRadius: 8, padding: '3px 9px', fontSize: 10, color: t.primary } }, `#${tag}`))
      ),
      React.createElement('div', { style: { display: 'flex', gap: 16, borderTop: `1px solid ${t.border}`, paddingTop: 10 } },
        React.createElement('div', { className: 'press-effect', style: { display: 'flex', gap: 5, alignItems: 'center', cursor: 'pointer' } },
          React.createElement(window.lucide.Heart, { size: 14, color: t.secondary }),
          React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, post.likes)
        ),
        React.createElement('div', { className: 'press-effect', style: { display: 'flex', gap: 5, alignItems: 'center', cursor: 'pointer' } },
          React.createElement(window.lucide.MessageCircle, { size: 14, color: t.textMuted }),
          React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, 'Reply')
        ),
        React.createElement('div', { className: 'press-effect', style: { display: 'flex', gap: 5, alignItems: 'center', cursor: 'pointer', marginLeft: 'auto' } },
          React.createElement(window.lucide.Share2, { size: 14, color: t.textMuted }),
          React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, 'Share ritual')
        )
      )
    ))
  );
}

function JournalScreen({ t, isDark, setIsDark }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeEntry, setActiveEntry] = useState(null);

  const moods = [
    { id: 1, emoji: '😌', label: 'Calm', color: '#2A7B7B' },
    { id: 2, emoji: '🌟', label: 'Energized', color: '#F0A058' },
    { id: 3, emoji: '💭', label: 'Reflective', color: '#7BA8A0' },
    { id: 4, emoji: '😴', label: 'Restful', color: '#A080C0' },
    { id: 5, emoji: '🌿', label: 'Grounded', color: '#4CAF50' },
  ];

  const entries = [
    { id: 1, date: 'Mar 28', ritual: 'Morning Mist Walk', mood: '😌', location: 'Kyoto', note: 'Felt a deep quietness today. The mist over the stone path reminded me that stillness is a skill.', moodScore: 8 },
    { id: 2, date: 'Mar 27', ritual: 'Alpine Tea Ceremony', mood: '🍵', location: 'Alps', note: 'Took 20 minutes to brew. Each step deliberate. Left feeling anchored to the present moment.', moodScore: 9 },
    { id: 3, date: 'Mar 26', ritual: 'Seaside Breathing', mood: '🌊', location: 'Bali', note: 'The wave rhythm helped regulate my anxiety. Stayed for 3 full cycles. Felt renewed after.', moodScore: 7 },
  ];

  const weekMoods = [7, 8, 6, 9, 7, 8, 9];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.3s ease' }
  },
    React.createElement('div', { style: { padding: '16px 24px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 3px' } }, 'Ritual Journal'),
        React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontStyle: 'italic' } }, 'Mood & wellbeing tracker')
      ),
      React.createElement('div', {
        className: 'press-effect',
        onClick: () => setIsDark(!isDark),
        style: { width: 36, height: 36, borderRadius: 12, background: t.surface, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
      },
        React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 16, color: t.primary })
      )
    ),

    // Mood check-in
    React.createElement('div', {
      style: { margin: '0 20px 16px', background: t.surface, borderRadius: 20, padding: '16px', border: `1.5px solid ${t.border}` }
    },
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'How do you feel after your ritual today?'),
      React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'space-between' } },
        moods.map(m => React.createElement('div', {
          key: m.id,
          onClick: () => setSelectedMood(m.id),
          className: 'press-effect',
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '8px 6px', borderRadius: 14, background: selectedMood === m.id ? `${m.color}20` : 'transparent', border: `1.5px solid ${selectedMood === m.id ? m.color : 'transparent'}`, transition: 'all 0.2s ease', flex: 1 }
        },
          React.createElement('span', { style: { fontSize: 22 } }, m.emoji),
          React.createElement('span', { style: { fontSize: 9, color: selectedMood === m.id ? m.color : t.textMuted, fontWeight: selectedMood === m.id ? 600 : 400 } }, m.label)
        ))
      )
    ),

    // Weekly mood chart
    React.createElement('div', {
      style: { margin: '0 20px 16px', background: t.surface, borderRadius: 20, padding: '16px', border: `1.5px solid ${t.border}` }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Wellbeing This Week'),
        React.createElement('div', { style: { background: `${t.primary}18`, borderRadius: 8, padding: '3px 10px', fontSize: 11, color: t.primary, fontWeight: 600 } }, 'avg 7.7')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'flex-end', height: 70 } },
        weekMoods.map((score, i) => React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
          React.createElement('div', {
            style: { width: '100%', height: `${(score / 10) * 60}px`, background: i === 6 ? t.primary : `${t.primary}55`, borderRadius: '6px 6px 0 0', transition: 'height 0.5s ease', position: 'relative' }
          },
            i === 6 && React.createElement('div', { style: { position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: t.primary, fontWeight: 700 } }, score)
          ),
          React.createElement('span', { style: { fontSize: 9, color: t.textMuted } }, days[i])
        ))
      )
    ),

    // Journal entries
    React.createElement('div', { style: { paddingInline: 20, marginBottom: 8 } },
      React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 10px' } }, 'Past Entries')
    ),
    entries.map(entry => React.createElement('div', {
      key: entry.id,
      className: 'press-effect',
      onClick: () => setActiveEntry(activeEntry === entry.id ? null : entry.id),
      style: { margin: '0 20px 12px', background: t.surface, borderRadius: 18, padding: '14px 16px', border: `1.5px solid ${activeEntry === entry.id ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.2s ease' }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: 18 } }, entry.mood),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, entry.ritual)
          ),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2, fontStyle: 'italic' } }, `${entry.location} · ${entry.date}`)
        ),
        React.createElement('div', {
          style: { width: 32, height: 32, borderRadius: '50%', background: `${t.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: t.primary }
        }, entry.moodScore)
      ),
      activeEntry === entry.id && React.createElement('div', {
        style: { borderTop: `1px solid ${t.border}`, marginTop: 10, paddingTop: 10, fontSize: 12, color: t.textSub, lineHeight: 1.6, fontStyle: 'italic' }
      }, `"${entry.note}"`)
    )),

    // Add entry button
    React.createElement('div', { style: { padding: '8px 20px 20px' } },
      React.createElement('div', {
        className: 'press-effect',
        style: { background: `linear-gradient(135deg, ${t.primary}, #1A5C5C)`, borderRadius: 18, padding: '14px', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
      },
        React.createElement(window.lucide.PenLine, { size: 16, color: '#fff' }),
        React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: '#fff' } }, 'Add Journal Entry')
      )
    )
  );
}
