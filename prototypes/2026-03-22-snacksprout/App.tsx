const { useState, useEffect, useRef } = React;

// ─── Fonts ────────────────────────────────────────────────────────────────────
const fontStyle = document.createElement('style');
fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
::-webkit-scrollbar { display: none; }
body { background: #e8e8e8; }
`;
document.head.appendChild(fontStyle);

// ─── Themes ──────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F2FBF0',
    surface: '#FFFFFF',
    surfaceAlt: '#E8F7E3',
    surfaceCard: '#FFFFFF',
    text: '#162018',
    textSecondary: '#3D6645',
    textMuted: '#7EA882',
    primary: '#4CC963',
    primaryDark: '#2FA84A',
    primaryLight: '#C6EFCE',
    primaryGrad: 'linear-gradient(135deg, #4CC963 0%, #36B84F 100%)',
    secondary: '#FF7A3D',
    secondaryLight: '#FFE8DA',
    accent: '#FFD060',
    accentLight: '#FFF5D6',
    purple: '#9B87F5',
    purpleLight: '#EDE9FF',
    border: '#C8E8C0',
    borderLight: '#E8F7E3',
    navBg: '#FFFFFF',
    navBorder: '#E0F0D8',
    shadow: 'rgba(76, 201, 99, 0.12)',
    shadowMd: 'rgba(22, 32, 24, 0.08)',
    overlay: 'rgba(22, 32, 24, 0.4)',
    danger: '#FF4757',
    dangerLight: '#FFE5E8',
    success: '#4CC963',
    badge: '#FF4757',
  },
  dark: {
    bg: '#0B160D',
    surface: '#142018',
    surfaceAlt: '#1B2E1F',
    surfaceCard: '#1B2E1F',
    text: '#E6F5E8',
    textSecondary: '#7EAA82',
    textMuted: '#4A7050',
    primary: '#4CC963',
    primaryDark: '#2FA84A',
    primaryLight: '#173020',
    primaryGrad: 'linear-gradient(135deg, #4CC963 0%, #36B84F 100%)',
    secondary: '#FF8A50',
    secondaryLight: '#4A2010',
    accent: '#FFD060',
    accentLight: '#3A2C00',
    purple: '#B8A8FF',
    purpleLight: '#25204A',
    border: '#1E3A22',
    borderLight: '#17281C',
    navBg: '#0F1C12',
    navBorder: '#1A2E1E',
    shadow: 'rgba(0,0,0,0.4)',
    shadowMd: 'rgba(0,0,0,0.6)',
    overlay: 'rgba(11,22,13,0.7)',
    danger: '#FF6B78',
    dangerLight: '#2A1015',
    success: '#4CC963',
    badge: '#FF6B78',
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const pantryItems = [
  { id: 1, name: 'Apple Slices', emoji: '🍎', location: 'fruit-bowl', texture: 'crunchy', temp: 'room', taste: 'sweet', category: 'fruit' },
  { id: 2, name: 'Yogurt', emoji: '🥛', location: 'fridge', texture: 'soft', temp: 'cold', taste: 'sweet', category: 'dairy' },
  { id: 3, name: 'Crackers', emoji: '🍘', location: 'pantry', texture: 'crunchy', temp: 'room', taste: 'savory', category: 'grain' },
  { id: 4, name: 'Hummus', emoji: '🫙', location: 'fridge', texture: 'soft', temp: 'cold', taste: 'savory', category: 'protein' },
  { id: 5, name: 'Banana', emoji: '🍌', location: 'fruit-bowl', texture: 'soft', temp: 'room', taste: 'sweet', category: 'fruit' },
  { id: 6, name: 'Cheese Stick', emoji: '🧀', location: 'fridge', texture: 'soft', temp: 'cold', taste: 'savory', category: 'dairy' },
  { id: 7, name: 'Baby Carrots', emoji: '🥕', location: 'fridge', texture: 'crunchy', temp: 'cold', taste: 'savory', category: 'veggie' },
  { id: 8, name: 'Grapes', emoji: '🍇', location: 'fridge', texture: 'soft', temp: 'cold', taste: 'sweet', category: 'fruit' },
  { id: 9, name: 'Peanut Butter', emoji: '🥜', location: 'pantry', texture: 'soft', temp: 'room', taste: 'savory', category: 'protein' },
  { id: 10, name: 'Rice Cakes', emoji: '🍙', location: 'pantry', texture: 'crunchy', temp: 'room', taste: 'savory', category: 'grain' },
];

const snackCombos = [
  { id: 1, name: 'Apple & Peanut Butter', items: [1, 9], emoji: '🍎🥜', desc: 'Sweet crunch + creamy protein power!', tags: ['sweet', 'crunchy', 'room'], color: '#FF7A3D' },
  { id: 2, name: 'Crackers & Hummus', items: [3, 4], emoji: '🍘🫙', desc: 'Savory crunch that keeps you full!', tags: ['savory', 'crunchy', 'cold'], color: '#9B87F5' },
  { id: 3, name: 'Yogurt & Grapes', items: [2, 8], emoji: '🥛🍇', desc: 'Cold, sweet & super refreshing!', tags: ['sweet', 'soft', 'cold'], color: '#4CC963' },
  { id: 4, name: 'Carrots & Hummus', items: [7, 4], emoji: '🥕🫙', desc: 'Veggie crunch with a creamy dip!', tags: ['savory', 'crunchy', 'cold'], color: '#FF7A3D' },
  { id: 5, name: 'Banana & Cheese', items: [5, 6], emoji: '🍌🧀', desc: 'Sweet meets savory – a taste adventure!', tags: ['sweet', 'soft', 'room'], color: '#FFD060' },
  { id: 6, name: 'Rice Cakes & PB', items: [10, 9], emoji: '🍙🥜', desc: 'Light & crispy with protein inside!', tags: ['savory', 'crunchy', 'room'], color: '#4CC963' },
];

const gardenCharacters = [
  { id: 1, name: 'Sunny', role: 'The Sunflower', emoji: '🌻', level: 3, maxLevel: 5, xp: 60, color: '#FFD060', desc: 'Loves fruit snacks!', category: 'fruit' },
  { id: 2, name: 'Crispin', role: 'The Carrot', emoji: '🥕', level: 2, maxLevel: 5, xp: 35, color: '#FF7A3D', desc: 'Grows with veggies!', category: 'veggie' },
  { id: 3, name: 'Pearl', role: 'The Pea', emoji: '🫛', level: 1, maxLevel: 5, xp: 15, color: '#4CC963', desc: 'Loves green things!', category: 'veggie' },
  { id: 4, name: 'Beanie', role: 'The Bean', emoji: '🫘', level: 4, maxLevel: 5, xp: 85, color: '#9B87F5', desc: 'Powered by protein!', category: 'protein' },
  { id: 5, name: 'Miso', role: 'The Mushroom', emoji: '🍄', level: 0, maxLevel: 5, xp: 0, color: '#7EA882', desc: 'Unlock by trying new foods!', category: 'locked' },
];

const kitchenZones = [
  { id: 'fridge', label: 'Fridge', emoji: '🧊', color: '#9B87F5', items: [2, 4, 6, 7, 8] },
  { id: 'fruit-bowl', label: 'Fruit Bowl', emoji: '🍎', color: '#FF7A3D', items: [1, 5] },
  { id: 'pantry', label: 'Pantry', emoji: '🗄️', color: '#FFD060', items: [3, 9, 10] },
];

const questions = [
  { key: 'taste', q: 'Are you feeling...?', emoji: '✨', opts: [{ label: 'Something Sweet', emoji: '🍭', val: 'sweet' }, { label: 'Something Savory', emoji: '🧂', val: 'savory' }] },
  { key: 'texture', q: 'Do you want it to be...?', emoji: '🤔', opts: [{ label: 'Crunchy!', emoji: '💥', val: 'crunchy' }, { label: 'Soft & Creamy', emoji: '☁️', val: 'soft' }] },
  { key: 'temp', q: 'Would you like it...?', emoji: '🌡️', opts: [{ label: 'Cold & Fresh', emoji: '❄️', val: 'cold' }, { label: 'Room Temp', emoji: '🌤️', val: 'room' }] },
];

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [themeName, setThemeName] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [pressed, setPressed] = useState(null);

  // Decision game
  const [gameStep, setGameStep] = useState(0);
  const [gameAnswers, setGameAnswers] = useState({});
  const [gameResult, setGameResult] = useState(null);
  const [animIn, setAnimIn] = useState(true);

  // Map
  const [selectedZone, setSelectedZone] = useState(null);

  // Garden
  const [selectedChar, setSelectedChar] = useState(null);
  const [streak] = useState(5);

  // Settings
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [snackLimit] = useState(2);
  const [snacksUsed] = useState(1);
  const [allergies, setAllergies] = useState(['Nuts']);

  const t = themes[themeName];
  const font = "'Plus Jakarta Sans', sans-serif";

  const press = (id, cb) => {
    setPressed(id);
    setTimeout(() => { setPressed(null); if (cb) cb(); }, 150);
  };

  const getMatchedCombos = (answers) => {
    return snackCombos.filter(c => {
      let score = 0;
      if (answers.taste && c.tags.includes(answers.taste)) score++;
      if (answers.texture && c.tags.includes(answers.texture)) score++;
      if (answers.temp && c.tags.includes(answers.temp)) score++;
      return score >= 2;
    }).slice(0, 2).length > 0
      ? snackCombos.filter(c => {
        let score = 0;
        if (answers.taste && c.tags.includes(answers.taste)) score++;
        if (answers.texture && c.tags.includes(answers.texture)) score++;
        if (answers.temp && c.tags.includes(answers.temp)) score++;
        return score >= 2;
      }).slice(0, 2)
      : snackCombos.slice(0, 2);
  };

  const handleAnswer = (key, val) => {
    const newAnswers = { ...gameAnswers, [key]: val };
    setGameAnswers(newAnswers);
    setAnimIn(false);
    setTimeout(() => {
      if (gameStep < questions.length - 1) {
        setGameStep(gameStep + 1);
        setAnimIn(true);
      } else {
        setGameResult(getMatchedCombos(newAnswers));
        setAnimIn(true);
      }
    }, 200);
  };

  const resetGame = () => {
    setAnimIn(false);
    setTimeout(() => { setGameStep(0); setGameAnswers({}); setGameResult(null); setAnimIn(true); }, 200);
  };

  // ─── Status Bar ───────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 4px', fontFamily: font }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>3:45 PM</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill={t.textMuted} />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill={t.textMuted} />
          <rect x="9" y="2" width="3" height="10" rx="1" fill={t.textSecondary} />
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill={t.text} />
        </svg>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0.5" y="0.5" width="15" height="11" rx="2.5" stroke={t.text} strokeWidth="1.5" />
          <rect x="2" y="2" width="10" height="8" rx="1.5" fill={t.primary} />
          <path d="M16.5 4.5V7.5C17.3 7.2 17.3 4.8 16.5 4.5Z" fill={t.textMuted} />
        </svg>
      </div>
    </div>
  );

  // ─── Dynamic Island ────────────────────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 6 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
    </div>
  );

  // ─── Bottom Nav ───────────────────────────────────────────────────────────
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'choose', label: 'Choose', icon: '🎲' },
    { id: 'map', label: 'Kitchen', icon: '🗺️' },
    { id: 'garden', label: 'Garden', icon: '🌱' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const BottomNav = () => (
    <div style={{ display: 'flex', background: t.navBg, borderTop: `1px solid ${t.navBorder}`, padding: '8px 0 16px', position: 'absolute', bottom: 0, left: 0, right: 0, borderRadius: '0 0 48px 48px' }}>
      {navItems.map(item => {
        const active = activeTab === item.id;
        return (
          <div key={item.id} onClick={() => { press(item.id, () => setActiveTab(item.id)); if (item.id === 'choose') resetGame(); }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer',
              transform: pressed === item.id ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s' }}>
            <div style={{ width: 44, height: 30, borderRadius: 15, background: active ? t.primaryLight : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, fontFamily: font, transition: 'color 0.2s' }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );

  // ─── Home Screen ──────────────────────────────────────────────────────────
  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 80px' }}>
      {/* Header */}
      <div style={{ padding: '8px 20px 16px', background: t.primaryGrad, borderRadius: '0 0 28px 28px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font, fontWeight: 500 }}>Good afternoon,</p>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: font, lineHeight: 1.1 }}>Mia! 👋</h1>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 14, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>🔥</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: font }}>{streak} day streak!</span>
          </div>
        </div>
        {/* Snack rule */}
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🍽️</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: font, fontWeight: 500 }}>Snack allowance today</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              {[...Array(snackLimit)].map((_, i) => (
                <div key={i} style={{ width: 28, height: 10, borderRadius: 5, background: i < snacksUsed ? 'rgba(255,255,255,0.4)' : '#fff', transition: 'background 0.3s' }} />
              ))}
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: font, marginLeft: 4 }}>{snackLimit - snacksUsed} remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Big CTA */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div onClick={() => { press('hungry', () => setActiveTab('choose')); resetGame(); }}
          style={{ background: t.primaryGrad, borderRadius: 22, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            transform: pressed === 'hungry' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s',
            boxShadow: `0 8px 24px ${t.shadow}` }}>
          <div style={{ width: 58, height: 58, background: 'rgba(255,255,255,0.25)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 30 }}>🌟</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: font }}>I'm Hungry!</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: font, marginTop: 2 }}>Let's find your perfect snack →</p>
          </div>
        </div>
      </div>

      {/* Today's Suggestions */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font }}>Suggested for You</h2>
          <span style={{ fontSize: 12, color: t.primary, fontWeight: 700, fontFamily: font }}>See all</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {snackCombos.slice(0, 3).map(combo => (
            <div key={combo.id} style={{ flex: '0 0 140px', background: t.surface, borderRadius: 18, padding: '14px 12px', border: `1.5px solid ${t.border}`,
              boxShadow: `0 2px 8px ${t.shadowMd}`, cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }}>{combo.emoji}</div>
              <p style={{ fontSize: 12, fontWeight: 800, color: t.text, fontFamily: font, lineHeight: 1.3, marginBottom: 4 }}>{combo.name}</p>
              <p style={{ fontSize: 10, color: t.textMuted, fontFamily: font, lineHeight: 1.3 }}>{combo.desc}</p>
              <div style={{ marginTop: 8, background: combo.color + '22', borderRadius: 8, padding: '3px 7px', display: 'inline-block' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: combo.color, fontFamily: font }}>Balanced!</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Grab */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font, marginBottom: 12 }}>Quick Grab 🏃</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {pantryItems.slice(0, 4).map(item => (
            <div key={item.id} style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1.5px solid ${t.border}` }}>
              <span style={{ fontSize: 22 }}>{item.emoji}</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: t.text, fontFamily: font }}>{item.name}</p>
                <p style={{ fontSize: 10, color: t.textMuted, fontFamily: font, textTransform: 'capitalize' }}>{item.location.replace('-', ' ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Choose Screen (Decision Game) ────────────────────────────────────────
  const ChooseScreen = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 0 80px' }}>
      <div style={{ padding: '12px 20px 16px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: t.text, fontFamily: font }}>🎲 Pick Your Snack</h1>
        <p style={{ fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 3 }}>Answer a few questions and we'll find your perfect match!</p>
      </div>

      {/* Progress dots */}
      {!gameResult && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          {questions.map((_, i) => (
            <div key={i} style={{ width: i === gameStep ? 24 : 8, height: 8, borderRadius: 4,
              background: i < gameStep ? t.primary : i === gameStep ? t.primary : t.border,
              transition: 'all 0.3s', opacity: i < gameStep ? 0.5 : 1 }} />
          ))}
        </div>
      )}

      {!gameResult ? (
        <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: animIn ? 1 : 0, transform: animIn ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.25s' }}>
          {/* Question card */}
          <div style={{ background: t.surface, borderRadius: 24, padding: 24, width: '100%', marginBottom: 24,
            border: `1.5px solid ${t.border}`, boxShadow: `0 4px 20px ${t.shadowMd}`, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{questions[gameStep].emoji}</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, fontFamily: font, lineHeight: 1.3 }}>{questions[gameStep].q}</h2>
            <p style={{ fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 6 }}>Question {gameStep + 1} of {questions.length}</p>
          </div>
          {/* Answer options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            {questions[gameStep].opts.map(opt => (
              <div key={opt.val} onClick={() => handleAnswer(questions[gameStep].key, opt.val)}
                style={{ background: t.surface, border: `2px solid ${t.border}`, borderRadius: 20, padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
                  boxShadow: `0 2px 8px ${t.shadowMd}`,
                  transform: pressed === opt.val ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.15s' }}
                onMouseDown={() => setPressed(opt.val)} onMouseUp={() => setPressed(null)}>
                <div style={{ width: 52, height: 52, background: t.primaryLight, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{opt.emoji}</div>
                <span style={{ fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font }}>{opt.label}</span>
                <div style={{ marginLeft: 'auto', width: 28, height: 28, borderRadius: 10, background: t.primaryLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 14, color: t.primary }}>→</span>
                </div>
              </div>
            ))}
          </div>
          {/* Skip */}
          <p onClick={resetGame} style={{ marginTop: 20, fontSize: 12, color: t.textMuted, fontFamily: font, cursor: 'pointer', textDecoration: 'underline' }}>Start over</p>
        </div>
      ) : (
        /* Result */
        <div style={{ flex: 1, padding: '0 20px', opacity: animIn ? 1 : 0, transition: 'opacity 0.25s' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 52, marginBottom: 8 }}>🎉</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: t.text, fontFamily: font }}>Perfect Matches!</h2>
            <p style={{ fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 4 }}>Based on your choices – enjoy!</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {gameResult.map(combo => (
              <div key={combo.id} style={{ background: t.surface, borderRadius: 22, padding: 18, border: `2px solid ${combo.color}33`,
                boxShadow: `0 4px 16px ${t.shadowMd}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 60, height: 60, background: combo.color + '22', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{combo.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, fontWeight: 800, color: t.text, fontFamily: font }}>{combo.name}</p>
                    <p style={{ fontSize: 12, color: t.textSecondary, fontFamily: font, marginTop: 2 }}>{combo.desc}</p>
                  </div>
                </div>
                {/* items in combo */}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {combo.items.map(itemId => {
                    const item = pantryItems.find(p => p.id === itemId);
                    if (!item) return null;
                    return (
                      <div key={itemId} style={{ background: t.surfaceAlt, borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 14 }}>{item.emoji}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, fontFamily: font }}>{item.name}</span>
                        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: font }}>· {item.location.replace('-', ' ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div onClick={resetGame} style={{ background: t.primaryGrad, borderRadius: 18, padding: '16px', textAlign: 'center', cursor: 'pointer',
            transform: pressed === 'tryagain' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}
            onMouseDown={() => setPressed('tryagain')} onMouseUp={() => setPressed(null)}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: font }}>🔄 Try Different Choices</span>
          </div>
        </div>
      )}
    </div>
  );

  // ─── Kitchen Map ──────────────────────────────────────────────────────────
  const MapScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 80px' }}>
      <div style={{ padding: '12px 20px 16px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: t.text, fontFamily: font }}>🗺️ Kitchen Map</h1>
        <p style={{ fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 3 }}>Tap a spot to see what's inside!</p>
      </div>

      {/* Kitchen visual */}
      <div style={{ margin: '0 20px 20px', background: t.surface, borderRadius: 24, padding: 20, border: `1.5px solid ${t.border}`, boxShadow: `0 2px 12px ${t.shadowMd}` }}>
        {/* Kitchen zones */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          {kitchenZones.map(zone => (
            <div key={zone.id} onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}
              style={{ background: selectedZone?.id === zone.id ? zone.color + '22' : t.surfaceAlt,
                border: `2px solid ${selectedZone?.id === zone.id ? zone.color : t.border}`,
                borderRadius: 18, padding: '16px 14px', cursor: 'pointer', transition: 'all 0.2s',
                gridColumn: zone.id === 'fridge' ? 'span 2' : 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 42, height: 42, background: zone.color + '22', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{zone.emoji}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: t.text, fontFamily: font }}>{zone.label}</p>
                  <p style={{ fontSize: 11, color: t.textMuted, fontFamily: font }}>{zone.items.length} snacks inside</p>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 16, color: zone.color, transform: selectedZone?.id === zone.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</div>
              </div>

              {selectedZone?.id === zone.id && (
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {zone.items.map(itemId => {
                    const item = pantryItems.find(p => p.id === itemId);
                    if (!item) return null;
                    return (
                      <div key={itemId} style={{ background: t.surface, borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${t.border}` }}>
                        <span style={{ fontSize: 16 }}>{item.emoji}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: t.text, fontFamily: font }}>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ background: t.surfaceAlt, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>💡</span>
          <p style={{ fontSize: 12, color: t.textSecondary, fontFamily: font, fontWeight: 500 }}>Always ask a grown-up before opening the fridge alone!</p>
        </div>
      </div>

      {/* All items list */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font, marginBottom: 12 }}>All Available Snacks</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pantryItems.map(item => {
            const zone = kitchenZones.find(z => z.id === item.location);
            return (
              <div key={item.id} style={{ background: t.surface, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, border: `1.5px solid ${t.border}` }}>
                <span style={{ fontSize: 22 }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font }}>{item.name}</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                    <span style={{ fontSize: 10, color: t.textMuted, fontFamily: font, background: t.surfaceAlt, borderRadius: 6, padding: '1px 6px', fontWeight: 600 }}>{item.taste}</span>
                    <span style={{ fontSize: 10, color: t.textMuted, fontFamily: font, background: t.surfaceAlt, borderRadius: 6, padding: '1px 6px', fontWeight: 600 }}>{item.texture}</span>
                  </div>
                </div>
                <div style={{ background: (zone?.color || t.primary) + '22', borderRadius: 10, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 12 }}>{zone?.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: zone?.color || t.primary, fontFamily: font }}>{zone?.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ─── Garden Screen ────────────────────────────────────────────────────────
  const GardenScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 80px' }}>
      {/* Header */}
      <div style={{ background: t.primaryGrad, padding: '12px 20px 20px', borderRadius: '0 0 28px 28px', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: font }}>🌱 My Garden</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: font, marginTop: 2 }}>Try new snacks to help your sprouts grow!</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '10px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: font }}>{streak}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: font }}>Day Streak 🔥</p>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '10px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: font }}>12</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: font }}>Snacks Tried 🌟</p>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '10px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: font }}>4</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: font }}>Sprouts 🌿</p>
          </div>
        </div>
      </div>

      {/* Characters */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font, marginBottom: 12 }}>Your Sprout Squad</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {gardenCharacters.map(char => {
            const locked = char.category === 'locked';
            const progress = (char.xp / 100) * 100;
            return (
              <div key={char.id} onClick={() => !locked && setSelectedChar(selectedChar?.id === char.id ? null : char)}
                style={{ background: locked ? t.surfaceAlt : t.surface, borderRadius: 20, padding: '16px 14px',
                  border: `2px solid ${selectedChar?.id === char.id ? char.color : t.border}`,
                  cursor: locked ? 'default' : 'pointer', opacity: locked ? 0.6 : 1, transition: 'all 0.2s',
                  boxShadow: selectedChar?.id === char.id ? `0 4px 16px ${char.color}33` : `0 2px 8px ${t.shadowMd}` }}>
                <div style={{ textAlign: 'center', fontSize: 38, marginBottom: 8, filter: locked ? 'grayscale(1)' : 'none' }}>{locked ? '🔒' : char.emoji}</div>
                <p style={{ fontSize: 13, fontWeight: 800, color: t.text, fontFamily: font, textAlign: 'center' }}>{char.name}</p>
                <p style={{ fontSize: 11, color: t.textMuted, fontFamily: font, textAlign: 'center', marginBottom: 8 }}>{char.role}</p>
                {!locked && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: t.textMuted, fontFamily: font }}>Level {char.level}</span>
                      <span style={{ fontSize: 10, color: char.color, fontFamily: font, fontWeight: 700 }}>Lv {char.level}/{char.maxLevel}</span>
                    </div>
                    <div style={{ height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: char.color, borderRadius: 3, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                )}
                {locked && <p style={{ fontSize: 10, color: t.textMuted, fontFamily: font, textAlign: 'center' }}>Try 3 new foods to unlock!</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Tried */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font }}>Recently Tried 🎖️</h2>
          <div style={{ background: t.primaryLight, borderRadius: 10, padding: '4px 10px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.primary, fontFamily: font }}>+ Log New</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['🍎 Apple', '🫙 Hummus', '🥕 Carrots'].map((item, i) => (
            <div key={i} style={{ background: t.surface, borderRadius: 12, padding: '8px 12px', border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>{item.split(' ')[0]}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: t.text, fontFamily: font }}>{item.split(' ')[1]}</span>
              <span style={{ fontSize: 12, color: t.primary }}>✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Settings Screen ──────────────────────────────────────────────────────
  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 80px' }}>
      <div style={{ padding: '12px 20px 16px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: t.text, fontFamily: font }}>⚙️ Settings</h1>
      </div>

      {/* Child profile */}
      <div style={{ margin: '0 20px 16px', background: t.surface, borderRadius: 22, padding: 18, border: `1.5px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, background: t.primaryGrad, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👧</div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: t.text, fontFamily: font }}>Mia</p>
            <p style={{ fontSize: 13, color: t.textSecondary, fontFamily: font }}>Age 7 · Snack Explorer 🌟</p>
          </div>
          <div style={{ marginLeft: 'auto', background: t.primaryLight, borderRadius: 12, padding: '6px 12px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.primary, fontFamily: font }}>Edit</span>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div style={{ margin: '0 20px 16px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Appearance</p>
        <div style={{ background: t.surface, borderRadius: 18, border: `1.5px solid ${t.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{themeName === 'light' ? '☀️' : '🌙'}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font }}>Theme</p>
                <p style={{ fontSize: 12, color: t.textMuted, fontFamily: font }}>{themeName === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
              </div>
            </div>
            <div onClick={() => setThemeName(themeName === 'light' ? 'dark' : 'light')}
              style={{ width: 52, height: 30, borderRadius: 15, background: themeName === 'dark' ? t.primary : t.border,
                position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
              <div style={{ position: 'absolute', top: 3, left: themeName === 'dark' ? 24 : 3, width: 24, height: 24, background: '#fff', borderRadius: 12, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Snack rules */}
      <div style={{ margin: '0 20px 16px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Snack Rules</p>
        <div style={{ background: t.surface, borderRadius: 18, border: `1.5px solid ${t.border}`, overflow: 'hidden' }}>
          {[
            { label: 'Daily Snack Limit', value: '2 snacks', emoji: '📊' },
            { label: 'No Snacks After', value: '7:00 PM', emoji: '🌙' },
            { label: 'Before-Dinner Rule', value: '1 snack max', emoji: '🍽️' },
          ].map((rule, i, arr) => (
            <div key={i} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{rule.emoji}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font }}>{rule.label}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: font }}>{rule.value}</span>
                <span style={{ fontSize: 12, color: t.textMuted }}>›</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div style={{ margin: '0 20px 16px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Allergies & Restrictions</p>
        <div style={{ background: t.surface, borderRadius: 18, border: `1.5px solid ${t.border}`, padding: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {allergies.map((a, i) => (
              <div key={i} style={{ background: t.dangerLight, borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12 }}>⚠️</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: t.danger, fontFamily: font }}>{a}</span>
              </div>
            ))}
          </div>
          <div style={{ background: t.primaryLight, borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: font }}>+ Add Allergy</span>
          </div>
        </div>
      </div>

      {/* Parent lock */}
      <div style={{ margin: '0 20px 16px' }}>
        <div style={{ background: t.surfaceAlt, borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, border: `1.5px solid ${t.border}` }}>
          <span style={{ fontSize: 22 }}>🔒</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font }}>Parent Mode</p>
            <p style={{ fontSize: 12, color: t.textMuted, fontFamily: font }}>PIN protected · Manage pantry & rules</p>
          </div>
          <div style={{ background: t.primary, borderRadius: 12, padding: '6px 14px', cursor: 'pointer' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: font }}>Unlock</span>
          </div>
        </div>
      </div>

      {/* App info */}
      <div style={{ margin: '0 20px', textAlign: 'center', padding: '8px 0' }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: t.primary, fontFamily: font }}>🌱 SnackSprout</p>
        <p style={{ fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 }}>Version 1.0 · Turns kid hunger into smart choices.</p>
      </div>
    </div>
  );

  // ─── Screen Router ────────────────────────────────────────────────────────
  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'choose': return <ChooseScreen />;
      case 'map': return <MapScreen />;
      case 'garden': return <GardenScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  // ─── Root Render ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1a, 0 0 0 11px #333, inset 0 0 0 2px rgba(255,255,255,0.05)',
        transition: 'background 0.3s' }}>

        {/* Status Bar */}
        <StatusBar />
        {/* Dynamic Island */}
        <DynamicIsland />

        {/* Main scrollable content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', position: 'relative' }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}
