const { useState, useEffect, useRef } = React;

const THEMES = {
  dark: {
    bg: '#0F1410', surf: '#161D16', surfAlt: '#1E271E',
    card: '#1A221A', cardBorder: '#253025', border: '#2A352A',
    text: '#E4DDD2', sub: '#9A9288', muted: '#5E5C58',
    green: '#6B9060', greenLight: '#8AAE7E', greenDark: '#3D5A38',
    aubergine: '#7A3A6E', aubergineLight: '#9A5A8E',
    parchment: '#C4A06A', parchmentLight: '#D4B888',
    overlay: 'rgba(15,20,16,0.7)',
  },
  light: {
    bg: '#F2EBE0', surf: '#E8DDD0', surfAlt: '#EFF5EC',
    card: '#FDFAF5', cardBorder: '#D8CCBC', border: '#D0C4B4',
    text: '#1A1C16', sub: '#5C5A50', muted: '#9A9288',
    green: '#3A5E36', greenLight: '#4E7A48', greenDark: '#2A4228',
    aubergine: '#4A1A42', aubergineLight: '#6A3A60',
    parchment: '#7A5830', parchmentLight: '#9A7848',
    overlay: 'rgba(242,235,224,0.85)',
  }
};

const Icon = ({ name, size = 18, color, sw = 1.5 }) => {
  const C = window.lucide?.[name];
  if (!C) return null;
  return React.createElement(C, { size, color, strokeWidth: sw });
};

const meanders = [
  {
    id: 1,
    title: 'Urban Stillness Walk',
    location: 'City Centre · 5 min',
    tag: 'Architecture',
    desc: 'Find three unique architectural details and pause thirty seconds with each.',
    steps: [
      'Stand still and observe your surroundings for 60 seconds.',
      'Identify three unique architectural details — a carved lintel, a mosaic tile, an unexpected window shape.',
      'With each detail, take three slow breaths and notice what draws you to it.',
      'Photograph your favourite and write one sentence about how it makes you feel.',
    ],
    gradient: 'linear-gradient(170deg, #1A2B1A 0%, #253A25 40%, #1D2F1A 70%, #0F1810 100%)',
    accentColor: '#6B9060',
  },
  {
    id: 2,
    title: 'Harbor Sound Bath',
    location: 'Waterfront · 8 min',
    tag: 'Soundscape',
    desc: 'Capture an ambient soundscape of the harbor and breathe in time with the waves.',
    steps: [
      'Find a seat near the water\'s edge, away from foot traffic.',
      'Close your eyes and identify five distinct sounds.',
      'Record a 60-second ambient clip for the Haven Atlas.',
      'Breathe in for 4 counts as a wave approaches, out for 4 as it recedes.',
    ],
    gradient: 'linear-gradient(160deg, #141D24 0%, #1A2B38 50%, #0E1820 100%)',
    accentColor: '#5A8A9A',
  },
  {
    id: 3,
    title: 'Flora Observation',
    location: 'Park or Trail · 6 min',
    tag: 'Nature',
    desc: 'Mindfully observe local flora — texture, colour, scent — to ground yourself in the present.',
    steps: [
      'Choose a plant or flower that catches your eye.',
      'Observe its colour gradients for 30 seconds without labelling it.',
      'Gently touch a leaf and notice temperature and texture.',
      'Inhale near the plant for 20 seconds and log your sensory notes.',
    ],
    gradient: 'linear-gradient(165deg, #162018 0%, #1E2E1A 45%, #121A10 100%)',
    accentColor: '#8AAE7E',
  },
];

const atlasNodes = [
  { id: 1, x: 72, y: 44, type: 'sound', label: 'Porto Harbor', user: 'M', count: 12 },
  { id: 2, x: 180, y: 90, type: 'photo', label: 'Tokyo Shrine', user: 'K', count: 34 },
  { id: 3, x: 290, y: 55, type: 'reflect', label: 'Lisbon Steps', user: 'A', count: 8 },
  { id: 4, x: 110, y: 155, type: 'flora', label: 'Kyoto Garden', user: 'R', count: 21 },
  { id: 5, x: 240, y: 148, type: 'sound', label: 'Prague Square', user: 'E', count: 16 },
  { id: 6, x: 50, y: 200, type: 'photo', label: 'Oaxaca Market', user: 'L', count: 9 },
  { id: 7, x: 320, y: 195, type: 'reflect', label: 'Bali Rice Field', user: 'T', count: 27 },
  { id: 8, x: 160, y: 220, type: 'flora', label: 'Oslo Forest', user: 'N', count: 18 },
];

const nodeTypeColor = { sound: '#5A8A9A', photo: '#6B9060', reflect: '#7A3A6E', flora: '#8AAE7E' };
const nodeTypeIcon = { sound: 'Waves', photo: 'Camera', reflect: 'Feather', flora: 'Leaf' };

const journalEntries = [
  {
    id: 1,
    date: 'Apr 3 · Porto',
    title: 'Something slowed down today',
    body: 'I sat at the harbour for what felt like minutes but was an hour. The water kept making these small rhythmic sounds against the stone — I stopped reaching for my phone.',
    mood: 'Peaceful',
    palette: ['#2A3A4A', '#3A5A6A', '#5A8A9A', '#8ABAAA', '#C4D8CC'],
  },
  {
    id: 2,
    date: 'Apr 1 · Lisbon',
    title: 'Tiled walls and open air',
    body: 'Found an alley covered in azulejos I had never noticed, three streets from my hotel. The meander made me look up. Genuinely up.',
    mood: 'Curious',
    palette: ['#3A2A1A', '#5A4030', '#8A6848', '#C4A878', '#E8D4B0'],
  },
  {
    id: 3,
    date: 'Mar 29 · Flight delay',
    title: 'Breathwork at gate 42',
    body: 'Two hour delay. Instead of spiralling I found a quiet corner. The Serenity Forecast actually knew — suggested box breathing. It helped.',
    mood: 'Grounded',
    palette: ['#1A1A2A', '#2A2A4A', '#4A4A7A', '#7A7AA8', '#B0B0D0'],
  },
];

const quests = [
  {
    id: 1,
    title: 'Twilight Harmony',
    desc: 'Collect 10 sunset reflections from different timezones this week.',
    progress: 7,
    total: 10,
    daysLeft: 3,
    participants: 284,
    reward: 'Dusk Palette unlocked for Atlas',
    contributions: [
      { user: 'K', location: 'Tokyo sunset', time: '2h ago' },
      { user: 'A', location: 'Lisbon golden hour', time: '5h ago' },
      { user: 'R', location: 'New York dusk', time: '8h ago' },
    ]
  },
  {
    id: 2,
    title: 'Silence Cartographers',
    desc: 'Map 20 quiet spots in cities with over 1 million people.',
    progress: 14,
    total: 20,
    daysLeft: 6,
    participants: 139,
    reward: 'Quiet Nodes visual layer for Atlas',
    contributions: []
  }
];

function HomeScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [pressedCard, setPressedCard] = useState(null);

  const navCards = [
    { id: 'atlas', label: 'Haven Atlas', sub: '1,247 nodes', icon: 'Globe', color: t.greenDark },
    { id: 'quests', label: 'Path Quests', sub: '2 active', icon: 'Target', color: t.aubergine },
    { id: 'journal', label: 'Echoes Journal', sub: '3 entries', icon: 'BookOpen', color: '#2A3A4A' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', color: t.text }}>

      {/* Hero — full-bleed panoramic forest scene */}
      <div style={{
        height: 230, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(170deg, #0E1A0E 0%, #152815 35%, #1A3018 65%, #0A1208 100%)',
      }}>
        {/* Layered silhouettes */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90,
          background: 'linear-gradient(to top, #0F1410 0%, transparent 100%)' }} />
        <svg style={{ position: 'absolute', bottom: 40, left: 0, right: 0, width: '100%', opacity: 0.25 }} viewBox="0 0 375 80" preserveAspectRatio="none">
          <path d="M0,80 L0,50 Q20,20 40,40 Q55,55 70,30 Q85,10 100,35 Q115,55 130,25 Q145,5 160,30 Q175,50 190,20 Q205,0 220,28 Q235,50 250,22 Q265,5 280,32 Q295,55 310,28 Q325,8 340,35 Q355,55 375,40 L375,80 Z" fill="#2A4028" />
        </svg>
        <svg style={{ position: 'absolute', bottom: 30, left: 0, right: 0, width: '100%', opacity: 0.35 }} viewBox="0 0 375 60" preserveAspectRatio="none">
          <path d="M0,60 L0,45 Q30,10 60,35 Q90,55 120,20 Q150,0 180,25 Q210,45 240,15 Q270,0 300,30 Q330,55 375,38 L375,60 Z" fill="#1A3018" />
        </svg>
        {/* Mist layer */}
        <div style={{ position: 'absolute', bottom: 55, left: 0, right: 0, height: 40,
          background: 'linear-gradient(to right, rgba(108,160,100,0.08), rgba(108,160,100,0.14), rgba(108,160,100,0.06))',
          filter: 'blur(8px)' }} />

        {/* Header controls */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 24px 0' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: t.greenLight, marginBottom: 2 }}>Serene Trails</div>
          </div>
          <button onClick={() => setIsDark(!isDark)} style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 20, padding: '6px 12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5
          }}>
            <Icon name={isDark ? 'Sun' : 'Moon'} size={13} color={t.parchment} />
            <span style={{ fontSize: 10, color: t.parchment, letterSpacing: '0.1em' }}>{isDark ? 'light' : 'dark'}</span>
          </button>
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 2, padding: '16px 24px 0' }}>
          <div style={{ fontSize: 11, color: t.parchmentLight, letterSpacing: '0.08em', marginBottom: 5, fontStyle: 'italic' }}>Saturday, April 4 · Porto</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#E4DDD2', lineHeight: 1.15, margin: 0 }}>
            Find your<br />
            <span style={{ color: t.greenLight }}>still point.</span>
          </h1>
        </div>
      </div>

      {/* Serenity Forecast */}
      <div style={{ margin: '20px 20px 0', background: t.surfAlt, borderRadius: 14, padding: '16px 18px', border: `1px solid ${t.cardBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Icon name="Wind" size={13} color={t.parchment} />
          <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.parchment }}>Serenity Forecast</span>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.55, color: t.text, fontStyle: 'italic', borderLeft: `2px solid ${t.parchment}`, paddingLeft: 12, marginBottom: 12 }}>
          "Your flight boards in 2 hours. A guided breathwork session might ease the transition."
        </div>
        <button onClick={() => setActiveScreen('meander')} style={{
          background: t.parchment, border: 'none', borderRadius: 8, padding: '9px 16px',
          fontSize: 11, fontWeight: 600, color: isDark ? '#0F1410' : '#FDFAF5',
          cursor: 'pointer', letterSpacing: '0.05em', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 6
        }}>
          <Icon name="Play" size={12} color={isDark ? '#0F1410' : '#FDFAF5'} />
          Begin Breathwork
        </button>
      </div>

      {/* Today's Meander */}
      <div style={{ margin: '16px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.muted }}>Today's Meander</span>
          <span style={{ fontSize: 10, color: t.green, cursor: 'pointer' }} onClick={() => setActiveScreen('meander')}>View all</span>
        </div>
        <div
          onClick={() => setActiveScreen('meander')}
          style={{
            borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
            transform: pressedCard === 'meander' ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 0.15s ease',
          }}
          onMouseDown={() => setPressedCard('meander')}
          onMouseUp={() => setPressedCard(null)}
          onTouchStart={() => setPressedCard('meander')}
          onTouchEnd={() => setPressedCard(null)}
        >
          <div style={{
            background: meanders[0].gradient, padding: '20px 20px 16px', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(10,18,10,0.6) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', background: meanders[0].accentColor,
                color: '#fff', borderRadius: 4, padding: '3px 8px' }}>
                {meanders[0].tag}
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#E4DDD2', margin: '10px 0 4px', lineHeight: 1.2 }}>{meanders[0].title}</h3>
              <div style={{ fontSize: 11, color: 'rgba(228,221,210,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="MapPin" size={11} color="rgba(228,221,210,0.7)" />
                {meanders[0].location}
              </div>
            </div>
          </div>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderTop: 'none', borderRadius: '0 0 14px 14px', padding: '12px 20px' }}>
            <p style={{ fontSize: 12, color: t.sub, lineHeight: 1.55, margin: '0 0 10px' }}>{meanders[0].desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i < 2 ? t.green : t.border }} />
                ))}
              </div>
              <span style={{ fontSize: 10, color: t.sub }}>2 of 4 steps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hub nav cards */}
      <div style={{ margin: '16px 20px 0' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.muted, marginBottom: 10 }}>Explore</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {navCards.map(card => (
            <div
              key={card.id}
              onClick={() => setActiveScreen(card.id)}
              style={{
                background: card.color, borderRadius: 12, padding: '14px 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
                transform: pressedCard === card.id ? 'scale(0.98)' : 'scale(1)',
                transition: 'transform 0.15s ease',
              }}
              onMouseDown={() => setPressedCard(card.id)}
              onMouseUp={() => setPressedCard(null)}
              onTouchStart={() => setPressedCard(card.id)}
              onTouchEnd={() => setPressedCard(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={card.icon} size={18} color="rgba(255,255,255,0.85)" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#E4DDD2' }}>{card.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(228,221,210,0.6)' }}>{card.sub}</div>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} color="rgba(228,221,210,0.5)" />
            </div>
          ))}
        </div>
      </div>

      {/* Community pulse */}
      <div style={{ margin: '16px 20px 24px', padding: '14px 18px', border: `1px solid ${t.border}`, borderRadius: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.green, boxShadow: `0 0 6px ${t.green}` }} />
          <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.muted }}>Community Pulse</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>1,247</div>
        <div style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>tranquil moments contributed today · 48 countries</div>
      </div>
    </div>
  );
}

function MeanderScreen({ t, setActiveScreen }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const meander = meanders[activeIdx];
  const done = completedSteps.length === meander.steps.length;

  const toggleStep = (i) => {
    setCompletedSteps(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', color: t.text }}>

      {/* Full-bleed panoramic header */}
      <div style={{ height: 220, position: 'relative', overflow: 'hidden', background: meander.gradient }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(10,15,10,0.75) 100%)' }} />
        {/* Decorative SVG terrain */}
        <svg style={{ position: 'absolute', bottom: 0, width: '100%', opacity: 0.3 }} viewBox="0 0 375 60" preserveAspectRatio="none">
          <path d="M0,60 L0,40 Q50,5 100,30 Q150,55 200,18 Q250,0 300,28 Q340,50 375,35 L375,60 Z" fill="#1A3018" />
        </svg>

        {/* Back button */}
        <button onClick={() => setActiveScreen('home')} style={{
          position: 'absolute', top: 28, left: 20, zIndex: 3,
          background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 10, padding: '7px 12px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(228,221,210,0.9)'
        }}>
          <Icon name="ArrowLeft" size={14} color="rgba(228,221,210,0.9)" />
          <span style={{ fontSize: 11, letterSpacing: '0.05em' }}>Back</span>
        </button>

        {/* Header text */}
        <div style={{ position: 'absolute', bottom: 20, left: 22, right: 22, zIndex: 2 }}>
          <span style={{ fontSize: 9, background: meander.accentColor, color: '#fff', borderRadius: 4, padding: '3px 8px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {meander.tag}
          </span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#E4DDD2', margin: '8px 0 4px', lineHeight: 1.2 }}>{meander.title}</h2>
          <div style={{ fontSize: 11, color: 'rgba(228,221,210,0.65)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="MapPin" size={11} color="rgba(228,221,210,0.65)" />
            {meander.location}
          </div>
        </div>
      </div>

      {/* Meander selector tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${t.border}`, background: t.surf }}>
        {meanders.map((m, i) => (
          <button key={m.id} onClick={() => { setActiveIdx(i); setCompletedSteps([]); }} style={{
            flex: 1, padding: '12px 6px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: activeIdx === i ? `2px solid ${t.green}` : '2px solid transparent',
            fontSize: 10, color: activeIdx === i ? t.green : t.muted,
            letterSpacing: '0.05em', fontFamily: 'inherit', fontWeight: activeIdx === i ? 600 : 400
          }}>
            {m.tag}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div style={{ padding: '20px 22px' }}>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: t.sub, fontStyle: 'italic', marginBottom: 20, borderLeft: `2px solid ${t.parchment}`, paddingLeft: 14 }}>
          {meander.desc}
        </p>

        <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.muted, marginBottom: 14 }}>Steps</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {meander.steps.map((step, i) => {
            const isDone = completedSteps.includes(i);
            return (
              <div
                key={i}
                onClick={() => toggleStep(i)}
                style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                  background: isDone ? (t === THEMES.dark ? 'rgba(107,144,96,0.12)' : 'rgba(58,94,54,0.06)') : t.card,
                  border: `1px solid ${isDone ? t.green : t.cardBorder}`,
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                  border: `2px solid ${isDone ? t.green : t.border}`,
                  background: isDone ? t.green : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isDone && <Icon name="Check" size={12} color="#fff" sw={2.5} />}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: t.muted, marginBottom: 3 }}>Step {i + 1}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: isDone ? t.muted : t.text, margin: 0, textDecoration: isDone ? 'line-through' : 'none' }}>{step}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div style={{ marginTop: 22, padding: '14px 16px', background: t.surfAlt, borderRadius: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: t.sub }}>Progress</span>
            <span style={{ fontSize: 11, color: t.green, fontWeight: 600 }}>{completedSteps.length} / {meander.steps.length}</span>
          </div>
          <div style={{ height: 4, background: t.border, borderRadius: 2 }}>
            <div style={{ height: '100%', borderRadius: 2, background: t.green,
              width: `${(completedSteps.length / meander.steps.length) * 100}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {done && (
          <button style={{
            width: '100%', marginTop: 16, padding: '14px', background: t.green,
            border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700,
            color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
            letterSpacing: '0.04em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <Icon name="Sparkles" size={16} color="#fff" />
            Contribute to Haven Atlas
          </button>
        )}
      </div>
    </div>
  );
}

function AtlasScreen({ t, setActiveScreen }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'sound', 'photo', 'reflect', 'flora'];
  const filteredNodes = activeFilter === 'all' ? atlasNodes : atlasNodes.filter(n => n.type === activeFilter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', color: t.text }}>

      {/* Header */}
      <div style={{ padding: '28px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: t.muted, marginBottom: 4 }}>Community</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.1 }}>Haven Atlas</h2>
          <p style={{ fontSize: 12, color: t.sub, marginTop: 5, fontStyle: 'italic' }}>A living tapestry of collective calm.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.green }}>1,247</div>
          <div style={{ fontSize: 9, color: t.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nodes</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', margin: '16px 22px', gap: 12 }}>
        {[['48', 'Countries'], ['284', 'Wanderers'], ['97%', 'Calm rate']].map(([val, label], i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '12px 8px', background: t.surfAlt, borderRadius: 10, border: `1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>{val}</div>
            <div style={{ fontSize: 9, color: t.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 7, overflowX: 'auto', padding: '0 22px', marginBottom: 14 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            flexShrink: 0, padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
            background: activeFilter === f ? t.green : 'transparent',
            border: `1px solid ${activeFilter === f ? t.green : t.border}`,
            color: activeFilter === f ? '#fff' : t.sub, fontSize: 11,
            fontFamily: 'inherit', textTransform: 'capitalize', letterSpacing: '0.04em',
            transition: 'all 0.2s',
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Atlas map — full-bleed panoramic */}
      <div style={{ margin: '0 0 16px', position: 'relative' }}>
        <div style={{
          height: 270, marginLeft: 22, marginRight: 22, borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(135deg, #0A1A10 0%, #0F2018 30%, #0A1810 60%, #060E08 100%)',
          border: `1px solid ${t.border}`, position: 'relative',
        }}>
          {/* Grid lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}>
            {[0.25, 0.5, 0.75].map(r => (
              <React.Fragment key={r}>
                <line x1={`${r * 100}%`} y1="0" x2={`${r * 100}%`} y2="100%" stroke={t.greenLight} strokeWidth="1" />
                <line x1="0" y1={`${r * 100}%`} x2="100%" y2={`${r * 100}%`} stroke={t.greenLight} strokeWidth="1" />
              </React.Fragment>
            ))}
          </svg>

          {/* Connection lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
            {filteredNodes.slice(0, -1).map((node, i) => {
              const next = filteredNodes[i + 1];
              return (
                <line key={i}
                  x1={`${(node.x / 375) * 100}%`} y1={`${(node.y / 270) * 100}%`}
                  x2={`${(next.x / 375) * 100}%`} y2={`${(next.y / 270) * 100}%`}
                  stroke={t.greenLight} strokeWidth="1" strokeDasharray="3,4"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {filteredNodes.map(node => {
            const col = nodeTypeColor[node.type];
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(isSelected ? null : node)}
                style={{
                  position: 'absolute',
                  left: `${(node.x / 375) * 100}%`,
                  top: `${(node.y / 270) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer', zIndex: isSelected ? 10 : 1,
                }}
              >
                {/* Pulse ring */}
                <div style={{
                  position: 'absolute', inset: -8, borderRadius: '50%',
                  border: `1px solid ${col}`, opacity: 0.3,
                  animation: 'none',
                }} />
                <div style={{
                  width: isSelected ? 18 : 12, height: isSelected ? 18 : 12,
                  borderRadius: '50%', background: col,
                  boxShadow: `0 0 ${isSelected ? 12 : 6}px ${col}`,
                  transition: 'all 0.2s ease', border: `2px solid rgba(255,255,255,0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                </div>
              </div>
            );
          })}

          {/* Selected node tooltip */}
          {selectedNode && (
            <div style={{
              position: 'absolute', bottom: 12, left: 12, right: 12,
              background: 'rgba(10,20,12,0.92)', backdropFilter: 'blur(8px)',
              borderRadius: 10, padding: '10px 14px',
              border: `1px solid ${nodeTypeColor[selectedNode.type]}44`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#E4DDD2' }}>{selectedNode.label}</div>
                  <div style={{ fontSize: 10, color: nodeTypeColor[selectedNode.type], marginTop: 2, textTransform: 'capitalize' }}>
                    {selectedNode.type} · {selectedNode.count} contributions
                  </div>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: nodeTypeColor[selectedNode.type] + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${nodeTypeColor[selectedNode.type]}44` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: nodeTypeColor[selectedNode.type] }}>{selectedNode.user}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent contributions */}
      <div style={{ padding: '0 22px 24px' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.muted, marginBottom: 12 }}>Recent Contributions</div>
        {atlasNodes.slice(0, 4).map((node, i) => (
          <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12,
            borderBottom: i < 3 ? `1px solid ${t.border}` : 'none', marginBottom: i < 3 ? 12 : 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: nodeTypeColor[node.type] + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={nodeTypeIcon[node.type]} size={14} color={nodeTypeColor[node.type]} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{node.label}</div>
              <div style={{ fontSize: 10, color: t.muted, marginTop: 1 }}>{node.count} wanderers · {node.type}</div>
            </div>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: nodeTypeColor[node.type],
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
              {node.user}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestsScreen({ t, setActiveScreen }) {
  const [activeQuestIdx, setActiveQuestIdx] = useState(0);
  const quest = quests[activeQuestIdx];
  const pct = Math.round((quest.progress / quest.total) * 100);

  return (
    <div style={{ flex: 1, overflowY: 'auto', color: t.text }}>

      {/* Full-bleed panoramic header */}
      <div style={{
        height: 180, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(155deg, #1A0A1A 0%, #2A1228 50%, #180E18 80%, #0E0810 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(10,8,10,0.8) 100%)' }} />
        <svg style={{ position: 'absolute', bottom: 0, width: '100%', opacity: 0.2 }} viewBox="0 0 375 50" preserveAspectRatio="none">
          <path d="M0,50 L0,35 Q80,5 160,28 Q240,50 320,20 L375,30 L375,50 Z" fill="#4A1A42" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, padding: '28px 22px 0' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,160,200,0.7)', marginBottom: 5 }}>Collective</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#E4DDD2', margin: 0 }}>Path Quests</h2>
          <p style={{ fontSize: 12, fontStyle: 'italic', color: 'rgba(228,221,210,0.6)', marginTop: 5 }}>Deeper exploration through shared intention.</p>
        </div>
      </div>

      {/* Quest selector */}
      <div style={{ display: 'flex', gap: 10, padding: '16px 22px', overflowX: 'auto' }}>
        {quests.map((q, i) => (
          <button key={q.id} onClick={() => setActiveQuestIdx(i)} style={{
            flexShrink: 0, padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit',
            background: activeQuestIdx === i ? t.aubergine : 'transparent',
            border: `1px solid ${activeQuestIdx === i ? t.aubergine : t.border}`,
            color: activeQuestIdx === i ? '#fff' : t.sub, fontSize: 11, fontWeight: activeQuestIdx === i ? 600 : 400,
            transition: 'all 0.2s',
          }}>
            {q.title}
          </button>
        ))}
      </div>

      {/* Active quest card */}
      <div style={{ margin: '0 22px', padding: '20px', background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.aubergineLight, marginBottom: 6 }}>Active Quest</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{quest.title}</h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: t.muted }}>Ends in</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.parchment }}>{quest.daysLeft}d</div>
          </div>
        </div>

        <p style={{ fontSize: 12, lineHeight: 1.6, color: t.sub, fontStyle: 'italic',
          borderLeft: `2px solid ${t.aubergine}`, paddingLeft: 12, margin: '0 0 18px' }}>
          {quest.desc}
        </p>

        {/* Progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: t.sub }}>Community progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: t.aubergineLight }}>{quest.progress} / {quest.total}</span>
          </div>
          <div style={{ height: 6, background: t.border, borderRadius: 3 }}>
            <div style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${t.aubergine}, ${t.aubergineLight})`,
              width: `${pct}%`, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ fontSize: 10, color: t.muted, marginTop: 5 }}>{pct}% · {quest.participants} wanderers contributing</div>
        </div>

        {/* Reward */}
        <div style={{ background: t.surfAlt, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="Gift" size={16} color={t.parchment} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.muted }}>Community Reward</div>
            <div style={{ fontSize: 12, color: t.text, marginTop: 1 }}>{quest.reward}</div>
          </div>
        </div>
      </div>

      {/* Recent contributions */}
      {quest.contributions.length > 0 && (
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.muted, marginBottom: 12 }}>Recent Contributions</div>
          {quest.contributions.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < quest.contributions.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: t.aubergine,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {c.user}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: t.text }}>{c.location}</div>
                <div style={{ fontSize: 10, color: t.muted, marginTop: 1 }}>{c.time}</div>
              </div>
              <Icon name="Sunset" size={14} color={t.parchment} />
            </div>
          ))}
        </div>
      )}

      {/* Join button */}
      <div style={{ padding: '18px 22px 28px' }}>
        <button style={{
          width: '100%', padding: '14px', background: `linear-gradient(135deg, ${t.aubergine}, ${t.aubergineLight})`,
          border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700,
          color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <Icon name="Plus" size={16} color="#fff" />
          <span>Contribute to this Quest</span>
        </button>
      </div>
    </div>
  );
}

function JournalScreen({ t, setActiveScreen }) {
  const [showCompose, setShowCompose] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  if (selectedEntry) {
    return (
      <div style={{ flex: 1, overflowY: 'auto', color: t.text }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '28px 22px 20px', borderBottom: `1px solid ${t.border}` }}>
          <button onClick={() => setSelectedEntry(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <Icon name="ArrowLeft" size={20} color={t.sub} />
          </button>
          <div>
            <div style={{ fontSize: 10, color: t.muted }}>{selectedEntry.date}</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{selectedEntry.title}</div>
          </div>
        </div>

        {/* AI palette visualization */}
        <div style={{ margin: '20px 22px', borderRadius: 14, overflow: 'hidden', height: 90, position: 'relative' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            {selectedEntry.palette.map((color, i) => (
              <div key={i} style={{ flex: 1, background: color }} />
            ))}
          </div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: 3 }}>AI Mood Palette</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', fontStyle: 'italic' }}>{selectedEntry.mood}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 22px 28px' }}>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: t.text, fontStyle: 'italic' }}>{selectedEntry.body}</p>
          <div style={{ marginTop: 20, padding: '14px 16px', background: t.surfAlt, borderRadius: 10 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.muted, marginBottom: 6 }}>AI Reflection</div>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: t.sub, margin: 0 }}>
              This entry carries a sense of {selectedEntry.mood.toLowerCase()} stillness. The sensory details suggest a shift from external stimulation toward internal quietude.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', color: t.text }}>

      {/* Header */}
      <div style={{ padding: '28px 22px 0' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: t.muted, marginBottom: 4 }}>Private</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 4px' }}>Echoes Journal</h2>
            <p style={{ fontSize: 12, color: t.sub, fontStyle: 'italic', margin: 0 }}>Your personal sanctuary of reflection.</p>
          </div>
          <button
            onClick={() => setShowCompose(!showCompose)}
            style={{
              background: t.green, border: 'none', borderRadius: 10, padding: '9px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <Icon name={showCompose ? 'X' : 'Plus'} size={18} color="#fff" />
          </button>
        </div>
      </div>

      {/* Compose panel */}
      {showCompose && (
        <div style={{ margin: '16px 22px 0', padding: '16px', background: t.card, borderRadius: 14, border: `1px solid ${t.cardBorder}` }}>
          <div style={{ fontSize: 10, color: t.muted, marginBottom: 8, letterSpacing: '0.1em' }}>New entry · {new Date().toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</div>
          <textarea
            value={journalText}
            onChange={e => setJournalText(e.target.value)}
            placeholder="Write freely. What did you notice today?"
            style={{
              width: '100%', minHeight: 100, background: t.surfAlt, border: `1px solid ${t.border}`,
              borderRadius: 10, padding: '12px', fontSize: 13, lineHeight: 1.6,
              color: t.text, resize: 'none', outline: 'none', fontFamily: 'inherit', fontStyle: 'italic',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 10, color: t.muted }}>AI will generate a mood palette</span>
            <button style={{
              background: t.green, border: 'none', borderRadius: 8, padding: '8px 16px',
              fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer', fontFamily: 'inherit'
            }}>Save Entry</button>
          </div>
        </div>
      )}

      {/* Entries */}
      <div style={{ padding: '20px 22px 24px' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.muted, marginBottom: 14 }}>Recent Reflections</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {journalEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              style={{ cursor: 'pointer', borderRadius: 14, overflow: 'hidden', border: `1px solid ${t.cardBorder}` }}
            >
              {/* Palette strip */}
              <div style={{ display: 'flex', height: 6 }}>
                {entry.palette.map((color, i) => (
                  <div key={i} style={{ flex: 1, background: color }} />
                ))}
              </div>
              <div style={{ background: t.card, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, color: t.muted, marginBottom: 4 }}>{entry.date}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{entry.title}</div>
                  </div>
                  <span style={{ fontSize: 9, background: t.surfAlt, border: `1px solid ${t.border}`,
                    borderRadius: 10, padding: '3px 8px', color: t.sub, letterSpacing: '0.08em' }}>
                    {entry.mood}
                  </span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.55, color: t.sub, margin: '0 0 10px',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {entry.body}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: t.green }}>
                  <Icon name="ChevronRight" size={12} color={t.green} />
                  <span style={{ fontSize: 10, letterSpacing: '0.08em' }}>Read full entry</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BottomNav({ t, activeScreen, setActiveScreen }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'atlas', label: 'Atlas', icon: 'Globe' },
    { id: 'meander', label: 'Wander', icon: 'Compass' },
    { id: 'quests', label: 'Quests', icon: 'Target' },
    { id: 'journal', label: 'Journal', icon: 'BookOpen' },
  ];

  return (
    <div style={{
      height: 64, background: t.surf, borderTop: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 4px', flexShrink: 0,
    }}>
      {navItems.map(item => {
        const isActive = activeScreen === item.id;
        return (
          <button key={item.id} onClick={() => setActiveScreen(item.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px',
            flex: 1,
          }}>
            {item.id === 'meander' ? (
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: isActive ? t.green : t.surfAlt,
                border: `2px solid ${isActive ? t.green : t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: -16, boxShadow: isActive ? `0 2px 12px ${t.green}44` : 'none',
                transition: 'all 0.2s',
              }}>
                <Icon name={item.icon} size={18} color={isActive ? '#fff' : t.muted} />
              </div>
            ) : (
              <Icon name={item.icon} size={20} color={isActive ? t.green : t.muted} />
            )}
            <span style={{
              fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: isActive ? t.green : t.muted,
            }}>
              <span>{item.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const t = isDark ? THEMES.dark : THEMES.light;

  const screens = {
    home: HomeScreen,
    meander: MeanderScreen,
    atlas: AtlasScreen,
    quests: QuestsScreen,
    journal: JournalScreen,
  };

  const ActiveScreen = screens[activeScreen];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        textarea::placeholder { color: #5E5C58; font-style: italic; }
      `}</style>

      <div style={{
        width: 375, height: 812,
        background: t.bg, borderRadius: 44,
        overflow: 'hidden', position: 'relative',
        boxShadow: isDark ? '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)' : '0 30px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
        fontFamily: '"Lora", Georgia, serif',
        display: 'flex', flexDirection: 'column',
        color: t.text,
      }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <ActiveScreen t={t} setActiveScreen={setActiveScreen} isDark={isDark} setIsDark={setIsDark} />
        </div>
        <BottomNav t={t} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
}
