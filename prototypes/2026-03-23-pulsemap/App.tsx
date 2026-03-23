const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F7FF',
    card: '#FFFFFF',
    cardBorder: '#E8EEFF',
    text: '#0D1117',
    textSec: '#5A6480',
    textMuted: '#9BA3BF',
    primary: '#4F6EF7',
    primaryDark: '#3A55E0',
    primaryLight: '#E8ECFE',
    accent: '#FF6B35',
    accentLight: '#FFF0EB',
    success: '#22C55E',
    successLight: '#DCFCE7',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    navBg: '#FFFFFF',
    navBorder: '#E8EEFF',
    statusBg: 'transparent',
    pill: '#EEF1FF',
    pillText: '#4F6EF7',
    mapBg: '#DDE4F8',
  },
  dark: {
    bg: '#080C1A',
    surface: '#111827',
    surfaceAlt: '#161F35',
    card: '#161F35',
    cardBorder: '#1E2D50',
    text: '#F0F4FF',
    textSec: '#8899CC',
    textMuted: '#445580',
    primary: '#6B8AFF',
    primaryDark: '#4F6EF7',
    primaryLight: '#1A2550',
    accent: '#FF7A4A',
    accentLight: '#2A1510',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#3B2800',
    danger: '#F87171',
    dangerLight: '#3B0A0A',
    navBg: '#111827',
    navBorder: '#1E2D50',
    statusBg: 'transparent',
    pill: '#1A2550',
    pillText: '#6B8AFF',
    mapBg: '#0D1630',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = document.createElement('style');
  fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');*{font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;}`;
  if (!document.head.querySelector('#pulsemap-font')) {
    fontStyle.id = 'pulsemap-font';
    document.head.appendChild(fontStyle);
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'map', label: 'Map', icon: window.lucide.Map },
    { id: 'briefing', label: 'Briefing', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = { home: HomeScreen, map: MapScreen, briefing: BriefingScreen, profile: ProfileScreen };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }
  },
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 52, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)', position: 'relative', display: 'flex', flexDirection: 'column' }
    },
      // Dynamic Island
      React.createElement('div', {
        style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }
      }),
      // Status bar
      React.createElement('div', {
        style: { height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: 28, paddingRight: 24, paddingBottom: 8, flexShrink: 0, zIndex: 10, background: t.bg }
      },
        React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 16, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 16, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 20, color: t.text })
        )
      ),
      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', position: 'relative' }
      },
        React.createElement(screens[activeTab], { t, isDark, setIsDark })
      ),
      // Bottom nav
      React.createElement('div', {
        style: { height: 78, background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 12, paddingLeft: 8, paddingRight: 8, flexShrink: 0 }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          onMouseDown: () => setPressedTab(tab.id),
          onMouseUp: () => setPressedTab(null),
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '8px 16px', borderRadius: 16, background: activeTab === tab.id ? t.primaryLight : 'transparent', transform: pressedTab === tab.id ? 'scale(0.92)' : 'scale(1)', transition: 'all 0.15s ease', minWidth: 64 }
        },
          React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 }),
          React.createElement('span', { style: { fontSize: 11, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? t.primary : t.textMuted, letterSpacing: 0.2 } }, tab.label)
        ))
      )
    )
  );
}

function HomeScreen({ t, isDark, setIsDark }) {
  const [pressedCard, setPressedCard] = useState(null);

  const impactStories = [
    {
      id: 1, urgency: 'high', tag: 'Transit', tagColor: t.danger, tagBg: t.dangerLight,
      title: 'BART Strike Likely Tomorrow', why: 'Your 8:12am commute to Embarcadero could be delayed 45+ min. Leave by 7:00am or work remotely.',
      time: '3 min ago', action: 'Reschedule commute', icon: window.lucide.Train
    },
    {
      id: 2, urgency: 'medium', tag: 'Finance', tagColor: t.warning, tagBg: t.warningLight,
      title: 'Fed Rate Decision Today at 2pm', why: 'Your variable-rate mortgage payment may increase ~$85/mo if rates rise as expected.',
      time: '18 min ago', action: 'Review mortgage', icon: window.lucide.TrendingUp
    },
    {
      id: 3, urgency: 'low', tag: 'Weather', tagColor: t.primary, tagBg: t.primaryLight,
      title: 'Heavy Rain: Thursday–Friday', why: 'Your lunch reservation at Hog Island Oyster is on Thursday. Outdoor seating will be closed.',
      time: '1 hr ago', action: 'Call restaurant', icon: window.lucide.CloudRain
    },
    {
      id: 4, urgency: 'medium', tag: 'Health', tagColor: t.success, tagBg: t.successLight,
      title: 'Air Quality Alert: AQI 158', why: 'You have an outdoor run scheduled at 6pm. Consider moving it inside or postponing.',
      time: '2 hr ago', action: 'Adjust workout', icon: window.lucide.Wind
    },
  ];

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 16 }
  },
    // Header
    React.createElement('div', {
      style: { padding: '12px 20px 16px', background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Monday, March 23'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Your Impact Feed')
        ),
        React.createElement('div', {
          style: { width: 40, height: 40, borderRadius: 12, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        },
          React.createElement(window.lucide.Bell, { size: 20, color: t.primary })
        )
      ),
      // Relevance score
      React.createElement('div', {
        style: { background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 2 } }, '4 STORIES AFFECT YOU TODAY'),
          React.createElement('div', { style: { fontSize: 13, color: '#fff', fontWeight: 500 } }, '2 need your attention now')
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '6px 10px' } },
          React.createElement('span', { style: { fontSize: 20, fontWeight: 800, color: '#fff' } }, '4'),
          React.createElement('div', { style: { fontSize: 9, color: 'rgba(255,255,255,0.7)', textAlign: 'center' } }, 'TODAY')
        )
      )
    ),
    // Stories
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      impactStories.map((story, i) =>
        React.createElement('div', {
          key: story.id,
          onMouseDown: () => setPressedCard(story.id),
          onMouseUp: () => setPressedCard(null),
          style: { background: t.card, borderRadius: 18, padding: 16, marginBottom: 12, border: `1px solid ${t.cardBorder}`, cursor: 'pointer', transform: pressedCard === story.id ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s ease', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }
        },
          // Tag row
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
              React.createElement('div', { style: { background: story.tagBg, borderRadius: 8, padding: '3px 10px' } },
                React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: story.tagColor } }, story.tag)
              ),
              story.urgency === 'high' && React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: t.danger } })
            ),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, story.time)
          ),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 8, lineHeight: 1.3 } }, story.title),
          // Why it matters
          React.createElement('div', {
            style: { background: t.surfaceAlt, borderRadius: 10, padding: '10px 12px', marginBottom: 10, borderLeft: `3px solid ${t.primary}` }
          },
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: t.primary, marginBottom: 3, letterSpacing: 0.5 } }, 'WHY THIS MATTERS TO YOU'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSec, lineHeight: 1.5 } }, story.why)
          ),
          // Action button
          React.createElement('div', {
            style: { background: t.primaryLight, borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }
          },
            React.createElement(window.lucide.ArrowRight, { size: 14, color: t.primary }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.primary } }, story.action)
          )
        )
      )
    )
  );
}

function MapScreen({ t }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['all', 'transit', 'weather', 'safety', 'events'];

  const mapPins = [
    { id: 1, x: 180, y: 200, type: 'transit', label: 'Strike Zone', color: t.danger, icon: window.lucide.Train },
    { id: 2, x: 90, y: 140, type: 'weather', label: 'Rain Advisory', color: t.primary, icon: window.lucide.CloudRain },
    { id: 3, x: 260, y: 280, type: 'safety', label: 'Road Closure', color: t.warning, icon: window.lucide.AlertTriangle },
    { id: 4, x: 140, y: 310, type: 'events', label: 'Farmers Market', color: t.success, icon: window.lucide.MapPin },
    { id: 5, x: 220, y: 150, type: 'transit', label: 'Delay: BART', color: t.danger, icon: window.lucide.AlertCircle },
  ];

  const filtered = activeFilter === 'all' ? mapPins : mapPins.filter(p => p.type === activeFilter);

  return React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: { padding: '12px 20px 14px', background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }
    },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 10 } }, 'Live Impact Map'),
      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 } },
        filters.map(f =>
          React.createElement('div', {
            key: f,
            onClick: () => setActiveFilter(f),
            style: { padding: '5px 12px', borderRadius: 20, background: activeFilter === f ? t.primary : t.surfaceAlt, cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }
          },
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: activeFilter === f ? '#fff' : t.textSec, textTransform: 'capitalize' } }, f)
          )
        )
      )
    ),
    // Map area
    React.createElement('div', {
      style: { flex: 1, position: 'relative', overflow: 'hidden', background: t.mapBg }
    },
      // Grid lines (map illusion)
      React.createElement('svg', { width: '100%', height: '100%', style: { position: 'absolute', opacity: 0.3 } },
        ...Array.from({ length: 8 }, (_, i) =>
          React.createElement('line', { key: `h${i}`, x1: 0, y1: i * 50, x2: 375, y2: i * 50, stroke: t.primary, strokeWidth: 0.5 })
        ),
        ...Array.from({ length: 9 }, (_, i) =>
          React.createElement('line', { key: `v${i}`, x1: i * 47, y1: 0, x2: i * 47, y2: 400, stroke: t.primary, strokeWidth: 0.5 })
        )
      ),
      // Roads (simulated)
      React.createElement('svg', { width: '100%', height: '100%', style: { position: 'absolute', opacity: 0.5 } },
        React.createElement('path', { d: 'M0 200 Q100 180 200 220 T375 200', stroke: t.textMuted, strokeWidth: 8, fill: 'none' }),
        React.createElement('path', { d: 'M150 0 Q160 100 155 200 T160 400', stroke: t.textMuted, strokeWidth: 8, fill: 'none' }),
        React.createElement('path', { d: 'M0 300 L375 280', stroke: t.textMuted, strokeWidth: 5, fill: 'none' }),
        React.createElement('path', { d: 'M250 0 L240 400', stroke: t.textMuted, strokeWidth: 5, fill: 'none' }),
      ),
      // Your location
      React.createElement('div', {
        style: { position: 'absolute', left: 178, top: 230, width: 20, height: 20, borderRadius: 10, background: t.primary, border: '3px solid #fff', boxShadow: '0 0 0 6px rgba(79,110,247,0.25)', zIndex: 10 }
      }),
      // Pins
      filtered.map(pin =>
        React.createElement('div', {
          key: pin.id,
          style: { position: 'absolute', left: pin.x, top: pin.y, zIndex: 5, cursor: 'pointer' }
        },
          React.createElement('div', {
            style: { background: pin.color, borderRadius: 10, padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', border: '2px solid #fff' }
          },
            React.createElement(pin.icon, { size: 12, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' } }, pin.label)
          ),
          React.createElement('div', { style: { width: 2, height: 8, background: pin.color, margin: '0 auto' } }),
          React.createElement('div', { style: { width: 6, height: 6, borderRadius: 3, background: pin.color, margin: '0 auto' } })
        )
      )
    ),
    // Legend
    React.createElement('div', {
      style: { padding: '12px 16px', background: t.surface, borderTop: `1px solid ${t.cardBorder}` }
    },
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 8 } }, `${filtered.length} alerts in your area`),
      React.createElement('div', { style: { display: 'flex', gap: 16 } },
        [{ label: 'Transit', color: t.danger }, { label: 'Weather', color: t.primary }, { label: 'Safety', color: t.warning }].map(item =>
          React.createElement('div', { key: item.label, style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: item.color } }),
            React.createElement('span', { style: { fontSize: 11, color: t.textSec, fontWeight: 500 } }, item.label)
          )
        )
      )
    )
  );
}

function BriefingScreen({ t }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { setPlaying(false); clearInterval(timerRef.current); return 100; }
          return p + 1.67;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const items = [
    { time: '0:00', title: 'Transit alert: BART workers may strike', impact: 'HIGH', color: t.danger },
    { time: '0:15', title: 'Fed rates decision at 2pm today', impact: 'MED', color: t.warning },
    { time: '0:30', title: 'Air quality advisory through evening', impact: 'MED', color: t.warning },
    { time: '0:45', title: 'Heavy rain forecast Thursday–Friday', impact: 'LOW', color: t.success },
  ];

  const toggleItem = (i) => {
    setCompleted(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  };

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: { padding: '12px 20px 20px', background: `linear-gradient(160deg, ${t.primary} 0%, ${t.primaryDark} 100%)` }
    },
      React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 } }, 'DAILY BRIEFING'),
      React.createElement('div', { style: { fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 4 } }, 'Your 60-Second Brief'),
      React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)' } }, '4 stories · Personal relevance score 94%'),
      // Player
      React.createElement('div', {
        style: { background: 'rgba(255,255,255,0.15)', borderRadius: 18, padding: 16, marginTop: 14 }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', {
              onClick: () => { setPlaying(!playing); if (progress >= 100) { setProgress(0); setPlaying(true); } },
              style: { width: 44, height: 44, borderRadius: 22, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }
            },
              React.createElement(playing ? window.lucide.Pause : window.lucide.Play, { size: 20, color: t.primary })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, playing ? 'Playing...' : progress === 100 ? 'Complete' : 'Tap to play'),
              React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)' } }, '~60 seconds')
            )
          ),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' } }, `${Math.floor(progress * 0.6)}s`)
        ),
        // Progress bar
        React.createElement('div', { style: { height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: `${progress}%`, background: '#fff', borderRadius: 2, transition: 'width 1s linear' } })
        )
      )
    ),
    // Briefing items
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSec, marginBottom: 10, letterSpacing: 0.3 } }, 'STORY TIMELINE'),
      items.map((item, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => toggleItem(i),
          style: { background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', opacity: completed.includes(i) ? 0.5 : 1, transition: 'opacity 0.2s' }
        },
          React.createElement('div', { style: { background: t.primaryLight, borderRadius: 8, padding: '4px 8px', minWidth: 36, textAlign: 'center' } },
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.primary } }, item.time)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.3, textDecoration: completed.includes(i) ? 'line-through' : 'none' } }, item.title)
          ),
          React.createElement('div', { style: { background: item.color + '22', borderRadius: 6, padding: '2px 6px' } },
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: item.color } }, item.impact)
          ),
          completed.includes(i) && React.createElement(window.lucide.Check, { size: 16, color: t.success })
        )
      )
    ),
    // Action prompts
    React.createElement('div', { style: { padding: '16px' } },
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSec, marginBottom: 10, letterSpacing: 0.3 } }, 'SUGGESTED ACTIONS'),
      [
        { label: 'Leave by 7:00am tomorrow', icon: window.lucide.Clock, color: t.danger },
        { label: 'Check mortgage rate lock options', icon: window.lucide.DollarSign, color: t.warning },
        { label: 'Move outdoor run to gym', icon: window.lucide.Activity, color: t.primary },
      ].map((action, i) =>
        React.createElement('div', {
          key: i,
          style: { background: t.card, borderRadius: 12, padding: '10px 14px', marginBottom: 8, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }
        },
          React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: action.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(action.icon, { size: 16, color: action.color })
          ),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, flex: 1 } }, action.label),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )
      )
    )
  );
}

function ProfileScreen({ t, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);
  const [locationOn, setLocationOn] = useState(true);
  const [calendarSync, setCalendarSync] = useState(true);

  const Toggle = ({ value, onChange }) =>
    React.createElement('div', {
      onClick: onChange,
      style: { width: 46, height: 26, borderRadius: 13, background: value ? t.primary : t.textMuted, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }
    },
      React.createElement('div', {
        style: { width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }
      })
    );

  const interests = ['Finance', 'Transit', 'Health', 'Tech', 'Climate', 'Local Policy'];

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: { padding: '12px 20px 20px', background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Your Profile'),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${t.cardBorder}` }
        },
          React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 20, color: t.primary })
        )
      ),
      // Avatar
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', {
          style: { width: 60, height: 60, borderRadius: 20, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement('span', { style: { fontSize: 24, fontWeight: 800, color: '#fff' } }, 'S')
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text } }, 'Sarah Chen'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSec } }, 'San Francisco, CA'),
          React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600, marginTop: 2 } }, 'Relevance Score: 94%')
        )
      )
    ),
    React.createElement('div', { style: { padding: 16 } },
      // Interests
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSec, letterSpacing: 0.5, marginBottom: 10 } }, 'YOUR INTERESTS'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          interests.map(i =>
            React.createElement('div', {
              key: i,
              style: { background: t.primaryLight, borderRadius: 20, padding: '6px 14px', border: `1px solid ${t.cardBorder}` }
            },
              React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.primary } }, i)
            )
          )
        )
      ),
      // Settings
      React.createElement('div', {
        style: { background: t.card, borderRadius: 18, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }
      },
        [
          { label: 'Push Notifications', sub: 'Breaking impact alerts', value: notifications, set: () => setNotifications(!notifications), icon: window.lucide.Bell },
          { label: 'Location Services', sub: 'Hyperlocal news detection', value: locationOn, set: () => setLocationOn(!locationOn), icon: window.lucide.MapPin },
          { label: 'Calendar Sync', sub: 'Context-aware briefings', value: calendarSync, set: () => setCalendarSync(!calendarSync), icon: window.lucide.Calendar },
          { label: 'Dark Mode', sub: 'Easy on the eyes', value: isDark, set: () => setIsDark(!isDark), icon: window.lucide.Moon },
        ].map((item, i, arr) =>
          React.createElement('div', {
            key: item.label,
            style: { padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length - 1 ? `1px solid ${t.cardBorder}` : 'none' }
          },
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }
            },
              React.createElement(item.icon, { size: 18, color: t.primary })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.label),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, item.sub)
            ),
            React.createElement(Toggle, { value: item.value, onChange: item.set })
          )
        )
      ),
      // Stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 } },
        [
          { label: 'Days Active', value: '47' },
          { label: 'Stories Read', value: '312' },
          { label: 'Actions Taken', value: '89' },
          { label: 'Time Saved', value: '6.2h' },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: { background: t.card, borderRadius: 14, padding: '14px', textAlign: 'center', border: `1px solid ${t.cardBorder}` }
          },
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.primary } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textSec, fontWeight: 500, marginTop: 2 } }, stat.label)
          )
        )
      )
    )
  );
}
