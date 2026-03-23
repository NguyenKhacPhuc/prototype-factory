const { useState, useEffect, useRef } = React;

// ============ THEMES ============
const themes = {
  dark: {
    bg: '#080C09', surface: '#101610', card: '#161E17', cardAlt: '#1C2820',
    primary: '#3DFF84', primaryDim: 'rgba(61,255,132,0.12)', primaryDim2: 'rgba(61,255,132,0.07)',
    secondary: '#FFB340', accent: '#00D4FF',
    text: '#EDF7F0', textSub: '#7A9E87', textMuted: '#3E5A48',
    border: '#1E2E22', borderLight: '#162018',
    danger: '#FF4F4F', dangerDim: 'rgba(255,79,79,0.13)',
    warning: '#FFB340', warningDim: 'rgba(255,179,64,0.13)',
    navBg: '#0C1410', navBorder: '#192219',
    inputBg: '#131B14', pill: '#1C2820',
    shimmer: 'linear-gradient(135deg, #161E17 0%, #1C2820 100%)',
  },
  light: {
    bg: '#EFF7F1', surface: '#FFFFFF', card: '#FFFFFF', cardAlt: '#F5FBF6',
    primary: '#0EA347', primaryDim: 'rgba(14,163,71,0.1)', primaryDim2: 'rgba(14,163,71,0.06)',
    secondary: '#D97706', accent: '#0284C7',
    text: '#0A1A10', textSub: '#4A7A5A', textMuted: '#8AB89A',
    border: '#D5EAD9', borderLight: '#E8F5EA',
    danger: '#DC2626', dangerDim: 'rgba(220,38,38,0.1)',
    warning: '#D97706', warningDim: 'rgba(217,119,6,0.1)',
    navBg: '#FFFFFF', navBorder: '#E2F0E5',
    inputBg: '#F4FAF5', pill: '#EFF7F1',
    shimmer: 'linear-gradient(135deg, #FFFFFF 0%, #F5FBF6 100%)',
  }
};

// ============ DATA ============
const today = new Date();
const addDays = (n) => { const d = new Date(today); d.setDate(d.getDate() + n); return d; };
const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const getDaysLeft = (item) => Math.ceil((item.expires - today) / (1000 * 60 * 60 * 24));
const getUrgency = (item) => { const d = getDaysLeft(item); return d <= 1 ? 'urgent' : d <= 3 ? 'warning' : 'safe'; };

const pantryItems = [
  { id: 1, name: 'Baby Spinach', category: 'Produce', qty: '85g bag', expires: addDays(1), icon: '🥬', leftover: false },
  { id: 2, name: 'Chicken Breast', category: 'Proteins', qty: '200g', expires: addDays(1), icon: '🍗', leftover: false },
  { id: 3, name: 'Cooked Rice', category: 'Leftovers', qty: '2 cups', expires: addDays(2), icon: '🍚', leftover: true },
  { id: 4, name: 'Cherry Tomatoes', category: 'Produce', qty: 'half pint', expires: addDays(2), icon: '🍅', leftover: false },
  { id: 5, name: 'Mushrooms', category: 'Produce', qty: '6 pieces', expires: addDays(2), icon: '🍄', leftover: false },
  { id: 6, name: 'Pasta Sauce', category: 'Leftovers', qty: '1 cup', expires: addDays(3), icon: '🥫', leftover: true },
  { id: 7, name: 'Greek Yogurt', category: 'Dairy', qty: '200g', expires: addDays(3), icon: '🫙', leftover: false },
  { id: 8, name: 'Eggs', category: 'Dairy', qty: '4 large', expires: addDays(5), icon: '🥚', leftover: false },
  { id: 9, name: 'Cheddar Cheese', category: 'Dairy', qty: '150g block', expires: addDays(7), icon: '🧀', leftover: false },
  { id: 10, name: 'Milk', category: 'Dairy', qty: '400ml', expires: addDays(4), icon: '🥛', leftover: false },
  { id: 11, name: 'Chickpeas', category: 'Canned', qty: '1 can', expires: addDays(365), icon: '🫘', leftover: false },
  { id: 12, name: 'Crushed Tomatoes', category: 'Canned', qty: '1 can', expires: addDays(400), icon: '🍅', leftover: false },
  { id: 13, name: 'Penne Pasta', category: 'Grains', qty: '300g', expires: addDays(180), icon: '🍝', leftover: false },
  { id: 14, name: 'Basmati Rice', category: 'Grains', qty: '500g', expires: addDays(200), icon: '🌾', leftover: false },
  { id: 15, name: 'Olive Oil', category: 'Pantry', qty: 'half bottle', expires: addDays(300), icon: '🫒', leftover: false },
  { id: 16, name: 'Garlic', category: 'Produce', qty: '1 bulb', expires: addDays(14), icon: '🧄', leftover: false },
  { id: 17, name: 'Onions', category: 'Produce', qty: '2 medium', expires: addDays(21), icon: '🧅', leftover: false },
  { id: 18, name: 'Soy Sauce', category: 'Pantry', qty: 'half bottle', expires: addDays(365), icon: '🍶', leftover: false },
];

const recipeData = [
  {
    id: 1, name: 'Rescue Fried Rice Bowl', time: '15 min', difficulty: 'Easy', rescueScore: 98,
    uses: ['Cooked Rice', 'Baby Spinach', 'Chicken Breast', 'Eggs', 'Soy Sauce'],
    urgentUses: ['Cooked Rice', 'Baby Spinach', 'Chicken Breast'], servings: 2, emoji: '🍳',
    description: 'Fast weeknight bowl using your most urgent items — zero waste.',
    steps: ['Dice chicken, stir-fry 5 min', 'Add rice and soy sauce, fry 3 min', 'Push aside, scramble 2 eggs', 'Fold in spinach until wilted', 'Season with sesame oil and serve'],
    missing: [], matchPct: 100,
  },
  {
    id: 2, name: 'Spinach & Chickpea Curry', time: '25 min', difficulty: 'Medium', rescueScore: 87,
    uses: ['Baby Spinach', 'Chickpeas', 'Crushed Tomatoes', 'Garlic', 'Onions'],
    urgentUses: ['Baby Spinach'], servings: 3, emoji: '🍛',
    description: 'Warm protein-packed curry from pantry staples.',
    steps: ['Sauté onion and garlic 4 min', 'Add spices, cook 1 min', 'Add tomatoes and chickpeas', 'Simmer 15 min', 'Wilt spinach in at the end'],
    missing: ['curry powder', 'cumin'], matchPct: 87,
  },
  {
    id: 3, name: 'Mushroom Egg Scramble', time: '10 min', difficulty: 'Easy', rescueScore: 76,
    uses: ['Eggs', 'Mushrooms', 'Baby Spinach', 'Cheddar Cheese'],
    urgentUses: ['Mushrooms', 'Baby Spinach'], servings: 1, emoji: '🥚',
    description: 'Quick protein-rich breakfast or lunch in 10 minutes.',
    steps: ['Sauté mushrooms 3 min until golden', 'Add spinach, toss to wilt', 'Pour in beaten eggs', 'Fold gently, top with cheese'],
    missing: [], matchPct: 100,
  },
  {
    id: 4, name: 'Pasta with Leftover Sauce', time: '20 min', difficulty: 'Easy', rescueScore: 71,
    uses: ['Penne Pasta', 'Pasta Sauce', 'Cheddar Cheese'],
    urgentUses: ['Pasta Sauce'], servings: 2, emoji: '🍝',
    description: 'Classic comfort meal using leftover sauce before it turns.',
    steps: ['Boil pasta in salted water al dente', 'Heat pasta sauce in pan', 'Toss pasta with warmed sauce', 'Top with grated cheese and serve'],
    missing: [], matchPct: 100,
  },
];

const plannerData = [
  { dayLabel: 'Mon', label: 'Today', meal: 'Rescue Fried Rice Bowl', emoji: '🍳', time: '15 min', usesUrgent: ['Spinach', 'Chicken', 'Rice'], creates: ['Leftover rice portion'], fromLeftover: null },
  { dayLabel: 'Tue', label: 'Tomorrow', meal: 'Spinach & Chickpea Curry', emoji: '🍛', time: '25 min', usesUrgent: [], creates: ['Leftover curry (2 portions)'], fromLeftover: null },
  { dayLabel: 'Wed', label: 'Wednesday', meal: 'Curry Bowl + Flatbread', emoji: '🫙', time: '5 min', usesUrgent: [], creates: [], fromLeftover: 'Leftover curry (2 portions)' },
  { dayLabel: 'Thu', label: 'Thursday', meal: 'Mushroom Egg Scramble', emoji: '🥚', time: '10 min', usesUrgent: ['Mushrooms'], creates: [], fromLeftover: null },
  { dayLabel: 'Fri', label: 'Friday', meal: 'Pasta with Leftover Sauce', emoji: '🍝', time: '20 min', usesUrgent: ['Pasta Sauce'], creates: ['Leftover pasta'], fromLeftover: null },
];

// ============ STATUS BAR ============
function StatusBar({ t }) {
  const [time, setTime] = useState(() => { const n = new Date(); return `${n.getHours()}:${String(n.getMinutes()).padStart(2,'0')}`; });
  useEffect(() => {
    const iv = setInterval(() => { const n = new Date(); setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2,'0')}`); }, 30000);
    return () => clearInterval(iv);
  }, []);
  const Wifi = window.lucide.Wifi;
  const Battery = window.lucide.Battery;
  const Signal = window.lucide.Signal;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 4px', color: t.text, fontSize: 13, fontWeight: 700 }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Signal size={12} color={t.text} />
        <Wifi size={12} color={t.text} />
        <Battery size={15} color={t.text} />
      </div>
    </div>
  );
}

// ============ HOME SCREEN ============
function HomeScreen({ t, isDark }) {
  const urgentItems = pantryItems.filter(i => getUrgency(i) === 'urgent');
  const warnItems = pantryItems.filter(i => getUrgency(i) === 'warning');
  const AlertTriangle = window.lucide.AlertTriangle;
  const Zap = window.lucide.Zap;
  const Clock = window.lucide.Clock;
  const Bell = window.lucide.Bell;
  const ArrowRight = window.lucide.ArrowRight;
  const Flame = window.lucide.Flame;
  const TrendingDown = window.lucide.TrendingDown;
  const ChevronRight = window.lucide.ChevronRight;

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
      {/* Header */}
      <div style={{ padding: '6px 20px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: t.textSub, fontSize: 13, margin: 0 }}>Good evening 👋</p>
            <h1 style={{ color: t.text, fontSize: 23, fontWeight: 800, margin: '3px 0 0', letterSpacing: '-0.5px' }}>Kitchen Status</h1>
          </div>
          <div style={{ background: t.dangerDim, borderRadius: 12, padding: '6px 11px', display: 'flex', alignItems: 'center', gap: 5, border: `1px solid ${t.danger}30` }}>
            <Flame size={13} color={t.danger} />
            <span style={{ color: t.danger, fontSize: 12, fontWeight: 700 }}>{urgentItems.length} urgent</span>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          {[
            { label: 'Total items', val: pantryItems.length, color: t.primary },
            { label: 'Expiring', val: urgentItems.length + warnItems.length, color: t.warning },
            { label: 'Rescue meals', val: recipeData.filter(r => r.urgentUses.length > 0).length, color: t.accent },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: t.card, borderRadius: 14, padding: '11px 8px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.val}</div>
              <div style={{ color: t.textSub, fontSize: 10, marginTop: 2, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rescue Alert */}
      <div style={{ margin: '0 20px 14px' }}>
        <div style={{ background: isDark ? 'linear-gradient(135deg,#1F0A0A,#1C1208)' : 'linear-gradient(135deg,#FFF5F5,#FFFAF0)', border: `1px solid ${t.danger}35`, borderRadius: 16, padding: '13px 15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ background: t.danger, borderRadius: 8, padding: 5, display: 'flex', alignItems: 'center' }}>
              <AlertTriangle size={13} color="#FFF" />
            </div>
            <span style={{ color: t.danger, fontSize: 13, fontWeight: 700 }}>Use Tonight or Tomorrow</span>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {urgentItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.dangerDim, borderRadius: 20, padding: '5px 11px', border: `1px solid ${t.danger}25` }}>
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span style={{ color: t.text, fontSize: 12, fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: t.danger, fontSize: 10, fontWeight: 700 }}>{getDaysLeft(item) <= 0 ? 'today' : 'tmrw'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rescue Meals */}
      <div style={{ margin: '0 20px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <Zap size={15} color={t.primary} />
            <span style={{ color: t.text, fontSize: 15, fontWeight: 700 }}>Rescue Meals</span>
          </div>
          <span style={{ color: t.primary, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
            See all <ChevronRight size={13} color={t.primary} />
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recipeData.filter(r => r.urgentUses.length > 0).slice(0, 2).map((r, i) => (
            <div key={r.id} style={{ background: t.card, borderRadius: 16, padding: '13px 15px', border: `1px solid ${i === 0 ? t.primary + '30' : t.border}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, background: t.surface, borderRadius: 12, padding: '8px 10px', lineHeight: 1, flexShrink: 0 }}>{r.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{r.name}</h3>
                    <div style={{ background: t.primaryDim, borderRadius: 8, padding: '3px 8px' }}>
                      <span style={{ color: t.primary, fontSize: 11, fontWeight: 800 }}>⚡{r.rescueScore}</span>
                    </div>
                  </div>
                  <p style={{ color: t.textSub, fontSize: 12, margin: '3px 0 7px', lineHeight: 1.4 }}>{r.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} color={t.textSub} />
                      <span style={{ color: t.textSub, fontSize: 11 }}>{r.time}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {r.urgentUses.slice(0, 2).map(u => (
                        <span key={u} style={{ background: t.dangerDim, color: t.danger, fontSize: 10, padding: '2px 7px', borderRadius: 8, fontWeight: 700 }}>🔥{u.split(' ')[0]}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Nudge */}
      <div style={{ margin: '0 20px' }}>
        <div style={{ background: isDark ? `linear-gradient(135deg,${t.primaryDim},${t.primaryDim2})` : 'linear-gradient(135deg,#F0FFF4,#E8F5EE)', border: `1px solid ${t.primary}30`, borderRadius: 16, padding: '13px 15px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ background: t.primary, borderRadius: 10, padding: 8, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Bell size={15} color="#000" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: t.text, fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>You have everything for dinner</p>
            <p style={{ color: t.textSub, fontSize: 12, margin: 0 }}>Rescue Fried Rice — 15 min, uses spinach & chicken</p>
          </div>
          <ArrowRight size={17} color={t.primary} />
        </div>
      </div>
    </div>
  );
}

// ============ PANTRY SCREEN ============
function PantryScreen({ t }) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const Search = window.lucide.Search;
  const Plus = window.lucide.Plus;
  const Scan = window.lucide.Scan;
  const Flame = window.lucide.Flame;
  const categories = ['All', 'Produce', 'Proteins', 'Dairy', 'Leftovers', 'Canned', 'Grains', 'Pantry'];

  const filtered = pantryItems
    .filter(i => (category === 'All' || i.category === category) && i.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.expires - b.expires);

  const urgencyStyle = {
    urgent: { bg: t.dangerDim, border: `${t.danger}35`, text: t.danger },
    warning: { bg: t.warningDim, border: `${t.warning}35`, text: t.warning },
    safe: { bg: t.primaryDim, border: `${t.primary}20`, text: t.primary },
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '6px 20px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h1 style={{ color: t.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.4px' }}>My Pantry</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
              <Scan size={14} color={t.primary} />
              <span style={{ color: t.primary, fontSize: 12, fontWeight: 700 }}>Scan</span>
            </div>
            <div style={{ background: t.primary, borderRadius: 10, padding: '7px 11px', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
              <Plus size={14} color="#000" />
              <span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>Add</span>
            </div>
          </div>
        </div>
        <div style={{ background: t.inputBg, borderRadius: 12, padding: '9px 13px', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${t.border}` }}>
          <Search size={15} color={t.textMuted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ingredients..." style={{ background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 14, flex: 1, fontFamily: 'inherit' }} />
        </div>
        <div style={{ display: 'flex', gap: 7, marginTop: 11, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{ background: category === c ? t.primary : t.pill, color: category === c ? '#000' : t.textSub, border: `1px solid ${category === c ? t.primary : t.border}`, borderRadius: 20, padding: '5px 13px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, transition: 'all 0.15s' }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
        {category === 'All' && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 11, background: t.card, borderRadius: 12, padding: '9px 12px', border: `1px solid ${t.border}`, alignItems: 'center' }}>
            <Flame size={13} color={t.danger} />
            <span style={{ color: t.textSub, fontSize: 12 }}>
              <span style={{ color: t.danger, fontWeight: 700 }}>{pantryItems.filter(i => getUrgency(i) === 'urgent').length} urgent</span>
              {' · '}
              <span style={{ color: t.warning, fontWeight: 700 }}>{pantryItems.filter(i => getUrgency(i) === 'warning').length} expiring soon</span>
              {' · '}
              <span style={{ color: t.primary, fontWeight: 700 }}>{pantryItems.filter(i => getUrgency(i) === 'safe').length} safe</span>
            </span>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(item => {
            const urg = getUrgency(item);
            const sty = urgencyStyle[urg];
            const daysLeft = getDaysLeft(item);
            return (
              <div key={item.id} style={{ background: t.card, borderRadius: 14, padding: '11px 14px', border: `1px solid ${sty.border}`, display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ fontSize: 24, background: t.surface, borderRadius: 10, padding: '6px 8px', lineHeight: 1, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: t.text, fontSize: 14, fontWeight: 600 }}>{item.name}</span>
                    <span style={{ background: sty.bg, color: sty.text, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, flexShrink: 0 }}>
                      {daysLeft <= 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : daysLeft > 30 ? fmtDate(item.expires) : `${daysLeft}d`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 3, alignItems: 'center' }}>
                    <span style={{ color: t.textSub, fontSize: 12 }}>{item.qty}</span>
                    <span style={{ color: t.textMuted, fontSize: 12 }}>·</span>
                    <span style={{ color: t.textSub, fontSize: 12 }}>{item.category}</span>
                    {item.leftover && <span style={{ background: `${t.secondary}20`, color: t.secondary, fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 6 }}>leftover</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ RECIPES SCREEN ============
function RecipesScreen({ t }) {
  const [filter, setFilter] = useState('rescue');
  const [selected, setSelected] = useState(null);
  const Clock = window.lucide.Clock;
  const Users = window.lucide.Users;
  const Zap = window.lucide.Zap;
  const CheckCircle = window.lucide.CheckCircle;
  const XCircle = window.lucide.XCircle;
  const ChevronRight = window.lucide.ChevronRight;
  const X = window.lucide.X;

  const filtered = recipeData.filter(r => {
    if (filter === 'rescue') return r.urgentUses.length > 0;
    if (filter === 'quick') return parseInt(r.time) <= 15;
    return true;
  }).sort((a, b) => b.rescueScore - a.rescueScore);

  if (selected) {
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        <div style={{ padding: '6px 20px 16px' }}>
          <button onClick={() => setSelected(null)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: '7px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', color: t.text, fontSize: 13, marginBottom: 14 }}>
            <X size={13} color={t.text} /> Back
          </button>
          <div style={{ background: t.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.border}` }}>
            <div style={{ background: `linear-gradient(135deg,${t.primaryDim},${t.surface})`, padding: '22px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 52, marginBottom: 8 }}>{selected.emoji}</div>
              <h2 style={{ color: t.text, fontSize: 19, fontWeight: 800, margin: '0 0 5px', letterSpacing: '-0.3px' }}>{selected.name}</h2>
              <p style={{ color: t.textSub, fontSize: 13, margin: 0, lineHeight: 1.4 }}>{selected.description}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 13 }}>
                {[{ icon: Clock, text: selected.time }, { icon: Users, text: `${selected.servings} servings` }].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Icon size={13} color={t.textSub} /><span style={{ color: t.textSub, fontSize: 12 }}>{text}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Zap size={13} color={t.primary} /><span style={{ color: t.primary, fontSize: 12, fontWeight: 700 }}>Score {selected.rescueScore}</span>
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <h3 style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: '0 0 10px' }}>Ingredients</h3>
              {selected.uses.map(ing => {
                const inPantry = pantryItems.find(p => p.name.toLowerCase().includes(ing.toLowerCase().split(' ')[0]));
                return (
                  <div key={ing} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
                    {inPantry ? <CheckCircle size={16} color={t.primary} /> : <XCircle size={16} color={t.danger} />}
                    <span style={{ color: inPantry ? t.text : t.textMuted, fontSize: 13 }}>{ing}</span>
                    {inPantry && getUrgency(inPantry) === 'urgent' && (
                      <span style={{ background: t.dangerDim, color: t.danger, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, marginLeft: 'auto' }}>use tonight</span>
                    )}
                  </div>
                );
              })}
              {selected.missing.length > 0 && (
                <div style={{ background: t.warningDim, borderRadius: 10, padding: '9px 12px', marginTop: 6, border: `1px solid ${t.warning}25` }}>
                  <p style={{ color: t.warning, fontSize: 12, margin: 0, fontWeight: 600 }}>🛒 Need to buy: {selected.missing.join(', ')}</p>
                </div>
              )}
              <h3 style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: '16px 0 10px' }}>Steps</h3>
              {selected.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <div style={{ background: t.primary, color: '#000', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <p style={{ color: t.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{step}</p>
                </div>
              ))}
              <button style={{ width: '100%', background: t.primary, border: 'none', borderRadius: 14, padding: 14, marginTop: 14, cursor: 'pointer', color: '#000', fontSize: 15, fontWeight: 700, fontFamily: 'inherit' }}>
                🍳 Start Cooking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '6px 20px 12px', flexShrink: 0 }}>
        <h1 style={{ color: t.text, fontSize: 22, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.4px' }}>Recipes</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ id: 'rescue', label: '🔥 Rescue First' }, { id: 'quick', label: '⚡ Quick (<15m)' }, { id: 'all', label: '📖 All' }].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{ background: filter === f.id ? t.primary : t.pill, color: filter === f.id ? '#000' : t.textSub, border: `1px solid ${filter === f.id ? t.primary : t.border}`, borderRadius: 20, padding: '6px 13px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((r, i) => (
            <div key={r.id} onClick={() => setSelected(r)} style={{ background: t.card, borderRadius: 18, border: `1px solid ${i === 0 ? t.primary + '40' : t.border}`, overflow: 'hidden', cursor: 'pointer' }}>
              {i === 0 && (
                <div style={{ background: `linear-gradient(90deg,${t.primary}18,transparent)`, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Zap size={11} color={t.primary} />
                  <span style={{ color: t.primary, fontSize: 11, fontWeight: 700 }}>TOP RESCUE PICK</span>
                </div>
              )}
              <div style={{ padding: '13px 15px' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ fontSize: 36, background: t.surface, borderRadius: 14, padding: '9px 11px', lineHeight: 1, flexShrink: 0 }}>{r.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{r.name}</h3>
                      <ChevronRight size={15} color={t.textMuted} />
                    </div>
                    <p style={{ color: t.textSub, fontSize: 12, margin: '3px 0 8px', lineHeight: 1.4 }}>{r.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} color={t.textSub} />
                        <span style={{ color: t.textSub, fontSize: 11 }}>{r.time}</span>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ flex: 1, height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ width: `${r.rescueScore}%`, height: '100%', background: r.rescueScore > 85 ? t.primary : t.warning, borderRadius: 2 }} />
                        </div>
                        <span style={{ color: r.rescueScore > 85 ? t.primary : t.warning, fontSize: 11, fontWeight: 700 }}>{r.rescueScore}</span>
                      </div>
                    </div>
                    {r.urgentUses.length > 0 && (
                      <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                        {r.urgentUses.map(u => <span key={u} style={{ background: t.dangerDim, color: t.danger, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 8 }}>🔥{u}</span>)}
                        {r.missing.length > 0 && <span style={{ background: t.warningDim, color: t.warning, fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 8 }}>+{r.missing.length} needed</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ PLANNER SCREEN ============
function PlannerScreen({ t }) {
  const [activeDay, setActiveDay] = useState(0);
  const Clock = window.lucide.Clock;
  const ArrowRight = window.lucide.ArrowRight;
  const Link = window.lucide.Link;
  const Leaf = window.lucide.Leaf;

  const day = plannerData[activeDay];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '6px 20px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h1 style={{ color: t.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.4px' }}>Meal Plan</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: t.primaryDim, borderRadius: 10, padding: '5px 10px', border: `1px solid ${t.primary}25` }}>
            <Leaf size={12} color={t.primary} />
            <span style={{ color: t.primary, fontSize: 12, fontWeight: 700 }}>Zero-waste week</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 13 }}>
          {[{ l: 'Planned', v: '5', i: '📅' }, { l: 'Leftovers', v: '3', i: '♻️' }, { l: 'Savings', v: '$24', i: '💰' }].map(s => (
            <div key={s.l} style={{ flex: 1, background: t.card, borderRadius: 12, padding: '9px 8px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 15 }}>{s.i}</div>
              <div style={{ color: t.text, fontSize: 17, fontWeight: 800, marginTop: 2 }}>{s.v}</div>
              <div style={{ color: t.textSub, fontSize: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {plannerData.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} style={{ flex: 1, background: activeDay === i ? t.primary : t.pill, color: activeDay === i ? '#000' : t.textSub, border: `1px solid ${activeDay === i ? t.primary : t.border}`, borderRadius: 12, padding: '7px 4px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'all 0.15s' }}>
              <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 3 }}>{d.dayLabel}</div>
              <div style={{ fontSize: 16 }}>{d.emoji}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
        {/* Day Detail */}
        <div style={{ background: t.card, borderRadius: 18, padding: 16, border: `1px solid ${t.border}`, marginBottom: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ color: t.textSub, fontSize: 12 }}>{day.label}</span>
              <h2 style={{ color: t.text, fontSize: 16, fontWeight: 800, margin: '2px 0', letterSpacing: '-0.3px' }}>{day.meal}</h2>
            </div>
            <span style={{ fontSize: 36 }}>{day.emoji}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} color={t.textSub} />
              <span style={{ color: t.textSub, fontSize: 13 }}>{day.time}</span>
            </div>
            {day.fromLeftover && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: t.primaryDim, borderRadius: 8, padding: '3px 9px', border: `1px solid ${t.primary}20` }}>
                <Link size={10} color={t.primary} />
                <span style={{ color: t.primary, fontSize: 11, fontWeight: 600 }}>from leftovers</span>
              </div>
            )}
          </div>
          {day.usesUrgent.length > 0 && (
            <div style={{ marginTop: 11 }}>
              <p style={{ color: t.textSub, fontSize: 11, fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Uses before expiry</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {day.usesUrgent.map(u => <span key={u} style={{ background: t.dangerDim, color: t.danger, fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 10, border: `1px solid ${t.danger}20` }}>🔥{u}</span>)}
              </div>
            </div>
          )}
          {day.creates.length > 0 && (
            <div style={{ marginTop: 11, borderTop: `1px solid ${t.border}`, paddingTop: 11 }}>
              <p style={{ color: t.textSub, fontSize: 11, fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Creates for next meal</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {day.creates.map(c => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 5, background: t.primaryDim, borderRadius: 10, padding: '5px 10px', border: `1px solid ${t.primary}20` }}>
                    <ArrowRight size={11} color={t.primary} />
                    <span style={{ color: t.primary, fontSize: 12, fontWeight: 600 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Leftover Chain */}
        <div style={{ background: t.card, borderRadius: 18, padding: 16, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <Link size={14} color={t.primary} />
            <span style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>Leftover Chain This Week</span>
          </div>
          {plannerData.map((d, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: activeDay === idx ? t.primary : t.surface, border: `2px solid ${activeDay === idx ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: activeDay === idx ? '#000' : t.textMuted }}>
                  {idx + 1}
                </div>
                {idx < plannerData.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 14, background: d.creates.length > 0 ? `${t.primary}50` : t.border, margin: '3px 0' }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13 }}>{d.emoji}</span>
                  <span style={{ color: activeDay === idx ? t.text : t.textSub, fontSize: 13, fontWeight: activeDay === idx ? 700 : 500 }}>{d.meal}</span>
                  <span style={{ color: t.textMuted, fontSize: 11, marginLeft: 'auto' }}>{d.dayLabel}</span>
                </div>
                {d.fromLeftover && <p style={{ color: t.primary, fontSize: 11, margin: '1px 0 0 21px' }}>↑ uses leftovers</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ SETTINGS SCREEN ============
function SettingsScreen({ t, isDark, toggleTheme }) {
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const Bell = window.lucide.Bell;
  const Scan = window.lucide.Scan;
  const User = window.lucide.User;
  const ShoppingCart = window.lucide.ShoppingCart;
  const ChevronRight = window.lucide.ChevronRight;
  const Mail = window.lucide.Mail;
  const Smartphone = window.lucide.Smartphone;
  const [nudges, setNudges] = useState(true);
  const [emailImport, setEmailImport] = useState(false);
  const [allNotifs, setAllNotifs] = useState(true);

  const sections = [
    { title: 'Household', items: [
      { icon: User, label: 'Profile', sub: '1 adult · Intermediate cook', action: 'chevron' },
      { icon: Smartphone, label: 'Cooking Tools', sub: 'Oven, Stovetop, Microwave', action: 'chevron' },
    ]},
    { title: 'Integrations', items: [
      { icon: Scan, label: 'Receipt Scanner', sub: 'Auto-import grocery receipts', action: 'chevron' },
      { icon: Mail, label: 'Grocery Email Import', sub: emailImport ? 'Connected ✓' : 'Not connected', action: 'toggle', state: emailImport, set: setEmailImport },
      { icon: ShoppingCart, label: 'Delivery App Link', sub: 'Instacart, Amazon Fresh', action: 'chevron' },
    ]},
    { title: 'Notifications', items: [
      { icon: Bell, label: 'Smart Nudges', sub: '"Use the mushrooms tonight"', action: 'toggle', state: nudges, set: setNudges },
      { icon: Bell, label: 'All Notifications', sub: allNotifs ? 'Enabled' : 'Disabled', action: 'toggle', state: allNotifs, set: setAllNotifs },
    ]},
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '6px 20px 16px' }}>
        <h1 style={{ color: t.text, fontSize: 22, fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.4px' }}>Settings</h1>
        {/* Theme Picker */}
        <div style={{ background: t.card, borderRadius: 18, padding: 15, marginBottom: 13, border: `1px solid ${t.border}` }}>
          <p style={{ color: t.textSub, fontSize: 11, fontWeight: 700, margin: '0 0 11px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Appearance</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Dark', icon: Moon, active: isDark, toggle: () => !isDark && toggleTheme() },
              { label: 'Light', icon: Sun, active: !isDark, toggle: () => isDark && toggleTheme() },
            ].map(opt => {
              const Icon = opt.icon;
              return (
                <button key={opt.label} onClick={opt.toggle} style={{ flex: 1, background: opt.active ? t.primary : t.surface, border: `2px solid ${opt.active ? t.primary : t.border}`, borderRadius: 14, padding: '12px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, fontFamily: 'inherit', transition: 'all 0.2s' }}>
                  <Icon size={22} color={opt.active ? '#000' : t.textSub} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: opt.active ? '#000' : t.textSub }}>{opt.label}</span>
                  {opt.active && <span style={{ fontSize: 10, color: '#000', fontWeight: 600, background: 'rgba(0,0,0,0.15)', borderRadius: 6, padding: '1px 7px' }}>Active</span>}
                </button>
              );
            })}
          </div>
        </div>
        {sections.map(sec => (
          <div key={sec.title} style={{ background: t.card, borderRadius: 18, marginBottom: 12, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            <p style={{ color: t.textSub, fontSize: 11, fontWeight: 700, margin: '12px 16px 8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{sec.title}</p>
            {sec.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: idx > 0 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }}>
                  <div style={{ background: t.primaryDim, borderRadius: 9, padding: 7, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <Icon size={15} color={t.primary} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: t.text, fontSize: 14, fontWeight: 500, margin: 0 }}>{item.label}</p>
                    <p style={{ color: t.textSub, fontSize: 11, margin: '1px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</p>
                  </div>
                  {item.action === 'chevron' ? (
                    <ChevronRight size={15} color={t.textMuted} />
                  ) : (
                    <div onClick={e => { e.stopPropagation(); item.set(!item.state); }} style={{ width: 44, height: 26, borderRadius: 13, background: item.state ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: 3, left: item.state ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: item.state ? '#000' : t.textSub, transition: 'left 0.2s' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <p style={{ textAlign: 'center', color: t.textMuted, fontSize: 12, marginTop: 4 }}>Pantry Pulse v1.0 · Made with 💚</p>
      </div>
    </div>
  );
}

// ============ APP ============
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(d => !d);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'pantry', label: 'Pantry', icon: window.lucide.Box },
    { id: 'recipes', label: 'Recipes', icon: window.lucide.Utensils },
    { id: 'plan', label: 'Plan', icon: window.lucide.Calendar },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    pantry: PantryScreen,
    recipes: RecipesScreen,
    plan: PlannerScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        input::placeholder { color: ${t.textMuted}; opacity: 1; }
      `}</style>
      <div style={{ width: '100%', minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        {/* Phone Frame */}
        <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 52, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 8px #1A1A1A, 0 0 0 11px #2E2E2E', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans', sans-serif", position: 'relative', transition: 'background 0.3s' }}>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 118, height: 34, background: '#000', borderRadius: 17, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 22px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1c1c1c', border: '1.5px solid #2a2a2a' }} />
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#222' }} />
          </div>
          {/* Status Bar */}
          <StatusBar t={t} />
          {/* Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginTop: 6 }}>
            <ActiveScreen t={t} isDark={isDark} toggleTheme={toggleTheme} />
          </div>
          {/* Bottom Nav */}
          <div style={{ background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', paddingBottom: 22, paddingTop: 6, transition: 'background 0.3s', flexShrink: 0 }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 2px', cursor: 'pointer' }}>
                  <div style={{ background: isActive ? t.primaryDim : 'transparent', borderRadius: 10, padding: '5px 10px', transition: 'background 0.15s' }}>
                    <Icon size={21} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />
                  </div>
                  <span style={{ color: isActive ? t.primary : t.textMuted, fontSize: 10, fontWeight: isActive ? 700 : 500, transition: 'color 0.15s' }}>
                    {tab.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
