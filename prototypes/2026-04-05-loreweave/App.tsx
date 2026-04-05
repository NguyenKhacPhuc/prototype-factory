function App() {
  const { useState, useEffect, useRef } = React;

  // --- Theme System ---
  const themes = {
    light: {
      bg: '#FAF5FF',
      bgCard: '#FFFFFF',
      bgCardAlt: '#F3E8FF',
      bgNavbar: '#FFFFFF',
      primary: '#7C3AED',
      primaryLight: '#A78BFA',
      primaryDark: '#5B21B6',
      secondary: '#A78BFA',
      cta: '#22C55E',
      ctaDark: '#16A34A',
      text: '#1A0A2E',
      textMuted: '#6B7280',
      textLight: '#9CA3AF',
      border: '#E9D5FF',
      divider: '#F0E6FF',
      navActive: '#7C3AED',
      navInactive: '#9CA3AF',
      inputBg: '#F9F5FF',
      accent1: '#F59E0B',
      accent2: '#EC4899',
      badge: '#FDF4FF',
      badgeBorder: '#E9D5FF',
      shimmer1: '#EDE9FE',
      shimmer2: '#DDD6FE',
    },
    dark: {
      bg: '#0F0A1E',
      bgCard: '#1A1030',
      bgCardAlt: '#241840',
      bgNavbar: '#120D22',
      primary: '#9B59F5',
      primaryLight: '#C4A8FF',
      primaryDark: '#7C3AED',
      secondary: '#C4A8FF',
      cta: '#22C55E',
      ctaDark: '#16A34A',
      text: '#F0E8FF',
      textMuted: '#B8A8D8',
      textLight: '#7C6A9A',
      border: '#3D2860',
      divider: '#2A1F45',
      navActive: '#C4A8FF',
      navInactive: '#6B5A8A',
      inputBg: '#1E1435',
      accent1: '#FBBF24',
      accent2: '#F472B6',
      badge: '#2A1F45',
      badgeBorder: '#4D3880',
      shimmer1: '#2A1F45',
      shimmer2: '#3D2860',
    }
  };

  const [isDark, setIsDark] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeTab, setActiveTab] = useState('home');

  const t = isDark ? themes.dark : themes.light;

  // Font + animations injection
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
        50% { box-shadow: 0 0 0 10px rgba(124,58,237,0); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes liveFlash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      @keyframes progressFill {
        from { width: 0%; }
        to { width: var(--target-width); }
      }

      .screen-enter { animation: fadeIn 0.28s ease forwards; }
      .card-hover {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
      }
      .card-hover:hover { transform: translateY(-2px); }
      .btn-press:active { transform: scale(0.96); }
      .live-dot { animation: liveFlash 1.2s ease-in-out infinite; }
      .float-anim { animation: float 3s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const navigate = (screen) => {
    setActiveScreen(screen);
    setActiveTab(screen);
  };

  // ---- Lucide Icon Helper ----
  const Icon = ({ name, size = 20, color, strokeWidth = 2, style: iconStyle }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { display: 'inline-block', width: size, height: size } });
    return React.createElement(LucideIcon, {
      size,
      color: color || t.text,
      strokeWidth,
      style: iconStyle
    });
  };

  // ---- Shared Components ----
  const Badge = ({ children, color, bg }) => React.createElement('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif',
      letterSpacing: '0.04em', textTransform: 'uppercase',
      color: color || t.primary,
      background: bg || t.badge,
      border: `1px solid ${t.badgeBorder}`,
      borderRadius: 20, padding: '2px 10px',
    }
  }, children);

  const Button = ({ children, onClick, variant = 'primary', style: extraStyle, icon }) => {
    const styles = {
      primary: {
        background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryLight} 100%)`,
        color: '#FFFFFF',
        border: 'none',
        boxShadow: `0 4px 14px rgba(124,58,237,0.35)`,
      },
      cta: {
        background: `linear-gradient(135deg, ${t.cta} 0%, #4ADE80 100%)`,
        color: '#FFFFFF',
        border: 'none',
        boxShadow: `0 4px 14px rgba(34,197,94,0.35)`,
      },
      outline: {
        background: 'transparent',
        color: t.primary,
        border: `2px solid ${t.primary}`,
        boxShadow: 'none',
      },
      ghost: {
        background: t.bgCardAlt,
        color: t.text,
        border: `1px solid ${t.border}`,
        boxShadow: 'none',
      }
    };
    return React.createElement('button', {
      onClick,
      className: 'btn-press',
      style: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '12px 20px', borderRadius: 14,
        fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif',
        cursor: 'pointer', minHeight: 44,
        transition: 'all 0.18s ease',
        ...styles[variant],
        ...extraStyle
      }
    }, icon && React.createElement(Icon, { name: icon, size: 16, color: variant === 'outline' ? t.primary : '#fff' }), children);
  };

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const rituals = [
      { id: 1, guild: 'Stormforged Chroniclers', muse: 'Tempestia', prompt: 'The lighthouse keeper saw something in the storm last night...', live: true, members: 47, timeLeft: '12 min' },
      { id: 2, guild: 'Neon Mythos Collective', muse: 'Axiom-9', prompt: 'What does freedom taste like in a city that never sleeps?', live: false, members: 31, startsIn: '2h 30m' },
    ];
    const updates = [
      { guild: 'Stormforged Chroniclers', event: 'LoreMuse Tempestia evolved a new narrative thread: "The Lighthouse Sequence"', time: '5m ago', color: '#7C3AED' },
      { guild: 'Neon Mythos Collective', event: 'New Identity Shard Challenge dropped: "The Glass City Paradox"', time: '1h ago', color: '#EC4899' },
      { guild: 'Rootwood Wanderers', event: 'Echo Archive unlocked: "The Great Migration" arc', time: '3h ago', color: '#F59E0B' },
    ];
    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 900, fontFamily: 'Inter, sans-serif', color: t.text, letterSpacing: '-0.5px' } }, 'LoreWeave'),
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginTop: 2 } }, 'Your community\'s living story')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { background: t.bgCardAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: 8, cursor: 'pointer', minWidth: 36, minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.primary })),
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 4px 10px rgba(124,58,237,0.3)` }
          }, React.createElement(Icon, { name: 'Bell', size: 18, color: '#fff' }))
        )
      ),

      // Guild stats strip
      React.createElement('div', { style: { padding: '0 20px 16px', display: 'flex', gap: 10 } },
        [
          { label: 'My Guilds', value: '3', icon: 'Users', color: t.primary },
          { label: 'Fragments', value: '28', icon: 'Layers', color: '#EC4899' },
          { label: 'Rituals', value: '12', icon: 'Flame', color: t.accent1 },
        ].map((stat, i) => React.createElement('div', {
          key: i,
          style: { flex: 1, background: t.bgCard, borderRadius: 14, padding: '12px 10px', border: `1px solid ${t.border}`, textAlign: 'center', transition: 'transform 0.2s ease', cursor: 'pointer' }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 4 } }, React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })),
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text } }, stat.value),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, stat.label)
        ))
      ),

      // Live Rituals
      React.createElement('div', { style: { padding: '0 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text } }, 'Active Rituals'),
        React.createElement('button', { onClick: () => navigate('rituals'), style: { background: 'none', border: 'none', color: t.primary, fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer' } }, 'See all')
      ),
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 } },
        rituals.map((ritual) => React.createElement('div', {
          key: ritual.id,
          className: 'card-hover',
          onClick: () => navigate('rituals'),
          style: {
            background: ritual.live
              ? `linear-gradient(135deg, ${t.primary}18 0%, ${t.secondary}10 100%)`
              : t.bgCard,
            borderRadius: 18, padding: 16,
            border: ritual.live ? `1.5px solid ${t.primary}50` : `1px solid ${t.border}`,
            boxShadow: ritual.live ? `0 4px 20px rgba(124,58,237,0.15)` : 'none',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', {
                style: { width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
              }, React.createElement(Icon, { name: 'Sparkles', size: 16, color: '#fff' })),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif', color: t.text } }, ritual.guild),
                React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600, fontFamily: 'Inter, sans-serif' } }, `LoreMuse: ${ritual.muse}`)
              )
            ),
            ritual.live
              ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, background: '#FEE2E2', borderRadius: 20, padding: '4px 10px' } },
                  React.createElement('div', { className: 'live-dot', style: { width: 7, height: 7, borderRadius: '50%', background: '#EF4444' } }),
                  React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#EF4444', fontFamily: 'Inter, sans-serif' } }, 'LIVE')
                )
              : React.createElement(Badge, { color: t.textMuted }, `Starts ${ritual.startsIn}`)
          ),
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: 'Inter, sans-serif', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 10 } }, `"${ritual.prompt}"`),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: t.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif' } },
              React.createElement(Icon, { name: 'Users', size: 13, color: t.textMuted }), `${ritual.members} weaving`
            ),
            ritual.live && React.createElement(Button, { variant: 'primary', style: { padding: '8px 14px', fontSize: 12, minHeight: 36 }, icon: 'Flame' }, 'Join Ritual')
          )
        ))
      ),

      // Activity Feed
      React.createElement('div', { style: { padding: '20px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text } }, 'Guild Activity'),
        React.createElement(Badge, null, 'Live Feed')
      ),
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 } },
        updates.map((update, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', background: t.bgCard, borderRadius: 14, border: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: update.color, flexShrink: 0, marginTop: 4 } }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, color: t.text, fontFamily: 'Inter, sans-serif', lineHeight: 1.45 } }, update.event),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 4, fontFamily: 'Inter, sans-serif' } }, `${update.guild} · ${update.time}`)
          )
        ))
      )
    );
  };

  // ---- RITUALS SCREEN ----
  const RitualsScreen = () => {
    const [activeRitual, setActiveRitual] = useState(null);
    const [inputVal, setInputVal] = useState('');
    const [fragments, setFragments] = useState([
      { user: 'Meridian_77', avatar: 'M', text: 'The beam swept across the water like a searching eye, probing the darkness for something it had lost centuries ago.', time: '2m', color: '#7C3AED' },
      { user: 'NightSinger', avatar: 'N', text: 'Elara heard the fog horn call twice — the old fishermen said that meant someone was coming home. But the harbor had been empty for forty years.', time: '4m', color: '#EC4899' },
      { user: 'ArchivistRex', avatar: 'A', text: 'The keeper\'s log simply read: "It watches back."', time: '6m', color: '#F59E0B' },
    ]);

    const submit = () => {
      if (!inputVal.trim()) return;
      setFragments([{ user: 'You', avatar: 'Y', text: inputVal.trim(), time: 'now', color: t.cta }, ...fragments]);
      setInputVal('');
    };

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 12px', background: `linear-gradient(180deg, ${t.primary}20 0%, transparent 100%)` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 } },
          React.createElement('div', { style: { fontSize: 20, fontWeight: 900, fontFamily: 'Inter, sans-serif', color: t.text } }, 'Weave Rituals'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, background: '#FEE2E2', borderRadius: 20, padding: '5px 12px' } },
            React.createElement('div', { className: 'live-dot', style: { width: 7, height: 7, borderRadius: '50%', background: '#EF4444' } }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: '#EF4444', fontFamily: 'Inter, sans-serif' } }, '1 LIVE')
          )
        ),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'Live creative campfire experiences')
      ),

      // Active Ritual Card
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', {
          style: { background: `linear-gradient(135deg, ${t.primary} 0%, #5B21B6 100%)`, borderRadius: 20, padding: 18, position: 'relative', overflow: 'hidden', boxShadow: `0 8px 32px rgba(124,58,237,0.4)` }
        },
          React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
          React.createElement('div', { style: { position: 'absolute', bottom: -30, left: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('div', null,
              React.createElement(Badge, { color: '#FCA5A5', bg: 'rgba(239,68,68,0.2)' }, '🔴 LIVE'),
              React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif', marginTop: 6 } }, 'Stormforged Chroniclers'),
            ),
            React.createElement('div', { className: 'float-anim', style: { width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: 'Sparkles', size: 22, color: '#fff' })
            )
          ),
          React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', marginBottom: 4 } }, 'LoreMuse Tempestia prompts:'),
          React.createElement('div', { style: { fontSize: 15, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 } }, '"The lighthouse keeper saw something in the storm last night. What did the fog reveal?"'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'Inter, sans-serif' } },
              React.createElement(Icon, { name: 'Users', size: 13, color: 'rgba(255,255,255,0.7)' }), '47 weaving · 12 min left'
            ),
            React.createElement(Button, { variant: 'cta', style: { padding: '8px 16px', fontSize: 13, minHeight: 40 }, icon: 'Flame' }, 'Weave Now')
          )
        )
      ),

      // Fragment Stream
      React.createElement('div', { style: { padding: '0 20px 12px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text, marginBottom: 12 } }, 'Fragment Stream'),
        // Input
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 14, alignItems: 'flex-end' } },
          React.createElement('textarea', {
            value: inputVal,
            onChange: (e) => setInputVal(e.target.value),
            placeholder: 'Add your fragment to the weave...',
            rows: 2,
            style: { flex: 1, background: t.inputBg, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', fontSize: 13, fontFamily: 'Inter, sans-serif', color: t.text, resize: 'none', outline: 'none', lineHeight: 1.5 }
          }),
          React.createElement('button', {
            onClick: submit,
            style: { background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, border: 'none', borderRadius: 14, padding: '0 14px', minHeight: 52, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 14px rgba(124,58,237,0.3)` }
          }, React.createElement(Icon, { name: 'Send', size: 18, color: '#fff' }))
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          fragments.map((frag, i) => React.createElement('div', {
            key: i,
            style: { display: 'flex', gap: 10, alignItems: 'flex-start', animation: i === 0 && frag.time === 'now' ? 'slideUp 0.3s ease' : undefined }
          },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: frag.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif' } }, frag.avatar),
            React.createElement('div', { style: { flex: 1, background: t.bgCard, borderRadius: 14, padding: '10px 14px', border: `1px solid ${t.border}` } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: frag.color, fontFamily: 'Inter, sans-serif' } }, frag.user),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, frag.time)
              ),
              React.createElement('div', { style: { fontSize: 13, color: t.text, fontFamily: 'Inter, sans-serif', lineHeight: 1.55 } }, frag.text)
            )
          ))
        )
      ),

      // Upcoming
      React.createElement('div', { style: { padding: '4px 20px 0' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text, marginBottom: 10 } }, 'Upcoming Rituals'),
        [
          { guild: 'Neon Mythos Collective', muse: 'Axiom-9', when: 'Today, 8:00 PM', topic: 'The Glass City Paradox', members: 31, color: '#EC4899' },
          { guild: 'Rootwood Wanderers', muse: 'Sylvara', when: 'Tomorrow, 6:30 PM', topic: 'Whispers of the Elder Trees', members: 22, color: '#F59E0B' },
        ].map((r, i) => React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: { background: t.bgCard, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${r.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Moon', size: 20, color: r.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, r.guild),
            React.createElement('div', { style: { fontSize: 12, color: r.color, fontFamily: 'Inter, sans-serif', fontWeight: 600 } }, r.topic),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginTop: 2 } }, `${r.when} · ${r.members} attending`)
          ),
          React.createElement('button', { style: { background: t.bgCardAlt, border: `1px solid ${t.border}`, borderRadius: 10, padding: '8px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: t.primary, fontFamily: 'Inter, sans-serif', minHeight: 44, whiteSpace: 'nowrap' } }, 'Remind')
        ))
      )
    );
  };

  // ---- ARCHIVE SCREEN ----
  const ArchiveScreen = () => {
    const [selectedArc, setSelectedArc] = useState(null);
    const canvasRef = useRef(null);

    const arcs = [
      { id: 1, title: 'The Lighthouse Sequence', fragments: 47, connections: 12, guild: 'Stormforged', color: '#7C3AED', x: 160, y: 130, size: 60 },
      { id: 2, title: 'The Great Storm Accord', fragments: 31, connections: 8, guild: 'Stormforged', color: '#A78BFA', x: 80, y: 220, size: 44 },
      { id: 3, title: 'Glass City Paradox', fragments: 22, connections: 6, guild: 'Neon Mythos', color: '#EC4899', x: 250, y: 200, size: 48 },
      { id: 4, title: 'Elder Tree Prophecy', fragments: 15, connections: 4, guild: 'Rootwood', color: '#F59E0B', x: 140, y: 300, size: 38 },
      { id: 5, title: 'Void Codex Fragment', fragments: 9, connections: 3, guild: 'Stormforged', color: '#6B7280', x: 60, y: 320, size: 30 },
    ];

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = 335;
      canvas.height = 400;
      ctx.clearRect(0, 0, 335, 400);

      // Draw connections
      arcs.forEach((arc, i) => {
        arcs.slice(i + 1).forEach(other => {
          ctx.beginPath();
          ctx.moveTo(arc.x, arc.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = isDark ? 'rgba(167,139,250,0.15)' : 'rgba(124,58,237,0.12)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
        });
      });

      // Draw nodes
      arcs.forEach(arc => {
        const r = arc.size / 2;
        const grd = ctx.createRadialGradient(arc.x, arc.y, 0, arc.x, arc.y, r);
        grd.addColorStop(0, arc.color + 'CC');
        grd.addColorStop(1, arc.color + '44');
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = arc.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = `bold 10px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(arc.fragments, arc.x, arc.y);
      });
    }, [isDark]);

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 12px' } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 900, fontFamily: 'Inter, sans-serif', color: t.text } }, 'Echo Archive'),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginTop: 2 } }, 'Spatial map of your Guild\'s living lore')
      ),

      // Spatial Canvas
      React.createElement('div', { style: { margin: '0 20px 16px', background: isDark ? '#0D0820' : '#F0EAFF', borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.border}`, position: 'relative' } },
        React.createElement('div', { style: { padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${t.border}` } },
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'NARRATIVE CONSTELLATION'),
          React.createElement(Badge, null, '5 Arcs')
        ),
        React.createElement('canvas', { ref: canvasRef, style: { display: 'block', width: '100%' } }),
        React.createElement('div', { style: { padding: '8px 14px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' } },
          arcs.map(arc => React.createElement('div', {
            key: arc.id,
            onClick: () => setSelectedArc(arc.id === selectedArc ? null : arc.id),
            style: { display: 'flex', alignItems: 'center', gap: 5, background: arc.id === selectedArc ? `${arc.color}22` : t.bgCard, border: `1px solid ${arc.id === selectedArc ? arc.color : t.border}`, borderRadius: 10, padding: '4px 10px', cursor: 'pointer', transition: 'all 0.2s ease' }
          },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: arc.color } }),
            React.createElement('span', { style: { fontSize: 11, color: t.text, fontFamily: 'Inter, sans-serif', fontWeight: 500 } }, arc.title.split(' ').slice(0, 2).join(' '))
          ))
        )
      ),

      // Arc Details
      selectedArc && React.createElement('div', {
        style: { margin: '0 20px 16px', animation: 'slideUp 0.25s ease', background: t.bgCard, borderRadius: 18, padding: 16, border: `1.5px solid ${t.border}` }
      },
        (() => {
          const arc = arcs.find(a => a.id === selectedArc);
          return [
            React.createElement('div', { key: 'h', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text } }, arc.title),
                React.createElement('div', { style: { fontSize: 12, color: arc.color, fontFamily: 'Inter, sans-serif', fontWeight: 600, marginTop: 2 } }, arc.guild)
              ),
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${arc.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'BookOpen', size: 18, color: arc.color })
              )
            ),
            React.createElement('div', { key: 'stats', style: { display: 'flex', gap: 16, marginBottom: 12 } },
              React.createElement('div', { style: { textAlign: 'center' } },
                React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif' } }, arc.fragments),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'Fragments')
              ),
              React.createElement('div', { style: { textAlign: 'center' } },
                React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif' } }, arc.connections),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'Connections')
              )
            ),
            React.createElement(Button, { key: 'btn', variant: 'primary', style: { width: '100%', justifyContent: 'center' }, icon: 'Map' }, 'Explore This Arc')
          ];
        })()
      ),

      // Recent Fragments
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text, marginBottom: 12 } }, 'Recent Fragments'),
        [
          { title: 'The Storm\'s First Eye', arc: 'Lighthouse Sequence', author: 'Meridian_77', preview: 'Wind and wave conspired that night, but the keeper knew their language...', date: 'Apr 3' },
          { title: 'Fog Testimonies', arc: 'Great Storm Accord', author: 'NightSinger', preview: 'Three witnesses, three truths, one impossible light source.', date: 'Apr 2' },
          { title: 'Glass Refraction Theory', arc: 'Glass City Paradox', author: 'Axiom-9 (LoreMuse)', preview: 'What if the city\'s reflection was more real than the city itself?', date: 'Apr 1' },
        ].map((frag, i) => React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: { background: t.bgCard, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 10 }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, frag.title),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, frag.date)
          ),
          React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 600, fontFamily: 'Inter, sans-serif', marginBottom: 5 } }, frag.arc),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Inter, sans-serif', fontStyle: 'italic', lineHeight: 1.5 } }, `"${frag.preview}"`),
          React.createElement('div', { style: { fontSize: 11, color: t.textLight, fontFamily: 'Inter, sans-serif', marginTop: 6 } }, `by ${frag.author}`)
        ))
      )
    );
  };

  // ---- FORGE SCREEN ----
  const ForgeScreen = () => {
    const [selectedType, setSelectedType] = useState('text');
    const [textVal, setTextVal] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const types = [
      { id: 'text', label: 'Text', icon: 'Type' },
      { id: 'image', label: 'Image Prompt', icon: 'Image' },
      { id: 'audio', label: 'Audio', icon: 'Mic' },
      { id: 'video', label: 'Video', icon: 'Video' },
    ];

    const challenges = [
      { title: 'The Glass City Paradox', guild: 'Neon Mythos', desc: 'What happens when a city\'s illusion becomes more real than reality?', urgency: 'high', deadline: '18h left' },
      { title: 'Ancient Root Memory', guild: 'Rootwood Wanderers', desc: 'The elder trees remember something the humans forgot 300 years ago.', urgency: 'medium', deadline: '3d left' },
    ];

    const handleSubmit = () => {
      if (!textVal.trim()) return;
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
      setTextVal('');
    };

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 12px' } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 900, fontFamily: 'Inter, sans-serif', color: t.text } }, 'Fragment Forge'),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginTop: 2 } }, 'Feed the LoreMuse creative fragments')
      ),

      // Success Toast
      submitted && React.createElement('div', {
        style: { margin: '0 20px 12px', background: '#D1FAE5', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'center', animation: 'slideUp 0.3s ease', border: '1px solid #6EE7B7' }
      },
        React.createElement(Icon, { name: 'CheckCircle', size: 20, color: '#059669' }),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: '#065F46', fontFamily: 'Inter, sans-serif' } }, 'Fragment Woven!'),
          React.createElement('div', { style: { fontSize: 12, color: '#059669', fontFamily: 'Inter, sans-serif' } }, 'LoreMuse is processing your contribution')
        )
      ),

      // Active Identity Shard Challenges
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text } }, 'Identity Shard Challenges'),
          React.createElement(Icon, { name: 'Zap', size: 15, color: t.accent1 })
        ),
        challenges.map((ch, i) => React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: { background: ch.urgency === 'high' ? `linear-gradient(135deg, ${t.primary}15 0%, ${t.secondary}08 100%)` : t.bgCard, borderRadius: 16, padding: '14px 16px', border: `1.5px solid ${ch.urgency === 'high' ? t.primary + '40' : t.border}`, marginBottom: 10 }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif' } }, ch.title),
              React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600, fontFamily: 'Inter, sans-serif', marginBottom: 5 } }, ch.guild)
            ),
            React.createElement(Badge, { color: ch.urgency === 'high' ? '#B91C1C' : t.textMuted, bg: ch.urgency === 'high' ? '#FEE2E2' : t.badge }, ch.deadline)
          ),
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: 'Inter, sans-serif', lineHeight: 1.5, marginBottom: 10 } }, ch.desc),
          React.createElement(Button, { variant: ch.urgency === 'high' ? 'primary' : 'outline', style: { fontSize: 12, padding: '8px 16px', minHeight: 40 }, icon: 'Feather' }, 'Respond to Challenge')
        ))
      ),

      // Fragment Type Selector
      React.createElement('div', { style: { padding: '0 20px 12px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', color: t.text, marginBottom: 12 } }, 'Contribute a Fragment'),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 14 } },
          types.map(type => React.createElement('button', {
            key: type.id,
            onClick: () => setSelectedType(type.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '10px 4px', borderRadius: 14, cursor: 'pointer', minHeight: 60,
              background: selectedType === type.id ? `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)` : t.bgCard,
              border: `1.5px solid ${selectedType === type.id ? t.primary : t.border}`,
              transition: 'all 0.2s ease'
            }
          },
            React.createElement(Icon, { name: type.icon, size: 18, color: selectedType === type.id ? '#fff' : t.textMuted }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 600, fontFamily: 'Inter, sans-serif', color: selectedType === type.id ? '#fff' : t.textMuted } }, type.label)
          ))
        ),

        // Text Input
        selectedType === 'text' && React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6 } }, 'Write your narrative fragment'),
          React.createElement('textarea', {
            value: textVal,
            onChange: (e) => setTextVal(e.target.value),
            placeholder: 'Begin your fragment... let your imagination flow into the Guild\'s collective saga.',
            rows: 5,
            style: { width: '100%', background: t.inputBg, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '14px 16px', fontSize: 14, fontFamily: 'Inter, sans-serif', color: t.text, resize: 'none', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box' }
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 } },
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `${textVal.length} / 500 characters`),
            React.createElement(Button, { variant: 'primary', onClick: handleSubmit, icon: 'Sparkles' }, 'Send to LoreMuse')
          )
        ),

        // Image Prompt
        selectedType === 'image' && React.createElement('div', { style: { background: t.inputBg, borderRadius: 16, padding: 20, border: `1.5px dashed ${t.border}`, textAlign: 'center' } },
          React.createElement(Icon, { name: 'Image', size: 32, color: t.primary, iconStyle: { marginBottom: 8 } }),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 6, marginTop: 8 } }, 'Drop an image prompt or describe a scene'),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 14 } }, 'The LoreMuse will weave it into the visual narrative'),
          React.createElement(Button, { variant: 'outline', icon: 'Upload' }, 'Upload Image'),
        ),

        // Audio
        selectedType === 'audio' && React.createElement('div', { style: { background: t.inputBg, borderRadius: 16, padding: 24, border: `1.5px dashed ${t.border}`, textAlign: 'center' } },
          React.createElement('div', { style: { width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, #EC489920 0%, #EC489940 100%)`, border: `2px solid #EC4899`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', cursor: 'pointer', animation: 'pulse 2s infinite' } },
            React.createElement(Icon, { name: 'Mic', size: 28, color: '#EC4899' })
          ),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 4 } }, 'Record an Audio Fragment'),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'Spoken word, ambient sound, or music — up to 90 seconds')
        )
      )
    );
  };

  // ---- GUILD SCREEN ----
  const GuildScreen = () => {
    const [activeGuildTab, setActiveGuildTab] = useState('overview');

    const guildTabs = ['overview', 'lore', 'members'];
    const members = [
      { name: 'Meridian_77', role: 'Lorekeeper', frags: 47, joined: 'Feb 2026', avatar: 'M', color: '#7C3AED' },
      { name: 'NightSinger', role: 'Archivist', frags: 38, joined: 'Jan 2026', avatar: 'N', color: '#EC4899' },
      { name: 'ArchivistRex', role: 'Weaver', frags: 29, joined: 'Mar 2026', avatar: 'A', color: '#F59E0B' },
      { name: 'StormWatch', role: 'Weaver', frags: 21, joined: 'Mar 2026', avatar: 'S', color: '#22C55E' },
      { name: 'You', role: 'Initiate', frags: 8, joined: 'Apr 2026', avatar: 'Y', color: '#6B7280' },
    ];
    const loreArcs = [
      { title: 'The Lighthouse Sequence', status: 'Active', progress: 68, frags: 47, color: '#7C3AED' },
      { title: 'The Great Storm Accord', status: 'Complete', progress: 100, frags: 31, color: '#A78BFA' },
      { title: 'Tempestia\'s Origin', status: 'Dormant', progress: 22, frags: 9, color: '#9CA3AF' },
    ];

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Guild Header Banner
      React.createElement('div', { style: { background: `linear-gradient(160deg, ${t.primary} 0%, #5B21B6 60%, #1E0B4B 100%)`, padding: '24px 20px 0', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: 10, right: 20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: 10, left: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative' } },
          React.createElement('div', null,
            React.createElement(Badge, { color: t.accent1, bg: 'rgba(245,158,11,0.2)' }, 'Your Guild'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, fontFamily: 'Inter, sans-serif', color: '#fff', marginTop: 6, letterSpacing: '-0.3px' } }, 'Stormforged Chroniclers'),
            React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', marginTop: 2 } }, 'Est. November 2025 · 47 members')
          ),
          React.createElement('div', { className: 'float-anim', style: { width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' } },
            React.createElement(Icon, { name: 'Zap', size: 24, color: t.accent1 })
          )
        ),
        // LoreMuse Status
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '12px 14px', marginBottom: 16, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.accent1} 0%, #F97316 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 3s infinite' } },
              React.createElement(Icon, { name: 'Sparkles', size: 20, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif' } }, 'LoreMuse Tempestia'),
              React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' } }, 'Evolving · Level 7 · 2,847 fragments processed')
            ),
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: t.cta, boxShadow: `0 0 8px ${t.cta}` } })
          )
        ),
        // Tab bar
        React.createElement('div', { style: { display: 'flex', gap: 0 } },
          guildTabs.map(tab => React.createElement('button', {
            key: tab,
            onClick: () => setActiveGuildTab(tab),
            style: {
              flex: 1, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif',
              color: activeGuildTab === tab ? '#fff' : 'rgba(255,255,255,0.5)',
              borderBottom: `2.5px solid ${activeGuildTab === tab ? t.accent1 : 'transparent'}`,
              transition: 'all 0.2s ease', textTransform: 'capitalize'
            }
          }, tab))
        )
      ),

      // Tab Content
      React.createElement('div', { style: { padding: '16px 20px' } },
        activeGuildTab === 'overview' && React.createElement('div', { className: 'screen-enter' },
          // Stats grid
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 } },
            [
              { label: 'Total Fragments', value: '2,847', icon: 'Layers', color: t.primary },
              { label: 'Rituals Held', value: '63', icon: 'Flame', color: '#EC4899' },
              { label: 'Lore Arcs', value: '12', icon: 'BookOpen', color: t.accent1 },
              { label: 'Members', value: '47', icon: 'Users', color: t.cta },
            ].map((stat, i) => React.createElement('div', { key: i, style: { background: t.bgCard, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}` } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
                React.createElement(Icon, { name: stat.icon, size: 16, color: stat.color }),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif', fontWeight: 600 } }, stat.label)
              ),
              React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: t.text, fontFamily: 'Inter, sans-serif' } }, stat.value)
            ))
          ),
          // LoreMuse evolution bar
          React.createElement('div', { style: { background: t.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`, marginBottom: 12 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, 'Tempestia Evolution'),
              React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600, fontFamily: 'Inter, sans-serif' } }, 'Lvl 7 → 8')
            ),
            React.createElement('div', { style: { height: 10, background: t.divider, borderRadius: 10, overflow: 'hidden', marginBottom: 6 } },
              React.createElement('div', { style: { height: '100%', width: '68%', background: `linear-gradient(90deg, ${t.primary} 0%, ${t.secondary} 100%)`, borderRadius: 10, transition: 'width 1s ease' } })
            ),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, '340 / 500 fragments until next evolution')
          ),
          React.createElement(Button, { variant: 'primary', style: { width: '100%', justifyContent: 'center' }, icon: 'Plus' }, 'Invite Members')
        ),

        activeGuildTab === 'lore' && React.createElement('div', { className: 'screen-enter' },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' } }, 'Active Narrative Arcs'),
          loreArcs.map((arc, i) => React.createElement('div', {
            key: i,
            className: 'card-hover',
            style: { background: t.bgCard, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 10 }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, arc.title),
                React.createElement('div', { style: { fontSize: 11, color: arc.color, fontWeight: 700, fontFamily: 'Inter, sans-serif', marginTop: 2 } }, arc.status)
              ),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `${arc.frags} frags`)
            ),
            React.createElement('div', { style: { height: 6, background: t.divider, borderRadius: 10, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${arc.progress}%`, background: arc.progress === 100 ? `linear-gradient(90deg, ${t.cta} 0%, #4ADE80 100%)` : `linear-gradient(90deg, ${arc.color} 0%, ${arc.color}80 100%)`, borderRadius: 10 } })
            ),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginTop: 5 } }, `${arc.progress}% developed`)
          ))
        ),

        activeGuildTab === 'members' && React.createElement('div', { className: 'screen-enter' },
          members.map((member, i) => React.createElement('div', {
            key: i,
            className: 'card-hover',
            style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: t.bgCard, borderRadius: 14, border: `1px solid ${t.border}`, marginBottom: 8 }
          },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif', flexShrink: 0 } }, member.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, member.name),
              React.createElement('div', { style: { fontSize: 11, color: t.primary, fontFamily: 'Inter, sans-serif', fontWeight: 600 } }, member.role),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `Joined ${member.joined}`)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif' } }, member.frags),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'fragments')
            )
          ))
        )
      )
    );
  };

  // Screen Map
  const screens = {
    home: HomeScreen,
    rituals: RitualsScreen,
    archive: ArchiveScreen,
    forge: ForgeScreen,
    guild: GuildScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'rituals', label: 'Rituals', icon: 'Flame' },
    { id: 'forge', label: 'Forge', icon: 'Feather' },
    { id: 'archive', label: 'Archive', icon: 'Map' },
    { id: 'guild', label: 'Guild', icon: 'Users' },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Inter, sans-serif' }
  },
    // Phone Frame
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', position: 'relative' }
    },
      // Screen Content
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: { position: 'absolute', bottom: 0, left: 0, right: 0, background: t.bgNavbar, borderTop: `1px solid ${t.border}`, display: 'flex', paddingBottom: 8, paddingTop: 6, boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.4)' : '0 -4px 20px rgba(0,0,0,0.06)' }
      },
        navItems.map(item => React.createElement('button', {
          key: item.id,
          onClick: () => navigate(item.id),
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 0', background: 'none', border: 'none', cursor: 'pointer', minHeight: 52, transition: 'all 0.2s ease', position: 'relative' }
        },
          item.id === 'forge' && React.createElement('div', {
            style: { position: 'absolute', top: -18, width: 50, height: 50, borderRadius: 16, background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px rgba(124,58,237,0.5)` }
          },
            React.createElement(Icon, { name: item.icon, size: 20, color: '#fff' })
          ),
          item.id !== 'forge' && React.createElement('div', { style: { position: 'relative' } },
            React.createElement(Icon, { name: item.icon, size: 22, color: activeTab === item.id ? t.navActive : t.navInactive }),
            activeTab === item.id && React.createElement('div', { style: { position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: t.primary } })
          ),
          item.id !== 'forge' && React.createElement('span', {
            style: { fontSize: 10, fontWeight: activeTab === item.id ? 700 : 500, color: activeTab === item.id ? t.navActive : t.navInactive, fontFamily: 'Inter, sans-serif' }
          }, item.label),
          item.id === 'forge' && React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.primary, fontFamily: 'Inter, sans-serif', marginTop: 18 } }, item.label)
        ))
      )
    )
  );
}
