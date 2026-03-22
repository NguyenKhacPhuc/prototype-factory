const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [swapOpen, setSwapOpen] = useState(false);
  const [swapTarget, setSwapTarget] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [pressedBtn, setPressedBtn] = useState(null);

  const themes = {
    dark: {
      bg: '#0C0B09',
      surface: '#181612',
      surface2: '#211F1A',
      surface3: '#2A2822',
      text: '#F4EFE8',
      textSec: '#9C9080',
      textMuted: '#5A5248',
      primary: '#FF6B35',
      primaryDim: 'rgba(255,107,53,0.15)',
      primaryGlow: 'rgba(255,107,53,0.35)',
      secondary: '#FFB347',
      border: '#2A2822',
      success: '#4ADE80',
      successDim: 'rgba(74,222,128,0.12)',
      warning: '#FBBF24',
      warningDim: 'rgba(251,191,36,0.12)',
      danger: '#F87171',
      dangerDim: 'rgba(248,113,113,0.12)',
      card: '#1C1A15',
      tabBar: '#141210',
    },
    light: {
      bg: '#FAF7F2',
      surface: '#FFFFFF',
      surface2: '#F2EDE5',
      surface3: '#E8E1D6',
      text: '#1A1208',
      textSec: '#6B5E4A',
      textMuted: '#A89880',
      primary: '#E8531A',
      primaryDim: 'rgba(232,83,26,0.1)',
      primaryGlow: 'rgba(232,83,26,0.25)',
      secondary: '#F59E0B',
      border: '#E4DDD2',
      success: '#16A34A',
      successDim: 'rgba(22,163,74,0.1)',
      warning: '#D97706',
      warningDim: 'rgba(217,119,6,0.1)',
      danger: '#DC2626',
      dangerDim: 'rgba(220,38,38,0.1)',
      card: '#FFFFFF',
      tabBar: '#FFFFFF',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(link);
  }, []);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  });

  // ─── DATA ─────────────────────────────────────────────────────────────────

  const pantryItems = [
    { id: 1, name: 'Chicken Breast', qty: '400g', daysLeft: 1, category: 'protein', emoji: '🍗' },
    { id: 2, name: 'Spinach', qty: '1 bag', daysLeft: 2, category: 'veg', emoji: '🥬' },
    { id: 3, name: 'Eggs', qty: '6 left', daysLeft: 8, category: 'protein', emoji: '🥚' },
    { id: 4, name: 'Jasmine Rice', qty: '800g', daysLeft: 90, category: 'pantry', emoji: '🍚' },
    { id: 5, name: 'Cherry Tomatoes', qty: '250g', daysLeft: 3, category: 'veg', emoji: '🍅' },
    { id: 6, name: 'Greek Yogurt', qty: '2 cups', daysLeft: 4, category: 'dairy', emoji: '🥛' },
    { id: 7, name: 'Garlic', qty: '1 bulb', daysLeft: 14, category: 'pantry', emoji: '🧄' },
    { id: 8, name: 'Pasta', qty: '500g', daysLeft: 120, category: 'pantry', emoji: '🍝' },
    { id: 9, name: 'Lemon', qty: '2', daysLeft: 5, category: 'produce', emoji: '🍋' },
    { id: 10, name: 'Feta Cheese', qty: '100g', daysLeft: 6, category: 'dairy', emoji: '🧀' },
  ];

  const mealPlan72 = [
    {
      time: 'Tonight · 7:30 PM',
      label: 'Dinner',
      meal: 'Garlic Chicken & Spinach Bowl',
      time_needed: '18 min',
      effort: 'medium',
      ingredients: ['Chicken Breast', 'Spinach', 'Garlic', 'Rice'],
      swaps: [
        { name: 'Pantry Pasta Aglio', time_needed: '12 min', effort: 'low', reason: 'Less energy needed' },
        { name: 'Spinach & Egg Scramble', time_needed: '8 min', effort: 'low', reason: 'Fastest option' },
        { name: 'Order: Noodle Bar', time_needed: '25 min', effort: 'none', reason: 'Delivery nearby' },
      ]
    },
    {
      time: 'Tomorrow · 8:00 AM',
      label: 'Breakfast',
      meal: 'Greek Yogurt & Tomato Toast',
      time_needed: '5 min',
      effort: 'low',
      ingredients: ['Greek Yogurt', 'Cherry Tomatoes', 'Bread'],
      swaps: [
        { name: 'Egg & Spinach Wrap', time_needed: '10 min', effort: 'low', reason: 'Uses expiring spinach' },
      ]
    },
    {
      time: 'Tomorrow · 12:30 PM',
      label: 'Lunch',
      meal: 'Leftover Chicken Rice Bowl',
      time_needed: '3 min',
      effort: 'low',
      ingredients: ['Leftover chicken', 'Rice', 'Lemon'],
      swaps: [
        { name: 'Feta Pasta Salad', time_needed: '15 min', effort: 'medium', reason: 'Uses expiring feta' },
      ]
    },
    {
      time: 'Tomorrow · 7:00 PM',
      label: 'Dinner',
      meal: 'Tomato & Feta Pasta',
      time_needed: '22 min',
      effort: 'medium',
      ingredients: ['Pasta', 'Cherry Tomatoes', 'Feta Cheese', 'Garlic'],
      swaps: [
        { name: 'Egg Fried Rice', time_needed: '14 min', effort: 'medium', reason: 'Use more eggs' },
      ]
    },
    {
      time: 'Day 3 · 8:00 AM',
      label: 'Breakfast',
      meal: 'Scrambled Eggs on Toast',
      time_needed: '7 min',
      effort: 'low',
      ingredients: ['Eggs', 'Butter', 'Bread'],
      swaps: []
    },
  ];

  const moods = [
    { id: 'energized', label: 'Energized', emoji: '⚡', color: '#FBBF24' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: '#818CF8' },
    { id: 'comfort', label: 'Need Comfort', emoji: '🤗', color: '#F472B6' },
    { id: 'light', label: 'Keep it Light', emoji: '🌿', color: '#4ADE80' },
    { id: 'social', label: 'Social Vibes', emoji: '🥂', color: '#FB923C' },
    { id: 'rushed', label: 'Super Rushed', emoji: '⏱️', color: '#F87171' },
  ];

  const moodMeals = {
    energized: { meal: 'Protein Power Bowl', desc: 'Chicken, eggs, spinach, lemon tahini — high protein to keep the momentum going.', time: '15 min', tags: ['High Protein', 'Energizing'] },
    tired: { meal: 'Pantry Pasta Aglio', desc: 'Simple garlic pasta with olive oil. Minimal effort, maximum comfort from what you already have.', time: '12 min', tags: ['Easy', 'Pantry Only'] },
    comfort: { meal: 'Creamy Tomato Egg Bake', desc: 'Tomatoes, eggs, feta baked together. Warm, soft, and satisfying without a lot of standing.', time: '20 min', tags: ['Comfort', 'Warming'] },
    light: { meal: 'Greek Yogurt Salad Bowl', desc: 'Crisp tomatoes, feta, yogurt drizzle and lemon. Light, fresh and no cooking needed.', time: '5 min', tags: ['No Cook', 'Fresh'] },
    social: { meal: 'Sharing Pasta Aglio e Olio', desc: 'Classic crowd-pleaser. Scales easily for 2-4 people from pantry staples.', time: '18 min', tags: ['Shareable', 'Classic'] },
    rushed: { meal: 'Egg & Spinach Scramble', desc: 'One pan, 8 minutes, done. Uses expiring spinach and gives you protein fast.', time: '8 min', tags: ['Fastest', 'One Pan'] },
  };

  // ─── SCREENS ──────────────────────────────────────────────────────────────

  const HomeScreen = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const mealTime = hour < 10 ? 'Breakfast' : hour < 14 ? 'Lunch' : 'Dinner';
    const urgency = hour >= 17 ? 'Tonight' : 'Now';

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: t.textSec, fontSize: 13, margin: 0, fontWeight: 500 }}>{greeting}, Alex</p>
              <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: '2px 0 0', letterSpacing: '-0.5px' }}>
                What's the drift?
              </h1>
            </div>
            <div style={{
              background: t.primaryDim, border: `1px solid ${t.primary}40`,
              borderRadius: 12, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span style={{ fontSize: 10, color: t.primary, fontWeight: 600 }}>📅 3 meetings</span>
            </div>
          </div>

          {/* Energy Banner */}
          <div style={{
            marginTop: 16, background: `linear-gradient(135deg, ${t.primary}20, ${t.secondary}15)`,
            border: `1px solid ${t.primary}30`, borderRadius: 16, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <span style={{ fontSize: 24 }}>⏰</span>
            <div>
              <p style={{ color: t.text, fontSize: 13, fontWeight: 600, margin: 0 }}>Home by 8:40 PM tonight</p>
              <p style={{ color: t.textSec, fontSize: 11, margin: '2px 0 0' }}>Plan adjusted — dinner swapped to 12-min option</p>
            </div>
          </div>
        </div>

        {/* Tonight's Dinner Card */}
        <div style={{ padding: '16px 20px 0' }}>
          <p style={{ color: t.textSec, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', margin: '0 0 10px' }}>
            {urgency}'s {mealTime}
          </p>

          <div style={{
            background: t.card, borderRadius: 20, border: `1px solid ${t.border}`,
            overflow: 'hidden', boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              background: `linear-gradient(135deg, ${t.primary}, #FF8C55)`,
              padding: '20px', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', right: -20, top: -20, fontSize: 80, opacity: 0.25,
                transform: 'rotate(15deg)'
              }}>🍗</div>
              <div style={{
                background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '3px 8px',
                display: 'inline-block', marginBottom: 8
              }}>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>⚡ ADAPTED FOR YOU</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.3px' }}>
                Pantry Pasta Aglio
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, margin: 0 }}>
                Swapped from Garlic Chicken Bowl — you're getting home late
              </p>
            </div>

            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[['⏱', '12 min'], ['🔥', 'Low effort'], ['🥬', 'Uses spinach']].map(([icon, label]) => (
                  <div key={label} style={{
                    background: t.surface2, borderRadius: 8, padding: '5px 8px',
                    display: 'flex', alignItems: 'center', gap: 4
                  }}>
                    <span style={{ fontSize: 11 }}>{icon}</span>
                    <span style={{ color: t.textSec, fontSize: 11, fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <div
                  onClick={() => { handlePress('cook'); }}
                  style={btnStyle('cook', {
                    flex: 1, background: t.primary, borderRadius: 12, padding: '11px',
                    textAlign: 'center', border: 'none'
                  })}
                >
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>Start Cooking</span>
                </div>
                <div
                  onClick={() => { setSwapOpen(true); setSwapTarget(mealPlan72[0]); handlePress('swap'); }}
                  style={btnStyle('swap', {
                    background: t.surface2, border: `1px solid ${t.border}`,
                    borderRadius: 12, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 6
                  })}
                >
                  <span style={{ color: t.textSec, fontSize: 13, fontWeight: 600 }}>↔ Swap</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pantry Alert */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{
            background: t.warningDim, border: `1px solid ${t.warning}40`,
            borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div>
                <p style={{ color: t.warning, fontSize: 13, fontWeight: 600, margin: 0 }}>2 items expiring soon</p>
                <p style={{ color: t.textSec, fontSize: 11, margin: '2px 0 0' }}>Chicken breast & spinach — used in plan</p>
              </div>
            </div>
            <span style={{ color: t.textSec, fontSize: 16 }}>›</span>
          </div>
        </div>

        {/* Quick Mood */}
        <div style={{ padding: '16px 20px 0' }}>
          <p style={{ color: t.textSec, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', margin: '0 0 10px' }}>
            How are you feeling?
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {moods.slice(0, 4).map(m => (
              <div
                key={m.id}
                onClick={() => { setSelectedMood(m.id); setActiveTab('mood'); handlePress(m.id); }}
                style={btnStyle(m.id, {
                  background: selectedMood === m.id ? m.color + '25' : t.surface2,
                  border: `1px solid ${selectedMood === m.id ? m.color : t.border}`,
                  borderRadius: 10, padding: '7px 10px',
                  display: 'flex', alignItems: 'center', gap: 5
                })}
              >
                <span style={{ fontSize: 13 }}>{m.emoji}</span>
                <span style={{ color: t.textSec, fontSize: 12, fontWeight: 500 }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tomorrow preview */}
        <div style={{ padding: '16px 20px 0' }}>
          <p style={{ color: t.textSec, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', margin: '0 0 10px' }}>
            Tomorrow's preview
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {mealPlan72.slice(1, 3).map((m, i) => (
              <div key={i} style={{
                flex: 1, background: t.card, borderRadius: 14, border: `1px solid ${t.border}`,
                padding: '12px'
              }}>
                <p style={{ color: t.textMuted, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', margin: '0 0 4px' }}>{m.label}</p>
                <p style={{ color: t.text, fontSize: 13, fontWeight: 600, margin: '0 0 4px', lineHeight: 1.3 }}>{m.meal}</p>
                <p style={{ color: t.primary, fontSize: 11, margin: 0 }}>⏱ {m.time_needed}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const PantryScreen = () => {
    const expiring = pantryItems.filter(i => i.daysLeft <= 3);
    const fresh = pantryItems.filter(i => i.daysLeft > 3);

    const expiryColor = (days) => {
      if (days <= 1) return t.danger;
      if (days <= 3) return t.warning;
      return t.success;
    };

    const expiryLabel = (days) => {
      if (days <= 0) return 'Expired!';
      if (days === 1) return 'Today!';
      if (days <= 3) return `${days}d left`;
      return `${days} days`;
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '20px 20px 0' }}>
          <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Pantry</h1>
          <p style={{ color: t.textSec, fontSize: 13, margin: '0 0 16px' }}>10 items · 2 expiring soon</p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Expiring', value: '2', color: t.warning, bg: t.warningDim },
              { label: 'Proteins', value: '3', color: t.primary, bg: t.primaryDim },
              { label: 'Veggies', value: '2', color: t.success, bg: t.successDim },
              { label: 'Pantry', value: '3', color: t.textSec, bg: t.surface2 },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: s.bg, borderRadius: 12, padding: '10px 6px', textAlign: 'center'
              }}>
                <p style={{ color: s.color, fontSize: 18, fontWeight: 800, margin: 0 }}>{s.value}</p>
                <p style={{ color: t.textSec, fontSize: 10, margin: '2px 0 0', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expiring Section */}
        {expiring.length > 0 && (
          <div style={{ padding: '0 20px 0' }}>
            <p style={{ color: t.danger, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 8px' }}>
              ⚠️ Use Soon
            </p>
            {expiring.map(item => (
              <div key={item.id} style={{
                background: t.dangerDim, border: `1px solid ${t.danger}30`,
                borderRadius: 14, padding: '12px 14px', marginBottom: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{item.emoji}</span>
                  <div>
                    <p style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.name}</p>
                    <p style={{ color: t.textSec, fontSize: 12, margin: '2px 0 0' }}>{item.qty}</p>
                  </div>
                </div>
                <div style={{
                  background: expiryColor(item.daysLeft) + '25',
                  border: `1px solid ${expiryColor(item.daysLeft)}50`,
                  borderRadius: 8, padding: '4px 8px'
                }}>
                  <span style={{ color: expiryColor(item.daysLeft), fontSize: 11, fontWeight: 700 }}>
                    {expiryLabel(item.daysLeft)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Items */}
        <div style={{ padding: '16px 20px 0' }}>
          <p style={{ color: t.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 8px' }}>
            All Items
          </p>
          {fresh.map(item => (
            <div key={item.id} style={{
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: 14, padding: '12px 14px', marginBottom: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{item.emoji}</span>
                <div>
                  <p style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.name}</p>
                  <p style={{ color: t.textSec, fontSize: 12, margin: '2px 0 0' }}>{item.qty}</p>
                </div>
              </div>
              <span style={{ color: t.textMuted, fontSize: 12 }}>{expiryLabel(item.daysLeft)}</span>
            </div>
          ))}
        </div>

        {/* Add button */}
        <div style={{ padding: '16px 20px' }}>
          <div
            onClick={() => handlePress('addItem')}
            style={btnStyle('addItem', {
              background: t.primaryDim, border: `1px dashed ${t.primary}60`,
              borderRadius: 14, padding: 14, textAlign: 'center'
            })}
          >
            <span style={{ color: t.primary, fontSize: 14, fontWeight: 600 }}>+ Add Item</span>
          </div>
        </div>
      </div>
    );
  };

  const PlanScreen = () => {
    const effortColor = (e) => e === 'low' ? t.success : e === 'medium' ? t.warning : t.primary;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '20px 20px 0' }}>
          <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.5px' }}>72hr Map</h1>
          <p style={{ color: t.textSec, fontSize: 13, margin: '0 0 16px' }}>Your rolling meal plan — swappable anytime</p>

          {/* Waste saved banner */}
          <div style={{
            background: t.successDim, border: `1px solid ${t.success}40`,
            borderRadius: 14, padding: '10px 14px', marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <span style={{ fontSize: 20 }}>♻️</span>
            <div>
              <p style={{ color: t.success, fontSize: 13, fontWeight: 700, margin: 0 }}>Zero food waste projected</p>
              <p style={{ color: t.textSec, fontSize: 11, margin: '2px 0 0' }}>All expiring items used across the next 3 days</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '0 20px' }}>
          {mealPlan72.map((meal, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              {/* Timeline line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? t.primary : t.surface3,
                  border: `2px solid ${i === 0 ? t.primary : t.border}`,
                  marginTop: 4
                }} />
                {i < mealPlan72.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: t.border, marginTop: 4, minHeight: 20 }} />
                )}
              </div>

              {/* Card */}
              <div style={{
                flex: 1, background: t.card, borderRadius: 16,
                border: `1px solid ${i === 0 ? t.primary + '50' : t.border}`,
                padding: '12px 14px', marginBottom: 4
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <p style={{ color: t.textMuted, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 2px', letterSpacing: 0.5 }}>
                      {meal.label}
                    </p>
                    <p style={{ color: t.text, fontSize: 15, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{meal.meal}</p>
                  </div>
                  {i === 0 && (
                    <div style={{ background: t.primary, borderRadius: 6, padding: '2px 7px' }}>
                      <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>NOW</span>
                    </div>
                  )}
                </div>

                <p style={{ color: t.textMuted, fontSize: 11, margin: '0 0 8px' }}>{meal.time}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ color: t.textSec, fontSize: 11 }}>⏱ {meal.time_needed}</span>
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: t.border }} />
                  <div style={{
                    background: effortColor(meal.effort) + '20',
                    borderRadius: 5, padding: '2px 6px'
                  }}>
                    <span style={{ color: effortColor(meal.effort), fontSize: 10, fontWeight: 600, textTransform: 'capitalize' }}>
                      {meal.effort} effort
                    </span>
                  </div>
                </div>

                {/* Ingredient pills */}
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: meal.swaps.length ? 10 : 0 }}>
                  {meal.ingredients.map(ing => (
                    <div key={ing} style={{
                      background: t.surface2, borderRadius: 6, padding: '3px 7px'
                    }}>
                      <span style={{ color: t.textSec, fontSize: 10 }}>{ing}</span>
                    </div>
                  ))}
                </div>

                {meal.swaps.length > 0 && (
                  <div
                    onClick={() => { setSwapTarget(meal); setSwapOpen(true); handlePress('swap' + i); }}
                    style={btnStyle('swap' + i, {
                      background: t.surface2, border: `1px solid ${t.border}`,
                      borderRadius: 8, padding: '7px 10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    })}
                  >
                    <span style={{ color: t.textSec, fontSize: 12, fontWeight: 500 }}>
                      ↔ {meal.swaps.length} swap{meal.swaps.length > 1 ? 's' : ''} available
                    </span>
                    <span style={{ color: t.primary, fontSize: 12, fontWeight: 600 }}>View</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MoodScreen = () => {
    const [localMood, setLocalMood] = useState(selectedMood);
    const suggestion = localMood ? moodMeals[localMood] : null;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '20px 20px 16px' }}>
          <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Mood Match</h1>
          <p style={{ color: t.textSec, fontSize: 13, margin: 0 }}>Tell us how you're feeling and we'll adapt</p>
        </div>

        {/* Mood Grid */}
        <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {moods.map(m => (
            <div
              key={m.id}
              onClick={() => { setLocalMood(m.id); setSelectedMood(m.id); handlePress('mood-' + m.id); }}
              style={btnStyle('mood-' + m.id, {
                background: localMood === m.id ? m.color + '20' : t.card,
                border: `2px solid ${localMood === m.id ? m.color : t.border}`,
                borderRadius: 16, padding: '16px 14px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                boxShadow: localMood === m.id
                  ? `0 0 20px ${m.color}30`
                  : isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
              })}
            >
              <span style={{ fontSize: 30 }}>{m.emoji}</span>
              <span style={{ color: localMood === m.id ? m.color : t.textSec, fontSize: 13, fontWeight: 600 }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Suggestion Card */}
        {suggestion && (
          <div style={{ padding: '0 20px' }}>
            <div style={{
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: 20, overflow: 'hidden',
              boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${moods.find(m => m.id === localMood)?.color || t.primary}30, transparent)`,
                padding: '18px 16px 14px'
              }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  {suggestion.tags.map(tag => (
                    <div key={tag} style={{
                      background: (moods.find(m => m.id === localMood)?.color || t.primary) + '25',
                      borderRadius: 6, padding: '3px 8px'
                    }}>
                      <span style={{ color: moods.find(m => m.id === localMood)?.color || t.primary, fontSize: 10, fontWeight: 700 }}>{tag}</span>
                    </div>
                  ))}
                </div>
                <h2 style={{ color: t.text, fontSize: 20, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                  {suggestion.meal}
                </h2>
                <p style={{ color: t.textSec, fontSize: 13, margin: '0 0 10px', lineHeight: 1.5 }}>
                  {suggestion.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>⏱</span>
                  <span style={{ color: t.primary, fontSize: 13, fontWeight: 600 }}>{suggestion.time}</span>
                  <span style={{ color: t.textMuted, fontSize: 12 }}>· From your pantry</span>
                </div>
              </div>

              <div style={{ padding: '12px 16px 16px', borderTop: `1px solid ${t.border}` }}>
                <div
                  onClick={() => handlePress('makeMood')}
                  style={btnStyle('makeMood', {
                    background: t.primary, borderRadius: 12, padding: 13, textAlign: 'center'
                  })}
                >
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>Make This Tonight</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!localMood && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ color: t.textMuted, fontSize: 14 }}>Pick a mood above to get a personalized suggestion</p>
          </div>
        )}
      </div>
    );
  };

  const SettingsScreen = () => {
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '20px 20px 0' }}>
          <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Settings</h1>
          <p style={{ color: t.textSec, fontSize: 13, margin: '0 0 20px' }}>Your preferences & profile</p>

          {/* Profile Card */}
          <div style={{
            background: t.card, borderRadius: 20, border: `1px solid ${t.border}`,
            padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22
            }}>🧑‍🍳</div>
            <div>
              <p style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: 0 }}>Alex Chen</p>
              <p style={{ color: t.textSec, fontSize: 13, margin: '2px 0 0' }}>Urban commuter · Home by 8 PM</p>
            </div>
          </div>

          {/* Sections */}
          {[
            {
              label: 'Appearance',
              items: [
                {
                  icon: '🌙', label: 'Dark Mode', type: 'toggle', value: isDark,
                  onToggle: () => setIsDark(!isDark)
                },
              ]
            },
            {
              label: 'Lifestyle',
              items: [
                { icon: '📅', label: 'Calendar Sync', sub: 'Google Calendar connected', type: 'badge', badge: 'On' },
                { icon: '⚡', label: 'Energy Pattern', sub: 'Low energy after 7 PM', type: 'nav' },
                { icon: '💰', label: 'Weekly Budget', sub: '$80 for groceries', type: 'nav' },
                { icon: '🥗', label: 'Diet Preferences', sub: 'No restrictions set', type: 'nav' },
              ]
            },
            {
              label: 'Notifications',
              items: [
                { icon: '🔔', label: 'Meal Reminders', sub: '30 min before suggested time', type: 'toggle', value: true, onToggle: () => {} },
                { icon: '⚠️', label: 'Expiry Alerts', sub: '2 days before items expire', type: 'toggle', value: true, onToggle: () => {} },
              ]
            },
          ].map(section => (
            <div key={section.label} style={{ marginBottom: 20 }}>
              <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 8px 4px' }}>
                {section.label}
              </p>
              <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
                {section.items.map((item, i) => (
                  <div key={item.label} style={{
                    padding: '13px 14px',
                    borderBottom: i < section.items.length - 1 ? `1px solid ${t.border}` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 18 }}>{item.icon}</span>
                      <div>
                        <p style={{ color: t.text, fontSize: 14, fontWeight: 500, margin: 0 }}>{item.label}</p>
                        {item.sub && <p style={{ color: t.textSec, fontSize: 11, margin: '1px 0 0' }}>{item.sub}</p>}
                      </div>
                    </div>
                    {item.type === 'toggle' && (
                      <div
                        onClick={() => { item.onToggle(); handlePress('toggle-' + item.label); }}
                        style={btnStyle('toggle-' + item.label, {
                          width: 44, height: 26, borderRadius: 13,
                          background: item.value ? t.primary : t.surface3,
                          position: 'relative', transition: 'background 0.2s'
                        })}
                      >
                        <div style={{
                          position: 'absolute', top: 3, left: item.value ? 21 : 3,
                          width: 20, height: 20, borderRadius: 10,
                          background: '#fff', transition: 'left 0.2s',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                        }} />
                      </div>
                    )}
                    {item.type === 'badge' && (
                      <div style={{ background: t.successDim, borderRadius: 6, padding: '3px 8px' }}>
                        <span style={{ color: t.success, fontSize: 11, fontWeight: 700 }}>{item.badge}</span>
                      </div>
                    )}
                    {item.type === 'nav' && (
                      <span style={{ color: t.textMuted, fontSize: 16 }}>›</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Version */}
          <p style={{ color: t.textMuted, fontSize: 11, textAlign: 'center', marginBottom: 8 }}>
            Drift Dinner v1.0.0 · Built with care
          </p>
        </div>
      </div>
    );
  };

  // ─── SWAP MODAL ───────────────────────────────────────────────────────────

  const SwapModal = () => {
    if (!swapOpen || !swapTarget) return null;
    return (
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', zIndex: 100
      }}
        onClick={() => setSwapOpen(false)}
      >
        <div
          style={{
            width: '100%', background: t.surface, borderRadius: '24px 24px 0 0',
            border: `1px solid ${t.border}`, padding: '20px', maxHeight: '70%', overflowY: 'auto'
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 16px' }} />
          <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 4px' }}>
            Swapping
          </p>
          <h3 style={{ color: t.text, fontSize: 17, fontWeight: 700, margin: '0 0 16px' }}>{swapTarget.meal}</h3>

          <p style={{ color: t.textSec, fontSize: 12, fontWeight: 600, margin: '0 0 10px' }}>Choose a swap:</p>
          {swapTarget.swaps.map((s, i) => (
            <div
              key={i}
              onClick={() => { handlePress('pick-' + i); setTimeout(() => setSwapOpen(false), 150); }}
              style={btnStyle('pick-' + i, {
                background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 14, padding: '12px 14px', marginBottom: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              })}
            >
              <div>
                <p style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: '0 0 2px' }}>{s.name}</p>
                <p style={{ color: t.textSec, fontSize: 12, margin: 0 }}>{s.reason}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: t.primary, fontSize: 12, fontWeight: 600, margin: '0 0 2px' }}>⏱ {s.time_needed}</p>
                <p style={{ color: t.textMuted, fontSize: 10, margin: 0, textTransform: 'capitalize' }}>{s.effort} effort</p>
              </div>
            </div>
          ))}

          <div
            onClick={() => setSwapOpen(false)}
            style={btnStyle('close-swap', {
              background: t.surface2, borderRadius: 12, padding: 12, textAlign: 'center', marginTop: 6
            })}
          >
            <span style={{ color: t.textSec, fontSize: 14, fontWeight: 600 }}>Keep Original Plan</span>
          </div>
        </div>
      </div>
    );
  };

  // ─── NAV ──────────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'home', label: 'Today', emoji: '🏠' },
    { id: 'pantry', label: 'Pantry', emoji: '🥫' },
    { id: 'plan', label: '72hr', emoji: '📋' },
    { id: 'mood', label: 'Mood', emoji: '✨' },
    { id: 'settings', label: 'Settings', emoji: '⚙️' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'pantry': return <PantryScreen />;
      case 'plan': return <PlanScreen />;
      case 'mood': return <MoodScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  // ─── ROOT ────────────────────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: '100vh', background: '#1a1a1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Outfit', sans-serif"
    }}>
      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, background: t.bg,
        borderRadius: 52, overflow: 'hidden', position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 2px #333, inset 0 0 0 1px rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column'
      }}>

        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, background: '#000',
          borderRadius: 20, zIndex: 50,
          boxShadow: '0 0 0 2px #1a1a1a'
        }} />

        {/* Status Bar */}
        <div style={{
          height: 52, background: t.bg, display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', padding: '0 24px 8px', flexShrink: 0
        }}>
          <span style={{ color: t.text, fontSize: 13, fontWeight: 700 }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ color: t.text, fontSize: 11, fontWeight: 600 }}>●●●</span>
            <span style={{ color: t.text, fontSize: 10 }}>WiFi</span>
            <span style={{ color: t.text, fontSize: 11 }}>🔋</span>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderScreen()}
        </div>

        {/* Swap Modal */}
        <SwapModal />

        {/* Bottom Nav */}
        <div style={{
          height: 80, background: t.tabBar,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          padding: '0 8px 12px', flexShrink: 0
        }}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); handlePress('tab-' + tab.id); }}
              style={btnStyle('tab-' + tab.id, {
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                padding: '6px 12px', borderRadius: 12,
                background: activeTab === tab.id ? t.primaryDim : 'transparent'
              })}
            >
              <span style={{ fontSize: 20 }}>{tab.emoji}</span>
              <span style={{
                color: activeTab === tab.id ? t.primary : t.textMuted,
                fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500
              }}>
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
