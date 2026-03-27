// CraftQuest — Buy, Create & Compete in Art Challenges
// Interactive Mobile Prototype

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────
// THEME SYSTEM
// ─────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0C0C15',
    surface: '#121220',
    card: '#1A1A28',
    cardAlt: '#21212F',
    primary: '#A855F7',
    primaryLight: '#C084FC',
    primaryDark: '#7C3AED',
    primaryGlow: 'rgba(168,85,247,0.22)',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    accentGlow: 'rgba(245,158,11,0.2)',
    pink: '#F472B6',
    teal: '#2DD4BF',
    text: '#EEE8FF',
    textSecondary: '#8888AA',
    textMuted: '#44445A',
    border: '#222235',
    borderLight: '#2A2A3C',
    navBg: '#0F0F1C',
    success: '#34D399',
    warning: '#FB923C',
    error: '#F87171',
  },
  light: {
    bg: '#F6F2FF',
    surface: '#FFFFFF',
    card: '#FDFAFF',
    cardAlt: '#EDE9FE',
    primary: '#7C3AED',
    primaryLight: '#A855F7',
    primaryDark: '#5B21B6',
    primaryGlow: 'rgba(124,58,237,0.12)',
    accent: '#D97706',
    accentLight: '#F59E0B',
    accentGlow: 'rgba(217,119,6,0.12)',
    pink: '#DB2777',
    teal: '#0D9488',
    text: '#1A1228',
    textSecondary: '#5B4F8A',
    textMuted: '#B0A8C8',
    border: '#DDD6FE',
    borderLight: '#EDE9FE',
    navBg: '#FFFFFF',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
  },
};

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const challenges = [
  { id: 1, title: 'Watercolor Botanicals', category: 'Traditional Art', color1: '#A855F7', color2: '#6366F1', participants: 847, days: 5, difficulty: 'Beginner', xp: 500, joined: true, progress: 65, emoji: '🌿', host: '@flora_studio', materials: 3 },
  { id: 2, title: 'Neon Digital Portraits', category: 'Digital Art', color1: '#EC4899', color2: '#A855F7', participants: 2108, days: 3, difficulty: 'Advanced', xp: 900, joined: false, progress: 0, emoji: '✨', host: '@neon_kai', materials: 2 },
  { id: 3, title: 'Urban Sketching Sprint', category: 'Illustration', color1: '#F59E0B', color2: '#EF4444', participants: 1243, days: 12, difficulty: 'Intermediate', xp: 700, joined: true, progress: 30, emoji: '🏙️', host: '@urban_ink', materials: 4 },
  { id: 4, title: 'Handmade Jewelry Quest', category: 'Crafts', color1: '#14B8A6', color2: '#3B82F6', participants: 634, days: 8, difficulty: 'Intermediate', xp: 600, joined: false, progress: 0, emoji: '💎', host: '@gem_crafts', materials: 5 },
  { id: 5, title: 'Paper Sculpture Sprint', category: 'Paper Art', color1: '#10B981', color2: '#14B8A6', participants: 429, days: 15, difficulty: 'Beginner', xp: 400, joined: false, progress: 0, emoji: '📐', host: '@fold_magic', materials: 2 },
];

const products = [
  { id: 1, name: 'Pro Watercolor Set 36', price: 34.99, rating: 4.8, reviews: 234, color: '#A855F7', emoji: '🎨', forChallenge: 'Watercolor Botanicals', badge: true, tag: 'Bestseller' },
  { id: 2, name: 'Digital Brush Pack Vol.3', price: 12.99, rating: 4.9, reviews: 512, color: '#EC4899', emoji: '🖌️', forChallenge: 'Neon Digital Portraits', badge: true, tag: 'New' },
  { id: 3, name: 'Premium Sketch Pad A3', price: 18.50, rating: 4.7, reviews: 89, color: '#F59E0B', emoji: '📓', forChallenge: 'Urban Sketching Sprint', badge: false, tag: null },
  { id: 4, name: 'Wire Jewelry Starter Kit', price: 22.00, rating: 4.6, reviews: 167, color: '#14B8A6', emoji: '⚡', forChallenge: 'Handmade Jewelry Quest', badge: true, tag: null },
  { id: 5, name: 'Acrylic Paint Set Pro', price: 28.75, rating: 4.8, reviews: 341, color: '#10B981', emoji: '🖼️', forChallenge: null, badge: false, tag: 'Sale' },
  { id: 6, name: 'Botanical Reference Pack', price: 8.99, rating: 5.0, reviews: 78, color: '#6366F1', emoji: '🌸', forChallenge: 'Watercolor Botanicals', badge: true, tag: null },
];

const leaderboardData = [
  { rank: 1, name: 'Luna Starcraft', handle: '@luna_art', pts: 4821, avatar: '🦋', quests: 28, streak: 45 },
  { rank: 2, name: 'Kai Neon', handle: '@neon_kai', pts: 4190, avatar: '⚡', quests: 24, streak: 30 },
  { rank: 3, name: 'Sam Brush', handle: '@brushwork', pts: 3876, avatar: '🎨', quests: 21, streak: 22 },
  { rank: 4, name: 'Mia Sculptor', handle: '@mia_makes', pts: 3210, avatar: '🌙', quests: 18, streak: 15 },
  { rank: 5, name: 'Alex Inkflow', handle: '@inkflow', pts: 2954, avatar: '✏️', quests: 16, streak: 12 },
  { rank: 6, name: 'You', handle: '@craftmaster', pts: 2341, avatar: '🚀', quests: 12, streak: 7, isMe: true },
  { rank: 7, name: 'Ray Origami', handle: '@ray_fold', pts: 1987, avatar: '📐', quests: 11, streak: 5 },
];

const badgesData = [
  { id: 1, name: 'First Quest', icon: '⭐', earned: true },
  { id: 2, name: '7-Day Streak', icon: '🔥', earned: true },
  { id: 3, name: 'Top Creator', icon: '👑', earned: true },
  { id: 4, name: 'Community Star', icon: '💫', earned: true },
  { id: 5, name: 'Speed Crafter', icon: '⚡', earned: false },
  { id: 6, name: 'Master Artist', icon: '🎭', earned: false },
];

// ─────────────────────────────────────────────
// STATUS BAR
// ─────────────────────────────────────────────
function StatusBar({ t }) {
  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  return (
    <div style={{ height: 50, paddingTop: 14, paddingLeft: 22, paddingRight: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: t.bg, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: 0.4 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <WifiIcon size={14} color={t.textSecondary} />
        <BatteryIcon size={16} color={t.textSecondary} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────
function HomeScreen({ t }) {
  const BellIcon = window.lucide.Bell;
  const FlameIcon = window.lucide.Flame;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const ZapIcon = window.lucide.Zap;
  const TargetIcon = window.lucide.Target;
  const UsersIcon = window.lucide.Users;
  const ClockIcon = window.lucide.Clock;
  const AwardIcon = window.lucide.Award;
  const PlusIcon = window.lucide.Plus;

  const featured = challenges[1];
  const activeQuests = challenges.filter(c => c.joined);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 12, color: t.textSecondary, margin: '0 0 2px' }}>Good morning,</p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>CraftMaster 🚀</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.accentGlow, border: `1px solid ${t.accent}44`, borderRadius: 20, padding: '5px 10px' }}>
            <FlameIcon size={13} color={t.accent} />
            <span style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>7</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BellIcon size={15} color="white" />
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div style={{ margin: '0 20px 16px', background: t.card, borderRadius: 16, padding: '12px 16px', border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ZapIcon size={13} color={t.accent} />
            <span style={{ fontSize: 12, color: t.textSecondary }}>Level 12 · 2,341 XP</span>
          </div>
          <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>659 to Level 13</span>
        </div>
        <div style={{ height: 6, background: t.cardAlt, borderRadius: 3 }}>
          <div style={{ height: '100%', width: '78%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3 }} />
        </div>
      </div>

      {/* Featured Challenge */}
      <div style={{ margin: '0 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: 0 }}>Featured Quest</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <span style={{ fontSize: 11, color: t.primary }}>View all</span>
            <ChevronRightIcon size={12} color={t.primary} />
          </div>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${featured.color1}, ${featured.color2})`, borderRadius: 22, padding: '20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -24, top: -24, width: 130, height: 130, borderRadius: 65, background: 'rgba(255,255,255,0.09)' }} />
          <div style={{ position: 'absolute', right: 18, bottom: -28, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <span style={{ background: 'rgba(0,0,0,0.28)', color: 'white', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{featured.category}</span>
            <span style={{ background: 'rgba(255,255,255,0.22)', color: 'white', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>🔥 Trending</span>
          </div>
          <div style={{ fontSize: 36, marginBottom: 6 }}>{featured.emoji}</div>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 20, margin: '0 0 3px' }}>{featured.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 12, margin: '0 0 14px' }}>Hosted by {featured.host}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <UsersIcon size={11} color="rgba(255,255,255,0.75)" />
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>{(featured.participants / 1000).toFixed(1)}k</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ClockIcon size={11} color="rgba(255,255,255,0.75)" />
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>{featured.days}d left</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ZapIcon size={11} color="rgba(255,255,255,0.75)" />
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>{featured.xp} XP</span>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: '7px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
              <PlusIcon size={12} color={featured.color1} />
              <span style={{ fontSize: 12, fontWeight: 700, color: featured.color1 }}>Join Quest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Quests */}
      <div style={{ margin: '0 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: 0 }}>Your Active Quests</h2>
          <TargetIcon size={16} color={t.primary} />
        </div>
        {activeQuests.map(quest => (
          <div key={quest.id} style={{ background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, background: `linear-gradient(135deg, ${quest.color1}, ${quest.color2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{quest.emoji}</div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text }}>{quest.title}</p>
                  <p style={{ margin: 0, fontSize: 11, color: t.textSecondary }}>{quest.days} days remaining</p>
                </div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: quest.color1 }}>{quest.progress}%</span>
            </div>
            <div style={{ height: 6, background: t.cardAlt, borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${quest.progress}%`, background: `linear-gradient(90deg, ${quest.color1}, ${quest.color2})`, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Top Creators */}
      <div style={{ margin: '0 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: 0 }}>Top Creators Today</h2>
          <AwardIcon size={16} color={t.accent} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {leaderboardData.slice(0, 3).map(person => (
            <div key={person.rank} style={{ flex: 1, background: t.card, borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${t.border}`, cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 5 }}>{person.avatar}</div>
              <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 600, color: t.text }}>{person.name.split(' ')[0]}</p>
              <p style={{ margin: '0 0 5px', fontSize: 10, color: t.textSecondary }}>{person.pts.toLocaleString()} XP</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                <FlameIcon size={10} color={t.accent} />
                <span style={{ fontSize: 10, color: t.accent, fontWeight: 600 }}>{person.streak}d</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// QUESTS SCREEN
// ─────────────────────────────────────────────
function QuestsScreen({ t }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [joined, setJoined] = useState({ 1: true, 3: true });
  const filters = ['All', 'Art', 'Craft', 'Digital', 'Photo'];
  const UsersIcon = window.lucide.Users;
  const ClockIcon = window.lucide.Clock;
  const ZapIcon = window.lucide.Zap;
  const ShoppingBagIcon = window.lucide.ShoppingBag;
  const CheckIcon = window.lucide.Check;
  const PlusIcon = window.lucide.Plus;
  const SearchIcon = window.lucide.Search;
  const SlidersIcon = window.lucide.SlidersHorizontal;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>Challenge Hub</h1>
          <SlidersIcon size={20} color={t.textSecondary} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 14px', marginBottom: 14 }}>
          <SearchIcon size={15} color={t.textMuted} />
          <span style={{ fontSize: 13, color: t.textMuted }}>Search challenges...</span>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setActiveFilter(f)} style={{ padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: activeFilter === f ? t.primary : t.card, color: activeFilter === f ? 'white' : t.textSecondary, border: `1px solid ${activeFilter === f ? t.primary : t.border}`, transition: 'all 0.2s' }}>{f}</div>
          ))}
        </div>
      </div>

      {/* Seasonal Camp Banner */}
      <div style={{ margin: '12px 20px', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', borderRadius: 18, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 14 }}>🏕️</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 700, letterSpacing: 1 }}>SEASONAL CAMP</span>
          </div>
          <p style={{ color: 'white', fontWeight: 800, fontSize: 15, margin: '0 0 2px' }}>Spring Art Camp 2026</p>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 11, margin: 0 }}>14 days · 8 quests · 5,000 XP prize</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.22)', borderRadius: 12, padding: '8px 16px', cursor: 'pointer' }}>
          <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>Join</span>
        </div>
      </div>

      {/* Challenge List */}
      <div style={{ padding: '4px 20px 20px' }}>
        <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 12, fontWeight: 500 }}>Active Challenges · {challenges.length} quests</p>
        {challenges.map(ch => (
          <div key={ch.id} style={{ background: t.card, borderRadius: 18, marginBottom: 14, overflow: 'hidden', border: `1px solid ${t.border}` }}>
            <div style={{ height: 76, background: `linear-gradient(135deg, ${ch.color1}, ${ch.color2})`, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '10px 16px' }}>
              <div style={{ position: 'absolute', right: 14, top: 12, background: 'rgba(0,0,0,0.32)', color: 'white', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 10 }}>{ch.difficulty}</div>
              <span style={{ fontSize: 28 }}>{ch.emoji}</span>
            </div>
            <div style={{ padding: '12px 16px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: t.text }}>{ch.title}</h3>
                  <p style={{ margin: 0, fontSize: 11, color: t.textSecondary }}>{ch.category} · {ch.host}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: `${ch.color1}20`, border: `1px solid ${ch.color1}44`, borderRadius: 10, padding: '3px 8px' }}>
                  <ZapIcon size={10} color={ch.color1} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: ch.color1 }}>{ch.xp} XP</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <UsersIcon size={11} color={t.textMuted} />
                  <span style={{ fontSize: 11, color: t.textMuted }}>{ch.participants.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ClockIcon size={11} color={t.textMuted} />
                  <span style={{ fontSize: 11, color: t.textMuted }}>{ch.days}d left</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ShoppingBagIcon size={11} color={t.textMuted} />
                  <span style={{ fontSize: 11, color: t.textMuted }}>{ch.materials} materials</span>
                </div>
              </div>
              {joined[ch.id] && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: t.textSecondary }}>Progress</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: ch.color1 }}>{ch.progress}%</span>
                  </div>
                  <div style={{ height: 4, background: t.cardAlt, borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${ch.progress}%`, background: `linear-gradient(90deg, ${ch.color1}, ${ch.color2})`, borderRadius: 2 }} />
                  </div>
                </div>
              )}
              <div onClick={() => setJoined(j => ({ ...j, [ch.id]: !j[ch.id] }))} style={{ width: '100%', background: joined[ch.id] ? t.cardAlt : `linear-gradient(135deg, ${ch.color1}, ${ch.color2})`, border: joined[ch.id] ? `1px solid ${t.border}` : 'none', borderRadius: 12, padding: '9px', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {joined[ch.id]
                  ? <><CheckIcon size={13} color={t.textSecondary} /><span style={{ fontSize: 13, fontWeight: 600, color: t.textSecondary }}>Joined</span></>
                  : <><PlusIcon size={13} color="white" /><span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Join Quest</span></>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SHOP SCREEN
// ─────────────────────────────────────────────
function ShopScreen({ t }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState({});
  const categories = ['All', 'Paints', 'Digital', 'Tools', 'Paper'];
  const SearchIcon = window.lucide.Search;
  const ShoppingCartIcon = window.lucide.ShoppingCart;
  const StarIcon = window.lucide.Star;
  const PlusIcon = window.lucide.Plus;
  const CheckIcon = window.lucide.Check;
  const ZapIcon = window.lucide.Zap;
  const TrendingUpIcon = window.lucide.TrendingUp;

  const cartCount = Object.values(cartItems).filter(Boolean).length;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>Marketplace</h1>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCartIcon size={17} color={t.text} />
            </div>
            {cartCount > 0 && (
              <div style={{ position: 'absolute', top: -4, right: -4, width: 17, height: 17, borderRadius: 9, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'white' }}>{cartCount}</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 14px', marginBottom: 14 }}>
          <SearchIcon size={15} color={t.textMuted} />
          <span style={{ fontSize: 13, color: t.textMuted }}>Search art supplies...</span>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map(c => (
            <div key={c} onClick={() => setActiveCategory(c)} style={{ padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: activeCategory === c ? t.primary : t.card, color: activeCategory === c ? 'white' : t.textSecondary, border: `1px solid ${activeCategory === c ? t.primary : t.border}`, transition: 'all 0.2s' }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Quest Kit Banner */}
      <div style={{ margin: '12px 20px', background: t.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ZapIcon size={20} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 700, color: t.text }}>Quest Kit Bundles</p>
          <p style={{ margin: 0, fontSize: 11, color: t.textSecondary }}>Curated for your active challenges</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: t.primaryGlow, borderRadius: 10, padding: '4px 10px', flexShrink: 0 }}>
          <TrendingUpIcon size={11} color={t.primary} />
          <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>3 kits</span>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: '4px 20px 20px' }}>
        <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 12, fontWeight: 500 }}>{products.length} products available</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {products.map(product => (
            <div key={product.id} style={{ background: t.card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}` }}>
              <div style={{ height: 90, background: `linear-gradient(135deg, ${product.color}2A, ${product.color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: 34 }}>{product.emoji}</span>
                {product.tag && (
                  <div style={{ position: 'absolute', top: 8, left: 8, background: product.tag === 'Sale' ? '#EF4444' : product.tag === 'New' ? t.primary : t.accent, borderRadius: 6, padding: '2px 7px' }}>
                    <span style={{ fontSize: 9, color: 'white', fontWeight: 700 }}>{product.tag}</span>
                  </div>
                )}
                {product.badge && (
                  <div style={{ position: 'absolute', top: 8, right: 8, background: `${product.color}28`, border: `1px solid ${product.color}55`, borderRadius: 6, padding: '2px 5px' }}>
                    <span style={{ fontSize: 8, color: product.color, fontWeight: 700 }}>🏷️ Quest</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '10px 10px 12px' }}>
                <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{product.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 8 }}>
                  <StarIcon size={10} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: 10, color: t.textSecondary }}>{product.rating} ({product.reviews})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>${product.price}</span>
                  <div onClick={() => setCartItems(c => ({ ...c, [product.id]: !c[product.id] }))} style={{ width: 28, height: 28, borderRadius: 8, background: cartItems[product.id] ? t.success : t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                    {cartItems[product.id] ? <CheckIcon size={14} color="white" /> : <PlusIcon size={14} color="white" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// RANKS SCREEN
// ─────────────────────────────────────────────
function RanksScreen({ t }) {
  const [period, setPeriod] = useState('weekly');
  const FlameIcon = window.lucide.Flame;
  const TrophyIcon = window.lucide.Trophy;
  const ZapIcon = window.lucide.Zap;
  const AwardIcon = window.lucide.Award;

  const top3 = leaderboardData.slice(0, 3);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>Leaderboard</h1>
          <TrophyIcon size={22} color={t.accent} />
        </div>
        <div style={{ display: 'flex', background: t.card, borderRadius: 14, padding: 4, border: `1px solid ${t.border}` }}>
          {['weekly', 'monthly', 'alltime'].map(p => (
            <div key={p} onClick={() => setPeriod(p)} style={{ flex: 1, textAlign: 'center', padding: '7px', borderRadius: 10, cursor: 'pointer', background: period === p ? t.primary : 'transparent', transition: 'all 0.2s' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: period === p ? 'white' : t.textSecondary }}>{p === 'weekly' ? 'Weekly' : p === 'monthly' ? 'Monthly' : 'All Time'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div style={{ margin: '4px 20px 20px', background: `linear-gradient(135deg, ${t.primaryGlow}, ${t.accentGlow})`, borderRadius: 22, padding: '18px 10px 0', border: `1px solid ${t.border}` }}>
        <p style={{ textAlign: 'center', fontSize: 10, color: t.textSecondary, fontWeight: 700, letterSpacing: 1.5, margin: '0 0 16px' }}>TOP CRAFTERS THIS WEEK</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
          {/* 2nd */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 26, marginBottom: 4 }}>{top3[1].avatar}</div>
            <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 700, color: t.text }}>{top3[1].name.split(' ')[0]}</p>
            <p style={{ margin: '0 0 8px', fontSize: 10, color: t.textSecondary }}>{top3[1].pts.toLocaleString()}</p>
            <div style={{ height: 52, background: `${t.textSecondary}28`, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 18 }}>🥈</span></div>
          </div>
          {/* 1st */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{top3[0].avatar}</div>
            <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 800, color: t.text }}>{top3[0].name.split(' ')[0]}</p>
            <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, color: t.accent }}>{top3[0].pts.toLocaleString()}</p>
            <div style={{ height: 74, background: `linear-gradient(180deg, ${t.accent}38, ${t.accent}18)`, border: `1px solid ${t.accent}55`, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 22 }}>🏆</span></div>
          </div>
          {/* 3rd */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 26, marginBottom: 4 }}>{top3[2].avatar}</div>
            <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 700, color: t.text }}>{top3[2].name.split(' ')[0]}</p>
            <p style={{ margin: '0 0 8px', fontSize: 10, color: t.textSecondary }}>{top3[2].pts.toLocaleString()}</p>
            <div style={{ height: 38, background: '#CD7F3228', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 16 }}>🥉</span></div>
          </div>
        </div>
      </div>

      {/* Full List */}
      <div style={{ padding: '0 20px 20px' }}>
        <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 10, fontWeight: 500 }}>All Rankings</p>
        {leaderboardData.map(person => (
          <div key={person.rank} style={{ background: person.isMe ? t.primaryGlow : t.card, border: `1px solid ${person.isMe ? t.primary + '55' : t.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, textAlign: 'center' }}>
              {person.rank <= 3
                ? <span style={{ fontSize: 16 }}>{['🏆', '🥈', '🥉'][person.rank - 1]}</span>
                : <span style={{ fontSize: 14, fontWeight: 700, color: person.isMe ? t.primary : t.textMuted }}>#{person.rank}</span>}
            </div>
            <div style={{ fontSize: 24 }}>{person.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: person.isMe ? 700 : 600, color: t.text }}>{person.name}</p>
                {person.isMe && <span style={{ fontSize: 9, color: t.primary, fontWeight: 700, background: t.primaryGlow, padding: '2px 6px', borderRadius: 6 }}>YOU</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 10, color: t.textMuted }}>{person.handle}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FlameIcon size={9} color={t.accent} />
                  <span style={{ fontSize: 10, color: t.accent }}>{person.streak}d</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: person.isMe ? t.primary : t.text }}>{person.pts.toLocaleString()}</p>
              <p style={{ margin: 0, fontSize: 10, color: t.textMuted }}>XP</p>
            </div>
          </div>
        ))}
      </div>

      {/* Seasonal Camp */}
      <div style={{ margin: '0 20px 24px', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', borderRadius: 18, padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <p style={{ margin: '0 0 3px', fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 700, letterSpacing: 1 }}>🏕️ SPRING CAMP 2026</p>
            <p style={{ margin: 0, fontSize: 16, color: 'white', fontWeight: 800 }}>14 Days Remaining</p>
          </div>
          <AwardIcon size={24} color="rgba(255,255,255,0.88)" />
        </div>
        <div style={{ height: 6, background: 'rgba(0,0,0,0.2)', borderRadius: 3, marginBottom: 6 }}>
          <div style={{ height: '100%', width: '45%', background: 'white', borderRadius: 3 }} />
        </div>
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.78)' }}>4/8 quests completed · 45% progress</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────────
function ProfileScreen({ t, isDark, onToggleTheme }) {
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const ZapIcon = window.lucide.Zap;
  const AwardIcon = window.lucide.Award;
  const SettingsIcon = window.lucide.Settings;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const BellIcon = window.lucide.Bell;
  const ShieldIcon = window.lucide.Shield;
  const HelpCircleIcon = window.lucide.HelpCircle;
  const LogOutIcon = window.lucide.LogOut;
  const CameraIcon = window.lucide.Camera;
  const FlameIcon = window.lucide.Flame;
  const TrophyIcon = window.lucide.Trophy;
  const UsersIcon = window.lucide.Users;

  const stats = [
    { label: 'Quests', value: '12', icon: TrophyIcon, color: t.accent },
    { label: 'Streak', value: '7d', icon: FlameIcon, color: '#EF4444' },
    { label: 'Following', value: '48', icon: UsersIcon, color: t.teal },
    { label: 'Total XP', value: '2.3k', icon: ZapIcon, color: t.primary },
  ];

  const menuItems = [
    { icon: BellIcon, label: 'Notifications', color: t.accent },
    { icon: ShieldIcon, label: 'Privacy & Security', color: t.teal },
    { icon: HelpCircleIcon, label: 'Help & Support', color: t.primary },
    { icon: LogOutIcon, label: 'Sign Out', color: '#EF4444' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 18px', background: `linear-gradient(180deg, ${t.primaryGlow} 0%, transparent 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>Profile</h1>
          <SettingsIcon size={20} color={t.textSecondary} />
        </div>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ width: 82, height: 82, borderRadius: 41, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 10px', boxShadow: `0 0 0 3px ${t.bg}, 0 0 0 5px ${t.primary}55` }}>🚀</div>
            <div style={{ position: 'absolute', bottom: 10, right: -2, width: 24, height: 24, borderRadius: 12, background: t.card, border: `2px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <CameraIcon size={11} color={t.textSecondary} />
            </div>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 3px' }}>CraftMaster</h2>
          <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 3px' }}>@craftmaster</p>
          <p style={{ fontSize: 12, color: t.textMuted, margin: 0 }}>Creative explorer · Digital & Traditional</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ flex: 1, background: t.card, borderRadius: 13, padding: '10px 6px', textAlign: 'center', border: `1px solid ${t.border}` }}>
              {React.createElement(stat.icon, { size: 14, color: stat.color, style: { margin: '0 auto 4px', display: 'block' } })}
              <p style={{ margin: '0 0 1px', fontSize: 14, fontWeight: 800, color: t.text }}>{stat.value}</p>
              <p style={{ margin: 0, fontSize: 9, color: t.textMuted, lineHeight: 1.2 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: '4px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: 0 }}>Achievements</h2>
          <AwardIcon size={16} color={t.accent} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {badgesData.map(badge => (
            <div key={badge.id} style={{ background: badge.earned ? t.card : `${t.card}66`, border: `1px solid ${badge.earned ? t.border : t.borderLight}`, borderRadius: 12, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6, opacity: badge.earned ? 1 : 0.38 }}>
              <span style={{ fontSize: 15 }}>{badge.icon}</span>
              <span style={{ fontSize: 11, fontWeight: badge.earned ? 600 : 400, color: badge.earned ? t.text : t.textMuted }}>{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div style={{ margin: '0 20px 12px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: isDark ? '#1A1A30' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDark ? <MoonIcon size={18} color={t.primary} /> : <SunIcon size={18} color={t.accent} />}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</p>
            <p style={{ margin: 0, fontSize: 11, color: t.textSecondary }}>Tap to toggle theme</p>
          </div>
        </div>
        <div onClick={onToggleTheme} style={{ width: 50, height: 28, borderRadius: 14, cursor: 'pointer', position: 'relative', background: isDark ? t.primary : t.border, transition: 'background 0.3s' }}>
          <div style={{ position: 'absolute', top: 4, left: isDark ? 26 : 4, width: 20, height: 20, borderRadius: 10, background: 'white', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
        </div>
      </div>

      {/* Menu */}
      <div style={{ padding: '0 20px 24px' }}>
        {menuItems.map((item, i) => (
          <div key={i} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: `${item.color}1C`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(item.icon, { size: 16, color: item.color })}
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: item.label === 'Sign Out' ? item.color : t.text }}>{item.label}</span>
            <ChevronRightIcon size={15} color={t.textMuted} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
      * { scrollbar-width: none; -ms-overflow-style: none; box-sizing: border-box; }
      *::-webkit-scrollbar { display: none; }
      body { margin: 0; padding: 0; background: #080810; }
    `;
    document.head.appendChild(style);
  }, []);

  const t = themes[isDark ? 'dark' : 'light'];
  const toggleTheme = () => setIsDark(d => !d);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'quests', label: 'Quests', icon: window.lucide.Trophy },
    { id: 'shop', label: 'Shop', icon: window.lucide.ShoppingBag },
    { id: 'ranks', label: 'Ranks', icon: window.lucide.BarChart2 },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    quests: QuestsScreen,
    shop: ShopScreen,
    ranks: RanksScreen,
    profile: ProfileScreen,
  };

  const screenProps = {
    home: { t, isDark },
    quests: { t, isDark },
    shop: { t, isDark },
    ranks: { t, isDark },
    profile: { t, isDark, onToggleTheme: toggleTheme },
  };

  return (
    <div style={{ background: '#080810', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Sora', sans-serif", padding: '20px 0' }}>
      <div style={{
        width: 375, height: 812, borderRadius: 48, overflow: 'hidden', background: t.bg,
        position: 'relative',
        boxShadow: isDark
          ? '0 50px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(168,85,247,0.15), inset 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 50px 120px rgba(0,0,0,0.35), 0 0 0 1px rgba(124,58,237,0.2)',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 124, height: 34, background: '#000', borderRadius: 20, zIndex: 200 }} />

        <StatusBar t={t} />

        {/* Screen Content */}
        <div style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 82, overflow: 'hidden' }}>
          {React.createElement(screens[activeTab], screenProps[activeTab])}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 82,
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 16, paddingTop: 4,
          transition: 'background 0.35s ease',
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  cursor: 'pointer', padding: '6px 14px', borderRadius: 14,
                  background: isActive ? t.primaryGlow : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textMuted, strokeWidth: isActive ? 2.5 : 1.5 })}
                <span style={{ fontSize: 10, color: isActive ? t.primary : t.textMuted, fontWeight: isActive ? 700 : 400 }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
