function App() {
  const { useState, useEffect, useRef } = React;

  const C = {
    bg: '#0D0F0B', surface: '#161A12', card: '#1C2218', cardAlt: '#222B1D',
    primary: '#E8A020', primaryDim: '#A06B10', secondary: '#5EBF4A',
    urgent: '#E84040', warn: '#F5A623', soon: '#60A5FA', fresh: '#5EBF4A',
    text: '#F2EFE8', textSub: '#9A9E8E', textMuted: '#5A5E50', border: '#262C20',
    overlay: 'rgba(13,15,11,0.92)',
  };

  const [tab, setTab] = useState('fridge');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [time, setTime] = useState('9:41');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [rescueMode, setRescueMode] = useState(false);
  const [selectedRescue, setSelectedRescue] = useState(null);
  const [addingItem, setAddingItem] = useState(false);
  const [cookStep, setCookStep] = useState(0);
  const [cooking, setCooking] = useState(false);

  useEffect(() => {
    const update = () => {
      const n = new Date();
      setTime(n.getHours().toString().padStart(2,'0') + ':' + n.getMinutes().toString().padStart(2,'0'));
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); fn && fn(); }, 150);
  };

  const btn = (id, base) => ({
    ...base, cursor: 'pointer',
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.12s ease, opacity 0.12s ease',
    opacity: pressedBtn === id ? 0.85 : 1,
  });

  const ingredients = [
    { id: 1, em: '🥬', name: 'Wilted Spinach', qty: '½ bag', days: 1, urg: 'urgent', loc: 'Crisper' },
    { id: 2, em: '🍗', name: 'Chicken Breast', qty: '1 piece', days: 1, urg: 'urgent', loc: 'Top shelf' },
    { id: 3, em: '🥛', name: 'Milk', qty: '~¾ cup', days: 1, urg: 'urgent', loc: 'Door' },
    { id: 4, em: '🌮', name: 'Taco Leftovers', qty: 'mixed', days: 2, urg: 'warn', loc: 'Middle shelf' },
    { id: 5, em: '🧀', name: 'Cheddar', qty: '¼ block', days: 2, urg: 'warn', loc: 'Cheese drawer' },
    { id: 6, em: '🍅', name: 'Cherry Tomatoes', qty: '8–10', days: 3, urg: 'warn', loc: 'Middle shelf' },
    { id: 7, em: '🥚', name: 'Eggs', qty: '5 large', days: 6, urg: 'soon', loc: 'Door rack' },
    { id: 8, em: '🧅', name: 'Half Onion', qty: '½ medium', days: 5, urg: 'soon', loc: 'Crisper' },
    { id: 9, em: '🧄', name: 'Garlic', qty: '4 cloves', days: 14, urg: 'fresh', loc: 'Counter' },
    { id: 10, em: '🫙', name: 'Salsa Jar', qty: '~3 tbsp', days: 10, urg: 'fresh', loc: 'Door' },
    { id: 11, em: '🍚', name: 'Cooked Rice', qty: '1 cup', days: 2, urg: 'warn', loc: 'Middle shelf' },
    { id: 12, em: '🧈', name: 'Butter', qty: '½ stick', days: 30, urg: 'fresh', loc: 'Door' },
  ];

  const urgColor = { urgent: C.urgent, warn: C.warn, soon: C.soon, fresh: C.fresh };
  const urgLabel = { urgent: 'Use Today', warn: 'Use Soon', soon: '5–6 Days', fresh: 'Fresh' };

  const meals = [
    {
      id: 'm1', title: 'Skillet Chicken & Spinach Rice', time: '20 min', difficulty: 'Easy',
      urgency: 'USE TODAY', uses: ['Chicken Breast', 'Wilted Spinach', 'Cooked Rice', 'Garlic'],
      calories: 480, tools: ['Skillet'], badge: '🔥 Saves 3 items',
      desc: 'A fast one-pan dinner that rescues your most urgent ingredients.',
      steps: [
        'Season chicken breast with salt, pepper, and garlic powder.',
        'Heat skillet over medium-high. Add ½ tbsp butter, sear chicken 5 min per side until golden.',
        'Remove chicken, rest 3 min. In same pan, add garlic cloves and wilt the spinach (2 min).',
        'Add cooked rice to pan, stir to combine with pan drippings. Season to taste.',
        'Slice chicken over rice. Squeeze any lemon if available. Serve hot.',
      ],
    },
    {
      id: 'm2', title: 'Taco Frittata', time: '15 min', difficulty: 'Easy',
      urgency: 'RESCUE MODE', uses: ['Taco Leftovers', 'Eggs', 'Cheddar', 'Salsa Jar'],
      calories: 390, tools: ['Oven-safe pan', 'Broiler'],
      badge: '♻️ Zero waste',
      desc: 'Turn last night\'s taco toppings into a protein-packed brunch.',
      steps: [
        'Preheat broiler. Whisk 5 eggs with salt and a splash of milk.',
        'Heat oven-safe pan over medium. Add leftover taco fillings, warm through 2 min.',
        'Pour egg mixture over fillings. Cook undisturbed 4 min until edges set.',
        'Top with shredded cheddar. Transfer to broiler 2–3 min until puffed and golden.',
        'Let cool 1 min. Slice and serve with salsa.',
      ],
    },
    {
      id: 'm3', title: 'Tomato & Egg Scramble', time: '10 min', difficulty: 'Easy',
      urgency: 'QUICK WIN', uses: ['Eggs', 'Cherry Tomatoes', 'Half Onion', 'Cheddar'],
      calories: 310, tools: ['Pan'],
      badge: '⚡ Under 10 min',
      desc: 'A simple, satisfying scramble with ingredients you need to use up.',
      steps: [
        'Dice half onion. Halve cherry tomatoes.',
        'Melt butter in pan over medium heat. Sauté onion 3 min until soft.',
        'Add tomatoes, cook 2 min until they soften and release juice.',
        'Whisk 3 eggs, pour over veggies. Gently scramble to your preferred doneness.',
        'Top with cheddar, remove from heat, let melt. Serve immediately.',
      ],
    },
  ];

  const rescueItems = [
    {
      id: 'r1', from: 'Taco Leftovers', into: 'Breakfast Burrito Bowl',
      icon: '🌯', saves: 'Taco mix + Rice + Eggs',
      tip: 'Reheat taco mix over rice, top with fried egg and salsa. Done in 8 min.',
      urgTag: 'Use Today',
    },
    {
      id: 'r2', from: 'Cooked Rice + Spinach', into: 'Green Rice Patties',
      icon: '🍘', saves: 'Rice + Spinach + Eggs',
      tip: 'Mash rice + chopped spinach + egg into patties, pan-fry until crispy. Great snack.',
      urgTag: 'Use Today',
    },
    {
      id: 'r3', from: 'Milk (expiring)', into: 'Quick Béchamel Sauce',
      icon: '🫙', saves: 'Milk + Butter + any pasta',
      tip: 'Whisk butter + flour + warm milk for a creamy sauce. Freeze excess.',
      urgTag: 'Before Midnight',
    },
  ];

  const equipment = ['Skillet', 'Air Fryer', 'Microwave', 'Oven'];
  const dietTags = ['No Restrictions', 'Low Carb', 'Dairy-Free'];
  const flavorProfile = [
    { label: 'Savory', val: 88 },
    { label: 'Spicy', val: 52 },
    { label: 'Umami', val: 74 },
    { label: 'Fresh', val: 63 },
  ];

  // ── SCREENS ──────────────────────────────────────────────────────────────

  const FridgeScreen = () => {
    const urgent = ingredients.filter(i => i.urg === 'urgent');
    const warn = ingredients.filter(i => i.urg === 'warn');
    const rest = ingredients.filter(i => i.urg === 'soon' || i.urg === 'fresh');

    const Section = ({ title, color, items: its }) => (
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: color, textTransform: 'uppercase' }}>{title}</span>
          <span style={{ fontSize: 11, color: C.textMuted, marginLeft: 'auto' }}>{its.length} items</span>
        </div>
        {its.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', background: C.card, borderRadius: 12, padding: '10px 14px', marginBottom: 8, border: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 22, marginRight: 12 }}>{item.em}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{item.qty} · {item.loc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color, background: color + '22', borderRadius: 6, padding: '3px 8px', marginBottom: 2 }}>
                {item.days === 1 ? 'Today' : `${item.days}d`}
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <div style={{ padding: '0 16px', overflowY: 'auto', height: '100%', paddingBottom: 90 }}>
        {/* Header stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
          {[
            { label: 'Items', val: ingredients.length, color: C.text },
            { label: 'Use Today', val: urgent.length, color: C.urgent },
            { label: 'Expiring', val: warn.length + urgent.length, color: C.warn },
          ].map(s => (
            <div key={s.label} style={{ background: C.card, borderRadius: 12, padding: '12px 10px', textAlign: 'center', border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scan button */}
        <div onClick={() => press('scan', null)} style={btn('scan', {
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDim})`,
          borderRadius: 14, padding: '14px 20px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 12,
        })}>
          {React.createElement(window.lucide.Camera, { size: 20, color: '#fff' })}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Scan Fridge</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Photo-based inventory update</div>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 16, color: 'rgba(255,255,255,0.6)', style: { marginLeft: 'auto' } })}
        </div>

        <Section title="Use Today" color={C.urgent} items={urgent} />
        <Section title="Use Soon (2–3 days)" color={C.warn} items={warn} />
        <Section title="Still Good" color={C.soon} items={rest} />
      </div>
    );
  };

  const CookScreen = () => {
    if (cooking && selectedMeal) {
      const meal = meals.find(m => m.id === selectedMeal);
      const done = cookStep >= meal.steps.length;
      return (
        <div style={{ padding: '0 16px', overflowY: 'auto', height: '100%', paddingBottom: 90 }}>
          <div onClick={() => { setCooking(false); setCookStep(0); }} style={{ ...btn('back', { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, color: C.textSub, fontSize: 13 }) }}>
            {React.createElement(window.lucide.ArrowLeft, { size: 16 })} Back to meals
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{meal.title}</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 24 }}>{meal.time} · {meal.tools.join(', ')}</div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
            {meal.steps.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i < cookStep ? C.primary : i === cookStep ? C.primary + '66' : C.border, transition: 'background 0.3s' }} />
            ))}
          </div>

          {done ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>Meal Complete!</div>
              <div style={{ fontSize: 13, color: C.textSub, marginBottom: 32 }}>3 ingredients rescued from waste</div>
              <div onClick={() => { setCooking(false); setCookStep(0); setSelectedMeal(null); }} style={btn('done', { background: C.primary, borderRadius: 14, padding: '14px 32px', fontSize: 14, fontWeight: 700, color: '#0D0F0B', display: 'inline-block' })}>
                Done Cooking
              </div>
            </div>
          ) : (
            <div>
              <div style={{ background: C.card, borderRadius: 16, padding: 20, marginBottom: 20, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: 1, marginBottom: 12 }}>STEP {cookStep + 1} OF {meal.steps.length}</div>
                <div style={{ fontSize: 15, color: C.text, lineHeight: 1.6 }}>{meal.steps[cookStep]}</div>
              </div>
              <div onClick={() => press('nextstep', () => setCookStep(s => s + 1))} style={btn('nextstep', { background: C.primary, borderRadius: 14, padding: '16px', textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#0D0F0B' })}>
                {cookStep < meal.steps.length - 1 ? 'Next Step →' : 'Finish Cooking ✓'}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div style={{ padding: '0 16px', overflowY: 'auto', height: '100%', paddingBottom: 90 }}>
        <div style={{ background: `linear-gradient(135deg, ${C.urgent}22, ${C.warn}11)`, border: `1px solid ${C.urgent}44`, borderRadius: 14, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          {React.createElement(window.lucide.AlertTriangle, { size: 16, color: C.urgent })}
          <span style={{ fontSize: 12, color: C.urgent, fontWeight: 600 }}>3 items expire today — meals below prioritize them</span>
        </div>

        {meals.map(meal => (
          <div key={meal.id} style={{ background: C.card, borderRadius: 16, marginBottom: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 16px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1, paddingRight: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: 1, marginBottom: 4 }}>{meal.urgency}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{meal.title}</div>
                </div>
                <div style={{ background: C.secondary + '22', borderRadius: 10, padding: '6px 10px', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary }}>{meal.time}</div>
                  <div style={{ fontSize: 9, color: C.textMuted }}>cook</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5, marginBottom: 12 }}>{meal.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {meal.uses.map(u => (
                  <span key={u} style={{ fontSize: 10, color: C.textSub, background: C.cardAlt, borderRadius: 6, padding: '3px 8px', border: `1px solid ${C.border}` }}>{u}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: C.secondary, fontWeight: 600 }}>{meal.badge}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div onClick={() => press('view' + meal.id, () => { setSelectedMeal(meal.id); setTab('cook'); })} style={btn('view' + meal.id, { background: C.cardAlt, borderRadius: 10, padding: '8px 14px', fontSize: 12, color: C.textSub, border: `1px solid ${C.border}` })}>
                    Details
                  </div>
                  <div onClick={() => press('cook' + meal.id, () => { setSelectedMeal(meal.id); setCooking(true); setCookStep(0); })} style={btn('cook' + meal.id, { background: C.primary, borderRadius: 10, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#0D0F0B' })}>
                    Cook Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const RescueScreen = () => {
    if (selectedRescue) {
      const r = rescueItems.find(x => x.id === selectedRescue);
      return (
        <div style={{ padding: '0 16px', overflowY: 'auto', height: '100%', paddingBottom: 90 }}>
          <div onClick={() => setSelectedRescue(null)} style={{ ...btn('rback', { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, color: C.textSub, fontSize: 13 }) }}>
            {React.createElement(window.lucide.ArrowLeft, { size: 16 })} Rescue Mode
          </div>
          <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>{r.icon}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, textAlign: 'center', marginBottom: 6 }}>{r.into}</div>
          <div style={{ fontSize: 12, color: C.primary, textAlign: 'center', fontWeight: 600, marginBottom: 24 }}>Made from: {r.saves}</div>
          <div style={{ background: C.card, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1, marginBottom: 12 }}>RESCUE INSTRUCTIONS</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{r.tip}</div>
          </div>
          <div style={{ background: `${C.urgent}15`, borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.urgent}33`, display: 'flex', gap: 10, alignItems: 'center' }}>
            {React.createElement(window.lucide.Clock, { size: 16, color: C.urgent })}
            <span style={{ fontSize: 12, color: C.urgent, fontWeight: 600 }}>{r.urgTag} — act before it's too late</span>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '0 16px', overflowY: 'auto', height: '100%', paddingBottom: 90 }}>
        <div style={{ background: `linear-gradient(135deg, ${C.secondary}20, transparent)`, borderRadius: 16, padding: '16px', marginBottom: 24, border: `1px solid ${C.secondary}33` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.secondary, marginBottom: 4 }}>♻️ Rescue Mode Active</div>
          <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>Found 3 creative ways to transform your leftovers into completely different meals — zero grocery run required.</div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>Rescue Transformations</div>

        {rescueItems.map(r => (
          <div key={r.id} onClick={() => press('r' + r.id, () => setSelectedRescue(r.id))} style={btn('r' + r.id, { background: C.card, borderRadius: 16, padding: '16px', marginBottom: 12, border: `1px solid ${C.border}`, display: 'flex', gap: 14, alignItems: 'center' })}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>{r.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>{r.from} →</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{r.into}</div>
              <div style={{ fontSize: 10, color: C.urgent, fontWeight: 600 }}>{r.urgTag}</div>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 16, color: C.textMuted })}
          </div>
        ))}

        <div style={{ marginTop: 24, background: C.card, borderRadius: 16, padding: '16px', border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>Weekly Waste Saved</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
              <div key={d} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: [20,35,15,40,55,30,45][i], background: i < 5 ? C.secondary : C.border, borderRadius: 4, marginBottom: 4, transition: 'height 0.3s' }} />
                <div style={{ fontSize: 8, color: C.textMuted }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.textSub }}>Saved ~<span style={{ color: C.secondary, fontWeight: 700 }}>$14.20</span> in food waste this week</div>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    const [activeEquip, setActiveEquip] = useState(['Skillet', 'Microwave', 'Air Fryer']);
    const [activeDiet, setActiveDiet] = useState('No Restrictions');

    return (
      <div style={{ padding: '0 16px', overflowY: 'auto', height: '100%', paddingBottom: 90 }}>
        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.card, borderRadius: 16, padding: '16px', marginBottom: 20, border: `1px solid ${C.border}` }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Alex's Kitchen</div>
            <div style={{ fontSize: 12, color: C.textSub }}>2-person household · 6 months streak</div>
          </div>
          {React.createElement(window.lucide.Settings, { size: 18, color: C.textMuted, style: { marginLeft: 'auto' } })}
        </div>

        {/* Flavor Profile */}
        <div style={{ background: C.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Flavor Profile Learned</div>
          {flavorProfile.map(f => (
            <div key={f.label} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: C.textSub }}>{f.label}</span>
                <span style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}>{f.val}%</span>
              </div>
              <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: 'hidden' }}>
                <div style={{ width: f.val + '%', height: '100%', background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`, borderRadius: 4, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Equipment */}
        <div style={{ background: C.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Available Equipment</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {equipment.map(eq => {
              const on = activeEquip.includes(eq);
              return (
                <div key={eq} onClick={() => setActiveEquip(prev => on ? prev.filter(e => e !== eq) : [...prev, eq])} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: on ? C.primary + '22' : C.cardAlt, color: on ? C.primary : C.textMuted, border: `1px solid ${on ? C.primary + '55' : C.border}`, transition: 'all 0.2s' }}>
                  {eq}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dietary */}
        <div style={{ background: C.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Dietary Preference</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {dietTags.map(d => (
              <div key={d} onClick={() => setActiveDiet(d)} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: activeDiet === d ? C.secondary + '22' : C.cardAlt, color: activeDiet === d ? C.secondary : C.textMuted, border: `1px solid ${activeDiet === d ? C.secondary + '55' : C.border}`, transition: 'all 0.2s' }}>
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Meals Cooked', val: '47', icon: '🍳' },
            { label: 'Items Rescued', val: '128', icon: '♻️' },
            { label: 'Waste Saved', val: '$89', icon: '💰' },
            { label: 'Streak', val: '6 mo', icon: '🔥' },
          ].map(s => (
            <div key={s.label} style={{ background: C.card, borderRadius: 14, padding: '14px', border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{s.val}</div>
              <div style={{ fontSize: 10, color: C.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'fridge', label: 'Fridge', icon: window.lucide.Package },
    { id: 'cook', label: 'Cook', icon: window.lucide.ChefHat },
    { id: 'rescue', label: 'Rescue', icon: window.lucide.Recycle },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screenTitle = { fridge: 'My Fridge', cook: "Tonight's Meals", rescue: 'Rescue Mode', profile: 'Kitchen Profile' };
  const screenSub = { fridge: '12 items · 3 expiring today', cook: 'Built from your fridge state', rescue: 'Transform leftovers', profile: 'Preferences & stats' };

  return (
    <div style={{ minHeight: '100vh', background: '#060806', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif" }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: C.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 50 }} />

        {/* Status bar */}
        <div style={{ height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 8px', flexShrink: 0, zIndex: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{time}</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: C.text })}
            {React.createElement(window.lucide.Signal, { size: 14, color: C.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: C.text })}
          </div>
        </div>

        {/* App header */}
        <div style={{ padding: '8px 20px 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{screenTitle[tab]}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{screenSub[tab]}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {tab === 'fridge' && (
                <div onClick={() => press('addItem', null)} style={btn('addItem', { width: 36, height: 36, background: C.card, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}` })}>
                  {React.createElement(window.lucide.Plus, { size: 18, color: C.primary })}
                </div>
              )}
              <div style={{ width: 36, height: 36, background: C.card, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}` }}>
                {React.createElement(window.lucide.Bell, { size: 18, color: C.textSub })}
              </div>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {tab === 'fridge' && <FridgeScreen />}
          {tab === 'cook' && <CookScreen />}
          {tab === 'rescue' && <RescueScreen />}
          {tab === 'profile' && <ProfileScreen />}
        </div>

        {/* Bottom nav */}
        <div style={{ height: 82, background: C.surface, borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px 16px', flexShrink: 0, zIndex: 10 }}>
          {tabs.map(t => {
            const active = tab === t.id;
            return (
              <div key={t.id} onClick={() => press('tab_' + t.id, () => { setTab(t.id); setCooking(false); setCookStep(0); setSelectedMeal(null); setSelectedRescue(null); })} style={btn('tab_' + t.id, { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 4px', borderRadius: 12 })}>
                <div style={{ position: 'relative' }}>
                  {React.createElement(t.icon, { size: 22, color: active ? C.primary : C.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
                  {t.id === 'fridge' && (
                    <div style={{ position: 'absolute', top: -3, right: -5, width: 10, height: 10, background: C.urgent, borderRadius: '50%', border: `2px solid ${C.surface}` }} />
                  )}
                </div>
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? C.primary : C.textMuted, transition: 'color 0.2s' }}>{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
