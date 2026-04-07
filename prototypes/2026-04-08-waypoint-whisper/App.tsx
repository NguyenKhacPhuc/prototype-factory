const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [completedWaypoints, setCompletedWaypoints] = useState([0, 2]);
  const [havenLevel, setHavenLevel] = useState(3);
  const [activeWaypoint, setActiveWaypoint] = useState(null);
  const [showWaypointDetail, setShowWaypointDetail] = useState(false);
  const [journalExpanded, setJournalExpanded] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);

  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [activeScreen]);

  useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        setRecordingProgress(p => {
          if (p >= 100) { setRecording(false); return 0; }
          return p + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [recording]);

  const themes = {
    dark: {
      bg: '#0B1A2B',
      surface: '#122337',
      surfaceAlt: '#1A2E45',
      card: '#163050',
      text: '#F0F9FF',
      textSecondary: '#94B8D4',
      textMuted: '#5A8AAF',
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      cta: '#F97316',
      ctaHover: '#FB923C',
      border: '#1E3A54',
      navBg: '#0D1F33',
      overlay: 'rgba(11,26,43,0.85)',
      shadow: 'rgba(0,0,0,0.4)',
      gradient1: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
      gradient3: 'linear-gradient(180deg, #0B1A2B 0%, #122337 100%)',
    },
    light: {
      bg: '#F0F9FF',
      surface: '#FFFFFF',
      surfaceAlt: '#E8F4FD',
      card: '#FFFFFF',
      text: '#0B1A2B',
      textSecondary: '#4A6A82',
      textMuted: '#7A9AB5',
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      cta: '#F97316',
      ctaHover: '#FB923C',
      border: '#D4E8F5',
      navBg: '#FFFFFF',
      overlay: 'rgba(240,249,255,0.9)',
      shadow: 'rgba(14,165,233,0.1)',
      gradient1: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
      gradient3: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const MapPin = window.lucide.MapPin;
  const Compass = window.lucide.Compass;
  const Home = window.lucide.Home;
  const BookOpen = window.lucide.BookOpen;
  const User = window.lucide.User;
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const ChevronRight = window.lucide.ChevronRight;
  const Check = window.lucide.Check;
  const Lock = window.lucide.Lock;
  const Volume2 = window.lucide.Volume2;
  const Mic = window.lucide.Mic;
  const Heart = window.lucide.Heart;
  const Star = window.lucide.Star;
  const Trophy = window.lucide.Trophy;
  const TreePine = window.lucide.TreePine;
  const Waves = window.lucide.Waves;
  const Wind = window.lucide.Wind;
  const Mountain = window.lucide.Mountain;
  const Flower2 = window.lucide.Flower2;
  const Sparkles = window.lucide.Sparkles;
  const Clock = window.lucide.Clock;
  const Users = window.lucide.Users;
  const Camera = window.lucide.Camera;
  const PenLine = window.lucide.PenLine;
  const Play = window.lucide.Play;
  const Pause = window.lucide.Pause;
  const Settings = window.lucide.Settings;
  const Bell = window.lucide.Bell;
  const ArrowLeft = window.lucide.ArrowLeft;
  const X = window.lucide.X;
  const Plus = window.lucide.Plus;
  const Droplets = window.lucide.Droplets;
  const Eye = window.lucide.Eye;

  const styleTag = React.createElement('style', null, `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(14,165,233,0.3); }
      50% { box-shadow: 0 0 40px rgba(14,165,233,0.6); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.08); opacity: 1; }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes recordPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    * { -webkit-tap-highlight-color: transparent; }
    *::-webkit-scrollbar { display: none; }
  `);

  const waypoints = [
    { id: 0, title: 'Garden Serenity', desc: 'Find a quiet garden corner and observe the interplay of light and shadow for 5 minutes.', icon: Flower2, location: 'Kyoto Imperial Gardens', duration: '5 min', xp: 25, element: 'Cherry Blossom Tree' },
    { id: 1, title: 'Water Reflection', desc: 'Sit beside a still body of water. Focus on the reflections and let your thoughts settle.', icon: Droplets, location: 'Philosopher\'s Path Canal', duration: '7 min', xp: 30, element: 'Koi Pond' },
    { id: 2, title: 'Forest Bathing', desc: 'Walk slowly through a wooded area, engaging all five senses with each step.', icon: TreePine, location: 'Arashiyama Bamboo Grove', duration: '10 min', xp: 40, element: 'Bamboo Pavilion' },
    { id: 3, title: 'Wind Listening', desc: 'Find an elevated spot and close your eyes. Listen to the wind carry sounds from the distance.', icon: Wind, location: 'Fushimi Inari Summit', duration: '5 min', xp: 20, element: 'Wind Chimes' },
    { id: 4, title: 'Stone Grounding', desc: 'Touch cool stone architecture. Feel its permanence and let it anchor your presence.', icon: Mountain, location: 'Kiyomizu-dera Temple', duration: '8 min', xp: 35, element: 'Stone Lantern' },
    { id: 5, title: 'Market Harmony', desc: 'Observe the rhythmic flow of a busy market without engaging. Find calm in the movement.', icon: Eye, location: 'Nishiki Market', duration: '6 min', xp: 25, element: 'Tea House' },
  ];

  const journalEntries = [
    { id: 1, user: 'Mia', avatar: 'M', date: 'Today, 3:42 PM', waypoint: 'Garden Serenity', text: 'The light through the maple leaves created the most incredible dappled pattern. I felt completely at peace for the first time this trip.', mood: 'Peaceful', color: '#0EA5E9' },
    { id: 2, user: 'Alex', avatar: 'A', date: 'Today, 1:15 PM', waypoint: 'Forest Bathing', text: 'The bamboo creaking in the wind sounded like a conversation. Captured the most amazing ambient recording for our haven.', mood: 'Inspired', color: '#38BDF8' },
    { id: 3, user: 'Jordan', avatar: 'J', date: 'Yesterday', waypoint: 'Water Reflection', text: 'Watched a heron stand perfectly still for almost ten minutes. Sometimes the best company is shared silence.', mood: 'Contemplative', color: '#F97316' },
  ];

  const soundscapes = [
    { name: 'Bamboo Wind', location: 'Arashiyama', duration: '2:34', active: true },
    { name: 'Temple Bells', location: 'Kiyomizu-dera', duration: '1:48', active: false },
    { name: 'Garden Stream', location: 'Imperial Gardens', duration: '3:12', active: false },
  ];

  const ritualLore = [
    { title: 'Shinrin-yoku Origins', desc: 'The Japanese practice of forest bathing, developed in the 1980s as a form of nature therapy.', unlocked: true },
    { title: 'Wabi-Sabi Philosophy', desc: 'Finding beauty in imperfection and transience, a core aesthetic of Japanese culture.', unlocked: true },
    { title: 'Tea Ceremony Mindfulness', desc: 'Chado: The way of tea as a meditative practice of presence and respect.', unlocked: false },
    { title: 'Zen Garden Design', desc: 'Karesansui: Dry landscape gardens designed for contemplation and meditation.', unlocked: false },
  ];

  function HomeScreen() {
    const completedCount = completedWaypoints.length;
    const totalXP = completedWaypoints.reduce((sum, id) => sum + waypoints[id].xp, 0);

    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.textMuted, fontFamily: font, marginBottom: 4 } }, 'Good afternoon'),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Kyoto Journey')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }
          }, React.createElement(isDark ? Sun : Moon, { size: 18, color: t.textSecondary })),
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 20, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: font }
          }, 'S')
        )
      ),

      // Group card
      React.createElement('div', {
        style: {
          background: t.gradient1, borderRadius: 20, padding: '20px', marginBottom: 20,
          animation: 'fadeInUp 0.5s ease', position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)', animation: 'breathe 4s ease infinite' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, right: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.07)', animation: 'breathe 5s ease infinite 1s' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative' } },
          React.createElement(Users, { size: 16, color: 'rgba(255,255,255,0.9)' }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontFamily: font } }, 'Traveling with Mia, Alex & Jordan')
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: font, letterSpacing: -0.5, marginBottom: 6, position: 'relative' } }, 'Haven Level ' + havenLevel),
        React.createElement('div', { style: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontFamily: font, marginBottom: 14, position: 'relative' } }, totalXP + ' XP earned \u00B7 ' + completedCount + ' waypoints complete'),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 6, height: 8, overflow: 'hidden', position: 'relative' } },
          React.createElement('div', { style: { width: (completedCount / waypoints.length * 100) + '%', height: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 6, transition: 'width 0.6s ease' } })
        )
      ),

      // Next waypoint
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12, animation: 'fadeInUp 0.5s ease 0.1s both' } }, 'Next Wellness Waypoint'),
      React.createElement('button', {
        onClick: () => { setActiveWaypoint(waypoints.find(w => !completedWaypoints.includes(w.id))); setShowWaypointDetail(true); },
        style: {
          width: '100%', background: t.card, borderRadius: 16, padding: '18px', border: `1px solid ${t.border}`,
          cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', marginBottom: 20,
          boxShadow: `0 4px 20px ${t.shadow}`, animation: 'fadeInUp 0.5s ease 0.15s both'
        }
      },
        (() => {
          const next = waypoints.find(w => !completedWaypoints.includes(w.id));
          if (!next) return React.createElement('span', { style: { color: t.text, fontFamily: font } }, 'All waypoints complete!');
          const Icon = next.icon;
          return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 14, background: isDark ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float 3s ease infinite' } },
              React.createElement(Icon, { size: 24, color: t.primary })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 3 } }, next.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(MapPin, { size: 12, color: t.textMuted }),
                next.location
              )
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font } }, '+' + next.xp + ' XP'),
              React.createElement(ChevronRight, { size: 18, color: t.textMuted })
            )
          );
        })()
      ),

      // Recent Activity
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12, animation: 'fadeInUp 0.5s ease 0.2s both' } }, 'Recent Activity'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeInUp 0.5s ease 0.25s both' } },
        journalEntries.slice(0, 2).map((entry, i) =>
          React.createElement('div', {
            key: entry.id,
            style: { background: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.border}`, transition: 'all 0.2s', animation: `slideInRight 0.4s ease ${0.3 + i * 0.1}s both` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 16, background: entry.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: font } }, entry.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, entry.user),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, entry.date)
              ),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 500, color: entry.color, fontFamily: font, background: isDark ? 'rgba(14,165,233,0.1)' : 'rgba(14,165,233,0.08)', padding: '3px 8px', borderRadius: 8 } }, entry.mood)
            ),
            React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, lineHeight: 1.5 } }, entry.text.slice(0, 90) + '...')
          )
        )
      ),

      // Acoustic section
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12, marginTop: 20, animation: 'fadeInUp 0.5s ease 0.35s both' } }, 'Acoustic Footprint'),
      React.createElement('div', {
        style: { background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}`, animation: 'fadeInUp 0.5s ease 0.4s both' }
      },
        soundscapes.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < soundscapes.length - 1 ? `1px solid ${t.border}` : 'none' }
          },
            React.createElement('button', {
              style: { width: 36, height: 36, borderRadius: 18, background: s.active ? t.primary : t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }
            }, React.createElement(s.active ? Pause : Play, { size: 16, color: s.active ? '#fff' : t.textSecondary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, s.name),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, s.location)
            ),
            React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, s.duration)
          )
        )
      )
    );
  }

  function ExploreScreen() {
    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'Explore'),
      React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 20 } }, 'Discover wellness waypoints nearby'),

      // Map placeholder
      React.createElement('div', {
        style: {
          borderRadius: 20, height: 180, marginBottom: 20, position: 'relative', overflow: 'hidden',
          background: isDark ? 'linear-gradient(135deg, #0D2137 0%, #163050 50%, #1A3A5C 100%)' : 'linear-gradient(135deg, #D4E8F5 0%, #BAD9EE 50%, #A5CBE4 100%)',
          animation: 'fadeInUp 0.5s ease'
        }
      },
        // Grid lines for map effect
        ...[0,1,2,3,4,5].map(i =>
          React.createElement('div', { key: 'h'+i, style: { position: 'absolute', top: (i * 36), left: 0, right: 0, height: 1, background: isDark ? 'rgba(14,165,233,0.08)' : 'rgba(14,165,233,0.12)' } })
        ),
        ...[0,1,2,3,4,5,6,7,8].map(i =>
          React.createElement('div', { key: 'v'+i, style: { position: 'absolute', top: 0, bottom: 0, left: (i * 42), width: 1, background: isDark ? 'rgba(14,165,233,0.08)' : 'rgba(14,165,233,0.12)' } })
        ),
        // Waypoint pins
        ...[{ x: 25, y: 30, done: true }, { x: 55, y: 55, done: true }, { x: 70, y: 25, done: false }, { x: 40, y: 70, done: false }, { x: 85, y: 60, done: false }].map((pin, i) =>
          React.createElement('div', {
            key: 'pin'+i,
            style: {
              position: 'absolute', left: pin.x + '%', top: pin.y + '%', transform: 'translate(-50%, -50%)',
              width: 28, height: 28, borderRadius: 14,
              background: pin.done ? t.primary : t.cta,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 12px ${pin.done ? 'rgba(14,165,233,0.5)' : 'rgba(249,115,22,0.5)'}`,
              animation: pin.done ? 'none' : 'pulseGlow 2s ease infinite',
              cursor: 'pointer', zIndex: 2
            }
          }, React.createElement(pin.done ? Check : MapPin, { size: 14, color: '#fff' }))
        ),
        React.createElement('div', {
          style: { position: 'absolute', bottom: 12, left: 12, background: t.overlay, borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(Compass, { size: 14, color: t.primary }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.text, fontFamily: font } }, 'Kyoto, Japan')
        )
      ),

      // Waypoint list
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Wellness Waypoints'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        waypoints.map((wp, i) => {
          const done = completedWaypoints.includes(wp.id);
          const Icon = wp.icon;
          return React.createElement('button', {
            key: wp.id,
            onClick: () => { setActiveWaypoint(wp); setShowWaypointDetail(true); },
            style: {
              width: '100%', background: t.card, borderRadius: 16, padding: '16px',
              border: `1px solid ${done ? t.primary : t.border}`, cursor: 'pointer',
              textAlign: 'left', transition: 'all 0.25s',
              boxShadow: done ? `0 0 0 1px ${t.primary}` : 'none',
              opacity: 1, animation: `fadeInUp 0.4s ease ${i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: done ? (isDark ? 'rgba(14,165,233,0.2)' : 'rgba(14,165,233,0.12)') : (isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }
              },
                done ? React.createElement(Check, { size: 22, color: t.primary }) : React.createElement(Icon, { size: 22, color: t.cta })
              ),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 2 } }, wp.title),
                React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(MapPin, { size: 11, color: t.textMuted }), wp.location
                )
              ),
              React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: done ? t.primary : t.cta, fontFamily: font } }, done ? 'Done' : '+' + wp.xp + ' XP'),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 } },
                  React.createElement(Clock, { size: 11, color: t.textMuted }), wp.duration
                )
              )
            )
          );
        })
      )
    );
  }

  function HavenScreen() {
    const havenElements = [
      { name: 'Cherry Blossom Tree', icon: Flower2, unlocked: true, tier: 1 },
      { name: 'Koi Pond', icon: Waves, unlocked: true, tier: 1 },
      { name: 'Bamboo Pavilion', icon: TreePine, unlocked: true, tier: 2 },
      { name: 'Wind Chimes', icon: Wind, unlocked: false, tier: 2 },
      { name: 'Stone Lantern', icon: Mountain, unlocked: false, tier: 3 },
      { name: 'Tea House', icon: Home, unlocked: false, tier: 3 },
    ];

    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Your Haven'),
          React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginTop: 2 } }, 'A shared sanctuary of calm')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: t.surfaceAlt, borderRadius: 12, padding: '6px 12px' } },
          React.createElement(Users, { size: 14, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: font } }, '4')
        )
      ),

      // Haven visualization
      React.createElement('div', {
        style: {
          borderRadius: 24, height: 220, marginBottom: 20, position: 'relative', overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(180deg, #0B1E35 0%, #122840 40%, #163050 70%, #1A3A5C 100%)'
            : 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 40%, #7DD3FC 70%, #38BDF8 100%)',
          animation: 'fadeInUp 0.5s ease'
        }
      },
        // Stars/particles
        ...(isDark ? [0,1,2,3,4,5,6,7].map(i =>
          React.createElement('div', {
            key: 'star'+i,
            style: {
              position: 'absolute',
              left: (10 + i * 12) + '%', top: (8 + (i % 3) * 12) + '%',
              width: 2, height: 2, borderRadius: 1,
              background: 'rgba(255,255,255,0.6)',
              animation: `breathe ${2 + i * 0.5}s ease infinite ${i * 0.3}s`
            }
          })
        ) : []),
        // Ground/water
        React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: isDark ? 'rgba(14,165,233,0.1)' : 'rgba(14,165,233,0.15)', borderRadius: '50% 50% 0 0' } }),
        // Haven structures
        React.createElement('div', { style: { position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 16, alignItems: 'flex-end' } },
          React.createElement('div', { style: { width: 40, height: 60, background: isDark ? 'rgba(14,165,233,0.3)' : 'rgba(14,165,233,0.25)', borderRadius: '8px 8px 0 0', animation: 'float 4s ease infinite' } }),
          React.createElement('div', { style: { width: 55, height: 80, background: isDark ? 'rgba(14,165,233,0.4)' : 'rgba(14,165,233,0.35)', borderRadius: '12px 12px 0 0', animation: 'float 3.5s ease infinite 0.5s' } }),
          React.createElement('div', { style: { width: 40, height: 50, background: isDark ? 'rgba(14,165,233,0.25)' : 'rgba(14,165,233,0.2)', borderRadius: '8px 8px 0 0', animation: 'float 4.5s ease infinite 1s' } })
        ),
        // Level badge
        React.createElement('div', {
          style: { position: 'absolute', top: 16, right: 16, background: 'rgba(14,165,233,0.2)', borderRadius: 12, padding: '8px 14px', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(Sparkles, { size: 14, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: font } }, 'Level ' + havenLevel)
        ),
        // Soundscape indicator
        React.createElement('div', {
          style: { position: 'absolute', bottom: 16, left: 16, background: 'rgba(14,165,233,0.2)', borderRadius: 12, padding: '8px 12px', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(Volume2, { size: 14, color: t.secondary, style: { animation: 'breathe 2s ease infinite' } }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 500, color: t.textSecondary, fontFamily: font } }, '3 soundscapes')
        )
      ),

      // Unlocked elements
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Sanctuary Elements'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 } },
        havenElements.map((el, i) => {
          const Icon = el.icon;
          return React.createElement('div', {
            key: i,
            style: {
              background: el.unlocked ? t.card : t.surfaceAlt,
              borderRadius: 16, padding: '16px', border: `1px solid ${el.unlocked ? t.border : 'transparent'}`,
              opacity: el.unlocked ? 1 : 0.5, transition: 'all 0.2s',
              animation: `fadeInUp 0.4s ease ${i * 0.06}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
              React.createElement('div', {
                style: { width: 40, height: 40, borderRadius: 12, background: el.unlocked ? (isDark ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.1)') : t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              }, el.unlocked ? React.createElement(Icon, { size: 20, color: t.primary }) : React.createElement(Lock, { size: 16, color: t.textMuted })),
              el.unlocked && React.createElement(Check, { size: 16, color: t.primary })
            ),
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: el.unlocked ? t.text : t.textMuted, fontFamily: font } }, el.name),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 2 } }, 'Tier ' + el.tier)
          );
        })
      ),

      // Record ambient sound
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Capture Ambient Sound'),
      React.createElement('div', {
        style: { background: t.card, borderRadius: 20, padding: '20px', border: `1px solid ${t.border}`, textAlign: 'center', animation: 'fadeInUp 0.5s ease 0.3s both' }
      },
        React.createElement('button', {
          onClick: () => { if (!recording) { setRecording(true); setRecordingProgress(0); } else { setRecording(false); setRecordingProgress(0); } },
          style: {
            width: 64, height: 64, borderRadius: 32, border: 'none', cursor: 'pointer',
            background: recording ? '#EF4444' : t.gradient1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', transition: 'all 0.2s',
            animation: recording ? 'recordPulse 1s ease infinite' : 'none',
            boxShadow: recording ? '0 0 30px rgba(239,68,68,0.4)' : `0 4px 20px ${t.shadow}`
          }
        }, React.createElement(Mic, { size: 24, color: '#fff' })),
        React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } },
          recording ? 'Recording...' : 'Tap to Record'
        ),
        React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginBottom: recording ? 12 : 0 } },
          recording ? Math.round(recordingProgress / 100 * 30) + 's / 30s' : 'Add to your haven\'s soundtrack'
        ),
        recording && React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 4, height: 6, overflow: 'hidden' } },
          React.createElement('div', { style: { width: recordingProgress + '%', height: '100%', background: '#EF4444', borderRadius: 4, transition: 'width 0.1s linear' } })
        )
      ),

      // Ritual Lore
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14, marginTop: 20 } }, 'Ritual Lore'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        ritualLore.map((lore, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: '14px 16px',
              border: `1px solid ${t.border}`, opacity: lore.unlocked ? 1 : 0.5,
              animation: `slideInRight 0.4s ease ${i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: { width: 36, height: 36, borderRadius: 10, background: lore.unlocked ? (isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)') : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              }, lore.unlocked ? React.createElement(BookOpen, { size: 16, color: t.cta }) : React.createElement(Lock, { size: 14, color: t.textMuted })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: lore.unlocked ? t.text : t.textMuted, fontFamily: font } }, lore.title),
                lore.unlocked && React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 2, lineHeight: 1.4 } }, lore.desc)
              )
            )
          )
        )
      )
    );
  }

  function ScrollScreen() {
    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Tranquility'),
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.primary, fontFamily: font, letterSpacing: -0.5, marginTop: -4 } }, 'Scroll')
        ),
        React.createElement('button', {
          style: { width: 44, height: 44, borderRadius: 22, background: t.gradient2, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }
        }, React.createElement(PenLine, { size: 18, color: '#fff' }))
      ),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        [{ label: 'Entries', value: '12', icon: BookOpen }, { label: 'Waypoints', value: completedWaypoints.length + '/' + waypoints.length, icon: MapPin }, { label: 'Streak', value: '4d', icon: Star }].map((stat, i) => {
          const Icon = stat.icon;
          return React.createElement('div', {
            key: i,
            style: { flex: 1, background: t.card, borderRadius: 14, padding: '14px 12px', border: `1px solid ${t.border}`, textAlign: 'center', animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }
          },
            React.createElement(Icon, { size: 16, color: t.primary, style: { marginBottom: 6 } }),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: font } }, stat.value),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 2 } }, stat.label)
          );
        })
      ),

      // Journal entries
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        journalEntries.map((entry, i) =>
          React.createElement('div', {
            key: entry.id,
            onClick: () => setJournalExpanded(journalExpanded === entry.id ? null : entry.id),
            style: {
              background: t.card, borderRadius: 18, padding: '18px', border: `1px solid ${t.border}`,
              cursor: 'pointer', transition: 'all 0.25s',
              boxShadow: journalExpanded === entry.id ? `0 8px 32px ${t.shadow}` : `0 2px 12px ${t.shadow}`,
              animation: `fadeInUp 0.4s ease ${i * 0.1}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
              React.createElement('div', {
                style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${entry.color}, ${entry.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: font }
              }, entry.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: font } }, entry.user),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, entry.date)
              ),
              React.createElement('div', {
                style: { background: isDark ? 'rgba(14,165,233,0.12)' : 'rgba(14,165,233,0.08)', borderRadius: 10, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }
              },
                React.createElement(Heart, { size: 12, color: entry.color }),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: entry.color, fontFamily: font } }, entry.mood)
              )
            ),
            React.createElement('div', {
              style: { background: isDark ? 'rgba(14,165,233,0.08)' : 'rgba(14,165,233,0.05)', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: t.primary, fontFamily: font } },
                React.createElement(MapPin, { size: 12, color: t.primary }),
                entry.waypoint
              )
            ),
            React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, lineHeight: 1.6 } },
              journalExpanded === entry.id ? entry.text : entry.text.slice(0, 100) + '...'
            ),
            journalExpanded === entry.id && React.createElement('div', {
              style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 10 }
            },
              React.createElement('button', {
                style: { flex: 1, height: 40, borderRadius: 10, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
              }, React.createElement(Heart, { size: 14, color: t.textSecondary }), 'Resonate'),
              React.createElement('button', {
                style: { flex: 1, height: 40, borderRadius: 10, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
              }, React.createElement(PenLine, { size: 14, color: '#fff' }), 'Respond')
            )
          )
        )
      ),

      // Milestone
      React.createElement('div', {
        style: { marginTop: 20, background: t.gradient1, borderRadius: 18, padding: '18px', position: 'relative', overflow: 'hidden', animation: 'fadeInUp 0.5s ease 0.4s both' }
      },
        React.createElement('div', { style: { position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.08)', animation: 'breathe 4s ease infinite' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, position: 'relative' } },
          React.createElement(Trophy, { size: 28, color: '#FFD700' }),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: font } }, 'Next Milestone'),
            React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font, marginTop: 2 } }, 'Complete 4 waypoints to unlock Tea Ceremony Lore')
          )
        )
      )
    );
  }

  function ProfileScreen() {
    const stats = [
      { label: 'Journeys', value: '3' },
      { label: 'Waypoints', value: '14' },
      { label: 'Havens', value: '2' },
      { label: 'Sounds', value: '8' },
    ];

    const achievements = [
      { name: 'First Steps', desc: 'Complete your first waypoint', done: true, icon: MapPin },
      { name: 'Sound Collector', desc: 'Record 5 ambient sounds', done: true, icon: Mic },
      { name: 'Haven Builder', desc: 'Reach Haven Level 5', done: false, icon: Home },
      { name: 'Lore Keeper', desc: 'Unlock all ritual lore', done: false, icon: BookOpen },
    ];

    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Profile'),
        React.createElement('button', {
          style: { width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Settings, { size: 20, color: t.textSecondary }))
      ),

      // Profile card
      React.createElement('div', {
        style: { background: t.card, borderRadius: 20, padding: '24px', border: `1px solid ${t.border}`, textAlign: 'center', marginBottom: 20, animation: 'fadeInUp 0.5s ease' }
      },
        React.createElement('div', {
          style: { width: 72, height: 72, borderRadius: 36, background: t.gradient1, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: font, boxShadow: `0 4px 24px rgba(14,165,233,0.3)` }
        }, 'S'),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.3 } }, 'Steve'),
        React.createElement('div', { style: { fontSize: 14, color: t.textMuted, fontFamily: font, marginTop: 4 } }, 'Mindful Explorer since March 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 } },
          stats.map((s, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.primary, fontFamily: font } }, s.value),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, s.label)
            )
          )
        )
      ),

      // Theme toggle
      React.createElement('div', {
        style: { background: t.card, borderRadius: 16, padding: '16px 18px', border: `1px solid ${t.border}`, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', animation: 'fadeInUp 0.5s ease 0.1s both' }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(isDark ? Moon : Sun, { size: 20, color: t.primary }),
          React.createElement('span', { style: { fontSize: 16, fontWeight: 600, color: t.text, fontFamily: font } }, isDark ? 'Dark Mode' : 'Light Mode')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 52, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer', position: 'relative',
            background: isDark ? t.primary : '#D1D5DB', transition: 'background 0.3s'
          }
        },
          React.createElement('div', {
            style: { width: 24, height: 24, borderRadius: 12, background: '#fff', position: 'absolute', top: 3, left: isDark ? 25 : 3, transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }
          })
        )
      ),

      // Achievements
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Achievements'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        achievements.map((ach, i) => {
          const Icon = ach.icon;
          return React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${ach.done ? t.primary : t.border}`,
              opacity: ach.done ? 1 : 0.55, animation: `slideInRight 0.4s ease ${i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', {
                style: { width: 40, height: 40, borderRadius: 12, background: ach.done ? (isDark ? 'rgba(14,165,233,0.2)' : 'rgba(14,165,233,0.1)') : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              }, ach.done ? React.createElement(Icon, { size: 18, color: t.primary }) : React.createElement(Lock, { size: 16, color: t.textMuted })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: ach.done ? t.text : t.textMuted, fontFamily: font } }, ach.name),
                React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 1 } }, ach.desc)
              ),
              ach.done && React.createElement(Check, { size: 18, color: t.primary })
            )
          );
        })
      ),

      // Travel companions
      React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14, marginTop: 20 } }, 'Travel Companions'),
      React.createElement('div', { style: { display: 'flex', gap: 12 } },
        [{ name: 'Mia', color: '#0EA5E9' }, { name: 'Alex', color: '#38BDF8' }, { name: 'Jordan', color: '#F97316' }].map((person, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, background: t.card, borderRadius: 14, padding: '16px', border: `1px solid ${t.border}`, textAlign: 'center', animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }
          },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: person.color, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: font } }, person.name[0]),
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font } }, person.name)
          )
        )
      ),

      React.createElement('div', { style: { height: 20 } })
    );
  }

  // Waypoint detail modal
  function WaypointDetailModal() {
    if (!showWaypointDetail || !activeWaypoint) return null;
    const wp = activeWaypoint;
    const done = completedWaypoints.includes(wp.id);
    const Icon = wp.icon;

    return React.createElement('div', {
      style: { position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }
    },
      React.createElement('div', {
        onClick: () => setShowWaypointDetail(false),
        style: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease' }
      }),
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: '24px 24px 0 0', padding: '24px 20px 32px',
          position: 'relative', animation: 'slideUp 0.35s ease', maxHeight: '80%', overflow: 'auto'
        }
      },
        React.createElement('div', { style: { width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' } }),
        React.createElement('button', {
          onClick: () => setShowWaypointDetail(false),
          style: { position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: 18, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(X, { size: 18, color: t.textSecondary })),

        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 } },
          React.createElement('div', {
            style: { width: 56, height: 56, borderRadius: 16, background: done ? (isDark ? 'rgba(14,165,233,0.2)' : 'rgba(14,165,233,0.1)') : (isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)'), display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(Icon, { size: 28, color: done ? t.primary : t.cta })),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.3 } }, wp.title),
            React.createElement('div', { style: { fontSize: 14, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 } },
              React.createElement(MapPin, { size: 13, color: t.textMuted }), wp.location
            )
          )
        ),

        React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
          React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: '12px', textAlign: 'center' } },
            React.createElement(Clock, { size: 16, color: t.primary, style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, wp.duration),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, 'Duration')
          ),
          React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: '12px', textAlign: 'center' } },
            React.createElement(Star, { size: 16, color: t.cta, style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, wp.xp + ' XP'),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, 'Reward')
          ),
          React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: '12px', textAlign: 'center' } },
            React.createElement(Sparkles, { size: 16, color: t.secondary, style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, wp.element.split(' ')[0]),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, 'Unlocks')
          )
        ),

        React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, lineHeight: 1.7, marginBottom: 20, background: t.surfaceAlt, borderRadius: 14, padding: '16px' } }, wp.desc),

        React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.primary, fontFamily: font, marginBottom: 10 } }, 'Unlocks: ' + wp.element),

        React.createElement('button', {
          onClick: () => {
            if (!done) {
              setCompletedWaypoints([...completedWaypoints, wp.id]);
              setHavenLevel(Math.floor((completedWaypoints.length + 1) / 2) + 1);
            }
            setShowWaypointDetail(false);
          },
          style: {
            width: '100%', height: 52, borderRadius: 16, border: 'none', cursor: 'pointer',
            background: done ? t.surfaceAlt : t.gradient2,
            color: done ? t.textSecondary : '#fff',
            fontSize: 16, fontWeight: 700, fontFamily: font,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: done ? 'none' : '0 4px 20px rgba(249,115,22,0.3)',
            transition: 'all 0.2s'
          }
        },
          done ? React.createElement(Check, { size: 18, color: t.textSecondary }) : React.createElement(Compass, { size: 18, color: '#fff' }),
          done ? 'Completed' : 'Begin Waypoint'
        )
      )
    );
  }

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    haven: HavenScreen,
    scroll: ScrollScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'haven', label: 'Haven', icon: Sparkles },
    { id: 'scroll', label: 'Scroll', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column'
      }
    },
      // Content
      React.createElement('div', {
        key: animKey,
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 16, paddingBottom: 80 }
      }, React.createElement(screens[activeScreen])),

      // Waypoint detail
      React.createElement(WaypointDetailModal),

      // Bottom nav
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 24px', backdropFilter: 'blur(20px)',
          backgroundColor: isDark ? 'rgba(13,31,51,0.92)' : 'rgba(255,255,255,0.92)'
        }
      },
        navItems.map(item => {
          const Icon = item.icon;
          const active = activeScreen === item.id;
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px',
              minWidth: 52, minHeight: 44, transition: 'all 0.2s'
            }
          },
            React.createElement(Icon, { size: 22, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 }),
            React.createElement('span', {
              style: { fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, fontFamily: font, transition: 'color 0.2s' }
            }, item.label)
          );
        })
      )
    )
  );
}
