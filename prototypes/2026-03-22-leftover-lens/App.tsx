const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FFF8F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F5EDE2',
    text: '#1C1007',
    textSecondary: '#6B4E35',
    textMuted: '#A88B72',
    border: '#EEE0CE',
    primary: '#F97316',
    primaryDark: '#C95D0C',
    primaryLight: '#FEF0E3',
    success: '#16A34A',
    successLight: '#DCFCE7',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    danger: '#DC2626',
    dangerLight: '#FEE2E2',
    card: '#FFFFFF',
    nav: '#FFFFFF',
    navBorder: '#EEE0CE',
    gradient1: '#F97316',
    gradient2: '#EA580C',
  },
  dark: {
    bg: '#0E0B07',
    surface: '#1C1510',
    surfaceAlt: '#241C13',
    text: '#F5EBD8',
    textSecondary: '#B09070',
    textMuted: '#6B5038',
    border: '#302015',
    primary: '#F97316',
    primaryDark: '#EA6200',
    primaryLight: '#2A1300',
    success: '#22C55E',
    successLight: '#0A2E14',
    warning: '#F59E0B',
    warningLight: '#1A1100',
    danger: '#EF4444',
    dangerLight: '#2D0808',
    card: '#1C1510',
    nav: '#1A1410',
    navBorder: '#302015',
    gradient1: '#F97316',
    gradient2: '#EA580C',
  },
};

const ingredientsData = [
  { id: 1, name: 'Eggs', qty: '4 left', cat: 'Fridge', freshness: 'good', days: 7, emoji: '🥚' },
  { id: 2, name: 'Cherry Tomatoes', qty: '½ pint', cat: 'Fridge', freshness: 'soon', days: 2, emoji: '🍅' },
  { id: 3, name: 'Leftover Rice', qty: '2 cups', cat: 'Fridge', freshness: 'urgent', days: 1, emoji: '🍚' },
  { id: 4, name: 'Spinach', qty: 'Large bag', cat: 'Fridge', freshness: 'soon', days: 3, emoji: '🥬' },
  { id: 5, name: 'Black Beans', qty: '2 cans', cat: 'Pantry', freshness: 'good', days: 365, emoji: '🫘' },
  { id: 6, name: 'Greek Yogurt', qty: '½ cup', cat: 'Fridge', freshness: 'soon', days: 3, emoji: '🫙' },
  { id: 7, name: 'Scallions', qty: '1 bunch', cat: 'Fridge', freshness: 'good', days: 5, emoji: '🌿' },
  { id: 8, name: 'Garlic', qty: '1 head', cat: 'Pantry', freshness: 'good', days: 14, emoji: '🧄' },
  { id: 9, name: 'Soy Sauce', qty: 'Half bottle', cat: 'Pantry', freshness: 'good', days: 180, emoji: '🍶' },
  { id: 10, name: 'Frozen Corn', qty: '1 cup', cat: 'Freezer', freshness: 'good', days: 30, emoji: '🌽' },
];

const mealsData = [
  {
    id: 1, name: 'Breakfast Fried Rice', time: '15 min', diff: 'Easy', match: 98,
    uses: ['Leftover Rice', 'Eggs', 'Scallions', 'Soy Sauce'],
    urgent: true, emoji: '🍳', tip: 'Uses your rice before it expires tonight!',
    equip: 'Stovetop Pan', cal: 380,
    steps: [
      'Heat 1 tbsp oil in pan on medium-high heat',
      'Add cold rice, press flat — let crisp 3 min without stirring',
      'Push rice aside, crack 2 eggs and scramble in the empty space',
      'Add sliced scallions and 2 tbsp soy sauce',
      'Toss everything together, serve hot with chili flakes',
    ],
    subs: ['No soy sauce? Use salt + a dash of fish sauce', 'Add frozen corn for extra texture'],
  },
  {
    id: 2, name: 'Spicy Tomato Bean Tostadas', time: '20 min', diff: 'Easy', match: 91,
    uses: ['Cherry Tomatoes', 'Black Beans', 'Spinach', 'Greek Yogurt'],
    urgent: false, emoji: '🫔', tip: 'Greek yogurt = sour cream here — nobody can tell.',
    equip: 'Air Fryer', cal: 420,
    steps: [
      'Air fry tortillas at 375°F for 5 min until crisp',
      'Drain beans, smash with garlic, salt & cumin',
      'Halve tomatoes, sauté 3 min with olive oil & chili flakes',
      'Layer: bean spread → spinach → tomatoes on tostada',
      'Drizzle yogurt on top, serve immediately',
    ],
    subs: ['No air fryer? Toast tortillas in a dry pan', 'Sub spinach with any leafy green'],
  },
  {
    id: 3, name: 'Garlic Egg Drop Soup', time: '10 min', diff: 'Easy', match: 85,
    uses: ['Eggs', 'Garlic', 'Scallions', 'Spinach'],
    urgent: false, emoji: '🍜', tip: 'Microwave-friendly — 10 minutes start to finish.',
    equip: 'Microwave or Pot', cal: 180,
    steps: [
      'Bring 2 cups broth to a simmer with 2 minced garlic cloves',
      'Whisk 2 eggs with a pinch of salt in a small bowl',
      'Slowly pour eggs in a thin stream into simmering broth',
      'Add spinach, stir gently, cook 1 minute',
      'Top with sliced scallions and a drop of sesame oil',
    ],
    subs: ['No broth? Use water + 1 tsp soy sauce + pinch of salt', 'Add a few drops of chili oil for heat'],
  },
  {
    id: 4, name: 'Black Bean & Corn Bowl', time: '12 min', diff: 'Easy', match: 80,
    uses: ['Black Beans', 'Frozen Corn', 'Cherry Tomatoes'],
    urgent: false, emoji: '🥗', tip: 'Great base for tomorrow\'s lunch too — make extra.',
    equip: 'Microwave', cal: 340,
    steps: [
      'Rinse and drain one can of black beans',
      'Microwave frozen corn 2 minutes, drain',
      'Halve cherry tomatoes, mix with beans and corn',
      'Season with cumin, lime juice, salt, and olive oil',
      'Top with Greek yogurt if you have it',
    ],
    subs: ['No lime? A splash of vinegar works', 'Add yogurt or avocado if available'],
  },
];

const weekPlanData = [
  { day: 'Today', meal: 'Breakfast Fried Rice', leftover: 'Extra rice → Wed bowl base', alert: true },
  { day: 'Tue', meal: 'Spicy Tomato Bean Tostadas', leftover: 'Leftover beans → Wed soup', alert: false },
  { day: 'Wed', meal: 'Bean & Egg Soup', leftover: null, alert: false },
  { day: 'Thu', meal: 'Spinach Frittata', leftover: 'Slices → Fri lunchbox', alert: false },
  { day: 'Fri', meal: 'Grocery refresh day', leftover: null, alert: false },
];

function App() {
  const [tab, setTab] = useState('scan');
  const [dark, setDark] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [pantryFilter, setPantryFilter] = useState('all');
  const [cookStep, setCookStep] = useState(0);
  const [cooking, setCooking] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [pressedNav, setPressedNav] = useState(null);
  const [dietPrefs, setDietPrefs] = useState({ meat: true, seafood: true, glutenFree: false, dairyFree: false });
  const [equipment, setEquipment] = useState({ pan: true, airFryer: true, microwave: true, oven: false });

  const T = dark ? themes.dark : themes.light;

  useEffect(() => {
    if (!document.getElementById('pjs-font')) {
      const link = document.createElement('link');
      link.id = 'pjs-font';
      link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const ic = (name, props = {}) => {
    const Icon = window.lucide && window.lucide[name];
    if (!Icon) return null;
    return React.createElement(Icon, { size: 20, strokeWidth: 2, ...props });
  };

  const freshColor = (f) => f === 'urgent' ? T.danger : f === 'soon' ? T.warning : T.success;
  const freshBg = (f) => f === 'urgent' ? T.dangerLight : f === 'soon' ? T.warningLight : T.successLight;
  const freshLabel = (f, d) => f === 'urgent' ? 'Use today' : f === 'soon' ? `${d}d left` : 'Fresh';
  const urgentCount = ingredientsData.filter(i => i.freshness !== 'good').length;

  const handleScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => { setScanning(false); setScanned(true); }, 2600);
  };

  // ── Status Bar
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 6px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>9:41</span>
      <div style={{ width: 126, height: 37, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6, zIndex: 20 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect x="0" y="5" width="2.5" height="6" rx="1" fill={T.text} opacity="0.35"/>
          <rect x="4" y="3" width="2.5" height="8" rx="1" fill={T.text} opacity="0.6"/>
          <rect x="8" y="1" width="2.5" height="10" rx="1" fill={T.text} opacity="0.85"/>
          <rect x="12" y="0" width="2.5" height="11" rx="1" fill={T.text}/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 2.4C5.3 2.4 2.9 3.5 1.2 5.3L0 4C2.1 1.5 5.1 0 8 0s5.9 1.5 8 4l-1.2 1.3C13.1 3.5 10.7 2.4 8 2.4z" fill={T.text} opacity="0.4"/>
          <path d="M8 5.5c-1.8 0-3.4.8-4.5 2L2.3 6.2C3.7 4.5 5.7 3.5 8 3.5s4.3 1 5.7 2.7L12.5 7.5C11.4 6.3 9.8 5.5 8 5.5z" fill={T.text} opacity="0.7"/>
          <circle cx="8" cy="10.5" r="1.5" fill={T.text}/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div style={{ width: 23, height: 11, borderRadius: 3, border: `1.5px solid ${T.text}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '75%', height: '100%', borderRadius: 1.5, background: T.success }} />
          </div>
          <div style={{ width: 2, height: 5, borderRadius: 1, background: T.text, opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );

  // ── Bottom Nav
  const navItems = [
    { id: 'scan', label: 'Scan', icon: 'Camera' },
    { id: 'pantry', label: 'Pantry', icon: 'Package' },
    { id: 'meals', label: 'Meals', icon: 'Utensils' },
    { id: 'plan', label: 'Plan', icon: 'CalendarDays' },
    { id: 'settings', label: 'Profile', icon: 'UserCircle' },
  ];

  const BottomNav = () => (
    <div style={{ display: 'flex', background: T.nav, borderTop: `1px solid ${T.navBorder}`, paddingBottom: 18, paddingTop: 8, flexShrink: 0, transition: 'background 0.3s, border-color 0.3s' }}>
      {navItems.map(item => {
        const active = tab === item.id;
        return (
          <div
            key={item.id}
            onClick={() => { setTab(item.id); setSelectedMeal(null); setCooking(false); setCookStep(0); }}
            onMouseDown={() => setPressedNav(item.id)}
            onMouseUp={() => setPressedNav(null)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', transform: pressedNav === item.id ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.12s', paddingTop: 4 }}
          >
            <div style={{ width: 40, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? T.primaryLight : 'transparent', borderRadius: 12, transition: 'background 0.2s' }}>
              {ic(item.icon, { size: 20, color: active ? T.primary : T.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? T.primary : T.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: 0.2 }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );

  // ── SCAN Screen
  const ScanScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ padding: '6px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: T.text, lineHeight: 1.1 }}>Leftover Lens</div>
          <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 3 }}>Turn pantry odds into real meals.</div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: T.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.primary}30` }}>
          <span style={{ fontSize: 20 }}>🍽️</span>
        </div>
      </div>

      {/* Scan Zone */}
      <div
        onClick={!scanning ? handleScan : undefined}
        style={{
          height: 215, background: scanning
            ? `linear-gradient(135deg, ${T.primaryLight}, ${T.surfaceAlt})`
            : scanned ? `linear-gradient(160deg, ${T.successLight}, ${T.primaryLight})` : T.surfaceAlt,
          border: `2px ${scanned ? 'solid' : 'dashed'} ${scanning ? T.primary : scanned ? T.success + '60' : T.border}`,
          borderRadius: 24, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', cursor: scanning ? 'default' : 'pointer',
          transition: 'all 0.35s', position: 'relative', overflow: 'hidden',
        }}
      >
        {scanning && (
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, transparent, ${T.primary}, transparent)`,
            animation: 'scanbeam 1.4s ease-in-out infinite',
          }} />
        )}
        {!scanning && !scanned && (
          <>
            <div style={{ width: 68, height: 68, borderRadius: 34, background: T.primary + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, border: `2px solid ${T.primary}25` }}>
              {ic('Camera', { size: 30, color: T.primary })}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Scan Your Ingredients</div>
            <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 5, textAlign: 'center', maxWidth: 220, lineHeight: 1.6 }}>
              Point your camera at the fridge, pantry, or counter
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              {['📦 Pantry', '❄️ Fridge', '🧊 Freezer'].map(label => (
                <span key={label} style={{ fontSize: 11, background: T.surface, color: T.textSecondary, padding: '4px 10px', borderRadius: 20, border: `1px solid ${T.border}`, fontWeight: 600 }}>{label}</span>
              ))}
            </div>
          </>
        )}
        {scanning && (
          <>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📸</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.primary }}>Analyzing ingredients…</div>
            <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 4 }}>Checking freshness & expiry dates</div>
            <div style={{ marginTop: 16, display: 'flex', gap: 7 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: T.primary, opacity: 0.25 + i * 0.25 }} />
              ))}
            </div>
          </>
        )}
        {scanned && !scanning && (
          <>
            <div style={{ fontSize: 38, marginBottom: 10 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>10 items identified!</div>
            <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 4 }}>5 need attention · 3 expire within 3 days</div>
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <div onClick={(e) => { e.stopPropagation(); setTab('pantry'); }} style={{ background: T.primary, color: '#fff', padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                View Pantry
              </div>
              <div onClick={(e) => { e.stopPropagation(); setTab('meals'); }} style={{ background: T.surface, color: T.primary, padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${T.primary}40` }}>
                See Meals
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Stats */}
      {scanned && (
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {[
            { label: 'Use Today', count: 1, color: T.danger, bg: T.dangerLight, emoji: '⚠️' },
            { label: 'Use Soon', count: 4, color: T.warning, bg: T.warningLight, emoji: '🕐' },
            { label: 'Fresh', count: 5, color: T.success, bg: T.successLight, emoji: '✅' },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: s.bg, borderRadius: 16, padding: '12px 8px', textAlign: 'center', border: `1px solid ${s.color}25` }}>
              <div style={{ fontSize: 20 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, marginTop: 2 }}>{s.count}</div>
              <div style={{ fontSize: 10, color: s.color, fontWeight: 700, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Suggested meals or empty */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 12 }}>
          {scanned ? '🔥 Cook These Now' : 'How it works'}
        </div>
        {scanned ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mealsData.slice(0, 2).map(meal => (
              <div key={meal.id} onClick={() => { setSelectedMeal(meal); setTab('meals'); }} style={{ background: T.card, borderRadius: 18, padding: '14px 16px', border: `1px solid ${meal.urgent ? T.danger + '40' : T.border}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'transform 0.12s' }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: meal.urgent ? T.dangerLight : T.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {meal.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{meal.name}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 5, alignItems: 'center' }}>
                    {ic('Clock', { size: 12, color: T.textMuted })}
                    <span style={{ fontSize: 12, color: T.textSecondary }}>{meal.time}</span>
                    {meal.urgent && <span style={{ fontSize: 10, background: T.dangerLight, color: T.danger, padding: '2px 8px', borderRadius: 10, fontWeight: 800 }}>USE FIRST</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: T.primary }}>{meal.match}%</div>
                  <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600 }}>match</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { step: '1', emoji: '📷', title: 'Snap a photo', desc: 'Photo identifies ingredients, estimates freshness & flags what expires soon.' },
              { step: '2', emoji: '🍳', title: 'Get meal ideas', desc: 'App builds meals around what you have, your time, and available equipment.' },
              { step: '3', emoji: '♻️', title: 'Plan ahead', desc: 'Cook once, eat twice — leftovers become tomorrow\'s lunch automatically.' },
            ].map(item => (
              <div key={item.step} style={{ background: T.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${T.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: T.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 3, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 18, background: `linear-gradient(135deg, ${T.primary}14, ${T.primary}07)`, borderRadius: 18, padding: '14px 16px', border: `1px solid ${T.primary}20` }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20 }}>💡</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.primary }}>Pro Tip</div>
            <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 3, lineHeight: 1.55 }}>Include expiry date stickers in your scan — Leftover Lens prioritizes meals around what spoils soonest to cut food waste.</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── PANTRY Screen
  const PantryScreen = () => {
    const cats = ['all', 'Fridge', 'Pantry', 'Freezer'];
    const filtered = pantryFilter === 'all' ? ingredientsData : ingredientsData.filter(i => i.cat === pantryFilter);
    const catEmoji = (c) => c === 'Fridge' ? '❄️' : c === 'Pantry' ? '📦' : c === 'Freezer' ? '🧊' : '🗂️';
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ padding: '6px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.text }}>My Pantry</div>
            <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 2 }}>
              <span style={{ color: T.danger, fontWeight: 700 }}>{urgentCount} items</span> need attention
            </div>
          </div>
          <div onClick={() => { setScanned(false); setTab('scan'); }} style={{ width: 38, height: 38, borderRadius: 19, background: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 4px 12px ${T.primary}40` }}>
            {ic('Plus', { size: 18, color: '#fff' })}
          </div>
        </div>

        {/* Urgent banner */}
        <div style={{ background: `linear-gradient(135deg, ${T.danger}16, ${T.warning}12)`, border: `1px solid ${T.danger}28`, borderRadius: 16, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.danger }}>Use the leftover rice tonight!</div>
            <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 2 }}>1 item expires today · 4 expire in ≤3 days</div>
          </div>
          <div onClick={() => setTab('meals')} style={{ fontSize: 12, color: T.primary, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', padding: '6px 12px', background: T.primaryLight, borderRadius: 12 }}>
            See meals
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }}>
          {cats.map(cat => (
            <div key={cat} onClick={() => setPantryFilter(cat)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, background: pantryFilter === cat ? T.primary : T.surface, color: pantryFilter === cat ? '#fff' : T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${pantryFilter === cat ? T.primary : T.border}`, transition: 'all 0.2s' }}>
              {catEmoji(cat)} {cat === 'all' ? 'All Items' : cat}
            </div>
          ))}
        </div>

        {/* Ingredient list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: T.card, borderRadius: 14, padding: '12px 14px', border: `1px solid ${item.freshness === 'urgent' ? T.danger + '45' : item.freshness === 'soon' ? T.warning + '30' : T.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: item.freshness === 'urgent' ? T.dangerLight : item.freshness === 'soon' ? T.warningLight : T.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.name}</div>
                <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 2 }}>{item.qty} · {item.cat}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: freshColor(item.freshness), background: freshBg(item.freshness), padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                  {freshLabel(item.freshness, item.days)}
                </div>
                {item.freshness !== 'good' && (
                  <div style={{ fontSize: 10, color: T.textMuted, marginTop: 4, textAlign: 'center' }}>
                    {item.days === 1 ? 'expires today' : `${item.days} days`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, background: T.surfaceAlt, borderRadius: 14, padding: '13px 16px', border: `1px dashed ${T.border}`, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          {ic('Plus', { size: 16, color: T.textMuted })}
          <span style={{ fontSize: 14, color: T.textMuted, fontWeight: 500 }}>Add item manually…</span>
        </div>
      </div>
    );
  };

  // ── MEALS Screen
  const MealsScreen = () => {
    if (selectedMeal) {
      return (
        <div style={{ flex: 1, overflowY: 'auto', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {/* Hero header */}
          <div style={{ minHeight: 185, background: `linear-gradient(145deg, ${T.gradient1}, ${T.gradient2})`, padding: '16px 20px 22px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div onClick={() => { setSelectedMeal(null); setCooking(false); setCookStep(0); }} style={{ position: 'absolute', top: 16, left: 16, width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {ic('ArrowLeft', { size: 18, color: '#fff' })}
            </div>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ fontSize: 46, marginBottom: 8 }}>{selectedMeal.emoji}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{selectedMeal.name}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
              {[
                { icon: 'Clock', label: selectedMeal.time },
                { icon: 'Flame', label: `${selectedMeal.cal} cal` },
                { icon: 'ChefHat', label: selectedMeal.diff },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', gap: 5, alignItems: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '4px 10px' }}>
                  {ic(icon, { size: 12, color: '#fff' })}
                  <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '16px 20px' }}>
            {/* Tip */}
            <div style={{ background: selectedMeal.urgent ? T.dangerLight : T.primaryLight, border: `1px solid ${selectedMeal.urgent ? T.danger : T.primary}28`, borderRadius: 14, padding: '11px 14px', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 16 }}>{selectedMeal.urgent ? '⚠️' : '💡'}</span>
              <span style={{ fontSize: 13, color: selectedMeal.urgent ? T.danger : T.primary, fontWeight: 600, lineHeight: 1.5 }}>{selectedMeal.tip}</span>
            </div>

            {/* Equipment */}
            <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>Equipment</div>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: '11px 14px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🍳</span>
              <span style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{selectedMeal.equip}</span>
            </div>

            {/* From your kitchen */}
            <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>From Your Kitchen</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {selectedMeal.uses.map(u => (
                <div key={u} style={{ background: T.successLight, color: T.success, padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, border: `1px solid ${T.success}30` }}>
                  ✓ {u}
                </div>
              ))}
            </div>

            {/* Substitutions */}
            <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Smart Substitutions</div>
            <div style={{ background: T.surfaceAlt, borderRadius: 14, padding: '12px 14px', marginBottom: 18, border: `1px solid ${T.border}` }}>
              {selectedMeal.subs.map((sub, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', paddingBottom: i < selectedMeal.subs.length - 1 ? 8 : 0, marginBottom: i < selectedMeal.subs.length - 1 ? 8 : 0, borderBottom: i < selectedMeal.subs.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                  <span style={{ fontSize: 14 }}>↩️</span>
                  <span style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.5 }}>{sub}</span>
                </div>
              ))}
            </div>

            {/* Steps */}
            <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>Steps</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
              {selectedMeal.steps.map((step, i) => {
                const done = cooking && cookStep > i;
                const active = cooking && cookStep === i;
                return (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 14, background: done ? T.success : active ? T.primary : T.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: (done || active) ? '#fff' : T.primary }}>
                        {done ? '✓' : i + 1}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: done ? T.textMuted : T.text, lineHeight: 1.6, paddingTop: 4, textDecoration: done ? 'line-through' : 'none', flex: 1, transition: 'color 0.3s' }}>
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cook button */}
            <div
              onClick={() => {
                if (!cooking) { setCooking(true); setCookStep(0); }
                else if (cookStep < selectedMeal.steps.length - 1) { setCookStep(s => s + 1); }
                else { setCooking(false); setCookStep(0); }
              }}
              style={{ background: cooking && cookStep === selectedMeal.steps.length - 1 ? T.success : T.primary, borderRadius: 18, padding: '17px', textAlign: 'center', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, transition: 'background 0.3s', boxShadow: `0 6px 20px ${T.primary}40` }}
            >
              {!cooking
                ? '🍳  Start Cooking'
                : cookStep < selectedMeal.steps.length - 1
                  ? `Next Step  (${cookStep + 2} / ${selectedMeal.steps.length})`
                  : '✅  All Done! Great meal!'}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ padding: '6px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.text }}>Meal Ideas</div>
            <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 2 }}>{mealsData.length} recipes from your kitchen</div>
          </div>
          <div onClick={() => setScanned(false) || handleScan()} style={{ background: T.primaryLight, padding: '7px 13px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', border: `1px solid ${T.primary}30` }}>
            {ic('RefreshCw', { size: 13, color: T.primary })}
            <span style={{ fontSize: 12, color: T.primary, fontWeight: 700 }}>Rescan</span>
          </div>
        </div>

        {/* Featured urgent card */}
        <div onClick={() => setSelectedMeal(mealsData[0])} style={{ background: `linear-gradient(145deg, ${T.gradient1}, ${T.gradient2})`, borderRadius: 24, padding: '18px', marginBottom: 18, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -15, right: -15, width: 90, height: 90, borderRadius: 45, background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: -20, right: 30, width: 70, height: 70, borderRadius: 35, background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>🔥 COOK NOW — Uses Expiring Items</div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: 50 }}>{mealsData[0].emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{mealsData[0].name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>{mealsData[0].time} · {mealsData[0].diff} · {mealsData[0].cal} cal</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 5, fontStyle: 'italic' }}>{mealsData[0].tip}</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '10px 12px', flexShrink: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{mealsData[0].match}%</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>match</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>More Options</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mealsData.slice(1).map(meal => (
            <div key={meal.id} onClick={() => setSelectedMeal(meal)} style={{ background: T.card, borderRadius: 18, padding: '14px 16px', border: `1px solid ${T.border}`, display: 'flex', gap: 13, alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: T.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{meal.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{meal.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' }}>
                  {ic('Clock', { size: 11, color: T.textMuted })}
                  <span style={{ fontSize: 11, color: T.textSecondary }}>{meal.time}</span>
                  <span style={{ fontSize: 10, color: T.border }}>·</span>
                  <span style={{ fontSize: 11, color: T.textSecondary }}>{meal.equip}</span>
                </div>
                <div style={{ display: 'flex', gap: 5, marginTop: 7, flexWrap: 'wrap' }}>
                  {meal.uses.slice(0, 3).map(u => (
                    <span key={u} style={{ fontSize: 10, background: T.surfaceAlt, color: T.textSecondary, padding: '2px 8px', borderRadius: 8, fontWeight: 600, border: `1px solid ${T.border}` }}>{u}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: meal.match >= 90 ? T.success : T.primary }}>{meal.match}%</div>
                <div style={{ fontSize: 10, color: T.textMuted }}>match</div>
                {ic('ChevronRight', { size: 15, color: T.textMuted })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── PLAN Screen
  const PlanScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ padding: '6px 0 16px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: T.text }}>Meal Plan</div>
        <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 2 }}>Stretch groceries across the week</div>
      </div>

      {/* Smart nudge */}
      <div style={{ background: `linear-gradient(135deg, ${T.primary}18, ${T.warning}12)`, borderRadius: 18, padding: '14px 16px', marginBottom: 18, border: `1px solid ${T.primary}22` }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 24 }}>🔔</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.primary }}>Tonight's Nudge</div>
            <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 3, lineHeight: 1.55 }}>Use the mushrooms tonight or freeze them — they've been in the fridge for 4 days and won't last longer.</div>
          </div>
        </div>
      </div>

      {/* Weekly plan */}
      <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>This Week</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {weekPlanData.map((item, idx) => (
          <div key={idx} style={{ background: T.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${idx === 0 ? T.primary + '50' : T.border}`, position: 'relative', overflow: 'hidden' }}>
            {idx === 0 && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: T.primary, borderRadius: '16px 0 0 16px' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: idx === 0 ? 4 : 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: idx === 0 ? T.primary : T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>{item.day}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginTop: 3 }}>{item.meal}</div>
                {item.leftover && (
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: 7 }}>
                    <span style={{ fontSize: 13 }}>♻️</span>
                    <span style={{ fontSize: 12, color: T.success, fontWeight: 600 }}>{item.leftover}</span>
                  </div>
                )}
              </div>
              {item.alert && (
                <div style={{ background: T.dangerLight, padding: '4px 11px', borderRadius: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: T.danger, fontWeight: 800 }}>Today</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Leftover chain */}
      <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>♻️ Leftover Chain</div>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: '16px 18px', marginBottom: 20 }}>
        {[
          { label: 'Tonight: Fried Rice', sub: 'Serves 2 · uses expiring rice', isLink: false },
          { label: 'Extra rice → Wed', sub: 'Cold rice = tomorrow\'s base', isLink: true },
          { label: 'Wed: Rice & Bean Bowl', sub: 'Quick 12-min lunch', isLink: false },
        ].map((item, i, arr) => (
          <div key={i}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: item.isLink ? T.success : T.primary, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.isLink ? T.success : T.text }}>{item.label}</div>
                <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 2 }}>{item.sub}</div>
              </div>
            </div>
            {i < arr.length - 1 && <div style={{ width: 2, height: 18, background: T.border, marginLeft: 5, marginTop: 4, marginBottom: 4 }} />}
          </div>
        ))}
      </div>

      {/* Smart grocery add-ons */}
      <div style={{ background: T.surfaceAlt, borderRadius: 18, padding: '16px 18px', border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>🛒 Smart Add-ons</div>
        <div style={{ fontSize: 12, color: T.textSecondary, marginBottom: 12 }}>Add these 3 items to unlock 5 more meals this week:</div>
        {[
          { item: 'Corn Tortillas', gain: '+2 meals' },
          { item: 'Limes', gain: '+2 meals' },
          { item: 'Smoked Paprika', gain: '+1 meal' },
        ].map((row, i, arr) => (
          <div key={row.item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {ic('ShoppingCart', { size: 14, color: T.textMuted })}
              <span style={{ fontSize: 14, color: T.text, fontWeight: 500 }}>{row.item}</span>
            </div>
            <span style={{ fontSize: 11, background: T.primaryLight, color: T.primary, padding: '3px 11px', borderRadius: 10, fontWeight: 800 }}>{row.gain}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── SETTINGS Screen
  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ padding: '6px 0 16px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: T.text }}>Profile & Settings</div>
        <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 2 }}>Personalize your Leftover Lens</div>
      </div>

      {/* User card */}
      <div style={{ background: `linear-gradient(145deg, ${T.gradient1}, ${T.gradient2})`, borderRadius: 22, padding: '20px 22px', marginBottom: 20, display: 'flex', gap: 14, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ width: 58, height: 58, borderRadius: 29, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>👤</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Alex's Kitchen</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Household of 2 · 23 meals cooked</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 5 }}>🏆 Rescued 4.2 lbs of food this month</div>
        </div>
      </div>

      {/* Theme toggle */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {ic(dark ? 'Moon' : 'Sun', { size: 18, color: T.primary })}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{dark ? 'Dark Mode' : 'Light Mode'}</div>
            <div style={{ fontSize: 11, color: T.textSecondary }}>Switch app appearance</div>
          </div>
        </div>
        <div onClick={() => setDark(d => !d)} style={{ width: 50, height: 29, borderRadius: 15, background: dark ? T.primary : T.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
          <div style={{ width: 23, height: 23, borderRadius: 12, background: '#fff', position: 'absolute', top: 3, left: dark ? 24 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.22)' }} />
        </div>
      </div>

      {/* Dietary preferences */}
      <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8, paddingLeft: 4 }}>Dietary Preferences</div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 14, overflow: 'hidden' }}>
        {[
          { key: 'meat', emoji: '🥩', label: 'Meat & Poultry', sub: 'Include in recipes' },
          { key: 'seafood', emoji: '🐟', label: 'Seafood', sub: 'Include in recipes' },
          { key: 'glutenFree', emoji: '🌾', label: 'Gluten-Free', sub: 'Filter gluten ingredients' },
          { key: 'dairyFree', emoji: '🥛', label: 'Dairy-Free', sub: 'Suggest dairy alternatives' },
        ].map((pref, i, arr) => (
          <div key={pref.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <span style={{ fontSize: 20 }}>{pref.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{pref.label}</div>
              <div style={{ fontSize: 11, color: T.textSecondary }}>{pref.sub}</div>
            </div>
            <div onClick={() => setDietPrefs(p => ({ ...p, [pref.key]: !p[pref.key] }))} style={{ width: 42, height: 25, borderRadius: 13, background: dietPrefs[pref.key] ? T.primary : T.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
              <div style={{ width: 19, height: 19, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: dietPrefs[pref.key] ? 20 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Equipment */}
      <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8, paddingLeft: 4 }}>Available Equipment</div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 14, overflow: 'hidden' }}>
        {[
          { key: 'pan', emoji: '🍳', label: 'Stovetop Pan', sub: 'Required for most recipes' },
          { key: 'airFryer', emoji: '🌡️', label: 'Air Fryer', sub: 'Crispy textures without oil' },
          { key: 'microwave', emoji: '📡', label: 'Microwave', sub: 'Quick reheating & cooking' },
          { key: 'oven', emoji: '🔥', label: 'Oven', sub: 'Roasting & baking' },
        ].map((eq, i, arr) => (
          <div key={eq.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <span style={{ fontSize: 20 }}>{eq.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{eq.label}</div>
              <div style={{ fontSize: 11, color: T.textSecondary }}>{eq.sub}</div>
            </div>
            <div onClick={() => setEquipment(e => ({ ...e, [eq.key]: !e[eq.key] }))} style={{ width: 42, height: 25, borderRadius: 13, background: equipment[eq.key] ? T.primary : T.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
              <div style={{ width: 19, height: 19, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: equipment[eq.key] ? 20 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Smart Reminders */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {ic('Bell', { size: 18, color: T.primary })}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Smart Reminders</div>
            <div style={{ fontSize: 11, color: T.textSecondary }}>Expiry nudges & meal prompts</div>
          </div>
        </div>
        <div onClick={() => setNotifications(n => !n)} style={{ width: 50, height: 29, borderRadius: 15, background: notifications ? T.primary : T.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
          <div style={{ width: 23, height: 23, borderRadius: 12, background: '#fff', position: 'absolute', top: 3, left: notifications ? 24 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.22)' }} />
        </div>
      </div>

      {/* Impact stats */}
      <div style={{ background: T.surfaceAlt, borderRadius: 18, padding: '16px 18px', border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>📊 Your Impact This Month</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { value: '23', label: 'Meals Cooked', emoji: '🍽️' },
            { value: '4.2 lbs', label: 'Food Saved', emoji: '♻️' },
            { value: '$38', label: 'Not Wasted', emoji: '💰' },
          ].map(stat => (
            <div key={stat.label} style={{ flex: 1, background: T.surface, borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 22 }}>{stat.emoji}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.primary, marginTop: 5 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: T.textSecondary, marginTop: 3, fontWeight: 600, lineHeight: 1.4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Phone frame
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#DED6CC', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        body { background: #DED6CC; }
        @keyframes scanbeam {
          0% { top: 10%; opacity: 1; }
          50% { opacity: 1; }
          100% { top: 90%; opacity: 0.4; }
        }
      `}</style>
      <div style={{
        width: 375, height: 812,
        background: T.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.32), 0 0 0 1px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.12)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s',
      }}>
        <StatusBar />
        {tab === 'scan' && <ScanScreen />}
        {tab === 'pantry' && <PantryScreen />}
        {tab === 'meals' && <MealsScreen />}
        {tab === 'plan' && <PlanScreen />}
        {tab === 'settings' && <SettingsScreen />}
        <BottomNav />
      </div>
    </div>
  );
}
