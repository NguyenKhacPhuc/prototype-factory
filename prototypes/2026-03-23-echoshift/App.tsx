const { useState, useEffect, useRef } = React;

// ── Fonts ────────────────────────────────────────────────────────────────────
const _fontStyle = document.createElement('style');
_fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&display=swap');`;
document.head.appendChild(_fontStyle);

// ── Design Tokens ─────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F5F0FF',
    surface: '#FFFFFF',
    surface2: '#EDE9FE',
    surface3: '#FAF8FF',
    primary: '#8B5CF6',
    primaryDeep: '#6D28D9',
    primaryGrad: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)',
    primaryLight: '#EDE9FE',
    secondary: '#F97316',
    secondaryGrad: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
    accent: '#22D3EE',
    accentLight: '#ECFEFF',
    text: '#1C1033',
    textSub: '#5B4B8A',
    textMuted: '#A899CE',
    border: '#E8E0FF',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    navBg: '#FFFFFF',
    cardShadow: '0 2px 16px rgba(109, 40, 217, 0.09)',
    moodTense: '#F97316',
    moodRelease: '#C4B5FD',
    moodSettle: '#8B5CF6',
    moodGround: '#10B981',
  },
  dark: {
    bg: '#080611',
    surface: '#120D28',
    surface2: '#1C1640',
    surface3: '#0E0A22',
    primary: '#A78BFA',
    primaryDeep: '#7C3AED',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    primaryLight: '#2D1B69',
    secondary: '#FB923C',
    secondaryGrad: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)',
    accent: '#38BDF8',
    accentLight: '#082F49',
    text: '#EEE8FF',
    textSub: '#9580C8',
    textMuted: '#5A4A7A',
    border: '#2A1F50',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    navBg: '#0C0820',
    cardShadow: '0 4px 28px rgba(0, 0, 0, 0.55)',
    moodTense: '#FB923C',
    moodRelease: '#C4B5FD',
    moodSettle: '#A78BFA',
    moodGround: '#34D399',
  },
};

// ── Screen: Home ─────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, font, setActiveTab }) {
  const [pressed, setPressed] = useState(null);

  const scenes = [
    { id: 's1', icon: window.lucide.Wind,    label: 'Post-Meeting Reset',    sub: '8 min · Tense → Calm',    accent: '#8B5CF6' },
    { id: 's2', icon: window.lucide.Star,    label: 'Pre-Date Confidence',   sub: '5 min · Anxious → Bold',  accent: '#F97316' },
    { id: 's3', icon: window.lucide.Target,  label: 'Deep Work Entry',       sub: '10 min · Scattered → Sharp', accent: '#22D3EE' },
    { id: 's4', icon: window.lucide.Moon,    label: 'Late Night Unwind',     sub: '12 min · Wired → Sleepy', accent: '#6366F1' },
  ];

  const predictions = [
    { name: 'Reset Drive',  sub: '2:45 PM · 12-min commute',    mood: 'Tense → Grounded',  ready: true  },
    { name: 'Power Build',  sub: '4:00 PM · Gym session',        mood: 'Tired → Energized', ready: true  },
    { name: 'Social Flow',  sub: '7:30 PM · Dinner gathering',   mood: 'Quiet → Present',   ready: false },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', fontFamily: font, paddingBottom: '16px' }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px 20px',
        background: isDark
          ? `linear-gradient(180deg, ${t.surface} 0%, ${t.bg} 100%)`
          : `linear-gradient(180deg, #EDE9FE 0%, ${t.bg} 100%)`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: '0 0 3px', fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>MON, MAR 23</p>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: t.text, lineHeight: 1.2 }}>Good afternoon</h1>
          </div>
          <div style={{
            width: '42px', height: '42px', borderRadius: '13px',
            background: t.primaryGrad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(109, 40, 217, 0.38)',
          }}>
            {React.createElement(window.lucide.Headphones, { size: 20, color: '#FFF' })}
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: isDark ? t.primaryLight : '#DDD6FE',
          borderRadius: '20px', padding: '5px 12px', marginTop: '12px',
        }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: t.primary }} />
          <span style={{ fontSize: '12px', fontWeight: '600', color: t.primary }}>Moderate energy · post-meeting dip</span>
        </div>
      </div>

      {/* Up Next Card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div
          onClick={() => setActiveTab('player')}
          style={{
            background: t.primaryGrad,
            borderRadius: '22px', padding: '18px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(109, 40, 217, 0.42)',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'absolute', right: '-16px', top: '-16px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', right: '14px', bottom: '-28px', width: '75px', height: '75px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>UP NEXT · 2:45 PM</p>
          <h3 style={{ margin: '0 0 3px', fontSize: '19px', fontWeight: '700', color: '#FFF' }}>Reset Drive</h3>
          <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'rgba(255,255,255,0.72)' }}>Tense → Grounded · 12 min · 4 tracks</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {[32, 24, 28, 20].map((w, i) => (
              <div key={i} style={{ height: '4px', width: `${w}px`, background: i === 0 ? '#FFF' : 'rgba(255,255,255,0.28)', borderRadius: '2px' }} />
            ))}
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.48)', marginLeft: '6px' }}>~12 min</span>
            <div style={{ marginLeft: 'auto', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.Play, { size: 16, color: '#FFF', fill: '#FFF' })}
            </div>
          </div>
        </div>
      </div>

      {/* Scene Modes */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '13px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: t.text }}>Scene Modes</h2>
          <span style={{ fontSize: '13px', color: t.primary, fontWeight: '600', cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {scenes.map(s => (
            <div
              key={s.id}
              onPointerDown={() => setPressed(s.id)}
              onPointerUp={() => { setPressed(null); setActiveTab('bridge'); }}
              onPointerLeave={() => setPressed(null)}
              style={{
                background: t.surface,
                borderRadius: '18px', padding: '14px',
                cursor: 'pointer', border: `1px solid ${t.border}`,
                transform: pressed === s.id ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.12s cubic-bezier(0.25, 0.1, 0.25, 1)',
                boxShadow: t.cardShadow,
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '11px', marginBottom: '10px',
                background: `${s.accent}1A`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {React.createElement(s.icon, { size: 18, color: s.accent })}
              </div>
              <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: '600', color: t.text, lineHeight: 1.3 }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: '11px', color: t.textMuted }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '13px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: t.text }}>Predicted for Today</h2>
          {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
        </div>
        {predictions.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: t.surface, borderRadius: '14px', padding: '12px 14px',
            marginBottom: '8px', border: `1px solid ${t.border}`,
            boxShadow: t.cardShadow, cursor: 'pointer',
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
              background: p.ready ? (isDark ? t.primaryLight : '#EDE9FE') : (isDark ? t.surface2 : '#F5F3FF'),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {React.createElement(window.lucide.Music, { size: 18, color: p.ready ? t.primary : t.textMuted })}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 1px', fontSize: '14px', fontWeight: '600', color: t.text }}>{p.name}</p>
              <p style={{ margin: '0 0 1px', fontSize: '12px', color: t.textSub }}>{p.sub}</p>
              <p style={{ margin: 0, fontSize: '11px', color: t.textMuted }}>{p.mood}</p>
            </div>
            <div style={{
              background: p.ready ? t.primaryGrad : (isDark ? t.surface2 : '#F5F3FF'),
              borderRadius: '20px', padding: '4px 10px', flexShrink: 0,
              fontSize: '11px', fontWeight: '600', color: p.ready ? '#FFF' : t.textMuted,
            }}>{p.ready ? 'Ready' : 'Building'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Bridge ────────────────────────────────────────────────────────────
function BridgeScreen({ t, isDark, font, setActiveTab }) {
  const [selected, setSelected] = useState('post-meeting');

  const scenes = [
    { id: 'post-meeting', label: 'Post-Meeting Reset',  from: 'Tense',    to: 'Grounded',   dur: '14 min', tracks: 4 },
    { id: 'pre-date',     label: 'Pre-Date Confidence', from: 'Anxious',  to: 'Confident',  dur: '8 min',  tracks: 3 },
    { id: 'deep-work',    label: 'Deep Work Entry',     from: 'Scattered',to: 'Focused',    dur: '11 min', tracks: 5 },
  ];
  const active = scenes.find(s => s.id === selected);

  const tracks = [
    { n: 1, title: 'Breathe Easy',  artist: 'Tycho',          dur: '3:42', phase: 'Release', pc: '#F97316', active: false },
    { n: 2, title: 'Float On',      artist: 'Bonobo',         dur: '4:15', phase: 'Settle',  pc: '#A78BFA', active: true  },
    { n: 3, title: 'Still Waters',  artist: 'Nils Frahm',     dur: '3:28', phase: 'Ground',  pc: '#22D3EE', active: false },
    { n: 4, title: 'Arrival',       artist: 'Ólafur Arnalds', dur: '2:51', phase: 'Arrive',  pc: '#10B981', active: false },
  ];

  const phases = [
    { label: 'Release', color: '#F97316', done: true  },
    { label: 'Settle',  color: '#A78BFA', done: true  },
    { label: 'Ground',  color: '#22D3EE', done: false },
    { label: 'Arrive',  color: '#10B981', done: false },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', fontFamily: font, paddingBottom: '16px' }}>
      <div style={{ padding: '14px 20px 12px' }}>
        <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>MOMENT BRIDGE</p>
        <h2 style={{ margin: '0 0 14px', fontSize: '20px', fontWeight: '700', color: t.text }}>Transition Engine</h2>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {scenes.map(s => (
            <div
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                flexShrink: 0, padding: '7px 14px', borderRadius: '20px', cursor: 'pointer',
                background: selected === s.id ? t.primaryGrad : (isDark ? t.surface2 : '#F5F0FF'),
                border: `1px solid ${selected === s.id ? 'transparent' : t.border}`,
                fontSize: '12px', fontWeight: '600', color: selected === s.id ? '#FFF' : t.textSub,
                transition: 'all 0.18s ease',
              }}
            >{s.label}</div>
          ))}
        </div>
      </div>

      {/* Arc card */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ background: t.surface, borderRadius: '20px', padding: '18px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ margin: '0 0 1px', fontSize: '10px', color: t.textMuted, fontWeight: '600', letterSpacing: '0.07em' }}>FROM</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#F97316' }}>{active?.from}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 1px', fontSize: '10px', color: t.textMuted, fontWeight: '600', letterSpacing: '0.07em' }}>NOW</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: t.primary }}>Settling</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 1px', fontSize: '10px', color: t.textMuted, fontWeight: '600', letterSpacing: '0.07em' }}>TO</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#10B981' }}>{active?.to}</p>
            </div>
          </div>

          {/* Gradient arc bar */}
          <div style={{ height: '8px', borderRadius: '4px', background: 'linear-gradient(90deg, #F97316 0%, #A78BFA 45%, #22D3EE 75%, #10B981 100%)', position: 'relative', marginBottom: '14px' }}>
            <div style={{
              position: 'absolute', top: '-5px', left: 'calc(48% - 7px)',
              width: '18px', height: '18px', borderRadius: '50%',
              background: '#FFF', border: `3px solid ${t.primary}`,
              boxShadow: `0 2px 10px rgba(139, 92, 246, 0.48)`,
            }} />
          </div>

          {/* Phase dots */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            {phases.map((ph, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: ph.done ? ph.color : t.border,
                  boxShadow: ph.done ? `0 0 10px ${ph.color}70` : 'none',
                }} />
                <span style={{ fontSize: '10px', fontWeight: '600', color: ph.done ? t.textSub : t.textMuted }}>{ph.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {React.createElement(window.lucide.Timer, { size: 13, color: t.textMuted })}
              <span style={{ fontSize: '12px', color: t.textSub, fontWeight: '500' }}>{active?.dur}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {React.createElement(window.lucide.Music, { size: 13, color: t.textMuted })}
              <span style={{ fontSize: '12px', color: t.textSub, fontWeight: '500' }}>{active?.tracks} tracks</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {React.createElement(window.lucide.TrendingUp, { size: 13, color: t.success })}
              <span style={{ fontSize: '12px', color: t.success, fontWeight: '600' }}>94% match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div style={{ padding: '0 20px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>TRANSITION SEQUENCE</p>
        {tracks.map((tr, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: tr.active ? (isDark ? t.surface2 : '#F5F0FF') : t.surface,
            borderRadius: '14px', padding: '12px', marginBottom: '8px',
            border: tr.active ? `1.5px solid ${t.primary}40` : `1px solid ${t.border}`,
            boxShadow: tr.active ? `0 4px 18px rgba(139, 92, 246, 0.14)` : t.cardShadow,
            cursor: 'pointer',
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
              background: tr.active ? t.primaryGrad : (isDark ? t.surface2 : '#F5F3FF'),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: tr.active ? '0 4px 12px rgba(109, 40, 217, 0.35)' : 'none',
            }}>
              {tr.active
                ? React.createElement(window.lucide.Volume2, { size: 16, color: '#FFF' })
                : <span style={{ fontSize: '13px', fontWeight: '600', color: t.textMuted }}>{tr.n}</span>
              }
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 1px', fontSize: '14px', fontWeight: tr.active ? '700' : '600', color: tr.active ? t.primary : t.text }}>{tr.title}</p>
              <p style={{ margin: 0, fontSize: '12px', color: t.textSub }}>{tr.artist}</p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <div style={{
                display: 'inline-block', padding: '3px 8px', borderRadius: '8px', marginBottom: '2px',
                background: `${tr.pc}1A`, fontSize: '11px', fontWeight: '600', color: tr.pc,
              }}>{tr.phase}</div>
              <p style={{ margin: 0, fontSize: '11px', color: t.textMuted }}>{tr.dur}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px 20px 4px' }}>
        <button
          onClick={() => setActiveTab('player')}
          style={{
            width: '100%', padding: '16px',
            background: t.primaryGrad, border: 'none', borderRadius: '16px',
            fontSize: '15px', fontWeight: '700', color: '#FFF', cursor: 'pointer', fontFamily: font,
            boxShadow: '0 8px 24px rgba(109, 40, 217, 0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          {React.createElement(window.lucide.Play, { size: 18, color: '#FFF', fill: '#FFF' })}
          Start Transition
        </button>
      </div>
    </div>
  );
}

// ── Screen: Player ────────────────────────────────────────────────────────────
function PlayerScreen({ t, isDark, font }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(37);
  const [liked, setLiked] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 300);
  };

  const totalSecs = 255;
  const elapsed = Math.floor((progress / 100) * totalSecs);
  const eMin = Math.floor(elapsed / 60);
  const eSec = elapsed % 60;

  const waveHeights = [28, 44, 36, 52, 40, 60, 48, 38, 54, 42, 32, 50];

  return (
    <div style={{ height: '100%', overflowY: 'auto', fontFamily: font, padding: '12px 20px 20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>NOW PLAYING</p>
          <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: '600', color: t.textSub }}>Post-Meeting Reset</p>
        </div>
        {React.createElement(window.lucide.MoreHorizontal, { size: 22, color: t.textMuted, cursor: 'pointer' })}
      </div>

      {/* Album art */}
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: '26px', maxHeight: '216px', flexShrink: 0,
        background: isDark
          ? 'linear-gradient(135deg, #1a0a3e 0%, #0c1545 55%, #0a2a1e 100%)'
          : 'linear-gradient(135deg, #ddd6fe 0%, #e0f2fe 58%, #d1fae5 100%)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        marginBottom: '22px', position: 'relative', overflow: 'hidden',
        boxShadow: isDark ? '0 24px 64px rgba(0,0,0,0.7)' : '0 20px 56px rgba(109,40,217,0.22)',
        paddingBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
          {waveHeights.map((h, i) => (
            <div key={i} style={{
              width: '5px', borderRadius: '3px',
              height: `${playing ? h : h * 0.4}px`,
              background: isDark
                ? `rgba(167,139,250,${0.35 + (i % 3) * 0.15})`
                : `rgba(109,40,217,${0.22 + (i % 3) * 0.1})`,
              transition: `height ${0.3 + i * 0.04}s ease-in-out`,
            }} />
          ))}
        </div>
      </div>

      {/* Track info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '21px', fontWeight: '700', color: t.text }}>Float On</h3>
          <p style={{ margin: 0, fontSize: '14px', color: t.textSub }}>Bonobo · Black Sands</p>
        </div>
        <div onClick={handleLike} style={{ cursor: 'pointer', padding: '4px', transform: likeAnim ? 'scale(1.4)' : 'scale(1)', transition: 'transform 0.18s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
          {React.createElement(window.lucide.Heart, { size: 24, color: liked ? '#F97316' : t.textMuted, fill: liked ? '#F97316' : 'none' })}
        </div>
      </div>

      {/* Mood mini-bar */}
      <div style={{
        background: isDark ? t.surface2 : '#F5F0FF',
        borderRadius: '10px', padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '16px', border: `1px solid ${t.border}`,
      }}>
        {React.createElement(window.lucide.Zap, { size: 13, color: t.primary })}
        <span style={{ fontSize: '12px', color: t.textSub, flex: 1 }}>Settle phase · Releasing → Grounded</span>
        <div style={{ height: '4px', width: '50px', borderRadius: '2px', background: isDark ? t.surface : '#EDE9FE', overflow: 'hidden' }}>
          <div style={{ width: '48%', height: '100%', background: `linear-gradient(90deg, #F97316, ${t.primary})`, borderRadius: '2px' }} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ height: '4px', borderRadius: '2px', background: isDark ? t.surface2 : '#E8E0FF', position: 'relative', marginBottom: '8px', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress}%`, background: t.primaryGrad, borderRadius: '2px' }} />
          <div style={{
            position: 'absolute', top: '-5px', left: `${progress}%`, transform: 'translateX(-50%)',
            width: '14px', height: '14px', borderRadius: '50%',
            background: '#FFF', border: `2.5px solid ${t.primary}`,
            boxShadow: '0 2px 8px rgba(109,40,217,0.3)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: t.textMuted }}>{eMin}:{eSec.toString().padStart(2, '0')}</span>
          <span style={{ fontSize: '12px', color: t.textMuted }}>4:15</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        {React.createElement(window.lucide.Shuffle, { size: 20, color: t.textMuted, cursor: 'pointer' })}
        {React.createElement(window.lucide.SkipBack, { size: 26, color: t.text, cursor: 'pointer', fill: t.text })}
        <div
          onClick={() => setPlaying(!playing)}
          style={{
            width: '58px', height: '58px', borderRadius: '50%',
            background: t.primaryGrad, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(109,40,217,0.45)',
          }}
        >
          {playing
            ? React.createElement(window.lucide.Pause, { size: 24, color: '#FFF', fill: '#FFF' })
            : React.createElement(window.lucide.Play, { size: 24, color: '#FFF', fill: '#FFF' })
          }
        </div>
        {React.createElement(window.lucide.SkipForward, { size: 26, color: t.text, cursor: 'pointer', fill: t.text })}
        {React.createElement(window.lucide.Repeat, { size: 20, color: t.textMuted, cursor: 'pointer' })}
      </div>

      {/* Up next */}
      <div style={{
        background: t.surface, borderRadius: '14px', padding: '12px',
        border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: '10px',
        boxShadow: t.cardShadow,
      }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? t.surface2 : '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {React.createElement(window.lucide.Music, { size: 16, color: t.textMuted })}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 1px', fontSize: '12px', color: t.textMuted }}>Up next</p>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: t.text }}>Still Waters · Nils Frahm</p>
        </div>
        {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
      </div>
    </div>
  );
}

// ── Screen: Day ───────────────────────────────────────────────────────────────
function DayScreen({ t, isDark, font }) {
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const energy = [40, 65, 82, 78, 58, 52, 38, 48, 72, 68, 82, 56, 38, 24];
  const typeColors = { work: '#8B5CF6', transit: '#F97316', fitness: '#EF4444', social: '#22D3EE', morning: '#F59E0B', evening: '#6366F1', break: '#10B981' };
  const acts = { 8: { e: '☕', t: 'morning' }, 9: { e: '💻', t: 'work' }, 11: { e: '👥', t: 'social' }, 12: { e: '🥗', t: 'break' }, 14: { e: '📞', t: 'work' }, 15: { e: '🚗', t: 'transit' }, 16: { e: '💪', t: 'fitness' }, 19: { e: '🍽️', t: 'social' }, 21: { e: '🌙', t: 'evening' } };

  const slots = [
    { time: '9:00 AM',  playlist: 'Deep Focus Entry', activity: 'Work block',      mood: 'Groggy → Sharp',   energy: 82, type: 'work' },
    { time: '2:45 PM',  playlist: 'Reset Drive',      activity: 'Commute home',    mood: 'Tense → Grounded', energy: 38, type: 'transit', active: true },
    { time: '4:00 PM',  playlist: 'Power Build',      activity: 'Gym session',     mood: 'Tired → Energized',energy: 72, type: 'fitness' },
    { time: '7:30 PM',  playlist: 'Social Flow',      activity: 'Dinner gathering',mood: 'Quiet → Present',  energy: 56, type: 'social'  },
    { time: '10:00 PM', playlist: 'Night Ritual',     activity: 'Wind down',       mood: 'Wired → Sleepy',   energy: 24, type: 'evening' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', fontFamily: font, paddingBottom: '16px' }}>
      <div style={{ padding: '14px 20px 12px' }}>
        <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>ENERGY TIMELINE</p>
        <h2 style={{ margin: '0 0 2px', fontSize: '20px', fontWeight: '700', color: t.text }}>Today's Map</h2>
        <p style={{ margin: 0, fontSize: '13px', color: t.textSub }}>5 transitions predicted for today</p>
      </div>

      {/* Chart */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ background: t.surface, borderRadius: '20px', padding: '16px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: t.text }}>Energy Curve</span>
            <span style={{ fontSize: '11px', color: t.textMuted }}>8 AM — 10 PM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '72px', gap: '3px' }}>
            {energy.map((e, i) => {
              const h = hours[i];
              const act = acts[h];
              const c = act ? typeColors[act.t] || t.primary : t.border;
              const isNow = h === 14;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '8px', marginBottom: '2px', visibility: act ? 'visible' : 'hidden' }}>{act?.e || '·'}</span>
                  <div style={{
                    width: '100%', height: `${(e / 100) * 52}px`,
                    background: isNow ? t.primaryGrad : (act ? `${c}CC` : `${t.border}80`),
                    borderRadius: '3px 3px 0 0', minHeight: '4px',
                  }} />
                  {(i === 0 || i === 6 || i === 13) && (
                    <span style={{ fontSize: '8px', color: t.textMuted, marginTop: '2px' }}>{h > 12 ? `${h - 12}P` : `${h}A`}</span>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
            {[['Work', '#8B5CF6'], ['Transit', '#F97316'], ['Fitness', '#EF4444'], ['Social', '#22D3EE']].map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color }} />
                <span style={{ fontSize: '10px', color: t.textMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slots */}
      <div style={{ padding: '0 20px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>PLANNED TRANSITIONS</p>
        {slots.map((sl, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '54px', flexShrink: 0, paddingTop: '14px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: t.textMuted, lineHeight: 1.4, display: 'block' }}>{sl.time}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: '11px', height: '11px', borderRadius: '50%', marginTop: '14px',
                background: sl.active ? t.primary : (typeColors[sl.type] || t.border),
                boxShadow: sl.active ? `0 0 12px ${t.primary}80` : 'none',
              }} />
              {i < slots.length - 1 && <div style={{ width: '2px', flex: 1, background: t.border, marginTop: '4px', minHeight: '24px' }} />}
            </div>
            <div style={{
              flex: 1,
              background: sl.active ? (isDark ? t.surface2 : '#F5F0FF') : t.surface,
              borderRadius: '14px', padding: '12px',
              border: sl.active ? `1.5px solid ${t.primary}40` : `1px solid ${t.border}`,
              boxShadow: sl.active ? `0 4px 18px rgba(139,92,246,0.12)` : t.cardShadow,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 1px', fontSize: '13px', fontWeight: '700', color: t.text }}>{sl.playlist}</p>
                  <p style={{ margin: '0 0 2px', fontSize: '12px', color: t.textSub }}>{sl.activity}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: t.textMuted }}>{sl.mood}</p>
                </div>
                <div style={{
                  padding: '3px 8px', borderRadius: '8px', flexShrink: 0,
                  background: `${typeColors[sl.type] || t.primary}18`,
                  fontSize: '10px', fontWeight: '600', color: typeColors[sl.type] || t.primary,
                }}>{sl.type.charAt(0).toUpperCase() + sl.type.slice(1)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: isDark ? t.surface : '#EDE9FE', overflow: 'hidden' }}>
                  <div style={{ width: `${sl.energy}%`, height: '100%', background: typeColors[sl.type] || t.primary, borderRadius: '2px' }} />
                </div>
                <span style={{ fontSize: '10px', color: t.textMuted, flexShrink: 0 }}>{sl.energy}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Settings ──────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark, font }) {
  const [notif, setNotif] = useState(true);
  const [auto,  setAuto]  = useState(true);
  const [cal,   setCal]   = useState(true);
  const [loc,   setLoc]   = useState(true);

  const Toggle = ({ val, fn }) => (
    <div onClick={fn} style={{
      width: '44px', height: '24px', borderRadius: '12px',
      background: val ? t.primary : (isDark ? t.surface2 : '#D1D5DB'),
      position: 'relative', cursor: 'pointer', flexShrink: 0,
      transition: 'background 0.2s ease',
    }}>
      <div style={{
        position: 'absolute', top: '3px', left: val ? '23px' : '3px',
        width: '18px', height: '18px', borderRadius: '50%',
        background: '#FFF', boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
        transition: 'left 0.2s ease',
      }} />
    </div>
  );

  const stats = [
    { label: 'Transitions', value: '247', icon: window.lucide.Zap,        color: t.primary  },
    { label: 'Hours',       value: '38.5', icon: window.lucide.Clock,      color: '#F97316'  },
    { label: 'Accuracy',    value: '94%',  icon: window.lucide.TrendingUp, color: '#10B981'  },
    { label: 'Streak',      value: '12d',  icon: window.lucide.Activity,   color: '#F59E0B'  },
  ];

  const intelligenceItems = [
    { label: 'Calendar Sync',       desc: 'Predict from events',  val: cal,   fn: () => setCal(!cal),   icon: window.lucide.Calendar },
    { label: 'Location Patterns',   desc: 'Learn your routes',    val: loc,   fn: () => setLoc(!loc),   icon: window.lucide.MapPin   },
    { label: 'Auto-Build Playlists',desc: 'Ready before you ask', val: auto,  fn: () => setAuto(!auto), icon: window.lucide.Star     },
    { label: 'Transition Alerts',   desc: 'Mood shift reminders', val: notif, fn: () => setNotif(!notif),icon: window.lucide.Bell   },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', fontFamily: font, paddingBottom: '16px' }}>
      {/* Profile header */}
      <div style={{
        padding: '14px 20px 22px',
        background: isDark ? `linear-gradient(180deg, ${t.surface} 0%, ${t.bg} 100%)` : `linear-gradient(180deg, #EDE9FE 0%, ${t.bg} 100%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%', background: t.primaryGrad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(109,40,217,0.38)',
          }}>
            {React.createElement(window.lucide.User, { size: 24, color: '#FFF' })}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 2px', fontSize: '17px', fontWeight: '700', color: t.text }}>Steve</h3>
            <p style={{ margin: 0, fontSize: '13px', color: t.textSub }}>EchoShift Pro · Since Jan 2025</p>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.78)',
              borderRadius: '12px', padding: '10px 8px', textAlign: 'center',
            }}>
              {React.createElement(s.icon, { size: 16, color: s.color })}
              <p style={{ margin: '4px 0 1px', fontSize: '15px', fontWeight: '700', color: t.text }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: '10px', color: t.textMuted }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ background: t.surface, borderRadius: '18px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden' }}>
          <p style={{ margin: 0, padding: '14px 16px 8px', fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>APPEARANCE</p>
          <div style={{ padding: '0 12px 14px', display: 'flex', gap: '8px' }}>
            {[{ label: 'Light', icon: window.lucide.Sun, val: false }, { label: 'Dark', icon: window.lucide.Moon, val: true }].map(({ label, icon, val }) => (
              <div
                key={label}
                onClick={() => setIsDark(val)}
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: '12px', cursor: 'pointer',
                  background: isDark === val ? t.primaryGrad : (isDark ? t.surface2 : '#F5F3FF'),
                  border: `1px solid ${isDark === val ? 'transparent' : t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                  transition: 'all 0.2s ease',
                }}
              >
                {React.createElement(icon, { size: 16, color: isDark === val ? '#FFF' : t.textSub })}
                <span style={{ fontSize: '13px', fontWeight: '600', color: isDark === val ? '#FFF' : t.textSub }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligence */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ background: t.surface, borderRadius: '18px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden' }}>
          <p style={{ margin: 0, padding: '14px 16px 4px', fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '0.09em' }}>INTELLIGENCE</p>
          {intelligenceItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
              borderTop: i > 0 ? `1px solid ${t.border}` : 'none',
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, background: isDark ? t.primaryLight : '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(item.icon, { size: 16, color: t.primary })}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 1px', fontSize: '14px', fontWeight: '600', color: t.text }}>{item.label}</p>
                <p style={{ margin: 0, fontSize: '12px', color: t.textMuted }}>{item.desc}</p>
              </div>
              <Toggle val={item.val} fn={item.fn} />
            </div>
          ))}
        </div>
      </div>

      {/* Calibrate */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: t.surface, borderRadius: '16px', padding: '14px 16px',
          border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: '12px',
          cursor: 'pointer', boxShadow: t.cardShadow,
        }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isDark ? t.primaryLight : '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {React.createElement(window.lucide.Sliders, { size: 16, color: t.primary })}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 1px', fontSize: '14px', fontWeight: '600', color: t.text }}>Recalibrate EchoShift</p>
            <p style={{ margin: 0, fontSize: '12px', color: t.textMuted }}>Update energy profile & taste</p>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: t.textMuted, margin: '0 0 8px' }}>EchoShift v2.1.0 · Your daily soundtrack, curated</p>
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
function App() {
  const [onboarded, setOnboarded]   = useState(false);
  const [onbStep,   setOnbStep]     = useState(0);
  const [activeTab, setActiveTab]   = useState('home');
  const [isDark,    setIsDark]      = useState(false);

  const t    = isDark ? themes.dark : themes.light;
  const font = "'Sora', 'DM Sans', sans-serif";

  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home      },
    { id: 'bridge',   label: 'Bridge',   icon: window.lucide.Zap       },
    { id: 'player',   label: 'Now',      icon: window.lucide.Headphones },
    { id: 'day',      label: 'Day',      icon: window.lucide.BarChart2  },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings   },
  ];

  const screens = {
    home:     HomeScreen,
    bridge:   BridgeScreen,
    player:   PlayerScreen,
    day:      DayScreen,
    settings: SettingsScreen,
  };

  // ── Onboarding ──────────────────────────────────────────────────────────────
  const onbData = [
    {
      icon: window.lucide.Cpu,
      title: 'Music that reads\nyour day',
      body:  'EchoShift predicts what you need from your calendar, location, and habits — before you have to think about it.',
      color: '#8B5CF6',
    },
    {
      icon: window.lucide.ArrowRightLeft,
      title: 'The Moment\nBridge',
      body:  'Not playlists — emotional transitions. Go from tense to grounded in 12 minutes with a custom-built sequence.',
      color: '#F97316',
    },
    {
      icon: window.lucide.BarChart2,
      title: 'Your energy,\nmapped daily',
      body:  'A daily roadmap of when you need music most. EchoShift builds transitions for commutes, focus blocks, and wind-downs.',
      color: '#22D3EE',
    },
  ];

  const Onboarding = () => {
    const step = onbData[onbStep];
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column', fontFamily: font,
        background: `linear-gradient(170deg, ${step.color}25 0%, #080611 55%)`,
      }}>
        {/* Progress */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', paddingTop: '56px' }}>
          {onbData.map((_, i) => (
            <div key={i} style={{
              height: '4px', borderRadius: '2px',
              background: i === onbStep ? step.color : 'rgba(255,255,255,0.18)',
              width: i === onbStep ? '28px' : '8px',
              transition: 'all 0.28s ease',
            }} />
          ))}
        </div>

        {/* Illustration */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 32px' }}>
          <div style={{
            width: '128px', height: '128px', borderRadius: '40px', marginBottom: '36px',
            background: `linear-gradient(135deg, ${step.color}38, ${step.color}14)`,
            border: `1.5px solid ${step.color}38`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 24px 64px ${step.color}28`,
          }}>
            {React.createElement(step.icon, { size: 54, color: step.color })}
          </div>
          <h2 style={{
            margin: '0 0 16px', fontSize: '28px', fontWeight: '800', color: '#EEE8FF',
            textAlign: 'center', lineHeight: 1.2, whiteSpace: 'pre-line',
          }}>{step.title}</h2>
          <p style={{
            margin: 0, fontSize: '15px', color: 'rgba(238,232,255,0.6)',
            textAlign: 'center', lineHeight: 1.65, maxWidth: '280px',
          }}>{step.body}</p>
        </div>

        {/* CTA */}
        <div style={{ padding: '0 24px 44px' }}>
          <button
            onClick={() => onbStep < onbData.length - 1 ? setOnbStep(onbStep + 1) : setOnboarded(true)}
            style={{
              width: '100%', padding: '17px',
              background: `linear-gradient(135deg, ${step.color}, ${step.color}BB)`,
              border: 'none', borderRadius: '18px',
              fontSize: '16px', fontWeight: '700', color: '#FFF',
              cursor: 'pointer', fontFamily: font,
              boxShadow: `0 10px 28px ${step.color}48`,
              marginBottom: '14px',
            }}
          >
            {onbStep < onbData.length - 1 ? 'Continue' : 'Start with EchoShift'}
          </button>
          {onbStep < onbData.length - 1 && (
            <div style={{ textAlign: 'center' }}>
              <span
                onClick={() => setOnboarded(true)}
                style={{ fontSize: '13px', color: 'rgba(238,232,255,0.35)', cursor: 'pointer' }}
              >Skip intro</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #DDD6FE 0%, #BAE6FD 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: font, padding: '20px',
    }}>
      <div style={{
        width: '375px', height: '812px',
        background: !onboarded ? '#080611' : t.bg,
        borderRadius: '50px', overflow: 'hidden',
        position: 'relative',
        boxShadow: isDark
          ? '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)'
          : '0 40px 100px rgba(109,40,217,0.25), 0 0 0 1.5px rgba(0,0,0,0.09)',
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
          width: '120px', height: '34px', background: '#000', borderRadius: '20px', zIndex: 100,
        }} />

        {/* Status bar */}
        <div style={{
          height: '54px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 28px 10px', flexShrink: 0, zIndex: 50, position: 'relative',
        }}>
          <span style={{ fontSize: '14px', fontWeight: '600', fontFamily: font, color: !onboarded ? '#EEE8FF' : t.text }}>2:38</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {React.createElement(window.lucide.Wifi,    { size: 14, color: !onboarded ? '#EEE8FF' : t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: !onboarded ? '#EEE8FF' : t.text })}
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {!onboarded
            ? React.createElement(Onboarding)
            : React.createElement(screens[activeTab], { t, isDark, setIsDark, font, setActiveTab })
          }
        </div>

        {/* Bottom nav */}
        {onboarded && (
          <div style={{
            height: '76px', background: t.navBg,
            borderTop: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center',
            padding: '0 4px 12px', flexShrink: 0,
            boxShadow: isDark ? '0 -1px 30px rgba(0,0,0,0.5)' : '0 -1px 20px rgba(109,40,217,0.07)',
          }}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '3px', cursor: 'pointer', padding: '6px 2px',
                  transition: 'opacity 0.15s ease',
                }}
              >
                {React.createElement(tab.icon, {
                  size: 22,
                  color: activeTab === tab.id ? t.primary : t.textMuted,
                })}
                <span style={{
                  fontSize: '10px', fontWeight: activeTab === tab.id ? '600' : '500',
                  color: activeTab === tab.id ? t.primary : t.textMuted,
                  fontFamily: font,
                }}>{tab.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
