const { useState, useEffect, useRef } = React;

function App() {
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
    body { margin: 0; }
  `;

  const themes = {
    dark: {
      bg: '#111118',
      surface: '#1C1C26',
      surface2: '#252532',
      primary: '#3A28C8',
      accent: '#E85D20',
      accentLight: '#FF7A3D',
      text: '#F0EDE8',
      textSecondary: '#7A7690',
      border: '#2A2A3A',
      navBg: '#161620',
    },
    light: {
      bg: '#F0EEF8',
      surface: '#FFFFFF',
      surface2: '#E8E4F5',
      primary: '#3A28C8',
      accent: '#E85D20',
      accentLight: '#FF7A3D',
      text: '#1A1530',
      textSecondary: '#6B6585',
      border: '#DDD8F0',
      navBg: '#FFFFFF',
    },
  };

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [energyLevel, setEnergyLevel] = useState(72);
  const [intentionSet, setIntentionSet] = useState(false);

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyLevel(prev => {
        const delta = (Math.random() - 0.38) * 4.5;
        return Math.max(35, Math.min(98, parseFloat((prev + delta).toFixed(1))));
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'circles', label: 'Circles', icon: window.lucide.Users },
    { id: 'live', label: 'Live', icon: window.lucide.Radio },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const communities = [
    { id: 1, name: 'New Parent Warriors', members: 847, color: '#E85D20', ritual: 'Morning Check-in', time: '7:00 AM', active: true },
    { id: 2, name: 'Freelance Dancers', members: 234, color: '#3A28C8', ritual: 'Goal Circle', time: '6:30 PM', active: false },
    { id: 3, name: 'Zero Waste Living', members: 1203, color: '#2AA87E', ritual: 'Weekly Audit', time: '8:00 PM', active: false },
    { id: 4, name: 'Solo Founders', members: 562, color: '#C83A8A', ritual: 'Build Sprint', time: '9:00 AM', active: true },
    { id: 5, name: 'Urban Gardeners', members: 389, color: '#8A6A2A', ritual: 'Harvest Share', time: '5:00 PM', active: false },
    { id: 6, name: 'Night Owls Writers', members: 127, color: '#7A3AC8', ritual: 'Word Count', time: '11:00 PM', active: true },
  ];

  // ─── Energy Gauge ───────────────────────────────────────────────────────────
  const EnergyGauge = ({ level, size = 120 }) => {
    const radius = (size / 2) - 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (level / 100) * circumference;
    const gaugeColor = level > 70 ? t.accent : level > 45 ? '#F0A030' : '#C83A3A';
    return (
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={t.border} strokeWidth="7" />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={gaugeColor} strokeWidth="7"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.9s ease, stroke 0.5s ease' }}
          />
        </svg>
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: size / 3.2, color: gaugeColor, lineHeight: 1, transition: 'color 0.5s ease' }}>
            {Math.round(level)}
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: Math.max(7, size / 10), color: t.textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ENERGY
          </div>
        </div>
      </div>
    );
  };

  // ─── Home Screen ─────────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const [pressedIdx, setPressedIdx] = useState(null);

    const upcomingRituals = [
      { id: 1, community: 'New Parent Warriors', ritual: 'Morning Check-in', time: '7:00 AM', participants: 23, joined: true, color: '#E85D20' },
      { id: 2, community: 'Solo Founders', ritual: 'Build Sprint', time: '9:00 AM', participants: 41, joined: false, color: '#C83A8A' },
      { id: 3, community: 'Night Owls Writers', ritual: 'Word Count', time: '11:00 PM', participants: 18, joined: true, color: '#7A3AC8' },
    ];

    // Constellation: overlapping circles with connecting lines
    const constellationNodes = [
      { x: 58, y: 36, size: 108, community: communities[0] },
      { x: 154, y: 18, size: 88, community: communities[3] },
      { x: 242, y: 46, size: 78, community: communities[5] },
      { x: 108, y: 108, size: 82, community: communities[2] },
      { x: 200, y: 102, size: 74, community: communities[1] },
    ];
    const centerOf = (node) => ({ cx: node.x + node.size / 2, cy: node.y + node.size / 2 });
    const lineConnections = [[0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [2, 4]];

    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 14px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: t.accent, letterSpacing: '0.15em' }}>GOOD MORNING</div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: t.text, letterSpacing: '0.05em', lineHeight: 1.1 }}>MARCUS 🔥</div>
            </div>
            <div style={{ background: t.accent, borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
              {React.createElement(window.lucide.Bell, { size: 15, color: '#fff' })}
              <span style={{ fontFamily: 'Bebas Neue', fontSize: 13, color: '#fff', letterSpacing: '0.08em' }}>3 TODAY</span>
            </div>
          </div>

          {/* Streak + Gauge row */}
          <div style={{ marginTop: 14, background: t.surface2, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${t.border}` }}>
            <div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 38, color: t.accent, lineHeight: 1 }}>14</div>
              <div style={{ fontFamily: 'Inter', fontSize: 10, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Day Streak</div>
              <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                {[...Array(7)].map((_, i) => (
                  <div key={i} style={{ width: 20, height: 5, borderRadius: 3, background: i < 6 ? t.accent : t.border }} />
                ))}
              </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <EnergyGauge level={energyLevel} size={64} />
            </div>
          </div>
        </div>

        {/* Constellation — Your Tribes */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: t.textSecondary, letterSpacing: '0.12em', marginBottom: 12 }}>YOUR TRIBES</div>
          <div style={{ position: 'relative', height: 210, background: t.surface, borderRadius: 20, overflow: 'hidden', border: `2px solid ${t.border}` }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.28 }}>
              {lineConnections.map(([a, b], li) => {
                const A = centerOf(constellationNodes[a]);
                const B = centerOf(constellationNodes[b]);
                return (
                  <line key={li} x1={A.cx} y1={A.cy} x2={B.cx} y2={B.cy}
                    stroke={li % 2 === 0 ? t.accent : t.primary}
                    strokeWidth="1.5" strokeDasharray="5,4" />
                );
              })}
            </svg>
            {constellationNodes.map((node, idx) => {
              const isPressed = pressedIdx === idx;
              return (
                <div key={idx}
                  onMouseDown={() => setPressedIdx(idx)} onMouseUp={() => setPressedIdx(null)}
                  onTouchStart={() => setPressedIdx(idx)} onTouchEnd={() => setPressedIdx(null)}
                  style={{
                    position: 'absolute', left: node.x, top: node.y,
                    width: node.size, height: node.size, borderRadius: '50%',
                    background: node.community.color + '1A',
                    border: `3px solid ${node.community.color}90`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: idx + 1,
                    transform: isPressed ? 'scale(0.93)' : 'scale(1)',
                    transition: 'transform 0.15s ease',
                  }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: node.size > 95 ? 11 : 9, color: node.community.color, textAlign: 'center', padding: '0 8px', lineHeight: 1.3, letterSpacing: '0.05em' }}>
                    {node.community.name.split(' ').slice(0, 2).join('\n')}
                  </div>
                  {node.community.active && (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', marginTop: 5 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Rituals */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: t.textSecondary, letterSpacing: '0.12em', marginBottom: 12 }}>TODAY'S RITUALS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcomingRituals.map(r => (
              <div key={r.id} style={{ background: t.surface, borderRadius: 16, padding: '13px 15px', border: `1px solid ${r.joined ? r.color + '50' : t.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: r.joined ? r.color : t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide.Flame, { size: 20, color: r.joined ? '#fff' : t.textSecondary })}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: 15, color: t.text, letterSpacing: '0.05em' }}>{r.ritual}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary, marginTop: 2 }}>{r.community} · {r.participants} joining</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: 16, color: r.color, letterSpacing: '0.05em' }}>{r.time}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 10, color: r.joined ? '#22C55E' : t.textSecondary, marginTop: 2 }}>{r.joined ? '✓ JOINED' : 'TAP TO JOIN'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Banner */}
        <div style={{ padding: '18px 20px 0' }}>
          <div
            onClick={() => setActiveTab('live')}
            style={{ background: t.primary, borderRadius: 20, padding: '18px 20px', cursor: 'pointer', border: `1px solid ${t.primary}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: '#22C55E', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>LIVE NOW</span>
            </div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: '#fff', letterSpacing: '0.05em', lineHeight: 1.1 }}>MORNING CHECK-IN IS LIVE</div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 5 }}>23 warriors in the circle — join before it ends</div>
            <div style={{ marginTop: 14, background: t.accent, borderRadius: 10, padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {React.createElement(window.lucide.Radio, { size: 15, color: '#fff' })}
              <span style={{ fontFamily: 'Bebas Neue', fontSize: 15, color: '#fff', letterSpacing: '0.08em' }}>JOIN NOW</span>
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>
    );
  };

  // ─── Circles Screen ───────────────────────────────────────────────────────────
  const CirclesScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const filters = ['ALL', 'JOINED', 'TRENDING', 'NEW'];

    const featuredNodes = [
      { cx: 78, cy: 78, r: 70, community: communities[0] },
      { cx: 198, cy: 52, r: 54, community: communities[3] },
      { cx: 300, cy: 80, r: 60, community: communities[2] },
      { cx: 158, cy: 158, r: 50, community: communities[5] },
      { cx: 262, cy: 162, r: 46, community: communities[1] },
    ];
    const featuredLines = [[0, 1], [1, 2], [0, 3], [2, 4], [3, 4], [1, 3]];

    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '16px 20px 12px' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: t.text, letterSpacing: '0.05em' }}>DISCOVER CIRCLES</div>
          <div style={{ marginTop: 12, background: t.surface, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${t.border}` }}>
            {React.createElement(window.lucide.Search, { size: 17, color: t.textSecondary })}
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: t.textSecondary }}>Search tribes, rituals, interests...</span>
          </div>
        </div>

        {/* Constellation — Featured Tribes */}
        <div style={{ padding: '0 20px', marginBottom: 18 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 13, color: t.textSecondary, letterSpacing: '0.12em', marginBottom: 10 }}>FEATURED TRIBES</div>
          <div style={{ position: 'relative', height: 228, background: t.surface, borderRadius: 20, overflow: 'hidden', border: `2px solid ${t.border}` }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.22 }}>
              {featuredLines.map(([a, b], li) => (
                <line key={li}
                  x1={featuredNodes[a].cx} y1={featuredNodes[a].cy}
                  x2={featuredNodes[b].cx} y2={featuredNodes[b].cy}
                  stroke={li % 2 === 0 ? t.accent : t.primary}
                  strokeWidth="1.5" strokeDasharray="5,4" />
              ))}
              {featuredNodes.map((n, i) => (
                <circle key={i} cx={n.cx} cy={n.cy} r={3} fill={n.community.color} opacity={0.8} />
              ))}
            </svg>
            {featuredNodes.map((node, idx) => (
              <div key={idx} style={{
                position: 'absolute',
                left: node.cx - node.r, top: node.cy - node.r,
                width: node.r * 2, height: node.r * 2, borderRadius: '50%',
                background: node.community.color + '16',
                border: `2px solid ${node.community.color}70`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: idx + 1
              }}>
                <div style={{ width: node.r * 0.55, height: node.r * 0.55, borderRadius: '50%', background: node.community.color + '35', border: `2px solid ${node.community.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                  {React.createElement(window.lucide.Users, { size: Math.max(10, node.r * 0.28), color: node.community.color })}
                </div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: Math.max(7, node.r * 0.14), color: node.community.color, textAlign: 'center', padding: '0 5px', lineHeight: 1.25, letterSpacing: '0.04em' }}>
                  {node.community.name.split(' ').slice(0, 2).join(' ')}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: Math.max(6, node.r * 0.11), color: node.community.color + 'BB', marginTop: 2 }}>
                  {node.community.members >= 1000 ? `${(node.community.members / 1000).toFixed(1)}k` : node.community.members}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setSelectedFilter(f)}
              style={{ padding: '6px 14px', borderRadius: 20, background: selectedFilter === f ? t.accent : t.surface, border: `1px solid ${selectedFilter === f ? t.accent : t.border}`, cursor: 'pointer', flexShrink: 0, fontFamily: 'Bebas Neue', fontSize: 12, letterSpacing: '0.08em', color: selectedFilter === f ? '#fff' : t.textSecondary, transition: 'all 0.2s ease' }}>
              {f}
            </div>
          ))}
        </div>

        {/* Community List */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {communities.map(c => (
            <div key={c.id} style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: c.color + '1E', border: `3px solid ${c.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide.Users, { size: 20, color: c.color })}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 15, color: t.text, letterSpacing: '0.05em' }}>{c.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary, marginTop: 2 }}>{c.members.toLocaleString()} members · {c.ritual}</div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                {c.active && (
                  <div style={{ background: '#22C55E1A', border: '1px solid #22C55E', borderRadius: 7, padding: '3px 8px', fontFamily: 'Bebas Neue', fontSize: 9, color: '#22C55E', letterSpacing: '0.06em', marginBottom: 5 }}>LIVE</div>
                )}
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary }}>{c.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    );
  };

  // ─── Live Screen ──────────────────────────────────────────────────────────────
  const LiveScreen = () => {
    const [phase, setPhase] = useState('intention');

    const participants = [
      { name: 'Marcus', avatar: 'M', color: '#E85D20', speaking: true },
      { name: 'Priya', avatar: 'P', color: '#3A28C8', speaking: false },
      { name: 'Jordan', avatar: 'J', color: '#2AA87E', speaking: false },
      { name: 'Aiko', avatar: 'A', color: '#C83A8A', speaking: false },
      { name: 'Devon', avatar: 'D', color: '#7A3AC8', speaking: false },
      { name: 'Rosa', avatar: 'R', color: '#C8883A', speaking: false },
    ];

    const reflections = [
      'Managed 20 min of tummy time! Feeling proud today.',
      'Skipped yesterday but back on track. The tribe keeps me honest.',
      'Finally found a rhythm. Day 14 streak feels incredible!',
      'Struggled but showed up anyway. That\'s what counts.',
    ];

    const phases = ['intention', 'ritual', 'reflection'];

    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
        {/* Live Header */}
        <div style={{ background: `linear-gradient(180deg, ${t.primary}45 0%, transparent 100%)`, padding: '14px 20px 18px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#22C55E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>LIVE SESSION</span>
            </div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: t.textSecondary, letterSpacing: '0.06em' }}>23:14 LEFT</div>
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 24, color: t.text, letterSpacing: '0.05em', lineHeight: 1.1 }}>NEW PARENT WARRIORS</div>
          <div style={{ fontFamily: 'Inter', fontSize: 12, color: t.textSecondary, marginTop: 4 }}>Morning Check-in · 23 participating</div>
        </div>

        {/* Energy Gauge — Hero */}
        <div style={{ padding: '18px 20px', background: t.surface, borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 18 }}>
          <EnergyGauge level={energyLevel} size={96} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: t.text, letterSpacing: '0.05em', lineHeight: 1.2 }}>COLLECTIVE ENERGY</div>
            <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary, marginTop: 4, lineHeight: 1.6 }}>
              {energyLevel > 70 ? '🔥 The tribe is FIRED UP! Keep pushing!' : energyLevel > 50 ? '⚡ Good momentum — share to boost it!' : '💪 Energy building — set your intention!'}
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 10 }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < Math.round(energyLevel / 10) ? t.accent : t.border, transition: 'background 0.6s ease' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Phase Tabs */}
        <div style={{ padding: '14px 20px 10px' }}>
          <div style={{ display: 'flex', background: t.surface, borderRadius: 13, padding: 4, border: `1px solid ${t.border}` }}>
            {phases.map(p => (
              <div key={p} onClick={() => setPhase(p)}
                style={{ flex: 1, padding: '8px 4px', borderRadius: 9, background: phase === p ? t.accent : 'transparent', cursor: 'pointer', textAlign: 'center', fontFamily: 'Bebas Neue', fontSize: 12, letterSpacing: '0.06em', color: phase === p ? '#fff' : t.textSecondary, transition: 'all 0.2s ease' }}>
                {p.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* INTENTION PHASE */}
        {phase === 'intention' && (
          <div style={{ padding: '4px 20px' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: t.text, letterSpacing: '0.06em', marginBottom: 12 }}>SET YOUR INTENTION</div>
            <div style={{ background: t.surface, borderRadius: 16, padding: '16px', border: `1px solid ${intentionSet ? t.accent + '70' : t.border}`, marginBottom: 12 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>What will you accomplish today?</div>
              <div style={{ background: t.surface2, borderRadius: 10, padding: '10px 12px', fontFamily: 'Inter', fontSize: 13, color: intentionSet ? t.text : t.textSecondary, minHeight: 58, lineHeight: 1.5, border: `1px solid ${t.border}` }}>
                {intentionSet ? 'Spend 30 min with my baby doing tummy time and reading a book together.' : 'Tap to write your intention...'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <div onClick={() => setIntentionSet(true)}
                style={{ flex: 1, background: intentionSet ? '#22C55E' : t.accent, borderRadius: 13, padding: '13px', textAlign: 'center', cursor: 'pointer', fontFamily: 'Bebas Neue', fontSize: 15, color: '#fff', letterSpacing: '0.06em', transition: 'background 0.3s ease' }}>
                {intentionSet ? '✓ INTENTION SET' : 'SET INTENTION'}
              </div>
              <div style={{ width: 48, background: t.surface, borderRadius: 13, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}`, cursor: 'pointer' }}>
                {React.createElement(window.lucide.Mic, { size: 18, color: t.textSecondary })}
              </div>
            </div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 13, color: t.textSecondary, letterSpacing: '0.1em', marginBottom: 10 }}>TRIBE INTENTIONS</div>
            {['Focus on meal prep and mindful eating today.', 'Complete my morning workout before the baby wakes.'].map((txt, i) => (
              <div key={i} style={{ background: t.surface, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.border}`, marginBottom: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: participants[i + 1].color + '28', border: `2px solid ${participants[i + 1].color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: 14, color: participants[i + 1].color, flexShrink: 0 }}>
                  {participants[i + 1].avatar}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: t.text, lineHeight: 1.5, flex: 1 }}>{txt}</div>
              </div>
            ))}
          </div>
        )}

        {/* RITUAL PHASE */}
        {phase === 'ritual' && (
          <div style={{ padding: '4px 20px' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: t.text, letterSpacing: '0.06em', marginBottom: 12 }}>ACTIVE PARTICIPANTS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              {participants.map((p, i) => (
                <div key={i} style={{ background: t.surface, borderRadius: 14, padding: '14px 8px', border: `2px solid ${p.speaking ? p.color : t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer', transition: 'border-color 0.3s ease' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: p.color + '28', border: `3px solid ${p.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: 20, color: p.color }}>
                    {p.avatar}
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.text, fontWeight: 500 }}>{p.name}</div>
                  {p.speaking && <div style={{ background: '#22C55E1A', border: '1px solid #22C55E', borderRadius: 6, padding: '2px 7px', fontFamily: 'Bebas Neue', fontSize: 8, color: '#22C55E', letterSpacing: '0.06em' }}>SHARING</div>}
                </div>
              ))}
            </div>
            <div style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.accent + '50'}` }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 13, color: t.textSecondary, letterSpacing: '0.06em', marginBottom: 8 }}>MARCUS IS SHARING</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: t.text, lineHeight: 1.55 }}>"Today I'm focused on tummy time with Maya. Yesterday we did 15 minutes and she loved it!"</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                {['🔥', '💪', '❤️', '✨'].map((emoji, i) => (
                  <div key={i} style={{ fontSize: 20, cursor: 'pointer', padding: '4px 8px', borderRadius: 8, background: t.surface2 }}>{emoji}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REFLECTION PHASE */}
        {phase === 'reflection' && (
          <div style={{ padding: '4px 20px' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: t.text, letterSpacing: '0.06em', marginBottom: 12 }}>REFLECTION CIRCLE</div>
            {participants.slice(0, 4).map((p, i) => (
              <div key={i} style={{ background: t.surface, borderRadius: 16, padding: '13px 15px', border: `1px solid ${t.border}`, marginBottom: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.color + '28', border: `2px solid ${p.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: 15, color: p.color, flexShrink: 0 }}>
                  {p.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: 13, color: t.text, letterSpacing: '0.05em' }}>{p.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 12, color: t.textSecondary, marginTop: 3, lineHeight: 1.55 }}>{reflections[i]}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: 20 }} />
      </div>
    );
  };

  // ─── Profile Screen ───────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const stats = [
      { label: 'RITUALS', value: '86', color: t.accent },
      { label: 'STREAK', value: '14', color: '#22C55E' },
      { label: 'CIRCLES', value: '3', color: t.primary },
      { label: 'RANK', value: '#12', color: '#F0A030' },
    ];

    const settingsItems = [
      { icon: window.lucide.Bell, label: 'Notifications', sub: 'Ritual reminders & updates' },
      { icon: window.lucide.Shield, label: 'Privacy', sub: 'Circle visibility & sharing' },
      { icon: window.lucide.HelpCircle, label: 'Help & Support', sub: 'FAQs & contact us' },
    ];

    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
        {/* Profile Header */}
        <div style={{ padding: '22px 20px 20px', background: `linear-gradient(180deg, ${t.primary}35 0%, transparent 100%)`, borderBottom: `1px solid ${t.border}`, textAlign: 'center' }}>
          <div style={{ width: 78, height: 78, borderRadius: '50%', background: t.accent + '28', border: `4px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontFamily: 'Bebas Neue', fontSize: 34, color: t.accent }}>
            M
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: t.text, letterSpacing: '0.05em' }}>MARCUS CHEN</div>
          <div style={{ fontFamily: 'Inter', fontSize: 12, color: t.textSecondary, marginTop: 4 }}>New parent · Freelancer · Sustainability advocate</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.accent + '1C', border: `1px solid ${t.accent}45`, borderRadius: 20, padding: '5px 14px', marginTop: 10 }}>
            {React.createElement(window.lucide.Flame, { size: 13, color: t.accent })}
            <span style={{ fontFamily: 'Bebas Neue', fontSize: 13, color: t.accent, letterSpacing: '0.06em' }}>14 DAY WARRIOR STREAK</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '18px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: t.surface, borderRadius: 14, padding: '14px 6px', textAlign: 'center', border: `1px solid ${t.border}` }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: s.color, letterSpacing: '0.02em' }}>{s.value}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 9, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* My Circles */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: t.textSecondary, letterSpacing: '0.12em', marginBottom: 12 }}>MY CIRCLES</div>
          {communities.filter((_, i) => [0, 3, 5].includes(i)).map(c => (
            <div key={c.id} style={{ background: t.surface, borderRadius: 14, padding: '13px 15px', border: `1px solid ${t.border}`, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.color + '1C', border: `2px solid ${c.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide.Users, { size: 18, color: c.color })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: t.text, letterSpacing: '0.05em' }}>{c.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary, marginTop: 2 }}>{c.ritual} · {c.time}</div>
              </div>
              {c.active && React.createElement(window.lucide.Radio, { size: 15, color: '#22C55E' })}
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: t.textSecondary, letterSpacing: '0.12em', marginBottom: 12 }}>SETTINGS</div>

          {/* Theme toggle */}
          <div style={{ background: t.surface, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 17, color: t.textSecondary })}
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: 14, color: t.text, fontWeight: 500 }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary }}>Toggle app theme</div>
              </div>
            </div>
            <div onClick={() => setIsDark(!isDark)}
              style={{ width: 50, height: 28, borderRadius: 14, background: isDark ? t.accent : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: isDark ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left 0.3s ease', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} />
            </div>
          </div>

          {settingsItems.map((item, i) => (
            <div key={i} style={{ background: t.surface, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, cursor: 'pointer' }}>
              {React.createElement(item.icon, { size: 17, color: t.textSecondary })}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 14, color: t.text, fontWeight: 500 }}>{item.label}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: t.textSecondary }}>{item.sub}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textSecondary })}
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    );
  };

  const screens = {
    home: HomeScreen,
    circles: CirclesScreen,
    live: LiveScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{fontStyle}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375,
        minHeight: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        boxShadow: '0 50px 100px rgba(0,0,0,0.4), 0 0 0 12px #1a1a1a, 0 0 0 15px #333',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, borderRadius: 20, background: '#000', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', border: '1px solid #2a2a2a' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', opacity: 0.85 }} />
        </div>

        {/* Status Bar */}
        <div style={{ padding: '52px 24px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 0 22px', flexShrink: 0, display: 'flex' }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const isLive = tab.id === 'live';
            return (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 0', position: 'relative' }}>
                {isLive ? (
                  <div style={{ position: 'absolute', top: -10, width: 48, height: 48, borderRadius: '50%', background: isActive ? t.accent : t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${t.navBg}`, zIndex: 10 }}>
                    {React.createElement(tab.icon, { size: 21, color: '#fff' })}
                  </div>
                ) : (
                  React.createElement(tab.icon, { size: 22, color: isActive ? t.accent : t.textSecondary })
                )}
                <span style={{ fontFamily: 'Bebas Neue', fontSize: 10, letterSpacing: '0.06em', color: isActive ? t.accent : t.textSecondary, marginTop: isLive ? 26 : 0 }}>
                  {tab.label.toUpperCase()}
                </span>
                {isActive && !isLive && (
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.accent, position: 'absolute', bottom: -2 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
