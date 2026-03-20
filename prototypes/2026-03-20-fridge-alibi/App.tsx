function App() {
  const { useState, useEffect } = React;

  const C = {
    bg: '#09111A', surface: '#0F1D2A', card: '#142030', cardAlt: '#192840',
    primary: '#4ADE80', urgent: '#FF5C35', warning: '#F59E0B',
    fresh: '#34D399', blue: '#60A5FA', purple: '#A78BFA',
    text: '#F0F4F8', textSub: '#8FA4BC', textMuted: '#4A6278', border: '#1A2E42',
  };

  const [activeTab, setActiveTab] = useState('fridge');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const update = () => {
      const n = new Date();
      setTime(n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0'));
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    fn && fn();
  };

  const btnS = (id, base) => ({
    ...base, cursor: 'pointer',
    transform: pressedBtn === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'transform 0.15s ease',
  });

  const items = [
    { id: 1, em: '🥬', name: 'Baby Spinach', qty: '½ bag', days: 1, urg: 'critical', loc: 'Crisper' },
    { id: 2, em: '🥑', name: 'Avocado', qty: '1 ripe', days: 1, urg: 'critical', loc: 'Counter' },
    { id: 3, em: '🥛', name: 'Milk', qty: '~1 cup left', days: 1, urg: 'critical', loc: 'Door shelf' },
    { id: 4, em: '🍗', name: 'Rotisserie Chicken', qty: '~200g left', days: 2, urg: 'critical', loc: 'Top shelf' },
    { id: 5, em: '🍋', name: 'Lemon', qty: '1 whole', days: 2, urg: 'critical', loc: 'Door' },
    { id: 6, em: '🧊', name: 'Greek Yogurt', qty: '¾ cup', days: 3, urg: 'warn', loc: 'Middle shelf' },
    { id: 7, em: '🍅', name: 'Cherry Tomatoes', qty: '10–12', days: 3, urg: 'warn', loc: 'Middle shelf' },
    { id: 8, em: '🥦', name: 'Broccoli', qty: '1 head', days: 4, urg: 'warn', loc: 'Crisper' },
    { id: 9, em: '🫙', name: 'Sour Cream', qty: '3 tbsp', days: 5, urg: 'warn', loc: 'Door' },
    { id: 10, em: '🥚', name: 'Eggs', qty: '4 large', days: 7, urg: 'soon', loc: 'Door rack' },
    { id: 11, em: '🧀', name: 'Cheddar', qty: '¼ block', days: 9, urg: 'soon', loc: 'Cheese drawer' },
    { id: 12, em: '🍎', name: 'Apples', qty: '3 medium', days: 14, urg: 'fresh', loc: 'Crisper' },
  ];

  const urgCfg = {
    critical: { c: '#FF5C35', lbl: 'Today', bg: 'rgba(255,92,53,0.12)', bd: 'rgba(255,92,53,0.28)' },
    warn:     { c: '#F59E0B', lbl: 'Soon',  bg: 'rgba(245,158,11,0.12)', bd: 'rgba(245,158,11,0.28)' },
    soon:     { c: '#60A5FA', lbl: 'Week',  bg: 'rgba(96,165,250,0.12)', bd: 'rgba(96,165,250,0.28)' },
    fresh:    { c: '#34D399', lbl: 'Fresh', bg: 'rgba(52,211,153,0.12)', bd: 'rgba(52,211,153,0.28)' },
  };

  const meals = [
    {
      id: 1, match: 96, name: 'Spinach & Chicken Lemon Bowl',
      time: '20 min', servings: 2, kcal: 420, saved: 3,
      urgent: ['Baby Spinach', 'Rotisserie Chicken', 'Lemon'],
      patch: ['Olive oil (pantry)', 'Parmesan (pantry)', 'Garlic (pantry)'],
      tags: ['High Protein', 'No Cook', 'Quick'],
      steps: [
        'Shred the leftover chicken into bite-sized pieces.',
        'Squeeze lemon juice over spinach, drizzle olive oil, salt & pepper — toss well.',
        'Layer the shredded chicken on top of the dressed spinach.',
        'Finish with grated parmesan and a crack of black pepper. Serve immediately!',
      ],
    },
    {
      id: 2, match: 89, name: 'Avocado Egg Toast',
      time: '10 min', servings: 1, kcal: 310, saved: 2,
      urgent: ['Avocado', 'Milk', 'Lemon'],
      patch: ['Sourdough bread (pantry)', 'Red pepper flakes (pantry)', 'Sea salt (pantry)'],
      tags: ['Breakfast', 'Kid-Friendly', 'Quick'],
      steps: [
        'Toast sourdough until golden and crispy.',
        'Mash avocado with a squeeze of lemon, salt, and black pepper.',
        'Scramble eggs with a splash of milk until soft and just set.',
        'Layer avocado on toast, top with eggs, sprinkle red pepper flakes.',
      ],
    },
    {
      id: 3, match: 83, name: 'Chicken Broccoli Stir Fry',
      time: '25 min', servings: 3, kcal: 520, saved: 4,
      urgent: ['Rotisserie Chicken', 'Broccoli', 'Cherry Tomatoes'],
      patch: ['Soy sauce (pantry)', 'Garlic (pantry)', 'Rice (pantry)'],
      tags: ['Family Meal', 'High Protein', 'Filling'],
      steps: [
        'Cook rice per package directions (~12 min).',
        'Stir-fry broccoli in hot oil over high heat ~4 min until bright green.',
        'Add shredded chicken, halved tomatoes, minced garlic, and soy sauce.',
        'Toss everything for 3–4 more minutes. Serve hot over rice.',
      ],
    },
    {
      id: 4, match: 76, name: 'Greek Yogurt Spinach Smoothie',
      time: '5 min', servings: 1, kcal: 220, saved: 2,
      urgent: ['Baby Spinach', 'Greek Yogurt', 'Milk'],
      patch: ['Frozen banana (freezer)', 'Honey (pantry)', 'Ice cubes'],
      tags: ['Breakfast', 'No Cook', 'Healthy'],
      steps: [
        'Add spinach, yogurt, and milk to a blender.',
        'Toss in a frozen banana for creaminess and natural sweetness.',
        'Drizzle in honey. Add a handful of ice cubes.',
        'Blend on high ~60 seconds until completely smooth. Drink right away!',
      ],
    },
  ];

  const getEm = (name) => {
    const m = items.find(i => i.name.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
    return m ? m.em : '🥘';
  };

  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 0', height: 44, flexShrink: 0 }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 2C9.7 2 11.7 2.9 13.1 4.3L14.5 2.8C12.7 1 10.2 0 7.5 0S2.3 1 0.5 2.8L1.9 4.3C3.3 2.9 5.3 2 7.5 2Z" fill={C.text}/>
          <path d="M7.5 5.5C8.9 5.5 10.1 6.1 11 7L12.4 5.5C11.1 4.2 9.4 3.5 7.5 3.5S3.9 4.2 2.6 5.5L4 7C4.9 6.1 6.1 5.5 7.5 5.5Z" fill={C.text}/>
          <circle cx="7.5" cy="9.5" r="1.5" fill={C.text}/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 23, height: 11, border: `1.5px solid ${C.text}`, borderRadius: 3, padding: 1.5, display: 'flex' }}>
            <div style={{ width: '75%', height: '100%', background: C.text, borderRadius: 1 }}/>
          </div>
          <div style={{ width: 2, height: 5, background: `${C.text}88`, marginLeft: 1, borderRadius: '0 1px 1px 0' }}/>
        </div>
      </div>
    </div>
  );

  const DI = () => (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, flexShrink: 0 }}>
      <div style={{ width: 126, height: 36, background: '#000', borderRadius: 20 }}/>
    </div>
  );

  // ── FRIDGE SCREEN ──────────────────────────────────────────────────────────
  const FridgeScreen = () => {
    const critical = items.filter(i => i.urg === 'critical');
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '14px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 }}>Friday · March 20</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.6px' }}>Your Fridge</div>
          </div>
          <button style={btnS('bell', { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 })} onClick={() => press('bell')}>
            {React.createElement(window.lucide.Bell, { size: 17, color: C.textSub })}
          </button>
        </div>

        <div style={{ margin: '0 16px 14px', background: 'rgba(255,92,53,0.1)', border: '1px solid rgba(255,92,53,0.3)', borderRadius: 14, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 9 }}>
          {React.createElement(window.lucide.AlertTriangle, { size: 16, color: C.urgent })}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.urgent }}>5 items expire today or tomorrow</div>
            <div style={{ fontSize: 11, color: C.textSub, marginTop: 1.5 }}>Cook a meal now — save ~$18 in waste</div>
          </div>
          <button style={{ fontSize: 11, fontWeight: 600, color: C.urgent, background: 'rgba(255,92,53,0.2)', padding: '4px 10px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            onClick={() => { setSelectedMeal(null); setActiveTab('cook'); }}>
            Cook
          </button>
        </div>

        <div style={{ padding: '0 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>Use First 🔥</div>
            <div style={{ fontSize: 11, color: C.urgent, fontWeight: 600 }}>{critical.length} urgent</div>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {critical.map(item => (
              <div key={item.id} style={{ minWidth: 95, background: urgCfg.critical.bg, border: `1px solid ${urgCfg.critical.bd}`, borderRadius: 14, padding: '12px 9px', flexShrink: 0 }}>
                <div style={{ fontSize: 28, marginBottom: 5 }}>{item.em}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 2, lineHeight: 1.2 }}>{item.name}</div>
                <div style={{ fontSize: 10.5, color: C.textSub, marginBottom: 7 }}>{item.qty}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(255,92,53,0.2)', borderRadius: 6, padding: '2.5px 6px' }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.urgent }}/>
                  <span style={{ fontSize: 10, color: C.urgent, fontWeight: 700 }}>{item.days === 1 ? 'Today!' : `${item.days}d left`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 16px' }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 8 }}>All Ingredients</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[...items].sort((a, b) => a.days - b.days).map(item => {
              const uc = urgCfg[item.urg];
              return (
                <div key={item.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{item.em}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: C.textSub, marginTop: 1 }}>{item.qty} · {item.loc}</div>
                  </div>
                  <div style={{ background: uc.bg, border: `1px solid ${uc.bd}`, borderRadius: 8, padding: '2.5px 8px', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: uc.c }}/>
                    <span style={{ fontSize: 10, color: uc.c, fontWeight: 700 }}>{item.days === 1 ? 'Today' : `${item.days}d`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ── COOK SCREEN ────────────────────────────────────────────────────────────
  const CookScreen = () => {
    if (selectedMeal) {
      const m = selectedMeal;
      return (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
          <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setSelectedMeal(null)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 20, color: C.text })}
            </button>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.text, flex: 1 }}>Recipe</span>
            <div style={{ background: m.match >= 90 ? 'rgba(74,222,128,0.15)' : 'rgba(96,165,250,0.15)', borderRadius: 8, padding: '3px 10px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: m.match >= 90 ? C.primary : C.blue }}>{m.match}% match</span>
            </div>
          </div>

          <div style={{ margin: '0 16px 14px', background: C.card, borderRadius: 16, padding: '18px 16px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 10, letterSpacing: '-0.3px', lineHeight: 1.25 }}>{m.name}</div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
              {[[window.lucide.Clock, m.time], [window.lucide.Users, `${m.servings} servings`], [window.lucide.Flame, `${m.kcal} kcal`]].map(([Icon, val], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: C.textSub }}>
                  {React.createElement(Icon, { size: 12, color: C.textMuted })} {val}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {m.tags.map(t => (
                <span key={t} style={{ background: 'rgba(74,222,128,0.12)', color: C.primary, fontSize: 10, fontWeight: 600, padding: '2.5px 8px', borderRadius: 6 }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ margin: '0 16px 14px' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 8 }}>Using from your fridge 🔥</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {m.urgent.map(name => (
                <div key={name} style={{ background: 'rgba(255,92,53,0.08)', border: '1px solid rgba(255,92,53,0.22)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ fontSize: 18 }}>{getEm(name)}</span>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: C.text }}>{name}</div>
                  <span style={{ fontSize: 10, color: C.urgent, fontWeight: 700, background: 'rgba(255,92,53,0.15)', padding: '2px 6px', borderRadius: 5 }}>Expiring</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ margin: '0 16px 14px' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 8 }}>Also grab from pantry</div>
            <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
              {m.patch.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < m.patch.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  {React.createElement(window.lucide.Package, { size: 13, color: C.textMuted })}
                  <span style={{ fontSize: 12.5, color: C.textSub }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ margin: '0 16px 16px' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 10 }}>Steps</div>
            {m.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 11, marginBottom: 13 }}>
                <div style={{ width: 24, height: 24, borderRadius: 8, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#000' }}>{i + 1}</span>
                </div>
                <div style={{ fontSize: 12.5, color: C.textSub, lineHeight: 1.65, paddingTop: 2 }}>{step}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 16px' }}>
            <button style={btnS('start-cook', { width: '100%', padding: '14px', background: C.primary, border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, color: '#000' })} onClick={() => press('start-cook')}>
              Start Cooking
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '14px 20px 10px' }}>
          <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 }}>Today's battle plan</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.6px' }}>Cook Something</div>
        </div>

        <div style={{ margin: '0 16px 14px', background: 'linear-gradient(135deg, rgba(74,222,128,0.13) 0%, rgba(52,211,153,0.07) 100%)', border: '1px solid rgba(74,222,128,0.22)', borderRadius: 16, padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {React.createElement(window.lucide.Leaf, { size: 20, color: C.primary })}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 3 }}>Cook all 4 meals → $30 saved</div>
            <div style={{ fontSize: 11.5, color: C.textSub }}>Uses 9 expiring items · Zero food waste today</div>
          </div>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {meals.map((m) => (
            <div key={m.id} onClick={() => setSelectedMeal(m)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '14px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text, flex: 1, paddingRight: 8, lineHeight: 1.3 }}>{m.name}</div>
                <div style={{ background: m.match >= 90 ? 'rgba(74,222,128,0.14)' : m.match >= 80 ? 'rgba(96,165,250,0.14)' : 'rgba(167,139,250,0.14)', borderRadius: 8, padding: '3px 8px', flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: m.match >= 90 ? C.primary : m.match >= 80 ? C.blue : C.purple }}>{m.match}%</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 9 }}>
                {[[window.lucide.Clock, m.time], [window.lucide.Flame, `${m.kcal} kcal`], [window.lucide.Leaf, `${m.saved} items`]].map(([Icon, val], i) => (
                  <span key={i} style={{ fontSize: 11.5, color: C.textSub, display: 'flex', alignItems: 'center', gap: 3.5 }}>
                    {React.createElement(Icon, { size: 11, color: C.textMuted })} {val}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
                {m.urgent.map(name => (
                  <span key={name} style={{ background: 'rgba(255,92,53,0.1)', border: '1px solid rgba(255,92,53,0.22)', borderRadius: 6, padding: '2px 7px', fontSize: 10.5, color: C.urgent, display: 'flex', alignItems: 'center', gap: 3 }}>
                    {getEm(name)} {name.split(' ')[0]}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {m.tags.map(t => (
                  <span key={t} style={{ fontSize: 10, color: C.textMuted, background: C.surface, borderRadius: 5, padding: '2.5px 6px' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── SCAN SCREEN ────────────────────────────────────────────────────────────
  const ScanScreen = () => {
    const [tab, setTab] = useState('camera');
    const [scanning, setScanning] = useState(false);
    const [scanDone, setScanDone] = useState(false);

    const handleScan = () => {
      if (scanDone) { setScanDone(false); return; }
      if (scanning) { setScanning(false); return; }
      setScanning(true);
      setTimeout(() => { setScanning(false); setScanDone(true); }, 2200);
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '14px 20px 10px' }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.6px' }}>Add Ingredients</div>
        </div>

        <div style={{ margin: '0 16px 14px', background: C.card, borderRadius: 12, padding: 4, display: 'flex', border: `1px solid ${C.border}` }}>
          {[['camera', 'Camera'], ['receipt', 'Receipt'], ['manual', 'Manual']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '8px 0', borderRadius: 9, border: 'none', background: tab === id ? C.surface : 'transparent', color: tab === id ? C.text : C.textMuted, fontSize: 12, fontWeight: tab === id ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s', boxShadow: tab === id ? '0 1px 4px rgba(0,0,0,0.3)' : 'none' }}>{label}</button>
          ))}
        </div>

        <div style={{ padding: '0 16px' }}>
          {tab === 'camera' && (
            <div>
              <div style={{ background: '#000', borderRadius: 20, height: 200, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
                {scanning && (
                  <>
                    <div style={{ position: 'absolute', left: '8%', right: '8%', height: 2, background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`, top: '48%', boxShadow: `0 0 10px ${C.primary}` }}/>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ border: `1.5px solid ${C.primary}55`, borderRadius: 14, width: 210, height: 140 }}/>
                    </div>
                    <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: C.primary, fontWeight: 500 }}>Scanning fridge...</div>
                  </>
                )}
                {scanDone && (
                  <div style={{ textAlign: 'center' }}>
                    {React.createElement(window.lucide.CheckCircle, { size: 38, color: C.primary })}
                    <div style={{ fontSize: 13, color: C.primary, marginTop: 8, fontWeight: 600 }}>3 items detected!</div>
                  </div>
                )}
                {!scanning && !scanDone && (
                  <div style={{ textAlign: 'center' }}>
                    {React.createElement(window.lucide.Camera, { size: 38, color: C.textMuted })}
                    <div style={{ fontSize: 12.5, color: C.textMuted, marginTop: 8 }}>Point at your fridge or produce</div>
                  </div>
                )}
              </div>

              <button onClick={handleScan} style={btnS('scan-btn', { width: '100%', padding: '13px', background: scanDone ? C.primary : scanning ? C.urgent : C.primary, border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 700, color: '#000', marginBottom: 12 })}>
                {scanDone ? '✓  Add 3 Items to Fridge' : scanning ? 'Scanning...' : 'Scan Now'}
              </button>

              {scanDone && (
                <div style={{ background: C.card, borderRadius: 14, padding: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 8 }}>Detected items</div>
                  {[{ em: '🥦', name: 'Broccoli florets', conf: 94, est: '4–5 days' }, { em: '🍅', name: 'Cherry tomatoes', conf: 91, est: '3–4 days' }, { em: '🥕', name: 'Baby carrots', conf: 87, est: '7–10 days' }].map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontSize: 19 }}>{d.em}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 500, color: C.text }}>{d.name}</div>
                        <div style={{ fontSize: 10.5, color: C.textSub }}>Est. {d.est}</div>
                      </div>
                      <span style={{ fontSize: 11, color: C.primary, fontWeight: 700 }}>{d.conf}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'receipt' && (
            <div>
              <div style={{ background: C.card, borderRadius: 16, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${C.border}`, marginBottom: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  {React.createElement(window.lucide.Receipt, { size: 34, color: C.textMuted })}
                  <div style={{ fontSize: 12.5, color: C.textMuted, marginTop: 8 }}>Snap your grocery receipt</div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>Auto-extracts items + estimates expiry</div>
                </div>
              </div>
              <button style={{ width: '100%', padding: '13px', background: C.primary, border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 700, color: '#000', cursor: 'pointer', marginBottom: 14 }}>
                Take Receipt Photo
              </button>
              <div style={{ background: C.card, borderRadius: 12, padding: 12, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSub, marginBottom: 5 }}>Recent receipt scan</div>
                <div style={{ fontSize: 12.5, color: C.text, fontWeight: 600, marginBottom: 8 }}>Whole Foods · Mar 18</div>
                {['🥬 Spinach bag', '🍋 Lemons ×3', '🥑 Avocados ×2', '🧀 Cheddar block', '🥛 2% Milk'].map((item, i, arr) => (
                  <div key={i} style={{ fontSize: 12, color: C.textSub, padding: '6px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>{item}</div>
                ))}
              </div>
            </div>
          )}

          {tab === 'manual' && (
            <div>
              <div style={{ background: C.card, borderRadius: 14, padding: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Add an item</div>
                {[{ label: 'Food name', ph: 'e.g. Baby spinach' }, { label: 'How much?', ph: 'e.g. ½ bag, 200g, 3 pieces' }, { label: 'Days until expiry', ph: 'e.g. 3' }].map((f, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: C.textSub, marginBottom: 4, fontWeight: 500 }}>{f.label}</div>
                    <div style={{ background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, padding: '10px 12px', color: C.textMuted, fontSize: 12.5 }}>{f.ph}</div>
                  </div>
                ))}
                <button style={{ width: '100%', padding: '11px', background: C.primary, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#000', cursor: 'pointer', marginTop: 2 }}>
                  + Add to Fridge
                </button>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.textSub, marginBottom: 9 }}>Quick add</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {['🥛 Milk', '🍞 Bread', '🥚 Eggs', '🧅 Onion', '🧄 Garlic', '🍋 Lemon', '🥕 Carrot', '🫙 Yogurt', '🧀 Cheese', '🍅 Tomato'].map(item => (
                  <button key={item} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '6px 12px', fontSize: 12, color: C.textSub, cursor: 'pointer' }}>{item}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── INSIGHTS SCREEN ────────────────────────────────────────────────────────
  const InsightsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '14px 20px 10px' }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.6px' }}>Insights</div>
      </div>

      <div style={{ margin: '0 16px 14px', background: 'linear-gradient(135deg, rgba(74,222,128,0.13) 0%, rgba(52,211,153,0.07) 100%)', border: '1px solid rgba(74,222,128,0.22)', borderRadius: 18, padding: '18px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: C.textSub, fontWeight: 500, marginBottom: 5 }}>Kitchen Health Score</div>
            <div style={{ fontSize: 50, fontWeight: 800, color: C.primary, letterSpacing: '-2px', lineHeight: 1 }}>82<span style={{ fontSize: 18, fontWeight: 600, color: C.textSub }}>/100</span></div>
            <div style={{ fontSize: 11.5, color: C.textSub, marginTop: 5 }}>↑ +11 points this week</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: C.textSub, marginBottom: 4 }}>Saved this month</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: C.text, letterSpacing: '-1px' }}>$55</div>
            <div style={{ fontSize: 10.5, color: C.textSub }}>vs. $12 last month</div>
          </div>
        </div>
        <div style={{ marginTop: 14, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
          <div style={{ height: '100%', width: '82%', background: `linear-gradient(90deg, ${C.primary}, #34D399)`, borderRadius: 3 }}/>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginBottom: 14 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 10 }}>Weekly Breakdown</div>
        {[{ label: 'This week', saved: 22, items: 7, pct: 82 }, { label: 'Last week', saved: 15, items: 5, pct: 71 }, { label: '2 weeks ago', saved: 18, items: 6, pct: 76 }].map((w, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '11px 14px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text, marginBottom: 5 }}>{w.label}</div>
              <div style={{ height: 5, background: C.border, borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${w.pct}%`, background: `linear-gradient(90deg, ${C.primary}, #34D399)`, borderRadius: 3 }}/>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>${w.saved}</div>
              <div style={{ fontSize: 10, color: C.textMuted }}>{w.items} items saved</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px', marginBottom: 14 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 10 }}>Kitchen Habits</div>
        {[
          { Icon: window.lucide.Sun, label: 'Favorite meal time', val: 'Dinner', sub: '5x/week avg' },
          { Icon: window.lucide.TrendingDown, label: 'Biggest waste risk', val: 'Produce', sub: 'Spinach, herbs' },
          { Icon: window.lucide.Star, label: 'Best streak', val: '9 days', sub: 'Zero-waste cooking' },
          { Icon: window.lucide.RefreshCw, label: 'Shopping pattern', val: 'Every 5 days', sub: 'Optimized for 4 people' },
        ].map(({ Icon, label, val, sub }, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '11px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(167,139,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(Icon, { size: 16, color: C.purple })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, color: C.textMuted, marginBottom: 1 }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{val}</div>
            </div>
            <div style={{ fontSize: 11, color: C.textSub }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 10 }}>This Week's Wins</div>
        {[
          { em: '🥬', text: 'Used spinach before it wilted — saved $3.50', day: 'Mon' },
          { em: '🍋', text: 'Lemon used in 2 recipes instead of going dry', day: 'Tue' },
          { em: '🍗', text: 'Chicken stretched into 3 meals this week', day: 'Wed' },
        ].map((w, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <span style={{ fontSize: 20 }}>{w.em}</span>
            <div style={{ flex: 1, fontSize: 12.5, color: C.textSub, lineHeight: 1.5 }}>{w.text}</div>
            <span style={{ fontSize: 10.5, color: C.textMuted, flexShrink: 0 }}>{w.day}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── NAVIGATION & SHELL ─────────────────────────────────────────────────────
  const navTabs = [
    { id: 'fridge',   Icon: window.lucide.Archive,    label: 'Fridge'   },
    { id: 'cook',     Icon: window.lucide.Utensils,   label: 'Cook'     },
    { id: 'scan',     Icon: window.lucide.Camera,     label: 'Scan'     },
    { id: 'insights', Icon: window.lucide.TrendingUp, label: 'Insights' },
  ];

  const screens = { fridge: FridgeScreen, cook: CookScreen, scan: ScanScreen, insights: InsightsScreen };
  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#050810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', -apple-system, sans-serif", padding: '20px 0' }}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); *{box-sizing:border-box} ::-webkit-scrollbar{display:none} body{margin:0;padding:0;background:#050810}` }}/>

      <div style={{ width: 375, height: 812, background: C.bg, borderRadius: 50, overflow: 'hidden', boxShadow: '0 0 0 10px #141830, 0 0 0 12px #1E2448, 0 60px 140px rgba(0,0,0,0.95)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <StatusBar/>
        <DI/>

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <ActiveScreen/>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: `${C.surface}F5`, backdropFilter: 'blur(20px)', borderTop: `1px solid ${C.border}`, padding: '8px 0 24px', display: 'flex' }}>
          {navTabs.map(({ id, Icon, label }) => {
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => { setActiveTab(id); if (id !== 'cook') setSelectedMeal(null); }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0' }}>
                <div style={{ width: 40, height: 32, borderRadius: 11, background: active ? 'rgba(74,222,128,0.14)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                  {React.createElement(Icon, { size: 20, color: active ? C.primary : C.textMuted, strokeWidth: active ? 2.2 : 1.8 })}
                </div>
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? C.primary : C.textMuted, transition: 'color 0.2s' }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
