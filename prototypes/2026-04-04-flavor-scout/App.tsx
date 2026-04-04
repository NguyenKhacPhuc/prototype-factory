function App() {
  const { useState } = React;

  const themes = {
    light: {
      bg: '#F5EDD6', bgAlt: '#EDE0C4', surface: '#FFFFFF', surfaceAlt: '#FAF4E8',
      primary: '#4A1942', primaryLight: '#7B3F73', secondary: '#2D5A3D',
      accent: '#F4A825', text: '#1A0A15', textMuted: '#6B5060', textLight: '#9B8090',
      border: '#D4C4A8', tag: '#E8D5B0', tagText: '#5A2E50',
    },
    dark: {
      bg: '#1A0A15', bgAlt: '#251520', surface: '#2D1525', surfaceAlt: '#3A1C2E',
      primary: '#D4A0C8', primaryLight: '#E8C0E0', secondary: '#6AAE80',
      accent: '#F4A825', text: '#F5EDD6', textMuted: '#C4A0B0', textLight: '#7A5868',
      border: '#4A2535', tag: '#3D1A30', tagText: '#D4A0C8',
    }
  };

  const [isDark, setIsDark] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [likedItems, setLikedItems] = useState(new Set(['a5']));
  const [pressedItem, setPressedItem] = useState(null);
  const [completedQuests, setCompletedQuests] = useState(new Set(['quest-2']));
  const [activeTab, setActiveTab] = useState('active');
  const [communityTab, setCommunityTab] = useState('trending');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState('All');

  const t = isDark ? themes.dark : themes.light;

  const press = (id, fn) => {
    setPressedItem(id);
    setTimeout(() => { setPressedItem(null); if (fn) fn(); }, 130);
  };

  const toggleLike = (id) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const Tag = ({ children, color, textColor }) => (
    React.createElement('span', {
      style: {
        display: 'inline-block', padding: '3px 9px',
        background: color || t.tag, color: textColor || t.tagText,
        borderRadius: 2, fontSize: 10, fontFamily: '"Source Sans 3", sans-serif',
        fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
      }
    }, children)
  );

  const ThemeToggle = () => (
    React.createElement('button', {
      onClick: () => setIsDark(!isDark),
      style: {
        background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20,
        padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center',
        color: t.textMuted, transition: 'all 0.2s',
      }
    }, isDark
      ? React.createElement(window.lucide.Sun, { size: 15 })
      : React.createElement(window.lucide.Moon, { size: 15 })
    )
  );

  const BackButton = () => (
    React.createElement('button', {
      onClick: () => setActiveScreen('home'),
      style: {
        display: 'flex', alignItems: 'center', gap: 5, background: 'none',
        border: 'none', cursor: 'pointer', color: t.textMuted, padding: '4px 0',
        fontFamily: '"Source Sans 3", sans-serif', fontSize: 13,
      }
    },
      React.createElement(window.lucide.ArrowLeft, { size: 17, strokeWidth: 2 }),
      React.createElement('span', null, 'Home')
    )
  );

  // ─── HOME SCREEN ────────────────────────────────────────────────────────────
  const HomeScreen = () => (
    React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      // Header
      React.createElement('div', {
        style: { padding: '22px 24px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: '"Playfair Display", serif', fontSize: 27, fontWeight: 900, color: t.primary, letterSpacing: '-0.5px', lineHeight: 1 }
          }, 'Flavor Scout'),
          React.createElement('div', {
            style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: t.textMuted, marginTop: 3 }
          }, 'Brooklyn, New York')
        ),
        React.createElement(ThemeToggle)
      ),

      // Streak Banner
      React.createElement('div', {
        style: { margin: '12px 24px 18px', background: isDark ? '#3A1C2E' : t.primary, borderRadius: 4, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(window.lucide.Flame, { size: 22, color: '#F4A825' }),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 19, fontWeight: 700, color: '#F4A825' } }, '12 Day Streak'),
            React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, color: 'rgba(245,237,214,0.65)' } }, 'Keep exploring to maintain your streak')
          )
        ),
        React.createElement('div', {
          style: { background: '#F4A825', borderRadius: 2, padding: '4px 10px', fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, fontWeight: 700, color: '#1A0A15' }
        }, 'ELITE')
      ),

      // Featured Quest — ASYMMETRIC LAYOUT
      React.createElement('div', { style: { margin: '0 24px 20px' } },
        React.createElement('div', {
          style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 10 }
        }, "TODAY'S QUEST"),
        React.createElement('div', {
          onClick: () => press('fq', () => setActiveScreen('quests')),
          style: {
            cursor: 'pointer', background: isDark ? '#3D1A2E' : '#4A1942', borderRadius: 6,
            overflow: 'hidden', position: 'relative', minHeight: 158,
            opacity: pressedItem === 'fq' ? 0.88 : 1,
            transform: pressedItem === 'fq' ? 'scale(0.985)' : 'scale(1)',
            transition: 'all 0.12s',
          }
        },
          // Green asymmetric accent bar
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 5, background: '#2D5A3D' } }),
          // Diagonal tint block (asymmetric)
          React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, bottom: 0, width: '38%', background: 'rgba(244,168,37,0.07)', clipPath: 'polygon(25% 0,100% 0,100% 100%,0% 100%)' } }),
          React.createElement('div', { style: { padding: '18px 18px 16px 24px', position: 'relative' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { flex: 1, paddingRight: 12 } },
                React.createElement(Tag, { color: '#2D5A3D', textColor: '#F5EDD6' }, 'Cultural'),
                React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 21, fontWeight: 700, color: '#F5EDD6', lineHeight: 1.2, marginTop: 7, marginBottom: 7 } }, 'Hunt the Hidden Dumpling'),
                React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: 'rgba(245,237,214,0.72)', lineHeight: 1.5 } }, 'Find a hand-made dumpling from a family-run establishment and document the chef.')
              ),
              React.createElement('div', { style: { background: '#F4A825', borderRadius: 3, padding: '8px 10px', textAlign: 'center', minWidth: 52, marginTop: -2, flexShrink: 0 } },
                React.createElement(window.lucide.Clock, { size: 15, color: '#1A0A15' }),
                React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, fontWeight: 700, color: '#1A0A15', marginTop: 2 } }, '4h 22m')
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 } },
              React.createElement('div', { style: { display: 'flex', gap: 6 } },
                React.createElement(Tag, { color: 'rgba(244,168,37,0.18)', textColor: '#F4A825' }, '+150 XP'),
                React.createElement(Tag, { color: 'rgba(45,90,61,0.4)', textColor: '#A8D8B4' }, 'Tier 2')
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(245,237,214,0.55)', fontFamily: '"Source Sans 3", sans-serif', fontSize: 11 } },
                React.createElement(window.lucide.Users, { size: 12 }),
                React.createElement('span', null, '47 scouts active')
              )
            )
          )
        )
      ),

      // Navigation Hub Cards (2×2 grid)
      React.createElement('div', { style: { padding: '0 24px', marginBottom: 20 } },
        React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 10 } }, 'EXPLORE'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          ...[
            { id: 'quests', icon: 'Compass', label: 'Quests', sub: '3 active', bg: t.secondary, textC: '#F5EDD6', subC: 'rgba(245,237,214,0.65)' },
            { id: 'atlas', icon: 'Map', label: 'Atlas', sub: '248 finds', bg: t.surface, textC: t.text, subC: t.textMuted },
            { id: 'community', icon: 'Users', label: 'Hangouts', sub: '12 online', bg: t.surface, textC: t.text, subC: t.textMuted },
            { id: 'profile', icon: 'User', label: 'My Journey', sub: 'Rank: Elite', bg: t.accent, textC: '#1A0A15', subC: 'rgba(26,10,21,0.6)' },
          ].map(({ id, icon, label, sub, bg, textC, subC }) =>
            React.createElement('div', {
              key: id,
              onClick: () => press(id, () => setActiveScreen(id)),
              style: {
                background: bg, borderRadius: 5, padding: '15px 13px', cursor: 'pointer',
                border: `1px solid ${t.border}`,
                opacity: pressedItem === id ? 0.82 : 1,
                transform: pressedItem === id ? 'scale(0.96)' : 'scale(1)',
                transition: 'all 0.11s',
              }
            },
              React.createElement('div', { style: { color: textC, marginBottom: 8 } },
                React.createElement(window.lucide[icon], { size: 21, strokeWidth: 1.5 })
              ),
              React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 16, fontWeight: 700, color: textC } }, label),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, color: subC, marginTop: 2 } }, sub),
              React.createElement('span', { style: { display: 'none' } }, label)
            )
          )
        )
      ),

      // Recent Discoveries
      React.createElement('div', { style: { padding: '0 24px 36px' } },
        React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 10 } }, 'RECENT DISCOVERIES'),
        ...[
          { id: 'r1', scout: 'Maya K.', find: "Grandma Liu's Scallion Pancakes", loc: 'Flushing, Queens', time: '2h ago', emoji: '🥞' },
          { id: 'r2', scout: 'Carlos R.', find: 'Yemeni Honey Cake at Al-Nakheel', loc: 'Bay Ridge', time: '5h ago', emoji: '🍯' },
        ].map(item =>
          React.createElement('div', {
            key: item.id,
            style: { background: t.surface, borderRadius: 4, padding: '12px', marginBottom: 9, display: 'flex', gap: 11, border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { width: 42, height: 42, background: t.bgAlt, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, flexShrink: 0 } }, item.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 13, fontWeight: 600, color: t.text } }, item.find),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, color: t.textMuted, marginTop: 3, display: 'flex', gap: 6, alignItems: 'center' } },
                React.createElement('span', null, item.scout),
                React.createElement('span', null, '·'),
                React.createElement(window.lucide.MapPin, { size: 10 }),
                React.createElement('span', null, item.loc)
              )
            ),
            React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, color: t.textLight, flexShrink: 0 } }, item.time)
          )
        )
      )
    )
  );

  // ─── QUESTS SCREEN ───────────────────────────────────────────────────────────
  const QuestsScreen = () => {
    const quests = [
      { id: 'quest-3', title: 'Sunday Sourdough Chronicles', type: 'Artisan', xp: 100, desc: 'Document a local baker\'s Saturday morning ritual and their signature loaf.', scouts: 31, timeLeft: '2d 6h' },
      { id: 'quest-4', title: 'Night Market Secrets', type: 'Street Food', xp: 175, desc: 'Find and try an item only available after 9pm at a local night market.', scouts: 18, timeLeft: '1d 14h' },
      { id: 'quest-2', title: 'The Sichuan Pepper Trail', type: 'Ingredient', xp: 200, desc: 'Source fresh Sichuan peppercorns from a local specialty spice vendor.', scouts: 23, timeLeft: 'Completed' },
    ];

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      React.createElement('div', { style: { padding: '20px 24px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement(BackButton),
          React.createElement(ThemeToggle)
        ),
        React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 30, fontWeight: 900, color: t.primary, lineHeight: 1.05 } }, 'Flavor\nQuests'),
        React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: t.textMuted, marginTop: 5, marginBottom: 18 } }, 'Your guided culinary adventures'),

        // Tabs
        React.createElement('div', { style: { display: 'flex', borderBottom: `2px solid ${t.border}`, marginBottom: 18 } },
          ...['active', 'completed', 'upcoming'].map(tab =>
            React.createElement('button', {
              key: tab, onClick: () => setActiveTab(tab),
              style: {
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
                fontFamily: '"Source Sans 3", sans-serif', fontSize: 13,
                fontWeight: activeTab === tab ? 700 : 400,
                color: activeTab === tab ? t.primary : t.textMuted,
                borderBottom: activeTab === tab ? `2px solid ${t.primary}` : '2px solid transparent',
                marginBottom: -2, textTransform: 'capitalize',
              }
            }, React.createElement('span', null, tab))
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 24px 32px' } },
        // ASYMMETRIC featured quest card
        activeTab === 'active' && React.createElement('div', { style: { marginBottom: 18 } },
          React.createElement('div', { style: { background: t.secondary, borderRadius: 6, overflow: 'hidden', position: 'relative' } },
            React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: '42%', height: '100%', background: 'rgba(244,168,37,0.09)', clipPath: 'polygon(28% 0,100% 0,100% 100%,0 100%)' } }),
            React.createElement('div', { style: { padding: '18px 18px 16px', position: 'relative' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                React.createElement(Tag, { color: 'rgba(244,168,37,0.22)', textColor: '#F4A825' }, 'FEATURED TODAY'),
                React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, color: 'rgba(245,237,214,0.75)', display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Clock, { size: 11 }),
                  React.createElement('span', null, '4h 22m left')
                )
              ),
              React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 20, fontWeight: 700, color: '#F5EDD6', lineHeight: 1.2, marginBottom: 7 } }, 'Hunt the Hidden Dumpling'),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: 'rgba(245,237,214,0.7)', lineHeight: 1.5, marginBottom: 14 } }, 'Find and photograph a hand-made dumpling from a family-run establishment. Document the chef if possible.'),
              React.createElement('div', { style: { marginBottom: 12 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, color: 'rgba(245,237,214,0.55)', marginBottom: 5 } },
                  React.createElement('span', null, 'Progress'),
                  React.createElement('span', null, '1 / 3 objectives')
                ),
                React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 2, height: 4 } },
                  React.createElement('div', { style: { background: '#F4A825', borderRadius: 2, height: 4, width: '33%' } })
                )
              ),
              React.createElement('button', {
                onClick: () => setCompletedQuests(prev => new Set([...prev, 'quest-1'])),
                style: {
                  background: completedQuests.has('quest-1') ? 'rgba(45,90,61,0.6)' : '#F4A825',
                  border: 'none', cursor: 'pointer', borderRadius: 3, padding: '10px 0',
                  width: '100%', fontFamily: '"Source Sans 3", sans-serif', fontSize: 13,
                  fontWeight: 700, color: completedQuests.has('quest-1') ? '#A8D8B4' : '#1A0A15',
                  letterSpacing: '0.04em',
                }
              }, completedQuests.has('quest-1') ? '✓ Discovery Logged' : 'Log Discovery')
            )
          )
        ),

        // Quest list
        ...quests
          .filter(q => activeTab === 'active' ? !completedQuests.has(q.id) : activeTab === 'completed' ? completedQuests.has(q.id) : false)
          .map(quest =>
            React.createElement('div', {
              key: quest.id,
              style: {
                background: t.surface, border: `1px solid ${t.border}`,
                borderLeft: `4px solid ${completedQuests.has(quest.id) ? t.secondary : t.primary}`,
                borderRadius: 4, padding: '13px', marginBottom: 11,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('div', { style: { flex: 1, paddingRight: 8 } },
                  React.createElement('div', { style: { display: 'flex', gap: 5, marginBottom: 6 } },
                    React.createElement(Tag, null, quest.type),
                    React.createElement(Tag, { color: isDark ? 'rgba(244,168,37,0.15)' : 'rgba(244,168,37,0.18)', textColor: '#C48A10' }, `+${quest.xp} XP`)
                  ),
                  React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 } }, quest.title),
                  React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: t.textMuted, lineHeight: 1.45 } }, quest.desc)
                ),
                completedQuests.has(quest.id)
                  ? React.createElement(window.lucide.CheckCircle, { size: 20, color: t.secondary })
                  : React.createElement(window.lucide.Circle, { size: 20, color: t.border })
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, color: t.textLight } },
                React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Users, { size: 11 }),
                  React.createElement('span', null, `${quest.scouts} scouts`)
                ),
                React.createElement('span', null, quest.timeLeft)
              )
            )
          ),

        activeTab === 'upcoming' && React.createElement('div', { style: { textAlign: 'center', paddingTop: 40, color: t.textLight, fontFamily: '"Source Sans 3", sans-serif', fontSize: 13 } }, 'New quests drop every Monday & Thursday')
      )
    );
  };

  // ─── ATLAS SCREEN ────────────────────────────────────────────────────────────
  const AtlasScreen = () => {
    const neighborhoods = ['All', 'Brooklyn', 'Queens', 'Manhattan', 'Bronx'];
    const discoveries = [
      { id: 'a1', name: 'Widow Jane Distillery', type: 'Artisan', desc: 'Hand-crafted bourbon with locally-sourced limestone water. Tours Saturday mornings.', neighborhood: 'Brooklyn', scout: 'Jamie L.', finds: 89, emoji: '🥃' },
      { id: 'a2', name: 'Sivasspor Baklavası', type: 'Heritage', desc: 'A Turkish family recipe unchanged for 60 years. Pistachio baklava from Gaziantep nuts.', neighborhood: 'Brooklyn', scout: 'Priya M.', finds: 134, emoji: '🍯' },
      { id: 'a3', name: "Tang's Hand-Pulled Noodles", type: 'Street Food', desc: 'Watch Mr. Tang hand-pull your noodles in under 3 minutes. Tue–Sun, 11am–3pm only.', neighborhood: 'Queens', scout: 'David C.', finds: 201, emoji: '🍜' },
      { id: 'a4', name: "Abuela Rosa's Tamales", type: 'Community', desc: 'Every Sunday at Red Hook Grain Terminal. Rosa has been here 22 years.', neighborhood: 'Brooklyn', scout: 'Maya K.', finds: 76, emoji: '🫔' },
      { id: 'a5', name: 'The Pickle Guys', type: 'Heritage', desc: 'One of the last open-barrel pickle vendors in New York. 20+ varieties at Essex Market.', neighborhood: 'Manhattan', scout: 'Carlos R.', finds: 312, emoji: '🥒' },
    ];
    const filtered = neighborhoodFilter === 'All' ? discoveries : discoveries.filter(d => d.neighborhood === neighborhoodFilter);

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      React.createElement('div', { style: { padding: '20px 24px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement(BackButton),
          React.createElement(ThemeToggle)
        ),

        // ASYMMETRIC featured discovery hero
        React.createElement('div', { style: { background: isDark ? '#1A3D28' : '#2D5A3D', borderRadius: 6, overflow: 'hidden', marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'stretch' } },
            React.createElement('div', { style: { flex: 1, padding: '18px 16px 18px 20px' } },
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(244,168,37,0.85)', textTransform: 'uppercase', marginBottom: 6 } }, 'DISCOVERY OF THE WEEK'),
              React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 23, fontWeight: 900, color: '#F5EDD6', lineHeight: 1.1, marginBottom: 8 } }, 'The Pickle\nGuys'),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: 'rgba(245,237,214,0.72)', lineHeight: 1.5 } }, "NYC's last open-barrel pickle vendor. A living piece of culinary heritage."),
              React.createElement('div', { style: { marginTop: 10, display: 'flex', alignItems: 'center', gap: 5 } },
                React.createElement(window.lucide.MapPin, { size: 12, color: '#F4A825' }),
                React.createElement('span', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: '#F4A825' } }, 'Essex Market, Manhattan')
              )
            ),
            // Right emoji panel — asymmetrically sized
            React.createElement('div', { style: { width: 94, background: 'rgba(244,168,37,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, flexShrink: 0 } }, '🥒')
          )
        )
      ),

      // Neighborhood filter
      React.createElement('div', { style: { paddingLeft: 24, paddingRight: 24, display: 'flex', gap: 7, overflowX: 'auto', marginBottom: 16 } },
        ...neighborhoods.map(n =>
          React.createElement('button', {
            key: n, onClick: () => setNeighborhoodFilter(n),
            style: {
              background: neighborhoodFilter === n ? t.primary : t.surface,
              border: `1px solid ${neighborhoodFilter === n ? t.primary : t.border}`,
              borderRadius: 20, padding: '6px 13px', cursor: 'pointer',
              fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, fontWeight: 500,
              color: neighborhoodFilter === n ? '#F5EDD6' : t.textMuted,
              whiteSpace: 'nowrap', transition: 'all 0.15s',
            }
          }, n)
        )
      ),

      // Discoveries
      React.createElement('div', { style: { padding: '0 24px 32px' } },
        ...filtered.map(item =>
          React.createElement('div', {
            key: item.id,
            style: { marginBottom: 12, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 4 }
          },
            React.createElement('div', { style: { padding: '13px' } },
              React.createElement('div', { style: { display: 'flex', gap: 11 } },
                React.createElement('div', { style: { width: 48, height: 48, background: t.bgAlt, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 } }, item.emoji),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                    React.createElement('div', null,
                      React.createElement(Tag, null, item.type),
                      React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 14, fontWeight: 700, color: t.text, marginTop: 4 } }, item.name)
                    ),
                    React.createElement('button', {
                      onClick: () => toggleLike(item.id),
                      style: { background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: likedItems.has(item.id) ? '#E05A5A' : t.textLight }
                    },
                      React.createElement(window.lucide.Heart, { size: 17, fill: likedItems.has(item.id) ? '#E05A5A' : 'none' })
                    )
                  ),
                  React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: t.textMuted, lineHeight: 1.45, marginTop: 4 } }, item.desc),
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 7, fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, color: t.textLight } },
                    React.createElement('span', null, `by ${item.scout} · ${item.neighborhood}`),
                    React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                      React.createElement(window.lucide.Bookmark, { size: 10 }),
                      React.createElement('span', null, `${item.finds} finds`)
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  };

  // ─── COMMUNITY SCREEN ────────────────────────────────────────────────────────
  const CommunityScreen = () => {
    const threads = [
      { id: 't1', title: 'Best dumpling spots for the Hidden Dumpling quest?', author: 'Maya K.', replies: 23, time: '1h ago', hot: true },
      { id: 't2', title: 'Anyone tried the saffron gelato at Fiore di Sicilia?', author: 'David C.', replies: 8, time: '3h ago', hot: false },
      { id: 't3', title: 'Group quest this Saturday — Canal Street night market', author: 'Carlos R.', replies: 41, time: '5h ago', hot: true },
      { id: 't4', title: 'Documenting fermented foods in Flushing — tips?', author: 'Priya M.', replies: 15, time: '8h ago', hot: false },
      { id: 't5', title: 'Streak tips for beginners — how I hit 30 days', author: 'Jamie L.', replies: 67, time: '1d ago', hot: true },
    ];

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      React.createElement('div', { style: { padding: '20px 24px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement(BackButton),
          React.createElement(ThemeToggle)
        ),
        React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 900, color: t.primary, lineHeight: 1.05 } }, 'Scout\nHangouts'),
        React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: t.textMuted, marginTop: 5, marginBottom: 14 } }, '12 scouts online now'),

        // Live banner
        React.createElement('div', { style: { background: isDark ? '#3A1C2E' : t.primary, borderRadius: 4, padding: '13px 15px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' } },
          React.createElement('div', { style: { width: 10, height: 10, background: '#4CAF50', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(76,175,80,0.28)', flexShrink: 0 } }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, fontWeight: 700, color: '#F4A825', letterSpacing: '0.06em' } }, 'LIVE QUEST — CANAL ST. MARKET'),
            React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: 'rgba(245,237,214,0.75)' } }, '14 scouts currently on this quest')
          ),
          React.createElement(window.lucide.ChevronRight, { size: 15, color: 'rgba(245,237,214,0.5)' })
        ),

        // Tabs
        React.createElement('div', { style: { display: 'flex', borderBottom: `2px solid ${t.border}`, marginBottom: 14 } },
          ...['trending', 'new', 'quests'].map(tab =>
            React.createElement('button', {
              key: tab, onClick: () => setCommunityTab(tab),
              style: {
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px',
                fontFamily: '"Source Sans 3", sans-serif', fontSize: 13,
                fontWeight: communityTab === tab ? 700 : 400,
                color: communityTab === tab ? t.primary : t.textMuted,
                borderBottom: communityTab === tab ? `2px solid ${t.primary}` : '2px solid transparent',
                marginBottom: -2, textTransform: 'capitalize',
              }
            }, React.createElement('span', null, tab))
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 24px 32px' } },
        ...threads.map(thread =>
          React.createElement('div', {
            key: thread.id,
            style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 4, padding: '13px', marginBottom: 9, cursor: 'pointer' }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { flex: 1 } },
                thread.hot && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 } },
                  React.createElement(window.lucide.Flame, { size: 11, color: '#F4A825' }),
                  React.createElement('span', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 9, fontWeight: 700, color: '#F4A825', letterSpacing: '0.1em' } }, 'HOT')
                ),
                React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.3 } }, thread.title),
                React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, color: t.textMuted, marginTop: 5, display: 'flex', gap: 7, alignItems: 'center' } },
                  React.createElement('span', null, thread.author),
                  React.createElement('span', null, '·'),
                  React.createElement('span', null, thread.time)
                )
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: t.textLight, flexShrink: 0, marginLeft: 10 } },
                React.createElement(window.lucide.MessageCircle, { size: 13 }),
                React.createElement('span', null, thread.replies)
              )
            )
          )
        ),
        React.createElement('button', {
          style: { width: '100%', background: 'none', border: `2px dashed ${t.border}`, borderRadius: 4, padding: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: t.textMuted, fontFamily: '"Source Sans 3", sans-serif', fontSize: 13 }
        },
          React.createElement(window.lucide.Plus, { size: 15 }),
          React.createElement('span', null, 'Start a discussion')
        )
      )
    );
  };

  // ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const badges = [
      { id: 'b1', name: 'First Find', icon: '🔍', earned: true },
      { id: 'b2', name: 'Street Scout', icon: '🌮', earned: true },
      { id: 'b3', name: 'Week Warrior', icon: '🔥', earned: true },
      { id: 'b4', name: 'Artisan Hunter', icon: '⚒️', earned: true },
      { id: 'b5', name: 'Atlas Builder', icon: '🗺️', earned: false },
      { id: 'b6', name: 'Grand Gourmet', icon: '👑', earned: false },
    ];
    const stats = [
      { label: 'Quests Done', val: '47' }, { label: 'Finds Added', val: '23' },
      { label: 'Best Streak', val: '18d' }, { label: 'Scout XP', val: '2,340' },
    ];

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      React.createElement('div', { style: { padding: '20px 24px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 } },
          React.createElement(BackButton),
          React.createElement(ThemeToggle)
        ),

        // Profile hero
        React.createElement('div', { style: { background: isDark ? '#3A1C2E' : t.primary, borderRadius: 6, padding: '20px', marginBottom: 18, position: 'relative', overflow: 'hidden' } },
          React.createElement('div', { style: { position: 'absolute', right: -16, top: -16, width: 110, height: 110, borderRadius: '50%', background: 'rgba(244,168,37,0.1)' } }),
          React.createElement('div', { style: { position: 'absolute', right: 14, bottom: -10, width: 70, height: 70, borderRadius: '50%', background: 'rgba(244,168,37,0.07)' } }),
          React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14, position: 'relative' } },
            React.createElement('div', { style: { width: 58, height: 58, background: '#F4A825', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#1A0A15' } }, 'M'),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 20, fontWeight: 700, color: '#F5EDD6' } }, 'Maya Kim'),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: 'rgba(245,237,214,0.65)' } }, 'Flavor Scout · Brooklyn'),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 } },
                React.createElement(window.lucide.Flame, { size: 14, color: '#F4A825' }),
                React.createElement('span', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 13, fontWeight: 700, color: '#F4A825' } }, '12 Day Streak')
              )
            )
          ),
          React.createElement('div', { style: { background: 'rgba(244,168,37,0.13)', border: '1px solid rgba(244,168,37,0.38)', borderRadius: 3, padding: '8px 13px', display: 'inline-flex', alignItems: 'center', gap: 7, position: 'relative' } },
            React.createElement(window.lucide.Award, { size: 15, color: '#F4A825' }),
            React.createElement('span', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 11, fontWeight: 700, color: '#F4A825' } }, 'ELITE SCOUT — RANK 42 in Brooklyn')
          )
        ),

        // Stats
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 18 } },
          ...stats.map(s =>
            React.createElement('div', { key: s.label, style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 4, padding: '10px 6px', textAlign: 'center' } },
              React.createElement('div', { style: { fontFamily: '"Playfair Display", serif', fontSize: 15, fontWeight: 700, color: t.primary } }, s.val),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 9, color: t.textMuted, marginTop: 2, lineHeight: 1.3 } }, s.label)
            )
          )
        ),

        // Badges
        React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 10 } }, 'BADGES'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, marginBottom: 22 } },
          ...badges.map(badge =>
            React.createElement('div', {
              key: badge.id,
              style: { background: badge.earned ? t.surface : t.bgAlt, border: `1px solid ${badge.earned ? t.secondary : t.border}`, borderRadius: 4, padding: '12px 8px', textAlign: 'center', opacity: badge.earned ? 1 : 0.48 }
            },
              React.createElement('div', { style: { fontSize: 24, marginBottom: 5 } }, badge.icon),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, fontWeight: badge.earned ? 700 : 400, color: badge.earned ? t.text : t.textLight, lineHeight: 1.2 } }, badge.name)
            )
          )
        ),

        // Recent activity
        React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 10 } }, 'RECENT ACTIVITY'),
        ...[
          { text: 'Completed "The Sichuan Pepper Trail"', time: '2 days ago', icon: 'CheckCircle', color: t.secondary },
          { text: "Added Grandma Liu's to the Atlas", time: '3 days ago', icon: 'MapPin', color: t.primary },
          { text: 'Earned "Street Scout" badge', time: '5 days ago', icon: 'Award', color: '#F4A825' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', gap: 11, alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none' }
          },
            React.createElement('div', { style: { color: item.color, width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide[item.icon], { size: 16 })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 12, color: t.text } }, item.text),
              React.createElement('div', { style: { fontFamily: '"Source Sans 3", sans-serif', fontSize: 10, color: t.textLight } }, item.time)
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 40 } })
    );
  };

  const screens = { home: HomeScreen, quests: QuestsScreen, atlas: AtlasScreen, community: CommunityScreen, profile: ProfileScreen };
  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' } },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      button { outline: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden',
        boxShadow: '0 28px 70px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.07)',
        position: 'relative', display: 'flex', flexDirection: 'column',
      }
    },
      React.createElement(CurrentScreen)
    )
  );
}
