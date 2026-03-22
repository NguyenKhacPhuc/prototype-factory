const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F2F5',
    phoneBg: '#FFFFFF',
    surface: '#F7F8FA',
    surfaceAlt: '#EDEEF2',
    card: '#FFFFFF',
    cardBorder: '#E8EAF0',
    text: '#0F1117',
    textSecondary: '#6B7280',
    textMuted: '#A0A8B8',
    primary: '#7C3AED',
    primaryLight: '#EDE9FE',
    primaryDark: '#5B21B6',
    accent: '#06B6D4',
    accentLight: '#CFFAFE',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    success: '#10B981',
    successLight: '#D1FAE5',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    navBg: '#FFFFFF',
    navBorder: '#E8EAF0',
    statusBar: '#0F1117',
    divider: '#E8EAF0',
    shadow: 'rgba(0,0,0,0.08)',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
  },
  dark: {
    bg: '#0A0B0F',
    phoneBg: '#111318',
    surface: '#1A1D26',
    surfaceAlt: '#1F2230',
    card: '#1A1D26',
    cardBorder: '#2A2D3E',
    text: '#F0F2F8',
    textSecondary: '#9BA3BF',
    textMuted: '#555E7A',
    primary: '#A78BFA',
    primaryLight: '#2D2060',
    primaryDark: '#7C3AED',
    accent: '#22D3EE',
    accentLight: '#0A3040',
    error: '#F87171',
    errorLight: '#3B1515',
    warning: '#FBBF24',
    warningLight: '#3B2800',
    success: '#34D399',
    successLight: '#0D2E1E',
    info: '#60A5FA',
    infoLight: '#1A2D50',
    navBg: '#111318',
    navBorder: '#2A2D3E',
    statusBar: '#F0F2F8',
    divider: '#2A2D3E',
    shadow: 'rgba(0,0,0,0.4)',
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%)',
  },
};

const incidents = [
  {
    id: 1,
    title: 'Checkout payment silent failure',
    app: 'ShopFlow iOS',
    severity: 'critical',
    status: 'open',
    time: '2m ago',
    duration: '4.2s',
    affectedUsers: 847,
    os: 'iOS 17.3',
    device: 'iPhone 14',
    network: '3G',
    tags: ['payment', 'flag-mismatch', 'timeout'],
    rootCause: 'Feature flag checkout_v2 enabled but payment_sdk not updated — race condition on slow networks',
    confidence: 91,
    steps: [
      { type: 'user', time: '00:00', label: 'Opened cart screen', detail: '3 items, total $124.99' },
      { type: 'network', time: '00:01', label: 'GET /api/cart/validate', detail: '200 OK — 312ms' },
      { type: 'flag', time: '00:02', label: 'Flag: checkout_v2 = true', detail: 'Enabled for 40% rollout' },
      { type: 'user', time: '00:03', label: 'Tapped "Place Order"', detail: 'Button state: enabled' },
      { type: 'network', time: '00:04', label: 'POST /api/orders/create', detail: '200 OK — 1.8s (slow 3G)' },
      { type: 'error', time: '00:05', label: 'payment_sdk.charge() timed out', detail: 'SDK v2.1.3 expects checkout_v1 token format' },
      { type: 'crash', time: '00:06', label: 'UI froze — no error shown to user', detail: 'Spinner stuck, no fallback triggered' },
    ],
  },
  {
    id: 2,
    title: 'Profile avatar upload crash',
    app: 'ShopFlow Android',
    severity: 'high',
    status: 'investigating',
    time: '18m ago',
    duration: '0.8s',
    affectedUsers: 234,
    os: 'Android 13',
    device: 'Pixel 7',
    network: 'WiFi',
    tags: ['crash', 'image-upload', 'permissions'],
    rootCause: 'Missing READ_MEDIA_IMAGES permission on Android 13+ causes NullPointerException in image picker',
    confidence: 88,
    steps: [
      { type: 'user', time: '00:00', label: 'Navigated to Profile Settings', detail: 'Session: 12min active' },
      { type: 'user', time: '00:01', label: 'Tapped "Change Avatar"', detail: 'Image picker dialog opened' },
      { type: 'error', time: '00:02', label: 'Permission check failed', detail: 'READ_MEDIA_IMAGES not in manifest (Android 13+)' },
      { type: 'crash', time: '00:02', label: 'NullPointerException', detail: 'at ImagePickerModule.java:204' },
    ],
  },
  {
    id: 3,
    title: 'Search results blank screen',
    app: 'ShopFlow iOS',
    severity: 'medium',
    status: 'resolved',
    time: '2h ago',
    duration: '2.1s',
    affectedUsers: 112,
    os: 'iOS 16.7',
    device: 'iPhone 12',
    network: 'WiFi',
    tags: ['search', 'empty-state', 'api'],
    rootCause: 'Search API returning 204 No Content instead of 200 with empty array — UI not handling 204 gracefully',
    confidence: 95,
    steps: [
      { type: 'user', time: '00:00', label: 'Typed "wireless headphones"', detail: '4 characters, debounce 300ms' },
      { type: 'network', time: '00:01', label: 'GET /api/search?q=wireless', detail: '204 No Content — 890ms' },
      { type: 'error', time: '00:02', label: 'Response parser returned undefined', detail: 'Expected array, got null' },
      { type: 'user', time: '00:03', label: 'Blank screen shown', detail: 'No loading, no empty state, no error' },
    ],
  },
  {
    id: 4,
    title: 'Push notification deep-link 404',
    app: 'ShopFlow iOS',
    severity: 'low',
    status: 'open',
    time: '5h ago',
    duration: '0.3s',
    affectedUsers: 56,
    os: 'iOS 17.2',
    device: 'iPhone 15 Pro',
    network: 'LTE',
    tags: ['push', 'deep-link', 'routing'],
    rootCause: 'Promo campaign used deprecated /sale/ route removed in v3.2 — deep-link resolver has no fallback',
    confidence: 97,
    steps: [
      { type: 'user', time: '00:00', label: 'Tapped push notification', detail: 'Promo: "Flash Sale - 50% off"' },
      { type: 'network', time: '00:01', label: 'Deep link: /sale/flash-2024', detail: 'Route not found in router' },
      { type: 'error', time: '00:02', label: 'Navigation failed', detail: 'No fallback — app stuck on previous screen' },
    ],
  },
];

const severityConfig = {
  critical: { label: 'Critical', color: '#EF4444', bg: '#FEE2E2', darkBg: '#3B1515' },
  high: { label: 'High', color: '#F59E0B', bg: '#FEF3C7', darkBg: '#3B2800' },
  medium: { label: 'Medium', color: '#3B82F6', bg: '#DBEAFE', darkBg: '#1A2D50' },
  low: { label: 'Low', color: '#10B981', bg: '#D1FAE5', darkBg: '#0D2E1E' },
};

const stepTypeConfig = {
  user: { icon: '👤', color: '#7C3AED' },
  network: { icon: '🌐', color: '#3B82F6' },
  flag: { icon: '🚩', color: '#F59E0B' },
  error: { icon: '⚠️', color: '#EF4444' },
  crash: { icon: '💥', color: '#EF4444' },
};

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [isDark, setIsDark] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [replayStep, setReplayStep] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [bookmarked, setBookmarked] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);
  const replayRef = useRef(null);
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { font-family: 'Space Grotesk', sans-serif; background: ${t.bg}; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (isReplaying && selectedIncident) {
      const steps = incidents.find(i => i.id === selectedIncident)?.steps || [];
      if (replayStep < steps.length - 1) {
        replayRef.current = setTimeout(() => setReplayStep(s => s + 1), 900);
      } else {
        setIsReplaying(false);
      }
    }
    return () => clearTimeout(replayRef.current);
  }, [isReplaying, replayStep, selectedIncident]);

  const incident = incidents.find(i => i.id === selectedIncident);
  const filteredIncidents = incidents.filter(inc => {
    const matchSeverity = filterSeverity === 'all' || inc.severity === filterSeverity;
    const matchSearch = !searchQuery || inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || inc.tags.some(t => t.includes(searchQuery.toLowerCase()));
    return matchSeverity && matchSearch;
  });

  const share = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const NavIcon = ({ name, size = 20 }) => {
    const icons = {
      'layout-dashboard': window.lucide?.LayoutDashboard,
      'bug': window.lucide?.Bug,
      'play-circle': window.lucide?.PlayCircle,
      'settings': window.lucide?.Settings,
      'sun': window.lucide?.Sun,
      'moon': window.lucide?.Moon,
      'arrow-left': window.lucide?.ArrowLeft,
      'share-2': window.lucide?.Share2,
      'bookmark': window.lucide?.Bookmark,
      'bookmark-check': window.lucide?.BookmarkCheck,
      'play': window.lucide?.Play,
      'pause': window.lucide?.Pause,
      'rotate-ccw': window.lucide?.RotateCcw,
      'zap': window.lucide?.Zap,
      'users': window.lucide?.Users,
      'wifi': window.lucide?.Wifi,
      'smartphone': window.lucide?.Smartphone,
      'clock': window.lucide?.Clock,
      'filter': window.lucide?.Filter,
      'search': window.lucide?.Search,
      'bell': window.lucide?.Bell,
      'chevron-right': window.lucide?.ChevronRight,
      'check-circle': window.lucide?.CheckCircle,
      'alert-triangle': window.lucide?.AlertTriangle,
      'mic': window.lucide?.Mic,
      'send': window.lucide?.Send,
    };
    const Icon = icons[name];
    if (!Icon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(Icon, { size, strokeWidth: 2 });
  };

  // Status bar
  const StatusBar = () => (
    React.createElement('div', {
      style: {
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px 0 24px', background: t.phoneBg,
      }
    },
      React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, '9:41'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, color: t.text } },
        React.createElement(NavIcon, { name: 'wifi', size: 14 }),
        React.createElement('div', { style: { display: 'flex', gap: 2, alignItems: 'center' } },
          ...[4,3,2,1].map(b => React.createElement('div', {
            key: b,
            style: { width: 3, height: 4+b*2, background: b <= 3 ? t.text : t.textMuted, borderRadius: 1 }
          }))
        ),
        React.createElement('div', {
          style: { width: 22, height: 11, border: `1.5px solid ${t.text}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '0 1.5px', position: 'relative' }
        },
          React.createElement('div', { style: { width: 14, height: 7, background: t.success, borderRadius: 1.5 } }),
          React.createElement('div', { style: { position: 'absolute', right: -4, top: 2.5, width: 2.5, height: 5, background: t.text, borderRadius: 1 } })
        )
      )
    )
  );

  // Dynamic Island
  const DynamicIsland = () => (
    React.createElement('div', {
      style: {
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100,
      }
    })
  );

  // Bottom nav
  const BottomNav = () => {
    const tabs = [
      { id: 'feed', icon: 'layout-dashboard', label: 'Feed' },
      { id: 'incidents', icon: 'bug', label: 'Incidents' },
      { id: 'replay', icon: 'play-circle', label: 'Replay' },
      { id: 'settings', icon: 'settings', label: 'Settings' },
    ];
    return React.createElement('div', {
      style: {
        height: 80, background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 8px 16px',
      }
    },
      tabs.map(tab => {
        const active = activeTab === tab.id;
        const pressed = pressedTab === tab.id;
        return React.createElement('button', {
          key: tab.id,
          onClick: () => { setActiveTab(tab.id); if (tab.id !== 'replay') { setSelectedIncident(null); setIsReplaying(false); setReplayStep(0); } },
          onMouseDown: () => setPressedTab(tab.id),
          onMouseUp: () => setPressedTab(null),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
            transform: pressed ? 'scale(0.9)' : 'scale(1)',
            transition: 'transform 0.1s ease',
          }
        },
          React.createElement('div', {
            style: {
              color: active ? t.primary : t.textMuted,
              transition: 'color 0.2s ease',
            }
          }, React.createElement(NavIcon, { name: tab.icon, size: 22 })),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: active ? 600 : 400,
              color: active ? t.primary : t.textMuted,
              fontFamily: 'Space Grotesk',
              transition: 'color 0.2s ease',
            }
          }, tab.label)
        );
      })
    );
  };

  // Incident card
  const IncidentCard = ({ inc, onPress }) => {
    const sev = severityConfig[inc.severity];
    const isBookmarked = bookmarked.includes(inc.id);
    const [pressed, setPressed] = useState(false);
    return React.createElement('div', {
      onClick: onPress,
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onMouseLeave: () => setPressed(false),
      style: {
        background: t.card, borderRadius: 16, padding: 16,
        border: `1px solid ${t.cardBorder}`,
        marginBottom: 12,
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        boxShadow: pressed ? 'none' : `0 2px 12px ${t.shadow}`,
        cursor: 'pointer',
      }
    },
      // Header row
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 } },
        React.createElement('div', { style: { flex: 1, paddingRight: 8 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
            React.createElement('div', {
              style: {
                background: isDark ? sev.darkBg : sev.bg, color: sev.color,
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.5px',
              }
            }, sev.label),
            inc.status === 'resolved' && React.createElement('div', {
              style: { color: t.success, display: 'flex', alignItems: 'center', gap: 3 }
            }, React.createElement(NavIcon, { name: 'check-circle', size: 12 }))
          ),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.4, fontFamily: 'Space Grotesk' } }, inc.title),
        ),
        React.createElement('div', {
          onClick: e => { e.stopPropagation(); setBookmarked(b => isBookmarked ? b.filter(x => x !== inc.id) : [...b, inc.id]); },
          style: { color: isBookmarked ? t.primary : t.textMuted, padding: 4 }
        }, React.createElement(NavIcon, { name: isBookmarked ? 'bookmark-check' : 'bookmark', size: 18 }))
      ),
      // Meta row
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 10 } },
        React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, inc.app),
        React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, '·'),
        React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk' } }, inc.time),
      ),
      // Tags
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 } },
        inc.tags.map(tag => React.createElement('span', {
          key: tag,
          style: {
            fontSize: 10, background: t.surfaceAlt, color: t.textSecondary,
            padding: '2px 8px', borderRadius: 12, fontFamily: 'Space Grotesk', fontWeight: 500,
          }
        }, `#${tag}`))
      ),
      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: t.textSecondary } },
          React.createElement(NavIcon, { name: 'users', size: 12 }),
          React.createElement('span', { style: { fontSize: 11, fontFamily: 'Space Grotesk' } }, `${inc.affectedUsers.toLocaleString()} affected`)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: t.textSecondary } },
          React.createElement(NavIcon, { name: 'wifi', size: 12 }),
          React.createElement('span', { style: { fontSize: 11, fontFamily: 'Space Grotesk' } }, inc.network)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
          React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.primary } }),
          React.createElement('span', { style: { fontSize: 11, color: t.primary, fontWeight: 600, fontFamily: 'Space Grotesk' } }, `${inc.confidence}% confidence`)
        )
      )
    );
  };

  // Feed Screen
  const FeedScreen = () => (
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 0 12px', marginBottom: 4,
          background: t.phoneBg,
          position: 'sticky', top: 0, zIndex: 10,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, 'TraceNest'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, 'ShopFlow · 4 active incidents')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('div', { style: { position: 'relative' } },
              React.createElement('div', { style: { color: t.textSecondary } }, React.createElement(NavIcon, { name: 'bell', size: 22 })),
              React.createElement('div', { style: { position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: t.error, borderRadius: '50%', border: `2px solid ${t.phoneBg}` } })
            )
          )
        ),
        // Search
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 8,
            background: t.surface, borderRadius: 12, padding: '8px 12px',
            border: `1px solid ${t.cardBorder}`, marginBottom: 10,
          }
        },
          React.createElement('div', { style: { color: t.textMuted } }, React.createElement(NavIcon, { name: 'search', size: 16 })),
          React.createElement('input', {
            placeholder: 'Search incidents, tags...',
            value: searchQuery,
            onChange: e => setSearchQuery(e.target.value),
            style: {
              border: 'none', background: 'none', outline: 'none',
              fontSize: 13, color: t.text, fontFamily: 'Space Grotesk', flex: 1,
            }
          })
        ),
        // Filter chips
        React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto' } },
          ['all', 'critical', 'high', 'medium', 'low'].map(f => (
            React.createElement('button', {
              key: f,
              onClick: () => setFilterSeverity(f),
              style: {
                padding: '4px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'Space Grotesk',
                whiteSpace: 'nowrap',
                background: filterSeverity === f ? t.primary : t.surfaceAlt,
                color: filterSeverity === f ? '#fff' : t.textSecondary,
                transition: 'all 0.2s ease',
              }
            }, f === 'all' ? 'All' : severityConfig[f].label)
          ))
        )
      ),
      // Incident list
      ...filteredIncidents.map(inc => React.createElement(IncidentCard, {
        key: inc.id, inc,
        onPress: () => { setSelectedIncident(inc.id); setActiveTab('incidents'); }
      })),
      filteredIncidents.length === 0 && React.createElement('div', {
        style: { textAlign: 'center', padding: '40px 20px', color: t.textMuted, fontFamily: 'Space Grotesk' }
      }, 'No incidents match your filter')
    )
  );

  // Incident detail screen
  const IncidentScreen = () => {
    if (!incident) return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' }
    },
      React.createElement('div', { style: { padding: '20px 0 12px' } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk', marginBottom: 4 } }, 'Incidents'),
        React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, 'Tap an incident to inspect it'),
      ),
      ...incidents.map(inc => React.createElement(IncidentCard, {
        key: inc.id, inc,
        onPress: () => setSelectedIncident(inc.id)
      }))
    );

    const sev = severityConfig[incident.severity];
    const isBookmarked = bookmarked.includes(incident.id);

    return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' } },
      // Header
      React.createElement('div', {
        style: {
          padding: '12px 16px 0', background: t.phoneBg,
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: `1px solid ${t.divider}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
          React.createElement('button', {
            onClick: () => setSelectedIncident(null),
            style: { background: 'none', border: 'none', cursor: 'pointer', color: t.primary, display: 'flex', alignItems: 'center', gap: 4 }
          },
            React.createElement(NavIcon, { name: 'arrow-left', size: 18 }),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 600, fontFamily: 'Space Grotesk' } }, 'Back')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 12 } },
            React.createElement('button', {
              onClick: () => setBookmarked(b => isBookmarked ? b.filter(x => x !== incident.id) : [...b, incident.id]),
              style: { background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? t.primary : t.textMuted }
            }, React.createElement(NavIcon, { name: isBookmarked ? 'bookmark-check' : 'bookmark', size: 20 })),
            React.createElement('button', {
              onClick: share,
              style: { background: 'none', border: 'none', cursor: 'pointer', color: t.textSecondary }
            }, React.createElement(NavIcon, { name: 'share-2', size: 20 }))
          )
        )
      ),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 16px 24px' } },
        // Title + severity
        React.createElement('div', {
          style: {
            background: isDark ? sev.darkBg : sev.bg,
            borderRadius: 16, padding: 16, marginBottom: 16,
            border: `1px solid ${sev.color}30`,
          }
        },
          React.createElement('div', {
            style: {
              display: 'inline-block', background: sev.color, color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 20,
              fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.5px',
              marginBottom: 8,
            }
          }, sev.label),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk', lineHeight: 1.4, marginBottom: 6 } }, incident.title),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, `${incident.app} · ${incident.time}`)
        ),
        // Device context
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 14, marginBottom: 16, border: `1px solid ${t.cardBorder}` } },
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'Space Grotesk', marginBottom: 12 } }, 'Device Context'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
            [
              { icon: 'smartphone', label: 'Device', value: incident.device },
              { icon: 'wifi', label: 'Network', value: incident.network },
              { icon: 'clock', label: 'Duration', value: incident.duration },
              { icon: 'users', label: 'Affected', value: incident.affectedUsers.toLocaleString() },
            ].map(({ icon, label, value }) => React.createElement('div', { key: label },
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk', marginBottom: 2 } }, label),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: t.text } },
                React.createElement('div', { style: { color: t.primary } }, React.createElement(NavIcon, { name: icon, size: 13 })),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, fontFamily: 'Space Grotesk' } }, value)
              )
            ))
          )
        ),
        // Root cause
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 16, padding: 14, marginBottom: 16,
            border: `1px solid ${t.primary}40`,
            boxShadow: `0 0 20px ${t.primary}15`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
            React.createElement('div', { style: { color: t.primary } }, React.createElement(NavIcon, { name: 'zap', size: 16 })),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'Space Grotesk' } }, 'Root Cause Hypothesis'),
            React.createElement('div', {
              style: {
                marginLeft: 'auto', background: t.primaryLight, color: t.primary,
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12, fontFamily: 'Space Grotesk',
              }
            }, `${incident.confidence}%`)
          ),
          React.createElement('p', { style: { fontSize: 13, color: t.text, lineHeight: 1.6, fontFamily: 'Space Grotesk' } }, incident.rootCause),
        ),
        // Timeline preview
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 14, marginBottom: 16, border: `1px solid ${t.cardBorder}` } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'Space Grotesk' } }, 'Event Timeline'),
            React.createElement('button', {
              onClick: () => { setReplayStep(0); setIsReplaying(false); setActiveTab('replay'); },
              style: {
                background: t.primary, color: '#fff', border: 'none', cursor: 'pointer',
                fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 10,
                fontFamily: 'Space Grotesk', display: 'flex', alignItems: 'center', gap: 4,
              }
            },
              React.createElement(NavIcon, { name: 'play', size: 10 }),
              'Replay'
            )
          ),
          ...incident.steps.slice(0, 3).map((step, i) => {
            const conf = stepTypeConfig[step.type];
            return React.createElement('div', {
              key: i,
              style: { display: 'flex', gap: 10, marginBottom: i < 2 ? 10 : 0, opacity: i === 2 ? 0.5 : 1 }
            },
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
                React.createElement('div', { style: { fontSize: 14 } }, conf.icon),
                i < 2 && React.createElement('div', { style: { width: 1, flex: 1, background: t.divider, marginTop: 4 } })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, step.label),
                React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, fontFamily: 'Space Grotesk', marginTop: 1 } }, step.detail)
              ),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk', paddingTop: 1 } }, step.time)
            );
          }),
          incident.steps.length > 3 && React.createElement('div', {
            style: { textAlign: 'center', marginTop: 10, fontSize: 11, color: t.primary, fontFamily: 'Space Grotesk', fontWeight: 600 }
          }, `+ ${incident.steps.length - 3} more events`)
        ),
        // Quick actions
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: share,
            style: {
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: t.surface, border: `1px solid ${t.cardBorder}`, borderRadius: 14,
              padding: '10px', cursor: 'pointer', color: t.textSecondary, fontFamily: 'Space Grotesk',
              fontSize: 12, fontWeight: 600,
            }
          }, React.createElement(NavIcon, { name: 'send', size: 14 }), 'Share'),
          React.createElement('button', {
            style: {
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: t.surface, border: `1px solid ${t.cardBorder}`, borderRadius: 14,
              padding: '10px', cursor: 'pointer', color: t.textSecondary, fontFamily: 'Space Grotesk',
              fontSize: 12, fontWeight: 600,
            }
          }, React.createElement(NavIcon, { name: 'mic', size: 14 }), 'Voice Note'),
        )
      )
    );
  };

  // Replay screen
  const ReplayScreen = () => {
    const replayIncident = incident || incidents[0];
    const steps = replayIncident.steps;
    const visibleSteps = steps.slice(0, replayStep + 1);
    const sev = severityConfig[replayIncident.severity];

    return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
      // Header
      React.createElement('div', {
        style: { padding: '16px 16px 12px', background: t.phoneBg, borderBottom: `1px solid ${t.divider}` }
      },
        React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk', marginBottom: 2 } }, 'Incident Replay'),
        React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, replayIncident.title),
        // Progress bar
        React.createElement('div', { style: { height: 3, background: t.surfaceAlt, borderRadius: 99, marginTop: 12, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', borderRadius: 99,
              background: t.gradient,
              width: `${((replayStep + 1) / steps.length) * 100}%`,
              transition: 'width 0.4s ease',
            }
          })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 } },
          React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk' } }, `Step ${replayStep + 1} of ${steps.length}`),
          React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk' } }, steps[replayStep].time)
        )
      ),
      // Timeline
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 16px 8px' } },
        ...steps.map((step, i) => {
          const conf = stepTypeConfig[step.type];
          const visible = i <= replayStep;
          const active = i === replayStep;
          return React.createElement('div', {
            key: i,
            style: {
              display: 'flex', gap: 12, marginBottom: 4,
              opacity: visible ? 1 : 0.2,
              transition: 'opacity 0.4s ease',
            }
          },
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 32 } },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: '50%',
                  background: active ? conf.color : (visible ? `${conf.color}30` : t.surfaceAlt),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, transition: 'all 0.3s ease',
                  boxShadow: active ? `0 0 16px ${conf.color}60` : 'none',
                  flexShrink: 0,
                }
              }, step.type === 'crash' ? '💥' : step.type === 'error' ? '⚠️' : step.type === 'flag' ? '🚩' : step.type === 'network' ? '🌐' : '👤'),
              i < steps.length - 1 && React.createElement('div', {
                style: { width: 2, flex: 1, minHeight: 16, background: visible && i < replayStep ? conf.color : t.divider, transition: 'background 0.4s ease', borderRadius: 1, margin: '4px 0' }
              })
            ),
            React.createElement('div', {
              style: {
                flex: 1, background: active ? `${conf.color}15` : 'transparent',
                borderRadius: 12, padding: active ? '10px 12px' : '6px 0',
                border: active ? `1px solid ${conf.color}40` : '1px solid transparent',
                transition: 'all 0.3s ease', marginBottom: 8,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: visible ? t.text : t.textMuted, fontFamily: 'Space Grotesk' } }, step.label),
                React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk' } }, step.time)
              ),
              visible && React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, fontFamily: 'Space Grotesk', marginTop: 3, lineHeight: 1.5 } }, step.detail)
            )
          );
        })
      ),
      // Controls
      React.createElement('div', {
        style: {
          padding: '12px 16px 4px', background: t.phoneBg, borderTop: `1px solid ${t.divider}`,
          display: 'flex', gap: 10, alignItems: 'center',
        }
      },
        React.createElement('button', {
          onClick: () => { setReplayStep(0); setIsReplaying(false); },
          style: {
            width: 40, height: 40, borderRadius: 12,
            background: t.surfaceAlt, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textSecondary,
          }
        }, React.createElement(NavIcon, { name: 'rotate-ccw', size: 16 })),
        React.createElement('button', {
          onClick: () => {
            if (replayStep >= steps.length - 1) { setReplayStep(0); setIsReplaying(true); }
            else setIsReplaying(r => !r);
          },
          style: {
            flex: 1, height: 40, borderRadius: 12,
            background: t.gradient, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 13,
          }
        },
          React.createElement(NavIcon, { name: isReplaying ? 'pause' : 'play', size: 16 }),
          isReplaying ? 'Pause' : replayStep >= steps.length - 1 ? 'Restart' : 'Play'
        ),
        React.createElement('button', {
          onClick: () => setReplayStep(s => Math.min(s + 1, steps.length - 1)),
          disabled: replayStep >= steps.length - 1,
          style: {
            width: 40, height: 40, borderRadius: 12,
            background: t.surfaceAlt, border: 'none', cursor: replayStep >= steps.length - 1 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: replayStep >= steps.length - 1 ? t.textMuted : t.text, opacity: replayStep >= steps.length - 1 ? 0.4 : 1,
          }
        }, React.createElement(NavIcon, { name: 'chevron-right', size: 16 })),
      )
    );
  };

  // Settings screen
  const SettingsScreen = () => {
    const sections = [
      {
        title: 'Account',
        items: [
          { label: 'Developer Profile', sub: 'alex@shopflow.io', icon: 'users' },
          { label: 'Notifications', sub: 'Critical & High only', icon: 'bell' },
        ]
      },
      {
        title: 'Connected Apps',
        items: [
          { label: 'ShopFlow iOS', sub: 'v3.4.1 · Sentry + Datadog', icon: 'smartphone' },
          { label: 'ShopFlow Android', sub: 'v3.3.9 · Firebase', icon: 'smartphone' },
        ]
      },
      {
        title: 'Preferences',
        items: [
          { label: 'Auto-replay on open', sub: 'Replay incident on detail view', icon: 'play-circle', toggle: true, value: true },
          { label: 'Root cause hints', sub: 'AI-generated hypotheses', icon: 'zap', toggle: true, value: true },
        ]
      }
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 24px' } },
      // Header with theme toggle
      React.createElement('div', {
        style: { padding: '16px 0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, 'Settings'),
        React.createElement('button', {
          onClick: () => setIsDark(d => !d),
          style: {
            width: 40, height: 40, borderRadius: 12,
            background: isDark ? t.primaryLight : t.surfaceAlt,
            border: `1px solid ${isDark ? t.primary + '40' : t.cardBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: isDark ? t.primary : t.textSecondary,
            transition: 'all 0.3s ease',
          }
        }, React.createElement(NavIcon, { name: isDark ? 'sun' : 'moon', size: 18 }))
      ),
      // Profile card
      React.createElement('div', {
        style: {
          background: t.gradient, borderRadius: 20, padding: 20, marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 14,
        }
      },
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: 'Space Grotesk',
          }
        }, 'AK'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'Space Grotesk' } }, 'Alex Kim'),
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Space Grotesk' } }, 'Senior Mobile Engineer'),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'Space Grotesk', marginTop: 2 } }, 'ShopFlow · Pro Plan')
        )
      ),
      // Stats row
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 20 }
      },
        [
          { label: 'Incidents', value: '127' },
          { label: 'Resolved', value: '94' },
          { label: 'Bookmarked', value: bookmarked.length.toString() },
        ].map(({ label, value }) => React.createElement('div', {
          key: label,
          style: {
            flex: 1, background: t.card, borderRadius: 14, padding: '12px 10px',
            border: `1px solid ${t.cardBorder}`, textAlign: 'center',
          }
        },
          React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.primary, fontFamily: 'Space Grotesk' } }, value),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 2 } }, label)
        ))
      ),
      // Setting sections
      ...sections.map(section => React.createElement('div', { key: section.title, style: { marginBottom: 16 } },
        React.createElement('div', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'Space Grotesk', marginBottom: 8, paddingLeft: 4 }
        }, section.title),
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }
        },
          ...section.items.map((item, i) => React.createElement('div', {
            key: item.label,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px',
              borderBottom: i < section.items.length - 1 ? `1px solid ${t.divider}` : 'none',
            }
          },
            React.createElement('div', {
              style: { width: 34, height: 34, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary, flexShrink: 0 }
            }, React.createElement(NavIcon, { name: item.icon, size: 16 })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, item.label),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 1 } }, item.sub)
            ),
            item.toggle ?
              React.createElement('div', {
                style: {
                  width: 40, height: 22, borderRadius: 11,
                  background: item.value ? t.primary : t.surfaceAlt,
                  display: 'flex', alignItems: 'center', padding: '0 2px',
                  cursor: 'pointer', transition: 'background 0.2s ease',
                }
              },
                React.createElement('div', {
                  style: {
                    width: 18, height: 18, borderRadius: '50%', background: '#fff',
                    marginLeft: item.value ? 'auto' : 0, transition: 'margin 0.2s ease',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }
                })
              ) :
              React.createElement('div', { style: { color: t.textMuted } }, React.createElement(NavIcon, { name: 'chevron-right', size: 16 }))
          ))
        )
      )),
      // Theme indicator
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: 14, border: `1px solid ${t.cardBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, isDark ? 'Dark Mode' : 'Light Mode'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 1 } }, 'Tap to switch theme')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(d => !d),
          style: {
            display: 'flex', alignItems: 'center', gap: 6,
            background: t.gradient, border: 'none', borderRadius: 12, padding: '8px 14px',
            cursor: 'pointer', color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 12,
          }
        },
          React.createElement(NavIcon, { name: isDark ? 'sun' : 'moon', size: 14 }),
          isDark ? 'Light' : 'Dark'
        )
      )
    );
  };

  const screens = { feed: FeedScreen, incidents: IncidentScreen, replay: ReplayScreen, settings: SettingsScreen };
  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: t.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, fontFamily: 'Space Grotesk, sans-serif',
      transition: 'background 0.3s ease',
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.phoneBg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: `0 40px 120px rgba(0,0,0,0.25), 0 0 0 10px ${isDark ? '#1A1D26' : '#E0E0E0'}, 0 0 0 11px ${isDark ? '#2A2D3E' : '#C8C8C8'}`,
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s ease',
      }
    },
      React.createElement(DynamicIsland),
      React.createElement(StatusBar),
      React.createElement(ActiveScreen),
      React.createElement(BottomNav),
      // Share toast
      showShareToast && React.createElement('div', {
        style: {
          position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
          background: t.text, color: t.phoneBg, padding: '8px 20px', borderRadius: 99,
          fontSize: 12, fontWeight: 600, fontFamily: 'Space Grotesk',
          boxShadow: `0 4px 20px ${t.shadow}`,
          animation: 'none',
          zIndex: 1000,
        }
      }, 'Diagnostic snapshot shared!')
    )
  );
}
