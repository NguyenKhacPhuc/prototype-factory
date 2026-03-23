/*
  ╔══════════════════════════════════════════════════════════╗
  ║  QuietRoute — Find the calmest path, not just the fastest ║
  ║  Design System:                                           ║
  ║    Style:    Organic Biophilic + Dark OLED                ║
  ║    Primary:  #00D9B4 (calm teal-mint)                     ║
  ║    Accent:   #8B7FFF (soft purple)                        ║
  ║    Fonts:    Sora (display) / DM Sans (body)              ║
  ╚══════════════════════════════════════════════════════════╝
*/

function App() {
  const { useState, useEffect } = React;

  // ── FONT + ANIMATION INJECTION ──────────────────────────────────────────────
  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
      ::-webkit-scrollbar{width:0;height:0;}
      @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes routeDraw{from{stroke-dashoffset:900}to{stroke-dashoffset:0}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
      @keyframes ping{0%{transform:scale(1);opacity:.9}75%,100%{transform:scale(2.4);opacity:0}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
      .screen-in{animation:fadeSlideUp .3s cubic-bezier(.4,0,.2,1) both;}
      .fade-in{animation:fadeIn .25s ease both;}
      input[type=range]{-webkit-appearance:none;appearance:none;height:5px;border-radius:3px;outline:none;cursor:pointer;}
      input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:currentColor;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.28);}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // ── THEME SYSTEM ────────────────────────────────────────────────────────────
  const themes = {
    dark: {
      bg:          '#07090F',
      surface:     '#0C1220',
      card:        '#131E35',
      border:      '#1E2D4A',
      text:        '#ECF0FF',
      textSub:     '#8BA2CC',
      textMuted:   '#4A5E82',
      primary:     '#00D9B4',
      primaryDim:  'rgba(0,217,180,0.1)',
      primaryGlow: '0 0 22px rgba(0,217,180,0.28)',
      accent:      '#8B7FFF',
      accentDim:   'rgba(139,127,255,0.1)',
      warning:     '#FFB547',
      warningDim:  'rgba(255,181,71,0.12)',
      danger:      '#FF6070',
      dangerDim:   'rgba(255,96,112,0.12)',
      info:        '#4DBBFF',
      infoDim:     'rgba(77,187,255,0.12)',
      gradient:    'linear-gradient(135deg, #00D9B4 0%, #4DBBFF 100%)',
      gradHero:    'linear-gradient(160deg, #0C1A30 0%, #0A1422 100%)',
      navBg:       '#09101E',
      mapBg:       '#0D1824',
      mapBlock:    '#152438',
      mapStreet:   '#0A1420',
    },
    light: {
      bg:          '#EBF2F8',
      surface:     '#FFFFFF',
      card:        '#FFFFFF',
      border:      '#D5E5F0',
      text:        '#0D1A30',
      textSub:     '#4A6080',
      textMuted:   '#8AA2BE',
      primary:     '#00B899',
      primaryDim:  'rgba(0,184,153,0.08)',
      primaryGlow: '0 4px 20px rgba(0,184,153,0.22)',
      accent:      '#7B6FE8',
      accentDim:   'rgba(123,111,232,0.08)',
      warning:     '#F59E0B',
      warningDim:  'rgba(245,158,11,0.1)',
      danger:      '#EF4444',
      dangerDim:   'rgba(239,68,68,0.1)',
      info:        '#0EA5E9',
      infoDim:     'rgba(14,165,233,0.1)',
      gradient:    'linear-gradient(135deg, #00B899 0%, #0EA5E9 100%)',
      gradHero:    'linear-gradient(160deg, #DFF0F8 0%, #D5EAF5 100%)',
      navBg:       '#FFFFFF',
      mapBg:       '#C5D9E8',
      mapBlock:    '#A5BFCE',
      mapStreet:   '#B5CFDE',
    },
  };

  // ── GLOBAL STATE ────────────────────────────────────────────────────────────
  const [isDark, setIsDark]             = useState(true);
  const [activeTab, setActiveTab]       = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardStep, setOnboardStep]   = useState(0);
  const [navigating, setNavigating]     = useState(false);
  const [prefs, setPrefs]               = useState({ noise: 80, crowds: 65, lighting: 70, smoothness: 55 });

  const t = isDark ? themes.dark : themes.light;

  // ── TABS ─────────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',    label: 'Home',    icon: window.lucide.Home },
    { id: 'map',     label: 'Map',     icon: window.lucide.Map },
    { id: 'routes',  label: 'Routes',  icon: window.lucide.Navigation },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  // ── SHARED COMPONENTS ───────────────────────────────────────────────────────

  function ComfortRing({ score, size, strokeWidth }) {
    size = size || 80;
    strokeWidth = strokeWidth || 7;
    const r     = (size - strokeWidth) / 2;
    const circ  = 2 * Math.PI * r;
    const color = score >= 75 ? t.primary : score >= 50 ? t.warning : t.danger;
    const lbl   = score >= 75 ? 'CALM' : score >= 50 ? 'MODERATE' : 'TENSE';
    return React.createElement('div', {
      style: { position: 'relative', width: size, height: size, flexShrink: 0 },
    },
      React.createElement('svg', {
        width: size, height: size,
        style: { transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 },
      },
        React.createElement('circle', { cx: size/2, cy: size/2, r, fill: 'none', stroke: t.border, strokeWidth }),
        React.createElement('circle', {
          cx: size/2, cy: size/2, r, fill: 'none',
          stroke: color, strokeWidth,
          strokeDasharray: circ,
          strokeDashoffset: circ * (1 - score / 100),
          strokeLinecap: 'round',
          style: {
            transition: 'stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)',
            filter: `drop-shadow(0 0 5px ${color}90)`,
          },
        })
      ),
      React.createElement('div', {
        style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
      },
        React.createElement('div', { style: { fontSize: size * .24, fontWeight: 800, color: t.text, lineHeight: 1, fontFamily: "'Sora',sans-serif" } }, score),
        React.createElement('div', { style: { fontSize: size * .1, color, fontWeight: 700, marginTop: 2, letterSpacing: '.04em', fontFamily: "'DM Sans',sans-serif" } }, lbl)
      )
    );
  }

  function MetricPill({ label, value, color }) {
    return React.createElement('div', {
      style: {
        flex: 1, background: color + '14', border: `1px solid ${color}30`,
        borderRadius: 10, padding: '6px 4px', textAlign: 'center',
      },
    },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color, fontFamily: "'DM Sans',sans-serif" } }, value),
      React.createElement('div', { style: { fontSize: 9, color: t.textMuted, marginTop: 1, fontFamily: "'DM Sans',sans-serif" } }, label)
    );
  }

  function Toggle({ on, onToggle, color }) {
    color = color || t.primary;
    return React.createElement('div', {
      onClick: onToggle,
      style: {
        width: 44, height: 26, borderRadius: 13,
        background: on ? color : t.border,
        position: 'relative', cursor: 'pointer',
        transition: 'background .25s ease', flexShrink: 0,
      },
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 3,
          left: on ? 21 : 3,
          width: 20, height: 20, background: '#FFF', borderRadius: '50%',
          transition: 'left .25s cubic-bezier(.4,0,.2,1)',
          boxShadow: '0 1px 5px rgba(0,0,0,.28)',
        },
      })
    );
  }

  // ── ONBOARDING ───────────────────────────────────────────────────────────────
  function OnboardingScreen() {
    const slides = [
      {
        icon: window.lucide.Leaf,
        color: t.primary,
        bg: t.primaryDim,
        title: 'Find Your Calm Path',
        body: 'Navigate cities based on sensory comfort — not just distance. Quieter streets, better lighting, calmer air. Every walk on your terms.',
      },
      {
        icon: window.lucide.Activity,
        color: t.accent,
        bg: t.accentDim,
        title: 'Your Comfort Score',
        body: 'Routes are scored using real-time noise, crowds, lighting, and pavement quality — personalised to what you care about most.',
      },
      {
        icon: window.lucide.Heart,
        color: t.warning,
        bg: t.warningDim,
        title: 'Arrive Less Stressed',
        body: 'QuietRoute learns what matters to you — silence, shade, ramps, bright streets — and improves with every trip you take.',
      },
    ];
    const slide = slides[onboardStep];
    const Icon  = slide.icon;

    return React.createElement('div', {
      key: onboardStep,
      className: 'screen-in',
      style: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 28px 28px', background: t.bg },
    },
      React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 },
      },
        // Illustration blob
        React.createElement('div', {
          style: {
            width: 148, height: 148, borderRadius: 48,
            background: slide.bg, border: `1.5px solid ${slide.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 50px ${slide.color}18`,
            animation: 'float 3s ease infinite',
          },
        }, React.createElement(Icon, { size: 68, color: slide.color, strokeWidth: 1.4 })),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('h1', {
            style: { fontSize: 28, fontWeight: 800, color: t.text, marginBottom: 12, fontFamily: "'Sora',sans-serif", letterSpacing: '-.02em', lineHeight: 1.2 },
          }, slide.title),
          React.createElement('p', {
            style: { fontSize: 15, color: t.textSub, lineHeight: 1.65, fontFamily: "'DM Sans',sans-serif" },
          }, slide.body)
        ),
        // Step dots
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          slides.map((_, i) => React.createElement('div', {
            key: i,
            style: {
              width: i === onboardStep ? 26 : 8, height: 8, borderRadius: 4,
              background: i === onboardStep ? slide.color : t.border,
              transition: 'width .3s ease',
            },
          }))
        )
      ),
      // CTA
      React.createElement('div', { style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 10 } },
        React.createElement('button', {
          onClick: () => onboardStep < 2 ? setOnboardStep(onboardStep + 1) : setShowOnboarding(false),
          style: {
            width: '100%', height: 54, border: 'none', borderRadius: 18, cursor: 'pointer',
            fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 700,
            background: onboardStep === 2 ? `linear-gradient(135deg, ${t.primary}, ${t.info})` : slide.bg,
            border: onboardStep === 2 ? 'none' : `1px solid ${slide.color}40`,
            color: onboardStep === 2 ? '#FFF' : slide.color,
            boxShadow: onboardStep === 2 ? `0 10px 28px ${t.primary}45` : 'none',
            transition: 'all .2s ease',
          },
        }, onboardStep === 2 ? 'Get Started' : 'Continue'),
        onboardStep < 2 && React.createElement('button', {
          onClick: () => setShowOnboarding(false),
          style: { background: 'none', border: 'none', color: t.textMuted, fontSize: 14, cursor: 'pointer', padding: 8, fontFamily: "'DM Sans',sans-serif" },
        }, 'Skip')
      )
    );
  }

  // ── HOME SCREEN ──────────────────────────────────────────────────────────────
  function HomeScreen() {
    const [searchVal, setSearchVal] = useState('');
    const [pressed, setPressed]     = useState(null);

    const quickDests = [
      { id: 'home2', name: 'Home',     icon: window.lucide.Home,     score: 88, min: '18' },
      { id: 'work',  name: 'Work',     icon: window.lucide.Briefcase, score: 72, min: '24' },
      { id: 'cafe',  name: 'Café',     icon: window.lucide.Coffee,   score: 93, min: '11' },
      { id: 'park',  name: 'Park',     icon: window.lucide.TreePine, score: 96, min: '7'  },
    ];

    const alerts = [
      { id: 1, text: 'Construction on Oak Ave',    severity: 'danger',  time: '2 min away',  icon: window.lucide.HardHat },
      { id: 2, text: 'Union Sq Station crowded',   severity: 'warning', time: '5 min away',  icon: window.lucide.Users },
      { id: 3, text: 'Air quality drops at 6 PM',  severity: 'info',    time: 'in 2 hours',  icon: window.lucide.Wind },
    ];

    const severityColors = { danger: t.danger, warning: t.warning, info: t.info };
    const severityDims   = { danger: t.dangerDim, warning: t.warningDim, info: t.infoDim };

    return React.createElement('div', {
      className: 'screen-in',
      style: { padding: '12px 14px 88px', overflowY: 'auto', height: '100%' },
    },

      // ─ Hero card ─
      React.createElement('div', {
        style: {
          borderRadius: 22, padding: '18px',
          background: t.gradHero, border: `1px solid ${t.border}`,
          marginBottom: 14, position: 'relative', overflow: 'hidden',
        },
      },
        React.createElement('div', { style: { position: 'absolute', top: -28, right: -28, width: 120, height: 120, background: t.primary + '10', borderRadius: '50%' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -36, left: 8, width: 95, height: 95, background: t.accent + '08', borderRadius: '50%' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'DM Sans',sans-serif", marginBottom: 2 } }, 'Good afternoon, Sarah'),
            React.createElement('div', { style: { fontSize: 21, fontWeight: 800, color: t.text, fontFamily: "'Sora',sans-serif", letterSpacing: '-.02em', marginBottom: 3 } }, 'Your Area is Calm'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSub, fontFamily: "'DM Sans',sans-serif" } }, 'Lower East Side · Updated just now')
          ),
          React.createElement(ComfortRing, { score: 82, size: 76, strokeWidth: 7 })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 7, marginTop: 14 } },
          React.createElement(MetricPill, { label: 'Noise',  value: '28 dB',   color: t.primary }),
          React.createElement(MetricPill, { label: 'Crowds', value: 'Moderate', color: t.warning }),
          React.createElement(MetricPill, { label: 'Air',    value: 'AQI 42',   color: t.info   })
        )
      ),

      // ─ Search ─
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10, height: 48,
          padding: '0 14px', background: t.card, border: `1px solid ${t.border}`,
          borderRadius: 16, marginBottom: 16,
        },
      },
        React.createElement(window.lucide.Search, { size: 15, color: t.textMuted }),
        React.createElement('input', {
          placeholder: 'Where are you headed?',
          value: searchVal,
          onChange: e => setSearchVal(e.target.value),
          style: { flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: t.text, fontFamily: "'DM Sans',sans-serif" },
        }),
        React.createElement('div', {
          style: { width: 30, height: 30, background: t.gradient, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
        }, React.createElement(window.lucide.Sliders, { size: 13, color: '#FFF' }))
      ),

      // ─ Quick routes ─
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", marginBottom: 10 } }, 'Quick Routes'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 } },
          quickDests.map(d => {
            const Icon = d.icon;
            const sc   = d.score >= 80 ? t.primary : d.score >= 65 ? t.warning : t.danger;
            return React.createElement('div', {
              key: d.id,
              onClick: () => setActiveTab('map'),
              onMouseDown: () => setPressed(d.id),
              onMouseUp: () => setPressed(null),
              onTouchStart: () => setPressed(d.id),
              onTouchEnd: () => setPressed(null),
              style: {
                background: t.card, border: `1px solid ${t.border}`, borderRadius: 18,
                padding: '14px 12px', cursor: 'pointer',
                transform: pressed === d.id ? 'scale(.96)' : 'scale(1)',
                transition: 'transform .12s ease',
              },
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 } },
                React.createElement('div', { style: { width: 34, height: 34, background: t.primaryDim, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { size: 15, color: t.primary })
                ),
                React.createElement('div', { style: { fontSize: 11, fontWeight: 800, color: sc, background: sc + '16', padding: '2px 8px', borderRadius: 20, fontFamily: "'DM Sans',sans-serif" } }, d.score)
              ),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, d.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2, fontFamily: "'DM Sans',sans-serif" } }, d.min + ' min calm route')
            );
          })
        )
      ),

      // ─ Live alerts ─
      React.createElement('div', null,
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif" } }, 'Live Alerts'),
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.danger, background: t.dangerDim, padding: '2px 9px', borderRadius: 20, fontFamily: "'DM Sans',sans-serif" } }, '3 nearby')
        ),
        alerts.map(a => {
          const c   = severityColors[a.severity];
          const dim = severityDims[a.severity];
          const Ic  = a.icon;
          return React.createElement('div', {
            key: a.id,
            style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: dim, border: `1px solid ${c}35`, borderRadius: 14, marginBottom: 8 },
          },
            React.createElement('div', { style: { width: 34, height: 34, background: c + '22', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Ic, { size: 15, color: c })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, a.text),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'DM Sans',sans-serif" } }, a.time)
            ),
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}`, flexShrink: 0, animation: 'pulse 2s ease infinite' } })
          );
        })
      )
    );
  }

  // ── MAP SCREEN ───────────────────────────────────────────────────────────────
  function MapScreen() {
    const [routeType, setRouteType] = useState('calm');

    const routes = {
      fastest:  { time: '14 min', label: 'Fastest',  score: 56, color: t.danger,  path: 'M 40,360 L 40,110 L 160,110 L 160,40 L 295,40' },
      balanced: { time: '16 min', label: 'Balanced', score: 74, color: t.warning, path: 'M 40,360 L 40,270 L 110,270 L 110,155 L 205,155 L 205,40 L 295,40' },
      calm:     { time: '19 min', label: 'Calmest',  score: 89, color: t.primary, path: 'M 40,360 L 40,305 L 170,305 L 170,215 L 242,215 L 242,118 L 295,118 L 295,40' },
    };
    const current = routes[routeType];

    const buildings = [
      {x:55,y:10,w:55,h:48},{x:55,y:68,w:55,h:40},{x:55,y:118,w:55,h:52},{x:55,y:180,w:55,h:42},
      {x:55,y:232,w:55,h:38},{x:55,y:280,w:55,h:52},{x:55,y:342,w:55,h:44},
      {x:120,y:10,w:70,h:48},{x:120,y:68,w:70,h:40},{x:120,y:118,w:30,h:28},{x:155,y:118,w:35,h:28},
      {x:120,y:180,w:70,h:42},{x:120,y:232,w:70,h:38},{x:120,y:280,w:70,h:52},{x:120,y:342,w:70,h:44},
      {x:200,y:10,w:82,h:48},{x:200,y:68,w:82,h:40},{x:200,y:118,w:38,h:52},{x:242,y:118,w:40,h:52},
      {x:200,y:180,w:82,h:42},{x:200,y:232,w:38,h:38},{x:248,y:232,w:34,h:38},
      {x:200,y:280,w:82,h:52},{x:200,y:342,w:82,h:44},
      {x:292,y:58,w:38,h:40},{x:292,y:118,w:38,h:40},{x:292,y:188,w:38,h:36},{x:292,y:234,w:38,h:90},
    ];

    const hotspots = [
      { cx: 148, cy: 128, r: 33, color: '#FF6070', label: '🔨 Construction', lx: 118, ly: 125 },
      { cx: 60,  cy: 248, r: 26, color: '#FFB547', label: '👥 Crowded',      lx: 22,  ly: 246 },
      { cx: 240, cy: 172, r: 20, color: '#FFB547', label: '🔊 Loud',         lx: 224, ly: 170 },
    ];

    return React.createElement('div', {
      className: 'screen-in',
      style: { height: '100%', display: 'flex', flexDirection: 'column', padding: '12px', paddingBottom: 0 },
    },
      // Route selector tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 6, padding: 5, background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, marginBottom: 10, flexShrink: 0 },
      },
        Object.entries(routes).map(([key, r]) =>
          React.createElement('div', {
            key, onClick: () => setRouteType(key),
            style: {
              flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 13, cursor: 'pointer',
              background: routeType === key ? r.color : 'transparent',
              transition: 'background .22s ease',
            },
          },
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: routeType === key ? '#FFF' : t.textSub, fontFamily: "'DM Sans',sans-serif" } }, r.label),
            React.createElement('div', { style: { fontSize: 10, color: routeType === key ? 'rgba(255,255,255,.72)' : t.textMuted, fontFamily: "'DM Sans',sans-serif" } }, r.time)
          )
        )
      ),

      // Map SVG
      React.createElement('div', {
        style: { flex: 1, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.border}`, position: 'relative', marginBottom: 10, minHeight: 0 },
      },
        React.createElement('svg', {
          viewBox: '0 0 340 395', width: '100%', height: '100%',
          preserveAspectRatio: 'xMidYMid slice',
        },
          // Background
          React.createElement('rect', { x: 0, y: 0, width: 340, height: 395, fill: t.mapBg }),
          // Street grid lines
          ...[0,10,55,115,120,200,285,295,340].map((x, i) =>
            React.createElement('line', { key:'vl'+i, x1: x, y1: 0, x2: x, y2: 395, stroke: t.mapStreet, strokeWidth: x===0||x===340?0:i%3===0?9:5 })
          ),
          ...[0,10,58,68,118,170,180,232,280,342,395].map((y, i) =>
            React.createElement('line', { key:'hl'+i, x1: 0, y1: y, x2: 340, y2: y, stroke: t.mapStreet, strokeWidth: y===0||y===395?0:i%3===0?8:5 })
          ),
          // Buildings
          ...buildings.map((b, i) =>
            React.createElement('rect', { key:'blk'+i, x: b.x, y: b.y, width: b.w, height: b.h, fill: t.mapBlock, rx: 3 })
          ),
          // Noise / crowd hotspots
          ...hotspots.map((h, i) => [
            React.createElement('circle', { key:'hs'+i, cx: h.cx, cy: h.cy, r: h.r,         fill: h.color, opacity: 0.18 }),
            React.createElement('circle', { key:'hs2'+i, cx: h.cx, cy: h.cy, r: h.r * .55, fill: h.color, opacity: 0.12 }),
            React.createElement('text', { key:'hlt'+i, x: h.lx, y: h.ly, fontSize: 7.5, fill: h.color, fontFamily: 'DM Sans,sans-serif', fontWeight: '700' }, h.label),
          ]).flat(),
          // Inactive routes (faint)
          ...Object.entries(routes).filter(([k]) => k !== routeType).map(([k, r]) =>
            React.createElement('path', { key:'inactive-'+k, d: r.path, stroke: r.color, strokeWidth: 3, fill: 'none', opacity: 0.15, strokeLinecap: 'round', strokeLinejoin: 'round' })
          ),
          // Active route (animated)
          React.createElement('path', {
            key: 'active-' + routeType,
            d: current.path,
            stroke: current.color, strokeWidth: 5.5, fill: 'none',
            strokeLinecap: 'round', strokeLinejoin: 'round',
            strokeDasharray: 900,
            style: { animation: 'routeDraw 1.3s cubic-bezier(.4,0,.2,1) forwards', filter: `drop-shadow(0 0 7px ${current.color}85)` },
          }),
          // Origin marker
          React.createElement('circle', { cx: 40, cy: 360, r: 11, fill: t.accent, opacity: .22 }),
          React.createElement('circle', { cx: 40, cy: 360, r: 7,  fill: t.accent }),
          React.createElement('circle', { cx: 40, cy: 360, r: 3,  fill: '#FFF' }),
          React.createElement('text', { x: 52, y: 356, fontSize: 8.5, fill: t.textSub, fontFamily: 'DM Sans,sans-serif', fontWeight: '700' }, 'YOU'),
          // Destination marker
          React.createElement('circle', { cx: 295, cy: 40, r: 11, fill: current.color, style: { filter: `drop-shadow(0 0 8px ${current.color})` } }),
          React.createElement('circle', { cx: 295, cy: 40, r: 4.5, fill: '#FFF' }),
          React.createElement('text', { x: 281, y: 30, fontSize: 8.5, fill: t.textSub, fontFamily: 'DM Sans,sans-serif', fontWeight: '700' }, 'WORK'),
        ),
        // Score chip overlay
        React.createElement('div', {
          style: {
            position: 'absolute', top: 10, right: 10,
            background: isDark ? 'rgba(12,18,32,.9)' : 'rgba(255,255,255,.9)',
            backdropFilter: 'blur(8px)', borderRadius: 14, padding: '7px 11px',
            border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 7,
          },
        },
          React.createElement('div', { style: { width: 9, height: 9, borderRadius: '50%', background: current.color, boxShadow: `0 0 7px ${current.color}` } }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, 'Score: ' + current.score)
        )
      ),

      // Route detail card
      React.createElement('div', {
        style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, padding: '12px 14px', marginBottom: 82, flexShrink: 0 },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans',sans-serif" } },
              routeType === 'calm' ? 'Via Elm St & Park Rd' : routeType === 'balanced' ? 'Via 2nd Ave & Maple' : 'Via Oak Ave & 5th St'
            ),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 2, fontFamily: "'DM Sans',sans-serif" } },
              current.time + (routeType === 'calm' ? ' · +5 min vs fastest' : routeType === 'balanced' ? ' · +2 min vs fastest' : ' · fastest option')
            )
          ),
          React.createElement('button', {
            onClick: () => { setNavigating(true); setActiveTab('routes'); },
            style: {
              background: t.gradient, border: 'none', borderRadius: 14, padding: '9px 20px',
              color: '#FFF', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              fontFamily: "'DM Sans',sans-serif", boxShadow: `0 5px 16px ${t.primary}45`,
            },
          }, 'Start')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 7 } },
          React.createElement(MetricPill, { label: 'Noise',    value: routeType === 'calm' ? 'Low' : routeType === 'balanced' ? 'Medium' : 'High', color: routeType === 'calm' ? t.primary : routeType === 'balanced' ? t.warning : t.danger }),
          React.createElement(MetricPill, { label: 'Crowds',   value: routeType === 'calm' ? 'Low' : 'Medium', color: routeType === 'calm' ? t.primary : t.warning }),
          React.createElement(MetricPill, { label: 'Lighting', value: routeType === 'fastest' ? 'Medium' : 'Good', color: routeType === 'fastest' ? t.warning : t.primary })
        )
      )
    );
  }

  // ── ROUTES SCREEN ────────────────────────────────────────────────────────────
  function RoutesScreen() {
    const [feedbackShown, setFeedbackShown] = useState(navigating);
    const [rating, setRating]               = useState(0);
    const [tags, setTags]                   = useState([]);

    const savedRoutes = [
      { id: 1, name: 'Morning Commute',    from: 'Home',      to: 'Office',           score: 84, trips: 23, time: '22 min', tags: ['quiet', 'shaded']     },
      { id: 2, name: 'Evening Wind-down',  from: 'Office',    to: 'Riverside Park',   score: 92, trips: 15, time: '18 min', tags: ['calm', 'scenic']      },
      { id: 3, name: 'Market Run',         from: 'Apartment', to: "Farmer's Market",  score: 77, trips: 8,  time: '14 min', tags: ['accessible']          },
    ];

    const recentTrips = [
      { id: 1, name: 'Blue Bottle Coffee', date: 'Today, 9:14 AM',    score: 88, dur: '11 min' },
      { id: 2, name: 'Union Sq Station',   date: 'Yesterday, 6:30 PM',score: 64, dur: '8 min'  },
      { id: 3, name: "Farmer's Market",    date: 'Sun, 10:02 AM',     score: 91, dur: '14 min' },
    ];

    const feedbackTags = ['Too noisy', 'Great lighting', 'Smooth path', 'Too crowded', 'Perfect', 'Rough sidewalk'];

    return React.createElement('div', {
      className: 'screen-in',
      style: { padding: '14px 14px 88px', overflowY: 'auto', height: '100%' },
    },

      // Active nav banner
      navigating && React.createElement('div', {
        style: { background: t.gradient, borderRadius: 20, padding: '14px 16px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: `0 10px 28px ${t.primary}45` },
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,.72)', fontWeight: 700, letterSpacing: '.07em', fontFamily: "'DM Sans',sans-serif" } }, 'NAVIGATING NOW'),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#FFF', fontFamily: "'Sora',sans-serif" } }, 'Via Elm St · 16 min')
        ),
        React.createElement('button', {
          onClick: () => { setNavigating(false); setFeedbackShown(true); },
          style: { background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 12, padding: '7px 14px', color: '#FFF', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" },
        }, 'End Trip')
      ),

      // Post-trip feedback card
      feedbackShown && React.createElement('div', {
        className: 'fade-in',
        style: { background: t.accentDim, border: `1px solid ${t.accent}35`, borderRadius: 20, padding: '16px', marginBottom: 14 },
      },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans',sans-serif", marginBottom: 3 } }, 'How was that route?'),
        React.createElement('div', { style: { fontSize: 12, color: t.textSub, fontFamily: "'DM Sans',sans-serif", marginBottom: 12 } }, 'Your feedback improves future suggestions'),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 12 } },
          [1,2,3,4,5].map(s =>
            React.createElement('div', {
              key: s,
              onClick: () => { setRating(s); setTimeout(() => setFeedbackShown(false), 700); },
              style: { fontSize: 26, cursor: 'pointer', transition: 'transform .15s ease', transform: s <= rating ? 'scale(1.18)' : 'scale(1)', filter: s <= rating ? 'none' : 'grayscale(1) opacity(.35)' },
            }, '★')
          )
        ),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
          feedbackTags.map((tag, i) => {
            const sel = tags.includes(tag);
            return React.createElement('div', {
              key: i,
              onClick: () => setTags(prev => sel ? prev.filter(x => x !== tag) : [...prev, tag]),
              style: {
                fontSize: 11, padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                background: sel ? t.primary + '1E' : t.card,
                border: `1px solid ${sel ? t.primary : t.border}`,
                color: sel ? t.primary : t.textSub,
                transition: 'all .15s ease',
              },
            }, tag);
          })
        )
      ),

      // Saved routes
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", marginBottom: 10 } }, 'Saved Routes'),
        savedRoutes.map(r => {
          const sc = r.score >= 80 ? t.primary : r.score >= 65 ? t.warning : t.danger;
          return React.createElement('div', {
            key: r.id,
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: '14px', marginBottom: 10 },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, r.name),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'DM Sans',sans-serif", marginTop: 2 } }, r.from + ' → ' + r.to)
              ),
              React.createElement(ComfortRing, { score: r.score, size: 52, strokeWidth: 5 })
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'DM Sans',sans-serif" } }, '⏱ ' + r.time),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'DM Sans',sans-serif" } }, '· ' + r.trips + ' trips'),
              React.createElement('div', { style: { flex: 1 } }),
              r.tags.map((tag, i) =>
                React.createElement('div', {
                  key: i,
                  style: { fontSize: 10, padding: '2px 9px', borderRadius: 20, fontWeight: 600, background: t.primaryDim, color: t.primary, fontFamily: "'DM Sans',sans-serif" },
                }, tag)
              )
            )
          );
        })
      ),

      // Recent trips
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", marginBottom: 10 } }, 'Recent Trips'),
        recentTrips.map(trip => {
          const sc = trip.score >= 80 ? t.primary : t.warning;
          return React.createElement('div', {
            key: trip.id,
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 },
          },
            React.createElement('div', { style: { width: 42, height: 42, borderRadius: 12, background: sc + '16', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(window.lucide.Navigation, { size: 17, color: sc })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, trip.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'DM Sans',sans-serif", marginTop: 2 } }, trip.date)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: sc, fontFamily: "'Sora',sans-serif", lineHeight: 1 } }, trip.score),
              React.createElement('div', { style: { fontSize: 9, color: t.textMuted, fontFamily: "'DM Sans',sans-serif", letterSpacing: '.04em', marginTop: 2 } }, 'COMFORT')
            )
          );
        })
      )
    );
  }

  // ── PROFILE SCREEN ───────────────────────────────────────────────────────────
  function ProfileScreen() {
    const [localPrefs, setLocalPrefs]   = useState({ ...prefs });
    const [stepFree, setStepFree]       = useState(false);
    const [stroller, setStroller]       = useState(false);
    const [notifs, setNotifs]           = useState(true);

    function PrefSlider({ label, pKey, color, icon }) {
      const Icon = icon;
      const val  = localPrefs[pKey];
      return React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { size: 13, color: t.textSub }),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, label)
          ),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color, background: color + '16', padding: '1px 9px', borderRadius: 20, fontFamily: "'DM Sans',sans-serif" } }, val + '%')
        ),
        React.createElement('input', {
          type: 'range', min: 0, max: 100, value: val,
          onChange: e => setLocalPrefs({ ...localPrefs, [pKey]: +e.target.value }),
          style: { width: '100%', accentColor: color, cursor: 'pointer', background: `linear-gradient(to right, ${color} ${val}%, ${t.border} ${val}%)` },
        })
      );
    }

    function ToggleRow({ label, desc, value, onToggle, last }) {
      return React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          paddingBottom: last ? 0 : 14, marginBottom: last ? 0 : 14,
          borderBottom: last ? 'none' : `1px solid ${t.border}`,
        },
      },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, label),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'DM Sans',sans-serif", marginTop: 2 } }, desc)
        ),
        React.createElement(Toggle, { on: value, onToggle })
      );
    }

    return React.createElement('div', {
      className: 'screen-in',
      style: { padding: '14px 14px 88px', overflowY: 'auto', height: '100%' },
    },

      // Profile header
      React.createElement('div', {
        style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 22, padding: '16px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 },
      },
        React.createElement('div', { style: { width: 60, height: 60, borderRadius: 20, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#FFF', fontFamily: "'Sora',sans-serif", flexShrink: 0 } }, 'S'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: "'Sora',sans-serif" } }, 'Sarah Chen'),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'DM Sans',sans-serif", marginTop: 2 } }, '47 trips · New York, NY'),
          React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 10, fontWeight: 700, color: t.primary, background: t.primaryDim, padding: '3px 10px', borderRadius: 20, fontFamily: "'DM Sans',sans-serif" } },
            React.createElement(window.lucide.Leaf, { size: 9, color: t.primary }),
            'Quiet Navigator'
          )
        ),
        // Theme toggle
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: { width: 40, height: 40, borderRadius: 14, background: isDark ? t.warningDim : t.accentDim, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },
        },
          isDark
            ? React.createElement(window.lucide.Sun,  { size: 18, color: t.warning })
            : React.createElement(window.lucide.Moon, { size: 18, color: t.accent  })
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 14 } },
        [
          { label: 'Avg Comfort',  val: '84',   unit: '/100',  color: t.primary },
          { label: 'Calm Trips',   val: '31',   unit: ' total', color: t.accent  },
          { label: 'Stress Saved', val: '2.4',  unit: ' hrs',  color: t.info    },
          { label: 'Extra /trip',  val: '+3.2', unit: ' min',  color: t.warning },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { background: s.color + '09', border: `1px solid ${s.color}20`, borderRadius: 16, padding: '13px 12px' },
          },
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Sora',sans-serif", lineHeight: 1 } },
              s.val,
              React.createElement('span', { style: { fontSize: 12, fontWeight: 500, color: t.textMuted } }, s.unit)
            ),
            React.createElement('div', { style: { fontSize: 11, color: t.textSub, fontFamily: "'DM Sans',sans-serif", marginTop: 4 } }, s.label)
          )
        )
      ),

      // Comfort preferences
      React.createElement('div', {
        style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 22, padding: '16px', marginBottom: 14 },
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", marginBottom: 18 } }, 'Comfort Preferences'),
        React.createElement(PrefSlider, { label: 'Noise Sensitivity',  pKey: 'noise',      color: t.primary, icon: window.lucide.Volume2  }),
        React.createElement(PrefSlider, { label: 'Crowd Avoidance',    pKey: 'crowds',     color: t.accent,  icon: window.lucide.Users    }),
        React.createElement(PrefSlider, { label: 'Lighting Priority',  pKey: 'lighting',   color: t.warning, icon: window.lucide.Sun      }),
        React.createElement(PrefSlider, { label: 'Pavement Smoothness', pKey: 'smoothness', color: t.info,   icon: window.lucide.Compass  }),
      ),

      // Accessibility
      React.createElement('div', {
        style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 22, padding: '16px' },
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", marginBottom: 14 } }, 'Accessibility & Alerts'),
        React.createElement(ToggleRow, { label: 'Step-Free Routes',  desc: 'Avoid stairs and steep inclines',       value: stepFree, onToggle: () => setStepFree(!stepFree)   }),
        React.createElement(ToggleRow, { label: 'Stroller Friendly', desc: 'Smooth, wide sidewalks prioritised',   value: stroller, onToggle: () => setStroller(!stroller)   }),
        React.createElement(ToggleRow, { label: 'Route Alerts',      desc: 'Notify me of disruptions ahead',        value: notifs,   onToggle: () => setNotifs(!notifs), last: true })
      )
    );
  }

  // ── STATUS BAR ───────────────────────────────────────────────────────────────
  function StatusBar() {
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return React.createElement('div', {
      style: { height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 22, paddingRight: 16, paddingTop: 6, background: t.bg, position: 'relative', flexShrink: 0 },
    },
      React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans',sans-serif", zIndex: 1 } }, timeStr),
      // Dynamic Island
      React.createElement('div', { style: { position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 118, height: 32, background: '#000', borderRadius: 20, zIndex: 20 } }),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, zIndex: 1 } },
        React.createElement(window.lucide.Wifi,    { size: 13, color: t.text }),
        React.createElement(window.lucide.Signal,  { size: 13, color: t.text }),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.text, fontFamily: "'DM Sans',sans-serif" } }, '94%'),
        React.createElement(window.lucide.Battery, { size: 16, color: t.text })
      )
    );
  }

  // ── RENDER ───────────────────────────────────────────────────────────────────
  const screens = { home: HomeScreen, map: MapScreen, routes: RoutesScreen, profile: ProfileScreen };
  const CurrentScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#d8d8d8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans',sans-serif" },
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg, borderRadius: 52,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,.58), 0 0 0 10px #111, 0 0 0 12px #2a2a2a',
        display: 'flex', flexDirection: 'column',
      },
    },
      React.createElement(StatusBar),

      // Main content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 } },
        showOnboarding
          ? React.createElement(OnboardingScreen)
          : React.createElement('div', { key: activeTab, style: { height: '100%' } },
              React.createElement(CurrentScreen)
            )
      ),

      // Bottom nav (hidden during onboarding)
      !showOnboarding && React.createElement('div', {
        style: {
          height: 78, background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'flex-start', paddingTop: 8,
          paddingLeft: 4, paddingRight: 4, flexShrink: 0,
        },
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              cursor: 'pointer', padding: '7px 4px', borderRadius: 14,
              background: isActive ? t.primaryDim : 'transparent',
              transition: 'background .2s ease',
            },
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textMuted, strokeWidth: isActive ? 2.5 : 1.8 }),
            React.createElement('span', {
              style: { fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted, fontFamily: "'DM Sans',sans-serif" },
            }, tab.label)
          );
        })
      )
    )
  );
}
