
function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#0a1628',
      surface: '#0f2040',
      card: '#132847',
      border: '#1e3a5f',
      text: '#f0f9ff',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      primary: '#0891B2',
      secondary: '#22D3EE',
      cta: '#059669',
      ctaLight: '#10b981',
      accent: '#0e7490',
      inputBg: '#0d1f3c',
    },
    light: {
      bg: '#ECFEFF',
      surface: '#ffffff',
      card: '#f0fdff',
      border: '#a5f3fc',
      text: '#0c4a6e',
      textSecondary: '#0369a1',
      textMuted: '#64748b',
      primary: '#0891B2',
      secondary: '#22D3EE',
      cta: '#059669',
      ctaLight: '#10b981',
      accent: '#0e7490',
      inputBg: '#e0f2fe',
    }
  };

  const [theme, setTheme] = useState('dark');
  const [activeScreen, setActiveScreen] = useState('home');
  const t = themes[theme];

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Open+Sans:wght@400;500;600&display=swap');
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.85; } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes grow { from { transform: scale(0.8) rotate(-5deg); opacity: 0; } to { transform: scale(1) rotate(0deg); opacity: 1; } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    @keyframes ringPulse { 0% { box-shadow: 0 0 0 0 rgba(8,145,178,0.4); } 70% { box-shadow: 0 0 0 12px rgba(8,145,178,0); } 100% { box-shadow: 0 0 0 0 rgba(8,145,178,0); } }
    .eco-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(8,145,178,0.25) !important; }
    .eco-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .eco-btn:active { transform: scale(0.96); }
    .eco-btn { transition: all 0.15s ease; cursor: pointer; }
    .eco-tab:hover { opacity: 0.85; }
    .eco-tab { transition: all 0.2s ease; cursor: pointer; }
    .shimmer-text { background: linear-gradient(90deg, #22D3EE, #0891B2, #059669, #22D3EE); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
    .canopy-item { animation: grow 0.4s ease forwards; }
    .canopy-item:hover { transform: scale(1.15) !important; }
  `;

  // ── Screens ────────────────────────────────────────────────────────────────

  function HomeScreen() {
    const [challengeDone, setChallengeDone] = useState([false, false, false]);
    const [scoreAnim, setScoreAnim] = useState(false);

    const toggleChallenge = (i) => {
      const next = [...challengeDone];
      next[i] = !next[i];
      setChallengeDone(next);
      setScoreAnim(true);
      setTimeout(() => setScoreAnim(false), 600);
    };

    const completed = challengeDone.filter(Boolean).length;
    const score = 742 + completed * 18;

    const challenges = [
      { icon: window.lucide.Zap, title: 'Switch to LED lighting in 1 meeting room', xp: '+18 XP', tag: 'Energy', color: '#f59e0b' },
      { icon: window.lucide.Users, title: 'Send a 15-min agenda to cut meeting time', xp: '+18 XP', tag: 'Efficiency', color: '#0891B2' },
      { icon: window.lucide.Leaf, title: 'Order from a local, sustainable supplier today', xp: '+18 XP', tag: 'Supply Chain', color: '#059669' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', padding: '0 0 80px' } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 16px', background: `linear-gradient(160deg, ${t.surface} 0%, ${t.bg} 100%)` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 13, color: t.textMuted, margin: 0 } }, 'Good morning 🌿'),
            React.createElement('h2', { style: { fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: t.text, margin: '2px 0 0' } }, 'Alex Rivera')
          ),
          React.createElement('div', {
            className: 'eco-btn',
            onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
            style: { width: 40, height: 40, borderRadius: 20, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            React.createElement(theme === 'dark' ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: t.secondary })
          )
        ),
        // Score card
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary} 0%, #0e7490 50%, ${t.cta} 100%)`,
            borderRadius: 20, padding: '18px 20px',
            boxShadow: '0 8px 32px rgba(8,145,178,0.35)',
            animation: scoreAnim ? 'pulse 0.5s ease' : 'none'
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 11, color: 'rgba(255,255,255,0.75)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: 1 } }, 'Impact Resonance Score'),
              React.createElement('h1', { style: { fontFamily: 'Poppins', fontSize: 42, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1 } }, score),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 } },
                React.createElement(window.lucide.TrendingUp, { size: 14, color: '#86efac' }),
                React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 12, color: '#86efac' } }, '+54 pts this week')
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { width: 64, height: 64, borderRadius: 32, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float 3s ease-in-out infinite' } },
                React.createElement(window.lucide.Sprout, { size: 32, color: '#fff' })
              ),
              React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: '6px 0 0' } }, 'Level 7 · Eco Leader')
            )
          ),
          React.createElement('div', { style: { marginTop: 14, background: 'rgba(255,255,255,0.15)', borderRadius: 6, height: 6 } },
            React.createElement('div', { style: { width: `${(completed / 3) * 100 || 10}%`, height: '100%', borderRadius: 6, background: '#fff', transition: 'width 0.5s ease' } })
          ),
          React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: '5px 0 0' } }, `${completed}/3 daily challenges · ${3 - completed} remaining`)
        )
      ),

      // Eco-Spark Challenges
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { fontFamily: 'Poppins', fontSize: 16, fontWeight: 700, color: t.text, margin: 0 } }, 'Eco-Spark Challenges'),
          React.createElement('span', {
            className: 'eco-btn',
            onClick: () => setActiveScreen('challenges'),
            style: { fontFamily: 'Open Sans', fontSize: 12, color: t.secondary, cursor: 'pointer' }
          }, 'See all')
        ),
        challenges.map((c, i) =>
          React.createElement('div', {
            key: i,
            className: 'eco-card eco-btn',
            onClick: () => toggleChallenge(i),
            style: {
              background: challengeDone[i] ? `${t.cta}22` : t.card,
              border: `1px solid ${challengeDone[i] ? t.cta : t.border}`,
              borderRadius: 16, padding: '14px 16px', marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: challengeDone[i] ? `0 0 16px ${t.cta}33` : 'none'
            }
          },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(c.icon, { size: 20, color: c.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 13, color: t.text, margin: '0 0 3px', fontWeight: 600, textDecoration: challengeDone[i] ? 'line-through' : 'none', opacity: challengeDone[i] ? 0.6 : 1 } }, c.title),
              React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
                React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: c.color, background: `${c.color}20`, padding: '2px 7px', borderRadius: 20 } }, c.tag),
                React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: t.ctaLight } }, c.xp)
              )
            ),
            React.createElement('div', { style: { width: 26, height: 26, borderRadius: 13, border: `2px solid ${challengeDone[i] ? t.cta : t.border}`, background: challengeDone[i] ? t.cta : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              challengeDone[i] && React.createElement(window.lucide.Check, { size: 14, color: '#fff' })
            )
          )
        )
      ),

      // AI Nudge
      React.createElement('div', { style: { margin: '16px 20px 0', background: `linear-gradient(135deg, ${t.accent}33, ${t.surface})`, border: `1px solid ${t.secondary}44`, borderRadius: 16, padding: '14px 16px' } },
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${t.secondary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'ringPulse 2s infinite' } },
            React.createElement(window.lucide.Brain, { size: 18, color: t.secondary })
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, color: t.secondary, margin: '0 0 3px' } }, 'AI Coach Nudge'),
            React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 12, color: t.textSecondary, margin: 0, lineHeight: 1.5 } }, 'You typically have back-to-back meetings on Thursdays. Try a 5-min "energy audit" today — rate your focus levels to help me tailor tomorrow\'s challenges.')
          )
        )
      )
    );
  }

  function CanopyScreen() {
    const [selected, setSelected] = useState(null);

    const collectibles = [
      { id: 0, icon: window.lucide.TreePine, name: 'Cedar Sentinel', rarity: 'Rare', color: '#059669', earned: true, impact: 'Reduced paper use by 40%' },
      { id: 1, icon: window.lucide.Flower2, name: 'Solar Bloom', rarity: 'Common', color: '#f59e0b', earned: true, impact: 'Switched to renewable energy provider' },
      { id: 2, icon: window.lucide.Bird, name: 'Indigo Kingfisher', rarity: 'Epic', color: '#7c3aed', earned: true, impact: 'Zero-waste office week achieved' },
      { id: 3, icon: window.lucide.Waves, name: 'Ripple Fern', rarity: 'Common', color: '#0891B2', earned: true, impact: '50 meetings optimized' },
      { id: 4, icon: window.lucide.Bug, name: 'Luna Moth', rarity: 'Rare', color: '#ec4899', earned: true, impact: 'Local supplier network built' },
      { id: 5, icon: window.lucide.Sparkles, name: 'Biolume Coral', rarity: 'Legendary', color: '#22D3EE', earned: false, impact: '100 challenges completed' },
      { id: 6, icon: window.lucide.Mountain, name: 'Misty Peak Moss', rarity: 'Uncommon', color: '#84cc16', earned: false, impact: 'Carbon neutral quarter' },
      { id: 7, icon: window.lucide.Sun, name: 'Dawn Dragonfly', rarity: 'Epic', color: '#f97316', earned: false, impact: '6-month streak' },
    ];

    const rarityColor = { Common: '#64748b', Uncommon: '#84cc16', Rare: '#0891B2', Epic: '#7c3aed', Legendary: '#f59e0b' };
    const earned = collectibles.filter(c => c.earned);

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 16px' } },
        React.createElement('h2', { style: { fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' } }, 'Conscious Canopy'),
        React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 13, color: t.textMuted, margin: 0 } }, `${earned.length} of ${collectibles.length} collectibles unlocked`)
      ),

      // Canopy visual
      React.createElement('div', { style: { margin: '0 20px 20px', background: `linear-gradient(160deg, #052e16 0%, #0a1628 60%, #0c2a4a 100%)`, borderRadius: 20, padding: 20, minHeight: 200, position: 'relative', overflow: 'hidden', border: `1px solid ${t.cta}44` } },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%, rgba(5,150,105,0.15) 0%, transparent 70%)' } }),
        React.createElement('p', { style: { fontFamily: 'Poppins', fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 } }, 'Your Ecosystem'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10, position: 'relative' } },
          earned.map((c, i) =>
            React.createElement('div', {
              key: c.id,
              className: 'canopy-item eco-btn',
              onClick: () => setSelected(c),
              style: { animationDelay: `${i * 0.1}s`, width: 52, height: 52, borderRadius: 16, background: `${c.color}33`, border: `1px solid ${c.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
            },
              React.createElement(c.icon, { size: 26, color: c.color })
            )
          ),
          React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Lock, { size: 18, color: 'rgba(255,255,255,0.2)' })
          )
        )
      ),

      // Selected collectible detail
      selected && React.createElement('div', { style: { margin: '0 20px 16px', background: t.card, border: `1px solid ${selected.color}66`, borderRadius: 20, padding: 18 } },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 18, background: `${selected.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(selected.icon, { size: 28, color: selected.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h4', { style: { fontFamily: 'Poppins', fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 3px' } }, selected.name),
            React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 11, color: rarityColor[selected.rarity], background: `${rarityColor[selected.rarity]}22`, padding: '2px 8px', borderRadius: 20 } }, selected.rarity),
            React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 12, color: t.textSecondary, margin: '6px 0 0' } }, `Impact: ${selected.impact}`)
          ),
          React.createElement('div', { className: 'eco-btn', onClick: () => setSelected(null), style: { padding: 6 } },
            React.createElement(window.lucide.X, { size: 16, color: t.textMuted })
          )
        )
      ),

      // Grid
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', { style: { fontFamily: 'Poppins', fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 10px' } }, 'All Collectibles'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          collectibles.map(c =>
            React.createElement('div', {
              key: c.id,
              className: 'eco-card eco-btn',
              onClick: () => c.earned && setSelected(c),
              style: { background: c.earned ? t.card : `${t.surface}88`, border: `1px solid ${c.earned ? c.color + '44' : t.border}`, borderRadius: 16, padding: 14, opacity: c.earned ? 1 : 0.5 }
            },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 } },
                c.earned
                  ? React.createElement(c.icon, { size: 22, color: c.color })
                  : React.createElement(window.lucide.Lock, { size: 18, color: t.textMuted })
              ),
              React.createElement('p', { style: { fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, color: t.text, margin: '0 0 3px' } }, c.name),
              React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: rarityColor[c.rarity], background: `${rarityColor[c.rarity]}22`, padding: '1px 6px', borderRadius: 10 } }, c.rarity)
            )
          )
        )
      )
    );
  }

  function ChallengesScreen() {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Energy', 'Efficiency', 'Supply Chain', 'Wellbeing'];

    const allChallenges = [
      { icon: window.lucide.Zap, title: 'Switch to LED lighting in 1 meeting room', desc: 'A quick swap that saves ~60% energy per fixture.', tag: 'Energy', xp: 18, diff: 'Easy', color: '#f59e0b' },
      { icon: window.lucide.Users, title: 'Send a 15-min agenda to cut meeting time', desc: 'Focused meetings reduce cognitive load and energy waste.', tag: 'Efficiency', xp: 18, diff: 'Easy', color: '#0891B2' },
      { icon: window.lucide.Leaf, title: 'Order from a local, sustainable supplier', desc: 'Cut transport emissions and support local economy.', tag: 'Supply Chain', xp: 18, diff: 'Medium', color: '#059669' },
      { icon: window.lucide.Coffee, title: 'Replace 1 plastic cup with a reusable mug', desc: 'Small swaps compound into significant waste reduction.', tag: 'Wellbeing', xp: 12, diff: 'Easy', color: '#ec4899' },
      { icon: window.lucide.Monitor, title: 'Enable power-save mode on office monitors', desc: 'Automatic shutdown after 10 mins saves ~30W per screen.', tag: 'Energy', xp: 14, diff: 'Easy', color: '#f59e0b' },
      { icon: window.lucide.FileText, title: 'Go paperless for 1 client report this week', desc: 'Digital reports eliminate printing and delivery emissions.', tag: 'Efficiency', xp: 22, diff: 'Medium', color: '#0891B2' },
      { icon: window.lucide.Heart, title: 'Take a 10-min outdoor break at lunch', desc: 'Nature exposure reduces cortisol and boosts creativity.', tag: 'Wellbeing', xp: 16, diff: 'Easy', color: '#ec4899' },
    ];

    const diffColor = { Easy: '#059669', Medium: '#f59e0b', Hard: '#ef4444' };
    const filtered = filter === 'All' ? allChallenges : allChallenges.filter(c => c.tag === filter);

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('h2', { style: { fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' } }, 'Eco-Spark Challenges'),
        React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 13, color: t.textMuted, margin: '0 0 16px' } }, 'AI-generated challenges for your profile')
      ),
      // Filter chips
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' } },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            className: 'eco-btn',
            onClick: () => setFilter(f),
            style: { fontFamily: 'Open Sans', fontSize: 12, fontWeight: 600, padding: '7px 14px', borderRadius: 20, border: `1px solid ${filter === f ? t.primary : t.border}`, background: filter === f ? t.primary : t.card, color: filter === f ? '#fff' : t.textSecondary, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }
          }, f)
        )
      ),
      // Challenge list
      React.createElement('div', { style: { padding: '0 20px' } },
        filtered.map((c, i) =>
          React.createElement('div', {
            key: i,
            className: 'eco-card',
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16, marginBottom: 12 }
          },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(c.icon, { size: 22, color: c.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('h4', { style: { fontFamily: 'Poppins', fontSize: 13, fontWeight: 700, color: t.text, margin: '0 8px 4px 0', flex: 1 } }, c.title),
                  React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 11, color: t.ctaLight, background: `${t.cta}22`, padding: '2px 7px', borderRadius: 10, flexShrink: 0 } }, `+${c.xp} XP`)
                ),
                React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 12, color: t.textSecondary, margin: '0 0 8px', lineHeight: 1.5 } }, c.desc),
                React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                  React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: c.color, background: `${c.color}20`, padding: '2px 8px', borderRadius: 10 } }, c.tag),
                  React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: diffColor[c.diff] } }, c.diff),
                  React.createElement('div', { style: { flex: 1 } }),
                  React.createElement('button', {
                    className: 'eco-btn',
                    style: { fontFamily: 'Open Sans', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 10, border: 'none', background: t.cta, color: '#fff', cursor: 'pointer' }
                  }, 'Start')
                )
              )
            )
          )
        )
      )
    );
  }

  function HubScreen() {
    const [activeTab, setActiveTab] = useState('suppliers');

    const suppliers = [
      { icon: window.lucide.Package, name: 'GreenPack Co.', category: 'Packaging', rating: 4.8, desc: 'Compostable office supplies, same-day delivery', dist: '2.4 km', badge: 'B-Corp' },
      { icon: window.lucide.Cpu, name: 'EcoTech Rentals', category: 'Equipment', rating: 4.6, desc: 'Refurbished tech hardware with 2-year warranty', dist: '5.1 km', badge: 'Verified' },
      { icon: window.lucide.Coffee, name: 'Harvest Bean', category: 'F&B', rating: 4.9, desc: 'Fair-trade, zero-waste coffee subscription', dist: '1.2 km', badge: 'Local' },
      { icon: window.lucide.Lightbulb, name: 'BrightWatts', category: 'Energy', rating: 4.7, desc: 'SMB solar panel leasing with ROI calculator', dist: '8.3 km', badge: 'Certified' },
    ];

    const resources = [
      { icon: window.lucide.BookOpen, title: 'SMB Green Tax Credits 2026', desc: 'Up to $5,000 in deductions for sustainable upgrades.', tag: 'Finance', color: '#f59e0b' },
      { icon: window.lucide.Award, title: 'B-Corp Certification Roadmap', desc: 'Step-by-step guide to achieving B-Corp status.', tag: 'Certification', color: '#7c3aed' },
      { icon: window.lucide.BarChart2, title: 'Carbon Audit Starter Kit', desc: 'Free template to measure your business footprint.', tag: 'Tools', color: '#0891B2' },
      { icon: window.lucide.Globe, title: 'Sustainable Office Checklist', desc: '50-point checklist for eco-friendly workplaces.', tag: 'Guide', color: '#059669' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 16px' } },
        React.createElement('h2', { style: { fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' } }, 'SMB Sustainability Hub'),
        React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 13, color: t.textMuted, margin: '0 0 16px' } }, 'Localized resources for your business')
      ),
      // Tab switcher
      React.createElement('div', { style: { display: 'flex', margin: '0 20px 16px', background: t.card, borderRadius: 14, padding: 4 } },
        ['suppliers', 'resources'].map(tab =>
          React.createElement('button', {
            key: tab,
            className: 'eco-btn',
            onClick: () => setActiveTab(tab),
            style: { flex: 1, fontFamily: 'Poppins', fontSize: 13, fontWeight: 700, padding: '9px', border: 'none', borderRadius: 10, cursor: 'pointer', background: activeTab === tab ? t.primary : 'transparent', color: activeTab === tab ? '#fff' : t.textMuted, textTransform: 'capitalize' }
          }, tab)
        )
      ),

      activeTab === 'suppliers' && React.createElement('div', { style: { padding: '0 20px' } },
        suppliers.map((s, i) =>
          React.createElement('div', {
            key: i,
            className: 'eco-card',
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16, marginBottom: 12 }
          },
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 16, background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(s.icon, { size: 24, color: t.primary })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('div', null,
                    React.createElement('h4', { style: { fontFamily: 'Poppins', fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 2px' } }, s.name),
                    React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: t.textMuted } }, s.category)
                  ),
                  React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: t.ctaLight, background: `${t.cta}22`, padding: '2px 7px', borderRadius: 10 } }, s.badge)
                ),
                React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 12, color: t.textSecondary, margin: '5px 0 6px', lineHeight: 1.4 } }, s.desc),
                React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                  React.createElement('div', { style: { display: 'flex', gap: 2, alignItems: 'center' } },
                    React.createElement(window.lucide.Star, { size: 12, color: '#f59e0b', fill: '#f59e0b' }),
                    React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 11, color: t.textSecondary } }, s.rating)
                  ),
                  React.createElement('div', { style: { display: 'flex', gap: 3, alignItems: 'center' } },
                    React.createElement(window.lucide.MapPin, { size: 11, color: t.textMuted }),
                    React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 11, color: t.textMuted } }, s.dist)
                  ),
                  React.createElement('div', { style: { flex: 1 } }),
                  React.createElement('button', {
                    className: 'eco-btn',
                    style: { fontFamily: 'Open Sans', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 9, border: `1px solid ${t.primary}`, background: 'transparent', color: t.secondary, cursor: 'pointer' }
                  }, 'Contact')
                )
              )
            )
          )
        )
      ),

      activeTab === 'resources' && React.createElement('div', { style: { padding: '0 20px' } },
        resources.map((r, i) =>
          React.createElement('div', {
            key: i,
            className: 'eco-card',
            style: { background: t.card, border: `1px solid ${r.color}33`, borderRadius: 18, padding: 16, marginBottom: 12, display: 'flex', gap: 12 }
          },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${r.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(r.icon, { size: 22, color: r.color })
            ),
            React.createElement('div', null,
              React.createElement('h4', { style: { fontFamily: 'Poppins', fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 3px' } }, r.title),
              React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 12, color: t.textSecondary, margin: '0 0 6px', lineHeight: 1.4 } }, r.desc),
              React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 10, color: r.color, background: `${r.color}20`, padding: '2px 8px', borderRadius: 10 } }, r.tag)
            )
          )
        )
      )
    );
  }

  function ProfileScreen() {
    const stats = [
      { label: 'Challenges Done', value: '142', icon: window.lucide.CheckCircle, color: '#059669' },
      { label: 'Current Streak', value: '23d', icon: window.lucide.Flame, color: '#f97316' },
      { label: 'CO₂ Saved', value: '340kg', icon: window.lucide.Wind, color: '#0891B2' },
      { label: 'Collectibles', value: '5/8', icon: window.lucide.Gem, color: '#7c3aed' },
    ];

    const goals = [
      { label: 'Go paper-free', pct: 72, color: '#059669' },
      { label: 'Local sourcing 80%', pct: 55, color: '#0891B2' },
      { label: 'Carbon neutral ops', pct: 33, color: '#f59e0b' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', paddingBottom: 80 } },
      // Profile header
      React.createElement('div', { style: { background: `linear-gradient(160deg, ${t.surface} 0%, ${t.bg} 100%)`, padding: '20px 20px 24px', textAlign: 'center' } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 0 0 4px ${t.bg}, 0 0 0 6px ${t.primary}55` } },
          React.createElement(window.lucide.User, { size: 36, color: '#fff' })
        ),
        React.createElement('h2', { style: { fontFamily: 'Poppins', fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 2px' } }, 'Alex Rivera'),
        React.createElement('p', { style: { fontFamily: 'Open Sans', fontSize: 13, color: t.textSecondary, margin: '0 0 4px' } }, 'Founder · GreenLeaf Studio'),
        React.createElement('div', { style: { display: 'inline-flex', gap: 6, alignItems: 'center', background: `${t.primary}22`, borderRadius: 20, padding: '4px 12px' } },
          React.createElement(window.lucide.Award, { size: 14, color: t.secondary }),
          React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 12, color: t.secondary, fontWeight: 600 } }, 'Level 7 · Eco Leader')
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 20px' } },
        stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            className: 'eco-card',
            style: { background: t.card, border: `1px solid ${s.color}33`, borderRadius: 16, padding: '14px 16px' }
          },
            React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 } },
              React.createElement(s.icon, { size: 16, color: s.color }),
              React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 11, color: t.textMuted } }, s.label)
            ),
            React.createElement('span', { style: { fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: s.color } }, s.value)
          )
        )
      ),

      // Goals
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('h3', { style: { fontFamily: 'Poppins', fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Sustainability Goals'),
        goals.map((g, i) =>
          React.createElement('div', { key: i, style: { marginBottom: 14 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 13, color: t.text, fontWeight: 600 } }, g.label),
              React.createElement('span', { style: { fontFamily: 'Poppins', fontSize: 13, color: g.color, fontWeight: 700 } }, `${g.pct}%`)
            ),
            React.createElement('div', { style: { background: t.card, borderRadius: 6, height: 8 } },
              React.createElement('div', { style: { width: `${g.pct}%`, height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${g.color}, ${g.color}88)`, transition: 'width 0.5s ease' } })
            )
          )
        )
      ),

      // Settings
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', { style: { fontFamily: 'Poppins', fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Settings'),
        [
          { icon: window.lucide.Bell, label: 'Notifications', value: 'Daily nudges on' },
          { icon: window.lucide.Shield, label: 'Privacy', value: 'Data minimal' },
          { icon: window.lucide.HelpCircle, label: 'About EcoBloom AI', value: 'v1.2.0' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            className: 'eco-card eco-btn',
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(item.icon, { size: 18, color: t.primary })
            ),
            React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 14, color: t.text, flex: 1, fontWeight: 600 } }, item.label),
            React.createElement('span', { style: { fontFamily: 'Open Sans', fontSize: 12, color: t.textMuted } }, item.value),
            React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
          )
        )
      )
    );
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  const screens = { home: HomeScreen, canopy: CanopyScreen, challenges: ChallengesScreen, hub: HubScreen, profile: ProfileScreen };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'canopy', label: 'Canopy', icon: window.lucide.TreePine },
    { id: 'challenges', label: 'Challenges', icon: window.lucide.Zap },
    { id: 'hub', label: 'Hub', icon: window.lucide.Globe },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }
  },
    React.createElement('style', null, styleTag),
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column' }
    },
      // Scrollable content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', scrollbarWidth: 'none' } },
        React.createElement(ActiveScreen)
      ),
      // Bottom nav
      React.createElement('div', {
        style: { background: t.surface, borderTop: `1px solid ${t.border}`, padding: '8px 4px 12px', display: 'flex', justifyContent: 'space-around', flexShrink: 0 }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            className: 'eco-tab',
            onClick: () => setActiveScreen(tab.id),
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 10px', borderRadius: 14, background: activeScreen === tab.id ? `${t.primary}22` : 'transparent', minWidth: 56, cursor: 'pointer' }
          },
            React.createElement(tab.icon, { size: 20, color: activeScreen === tab.id ? t.primary : t.textMuted }),
            React.createElement('span', {
              style: { fontFamily: 'Open Sans', fontSize: 10, color: activeScreen === tab.id ? t.primary : t.textMuted, fontWeight: activeScreen === tab.id ? 700 : 400 }
            }, tab.label)
          )
        )
      )
    )
  );
}
