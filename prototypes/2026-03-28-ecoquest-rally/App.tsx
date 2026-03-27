// EcoQuest Rally - Interactive Mobile Prototype
// Single-file React component using Babel standalone

function App() {
  const { useState, useEffect, useRef } = React;

  // ── Theme System ──────────────────────────────────────────────────────────
  const themes = {
    dark: {
      bg: '#0D1117',
      surface: '#161B22',
      surfaceAlt: '#1C2333',
      card: '#1E2A3A',
      cardBorder: '#2D3F55',
      primary: '#39FF14',
      primaryDim: '#2ACC0F',
      primaryGlow: 'rgba(57,255,20,0.18)',
      primarySoft: 'rgba(57,255,20,0.10)',
      secondary: '#00E5FF',
      secondaryGlow: 'rgba(0,229,255,0.15)',
      accent: '#FF6B35',
      accentGlow: 'rgba(255,107,53,0.15)',
      gold: '#FFD700',
      goldGlow: 'rgba(255,215,0,0.15)',
      text: '#E8F0FE',
      textSub: '#8B9CC8',
      textMuted: '#4A5980',
      border: '#1F2D42',
      navBg: '#0A0F18',
      navBorder: '#1A2540',
      statusBar: '#0A0F18',
      danger: '#FF4757',
      success: '#39FF14',
      badge: '#FF6B35',
    },
    light: {
      bg: '#F0F7F0',
      surface: '#FFFFFF',
      surfaceAlt: '#F5FAF5',
      card: '#FFFFFF',
      cardBorder: '#D4E8D4',
      primary: '#1A8A00',
      primaryDim: '#156E00',
      primaryGlow: 'rgba(26,138,0,0.12)',
      primarySoft: 'rgba(26,138,0,0.08)',
      secondary: '#0078A0',
      secondaryGlow: 'rgba(0,120,160,0.10)',
      accent: '#E05A20',
      accentGlow: 'rgba(224,90,32,0.10)',
      gold: '#C89B00',
      goldGlow: 'rgba(200,155,0,0.12)',
      text: '#1A2B1A',
      textSub: '#4A6B4A',
      textMuted: '#8AA88A',
      border: '#D4E8D4',
      navBg: '#FFFFFF',
      navBorder: '#C8E0C8',
      statusBar: '#FFFFFF',
      danger: '#D32F2F',
      success: '#1A8A00',
      badge: '#E05A20',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  // ── Font Injection ─────────────────────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; background: transparent; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes glowPulse { 0%,100%{box-shadow:0 0 8px rgba(57,255,20,0.3)} 50%{box-shadow:0 0 20px rgba(57,255,20,0.7)} }
      @keyframes badgePop { 0%{transform:scale(0.8);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  // ── Nav Config ────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Rally', icon: window.lucide.Zap },
    { id: 'missions', label: 'Missions', icon: window.lucide.MapPin },
    { id: 'rewards', label: 'Rewards', icon: window.lucide.Gift },
    { id: 'leaderboard', label: 'Ranks', icon: window.lucide.Trophy },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  // ── Shared Styles ─────────────────────────────────────────────────────────
  const card = (extra = {}) => ({
    background: t.card,
    border: `1px solid ${t.cardBorder}`,
    borderRadius: 16,
    padding: '14px 16px',
    marginBottom: 12,
    ...extra,
  });

  const pill = (bg, color, extra = {}) => ({
    display: 'inline-flex', alignItems: 'center', gap: 4,
    background: bg, color: color,
    fontSize: 10, fontWeight: 600, letterSpacing: '0.5px',
    padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase',
    ...extra,
  });

  const btn = (id, bg, color, extra = {}) => ({
    background: pressedBtn === id ? t.primaryDim : bg,
    color,
    border: 'none', borderRadius: 12,
    padding: '12px 20px', fontFamily: 'Space Grotesk, sans-serif',
    fontSize: 14, fontWeight: 600, cursor: 'pointer',
    transform: pressedBtn === id ? 'scale(0.97)' : 'scale(1)',
    transition: 'all 0.15s ease',
    ...extra,
  });

  // ── Screen: HOME ──────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const [claimPressed, setClaimPressed] = useState(false);
    const [missionDone, setMissionDone] = useState([false, false, false]);

    const toggleMission = (i) => {
      const next = [...missionDone];
      next[i] = !next[i];
      setMissionDone(next);
    };

    const dailyMissions = [
      { icon: '🚲', label: 'Bike to work / store', pts: 50, done: missionDone[0], i: 0 },
      { icon: '🛍️', label: 'Skip single-use bag', pts: 20, done: missionDone[1], i: 1 },
      { icon: '🌱', label: 'Visit a farmers market', pts: 80, done: missionDone[2], i: 2 },
    ];

    const rallyProgress = 68;

    return React.createElement('div', { style: { fontFamily: 'Space Grotesk, sans-serif', color: t.text, animation: 'slideUp 0.3s ease' } },
      // Hero Banner
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #0D2A1A 0%, #0A1F2E 100%)`,
          borderRadius: 20, padding: '20px 18px', marginBottom: 14,
          border: `1px solid ${t.cardBorder}`,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: t.primaryGlow, filter: 'blur(30px)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -10, left: 60, width: 80, height: 80, borderRadius: '50%', background: t.secondaryGlow, filter: 'blur(20px)' } }),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('div', { style: { ...pill(t.primaryGlow, t.primary, { marginBottom: 10 }) } },
            React.createElement(window.lucide.Zap, { size: 10 }), 'WEEK 12 RALLY ACTIVE'
          ),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 } }, 'Eastside Green Sprint'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 16 } }, 'City-wide • 847 participants • 3 days left'),
          // Progress Bar
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontSize: 12, color: t.textSub } }, 'Rally Progress'),
              React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 700 } }, `${rallyProgress}%`)
            ),
            React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${rallyProgress}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 4, transition: 'width 0.8s ease' } })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 14 } },
            React.createElement('div', { style: { flex: 1, background: 'rgba(57,255,20,0.08)', borderRadius: 10, padding: '8px 12px', textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.primary } }, '1,240'),
              React.createElement('div', { style: { fontSize: 10, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Your Points')
            ),
            React.createElement('div', { style: { flex: 1, background: 'rgba(0,229,255,0.08)', borderRadius: 10, padding: '8px 12px', textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.secondary } }, '#14'),
              React.createElement('div', { style: { fontSize: 10, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'City Rank')
            ),
            React.createElement('div', { style: { flex: 1, background: 'rgba(255,215,0,0.08)', borderRadius: 10, padding: '8px 12px', textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.gold } }, '3'),
              React.createElement('div', { style: { fontSize: 10, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Unlocks Ready')
            )
          )
        )
      ),

      // Mystery Unlock Teaser
      React.createElement('div', {
        style: { ...card(), background: `linear-gradient(135deg, #1A1200, #0D1A2A)`, border: `1px solid ${t.gold}44`, cursor: 'pointer' },
        onClick: () => { setClaimPressed(true); setTimeout(() => setClaimPressed(false), 300); }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 46, height: 46, borderRadius: 14, background: t.goldGlow, border: `1px solid ${t.gold}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, '🎁'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.gold, marginBottom: 2 } }, 'Mystery Unlock Available!'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSub } }, 'Complete 1 more mission to reveal a secret pop-up event near you')
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.gold })
        )
      ),

      // Today's Missions
      React.createElement('div', { style: { fontSize: 16, fontWeight: 700, marginBottom: 10, color: t.text } }, "Today's Missions"),
      ...dailyMissions.map(m =>
        React.createElement('div', {
          key: m.i,
          style: { ...card({ marginBottom: 8 }), opacity: m.done ? 0.7 : 1, cursor: 'pointer' },
          onClick: () => toggleMission(m.i)
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: m.done ? t.primarySoft : t.surfaceAlt, border: `1px solid ${m.done ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 } }, m.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: m.done ? t.textSub : t.text, textDecoration: m.done ? 'line-through' : 'none' } }, m.label),
              React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 600, marginTop: 2 } }, `+${m.pts} pts`)
            ),
            React.createElement('div', { style: { width: 24, height: 24, borderRadius: '50%', border: `2px solid ${m.done ? t.primary : t.border}`, background: m.done ? t.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              m.done && React.createElement(window.lucide.Check, { size: 12, color: '#000', strokeWidth: 3 })
            )
          )
        )
      ),

      // Nearby Rally Activity
      React.createElement('div', { style: { fontSize: 16, fontWeight: 700, margin: '16px 0 10px', color: t.text } }, 'Nearby Activity'),
      React.createElement('div', { style: card() },
        ['🧹 Park cleanup in Riverside — 12 joined', '🛒 Eco market at Grove St — 34 pts up for grabs', '🌿 Community garden session — 2 spots left'].map((item, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none' } },
            React.createElement('div', { style: { fontSize: 16 } }, item.split(' ')[0]),
            React.createElement('div', { style: { fontSize: 13, color: t.textSub, flex: 1 } }, item.slice(item.indexOf(' ') + 1))
          )
        )
      )
    );
  };

  // ── Screen: MISSIONS ───────────────────────────────────────────────────────
  const MissionsScreen = () => {
    const [filter, setFilter] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    const categories = ['all', 'transport', 'food', 'waste', 'community'];

    const missions = [
      { id: 1, cat: 'transport', icon: '🚲', title: 'Bike 5 Miles', desc: 'Ride your bike instead of driving for any trip today. Track via GPS.', pts: 120, dist: '0.3 mi', time: '~30 min', difficulty: 'Medium', combo: 'Transport Trio', comboProgress: 2, comboTotal: 3, active: true },
      { id: 2, cat: 'food', icon: '🌾', title: "Visit Farmers Market", desc: "Stop by any certified farmers market and buy at least one item. Photo proof required.", pts: 80, dist: '0.8 mi', time: 'Any time', difficulty: 'Easy', combo: 'Local Hero', comboProgress: 0, comboTotal: 2, active: true },
      { id: 3, cat: 'waste', icon: '♻️', title: 'Zero-Waste Lunch', desc: 'Have a lunch with zero single-use plastic or waste. Take a photo!', pts: 60, dist: null, time: 'Today only', difficulty: 'Easy', combo: null, comboProgress: 0, comboTotal: 0, active: true },
      { id: 4, cat: 'community', icon: '🧹', title: 'Riverside Park Cleanup', desc: 'Join the scheduled community cleanup at Riverside Park. Gloves provided.', pts: 200, dist: '1.2 mi', time: '10am–12pm', difficulty: 'Hard', combo: 'Community Champion', comboProgress: 1, comboTotal: 3, active: false },
      { id: 5, cat: 'waste', icon: '🛍️', title: 'Refuse Plastic Bags', desc: 'Complete 3 purchases today using your own reusable bag or no bag at all.', pts: 40, dist: null, time: 'Ongoing', difficulty: 'Easy', combo: 'Waste Warrior', comboProgress: 3, comboTotal: 3, active: true },
      { id: 6, cat: 'transport', icon: '🚌', title: 'Take Public Transit', desc: 'Use bus, subway or train for any trip instead of a personal vehicle.', pts: 70, dist: null, time: 'Any trip', difficulty: 'Easy', combo: 'Transport Trio', comboProgress: 2, comboTotal: 3, active: true },
    ];

    const filtered = filter === 'all' ? missions : missions.filter(m => m.cat === filter);
    const diffColor = { Easy: t.primary, Medium: t.secondary, Hard: t.accent };

    return React.createElement('div', { style: { fontFamily: 'Space Grotesk, sans-serif', color: t.text, animation: 'slideUp 0.3s ease' } },
      // Header
      React.createElement('div', { style: { fontSize: 20, fontWeight: 700, marginBottom: 4 } }, 'Eco Missions'),
      React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 14 } }, '6 active near you • Combo in progress!'),

      // Combo Banner
      React.createElement('div', { style: { ...card({ background: `linear-gradient(135deg, #0D1F30, #1A2A0D)`, border: `1px solid ${t.secondary}44`, marginBottom: 16 }) } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
          React.createElement('div', { style: { fontSize: 20 } }, '⚡'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.secondary } }, 'Transport Trio Combo'),
            React.createElement('div', { style: { fontSize: 11, color: t.textSub } }, '2 of 3 complete — unlock a mystery reward!')
          ),
          React.createElement('div', { style: { ...pill(t.secondaryGlow, t.secondary) } }, '2/3')
        ),
        React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '66%', background: `linear-gradient(90deg, ${t.secondary}, ${t.primary})`, borderRadius: 3 } })
        )
      ),

      // Category Filter
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 } },
        categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setFilter(cat),
            style: {
              flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600,
              background: filter === cat ? t.primary : t.surfaceAlt,
              color: filter === cat ? '#000' : t.textSub,
              textTransform: 'capitalize', transition: 'all 0.2s'
            }
          }, cat)
        )
      ),

      // Mission Cards
      ...filtered.map(m =>
        React.createElement('div', {
          key: m.id,
          style: { ...card({ marginBottom: 10, cursor: 'pointer' }), transition: 'all 0.2s' },
          onClick: () => setExpandedId(expandedId === m.id ? null : m.id)
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 } }, m.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700 } }, m.title),
                React.createElement('div', { style: { ...pill('transparent', diffColor[m.difficulty], { border: `1px solid ${diffColor[m.difficulty]}55` }) } }, m.difficulty)
              ),
              React.createElement('div', { style: { display: 'flex', gap: 10 } },
                React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 700 } }, `+${m.pts} pts`),
                m.dist && React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, `📍 ${m.dist}`),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, `⏱ ${m.time}`)
              )
            ),
            React.createElement(window.lucide.ChevronDown, { size: 16, color: t.textMuted, style: { transform: expandedId === m.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', marginTop: 4 } })
          ),
          expandedId === m.id && React.createElement('div', { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` } },
            React.createElement('div', { style: { fontSize: 13, color: t.textSub, lineHeight: 1.6, marginBottom: 12 } }, m.desc),
            m.combo && React.createElement('div', { style: { background: t.secondaryGlow, border: `1px solid ${t.secondary}33`, borderRadius: 10, padding: '8px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('span', { style: { fontSize: 12 } }, '🔗'),
              React.createElement('span', { style: { fontSize: 12, color: t.secondary } }, `Part of "${m.combo}" combo (${m.comboProgress}/${m.comboTotal})`)
            ),
            React.createElement('button', {
              style: { width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: t.primary, color: '#000', fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer' }
            }, m.active ? 'Start Mission' : 'Get Directions')
          )
        )
      )
    );
  };

  // ── Screen: REWARDS ────────────────────────────────────────────────────────
  const RewardsScreen = () => {
    const [activeSection, setActiveSection] = useState('unlocks');
    const [revealIdx, setRevealIdx] = useState(null);

    const sections = ['unlocks', 'collectibles', 'local'];

    const unlocks = [
      { id: 1, icon: '🌿', title: 'Secret Garden Tour', subtitle: 'Sponsored by GreenSpace Co.', desc: 'A private tour of the hidden rooftop garden at 45 Park Ave. Valid this weekend only!', status: 'claimed', expiry: 'Sat, Mar 30' },
      { id: 2, icon: '🎨', title: 'Pop-Up Art Installation', subtitle: 'Eco-Art Collective', desc: 'Exclusive preview of the "Reclaim" installation at Riverside — before public opening.', status: 'available', expiry: 'Today, 5pm' },
      { id: 3, icon: '🔮', title: 'Mystery Unlock', subtitle: 'Complete 1 more mission', desc: 'Something special is waiting...', status: 'locked', expiry: null },
    ];

    const collectibles = [
      { id: 1, emoji: '🌱', name: 'First Sprout', rarity: 'Common', story: 'Every journey starts with a single seed. You began yours.' },
      { id: 2, emoji: '🚲', name: 'Wheel Warrior', rarity: 'Rare', story: 'Over 50 miles biked this season — you\'re reshaping the city one ride at a time.' },
      { id: 3, emoji: '⚡', name: 'Combo Breaker', rarity: 'Epic', story: 'Completed your first triple-action combo. The city felt it.' },
      { id: 4, emoji: '❓', name: '???', rarity: 'Legendary', story: 'Locked', locked: true },
      { id: 5, emoji: '❓', name: '???', rarity: 'Locked', story: 'Locked', locked: true },
      { id: 6, emoji: '❓', name: '???', rarity: 'Locked', story: 'Locked', locked: true },
    ];

    const localDeals = [
      { icon: '☕', shop: 'Rooted Café', deal: '15% off any drink', condition: 'Earned 500+ pts this week', valid: true },
      { icon: '🛒', shop: 'Earthly Goods Market', deal: 'Free tote bag', condition: 'Complete 3 waste missions', valid: false },
      { icon: '🌿', shop: 'Green Thread Boutique', deal: '$10 off sustainable fashion', condition: 'Top 50 on leaderboard', valid: true },
    ];

    const rarityColors = { Common: t.textSub, Rare: t.secondary, Epic: '#BF5FFF', Legendary: t.gold, Locked: t.textMuted };

    return React.createElement('div', { style: { fontFamily: 'Space Grotesk, sans-serif', color: t.text, animation: 'slideUp 0.3s ease' } },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 700, marginBottom: 4 } }, 'Rewards & Unlocks'),
      React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 14 } }, '2 rewards ready to claim'),

      // Section Toggle
      React.createElement('div', { style: { display: 'flex', background: t.surfaceAlt, borderRadius: 12, padding: 4, marginBottom: 16 } },
        sections.map(s =>
          React.createElement('button', {
            key: s,
            onClick: () => setActiveSection(s),
            style: {
              flex: 1, padding: '8px 4px', border: 'none', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600,
              background: activeSection === s ? (isDark ? t.card : '#fff') : 'transparent',
              color: activeSection === s ? t.text : t.textMuted,
              boxShadow: activeSection === s ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
              textTransform: 'capitalize', transition: 'all 0.2s'
            }
          }, s)
        )
      ),

      // Unlocks
      activeSection === 'unlocks' && React.createElement('div', null,
        unlocks.map(u =>
          React.createElement('div', { key: u.id, style: { ...card({ opacity: u.status === 'locked' ? 0.6 : 1 }) } },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 } }, u.status === 'locked' ? '🔒' : u.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700 } }, u.title),
                  u.status === 'available' && React.createElement('div', { style: { ...pill(t.primaryGlow, t.primary) } }, 'NEW')
                ),
                React.createElement('div', { style: { fontSize: 12, color: t.textSub, marginBottom: 6 } }, u.status === 'locked' ? u.desc : u.subtitle),
                u.status !== 'locked' && React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, `⏳ ${u.expiry}`),
                u.status === 'available' && React.createElement('button', { style: { marginTop: 10, width: '100%', padding: '9px', borderRadius: 10, border: 'none', background: t.primary, color: '#000', fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer' } }, 'Claim Reward'),
                u.status === 'claimed' && React.createElement('div', { style: { marginTop: 10, ...pill(t.primarySoft, t.primary, { padding: '4px 10px' }) } }, React.createElement(window.lucide.Check, { size: 10 }), ' Claimed')
              )
            )
          )
        )
      ),

      // Collectibles
      activeSection === 'collectibles' && React.createElement('div', null,
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          collectibles.map((c, i) =>
            React.createElement('div', {
              key: c.id, style: {
                background: c.locked ? t.surfaceAlt : t.card, border: `1px solid ${c.locked ? t.border : rarityColors[c.rarity] + '55'}`,
                borderRadius: 14, padding: '14px 10px', textAlign: 'center', cursor: c.locked ? 'default' : 'pointer',
                animation: revealIdx === i ? 'badgePop 0.4s ease' : 'none'
              },
              onClick: () => !c.locked && setRevealIdx(i)
            },
              React.createElement('div', { style: { fontSize: 28, marginBottom: 6 } }, c.locked ? '❓' : c.emoji),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: c.locked ? t.textMuted : t.text, lineHeight: 1.2, marginBottom: 4 } }, c.name),
              React.createElement('div', { style: { fontSize: 9, fontWeight: 600, color: rarityColors[c.rarity], textTransform: 'uppercase', letterSpacing: '0.5px' } }, c.rarity)
            )
          )
        ),
        revealIdx !== null && !collectibles[revealIdx].locked && React.createElement('div', { style: { ...card({ marginTop: 14, background: `linear-gradient(135deg, #0D1F30, #130D20)`, border: `1px solid ${rarityColors[collectibles[revealIdx].rarity]}55` }) } },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
            React.createElement('div', { style: { fontSize: 32 } }, collectibles[revealIdx].emoji),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: rarityColors[collectibles[revealIdx].rarity] } }, collectibles[revealIdx].name),
              React.createElement('div', { style: { fontSize: 12, color: t.textSub, lineHeight: 1.5, marginTop: 4 } }, collectibles[revealIdx].story)
            )
          )
        )
      ),

      // Local Deals
      activeSection === 'local' && React.createElement('div', null,
        localDeals.map((deal, i) =>
          React.createElement('div', { key: i, style: { ...card({ opacity: deal.valid ? 1 : 0.6 }) } },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, deal.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700 } }, deal.shop),
                React.createElement('div', { style: { fontSize: 13, color: t.primary, fontWeight: 600 } }, deal.deal),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, deal.condition)
              ),
              deal.valid
                ? React.createElement('div', { style: { ...pill(t.primaryGlow, t.primary) } }, 'Active')
                : React.createElement('div', { style: { ...pill(t.surfaceAlt, t.textMuted) } }, 'Locked')
            )
          )
        )
      )
    );
  };

  // ── Screen: LEADERBOARD ────────────────────────────────────────────────────
  const LeaderboardScreen = () => {
    const [scope, setScope] = useState('city');

    const cityPlayers = [
      { rank: 1, name: 'Maya Chen', pts: 4820, badge: '🏆', streak: 21, avatar: '🧑🏻' },
      { rank: 2, name: 'Elijah Torres', pts: 4310, badge: '🥈', streak: 14, avatar: '👨🏾' },
      { rank: 3, name: 'Sofia Müller', pts: 3990, badge: '🥉', streak: 9, avatar: '👩🏼' },
      { rank: 4, name: 'Priya Nair', pts: 3480, badge: null, streak: 7, avatar: '👩🏽' },
      { rank: 5, name: 'Carlos Reyes', pts: 3210, badge: null, streak: 5, avatar: '👨🏻' },
      { rank: 6, name: 'Aiko Tanaka', pts: 2980, badge: null, streak: 12, avatar: '👩🏻' },
      { rank: 7, name: 'Dev Patel', pts: 2750, badge: null, streak: 3, avatar: '👨🏽' },
      { rank: 13, name: 'You', pts: 1240, badge: null, streak: 5, avatar: '⭐', isYou: true },
    ];

    const hoodPlayers = [
      { rank: 1, name: 'Sam K.', pts: 1580, badge: '🏆', streak: 8, avatar: '🧑🏼', isYou: false },
      { rank: 2, name: 'You', pts: 1240, badge: '🥈', streak: 5, avatar: '⭐', isYou: true },
      { rank: 3, name: 'Jordan M.', pts: 1100, badge: '🥉', streak: 3, avatar: '🧑🏾' },
      { rank: 4, name: 'Riley T.', pts: 890, badge: null, streak: 2, avatar: '👩🏻' },
      { rank: 5, name: 'Alex P.', pts: 720, badge: null, streak: 1, avatar: '👨🏿' },
    ];

    const players = scope === 'city' ? cityPlayers : hoodPlayers;

    return React.createElement('div', { style: { fontFamily: 'Space Grotesk, sans-serif', color: t.text, animation: 'slideUp 0.3s ease' } },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 700, marginBottom: 4 } }, 'Leaderboard'),
      React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 14 } }, 'Week 12 • Resets in 3 days'),

      // Scope Toggle
      React.createElement('div', { style: { display: 'flex', background: t.surfaceAlt, borderRadius: 12, padding: 4, marginBottom: 16 } },
        [['city', '🌆 City-wide'], ['hood', '🏘️ Neighborhood']].map(([id, label]) =>
          React.createElement('button', {
            key: id, onClick: () => setScope(id),
            style: { flex: 1, padding: '9px', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600, background: scope === id ? (isDark ? t.card : '#fff') : 'transparent', color: scope === id ? t.text : t.textMuted, boxShadow: scope === id ? '0 2px 8px rgba(0,0,0,0.15)' : 'none', transition: 'all 0.2s' }
          }, label)
        )
      ),

      // Top 3 Podium
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 20 } },
        [players[1], players[0], players[2]].map((p, i) => {
          const heights = [90, 110, 80];
          const sizes = [44, 52, 40];
          const colors = [t.textSub, t.gold, t.accent];
          const podiumOrder = [2, 1, 3];
          return p && React.createElement('div', { key: p.rank, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 } },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 4 } }, p.avatar),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: p.isYou ? t.primary : t.text, textAlign: 'center', marginBottom: 6, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, p.isYou ? 'You' : p.name.split(' ')[0]),
            React.createElement('div', { style: { width: '100%', height: heights[i], background: `linear-gradient(to top, ${colors[i]}44, ${colors[i]}11)`, border: `1px solid ${colors[i]}55`, borderRadius: '10px 10px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('div', { style: { fontSize: 18 } }, p.badge || `#${p.rank}`),
              React.createElement('div', { style: { fontSize: 11, color: colors[i], fontWeight: 700 } }, `${(p.pts / 1000).toFixed(1)}k`)
            )
          );
        })
      ),

      // Full List
      React.createElement('div', { style: card({ padding: '4px 0' }) },
        players.slice(scope === 'city' ? 3 : 3).map((p, i) =>
          React.createElement('div', { key: p.rank, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: p.isYou ? t.primarySoft : 'transparent', borderRadius: p.isYou ? 10 : 0, margin: p.isYou ? '2px 4px' : 0, borderBottom: `1px solid ${t.border}` } },
            React.createElement('div', { style: { width: 24, fontSize: 13, fontWeight: 700, color: t.textMuted, textAlign: 'center' } }, `#${p.rank}`),
            React.createElement('div', { style: { fontSize: 20 } }, p.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: p.isYou ? 700 : 500, color: p.isYou ? t.primary : t.text } }, p.isYou ? 'You' : p.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `🔥 ${p.streak} day streak`)
            ),
            React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: p.isYou ? t.primary : t.text } }, p.pts.toLocaleString())
          )
        )
      ),

      // Weekly Goal
      React.createElement('div', { style: { ...card({ marginTop: 4 }) } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600 } }, 'Weekly Goal'),
          React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, '1,240 / 2,000 pts')
        ),
        React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '62%', background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 4 } })
        ),
        React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 8 } }, 'Reach 2,000 pts to unlock the Neighborhood Champion badge 🏅')
      )
    );
  };

  // ── Screen: PROFILE ────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [location, setLocation] = useState(true);
    const [activeStory, setActiveStory] = useState(null);

    const stories = [
      { id: 1, hero: '🌊', title: 'The Kelp Forest Revival', desc: 'How a community of divers in Monterey restored 40 acres of kelp through coordinated action — much like yours.', linked: 'You biked 5 miles (Combo Breaker)' },
      { id: 2, hero: '☀️', title: 'Solar Village, Kenya', desc: 'A village of 300 that went fully solar in 18 months through neighbor-to-neighbor trust and small actions.', linked: 'You visited the farmers market' },
    ];

    const stats = [
      { icon: '🌱', label: 'Trees Equiv.', val: '12' },
      { icon: '🚗', label: 'Car Miles Saved', val: '84' },
      { icon: '♻️', label: 'Waste Avoided', val: '4.2kg' },
      { icon: '🔥', label: 'Day Streak', val: '5' },
    ];

    const Toggle = ({ on, toggle }) =>
      React.createElement('div', {
        onClick: toggle, style: { width: 44, height: 24, borderRadius: 12, background: on ? t.primary : t.border, cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }
      },
        React.createElement('div', { style: { position: 'absolute', top: 3, left: on ? 22 : 3, width: 18, height: 18, borderRadius: '50%', background: on ? '#000' : t.textMuted, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' } })
      );

    return React.createElement('div', { style: { fontFamily: 'Space Grotesk, sans-serif', color: t.text, animation: 'slideUp 0.3s ease' } },
      // Profile Header
      React.createElement('div', { style: { ...card({ background: `linear-gradient(135deg, #0D2A1A, #0A1F2E)`, border: `1px solid ${t.cardBorder}`, textAlign: 'center', padding: '20px 16px' }) } },
        React.createElement('div', { style: { width: 68, height: 68, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 } }, '⭐'),
        React.createElement('div', { style: { fontSize: 18, fontWeight: 700, marginBottom: 2 } }, 'You'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 10 } }, 'Eastside • Member since Jan 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 8 } },
          React.createElement('div', { style: pill(t.primaryGlow, t.primary) }, '🌿 Eco Pioneer'),
          React.createElement('div', { style: pill(t.secondaryGlow, t.secondary) }, '⚡ Combo Breaker')
        )
      ),

      // Impact Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 } },
        stats.map((s, i) =>
          React.createElement('div', { key: i, style: { ...card({ marginBottom: 0, textAlign: 'center', padding: '14px 10px' }) } },
            React.createElement('div', { style: { fontSize: 22 } }, s.icon),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.primary, marginTop: 4 } }, s.val),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.5px' } }, s.label)
          )
        )
      ),

      // Storytrail
      React.createElement('div', { style: { fontSize: 16, fontWeight: 700, marginBottom: 10 } }, 'Your Storytrail'),
      ...stories.map(s =>
        React.createElement('div', { key: s.id, style: { ...card({ cursor: 'pointer' }), background: activeStory === s.id ? `linear-gradient(135deg, #0D2A1A, #130D20)` : t.card }, onClick: () => setActiveStory(activeStory === s.id ? null : s.id) },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
            React.createElement('div', { style: { fontSize: 28 } }, s.hero),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600 } }, s.title),
              React.createElement('div', { style: { fontSize: 11, color: t.primary, marginTop: 2 } }, `🔗 Unlocked by: ${s.linked}`)
            )
          ),
          activeStory === s.id && React.createElement('div', { style: { marginTop: 10, fontSize: 13, color: t.textSub, lineHeight: 1.6, paddingTop: 10, borderTop: `1px solid ${t.border}` } }, s.desc)
        )
      ),

      // Settings
      React.createElement('div', { style: { fontSize: 16, fontWeight: 700, margin: '16px 0 10px' } }, 'Settings'),
      React.createElement('div', { style: card() },
        [
          { label: 'Push Notifications', sub: 'Mission alerts & rewards', val: notifs, toggle: () => setNotifs(!notifs) },
          { label: 'Location Services', sub: 'Enable geo-triggered missions', val: location, toggle: () => setLocation(!location) },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i === 0 ? `1px solid ${t.border}` : 'none' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 500 } }, item.label),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, item.sub)
            ),
            React.createElement(Toggle, { on: item.val, toggle: item.toggle })
          )
        )
      ),

      // Theme Toggle
      React.createElement('div', { style: { ...card(), cursor: 'pointer' }, onClick: () => setIsDark(!isDark) },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: t.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 500 } }, isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, `Currently: ${isDark ? 'Dark' : 'Light'} theme`)
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )
      )
    );
  };

  // ── Main Render ───────────────────────────────────────────────────────────
  const screens = { home: HomeScreen, missions: MissionsScreen, rewards: RewardsScreen, leaderboard: LeaderboardScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeTab];

  const phoneStyle = {
    width: 375, height: 812, borderRadius: 44,
    background: t.bg,
    boxShadow: isDark
      ? '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)'
      : '0 40px 100px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    fontFamily: 'Space Grotesk, sans-serif',
    position: 'relative',
    transition: 'background 0.3s ease',
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: isDark ? '#08080F' : '#E8F0E8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Space Grotesk, sans-serif',
      transition: 'background 0.3s ease',
      padding: '20px 0',
    }
  },
    React.createElement('div', { style: phoneStyle },

      // ── Status Bar ──
      React.createElement('div', {
        style: { height: 54, background: t.statusBar, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 10px', flexShrink: 0, transition: 'background 0.3s' }
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, '9:41'),
        React.createElement('div', { style: { width: 120, height: 30, borderRadius: 20, background: '#000', position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 10 } }),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 14, color: t.text })
        )
      ),

      // ── Screen Header ──
      React.createElement('div', {
        style: { padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', { style: { fontSize: 18 } }, '🍃'),
          React.createElement('span', { style: { fontSize: 18, fontWeight: 800, color: t.primary, letterSpacing: '-0.5px' } }, 'EcoQuest'),
          React.createElement('span', { style: { fontSize: 18, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, ' Rally')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('div', { style: { width: 30, height: 30, borderRadius: '50%', background: t.accentGlow, border: `1px solid ${t.accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Bell, { size: 14, color: t.accent }),
            React.createElement('div', { style: { position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: t.badge, top: 2, right: 2, border: `2px solid ${t.bg}` } })
          )
        )
      ),

      // ── Screen Content ──
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '12px 16px 8px', transition: 'background 0.3s' }
      },
        React.createElement(ActiveScreen)
      ),

      // ── Bottom Nav ──
      React.createElement('div', {
        style: {
          height: 80, background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'flex-start', paddingTop: 10,
          flexShrink: 0, transition: 'background 0.3s',
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer',
              padding: '4px 0', transition: 'all 0.2s',
              transform: activeTab === tab.id ? 'translateY(-2px)' : 'translateY(0)',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: activeTab === tab.id ? t.primaryGlow : 'transparent',
                border: activeTab === tab.id ? `1px solid ${t.primary}44` : '1px solid transparent',
                transition: 'all 0.2s',
              }
            },
              React.createElement(tab.icon, { size: 18, color: activeTab === tab.id ? t.primary : t.textMuted, strokeWidth: activeTab === tab.id ? 2.5 : 1.5 })
            ),
            React.createElement('span', {
              style: { fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? t.primary : t.textMuted, letterSpacing: '0.3px', transition: 'all 0.2s' }
            }, tab.label)
          )
        )
      )
    )
  );
}
