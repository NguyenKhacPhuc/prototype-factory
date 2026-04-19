const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [essence, setEssence] = useState(1247);
  const [streakDays, setStreakDays] = useState(12);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [biomeLevel, setBiomeLevel] = useState(7);
  const [discoveredCreatures, setDiscoveredCreatures] = useState(14);
  const [animateIn, setAnimateIn] = useState(true);

  const themes = {
    dark: {
      bg: '#1F2937',
      bgSecondary: '#111827',
      card: '#374151',
      cardAlt: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#9CA3AF',
      textMuted: '#6B7280',
      border: '#4B5563',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      overlay: 'rgba(0,0,0,0.4)',
      tabBg: '#111827',
      inputBg: '#374151',
    },
    light: {
      bg: '#F9FAFB',
      bgSecondary: '#FFFFFF',
      card: '#FFFFFF',
      cardAlt: '#F3F4F6',
      text: '#111827',
      textSecondary: '#4B5563',
      textMuted: '#9CA3AF',
      border: '#E5E7EB',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      overlay: 'rgba(0,0,0,0.1)',
      tabBg: '#FFFFFF',
      inputBg: '#F3F4F6',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const handleCompleteChallenge = (id) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges([...completedChallenges, id]);
      setEssence(prev => prev + 50);
    }
  };

  // ─── Style tag for animations ───
  const StyleTag = () =>
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.06); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 8px rgba(249,115,22,0.3); }
        50% { box-shadow: 0 0 20px rgba(249,115,22,0.6); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes growIn {
        from { transform: scale(0); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `);

  // ─── Reusable Icon Component ───
  const Icon = ({ name, size = 24, color = t.text, style = {} }) => {
    const iconFn = window.lucide && window.lucide[name];
    if (!iconFn) return null;
    const svgStr = iconFn.toString ? null : null;
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current && window.lucide && window.lucide[name]) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        const iconData = window.lucide[name];
        if (Array.isArray(iconData)) {
          iconData.forEach(([tag, attrs]) => {
            const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
            svg.appendChild(el);
          });
        }
        ref.current.innerHTML = '';
        ref.current.appendChild(svg);
      }
    }, [name, size, color]);
    return React.createElement('div', { ref, style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style } });
  };

  // ─── Lucide icon as inline SVG string approach ───
  const LucideIcon = ({ name, size = 24, color = t.text, strokeWidth = 2 }) => {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) {
        try {
          const result = window.lucide.createElement(window.lucide.icons[name]);
          if (result) {
            result.setAttribute('width', size);
            result.setAttribute('height', size);
            result.setAttribute('stroke', color);
            result.setAttribute('stroke-width', strokeWidth);
            ref.current.innerHTML = '';
            ref.current.appendChild(result);
          }
        } catch(e) {
          // fallback: try direct access
          ref.current.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/></svg>`;
        }
      }
    }, [name, size, color, strokeWidth]);
    return React.createElement('span', { ref, style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0 } });
  };

  // ─── HOME SCREEN ───
  const HomeScreen = () => {
    const [pressedCard, setPressedCard] = useState(null);

    const quickActions = [
      { id: 'walk', icon: 'Footprints', label: 'Log Walk', essence: 25, color: '#22C55E' },
      { id: 'meal', icon: 'UtensilsCrossed', label: 'Log Meal', essence: 20, color: '#F97316' },
      { id: 'bike', icon: 'Bike', label: 'Bike Trip', essence: 35, color: '#3B82F6' },
      { id: 'recycle', icon: 'Recycle', label: 'Recycled', essence: 15, color: '#8B5CF6' },
    ];

    const recentDiscoveries = [
      { name: 'Amber Fern Spirit', type: 'Spirit Sprout', rarity: 'Uncommon', color: '#FB923C' },
      { name: 'Coral Bloom Guardian', type: 'Vitality Guardian', rarity: 'Rare', color: '#F43F5E' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.5px' } }, 'EcoBloom'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0' } }, 'Good morning! Your biome thrives.')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: 44, height: 44, borderRadius: 22, border: 'none', background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }
        }, React.createElement(LucideIcon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Essence & Streak Banner
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
        borderRadius: 20, padding: '20px', marginBottom: 20,
        boxShadow: '0 8px 32px rgba(249,115,22,0.3)',
        position: 'relative', overflow: 'hidden',
      } },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 } },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
              React.createElement(LucideIcon, { name: 'Sparkles', size: 18, color: '#FFF' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 1 } }, 'Growth Essence')
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 40, fontWeight: 800, color: '#FFF', letterSpacing: '-1px' } }, essence.toLocaleString())
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, justifyContent: 'flex-end' } },
              React.createElement(LucideIcon, { name: 'Flame', size: 18, color: '#FEF08A' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 1 } }, 'Streak')
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 40, fontWeight: 800, color: '#FFF', letterSpacing: '-1px' } }, `${streakDays}d`)
          )
        )
      ),

      // Quick Actions
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 12px', letterSpacing: '-0.3px' } }, 'Quick Log'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 24 } },
        ...quickActions.map((action, i) =>
          React.createElement('button', {
            key: action.id,
            onMouseDown: () => setPressedCard(action.id),
            onMouseUp: () => setPressedCard(null),
            onMouseLeave: () => setPressedCard(null),
            onClick: () => setEssence(prev => prev + action.essence),
            style: {
              background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16,
              padding: '14px 4px', cursor: 'pointer', textAlign: 'center',
              transition: 'all 200ms ease',
              transform: pressedCard === action.id ? 'scale(0.93)' : 'scale(1)',
              boxShadow: pressedCard === action.id ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
              animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
            }
          },
            React.createElement(LucideIcon, { name: action.icon, size: 26, color: action.color }),
            React.createElement('div', { style: { fontFamily: font, fontSize: 12, fontWeight: 600, color: t.text, marginTop: 6 } }, action.label),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.cta, marginTop: 2, fontWeight: 600 } }, `+${action.essence}`)
          )
        )
      ),

      // Biome Status
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 12px', letterSpacing: '-0.3px' } }, 'Your Biome'),
      React.createElement('div', {
        onClick: () => setActiveScreen('biome'),
        style: {
          background: t.card, borderRadius: 20, padding: 20, marginBottom: 20,
          border: `1px solid ${t.border}`, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          transition: 'transform 200ms ease, box-shadow 200ms ease',
          animation: 'slideUp 0.5s ease 0.2s both',
        },
        onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; },
        onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${t.cta}, #059669)`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 3s ease infinite' } },
              React.createElement(LucideIcon, { name: 'TreePine', size: 24, color: '#FFF' })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text } }, `Level ${biomeLevel} Biome`),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, `${discoveredCreatures} species discovered`)
            )
          ),
          React.createElement(LucideIcon, { name: 'ChevronRight', size: 20, color: t.textMuted })
        ),
        // Progress bar
        React.createElement('div', { style: { background: t.bgSecondary, borderRadius: 8, height: 8, overflow: 'hidden' } },
          React.createElement('div', { style: {
            width: '68%', height: '100%', borderRadius: 8,
            background: `linear-gradient(90deg, ${t.cta}, #34D399)`,
            transition: 'width 500ms ease',
          } })
        ),
        React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textSecondary, marginTop: 6, textAlign: 'right' } }, '680 / 1000 Essence to Level 8')
      ),

      // Recent Discoveries
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 12px', letterSpacing: '-0.3px' } }, 'Recent Discoveries'),
      ...recentDiscoveries.map((disc, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
            border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14,
            animation: `slideUp 0.4s ease ${0.3 + i * 0.1}s both`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }
        },
          React.createElement('div', { style: {
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, ${disc.color}22, ${disc.color}44)`,
            border: `2px solid ${disc.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'float 4s ease infinite',
            animationDelay: `${i * 0.5}s`,
          } },
            React.createElement(LucideIcon, { name: disc.type === 'Spirit Sprout' ? 'Sprout' : 'Shield', size: 22, color: disc.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, disc.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, disc.type)
          ),
          React.createElement('span', { style: {
            fontFamily: font, fontSize: 11, fontWeight: 700, color: disc.rarity === 'Rare' ? '#F43F5E' : '#FB923C',
            background: disc.rarity === 'Rare' ? '#F43F5E18' : '#FB923C18',
            padding: '3px 8px', borderRadius: 8,
          } }, disc.rarity)
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ─── BIOME SCREEN ───
  const BiomeScreen = () => {
    const [selectedCreature, setSelectedCreature] = useState(null);

    const creatures = [
      { id: 1, name: 'Ember Fern', type: 'Spirit Sprout', rarity: 'Common', icon: 'Sprout', color: '#22C55E', desc: 'Born from daily walks. Glows softly at dusk.', habit: 'Walking' },
      { id: 2, name: 'Coral Bloom Guardian', type: 'Vitality Guardian', rarity: 'Rare', icon: 'Shield', color: '#F43F5E', desc: 'Protects your biome. Earned through consistent meal logging.', habit: 'Mindful Eating' },
      { id: 3, name: 'Amber Vine Dancer', type: 'Spirit Sprout', rarity: 'Uncommon', icon: 'Flower2', color: '#FB923C', desc: 'Swirls with warm light. Appears when you cycle.', habit: 'Cycling' },
      { id: 4, name: 'Sapphire Moss Elder', type: 'Vitality Guardian', rarity: 'Epic', icon: 'TreePine', color: '#3B82F6', desc: 'Ancient and wise. Rewards waste reduction efforts.', habit: 'Recycling' },
      { id: 5, name: 'Jade Petal Wisp', type: 'Spirit Sprout', rarity: 'Common', icon: 'Leaf', color: '#10B981', desc: 'Flutters gently. Grows when you eat vegetables.', habit: 'Healthy Eating' },
      { id: 6, name: 'Rose Quartz Sentinel', type: 'Vitality Guardian', rarity: 'Rare', icon: 'Heart', color: '#EC4899', desc: 'Radiates calm. Earned through meditation sessions.', habit: 'Meditation' },
      { id: 7, name: 'Golden Spore Drift', type: 'Spirit Sprout', rarity: 'Uncommon', icon: 'Wind', color: '#EAB308', desc: 'Floats on thermals. Linked to outdoor activities.', habit: 'Outdoors' },
      { id: 8, name: 'Twilight Root Keeper', type: 'Vitality Guardian', rarity: 'Common', icon: 'Anchor', color: '#8B5CF6', desc: 'Grounds the biome. Steady habits bring it forth.', habit: 'Consistency' },
    ];

    const rarityColors = { Common: '#9CA3AF', Uncommon: '#FB923C', Rare: '#F43F5E', Epic: '#8B5CF6' };

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.5px' } }, 'Your Biome'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: t.card, padding: '8px 14px', borderRadius: 12, border: `1px solid ${t.border}` } },
          React.createElement(LucideIcon, { name: 'Sparkles', size: 16, color: t.primary }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary } }, essence)
        )
      ),

      // Biome visual
      React.createElement('div', { style: {
        background: `linear-gradient(180deg, #064E3B, #065F46, #047857)`,
        borderRadius: 24, height: 200, marginBottom: 20, position: 'relative',
        overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      } },
        // Decorative elements
        ...[0,1,2,3,4,5].map(i =>
          React.createElement('div', { key: `tree-${i}`, style: {
            position: 'absolute',
            bottom: 10 + Math.random() * 40,
            left: `${10 + i * 15}%`,
            animation: `float ${3 + i * 0.5}s ease infinite`,
            animationDelay: `${i * 0.3}s`,
          } },
            React.createElement(LucideIcon, { name: ['TreePine', 'Sprout', 'Flower2', 'Leaf', 'TreePine', 'Flower2'][i], size: 28 + i * 4, color: ['#34D399', '#A7F3D0', '#FCD34D', '#6EE7B7', '#34D399', '#FB923C'][i] })
          )
        ),
        // Floating particles
        ...[0,1,2,3].map(i =>
          React.createElement('div', { key: `p-${i}`, style: {
            position: 'absolute', width: 6, height: 6, borderRadius: 3,
            background: ['#FCD34D', '#34D399', '#FB923C', '#A78BFA'][i],
            top: `${20 + i * 15}%`, left: `${15 + i * 20}%`,
            animation: `float ${2 + i * 0.7}s ease infinite`,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          } })
        ),
        React.createElement('div', { style: { position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: '#D1FAE5', background: 'rgba(0,0,0,0.3)', padding: '6px 16px', borderRadius: 12 } }, `Level ${biomeLevel} — Verdant Meadow`)
        )
      ),

      // Collection
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 12px', letterSpacing: '-0.3px' } }, `Collection (${creatures.length})`),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        ...creatures.map((c, i) =>
          React.createElement('button', {
            key: c.id,
            onClick: () => setSelectedCreature(selectedCreature?.id === c.id ? null : c),
            style: {
              background: selectedCreature?.id === c.id ? `${c.color}15` : t.card,
              border: `1.5px solid ${selectedCreature?.id === c.id ? c.color : t.border}`,
              borderRadius: 16, padding: 14, cursor: 'pointer', textAlign: 'left',
              transition: 'all 200ms ease',
              animation: `growIn 0.4s ease ${i * 0.06}s both`,
              boxShadow: selectedCreature?.id === c.id ? `0 4px 16px ${c.color}25` : '0 2px 8px rgba(0,0,0,0.06)',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(LucideIcon, { name: c.icon, size: 20, color: c.color })
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: rarityColors[c.rarity], textTransform: 'uppercase', letterSpacing: 0.5 } }, c.rarity)
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 2 } }, c.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textSecondary } }, c.type)
          )
        )
      ),

      // Selected creature detail
      selectedCreature && React.createElement('div', { style: {
        background: t.card, borderRadius: 20, padding: 20, marginTop: 16,
        border: `1.5px solid ${selectedCreature.color}`,
        boxShadow: `0 8px 32px ${selectedCreature.color}20`,
        animation: 'slideUp 0.3s ease',
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
          React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${selectedCreature.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s ease infinite' } },
            React.createElement(LucideIcon, { name: selectedCreature.icon, size: 28, color: selectedCreature.color })
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text } }, selectedCreature.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: selectedCreature.color, fontWeight: 600 } }, `Linked to: ${selectedCreature.habit}`)
          )
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.5 } }, selectedCreature.desc)
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ─── CHALLENGES SCREEN (Gaia Guide) ───
  const ChallengesScreen = () => {
    const dailyChallenges = [
      { id: 'd1', title: 'Walk 5,000 Steps', desc: 'Take a mindful walk outside today.', icon: 'Footprints', essence: 40, color: '#22C55E', category: 'Activity' },
      { id: 'd2', title: 'Zero Food Waste Meal', desc: 'Cook a meal using only what you have.', icon: 'ChefHat', essence: 50, color: '#F97316', category: 'Sustainability' },
      { id: 'd3', title: 'Drink 8 Glasses of Water', desc: 'Stay hydrated throughout the day.', icon: 'Droplets', essence: 25, color: '#3B82F6', category: 'Wellness' },
      { id: 'd4', title: 'Use Reusable Bags', desc: 'Bring your own bags when shopping.', icon: 'ShoppingBag', essence: 30, color: '#8B5CF6', category: 'Sustainability' },
    ];

    const weeklyChallenges = [
      { id: 'w1', title: 'Bike to Work 3 Times', desc: 'Reduce your carbon footprint with active transport.', icon: 'Bike', essence: 150, color: '#06B6D4', progress: 1, total: 3 },
      { id: 'w2', title: 'Meatless Mondays', desc: 'Enjoy plant-based meals every Monday this month.', icon: 'Leaf', essence: 100, color: '#10B981', progress: 2, total: 4 },
    ];

    const insights = [
      { title: 'Your Carbon Savings', text: 'You\'ve saved 12.4 kg CO₂ this week by biking instead of driving. That\'s equivalent to planting 0.6 trees!', icon: 'TrendingDown', color: '#22C55E' },
      { title: 'Nutrition Insight', text: 'Your veggie intake increased 23% this month. Great job adding more greens to your meals.', icon: 'Apple', color: '#F97316' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: '-0.5px' } }, 'Gaia Guide'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' } }, 'Your personalized eco-wellness coach'),

      // Daily Challenges
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
        React.createElement(LucideIcon, { name: 'Zap', size: 20, color: t.primary }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'Daily Challenges')
      ),
      ...dailyChallenges.map((ch, i) => {
        const done = completedChallenges.includes(ch.id);
        return React.createElement('div', {
          key: ch.id,
          style: {
            background: done ? `${ch.color}12` : t.card,
            borderRadius: 16, padding: '14px 16px', marginBottom: 10,
            border: `1.5px solid ${done ? ch.color : t.border}`,
            display: 'flex', alignItems: 'center', gap: 14,
            animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            opacity: done ? 0.8 : 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }
        },
          React.createElement('div', { style: {
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: `${ch.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          } },
            React.createElement(LucideIcon, { name: done ? 'Check' : ch.icon, size: 22, color: ch.color })
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, textDecoration: done ? 'line-through' : 'none' } }, ch.title),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, ch.desc)
          ),
          React.createElement('button', {
            onClick: () => handleCompleteChallenge(ch.id),
            disabled: done,
            style: {
              background: done ? `${ch.color}30` : ch.color,
              border: 'none', borderRadius: 10, padding: '8px 12px',
              fontFamily: font, fontSize: 12, fontWeight: 700, color: '#FFF',
              cursor: done ? 'default' : 'pointer', flexShrink: 0,
              transition: 'transform 150ms ease',
              minWidth: 44, minHeight: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, done ? React.createElement(LucideIcon, { name: 'Check', size: 18, color: '#FFF' }) : `+${ch.essence}`)
        );
      }),

      // Weekly Challenges
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, margin: '20px 0 12px' } },
        React.createElement(LucideIcon, { name: 'Calendar', size: 20, color: t.secondary }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'Weekly Goals')
      ),
      ...weeklyChallenges.map((ch, i) =>
        React.createElement('div', {
          key: ch.id,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${t.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            animation: `slideUp 0.5s ease ${0.4 + i * 0.1}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${ch.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(LucideIcon, { name: ch.icon, size: 22, color: ch.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, ch.title),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, ch.desc)
            ),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.primary } }, `+${ch.essence}`)
          ),
          React.createElement('div', { style: { background: t.bgSecondary, borderRadius: 6, height: 6, overflow: 'hidden' } },
            React.createElement('div', { style: { width: `${(ch.progress / ch.total) * 100}%`, height: '100%', background: ch.color, borderRadius: 6, transition: 'width 500ms ease' } })
          ),
          React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textSecondary, marginTop: 6 } }, `${ch.progress} / ${ch.total} completed`)
        )
      ),

      // Insights
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, margin: '20px 0 12px' } },
        React.createElement(LucideIcon, { name: 'Lightbulb', size: 20, color: '#EAB308' }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'Insights')
      ),
      ...insights.map((ins, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: `${ins.color}10`, borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${ins.color}30`,
            animation: `fadeIn 0.5s ease ${0.5 + i * 0.15}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
            React.createElement(LucideIcon, { name: ins.icon, size: 18, color: ins.color }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text } }, ins.title)
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: 0, lineHeight: 1.5 } }, ins.text)
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ─── PANTRY SCREEN ───
  const PantryScreen = () => {
    const [scanning, setScanning] = useState(false);
    const [scanned, setScanned] = useState(false);

    const pantryItems = [
      { name: 'Brown Rice', qty: '2 cups', expiry: 'Apr 28', fresh: true },
      { name: 'Chickpeas', qty: '1 can', expiry: 'Jul 15', fresh: true },
      { name: 'Spinach', qty: '1 bunch', expiry: 'Apr 21', fresh: false },
      { name: 'Bell Peppers', qty: '3', expiry: 'Apr 23', fresh: true },
      { name: 'Tofu', qty: '1 block', expiry: 'Apr 22', fresh: false },
      { name: 'Quinoa', qty: '1.5 cups', expiry: 'Jun 10', fresh: true },
    ];

    const recipes = [
      { name: 'Chickpea & Spinach Curry', time: '25 min', waste: '0 items', essence: 40, match: '95%' },
      { name: 'Tofu Stir-Fry Bowl', time: '20 min', waste: '0 items', essence: 35, match: '88%' },
      { name: 'Quinoa Stuffed Peppers', time: '35 min', waste: '0 items', essence: 45, match: '82%' },
    ];

    const handleScan = () => {
      setScanning(true);
      setTimeout(() => { setScanning(false); setScanned(true); }, 2000);
    };

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: '-0.5px' } }, 'Pantry Navigator'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' } }, 'Scan, cook, reduce waste'),

      // Scan Button
      React.createElement('button', {
        onClick: handleScan,
        disabled: scanning,
        style: {
          width: '100%', padding: '18px', borderRadius: 16,
          background: scanning ? t.card : `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          border: scanning ? `2px dashed ${t.border}` : 'none',
          color: '#FFF', fontFamily: font, fontSize: 17, fontWeight: 700,
          cursor: scanning ? 'wait' : 'pointer', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: scanning ? 'none' : '0 6px 24px rgba(249,115,22,0.3)',
          transition: 'all 300ms ease', minHeight: 56,
        }
      },
        scanning ? React.createElement('div', { style: { animation: 'spin 1s linear infinite', display: 'inline-flex' } },
          React.createElement(LucideIcon, { name: 'Scan', size: 22, color: t.textSecondary })
        ) : React.createElement(LucideIcon, { name: 'Camera', size: 22, color: '#FFF' }),
        React.createElement('span', { style: { color: scanning ? t.textSecondary : '#FFF' } }, scanning ? 'Scanning pantry...' : 'Scan Your Pantry')
      ),

      // Waste tracker
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, #065F46, #047857)`,
        borderRadius: 16, padding: 16, marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      } },
        React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(LucideIcon, { name: 'Leaf', size: 24, color: '#34D399' })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: '#D1FAE5' } }, 'Waste Reduced This Week'),
          React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: '#6EE7B7' } }, '1.3 kg saved — equivalent to 2.8 kg CO₂')
        )
      ),

      // Pantry items
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Your Pantry'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 } },
        ...pantryItems.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: '12px 14px',
              border: `1px solid ${item.fresh ? t.border : '#F59E0B40'}`,
              animation: `fadeIn 0.3s ease ${i * 0.06}s both`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }
          },
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 } }, item.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, item.qty),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 } },
              React.createElement(LucideIcon, { name: 'Clock', size: 12, color: item.fresh ? t.textMuted : '#F59E0B' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: item.fresh ? t.textMuted : '#F59E0B', fontWeight: item.fresh ? 400 : 600 } }, item.expiry)
            )
          )
        )
      ),

      // Recipe Suggestions
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
        React.createElement(LucideIcon, { name: 'ChefHat', size: 20, color: t.primary }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'AI Recipes')
      ),
      ...recipes.map((r, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14,
            cursor: 'pointer', transition: 'all 200ms ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            animation: `slideUp 0.4s ease ${0.2 + i * 0.1}s both`,
          },
          onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; },
        },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 } }, r.name),
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(LucideIcon, { name: 'Clock', size: 13, color: t.textMuted }), r.time
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.cta, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(LucideIcon, { name: 'Recycle', size: 13, color: t.cta }), r.waste
              )
            )
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.primary } }, r.match),
            React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.cta, fontWeight: 600 } }, `+${r.essence}`)
          )
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ─── INSIGHTS SCREEN ───
  const InsightsScreen = () => {
    const stats = [
      { label: 'CO₂ Saved', value: '48.2 kg', icon: 'Cloud', color: '#22C55E', delta: '+12%' },
      { label: 'Steps This Week', value: '34,210', icon: 'Footprints', color: '#3B82F6', delta: '+8%' },
      { label: 'Meals Logged', value: '21', icon: 'UtensilsCrossed', color: '#F97316', delta: '+3' },
      { label: 'Waste Saved', value: '5.6 kg', icon: 'Recycle', color: '#8B5CF6', delta: '+18%' },
    ];

    const weeklyData = [
      { day: 'Mon', val: 65 }, { day: 'Tue', val: 82 }, { day: 'Wed', val: 45 },
      { day: 'Thu', val: 90 }, { day: 'Fri', val: 72 }, { day: 'Sat', val: 88 }, { day: 'Sun', val: 60 },
    ];
    const maxVal = Math.max(...weeklyData.map(d => d.val));

    const milestones = [
      { title: '100 Walks Logged', icon: 'Footprints', achieved: true, date: 'Apr 12' },
      { title: '50 Zero-Waste Meals', icon: 'Leaf', achieved: true, date: 'Apr 8' },
      { title: '10 Species Collected', icon: 'Sprout', achieved: true, date: 'Apr 5' },
      { title: '25 Bike Trips', icon: 'Bike', achieved: false, progress: '18/25' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: '-0.5px' } }, 'Life Cycle'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' } }, 'Your health & environmental impact'),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 } },
        ...stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16,
              border: `1px solid ${t.border}`,
              animation: `growIn 0.4s ease ${i * 0.08}s both`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('div', { style: { width: 38, height: 38, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(LucideIcon, { name: s.icon, size: 20, color: s.color })
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: '#22C55E', background: '#22C55E15', padding: '2px 8px', borderRadius: 6 } }, s.delta)
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.3px' } }, s.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, s.label)
          )
        )
      ),

      // Weekly chart
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 16px' } }, 'Essence Earned'),
      React.createElement('div', { style: {
        background: t.card, borderRadius: 20, padding: '20px 16px 16px',
        border: `1px solid ${t.border}`, marginBottom: 24,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, marginBottom: 8 } },
          ...weeklyData.map((d, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 6 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.textSecondary } }, d.val),
              React.createElement('div', { style: {
                width: 28, borderRadius: 8,
                height: `${(d.val / maxVal) * 90}px`,
                background: d.val === maxVal ? `linear-gradient(180deg, ${t.primary}, ${t.secondary})` : `${t.primary}30`,
                transition: 'height 600ms ease',
                animation: `slideUp 0.5s ease ${i * 0.07}s both`,
              } })
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          ...weeklyData.map((d, i) =>
            React.createElement('span', { key: i, style: { fontFamily: font, fontSize: 12, color: t.textMuted, flex: 1, textAlign: 'center' } }, d.day)
          )
        )
      ),

      // Milestones
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Milestones'),
      ...milestones.map((m, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 14, padding: '14px 16px', marginBottom: 10,
            border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14,
            opacity: m.achieved ? 1 : 0.7,
            animation: `fadeIn 0.4s ease ${0.3 + i * 0.08}s both`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          }
        },
          React.createElement('div', { style: {
            width: 44, height: 44, borderRadius: 12,
            background: m.achieved ? `${t.cta}18` : `${t.textMuted}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          } },
            React.createElement(LucideIcon, { name: m.achieved ? 'Trophy' : m.icon, size: 22, color: m.achieved ? t.cta : t.textMuted })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, m.title),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, m.achieved ? `Achieved ${m.date}` : m.progress)
          ),
          m.achieved && React.createElement(LucideIcon, { name: 'CheckCircle', size: 22, color: t.cta })
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // ─── SCREENS MAP ───
  const screens = {
    home: HomeScreen,
    biome: BiomeScreen,
    challenges: ChallengesScreen,
    pantry: PantryScreen,
    insights: InsightsScreen,
  };

  // ─── BOTTOM TABS ───
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'biome', icon: 'TreePine', label: 'Biome' },
    { id: 'challenges', icon: 'Compass', label: 'Guide' },
    { id: 'pantry', icon: 'Scan', label: 'Pantry' },
    { id: 'insights', icon: 'BarChart3', label: 'Insights' },
  ];

  const ActiveComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', { style: {
    minHeight: '100vh', background: '#f0f0f0',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px 0', fontFamily: font,
  } },
    React.createElement(StyleTag),
    React.createElement('div', { style: {
      width: 375, height: 812,
      background: t.bg, borderRadius: 40,
      boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
    } },
      // Scrollable content
      React.createElement('div', { style: {
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
      } },
        React.createElement(ActiveComponent)
      ),

      // Bottom Tab Bar
      React.createElement('div', { style: {
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 8px 28px', background: t.tabBg,
        borderTop: `1px solid ${t.border}`,
        flexShrink: 0,
      } },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, border: 'none', background: 'transparent',
              cursor: 'pointer', padding: '6px 12px',
              minWidth: 44, minHeight: 44,
              transition: 'all 200ms ease',
            }
          },
            React.createElement(LucideIcon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.primary : t.textMuted,
            }),
            React.createElement('span', { style: {
              fontFamily: font, fontSize: 11, fontWeight: activeScreen === tab.id ? 700 : 500,
              color: activeScreen === tab.id ? t.primary : t.textMuted,
            } }, tab.label)
          )
        )
      )
    )
  );
}
