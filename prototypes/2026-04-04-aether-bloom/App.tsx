const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);

  const themes = {
    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F0F0F0',
      primary: '#76FF03',
      primaryDark: '#5AC800',
      text: '#263238',
      textMuted: '#546E7A',
      textLight: '#90A4AE',
      border: '#263238',
      accent: '#263238',
      cardBg: '#FFFFFF',
      navBg: '#263238',
      navText: '#76FF03',
    },
    dark: {
      bg: '#161C1F',
      surface: '#263238',
      surfaceAlt: '#1E282D',
      primary: '#76FF03',
      primaryDark: '#5AC800',
      text: '#FAFAFA',
      textMuted: '#B0BEC5',
      textLight: '#546E7A',
      border: '#76FF03',
      accent: '#76FF03',
      cardBg: '#1E282D',
      navBg: '#0D1316',
      navText: '#76FF03',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    seeds: SeedsScreen,
    almanac: AlmanacScreen,
    gallery: GalleryScreen,
  };

  const ActiveScreen = screens[activeScreen];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const navItems = [
    { id: 'home', label: 'Canopy', icon: '◈' },
    { id: 'seeds', label: 'Seeds', icon: '✦' },
    { id: 'almanac', label: 'Almanac', icon: '◉' },
    { id: 'gallery', label: 'Gallery', icon: '⬡' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fredoka', sans-serif", padding: '20px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        .zine-btn:active { transform: translate(2px, 2px); }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes pulse-seed { 0%,100% { box-shadow: 0 0 0 0 rgba(118,255,3,0.4); } 50% { box-shadow: 0 0 0 12px rgba(118,255,3,0); } }
        @keyframes drift { 0% { transform: translate(0,0) rotate(0deg); } 33% { transform: translate(8px,-5px) rotate(120deg); } 66% { transform: translate(-5px,8px) rotate(240deg); } 100% { transform: translate(0,0) rotate(360deg); } }
        @keyframes canopy-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: '375px',
        height: '812px',
        background: t.bg,
        borderRadius: '40px',
        overflow: 'hidden',
        position: 'relative',
        border: `3px solid ${t.border}`,
        boxShadow: isDark ? '8px 8px 0 #000' : '8px 8px 0 #263238',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header Bar */}
        <div style={{
          background: t.navBg,
          padding: '14px 20px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `2px solid ${t.primary}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', color: t.primary, fontWeight: 700, letterSpacing: '-0.5px' }}>AETHER</span>
            <span style={{ background: t.primary, color: t.navBg, fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px', letterSpacing: '1px' }}>BLOOM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: t.primary,
              color: t.navBg,
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '0.5px',
            }}>
              LVL 7
            </div>
            <button onClick={() => setIsDark(!isDark)} style={{
              background: 'none', border: `2px solid ${t.primary}`, borderRadius: '6px',
              color: t.primary, fontSize: '14px', cursor: 'pointer', padding: '3px 7px', fontFamily: 'inherit'
            }}>
              {isDark ? '☀' : '◑'}
            </button>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen t={t} setActiveScreen={setActiveScreen} isDark={isDark} />
        </div>

        {/* Floating Action Island — Nav */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: t.navBg,
          border: `2px solid ${t.primary}`,
          borderRadius: '40px',
          padding: '10px 16px',
          display: 'flex',
          gap: '6px',
          boxShadow: `4px 4px 0 ${t.primary}`,
          zIndex: 100,
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              className="zine-btn"
              onClick={() => { setActiveScreen(item.id); handlePress(item.id); }}
              style={{
                background: activeScreen === item.id ? t.primary : 'transparent',
                border: activeScreen === item.id ? 'none' : `1.5px solid ${t.primary}33`,
                borderRadius: '28px',
                padding: '6px 14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                transition: 'all 0.15s ease',
                transform: pressedBtn === item.id ? 'translate(2px,2px)' : 'none',
              }}
            >
              <span style={{ fontSize: '14px', color: activeScreen === item.id ? t.navBg : t.primary }}>{item.icon}</span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: activeScreen === item.id ? t.navBg : t.primary, letterSpacing: '0.5px', lineHeight: 1 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HOME SCREEN — Sky Canopy ───────────────────────────────────────────────
function HomeScreen({ t, setActiveScreen }) {
  const canvasRef = useRef(null);
  const [seedExpanded, setSeedExpanded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let animId;

    const particles = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 375,
      y: Math.random() * 300,
      r: Math.random() * 30 + 5,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
      color: [
        '#76FF03', '#263238', '#B2FF59', '#CCFF90',
        '#76FF0355', '#FAFAFA', '#37474F',
      ][Math.floor(Math.random() * 7)],
      shape: Math.floor(Math.random() * 3),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, 375, 300);
      ctx.fillStyle = '#1A2327';
      ctx.fillRect(0, 0, 375, 300);

      // Grid lines
      ctx.strokeStyle = '#76FF0318';
      ctx.lineWidth = 1;
      for (let x = 0; x < 375; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 300); ctx.stroke();
      }
      for (let y = 0; y < 300; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(375, y); ctx.stroke();
      }

      particles.forEach((p, i) => {
        const drift = Math.sin(frame * p.speed * 0.02 + p.phase);
        const py = p.y + drift * 12;
        const px = p.x + Math.cos(frame * p.speed * 0.015 + p.phase) * 8;

        ctx.globalAlpha = 0.5 + Math.sin(frame * 0.02 + p.phase) * 0.3;
        ctx.fillStyle = p.color;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(frame * p.speed * 0.01);

        if (p.shape === 0) {
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
        } else if (p.shape === 1) {
          ctx.beginPath();
          ctx.moveTo(0, -p.r);
          for (let s = 0; s < 6; s++) {
            const angle = (s * Math.PI * 2) / 6;
            ctx.lineTo(Math.cos(angle) * p.r, Math.sin(angle) * p.r);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Lime glow burst
      const gx = ctx.createRadialGradient(187, 150, 0, 187, 150, 120);
      gx.addColorStop(0, '#76FF0322');
      gx.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.8 + Math.sin(frame * 0.03) * 0.2;
      ctx.fillStyle = gx;
      ctx.fillRect(0, 0, 375, 300);

      ctx.globalAlpha = 1;
      frame++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const stats = [
    { label: 'Seeds', value: '47' },
    { label: 'Streak', value: '12d' },
    { label: 'Artifacts', value: '6' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
      {/* Canopy Canvas */}
      <div style={{ position: 'relative', border: `0 0 3px 0 solid ${t.border}` }}>
        <canvas ref={canvasRef} width={375} height={300} style={{ display: 'block' }} />
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: '#263238CC', border: '1px solid #76FF03',
          borderRadius: '6px', padding: '6px 12px',
          color: '#76FF03', fontSize: '11px', fontWeight: 600, letterSpacing: '1px',
        }}>
          YOUR SKY CANOPY
        </div>
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: '#76FF03', borderRadius: '6px', padding: '6px 10px',
          color: '#263238', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
        }}>
          EXPAND ⤢
        </div>
      </div>

      {/* Stats Strip */}
      <div style={{
        background: t.text, display: 'flex',
        borderBottom: `3px solid ${t.primary}`,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '10px', textAlign: 'center',
            borderRight: i < 2 ? `2px solid ${t.primary}33` : 'none',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: t.primary, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: '#546E7A', fontWeight: 600, letterSpacing: '1px', marginTop: '2px' }}>{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px' }}>
        {/* Today's Seed */}
        <div style={{
          border: `3px solid ${t.primary}`,
          borderRadius: '4px',
          background: t.surface,
          marginBottom: '14px',
          boxShadow: `4px 4px 0 ${t.primary}`,
          animation: 'slide-up 0.3s ease',
        }}>
          <div style={{
            background: t.primary, color: t.text,
            padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>TODAY'S SEED ✦</span>
            <span style={{ fontSize: '11px', fontWeight: 600, background: t.text, color: t.primary, padding: '2px 8px', borderRadius: '20px' }}>DAY 12</span>
          </div>
          <div style={{ padding: '14px' }}>
            <p style={{ fontSize: '16px', fontWeight: 600, color: t.text, lineHeight: 1.4, marginBottom: '10px' }}>
              "Find something that casts an unexpected shadow. Study the negative space between light and dark."
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['PHOTO', 'TEXT', 'AUDIO'].map(mode => (
                <button key={mode} onClick={() => setActiveScreen('seeds')} style={{
                  flex: 1, padding: '8px 0', border: `2px solid ${t.border}`,
                  background: 'transparent', borderRadius: '3px', cursor: 'pointer',
                  fontSize: '11px', fontWeight: 700, color: t.text, letterSpacing: '0.5px',
                  fontFamily: 'inherit',
                }}>
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Quest */}
        <div style={{
          border: `2px solid ${t.border}`, borderRadius: '4px',
          background: t.surface, padding: '14px', marginBottom: '14px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px',
            background: t.primary,
          }} />
          <div style={{ paddingLeft: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: t.primary, letterSpacing: '1px' }}>ACTIVE QUEST</span>
              <span style={{ fontSize: '10px', color: t.textMuted, fontWeight: 600 }}>5/12 done</span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: t.text, marginBottom: '10px' }}>
              Spring Awakening: Urban Decay & Renewal
            </p>
            <div style={{ background: t.surfaceAlt, borderRadius: '2px', height: '8px', overflow: 'hidden' }}>
              <div style={{ background: t.primary, height: '100%', width: '42%', borderRadius: '2px' }} />
            </div>
            <div style={{ fontSize: '10px', color: t.textMuted, marginTop: '4px', textAlign: 'right' }}>42% complete</div>
          </div>
        </div>

        {/* Recent Contributions */}
        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: t.text, letterSpacing: '0.5px' }}>RECENT CONTRIBUTIONS</span>
          <span onClick={() => setActiveScreen('almanac')} style={{ fontSize: '11px', color: t.primary, fontWeight: 700, cursor: 'pointer' }}>SEE ALL →</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { emoji: '🌿', label: 'Leaf veins', color: '#B2FF59' },
            { emoji: '🏗', label: 'Scaffolding', color: '#CCFF90' },
            { emoji: '💧', label: 'Rain drop', color: '#76FF03' },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, border: `2px solid ${t.border}`, borderRadius: '4px',
              background: t.surface, padding: '10px 8px', textAlign: 'center',
              cursor: 'pointer', boxShadow: `2px 2px 0 ${t.border}`,
            }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{item.emoji}</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: t.text, letterSpacing: '0.5px' }}>{item.label.toUpperCase()}</div>
              <div style={{ width: '100%', height: '4px', background: item.color, borderRadius: '2px', marginTop: '6px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SEEDS SCREEN ───────────────────────────────────────────────────────────
function SeedsScreen({ t }) {
  const [selected, setSelected] = useState(null);
  const [inputMode, setInputMode] = useState('photo');
  const [submitted, setSubmitted] = useState(false);

  const seeds = [
    { id: 1, day: 'TODAY', title: 'Shadow Play', prompt: 'Find something that casts an unexpected shadow. Study the negative space between light and dark.', tag: 'LIGHT', done: false },
    { id: 2, day: 'YESTERDAY', title: 'Micro Textures', prompt: 'Look for a surface with interesting texture — close your eyes first, then open them slowly to see it fresh.', tag: 'TEXTURE', done: true },
    { id: 3, day: '2 DAYS AGO', title: 'Urban Geometry', prompt: 'Find three different geometric shapes in a single urban scene without moving your feet.', tag: 'URBAN', done: true },
    { id: 4, day: '3 DAYS AGO', title: 'Color Gradient', prompt: 'Identify a natural color gradient — sky to horizon, bark to leaf, stone to moss.', tag: 'COLOR', done: true },
  ];

  if (selected) {
    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
        <div style={{ background: t.primary, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => { setSelected(null); setSubmitted(false); }} style={{
            background: t.text, border: 'none', borderRadius: '3px', padding: '4px 10px',
            color: t.primary, fontFamily: 'inherit', fontWeight: 700, fontSize: '13px', cursor: 'pointer',
          }}>← BACK</button>
          <span style={{ fontSize: '14px', fontWeight: 700, color: t.text, letterSpacing: '1px' }}>{selected.tag}</span>
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: t.textMuted, letterSpacing: '1px', marginBottom: '6px' }}>{selected.day}</div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: t.text, marginBottom: '12px', lineHeight: 1.1 }}>{selected.title}</h2>
          <div style={{
            border: `3px solid ${t.primary}`, borderRadius: '4px', padding: '16px',
            background: t.surface, marginBottom: '18px', boxShadow: `4px 4px 0 ${t.primary}44`,
          }}>
            <p style={{ fontSize: '16px', color: t.text, lineHeight: 1.5, fontWeight: 500 }}>"{selected.prompt}"</p>
          </div>

          {!submitted ? (
            <>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                {['photo', 'text', 'audio'].map(mode => (
                  <button key={mode} onClick={() => setInputMode(mode)} style={{
                    flex: 1, padding: '8px 0', border: `2px solid ${inputMode === mode ? t.primary : t.border}`,
                    background: inputMode === mode ? t.primary : 'transparent', borderRadius: '3px',
                    cursor: 'pointer', fontSize: '11px', fontWeight: 700,
                    color: inputMode === mode ? t.text : t.text, letterSpacing: '0.5px', fontFamily: 'inherit',
                  }}>
                    {mode.toUpperCase()}
                  </button>
                ))}
              </div>

              {inputMode === 'photo' && (
                <div style={{
                  border: `3px dashed ${t.border}`, borderRadius: '4px', height: '140px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: t.surfaceAlt, marginBottom: '14px', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '6px' }}>◈</div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: t.textMuted, letterSpacing: '1px' }}>TAP TO CAPTURE</span>
                </div>
              )}
              {inputMode === 'text' && (
                <textarea style={{
                  width: '100%', height: '120px', border: `3px solid ${t.border}`, borderRadius: '4px',
                  padding: '12px', fontFamily: 'inherit', fontSize: '14px', color: t.text,
                  background: t.surface, marginBottom: '14px', resize: 'none', outline: 'none',
                  boxSizing: 'border-box',
                }} placeholder="Describe what you observe..." />
              )}
              {inputMode === 'audio' && (
                <div style={{
                  border: `3px solid ${t.border}`, borderRadius: '4px', height: '100px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: t.surfaceAlt, marginBottom: '14px', cursor: 'pointer', gap: '8px',
                }}>
                  <div style={{ width: '48px', height: '48px', background: '#FF3D00', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '18px' }}>●</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: t.textMuted, letterSpacing: '1px' }}>HOLD TO RECORD</span>
                </div>
              )}

              <button onClick={() => setSubmitted(true)} style={{
                width: '100%', padding: '14px', background: t.primary, border: `3px solid ${t.text}`,
                borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 700,
                color: t.text, letterSpacing: '1px', fontFamily: 'inherit',
                boxShadow: `4px 4px 0 ${t.text}`,
              }}>
                PLANT THIS SEED ✦
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', animation: 'slide-up 0.3s ease' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px', animation: 'float 2s ease-in-out infinite' }}>✦</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: t.primary, marginBottom: '8px' }}>Seed Planted!</h3>
              <p style={{ fontSize: '14px', color: t.textMuted, marginBottom: '20px', lineHeight: 1.4 }}>
                Your observation is weaving into your Sky Canopy. Watch it bloom.
              </p>
              <div style={{ border: `3px solid ${t.primary}`, borderRadius: '4px', padding: '12px', background: t.surface }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: t.textMuted, letterSpacing: '1px', marginBottom: '4px' }}>CANOPY IMPACT</p>
                <p style={{ fontSize: '14px', color: t.text, fontWeight: 600 }}>+3 Geometric fragments added to your sky</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
      <div style={{ background: t.text, padding: '14px 16px', borderBottom: `3px solid ${t.primary}` }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: t.primary, letterSpacing: '2px', marginBottom: '4px' }}>OBSERVATIONAL PROMPTS</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#FAFAFA' }}>Your Seeds</h2>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {seeds.map((seed) => (
          <div key={seed.id} onClick={() => setSelected(seed)} style={{
            border: `2px solid ${seed.done ? t.border + '44' : t.primary}`,
            borderLeft: `5px solid ${seed.done ? t.textLight : t.primary}`,
            borderRadius: '4px', padding: '14px',
            background: t.surface, cursor: 'pointer',
            boxShadow: seed.done ? 'none' : `3px 3px 0 ${t.primary}44`,
            opacity: seed.done ? 0.7 : 1,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div>
                <span style={{ fontSize: '9px', fontWeight: 700, color: seed.done ? t.textMuted : t.primary, letterSpacing: '1.5px', display: 'block', marginBottom: '2px' }}>
                  {seed.day}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: t.text }}>{seed.title}</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', background: seed.done ? t.surfaceAlt : t.primary, color: seed.done ? t.textMuted : t.text, padding: '2px 8px', borderRadius: '20px', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {seed.tag}
                </span>
                <span style={{ fontSize: '16px' }}>{seed.done ? '✓' : '→'}</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: t.textMuted, lineHeight: 1.4 }}>
              {seed.prompt.substring(0, 80)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ALMANAC SCREEN ─────────────────────────────────────────────────────────
function AlmanacScreen({ t }) {
  const [activeMonth, setActiveMonth] = useState('APR');
  const months = ['APR', 'MAR', 'FEB', 'JAN'];

  const entries = [
    { date: 'APR 04', title: 'Shadow Play', tag: 'LIGHT', emoji: '🌘', note: 'The shadow of a fire escape ladder fell across a puddle, creating an impossible grid.' },
    { date: 'APR 03', title: 'Micro Textures', tag: 'TEXTURE', emoji: '🌿', note: 'Discovered the underside of a fig leaf — tiny white hairs like snow on ribs.' },
    { date: 'APR 02', title: 'Urban Geometry', tag: 'URBAN', emoji: '🏗', note: 'Three triangles in one frame: shadow, gable, crane silhouette.' },
    { date: 'APR 01', title: 'Color Gradient', tag: 'COLOR', emoji: '🌅', note: 'Ash grey sky bleeds into terracotta at the roofline. Held my breath for sixty seconds.' },
    { date: 'MAR 31', title: 'Water Mirror', tag: 'WATER', emoji: '💧', note: 'A bottle cap holds a tiny sky after rain. The sky inside was clearer than the real one.' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
      <div style={{ background: t.text, padding: '14px 16px', borderBottom: `3px solid ${t.primary}` }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: t.primary, letterSpacing: '2px', marginBottom: '4px' }}>PERSONAL RECORD</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#FAFAFA' }}>Observation Almanac</h2>
      </div>

      {/* Month Tabs */}
      <div style={{ display: 'flex', background: t.surfaceAlt, borderBottom: `2px solid ${t.border}` }}>
        {months.map(m => (
          <button key={m} onClick={() => setActiveMonth(m)} style={{
            flex: 1, padding: '10px 0', border: 'none',
            background: activeMonth === m ? t.primary : 'transparent',
            color: activeMonth === m ? t.text : t.textMuted,
            fontFamily: 'inherit', fontWeight: 700, fontSize: '12px',
            cursor: 'pointer', letterSpacing: '1px',
            borderBottom: activeMonth === m ? `3px solid ${t.text}` : '3px solid transparent',
          }}>{m}</button>
        ))}
      </div>

      {/* Big stat */}
      <div style={{
        background: t.primary, padding: '14px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `2px solid ${t.text}`,
      }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: t.text, letterSpacing: '1px', opacity: 0.7 }}>APRIL TOTAL</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: t.text, lineHeight: 1 }}>12 seeds</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: t.text, letterSpacing: '1px', opacity: 0.7 }}>TOP CATEGORY</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: t.text }}>NATURE ✦</div>
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '0' }}>
        {entries.map((entry, i) => (
          <div key={i} style={{ display: 'flex', gap: '0', marginBottom: '0' }}>
            {/* Date column */}
            <div style={{ width: '56px', flexShrink: 0, paddingTop: '14px', paddingRight: '10px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: t.primary, letterSpacing: '0.5px', lineHeight: 1.2 }}>
                {entry.date.split(' ')[0]}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: t.textMuted }}>
                {entry.date.split(' ')[1]}
              </div>
              {i < entries.length - 1 && (
                <div style={{ width: '2px', background: `${t.primary}33`, height: '100%', marginLeft: '14px', marginTop: '4px', minHeight: '40px' }} />
              )}
            </div>

            {/* Entry card */}
            <div style={{
              flex: 1, border: `2px solid ${t.border}`, borderRadius: '4px',
              padding: '12px', marginBottom: '10px', background: t.surface,
              borderLeft: `4px solid ${t.primary}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{entry.emoji}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>{entry.title}</span>
                </div>
                <span style={{ fontSize: '9px', background: t.primary, color: t.text, padding: '2px 7px', borderRadius: '20px', fontWeight: 700, letterSpacing: '0.5px', alignSelf: 'flex-start' }}>
                  {entry.tag}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: t.textMuted, lineHeight: 1.5, fontStyle: 'italic' }}>
                "{entry.note}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GALLERY SCREEN ──────────────────────────────────────────────────────────
function GalleryScreen({ t }) {
  const [activeTab, setActiveTab] = useState('trending');

  const canopies = [
    { user: 'nova_eye', seeds: 82, streak: '34d', style: { bg: '#0D1B2A', colors: ['#FF6B35', '#F7C59F', '#EFEFD0'] }, badge: '⬡ MASTER' },
    { user: 'lightchaser', seeds: 56, streak: '21d', style: { bg: '#1A0A2E', colors: ['#E040FB', '#7C4DFF', '#18FFFF'] }, badge: '✦ VOYAGER' },
    { user: 'stillpoint', seeds: 34, streak: '12d', style: { bg: '#0A1628', colors: ['#76FF03', '#26C6DA', '#FAFAFA'] }, badge: '◈ SEEKER' },
    { user: 'mossandsteel', seeds: 28, streak: '8d', style: { bg: '#1B2B1B', colors: ['#CCFF90', '#8BC34A', '#37474F'] }, badge: '◉ EXPLORER' },
  ];

  const themes = [
    { name: 'URBAN DECAY', participants: 284, emoji: '🏚' },
    { name: 'MORNING LIGHT', participants: 197, emoji: '🌅' },
    { name: 'MICRO NATURE', participants: 412, emoji: '🔬' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
      <div style={{ background: t.text, padding: '14px 16px', borderBottom: `3px solid ${t.primary}` }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: t.primary, letterSpacing: '2px', marginBottom: '4px' }}>COMMUNITY</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#FAFAFA' }}>Shared Canopies</h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: t.surfaceAlt, borderBottom: `2px solid ${t.border}` }}>
        {['trending', 'themes', 'following'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: '10px 0', border: 'none',
            background: activeTab === tab ? t.primary : 'transparent',
            color: activeTab === tab ? t.text : t.textMuted,
            fontFamily: 'inherit', fontWeight: 700, fontSize: '10px',
            cursor: 'pointer', letterSpacing: '1px',
          }}>{tab.toUpperCase()}</button>
        ))}
      </div>

      {activeTab === 'themes' ? (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ fontSize: '12px', color: t.textMuted, fontWeight: 600, letterSpacing: '0.5px' }}>COMMUNITY THEMES THIS WEEK</p>
          {themes.map((theme, i) => (
            <div key={i} style={{
              border: `3px solid ${t.border}`, borderRadius: '4px', padding: '16px',
              background: t.surface, display: 'flex', alignItems: 'center', gap: '14px',
              boxShadow: `3px 3px 0 ${t.primary}44`, cursor: 'pointer',
            }}>
              <div style={{ fontSize: '36px' }}>{theme.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: t.text, marginBottom: '4px' }}>{theme.name}</div>
                <div style={{ fontSize: '11px', color: t.primary, fontWeight: 700 }}>{theme.participants} observers</div>
              </div>
              <div style={{ background: t.primary, color: t.text, fontSize: '11px', fontWeight: 700, padding: '6px 12px', borderRadius: '3px' }}>
                JOIN →
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {canopies.map((c, i) => (
            <div key={i} style={{
              border: `2px solid ${t.border}`, borderRadius: '4px',
              overflow: 'hidden', background: t.surface, cursor: 'pointer',
            }}>
              {/* Mini Canopy Preview */}
              <div style={{
                background: c.style.bg, height: '80px', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                {c.style.colors.map((color, ci) => (
                  <div key={ci} style={{
                    position: 'absolute',
                    width: `${30 + ci * 20}px`, height: `${30 + ci * 20}px`,
                    background: color, opacity: 0.4 + ci * 0.2,
                    borderRadius: ci % 2 === 0 ? '50%' : '4px',
                    left: `${ci * 90}px`, top: `${10 + ci * 10}px`,
                    animation: `drift ${3 + ci}s linear infinite`,
                  }} />
                ))}
                <span style={{ position: 'relative', zIndex: 1, fontSize: '10px', fontWeight: 700, color: '#FAFAFA', letterSpacing: '1px', background: '#00000066', padding: '3px 10px', borderRadius: '20px' }}>
                  {c.badge}
                </span>
              </div>
              {/* User info */}
              <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `2px solid ${t.primary}` }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>@{c.user}</div>
                  <div style={{ fontSize: '11px', color: t.textMuted, fontWeight: 600 }}>{c.seeds} seeds · {c.streak} streak</div>
                </div>
                <button style={{
                  border: `2px solid ${t.border}`, borderRadius: '3px', padding: '5px 12px',
                  background: 'transparent', cursor: 'pointer', fontSize: '11px',
                  fontWeight: 700, color: t.text, fontFamily: 'inherit', letterSpacing: '0.5px',
                }}>
                  FOLLOW
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
