const { useState, useEffect, useRef } = React;

// ============================================================
// THEME SYSTEM
// ============================================================
const themes = {
  light: {
    bg: '#F8F4E8',
    surface: '#FFFDF5',
    surfaceAlt: '#F0EAD6',
    primary: '#5C6B2A',
    primaryLight: '#7A8E3A',
    secondary: '#C8941A',
    accent: '#B03A2E',
    text: '#2C2416',
    textMuted: '#6B5D45',
    textLight: '#9A8B74',
    border: '#E0D5BF',
    tabBg: '#FFFDF5',
    shadow: 'rgba(92, 107, 42, 0.15)',
  },
  dark: {
    bg: '#1C1810',
    surface: '#252014',
    surfaceAlt: '#2F2A1C',
    primary: '#8BA045',
    primaryLight: '#A5BC55',
    secondary: '#D4A827',
    accent: '#C94840',
    text: '#F0EAD6',
    textMuted: '#B8A88A',
    textLight: '#7A6E58',
    border: '#3A3020',
    tabBg: '#252014',
    shadow: 'rgba(0, 0, 0, 0.3)',
  }
};

// ============================================================
// APP CONTEXT
// ============================================================
const AppContext = React.createContext({});
const useApp = () => React.useContext(AppContext);

// ============================================================
// DATA
// ============================================================
const questsData = [
  {
    id: 'sourdough',
    title: 'The Art of Local Sourdough',
    subtitle: 'Portland Wheat Culture',
    icon: '🌾',
    color: '#C8941A',
    bgGradient: 'linear-gradient(145deg, #8B6914 0%, #C8941A 40%, #A0541A 100%)',
    progress: 68,
    streak: 12,
    stage: 'Stage 3: Wild Fermentation',
    totalStages: 5,
    participants: 847,
    location: 'Portland, OR',
    tags: ['Fermentation', 'Heritage Wheat', 'Artisan'],
    description: 'Master the ancient craft of sourdough using locally-milled heritage wheat varieties from Willamette Valley farms.',
    lastEntry: '2 days ago',
    nextMilestone: 'Mill a grain-to-loaf batch',
  },
  {
    id: 'tomato',
    title: 'Heirloom Tomato Mastery',
    subtitle: "Farmers' Market Season",
    icon: '🍅',
    color: '#B03A2E',
    bgGradient: 'linear-gradient(145deg, #7A1E18 0%, #B03A2E 40%, #C8541A 100%)',
    progress: 35,
    streak: 5,
    stage: 'Stage 2: Varietal Discovery',
    totalStages: 4,
    participants: 1243,
    location: 'Portland, OR',
    tags: ['Seasonal', 'Preservation', 'Market'],
    description: 'Explore the full spectrum of heirloom tomato varieties through your local farmers market.',
    lastEntry: '5 days ago',
    nextMilestone: 'Try 5 distinct heirloom varieties',
  },
  {
    id: 'forage',
    title: 'Pacific Northwest Foraging',
    subtitle: 'Wild Blackberry Season',
    icon: '🫐',
    color: '#5C6B2A',
    bgGradient: 'linear-gradient(145deg, #2A3A10 0%, #5C6B2A 50%, #3A5020 100%)',
    progress: 15,
    streak: 0,
    stage: 'Stage 1: First Harvest',
    totalStages: 6,
    participants: 412,
    location: 'Portland, OR',
    tags: ['Foraging', 'Wild', 'Seasonal'],
    description: 'Discover the abundant wild edibles of the Pacific Northwest, starting with the iconic blackberry season.',
    lastEntry: 'Not started',
    nextMilestone: 'Find your first foraging spot',
  },
];

const lineageEntries = [
  {
    id: 1,
    date: 'April 2, 2026',
    title: 'Heritage Wheat Starter — Day 7',
    content: 'Finally got consistent bubbles with the Warthog wheat from Camas Country Mill. The tang is incredible — almost fruity.',
    sourced: 'Camas Country Mill, Eugene',
    rating: 5,
    imgColor: '#C8941A',
    emoji: '🍞',
  },
  {
    id: 2,
    date: 'March 29, 2026',
    title: 'First Open Crumb Attempt',
    content: 'Scored a 78% hydration loaf. Crumb was too dense but the crust had perfect color and blistering.',
    sourced: "Bob's Red Mill (fallback)",
    rating: 3,
    imgColor: '#A07040',
    emoji: '🥖',
  },
  {
    id: 3,
    date: 'March 24, 2026',
    title: 'Visiting Tabor Bread',
    content: 'Met baker Tissa Stein. She showed me their Sonora wheat cold ferment method. Game changer for scheduling.',
    sourced: 'Local knowledge — Tabor Bread',
    rating: 5,
    imgColor: '#6B7C3A',
    emoji: '🌿',
  },
];

const communityPosts = [
  {
    id: 1,
    user: 'Maya R.',
    avatar: '🧑‍🍳',
    quest: 'Heirloom Tomato',
    time: '2h ago',
    content: "Found the most incredible Brandywine at Hillsdale Farmers Market this morning! The vendor said they're grown on a 3rd-generation family farm just 40 miles away. Anyone want to split a half-flat?",
    reactions: { '🍅': 14, '❤️': 8, '🙌': 6 },
    replies: 7,
    type: 'ingredient-swap',
  },
  {
    id: 2,
    user: 'James T.',
    avatar: '👨‍🌾',
    quest: 'Local Sourdough',
    time: '5h ago',
    content: 'Day 12 of my starter and it\'s finally singing. I switched to the heritage Warthog wheat and everything changed overnight. Worth the trip to the mill.',
    reactions: { '🌾': 22, '🔥': 15, '👍': 11 },
    replies: 12,
    type: 'progress',
    milestone: '12-day streak',
  },
  {
    id: 3,
    user: 'Priya N.',
    avatar: '👩',
    quest: 'PNW Foraging',
    time: '1d ago',
    content: 'Organized a small foraging walk near Powell Butte this Sunday 9am. Blackberries should be starting to ripen on the south-facing slopes. Reply if you\'re in! Max 8 people.',
    reactions: { '🫐': 19, '🥾': 8, '🌿': 12 },
    replies: 23,
    type: 'event',
    eventDetail: 'Sunday, April 6 @ 9am',
  },
  {
    id: 4,
    user: 'Chen W.',
    avatar: '🧑',
    quest: 'Heirloom Tomato',
    time: '2d ago',
    content: 'Recipe share: fermented heirloom tomato hot sauce. 3 weeks of patience, pure magic. Using Cherokee Purples and Green Zebras from the Alberta market.',
    reactions: { '🌶️': 31, '😍': 18, '🍅': 14 },
    replies: 19,
    type: 'recipe',
  },
];

const mapMarkers = [
  { id: 1, name: 'Portland Saturday Market', type: 'market', x: 52, y: 38, distance: '0.8mi', hours: 'Sat 8am–5pm' },
  { id: 2, name: 'Camas Country Mill', type: 'producer', x: 28, y: 62, distance: '2.1mi', hours: 'Tue–Sat 10am–6pm' },
  { id: 3, name: 'Sauvie Island Organics', type: 'farm', x: 72, y: 25, distance: '3.4mi', hours: 'Daily 7am–7pm' },
  { id: 4, name: 'Community Garden P-Patch', type: 'garden', x: 45, y: 70, distance: '0.4mi', hours: 'Dawn to dusk' },
  { id: 5, name: "Maya's Tomato Surplus", type: 'surplus', x: 60, y: 55, distance: '1.2mi', hours: 'By arrangement' },
  { id: 6, name: 'Tabor Bread Bakery', type: 'artisan', x: 38, y: 48, distance: '1.6mi', hours: 'Wed–Mon 7am–3pm' },
  { id: 7, name: 'New Seasons Market', type: 'market', x: 80, y: 68, distance: '2.8mi', hours: 'Daily 7am–10pm' },
];

// ============================================================
// ICON HELPER
// ============================================================
function Icon({ name, size, color, strokeWidth }) {
  const sz = size || 20;
  const sw = strokeWidth || 1.5;
  const iconMap = window.lucide || {};
  const IconComponent = iconMap[name];
  if (!IconComponent) return React.createElement('span', { style: { fontSize: sz * 0.6, color, lineHeight: 1 } }, '◆');
  return React.createElement(IconComponent, { size: sz, color, strokeWidth: sw });
}

// ============================================================
// HOME SCREEN
// ============================================================
function HomeScreen() {
  const { theme, isDark, setIsDark, setActiveScreen } = useApp();
  const [pressedQuest, setPressedQuest] = useState(null);

  return (
    <div style={{ background: theme.bg, minHeight: '100%', fontFamily: 'Lora, serif' }}>

      {/* Full-bleed Hero Header */}
      <div style={{
        height: 230,
        background: 'linear-gradient(160deg, #3A4A14 0%, #6B5420 35%, #8B3A20 70%, #5C2A10 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Texture overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 25% 35%, rgba(200,148,26,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(92,107,42,0.4) 0%, transparent 50%)',
        }} />
        {/* Decorative food icons */}
        <div style={{ position: 'absolute', top: 10, right: 20, fontSize: 80, opacity: 0.13, transform: 'rotate(15deg)' }}>🌾</div>
        <div style={{ position: 'absolute', bottom: 30, right: 60, fontSize: 50, opacity: 0.1, transform: 'rotate(-8deg)' }}>🍅</div>
        <div style={{ position: 'absolute', top: 45, left: 15, fontSize: 40, opacity: 0.12 }}>🌿</div>
        {/* Bottom fade into bg */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: `linear-gradient(transparent, ${theme.bg})`,
        }} />
        {/* Header content */}
        <div style={{ position: 'absolute', inset: 0, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: 'rgba(240,234,214,0.65)', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 3 }}>Root & Plate</div>
              <div style={{ color: '#F0EAD6', fontSize: 22, fontWeight: 700, lineHeight: 1.25 }}>Good morning,{'\n'}Sarah 🌿</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={() => setIsDark(!isDark)}
                style={{ background: 'rgba(240,234,214,0.18)', border: 'none', borderRadius: 18, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <span style={{ fontSize: 15 }}>{isDark ? '☀️' : '🌙'}</span>
              </button>
              <div style={{ background: 'rgba(200,148,26,0.35)', borderRadius: 20, padding: '5px 11px', display: 'flex', alignItems: 'center', gap: 5, border: '1px solid rgba(200,148,26,0.5)' }}>
                <span style={{ fontSize: 13 }}>🔥</span>
                <span style={{ color: '#F0EAD6', fontSize: 14, fontWeight: 700 }}>12</span>
              </div>
            </div>
          </div>

          {/* Active quest pill */}
          <div style={{
            background: 'rgba(255,253,245,0.14)',
            backdropFilter: 'blur(8px)',
            borderRadius: 14,
            padding: '10px 14px',
            border: '1px solid rgba(240,234,214,0.22)',
            marginBottom: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
              <div>
                <div style={{ color: 'rgba(240,234,214,0.6)', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Active Quest</div>
                <div style={{ color: '#F0EAD6', fontSize: 14, fontWeight: 600 }}>The Art of Local Sourdough</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#D4AA40', fontSize: 12, fontWeight: 700 }}>Stage 3/5</div>
                <div style={{ color: 'rgba(240,234,214,0.6)', fontSize: 11 }}>68% complete</div>
              </div>
            </div>
            <div style={{ height: 5, background: 'rgba(240,234,214,0.18)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #C8941A, #E0B040)', borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4px 20px 0' }}>

        {/* My Quests */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, marginTop: 8 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.text }}>My Quests</h2>
          <span style={{ fontSize: 12, color: theme.secondary, cursor: 'pointer' }}>See all</span>
        </div>

        {questsData.map(quest => (
          <div
            key={quest.id}
            onClick={() => setActiveScreen('quest')}
            onMouseDown={() => setPressedQuest(quest.id)}
            onMouseUp={() => setPressedQuest(null)}
            onTouchStart={() => setPressedQuest(quest.id)}
            onTouchEnd={() => setPressedQuest(null)}
            style={{
              background: theme.surface,
              borderRadius: 16,
              marginBottom: 12,
              overflow: 'hidden',
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              transform: pressedQuest === quest.id ? 'scale(0.975)' : 'scale(1)',
              transition: 'transform 0.15s ease',
              boxShadow: `0 2px 12px ${theme.shadow}`,
            }}
          >
            <div style={{ height: 5, background: quest.bgGradient }} />
            <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 22 }}>{quest.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, lineHeight: 1.2 }}>{quest.title}</div>
                      <div style={{ fontSize: 11, color: theme.textLight }}>{quest.subtitle}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 7 }}>{quest.stage}</div>
                  <div style={{ height: 6, background: theme.surfaceAlt, borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{ width: `${quest.progress}%`, height: '100%', background: quest.bgGradient, borderRadius: 3 }} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {quest.streak > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ fontSize: 12 }}>🔥</span>
                        <span style={{ fontSize: 12, color: theme.secondary, fontWeight: 700 }}>{quest.streak}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <span style={{ fontSize: 11 }}>👥</span>
                      <span style={{ fontSize: 11, color: theme.textLight }}>{quest.participants.toLocaleString()}</span>
                    </div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>Last: {quest.lastEntry}</div>
                  </div>
                </div>
                <div style={{ background: quest.bgGradient, borderRadius: 10, padding: '4px 9px', marginLeft: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, color: '#FFFDF5', fontWeight: 700 }}>{quest.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* AI Nudge */}
        <div style={{
          background: isDark ? 'linear-gradient(135deg, #2A2818 0%, #201C10 100%)' : 'linear-gradient(135deg, #F8F0D8 0%, #F0E8C8 100%)',
          borderRadius: 16,
          padding: '14px 16px',
          marginBottom: 14,
          border: `1px solid ${isDark ? '#4A4020' : '#E0C870'}`,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>✨</div>
            <div>
              <div style={{ fontSize: 11, color: theme.secondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 5 }}>Flavor Weaver Nudge</div>
              <div style={{ fontSize: 13, color: theme.text, lineHeight: 1.55, fontStyle: 'italic' }}>
                "Your starter is at Stage 3 — try a cold retard overnight with heritage Warthog wheat. Spring temperatures in Portland this week are ideal for a slow 14-hour fridge ferment."
              </div>
              <div style={{ marginTop: 7, fontSize: 10, color: theme.textLight }}>Based on your Sourdough Quest · Local weather data</div>
            </div>
          </div>
        </div>

        {/* Discover Quests */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.text }}>Discover Quests</h2>
          <span style={{ fontSize: 12, color: theme.textLight }}>Portland, OR</span>
        </div>

        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 10, marginBottom: 20 }}>
          {[
            { icon: '🍄', name: 'Wild Mushroom Season', count: 234 },
            { icon: '🌽', name: 'Sweet Corn Harvest', count: 567 },
            { icon: '🍎', name: 'Heritage Apple Varieties', count: 389 },
            { icon: '🫚', name: 'Olive Oil Traditions', count: 156 },
          ].map((item, i) => (
            <div key={i} style={{
              minWidth: 128,
              background: theme.surface,
              borderRadius: 14,
              padding: '12px',
              border: `1px solid ${theme.border}`,
              flexShrink: 0,
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme.text, lineHeight: 1.3, marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: theme.textLight }}>{item.count} questers</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ============================================================
// QUEST SCREEN — Lineage Log Detail
// ============================================================
function QuestScreen() {
  const { theme, isDark, setActiveScreen } = useApp();
  const [activeTab, setActiveTab] = useState('log');
  const quest = questsData[0];

  return (
    <div style={{ background: theme.bg, minHeight: '100%', fontFamily: 'Lora, serif' }}>

      {/* Full-bleed Quest Header */}
      <div style={{
        height: 245,
        background: quest.bgGradient,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, fontSize: 180, opacity: 0.1, transform: 'rotate(-8deg)' }}>🌾</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: `linear-gradient(transparent, ${theme.bg})` }} />
        <button
          onClick={() => setActiveScreen('home')}
          style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,253,245,0.2)', border: 'none', borderRadius: 10, padding: '6px 12px', color: '#F0EAD6', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <span>←</span>
          <span style={{ fontFamily: 'Lora, serif' }}>Back</span>
        </button>
        <div style={{ position: 'absolute', bottom: 28, left: 20, right: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 30 }}>{quest.icon}</span>
            <div>
              <div style={{ color: '#F0EAD6', fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{quest.title}</div>
              <div style={{ color: 'rgba(240,234,214,0.65)', fontSize: 12 }}>{quest.location} · {quest.participants.toLocaleString()} questers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Progress Card */}
      <div style={{ padding: '0 20px', marginTop: -8, position: 'relative', zIndex: 2 }}>
        <div style={{
          background: theme.surface,
          borderRadius: 14,
          padding: '12px 14px',
          border: `1px solid ${theme.border}`,
          boxShadow: `0 4px 16px ${theme.shadow}`,
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{quest.stage}</div>
              <div style={{ fontSize: 11, color: theme.textLight, marginTop: 2 }}>Next: {quest.nextMilestone}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 16 }}>🔥</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: theme.secondary }}>{quest.streak}</span>
              <span style={{ fontSize: 11, color: theme.textLight }}>day streak</span>
            </div>
          </div>
          {/* Stage progress dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {Array.from({ length: quest.totalStages }).map((_, i) => (
              <React.Fragment key={i}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: i < 2 ? quest.bgGradient : (i === 2 ? quest.bgGradient : theme.surfaceAlt),
                  border: `2px solid ${i <= 2 ? quest.color : theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i < 2 && <span style={{ fontSize: 9, color: '#FFF', fontWeight: 700 }}>✓</span>}
                  {i === 2 && <div style={{ width: 7, height: 7, background: '#FFF', borderRadius: '50%' }} />}
                </div>
                {i < quest.totalStages - 1 && (
                  <div style={{ flex: 1, height: 2, background: i < 2 ? quest.bgGradient : theme.border }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 20px', gap: 6, marginBottom: 14 }}>
        {[
          { id: 'log', label: 'Lineage Log' },
          { id: 'insights', label: 'Insights' },
          { id: 'sources', label: 'Sources' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: '8px 0', border: 'none', borderRadius: 10,
              background: activeTab === tab.id ? theme.primary : theme.surfaceAlt,
              color: activeTab === tab.id ? '#FFFDF5' : theme.textMuted,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Lora, serif',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 20px', paddingBottom: 90 }}>

        {activeTab === 'log' && (
          <div>
            <button style={{
              width: '100%', padding: '11px', border: `2px dashed ${theme.primary}`,
              borderRadius: 14, background: 'transparent', color: theme.primary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 14,
              fontFamily: 'Lora, serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 16 }}>+</span>
              <span>Add Log Entry</span>
            </button>

            {lineageEntries.map(entry => (
              <div key={entry.id} style={{
                background: theme.surface,
                borderRadius: 14,
                marginBottom: 12,
                overflow: 'hidden',
                border: `1px solid ${theme.border}`,
              }}>
                <div style={{
                  height: 85,
                  background: `linear-gradient(135deg, ${entry.imgColor}99, ${entry.imgColor}cc)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 50%, rgba(255,253,245,0.12) 0%, transparent 70%)` }} />
                  <span style={{ fontSize: 44 }}>{entry.emoji}</span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, flex: 1 }}>{entry.title}</div>
                    <div style={{ fontSize: 11, color: theme.textLight, marginLeft: 8, flexShrink: 0 }}>{entry.date}</div>
                  </div>
                  <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.55, marginBottom: 9, fontStyle: 'italic' }}>
                    "{entry.content}"
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 11 }}>📍</span>
                      <span style={{ fontSize: 11, color: theme.textLight }}>{entry.sourced}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ fontSize: 11, color: i < entry.rating ? '#C8941A' : theme.border }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div>
            <div style={{ background: theme.surface, borderRadius: 14, padding: '14px', border: `1px solid ${theme.border}`, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: theme.secondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>✨ AI Insight</div>
              <div style={{ fontSize: 13, color: theme.text, lineHeight: 1.6, fontStyle: 'italic' }}>
                "Your logs show a consistent preference for longer cold ferments. Consider pairing this with the Warthog wheat's higher protein content (14.2%) — it can handle 18–22 hour retards beautifully."
              </div>
            </div>
            <div style={{ background: theme.surface, borderRadius: 14, padding: '14px', border: `1px solid ${theme.border}`, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Historical Context</div>
              <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>
                Portland's sourdough tradition dates to the 1840s pioneer era. Oregon Trail bakers carried their starters across the continent — some heritage cultures in use today descend from those very starters.
              </div>
            </div>
            <div style={{ background: theme.surface, borderRadius: 14, padding: '14px', border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Seasonal Tip</div>
              <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>
                April in the Willamette Valley brings ideal conditions for long, cool fermentation. Ambient temps of 62–66°F slow yeast activity and develop complex lactic acid notes.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div>
            {[
              { name: 'Camas Country Mill', type: 'Heritage Grain Mill', distance: '40mi', verified: true, notes: 'Warthog wheat, fresh-milled to order' },
              { name: 'Tabor Bread', type: 'Artisan Bakery', distance: '1.6mi', verified: true, notes: 'Community starters, monthly classes' },
              { name: "Bob's Red Mill", type: 'Commercial Mill', distance: '8mi', verified: false, notes: 'Reliable fallback option' },
            ].map((source, i) => (
              <div key={i} style={{
                background: theme.surface, borderRadius: 14, padding: '12px 14px',
                border: `1px solid ${theme.border}`, marginBottom: 10,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{source.name}</span>
                    {source.verified && (
                      <span style={{ fontSize: 9, background: theme.primary, color: '#FFF', borderRadius: 4, padding: '1px 5px' }}>✓ Verified</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: theme.textLight, marginBottom: 3 }}>{source.type} · {source.distance}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted, fontStyle: 'italic' }}>{source.notes}</div>
                </div>
                <button
                  onClick={() => {}}
                  style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '6px 10px', color: theme.primary, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Lora, serif', marginLeft: 10, flexShrink: 0 }}
                >
                  Map →
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// ============================================================
// MAP SCREEN
// ============================================================
function MapScreen() {
  const { theme } = useApp();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const typeConfig = {
    market: { color: '#5C6B2A', emoji: '🏪', label: 'Market' },
    producer: { color: '#C8941A', emoji: '⚙️', label: 'Producer' },
    farm: { color: '#4A8020', emoji: '🌾', label: 'Farm' },
    garden: { color: '#2A7040', emoji: '🌱', label: 'Garden' },
    surplus: { color: '#B03A2E', emoji: '🤝', label: 'Surplus' },
    artisan: { color: '#8B4A20', emoji: '🍞', label: 'Artisan' },
  };

  const filters = ['all', 'market', 'farm', 'garden', 'surplus'];
  const filteredMarkers = activeFilter === 'all'
    ? mapMarkers
    : mapMarkers.filter(m => m.type === activeFilter || (activeFilter === 'market' && m.type === 'artisan'));

  return (
    <div style={{ background: theme.bg, minHeight: '100%', fontFamily: 'Lora, serif' }}>

      <div style={{ padding: '20px 20px 12px', background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <h1 style={{ margin: '0 0 3px', fontSize: 20, fontWeight: 700, color: theme.text }}>Local Pantry Map</h1>
        <div style={{ fontSize: 12, color: theme.textLight }}>📍 Portland, OR · {filteredMarkers.length} sources nearby</div>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6, padding: '10px 16px', overflowX: 'auto' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '5px 13px', borderRadius: 20,
              border: `1px solid ${activeFilter === f ? theme.primary : theme.border}`,
              background: activeFilter === f ? theme.primary : theme.surface,
              color: activeFilter === f ? '#FFFDF5' : theme.textMuted,
              fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'Lora, serif', textTransform: 'capitalize',
            }}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Stylized Map */}
      <div style={{
        margin: '0 16px 12px',
        height: 255,
        background: theme.bg === '#F8F4E8'
          ? 'linear-gradient(135deg, #E8E0C8 0%, #DDD4B8 100%)'
          : 'linear-gradient(135deg, #1C1808 0%, #14100A 100%)',
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Street grid */}
        {[22, 45, 68].map(pct => (
          <React.Fragment key={pct}>
            <div style={{ position: 'absolute', top: `${pct}%`, left: 0, right: 0, height: 1, background: theme.bg === '#F8F4E8' ? 'rgba(120,100,60,0.18)' : 'rgba(80,65,35,0.4)' }} />
            <div style={{ position: 'absolute', left: `${pct}%`, top: 0, bottom: 0, width: 1, background: theme.bg === '#F8F4E8' ? 'rgba(120,100,60,0.18)' : 'rgba(80,65,35,0.4)' }} />
          </React.Fragment>
        ))}
        {/* "You are here" dot */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#3A7BC8', border: '3px solid #FFFDF5', boxShadow: '0 0 0 5px rgba(58,123,200,0.25)' }} />
        </div>
        {/* Markers */}
        {filteredMarkers.map(marker => {
          const config = typeConfig[marker.type] || typeConfig.market;
          const isSelected = selectedMarker?.id === marker.id;
          return (
            <button
              key={marker.id}
              onClick={() => setSelectedMarker(isSelected ? null : marker)}
              style={{
                position: 'absolute',
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: `translate(-50%, -50%) scale(${isSelected ? 1.35 : 1})`,
                background: config.color,
                border: '2.5px solid #FFFDF5',
                borderRadius: '50% 50% 50% 4px',
                width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 14,
                boxShadow: `0 3px 8px rgba(0,0,0,0.3)`,
                transition: 'transform 0.2s',
              }}
            >
              {config.emoji}
            </button>
          );
        })}
        {/* Selected popup */}
        {selectedMarker && (
          <div style={{
            position: 'absolute', bottom: 10, left: 10, right: 10,
            background: theme.surface, borderRadius: 12, padding: '10px 12px',
            border: `1px solid ${theme.border}`, boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{selectedMarker.name}</div>
                <div style={{ fontSize: 11, color: theme.textLight }}>{selectedMarker.distance} · {selectedMarker.hours}</div>
              </div>
              <button onClick={() => setSelectedMarker(null)} style={{ background: 'none', border: 'none', color: theme.textLight, fontSize: 18, cursor: 'pointer', padding: '0 4px' }}>×</button>
            </div>
          </div>
        )}
      </div>

      {/* Source list */}
      <div style={{ padding: '0 16px', paddingBottom: 90 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Nearby Sources</div>
        {filteredMarkers.map(marker => {
          const config = typeConfig[marker.type] || typeConfig.market;
          return (
            <div
              key={marker.id}
              onClick={() => setSelectedMarker(marker)}
              style={{
                background: theme.surface, borderRadius: 12, padding: '10px 12px',
                marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
                border: `1px solid ${selectedMarker?.id === marker.id ? theme.primary : theme.border}`,
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: config.color + '22',
                border: `1.5px solid ${config.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>
                {config.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{marker.name}</div>
                <div style={{ fontSize: 11, color: theme.textLight }}>{config.label} · {marker.hours}</div>
              </div>
              <div style={{ fontSize: 12, color: theme.secondary, fontWeight: 700 }}>{marker.distance}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// COMMUNITY SCREEN
// ============================================================
function CommunityScreen() {
  const { theme } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleLike = (id) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const postTypeConfig = {
    'ingredient-swap': { color: '#5C6B2A', label: '🤝 Swap' },
    'progress': { color: '#C8941A', label: '🔥 Progress' },
    'event': { color: '#3A7BC8', label: '📅 Event' },
    'recipe': { color: '#B03A2E', label: '🍳 Recipe' },
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%', fontFamily: 'Lora, serif' }}>

      <div style={{ padding: '20px 20px 14px', background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <h1 style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 700, color: theme.text }}>Flavor Weavers' Circle</h1>
        <div style={{ fontSize: 12, color: theme.textLight }}>Portland, OR · 2,847 members</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 11, overflowX: 'auto' }}>
          {['all', 'swap', 'events', 'recipes', 'progress'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '5px 12px', borderRadius: 20,
              border: `1px solid ${activeFilter === f ? theme.primary : theme.border}`,
              background: activeFilter === f ? theme.primary : 'transparent',
              color: activeFilter === f ? '#FFFDF5' : theme.textMuted,
              fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'Lora, serif', textTransform: 'capitalize',
            }}>
              {f === 'all' ? 'All Posts' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Event Banner */}
      <div style={{
        margin: '12px 16px 8px',
        background: 'linear-gradient(135deg, #2A4A20 0%, #4A6A30 100%)',
        borderRadius: 14,
        padding: '12px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ color: '#C8D890', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 3 }}>📅 This Sunday</div>
          <div style={{ color: '#F0EAD6', fontSize: 14, fontWeight: 600 }}>Powell Butte Foraging Walk</div>
          <div style={{ color: 'rgba(240,234,214,0.65)', fontSize: 11 }}>9am · 8 spots · 5 joined</div>
        </div>
        <button style={{ background: '#C8941A', border: 'none', borderRadius: 10, padding: '7px 14px', color: '#FFF', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Lora, serif', flexShrink: 0 }}>
          Join
        </button>
      </div>

      <div style={{ padding: '4px 16px', paddingBottom: 90 }}>
        {communityPosts.map(post => {
          const typeConf = postTypeConfig[post.type] || postTypeConfig.progress;
          const isLiked = likedPosts.has(post.id);
          return (
            <div key={post.id} style={{
              background: theme.surface, borderRadius: 14, padding: '12px 14px',
              marginBottom: 10, border: `1px solid ${theme.border}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 9 }}>
                <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, border: `1px solid ${theme.border}`, flexShrink: 0,
                  }}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{post.user}</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>{post.quest} Quest · {post.time}</div>
                  </div>
                </div>
                <div style={{ background: typeConf.color + '22', borderRadius: 8, padding: '3px 8px', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: typeConf.color, fontWeight: 700 }}>{typeConf.label}</span>
                </div>
              </div>

              <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, marginBottom: 10 }}>
                {post.content}
              </div>

              {post.eventDetail && (
                <div style={{
                  background: theme.surfaceAlt, borderRadius: 8, padding: '7px 10px',
                  marginBottom: 10, fontSize: 12, color: theme.text, fontWeight: 600,
                }}>
                  📅 {post.eventDetail}
                </div>
              )}

              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                {Object.entries(post.reactions).map(([emoji, count]) => (
                  <div key={emoji} style={{
                    display: 'flex', alignItems: 'center', gap: 3,
                    background: theme.surfaceAlt, borderRadius: 20, padding: '3px 8px', fontSize: 12,
                  }}>
                    <span>{emoji}</span>
                    <span style={{ color: theme.textMuted }}>{count}</span>
                  </div>
                ))}
                <button
                  onClick={() => toggleLike(post.id)}
                  style={{
                    marginLeft: 'auto',
                    background: isLiked ? theme.accent + '22' : theme.surfaceAlt,
                    border: 'none', borderRadius: 20, padding: '3px 10px',
                    display: 'flex', alignItems: 'center', gap: 4,
                    cursor: 'pointer', fontSize: 12,
                    color: isLiked ? theme.accent : theme.textMuted,
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{isLiked ? '❤️' : '🤍'}</span>
                  <span>{post.replies}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// PROFILE SCREEN
// ============================================================
function ProfileScreen() {
  const { theme, isDark, setIsDark } = useApp();

  const badges = [
    { emoji: '🌾', name: 'Grain Whisperer', color: '#C8941A' },
    { emoji: '🍅', name: 'Tomato Tender', color: '#B03A2E' },
    { emoji: '🔥', name: '12-Day Streak', color: '#E04A20' },
    { emoji: '🌍', name: 'Local First', color: '#5C6B2A' },
    { emoji: '🤝', name: 'Swap Master', color: '#3A7BC8' },
    { emoji: '🌿', name: 'Forager', color: '#4A8040', locked: true },
  ];

  return (
    <div style={{ background: theme.bg, minHeight: '100%', fontFamily: 'Lora, serif' }}>

      {/* Full-bleed profile header */}
      <div style={{
        height: 155,
        background: 'linear-gradient(145deg, #3A4A14 0%, #5C6B2A 50%, #7A8040 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 140, opacity: 0.09 }}>🌿</div>
        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,253,245,0.2)', border: 'none', borderRadius: 18,
            width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 15 }}>{isDark ? '☀️' : '🌙'}</span>
        </button>
        {/* Avatar circle — overhangs the header */}
        <div style={{
          position: 'absolute', bottom: -28, left: 20,
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(145deg, #C8941A, #8B6014)',
          border: `3px solid ${theme.surface}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30,
          boxShadow: `0 4px 12px ${theme.shadow}`,
        }}>
          🧑‍🍳
        </div>
      </div>

      <div style={{ padding: '40px 20px 16px' }}>

        {/* Name / bio */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>Sarah Chen</div>
          <div style={{ fontSize: 12, color: theme.textLight, marginTop: 2 }}>Portland, OR · Member since Jan 2026</div>
          <div style={{ fontSize: 13, color: theme.textMuted, fontStyle: 'italic', marginTop: 5, lineHeight: 1.4 }}>
            "Building my culinary legacy, one harvest at a time."
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', background: theme.surface,
          borderRadius: 14, border: `1px solid ${theme.border}`,
          overflow: 'hidden', marginBottom: 16,
        }}>
          {[
            { label: 'Quests', value: '3' },
            { label: 'Log Entries', value: '24' },
            { label: 'Best Streak', value: '12🔥' },
            { label: 'Sources', value: '11' },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{
              flex: 1, padding: '12px 4px', textAlign: 'center',
              borderRight: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: theme.textLight, lineHeight: 1.3 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contribution calendar */}
        <div style={{ background: theme.surface, borderRadius: 14, padding: '14px', border: `1px solid ${theme.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 10 }}>🔥 April Contributions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {Array.from({ length: 28 }).map((_, i) => {
              const activeIndices = [0, 1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13];
              const isActive = activeIndices.includes(i);
              const isToday = i === 3;
              return (
                <div key={i} style={{
                  width: 27, height: 27, borderRadius: 6,
                  background: isActive ? theme.primary : isToday ? theme.secondary + '33' : theme.surfaceAlt,
                  border: `1px solid ${isToday ? theme.secondary : isActive ? 'transparent' : theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, color: isActive ? '#FFF' : theme.textLight,
                  fontWeight: isActive ? 700 : 400,
                }}>
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div style={{ background: theme.surface, borderRadius: 14, padding: '14px', border: `1px solid ${theme.border}`, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Quest Badges</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {badges.map((badge, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                opacity: badge.locked ? 0.38 : 1, width: 60,
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: badge.locked ? theme.surfaceAlt : `${badge.color}1A`,
                  border: `2px solid ${badge.locked ? theme.border : badge.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23,
                  filter: badge.locked ? 'grayscale(1)' : 'none',
                }}>
                  {badge.locked ? '🔒' : badge.emoji}
                </div>
                <div style={{ fontSize: 9, color: theme.textLight, textAlign: 'center', lineHeight: 1.25 }}>{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings row */}
        <div style={{ background: theme.surface, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          {[
            { icon: '📍', label: 'Location: Portland, OR' },
            { icon: '🔔', label: 'Quest Reminders: On' },
            { icon: '🌍', label: 'Share Lineage Publicly: On' },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px',
              borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: theme.text, flex: 1 }}>{item.label}</span>
              <span style={{ fontSize: 11, color: theme.textLight }}>›</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ============================================================
// BOTTOM NAVIGATION
// ============================================================
function BottomNav() {
  const { theme, activeScreen, setActiveScreen } = useApp();

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'quest', label: 'Quests', icon: 'BookOpen' },
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'community', label: 'Circle', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return (
    <div style={{
      display: 'flex',
      background: theme.tabBg,
      borderTop: `1px solid ${theme.border}`,
      padding: '8px 0 10px',
    }}>
      {tabs.map(tab => {
        const isActive = activeScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveScreen(tab.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            }}
          >
            <Icon name={tab.icon} size={20} color={isActive ? theme.primary : theme.textLight} strokeWidth={isActive ? 2 : 1.5} />
            <span style={{ fontSize: 10, color: isActive ? theme.primary : theme.textLight, fontFamily: 'Lora, serif', fontWeight: isActive ? 700 : 400 }}>
              <span>{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    quest: QuestScreen,
    map: MapScreen,
    community: CommunityScreen,
    profile: ProfileScreen,
  };

  const contextValue = {
    theme, isDark, setIsDark, activeScreen, setActiveScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{
        background: '#f0f0f0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Lora, serif',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 0px; height: 0px; }
          button { font-family: 'Lora', serif; }
        `}</style>

        {/* Phone frame */}
        <div style={{
          width: 375,
          height: 812,
          background: theme.bg,
          borderRadius: 42,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 35px 90px rgba(0,0,0,0.28), 0 0 0 9px #1a1512, 0 0 0 10px #2a2420',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            {React.createElement(ActiveScreen)}
          </div>
          <BottomNav />
        </div>
      </div>
    </AppContext.Provider>
  );
}
