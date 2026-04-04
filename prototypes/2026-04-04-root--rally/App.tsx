const { useState, useEffect } = React;

const themes = {
  light: {
    bg: '#FAF7F0',
    surface: '#FFFFFF',
    surfaceAlt: '#F5EFE0',
    primary: '#3D6B1F',
    primaryLight: '#5A8F35',
    secondary: '#C4622D',
    accent: '#F0A500',
    accentLight: '#FFCF50',
    text: '#1A1A0F',
    textMuted: '#7A7A5A',
    border: '#E5DDD0',
    shadow: 'rgba(61,107,31,0.12)',
    podiumBg: 'rgba(61,107,31,0.08)',
  },
  dark: {
    bg: '#1C2214',
    surface: '#26311C',
    surfaceAlt: '#2F3D22',
    primary: '#8CC94A',
    primaryLight: '#A8E06A',
    secondary: '#E07A4A',
    accent: '#F5B820',
    accentLight: '#FFCF50',
    text: '#F0EDE6',
    textMuted: '#9A9A7A',
    border: '#3D4D2A',
    shadow: 'rgba(0,0,0,0.3)',
    podiumBg: 'rgba(140,201,74,0.08)',
  }
};

function PantryPalAvatar({ t, mood = 'happy', size = 110 }) {
  const moodMap = {
    happy:   { face: '😊', bodyA: '#4A7A22', bodyB: '#6BAA30', leafA: '#3D6B1F', leafB: '#5A8C28', glow: '#F0A500' },
    excited: { face: '🤩', bodyA: '#F0A500', bodyB: '#FFCF50', leafA: '#3D6B1F', leafB: '#5A8C28', glow: '#F0A500' },
    curious: { face: '🤔', bodyA: '#5A8F35', bodyB: '#7AB84A', leafA: '#3D6B1F', leafB: '#5A8C28', glow: '#5A8F35' },
    proud:   { face: '😎', bodyA: '#C4622D', bodyB: '#E07A4A', leafA: '#3D6B1F', leafB: '#5A8C28', glow: '#C4622D' },
  };
  const m = moodMap[mood] || moodMap.happy;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <div style={{
        position: 'absolute', top: -10, left: -10, right: -10, bottom: -10,
        borderRadius: '50%',
        background: m.glow,
        opacity: 0.18,
        filter: 'blur(14px)',
      }} />
      {/* Leaves */}
      <div style={{
        position: 'absolute', top: -size * 0.14, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '3px', alignItems: 'flex-end',
        zIndex: 2,
      }}>
        <div style={{ width: size * 0.14, height: size * 0.22, background: m.leafA, borderRadius: '50% 10% 50% 10%', transform: 'rotate(-25deg)', transformOrigin: 'bottom center' }} />
        <div style={{ width: size * 0.18, height: size * 0.28, background: m.leafB, borderRadius: '50% 10% 50% 10%', transform: 'rotate(5deg)', transformOrigin: 'bottom center' }} />
        <div style={{ width: size * 0.14, height: size * 0.22, background: m.leafA, borderRadius: '10% 50% 10% 50%', transform: 'rotate(25deg)', transformOrigin: 'bottom center' }} />
      </div>
      {/* Body */}
      <div style={{
        position: 'absolute',
        top: size * 0.1, left: 0, right: 0,
        height: size * 0.9,
        borderRadius: '50% 50% 44% 44%',
        background: `linear-gradient(145deg, ${m.bodyA}, ${m.bodyB})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 8px 24px ${m.bodyA}55`,
        zIndex: 1,
      }}>
        <span style={{ fontSize: size * 0.42, lineHeight: 1 }}>{m.face}</span>
      </div>
      {/* Cheeks */}
      <div style={{ position: 'absolute', top: '58%', left: '12%', width: size * 0.15, height: size * 0.1, background: 'rgba(255,150,100,0.35)', borderRadius: '50%', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: '58%', right: '12%', width: size * 0.15, height: size * 0.1, background: 'rgba(255,150,100,0.35)', borderRadius: '50%', zIndex: 2 }} />
    </div>
  );
}

function TopBar({ t, title, theme, setTheme, setActiveScreen, showBack = false }) {
  const ArrowLeft = window.lucide ? window.lucide.ArrowLeft : null;
  const SunIcon = window.lucide ? window.lucide.Sun : null;
  const MoonIcon = window.lucide ? window.lucide.Moon : null;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px',
      background: t.surface,
      borderBottom: `1px solid ${t.border}`,
      flexShrink: 0,
    }}>
      {showBack ? (
        <button onClick={() => setActiveScreen('home')} style={{
          background: t.surfaceAlt, border: 'none', cursor: 'pointer',
          borderRadius: '12px', width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 18, color: t.text }}>←</span>
          {ArrowLeft && <ArrowLeft size={18} color={t.text} style={{ display: 'none' }} />}
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: 22 }}>🌱</span>
          <span style={{ fontWeight: 800, fontSize: 17, color: t.primary, fontFamily: "'Rubik', sans-serif" }}>Root & Rally</span>
        </div>
      )}

      {title ? (
        <span style={{ fontWeight: 700, fontSize: 16, color: t.text, fontFamily: "'Rubik', sans-serif" }}>{title}</span>
      ) : <div style={{ width: 36 }} />}

      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{
          background: t.surfaceAlt, border: 'none', cursor: 'pointer',
          borderRadius: '12px', width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomeScreen({ t, theme, setTheme, setActiveScreen }) {
  const [palMood, setPalMood] = useState('happy');
  const [pressedCard, setPressedCard] = useState(null);
  const moods = ['happy', 'excited', 'curious', 'proud'];

  useEffect(() => {
    const interval = setInterval(() => {
      setPalMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const palQuips = {
    happy: "Feeling great about your choices today!",
    excited: "Ooh! A new quest just unlocked for you!",
    curious: "What delicious thing will you cook today?",
    proud: "I'm so proud of your eco-streak! 🔥",
  };

  const navCards = [
    { id: 'quests',    label: 'Flavor Quests',  emoji: '⚡', badge: '3 active',    color: '#F0A500', bgAlpha: '20' },
    { id: 'bounty',    label: 'Local Bounty',   emoji: '📍', badge: '5 nearby',    color: '#C4622D', bgAlpha: '18' },
    { id: 'roulette',  label: "Dinner?",        emoji: '🎲', badge: 'Roll now',    color: '#5A8F35', bgAlpha: '18' },
    { id: 'community', label: 'Community',      emoji: '🏆', badge: '#4 this week', color: '#9B7FD4', bgAlpha: '20' },
  ];

  const todayWins = [
    { icon: '🥕', text: 'Used 3 veggies before expiry', pts: '+50' },
    { icon: '🛒', text: 'Shopped at Greenfield Market', pts: '+100' },
    { icon: '🍲', text: 'Cooked from pantry · zero waste', pts: '+75' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg }}>
      <TopBar t={t} title="" theme={theme} setTheme={setTheme} setActiveScreen={setActiveScreen} />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Pal Hero */}
        <div style={{
          background: `linear-gradient(180deg, ${t.surface} 0%, ${t.bg} 100%)`,
          padding: '24px 20px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
            Your Pantry Pal
          </div>
          <PantryPalAvatar t={t} mood={palMood} size={118} />
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 21, fontWeight: 800, color: t.text }}>Fern 🌿</div>
            <div style={{
              fontSize: 13, color: t.textMuted, marginTop: 4,
              background: t.surfaceAlt, display: 'inline-block',
              padding: '4px 14px', borderRadius: 20,
            }}>
              {palQuips[palMood]}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' }}>
            {[
              { label: 'EcoPoints', value: '1,240', emoji: '🌱' },
              { label: 'Day Streak', value: '12',    emoji: '🔥' },
              { label: 'Pal Mood',   value: '94%',   emoji: '💚' },
            ].map(s => (
              <div key={s.label} style={{
                background: t.surface, borderRadius: 16, padding: '10px 12px',
                textAlign: 'center', border: `1px solid ${t.border}`, minWidth: 88,
              }}>
                <div style={{ fontSize: 20 }}>{s.emoji}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: t.text, marginTop: 2 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hub Nav Cards */}
        <div style={{ padding: '4px 18px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Explore
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {navCards.map(card => (
              <button
                key={card.id}
                onClick={() => setActiveScreen(card.id)}
                onMouseDown={() => setPressedCard(card.id)}
                onMouseUp={() => setPressedCard(null)}
                onTouchStart={() => setPressedCard(card.id)}
                onTouchEnd={() => setPressedCard(null)}
                style={{
                  background: t.surface,
                  border: `1.5px solid ${t.border}`,
                  borderRadius: 20,
                  padding: '16px 14px',
                  cursor: 'pointer', textAlign: 'left',
                  transform: pressedCard === card.id ? 'scale(0.95)' : 'scale(1)',
                  transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                  boxShadow: pressedCard === card.id ? 'none' : `0 3px 10px ${t.shadow}`,
                  fontFamily: "'Rubik', sans-serif",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 5 }}>
                  <span>{card.label}</span>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: card.color,
                  background: `${card.color}${card.bgAlpha}`,
                  borderRadius: 8, padding: '3px 8px',
                  display: 'inline-block',
                }}>
                  <span>{card.badge}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Wins */}
        <div style={{ padding: '18px 18px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Today's Wins
          </div>
          <div style={{
            background: t.surface, borderRadius: 20,
            padding: '14px 16px', border: `1px solid ${t.border}`,
          }}>
            {todayWins.map((win, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                paddingBottom: i < 2 ? 12 : 0,
                borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
                marginBottom: i < 2 ? 12 : 0,
              }}>
                <span style={{ fontSize: 22 }}>{win.icon}</span>
                <span style={{ flex: 1, fontSize: 13, color: t.text, fontWeight: 500 }}>{win.text}</span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: t.primary,
                  background: `${t.primary}15`, borderRadius: 8, padding: '2px 8px',
                }}>{win.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── QUESTS ───────────────────────────────────────────────────────────────────

function QuestsScreen({ t, theme, setTheme, setActiveScreen }) {
  const [activeCategory, setActiveCategory] = useState('active');
  const [expandedId, setExpandedId] = useState(null);

  const categories = [
    { id: 'active',    label: 'Active',    count: 3 },
    { id: 'daily',     label: 'Daily',     count: 5 },
    { id: 'weekly',    label: 'Weekly',    count: 2 },
    { id: 'seasonal',  label: 'Seasonal',  count: 4 },
    { id: 'completed', label: 'Done ✓',   count: 18 },
  ];

  const allQuests = {
    active: [
      { id: 1, title: 'Zero Zucchini Waste',  emoji: '🥒', progress: 66,  reward: 150, daysLeft: 2, desc: 'Use up all your zucchini before Friday. Try stir-fries, fritters, or add them raw to salads!' },
      { id: 2, title: 'Market Explorer',       emoji: '🏪', progress: 50,  reward: 200, daysLeft: 4, desc: 'Visit 2 local farmers markets this week and check in to earn bonus EcoPoints.' },
      { id: 3, title: 'Bean Counter',          emoji: '🫘', progress: 33,  reward: 120, daysLeft: 5, desc: 'Cook 3 legume-based meals this week — lentils, chickpeas, and black beans all count!' },
    ],
    daily: [
      { id: 4, title: 'Log Your Lunch',    emoji: '📝', progress: 0,   reward: 30,  daysLeft: 0, desc: 'Document what you ate for lunch to help Fern learn your taste preferences.' },
      { id: 5, title: 'Expiry Check',      emoji: '🔍', progress: 100, reward: 20,  daysLeft: 0, desc: 'Open your pantry and review which items are expiring soon. Prevention is the best recipe!' },
      { id: 6, title: 'Hydration Hero',    emoji: '💧', progress: 100, reward: 15,  daysLeft: 0, desc: 'Use only your reusable bottle today — every small habit adds up.' },
      { id: 7, title: 'Seasonal Bite',     emoji: '🌾', progress: 0,   reward: 40,  daysLeft: 0, desc: 'Eat one locally seasonal ingredient today. Check your bounty map for what\'s available!' },
      { id: 8, title: 'Share the Love',    emoji: '💌', progress: 0,   reward: 25,  daysLeft: 0, desc: 'Share a recipe or food tip with a friend in the community.' },
    ],
    weekly: [
      { id: 9,  title: 'Composting Champ', emoji: '♻️', progress: 80, reward: 300, daysLeft: 2, desc: 'Compost your food scraps at least 5 days this week. Even small amounts make a difference!' },
      { id: 10, title: 'New Ingredient',   emoji: '✨', progress: 0,  reward: 175, daysLeft: 6, desc: 'Try a completely new ingredient this week — something you\'ve never cooked before.' },
    ],
    seasonal: [
      { id: 11, title: 'Spring Harvest',     emoji: '🌸', progress: 60, reward: 500, daysLeft: 14, desc: 'Cook 5 meals featuring spring vegetables — asparagus, peas, and fresh herbs are in season!' },
      { id: 12, title: 'Berry Blitz',        emoji: '🫐', progress: 33, reward: 400, daysLeft: 20, desc: 'Pick or purchase local berries 3 times this season. Support local berry farms!' },
      { id: 13, title: 'Community Garden',   emoji: '🌻', progress: 0,  reward: 600, daysLeft: 25, desc: 'Join a community garden event this season and get your hands in the soil.' },
      { id: 14, title: 'Fermentation Fun',   emoji: '🫙', progress: 0,  reward: 450, daysLeft: 30, desc: 'Make your own fermented food — kimchi, kefir, or sourdough are great starters!' },
    ],
    completed: [],
  };

  const quests = allQuests[activeCategory] || [];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg }}>
      <TopBar t={t} title="Quests" theme={theme} setTheme={setTheme} setActiveScreen={setActiveScreen} showBack />

      {/* EcoPoints Banner */}
      <div style={{
        background: `linear-gradient(130deg, ${t.primary}, ${t.primaryLight})`,
        padding: '12px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>Your EcoPoints</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>1,240 🌱</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>This week</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>+345 ↑</div>
        </div>
      </div>

      {/* Category Horizontal Scroll */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div style={{ overflowX: 'auto', display: 'flex', gap: 8, padding: '12px 18px' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flexShrink: 0,
                padding: '8px 16px',
                borderRadius: 20,
                border: activeCategory === cat.id ? 'none' : `1px solid ${t.border}`,
                background: activeCategory === cat.id ? t.primary : t.surfaceAlt,
                color: activeCategory === cat.id ? '#fff' : t.text,
                fontWeight: 600, fontSize: 13,
                cursor: 'pointer',
                fontFamily: "'Rubik', sans-serif",
                transition: 'background 0.15s',
              }}
            >
              <span>{cat.label}</span>
              <span style={{ opacity: 0.65, marginLeft: 4 }}>({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quest List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
        {quests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
            <div style={{ fontWeight: 700, fontSize: 19, color: t.text }}>All caught up!</div>
            <div style={{ fontSize: 14, color: t.textMuted, marginTop: 8 }}>Check back tomorrow for new quests.</div>
          </div>
        )}
        {quests.map(q => (
          <div
            key={q.id}
            onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
            style={{
              background: t.surface,
              borderRadius: 20, padding: '15px',
              marginBottom: 10,
              border: `1px solid ${q.progress === 100 ? t.primary : t.border}`,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 46, height: 46, borderRadius: 14,
                background: q.progress === 100 ? `${t.primary}20` : t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }}>
                {q.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: t.text }}>
                      <span>{q.title}</span>
                    </div>
                    <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, fontWeight: 500 }}>
                      {q.daysLeft > 0 ? `${q.daysLeft} days left` : 'Today only'}
                    </div>
                  </div>
                  <div style={{
                    background: `${t.accent}22`, color: t.accent,
                    fontWeight: 700, fontSize: 12,
                    padding: '3px 9px', borderRadius: 10, flexShrink: 0,
                  }}>
                    +{q.reward} 🌱
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Progress</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: q.progress === 100 ? t.primary : t.text }}>{q.progress}%</span>
                  </div>
                  <div style={{ height: 6, background: t.border, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      width: `${q.progress}%`, height: '100%',
                      background: q.progress === 100
                        ? t.primary
                        : `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
                      borderRadius: 4, transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>

                {expandedId === q.id && (
                  <div style={{ marginTop: 12, padding: '10px 12px', background: t.surfaceAlt, borderRadius: 12 }}>
                    <p style={{ fontSize: 13, color: t.text, margin: 0, lineHeight: 1.55 }}>{q.desc}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOCAL BOUNTY ─────────────────────────────────────────────────────────────

function BountyScreen({ t, theme, setTheme, setActiveScreen }) {
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const [checkedIn, setCheckedIn] = useState([2]);

  const spotTypes = ['All', 'Farmers Market', 'Community Garden', 'Food Rescue', 'Gleaning', 'Compost Drop-off'];

  const spots = [
    { id: 1, name: 'Greenfield Farmers Market', type: 'Farmers Market',    dist: '0.3 mi', emoji: '🏪', pts: 150, desc: 'Every Saturday 8am–2pm. 40+ local vendors. Seasonal produce, baked goods & more.', pinX: 75,  pinY: 55  },
    { id: 2, name: 'Community Compost Hub',      type: 'Compost Drop-off', dist: '0.7 mi', emoji: '♻️', pts: 80,  desc: 'Drop off food scraps anytime. Accepts most organic waste. Finished compost available in spring.', pinX: 190, pinY: 95  },
    { id: 3, name: 'Maple Street Garden',        type: 'Community Garden', dist: '1.2 mi', emoji: '🌻', pts: 120, desc: 'Volunteer plots available. Shared harvests every Sunday. Beginner-friendly.', pinX: 255, pinY: 48  },
    { id: 4, name: 'FoodShare Rescue',            type: 'Food Rescue',     dist: '1.8 mi', emoji: '🤝', pts: 200, desc: 'Volunteer to rescue surplus food from local restaurants and deliver to shelters.', pinX: 315, pinY: 125 },
    { id: 5, name: 'Riverside Gleaning Co.',      type: 'Gleaning',        dist: '3.1 mi', emoji: '🌾', pts: 300, desc: 'Weekly harvest events collecting unharvested farm produce. All welcome. Gloves provided.', pinX: 130, pinY: 148 },
  ];

  const filtered = filter === 'All' ? spots : spots.filter(s => s.type === filter);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg }}>
      <TopBar t={t} title="Local Bounty" theme={theme} setTheme={setTheme} setActiveScreen={setActiveScreen} showBack />

      {/* Map */}
      <div style={{
        height: 185, flexShrink: 0,
        background: theme === 'light'
          ? 'linear-gradient(135deg, #E8F2D8 0%, #D4E8C4 60%, #C0D8A8 100%)'
          : 'linear-gradient(135deg, #1C2C14 0%, #243820 60%, #1A2E18 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Map grid */}
        <svg width="375" height="185" style={{ position: 'absolute', top: 0, left: 0 }}>
          {[0,1,2,3].map(i => <line key={`h${i}`} x1="0" y1={i*46} x2="375" y2={i*46} stroke="rgba(61,107,31,0.12)" strokeWidth="1" />)}
          {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*54} y1="0" x2={i*54} y2="185" stroke="rgba(61,107,31,0.12)" strokeWidth="1" />)}
          {/* Roads */}
          <path d="M0,95 Q90,75 200,95 T375,82" stroke="rgba(255,255,255,0.55)" strokeWidth="9" fill="none" />
          <path d="M145,0 Q162,92 138,185" stroke="rgba(255,255,255,0.55)" strokeWidth="7" fill="none" />
          <path d="M0,145 Q80,155 180,140 T375,150" stroke="rgba(255,255,255,0.4)" strokeWidth="5" fill="none" />
        </svg>

        {/* Pins */}
        {spots.map(spot => {
          const isChecked = checkedIn.includes(spot.id);
          return (
            <div
              key={spot.id}
              onClick={() => setSelectedId(selectedId === spot.id ? null : spot.id)}
              style={{
                position: 'absolute', left: spot.pinX, top: spot.pinY,
                width: 34, height: 34,
                background: isChecked ? '#fff' : (spot.type === 'Farmers Market' ? t.secondary : spot.type === 'Community Garden' ? t.primary : t.accent),
                border: isChecked ? `3px solid ${t.primary}` : 'none',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg) translate(-50%, -50%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                cursor: 'pointer',
                zIndex: selectedId === spot.id ? 5 : 1,
              }}
            >
              <span style={{ transform: 'rotate(45deg)', fontSize: 13 }}>{spot.emoji}</span>
            </div>
          );
        })}

        {/* My location dot */}
        <div style={{
          position: 'absolute', left: '50%', top: '52%',
          transform: 'translate(-50%, -50%)',
          width: 14, height: 14,
          background: '#4A90E2', borderRadius: '50%',
          border: '3px solid #fff',
          boxShadow: '0 0 0 7px rgba(74,144,226,0.22)',
          zIndex: 3,
        }} />

        <div style={{
          position: 'absolute', bottom: 8, right: 10,
          background: 'rgba(255,255,255,0.88)',
          padding: '3px 10px', borderRadius: 10,
          fontSize: 11, fontWeight: 600, color: '#3D6B1F',
        }}>
          📍 Your location
        </div>
      </div>

      {/* Filter Horizontal Scroll */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div style={{ overflowX: 'auto', display: 'flex', gap: 8, padding: '10px 18px' }}>
          {spotTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                flexShrink: 0, padding: '6px 14px', borderRadius: 16,
                border: filter === type ? 'none' : `1px solid ${t.border}`,
                background: filter === type ? t.secondary : t.surfaceAlt,
                color: filter === type ? '#fff' : t.text,
                fontWeight: 600, fontSize: 12,
                cursor: 'pointer', fontFamily: "'Rubik', sans-serif",
              }}
            >
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Spots List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
        {filtered.map(spot => {
          const isChecked = checkedIn.includes(spot.id);
          return (
            <div
              key={spot.id}
              onClick={() => setSelectedId(selectedId === spot.id ? null : spot.id)}
              style={{
                background: t.surface,
                borderRadius: 20, padding: '14px 15px',
                marginBottom: 10,
                border: `1.5px solid ${isChecked ? t.primary : t.border}`,
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}
            >
              {isChecked && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  background: t.primary, color: '#fff',
                  fontSize: 10, fontWeight: 700, padding: '4px 10px',
                  borderBottomLeftRadius: 10,
                }}>✓ Checked In</div>
              )}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 14,
                  background: `${t.primary}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>{spot.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: t.text }}>
                    <span>{spot.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: t.secondary,
                      background: `${t.secondary}16`, padding: '2px 8px', borderRadius: 8,
                    }}>{spot.type}</span>
                    <span style={{ fontSize: 12, color: t.textMuted }}>📍 {spot.dist}</span>
                  </div>
                  {selectedId === spot.id && (
                    <div style={{ marginTop: 10 }}>
                      <p style={{ fontSize: 13, color: t.text, margin: '0 0 10px', lineHeight: 1.55 }}>{spot.desc}</p>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setCheckedIn(prev => isChecked ? prev.filter(id => id !== spot.id) : [...prev, spot.id]);
                        }}
                        style={{
                          background: isChecked ? t.border : t.primary,
                          color: isChecked ? t.text : '#fff', border: 'none',
                          padding: '9px 20px', borderRadius: 13,
                          fontWeight: 700, fontSize: 13,
                          cursor: 'pointer', fontFamily: "'Rubik', sans-serif",
                        }}
                      >
                        {isChecked ? 'Undo Check-In' : `Check In · +${spot.pts} 🌱`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── COMMUNITY ────────────────────────────────────────────────────────────────

function CommunityScreen({ t, theme, setTheme, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('global');

  const leaderboards = {
    global: [
      { rank: 1, name: 'EcoElena',    avatar: '🧑‍🌾', pts: 4820, isMe: false },
      { rank: 2, name: 'GreenGareth', avatar: '👨‍🍳', pts: 4205, isMe: false },
      { rank: 3, name: 'SproutSara',  avatar: '👩‍🌱', pts: 3890, isMe: false },
      { rank: 4, name: 'You',         avatar: '🌿',    pts: 1240, isMe: true  },
      { rank: 5, name: 'CompostCarl', avatar: '🧑‍🤝‍🧑', pts: 1180, isMe: false },
      { rank: 6, name: 'HarvestHana', avatar: '👩‍🍳', pts: 980,  isMe: false },
    ],
    friends: [
      { rank: 1, name: 'Alex R.',   avatar: '🧑',  pts: 2340, isMe: false },
      { rank: 2, name: 'Jordan K.', avatar: '👤',  pts: 1890, isMe: false },
      { rank: 3, name: 'You',       avatar: '🌿',  pts: 1240, isMe: true  },
      { rank: 4, name: 'Sam T.',    avatar: '🙂',  pts: 980,  isMe: false },
    ],
    local: [
      { rank: 1, name: 'SproutSara',  avatar: '👩‍🌱', pts: 3890, isMe: false },
      { rank: 2, name: 'You',         avatar: '🌿',   pts: 1240, isMe: true  },
      { rank: 3, name: 'CompostCarl', avatar: '🧑‍🤝‍🧑', pts: 1180, isMe: false },
      { rank: 4, name: 'LocalLiam',   avatar: '👨‍🌾', pts: 870,  isMe: false },
    ],
  };

  const feed = [
    { user: 'EcoElena',   action: 'completed',    target: 'Zero Waste Week challenge', emoji: '🌱', time: '2m ago'  },
    { user: 'Alex R.',    action: 'checked into', target: 'Greenfield Farmers Market', emoji: '📍', time: '15m ago' },
    { user: 'GreenGareth',action: 'cooked',       target: 'Root Veggie Stew (zero waste!)', emoji: '🍲', time: '1h ago'  },
    { user: 'Jordan K.',  action: 'unlocked',     target: 'Seasonal Chef badge 🏅',     emoji: '✨', time: '2h ago'  },
    { user: 'SproutSara', action: 'joined',       target: 'Maple Street Community Garden', emoji: '🌻', time: '3h ago'  },
  ];

  const tabs = ['global', 'friends', 'local'];
  const leaders = leaderboards[activeTab] || [];
  const podium = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  const podiumHeights = [72, 90, 56];
  const podiumColors = [
    `linear-gradient(180deg, #B8B8B8, #8C8C8C)`,
    `linear-gradient(180deg, ${t.accent}, #D48C00)`,
    `linear-gradient(180deg, ${t.secondary}, #9C3E18)`,
  ];
  const podiumOrder = [1, 0, 2]; // silver, gold, bronze

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg }}>
      <TopBar t={t} title="Community" theme={theme} setTheme={setTheme} setActiveScreen={setActiveScreen} showBack />

      {/* Tabs */}
      <div style={{ display: 'flex', background: t.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: '13px 0', border: 'none', background: 'none',
              color: activeTab === tab ? t.primary : t.textMuted,
              fontWeight: activeTab === tab ? 700 : 500, fontSize: 14,
              borderBottom: activeTab === tab ? `3px solid ${t.primary}` : '3px solid transparent',
              cursor: 'pointer', fontFamily: "'Rubik', sans-serif",
              textTransform: 'capitalize', transition: 'color 0.15s',
            }}
          >
            <span>{tab}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Podium */}
        <div style={{ background: t.podiumBg, padding: '22px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10 }}>
            {podiumOrder.map(idx => {
              const player = podium[idx];
              if (!player) return null;
              const medals = ['🥇','🥈','🥉'];
              return (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: idx === 0 ? 30 : 24, marginBottom: 4 }}>{player.avatar}</div>
                  <div style={{
                    width: idx === 0 ? 78 : 66,
                    height: podiumHeights[idx],
                    background: podiumColors[idx],
                    borderRadius: '8px 8px 0 0',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                  }}>
                    <div style={{ fontSize: idx === 0 ? 22 : 18 }}>{medals[idx]}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, marginTop: 2 }}>{player.name.split(' ')[0]}</div>
                    <div style={{ fontSize: 10, opacity: 0.82 }}>{player.pts.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Remaining ranks */}
        <div style={{ padding: '12px 18px 0' }}>
          {rest.map(p => (
            <div key={p.rank} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', marginBottom: 8,
              background: p.isMe ? `${t.primary}14` : t.surface,
              borderRadius: 16,
              border: p.isMe ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: t.textMuted, flexShrink: 0,
              }}>#{p.rank}</div>
              <div style={{ fontSize: 22 }}>{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: p.isMe ? 800 : 600, fontSize: 14, color: t.text }}>{p.name}</span>
                {p.isMe && <span style={{ fontSize: 10, color: t.primary, marginLeft: 6, fontWeight: 700 }}>YOU</span>}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: t.primary }}>{p.pts.toLocaleString()} 🌱</div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div style={{ padding: '16px 18px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Recent Activity
          </div>
          {feed.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '10px 0',
              borderBottom: i < feed.length - 1 ? `1px solid ${t.border}` : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${t.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, flexShrink: 0,
              }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: t.text, lineHeight: 1.45 }}>
                  <strong>{item.user}</strong>
                  <span style={{ color: t.textMuted }}> {item.action} </span>
                  <span style={{ fontWeight: 600 }}>{item.target}</span>
                </div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROULETTE ─────────────────────────────────────────────────────────────────

function RouletteScreen({ t, theme, setTheme, setActiveScreen }) {
  const [spinning, setSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [recipe, setRecipe] = useState(null);

  const recipes = [
    { name: 'Zucchini Fritter Stack', emoji: '🥞', time: '25 min', diff: 'Easy',   uses: ['Zucchini ⚠️', 'Eggs', 'Feta'],      desc: 'Crispy pan-fried fritters with tangy yogurt dip. Uses that zucchini before it turns!' },
    { name: 'Root Veggie Roast',      emoji: '🥕', time: '45 min', diff: 'Easy',   uses: ['Carrots ⚠️', 'Turnip', 'Thyme'],     desc: 'Caramelized seasonal roots with herbs and a maple glaze. Practically cooks itself.' },
    { name: 'Spring Pea Risotto',     emoji: '🍚', time: '35 min', diff: 'Medium', uses: ['Spring Peas', 'Rice', 'Parmesan'],   desc: 'Creamy spring risotto featuring local peas from the market. Elegant and comforting.' },
    { name: 'Lentil & Herb Soup',     emoji: '🍲', time: '30 min', diff: 'Easy',   uses: ['Red Lentils ⚠️', 'Tomatoes', 'Cumin'], desc: 'Warming red lentil soup with smoky spices. Perfect with crusty sourdough.' },
    { name: 'Seasonal Grain Bowl',    emoji: '🥗', time: '20 min', diff: 'Easy',   uses: ['Farro', 'Kale ⚠️', 'Lemon'],         desc: 'Bright, nourishing grain bowl with whatever veg needs using up. Fast and satisfying.' },
  ];

  const pantry = [
    { name: 'Zucchini',    emoji: '🥒', expiry: 'Tomorrow', urgent: true  },
    { name: 'Red Lentils', emoji: '🫘', expiry: '3 days',   urgent: true  },
    { name: 'Kale',        emoji: '🥬', expiry: '4 days',   urgent: true  },
    { name: 'Carrots',     emoji: '🥕', expiry: '5 days',   urgent: false },
    { name: 'Tomatoes',    emoji: '🍅', expiry: '6 days',   urgent: false },
    { name: 'Eggs',        emoji: '🥚', expiry: '12 days',  urgent: false },
    { name: 'Feta',        emoji: '🧀', expiry: '14 days',  urgent: false },
    { name: 'Farro',       emoji: '🌾', expiry: '3 months', urgent: false },
  ];

  const segColors = [t.primary, t.secondary, t.accent, t.primaryLight, '#9B7FD4'];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setRecipe(null);
    const newAngle = spinAngle + 720 + Math.floor(Math.random() * 360);
    setSpinAngle(newAngle);
    setTimeout(() => {
      setSpinning(false);
      setRecipe(recipes[Math.floor(Math.random() * recipes.length)]);
    }, 1600);
  };

  const N = recipes.length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg }}>
      <TopBar t={t} title="Dinner Roulette" theme={theme} setTheme={setTheme} setActiveScreen={setActiveScreen} showBack />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Wheel Section */}
        <div style={{
          background: `linear-gradient(180deg, ${t.surface} 0%, ${t.bg} 100%)`,
          padding: '20px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            What's for Dinner?
          </div>

          <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 18px' }}>
            {/* Pointer */}
            <div style={{
              position: 'absolute', top: -14, left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `20px solid ${t.secondary}`,
              zIndex: 5,
            }} />

            {/* Wheel SVG */}
            <svg
              width="200" height="200" viewBox="0 0 200 200"
              style={{
                transform: `rotate(${spinAngle}deg)`,
                transition: spinning ? 'transform 1.6s cubic-bezier(0.15,0.65,0.1,1)' : 'none',
                borderRadius: '50%',
                boxShadow: `0 8px 28px ${t.shadow}`,
                display: 'block',
              }}
            >
              {recipes.map((r, i) => {
                const startDeg = (360 / N) * i - 90;
                const endDeg   = (360 / N) * (i + 1) - 90;
                const startRad = startDeg * Math.PI / 180;
                const endRad   = endDeg   * Math.PI / 180;
                const x1 = 100 + 100 * Math.cos(startRad);
                const y1 = 100 + 100 * Math.sin(startRad);
                const x2 = 100 + 100 * Math.cos(endRad);
                const y2 = 100 + 100 * Math.sin(endRad);
                const midRad = ((startDeg + endDeg) / 2) * Math.PI / 180;
                const tx = 100 + 66 * Math.cos(midRad);
                const ty = 100 + 66 * Math.sin(midRad);
                return (
                  <g key={i}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                      fill={segColors[i % segColors.length]}
                    />
                    <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fontSize="18">{r.emoji}</text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="15" fill="white" stroke="#ccc" strokeWidth="2" />
            </svg>
          </div>

          <button
            onClick={handleSpin}
            disabled={spinning}
            style={{
              background: spinning ? t.border : `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
              color: spinning ? t.textMuted : '#fff',
              border: 'none', padding: '14px 38px', borderRadius: 26,
              fontWeight: 800, fontSize: 16, cursor: spinning ? 'default' : 'pointer',
              fontFamily: "'Rubik', sans-serif",
              boxShadow: spinning ? 'none' : `0 6px 20px ${t.primary}50`,
              transition: 'all 0.18s',
              transform: spinning ? 'scale(0.96)' : 'scale(1)',
            }}
          >
            {spinning ? '🌀 Spinning...' : '🎲 Spin for Dinner!'}
          </button>
        </div>

        {/* Recipe Result */}
        {recipe && (
          <div style={{ padding: '0 18px 16px' }}>
            <div style={{
              background: t.surface, borderRadius: 24, padding: '18px',
              border: `2px solid ${t.primary}`,
              boxShadow: `0 4px 20px ${t.primary}18`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 40 }}>{recipe.emoji}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17, color: t.text }}>
                    <span>{recipe.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 3 }}>
                    <span style={{ fontSize: 12, color: t.textMuted }}>⏱ {recipe.time}</span>
                    <span style={{ fontSize: 12, color: t.textMuted }}>• {recipe.diff}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: t.text, lineHeight: 1.55, margin: '0 0 14px' }}>{recipe.desc}</p>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 7 }}>
                  Uses from your pantry:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {recipe.uses.map((item, i) => (
                    <span key={i} style={{
                      padding: '4px 10px', borderRadius: 10,
                      background: item.includes('⚠️') ? `${t.secondary}20` : `${t.primary}15`,
                      color: item.includes('⚠️') ? t.secondary : t.primary,
                      fontSize: 12, fontWeight: 600,
                    }}>{item}</span>
                  ))}
                </div>
              </div>
              <button style={{
                width: '100%', background: t.primary, color: '#fff',
                border: 'none', padding: '12px', borderRadius: 16,
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Rubik', sans-serif",
              }}>
                Let's Cook This! 🍳
              </button>
            </div>
          </div>
        )}

        {/* Pantry Snapshot with two horizontal scrolls */}
        <div style={{ padding: '0 18px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Pantry Snapshot
          </div>

          {/* Use soon – horizontal scroll */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.secondary, marginBottom: 8 }}>⚠️ Use Soon</div>
            <div style={{ overflowX: 'auto', display: 'flex', gap: 10, paddingBottom: 6 }}>
              {pantry.filter(i => i.urgent).map(item => (
                <div key={item.name} style={{
                  flexShrink: 0, minWidth: 78,
                  background: `${t.secondary}10`,
                  border: `1px solid ${t.secondary}28`,
                  borderRadius: 14, padding: '10px 12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{item.emoji}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: t.text }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: t.secondary, marginTop: 2, fontWeight: 700 }}>{item.expiry}</div>
                </div>
              ))}
            </div>
          </div>

          {/* All items – horizontal scroll */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 8 }}>All Items</div>
            <div style={{ overflowX: 'auto', display: 'flex', gap: 10, paddingBottom: 6 }}>
              {pantry.map(item => (
                <div key={item.name} style={{
                  flexShrink: 0, minWidth: 78,
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: 14, padding: '10px 12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{item.emoji}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: t.text }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: item.urgent ? t.secondary : t.textMuted, marginTop: 2 }}>{item.expiry}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('light');

  const t = themes[theme];

  const screens = {
    home:      HomeScreen,
    quests:    QuestsScreen,
    bounty:    BountyScreen,
    community: CommunityScreen,
    roulette:  RouletteScreen,
  };

  const ScreenComponent = screens[activeScreen];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Rubik', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; background: transparent; }
      `}</style>

      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.07)',
        fontFamily: "'Rubik', sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}>
        <ScreenComponent t={t} theme={theme} setTheme={setTheme} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
}
