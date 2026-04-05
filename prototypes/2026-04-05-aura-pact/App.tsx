const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FAF5FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F3E8FF',
    primary: '#7C3AED',
    secondary: '#A78BFA',
    cta: '#22C55E',
    text: '#1A0A2E',
    textSub: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E9D5FF',
    navBg: '#FFFFFF',
    cardBg: '#FFFFFF',
    inputBg: '#F3E8FF',
  },
  dark: {
    bg: '#0D0618',
    surface: '#1A0A2E',
    surfaceAlt: '#2D1B4E',
    primary: '#A78BFA',
    secondary: '#7C3AED',
    cta: '#22C55E',
    text: '#F5F0FF',
    textSub: '#C4B5FD',
    textMuted: '#7C6A9A',
    border: '#3D2566',
    navBg: '#1A0A2E',
    cardBg: '#1E0D35',
    inputBg: '#2D1B4E',
  },
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', sans-serif; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.85; }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes breathe {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
        50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(124,58,237,0); }
      }
      @keyframes orb {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(10px, -8px) scale(1.05); }
        66% { transform: translate(-6px, 6px) scale(0.97); }
      }
      .anim-fade { animation: fadeIn 0.4s ease forwards; }
      .anim-slide { animation: slideUp 0.4s ease forwards; }
      .nav-btn:hover { background: rgba(124,58,237,0.08) !important; }
      .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.18) !important; }
      .btn-press:active { transform: scale(0.97); }
      .shimmer-text {
        background: linear-gradient(90deg, #7C3AED 0%, #A78BFA 40%, #7C3AED 80%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 2.5s linear infinite;
      }
      ::-webkit-scrollbar { width: 0; height: 0; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const Icon = ({ name, size = 20, color, strokeWidth = 2 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(LucideIcon, { size, color: color || t.text, strokeWidth });
  };

  // ─── HOME SCREEN ─────────────────────────────────────────────
  const HomeScreen = () => {
    const [activePact, setActivePact] = useState(null);
    const chambers = [
      { id: 1, name: 'Deep Work Sprint', duration: '25 min', participants: 847, startIn: 'Live Now', color: '#7C3AED', icon: 'Zap', tag: 'Focus' },
      { id: 2, name: 'Mindful Pause', duration: '15 min', participants: 412, startIn: '8 min', color: '#06B6D4', icon: 'Wind', tag: 'Meditation' },
      { id: 3, name: 'Morning Pages', duration: '30 min', participants: 239, startIn: '22 min', color: '#F59E0B', icon: 'PenLine', tag: 'Journaling' },
      { id: 4, name: 'Body Scan', duration: '10 min', participants: 188, startIn: '45 min', color: '#10B981', icon: 'Heart', tag: 'Wellness' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.35s ease' }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500, letterSpacing: 1 }}>SUNDAY, APRIL 5</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginTop: 2 }}>Good morning, Kai ✨</div>
          </div>
          <button onClick={() => setIsDark(!isDark)} className="btn-press" style={{ width: 40, height: 40, borderRadius: 12, border: `1.5px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name={isDark ? 'Sun' : 'Moon'} size={18} color={t.primary} />
          </button>
        </div>

        {/* Aura Score Card */}
        <div style={{ margin: '16px 20px', padding: '20px', borderRadius: 20, background: `linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)`, boxShadow: '0 8px 32px rgba(124,58,237,0.35)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', animation: 'orb 6s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: -30, left: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', animation: 'orb 8s ease-in-out infinite reverse' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 1 }}>AURA SCORE</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#FFF', lineHeight: 1.1, marginTop: 4 }}>2,847</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '3px 10px', fontSize: 12, color: '#FFF', fontWeight: 600 }}>🔥 14-day streak</span>
                <span style={{ background: 'rgba(34,197,94,0.3)', borderRadius: 8, padding: '3px 10px', fontSize: 12, color: '#86EFAC', fontWeight: 600 }}>+120 today</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 1 }}>PACTS ACTIVE</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFF', marginTop: 4 }}>3</div>
            </div>
          </div>
        </div>

        {/* Live Chambers */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Live Chambers</div>
            <button onClick={() => setActiveScreen('explore')} style={{ fontSize: 13, color: t.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
              <span>See all</span>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chambers.map((c, i) => (
              <div key={c.id} className="card-hover" onClick={() => setActiveScreen('chamber')} style={{ background: t.cardBg, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s ease', animation: `slideUp ${0.2 + i * 0.07}s ease forwards`, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: c.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={c.icon} size={20} color={c.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{c.name}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 3, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: t.textMuted }}>{c.duration}</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: t.textMuted, display: 'inline-block' }} />
                    <span style={{ fontSize: 12, color: t.textMuted }}>{c.participants} present</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.startIn === 'Live Now' ? '#22C55E' : t.primary, background: c.startIn === 'Live Now' ? '#DCFCE7' : t.surfaceAlt, borderRadius: 8, padding: '3px 8px' }}>{c.startIn === 'Live Now' ? '● LIVE' : `in ${c.startIn}`}</span>
                  <span style={{ fontSize: 11, color: t.textMuted, background: t.surfaceAlt, borderRadius: 6, padding: '2px 6px' }}>{c.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Pacts */}
        <div style={{ padding: '20px 20px 100px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 }}>Your Pact Cycles</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {[
              { name: '7-Day Writing', day: 5, total: 7, color: '#F59E0B' },
              { name: '21-Day Meditation', day: 14, total: 21, color: '#06B6D4' },
              { name: '14-Day Deep Work', day: 2, total: 14, color: '#7C3AED' },
            ].map((p) => (
              <div key={p.name} onClick={() => setActiveScreen('pacts')} className="btn-press" style={{ minWidth: 140, background: t.cardBg, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '14px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: p.color }}>Day {p.day}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 8 }}>of {p.total}</div>
                <div style={{ height: 4, background: t.border, borderRadius: 4 }}>
                  <div style={{ height: '100%', borderRadius: 4, background: p.color, width: `${(p.day / p.total) * 100}%`, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── CHAMBER SCREEN ───────────────────────────────────────────
  const ChamberScreen = () => {
    const [seconds, setSeconds] = useState(1500);
    const [started, setStarted] = useState(false);
    const [affirmation, setAffirmation] = useState(null);
    const [showAffirmations, setShowAffirmations] = useState(false);
    const [floatingAuras, setFloatingAuras] = useState([]);
    const affirmations = ['Focused', 'Peaceful', 'Motivated', 'Grateful', 'Present', 'Strong'];

    useEffect(() => {
      if (!started) return;
      const interval = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
      return () => clearInterval(interval);
    }, [started]);

    useEffect(() => {
      if (affirmation) {
        const id = Date.now();
        setFloatingAuras(prev => [...prev, { id, text: affirmation, x: Math.random() * 60 + 20 }]);
        setTimeout(() => setFloatingAuras(prev => prev.filter(a => a.id !== id)), 2500);
        setTimeout(() => setAffirmation(null), 300);
      }
    }, [affirmation]);

    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    const progress = 1 - seconds / 1500;

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.35s ease', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActiveScreen('home')} className="btn-press" style={{ width: 40, height: 40, borderRadius: 12, border: `1.5px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="ChevronLeft" size={20} color={t.primary} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Deep Work Sprint</div>
            <div style={{ fontSize: 12, color: t.textMuted }}>847 souls present</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', background: '#DCFCE7', borderRadius: 8, padding: '4px 10px' }}>● LIVE</div>
        </div>

        {/* Timer Circle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px 16px', position: 'relative' }}>
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r="90" fill="none" stroke={t.border} strokeWidth="8" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 90}`} strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress)}`} style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{mins}:{secs}</div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>remaining</div>
            </div>
          </div>

          {/* Floating Auras */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {floatingAuras.map(a => (
              <div key={a.id} style={{ position: 'absolute', bottom: '60%', left: `${a.x}%`, transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', color: '#FFF', fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 20, animation: 'slideUp 2.5s ease forwards', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}>
                {a.text}
              </div>
            ))}
          </div>

          {/* Presence Dots */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>Others in this space</div>
            <div style={{ display: 'flex', gap: -4 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${t.bg}`, background: ['#7C3AED', '#A78BFA', '#06B6D4', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#3B82F6'][i], marginLeft: i ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#FFF', fontWeight: 700, animation: `pulse ${2 + i * 0.3}s ease-in-out infinite` }} />
              ))}
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${t.bg}`, background: t.surfaceAlt, marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: t.textMuted, fontWeight: 700 }}>839+</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10 }}>
          <button onClick={() => setStarted(!started)} className="btn-press" style={{ flex: 1, height: 52, borderRadius: 16, background: started ? t.surfaceAlt : 'linear-gradient(135deg, #7C3AED, #A78BFA)', border: started ? `1.5px solid ${t.border}` : 'none', color: started ? t.primary : '#FFF', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s ease' }}>
            <Icon name={started ? 'Pause' : 'Play'} size={18} color={started ? t.primary : '#FFF'} />
            <span>{started ? 'Pause' : 'Begin'}</span>
          </button>
          <button onClick={() => setShowAffirmations(!showAffirmations)} className="btn-press" style={{ width: 52, height: 52, borderRadius: 16, background: t.surfaceAlt, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="Sparkles" size={20} color={t.primary} />
          </button>
        </div>

        {/* Affirmations Panel */}
        {showAffirmations && (
          <div style={{ margin: '0 20px', padding: 16, background: t.cardBg, borderRadius: 16, border: `1.5px solid ${t.border}`, animation: 'slideUp 0.25s ease' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Send Aura Affirmation</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {affirmations.map(a => (
                <button key={a} onClick={() => { setAffirmation(a); setShowAffirmations(false); }} className="btn-press" style={{ padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${t.primary}`, background: 'transparent', color: t.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wisdom Well */}
        <div style={{ margin: '16px 20px 100px', padding: 16, background: `linear-gradient(135deg, ${t.surfaceAlt}, ${t.cardBg})`, borderRadius: 16, border: `1.5px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="BookOpen" size={16} color={t.primary} />
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Wisdom Well Prompt</div>
          </div>
          <div style={{ fontSize: 14, color: t.textSub, lineHeight: 1.6, fontStyle: 'italic' }}>"What is the one thing you are avoiding that, if done today, would make everything else easier?"</div>
          <button onClick={() => setActiveScreen('altar')} style={{ marginTop: 10, fontSize: 12, color: t.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="PenLine" size={14} color={t.primary} />
            <span>Log in Wisdom Well</span>
          </button>
        </div>
      </div>
    );
  };

  // ─── EXPLORE SCREEN ───────────────────────────────────────────
  const ExploreScreen = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Focus', 'Meditation', 'Journaling', 'Movement', 'Wellness'];
    const chambers = [
      { name: 'Deep Work Sprint', duration: '25 min', participants: 847, tag: 'Focus', color: '#7C3AED', icon: 'Zap', live: true },
      { name: 'Mindful Pause', duration: '15 min', participants: 412, tag: 'Meditation', color: '#06B6D4', icon: 'Wind', live: true },
      { name: 'Morning Pages', duration: '30 min', participants: 239, tag: 'Journaling', color: '#F59E0B', icon: 'PenLine', live: false },
      { name: 'Flow State', duration: '50 min', participants: 671, tag: 'Focus', color: '#8B5CF6', icon: 'Brain', live: false },
      { name: 'Body Scan', duration: '10 min', participants: 188, tag: 'Wellness', color: '#10B981', icon: 'Heart', live: true },
      { name: 'Gratitude Log', duration: '10 min', participants: 332, tag: 'Journaling', color: '#EC4899', icon: 'Star', live: false },
      { name: 'Breathwork', duration: '12 min', participants: 509, tag: 'Movement', color: '#F97316', icon: 'Activity', live: false },
      { name: 'Cold Clarity', duration: '5 min', participants: 127, tag: 'Wellness', color: '#3B82F6', icon: 'Snowflake', live: false },
    ];
    const filtered = filter === 'All' ? chambers : chambers.filter(c => c.tag === filter);

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.35s ease' }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Explore Chambers</div>
          <div style={{ fontSize: 14, color: t.textMuted, marginTop: 2 }}>Find your practice space</div>
        </div>

        {/* Search */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.inputBg, borderRadius: 14, padding: '10px 14px', border: `1.5px solid ${t.border}` }}>
            <Icon name="Search" size={16} color={t.textMuted} />
            <input placeholder="Search rituals..." style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 14, color: t.text, fontFamily: 'Inter, sans-serif' }} />
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ padding: '14px 20px 0', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className="btn-press" style={{ flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: `1.5px solid ${filter === f ? t.primary : t.border}`, background: filter === f ? t.primary : 'transparent', color: filter === f ? '#FFF' : t.textSub, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Chamber Grid */}
        <div style={{ padding: '16px 20px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map((c, i) => (
            <div key={c.name} className="card-hover" onClick={() => setActiveScreen('chamber')} style={{ background: t.cardBg, border: `1.5px solid ${t.border}`, borderRadius: 18, padding: '16px', cursor: 'pointer', transition: 'all 0.2s ease', animation: `slideUp ${0.15 + i * 0.05}s ease forwards` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: c.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={c.icon} size={18} color={c.color} />
                </div>
                {c.live && <span style={{ fontSize: 10, fontWeight: 700, color: '#22C55E', background: '#DCFCE7', borderRadius: 6, padding: '2px 7px' }}>LIVE</span>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 6 }}>{c.duration}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="Users" size={11} color={t.textMuted} />
                <span style={{ fontSize: 11, color: t.textMuted }}>{c.participants.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── PACTS SCREEN ─────────────────────────────────────────────
  const PactsScreen = () => {
    const [tab, setTab] = useState('active');
    const pacts = {
      active: [
        { name: '7-Day Writing Pact', day: 5, total: 7, color: '#F59E0B', members: 234, icon: 'PenLine', streak: 5 },
        { name: '21-Day Meditation', day: 14, total: 21, color: '#06B6D4', members: 891, icon: 'Wind', streak: 14 },
        { name: '14-Day Deep Work', day: 2, total: 14, color: '#7C3AED', members: 1204, icon: 'Zap', streak: 2 },
      ],
      discover: [
        { name: '30-Day Journaling', total: 30, color: '#EC4899', members: 3421, icon: 'BookOpen' },
        { name: '7-Day Gratitude', total: 7, color: '#10B981', members: 567, icon: 'Star' },
        { name: '14-Day Breathwork', total: 14, color: '#F97316', members: 789, icon: 'Activity' },
        { name: '21-Day Movement', total: 21, color: '#8B5CF6', members: 2103, icon: 'Dumbbell' },
      ],
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.35s ease' }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Pact Cycles</div>
          <div style={{ fontSize: 14, color: t.textMuted, marginTop: 2 }}>Commit. Show up. Transform.</div>
        </div>

        {/* Tabs */}
        <div style={{ padding: '14px 20px 0', display: 'flex', gap: 0, background: t.inputBg, margin: '14px 20px 0', borderRadius: 14, padding: '4px', border: `1.5px solid ${t.border}` }}>
          {[['active', 'My Pacts'], ['discover', 'Discover']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', background: tab === key ? t.primary : 'transparent', color: tab === key ? '#FFF' : t.textMuted, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease' }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ padding: '16px 20px 100px' }}>
          {tab === 'active' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pacts.active.map((p, i) => (
                <div key={p.name} className="card-hover" style={{ background: t.cardBg, border: `1.5px solid ${t.border}`, borderRadius: 18, padding: '18px', cursor: 'pointer', transition: 'all 0.2s ease', animation: `slideUp ${0.15 + i * 0.07}s ease forwards` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 14, background: p.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={p.icon} size={22} color={p.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{p.members.toLocaleString()} members</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: p.color }}>Day {p.day}</div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>of {p.total}</div>
                    </div>
                  </div>
                  <div style={{ height: 6, background: t.border, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`, width: `${(p.day / p.total) * 100}%`, transition: 'width 0.6s ease' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 12, color: t.textMuted }}>{Math.round((p.day / p.total) * 100)}% complete</span>
                    <span style={{ fontSize: 12, color: p.color, fontWeight: 600 }}>🔥 {p.streak}-day streak</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pacts.discover.map((p, i) => (
                <div key={p.name} className="card-hover" style={{ background: t.cardBg, border: `1.5px solid ${t.border}`, borderRadius: 18, padding: '16px', cursor: 'pointer', transition: 'all 0.2s ease', animation: `slideUp ${0.15 + i * 0.07}s ease forwards`, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: p.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={p.icon} size={20} color={p.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{p.members.toLocaleString()} in this pact</div>
                  </div>
                  <button className="btn-press" style={{ padding: '8px 16px', borderRadius: 20, background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', border: 'none', color: '#FFF', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                    <span>Join</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── ALTAR SCREEN ─────────────────────────────────────────────
  const AltarScreen = () => {
    const [altarColor, setAltarColor] = useState('#7C3AED');
    const [auraName, setAuraName] = useState('Kai');
    const [wisdomEntry, setWisdomEntry] = useState('');
    const [entries, setEntries] = useState([
      { date: 'Apr 4', text: 'Today I pushed through the resistance. The first 5 minutes are always the hardest, but once I began, the words flowed freely.', ritual: 'Deep Work' },
      { date: 'Apr 3', text: 'Noticed how much calmer I feel after my morning meditation. My thoughts are clearer and I respond rather than react.', ritual: 'Mindful Pause' },
    ]);
    const colors = ['#7C3AED', '#06B6D4', '#F59E0B', '#10B981', '#EC4899', '#F97316', '#3B82F6', '#8B5CF6'];

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.35s ease' }}>
        {/* Personal Altar */}
        <div style={{ margin: '20px', padding: '20px', borderRadius: 20, background: `linear-gradient(135deg, ${altarColor}22, ${altarColor}11)`, border: `2px solid ${altarColor}44` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 68, height: 68, borderRadius: 22, background: `linear-gradient(135deg, ${altarColor}, ${altarColor}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, animation: 'breathe 4s ease-in-out infinite', boxShadow: `0 8px 24px ${altarColor}55` }}>
              <Icon name="Flame" size={32} color="#FFF" />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>{auraName}</div>
              <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>Level 7 · Aura Weaver</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, background: altarColor + '22', color: altarColor, borderRadius: 6, padding: '2px 8px' }}>2,847 pts</span>
                <span style={{ fontSize: 11, fontWeight: 600, background: '#F59E0B22', color: '#F59E0B', borderRadius: 6, padding: '2px 8px' }}>🔥 14 streak</span>
              </div>
            </div>
          </div>

          {/* Altar Color */}
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 8, letterSpacing: 0.5 }}>ALTAR COLOR</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {colors.map(c => (
              <button key={c} onClick={() => setAltarColor(c)} className="btn-press" style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: altarColor === c ? `3px solid ${t.text}` : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s ease' }} />
            ))}
          </div>
        </div>

        {/* Wisdom Well */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon name="BookOpen" size={18} color={t.primary} />
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Wisdom Well</div>
          </div>

          <div style={{ background: t.cardBg, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '12px', marginBottom: 12 }}>
            <textarea value={wisdomEntry} onChange={e => setWisdomEntry(e.target.value)} placeholder="Log your reflection..." style={{ width: '100%', minHeight: 80, background: 'none', border: 'none', outline: 'none', fontSize: 14, color: t.text, fontFamily: 'Inter, sans-serif', lineHeight: 1.6, resize: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => { if (wisdomEntry.trim()) { setEntries(prev => [{ date: 'Apr 5', text: wisdomEntry, ritual: 'Deep Work' }, ...prev]); setWisdomEntry(''); }}} className="btn-press" style={{ padding: '8px 18px', borderRadius: 12, background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', border: 'none', color: '#FFF', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <span>Save Entry</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 100 }}>
            {entries.map((e, i) => (
              <div key={i} style={{ background: t.cardBg, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '14px', animation: `slideUp ${0.15 + i * 0.07}s ease` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.primary, background: t.surfaceAlt, borderRadius: 6, padding: '2px 8px' }}>{e.ritual}</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{e.date}</span>
                </div>
                <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>{e.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── NAVIGATION ───────────────────────────────────────────────
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'chamber', label: 'Chamber', icon: 'Flame' },
    { id: 'pacts', label: 'Pacts', icon: 'Shield' },
    { id: 'altar', label: 'Altar', icon: 'User' },
  ];

  const screens = { home: HomeScreen, explore: ExploreScreen, chamber: ChamberScreen, pacts: PactsScreen, altar: AltarScreen };
  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, borderRadius: 44, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', background: t.bg, position: 'relative' }}>
        {/* App Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Navigation */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 0 20px', display: 'flex', backdropFilter: 'blur(20px)' }}>
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button key={item.id} className="nav-btn" onClick={() => setActiveScreen(item.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0', borderRadius: 10, transition: 'all 0.15s ease', minHeight: 44 }}>
                <div style={{ width: 28, height: 28, borderRadius: 10, background: isActive ? t.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}>
                  <Icon name={item.icon} size={16} color={isActive ? '#FFF' : t.textMuted} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted, transition: 'all 0.2s ease' }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
