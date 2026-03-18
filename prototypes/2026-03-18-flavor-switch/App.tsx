// Flavor Switch - Transform leftovers into gourmet meals!
// Candy Pop Design: light pink bg, electric violet, hot pink, mint

function App() {
  const { useState, useEffect, useRef } = React;
  const [activeTab, setActiveTab] = useState('home');
  const [prevTab, setPrevTab] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState(['Creamy Leftover Pasta Bake', 'Asian Fried Rice Remix']);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [likedTips, setLikedTips] = useState([1, 4]);
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (tab) => {
    if (tab === activeTab) return;
    setTransitioning(true);
    setPrevTab(activeTab);
    setTimeout(() => {
      setActiveTab(tab);
      setTransitioning(false);
    }, 150);
  };

  // Font loader
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');`;
    document.head.appendChild(style);
  }, []);

  const colors = {
    bg: '#FFF0F5',
    violet: '#8B5CF6',
    pink: '#EC4899',
    mint: '#6EE7B7',
    coral: '#F97316',
    yellow: '#FCD34D',
    white: '#FFFFFF',
    lightViolet: '#EDE9FE',
    lightPink: '#FCE7F3',
    lightMint: '#D1FAE5',
    textDark: '#1E1333',
    textMid: '#6B4F7A',
    textLight: '#A78BBA',
  };

  const font = "'Fredoka', sans-serif";

  const styles = {
    wrapper: {
      background: '#1A0A2E',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
    },
    phone: {
      width: 375,
      height: 812,
      background: colors.bg,
      borderRadius: 50,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 10px #2D1B4E, 0 0 0 11px #3D2460',
      display: 'flex',
      flexDirection: 'column',
    },
    dynamicIsland: {
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 34,
      background: '#000',
      borderRadius: 20,
      zIndex: 100,
    },
    statusBar: {
      height: 52,
      background: 'transparent',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 28,
      paddingRight: 20,
      paddingBottom: 8,
      flexShrink: 0,
      zIndex: 50,
    },
    statusTime: {
      fontSize: 15,
      fontWeight: 600,
      color: colors.textDark,
      fontFamily: font,
    },
    statusIcons: {
      display: 'flex',
      gap: 5,
      alignItems: 'center',
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
    },
    screen: {
      minHeight: '100%',
      paddingBottom: 20,
      opacity: transitioning ? 0 : 1,
      transform: transitioning ? 'scale(0.97)' : 'scale(1)',
      transition: 'opacity 0.15s ease, transform 0.15s ease',
    },
    bottomNav: {
      height: 80,
      background: colors.white,
      borderTop: `2px solid ${colors.lightPink}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 16,
      paddingTop: 4,
      flexShrink: 0,
      boxShadow: '0 -4px 20px rgba(236,72,153,0.1)',
    },
    navBtn: (isActive) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      padding: '6px 12px',
      borderRadius: 16,
      background: isActive ? colors.lightViolet : 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      transform: isActive ? 'scale(1.05)' : 'scale(1)',
      border: 'none',
    }),
    navLabel: (isActive) => ({
      fontSize: 10,
      fontWeight: isActive ? 600 : 400,
      color: isActive ? colors.violet : colors.textLight,
      fontFamily: font,
    }),
  };

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const [pressedCard, setPressedCard] = useState(null);
    const featuredRecipes = [
      { id: 1, name: 'Pasta Frittata', from: 'Leftover pasta + eggs', time: '15 min', diff: 'Easy', emoji: '🍳', color: colors.lightPink, accent: colors.pink },
      { id: 2, name: 'Veggie Fried Rice', from: 'Rice + mixed veggies', time: '20 min', diff: 'Easy', emoji: '🍚', color: colors.lightMint, accent: '#059669' },
      { id: 3, name: 'BBQ Chicken Tacos', from: 'Rotisserie chicken', time: '10 min', diff: 'Easy', emoji: '🌮', color: '#FEF3C7', accent: colors.coral },
    ];
    const categories = [
      { label: 'Breakfast', emoji: '🥐', color: '#FEF3C7' },
      { label: 'Lunch', emoji: '🥗', color: colors.lightMint },
      { label: 'Dinner', emoji: '🍝', color: colors.lightPink },
      { label: 'Snacks', emoji: '🧇', color: '#EDE9FE' },
    ];
    return (
      <div style={{ padding: '0 0 16px' }}>
        {/* Header */}
        <div style={{ padding: '8px 20px 16px', background: `linear-gradient(160deg, ${colors.violet} 0%, ${colors.pink} 100%)`, paddingTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font }}>Good morning, Chef! 👋</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font, lineHeight: 1.2 }}>What's in your<br/>fridge today?</div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              👩‍🍳
            </div>
          </div>
          {/* Search bar */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            {React.createElement(window.lucide.Search, { size: 16, color: colors.textLight })}
            <span style={{ fontSize: 14, color: colors.textLight, fontFamily: font }}>Search ingredients or recipes...</span>
          </div>
        </div>

        {/* Categories */}
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>Browse Categories</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {categories.map(c => (
              <div key={c.label} style={{ flex: 1, background: c.color, borderRadius: 16, padding: '10px 4px', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s' }}>
                <div style={{ fontSize: 22 }}>{c.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: colors.textDark, fontFamily: font, marginTop: 2 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Recipes */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: colors.textDark, fontFamily: font }}>✨ Today's Transforms</div>
            <div style={{ fontSize: 12, color: colors.violet, fontFamily: font, fontWeight: 600 }}>See all →</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {featuredRecipes.map(r => (
              <div
                key={r.id}
                onMouseDown={() => setPressedCard(r.id)}
                onMouseUp={() => setPressedCard(null)}
                onTouchStart={() => setPressedCard(r.id)}
                onTouchEnd={() => { setPressedCard(null); setActiveRecipe(r); navigate('recipes'); }}
                onClick={() => { setActiveRecipe(r); navigate('recipes'); }}
                style={{
                  background: colors.white,
                  borderRadius: 20,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  boxShadow: '0 4px 16px rgba(139,92,246,0.08)',
                  cursor: 'pointer',
                  transform: pressedCard === r.id ? 'scale(0.97)' : 'scale(1)',
                  transition: 'transform 0.15s ease',
                  border: `2px solid ${r.color}`,
                }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {r.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: colors.textDark, fontFamily: font }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: colors.textMid, fontFamily: font, marginTop: 2 }}>From: {r.from}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 11, background: r.color, color: r.accent, padding: '2px 8px', borderRadius: 8, fontWeight: 600, fontFamily: font }}>⏱ {r.time}</span>
                    <span style={{ fontSize: 11, background: colors.lightViolet, color: colors.violet, padding: '2px 8px', borderRadius: 8, fontWeight: 600, fontFamily: font }}>{r.diff}</span>
                  </div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size: 18, color: colors.textLight })}
              </div>
            ))}
          </div>
        </div>

        {/* Quick tip banner */}
        <div style={{ margin: '16px 20px 0', background: `linear-gradient(135deg, ${colors.mint} 0%, #34D399 100%)`, borderRadius: 20, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28 }}>💡</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#065F46', fontFamily: font }}>Pro Tip of the Day</div>
            <div style={{ fontSize: 12, color: '#047857', fontFamily: font, marginTop: 2 }}>Add a splash of soy sauce to any leftover rice for instant umami depth!</div>
          </div>
        </div>
      </div>
    );
  };

  // ---- ANALYZER SCREEN ----
  const AnalyzerScreen = () => {
    const [pressed, setPressed] = useState(false);
    const suggestions = ['Chicken', 'Rice', 'Pasta', 'Eggs', 'Cheese', 'Tomatoes', 'Onions', 'Peppers'];
    const mockResult = {
      recipes: [
        { name: 'Shakshuka Remix', match: 94, time: '25 min', emoji: '🍳' },
        { name: 'Stuffed Pepper Bowl', match: 88, time: '30 min', emoji: '🫑' },
        { name: 'One-Pan Scramble', match: 76, time: '12 min', emoji: '🥚' },
      ],
      pairings: ['Cumin', 'Smoked Paprika', 'Fresh Basil', 'Lemon Zest'],
      wasteScore: 92,
    };

    const handleAnalyze = () => {
      if (ingredients.length === 0) return;
      setAnalyzing(true);
      setAnalysisResult(null);
      setTimeout(() => {
        setAnalyzing(false);
        setAnalysisResult(mockResult);
      }, 2000);
    };

    const addIngredient = (item) => {
      if (!ingredients.includes(item)) setIngredients([...ingredients, item]);
    };
    const removeIngredient = (item) => setIngredients(ingredients.filter(i => i !== item));

    return (
      <div style={{ padding: '0 0 20px' }}>
        <div style={{ padding: '12px 20px 20px', background: `linear-gradient(160deg, #EC4899 0%, #8B5CF6 100%)` }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font }}>🔍 Ingredient Analyzer</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: font, marginTop: 4 }}>Tell me what you have — I'll work magic!</div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          {/* Input */}
          <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', boxShadow: '0 4px 16px rgba(139,92,246,0.08)', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>Add Ingredients</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && inputValue.trim()) { addIngredient(inputValue.trim()); setInputValue(''); } }}
                placeholder="Type ingredient..."
                style={{ flex: 1, border: `2px solid ${colors.lightPink}`, borderRadius: 12, padding: '8px 12px', fontFamily: font, fontSize: 14, color: colors.textDark, outline: 'none', background: colors.bg }}
              />
              <button
                onClick={() => { if (inputValue.trim()) { addIngredient(inputValue.trim()); setInputValue(''); } }}
                style={{ background: colors.pink, border: 'none', borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                {React.createElement(window.lucide.Plus, { size: 20, color: '#fff' })}
              </button>
            </div>

            {/* Quick suggestions */}
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: colors.textLight, fontFamily: font, marginBottom: 6 }}>Quick add:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {suggestions.map(s => (
                  <button key={s} onClick={() => addIngredient(s)} style={{ background: ingredients.includes(s) ? colors.lightViolet : colors.lightPink, border: `2px solid ${ingredients.includes(s) ? colors.violet : colors.pink}`, borderRadius: 10, padding: '4px 10px', fontSize: 12, fontFamily: font, color: ingredients.includes(s) ? colors.violet : colors.pink, cursor: 'pointer', fontWeight: 500 }}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Added ingredients */}
          {ingredients.length > 0 && (
            <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', boxShadow: '0 4px 16px rgba(139,92,246,0.08)', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>Your Ingredients ({ingredients.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ingredients.map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, background: colors.lightMint, border: `2px solid #6EE7B7`, borderRadius: 10, padding: '4px 8px 4px 10px' }}>
                    <span style={{ fontSize: 12, fontFamily: font, color: '#065F46', fontWeight: 600 }}>{i}</span>
                    <button onClick={() => removeIngredient(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: '#065F46' }}>
                      {React.createElement(window.lucide.X, { size: 14 })}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            disabled={ingredients.length === 0 || analyzing}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onClick={handleAnalyze}
            style={{
              width: '100%',
              background: ingredients.length === 0 ? '#E5E7EB' : `linear-gradient(135deg, ${colors.violet} 0%, ${colors.pink} 100%)`,
              border: 'none',
              borderRadius: 18,
              padding: '16px',
              fontFamily: font,
              fontSize: 16,
              fontWeight: 700,
              color: ingredients.length === 0 ? '#9CA3AF' : '#fff',
              cursor: ingredients.length === 0 ? 'not-allowed' : 'pointer',
              transform: pressed ? 'scale(0.97)' : 'scale(1)',
              transition: 'all 0.15s ease',
              boxShadow: ingredients.length > 0 ? '0 8px 24px rgba(139,92,246,0.35)' : 'none',
            }}>
            {analyzing ? '✨ Analyzing Magic...' : '🚀 Generate Recipes!'}
          </button>

          {/* Analyzing animation */}
          {analyzing && (
            <div style={{ textAlign: 'center', padding: '20px', background: colors.white, borderRadius: 20, marginTop: 14, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
              <div style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>⚡</div>
              <div style={{ fontSize: 14, color: colors.textMid, fontFamily: font, marginTop: 8 }}>Matching your ingredients<br/>with 1,200+ recipes...</div>
              <div style={{ marginTop: 12, background: colors.lightPink, borderRadius: 10, height: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '70%', background: `linear-gradient(90deg, ${colors.violet}, ${colors.pink})`, borderRadius: 10, animation: 'none' }}></div>
              </div>
            </div>
          )}

          {/* Results */}
          {analysisResult && !analyzing && (
            <div style={{ marginTop: 14 }}>
              {/* Waste score */}
              <div style={{ background: `linear-gradient(135deg, ${colors.mint} 0%, #34D399 100%)`, borderRadius: 20, padding: '14px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#065F46', fontFamily: font }}>{analysisResult.wasteScore}%</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#065F46', fontFamily: font }}>Zero-Waste Score</div>
                  <div style={{ fontSize: 11, color: '#047857', fontFamily: font }}>Amazing! You're using almost everything!</div>
                </div>
              </div>

              {/* Recipe matches */}
              <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 12, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>🎯 Recipe Matches</div>
                {analysisResult.recipes.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < analysisResult.recipes.length - 1 ? `1px solid ${colors.lightPink}` : 'none' }}>
                    <div style={{ fontSize: 24 }}>{r.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.textDark, fontFamily: font }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: colors.textMid, fontFamily: font }}>⏱ {r.time}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: colors.violet, fontFamily: font }}>{r.match}%</div>
                      <div style={{ fontSize: 10, color: colors.textLight, fontFamily: font }}>match</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Flavor pairings */}
              <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>🌶️ Flavor Enhancers</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {analysisResult.pairings.map((p, i) => (
                    <div key={i} style={{ background: colors.lightViolet, borderRadius: 12, padding: '6px 12px', fontSize: 13, fontWeight: 600, color: colors.violet, fontFamily: font }}>✦ {p}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ---- RECIPES SCREEN ----
  const RecipesScreen = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [saved, setSaved] = useState(false);
    const recipe = {
      name: activeRecipe ? activeRecipe.name : 'Pasta Frittata',
      emoji: activeRecipe ? activeRecipe.emoji : '🍳',
      from: activeRecipe ? activeRecipe.from : 'Leftover pasta + eggs',
      time: activeRecipe ? activeRecipe.time : '15 min',
      servings: 2,
      calories: 380,
      difficulty: 'Easy',
      flavorProfile: ['Savory', 'Creamy', 'Golden', 'Crispy'],
      pairings: ['Arugula salad', 'Crusty bread', 'Pinot Grigio'],
      ingredients: ['2 cups leftover cooked pasta', '4 large eggs', '1/2 cup parmesan cheese', '2 tbsp olive oil', 'Salt & pepper', 'Fresh basil'],
      steps: [
        { step: 'Beat eggs with parmesan, salt and pepper in a bowl until fluffy.', tip: 'Room temp eggs beat better!' },
        { step: 'Heat olive oil in a non-stick skillet over medium heat.', tip: null },
        { step: 'Add leftover pasta and spread evenly in the pan.', tip: 'Press lightly for crispier base' },
        { step: 'Pour egg mixture over pasta. Cook undisturbed 4-5 min.', tip: 'Watch for edges setting' },
        { step: 'Flip carefully or finish under broiler for 2 min.', tip: 'Use a plate to flip easily!' },
        { step: 'Garnish with fresh basil and serve immediately.', tip: null },
      ],
    };

    return (
      <div style={{ paddingBottom: 20 }}>
        {/* Hero */}
        <div style={{ background: `linear-gradient(160deg, ${colors.pink} 0%, #F472B6 100%)`, padding: '12px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <button onClick={() => setActiveRecipe(null)} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 12, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 18, color: '#fff' })}
            </button>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontFamily: font }}>Recipe Detail</div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, flexShrink: 0 }}>{recipe.emoji}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font, lineHeight: 1.2 }}>{recipe.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: font, marginTop: 4 }}>From: {recipe.from}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {[`⏱ ${recipe.time}`, `👤 ${recipe.servings}`, `🔥 ${recipe.calories}kcal`].map(t => (
                  <span key={t} style={{ fontSize: 11, background: 'rgba(255,255,255,0.25)', color: '#fff', padding: '3px 8px', borderRadius: 8, fontFamily: font, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          {/* Flavor Profile */}
          <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 12, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark, fontFamily: font, marginBottom: 8 }}>🎨 Flavor Profile</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {recipe.flavorProfile.map((f, i) => {
                const cs = [colors.lightPink, colors.lightViolet, colors.lightMint, '#FEF3C7'];
                const acs = [colors.pink, colors.violet, '#059669', colors.coral];
                return <span key={f} style={{ background: cs[i], color: acs[i], padding: '5px 12px', borderRadius: 12, fontSize: 12, fontWeight: 700, fontFamily: font }}>{f}</span>;
              })}
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${colors.lightPink}` }}>
              <div style={{ fontSize: 12, color: colors.textMid, fontFamily: font, fontWeight: 600 }}>Pairs well with:</div>
              <div style={{ fontSize: 12, color: colors.textLight, fontFamily: font, marginTop: 4 }}>{recipe.pairings.join(' · ')}</div>
            </div>
          </div>

          {/* Ingredients */}
          <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 12, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>🧺 Ingredients</div>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < recipe.ingredients.length - 1 ? `1px dashed ${colors.lightPink}` : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: colors.violet, flexShrink: 0 }}></div>
                <div style={{ fontSize: 13, color: colors.textDark, fontFamily: font }}>{ing}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 12, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>👨‍🍳 Step-by-Step</div>
            {recipe.steps.map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i === activeStep ? -1 : i)}
                style={{ padding: '10px', borderRadius: 14, marginBottom: 8, background: activeStep === i ? colors.lightViolet : colors.bg, cursor: 'pointer', transition: 'all 0.2s', border: `2px solid ${activeStep === i ? colors.violet : 'transparent'}` }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 13, background: activeStep === i ? colors.violet : colors.lightPink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: activeStep === i ? '#fff' : colors.pink, flexShrink: 0, fontFamily: font }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: colors.textDark, fontFamily: font }}>{s.step}</div>
                    {activeStep === i && s.tip && (
                      <div style={{ marginTop: 6, background: '#FEF3C7', borderRadius: 8, padding: '6px 8px', fontSize: 11, color: '#92400E', fontFamily: font }}>💡 {s.tip}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Save button */}
          <button
            onClick={() => {
              setSaved(true);
              if (!savedRecipes.includes(recipe.name)) setSavedRecipes([...savedRecipes, recipe.name]);
            }}
            style={{ width: '100%', background: saved ? `linear-gradient(135deg, ${colors.mint} 0%, #34D399 100%)` : `linear-gradient(135deg, ${colors.violet} 0%, ${colors.pink} 100%)`, border: 'none', borderRadius: 18, padding: '16px', fontFamily: font, fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 8px 24px rgba(139,92,246,0.3)' }}>
            {saved ? '✅ Saved to Cookbook!' : '❤️ Save to My Cookbook'}
          </button>
        </div>
      </div>
    );
  };

  // ---- COMMUNITY SCREEN ----
  const CommunityScreen = () => {
    const tips = [
      { id: 1, user: 'Maria K.', avatar: '👩', tip: 'Blend leftover roasted veggies with stock for an instant gourmet soup — takes 5 minutes!', likes: 234, tags: ['Veggie', 'Soup', 'Quick'], time: '2h ago' },
      { id: 2, user: 'Chef Tom', avatar: '👨‍🍳', tip: 'Stale bread? Cube it, toast with garlic oil, and you have croutons that beat any store brand.', likes: 189, tags: ['Bread', 'Salad'], time: '5h ago' },
      { id: 3, user: 'Yuki S.', avatar: '🧑', tip: 'Cold pizza topped with a fried egg is genuinely life-changing. Don\'t knock it until you try it!', likes: 445, tags: ['Pizza', 'Breakfast'], time: '1d ago' },
      { id: 4, user: 'Priya M.', avatar: '👩‍🍳', tip: 'Leftover curry? Mix with coconut milk and simmer — instant Thai-inspired dish in 10 min.', likes: 312, tags: ['Curry', 'Asian'], time: '2d ago' },
    ];

    const toggleLike = (id) => {
      if (likedTips.includes(id)) setLikedTips(likedTips.filter(i => i !== id));
      else setLikedTips([...likedTips, id]);
    };

    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ background: `linear-gradient(160deg, ${colors.mint} 0%, #34D399 100%)`, padding: '12px 20px 20px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#065F46', fontFamily: font }}>🌟 Community Tips</div>
          <div style={{ fontSize: 13, color: '#047857', fontFamily: font, marginTop: 4 }}>Real hacks from real home chefs</div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          {/* Share your tip */}
          <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 16, boxShadow: '0 4px 16px rgba(139,92,246,0.08)', display: 'flex', gap: 10, alignItems: 'center', border: `2px dashed ${colors.mint}` }}>
            <div style={{ fontSize: 28 }}>✍️</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.textDark, fontFamily: font }}>Share Your Hack!</div>
              <div style={{ fontSize: 11, color: colors.textLight, fontFamily: font }}>Tap to share your leftover wizardry</div>
            </div>
            <div style={{ marginLeft: 'auto', background: colors.mint, borderRadius: 12, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#065F46', fontFamily: font, cursor: 'pointer' }}>Post</div>
          </div>

          {/* Trending tags */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textDark, fontFamily: font, marginBottom: 8 }}>🔥 Trending</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {['#LeftoverMagic', '#ZeroWaste', '#QuickFix', '#BudgetEats', '#FridgeDive'].map(tag => (
                <div key={tag} style={{ background: colors.lightViolet, borderRadius: 12, padding: '5px 12px', fontSize: 12, fontWeight: 600, color: colors.violet, fontFamily: font, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0 }}>{tag}</div>
              ))}
            </div>
          </div>

          {/* Tips feed */}
          {tips.map(t => (
            <div key={t.id} style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 12, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: colors.lightPink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.textDark, fontFamily: font }}>{t.user}</div>
                  <div style={{ fontSize: 11, color: colors.textLight, fontFamily: font }}>{t.time}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: colors.textDark, fontFamily: font, lineHeight: 1.5, marginBottom: 10 }}>{t.tip}</div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                {t.tags.map(tag => (
                  <span key={tag} style={{ background: colors.lightMint, color: '#047857', fontSize: 11, fontWeight: 600, fontFamily: font, padding: '3px 8px', borderRadius: 8 }}>#{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => toggleLike(t.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: likedTips.includes(t.id) ? colors.lightPink : colors.bg, border: `2px solid ${likedTips.includes(t.id) ? colors.pink : colors.lightPink}`, borderRadius: 12, padding: '5px 12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: 14 }}>{likedTips.includes(t.id) ? '❤️' : '🤍'}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: likedTips.includes(t.id) ? colors.pink : colors.textLight, fontFamily: font }}>{t.likes + (likedTips.includes(t.id) ? 1 : 0)}</span>
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: colors.textLight }}>
                  {React.createElement(window.lucide.Share2, { size: 16 })}
                  <span style={{ fontSize: 12, fontFamily: font, color: colors.textLight }}>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---- PROFILE SCREEN ----
  const ProfileScreen = () => {
    const stats = [
      { label: 'Recipes Saved', value: savedRecipes.length + 14, emoji: '📋' },
      { label: 'Meals Made', value: 47, emoji: '🍽️' },
      { label: 'Food Saved', value: '3.2kg', emoji: '🌱' },
    ];
    const achievements = [
      { name: 'Zero-Waste Hero', emoji: '🌍', earned: true },
      { name: 'Flavor Wizard', emoji: '✨', earned: true },
      { name: 'Community Star', emoji: '⭐', earned: false },
      { name: 'Chef Level 5', emoji: '👨‍🍳', earned: false },
    ];

    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ background: `linear-gradient(160deg, ${colors.violet} 0%, #6D28D9 100%)`, padding: '12px 20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 68, height: 68, borderRadius: 34, background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>👩‍🍳</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: font }}>Alex Rivera</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: font }}>Home Chef · Level 4</div>
              <div style={{ marginTop: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 10, height: 6, width: 120, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '72%', background: colors.mint, borderRadius: 10 }}></div>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: font, marginTop: 2 }}>72% to Level 5</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {stats.map(s => (
              <div key={s.label} style={{ flex: 1, background: colors.white, borderRadius: 18, padding: '12px 8px', textAlign: 'center', boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
                <div style={{ fontSize: 22 }}>{s.emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: colors.violet, fontFamily: font, marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: colors.textLight, fontFamily: font, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 14, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>🏆 Achievements</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {achievements.map(a => (
                <div key={a.name} style={{ background: a.earned ? colors.lightViolet : colors.bg, borderRadius: 14, padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'center', opacity: a.earned ? 1 : 0.5, border: `2px solid ${a.earned ? colors.lightViolet : '#E5E7EB'}` }}>
                  <div style={{ fontSize: 22 }}>{a.emoji}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: a.earned ? colors.violet : colors.textLight, fontFamily: font }}>{a.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Recipes */}
          <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 14, boxShadow: '0 4px 16px rgba(139,92,246,0.08)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark, fontFamily: font, marginBottom: 10 }}>📖 My Cookbook</div>
            {savedRecipes.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < savedRecipes.length - 1 ? `1px solid ${colors.lightPink}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: colors.lightPink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🍽️</div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: colors.textDark, fontFamily: font }}>{r}</div>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textLight })}
              </div>
            ))}
          </div>

          {/* Settings row */}
          {[{ icon: window.lucide.Bell, label: 'Notifications', sub: 'Daily recipe suggestions' }, { icon: window.lucide.Settings, label: 'Preferences', sub: 'Dietary & flavor settings' }].map((item, i) => (
            <div key={i} style={{ background: colors.white, borderRadius: 18, padding: '14px 16px', marginBottom: 10, boxShadow: '0 4px 16px rgba(139,92,246,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: colors.lightViolet, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(item.icon, { size: 18, color: colors.violet })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.textDark, fontFamily: font }}>{item.label}</div>
                <div style={{ fontSize: 11, color: colors.textLight, fontFamily: font }}>{item.sub}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textLight })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'analyzer', label: 'Analyze', icon: window.lucide.FlaskConical },
    { id: 'recipes', label: 'Recipes', icon: window.lucide.ChefHat },
    { id: 'community', label: 'Tips', icon: window.lucide.Users },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'analyzer': return <AnalyzerScreen />;
      case 'recipes': return <RecipesScreen />;
      case 'community': return <CommunityScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.phone}>
        {/* Dynamic Island */}
        <div style={styles.dynamicIsland}></div>

        {/* Status Bar */}
        <div style={styles.statusBar}>
          <div style={styles.statusTime}>{time}</div>
          <div style={styles.statusIcons}>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <rect x="0" y="4" width="3" height="7" rx="1" fill={colors.textDark} />
              <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill={colors.textDark} />
              <rect x="9" y="0.5" width="3" height="10.5" rx="1" fill={colors.textDark} />
              <rect x="13.5" y="0" width="3" height="11" rx="1" fill={colors.textDark} opacity="0.3" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.3L15.5 4C13.7 2 11 1 8 1C5 1 2.3 2 0.5 4L1.8 5.3C3.3 3.6 5.5 2.5 8 2.5Z" fill={colors.textDark} />
              <path d="M8 5.5C9.7 5.5 11.2 6.2 12.3 7.3L13.6 6C12.2 4.7 10.2 4 8 4C5.8 4 3.8 4.7 2.4 6L3.7 7.3C4.8 6.2 6.3 5.5 8 5.5Z" fill={colors.textDark} />
              <circle cx="8" cy="10" r="1.5" fill={colors.textDark} />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 22, height: 11, border: `2px solid ${colors.textDark}`, borderRadius: 3, padding: 1.5, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '80%', height: '100%', background: colors.textDark, borderRadius: 1.5 }}></div>
              </div>
              <div style={{ width: 2, height: 5, background: colors.textDark, borderRadius: 1 }}></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          <div style={styles.screen}>
            {renderScreen()}
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={styles.bottomNav}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => navigate(tab.id)} style={styles.navBtn(activeTab === tab.id)}>
              {React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? colors.violet : colors.textLight, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 })}
              <span style={styles.navLabel(activeTab === tab.id)}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
