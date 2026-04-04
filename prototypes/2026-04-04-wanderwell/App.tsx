const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1A1810',
    surface: '#252318',
    surfaceAlt: '#2E2A1F',
    card: '#322E22',
    cardBorder: '#4A4535',
    primary: '#8B9B4A',
    primaryLight: '#A5B55A',
    secondary: '#C4622D',
    accent: '#D4A843',
    text: '#E8DFC4',
    textMuted: '#A09070',
    textFaint: '#6B5F45',
    navBg: '#1E1C14',
    navBorder: '#3A3525',
    pinBg: '#C4622D',
    streamBg: '#2A2D1A',
    notch: '#0A0908',
  },
  light: {
    bg: '#F5EDD6',
    surface: '#EDE3C4',
    surfaceAlt: '#E8DDB8',
    card: '#F9F3E2',
    cardBorder: '#C9B87A',
    primary: '#5A6B28',
    primaryLight: '#6B7B35',
    secondary: '#C4622D',
    accent: '#D4A843',
    text: '#2A2010',
    textMuted: '#6B5A35',
    textFaint: '#9B8A60',
    navBg: '#EDE3C4',
    navBorder: '#C9B87A',
    pinBg: '#C4622D',
    streamBg: '#E5DDB0',
    notch: '#1A1810',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [expandedPin, setExpandedPin] = useState(null);
  const [expandedStream, setExpandedStream] = useState(null);
  const [activeRitual, setActiveRitual] = useState(null);
  const [moteSubmitted, setMoteSubmitted] = useState(false);
  const [moteText, setMoteText] = useState('');

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
    * { font-family: 'Lora', Georgia, serif; box-sizing: border-box; }
    ::-webkit-scrollbar { width: 0px; }
    @keyframes unfold {
      from { opacity: 0; transform: scaleY(0.3) translateY(-10px); }
      to { opacity: 1; transform: scaleY(1) translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    .pin-card { animation: unfold 0.35s cubic-bezier(0.23, 1, 0.32, 1) forwards; transform-origin: top center; }
    .fade-in { animation: fadeIn 0.4s ease forwards; }
    .pulse { animation: pulse 3s ease-in-out infinite; }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'motes', label: 'Motes', icon: window.lucide.Feather },
    { id: 'canopy', label: 'Canopy', icon: window.lucide.Map },
    { id: 'streams', label: 'Streams', icon: window.lucide.Waves },
    { id: 'settings', label: 'Journey', icon: window.lucide.Compass },
  ];

  const screens = {
    home: HomeScreen,
    motes: MotesScreen,
    canopy: CanopyScreen,
    streams: StreamsScreen,
    settings: JourneyScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Lora', Georgia, serif" }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375, minHeight: 812, background: t.bg, borderRadius: 48,
        overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column'
      }
    },
      // Dynamic Island
      React.createElement('div', {
        style: { position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: t.notch, borderRadius: 20, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
      },
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#222', border: '2px solid #333' } }),
        React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: '#2A2A2A' } })
      ),

      // Status bar
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px 4px', paddingTop: 60 }
      },
        React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.textMuted } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.textMuted }),
          React.createElement(window.lucide.Battery, { size: 14, color: t.textMuted }),
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(ActiveScreen, { t, isDark, setIsDark, expandedPin, setExpandedPin, expandedStream, setExpandedStream, activeRitual, setActiveRitual, moteSubmitted, setMoteSubmitted, moteText, setMoteText })
      ),

      // Bottom nav
      React.createElement('div', {
        style: { background: t.navBg, borderTop: `1px solid ${t.navBorder}`, padding: '10px 0 24px', display: 'flex' }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            cursor: 'pointer', padding: '6px 4px',
            color: isActive ? t.secondary : t.textFaint,
            transition: 'color 0.2s ease',
          };
          const labelStyle = {
            fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
            fontWeight: isActive ? 600 : 400, color: isActive ? t.secondary : t.textFaint
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle
          },
            React.createElement('div', {
              style: {
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 12,
                background: isActive ? (isDark ? 'rgba(196,98,45,0.15)' : 'rgba(196,98,45,0.1)') : 'transparent',
                transition: 'background 0.2s ease'
              }
            },
              React.createElement(tab.icon, { size: 20 })
            ),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}

// ── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [pressedBtn, setPressedBtn] = useState(null);

  const recentMotes = [
    { id: 1, place: 'Kyoto, Japan', note: 'The sound of distant temple bells dissolving into mist at dawn', type: 'sound', time: '2h ago', contributor: 'A quiet traveler' },
    { id: 2, place: 'Porto, Portugal', note: 'Afternoon light through azulejo tiles casting blue lattice shadows', type: 'light', time: '4h ago', contributor: 'A gentle wanderer' },
    { id: 3, place: 'Oaxaca, Mexico', note: 'The particular stillness of a market alley at siesta, dust motes suspended', type: 'stillness', time: '6h ago', contributor: 'A mindful explorer' },
  ];

  const typeColors = { sound: '#8B9B4A', light: '#D4A843', stillness: '#C4622D' };
  const typeIcons = { sound: window.lucide.Music, light: window.lucide.Sun, stillness: window.lucide.Wind };

  return React.createElement('div', { style: { padding: '0 0 16px' } },
    // Header
    React.createElement('div', {
      style: { padding: '16px 22px 20px', borderBottom: `1px solid ${t.cardBorder}` }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: t.secondary, fontWeight: 600, marginBottom: 4 } }, 'WanderWell'),
          React.createElement('h1', { style: { fontSize: 24, fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.2 } }, 'River of Calm'),
          React.createElement('p', { style: { fontSize: 12, color: t.textMuted, margin: '4px 0 0', fontStyle: 'italic' } }, 'Your collaborative map to tranquil journeys')
        ),
        React.createElement('div', {
          style: { width: 44, height: 44, borderRadius: '50%', background: t.card, border: `2px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement(window.lucide.User, { size: 20, color: t.textMuted })
        )
      )
    ),

    // Global stats
    React.createElement('div', { style: { padding: '16px 22px', background: t.surface } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 10, fontWeight: 600 } }, 'Global River Status'),
      React.createElement('div', { style: { display: 'flex', gap: 12 } },
        [
          { value: '48,291', label: 'Motes gathered', icon: window.lucide.Feather },
          { value: '127', label: 'Streams flowing', icon: window.lucide.Waves },
          { value: '83', label: 'Countries calm', icon: window.lucide.Globe },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '10px 8px', textAlign: 'center' }
          },
            React.createElement(stat.icon, { size: 14, color: t.secondary, style: { display: 'block', margin: '0 auto 4px' } }),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, stat.value),
            React.createElement('div', { style: { fontSize: 9, color: t.textFaint, letterSpacing: '0.05em' } }, stat.label)
          )
        )
      )
    ),

    // Calm progress
    React.createElement('div', { style: { padding: '16px 22px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
        React.createElement('span', { style: { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textMuted, fontWeight: 600 } }, 'Next Serenity Stream'),
        React.createElement('span', { style: { fontSize: 11, color: t.accent, fontWeight: 600 } }, '73%')
      ),
      React.createElement('div', { style: { height: 8, background: t.card, borderRadius: 4, overflow: 'hidden', border: `1px solid ${t.cardBorder}` } },
        React.createElement('div', {
          className: 'pulse',
          style: { height: '100%', width: '73%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 4 }
        })
      ),
      React.createElement('p', { style: { fontSize: 11, color: t.textFaint, marginTop: 6, fontStyle: 'italic' } },
        '1,247 more Motes needed to unlock "Alpine Stillness"'
      )
    ),

    // Daily ritual prompt
    React.createElement('div', {
      style: { margin: '0 22px 20px', background: t.surface, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: '16px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', {
        style: { position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: t.secondary, opacity: 0.08, borderRadius: '0 14px 0 100%' }
      }),
      React.createElement('div', { style: { fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.secondary, fontWeight: 700, marginBottom: 6 } }, 'Today\'s Ritual'),
      React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 6px' } }, 'Sensory Awareness Walk'),
      React.createElement('p', { style: { fontSize: 12, color: t.textMuted, margin: '0 0 12px', lineHeight: 1.6, fontStyle: 'italic' } },
        'Spend 15 minutes noticing one thing each sense perceives. Let the city speak to you softly.'
      ),
      React.createElement('div', {
        style: {
          display: 'inline-flex', alignItems: 'center', gap: 6, background: t.secondary, color: '#fff', borderRadius: 8, padding: '8px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em'
        }
      },
        React.createElement(window.lucide.Play, { size: 12 }),
        'Begin Ritual'
      )
    ),

    // Recent motes
    React.createElement('div', { style: { padding: '0 22px' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, fontWeight: 600 } }, 'Fresh from the River'),
      recentMotes.map((mote, i) => {
        const Icon = typeIcons[mote.type];
        return React.createElement('div', {
          key: mote.id,
          style: {
            background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '12px 14px',
            marginBottom: 8, position: 'relative',
            borderLeft: `3px solid ${typeColors[mote.type]}`
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 } },
                React.createElement(window.lucide.MapPin, { size: 11, color: t.secondary }),
                React.createElement('span', { style: { fontSize: 10, fontWeight: 600, color: t.secondary, letterSpacing: '0.05em' } }, mote.place),
                React.createElement('span', { style: { fontSize: 9, color: t.textFaint } }, '·'),
                React.createElement('span', { style: { fontSize: 9, color: t.textFaint } }, mote.time)
              ),
              React.createElement('p', { style: { fontSize: 12, color: t.text, margin: 0, fontStyle: 'italic', lineHeight: 1.55 } }, `"${mote.note}"`),
              React.createElement('div', { style: { fontSize: 10, color: t.textFaint, marginTop: 6 } }, `— ${mote.contributor}`)
            ),
            React.createElement('div', {
              style: { width: 28, height: 28, borderRadius: 8, background: `${typeColors[mote.type]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 10 }
            },
              React.createElement(Icon, { size: 13, color: typeColors[mote.type] })
            )
          )
        );
      })
    )
  );
}

// ── MOTES SCREEN ─────────────────────────────────────────────────────────────
function MotesScreen({ t, expandedPin, setExpandedPin, moteSubmitted, setMoteSubmitted, moteText, setMoteText }) {
  const [selectedType, setSelectedType] = useState('stillness');
  const [step, setStep] = useState('browse'); // browse | compose

  const pins = [
    { id: 'p1', x: 110, y: 120, place: 'Lisbon, Portugal', type: 'light', motes: 312, preview: 'Golden hour refracting through laundry lines across whitewashed walls', contributor: 'A gentle wanderer', tags: ['light', 'urban', 'warmth'], date: 'March 2026' },
    { id: 'p2', x: 220, y: 180, place: 'Kyoto, Japan', type: 'sound', motes: 891, preview: 'Rain on gravel in a temple courtyard, measured and unhurried', contributor: 'A quiet traveler', tags: ['sound', 'nature', 'rain'], date: 'February 2026' },
    { id: 'p3', x: 60, y: 240, place: 'Oaxaca, Mexico', type: 'stillness', motes: 147, preview: 'The suspended hush of a market alley between the siesta hours', contributor: 'A mindful explorer', tags: ['stillness', 'urban', 'afternoon'], date: 'April 2026' },
    { id: 'p4', x: 280, y: 290, place: 'Chiang Mai', type: 'scent', motes: 203, preview: 'Incense and frangipani drifting through a temple garden at dusk', contributor: 'A serene pilgrim', tags: ['scent', 'sacred', 'dusk'], date: 'March 2026' },
    { id: 'p5', x: 160, y: 320, place: 'Bruges, Belgium', type: 'light', motes: 76, preview: 'Pale winter light silvering the canal surface at midday', contributor: 'A still observer', tags: ['light', 'water', 'winter'], date: 'January 2026' },
  ];

  const typeConfig = {
    light: { color: '#D4A843', icon: window.lucide.Sun, label: 'Light' },
    sound: { color: '#8B9B4A', icon: window.lucide.Music, label: 'Sound' },
    stillness: { color: '#C4622D', icon: window.lucide.Wind, label: 'Stillness' },
    scent: { color: '#9B7B5A', icon: window.lucide.Leaf, label: 'Scent' },
  };

  const expanded = expandedPin ? pins.find(p => p.id === expandedPin) : null;

  if (step === 'compose') {
    return React.createElement('div', { style: { padding: '16px 22px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 } },
        React.createElement('div', { onClick: () => setStep('browse'), style: { cursor: 'pointer', color: t.textMuted } },
          React.createElement(window.lucide.ArrowLeft, { size: 20 })
        ),
        React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, margin: 0 } }, 'Leave a Mindful Mote')
      ),

      !moteSubmitted ? React.createElement('div', { className: 'fade-in' },
        // Location
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '12px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(window.lucide.MapPin, { size: 16, color: t.secondary }),
          React.createElement('span', { style: { fontSize: 13, color: t.text, fontStyle: 'italic' } }, 'Lisbon, Portugal — Detected'),
          React.createElement('div', { style: { marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: t.primary } })
        ),

        // Type selector
        React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 8, fontWeight: 600 } }, 'What are you sensing?'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 } },
          Object.entries(typeConfig).map(([key, cfg]) =>
            React.createElement('div', {
              key,
              onClick: () => setSelectedType(key),
              style: {
                background: selectedType === key ? `${cfg.color}22` : t.card,
                border: `2px solid ${selectedType === key ? cfg.color : t.cardBorder}`,
                borderRadius: 10, padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s ease'
              }
            },
              React.createElement(cfg.icon, { size: 15, color: cfg.color }),
              React.createElement('span', { style: { fontSize: 12, color: t.text, fontWeight: selectedType === key ? 600 : 400 } }, cfg.label)
            )
          )
        ),

        // Text input
        React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 8, fontWeight: 600 } }, 'Describe the moment'),
        React.createElement('textarea', {
          value: moteText,
          onChange: e => setMoteText(e.target.value),
          placeholder: 'The way afternoon light catches the dust on old stone steps, turning ordinary into golden…',
          style: {
            width: '100%', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12,
            padding: '12px 14px', color: t.text, fontSize: 13, fontFamily: "'Lora', Georgia, serif",
            fontStyle: 'italic', resize: 'none', height: 120, outline: 'none', lineHeight: 1.6,
            marginBottom: 16
          }
        }),

        // Audio/photo row
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
          React.createElement('div', {
            style: { flex: 1, background: t.card, border: `1px dashed ${t.cardBorder}`, borderRadius: 10, padding: '12px', textAlign: 'center', cursor: 'pointer' }
          },
            React.createElement(window.lucide.Mic, { size: 18, color: t.textFaint, style: { display: 'block', margin: '0 auto 4px' } }),
            React.createElement('div', { style: { fontSize: 10, color: t.textFaint } }, 'Record sound')
          ),
          React.createElement('div', {
            style: { flex: 1, background: t.card, border: `1px dashed ${t.cardBorder}`, borderRadius: 10, padding: '12px', textAlign: 'center', cursor: 'pointer' }
          },
            React.createElement(window.lucide.Camera, { size: 18, color: t.textFaint, style: { display: 'block', margin: '0 auto 4px' } }),
            React.createElement('div', { style: { fontSize: 10, color: t.textFaint } }, 'Add image')
          )
        ),

        React.createElement('div', {
          onClick: () => { if (moteText.trim()) setMoteSubmitted(true); },
          style: {
            background: moteText.trim() ? t.secondary : t.card,
            color: moteText.trim() ? '#fff' : t.textFaint,
            borderRadius: 12, padding: '14px', textAlign: 'center', cursor: moteText.trim() ? 'pointer' : 'default',
            fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', transition: 'all 0.2s ease'
          }
        }, 'Release to the River')

      ) : React.createElement('div', { className: 'fade-in', style: { textAlign: 'center', padding: '40px 20px' } },
        React.createElement('div', { style: { width: 72, height: 72, borderRadius: '50%', background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' } },
          React.createElement(window.lucide.Check, { size: 32, color: t.primary })
        ),
        React.createElement('h3', { style: { fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Mote Released'),
        React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontStyle: 'italic', lineHeight: 1.7, marginBottom: 24 } },
          'Your quiet observation joins the River of Calm, woven anonymously into the collective tapestry of tranquility.'
        ),
        React.createElement('div', { style: { background: t.surface, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '12px 16px', marginBottom: 20 } },
          React.createElement('div', { style: { fontSize: 10, color: t.textFaint, marginBottom: 4 } }, 'Your contribution'),
          React.createElement('p', { style: { fontSize: 12, color: t.text, fontStyle: 'italic', margin: 0 } }, `"${moteText}"`)
        ),
        React.createElement('div', { onClick: () => { setMoteSubmitted(false); setMoteText(''); setStep('browse'); }, style: { color: t.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 600 } }, 'Return to Map')
      )
    );
  }

  return React.createElement('div', { style: { padding: '16px 0 16px' } },
    React.createElement('div', { style: { padding: '0 22px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.secondary, fontWeight: 700, marginBottom: 2 } }, 'Mindful Motes'),
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, margin: 0 } }, 'Tap to Explore')
      ),
      React.createElement('div', {
        onClick: () => setStep('compose'),
        style: { background: t.secondary, color: '#fff', borderRadius: 10, padding: '8px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.05em' }
      },
        React.createElement(window.lucide.Plus, { size: 14 }),
        'Add Mote'
      )
    ),

    // Map area
    React.createElement('div', {
      onClick: () => expandedPin && setExpandedPin(null),
      style: { margin: '0 22px', height: 320, background: t.surface, borderRadius: 16, border: `1px solid ${t.cardBorder}`, position: 'relative', overflow: 'hidden' }
    },
      // Map texture overlay
      React.createElement('div', { style: { position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, #888 20px, #888 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, #888 20px, #888 21px)' } }),
      React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement('span', { style: { fontSize: 10, letterSpacing: '0.2em', color: t.textFaint, textTransform: 'uppercase' } }, 'Local Region · April 2026')
      ),

      // Pins
      pins.map(pin => {
        const cfg = typeConfig[pin.type];
        return React.createElement('div', {
          key: pin.id,
          style: { position: 'absolute', left: pin.x, top: pin.y, zIndex: expandedPin === pin.id ? 20 : 10 }
        },
          // Ripple
          React.createElement('div', {
            style: {
              position: 'absolute', width: 24, height: 24, borderRadius: '50%',
              border: `2px solid ${cfg.color}`, top: -4, left: -4,
              animation: 'ripple 2s ease-out infinite', opacity: 0.5
            }
          }),
          // Pin dot
          React.createElement('div', {
            onClick: e => { e.stopPropagation(); setExpandedPin(expandedPin === pin.id ? null : pin.id); },
            style: {
              width: 16, height: 16, borderRadius: '50%', background: cfg.color,
              border: '2px solid #fff', cursor: 'pointer', boxShadow: `0 2px 8px ${cfg.color}66`,
              transition: 'transform 0.2s ease', transform: expandedPin === pin.id ? 'scale(1.3)' : 'scale(1)'
            }
          }),

          // Postcard-style detail card
          expandedPin === pin.id && React.createElement('div', {
            className: 'pin-card',
            onClick: e => e.stopPropagation(),
            style: {
              position: 'absolute', left: pin.x > 180 ? -220 : 24, top: 20,
              width: 220, background: '#F9F3E2', border: `2px solid ${cfg.color}`, borderRadius: 12,
              boxShadow: '4px 6px 20px rgba(0,0,0,0.25)', zIndex: 30, overflow: 'hidden'
            }
          },
            // Postcard top strip
            React.createElement('div', { style: { height: 4, background: `repeating-linear-gradient(90deg, ${cfg.color} 0, ${cfg.color} 8px, transparent 8px, transparent 16px)` } }),
            React.createElement('div', { style: { padding: '10px 12px' } },
              React.createElement('div', { style: { fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: cfg.color, fontWeight: 700, marginBottom: 4 } }, `${cfg.label} · ${pin.date}`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 } },
                React.createElement(window.lucide.MapPin, { size: 10, color: '#6B5A35' }),
                React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: '#2A2010', fontFamily: "'Lora', Georgia, serif" } }, pin.place)
              ),
              React.createElement('p', { style: { fontSize: 11, color: '#4A3820', fontStyle: 'italic', margin: '0 0 8px', lineHeight: 1.55, fontFamily: "'Lora', Georgia, serif" } },
                `"${pin.preview}"`
              ),
              React.createElement('div', { style: { borderTop: '1px dashed #C9B87A', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: 9, color: '#9B8A60', fontStyle: 'italic', fontFamily: "'Lora', Georgia, serif" } }, `— ${pin.contributor}`),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(window.lucide.Feather, { size: 9, color: cfg.color }),
                  React.createElement('span', { style: { fontSize: 9, color: cfg.color, fontWeight: 700 } }, pin.motes)
                )
              ),
              React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 8 } },
                pin.tags.map(tag =>
                  React.createElement('span', {
                    key: tag,
                    style: { fontSize: 8, background: `${cfg.color}18`, color: cfg.color, padding: '2px 6px', borderRadius: 4, letterSpacing: '0.08em', fontFamily: "'Lora', Georgia, serif" }
                  }, tag)
                )
              )
            )
          )
        );
      })
    ),

    React.createElement('div', { style: { padding: '12px 22px 0' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 8, fontWeight: 600 } }, 'Tap a pin to unfold its postcard'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        Object.entries(typeConfig).map(([key, cfg]) =>
          React.createElement('div', {
            key,
            style: { display: 'flex', alignItems: 'center', gap: 4, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 8, padding: '5px 8px' }
          },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: cfg.color } }),
            React.createElement('span', { style: { fontSize: 9, color: t.textMuted } }, cfg.label)
          )
        )
      )
    )
  );
}

// ── CANOPY SCREEN ─────────────────────────────────────────────────────────────
function CanopyScreen({ t }) {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { id: 'r1', name: 'East Asia', motes: 18420, streams: 34, x: 270, y: 80, intensity: 0.95, color: '#8B9B4A' },
    { id: 'r2', name: 'Western Europe', motes: 12390, streams: 28, x: 140, y: 100, intensity: 0.78, color: '#D4A843' },
    { id: 'r3', name: 'Southeast Asia', motes: 8210, streams: 19, x: 260, y: 160, intensity: 0.65, color: '#C4622D' },
    { id: 'r4', name: 'Latin America', motes: 5640, streams: 12, x: 80, y: 190, intensity: 0.48, color: '#9B7B5A' },
    { id: 'r5', name: 'South Asia', motes: 3920, streams: 8, x: 210, y: 140, intensity: 0.38, color: '#8B9B4A' },
  ];

  const challenges = [
    { title: 'Forest Sounds in Asia', progress: 67, target: 100, region: 'East Asia', reward: 'Bamboo Grove Stream', icon: window.lucide.Trees },
    { title: 'Urban Stillness in Europe', progress: 41, target: 80, region: 'Western Europe', reward: 'Cathedral Hush Stream', icon: window.lucide.Building },
    { title: 'Desert Dawn Observations', progress: 18, target: 60, region: 'Global', reward: 'Dune Silence Stream', icon: window.lucide.Sun },
  ];

  const sel = selectedRegion ? regions.find(r => r.id === selectedRegion) : null;

  return React.createElement('div', { style: { padding: '16px 0 20px' } },
    React.createElement('div', { style: { padding: '0 22px 16px' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.secondary, fontWeight: 700, marginBottom: 2 } }, 'Collective Canopy'),
      React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, margin: 0 } }, 'Global Calm Map')
    ),

    // Map
    React.createElement('div', {
      style: { margin: '0 22px 20px', height: 240, background: t.surface, borderRadius: 16, border: `1px solid ${t.cardBorder}`, position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, #888 15px, #888 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, #888 15px, #888 16px)' } }),
      React.createElement('div', { style: { position: 'absolute', top: 10, left: 12 } },
        React.createElement('span', { style: { fontSize: 9, letterSpacing: '0.15em', color: t.textFaint, textTransform: 'uppercase' } }, 'World · Calm Density')
      ),

      regions.map(r =>
        React.createElement('div', {
          key: r.id,
          onClick: () => setSelectedRegion(selectedRegion === r.id ? null : r.id),
          style: { position: 'absolute', left: r.x, top: r.y, cursor: 'pointer' }
        },
          React.createElement('div', {
            style: {
              width: 12 + r.intensity * 24, height: 12 + r.intensity * 24,
              borderRadius: '50%', background: r.color,
              opacity: selectedRegion === r.id ? 0.9 : 0.5 + r.intensity * 0.3,
              border: selectedRegion === r.id ? `2px solid ${r.color}` : 'none',
              transition: 'all 0.25s ease',
              boxShadow: selectedRegion === r.id ? `0 0 20px ${r.color}88` : 'none',
              transform: selectedRegion === r.id ? 'scale(1.2)' : 'scale(1)'
            }
          }),
          selectedRegion === r.id && React.createElement('div', {
            className: 'pin-card',
            style: {
              position: 'absolute', left: r.x > 200 ? -160 : 20, top: 20, width: 160,
              background: '#F9F3E2', border: `2px solid ${r.color}`, borderRadius: 10,
              boxShadow: '4px 6px 16px rgba(0,0,0,0.2)', zIndex: 30, padding: '10px 12px'
            }
          },
            React.createElement('div', { style: { height: 3, background: `repeating-linear-gradient(90deg, ${r.color} 0, ${r.color} 6px, transparent 6px, transparent 12px)`, marginBottom: 8, borderRadius: 2 } }),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: '#2A2010', fontFamily: "'Lora', Georgia, serif", marginBottom: 4 } }, r.name),
            React.createElement('div', { style: { fontSize: 10, color: '#6B5A35', fontFamily: "'Lora', Georgia, serif" } },
              React.createElement('span', { style: { fontWeight: 700, color: r.color } }, r.motes.toLocaleString()),
              ' motes'
            ),
            React.createElement('div', { style: { fontSize: 10, color: '#6B5A35', fontFamily: "'Lora', Georgia, serif" } },
              React.createElement('span', { style: { fontWeight: 700, color: r.color } }, r.streams),
              ' streams flowing'
            )
          )
        )
      )
    ),

    // Challenges
    React.createElement('div', { style: { padding: '0 22px' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, fontWeight: 600 } }, 'Community Challenges'),
      challenges.map((ch, i) =>
        React.createElement('div', {
          key: i,
          style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '12px 14px', marginBottom: 10 }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 } },
                React.createElement(ch.icon, { size: 12, color: t.secondary }),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.text } }, ch.title)
              ),
              React.createElement('div', { style: { fontSize: 10, color: t.textFaint, fontStyle: 'italic' } }, `Unlocks: ${ch.reward}`)
            ),
            React.createElement('span', { style: { fontSize: 11, color: t.accent, fontWeight: 700 } }, `${ch.progress}/${ch.target}`)
          ),
          React.createElement('div', { style: { height: 5, background: t.surface, borderRadius: 3, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${(ch.progress / ch.target) * 100}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3, transition: 'width 0.5s ease' } })
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 } },
            React.createElement(window.lucide.MapPin, { size: 9, color: t.textFaint }),
            React.createElement('span', { style: { fontSize: 9, color: t.textFaint } }, ch.region)
          )
        )
      )
    )
  );
}

// ── STREAMS SCREEN ────────────────────────────────────────────────────────────
function StreamsScreen({ t, expandedStream, setExpandedStream }) {
  const [playing, setPlaying] = useState(null);

  const streams = [
    {
      id: 's1', name: 'Kyoto Temple Rain', status: 'unlocked', motes: 891, region: 'East Asia',
      type: 'soundscape', duration: '12 min', contributors: 234,
      description: 'Woven from 234 recordings of rain across Japanese temple grounds. Each drop anonymously contributed by a traveler who paused to listen.',
      tags: ['rain', 'temples', 'Japan'], color: '#8B9B4A'
    },
    {
      id: 's2', name: 'Golden Hour Lisboa', status: 'unlocked', motes: 312, region: 'Western Europe',
      type: 'visual meditation', duration: '8 min', contributors: 89,
      description: 'A generative light piece built from 89 descriptions of Lisbon\'s distinctive late afternoon light on tile and stone.',
      tags: ['light', 'Lisbon', 'tiles'], color: '#D4A843'
    },
    {
      id: 's3', name: 'Alpine Stillness', status: 'locked', motes: 0, region: 'Central Europe',
      type: 'soundscape', duration: '18 min', contributors: 0,
      description: 'Unlocks when 1,500 stillness motes are gathered from Alpine regions. Help open this path.',
      tags: ['mountains', 'silence', 'Alps'], color: '#9B7B5A', lockProgress: 73
    },
    {
      id: 's4', name: 'Oaxacan Market Hush', status: 'unlocked', motes: 147, region: 'Latin America',
      type: 'ambient', duration: '10 min', contributors: 47,
      description: 'The quiet between things: siesta hour, suspended conversations, dust motes in afternoon light.',
      tags: ['market', 'Mexico', 'stillness'], color: '#C4622D'
    },
  ];

  const sel = expandedStream ? streams.find(s => s.id === expandedStream) : null;

  return React.createElement('div', { style: { padding: '16px 0 20px' } },
    React.createElement('div', { style: { padding: '0 22px 16px' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.secondary, fontWeight: 700, marginBottom: 2 } }, 'Serenity Streams'),
      React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, margin: 0 } }, 'Collective Experiences')
    ),

    // Streams list
    React.createElement('div', { style: { padding: '0 22px' } },
      streams.map(stream => {
        const isExpanded = expandedStream === stream.id;
        const isLocked = stream.status === 'locked';

        return React.createElement('div', {
          key: stream.id,
          style: {
            background: t.card, border: `1px solid ${isExpanded ? stream.color : t.cardBorder}`,
            borderRadius: 14, marginBottom: 12, overflow: 'hidden',
            transition: 'border-color 0.25s ease',
            opacity: isLocked ? 0.75 : 1
          }
        },
          // Card header — functions as unfold trigger
          React.createElement('div', {
            onClick: () => !isLocked && setExpandedStream(isExpanded ? null : stream.id),
            style: { padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: isLocked ? 'default' : 'pointer' }
          },
            React.createElement('div', {
              style: { width: 44, height: 44, borderRadius: 10, background: `${stream.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
            },
              isLocked
                ? React.createElement(window.lucide.Lock, { size: 18, color: stream.color })
                : React.createElement(window.lucide.Waves, { size: 18, color: stream.color })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, stream.name),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
                React.createElement('span', { style: { fontSize: 9, color: stream.color, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 } }, stream.type),
                !isLocked && React.createElement('span', { style: { fontSize: 9, color: t.textFaint } }, `· ${stream.contributors} contributors · ${stream.duration}`)
              )
            ),
            isLocked
              ? React.createElement('div', { style: { fontSize: 9, color: stream.color, fontWeight: 700, textAlign: 'right' } }, `${stream.lockProgress}%`)
              : React.createElement(isExpanded ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 16, color: t.textFaint })
          ),

          // Lock progress
          isLocked && React.createElement('div', { style: { padding: '0 16px 14px' } },
            React.createElement('div', { style: { height: 4, background: t.surface, borderRadius: 2, overflow: 'hidden', marginBottom: 4 } },
              React.createElement('div', { style: { height: '100%', width: `${stream.lockProgress}%`, background: stream.color, borderRadius: 2 } })
            ),
            React.createElement('div', { style: { fontSize: 9, color: t.textFaint, fontStyle: 'italic' } }, 'Gathering community motes to unlock…')
          ),

          // Expanded postcard-like detail
          isExpanded && React.createElement('div', {
            className: 'pin-card',
            style: { borderTop: `1px solid ${t.cardBorder}`, background: t.surfaceAlt, padding: '14px 16px' }
          },
            // Postcard stripe
            React.createElement('div', { style: { height: 3, background: `repeating-linear-gradient(90deg, ${stream.color} 0, ${stream.color} 8px, transparent 8px, transparent 16px)`, marginBottom: 12, borderRadius: 2 } }),
            React.createElement('p', { style: { fontSize: 12, color: t.text, fontStyle: 'italic', lineHeight: 1.65, margin: '0 0 14px' } },
              `"${stream.description}"`
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' } },
              stream.tags.map(tag =>
                React.createElement('span', {
                  key: tag,
                  style: { fontSize: 9, background: `${stream.color}18`, color: stream.color, padding: '3px 8px', borderRadius: 6, letterSpacing: '0.08em' }
                }, tag)
              ),
              React.createElement('span', { style: { fontSize: 9, background: t.card, color: t.textFaint, padding: '3px 8px', borderRadius: 6, border: `1px solid ${t.cardBorder}` } }, stream.region)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 10 } },
              React.createElement('div', {
                onClick: () => setPlaying(playing === stream.id ? null : stream.id),
                style: {
                  flex: 2, background: playing === stream.id ? t.primary : stream.color,
                  color: '#fff', borderRadius: 10, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'background 0.2s ease'
                }
              },
                React.createElement(playing === stream.id ? window.lucide.Pause : window.lucide.Play, { size: 14 }),
                playing === stream.id ? 'Playing…' : 'Enter Stream'
              ),
              React.createElement('div', {
                style: { flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`, color: t.textMuted, borderRadius: 10, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
              },
                React.createElement(window.lucide.Heart, { size: 15 })
              )
            )
          )
        );
      })
    )
  );
}

// ── JOURNEY / SETTINGS SCREEN ────────────────────────────────────────────────
function JourneyScreen({ t, isDark, setIsDark }) {
  const [pressedRitual, setPressedRitual] = useState(null);

  const stats = [
    { label: 'Motes shared', value: '23', icon: window.lucide.Feather },
    { label: 'Countries visited', value: '8', icon: window.lucide.Globe },
    { label: 'Streams entered', value: '11', icon: window.lucide.Waves },
    { label: 'Days of calm', value: '47', icon: window.lucide.CalendarDays },
  ];

  const rituals = [
    { name: 'Sensory Awareness Walk', duration: '15 min', setting: 'Urban', icon: window.lucide.Footprints, done: true },
    { name: 'Gratitude at a Landmark', duration: '5 min', setting: 'Cultural', icon: window.lucide.Heart, done: true },
    { name: 'Sound Mapping', duration: '10 min', setting: 'Any', icon: window.lucide.Ear, done: false },
    { name: 'Dawn Light Observation', duration: '8 min', setting: 'Nature', icon: window.lucide.Sunrise, done: false },
  ];

  const badges = [
    { name: 'First Mote', icon: '🌿', earned: true },
    { name: 'Sound Seeker', icon: '🎵', earned: true },
    { name: 'Light Chaser', icon: '☀️', earned: true },
    { name: 'River Tender', icon: '💧', earned: false },
    { name: 'Stream Opener', icon: '🌊', earned: false },
    { name: 'Canopy Keeper', icon: '🌲', earned: false },
  ];

  return React.createElement('div', { style: { padding: '16px 0 20px' } },
    // Profile header
    React.createElement('div', {
      style: { margin: '0 22px 20px', background: t.surface, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: '18px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: t.primary, opacity: 0.06 } }),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', { style: { width: 56, height: 56, borderRadius: '50%', background: `${t.secondary}22`, border: `2px solid ${t.secondary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(window.lucide.User, { size: 24, color: t.secondary })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 2 } }, 'Your Journey'),
          React.createElement('h3', { style: { fontSize: 18, fontWeight: 700, color: t.text, margin: '0 0 2px' } }, 'A Quiet Wanderer'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontStyle: 'italic' } }, 'Member since January 2026')
        )
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 } },
        stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }
          },
            React.createElement(s.icon, { size: 14, color: t.secondary }),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, s.value),
              React.createElement('div', { style: { fontSize: 9, color: t.textFaint } }, s.label)
            )
          )
        )
      )
    ),

    // Pathfinding Rituals
    React.createElement('div', { style: { padding: '0 22px 20px' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, fontWeight: 600 } }, 'Pathfinding Rituals'),
      rituals.map((ritual, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, border: `1px solid ${ritual.done ? t.primary : t.cardBorder}`,
            borderRadius: 12, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10,
            opacity: ritual.done ? 0.8 : 1,
            transform: pressedRitual === i ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.15s ease'
          },
          onMouseDown: () => setPressedRitual(i),
          onMouseUp: () => setPressedRitual(null)
        },
          React.createElement('div', {
            style: { width: 36, height: 36, borderRadius: 10, background: ritual.done ? `${t.primary}22` : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            React.createElement(ritual.icon, { size: 16, color: ritual.done ? t.primary : t.textMuted })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: ritual.done ? t.textMuted : t.text, textDecoration: ritual.done ? 'line-through' : 'none' } }, ritual.name),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 2 } },
              React.createElement('span', { style: { fontSize: 9, color: t.textFaint } }, ritual.setting),
              React.createElement('span', { style: { fontSize: 9, color: t.textFaint } }, `· ${ritual.duration}`)
            )
          ),
          ritual.done
            ? React.createElement(window.lucide.CheckCircle, { size: 16, color: t.primary })
            : React.createElement(window.lucide.Circle, { size: 16, color: t.textFaint })
        )
      )
    ),

    // Badges
    React.createElement('div', { style: { padding: '0 22px 20px' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, fontWeight: 600 } }, 'Journey Unlocks'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 } },
        badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: badge.earned ? t.card : t.surface, border: `1px solid ${badge.earned ? t.accent : t.cardBorder}`,
              borderRadius: 10, padding: '10px 8px', textAlign: 'center',
              opacity: badge.earned ? 1 : 0.45
            }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 4, filter: badge.earned ? 'none' : 'grayscale(100%)' } }, badge.icon),
            React.createElement('div', { style: { fontSize: 9, color: badge.earned ? t.text : t.textFaint, fontWeight: badge.earned ? 600 : 400, lineHeight: 1.3 } }, badge.name)
          )
        )
      )
    ),

    // Settings
    React.createElement('div', { style: { padding: '0 22px' } },
      React.createElement('div', { style: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, fontWeight: 600 } }, 'Preferences'),
      React.createElement('div', { style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, overflow: 'hidden' } },
        [
          {
            label: isDark ? 'Dark Mode' : 'Light Mode',
            icon: isDark ? window.lucide.Moon : window.lucide.Sun,
            action: React.createElement('div', {
              onClick: () => setIsDark(!isDark),
              style: { width: 44, height: 24, borderRadius: 12, background: isDark ? t.secondary : t.cardBorder, position: 'relative', cursor: 'pointer', transition: 'background 0.25s' }
            },
              React.createElement('div', {
                style: { position: 'absolute', top: 2, left: isDark ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }
              })
            )
          },
          { label: 'Notifications', icon: window.lucide.Bell, action: React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textFaint }) },
          { label: 'Privacy', icon: window.lucide.Shield, action: React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textFaint }) },
          { label: 'About WanderWell', icon: window.lucide.Info, action: React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textFaint }) },
        ].map((item, i, arr) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: i < arr.length - 1 ? `1px solid ${t.cardBorder}` : 'none', cursor: 'pointer' }
          },
            React.createElement(item.icon, { size: 16, color: t.textMuted }),
            React.createElement('span', { style: { flex: 1, fontSize: 13, color: t.text } }, item.label),
            item.action
          )
        )
      )
    )
  );
}
