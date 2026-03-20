const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pantryFilter, setPantryFilter] = useState('all');
  const [recipeFilter, setRecipeFilter] = useState('all');
  const [pressed, setPressed] = useState(null);
  const [dismissed, setDismissed] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeAppliances, setActiveAppliances] = useState(['stovetop', 'oven', 'microwave']);
  const [skillLevel, setSkillLevel] = useState('intermediate');
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { background: #050A07; }
    `;
    document.head.appendChild(style);
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const press = (id) => { setPressed(id); setTimeout(() => setPressed(null), 150); };

  const C = {
    bg: '#0B1A0F',
    card: '#122118',
    cardB: '#1A3028',
    primary: '#4ADE80',
    pDark: '#16A34A',
    accent: '#FB923C',
    red: '#F87171',
    amber: '#FBBF24',
    blue: '#60A5FA',
    text: '#F0FDF4',
    muted: '#86EFAC',
    dim: '#3D6B4A',
    border: '#1E3828',
    nav: '#0D1F14',
  };

  const items = [
    { id: 1, name: 'Baby Spinach', qty: '80g', cat: 'fridge', days: 0, emoji: '🥬' },
    { id: 2, name: 'Fresh Herbs', qty: '1 bunch', cat: 'fridge', days: 1, emoji: '🌿' },
    { id: 3, name: 'Greek Yogurt', qty: '200ml', cat: 'fridge', days: 1, emoji: '🥛' },
    { id: 4, name: 'Bell Pepper', qty: '½ piece', cat: 'fridge', days: 2, emoji: '🫑' },
    { id: 5, name: 'Cooked Rice', qty: '1 cup', cat: 'fridge', days: 2, emoji: '🍚' },
    { id: 6, name: 'Mushrooms', qty: '150g', cat: 'fridge', days: 2, emoji: '🍄' },
    { id: 7, name: 'Free-range Eggs', qty: '4 left', cat: 'fridge', days: 6, emoji: '🥚' },
    { id: 8, name: 'Cheddar Cheese', qty: '100g', cat: 'fridge', days: 8, emoji: '🧀' },
    { id: 9, name: 'Garlic', qty: '3 cloves', cat: 'pantry', days: 10, emoji: '🧄' },
    { id: 10, name: 'Chicken Breast', qty: '300g', cat: 'freezer', days: 45, emoji: '🍗' },
    { id: 11, name: 'Pasta', qty: '200g', cat: 'pantry', days: 240, emoji: '🍝' },
    { id: 12, name: 'Olive Oil', qty: 'bottle', cat: 'pantry', days: 180, emoji: '🫒' },
  ];

  const recipes = [
    {
      id: 1, name: 'Spinach & Egg Scramble', time: 8, difficulty: 'Easy',
      tag: 'SAVE TODAY', tagC: '#F87171', emoji: '🍳', match: 100,
      saves: ['Baby Spinach', 'Free-range Eggs'],
      desc: 'Quick protein-packed scramble using the most urgent greens in your fridge.',
      steps: [
        'Heat 1 tsp olive oil in a pan over medium heat',
        'Add baby spinach, wilt for 1 minute tossing gently',
        'Beat 2 eggs with a pinch of salt and pepper',
        'Pour eggs over spinach, scramble gently for 2–3 min',
        'Season with chili flakes and serve immediately',
      ],
      appliances: ['stovetop'],
    },
    {
      id: 2, name: 'Herb-Bell Pepper Fried Rice', time: 12, difficulty: 'Easy',
      tag: 'SAVE SOON', tagC: '#FBBF24', emoji: '🍱', match: 98,
      saves: ['Bell Pepper', 'Cooked Rice', 'Fresh Herbs'],
      desc: 'Transform leftover rice and aging veggies into a satisfying Asian-style meal.',
      steps: [
        'Dice bell pepper into small even pieces',
        'Heat oil in a wok or wide pan over high heat',
        'Add garlic and bell pepper, stir-fry for 2 min',
        'Add cooked rice, break up any clumps firmly',
        'Season with soy sauce, top generously with fresh herbs',
      ],
      appliances: ['stovetop'],
    },
    {
      id: 3, name: 'Mushroom Herb Omelette', time: 10, difficulty: 'Easy',
      tag: 'SAVE SOON', tagC: '#FBBF24', emoji: '🥚', match: 95,
      saves: ['Mushrooms', 'Fresh Herbs', 'Free-range Eggs'],
      desc: 'Fragrant omelette with earthy mushrooms before they start to turn soft.',
      steps: [
        'Slice mushrooms thinly for even cooking',
        'Sauté mushrooms in butter for 3–4 min until golden',
        'Beat 3 eggs, stir in chopped fresh herbs',
        'Pour egg mixture over mushrooms in the pan',
        'Fold omelette and serve with a pinch of cheese',
      ],
      appliances: ['stovetop'],
    },
    {
      id: 4, name: 'Yogurt Spinach Dip', time: 5, difficulty: 'Easy',
      tag: '5 MIN RESCUE', tagC: '#4ADE80', emoji: '🥗', match: 90,
      saves: ['Baby Spinach', 'Greek Yogurt'],
      desc: 'Microwave wilting spinach into a creamy, protein-rich dip in minutes.',
      steps: [
        'Microwave spinach for 90 seconds until fully wilted',
        'Squeeze out all excess moisture with a cloth',
        'Blend with Greek yogurt, one garlic clove, lemon juice',
        'Season generously with salt, pepper, and olive oil',
        'Serve with crackers, bread, or veggie sticks',
      ],
      appliances: ['microwave'],
    },
  ];

  const alerts = [
    { id: 1, sev: 'critical', item: 'Baby Spinach', msg: 'Expires today', action: 'Cook or blend tonight', detail: "Use in eggs, a smoothie, or wilt into pasta. Don't let it go.", emoji: '🥬' },
    { id: 2, sev: 'critical', item: 'Fresh Herbs', msg: 'Expires tomorrow', action: 'Freeze in olive oil now', detail: 'Chop and freeze in ice cube trays with oil — saves for months.', emoji: '🌿' },
    { id: 3, sev: 'warning', item: 'Greek Yogurt', msg: '1 day left', action: 'Make a dip or smoothie', detail: 'Blend with spinach or use as a base for a quick sauce tonight.', emoji: '🥛' },
    { id: 4, sev: 'warning', item: 'Bell Pepper', msg: '2 days left', action: 'Slice into dinner', detail: 'Best in stir-fry, fried rice, or stuffed with cooked rice.', emoji: '🫑' },
    { id: 5, sev: 'warning', item: 'Cooked Rice', msg: '2 days left', action: 'Make fried rice or freeze', detail: 'Fried rice works best with day-old rice. Perfect timing — do it now.', emoji: '🍚' },
    { id: 6, sev: 'info', item: 'Mushrooms', msg: '2 days left', action: 'Plan for tomorrow', detail: 'Sauté with butter and herbs or fold into a quick omelette.', emoji: '🍄' },
  ];

  const urgColor = (d) => d === 0 ? C.red : d <= 2 ? C.amber : d <= 5 ? C.primary : C.dim;
  const urgLabel = (d) => d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : d <= 5 ? `${d} days` : `${d}d`;
  const urgBg = (d) => d === 0 ? '#1F0808' : d <= 2 ? '#1F1400' : d <= 5 ? '#0A2210' : 'transparent';

  const activeAlerts = alerts.filter(a => !dismissed.includes(a.id));

  const filteredItems = items
    .filter(i => pantryFilter === 'all' ? true : pantryFilter === 'expiring' ? i.days <= 2 : i.cat === pantryFilter)
    .sort((a, b) => a.days - b.days);

  const filteredRecipes = recipes.filter(r =>
    recipeFilter === 'all' ? true :
    recipeFilter === 'quick' ? r.time <= 10 :
    recipeFilter === 'microwave' ? r.appliances.includes('microwave') : true
  );

  const pill = (active, color = C.primary) => ({
    padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
    background: active ? color + '20' : 'transparent',
    color: active ? color : C.dim,
    border: `1px solid ${active ? color + '60' : C.border}`,
    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0,
  });

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.15s',
    cursor: 'pointer',
  });

  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px 0', height: 44, flexShrink: 0 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: 0.3 }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Signal, { size: 14, color: C.text })}
        {React.createElement(window.lucide.Wifi, { size: 14, color: C.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: C.text })}
      </div>
    </div>
  );

  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 4px', flexShrink: 0 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a2a1a', border: '1px solid #2a3a2a' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', border: '1px solid #2a2a2a' }} />
      </div>
    </div>
  );

  const BottomNav = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: window.lucide.Home },
      { id: 'pantry', label: 'Pantry', icon: window.lucide.Package },
      { id: 'recipes', label: 'Recipes', icon: window.lucide.ChefHat },
      { id: 'alerts', label: 'Alerts', icon: window.lucide.Bell, badge: activeAlerts.filter(a => a.sev === 'critical').length },
      { id: 'profile', label: 'Profile', icon: window.lucide.User },
    ];
    return (
      <div style={{ background: C.nav, borderTop: `1px solid ${C.border}`, display: 'flex', padding: '8px 0 20px', flexShrink: 0 }}>
        {tabs.map(t => {
          const active = activeTab === t.id;
          return (
            <div key={t.id} onClick={() => { setActiveTab(t.id); setSelectedRecipe(null); }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', position: 'relative' }}>
              {active && <div style={{ position: 'absolute', top: -8, width: 28, height: 3, borderRadius: 2, background: C.primary }} />}
              <div style={{ position: 'relative' }}>
                {React.createElement(t.icon, { size: 22, color: active ? C.primary : C.dim, strokeWidth: active ? 2.5 : 1.5 })}
                {t.badge > 0 && (
                  <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>
                    {t.badge}
                  </div>
                )}
              </div>
              <span style={{ fontSize: 10, color: active ? C.primary : C.dim, fontWeight: active ? 600 : 400 }}>{t.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const HomeScreen = () => {
    const todayItems = items.filter(i => i.days === 0);
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 0' }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 3, fontWeight: 500 }}>Friday, March 20</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1.2 }}>Good morning, Sarah 👋</div>
        </div>

        {todayItems.length > 0 && (
          <div onClick={() => setActiveTab('alerts')} style={{ background: '#1F0808', border: '1px solid #5A1818', borderRadius: 16, padding: '12px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            {React.createElement(window.lucide.AlertTriangle, { size: 18, color: C.red })}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{todayItems.length} item{todayItems.length > 1 ? 's' : ''} expiring today</div>
              <div style={{ fontSize: 11, color: '#FCA5A5', marginTop: 2 }}>{todayItems.map(i => i.name).join(', ')}</div>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 16, color: C.red })}
          </div>
        )}

        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>⚡ Today's Rescue Recipe</div>
        <div onClick={() => { setSelectedRecipe(recipes[0]); setActiveTab('recipes'); press('hero'); }}
          style={btnStyle('hero', { background: 'linear-gradient(135deg, #1A3520 0%, #0F2018 100%)', border: '1px solid #2A5030', borderRadius: 20, padding: 18, marginBottom: 20 })}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ background: '#F8717120', border: '1px solid #F87171', borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 700, color: C.red }}>SAVE TODAY</div>
            <span style={{ fontSize: 38 }}>🍳</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 5 }}>Spinach & Egg Scramble</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 14, lineHeight: 1.4 }}>Uses your most urgent ingredients before they spoil — ready in 8 minutes</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { icon: window.lucide.Clock, label: '8 min' },
              { icon: window.lucide.Zap, label: 'Easy' },
              { icon: window.lucide.Leaf, label: 'Saves 2 items' },
            ].map((chip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#0B1A0F', border: `1px solid ${C.border}`, borderRadius: 8, padding: '5px 10px' }}>
                {React.createElement(chip.icon, { size: 12, color: C.muted })}
                <span style={{ fontSize: 11, color: C.muted }}>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>⏰ Expiring Soon</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
          {items.filter(i => i.days <= 3).map(item => (
            <div key={item.id} style={{ flexShrink: 0, background: urgBg(item.days), border: `1px solid ${urgColor(item.days)}40`, borderRadius: 14, padding: '10px 12px', textAlign: 'center', minWidth: 70 }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{item.emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.text, marginBottom: 3 }}>{item.name.split(' ')[0]}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: urgColor(item.days) }}>{urgLabel(item.days)}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>📊 This Week</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Items Saved', value: '12', icon: window.lucide.Check, color: C.primary },
            { label: 'Meals Made', value: '8', icon: window.lucide.ChefHat, color: C.accent },
            { label: 'kg Rescued', value: '1.4', icon: window.lucide.TrendingDown, color: C.blue },
          ].map((s, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                {React.createElement(s.icon, { size: 16, color: s.color })}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>🔔 Rescue Alerts</div>
        {activeAlerts.slice(0, 2).map(alert => (
          <div key={alert.id} onClick={() => setActiveTab('alerts')} style={{ background: C.card, border: `1px solid ${alert.sev === 'critical' ? C.red + '30' : C.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <span style={{ fontSize: 22 }}>{alert.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{alert.action}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{alert.item} · {alert.msg}</div>
            </div>
            <div style={{ background: alert.sev === 'critical' ? C.red : C.amber, borderRadius: 8, padding: '4px 8px', fontSize: 10, fontWeight: 700, color: '#000' }}>
              {alert.sev === 'critical' ? 'NOW' : 'SOON'}
            </div>
          </div>
        ))}
        <div style={{ height: 100 }} />
      </div>
    );
  };

  const PantryScreen = () => {
    const cats = [
      { id: 'all', label: 'All' },
      { id: 'expiring', label: '⚠️ Expiring' },
      { id: 'fridge', label: '🌡️ Fridge' },
      { id: 'freezer', label: '❄️ Freezer' },
      { id: 'pantry', label: '🫙 Pantry' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>Your Pantry</div>
            <div style={{ fontSize: 12, color: C.muted }}>{items.length} items · {items.filter(i => i.days <= 2).length} need attention</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {React.createElement(window.lucide.Scan, { size: 20, color: C.muted })}
            <div style={{ width: 36, height: 36, borderRadius: 12, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.Plus, { size: 18, color: '#000' })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 14, paddingBottom: 4 }}>
          {cats.map(c => (
            <div key={c.id} onClick={() => setPantryFilter(c.id)} style={pill(pantryFilter === c.id)}>{c.label}</div>
          ))}
        </div>

        {filteredItems.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', background: urgBg(item.days) || C.card, border: `1px solid ${item.days <= 2 ? urgColor(item.days) + '40' : C.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 9, gap: 12 }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.name}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{item.qty} · {item.cat}</div>
            </div>
            <div style={{ background: urgColor(item.days) + '20', border: `1px solid ${urgColor(item.days)}50`, borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: urgColor(item.days), flexShrink: 0 }}>
              {urgLabel(item.days)}
            </div>
          </div>
        ))}

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '14px 16px', marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Pantry Health</div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {[
              { label: 'Today', count: items.filter(i => i.days === 0).length, color: C.red },
              { label: '1–2 Days', count: items.filter(i => i.days > 0 && i.days <= 2).length, color: C.amber },
              { label: 'This Week', count: items.filter(i => i.days > 2 && i.days <= 7).length, color: C.primary },
              { label: 'All Good', count: items.filter(i => i.days > 7).length, color: C.dim },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.count}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 100 }} />
      </div>
    );
  };

  const RecipeDetail = ({ recipe }) => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', cursor: 'pointer' }} onClick={() => setSelectedRecipe(null)}>
        {React.createElement(window.lucide.ArrowLeft, { size: 20, color: C.primary })}
        <span style={{ fontSize: 14, color: C.primary, fontWeight: 600 }}>Back to Recipes</span>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1A3520, #0F2018)', border: `1px solid #2A5030`, borderRadius: 20, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div style={{ background: recipe.tagC + '25', border: `1px solid ${recipe.tagC}`, borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 700, color: recipe.tagC }}>{recipe.tag}</div>
          <span style={{ fontSize: 40 }}>{recipe.emoji}</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>{recipe.name}</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 14, lineHeight: 1.5 }}>{recipe.desc}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { icon: window.lucide.Clock, label: `${recipe.time} min` },
            { icon: window.lucide.Zap, label: recipe.difficulty },
          ].map((chip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, background: C.card, borderRadius: 9, padding: '6px 12px' }}>
              {React.createElement(chip.icon, { size: 13, color: C.muted })}
              <span style={{ fontSize: 12, color: C.muted }}>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Saves These Items</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {recipe.saves.map(s => {
          const item = items.find(i => i.name === s);
          return (
            <div key={s} style={{ background: '#0A2210', border: `1px solid ${C.primary}40`, borderRadius: 10, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>{item?.emoji || '🌿'}</span>
              <span style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}>{s}</span>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Steps</div>
      {recipe.steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.pDark, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: '#fff' }}>{i + 1}</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55, paddingTop: 4 }}>{step}</div>
        </div>
      ))}

      <div onClick={() => press('cook')} style={btnStyle('cook', { background: C.primary, borderRadius: 16, padding: 16, textAlign: 'center', marginTop: 16, marginBottom: 8 })}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#000' }}>🍳 Start Cooking</span>
      </div>
      <div style={{ height: 100 }} />
    </div>
  );

  const RecipesScreen = () => {
    if (selectedRecipe) return <RecipeDetail recipe={selectedRecipe} />;
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'quick', label: '⚡ Under 10 min' },
      { id: 'microwave', label: '📡 Microwave' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 0' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>Rescue Recipes</div>
          <div style={{ fontSize: 12, color: C.muted }}>Ranked by what needs saving first</div>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 14, paddingBottom: 4 }}>
          {filters.map(f => (
            <div key={f.id} onClick={() => setRecipeFilter(f.id)} style={pill(recipeFilter === f.id)}>{f.label}</div>
          ))}
        </div>

        {filteredRecipes.map((recipe, idx) => (
          <div key={recipe.id} onClick={() => { setSelectedRecipe(recipe); press(`r${idx}`); }}
            style={btnStyle(`r${idx}`, { background: C.card, border: `1px solid ${recipe.tagC}30`, borderRadius: 18, padding: 16, marginBottom: 12, cursor: 'pointer' })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ background: recipe.tagC + '20', border: `1px solid ${recipe.tagC}60`, borderRadius: 8, padding: '3px 8px', fontSize: 10, fontWeight: 700, color: recipe.tagC }}>{recipe.tag}</div>
              <span style={{ fontSize: 32 }}>{recipe.emoji}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{recipe.name}</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 12, lineHeight: 1.4 }}>{recipe.desc}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {recipe.saves.map(s => {
                const item = items.find(i => i.name === s);
                return (
                  <div key={s} style={{ background: '#0A2210', borderRadius: 8, padding: '3px 8px', fontSize: 10, color: C.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>{item?.emoji || '🌿'}</span>{s.split(' ')[0]}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(window.lucide.Clock, { size: 12, color: C.muted })}
                  <span style={{ fontSize: 11, color: C.muted }}>{recipe.time}m</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(window.lucide.Zap, { size: 12, color: C.muted })}
                  <span style={{ fontSize: 11, color: C.muted }}>{recipe.difficulty}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 40, height: 4, borderRadius: 2, background: C.border, overflow: 'hidden' }}>
                  <div style={{ width: `${recipe.match}%`, height: '100%', background: C.primary, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 10, color: C.primary, fontWeight: 700 }}>{recipe.match}%</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: 100 }} />
      </div>
    );
  };

  const AlertsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>Rescue Alerts</div>
          <div style={{ fontSize: 12, color: C.muted }}>{activeAlerts.length} active · {activeAlerts.filter(a => a.sev === 'critical').length} urgent</div>
        </div>
        {activeAlerts.filter(a => a.sev === 'critical').length > 0 && (
          <div style={{ background: C.red + '20', border: `1px solid ${C.red}`, borderRadius: 12, padding: '4px 12px', fontSize: 12, fontWeight: 700, color: C.red }}>
            {activeAlerts.filter(a => a.sev === 'critical').length} critical
          </div>
        )}
      </div>

      {activeAlerts.filter(a => a.sev === 'critical').length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>🔴 Critical — Act Now</div>
          {activeAlerts.filter(a => a.sev === 'critical').map(alert => (
            <div key={alert.id} style={{ background: '#1A0A0A', border: '1px solid #5A1818', borderRadius: 16, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 26 }}>{alert.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{alert.item}</div>
                  <div style={{ fontSize: 11, color: C.red, marginTop: 2 }}>{alert.msg}</div>
                  <div style={{ fontSize: 12, color: '#FCA5A5', marginTop: 6, lineHeight: 1.4 }}>{alert.detail}</div>
                </div>
                <div onClick={() => setDismissed(d => [...d, alert.id])} style={{ cursor: 'pointer', opacity: 0.5, padding: 2 }}>
                  {React.createElement(window.lucide.X, { size: 16, color: C.muted })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div onClick={() => { setSelectedRecipe(recipes[0]); setActiveTab('recipes'); }}
                  style={{ flex: 1, background: C.red, borderRadius: 10, padding: '9px', textAlign: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>🍳 Cook Now</span>
                </div>
                <div onClick={() => press(`freeze-${alert.id}`)} style={btnStyle(`freeze-${alert.id}`, { background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '9px 16px', cursor: 'pointer' })}>
                  <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Freeze</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {activeAlerts.filter(a => a.sev === 'warning').length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 8 }}>🟡 Use This Week</div>
          {activeAlerts.filter(a => a.sev === 'warning').map(alert => (
            <div key={alert.id} style={{ background: C.card, border: `1px solid ${C.amber}30`, borderRadius: 16, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 26 }}>{alert.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{alert.item}</div>
                  <div style={{ fontSize: 11, color: C.amber, marginTop: 2 }}>{alert.msg}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 6, lineHeight: 1.4 }}>{alert.detail}</div>
                </div>
                <div onClick={() => setDismissed(d => [...d, alert.id])} style={{ cursor: 'pointer', opacity: 0.5, padding: 2 }}>
                  {React.createElement(window.lucide.X, { size: 16, color: C.muted })}
                </div>
              </div>
              <div onClick={() => setActiveTab('recipes')} style={{ background: C.amber + '20', border: `1px solid ${C.amber}50`, borderRadius: 10, padding: '8px', textAlign: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.amber }}>👨‍🍳 See rescue recipes →</span>
              </div>
            </div>
          ))}
        </>
      )}

      {activeAlerts.filter(a => a.sev === 'info').length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 8 }}>🟢 On Your Radar</div>
          {activeAlerts.filter(a => a.sev === 'info').map(alert => (
            <div key={alert.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24 }}>{alert.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{alert.action}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{alert.item} · {alert.msg}</div>
              </div>
              <div onClick={() => setDismissed(d => [...d, alert.id])} style={{ cursor: 'pointer', opacity: 0.4 }}>
                {React.createElement(window.lucide.X, { size: 16, color: C.muted })}
              </div>
            </div>
          ))}
        </>
      )}

      {activeAlerts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>All clear!</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>No urgent alerts right now. Your fridge is looking great.</div>
        </div>
      )}
      <div style={{ height: 100 }} />
    </div>
  );

  const ProfileScreen = () => {
    const appliances = [
      { id: 'stovetop', label: 'Stovetop', emoji: '🍳' },
      { id: 'oven', label: 'Oven', emoji: '🔥' },
      { id: 'microwave', label: 'Microwave', emoji: '📡' },
      { id: 'airfryer', label: 'Air Fryer', emoji: '💨' },
      { id: 'blender', label: 'Blender', emoji: '🌀' },
    ];
    const skills = [
      { id: 'beginner', label: 'Beginner', desc: 'Simple recipes' },
      { id: 'intermediate', label: 'Intermediate', desc: 'Some skill' },
      { id: 'advanced', label: 'Advanced', desc: 'Any recipe' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${C.pDark}, ${C.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0 }}>S</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Sarah Chen</div>
            <div style={{ fontSize: 12, color: C.muted }}>Member since March 2024</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
              {React.createElement(window.lucide.Leaf, { size: 12, color: C.primary })}
              <span style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}>Eco Warrior · 47 items rescued</span>
            </div>
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Impact Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Items Rescued', value: '47', unit: 'total', color: C.primary },
              { label: 'Meals Cooked', value: '23', unit: 'recipes', color: C.accent },
              { label: 'Waste Saved', value: '3.2', unit: 'kg', color: C.blue },
              { label: 'Day Streak', value: '5', unit: '🔥 days', color: C.amber },
            ].map((s, i) => (
              <div key={i} style={{ background: C.cardB, borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value} <span style={{ fontSize: 11, fontWeight: 400, color: C.muted }}>{s.unit}</span></div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>My Kitchen Tools</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {appliances.map(a => {
              const active = activeAppliances.includes(a.id);
              return (
                <div key={a.id} onClick={() => setActiveAppliances(prev => active ? prev.filter(x => x !== a.id) : [...prev, a.id])}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 11, background: active ? C.primary + '20' : C.cardB, border: `1px solid ${active ? C.primary + '60' : C.border}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: 14 }}>{a.emoji}</span>
                  <span style={{ fontSize: 12, color: active ? C.primary : C.dim, fontWeight: active ? 600 : 400 }}>{a.label}</span>
                  {active && React.createElement(window.lucide.Check, { size: 12, color: C.primary })}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Cooking Skill Level</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {skills.map(s => {
              const active = skillLevel === s.id;
              return (
                <div key={s.id} onClick={() => setSkillLevel(s.id)}
                  style={{ flex: 1, padding: '10px 8px', borderRadius: 12, background: active ? C.primary + '20' : C.cardB, border: `1px solid ${active ? C.primary + '60' : C.border}`, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 12, color: active ? C.primary : C.muted, fontWeight: active ? 700 : 400 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 3 }}>{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Achievements</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {[
              { emoji: '🏆', label: 'First Save', unlocked: true },
              { emoji: '🌿', label: 'Eco Warrior', unlocked: true },
              { emoji: '🍳', label: '10 Meals', unlocked: true },
              { emoji: '♻️', label: 'Zero Waste', unlocked: false },
              { emoji: '⭐', label: 'Chef Mode', unlocked: false },
            ].map((a, i) => (
              <div key={i} style={{ textAlign: 'center', opacity: a.unlocked ? 1 : 0.3 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{a.emoji}</div>
                <div style={{ fontSize: 9, color: a.unlocked ? C.primary : C.dim, fontWeight: 600 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 100 }} />
      </div>
    );
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'pantry': return <PantryScreen />;
      case 'recipes': return <RecipesScreen />;
      case 'alerts': return <AlertsScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'radial-gradient(ellipse at 50% 0%, #0D2B15 0%, #050A07 60%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ width: 375, height: 812, background: C.bg, borderRadius: 54, overflow: 'hidden', position: 'relative', boxShadow: '0 0 0 10px #0F1A12, 0 0 0 12px #1A2E1E, 0 60px 120px rgba(0,0,0,0.8), 0 0 80px rgba(74,222,128,0.04)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        <DynamicIsland />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {renderScreen()}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
