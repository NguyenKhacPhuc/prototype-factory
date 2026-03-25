const { useState, useEffect, useRef } = React;

// ─── THEMES ──────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F0F9F5', surface: '#FFFFFF', surfaceAlt: '#F7FDF9', card: '#FFFFFF',
    text: '#0D2018', textSub: '#4B7B64', textMuted: '#9ABFAF',
    primary: '#10B981', primaryDim: '#D1FAE5', primaryDeep: '#059669',
    secondary: '#F59E0B', secondaryDim: '#FEF3C7',
    accent: '#6366F1', accentDim: '#EEF2FF',
    danger: '#EF4444', dangerDim: '#FEE2E2',
    border: '#D1EEE4', navBg: '#FFFFFF',
  },
  dark: {
    bg: '#091812', surface: '#0E2019', surfaceAlt: '#142B22', card: '#122520',
    text: '#E6F7EF', textSub: '#6BA88B', textMuted: '#3D6B58',
    primary: '#34D399', primaryDim: '#064E3B', primaryDeep: '#10B981',
    secondary: '#FBBF24', secondaryDim: '#451A03',
    accent: '#818CF8', accentDim: '#1E1B4B',
    danger: '#F87171', dangerDim: '#450A0A',
    border: '#1A3328', navBg: '#0E2019',
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const inventoryData = [
  { id: 1,  name: 'Penne Pasta',         cat: 'pantry',    qty: 2, unit: 'boxes',    expDays: 143, icon: '🍝' },
  { id: 2,  name: 'Jasmine Rice',         cat: 'pantry',    qty: 1, unit: 'bag 2kg',  expDays: 301, icon: '🌾' },
  { id: 3,  name: 'Extra Virgin Olive Oil',cat: 'pantry',   qty: 1, unit: 'bottle',   expDays: 97,  icon: '🫙' },
  { id: 4,  name: 'Canned Tomatoes',      cat: 'pantry',    qty: 4, unit: 'cans',     expDays: 350, icon: '🍅' },
  { id: 5,  name: 'Protein Bars',         cat: 'pantry',    qty: 6, unit: 'bars',     expDays: 8,   icon: '🍫' },
  { id: 6,  name: 'Coffee Beans',         cat: 'pantry',    qty: 1, unit: 'bag 500g', expDays: 51,  icon: '☕' },
  { id: 7,  name: 'Rolled Oats',          cat: 'pantry',    qty: 2, unit: 'bags',     expDays: 180, icon: '🌿' },
  { id: 8,  name: 'Greek Yogurt',         cat: 'fridge',    qty: 3, unit: 'cups',     expDays: 3,   icon: '🥛' },
  { id: 9,  name: 'Free Range Eggs',      cat: 'fridge',    qty: 8, unit: 'eggs',     expDays: 16,  icon: '🥚' },
  { id: 10, name: 'Baby Spinach',         cat: 'fridge',    qty: 1, unit: 'bag',      expDays: 2,   icon: '🥬' },
  { id: 11, name: 'Almond Milk',          cat: 'fridge',    qty: 1, unit: 'carton',   expDays: 11,  icon: '🥛' },
  { id: 12, name: 'Strawberries',         cat: 'fridge',    qty: 1, unit: 'punnet',   expDays: 2,   icon: '🍓' },
  { id: 13, name: 'Cheddar Cheese',       cat: 'fridge',    qty: 1, unit: 'block',    expDays: 22,  icon: '🧀' },
  { id: 14, name: 'Black Blazer',         cat: 'closet',    qty: 1, unit: 'piece',    expDays: null, icon: '🧥' },
  { id: 15, name: 'White Dress Shirt',    cat: 'closet',    qty: 2, unit: 'pieces',   expDays: null, icon: '👔' },
  { id: 16, name: 'Running Shoes',        cat: 'closet',    qty: 1, unit: 'pair',     expDays: null, icon: '👟' },
  { id: 17, name: 'Winter Coat',          cat: 'closet',    qty: 1, unit: 'piece',    expDays: null, icon: '🧤' },
  { id: 18, name: 'Shampoo',             cat: 'bathroom',  qty: 1, unit: 'bottle',   expDays: 433, usesLeft: 12, icon: '🧴' },
  { id: 19, name: 'Toothpaste',          cat: 'bathroom',  qty: 2, unit: 'tubes',    expDays: 296, usesLeft: 45, icon: '🪥' },
  { id: 20, name: 'Face Wash',           cat: 'bathroom',  qty: 1, unit: 'tube',     expDays: 160, usesLeft: 8,  icon: '🧼' },
  { id: 21, name: 'Deodorant',           cat: 'bathroom',  qty: 1, unit: 'stick',    expDays: null, usesLeft: 6,  icon: '🧴' },
  { id: 22, name: 'Laundry Detergent',   cat: 'household', qty: 1, unit: 'bottle',   expDays: null, usesLeft: 4,  icon: '🧺' },
  { id: 23, name: 'Dish Soap',           cat: 'household', qty: 2, unit: 'bottles',  expDays: null, icon: '🫧' },
  { id: 24, name: 'Scented Candles',     cat: 'household', qty: 3, unit: 'candles',  expDays: null, icon: '🕯️' },
  { id: 25, name: 'AA Batteries',        cat: 'household', qty: 8, unit: 'batteries',expDays: 1382, icon: '🔋' },
];

const recipesData = [
  { id: 1, name: 'Pasta Arrabbiata',      time: 20, difficulty: 'Easy',   match: 95,  emoji: '🍝',
    ingredients: ['Penne Pasta','Canned Tomatoes','Olive Oil','Baby Spinach'],
    matched: 4, total: 5, color: '#10B981', tags: ['Quick','Vegetarian'],
    steps: 'Cook pasta until al dente. Sauté garlic in olive oil with chili flakes. Add tomatoes, simmer 10 min. Toss in spinach until wilted. Combine and season.' },
  { id: 2, name: 'Spinach & Egg Scramble',time: 10, difficulty: 'Easy',   match: 100, emoji: '🥚',
    ingredients: ['Free Range Eggs','Baby Spinach','Olive Oil'],
    matched: 3, total: 3, color: '#F59E0B', tags: ['Quick','High Protein','Expiring'],
    steps: 'Heat olive oil in a pan. Add spinach, wilt for 2 min. Pour in beaten eggs. Scramble gently on low heat. Season and serve immediately.' },
  { id: 3, name: 'Strawberry Yogurt Bowl',time: 5,  difficulty: 'Easy',   match: 100, emoji: '🍓',
    ingredients: ['Greek Yogurt','Strawberries'],
    matched: 2, total: 2, color: '#EC4899', tags: ['No Cook','Expiring'],
    steps: 'Spoon yogurt into a bowl. Slice strawberries on top. Drizzle honey if desired. Optional: add rolled oats for crunch.' },
  { id: 4, name: 'Tomato Rice Bowl',      time: 35, difficulty: 'Medium', match: 80,  emoji: '🍚',
    ingredients: ['Jasmine Rice','Canned Tomatoes','Olive Oil'],
    matched: 3, total: 4, color: '#6366F1', tags: ['Meal Prep','Vegetarian'],
    steps: 'Cook rice. Simmer tomatoes with olive oil, garlic, and herbs for 20 min. Serve sauce over rice. Top with fresh basil.' },
];

const nudges = [
  { id: 1, icon: '⚠️', text: 'Baby Spinach expires tomorrow — cook it tonight', action: 'See recipe', color: '#EF4444', bg: '#FEE2E2' },
  { id: 2, icon: '💡', text: 'You have 3 candles unopened — skip buying more', action: 'Got it',     color: '#10B981', bg: '#D1FAE5' },
  { id: 3, icon: '🧺', text: 'Laundry detergent: ~4 uses left, restock soon',  action: 'Add to list',color: '#F59E0B', bg: '#FEF3C7' },
];

const catConfig = {
  pantry:   { label: 'Pantry',    color: '#F59E0B', bg: '#FEF3C7', darkBg: '#451A03', emoji: '🥫' },
  fridge:   { label: 'Fridge',    color: '#6366F1', bg: '#EEF2FF', darkBg: '#1E1B4B', emoji: '🧊' },
  closet:   { label: 'Closet',    color: '#EC4899', bg: '#FCE7F3', darkBg: '#500724', emoji: '👗' },
  bathroom: { label: 'Bathroom',  color: '#0EA5E9', bg: '#E0F2FE', darkBg: '#082F49', emoji: '🛁' },
  household:{ label: 'Household', color: '#10B981', bg: '#D1FAE5', darkBg: '#064E3B', emoji: '🏠' },
};

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function OnboardingScreen({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const [pressed, setPressed] = useState(false);

  const slides = [
    { emoji: '🏠', title: 'Your home, organized', gradient: ['#10B981','#059669'],
      sub: 'Turn your pantry, fridge, and closet into a searchable live inventory — all in one place.' },
    { emoji: '📸', title: 'Log it in seconds',    gradient: ['#6366F1','#4F46E5'],
      sub: 'Scan a receipt, snap a photo, or speak a voice note. Shelf Sync does the rest.' },
    { emoji: '✨', title: 'Use what you own',     gradient: ['#F59E0B','#D97706'],
      sub: 'Get recipe ideas, expiry alerts, and a quick "before you buy" check to stop waste before it starts.' },
  ];

  const s = slides[slide];
  const isLast = slide === slides.length - 1;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 16, right: 20, zIndex: 10 }}>
        <div onClick={onComplete} style={{ fontSize: 13, fontWeight: 600, color: '#9ABFAF', cursor: 'pointer', padding: '6px 10px' }}>Skip</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 32px 0' }}>
        <div style={{
          width: 190, height: 190, borderRadius: 56,
          background: `linear-gradient(145deg, ${s.gradient[0]}, ${s.gradient[1]})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 76,
          boxShadow: `0 24px 60px ${s.gradient[0]}45`, marginBottom: 44,
          transition: 'all 0.35s cubic-bezier(0,0,0.2,1)',
        }}>{s.emoji}</div>
        <h1 style={{ fontSize: 27, fontWeight: 800, color: '#0D2018', textAlign: 'center', margin: '0 0 12px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>{s.title}</h1>
        <p style={{ fontSize: 14, color: '#4B7B64', textAlign: 'center', lineHeight: 1.65, margin: 0, maxWidth: 272 }}>{s.sub}</p>
      </div>

      <div style={{ padding: '28px 24px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 22 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{
              height: 8, borderRadius: 4, cursor: 'pointer',
              width: i === slide ? 28 : 8,
              background: i === slide ? s.gradient[0] : '#D1EEE4',
              transition: 'all 0.3s cubic-bezier(0,0,0.2,1)',
            }} />
          ))}
        </div>
        <button
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          onClick={() => isLast ? onComplete() : setSlide(n => n + 1)}
          style={{
            width: '100%', height: 52, borderRadius: 16, border: 'none',
            background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})`,
            color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', boxShadow: `0 8px 24px ${s.gradient[0]}40`,
            transform: pressed ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 120ms ease',
          }}
        >{isLast ? 'Get Started →' : 'Next →'}</button>
        {!isLast && (
          <p style={{ textAlign: 'center', margin: '12px 0 0', fontSize: 12, color: '#9ABFAF', cursor: 'pointer', fontWeight: 600 }} onClick={onComplete}>
            Already have an account? Sign in
          </p>
        )}
      </div>
    </div>
  );
}

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
function StatusBar({ theme }) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  useEffect(() => {
    const t = setInterval(() =>
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })), 15000);
    return () => clearInterval(t);
  }, []);
  const Wifi = window.lucide.Wifi;
  const Battery = window.lucide.Battery;
  return (
    <div style={{ height: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 22px', background: theme.surface }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Wifi size={13} color={theme.text} />
        <Battery size={16} color={theme.text} />
      </div>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ theme, isDark, setActiveTab }) {
  const [pressedNudge, setPressedNudge] = useState(null);
  const [pressedCTA, setPressedCTA] = useState(false);

  const Bell = window.lucide.Bell;
  const ChevronRight = window.lucide.ChevronRight;
  const TrendingDown = window.lucide.TrendingDown;
  const AlertTriangle = window.lucide.AlertTriangle;
  const Package = window.lucide.Package;
  const Search = window.lucide.Search;
  const Zap = window.lucide.Zap;

  const expiring = inventoryData.filter(i => i.expDays !== null && i.expDays <= 14).sort((a, b) => a.expDays - b.expDays);

  const expiryColor = (d) => d <= 2 ? theme.danger : d <= 7 ? theme.secondary : theme.primary;
  const expiryLabel = (d) => d === 0 ? 'Today!' : d === 1 ? 'Tomorrow' : `${d}d left`;

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      {/* Header */}
      <div style={{ padding: '4px 20px 16px', background: theme.surface }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontSize: 11, color: theme.textSub, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Good morning</p>
            <h2 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 800, color: theme.text, letterSpacing: '-0.5px' }}>Alex 👋</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 40, height: 40, borderRadius: 14, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Bell size={18} color={theme.primary} />
            </div>
            <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, background: theme.danger, border: `2px solid ${theme.surface}`, animation: 'pulseNotif 2s ease infinite' }} />
          </div>
        </div>

        {/* Stats bento */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          {[
            { label: 'Items tracked', value: '47', Icon: Package,       color: theme.primary,   bg: theme.primaryDim },
            { label: 'Saved / month', value: '$89', Icon: TrendingDown,  color: theme.accent,    bg: theme.accentDim },
            { label: 'Expiring soon', value: String(expiring.length), Icon: AlertTriangle, color: theme.secondary, bg: theme.secondaryDim },
          ].map(({ label, value, Icon, color, bg }, i) => (
            <div key={i} style={{ flex: 1, background: bg, borderRadius: 16, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Icon size={15} color={color} />
              <div style={{ fontSize: 19, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 9, color, fontWeight: 600, opacity: 0.8, textAlign: 'center', lineHeight: 1.2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Before You Buy */}
      <div style={{ padding: '12px 20px 0' }}>
        <div onClick={() => setActiveTab('inventory')} style={{
          background: theme.surface, borderRadius: 14, padding: '11px 14px',
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
          border: `1.5px solid ${theme.border}`,
        }}>
          <Search size={15} color={theme.textMuted} />
          <span style={{ fontSize: 13, color: theme.textMuted, fontWeight: 500 }}>Before you buy — check your inventory…</span>
        </div>
      </div>

      {/* Expiring Soon */}
      <div style={{ paddingTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertTriangle size={13} color={theme.secondary} />
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: theme.text }}>Expiring Soon</h3>
          </div>
          <div onClick={() => setActiveTab('inventory')} style={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.primary }}>See all</span>
            <ChevronRight size={13} color={theme.primary} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '2px 20px 4px', scrollbarWidth: 'none' }}>
          {expiring.slice(0, 6).map(item => (
            <div key={item.id} style={{
              minWidth: 104, background: theme.surface, borderRadius: 16, padding: '12px 10px',
              flexShrink: 0, border: `1.5px solid ${item.expDays <= 2 ? theme.danger + '45' : theme.border}`,
            }}>
              <div style={{ fontSize: 26, marginBottom: 6, textAlign: 'center' }}>{item.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: theme.text, textAlign: 'center', lineHeight: 1.3, marginBottom: 6 }}>
                {item.name.length > 13 ? item.name.slice(0, 13) + '…' : item.name}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: expiryColor(item.expDays), background: expiryColor(item.expDays) + '22', padding: '3px 6px', borderRadius: 20, textAlign: 'center' }}>
                {expiryLabel(item.expDays)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Nudges */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Zap size={13} color={theme.primary} />
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: theme.text }}>Smart Nudges</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {nudges.map(n => (
            <div key={n.id}
              onMouseDown={() => setPressedNudge(n.id)} onMouseUp={() => setPressedNudge(null)} onMouseLeave={() => setPressedNudge(null)}
              style={{
                background: theme.surface, borderRadius: 14, padding: '11px 12px',
                display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                border: `1px solid ${theme.border}`,
                transform: pressedNudge === n.id ? 'scale(0.98)' : 'scale(1)',
                transition: 'transform 120ms ease',
              }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: isDark ? n.color + '25' : n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{n.icon}</div>
              <p style={{ margin: 0, flex: 1, fontSize: 12, color: theme.text, fontWeight: 500, lineHeight: 1.4 }}>{n.text}</p>
              <div style={{ fontSize: 11, fontWeight: 700, color: n.color, background: isDark ? n.color + '25' : n.bg, padding: '4px 10px', borderRadius: 20, flexShrink: 0, whiteSpace: 'nowrap' }}>{n.action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe CTA */}
      <div style={{ padding: '18px 20px 28px' }}>
        <div
          onMouseDown={() => setPressedCTA(true)} onMouseUp={() => setPressedCTA(false)} onMouseLeave={() => setPressedCTA(false)}
          onClick={() => setActiveTab('recipes')}
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDeep})`,
            borderRadius: 18, padding: '16px 18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: `0 8px 24px ${theme.primary}40`,
            transform: pressedCTA ? 'scale(0.99)' : 'scale(1)',
            transition: 'transform 120ms ease',
          }}>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Based on your pantry</p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#fff' }}>4 recipes you can make now</p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={20} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INVENTORY SCREEN ─────────────────────────────────────────────────────────
function InventoryScreen({ theme, isDark }) {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const Search = window.lucide.Search;
  const SlidersHorizontal = window.lucide.SlidersHorizontal;
  const LayoutGrid = window.lucide.LayoutGrid;
  const List = window.lucide.List;
  const ChevronRight = window.lucide.ChevronRight;

  const cats = [
    { id: 'all',      label: 'All',      emoji: '📦', count: inventoryData.length },
    { id: 'pantry',   label: 'Pantry',   emoji: '🥫', count: inventoryData.filter(i => i.cat === 'pantry').length },
    { id: 'fridge',   label: 'Fridge',   emoji: '🧊', count: inventoryData.filter(i => i.cat === 'fridge').length },
    { id: 'closet',   label: 'Closet',   emoji: '👗', count: inventoryData.filter(i => i.cat === 'closet').length },
    { id: 'bathroom', label: 'Bath',     emoji: '🛁', count: inventoryData.filter(i => i.cat === 'bathroom').length },
    { id: 'household',label: 'Home',     emoji: '🏠', count: inventoryData.filter(i => i.cat === 'household').length },
  ];

  const filtered = inventoryData.filter(i =>
    (activeCat === 'all' || i.cat === activeCat) &&
    (query === '' || i.name.toLowerCase().includes(query.toLowerCase()))
  );

  const getBadge = (item) => {
    if (item.expDays === null) {
      if (item.usesLeft) return { label: `~${item.usesLeft} uses`, color: item.usesLeft <= 6 ? theme.secondary : theme.textMuted };
      return null;
    }
    if (item.expDays <= 2)  return { label: item.expDays === 1 ? 'Tomorrow' : `${item.expDays}d`, color: theme.danger };
    if (item.expDays <= 7)  return { label: `${item.expDays}d`, color: theme.secondary };
    if (item.expDays <= 14) return { label: `${item.expDays}d`, color: theme.primary };
    return null;
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '4px 20px 12px', background: theme.surface }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 800, color: theme.text }}>My Inventory</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: theme.surfaceAlt, borderRadius: 12, padding: '9px 12px', border: `1px solid ${theme.border}` }}>
            <Search size={14} color={theme.textMuted} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search items…"
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: theme.text, flex: 1, fontFamily: 'inherit' }} />
          </div>
          <div style={{ width: 40, height: 40, background: theme.primaryDim, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <SlidersHorizontal size={15} color={theme.primary} />
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ padding: '10px 20px', background: theme.surface, borderBottom: `1px solid ${theme.border}`, display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {cats.map(cat => {
          const isActive = activeCat === cat.id;
          return (
            <div key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
              borderRadius: 20, cursor: 'pointer', flexShrink: 0,
              background: isActive ? theme.primary : theme.surfaceAlt,
              border: `1.5px solid ${isActive ? theme.primary : theme.border}`,
              transition: 'all 0.15s ease',
            }}>
              <span style={{ fontSize: 12 }}>{cat.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: isActive ? '#fff' : theme.textSub }}>{cat.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.7)' : theme.textMuted }}>{cat.count}</span>
            </div>
          );
        })}
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px 6px' }}>
        <span style={{ fontSize: 12, color: theme.textSub, fontWeight: 500 }}>{filtered.length} items</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[{ mode: 'list', Icon: List }, { mode: 'grid', Icon: LayoutGrid }].map(({ mode, Icon }) => (
            <div key={mode} onClick={() => setViewMode(mode)} style={{
              width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              background: viewMode === mode ? theme.primaryDim : 'transparent',
            }}>
              <Icon size={13} color={viewMode === mode ? theme.primary : theme.textMuted} />
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: '2px 20px 20px' }}>
        {viewMode === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {filtered.map(item => {
              const cat = catConfig[item.cat];
              const badge = getBadge(item);
              return (
                <div key={item.id} style={{
                  background: theme.surface, borderRadius: 14, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  border: `1px solid ${item.expDays !== null && item.expDays <= 2 ? theme.danger + '40' : theme.border}`,
                  animation: 'fadeUp 350ms cubic-bezier(0,0,0.2,1) both',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, fontSize: 20, background: isDark ? cat.darkBg : cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: theme.textSub, marginTop: 1 }}>
                      {item.qty} {item.unit}<span style={{ color: cat.color, fontWeight: 600 }}> · {cat.label}</span>
                    </div>
                  </div>
                  {badge && (
                    <div style={{ fontSize: 10, fontWeight: 700, color: badge.color, background: badge.color + '20', padding: '3px 8px', borderRadius: 20, flexShrink: 0 }}>
                      {badge.label}
                    </div>
                  )}
                  <ChevronRight size={13} color={theme.textMuted} />
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {filtered.map(item => {
              const cat = catConfig[item.cat];
              const badge = getBadge(item);
              return (
                <div key={item.id} style={{
                  background: theme.surface, borderRadius: 16, padding: '14px 12px',
                  border: `1px solid ${item.expDays !== null && item.expDays <= 2 ? theme.danger + '40' : theme.border}`,
                }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: theme.text, lineHeight: 1.3, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: theme.textSub }}>{item.qty} {item.unit}</div>
                  {badge && (
                    <div style={{ marginTop: 8, fontSize: 10, fontWeight: 700, color: badge.color, background: badge.color + '20', padding: '2px 7px', borderRadius: 20, display: 'inline-block' }}>
                      {badge.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADD SCREEN ───────────────────────────────────────────────────────────────
function AddScreen({ theme }) {
  const [activeMethod, setActiveMethod] = useState(null);
  const [form, setForm] = useState({ name: '', cat: 'pantry', qty: '1' });
  const [recent, setRecent] = useState([
    { id: 1, name: 'Almond Butter', icon: '🥜', cat: 'pantry',   ago: '2h ago' },
    { id: 2, name: 'Body Lotion',   icon: '🧴', cat: 'bathroom', ago: '1d ago' },
    { id: 3, name: 'Green Tea',     icon: '🍵', cat: 'pantry',   ago: '2d ago' },
  ]);

  const FileText = window.lucide.FileText;
  const Camera = window.lucide.Camera;
  const Mic = window.lucide.Mic;
  const Plus = window.lucide.Plus;
  const Check = window.lucide.Check;

  const methods = [
    { id: 'receipt', Icon: FileText, label: 'Scan Receipt',  desc: 'Auto-detect all items at once',    color: theme.primary,   bg: theme.primaryDim   },
    { id: 'photo',   Icon: Camera,   label: 'Take a Photo',  desc: 'Snap a product or entire shelf',   color: theme.accent,    bg: theme.accentDim    },
    { id: 'voice',   Icon: Mic,      label: 'Voice Note',    desc: 'Just say what you have',           color: theme.secondary, bg: theme.secondaryDim },
  ];

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const c = catConfig[form.cat];
    setRecent(prev => [{ id: Date.now(), name: form.name, icon: c.emoji, cat: form.cat, ago: 'Just now' }, ...prev.slice(0, 4)]);
    setForm({ name: '', cat: 'pantry', qty: '1' });
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '4px 20px 12px', background: theme.surface }}>
        <h2 style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 800, color: theme.text }}>Add Items</h2>
        <p style={{ margin: 0, fontSize: 12, color: theme.textSub }}>Scan, snap, or speak to log in seconds</p>
      </div>

      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {methods.map(({ id, Icon, label, desc, color, bg }) => {
          const isActive = activeMethod === id;
          return (
            <div key={id} onClick={() => setActiveMethod(isActive ? null : id)} style={{
              background: theme.surface, borderRadius: 18, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              border: `2px solid ${isActive ? color : theme.border}`,
              transform: isActive ? 'scale(0.99)' : 'scale(1)',
              transition: 'all 0.15s ease',
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{label}</div>
                <div style={{ fontSize: 11, color: theme.textSub, marginTop: 1 }}>{desc}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, flexShrink: 0, color: isActive ? '#fff' : theme.textSub, background: isActive ? color : theme.surfaceAlt }}>
                {isActive ? 'Active' : 'Tap'}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px' }}>
        <div style={{ flex: 1, height: 1, background: theme.border }} />
        <span style={{ fontSize: 10, color: theme.textMuted, fontWeight: 700, letterSpacing: '0.8px' }}>OR ADD MANUALLY</span>
        <div style={{ flex: 1, height: 1, background: theme.border }} />
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ background: theme.surface, borderRadius: 18, padding: 16, border: `1px solid ${theme.border}` }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Item Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Oat Milk"
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', boxSizing: 'border-box', border: `1px solid ${theme.border}`, borderRadius: 10, fontSize: 13, color: theme.text, background: theme.surfaceAlt, outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Category</label>
              <select value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', border: `1px solid ${theme.border}`, borderRadius: 10, fontSize: 12, color: theme.text, background: theme.surfaceAlt, outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
                <option value="pantry">🥫 Pantry</option>
                <option value="fridge">🧊 Fridge</option>
                <option value="closet">👗 Closet</option>
                <option value="bathroom">🛁 Bathroom</option>
                <option value="household">🏠 Household</option>
              </select>
            </div>
            <div style={{ width: 72 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Qty</label>
              <input type="number" min="1" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', boxSizing: 'border-box', border: `1px solid ${theme.border}`, borderRadius: 10, fontSize: 13, color: theme.text, background: theme.surfaceAlt, outline: 'none', fontFamily: 'inherit' }} />
            </div>
          </div>
          <button onClick={handleAdd} style={{
            width: '100%', height: 46, borderRadius: 12, border: 'none',
            background: theme.primary, color: '#fff', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Plus size={16} color="#fff" />Add to Inventory
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px 28px' }}>
        <h3 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: theme.text }}>Recently Added</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {recent.map(item => {
            const cat = catConfig[item.cat];
            return (
              <div key={item.id} style={{ background: theme.surface, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${theme.border}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, fontSize: 18, flexShrink: 0, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: theme.textSub }}>{cat.label} · {item.ago}</div>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={11} color={theme.primary} strokeWidth={3} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── RECIPES SCREEN ───────────────────────────────────────────────────────────
function RecipesScreen({ theme }) {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [saved, setSaved] = useState([]);

  const ChefHat = window.lucide.ChefHat;
  const Clock = window.lucide.Clock;
  const ChevronDown = window.lucide.ChevronDown;
  const ChevronUp = window.lucide.ChevronUp;
  const AlertTriangle = window.lucide.AlertTriangle;
  const Bookmark = window.lucide.Bookmark;
  const Check = window.lucide.Check;

  const filters = [
    { id: 'all',      label: 'All Recipes' },
    { id: 'expiring', label: '⚡ Use Now'     },
    { id: 'quick',    label: '⏱ Under 15 min' },
  ];

  const shown = recipesData.filter(r =>
    filter === 'all'      ? true :
    filter === 'expiring' ? r.tags.includes('Expiring') :
    r.time <= 15
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '4px 20px 12px', background: theme.surface }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <ChefHat size={18} color={theme.primary} />
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: theme.text }}>Recipe Ideas</h2>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: theme.textSub }}>Made from what's already in your home</p>
      </div>

      <div style={{ padding: '10px 20px', background: theme.surface, borderBottom: `1px solid ${theme.border}`, display: 'flex', gap: 8 }}>
        {filters.map(f => (
          <div key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
            background: filter === f.id ? theme.primary : theme.surfaceAlt,
            border: `1.5px solid ${filter === f.id ? theme.primary : theme.border}`,
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: filter === f.id ? '#fff' : theme.textSub }}>{f.label}</span>
          </div>
        ))}
      </div>

      <div style={{ margin: '12px 20px 0', background: theme.dangerDim, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${theme.danger}30` }}>
        <AlertTriangle size={13} color={theme.danger} />
        <span style={{ fontSize: 12, color: theme.danger, fontWeight: 600 }}>
          Baby Spinach &amp; Strawberries expire soon — 2 recipes use them
        </span>
      </div>

      <div style={{ padding: '12px 20px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {shown.map(recipe => {
          const isExpanded = expanded === recipe.id;
          const isSaved = saved.includes(recipe.id);
          return (
            <div key={recipe.id} style={{ background: theme.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
              <div style={{ height: 6, background: `linear-gradient(90deg, ${recipe.color}, ${recipe.color}60)` }} />
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{recipe.emoji}</span>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: theme.text }}>{recipe.name}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <Clock size={11} color={theme.textSub} />
                      <span style={{ fontSize: 11, color: theme.textSub }}>{recipe.time} min · {recipe.difficulty}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: recipe.color, lineHeight: 1 }}>{recipe.match}%</div>
                    <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 600 }}>match</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  {recipe.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: recipe.color, background: recipe.color + '18', padding: '2px 8px', borderRadius: 20 }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                  {recipe.ingredients.map((ing, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, background: theme.primaryDim, borderRadius: 8, padding: '3px 8px' }}>
                      <Check size={9} color={theme.primary} strokeWidth={3} />
                      <span style={{ fontSize: 10, color: theme.primary, fontWeight: 600 }}>{ing}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: theme.textSub }}>
                    <span style={{ color: recipe.color, fontWeight: 700 }}>{recipe.matched}</span>/{recipe.total} ingredients at home
                  </span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div onClick={() => setSaved(s => isSaved ? s.filter(x => x !== recipe.id) : [...s, recipe.id])} style={{ cursor: 'pointer' }}>
                      <Bookmark size={15} color={isSaved ? recipe.color : theme.textMuted} fill={isSaved ? recipe.color : 'none'} />
                    </div>
                    <div onClick={() => setExpanded(isExpanded ? null : recipe.id)} style={{ display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: theme.primary }}>View</span>
                      {isExpanded ? <ChevronUp size={13} color={theme.primary} /> : <ChevronDown size={13} color={theme.primary} />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: 12, padding: 12, background: theme.surfaceAlt, borderRadius: 12 }}>
                    <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: theme.text }}>Quick steps:</p>
                    <p style={{ margin: '0 0 12px', fontSize: 11, color: theme.textSub, lineHeight: 1.65 }}>{recipe.steps}</p>
                    <button style={{ width: '100%', padding: 10, background: recipe.color, borderRadius: 10, border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Start Cooking 👨‍🍳
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ theme, isDark, toggleTheme }) {
  const [notifs, setNotifs] = useState({ expiry: true, lowStock: true, shopping: false, weekly: true });

  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const ChevronRight = window.lucide.ChevronRight;
  const BarChart3 = window.lucide.BarChart3;
  const Tag = window.lucide.Tag;
  const Shield = window.lucide.Shield;
  const HelpCircle = window.lucide.HelpCircle;
  const LogOut = window.lucide.LogOut;
  const Bell = window.lucide.Bell;

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width: 48, height: 28, borderRadius: 14, cursor: 'pointer', background: on ? theme.primary : theme.border, position: 'relative', transition: 'background 0.2s ease', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: 11, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s cubic-bezier(0.175,0.885,0.32,1.275)' }} />
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '4px 20px 14px', background: theme.surface }}>
        <h2 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 800, color: theme.text }}>Settings</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent}10)`, borderRadius: 16, padding: '14px', border: `1px solid ${theme.primary}25` }}>
          <div style={{ width: 50, height: 50, borderRadius: 16, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 800, color: '#fff', flexShrink: 0 }}>AM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>Alex Martinez</div>
            <div style={{ fontSize: 12, color: theme.textSub }}>alex@example.com</div>
          </div>
          <ChevronRight size={16} color={theme.textMuted} />
        </div>
      </div>

      {/* Impact stats */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ background: theme.surface, borderRadius: 18, padding: 14, border: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <BarChart3 size={14} color={theme.primary} />
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Your Impact</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { v: '47',  l: 'Items tracked'  },
              { v: '$89', l: 'Saved / month'  },
              { v: '12',  l: 'Items used up'  },
              { v: '14d', l: 'Check streak'   },
            ].map(({ v, l }, i) => (
              <div key={i} style={{ background: theme.surfaceAlt, borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.primary }}>{v}</div>
                <div style={{ fontSize: 10, color: theme.textSub, marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggles section */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ background: theme.surface, borderRadius: 18, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: isDark ? '#1E3A5F' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDark ? <Moon size={15} color="#818CF8" /> : <Sun size={15} color={theme.secondary} />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>Dark Mode</span>
            </div>
            <Toggle on={isDark} onToggle={toggleTheme} />
          </div>
          {[
            { key: 'expiry',   label: 'Expiry alerts',         emoji: '⏰' },
            { key: 'lowStock', label: 'Low stock nudges',       emoji: '📉' },
            { key: 'shopping', label: 'Shopping reminders',     emoji: '🛒' },
            { key: 'weekly',   label: 'Weekly digest',          emoji: '📊' },
          ].map(({ key, label, emoji }, i, arr) => (
            <div key={key} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{emoji}</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{label}</span>
              </div>
              <Toggle on={notifs[key]} onToggle={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} />
            </div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div style={{ padding: '12px 20px 28px' }}>
        <div style={{ background: theme.surface, borderRadius: 18, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          {[
            { Icon: Tag,        label: 'Manage Categories',       color: theme.accent   },
            { Icon: Bell,       label: 'Notification Preferences',color: theme.primary  },
            { Icon: Shield,     label: 'Privacy & Data',          color: theme.secondary},
            { Icon: HelpCircle, label: 'Help & Support',          color: '#0EA5E9'      },
            { Icon: LogOut,     label: 'Sign Out',                color: theme.danger   },
          ].map(({ Icon, label, color }, i, arr) => (
            <div key={label} style={{ padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={color} />
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: label === 'Sign Out' ? theme.danger : theme.text }}>{label}</span>
              <ChevronRight size={14} color={theme.textMuted} />
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', margin: '16px 0 0', fontSize: 11, color: theme.textMuted }}>Shelf Sync v1.0.0 · Use what you own</p>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home',      label: 'Home',      icon: window.lucide.Home     },
    { id: 'inventory', label: 'Inventory', icon: window.lucide.Package  },
    { id: 'add',       label: 'Add',       icon: window.lucide.Plus     },
    { id: 'recipes',   label: 'Recipes',   icon: window.lucide.ChefHat  },
    { id: 'settings',  label: 'Settings',  icon: window.lucide.Settings },
  ];

  const screens = {
    home:      HomeScreen,
    inventory: InventoryScreen,
    add:       AddScreen,
    recipes:   RecipesScreen,
    settings:  SettingsScreen,
  };

  const CurrentScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#B2DFCF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', 'DM Sans', sans-serif", padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        input, select, button { font-family: 'Sora', 'DM Sans', sans-serif !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseNotif {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.3); opacity: 0.6; }
        }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 48, overflow: 'hidden',
        background: theme.bg, position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 10px #1a1a1a, 0 0 0 11px #2d2d2d',
        display: 'flex', flexDirection: 'column',
        fontFamily: "'Sora', 'DM Sans', sans-serif",
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 126, height: 34, borderRadius: 20, background: '#000', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#111', border: '1.5px solid #222' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#111', border: '1.5px solid #1a1a1a' }} />
        </div>

        {!onboarded ? (
          <OnboardingScreen onComplete={() => setOnboarded(true)} />
        ) : (
          <>
            <StatusBar theme={theme} />
            <div style={{ height: 8, background: theme.surface }} />

            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <CurrentScreen
                theme={theme}
                isDark={isDark}
                toggleTheme={() => setIsDark(d => !d)}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Bottom Navigation */}
            <div style={{ background: theme.navBg, borderTop: `1px solid ${theme.border}`, display: 'flex', paddingBottom: 8, paddingTop: 2 }}>
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isAdd = tab.id === 'add';
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: isAdd ? 0 : 8, cursor: 'pointer' }}
                  >
                    {isAdd ? (
                      <>
                        <div style={{
                          width: 50, height: 50, borderRadius: 18, marginTop: -14,
                          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDeep})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: `0 6px 20px ${theme.primary}55`,
                          transform: isActive ? 'scale(0.94)' : 'scale(1)',
                          transition: 'transform 150ms ease',
                        }}>
                          <Icon size={22} color="#fff" strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? theme.primary : theme.textMuted, marginTop: 2 }}>
                          {tab.label}
                        </span>
                      </>
                    ) : (
                      <>
                        <div style={{ width: 32, height: 28, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isActive ? theme.primaryDim : 'transparent', transition: 'background 0.15s ease' }}>
                          <Icon size={20} color={isActive ? theme.primary : theme.textMuted} strokeWidth={isActive ? 2.5 : 1.75} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? theme.primary : theme.textMuted, marginTop: 2 }}>
                          {tab.label}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
