const { useState, useEffect, useRef } = React;

// ─── THEMES ──────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#12100E',
    surface: '#1E1A16',
    card: '#262018',
    elevated: '#302820',
    primary: '#E8654A',
    secondary: '#D4A853',
    text: '#F5EFE8',
    textMuted: '#9E8B7A',
    textFaint: '#4A4038',
    border: '#3A3028',
    success: '#7ECB8F',
  },
  light: {
    bg: '#FAF7F2',
    surface: '#F0EAE0',
    card: '#FFFFFF',
    elevated: '#F8F2E8',
    primary: '#E8654A',
    secondary: '#C4904A',
    text: '#2A1F17',
    textMuted: '#7A6558',
    textFaint: '#C5B5A8',
    border: '#E0D4C8',
    success: '#4A9B5E',
  }
};

// ─── STATUS BAR ──────────────────────────────────────────────────────────────
const StatusBar = ({ t }) => {
  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 28px 0', height: '40px', flexShrink: 0 }}>
      <span style={{ fontSize: '12px', fontWeight: '700', color: t.text, fontFamily: 'system-ui' }}>9:41</span>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <WifiIcon size={14} color={t.text} />
        <BatteryIcon size={14} color={t.text} />
      </div>
    </div>
  );
};

// ─── DYNAMIC ISLAND ──────────────────────────────────────────────────────────
const DynamicIsland = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px', marginBottom: '6px', flexShrink: 0 }}>
    <div style={{ width: '126px', height: '34px', background: '#000', borderRadius: '20px' }} />
  </div>
);

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
const BottomNav = ({ activeTab, setActiveTab, t }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'quests', label: 'Quests', icon: window.lucide.Star },
    { id: 'mosaic', label: 'Mosaic', icon: window.lucide.Layers },
    { id: 'profile', label: 'Aura', icon: window.lucide.User },
  ];
  return (
    <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', padding: '8px 0 24px', flexShrink: 0 }}>
      {tabs.map(tab => {
        const active = activeTab === tab.id;
        const Icon = tab.icon;
        const navItemStyle = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', padding: '6px 0' };
        const labelStyle = { fontSize: '10px', fontFamily: 'system-ui', fontWeight: active ? '700' : '400', color: active ? t.primary : t.textMuted, letterSpacing: '0.5px' };
        return (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={navItemStyle}>
            <Icon size={22} color={active ? t.primary : t.textMuted} />
            <span style={labelStyle}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
const HomeScreen = ({ t }) => {
  const [pressed, setPressed] = useState(null);
  const BellIcon = window.lucide.Bell;
  const ZapIcon = window.lucide.Zap;
  const FeatherIcon = window.lucide.Feather;

  const challenges = [
    { id: 1, name: 'Petal Haiku', type: 'POETRY', progress: 60, color: '#E8654A', daysLeft: 2 },
    { id: 2, name: 'Dawn Palette', type: 'COLOR', progress: 35, color: '#D4A853', daysLeft: 5 },
    { id: 3, name: 'Bloom Echo', type: 'SOUND', progress: 10, color: '#7EC8D4', daysLeft: 7 },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '12px' }}>
      {/* Editorial header */}
      <div style={{ padding: '14px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', letterSpacing: '3px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>ISSUE 04 · SPRING 2026</span>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: t.primary + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <BellIcon size={16} color={t.primary} />
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${t.border}`, margin: '10px 0' }} />
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '50px', fontWeight: '700', lineHeight: 1.0, color: t.text, margin: '0' }}>Bloom</h1>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '50px', fontWeight: '700', lineHeight: 1.0, color: t.primary, margin: '0 0 6px', fontStyle: 'italic' }}>Awakening</h1>
        <p style={{ fontFamily: 'system-ui', fontSize: '10px', color: t.textMuted, letterSpacing: '1.5px', margin: '0 0 20px', fontWeight: '600' }}>SPRING SEASON ACTIVE · 34 DAYS REMAINING</p>
      </div>

      {/* Angled card stack — Featured Quest */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', height: '180px' }}>
          <div style={{ position: 'absolute', top: '14px', left: '14px', right: '10px', bottom: 0, background: t.elevated, borderRadius: '18px', border: `1px solid ${t.border}`, transform: 'rotate(3deg)', transformOrigin: 'center bottom' }} />
          <div style={{ position: 'absolute', top: '7px', left: '8px', right: '14px', bottom: 0, background: t.card, borderRadius: '18px', border: `1px solid ${t.border}`, transform: 'rotate(-1.5deg)', transformOrigin: 'center bottom' }} />
          <div style={{ position: 'absolute', top: 0, left: '4px', right: '4px', bottom: 0, background: `linear-gradient(140deg, ${t.primary}18, ${t.secondary}12)`, borderRadius: '18px', border: `1px solid ${t.primary}44`, padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '9px', letterSpacing: '2.5px', color: t.primary, fontFamily: 'system-ui', fontWeight: '700' }}>FEATURED QUEST</span>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: '700', color: t.text, margin: '6px 0 6px', lineHeight: 1.1 }}>Harvest of Light</h3>
                <p style={{ fontSize: '12px', color: t.textMuted, fontFamily: 'system-ui', margin: 0, lineHeight: 1.5, maxWidth: '200px' }}>Craft a 5-line poem using seasonal imagery and personal transformation</p>
              </div>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '10px' }}>
                <FeatherIcon size={22} color='#fff' />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ flex: 1, height: '3px', background: t.border, borderRadius: '2px' }}>
                <div style={{ width: '45%', height: '100%', background: t.primary, borderRadius: '2px' }} />
              </div>
              <span style={{ fontSize: '11px', color: t.primary, fontFamily: 'system-ui', fontWeight: '700' }}>45%</span>
              <div style={{ padding: '5px 14px', background: t.primary, borderRadius: '20px', cursor: 'pointer' }}>
                <span style={{ fontSize: '11px', fontFamily: 'system-ui', fontWeight: '700', color: '#fff' }}>Continue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active challenges */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>ACTIVE CHALLENGES</span>
          <span style={{ fontSize: '12px', color: t.primary, fontFamily: 'system-ui', fontWeight: '600' }}>All →</span>
        </div>
        {challenges.map(ch => (
          <div key={ch.id}
            onMouseDown={() => setPressed(ch.id)} onMouseUp={() => setPressed(null)}
            onTouchStart={() => setPressed(ch.id)} onTouchEnd={() => setPressed(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 14px', background: t.card, borderRadius: '14px', marginBottom: '8px', border: `1px solid ${t.border}`, transform: pressed === ch.id ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s', cursor: 'pointer' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: ch.color + '20', border: `1px solid ${ch.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: ch.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: '700', color: t.text }}>{ch.name}</span>
                <span style={{ fontSize: '10px', color: t.textMuted, fontFamily: 'system-ui' }}>{ch.daysLeft}d left</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '3px', background: t.border, borderRadius: '2px' }}>
                  <div style={{ width: `${ch.progress}%`, height: '100%', background: ch.color, borderRadius: '2px' }} />
                </div>
                <span style={{ fontSize: '10px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>{ch.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ambient Boost */}
      <div style={{ padding: '18px 24px 0' }}>
        <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>TODAY'S AMBIENT BOOST</span>
        <div style={{ marginTop: '10px', padding: '16px', background: t.card, borderRadius: '16px', border: `1px solid ${t.secondary}33`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-18px', top: '-18px', width: '80px', height: '80px', borderRadius: '50%', background: t.secondary + '15' }} />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ZapIcon size={26} color={t.secondary} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', fontWeight: '700', color: t.text, margin: '0 0 3px' }}>Morning Stillness</p>
              <p style={{ fontSize: '12px', color: t.textMuted, fontFamily: 'system-ui', margin: 0 }}>Take a quiet moment. +50 Aura XP unlocked.</p>
            </div>
          </div>
          <div style={{ marginTop: '12px', padding: '11px', background: t.secondary, borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '13px', fontFamily: 'system-ui', fontWeight: '700', color: '#fff', letterSpacing: '0.5px' }}>Claim Boost</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── QUESTS SCREEN ────────────────────────────────────────────────────────────
const QuestsScreen = ({ t }) => {
  const [activeSeason, setActiveSeason] = useState('spring');
  const StarIcon = window.lucide.Star;
  const LockIcon = window.lucide.Lock;
  const CheckIcon = window.lucide.CheckCircle;

  const seasons = [
    { id: 'spring', label: 'Spring', sym: '✿', live: true },
    { id: 'winter', label: 'Winter', sym: '❄', live: false },
    { id: 'autumn', label: 'Autumn', sym: '❧', live: false },
    { id: 'summer', label: 'Summer', sym: '◉', live: false },
  ];

  const quests = [
    { id: 1, title: 'Petal Haiku', desc: 'Write a 5-7-5 haiku about spring renewal', type: 'POETRY', xp: 120, done: false, locked: false, color: '#E8654A' },
    { id: 2, title: 'Blossom Palette', desc: 'Craft a mood mosaic from cherry blossom tones', type: 'COLOR', xp: 80, done: true, locked: false, color: '#D4A853' },
    { id: 3, title: 'Rain Echo', desc: 'Layer rain sounds into a 30-second ambient loop', type: 'SOUND', xp: 150, done: false, locked: false, color: '#7EC8D4' },
    { id: 4, title: 'Growth Journal', desc: 'Document a moment of personal renewal this week', type: 'JOURNAL', xp: 100, done: false, locked: true, color: '#A08ED4' },
    { id: 5, title: 'Bloom Mosaic', desc: 'Blend spring imagery into a shareable aura mosaic', type: 'ART', xp: 200, done: false, locked: true, color: '#E87C9A' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '12px' }}>
      <div style={{ padding: '14px 24px 0' }}>
        <span style={{ fontSize: '10px', letterSpacing: '3px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>SEASONAL ARCHIVE</span>
        <div style={{ borderTop: `1px solid ${t.border}`, margin: '10px 0' }} />
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '44px', fontWeight: '700', lineHeight: 1.0, color: t.text, margin: '0 0 2px' }}>Quest</h2>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '44px', fontWeight: '700', lineHeight: 1.0, color: t.primary, margin: '0 0 18px', fontStyle: 'italic' }}>Collection</h2>

        {/* Season pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', overflowX: 'auto' }}>
          {seasons.map(s => {
            const active = activeSeason === s.id;
            return (
              <div key={s.id} onClick={() => setActiveSeason(s.id)} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: '24px', background: active ? t.primary : t.card, border: `1px solid ${active ? t.primary : t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                <span style={{ fontSize: '14px' }}>{s.sym}</span>
                <span style={{ fontSize: '12px', fontFamily: 'system-ui', fontWeight: '600', color: active ? '#fff' : t.textMuted }}>{s.label}</span>
                {s.live && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: active ? '#fff' : t.primary }} />}
              </div>
            );
          })}
        </div>

        {/* Angled season banner stack */}
        <div style={{ position: 'relative', marginBottom: '28px', height: '130px' }}>
          <div style={{ position: 'absolute', top: '14px', left: '10px', right: '10px', bottom: 0, background: t.elevated, borderRadius: '18px', border: `1px solid ${t.border}`, transform: 'rotate(2.5deg)' }} />
          <div style={{ position: 'absolute', top: '7px', left: '5px', right: '5px', bottom: 0, background: t.card, borderRadius: '18px', border: `1px solid ${t.border}`, transform: 'rotate(-1.2deg)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: `linear-gradient(130deg, ${t.primary}20, ${t.secondary}16)`, borderRadius: '18px', border: `1px solid ${t.primary}33`, padding: '16px 20px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-16px', top: '-16px', width: '80px', height: '80px', borderRadius: '50%', background: t.primary + '18' }} />
            <span style={{ fontSize: '9px', letterSpacing: '2.5px', color: t.primary, fontFamily: 'system-ui', fontWeight: '700' }}>ACTIVE SEASON</span>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: '700', color: t.text, margin: '5px 0 3px' }}>Spring Bloom</h3>
            <p style={{ fontSize: '12px', color: t.textMuted, fontFamily: 'system-ui', margin: '0 0 10px' }}>5 quests · 34 days remaining · 650 XP available</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ flex: 1, height: '3px', background: t.border, borderRadius: '2px' }}>
                <div style={{ width: '40%', height: '100%', background: t.primary, borderRadius: '2px' }} />
              </div>
              <span style={{ fontSize: '11px', color: t.primary, fontFamily: 'system-ui', fontWeight: '700' }}>2 / 5</span>
            </div>
          </div>
        </div>

        {/* Quest list */}
        {quests.map(q => (
          <div key={q.id} style={{ display: 'flex', gap: '12px', padding: '12px 14px', background: q.done ? t.surface : t.card, borderRadius: '14px', marginBottom: '8px', border: `1px solid ${q.locked ? t.border : q.color + '44'}`, opacity: q.locked ? 0.55 : 1, cursor: q.locked ? 'default' : 'pointer' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: q.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {q.done ? <CheckIcon size={18} color={t.success} /> : q.locked ? <LockIcon size={16} color={t.textFaint} /> : <StarIcon size={18} color={q.color} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: '700', color: q.locked ? t.textMuted : t.text }}>{q.title}</span>
                <span style={{ fontSize: '9px', color: q.color, fontFamily: 'system-ui', fontWeight: '700', letterSpacing: '1px', background: q.color + '18', padding: '3px 8px', borderRadius: '20px' }}>{q.type}</span>
              </div>
              <p style={{ fontSize: '12px', color: t.textMuted, fontFamily: 'system-ui', margin: '0 0 6px', lineHeight: '1.4' }}>{q.desc}</p>
              <span style={{ fontSize: '11px', color: t.secondary, fontFamily: 'system-ui', fontWeight: '600' }}>+{q.xp} Aura XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MOSAIC SCREEN ────────────────────────────────────────────────────────────
const MosaicScreen = ({ t }) => {
  const [mood, setMood] = useState(0);
  const [colors, setColors] = useState([0, 3, 5, 9]);
  const [poem, setPoem] = useState('');
  const ShareIcon = window.lucide.Share2;
  const HeartIcon = window.lucide.Heart;

  const moods = [
    { label: 'Radiant', color: '#E8654A', sym: '✦' },
    { label: 'Serene', color: '#7EC8D4', sym: '◌' },
    { label: 'Grounded', color: '#8A7B5A', sym: '▲' },
    { label: 'Luminous', color: '#D4A853', sym: '◎' },
    { label: 'Ethereal', color: '#A08ED4', sym: '◇' },
  ];

  const palette = [
    '#E8654A', '#F0A060', '#D4A853', '#7EC8D4',
    '#A08ED4', '#7ECB8F', '#E87C9A', '#8A7B5A',
    '#F5C8A0', '#C4704A', '#4A9B8A', '#D4A0C4',
  ];

  const activeCols = colors.map(i => palette[i]);

  const toggleColor = i => {
    if (colors.includes(i)) {
      if (colors.length > 1) setColors(colors.filter(c => c !== i));
    } else if (colors.length < 5) {
      setColors([...colors, i]);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '12px' }}>
      <div style={{ padding: '14px 24px 0' }}>
        <span style={{ fontSize: '10px', letterSpacing: '3px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>CREATIVE STUDIO</span>
        <div style={{ borderTop: `1px solid ${t.border}`, margin: '10px 0' }} />
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '44px', fontWeight: '700', lineHeight: 1.0, color: t.text, margin: '0 0 2px' }}>Mood</h2>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '44px', fontWeight: '700', lineHeight: 1.0, color: t.primary, margin: '0 0 18px', fontStyle: 'italic' }}>Mosaic</h2>

        {/* Mood selector */}
        <div style={{ marginBottom: '18px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>CURRENT MOOD</span>
          <div style={{ display: 'flex', gap: '7px', marginTop: '10px', flexWrap: 'wrap' }}>
            {moods.map((m, i) => (
              <div key={i} onClick={() => setMood(i)} style={{ padding: '7px 13px', borderRadius: '24px', background: mood === i ? m.color : t.card, border: `1px solid ${mood === i ? m.color : t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s' }}>
                <span style={{ fontSize: '13px', color: mood === i ? '#fff' : m.color }}>{m.sym}</span>
                <span style={{ fontSize: '12px', fontFamily: 'system-ui', fontWeight: '600', color: mood === i ? '#fff' : t.textMuted }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mosaic preview */}
        <div style={{ marginBottom: '18px', padding: '16px', background: t.card, borderRadius: '18px', border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>LIVE PREVIEW</span>
            <span style={{ fontSize: '11px', color: t.primary, fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>{moods[mood].label} · Spring 2026</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '3px', borderRadius: '10px', overflow: 'hidden' }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const c = activeCols[i % activeCols.length];
              const h = i % 7 === 0 ? 56 : i % 3 === 0 ? 46 : 36;
              return <div key={i} style={{ height: `${h}px`, background: c, opacity: 0.6 + (i % 4) * 0.1 }} />;
            })}
          </div>
          <div style={{ marginTop: '10px', height: '2px', borderRadius: '2px', background: `linear-gradient(90deg, ${activeCols.join(', ')})` }} />
        </div>

        {/* Color palette picker */}
        <div style={{ marginBottom: '18px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>PALETTE · SELECT UP TO 5</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginTop: '10px' }}>
            {palette.map((c, i) => (
              <div key={i} onClick={() => toggleColor(i)} style={{ height: '36px', borderRadius: '8px', background: c, cursor: 'pointer', border: colors.includes(i) ? '2px solid white' : '2px solid transparent', boxShadow: colors.includes(i) ? `0 0 0 2px ${c}` : 'none', transform: colors.includes(i) ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.15s' }} />
            ))}
          </div>
        </div>

        {/* Poetic fragment */}
        <div style={{ marginBottom: '18px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>POETIC FRAGMENT</span>
          <textarea value={poem} onChange={e => setPoem(e.target.value)} placeholder="A petal falls soft... (5-7-5 haiku)" style={{ width: '100%', marginTop: '10px', padding: '14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: '14px', color: t.text, fontFamily: '"Playfair Display", serif', fontSize: '15px', fontStyle: 'italic', resize: 'none', height: '88px', outline: 'none', lineHeight: '1.6', display: 'block', boxSizing: 'border-box' }} />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1, padding: '14px', background: t.primary, borderRadius: '14px', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShareIcon size={16} color='#fff' />
            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', fontWeight: '700', color: '#fff' }}>Share Mosaic</span>
          </div>
          <div style={{ padding: '14px 18px', background: t.card, borderRadius: '14px', border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeartIcon size={20} color={t.primary} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
const ProfileScreen = ({ t, toggleTheme, isDark }) => {
  const SunIcon = window.lucide.Sun;
  const BellIcon = window.lucide.Bell;
  const Share2Icon = window.lucide.Share2;
  const InfoIcon = window.lucide.Info;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const SettingsIcon = window.lucide.Settings;

  const badges = [
    { name: 'Poet', color: '#E8654A', sym: '✦' },
    { name: 'Colorist', color: '#D4A853', sym: '◎' },
    { name: 'Sound Weaver', color: '#7EC8D4', sym: '◌' },
    { name: 'Storyteller', color: '#A08ED4', sym: '◇' },
    { name: 'Bloom Seeker', color: '#7ECB8F', sym: '▲' },
    { name: 'Luminous', color: '#E87C9A', sym: '❋' },
  ];

  const settingsItems = [
    { Icon: BellIcon, label: 'Notifications' },
    { Icon: Share2Icon, label: 'Share Profile' },
    { Icon: InfoIcon, label: 'About AuraQuests' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '12px' }}>
      <div style={{ padding: '14px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', letterSpacing: '3px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>YOUR IDENTITY</span>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SettingsIcon size={15} color={t.textMuted} />
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${t.border}`, margin: '10px 0 18px' }} />

        {/* Avatar with aura rings */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <div style={{ position: 'relative', width: '110px', height: '110px' }}>
            <div style={{ position: 'absolute', top: '-13px', left: '-13px', width: '136px', height: '136px', borderRadius: '50%', border: `1px solid ${t.primary}20` }} />
            <div style={{ position: 'absolute', top: '-7px', left: '-7px', width: '124px', height: '124px', borderRadius: '50%', border: `1.5px solid ${t.primary}40` }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '110px', height: '110px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '38px', fontWeight: '700', color: t.primary }}>M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Name & level */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '26px', fontWeight: '700', color: t.text, margin: '0 0 4px' }}>Maya Chen</h2>
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.primary, fontFamily: 'system-ui', fontWeight: '700' }}>BLOOM SEEKER · LEVEL 12</span>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '150px', height: '4px', background: t.border, borderRadius: '2px' }}>
              <div style={{ width: '72%', height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: '2px' }} />
            </div>
          </div>
          <span style={{ fontSize: '11px', color: t.textMuted, fontFamily: 'system-ui', marginTop: '5px', display: 'block' }}>2,340 / 3,200 Aura XP</span>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {[{ label: 'Quests', val: '18' }, { label: 'Mosaics', val: '7' }, { label: 'Seasons', val: '3' }].map((s, i) => (
            <div key={i} style={{ padding: '12px 8px', background: t.card, borderRadius: '14px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: '700', color: t.primary }}>{s.val}</div>
              <div style={{ fontSize: '10px', color: t.textMuted, fontFamily: 'system-ui', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>EARNED BADGES</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '12px' }}>
            {badges.map((b, i) => (
              <div key={i} style={{ padding: '12px 8px', background: t.card, borderRadius: '14px', border: `1px solid ${b.color}33`, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: b.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 7px' }}>
                  <span style={{ fontSize: '17px', color: b.color }}>{b.sym}</span>
                </div>
                <span style={{ fontSize: '10px', fontFamily: 'system-ui', fontWeight: '600', color: t.textMuted }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: t.textMuted, fontFamily: 'system-ui', fontWeight: '600' }}>SETTINGS</span>
          <div style={{ marginTop: '12px', background: t.card, borderRadius: '16px', border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            {/* Theme toggle */}
            <div onClick={toggleTheme} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 18px', cursor: 'pointer', borderBottom: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <SunIcon size={18} color={t.secondary} />
                <span style={{ fontFamily: 'system-ui', fontSize: '14px', color: t.text }}>Dark Mode</span>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: isDark ? t.primary : t.textFaint, position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '3px', left: isDark ? '22px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }} />
              </div>
            </div>
            {settingsItems.map((item, i) => {
              const ItemIcon = item.Icon;
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 18px', cursor: 'pointer', borderBottom: i < settingsItems.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <ItemIcon size={18} color={t.textMuted} />
                    <span style={{ fontFamily: 'system-ui', fontSize: '14px', color: t.text }}>{item.label}</span>
                  </div>
                  <ChevronRightIcon size={16} color={t.textFaint} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const t = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(d => !d);

  useEffect(() => {
    if (document.getElementById('aura-fonts')) return;
    const style = document.createElement('style');
    style.id = 'aura-fonts';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
      * { scrollbar-width: none; }
    `;
    document.head.appendChild(style);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'quests', label: 'Quests', icon: window.lucide.Star },
    { id: 'mosaic', label: 'Mosaic', icon: window.lucide.Layers },
    { id: 'profile', label: 'Aura', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    quests: QuestsScreen,
    mosaic: MosaicScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '375px', height: '812px', background: t.bg, borderRadius: '44px', overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar t={t} />
        <DynamicIsland />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ActiveScreen t={t} toggleTheme={toggleTheme} isDark={isDark} />
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
      </div>
    </div>
  );
}
