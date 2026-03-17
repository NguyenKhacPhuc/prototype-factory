function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = document.createElement('style');
  fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Noto+Serif:ital,wght@0,400;0,600;1,400&display=swap');`;
  if (!document.head.querySelector('[data-flavor-fonts]')) {
    fontStyle.setAttribute('data-flavor-fonts', '1');
    document.head.appendChild(fontStyle);
  }

  const colors = {
    bg: '#F5F5F0',
    bgCard: '#FAFAF7',
    matcha: '#8DB580',
    matchaDark: '#6A9060',
    matchaLight: '#B8D4AD',
    warmGray: '#A89F91',
    warmGrayLight: '#D4CFC9',
    gold: '#D4AF37',
    goldLight: '#EDD87A',
    text: '#2C2C28',
    textMuted: '#7A7570',
    textLight: '#A89F91',
    border: '#E8E4DC',
    white: '#FFFFFF',
    cream: '#F0EDE6',
  };

  const [activeTab, setActiveTab] = useState('discover');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [matchScreen, setMatchScreen] = useState('input'); // input | results
  const [ingredients, setIngredients] = useState(['Salmon', 'Lemon', 'Dill']);
  const [inputValue, setInputValue] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [savedItems, setSavedItems] = useState(['Salmon + Miso', 'Chocolate + Raspberry']);
  const [communityFilter, setCommunityFilter] = useState('trending');
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  const handleAnalyze = () => {
    setAnalyzeLoading(true);
    setTimeout(() => {
      setAnalyzeLoading(false);
      setMatchScreen('results');
    }, 1800);
  };

  const handleSave = (item) => {
    if (!savedItems.includes(item)) {
      setSavedItems([item, ...savedItems]);
      setShowAddedToast(true);
      setTimeout(() => setShowAddedToast(false), 2000);
    }
  };

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const featuredPairings = [
    { id: 1, title: 'Salmon & Yuzu Miso', category: 'Japanese Fusion', match: 98, emoji: '🐟', desc: 'Citrus-forward umami with fatty salmon creates a transcendent balance' },
    { id: 2, title: 'Lamb & Pomegranate', category: 'Middle Eastern', match: 95, emoji: '🍖', desc: 'Sweet tartness cuts through rich lamb fat beautifully' },
    { id: 3, title: 'Dark Chocolate & Sea Salt Caramel', category: 'Dessert', match: 97, emoji: '🍫', desc: 'Bitter complexity elevated by sweet–salt contrast' },
    { id: 4, title: 'Burrata & Peach', category: 'Italian', match: 93, emoji: '🧀', desc: 'Creamy milkfat harmonizes with stone fruit sweetness' },
  ];

  const matchResults = [
    {
      id: 1, name: 'Salmon Gravlax with Dill Crème', type: 'Main Dish', time: '25 min', difficulty: 'Easy',
      ingredients: ['Salmon', 'Lemon', 'Dill', 'Capers', 'Cream Cheese'],
      sides: ['Rye Crispbread', 'Pickled Cucumber'],
      drinks: ['Dry Riesling', 'Cucumber Water'],
      flavorNotes: ['Citrus', 'Herbal', 'Creamy', 'Umami'],
      score: 96
    },
    {
      id: 2, name: 'Pan-Seared Salmon with Lemon Beurre Blanc', type: 'Main Dish', time: '20 min', difficulty: 'Medium',
      ingredients: ['Salmon', 'Lemon', 'Butter', 'Shallots', 'White Wine'],
      sides: ['Haricots Verts', 'Roasted Fingerlings'],
      drinks: ['White Burgundy', 'Sparkling Water'],
      flavorNotes: ['Rich', 'Bright', 'Buttery', 'Tangy'],
      score: 92
    },
    {
      id: 3, name: 'Salmon & Dill Soufflé', type: 'Elegant', time: '45 min', difficulty: 'Hard',
      ingredients: ['Salmon', 'Dill', 'Eggs', 'Gruyère', 'Béchamel'],
      sides: ['Watercress Salad', 'Brioche'],
      drinks: ['Champagne', 'Pear Nectar'],
      flavorNotes: ['Airy', 'Savory', 'Complex', 'Delicate'],
      score: 89
    },
  ];

  const communityPosts = [
    { id: 1, user: 'Mei K.', avatar: '👩‍🍳', combo: 'Miso + Honey + Ginger', result: 'Glazed Tofu', likes: 247, comment: 'The fermented depth with floral honey is life-changing.', tags: ['vegan', 'asian', 'easy'] },
    { id: 2, user: 'Carlos V.', avatar: '🧑‍🍳', combo: 'Chorizo + Dark Chocolate', result: 'Mole Sauce', likes: 189, comment: 'My abuela would love this modern take on mole.', tags: ['mexican', 'bold', 'spicy'] },
    { id: 3, user: 'Priya S.', avatar: '👩', combo: 'Cardamom + Rose + Pistachio', result: 'Persian Semifreddo', likes: 312, comment: 'Floral and nutty together — absolutely magical.', tags: ['dessert', 'persian', 'elegant'] },
    { id: 4, user: 'Thomas B.', avatar: '🧔', combo: 'Blue Cheese + Fig + Walnut', result: 'Harvest Board', likes: 156, comment: 'Perfect autumn cheese board combination.', tags: ['cheese', 'seasonal', 'wine-friendly'] },
    { id: 5, user: 'Aiko N.', avatar: '👧', combo: 'Matcha + White Chocolate + Yuzu', result: 'Mousse Cake', likes: 423, comment: 'Three layers of Japanese-French fusion perfection.', tags: ['japanese', 'dessert', 'complex'] },
  ];

  const trendingCombos = [
    { combo: 'Truffle + Parmesan', trend: '+34%', emoji: '🍄' },
    { combo: 'Mango + Tajín', trend: '+28%', emoji: '🥭' },
    { combo: 'Tahini + Honey', trend: '+22%', emoji: '🍯' },
  ];

  // --- Styles ---
  const s = {
    page: {
      minHeight: '100vh',
      background: '#1C1C1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Noto Sans', sans-serif",
      padding: '20px',
    },
    phone: {
      width: '375px',
      height: '812px',
      background: colors.bg,
      borderRadius: '50px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
    },
    dynamicIsland: {
      position: 'absolute',
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      height: '34px',
      background: '#111',
      borderRadius: '20px',
      zIndex: 50,
    },
    statusBar: {
      height: '50px',
      background: colors.bg,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '0 28px 6px',
      zIndex: 40,
      flexShrink: 0,
    },
    statusTime: { fontSize: '12px', fontWeight: '600', color: colors.text, letterSpacing: '0.5px' },
    statusIcons: { display: 'flex', gap: '5px', alignItems: 'center' },
    content: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      background: colors.bg,
      scrollbarWidth: 'none',
    },
    bottomNav: {
      height: '80px',
      background: colors.white,
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 10px 14px',
      flexShrink: 0,
    },
    navItem: (active) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3px',
      padding: '8px 16px',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      background: active ? colors.matchaLight + '40' : 'transparent',
    }),
    navLabel: (active) => ({
      fontSize: '10px',
      fontWeight: active ? '600' : '400',
      color: active ? colors.matcha : colors.textMuted,
    }),
    sectionHeader: {
      padding: '20px 20px 12px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: colors.text,
      letterSpacing: '-0.3px',
    },
    sectionSubtitle: {
      fontSize: '13px',
      color: colors.textMuted,
      marginTop: '2px',
    },
    card: {
      background: colors.bgCard,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    pillTag: (color) => ({
      background: color + '25',
      color: color,
      fontSize: '11px',
      fontWeight: '500',
      padding: '3px 9px',
      borderRadius: '20px',
    }),
    btn: (pressed, primary) => ({
      background: pressed ? (primary ? colors.matchaDark : colors.cream) : (primary ? colors.matcha : colors.bgCard),
      color: primary ? colors.white : colors.text,
      border: primary ? 'none' : `1px solid ${colors.border}`,
      padding: primary ? '13px 24px' : '10px 18px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transform: pressed ? 'scale(0.96)' : 'scale(1)',
      transition: 'all 0.15s ease',
      letterSpacing: '0.1px',
    }),
  };

  // --- Status Bar ---
  const StatusBar = () => (
    <div style={s.statusBar}>
      <span style={s.statusTime}>{time || '09:41'}</span>
      <div style={s.statusIcons}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: colors.text })}
        {React.createElement(window.lucide.Signal, { size: 14, color: colors.text })}
        <div style={{ width: '22px', height: '12px', borderRadius: '3px', border: `1.5px solid ${colors.text}`, position: 'relative', display: 'flex', alignItems: 'center', padding: '2px' }}>
          <div style={{ width: '70%', height: '100%', background: colors.matcha, borderRadius: '1px' }} />
          <div style={{ width: '3px', height: '5px', background: colors.text, borderRadius: '0 1px 1px 0', position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>
    </div>
  );

  // --- DISCOVER SCREEN ---
  const DiscoverScreen = () => (
    <div>
      {/* Hero */}
      <div style={{ padding: '8px 20px 16px', background: `linear-gradient(160deg, ${colors.bg} 0%, ${colors.cream} 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: colors.text, letterSpacing: '-0.5px' }}>Good morning 🌿</div>
            <div style={{ fontSize: '13px', color: colors.textMuted, marginTop: '2px' }}>What are you craving today?</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: colors.matcha, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>S</div>
        </div>
        {/* Quick search */}
        <div style={{ marginTop: '16px', background: colors.white, borderRadius: '14px', border: `1px solid ${colors.border}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {React.createElement(window.lucide.Search, { size: 16, color: colors.textMuted })}
          <span style={{ fontSize: '14px', color: colors.textLight }}>Search ingredients or dishes...</span>
        </div>
      </div>

      {/* Trending */}
      <div style={s.sectionHeader}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={s.sectionTitle}>Trending Pairings</div>
          <span style={{ fontSize: '12px', color: colors.matcha, fontWeight: '600' }}>See all</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', padding: '0 20px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {trendingCombos.map((t, i) => (
          <div key={i} style={{ minWidth: '120px', background: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`, padding: '14px 12px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '26px', marginBottom: '6px' }}>{t.emoji}</div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: colors.text, lineHeight: 1.3 }}>{t.combo}</div>
            <div style={{ fontSize: '10px', color: colors.matcha, fontWeight: '500', marginTop: '4px' }}>{t.trend}</div>
          </div>
        ))}
        <div style={{ minWidth: '120px', background: `${colors.matcha}15`, borderRadius: '14px', border: `1.5px dashed ${colors.matcha}60`, padding: '14px 12px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          {React.createElement(window.lucide.Plus, { size: 20, color: colors.matcha })}
          <div style={{ fontSize: '11px', fontWeight: '600', color: colors.matcha }}>Add Yours</div>
        </div>
      </div>

      {/* Featured */}
      <div style={s.sectionHeader}>
        <div style={s.sectionTitle}>Featured Combos</div>
        <div style={s.sectionSubtitle}>Curated by our AI flavor engine</div>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {featuredPairings.map((p) => (
          <div key={p.id} style={{ ...s.card, padding: '16px', cursor: 'pointer', display: 'flex', gap: '14px', alignItems: 'flex-start' }}
            onClick={() => { setActiveTab('match'); setMatchScreen('results'); }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${colors.matcha}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
              {p.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: colors.text, lineHeight: 1.2 }}>{p.title}</div>
                <div style={{ background: `${colors.gold}25`, color: colors.gold, fontSize: '11px', fontWeight: '700', padding: '3px 7px', borderRadius: '8px', flexShrink: 0, marginLeft: '8px' }}>
                  {p.match}%
                </div>
              </div>
              <div style={{ fontSize: '11px', color: colors.matcha, fontWeight: '500', marginTop: '2px' }}>{p.category}</div>
              <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '5px', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Seasonal picks */}
      <div style={{ margin: '20px', borderRadius: '18px', background: `linear-gradient(135deg, ${colors.matcha}30, ${colors.gold}20)`, border: `1px solid ${colors.matcha}40`, padding: '18px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ fontSize: '32px' }}>🌸</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: colors.matchaDark }}>Spring Seasonal</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: colors.text, marginTop: '1px' }}>Asparagus & Brown Butter</div>
            <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '3px' }}>Peak season pairing · 94% match score</div>
          </div>
        </div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          {['Nutty', 'Grassy', 'Savory', 'Rich'].map(t => (
            <span key={t} style={s.pillTag(colors.matcha)}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ height: '20px' }} />
    </div>
  );

  // --- MATCH SCREEN ---
  const MatchScreen = () => {
    if (matchScreen === 'results' && !analyzeLoading) return <MatchResults />;
    return (
      <div>
        <div style={{ padding: '16px 20px 10px' }}>
          <div style={{ fontSize: '22px', fontWeight: '700', color: colors.text, letterSpacing: '-0.3px' }}>Flavor Match</div>
          <div style={{ fontSize: '13px', color: colors.textMuted, marginTop: '2px' }}>Add your ingredients and discover perfect pairings</div>
        </div>

        {/* Ingredients */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Your Ingredients</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
            {ingredients.map((ing) => (
              <div key={ing} style={{ background: `${colors.matcha}20`, borderRadius: '20px', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '7px', border: `1px solid ${colors.matcha}40` }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: colors.matchaDark }}>{ing}</span>
                <span style={{ fontSize: '14px', color: colors.matcha, cursor: 'pointer', lineHeight: 1 }} onClick={() => removeIngredient(ing)}>×</span>
              </div>
            ))}
          </div>
          {/* Input */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <div style={{ flex: 1, background: colors.white, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '11px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {React.createElement(window.lucide.Leaf, { size: 14, color: colors.matcha })}
              <input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addIngredient()}
                placeholder="Add ingredient..."
                style={{ border: 'none', outline: 'none', fontSize: '14px', color: colors.text, background: 'transparent', flex: 1, fontFamily: "'Noto Sans', sans-serif" }}
              />
            </div>
            <button onClick={addIngredient} style={{ ...s.btn(pressedBtn === 'add', true), padding: '11px 16px', borderRadius: '12px' }}
              onMouseDown={() => handlePress('add')} onTouchStart={() => handlePress('add')}>
              {React.createElement(window.lucide.Plus, { size: 16 })}
            </button>
          </div>
          {/* Quick add suggestions */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '4px 0' }}>
            {['Garlic', 'Butter', 'Thyme', 'White Wine', 'Capers'].map(s => (
              <span key={s} style={{ fontSize: '12px', color: colors.textMuted, background: colors.cream, borderRadius: '10px', padding: '4px 10px', cursor: 'pointer', border: `1px solid ${colors.border}` }}
                onClick={() => { if (!ingredients.includes(s)) setIngredients([...ingredients, s]); }}>
                + {s}
              </span>
            ))}
          </div>
        </div>

        {/* Flavor Profile */}
        <div style={{ margin: '20px', background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Flavor Profile</div>
          {[
            { label: 'Umami', value: 75, color: colors.matcha },
            { label: 'Acidity', value: 60, color: colors.gold },
            { label: 'Fat', value: 50, color: colors.warmGray },
            { label: 'Herbal', value: 85, color: colors.matchaDark },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: colors.textMuted }}>{f.label}</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: f.color }}>{f.value}%</span>
              </div>
              <div style={{ height: '5px', background: colors.cream, borderRadius: '3px' }}>
                <div style={{ height: '100%', width: `${f.value}%`, background: f.color, borderRadius: '3px', transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {analyzeLoading ? (
          <div style={{ margin: '0 20px', padding: '15px', textAlign: 'center', background: `${colors.matcha}15`, borderRadius: '14px' }}>
            <div style={{ fontSize: '14px', color: colors.matcha, fontWeight: '500' }}>
              🌿 Analyzing flavor compounds...
            </div>
            <div style={{ width: '200px', height: '4px', background: colors.cream, borderRadius: '2px', margin: '10px auto 0' }}>
              <div style={{ height: '100%', background: colors.matcha, borderRadius: '2px', animation: 'none', width: '70%' }} />
            </div>
          </div>
        ) : (
          <div style={{ padding: '0 20px' }}>
            <button onClick={handleAnalyze} style={{ ...s.btn(pressedBtn === 'analyze', true), width: '100%', padding: '15px', borderRadius: '14px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onMouseDown={() => handlePress('analyze')} onTouchStart={() => handlePress('analyze')}>
              {React.createElement(window.lucide.Sparkles, { size: 17 })}
              Analyze & Find Pairings
            </button>
          </div>
        )}
        <div style={{ height: '20px' }} />
      </div>
    );
  };

  // --- MATCH RESULTS ---
  const MatchResults = () => (
    <div>
      <div style={{ padding: '16px 20px 10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => setMatchScreen('input')} style={{ width: '34px', height: '34px', borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {React.createElement(window.lucide.ArrowLeft, { size: 16, color: colors.text })}
        </button>
        <div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: colors.text }}>Pairing Results</div>
          <div style={{ fontSize: '12px', color: colors.textMuted }}>{ingredients.join(' · ')}</div>
        </div>
      </div>

      {/* Match badge */}
      <div style={{ margin: '4px 20px 16px', background: `linear-gradient(135deg, ${colors.matcha}25, ${colors.gold}15)`, borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(135deg, ${colors.matcha}, ${colors.matchaDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, fontSize: '16px', fontWeight: '800' }}>96%</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: colors.text }}>Excellent Flavor Harmony</div>
          <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '2px' }}>Your ingredients pair exceptionally well — strong umami-citrus contrast detected</div>
        </div>
      </div>

      {/* Recipe cards */}
      <div style={{ padding: '0 20px 8px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Suggested Recipes</div>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {matchResults.map((r) => (
          <div key={r.id} style={{ ...s.card, padding: '16px', cursor: 'pointer' }} onClick={() => setSelectedRecipe(r)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: colors.text, lineHeight: 1.3 }}>{r.name}</div>
                <div style={{ fontSize: '11px', color: colors.matcha, fontWeight: '500', marginTop: '2px' }}>{r.type}</div>
              </div>
              <div style={{ background: `${colors.gold}20`, color: colors.gold, fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '8px', marginLeft: '8px' }}>{r.score}%</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {React.createElement(window.lucide.Clock, { size: 12, color: colors.textMuted })}
                <span style={{ fontSize: '11px', color: colors.textMuted }}>{r.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {React.createElement(window.lucide.ChefHat, { size: 12, color: colors.textMuted })}
                <span style={{ fontSize: '11px', color: colors.textMuted }}>{r.difficulty}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {r.flavorNotes.map(n => (
                <span key={n} style={s.pillTag(colors.matcha)}>{n}</span>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '10px', display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, fontSize: '11px', color: colors.textMuted }}>
                <span style={{ color: colors.warmGray, fontWeight: '600' }}>Sides: </span>{r.sides.join(', ')}
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleSave(r.name); }} style={{ padding: '4px 10px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: savedItems.includes(r.name) ? `${colors.matcha}20` : colors.white, cursor: 'pointer' }}>
                {React.createElement(window.lucide.Bookmark, { size: 13, color: savedItems.includes(r.name) ? colors.matcha : colors.textMuted, fill: savedItems.includes(r.name) ? colors.matcha : 'none' })}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drink pairings */}
      <div style={{ margin: '16px 20px 20px', background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {React.createElement(window.lucide.Wine, { size: 14, color: colors.gold })}
          <span>Drink Pairings</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[{ name: 'Dry Riesling', type: 'White Wine', notes: 'Citrus, Petrol, High Acidity' },
            { name: 'Yuzu Sake', type: 'Japanese Spirit', notes: 'Floral, Citrus, Umami-friendly' },
            { name: 'Sparkling Mineral Water', type: 'Non-Alcoholic', notes: 'Palate Cleanser' }].map((d, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>{d.name}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>{d.notes}</div>
              </div>
              <span style={s.pillTag(colors.gold)}>{d.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- RECIPES SCREEN ---
  const RecipesScreen = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Quick', 'Vegetarian', 'Seafood', 'Dessert'];
    const recipes = [
      { name: 'Miso-Glazed Black Cod', time: '30 min', serves: 2, difficulty: 'Medium', emoji: '🐟', category: 'Seafood', saved: true, rating: 4.8 },
      { name: 'Burrata & Stone Fruit Salad', time: '15 min', serves: 4, difficulty: 'Easy', emoji: '🧀', category: 'Vegetarian', saved: false, rating: 4.6 },
      { name: 'Lamb Chops with Pomegranate Jus', time: '45 min', serves: 2, difficulty: 'Hard', emoji: '🍖', category: 'Meat', saved: true, rating: 4.9 },
      { name: 'Yuzu Panna Cotta', time: '20 min + chill', serves: 6, difficulty: 'Medium', emoji: '🍮', category: 'Dessert', saved: false, rating: 4.7 },
      { name: 'Asparagus & Parmesan Risotto', time: '35 min', serves: 3, difficulty: 'Medium', emoji: '🌾', category: 'Vegetarian', saved: true, rating: 4.5 },
      { name: 'Seared Scallops & Truffle Foam', time: '25 min', serves: 2, difficulty: 'Hard', emoji: '🐚', category: 'Seafood', saved: false, rating: 4.9 },
    ];
    const filtered = filter === 'All' ? recipes : recipes.filter(r => r.category === filter || (filter === 'Quick' && parseInt(r.time) <= 20));
    return (
      <div>
        <div style={{ padding: '16px 20px 10px' }}>
          <div style={{ fontSize: '22px', fontWeight: '700', color: colors.text }}>Saved Recipes</div>
          <div style={{ fontSize: '13px', color: colors.textMuted, marginTop: '2px' }}>Your curated collection</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', padding: '0 20px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: '20px', border: filter === f ? 'none' : `1px solid ${colors.border}`, background: filter === f ? colors.matcha : colors.white, color: filter === f ? colors.white : colors.textMuted, fontSize: '12px', fontWeight: filter === f ? '600' : '400', cursor: 'pointer' }}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((r, i) => (
            <div key={i} style={{ ...s.card, padding: '14px', display: 'flex', gap: '14px', cursor: 'pointer', alignItems: 'center' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${colors.matcha}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{r.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: colors.text, lineHeight: 1.3 }}>{r.name}</div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: colors.textMuted }}>{r.time}</span>
                  <span style={{ fontSize: '11px', color: colors.textMuted }}>· {r.serves} servings</span>
                  <span style={{ fontSize: '11px', color: r.difficulty === 'Easy' ? colors.matcha : r.difficulty === 'Hard' ? '#C0667A' : colors.gold, fontWeight: '500' }}>{r.difficulty}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                  {[1,2,3,4,5].map(star => (
                    <div key={star} style={{ width: '8px', height: '8px', borderRadius: '1px', background: star <= Math.round(r.rating) ? colors.gold : colors.warmGrayLight, transform: 'rotate(45deg)' }} />
                  ))}
                  <span style={{ fontSize: '10px', color: colors.textMuted, marginLeft: '3px' }}>{r.rating}</span>
                </div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.warmGray })}
            </div>
          ))}
        </div>

        {/* AI Suggest */}
        <div style={{ margin: '16px 20px 0', padding: '16px', background: `linear-gradient(135deg, ${colors.matcha}20, ${colors.gold}15)`, borderRadius: '16px', border: `1px solid ${colors.matcha}30` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {React.createElement(window.lucide.Sparkles, { size: 18, color: colors.matcha })}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.text }}>AI Recipe Generator</div>
              <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '1px' }}>Tell me what you have — I'll craft the recipe</div>
            </div>
          </div>
          <button onClick={() => setActiveTab('match')} style={{ ...s.btn(false, true), width: '100%', marginTop: '12px', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {React.createElement(window.lucide.Wand2, { size: 15 })}
            Generate New Recipe
          </button>
        </div>
        <div style={{ height: '20px' }} />
      </div>
    );
  };

  // --- COMMUNITY SCREEN ---
  const CommunityScreen = () => (
    <div>
      <div style={{ padding: '16px 20px 10px' }}>
        <div style={{ fontSize: '22px', fontWeight: '700', color: colors.text }}>Community</div>
        <div style={{ fontSize: '13px', color: colors.textMuted, marginTop: '2px' }}>Discover combinations from food lovers</div>
      </div>
      <div style={{ display: 'flex', gap: '0', padding: '0 20px 16px' }}>
        {['trending', 'recent', 'following'].map(f => (
          <button key={f} onClick={() => setCommunityFilter(f)} style={{ flex: 1, padding: '8px 4px', border: 'none', borderBottom: communityFilter === f ? `2px solid ${colors.matcha}` : `2px solid ${colors.border}`, background: 'transparent', color: communityFilter === f ? colors.matcha : colors.textMuted, fontSize: '13px', fontWeight: communityFilter === f ? '600' : '400', cursor: 'pointer', textTransform: 'capitalize' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {communityPosts.map(post => (
          <div key={post.id} style={{ ...s.card, padding: '16px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: `${colors.matcha}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{post.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: colors.text }}>{post.user}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>shared a pairing</div>
              </div>
              {React.createElement(window.lucide.MoreHorizontal, { size: 16, color: colors.textMuted })}
            </div>

            {/* Combo highlight */}
            <div style={{ background: `${colors.matcha}15`, borderRadius: '12px', padding: '12px', marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>Pairing Combination</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: colors.matchaDark }}>{post.combo}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                {React.createElement(window.lucide.ArrowRight, { size: 12, color: colors.warmGray })}
                <span style={{ fontSize: '12px', color: colors.text, fontWeight: '500' }}>{post.result}</span>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: colors.text, lineHeight: 1.6, marginBottom: '10px', fontStyle: 'italic' }}>"{post.comment}"</div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
              {post.tags.map(t => (
                <span key={t} style={s.pillTag(colors.warmGray)}>#{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${colors.border}`, paddingTop: '10px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                  {React.createElement(window.lucide.Heart, { size: 14, color: colors.warmGray })}
                  <span style={{ fontSize: '12px', color: colors.textMuted }}>{post.likes}</span>
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                  {React.createElement(window.lucide.MessageCircle, { size: 14, color: colors.warmGray })}
                  <span style={{ fontSize: '12px', color: colors.textMuted }}>Reply</span>
                </button>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: `${colors.matcha}15`, borderRadius: '8px', padding: '5px 10px', cursor: 'pointer' }}>
                {React.createElement(window.lucide.BookmarkPlus, { size: 12, color: colors.matcha })}
                <span style={{ fontSize: '11px', color: colors.matcha, fontWeight: '500' }}>Try it</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: '20px' }} />
    </div>
  );

  // --- PROFILE SCREEN ---
  const ProfileScreen = () => {
    const stats = [{ label: 'Pairings', value: '47' }, { label: 'Saved', value: '23' }, { label: 'Shared', value: '12' }];
    return (
      <div>
        {/* Header */}
        <div style={{ background: `linear-gradient(160deg, ${colors.matcha}30, ${colors.bg} 70%)`, padding: '20px 20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: colors.text }}>Profile</div>
            {React.createElement(window.lucide.Settings, { size: 20, color: colors.textMuted })}
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '32px', background: `linear-gradient(135deg, ${colors.matcha}, ${colors.matchaDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '700', color: colors.white, border: `3px solid ${colors.white}` }}>S</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: colors.text }}>Sarah Chen</div>
              <div style={{ fontSize: '12px', color: colors.textMuted }}>@sarahcooks · Food enthusiast</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                {React.createElement(window.lucide.MapPin, { size: 11, color: colors.textMuted })}
                <span style={{ fontSize: '11px', color: colors.textMuted }}>San Francisco, CA</span>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', gap: '0', marginTop: '20px', background: colors.white, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${colors.border}` }}>
            {stats.map((st, i) => (
              <div key={i} style={{ flex: 1, padding: '14px 8px', textAlign: 'center', borderRight: i < 2 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: colors.text }}>{st.value}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '2px' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Taste Profile */}
        <div style={{ margin: '0 20px 16px', background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: colors.text, marginBottom: '12px' }}>My Flavor Personality</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {['Umami Seeker', 'Citrus Lover', 'Spice Curious', 'Ferment Fan'].map(t => (
              <span key={t} style={{ background: `${colors.matcha}20`, color: colors.matchaDark, fontSize: '12px', fontWeight: '500', padding: '5px 11px', borderRadius: '20px' }}>{t}</span>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: colors.textMuted, lineHeight: 1.6 }}>You love bold, complex flavors with acidic brightness and savory depth. Your palate gravitates toward Japanese and Mediterranean influences.</div>
        </div>

        {/* Saved Combos */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: colors.text, marginBottom: '10px' }}>Saved Combinations</div>
          {savedItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < savedItems.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {React.createElement(window.lucide.Bookmark, { size: 14, color: colors.matcha, fill: colors.matcha })}
                <span style={{ fontSize: '14px', color: colors.text, fontWeight: '500' }}>{item}</span>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 14, color: colors.warmGray })}
            </div>
          ))}
        </div>

        {/* Settings list */}
        <div style={{ margin: '16px 20px 0', background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          {[
            { icon: window.lucide.Bell, label: 'Notifications' },
            { icon: window.lucide.Globe, label: 'Dietary Preferences' },
            { icon: window.lucide.Share2, label: 'Share Profile' },
            { icon: window.lucide.HelpCircle, label: 'Help & Feedback' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {React.createElement(item.icon, { size: 16, color: colors.warmGray })}
                <span style={{ fontSize: '14px', color: colors.text }}>{item.label}</span>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 14, color: colors.warmGray })}
            </div>
          ))}
        </div>

        <div style={{ height: '24px' }} />
      </div>
    );
  };

  const navItems = [
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'match', label: 'Match', icon: window.lucide.Sparkles },
    { id: 'recipes', label: 'Recipes', icon: window.lucide.BookOpen },
    { id: 'community', label: 'Community', icon: window.lucide.Users },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screenMap = {
    discover: DiscoverScreen,
    match: MatchScreen,
    recipes: RecipesScreen,
    community: CommunityScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screenMap[activeTab] || DiscoverScreen;

  return (
    <div style={s.page}>
      <div style={s.phone}>
        <div style={s.dynamicIsland} />
        <StatusBar />

        {/* Toast */}
        {showAddedToast && (
          <div style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', background: colors.text, color: colors.white, fontSize: '13px', fontWeight: '500', padding: '8px 18px', borderRadius: '20px', zIndex: 100, whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            ✓ Saved to your collection
          </div>
        )}

        <div style={s.content}>
          <ActiveScreen />
        </div>

        <div style={s.bottomNav}>
          {navItems.map(item => (
            <div key={item.id} style={s.navItem(activeTab === item.id)} onClick={() => { setActiveTab(item.id); if (item.id === 'match') setMatchScreen('input'); }}>
              {React.createElement(item.icon, { size: 20, color: activeTab === item.id ? colors.matcha : colors.warmGray, strokeWidth: activeTab === item.id ? 2.5 : 1.8 })}
              <span style={s.navLabel(activeTab === item.id)}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
