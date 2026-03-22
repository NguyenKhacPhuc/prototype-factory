const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#07091A',
    surface: '#0D1528',
    card: '#131E38',
    cardAlt: '#0A1020',
    primary: '#00D4AA',
    primaryDim: 'rgba(0,212,170,0.1)',
    primaryGlow: 'rgba(0,212,170,0.28)',
    secondary: '#818CF8',
    text: '#EEF2FF',
    textSub: '#7A8BB8',
    textMuted: '#374868',
    border: '#182340',
    borderLight: '#1E2D50',
    navBg: '#09111F',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    info: '#60A5FA',
    calm: '#34D399',
    moderate: '#FBBF24',
    busy: '#F87171',
    mapBg: '#080F1E',
    mapGrid: '#0F1C35',
    purple: '#A78BFA',
  },
  light: {
    bg: '#EDF2FF',
    surface: '#FFFFFF',
    card: '#F5F9FF',
    cardAlt: '#EBF0FF',
    primary: '#009E82',
    primaryDim: 'rgba(0,158,130,0.1)',
    primaryGlow: 'rgba(0,158,130,0.22)',
    secondary: '#6366F1',
    text: '#0E1629',
    textSub: '#465070',
    textMuted: '#94A3B8',
    border: '#DDE6F5',
    borderLight: '#EBF2FF',
    navBg: '#FFFFFF',
    success: '#059669',
    warning: '#D97706',
    danger: '#DC2626',
    info: '#3B82F6',
    calm: '#059669',
    moderate: '#D97706',
    busy: '#DC2626',
    mapBg: '#E2ECF8',
    mapGrid: '#CFDAEE',
    purple: '#7C3AED',
  },
};

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar({ theme, isDark, toggleTheme }) {
  const [time, setTime] = useState('09:41');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`);
    };
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const WifiIcon = window.lucide.Wifi;
  const BatteryFullIcon = window.lucide.BatteryFull;
  const SignalIcon = window.lucide.Signal;
  return (
    <div style={{ height: 44, background: theme.surface, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 22px', position: 'relative', zIndex: 10 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: theme.text, letterSpacing: 0.3, fontVariantNumeric: 'tabular-nums' }}>
        {time}
      </span>
      <div style={{ width: 128 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, display: 'flex', alignItems: 'center' }}>
          {isDark ? <SunIcon size={13} color={theme.textSub} /> : <MoonIcon size={13} color={theme.textSub} />}
        </button>
        <SignalIcon size={14} color={theme.text} />
        <WifiIcon size={14} color={theme.text} />
        <BatteryFullIcon size={16} color={theme.text} />
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  const [activeProfile, setActiveProfile] = useState('lowstim');
  const [pressed, setPressed] = useState(null);
  const BrainIcon = window.lucide.Brain;
  const ShieldIcon = window.lucide.Shield;
  const LeafIcon = window.lucide.Leaf;
  const HeartIcon = window.lucide.Heart;
  const MapPinIcon = window.lucide.MapPin;
  const ClockIcon = window.lucide.Clock;
  const AlertTriangleIcon = window.lucide.AlertTriangle;
  const InfoIcon = window.lucide.Info;
  const ActivityIcon = window.lucide.Activity;
  const UsersIcon = window.lucide.Users;

  const profiles = [
    { id: 'lowstim', label: 'Low Stimulation', icon: BrainIcon, desc: 'Wide paths, fewer turns', color: '#34D399' },
    { id: 'stroller', label: 'Stroller Safe', icon: UsersIcon, desc: 'Smooth, curb-cut routes', color: '#60A5FA' },
    { id: 'night', label: 'Night Safe', icon: ShieldIcon, desc: 'Lit streets, active areas', color: '#A78BFA' },
    { id: 'eco', label: 'Low Energy', icon: LeafIcon, desc: 'Flat, effortless paths', color: '#FBBF24' },
  ];

  const recentRoutes = [
    { from: 'Home', to: 'Riverfront Office', time: '18 min', comfort: 92, mode: 'Low Stimulation' },
    { from: 'Grand Central', to: 'Central Park West', time: '24 min', comfort: 78, mode: 'Stroller Safe' },
    { from: 'Brooklyn Bridge', to: 'DUMBO Market', time: '11 min', comfort: 85, mode: 'Standard' },
  ];

  const alerts = [
    { type: 'warn', text: 'Main St & 5th Ave: High crowd density until 7 pm' },
    { type: 'info', text: 'Your usual Tuesday route has 3 calm alternatives' },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      {/* Header */}
      <div style={{ background: theme.surface, padding: '16px 20px 18px',
        borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: theme.textSub, fontSize: 12, margin: 0 }}>{greeting}, Alex</p>
            <h2 style={{ color: theme.text, fontSize: 19, fontWeight: 700, margin: '3px 0 0', lineHeight: 1.2 }}>
              How would you like<br />to move today?
            </h2>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: theme.primaryDim,
            border: `1px solid ${theme.primary}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIcon size={20} color={theme.primary} />
          </div>
        </div>
      </div>

      {/* Comfort Score */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ background: theme.card, borderRadius: 20, padding: '16px',
          border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="28" fill="none" stroke={theme.border} strokeWidth="6" />
              <circle cx="36" cy="36" r="28" fill="none" stroke={theme.primary} strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 28 * 0.78} ${2 * Math.PI * 28}`}
                strokeDashoffset={2 * Math.PI * 28 * 0.25}
                strokeLinecap="round" transform="rotate(-90 36 36)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: theme.primary, fontSize: 17, fontWeight: 800, lineHeight: 1 }}>78</span>
              <span style={{ color: theme.textMuted, fontSize: 8, letterSpacing: 0.5, marginTop: 1 }}>CALM</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: theme.text, fontWeight: 700, fontSize: 13, margin: '0 0 3px' }}>Neighborhood Comfort</p>
            <p style={{ color: theme.textSub, fontSize: 11, margin: '0 0 10px', lineHeight: 1.4 }}>
              Moderate activity nearby. Best window for calm routes in ~40 min.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: 'Noise', val: 62, color: theme.warning },
                { label: 'Crowd', val: 45, color: theme.calm },
                { label: 'Light', val: 88, color: theme.info },
              ].map(item => (
                <div key={item.label} style={{ flex: 1 }}>
                  <div style={{ height: 4, borderRadius: 2, background: theme.border, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.val}%`, background: item.color, borderRadius: 2 }} />
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: 9, margin: '3px 0 0', textAlign: 'center' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Profiles */}
      <div style={{ padding: '14px 20px 0' }}>
        <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 10px',
          letterSpacing: 0.8, textTransform: 'uppercase' }}>Quick Profiles</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {profiles.map(p => {
            const Icon = p.icon;
            const isActive = activeProfile === p.id;
            return (
              <div key={p.id} onClick={() => setActiveProfile(p.id)}
                onMouseDown={() => setPressed(p.id)} onMouseUp={() => setPressed(null)}
                onTouchStart={() => setPressed(p.id)} onTouchEnd={() => setPressed(null)}
                style={{ background: isActive ? `${p.color}12` : theme.card,
                  border: `1.5px solid ${isActive ? p.color + '80' : theme.border}`,
                  borderRadius: 16, padding: '13px 13px', cursor: 'pointer',
                  transform: pressed === p.id ? 'scale(0.96)' : 'scale(1)',
                  transition: 'all 0.15s ease' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10,
                  background: isActive ? `${p.color}22` : theme.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Icon size={17} color={isActive ? p.color : theme.textSub} />
                </div>
                <p style={{ color: isActive ? theme.text : theme.textSub, fontSize: 12,
                  fontWeight: 700, margin: '0 0 2px' }}>{p.label}</p>
                <p style={{ color: theme.textMuted, fontSize: 10, margin: 0, lineHeight: 1.3 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerts */}
      <div style={{ padding: '12px 20px 0' }}>
        {alerts.map((a, i) => (
          <div key={i} style={{ background: a.type === 'warn' ? `${theme.warning}12` : `${theme.info}12`,
            border: `1px solid ${a.type === 'warn' ? theme.warning + '40' : theme.info + '40'}`,
            borderRadius: 12, padding: '9px 13px', display: 'flex',
            alignItems: 'flex-start', gap: 9, marginBottom: 7 }}>
            {a.type === 'warn'
              ? <AlertTriangleIcon size={13} color={theme.warning} style={{ marginTop: 2, flexShrink: 0 }} />
              : <InfoIcon size={13} color={theme.info} style={{ marginTop: 2, flexShrink: 0 }} />}
            <p style={{ color: theme.text, fontSize: 12, margin: 0, lineHeight: 1.45 }}>{a.text}</p>
          </div>
        ))}
      </div>

      {/* Recent Routes */}
      <div style={{ padding: '12px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: 0,
            letterSpacing: 0.8, textTransform: 'uppercase' }}>Recent Routes</p>
          <span style={{ color: theme.primary, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>See all</span>
        </div>
        {recentRoutes.map((r, i) => (
          <div key={i} style={{ background: theme.card, borderRadius: 14, padding: '12px 14px',
            marginBottom: 7, border: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: theme.primaryDim,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPinIcon size={17} color={theme.primary} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: theme.text, fontSize: 12, fontWeight: 600, margin: '0 0 3px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {r.from} → {r.to}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: theme.textMuted, fontSize: 10 }}>{r.mode}</span>
                <span style={{ color: theme.textMuted, fontSize: 10 }}>·</span>
                <ClockIcon size={9} color={theme.textMuted} />
                <span style={{ color: theme.textMuted, fontSize: 10 }}>{r.time}</span>
              </div>
            </div>
            <div style={{ background: `${theme.calm}1A`, borderRadius: 8, padding: '3px 9px',
              display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ color: theme.calm, fontSize: 13, fontWeight: 800 }}>{r.comfort}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Navigate Screen ──────────────────────────────────────────────────────────
function NavigateScreen({ theme }) {
  const [destination, setDestination] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [profileMode, setProfileMode] = useState('calm');
  const [navigating, setNavigating] = useState(false);

  const MapPinIcon = window.lucide.MapPin;
  const NavigationIcon = window.lucide.Navigation;
  const ClockIcon = window.lucide.Clock;
  const ArrowUpDownIcon = window.lucide.ArrowUpDown;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const AlertTriangleIcon = window.lucide.AlertTriangle;
  const CheckCircleIcon = window.lucide.CheckCircle;

  const suggestions = ['Riverfront Park', 'Central Station', 'City Library', 'Farmers Market', 'DUMBO Market'];

  const profiles = [
    { id: 'calm', label: 'Calm', color: '#34D399' },
    { id: 'balanced', label: 'Balanced', color: '#FBBF24' },
    { id: 'fast', label: 'Fast', color: '#F87171' },
  ];

  const routes = [
    { label: 'Calm Route', time: '22 min', dist: '1.4 km', comfort: 94, color: '#34D399',
      desc: 'Quiet residential streets, wide sidewalks, minimal crossings',
      tags: ['Low Noise', 'Wide Paths', 'Shaded'], extra: '+4 min' },
    { label: 'Balanced', time: '19 min', dist: '1.2 km', comfort: 76, color: '#FBBF24',
      desc: 'Mix of main and side streets, moderate foot traffic',
      tags: ['Moderate', 'Standard'], extra: '+1 min' },
    { label: 'Fastest', time: '18 min', dist: '1.1 km', comfort: 52, color: '#F87171',
      desc: 'Main arterials, busy intersections, crowded at peak hours',
      tags: ['High Noise', 'Crowded'], extra: 'Quickest' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      {/* Search */}
      <div style={{ background: theme.surface, padding: '14px 20px 14px',
        borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: theme.card, borderRadius: 11, padding: '9px 13px',
              display: 'flex', alignItems: 'center', gap: 8,
              border: `1px solid ${theme.border}`, marginBottom: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.primary, flexShrink: 0 }} />
              <span style={{ color: theme.textSub, fontSize: 12 }}>Current Location</span>
            </div>
            <div style={{ background: theme.card, borderRadius: 11, padding: '9px 13px',
              display: 'flex', alignItems: 'center', gap: 8,
              border: `1.5px solid ${theme.primary}` }}>
              <MapPinIcon size={13} color={theme.primary} />
              <input value={destination} onChange={e => setDestination(e.target.value)}
                placeholder="Where to?"
                style={{ background: 'none', border: 'none', outline: 'none', color: theme.text,
                  fontSize: 12, flex: 1, fontFamily: "'Space Grotesk', sans-serif" }} />
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.primaryDim,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            border: `1px solid ${theme.primary}35`, flexShrink: 0 }}>
            <ArrowUpDownIcon size={15} color={theme.primary} />
          </div>
        </div>
        {!destination && (
          <div style={{ display: 'flex', gap: 7, marginTop: 10, overflowX: 'auto', paddingBottom: 2 }}>
            {suggestions.map(s => (
              <div key={s} onClick={() => setDestination(s)}
                style={{ background: theme.card, border: `1px solid ${theme.border}`,
                  borderRadius: 20, padding: '5px 11px', cursor: 'pointer', whiteSpace: 'nowrap',
                  color: theme.textSub, fontSize: 11, fontWeight: 500, flexShrink: 0 }}>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ height: 190, background: theme.mapBg, borderRadius: 18, overflow: 'hidden',
          position: 'relative', border: `1px solid ${theme.border}` }}>
          <svg width="100%" height="190" viewBox="0 0 335 190" xmlns="http://www.w3.org/2000/svg">
            <rect width="335" height="190" fill={theme.mapBg} />
            {/* Street grid */}
            {[30,60,90,120,150].map(y => (
              <rect key={`h${y}`} x="0" y={y-4} width="335" height="8" fill={theme.mapGrid} />
            ))}
            {[50,100,150,200,250,290].map(x => (
              <rect key={`v${x}`} x={x-4} y="0" width="8" height="190" fill={theme.mapGrid} />
            ))}
            {/* Park block */}
            <rect x="154" y="94" width="42" height="32" rx="4" fill="#34D39918" stroke="#34D39930" strokeWidth="1" />
            {/* Calm route - green */}
            <path d="M 60 165 Q 60 120 100 120 L 150 120 Q 150 90 200 90 L 250 90"
              stroke="#34D399" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.95" />
            {/* Busy route - dashed red */}
            <path d="M 60 165 L 100 165 Q 150 165 150 120 L 150 60 L 250 60 L 250 90"
              stroke="#F87171" strokeWidth="3" fill="none" strokeLinecap="round"
              strokeDasharray="6,4" opacity="0.5" />
            {/* Warning dot */}
            <circle cx="150" cy="165" r="7" fill="#F87171" opacity="0.85" />
            <text x="150" y="169" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">!</text>
            {/* Origin */}
            <circle cx="60" cy="165" r="10" fill="#34D399" opacity="0.2" />
            <circle cx="60" cy="165" r="5" fill="#34D399" />
            {/* Destination */}
            <circle cx="250" cy="90" r="10" fill={theme.primary} opacity="0.2" />
            <circle cx="250" cy="90" r="5" fill={theme.primary} />
            {/* Labels */}
            <rect x="66" y="155" width="20" height="12" rx="3" fill={`${theme.surface}CC`} />
            <text x="76" y="164" textAnchor="middle" fill={theme.textSub} fontSize="7" fontFamily="Space Grotesk, sans-serif">You</text>
            <rect x="256" y="81" width="24" height="12" rx="3" fill={`${theme.surface}CC`} />
            <text x="268" y="90" textAnchor="middle" fill={theme.textSub} fontSize="7" fontFamily="Space Grotesk, sans-serif">Dest</text>
          </svg>
          <div style={{ position: 'absolute', bottom: 10, right: 10, background: `${theme.surface}CC`,
            borderRadius: 8, padding: '6px 10px', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 14, height: 3, background: '#34D399', borderRadius: 2 }} />
              <span style={{ color: theme.text, fontSize: 9 }}>Calm</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 14, height: 2, borderTop: '2px dashed #F87171' }} />
              <span style={{ color: theme.text, fontSize: 9 }}>Fast</span>
            </div>
          </div>
          {/* Context warning */}
          <div style={{ position: 'absolute', top: 10, left: 10, background: `${theme.warning}20`,
            border: `1px solid ${theme.warning}50`, borderRadius: 8, padding: '5px 9px',
            display: 'flex', alignItems: 'center', gap: 5, backdropFilter: 'blur(8px)' }}>
            <AlertTriangleIcon size={11} color={theme.warning} />
            <span style={{ color: theme.warning, fontSize: 10, fontWeight: 600 }}>Busy crossing at 6th & Main</span>
          </div>
        </div>
      </div>

      {/* Profile selector */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', background: theme.card, borderRadius: 12, padding: 4,
          border: `1px solid ${theme.border}`, gap: 3 }}>
          {profiles.map(p => (
            <div key={p.id} onClick={() => setProfileMode(p.id)}
              style={{ flex: 1, padding: '7px 0', textAlign: 'center', borderRadius: 9, cursor: 'pointer',
                background: profileMode === p.id ? `${p.color}18` : 'transparent',
                border: `1px solid ${profileMode === p.id ? p.color + '55' : 'transparent'}`,
                transition: 'all 0.15s' }}>
              <span style={{ color: profileMode === p.id ? p.color : theme.textSub, fontSize: 12, fontWeight: 600 }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Routes */}
      <div style={{ padding: '12px 20px 0' }}>
        <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 10px',
          letterSpacing: 0.8, textTransform: 'uppercase' }}>Available Routes</p>
        {routes.map((r, i) => (
          <div key={i} onClick={() => setSelectedRoute(i)}
            style={{ background: selectedRoute === i ? `${r.color}0E` : theme.card,
              border: `1.5px solid ${selectedRoute === i ? r.color + '70' : theme.border}`,
              borderRadius: 15, padding: '13px 15px', marginBottom: 9, cursor: 'pointer',
              transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: r.color }} />
                <span style={{ color: theme.text, fontSize: 13, fontWeight: 700 }}>{r.label}</span>
              </div>
              <div style={{ background: `${r.color}22`, borderRadius: 8, padding: '3px 8px' }}>
                <span style={{ color: r.color, fontSize: 12, fontWeight: 800 }}>{r.comfort}</span>
                <span style={{ color: r.color, fontSize: 9, marginLeft: 2 }}>calm</span>
              </div>
            </div>
            <p style={{ color: theme.textSub, fontSize: 11, margin: '0 0 7px', lineHeight: 1.4 }}>{r.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ClockIcon size={11} color={theme.textMuted} />
                <span style={{ color: theme.textMuted, fontSize: 11 }}>{r.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUpIcon size={11} color={theme.textMuted} />
                <span style={{ color: theme.textMuted, fontSize: 11 }}>{r.dist}</span>
              </div>
              <span style={{ color: theme.textMuted, fontSize: 10, marginLeft: 'auto' }}>{r.extra}</span>
            </div>
            <div style={{ display: 'flex', gap: 5, marginTop: 7, flexWrap: 'wrap' }}>
              {r.tags.map(tag => (
                <span key={tag} style={{ background: theme.bg, border: `1px solid ${theme.border}`,
                  borderRadius: 5, padding: '1px 7px', color: theme.textSub, fontSize: 10 }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div style={{ padding: '4px 20px 28px' }}>
        <div onClick={() => setNavigating(!navigating)}
          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}BB)`,
            borderRadius: 15, padding: '15px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer',
            boxShadow: `0 8px 24px ${theme.primaryGlow}`, transition: 'transform 0.1s',
            transform: navigating ? 'scale(0.98)' : 'scale(1)' }}>
          {navigating
            ? <><CheckCircleIcon size={18} color="white" style={{ marginRight: 8 }} />
                <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>Navigation Active</span></>
            : <><NavigationIcon size={18} color="white" style={{ marginRight: 8 }} />
                <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>Start {routes[selectedRoute]?.label}</span></>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Explore Screen ───────────────────────────────────────────────────────────
function ExploreScreen({ theme }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const Volume2Icon = window.lucide.Volume2;
  const EyeIcon = window.lucide.Eye;
  const UsersIcon = window.lucide.Users;
  const AlertTriangleIcon = window.lucide.AlertTriangle;
  const ThumbsUpIcon = window.lucide.ThumbsUp;
  const PlusCircleIcon = window.lucide.PlusCircle;
  const ClockIcon = window.lucide.Clock;

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'noise', label: 'Noise', Icon: Volume2Icon },
    { id: 'lighting', label: 'Lighting', Icon: EyeIcon },
    { id: 'crowds', label: 'Crowds', Icon: UsersIcon },
    { id: 'hazards', label: 'Hazards', Icon: AlertTriangleIcon },
  ];

  const reports = [
    { id: 1, type: 'noise', Icon: Volume2Icon, color: '#F87171',
      location: 'Broadway & 42nd St', title: 'Loud construction, avoid 7am–6pm',
      detail: 'Heavy drilling equipment operating weekdays. Very loud. Recommend taking 41st St parallel detour instead.',
      time: '2h ago', likes: 24, severity: 'high' },
    { id: 2, type: 'lighting', Icon: EyeIcon, color: '#34D399',
      location: 'Riverside Dr (116th–125th)',
      title: 'New LED lights installed — great at night',
      detail: 'City upgraded street lighting. Feels very safe after dark, good visibility for solo walkers.',
      time: '5h ago', likes: 41, severity: 'positive' },
    { id: 3, type: 'crowds', Icon: UsersIcon, color: '#FBBF24',
      location: 'Penn Station (7th Ave exit)',
      title: 'Overcrowded during AM rush 8–9:30am',
      detail: 'Platform transfers extremely packed. Use 8th Ave exit instead — much calmer with less congestion.',
      time: '1d ago', likes: 87, severity: 'moderate' },
    { id: 4, type: 'hazards', Icon: AlertTriangleIcon, color: '#F87171',
      location: 'Amsterdam Ave & 96th St',
      title: 'Uneven pavement — stroller & wheelchair hazard',
      detail: 'Large sidewalk crack near bus stop. Difficult for strollers/wheelchairs. 311 ticket #4892 filed.',
      time: '2d ago', likes: 19, severity: 'high' },
    { id: 5, type: 'noise', Icon: Volume2Icon, color: '#34D399',
      location: 'Bleecker St (MacDougal–6th Ave)',
      title: 'Calm, quiet evening stretch',
      detail: 'Quieter than expected even on weekends after 9pm. Great for winding down on the walk home.',
      time: '3d ago', likes: 53, severity: 'positive' },
  ];

  const filtered = activeFilter === 'all' ? reports : reports.filter(r => r.type === activeFilter);

  const areaStats = [
    { label: 'Calm Zones', value: '34', color: theme.calm },
    { label: 'Reports Today', value: '12', color: theme.warning },
    { label: 'Verified Safe', value: '89%', color: theme.info },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      {/* Header */}
      <div style={{ background: theme.surface, padding: '15px 20px 16px',
        borderBottom: `1px solid ${theme.border}` }}>
        <h2 style={{ color: theme.text, fontSize: 18, fontWeight: 700, margin: '0 0 3px' }}>City Comfort Map</h2>
        <p style={{ color: theme.textSub, fontSize: 12, margin: 0 }}>Community-sourced environment reports</p>
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 8 }}>
        {areaStats.map((s, i) => (
          <div key={i} style={{ flex: 1, background: theme.card, borderRadius: 14, padding: '12px 10px',
            border: `1px solid ${theme.border}`, textAlign: 'center' }}>
            <p style={{ color: s.color, fontSize: 21, fontWeight: 800, margin: '0 0 2px', lineHeight: 1 }}>{s.value}</p>
            <p style={{ color: theme.textSub, fontSize: 10, margin: 0, lineHeight: 1.3 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mini map heatmap */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ height: 130, background: theme.mapBg, borderRadius: 16, overflow: 'hidden',
          position: 'relative', border: `1px solid ${theme.border}` }}>
          <svg width="100%" height="130" viewBox="0 0 335 130">
            <rect width="335" height="130" fill={theme.mapBg} />
            {[25, 55, 85, 115].map(y => (
              <rect key={y} x="0" y={y-3} width="335" height="6" fill={theme.mapGrid} />
            ))}
            {[45, 90, 135, 180, 225, 270].map(x => (
              <rect key={x} x={x-3} y="0" width="6" height="130" fill={theme.mapGrid} />
            ))}
            {/* Heat zones */}
            <circle cx="80" cy="40" r="32" fill="#34D399" opacity="0.13" />
            <circle cx="210" cy="75" r="42" fill="#F87171" opacity="0.13" />
            <circle cx="290" cy="30" r="24" fill="#FBBF24" opacity="0.15" />
            <circle cx="145" cy="105" r="30" fill="#34D399" opacity="0.1" />
            <circle cx="80" cy="40" r="7" fill="#34D399" opacity="0.9" />
            <circle cx="210" cy="75" r="7" fill="#F87171" opacity="0.9" />
            <circle cx="290" cy="30" r="6" fill="#FBBF24" opacity="0.9" />
            <circle cx="145" cy="105" r="6" fill="#34D399" opacity="0.9" />
            <circle cx="250" cy="110" r="5" fill="#F87171" opacity="0.8" />
          </svg>
          <div style={{ position: 'absolute', top: 9, left: 9, background: `${theme.surface}CC`,
            borderRadius: 7, padding: '4px 8px', backdropFilter: 'blur(8px)' }}>
            <span style={{ color: theme.text, fontSize: 10, fontWeight: 600 }}>Manhattan, NY</span>
          </div>
          <div style={{ position: 'absolute', bottom: 9, right: 9, background: `${theme.surface}CC`,
            borderRadius: 7, padding: '5px 9px', backdropFilter: 'blur(8px)',
            display: 'flex', gap: 10 }}>
            {[['#34D399','Calm'],['#FBBF24','Mod.'],['#F87171','Busy']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
                <span style={{ color: theme.text, fontSize: 9 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <div key={f.id} onClick={() => setActiveFilter(f.id)}
              style={{ background: activeFilter === f.id ? theme.primaryDim : theme.card,
                border: `1.5px solid ${activeFilter === f.id ? theme.primary : theme.border}`,
                borderRadius: 20, padding: '5px 13px', cursor: 'pointer', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
              {f.Icon && <f.Icon size={11} color={activeFilter === f.id ? theme.primary : theme.textSub} />}
              <span style={{ color: activeFilter === f.id ? theme.primary : theme.textSub,
                fontSize: 11, fontWeight: 600 }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reports */}
      <div style={{ padding: '12px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: 0,
            letterSpacing: 0.8, textTransform: 'uppercase' }}>Community Reports</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <PlusCircleIcon size={13} color={theme.primary} />
            <span style={{ color: theme.primary, fontSize: 12, fontWeight: 600 }}>Add Report</span>
          </div>
        </div>
        {filtered.map(r => {
          const Icon = r.Icon;
          const isOpen = expanded === r.id;
          return (
            <div key={r.id} onClick={() => setExpanded(isOpen ? null : r.id)}
              style={{ background: theme.card, border: `1px solid ${isOpen ? r.color + '55' : theme.border}`,
                borderRadius: 15, padding: '13px 14px', marginBottom: 8, cursor: 'pointer',
                transition: 'border-color 0.15s' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${r.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={r.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: theme.text, fontSize: 12, fontWeight: 600, margin: '0 0 2px' }}>{r.title}</p>
                  <p style={{ color: theme.textMuted, fontSize: 10, margin: isOpen ? '0 0 8px' : 0 }}>{r.location}</p>
                  {isOpen && (
                    <p style={{ color: theme.textSub, fontSize: 11, margin: '0 0 7px', lineHeight: 1.5 }}>{r.detail}</p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <ClockIcon size={9} color={theme.textMuted} />
                      <span style={{ color: theme.textMuted, fontSize: 10 }}>{r.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <ThumbsUpIcon size={9} color={theme.textMuted} />
                      <span style={{ color: theme.textMuted, fontSize: 10 }}>{r.likes}</span>
                    </div>
                    <div style={{ marginLeft: 'auto', background: `${r.color}1A`,
                      borderRadius: 6, padding: '2px 8px' }}>
                      <span style={{ color: r.color, fontSize: 9, fontWeight: 700,
                        textTransform: 'capitalize' }}>{r.severity}</span>
                    </div>
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

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ theme, isDark, toggleTheme }) {
  const [notif, setNotif] = useState(true);
  const [learn, setLearn] = useState(true);
  const [live, setLive] = useState(false);

  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const BrainIcon = window.lucide.Brain;
  const BellIcon = window.lucide.Bell;
  const ZapIcon = window.lucide.Zap;
  const StarIcon = window.lucide.Star;
  const RouteIcon = window.lucide.Route;
  const HeartIcon = window.lucide.Heart;
  const ActivityIcon = window.lucide.Activity;
  const MapPinIcon = window.lucide.MapPin;
  const SettingsIcon = window.lucide.Settings;
  const NavigationIcon = window.lucide.Navigation;

  const stats = [
    { label: 'Routes Taken', value: '127', Icon: NavigationIcon, color: theme.primary },
    { label: 'Avg Comfort', value: '84%', Icon: HeartIcon, color: '#F87171' },
    { label: 'Hours Calm', value: '12h', Icon: ActivityIcon, color: '#FBBF24' },
    { label: 'Reports Filed', value: '8', Icon: MapPinIcon, color: '#A78BFA' },
  ];

  const prefs = [
    { label: 'Prefer wide sidewalks', active: true },
    { label: 'Avoid stairs when possible', active: true },
    { label: 'Favor quiet residential streets', active: true },
    { label: 'Well-lit route after 8pm', active: true },
    { label: 'Avoid crowded transit hubs', active: false },
    { label: 'Shaded paths in summer heat', active: false },
  ];

  const Toggle = ({ on, toggle }) => (
    <div onClick={toggle} style={{ width: 42, height: 23, borderRadius: 12,
      background: on ? theme.primary : theme.border, position: 'relative', cursor: 'pointer',
      transition: 'background 0.25s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 21 : 2,
        width: 19, height: 19, borderRadius: '50%', background: 'white',
        transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
    </div>
  );

  const SettingRow = ({ icon, iconBg, title, sub, toggle, on }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 16px',
      borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: theme.text, fontSize: 12, fontWeight: 600, margin: '0 0 1px' }}>{title}</p>
        <p style={{ color: theme.textMuted, fontSize: 10, margin: 0 }}>{sub}</p>
      </div>
      <Toggle on={on} toggle={toggle} />
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg }}>
      {/* Header */}
      <div style={{ background: theme.surface, padding: '18px 20px 20px',
        borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 58, height: 58, borderRadius: 18, flexShrink: 0,
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 800, color: 'white' }}>A</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: theme.text, fontSize: 18, fontWeight: 700, margin: '0 0 3px' }}>Alex Morgan</h2>
          <p style={{ color: theme.textSub, fontSize: 11, margin: '0 0 5px' }}>Member since Jan 2025</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <StarIcon size={11} color="#FBBF24" fill="#FBBF24" />
            <span style={{ color: '#FBBF24', fontSize: 11, fontWeight: 600 }}>Top Contributor</span>
          </div>
        </div>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`,
          borderRadius: 10, padding: 9, cursor: 'pointer' }}>
          <SettingsIcon size={15} color={theme.textSub} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {stats.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div key={i} style={{ background: theme.card, borderRadius: 14, padding: '13px',
                border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${s.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={s.color} />
                </div>
                <div>
                  <p style={{ color: theme.text, fontSize: 18, fontWeight: 800, margin: '0 0 1px', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: theme.textMuted, fontSize: 10, margin: 0 }}>{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learned preferences */}
      <div style={{ padding: '14px 20px 0' }}>
        <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 10px',
          letterSpacing: 0.8, textTransform: 'uppercase' }}>Learned Preferences</p>
        <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          {prefs.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px',
              borderBottom: i < prefs.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: p.active ? theme.primary : theme.textMuted }} />
              <span style={{ color: p.active ? theme.text : theme.textMuted, fontSize: 12, flex: 1 }}>{p.label}</span>
              <div style={{ background: p.active ? `${theme.primary}15` : 'transparent',
                border: `1px solid ${p.active ? theme.primary + '35' : theme.border}`,
                borderRadius: 5, padding: '1px 7px' }}>
                <span style={{ color: p.active ? theme.primary : theme.textMuted, fontSize: 9, fontWeight: 700 }}>
                  {p.active ? 'Active' : 'Off'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: theme.textMuted, fontSize: 10, margin: '7px 0 0', textAlign: 'center' }}>
          Learned automatically from your 127 routes
        </p>
      </div>

      {/* Settings */}
      <div style={{ padding: '14px 20px 0' }}>
        <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 10px',
          letterSpacing: 0.8, textTransform: 'uppercase' }}>App Settings</p>
        <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          <SettingRow
            icon={isDark ? <MoonIcon size={15} color="#818CF8" /> : <SunIcon size={15} color="#FBBF24" />}
            iconBg={isDark ? '#1A1A3A' : '#FFF8E7'}
            title={isDark ? 'Dark Mode' : 'Light Mode'}
            sub="Toggle appearance theme"
            on={isDark}
            toggle={toggleTheme} />
          <SettingRow
            icon={<BellIcon size={15} color={theme.primary} />}
            iconBg={theme.primaryDim}
            title="Route Alerts"
            sub="Notify before stressful areas"
            on={notif}
            toggle={() => setNotif(v => !v)} />
          <SettingRow
            icon={<BrainIcon size={15} color="#A78BFA" />}
            iconBg="#A78BFA18"
            title="Adaptive Learning"
            sub="Learn from your route choices"
            on={learn}
            toggle={() => setLearn(v => !v)} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 16px' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#34D39918',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ZapIcon size={15} color="#34D399" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: theme.text, fontSize: 12, fontWeight: 600, margin: '0 0 1px' }}>Live City Data</p>
              <p style={{ color: theme.textMuted, fontSize: 10, margin: 0 }}>Real-time noise & crowd updates</p>
            </div>
            <Toggle on={live} toggle={() => setLive(v => !v)} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '18px 20px 30px', textAlign: 'center' }}>
        <p style={{ color: theme.textMuted, fontSize: 10, margin: 0 }}>DetourMap v1.0.0 · Made with care for calmer cities</p>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(d => !d);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'navigate', label: 'Navigate', icon: window.lucide.Navigation },
    { id: 'explore', label: 'Explore', icon: window.lucide.Map },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    navigate: NavigateScreen,
    explore: ExploreScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#03050F' : '#C8D5F0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif", padding: '20px 0' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        input { font-family: 'Space Grotesk', sans-serif; }
      `}} />

      {/* Phone frame */}
      <div style={{ width: 375, height: 812, borderRadius: 50, background: theme.surface,
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: isDark
          ? '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 40px 80px rgba(0,0,80,0.2), 0 0 0 1px rgba(0,0,80,0.1)' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 13, left: '50%',
          transform: 'translateX(-50%)', width: 126, height: 34,
          borderRadius: 20, background: '#000', zIndex: 200 }} />

        {/* Status bar */}
        <StatusBar theme={theme} isDark={isDark} toggleTheme={toggleTheme} />

        {/* Spacer behind dynamic island */}
        <div style={{ height: 18, background: theme.surface }} />

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <ActiveScreen theme={theme} isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        {/* Bottom navigation */}
        <div style={{ background: theme.navBg, borderTop: `1px solid ${theme.border}`,
          padding: '8px 0 22px', display: 'flex' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12,
                  background: isActive ? theme.primaryDim : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s' }}>
                  <Icon size={21} color={isActive ? theme.primary : theme.textMuted} />
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400,
                  color: isActive ? theme.primary : theme.textMuted, transition: 'color 0.2s' }}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
