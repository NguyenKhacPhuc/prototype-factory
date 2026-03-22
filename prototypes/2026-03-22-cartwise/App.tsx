function App() {
  const { useState, useEffect, useRef } = React;

  // === GOOGLE FONTS ===
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // === THEME SYSTEM ===
  const themes = {
    dark: {
      bg: '#0B1512',
      surface: '#141F1A',
      surface2: '#1B2B24',
      surface3: '#223530',
      primary: '#00E5A3',
      primaryDim: 'rgba(0,229,163,0.15)',
      primaryGlow: 'rgba(0,229,163,0.3)',
      secondary: '#00B8D4',
      accent: '#FF7A50',
      text: '#E8F5F0',
      textMuted: '#7A9E8C',
      textDim: '#4A6E5C',
      border: '#1F3329',
      border2: '#2A4538',
      warning: '#FFB347',
      warningDim: 'rgba(255,179,71,0.15)',
      danger: '#FF6B6B',
      dangerDim: 'rgba(255,107,107,0.12)',
      success: '#4ADE80',
      successDim: 'rgba(74,222,128,0.12)',
    },
    light: {
      bg: '#EFF7F4',
      surface: '#FFFFFF',
      surface2: '#F0FAF6',
      surface3: '#E4F5ED',
      primary: '#00B882',
      primaryDim: 'rgba(0,184,130,0.12)',
      primaryGlow: 'rgba(0,184,130,0.25)',
      secondary: '#0096B0',
      accent: '#E85D30',
      text: '#0D2018',
      textMuted: '#5A8072',
      textDim: '#9ABCAC',
      border: '#C8E8DC',
      border2: '#D8F0E6',
      warning: '#D4820A',
      warningDim: 'rgba(212,130,10,0.1)',
      danger: '#DC3545',
      dangerDim: 'rgba(220,53,69,0.08)',
      success: '#198754',
      successDim: 'rgba(25,135,84,0.1)',
    },
  };

  const [darkMode, setDarkMode] = useState(true);
  const t = darkMode ? themes.dark : themes.light;

  // === STATE ===
  const [activeTab, setActiveTab] = useState('home');
  const [pressed, setPressed] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePlan, setActivePlan] = useState(null);
  const [scanAnimation, setScanAnimation] = useState(false);

  const press = (id) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 180);
  };

  // === DATA ===
  const inventory = [
    { id: 1, name: 'Spaghetti', qty: '2 packs', cat: 'Pantry', expiry: null, status: 'ok' },
    { id: 2, name: 'Penne', qty: '1 pack', cat: 'Pantry', expiry: null, status: 'ok' },
    { id: 3, name: 'Tomato Sauce', qty: '0', cat: 'Pantry', expiry: null, status: 'empty' },
    { id: 4, name: 'Olive Oil', qty: '½ bottle', cat: 'Pantry', expiry: null, status: 'low' },
    { id: 5, name: 'Milk', qty: '1 qt', cat: 'Fridge', expiry: '2 days', status: 'expiring' },
    { id: 6, name: 'Eggs', qty: '6', cat: 'Fridge', expiry: null, status: 'low' },
    { id: 7, name: 'Greek Yogurt', qty: '2', cat: 'Fridge', expiry: '5 days', status: 'ok' },
    { id: 8, name: 'Cheddar', qty: '1 block', cat: 'Fridge', expiry: '10 days', status: 'ok' },
    { id: 9, name: 'Dish Soap', qty: '¼ bottle', cat: 'Cleaning', expiry: null, status: 'low' },
    { id: 10, name: 'Paper Towels', qty: '1 roll', cat: 'Cleaning', expiry: null, status: 'low' },
    { id: 11, name: 'Shampoo', qty: '¼ bottle', cat: 'Personal', expiry: null, status: 'low' },
    { id: 12, name: 'Toothpaste', qty: 'Full', cat: 'Personal', expiry: null, status: 'ok' },
  ];

  const shoppingItems = [
    { id: 1, name: 'Tomato Sauce', aisle: 'Canned Goods', store: 'Whole Foods', price: 2.49, unit: '2 jars', priority: 'high', reason: 'Out of stock' },
    { id: 2, name: 'Fresh Basil', aisle: 'Produce', store: 'Whole Foods', price: 1.99, unit: '1 bunch', priority: 'high', reason: 'Recipe match' },
    { id: 3, name: 'Zucchini', aisle: 'Produce', store: 'Whole Foods', price: 1.49, unit: '2 pcs', priority: 'medium', reason: 'Recipe match' },
    { id: 4, name: 'Cherry Tomatoes', aisle: 'Produce', store: 'Whole Foods', price: 3.99, unit: '1 pint', priority: 'medium', reason: 'Meal plan' },
    { id: 5, name: 'Eggs', aisle: 'Dairy', store: 'Costco', price: 8.99, unit: '24 count', priority: 'high', reason: 'Running low' },
    { id: 6, name: 'Milk', aisle: 'Dairy', store: 'Whole Foods', price: 4.29, unit: '1 gallon', priority: 'urgent', reason: 'Expiring soon' },
    { id: 7, name: 'Dish Soap', aisle: 'Household', store: 'Costco', price: 12.99, unit: '2-pack', priority: 'medium', reason: 'Running low' },
    { id: 8, name: 'Paper Towels', aisle: 'Household', store: 'Costco', price: 19.99, unit: '12-pack', priority: 'low', reason: 'Running low' },
    { id: 9, name: 'Shampoo', aisle: 'Personal Care', store: 'CVS', price: 7.49, unit: '1 bottle', priority: 'medium', reason: 'Running low' },
    { id: 10, name: 'Greek Yogurt', aisle: 'Dairy', store: 'Whole Foods', price: 5.99, unit: '4-pack', priority: 'low', reason: 'Meal prep' },
  ];

  const plans = [
    {
      id: 1, name: 'School Lunches', icon: '🎒', color: '#00E5A3',
      desc: 'Mon–Fri packed lunches for 2 kids',
      items: 8, done: 3, budget: 35, spent: 12,
      tags: ['Pantry', 'Fridge', 'Snacks'],
    },
    {
      id: 2, name: 'Apartment Restock', icon: '🏠', color: '#00B8D4',
      desc: 'Weekly essentials and household supplies',
      items: 14, done: 5, budget: 60, spent: 18,
      tags: ['Pantry', 'Cleaning', 'Personal'],
    },
    {
      id: 3, name: 'Weekend BBQ', icon: '🔥', color: '#FF7A50',
      desc: 'Saturday cookout for 8 people',
      items: 12, done: 0, budget: 80, spent: 0,
      tags: ['Meat', 'Produce', 'Drinks'],
    },
  ];

  // === ICON HELPER ===
  const Icon = ({ name, size = 20, color }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color: color || t.text, strokeWidth: 2 });
  };

  // === STATUS BAR ===
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 0', height: 44 }}>
      <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: t.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="Wifi" size={14} color={t.text} />
        <Icon name="Signal" size={14} color={t.text} />
        <div style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${t.textMuted}`, padding: '1.5px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '75%', height: '100%', background: t.primary, borderRadius: 1.5 }} />
          </div>
        </div>
      </div>
    </div>
  );

  // === DYNAMIC ISLAND ===
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
    </div>
  );

  // === PRIORITY BADGE ===
  const priorityColor = (p) => {
    if (p === 'urgent') return { bg: t.dangerDim, text: t.danger };
    if (p === 'high') return { bg: t.warningDim, text: t.warning };
    if (p === 'medium') return { bg: t.primaryDim, text: t.primary };
    return { bg: t.surface3, text: t.textMuted };
  };

  // === SCREEN: HOME ===
  const HomeScreen = () => {
    const totalBudget = 80;
    const spent = 45.24;
    const pct = spent / totalBudget;
    const circumference = 2 * Math.PI * 52;
    const strokeDash = circumference * (1 - pct);

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 8px' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Outfit', fontSize: 13, color: t.textMuted, fontWeight: 500 }}>Good Morning</div>
            <div style={{ fontFamily: 'Outfit', fontSize: 22, color: t.text, fontWeight: 700, lineHeight: 1.2 }}>Alex 👋</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.primaryDim, border: `1.5px solid ${t.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="Bell" size={18} color={t.primary} />
          </div>
        </div>

        {/* Budget Card */}
        <div style={{ margin: '0 16px 16px', background: `linear-gradient(135deg, ${t.surface2} 0%, ${t.surface3} 100%)`, borderRadius: 20, padding: 20, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke={t.border2} strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={t.primary} strokeWidth="10"
                  strokeDasharray={circumference} strokeDashoffset={strokeDash}
                  strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: t.text }}>${spent.toFixed(0)}</div>
                <div style={{ fontFamily: 'Outfit', fontSize: 10, color: t.textMuted }}>of ${totalBudget}</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 }}>Weekly Budget</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 13, color: t.textMuted, marginBottom: 12 }}>${(totalBudget - spent).toFixed(2)} remaining</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: 'Items', value: '10' },
                  { label: 'Stores', value: '3' },
                ].map(s => (
                  <div key={s.label} style={{ background: t.surface, borderRadius: 10, padding: '6px 12px', border: `1px solid ${t.border}` }}>
                    <div style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: t.primary }}>{s.value}</div>
                    <div style={{ fontFamily: 'Outfit', fontSize: 10, color: t.textMuted }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Smart Alert */}
        <div style={{ margin: '0 16px 14px', background: t.warningDim, border: `1px solid ${t.warning}30`, borderRadius: 16, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: `${t.warning}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="Zap" size={16} color={t.warning} />
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 600, color: t.warning, marginBottom: 2 }}>Cartwise Smart Tip</div>
            <div style={{ fontFamily: 'Outfit', fontSize: 12, color: t.text, lineHeight: 1.5 }}>You have 2 pasta packs but no sauce. Skip pasta and add tomato sauce + fresh basil to make the most of what you have.</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '0 16px', marginBottom: 14 }}>
          <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 600, color: t.textMuted, marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: 'ScanLine', label: 'Scan Receipt', sub: 'Add via photo', tab: 'inventory' },
              { icon: 'Plus', label: 'Add to List', sub: '10 items ready', tab: 'list' },
              { icon: 'Map', label: 'Store Route', sub: '3 stores nearby', tab: 'list' },
              { icon: 'CalendarDays', label: 'Meal Plan', sub: '3 active plans', tab: 'planner' },
            ].map((a) => (
              <div key={a.label}
                onClick={() => { press(a.label); setActiveTab(a.tab); }}
                style={{
                  background: pressed === a.label ? t.surface3 : t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: 16, padding: '14px 14px',
                  cursor: 'pointer', transform: pressed === a.label ? 'scale(0.96)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Icon name={a.icon} size={18} color={t.primary} />
                </div>
                <div style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 600, color: t.text }}>{a.label}</div>
                <div style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>{a.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expiry Alerts */}
        <div style={{ padding: '0 16px', marginBottom: 14 }}>
          <div style={{ fontFamily: 'Outfit', fontSize: 11, fontWeight: 600, color: t.textMuted, marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>Expiring Soon</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Milk', expiry: '2 days', action: 'Make oatmeal or smoothies' },
              { name: 'Eggs (6 left)', expiry: '4 days', action: 'Scrambled eggs recipe →' },
            ].map(item => (
              <div key={item.name} style={{ background: t.dangerDim, border: `1px solid ${t.danger}25`, borderRadius: 14, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 600, color: t.text }}>{item.name}</div>
                  <div style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>{item.action}</div>
                </div>
                <div style={{ background: t.dangerDim, borderRadius: 8, padding: '4px 8px' }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: 11, fontWeight: 600, color: t.danger }}>{item.expiry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // === SCREEN: INVENTORY ===
  const InventoryScreen = () => {
    const cats = ['All', 'Pantry', 'Fridge', 'Cleaning', 'Personal'];
    const filtered = activeCategory === 'All' ? inventory : inventory.filter(i => i.cat === activeCategory);
    const statusColor = (s) => {
      if (s === 'empty') return t.danger;
      if (s === 'expiring') return t.warning;
      if (s === 'low') return '#FF7A50';
      return t.primary;
    };
    const statusLabel = (s) => ({ empty: 'Empty', expiring: 'Expiring', low: 'Low', ok: 'OK' }[s]);

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: t.text }}>Inventory</div>
            <div style={{ fontFamily: 'Outfit', fontSize: 13, color: t.textMuted }}>{inventory.length} items tracked</div>
          </div>
          <div onClick={() => { press('scan'); setScanAnimation(true); setTimeout(() => setScanAnimation(false), 800); }}
            style={{ width: 42, height: 42, borderRadius: 14, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transform: pressed === 'scan' ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.15s' }}>
            <Icon name="ScanLine" size={20} color="#000" />
          </div>
        </div>

        {/* Scan banner */}
        {scanAnimation && (
          <div style={{ margin: '0 16px 12px', background: t.primaryDim, border: `1px solid ${t.primary}40`, borderRadius: 14, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Outfit', fontSize: 13, color: t.primary, fontWeight: 600 }}>📸 Point camera at receipt or barcode...</div>
          </div>
        )}

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px', overflowX: 'auto' }}>
          {cats.map(c => (
            <div key={c} onClick={() => setActiveCategory(c)}
              style={{ fontFamily: 'Outfit', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                background: activeCategory === c ? t.primary : t.surface2,
                color: activeCategory === c ? '#000' : t.textMuted,
                border: `1px solid ${activeCategory === c ? t.primary : t.border}`,
                transition: 'all 0.2s' }}>
              {c}
            </div>
          ))}
        </div>

        {/* Items */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 16 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: t.surface, border: `1px solid ${item.status !== 'ok' ? statusColor(item.status) + '30' : t.border}`, borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${statusColor(item.status)}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="Package" size={18} color={statusColor(item.status)} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 600, color: t.text }}>{item.name}</div>
                  <div style={{ fontFamily: 'Outfit', fontSize: 12, color: t.textMuted }}>{item.qty} · {item.cat}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{ background: `${statusColor(item.status)}20`, borderRadius: 8, padding: '2px 8px' }}>
                  <span style={{ fontFamily: 'Outfit', fontSize: 11, fontWeight: 600, color: statusColor(item.status) }}>{statusLabel(item.status)}</span>
                </div>
                {item.expiry && <span style={{ fontFamily: 'Outfit', fontSize: 10, color: t.warning }}>Exp: {item.expiry}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === SCREEN: SHOPPING LIST ===
  const ShoppingScreen = () => {
    const aisles = [...new Set(shoppingItems.map(i => i.aisle))];
    const totalEst = shoppingItems.reduce((s, i) => s + i.price, 0);
    const checkedTotal = shoppingItems.filter(i => checkedItems.has(i.id)).reduce((s, i) => s + i.price, 0);
    const toggleCheck = (id) => {
      setCheckedItems(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
      });
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px 12px' }}>
          <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: t.text }}>Shopping List</div>
          <div style={{ fontFamily: 'Outfit', fontSize: 13, color: t.textMuted }}>{checkedItems.size} of {shoppingItems.length} checked</div>
        </div>

        {/* Budget bar */}
        <div style={{ margin: '0 16px 14px', background: t.surface, borderRadius: 16, padding: '12px 16px', border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: 'Outfit', fontSize: 13, color: t.textMuted }}>Est. Total</span>
            <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 700, color: totalEst > 80 ? t.danger : t.primary }}>${totalEst.toFixed(2)} <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 400 }}>/ $80</span></span>
          </div>
          <div style={{ height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(totalEst / 80 * 100, 100)}%`, background: totalEst > 80 ? t.danger : t.primary, borderRadius: 3, transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>Checked: ${checkedTotal.toFixed(2)}</span>
            <span style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>Budget: $80</span>
          </div>
        </div>

        {/* Store recommendation */}
        <div style={{ margin: '0 16px 14px', background: `linear-gradient(90deg, ${t.primaryDim} 0%, ${t.surface2} 100%)`, borderRadius: 14, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center', border: `1px solid ${t.primary}30` }}>
          <Icon name="MapPin" size={16} color={t.primary} />
          <div style={{ fontFamily: 'Outfit', fontSize: 12, color: t.text, flex: 1 }}>
            <span style={{ fontWeight: 600, color: t.primary }}>Best route: </span>Whole Foods → Costco → CVS · saves ~23 min
          </div>
        </div>

        {/* Items by aisle */}
        {aisles.map(aisle => (
          <div key={aisle} style={{ padding: '0 16px', marginBottom: 14 }}>
            <div style={{ fontFamily: 'Outfit', fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>{aisle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {shoppingItems.filter(i => i.aisle === aisle).map(item => {
                const isChecked = checkedItems.has(item.id);
                const pc = priorityColor(item.priority);
                return (
                  <div key={item.id} onClick={() => toggleCheck(item.id)}
                    style={{ background: isChecked ? t.surface2 : t.surface, border: `1px solid ${isChecked ? t.border : t.border}`, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', opacity: isChecked ? 0.6 : 1, transition: 'all 0.2s' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 8, border: `2px solid ${isChecked ? t.primary : t.border2}`, background: isChecked ? t.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                      {isChecked && <Icon name="Check" size={14} color="#000" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 600, color: t.text, textDecoration: isChecked ? 'line-through' : 'none' }}>{item.name}</div>
                      <div style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>{item.unit} · {item.store}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                      <span style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 700, color: t.text }}>${item.price.toFixed(2)}</span>
                      <div style={{ background: pc.bg, borderRadius: 6, padding: '2px 6px' }}>
                        <span style={{ fontFamily: 'Outfit', fontSize: 10, fontWeight: 600, color: pc.text }}>{item.reason}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // === SCREEN: PLANNER ===
  const PlannerScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: t.text }}>Plans</div>
          <div style={{ fontFamily: 'Outfit', fontSize: 13, color: t.textMuted }}>{plans.length} active shopping plans</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: t.primaryDim, border: `1px solid ${t.primary}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="Plus" size={18} color={t.primary} />
        </div>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
        {plans.map(plan => {
          const pct = plan.items > 0 ? plan.done / plan.items : 0;
          return (
            <div key={plan.id} onClick={() => setActivePlan(activePlan === plan.id ? null : plan.id)}
              style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: '16px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `${plan.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{plan.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 700, color: t.text }}>{plan.name}</div>
                    <div style={{ fontFamily: 'Outfit', fontSize: 12, color: t.textMuted }}>{plan.desc}</div>
                  </div>
                </div>
                <Icon name={activePlan === plan.id ? 'ChevronUp' : 'ChevronDown'} size={16} color={t.textMuted} />
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>{plan.done}/{plan.items} items ready</span>
                  <span style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>${plan.spent}/${plan.budget} spent</span>
                </div>
                <div style={{ height: 6, background: t.border, borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${pct * 100}%`, background: plan.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {plan.tags.map(tag => (
                  <div key={tag} style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, padding: '3px 10px' }}>
                    <span style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>{tag}</span>
                  </div>
                ))}
              </div>

              {/* Expanded */}
              {activePlan === plan.id && (
                <div style={{ marginTop: 14, borderTop: `1px solid ${t.border}`, paddingTop: 14 }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: 12, color: t.textMuted, marginBottom: 10 }}>Cartwise suggests for this plan:</div>
                  {['Check pantry before buying', 'Substitute brand for savings', 'Buy in bulk at Costco'].map(s => (
                    <div key={s} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                      <Icon name="Sparkles" size={13} color={t.primary} />
                      <span style={{ fontFamily: 'Outfit', fontSize: 12, color: t.text }}>{s}</span>
                    </div>
                  ))}
                  <div onClick={(e) => { e.stopPropagation(); press('gen' + plan.id); setActiveTab('list'); }}
                    style={{ marginTop: 12, background: t.primary, borderRadius: 12, padding: '10px', textAlign: 'center', cursor: 'pointer', transform: pressed === 'gen' + plan.id ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.15s' }}>
                    <span style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 700, color: '#000' }}>Generate Shopping List →</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // === SCREEN: SETTINGS ===
  const SettingsScreen = () => {
    const Row = ({ icon, label, sub, right, onClick, danger }) => (
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', cursor: onClick ? 'pointer' : 'default', background: 'transparent' }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: danger ? t.dangerDim : t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={18} color={danger ? t.danger : t.primary} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 500, color: danger ? t.danger : t.text }}>{label}</div>
          {sub && <div style={{ fontFamily: 'Outfit', fontSize: 11, color: t.textMuted }}>{sub}</div>}
        </div>
        {right}
      </div>
    );

    const Toggle = ({ on, onToggle }) => (
      <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 13, background: on ? t.primary : t.surface3, border: `1px solid ${on ? t.primary : t.border}`, position: 'relative', cursor: 'pointer', transition: 'all 0.25s', flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, left: on ? 20 : 2, transition: 'left 0.25s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
      </div>
    );

    const Section = ({ title, children }) => (
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: 'Outfit', fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: 0.6, textTransform: 'uppercase', padding: '8px 16px 4px' }}>{title}</div>
        <div style={{ background: t.surface, borderRadius: 18, margin: '0 16px', overflow: 'hidden', border: `1px solid ${t.border}` }}>
          {children}
        </div>
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        <div style={{ padding: '16px 20px 16px' }}>
          <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: t.text }}>Settings</div>
        </div>

        {/* Profile */}
        <div style={{ margin: '0 16px 16px', background: `linear-gradient(135deg, ${t.surface2}, ${t.surface3})`, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}`, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: t.text }}>Alex Johnson</div>
            <div style={{ fontFamily: 'Outfit', fontSize: 12, color: t.textMuted }}>alex@email.com</div>
            <div style={{ fontFamily: 'Outfit', fontSize: 11, color: t.primary, marginTop: 2 }}>Pro Member · 4 months</div>
          </div>
          <Icon name="ChevronRight" size={18} color={t.textMuted} />
        </div>

        <Section title="Appearance">
          <Row icon={darkMode ? 'Moon' : 'Sun'} label={darkMode ? 'Dark Mode' : 'Light Mode'} sub="Change app appearance"
            right={<Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />}
            onClick={() => setDarkMode(!darkMode)} />
        </Section>

        <Section title="Shopping">
          <Row icon="DollarSign" label="Weekly Budget" sub="$80 per week" right={<Icon name="ChevronRight" size={16} color={t.textMuted} />} onClick={() => {}} />
          <div style={{ height: 1, background: t.border, margin: '0 16px' }} />
          <Row icon="MapPin" label="Preferred Stores" sub="Whole Foods, Costco, CVS" right={<Icon name="ChevronRight" size={16} color={t.textMuted} />} onClick={() => {}} />
          <div style={{ height: 1, background: t.border, margin: '0 16px' }} />
          <Row icon="Bell" label="Expiry Alerts" sub="Notify 2 days before" right={<Toggle on={true} onToggle={() => {}} />} />
        </Section>

        <Section title="About">
          <Row icon="Info" label="Version" sub="Cartwise 1.0.0 · Build 42" right={null} />
          <div style={{ height: 1, background: t.border, margin: '0 16px' }} />
          <Row icon="Star" label="Rate the App" sub="Share your feedback" right={<Icon name="ChevronRight" size={16} color={t.textMuted} />} onClick={() => {}} />
        </Section>

        <Section title="Account">
          <Row icon="LogOut" label="Sign Out" danger onClick={() => {}} />
        </Section>
      </div>
    );
  };

  // === BOTTOM NAV ===
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'inventory', icon: 'Package', label: 'Pantry' },
    { id: 'list', icon: 'ShoppingCart', label: 'List' },
    { id: 'planner', icon: 'CalendarDays', label: 'Planner' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  const screens = {
    home: HomeScreen,
    inventory: InventoryScreen,
    list: ShoppingScreen,
    planner: PlannerScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', padding: '20px 0' }}>
      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 54,
        background: t.bg,
        boxShadow: '0 50px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 2px rgba(255,255,255,0.05)',
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease',
      }}>
        {/* Status bar */}
        <StatusBar />

        {/* Dynamic Island */}
        <DynamicIsland />

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <ActiveScreen />
        </div>

        {/* Bottom Navigation */}
        <div style={{
          height: 82, background: t.surface, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'flex-start', paddingTop: 8, paddingBottom: 16,
          paddingLeft: 4, paddingRight: 4,
        }}>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} onClick={() => setActiveTab(item.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 0', borderRadius: 12, transition: 'all 0.2s' }}>
                <div style={{ width: 36, height: 32, borderRadius: 10, background: isActive ? t.primaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  <Icon name={item.icon} size={20} color={isActive ? t.primary : t.textDim} />
                </div>
                <span style={{ fontFamily: 'Outfit', fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textDim, transition: 'all 0.2s' }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
