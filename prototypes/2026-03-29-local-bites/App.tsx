const { useState, useEffect, useRef } = React;

// Load Google Fonts
(function () {
  if (!document.getElementById('lb-fonts')) {
    const s = document.createElement('style');
    s.id = 'lb-fonts';
    s.textContent =
      "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');";
    document.head.appendChild(s);
  }
})();

// ─── Themes ────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: '#1B1208',
    surface: '#2B1D10',
    surface2: '#3A2818',
    card: '#2B1D10',
    primary: '#E86449',
    primaryLight: '#F0896E',
    primaryDim: 'rgba(232,100,73,0.14)',
    text: '#FAF6F0',
    textSub: '#C8A88A',
    textMuted: '#7A5E48',
    border: '#3D2918',
    divider: '#3D2918',
    navBg: '#1B1208',
    shadow: 'rgba(0,0,0,0.45)',
  },
  light: {
    bg: '#FAF6F0',
    surface: '#FFFFFF',
    surface2: '#F5EAE0',
    card: '#FFFFFF',
    primary: '#E86449',
    primaryLight: '#F0896E',
    primaryDim: 'rgba(232,100,73,0.1)',
    text: '#1B1208',
    textSub: '#5C3D28',
    textMuted: '#9A7060',
    border: '#EAD8C8',
    divider: '#EAD8C8',
    navBg: '#FFFFFF',
    shadow: 'rgba(0,0,0,0.12)',
  },
};

// ─── Data ───────────────────────────────────────────────────────────────────
const RESTAURANTS = [
  { id: 1, name: 'Pho Ba Dinh', cuisine: 'Vietnamese', neighborhood: 'Little Saigon', rating: 4.8, visits: 234, isHiddenGem: true, color: '#B85030', tagline: 'Slow-brewed 12-hour bone broth' },
  { id: 2, name: 'Mole Madre', cuisine: 'Mexican', neighborhood: 'Eastside', rating: 4.9, visits: 189, isHiddenGem: true, color: '#7A3E18', tagline: 'Three generations of sacred sauce' },
  { id: 3, name: "Yia Yia's Table", cuisine: 'Greek', neighborhood: 'Harbor District', rating: 4.7, visits: 312, isHiddenGem: false, color: '#2E6078', tagline: 'Imported ingredients, family recipes' },
  { id: 4, name: 'Sichuan Fire', cuisine: 'Chinese', neighborhood: 'Chinatown', rating: 4.6, visits: 445, isHiddenGem: true, color: '#A02828', tagline: 'Authentic numbing spice since 1987' },
  { id: 5, name: 'Arepas de Colombia', cuisine: 'Colombian', neighborhood: 'Little Bogotá', rating: 4.9, visits: 98, isHiddenGem: true, color: '#C07010', tagline: 'Hand-pressed on cast iron every morning' },
];

const STORIES = [
  { id: 1, author: 'Maria C.', badge: 'Eastside Maven', dish: 'Tamale de Rajas', restaurant: 'Casa Lupita', story: 'My abuela made these every December solstice. Finding them here felt like traveling home — the charred poblano strip hidden inside is her signature.', votes: 234, userVoted: false, color: '#8B5845' },
  { id: 2, author: 'Jin K.', badge: 'Chinatown Scholar', dish: "Lion's Head Meatball", restaurant: 'Old Shanghai', story: 'Brought by Shanghai refugees in the 1940s. The tofu inside stretches the ration without losing the soul — impatience makes a dry result.', votes: 189, userVoted: true, color: '#3A5E78' },
  { id: 3, author: 'Priya M.', badge: 'Harbor Foodie', dish: 'Chole Bhature', restaurant: 'Dil Se Kitchen', story: 'Sunday mornings in Punjab smell exactly like this. The fermented batter puffs because it was left overnight — patience is the secret ingredient.', votes: 312, userVoted: false, color: '#604880' },
];

const CHALLENGES = [
  { id: 1, title: 'Hidden Gems Week', desc: 'Visit 5 restaurants with under 100 community ratings', progress: 3, total: 5, reward: 'Gem Hunter Badge', participants: 1204, endDays: 4 },
  { id: 2, title: 'Noodle November', desc: 'Try 7 different noodle dishes across 3 neighborhoods', progress: 5, total: 7, reward: 'Noodle Master Badge', participants: 892, endDays: 12 },
];

const BADGES = [
  { id: 1, name: 'Little Saigon', icon: '🍜', level: 3, color: '#B85030', earned: true },
  { id: 2, name: 'Eastside Maven', icon: '🌮', level: 2, color: '#7A3E18', earned: true },
  { id: 3, name: 'Gem Hunter', icon: '💎', level: 1, color: '#3A5E78', earned: true },
  { id: 4, name: 'Chinatown', icon: '🥟', level: 0, color: '#A02828', earned: false },
  { id: 5, name: 'Harbor District', icon: '🐟', level: 0, color: '#2E6078', earned: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'Sofia M.', streak: 47, badges: 8, isUser: false },
  { rank: 2, name: 'James K.', streak: 43, badges: 6, isUser: false },
  { rank: 3, name: 'You', streak: 31, badges: 4, isUser: true },
  { rank: 4, name: 'Priya N.', streak: 28, badges: 7, isUser: false },
  { rank: 5, name: 'Carlos R.', streak: 25, badges: 5, isUser: false },
];

// ─── Shared Components ──────────────────────────────────────────────────────
function DynamicIsland() {
  return (
    <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 118, height: 32, background: '#000', borderRadius: 20, zIndex: 200 }} />
  );
}

function StatusBar({ theme }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', height: 44, paddingTop: 6 }}>
      <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: theme.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <circle cx="7.5" cy="9.5" r="1.5" fill={theme.text} />
          <path d="M4.5 7C5.4 6.1 6.4 5.6 7.5 5.6s2.1.5 3 1.4" stroke={theme.text} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 4.5C3.6 2.9 5.5 2 7.5 2s3.9.9 5.5 2.5" stroke={theme.text} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div style={{ width: 22, height: 11, border: `1.5px solid ${theme.text}`, borderRadius: 3, padding: 1.5, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '80%', height: '100%', background: theme.text, borderRadius: 1 }} />
          </div>
          <div style={{ width: 2, height: 5, background: theme.text, borderRadius: '0 1px 1px 0', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Home Screen ────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', background: theme.bg }}>
      {/* Header */}
      <div style={{ padding: '10px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 2.5, margin: 0 }}>SUNDAY, MARCH 29</p>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: 28, fontWeight: 700, color: theme.text, margin: '5px 0 0', lineHeight: 1.1 }}>
            Good Evening,<br />
            <em style={{ color: theme.primary }}>Sofia</em>
          </h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: theme.primaryDim, border: `1.5px solid ${theme.primary}50`, borderRadius: 18, padding: '10px 14px', marginTop: 4 }}>
          <span style={{ fontSize: 20 }}>🔥</span>
          <span style={{ fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 900, color: theme.primary, lineHeight: 1 }}>31</span>
          <span style={{ fontFamily: 'Inter', fontSize: 9, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 1 }}>streak</span>
        </div>
      </div>

      {/* Editorial divider */}
      <div style={{ margin: '14px 24px 16px', height: 1, background: theme.divider }} />

      {/* Today's Challenge Card */}
      <div style={{ margin: '0 24px 22px', background: theme.primary, borderRadius: 22, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', right: 20, bottom: -40, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <p style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 6px' }}>TODAY'S CHALLENGE</p>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 700, color: '#FFF', margin: '0 0 12px', lineHeight: 1.25 }}>
          Discover a Hidden Gem<br />in <em>Little Saigon</em>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ width: 26, height: 5, borderRadius: 3, background: i <= 3 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.22)' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>3 of 5 done</span>
        </div>
      </div>

      {/* Featured Spots — OVERLAPPING ANGLED CARDS */}
      <div style={{ padding: '0 24px 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 19, fontWeight: 700, color: theme.text, margin: 0 }}>Tonight's Picks</h3>
          <span style={{ fontFamily: 'Inter', fontSize: 10, color: theme.primary, textTransform: 'uppercase', letterSpacing: 1.5 }}>See all</span>
        </div>

        {/* Angled card stack */}
        <div style={{ position: 'relative', height: 200, marginBottom: 8 }}>
          {/* Back card */}
          <div style={{
            position: 'absolute', top: 14, left: 8, width: 230, height: 148,
            background: RESTAURANTS[1].color, borderRadius: 20,
            transform: 'rotate(-5deg)',
            boxShadow: `0 10px 30px ${theme.shadow}`,
            padding: '16px 18px', overflow: 'hidden',
          }}>
            <p style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 4px' }}>EASTSIDE · MEXICAN</p>
            <h4 style={{ fontFamily: 'Playfair Display', fontSize: 19, fontWeight: 700, color: '#FFF', margin: '0 0 6px' }}>Mole Madre</h4>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>Three generations of sacred sauce</p>
          </div>

          {/* Middle card */}
          <div style={{
            position: 'absolute', top: 6, left: 44, width: 238, height: 162,
            background: RESTAURANTS[2].color, borderRadius: 20,
            transform: 'rotate(1.5deg)',
            boxShadow: `0 12px 36px ${theme.shadow}`,
            padding: '16px 18px', overflow: 'hidden',
          }}>
            <p style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 4px' }}>HARBOR · GREEK</p>
            <h4 style={{ fontFamily: 'Playfair Display', fontSize: 19, fontWeight: 700, color: '#FFF', margin: '0 0 6px' }}>Yia Yia's Table</h4>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.75)', margin: 0 }}>Imported ingredients, family recipes</p>
          </div>

          {/* Front card — top */}
          <div style={{
            position: 'absolute', top: 18, left: 82, width: 248, height: 168,
            background: RESTAURANTS[0].color, borderRadius: 20,
            transform: 'rotate(3.5deg)',
            boxShadow: `0 16px 44px ${theme.shadow}`,
            padding: '16px 18px', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 4px' }}>LITTLE SAIGON · VIETNAMESE</p>
                <h4 style={{ fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 700, color: '#FFF', margin: 0 }}>Pho Ba Dinh</h4>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 10, padding: '4px 9px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 700, color: '#FFF' }}>4.8★</span>
              </div>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.82)', margin: '8px 0 12px', lineHeight: 1.5 }}>
              Slow-brewed 12-hour bone broth
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ background: 'rgba(255,255,255,0.88)', borderRadius: 20, padding: '4px 11px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: RESTAURANTS[0].color }}>💎 Hidden Gem</span>
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>234 visits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial section divider */}
      <div style={{ margin: '6px 24px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: theme.divider }} />
        <span style={{ fontFamily: 'Playfair Display', fontSize: 11, fontStyle: 'italic', color: theme.textMuted }}>neighborhood picks</span>
        <div style={{ flex: 1, height: 1, background: theme.divider }} />
      </div>

      {/* Horizontal scroll - smaller cards */}
      <div style={{ paddingLeft: 24, display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
        {RESTAURANTS.slice(2).map(r => (
          <div key={r.id} style={{ minWidth: 136, background: theme.surface, borderRadius: 18, border: `1px solid ${theme.border}`, flexShrink: 0, overflow: 'hidden' }}>
            <div style={{ height: 56, background: r.color, opacity: 0.9 }} />
            <div style={{ padding: '10px 12px 12px' }}>
              <p style={{ fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: theme.text, margin: '0 0 2px' }}>{r.name}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, margin: 0 }}>{r.neighborhood}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 7 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: theme.primary, fontWeight: 700 }}>{r.rating}★</span>
                {r.isHiddenGem && <span style={{ fontSize: 12 }}>💎</span>}
              </div>
            </div>
          </div>
        ))}
        <div style={{ minWidth: 24, flexShrink: 0 }} />
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── Discover Screen ─────────────────────────────────────────────────────────
function DiscoverScreen({ theme }) {
  const [query, setQuery] = useState('');
  const [hood, setHood] = useState('All');
  const hoods = ['All', 'Little Saigon', 'Eastside', 'Chinatown', 'Harbor', 'Little Bogotá'];

  const visible = query
    ? RESTAURANTS.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase()))
    : RESTAURANTS;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '10px 24px 0' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 700, color: theme.text, margin: '0 0 14px' }}>Discover</h1>

        {/* Search bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: theme.surface, borderRadius: 16, padding: '10px 16px', border: `1px solid ${theme.border}`, marginBottom: 14 }}>
          {React.createElement(window.lucide.Search, { size: 15, color: theme.textMuted })}
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search cuisines, restaurants…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: 'Inter', fontSize: 14, color: theme.text, caretColor: theme.primary }}
          />
        </div>

        {/* Neighborhood filters */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 14, scrollbarWidth: 'none' }}>
          {hoods.map(h => (
            <div key={h} onClick={() => setHood(h)} style={{
              whiteSpace: 'nowrap', padding: '6px 13px', borderRadius: 20,
              background: hood === h ? theme.primary : theme.surface,
              color: hood === h ? '#FFF' : theme.textMuted,
              fontFamily: 'Inter', fontSize: 11, fontWeight: 500,
              border: `1px solid ${hood === h ? theme.primary : theme.border}`,
              cursor: 'pointer', flexShrink: 0,
            }}>{h}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {visible.map(r => (
          <div key={r.id} style={{ background: theme.surface, borderRadius: 22, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
            <div style={{ height: 84, background: r.color, position: 'relative' }}>
              {r.isHiddenGem && (
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.42)', borderRadius: 12, padding: '3px 9px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: '#FFF' }}>💎 Hidden Gem</span>
                </div>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, background: `linear-gradient(transparent, ${theme.surface})` }} />
            </div>
            <div style={{ padding: '8px 16px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: 17, fontWeight: 700, color: theme.text, margin: '0 0 2px' }}>{r.name}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, margin: 0 }}>{r.cuisine} · {r.neighborhood}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.primary, margin: 0 }}>{r.rating}★</p>
                  <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, margin: 0 }}>{r.visits} visits</p>
                </div>
              </div>
              <p style={{ fontFamily: 'Playfair Display', fontSize: 12, fontStyle: 'italic', color: theme.textSub, margin: '8px 0 12px', lineHeight: 1.5 }}>
                "{r.tagline}"
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, background: theme.primary, borderRadius: 12, padding: '8px', textAlign: 'center', cursor: 'pointer' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#FFF' }}>Add to Streak</span>
                </div>
                <div style={{ background: theme.surface2, borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  {React.createElement(window.lucide.Bookmark, { size: 15, color: theme.textMuted })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── Stories Screen ──────────────────────────────────────────────────────────
function StoriesScreen({ theme }) {
  const [stories, setStories] = useState(STORIES);

  const toggleVote = id => {
    setStories(prev => prev.map(s =>
      s.id === id ? { ...s, votes: s.userVoted ? s.votes - 1 : s.votes + 1, userVoted: !s.userVoted } : s
    ));
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '10px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 4px' }}>COMMUNITY</p>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 700, color: theme.text, margin: 0 }}>
              Flavor<br /><em style={{ color: theme.primary }}>Stories</em>
            </h1>
          </div>
          <div style={{ background: theme.primary, borderRadius: 22, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
            {React.createElement(window.lucide.Plus, { size: 14, color: '#FFF' })}
            <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#FFF' }}>Add Story</span>
          </div>
        </div>
        <div style={{ marginTop: 16, height: 1, background: theme.divider }} />
      </div>

      <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {stories.map(s => (
          <div key={s.id} style={{ background: theme.surface, borderRadius: 22, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
            <div style={{ height: 5, background: s.color }} />
            <div style={{ padding: '14px 16px' }}>
              {/* Author row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: '#FFF' }}>{s.author[0]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: theme.text, margin: 0 }}>{s.author}</p>
                  <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.primary, margin: 0 }}>{s.badge}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: theme.text, margin: 0 }}>{s.dish}</p>
                  <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, margin: 0 }}>at {s.restaurant}</p>
                </div>
              </div>

              {/* Pull-quote style story */}
              <div style={{ borderLeft: `3px solid ${s.color}`, paddingLeft: 12, marginBottom: 14 }}>
                <p style={{ fontFamily: 'Playfair Display', fontSize: 14, fontStyle: 'italic', color: theme.textSub, margin: 0, lineHeight: 1.65 }}>
                  "{s.story}"
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div onClick={() => toggleVote(s.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                  background: s.userVoted ? theme.primaryDim : theme.surface2,
                  border: `1px solid ${s.userVoted ? theme.primary : theme.border}`,
                  borderRadius: 20, padding: '6px 13px',
                }}>
                  {React.createElement(window.lucide.Heart, { size: 13, color: s.userVoted ? theme.primary : theme.textMuted, fill: s.userVoted ? theme.primary : 'none' })}
                  <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: s.userVoted ? theme.primary : theme.textMuted }}>{s.votes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {React.createElement(window.lucide.MessageCircle, { size: 14, color: theme.textMuted })}
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: theme.textMuted }}>8</span>
                </div>
                <div style={{ marginLeft: 'auto', cursor: 'pointer' }}>
                  {React.createElement(window.lucide.Share2, { size: 14, color: theme.textMuted })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── Challenges Screen ───────────────────────────────────────────────────────
function ChallengesScreen({ theme }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '10px 24px 0' }}>
        <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 4px' }}>WEEK 13 · 2026</p>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 700, color: theme.text, margin: '0 0 16px' }}>
          Challenges &<br /><em style={{ color: theme.primary }}>Leaderboard</em>
        </h1>
      </div>

      {/* Active challenges */}
      <div style={{ padding: '0 24px' }}>
        {CHALLENGES.map(c => (
          <div key={c.id} style={{ background: theme.surface, borderRadius: 22, padding: '16px', marginBottom: 14, border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ flex: 1, paddingRight: 10 }}>
                <p style={{ fontFamily: 'Inter', fontSize: 9, color: theme.primary, textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 4px' }}>
                  ACTIVE · {c.endDays} DAYS LEFT
                </p>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>{c.title}</h3>
              </div>
              <div style={{ background: theme.primaryDim, borderRadius: 20, padding: '5px 10px', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: theme.primary }}>{c.participants.toLocaleString()} in</span>
              </div>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: theme.textSub, margin: '0 0 14px', lineHeight: 1.55 }}>{c.desc}</p>

            {/* Progress bar */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted }}>Progress</span>
                <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: theme.primary }}>{c.progress} / {c.total}</span>
              </div>
              <div style={{ height: 7, background: theme.surface2, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(c.progress / c.total) * 100}%`, height: '100%', background: theme.primary, borderRadius: 4 }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15 }}>🏆</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: theme.textSub }}>
                Reward: <strong style={{ color: theme.text }}>{c.reward}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div style={{ padding: '4px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: theme.divider }} />
          <span style={{ fontFamily: 'Playfair Display', fontSize: 14, fontStyle: 'italic', color: theme.textMuted }}>this week's top streaks</span>
          <div style={{ flex: 1, height: 1, background: theme.divider }} />
        </div>

        {LEADERBOARD.map(entry => (
          <div key={entry.rank} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
            borderRadius: 16, marginBottom: 6,
            background: entry.isUser ? theme.primaryDim : 'transparent',
            border: `1px solid ${entry.isUser ? theme.primary + '40' : 'transparent'}`,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: entry.rank === 1 ? '#C8A400' : entry.rank === 2 ? '#909090' : entry.rank === 3 ? '#A06030' : theme.surface2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: entry.rank <= 3 ? '#FFF' : theme.textMuted }}>{entry.rank}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: entry.isUser ? 700 : 500, color: entry.isUser ? theme.primary : theme.text, margin: 0 }}>{entry.name}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textMuted, margin: 0 }}>{entry.badges} badges</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 14 }}>🔥</span>
              <span style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: theme.text }}>{entry.streak}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── Profile Screen ──────────────────────────────────────────────────────────
function ProfileScreen({ theme, isDark, setIsDark }) {
  const earned = BADGES.filter(b => b.earned);
  const locked = BADGES.filter(b => !b.earned);
  const angles = [-6, 2, -3];
  const lefts = [0, 52, 108];
  const tops = [8, 4, 10];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      {/* Profile header */}
      <div style={{ padding: '10px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{ width: 62, height: 62, borderRadius: '50%', background: RESTAURANTS[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2.5px solid ${theme.primary}`, flexShrink: 0 }}>
            <span style={{ fontFamily: 'Playfair Display', fontSize: 24, fontWeight: 900, color: '#FFF' }}>S</span>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 700, color: theme.text, margin: '0 0 2px' }}>Sofia Martinez</h2>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: theme.primary, margin: 0 }}>Little Saigon Maven · Level 3</p>
          </div>
          <div style={{ cursor: 'pointer' }}>
            {React.createElement(window.lucide.Settings, { size: 19, color: theme.textMuted })}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', background: theme.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
          {[{ label: 'Streak', value: '31🔥' }, { label: 'Badges', value: '4' }, { label: 'Stories', value: '12' }, { label: 'Visits', value: '89' }].map((stat, i) => (
            <div key={i} style={{ flex: 1, padding: '13px 6px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${theme.border}` : 'none' }}>
              <p style={{ fontFamily: 'Playfair Display', fontSize: 15, fontWeight: 700, color: theme.text, margin: '0 0 2px' }}>{stat.value}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 9, color: theme.textMuted, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Identity Badges — OVERLAPPING ANGLED CARDS */}
      <div style={{ padding: '0 24px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 19, fontWeight: 700, color: theme.text, margin: 0 }}>Identity Badges</h3>
          <span style={{ fontFamily: 'Inter', fontSize: 10, color: theme.primary, textTransform: 'uppercase', letterSpacing: 1.5 }}>View all</span>
        </div>

        {/* Angled badge fan */}
        <div style={{ position: 'relative', height: 158, marginBottom: 16 }}>
          {earned.map((badge, i) => (
            <div key={badge.id} style={{
              position: 'absolute', left: lefts[i], top: tops[i],
              width: 104, height: 132,
              background: `linear-gradient(145deg, ${badge.color}, ${badge.color}cc)`,
              borderRadius: 18, transform: `rotate(${angles[i]}deg)`,
              boxShadow: `0 10px 28px ${theme.shadow}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '14px 8px', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 30, marginBottom: 8 }}>{badge.icon}</span>
              <p style={{ fontFamily: 'Playfair Display', fontSize: 11, fontWeight: 700, color: '#FFF', textAlign: 'center', margin: '0 0 8px', lineHeight: 1.3 }}>{badge.name}</p>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1, 2, 3].map(dot => (
                  <div key={dot} style={{ width: 7, height: 7, borderRadius: '50%', background: dot <= badge.level ? '#FFF' : 'rgba(255,255,255,0.25)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Locked badges */}
        <div style={{ display: 'flex', gap: 10 }}>
          {locked.map(badge => (
            <div key={badge.id} style={{ flex: 1, background: theme.surface, borderRadius: 16, padding: '13px 8px', textAlign: 'center', border: `1.5px dashed ${theme.border}`, opacity: 0.65 }}>
              <span style={{ fontSize: 22, opacity: 0.35 }}>{badge.icon}</span>
              <p style={{ fontFamily: 'Inter', fontSize: 9, color: theme.textMuted, margin: '4px 0 2px', textTransform: 'uppercase', letterSpacing: 1 }}>Locked</p>
              <p style={{ fontFamily: 'Inter', fontSize: 10, color: theme.textSub, margin: 0 }}>{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ height: 1, background: theme.divider, marginBottom: 16 }} />
        <h3 style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 600, color: theme.text, margin: '0 0 12px' }}>Preferences</h3>

        <div style={{ background: theme.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
          {/* Dark mode toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 16, color: theme.primary })}
              <span style={{ fontFamily: 'Inter', fontSize: 14, color: theme.text }}>Dark Mode</span>
            </div>
            <div onClick={() => setIsDark(!isDark)} style={{
              width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
              background: isDark ? theme.primary : theme.border,
              position: 'relative', transition: 'background 0.2s',
            }}>
              <div style={{
                position: 'absolute', top: 2,
                left: isDark ? 22 : 2,
                width: 20, height: 20, borderRadius: '50%',
                background: '#FFF', transition: 'left 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
              }} />
            </div>
          </div>

          {[
            { Icon: window.lucide.Bell, label: 'Notifications', value: 'Daily 7 PM' },
            { Icon: window.lucide.MapPin, label: 'Home Neighborhood', value: 'Little Saigon' },
            { Icon: window.lucide.Users, label: 'Privacy', value: 'Friends only' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < 2 ? `1px solid ${theme.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {React.createElement(item.Icon, { size: 16, color: theme.textMuted })}
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: theme.text }}>{item.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: theme.textMuted }}>{item.value}</span>
                {React.createElement(window.lucide.ChevronRight, { size: 14, color: theme.textMuted })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 28 }} />
    </div>
  );
}

// ─── App Root ────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? THEMES.dark : THEMES.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'discover', label: 'Discover', icon: window.lucide.Search },
    { id: 'stories', label: 'Stories', icon: window.lucide.BookOpen },
    { id: 'challenges', label: 'Challenges', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    stories: StoriesScreen,
    challenges: ChallengesScreen,
    profile: ProfileScreen,
  };

  const ScreenComponent = screens[activeTab];

  const navItemStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 3, padding: '8px 6px', cursor: 'pointer', flex: 1,
  };

  const labelStyle = {
    fontFamily: 'Inter', fontSize: 10, fontWeight: 500,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{
        width: 375, height: 812,
        background: theme.bg, borderRadius: 46,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 0 0 10px #1a1a1a, 0 0 0 12px #2a2a2a, 0 48px 100px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
      }}>
        <DynamicIsland />
        <StatusBar theme={theme} />

        {/* Screen */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ScreenComponent theme={theme} isDark={isDark} setIsDark={setIsDark} />
        </div>

        {/* Bottom nav */}
        <div style={{ background: theme.navBg, borderTop: `1px solid ${theme.border}`, display: 'flex', paddingBottom: 18, paddingTop: 2 }}>
          {tabs.map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ ...navItemStyle, color: activeTab === tab.id ? theme.primary : theme.textMuted }}>
              {React.createElement(tab.icon, { size: 22 })}
              <span style={labelStyle}>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
