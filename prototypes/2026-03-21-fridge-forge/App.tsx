function App() {
  const { useState, useEffect } = React;

  // ─── Theme System ───
  const themes = {
    light: {
      bg: '#F4EFE6',
      surface: '#FFFFFF',
      surfaceAlt: '#F9F5EE',
      card: '#FFFFFF',
      primary: '#2A7A47',
      primaryLight: '#E6F4EC',
      primaryDark: '#1D5433',
      accent: '#E05C1A',
      accentLight: '#FEF0E8',
      text: '#1C1C1A',
      textSec: '#5A5A55',
      textMuted: '#9A9A94',
      border: '#E8E0D4',
      urgent: '#DC2626',
      urgentBg: '#FEF2F2',
      urgentBorder: '#FECACA',
      soon: '#B45309',
      soonBg: '#FFFBEB',
      soonBorder: '#FDE68A',
      good: '#15803D',
      goodBg: '#F0FDF4',
      navBg: '#FFFFFF',
      navBorder: '#E8E0D4',
      inputBg: '#F4EFE6',
      tag: '#F0EBE0',
      tagText: '#5A5A55',
      shadow: 'rgba(0,0,0,0.06)',
      shadowMd: 'rgba(0,0,0,0.10)',
    },
    dark: {
      bg: '#131A13',
      surface: '#1C251C',
      surfaceAlt: '#222D22',
      card: '#1C251C',
      primary: '#4EC97A',
      primaryLight: '#162A1E',
      primaryDark: '#3AAD65',
      accent: '#FF7B3C',
      accentLight: '#2A1A10',
      text: '#EEE9E2',
      textSec: '#A09A92',
      textMuted: '#5E5A56',
      border: '#2A352A',
      urgent: '#F87171',
      urgentBg: '#2A1414',
      urgentBorder: '#7F1D1D',
      soon: '#FCD34D',
      soonBg: '#231E0A',
      soonBorder: '#78350F',
      good: '#4ADE80',
      goodBg: '#0E2A16',
      navBg: '#1C251C',
      navBorder: '#2A352A',
      inputBg: '#222D22',
      tag: '#2A352A',
      tagText: '#A09A92',
      shadow: 'rgba(0,0,0,0.25)',
      shadowMd: 'rgba(0,0,0,0.4)',
    },
  };

  const [theme, setTheme] = useState('dark');
  const [tab, setTab] = useState('fridge');
  const [activeRecipeId, setActiveRecipeId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [pressed, setPressed] = useState(null);
  const [time, setTime] = useState('');

  const t = themes[theme];

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  const press = (id, fn) => {
    setPressed(id);
    setTimeout(() => { setPressed(null); if (fn) fn(); }, 150);
  };
  const sc = (id) => ({ transform: `scale(${pressed === id ? 0.94 : 1})`, transition: 'transform 0.15s ease' });

  // ─── Data ───
  const ingredients = [
    { id: 1, name: 'Chicken Thighs', amount: '2 pieces', category: 'Protein', risk: 'urgent', days: 1, emoji: '🍗' },
    { id: 2, name: 'Baby Spinach', amount: '100g bag', category: 'Produce', risk: 'urgent', days: 1, emoji: '🥬' },
    { id: 3, name: 'Cooked Rice', amount: '2 cups', category: 'Grains', risk: 'urgent', days: 1, emoji: '🍚' },
    { id: 4, name: 'Fresh Herbs', amount: 'Parsley + basil', category: 'Produce', risk: 'urgent', days: 1, emoji: '🌿' },
    { id: 5, name: 'Greek Yogurt', amount: '200g', category: 'Dairy', risk: 'soon', days: 3, emoji: '🥛' },
    { id: 6, name: 'Cherry Tomatoes', amount: '150g', category: 'Produce', risk: 'soon', days: 3, emoji: '🍅' },
    { id: 7, name: 'Lemon', amount: '1 whole', category: 'Produce', risk: 'soon', days: 4, emoji: '🍋' },
    { id: 8, name: 'Feta Cheese', amount: '80g', category: 'Dairy', risk: 'good', days: 8, emoji: '🧀' },
    { id: 9, name: 'Garlic', amount: '4 cloves', category: 'Produce', risk: 'good', days: 14, emoji: '🧄' },
    { id: 10, name: 'Olive Oil', amount: '~300ml', category: 'Pantry', risk: 'good', days: 90, emoji: '🫙' },
  ];

  const recipes = [
    {
      id: 1,
      name: 'One-Pan Yogurt Herb Chicken',
      emoji: '🍗',
      time: '25 min',
      difficulty: 'Easy',
      servings: 2,
      rescueScore: 98,
      uses: [1, 5, 7, 4, 9],
      urgent: [1, 4],
      description: 'Tender chicken thighs in a lemony yogurt herb marinade, roasted golden. One pan, zero fuss.',
      tools: ['Oven', 'Baking dish'],
      steps: [
        'Preheat oven to 200°C / 400°F.',
        'Mix yogurt, lemon juice, minced garlic, and chopped herbs in a bowl. Season generously.',
        'Coat chicken thighs thoroughly in the yogurt mix.',
        'Place skin-side up in a baking dish. Roast 22–25 min until golden.',
        'Rest 3 min. Serve over quick spinach salad.',
      ],
      side: 'Leftover cold chicken makes excellent wraps for tomorrow\'s lunch — slice thin with feta and tomato.',
      tags: ['One-pan', 'High protein', 'Oven'],
      waste: '4 items rescued',
    },
    {
      id: 2,
      name: 'Garlicky Spinach Fried Rice',
      emoji: '🍚',
      time: '15 min',
      difficulty: 'Easy',
      servings: 1,
      rescueScore: 95,
      uses: [3, 2, 9, 10, 7],
      urgent: [3, 2],
      description: 'Day-old rice and wilting spinach transformed into a satisfying bowl. Fragrant garlic, crispy bits, bright lemon.',
      tools: ['Pan', 'Stovetop'],
      steps: [
        'Heat oil in a large pan over medium-high.',
        'Add sliced garlic, cook 60 seconds until golden.',
        'Toss in spinach, stir until wilted, about 2 min.',
        'Add cold rice, spread flat, fry undisturbed 2 min for crispy edges.',
        'Squeeze lemon juice over, season to taste. Serve immediately.',
      ],
      side: 'Crumble feta on top and drizzle extra lemon. Packs well as tomorrow\'s lunch if any remains.',
      tags: ['Vegetarian', 'Quick', 'Stovetop'],
      waste: '3 items rescued',
    },
    {
      id: 3,
      name: 'Greek-Style Fridge Salad',
      emoji: '🥗',
      time: '10 min',
      difficulty: 'Easy',
      servings: 2,
      rescueScore: 80,
      uses: [6, 2, 8, 10, 7],
      urgent: [2],
      description: 'A no-cook rescue plate. Salty feta, sweet tomatoes, peppery spinach, bright lemon dressing.',
      tools: ['Cutting board', 'Bowl'],
      steps: [
        'Wash spinach and halve cherry tomatoes.',
        'Crumble feta generously over the greens.',
        'Whisk olive oil, lemon juice, salt, and pepper.',
        'Toss and serve immediately while greens are fresh.',
      ],
      side: 'Add cold sliced chicken from last night\'s dinner for a complete, protein-rich meal.',
      tags: ['No-cook', 'Vegetarian', '10 min'],
      waste: '2 items rescued',
    },
  ];

  const mealPlan = [
    { day: 'Today', meal: 'Dinner', recipe: recipes[0], status: 'tonight', leftover: 'Slice cold chicken → wraps tomorrow' },
    { day: 'Tomorrow', meal: 'Lunch', recipe: { name: 'Leftover Chicken Wrap', emoji: '🫔', time: '5 min', difficulty: 'Easy' }, status: 'leftover', leftover: null },
    { day: 'Tomorrow', meal: 'Dinner', recipe: recipes[1], status: 'planned', leftover: 'Extra rice → pack for Thursday' },
    { day: 'Wednesday', meal: 'Lunch', recipe: recipes[2], status: 'planned', leftover: null },
  ];

  const urgentCount = ingredients.filter(i => i.risk === 'urgent').length;
  const soonCount = ingredients.filter(i => i.risk === 'soon').length;
  const filtered = filter === 'all' ? ingredients : ingredients.filter(i => i.risk === filter);
  const activeRecipe = recipes.find(r => r.id === activeRecipeId);

  const getRisk = (risk) => {
    if (risk === 'urgent') return { bg: t.urgentBg, color: t.urgent, border: t.urgentBorder, label: 'Today!' };
    if (risk === 'soon') return { bg: t.soonBg, color: t.soon, border: t.soonBorder, label: 'Soon' };
    return { bg: t.goodBg, color: t.good, border: t.border, label: 'Fresh' };
  };

  // ─── Status Bar ───
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 0', height: '44px' }}>
      <span style={{ fontSize: '15px', fontWeight: '700', color: t.text, fontFamily: 'Nunito, sans-serif', letterSpacing: '-0.3px' }}>{time || '09:41'}</span>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        {/* Signal bars */}
        <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
          {[5, 8, 11, 14].map((h, i) => (
            <div key={i} style={{ width: '3px', height: `${h}px`, background: i < 3 ? t.text : t.textMuted, borderRadius: '1px', opacity: i < 3 ? 1 : 0.4 }} />
          ))}
        </div>
        {/* Wifi icon */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 8.5a1 1 0 100 2 1 1 0 000-2z" fill={t.text} />
          <path d="M4.5 6.5c.8-.8 1.9-1.3 3-1.3s2.2.5 3 1.3" stroke={t.text} strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M1.5 3.5C3.1 2 5.2 1 7.5 1s4.4 1 6 2.5" stroke={t.text} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
          <div style={{ border: `1.5px solid ${t.text}`, borderRadius: '2px', width: '22px', height: '11px', padding: '1.5px', display: 'flex', alignItems: 'center', opacity: 0.85 }}>
            <div style={{ width: '72%', height: '100%', background: t.primary, borderRadius: '1px' }} />
          </div>
          <div style={{ width: '2px', height: '5px', background: t.text, borderRadius: '0 1px 1px 0', opacity: 0.6 }} />
        </div>
      </div>
    </div>
  );

  // ─── Dynamic Island ───
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
      <div style={{
        width: '120px', height: '34px', background: '#000', borderRadius: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
      }}>
        <div style={{ width: '11px', height: '11px', background: '#1a1a1a', border: '1.5px solid #2a2a2a', borderRadius: '50%' }} />
        <div style={{ width: '7px', height: '7px', background: '#1a1a1a', borderRadius: '50%', border: '1.5px solid #2a2a2a' }} />
      </div>
    </div>
  );

  // ─── Bottom Nav ───
  const BottomNav = () => {
    const navItems = [
      { id: 'fridge', label: 'Fridge', iconName: 'Refrigerator' },
      { id: 'forge', label: 'Forge', iconName: 'Flame' },
      { id: 'plan', label: 'Plan', iconName: 'CalendarDays' },
      { id: 'settings', label: 'Settings', iconName: 'Settings' },
    ];
    return (
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
        display: 'flex', paddingBottom: '22px', paddingTop: '6px',
        boxShadow: `0 -4px 24px ${t.shadow}`,
      }}>
        {navItems.map(({ id, label, iconName }) => {
          const Icon = window.lucide && window.lucide[iconName];
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => press(`nav-${id}`, () => { setTab(id); if (id !== 'forge') setActiveRecipeId(null); })}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
                ...sc(`nav-${id}`),
              }}
            >
              {Icon && <Icon size={22} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 1.8} />}
              <span style={{
                fontSize: '10px', fontWeight: active ? '800' : '500',
                color: active ? t.primary : t.textMuted,
                fontFamily: 'Nunito, sans-serif',
              }}>{label}</span>
              {active && <div style={{ width: '4px', height: '4px', background: t.primary, borderRadius: '50%', marginTop: '-2px' }} />}
            </button>
          );
        })}
      </div>
    );
  };

  // ─── Fridge Screen ───
  const FridgeScreen = () => {
    const ScanLineIcon = window.lucide && window.lucide.ScanLine;
    const PlusIcon = window.lucide && window.lucide.Plus;
    const AlertTriangleIcon = window.lucide && window.lucide.AlertTriangle;
    const MicIcon = window.lucide && window.lucide.Mic;
    const ArrowRightIcon = window.lucide && window.lucide.ArrowRight;

    return (
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px 10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sunday Evening</p>
              <h1 style={{ margin: '2px 0 0', fontSize: '24px', fontWeight: '900', color: t.text, fontFamily: 'Nunito, sans-serif', lineHeight: 1.1 }}>Your Fridge</h1>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => press('mic')} style={{
                width: '38px', height: '38px', borderRadius: '12px', background: t.surface,
                border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', ...sc('mic'),
              }}>
                {MicIcon && <MicIcon size={17} color={t.textSec} />}
              </button>
              <button onClick={() => press('scan')} style={{
                width: '38px', height: '38px', borderRadius: '12px', background: t.primary,
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', ...sc('scan'),
              }}>
                {ScanLineIcon && <ScanLineIcon size={17} color="#fff" />}
              </button>
            </div>
          </div>

          {/* Urgent rescue banner */}
          <div style={{
            marginTop: '12px', padding: '11px 14px', borderRadius: '12px',
            background: t.urgentBg, border: `1px solid ${t.urgentBorder}`,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            {AlertTriangleIcon && <AlertTriangleIcon size={17} color={t.urgent} />}
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: t.urgent, fontFamily: 'Nunito, sans-serif' }}>
                {urgentCount} items need rescue today
              </p>
              <p style={{ margin: '1px 0 0', fontSize: '11px', color: t.urgent, opacity: 0.75, fontFamily: 'Nunito, sans-serif' }}>
                Chicken, spinach, rice, herbs — expiring now
              </p>
            </div>
            <button
              onClick={() => press('forge-cta', () => setTab('forge'))}
              style={{
                padding: '6px 12px', borderRadius: '8px', background: t.urgent,
                border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '800',
                color: '#fff', fontFamily: 'Nunito, sans-serif', whiteSpace: 'nowrap',
                ...sc('forge-cta'),
              }}
            >
              Forge →
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            {[
              { label: 'Total', value: ingredients.length, color: t.primary },
              { label: 'Urgent', value: urgentCount, color: t.urgent },
              { label: 'Soon', value: soonCount, color: t.soon },
              { label: 'Fresh', value: ingredients.filter(i => i.risk === 'good').length, color: t.good },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, padding: '8px 0', background: t.surface, borderRadius: '10px',
                border: `1px solid ${t.border}`, textAlign: 'center',
              }}>
                <p style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: s.color, fontFamily: 'Nunito, sans-serif' }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: '9px', color: t.textMuted, fontFamily: 'Nunito, sans-serif', fontWeight: '700', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '7px', padding: '4px 20px 8px', overflowX: 'auto', flexShrink: 0 }}>
          {[
            { id: 'all', label: 'All', count: ingredients.length },
            { id: 'urgent', label: '🔴 Urgent', count: urgentCount },
            { id: 'soon', label: '🟡 Soon', count: soonCount },
            { id: 'good', label: '🟢 Fresh', count: ingredients.filter(i => i.risk === 'good').length },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '5px 12px', borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0,
                background: filter === f.id ? t.primary : t.surface,
                border: `1px solid ${filter === f.id ? t.primary : t.border}`,
                color: filter === f.id ? '#fff' : t.textSec,
                fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
              }}
            >{f.label} {f.count}</button>
          ))}
        </div>

        {/* Ingredient list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', paddingBottom: '16px' }}>
          {filtered.map((item) => {
            const r = getRisk(item.risk);
            return (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: '11px',
                padding: '11px 13px', marginBottom: '7px',
                background: t.surface, borderRadius: '14px',
                border: `1px solid ${item.risk === 'urgent' ? t.urgentBorder : t.border}`,
                boxShadow: `0 2px 8px ${t.shadow}`,
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '11px', flexShrink: 0,
                  background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '21px',
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: t.text, fontFamily: 'Nunito, sans-serif' }}>{item.name}</p>
                  <p style={{ margin: '1px 0 0', fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>{item.amount} · {item.category}</p>
                </div>
                <div style={{ padding: '4px 9px', borderRadius: '7px', background: r.bg, flexShrink: 0 }}>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: '800', color: r.color, fontFamily: 'Nunito, sans-serif' }}>
                    {item.risk === 'urgent' ? 'Today!' : `${item.days}d`}
                  </p>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => press('add-item')}
            style={{
              width: '100%', padding: '13px', borderRadius: '14px',
              background: 'none', border: `2px dashed ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
              cursor: 'pointer', color: t.textMuted, fontFamily: 'Nunito, sans-serif',
              fontSize: '13px', fontWeight: '700',
              ...sc('add-item'),
            }}
          >
            {PlusIcon && <PlusIcon size={16} color={t.textMuted} />}
            Add ingredient
          </button>
        </div>
      </div>
    );
  };

  // ─── Forge Screen ───
  const ForgeScreen = () => {
    const FlameIcon = window.lucide && window.lucide.Flame;
    const ClockIcon = window.lucide && window.lucide.Clock;
    const ChefHatIcon = window.lucide && window.lucide.ChefHat;
    const UsersIcon = window.lucide && window.lucide.Users;
    const ArrowRightIcon = window.lucide && window.lucide.ArrowRight;
    const ArrowLeftIcon = window.lucide && window.lucide.ArrowLeft;
    const LeafIcon = window.lucide && window.lucide.Leaf;
    const WrenchIcon = window.lucide && window.lucide.Wrench;

    if (activeRecipe) {
      return (
        <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
          {/* Hero */}
          <div style={{
            height: '170px', position: 'relative',
            background: `linear-gradient(135deg, ${t.primaryLight}, ${t.accentLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderBottom: `1px solid ${t.border}`,
          }}>
            <span style={{ fontSize: '72px' }}>{activeRecipe.emoji}</span>
            <button
              onClick={() => setActiveRecipeId(null)}
              style={{
                position: 'absolute', top: '14px', left: '14px',
                width: '34px', height: '34px', borderRadius: '10px',
                background: t.surface + 'E0', border: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              {ArrowLeftIcon && <ArrowLeftIcon size={17} color={t.text} />}
            </button>
            <div style={{
              position: 'absolute', top: '14px', right: '14px',
              padding: '5px 10px', borderRadius: '9px', background: t.primary,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              {LeafIcon && <LeafIcon size={11} color="#fff" />}
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#fff', fontFamily: 'Nunito, sans-serif' }}>
                Rescue {activeRecipe.rescueScore}%
              </span>
            </div>
          </div>

          <div style={{ padding: '18px 20px' }}>
            <h2 style={{ margin: 0, fontSize: '21px', fontWeight: '900', color: t.text, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2 }}>{activeRecipe.name}</h2>
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: t.textSec, fontFamily: 'Nunito, sans-serif', lineHeight: 1.55 }}>{activeRecipe.description}</p>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              {[
                { Icon: ClockIcon, label: activeRecipe.time },
                { Icon: ChefHatIcon, label: activeRecipe.difficulty },
                { Icon: UsersIcon, label: `${activeRecipe.servings} servings` },
              ].map(({ Icon, label }, i) => (
                <div key={i} style={{
                  flex: 1, padding: '9px 6px', background: t.surface, borderRadius: '10px',
                  border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '4px',
                }}>
                  {Icon && <Icon size={15} color={t.primary} />}
                  <span style={{ fontSize: '11px', fontWeight: '700', color: t.textSec, fontFamily: 'Nunito, sans-serif', textAlign: 'center' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Ingredients used */}
            <p style={{ margin: '18px 0 8px', fontSize: '11px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Ingredients Used</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {activeRecipe.uses.map(id => {
                const ing = ingredients.find(i => i.id === id);
                if (!ing) return null;
                const isUrgent = activeRecipe.urgent.includes(id);
                return (
                  <div key={id} style={{
                    padding: '5px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px',
                    background: isUrgent ? t.urgentBg : t.surface,
                    border: `1px solid ${isUrgent ? t.urgentBorder : t.border}`,
                  }}>
                    <span style={{ fontSize: '13px' }}>{ing.emoji}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: isUrgent ? t.urgent : t.textSec, fontFamily: 'Nunito, sans-serif' }}>{ing.name.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>

            {/* Steps */}
            <p style={{ margin: '18px 0 10px', fontSize: '11px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Instructions</p>
            {activeRecipe.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '13px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', background: t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px',
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '900', color: '#fff', fontFamily: 'Nunito, sans-serif' }}>{i + 1}</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: t.text, fontFamily: 'Nunito, sans-serif', lineHeight: 1.55, flex: 1 }}>{step}</p>
              </div>
            ))}

            {/* Leftover plan */}
            <div style={{
              padding: '13px', borderRadius: '12px', marginTop: '6px',
              background: t.primaryLight, border: `1px solid ${t.primary}40`,
              display: 'flex', gap: '10px', alignItems: 'flex-start',
            }}>
              {LeafIcon && <LeafIcon size={16} color={t.primary} style={{ flexShrink: 0, marginTop: '2px' }} />}
              <div>
                <p style={{ margin: '0 0 3px', fontSize: '12px', fontWeight: '800', color: t.primary, fontFamily: 'Nunito, sans-serif' }}>♻️ Leftover Plan</p>
                <p style={{ margin: 0, fontSize: '13px', color: t.text, fontFamily: 'Nunito, sans-serif', lineHeight: 1.5 }}>{activeRecipe.side}</p>
              </div>
            </div>

            {/* Tools */}
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '12px' }}>
              {activeRecipe.tools.map((tool, i) => (
                <div key={i} style={{ padding: '5px 10px', borderRadius: '8px', background: t.tag, border: `1px solid ${t.border}` }}>
                  <span style={{ fontSize: '12px', color: t.tagText, fontFamily: 'Nunito, sans-serif', fontWeight: '600' }}>🔧 {tool}</span>
                </div>
              ))}
            </div>
            <div style={{ height: '100px' }} />
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px 10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {FlameIcon && <FlameIcon size={22} color={t.accent} />}
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: t.text, fontFamily: 'Nunito, sans-serif' }}>Tonight's Forge</h1>
          </div>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: t.textSec, fontFamily: 'Nunito, sans-serif' }}>
            Ranked by rescue priority — save the most at-risk items first
          </p>
          <div style={{
            marginTop: '10px', padding: '9px 13px', borderRadius: '10px',
            background: t.surface, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            {LeafIcon && <LeafIcon size={15} color={t.primary} />}
            <p style={{ margin: 0, fontSize: '12px', color: t.textSec, fontFamily: 'Nunito, sans-serif' }}>
              <span style={{ fontWeight: '800', color: t.primary }}>Rescue Score</span> = how many at-risk items each recipe saves
            </p>
          </div>
        </div>

        {/* Recipe cards */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px' }}>
          {recipes.map((recipe, idx) => (
            <button
              key={recipe.id}
              onClick={() => press(`recipe-${recipe.id}`, () => setActiveRecipeId(recipe.id))}
              style={{
                width: '100%', marginBottom: '12px', padding: 0,
                background: t.surface, borderRadius: '16px',
                border: `1px solid ${idx === 0 ? t.primary + '77' : t.border}`,
                cursor: 'pointer', textAlign: 'left', overflow: 'hidden',
                boxShadow: idx === 0 ? `0 4px 20px ${t.primary}30` : `0 2px 10px ${t.shadow}`,
                ...sc(`recipe-${recipe.id}`),
              }}
            >
              {idx === 0 && (
                <div style={{ padding: '7px 14px', background: t.primary, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {FlameIcon && <FlameIcon size={12} color="#fff" />}
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#fff', fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    Best rescue tonight
                  </span>
                </div>
              )}
              <div style={{ padding: '13px 14px 11px' }}>
                <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '54px', height: '54px', borderRadius: '13px', flexShrink: 0,
                    background: idx === 0 ? t.primaryLight : t.surfaceAlt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
                  }}>
                    {recipe.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: t.text, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2, flex: 1 }}>{recipe.name}</p>
                      <div style={{
                        padding: '3px 8px', borderRadius: '7px', flexShrink: 0,
                        background: recipe.rescueScore >= 95 ? t.urgentBg : recipe.rescueScore >= 80 ? t.soonBg : t.goodBg,
                        border: `1px solid ${recipe.rescueScore >= 95 ? t.urgentBorder : recipe.rescueScore >= 80 ? t.soonBorder : t.border}`,
                      }}>
                        <span style={{
                          fontSize: '12px', fontWeight: '900', fontFamily: 'Nunito, sans-serif',
                          color: recipe.rescueScore >= 95 ? t.urgent : recipe.rescueScore >= 80 ? t.soon : t.good,
                        }}>{recipe.rescueScore}%</span>
                      </div>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: t.textSec, fontFamily: 'Nunito, sans-serif', lineHeight: 1.4 }}>
                      {recipe.description.substring(0, 68)}…
                    </p>
                  </div>
                </div>
                {/* Meta */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '11px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {ClockIcon && <ClockIcon size={12} color={t.textMuted} />}
                    <span style={{ fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>{recipe.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {ChefHatIcon && <ChefHatIcon size={12} color={t.textMuted} />}
                    <span style={{ fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>{recipe.difficulty}</span>
                  </div>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontSize: '11px', fontWeight: '800', color: t.primary, fontFamily: 'Nunito, sans-serif' }}>{recipe.waste}</span>
                </div>
                {/* Ingredient chips */}
                <div style={{ display: 'flex', gap: '5px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {recipe.uses.slice(0, 4).map(id => {
                    const ing = ingredients.find(i => i.id === id);
                    if (!ing) return null;
                    const isUrgent = recipe.urgent.includes(id);
                    return (
                      <span key={id} style={{
                        fontSize: '11px', padding: '3px 7px', borderRadius: '6px',
                        background: isUrgent ? t.urgentBg : t.surfaceAlt,
                        color: isUrgent ? t.urgent : t.textSec,
                        fontFamily: 'Nunito, sans-serif', fontWeight: '700',
                        border: `1px solid ${isUrgent ? t.urgentBorder : t.border}`,
                      }}>
                        {ing.emoji} {ing.name.split(' ')[0]}
                      </span>
                    );
                  })}
                  {recipe.uses.length > 4 && (
                    <span style={{ fontSize: '11px', padding: '3px 5px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>+{recipe.uses.length - 4}</span>
                  )}
                </div>
              </div>
              <div style={{
                padding: '9px 14px', borderTop: `1px solid ${t.border}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {recipe.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} style={{
                      fontSize: '10px', padding: '3px 8px', borderRadius: '20px',
                      background: t.tag, color: t.tagText, fontFamily: 'Nunito, sans-serif', fontWeight: '700',
                    }}>{tag}</span>
                  ))}
                </div>
                {ArrowRightIcon && <ArrowRightIcon size={15} color={t.primary} />}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Plan Screen ───
  const PlanScreen = () => {
    const CalendarIcon = window.lucide && window.lucide.CalendarDays;
    const LeafIcon = window.lucide && window.lucide.Leaf;
    const LinkIcon = window.lucide && window.lucide.Link;
    const ArrowDownIcon = window.lucide && window.lucide.ArrowDown;

    return (
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 20px 10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {CalendarIcon && <CalendarIcon size={21} color={t.primary} />}
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: t.text, fontFamily: 'Nunito, sans-serif' }}>Meal Plan</h1>
          </div>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: t.textSec, fontFamily: 'Nunito, sans-serif' }}>
            One cook session → multiple meals via leftover chains
          </p>
          <div style={{
            marginTop: '10px', padding: '11px 14px', borderRadius: '12px',
            background: t.primaryLight, border: `1px solid ${t.primary}44`,
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            {LeafIcon && <LeafIcon size={20} color={t.primary} />}
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: t.primary, fontFamily: 'Nunito, sans-serif' }}>3 items rescued this week</p>
              <p style={{ margin: '1px 0 0', fontSize: '11px', color: t.textSec, fontFamily: 'Nunito, sans-serif' }}>Est. $12.40 saved · 0 food wasted</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px' }}>
          {['Today', 'Tomorrow', 'Wednesday'].map((day) => {
            const dayMeals = mealPlan.filter(m => m.day === day);
            return (
              <div key={day} style={{ marginBottom: '18px' }}>
                <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {day}
                </p>
                {dayMeals.map((meal, i) => (
                  <div key={i}>
                    <div style={{
                      padding: '13px', background: t.surface, borderRadius: '14px',
                      border: `1px solid ${meal.status === 'leftover' ? t.primary + '55' : t.border}`,
                      boxShadow: `0 2px 8px ${t.shadow}`, marginBottom: meal.leftover ? '0' : '8px',
                    }}>
                      <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                          background: meal.status === 'leftover' ? t.primaryLight : t.surfaceAlt,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                        }}>
                          {meal.recipe.emoji || '🍽️'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase' }}>{meal.meal}</span>
                            {meal.status === 'leftover' && (
                              <span style={{ fontSize: '10px', fontWeight: '800', color: t.primary, fontFamily: 'Nunito, sans-serif' }}>♻️ Leftover chain</span>
                            )}
                            {meal.status === 'tonight' && (
                              <span style={{ fontSize: '10px', fontWeight: '800', color: t.accent, fontFamily: 'Nunito, sans-serif' }}>🔥 Tonight</span>
                            )}
                          </div>
                          <p style={{ margin: '3px 0 0', fontSize: '14px', fontWeight: '800', color: t.text, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2 }}>{meal.recipe.name}</p>
                          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                            <span style={{ fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>⏱ {meal.recipe.time}</span>
                            <span style={{ fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>👨‍🍳 {meal.recipe.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      {meal.leftover && (
                        <div style={{
                          marginTop: '10px', padding: '8px 10px', borderRadius: '8px',
                          background: t.primaryLight, border: `1px solid ${t.primary}30`,
                          display: 'flex', alignItems: 'center', gap: '7px',
                        }}>
                          {LinkIcon && <LinkIcon size={12} color={t.primary} />}
                          <p style={{ margin: 0, fontSize: '12px', color: t.textSec, fontFamily: 'Nunito, sans-serif' }}>
                            <span style={{ fontWeight: '800', color: t.primary }}>Chain: </span>{meal.leftover}
                          </p>
                        </div>
                      )}
                    </div>
                    {meal.leftover && (
                      <div style={{ display: 'flex', justifyContent: 'center', padding: '3px 0', marginBottom: '4px' }}>
                        {ArrowDownIcon && <ArrowDownIcon size={16} color={t.primary} opacity={0.7} />}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Smart suggestion card */}
          <div style={{
            padding: '14px', borderRadius: '14px',
            background: t.accentLight, border: `1px solid ${t.accent}44`,
          }}>
            <p style={{ margin: '0 0 5px', fontSize: '12px', fontWeight: '800', color: t.accent, fontFamily: 'Nunito, sans-serif' }}>💡 Smart Suggestion</p>
            <p style={{ margin: 0, fontSize: '13px', color: t.text, fontFamily: 'Nunito, sans-serif', lineHeight: 1.55 }}>
              You have yogurt, oats, and berries expiring Thursday. Build 4 breakfast jars Sunday to use everything up.
            </p>
            <button
              onClick={() => press('add-plan')}
              style={{
                marginTop: '10px', padding: '8px 14px', borderRadius: '8px',
                background: t.accent, border: 'none', cursor: 'pointer',
                fontSize: '12px', fontWeight: '800', color: '#fff', fontFamily: 'Nunito, sans-serif',
                ...sc('add-plan'),
              }}
            >
              Add to plan →
            </button>
          </div>
          <div style={{ height: '80px' }} />
        </div>
      </div>
    );
  };

  // ─── Settings Screen ───
  const SettingsScreen = () => {
    const [skillLevel, setSkillLevel] = useState('intermediate');
    const [tools, setTools] = useState({
      oven: true, stovetop: true, microwave: true, airfryer: false, instantpot: false,
    });
    const [dietary, setDietary] = useState({
      vegetarian: false, glutenfree: false, dairyfree: false,
    });

    const SunIcon = window.lucide && window.lucide.Sun;
    const MoonIcon = window.lucide && window.lucide.Moon;
    const ToggleRightIcon = window.lucide && window.lucide.ToggleRight;
    const ToggleLeftIcon = window.lucide && window.lucide.ToggleLeft;
    const BellIcon = window.lucide && window.lucide.Bell;
    const ShieldIcon = window.lucide && window.lucide.Shield;
    const InfoIcon = window.lucide && window.lucide.Info;

    const Toggle = ({ value, onToggle }) => (
      <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
        {value
          ? (ToggleRightIcon && <ToggleRightIcon size={30} color={t.primary} />)
          : (ToggleLeftIcon && <ToggleLeftIcon size={30} color={t.textMuted} />)
        }
      </button>
    );

    const toolMeta = {
      oven: { label: 'Oven', emoji: '🔥' },
      stovetop: { label: 'Stovetop', emoji: '🍳' },
      microwave: { label: 'Microwave', emoji: '📡' },
      airfryer: { label: 'Air Fryer', emoji: '💨' },
      instantpot: { label: 'Instant Pot', emoji: '⚡' },
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 100px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: t.text, fontFamily: 'Nunito, sans-serif' }}>Settings</h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '8px 14px', borderRadius: '12px',
              background: t.surface, border: `1px solid ${t.border}`, cursor: 'pointer',
            }}
          >
            {theme === 'dark'
              ? (SunIcon && <SunIcon size={15} color={t.accent} />)
              : (MoonIcon && <MoonIcon size={15} color={t.primary} />)
            }
            <span style={{ fontSize: '13px', fontWeight: '800', color: t.text, fontFamily: 'Nunito, sans-serif' }}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        </div>

        {/* Profile card */}
        <div style={{
          padding: '15px', borderRadius: '14px', marginBottom: '14px',
          background: t.surface, border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', gap: '13px',
        }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '15px', background: t.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
          }}>👩‍🍳</div>
          <div>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: t.text, fontFamily: 'Nunito, sans-serif' }}>Maya Chen</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: t.textSec, fontFamily: 'Nunito, sans-serif' }}>23 items rescued · 🌱 Level 3 Rescuer</p>
          </div>
        </div>

        {/* Skill Level */}
        <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Cooking Skill</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {['beginner', 'intermediate', 'advanced'].map(level => (
            <button key={level} onClick={() => setSkillLevel(level)} style={{
              flex: 1, padding: '10px 4px', borderRadius: '10px',
              background: skillLevel === level ? t.primary : t.surface,
              border: `1px solid ${skillLevel === level ? t.primary : t.border}`,
              color: skillLevel === level ? '#fff' : t.textSec,
              fontSize: '11px', fontWeight: '800', cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
              textTransform: 'capitalize',
            }}>{level}</button>
          ))}
        </div>

        {/* Kitchen Equipment */}
        <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Kitchen Equipment</p>
        <div style={{ background: t.surface, borderRadius: '14px', border: `1px solid ${t.border}`, overflow: 'hidden', marginBottom: '16px' }}>
          {Object.entries(tools).map(([key, value], i, arr) => (
            <div key={key} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 15px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <span style={{ fontSize: '20px' }}>{toolMeta[key].emoji}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: t.text, fontFamily: 'Nunito, sans-serif' }}>{toolMeta[key].label}</span>
              </div>
              <Toggle value={value} onToggle={() => setTools(prev => ({ ...prev, [key]: !prev[key] }))} />
            </div>
          ))}
        </div>

        {/* Dietary Preferences */}
        <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '800', color: t.textMuted, fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Dietary Preferences</p>
        <div style={{ background: t.surface, borderRadius: '14px', border: `1px solid ${t.border}`, overflow: 'hidden', marginBottom: '16px' }}>
          {[
            { key: 'vegetarian', label: 'Vegetarian', emoji: '🥦' },
            { key: 'glutenfree', label: 'Gluten-Free', emoji: '🌾' },
            { key: 'dairyfree', label: 'Dairy-Free', emoji: '🥛' },
          ].map(({ key, label, emoji }, i) => (
            <div key={key} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 15px', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <span style={{ fontSize: '20px' }}>{emoji}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: t.text, fontFamily: 'Nunito, sans-serif' }}>{label}</span>
              </div>
              <Toggle value={dietary[key]} onToggle={() => setDietary(prev => ({ ...prev, [key]: !prev[key] }))} />
            </div>
          ))}
        </div>

        {/* Other settings */}
        <div style={{ background: t.surface, borderRadius: '14px', border: `1px solid ${t.border}`, overflow: 'hidden', marginBottom: '16px' }}>
          {[
            { Icon: BellIcon, label: 'Spoilage Alerts', sub: 'Notify when items expire soon' },
            { Icon: ShieldIcon, label: 'Privacy', sub: 'Data and permissions' },
            { Icon: InfoIcon, label: 'About Fridge Forge', sub: 'v1.0.0 · Turn leftovers into dinner fast' },
          ].map(({ Icon, label, sub }, i) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '13px 15px', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
              cursor: 'pointer',
            }}>
              {Icon && <Icon size={18} color={t.primary} />}
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: t.text, fontFamily: 'Nunito, sans-serif' }}>{label}</p>
                <p style={{ margin: '1px 0 0', fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>{sub}</p>
              </div>
              <span style={{ color: t.textMuted, fontSize: '16px' }}>›</span>
            </div>
          ))}
        </div>

        {/* Branding */}
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ margin: 0, fontSize: '24px' }}>🔥</p>
          <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: '900', color: t.text, fontFamily: 'Nunito, sans-serif' }}>Fridge Forge</p>
          <p style={{ margin: '2px 0 0', fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }}>Turn leftovers into dinner fast.</p>
        </div>
      </div>
    );
  };

  // ─── Root Render ───
  return (
    <div style={{
      minHeight: '100vh', background: '#0E0E0E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Nunito, system-ui, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: 'Nunito', sans-serif; }
        body { background: #0E0E0E; }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', width: '500px', height: '500px', borderRadius: '50%',
        background: `radial-gradient(circle, ${themes[theme].primary}18 0%, transparent 70%)`,
        top: '10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      {/* Phone frame */}
      <div style={{
        width: '375px', height: '812px', background: themes[theme].bg, borderRadius: '50px',
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        <StatusBar />
        <DynamicIsland />

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: '8px', paddingBottom: '84px' }}>
          {tab === 'fridge' && <FridgeScreen />}
          {tab === 'forge' && <ForgeScreen />}
          {tab === 'plan' && <PlanScreen />}
          {tab === 'settings' && <SettingsScreen />}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
