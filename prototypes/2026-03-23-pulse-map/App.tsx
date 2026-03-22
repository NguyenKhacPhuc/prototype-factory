const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080D18',
    surface: '#0F1828',
    surface2: '#162035',
    surface3: '#1C2840',
    primary: '#00C8FF',
    primaryDim: 'rgba(0,200,255,0.12)',
    primaryBorder: 'rgba(0,200,255,0.25)',
    accent: '#8B5CF6',
    text: '#E4EEFF',
    textSub: '#8A9BBF',
    textMuted: '#4A5878',
    border: '#1C2A40',
    success: '#10E5A0',
    successDim: 'rgba(16,229,160,0.12)',
    warning: '#FBBF24',
    warningDim: 'rgba(251,191,36,0.12)',
    danger: '#F43F5E',
    dangerDim: 'rgba(244,63,94,0.12)',
    orange: '#F97316',
    orangeDim: 'rgba(249,115,22,0.12)',
    navBg: '#080D18',
    mapBg: '#0B1520',
    mapGrid: '#0E1F30',
    mapStreet: '#1A3048',
    mapPark: '#0A2218',
    mapWater: '#071828',
  },
  light: {
    bg: '#EEF2FF',
    surface: '#FFFFFF',
    surface2: '#F5F7FF',
    surface3: '#EBF0FF',
    primary: '#0090BF',
    primaryDim: 'rgba(0,144,191,0.08)',
    primaryBorder: 'rgba(0,144,191,0.2)',
    accent: '#7C3AED',
    text: '#0D1321',
    textSub: '#485880',
    textMuted: '#8A9BBF',
    border: '#DDE3F5',
    success: '#059669',
    successDim: 'rgba(5,150,105,0.08)',
    warning: '#D97706',
    warningDim: 'rgba(217,119,6,0.08)',
    danger: '#DC2626',
    dangerDim: 'rgba(220,38,38,0.08)',
    orange: '#EA580C',
    orangeDim: 'rgba(234,88,12,0.08)',
    navBg: '#FFFFFF',
    mapBg: '#B8CEDD',
    mapGrid: '#A8BECE',
    mapStreet: '#D8E8F4',
    mapPark: '#8DC49A',
    mapWater: '#6A9EBE',
  },
};

const newsItems = [
  {
    id: 1, category: 'transit', title: 'Blue Line: 15–20 min delays inbound',
    location: 'Central Station → Downtown Hub', distance: '0.3 mi',
    time: '8 min ago', impact: 'high', relevance: 94,
    why: 'Your 8:45 AM commute uses Blue Line inbound',
    detail: 'Signal failure near Park St. MBTA crews on site. Expect 15–20 minute delays on all inbound Blue Line trains. Bus bridge service activated at Airport station.',
    px: 52, py: 38,
  },
  {
    id: 2, category: 'weather', title: 'Flash flood warning until 2:00 PM',
    location: 'Your neighborhood + 3 mi radius', distance: '0.0 mi',
    time: '22 min ago', impact: 'high', relevance: 88,
    why: 'Your home address is in the warning zone',
    detail: 'NWS has issued a flash flood warning through 2:00 PM. Avoid underpasses and low-lying roads. Elm Street near Route 9 is already flooding.',
    px: 30, py: 58,
  },
  {
    id: 3, category: 'traffic', title: 'Road closure: Main St at 4th Ave',
    location: 'Main St & 4th Ave', distance: '0.7 mi',
    time: '35 min ago', impact: 'medium', relevance: 76,
    why: 'This is on your saved route to Pine Street School',
    detail: 'Emergency water main repair closes Main St northbound between 3rd and 5th Ave. Expected to reopen by 4:00 PM. Use Oak Street as alternate route.',
    px: 70, py: 62,
  },
  {
    id: 4, category: 'safety', title: 'Active police incident near City Hall',
    location: 'Government District', distance: '1.2 mi',
    time: '14 min ago', impact: 'medium', relevance: 71,
    why: 'You have a lunch meeting at 55 Tremont St today',
    detail: 'Police responding to a disturbance near City Hall Plaza. Area cordoned off between Congress and School St. Avoid the area; situation ongoing.',
    px: 44, py: 25,
  },
  {
    id: 5, category: 'transit', title: 'Green Line: Extra service for game day',
    location: 'Kenmore → Park St', distance: '1.8 mi',
    time: '1 hr ago', impact: 'low', relevance: 58,
    why: 'Kenmore is on your saved route home',
    detail: "MBTA adding extra Green Line trains before and after tonight's game (7 PM start). Expect crowding near Kenmore from 5:30–7:30 PM.",
    px: 22, py: 44,
  },
  {
    id: 6, category: 'weather', title: 'Wind advisory: Gusts up to 45 mph',
    location: 'Metro area wide', distance: '—',
    time: '45 min ago', impact: 'low', relevance: 52,
    why: 'Affects your 5:30 PM cycling route home',
    detail: 'NWS wind advisory in effect until 8:00 PM. Northwest gusts to 45 mph possible. Cyclists should use caution on bridges and exposed roads.',
    px: 74, py: 32,
  },
];

const savedRoutes = [
  {
    id: 1, name: 'Morning Commute', from: 'Home', to: 'Office',
    time: '8:45 AM', duration: '32 min', status: 'delayed',
    delay: '+18 min', via: 'Blue Line + 10 min walk', alerts: 2,
  },
  {
    id: 2, name: 'School Pickup', from: 'Office', to: 'Pine St. School',
    time: '3:15 PM', duration: '24 min', status: 'disrupted',
    delay: 'Re-route needed', via: 'Main St → Oak St alt', alerts: 1,
  },
  {
    id: 3, name: 'Evening Commute', from: 'Office', to: 'Home',
    time: '5:30 PM', duration: '38 min', status: 'clear',
    delay: null, via: 'Green Line + 8 min walk', alerts: 0,
  },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('map');
  const [filters, setFilters] = useState({ transit: true, weather: true, traffic: true, safety: true, health: false, policy: false });
  const [time, setTime] = useState('8:42');
  const t = themes[theme];

  useEffect(() => {
    const now = new Date();
    setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
  }, []);

  const getCatStyle = (cat) => ({
    transit: { color: t.primary, dim: t.primaryDim, label: 'Transit' },
    weather: { color: t.warning, dim: t.warningDim, label: 'Weather' },
    traffic: { color: t.orange, dim: t.orangeDim, label: 'Traffic' },
    safety:  { color: t.danger,  dim: t.dangerDim,  label: 'Safety'  },
  }[cat] || { color: t.text, dim: t.surface2, label: cat });

  const visibleItems = newsItems.filter(i => filters[i.category]);
  const urgentCount = visibleItems.filter(i => i.impact === 'high').length;

  // ── MAP SCREEN ──────────────────────────────────────────────────────────────
  function MapScreen() {
    const [activePin, setActivePin] = useState(null);
    const activePinItem = visibleItems.find(i => i.id === activePin);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* SVG MAP */}
          <svg width="375" height="100%" viewBox="0 0 375 480" style={{ display: 'block', width: '100%', height: '100%' }}>
            <rect width="375" height="480" fill={t.mapBg} />
            {/* Water */}
            <path d="M0 380 Q80 355 160 378 Q240 398 320 368 Q350 358 375 370 L375 480 L0 480Z" fill={t.mapWater} />
            {/* Parks */}
            <rect x="18" y="185" width="72" height="52" rx="5" fill={t.mapPark} opacity="0.9" />
            <rect x="225" y="115" width="58" height="46" rx="5" fill={t.mapPark} opacity="0.9" />
            <rect x="285" y="258" width="62" height="54" rx="5" fill={t.mapPark} opacity="0.9" />
            {/* Block fills */}
            {[[50,65,42,38],[100,65,42,38],[155,65,28,38],[50,115,42,38],[100,115,42,38],
              [155,115,28,38],[50,168,42,30],[100,168,80,30],[50,246,35,26],[100,246,80,26],
              [200,168,22,30],[200,246,22,26],[248,168,30,38]].map(([x,y,w,h],i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={t.mapGrid} opacity="0.7" />
            ))}
            {/* Horizontal streets */}
            {[58,108,160,198,242,285,335].map(y => (
              <line key={`h${y}`} x1="0" y1={y} x2="375" y2={y} stroke={t.mapStreet} strokeWidth="3" />
            ))}
            {/* Vertical streets */}
            {[48,98,150,198,248,290,340].map(x => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="375" stroke={t.mapStreet} strokeWidth="3" />
            ))}
            {/* Major roads */}
            <line x1="0" y1="155" x2="375" y2="155" stroke={t.mapStreet} strokeWidth="6" opacity="0.6" />
            <line x1="188" y1="0" x2="188" y2="375" stroke={t.mapStreet} strokeWidth="6" opacity="0.6" />
            <line x1="0" y1="305" x2="210" y2="90" stroke={t.mapStreet} strokeWidth="4" opacity="0.4" />
            {/* You are here */}
            <circle cx="188" cy="215" r="22" fill={t.primary} opacity="0.1" />
            <circle cx="188" cy="215" r="14" fill={t.primary} opacity="0.2" />
            <circle cx="188" cy="215" r="8" fill={t.primary} />
            <circle cx="188" cy="215" r="3.5" fill="white" />
            {/* News pins */}
            {visibleItems.map(item => {
              const cx = item.px * 3.75;
              const cy = item.py * 4.4;
              const cs = getCatStyle(item.category);
              const isActive = activePin === item.id;
              return (
                <g key={item.id} onClick={() => setActivePin(isActive ? null : item.id)} style={{ cursor: 'pointer' }}>
                  <circle cx={cx} cy={cy} r={isActive ? 20 : 15} fill={cs.color} opacity="0.18" />
                  <circle cx={cx} cy={cy} r={isActive ? 12 : 9} fill={cs.color} />
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="800">
                    {item.relevance > 80 ? '!' : '·'}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Search bar overlay */}
          <div style={{ position: 'absolute', top: 10, left: 12, right: 12, display: 'flex', gap: 8 }}>
            <div style={{
              flex: 1, background: theme === 'dark' ? 'rgba(8,13,24,0.92)' : 'rgba(255,255,255,0.94)',
              borderRadius: 14, padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8,
              backdropFilter: 'blur(16px)', border: `1px solid ${t.border}`,
            }}>
              <window.lucide.MapPin size={13} color={t.primary} />
              <span style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>Downtown Boston</span>
              <span style={{ fontSize: 11, color: t.textMuted, marginLeft: 'auto' }}>{time} AM</span>
            </div>
            <div style={{
              width: 40, height: 40, background: t.primary, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 18px ${t.primaryDim}`,
            }}>
              <window.lucide.Layers size={17} color="#000" />
            </div>
          </div>

          {/* Urgent badge */}
          {urgentCount > 0 && (
            <div style={{
              position: 'absolute', top: 62, left: 12,
              background: t.danger, borderRadius: 20, padding: '5px 12px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <window.lucide.AlertTriangle size={11} color="white" />
              <span style={{ fontSize: 11, color: 'white', fontWeight: 600 }}>{urgentCount} High Impact Near You</span>
            </div>
          )}

          {/* My location button */}
          <div style={{
            position: 'absolute', bottom: 8, right: 12, width: 38, height: 38,
            background: theme === 'dark' ? 'rgba(8,13,24,0.9)' : 'rgba(255,255,255,0.9)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${t.border}`, backdropFilter: 'blur(12px)',
          }}>
            <window.lucide.Crosshair size={16} color={t.primary} />
          </div>

          {/* Active pin popup */}
          {activePinItem && (
            <div style={{
              position: 'absolute', bottom: 10, left: 12, right: 12,
              background: theme === 'dark' ? 'rgba(8,13,24,0.96)' : 'rgba(255,255,255,0.96)',
              borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`,
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                  background: getCatStyle(activePinItem.category).color,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.4, marginBottom: 4 }}>{activePinItem.title}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{activePinItem.location} · {activePinItem.distance}</div>
                  <div style={{
                    marginTop: 8, background: t.surface2, borderRadius: 8, padding: '6px 10px',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <window.lucide.Zap size={10} color={t.primary} />
                    <span style={{ fontSize: 10, color: t.textSub }}>{activePinItem.why}</span>
                  </div>
                </div>
                <div onClick={() => setActivePin(null)} style={{ cursor: 'pointer', padding: 2 }}>
                  <window.lucide.X size={14} color={t.textMuted} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom cards strip */}
        <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, paddingTop: 10, paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 8px' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Nearby Now</span>
            <span style={{ fontSize: 11, color: t.primary, fontWeight: 500 }}>{visibleItems.length} events</span>
          </div>
          <div style={{ display: 'flex', gap: 10, padding: '0 16px 10px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {visibleItems.slice(0, 5).map(item => {
              const cs = getCatStyle(item.category);
              return (
                <div key={item.id} onClick={() => setActivePin(item.id)} style={{
                  minWidth: 175, background: t.surface2, borderRadius: 12, padding: '10px 12px',
                  border: `1px solid ${t.border}`, flexShrink: 0, cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: cs.color }} />
                    <span style={{ fontSize: 9, color: cs.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cs.label}</span>
                    <span style={{ fontSize: 9, color: t.textMuted, marginLeft: 'auto' }}>{item.distance}</span>
                  </div>
                  <div style={{ fontSize: 11, color: t.text, fontWeight: 500, lineHeight: 1.4, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 10, color: t.textMuted }}>{item.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── FEED SCREEN ─────────────────────────────────────────────────────────────
  function FeedScreen() {
    const [expanded, setExpanded] = useState(null);
    const [window_, setWindow_] = useState(0);
    const windowLabels = ['Next Hour', 'Today', 'This Week'];
    const items = visibleItems.filter((_, i) => window_ === 2 ? true : window_ === 1 ? i < 5 : i < 3);

    return (
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ padding: '12px 16px 0' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>Your News Pulse</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, marginBottom: 14 }}>Ranked by personal impact · {time} AM</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {windowLabels.map((label, i) => (
              <div key={label} onClick={() => setWindow_(i)} style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                background: window_ === i ? t.primary : t.surface2,
                color: window_ === i ? '#000' : t.textMuted,
                border: `1px solid ${window_ === i ? t.primary : t.border}`,
              }}>{label}</div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 16px 12px' }}>
          {items.map(item => {
            const cs = getCatStyle(item.category);
            const isOpen = expanded === item.id;
            return (
              <div key={item.id} style={{
                background: t.surface, borderRadius: 16, padding: '14px 16px',
                marginBottom: 10, border: `1px solid ${t.border}`,
                borderLeft: `3px solid ${cs.color}`,
              }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  {/* Relevance badge */}
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, background: cs.dim,
                    border: `1px solid ${cs.color}33`, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: cs.color, lineHeight: 1 }}>{item.relevance}</span>
                    <span style={{ fontSize: 7, color: cs.color, opacity: 0.7, letterSpacing: 0.5 }}>SCORE</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3px 6px', marginBottom: 5 }}>
                      <span style={{ fontSize: 10, color: cs.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cs.label}</span>
                      <span style={{ fontSize: 10, color: t.textMuted }}>·</span>
                      <span style={{ fontSize: 10, color: t.textMuted }}>{item.distance !== '—' ? `${item.distance} away` : 'Area-wide'}</span>
                      <span style={{ fontSize: 10, color: t.textMuted }}>·</span>
                      <span style={{ fontSize: 10, color: t.textMuted }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.4 }}>{item.title}</div>
                  </div>
                </div>
                {/* Why this matters */}
                <div style={{
                  background: t.surface2, borderRadius: 10, padding: '8px 12px', marginBottom: 10,
                  display: 'flex', alignItems: 'center', gap: 7, border: `1px solid ${t.border}`,
                }}>
                  <window.lucide.Zap size={11} color={t.primary} />
                  <span style={{ fontSize: 11, color: t.textSub, lineHeight: 1.4 }}>{item.why}</span>
                </div>
                <div onClick={() => setExpanded(isOpen ? null : item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                }}>
                  <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>{isOpen ? 'Show less' : 'Full details'}</span>
                  {isOpen
                    ? <window.lucide.ChevronUp size={12} color={t.primary} />
                    : <window.lucide.ChevronDown size={12} color={t.primary} />}
                </div>
                {isOpen && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}` }}>
                    <p style={{ fontSize: 12, color: t.textSub, lineHeight: 1.7, margin: '0 0 12px' }}>{item.detail}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{
                        flex: 1, background: t.surface2, borderRadius: 8, padding: '7px 10px',
                        display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                        border: `1px solid ${t.border}`,
                      }}>
                        <window.lucide.MapPin size={12} color={t.primary} />
                        <span style={{ fontSize: 11, color: t.text, fontWeight: 500 }}>View on Map</span>
                      </div>
                      <div style={{
                        flex: 1, background: t.surface2, borderRadius: 8, padding: '7px 10px',
                        display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                        border: `1px solid ${t.border}`,
                      }}>
                        <window.lucide.Navigation size={12} color={t.primary} />
                        <span style={{ fontSize: 11, color: t.text, fontWeight: 500 }}>Avoid Route</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── ALERTS SCREEN ────────────────────────────────────────────────────────────
  function AlertsScreen() {
    const high = visibleItems.filter(i => i.impact === 'high');
    const medium = visibleItems.filter(i => i.impact === 'medium');
    const low = visibleItems.filter(i => i.impact === 'low');

    const catIcon = (cat) => ({
      transit: window.lucide.Train,
      weather: window.lucide.CloudRain,
      traffic: window.lucide.AlertOctagon,
      safety: window.lucide.Shield,
    }[cat] || window.lucide.Bell);

    function AlertCard({ item, accentColor, dimColor }) {
      const Icon = catIcon(item.category);
      return (
        <div style={{
          background: t.surface, borderRadius: 14, padding: '13px 14px',
          marginBottom: 9, border: `1px solid ${t.border}`,
        }}>
          <div style={{ display: 'flex', gap: 11 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 11, background: dimColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              border: `1px solid ${accentColor}30`,
            }}>
              <Icon size={16} color={accentColor} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.35, marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 7 }}>{item.location} · {item.time}</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: dimColor, borderRadius: 6, padding: '3px 9px',
                border: `1px solid ${accentColor}25`,
              }}>
                <window.lucide.Zap size={9} color={accentColor} />
                <span style={{ fontSize: 10, color: accentColor, fontWeight: 500 }}>{item.why}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const Section = ({ label, color, items: sItems }) => sItems.length === 0 ? null : (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
          <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</span>
          <div style={{
            marginLeft: 4, background: color + '20', borderRadius: 10, padding: '1px 7px',
          }}>
            <span style={{ fontSize: 10, color, fontWeight: 600 }}>{sItems.length}</span>
          </div>
        </div>
        {sItems.map(i => (
          <AlertCard key={i.id} item={i}
            accentColor={label === 'High Impact' ? t.danger : label === 'Medium Impact' ? t.warning : t.success}
            dimColor={label === 'High Impact' ? t.dangerDim : label === 'Medium Impact' ? t.warningDim : t.successDim}
          />
        ))}
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', scrollbarWidth: 'none' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>Active Alerts</div>
        <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, marginBottom: 16 }}>Personalized to your locations & schedule</div>

        {urgentCount > 0 && (
          <div style={{
            background: t.dangerDim, border: `1px solid ${t.danger}35`,
            borderRadius: 14, padding: '12px 14px', marginBottom: 16,
            display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <window.lucide.AlertTriangle size={18} color={t.danger} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.danger }}>{urgentCount} urgent alerts need attention</div>
              <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>May affect plans in the next 2 hours</div>
            </div>
          </div>
        )}

        <Section label="High Impact" color={t.danger} items={high} />
        <Section label="Medium Impact" color={t.warning} items={medium} />
        <Section label="Low Impact" color={t.success} items={low} />

        {visibleItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <window.lucide.CheckCircle size={48} color={t.success} />
            <div style={{ fontSize: 16, fontWeight: 600, color: t.text, marginTop: 16 }}>All Clear</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginTop: 6 }}>No active alerts for your area</div>
          </div>
        )}
      </div>
    );
  }

  // ── ROUTES SCREEN ────────────────────────────────────────────────────────────
  function RoutesScreen() {
    const affectedCount = savedRoutes.filter(r => r.status !== 'clear').length;
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', scrollbarWidth: 'none' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>My Routes</div>
        <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, marginBottom: 14 }}>Synced with calendar & commute patterns</div>

        {affectedCount > 0 && (
          <div style={{
            background: t.dangerDim, border: `1px solid ${t.danger}35`,
            borderRadius: 14, padding: '12px 14px', marginBottom: 16,
            display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <window.lucide.AlertTriangle size={20} color={t.danger} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.danger }}>{affectedCount} routes affected today</div>
              <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>Transit delay + road closure on saved routes</div>
            </div>
          </div>
        )}

        {savedRoutes.map(route => {
          const sc = { clear: t.success, delayed: t.warning, disrupted: t.danger }[route.status];
          const sl = { clear: 'On Time', delayed: 'Delayed', disrupted: 'Re-route' }[route.status];
          return (
            <div key={route.id} style={{
              background: t.surface, borderRadius: 16, padding: '15px 16px',
              marginBottom: 12, border: `1px solid ${t.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{route.name}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{route.time} · {route.duration}</div>
                </div>
                <div style={{
                  background: sc + '20', border: `1px solid ${sc}40`,
                  borderRadius: 20, padding: '4px 12px',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: sc }}>{sl}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: t.textSub }}>{route.from}</span>
                <div style={{ flex: 1, height: 1, background: t.border }} />
                <span style={{ fontSize: 12, color: t.textSub }}>{route.to}</span>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: sc, flexShrink: 0 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <window.lucide.Navigation size={12} color={t.textMuted} />
                <span style={{ fontSize: 11, color: t.textMuted }}>{route.via}</span>
                {route.delay && (
                  <>
                    <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: sc }}>{route.delay}</span>
                  </>
                )}
              </div>
              {route.alerts > 0 && (
                <div style={{
                  marginTop: 10, background: t.surface2, borderRadius: 8, padding: '7px 12px',
                  display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${t.border}`,
                }}>
                  <window.lucide.Bell size={11} color={t.warning} />
                  <span style={{ fontSize: 11, color: t.textSub }}>
                    {route.alerts} active alert{route.alerts > 1 ? 's' : ''} on this route
                  </span>
                </div>
              )}
            </div>
          );
        })}

        <div style={{
          border: `1.5px dashed ${t.border}`, borderRadius: 14, padding: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
        }}>
          <window.lucide.Plus size={15} color={t.primary} />
          <span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>Add Saved Route</span>
        </div>
        <div style={{ height: 12 }} />
      </div>
    );
  }

  // ── SETTINGS SCREEN ──────────────────────────────────────────────────────────
  function SettingsScreen() {
    const filterConf = [
      { id: 'transit', label: 'Public Transit', Icon: window.lucide.Train, desc: 'Delays, cancellations, route changes' },
      { id: 'weather', label: 'Weather', Icon: window.lucide.CloudRain, desc: 'Alerts, warnings, forecasts' },
      { id: 'traffic', label: 'Traffic & Roads', Icon: window.lucide.Car, desc: 'Closures, accidents, construction' },
      { id: 'safety',  label: 'Safety & Incidents', Icon: window.lucide.Shield, desc: 'Police activity, emergencies' },
      { id: 'health',  label: 'Public Health', Icon: window.lucide.Heart, desc: 'Outbreaks, health advisories' },
      { id: 'policy',  label: 'Local Policy', Icon: window.lucide.Landmark, desc: 'Ordinances, zoning, elections' },
    ];

    function Toggle({ on, onToggle }) {
      return (
        <div onClick={onToggle} style={{
          width: 44, height: 24, borderRadius: 12, cursor: 'pointer', position: 'relative',
          background: on ? t.primary : t.surface2,
          border: `1.5px solid ${on ? t.primary : t.border}`,
          transition: 'background 0.2s', flexShrink: 0,
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%', background: 'white',
            position: 'absolute', top: 1, left: on ? 21 : 1,
            transition: 'left 0.2s', boxShadow: '0 1px 5px rgba(0,0,0,0.3)',
          }} />
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', scrollbarWidth: 'none' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>Settings</div>
        <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, marginBottom: 18 }}>Personalize your Pulse Map</div>

        {/* Profile */}
        <div style={{
          background: t.surface, borderRadius: 16, padding: '14px 16px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${t.border}`,
          cursor: 'pointer',
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: 15, background: t.primaryDim,
            border: `2px solid ${t.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Alex Chen</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>Downtown Boston · Premium</div>
          </div>
          <window.lucide.ChevronRight size={15} color={t.textMuted} />
        </div>

        {/* Theme */}
        <div style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.text, letterSpacing: 0.3, marginBottom: 12 }}>APPEARANCE</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['dark', 'Dark Mode', window.lucide.Moon], ['light', 'Light Mode', window.lucide.Sun]].map(([id, label, Icon]) => (
              <div key={id} onClick={() => setTheme(id)} style={{
                flex: 1, borderRadius: 12, padding: '12px 8px',
                background: theme === id ? t.primaryDim : t.surface2,
                border: `1.5px solid ${theme === id ? t.primary : t.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer',
              }}>
                <Icon size={20} color={theme === id ? t.primary : t.textMuted} />
                <span style={{ fontSize: 11, fontWeight: 600, color: theme === id ? t.primary : t.textMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.text, letterSpacing: 0.3, marginBottom: 4 }}>TOPIC SENSITIVITY</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>Show alerts for these categories</div>
          {filterConf.map((fc, i) => (
            <div key={fc.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < filterConf.length - 1 ? `1px solid ${t.border}` : 'none',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: filters[fc.id] ? t.primaryDim : t.surface2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${filters[fc.id] ? t.primaryBorder : t.border}`,
              }}>
                <fc.Icon size={15} color={filters[fc.id] ? t.primary : t.textMuted} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{fc.label}</div>
                <div style={{ fontSize: 10, color: t.textMuted }}>{fc.desc}</div>
              </div>
              <Toggle on={filters[fc.id]} onToggle={() => setFilters(p => ({ ...p, [fc.id]: !p[fc.id] }))} />
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.text, letterSpacing: 0.3, marginBottom: 12 }}>NOTIFICATIONS</div>
          {[
            ['Commute alerts (30 min before)', true],
            ['High impact events', true],
            ['Calendar-linked warnings', true],
            ['Low impact updates', false],
          ].map(([label, on], i, arr) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
            }}>
              <span style={{ fontSize: 13, color: t.text }}>{label}</span>
              <Toggle on={on} onToggle={() => {}} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── TABS + ROOT ──────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'map',      label: 'Map',     icon: window.lucide.Map },
    { id: 'feed',     label: 'Feed',    icon: window.lucide.Newspaper },
    { id: 'alerts',   label: 'Alerts',  icon: window.lucide.Bell },
    { id: 'routes',   label: 'Routes',  icon: window.lucide.Navigation },
    { id: 'settings', label: 'Profile', icon: window.lucide.Settings },
  ];

  const screens = { map: MapScreen, feed: FeedScreen, alerts: AlertsScreen, routes: RoutesScreen, settings: SettingsScreen };

  return (
    <div style={{
      background: '#1A1F2E', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone */}
      <div style={{
        width: 375, height: 812, background: t.bg, borderRadius: 52, overflow: 'hidden',
        boxShadow: '0 0 0 9px #1a1a1a, 0 0 0 11px #2a2a2a, 0 50px 120px rgba(0,0,0,0.7)',
        position: 'relative', display: 'flex', flexDirection: 'column',
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 26px 0', height: 44, flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{time}</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <window.lucide.Signal size={13} color={t.text} />
            <window.lucide.Wifi size={13} color={t.text} />
            <window.lucide.Battery size={13} color={t.text} />
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{
          width: 126, height: 32, background: '#000', borderRadius: 22,
          margin: '4px auto 6px', flexShrink: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#1a1a1a', border: '1.5px solid #2a2a2a' }} />
          <div style={{ width: 32, height: 7, borderRadius: 4, background: '#1a1a1a' }} />
        </div>

        {/* App header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '2px 20px 10px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 33, height: 33, borderRadius: 10, background: t.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 14px ${t.primaryDim}`,
            }}>
              <window.lucide.Activity size={18} color="#000" strokeWidth={2.5} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <span style={{ fontSize: 19, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>Pulse</span>
              <span style={{ fontSize: 19, fontWeight: 700, color: t.primary, letterSpacing: -0.5 }}>Map</span>
            </div>
          </div>
          {urgentCount > 0 && (
            <div style={{
              background: t.danger, borderRadius: 20, padding: '3px 10px',
              display: 'flex', alignItems: 'center', gap: 4,
              boxShadow: `0 3px 12px ${t.dangerDim}`,
            }}>
              <window.lucide.AlertCircle size={11} color="white" />
              <span style={{ fontSize: 10, color: 'white', fontWeight: 700 }}>{urgentCount} urgent</span>
            </div>
          )}
        </div>

        {/* Screen */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {React.createElement(screens[activeTab])}
        </div>

        {/* Bottom nav */}
        <div style={{
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          padding: '8px 4px 22px', display: 'flex', flexShrink: 0,
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const hasAlert = tab.id === 'alerts' && urgentCount > 0;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 3, cursor: 'pointer', padding: '5px 2px', borderRadius: 12,
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <tab.icon
                    size={22}
                    color={isActive ? t.primary : t.textMuted}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  {hasAlert && (
                    <div style={{
                      position: 'absolute', top: -3, right: -4,
                      width: 8, height: 8, borderRadius: '50%',
                      background: t.danger, border: `1.5px solid ${t.navBg}`,
                    }} />
                  )}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 700 : 400,
                  color: isActive ? t.primary : t.textMuted,
                }}>{tab.label}</span>
                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: 0, width: 18, height: 3,
                    background: t.primary, borderRadius: 2,
                    boxShadow: `0 0 8px ${t.primary}`,
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
