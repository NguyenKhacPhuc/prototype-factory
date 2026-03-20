
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [scanMode, setScanMode] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [offerModal, setOfferModal] = useState(null);
  const [recipeModal, setRecipeModal] = useState(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(fontLink);
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const colors = {
    bg: '#0D1A10',
    card: '#162119',
    cardAlt: '#1C2B21',
    primary: '#3EC76D',
    primaryDim: '#2A8A4A',
    orange: '#F4845F',
    yellow: '#F5C842',
    red: '#E05252',
    purple: '#9B7FD4',
    text: '#EEF4F0',
    textMuted: '#7A9B85',
    textDim: '#4A6B55',
    border: '#243328',
    navBg: '#111D14',
  };

  const pantryItems = [
    { id: 1, name: 'Baby Spinach', category: 'Veggies', qty: '140g', daysLeft: 0, urgent: true, color: colors.red, emoji: '🌿', bought: 'Mar 17' },
    { id: 2, name: 'Greek Yogurt', category: 'Dairy', qty: '2 cups', daysLeft: 1, urgent: true, color: colors.orange, emoji: '🥛', bought: 'Mar 18' },
    { id: 3, name: 'Flour Tortillas', category: 'Bread', qty: '4 left', daysLeft: 1, urgent: true, color: colors.orange, emoji: '🫓', bought: 'Mar 17' },
    { id: 4, name: 'Cherry Tomatoes', category: 'Veggies', qty: '1 punnet', daysLeft: 2, urgent: false, color: colors.yellow, emoji: '🍅', bought: 'Mar 19' },
    { id: 5, name: 'Rotisserie Chicken', category: 'Protein', qty: '~300g', daysLeft: 2, urgent: false, color: colors.yellow, emoji: '🍗', bought: 'Mar 19' },
    { id: 6, name: 'Cheddar Block', category: 'Dairy', qty: '200g', daysLeft: 5, urgent: false, color: colors.primary, emoji: '🧀', bought: 'Mar 16' },
    { id: 7, name: 'Brown Eggs', category: 'Protein', qty: '6 eggs', daysLeft: 8, urgent: false, color: colors.primary, emoji: '🥚', bought: 'Mar 15' },
    { id: 8, name: 'Basmati Rice', category: 'Pantry', qty: '800g', daysLeft: 120, urgent: false, color: colors.textDim, emoji: '🍚', bought: 'Feb 10' },
  ];

  const recipes = [
    {
      id: 1, name: 'Spinach Quesadillas', time: '12 min', difficulty: 'Easy',
      uses: ['Baby Spinach', 'Flour Tortillas', 'Cheddar Block'],
      urgency: 'USE TONIGHT', urgencyColor: colors.red,
      calories: 420, servings: 2,
      steps: ['Heat a pan on medium. Lay tortilla flat.', 'Add a handful of spinach and grated cheddar to one half.', 'Fold over and press gently. Cook 2–3 min each side.', 'Slice and serve with yogurt dip.'],
      tip: 'This uses 3 items expiring today or tomorrow.',
      emoji: '🫓'
    },
    {
      id: 2, name: 'Spinach & Egg Scramble', time: '8 min', difficulty: 'Easy',
      uses: ['Baby Spinach', 'Brown Eggs', 'Cherry Tomatoes'],
      urgency: 'RESCUE NOW', urgencyColor: colors.red,
      calories: 310, servings: 1,
      steps: ['Crack 2 eggs into a bowl, whisk lightly.', 'Wilt spinach in a pan with a splash of olive oil.', 'Pour in eggs. Add halved cherry tomatoes.', 'Scramble gently until just set. Season and serve.'],
      tip: 'Uses all of the spinach – zero waste.',
      emoji: '🥚'
    },
    {
      id: 3, name: 'Chicken Tortilla Wraps', time: '10 min', difficulty: 'Easy',
      uses: ['Rotisserie Chicken', 'Flour Tortillas', 'Cherry Tomatoes', 'Greek Yogurt'],
      urgency: 'USE TOMORROW', urgencyColor: colors.orange,
      calories: 510, servings: 2,
      steps: ['Shred chicken into bite-sized pieces.', 'Layer chicken, tomatoes on tortillas.', 'Spoon yogurt as a creamy sauce.', 'Roll tightly and slice in half.'],
      tip: 'Clears 4 items at once — your best rescue meal.',
      emoji: '🍗'
    },
    {
      id: 4, name: 'Yogurt Smoothie Packs', time: '5 min', difficulty: 'Easy',
      uses: ['Greek Yogurt', 'Baby Spinach'],
      urgency: 'FREEZE OPTION', urgencyColor: colors.purple,
      calories: 180, servings: 3,
      steps: ['Divide yogurt into zip-lock bags or containers.', 'Add a handful of spinach to each.', 'Seal and freeze immediately.', 'Blend frozen pack with banana and milk when ready.'],
      tip: 'Freeze tonight to save both items for up to 2 months.',
      emoji: '🥤'
    },
  ];

  const shareItems = [
    { id: 1, from: 'You', item: 'Leftover Pasta Bake', qty: '2 portions', time: '20 min ago', status: 'available', emoji: '🍝', claimed: false },
    { id: 2, from: 'Mia (Apt 3B)', item: 'Sourdough Loaf', qty: 'Half loaf', time: '1h ago', status: 'available', emoji: '🍞', claimed: false },
    { id: 3, from: 'Office Kitchen', item: 'Catering Sandwiches', qty: '8 pcs', time: '2h ago', status: 'claimed', emoji: '🥪', claimed: true },
    { id: 4, from: 'Tom (Flatmate)', item: 'Banana Bunch', qty: '5 bananas', time: '3h ago', status: 'available', emoji: '🍌', claimed: false },
  ];

  const impactStats = {
    thisWeek: { money: 18.40, meals: 7, co2: 3.2 },
    thisMonth: { money: 71.20, meals: 28, co2: 12.6 },
    allTime: { money: 312.80, meals: 118, co2: 54.1 },
    streak: 14,
    rank: 'Food Guardian',
    nextRank: 'Zero Waste Hero',
    progress: 68,
  };

  const urgentCount = pantryItems.filter(i => i.daysLeft <= 1).length;

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const btnScale = (id) => pressedBtn === id ? 'scale(0.95)' : 'scale(1)';

  // ─── Status Bar ───────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', height: 44 }}>
      <span style={{ color: colors.text, fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>{time || '09:41'}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11S8.83 12.5 8 12.5 6.5 11.83 6.5 11 7.17 9.5 8 9.5Z" fill={colors.text}/>
          <path d="M8 6C9.85 6 11.53 6.75 12.76 7.97L14 6.73C12.42 5.15 10.32 4.2 8 4.2C5.68 4.2 3.58 5.15 2 6.73L3.24 7.97C4.47 6.75 6.15 6 8 6Z" fill={colors.text} opacity="0.7"/>
          <path d="M8 2.5C11.07 2.5 13.84 3.74 15.86 5.75L17 4.61C14.68 2.3 11.5 0.9 8 0.9C4.5 0.9 1.32 2.3-1 4.61L0.14 5.75C2.16 3.74 4.93 2.5 8 2.5Z" fill={colors.text} opacity="0.4"/>
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={colors.text} strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill={colors.text}/>
          <path d="M23 4v4c1.1-.55 1.1-3.45 0-4Z" fill={colors.text} opacity="0.4"/>
        </svg>
      </div>
    </div>
  );

  // ─── Dynamic Island ────────────────────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 2 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
    </div>
  );

  // ─── HOME SCREEN ──────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const [checkedItems, setCheckedItems] = useState([]);
    const toggleCheck = (id) => {
      setCheckedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        {/* Header */}
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: colors.textMuted, fontSize: 13, margin: 0, fontWeight: 500 }}>Saturday evening</p>
              <h1 style={{ color: colors.text, fontSize: 22, fontWeight: 800, margin: '2px 0 0', letterSpacing: -0.5 }}>Rescue Queue</h1>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 42, height: 42, borderRadius: 21, background: colors.cardAlt, border: `1.5px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 20 }}>🔔</span>
              </div>
              {urgentCount > 0 && (
                <div style={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: 9, background: colors.red, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${colors.bg}` }}>
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{urgentCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Urgent Banner */}
        <div style={{ margin: '14px 20px 0', background: `linear-gradient(135deg, #3D1A1A 0%, #2A1A0D 100%)`, border: `1px solid ${colors.red}40`, borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: colors.red, fontSize: 12, fontWeight: 700, margin: 0, letterSpacing: 0.8, textTransform: 'uppercase' }}>Action Required</p>
              <p style={{ color: colors.text, fontSize: 14, fontWeight: 600, margin: '2px 0 0' }}>3 items expire today or tomorrow</p>
            </div>
            <div onClick={() => setActiveTab('recipes')} style={{ background: colors.red, borderRadius: 10, padding: '6px 12px', cursor: 'pointer', transform: btnScale('rescue'), transition: 'transform 0.15s' }} onMouseDown={() => handlePress('rescue')}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Rescue</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: 10, margin: '14px 20px 0' }}>
          {[
            { label: 'Tracked', value: pantryItems.length, icon: '📦', color: colors.primary },
            { label: 'Urgent', value: urgentCount, icon: '🔥', color: colors.red },
            { label: 'Saved $', value: '18.40', icon: '💰', color: colors.yellow },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: colors.card, borderRadius: 14, padding: '12px 10px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <p style={{ color: s.color, fontSize: 18, fontWeight: 800, margin: '4px 0 0' }}>{s.value}</p>
              <p style={{ color: colors.textMuted, fontSize: 11, margin: '1px 0 0', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tonight's Checklist */}
        <div style={{ margin: '18px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h2 style={{ color: colors.text, fontSize: 16, fontWeight: 700, margin: 0 }}>Tonight's Consume-First List</h2>
            <span style={{ color: colors.textMuted, fontSize: 12, fontWeight: 500 }}>{checkedItems.length}/{pantryItems.filter(i => i.daysLeft <= 2).length} done</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pantryItems.filter(i => i.daysLeft <= 2).map(item => {
              const checked = checkedItems.includes(item.id);
              return (
                <div key={item.id} onClick={() => toggleCheck(item.id)} style={{ background: checked ? colors.cardAlt : colors.card, borderRadius: 14, padding: '12px 14px', border: `1px solid ${checked ? colors.primary + '40' : colors.border}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s', opacity: checked ? 0.65 : 1 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${checked ? colors.primary : colors.textDim}`, background: checked ? colors.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                    {checked && <svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 4L4.5 7.5L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span style={{ fontSize: 22 }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: checked ? colors.textMuted : colors.text, fontSize: 14, fontWeight: 600, margin: 0, textDecoration: checked ? 'line-through' : 'none' }}>{item.name}</p>
                    <p style={{ color: colors.textMuted, fontSize: 12, margin: '1px 0 0' }}>{item.qty}</p>
                  </div>
                  <div style={{ background: item.color + '22', borderRadius: 8, padding: '3px 8px' }}>
                    <span style={{ color: item.color, fontSize: 11, fontWeight: 700 }}>
                      {item.daysLeft === 0 ? 'TODAY' : `${item.daysLeft}d`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suggested Action */}
        <div style={{ margin: '18px 20px 0', background: `linear-gradient(135deg, #1A2B1F 0%, #162320 100%)`, borderRadius: 16, padding: '16px', border: `1px solid ${colors.primary}30` }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: colors.primary + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 22 }}>🍳</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: colors.primary, fontSize: 11, fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: 0.8 }}>Best Rescue Right Now</p>
              <p style={{ color: colors.text, fontSize: 15, fontWeight: 700, margin: '3px 0 4px' }}>Spinach Quesadillas</p>
              <p style={{ color: colors.textMuted, fontSize: 12, margin: 0 }}>Uses spinach + tortillas + cheddar · 12 min</p>
              <div onClick={() => { setRecipeModal(recipes[0]); }} style={{ marginTop: 10, background: colors.primary, borderRadius: 10, padding: '8px 14px', display: 'inline-block', cursor: 'pointer', transform: btnScale('quickrecipe'), transition: 'transform 0.15s' }} onMouseDown={() => handlePress('quickrecipe')}>
                <span style={{ color: '#000', fontSize: 13, fontWeight: 700 }}>See Recipe →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scan CTA */}
        <div onClick={() => setScanMode(true)} style={{ margin: '14px 20px 0', background: colors.cardAlt, borderRadius: 16, padding: '16px', border: `1px dashed ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transform: btnScale('scan'), transition: 'transform 0.15s' }} onMouseDown={() => handlePress('scan')}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: colors.primary + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 22 }}>📷</span>
          </div>
          <div>
            <p style={{ color: colors.text, fontSize: 14, fontWeight: 600, margin: 0 }}>Scan New Items</p>
            <p style={{ color: colors.textMuted, fontSize: 12, margin: '2px 0 0' }}>Barcode, receipt, or photo</p>
          </div>
          <div style={{ marginLeft: 'auto', color: colors.textDim }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    );
  };

  // ─── PANTRY SCREEN ────────────────────────────────────────────────────────
  const PantryScreen = () => {
    const [filter, setFilter] = useState('all');
    const filters = ['all', 'urgent', 'veggies', 'dairy', 'protein'];
    const filtered = pantryItems.filter(i => {
      if (filter === 'all') return true;
      if (filter === 'urgent') return i.daysLeft <= 2;
      return i.category.toLowerCase() === filter;
    });

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '12px 20px 0' }}>
          <h1 style={{ color: colors.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>My Pantry</h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: '3px 0 0' }}>{pantryItems.length} items tracked · {urgentCount} urgent</p>
        </div>

        {/* Search bar */}
        <div style={{ margin: '12px 20px 0', background: colors.card, borderRadius: 14, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textDim} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ color: colors.textDim, fontSize: 14 }}>Search pantry…</span>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 20px 0', overflowX: 'auto' }}>
          {filters.map(f => (
            <div key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? colors.primary : colors.card, borderRadius: 10, padding: '6px 14px', cursor: 'pointer', border: `1px solid ${filter === f ? colors.primary : colors.border}`, flexShrink: 0, transition: 'all 0.2s' }}>
              <span style={{ color: filter === f ? '#000' : colors.textMuted, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 20px 0' }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: colors.card, borderRadius: 16, padding: '14px', border: `1px solid ${item.daysLeft <= 1 ? item.color + '40' : colors.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 26 }}>{item.emoji}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: colors.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{item.name}</p>
                <p style={{ color: colors.textMuted, fontSize: 12, margin: '2px 0 0' }}>{item.qty} · Added {item.bought}</p>
                {/* Freshness bar */}
                <div style={{ marginTop: 6, height: 4, background: colors.border, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.max(5, 100 - (item.daysLeft / 10) * 100)}%`, background: item.color, borderRadius: 2, transition: 'width 0.5s' }} />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ background: item.color + '22', borderRadius: 10, padding: '4px 10px', marginBottom: 4 }}>
                  <span style={{ color: item.color, fontSize: 12, fontWeight: 700 }}>
                    {item.daysLeft === 0 ? 'TODAY' : item.daysLeft >= 30 ? `${Math.floor(item.daysLeft/30)}mo` : `${item.daysLeft}d`}
                  </span>
                </div>
                <p style={{ color: colors.textDim, fontSize: 11, margin: 0 }}>{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add item button */}
        <div onClick={() => setScanMode(true)} style={{ margin: '14px 20px 0', background: colors.primary, borderRadius: 14, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', transform: btnScale('additem'), transition: 'transform 0.15s' }} onMouseDown={() => handlePress('additem')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span style={{ color: '#000', fontSize: 14, fontWeight: 700 }}>Add Items to Pantry</span>
        </div>
      </div>
    );
  };

  // ─── RECIPES SCREEN ───────────────────────────────────────────────────────
  const RecipesScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
      <div style={{ padding: '12px 20px 0' }}>
        <h1 style={{ color: colors.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Rescue Meals</h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: '3px 0 0' }}>Made from what needs saving · no shopping needed</p>
      </div>

      {/* Urgency badge */}
      <div style={{ margin: '12px 20px 0', background: colors.red + '18', borderRadius: 12, padding: '10px 14px', border: `1px solid ${colors.red}30`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>🔥</span>
        <p style={{ color: colors.text, fontSize: 13, margin: 0 }}>Based on <strong style={{ color: colors.red }}>3 items expiring today/tomorrow</strong></p>
      </div>

      {/* Recipe cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '14px 20px 0' }}>
        {recipes.map(recipe => (
          <div key={recipe.id} onClick={() => setRecipeModal(recipe)} style={{ background: colors.card, borderRadius: 18, padding: '16px', border: `1px solid ${colors.border}`, cursor: 'pointer', transform: btnScale(`recipe-${recipe.id}`), transition: 'transform 0.15s' }} onMouseDown={() => handlePress(`recipe-${recipe.id}`)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: colors.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 26 }}>{recipe.emoji}</span>
                </div>
                <div>
                  <p style={{ color: colors.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{recipe.name}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span style={{ color: colors.textMuted, fontSize: 12 }}>⏱ {recipe.time}</span>
                    <span style={{ color: colors.textMuted, fontSize: 12 }}>🍽 {recipe.servings} servings</span>
                  </div>
                </div>
              </div>
              <div style={{ background: recipe.urgencyColor + '22', borderRadius: 8, padding: '4px 8px' }}>
                <span style={{ color: recipe.urgencyColor, fontSize: 10, fontWeight: 700 }}>{recipe.urgency}</span>
              </div>
            </div>
            {/* Ingredients used */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {recipe.uses.map((u, i) => (
                <span key={i} style={{ background: colors.primary + '18', color: colors.primary, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{u}</span>
              ))}
            </div>
            <p style={{ color: colors.textMuted, fontSize: 12, margin: 0, fontStyle: 'italic' }}>💡 {recipe.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── SHARE SCREEN ─────────────────────────────────────────────────────────
  const ShareScreen = () => {
    const [claimed, setClaimed] = useState([]);
    const [offered, setOffered] = useState(false);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '12px 20px 0' }}>
          <h1 style={{ color: colors.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Sharing Board</h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: '3px 0 0' }}>Offer surplus · claim from neighbors</p>
        </div>

        {/* Offer button */}
        {!offered ? (
          <div onClick={() => setOffered(true)} style={{ margin: '14px 20px 0', background: `linear-gradient(135deg, #1A3022 0%, #162320 100%)`, borderRadius: 16, padding: '16px', border: `1px solid ${colors.primary}40`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transform: btnScale('offer'), transition: 'transform 0.15s' }} onMouseDown={() => handlePress('offer')}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: colors.primary + '30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div>
              <p style={{ color: colors.primary, fontSize: 14, fontWeight: 700, margin: 0 }}>Offer Surplus Food</p>
              <p style={{ color: colors.textMuted, fontSize: 12, margin: '2px 0 0' }}>Share with neighbours · prevent waste</p>
            </div>
          </div>
        ) : (
          <div style={{ margin: '14px 20px 0', background: colors.primary + '18', borderRadius: 16, padding: '14px 16px', border: `1px solid ${colors.primary}40`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <p style={{ color: colors.primary, fontSize: 14, fontWeight: 600, margin: 0 }}>Your leftover pasta bake has been listed!</p>
          </div>
        )}

        {/* Active listings */}
        <div style={{ margin: '18px 20px 0' }}>
          <h2 style={{ color: colors.text, fontSize: 15, fontWeight: 700, margin: '0 0 10px' }}>Available Near You</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {shareItems.map(item => {
              const isClaimed = claimed.includes(item.id) || item.claimed;
              return (
                <div key={item.id} style={{ background: colors.card, borderRadius: 16, padding: '14px', border: `1px solid ${colors.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: colors.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 26 }}>{item.emoji}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: colors.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{item.item}</p>
                      <p style={{ color: colors.textMuted, fontSize: 12, margin: '2px 0 0' }}>{item.qty} · from {item.from}</p>
                      <p style={{ color: colors.textDim, fontSize: 11, margin: '2px 0 0' }}>{item.time}</p>
                    </div>
                    {isClaimed ? (
                      <div style={{ background: colors.textDim + '22', borderRadius: 10, padding: '6px 12px' }}>
                        <span style={{ color: colors.textDim, fontSize: 12, fontWeight: 600 }}>Claimed</span>
                      </div>
                    ) : item.from !== 'You' ? (
                      <div onClick={() => setClaimed(prev => [...prev, item.id])} style={{ background: colors.primary, borderRadius: 10, padding: '6px 14px', cursor: 'pointer', transform: btnScale(`claim-${item.id}`), transition: 'transform 0.15s' }} onMouseDown={() => handlePress(`claim-${item.id}`)}>
                        <span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>Claim</span>
                      </div>
                    ) : (
                      <div style={{ background: colors.primary + '22', borderRadius: 10, padding: '6px 12px' }}>
                        <span style={{ color: colors.primary, fontSize: 12, fontWeight: 600 }}>Yours</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donation section */}
        <div style={{ margin: '18px 20px 0', background: colors.purple + '18', borderRadius: 16, padding: '16px', border: `1px solid ${colors.purple}30` }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 28 }}>🏠</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: colors.purple, fontSize: 12, fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: 0.8 }}>Donation Pickup</p>
              <p style={{ color: colors.text, fontSize: 13, fontWeight: 600, margin: '3px 0 2px' }}>City Food Bank – pickup today by 5pm</p>
              <p style={{ color: colors.textMuted, fontSize: 12, margin: 0 }}>2 surplus items in your area ready to donate</p>
            </div>
          </div>
          <div style={{ marginTop: 12, background: colors.purple, borderRadius: 10, padding: '9px', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Schedule Pickup →</span>
          </div>
        </div>
      </div>
    );
  };

  // ─── IMPACT SCREEN ────────────────────────────────────────────────────────
  const ImpactScreen = () => {
    const [period, setPeriod] = useState('thisWeek');
    const data = impactStats[period];
    const periodLabel = { thisWeek: 'This Week', thisMonth: 'This Month', allTime: 'All Time' }[period];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '12px 20px 0' }}>
          <h1 style={{ color: colors.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Your Impact</h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: '3px 0 0' }}>Every rescue counts</p>
        </div>

        {/* Period selector */}
        <div style={{ display: 'flex', gap: 8, margin: '14px 20px 0', background: colors.card, borderRadius: 14, padding: 4, border: `1px solid ${colors.border}` }}>
          {['thisWeek', 'thisMonth', 'allTime'].map(p => (
            <div key={p} onClick={() => setPeriod(p)} style={{ flex: 1, background: period === p ? colors.primary : 'transparent', borderRadius: 10, padding: '8px 0', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <span style={{ color: period === p ? '#000' : colors.textMuted, fontSize: 12, fontWeight: 600 }}>{{ thisWeek: 'Week', thisMonth: 'Month', allTime: 'All Time' }[p]}</span>
            </div>
          ))}
        </div>

        {/* Big stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '14px 20px 0' }}>
          {[
            { label: 'Money Saved', value: `$${data.money.toFixed(2)}`, icon: '💰', color: colors.yellow, desc: 'in food not thrown away' },
            { label: 'Meals Rescued', value: data.meals, icon: '🍽', color: colors.primary, desc: 'portions eaten, not wasted' },
            { label: 'CO₂ Avoided', value: `${data.co2}kg`, icon: '🌍', color: '#6DD5FA', desc: 'of greenhouse gases' },
          ].map((s, i) => (
            <div key={i} style={{ background: colors.card, borderRadius: 18, padding: '18px', border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: colors.textMuted, fontSize: 12, fontWeight: 500, margin: 0, textTransform: 'uppercase', letterSpacing: 0.6 }}>{s.label}</p>
                <p style={{ color: s.color, fontSize: 28, fontWeight: 800, margin: '2px 0 0', letterSpacing: -0.5 }}>{s.value}</p>
                <p style={{ color: colors.textDim, fontSize: 12, margin: '1px 0 0' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Streak & Rank */}
        <div style={{ margin: '14px 20px 0', background: `linear-gradient(135deg, #1A2B3A 0%, #14202A 100%)`, borderRadius: 18, padding: '18px', border: `1px solid #6DD5FA30` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#6DD5FA', fontSize: 11, fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: 0.8 }}>Current Rank</p>
              <p style={{ color: colors.text, fontSize: 20, fontWeight: 800, margin: '4px 0 0' }}>🛡 {impactStats.rank}</p>
              <p style={{ color: colors.textMuted, fontSize: 13, margin: '4px 0 0' }}>🔥 {impactStats.streak}-day rescue streak</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: colors.textMuted, fontSize: 11, margin: '0 0 4px' }}>Next: {impactStats.nextRank}</p>
              <div style={{ width: 100, height: 8, background: colors.border, borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${impactStats.progress}%`, background: 'linear-gradient(90deg, #6DD5FA, #2980B9)', borderRadius: 4 }} />
              </div>
              <p style={{ color: '#6DD5FA', fontSize: 11, margin: '3px 0 0' }}>{impactStats.progress}%</p>
            </div>
          </div>
        </div>

        {/* Eco equiv */}
        <div style={{ margin: '14px 20px 0', background: colors.cardAlt, borderRadius: 16, padding: '14px 16px', border: `1px solid ${colors.border}` }}>
          <p style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.6 }}>That's equivalent to…</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '🌳', text: `Planting ${Math.round(impactStats.allTime.co2 / 22)} trees` },
              { icon: '🚗', text: `${Math.round(impactStats.allTime.co2 * 4)} km less driving` },
              { icon: '💧', text: `${Math.round(impactStats.allTime.meals * 300)}L of water saved` },
            ].map((eq, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{eq.icon}</span>
                <span style={{ color: colors.textMuted, fontSize: 13 }}>{eq.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── SCAN MODAL ───────────────────────────────────────────────────────────
  const ScanModal = () => {
    const [step, setStep] = useState('choose');
    const [scanned, setScanned] = useState(false);

    const handleScan = (type) => {
      setStep('scanning');
      setTimeout(() => {
        setScanned(true);
        setStep('result');
      }, 1500);
    };

    return (
      <div style={{ position: 'absolute', inset: 0, background: '#000000CC', zIndex: 100, display: 'flex', alignItems: 'flex-end', borderRadius: 50 }}>
        <div style={{ width: '100%', background: colors.card, borderRadius: '28px 28px 0 0', padding: '20px 20px 40px' }}>
          <div style={{ width: 40, height: 4, background: colors.border, borderRadius: 2, margin: '0 auto 20px' }} />
          {step === 'choose' && (
            <>
              <h3 style={{ color: colors.text, fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>Add to Pantry</h3>
              <p style={{ color: colors.textMuted, fontSize: 13, margin: '0 0 20px' }}>How would you like to add items?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '📷', label: 'Scan Barcode', sub: 'Point camera at product barcode' },
                  { icon: '🧾', label: 'Scan Receipt', sub: 'Photograph your grocery receipt' },
                  { icon: '✍️', label: 'Add Manually', sub: 'Type item name & expiry' },
                ].map((opt, i) => (
                  <div key={i} onClick={() => handleScan(opt.label)} style={{ background: colors.cardAlt, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', border: `1px solid ${colors.border}` }}>
                    <span style={{ fontSize: 26 }}>{opt.icon}</span>
                    <div>
                      <p style={{ color: colors.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{opt.label}</p>
                      <p style={{ color: colors.textMuted, fontSize: 12, margin: '2px 0 0' }}>{opt.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {step === 'scanning' && (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ width: 80, height: 80, borderRadius: 40, background: colors.primary + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <span style={{ fontSize: 40 }}>📷</span>
              </div>
              <p style={{ color: colors.text, fontSize: 16, fontWeight: 700, margin: '0 0 6px' }}>Scanning…</p>
              <p style={{ color: colors.textMuted, fontSize: 13 }}>Identifying items & expiry dates</p>
            </div>
          )}
          {step === 'result' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>✅</span>
                <div>
                  <p style={{ color: colors.primary, fontSize: 13, fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: 0.8 }}>Detected</p>
                  <p style={{ color: colors.text, fontSize: 18, fontWeight: 800, margin: '2px 0 0' }}>2 items found</p>
                </div>
              </div>
              {[{ name: 'Almond Milk', qty: '1L', expiry: '3 days', emoji: '🥛' }, { name: 'Mixed Berries', qty: '250g', expiry: '2 days', emoji: '🫐' }].map((item, i) => (
                <div key={i} style={{ background: colors.cardAlt, borderRadius: 12, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: colors.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.name}</p>
                    <p style={{ color: colors.textMuted, fontSize: 12, margin: '2px 0 0' }}>{item.qty} · expires in {item.expiry}</p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
              ))}
              <div onClick={() => setScanMode(false)} style={{ background: colors.primary, borderRadius: 14, padding: '14px', textAlign: 'center', cursor: 'pointer', marginTop: 12 }}>
                <span style={{ color: '#000', fontSize: 15, fontWeight: 700 }}>Add to Pantry</span>
              </div>
            </>
          )}
          <div onClick={() => setScanMode(false)} style={{ textAlign: 'center', marginTop: 14, cursor: 'pointer' }}>
            <span style={{ color: colors.textMuted, fontSize: 14 }}>Cancel</span>
          </div>
        </div>
      </div>
    );
  };

  // ─── RECIPE MODAL ─────────────────────────────────────────────────────────
  const RecipeModalView = ({ recipe }) => (
    <div style={{ position: 'absolute', inset: 0, background: '#000000CC', zIndex: 100, display: 'flex', alignItems: 'flex-end', borderRadius: 50, overflowY: 'hidden' }}>
      <div style={{ width: '100%', background: colors.card, borderRadius: '28px 28px 0 0', padding: '20px 20px 40px', maxHeight: '88%', overflowY: 'auto' }}>
        <div style={{ width: 40, height: 4, background: colors.border, borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: colors.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 34 }}>{recipe.emoji}</span>
          </div>
          <div>
            <div style={{ background: recipe.urgencyColor + '22', borderRadius: 8, padding: '3px 8px', display: 'inline-block', marginBottom: 4 }}>
              <span style={{ color: recipe.urgencyColor, fontSize: 10, fontWeight: 700 }}>{recipe.urgency}</span>
            </div>
            <h2 style={{ color: colors.text, fontSize: 20, fontWeight: 800, margin: 0 }}>{recipe.name}</h2>
            <p style={{ color: colors.textMuted, fontSize: 13, margin: '3px 0 0' }}>⏱ {recipe.time} · 🍽 {recipe.servings} servings · {recipe.calories} cal</p>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <p style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 8px' }}>Ingredients from Pantry</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {recipe.uses.map((u, i) => (
              <span key={i} style={{ background: colors.primary + '18', color: colors.primary, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 8 }}>{u}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <p style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 10px' }}>Steps</p>
          {recipe.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 26, height: 26, borderRadius: 13, background: colors.primary + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: colors.primary, fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              </div>
              <p style={{ color: colors.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{step}</p>
            </div>
          ))}
        </div>

        <div style={{ background: colors.primary + '15', borderRadius: 12, padding: '12px 14px', marginBottom: 16, border: `1px solid ${colors.primary}25` }}>
          <p style={{ color: colors.primary, fontSize: 13, margin: 0 }}>💡 {recipe.tip}</p>
        </div>

        <div onClick={() => setRecipeModal(null)} style={{ background: colors.primary, borderRadius: 14, padding: '14px', textAlign: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#000', fontSize: 15, fontWeight: 700 }}>Mark as Cooked ✓</span>
        </div>
        <div onClick={() => setRecipeModal(null)} style={{ textAlign: 'center', marginTop: 12, cursor: 'pointer' }}>
          <span style={{ color: colors.textMuted, fontSize: 14 }}>Close</span>
        </div>
      </div>
    </div>
  );

  // ─── BOTTOM NAV ───────────────────────────────────────────────────────────
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'pantry', icon: '📦', label: 'Pantry' },
    { id: 'recipes', icon: '🍳', label: 'Recipes' },
    { id: 'share', icon: '🤝', label: 'Share' },
    { id: 'impact', icon: '🌿', label: 'Impact' },
  ];

  const BottomNav = () => (
    <div style={{ background: colors.navBg, borderTop: `1px solid ${colors.border}`, padding: '8px 0 20px', display: 'flex' }}>
      {navItems.map(item => (
        <div key={item.id} onClick={() => setActiveTab(item.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 0', transform: btnScale(`nav-${item.id}`), transition: 'transform 0.15s' }} onMouseDown={() => handlePress(`nav-${item.id}`)}>
          <span style={{ fontSize: 22, filter: activeTab === item.id ? 'none' : 'grayscale(1) opacity(0.5)' }}>{item.icon}</span>
          <span style={{ color: activeTab === item.id ? colors.primary : colors.textDim, fontSize: 10, fontWeight: activeTab === item.id ? 700 : 500 }}>{item.label}</span>
          {activeTab === item.id && (
            <div style={{ width: 16, height: 3, background: colors.primary, borderRadius: 2, position: 'absolute', bottom: 10 }} />
          )}
        </div>
      ))}
    </div>
  );

  // ─── RENDER ───────────────────────────────────────────────────────────────
  const screenMap = { home: HomeScreen, pantry: PantryScreen, recipes: RecipesScreen, share: ShareScreen, impact: ImpactScreen };
  const ActiveScreen = screenMap[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", padding: '20px' }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 50, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <StatusBar />
        <DynamicIsland />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ActiveScreen />
        </div>
        <BottomNav />
        {scanMode && <ScanModal />}
        {recipeModal && <RecipeModalView recipe={recipeModal} />}
      </div>
    </div>
  );
}
