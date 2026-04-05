const { useState, useEffect, useRef } = React;

// ─── Design Tokens ───────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#FEF2F2',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF5F5',
    text: '#1C1917',
    textMuted: '#78716C',
    textLight: '#A8A29E',
    primary: '#DC2626',
    primaryLight: '#FEE2E2',
    secondary: '#F87171',
    cta: '#CA8A04',
    ctaLight: '#FFFBEB',
    ctaBorder: '#FDE68A',
    border: '#FECACA',
    navBg: '#FFFFFF',
    shadow: 'rgba(220,38,38,0.15)',
  },
  dark: {
    bg: '#1A0505',
    surface: '#2D1010',
    surfaceAlt: '#3A1515',
    text: '#FEF2F2',
    textMuted: '#FCA5A5',
    textLight: '#F87171',
    primary: '#F87171',
    primaryLight: '#450A0A',
    secondary: '#DC2626',
    cta: '#EAB308',
    ctaLight: '#3B2200',
    ctaBorder: '#713F00',
    border: '#450A0A',
    navBg: '#2D1010',
    shadow: 'rgba(0,0,0,0.5)',
  },
};

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark, streakCount, setActiveScreen }) {
  const seasonal = [
    { name: 'Delicata Squash', type: 'Vegetable', color: '#CA8A04', producer: 'Sunrise Farm' },
    { name: 'Honeycrisp Apple', type: 'Fruit', color: '#DC2626', producer: 'Valley Orchards' },
    { name: 'Wild Chanterelle', type: 'Mushroom', color: '#D97706', producer: 'Forest Ridge' },
    { name: 'Lacinato Kale', type: 'Green', color: '#16A34A', producer: 'River Bend Farm' },
  ];

  const actions = [
    { label: 'Log Adaptation', screen: 'feed', icon: 'UtensilsCrossed' },
    { label: 'Find a Quest', screen: 'quests', icon: 'Map' },
    { label: 'Add to Almanac', screen: 'almanac', icon: 'BookOpen' },
  ];

  const r = 46, cx = 58, circumference = 2 * Math.PI * r;
  const progress = streakCount / 30;
  const offset = circumference * (1 - progress);

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      {/* Header */}
      <div style={{ padding: '22px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 21, fontWeight: 700, color: t.primary, letterSpacing: 0.3 }}>
            Harvest Hearth
          </div>
          <div style={{ fontSize: 12, color: t.textMuted, fontFamily: 'Karla, sans-serif', marginTop: 2 }}>
            Good morning, Maya · Sonoma County
          </div>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            width: 44, height: 44, borderRadius: 22, background: t.primaryLight,
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isDark
            ? React.createElement(window.lucide.Sun, { size: 20, color: t.primary })
            : React.createElement(window.lucide.Moon, { size: 20, color: t.primary })}
        </button>
      </div>

      {/* Heritage Streak Card */}
      <div style={{
        margin: '16px 20px 0', padding: '20px', borderRadius: 26,
        background: `linear-gradient(135deg, ${t.primary} 0%, #9B1C1C 100%)`,
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 8px 32px ${t.shadow}`,
      }}>
        <div style={{ position: 'absolute', top: -24, right: -24, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -16, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* SVG Streak Ring */}
          <div style={{ position: 'relative', width: 116, height: 116, flexShrink: 0 }}>
            <svg width={116} height={116} viewBox="0 0 116 116">
              <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={9} />
              <circle
                cx={cx} cy={cx} r={r} fill="none"
                stroke="white" strokeWidth={9}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cx})`}
                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: 'white', fontFamily: 'Karla, sans-serif', lineHeight: 1 }}>{streakCount}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'Karla, sans-serif', textTransform: 'uppercase', letterSpacing: 1 }}>days</div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <div style={{ animation: 'spinFire 2.2s ease-in-out infinite' }}>
                {React.createElement(window.lucide.Flame, { size: 18, color: '#FCD34D' })}
              </div>
              <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 15, fontWeight: 700, color: 'white', letterSpacing: 0.5 }}>Heritage Streak</div>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'Karla, sans-serif', lineHeight: 1.55 }}>
              You're on fire! <span style={{ fontWeight: 700, color: '#FCD34D' }}>16 more days</span> to your Pioneer Badge.
            </div>
            <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.2)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(streakCount / 30) * 100}%`, background: '#FCD34D', borderRadius: 100, transition: 'width 1.2s ease' }} />
            </div>
            <div style={{ marginTop: 4, fontSize: 10, color: 'rgba(255,255,255,0.65)', fontFamily: 'Karla, sans-serif' }}>{streakCount}/30 days to next milestone</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'flex', gap: 9 }}>
          {actions.map(({ label, screen, icon }) => {
            const Icon = window.lucide[icon];
            return (
              <button
                key={label}
                onClick={() => setActiveScreen(screen)}
                style={{
                  flex: 1, padding: '10px 6px 12px', background: t.surface,
                  border: `1.5px solid ${t.border}`, borderRadius: 18, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                  transition: 'all 0.15s ease', minHeight: 80,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = t.primaryLight; e.currentTarget.style.borderColor = t.primary; }}
                onMouseLeave={e => { e.currentTarget.style.background = t.surface; e.currentTarget.style.borderColor = t.border; }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 13, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(Icon, { size: 17, color: t.primary })}
                </div>
                <span style={{ fontSize: 10, fontFamily: 'Karla, sans-serif', color: t.text, fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seasonal Spotlight */}
      <div style={{ marginTop: 18 }}>
        <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 15, fontWeight: 700, color: t.text }}>Fall Harvest Spotlight</div>
          <div style={{ fontSize: 12, color: t.primary, fontFamily: 'Karla, sans-serif', fontWeight: 700, cursor: 'pointer' }}>See all</div>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 20, overflowX: 'auto', paddingRight: 20, paddingBottom: 4 }}>
          {seasonal.map(item => (
            <div
              key={item.name}
              style={{
                flexShrink: 0, width: 128, borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                border: `1.5px solid ${item.color}33`, transition: 'transform 0.2s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: 80, background: `linear-gradient(135deg, ${item.color}22, ${item.color}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${item.color}55` }}>
                  {React.createElement(window.lucide.Leaf, { size: 22, color: 'white' })}
                </div>
              </div>
              <div style={{ padding: '10px 12px 12px', background: t.surface }}>
                <div style={{ fontSize: 11, fontFamily: 'Karla, sans-serif', fontWeight: 700, color: t.text, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Karla, sans-serif', marginTop: 2 }}>{item.type}</div>
                <div style={{ fontSize: 9, color: t.textLight, fontFamily: 'Karla, sans-serif', marginTop: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
                  {React.createElement(window.lucide.MapPin, { size: 9, color: t.textLight })}
                  <span>{item.producer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Produce Alert */}
      <div style={{ margin: '14px 20px 0', padding: '13px 16px', background: t.ctaLight, borderRadius: 18, border: `1.5px solid ${t.ctaBorder}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        {React.createElement(window.lucide.Bell, { size: 20, color: t.cta })}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.text, fontFamily: 'Karla, sans-serif' }}>Farmers Market Tomorrow</div>
          <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'Karla, sans-serif', marginTop: 1 }}>Healdsburg Plaza · 8am–1pm · 23 vendors</div>
        </div>
        {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.cta })}
      </div>

      <div style={{ height: 22 }} />
    </div>
  );
}

// ─── Quests Screen ─────────────────────────────────────────────────────────────
function QuestsScreen({ t, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('active');

  const quests = [
    {
      id: 1, title: 'The Heirloom Hunt',
      description: 'Find 3 heirloom tomato varieties at local farms or markets this season.',
      progress: 2, total: 3, xp: 150, difficulty: 'Beginner', daysLeft: 5,
      grad: ['#DC2626', '#7C3AED'],
    },
    {
      id: 2, title: 'Valley Vintner Stories',
      description: 'Visit 2 local wineries and document their estate-grown culinary ingredients.',
      progress: 1, total: 2, xp: 200, difficulty: 'Intermediate', daysLeft: 12,
      grad: ['#CA8A04', '#DC2626'],
    },
    {
      id: 3, title: 'Fungi Forager',
      description: 'Identify and cook with 4 locally foraged or farmed mushroom species.',
      progress: 0, total: 4, xp: 250, difficulty: 'Advanced', daysLeft: 21,
      grad: ['#065F46', '#D97706'],
    },
  ];

  const badges = [
    { name: 'First Harvest', color: '#CA8A04', earned: true },
    { name: 'Market Regular', color: '#DC2626', earned: true },
    { name: 'Seasonal Chef', color: '#7C3AED', earned: true },
    { name: 'Lore Keeper', color: '#065F46', earned: false },
    { name: 'Heirloom Hunter', color: '#DC2626', earned: false },
    { name: 'Pioneer', color: '#CA8A04', earned: false },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 22, fontWeight: 700, color: t.primary }}>Local Lore Quests</div>
        <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2, fontFamily: 'Karla, sans-serif' }}>Explore your culinary region</div>
      </div>

      {/* XP Level Bar */}
      <div style={{ margin: '14px 20px 0', padding: '13px 16px', background: t.surface, borderRadius: 18, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <div style={{ fontSize: 12, fontFamily: 'Karla, sans-serif', fontWeight: 700, color: t.text }}>Level 4 · Heritage Explorer</div>
          <div style={{ fontSize: 12, fontFamily: 'Karla, sans-serif', color: t.cta, fontWeight: 700 }}>720 / 1000 XP</div>
        </div>
        <div style={{ height: 7, background: t.border, borderRadius: 100, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: '72%', borderRadius: 100,
            background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite linear',
          }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ margin: '14px 20px 0', display: 'flex', background: t.surfaceAlt, borderRadius: 16, padding: 4 }}>
        {['active', 'badges'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: activeTab === tab ? t.surface : 'transparent',
              color: activeTab === tab ? t.primary : t.textMuted,
              fontFamily: 'Karla, sans-serif', fontSize: 13, fontWeight: activeTab === tab ? 700 : 500,
              boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{tab === 'active' ? 'Active Quests' : 'Badges Earned'}</span>
          </button>
        ))}
      </div>

      {activeTab === 'active' ? (
        <div style={{ padding: '14px 20px 0' }}>
          {quests.map((q, i) => (
            <div
              key={q.id}
              style={{
                marginBottom: 14, borderRadius: 22, overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                animation: `slideUp 0.35s ease ${i * 0.08}s both`,
              }}
            >
              <div style={{ height: 7, background: `linear-gradient(90deg, ${q.grad[0]}, ${q.grad[1]})` }} />
              <div style={{ background: t.surface, padding: '16px 16px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1, marginRight: 10 }}>
                    <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 14, fontWeight: 700, color: t.text }}>{q.title}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, fontFamily: 'Karla, sans-serif', marginTop: 3, lineHeight: 1.45 }}>{q.description}</div>
                  </div>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: t.cta, fontFamily: 'Karla, sans-serif', lineHeight: 1 }}>{q.xp}</div>
                    <div style={{ fontSize: 9, color: t.textMuted, fontFamily: 'Karla, sans-serif', textTransform: 'uppercase', letterSpacing: 1 }}>XP</div>
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Karla, sans-serif' }}>Progress</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.primary, fontFamily: 'Karla, sans-serif' }}>{q.progress}/{q.total} complete</div>
                  </div>
                  <div style={{ height: 6, background: t.border, borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(q.progress / q.total) * 100}%`, background: `linear-gradient(90deg, ${q.grad[0]}, ${q.grad[1]})`, borderRadius: 100, minWidth: q.progress > 0 ? 12 : 0 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ padding: '4px 9px', background: t.primaryLight, borderRadius: 8 }}>
                      <span style={{ fontSize: 10, color: t.primary, fontFamily: 'Karla, sans-serif', fontWeight: 700 }}>{q.difficulty}</span>
                    </div>
                    <div style={{ padding: '4px 9px', background: t.surfaceAlt, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {React.createElement(window.lucide.Clock, { size: 10, color: t.textMuted })}
                      <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Karla, sans-serif' }}>{q.daysLeft}d left</span>
                    </div>
                  </div>
                  <button style={{
                    padding: '8px 16px', background: t.primary, border: 'none', borderRadius: 12,
                    color: 'white', fontSize: 11, fontFamily: 'Karla, sans-serif', fontWeight: 700,
                    cursor: 'pointer', transition: 'opacity 0.15s ease', minHeight: 36,
                  }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <span>Continue Quest</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {badges.map((badge, i) => (
              <div
                key={badge.name}
                style={{
                  padding: '16px 10px 14px', borderRadius: 20,
                  background: badge.earned ? t.surface : t.surfaceAlt,
                  border: `2px solid ${badge.earned ? badge.color : t.border}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  opacity: badge.earned ? 1 : 0.5,
                  animation: `fadeIn 0.35s ease ${i * 0.06}s both`,
                  cursor: 'pointer', transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: '50%',
                  background: badge.earned ? `${badge.color}20` : t.border,
                  border: `3px solid ${badge.earned ? badge.color : t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {React.createElement(badge.earned ? window.lucide.Award : window.lucide.Lock, { size: 22, color: badge.earned ? badge.color : t.textLight })}
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Karla, sans-serif', fontWeight: 700, color: badge.earned ? t.text : t.textMuted, textAlign: 'center', lineHeight: 1.3 }}>{badge.name}</div>
                {badge.earned && <div style={{ fontSize: 9, color: badge.color, fontFamily: 'Karla, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>EARNED</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 22 }} />
    </div>
  );
}

// ─── Almanac Screen ────────────────────────────────────────────────────────────
function AlmanacScreen({ t }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Vegetables', 'Fruits', 'Herbs', 'Producers', 'Recipes'];

  const entries = [
    { id: 1, name: 'Dry Creek Valley Zinfandel Grapes', type: 'Fruits', season: 'Fall', contributor: 'Elena M.', notes: 'Late harvest, intense jammy flavor perfect for reductions', color: '#7C3AED', count: 128 },
    { id: 2, name: 'Sonoma Coast Dungeness Crab', type: 'Producers', season: 'Winter', contributor: 'TomF', notes: 'Sweet, tender from cold Pacific waters, best Nov–Mar', color: '#0891B2', count: 89 },
    { id: 3, name: 'Petaluma Yellow Finn Potatoes', type: 'Vegetables', season: 'Summer', contributor: 'KaraL', notes: 'Buttery, dense texture, excellent for roasting or gratin', color: '#CA8A04', count: 204 },
    { id: 4, name: 'Bodega Bay Sea Beans', type: 'Herbs', season: 'Spring', contributor: 'NigelR', notes: 'Salty, crunchy coastal succulent — pickle or serve raw', color: '#065F46', count: 67 },
    { id: 5, name: 'Valley Ford Estero Gold Cheese', type: 'Producers', season: 'Year-round', contributor: 'SusanK', notes: 'Swiss-style, aged 4 months, nutty, pairs beautifully with apples', color: '#D97706', count: 156 },
    { id: 6, name: 'Alexander Valley Pomegranate', type: 'Fruits', season: 'Fall', contributor: 'MiaP', notes: 'Deep ruby jewels, complex tartness, use seeds in grain salads', color: '#DC2626', count: 91 },
  ];

  const filtered = entries.filter(e =>
    (activeFilter === 'All' || e.type === activeFilter) &&
    (searchQuery === '' || e.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 22, fontWeight: 700, color: t.primary }}>Community Almanac</div>
        <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2, fontFamily: 'Karla, sans-serif' }}>847 entries · Sonoma County, CA</div>
      </div>

      {/* Search */}
      <div style={{ margin: '14px 20px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
          {React.createElement(window.lucide.Search, { size: 16, color: t.textMuted })}
        </div>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search ingredients, producers..."
          style={{
            width: '100%', height: 46, padding: '0 14px 0 42px',
            background: t.surface, border: `1.5px solid ${t.border}`,
            borderRadius: 16, fontSize: 13, fontFamily: 'Karla, sans-serif', color: t.text,
            outline: 'none', transition: 'border-color 0.15s ease',
          }}
          onFocus={e => (e.target.style.borderColor = t.primary)}
          onBlur={e => (e.target.style.borderColor = t.border)}
        />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 20px 0', overflowX: 'auto', paddingBottom: 2 }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 100, minHeight: 36,
              border: `1.5px solid ${activeFilter === f ? t.primary : t.border}`,
              background: activeFilter === f ? t.primary : t.surface,
              color: activeFilter === f ? 'white' : t.textMuted,
              fontFamily: 'Karla, sans-serif', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}
          >
            <span>{f}</span>
          </button>
        ))}
      </div>

      {/* Entries */}
      <div style={{ padding: '14px 20px 0' }}>
        {filtered.map((entry, i) => (
          <div
            key={entry.id}
            style={{
              marginBottom: 11, padding: '14px 16px', background: t.surface,
              borderRadius: 20, border: `1px solid ${t.border}`,
              display: 'flex', gap: 14, alignItems: 'flex-start',
              animation: `slideUp 0.3s ease ${i * 0.05}s both`,
              cursor: 'pointer', transition: 'all 0.15s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 15, flexShrink: 0,
              background: `linear-gradient(135deg, ${entry.color}, ${entry.color}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${entry.color}44`,
            }}>
              {React.createElement(window.lucide.Sprout, { size: 22, color: 'white' })}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.text, fontFamily: 'Karla, sans-serif', lineHeight: 1.35 }}>{entry.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'Karla, sans-serif', marginTop: 2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.45 }}>{entry.notes}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ padding: '3px 8px', background: `${entry.color}18`, borderRadius: 6 }}>
                  <span style={{ fontSize: 10, color: entry.color, fontFamily: 'Karla, sans-serif', fontWeight: 700 }}>{entry.season}</span>
                </div>
                <div style={{ fontSize: 10, color: t.textLight, fontFamily: 'Karla, sans-serif' }}>by {entry.contributor}</div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
                  {React.createElement(window.lucide.Users, { size: 10, color: t.textLight })}
                  <span style={{ fontSize: 10, color: t.textLight, fontFamily: 'Karla, sans-serif' }}>{entry.count}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ position: 'sticky', bottom: 76, display: 'flex', justifyContent: 'flex-end', paddingRight: 20, marginTop: 6 }}>
        <button style={{
          width: 54, height: 54, borderRadius: 18, background: t.primary, border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 22px ${t.primary}66`, transition: 'transform 0.15s ease',
          animation: 'pulseGlow 2.5s infinite',
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {React.createElement(window.lucide.Plus, { size: 26, color: 'white' })}
        </button>
      </div>

      <div style={{ height: 10 }} />
    </div>
  );
}

// ─── Feed Screen ───────────────────────────────────────────────────────────────
function FeedScreen({ t, likedPosts, setLikedPosts, triedPosts, setTriedPosts }) {
  const posts = [
    {
      id: 1, user: 'Marta Chen', initials: 'MC', location: 'Healdsburg, CA', time: '2h ago',
      ingredient: 'Dry Creek Zinfandel Grapes', caption: "Turned these gorgeous late-harvest Zin grapes into a reduction sauce for duck breast. The jammy flavor is incredible with wild rosemary I foraged this morning.",
      likes: 47, comments: 12, color: '#7C3AED', quest: 'Valley Vintner Stories',
    },
    {
      id: 2, user: 'James Okafor', initials: 'JO', location: 'Sebastopol, CA', time: '4h ago',
      ingredient: 'Gravenstein Apples', caption: "Made my grandmother's recipe for Gravenstein apple butter. Found these at Walker Apples — last of the season. The tartness is absolutely unreal.",
      likes: 89, comments: 23, color: '#DC2626', quest: null,
    },
    {
      id: 3, user: 'Sofia Reyes', initials: 'SR', location: 'Petaluma, CA', time: '6h ago',
      ingredient: 'Bodega Bay Dungeness Crab', caption: "First crab of the season! Simple pasta with brown butter, capers, and lemon zest. The sweetness of this local crab is something else entirely.",
      likes: 134, comments: 41, color: '#0891B2', quest: 'Coastal Harvest Challenge',
    },
  ];

  const stories = [
    { name: 'You', initials: '+', color: t.primary, isAdd: true },
    { name: 'TomF', initials: 'TF', color: '#7C3AED' },
    { name: 'KaraL', initials: 'KL', color: '#065F46' },
    { name: 'NigelR', initials: 'NR', color: '#D97706' },
    { name: 'ElenaM', initials: 'EM', color: '#DC2626' },
    { name: 'SusanK', initials: 'SK', color: '#0891B2' },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <div style={{ padding: '22px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 22, fontWeight: 700, color: t.primary }}>Adaptations Feed</div>
        {React.createElement(window.lucide.SlidersHorizontal, { size: 22, color: t.textMuted })}
      </div>

      {/* Stories */}
      <div style={{ display: 'flex', gap: 14, paddingLeft: 20, overflowX: 'auto', paddingRight: 20, paddingBottom: 12 }}>
        {stories.map(s => (
          <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', flexShrink: 0 }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: s.isAdd ? t.primaryLight : s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${s.isAdd ? t.primary : 'transparent'}`,
              boxShadow: s.isAdd ? 'none' : `0 0 0 2.5px ${t.bg}, 0 0 0 4.5px ${s.color}`,
              transition: 'transform 0.15s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <span style={{ fontSize: s.isAdd ? 22 : 15, fontWeight: 700, color: s.isAdd ? t.primary : 'white', fontFamily: 'Karla, sans-serif' }}>{s.initials}</span>
            </div>
            <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Karla, sans-serif' }}>{s.name}</span>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div style={{ padding: '0 20px' }}>
        {posts.map((post, i) => (
          <div
            key={post.id}
            style={{
              marginBottom: 20, background: t.surface, borderRadius: 24, overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
              animation: `slideUp 0.35s ease ${i * 0.1}s both`,
            }}
          >
            {/* Header */}
            <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'Karla, sans-serif' }}>{post.initials}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Karla, sans-serif' }}>{post.user}</div>
                <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'Karla, sans-serif', display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
                  {React.createElement(window.lucide.MapPin, { size: 10, color: t.textMuted })}
                  <span>{post.location} · {post.time}</span>
                </div>
              </div>
              {React.createElement(window.lucide.MoreHorizontal, { size: 18, color: t.textMuted })}
            </div>

            {/* Ingredient Tag */}
            <div style={{ padding: '0 16px 10px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 9, background: `${post.color}18`, border: `1px solid ${post.color}33` }}>
                {React.createElement(window.lucide.Leaf, { size: 11, color: post.color })}
                <span style={{ fontSize: 11, color: post.color, fontFamily: 'Karla, sans-serif', fontWeight: 700 }}>{post.ingredient}</span>
              </div>
            </div>

            {/* Photo Area */}
            <div style={{ height: 155, background: `linear-gradient(145deg, ${post.color}28, ${post.color}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${post.color}38`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.ChefHat, { size: 34, color: post.color })}
              </div>
              {post.quest && (
                <div style={{ position: 'absolute', top: 10, right: 10, padding: '4px 9px', background: 'rgba(0,0,0,0.62)', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {React.createElement(window.lucide.Map, { size: 10, color: '#FCD34D' })}
                  <span style={{ fontSize: 9, color: '#FCD34D', fontFamily: 'Karla, sans-serif', fontWeight: 700 }}>{post.quest}</span>
                </div>
              )}
            </div>

            {/* Caption */}
            <div style={{ padding: '12px 16px 6px' }}>
              <p style={{ fontSize: 12, color: t.text, fontFamily: 'Karla, sans-serif', lineHeight: 1.65, margin: 0 }}>{post.caption}</p>
            </div>

            {/* Actions */}
            <div style={{ padding: '8px 16px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => { const n = new Set(likedPosts); n.has(post.id) ? n.delete(post.id) : n.add(post.id); setLikedPosts(n); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '8px 13px', borderRadius: 12,
                  border: 'none', cursor: 'pointer', minHeight: 36, transition: 'all 0.15s ease',
                  background: likedPosts.has(post.id) ? '#FEE2E2' : t.surfaceAlt,
                }}
              >
                {React.createElement(window.lucide.Heart, { size: 15, color: likedPosts.has(post.id) ? '#DC2626' : t.textMuted, fill: likedPosts.has(post.id) ? '#DC2626' : 'none' })}
                <span style={{ fontSize: 12, fontFamily: 'Karla, sans-serif', fontWeight: 600, color: likedPosts.has(post.id) ? '#DC2626' : t.textMuted }}>
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </span>
              </button>

              <button
                onClick={() => { const n = new Set(triedPosts); n.has(post.id) ? n.delete(post.id) : n.add(post.id); setTriedPosts(n); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '8px 13px', borderRadius: 12,
                  border: 'none', cursor: 'pointer', minHeight: 36, transition: 'all 0.15s ease',
                  background: triedPosts.has(post.id) ? t.ctaLight : t.surfaceAlt,
                }}
              >
                {React.createElement(window.lucide.ChefHat, { size: 15, color: triedPosts.has(post.id) ? t.cta : t.textMuted })}
                <span style={{ fontSize: 12, fontFamily: 'Karla, sans-serif', fontWeight: 600, color: triedPosts.has(post.id) ? t.cta : t.textMuted }}>
                  {triedPosts.has(post.id) ? 'Tried It!' : 'Try It'}
                </span>
              </button>

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                {React.createElement(window.lucide.MessageCircle, { size: 15, color: t.textMuted })}
                <span style={{ fontSize: 12, color: t.textMuted, fontFamily: 'Karla, sans-serif' }}>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Profile Screen ────────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark, streakCount }) {
  const stats = [
    { label: 'Day Streak', value: streakCount, icon: 'Flame', color: t.primary },
    { label: 'Adaptations', value: 48, icon: 'UtensilsCrossed', color: '#7C3AED' },
    { label: 'Quests Done', value: 12, icon: 'Map', color: '#065F46' },
    { label: 'Lore Entries', value: 31, icon: 'BookOpen', color: t.cta },
  ];

  const streakDays = Array.from({ length: 30 }, (_, i) => {
    const fromEnd = 30 - i;
    if (fromEnd <= streakCount) return true;
    return i % 4 !== 3;
  });

  const settingsItems = [
    { label: 'Dark Mode', icon: 'Moon', action: () => setIsDark(!isDark), toggle: isDark },
    { label: 'Produce Alerts', icon: 'Bell', action: null, toggle: true },
    { label: 'Privacy Settings', icon: 'Shield', action: null, toggle: null },
    { label: 'About Harvest Hearth', icon: 'Info', action: null, toggle: null },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      {/* Profile Header */}
      <div style={{ padding: '24px 20px 18px', background: `linear-gradient(180deg, ${t.primary}18, transparent)`, textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
          <div style={{
            width: 82, height: 82, borderRadius: '50%', margin: '0 auto',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 28px ${t.primary}44`,
          }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: 'white', fontFamily: 'Karla, sans-serif' }}>M</span>
          </div>
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%',
            background: t.cta, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2.5px solid ${t.bg}`,
          }}>
            {React.createElement(window.lucide.Edit2, { size: 11, color: 'white' })}
          </div>
        </div>
        <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 20, fontWeight: 700, color: t.text }}>Maya Thornton</div>
        <div style={{ fontSize: 12, color: t.textMuted, fontFamily: 'Karla, sans-serif', marginTop: 3 }}>Level 4 · Heritage Explorer</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 7 }}>
          {React.createElement(window.lucide.MapPin, { size: 12, color: t.primary })}
          <span style={{ fontSize: 12, color: t.primary, fontFamily: 'Karla, sans-serif', fontWeight: 700 }}>Sonoma County, CA</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {stats.map((s, i) => {
          const Icon = window.lucide[s.icon];
          return (
            <div key={s.label} style={{ padding: '14px 16px', background: t.surface, borderRadius: 20, border: `1px solid ${t.border}`, animation: `fadeIn 0.3s ease ${i * 0.07}s both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 11, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(Icon, { size: 15, color: s.color })}
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Karla, sans-serif', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Karla, sans-serif', marginTop: 1 }}>{s.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Streak Calendar */}
      <div style={{ margin: '14px 20px 0', padding: '16px', background: t.surface, borderRadius: 22, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 14, fontWeight: 700, color: t.text }}>Streak Calendar</div>
          <div style={{ fontSize: 11, color: t.cta, fontFamily: 'Karla, sans-serif', fontWeight: 700 }}>Last 30 Days</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 5 }}>
          {streakDays.map((active, i) => {
            const fromEnd = 30 - i;
            const inStreak = fromEnd <= streakCount;
            return (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 6,
                background: inStreak ? t.primary : (active ? t.secondary + '55' : t.border),
                opacity: inStreak ? 1 : (active ? 0.45 : 0.25),
                transition: 'all 0.2s ease',
              }} />
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: t.primary }} />
            <span style={{ fontSize: 9, color: t.textMuted, fontFamily: 'Karla, sans-serif' }}>Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: t.border }} />
            <span style={{ fontSize: 9, color: t.textMuted, fontFamily: 'Karla, sans-serif' }}>Missed</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div style={{ margin: '14px 20px 0' }}>
        <div style={{ fontFamily: '"Playfair Display SC", serif', fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 }}>Settings</div>
        <div style={{ background: t.surface, borderRadius: 22, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
          {settingsItems.map((item, i, arr) => {
            const Icon = window.lucide[item.icon];
            return (
              <div
                key={item.label}
                onClick={item.action || undefined}
                style={{
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                  borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                  cursor: 'pointer', transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = t.surfaceAlt)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {React.createElement(Icon, { size: 18, color: t.textMuted })}
                <span style={{ flex: 1, fontSize: 13, color: t.text, fontFamily: 'Karla, sans-serif', fontWeight: 500 }}>{item.label}</span>
                {item.toggle !== null ? (
                  <div style={{ width: 42, height: 24, borderRadius: 12, background: item.toggle ? t.primary : t.border, position: 'relative', transition: 'background 0.2s ease', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', top: 3, left: item.toggle ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'left 0.2s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                ) : React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textLight })}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ height: 22 }} />
    </div>
  );
}

// ─── Bottom Navigation ─────────────────────────────────────────────────────────
function BottomNav({ t, activeScreen, setActiveScreen }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'quests', label: 'Quests', icon: 'Map' },
    { id: 'almanac', label: 'Almanac', icon: 'BookOpen' },
    { id: 'feed', label: 'Feed', icon: 'Rss' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return (
    <div style={{
      height: 66, background: t.navBg, borderTop: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', padding: '0 6px',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
      transition: 'background 0.3s ease',
    }}>
      {tabs.map(tab => {
        const isActive = activeScreen === tab.id;
        const Icon = window.lucide[tab.icon];
        return (
          <button
            key={tab.id}
            onClick={() => setActiveScreen(tab.id)}
            style={{
              flex: 1, height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'all 0.15s ease', minWidth: 44,
            }}
          >
            <div style={{
              width: 38, height: 34, borderRadius: 11,
              background: isActive ? t.primaryLight : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}>
              {React.createElement(Icon, { size: 20, color: isActive ? t.primary : t.textLight })}
            </div>
            <span style={{
              fontSize: 10, fontFamily: 'Karla, sans-serif',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? t.primary : t.textLight,
              transition: 'color 0.15s ease',
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [triedPosts, setTriedPosts] = useState(new Set());
  const streakCount = 14;

  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    quests: QuestsScreen,
    almanac: AlmanacScreen,
    feed: FeedScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeScreen];

  const sharedProps = {
    t, isDark, setIsDark, streakCount,
    activeScreen, setActiveScreen,
    likedPosts, setLikedPosts,
    triedPosts, setTriedPosts,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Karla, sans-serif', padding: '20px 0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@400;700;900&family=Karla:wght@300;400;500;600;700;800&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 6px 22px rgba(220,38,38,0.55); }
          50%       { box-shadow: 0 6px 32px rgba(220,38,38,0.9), 0 0 0 8px rgba(220,38,38,0.15); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes spinFire {
          0%   { transform: rotate(-8deg) scale(0.92); }
          50%  { transform: rotate(8deg)  scale(1.12); }
          100% { transform: rotate(-8deg) scale(0.92); }
        }

        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        button { outline: none; -webkit-tap-highlight-color: transparent; }
        input  { outline: none; }
      `}</style>

      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 10px #1a1a1a, 0 0 0 11px #2a2a2a',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
        position: 'relative',
      }}>
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {React.createElement(ActiveScreen, sharedProps)}
        </div>
        <BottomNav t={t} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
}
