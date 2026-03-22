
function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    light: {
      bg: '#EFF8F2',
      surface: '#FFFFFF',
      surfaceAlt: '#F3FAF6',
      surfaceHover: '#E8F5EE',
      text: '#132E1F',
      textSub: '#3D6B52',
      textMuted: '#7FA88E',
      primary: '#1F8C5A',
      primaryGlow: 'rgba(31,140,90,0.18)',
      primaryLight: '#E4F5EC',
      primaryDark: '#16694A',
      accent: '#F59E0B',
      accentLight: '#FFFBEB',
      red: '#EF4444',
      redLight: '#FEF2F2',
      orange: '#F97316',
      orangeLight: '#FFF7ED',
      green: '#10B981',
      greenLight: '#ECFDF5',
      border: '#D8EDDF',
      navBg: '#FFFFFF',
      shadow: '0 4px 20px rgba(31,140,90,0.1)',
      shadowMd: '0 8px 32px rgba(31,140,90,0.14)',
    },
    dark: {
      bg: '#091510',
      surface: '#0F2018',
      surfaceAlt: '#172C20',
      surfaceHover: '#1D3628',
      text: '#E2F5EA',
      textSub: '#7DB896',
      textMuted: '#3D6B52',
      primary: '#34D399',
      primaryGlow: 'rgba(52,211,153,0.22)',
      primaryLight: '#172C20',
      primaryDark: '#10B981',
      accent: '#FBBF24',
      accentLight: '#1C1A08',
      red: '#F87171',
      redLight: '#1C0A0A',
      orange: '#FB923C',
      orangeLight: '#1C110A',
      green: '#34D399',
      greenLight: '#0C1F14',
      border: '#1A3326',
      navBg: '#091510',
      shadow: '0 4px 20px rgba(0,0,0,0.45)',
      shadowMd: '0 8px 32px rgba(0,0,0,0.55)',
    },
  };

  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [pantryFilter, setPantryFilter] = useState('all');
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [checkedGrocery, setCheckedGrocery] = useState([]);
  const [pressedBtn, setPressedBtn] = useState(null);

  const c = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
    * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    input, button, select { font-family: 'Plus Jakarta Sans', sans-serif; }
  `;

  const expiringItems = [
    { id: 1, name: 'Spinach', emoji: '🥬', daysLeft: 1, qty: '80g', urgency: 'critical' },
    { id: 2, name: 'Cooked Rice', emoji: '🍚', daysLeft: 1, qty: '2 cups', urgency: 'critical' },
    { id: 3, name: 'Mushrooms', emoji: '🍄', daysLeft: 2, qty: '200g', urgency: 'urgent' },
    { id: 4, name: 'Bell Pepper', emoji: '🫑', daysLeft: 2, qty: '1 whole', urgency: 'urgent' },
    { id: 5, name: 'Greek Yogurt', emoji: '🥛', daysLeft: 3, qty: '150g', urgency: 'soon' },
    { id: 6, name: 'Cheddar', emoji: '🧀', daysLeft: 4, qty: '100g', urgency: 'soon' },
  ];

  const pantryItems = [
    { id: 1, name: 'Spinach', emoji: '🥬', daysLeft: 1, qty: '80g', category: 'fridge', urgency: 'critical' },
    { id: 2, name: 'Cooked Rice', emoji: '🍚', daysLeft: 1, qty: '2 cups', category: 'leftovers', urgency: 'critical' },
    { id: 3, name: 'Mushrooms', emoji: '🍄', daysLeft: 2, qty: '200g', category: 'fridge', urgency: 'urgent' },
    { id: 4, name: 'Bell Pepper', emoji: '🫑', daysLeft: 2, qty: '1 whole', category: 'fridge', urgency: 'urgent' },
    { id: 5, name: 'Greek Yogurt', emoji: '🥛', daysLeft: 3, qty: '150g', category: 'fridge', urgency: 'soon' },
    { id: 6, name: 'Cheddar', emoji: '🧀', daysLeft: 4, qty: '100g', category: 'fridge', urgency: 'soon' },
    { id: 7, name: 'Eggs', emoji: '🥚', daysLeft: 10, qty: '4 eggs', category: 'fridge', urgency: 'fresh' },
    { id: 8, name: 'Lemon', emoji: '🍋', daysLeft: 5, qty: '2 whole', category: 'fridge', urgency: 'fresh' },
    { id: 9, name: 'Garlic', emoji: '🧄', daysLeft: 7, qty: '5 cloves', category: 'pantry', urgency: 'fresh' },
    { id: 10, name: 'Onion', emoji: '🧅', daysLeft: 14, qty: '2 whole', category: 'pantry', urgency: 'fresh' },
    { id: 11, name: 'Olive Oil', emoji: '🫙', daysLeft: 60, qty: '400ml', category: 'pantry', urgency: 'fresh' },
    { id: 12, name: 'Soy Sauce', emoji: '🍶', daysLeft: 90, qty: '250ml', category: 'pantry', urgency: 'fresh' },
  ];

  const recipes = [
    {
      id: 1,
      name: 'Spinach & Mushroom Stir-Fry',
      emoji: '🥢',
      gradientFrom: '#2D9E6B',
      gradientTo: '#059669',
      time: '15 min',
      difficulty: 'Easy',
      rating: 4.8,
      reviews: 312,
      usesExpiring: ['Spinach', 'Mushrooms', 'Bell Pepper', 'Cooked Rice'],
      saves: '$4.20',
      co2: '0.3kg',
      urgency: 'Make Tonight',
      urgencyLevel: 'critical',
      ingredients: [
        '80g spinach (from fridge) ✓',
        '200g mushrooms (from fridge) ✓',
        '1 bell pepper (from fridge) ✓',
        '2 cups cooked rice (leftover) ✓',
        '3 tbsp soy sauce (pantry) ✓',
        '2 garlic cloves (pantry) ✓',
        '1 tbsp sesame oil',
      ],
      steps: [
        'Heat a wok or pan over high heat with olive oil.',
        'Add garlic, then mushrooms. Stir-fry 3 minutes until golden.',
        'Add bell pepper and spinach, toss 2 minutes.',
        'Push veg to sides, add rice to center, mix together.',
        'Season with soy sauce and a drizzle of sesame oil. Serve hot.',
      ],
    },
    {
      id: 2,
      name: 'Mushroom & Egg Scramble',
      emoji: '🍳',
      gradientFrom: '#F59E0B',
      gradientTo: '#D97706',
      time: '10 min',
      difficulty: 'Easy',
      rating: 4.5,
      reviews: 198,
      usesExpiring: ['Mushrooms', 'Eggs', 'Cheddar'],
      saves: '$3.10',
      co2: '0.2kg',
      urgency: 'By Tomorrow',
      urgencyLevel: 'urgent',
      ingredients: [
        '150g mushrooms (from fridge) ✓',
        '4 eggs (from fridge) ✓',
        '50g cheddar, grated (from fridge) ✓',
        '2 garlic cloves (pantry) ✓',
        '1 tbsp olive oil (pantry) ✓',
        'Salt & pepper to taste',
      ],
      steps: [
        'Slice mushrooms, sauté in olive oil with garlic until golden.',
        'Whisk eggs with a pinch of salt. Pour over mushrooms on low heat.',
        'Stir gently as eggs cook. Add cheddar right before done.',
        'Serve immediately with toast or rice.',
      ],
    },
    {
      id: 3,
      name: 'Bell Pepper Rice Bowl',
      emoji: '🍱',
      gradientFrom: '#EF4444',
      gradientTo: '#DC2626',
      time: '20 min',
      difficulty: 'Easy',
      rating: 4.3,
      reviews: 145,
      usesExpiring: ['Bell Pepper', 'Cooked Rice', 'Spinach'],
      saves: '$3.80',
      co2: '0.25kg',
      urgency: 'By Tomorrow',
      urgencyLevel: 'urgent',
      ingredients: [
        '1 bell pepper, diced (from fridge) ✓',
        '2 cups cooked rice (leftover) ✓',
        '50g spinach (from fridge) ✓',
        '2 tbsp soy sauce (pantry) ✓',
        '1 tbsp olive oil (pantry) ✓',
        'Sesame oil (optional)',
      ],
      steps: [
        'Stir-fry diced bell pepper in olive oil over medium heat, 5 minutes.',
        'Add spinach, toss until wilted.',
        'Add leftover rice, mix well. Season with soy sauce.',
        'Top with a drizzle of sesame oil if available.',
      ],
    },
    {
      id: 4,
      name: 'Yogurt Lemon Dip',
      emoji: '🥗',
      gradientFrom: '#10B981',
      gradientTo: '#059669',
      time: '5 min',
      difficulty: 'Easy',
      rating: 4.6,
      reviews: 87,
      usesExpiring: ['Greek Yogurt', 'Lemon'],
      saves: '$2.50',
      co2: '0.15kg',
      urgency: 'This Week',
      urgencyLevel: 'soon',
      ingredients: [
        '150g Greek yogurt (from fridge) ✓',
        '1 lemon, zest & juice (from fridge) ✓',
        '1 garlic clove, minced (pantry) ✓',
        '1 tbsp olive oil (pantry) ✓',
        'Cucumber (not in pantry)',
        'Fresh dill (optional)',
      ],
      steps: [
        'Combine yogurt, lemon zest, and lemon juice in a bowl.',
        'Add minced garlic and a drizzle of olive oil.',
        'Season with salt. Stir until smooth.',
        'Chill 10 minutes before serving. Great with veggies or bread.',
      ],
    },
  ];

  const groceryItems = [
    { id: 1, name: 'Sesame Oil', forRecipe: 'Stir-Fry + Rice Bowl', price: '$3.99', qty: '1 bottle' },
    { id: 2, name: 'Cucumber', forRecipe: 'Yogurt Lemon Dip', price: '$1.49', qty: '1 whole' },
    { id: 3, name: 'Chili Flakes', forRecipe: 'Stir-Fry', price: '$2.99', qty: 'Small jar' },
    { id: 4, name: 'Spring Onions', forRecipe: 'Multiple recipes', price: '$1.99', qty: '1 bunch' },
  ];

  const urgencyColor = (u) => ({ critical: c.red, urgent: c.orange, soon: c.accent, fresh: c.green }[u] || c.textMuted);
  const urgencyBg = (u) => ({ critical: c.redLight, urgent: c.orangeLight, soon: c.accentLight, fresh: c.greenLight }[u] || c.surfaceAlt);
  const urgencyLabel = (d) => d === 1 ? 'Today!' : d === 2 ? '2 days' : `${d}d left`;

  const btnPress = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 150); };

  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', color: c.text }}>
      <span style={{ fontSize: 14, fontWeight: 700 }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M0 8.5L3.5 5.5L7 8.5L10.5 4L14 0.5" stroke={c.text} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0.5" y="2.5" width="13" height="9" rx="2" stroke={c.text} strokeWidth="1.2" opacity="0.6"/>
          <rect x="2" y="4" width="8" height="6" rx="1" fill={c.text}/>
          <path d="M14 5.5V8.5" stroke={c.text} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );

  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 2 }}>
      <div style={{ width: 120, height: 32, background: '#000', borderRadius: 20 }} />
    </div>
  );

  const HomeScreen = () => {
    const todayItems = expiringItems.filter(i => i.daysLeft <= 1);
    const soonItems = expiringItems.filter(i => i.daysLeft === 2);
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 0' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <p style={{ color: c.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Sunday, Mar 22</p>
            <h1 style={{ color: c.text, fontSize: 24, fontWeight: 800, lineHeight: 1.15 }}>Good morning,<br /><span style={{ color: c.primary }}>Alex!</span></h1>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{ width: 40, height: 40, borderRadius: 12, background: c.surfaceAlt, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 17, color: c.textSub })}
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: c.primaryLight, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              {React.createElement(window.lucide.Bell, { size: 17, color: c.primary })}
              <div style={{ position: 'absolute', top: 9, right: 9, width: 8, height: 8, background: c.red, borderRadius: '50%', border: `2px solid ${c.surface}` }} />
            </button>
          </div>
        </div>

        {/* Fridge Status Gradient Card */}
        <div style={{
          background: `linear-gradient(140deg, ${c.primary} 0%, ${isDark ? '#059669' : '#15803D'} 100%)`,
          borderRadius: 22,
          padding: '18px 20px',
          marginBottom: 18,
          boxShadow: `0 10px 30px ${c.primaryGlow}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 700 }}>Fridge Status</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '4px 10px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#A7F3D0' }} />
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: 600 }}>Live</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { label: 'Items\nTracked', value: '12', icon: '📦' },
              { label: 'Expiring\nToday', value: `${todayItems.length}`, icon: '⚠️' },
              { label: 'Rescue\nRecipes', value: '4', icon: '🍳' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.16)', borderRadius: 16, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 5 }}>{s.icon}</div>
                <div style={{ color: '#fff', fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 9.5, fontWeight: 600, whiteSpace: 'pre-line', lineHeight: 1.35, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Scan Actions */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          {[
            { label: 'Scan Fridge', icon: window.lucide.Camera, color: c.primary, bg: c.primaryLight },
            { label: 'Scan Receipt', icon: window.lucide.Receipt, color: c.accent, bg: c.accentLight },
            { label: 'Add Item', icon: window.lucide.PlusCircle, color: c.green, bg: c.greenLight },
          ].map((a, i) => (
            <button
              key={i}
              onMouseDown={() => btnPress(`qa${i}`)}
              style={{
                flex: 1,
                padding: '12px 6px',
                borderRadius: 16,
                background: c.surface,
                border: `1px solid ${c.border}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 7,
                cursor: 'pointer',
                boxShadow: c.shadow,
                transform: pressedBtn === `qa${i}` ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.15s',
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(a.icon, { size: 17, color: a.color })}
              </div>
              <span style={{ color: c.textSub, fontSize: 10.5, fontWeight: 700 }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Use These First */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ color: c.text, fontSize: 15, fontWeight: 800 }}>Use These First</h2>
            <span onClick={() => setActiveTab('pantry')} style={{ color: c.primary, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>All items</span>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {expiringItems.map(item => (
              <div key={item.id} style={{
                minWidth: 86,
                background: c.surface,
                borderRadius: 18,
                padding: '12px 8px',
                textAlign: 'center',
                border: `1.5px solid ${urgencyColor(item.urgency)}35`,
                boxShadow: c.shadow,
                flexShrink: 0,
              }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ color: c.text, fontSize: 11, fontWeight: 700, marginBottom: 5 }}>{item.name}</div>
                <div style={{
                  color: urgencyColor(item.urgency),
                  fontSize: 9.5,
                  fontWeight: 800,
                  background: urgencyBg(item.urgency),
                  borderRadius: 7,
                  padding: '3px 6px',
                }}>
                  {urgencyLabel(item.daysLeft)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tonight's Rescue Recipe */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ color: c.text, fontSize: 15, fontWeight: 800 }}>Tonight's Rescue</h2>
            <span onClick={() => setActiveTab('recipes')} style={{ color: c.primary, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>All recipes</span>
          </div>
          <div
            onClick={() => { setActiveRecipe(recipes[0]); setActiveTab('recipes'); }}
            style={{ background: c.surface, borderRadius: 22, overflow: 'hidden', boxShadow: c.shadowMd, cursor: 'pointer', border: `1px solid ${c.border}` }}
          >
            <div style={{ height: 110, background: `linear-gradient(135deg, #2D9E6B, #065F46)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, position: 'relative' }}>
              🥢
              <div style={{ position: 'absolute', top: 12, left: 14, background: c.red, borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 800 }}>MAKE TONIGHT</span>
              </div>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: c.text, fontSize: 16, fontWeight: 800, marginBottom: 3 }}>Spinach & Mushroom Stir-Fry</h3>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ color: c.textMuted, fontSize: 11 }}>⏱ 15 min</span>
                    <span style={{ color: c.textMuted, fontSize: 11 }}>👨‍🍳 Easy</span>
                  </div>
                </div>
                <div style={{ background: c.primaryLight, borderRadius: 12, padding: '6px 10px', textAlign: 'center' }}>
                  <div style={{ color: c.primary, fontSize: 14, fontWeight: 800 }}>4.8</div>
                  <div style={{ color: c.primary, fontSize: 9 }}>★★★★★</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {['Spinach', 'Mushrooms', 'Rice', 'Bell Pepper'].map((tag, i) => (
                  <span key={i} style={{ background: c.primaryLight, color: c.primary, fontSize: 10, fontWeight: 700, borderRadius: 7, padding: '3px 8px' }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${c.border}`, paddingTop: 12 }}>
                <span style={{ color: c.green, fontSize: 12, fontWeight: 700 }}>💰 Saves $4.20</span>
                <span style={{ color: c.primary, fontSize: 12, fontWeight: 700 }}>🌱 Avoids 0.3kg CO₂</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Nudge */}
        <div style={{ background: c.primaryLight, borderRadius: 18, padding: '14px 16px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${c.primary}30` }}>
          <div style={{ fontSize: 30 }}>🔥</div>
          <div>
            <div style={{ color: c.primary, fontSize: 13, fontWeight: 800 }}>14-Day Streak!</div>
            <div style={{ color: c.textSub, fontSize: 11 }}>You've saved $24.70 & 1.8kg CO₂ this week</div>
          </div>
        </div>
      </div>
    );
  };

  const PantryScreen = () => {
    const filters = ['all', 'fridge', 'pantry', 'leftovers'];
    const filtered = pantryFilter === 'all' ? pantryItems : pantryItems.filter(i => i.category === pantryFilter);
    const criticalCount = pantryItems.filter(i => i.urgency === 'critical').length;

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h1 style={{ color: c.text, fontSize: 22, fontWeight: 800 }}>My Pantry</h1>
            <p style={{ color: c.textMuted, fontSize: 12, marginTop: 3 }}>{pantryItems.length} items tracked</p>
          </div>
          <button onMouseDown={() => btnPress('addItem')} style={{
            width: 40, height: 40, borderRadius: 12, background: c.primary, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            transform: pressedBtn === 'addItem' ? 'scale(0.92)' : 'scale(1)', transition: 'transform 0.15s',
          }}>
            {React.createElement(window.lucide.Plus, { size: 20, color: '#fff' })}
          </button>
        </div>

        {criticalCount > 0 && (
          <div style={{ background: c.redLight, borderRadius: 14, padding: '10px 14px', marginBottom: 16, border: `1px solid ${c.red}30`, display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(window.lucide.AlertTriangle, { size: 16, color: c.red })}
            <span style={{ color: c.red, fontSize: 12, fontWeight: 700 }}>{criticalCount} items expire today — cook or freeze now!</span>
          </div>
        )}

        {/* Search bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: c.surfaceAlt, borderRadius: 14, padding: '10px 14px', marginBottom: 16, border: `1px solid ${c.border}` }}>
          {React.createElement(window.lucide.Search, { size: 15, color: c.textMuted })}
          <span style={{ color: c.textMuted, fontSize: 13 }}>Search ingredients...</span>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setPantryFilter(f)}
              style={{
                padding: '7px 16px', borderRadius: 22, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 700, flexShrink: 0,
                background: pantryFilter === f ? c.primary : c.surfaceAlt,
                color: pantryFilter === f ? '#fff' : c.textSub,
                transition: 'all 0.2s',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && <span style={{ marginLeft: 4, opacity: 0.7 }}>({pantryItems.length})</span>}
            </button>
          ))}
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 28 }}>
          {filtered.sort((a, b) => a.daysLeft - b.daysLeft).map(item => {
            const freshPct = Math.min(100, Math.max(4, (item.daysLeft / 14) * 100));
            return (
              <div key={item.id} style={{ background: c.surface, borderRadius: 18, padding: '14px 16px', border: `1.5px solid ${item.urgency === 'critical' || item.urgency === 'urgent' ? urgencyColor(item.urgency) + '40' : c.border}`, boxShadow: c.shadow }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: urgencyBg(item.urgency), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ color: c.text, fontSize: 14, fontWeight: 700 }}>{item.name}</span>
                      <span style={{
                        color: urgencyColor(item.urgency), fontSize: 10.5, fontWeight: 800,
                        background: urgencyBg(item.urgency), borderRadius: 7, padding: '3px 8px', flexShrink: 0,
                      }}>
                        {urgencyLabel(item.daysLeft)}
                      </span>
                    </div>
                    <span style={{ color: c.textMuted, fontSize: 11, textTransform: 'capitalize' }}>{item.qty} · {item.category}</span>
                    <div style={{ marginTop: 8, height: 5, background: c.border, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${freshPct}%`,
                        background: urgencyColor(item.urgency), borderRadius: 4,
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const RecipesScreen = () => {
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 0' }}>
        {activeRecipe ? (
          <div style={{ paddingBottom: 28 }}>
            <button
              onClick={() => setActiveRecipe(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: c.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 18, padding: 0 }}
            >
              {React.createElement(window.lucide.ChevronLeft, { size: 20, color: c.primary })}
              All Recipes
            </button>
            <div style={{ background: c.surface, borderRadius: 22, overflow: 'hidden', boxShadow: c.shadowMd, border: `1px solid ${c.border}` }}>
              <div style={{ height: 130, background: `linear-gradient(135deg, ${activeRecipe.gradientFrom}, ${activeRecipe.gradientTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 68, position: 'relative' }}>
                {activeRecipe.emoji}
                <div style={{ position: 'absolute', bottom: 12, left: 16, background: 'rgba(0,0,0,0.35)', borderRadius: 10, padding: '4px 10px' }}>
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>{activeRecipe.urgency}</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <h2 style={{ color: c.text, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{activeRecipe.name}</h2>
                <div style={{ display: 'flex', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{ color: c.textSub, fontSize: 12 }}>⏱ {activeRecipe.time}</span>
                  <span style={{ color: c.textSub, fontSize: 12 }}>👨‍🍳 {activeRecipe.difficulty}</span>
                  <span style={{ color: c.accent, fontSize: 12, fontWeight: 700 }}>★ {activeRecipe.rating} ({activeRecipe.reviews})</span>
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                  <div style={{ flex: 1, background: c.greenLight, borderRadius: 14, padding: '10px 12px', textAlign: 'center' }}>
                    <div style={{ color: c.green, fontSize: 16, fontWeight: 800 }}>{activeRecipe.saves}</div>
                    <div style={{ color: c.textMuted, fontSize: 10, marginTop: 2 }}>Money saved</div>
                  </div>
                  <div style={{ flex: 1, background: c.primaryLight, borderRadius: 14, padding: '10px 12px', textAlign: 'center' }}>
                    <div style={{ color: c.primary, fontSize: 16, fontWeight: 800 }}>{activeRecipe.co2}</div>
                    <div style={{ color: c.textMuted, fontSize: 10, marginTop: 2 }}>CO₂ avoided</div>
                  </div>
                </div>

                <h4 style={{ color: c.text, fontSize: 13, fontWeight: 800, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {React.createElement(window.lucide.ShoppingBasket, { size: 14, color: c.primary })}
                  Ingredients
                </h4>
                <div style={{ background: c.surfaceAlt, borderRadius: 14, padding: 14, marginBottom: 18 }}>
                  {activeRecipe.ingredients.map((ing, i) => (
                    <div key={i} style={{ color: ing.includes('✓') ? c.textSub : c.red, fontSize: 12.5, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 9 }}>{ing.includes('✓') ? '✅' : '🛒'}</span>
                      {ing}
                    </div>
                  ))}
                </div>

                <h4 style={{ color: c.text, fontSize: 13, fontWeight: 800, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {React.createElement(window.lucide.ChefHat, { size: 14, color: c.primary })}
                  Steps
                </h4>
                {activeRecipe.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 8, background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                    </div>
                    <p style={{ color: c.textSub, fontSize: 12.5, lineHeight: 1.5, paddingTop: 3 }}>{step}</p>
                  </div>
                ))}

                <button
                  onMouseDown={() => btnPress('cook')}
                  style={{
                    width: '100%', padding: '15px', background: c.primary, border: 'none',
                    borderRadius: 16, color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', marginTop: 6,
                    transform: pressedBtn === 'cook' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s',
                    boxShadow: `0 6px 20px ${c.primaryGlow}`,
                  }}
                >
                  Start Cooking 🍳
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ paddingBottom: 28 }}>
            <h1 style={{ color: c.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Rescue Recipes</h1>
            <p style={{ color: c.textMuted, fontSize: 12, marginBottom: 20 }}>Built around what's expiring soon</p>

            {/* Filter chips */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 2 }}>
              {['All', 'Tonight', 'This Week', 'Vegetarian'].map((f, i) => (
                <button key={i} style={{
                  padding: '6px 14px', borderRadius: 20, border: `1px solid ${i === 0 ? c.primary : c.border}`,
                  background: i === 0 ? c.primary : 'transparent', color: i === 0 ? '#fff' : c.textSub,
                  fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                }}>
                  {f}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {recipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => setActiveRecipe(recipe)}
                  style={{ background: c.surface, borderRadius: 22, overflow: 'hidden', boxShadow: c.shadow, cursor: 'pointer', border: `1px solid ${c.border}` }}
                >
                  <div style={{ height: 10, background: `linear-gradient(90deg, ${recipe.gradientFrom}, ${recipe.gradientTo})` }} />
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${recipe.gradientFrom}22, ${recipe.gradientTo}33)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                        {recipe.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ color: urgencyColor(recipe.urgencyLevel), fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>
                              {recipe.urgency === 'Make Tonight' ? '🔥' : recipe.urgency === 'By Tomorrow' ? '⚠️' : '📅'} {recipe.urgency}
                            </div>
                            <div style={{ color: c.text, fontSize: 14, fontWeight: 800 }}>{recipe.name}</div>
                          </div>
                          {React.createElement(window.lucide.ChevronRight, { size: 16, color: c.textMuted })}
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 5 }}>
                          <span style={{ color: c.textMuted, fontSize: 11 }}>⏱ {recipe.time}</span>
                          <span style={{ color: c.green, fontSize: 11, fontWeight: 700 }}>💰 {recipe.saves}</span>
                          <span style={{ color: c.primary, fontSize: 11, fontWeight: 700 }}>🌱 {recipe.co2}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      {recipe.usesExpiring.slice(0, 3).map((ing, i) => (
                        <span key={i} style={{ background: c.primaryLight, color: c.primary, fontSize: 9.5, fontWeight: 700, borderRadius: 7, padding: '2px 8px' }}>{ing}</span>
                      ))}
                      {recipe.usesExpiring.length > 3 && (
                        <span style={{ background: c.surfaceAlt, color: c.textMuted, fontSize: 9.5, fontWeight: 700, borderRadius: 7, padding: '2px 8px' }}>+{recipe.usesExpiring.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ImpactScreen = () => {
    const weekData = [
      { day: 'M', val: 2.4, max: 4 },
      { day: 'T', val: 3.1, max: 4 },
      { day: 'W', val: 1.8, max: 4 },
      { day: 'T', val: 3.8, max: 4 },
      { day: 'F', val: 2.9, max: 4 },
      { day: 'S', val: 4.0, max: 4 },
      { day: 'S', val: 3.2, max: 4 },
    ];
    const totalSaved = 24.70;
    const co2Saved = 1.8;

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 0' }}>
        <h1 style={{ color: c.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Your Impact</h1>
        <p style={{ color: c.textMuted, fontSize: 12, marginBottom: 20 }}>March 16–22 · This week</p>

        {/* Big Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
          <div style={{ background: `linear-gradient(140deg, ${c.primary}, ${isDark ? '#059669' : '#15803D'})`, borderRadius: 20, padding: '18px 16px', boxShadow: `0 8px 24px ${c.primaryGlow}` }}>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 600, marginBottom: 8 }}>💰 Money Saved</div>
            <div style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1 }}>${totalSaved}</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, marginTop: 6 }}>↑ $6.40 vs last week</div>
          </div>
          <div style={{ background: `linear-gradient(140deg, #0EA5E9, #0284C7)`, borderRadius: 20, padding: '18px 16px', boxShadow: '0 8px 24px rgba(14,165,233,0.3)' }}>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 600, marginBottom: 8 }}>🌱 CO₂ Avoided</div>
            <div style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{co2Saved}kg</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, marginTop: 6 }}>≈ 7.2km car journey</div>
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div style={{ background: c.surface, borderRadius: 20, padding: '18px 16px', marginBottom: 18, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ color: c.text, fontSize: 14, fontWeight: 800 }}>Daily Savings ($)</h3>
            <span style={{ color: c.primary, fontSize: 11, fontWeight: 700 }}>This Week</span>
          </div>
          <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end', height: 90 }}>
            {weekData.map((w, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{ width: '100%', height: 76, background: c.surfaceAlt, borderRadius: 8, display: 'flex', alignItems: 'flex-end', padding: '3px 3px' }}>
                  <div style={{
                    width: '100%',
                    background: i === 5 ? c.primary : isDark ? 'rgba(52,211,153,0.35)' : 'rgba(31,140,90,0.3)',
                    borderRadius: 5,
                    height: `${(w.val / w.max) * 100}%`,
                    transition: 'height 0.6s ease',
                  }} />
                </div>
                <span style={{ color: i === 5 ? c.primary : c.textMuted, fontSize: 9.5, fontWeight: 700 }}>{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div style={{ background: c.surface, borderRadius: 20, padding: '16px 18px', marginBottom: 18, boxShadow: c.shadow, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: c.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🔥</div>
          <div>
            <div style={{ color: c.text, fontSize: 20, fontWeight: 800 }}>14-Day Streak!</div>
            <div style={{ color: c.textMuted, fontSize: 12, marginTop: 2 }}>Zero food waste 14 days running</div>
          </div>
          <div style={{ marginLeft: 'auto', background: c.primaryLight, borderRadius: 12, padding: '6px 10px', textAlign: 'center' }}>
            <div style={{ color: c.primary, fontSize: 14, fontWeight: 800 }}>14</div>
            <div style={{ color: c.primary, fontSize: 9 }}>days</div>
          </div>
        </div>

        {/* Achievements */}
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Achievements</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 28 }}>
          {[
            { icon: '🥇', title: 'Zero Waste Week', desc: 'Completed a full week with no waste', earned: true, date: 'Mar 15' },
            { icon: '♻️', title: 'Rescue Chef', desc: 'Cooked 10+ rescue recipes', earned: true, date: 'Mar 20' },
            { icon: '🌍', title: 'Carbon Saver', desc: 'Avoided 5kg of CO₂ this month', earned: false, progress: 36 },
            { icon: '💸', title: 'Savvy Shopper', desc: 'Saved $50 on a single week', earned: false, progress: 49 },
          ].map((a, i) => (
            <div key={i} style={{
              background: c.surface, borderRadius: 18, padding: '14px 16px',
              border: `1.5px solid ${a.earned ? c.primary + '45' : c.border}`,
              display: 'flex', alignItems: 'center', gap: 12, boxShadow: c.shadow,
            }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: a.earned ? c.primaryLight : c.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, filter: a.earned ? 'none' : 'grayscale(0.7)', flexShrink: 0 }}>
                {a.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: c.text, fontSize: 13, fontWeight: 700 }}>{a.title}</span>
                  {a.earned && <span style={{ color: c.textMuted, fontSize: 10 }}>{a.date}</span>}
                </div>
                <div style={{ color: c.textMuted, fontSize: 11, marginTop: 2 }}>{a.desc}</div>
                {!a.earned && (
                  <div style={{ marginTop: 7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ color: c.textMuted, fontSize: 9.5 }}>Progress</span>
                      <span style={{ color: c.primary, fontSize: 9.5, fontWeight: 700 }}>{a.progress}%</span>
                    </div>
                    <div style={{ height: 5, background: c.border, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${a.progress}%`, background: c.primary, borderRadius: 4 }} />
                    </div>
                  </div>
                )}
              </div>
              {a.earned && React.createElement(window.lucide.CheckCircle2, { size: 18, color: c.primary })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const GroceryScreen = () => {
    const total = groceryItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    const alreadyHave = ['Spinach', 'Mushrooms', 'Bell Pepper', 'Cooked Rice', 'Soy Sauce', 'Garlic', 'Eggs', 'Greek Yogurt', 'Olive Oil'];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 0' }}>
        <h1 style={{ color: c.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Smart List</h1>
        <p style={{ color: c.textMuted, fontSize: 12, marginBottom: 18 }}>Buy only what you actually need</p>

        {/* Summary */}
        <div style={{ background: `linear-gradient(140deg, ${c.primary}, ${isDark ? '#059669' : '#15803D'})`, borderRadius: 20, padding: '16px 18px', marginBottom: 20, boxShadow: `0 8px 24px ${c.primaryGlow}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Items to buy</div>
              <div style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>{groceryItems.length - checkedGrocery.length} items</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 3 }}>Completes 4 rescue recipes</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Est. total</div>
              <div style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>${total.toFixed(2)}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 3 }}>vs ~$35 eating out</div>
            </div>
          </div>
        </div>

        {/* Already have */}
        <div style={{ marginBottom: 22 }}>
          <h3 style={{ color: c.textSub, fontSize: 12, fontWeight: 800, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {React.createElement(window.lucide.CheckCircle2, { size: 13, color: c.green })}
            Already in your kitchen ({alreadyHave.length})
          </h3>
          <div style={{ background: c.surfaceAlt, borderRadius: 16, padding: '4px 14px', border: `1px solid ${c.border}` }}>
            {alreadyHave.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < alreadyHave.length - 1 ? `1px solid ${c.border}` : 'none', opacity: 0.55 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: c.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide.Check, { size: 11, color: '#fff' })}
                </div>
                <span style={{ color: c.textSub, fontSize: 12.5, textDecoration: 'line-through' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Need to buy */}
        <h3 style={{ color: c.text, fontSize: 12, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {React.createElement(window.lucide.ShoppingCart, { size: 13, color: c.primary })}
          Need to buy
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {groceryItems.map(item => {
            const checked = checkedGrocery.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => setCheckedGrocery(prev => checked ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: c.surface, borderRadius: 16, padding: '13px 14px',
                  border: `1.5px solid ${checked ? c.primary + '50' : c.border}`,
                  cursor: 'pointer', boxShadow: c.shadow, opacity: checked ? 0.6 : 1,
                  transition: 'opacity 0.2s, border-color 0.2s',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 7,
                  border: `2px solid ${checked ? c.primary : c.border}`,
                  background: checked ? c.primary : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', flexShrink: 0,
                }}>
                  {checked && React.createElement(window.lucide.Check, { size: 13, color: '#fff' })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: c.text, fontSize: 13, fontWeight: 700, textDecoration: checked ? 'line-through' : 'none' }}>{item.name}</div>
                  <div style={{ color: c.textMuted, fontSize: 10.5 }}>For: {item.forRecipe} · {item.qty}</div>
                </div>
                <span style={{ color: c.primary, fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{item.price}</span>
              </div>
            );
          })}
        </div>

        <div style={{ background: c.greenLight, borderRadius: 16, padding: '14px 16px', marginBottom: 28, border: `1px solid ${c.green}30`, display: 'flex', alignItems: 'center', gap: 10 }}>
          {React.createElement(window.lucide.TrendingDown, { size: 18, color: c.green })}
          <div>
            <div style={{ color: c.green, fontSize: 12, fontWeight: 800 }}>Save ~$18 this week</div>
            <div style={{ color: c.textSub, fontSize: 11 }}>vs buying without checking your pantry first</div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'pantry', label: 'Pantry', icon: window.lucide.Package },
    { id: 'recipes', label: 'Recipes', icon: window.lucide.ChefHat },
    { id: 'impact', label: 'Impact', icon: window.lucide.Leaf },
    { id: 'grocery', label: 'List', icon: window.lucide.ShoppingCart },
  ];

  const screens = {
    home: HomeScreen,
    pantry: PantryScreen,
    recipes: RecipesScreen,
    impact: ImpactScreen,
    grocery: GroceryScreen,
  };

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{ minHeight: '100vh', background: isDark ? '#1a1a1a' : '#e4e9e6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{
          width: 375,
          height: 812,
          background: c.bg,
          borderRadius: 50,
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 50px 120px rgba(0,0,0,0.7), 0 0 0 10px #111, 0 0 0 12px #222'
            : '0 50px 120px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1a, 0 0 0 12px #333',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transition: 'background 0.3s',
        }}>
          <StatusBar />
          <DynamicIsland />

          {/* Screen Content */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {React.createElement(screens[activeTab])}
          </div>

          {/* Bottom Nav */}
          <div style={{
            display: 'flex',
            background: c.navBg,
            borderTop: `1px solid ${c.border}`,
            padding: '8px 4px 22px',
            boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.4)' : '0 -4px 20px rgba(0,0,0,0.06)',
            transition: 'background 0.3s',
            flexShrink: 0,
          }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); if (tab.id !== 'recipes') setActiveRecipe(null); }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 0' }}
                >
                  <div style={{
                    width: 38, height: 32, borderRadius: 12,
                    background: isActive ? c.primaryLight : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    {React.createElement(tab.icon, { size: 20, color: isActive ? c.primary : c.textMuted, strokeWidth: isActive ? 2.5 : 1.8 })}
                  </div>
                  <span style={{ fontSize: 9.5, fontWeight: isActive ? 800 : 500, color: isActive ? c.primary : c.textMuted, transition: 'color 0.2s' }}>
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
