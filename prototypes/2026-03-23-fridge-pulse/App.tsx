const { useState, useEffect, useRef } = React;

function App() {
  const themes = {
    dark: {
      bg: '#07100D',
      surface: '#0C1710',
      card: '#112018',
      cardElevated: '#172C1E',
      primary: '#1FD470',
      primaryGlow: 'rgba(31,212,112,0.14)',
      primaryDim: '#17A857',
      accent: '#00E5A0',
      text: '#EEF9F3',
      textSub: '#B2CFBE',
      textMuted: '#638070',
      border: '#182E22',
      borderLight: '#1E3828',
      warning: '#FFB340',
      warningBg: 'rgba(255,179,64,0.12)',
      danger: '#FF5466',
      dangerBg: 'rgba(255,84,102,0.12)',
      navBg: '#09140E',
      inputBg: '#0E1E16',
      overlay: 'rgba(0,0,0,0.88)',
      statusBar: '#0C1710',
    },
    light: {
      bg: '#EBF5EF',
      surface: '#FFFFFF',
      card: '#F6FBF8',
      cardElevated: '#FFFFFF',
      primary: '#15A355',
      primaryGlow: 'rgba(21,163,85,0.11)',
      primaryDim: '#108C48',
      accent: '#00A870',
      text: '#0A1E10',
      textSub: '#2B4E38',
      textMuted: '#5E7A68',
      border: '#CEEADB',
      borderLight: '#DFF0E8',
      warning: '#C97000',
      warningBg: 'rgba(201,112,0,0.09)',
      danger: '#D42840',
      dangerBg: 'rgba(212,40,64,0.09)',
      navBg: '#FFFFFF',
      inputBg: '#EFF8F2',
      overlay: 'rgba(0,0,0,0.5)',
      statusBar: '#FFFFFF',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [scanMode, setScanMode] = useState('camera');
  const [manualName, setManualName] = useState('');
  const [manualDays, setManualDays] = useState('3');
  const [flashAdded, setFlashAdded] = useState(false);
  const [insightTab, setInsightTab] = useState('week');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [cookingStep, setCookingStep] = useState(0);
  const [isCooking, setIsCooking] = useState(false);

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      input { outline: none; border: none; background: transparent; font-family: inherit; }
      textarea { outline: none; border: none; background: transparent; font-family: inherit; resize: none; }
    `;
    document.head.appendChild(style);
  }, []);

  const fridgeItems = [
    { id: 1, name: 'Roasted Chicken', qty: '½ bird', daysLeft: 1, cat: 'Protein', emoji: '🍗', rescued: true },
    { id: 2, name: 'Fresh Herbs', qty: 'Small bunch', daysLeft: 1, cat: 'Produce', emoji: '🌿', rescued: true },
    { id: 3, name: 'Leftover Salmon', qty: '1 fillet', daysLeft: 1, cat: 'Protein', emoji: '🐟', rescued: true },
    { id: 4, name: 'Day-old Rice', qty: '2 cups', daysLeft: 2, cat: 'Grains', emoji: '🍚', rescued: true },
    { id: 5, name: 'Spinach', qty: '3 oz', daysLeft: 2, cat: 'Produce', emoji: '🥬', rescued: true },
    { id: 6, name: 'Cold Noodles', qty: '1 serving', daysLeft: 2, cat: 'Grains', emoji: '🍜', rescued: true },
    { id: 7, name: 'Tomatoes', qty: '3 medium', daysLeft: 3, cat: 'Produce', emoji: '🍅', rescued: false },
    { id: 8, name: 'Bell Pepper', qty: '1 red', daysLeft: 4, cat: 'Produce', emoji: '🫑', rescued: false },
    { id: 9, name: 'Greek Yogurt', qty: '1 cup', daysLeft: 5, cat: 'Dairy', emoji: '🥛', rescued: false },
    { id: 10, name: 'Cheddar Cheese', qty: '4 oz', daysLeft: 7, cat: 'Dairy', emoji: '🧀', rescued: false },
    { id: 11, name: 'Eggs', qty: '6 left', daysLeft: 14, cat: 'Dairy', emoji: '🥚', rescued: false },
    { id: 12, name: 'Butter', qty: '½ stick', daysLeft: 21, cat: 'Dairy', emoji: '🧈', rescued: false },
  ];

  const rescueRecipes = [
    {
      id: 1,
      name: 'Smoky Chicken Rice Bowl',
      time: '12 min',
      urgency: 'critical',
      urgencyLabel: 'Use Today',
      ingredients: ['Roasted Chicken', 'Day-old Rice', 'Fresh Herbs'],
      allIngredients: ['½ bird roasted chicken', '2 cups day-old rice', 'Fresh herbs (parsley/cilantro)', 'Smoked paprika', 'Sesame oil', 'Salt & pepper'],
      emoji: '🍲',
      servings: 2,
      effort: 'Easy',
      salvageScore: 98,
      calories: 420,
      steps: [
        { step: 1, time: '2 min', text: 'Shred the roasted chicken into bite-sized pieces. Discard bones.' },
        { step: 2, time: '3 min', text: 'Heat a pan over high heat. Add day-old rice with 1 tbsp butter. Stir-fry until edges crisp.' },
        { step: 3, time: '4 min', text: 'Add shredded chicken. Season with smoked paprika, salt, and pepper. Toss together.' },
        { step: 4, time: '3 min', text: 'Finish with fresh herbs and a drizzle of sesame oil. Serve immediately.' },
      ],
      tip: 'High heat on day-old rice transforms it — you want the grains to get just a little crispy and smoky.',
    },
    {
      id: 2,
      name: 'Herb-Crusted Salmon Patties',
      time: '10 min',
      urgency: 'critical',
      urgencyLabel: 'Use Today',
      ingredients: ['Leftover Salmon', 'Fresh Herbs', 'Eggs'],
      allIngredients: ['1 salmon fillet', 'Fresh herbs (dill, parsley)', '1 egg', 'Salt & pepper', 'Olive oil', 'Lemon zest (optional)'],
      emoji: '🐟',
      servings: 1,
      effort: 'Easy',
      salvageScore: 95,
      calories: 310,
      steps: [
        { step: 1, time: '2 min', text: 'Flake the salmon into a bowl. Add chopped herbs, 1 beaten egg, salt, and pepper. Mix gently.' },
        { step: 2, time: '5 min', text: 'Form into two small patties. Pan-fry in olive oil over medium-high, 2–3 min per side until golden.' },
        { step: 3, time: '3 min', text: 'Rest on paper towel. Serve with yogurt dipping sauce or on toast.' },
      ],
      tip: "Don't over-mix — you want it holding together but still flaky inside, not a paste.",
    },
    {
      id: 3,
      name: 'Spinach & Cheddar Frittata',
      time: '18 min',
      urgency: 'high',
      urgencyLabel: 'Use Tomorrow',
      ingredients: ['Spinach', 'Eggs', 'Cheddar Cheese'],
      allIngredients: ['3 oz spinach', '4 eggs', '4 oz cheddar (shredded)', 'Salt, pepper', 'Olive oil', 'Optional: diced onion'],
      emoji: '🍳',
      servings: 2,
      effort: 'Easy',
      salvageScore: 87,
      calories: 340,
      steps: [
        { step: 1, time: '3 min', text: 'Preheat oven to 375°F. Whisk 4 eggs with a pinch of salt and pepper in a bowl.' },
        { step: 2, time: '5 min', text: 'Wilt spinach in an oven-safe skillet over medium with a splash of oil. Spread evenly.' },
        { step: 3, time: '2 min', text: 'Pour egg mixture over spinach. Top with shredded cheddar evenly.' },
        { step: 4, time: '8 min', text: 'Bake 10–12 min until set and edges are golden. Rest 2 min before slicing.' },
      ],
      tip: 'A cast-iron skillet gives the best crust — if using non-stick, reduce oven time slightly.',
    },
    {
      id: 4,
      name: 'Cold Noodle Stir-Fry',
      time: '15 min',
      urgency: 'high',
      urgencyLabel: 'Use Tomorrow',
      ingredients: ['Cold Noodles', 'Bell Pepper', 'Spinach'],
      allIngredients: ['1 serving cold noodles', '1 red bell pepper (sliced)', '2 oz spinach', 'Soy sauce', 'Garlic', 'Chili flakes', 'Sesame seeds'],
      emoji: '🥘',
      servings: 1,
      effort: 'Medium',
      salvageScore: 82,
      calories: 380,
      steps: [
        { step: 1, time: '3 min', text: 'Slice bell pepper into thin strips. Roughly chop spinach. Mince 2 garlic cloves.' },
        { step: 2, time: '5 min', text: 'Heat wok over HIGH heat until smoking. Stir-fry bell pepper for 2 min.' },
        { step: 3, time: '5 min', text: 'Add noodles and garlic. Toss aggressively. Add soy sauce, chili flakes, and spinach.' },
        { step: 4, time: '2 min', text: 'Cook until spinach wilts. Top with sesame seeds. Serve in the wok.' },
      ],
      tip: 'The secret is a genuinely HOT pan — cold noodles need fierce heat to revive, not steam.',
    },
  ];

  const getUrgencyColor = (days) => {
    if (days <= 1) return t.danger;
    if (days <= 2) return t.warning;
    if (days <= 4) return '#7EC850';
    return t.primary;
  };

  const getUrgencyBg = (days) => {
    if (days <= 1) return t.dangerBg;
    if (days <= 2) return t.warningBg;
    if (days <= 4) return 'rgba(126,200,80,0.1)';
    return t.primaryGlow;
  };

  const getDayLabel = (days) => {
    if (days === 0) return 'Expired!';
    if (days === 1) return '1 day';
    return `${days} days`;
  };

  const urgentItems = fridgeItems.filter((i) => i.daysLeft <= 2);
  const stableItems = fridgeItems.filter((i) => i.daysLeft > 2);

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  function HomeScreen() {
    const cats = ['Protein', 'Produce', 'Grains', 'Dairy'];
    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        {/* Header */}
        <div style={{ background: t.surface, padding: '14px 20px 12px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, marginBottom: 2, letterSpacing: '0.04em' }}>MON, MAR 23</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>Your Fridge</div>
            </div>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: t.primaryGlow, border: `1px solid ${t.primary}35`,
                borderRadius: 20, padding: '6px 12px', cursor: 'pointer',
              }}
              onClick={() => setActiveTab('rescue')}
            >
              {React.createElement(window.lucide.Zap, { size: 13, color: t.primary })}
              <span style={{ fontSize: 11, color: t.primary, fontWeight: 800, letterSpacing: '0.05em' }}>RESCUE</span>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div style={{ padding: '12px 16px 0' }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${isDark ? 'rgba(255,84,102,0.1)' : 'rgba(212,40,64,0.07)'}, ${isDark ? 'rgba(255,179,64,0.08)' : 'rgba(201,112,0,0.06)'})`,
              border: `1px solid ${t.danger}35`,
              borderRadius: 14, padding: '11px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            {React.createElement(window.lucide.AlertTriangle, { size: 16, color: t.warning })}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{urgentItems.length} items expiring in 1–2 days</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>Rescue mode has {rescueRecipes.length} meals ready to make</div>
            </div>
            <div
              onClick={() => setActiveTab('rescue')}
              style={{
                background: t.warning, borderRadius: 20, padding: '5px 11px',
                fontSize: 11, fontWeight: 800, color: '#1A0800', cursor: 'pointer', flexShrink: 0,
              }}
            >
              Cook now
            </div>
          </div>
        </div>

        {/* Use First strip */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
            Use First
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {urgentItems.map((item) => (
              <div
                key={item.id}
                style={{
                  minWidth: 82, flexShrink: 0, background: t.card,
                  border: `1px solid ${getUrgencyColor(item.daysLeft)}30`,
                  borderRadius: 14, padding: '10px 8px', textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 5 }}>{item.emoji}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: t.text, marginBottom: 4, lineHeight: 1.2 }}>
                  {item.name.split(' ').slice(0, 2).join(' ')}
                </div>
                <div
                  style={{
                    fontSize: 10, fontWeight: 800, color: getUrgencyColor(item.daysLeft),
                    background: getUrgencyBg(item.daysLeft),
                    borderRadius: 8, padding: '2px 7px',
                  }}
                >
                  {getDayLabel(item.daysLeft)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All items by category */}
        <div style={{ padding: '16px 16px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              All Items ({fridgeItems.length})
            </div>
            <div style={{ fontSize: 12, color: t.primary, fontWeight: 700, cursor: 'pointer' }}>+ Add item</div>
          </div>

          {cats.map((cat) => {
            const items = fridgeItems.filter((i) => i.cat === cat);
            if (!items.length) return null;
            return (
              <div key={cat} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 7 }}>
                  {cat}
                </div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: t.card, border: `1px solid ${t.border}`,
                      borderRadius: 11, padding: '9px 12px', marginBottom: 6,
                      display: 'flex', alignItems: 'center', gap: 11,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>{item.qty}</div>
                    </div>
                    <div
                      style={{
                        fontSize: 11, fontWeight: 700,
                        color: getUrgencyColor(item.daysLeft),
                        background: getUrgencyBg(item.daysLeft),
                        borderRadius: 9, padding: '3px 9px',
                      }}
                    >
                      {getDayLabel(item.daysLeft)}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── RESCUE SCREEN ─────────────────────────────────────────────────────────
  function RescueScreen() {
    if (selectedRecipe && !isCooking) {
      const r = selectedRecipe;
      const urgencyColor = r.urgency === 'critical' ? t.danger : t.warning;
      return (
        <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
          {/* Back header */}
          <div style={{ background: t.surface, padding: '14px 20px 12px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div onClick={() => setSelectedRecipe(null)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 22, color: t.textMuted })}
            </div>
            <div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>Rescue Recipe</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: t.text, letterSpacing: '-0.01em' }}>{r.name}</div>
            </div>
          </div>

          {/* Hero */}
          <div
            style={{
              background: `linear-gradient(160deg, ${isDark ? '#142A1C' : '#D9F2E6'}, ${isDark ? '#0C1810' : '#EBF7F1'})`,
              padding: '24px 20px 20px', textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 8 }}>{r.emoji}</div>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: urgencyColor + '20', border: `1px solid ${urgencyColor}40`,
                borderRadius: 20, padding: '4px 12px', marginBottom: 12,
              }}
            >
              {React.createElement(window.lucide.Flame, { size: 12, color: urgencyColor })}
              <span style={{ fontSize: 11, fontWeight: 800, color: urgencyColor, letterSpacing: '0.05em' }}>{r.urgencyLabel.toUpperCase()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 4 }}>
              {[
                { icon: window.lucide.Clock, label: r.time },
                { icon: window.lucide.Users, label: `${r.servings} serving${r.servings > 1 ? 's' : ''}` },
                { icon: window.lucide.Zap, label: r.effort },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {React.createElement(icon, { size: 13, color: t.textMuted })}
                  <span style={{ fontSize: 12, color: t.textSub, fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '16px 16px 100px' }}>
            {/* Salvage Score */}
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Salvage Score</div>
                <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>Based on perishability + flavor match</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: t.primary }}>{r.salvageScore}<span style={{ fontSize: 14, color: t.textMuted }}>%</span></div>
            </div>

            {/* Ingredients you're rescuing */}
            <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>Rescuing From Your Fridge</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
              {r.ingredients.map((ing) => {
                const item = fridgeItems.find((i) => i.name === ing);
                return (
                  <div key={ing} style={{ background: t.primaryGlow, border: `1px solid ${t.primary}30`, borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 14 }}>{item ? item.emoji : '🥗'}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.primary }}>{ing}</span>
                  </div>
                );
              })}
            </div>

            {/* Full ingredients */}
            <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>Full Ingredients</div>
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
              {r.allIngredients.map((ing, i) => (
                <div key={i} style={{ padding: '9px 14px', borderBottom: i < r.allIngredients.length - 1 ? `1px solid ${t.border}` : 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {React.createElement(window.lucide.Check, { size: 13, color: t.primary })}
                  <span style={{ fontSize: 13, color: t.textSub }}>{ing}</span>
                </div>
              ))}
            </div>

            {/* Pro tip */}
            <div style={{ background: `linear-gradient(135deg, ${t.primaryGlow}, transparent)`, border: `1px solid ${t.primary}25`, borderRadius: 14, padding: '12px 14px', marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: t.primary, fontWeight: 800, letterSpacing: '0.05em', marginBottom: 4 }}>PRO TIP</div>
              <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.5 }}>{r.tip}</div>
            </div>

            {/* Start cooking button */}
            <div
              onClick={() => { setCookingStep(0); setIsCooking(true); }}
              style={{
                background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
                borderRadius: 16, padding: '15px', textAlign: 'center',
                cursor: 'pointer', boxShadow: `0 8px 24px ${t.primaryGlow}`,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Start Cooking — {r.time}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{r.steps.length} step guided walkthrough</div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedRecipe && isCooking) {
      const r = selectedRecipe;
      const step = r.steps[cookingStep];
      const isLast = cookingStep === r.steps.length - 1;
      return (
        <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
          <div style={{ background: t.surface, padding: '14px 20px 12px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div onClick={() => setIsCooking(false)} style={{ cursor: 'pointer' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 22, color: t.textMuted })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>Cooking Mode</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{r.name}</div>
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>
              {cookingStep + 1} / {r.steps.length}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: t.border }}>
            <div style={{ height: '100%', width: `${((cookingStep + 1) / r.steps.length) * 100}%`, background: t.primary, transition: 'width 0.4s ease' }} />
          </div>

          <div style={{ padding: '24px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ background: t.primary, borderRadius: 20, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{step.step}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {React.createElement(window.lucide.Clock, { size: 13, color: t.textMuted })}
                <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>{step.time}</span>
              </div>
            </div>

            <div style={{ fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.45, marginBottom: 32 }}>{step.text}</div>

            {isLast && (
              <div style={{ background: t.primaryGlow, border: `1px solid ${t.primary}30`, borderRadius: 14, padding: '14px', textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{r.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.primary }}>Almost done! Your meal is ready.</div>
                <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3 }}>~{r.calories} kcal · {r.servings} serving{r.servings > 1 ? 's' : ''}</div>
              </div>
            )}

            {/* Step nav */}
            <div style={{ display: 'flex', gap: 12 }}>
              {cookingStep > 0 && (
                <div
                  onClick={() => setCookingStep(cookingStep - 1)}
                  style={{ flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px', textAlign: 'center', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: t.textSub }}>← Back</span>
                </div>
              )}
              <div
                onClick={() => {
                  if (isLast) { setIsCooking(false); setSelectedRecipe(null); }
                  else setCookingStep(cookingStep + 1);
                }}
                style={{
                  flex: 2, background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
                  borderRadius: 14, padding: '14px', textAlign: 'center', cursor: 'pointer',
                  boxShadow: `0 6px 20px ${t.primaryGlow}`,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{isLast ? '🎉 Done!' : 'Next Step →'}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        {/* Header */}
        <div style={{ background: t.surface, padding: '14px 20px 12px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, marginBottom: 2, letterSpacing: '0.04em' }}>RANKED BY URGENCY</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>Rescue Mode</div>
          <div style={{ fontSize: 12, color: t.textSub, marginTop: 3 }}>{urgentItems.length} ingredients expiring · {rescueRecipes.length} meals ready</div>
        </div>

        {/* Filter chips */}
        <div style={{ padding: '12px 16px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {['All', 'Use Today', 'Use Tomorrow', 'Easy', 'Under 15 min'].map((f) => (
            <div
              key={f}
              style={{
                flexShrink: 0, borderRadius: 20, padding: '5px 13px',
                background: f === 'All' ? t.primary : t.card,
                border: `1px solid ${f === 'All' ? t.primary : t.border}`,
                fontSize: 12, fontWeight: 600,
                color: f === 'All' ? '#fff' : t.textMuted,
                cursor: 'pointer',
              }}
            >
              {f}
            </div>
          ))}
        </div>

        {/* Recipe cards */}
        <div style={{ padding: '12px 16px 80px' }}>
          {rescueRecipes.map((r) => {
            const urgColor = r.urgency === 'critical' ? t.danger : t.warning;
            return (
              <div
                key={r.id}
                onClick={() => { setSelectedRecipe(r); setCookingStep(0); setIsCooking(false); }}
                style={{
                  background: t.card, border: `1px solid ${t.border}`,
                  borderRadius: 16, overflow: 'hidden', marginBottom: 12, cursor: 'pointer',
                }}
              >
                {/* Urgency stripe */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${urgColor}, transparent)` }} />
                <div style={{ padding: '14px 14px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ fontSize: 36 }}>{r.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                        <div
                          style={{
                            background: urgColor + '1A', border: `1px solid ${urgColor}30`,
                            borderRadius: 12, padding: '2px 8px',
                            fontSize: 10, fontWeight: 800, color: urgColor, letterSpacing: '0.04em',
                          }}
                        >
                          {r.urgencyLabel.toUpperCase()}
                        </div>
                        <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{r.effort}</div>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: t.text, letterSpacing: '-0.01em', marginBottom: 4 }}>{r.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          {React.createElement(window.lucide.Clock, { size: 12, color: t.textMuted })}
                          <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{r.time}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          {React.createElement(window.lucide.Users, { size: 12, color: t.textMuted })}
                          <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{r.servings} serving{r.servings > 1 ? 's' : ''}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          {React.createElement(window.lucide.Flame, { size: 12, color: t.textMuted })}
                          <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{r.calories} kcal</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: t.primary }}>{r.salvageScore}</div>
                      <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 600 }}>SCORE</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {r.ingredients.map((ing) => {
                      const item = fridgeItems.find((i) => i.name === ing);
                      return (
                        <div key={ing} style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.bg, borderRadius: 10, padding: '3px 8px' }}>
                          <span style={{ fontSize: 11 }}>{item ? item.emoji : '🥗'}</span>
                          <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{ing.split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── SCAN SCREEN ───────────────────────────────────────────────────────────
  function ScanScreen() {
    const recentScans = [
      { name: 'Trader Joe\'s Receipt', items: 8, time: '2 days ago', emoji: '🧾' },
      { name: 'Fridge Shelf Photo', items: 5, time: '4 days ago', emoji: '📷' },
      { name: 'Manual: Takeout extras', items: 3, time: '5 days ago', emoji: '✍️' },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        <div style={{ background: t.surface, padding: '14px 20px 12px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, marginBottom: 2, letterSpacing: '0.04em' }}>ADD ITEMS</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>Scan & Log</div>
        </div>

        {/* Mode tabs */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 4, display: 'flex', gap: 4 }}>
            {[
              { id: 'camera', label: 'Camera', icon: window.lucide.Camera },
              { id: 'receipt', label: 'Receipt', icon: window.lucide.Receipt || window.lucide.FileText },
              { id: 'manual', label: 'Manual', icon: window.lucide.PenLine || window.lucide.Edit3 },
            ].map(({ id, label, icon }) => (
              <div
                key={id}
                onClick={() => setScanMode(id)}
                style={{
                  flex: 1, borderRadius: 10, padding: '9px 8px',
                  background: scanMode === id ? t.primary : 'transparent',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {React.createElement(icon, { size: 16, color: scanMode === id ? '#fff' : t.textMuted })}
                <span style={{ fontSize: 11, fontWeight: 700, color: scanMode === id ? '#fff' : t.textMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Camera mode */}
        {scanMode === 'camera' && (
          <div style={{ padding: '16px 16px 0' }}>
            <div
              style={{
                background: isDark ? '#080F0C' : '#1A2E22',
                borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'relative', border: `1px solid ${t.border}`,
              }}
            >
              {/* Viewfinder overlay */}
              <div style={{ position: 'absolute', inset: 16, border: `2px solid ${t.primary}60`, borderRadius: 10 }}>
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((c) => (
                  <div
                    key={c}
                    style={{
                      position: 'absolute',
                      width: 20, height: 20,
                      top: c.startsWith('top') ? -1 : 'auto',
                      bottom: c.startsWith('bottom') ? -1 : 'auto',
                      left: c.endsWith('left') ? -1 : 'auto',
                      right: c.endsWith('right') ? -1 : 'auto',
                      borderTop: c.startsWith('top') ? `3px solid ${t.primary}` : 'none',
                      borderBottom: c.startsWith('bottom') ? `3px solid ${t.primary}` : 'none',
                      borderLeft: c.endsWith('left') ? `3px solid ${t.primary}` : 'none',
                      borderRight: c.endsWith('right') ? `3px solid ${t.primary}` : 'none',
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📸</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 4 }}>Point at your fridge shelf</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>AI will identify all visible items</div>
            </div>
            <div
              style={{
                background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
                borderRadius: 14, padding: '14px', textAlign: 'center',
                marginTop: 14, cursor: 'pointer', boxShadow: `0 6px 20px ${t.primaryGlow}`,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Scan Fridge</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 1 }}>Tap to capture & identify</div>
            </div>
          </div>
        )}

        {/* Receipt mode */}
        {scanMode === 'receipt' && (
          <div style={{ padding: '16px 16px 0' }}>
            <div
              style={{
                background: t.card, border: `2px dashed ${t.border}`,
                borderRadius: 20, padding: '32px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              }}
            >
              {React.createElement(window.lucide.FileText, { size: 36, color: t.textMuted })}
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Upload a receipt</div>
              <div style={{ fontSize: 12, color: t.textMuted, textAlign: 'center' }}>AI extracts food items and estimates shelf life automatically</div>
              <div style={{ background: t.primary, borderRadius: 12, padding: '10px 20px', marginTop: 4, cursor: 'pointer' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Choose Photo</span>
              </div>
            </div>
            <div style={{ marginTop: 14, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 8 }}>SUPPORTED STORES</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {['Trader Joe\'s', 'Whole Foods', 'Safeway', 'Kroger', 'Target', 'Costco'].map((s) => (
                  <div key={s} style={{ background: t.bg, borderRadius: 10, padding: '4px 10px', fontSize: 11, color: t.textSub, fontWeight: 600 }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Manual mode */}
        {scanMode === 'manual' && (
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px', marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 10 }}>ITEM NAME</div>
              <input
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="e.g. Leftover pasta, Greek yogurt..."
                style={{
                  width: '100%', fontSize: 14, fontWeight: 500, color: t.text,
                  background: t.inputBg, borderRadius: 10, padding: '10px 12px',
                  border: `1px solid ${t.border}`, fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.05em', marginTop: 12, marginBottom: 8 }}>EXPIRES IN</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['1', '2', '3', '5', '7', '14'].map((d) => (
                  <div
                    key={d}
                    onClick={() => setManualDays(d)}
                    style={{
                      flex: 1, borderRadius: 10, padding: '8px 4px', textAlign: 'center',
                      background: manualDays === d ? t.primary : t.bg,
                      border: `1px solid ${manualDays === d ? t.primary : t.border}`,
                      fontSize: 12, fontWeight: 700,
                      color: manualDays === d ? '#fff' : t.textMuted,
                      cursor: 'pointer',
                    }}
                  >
                    {d}d
                  </div>
                ))}
              </div>
            </div>

            <div
              onClick={() => {
                setFlashAdded(true);
                setManualName('');
                setTimeout(() => setFlashAdded(false), 2000);
              }}
              style={{
                background: flashAdded
                  ? `linear-gradient(135deg, #22C55E, #16A34A)`
                  : `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
                borderRadius: 14, padding: '14px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: `0 6px 20px ${t.primaryGlow}`,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>
                {flashAdded ? '✓ Added to Fridge!' : 'Add to Fridge'}
              </div>
            </div>
          </div>
        )}

        {/* Recent Scans */}
        <div style={{ padding: '20px 16px 80px' }}>
          <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>Recent Scans</div>
          {recentScans.map((s, i) => (
            <div key={i} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: '10px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>{s.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{s.name}</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>{s.items} items added · {s.time}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── INSIGHTS SCREEN ───────────────────────────────────────────────────────
  function InsightsScreen() {
    const weekData = [40, 75, 30, 90, 55, 80, 60];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = Math.max(...weekData);

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        <div style={{ background: t.surface, padding: '14px 20px 12px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, marginBottom: 2, letterSpacing: '0.04em' }}>YOUR HABITS</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>Insights</div>
        </div>

        <div style={{ padding: '14px 16px 80px' }}>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {[
              { label: 'Saved This Month', value: '$34', icon: window.lucide.TrendingDown, color: t.primary, sub: '↓ 40% less waste' },
              { label: 'Meals Rescued', value: '18', icon: window.lucide.Flame, color: t.warning, sub: 'This month' },
              { label: 'Items Used on Time', value: '92%', icon: window.lucide.Check, color: t.accent, sub: 'vs 68% avg' },
              { label: 'Fridge Health', value: 'Good', icon: window.lucide.Leaf || window.lucide.Star, color: '#7EC850', sub: '4 items need action' },
            ].map(({ label, value, icon, color, sub }) => (
              <div key={label} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  {React.createElement(icon, { size: 14, color })}
                  <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: '0.04em' }}>{label.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color }}>
                  {value}
                </div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Usage chart */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 14 }}>Weekly Rescue Activity</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
              {weekData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: '100%', borderRadius: 6,
                      height: `${(val / maxVal) * 72}px`,
                      background: i === 6 ? t.primary : (i === 5 ? t.primary + 'CC' : t.border),
                      transition: 'height 0.4s ease',
                    }}
                  />
                  <span style={{ fontSize: 10, color: i === 6 ? t.primary : t.textMuted, fontWeight: i === 6 ? 700 : 500 }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recurring items */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 12 }}>Your Fridge Patterns</div>
            {[
              { emoji: '🥚', name: 'Eggs', note: 'Always stocked, often expire', tag: 'Watch' },
              { emoji: '🥬', name: 'Leafy Greens', note: 'Bought weekly, needs faster use', tag: 'Urgent' },
              { emoji: '🍗', name: 'Cooked Chicken', note: 'Great rescue ingredient', tag: 'Star' },
            ].map(({ emoji, name, note, tag }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>{emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{name}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{note}</div>
                </div>
                <div
                  style={{
                    fontSize: 10, fontWeight: 800,
                    color: tag === 'Star' ? t.primary : tag === 'Urgent' ? t.danger : t.warning,
                    background: (tag === 'Star' ? t.primary : tag === 'Urgent' ? t.danger : t.warning) + '18',
                    borderRadius: 8, padding: '3px 8px',
                  }}
                >
                  {tag}
                </div>
              </div>
            ))}
          </div>

          {/* Household profile */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 10 }}>Household Profile</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              {React.createElement(window.lucide.Users, { size: 16, color: t.primary })}
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Solo Cook</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>Single-serving recipes prioritized</div>
              </div>
            </div>
            <div style={{ background: t.bg, borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 6 }}>Based on your patterns:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Quick meals ≤15 min', 'Moderate skill', 'Asian-inspired', 'Low waste priority'].map((tag) => (
                  <div key={tag} style={{ background: t.primaryGlow, borderRadius: 8, padding: '3px 9px', fontSize: 11, color: t.primary, fontWeight: 600 }}>{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── SETTINGS SCREEN ───────────────────────────────────────────────────────
  function SettingsScreen() {
    const settingGroups = [
      {
        title: 'Household',
        items: [
          { icon: window.lucide.Users, label: 'Household Type', value: 'Solo Cook' },
          { icon: window.lucide.ChefHat || window.lucide.Star, label: 'Cooking Skill', value: 'Intermediate' },
          { icon: window.lucide.Clock, label: 'Typical Cook Time', value: '≤ 20 min' },
        ],
      },
      {
        title: 'Notifications',
        items: [
          { icon: window.lucide.Bell, label: 'Expiry Alerts', value: 'On' },
          { icon: window.lucide.Zap, label: 'Rescue Suggestions', value: 'On' },
          { icon: window.lucide.Calendar || window.lucide.Clock, label: 'Weekly Summary', value: 'Sundays' },
        ],
      },
      {
        title: 'Preferences',
        items: [
          { icon: window.lucide.Leaf || window.lucide.Star, label: 'Dietary Restrictions', value: 'None' },
          { icon: window.lucide.Globe || window.lucide.Star, label: 'Cuisine Preferences', value: 'Asian, Mediterranean' },
          { icon: window.lucide.BarChart3, label: 'Serving Size Default', value: '1 person' },
        ],
      },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        <div style={{ background: t.surface, padding: '14px 20px 12px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>Settings</div>
        </div>

        <div style={{ padding: '14px 16px 80px' }}>
          {/* Profile card */}
          <div
            style={{
              background: `linear-gradient(135deg, ${isDark ? '#142A1E' : '#D4F0E0'}, ${t.card})`,
              border: `1px solid ${t.primary}30`,
              borderRadius: 18, padding: '18px 16px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            <div
              style={{
                width: 54, height: 54, borderRadius: 27,
                background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }}
            >
              👤
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Alex Chen</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>Member since Jan 2026</div>
              <div style={{ fontSize: 12, color: t.primary, fontWeight: 600, marginTop: 2 }}>18 meals rescued · $34 saved</div>
            </div>
          </div>

          {/* Theme toggle */}
          <div
            style={{
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: 14, padding: '13px 14px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            }}
            onClick={() => setIsDark(!isDark)}
          >
            {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: t.primary })}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>Tap to switch theme</div>
            </div>
            <div
              style={{
                width: 44, height: 24, borderRadius: 12,
                background: isDark ? t.primary : t.border,
                position: 'relative', transition: 'background 0.3s',
              }}
            >
              <div
                style={{
                  position: 'absolute', top: 2,
                  left: isDark ? 22 : 2,
                  width: 20, height: 20, borderRadius: 10,
                  background: '#fff', transition: 'left 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          </div>

          {/* Setting groups */}
          {settingGroups.map((group) => (
            <div key={group.title} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>{group.title}</div>
              <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden' }}>
                {group.items.map(({ icon, label, value }, i) => (
                  <div
                    key={label}
                    style={{
                      padding: '12px 14px',
                      borderBottom: i < group.items.length - 1 ? `1px solid ${t.border}` : 'none',
                      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                    }}
                  >
                    {React.createElement(icon, { size: 16, color: t.textMuted })}
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{value}</div>
                    {React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Version */}
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 11, color: t.textMuted }}>Fridge Pulse v1.0.0 · Built with care 🌱</div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home', label: 'Fridge', icon: window.lucide.Refrigerator || window.lucide.Box },
    { id: 'rescue', label: 'Rescue', icon: window.lucide.Flame },
    { id: 'scan', label: 'Scan', icon: window.lucide.Camera },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart3 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    rescue: RescueScreen,
    scan: ScanScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh', background: isDark ? '#0D0D0D' : '#CBD5E1',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: 375, height: 812,
          background: t.surface,
          borderRadius: 50, overflow: 'hidden',
          position: 'relative',
          boxShadow: isDark
            ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Status Bar */}
        <div
          style={{
            height: 44, background: t.statusBar,
            display: 'flex', alignItems: 'center',
            padding: '0 24px', flexShrink: 0,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{ display: 'flex', justifyContent: 'center', background: t.statusBar, paddingBottom: 6, flexShrink: 0 }}>
          <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {React.createElement(screens[activeTab])}
        </div>

        {/* Bottom Nav */}
        <div
          style={{
            flexShrink: 0, background: t.navBg,
            borderTop: `1px solid ${t.border}`,
            display: 'flex', padding: '8px 4px 16px',
          }}
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4, cursor: 'pointer',
                  padding: '4px 0',
                  opacity: active ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
              >
                {tab.id === 'scan' ? (
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 22,
                      background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDim})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: -16, boxShadow: `0 4px 16px ${t.primaryGlow}`,
                    }}
                  >
                    {React.createElement(tab.icon, { size: 20, color: '#fff' })}
                  </div>
                ) : (
                  React.createElement(tab.icon, { size: 22, color: active ? t.primary : t.textMuted })
                )}
                <span
                  style={{
                    fontSize: 10, fontWeight: tab.id === 'scan' ? 700 : (active ? 700 : 500),
                    color: active ? t.primary : t.textMuted,
                    marginTop: tab.id === 'scan' ? 2 : 0,
                  }}
                >
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
