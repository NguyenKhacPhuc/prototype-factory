const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#EDF2F0',
    surface: '#FFFFFF',
    surfaceAlt: '#F4F8F6',
    surfaceCard: '#FFFFFF',
    border: '#D8E8E2',
    text: '#1A2E28',
    textSub: '#4A6B61',
    textMuted: '#8AADA4',
    primary: '#2BB896',
    primaryLight: '#E0F5EF',
    primaryDark: '#1D9478',
    accent: '#FF8C61',
    accentLight: '#FFF0E8',
    danger: '#F45B69',
    warn: '#F5A623',
    warnLight: '#FFF7E6',
    success: '#2BB896',
    navBg: '#FFFFFF',
    mapBg: '#D6E8E0',
    mapPath: '#2BB896',
    mapPathAlt: '#8AADA4',
    statusBar: 'rgba(255,255,255,0.95)',
    shadow: 'rgba(43,184,150,0.15)',
    overlay: 'rgba(26,46,40,0.5)',
  },
  dark: {
    bg: '#0A1A16',
    surface: '#112520',
    surfaceAlt: '#162E28',
    surfaceCard: '#1C3530',
    border: '#244840',
    text: '#E8F5F0',
    textSub: '#7DBFB0',
    textMuted: '#456B62',
    primary: '#2BB896',
    primaryLight: '#1A3D35',
    primaryDark: '#3DD4AE',
    accent: '#FF8C61',
    accentLight: '#3A2218',
    danger: '#F45B69',
    warn: '#F5A623',
    warnLight: '#2A2110',
    success: '#2BB896',
    navBg: '#112520',
    mapBg: '#162E28',
    mapPath: '#2BB896',
    mapPathAlt: '#456B62',
    statusBar: 'rgba(17,37,32,0.95)',
    shadow: 'rgba(0,0,0,0.4)',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('map');
  const [pressed, setPressed] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [showRouteSheet, setShowRouteSheet] = useState(false);
  const [profileToggle, setProfileToggle] = useState({ lowNoise: true, lowCrowd: false, stroller: false, lighting: true, accessibility: false });
  const [sensitivityLevel, setSensitivityLevel] = useState(2);
  const [communityFilter, setCommunityFilter] = useState('all');
  const [reportPressed, setReportPressed] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const t = themes[theme];

  const routes = [
    {
      id: 0,
      name: 'Calm Route',
      duration: '22 min',
      distance: '1.4 km',
      calmScore: 91,
      highlights: ['Quiet side streets', 'Park shortcut', '2 rest benches'],
      tags: ['Low noise', 'Open paths'],
      color: t.primary,
      steps: ['Head north on Elm St', 'Turn left onto Park Ave', 'Walk through Riverside Park', 'Arrive at destination'],
    },
    {
      id: 1,
      name: 'Balanced Route',
      duration: '17 min',
      distance: '1.1 km',
      calmScore: 64,
      highlights: ['Moderate foot traffic', 'Good lighting', '1 busy crossing'],
      tags: ['Mixed', 'Shorter'],
      color: t.warn,
      steps: ['Head east on Main St', 'Cross Market Square', 'Turn right on Oak Blvd', 'Arrive at destination'],
    },
    {
      id: 2,
      name: 'Fastest Route',
      duration: '13 min',
      distance: '0.9 km',
      calmScore: 32,
      highlights: ['Festival zone nearby', 'Crowded sidewalks', 'Loud intersection'],
      tags: ['High stimulus', 'Fast'],
      color: t.danger,
      steps: ['Head south on Broadway', 'Cross Festival Plaza', 'Turn on Commerce St', 'Arrive at destination'],
    },
  ];

  const communityReports = [
    { id: 1, type: 'noise', icon: 'Volume2', label: 'Loud construction', location: 'Park Ave & 5th St', time: '10 min ago', votes: 14, color: t.danger },
    { id: 2, type: 'crowd', icon: 'Users', label: 'Festival crowd', location: 'Market Square', time: '22 min ago', votes: 31, color: t.warn },
    { id: 3, type: 'calm', icon: 'Leaf', label: 'New quiet path', location: 'Riverside Walk', time: '1 hr ago', votes: 22, color: t.primary },
    { id: 4, type: 'access', icon: 'PersonStanding', label: 'Broken curb cut', location: 'Oak Blvd & 3rd', time: '2 hr ago', votes: 8, color: t.accent },
    { id: 5, type: 'light', icon: 'Sun', label: 'Poor lighting', location: 'Elm St underpass', time: '3 hr ago', votes: 17, color: '#A78BFA' },
    { id: 6, type: 'calm', icon: 'Wind', label: 'Calm detour open', location: 'Cedar Lane', time: '4 hr ago', votes: 9, color: t.primary },
  ];

  const filteredReports = communityFilter === 'all' ? communityReports : communityReports.filter(r => r.type === communityFilter);

  const CalmScoreRing = ({ score, size = 64, stroke = 5 }) => {
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const pct = (score / 100) * circ;
    const scoreColor = score >= 75 ? t.primary : score >= 50 ? t.warn : t.danger;
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.border} strokeWidth={stroke} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={scoreColor} strokeWidth={stroke}
            strokeDasharray={`${pct} ${circ}`} strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
          <div style={{ fontSize: size > 50 ? 16 : 11, fontWeight: 700, color: scoreColor, lineHeight: 1 }}>{score}</div>
          {size > 50 && <div style={{ fontSize: 8, color: t.textMuted, fontWeight: 500 }}>calm</div>}
        </div>
      </div>
    );
  };

  const Icon = ({ name, size = 20, color, style = {} }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return <span style={{ width: size, height: size, display: 'inline-block' }} />;
    return <LucideIcon size={size} color={color || t.text} style={style} />;
  };

  const TabBtn = ({ id, icon, label }) => {
    const active = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0 2px',
          transition: 'all 0.2s',
        }}
      >
        <div style={{
          width: 40, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: active ? t.primaryLight : 'transparent',
          transition: 'all 0.25s',
        }}>
          <Icon name={icon} size={19} color={active ? t.primary : t.textMuted} />
        </div>
        <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>
          {label}
        </span>
      </button>
    );
  };

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12, background: value ? t.primary : t.border,
        position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: value ? 23 : 3, width: 18, height: 18,
        borderRadius: 9, background: '#fff', transition: 'left 0.3s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );

  // ---- MAP SCREEN ----
  const MapScreen = () => {
    const MapSVG = () => (
      <svg width="375" height="420" viewBox="0 0 375 420" style={{ display: 'block' }}>
        <rect width="375" height="420" fill={t.mapBg} />
        {/* Grid lines */}
        {[60,120,180,240,300,360].map(x => <line key={x} x1={x} y1="0" x2={x} y2="420" stroke={theme === 'light' ? '#C5DDD5' : '#1E3D35'} strokeWidth="1"/>)}
        {[60,120,180,240,300,360,420].map(y => <line key={y} x1="0" y1={y} x2="375" y2={y} stroke={theme === 'light' ? '#C5DDD5' : '#1E3D35'} strokeWidth="1"/>)}
        {/* Streets */}
        <rect x="0" y="150" width="375" height="22" fill={theme === 'light' ? '#B8D4C8' : '#1A3A30'} />
        <rect x="0" y="260" width="375" height="18" fill={theme === 'light' ? '#B8D4C8' : '#1A3A30'} />
        <rect x="80" y="0" width="20" height="420" fill={theme === 'light' ? '#B8D4C8' : '#1A3A30'} />
        <rect x="200" y="0" width="22" height="420" fill={theme === 'light' ? '#B8D4C8' : '#1A3A30'} />
        <rect x="300" y="0" width="18" height="420" fill={theme === 'light' ? '#B8D4C8' : '#1A3A30'} />
        {/* Park */}
        <rect x="100" y="180" width="90" height="70" rx="8" fill={theme === 'light' ? '#A8D4B8' : '#1A4030'} />
        <circle cx="130" cy="205" r="12" fill={theme === 'light' ? '#7BC49A' : '#1E5038'} />
        <circle cx="160" cy="210" r="9" fill={theme === 'light' ? '#7BC49A' : '#1E5038'} />
        <circle cx="150" cy="198" r="7" fill={theme === 'light' ? '#7BC49A' : '#1E5038'} />
        <text x="130" y="248" textAnchor="middle" fontSize="9" fill={theme === 'light' ? '#4A8060' : '#5AB880'} fontFamily="Plus Jakarta Sans" fontWeight="600">Riverside Park</text>
        {/* Buildings */}
        <rect x="30" y="60" width="40" height="80" rx="3" fill={theme === 'light' ? '#C8DDD8' : '#1C3830'} />
        <rect x="230" y="80" width="55" height="60" rx="3" fill={theme === 'light' ? '#C8DDD8' : '#1C3830'} />
        <rect x="230" y="290" width="60" height="70" rx="3" fill={theme === 'light' ? '#C8DDD8' : '#1C3830'} />
        <rect x="30" y="290" width="45" height="60" rx="3" fill={theme === 'light' ? '#C8DDD8' : '#1C3830'} />
        {/* Calm route path */}
        <polyline points="187,380 187,270 100,270 100,200 100,165 187,165 187,80"
          fill="none" stroke={t.primary} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="8 4" opacity="0.85" />
        {/* Destination */}
        <circle cx="187" cy="72" r="10" fill={t.primary} />
        <circle cx="187" cy="72" r="5" fill="#fff" />
        {/* User location */}
        <circle cx="187" cy="385" r="14" fill={t.primary} opacity="0.2" />
        <circle cx="187" cy="385" r="8" fill={t.primary} />
        <circle cx="187" cy="385" r="4" fill="#fff" />
        {/* Noise alert marker */}
        <circle cx="255" cy="161" r="12" fill={t.danger} opacity="0.9" />
        <text x="255" y="166" textAnchor="middle" fontSize="11" fill="#fff">!</text>
        {/* Calm bench marker */}
        <circle cx="100" cy="245" r="9" fill={t.primary} opacity="0.9" />
        <text x="100" y="249" textAnchor="middle" fontSize="8" fill="#fff">B</text>
        {/* Street labels */}
        <text x="187" y="145" textAnchor="middle" fontSize="8" fill={t.textMuted} fontFamily="Plus Jakarta Sans">Elm Street</text>
        <text x="187" y="255" textAnchor="middle" fontSize="8" fill={t.textMuted} fontFamily="Plus Jakarta Sans">Park Avenue</text>
        <text x="60" y="120" textAnchor="middle" fontSize="8" fill={t.textMuted} fontFamily="Plus Jakarta Sans" transform="rotate(-90,60,120)">Cedar Ln</text>
      </svg>
    );

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* Search bar */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 10 }}>
          <div style={{
            background: t.surface, borderRadius: 16, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: `0 4px 20px ${t.shadow}`,
            border: `1px solid ${t.border}`,
          }}>
            <Icon name="Search" size={16} color={t.textMuted} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 500, marginBottom: 1 }}>Navigating to</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Westside Community Center</div>
            </div>
            <div style={{ background: t.primaryLight, borderRadius: 10, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="Leaf" size={12} color={t.primary} />
              <span style={{ fontSize: 11, fontWeight: 700, color: t.primary }}>Calm</span>
            </div>
          </div>
        </div>
        {/* Map */}
        <div style={{ flex: 1, overflow: 'hidden' }}><MapSVG /></div>
        {/* Live status strip */}
        <div style={{ position: 'absolute', top: 82, left: 12, zIndex: 10 }}>
          <div style={{
            background: t.danger, borderRadius: 10, padding: '5px 10px',
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: `0 2px 10px rgba(244,91,105,0.35)`,
          }}>
            <Icon name="AlertCircle" size={13} color="#fff" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>Noise alert rerouted — Broadway avoided</span>
          </div>
        </div>
        {/* Calm score pill */}
        <div style={{ position: 'absolute', top: 82, right: 12, zIndex: 10 }}>
          <div style={{
            background: t.surface, borderRadius: 14, padding: '6px 10px',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: `0 2px 12px ${t.shadow}`,
            border: `1px solid ${t.border}`,
          }}>
            <CalmScoreRing score={91} size={40} stroke={4} />
            <div>
              <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 600 }}>CALM SCORE</div>
              <div style={{ fontSize: 11, color: t.text, fontWeight: 600 }}>Excellent</div>
            </div>
          </div>
        </div>
        {/* Bottom route card */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          background: t.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24,
          padding: '16px 16px 8px',
          boxShadow: `0 -4px 24px ${t.shadow}`,
          border: `1px solid ${t.border}`,
          borderBottom: 'none',
        }}>
          <div style={{ width: 36, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 14px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>22 min <span style={{ fontWeight: 400, color: t.textMuted, fontSize: 14 }}>· 1.4 km</span></div>
              <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>Arriving at 4:47 PM · Calm Route active</div>
            </div>
            <button
              onClick={() => setNavigating(!navigating)}
              style={{
                background: navigating ? t.danger : t.primary, color: '#fff',
                border: 'none', borderRadius: 14, padding: '10px 18px',
                fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
                boxShadow: `0 4px 12px ${navigating ? 'rgba(244,91,105,0.4)' : t.shadow}`,
                transition: 'all 0.2s',
              }}
            >
              {navigating ? 'Stop' : 'Start'}
            </button>
          </div>
          {navigating && (
            <div style={{ background: t.primaryLight, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="Navigation" size={16} color={t.primary} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>Head north on Elm Street</div>
                <div style={{ fontSize: 11, color: t.textSub }}>Then turn left onto Park Avenue in 200m</div>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {[
              { icon: 'Volume1', label: 'Quiet', active: true },
              { icon: 'Users', label: 'Low crowd', active: true },
              { icon: 'Lamp', label: 'Well lit', active: true },
              { icon: 'Wind', label: 'Open', active: false },
            ].map(tag => (
              <div key={tag.label} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: tag.active ? t.primaryLight : t.surfaceAlt,
                borderRadius: 8, padding: '4px 8px',
                border: `1px solid ${tag.active ? t.primary + '40' : t.border}`,
              }}>
                <Icon name={tag.icon} size={11} color={tag.active ? t.primary : t.textMuted} />
                <span style={{ fontSize: 10, fontWeight: 600, color: tag.active ? t.primary : t.textMuted }}>{tag.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ---- ROUTES SCREEN ----
  const RoutesScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 4 }}>Choose Your Route</div>
      <div style={{ fontSize: 12, color: t.textSub, marginBottom: 16 }}>
        <Icon name="MapPin" size={11} color={t.textMuted} style={{ verticalAlign: 'middle', marginRight: 3 }} />
        To: Westside Community Center
      </div>
      {/* Profile active */}
      <div style={{ background: t.primaryLight, borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, border: `1px solid ${t.primary}30` }}>
        <Icon name="UserCheck" size={15} color={t.primary} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>Low-Noise Profile active</span>
          <span style={{ fontSize: 11, color: t.textSub }}> · routes scored for your sensitivity</span>
        </div>
        <Icon name="Settings2" size={14} color={t.textMuted} />
      </div>
      {routes.map((route, i) => (
        <div
          key={route.id}
          onClick={() => setSelectedRoute(i)}
          style={{
            background: selectedRoute === i ? (route.id === 0 ? t.primaryLight : route.id === 1 ? t.warnLight : '#FEE8EA') : t.surface,
            borderRadius: 18, padding: '14px 16px', marginBottom: 12, cursor: 'pointer',
            border: `2px solid ${selectedRoute === i ? route.color : t.border}`,
            transition: 'all 0.2s',
            boxShadow: selectedRoute === i ? `0 4px 16px ${route.color}25` : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{route.name}</div>
                {i === 0 && <div style={{ background: t.primary, color: '#fff', fontSize: 9, fontWeight: 700, borderRadius: 6, padding: '2px 6px' }}>RECOMMENDED</div>}
              </div>
              <div style={{ fontSize: 13, color: t.textSub, fontWeight: 500 }}>
                {route.duration} · {route.distance}
              </div>
            </div>
            <CalmScoreRing score={route.calmScore} size={52} stroke={4} />
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {route.tags.map(tag => (
              <div key={tag} style={{ background: route.color + '20', borderRadius: 7, padding: '3px 8px', border: `1px solid ${route.color}40` }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: route.color }}>{tag}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {route.highlights.map((h, hi) => (
              <div key={hi} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: route.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: t.textSub }}>{h}</span>
              </div>
            ))}
          </div>
          {selectedRoute === i && (
            <div style={{ marginTop: 12, borderTop: `1px solid ${route.color}25`, paddingTop: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, marginBottom: 6 }}>TURN-BY-TURN</div>
              {route.steps.map((step, si) => (
                <div key={si} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: route.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>{si + 1}</span>
                  </div>
                  <span style={{ fontSize: 11, color: t.textSub, lineHeight: 1.4 }}>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button style={{
        width: '100%', background: t.primary, color: '#fff', border: 'none',
        borderRadius: 16, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
        fontFamily: 'Plus Jakarta Sans', boxShadow: `0 6px 20px ${t.shadow}`,
      }}>
        Start {routes[selectedRoute].name}
      </button>
    </div>
  );

  // ---- PROFILE SCREEN ----
  const ProfileScreen = () => {
    const levels = ['Minimal', 'Low', 'Moderate', 'High', 'Extreme'];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>My Profile</div>
            <div style={{ fontSize: 12, color: t.textSub }}>Personalize your comfort map</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${t.primary}30` }}>
            <Icon name="User" size={20} color={t.primary} />
          </div>
        </div>
        {/* Sensitivity slider */}
        <div style={{ background: t.surface, borderRadius: 18, padding: '14px 16px', marginBottom: 12, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }}>Sensitivity Level</div>
          <div style={{ fontSize: 11, color: t.textSub, marginBottom: 12 }}>Higher = calmer routes prioritized</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {levels.map((lv, i) => (
              <button
                key={lv}
                onClick={() => setSensitivityLevel(i)}
                style={{
                  flex: 1, background: sensitivityLevel === i ? t.primary : t.surfaceAlt,
                  color: sensitivityLevel === i ? '#fff' : t.textMuted,
                  border: `1px solid ${sensitivityLevel === i ? t.primary : t.border}`,
                  borderRadius: 10, padding: '6px 0', fontSize: 9, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', transition: 'all 0.2s',
                }}
              >
                {lv}
              </button>
            ))}
          </div>
        </div>
        {/* Preferences */}
        <div style={{ background: t.surface, borderRadius: 18, padding: '14px 16px', marginBottom: 12, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Route Preferences</div>
          {[
            { key: 'lowNoise', icon: 'Volume1', label: 'Avoid noisy streets', sub: 'Routes scored for ambient sound' },
            { key: 'lowCrowd', icon: 'Users', label: 'Avoid crowds', sub: 'Prefer low foot traffic paths' },
            { key: 'stroller', icon: 'Baby', label: 'Stroller-friendly', sub: 'Smooth pavements & curb cuts' },
            { key: 'lighting', icon: 'Sun', label: 'Prefer well-lit paths', sub: 'After-dark safety routing' },
            { key: 'accessibility', icon: 'Accessibility', label: 'Accessibility mode', sub: 'Avoid stairs & rough terrain' },
          ].map(pref => (
            <div key={pref.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: profileToggle[pref.key] ? t.primaryLight : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={pref.icon} size={17} color={profileToggle[pref.key] ? t.primary : t.textMuted} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{pref.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{pref.sub}</div>
                </div>
              </div>
              <Toggle value={profileToggle[pref.key]} onChange={v => setProfileToggle(p => ({ ...p, [pref.key]: v }))} />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="BellOff" size={17} color={t.textMuted} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Quiet notifications</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>Minimal interruptions during nav</div>
              </div>
            </div>
            <Toggle value={false} onChange={() => {}} />
          </div>
        </div>
        {/* Theme toggle */}
        <div style={{ background: t.surface, borderRadius: 18, padding: '14px 16px', marginBottom: 12, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Appearance</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={theme === 'dark' ? 'Moon' : 'Sun'} size={17} color={t.primary} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>Switch app appearance</div>
              </div>
            </div>
            <Toggle value={theme === 'dark'} onChange={v => setTheme(v ? 'dark' : 'light')} />
          </div>
        </div>
        {/* Stats */}
        <div style={{ background: t.primaryLight, borderRadius: 18, padding: '14px 16px', border: `1px solid ${t.primary}30` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.primary, marginBottom: 12 }}>Your Journey Stats</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Calm trips', value: '47', icon: 'Leaf' },
              { label: 'Avg calm score', value: '83', icon: 'Activity' },
              { label: 'Loud areas avoided', value: '112', icon: 'VolumeX' },
              { label: 'Reports filed', value: '8', icon: 'Flag' },
            ].map(stat => (
              <div key={stat.label} style={{ background: t.surface, borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Icon name={stat.icon} size={13} color={t.primary} />
                  <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{stat.label.toUpperCase()}</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ---- COMMUNITY SCREEN ----
  const CommunityScreen = () => {
    const filters = [
      { key: 'all', label: 'All' },
      { key: 'noise', label: 'Noise' },
      { key: 'crowd', label: 'Crowds' },
      { key: 'calm', label: 'Calm spots' },
      { key: 'access', label: 'Access' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Community Map</div>
            <div style={{ fontSize: 12, color: t.textSub }}>Real-time reports from nearby walkers</div>
          </div>
          <div style={{ background: t.primaryLight, borderRadius: 10, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: t.primary, animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: t.primary }}>LIVE</span>
          </div>
        </div>
        {/* Report button */}
        <button
          onMouseDown={() => setReportPressed(true)}
          onMouseUp={() => { setReportPressed(false); setFeedbackSent(true); setTimeout(() => setFeedbackSent(false), 2500); }}
          style={{
            width: '100%', background: feedbackSent ? t.primary : (reportPressed ? t.primaryDark : t.surface),
            color: feedbackSent ? '#fff' : t.primary, border: `2px dashed ${t.primary}`,
            borderRadius: 14, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.2s', marginBottom: 14,
          }}
        >
          <Icon name={feedbackSent ? 'Check' : 'Plus'} size={16} color={feedbackSent ? '#fff' : t.primary} />
          {feedbackSent ? 'Report submitted — thank you!' : 'Report something on your route'}
        </button>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setCommunityFilter(f.key)}
              style={{
                flexShrink: 0, background: communityFilter === f.key ? t.primary : t.surface,
                color: communityFilter === f.key ? '#fff' : t.textSub,
                border: `1px solid ${communityFilter === f.key ? t.primary : t.border}`,
                borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        {/* Reports */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredReports.map(report => (
            <div key={report.id} style={{
              background: t.surface, borderRadius: 16, padding: '12px 14px',
              border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: report.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={report.icon} size={18} color={report.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>{report.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  <Icon name="MapPin" size={10} color={t.textMuted} />
                  <span style={{ fontSize: 11, color: t.textMuted }}>{report.location}</span>
                  <span style={{ fontSize: 11, color: t.border }}>·</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{report.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.surfaceAlt, borderRadius: 8, padding: '3px 8px' }}>
                    <Icon name="ThumbsUp" size={11} color={t.textMuted} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: t.textSub }}>{report.votes}</span>
                  </div>
                  <button style={{ background: 'none', border: 'none', fontSize: 11, color: report.color, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', padding: 0 }}>
                    + Confirm
                  </button>
                  <button style={{ background: 'none', border: 'none', fontSize: 11, color: t.textMuted, fontWeight: 500, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', padding: 0 }}>
                    Navigate around
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Community stats */}
        <div style={{ background: t.surfaceAlt, borderRadius: 16, padding: '12px 14px', marginTop: 14, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, marginBottom: 8 }}>THIS WEEK IN YOUR AREA</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.primary }}>234</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>reports filed</div>
            </div>
            <div style={{ width: 1, background: t.border }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>1.2k</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>calmer trips</div>
            </div>
            <div style={{ width: 1, background: t.border }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.accent }}>87%</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>accuracy rate</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'map', icon: 'Navigation', label: 'Navigate' },
    { id: 'routes', icon: 'GitBranch', label: 'Routes' },
    { id: 'community', icon: 'MessageSquare', label: 'Community' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#e8ecea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <style>{`
        ${fontLink}
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 52, overflow: 'hidden',
        background: t.bg, display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1a, 0 0 0 12px #2a2a2a',
        position: 'relative',
      }}>
        {/* Status bar */}
        <div style={{
          height: 50, background: activeTab === 'map' ? 'transparent' : t.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px 0 20px', flexShrink: 0, zIndex: 20,
          borderBottom: activeTab !== 'map' ? `1px solid ${t.border}` : 'none',
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: activeTab === 'map' ? '#fff' : t.text, textShadow: activeTab === 'map' ? '0 1px 4px rgba(0,0,0,0.4)' : 'none' }}>4:25</span>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {navigating && activeTab === 'map' ? (
              <>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: t.primary }} />
                <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>Navigating · 22 min</span>
              </>
            ) : (
              <div style={{ width: 10, height: 10, borderRadius: 5, background: '#1a1a1a', border: '2px solid #333' }} />
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="Wifi" size={13} color={activeTab === 'map' ? '#fff' : t.text} />
            <Icon name="Battery" size={15} color={activeTab === 'map' ? '#fff' : t.text} />
          </div>
        </div>
        {/* Screen content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {activeTab === 'map' && <MapScreen />}
          {activeTab === 'routes' && <RoutesScreen />}
          {activeTab === 'community' && <CommunityScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </div>
        {/* Nav bar */}
        <div style={{
          height: 72, background: t.navBg, display: 'flex', alignItems: 'center',
          borderTop: `1px solid ${t.border}`, flexShrink: 0, paddingBottom: 8,
          boxShadow: `0 -4px 20px ${t.shadow}`,
        }}>
          {tabs.map(tab => <TabBtn key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} />)}
        </div>
      </div>
    </div>
  );
}
