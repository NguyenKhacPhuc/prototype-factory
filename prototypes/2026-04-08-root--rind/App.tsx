const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeQuest, setActiveQuest] = useState(null);
  const [streakCount] = useState(12);
  const [completedQuests, setCompletedQuests] = useState(['q1', 'q3']);
  const [likedCodex, setLikedCodex] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showQuestDetail, setShowQuestDetail] = useState(null);
  const [profileTab, setProfileTab] = useState('badges');

  const themes = {
    light: {
      bg: '#FEF2F2',
      card: '#FFFFFF',
      cardAlt: '#FFF5F5',
      text: '#1A1A1A',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      primary: '#DC2626',
      secondary: '#F87171',
      cta: '#CA8A04',
      ctaBg: '#FEF3C7',
      border: '#FDE8E8',
      borderLight: '#F3F4F6',
      navBg: '#FFFFFF',
      navBorder: '#F3E8E8',
      streak: '#DC2626',
      badgeBg: '#FEE2E2',
      tagBg: '#FEF2F2',
      inputBg: '#F9FAFB',
      shadow: 'rgba(220, 38, 38, 0.08)',
      shadowMd: 'rgba(220, 38, 38, 0.12)',
    },
    dark: {
      bg: '#1A1010',
      card: '#2A1A1A',
      cardAlt: '#331F1F',
      text: '#F5E6E6',
      textSecondary: '#BCA8A8',
      textMuted: '#8A7070',
      primary: '#DC2626',
      secondary: '#F87171',
      cta: '#CA8A04',
      ctaBg: '#3D3000',
      border: '#3D2020',
      borderLight: '#3D2A2A',
      navBg: '#2A1A1A',
      navBorder: '#3D2020',
      streak: '#F87171',
      badgeBg: '#3D1A1A',
      tagBg: '#3D2020',
      inputBg: '#331F1F',
      shadow: 'rgba(0, 0, 0, 0.3)',
      shadowMd: 'rgba(0, 0, 0, 0.5)',
    }
  };

  const t = darkMode ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};

  const createIcon = (IconComponent, size = 20, color = t.text, props = {}) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth: 1.8, ...props });
  };

  // Quests data
  const quests = [
    { id: 'q1', title: 'Heritage Sourdough Journey', region: 'Pacific Northwest', difficulty: 'Intermediate', xp: 250, desc: 'Master the art of wild-yeast sourdough using traditional PNW grain varieties. Document your 7-day starter process.', steps: 5, completed: 3, img: 'bread', category: 'technique' },
    { id: 'q2', title: 'Hatch Chile Discovery', region: 'New Mexico', difficulty: 'Beginner', xp: 150, desc: 'Explore the legendary Hatch green chile. Roast, taste, and document flavor profiles from mild to extra-hot.', steps: 4, completed: 0, img: 'pepper', category: 'ingredient' },
    { id: 'q3', title: 'Lowcountry Rice Traditions', region: 'South Carolina', difficulty: 'Advanced', xp: 400, desc: 'Uncover the deep roots of Carolina Gold rice cultivation and its role in Gullah Geechee cuisine.', steps: 7, completed: 7, img: 'rice', category: 'heritage' },
    { id: 'q4', title: 'Vermont Maple Mastery', region: 'New England', difficulty: 'Beginner', xp: 175, desc: 'Follow the maple sugaring season from tree to table. Learn grading, tapping, and traditional sugar-on-snow.', steps: 4, completed: 0, img: 'maple', category: 'ingredient' },
    { id: 'q5', title: 'Texas BBQ Pitmaster Path', region: 'Central Texas', difficulty: 'Advanced', xp: 500, desc: 'The ultimate low-and-slow brisket quest. Master post oak smoking, bark formation, and the Texas trinity.', steps: 8, completed: 0, img: 'bbq', category: 'technique' },
    { id: 'q6', title: 'Great Lakes Whitefish', region: 'Michigan', difficulty: 'Intermediate', xp: 275, desc: 'Discover the tradition of smoked whitefish from Lake Superior. Visit smokehouses and perfect your own cure.', steps: 5, completed: 0, img: 'fish', category: 'heritage' },
  ];

  // Codex entries
  const codexEntries = [
    { id: 'c1', title: 'Carolina Gold Rice', region: 'South Carolina', contributors: 847, entries: 234, desc: 'The grain that built a civilization. A living archive of Carolina Gold rice history, cultivation, and recipes.', category: 'Grain Heritage' },
    { id: 'c2', title: 'Hatch Chile Varieties', region: 'New Mexico', contributors: 1203, entries: 567, desc: 'From Big Jim to Sandia, a comprehensive guide to every Hatch chile variety and its unique flavor profile.', category: 'Regional Produce' },
    { id: 'c3', title: 'Sourdough Starters of the West', region: 'Pacific Northwest', contributors: 2100, entries: 890, desc: 'Wild yeast cultures passed down through generations. Document your starter\'s lineage and characteristics.', category: 'Living Cultures' },
    { id: 'c4', title: 'Appalachian Preserving', region: 'Appalachia', contributors: 634, entries: 178, desc: 'From ramps to pawpaws, mountain communities have preserved their harvest for centuries. Learn the old ways.', category: 'Preservation' },
    { id: 'c5', title: 'Gulf Coast Gumbo Map', region: 'Louisiana', contributors: 1567, entries: 423, desc: 'Every family has their own gumbo. Map the regional variations from Cajun to Creole across the Gulf Coast.', category: 'Regional Dish' },
  ];

  // Gatherings
  const gatherings = [
    { id: 'g1', title: 'Sourdough Share & Tell', date: 'Apr 15, 2026', time: '6:00 PM', location: 'Portland Community Kitchen', attendees: 23, maxAttendees: 30, type: 'In-Person', host: 'Maya Chen' },
    { id: 'g2', title: 'Virtual Chile Roasting 101', date: 'Apr 18, 2026', time: '7:30 PM', location: 'Zoom', attendees: 67, maxAttendees: 100, type: 'Virtual', host: 'Carlos Rivera' },
    { id: 'g3', title: 'Heritage Grain Tasting', date: 'Apr 22, 2026', time: '5:00 PM', location: 'Blue Hill Farm, NY', attendees: 15, maxAttendees: 20, type: 'In-Person', host: 'Sarah Kim' },
    { id: 'g4', title: 'Gumbo Cook-Off', date: 'May 1, 2026', time: '4:00 PM', location: 'NOLA Food Hall', attendees: 42, maxAttendees: 50, type: 'In-Person', host: 'James Boudreau' },
  ];

  // Badges
  const badges = [
    { id: 'b1', name: 'First Harvest', desc: 'Complete your first quest', earned: true, icon: 'Sprout' },
    { id: 'b2', name: 'Grain Guardian', desc: 'Master a grain heritage quest', earned: true, icon: 'Wheat' },
    { id: 'b3', name: 'Week Warrior', desc: '7-day streak', earned: true, icon: 'Flame' },
    { id: 'b4', name: 'Codex Contributor', desc: 'Add 10 entries to the Codex', earned: true, icon: 'BookOpen' },
    { id: 'b5', name: 'Pitmaster', desc: 'Complete a BBQ quest', earned: false, icon: 'Beef' },
    { id: 'b6', name: 'Community Root', desc: 'Attend 5 gatherings', earned: false, icon: 'Users' },
    { id: 'b7', name: 'Flavor Explorer', desc: 'Complete quests in 5 regions', earned: false, icon: 'Map' },
    { id: 'b8', name: 'Month Maven', desc: '30-day streak', earned: false, icon: 'Trophy' },
  ];

  const flavorStamps = [
    { region: 'Pacific Northwest', count: 3, color: '#2D5016' },
    { region: 'South Carolina', count: 2, color: '#7C2D12' },
    { region: 'New Mexico', count: 1, color: '#CA8A04' },
    { region: 'New England', count: 0, color: '#4338CA' },
    { region: 'Central Texas', count: 0, color: '#9F1239' },
  ];

  const difficultyColor = (d) => d === 'Beginner' ? '#16A34A' : d === 'Intermediate' ? '#CA8A04' : '#DC2626';

  const questImageColors = {
    bread: '#D97706', pepper: '#16A34A', rice: '#CA8A04', maple: '#9F580A', bbq: '#991B1B', fish: '#0369A1'
  };

  // Animations style tag
  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes streakGlow {
      0%, 100% { box-shadow: 0 0 8px rgba(220, 38, 38, 0.3); }
      50% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.6); }
    }
    @keyframes popIn {
      0% { transform: scale(0.8); opacity: 0; }
      70% { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }
  `);

  // ---------- HOME SCREEN ----------
  const HomeScreen = () => {
    const activeQuests = quests.filter(q => !completedQuests.includes(q.id) && q.completed > 0);
    const recommended = quests.filter(q => !completedQuests.includes(q.id) && q.completed === 0).slice(0, 3);

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease-out' } },
      // Greeting + Theme Toggle
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Root & Rind'),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '4px 0 0' } }, 'Your Local Food Story')
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, border: 'none', background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms' }
        }, createIcon(darkMode ? icons.Sun : icons.Moon, 20, t.textSecondary))
      ),

      // Streak Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, #991B1B)`,
          borderRadius: 20,
          padding: '20px 20px',
          marginBottom: 20,
          animation: 'slideUp 0.5s ease-out',
          position: 'relative',
          overflow: 'hidden'
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, right: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.06)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 } },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
              createIcon(icons.Flame, 22, '#FDE68A'),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#FDE68A', fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 } }, 'Culinary Lore Streak')
            ),
            React.createElement('div', { style: { fontSize: 42, fontWeight: 800, color: '#FFFFFF', fontFamily: font, letterSpacing: -1, lineHeight: 1 } }, `${streakCount} days`),
            React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font, margin: '4px 0 0' } }, 'Keep exploring to maintain your streak!')
          ),
          React.createElement('div', { style: { width: 72, height: 72, borderRadius: 36, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'streakGlow 2s infinite' } },
            createIcon(icons.Zap, 36, '#FDE68A')
          )
        )
      ),

      // Active Quests
      activeQuests.length > 0 && React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, margin: 0 } }, 'Continue Quest'),
          React.createElement('button', {
            onClick: () => setActiveScreen('quests'),
            style: { background: 'none', border: 'none', fontSize: 15, color: t.primary, fontFamily: font, fontWeight: 600, cursor: 'pointer', padding: '4px 0' }
          }, 'See All')
        ),
        activeQuests.map((q, i) =>
          React.createElement('div', {
            key: q.id,
            onClick: () => { setShowQuestDetail(q); setActiveScreen('quests'); },
            style: {
              background: t.card,
              borderRadius: 16,
              padding: 16,
              marginBottom: 10,
              boxShadow: `0 2px 12px ${t.shadow}`,
              cursor: 'pointer',
              transition: 'transform 200ms, box-shadow 200ms',
              border: `1px solid ${t.border}`,
              display: 'flex', gap: 14, alignItems: 'center',
              animation: `slideUp ${0.4 + i * 0.1}s ease-out`
            }
          },
            React.createElement('div', { style: { width: 56, height: 56, borderRadius: 14, background: questImageColors[q.img], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              createIcon(icons.ChefHat, 28, '#FFFFFF')
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, q.title),
              React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: '2px 0 8px' } }, q.region),
              React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.borderLight, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${(q.completed / q.steps) * 100}%`, borderRadius: 3, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, transition: 'width 500ms' } })
              ),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, `${q.completed}/${q.steps} steps`)
            )
          )
        )
      ),

      // Recommended
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, margin: '0 0 12px' } }, 'Discover Quests'),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, marginRight: -16 } },
          recommended.map((q, i) =>
            React.createElement('div', {
              key: q.id,
              onClick: () => { setShowQuestDetail(q); setActiveScreen('quests'); },
              style: {
                minWidth: 200, background: t.card, borderRadius: 16, overflow: 'hidden',
                boxShadow: `0 2px 12px ${t.shadow}`, cursor: 'pointer', flexShrink: 0,
                border: `1px solid ${t.border}`, transition: 'transform 200ms',
                animation: `popIn ${0.3 + i * 0.1}s ease-out`
              }
            },
              React.createElement('div', { style: { height: 100, background: `linear-gradient(135deg, ${questImageColors[q.img]}, ${questImageColors[q.img]}CC)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' } },
                createIcon(icons.Compass, 36, 'rgba(255,255,255,0.9)'),
                React.createElement('div', { style: { position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '2px 8px' } },
                  React.createElement('span', { style: { fontSize: 11, color: '#FFF', fontFamily: font, fontWeight: 600 } }, `${q.xp} XP`)
                )
              ),
              React.createElement('div', { style: { padding: 12 } },
                React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 4px' } }, q.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  createIcon(icons.MapPin, 12, t.textMuted),
                  React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, q.region)
                ),
                React.createElement('span', {
                  style: { display: 'inline-block', marginTop: 8, fontSize: 11, fontWeight: 600, color: difficultyColor(q.difficulty), background: `${difficultyColor(q.difficulty)}15`, borderRadius: 6, padding: '2px 8px', fontFamily: font }
                }, q.difficulty)
              )
            )
          )
        )
      ),

      // Upcoming Gathering
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, margin: 0 } }, 'Next Gathering'),
          React.createElement('button', {
            onClick: () => setActiveScreen('gatherings'),
            style: { background: 'none', border: 'none', fontSize: 15, color: t.primary, fontFamily: font, fontWeight: 600, cursor: 'pointer' }
          }, 'See All')
        ),
        React.createElement('div', {
          onClick: () => setActiveScreen('gatherings'),
          style: {
            background: t.card, borderRadius: 16, padding: 16,
            boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}`,
            cursor: 'pointer', transition: 'transform 200ms'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 14, background: `${t.cta}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              createIcon(icons.CalendarDays, 24, t.cta)
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, gatherings[0].title),
              React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: '2px 0 0' } }, `${gatherings[0].date} at ${gatherings[0].time}`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 } },
                createIcon(icons.Users, 12, t.textMuted),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, `${gatherings[0].attendees}/${gatherings[0].maxAttendees} attending`)
              )
            )
          )
        )
      ),

      // Quick Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 } },
        [
          { label: 'Quests Done', value: completedQuests.length, icon: icons.Trophy },
          { label: 'Codex Entries', value: 18, icon: icons.BookOpen },
          { label: 'Stamps', value: 3, icon: icons.Stamp },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.card, borderRadius: 14, padding: '14px 10px', textAlign: 'center', border: `1px solid ${t.border}`, boxShadow: `0 1px 6px ${t.shadow}` }
          },
            React.createElement('div', { style: { marginBottom: 6 } }, createIcon(s.icon, 20, t.primary)),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.3 } }, s.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, s.label)
          )
        )
      )
    );
  };

  // ---------- QUESTS SCREEN ----------
  const QuestsScreen = () => {
    const categories = ['all', 'technique', 'ingredient', 'heritage'];
    const filtered = activeTab === 'all' ? quests : quests.filter(q => q.category === activeTab);

    if (showQuestDetail) {
      const q = showQuestDetail;
      const isComplete = completedQuests.includes(q.id);
      return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.3s ease-out' } },
        React.createElement('button', {
          onClick: () => setShowQuestDetail(null),
          style: { background: t.cardAlt, border: 'none', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', marginBottom: 16, fontFamily: font, fontSize: 15, color: t.textSecondary }
        }, createIcon(icons.ArrowLeft, 18, t.textSecondary), React.createElement('span', null, 'Back')),
        React.createElement('div', { style: { height: 160, borderRadius: 20, background: `linear-gradient(135deg, ${questImageColors[q.img]}, ${questImageColors[q.img]}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative', overflow: 'hidden' } },
          React.createElement('div', { style: { position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.1)' } }),
          createIcon(icons.Mountain, 56, 'rgba(255,255,255,0.9)'),
          isComplete && React.createElement('div', { style: { position: 'absolute', top: 12, right: 12, background: '#16A34A', borderRadius: 10, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 4 } },
            createIcon(icons.Check, 14, '#FFF'),
            React.createElement('span', { style: { fontSize: 13, color: '#FFF', fontWeight: 600, fontFamily: font } }, 'Completed')
          )
        ),
        React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' } }, q.title),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } }, createIcon(icons.MapPin, 14, t.textSecondary), React.createElement('span', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font } }, q.region)),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: difficultyColor(q.difficulty), background: `${difficultyColor(q.difficulty)}15`, borderRadius: 8, padding: '2px 10px', fontFamily: font } }, q.difficulty),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.cta, fontFamily: font } }, `${q.xp} XP`)
        ),
        React.createElement('p', { style: { fontSize: 17, color: t.textSecondary, fontFamily: font, lineHeight: 1.5, margin: '0 0 20px' } }, q.desc),
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 10px' } }, `Quest Steps (${q.completed}/${q.steps})`),
        React.createElement('div', { style: { marginBottom: 20 } },
          Array.from({ length: q.steps }, (_, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < q.steps - 1 ? `1px solid ${t.borderLight}` : 'none' }
            },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 16, background: i < q.completed ? t.primary : t.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                i < q.completed
                  ? createIcon(icons.Check, 16, '#FFF')
                  : React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.textMuted, fontFamily: font } }, i + 1)
              ),
              React.createElement('span', { style: { fontSize: 15, color: i < q.completed ? t.textMuted : t.text, fontFamily: font, textDecoration: i < q.completed ? 'line-through' : 'none' } },
                [`Source local ingredients`, `Research regional history`, `Practice core technique`, `Document with photos & notes`, `Share with community`, `Get community feedback`, `Master the variation`, `Achieve pitmaster certification`][i] || `Step ${i + 1}`
              )
            )
          )
        ),
        !isComplete && React.createElement('button', {
          onClick: () => {
            if (!completedQuests.includes(q.id)) {
              setCompletedQuests([...completedQuests, q.id]);
              setShowQuestDetail({ ...q, completed: q.steps });
            }
          },
          style: { width: '100%', padding: '16px', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${t.primary}, #991B1B)`, color: '#FFF', fontSize: 17, fontWeight: 700, fontFamily: font, cursor: 'pointer', transition: 'transform 150ms' }
        }, q.completed > 0 ? 'Continue Quest' : 'Begin Quest')
      );
    }

    return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' } }, 'Flavor Quests'),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 16px' } }, 'Curated challenges rooted in local food heritage'),
      // Category tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
        categories.map(c =>
          React.createElement('button', {
            key: c,
            onClick: () => setActiveTab(c),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', fontFamily: font, fontSize: 13, fontWeight: 600,
              background: activeTab === c ? t.primary : t.cardAlt,
              color: activeTab === c ? '#FFF' : t.textSecondary,
              cursor: 'pointer', transition: 'all 200ms', textTransform: 'capitalize', whiteSpace: 'nowrap'
            }
          }, c)
        )
      ),
      filtered.map((q, i) => {
        const isComplete = completedQuests.includes(q.id);
        return React.createElement('div', {
          key: q.id,
          onClick: () => setShowQuestDetail(q),
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}`,
            cursor: 'pointer', transition: 'transform 200ms, box-shadow 200ms',
            display: 'flex', gap: 14, alignItems: 'center',
            animation: `slideUp ${0.3 + i * 0.08}s ease-out`,
            opacity: isComplete ? 0.7 : 1
          }
        },
          React.createElement('div', { style: { width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg, ${questImageColors[q.img]}, ${questImageColors[q.img]}AA)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' } },
            createIcon(isComplete ? icons.CheckCircle : icons.Compass, 28, '#FFF'),
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, q.title),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.cta, fontFamily: font, flexShrink: 0 } }, `${q.xp} XP`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 8px' } },
              React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, q.region),
              React.createElement('span', { style: { width: 3, height: 3, borderRadius: 2, background: t.textMuted } }),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: difficultyColor(q.difficulty), fontFamily: font } }, q.difficulty)
            ),
            q.completed > 0 && !isComplete && React.createElement('div', null,
              React.createElement('div', { style: { height: 5, borderRadius: 3, background: t.borderLight, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${(q.completed / q.steps) * 100}%`, borderRadius: 3, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})` } })
              ),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, `${q.completed}/${q.steps} steps`)
            ),
            isComplete && React.createElement('span', { style: { fontSize: 13, color: '#16A34A', fontWeight: 600, fontFamily: font } }, 'Completed')
          )
        );
      })
    );
  };

  // ---------- CODEX SCREEN ----------
  const CodexScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' } }, 'Local Flavors Codex'),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 16px' } }, 'A living encyclopedia of regional food heritage'),

      // Search
      React.createElement('div', { style: { position: 'relative', marginBottom: 20 } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' } }, createIcon(icons.Search, 18, t.textMuted)),
        React.createElement('input', {
          placeholder: 'Search the Codex...',
          style: { width: '100%', padding: '12px 14px 12px 42px', borderRadius: 14, border: `1px solid ${t.border}`, background: t.inputBg, fontFamily: font, fontSize: 15, color: t.text, outline: 'none', boxSizing: 'border-box' }
        })
      ),

      // Top Contributors banner
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.cta}20, ${t.cta}10)`, borderRadius: 16, padding: 16, marginBottom: 20, border: `1px solid ${t.cta}30`, display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: t.ctaBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          createIcon(icons.Sparkles, 24, t.cta)
        ),
        React.createElement('div', null,
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font, margin: 0 } }, '6,351 Flavor Archivists'),
          React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: '2px 0 0' } }, '2,292 entries documented this month')
        )
      ),

      // Codex entries
      codexEntries.map((entry, i) => {
        const isLiked = likedCodex.includes(entry.id);
        return React.createElement('div', {
          key: entry.id,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}`,
            animation: `slideUp ${0.3 + i * 0.08}s ease-out`, cursor: 'pointer',
            transition: 'transform 200ms'
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.cta, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5 } }, entry.category),
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '2px 0 0' } }, entry.title),
            ),
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); setLikedCodex(isLiked ? likedCodex.filter(id => id !== entry.id) : [...likedCodex, entry.id]); },
              style: { width: 40, height: 40, borderRadius: 20, border: 'none', background: isLiked ? '#FEE2E2' : t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms' }
            }, createIcon(icons.Heart, 18, isLiked ? t.primary : t.textMuted, { fill: isLiked ? t.primary : 'none' }))
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 } },
            createIcon(icons.MapPin, 13, t.textSecondary),
            React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, entry.region)
          ),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, lineHeight: 1.45, margin: '0 0 12px' } }, entry.desc),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(icons.Users, 13, t.textMuted),
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, `${entry.contributors.toLocaleString()} archivists`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(icons.FileText, 13, t.textMuted),
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, `${entry.entries} entries`)
            )
          )
        );
      }),

      // Contribute CTA
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.primary}, #991B1B)`, borderRadius: 16, padding: 20, textAlign: 'center', marginTop: 8 } },
        createIcon(icons.PenLine, 28, '#FDE68A'),
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: '#FFF', fontFamily: font, margin: '8px 0 4px' } }, 'Become a Flavor Archivist'),
        React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font, margin: '0 0 12px' } }, 'Share your local food knowledge with the community'),
        React.createElement('button', { style: { padding: '10px 24px', borderRadius: 12, border: 'none', background: '#FFF', color: t.primary, fontSize: 15, fontWeight: 700, fontFamily: font, cursor: 'pointer' } }, 'Start Contributing')
      )
    );
  };

  // ---------- GATHERINGS SCREEN ----------
  const GatheringsScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' } }, 'Hearth Gatherings'),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 16px' } }, 'Connect with your local food community'),

      // Create gathering button
      React.createElement('button', {
        style: { width: '100%', padding: '14px', borderRadius: 14, border: `2px dashed ${t.border}`, background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20, cursor: 'pointer', transition: 'all 200ms', fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary }
      },
        createIcon(icons.Plus, 20, t.primary),
        React.createElement('span', null, 'Host a Gathering')
      ),

      // Gatherings list
      gatherings.map((g, i) => {
        const fillPercent = (g.attendees / g.maxAttendees) * 100;
        return React.createElement('div', {
          key: g.id,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}`,
            animation: `slideUp ${0.3 + i * 0.1}s ease-out`, cursor: 'pointer',
            transition: 'transform 200ms'
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: 14 } },
            React.createElement('div', { style: { width: 56, height: 64, borderRadius: 14, background: g.type === 'Virtual' ? '#7C3AED20' : `${t.primary}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: g.type === 'Virtual' ? '#7C3AED' : t.primary, fontFamily: font, textTransform: 'uppercase' } }, g.date.split(' ')[0]),
              React.createElement('span', { style: { fontSize: 22, fontWeight: 800, color: g.type === 'Virtual' ? '#7C3AED' : t.primary, fontFamily: font, lineHeight: 1 } }, g.date.split(' ')[1].replace(',', ''))
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 } },
                React.createElement('h3', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, g.title),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 600, padding: '1px 8px', borderRadius: 6, background: g.type === 'Virtual' ? '#7C3AED20' : `${t.cta}20`, color: g.type === 'Virtual' ? '#7C3AED' : t.cta, fontFamily: font } }, g.type)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, margin: '4px 0' } },
                createIcon(icons.Clock, 13, t.textMuted),
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, g.time)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 } },
                createIcon(g.type === 'Virtual' ? icons.Video : icons.MapPin, 13, t.textMuted),
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, g.location)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 } },
                createIcon(icons.User, 13, t.textMuted),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, `Hosted by ${g.host}`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', { style: { flex: 1, height: 5, borderRadius: 3, background: t.borderLight, overflow: 'hidden' } },
                  React.createElement('div', { style: { height: '100%', width: `${fillPercent}%`, borderRadius: 3, background: fillPercent > 80 ? t.primary : t.cta, transition: 'width 500ms' } })
                ),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, whiteSpace: 'nowrap' } }, `${g.attendees}/${g.maxAttendees}`)
              )
            )
          ),
          React.createElement('button', {
            style: { width: '100%', marginTop: 12, padding: '10px', borderRadius: 10, border: `1.5px solid ${t.primary}`, background: 'transparent', color: t.primary, fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer', transition: 'all 200ms' }
          }, 'Join Gathering')
        );
      })
    );
  };

  // ---------- PROFILE SCREEN ----------
  const ProfileScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease-out' } },
      // Profile Header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 24 } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${t.primary}40` } },
          React.createElement('span', { style: { fontSize: 32, fontWeight: 800, color: '#FFF', fontFamily: font } }, 'JD')
        ),
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 2px' } }, 'Jordan Davis'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: 0 } }, 'Flavor Archivist since Jan 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 } },
          [{ n: streakCount, l: 'Day Streak' }, { n: completedQuests.length, l: 'Quests' }, { n: 18, l: 'Entries' }].map((s, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.primary, fontFamily: font } }, s.n),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, s.l)
            )
          )
        )
      ),

      // XP Progress
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 20, boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            createIcon(icons.Award, 18, t.cta),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, 'Level 4 — Journeyman')
          ),
          React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, '650/1000 XP')
        ),
        React.createElement('div', { style: { height: 8, borderRadius: 4, background: t.borderLight, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '65%', borderRadius: 4, background: `linear-gradient(90deg, ${t.cta}, #D97706)`, transition: 'width 800ms' } })
        )
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 16, background: t.cardAlt, borderRadius: 12, padding: 3 } },
        ['badges', 'stamps'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setProfileTab(tab),
            style: {
              flex: 1, padding: '10px', borderRadius: 10, border: 'none', fontFamily: font, fontSize: 15, fontWeight: 600,
              background: profileTab === tab ? t.card : 'transparent',
              color: profileTab === tab ? t.text : t.textMuted,
              cursor: 'pointer', transition: 'all 200ms',
              boxShadow: profileTab === tab ? `0 1px 4px ${t.shadow}` : 'none',
              textTransform: 'capitalize'
            }
          }, tab === 'badges' ? 'Badges' : 'Flavor Stamps')
        )
      ),

      // Badges
      profileTab === 'badges' && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        badges.map((b, i) =>
          React.createElement('div', {
            key: b.id,
            style: {
              background: t.card, borderRadius: 14, padding: 14, textAlign: 'center',
              boxShadow: `0 2px 8px ${t.shadow}`, border: `1px solid ${t.border}`,
              opacity: b.earned ? 1 : 0.45, transition: 'all 200ms',
              animation: `popIn ${0.2 + i * 0.06}s ease-out`
            }
          },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 24, background: b.earned ? t.badgeBg : t.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
              createIcon(icons[b.icon] || icons.Award, 24, b.earned ? t.primary : t.textMuted)
            ),
            React.createElement('h4', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 2px' } }, b.name),
            React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, margin: 0, lineHeight: 1.3 } }, b.desc),
            b.earned && React.createElement('div', { style: { marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 } },
              createIcon(icons.Check, 12, '#16A34A'),
              React.createElement('span', { style: { fontSize: 11, color: '#16A34A', fontWeight: 600, fontFamily: font } }, 'Earned')
            )
          )
        )
      ),

      // Flavor Stamps
      profileTab === 'stamps' && React.createElement('div', null,
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 16px' } }, 'Your regional mastery map. Complete quests to earn stamps.'),
        flavorStamps.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: 14, marginBottom: 10,
              boxShadow: `0 1px 6px ${t.shadow}`, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', gap: 14,
              animation: `slideUp ${0.3 + i * 0.08}s ease-out`
            }
          },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 24, background: s.count > 0 ? `${s.color}20` : t.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: s.count > 0 ? `2px solid ${s.color}` : `2px dashed ${t.textMuted}40` } },
              s.count > 0
                ? createIcon(icons.Stamp, 22, s.color)
                : createIcon(icons.Lock, 18, t.textMuted)
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h4', { style: { fontSize: 15, fontWeight: 600, color: s.count > 0 ? t.text : t.textMuted, fontFamily: font, margin: 0 } }, s.region),
              React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, margin: '2px 0 0' } },
                s.count > 0 ? `${s.count} quest${s.count > 1 ? 's' : ''} completed` : 'No quests completed yet'
              )
            ),
            s.count > 0 && React.createElement('div', { style: { display: 'flex', gap: 3 } },
              Array.from({ length: Math.min(s.count, 5) }, (_, j) =>
                React.createElement('div', { key: j, style: { width: 8, height: 8, borderRadius: 4, background: s.color } })
              )
            )
          )
        )
      ),

      // Settings
      React.createElement('div', { style: { marginTop: 20 } },
        React.createElement('div', {
          onClick: () => setDarkMode(!darkMode),
          style: {
            background: t.card, borderRadius: 14, padding: '14px 16px',
            boxShadow: `0 1px 6px ${t.shadow}`, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            createIcon(darkMode ? icons.Sun : icons.Moon, 20, t.textSecondary),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 500, color: t.text, fontFamily: font } }, darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode')
          ),
          React.createElement('div', {
            style: { width: 44, height: 26, borderRadius: 13, background: darkMode ? t.primary : t.borderLight, padding: 2, transition: 'background 200ms', display: 'flex', alignItems: 'center' }
          },
            React.createElement('div', { style: { width: 22, height: 22, borderRadius: 11, background: '#FFF', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transform: darkMode ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 200ms' } })
          )
        )
      )
    );
  };

  const screens = { home: HomeScreen, quests: QuestsScreen, codex: CodexScreen, gatherings: GatheringsScreen, profile: ProfileScreen };

  const navItems = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'quests', label: 'Quests', icon: icons.Compass },
    { id: 'codex', label: 'Codex', icon: icons.BookOpen },
    { id: 'gatherings', label: 'Gather', icon: icons.Users },
    { id: 'profile', label: 'Profile', icon: icons.User },
  ];

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font } },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column'
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 8, paddingBottom: 0 }
      },
        React.createElement(screens[activeScreen])
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          height: 80, paddingBottom: 16, background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          flexShrink: 0
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => { setActiveScreen(item.id); if (item.id === 'quests') setShowQuestDetail(null); },
            style: {
              background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, cursor: 'pointer', padding: '6px 12px',
              minWidth: 44, minHeight: 44, transition: 'all 150ms'
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: activeScreen === item.id ? `${t.primary}15` : 'transparent',
                transition: 'all 200ms'
              }
            }, createIcon(item.icon, 22, activeScreen === item.id ? t.primary : t.textMuted)),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: activeScreen === item.id ? 600 : 400,
                color: activeScreen === item.id ? t.primary : t.textMuted,
                fontFamily: font, transition: 'all 150ms'
              }
            }, item.label)
          )
        )
      )
    )
  );
}
