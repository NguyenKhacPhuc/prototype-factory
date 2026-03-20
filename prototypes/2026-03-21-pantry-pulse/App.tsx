const { useState, useEffect } = React;

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // ── App-level state ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]           = useState('home');
  const [pressedId, setPressedId]           = useState(null);
  const [pantryFilter, setPantryFilter]     = useState('all');
  const [pantrySearch, setPantrySearch]     = useState('');
  const [recipeFilter, setRecipeFilter]     = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDay, setSelectedDay]       = useState(0);
  const [dismissedAlert, setDismissedAlert] = useState(false);

  // ── Icons ────────────────────────────────────────────────────────────────────
  const lc = window.lucide || {};
  const HomeIcon      = lc.Home;
  const Archive       = lc.Archive;
  const ChefHat       = lc.ChefHat;
  const CalendarIcon  = lc.Calendar;
  const Bell          = lc.Bell;
  const Search        = lc.Search;
  const Clock         = lc.Clock;
  const Flame         = lc.Flame;
  const Plus          = lc.Plus;
  const Scan          = lc.Scan;
  const ChevronRight  = lc.ChevronRight;
  const ChevronLeft   = lc.ChevronLeft;
  const X             = lc.X;
  const Check         = lc.Check;
  const ShoppingCart  = lc.ShoppingCart;
  const Users         = lc.Users;
  const Sparkles      = lc.Sparkles;
  const TrendingDown  = lc.TrendingDown;
  const Edit3         = lc.Edit3;
  const Zap           = lc.Zap;
  const Wifi          = lc.Wifi;
  const Battery       = lc.Battery;
  const Leaf          = lc.Leaf;
  const AlertTriangle = lc.AlertTriangle;

  // ── Design tokens ────────────────────────────────────────────────────────────
  const c = {
    bg:          '#090E09',
    surface:     '#111811',
    card:        '#182018',
    cardHover:   '#1E281E',
    border:      'rgba(72,196,110,0.13)',
    primary:     '#48C46E',
    primaryDim:  'rgba(72,196,110,0.15)',
    urgent:      '#F05843',
    urgentDim:   'rgba(240,88,67,0.15)',
    warning:     '#F0A030',
    warningDim:  'rgba(240,160,48,0.15)',
    safe:        '#48C46E',
    safeDim:     'rgba(72,196,110,0.15)',
    text:        '#E6F2E6',
    sub:         '#7DA07D',
    muted:       'rgba(125,160,125,0.45)',
  };
  const font = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  // ── Data ─────────────────────────────────────────────────────────────────────
  const urgentItems = [
    { id: 1, name: 'Baby Spinach', amount: '5 oz',    daysLeft: 0, emoji: '🌿' },
    { id: 2, name: 'Ricotta',      amount: '1 cup',   daysLeft: 1, emoji: '🧀' },
    { id: 3, name: 'Mushrooms',    amount: '8 oz',    daysLeft: 1, emoji: '🍄' },
    { id: 4, name: 'Cilantro',     amount: '½ bunch', daysLeft: 2, emoji: '🌱' },
  ];

  const pantryItems = [
    { id:  1, name: 'Baby Spinach',    amount: '5 oz',       daysLeft: 0,   loc: 'fridge',  emoji: '🌿', cat: 'Veg' },
    { id:  2, name: 'Ricotta Cheese',  amount: '1 cup',      daysLeft: 1,   loc: 'fridge',  emoji: '🧀', cat: 'Dairy' },
    { id:  3, name: 'Mushrooms',       amount: '8 oz',       daysLeft: 1,   loc: 'fridge',  emoji: '🍄', cat: 'Veg' },
    { id:  4, name: 'Cilantro',        amount: '½ bunch',    daysLeft: 2,   loc: 'fridge',  emoji: '🌱', cat: 'Herbs' },
    { id:  5, name: 'Roast Chicken',   amount: '~1 lb',      daysLeft: 3,   loc: 'fridge',  emoji: '🍗', cat: 'Protein' },
    { id:  6, name: 'Blueberries',     amount: '1 pint',     daysLeft: 3,   loc: 'fridge',  emoji: '🫐', cat: 'Fruit' },
    { id:  7, name: 'Heavy Cream',     amount: '¼ cup',      daysLeft: 4,   loc: 'fridge',  emoji: '🥛', cat: 'Dairy' },
    { id:  8, name: 'Greek Yogurt',    amount: '2 cups',     daysLeft: 5,   loc: 'fridge',  emoji: '🫙', cat: 'Dairy' },
    { id:  9, name: 'Penne Pasta',     amount: '12 oz',      daysLeft: 180, loc: 'pantry',  emoji: '🍝', cat: 'Grains' },
    { id: 10, name: 'Canned Tomatoes', amount: '2 cans',     daysLeft: 365, loc: 'pantry',  emoji: '🥫', cat: 'Pantry' },
    { id: 11, name: 'Olive Oil',       amount: 'Partial',    daysLeft: 200, loc: 'pantry',  emoji: '🫒', cat: 'Pantry' },
    { id: 12, name: 'Chicken Broth',   amount: '2 cups',     daysLeft: 150, loc: 'pantry',  emoji: '🍲', cat: 'Pantry' },
    { id: 13, name: 'Frozen Peas',     amount: '1 bag',      daysLeft: 60,  loc: 'freezer', emoji: '💚', cat: 'Veg' },
    { id: 14, name: 'Ground Beef',     amount: '1 lb',       daysLeft: 90,  loc: 'freezer', emoji: '🥩', cat: 'Protein' },
  ];

  const recipes = [
    {
      id: 1, emoji: '🍄', urgency: 'urgent', urgencyLabel: 'Use tonight',
      name: 'Spinach & Ricotta Stuffed Mushrooms',
      desc: 'Savory mushrooms filled with creamy ricotta and wilted spinach. Three expiring items in one elegant dish.',
      time: 25, diff: 'Easy', servings: 2,
      expiringIngredients: ['Spinach', 'Ricotta', 'Mushrooms'],
      ingredients: ['Baby Spinach (all 5oz)', 'Ricotta (1 cup)', 'Mushrooms (8oz)', 'Garlic (3 cloves)', 'Parmesan (¼ cup)', 'Olive Oil', 'Salt & pepper'],
    },
    {
      id: 2, emoji: '🌮', urgency: 'warning', urgencyLabel: 'Use by Mon',
      name: 'Leftover Chicken Cilantro Tacos',
      desc: 'Transform leftover roast chicken into fast weeknight tacos with zingy fresh cilantro and lime.',
      time: 15, diff: 'Easy', servings: 3,
      expiringIngredients: ['Roast Chicken', 'Cilantro'],
      ingredients: ['Roast Chicken (shredded)', 'Cilantro (½ bunch)', 'Corn tortillas (6)', 'Lime (1)', 'Avocado (1)', 'Hot sauce', 'Red onion'],
    },
    {
      id: 3, emoji: '🍲', urgency: 'warning', urgencyLabel: 'Use by Tue',
      name: 'Creamy Chicken & Herb Soup',
      desc: 'Rich, hearty soup using leftover chicken and heavy cream. Batch cook for two lunches.',
      time: 40, diff: 'Medium', servings: 4,
      expiringIngredients: ['Roast Chicken', 'Heavy Cream'],
      ingredients: ['Roast Chicken (1 lb)', 'Heavy Cream (¼ cup)', 'Chicken Broth (2 cups)', 'Carrots', 'Celery', 'Thyme', 'Bay leaf'],
    },
    {
      id: 4, emoji: '🫐', urgency: 'safe', urgencyLabel: 'Use by Wed',
      name: 'Blueberry Greek Yogurt Parfait',
      desc: 'Quick, protein-rich breakfast with fresh blueberries before they turn. Ready in 5 minutes.',
      time: 5, diff: 'Easy', servings: 2,
      expiringIngredients: ['Blueberries', 'Greek Yogurt'],
      ingredients: ['Greek Yogurt (1 cup each)', 'Blueberries (1 pint)', 'Honey (1 tbsp)', 'Granola (½ cup)', 'Mint leaves'],
    },
  ];

  const weekPlan = [
    { label: 'Sat', date: '21', meals: {
        dinner: { name: 'Stuffed Mushrooms', emoji: '🍄', time: '25 min', tags: ['Spinach','Ricotta','Mushrooms'] },
    }},
    { label: 'Sun', date: '22', meals: {
        lunch:  { name: 'Chicken Cilantro Tacos', emoji: '🌮', time: '15 min', tags: ['Chicken','Cilantro'] },
        dinner: { name: 'Creamy Chicken Soup', emoji: '🍲', time: '40 min', tags: ['Chicken','Cream'] },
    }},
    { label: 'Mon', date: '23', meals: {
        breakfast: { name: 'Blueberry Yogurt Parfait', emoji: '🫐', time: '5 min', tags: ['Blueberries','Yogurt'] },
        lunch:     { name: 'Soup leftovers', emoji: '🥣', time: '5 min', tags: [] },
    }},
    { label: 'Tue', date: '24', meals: {
        dinner: { name: 'Penne Arrabbiata', emoji: '🍝', time: '30 min', tags: ['Pasta','Tomatoes'] },
    }},
    { label: 'Wed', date: '25', meals: {} },
    { label: 'Thu', date: '26', meals: {} },
    { label: 'Fri', date: '27', meals: {} },
  ];

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const urgencyColor = (d) => d <= 0 ? c.urgent : d <= 2 ? c.warning : c.safe;
  const urgencyDim   = (d) => d <= 0 ? c.urgentDim : d <= 2 ? c.warningDim : c.safeDim;
  const urgencyLabel = (d) => d <= 0 ? 'Today' : d === 1 ? 'Tomorrow' : `${d}d left`;
  const freshnessW   = (d) => `${Math.max(4, Math.min(100, (Math.min(d, 7) / 7) * 100))}%`;

  const press = (id, fn) => {
    setPressedId(id);
    setTimeout(() => { setPressedId(null); if (fn) fn(); }, 140);
  };

  // ── Status bar ───────────────────────────────────────────────────────────────
  const renderStatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', ...font }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {Wifi    && <Wifi    size={13} color={c.text} />}
        {Battery && <Battery size={13} color={c.text} />}
      </div>
    </div>
  );

  // ── Home screen ──────────────────────────────────────────────────────────────
  const renderHome = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 88 }}>

      {/* Header */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 12, color: c.sub, margin: 0, ...font }}>Saturday, March 21</p>
            <h1 style={{ fontSize: 23, fontWeight: 800, color: c.text, margin: '3px 0 0', ...font }}>Good evening, Sarah 👋</h1>
          </div>
          <div style={{ background: c.card, borderRadius: 12, padding: '7px 11px', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
            {Bell && <Bell size={15} color={c.primary} />}
            <div style={{ width: 6, height: 6, background: c.urgent, borderRadius: '50%' }} />
          </div>
        </div>

        {/* Waste stat card */}
        <div style={{ marginTop: 14, background: 'linear-gradient(135deg,#1A3420,#1E3A18)', borderRadius: 16, padding: 16, border: `1px solid rgba(72,196,110,0.22)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, color: c.sub, margin: 0, ...font }}>This week's food waste</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                {TrendingDown && <TrendingDown size={17} color={c.primary} />}
                <span style={{ fontSize: 28, fontWeight: 800, color: c.primary, ...font }}>73%</span>
                <span style={{ fontSize: 13, color: c.sub, ...font }}>less waste</span>
              </div>
              <p style={{ fontSize: 12, color: c.sub, margin: '3px 0 0', ...font }}>vs. your average · Saved ~$24 this week</p>
            </div>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(72,196,110,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(72,196,110,0.28)', fontSize: 26 }}>
              🌿
            </div>
          </div>
        </div>
      </div>

      {/* Use these today */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {Flame && <Flame size={15} color={c.urgent} />}
            <span style={{ fontSize: 15, fontWeight: 700, color: c.text, ...font }}>Use These Today</span>
          </div>
          <span style={{ fontSize: 12, color: c.primary, cursor: 'pointer', ...font }} onClick={() => setActiveTab('pantry')}>View all</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {urgentItems.map(item => (
            <div key={item.id} style={{ minWidth: 84, background: c.card, borderRadius: 14, padding: '11px 8px', border: `1px solid ${c.border}`, textAlign: 'center', flexShrink: 0, borderTop: `2.5px solid ${urgencyColor(item.daysLeft)}` }}>
              <div style={{ fontSize: 26 }}>{item.emoji}</div>
              <p style={{ fontSize: 11, fontWeight: 600, color: c.text, margin: '6px 0 4px', lineHeight: 1.2, ...font }}>{item.name}</p>
              <span style={{ fontSize: 10, fontWeight: 700, color: urgencyColor(item.daysLeft), background: urgencyDim(item.daysLeft), padding: '2px 6px', borderRadius: 20, ...font }}>
                {urgencyLabel(item.daysLeft)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tonight's Pick */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
          {Sparkles && <Sparkles size={15} color={c.primary} />}
          <span style={{ fontSize: 15, fontWeight: 700, color: c.text, ...font }}>Tonight's Pick</span>
        </div>
        <div style={{ background: c.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${c.border}` }}>
          <div style={{ height: 116, background: 'linear-gradient(135deg,#263820,#1A2C14)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ fontSize: 60 }}>🍄</span>
            <div style={{ position: 'absolute', top: 10, right: 10, background: c.urgent, borderRadius: 8, padding: '4px 9px' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', ...font }}>USE TONIGHT</span>
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text, margin: '0 0 5px', ...font }}>Spinach & Ricotta Stuffed Mushrooms</h3>
            <p style={{ fontSize: 13, color: c.sub, margin: '0 0 12px', lineHeight: 1.5, ...font }}>Uses your spinach, ricotta, and mushrooms — all expiring today or tomorrow.</p>
            <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
              {[[Clock,'25 min'],[Users,'2 servings'],[Zap,'Easy']].map(([Icon,label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {Icon && <Icon size={12} color={c.sub} />}
                  <span style={{ fontSize: 12, color: c.sub, ...font }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => { press('cook', null); setActiveTab('recipes'); setSelectedRecipe(1); }}
                style={{ flex: 1, background: pressedId === 'cook' ? '#3BAF62' : c.primary, border: 'none', borderRadius: 12, padding: '11px 0', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#081408', transform: pressedId === 'cook' ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.12s ease', ...font }}
              >
                Start Cooking
              </button>
              <button style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '11px 13px', cursor: 'pointer' }}>
                {ChevronRight && <ChevronRight size={17} color={c.sub} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive reminder */}
      {!dismissedAlert && (
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ background: c.warningDim, borderRadius: 14, padding: 14, border: `1px solid rgba(240,160,48,0.28)`, display: 'flex', alignItems: 'center', gap: 12 }}>
            {Bell && <Bell size={17} color={c.warning} />}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: c.warning, margin: '0 0 2px', ...font }}>Freeze the blueberries now</p>
              <p style={{ fontSize: 12, color: c.sub, margin: 0, ...font }}>1 pint · expires in 3 days · save for smoothies</p>
            </div>
            <div onClick={() => setDismissedAlert(true)} style={{ cursor: 'pointer' }}>
              {X && <X size={15} color={c.sub} />}
            </div>
          </div>
        </div>
      )}

      {/* This week preview */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {CalendarIcon && <CalendarIcon size={15} color={c.sub} />}
            <span style={{ fontSize: 15, fontWeight: 700, color: c.text, ...font }}>This Week</span>
          </div>
          <span style={{ fontSize: 12, color: c.primary, cursor: 'pointer', ...font }} onClick={() => setActiveTab('plan')}>Full plan</span>
        </div>
        {[
          { day: 'Today', meal: 'Stuffed Mushrooms' },
          { day: 'Mon',   meal: 'Chicken Tacos · Chicken Soup' },
          { day: 'Tue',   meal: 'Yogurt Parfait · Soup leftovers' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${c.border}` : 'none' }}>
            <div style={{ width: 38, fontSize: 11, fontWeight: 700, color: i === 0 ? c.primary : c.sub, ...font }}>{row.day}</div>
            <span style={{ fontSize: 13, color: c.text, flex: 1, ...font }}>{row.meal}</span>
            {ChevronRight && <ChevronRight size={13} color={c.muted} />}
          </div>
        ))}
      </div>
    </div>
  );

  // ── Pantry screen ────────────────────────────────────────────────────────────
  const renderPantry = () => {
    const filtered = pantryItems
      .filter(item => (pantryFilter === 'all' || item.loc === pantryFilter))
      .filter(item => !pantrySearch || item.name.toLowerCase().includes(pantrySearch.toLowerCase()))
      .sort((a, b) => a.daysLeft - b.daysLeft);

    const counts = { expiring: pantryItems.filter(i => i.daysLeft <= 1).length, week: pantryItems.filter(i => i.daysLeft > 1 && i.daysLeft <= 7).length, stocked: pantryItems.length };

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 88 }}>
        <div style={{ padding: '18px 20px 0' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: c.text, margin: 0, ...font }}>Pantry</h1>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: '7px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                {Scan && <Scan size={15} color={c.primary} />}
                <span style={{ fontSize: 12, fontWeight: 600, color: c.primary, ...font }}>Scan</span>
              </button>
              <button style={{ background: c.primary, border: 'none', borderRadius: 10, padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {Plus && <Plus size={16} color="#081408" />}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[
              { label: 'Expiring',   value: counts.expiring, color: c.urgent  },
              { label: 'This week',  value: counts.week,     color: c.warning },
              { label: 'Total items',value: counts.stocked,  color: c.primary },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: c.card, borderRadius: 12, padding: '10px 8px', border: `1px solid ${c.border}`, textAlign: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: s.color, display: 'block', ...font }}>{s.value}</span>
                <span style={{ fontSize: 11, color: c.sub, ...font }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div style={{ background: c.card, borderRadius: 12, padding: '10px 14px', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            {Search && <Search size={15} color={c.sub} />}
            <input
              value={pantrySearch}
              onChange={e => setPantrySearch(e.target.value)}
              placeholder="Search ingredients..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 14, color: c.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 4, overflowX: 'auto', paddingBottom: 2 }}>
            {[['all','All'],['fridge','Fridge'],['pantry','Pantry'],['freezer','Freezer']].map(([id,label]) => (
              <button key={id} onClick={() => setPantryFilter(id)} style={{ background: pantryFilter === id ? c.primary : c.card, border: `1px solid ${pantryFilter === id ? c.primary : c.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: pantryFilter === id ? '#081408' : c.sub, whiteSpace: 'nowrap', ...font }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Item list */}
        <div style={{ padding: '12px 20px 0' }}>
          {filtered.map(item => {
            const col = urgencyColor(item.daysLeft);
            return (
              <div key={item.id} style={{ background: c.card, borderRadius: 14, padding: '11px 14px', marginBottom: 8, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 12, borderLeft: `3px solid ${col}` }}>
                <span style={{ fontSize: 26, lineHeight: 1 }}>{item.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: c.text, ...font }}>{item.name}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: col, background: urgencyDim(item.daysLeft), padding: '2px 8px', borderRadius: 20, flexShrink: 0, ...font }}>
                      {urgencyLabel(item.daysLeft)}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: c.sub, margin: '0 0 7px', ...font }}>{item.amount} · {item.loc}</p>
                  <div style={{ height: 3, background: urgencyDim(item.daysLeft), borderRadius: 4 }}>
                    <div style={{ height: '100%', borderRadius: 4, width: freshnessW(item.daysLeft), background: col }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Recipe detail ─────────────────────────────────────────────────────────────
  const renderRecipeDetail = (recipe) => {
    if (!recipe) return null;
    const col = recipe.urgency === 'urgent' ? c.urgent : recipe.urgency === 'warning' ? c.warning : c.safe;
    const dim = recipe.urgency === 'urgent' ? c.urgentDim : recipe.urgency === 'warning' ? c.warningDim : c.safeDim;
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 88 }}>
        <div style={{ height: 170, background: 'linear-gradient(135deg,#263820,#182C12)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontSize: 72 }}>{recipe.emoji}</span>
          <button onClick={() => setSelectedRecipe(null)} style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: 10, padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {ChevronLeft && <ChevronLeft size={19} color="#fff" />}
          </button>
        </div>
        <div style={{ padding: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: col, background: dim, padding: '3px 10px', borderRadius: 8, ...font }}>
            {recipe.urgencyLabel.toUpperCase()}
          </span>
          <h2 style={{ fontSize: 21, fontWeight: 800, color: c.text, margin: '10px 0 8px', ...font }}>{recipe.name}</h2>
          <p style={{ fontSize: 13, color: c.sub, margin: '0 0 16px', lineHeight: 1.6, ...font }}>{recipe.desc}</p>
          <div style={{ display: 'flex', gap: 18, marginBottom: 20 }}>
            {[[Clock,`${recipe.time} min`],[Users,`${recipe.servings} servings`],[Zap,recipe.diff]].map(([Icon,label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {Icon && <Icon size={14} color={c.primary} />}
                <span style={{ fontSize: 13, color: c.text, fontWeight: 500, ...font }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: '0 0 10px', ...font }}>Ingredients</h4>
            {recipe.ingredients.map((ing, i) => {
              const isExpiring = recipe.expiringIngredients.some(e => ing.includes(e));
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < recipe.ingredients.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.card, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {Check && <Check size={11} color={c.primary} />}
                  </div>
                  <span style={{ fontSize: 13, color: c.text, flex: 1, ...font }}>{ing}</span>
                  {isExpiring && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: c.urgent, background: c.urgentDim, padding: '2px 7px', borderRadius: 20, ...font }}>EXPIRING</span>
                  )}
                </div>
              );
            })}
          </div>
          <button style={{ width: '100%', background: c.primary, border: 'none', borderRadius: 14, padding: 15, cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#081408', ...font }}>
            Start Cooking
          </button>
        </div>
      </div>
    );
  };

  // ── Recipes list ──────────────────────────────────────────────────────────────
  const renderRecipes = () => {
    if (selectedRecipe) return renderRecipeDetail(recipes.find(r => r.id === selectedRecipe));

    const filtered = recipes.filter(r => {
      if (recipeFilter === 'urgent') return r.urgency === 'urgent';
      if (recipeFilter === 'easy')   return r.diff === 'Easy';
      if (recipeFilter === 'quick')  return r.time <= 20;
      return true;
    });

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 88 }}>
        <div style={{ padding: '18px 20px 0' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: c.text, margin: '0 0 3px', ...font }}>Recipes</h1>
          <p style={{ fontSize: 13, color: c.sub, margin: '0 0 14px', ...font }}>Ranked by freshness urgency — not popularity</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4, overflowX: 'auto', paddingBottom: 2 }}>
            {[['all','All'],['urgent','🔥 Urgent'],['easy','Easy'],['quick','⚡ Quick']].map(([id, label]) => (
              <button key={id} onClick={() => setRecipeFilter(id)} style={{ background: recipeFilter === id ? c.primary : c.card, border: `1px solid ${recipeFilter === id ? c.primary : c.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: recipeFilter === id ? '#081408' : c.sub, whiteSpace: 'nowrap', ...font }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 20px 0' }}>
          {filtered.map(recipe => {
            const col = recipe.urgency === 'urgent' ? c.urgent : recipe.urgency === 'warning' ? c.warning : c.safe;
            const dim = recipe.urgency === 'urgent' ? c.urgentDim : recipe.urgency === 'warning' ? c.warningDim : c.safeDim;
            return (
              <div key={recipe.id} onClick={() => setSelectedRecipe(recipe.id)} style={{ background: c.card, borderRadius: 18, marginBottom: 14, border: `1px solid ${c.border}`, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 96, background: 'linear-gradient(135deg,#263820,#1A2C14)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16 }}>
                  <span style={{ fontSize: 46 }}>{recipe.emoji}</span>
                  <div>
                    <div style={{ background: col, borderRadius: 6, padding: '3px 8px', display: 'inline-block', marginBottom: 5 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', ...font }}>{recipe.urgencyLabel.toUpperCase()}</span>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: 0, lineHeight: 1.3, ...font }}>{recipe.name}</h3>
                  </div>
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 10 }}>
                    {[[Clock,`${recipe.time}m`],[Users,`${recipe.servings}`],[Zap,recipe.diff]].map(([Icon,label]) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {Icon && <Icon size={12} color={c.sub} />}
                        <span style={{ fontSize: 11, color: c.sub, ...font }}>{label}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {recipe.expiringIngredients.map(ing => (
                      <span key={ing} style={{ fontSize: 11, fontWeight: 600, color: col, background: dim, padding: '3px 8px', borderRadius: 20, ...font }}>{ing}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Plan screen ───────────────────────────────────────────────────────────────
  const renderPlan = () => {
    const day = weekPlan[selectedDay];
    const slots = ['breakfast', 'lunch', 'dinner'];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 88 }}>
        <div style={{ padding: '18px 20px 0' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: c.text, margin: '0 0 3px', ...font }}>Meal Plan</h1>
          <p style={{ fontSize: 13, color: c.sub, margin: '0 0 14px', ...font }}>Week of March 21</p>

          {/* Day selector */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 6 }}>
            {weekPlan.map((d, i) => {
              const hasMeals = Object.keys(d.meals).length > 0;
              const isActive = selectedDay === i;
              return (
                <button key={i} onClick={() => setSelectedDay(i)} style={{ minWidth: 46, background: isActive ? c.primary : c.card, border: `1px solid ${isActive ? c.primary : c.border}`, borderRadius: 14, padding: '8px 4px', cursor: 'pointer', textAlign: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: isActive ? '#081408' : c.sub, display: 'block', ...font }}>{d.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: isActive ? '#081408' : c.text, display: 'block', ...font }}>{d.date}</span>
                  {hasMeals && <div style={{ width: 5, height: 5, borderRadius: '50%', background: isActive ? '#081408' : c.primary, margin: '3px auto 0' }} />}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          {slots.map(slot => {
            const meal = day.meals[slot];
            return (
              <div key={slot} style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.sub, textTransform: 'uppercase', letterSpacing: 1.2, ...font }}>{slot}</span>
                {meal ? (
                  <div style={{ marginTop: 8, background: c.card, borderRadius: 14, padding: 14, border: `1px solid ${c.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 32 }}>{meal.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: c.text, margin: '0 0 4px', ...font }}>{meal.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: meal.tags.length ? 6 : 0 }}>
                          {Clock && <Clock size={11} color={c.sub} />}
                          <span style={{ fontSize: 11, color: c.sub, ...font }}>{meal.time}</span>
                        </div>
                        {meal.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                            {meal.tags.map(t => (
                              <span key={t} style={{ fontSize: 10, color: c.primary, background: c.primaryDim, padding: '2px 7px', borderRadius: 10, ...font }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      {Edit3 && <Edit3 size={14} color={c.sub} style={{ flexShrink: 0 }} />}
                    </div>
                  </div>
                ) : (
                  <button style={{ marginTop: 8, width: '100%', background: c.surface, border: `1.5px dashed ${c.border}`, borderRadius: 14, padding: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {Plus && <Plus size={15} color={c.sub} />}
                    <span style={{ fontSize: 13, color: c.sub, ...font }}>Add {slot}</span>
                  </button>
                )}
              </div>
            );
          })}

          {/* Shopping nudge */}
          <div style={{ background: c.primaryDim, borderRadius: 14, padding: 14, border: `1px solid rgba(72,196,110,0.22)`, display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
            {ShoppingCart && <ShoppingCart size={17} color={c.primary} />}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: c.text, margin: '0 0 2px', ...font }}>Shopping list: 3 items</p>
              <p style={{ fontSize: 12, color: c.sub, margin: 0, ...font }}>Tortillas · Lime · Granola</p>
            </div>
            {ChevronRight && <ChevronRight size={15} color={c.sub} />}
          </div>
        </div>
      </div>
    );
  };

  // ── Bottom nav ────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',    Icon: HomeIcon,    label: 'Today' },
    { id: 'pantry',  Icon: Archive,     label: 'Pantry' },
    { id: 'recipes', Icon: ChefHat,     label: 'Recipes' },
    { id: 'plan',    Icon: CalendarIcon,label: 'Plan' },
  ];

  // ── Root render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#030803', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: c.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 0 0 10px #191919, 0 0 0 12px #282828, 0 32px 90px rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 122, height: 36, background: '#000', borderRadius: 22, zIndex: 100 }} />

        {/* Status bar */}
        {renderStatusBar()}
        <div style={{ height: 30 }} />

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home'    && renderHome()}
          {activeTab === 'pantry'  && renderPantry()}
          {activeTab === 'recipes' && renderRecipes()}
          {activeTab === 'plan'    && renderPlan()}
        </div>

        {/* Bottom nav */}
        <div style={{ height: 80, background: c.surface, borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', paddingBottom: 10 }}>
          {tabs.map(({ id, Icon, label }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTab(id); if (id !== 'recipes') setSelectedRecipe(null); }}
                style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0' }}
              >
                <div style={{ width: 42, height: 28, borderRadius: 14, background: active ? c.primaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease' }}>
                  {Icon && <Icon size={20} color={active ? c.primary : c.muted} strokeWidth={active ? 2.5 : 1.8} />}
                </div>
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? c.primary : c.muted, ...font }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
