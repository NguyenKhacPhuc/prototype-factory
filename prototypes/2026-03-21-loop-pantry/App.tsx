const { useState, useEffect, useRef } = React;

function App() {
  const themes = {
    light: {
      bg: '#F5F2EC',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE9E1',
      text: '#1C1C1C',
      textSecondary: '#7A7468',
      primary: '#3D6B4F',
      primaryLight: '#E4EFEA',
      accent: '#D4713A',
      accentLight: '#FAEEE6',
      border: '#E2DDD5',
      urgent: '#C0392B',
      urgentLight: '#FDECEA',
      warning: '#C27C00',
      warningLight: '#FFF8E7',
      safe: '#2E7D52',
      safeLight: '#E8F5EE',
      card: '#FFFFFF',
      navBg: '#FFFFFF',
      statusBar: '#1C1C1C',
      shadow: 'rgba(0,0,0,0.07)',
      pillActive: '#3D6B4F',
      pillActiveTxt: '#FFFFFF',
      pillInactive: '#EDE9E1',
      pillInactiveTxt: '#7A7468',
      gradientA: '#3D6B4F',
      gradientB: '#D4713A',
    },
    dark: {
      bg: '#111811',
      surface: '#1B231B',
      surfaceAlt: '#212921',
      text: '#EDE9E1',
      textSecondary: '#8A9688',
      primary: '#5FB87A',
      primaryLight: '#162418',
      accent: '#E8855A',
      accentLight: '#271610',
      border: '#2A342A',
      urgent: '#E05C52',
      urgentLight: '#271210',
      warning: '#DBA733',
      warningLight: '#221B08',
      safe: '#5FB87A',
      safeLight: '#132014',
      card: '#1B231B',
      navBg: '#141C14',
      statusBar: '#EDE9E1',
      shadow: 'rgba(0,0,0,0.3)',
      pillActive: '#5FB87A',
      pillActiveTxt: '#111811',
      pillInactive: '#212921',
      pillInactiveTxt: '#8A9688',
      gradientA: '#3A7050',
      gradientB: '#B86040',
    },
  };

  const [activeTheme, setActiveTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('pantry');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [scanMode, setScanMode] = useState(null);
  const [pressedTab, setPressedTab] = useState(null);

  const t = themes[activeTheme];

  const pantryItems = [
    { id: 1, name: 'Fresh Cilantro', category: 'Herbs', expiresIn: 1, unit: 'bunch', amount: '½', urgency: 'urgent', icon: '🌿', addedBy: 'You' },
    { id: 2, name: 'Roma Tomatoes', category: 'Veggies', expiresIn: 2, unit: 'pcs', amount: '3', urgency: 'urgent', icon: '🍅', addedBy: 'Alex' },
    { id: 3, name: 'Greek Yogurt', category: 'Dairy', expiresIn: 2, unit: 'cup', amount: '1', urgency: 'urgent', icon: '🥛', addedBy: 'You' },
    { id: 4, name: 'Blueberries', category: 'Fruits', expiresIn: 3, unit: 'cup', amount: '1½', urgency: 'warning', icon: '🫐', addedBy: 'You' },
    { id: 5, name: 'Baby Spinach', category: 'Veggies', expiresIn: 4, unit: 'bag', amount: '½', urgency: 'warning', icon: '🥬', addedBy: 'Alex' },
    { id: 6, name: 'Chicken Breast', category: 'Protein', expiresIn: 4, unit: 'lbs', amount: '1.2', urgency: 'warning', icon: '🍗', addedBy: 'You' },
    { id: 7, name: 'Avocado', category: 'Fruits', expiresIn: 5, unit: 'pcs', amount: '2', urgency: 'warning', icon: '🥑', addedBy: 'Alex' },
    { id: 8, name: 'Free-Range Eggs', category: 'Protein', expiresIn: 18, unit: 'pcs', amount: '8', urgency: 'safe', icon: '🥚', addedBy: 'You' },
    { id: 9, name: 'Garlic', category: 'Aromatics', expiresIn: 14, unit: 'head', amount: '1', urgency: 'safe', icon: '🧄', addedBy: 'You' },
    { id: 10, name: 'Lemon', category: 'Fruits', expiresIn: 21, unit: 'pcs', amount: '2', urgency: 'safe', icon: '🍋', addedBy: 'Alex' },
    { id: 11, name: 'Olive Oil', category: 'Pantry', expiresIn: 90, unit: 'bottle', amount: '⅔', urgency: 'safe', icon: '🫒', addedBy: 'You' },
    { id: 12, name: 'Jasmine Rice', category: 'Grains', expiresIn: 180, unit: 'bag', amount: '¾', urgency: 'safe', icon: '🍚', addedBy: 'You' },
  ];

  const recipes = [
    {
      id: 1,
      name: 'Quick Salsa Bowl',
      time: '10 min',
      effort: 'Easy',
      urgency: 'urgent',
      uses: ['Cilantro', 'Tomatoes', 'Yogurt'],
      saves: 3,
      emoji: '🥗',
      description: 'Fresh tomato salsa over rice with a cool yogurt drizzle. A 10-minute rescue for your most urgent items.',
      wasteScore: 97,
      steps: ['Dice tomatoes and chop cilantro finely', 'Season with salt, lime juice, and a pinch of cumin', 'Scoop yogurt into a bowl, add salsa on top', 'Serve over warm rice or with tortilla chips'],
      calories: 320,
    },
    {
      id: 2,
      name: 'Herb Yogurt Wrap',
      time: '15 min',
      effort: 'Easy',
      urgency: 'urgent',
      uses: ['Cilantro', 'Yogurt', 'Spinach'],
      saves: 3,
      emoji: '🌯',
      description: 'Crispy wrap with a tangy cilantro-yogurt spread and wilted greens. Zero-waste lunch idea.',
      wasteScore: 91,
      steps: ['Blend yogurt, cilantro, and a clove of garlic until smooth', 'Spread generously on a large tortilla', 'Layer with spinach, sliced tomato, and avocado', 'Roll tightly, slice and serve'],
      calories: 410,
    },
    {
      id: 3,
      name: 'Berry Smoothie Bowl',
      time: '5 min',
      effort: 'Easy',
      urgency: 'warning',
      uses: ['Blueberries', 'Yogurt'],
      saves: 2,
      emoji: '🫐',
      description: 'Thick blueberry and yogurt smoothie bowl. Saves your berries before they turn.',
      wasteScore: 79,
      steps: ['Blend blueberries and yogurt until thick', 'Pour into a wide bowl', 'Top with granola, a drizzle of honey, and fresh berries', 'Eat immediately or refrigerate for up to 4 hours'],
      calories: 290,
    },
    {
      id: 4,
      name: 'Garlic Spinach Chicken',
      time: '25 min',
      effort: 'Medium',
      urgency: 'warning',
      uses: ['Chicken', 'Spinach', 'Garlic'],
      saves: 3,
      emoji: '🍗',
      description: 'Pan-seared chicken breast over silky garlic spinach. Uses your chicken and greens at once.',
      wasteScore: 74,
      steps: ['Season chicken with salt, pepper, and olive oil', 'Sear in a hot pan 6-7 min per side', 'Remove chicken, sauté garlic until golden', 'Add spinach, toss until wilted, season with lemon'],
      calories: 520,
    },
    {
      id: 5,
      name: 'Shakshuka Scramble',
      time: '12 min',
      effort: 'Easy',
      urgency: 'warning',
      uses: ['Tomatoes', 'Eggs', 'Garlic'],
      saves: 3,
      emoji: '🍳',
      description: 'Middle Eastern-inspired eggs poached in spiced tomato sauce. Breakfast or dinner worthy.',
      wasteScore: 70,
      steps: ['Sauté garlic in olive oil until soft', 'Add chopped tomatoes and cook down for 5 min', 'Season with cumin, paprika, salt and pepper', 'Make wells in the sauce and crack in eggs, cover and cook 3-4 min'],
      calories: 380,
    },
  ];

  const alerts = [
    {
      id: 1,
      title: 'Cilantro is wilting fast!',
      subtitle: 'Expires TODAY',
      actions: ['Make Salsa Now', 'Freeze in Olive Oil', 'Dry & Store'],
      urgency: 'urgent',
      icon: '🌿',
      tip: 'Blend with olive oil and freeze in an ice cube tray — instant flavor bombs for soups and sauces all month long.',
      timeLeft: '< 24 hours',
    },
    {
      id: 2,
      title: 'Yogurt needs action',
      subtitle: 'Expires in 2 days',
      actions: ['Use as Marinade', 'Make a Dip', 'Freeze It'],
      urgency: 'urgent',
      icon: '🥛',
      tip: 'Yogurt is a fantastic tenderizing marinade for chicken — mix with garlic, lemon, and herbs then refrigerate overnight.',
      timeLeft: '48 hours',
    },
    {
      id: 3,
      title: 'Roma Tomatoes wrinkling',
      subtitle: 'Expires in 2 days',
      actions: ['Make Sauce', 'Roast & Freeze', 'Use in Salsa'],
      urgency: 'urgent',
      icon: '🍅',
      tip: 'Wrinkled tomatoes are sweeter and perfect for sauce. Roast with olive oil at 400°F for 20 min, then freeze for up to 3 months.',
      timeLeft: '48 hours',
    },
    {
      id: 4,
      title: 'Blueberry rescue window',
      subtitle: 'Best within 3 days',
      actions: ['Freeze Tonight', 'Make Compote', 'Smoothie Bowl'],
      urgency: 'warning',
      icon: '🫐',
      tip: 'Freeze on a baking sheet first so they don\'t clump, then transfer to a bag. Frozen berries last up to 12 months.',
      timeLeft: '3 days',
    },
    {
      id: 5,
      title: 'Spinach losing crispness',
      subtitle: 'Best within 4 days',
      actions: ['Sauté Tonight', 'Make Green Smoothie', 'Freeze Blanched'],
      urgency: 'warning',
      icon: '🥬',
      tip: 'Blanch spinach for 1 minute, squeeze dry, and freeze in portions — perfect for future pasta, eggs, or soups.',
      timeLeft: '4 days',
    },
  ];

  const familyActivity = [
    { name: 'Alex', action: 'added', item: 'Avocados × 2', time: '8m ago', icon: '🥑', color: '#E8855A' },
    { name: 'You', action: 'used', item: '½ bunch cilantro', time: '1h ago', icon: '🌿', color: '#5FB87A' },
    { name: 'Alex', action: 'reserved', item: 'Blueberries for morning', time: '3h ago', icon: '🫐', color: '#E8855A' },
    { name: 'You', action: 'saved', item: 'Chicken to pantry', time: '1d ago', icon: '🍗', color: '#5FB87A' },
    { name: 'Alex', action: 'cooked', item: 'Egg scramble', time: '2d ago', icon: '🍳', color: '#E8855A' },
  ];

  const getUrgencyColor = (urgency) => {
    if (urgency === 'urgent') return t.urgent;
    if (urgency === 'warning') return t.warning;
    return t.safe;
  };
  const getUrgencyBg = (urgency) => {
    if (urgency === 'urgent') return t.urgentLight;
    if (urgency === 'warning') return t.warningLight;
    return t.safeLight;
  };
  const getExpiryLabel = (days) => {
    if (days === 1) return 'Today!';
    if (days <= 3) return `${days}d left`;
    if (days <= 7) return `${days} days`;
    return `${days}d`;
  };

  const urgentCount = pantryItems.filter(i => i.urgency === 'urgent').length;
  const warningCount = pantryItems.filter(i => i.urgency === 'warning').length;
  const safeCount = pantryItems.filter(i => i.urgency === 'safe').length;
  const filteredItems = activeFilter === 'all' ? pantryItems : pantryItems.filter(i => i.urgency === activeFilter);

  // ── PANTRY SCREEN ──────────────────────────────────────────
  const PantryScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '10px 20px 0' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>My Pantry</div>
            <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>{pantryItems.length} items tracked · Live view</div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: t.primary, border: 'none', borderRadius: 12,
              padding: '9px 16px', color: activeTheme === 'dark' ? '#111' : '#fff',
              fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
              display: 'flex', alignItems: 'center', gap: 5,
              boxShadow: `0 4px 14px ${t.primary}50`,
            }}
          >+ Add</button>
        </div>

        {/* Status cards */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Act Now', count: urgentCount, color: t.urgent, bg: t.urgentLight, filter: 'urgent', emoji: '🔴' },
            { label: 'Use Soon', count: warningCount, color: t.warning, bg: t.warningLight, filter: 'warning', emoji: '🟡' },
            { label: 'All Good', count: safeCount, color: t.safe, bg: t.safeLight, filter: 'safe', emoji: '🟢' },
          ].map(s => (
            <button key={s.label} onClick={() => setActiveFilter(activeFilter === s.filter ? 'all' : s.filter)}
              style={{
                flex: 1, background: activeFilter === s.filter ? s.color : s.bg,
                borderRadius: 14, padding: '10px 8px', textAlign: 'center',
                border: `1.5px solid ${activeFilter === s.filter ? s.color : s.color + '30'}`,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: activeFilter === s.filter ? '#fff' : s.color }}>{s.count}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: activeFilter === s.filter ? 'rgba(255,255,255,0.85)' : s.color, marginTop: 1, letterSpacing: 0.3 }}>{s.label}</div>
            </button>
          ))}
        </div>

        {/* Quick scan row */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
          {[
            { icon: '📷', label: 'Snap Food', mode: 'photo' },
            { icon: '🧾', label: 'Receipt', mode: 'receipt' },
            { icon: '📦', label: 'Barcode', mode: 'barcode' },
          ].map(opt => (
            <button key={opt.label} onClick={() => setScanMode(scanMode === opt.mode ? null : opt.mode)}
              style={{
                flex: 1, background: scanMode === opt.mode ? t.primaryLight : t.surfaceAlt,
                border: `1.5px solid ${scanMode === opt.mode ? t.primary : t.border}`,
                borderRadius: 12, padding: '9px 4px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer',
              }}>
              <span style={{ fontSize: 18 }}>{opt.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: scanMode === opt.mode ? t.primary : t.textSecondary, fontFamily: 'Nunito, sans-serif' }}>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Scan preview */}
        {scanMode && (
          <div style={{
            background: t.surfaceAlt, borderRadius: 14, padding: 16, marginBottom: 14,
            border: `1.5px dashed ${t.primary}`, textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>
              {scanMode === 'photo' ? '📷' : scanMode === 'receipt' ? '🧾' : '📦'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
              {scanMode === 'photo' ? 'Point at leftover or ingredient' : scanMode === 'receipt' ? 'Align receipt in frame' : 'Scan product barcode'}
            </div>
            <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 3 }}>AI will identify items and suggest expiry dates</div>
            <button onClick={() => setScanMode(null)} style={{
              marginTop: 10, background: t.primary, border: 'none', borderRadius: 10,
              padding: '7px 20px', color: activeTheme === 'dark' ? '#111' : '#fff',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
            }}>Simulate Scan ✓</button>
          </div>
        )}

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {['all', 'urgent', 'warning', 'safe'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '5px 12px', borderRadius: 20, border: 'none',
                background: activeFilter === f ? t.pillActive : t.pillInactive,
                color: activeFilter === f ? t.pillActiveTxt : t.pillInactiveTxt,
                fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
              }}>
              {f === 'all' ? 'All Items' : f === 'urgent' ? '🔴 Act Now' : f === 'warning' ? '🟡 Soon' : '🟢 Good'}
            </button>
          ))}
        </div>
      </div>

      {/* Item list */}
      <div style={{ padding: '0 20px' }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{
            background: t.card, borderRadius: 16, padding: '12px 14px', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 12,
            border: `1px solid ${item.urgency === 'urgent' ? t.urgent + '45' : item.urgency === 'warning' ? t.warning + '30' : t.border}`,
            boxShadow: item.urgency === 'urgent' ? `0 2px 12px ${t.urgent}15` : 'none',
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14, background: getUrgencyBg(item.urgency),
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
            }}>{item.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: t.text, lineHeight: 1.2 }}>{item.name}</div>
                <div style={{
                  fontSize: 11, fontWeight: 800, color: getUrgencyColor(item.urgency),
                  background: getUrgencyBg(item.urgency), padding: '3px 9px', borderRadius: 20,
                  flexShrink: 0, marginLeft: 8,
                }}>{getExpiryLabel(item.expiresIn)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <span style={{ fontSize: 12, color: t.textSecondary }}>{item.amount} {item.unit}</span>
                <span style={{ fontSize: 10, color: t.border }}>·</span>
                <span style={{ fontSize: 12, color: t.textSecondary }}>{item.category}</span>
                <span style={{ fontSize: 10, color: t.border }}>·</span>
                <span style={{ fontSize: 11, color: t.textSecondary }}>by {item.addedBy}</span>
              </div>
              <div style={{ marginTop: 7, height: 4, background: t.border, borderRadius: 2 }}>
                <div style={{
                  height: '100%', borderRadius: 2, background: getUrgencyColor(item.urgency),
                  width: item.urgency === 'urgent' ? '92%' : item.urgency === 'warning' ? '55%' : '18%',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: t.textSecondary }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Nothing here!</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Filtered items will appear here</div>
          </div>
        )}
      </div>
    </div>
  );

  // ── RECIPES SCREEN ─────────────────────────────────────────
  const RecipesScreen = () => {
    const [energy, setEnergy] = useState(1);
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Use-First Recipes</div>
          <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>Ranked by urgency & your energy level</div>

          {/* Energy picker */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: t.textSecondary, marginBottom: 8, letterSpacing: 0.5 }}>HOW'S YOUR ENERGY?</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ label: 'Low 😴', sub: '< 15 min' }, { label: 'Medium 🙂', sub: '15-25 min' }, { label: 'High 🔥', sub: 'Anything!' }].map((e, i) => (
                <button key={e.label} onClick={() => setEnergy(i)}
                  style={{
                    flex: 1, padding: '8px 4px', borderRadius: 12,
                    border: `2px solid ${energy === i ? t.primary : t.border}`,
                    background: energy === i ? t.primaryLight : t.surfaceAlt,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer',
                  }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: energy === i ? t.primary : t.textSecondary, fontFamily: 'Nunito, sans-serif' }}>{e.label}</span>
                  <span style={{ fontSize: 9, color: t.textSecondary, fontWeight: 600 }}>{e.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Urgent banner */}
          <div style={{
            marginTop: 14, background: t.urgentLight, borderRadius: 14, padding: '10px 14px',
            border: `1px solid ${t.urgent}30`, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: t.urgent }}>3 items expire in ≤ 2 days</div>
              <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 1 }}>Top 2 recipes use all of them</div>
            </div>
          </div>
        </div>

        {/* Recipe cards */}
        <div style={{ padding: '10px 20px' }}>
          {recipes.map((recipe, idx) => (
            <div key={recipe.id} onClick={() => setSelectedRecipe(selectedRecipe?.id === recipe.id ? null : recipe)}
              style={{
                background: t.card, borderRadius: 18, marginBottom: 12,
                border: `1px solid ${recipe.urgency === 'urgent' ? t.urgent + '45' : t.border}`,
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: selectedRecipe?.id === recipe.id ? `0 4px 20px ${t.shadow}` : 'none',
                transition: 'box-shadow 0.2s',
              }}>
              <div style={{ padding: '14px 16px 12px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {/* Emoji */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: idx === 0 ? t.urgentLight : idx <= 1 ? t.warningLight : t.primaryLight,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                    position: 'relative',
                  }}>
                    {recipe.emoji}
                    {idx === 0 && (
                      <div style={{
                        position: 'absolute', top: -4, right: -4,
                        background: t.urgent, borderRadius: '50%', width: 18, height: 18,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: '#fff', fontWeight: 900,
                      }}>1</div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{recipe.name}</div>
                      {idx === 0 && <span style={{ fontSize: 9, background: t.urgent, color: '#fff', borderRadius: 5, padding: '2px 6px', fontWeight: 800 }}>BEST PICK</span>}
                    </div>
                    <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.4 }}>{recipe.description}</div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: t.textSecondary }}>⏱ {recipe.time}</span>
                      <span style={{ fontSize: 11, color: t.textSecondary }}>· {recipe.effort}</span>
                      <span style={{ fontSize: 11, color: t.textSecondary }}>· {recipe.calories} cal</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: t.primary }}>Saves {recipe.saves} items</span>
                    </div>
                  </div>
                  {/* Score ring */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: getUrgencyColor(recipe.urgency) }}>{recipe.wasteScore}</div>
                    <div style={{ fontSize: 8, fontWeight: 800, color: t.textSecondary, letterSpacing: 0.4 }}>SCORE</div>
                  </div>
                </div>
                {/* Ingredient chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                  {recipe.uses.map(ing => (
                    <span key={ing} style={{
                      fontSize: 11, padding: '3px 9px', borderRadius: 20, fontWeight: 700,
                      background: t.primaryLight, color: t.primary,
                    }}>{ing}</span>
                  ))}
                </div>
              </div>

              {/* Expanded steps */}
              {selectedRecipe?.id === recipe.id && (
                <div style={{ borderTop: `1px solid ${t.border}`, padding: '14px 16px', background: t.surfaceAlt }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: t.text, marginBottom: 10, letterSpacing: 0.3 }}>QUICK STEPS</div>
                  {recipe.steps.map((step, si) => (
                    <div key={si} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: t.primary, color: activeTheme === 'dark' ? '#111' : '#fff',
                        fontSize: 11, fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>{si + 1}</div>
                      <span style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5, paddingTop: 2 }}>{step}</span>
                    </div>
                  ))}
                  <button style={{
                    width: '100%', marginTop: 10, padding: '11px',
                    borderRadius: 12, background: t.primary, border: 'none',
                    color: activeTheme === 'dark' ? '#111' : '#fff',
                    fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                    boxShadow: `0 4px 14px ${t.primary}50`,
                  }}>Start Cooking 👨‍🍳</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── ALERTS SCREEN ──────────────────────────────────────────
  const AlertsScreen = () => {
    const active = alerts.filter(a => !dismissedAlerts.includes(a.id));
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Save It Now</div>
          <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>{active.length} items need your attention</div>

          {active.length > 0 && (
            <div style={{
              marginTop: 14, padding: '12px 14px', borderRadius: 14,
              background: `linear-gradient(135deg, ${t.urgent}25, ${t.warning}15)`,
              border: `1px solid ${t.urgent}30`,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>🚨</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: t.urgent }}>Rescue window is open</div>
                <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 1 }}>{active.filter(a => a.urgency === 'urgent').length} items expiring in ≤ 2 days — act now!</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '10px 20px' }}>
          {active.map(alert => (
            <div key={alert.id} style={{
              background: t.card, borderRadius: 18, marginBottom: 10,
              border: `1px solid ${alert.urgency === 'urgent' ? t.urgent + '50' : t.warning + '40'}`,
              overflow: 'hidden',
              boxShadow: alert.urgency === 'urgent' ? `0 3px 16px ${t.urgent}15` : 'none',
            }}>
              <div style={{ padding: '14px 14px 12px', cursor: 'pointer' }}
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, background: getUrgencyBg(alert.urgency),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
                  }}>{alert.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{alert.title}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: getUrgencyColor(alert.urgency), marginTop: 2 }}>{alert.subtitle}</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); setDismissedAlerts([...dismissedAlerts, alert.id]); }}
                        style={{ background: 'none', border: 'none', color: t.textSecondary, fontSize: 20, cursor: 'pointer', lineHeight: 1, padding: 0 }}>×</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                      {alert.actions.map(action => (
                        <button key={action} style={{
                          padding: '5px 11px', borderRadius: 20, cursor: 'pointer',
                          border: `2px solid ${getUrgencyColor(alert.urgency)}50`,
                          background: getUrgencyBg(alert.urgency),
                          color: getUrgencyColor(alert.urgency),
                          fontSize: 11, fontWeight: 800, fontFamily: 'Nunito, sans-serif',
                        }}>{action}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {expandedAlert === alert.id && (
                <div style={{ padding: '0 14px 14px', borderTop: `1px solid ${t.border}` }}>
                  <div style={{ paddingTop: 12, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
                    <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>{alert.tip}</div>
                  </div>
                  <div style={{
                    marginTop: 10, background: t.surfaceAlt, borderRadius: 10, padding: '8px 12px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 700 }}>Time remaining:</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: getUrgencyColor(alert.urgency) }}>{alert.timeLeft}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {active.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>Pantry is in great shape!</div>
              <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>No urgent items right now. Amazing job!</div>
            </div>
          )}

          {/* Household Activity */}
          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 10 }}>Household Activity</div>
            {familyActivity.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', background: t.card, borderRadius: 12, marginBottom: 7,
                border: `1px solid ${t.border}`,
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, background: a.color + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: a.color }}>{a.name} </span>
                  <span style={{ fontSize: 12, color: t.textSecondary }}>{a.action} </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{a.item}</span>
                </div>
                <div style={{ fontSize: 10, color: t.textSecondary, flexShrink: 0 }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── STATS SCREEN ───────────────────────────────────────────
  const StatsScreen = () => {
    const history = [65, 72, 58, 80, 74, 88, 68];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxH = Math.max(...history);
    const topCats = [
      { name: 'Herbs', saved: 8, color: t.safe },
      { name: 'Veggies', saved: 7, color: '#66BB6A' },
      { name: 'Dairy', saved: 5, color: t.warning },
      { name: 'Fruits', saved: 4, color: t.accent },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Waste Scoreboard</div>
          <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>March 2026</div>

          {/* Streak hero */}
          <div style={{
            marginTop: 14, borderRadius: 18, padding: '16px 18px',
            background: `linear-gradient(135deg, ${t.gradientA}, ${t.gradientB})`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 44 }}>🔥</div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>12-day streak!</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
                You've saved food every day this month
              </div>
            </div>
          </div>

          {/* Metric row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {[
              { value: '$47', label: 'SAVED', color: t.primary },
              { value: '3.2kg', label: 'CO₂ CUT', color: t.accent },
              { value: '24', label: 'RESCUED', color: t.safe },
            ].map(m => (
              <div key={m.label} style={{
                flex: 1, background: t.card, borderRadius: 16, padding: '14px 10px', textAlign: 'center',
                border: `1px solid ${t.border}`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 9, fontWeight: 800, color: t.textSecondary, marginTop: 3, letterSpacing: 0.5 }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Waste reduction */}
          <div style={{ background: t.card, borderRadius: 16, padding: 16, marginTop: 10, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>Waste Reduction</div>
                <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>vs. avg household at 35%</div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: t.primary }}>68%</div>
            </div>
            <div style={{ height: 10, background: t.border, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: '68%', borderRadius: 5,
                background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
              }} />
            </div>
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: t.primary, background: t.primaryLight, padding: '2px 8px', borderRadius: 20 }}>
                +33% above average ✨
              </span>
            </div>
          </div>

          {/* Weekly bar chart */}
          <div style={{ background: t.card, borderRadius: 16, padding: 16, marginTop: 10, border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>This Week</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
              {history.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: '100%', height: (v / maxH) * 58,
                    background: i === 5 ? t.primary : t.primaryLight,
                    borderRadius: '4px 4px 0 0', position: 'relative',
                  }}>
                    {i === 5 && (
                      <div style={{
                        position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                        fontSize: 9, fontWeight: 800, color: t.primary, whiteSpace: 'nowrap',
                      }}>{v}%</div>
                    )}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: i === 5 ? t.primary : t.textSecondary }}>{days[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Household heroes */}
          <div style={{ background: t.card, borderRadius: 16, padding: 16, marginTop: 10, border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Household Heroes</div>
            {[
              { name: 'You', saves: 14, color: t.primary, badge: '🥇' },
              { name: 'Alex', saves: 10, color: t.accent, badge: '🥈' },
            ].map((m, i) => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i === 0 ? 12 : 0 }}>
                <span style={{ fontSize: 22 }}>{m.badge}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: t.text }}>{m.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>{m.saves} saves</span>
                  </div>
                  <div style={{ height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(m.saves / 14) * 100}%`, background: m.color, borderRadius: 4 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top categories */}
          <div style={{ background: t.card, borderRadius: 16, padding: 16, marginTop: 10, marginBottom: 16, border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Top Saved Categories</div>
            {topCats.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 56, fontSize: 12, fontWeight: 700, color: t.textSecondary }}>{c.name}</div>
                <div style={{ flex: 1, height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(c.saved / 8) * 100}%`, background: c.color, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: t.text, width: 18, textAlign: 'right' }}>{c.saved}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── SETTINGS SCREEN ────────────────────────────────────────
  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '10px 20px 0' }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Settings</div>

        {/* Profile card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, background: t.card,
          borderRadius: 18, padding: 16, marginTop: 16, border: `1px solid ${t.border}`,
        }}>
          <div style={{
            width: 58, height: 58, borderRadius: 18, background: t.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}>🏡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 900, color: t.text }}>The Kitchen</div>
            <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 3 }}>2 members · 12-day streak · Since Jan 2026</div>
          </div>
          <button style={{
            background: t.primaryLight, border: 'none', borderRadius: 10, padding: '7px 14px',
            color: t.primary, fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
          }}>Edit</button>
        </div>

        {/* Theme toggle */}
        <div style={{ background: t.card, borderRadius: 18, padding: 16, marginTop: 10, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Appearance</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{activeTheme === 'dark' ? '🌙' : '☀️'}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{activeTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ fontSize: 11, color: t.textSecondary }}>Tap toggle to switch</div>
              </div>
            </div>
            <button onClick={() => setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark')}
              style={{
                width: 54, height: 30, borderRadius: 15, position: 'relative', cursor: 'pointer',
                background: activeTheme === 'dark' ? t.primary : t.border,
                border: 'none', transition: 'background 0.3s ease',
              }}>
              <div style={{
                position: 'absolute', top: 3, left: activeTheme === 'dark' ? 27 : 3,
                width: 24, height: 24, borderRadius: '50%', background: '#fff',
                transition: 'left 0.3s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }} />
            </button>
          </div>
        </div>

        {/* Household members */}
        <div style={{ background: t.card, borderRadius: 18, padding: 16, marginTop: 10, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>Household Sync</div>
            <button style={{
              background: t.primaryLight, border: 'none', borderRadius: 8, padding: '5px 12px',
              color: t.primary, fontSize: 11, fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
            }}>+ Invite</button>
          </div>
          {[
            { name: 'You', role: 'Owner', emoji: '👤', color: t.primary },
            { name: 'Alex', role: 'Member', emoji: '👤', color: t.accent },
          ].map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12, background: m.color + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>{m.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{m.name}</div>
                <div style={{ fontSize: 11, color: t.textSecondary }}>{m.role}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 800, color: m.color,
                background: m.color + '20', padding: '3px 9px', borderRadius: 20,
              }}>{m.role === 'Owner' ? 'You' : 'Active'}</span>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div style={{ background: t.card, borderRadius: 18, padding: 16, marginTop: 10, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Notifications</div>
          {[
            { label: 'Expiry Alerts', sub: 'Notify when items approach spoilage', on: true },
            { label: 'Rescue Windows', sub: 'Daily "save it now" suggestions', on: true },
            { label: 'Family Activity', sub: 'When household members update pantry', on: true },
            { label: 'Weekly Report', sub: 'Your waste reduction summary', on: false },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{s.label}</div>
                <div style={{ fontSize: 11, color: t.textSecondary }}>{s.sub}</div>
              </div>
              <div style={{
                width: 46, height: 26, borderRadius: 13, position: 'relative', cursor: 'pointer',
                background: s.on ? t.primary : t.border, flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', top: 3, left: s.on ? 23 : 3,
                  width: 20, height: 20, borderRadius: '50%', background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Cooking prefs */}
        <div style={{ background: t.card, borderRadius: 18, padding: 16, marginTop: 10, marginBottom: 16, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Cooking Preferences</div>
          {[
            { label: 'Diet', value: 'Omnivore' },
            { label: 'Style', value: 'Mediterranean, Asian' },
            { label: 'Max Prep Time', value: '30 minutes' },
            { label: 'Cookware', value: 'Stovetop, Oven, Instant Pot' },
            { label: 'Household Size', value: '2 people' },
          ].map(p => (
            <div key={p.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${t.border}`,
            }}>
              <span style={{ fontSize: 12, color: t.textSecondary }}>{p.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{p.value}</span>
            </div>
          ))}
          <button style={{
            width: '100%', padding: '10px', borderRadius: 12,
            background: t.surfaceAlt, border: `1.5px solid ${t.border}`,
            color: t.text, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
          }}>Edit Preferences</button>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (activeTab) {
      case 'pantry':  return <PantryScreen />;
      case 'recipes': return <RecipesScreen />;
      case 'alerts':  return <AlertsScreen />;
      case 'stats':   return <StatsScreen />;
      case 'settings': return <SettingsScreen />;
      default:        return <PantryScreen />;
    }
  };

  const tabs = [
    { id: 'pantry',   label: 'Pantry',   emoji: '🧺' },
    { id: 'recipes',  label: 'Recipes',  emoji: '🍳' },
    { id: 'alerts',   label: 'Alerts',   emoji: '🔔', badge: alerts.filter(a => !dismissedAlerts.includes(a.id) && a.urgency === 'urgent').length },
    { id: 'stats',    label: 'Stats',    emoji: '📊' },
    { id: 'settings', label: 'Account',  emoji: '⚙️' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#D8D5D0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Nunito, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: 'Nunito', sans-serif; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, background: t.bg, borderRadius: 52, overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 9px #0d0d0d, 0 0 0 11px #2a2a2a',
        display: 'flex', flexDirection: 'column', position: 'relative',
        transition: 'background 0.3s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 126, height: 36, background: '#000', borderRadius: 22, zIndex: 200,
        }} />

        {/* Status bar */}
        <div style={{
          height: 52, paddingTop: 16, paddingLeft: 24, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'transparent', flexShrink: 0, position: 'relative', zIndex: 1,
        }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: t.statusBar }}>9:41</div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill={t.statusBar}>
              <rect x="0" y="6" width="2" height="4" rx="0.5" />
              <rect x="3" y="4" width="2" height="6" rx="0.5" />
              <rect x="6" y="2" width="2" height="8" rx="0.5" />
              <rect x="9" y="0" width="2" height="10" rx="0.5" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 15 11" fill={t.statusBar}>
              <path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.3 5.1L14.5 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.5 3.8L1.7 5.1C3.1 3.5 5.2 2.5 7.5 2.5Z" />
              <path d="M7.5 5.5C8.9 5.5 10.2 6.1 11.1 7.1L12.3 5.8C11.1 4.5 9.4 3.7 7.5 3.7C5.6 3.7 3.9 4.5 2.7 5.8L3.9 7.1C4.8 6.1 6.1 5.5 7.5 5.5Z" />
              <circle cx="7.5" cy="9" r="1.5" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${t.statusBar}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '75%', height: '100%', background: t.statusBar, borderRadius: 1 }} />
              </div>
              <div style={{ width: 2, height: 5, background: t.statusBar, borderRadius: 1, opacity: 0.6 }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <div style={{
          height: 82, background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'flex-start', paddingTop: 8, flexShrink: 0,
          backdropFilter: 'blur(10px)',
        }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                position: 'relative', transition: 'transform 0.1s ease',
                transform: pressedTab === tab.id ? 'scale(0.88)' : 'scale(1)',
              }}
              onMouseDown={() => setPressedTab(tab.id)}
              onMouseUp={() => setPressedTab(null)}>
              {tab.badge > 0 && (
                <div style={{
                  position: 'absolute', top: 0, right: '18%',
                  width: 16, height: 16, borderRadius: '50%',
                  background: t.urgent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 900, color: '#fff' }}>{tab.badge}</span>
                </div>
              )}
              <span style={{
                fontSize: 22,
                filter: activeTab === tab.id ? 'none' : 'grayscale(60%)',
                opacity: activeTab === tab.id ? 1 : 0.65,
                transition: 'all 0.2s',
              }}>{tab.emoji}</span>
              <span style={{
                fontSize: 10, fontWeight: 800,
                color: activeTab === tab.id ? t.primary : t.textSecondary,
                fontFamily: 'Nunito, sans-serif',
                transition: 'color 0.2s',
              }}>{tab.label}</span>
              {activeTab === tab.id && (
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: t.primary, marginTop: 1,
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Add modal overlay */}
      {showAddModal && (
        <div onClick={() => setShowAddModal(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 9999,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: 375, background: t.surface, borderRadius: '28px 28px 0 0',
            padding: '20px 24px 40px', boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          }}>
            <div style={{ width: 40, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 20, fontWeight: 900, color: t.text, marginBottom: 16 }}>Add to Pantry</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📷', title: 'Snap a Photo', sub: 'AI identifies ingredients automatically' },
                { icon: '🧾', title: 'Scan Receipt', sub: 'Import all items from grocery receipt' },
                { icon: '📦', title: 'Scan Barcode', sub: 'Lookup any packaged product' },
                { icon: '✍️', title: 'Add Manually', sub: 'Type name, amount, and expiry date' },
              ].map(opt => (
                <button key={opt.title} onClick={() => setShowAddModal(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: t.surfaceAlt, border: `1px solid ${t.border}`,
                  borderRadius: 14, padding: '13px 14px', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{opt.title}</div>
                    <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>{opt.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
