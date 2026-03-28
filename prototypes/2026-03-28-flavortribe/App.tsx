// FlavorTribe - Celebrate local dishes, one streak at a time.
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [pressedTab, setPressedTab] = useState(null);

  const themes = {
    dark: {
      bg: '#0D0906',
      surface: '#1A1208',
      surfaceAlt: '#241A0E',
      card: '#2A1F12',
      cardBorder: '#3D2E1A',
      primary: '#FF6B35',
      primaryGlow: 'rgba(255, 107, 53, 0.3)',
      secondary: '#FFB800',
      accent: '#FF3D7F',
      text: '#F5EDE0',
      textSecondary: '#A89070',
      textMuted: '#6B5040',
      navBg: '#130E06',
      navBorder: '#2A1F12',
      streak: '#FF6B35',
      success: '#4CAF50',
      badge: '#FF3D7F',
    },
    light: {
      bg: '#FFF8F0',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF1E3',
      card: '#FFFFFF',
      cardBorder: '#F0E0CC',
      primary: '#E85520',
      primaryGlow: 'rgba(232, 85, 32, 0.2)',
      secondary: '#E09000',
      accent: '#E02060',
      text: '#1A0D00',
      textSecondary: '#6B4020',
      textMuted: '#B08060',
      navBg: '#FFFFFF',
      navBorder: '#F0E0CC',
      streak: '#E85520',
      success: '#2E7D32',
      badge: '#E02060',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 8px rgba(255, 107, 53, 0.4); }
        50% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.8); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes bounceIn {
        0% { transform: scale(0.8); opacity: 0; }
        60% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes flicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'missions', label: 'Missions', icon: window.lucide.Compass },
    { id: 'explore', label: 'Explore', icon: window.lucide.Map },
    { id: 'tribe', label: 'Tribe', icon: window.lucide.Users },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    missions: MissionsScreen,
    explore: ExploreScreen,
    tribe: TribeScreen,
    profile: ProfileScreen,
  };

  const outerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f0f0',
    fontFamily: "'Sora', sans-serif",
  };

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 48,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)',
  };

  const statusBarStyle = {
    height: 44,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingLeft: 24,
    paddingRight: 24,
    flexShrink: 0,
    zIndex: 100,
  };

  const diStyle = {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 120,
    height: 34,
    background: '#000',
    borderRadius: 20,
    zIndex: 200,
  };

  const contentStyle = {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  };

  const navStyle = {
    height: 80,
    background: t.navBg,
    borderTop: `1px solid ${t.navBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 12,
    paddingTop: 8,
    flexShrink: 0,
  };

  const navItemStyle = (id) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    cursor: 'pointer',
    padding: '4px 12px',
    borderRadius: 12,
    transition: 'all 0.2s ease',
    transform: pressedTab === id ? 'scale(0.9)' : 'scale(1)',
    color: activeTab === id ? t.primary : t.textMuted,
  });

  const labelStyle = (id) => ({
    fontSize: 10,
    fontWeight: activeTab === id ? 600 : 400,
    color: activeTab === id ? t.primary : t.textMuted,
    fontFamily: "'Sora', sans-serif",
  });

  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return React.createElement('div', { style: outerStyle },
    React.createElement('div', { style: phoneStyle },
      // Dynamic Island
      React.createElement('div', { style: diStyle }),

      // Status Bar
      React.createElement('div', { style: statusBarStyle },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Sora', sans-serif" } }, timeStr),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 1 } },
            React.createElement('div', { style: { width: 22, height: 11, border: `1.5px solid ${t.text}`, borderRadius: 3, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '1px' } },
              React.createElement('div', { style: { width: '75%', height: '100%', background: t.text, borderRadius: 1 } })
            )
          )
        )
      ),

      // Screen Content
      React.createElement('div', { style: contentStyle },
        React.createElement(screens[activeTab], { t, isDark, setIsDark })
      ),

      // Bottom Nav
      React.createElement('div', { style: navStyle },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          onMouseDown: () => setPressedTab(tab.id),
          onMouseUp: () => setPressedTab(null),
          style: navItemStyle(tab.id),
        },
          React.createElement('div', {
            style: {
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              background: activeTab === tab.id ? t.primaryGlow : 'transparent',
              transition: 'all 0.2s ease',
            }
          },
            React.createElement(tab.icon, { size: 20, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 })
          ),
          React.createElement('span', { style: labelStyle(tab.id) }, tab.label)
        ))
      )
    )
  );
}

// ─────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark }) {
  const [likedPosts, setLikedPosts] = useState({ 1: false, 2: false, 3: false });
  const [streakAnim, setStreakAnim] = useState(false);

  useEffect(() => {
    setTimeout(() => setStreakAnim(true), 300);
  }, []);

  const posts = [
    {
      id: 1,
      user: 'Maria C.',
      avatar: '👩🏽',
      location: 'Little Havana, Miami',
      time: '2h ago',
      dish: 'Ropa Vieja',
      image: '🥩',
      desc: 'My abuela\'s secret — add a splash of dry sherry before the last 20 min. Game changer.',
      likes: 142,
      comments: 28,
      tag: 'Heritage Recipe',
    },
    {
      id: 2,
      user: 'Jin Park',
      avatar: '🧑🏻',
      location: 'Koreatown, LA',
      time: '4h ago',
      dish: 'Doenjang Jjigae',
      image: '🫕',
      desc: 'Found aged doenjang paste at Lee\'s Market — this stew hits different with the real stuff.',
      likes: 89,
      comments: 15,
      tag: 'Ingredient Find',
    },
    {
      id: 3,
      user: 'Priya S.',
      avatar: '👩🏾',
      location: 'Devon Ave, Chicago',
      time: '6h ago',
      dish: 'Pani Puri',
      image: '🫙',
      desc: 'Hosted a neighborhood pani puri pop-up — 40 people, 6 different water flavors. Pure joy!',
      likes: 234,
      comments: 47,
      tag: 'Community Event',
    },
  ];

  const scrollStyle = {
    height: '100%',
    overflowY: 'auto',
    paddingBottom: 8,
    animation: 'fadeIn 0.3s ease',
  };

  const streakCardStyle = {
    margin: '12px 16px',
    background: `linear-gradient(135deg, ${t.primary} 0%, #FF3D7F 100%)`,
    borderRadius: 24,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    animation: streakAnim ? 'bounceIn 0.5s ease' : 'none',
  };

  return React.createElement('div', { style: scrollStyle },
    // Header
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px 12px' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 500 } }, 'Good evening 🌆'),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text } }, 'FlavorTribe')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
        React.createElement('div', { style: { width: 38, height: 38, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.cardBorder}` } },
          React.createElement(window.lucide.Bell, { size: 18, color: t.text }),
          React.createElement('div', { style: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: t.badge, borderRadius: 4 } })
        ),
        React.createElement('div', { style: { width: 38, height: 38, borderRadius: 12, background: '#FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 } }, '🧑🏽')
      )
    ),

    // Streak Card
    React.createElement('div', { style: streakCardStyle },
      React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: -30, left: 20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' } }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
            React.createElement('span', { style: { fontSize: 28 } }, '🔥'),
            React.createElement('span', { style: { fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1 } }, '23'),
          ),
          React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 } }, 'Day streak — keep it alive!'),
          React.createElement('div', { style: { marginTop: 12, display: 'flex', gap: 6 } },
            ['M','T','W','T','F','S','S'].map((d, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: i < 5 ? 'rgba(255,255,255,0.9)' : i === 5 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: i < 5 ? '#E85520' : 'rgba(255,255,255,0.7)',
                }
              }, i < 5 ? '✓' : d)
            )
          )
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: '8px 14px', textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: '#fff' } }, '#12'),
          React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 500 } }, 'TRIBE RANK')
        )
      )
    ),

    // Today's Mission Teaser
    React.createElement('div', { style: { margin: '4px 16px 8px', background: t.card, borderRadius: 20, padding: 16, border: `1px solid ${t.cardBorder}` } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: t.secondary + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 } }, '🎯'),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, "Today's Flavor Mission")
        ),
        React.createElement('div', { style: { background: t.secondary + '22', borderRadius: 8, padding: '3px 8px' } },
          React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.secondary } }, 'ACTIVE')
        )
      ),
      React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 4 } }, 'Hunt: Elote in your neighborhood'),
      React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, lineHeight: 1.5, marginBottom: 12 } }, 'Find a local vendor selling authentic Mexican street corn within 2 miles. Capture the story behind their cart.'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(window.lucide.Clock, { size: 12, color: t.textSecondary }),
            React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, '5h 32m left')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(window.lucide.Users, { size: 12, color: t.textSecondary }),
            React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, '847 exploring')
          )
        ),
        React.createElement('div', { style: { background: `linear-gradient(90deg, ${t.primary}, #FF3D7F)`, borderRadius: 10, padding: '6px 14px', cursor: 'pointer' } },
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: '#fff' } }, 'Accept →')
        )
      )
    ),

    // Feed
    React.createElement('div', { style: { padding: '4px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
      React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Neighborhood Feed'),
      React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all')
    ),

    ...posts.map(post =>
      React.createElement('div', {
        key: post.id,
        style: { margin: '0 16px 12px', background: t.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.cardBorder}` }
      },
        // Post header
        React.createElement('div', { style: { padding: '12px 14px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, post.avatar),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, post.user),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(window.lucide.MapPin, { size: 10, color: t.textSecondary }),
                React.createElement('span', { style: { fontSize: 10, color: t.textSecondary } }, post.location)
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, post.time),
            React.createElement('div', { style: { background: t.primary + '22', borderRadius: 6, padding: '2px 7px' } },
              React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: t.primary } }, post.tag.toUpperCase())
            )
          )
        ),

        // Dish visual
        React.createElement('div', {
          style: {
            margin: '0 14px',
            height: 120,
            borderRadius: 14,
            background: isDark ? 'linear-gradient(135deg, #2A1F12, #3D2E1A)' : 'linear-gradient(135deg, #FFF1E3, #FFE0C0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 60,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          React.createElement('span', null, post.image),
          React.createElement('div', { style: { position: 'absolute', bottom: 8, left: 10, background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '3px 9px' } },
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: '#fff' } }, post.dish)
          )
        ),

        // Post content
        React.createElement('div', { style: { padding: '10px 14px 12px' } },
          React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, lineHeight: 1.5, marginBottom: 10 } }, post.desc),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' },
              onClick: () => setLikedPosts(prev => ({ ...prev, [post.id]: !prev[post.id] }))
            },
              React.createElement(window.lucide.Heart, {
                size: 16,
                color: likedPosts[post.id] ? '#FF3D7F' : t.textMuted,
                fill: likedPosts[post.id] ? '#FF3D7F' : 'none'
              }),
              React.createElement('span', { style: { fontSize: 12, color: likedPosts[post.id] ? '#FF3D7F' : t.textMuted, fontWeight: 500 } },
                post.likes + (likedPosts[post.id] ? 1 : 0)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement(window.lucide.MessageCircle, { size: 16, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, post.comments)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' } },
              React.createElement(window.lucide.Share2, { size: 16, color: t.textMuted })
            )
          )
        )
      )
    )
  );
}

// ─────────────────────────────────────────
// MISSIONS SCREEN
// ─────────────────────────────────────────
function MissionsScreen({ t }) {
  const [activeMission, setActiveMission] = useState(0);

  const missions = [
    {
      id: 0,
      emoji: '🌽',
      title: 'Street Corn Trail',
      neighborhood: 'Pilsen, Chicago',
      difficulty: 'Easy',
      diffColor: '#4CAF50',
      points: 150,
      deadline: '2 days',
      participants: 1243,
      progress: 68,
      steps: ['Find a local elote cart', 'Buy and photograph', 'Share the vendor story', 'Post your review'],
      completed: [true, true, false, false],
      desc: 'Explore the vibrant street food culture of your neighborhood. Discover 3 local elote vendors and document their unique family recipes and stories.',
    },
    {
      id: 1,
      emoji: '🍜',
      title: 'Ramen Underground',
      neighborhood: 'Japantown, SF',
      difficulty: 'Medium',
      diffColor: '#FFB800',
      points: 280,
      deadline: '5 days',
      participants: 876,
      progress: 30,
      steps: ['Visit hidden ramen spot', 'Order chef\'s special', 'Learn broth secret', 'Create your version'],
      completed: [true, false, false, false],
      desc: 'Uncover off-menu ramen specials only locals know about. Document the 12-hour broth process and share the generational recipe passed down in your community.',
    },
    {
      id: 2,
      emoji: '🫓',
      title: 'Injera Origin Quest',
      neighborhood: 'Little Ethiopia, DC',
      difficulty: 'Hard',
      diffColor: '#FF6B35',
      points: 420,
      deadline: '7 days',
      participants: 432,
      progress: 15,
      steps: ['Source teff flour locally', 'Ferment for 3 days', 'Cook with community elder', 'Host tasting event'],
      completed: [false, false, false, false],
      desc: 'Master the ancient art of injera-making with guidance from Ethiopian community elders. Source authentic teff flour and host a neighborhood tasting ceremony.',
    },
  ];

  const scrollStyle = { height: '100%', overflowY: 'auto', paddingBottom: 8, animation: 'fadeIn 0.3s ease' };

  return React.createElement('div', { style: scrollStyle },
    // Header
    React.createElement('div', { style: { padding: '8px 20px 16px' } },
      React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 500, marginBottom: 2 } }, 'Week 13 · March 2026'),
      React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text } }, 'Flavor Missions'),
    ),

    // Active mission hero
    React.createElement('div', { style: { margin: '0 16px 16px' } },
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #1A0D00, #3D2000)`,
          borderRadius: 24,
          padding: 20,
          border: `1px solid ${t.primary}44`,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -15, right: -15, fontSize: 80, opacity: 0.15 } }, missions[activeMission].emoji),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
          React.createElement('div', { style: { background: missions[activeMission].diffColor + '22', borderRadius: 8, padding: '3px 10px' } },
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: missions[activeMission].diffColor } }, missions[activeMission].difficulty.toUpperCase())
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(window.lucide.Star, { size: 12, color: t.secondary, fill: t.secondary }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.secondary } }, `+${missions[activeMission].points} pts`)
          )
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 } }, missions[activeMission].title),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 } },
          React.createElement(window.lucide.MapPin, { size: 11, color: t.textSecondary }),
          React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, missions[activeMission].neighborhood)
        ),
        React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 14 } }, missions[activeMission].desc),

        // Progress
        React.createElement('div', { style: { marginBottom: 14 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, 'Community Progress'),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.primary } }, `${missions[activeMission].progress}%`)
          ),
          React.createElement('div', { style: { height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 } },
            React.createElement('div', {
              style: {
                height: '100%',
                width: `${missions[activeMission].progress}%`,
                background: `linear-gradient(90deg, ${t.primary}, #FF3D7F)`,
                borderRadius: 3,
                transition: 'width 0.8s ease',
              }
            })
          )
        ),

        // Steps
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 } },
          missions[activeMission].steps.map((step, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', gap: 10 }
            },
              React.createElement('div', {
                style: {
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: missions[activeMission].completed[i] ? t.primary : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  color: missions[activeMission].completed[i] ? '#fff' : 'rgba(255,255,255,0.4)',
                }
              }, missions[activeMission].completed[i] ? '✓' : i + 1),
              React.createElement('span', {
                style: {
                  fontSize: 12,
                  color: missions[activeMission].completed[i] ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
                  fontWeight: missions[activeMission].completed[i] ? 600 : 400,
                  textDecoration: missions[activeMission].completed[i] ? 'line-through' : 'none',
                }
              }, step)
            )
          )
        ),

        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('div', {
            style: {
              flex: 1,
              background: `linear-gradient(90deg, ${t.primary}, #FF3D7F)`,
              borderRadius: 12,
              padding: '10px',
              textAlign: 'center',
              cursor: 'pointer',
            }
          },
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Continue Mission')
          ),
          React.createElement('div', { style: { width: 42, height: 42, background: 'rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
            React.createElement(window.lucide.Share2, { size: 18, color: '#fff' })
          )
        )
      )
    ),

    // Mission selector
    React.createElement('div', { style: { padding: '0 16px', marginBottom: 6 } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'All Missions')
    ),
    React.createElement('div', { style: { display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' } },
      missions.map(m =>
        React.createElement('div', {
          key: m.id,
          onClick: () => setActiveMission(m.id),
          style: {
            minWidth: 140,
            background: activeMission === m.id ? t.primary + '22' : t.card,
            border: `1.5px solid ${activeMission === m.id ? t.primary : t.cardBorder}`,
            borderRadius: 16,
            padding: 12,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 6 } }, m.emoji),
          React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 3 } }, m.title),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(window.lucide.Clock, { size: 10, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, m.deadline)
          )
        )
      )
    )
  );
}

// ─────────────────────────────────────────
// EXPLORE SCREEN
// ─────────────────────────────────────────
function ExploreScreen({ t }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Nearby', 'Events', 'Ingredients', 'Hidden Gems'];

  const spots = [
    { emoji: '🌮', name: "Señora Rosa's Taquería", category: 'Mexican Street Food', distance: '0.3 mi', rating: 4.9, reviews: 234, tag: 'Hidden Gem', open: true },
    { emoji: '🥘', name: 'Pho Long Family Kitchen', category: 'Vietnamese Heritage', distance: '0.7 mi', rating: 4.8, reviews: 189, tag: 'Community Fave', open: true },
    { emoji: '🫔', name: 'Arepa Express Cart', category: 'Venezuelan Street Food', distance: '1.2 mi', rating: 4.7, reviews: 112, tag: 'New Discovery', open: false },
  ];

  const events = [
    { emoji: '🎉', title: 'Dumpling-Making with Grandma Liu', time: 'Today 6 PM', location: 'Chinatown Community Center', spots: 8 },
    { emoji: '🌶️', title: 'Pepper Varieties Flash Hunt', time: 'Sat 10 AM', location: 'Eastern Market', spots: 24 },
  ];

  const scrollStyle = { height: '100%', overflowY: 'auto', paddingBottom: 8, animation: 'fadeIn 0.3s ease' };

  return React.createElement('div', { style: scrollStyle },
    // Header + Search
    React.createElement('div', { style: { padding: '8px 20px 12px' } },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Explore'),
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: t.surfaceAlt,
          borderRadius: 14,
          padding: '10px 14px',
          border: `1px solid ${t.cardBorder}`,
        }
      },
        React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
        React.createElement('span', { style: { fontSize: 13, color: t.textMuted } }, 'Find local dishes, spots, ingredients...')
      )
    ),

    // Filters
    React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto', marginBottom: 16 } },
      filters.map(f =>
        React.createElement('div', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            padding: '7px 14px',
            borderRadius: 20,
            background: activeFilter === f ? t.primary : t.surfaceAlt,
            border: `1px solid ${activeFilter === f ? t.primary : t.cardBorder}`,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: 12,
            fontWeight: activeFilter === f ? 600 : 400,
            color: activeFilter === f ? '#fff' : t.textSecondary,
            transition: 'all 0.2s ease',
          }
        }, f)
      )
    ),

    // Map placeholder
    React.createElement('div', { style: { margin: '0 16px 16px' } },
      React.createElement('div', {
        style: {
          height: 140,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${t.surfaceAlt}, ${t.card})`,
          border: `1px solid ${t.cardBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, #FF6B35 1px, transparent 1px)', backgroundSize: '24px 24px' } }),
        React.createElement('div', { style: { textAlign: 'center', zIndex: 1 } },
          React.createElement('div', { style: { fontSize: 32, marginBottom: 6 } }, '🗺️'),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, 'Live Flavor Map'),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary } }, '47 active spots near you'),
        ),
        // Dot markers
        ...[
          { top: '30%', left: '20%', color: '#FF6B35' },
          { top: '55%', left: '45%', color: '#FF3D7F' },
          { top: '25%', left: '70%', color: '#FFB800' },
          { top: '65%', left: '75%', color: '#4CAF50' },
        ].map((dot, i) =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute',
              top: dot.top,
              left: dot.left,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: dot.color,
              boxShadow: `0 0 8px ${dot.color}`,
              animation: 'pulseGlow 2s infinite',
              animationDelay: `${i * 0.5}s`,
            }
          })
        )
      )
    ),

    // Nearby Spots
    React.createElement('div', { style: { padding: '0 16px', marginBottom: 10 } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 } }, '🏪 Nearby Spots'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        spots.map((spot, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.card, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.cardBorder}`, display: 'flex', gap: 12, alignItems: 'center' }
          },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 } }, spot.emoji),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 } }, spot.name),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 } },
                  React.createElement(window.lucide.Star, { size: 10, color: t.secondary, fill: t.secondary }),
                  React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.secondary } }, spot.rating)
                )
              ),
              React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginBottom: 6 } }, spot.category),
              React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                React.createElement('div', { style: { background: t.primary + '22', borderRadius: 6, padding: '2px 7px' } },
                  React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: t.primary } }, spot.tag.toUpperCase())
                ),
                React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, spot.distance),
                React.createElement('div', { style: { width: 6, height: 6, borderRadius: 3, background: spot.open ? '#4CAF50' : t.textMuted, marginLeft: 'auto' } }),
                React.createElement('span', { style: { fontSize: 10, color: spot.open ? '#4CAF50' : t.textMuted } }, spot.open ? 'Open' : 'Closed')
              )
            )
          )
        )
      )
    ),

    // Flash Events
    React.createElement('div', { style: { padding: '0 16px', marginBottom: 8 } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 } }, '⚡ Flash Events'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        events.map((ev, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: `linear-gradient(135deg, ${t.card}, ${t.surfaceAlt})`,
              borderRadius: 16,
              padding: 14,
              border: `1px solid ${t.cardBorder}`,
              display: 'flex',
              gap: 12,
            }
          },
            React.createElement('div', { style: { fontSize: 28, flexShrink: 0 } }, ev.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3 } }, ev.title),
              React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginBottom: 6 } }, `${ev.time} · ${ev.location}`),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, `${ev.spots} spots left`),
                React.createElement('div', { style: { background: t.primary, borderRadius: 8, padding: '4px 10px', cursor: 'pointer' } },
                  React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#fff' } }, 'Join')
                )
              )
            )
          )
        )
      )
    )
  );
}

// ─────────────────────────────────────────
// TRIBE SCREEN
// ─────────────────────────────────────────
function TribeScreen({ t }) {
  const [activeLeague, setActiveLeague] = useState('neighborhood');

  const leagues = [
    { id: 'neighborhood', label: 'Neighborhood' },
    { id: 'city', label: 'City' },
    { id: 'global', label: 'Global' },
  ];

  const leaderboardData = {
    neighborhood: [
      { rank: 1, name: 'Maria C.', avatar: '👩🏽', neighborhood: 'Little Havana', streak: 47, points: 3420, badge: '🏆', you: false },
      { rank: 2, name: 'Jin Park', avatar: '🧑🏻', neighborhood: 'Koreatown', streak: 39, points: 2890, badge: '🥈', you: false },
      { rank: 3, name: 'You', avatar: '🧑🏽', neighborhood: 'Pilsen', streak: 23, points: 1840, badge: '🥉', you: true },
      { rank: 4, name: 'Priya S.', avatar: '👩🏾', neighborhood: 'Devon Ave', streak: 18, points: 1620, badge: '', you: false },
      { rank: 5, name: 'Carlos M.', avatar: '🧑🏻', neighborhood: 'Boyle Heights', streak: 15, points: 1340, badge: '', you: false },
    ],
    city: [
      { rank: 1, name: 'Yuki T.', avatar: '👩🏻', neighborhood: 'Logan Sq', streak: 62, points: 5200, badge: '🏆', you: false },
      { rank: 2, name: 'DeShawn W.', avatar: '🧑🏿', neighborhood: 'Bronzeville', streak: 55, points: 4780, badge: '🥈', you: false },
      { rank: 3, name: 'Ana G.', avatar: '👩🏽', neighborhood: 'Pilsen', streak: 48, points: 4100, badge: '🥉', you: false },
    ],
    global: [
      { rank: 1, name: 'Meera K.', avatar: '👩🏾', neighborhood: 'Mumbai Central', streak: 112, points: 9800, badge: '🏆', you: false },
      { rank: 2, name: 'Takeshi H.', avatar: '🧑🏻', neighborhood: 'Shibuya, Tokyo', streak: 98, points: 8740, badge: '🥈', you: false },
      { rank: 3, name: 'Emre A.', avatar: '🧑🏻', neighborhood: 'Beyoğlu, Istanbul', streak: 87, points: 7920, badge: '🥉', you: false },
    ],
  };

  const tribeMembers = [
    { name: 'Maria', avatar: '👩🏽', streak: 47, active: true },
    { name: 'Jin', avatar: '🧑🏻', streak: 39, active: true },
    { name: 'Priya', avatar: '👩🏾', streak: 18, active: false },
    { name: 'Carlos', avatar: '🧑🏻', streak: 15, active: true },
    { name: 'Sofia', avatar: '👩🏻', streak: 11, active: false },
  ];

  const scrollStyle = { height: '100%', overflowY: 'auto', paddingBottom: 8, animation: 'fadeIn 0.3s ease' };

  return React.createElement('div', { style: scrollStyle },
    // Header
    React.createElement('div', { style: { padding: '8px 20px 16px' } },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text } }, 'The Tribe'),
    ),

    // Your Tribe
    React.createElement('div', { style: { margin: '0 16px 16px', background: t.card, borderRadius: 20, padding: 16, border: `1px solid ${t.cardBorder}` } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, '🫂 Pilsen Flavor Crew'),
        React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600 } }, 'Invite +')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 14, overflowX: 'auto' } },
        tribeMembers.map((m, i) =>
          React.createElement('div', { key: i, style: { textAlign: 'center', flexShrink: 0 } },
            React.createElement('div', { style: { position: 'relative', marginBottom: 4 } },
              React.createElement('div', {
                style: {
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: t.surfaceAlt,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  border: `2px solid ${m.active ? t.primary : t.cardBorder}`,
                }
              }, m.avatar),
              m.active && React.createElement('div', {
                style: { position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#4CAF50', border: `2px solid ${t.card}` }
              })
            ),
            React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.text } }, m.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 } },
              React.createElement('span', { style: { fontSize: 9 } }, '🔥'),
              React.createElement('span', { style: { fontSize: 9, color: t.primary, fontWeight: 700 } }, m.streak)
            )
          )
        ),
        React.createElement('div', { style: { textAlign: 'center', flexShrink: 0 } },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 14,
              background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px dashed ${t.cardBorder}`,
            }
          },
            React.createElement(window.lucide.Plus, { size: 16, color: t.textMuted })
          )
        )
      )
    ),

    // Leaderboard
    React.createElement('div', { style: { margin: '0 16px' } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, '🏅 Leaderboard'),
      // League selector
      React.createElement('div', { style: { display: 'flex', background: t.surfaceAlt, borderRadius: 12, padding: 4, marginBottom: 14 } },
        leagues.map(l =>
          React.createElement('div', {
            key: l.id,
            onClick: () => setActiveLeague(l.id),
            style: {
              flex: 1,
              padding: '7px',
              textAlign: 'center',
              borderRadius: 9,
              background: activeLeague === l.id ? t.primary : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: 12,
              fontWeight: 600,
              color: activeLeague === l.id ? '#fff' : t.textSecondary,
            }
          }, l.label)
        )
      ),

      // Leaderboard list
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        leaderboardData[activeLeague].map((entry, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: entry.you ? t.primary + '18' : t.card,
              border: `1.5px solid ${entry.you ? t.primary : t.cardBorder}`,
              borderRadius: 16,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }
          },
            React.createElement('div', { style: { width: 28, textAlign: 'center', fontSize: entry.badge ? 18 : 14, fontWeight: 700, color: t.textSecondary } },
              entry.badge || `#${entry.rank}`
            ),
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, entry.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: entry.you ? 700 : 600, color: entry.you ? t.primary : t.text } }, `${entry.name}${entry.you ? ' (You)' : ''}`),
              React.createElement('div', { style: { fontSize: 10, color: t.textSecondary } }, entry.neighborhood)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' } },
                React.createElement('span', { style: { fontSize: 12 } }, '🔥'),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.streak } }, entry.streak)
              ),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, `${entry.points.toLocaleString()} pts`)
            )
          )
        )
      )
    )
  );
}

// ─────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark }) {
  const [notifs, setNotifs] = useState(true);
  const [location, setLocation] = useState(true);

  const badges = [
    { emoji: '🔥', label: 'Hot Streak', desc: '30+ days' },
    { emoji: '🗺️', label: 'Explorer', desc: '10 missions' },
    { emoji: '🌮', label: 'Taco Master', desc: 'Street Food' },
    { emoji: '👑', label: 'Tribe Leader', desc: 'Top 10%' },
    { emoji: '📸', label: 'Food Journo', desc: '50+ posts' },
    { emoji: '🌶️', label: 'Spice Hunter', desc: 'Ingredient Quest' },
  ];

  const stats = [
    { value: '23', label: 'Day Streak' },
    { value: '847', label: 'Flavor Points' },
    { value: '36', label: 'Posts' },
    { value: '12', label: 'Tribe Rank' },
  ];

  const scrollStyle = { height: '100%', overflowY: 'auto', paddingBottom: 8, animation: 'fadeIn 0.3s ease' };

  const Toggle = ({ value, onChange }) =>
    React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 44,
        height: 26,
        borderRadius: 13,
        background: value ? t.primary : t.surfaceAlt,
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        border: `1px solid ${value ? t.primary : t.cardBorder}`,
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 3,
          left: value ? 20 : 3,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.3s ease',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }
      })
    );

  return React.createElement('div', { style: scrollStyle },
    // Hero
    React.createElement('div', {
      style: {
        background: `linear-gradient(180deg, ${t.primary}33 0%, transparent 100%)`,
        padding: '16px 20px 20px',
        marginBottom: 4,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'My Profile'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('div', { style: { width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${t.cardBorder}` } },
            React.createElement(window.lucide.Settings, { size: 16, color: t.textSecondary })
          ),
          React.createElement('div', { style: { width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${t.cardBorder}` } },
            React.createElement(window.lucide.Share2, { size: 16, color: t.textSecondary })
          )
        )
      ),

      React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
        React.createElement('div', {
          style: {
            width: 72,
            height: 72,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${t.primary}, #FF3D7F)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            border: `3px solid ${t.primary}`,
          }
        }, '🧑🏽'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Alex Rivera'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 } },
            React.createElement(window.lucide.MapPin, { size: 11, color: t.textSecondary }),
            React.createElement('span', { style: { fontSize: 12, color: t.textSecondary } }, 'Pilsen, Chicago')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6 } },
            React.createElement('div', { style: { background: t.primary + '22', borderRadius: 6, padding: '2px 8px' } },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.primary } }, '🔥 23-DAY STREAK')
            ),
            React.createElement('div', { style: { background: t.secondary + '22', borderRadius: 6, padding: '2px 8px' } },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.secondary } }, '⭐ LEVEL 7')
            )
          )
        )
      )
    ),

    // Stats
    React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 } },
      stats.map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            flex: 1,
            background: t.card,
            borderRadius: 14,
            padding: '10px 8px',
            textAlign: 'center',
            border: `1px solid ${t.cardBorder}`,
          }
        },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.primary } }, s.value),
          React.createElement('div', { style: { fontSize: 9, fontWeight: 500, color: t.textMuted } }, s.label.toUpperCase())
        )
      )
    ),

    // Badges
    React.createElement('div', { style: { padding: '0 16px', marginBottom: 16 } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 } }, '🏅 Earned Badges'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 } },
        badges.map((b, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card,
              borderRadius: 14,
              padding: '10px 8px',
              textAlign: 'center',
              border: `1px solid ${t.cardBorder}`,
            }
          },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, b.emoji),
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: t.text, marginBottom: 1 } }, b.label),
            React.createElement('div', { style: { fontSize: 9, color: t.textMuted } }, b.desc)
          )
        )
      )
    ),

    // Settings
    React.createElement('div', { style: { padding: '0 16px', marginBottom: 8 } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 } }, '⚙️ Settings'),
      React.createElement('div', { style: { background: t.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.cardBorder}` } },
        // Dark mode toggle
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${t.cardBorder}` }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: isDark ? '#1A1A3A' : '#FFF8E0', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 16, color: isDark ? '#6B8AFF' : '#FFB800' })
            ),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: t.text } }, isDark ? 'Dark Mode' : 'Light Mode')
          ),
          React.createElement(Toggle, { value: isDark, onChange: setIsDark })
        ),
        // Notifications
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${t.cardBorder}` }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.primary + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide.Bell, { size: 16, color: t.primary })
            ),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: t.text } }, 'Streak Reminders')
          ),
          React.createElement(Toggle, { value: notifs, onChange: setNotifs })
        ),
        // Location
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: '#4CAF5022', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide.MapPin, { size: 16, color: '#4CAF50' })
            ),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: t.text } }, 'Location for Hunts')
          ),
          React.createElement(Toggle, { value: location, onChange: setLocation })
        )
      )
    )
  );
}
