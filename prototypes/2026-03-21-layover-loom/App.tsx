const { useState, useEffect } = React;

const {
  MapPin, Clock, RefreshCw, Star, ArrowRight, ChevronRight,
  CheckCircle, Wifi, Battery, Home, Compass, Bell, User,
  BookOpen, AlertTriangle, Navigation, Zap, Sun, Moon, Luggage,
  Coffee, ShoppingBag, Bed, Wind,
} = window.lucide;

function App() {
  const themes = {
    dark: {
      bg: '#09101f',
      surface: '#111827',
      card: '#1a2438',
      cardAlt: '#1f2d44',
      border: 'rgba(255,255,255,0.08)',
      borderStrong: 'rgba(255,255,255,0.14)',
      text: '#f0f4ff',
      subtext: '#c5cde0',
      muted: '#6b7a99',
      primary: '#f4a130',
      primaryDim: 'rgba(244,161,48,0.13)',
      primaryText: '#0a0e1a',
      blue: '#4b9cf5',
      blueDim: 'rgba(75,156,245,0.13)',
      green: '#34d399',
      greenDim: 'rgba(52,211,153,0.13)',
      red: '#f87171',
      redDim: 'rgba(248,113,113,0.13)',
      yellow: '#fbbf24',
      nav: '#0f1624',
      navBorder: 'rgba(255,255,255,0.09)',
    },
    light: {
      bg: '#ede9df',
      surface: '#faf8f3',
      card: '#ffffff',
      cardAlt: '#f4f1ea',
      border: 'rgba(0,0,0,0.07)',
      borderStrong: 'rgba(0,0,0,0.13)',
      text: '#1a1f2e',
      subtext: '#374151',
      muted: '#8d95a5',
      primary: '#d97706',
      primaryDim: 'rgba(217,119,6,0.1)',
      primaryText: '#ffffff',
      blue: '#2563eb',
      blueDim: 'rgba(37,99,235,0.1)',
      green: '#059669',
      greenDim: 'rgba(5,150,105,0.1)',
      red: '#dc2626',
      redDim: 'rgba(220,38,38,0.1)',
      yellow: '#d97706',
      nav: '#ffffff',
      navBorder: 'rgba(0,0,0,0.07)',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('food');
  const [luggage, setLuggage] = useState('carry-on');
  const [energy, setEnergy] = useState('medium');
  const [walkPace, setWalkPace] = useState('normal');
  const [planReady, setPlanReady] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [pressed, setPressed] = useState(null);
  const [currentTime, setCurrentTime] = useState('14:22');
  const [alertDismissed, setAlertDismissed] = useState(false);

  const t = isDark ? themes.dark : themes.light;
  const font = "'Space Grotesk', sans-serif";

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setCurrentTime(
        d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
      );
    };
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  const handleGenerate = () => {
    if (generating) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setPlanReady(true);
      setActiveTab('plan');
    }, 1900);
  };

  const ps = (id) => ({
    transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.15s ease',
  });

  // ── STATUS BAR ──────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 22px 0', fontFamily: font }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{currentTime}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Wifi size={12} color={t.muted} />
        <span style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>LTE</span>
        <Battery size={12} color={t.muted} />
      </div>
    </div>
  );

  // ── DYNAMIC ISLAND ──────────────────────────────────────────
  const Island = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 10px' }}>
      <div style={{ width: 118, height: 32, background: '#000', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 22px' }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#181818' }} />
        <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#181818' }} />
      </div>
    </div>
  );

  // ── HOME SCREEN ─────────────────────────────────────────────
  const HomeScreen = () => {
    const luggageOpts = [
      { id: 'carry-on', label: '🧳 Carry-on' },
      { id: 'checked', label: '🎒 Checked' },
      { id: 'no-bag', label: '🤲 No bag' },
    ];
    const energyOpts = [
      { id: 'low', label: '😴 Low' },
      { id: 'medium', label: '🙂 Medium' },
      { id: 'high', label: '⚡ High' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 90px', fontFamily: font }}>
        {/* Location row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <MapPin size={13} color={t.primary} />
              <span style={{ fontSize: 12, fontWeight: 600, color: t.primary, letterSpacing: 0.3 }}>Tokyo Station, JP</span>
            </div>
            <div style={{ fontSize: 21, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>Shinkansen Layover</div>
          </div>
          <div style={{ background: t.greenDim, border: `1px solid ${t.green}`, borderRadius: 20, padding: '4px 11px', marginTop: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: t.green, letterSpacing: 0.5 }}>ON TRACK</span>
          </div>
        </div>

        {/* Time Pocket Hero */}
        <div style={{
          background: `linear-gradient(140deg, #e8941a 0%, #c96f0a 100%)`,
          borderRadius: 22, padding: '22px 22px 20px', marginBottom: 14,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -18, top: -22, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', right: 24, bottom: -28, width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>
            Time Pocket Available
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1 }}>47</span>
            <span style={{ fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>min</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', marginBottom: 16 }}>
            Until you must return to the gate
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['🚄 Platform 14', '⏰ Departs 16:09', '☔ Light rain'].map((tag, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.22)', borderRadius: 10, padding: '4px 10px', fontSize: 11, color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Mini stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Buffer', value: '13 min', color: t.green },
            { label: 'Radius', value: '400 m', color: t.blue },
            { label: 'Options', value: '14', color: t.primary },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: t.card, borderRadius: 14, padding: '12px 10px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: t.muted, fontWeight: 500, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Luggage */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Luggage</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {luggageOpts.map(o => (
              <div key={o.id} onClick={() => setLuggage(o.id)}
                style={{ flex: 1, padding: '9px 4px', background: luggage === o.id ? t.primaryDim : t.card, border: `1.5px solid ${luggage === o.id ? t.primary : t.border}`, borderRadius: 12, textAlign: 'center', fontSize: 11, fontWeight: 600, color: luggage === o.id ? t.primary : t.muted, cursor: 'pointer', transition: 'all 0.18s' }}>
                {o.label}
              </div>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Energy Level</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {energyOpts.map(o => (
              <div key={o.id} onClick={() => setEnergy(o.id)}
                style={{ flex: 1, padding: '9px 4px', background: energy === o.id ? t.primaryDim : t.card, border: `1.5px solid ${energy === o.id ? t.primary : t.border}`, borderRadius: 12, textAlign: 'center', fontSize: 11, fontWeight: 600, color: energy === o.id ? t.primary : t.muted, cursor: 'pointer', transition: 'all 0.18s' }}>
                {o.label}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          onClick={handleGenerate}
          onMouseDown={() => setPressed('gen')}
          onMouseUp={() => setPressed(null)}
          onTouchStart={() => setPressed('gen')}
          onTouchEnd={() => setPressed(null)}
          style={{ background: generating ? t.border : `linear-gradient(135deg, ${t.primary}, #c96f0a)`, borderRadius: 18, padding: '17px', textAlign: 'center', cursor: generating ? 'default' : 'pointer', ...ps('gen'), boxShadow: generating ? 'none' : `0 8px 28px rgba(244,161,48,0.32)` }}>
          {generating ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <RefreshCw size={17} color={t.muted} style={{ animation: 'spin 0.9s linear infinite' }} />
              <span style={{ color: t.muted, fontWeight: 700, fontSize: 15, fontFamily: font }}>Looming your time…</span>
            </div>
          ) : (
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, fontFamily: font, letterSpacing: 0.3 }}>✦  Loom My Time</span>
          )}
        </div>
      </div>
    );
  };

  // ── PLAN SCREEN ─────────────────────────────────────────────
  const PlanScreen = () => {
    const steps = [
      { dot: t.muted, type: 'walk', time: 'Now', dur: '3 min', icon: '🚶', title: 'Walk to Ramen spot', sub: 'Indoor covered route · B1 level' },
      { dot: t.primary, type: 'stop', time: '+3 min', dur: '15 min', icon: '🍜', title: 'Tanaka Ramen Co.', sub: '¥850 · Counter seating · Fast service', tag: 'Food', tagColor: t.primary },
      { dot: t.muted, type: 'walk', time: '+18 min', dur: '4 min', icon: '🚶', title: 'Walk to power lounge', sub: 'East wing, 3rd floor' },
      { dot: t.blue, type: 'stop', time: '+22 min', dur: '10 min', icon: '🔌', title: 'East Wing Power Lounge', sub: 'Free outlets · Fast wifi · Quiet', tag: 'Rest', tagColor: t.blue },
      { dot: t.muted, type: 'walk', time: '+32 min', dur: '2 min', icon: '🚶', title: 'Head back to platform', sub: 'Return via central corridor' },
      { dot: t.yellow, type: 'buffer', time: '+34 min', dur: '13 min', icon: '🚄', title: 'Gate closes · Platform 14', sub: '✓ 13 min to spare — you\'re good', tag: 'Buffer', tagColor: t.yellow },
    ];

    if (!planReady) {
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', fontFamily: font }}>
          <div style={{ fontSize: 52, marginBottom: 18 }}>🧵</div>
          <div style={{ fontSize: 19, fontWeight: 700, color: t.text, marginBottom: 10, textAlign: 'center' }}>No plan yet</div>
          <div style={{ fontSize: 14, color: t.muted, textAlign: 'center', lineHeight: 1.7 }}>
            Go to Home and tap "Loom My Time" to generate your personalized time pocket plan.
          </div>
          <div onClick={() => setActiveTab('home')} style={{ marginTop: 24, background: t.primary, borderRadius: 14, padding: '13px 30px', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: font }}>Go to Home →</span>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 90px', fontFamily: font }}>
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 21, fontWeight: 700, color: t.text, marginBottom: 6 }}>Your Time Pocket</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ background: t.primaryDim, borderRadius: 20, padding: '4px 12px', fontSize: 11, color: t.primary, fontWeight: 700 }}>47 min optimized</div>
            <div style={{ background: t.greenDim, borderRadius: 20, padding: '4px 12px', fontSize: 11, color: t.green, fontWeight: 700 }}>✓ On time</div>
          </div>
        </div>

        {/* Confidence */}
        <div style={{ background: t.card, borderRadius: 16, padding: 16, marginBottom: 20, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Plan Confidence</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: t.green }}>94%</span>
          </div>
          <div style={{ height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '94%', height: '100%', background: `linear-gradient(90deg, ${t.green}, ${t.primary})`, borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: t.muted, marginTop: 8 }}>
            Carry-on · Medium energy · Indoor route · 13 min buffer
          </div>
        </div>

        {/* Timeline */}
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', marginBottom: 2 }}>
            <div style={{ width: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: s.dot, border: `2px solid ${t.surface}`, marginTop: 13, flexShrink: 0, zIndex: 1 }} />
              {i < steps.length - 1 && (
                <div style={{ width: 2, flex: 1, minHeight: 18, background: t.border }} />
              )}
            </div>
            <div style={{ flex: 1, paddingLeft: 8, paddingBottom: 10 }}>
              <div style={{ fontSize: 10, color: t.muted, marginBottom: 5, fontWeight: 600 }}>{s.time} · {s.dur}</div>
              {s.type !== 'walk' ? (
                <div style={{ background: t.card, borderRadius: 14, padding: '13px 14px', border: `1px solid ${s.type === 'buffer' ? `${t.yellow}40` : t.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{s.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{s.title}</div>
                        <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{s.sub}</div>
                      </div>
                    </div>
                    {s.tag && (
                      <div style={{ background: `${s.tagColor}22`, borderRadius: 8, padding: '3px 8px', fontSize: 10, color: s.tagColor, fontWeight: 700, flexShrink: 0 }}>
                        {s.tag}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ paddingLeft: 4, paddingBottom: 4 }}>
                  <span style={{ fontSize: 12, color: t.muted, fontStyle: 'italic' }}>{s.icon}  {s.sub}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Regenerate */}
        <div onClick={handleGenerate} style={{ marginTop: 10, background: t.card, border: `1.5px dashed ${t.border}`, borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
          <RefreshCw size={15} color={t.muted} />
          <span style={{ fontSize: 13, color: t.muted, fontWeight: 500 }}>Regenerate with different options</span>
        </div>
      </div>
    );
  };

  // ── EXPLORE SCREEN ──────────────────────────────────────────
  const ExploreScreen = () => {
    const cats = [
      { id: 'food', label: 'Food', emoji: '🍜' },
      { id: 'rest', label: 'Rest', emoji: '😴' },
      { id: 'errand', label: 'Errands', emoji: '🛍' },
      { id: 'wander', label: 'Wander', emoji: '🧭' },
    ];
    const places = {
      food: [
        { name: 'Tanaka Ramen Co.', type: 'Ramen · ¥850', dist: '3 min walk', time: '12 min', rating: 4.8, tags: ['Indoor', 'Fast', 'Carry-on OK'], ok: true },
        { name: 'Kissa Tora Café', type: 'Coffee · ¥580', dist: '5 min walk', time: '8 min sit', rating: 4.6, tags: ['Quiet', 'Outlets', 'Wi-Fi'], ok: true },
        { name: 'Ekiben Corner', type: 'Bento box · ¥1,200', dist: '2 min walk', time: 'Takeaway', rating: 4.4, tags: ['Fast', 'Local pick'], ok: true },
        { name: 'Green Salad Lab', type: 'Healthy · ¥950', dist: '9 min walk', time: '18 min total', rating: 4.3, tags: ['Healthy', 'Too far'], ok: false },
      ],
      rest: [
        { name: 'Hakken Nap Pod', type: 'Rest pod · ¥500 / 30 min', dist: '4 min walk', time: '30 min', rating: 4.9, tags: ['Dark', 'Quiet', 'Alarm'], ok: true },
        { name: 'East Wing Lounge', type: 'Free lounge', dist: '6 min walk', time: 'Any duration', rating: 4.5, tags: ['Outlets', 'Wi-Fi', 'Seats'], ok: true },
        { name: 'Station Garden', type: 'Outdoor seating', dist: '8 min walk', time: 'Any', rating: 4.1, tags: ['Outdoor', '⚠ Rain risk'], ok: false },
      ],
      errand: [
        { name: 'Welcia Pharmacy', type: 'Medicine & travel supplies', dist: '3 min walk', time: '5 min', rating: 4.5, tags: ['Quick', 'Cards OK'], ok: true },
        { name: 'Coin Locker B2', type: 'Luggage storage · ¥400', dist: '2 min walk', time: 'Drop & go', rating: 4.7, tags: ['IC card', 'Large size'], ok: true },
        { name: 'Yodobashi Camera', type: 'Electronics & adapters', dist: '6 min walk', time: '10 min browse', rating: 4.6, tags: ['Fast', 'Wide stock'], ok: true },
      ],
      wander: [
        { name: 'Marunouchi Covered Loop', type: '500 m stroll', dist: 'Start here', time: '12 min', rating: 4.7, tags: ['Covered', 'Scenic', 'Flat'], ok: true },
        { name: 'Station Art Gallery', type: 'Free mini-exhibition', dist: '4 min walk', time: '8 min', rating: 4.4, tags: ['Indoor', 'Free entry'], ok: true },
        { name: 'Imperial Palace View', type: 'Iconic viewpoint', dist: '14 min walk', time: '28 min total', rating: 4.9, tags: ['Outdoor', 'Too far'], ok: false },
      ],
    };
    const list = places[activeCategory] || [];
    return (
      <div style={{ flex: 1, overflowY: 'auto', fontFamily: font }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, padding: '4px 16px 14px', overflowX: 'auto' }}>
          {cats.map(c => (
            <div key={c.id} onClick={() => setActiveCategory(c.id)}
              style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: activeCategory === c.id ? t.primary : t.card, border: `1.5px solid ${activeCategory === c.id ? t.primary : t.border}`, borderRadius: 20, cursor: 'pointer', transition: 'all 0.18s' }}>
              <span style={{ fontSize: 15 }}>{c.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: activeCategory === c.id ? '#fff' : t.text, whiteSpace: 'nowrap' }}>{c.label}</span>
            </div>
          ))}
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 6, padding: '0 16px 14px' }}>
          {['⏱ Under 15 min', '🏠 Indoor only', '🧳 Carry-on OK'].map((f, i) => (
            <div key={i} style={{ background: i === 0 ? t.primaryDim : t.card, border: `1px solid ${i === 0 ? t.primary : t.border}`, borderRadius: 20, padding: '4px 10px', fontSize: 10, color: i === 0 ? t.primary : t.muted, fontWeight: 600, flexShrink: 0 }}>
              {f}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div style={{ padding: '0 16px 90px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map((p, i) => (
            <div key={i} style={{ background: t.card, borderRadius: 18, padding: 16, border: `1px solid ${t.border}`, opacity: p.ok ? 1 : 0.55, position: 'relative', overflow: 'hidden' }}>
              {!p.ok && (
                <div style={{ position: 'absolute', top: 12, right: 12, background: t.redDim, borderRadius: 8, padding: '2px 8px', fontSize: 9, color: t.red, fontWeight: 700 }}>
                  OUT OF RANGE
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ flex: 1, marginRight: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: t.muted }}>{p.type}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.primary }}>{p.dist}</div>
                  <div style={{ fontSize: 11, color: t.muted }}>{p.time}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {p.tags.map((tag, ti) => (
                  <div key={ti} style={{ background: t.cardAlt, borderRadius: 7, padding: '2px 8px', fontSize: 10, color: t.subtext, fontWeight: 500 }}>{tag}</div>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Star size={11} color={t.primary} fill={t.primary} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{p.rating}</span>
                </div>
              </div>
              {p.ok && (
                <div onClick={() => { setPlanReady(true); setActiveTab('plan'); }}
                  style={{ marginTop: 12, background: t.primaryDim, borderRadius: 10, padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 12, color: t.primary, fontWeight: 700 }}>Add to my plan</span>
                  <ArrowRight size={14} color={t.primary} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── ALERTS SCREEN ───────────────────────────────────────────
  const AlertsScreen = () => {
    const alerts = [
      { type: 'warn', icon: '⚠️', title: 'Gate moved: A12 → B14', body: 'Your platform changed. Add 4 min to your return time. Buffer reduced to 9 min — update plan recommended.', time: '2 min ago', read: false },
      { type: 'info', icon: '🌧', title: 'Rain increasing at 15:50', body: 'Light drizzle expected near south exits. Your plan uses the indoor B1 route — no change needed.', time: '5 min ago', read: false },
      { type: 'ok', icon: '✅', title: 'Train running on time', body: 'Shinkansen N700 to Osaka is confirmed on schedule. Departure 16:09 from Platform 14.', time: '9 min ago', read: true },
      { type: 'danger', icon: '🔴', title: 'Power Lounge at capacity', body: 'East Wing Lounge is full. Alternative: North Concourse near exit C has 4 free outlets.', time: '13 min ago', read: true },
      { type: 'tip', icon: '💡', title: 'Luggage storage nearby', body: 'Coin Locker B2 has 5 large slots free (2 min walk). Drop your bag to extend walk radius by +200 m.', time: '17 min ago', read: true },
    ];
    const colorMap = {
      warn: { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', dot: t.yellow },
      info: { bg: t.blueDim, border: 'rgba(75,156,245,0.3)', dot: t.blue },
      ok: { bg: t.greenDim, border: 'rgba(52,211,153,0.3)', dot: t.green },
      danger: { bg: t.redDim, border: 'rgba(248,113,113,0.3)', dot: t.red },
      tip: { bg: t.primaryDim, border: 'rgba(244,161,48,0.3)', dot: t.primary },
    };
    const unread = alerts.filter(a => !a.read).length;
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 90px', fontFamily: font }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 21, fontWeight: 700, color: t.text }}>Live Alerts</div>
          {unread > 0 && (
            <div style={{ background: t.redDim, border: `1px solid ${t.red}`, borderRadius: 20, padding: '3px 11px', fontSize: 11, color: t.red, fontWeight: 700 }}>
              {unread} new
            </div>
          )}
        </div>

        {/* Buffer status */}
        <div style={{ background: t.card, borderRadius: 16, padding: 16, marginBottom: 18, border: `1px solid rgba(251,191,36,0.25)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Return Buffer</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: t.yellow }}>9 min ⚠️</span>
          </div>
          <div style={{ height: 7, background: t.border, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: '28%', height: '100%', background: `linear-gradient(90deg, ${t.red}, ${t.yellow})`, borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 11, color: t.muted }}>Gate change reduced your buffer — tap to update plan</div>
        </div>

        {/* Alert list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {alerts.map((a, i) => {
            const c = colorMap[a.type];
            return (
              <div key={i} style={{ background: a.read ? t.card : c.bg, border: `1px solid ${a.read ? t.border : c.border}`, borderRadius: 16, padding: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: t.text, flex: 1 }}>{a.title}</span>
                      {!a.read && (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.dot, marginTop: 3, marginLeft: 6, flexShrink: 0 }} />
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: t.subtext, lineHeight: 1.55 }}>{a.body}</div>
                    <div style={{ fontSize: 10, color: t.muted, marginTop: 6 }}>{a.time}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── SETTINGS SCREEN ─────────────────────────────────────────
  const SettingsScreen = () => {
    const paceOpts = [
      { id: 'slow', label: '🐢 Slow', sub: '3 km/h' },
      { id: 'normal', label: '🚶 Normal', sub: '4.5 km/h' },
      { id: 'fast', label: '⚡ Fast', sub: '6 km/h' },
    ];
    const Row = ({ icon, label, value }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 17 }}>{icon}</span>
          <span style={{ fontSize: 14, color: t.text, fontWeight: 500, fontFamily: font }}>{label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, color: t.muted, fontFamily: font }}>{value}</span>
          <ChevronRight size={15} color={t.muted} />
        </div>
      </div>
    );
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0 90px', fontFamily: font }}>
        {/* Profile card */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ background: t.card, borderRadius: 20, padding: '18px 18px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, #c96f0a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
              🧳
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>Business Traveler</div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>Frequent flyer · Tokyo route</div>
            </div>
          </div>
        </div>

        {/* Theme toggle */}
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            <div style={{ padding: '11px 16px 8px', fontSize: 10, fontWeight: 700, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Appearance</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 17 }}>{isDark ? '🌙' : '☀️'}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>Dark Mode</span>
              </div>
              <div onClick={() => setIsDark(!isDark)}
                style={{ width: 48, height: 28, borderRadius: 14, background: isDark ? t.primary : t.border, cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                <div style={{ position: 'absolute', top: 3, left: isDark ? 22 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.28)', transition: 'left 0.28s ease' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Travel prefs */}
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            <div style={{ padding: '11px 16px 8px', fontSize: 10, fontWeight: 700, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Travel Profile</div>
            <Row icon="🧳" label="Default Luggage" value="Carry-on" />
            <Row icon="⏱" label="Return Buffer" value="12 min" />
            <Row icon="🗺" label="Language" value="English" />
            <Row icon="🔔" label="Alert Style" value="Push + sound" />
          </div>
        </div>

        {/* Walking pace */}
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Walking Pace</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {paceOpts.map(p => (
              <div key={p.id} onClick={() => setWalkPace(p.id)}
                style={{ flex: 1, background: walkPace === p.id ? t.primaryDim : t.card, border: `1.5px solid ${walkPace === p.id ? t.primary : t.border}`, borderRadius: 14, padding: '12px 8px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.18s' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{p.label.split(' ')[0]}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: walkPace === p.id ? t.primary : t.text }}>{p.label.split(' ')[1]}</div>
                <div style={{ fontSize: 10, color: t.muted }}>{p.sub}</div>
                {walkPace === p.id && (
                  <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle size={14} color={t.primary} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '8px 16px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: t.muted }}>Layover Loom v1.0.0 · Made for wanderers</div>
        </div>
      </div>
    );
  };

  // ── NAV BAR ─────────────────────────────────────────────────
  const navTabs = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'plan', label: 'Plan', Icon: BookOpen },
    { id: 'explore', label: 'Explore', Icon: Compass },
    { id: 'alerts', label: 'Alerts', Icon: Bell },
    { id: 'settings', label: 'Profile', Icon: User },
  ];

  const NavBar = () => (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: t.nav, borderTop: `1px solid ${t.navBorder}`, display: 'flex', padding: '10px 0 18px', zIndex: 100 }}>
      {navTabs.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        const hasAlert = id === 'alerts';
        return (
          <div key={id} onClick={() => setActiveTab(id)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Icon size={22} color={active ? t.primary : t.muted} strokeWidth={active ? 2.5 : 1.5} />
              {hasAlert && !alertDismissed && (
                <div style={{ position: 'absolute', top: -2, right: -3, width: 8, height: 8, borderRadius: '50%', background: t.red, border: `1.5px solid ${t.nav}` }} />
              )}
            </div>
            <span style={{ fontSize: 10, color: active ? t.primary : t.muted, fontWeight: active ? 700 : 400, fontFamily: font }}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  const screenTitles = { home: null, plan: 'My Plan', explore: 'Explore', alerts: 'Live Alerts', settings: 'Settings' };

  // ── ROOT ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#1a1f2e' : '#d4cfc4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: t.surface,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 0 10px #111, 0 0 0 12px #222, 0 30px 80px rgba(0,0,0,0.55)',
      }}>
        <StatusBar />
        <Island />

        {/* Screen title */}
        {screenTitles[activeTab] && (
          <div style={{ padding: '0 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font }}>{screenTitles[activeTab]}</div>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'plan' && <PlanScreen />}
          {activeTab === 'explore' && <ExploreScreen />}
          {activeTab === 'alerts' && <AlertsScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </div>

        <NavBar />
      </div>
    </div>
  );
}
