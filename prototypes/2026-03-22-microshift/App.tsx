const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080C14',
    surface: '#0F1623',
    surface2: '#161E2E',
    surface3: '#1C2740',
    card: '#111827',
    border: '#1F2D45',
    text: '#F0F4FF',
    textSub: '#8A9BB5',
    textMuted: '#4A5A72',
    primary: '#00D4FF',
    primaryDim: '#00D4FF22',
    primaryGlow: '#00D4FF44',
    accent: '#7C4DFF',
    accentDim: '#7C4DFF22',
    warning: '#FFB347',
    warningDim: '#FFB34722',
    danger: '#FF4D6B',
    dangerDim: '#FF4D6B22',
    success: '#00E5A0',
    successDim: '#00E5A022',
    navBg: '#0A0F1A',
    statusBar: '#060A10',
  },
  light: {
    bg: '#EDF2F7',
    surface: '#FFFFFF',
    surface2: '#F7FAFC',
    surface3: '#EBF0F7',
    card: '#FFFFFF',
    border: '#D5E0F0',
    text: '#0D1B2E',
    textSub: '#4A6080',
    textMuted: '#8A9BB5',
    primary: '#0099CC',
    primaryDim: '#0099CC18',
    primaryGlow: '#0099CC33',
    accent: '#6030E0',
    accentDim: '#6030E018',
    warning: '#E07000',
    warningDim: '#E0700018',
    danger: '#D93050',
    dangerDim: '#D9305018',
    success: '#008060',
    successDim: '#00806018',
    navBg: '#FFFFFF',
    statusBar: '#F0F5FA',
  }
};

function App() {
  const [themeKey, setThemeKey] = useState('dark');
  const [activeTab, setActiveTab] = useState('now');
  const [pressedBtn, setPressedBtn] = useState(null);
  const T = themes[themeKey];

  // Load Space Grotesk font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`;
    document.head.appendChild(style);
  }, []);

  const handlePress = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    if (fn) fn();
  };

  const tabs = [
    { id: 'now', icon: 'MapPin', label: 'Now' },
    { id: 'routes', icon: 'Navigation', label: 'Routes' },
    { id: 'events', icon: 'Calendar', label: 'Events' },
    { id: 'reports', icon: 'Radio', label: 'Reports' },
    { id: 'settings', icon: 'SlidersHorizontal', label: 'Settings' },
  ];

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: "'Space Grotesk', sans-serif",
  };

  const phoneStyle = {
    width: 375,
    height: 812,
    backgroundColor: T.bg,
    borderRadius: 48,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: themeKey === 'dark'
      ? '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)'
      : '0 40px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle}>
      <div style={phoneStyle}>
        <StatusBar T={T} themeKey={themeKey} setThemeKey={setThemeKey} />
        <DynamicIsland T={T} />
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
          {activeTab === 'now' && <NowScreen T={T} themeKey={themeKey} handlePress={handlePress} pressedBtn={pressedBtn} />}
          {activeTab === 'routes' && <RoutesScreen T={T} handlePress={handlePress} pressedBtn={pressedBtn} />}
          {activeTab === 'events' && <EventsScreen T={T} handlePress={handlePress} pressedBtn={pressedBtn} />}
          {activeTab === 'reports' && <ReportsScreen T={T} handlePress={handlePress} pressedBtn={pressedBtn} />}
          {activeTab === 'settings' && <SettingsScreen T={T} themeKey={themeKey} setThemeKey={setThemeKey} handlePress={handlePress} pressedBtn={pressedBtn} />}
        </div>
        <BottomNav T={T} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} handlePress={handlePress} pressedBtn={pressedBtn} />
      </div>
    </div>
  );
}

function StatusBar({ T, themeKey, setThemeKey }) {
  const WifiIcon = window.lucide?.Wifi;
  const BatteryIcon = window.lucide?.Battery;
  const SignalIcon = window.lucide?.Signal;

  return (
    <div style={{
      backgroundColor: T.statusBar,
      paddingTop: 14,
      paddingBottom: 4,
      paddingHorizontal: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 24,
      zIndex: 10,
      flexShrink: 0,
    }}>
      <span style={{ color: T.text, fontSize: 13, fontWeight: 600, letterSpacing: 0.2 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {SignalIcon && <SignalIcon size={14} color={T.text} strokeWidth={2} />}
        {WifiIcon && <WifiIcon size={14} color={T.text} strokeWidth={2} />}
        {BatteryIcon && <BatteryIcon size={14} color={T.text} strokeWidth={2} />}
      </div>
    </div>
  );
}

function DynamicIsland({ T }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: T.statusBar,
      paddingBottom: 8,
      flexShrink: 0,
    }}>
      <div style={{
        width: 120,
        height: 34,
        backgroundColor: '#000',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00D4FF22', border: '1px solid #00D4FF44' }} />
      </div>
    </div>
  );
}

function BottomNav({ T, tabs, activeTab, setActiveTab, handlePress, pressedBtn }) {
  return (
    <div style={{
      backgroundColor: T.navBg,
      borderTop: `1px solid ${T.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 10,
      paddingBottom: 20,
      flexShrink: 0,
    }}>
      {tabs.map(tab => {
        const Icon = window.lucide?.[tab.icon];
        const isActive = activeTab === tab.id;
        const isPressed = pressedBtn === `nav-${tab.id}`;
        return (
          <div
            key={tab.id}
            onClick={() => handlePress(`nav-${tab.id}`, () => setActiveTab(tab.id))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: 14,
              backgroundColor: isActive ? T.primaryDim : 'transparent',
              transform: isPressed ? 'scale(0.88)' : 'scale(1)',
              transition: 'all 0.15s ease',
              minWidth: 52,
            }}
          >
            {Icon && <Icon size={20} color={isActive ? T.primary : T.textMuted} strokeWidth={isActive ? 2.2 : 1.8} />}
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? T.primary : T.textMuted,
              letterSpacing: 0.3,
            }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── NOW SCREEN ──────────────────────────────────────────────────────────────
function NowScreen({ T, themeKey, handlePress, pressedBtn }) {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const DropletIcon = window.lucide?.Droplets;
  const WindIcon = window.lucide?.Wind;
  const ThermometerIcon = window.lucide?.Thermometer;
  const EyeIcon = window.lucide?.Eye;
  const AlertTriangleIcon = window.lucide?.AlertTriangle;
  const MapPinIcon = window.lucide?.MapPin;
  const ClockIcon = window.lucide?.Clock;
  const ChevronRightIcon = window.lucide?.ChevronRight;
  const UsersIcon = window.lucide?.Users;

  const blocks = [
    { id: 'b1', name: 'Your Block', street: 'Oak & 5th', temp: 68, feel: 'Comfortable', rain: 0, wind: 8, alert: null, color: T.success },
    { id: 'b2', name: '2 Blocks N', street: 'Oak & 7th', temp: 66, feel: 'Breezy', rain: 0, wind: 19, alert: 'Gusts 24mph', color: T.warning },
    { id: 'b3', name: 'Stadium N', street: 'Arena Ave', temp: 64, feel: 'Windy', rain: 5, wind: 28, alert: 'Wind tunnel', color: T.danger },
    { id: 'b4', name: 'Park Side', street: 'Riverside Dr', temp: 70, feel: 'Warm', rain: 0, wind: 5, alert: null, color: T.success },
  ];

  const timeline = [
    { time: 'Now', icon: '🌤', label: 'Partly cloudy', temp: 68, rain: 0, bg: T.successDim, border: T.success },
    { time: ':15', icon: '🌦', label: 'Light drizzle', temp: 67, rain: 30, bg: T.warningDim, border: T.warning },
    { time: ':30', icon: '🌧', label: 'Shower', temp: 65, rain: 70, bg: T.dangerDim, border: T.danger },
    { time: ':45', icon: '🌧', label: 'Rain', temp: 64, rain: 85, bg: T.dangerDim, border: T.danger },
    { time: '+1h', icon: '🌤', label: 'Clearing', temp: 66, rain: 20, bg: T.warningDim, border: T.warning },
    { time: '+1:15', icon: '⛅', label: 'Overcast', temp: 67, rain: 5, bg: T.primaryDim, border: T.primary },
  ];

  return (
    <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {MapPinIcon && <MapPinIcon size={14} color={T.primary} />}
            <span style={{ color: T.primary, fontSize: 13, fontWeight: 600 }}>Oak Street & 5th Ave</span>
          </div>
          <h1 style={{ color: T.text, fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>MicroForecast</h1>
        </div>
        <div style={{
          backgroundColor: T.dangerDim,
          border: `1px solid ${T.danger}55`,
          borderRadius: 12,
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          {AlertTriangleIcon && <AlertTriangleIcon size={13} color={T.danger} />}
          <span style={{ color: T.danger, fontSize: 11, fontWeight: 700 }}>RAIN IN 14 MIN</span>
        </div>
      </div>

      {/* Main weather card */}
      <div style={{
        background: themeKey === 'dark'
          ? `linear-gradient(135deg, #0D1E35 0%, #0A2A40 50%, #051520 100%)`
          : `linear-gradient(135deg, #E8F4FF 0%, #D0ECFF 50%, #BFE3FF 100%)`,
        borderRadius: 24,
        padding: 20,
        border: `1px solid ${T.primary}33`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -20, width: 140, height: 140,
          borderRadius: '50%', backgroundColor: T.primary, opacity: 0.06,
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 56, fontWeight: 300, color: T.text, lineHeight: 1, letterSpacing: -2 }}>68°</div>
            <div style={{ color: T.textSub, fontSize: 14, fontWeight: 500, marginTop: 2 }}>Feels like 66°</div>
            <div style={{ color: T.text, fontSize: 16, fontWeight: 600, marginTop: 6 }}>Partly Cloudy</div>
          </div>
          <div style={{ fontSize: 52, lineHeight: 1 }}>🌤</div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 8, marginTop: 16,
        }}>
          {[
            { Icon: DropletIcon, val: '30%', label: 'Rain' },
            { Icon: WindIcon, val: '8mph', label: 'Wind' },
            { Icon: ThermometerIcon, val: '64%', label: 'Humidity' },
            { Icon: EyeIcon, val: '5mi', label: 'Visibility' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                {item.Icon && <item.Icon size={14} color={T.primary} />}
              </div>
              <div style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>{item.val}</div>
              <div style={{ color: T.textMuted, fontSize: 10, fontWeight: 500 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 15-min timeline */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: T.text, fontSize: 14, fontWeight: 700 }}>Next 90 Minutes</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {ClockIcon && <ClockIcon size={12} color={T.textMuted} />}
            <span style={{ color: T.textMuted, fontSize: 11 }}>15-min windows</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {timeline.map((item, i) => (
            <div key={i} style={{
              flexShrink: 0,
              backgroundColor: item.bg,
              border: `1px solid ${item.border}44`,
              borderRadius: 16,
              padding: '10px 12px',
              textAlign: 'center',
              minWidth: 70,
              position: 'relative',
              ...(i === 0 ? { border: `2px solid ${item.border}` } : {}),
            }}>
              {i === 0 && (
                <div style={{
                  position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: T.primary, borderRadius: 6, padding: '1px 6px',
                }}>
                  <span style={{ color: '#000', fontSize: 9, fontWeight: 800 }}>NOW</span>
                </div>
              )}
              <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, marginBottom: 4 }}>{item.time}</div>
              <div style={{ fontSize: 22 }}>{item.icon}</div>
              <div style={{ color: T.text, fontSize: 13, fontWeight: 700, marginTop: 4 }}>{item.temp}°</div>
              {item.rain > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginTop: 2 }}>
                  {DropletIcon && <DropletIcon size={9} color={T.primary} />}
                  <span style={{ color: T.primary, fontSize: 10, fontWeight: 600 }}>{item.rain}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Block-level map */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: T.text, fontSize: 14, fontWeight: 700 }}>Nearby Blocks</span>
          <span style={{ color: T.primary, fontSize: 12, fontWeight: 600 }}>Street-level</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {blocks.map(block => (
            <div
              key={block.id}
              onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
              style={{
                backgroundColor: T.surface,
                border: `1px solid ${selectedBlock === block.id ? block.color + '66' : T.border}`,
                borderRadius: 16,
                padding: '12px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    backgroundColor: block.color,
                    boxShadow: `0 0 8px ${block.color}66`,
                  }} />
                  <div>
                    <div style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>{block.name}</div>
                    <div style={{ color: T.textMuted, fontSize: 11 }}>{block.street}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: T.text, fontSize: 16, fontWeight: 700 }}>{block.temp}°</div>
                  <div style={{ color: T.textSub, fontSize: 11 }}>{block.feel}</div>
                </div>
              </div>
              {block.alert && (
                <div style={{
                  marginTop: 8,
                  backgroundColor: T.warningDim,
                  border: `1px solid ${T.warning}33`,
                  borderRadius: 8,
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  {AlertTriangleIcon && <AlertTriangleIcon size={11} color={T.warning} />}
                  <span style={{ color: T.warning, fontSize: 11, fontWeight: 600 }}>{block.alert}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live reports banner */}
      <div style={{
        backgroundColor: T.accentDim,
        border: `1px solid ${T.accent}44`,
        borderRadius: 16,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', backgroundColor: T.success,
            boxShadow: `0 0 6px ${T.success}`,
            animation: 'pulse 2s infinite',
          }} />
          {UsersIcon && <UsersIcon size={14} color={T.accent} />}
          <div>
            <span style={{ color: T.text, fontSize: 12, fontWeight: 700 }}>14 Live Reports</span>
            <span style={{ color: T.textMuted, fontSize: 11 }}> in your area</span>
          </div>
        </div>
        {ChevronRightIcon && <ChevronRightIcon size={16} color={T.accent} />}
      </div>
    </div>
  );
}

// ── ROUTES SCREEN ────────────────────────────────────────────────────────────
function RoutesScreen({ T, handlePress, pressedBtn }) {
  const [selectedRoute, setSelectedRoute] = useState('A');
  const NavigationIcon = window.lucide?.Navigation;
  const ClockIcon = window.lucide?.Clock;
  const DropletIcon = window.lucide?.Droplets;
  const WindIcon = window.lucide?.Wind;
  const ThermometerIcon = window.lucide?.Thermometer;
  const CheckCircleIcon = window.lucide?.CheckCircle2;
  const AlertTriangleIcon = window.lucide?.AlertTriangle;
  const StarIcon = window.lucide?.Star;
  const MapIcon = window.lucide?.Map;
  const ArrowRightIcon = window.lucide?.ArrowRight;

  const routes = [
    {
      id: 'A', name: 'Oak St Route', type: 'Recommended', time: '12 min', distance: '0.6mi',
      score: 92, scoreLabel: 'Best',
      rain: 5, wind: 8, temp: 68, feel: 'Comfortable',
      color: T.success, colorDim: T.successDim,
      segments: [
        { name: 'Oak St (main)', distance: '0.3mi', condition: 'Dry', icon: '🌤', good: true },
        { name: 'Park Shortcut', distance: '0.2mi', condition: 'Slight breeze', icon: '🍃', good: true },
        { name: 'Market Cross', distance: '0.1mi', condition: 'Sunny', icon: '☀️', good: true },
      ],
      alert: null,
    },
    {
      id: 'B', name: 'Main Ave Route', type: 'Standard', time: '10 min', distance: '0.5mi',
      score: 61, scoreLabel: 'Fair',
      rain: 40, wind: 22, temp: 65, feel: 'Breezy',
      color: T.warning, colorDim: T.warningDim,
      segments: [
        { name: 'Main Ave (exposed)', distance: '0.25mi', condition: 'Wind tunnel', icon: '💨', good: false },
        { name: 'Commerce Dr', distance: '0.15mi', condition: 'Drizzle likely', icon: '🌦', good: false },
        { name: 'Central Plaza', distance: '0.1mi', condition: 'OK', icon: '⛅', good: true },
      ],
      alert: 'Wind gusts 24mph — umbrella will invert',
    },
    {
      id: 'C', name: 'Riverside Path', type: 'Scenic', time: '18 min', distance: '0.9mi',
      score: 45, scoreLabel: 'Poor',
      rain: 70, wind: 31, temp: 62, feel: 'Wet + Windy',
      color: T.danger, colorDim: T.dangerDim,
      segments: [
        { name: 'Riverside Walk', distance: '0.5mi', condition: 'Heavy rain likely', icon: '🌧', good: false },
        { name: 'Open Bridge', distance: '0.2mi', condition: 'Dangerous gusts', icon: '⚠️', good: false },
        { name: 'River Ave', distance: '0.2mi', condition: 'Flooding possible', icon: '🌊', good: false },
      ],
      alert: 'Not recommended — severe conditions in 15 min',
    },
  ];

  const active = routes.find(r => r.id === selectedRoute);

  return (
    <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          {MapIcon && <MapIcon size={14} color={T.primary} />}
          <span style={{ color: T.primary, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Route Comparison</span>
        </div>
        <h1 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0 }}>Home → School Pickup</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          {ClockIcon && <ClockIcon size={12} color={T.textMuted} />}
          <span style={{ color: T.textMuted, fontSize: 12 }}>Depart now · Arrive ~3:52 PM</span>
        </div>
      </div>

      {/* Route selector pills */}
      <div style={{ display: 'flex', gap: 8 }}>
        {routes.map(r => (
          <div
            key={r.id}
            onClick={() => setSelectedRoute(r.id)}
            style={{
              flex: 1,
              backgroundColor: selectedRoute === r.id ? r.colorDim : T.surface,
              border: `1.5px solid ${selectedRoute === r.id ? r.color : T.border}`,
              borderRadius: 14,
              padding: '10px 6px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: selectedRoute === r.id ? r.color : T.textMuted }}>
              {r.id}
            </div>
            <div style={{ color: T.textSub, fontSize: 10, fontWeight: 500, marginTop: 2 }}>{r.time}</div>
            <div style={{
              backgroundColor: r.colorDim,
              border: `1px solid ${r.color}44`,
              borderRadius: 6, padding: '2px 6px', marginTop: 4, display: 'inline-block'
            }}>
              <span style={{ color: r.color, fontSize: 9, fontWeight: 700 }}>{r.scoreLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Active route detail */}
      {active && (
        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${active.color}44`,
          borderRadius: 20,
          padding: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: T.text, fontSize: 16, fontWeight: 700 }}>{active.name}</span>
                {active.id === 'A' && StarIcon && <StarIcon size={14} color={T.warning} fill={T.warning} />}
              </div>
              <span style={{ color: T.textSub, fontSize: 12 }}>{active.distance} · {active.time}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: active.color }}>{active.score}</div>
              <div style={{ color: T.textMuted, fontSize: 10, fontWeight: 600 }}>COMFORT</div>
            </div>
          </div>

          {/* Conditions row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            {[
              { Icon: DropletIcon, val: `${active.rain}%`, label: 'Rain', color: active.rain > 30 ? T.danger : T.primary },
              { Icon: WindIcon, val: `${active.wind}mph`, label: 'Wind', color: active.wind > 20 ? T.warning : T.textSub },
              { Icon: ThermometerIcon, val: `${active.temp}°`, label: active.feel },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: T.surface2, borderRadius: 10, padding: '8px',
                textAlign: 'center', border: `1px solid ${T.border}`,
              }}>
                {item.Icon && <item.Icon size={14} color={item.color || T.textSub} style={{ margin: '0 auto 3px' }} />}
                <div style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>{item.val}</div>
                <div style={{ color: T.textMuted, fontSize: 10 }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Alert */}
          {active.alert && (
            <div style={{
              backgroundColor: T.dangerDim, border: `1px solid ${T.danger}44`,
              borderRadius: 10, padding: '8px 12px', marginBottom: 12,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {AlertTriangleIcon && <AlertTriangleIcon size={14} color={T.danger} />}
              <span style={{ color: T.danger, fontSize: 12, fontWeight: 600 }}>{active.alert}</span>
            </div>
          )}

          {/* Segments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {active.segments.map((seg, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                backgroundColor: T.surface2, borderRadius: 10, padding: '8px 10px',
              }}>
                <span style={{ fontSize: 16 }}>{seg.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: T.text, fontSize: 12, fontWeight: 600 }}>{seg.name}</div>
                  <div style={{ color: T.textMuted, fontSize: 11 }}>{seg.distance} · {seg.condition}</div>
                </div>
                {CheckCircleIcon && (
                  <CheckCircleIcon size={14} color={seg.good ? T.success : T.danger}
                    fill={seg.good ? T.successDim : T.dangerDim} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div
        onClick={() => handlePress('navigate', null)}
        style={{
          backgroundColor: T.primary,
          borderRadius: 16, padding: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer',
          transform: pressedBtn === 'navigate' ? 'scale(0.96)' : 'scale(1)',
          transition: 'all 0.15s',
          boxShadow: `0 4px 20px ${T.primary}44`,
        }}
      >
        {NavigationIcon && <NavigationIcon size={16} color='#000' strokeWidth={2.5} />}
        <span style={{ color: '#000', fontSize: 14, fontWeight: 700 }}>Start Route A — Best Conditions</span>
        {ArrowRightIcon && <ArrowRightIcon size={16} color='#000' />}
      </div>
    </div>
  );
}

// ── EVENTS SCREEN ─────────────────────────────────────────────────────────
function EventsScreen({ T, handlePress, pressedBtn }) {
  const CalendarIcon = window.lucide?.Calendar;
  const ClockIcon = window.lucide?.Clock;
  const MapPinIcon = window.lucide?.MapPin;
  const BellIcon = window.lucide?.Bell;
  const DropletIcon = window.lucide?.Droplets;
  const AlertTriangleIcon = window.lucide?.AlertTriangle;
  const CheckCircleIcon = window.lucide?.CheckCircle2;
  const ArrowRightIcon = window.lucide?.ArrowRight;
  const TrendingDownIcon = window.lucide?.TrendingDown;
  const SunriseIcon = window.lucide?.Sunrise;
  const UmbrellaIcon = window.lucide?.Umbrella;
  const JacketIcon = window.lucide?.Layers;

  const events = [
    {
      id: 'e1', title: 'School Pickup', time: '3:30 PM', location: 'Lincoln Elementary',
      distance: '0.4mi', duration: '15 min',
      forecast: { rain: 65, temp: 64, feel: 'Rainy', icon: '🌧' },
      suggestion: 'Leave 15 min early — drizzle starts at 3:28',
      suggestionType: 'warning',
      items: ['☂️ Umbrella', '🧥 Jacket for kids'],
      bestTime: '3:05 PM',
    },
    {
      id: 'e2', title: 'Lunch Walk', time: '12:30 PM', location: 'Riverside Park',
      distance: '0.2mi', duration: '45 min',
      forecast: { rain: 10, temp: 72, feel: 'Humid', icon: '☀️' },
      suggestion: 'Leave 15 min earlier to avoid afternoon humidity spike',
      suggestionType: 'info',
      items: ['💧 Water bottle', '🕶️ Sunglasses'],
      bestTime: '12:15 PM',
    },
    {
      id: 'e3', title: 'Evening Run', time: '6:00 PM', location: 'Riverside Path',
      distance: '0.1mi', duration: '45 min',
      forecast: { rain: 0, temp: 68, feel: 'Perfect', icon: '🌤' },
      suggestion: 'Ideal conditions — go as planned',
      suggestionType: 'success',
      items: [],
      bestTime: '6:00 PM',
    },
    {
      id: 'e4', title: 'Grocery Run', time: '5:30 PM', location: 'Whole Foods',
      distance: '0.7mi', duration: '30 min',
      forecast: { rain: 80, temp: 62, feel: 'Heavy Rain', icon: '🌧' },
      suggestion: 'Wait until 6:45 PM — rain clears completely',
      suggestionType: 'danger',
      items: ['☂️ Rain jacket', '🛍️ Waterproof bag'],
      bestTime: '6:45 PM',
    },
  ];

  const typeColors = {
    warning: { bg: T.warningDim, border: T.warning, text: T.warning },
    info: { bg: T.primaryDim, border: T.primary, text: T.primary },
    success: { bg: T.successDim, border: T.success, text: T.success },
    danger: { bg: T.dangerDim, border: T.danger, text: T.danger },
  };

  const typeIcons = {
    warning: AlertTriangleIcon,
    info: ClockIcon,
    success: CheckCircleIcon,
    danger: UmbrellaIcon,
  };

  return (
    <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            {CalendarIcon && <CalendarIcon size={14} color={T.primary} />}
            <span style={{ color: T.primary, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Today's Schedule</span>
          </div>
          <h1 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0 }}>Smart Timing</h1>
        </div>
        <div style={{
          backgroundColor: T.successDim, border: `1px solid ${T.success}44`,
          borderRadius: 10, padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {BellIcon && <BellIcon size={12} color={T.success} />}
          <span style={{ color: T.success, fontSize: 11, fontWeight: 700 }}>4 alerts set</span>
        </div>
      </div>

      {/* Date pill */}
      <div style={{
        backgroundColor: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 14, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {SunriseIcon && <SunriseIcon size={16} color={T.warning} />}
        <div>
          <span style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>Sunday, March 22</span>
          <span style={{ color: T.textMuted, fontSize: 12 }}> · Mixed conditions today</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {['🌤', '🌧', '🌤'].map((ic, i) => <span key={i} style={{ fontSize: 14 }}>{ic}</span>)}
        </div>
      </div>

      {/* Events */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map(event => {
          const c = typeColors[event.suggestionType];
          const SuggIcon = typeIcons[event.suggestionType];
          return (
            <div key={event.id} style={{
              backgroundColor: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 20, padding: 14, overflow: 'hidden', position: 'relative',
            }}>
              {/* Colored left accent */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: 3, backgroundColor: c.border,
              }} />
              <div style={{ paddingLeft: 8 }}>
                {/* Event header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ color: T.text, fontSize: 15, fontWeight: 700 }}>{event.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      {ClockIcon && <ClockIcon size={11} color={T.textMuted} />}
                      <span style={{ color: T.textMuted, fontSize: 11 }}>{event.time} · {event.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      {MapPinIcon && <MapPinIcon size={11} color={T.textMuted} />}
                      <span style={{ color: T.textMuted, fontSize: 11 }}>{event.location} · {event.distance}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28 }}>{event.forecast.icon}</div>
                    <div style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>{event.forecast.temp}°</div>
                  </div>
                </div>

                {/* Suggestion */}
                <div style={{
                  backgroundColor: c.bg, border: `1px solid ${c.border}44`,
                  borderRadius: 10, padding: '8px 10px', marginBottom: 8,
                  display: 'flex', alignItems: 'flex-start', gap: 7,
                }}>
                  {SuggIcon && <SuggIcon size={13} color={c.text} style={{ flexShrink: 0, marginTop: 1 }} />}
                  <span style={{ color: c.text, fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>
                    {event.suggestion}
                  </span>
                </div>

                {/* Best time + items */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {event.bestTime !== event.time && (
                      <div style={{
                        backgroundColor: T.primaryDim, border: `1px solid ${T.primary}33`,
                        borderRadius: 8, padding: '3px 8px',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        {TrendingDownIcon && <TrendingDownIcon size={10} color={T.primary} />}
                        <span style={{ color: T.primary, fontSize: 11, fontWeight: 700 }}>Best: {event.bestTime}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {event.items.slice(0, 2).map((item, i) => (
                      <span key={i} style={{ fontSize: 14 }}>{item.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── REPORTS SCREEN ───────────────────────────────────────────────────────────
function ReportsScreen({ T, handlePress, pressedBtn }) {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const RadioIcon = window.lucide?.Radio;
  const MapPinIcon = window.lucide?.MapPin;
  const ClockIcon = window.lucide?.Clock;
  const ThumbsUpIcon = window.lucide?.ThumbsUp;
  const CameraIcon = window.lucide?.Camera;
  const PlusIcon = window.lucide?.Plus;
  const DropletIcon = window.lucide?.Droplets;
  const WindIcon = window.lucide?.Wind;
  const AlertTriangleIcon = window.lucide?.AlertTriangle;
  const CloudSnowIcon = window.lucide?.CloudSnow;
  const CheckIcon = window.lucide?.Check;

  const reports = [
    {
      id: 'r1', type: 'rain', icon: '🌧', label: 'Heavy Rain', location: 'Main & 4th',
      time: '2 min ago', distance: '0.2mi', confirms: 8, photo: false,
      note: 'Puddles forming fast, avoid the underpass',
      color: T.primary,
    },
    {
      id: 'r2', type: 'wind', icon: '💨', label: 'Strong Gusts', location: 'Stadium N side',
      time: '5 min ago', distance: '0.5mi', confirms: 14, photo: true,
      note: 'Umbrella inverted, hat flew off',
      color: T.warning,
    },
    {
      id: 'r3', type: 'fog', icon: '🌫', label: 'Low Visibility', location: 'River Bridge',
      time: '8 min ago', distance: '0.8mi', confirms: 5, photo: false,
      note: 'Can barely see 20 feet ahead',
      color: T.textSub,
    },
    {
      id: 'r4', type: 'heat', icon: '🌡', label: 'Heat Burst', location: 'Parking Lot C',
      time: '12 min ago', distance: '1.1mi', confirms: 3, photo: false,
      note: 'Asphalt radiating intense heat, felt 10° hotter',
      color: T.danger,
    },
    {
      id: 'r5', type: 'clear', icon: '☀️', label: 'Cleared Up', location: 'Oak & 7th',
      time: '15 min ago', distance: '0.3mi', confirms: 11, photo: true,
      note: 'Rain completely stopped, streets drying fast',
      color: T.success,
    },
  ];

  const quickReports = [
    { id: 'qr', icon: '🌧', label: 'Rain', color: T.primary },
    { id: 'qw', icon: '💨', label: 'Wind', color: T.warning },
    { id: 'qf', icon: '🌫', label: 'Fog', color: T.textSub },
    { id: 'qh', icon: '🌡', label: 'Hot', color: T.danger },
    { id: 'qc', icon: '☀️', label: 'Clear', color: T.success },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'rain', label: '🌧 Rain' },
    { id: 'wind', label: '💨 Wind' },
    { id: 'clear', label: '☀️ Clear' },
  ];

  const filtered = activeFilter === 'all' ? reports : reports.filter(r => r.type === activeFilter);

  return (
    <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: T.success, boxShadow: `0 0 6px ${T.success}` }} />
            {RadioIcon && <RadioIcon size={13} color={T.primary} />}
            <span style={{ color: T.primary, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Live Community Reports</span>
          </div>
          <h1 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0 }}>Nearby Sightings</h1>
        </div>
        <div style={{
          backgroundColor: T.surface, border: `1px solid ${T.border}`,
          borderRadius: 12, padding: '6px 10px', textAlign: 'center',
        }}>
          <div style={{ color: T.text, fontSize: 18, fontWeight: 800 }}>47</div>
          <div style={{ color: T.textMuted, fontSize: 9, fontWeight: 600 }}>ACTIVE</div>
        </div>
      </div>

      {/* Quick report */}
      <div style={{
        backgroundColor: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, padding: 14,
      }}>
        <div style={{ color: T.text, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Report conditions at your location</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {quickReports.map(qr => (
            <div
              key={qr.id}
              onClick={() => { if (!reportSubmitted) handlePress(qr.id, () => setReportSubmitted(true)); }}
              style={{
                flex: 1, backgroundColor: T.surface2,
                border: `1px solid ${T.border}`, borderRadius: 12,
                padding: '8px 4px', textAlign: 'center', cursor: 'pointer',
                transform: pressedBtn === qr.id ? 'scale(0.88)' : 'scale(1)',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 20 }}>{qr.icon}</div>
              <div style={{ color: T.textSub, fontSize: 10, fontWeight: 600, marginTop: 2 }}>{qr.label}</div>
            </div>
          ))}
        </div>

        {reportSubmitted ? (
          <div style={{
            backgroundColor: T.successDim, border: `1px solid ${T.success}44`,
            borderRadius: 12, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {CheckIcon && <CheckIcon size={16} color={T.success} />}
            <span style={{ color: T.success, fontSize: 13, fontWeight: 700 }}>Report submitted! +5 MicroPoints</span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              flex: 1, backgroundColor: T.primaryDim, border: `1px solid ${T.primary}44`,
              borderRadius: 12, padding: '10px', textAlign: 'center', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              {CameraIcon && <CameraIcon size={14} color={T.primary} />}
              <span style={{ color: T.primary, fontSize: 12, fontWeight: 700 }}>Add Photo</span>
            </div>
            <div style={{
              flex: 1, backgroundColor: T.accentDim, border: `1px solid ${T.accent}44`,
              borderRadius: 12, padding: '10px', textAlign: 'center', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              {PlusIcon && <PlusIcon size={14} color={T.accent} />}
              <span style={{ color: T.accent, fontSize: 12, fontWeight: 700 }}>Add Note</span>
            </div>
          </div>
        )}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {filters.map(f => (
          <div
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              flexShrink: 0,
              backgroundColor: activeFilter === f.id ? T.primaryDim : T.surface,
              border: `1px solid ${activeFilter === f.id ? T.primary : T.border}`,
              borderRadius: 20, padding: '6px 12px', cursor: 'pointer',
            }}
          >
            <span style={{ color: activeFilter === f.id ? T.primary : T.textSub, fontSize: 12, fontWeight: 600 }}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Reports list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(report => (
          <div key={report.id} style={{
            backgroundColor: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 16, padding: 12,
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                backgroundColor: `${report.color}22`,
                border: `1px solid ${report.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}>
                {report.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>{report.label}</span>
                  <span style={{ color: T.textMuted, fontSize: 11 }}>{report.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  {MapPinIcon && <MapPinIcon size={10} color={T.textMuted} />}
                  <span style={{ color: T.textSub, fontSize: 11 }}>{report.location} · {report.distance}</span>
                  {report.photo && <span style={{ fontSize: 10 }}>📸</span>}
                </div>
                <div style={{ color: T.textSub, fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>{report.note}</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5, marginTop: 6,
                  backgroundColor: T.surface2, borderRadius: 8, padding: '4px 8px',
                  display: 'inline-flex',
                }}>
                  {ThumbsUpIcon && <ThumbsUpIcon size={11} color={report.color} />}
                  <span style={{ color: report.color, fontSize: 11, fontWeight: 700 }}>{report.confirms} confirmed</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SETTINGS SCREEN ───────────────────────────────────────────────────────────
function SettingsScreen({ T, themeKey, setThemeKey, handlePress, pressedBtn }) {
  const [notifs, setNotifs] = useState(true);
  const [calSync, setCalSync] = useState(true);
  const [crowdReports, setCrowdReports] = useState(true);
  const [profile, setProfile] = useState('commuter');
  const UserIcon = window.lucide?.User;
  const BellIcon = window.lucide?.Bell;
  const CalendarIcon = window.lucide?.Calendar;
  const UsersIcon = window.lucide?.Users;
  const ShieldIcon = window.lucide?.Shield;
  const SunIcon = window.lucide?.Sun;
  const MoonIcon = window.lucide?.Moon;
  const ChevronRightIcon = window.lucide?.ChevronRight;
  const MapPinIcon = window.lucide?.MapPin;
  const StarIcon = window.lucide?.Star;
  const ZapIcon = window.lucide?.Zap;

  const profiles = [
    { id: 'commuter', icon: '🚇', label: 'Commuter', desc: 'Transit & subway focus' },
    { id: 'runner', icon: '🏃', label: 'Runner', desc: 'Wind + humidity alerts' },
    { id: 'parent', icon: '👨‍👧', label: 'Parent', desc: 'School run timing' },
    { id: 'delivery', icon: '📦', label: 'Delivery', desc: 'Route optimization' },
  ];

  const Toggle = ({ val, onToggle, color }) => (
    <div
      onClick={onToggle}
      style={{
        width: 44, height: 26, borderRadius: 13,
        backgroundColor: val ? (color || T.primary) : T.surface3,
        border: `1px solid ${val ? (color || T.primary) : T.border}`,
        position: 'relative', cursor: 'pointer',
        transition: 'all 0.25s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3,
        left: val ? 20 : 3,
        width: 18, height: 18, borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'left 0.25s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </div>
  );

  const SettingRow = ({ icon: Icon, iconColor, label, sub, right, border = true }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: border ? `1px solid ${T.border}` : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          backgroundColor: `${iconColor}22`, border: `1px solid ${iconColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icon && <Icon size={16} color={iconColor} />}
        </div>
        <div>
          <div style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>{label}</div>
          {sub && <div style={{ color: T.textMuted, fontSize: 11 }}>{sub}</div>}
        </div>
      </div>
      {right}
    </div>
  );

  return (
    <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div>
        <h1 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0 }}>Settings</h1>
        <p style={{ color: T.textMuted, fontSize: 12, margin: '4px 0 0' }}>Personalize your micro-weather experience</p>
      </div>

      {/* Profile */}
      <div style={{
        background: themeKey === 'dark'
          ? `linear-gradient(135deg, #0D1E35, #0A2A40)`
          : `linear-gradient(135deg, #E8F4FF, #D0ECFF)`,
        borderRadius: 20, padding: 16, border: `1px solid ${T.primary}33`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>🌤</div>
          <div>
            <div style={{ color: T.text, fontSize: 16, fontWeight: 700 }}>Alex Johnson</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {StarIcon && <StarIcon size={11} color={T.warning} fill={T.warning} />}
              <span style={{ color: T.textSub, fontSize: 12 }}>847 MicroPoints · Level 5</span>
            </div>
          </div>
        </div>
        <div style={{ color: T.textSub, fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Activity Profile</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {profiles.map(p => (
            <div
              key={p.id}
              onClick={() => setProfile(p.id)}
              style={{
                backgroundColor: profile === p.id ? T.primaryDim : T.surface,
                border: `1.5px solid ${profile === p.id ? T.primary : T.border}`,
                borderRadius: 12, padding: '8px 10px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <div>
                <div style={{ color: T.text, fontSize: 12, fontWeight: 600 }}>{p.label}</div>
                <div style={{ color: T.textMuted, fontSize: 10 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '4px 16px' }}>
        <div style={{ color: T.textMuted, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 0 6px' }}>Appearance</div>
        <div style={{ padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ color: T.text, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Theme</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['dark', 'light'].map(t => (
              <div
                key={t}
                onClick={() => setThemeKey(t)}
                style={{
                  flex: 1, borderRadius: 12, padding: '10px',
                  backgroundColor: themeKey === t ? T.primaryDim : T.surface2,
                  border: `1.5px solid ${themeKey === t ? T.primary : T.border}`,
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                {t === 'dark' ? (MoonIcon && <MoonIcon size={15} color={themeKey === t ? T.primary : T.textMuted} />) :
                  (SunIcon && <SunIcon size={15} color={themeKey === t ? T.primary : T.textMuted} />)}
                <span style={{ color: themeKey === t ? T.primary : T.textMuted, fontSize: 13, fontWeight: 600, textTransform: 'capitalize' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications & Integrations */}
      <div style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '4px 16px' }}>
        <div style={{ color: T.textMuted, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 0 6px' }}>Notifications & Data</div>
        <SettingRow
          icon={BellIcon} iconColor={T.primary}
          label="Push Notifications" sub="Rain, wind & route alerts"
          right={<Toggle val={notifs} onToggle={() => setNotifs(!notifs)} />}
        />
        <SettingRow
          icon={CalendarIcon} iconColor={T.accent}
          label="Calendar Sync" sub="Google Calendar connected"
          right={<Toggle val={calSync} onToggle={() => setCalSync(!calSync)} color={T.accent} />}
        />
        <SettingRow
          icon={UsersIcon} iconColor={T.success}
          label="Crowd Reports" sub="See & submit local reports"
          right={<Toggle val={crowdReports} onToggle={() => setCrowdReports(!crowdReports)} color={T.success} />}
          border={false}
        />
      </div>

      {/* About */}
      <div style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '4px 16px' }}>
        <div style={{ color: T.textMuted, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 0 6px' }}>About</div>
        {[
          { Icon: ZapIcon, color: T.warning, label: 'MicroShift Pro', sub: 'Upgrade for 5-min windows' },
          { Icon: ShieldIcon, color: T.success, label: 'Privacy Policy', sub: 'Location data & usage' },
          { Icon: MapPinIcon, color: T.primary, label: 'Version 2.4.1', sub: 'Latest build' },
        ].map((item, i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 0', borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                backgroundColor: `${item.color}22`, border: `1px solid ${item.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.Icon && <item.Icon size={16} color={item.color} />}
              </div>
              <div>
                <div style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: T.textMuted, fontSize: 11 }}>{item.sub}</div>
              </div>
            </div>
            {ChevronRightIcon && <ChevronRightIcon size={16} color={T.textMuted} />}
          </div>
        ))}
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}
