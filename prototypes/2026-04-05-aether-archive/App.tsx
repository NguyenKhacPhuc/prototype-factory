const { useState, useEffect, useRef } = React;

// ─── Icon Assignments ─────────────────────────────────────────────
const HomeIcon = window.lucide.Home;
const CompassIcon = window.lucide.Compass;
const LayersIcon = window.lucide.Layers;
const BookOpenIcon = window.lucide.BookOpen;
const AwardIcon = window.lucide.Award;
const StarIcon = window.lucide.Star;
const ZapIcon = window.lucide.Zap;
const FlameIcon = window.lucide.Flame;
const TrophyIcon = window.lucide.Trophy;
const PlusIcon = window.lucide.Plus;
const ArrowRightIcon = window.lucide.ArrowRight;
const SearchIcon = window.lucide.Search;
const SunIcon = window.lucide.Sun;
const MoonIcon = window.lucide.Moon;
const ChevronRightIcon = window.lucide.ChevronRight;
const SparklesIcon = window.lucide.Sparkles;
const PenIcon = window.lucide.Pen;
const BrainIcon = window.lucide.Brain;
const PaletteIcon = window.lucide.Palette;
const AtomIcon = window.lucide.Atom;
const LandmarkIcon = window.lucide.Landmark;
const CalculatorIcon = window.lucide.Calculator;
const LockIcon = window.lucide.Lock;
const CheckIcon = window.lucide.Check;
const ClockIcon = window.lucide.Clock;
const SettingsIcon = window.lucide.Settings;
const GridIcon = window.lucide.Grid;
const MapIcon = window.lucide.Map;
const ScrollIcon = window.lucide.Scroll;
const GlobeIcon = window.lucide.Globe;

// ─── Style Injection ──────────────────────────────────────────────
function StyleTag() {
  return React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Poppins:wght@300;400;500;600;700&display=swap');

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1);    opacity: 1; }
      50%       { transform: scale(1.1); opacity: 0.75; }
    }
    @keyframes gentleSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to   { width: var(--target-width); }
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    html, body { -webkit-font-smoothing: antialiased; }
  `);
}

// ─── Themes ───────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0D1117',
    surface: '#161B22',
    surfaceElevated: '#21262D',
    card: '#1A2332',
    primary: '#2563EB',
    secondary: '#3B82F6',
    cta: '#F97316',
    text: '#F8FAFC',
    textSub: '#94A3B8',
    textMuted: '#4B5563',
    border: '#2D3748',
    accent: '#818CF8',
    success: '#10B981',
    navBg: '#111827',
  },
  light: {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceElevated: '#F1F5F9',
    card: '#FFFFFF',
    primary: '#2563EB',
    secondary: '#3B82F6',
    cta: '#F97316',
    text: '#0F172A',
    textSub: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    accent: '#6366F1',
    success: '#059669',
    navBg: '#FFFFFF',
  },
};

// ─── Data ─────────────────────────────────────────────────────────
const todayFragment = {
  title: 'The Voynich Manuscript',
  category: 'Mystery & History',
  categoryColor: '#8B5CF6',
  teaser: 'A 15th-century illustrated codex written in an undeciphered language — it has baffled cryptographers, historians, and AI alike for over a century.',
  timeToRead: '4 min',
  echoes: 47,
  gradient: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 40%, #7C3AED 100%)',
};

const categories = [
  { name: 'Philosophy',   Icon: BrainIcon,      color: '#8B5CF6', count: 24 },
  { name: 'Art History',  Icon: PaletteIcon,    color: '#F59E0B', count: 31 },
  { name: 'Sciences',     Icon: AtomIcon,       color: '#10B981', count: 47 },
  { name: 'History',      Icon: LandmarkIcon,   color: '#EF4444', count: 38 },
  { name: 'Literature',   Icon: BookOpenIcon,   color: '#3B82F6', count: 19 },
  { name: 'Mathematics',  Icon: CalculatorIcon, color: '#EC4899', count: 22 },
];

const exploreFragments = [
  { id: 1, title: 'Whale Song Dialects',    category: 'Biology',     color: '#0EA5E9', echoes: 28, mins: 3 },
  { id: 2, title: 'Byzantine Gold Mosaic',  category: 'Art History', color: '#F59E0B', echoes: 42, mins: 5 },
  { id: 3, title: 'Quantum Superposition',  category: 'Physics',     color: '#10B981', echoes: 55, mins: 4 },
  { id: 4, title: 'The Stoic Daily Ritual', category: 'Philosophy',  color: '#8B5CF6', echoes: 63, mins: 3 },
  { id: 5, title: 'The Silk Road Networks', category: 'History',     color: '#EF4444', echoes: 37, mins: 6 },
];

const aetherweaveItems = [
  { id: 1, title: 'Golden Ratio',     category: 'Math',    color: '#7C3AED', h: 120, echoes: 35 },
  { id: 2, title: 'Whale Songs',      category: 'Bio',     color: '#0EA5E9', h: 80,  echoes: 28 },
  { id: 3, title: 'Byzantine Art',    category: 'Art',     color: '#F59E0B', h: 100, echoes: 42 },
  { id: 4, title: 'Quantum World',    category: 'Physics', color: '#10B981', h: 80,  echoes: 55 },
  { id: 5, title: 'Stoic Maxims',     category: 'Phil',    color: '#8B5CF6', h: 110, echoes: 63 },
  { id: 6, title: 'Silk Road',        category: 'History', color: '#EF4444', h: 90,  echoes: 37 },
  { id: 7, title: 'Bioluminescence',  category: 'Marine',  color: '#06B6D4', h: 80,  echoes: 44 },
  { id: 8, title: '???',              category: '...',     color: '#374151', h: 80,  echoes: 0, locked: true },
];

const journalEntries = [
  {
    id: 1,
    fragment: 'The Voynich Manuscript',
    date: 'Today, 9:42 AM',
    preview: 'What strikes me most is how something can remain a complete mystery in the age of AI and quantum computing. It\'s humbling — a reminder that not everything bends to our tools...',
    words: 312,
    symbol: '◈',
  },
  {
    id: 2,
    fragment: 'Byzantine Gold Mosaic',
    date: 'Yesterday',
    preview: 'I tried to replicate a tessellation pattern in my sketchbook. The level of patience required for such precision across entire cathedral walls is staggering...',
    words: 489,
    symbol: '✦',
  },
  {
    id: 3,
    fragment: 'The Stoic Daily Ritual',
    date: 'Apr 3',
    preview: '"You have power over your mind, not outside events." I wrote this on a sticky note and placed it on my monitor. Marcus Aurelius somehow feels more relevant than ever...',
    words: 734,
    symbol: '◎',
  },
  {
    id: 4,
    fragment: 'Quantum Superposition',
    date: 'Apr 2',
    preview: 'The observer effect feels like a metaphor for life. Do our expectations collapse the infinite possibilities around us into a single, observed reality?',
    words: 256,
    symbol: '⬡',
  },
];

const expeditionsData = [
  {
    id: 1,
    title: 'Renaissance Echoes',
    subtitle: 'Art, Science & the Rebirth of Humanity',
    progress: 0.65,
    daysLeft: 8,
    total: 12,
    done: 8,
    gradient: 'linear-gradient(135deg, #92400E 0%, #F59E0B 100%)',
    border: '#F59E0B',
    active: true,
    reward: 'Da Vinci Artifact',
  },
  {
    id: 2,
    title: 'Cosmic Harmonies',
    subtitle: 'The Mathematical Music of the Universe',
    progress: 0,
    daysLeft: 21,
    total: 10,
    done: 0,
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #7C3AED 100%)',
    border: '#3B82F6',
    active: false,
    reward: 'Celestial Orb Artifact',
  },
  {
    id: 3,
    title: 'Ancient Wisdom',
    subtitle: 'Philosophies That Shaped Civilizations',
    progress: 0,
    daysLeft: 30,
    total: 15,
    done: 0,
    gradient: 'linear-gradient(135deg, #064E3B 0%, #0EA5E9 100%)',
    border: '#10B981',
    active: false,
    reward: 'Sage Tome Artifact',
  },
];

// ─── Home Screen ──────────────────────────────────────────────────
function HomeScreen({ theme, isDark, toggleTheme, setActiveScreen }) {
  const [pressed, setPressed] = useState(false);
  const [compassHovered, setCompassHovered] = useState(null);

  const s = {
    container: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Poppins', sans-serif", animation: 'fadeIn 0.3s ease' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 0' },
    greeting: { fontFamily: "'Righteous', cursive", fontSize: 22, color: theme.text, lineHeight: 1.2 },
    greetingSub: { fontSize: 12, color: theme.textSub, marginTop: 2 },
    themeBtn: { width: 40, height: 40, borderRadius: 20, background: theme.surfaceElevated, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: theme.textMuted, textTransform: 'uppercase', marginBottom: 10 },
    heroCard: {
      margin: '20px 20px 0',
      borderRadius: 20,
      background: todayFragment.gradient,
      overflow: 'hidden',
      position: 'relative',
      cursor: 'pointer',
      boxShadow: '0 12px 40px rgba(124,58,237,0.4)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      transform: pressed ? 'scale(0.98)' : 'scale(1)',
    },
    heroCardInner: { padding: '24px 22px 20px', minHeight: 220 },
    heroBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 12px', marginBottom: 14 },
    heroBadgeText: { fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: 0.5 },
    heroTitle: { fontFamily: "'Righteous', cursive", fontSize: 24, color: '#fff', lineHeight: 1.25, marginBottom: 10 },
    heroTeaser: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 18 },
    heroFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    heroMeta: { display: 'flex', alignItems: 'center', gap: 14 },
    heroMetaItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.7)' },
    engageBtn: { display: 'flex', alignItems: 'center', gap: 6, background: '#F97316', borderRadius: 12, padding: '10px 18px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(249,115,22,0.5)' },
    engageBtnText: { fontSize: 13, fontWeight: 700, color: '#fff' },
    statsRow: { display: 'flex', gap: 10, padding: '16px 20px 0' },
    statCard: { flex: 1, borderRadius: 14, background: theme.surface, border: `1px solid ${theme.border}`, padding: '14px 12px', textAlign: 'center' },
    statValue: { fontFamily: "'Righteous', cursive", fontSize: 22, color: theme.text },
    statLabel: { fontSize: 10, color: theme.textSub, marginTop: 2, fontWeight: 500 },
    expedCard: { margin: '16px 20px 0', borderRadius: 16, background: theme.surface, border: `1px solid ${theme.border}`, padding: '14px 16px', cursor: 'pointer' },
    expedHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    expedTitle: { fontSize: 13, fontWeight: 600, color: theme.text },
    expedSub: { fontSize: 11, color: theme.textSub, marginTop: 2 },
    progressBar: { height: 6, borderRadius: 3, background: theme.surfaceElevated, overflow: 'hidden', marginBottom: 8 },
    progressFill: { height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #F59E0B, #EF4444)', width: '65%', transition: 'width 1s ease' },
    expedMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    expedMetaText: { fontSize: 11, color: theme.textSub },
    sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 10px' },
    seeAll: { fontSize: 12, color: theme.primary, fontWeight: 600, cursor: 'pointer' },
    compassRow: { display: 'flex', gap: 10, padding: '0 20px', overflowX: 'auto', paddingBottom: 20 },
    compassCard: { minWidth: 130, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' },
  };

  const compassSuggestions = [
    { title: 'Fibonacci in Music', color: '#7C3AED' },
    { title: 'Sacred Geometry', color: '#2563EB' },
    { title: 'Mandala Origins', color: '#EC4899' },
  ];

  return React.createElement('div', { style: s.container },
    React.createElement(StyleTag),
    // Header
    React.createElement('div', { style: s.header },
      React.createElement('div', null,
        React.createElement('div', { style: s.greeting }, 'Good Morning, Lena ✦'),
        React.createElement('div', { style: s.greetingSub }, 'Day 23 of your archive journey')
      ),
      React.createElement('div', { style: s.themeBtn, onClick: toggleTheme },
        isDark
          ? React.createElement(SunIcon, { size: 18, color: theme.cta })
          : React.createElement(MoonIcon, { size: 18, color: theme.primary })
      )
    ),
    // Hero Card
    React.createElement('div', { style: { padding: '16px 20px 0' } },
      React.createElement('div', { style: s.sectionLabel }, "Today's Aether Fragment")
    ),
    React.createElement('div', {
      style: s.heroCard,
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onMouseLeave: () => setPressed(false),
    },
      React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: 180, height: 180, borderRadius: '0 20px 0 100%', background: 'rgba(255,255,255,0.04)' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: -20, left: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' } }),
      React.createElement('div', { style: s.heroCardInner },
        React.createElement('div', { style: s.heroBadge },
          React.createElement(SparklesIcon, { size: 12, color: '#fff' }),
          React.createElement('span', { style: s.heroBadgeText }, todayFragment.category)
        ),
        React.createElement('div', { style: s.heroTitle }, todayFragment.title),
        React.createElement('div', { style: s.heroTeaser }, todayFragment.teaser),
        React.createElement('div', { style: s.heroFooter },
          React.createElement('div', { style: s.heroMeta },
            React.createElement('div', { style: s.heroMetaItem },
              React.createElement(ClockIcon, { size: 12, color: 'rgba(255,255,255,0.7)' }),
              React.createElement('span', null, todayFragment.timeToRead)
            ),
            React.createElement('div', { style: s.heroMetaItem },
              React.createElement(ZapIcon, { size: 12, color: 'rgba(255,255,255,0.7)' }),
              React.createElement('span', null, `${todayFragment.echoes} Echoes`)
            )
          ),
          React.createElement('div', { style: s.engageBtn },
            React.createElement('span', { style: s.engageBtnText }, 'Engage'),
            React.createElement(ArrowRightIcon, { size: 14, color: '#fff' })
          )
        )
      )
    ),
    // Stats Row
    React.createElement('div', { style: s.statsRow },
      React.createElement('div', { style: s.statCard },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 } },
          React.createElement(FlameIcon, { size: 16, color: '#F97316' }),
          React.createElement('div', { style: { ...s.statValue, fontSize: 20 } }, '23')
        ),
        React.createElement('div', { style: s.statLabel }, 'Day Streak')
      ),
      React.createElement('div', { style: s.statCard },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 } },
          React.createElement(ZapIcon, { size: 16, color: '#818CF8' }),
          React.createElement('div', { style: { ...s.statValue, fontSize: 20 } }, '1,247')
        ),
        React.createElement('div', { style: s.statLabel }, 'Echoes')
      ),
      React.createElement('div', { style: s.statCard },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 } },
          React.createElement(TrophyIcon, { size: 16, color: '#F59E0B' }),
          React.createElement('div', { style: { ...s.statValue, fontSize: 20 } }, '#142')
        ),
        React.createElement('div', { style: s.statLabel }, 'Global Rank')
      )
    ),
    // Active Expedition
    React.createElement('div', { style: s.expedCard, onClick: () => setActiveScreen('expeditions') },
      React.createElement('div', { style: s.expedHeader },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#F59E0B', animation: 'pulse 2s infinite' } }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: '#F59E0B', letterSpacing: 1, textTransform: 'uppercase' } }, 'Active Expedition')
          ),
          React.createElement('div', { style: s.expedTitle }, 'Renaissance Echoes'),
          React.createElement('div', { style: s.expedSub }, '8 fragments completed · 4 remaining')
        ),
        React.createElement(ChevronRightIcon, { size: 18, color: theme.textMuted })
      ),
      React.createElement('div', { style: s.progressBar },
        React.createElement('div', { style: s.progressFill })
      ),
      React.createElement('div', { style: s.expedMeta },
        React.createElement('span', { style: s.expedMetaText }, '65% complete'),
        React.createElement('span', { style: { ...s.expedMetaText, color: '#F97316', fontWeight: 600 } }, '8 days left')
      )
    ),
    // Curiosity Compass
    React.createElement('div', { style: s.sectionHeader },
      React.createElement('div', { style: s.sectionLabel }, '✦ Curiosity Compass'),
      React.createElement('div', { style: s.seeAll, onClick: () => setActiveScreen('explore') }, 'Explore all')
    ),
    React.createElement('div', { style: s.compassRow },
      compassSuggestions.map((s2, i) =>
        React.createElement('div', {
          key: i,
          style: { ...s.compassCard, background: s2.color, padding: '16px 14px', animation: `slideUp ${0.2 + i * 0.1}s ease` },
          onMouseEnter: () => setCompassHovered(i),
          onMouseLeave: () => setCompassHovered(null),
        },
          React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 } }, 'Related'),
          React.createElement('div', { style: { fontFamily: "'Righteous', cursive", fontSize: 14, color: '#fff', lineHeight: 1.3 } }, s2.title),
          React.createElement('div', { style: { marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(ArrowRightIcon, { size: 14, color: 'rgba(255,255,255,0.8)' })
          )
        )
      )
    )
  );
}

// ─── Explore Screen ───────────────────────────────────────────────
function ExploreScreen({ theme, setActiveScreen }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const s = {
    container: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Poppins', sans-serif", animation: 'fadeIn 0.3s ease' },
    header: { padding: '20px 20px 0' },
    title: { fontFamily: "'Righteous', cursive", fontSize: 24, color: theme.text, marginBottom: 4 },
    sub: { fontSize: 13, color: theme.textSub, marginBottom: 16 },
    searchBar: { display: 'flex', alignItems: 'center', gap: 10, background: theme.surface, borderRadius: 14, border: `1.5px solid ${searchFocused ? theme.primary : theme.border}`, padding: '0 14px', height: 48, transition: 'border-color 0.2s ease', marginBottom: 20 },
    searchInput: { flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: theme.text, fontFamily: "'Poppins', sans-serif" },
    compassBanner: { margin: '0 20px 20px', borderRadius: 18, background: `linear-gradient(135deg, ${theme.primary} 0%, #1E3A8A 100%)`, padding: '20px', position: 'relative', overflow: 'hidden' },
    compassIcon: { position: 'absolute', right: -10, top: -10, opacity: 0.15 },
    compassTitle: { fontFamily: "'Righteous', cursive", fontSize: 18, color: '#fff', marginBottom: 6 },
    compassDesc: { fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 14 },
    compassBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', backdropFilter: 'blur(10px)' },
    compassBtnText: { fontSize: 12, fontWeight: 600, color: '#fff' },
    sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: theme.textMuted, textTransform: 'uppercase', padding: '0 20px', marginBottom: 12 },
    catGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px', marginBottom: 24 },
    catCard: { borderRadius: 14, padding: '16px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, border: `1.5px solid transparent`, transition: 'all 0.2s ease' },
    catIcon: { width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    catName: { fontSize: 13, fontWeight: 600, color: theme.text },
    catCount: { fontSize: 11, color: theme.textSub, marginTop: 1 },
    fragmentList: { padding: '0 20px', paddingBottom: 20 },
    fragmentCard: { borderRadius: 14, background: theme.surface, border: `1px solid ${theme.border}`, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'transform 0.15s ease, box-shadow 0.15s ease' },
    fragmentDot: { width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fragmentTitle: { fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 3 },
    fragmentMeta: { display: 'flex', alignItems: 'center', gap: 10 },
    fragmentMetaItem: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: theme.textSub },
    fragmentCat: { fontSize: 11, fontWeight: 600, color: theme.textSub },
    catBadge: { display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '2px 8px' },
  };

  return React.createElement('div', { style: s.container },
    React.createElement('div', { style: s.header },
      React.createElement('div', { style: s.title }, 'Explore'),
      React.createElement('div', { style: s.sub }, 'Discover fragments across all domains'),
      React.createElement('div', { style: s.searchBar },
        React.createElement(SearchIcon, { size: 18, color: theme.textMuted }),
        React.createElement('input', {
          style: s.searchInput,
          placeholder: 'Search fragments, topics...',
          value: query,
          onChange: e => setQuery(e.target.value),
          onFocus: () => setSearchFocused(true),
          onBlur: () => setSearchFocused(false),
        })
      )
    ),
    // Compass Banner
    React.createElement('div', { style: s.compassBanner },
      React.createElement('div', { style: s.compassIcon },
        React.createElement(CompassIcon, { size: 100, color: '#fff' })
      ),
      React.createElement('div', { style: s.compassTitle }, 'Curiosity Compass'),
      React.createElement('div', { style: s.compassDesc }, 'Based on your Aetherweave, we suggest exploring the intersection of sacred geometry and Renaissance mathematics.'),
      React.createElement('div', { style: s.compassBtn },
        React.createElement(SparklesIcon, { size: 14, color: '#fff' }),
        React.createElement('span', { style: s.compassBtnText }, 'Show me the way')
      )
    ),
    // Categories
    React.createElement('div', { style: s.sectionLabel }, 'Browse by Domain'),
    React.createElement('div', { style: s.catGrid },
      categories.map((cat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            ...s.catCard,
            background: activeCategory === i ? `${cat.color}22` : theme.surface,
            border: `1.5px solid ${activeCategory === i ? cat.color : theme.border}`,
          },
          onClick: () => setActiveCategory(activeCategory === i ? null : i),
        },
          React.createElement('div', { style: { ...s.catIcon, background: `${cat.color}22` } },
            React.createElement(cat.Icon, { size: 20, color: cat.color })
          ),
          React.createElement('div', null,
            React.createElement('div', { style: s.catName }, cat.name),
            React.createElement('div', { style: s.catCount }, `${cat.count} fragments`)
          )
        )
      )
    ),
    // Fragment List
    React.createElement('div', { style: s.sectionLabel }, 'Trending Today'),
    React.createElement('div', { style: s.fragmentList },
      exploreFragments.map((frag, i) =>
        React.createElement('div', {
          key: frag.id,
          style: { ...s.fragmentCard, animation: `slideUp ${0.1 + i * 0.08}s ease` },
        },
          React.createElement('div', { style: { ...s.fragmentDot, background: `${frag.color}22` } },
            React.createElement(SparklesIcon, { size: 20, color: frag.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: s.fragmentTitle }, frag.title),
            React.createElement('div', { style: s.fragmentMeta },
              React.createElement('div', { style: { ...s.catBadge, background: `${frag.color}22` } },
                React.createElement('span', { style: { fontSize: 10, fontWeight: 600, color: frag.color } }, frag.category)
              ),
              React.createElement('div', { style: s.fragmentMetaItem },
                React.createElement(ClockIcon, { size: 10, color: theme.textMuted }),
                React.createElement('span', null, `${frag.mins} min`)
              ),
              React.createElement('div', { style: s.fragmentMetaItem },
                React.createElement(ZapIcon, { size: 10, color: theme.textMuted }),
                React.createElement('span', null, frag.echoes)
              )
            )
          ),
          React.createElement(ChevronRightIcon, { size: 16, color: theme.textMuted })
        )
      )
    )
  );
}

// ─── Aetherweave Screen ───────────────────────────────────────────
function AetherweaveScreen({ theme, setActiveScreen }) {
  const [viewMode, setViewMode] = useState('grid');

  const s = {
    container: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Poppins', sans-serif", animation: 'fadeIn 0.3s ease' },
    profileBanner: { background: `linear-gradient(135deg, #1E1B4B 0%, #2563EB 100%)`, padding: '24px 20px 28px', position: 'relative', overflow: 'hidden' },
    avatarRing: { width: 68, height: 68, borderRadius: 34, border: '3px solid #F97316', padding: 3, marginBottom: 12 },
    avatar: { width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontFamily: "'Righteous', cursive", fontSize: 22, color: '#fff' },
    profileName: { fontFamily: "'Righteous', cursive", fontSize: 20, color: '#fff' },
    profileTitle: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 3, marginBottom: 14 },
    profileStats: { display: 'flex', gap: 20 },
    profileStat: { textAlign: 'center' },
    profileStatVal: { fontFamily: "'Righteous', cursive", fontSize: 18, color: '#fff' },
    profileStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 1 },
    controls: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' },
    sectionTitle: { fontFamily: "'Righteous', cursive", fontSize: 16, color: theme.text },
    viewToggle: { display: 'flex', gap: 4, background: theme.surface, borderRadius: 10, padding: 4, border: `1px solid ${theme.border}` },
    viewBtn: { width: 32, height: 32, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s ease' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px', paddingBottom: 24 },
    tile: { borderRadius: 16, overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s ease' },
    tileLocked: { borderRadius: 16, overflow: 'hidden', position: 'relative', cursor: 'not-allowed', border: `1.5px dashed ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.surface },
    tileLabel: { fontFamily: "'Righteous', cursive", fontSize: 13, color: '#fff', lineHeight: 1.3, marginBottom: 4 },
    tileCat: { fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.65)' },
    tileEchoes: { display: 'flex', alignItems: 'center', gap: 3, marginTop: 8 },
    rankBadge: { position: 'absolute', top: -10, right: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' },
  };

  const leftCol = aetherweaveItems.filter((_, i) => i % 2 === 0);
  const rightCol = aetherweaveItems.filter((_, i) => i % 2 === 1);

  function renderTile(item) {
    if (item.locked) {
      return React.createElement('div', {
        key: item.id,
        style: { ...s.tileLocked, height: item.h, flexDirection: 'column', gap: 6 },
      },
        React.createElement(LockIcon, { size: 18, color: theme.textMuted }),
        React.createElement('div', { style: { fontSize: 10, color: theme.textMuted, fontWeight: 500 } }, 'Locked')
      );
    }
    return React.createElement('div', {
      key: item.id,
      style: { ...s.tile, background: `linear-gradient(135deg, ${item.color}cc, ${item.color}66)`, height: item.h, border: `1px solid ${item.color}40` },
    },
      React.createElement('div', { style: s.rankBadge }),
      React.createElement('div', { style: { position: 'absolute', inset: 0, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' } },
        React.createElement('div', { style: s.tileLabel }, item.title),
        React.createElement('div', { style: s.tileCat }, item.category),
        React.createElement('div', { style: s.tileEchoes },
          React.createElement(ZapIcon, { size: 10, color: 'rgba(255,255,255,0.7)' }),
          React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)' } }, item.echoes)
        )
      )
    );
  }

  return React.createElement('div', { style: s.container },
    // Profile Banner
    React.createElement('div', { style: s.profileBanner },
      React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' } }),
      React.createElement('div', { style: s.avatarRing },
        React.createElement('div', { style: s.avatar },
          React.createElement('span', { style: s.avatarText }, 'L')
        )
      ),
      React.createElement('div', { style: s.profileName }, 'Lena Ashwood'),
      React.createElement('div', { style: s.profileTitle }, 'Curious Archivist · Level 7 Scholar'),
      React.createElement('div', { style: s.profileStats },
        React.createElement('div', { style: s.profileStat },
          React.createElement('div', { style: s.profileStatVal }, '47'),
          React.createElement('div', { style: s.profileStatLabel }, 'Fragments')
        ),
        React.createElement('div', { style: { width: 1, background: 'rgba(255,255,255,0.15)', height: 32, alignSelf: 'center' } }),
        React.createElement('div', { style: s.profileStat },
          React.createElement('div', { style: s.profileStatVal }, '1,247'),
          React.createElement('div', { style: s.profileStatLabel }, 'Echoes')
        ),
        React.createElement('div', { style: { width: 1, background: 'rgba(255,255,255,0.15)', height: 32, alignSelf: 'center' } }),
        React.createElement('div', { style: s.profileStat },
          React.createElement('div', { style: s.profileStatVal }, '23'),
          React.createElement('div', { style: s.profileStatLabel }, 'Day Streak')
        )
      )
    ),
    // Grid Controls
    React.createElement('div', { style: s.controls },
      React.createElement('div', { style: s.sectionTitle }, 'My Aetherweave'),
      React.createElement('div', { style: s.viewToggle },
        React.createElement('div', {
          style: { ...s.viewBtn, background: viewMode === 'grid' ? theme.primary : 'transparent' },
          onClick: () => setViewMode('grid'),
        }, React.createElement(GridIcon, { size: 16, color: viewMode === 'grid' ? '#fff' : theme.textMuted })),
        React.createElement('div', {
          style: { ...s.viewBtn, background: viewMode === 'list' ? theme.primary : 'transparent' },
          onClick: () => setViewMode('list'),
        }, React.createElement(LayersIcon, { size: 16, color: viewMode === 'list' ? '#fff' : theme.textMuted }))
      )
    ),
    // Masonry Grid
    React.createElement('div', { style: { display: 'flex', gap: 10, padding: '0 20px', paddingBottom: 24 } },
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 10 } },
        leftCol.map(renderTile)
      ),
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 10 } },
        rightCol.map(renderTile)
      )
    )
  );
}

// ─── Journal Screen ───────────────────────────────────────────────
function JournalScreen({ theme, setActiveScreen }) {
  const [activeEntry, setActiveEntry] = useState(null);

  const s = {
    container: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Poppins', sans-serif", animation: 'fadeIn 0.3s ease' },
    header: { padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    title: { fontFamily: "'Righteous', cursive", fontSize: 22, color: theme.text },
    sub: { fontSize: 12, color: theme.textSub, marginTop: 2 },
    newBtn: { display: 'flex', alignItems: 'center', gap: 6, background: theme.cta, borderRadius: 12, padding: '10px 14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(249,115,22,0.35)' },
    newBtnText: { fontSize: 12, fontWeight: 700, color: '#fff' },
    promptBanner: { margin: '0 20px 20px', borderRadius: 16, background: `${theme.primary}15`, border: `1px solid ${theme.primary}30`, padding: '14px 16px' },
    promptLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: theme.primary, textTransform: 'uppercase', marginBottom: 6 },
    promptText: { fontSize: 13, color: theme.text, lineHeight: 1.6, fontStyle: 'italic' },
    entryList: { padding: '0 20px', paddingBottom: 24 },
    sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: theme.textMuted, textTransform: 'uppercase', marginBottom: 14 },
    entryCard: { borderRadius: 16, background: theme.surface, border: `1px solid ${theme.border}`, padding: '16px', marginBottom: 12, cursor: 'pointer', transition: 'all 0.2s ease' },
    entryHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 },
    entrySymbol: { width: 36, height: 36, borderRadius: 10, background: `${theme.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    entrySymbolText: { fontSize: 16, color: theme.primary },
    entryFragment: { fontSize: 13, fontWeight: 600, color: theme.text, flex: 1, margin: '0 10px' },
    entryDate: { fontSize: 11, color: theme.textMuted },
    entryPreview: { fontSize: 12, color: theme.textSub, lineHeight: 1.7, marginBottom: 12 },
    entryFooter: { display: 'flex', alignItems: 'center', gap: 10 },
    entryMeta: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: theme.textMuted },
    expandedContent: { borderTop: `1px solid ${theme.border}`, marginTop: 12, paddingTop: 12 },
    expandedText: { fontSize: 13, color: theme.textSub, lineHeight: 1.8 },
  };

  return React.createElement('div', { style: s.container },
    React.createElement('div', { style: s.header },
      React.createElement('div', null,
        React.createElement('div', { style: s.title }, 'Ephemeral Reflections'),
        React.createElement('div', { style: s.sub }, '4 entries this week')
      ),
      React.createElement('div', { style: s.newBtn },
        React.createElement(PlusIcon, { size: 14, color: '#fff' }),
        React.createElement('span', { style: s.newBtnText }, 'New')
      )
    ),
    // Prompt of the day
    React.createElement('div', { style: s.promptBanner },
      React.createElement('div', { style: s.promptLabel }, '✦ Today\'s Reflection Prompt'),
      React.createElement('div', { style: s.promptText }, '"What unsolved mystery in your own life mirrors the mystery of the Voynich Manuscript?"')
    ),
    // Entries
    React.createElement('div', { style: s.entryList },
      React.createElement('div', { style: s.sectionLabel }, 'Your Reflections'),
      journalEntries.map((entry, i) =>
        React.createElement('div', {
          key: entry.id,
          style: {
            ...s.entryCard,
            animation: `slideUp ${0.1 + i * 0.07}s ease`,
            borderColor: activeEntry === entry.id ? theme.primary : theme.border,
            boxShadow: activeEntry === entry.id ? `0 0 0 1px ${theme.primary}40` : 'none',
          },
          onClick: () => setActiveEntry(activeEntry === entry.id ? null : entry.id),
        },
          React.createElement('div', { style: s.entryHeader },
            React.createElement('div', { style: s.entrySymbol },
              React.createElement('span', { style: s.entrySymbolText }, entry.symbol)
            ),
            React.createElement('div', { style: { flex: 1, margin: '0 10px' } },
              React.createElement('div', { style: s.entryFragment }, entry.fragment),
              React.createElement('div', { style: { fontSize: 11, color: theme.textMuted } }, entry.date)
            ),
            React.createElement(ChevronRightIcon, {
              size: 16,
              color: theme.textMuted,
              style: { transform: activeEntry === entry.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }
            })
          ),
          React.createElement('div', { style: s.entryPreview }, entry.preview),
          React.createElement('div', { style: s.entryFooter },
            React.createElement('div', { style: s.entryMeta },
              React.createElement(PenIcon, { size: 10, color: theme.textMuted }),
              React.createElement('span', null, `${entry.words} words`)
            ),
            React.createElement('div', { style: { ...s.entryMeta, marginLeft: 'auto' } },
              React.createElement('span', { style: { fontSize: 11, color: theme.primary, fontWeight: 600 } }, 'Read more')
            )
          )
        )
      )
    )
  );
}

// ─── Expeditions Screen ───────────────────────────────────────────
function ExpeditionsScreen({ theme, setActiveScreen }) {
  const [selected, setSelected] = useState(0);

  const s = {
    container: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Poppins', sans-serif", animation: 'fadeIn 0.3s ease' },
    header: { padding: '20px 20px 16px' },
    title: { fontFamily: "'Righteous', cursive", fontSize: 22, color: theme.text },
    sub: { fontSize: 12, color: theme.textSub, marginTop: 2, marginBottom: 20 },
    activeCard: { margin: '0 20px 20px', borderRadius: 20, overflow: 'hidden', position: 'relative', cursor: 'pointer' },
    activeBadge: { position: 'absolute', top: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: '4px 12px', backdropFilter: 'blur(10px)', zIndex: 2 },
    activeDot: { width: 7, height: 7, borderRadius: 4, background: '#10B981', animation: 'pulse 2s infinite' },
    activeBadgeText: { fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: 1, textTransform: 'uppercase' },
    activeCardInner: { padding: '56px 20px 22px', position: 'relative', zIndex: 1 },
    activeTitle: { fontFamily: "'Righteous', cursive", fontSize: 22, color: '#fff', marginBottom: 6 },
    activeSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 18 },
    progressSection: { marginBottom: 14 },
    progressHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
    progressLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
    progressValue: { fontSize: 11, fontWeight: 700, color: '#fff' },
    progressBar: { height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 4, background: 'rgba(255,255,255,0.9)', width: '65%' },
    activeFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
    rewardChip: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '6px 12px' },
    rewardText: { fontSize: 11, fontWeight: 600, color: '#fff' },
    continueBtn: { display: 'flex', alignItems: 'center', gap: 6, background: '#F97316', borderRadius: 12, padding: '10px 18px', cursor: 'pointer' },
    continueBtnText: { fontSize: 12, fontWeight: 700, color: '#fff' },
    fragmentDots: { display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 },
    fragmentDot: { width: 24, height: 24, borderRadius: 6 },
    sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: theme.textMuted, textTransform: 'uppercase', padding: '0 20px', marginBottom: 12 },
    expedCard: { margin: '0 20px 10px', borderRadius: 16, overflow: 'hidden', border: `1px solid ${theme.border}`, cursor: 'pointer', transition: 'transform 0.2s ease' },
    expedCardGradient: { height: 6 },
    expedCardBody: { background: theme.surface, padding: '14px 16px' },
    expedCardTitle: { fontFamily: "'Righteous', cursive", fontSize: 15, color: theme.text, marginBottom: 4 },
    expedCardSub: { fontSize: 11, color: theme.textSub, lineHeight: 1.5, marginBottom: 10 },
    expedCardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    expedChip: { display: 'flex', alignItems: 'center', gap: 4, background: theme.surfaceElevated, borderRadius: 8, padding: '4px 10px' },
    expedChipText: { fontSize: 10, fontWeight: 600, color: theme.textSub },
  };

  const activeExp = expeditionsData[0];
  const upcoming = expeditionsData.slice(1);

  return React.createElement('div', { style: s.container },
    React.createElement('div', { style: s.header },
      React.createElement('div', { style: s.title }, 'Seasonal Expeditions'),
      React.createElement('div', { style: s.sub }, 'Embark on themed journeys of discovery')
    ),
    // Active Expedition Card
    React.createElement('div', {
      style: { ...s.activeCard, background: activeExp.gradient, boxShadow: `0 12px 40px ${activeExp.border}50` }
    },
      React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' } }),
      React.createElement('div', { style: s.activeBadge },
        React.createElement('div', { style: s.activeDot }),
        React.createElement('span', { style: s.activeBadgeText }, 'Active')
      ),
      React.createElement('div', { style: s.activeCardInner },
        React.createElement('div', { style: s.activeTitle }, activeExp.title),
        React.createElement('div', { style: s.activeSub }, activeExp.subtitle),
        // Fragment completion dots
        React.createElement('div', { style: s.fragmentDots },
          Array.from({ length: activeExp.total }).map((_, i) =>
            React.createElement('div', {
              key: i,
              style: {
                ...s.fragmentDot,
                background: i < activeExp.done ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
              }
            })
          )
        ),
        React.createElement('div', { style: s.progressSection },
          React.createElement('div', { style: s.progressHeader },
            React.createElement('span', { style: s.progressLabel }, `${activeExp.done} of ${activeExp.total} fragments`),
            React.createElement('span', { style: s.progressValue }, '65%')
          ),
          React.createElement('div', { style: s.progressBar },
            React.createElement('div', { style: s.progressFill })
          )
        ),
        React.createElement('div', { style: s.activeFooter },
          React.createElement('div', { style: s.rewardChip },
            React.createElement(AwardIcon, { size: 13, color: '#fff' }),
            React.createElement('span', { style: s.rewardText }, activeExp.reward)
          ),
          React.createElement('div', { style: s.continueBtn },
            React.createElement('span', { style: s.continueBtnText }, 'Continue'),
            React.createElement(ArrowRightIcon, { size: 14, color: '#fff' })
          )
        )
      )
    ),
    // Upcoming Expeditions
    React.createElement('div', { style: s.sectionLabel }, 'Upcoming Expeditions'),
    upcoming.map((exp, i) =>
      React.createElement('div', {
        key: exp.id,
        style: { ...s.expedCard, animation: `slideUp ${0.2 + i * 0.1}s ease` },
        onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
        onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
      },
        React.createElement('div', { style: { ...s.expedCardGradient, background: exp.gradient } }),
        React.createElement('div', { style: s.expedCardBody },
          React.createElement('div', { style: s.expedCardTitle }, exp.title),
          React.createElement('div', { style: s.expedCardSub }, exp.subtitle),
          React.createElement('div', { style: s.expedCardFooter },
            React.createElement('div', { style: s.expedChip },
              React.createElement(MapIcon, { size: 11, color: theme.textSub }),
              React.createElement('span', { style: s.expedChipText }, `${exp.total} fragments`)
            ),
            React.createElement('div', { style: s.expedChip },
              React.createElement(ClockIcon, { size: 11, color: theme.textSub }),
              React.createElement('span', { style: s.expedChipText }, `Starts in ${exp.daysLeft} days`)
            ),
            React.createElement('div', { style: { ...s.expedChip, background: `${exp.border}20` } },
              React.createElement(AwardIcon, { size: 11, color: exp.border }),
              React.createElement('span', { style: { ...s.expedChipText, color: exp.border } }, 'Artifact')
            )
          )
        )
      )
    ),
    React.createElement('div', { style: { height: 24 } })
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────
function BottomNav({ activeScreen, setActiveScreen, theme }) {
  const tabs = [
    { id: 'home',        label: 'Home',      Icon: HomeIcon },
    { id: 'explore',     label: 'Explore',   Icon: CompassIcon },
    { id: 'aetherweave', label: 'Weave',     Icon: LayersIcon },
    { id: 'journal',     label: 'Journal',   Icon: BookOpenIcon },
    { id: 'expeditions', label: 'Quests',    Icon: AwardIcon },
  ];

  return React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 68,
      background: theme.navBg,
      borderTop: `1px solid ${theme.border}`,
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 4,
    }
  },
    tabs.map(tab =>
      React.createElement('div', {
        key: tab.id,
        onClick: () => setActiveScreen(tab.id),
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          cursor: 'pointer',
          paddingTop: 8,
          paddingBottom: 4,
          transition: 'all 0.15s ease',
        }
      },
        React.createElement('div', {
          style: {
            width: 36,
            height: 28,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: activeScreen === tab.id ? `${theme.primary}20` : 'transparent',
            transition: 'background 0.2s ease',
          }
        },
          React.createElement(tab.Icon, {
            size: 20,
            color: activeScreen === tab.id ? theme.primary : theme.textMuted,
            strokeWidth: activeScreen === tab.id ? 2.5 : 1.8,
          })
        ),
        React.createElement('span', {
          style: {
            fontSize: 9,
            fontWeight: activeScreen === tab.id ? 700 : 500,
            color: activeScreen === tab.id ? theme.primary : theme.textMuted,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 0.3,
          }
        }, tab.label)
      )
    )
  );
}

// ─── App ──────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(d => !d);

  const screens = {
    home:        HomeScreen,
    explore:     ExploreScreen,
    aetherweave: AetherweaveScreen,
    journal:     JournalScreen,
    expeditions: ExpeditionsScreen,
  };

  const ActiveScreen = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
    }
  },
    React.createElement(StyleTag),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: theme.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)',
      }
    },
      // Screen Content
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 68,
          overflow: 'hidden',
        }
      },
        React.createElement(ActiveScreen, { theme, isDark, toggleTheme, setActiveScreen })
      ),
      // Bottom Nav
      React.createElement(BottomNav, { activeScreen, setActiveScreen, theme })
    )
  );
}
