function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [prevTab, setPrevTab] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [energyAnimated, setEnergyAnimated] = useState(false);
  const [activeInsight, setActiveInsight] = useState(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #0a0a0a; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Inter', sans-serif; }
      ::-webkit-scrollbar { display: none; }
      @keyframes pulse-ring { 0% { transform: scale(0.95); opacity: 0.7; } 70% { transform: scale(1.05); opacity: 0.3; } 100% { transform: scale(0.95); opacity: 0.7; } }
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes fillBar { from { width: 0%; } to { width: var(--target-width); } }
      @keyframes countUp { from { opacity: 0; } to { opacity: 1; } }
      @keyframes modalUp { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes bounceIn { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
      .tab-content { animation: fadeSlideUp 0.35s ease forwards; }
      .insight-card { animation: scaleIn 0.3s ease forwards; }
      .modal-sheet { animation: modalUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      .nudge-card { animation: fadeSlideIn 0.4s ease forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => setEnergyAnimated(true), 500);
  }, [activeTab]);

  const navigateTo = (tab) => {
    if (tab === activeTab) return;
    setPressedBtn(tab);
    setTimeout(() => setPressedBtn(null), 200);
    setTransitioning(true);
    setTimeout(() => {
      setPrevTab(activeTab);
      setActiveTab(tab);
      setTransitioning(false);
    }, 150);
  };

  const colors = {
    bg: '#0f0f13',
    surface: '#1a1a22',
    surfaceAlt: '#22222d',
    border: '#2a2a38',
    primary: '#7EE8A2',
    primaryDark: '#5BC87E',
    accent: '#F59E4A',
    accentBlue: '#60A5FA',
    accentPurple: '#A78BFA',
    accentRed: '#F87171',
    text: '#F0F0F5',
    textSub: '#8888A0',
    textDim: '#5555678',
    card: '#1e1e2a',
    cardBorder: '#2e2e40',
  };

  const meals = [
    { id: 1, name: 'Overnight Oats', time: '7:30 AM', calories: 380, icon: '🥣', impact: 'high', tag: 'Focus Boost', energy: 4.2 },
    { id: 2, name: 'Chicken Bowl', time: '12:15 PM', calories: 620, icon: '🍗', impact: 'medium', tag: 'Recovery', energy: 3.1 },
    { id: 3, name: 'Apple + Almond Butter', time: '3:45 PM', calories: 210, icon: '🍎', impact: 'high', tag: 'Pre-Run', energy: 4.5 },
  ];

  const insightData = [
    {
      title: 'Afternoon Crash Pattern',
      desc: 'On 7 of the last 10 days, your energy dropped 35% between 2–4 PM after a carb-heavy lunch.',
      icon: '⚡',
      color: colors.accentRed,
      action: 'Swap to a protein-forward lunch',
      severity: 'moderate',
    },
    {
      title: 'Best Sleep Combo',
      desc: 'Your deep sleep score increases 18% when you eat dinner before 7 PM after a workout.',
      icon: '😴',
      color: colors.accentPurple,
      action: 'Set dinner reminder for 6:30 PM',
      severity: 'positive',
    },
    {
      title: 'Post-Run Recovery Window',
      desc: 'On days you eat within 30 min of your run, your next-day readiness score is 22pts higher.',
      icon: '🏃',
      color: colors.primary,
      action: 'Enable post-run snack alert',
      severity: 'positive',
    },
  ];

  const recoveryMetrics = [
    { label: 'HRV', value: 68, unit: 'ms', change: '+4', good: true, icon: 'Heart' },
    { label: 'Sleep', value: 7.2, unit: 'hrs', change: '+0.4', good: true, icon: 'Moon' },
    { label: 'Steps', value: 8240, unit: '', change: '-610', good: false, icon: 'Footprints' },
    { label: 'Stress', value: 32, unit: '%', change: '-8', good: true, icon: 'Activity' },
  ];

  const energyScore = 74;
  const energyBreakdown = [
    { label: 'Nutrition', value: 78, color: colors.primary },
    { label: 'Sleep', value: 82, color: colors.accentPurple },
    { label: 'Movement', value: 65, color: colors.accentBlue },
    { label: 'Stress', value: 70, color: colors.accent },
  ];

  const navItems = [
    { id: 'home', label: 'Today', icon: 'Home' },
    { id: 'log', label: 'Log', icon: 'Plus' },
    { id: 'insights', label: 'Insights', icon: 'TrendingUp' },
    { id: 'recovery', label: 'Recovery', icon: 'Activity' },
  ];

  const LucideIcon = ({ name, size = 20, color = colors.text, strokeWidth = 2 }) => {
    const Icon = window.lucide && window.lucide[name];
    if (!Icon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(Icon, { size, color, strokeWidth });
  };

  const EnergyRing = ({ score }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    return React.createElement('svg', { width: 140, height: 140, style: { transform: 'rotate(-90deg)' } },
      React.createElement('circle', { cx: 70, cy: 70, r: radius, fill: 'none', stroke: colors.border, strokeWidth: 10 }),
      React.createElement('circle', { cx: 70, cy: 70, r: radius, fill: 'none', stroke: colors.primary, strokeWidth: 10, strokeLinecap: 'round', strokeDasharray: circumference, strokeDashoffset: energyAnimated ? strokeDashoffset : circumference, style: { transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' } }),
      React.createElement('circle', { cx: 70, cy: 70, r: 44, fill: colors.card }),
    );
  };

  const MiniBar = ({ value, color, animated }) => React.createElement('div', {
    style: { height: 6, borderRadius: 3, background: colors.border, overflow: 'hidden', flex: 1 }
  },
    React.createElement('div', {
      style: { height: '100%', width: animated ? `${value}%` : '0%', background: color, borderRadius: 3, transition: 'width 1s ease 0.3s' }
    })
  );

  const HomeScreen = () => React.createElement('div', { className: 'tab-content', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
    // Header
    React.createElement('div', { style: { padding: '16px 20px 8px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('p', { style: { color: colors.textSub, fontSize: 13, fontWeight: 500 } }, 'Good morning,'),
          React.createElement('h1', { style: { color: colors.text, fontSize: 22, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: -0.5 } }, 'Alex 👋'),
        ),
        React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: 'linear-gradient(135deg, #7EE8A2, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('span', { style: { fontSize: 16 } }, 'A')
        )
      )
    ),

    // Nudge Card
    !nudgeDismissed && React.createElement('div', { className: 'nudge-card', style: { margin: '8px 20px', background: 'linear-gradient(135deg, rgba(126,232,162,0.15), rgba(96,165,250,0.1))', borderRadius: 16, padding: '14px 16px', border: `1px solid rgba(126,232,162,0.25)`, position: 'relative' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 10 } },
        React.createElement('span', { style: { fontSize: 20 } }, '⚡'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: colors.primary, fontSize: 12, fontWeight: 600, marginBottom: 2 } }, 'RECOVERY NUDGE'),
          React.createElement('p', { style: { color: colors.text, fontSize: 13, fontWeight: 500, lineHeight: 1.4 } }, 'Your HRV is slightly low today. Consider a protein-rich lunch to support muscle recovery.'),
        ),
        React.createElement('button', { onClick: () => setNudgeDismissed(true), style: { background: 'none', border: 'none', cursor: 'pointer', color: colors.textSub, fontSize: 18, padding: 0, lineHeight: 1 } }, '×')
      )
    ),

    // Energy Score
    React.createElement('div', { style: { margin: '12px 20px', background: colors.card, borderRadius: 20, padding: '20px', border: `1px solid ${colors.cardBorder}` } },
      React.createElement('p', { style: { color: colors.textSub, fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 12 } }, 'TODAY\'S ENERGY SCORE'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 20 } },
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement(EnergyRing, { score: energyScore }),
          React.createElement('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' } },
            React.createElement('p', { style: { color: colors.text, fontSize: 28, fontWeight: 800, fontFamily: "'Syne', sans-serif", lineHeight: 1 } }, energyScore),
            React.createElement('p', { style: { color: colors.primary, fontSize: 10, fontWeight: 600 } }, 'GOOD'),
          )
        ),
        React.createElement('div', { style: { flex: 1 } },
          energyBreakdown.map((item, i) => React.createElement('div', { key: i, style: { marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
              React.createElement('span', { style: { color: colors.textSub, fontSize: 11, fontWeight: 500 } }, item.label),
              React.createElement('span', { style: { color: colors.text, fontSize: 11, fontWeight: 600 } }, `${item.value}%`),
            ),
            React.createElement(MiniBar, { value: item.value, color: item.color, animated: energyAnimated })
          ))
        )
      )
    ),

    // Recovery Metrics
    React.createElement('div', { style: { margin: '0 20px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
      recoveryMetrics.map((m, i) => React.createElement('div', { key: i, style: { background: colors.card, borderRadius: 16, padding: '14px', border: `1px solid ${colors.cardBorder}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
          React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: colors.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(LucideIcon, { name: m.icon, size: 16, color: m.good ? colors.primary : colors.accent })
          ),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: m.good ? colors.primary : colors.accentRed, background: m.good ? 'rgba(126,232,162,0.1)' : 'rgba(248,113,113,0.1)', padding: '2px 6px', borderRadius: 6 } }, m.change)
        ),
        React.createElement('p', { style: { color: colors.text, fontSize: 20, fontWeight: 700 } }, m.value.toLocaleString()),
        React.createElement('p', { style: { color: colors.textSub, fontSize: 11 } }, m.unit ? `${m.label} (${m.unit})` : m.label),
      ))
    ),

    // Today's Meals
    React.createElement('div', { style: { margin: '0 20px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('p', { style: { color: colors.text, fontSize: 15, fontWeight: 700 } }, 'Today\'s Meals'),
        React.createElement('button', { onClick: () => navigateTo('log'), style: { background: 'none', border: 'none', cursor: 'pointer', color: colors.primary, fontSize: 13, fontWeight: 600 } }, 'Add +')
      ),
      meals.map((meal, i) => React.createElement('div', { key: i, style: { background: colors.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${colors.cardBorder}`, display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('span', { style: { fontSize: 28 } }, meal.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: colors.text, fontSize: 14, fontWeight: 600 } }, meal.name),
          React.createElement('p', { style: { color: colors.textSub, fontSize: 12 } }, `${meal.time} · ${meal.calories} kcal`),
        ),
        React.createElement('div', { style: { background: meal.impact === 'high' ? 'rgba(126,232,162,0.15)' : 'rgba(245,158,74,0.15)', borderRadius: 8, padding: '4px 8px' } },
          React.createElement('p', { style: { color: meal.impact === 'high' ? colors.primary : colors.accent, fontSize: 11, fontWeight: 600 } }, meal.tag)
        )
      ))
    )
  );

  const LogScreen = () => {
    const [step, setStep] = useState(1);
    const [mealType, setMealType] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);
    const [context, setContext] = useState([]);
    const [logged, setLogged] = useState(false);

    const mealTypes = [
      { id: 'breakfast', label: 'Breakfast', icon: '🌅', time: '7:30 AM' },
      { id: 'lunch', label: 'Lunch', icon: '☀️', time: '12:00 PM' },
      { id: 'snack', label: 'Snack', icon: '🍎', time: '3:45 PM' },
      { id: 'dinner', label: 'Dinner', icon: '🌙', time: '7:00 PM' },
    ];

    const foodSuggestions = [
      { name: 'Grilled Salmon', cal: 420, icon: '🐟', tags: ['Protein', 'Omega-3'] },
      { name: 'Quinoa Bowl', cal: 380, icon: '🥗', tags: ['Fiber', 'Complex Carbs'] },
      { name: 'Greek Yogurt', cal: 150, icon: '🫙', tags: ['Protein', 'Probiotic'] },
      { name: 'Banana + PB', cal: 260, icon: '🍌', tags: ['Quick Energy'] },
    ];

    const contextOptions = [
      { id: 'pre-workout', label: 'Pre-Workout' },
      { id: 'post-workout', label: 'Post-Workout' },
      { id: 'working', label: 'Focus Session' },
      { id: 'tired', label: 'Feeling Tired' },
      { id: 'stressed', label: 'High Stress' },
      { id: 'relaxed', label: 'Relaxed' },
    ];

    if (logged) return React.createElement('div', { className: 'tab-content', style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 } },
      React.createElement('div', { style: { width: 80, height: 80, borderRadius: 40, background: 'rgba(126,232,162,0.15)', border: `2px solid ${colors.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'bounceIn 0.5s ease' } },
        React.createElement('span', { style: { fontSize: 36 } }, '✓')
      ),
      React.createElement('h2', { style: { color: colors.text, fontSize: 20, fontWeight: 700, marginBottom: 8, textAlign: 'center' } }, 'Meal Logged!'),
      React.createElement('p', { style: { color: colors.textSub, fontSize: 14, textAlign: 'center', lineHeight: 1.6, marginBottom: 24 } }, 'Based on your recent run and HRV data, this looks like a great recovery choice.'),
      React.createElement('div', { style: { background: colors.card, borderRadius: 16, padding: 16, width: '100%', border: `1px solid ${colors.cardBorder}`, marginBottom: 20 } },
        React.createElement('p', { style: { color: colors.primary, fontSize: 12, fontWeight: 600, marginBottom: 8 } }, 'INSTANT INSIGHT'),
        React.createElement('p', { style: { color: colors.text, fontSize: 13, lineHeight: 1.5 } }, '💡 Your energy score should improve by ~6pts. Drink 400ml water in the next hour to maximize protein absorption.'),
      ),
      React.createElement('button', { onClick: () => { setStep(1); setLogged(false); setMealType(null); setSelectedFood(null); setContext([]); }, style: { background: colors.primary, color: '#0f0f13', border: 'none', borderRadius: 14, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' } }, 'Log Another Meal')
    );

    return React.createElement('div', { className: 'tab-content', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { color: colors.text, fontSize: 22, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 4 } }, 'Log a Meal'),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 12, marginBottom: 20 } },
          [1, 2, 3].map(s => React.createElement('div', { key: s, style: { height: 3, flex: 1, borderRadius: 2, background: step >= s ? colors.primary : colors.border, transition: 'background 0.3s' } }))
        )
      ),

      step === 1 && React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { color: colors.textSub, fontSize: 13, marginBottom: 14 } }, 'What meal are you logging?'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          mealTypes.map(mt => React.createElement('button', { key: mt.id, onClick: () => { setMealType(mt.id); setStep(2); }, style: { background: mealType === mt.id ? 'rgba(126,232,162,0.1)' : colors.card, border: `1.5px solid ${mealType === mt.id ? colors.primary : colors.cardBorder}`, borderRadius: 16, padding: '16px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' } },
            React.createElement('span', { style: { fontSize: 28, display: 'block', marginBottom: 8 } }, mt.icon),
            React.createElement('p', { style: { color: colors.text, fontSize: 14, fontWeight: 600 } }, mt.label),
            React.createElement('p', { style: { color: colors.textSub, fontSize: 11 } }, mt.time),
          ))
        )
      ),

      step === 2 && React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { color: colors.textSub, fontSize: 13, marginBottom: 14 } }, 'What did you eat?'),
        React.createElement('div', { style: { background: colors.card, borderRadius: 14, padding: '10px 14px', border: `1px solid ${colors.cardBorder}`, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 } },
          React.createElement(LucideIcon, { name: 'Search', size: 16, color: colors.textSub }),
          React.createElement('span', { style: { color: colors.textSub, fontSize: 14 } }, 'Search foods or scan barcode...'),
        ),
        React.createElement('p', { style: { color: colors.textSub, fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 10 } }, 'SUGGESTED FOR RECOVERY'),
        foodSuggestions.map((food, i) => React.createElement('div', { key: i, onClick: () => setSelectedFood(food.name), style: { background: selectedFood === food.name ? 'rgba(126,232,162,0.08)' : colors.card, border: `1.5px solid ${selectedFood === food.name ? colors.primary : colors.cardBorder}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' } },
          React.createElement('span', { style: { fontSize: 28 } }, food.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { color: colors.text, fontSize: 14, fontWeight: 600 } }, food.name),
            React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 4 } },
              food.tags.map((t, j) => React.createElement('span', { key: j, style: { fontSize: 10, color: colors.accentBlue, background: 'rgba(96,165,250,0.1)', padding: '2px 7px', borderRadius: 6, fontWeight: 600 } }, t))
            )
          ),
          React.createElement('span', { style: { color: colors.textSub, fontSize: 12 } }, `${food.cal} kcal`)
        )),
        selectedFood && React.createElement('button', { onClick: () => setStep(3), style: { width: '100%', background: colors.primary, color: '#0f0f13', border: 'none', borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8 } }, 'Continue →')
      ),

      step === 3 && React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { color: colors.textSub, fontSize: 13, marginBottom: 14 } }, 'Any context to add? (optional)'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 } },
          contextOptions.map((opt, i) => React.createElement('button', { key: i, onClick: () => setContext(prev => prev.includes(opt.id) ? prev.filter(c => c !== opt.id) : [...prev, opt.id]), style: { background: context.includes(opt.id) ? 'rgba(126,232,162,0.12)' : colors.card, border: `1.5px solid ${context.includes(opt.id) ? colors.primary : colors.cardBorder}`, borderRadius: 20, padding: '8px 14px', cursor: 'pointer', color: context.includes(opt.id) ? colors.primary : colors.textSub, fontSize: 13, fontWeight: 500, transition: 'all 0.2s' } }, opt.label))
        ),
        React.createElement('div', { style: { background: 'rgba(126,232,162,0.06)', borderRadius: 14, padding: 14, border: `1px solid rgba(126,232,162,0.15)`, marginBottom: 20 } },
          React.createElement('p', { style: { color: colors.primary, fontSize: 12, fontWeight: 600, marginBottom: 6 } }, '🧠 SMART PREDICTION'),
          React.createElement('p', { style: { color: colors.text, fontSize: 13, lineHeight: 1.5 } }, 'Based on your 2.4km run at 6 PM today, this meal will score well for recovery. Energy impact: +7pts in 2 hrs.'),
        ),
        React.createElement('button', { onClick: () => setLogged(true), style: { width: '100%', background: colors.primary, color: '#0f0f13', border: 'none', borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' } }, 'Log Meal ✓')
      )
    );
  };

  const InsightsScreen = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = ['all', 'energy', 'sleep', 'recovery'];

    const weekData = [62, 74, 68, 82, 71, 74, 77];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = Math.max(...weekData);

    return React.createElement('div', { className: 'tab-content', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { color: colors.text, fontSize: 22, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 4 } }, 'Patterns'),
        React.createElement('p', { style: { color: colors.textSub, fontSize: 13, marginBottom: 16 } }, 'Your personal energy map — last 7 days'),
      ),

      // Weekly bar chart
      React.createElement('div', { style: { margin: '0 20px 16px', background: colors.card, borderRadius: 20, padding: '18px 16px', border: `1px solid ${colors.cardBorder}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 } },
          React.createElement('p', { style: { color: colors.text, fontSize: 14, fontWeight: 600 } }, 'Weekly Energy'),
          React.createElement('p', { style: { color: colors.primary, fontSize: 13, fontWeight: 600 } }, '↑ 8% vs last week'),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 80, gap: 6 } },
          weekData.map((val, i) => React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
            React.createElement('div', { style: { width: '100%', background: i === 6 ? colors.primary : i === 5 ? colors.primary : colors.surfaceAlt, borderRadius: 6, height: `${(val / maxVal) * 70}px`, minHeight: 8, transition: 'height 0.8s ease', position: 'relative' } },
              i === 6 && React.createElement('div', { style: { position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', background: colors.primary, color: '#0f0f13', fontSize: 10, fontWeight: 700, padding: '2px 4px', borderRadius: 4 } }, val)
            ),
            React.createElement('span', { style: { color: i === 6 ? colors.primary : colors.textSub, fontSize: 10, fontWeight: i === 6 ? 700 : 400 } }, days[i])
          ))
        )
      ),

      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px', marginBottom: 14, overflowX: 'auto' } },
        filters.map(f => React.createElement('button', { key: f, onClick: () => setActiveFilter(f), style: { background: activeFilter === f ? colors.primary : colors.card, color: activeFilter === f ? '#0f0f13' : colors.textSub, border: `1px solid ${activeFilter === f ? colors.primary : colors.cardBorder}`, borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'capitalize', transition: 'all 0.2s' } }, f))
      ),

      // Insight cards
      React.createElement('div', { style: { padding: '0 20px' } },
        insightData.map((insight, i) => React.createElement('div', { key: i, className: 'insight-card', style: { background: colors.card, borderRadius: 18, padding: '16px', marginBottom: 12, border: `1px solid ${colors.cardBorder}`, animationDelay: `${i * 0.1}s` } },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: `${insight.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 } }, insight.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { color: colors.text, fontSize: 14, fontWeight: 700, marginBottom: 6 } }, insight.title),
              React.createElement('p', { style: { color: colors.textSub, fontSize: 13, lineHeight: 1.5, marginBottom: 10 } }, insight.desc),
              React.createElement('button', { style: { background: `${insight.color}18`, border: `1px solid ${insight.color}40`, color: insight.color, borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' } }, `→ ${insight.action}`)
            )
          )
        ))
      ),

      // Energy Map Teaser
      React.createElement('div', { style: { margin: '4px 20px', background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(96,165,250,0.08))', borderRadius: 18, padding: '16px', border: '1px solid rgba(167,139,250,0.2)' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('p', { style: { color: colors.text, fontSize: 14, fontWeight: 700 } }, '🗺️ Energy Map'),
          React.createElement('span', { style: { background: 'rgba(167,139,250,0.2)', color: colors.accentPurple, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 } }, '14-DAY'),
        ),
        React.createElement('p', { style: { color: colors.textSub, fontSize: 12, lineHeight: 1.5, marginBottom: 12 } }, 'Your best energy days come after 7+ hrs sleep + a walk before noon. 4 patterns identified.'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          ['🌿 Oats = Focus', '🏃 Eve runs = ⬇ Sleep', '💧 Hydration gap'].map((tag, i) => React.createElement('span', { key: i, style: { background: colors.surfaceAlt, color: colors.textSub, fontSize: 10, padding: '4px 8px', borderRadius: 8 } }, tag))
        )
      )
    );
  };

  const RecoveryScreen = () => {
    const [activeDay, setActiveDay] = useState(2);
    const dayPlan = [
      { time: '7:00 AM', label: 'Wake + Hydrate', desc: '500ml water, check HRV', icon: '💧', done: true },
      { time: '7:30 AM', label: 'Breakfast', desc: 'Overnight oats logged ✓', icon: '🥣', done: true },
      { time: '10:30 AM', label: 'Movement Break', desc: '10-min walk — your steps are low', icon: '🚶', done: false },
      { time: '12:30 PM', label: 'Recovery Lunch', desc: 'Aim for lean protein + veg', icon: '🥗', done: false },
      { time: '6:00 PM', label: 'Easy Run', desc: 'Keep HR below 148 bpm today', icon: '🏃', done: false },
      { time: '7:30 PM', label: 'Recovery Dinner', desc: 'Light meal before 8 PM for sleep', icon: '🌙', done: false },
    ];

    return React.createElement('div', { className: 'tab-content', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { color: colors.text, fontSize: 22, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 4 } }, 'Recovery Plan'),
        React.createElement('p', { style: { color: colors.textSub, fontSize: 13, marginBottom: 16 } }, 'Today\'s action plan based on your data'),
      ),

      // Readiness card
      React.createElement('div', { style: { margin: '0 20px 16px', background: 'linear-gradient(135deg, #1a2a1f, #1a1f2a)', borderRadius: 20, padding: '20px', border: '1px solid rgba(126,232,162,0.2)' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: colors.textSub, fontSize: 12, fontWeight: 600, letterSpacing: 0.6 } }, 'READINESS SCORE'),
            React.createElement('p', { style: { color: colors.text, fontSize: 32, fontWeight: 800, fontFamily: "'Syne', sans-serif", lineHeight: 1 } }, '78'),
            React.createElement('p', { style: { color: colors.primary, fontSize: 12, fontWeight: 600 } }, 'Good · Moderate Training OK'),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { width: 60, height: 60, borderRadius: 30, background: 'rgba(126,232,162,0.12)', border: '2px solid rgba(126,232,162,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('span', { style: { fontSize: 28 } }, '💪')
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          [{ label: 'HRV', val: '68ms', up: true }, { label: 'Sleep Quality', val: '82%', up: true }, { label: 'Load', val: 'Mod', up: null }].map((m, i) => React.createElement('div', { key: i },
            React.createElement('p', { style: { color: colors.textSub, fontSize: 10, fontWeight: 600 } }, m.label),
            React.createElement('p', { style: { color: m.up === true ? colors.primary : m.up === false ? colors.accentRed : colors.accent, fontSize: 14, fontWeight: 700 } }, m.val),
          ))
        )
      ),

      // Day plan
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 16 } },
        React.createElement('p', { style: { color: colors.text, fontSize: 15, fontWeight: 700, marginBottom: 12 } }, 'Today\'s Schedule'),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('div', { style: { position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: colors.border } }),
          dayPlan.map((item, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 14, marginBottom: 16, position: 'relative' } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: item.done ? colors.primary : colors.card, border: `2px solid ${item.done ? colors.primary : colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, fontSize: 16, flexShrink: 0, transition: 'all 0.3s' } },
              item.done ? '✓' : item.icon
            ),
            React.createElement('div', { style: { flex: 1, background: colors.card, borderRadius: 14, padding: '10px 12px', border: `1px solid ${item.done ? 'rgba(126,232,162,0.2)' : colors.cardBorder}`, opacity: item.done ? 0.7 : 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                React.createElement('p', { style: { color: item.done ? colors.textSub : colors.text, fontSize: 14, fontWeight: 600, textDecoration: item.done ? 'line-through' : 'none' } }, item.label),
                React.createElement('p', { style: { color: colors.textSub, fontSize: 11 } }, item.time),
              ),
              React.createElement('p', { style: { color: colors.textSub, fontSize: 12, marginTop: 2 } }, item.desc),
            )
          ))
        )
      ),

      // Habit streaks
      React.createElement('div', { style: { margin: '0 20px' } },
        React.createElement('p', { style: { color: colors.text, fontSize: 15, fontWeight: 700, marginBottom: 12 } }, 'Habit Streaks'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          [
            { name: 'Post-meal walk', streak: 5, icon: '🚶', color: colors.primary },
            { name: 'Sleep by 10:30', streak: 3, icon: '😴', color: colors.accentPurple },
            { name: 'Protein breakfast', streak: 8, icon: '🥚', color: colors.accent },
            { name: 'Log 3 meals', streak: 12, icon: '📱', color: colors.accentBlue },
          ].map((h, i) => React.createElement('div', { key: i, style: { background: colors.card, borderRadius: 14, padding: '12px', border: `1px solid ${colors.cardBorder}` } },
            React.createElement('span', { style: { fontSize: 22, display: 'block', marginBottom: 6 } }, h.icon),
            React.createElement('p', { style: { color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 2 } }, h.name),
            React.createElement('p', { style: { color: h.color, fontSize: 12, fontWeight: 700 } }, `🔥 ${h.streak} day streak`),
          ))
        )
      )
    );
  };

  const screens = { home: HomeScreen, log: LogScreen, insights: InsightsScreen, recovery: RecoveryScreen };
  const ActiveScreen = screens[activeTab] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
  },
    React.createElement('div', {
      style: { width: 375, height: 812, background: colors.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }
    },
      // Status bar
      React.createElement('div', { style: { height: 50, display: 'flex', alignItems: 'flex-end', paddingBottom: 8, paddingLeft: 28, paddingRight: 22, position: 'relative', zIndex: 10 } },
        React.createElement('span', { style: { color: colors.text, fontSize: 14, fontWeight: 700, flex: 1 } }, currentTime || '9:41'),
        // Dynamic Island
        React.createElement('div', { style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 34, background: '#000', borderRadius: 20, zIndex: 20 } }),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(LucideIcon, { name: 'Wifi', size: 14, color: colors.text }),
          React.createElement(LucideIcon, { name: 'Battery', size: 16, color: colors.text }),
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: transitioning ? 0 : 1, transition: 'opacity 0.15s ease' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom nav
      React.createElement('div', { style: { height: 80, background: colors.surface, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 12, paddingTop: 4, position: 'relative', zIndex: 10 } },
        navItems.map(item => {
          const isActive = activeTab === item.id;
          const isPressed = pressedBtn === item.id;
          return React.createElement('button', {
            key: item.id,
            onClick: () => navigateTo(item.id),
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 14, transform: isPressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s ease' }
          },
            item.id === 'log'
              ? React.createElement('div', { style: { width: 48, height: 48, borderRadius: 24, background: isActive ? colors.primaryDark : colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -24, boxShadow: `0 4px 20px ${colors.primary}60` } },
                React.createElement(LucideIcon, { name: item.icon, size: 24, color: '#0f0f13', strokeWidth: 2.5 })
              )
              : React.createElement(React.Fragment, null,
                React.createElement('div', { style: { position: 'relative' } },
                  React.createElement(LucideIcon, { name: item.icon, size: 22, color: isActive ? colors.primary : colors.textSub }),
                  isActive && React.createElement('div', { style: { position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: 2, background: colors.primary } })
                ),
                React.createElement('span', { style: { color: isActive ? colors.primary : colors.textSub, fontSize: 10, fontWeight: isActive ? 700 : 400, transition: 'color 0.2s' } }, item.label)
              )
          );
        })
      )
    )
  );
}
