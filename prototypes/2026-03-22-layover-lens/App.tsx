
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0F1E',
    surface: '#111827',
    surfaceAlt: '#1A2235',
    surfaceHigh: '#1E2D45',
    card: '#162032',
    border: '#1F2F48',
    text: '#F0F4FF',
    textSub: '#8B9DC3',
    textMuted: '#4A5E82',
    primary: '#00D4AA',
    primaryDim: '#00D4AA22',
    primaryGlow: '#00D4AA44',
    accent: '#FF6B35',
    accentDim: '#FF6B3522',
    warning: '#F59E0B',
    warningDim: '#F59E0B22',
    danger: '#EF4444',
    success: '#10B981',
    navBg: '#0D1526',
    statusBar: '#0A0F1E',
    shadow: 'rgba(0,0,0,0.5)',
    gradient1: 'linear-gradient(135deg, #00D4AA22 0%, #0057FF11 100%)',
    gradient2: 'linear-gradient(135deg, #FF6B3522 0%, #FF006622 100%)',
    gradient3: 'linear-gradient(135deg, #F59E0B22 0%, #FF6B3522 100%)',
  },
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F7F9FF',
    surfaceHigh: '#EEF2FF',
    card: '#FFFFFF',
    border: '#E2E8F0',
    text: '#0F172A',
    textSub: '#475569',
    textMuted: '#94A3B8',
    primary: '#00B894',
    primaryDim: '#00B89422',
    primaryGlow: '#00B89444',
    accent: '#FF6B35',
    accentDim: '#FF6B3522',
    warning: '#D97706',
    warningDim: '#D9770622',
    danger: '#DC2626',
    success: '#059669',
    navBg: '#FFFFFF',
    statusBar: '#F0F4FF',
    shadow: 'rgba(0,0,0,0.1)',
    gradient1: 'linear-gradient(135deg, #00B89418 0%, #0057FF0D 100%)',
    gradient2: 'linear-gradient(135deg, #FF6B3518 0%, #FF006618 100%)',
    gradient3: 'linear-gradient(135deg, #D9770618 0%, #FF6B3518 100%)',
  }
};

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { display: none; }
  body { font-family: 'Outfit', sans-serif; }
`;

const itineraries = [
  {
    id: 1,
    title: 'Coffee & Modern Art Sprint',
    duration: '2h 45m',
    returnBy: '14:15',
    distance: '3.2 km',
    type: 'culture',
    icon: '🎨',
    risk: 'low',
    steps: [
      { place: 'Transit to City Center', time: '22 min', note: 'Metro Line 2 from Terminal B', type: 'transit' },
      { place: 'Blue Bottle Coffee', time: '20 min', note: '3 min walk from Stadtmitte', type: 'food' },
      { place: 'Museum of Modern Art', time: '55 min', note: 'Free with travel card', type: 'activity' },
      { place: 'Return to Airport', time: '28 min', note: 'Express train, departs 13:47', type: 'transit' },
    ],
    tags: ['No Visa Needed', 'Carry-On OK', 'Indoors'],
    energy: 2,
    color: '#00D4AA',
    feasibility: 94,
  },
  {
    id: 2,
    title: 'Riverside Walk & Local Lunch',
    duration: '3h 10m',
    returnBy: '14:00',
    distance: '4.8 km',
    type: 'nature',
    icon: '🌿',
    risk: 'low',
    steps: [
      { place: 'Transit to Old Town', time: '35 min', note: 'Bus 108 from Terminal A', type: 'transit' },
      { place: 'Elbe Riverside Promenade', time: '40 min', note: 'Scenic 1.5km walk', type: 'activity' },
      { place: 'Zum Schiffchen Restaurant', time: '50 min', note: 'Reservation recommended', type: 'food' },
      { place: 'Return to Airport', time: '42 min', note: 'Allow 15min buffer for security', type: 'transit' },
    ],
    tags: ['No Visa Needed', 'Checked Bags: Leave at Airport', 'Outdoor'],
    energy: 3,
    color: '#10B981',
    feasibility: 87,
  },
  {
    id: 3,
    title: 'Quick Spa Reset',
    duration: '1h 50m',
    returnBy: '14:45',
    distance: '0 km',
    type: 'wellness',
    icon: '✨',
    risk: 'very low',
    steps: [
      { place: 'Terminal B SkyLounge Spa', time: '5 min', note: 'Level 3, Gate B22 direction', type: 'transit' },
      { place: 'Express Massage (30 min)', time: '30 min', note: 'Book at concierge desk', type: 'activity' },
      { place: 'Shower & Refresh', time: '20 min', note: 'Included in spa package', type: 'activity' },
      { place: 'Gate B18 (Direct)', time: '10 min', note: 'No security re-screening', type: 'transit' },
    ],
    tags: ['In-Terminal', 'All Bags OK', 'No Visa'],
    energy: 1,
    color: '#8B5CF6',
    feasibility: 99,
  },
  {
    id: 4,
    title: 'City Highlights Fast-Track',
    duration: '3h 50m',
    returnBy: '13:30',
    distance: '6.1 km',
    type: 'sightseeing',
    icon: '🏛️',
    risk: 'medium',
    steps: [
      { place: 'Airport Express Train', time: '28 min', note: 'Departs 09:42 from T1', type: 'transit' },
      { place: 'Brandenburg Gate', time: '25 min', note: 'Photo stop, exterior only', type: 'activity' },
      { place: 'Checkpoint Charlie', time: '20 min', note: '12 min walk or U-Bahn', type: 'activity' },
      { place: 'Currywurst at Konnopke', time: '20 min', note: 'Berlin institution since 1930', type: 'food' },
      { place: 'Return Express Train', time: '32 min', note: 'Allow 45min for security!', type: 'transit' },
    ],
    tags: ['No Visa Needed', 'Leave Bags at Airport', 'High Energy'],
    energy: 4,
    color: '#F59E0B',
    feasibility: 71,
  },
];

const alerts = [
  { id: 1, type: 'warning', message: 'Security wait at Terminal A is now 28 min — 8 min longer than estimated.', time: '2 min ago', action: 'Adjust Plan' },
  { id: 2, type: 'info', message: 'Your gate changed from B18 to B24. Return timing still safe.', time: '15 min ago', action: 'View Route' },
  { id: 3, type: 'success', message: 'Metro Line 2 running on schedule. Coffee stop confirmed feasible.', time: '32 min ago', action: null },
];

function StatusBar({ theme }) {
  const t = themes[theme];
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const WifiIcon = window.lucide?.Wifi;
  const BatteryIcon = window.lucide?.Battery;
  const SignalIcon = window.lucide?.Signal;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', backgroundColor: t.statusBar }}>
      <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, color: t.text, letterSpacing: 0.5 }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {SignalIcon && <SignalIcon size={14} color={t.text} />}
        {WifiIcon && <WifiIcon size={14} color={t.text} />}
        {BatteryIcon && <BatteryIcon size={14} color={t.text} />}
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
      <div style={{ width: 120, height: 34, backgroundColor: '#000', borderRadius: 20 }} />
    </div>
  );
}

function EnergyDots({ level, color }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i <= level ? color : '#ffffff22' }} />
      ))}
    </div>
  );
}

function RiskBadge({ risk, t }) {
  const colors = { 'very low': t.success, 'low': t.primary, 'medium': t.warning, 'high': t.danger };
  const color = colors[risk] || t.primary;
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color, backgroundColor: color + '22', padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
      {risk} risk
    </span>
  );
}

function FeasibilityBar({ value, color, t }) {
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>Feasibility Score</span>
        <span style={{ fontSize: 11, color, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 4, backgroundColor: t.border, borderRadius: 2 }}>
        <div style={{ height: 4, width: `${value}%`, backgroundColor: color, borderRadius: 2, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  );
}

function HomeScreen({ t, theme }) {
  const [activeAlert, setActiveAlert] = useState(0);
  const [layoverMinutes, setLayoverMinutes] = useState(247);
  const [pressedCard, setPressedCard] = useState(null);

  const hours = Math.floor(layoverMinutes / 60);
  const mins = layoverMinutes % 60;

  const PlaneTakeoffIcon = window.lucide?.PlaneTakeoff;
  const ClockIcon = window.lucide?.Clock;
  const MapPinIcon = window.lucide?.MapPin;
  const AlertCircleIcon = window.lucide?.AlertCircle;
  const ChevronRightIcon = window.lucide?.ChevronRight;
  const BellIcon = window.lucide?.Bell;
  const ZapIcon = window.lucide?.Zap;
  const NavigationIcon = window.lucide?.Navigation;

  const featuredItinerary = itineraries[0];

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: t.bg }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', background: `linear-gradient(180deg, ${t.surface} 0%, ${t.bg} 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>Current Layover</p>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2 }}>Frankfurt · FRA</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              {PlaneTakeoffIcon && <PlaneTakeoffIcon size={13} color={t.primary} />}
              <span style={{ fontSize: 13, color: t.textSub, fontWeight: 500 }}>Terminal B → Gate B18 → NYC JFK</span>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {BellIcon && <BellIcon size={18} color={t.textSub} />}
            </div>
            <div style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, backgroundColor: t.accent, borderRadius: 5, border: `2px solid ${t.bg}` }} />
          </div>
        </div>

        {/* Countdown */}
        <div style={{ marginTop: 16, padding: '16px 20px', backgroundColor: t.card, borderRadius: 16, border: `1px solid ${t.border}`, background: t.gradient1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Window Remaining</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                <span style={{ fontSize: 42, fontWeight: 800, color: t.primary, lineHeight: 1 }}>{hours}h {mins}m</span>
              </div>
              <p style={{ fontSize: 12, color: t.textSub, marginTop: 4 }}>Must board by <strong style={{ color: t.text }}>15:10</strong> · Security closes 14:40</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ width: 56, height: 56, borderRadius: 28, border: `3px solid ${t.primary}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: t.primaryDim }}>
                {ClockIcon && <ClockIcon size={22} color={t.primary} />}
              </div>
              <p style={{ fontSize: 10, color: t.textMuted, marginTop: 4 }}>Live tracking</p>
            </div>
          </div>
          <div style={{ marginTop: 12, height: 4, backgroundColor: t.border, borderRadius: 2 }}>
            <div style={{ height: 4, width: '68%', background: `linear-gradient(90deg, ${t.primary}, ${t.primary}88)`, borderRadius: 2 }} />
          </div>
          <p style={{ fontSize: 10, color: t.textMuted, marginTop: 4 }}>68% of window unused · {layoverMinutes} min available</p>
        </div>
      </div>

      {/* Live Alert */}
      {alerts.slice(0, 1).map(alert => (
        <div key={alert.id} style={{ margin: '0 20px 12px', padding: '12px 14px', backgroundColor: t.warningDim, border: `1px solid ${t.warning}44`, borderRadius: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          {AlertCircleIcon && <AlertCircleIcon size={16} color={t.warning} style={{ marginTop: 1, flexShrink: 0 }} />}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: t.text, fontWeight: 500, lineHeight: 1.4 }}>{alert.message}</p>
            <p style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{alert.time}</p>
          </div>
          {alert.action && (
            <span style={{ fontSize: 11, color: t.warning, fontWeight: 700, flexShrink: 0 }}>{alert.action}</span>
          )}
        </div>
      ))}

      {/* Context Tags */}
      <div style={{ padding: '0 20px 16px' }}>
        <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Your Situation</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Carry-on Only', 'US Passport', '🌤 18°C', 'Energy: Medium', 'Terminal B'].map((tag, i) => (
            <span key={i} style={{ fontSize: 12, color: t.primary, backgroundColor: t.primaryDim, padding: '5px 12px', borderRadius: 20, fontWeight: 500, border: `1px solid ${t.primary}33` }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Featured Plan */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: t.text, fontWeight: 700 }}>Best Match For You</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {ZapIcon && <ZapIcon size={12} color={t.primary} />}
            <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>94% Feasible</span>
          </div>
        </div>

        <div
          onMouseDown={() => setPressedCard(1)}
          onMouseUp={() => setPressedCard(null)}
          onTouchStart={() => setPressedCard(1)}
          onTouchEnd={() => setPressedCard(null)}
          style={{
            backgroundColor: t.card,
            borderRadius: 20,
            border: `1px solid ${t.primary}44`,
            overflow: 'hidden',
            transform: pressedCard === 1 ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 0.15s ease',
            cursor: 'pointer',
          }}
        >
          <div style={{ padding: '16px 18px 12px', background: t.gradient1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{featuredItinerary.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: t.text }}>{featuredItinerary.title}</h3>
                <p style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{featuredItinerary.duration} total · Back by {featuredItinerary.returnBy}</p>
              </div>
              <RiskBadge risk={featuredItinerary.risk} t={t} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {MapPinIcon && <MapPinIcon size={12} color={t.textMuted} />}
                <span style={{ fontSize: 12, color: t.textSub }}>{featuredItinerary.distance}</span>
              </div>
              <EnergyDots level={featuredItinerary.energy} color={featuredItinerary.color} />
            </div>
          </div>
          <div style={{ padding: '10px 18px 14px', borderTop: `1px solid ${t.border}` }}>
            {featuredItinerary.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < featuredItinerary.steps.length - 1 ? 8 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: step.type === 'transit' ? t.textMuted : t.primary, marginTop: 4 }} />
                  {i < featuredItinerary.steps.length - 1 && <div style={{ width: 1, height: 16, backgroundColor: t.border, marginTop: 2 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{step.place}</span>
                    <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>{step.time}</span>
                  </div>
                  <p style={{ fontSize: 11, color: t.textMuted }}>{step.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 18px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {featuredItinerary.tags.slice(0, 2).map((tag, i) => (
                <span key={i} style={{ fontSize: 10, color: t.textSub, backgroundColor: t.surfaceAlt, padding: '3px 8px', borderRadius: 10 }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {NavigationIcon && <NavigationIcon size={14} color={t.primary} />}
              <span style={{ fontSize: 12, color: t.primary, fontWeight: 700 }}>Start</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Trips Explored', value: '23', icon: '🗺️', color: t.primary },
          { label: 'Hours Saved', value: '18.5', icon: '⚡', color: t.accent },
          { label: 'Cities Visited', value: '11', icon: '🌍', color: '#8B5CF6' },
          { label: 'Avg Feasibility', value: '91%', icon: '✅', color: t.success },
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreScreen({ t, onSelectItinerary }) {
  const [selectedType, setSelectedType] = useState('all');
  const [pressedCard, setPressedCard] = useState(null);
  const MapPinIcon = window.lucide?.MapPin;
  const ClockIcon = window.lucide?.Clock;
  const ChevronRightIcon = window.lucide?.ChevronRight;
  const FilterIcon = window.lucide?.Filter;
  const ZapIcon = window.lucide?.Zap;

  const types = ['all', 'culture', 'nature', 'wellness', 'sightseeing'];
  const filtered = selectedType === 'all' ? itineraries : itineraries.filter(i => i.type === selectedType);

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: t.bg }}>
      <div style={{ padding: '16px 20px 8px', backgroundColor: t.surface }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Explore Plans</h2>
            <p style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>4 options · 4h 7m window</p>
          </div>
          <div style={{ width: 36, height: 36, backgroundColor: t.surfaceAlt, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}` }}>
            {FilterIcon && <FilterIcon size={16} color={t.textSub} />}
          </div>
        </div>

        {/* Type Filter */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                backgroundColor: selectedType === type ? t.primary : t.surfaceAlt,
                color: selectedType === type ? '#fff' : t.textSub,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'Outfit',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 20px 20px' }}>
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            onMouseDown={() => setPressedCard(item.id)}
            onMouseUp={() => { setPressedCard(null); onSelectItinerary(item); }}
            onTouchStart={() => setPressedCard(item.id)}
            onTouchEnd={() => { setPressedCard(null); onSelectItinerary(item); }}
            style={{
              backgroundColor: t.card,
              borderRadius: 18,
              border: `1px solid ${item.feasibility > 90 ? item.color + '44' : t.border}`,
              marginBottom: 14,
              overflow: 'hidden',
              transform: pressedCard === item.id ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.15s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{ padding: '14px 16px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 46, height: 46, backgroundColor: item.color + '22', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{item.title}</h3>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4, alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {ClockIcon && <ClockIcon size={11} color={t.textMuted} />}
                        <span style={{ fontSize: 11, color: t.textSub, fontWeight: 500 }}>{item.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {MapPinIcon && <MapPinIcon size={11} color={t.textMuted} />}
                        <span style={{ fontSize: 11, color: t.textSub, fontWeight: 500 }}>{item.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <RiskBadge risk={item.risk} t={t} />
                  <p style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>Back by {item.returnBy}</p>
                </div>
              </div>

              <FeasibilityBar value={item.feasibility} color={item.color} t={t} />

              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                {item.tags.map((tag, i) => (
                  <span key={i} style={{ fontSize: 10, color: t.textMuted, backgroundColor: t.surfaceAlt, padding: '3px 8px', borderRadius: 8, border: `1px solid ${t.border}` }}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: '10px 16px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: t.surfaceAlt }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {ZapIcon && <ZapIcon size={12} color={item.color} />}
                <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>Energy Level</span>
                <EnergyDots level={item.energy} color={item.color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, color: item.color, fontWeight: 600 }}>{item.steps.length} stops</span>
                {ChevronRightIcon && <ChevronRightIcon size={14} color={item.color} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveRouteScreen({ t, selectedItinerary }) {
  const item = selectedItinerary || itineraries[0];
  const [currentStep, setCurrentStep] = useState(1);
  const [showAlert, setShowAlert] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const ClockIcon = window.lucide?.Clock;
  const NavigationIcon = window.lucide?.Navigation;
  const AlertTriangleIcon = window.lucide?.AlertTriangle;
  const CheckCircleIcon = window.lucide?.CheckCircle;
  const XIcon = window.lucide?.X;
  const ArrowRightIcon = window.lucide?.ArrowRight;
  const MapIcon = window.lucide?.Map;
  const BellIcon = window.lucide?.Bell;

  useEffect(() => {
    const interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const elapsed = `${Math.floor(timerSeconds / 60).toString().padStart(2,'0')}:${(timerSeconds % 60).toString().padStart(2,'0')}`;

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: t.bg }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 16px', backgroundColor: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, backgroundColor: t.success, borderRadius: 4 }} />
              <span style={{ fontSize: 11, color: t.success, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Route Active</span>
              <span style={{ fontSize: 11, color: t.textMuted }}>· {elapsed}</span>
            </div>
            <h2 style={{ fontSize: 19, fontWeight: 800, color: t.text }}>{item.title}</h2>
            <p style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>Return by <strong style={{ color: t.accent }}>{item.returnBy}</strong> · {item.duration} total</p>
          </div>
          <div style={{ width: 48, height: 48, backgroundColor: item.color + '22', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {item.icon}
          </div>
        </div>

        {/* Leave Now Alert */}
        <div style={{ marginTop: 12, padding: '10px 14px', backgroundColor: t.primaryDim, border: `1px solid ${t.primary}44`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          {BellIcon && <BellIcon size={16} color={t.primary} />}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>Leave museum by 13:52 to make train</p>
            <p style={{ fontSize: 11, color: t.textSub }}>Express departs Stadtmitte at 14:05 · 13 min left</p>
          </div>
        </div>
      </div>

      {/* Live Warning */}
      {showAlert && (
        <div style={{ margin: '12px 20px 0', padding: '12px 14px', backgroundColor: t.warningDim, border: `1px solid ${t.warning}55`, borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              {AlertTriangleIcon && <AlertTriangleIcon size={16} color={t.warning} style={{ marginTop: 1, flexShrink: 0 }} />}
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: t.warning }}>Security wait updated to 28 min</p>
                <p style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>Plan still feasible · Buffer reduced to 14 min</p>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              {XIcon && <XIcon size={14} color={t.textMuted} />}
            </button>
          </div>
        </div>
      )}

      {/* Steps */}
      <div style={{ padding: '16px 20px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>Your Route</p>
        {item.steps.map((step, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;
          const stepColor = isDone ? t.success : isCurrent ? item.color : t.textMuted;

          return (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < item.steps.length - 1 ? 0 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: isDone ? t.success + '22' : isCurrent ? item.color + '22' : t.surfaceAlt,
                  border: `2px solid ${stepColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                }}>
                  {isDone
                    ? (CheckCircleIcon && <CheckCircleIcon size={14} color={t.success} />)
                    : <span style={{ fontSize: 11, fontWeight: 700, color: stepColor }}>{i + 1}</span>
                  }
                </div>
                {i < item.steps.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 24, backgroundColor: isDone ? t.success + '44' : t.border, marginTop: 4, marginBottom: 4 }} />
                )}
              </div>

              <div style={{
                flex: 1,
                backgroundColor: isCurrent ? item.color + '11' : t.card,
                borderRadius: 14,
                padding: '12px 14px',
                border: `1px solid ${isCurrent ? item.color + '44' : t.border}`,
                marginBottom: 8,
                opacity: isDone ? 0.6 : 1,
                transition: 'all 0.3s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: isCurrent ? item.color : t.text }}>{step.place}</p>
                    <p style={{ fontSize: 12, color: t.textSub, marginTop: 3 }}>{step.note}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: isCurrent ? item.color : t.textSub }}>{step.time}</span>
                    {isCurrent && <p style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>In progress</p>}
                  </div>
                </div>
                {isCurrent && (
                  <button
                    onClick={() => setCurrentStep(s => Math.min(s + 1, item.steps.length - 1))}
                    style={{
                      marginTop: 10, width: '100%', padding: '8px', borderRadius: 10,
                      backgroundColor: item.color, border: 'none', color: '#fff',
                      fontSize: 12, fontWeight: 700, fontFamily: 'Outfit', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    Mark Complete {ArrowRightIcon && <ArrowRightIcon size={13} />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Return Countdown */}
      <div style={{ margin: '0 20px 20px', padding: '16px', backgroundColor: t.card, borderRadius: 16, border: `1px solid ${t.accent}44`, background: t.gradient2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Latest Departure</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: t.accent, marginTop: 4 }}>1h 23m remaining</p>
            <p style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>Leave by 13:52 · Includes 45min security buffer</p>
          </div>
          {ClockIcon && <ClockIcon size={32} color={t.accent} />}
        </div>
      </div>
    </div>
  );
}

function AlertsScreen({ t }) {
  const AlertCircleIcon = window.lucide?.AlertCircle;
  const CheckCircleIcon = window.lucide?.CheckCircle;
  const InfoIcon = window.lucide?.Info;
  const BellIcon = window.lucide?.Bell;

  const iconMap = { warning: AlertCircleIcon, success: CheckCircleIcon, info: InfoIcon };
  const colorMap = { warning: t.warning, success: t.success, info: t.primary };
  const bgMap = { warning: t.warningDim, success: t.success + '18', info: t.primaryDim };

  const allAlerts = [
    ...alerts,
    { id: 4, type: 'warning', message: 'Heavy traffic on Autobahn A5 — consider metro instead of taxi for return.', time: '45 min ago', action: 'Reroute' },
    { id: 5, type: 'info', message: 'Blue Bottle Coffee has a 10-min queue right now.', time: '1h ago', action: null },
    { id: 6, type: 'success', message: 'Museum of Modern Art entry confirmed — no wait expected at 11:00.', time: '2h ago', action: null },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: t.bg }}>
      <div style={{ padding: '16px 20px 12px', backgroundColor: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Live Alerts</h2>
        <p style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Reroutes and updates for your trip</p>
      </div>

      <div style={{ padding: '16px 20px' }}>
        {/* Active Banner */}
        <div style={{ padding: '14px 16px', backgroundColor: t.accent + '22', border: `1px solid ${t.accent}55`, borderRadius: 16, marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, backgroundColor: t.accent + '33', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {BellIcon && <BellIcon size={18} color={t.accent} />}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: t.accent }}>3 active alerts on your route</p>
            <p style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>Plan still within safe window</p>
          </div>
        </div>

        {allAlerts.map(alert => {
          const Icon = iconMap[alert.type];
          const color = colorMap[alert.type];
          const bg = bgMap[alert.type];

          return (
            <div key={alert.id} style={{ backgroundColor: t.card, borderRadius: 16, border: `1px solid ${t.border}`, marginBottom: 10, overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, backgroundColor: bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {Icon && <Icon size={16} color={color} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: t.text, fontWeight: 500, lineHeight: 1.4 }}>{alert.message}</p>
                  <p style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>{alert.time}</p>
                </div>
              </div>
              {alert.action && (
                <div style={{ padding: '8px 14px', borderTop: `1px solid ${t.border}`, backgroundColor: t.surfaceAlt }}>
                  <span style={{ fontSize: 12, color, fontWeight: 700 }}>{alert.action} →</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsScreen({ t, theme, setTheme }) {
  const SunIcon = window.lucide?.Sun;
  const MoonIcon = window.lucide?.Moon;
  const UserIcon = window.lucide?.User;
  const GlobeIcon = window.lucide?.Globe;
  const BellIcon = window.lucide?.Bell;
  const ShieldIcon = window.lucide?.Shield;
  const ChevronRightIcon = window.lucide?.ChevronRight;
  const LogOutIcon = window.lucide?.LogOut;
  const PlaneIcon = window.lucide?.Plane;
  const ZapIcon = window.lucide?.Zap;

  const [notifOn, setNotifOn] = useState(true);
  const [autoReroute, setAutoReroute] = useState(true);
  const [luggage, setLuggage] = useState('carry-on');

  const Toggle = ({ value, onChange, color }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 26, borderRadius: 13,
        backgroundColor: value ? (color || t.primary) : t.border,
        position: 'relative', cursor: 'pointer',
        transition: 'background-color 0.25s ease',
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff',
        transition: 'left 0.25s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: t.bg }}>
      <div style={{ padding: '16px 20px 12px', backgroundColor: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Settings</h2>
        <p style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Customize your experience</p>
      </div>

      {/* Profile Card */}
      <div style={{ margin: '16px 20px 0', padding: '16px', backgroundColor: t.card, borderRadius: 18, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 26, background: `linear-gradient(135deg, ${t.primary}, ${t.primary}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 22 }}>✈️</span>
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Alex Chen</p>
            <p style={{ fontSize: 12, color: t.textSub }}>US Passport · Frequent Flyer</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 10, color: t.primary, backgroundColor: t.primaryDim, padding: '2px 8px', borderRadius: 10 }}>Star Alliance Gold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div style={{ margin: '12px 20px 0', padding: '14px 16px', backgroundColor: t.card, borderRadius: 18, border: `1px solid ${t.border}` }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Appearance</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {theme === 'dark'
              ? (MoonIcon && <MoonIcon size={18} color={t.primary} />)
              : (SunIcon && <SunIcon size={18} color={t.primary} />)
            }
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
              <p style={{ fontSize: 12, color: t.textMuted }}>Switch theme</p>
            </div>
          </div>
          <Toggle value={theme === 'dark'} onChange={(v) => setTheme(v ? 'dark' : 'light')} />
        </div>
      </div>

      {/* Travel Preferences */}
      <div style={{ margin: '12px 20px 0', padding: '14px 16px', backgroundColor: t.card, borderRadius: 18, border: `1px solid ${t.border}` }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Travel Profile</p>

        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 8 }}>Luggage Situation</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {['carry-on', 'checked', 'none'].map(opt => (
              <button
                key={opt}
                onClick={() => setLuggage(opt)}
                style={{
                  padding: '6px 12px', borderRadius: 20, border: 'none', fontFamily: 'Outfit',
                  backgroundColor: luggage === opt ? t.primary : t.surfaceAlt,
                  color: luggage === opt ? '#fff' : t.textSub,
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
                  transition: 'all 0.2s ease',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 8 }}>Energy Level</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Low', 'Medium', 'High'].map((opt, i) => (
              <button
                key={opt}
                style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${i === 1 ? t.primary : t.border}`, fontFamily: 'Outfit', backgroundColor: i === 1 ? t.primaryDim : 'transparent', color: i === 1 ? t.primary : t.textSub, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 4 }}>
          <p style={{ fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 8 }}>Passport / Visa</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['🇺🇸 US Passport', 'Schengen Zone', 'EU Transit OK'].map((tag, i) => (
              <span key={i} style={{ fontSize: 12, color: t.textSub, backgroundColor: t.surfaceAlt, padding: '5px 12px', borderRadius: 10, border: `1px solid ${t.border}` }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ margin: '12px 20px 0', padding: '14px 16px', backgroundColor: t.card, borderRadius: 18, border: `1px solid ${t.border}` }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Notifications</p>
        {[
          { label: 'Live Reroute Alerts', sub: 'When your plan becomes unsafe', value: notifOn, set: setNotifOn },
          { label: 'Auto-Reroute', sub: 'Suggest alternatives automatically', value: autoReroute, set: setAutoReroute },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i === 0 ? 12 : 0, borderBottom: i === 0 ? `1px solid ${t.border}` : 'none', paddingTop: i === 1 ? 12 : 0 }}>
            <div>
              <p style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{row.label}</p>
              <p style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{row.sub}</p>
            </div>
            <Toggle value={row.value} onChange={row.set} />
          </div>
        ))}
      </div>

      {/* App Info */}
      <div style={{ margin: '12px 20px 20px', padding: '14px 16px', backgroundColor: t.card, borderRadius: 18, border: `1px solid ${t.border}` }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>About</p>
        {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < 2 ? 12 : 0, borderBottom: i < 2 ? `1px solid ${t.border}` : 'none', paddingTop: i > 0 ? 12 : 0 }}>
            <span style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{item}</span>
            {ChevronRightIcon && <ChevronRightIcon size={16} color={t.textMuted} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const t = themes[theme];

  const HomeIcon = window.lucide?.Home;
  const CompassIcon = window.lucide?.Compass;
  const NavigationIcon = window.lucide?.Navigation;
  const BellIcon = window.lucide?.Bell;
  const UserIcon = window.lucide?.User;

  const tabs = [
    { id: 'home', label: 'Today', Icon: HomeIcon },
    { id: 'explore', label: 'Explore', Icon: CompassIcon },
    { id: 'route', label: 'Route', Icon: NavigationIcon },
    { id: 'alerts', label: 'Alerts', Icon: BellIcon },
    { id: 'settings', label: 'Settings', Icon: UserIcon },
  ];

  const handleSelectItinerary = (item) => {
    setSelectedItinerary(item);
    setActiveTab('route');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>
      <style>{fontStyle}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812,
        backgroundColor: t.bg,
        borderRadius: 50,
        boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 2px #333, inset 0 0 0 1px #555`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Status Bar */}
        <StatusBar theme={theme} />
        <DynamicIsland />

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home' && <HomeScreen t={t} theme={theme} />}
          {activeTab === 'explore' && <ExploreScreen t={t} onSelectItinerary={handleSelectItinerary} />}
          {activeTab === 'route' && <ActiveRouteScreen t={t} selectedItinerary={selectedItinerary} />}
          {activeTab === 'alerts' && <AlertsScreen t={t} />}
          {activeTab === 'settings' && <SettingsScreen t={t} theme={theme} setTheme={setTheme} />}
        </div>

        {/* Bottom Nav */}
        <div style={{
          backgroundColor: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          paddingBottom: 20,
          paddingTop: 10,
        }}>
          {tabs.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                  transition: 'all 0.2s ease',
                }}
              >
                {id === 'alerts' && (
                  <div style={{ position: 'relative' }}>
                    {Icon && <Icon size={22} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />}
                    <div style={{ position: 'absolute', top: -2, right: -4, width: 8, height: 8, backgroundColor: t.accent, borderRadius: 4, border: `2px solid ${t.navBg}` }} />
                  </div>
                )}
                {id !== 'alerts' && Icon && (
                  <Icon size={22} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />
                )}
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted, letterSpacing: 0.3 }}>{label}</span>
                {isActive && <div style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: t.primary }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
