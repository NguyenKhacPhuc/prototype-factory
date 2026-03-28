const { useState, useEffect, useRef } = React;

const pf = { fontFamily: "'Playfair Display', serif" };

const themes = {
  dark: {
    bg: '#1C1510',
    surface: '#261A11',
    surface2: '#321F14',
    primary: '#E8724A',
    primaryDeep: '#C04530',
    accent: '#F2C49A',
    text: '#F5EDE4',
    textMuted: '#9A7060',
    textSubtle: '#5A3A2A',
    border: '#3A2518',
    navBg: '#1C1510',
    success: '#4A8060',
  },
  light: {
    bg: '#FAF6F0',
    surface: '#FFFFFF',
    surface2: '#F2EAE0',
    primary: '#E8724A',
    primaryDeep: '#C04530',
    accent: '#6B3820',
    text: '#2A1510',
    textMuted: '#7A5848',
    textSubtle: '#C0A090',
    border: '#E8D4C0',
    navBg: '#FFFFFF',
    success: '#4A8060',
  }
};

// ─── HOME SCREEN ────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  const [moodIdx, setMoodIdx] = useState(null);
  const moods = [
    { icon: '😌', label: 'Serene' },
    { icon: '🌿', label: 'Grounded' },
    { icon: '✨', label: 'Curious' },
    { icon: '🌊', label: 'Fluid' },
    { icon: '🔥', label: 'Alive' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90, background: theme.bg }}>
      {/* Editorial Header */}
      <div style={{ padding: '18px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ ...pf, fontSize: 10, letterSpacing: 3.5, textTransform: 'uppercase', color: theme.primary, margin: 0 }}>Sunday · March 29</p>
          <h1 style={{ ...pf, fontSize: 30, fontWeight: 700, color: theme.text, margin: '5px 0 0', lineHeight: 1.1 }}>Your Journey<br />Awaits</h1>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 14px rgba(232,114,74,0.35)` }}>
          <span style={{ fontSize: 22 }}>🌸</span>
        </div>
      </div>

      {/* Active Destination Hero */}
      <div style={{ margin: '18px 24px', background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDeep} 100%)`, borderRadius: 22, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -18, top: -18, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', right: 28, bottom: -22, width: 65, height: 65, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', margin: 0 }}>Active Journey</p>
        <h2 style={{ ...pf, fontSize: 26, fontWeight: 700, color: '#fff', margin: '4px 0 14px', letterSpacing: -0.5 }}>Kyoto, Japan</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {['5 Rituals Active', 'Day 3 of 7'].map((t, i) => (
            <span key={i} style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 13px', fontSize: 10, color: '#fff', ...pf, letterSpacing: 0.5 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Mood Check-in */}
      <div style={{ padding: '0 24px', marginBottom: 22 }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.textMuted, margin: '0 0 10px' }}>Current Feeling</p>
        <div style={{ display: 'flex', gap: 7 }}>
          {moods.map((m, i) => (
            <div key={i} onClick={() => setMoodIdx(i)} style={{
              flex: 1, textAlign: 'center', padding: '10px 2px 8px',
              borderRadius: 14,
              background: moodIdx === i ? theme.primary : theme.surface,
              border: `1.5px solid ${moodIdx === i ? theme.primary : theme.border}`,
              cursor: 'pointer',
              transform: moodIdx === i ? 'scale(1.07) translateY(-2px)' : 'scale(1)',
              transition: 'all 0.2s ease',
              boxShadow: moodIdx === i ? `0 6px 16px rgba(232,114,74,0.3)` : 'none',
            }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{m.icon}</div>
              <div style={{ ...pf, fontSize: 8, color: moodIdx === i ? 'rgba(255,255,255,0.9)' : theme.textMuted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Calm Quote */}
      <div style={{ margin: '0 24px 22px', borderLeft: `3px solid ${theme.primary}`, paddingLeft: 16 }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.primary, margin: '0 0 7px' }}>Today's Calm</p>
        <p style={{ ...pf, fontSize: 14, fontStyle: 'italic', color: theme.text, margin: 0, lineHeight: 1.65 }}>
          "Between the bustling streets, there are pockets of ancient stillness waiting to hold you."
        </p>
      </div>

      {/* Recently Unlocked — OVERLAPPING ANGLED CARDS */}
      <div style={{ padding: '0 24px', marginBottom: 14 }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.textMuted, margin: 0 }}>Recently Unlocked</p>
      </div>

      <div style={{ position: 'relative', height: 185, marginBottom: 24, overflow: 'hidden' }}>
        {/* Card 1 — Forest Bathing, back-left */}
        <div style={{
          position: 'absolute', left: 20, top: 20,
          width: 192, background: '#3D7A56',
          borderRadius: 18, padding: '16px 18px',
          transform: 'rotate(-4.5deg)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
          zIndex: 1,
        }}>
          <p style={{ ...pf, fontSize: 9, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 5px' }}>Arashiyama · Nature</p>
          <h3 style={{ ...pf, fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Forest Bathing</h3>
          <p style={{ ...pf, fontSize: 11, color: 'rgba(255,255,255,0.75)', margin: 0, fontStyle: 'italic' }}>45-min sensory ritual ✓</p>
        </div>

        {/* Card 2 — Tea Ceremony, center */}
        <div style={{
          position: 'absolute', left: 92, top: 6,
          width: 192, background: '#7A5030',
          borderRadius: 18, padding: '16px 18px',
          transform: 'rotate(2.5deg)',
          boxShadow: '0 14px 32px rgba(0,0,0,0.3)',
          zIndex: 2,
        }}>
          <p style={{ ...pf, fontSize: 9, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 5px' }}>Urasenke · Cultural</p>
          <h3 style={{ ...pf, fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Tea Ceremony</h3>
          <p style={{ ...pf, fontSize: 11, color: 'rgba(255,255,255,0.75)', margin: 0, fontStyle: 'italic' }}>90-min deep immersion ✓</p>
        </div>

        {/* Card 3 — Locked, front-right */}
        <div style={{
          position: 'absolute', right: 20, top: 24,
          width: 192,
          background: theme.surface,
          border: `2px dashed ${theme.border}`,
          borderRadius: 18, padding: '16px 18px',
          transform: 'rotate(-1.5deg)',
          zIndex: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <p style={{ ...pf, fontSize: 9, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 5px' }}>Kinkaku-ji · Spiritual</p>
          <h3 style={{ ...pf, fontSize: 17, fontWeight: 700, color: theme.textMuted, margin: '0 0 8px' }}>Morning Bell</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13 }}>🔒</span>
            <span style={{ ...pf, fontSize: 11, color: theme.primary }}>Complete Quest 4</span>
          </div>
        </div>
      </div>

      {/* Active Quest Progress */}
      <div style={{ margin: '0 24px 8px', background: theme.surface, borderRadius: 20, padding: '18px 20px', border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <p style={{ ...pf, fontSize: 9, color: theme.primary, textTransform: 'uppercase', letterSpacing: 3, margin: '0 0 4px' }}>Active Quest · 3 of 5</p>
            <h3 style={{ ...pf, fontSize: 19, fontWeight: 700, color: theme.text, margin: 0 }}>Bamboo Breathing</h3>
          </div>
          <div style={{ background: theme.primary, borderRadius: 50, width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ ...pf, fontSize: 12, color: '#fff', fontWeight: 700 }}>60%</span>
          </div>
        </div>
        <p style={{ ...pf, fontSize: 12, color: theme.textMuted, margin: '0 0 12px', lineHeight: 1.65, fontStyle: 'italic' }}>
          "Stand in the grove. Breathe in for 4, hold for 4, release for 4."
        </p>
        <div style={{ background: theme.surface2, borderRadius: 6, height: 5, overflow: 'hidden' }}>
          <div style={{ background: theme.primary, height: '100%', width: '60%', borderRadius: 6 }} />
        </div>
        <p style={{ ...pf, fontSize: 9, color: theme.textMuted, margin: '6px 0 0', textAlign: 'right', letterSpacing: 1, textTransform: 'uppercase' }}>3 of 5 steps</p>
      </div>
    </div>
  );
}

// ─── MAP SCREEN ──────────────────────────────────────────────────────────────
function MapScreen({ theme }) {
  const [selectedDest, setSelectedDest] = useState(1);

  const destinations = [
    {
      name: 'Ubud', country: 'Bali, Indonesia', status: 'completed', emoji: '🌺',
      desc: 'A spiritual journey through terraced rice fields and ancient temples.',
      color: '#3D7A56',
      rituals: [
        { name: 'Temple Dawn Prayer', type: 'Spiritual', unlocked: true },
        { name: 'Rice Field Walk', type: 'Nature', unlocked: true },
        { name: 'Sound Bowl Healing', type: 'Wellness', unlocked: true },
        { name: 'Sunset Meditation', type: 'Mindful', unlocked: true },
      ]
    },
    {
      name: 'Kyoto', country: 'Japan', status: 'active', emoji: '🌸',
      desc: 'Layers of Zen culture and ancient rituals in the former imperial city.',
      color: '#E8724A',
      rituals: [
        { name: 'Forest Bathing', type: 'Nature', unlocked: true },
        { name: 'Tea Ceremony', type: 'Cultural', unlocked: true },
        { name: 'Morning Bell', type: 'Spiritual', unlocked: false },
        { name: 'Garden Meditation', type: 'Mindful', unlocked: false },
        { name: 'Evening Lanterns', type: 'Cultural', unlocked: false },
      ]
    },
    {
      name: 'Reykjavik', country: 'Iceland', status: 'upcoming', emoji: '🌌',
      desc: 'Geothermal wonders and cosmic nights in the land of fire and ice.',
      color: '#6A5080',
      rituals: [
        { name: 'Hot Spring Soak', type: 'Nature', unlocked: false },
        { name: 'Stargazing Ritual', type: 'Cosmic', unlocked: false },
        { name: 'Northern Lights Walk', type: 'Nature', unlocked: false },
        { name: 'Volcanic Meditation', type: 'Mindful', unlocked: false },
      ]
    },
  ];

  const dest = destinations[selectedDest];
  const unlocked = dest.rituals.filter(r => r.unlocked).length;
  const ritualColors = ['#3D7A56', '#7A5030', '#6A5080', '#5A6A40', '#804A30'];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90, background: theme.bg }}>
      <div style={{ padding: '18px 24px 0' }}>
        <p style={{ ...pf, fontSize: 10, letterSpacing: 3.5, textTransform: 'uppercase', color: theme.primary, margin: 0 }}>Discovery</p>
        <h1 style={{ ...pf, fontSize: 28, fontWeight: 700, color: theme.text, margin: '5px 0 18px', lineHeight: 1.15 }}>Ritual<br />Journey Map</h1>
      </div>

      {/* OVERLAPPING ANGLED DESTINATION CARDS */}
      <div style={{ position: 'relative', height: 215, marginBottom: 28, overflow: 'hidden' }}>
        {/* Ubud — back left, completed */}
        <div onClick={() => setSelectedDest(0)} style={{
          position: 'absolute', left: 12, top: 28,
          width: 202, background: '#3D7A56',
          borderRadius: 20, padding: '18px 20px',
          transform: 'rotate(-3.5deg)',
          boxShadow: `0 8px 24px rgba(0,0,0,0.22)`,
          cursor: 'pointer', zIndex: selectedDest === 0 ? 5 : 1,
          outline: selectedDest === 0 ? '3px solid rgba(255,255,255,0.6)' : 'none',
          outlineOffset: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ ...pf, fontSize: 9, letterSpacing: 2.5, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>Complete</span>
            <span style={{ fontSize: 16 }}>🌺</span>
          </div>
          <h3 style={{ ...pf, fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Ubud</h3>
          <p style={{ ...pf, fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Bali · 4/4 rituals ✓</p>
        </div>

        {/* Kyoto — center, active */}
        <div onClick={() => setSelectedDest(1)} style={{
          position: 'absolute', left: '50%',
          top: 8,
          transform: `translateX(-50%) rotate(${selectedDest === 1 ? 0 : 1.5}deg)`,
          width: 210,
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDeep} 100%)`,
          borderRadius: 20, padding: '18px 20px',
          boxShadow: '0 16px 40px rgba(232,114,74,0.35)',
          cursor: 'pointer', zIndex: 3,
          outline: selectedDest === 1 ? '3px solid rgba(255,255,255,0.5)' : 'none',
          outlineOffset: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ ...pf, fontSize: 9, letterSpacing: 2.5, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Active ●</span>
            <span style={{ fontSize: 16 }}>🌸</span>
          </div>
          <h3 style={{ ...pf, fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Kyoto</h3>
          <p style={{ ...pf, fontSize: 11, color: 'rgba(255,255,255,0.8)', margin: 0 }}>Japan · 2/5 rituals</p>
        </div>

        {/* Reykjavik — back right, upcoming */}
        <div onClick={() => setSelectedDest(2)} style={{
          position: 'absolute', right: 12, top: 33,
          width: 202, background: theme.surface,
          borderRadius: 20, padding: '18px 20px',
          transform: 'rotate(3deg)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          border: `2px solid ${selectedDest === 2 ? theme.primary : theme.border}`,
          cursor: 'pointer', zIndex: selectedDest === 2 ? 5 : 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ ...pf, fontSize: 9, letterSpacing: 2.5, color: theme.textMuted, textTransform: 'uppercase' }}>Upcoming</span>
            <span style={{ fontSize: 16 }}>🌌</span>
          </div>
          <h3 style={{ ...pf, fontSize: 20, fontWeight: 700, color: theme.text, margin: '0 0 4px' }}>Reykjavik</h3>
          <p style={{ ...pf, fontSize: 11, color: theme.textMuted, margin: 0 }}>Iceland · 0/4 rituals</p>
        </div>
      </div>

      {/* Selected Destination Detail */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <h2 style={{ ...pf, fontSize: 22, fontWeight: 700, color: theme.text, margin: 0 }}>{dest.name}</h2>
          <span style={{ ...pf, fontSize: 12, color: theme.primary, fontWeight: 700 }}>{unlocked}/{dest.rituals.length} unlocked</span>
        </div>
        <p style={{ ...pf, fontSize: 13, color: theme.textMuted, margin: '0 0 16px', lineHeight: 1.55, fontStyle: 'italic' }}>{dest.desc}</p>

        {/* Ritual list with subtle rotation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {dest.rituals.map((r, i) => (
            <div key={i} style={{
              background: r.unlocked ? ritualColors[i % ritualColors.length] : theme.surface,
              borderRadius: 14, padding: '14px 18px',
              border: r.unlocked ? 'none' : `1px solid ${theme.border}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transform: `rotate(${(i % 3 - 1) * 0.6}deg)`,
              boxShadow: r.unlocked ? '0 4px 14px rgba(0,0,0,0.15)' : 'none',
            }}>
              <div>
                <span style={{ ...pf, fontSize: 9, color: r.unlocked ? 'rgba(255,255,255,0.6)' : theme.textMuted, textTransform: 'uppercase', letterSpacing: 2 }}>{r.type}</span>
                <h4 style={{ ...pf, fontSize: 15, fontWeight: 700, color: r.unlocked ? '#fff' : theme.text, margin: '2px 0 0' }}>{r.name}</h4>
              </div>
              <span style={{ fontSize: 18 }}>{r.unlocked ? '✨' : '🔒'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── QUEST SCREEN ────────────────────────────────────────────────────────────
function QuestScreen({ theme }) {
  const [timerSec, setTimerSec] = useState(0);
  const [active, setActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('ready');
  const [groupSync, setGroupSync] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setTimerSec(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) { setBreathPhase('ready'); return; }
    const phases = ['inhale', 'hold', 'exhale'];
    const dur = [4, 4, 4];
    let pi = 0, ti = 0;
    const interval = setInterval(() => {
      ti++;
      if (ti >= dur[pi]) { pi = (pi + 1) % 3; ti = 0; setBreathPhase(phases[pi]); }
    }, 1000);
    setBreathPhase('inhale');
    return () => clearInterval(interval);
  }, [active]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const phaseColor = { ready: theme.textSubtle, inhale: theme.primary, hold: '#7A5030', exhale: '#3D7A56' };
  const phaseLabel = { ready: 'Press Begin', inhale: 'Breathe In', hold: 'Hold', exhale: 'Release' };
  const circleSize = { ready: 60, inhale: 52, hold: 48, exhale: 56 };

  const steps = [
    { label: 'Arrive at Arashiyama Bamboo Grove', done: true },
    { label: 'Find a quiet spot away from the main path', done: true },
    { label: 'Complete 5 minutes of bamboo breathing', done: false },
    { label: 'Write one word describing your feeling', done: false },
    { label: 'Share your moment with the circle', done: false },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90, background: theme.bg }}>
      <div style={{ padding: '18px 24px 0' }}>
        <p style={{ ...pf, fontSize: 10, letterSpacing: 3.5, textTransform: 'uppercase', color: theme.primary, margin: 0 }}>Quest 3 of 5</p>
        <h1 style={{ ...pf, fontSize: 28, fontWeight: 700, color: theme.text, margin: '5px 0 0', lineHeight: 1.15 }}>Bamboo<br />Breathing</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
          <span style={{ fontSize: 13 }}>📍</span>
          <span style={{ ...pf, fontSize: 12, color: theme.textMuted, fontStyle: 'italic' }}>Arashiyama Bamboo Grove, Kyoto</span>
        </div>
      </div>

      {/* Breathing Exercise */}
      <div style={{ margin: '20px 24px', background: theme.surface, borderRadius: 22, padding: '24px 20px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
        {/* Breath Circle */}
        <div style={{ position: 'relative', width: 150, height: 150, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${theme.border}` }} />
          <div style={{
            position: 'absolute',
            inset: circleSize[breathPhase],
            borderRadius: '50%',
            background: `${phaseColor[breathPhase]}20`,
            border: `2.5px solid ${phaseColor[breathPhase]}`,
            transition: 'all 1.2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ ...pf, fontSize: 11, color: phaseColor[breathPhase], fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>
              {phaseLabel[breathPhase]}
            </span>
          </div>
          {/* Pulse rings */}
          {active && (
            <div style={{ position: 'absolute', inset: circleSize[breathPhase] - 8, borderRadius: '50%', border: `1px solid ${phaseColor[breathPhase]}40`, transition: 'all 1.2s ease' }} />
          )}
        </div>

        <p style={{ ...pf, fontSize: 34, fontWeight: 700, color: theme.text, margin: '0 0 2px', letterSpacing: 3, fontVariantNumeric: 'tabular-nums' }}>{fmt(timerSec)}</p>
        <p style={{ ...pf, fontSize: 9, color: theme.textMuted, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: 2 }}>Goal · 5:00</p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <div onClick={() => setActive(a => !a)} style={{
            background: theme.primary, borderRadius: 50, padding: '12px 30px',
            cursor: 'pointer',
            boxShadow: active ? 'none' : `0 6px 18px rgba(232,114,74,0.4)`,
            transform: active ? 'scale(0.97)' : 'scale(1)',
            transition: 'all 0.2s',
          }}>
            <span style={{ ...pf, fontSize: 13, color: '#fff', fontWeight: 700 }}>{active ? '⏸  Pause' : '▶  Begin'}</span>
          </div>
          <div onClick={() => { setTimerSec(0); setActive(false); }} style={{
            background: theme.surface2, borderRadius: 50, padding: '12px 22px',
            cursor: 'pointer', border: `1px solid ${theme.border}`,
          }}>
            <span style={{ ...pf, fontSize: 13, color: theme.textMuted }}>↺</span>
          </div>
        </div>
      </div>

      {/* Quest Steps */}
      <div style={{ padding: '0 24px', marginBottom: 18 }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.textMuted, margin: '0 0 10px' }}>Quest Steps</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              background: theme.surface, borderRadius: 12, padding: '11px 14px',
              border: `1px solid ${s.done ? theme.success + '50' : theme.border}`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: s.done ? theme.success : 'transparent',
                border: `2px solid ${s.done ? theme.success : theme.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
              }}>
                {s.done
                  ? <span style={{ fontSize: 10, color: '#fff' }}>✓</span>
                  : <span style={{ ...pf, fontSize: 9, color: theme.textMuted, fontWeight: 700 }}>{i + 1}</span>
                }
              </div>
              <p style={{ ...pf, fontSize: 13, color: s.done ? theme.textMuted : theme.text, margin: 0, lineHeight: 1.45, textDecoration: s.done ? 'line-through' : 'none' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Group Sync */}
      <div onClick={() => setGroupSync(g => !g)} style={{
        margin: '0 24px',
        background: groupSync ? `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDeep})` : theme.surface,
        borderRadius: 18, padding: '18px 20px',
        border: groupSync ? 'none' : `1px solid ${theme.border}`,
        cursor: 'pointer', transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ ...pf, fontSize: 9, color: groupSync ? 'rgba(255,255,255,0.7)' : theme.textMuted, textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 4px' }}>Group Sync</p>
            <h3 style={{ ...pf, fontSize: 17, fontWeight: 700, color: groupSync ? '#fff' : theme.text, margin: 0 }}>
              {groupSync ? 'Session Active ✦' : 'Sync with Circle'}
            </h3>
          </div>
          <div style={{ display: 'flex' }}>
            {['🧘', '🌿', '✨'].map((e, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: groupSync ? 'rgba(255,255,255,0.2)' : theme.surface2, border: `2px solid ${groupSync ? 'rgba(255,255,255,0.35)' : theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? -8 : 0, fontSize: 14, zIndex: 3 - i }}>
                {e}
              </div>
            ))}
          </div>
        </div>
        {groupSync && (
          <p style={{ ...pf, fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: '10px 0 0', fontStyle: 'italic', lineHeight: 1.5 }}>
            3 companions are breathing with you right now...
          </p>
        )}
      </div>
    </div>
  );
}

// ─── CIRCLE SCREEN ───────────────────────────────────────────────────────────
function CircleScreen({ theme }) {
  const [inviteSent, setInviteSent] = useState(false);

  const companions = [
    { name: 'Mia', avatar: '🌸', mood: 'Serene', status: 'Active', rituals: 12, location: 'Arashiyama' },
    { name: 'Kai', avatar: '🌊', mood: 'Fluid', status: 'Meditating', rituals: 9, location: 'Fushimi Inari' },
    { name: 'Solen', avatar: '✨', mood: 'Curious', status: 'Exploring', rituals: 14, location: 'Gion District' },
    { name: 'Ash', avatar: '🔥', mood: 'Alive', status: 'Resting', rituals: 7, location: 'Kyoto Station' },
  ];

  const moments = [
    { user: 'Mia', ritual: 'Forest Bathing', time: '2h ago', emoji: '🌿', note: '"The bamboo sings."' },
    { user: 'Kai', ritual: 'Morning Bell', time: '4h ago', emoji: '🔔', note: '"Still vibrating."' },
    { user: 'Solen', ritual: 'Tea Ceremony', time: '6h ago', emoji: '🍵', note: '"Time dissolved."' },
  ];

  const statusColor = { Active: '#4A8060', Meditating: '#E8724A', Exploring: '#7A5030', Resting: '#6A6060' };

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90, background: theme.bg }}>
      <div style={{ padding: '18px 24px 0' }}>
        <p style={{ ...pf, fontSize: 10, letterSpacing: 3.5, textTransform: 'uppercase', color: theme.primary, margin: 0 }}>Travel Circle</p>
        <h1 style={{ ...pf, fontSize: 28, fontWeight: 700, color: theme.text, margin: '5px 0 0', lineHeight: 1.15 }}>Your<br />Companions</h1>
      </div>

      {/* Collective Stats */}
      <div style={{ margin: '18px 24px', display: 'flex', gap: 10 }}>
        {[
          { label: 'Shared Rituals', value: '42', icon: '✨' },
          { label: 'Sync Sessions', value: '8', icon: '🌊' },
          { label: 'Calm Hours', value: '14h', icon: '😌' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, background: theme.surface, borderRadius: 14, padding: '14px 8px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{stat.icon}</div>
            <p style={{ ...pf, fontSize: 18, fontWeight: 700, color: theme.primary, margin: '0 0 2px' }}>{stat.value}</p>
            <p style={{ ...pf, fontSize: 8, color: theme.textMuted, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Group Sync Invite */}
      <div style={{ margin: '0 24px 20px' }}>
        <div onClick={() => setInviteSent(s => !s)} style={{
          background: inviteSent ? theme.success : theme.primary,
          borderRadius: 16, padding: '14px 20px',
          cursor: 'pointer', transition: 'background 0.3s',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ ...pf, fontSize: 9, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 2px' }}>
              {inviteSent ? 'Awaiting Response' : 'Start a Session'}
            </p>
            <span style={{ ...pf, fontSize: 14, fontWeight: 700, color: '#fff' }}>
              {inviteSent ? 'Invite sent to 4 ✓' : 'Invite Circle to Sync'}
            </span>
          </div>
          <span style={{ fontSize: 22 }}>{inviteSent ? '⏳' : '🫂'}</span>
        </div>
      </div>

      {/* Companions */}
      <div style={{ padding: '0 24px', marginBottom: 20 }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.textMuted, margin: '0 0 10px' }}>Active Now</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {companions.map((c, i) => (
            <div key={i} style={{
              background: theme.surface, borderRadius: 16, padding: '13px 16px',
              border: `1px solid ${theme.border}`,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: theme.surface2, border: `2.5px solid ${statusColor[c.status]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 22 }}>{c.avatar}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ ...pf, fontSize: 15, fontWeight: 700, color: theme.text, margin: 0 }}>{c.name}</h4>
                  <span style={{ ...pf, fontSize: 10, color: theme.textMuted }}>{c.rituals} rituals</span>
                </div>
                <p style={{ ...pf, fontSize: 11, color: theme.textMuted, margin: '2px 0 4px' }}>{c.location}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[c.status] }} />
                  <span style={{ ...pf, fontSize: 10, color: theme.textMuted }}>{c.status} · {c.mood}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Moments */}
      <div style={{ padding: '0 24px' }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.textMuted, margin: '0 0 10px' }}>Circle Moments</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {moments.map((m, i) => (
            <div key={i} style={{ background: theme.surface, borderRadius: 14, padding: '12px 16px', border: `1px solid ${theme.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{m.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ ...pf, fontSize: 13, color: theme.text, margin: 0 }}>
                  <strong>{m.user}</strong> unlocked <em>{m.ritual}</em>
                </p>
                <p style={{ ...pf, fontSize: 11, color: theme.primary, margin: '3px 0 0', fontStyle: 'italic' }}>{m.note}</p>
                <p style={{ ...pf, fontSize: 10, color: theme.textMuted, margin: '2px 0 0' }}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
function ProfileScreen({ theme, isDark, toggleTheme }) {
  const [selectedSymbol, setSelectedSymbol] = useState(0);
  const [toggles, setToggles] = useState({ reminders: true, sync: true, geo: true, offline: false });

  const ritualSymbols = ['🌸', '🍵', '🌿', '🔔', '🌊', '✨', '🔥', '🌺'];

  const stats = [
    { label: 'Rituals', value: '23' },
    { label: 'Journeys', value: '4' },
    { label: 'Calm Hrs', value: '48' },
    { label: 'Syncs', value: '31' },
  ];

  const settings = [
    { key: 'reminders', label: 'Daily Calm Reminders', icon: '🔔' },
    { key: 'sync', label: 'Group Sync Alerts', icon: '👥' },
    { key: 'geo', label: 'Geolocation', icon: '📍' },
    { key: 'offline', label: 'Offline Rituals', icon: '✈️' },
  ];

  const toggle = key => setToggles(t => ({ ...t, [key]: !t[key] }));

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90, background: theme.bg }}>
      <div style={{ padding: '18px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ ...pf, fontSize: 10, letterSpacing: 3.5, textTransform: 'uppercase', color: theme.primary, margin: 0 }}>Your Journey</p>
          <h1 style={{ ...pf, fontSize: 28, fontWeight: 700, color: theme.text, margin: '5px 0 0', lineHeight: 1.15 }}>Profile</h1>
        </div>
        <div onClick={toggleTheme} style={{
          background: theme.surface2, borderRadius: 20, padding: '8px 14px',
          cursor: 'pointer', border: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'all 0.2s',
        }}>
          <span style={{ fontSize: 14 }}>{isDark ? '☀️' : '🌙'}</span>
          <span style={{ ...pf, fontSize: 10, color: theme.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>{isDark ? 'Light' : 'Dark'}</span>
        </div>
      </div>

      {/* Avatar */}
      <div style={{ margin: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px rgba(232,114,74,0.3)`, flexShrink: 0 }}>
          <span style={{ fontSize: 38 }}>{ritualSymbols[selectedSymbol]}</span>
        </div>
        <div>
          <h2 style={{ ...pf, fontSize: 20, fontWeight: 700, color: theme.text, margin: '0 0 2px' }}>Serene Wanderer</h2>
          <p style={{ ...pf, fontSize: 11, color: theme.primary, margin: '0 0 5px', letterSpacing: 0.5 }}>Level 5 · Ritual Seeker</p>
          <div style={{ background: theme.surface2, borderRadius: 10, height: 5, width: 120, overflow: 'hidden' }}>
            <div style={{ background: theme.primary, height: '100%', width: '72%', borderRadius: 10 }} />
          </div>
          <p style={{ ...pf, fontSize: 9, color: theme.textMuted, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: 1 }}>72% to Level 6</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ margin: '18px 24px', display: 'flex', gap: 8 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, background: theme.surface, borderRadius: 14, padding: '13px 6px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
            <p style={{ ...pf, fontSize: 20, fontWeight: 700, color: theme.primary, margin: '0 0 2px' }}>{s.value}</p>
            <p style={{ ...pf, fontSize: 8, color: theme.textMuted, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Symbol Selector */}
      <div style={{ padding: '0 24px', marginBottom: 22 }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.textMuted, margin: '0 0 10px' }}>Ritual Symbol Collection</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {ritualSymbols.map((sym, i) => (
            <div key={i} onClick={() => setSelectedSymbol(i)} style={{
              width: 50, height: 50, borderRadius: 14,
              background: selectedSymbol === i ? theme.primary : theme.surface,
              border: `2px solid ${selectedSymbol === i ? theme.primary : theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 22,
              transform: selectedSymbol === i ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
              transition: 'all 0.2s',
              boxShadow: selectedSymbol === i ? `0 6px 14px rgba(232,114,74,0.3)` : 'none',
            }}>
              {sym}
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '0 24px' }}>
        <p style={{ ...pf, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.textMuted, margin: '0 0 10px' }}>Preferences</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {settings.map(s => (
            <div key={s.key} style={{
              background: theme.surface, borderRadius: 14, padding: '13px 16px',
              border: `1px solid ${theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <span style={{ ...pf, fontSize: 13, color: theme.text }}>{s.label}</span>
              </div>
              <div onClick={() => toggle(s.key)} style={{
                width: 42, height: 24, borderRadius: 12,
                background: toggles[s.key] ? theme.primary : theme.border,
                position: 'relative', cursor: 'pointer', transition: 'background 0.25s',
                flexShrink: 0,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  position: 'absolute', top: 3, left: toggles[s.key] ? 21 : 3,
                  transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── APP (MAIN) ──────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(d => !d);

  const HomeIcon = window.lucide.Home;
  const MapIcon = window.lucide.Map;
  const CompassIcon = window.lucide.Compass;
  const UsersIcon = window.lucide.Users;
  const UserIcon = window.lucide.User;

  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'map', label: 'Map', icon: MapIcon },
    { id: 'quest', label: 'Quest', icon: CompassIcon },
    { id: 'circle', label: 'Circle', icon: UsersIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  const screens = {
    home: HomeScreen,
    map: MapScreen,
    quest: QuestScreen,
    circle: CircleScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812,
        background: theme.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 122, height: 34, background: '#000',
          borderRadius: 22, zIndex: 100,
        }} />

        {/* Status Bar */}
        <div style={{
          height: 52, paddingTop: 16, paddingLeft: 24, paddingRight: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0, background: theme.bg, transition: 'background 0.3s',
        }}>
          <span style={{ ...pf, fontSize: 13, fontWeight: 700, color: theme.text }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {/* Signal bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 10 }}>
              {[4, 6, 8, 10].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: theme.text, borderRadius: 1, opacity: i < 3 ? 1 : 0.3 }} />
              ))}
            </div>
            {/* Wifi */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ marginLeft: 2 }}>
              <path d="M7 2.5C8.8 2.5 10.4 3.2 11.6 4.3L13 2.9C11.4 1.4 9.3 0.5 7 0.5C4.7 0.5 2.6 1.4 1 2.9L2.4 4.3C3.6 3.2 5.2 2.5 7 2.5Z" fill={theme.text} />
              <path d="M7 5.5C8.1 5.5 9.1 5.9 9.9 6.7L11.3 5.3C10.1 4.2 8.6 3.5 7 3.5C5.4 3.5 3.9 4.2 2.7 5.3L4.1 6.7C4.9 5.9 5.9 5.5 7 5.5Z" fill={theme.text} />
              <circle cx="7" cy="9" r="1.5" fill={theme.text} />
            </svg>
            {/* Battery */}
            <div style={{ width: 22, height: 11, borderRadius: 2, border: `1.5px solid ${theme.text}`, position: 'relative', padding: '1.5px 1.5px', marginLeft: 2 }}>
              <div style={{ width: '78%', height: '100%', background: theme.text, borderRadius: 1 }} />
              <div style={{ width: 2, height: 4, background: theme.text, position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', borderRadius: '0 1px 1px 0' }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen theme={theme} isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        {/* Bottom Navigation */}
        <div style={{
          background: theme.navBg,
          borderTop: `1px solid ${theme.border}`,
          paddingBottom: 18, paddingTop: 8,
          display: 'flex', flexShrink: 0,
          transition: 'background 0.3s',
        }}>
          {tabs.map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, cursor: 'pointer', padding: '4px 0', position: 'relative',
              transition: 'all 0.2s',
            }}>
              <tab.icon
                size={22}
                color={activeTab === tab.id ? theme.primary : theme.textMuted}
                strokeWidth={activeTab === tab.id ? 2.5 : 1.5}
              />
              <span style={{
                ...pf, fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase',
                color: activeTab === tab.id ? theme.primary : theme.textMuted,
                fontWeight: activeTab === tab.id ? 700 : 400,
              }}>{tab.label}</span>
              {activeTab === tab.id && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: theme.primary, marginTop: -1 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
