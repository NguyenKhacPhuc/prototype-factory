const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [recordingState, setRecordingState] = useState('idle');
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [waveHeights, setWaveHeights] = useState([12, 20, 35, 18, 42, 28, 15, 38, 22, 45, 30, 17, 40, 25, 13]);
  const animRef = useRef(null);

  const MapPin = window.lucide.MapPin;
  const Compass = window.lucide.Compass;
  const Plus = window.lucide.Plus;
  const Wind = window.lucide.Wind;
  const User = window.lucide.User;
  const Moon = window.lucide.Moon;
  const Sun = window.lucide.Sun;
  const Sparkles = window.lucide.Sparkles;
  const Droplets = window.lucide.Droplets;
  const TreePine = window.lucide.TreePine;
  const Building2 = window.lucide.Building2;
  const Waves = window.lucide.Waves;
  const Search = window.lucide.Search;
  const Mic = window.lucide.Mic;
  const MicOff = window.lucide.MicOff;
  const ChevronRight = window.lucide.ChevronRight;
  const Lock = window.lucide.Lock;
  const Check = window.lucide.Check;
  const Star = window.lucide.Star;

  const theme = {
    bg: darkMode ? '#0F0D0A' : '#FFF3E0',
    surface: darkMode ? '#1A1510' : '#FFFFFF',
    surfaceAlt: darkMode ? '#221C14' : '#FFF8F0',
    text: darkMode ? '#FFE0B2' : '#283593',
    textLight: darkMode ? '#FFCC80' : '#5C6BC0',
    textMuted: darkMode ? '#A07040' : '#9FA8DA',
    primary: '#FF6D00',
    border: darkMode ? '#3A2A15' : '#FFE0B2',
    cardShadow: darkMode ? '0 2px 12px rgba(0,0,0,0.4)' : '0 2px 12px rgba(40,53,147,0.08)',
  };

  const typeSystem = {
    sacred: { color: '#FF8F00', icon: Sparkles, label: 'Sacred' },
    water: { color: '#1565C0', icon: Droplets, label: 'Water' },
    forest: { color: '#2E7D32', icon: TreePine, label: 'Forest' },
    urban: { color: '#5D4037', icon: Building2, label: 'Urban' },
    coastal: { color: '#0277BD', icon: Waves, label: 'Coastal' },
  };

  const font = "'Crimson Pro', Georgia, serif";

  useEffect(() => {
    if (recordingState === 'recording') {
      animRef.current = setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.random() * 40 + 8));
      }, 120);
    } else {
      clearInterval(animRef.current);
      setWaveHeights([12, 20, 35, 18, 42, 28, 15, 38, 22, 45, 30, 17, 40, 25, 13]);
    }
    return () => clearInterval(animRef.current);
  }, [recordingState]);

  const stillpoints = [
    { id: 1, x: 80, y: 70, name: 'Lotus Garden', type: 'sacred', city: 'Kyoto', locked: false },
    { id: 2, x: 160, y: 110, name: 'Harbor Silence', type: 'water', city: 'Osaka', locked: false },
    { id: 3, x: 230, y: 60, name: 'Cedar Grove', type: 'forest', city: 'Nara', locked: false },
    { id: 4, x: 290, y: 150, name: 'Market Pause', type: 'urban', city: 'Kyoto', locked: false },
    { id: 5, x: 120, y: 175, name: 'Tide Pool Quiet', type: 'coastal', city: 'Kobe', locked: true },
    { id: 6, x: 260, y: 200, name: 'Bamboo Hush', type: 'forest', city: 'Nara', locked: true },
  ];

  const recentAdditions = [
    { type: 'water', name: 'Riverside Moss Stone', user: '@minori_k', city: 'Osaka', time: '2h ago' },
    { type: 'sacred', name: 'Temple Bell Alcove', user: '@yuzu_wander', city: 'Kyoto', time: '5h ago' },
    { type: 'forest', name: 'Pine Needle Path', user: '@taro_still', city: 'Nara', time: '9h ago' },
  ];

  const timelineEntries = [
    { id: 1, name: 'Riverside Moss Stone', time: '08:14', type: 'water', city: 'Osaka', user: '@minori_k', lane: 'main', group: 'Today' },
    { id: 2, name: 'Temple Bell Alcove', time: '06:30', type: 'sacred', city: 'Kyoto', user: '@yuzu_wander', lane: 'side', group: 'Today' },
    { id: 3, name: 'Fog Pier End', time: '05:55', type: 'coastal', city: 'Kobe', user: '@hana_coast', lane: 'far', group: 'Today' },
    { id: 4, name: 'Bamboo Market Corner', time: '14:22', type: 'urban', city: 'Kyoto', user: '@taro_still', lane: 'main', group: 'Yesterday' },
    { id: 5, name: 'Cedar Root Hollow', time: '07:45', type: 'forest', city: 'Nara', user: '@ren_forest', lane: 'side', group: 'Yesterday' },
    { id: 6, name: 'Stone Lantern Path', time: '18:30', type: 'sacred', city: 'Kyoto', user: '@suki_light', lane: 'far', group: '2 days ago' },
    { id: 7, name: 'Tide Watch Rock', time: '05:15', type: 'coastal', city: 'Kobe', user: '@hana_coast', lane: 'main', group: '2 days ago' },
  ];

  const filters = ['All', 'Sacred', 'Water', 'Forest', 'Urban', 'Coastal'];

  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f0f0f0',
      padding: '20px',
      fontFamily: font,
    },
    phone: {
      width: 375,
      height: 812,
      borderRadius: 40,
      boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
      background: theme.bg,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: font,
    },
    screen: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: 80,
    },
    header: {
      padding: '52px 20px 16px',
      background: theme.bg,
      borderBottom: `1px solid ${theme.border}`,
    },
    navBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 72,
      background: theme.surface,
      borderTop: `1px solid ${theme.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 8,
      zIndex: 100,
    },
    navBtn: (active) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '6px 12px',
      color: active ? theme.primary : theme.textMuted,
      fontFamily: font,
      fontSize: 10,
      fontWeight: active ? 700 : 400,
    }),
    captureBtn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transform: 'translateY(-12px)',
      fontFamily: font,
      fontSize: 10,
      fontWeight: activeScreen === 'capture' ? 700 : 400,
      color: theme.primary,
    },
    captureBubble: {
      width: 52,
      height: 52,
      borderRadius: 26,
      background: theme.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(255,109,0,0.45)',
    },
    card: {
      background: theme.surface,
      borderRadius: 16,
      padding: 16,
      margin: '12px 16px',
      boxShadow: theme.cardShadow,
      border: `1px solid ${theme.border}`,
    },
    badge: (type) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      background: typeSystem[type].color + '22',
      color: typeSystem[type].color,
      fontFamily: font,
    }),
    chip: (active) => ({
      padding: '6px 14px',
      borderRadius: 20,
      border: `1px solid ${active ? theme.primary : theme.border}`,
      background: active ? theme.primary + '18' : theme.surface,
      color: active ? theme.primary : theme.textLight,
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: font,
    }),
  };

  function HomeScreen() {
    return (
      <div style={{ background: theme.bg }}>
        <div style={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: theme.text, fontFamily: font, lineHeight: 1.1 }}>Stillpoint Atlas</div>
              <div style={{ fontSize: 14, color: theme.textLight, fontFamily: font, marginTop: 2 }}>Kyoto, Japan · Spring 2026</div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: theme.text }}
            >
              {darkMode ? <Sun size={15} color={theme.primary} /> : <Moon size={15} color={theme.text} />}
              <span style={{ fontSize: 12, fontFamily: font, color: theme.text }}>{darkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>

        {/* SVG Map */}
        <div style={{ margin: '12px 16px', borderRadius: 20, overflow: 'hidden', border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow, position: 'relative' }}>
          <svg viewBox="0 0 343 220" width="100%" style={{ display: 'block', background: darkMode ? '#1A1510' : '#FFF8F0' }}>
            {/* Water area */}
            <path d="M0 160 Q80 145 130 155 Q170 165 220 150 Q270 135 343 148 L343 220 L0 220 Z" fill={darkMode ? '#0D2440' : '#BBDEFB'} opacity="0.5" />
            <path d="M0 170 Q60 158 120 163 Q180 168 240 155 Q290 144 343 158 L343 220 L0 220 Z" fill={darkMode ? '#0A1F35' : '#90CAF9'} opacity="0.4" />

            {/* Grid lines */}
            {[40, 80, 120, 160, 200, 240, 280, 320].map(x => (
              <line key={x} x1={x} y1={0} x2={x} y2={150} stroke={darkMode ? '#3A2A15' : '#FFE0B2'} strokeWidth="0.5" />
            ))}
            {[30, 60, 90, 120].map(y => (
              <line key={y} x1={0} y1={y} x2={343} y2={y} stroke={darkMode ? '#3A2A15' : '#FFE0B2'} strokeWidth="0.5" />
            ))}

            {/* City blocks */}
            {[
              [20, 10, 50, 25], [78, 8, 38, 22], [130, 5, 55, 28], [195, 12, 42, 20], [248, 6, 60, 30], [315, 10, 25, 18],
              [15, 50, 45, 30], [70, 45, 65, 35], [148, 48, 48, 28], [210, 42, 58, 32], [280, 50, 50, 25],
              [20, 95, 55, 30], [88, 92, 42, 28], [145, 98, 52, 25], [212, 88, 45, 32], [270, 92, 60, 28],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx={3} fill={darkMode ? '#2A1F0F' : '#FFE0B2'} stroke={darkMode ? '#3A2A18' : '#FFCC80'} strokeWidth="0.8" />
            ))}

            {/* Fog of war over locked areas */}
            <defs>
              <radialGradient id="fog1" cx="50%" cy="50%">
                <stop offset="0%" stopColor={darkMode ? '#0F0D0A' : '#FFF3E0'} stopOpacity="0" />
                <stop offset="70%" stopColor={darkMode ? '#0F0D0A' : '#FFF3E0'} stopOpacity="0.6" />
                <stop offset="100%" stopColor={darkMode ? '#0F0D0A' : '#FFF3E0'} stopOpacity="0.9" />
              </radialGradient>
              <radialGradient id="fog2" cx="50%" cy="50%">
                <stop offset="0%" stopColor={darkMode ? '#0F0D0A' : '#FFF3E0'} stopOpacity="0" />
                <stop offset="65%" stopColor={darkMode ? '#0F0D0A' : '#FFF3E0'} stopOpacity="0.5" />
                <stop offset="100%" stopColor={darkMode ? '#0F0D0A' : '#FFF3E0'} stopOpacity="0.85" />
              </radialGradient>
            </defs>
            <circle cx="120" cy="175" r="48" fill="url(#fog1)" />
            <circle cx="260" cy="200" r="44" fill="url(#fog2)" />

            {/* Stillpoints */}
            {stillpoints.map(sp => {
              const tc = typeSystem[sp.type];
              const isSelected = selectedSpot && selectedSpot.id === sp.id;
              return (
                <g key={sp.id} onClick={() => setSelectedSpot(isSelected ? null : sp)} style={{ cursor: 'pointer' }}>
                  {!sp.locked && (
                    <>
                      <circle cx={sp.x} cy={sp.y} r={14} fill={tc.color} opacity="0.12" />
                      <circle cx={sp.x} cy={sp.y} r={10} fill={tc.color} opacity="0.18" />
                    </>
                  )}
                  <circle
                    cx={sp.x} cy={sp.y} r={7}
                    fill={sp.locked ? 'none' : tc.color}
                    stroke={sp.locked ? tc.color : 'white'}
                    strokeWidth={sp.locked ? 1.5 : 2}
                    strokeDasharray={sp.locked ? '3 2' : 'none'}
                    opacity={sp.locked ? 0.5 : 1}
                  />
                  {sp.locked && <circle cx={sp.x} cy={sp.y} r={3} fill={tc.color} opacity="0.4" />}
                  {isSelected && <circle cx={sp.x} cy={sp.y} r={11} fill="none" stroke={tc.color} strokeWidth={2} opacity={0.9} />}
                </g>
              );
            })}
          </svg>

          {/* Tooltip overlay */}
          {selectedSpot && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: darkMode ? 'rgba(26,21,16,0.97)' : 'rgba(255,255,255,0.97)',
              borderTop: `2px solid ${typeSystem[selectedSpot.type].color}`,
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: theme.text, fontFamily: font }}>{selectedSpot.name}</div>
                <div style={{ fontSize: 12, color: theme.textLight, fontFamily: font, marginTop: 2 }}>{selectedSpot.city} · {selectedSpot.locked ? 'Locked — unlock collectively' : 'Open stillpoint'}</div>
              </div>
              <span style={styles.badge(selectedSpot.type)}>{typeSystem[selectedSpot.type].label}</span>
            </div>
          )}
        </div>

        {/* Community Unlock Progress */}
        <div style={{ ...styles.card, margin: '8px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.text, fontFamily: font }}>Community Unlock</span>
            <span style={{ fontSize: 13, color: theme.primary, fontFamily: font, fontWeight: 600 }}>72%</span>
          </div>
          <div style={{ background: theme.border, borderRadius: 6, height: 8, overflow: 'hidden' }}>
            <div style={{ width: '72%', height: '100%', background: `linear-gradient(90deg, ${theme.primary}, #FF8F00)`, borderRadius: 6 }} />
          </div>
          <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: font, marginTop: 6 }}>28 more visits to unlock Tide Pool Quiet together</div>
        </div>

        {/* Recent Additions */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: theme.text, fontFamily: font }}>Recent Additions</span>
            <button onClick={() => setActiveScreen('explore')} style={{ background: 'none', border: 'none', color: theme.primary, fontSize: 13, cursor: 'pointer', fontFamily: font, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              See timeline <ChevronRight size={13} />
            </button>
          </div>
          {recentAdditions.map((item, i) => {
            const tc = typeSystem[item.type];
            const Icon = tc.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${theme.border}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: tc.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={tc.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: font }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: font }}>{item.user} · {item.city}</div>
                </div>
                <span style={{ fontSize: 11, color: theme.textMuted, fontFamily: font }}>{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function ExploreScreen() {
    const [search, setSearch] = useState('');
    const filtered = timelineEntries.filter(e =>
      (activeFilter === 'All' || e.type === activeFilter.toLowerCase()) &&
      (search === '' || e.name.toLowerCase().includes(search.toLowerCase()))
    );
    const groups = ['Today', 'Yesterday', '2 days ago'];

    const laneIndent = { main: 0, side: 28, far: 52 };

    return (
      <div style={{ background: theme.bg }}>
        <div style={styles.header}>
          <div style={{ fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: font }}>Explore Stillpoints</div>
          <div style={{ fontSize: 13, color: theme.textLight, fontFamily: font, marginTop: 2 }}>Discover what the community has found</div>
        </div>

        <div style={{ padding: '12px 16px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: theme.surface, borderRadius: 12, padding: '10px 14px', border: `1px solid ${theme.border}` }}>
            <Search size={16} color={theme.textMuted} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search stillpoints..."
              style={{ border: 'none', background: 'none', outline: 'none', flex: 1, fontSize: 14, color: theme.text, fontFamily: font }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '8px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={styles.chip(activeFilter === f)}>{f}</button>
          ))}
        </div>

        {/* Branching Timeline */}
        <div style={{ padding: '8px 16px 16px', position: 'relative' }}>
          {groups.map(group => {
            const items = filtered.filter(e => e.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 16, marginBottom: 8, paddingLeft: 36 }}>{group}</div>
                <div style={{ position: 'relative' }}>
                  {/* Trunk line */}
                  <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${theme.primary}60, ${theme.border})`, borderRadius: 2 }} />
                  {items.map((entry, i) => {
                    const tc = typeSystem[entry.type];
                    const Icon = tc.icon;
                    const indent = laneIndent[entry.lane];
                    return (
                      <div key={entry.id} style={{ position: 'relative', marginBottom: 12 }}>
                        {/* Horizontal connector for side/far lanes */}
                        {entry.lane !== 'main' && (
                          <div style={{ position: 'absolute', left: 16, top: 18, width: indent, height: 2, background: tc.color + '60', borderRadius: 1 }} />
                        )}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingLeft: indent }}>
                          {/* Node dot */}
                          <div style={{ width: 20, height: 20, borderRadius: 10, background: theme.surface, border: `2.5px solid ${tc.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 8, zIndex: 2, position: 'relative', boxShadow: `0 0 0 4px ${tc.color}18` }}>
                            <div style={{ width: 6, height: 6, borderRadius: 3, background: tc.color }} />
                          </div>
                          {/* Card */}
                          <div style={{ flex: 1, background: theme.surface, borderRadius: 12, padding: '10px 12px', border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, fontFamily: font, flex: 1, marginRight: 8 }}>{entry.name}</div>
                              <span style={styles.badge(entry.type)}><Icon size={10} />{tc.label}</span>
                            </div>
                            <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: font, marginTop: 4 }}>{entry.city} · {entry.user} · {entry.time}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function CaptureScreen() {
    const steps = ['Where', 'See', 'Hear', 'Feel', 'Share'];
    const currentStep = 3;

    const toggleSound = (s) => {
      setSelectedSounds(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    };

    return (
      <div style={{ background: theme.bg }}>
        <div style={styles.header}>
          <div style={{ fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: font }}>Capture a Stillpoint</div>
          <div style={{ fontSize: 13, color: theme.textLight, fontFamily: font, marginTop: 2 }}>Step {currentStep} of {steps.length}</div>
        </div>

        {/* Step progress */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14,
                  background: i + 1 < currentStep ? theme.primary : i + 1 === currentStep ? theme.primary : theme.border,
                  color: i + 1 <= currentStep ? 'white' : theme.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, fontFamily: font,
                }}>
                  {i + 1 < currentStep ? <Check size={13} /> : i + 1}
                </div>
                <span style={{ fontSize: 9, color: i + 1 === currentStep ? theme.primary : theme.textMuted, fontFamily: font, fontWeight: i + 1 === currentStep ? 700 : 400 }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i + 1 < currentStep ? theme.primary : theme.border, margin: '0 2px', marginBottom: 16 }} />
              )}
            </div>
          ))}
        </div>

        {/* Previous answers */}
        <div style={{ padding: '0 16px', display: 'flex', gap: 10, marginBottom: 4 }}>
          <div style={{ flex: 1, background: theme.surface, borderRadius: 12, padding: '10px 12px', border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 }}>Where</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, fontFamily: font, marginTop: 3 }}>Kamo River Bank, Kyoto</div>
          </div>
          <div style={{ flex: 1, background: theme.surface, borderRadius: 12, padding: '10px 12px', border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 }}>See</div>
            <div style={{ width: '100%', height: 36, background: `linear-gradient(135deg, ${theme.border} 0%, #BBDEFB 100%)`, borderRadius: 6, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 9, color: theme.textMuted, fontFamily: font }}>photo captured</span>
            </div>
          </div>
        </div>

        {/* Current sensory card */}
        <div style={{ margin: '8px 16px', background: `linear-gradient(135deg, ${theme.primary}18 0%, #1565C020 100%)`, borderRadius: 20, padding: '20px 16px', border: `1.5px solid ${theme.primary}40`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: 40, background: theme.primary + '18' }} />
          <div style={{ position: 'absolute', bottom: -12, left: -12, width: 60, height: 60, borderRadius: 30, background: '#1565C015' }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.primary, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Step 3 · Hear</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: font, lineHeight: 1.2, marginBottom: 8 }}>What do you hear?</div>
          <div style={{ fontSize: 14, color: theme.textLight, fontFamily: font }}>Close your eyes. Let the sounds come to you without labeling them.</div>
        </div>

        {/* Waveform visualization */}
        <div style={{ margin: '0 16px', background: theme.surface, borderRadius: 16, padding: '14px 12px', border: `1px solid ${theme.border}` }}>
          <svg width="100%" height="60" viewBox="0 0 310 60">
            {waveHeights.map((h, i) => (
              <rect
                key={i}
                x={i * 21 + 4}
                y={(60 - h) / 2}
                width={13}
                height={h}
                rx={6}
                fill={recordingState === 'recording' ? theme.primary : theme.border}
                style={{ transition: 'height 0.1s ease, y 0.1s ease' }}
              />
            ))}
          </svg>
          {/* Record button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <button
              onClick={() => setRecordingState(prev => prev === 'recording' ? 'stopped' : 'recording')}
              style={{
                width: 64, height: 64, borderRadius: 32,
                background: recordingState === 'recording' ? '#D32F2F' : theme.primary,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: recordingState === 'recording' ? '0 4px 20px rgba(211,47,47,0.4)' : `0 4px 20px ${theme.primary}50`,
              }}
            >
              {recordingState === 'recording' ? <MicOff size={26} color="white" /> : <Mic size={26} color="white" />}
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 11, color: theme.textMuted, fontFamily: font, marginTop: 6 }}>
            {recordingState === 'recording' ? 'Recording... tap to stop' : recordingState === 'stopped' ? '0:08 recorded' : 'Tap to record ambient sound'}
          </div>
        </div>

        {/* Sound tags */}
        <div style={{ padding: '10px 16px' }}>
          <div style={{ fontSize: 13, color: theme.textLight, fontFamily: font, marginBottom: 8 }}>Or tag what you hear:</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Wind', 'Water', 'Birds', 'Silence', 'People'].map(s => (
              <button key={s} onClick={() => toggleSound(s)} style={{ ...styles.chip(selectedSounds.includes(s)), fontSize: 13 }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <div style={{ padding: '8px 16px 16px' }}>
          <button style={{ width: '100%', padding: '14px 0', background: theme.primary, border: 'none', borderRadius: 14, color: 'white', fontSize: 16, fontWeight: 700, fontFamily: font, cursor: 'pointer', boxShadow: `0 4px 16px ${theme.primary}40` }}>
            Next: How do you feel?
          </button>
        </div>
      </div>
    );
  }

  function JourneysScreen() {
    const journeySteps = [
      { id: 1, label: 'Arrive & Ground', status: 'done', lane: 'main', fork: false },
      { id: 2, label: 'Sensory Awakening', status: 'done', lane: 'main', fork: true },
      { id: 3, label: 'Sound Immersion', status: 'active', lane: 'main', branch: 'Sound Path', branchActive: true },
      { id: 4, label: 'Vision Softening', status: 'dim', lane: 'side', branch: 'Vision Path', branchActive: false },
      { id: 5, label: 'Moment Capture', status: 'upcoming', lane: 'main', merge: true },
      { id: 6, label: 'Reflect & Release', status: 'upcoming', lane: 'main', fork: true },
    ];

    const journeyCards = [
      { title: 'Forest Bathing', desc: 'A slow immersion in cedar silence', duration: '45 min', steps: 6, locked: false, type: 'forest' },
      { title: 'Urban Quiet', desc: 'Find stillness between the city\'s breaths', duration: '30 min', steps: 5, locked: true, type: 'urban' },
      { title: 'Waterside Dawn', desc: 'Greet the morning at the river\'s edge', duration: '60 min', steps: 7, locked: true, type: 'water' },
    ];

    return (
      <div style={{ background: theme.bg }}>
        <div style={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: font }}>Journeys</div>
            <div style={{ background: theme.primary + '20', border: `1px solid ${theme.primary}50`, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: theme.primary, fontFamily: font }}>Active: Riverside Reflection</div>
          </div>
        </div>

        {/* Current journey card */}
        <div style={{ margin: '12px 16px', background: `linear-gradient(135deg, ${theme.primary}22, #1565C018)`, borderRadius: 20, padding: 16, border: `1.5px solid ${theme.primary}40` }}>
          <div style={{ fontSize: 11, color: theme.primary, fontFamily: font, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Current Journey</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: theme.text, fontFamily: font }}>Riverside Reflection</div>
          <div style={{ fontSize: 13, color: theme.textLight, fontFamily: font, marginTop: 3 }}>Step 3 of 6 · Sound Immersion phase active</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <div style={{ flex: 1, height: 6, background: theme.border, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: theme.primary, borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: theme.primary, fontFamily: font }}>40%</span>
          </div>
          <div style={{ fontSize: 12, color: theme.textLight, fontFamily: font, marginTop: 8 }}>Next: Capture a sound moment along the river bank</div>
        </div>

        {/* Journey phase timeline with branching */}
        <div style={{ padding: '4px 16px 8px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: font, marginBottom: 12 }}>Journey Path</div>
          <div style={{ position: 'relative', paddingLeft: 4 }}>
            {/* Trunk vertical line */}
            <div style={{ position: 'absolute', left: 19, top: 12, bottom: 12, width: 2, background: `linear-gradient(to bottom, ${theme.primary}, ${theme.border})`, borderRadius: 2 }} />

            {journeySteps.map((step, i) => {
              const isDone = step.status === 'done';
              const isActive = step.status === 'active';
              const isDim = step.status === 'dim';
              const dotColor = isDone ? theme.primary : isActive ? theme.primary : isDim ? typeSystem.forest.color + '60' : theme.border;
              const textColor = isDim ? theme.textMuted : theme.text;
              const indent = isDim ? 36 : 0;

              return (
                <div key={step.id}>
                  {/* Fork label at step 2 */}
                  {step.fork && i === 1 && (
                    <div style={{ display: 'flex', gap: 6, marginLeft: 36, marginBottom: 4, marginTop: -4 }}>
                      <div style={{ fontSize: 10, background: theme.primary + '20', color: theme.primary, borderRadius: 10, padding: '2px 8px', fontFamily: font, fontWeight: 600 }}>Sound Path</div>
                      <div style={{ fontSize: 10, background: theme.border, color: theme.textMuted, borderRadius: 10, padding: '2px 8px', fontFamily: font }}>Vision Path</div>
                    </div>
                  )}
                  {/* Fork label at step 6 */}
                  {step.fork && i === 5 && (
                    <div style={{ display: 'flex', gap: 6, marginLeft: 36, marginTop: 2, marginBottom: 4 }}>
                      <div style={{ fontSize: 10, background: theme.primary + '20', color: theme.primary, borderRadius: 10, padding: '2px 8px', fontFamily: font, fontWeight: 600 }}>Share</div>
                      <div style={{ fontSize: 10, background: theme.border, color: theme.textMuted, borderRadius: 10, padding: '2px 8px', fontFamily: font }}>Keep Private</div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, paddingLeft: indent, position: 'relative' }}>
                    {/* Horizontal connector for dim/side branch */}
                    {isDim && (
                      <div style={{ position: 'absolute', left: 20, top: '50%', width: indent, height: 2, background: typeSystem.forest.color + '40', borderRadius: 1, transform: 'translateY(-50%)' }} />
                    )}
                    {/* Node */}
                    <div style={{
                      width: 22, height: 22, borderRadius: 11,
                      background: isDone ? theme.primary : isActive ? 'white' : theme.surface,
                      border: `2.5px solid ${isDone ? theme.primary : isActive ? theme.primary : isDim ? theme.border : theme.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, zIndex: 2, position: 'relative',
                      boxShadow: isActive ? `0 0 0 5px ${theme.primary}25` : 'none',
                    }}>
                      {isDone && <Check size={11} color="white" />}
                      {isActive && <div style={{ width: 8, height: 8, borderRadius: 4, background: theme.primary }} />}
                    </div>
                    {/* Label */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: isActive ? 700 : isDone ? 600 : 400, color: isDim ? theme.textMuted : textColor, fontFamily: font }}>
                        {step.label}
                        {isDone && <span style={{ fontSize: 11, color: theme.primary, marginLeft: 6, fontFamily: font }}>✓ complete</span>}
                        {isActive && <span style={{ fontSize: 11, color: theme.primary, marginLeft: 6, fontFamily: font }}>· active now</span>}
                      </div>
                      {step.branch && (
                        <div style={{ fontSize: 11, color: step.branchActive ? theme.primary : theme.textMuted, fontFamily: font }}>{step.branch}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Curated journey cards */}
        <div style={{ padding: '4px 16px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: font, marginBottom: 10 }}>Curated Journeys</div>
          {journeyCards.map((j, i) => {
            const tc = typeSystem[j.type];
            return (
              <div key={i} style={{ ...styles.card, margin: '0 0 10px', opacity: j.locked ? 0.65 : 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: tc.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {j.locked ? <Lock size={18} color={tc.color} /> : React.createElement(tc.icon, { size: 20, color: tc.color })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: font }}>{j.title}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: font, marginTop: 2 }}>{j.desc}</div>
                  <div style={{ fontSize: 11, color: theme.textLight, fontFamily: font, marginTop: 4 }}>{j.duration} · {j.steps} steps</div>
                </div>
                {j.locked && <Lock size={16} color={theme.textMuted} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function ProfileScreen() {
    const contributions = [
      { name: 'Kamo River Moss Stone', type: 'water', date: 'Apr 3, 2026' },
      { name: 'Temple Bell Alcove', type: 'sacred', date: 'Mar 28, 2026' },
      { name: 'Bamboo Market Corner', type: 'urban', date: 'Mar 21, 2026' },
    ];

    const achievements = [
      { label: 'First Stillpoint', desc: 'Found your first place of quiet', locked: false, icon: '✦' },
      { label: 'Dawn Seeker', desc: 'Visited 5 dawn stillpoints', locked: false, icon: '☀' },
      { label: 'Forest Wanderer', desc: 'Explored 3 forest sanctuaries', locked: false, icon: '⌘' },
      { label: 'Collective Keeper', desc: 'Unlock 2 community spots', locked: true, icon: '◈' },
      { label: 'Atlas Cartographer', desc: 'Contribute 15 stillpoints', locked: true, icon: '◎' },
    ];

    const aiSuggestions = [
      { name: 'Arashiyama Moss Path', type: 'forest', city: 'Kyoto', match: '96%' },
      { name: 'Fushimi Dawn Gate', type: 'sacred', city: 'Kyoto', match: '91%' },
    ];

    return (
      <div style={{ background: theme.bg }}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: `linear-gradient(135deg, ${theme.primary}, #FF8F00)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'white', fontFamily: font }}>Yu</span>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: theme.text, fontFamily: font }}>Yuki Tanaka</div>
              <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: font }}>Member since January 2026 · Kyoto</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 16px' }}>
          {[['23', 'Stillpoints'], ['8', 'Contributed'], ['3', 'Journeys'], ['142', 'Collective Score']].map(([val, label]) => (
            <div key={label} style={{ flex: 1, background: theme.surface, borderRadius: 12, padding: '10px 6px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: theme.primary, fontFamily: font }}>{val}</div>
              <div style={{ fontSize: 9, color: theme.textMuted, fontFamily: font, lineHeight: 1.2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* AI Agent card */}
        <div style={{ margin: '0 16px 12px', background: darkMode ? '#221C14' : '#FFF8F0', borderRadius: 18, padding: 16, border: `1.5px solid ${theme.primary}40` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, fontFamily: font }}>Serene Spot Agent</div>
              <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: font }}>Your personal stillness guide</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: theme.textLight, fontFamily: font, lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>
            "Based on your affinity for dawn stillpoints and forest sounds, I've found 3 nearby matches for your next quiet moment..."
          </div>
          {aiSuggestions.map((s, i) => {
            const tc = typeSystem[s.type];
            const Icon = tc.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${theme.border}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: tc.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color={tc.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, fontFamily: font }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: font }}>{s.city}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme.primary, fontFamily: font }}>{s.match}</div>
              </div>
            );
          })}
        </div>

        {/* Recent contributions */}
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: font, marginBottom: 10 }}>My Contributions</div>
          {contributions.map((c, i) => {
            const tc = typeSystem[c.type];
            const Icon = tc.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${theme.border}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: tc.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={tc.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: font }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: font }}>{c.date}</div>
                </div>
                <span style={styles.badge(c.type)}>{tc.label}</span>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div style={{ padding: '0 16px 20px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: font, marginBottom: 10 }}>Achievements</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {achievements.map((a, i) => (
              <div key={i} style={{ width: 'calc(33.33% - 7px)', background: a.locked ? theme.surface : `linear-gradient(135deg, ${theme.primary}18, #FF8F0012)`, border: `1.5px solid ${a.locked ? theme.border : theme.primary + '50'}`, borderRadius: 14, padding: '10px 8px', textAlign: 'center', opacity: a.locked ? 0.55 : 1 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{a.locked ? '🔒' : a.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: a.locked ? theme.textMuted : theme.text, fontFamily: font, lineHeight: 1.3 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const screens = {
    home: <HomeScreen />,
    explore: <ExploreScreen />,
    capture: <CaptureScreen />,
    journeys: <JourneysScreen />,
    profile: <ProfileScreen />,
  };

  const navItems = [
    { id: 'home', label: 'Map', icon: MapPin },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'capture', label: 'Capture', icon: Plus, special: true },
    { id: 'journeys', label: 'Journeys', icon: Wind },
    { id: 'profile', label: 'Me', icon: User },
  ];

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={styles.phone}>
        <div style={styles.screen}>
          {screens[activeScreen]}
        </div>
        <div style={styles.navBar}>
          {navItems.map(item => {
            if (item.special) {
              return (
                <button key={item.id} onClick={() => setActiveScreen(item.id)} style={styles.captureBtn}>
                  <div style={styles.captureBubble}>
                    <item.icon size={24} color="white" />
                  </div>
                  <span style={{ fontSize: 10, fontFamily: font, color: activeScreen === 'capture' ? theme.primary : theme.textMuted }}>{item.label}</span>
                </button>
              );
            }
            return (
              <button key={item.id} onClick={() => setActiveScreen(item.id)} style={styles.navBtn(activeScreen === item.id)}>
                <item.icon size={22} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
