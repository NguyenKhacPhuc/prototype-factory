
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activeCookMode, setActiveCookMode] = useState(false);
  const [cookStep, setCookStep] = useState(0);
  const [scanMode, setScanMode] = useState(false);
  const [scanStage, setScanStage] = useState(0);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [expandedItem, setExpandedItem] = useState(null);
  const [showSubstitution, setShowSubstitution] = useState(null);
  const [leftoversView, setLeftoversView] = useState('active');
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      .scroll-container { overflow-y: auto; -webkit-overflow-scrolling: touch; }
    `;
    document.head.appendChild(style);
    const updateTime = () => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => { clearInterval(interval); document.head.removeChild(style); };
  }, []);

  const colors = {
    bg: '#0F1409',
    card: '#1C2010',
    cardHover: '#232916',
    border: '#2E3820',
    primary: '#A8C44A',
    primaryDark: '#8BAF30',
    primaryGlow: 'rgba(168,196,74,0.15)',
    accent: '#E8875A',
    accentGlow: 'rgba(232,135,90,0.15)',
    warning: '#F5C842',
    warningGlow: 'rgba(245,200,66,0.12)',
    urgent: '#E85A5A',
    urgentGlow: 'rgba(232,90,90,0.12)',
    text: '#F0F4E8',
    textMuted: '#8A9A70',
    textFaint: '#4A5A35',
    navBg: '#141A0C',
    overlay: 'rgba(0,0,0,0.85)',
  };

  const pantryItems = [
    { id: 1, name: 'Eggs', qty: '4 left', category: 'Dairy & Eggs', urgency: 'urgent', daysLeft: 2, icon: '🥚', note: 'Expires in 2 days' },
    { id: 2, name: 'Pesto', qty: '½ jar', category: 'Condiments', urgency: 'soon', daysLeft: 5, icon: '🫙', note: 'Opened 10 days ago' },
    { id: 3, name: 'Yellow Onion', qty: '½ onion', category: 'Produce', urgency: 'soon', daysLeft: 4, icon: '🧅', note: 'Cut, refrigerated' },
    { id: 4, name: 'Cherry Tomatoes', qty: 'Handful', category: 'Produce', urgency: 'urgent', daysLeft: 1, icon: '🍅', note: 'Use today!' },
    { id: 5, name: 'Parmesan', qty: '~80g', category: 'Dairy & Eggs', urgency: 'good', daysLeft: 18, icon: '🧀', note: 'Sealed' },
    { id: 6, name: 'Pasta (penne)', qty: '200g', category: 'Pantry', urgency: 'good', daysLeft: 180, icon: '🍝', note: 'Dry, unopened' },
    { id: 7, name: 'Garlic', qty: '3 cloves', category: 'Produce', urgency: 'good', daysLeft: 12, icon: '🧄', note: 'Whole head' },
    { id: 8, name: 'Olive Oil', qty: 'Half bottle', category: 'Pantry', urgency: 'good', daysLeft: 90, icon: '🫒', note: 'Extra virgin' },
    { id: 9, name: 'Chicken Thighs', qty: '2 pieces', category: 'Meat', urgency: 'soon', daysLeft: 3, icon: '🍗', note: 'Raw, refrigerated' },
    { id: 10, name: 'Spinach', qty: 'Big handful', category: 'Produce', urgency: 'urgent', daysLeft: 2, icon: '🥬', note: 'Wilting slightly' },
  ];

  const recipes = [
    {
      id: 1,
      name: 'Pesto Egg Pasta',
      time: '18 min',
      effort: 'Easy',
      match: 98,
      urgencyScore: 'Use Now',
      urgencyColor: colors.urgent,
      uses: ['Eggs', 'Pesto', 'Pasta (penne)', 'Parmesan', 'Cherry Tomatoes'],
      rescueNote: 'Saves 3 expiring ingredients today',
      tools: ['Pot', 'Pan'],
      tags: ['Vegetarian', 'Quick'],
      image: '🍝',
      steps: [
        { step: 1, action: 'Boil pasta', detail: 'Cook penne in salted boiling water for 10 min until al dente. Reserve ½ cup pasta water before draining.', time: '12 min' },
        { step: 2, action: 'Fry the eggs', detail: 'In a non-stick pan, heat olive oil over medium. Crack 2 eggs in. Cook sunny-side up or scrambled — your call. Season with salt and pepper.', time: '3 min' },
        { step: 3, action: 'Combine', detail: 'Toss warm pasta with pesto and a splash of pasta water. Plate it up, add the egg on top, scatter cherry tomatoes, and finish with parmesan.', time: '2 min' },
        { step: 4, action: 'Serve', detail: 'Eat immediately while the egg is still warm. Optional: drizzle extra olive oil and crack black pepper generously.', time: '1 min' },
      ],
      substitutions: [
        { missing: 'Pesto', use: 'Olive oil + garlic + any herb', note: 'Blend or just toss raw' },
        { missing: 'Parmesan', use: 'Nutritional yeast or any hard cheese', note: 'Pecorino works great' },
      ]
    },
    {
      id: 2,
      name: 'Garlic Spinach Chicken',
      time: '25 min',
      effort: 'Medium',
      match: 91,
      urgencyScore: 'Use Soon',
      urgencyColor: colors.warning,
      uses: ['Chicken Thighs', 'Spinach', 'Garlic', 'Olive Oil', 'Yellow Onion'],
      rescueNote: 'Rescues wilting spinach & raw chicken',
      tools: ['Oven', 'Pan'],
      tags: ['High Protein', 'Gluten Free'],
      image: '🍗',
      steps: [
        { step: 1, action: 'Prep chicken', detail: 'Pat chicken thighs dry with paper towel. Season both sides with salt, pepper, and a pinch of garlic powder.', time: '3 min' },
        { step: 2, action: 'Sear chicken', detail: 'Heat oil in an oven-safe pan over high heat. Sear chicken skin-side down for 4 min until golden. Flip and cook 2 more min.', time: '6 min' },
        { step: 3, action: 'Add aromatics', detail: 'Push chicken aside, add sliced onion and minced garlic to the pan. Cook 2 min until fragrant.', time: '2 min' },
        { step: 4, action: 'Wilt spinach & finish', detail: 'Add spinach, stir until wilted (1 min). Transfer pan to 375°F oven for 12 min until chicken is cooked through.', time: '14 min' },
      ],
      substitutions: [
        { missing: 'Chicken Thighs', use: 'Chicken breast or thighs, boneless', note: 'Reduce oven time to 8 min' },
        { missing: 'Fresh Spinach', use: 'Frozen spinach (thawed)', note: 'Squeeze out excess water first' },
      ]
    },
    {
      id: 3,
      name: 'Tomato Egg Scramble',
      time: '10 min',
      effort: 'Easy',
      match: 87,
      urgencyScore: 'Use Now',
      urgencyColor: colors.urgent,
      uses: ['Eggs', 'Cherry Tomatoes', 'Garlic', 'Olive Oil'],
      rescueNote: 'Perfect for last-day tomatoes',
      tools: ['Pan'],
      tags: ['Vegetarian', 'Breakfast', 'Quick'],
      image: '🍳',
      steps: [
        { step: 1, action: 'Cook tomatoes', detail: 'Heat olive oil in pan over medium-high. Add halved cherry tomatoes and a crushed garlic clove. Cook 3 min until tomatoes burst and soften.', time: '3 min' },
        { step: 2, action: 'Scramble eggs', detail: 'Beat 3 eggs with a pinch of salt. Pour over tomatoes, reduce to medium heat. Gently fold eggs as they set — keep them soft and creamy.', time: '4 min' },
        { step: 3, action: 'Finish', detail: 'Remove from heat while eggs are still slightly glossy. They\'ll finish cooking in residual heat. Season and serve immediately.', time: '2 min' },
      ],
      substitutions: []
    },
  ];

  const leftovers = [
    {
      id: 1,
      original: 'Roast Chicken',
      date: 'Made Mar 18',
      transformations: [
        { meal: 'Chicken Tacos', done: true, date: 'Mar 19', icon: '🌮' },
        { meal: 'Chicken Broth Soup', done: true, date: 'Mar 20', icon: '🍲' },
        { meal: 'Chicken Sandwich', done: false, date: 'Planned', icon: '🥪' },
      ],
      remaining: '~120g chicken, 2 cups broth',
      status: 'active',
    },
    {
      id: 2,
      original: 'Pesto Pasta',
      date: 'Made Mar 20',
      transformations: [
        { meal: 'Cold Pasta Salad', done: false, date: 'Suggested', icon: '🥗' },
        { meal: 'Pasta Frittata', done: false, date: 'Suggested', icon: '🍳' },
      ],
      remaining: '1 serving pasta, pesto',
      status: 'active',
    },
    {
      id: 3,
      original: 'Vegetable Stir Fry',
      date: 'Made Mar 15',
      transformations: [
        { meal: 'Veggie Fried Rice', done: true, date: 'Mar 16', icon: '🍚' },
        { meal: 'Veggie Wrap', done: true, date: 'Mar 17', icon: '🌯' },
      ],
      remaining: 'All used',
      status: 'complete',
    },
  ];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'transform 0.1s ease, background 0.2s ease',
    cursor: 'pointer',
  });

  const urgencyBadge = (urgency, daysLeft) => {
    const configs = {
      urgent: { bg: colors.urgentGlow, color: colors.urgent, border: `1px solid ${colors.urgent}40`, label: daysLeft <= 1 ? 'Today!' : `${daysLeft}d left` },
      soon: { bg: colors.warningGlow, color: colors.warning, border: `1px solid ${colors.warning}40`, label: `${daysLeft}d left` },
      good: { bg: colors.primaryGlow, color: colors.primary, border: `1px solid ${colors.primary}30`, label: `${daysLeft}d` },
    };
    const c = configs[urgency];
    return (
      <span style={{ background: c.bg, color: c.color, border: c.border, borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600, letterSpacing: 0.3, fontFamily: 'Inter, sans-serif' }}>
        {c.label}
      </span>
    );
  };

  // STATUS BAR
  const StatusBar = () => (
    <div style={{ height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 8px', flexShrink: 0 }}>
      <span style={{ color: colors.text, fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: colors.text, strokeWidth: 2 })}
        {React.createElement(window.lucide.Signal, { size: 14, color: colors.text, strokeWidth: 2 })}
        {React.createElement(window.lucide.Battery, { size: 18, color: colors.text, strokeWidth: 2 })}
      </div>
    </div>
  );

  // DYNAMIC ISLAND
  const DynamicIsland = () => (
    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 34, background: '#000', borderRadius: 20, zIndex: 50 }} />
  );

  // BOTTOM NAV
  const BottomNav = () => {
    const tabs = [
      { id: 'home', label: 'Pantry', icon: window.lucide.Package },
      { id: 'scan', label: 'Scan', icon: window.lucide.ScanLine },
      { id: 'recipes', label: 'Recipes', icon: window.lucide.ChefHat },
      { id: 'lore', label: 'Lore', icon: window.lucide.BookOpen },
    ];
    return (
      <div style={{ height: 72, background: colors.navBg, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', flexShrink: 0 }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <div key={tab.id} onClick={() => { setActiveTab(tab.id); setActiveRecipe(null); setActiveCookMode(false); setScanMode(false); setScanStage(0); }}
              style={{ ...btnStyle(`nav-${tab.id}`), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 16px', borderRadius: 16, background: active ? colors.primaryGlow : 'transparent', minWidth: 64 }}
              onTouchStart={() => handlePress(`nav-${tab.id}`)}>
              {React.createElement(tab.icon, { size: 22, color: active ? colors.primary : colors.textMuted, strokeWidth: active ? 2.2 : 1.8 })}
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? colors.primary : colors.textMuted, fontFamily: 'Inter, sans-serif', letterSpacing: 0.2 }}>{tab.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // HOME SCREEN
  const HomeScreen = () => {
    const urgentItems = pantryItems.filter(i => i.urgency === 'urgent');
    const soonItems = pantryItems.filter(i => i.urgency === 'soon');
    const goodItems = pantryItems.filter(i => i.urgency === 'good');

    return (
      <div className="scroll-container" style={{ flex: 1, overflowY: 'auto', padding: '0 0 12px' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>Good morning, Alex 👋</p>
              <h1 style={{ color: colors.text, fontSize: 24, fontWeight: 800, fontFamily: 'Inter, sans-serif', lineHeight: 1.1 }}>Your Pantry</h1>
            </div>
            <div style={{ background: colors.urgentGlow, border: `1px solid ${colors.urgent}50`, borderRadius: 20, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              {React.createElement(window.lucide.AlertTriangle, { size: 13, color: colors.urgent })}
              <span style={{ color: colors.urgent, fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>4 expiring soon</span>
            </div>
          </div>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {[{ label: 'Items', val: pantryItems.length, color: colors.primary }, { label: 'Urgent', val: urgentItems.length, color: colors.urgent }, { label: 'Days avg', val: '11', color: colors.textMuted }].map((s, i) => (
              <div key={i} style={{ flex: 1, background: colors.card, borderRadius: 14, padding: '10px 12px', border: `1px solid ${colors.border}` }}>
                <p style={{ color: s.color, fontSize: 20, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>{s.val}</p>
                <p style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rescue Banner */}
        <div style={{ margin: '0 16px 16px', background: 'linear-gradient(135deg, #2A1A0A, #1C1208)', border: `1px solid ${colors.accent}40`, borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            {React.createElement(window.lucide.Flame, { size: 16, color: colors.accent })}
            <span style={{ color: colors.accent, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.3 }}>RESCUE ALERT</span>
          </div>
          <p style={{ color: colors.text, fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>Cherry tomatoes expire today</p>
          <p style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif', lineHeight: 1.5, marginBottom: 12 }}>2 recipes can use them right now. Don't let them go to waste.</p>
          <div onClick={() => setActiveTab('recipes')} style={{ ...btnStyle('rescue-cta'), background: colors.accent, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onTouchStart={() => handlePress('rescue-cta')}>
            {React.createElement(window.lucide.ChefHat, { size: 14, color: '#fff' })}
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>See Rescue Recipes</span>
          </div>
        </div>

        {/* Urgent */}
        {urgentItems.length > 0 && (
          <div style={{ margin: '0 16px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              {React.createElement(window.lucide.Zap, { size: 14, color: colors.urgent })}
              <span style={{ color: colors.urgent, fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase' }}>Use Now</span>
            </div>
            {urgentItems.map(item => (
              <div key={item.id} onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                style={{ background: colors.card, border: `1px solid ${colors.urgent}30`, borderRadius: 16, padding: '14px 16px', marginBottom: 8, cursor: 'pointer', transition: 'border-color 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: colors.urgentGlow, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.icon}</div>
                    <div>
                      <p style={{ color: colors.text, fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{item.name}</p>
                      <p style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{item.qty} · {item.category}</p>
                    </div>
                  </div>
                  {urgencyBadge(item.urgency, item.daysLeft)}
                </div>
                {expandedItem === item.id && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                    <p style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{item.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Soon */}
        <div style={{ margin: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {React.createElement(window.lucide.Clock, { size: 14, color: colors.warning })}
            <span style={{ color: colors.warning, fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase' }}>Use Soon</span>
          </div>
          {soonItems.map(item => (
            <div key={item.id} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, background: colors.warningGlow, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.icon}</div>
                <div>
                  <p style={{ color: colors.text, fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{item.name}</p>
                  <p style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{item.qty}</p>
                </div>
              </div>
              {urgencyBadge(item.urgency, item.daysLeft)}
            </div>
          ))}
        </div>

        {/* Good */}
        <div style={{ margin: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {React.createElement(window.lucide.ShieldCheck, { size: 14, color: colors.primary })}
            <span style={{ color: colors.primary, fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase' }}>Well Stocked</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {goodItems.map(item => (
              <div key={item.id} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <div>
                  <p style={{ color: colors.text, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{item.name}</p>
                  <p style={{ color: colors.textMuted, fontSize: 10, fontFamily: 'Inter, sans-serif' }}>{item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // SCAN SCREEN
  const ScanScreen = () => {
    const scannedItems = [
      { name: 'Greek Yogurt', qty: '2 cups', icon: '🥛', days: 7 },
      { name: 'Cucumber', qty: '1 whole', icon: '🥒', days: 6 },
      { name: 'Mint', qty: 'Small bunch', icon: '🌿', days: 4 },
      { name: 'Lemon', qty: '2 lemons', icon: '🍋', days: 14 },
    ];

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px 16px', flexShrink: 0 }}>
          <h1 style={{ color: colors.text, fontSize: 24, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>Add Ingredients</h1>
          <p style={{ color: colors.textMuted, fontSize: 13, fontFamily: 'Inter, sans-serif', marginTop: 4 }}>Scan receipts, labels, or type it in</p>
        </div>

        {scanStage === 0 && (
          <div className="scroll-container" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
            {/* Scan options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { icon: window.lucide.Camera, label: 'Scan Receipt', desc: 'Point at any receipt', color: colors.primary },
                { icon: window.lucide.Tag, label: 'Scan Label', desc: 'Read food labels', color: colors.accent },
                { icon: window.lucide.Mic, label: 'Voice Input', desc: 'Say what you have', color: '#B988E0' },
                { icon: window.lucide.PenLine, label: 'Type It In', desc: 'Manual entry', color: colors.textMuted },
              ].map((opt, i) => (
                <div key={i} onClick={() => { handlePress(`scan-opt-${i}`); if (i < 2) setScanStage(1); }}
                  style={{ ...btnStyle(`scan-opt-${i}`), background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 18, padding: 16, cursor: 'pointer' }}
                  onTouchStart={() => handlePress(`scan-opt-${i}`)}>
                  <div style={{ width: 40, height: 40, background: `${opt.color}20`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    {React.createElement(opt.icon, { size: 20, color: opt.color })}
                  </div>
                  <p style={{ color: colors.text, fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{opt.label}</p>
                  <p style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 3 }}>{opt.desc}</p>
                </div>
              ))}
            </div>

            {/* Recently added */}
            <div>
              <p style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>Recently Added</p>
              {[...pantryItems].slice(0, 4).map(item => (
                <div key={item.id} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <p style={{ color: colors.text, fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{item.name}</p>
                      <p style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{item.qty}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {React.createElement(window.lucide.PenLine, { size: 14, color: colors.textMuted })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scanStage === 1 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
            {/* Mock camera viewfinder */}
            <div style={{ background: '#0A0A08', border: `2px solid ${colors.primary}`, borderRadius: 24, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: 16 }}>
              {/* Corner markers */}
              {[[0,0,'top left'], [0,1,'top right'], [1,0,'bottom left'], [1,1,'bottom right']].map(([r,c,label]) => (
                <div key={label} style={{ position: 'absolute', top: r ? 'auto' : 20, bottom: r ? 20 : 'auto', left: c ? 'auto' : 20, right: c ? 20 : 'auto', width: 24, height: 24, borderTop: r ? 'none' : `3px solid ${colors.primary}`, borderBottom: r ? `3px solid ${colors.primary}` : 'none', borderLeft: c ? 'none' : `3px solid ${colors.primary}`, borderRight: c ? `3px solid ${colors.primary}` : 'none' }} />
              ))}
              {/* Scan line animation */}
              <div style={{ width: '80%', height: 2, background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`, position: 'absolute', top: '40%', animation: 'none', opacity: 0.8 }} />
              <div style={{ textAlign: 'center' }}>
                {React.createElement(window.lucide.Receipt, { size: 40, color: `${colors.primary}60`, strokeWidth: 1 })}
                <p style={{ color: colors.textMuted, fontSize: 13, fontFamily: 'Inter, sans-serif', marginTop: 12 }}>Point camera at receipt</p>
                <p style={{ color: colors.textFaint, fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 4 }}>Keep steady for best results</p>
              </div>
            </div>
            <div onClick={() => setScanStage(2)} style={{ ...btnStyle('scan-capture'), background: colors.primary, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }} onTouchStart={() => handlePress('scan-capture')}>
              {React.createElement(window.lucide.ScanLine, { size: 18, color: '#0F1409' })}
              <span style={{ color: '#0F1409', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Capture & Analyze</span>
            </div>
            <div onClick={() => setScanStage(0)} style={{ textAlign: 'center', padding: 8, cursor: 'pointer' }}>
              <span style={{ color: colors.textMuted, fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Cancel</span>
            </div>
          </div>
        )}

        {scanStage === 2 && (
          <div className="scroll-container" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
            <div style={{ background: colors.primaryGlow, border: `1px solid ${colors.primary}40`, borderRadius: 16, padding: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              {React.createElement(window.lucide.CheckCircle2, { size: 18, color: colors.primary })}
              <div>
                <p style={{ color: colors.primary, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>4 items detected</p>
                <p style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>Review and confirm before adding</p>
              </div>
            </div>
            {scannedItems.map((item, i) => (
              <div key={i} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <p style={{ color: colors.text, fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{item.name}</p>
                    <p style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{item.qty} · ~{item.days} days fresh</p>
                  </div>
                </div>
                <div style={{ width: 24, height: 24, background: colors.primaryGlow, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${colors.primary}` }}>
                  {React.createElement(window.lucide.Check, { size: 13, color: colors.primary })}
                </div>
              </div>
            ))}
            <div onClick={() => setScanStage(0)} style={{ ...btnStyle('confirm-scan'), background: colors.primary, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }} onTouchStart={() => handlePress('confirm-scan')}>
              {React.createElement(window.lucide.Plus, { size: 18, color: '#0F1409' })}
              <span style={{ color: '#0F1409', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Add 4 Items to Pantry</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // RECIPE DETAIL MODAL
  const RecipeDetail = ({ recipe }) => (
    <div style={{ position: 'absolute', inset: 0, background: colors.bg, zIndex: 30, display: 'flex', flexDirection: 'column', borderRadius: 44 }}>
      <div style={{ padding: '52px 20px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div onClick={() => { setActiveRecipe(null); setActiveCookMode(false); setCookStep(0); setShowSubstitution(null); }}
            style={{ ...btnStyle('back'), width: 36, height: 36, background: colors.card, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onTouchStart={() => handlePress('back')}>
            {React.createElement(window.lucide.ArrowLeft, { size: 18, color: colors.text })}
          </div>
          <span style={{ color: colors.textMuted, fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Recipe</span>
        </div>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{recipe.image}</div>
        <h2 style={{ color: colors.text, fontSize: 22, fontWeight: 800, fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>{recipe.name}</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{ background: `${recipe.urgencyColor}15`, color: recipe.urgencyColor, border: `1px solid ${recipe.urgencyColor}40`, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{recipe.urgencyScore}</span>
          <span style={{ background: colors.card, color: colors.textMuted, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{recipe.time}</span>
          <span style={{ background: colors.card, color: colors.textMuted, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{recipe.effort}</span>
          {recipe.tags.map(t => <span key={t} style={{ background: colors.primaryGlow, color: colors.primary, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{t}</span>)}
        </div>
        <div style={{ background: colors.accentGlow, border: `1px solid ${colors.accent}30`, borderRadius: 12, padding: '10px 14px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {React.createElement(window.lucide.Flame, { size: 13, color: colors.accent })}
            <span style={{ color: colors.accent, fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{recipe.rescueNote}</span>
          </div>
        </div>
      </div>

      {!activeCookMode ? (
        <div className="scroll-container" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
          {/* Uses */}
          <p style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Uses From Your Pantry</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {recipe.uses.map(u => (
              <span key={u} style={{ background: colors.card, border: `1px solid ${colors.border}`, color: colors.text, borderRadius: 10, padding: '6px 10px', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{u}</span>
            ))}
          </div>

          {/* Steps preview */}
          <p style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Steps Overview</p>
          {recipe.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 26, height: 26, background: colors.primaryGlow, border: `1.5px solid ${colors.primary}50`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: colors.primary, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{s.step}</span>
              </div>
              <div>
                <p style={{ color: colors.text, fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{s.action}</p>
                <p style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif', lineHeight: 1.5, marginTop: 3 }}>{s.detail}</p>
                <span style={{ color: colors.textFaint, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{s.time}</span>
              </div>
            </div>
          ))}

          {/* Substitutions */}
          {recipe.substitutions.length > 0 && (
            <div style={{ marginTop: 4, marginBottom: 20 }}>
              <p style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Substitution Map</p>
              {recipe.substitutions.map((sub, i) => (
                <div key={i} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14, padding: 14, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>If no</span>
                    <span style={{ background: colors.urgentGlow, color: colors.urgent, borderRadius: 8, padding: '2px 8px', fontSize: 11, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{sub.missing}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {React.createElement(window.lucide.ArrowRight, { size: 13, color: colors.primary })}
                    <span style={{ color: colors.primary, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{sub.use}</span>
                  </div>
                  <p style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 4 }}>{sub.note}</p>
                </div>
              ))}
            </div>
          )}

          <div onClick={() => setActiveCookMode(true)} style={{ ...btnStyle('start-cook'), background: colors.primary, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onTouchStart={() => handlePress('start-cook')}>
            {React.createElement(window.lucide.Play, { size: 18, color: '#0F1409' })}
            <span style={{ color: '#0F1409', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Start Cooking</span>
          </div>
        </div>
      ) : (
        // Cook mode
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px 20px' }}>
          {/* Progress */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>Step {cookStep + 1} of {recipe.steps.length}</span>
              <span style={{ color: colors.primary, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{recipe.steps[cookStep].time}</span>
            </div>
            <div style={{ height: 4, background: colors.border, borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((cookStep + 1) / recipe.steps.length) * 100}%`, background: colors.primary, borderRadius: 4, transition: 'width 0.4s ease' }} />
            </div>
          </div>
          {/* Current step */}
          <div style={{ flex: 1, background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: 48, height: 48, background: colors.primaryGlow, border: `2px solid ${colors.primary}50`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <span style={{ color: colors.primary, fontSize: 20, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>{recipe.steps[cookStep].step}</span>
            </div>
            <h3 style={{ color: colors.text, fontSize: 20, fontWeight: 700, fontFamily: 'Inter, sans-serif', marginBottom: 12 }}>{recipe.steps[cookStep].action}</h3>
            <p style={{ color: colors.textMuted, fontSize: 14, fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>{recipe.steps[cookStep].detail}</p>
          </div>
          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {cookStep > 0 && (
              <div onClick={() => setCookStep(s => s - 1)} style={{ ...btnStyle('prev-step'), flex: 1, background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }} onTouchStart={() => handlePress('prev-step')}>
                {React.createElement(window.lucide.ArrowLeft, { size: 16, color: colors.textMuted })}
                <span style={{ color: colors.textMuted, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Back</span>
              </div>
            )}
            <div onClick={() => { if (cookStep < recipe.steps.length - 1) setCookStep(s => s + 1); else { setActiveCookMode(false); setActiveRecipe(null); setCookStep(0); } }}
              style={{ ...btnStyle('next-step'), flex: 2, background: colors.primary, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}
              onTouchStart={() => handlePress('next-step')}>
              <span style={{ color: '#0F1409', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{cookStep < recipe.steps.length - 1 ? 'Next Step' : 'Done! 🎉'}</span>
              {cookStep < recipe.steps.length - 1 && React.createElement(window.lucide.ArrowRight, { size: 16, color: '#0F1409' })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // RECIPES SCREEN
  const RecipesScreen = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 20px 12px', flexShrink: 0 }}>
        <h1 style={{ color: colors.text, fontSize: 24, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>Recipes For You</h1>
        <p style={{ color: colors.textMuted, fontSize: 13, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>Based on your pantry right now</p>
        {/* Filter row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 4 }}>
          {['all', 'urgent', 'quick', 'healthy'].map(f => (
            <div key={f} onClick={() => setUrgencyFilter(f)}
              style={{ background: urgencyFilter === f ? colors.primary : colors.card, border: urgencyFilter === f ? 'none' : `1px solid ${colors.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', flexShrink: 0 }}>
              <span style={{ color: urgencyFilter === f ? '#0F1409' : colors.textMuted, fontSize: 12, fontWeight: urgencyFilter === f ? 700 : 400, fontFamily: 'Inter, sans-serif', textTransform: 'capitalize' }}>{f === 'all' ? 'All' : f === 'urgent' ? '🔥 Urgent' : f === 'quick' ? '⚡ Quick' : '🥗 Healthy'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-container" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {recipes.map((recipe, i) => (
          <div key={recipe.id} onClick={() => setActiveRecipe(recipe)}
            style={{ ...btnStyle(`recipe-${recipe.id}`), background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 22, padding: '18px', marginBottom: 14, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
            onTouchStart={() => handlePress(`recipe-${recipe.id}`)}>
            {/* Accent bar */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: recipe.urgencyColor, borderRadius: '22px 0 0 22px' }} />
            <div style={{ marginLeft: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{recipe.image}</span>
                  <div>
                    <h3 style={{ color: colors.text, fontSize: 16, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{recipe.name}</h3>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <span style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{recipe.time}</span>
                      <span style={{ color: colors.textFaint }}>·</span>
                      <span style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{recipe.effort}</span>
                    </div>
                  </div>
                </div>
                <div style={{ background: colors.card, border: `1px solid ${colors.primary}40`, borderRadius: 12, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ color: colors.primary, fontSize: 14, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>{recipe.match}%</span>
                </div>
              </div>
              <div style={{ background: `${recipe.urgencyColor}10`, border: `1px solid ${recipe.urgencyColor}25`, borderRadius: 10, padding: '7px 10px', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {React.createElement(window.lucide.Flame, { size: 11, color: recipe.urgencyColor })}
                  <span style={{ color: recipe.urgencyColor, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{recipe.rescueNote}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {recipe.uses.slice(0, 4).map(u => (
                  <span key={u} style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.textMuted, borderRadius: 8, padding: '3px 8px', fontSize: 10, fontFamily: 'Inter, sans-serif' }}>{u}</span>
                ))}
                {recipe.uses.length > 4 && <span style={{ color: colors.textFaint, fontSize: 10, fontFamily: 'Inter, sans-serif', padding: '3px 4px' }}>+{recipe.uses.length - 4} more</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // LORE/LEFTOVER TRACKER SCREEN
  const LoreScreen = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 20px 14px', flexShrink: 0 }}>
        <h1 style={{ color: colors.text, fontSize: 24, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>Leftover Lore</h1>
        <p style={{ color: colors.textMuted, fontSize: 13, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>Track your leftover transformations</p>
        {/* Tabs */}
        <div style={{ display: 'flex', background: colors.card, borderRadius: 12, padding: 3, marginTop: 14 }}>
          {['active', 'complete'].map(v => (
            <div key={v} onClick={() => setLeftoversView(v)}
              style={{ flex: 1, background: leftoversView === v ? colors.primary : 'transparent', borderRadius: 10, padding: '7px', textAlign: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
              <span style={{ color: leftoversView === v ? '#0F1409' : colors.textMuted, fontSize: 13, fontWeight: leftoversView === v ? 700 : 400, fontFamily: 'Inter, sans-serif', textTransform: 'capitalize' }}>{v === 'active' ? '🔄 In Progress' : '✅ Completed'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-container" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {/* Stats */}
        {leftoversView === 'active' && (
          <div style={{ background: 'linear-gradient(135deg, #0F1A08, #141F0A)', border: `1px solid ${colors.primary}30`, borderRadius: 18, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[{ val: '7', label: 'Meals saved', icon: '🍽️' }, { val: '$24', label: 'Est. saved', icon: '💚' }, { val: '380g', label: 'Food rescued', icon: '♻️' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 16 }}>{s.icon}</p>
                  <p style={{ color: colors.primary, fontSize: 18, fontWeight: 800, fontFamily: 'Inter, sans-serif', marginTop: 4 }}>{s.val}</p>
                  <p style={{ color: colors.textMuted, fontSize: 10, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {leftovers.filter(l => l.status === leftoversView).map(leftover => (
          <div key={leftover.id} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 20, padding: 18, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <h3 style={{ color: colors.text, fontSize: 16, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{leftover.original}</h3>
                <p style={{ color: colors.textMuted, fontSize: 12, fontFamily: 'Inter, sans-serif', marginTop: 3 }}>{leftover.date}</p>
              </div>
              <div style={{ background: leftover.status === 'active' ? colors.warningGlow : colors.primaryGlow, border: `1px solid ${leftover.status === 'active' ? colors.warning : colors.primary}40`, borderRadius: 20, padding: '4px 10px' }}>
                <span style={{ color: leftover.status === 'active' ? colors.warning : colors.primary, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{leftover.status === 'active' ? '🔄 Active' : '✅ Done'}</span>
              </div>
            </div>

            {/* Remaining */}
            <div style={{ background: colors.bg, borderRadius: 10, padding: '8px 12px', marginBottom: 14 }}>
              <span style={{ color: colors.textMuted, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>Remaining: </span>
              <span style={{ color: colors.text, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{leftover.remaining}</span>
            </div>

            {/* Transformations */}
            <p style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Transformations</p>
            {leftover.transformations.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, background: t.done ? colors.primaryGlow : colors.bg, border: `1.5px solid ${t.done ? colors.primary : colors.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: t.done ? colors.text : colors.textMuted, fontSize: 13, fontWeight: t.done ? 600 : 400, fontFamily: 'Inter, sans-serif' }}>{t.meal}</p>
                  <p style={{ color: colors.textFaint, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{t.date}</p>
                </div>
                {t.done ? React.createElement(window.lucide.CheckCircle2, { size: 16, color: colors.primary }) : React.createElement(window.lucide.Circle, { size: 16, color: colors.border })}
              </div>
            ))}

            {leftover.status === 'active' && (
              <div style={{ marginTop: 10, background: colors.accentGlow, border: `1px solid ${colors.accent}30`, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                {React.createElement(window.lucide.Lightbulb, { size: 13, color: colors.accent })}
                <span style={{ color: colors.accent, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>Tap a suggested meal to see recipe</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const screens = { home: HomeScreen, scan: ScanScreen, recipes: RecipesScreen, lore: LoreScreen };
  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0B08', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '20px 0' }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 0 0 1px #2A2A2A, 0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(168,196,74,0.04)' }}>
        <DynamicIsland />
        <StatusBar />

        {/* Screen content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen />
          {activeRecipe && <RecipeDetail recipe={activeRecipe} />}
        </div>

        <BottomNav />

        {/* Home indicator */}
        <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 120, height: 4, background: colors.textFaint, borderRadius: 4 }} />
        </div>
      </div>
    </div>
  );
}
