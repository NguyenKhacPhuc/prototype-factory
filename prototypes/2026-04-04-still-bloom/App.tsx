const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeRitual, setActiveRitual] = useState(null);
  const [ritualSeconds, setRitualSeconds] = useState(0);
  const [ritualComplete, setRitualComplete] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [votedOption, setVotedOption] = useState(null);

  const themes = {
    dark: {
      bg: '#0C160D',
      surface: '#142016',
      surface2: '#1B2D1D',
      text: '#F0EBE0',
      textMuted: '#8A8E80',
      textDim: '#4E5848',
      primary: '#5A8A5E',
      primaryLight: '#7AAD7E',
      secondary: '#C8A882',
      accent: '#7BA3B8',
      border: '#243626',
      navBg: '#0C160D',
      tag: '#1B2D1D',
      tagText: '#6B9E6F',
    },
    light: {
      bg: '#F5F0E8',
      surface: '#FDFAF4',
      surface2: '#EDE8DC',
      text: '#2C2C2C',
      textMuted: '#6B6558',
      textDim: '#ABA598',
      primary: '#3D5A3E',
      primaryLight: '#5A7A5C',
      secondary: '#A87840',
      accent: '#4A7E98',
      border: '#D8D2C6',
      navBg: '#FDFAF4',
      tag: '#DDE8D4',
      tagText: '#3D5A3E',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  const rituals = [
    {
      id: 'texture',
      title: 'Observe a Natural Texture',
      essence: 'Stone Patience',
      color: '#B8956A',
      bgDark: '#2A1E0E',
      duration: 90,
      guide: 'Find any natural surface near you — bark, stone, soil, fabric. Trace its texture slowly with your eyes, then your fingertips. Notice the quiet story each ridge and groove holds.',
      tag: 'TACTILE',
    },
    {
      id: 'listening',
      title: 'Practice Deep Listening',
      essence: 'Whispering Pine Echo',
      color: '#5A8A5E',
      bgDark: '#0E1E10',
      duration: 120,
      guide: 'Close your eyes. Peel back sound in layers — the most distant first, then middle, then nearest. Let sound dissolve the boundary between you and your surroundings.',
      tag: 'AUDITORY',
    },
    {
      id: 'horizon',
      title: 'Trace the Horizon',
      essence: 'Golden Hour Glow',
      color: '#C8A882',
      bgDark: '#1E1A0A',
      duration: 60,
      guide: 'Find the furthest sightline you can reach. Follow the horizon or the line where ceiling meets wall. Notice where distance becomes breath.',
      tag: 'VISUAL',
    },
    {
      id: 'breath',
      title: 'Root Breath',
      essence: 'Morning Dew Clarity',
      color: '#7BA3B8',
      bgDark: '#0A1820',
      duration: 180,
      guide: 'Sit comfortably, feet grounded. With each inhale, imagine roots deepening. With each exhale, branches reaching. You are the still point between earth and sky.',
      tag: 'BREATH',
    },
  ];

  const journalEntries = [
    {
      date: 'April 3',
      location: 'Kyoto, Japan',
      ritual: 'Observe a Natural Texture',
      essence: 'Moss Garden Depth',
      essenceColor: '#5A8A5E',
      reflection: 'Found a centuries-old stone wall draped in soft moss. The layers of green told a slow story — patient as tides, indifferent to the tourists passing.',
    },
    {
      date: 'April 1',
      location: 'Airport Terminal, Istanbul',
      ritual: 'Practice Deep Listening',
      essence: 'Layered Transit Hum',
      essenceColor: '#C8A882',
      reflection: 'Discovered music in the chaos — distant gate announcements, rolling luggage wheels, a child laughing three rows away. Everything in its own rhythm.',
    },
    {
      date: 'March 28',
      location: 'Coastal Path, Cornwall',
      ritual: 'Trace the Horizon',
      essence: 'Golden Hour Glow',
      essenceColor: '#C8A882',
      reflection: 'The horizon was a clean line of silver. For one long moment the ocean and sky were the same calm breath held perfectly still.',
    },
  ];

  const quests = [
    {
      id: 'riverbend',
      title: 'Cultivate the Riverbend Weave',
      description: 'Contribute Flow Essences to unlock a new river delta biome with rare moonlit water lilies and stone herons.',
      current: 342,
      target: 500,
      type: 'Flow',
      reward: 'Moonlit Lily Species',
      days: 3,
      color: '#7BA3B8',
    },
    {
      id: 'dawnchorus',
      title: 'Dawn Chorus Collection',
      description: 'Morning rituals completed before 9am cultivate the Dawn Meadow expansion for all growers.',
      current: 89,
      target: 200,
      type: 'Morning',
      reward: 'Aurora Grass Patch',
      days: 5,
      color: '#C8A882',
    },
    {
      id: 'stonesong',
      title: 'Stone Song Archive',
      description: 'Texture observation rituals collectively build the ancient stone garden path through the lower grove.',
      current: 156,
      target: 300,
      type: 'Texture',
      reward: 'Mossy Cairn Formation',
      days: 6,
      color: '#B8956A',
    },
  ];

  const globalFeed = [
    { name: 'Aiko M.', location: 'Osaka', essence: 'Cherry Blossom Drift', time: '2m ago', color: '#C8A882' },
    { name: 'Lars H.', location: 'Bergen', essence: 'Fjord Stone Echo', time: '5m ago', color: '#7BA3B8' },
    { name: 'Priya K.', location: 'Mumbai', essence: 'Monsoon Peace', time: '8m ago', color: '#5A8A5E' },
    { name: 'Sofia R.', location: 'Lisbon', essence: 'Tidal Patience', time: '12m ago', color: '#B8956A' },
  ];

  // Ritual timer
  useEffect(() => {
    let interval;
    if (activeRitual && !ritualComplete) {
      interval = setInterval(() => {
        setRitualSeconds(s => {
          if (s >= activeRitual.duration - 1) {
            setRitualComplete(true);
            return activeRitual.duration;
          }
          return s + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeRitual, ritualComplete]);

  // Breath phase
  useEffect(() => {
    if (!activeRitual || ritualComplete) return;
    const phases = ['inhale', 'hold', 'exhale', 'rest'];
    let idx = 0;
    const cycle = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setBreathPhase(phases[idx]);
    }, 4000);
    return () => clearInterval(cycle);
  }, [activeRitual, ritualComplete]);

  // ── HOME SCREEN ──────────────────────────────────────────
  function HomeScreen() {
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Lora', Georgia, serif" }}>
        {/* Header */}
        <div style={{ padding: '22px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: t.textMuted, textTransform: 'uppercase', fontFamily: "'Lora', serif" }}>
              Still Bloom
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif", lineHeight: 1.2, marginTop: 2 }}>
              World Bloom
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic', marginTop: 3 }}>
              47,234 growers tending today
            </div>
          </div>
          <button
            onClick={() => setIsDark(d => !d)}
            style={{
              background: t.surface2,
              border: `1px solid ${t.border}`,
              borderRadius: 20,
              padding: '6px 12px',
              cursor: 'pointer',
              color: t.textMuted,
              fontSize: 13,
              fontFamily: "'Lora', serif",
            }}
          >
            {isDark ? '☀' : '◑'}
          </button>
        </div>

        {/* World Bloom Canvas */}
        <div style={{ margin: '16px 22px 0', position: 'relative' }}>
          <div style={{
            borderRadius: 22,
            height: 228,
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${t.border}`,
          }}>
            <svg width="100%" height="228" viewBox="0 0 331 228" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={isDark ? '#1A3D20' : '#C0D8A0'} />
                  <stop offset="100%" stopColor={isDark ? '#040E05' : '#A8C888'} />
                </radialGradient>
                <radialGradient id="sunHalo" cx="70%" cy="18%" r="28%">
                  <stop offset="0%" stopColor="#C8A882" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#C8A882" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="groundGlow" cx="50%" cy="80%" r="60%">
                  <stop offset="0%" stopColor={isDark ? '#204826' : '#88B070'} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={isDark ? '#0A1A0C' : '#70986C'} stopOpacity="1" />
                </radialGradient>
              </defs>
              <rect width="331" height="228" fill="url(#skyGrad)" />
              <ellipse cx="232" cy="42" rx="90" ry="65" fill="url(#sunHalo)" />
              <ellipse cx="165" cy="210" rx="220" ry="65" fill="url(#groundGlow)" />

              {/* Background trees */}
              {[20, 48, 270, 300, 318].map((x, i) => {
                const h = [55, 72, 65, 48, 58][i];
                const cr = [18, 24, 22, 16, 20][i];
                return (
                  <g key={i}>
                    <rect x={x - 3} y={185 - h} width={6} height={h}
                      fill={isDark ? '#1A3D1E' : '#4A6B38'} rx="2" />
                    <ellipse cx={x} cy={185 - h} rx={cr} ry={cr * 0.7}
                      fill={isDark ? '#24542A' : '#567A40'} opacity="0.85" />
                    <ellipse cx={x - 3} cy={182 - h} rx={cr * 0.75} ry={cr * 0.55}
                      fill={isDark ? '#2E6835' : '#6A9050'} opacity="0.6" />
                  </g>
                );
              })}

              {/* Center bloom tree — focal piece */}
              <rect x="157" y="118" width="16" height="80" fill={isDark ? '#243E26' : '#4A6830'} rx="3" />
              <ellipse cx="165" cy="108" rx="54" ry="44" fill={isDark ? '#1A5020' : '#4A7830'} opacity="0.9" />
              <ellipse cx="142" cy="96" rx="34" ry="28" fill={isDark ? '#226228' : '#567C3A'} opacity="0.8" />
              <ellipse cx="190" cy="100" rx="38" ry="30" fill={isDark ? '#1E5C26' : '#50783C'} opacity="0.8" />
              <ellipse cx="165" cy="80" rx="42" ry="32" fill={isDark ? '#2E7238' : '#629648'} opacity="0.75" />
              {/* Bloom dots */}
              {[
                { cx: 148, cy: 82, c: '#E8C890' }, { cx: 163, cy: 72, c: '#F0D8A0' },
                { cx: 180, cy: 79, c: '#D4A870' }, { cx: 157, cy: 92, c: '#E8C890' },
                { cx: 176, cy: 87, c: '#F0D8A0' }, { cx: 167, cy: 98, c: '#C8B878' },
                { cx: 140, cy: 96, c: '#D4A870' }, { cx: 192, cy: 94, c: '#E8C890' },
                { cx: 154, cy: 70, c: '#F0D8A0' }, { cx: 185, cy: 70, c: '#D4A870' },
              ].map((d, i) => (
                <circle key={i} cx={d.cx} cy={d.cy} r="3.5" fill={d.c} opacity="0.88" />
              ))}

              {/* Mid-ground shrubs */}
              {[70, 100, 220, 255].map((x, i) => (
                <ellipse key={i} cx={x} cy={196} rx={[18, 14, 16, 20][i]} ry={[10, 8, 9, 11][i]}
                  fill={isDark ? '#2A5C30' : '#5A8040'} opacity="0.7" />
              ))}

              {/* Essence particles floating */}
              {[
                { x: 75, y: 60, r: 2.5, c: '#C8A882' },
                { x: 210, y: 44, r: 2, c: '#7BA3B8' },
                { x: 135, y: 48, r: 3, c: '#E8C890' },
                { x: 265, y: 68, r: 2, c: '#7BA3B8' },
                { x: 105, y: 38, r: 1.8, c: '#C8A882' },
                { x: 228, y: 56, r: 2.5, c: '#C8A882' },
                { x: 58, y: 75, r: 1.5, c: '#E8C890' },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity="0.65" />
              ))}

              {/* Ground mist */}
              <rect x="0" y="195" width="331" height="33"
                fill={isDark ? '#040E05' : '#98BC78'} opacity="0.25" />
            </svg>

            <div style={{
              position: 'absolute', bottom: 10, left: 12,
              background: isDark ? 'rgba(4,14,5,0.72)' : 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(6px)',
              borderRadius: 10, padding: '3px 10px',
              fontSize: 9, fontFamily: "'Lora', serif",
              color: t.secondary, letterSpacing: 1.5, textTransform: 'uppercase',
            }}>
              Mystic Mangrove Strand
            </div>
            <div style={{
              position: 'absolute', top: 10, right: 12,
              background: isDark ? 'rgba(4,14,5,0.72)' : 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(6px)',
              borderRadius: 10, padding: '3px 10px',
              fontSize: 9, fontFamily: "'Lora', serif",
              color: t.text, letterSpacing: 0.5,
            }}>
              2.3M fragments today
            </div>
          </div>
        </div>

        {/* Today's Ritual CTA — overlapping card */}
        <div style={{ padding: '0 22px', marginTop: -12, position: 'relative', zIndex: 2 }}>
          <div style={{
            background: t.primary,
            borderRadius: 18,
            padding: '15px 18px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.45)' : '0 10px 30px rgba(0,0,0,0.15)',
            transform: 'rotate(-0.5deg)',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, letterSpacing: 2.5, color: isDark ? '#A0C8A4' : '#C8F0CC', textTransform: 'uppercase', fontFamily: "'Lora', serif" }}>
                Today's Ritual
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F0EBE0', fontFamily: "'Lora', serif", marginTop: 3 }}>
                Observe a Natural Texture
              </div>
              <div style={{ fontSize: 11, color: isDark ? '#B8D8BC' : '#D8F0DC', fontFamily: "'Lora', serif", fontStyle: 'italic', marginTop: 2 }}>
                90 sec · yields Stone Patience
              </div>
            </div>
            <button
              onClick={() => {
                setActiveRitual(rituals[0]);
                setRitualSeconds(0);
                setRitualComplete(false);
                setActiveScreen('ritual');
              }}
              style={{
                background: isDark ? '#0C160D' : '#243A26',
                color: '#F0EBE0', border: 'none', borderRadius: 20,
                padding: '9px 16px', fontSize: 12,
                fontFamily: "'Lora', serif", cursor: 'pointer',
                whiteSpace: 'nowrap', letterSpacing: 0.3,
              }}
            >
              Begin →
            </button>
          </div>
        </div>

        {/* Live Essence Feed — overlapping pressed-flower cards */}
        <div style={{ padding: '0 22px', marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text, fontFamily: "'Lora', serif" }}>
              Live Essence Feed
            </div>
            <div style={{ fontSize: 11, color: t.secondary, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
              63 countries
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            {globalFeed.map((entry, i) => (
              <div key={i} style={{
                background: t.surface,
                borderRadius: 12, padding: '10px 14px',
                marginBottom: i < globalFeed.length - 1 ? -8 : 0,
                position: 'relative', zIndex: globalFeed.length - i,
                transform: `rotate(${[0.3, -0.4, 0.2, -0.3][i]}deg)`,
                boxShadow: isDark ? '0 3px 10px rgba(0,0,0,0.35)' : '0 3px 10px rgba(0,0,0,0.08)',
                borderLeft: `3px solid ${entry.color}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.text, fontFamily: "'Lora', serif" }}>{entry.name}</span>
                    <span style={{ fontSize: 11, color: t.textMuted, fontFamily: "'Lora', serif" }}> · {entry.location}</span>
                  </div>
                  <span style={{ fontSize: 10, color: t.textDim, fontFamily: "'Lora', serif" }}>{entry.time}</span>
                </div>
                <div style={{ fontSize: 11, color: entry.color, fontFamily: "'Lora', serif", fontStyle: 'italic', marginTop: 2 }}>
                  ✦ {entry.essence}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>
    );
  }

  // ── RITUAL SCREEN ─────────────────────────────────────────
  function RitualScreen() {
    if (activeRitual) {
      const progress = ritualSeconds / activeRitual.duration;
      const r = 52;
      const circ = 2 * Math.PI * r;
      const remaining = activeRitual.duration - ritualSeconds;
      const bgColor = isDark ? activeRitual.bgDark : '#F5F0E8';

      return (
        <div style={{
          height: '100%', background: bgColor,
          display: 'flex', flexDirection: 'column',
          padding: '20px 22px', fontFamily: "'Lora', Georgia, serif",
          overflowY: 'auto',
        }}>
          <button
            onClick={() => { setActiveRitual(null); setRitualSeconds(0); setRitualComplete(false); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: t.textMuted, fontSize: 12, fontFamily: "'Lora', serif",
              alignSelf: 'flex-start', padding: '0 0 18px', letterSpacing: 0.3,
            }}
          >
            ← Back to Rituals
          </button>

          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <div style={{
              display: 'inline-block',
              fontSize: 9, letterSpacing: 2.5,
              color: activeRitual.color,
              textTransform: 'uppercase',
              fontFamily: "'Lora', serif",
              borderBottom: `1px solid ${activeRitual.color}40`,
              paddingBottom: 4, marginBottom: 8,
            }}>
              Active Ritual · {activeRitual.tag}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif", lineHeight: 1.3 }}>
              {activeRitual.title}
            </div>
          </div>

          {/* Timer ring */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
            <div style={{ position: 'relative', width: 148, height: 148 }}>
              <svg width="148" height="148" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r={r} fill="none"
                  stroke={isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'} strokeWidth="5" />
                <circle cx="60" cy="60" r={r} fill="none"
                  stroke={ritualComplete ? '#5A8A5E' : activeRitual.color}
                  strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - progress)}
                  style={{ transition: 'stroke-dashoffset 0.9s ease' }}
                />
              </svg>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                {ritualComplete ? (
                  <div style={{ fontSize: 32, color: '#5A8A5E' }}>✦</div>
                ) : (
                  <>
                    <div style={{ fontSize: 30, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif", lineHeight: 1 }}>
                      {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontSize: 10, color: activeRitual.color,
                      fontFamily: "'Lora', serif", marginTop: 4,
                      textTransform: 'uppercase', letterSpacing: 2,
                    }}>
                      {breathPhase}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Guide quote */}
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
            borderRadius: 16, padding: '16px 18px',
            marginBottom: 18,
            borderLeft: `3px solid ${activeRitual.color}`,
          }}>
            <div style={{ fontSize: 13, color: t.text, fontFamily: "'Lora', serif", fontStyle: 'italic', lineHeight: 1.8 }}>
              "{activeRitual.guide}"
            </div>
          </div>

          {/* Completion card */}
          {ritualComplete && (
            <div style={{
              background: t.surface,
              borderRadius: 18, padding: '18px',
              textAlign: 'center',
              border: `1px solid ${t.border}`,
              transform: 'rotate(-0.4deg)',
              boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.1)',
            }}>
              <div style={{ fontSize: 9, letterSpacing: 2.5, color: activeRitual.color, textTransform: 'uppercase', fontFamily: "'Lora', serif", marginBottom: 8 }}>
                Essence Generated
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif", marginBottom: 4 }}>
                ✦ {activeRitual.essence}
              </div>
              <div style={{ fontSize: 12, color: t.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic', marginBottom: 14 }}>
                Your fragment has joined the World Bloom
              </div>
              <button
                onClick={() => {
                  setActiveRitual(null);
                  setRitualSeconds(0);
                  setRitualComplete(false);
                  setActiveScreen('home');
                }}
                style={{
                  background: t.primary, color: '#F0EBE0',
                  border: 'none', borderRadius: 20,
                  padding: '10px 26px', fontSize: 13,
                  fontFamily: "'Lora', serif", cursor: 'pointer',
                }}
              >
                Return to Bloom →
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, padding: '22px', fontFamily: "'Lora', Georgia, serif" }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: t.textMuted, textTransform: 'uppercase', fontFamily: "'Lora', serif" }}>
            Daily Practice
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif", marginTop: 2 }}>
            Choose a Ritual
          </div>
          <div style={{ fontSize: 12, color: t.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic', marginTop: 3 }}>
            Each ritual yields a unique Essence Fragment
          </div>
        </div>

        {/* Streak + fragments — overlapping stat cards */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, position: 'relative' }}>
          <div style={{
            flex: 1, background: t.surface, borderRadius: 14, padding: '12px 14px',
            transform: 'rotate(-0.4deg)',
            boxShadow: isDark ? '0 3px 12px rgba(0,0,0,0.3)' : '0 3px 12px rgba(0,0,0,0.08)',
            zIndex: 2,
          }}>
            <div style={{ fontSize: 9, color: t.textMuted, fontFamily: "'Lora', serif", letterSpacing: 1.5, textTransform: 'uppercase' }}>Streak</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.secondary, fontFamily: "'Lora', serif", lineHeight: 1.1 }}>
              14 <span style={{ fontSize: 13, fontWeight: 400 }}>days</span>
            </div>
          </div>
          <div style={{
            flex: 1, background: t.surface, borderRadius: 14, padding: '12px 14px',
            transform: 'rotate(0.4deg)',
            boxShadow: isDark ? '0 3px 12px rgba(0,0,0,0.3)' : '0 3px 12px rgba(0,0,0,0.08)',
            zIndex: 1,
          }}>
            <div style={{ fontSize: 9, color: t.textMuted, fontFamily: "'Lora', serif", letterSpacing: 1.5, textTransform: 'uppercase' }}>Fragments</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.accent, fontFamily: "'Lora', serif", lineHeight: 1.1 }}>86</div>
          </div>
        </div>

        {/* Ritual list */}
        <div style={{ position: 'relative' }}>
          {rituals.map((ritual, i) => (
            <div
              key={ritual.id}
              onClick={() => {
                setActiveRitual(ritual);
                setRitualSeconds(0);
                setRitualComplete(false);
              }}
              style={{
                background: t.surface,
                borderRadius: 16, padding: '14px 16px',
                marginBottom: 10,
                transform: `rotate(${[- 0.35, 0.3, -0.25, 0.4][i]}deg)`,
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                borderLeft: `4px solid ${ritual.color}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5,
                  }}>
                    <div style={{
                      fontSize: 9, letterSpacing: 1.5, color: ritual.color,
                      textTransform: 'uppercase', fontFamily: "'Lora', serif",
                      background: isDark ? `${ritual.color}15` : `${ritual.color}12`,
                      borderRadius: 6, padding: '2px 7px',
                    }}>
                      {ritual.tag}
                    </div>
                    <div style={{ fontSize: 10, color: t.textMuted, fontFamily: "'Lora', serif" }}>
                      {Math.floor(ritual.duration / 60)}:{String(ritual.duration % 60).padStart(2, '0')} min
                    </div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: t.text, fontFamily: "'Lora', serif" }}>
                    {ritual.title}
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic', marginTop: 4 }}>
                    ✦ Yields: {ritual.essence}
                  </div>
                </div>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: isDark ? `${ritual.color}15` : `${ritual.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: ritual.color, fontSize: 15, marginLeft: 12,
                }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    );
  }

  // ── GARDEN SCREEN ─────────────────────────────────────────
  function GardenScreen() {
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, padding: '22px', fontFamily: "'Lora', Georgia, serif" }}>
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: t.textMuted, textTransform: 'uppercase', fontFamily: "'Lora', serif" }}>
            Personal Garden
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif", marginTop: 2 }}>
            Serenity Stream
          </div>
        </div>

        {/* Stats row — overlapping at angles */}
        <div style={{ display: 'flex', gap: 7, marginTop: 14, marginBottom: 20, position: 'relative' }}>
          {[
            { label: 'Streak', value: '14d', color: t.secondary, rot: '-0.5deg' },
            { label: 'Essences', value: '86', color: t.accent, rot: '0.4deg' },
            { label: 'Biomes', value: '4', color: t.primary, rot: '-0.3deg' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, background: t.surface, borderRadius: 13, padding: '10px 8px',
              textAlign: 'center', transform: `rotate(${s.rot})`,
              boxShadow: isDark ? '0 3px 10px rgba(0,0,0,0.28)' : '0 3px 10px rgba(0,0,0,0.07)',
              zIndex: 3 - i,
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: "'Lora', serif" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: t.textMuted, fontFamily: "'Lora', serif", letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* My Contributions tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text, fontFamily: "'Lora', serif" }}>
            My Reflections
          </div>
          <div style={{ fontSize: 11, color: t.secondary, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
            Private journal
          </div>
        </div>

        {/* Journal entries — pressed flower overlap */}
        <div style={{ position: 'relative' }}>
          {journalEntries.map((entry, i) => (
            <div key={i} style={{
              background: t.surface,
              borderRadius: 18, padding: '16px',
              marginBottom: i < journalEntries.length - 1 ? -10 : 0,
              position: 'relative',
              zIndex: journalEntries.length - i,
              transform: `rotate(${[-0.6, 0.5, -0.4][i]}deg)`,
              boxShadow: isDark
                ? `0 ${4 + i * 2}px 20px rgba(0,0,0,${0.35 + i * 0.05})`
                : `0 ${4 + i * 2}px 20px rgba(0,0,0,${0.08 + i * 0.02})`,
              borderTop: `3px solid ${entry.essenceColor}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif" }}>
                    {entry.date}
                  </span>
                  <span style={{ fontSize: 11, color: t.textMuted, fontFamily: "'Lora', serif" }}>
                    {' '}· {entry.location}
                  </span>
                </div>
                <div style={{
                  fontSize: 9, color: entry.essenceColor,
                  background: isDark ? `${entry.essenceColor}18` : `${entry.essenceColor}14`,
                  borderRadius: 8, padding: '3px 8px',
                  fontFamily: "'Lora', serif", whiteSpace: 'nowrap', marginLeft: 6,
                }}>
                  ✦ {entry.essence}
                </div>
              </div>
              <div style={{
                fontSize: 9, color: t.textDim, fontFamily: "'Lora', serif",
                letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
              }}>
                {entry.ritual}
              </div>
              <div style={{ fontSize: 13, color: t.text, fontFamily: "'Lora', serif", fontStyle: 'italic', lineHeight: 1.75 }}>
                "{entry.reflection}"
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <button style={{
            background: 'none',
            border: `1px dashed ${t.border}`,
            borderRadius: 14, padding: '13px 24px',
            color: t.textMuted, fontSize: 13,
            fontFamily: "'Lora', serif", fontStyle: 'italic',
            cursor: 'pointer', width: '100%',
          }}>
            + Add a reflection after your next ritual
          </button>
        </div>

        <div style={{ height: 24 }} />
      </div>
    );
  }

  // ── QUEST SCREEN ──────────────────────────────────────────
  function QuestScreen() {
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, padding: '22px', fontFamily: "'Lora', Georgia, serif" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: t.textMuted, textTransform: 'uppercase', fontFamily: "'Lora', serif" }}>
            Collective Purpose
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text, fontFamily: "'Lora', serif", marginTop: 2 }}>
            Grove Quests
          </div>
          <div style={{ fontSize: 12, color: t.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic', marginTop: 3 }}>
            47,234 growers tending together
          </div>
        </div>

        {quests.map((quest, i) => {
          const pct = Math.round((quest.current / quest.target) * 100);
          return (
            <div key={quest.id} style={{
              background: t.surface,
              borderRadius: 18, padding: '16px',
              marginBottom: i < quests.length - 1 ? 12 : 0,
              transform: `rotate(${[-0.3, 0.35, -0.25][i]}deg)`,
              boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, color: quest.color, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'Lora', serif", marginBottom: 5 }}>
                    {quest.type} Essence · {quest.days}d remaining
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: t.text, fontFamily: "'Lora', serif" }}>
                    {quest.title}
                  </div>
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 700,
                  color: quest.color,
                  background: isDark ? `${quest.color}15` : `${quest.color}12`,
                  borderRadius: 8, padding: '3px 9px',
                  fontFamily: "'Lora', serif",
                  whiteSpace: 'nowrap', marginLeft: 10,
                }}>
                  {pct}%
                </div>
              </div>

              <div style={{ fontSize: 12, color: t.textMuted, fontFamily: "'Lora', serif", lineHeight: 1.6, marginBottom: 12 }}>
                {quest.description}
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 10 }}>
                <div style={{
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
                  borderRadius: 20, height: 5, overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${pct}%`, height: '100%',
                    background: quest.color, borderRadius: 20,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                  <div style={{ fontSize: 10, color: t.textDim, fontFamily: "'Lora', serif" }}>
                    {quest.current.toLocaleString()} contributed
                  </div>
                  <div style={{ fontSize: 10, color: t.textDim, fontFamily: "'Lora', serif" }}>
                    {quest.target.toLocaleString()} needed
                  </div>
                </div>
              </div>

              {/* Reward */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                borderRadius: 9, padding: '6px 10px',
              }}>
                <div style={{ fontSize: 10, color: t.textMuted, fontFamily: "'Lora', serif" }}>Unlocks:</div>
                <div style={{ fontSize: 10, color: t.secondary, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
                  ✦ {quest.reward}
                </div>
              </div>
            </div>
          );
        })}

        {/* Biome Architect */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text, fontFamily: "'Lora', serif" }}>
              Biome Architect
            </div>
            <div style={{ fontSize: 10, color: t.accent, fontFamily: "'Lora', serif", fontStyle: 'italic', letterSpacing: 0.5 }}>
              Level 3 · Unlocked
            </div>
          </div>

          <div style={{
            background: t.surface, borderRadius: 18, padding: '16px',
            border: `1px solid ${t.accent}35`,
            transform: 'rotate(0.3deg)',
            boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.28)' : '0 4px 16px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontSize: 9, color: t.accent, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Lora', serif", marginBottom: 8 }}>
              Design Vote — Twilight Canopy
            </div>
            <div style={{ fontSize: 13, color: t.textMuted, fontFamily: "'Lora', serif", lineHeight: 1.65, marginBottom: 14 }}>
              Vote on the aesthetic direction for the upcoming{' '}
              <span style={{ color: t.secondary, fontStyle: 'italic' }}>Twilight Canopy</span>{' '}
              section. Your voice shapes the Bloom.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Luminous & Spare', 'Dense & Wild'].map((option, i) => {
                const voted = votedOption === i;
                const pctVote = i === 0 ? (votedOption !== null ? 64 : 62) : (votedOption !== null ? 36 : 38);
                return (
                  <button
                    key={i}
                    onClick={() => setVotedOption(i)}
                    style={{
                      flex: 1,
                      background: voted ? `${t.accent}25` : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'),
                      border: `1px solid ${voted ? t.accent : t.border}`,
                      borderRadius: 12, padding: '10px 8px',
                      color: voted ? t.accent : t.textMuted,
                      fontSize: 11, fontFamily: "'Lora', serif",
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontWeight: voted ? 600 : 400 }}>{option}</div>
                    <div style={{ fontSize: 10, marginTop: 3, opacity: 0.75 }}>{pctVote}% voting</div>
                  </button>
                );
              })}
            </div>
            {votedOption !== null && (
              <div style={{ fontSize: 11, color: t.accent, fontFamily: "'Lora', serif", fontStyle: 'italic', textAlign: 'center', marginTop: 10 }}>
                ✦ Your voice has been heard
              </div>
            )}
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>
    );
  }

  const screens = { home: HomeScreen, ritual: RitualScreen, garden: GardenScreen, quest: QuestScreen };

  const navItems = [
    { id: 'home', label: 'Bloom' },
    { id: 'ritual', label: 'Ritual' },
    { id: 'garden', label: 'Garden' },
    { id: 'quest', label: 'Quests' },
  ];

  const navIcons = {
    home: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 1 0 0 14A7 7 0 0 0 12 2z" />
        <path d="M12 6v4m0 0 2 2m-2-2-2 2" />
        <path d="M8.5 19.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5" />
        <line x1="5" y1="22" x2="19" y2="22" />
      </svg>
    ),
    ritual: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="3" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="3" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="21" y2="12" />
      </svg>
    ),
    garden: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    quest: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };

  return (
    <div style={{
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; background: transparent; }
        button:active { opacity: 0.8; transform: scale(0.97); }
      `}</style>

      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 42,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: isDark
          ? '0 40px 100px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 40px 100px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Lora', Georgia, serif",
      }}>
        {/* Active screen */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {React.createElement(screens[activeScreen])}
        </div>

        {/* Bottom navigation */}
        <div style={{
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          padding: '10px 0 22px',
          display: 'flex',
          justifyContent: 'space-around',
          flexShrink: 0,
        }}>
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '4px 18px',
                  color: isActive ? t.primary : t.textDim,
                  transition: 'color 0.2s ease',
                }}
              >
                {navIcons[item.id]}
                <span style={{
                  fontSize: 10,
                  fontFamily: "'Lora', serif",
                  color: isActive ? t.primary : t.textDim,
                  transition: 'color 0.2s ease',
                  fontWeight: isActive ? 600 : 400,
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
