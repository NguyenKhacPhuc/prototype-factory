// Layover Loop - Turn dead time into local mini-adventures
// Google Fonts injected via style tag in App component

const { useState, useEffect, useRef } = React;

const COLORS = {
  navy: '#1a1f3a',
  navyLight: '#252b50',
  navyDark: '#0f1224',
  amber: '#f59e0b',
  amberLight: '#fbbf24',
  amberDark: '#d97706',
  teal: '#14b8a6',
  tealLight: '#2dd4bf',
  tealDark: '#0f9489',
  white: '#ffffff',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray400: '#94a3b8',
  gray500: '#64748b',
  gray600: '#475569',
  gray800: '#1e293b',
  red: '#ef4444',
  green: '#22c55e',
  purple: '#8b5cf6',
  bg: '#0a0a0f',
};

function useInterval(callback, delay) {
  const savedCallback = useRef(null);
  useEffect(() => { savedCallback.current = callback; }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function StatusBar() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', color: COLORS.white, fontSize: 13, fontWeight: 600, zIndex: 10 }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4"/>
          <rect x="4" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
          <rect x="8" y="1" width="3" height="11" rx="1" opacity="0.8"/>
          <rect x="12" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 3C10.5 3 12.7 4.1 14.2 5.9L15.5 4.4C13.6 2.3 11 1 8 1C5 1 2.4 2.3 0.5 4.4L1.8 5.9C3.3 4.1 5.5 3 8 3Z" fill="white"/>
          <path d="M8 6C9.7 6 11.2 6.8 12.2 8L13.5 6.5C12.1 5 10.2 4 8 4C5.8 4 3.9 5 2.5 6.5L3.8 8C4.8 6.8 6.3 6 8 6Z" fill="white"/>
          <circle cx="8" cy="10.5" r="1.5" fill="white"/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 22, height: 11, border: '1.5px solid white', borderRadius: 3, padding: '1.5px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '75%', height: '100%', background: COLORS.green, borderRadius: 1.5 }}/>
          </div>
          <div style={{ width: 2, height: 5, background: 'white', borderRadius: 1, opacity: 0.6, marginLeft: 1 }}/>
        </div>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4, paddingBottom: 8 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #222' }}/>
      </div>
    </div>
  );
}

function CountdownTimer({ totalSeconds }) {
  const [seconds, setSeconds] = useState(totalSeconds);
  useInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
      {[{ v: h, l: 'h' }, { v: m, l: 'm' }, { v: s, l: 's' }].map(({ v, l }) => (
        <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '6px 10px', minWidth: 44, textAlign: 'center' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.amber, fontFamily: 'monospace', letterSpacing: -1 }}>
              {String(v).padStart(2, '0')}
            </span>
          </div>
          <span style={{ fontSize: 10, color: COLORS.gray400, marginTop: 2, fontWeight: 600 }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

function Card({ children, style = {}, onPress }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => { setPressed(false); onPress && onPress(); }}
      onClick={onPress}
      style={{
        background: COLORS.navyLight,
        borderRadius: 16,
        padding: 16,
        border: '1px solid rgba(255,255,255,0.07)',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        boxShadow: pressed ? '0 2px 8px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ color, children, style = {} }) {
  return (
    <span style={{
      background: `${color}22`,
      color,
      border: `1px solid ${color}44`,
      borderRadius: 20,
      padding: '2px 10px',
      fontSize: 11,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      ...style,
    }}>
      {children}
    </span>
  );
}

function HomeScreen() {
  const [safeWindow] = useState(4 * 3600 + 12 * 60);
  const [activeCard, setActiveCard] = useState(null);

  const quickActions = [
    { icon: '🗺️', label: 'Explore Now', color: COLORS.teal },
    { icon: '🧳', label: 'Store Bags', color: COLORS.purple },
    { icon: '🚖', label: 'Grab Taxi', color: COLORS.amber },
    { icon: '🔔', label: 'Set Alert', color: COLORS.red },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      {/* Flight Header */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight}, ${COLORS.navy})`, borderRadius: 20, padding: 18, marginBottom: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: COLORS.gray400, fontWeight: 600, marginBottom: 2 }}>CURRENT LAYOVER</div>
            <Badge color={COLORS.green}>ON TIME</Badge>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: COLORS.gray400, fontWeight: 600 }}>SQ 317</div>
            <div style={{ fontSize: 11, color: COLORS.amber }}>Changi T3</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.white, letterSpacing: -1 }}>SIN</div>
            <div style={{ fontSize: 11, color: COLORS.gray400 }}>Singapore</div>
            <div style={{ fontSize: 13, color: COLORS.white, fontWeight: 600, marginTop: 2 }}>10:00 AM</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 12px' }}>
            <div style={{ fontSize: 11, color: COLORS.amber, fontWeight: 700, marginBottom: 4 }}>6h 30min layover</div>
            <div style={{ position: 'relative', width: '100%', height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: '35%', height: '100%', background: COLORS.amber, borderRadius: 1 }}/>
              <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 16 }}>✈️</div>
            </div>
            <div style={{ fontSize: 10, color: COLORS.gray500, marginTop: 4 }}>Connecting</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.white, letterSpacing: -1 }}>LHR</div>
            <div style={{ fontSize: 11, color: COLORS.gray400 }}>London</div>
            <div style={{ fontSize: 13, color: COLORS.white, fontWeight: 600, marginTop: 2 }}>04:30 PM</div>
          </div>
        </div>
      </div>

      {/* Safe Window */}
      <div style={{ background: `linear-gradient(135deg, rgba(20,184,166,0.15), rgba(245,158,11,0.1))`, borderRadius: 20, padding: 18, marginBottom: 14, border: '1px solid rgba(20,184,166,0.25)', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: COLORS.teal, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>YOU HAVE TIME TO EXPLORE SAFELY</div>
        <CountdownTimer totalSeconds={safeWindow} />
        <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 8 }}>Return to gate by <span style={{ color: COLORS.amber, fontWeight: 700 }}>1:45 PM</span> · Gate B12 · Boarding in 2h 45m</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'center' }}>
          <Badge color={COLORS.teal}>🛡️ Passport: US</Badge>
          <Badge color={COLORS.amber}>⚡ Visa-Free</Badge>
        </div>
      </div>

      {/* Weather & City */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 10, color: COLORS.gray400, fontWeight: 700, marginBottom: 6 }}>SINGAPORE NOW</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 28 }}>⛅</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.white }}>31°C</div>
              <div style={{ fontSize: 10, color: COLORS.gray400 }}>Partly Cloudy</div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: COLORS.gray500, marginTop: 6 }}>Humidity 78% · UV High</div>
        </Card>
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 10, color: COLORS.gray400, fontWeight: 700, marginBottom: 6 }}>TRAFFIC TO CBD</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.green, marginBottom: 2 }}>18 min</div>
          <div style={{ fontSize: 10, color: COLORS.gray400, marginBottom: 6 }}>via ECP · Light traffic</div>
          <Badge color={COLORS.green} style={{ fontSize: 10 }}>✓ Clear Route</Badge>
        </Card>
      </div>

      {/* Security Wait */}
      <Card style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: COLORS.white, fontWeight: 700 }}>Airport Re-entry Estimate</div>
          <Badge color={COLORS.amber}>Live</Badge>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ label: 'Immigration', time: '12 min', status: 'low' }, { label: 'Security', time: '8 min', status: 'low' }, { label: 'Walk to B12', time: '9 min', status: 'ok' }].map(item => (
            <div key={item.label} style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px 4px' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.status === 'low' ? COLORS.green : COLORS.amber }}>{item.time}</div>
              <div style={{ fontSize: 9, color: COLORS.gray400, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: COLORS.gray500, textAlign: 'center' }}>Total buffer needed: <span style={{ color: COLORS.white, fontWeight: 700 }}>~29 min</span></div>
      </Card>

      {/* Quick Actions */}
      <div style={{ fontSize: 13, color: COLORS.white, fontWeight: 700, marginBottom: 10 }}>Quick Actions</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {quickActions.map((a, i) => (
          <div key={i}
            onMouseDown={() => setActiveCard(i)}
            onMouseUp={() => setActiveCard(null)}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              background: COLORS.navyLight,
              borderRadius: 14,
              padding: '12px 6px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.07)',
              transform: activeCard === i ? 'scale(0.93)' : 'scale(1)',
              transition: 'transform 0.12s ease',
              cursor: 'pointer',
            }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
            <div style={{ fontSize: 10, color: COLORS.gray400, fontWeight: 600 }}>{a.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreScreen() {
  const adventures = [
    { title: 'Marina Bay Waterfront Walk', time: '90 min', dist: '4.2 km', rating: 4.8, cat: 'Nature', emoji: '🌊', color: COLORS.teal, desc: 'Iconic skyline promenade via Helix Bridge' },
    { title: 'Lau Pa Sat Hawker Centre', time: '45 min', dist: '3.8 km', rating: 4.9, cat: 'Food', emoji: '🍜', color: COLORS.amber, desc: 'Best laksa & char kway teow in the city' },
    { title: 'ArtScience Museum Café', time: '2 hr', dist: '5.1 km', rating: 4.6, cat: 'Culture', emoji: '🎨', color: COLORS.purple, desc: 'Lotus-shaped museum with rooftop café views' },
    { title: 'Chinatown Heritage Trail', time: '3 hr', dist: '6.0 km', rating: 4.7, cat: 'History', emoji: '🏮', color: '#e11d48', desc: 'Temples, street art, and pineapple tarts' },
    { title: 'Gardens by the Bay Express', time: '75 min', dist: '5.5 km', rating: 4.9, cat: 'Nature', emoji: '🌿', color: COLORS.green, desc: 'Supertree Grove outdoor garden walk' },
    { title: 'Maxwell Food Centre', time: '30 min', dist: '3.2 km', rating: 4.8, cat: 'Food', emoji: '🍱', color: '#f97316', desc: 'Tian Tian chicken rice - Obama approved' },
  ];

  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Food', 'Culture', 'Nature', 'History'];
  const filtered = filter === 'All' ? adventures : adventures.filter(a => a.cat === filter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white, marginBottom: 2 }}>Explore Singapore</div>
        <div style={{ fontSize: 12, color: COLORS.gray400 }}>Safe for your 4h 12min window · Visa-free ✓</div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? COLORS.amber : COLORS.navyLight,
            color: filter === f ? COLORS.navyDark : COLORS.gray400,
            border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Adventure Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((a, i) => (
          <Card key={i} style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: `linear-gradient(135deg, ${a.color}22, ${a.color}08)`, padding: 14, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{a.emoji}</span>
                    <Badge color={a.color}>{a.cat}</Badge>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 3 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray400 }}>{a.desc}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 12 }}>⏱</span>
                  <span style={{ fontSize: 12, color: COLORS.white, fontWeight: 700 }}>{a.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 12 }}>📍</span>
                  <span style={{ fontSize: 12, color: COLORS.gray400 }}>{a.dist}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontSize: 11, color: COLORS.amber }}>★</span>
                  <span style={{ fontSize: 12, color: COLORS.white, fontWeight: 700 }}>{a.rating}</span>
                </div>
              </div>
              <button style={{
                background: a.color,
                color: COLORS.navyDark,
                border: 'none',
                borderRadius: 20,
                padding: '5px 14px',
                fontSize: 11,
                fontWeight: 800,
                cursor: 'pointer',
              }}>Add to Plan</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PlanScreen() {
  const steps = [
    { time: '10:15 AM', icon: '✈️', title: 'Leave Airport', sub: 'Terminal 3 Exit Hall B', status: 'done', duration: null },
    { time: '10:18 AM', icon: '🚖', title: 'Grab Taxi (booked)', sub: 'GrabCar · SG$14 est · 18 min', status: 'done', duration: '18 min' },
    { time: '10:36 AM', icon: '🍜', title: 'Lau Pa Sat Hawker Centre', sub: '18 Raffles Quay · Get laksa & satay', status: 'active', duration: '45 min' },
    { time: '11:21 AM', icon: '🌊', title: 'Marina Bay Waterfront Walk', sub: 'Merlion → Helix Bridge loop', status: 'upcoming', duration: '30 min' },
    { time: '11:51 AM', icon: '☕', title: 'Kith Café (optional)', sub: 'One Fullerton · Flat white + cake', status: 'upcoming', duration: '20 min' },
    { time: '12:15 PM', icon: '🚖', title: 'Grab Taxi Back', sub: 'Return to Changi T3 · 22 min est', status: 'upcoming', duration: '22 min' },
    { time: '12:37 PM', icon: '🛃', title: 'Immigration & Security', sub: 'Allow 29 min buffer', status: 'upcoming', duration: '29 min' },
    { time: '1:06 PM', icon: '🚶', title: 'Walk to Gate B12', sub: '9 min walk from security', status: 'upcoming', duration: '9 min' },
    { time: '1:45 PM', icon: '🛫', title: 'Boarding Opens', sub: 'Gate B12 · SQ317 to LHR', status: 'gate', duration: null },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white, marginBottom: 2 }}>Today's Adventure Plan</div>
        <div style={{ fontSize: 12, color: COLORS.gray400 }}>Optimized for your 4h 12min safe window</div>
      </div>

      {/* Return Alert */}
      <div style={{ background: `linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))`, borderRadius: 14, padding: 12, marginBottom: 16, border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>⏰</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.amber }}>Return Reminder Set</div>
          <div style={{ fontSize: 11, color: COLORS.gray400 }}>Alert at 12:00 PM · Must leave by 12:15 PM</div>
        </div>
        <button style={{ marginLeft: 'auto', background: COLORS.amber, color: COLORS.navyDark, border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Edit</button>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: 40 }}>
        <div style={{ position: 'absolute', left: 18, top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }}/>
        {steps.map((step, i) => {
          const isActive = step.status === 'active';
          const isDone = step.status === 'done';
          const isGate = step.status === 'gate';
          const dotColor = isDone ? COLORS.green : isActive ? COLORS.amber : isGate ? COLORS.teal : COLORS.gray600;
          return (
            <div key={i} style={{ position: 'relative', marginBottom: 14 }}>
              <div style={{
                position: 'absolute',
                left: -30,
                top: 10,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: dotColor,
                border: `2px solid ${isActive ? COLORS.amber : 'transparent'}`,
                boxShadow: isActive ? `0 0 0 4px ${COLORS.amber}33` : 'none',
                zIndex: 1,
                transition: 'all 0.3s ease',
              }}/>
              <div style={{
                background: isActive
                  ? `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))`
                  : isGate
                  ? `linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))`
                  : isDone
                  ? 'rgba(255,255,255,0.03)'
                  : COLORS.navyLight,
                borderRadius: 12,
                padding: '10px 12px',
                border: isActive ? '1px solid rgba(245,158,11,0.3)' : isGate ? '1px solid rgba(20,184,166,0.3)' : '1px solid rgba(255,255,255,0.05)',
                opacity: isDone ? 0.6 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{step.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{step.title}</div>
                      <div style={{ fontSize: 11, color: COLORS.gray400 }}>{step.sub}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? COLORS.amber : isGate ? COLORS.teal : COLORS.gray400 }}>{step.time}</div>
                    {step.duration && <div style={{ fontSize: 10, color: COLORS.gray500 }}>{step.duration}</div>}
                  </div>
                </div>
                {isActive && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                    <button style={{ flex: 1, background: COLORS.amber, color: COLORS.navyDark, border: 'none', borderRadius: 8, padding: '6px', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>Navigate</button>
                    <button style={{ flex: 1, background: 'rgba(255,255,255,0.08)', color: COLORS.white, border: 'none', borderRadius: 8, padding: '6px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Skip</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AlertsScreen() {
  const alerts = [
    {
      id: 1, type: 'good', emoji: '🕐', title: 'Flight Delayed +45 min',
      desc: 'SQ317 departure pushed to 5:15 PM. You now have 5h 17min to explore!',
      time: '2 min ago', action: 'Update Plan', color: COLORS.green,
    },
    {
      id: 2, type: 'warn', emoji: '🚪', title: 'Gate Change: B12 → C08',
      desc: 'Your gate has moved. Re-entry route updated. Add 6 min walk time.',
      time: '12 min ago', action: 'Got It', color: COLORS.amber,
    },
    {
      id: 3, type: 'info', emoji: '🚦', title: 'Traffic Update: ECP Rerouted',
      desc: 'Minor congestion on ECP. Taxi route via Marina Coastal Expressway — same ETA.',
      time: '18 min ago', action: 'View Route', color: COLORS.teal,
    },
    {
      id: 4, type: 'good', emoji: '🧳', title: 'Baggage Storage Confirmed',
      desc: 'Bag Drop at Terminal 3 Arrivals Hall confirmed. Ref: BD-4421. SGD 8/bag.',
      time: '45 min ago', action: 'View Receipt', color: COLORS.purple,
    },
    {
      id: 5, type: 'info', emoji: '⛅', title: 'Weather Alert: Brief Shower',
      desc: 'Light rain expected 11:30–12:00 PM in CBD area. Carry umbrella or stay covered.',
      time: '1 hr ago', action: 'Adjust Plan', color: COLORS.gray400,
    },
  ];

  const [dismissed, setDismissed] = useState([]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white }}>Live Alerts</div>
          <div style={{ fontSize: 12, color: COLORS.gray400 }}>Real-time updates for your adventure</div>
        </div>
        <Badge color={COLORS.amber}>{alerts.length - dismissed.length} active</Badge>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {alerts.map(alert => {
          if (dismissed.includes(alert.id)) return null;
          return (
            <div key={alert.id} style={{
              background: `linear-gradient(135deg, ${alert.color}15, ${alert.color}05)`,
              borderRadius: 16,
              padding: 14,
              border: `1px solid ${alert.color}30`,
              transition: 'all 0.3s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{alert.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{alert.title}</div>
                    <div style={{ fontSize: 10, color: COLORS.gray500 }}>{alert.time}</div>
                  </div>
                </div>
                <button onClick={() => setDismissed(d => [...d, alert.id])} style={{ background: 'transparent', border: 'none', color: COLORS.gray500, fontSize: 16, cursor: 'pointer', padding: 0 }}>×</button>
              </div>
              <div style={{ fontSize: 12, color: COLORS.gray400, lineHeight: 1.5, marginBottom: 10 }}>{alert.desc}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, background: alert.color, color: alert.color === COLORS.amber || alert.color === COLORS.green ? COLORS.navyDark : COLORS.white, border: 'none', borderRadius: 8, padding: '7px', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>{alert.action}</button>
                <button onClick={() => setDismissed(d => [...d, alert.id])} style={{ background: 'rgba(255,255,255,0.07)', color: COLORS.gray400, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '7px 12px', fontSize: 11, cursor: 'pointer' }}>Dismiss</button>
              </div>
            </div>
          );
        })}
        {dismissed.length === alerts.length && (
          <div style={{ textAlign: 'center', padding: 40, color: COLORS.gray500 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>✅</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>All caught up!</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>No active alerts right now</div>
          </div>
        )}
      </div>

      {/* Monitoring Strip */}
      <div style={{ marginTop: 16, background: COLORS.navyLight, borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 11, color: COLORS.gray400, fontWeight: 700, marginBottom: 10 }}>MONITORING LIVE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { label: 'Flight SQ317 status', icon: '✈️', status: 'Tracking' },
            { label: 'Gate B12 → C08 updates', icon: '🚪', status: 'Watching' },
            { label: 'Traffic to CBD', icon: '🚗', status: 'Active' },
            { label: 'Security queue times', icon: '🛃', status: 'Live' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>{m.icon}</span>
                <span style={{ fontSize: 12, color: COLORS.gray400 }}>{m.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 6px ${COLORS.green}` }}/>
                <span style={{ fontSize: 11, color: COLORS.green, fontWeight: 600 }}>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  const interests = ['🍜 Food', '🏛️ Culture', '🌿 Nature', '🎨 Art', '🏃 Active'];
  const history = [
    { city: 'Tokyo', airport: 'NRT', date: 'Feb 12', spots: 3, rating: 5 },
    { city: 'Dubai', airport: 'DXB', date: 'Jan 28', spots: 2, rating: 4 },
    { city: 'Hong Kong', airport: 'HKG', date: 'Jan 5', spots: 4, rating: 5 },
  ];

  const [riskLevel, setRiskLevel] = useState('Moderate');

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      {/* Profile Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '4px 0' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.teal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
          👤
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white }}>Alex Morgan</div>
          <div style={{ fontSize: 12, color: COLORS.gray400 }}>alex@travelloop.app</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <Badge color={COLORS.teal}>🌟 Explorer Pro</Badge>
            <Badge color={COLORS.amber}>23 adventures</Badge>
          </div>
        </div>
      </div>

      {/* Passport & Travel Docs */}
      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: COLORS.gray400, fontWeight: 700, marginBottom: 10 }}>TRAVEL DOCUMENTS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🇺🇸</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>US Passport</div>
              <div style={{ fontSize: 11, color: COLORS.gray400 }}>Expires: Dec 2029</div>
            </div>
          </div>
          <Badge color={COLORS.green}>Valid</Badge>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '10px 0' }}/>
        <div style={{ fontSize: 11, color: COLORS.gray400, marginBottom: 6 }}>Visa-free access to <span style={{ color: COLORS.white, fontWeight: 700 }}>186 countries</span></div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Singapore ✓', 'UK ✓', 'Japan ✓', 'EU ✓'].map(v => (
            <Badge key={v} color={COLORS.green} style={{ fontSize: 10 }}>{v}</Badge>
          ))}
        </div>
      </Card>

      {/* Preferences */}
      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: COLORS.gray400, fontWeight: 700, marginBottom: 12 }}>TRAVEL PREFERENCES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: COLORS.gray400 }}>Budget</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Budget', 'Mid-Range', 'Luxury'].map(b => (
                <button key={b} style={{ background: b === 'Mid-Range' ? COLORS.teal : 'rgba(255,255,255,0.06)', color: b === 'Mid-Range' ? COLORS.navyDark : COLORS.gray500, border: 'none', borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>{b}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: COLORS.gray400 }}>Risk Tolerance</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Conservative', 'Moderate', 'Bold'].map(r => (
                <button key={r} onClick={() => setRiskLevel(r)} style={{ background: r === riskLevel ? COLORS.amber : 'rgba(255,255,255,0.06)', color: r === riskLevel ? COLORS.navyDark : COLORS.gray500, border: 'none', borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>{r}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }}/>
        <div style={{ fontSize: 12, color: COLORS.gray400, fontWeight: 700, marginBottom: 8 }}>INTERESTS</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {interests.map(i => (
            <Badge key={i} color={COLORS.amber} style={{ fontSize: 11 }}>{i}</Badge>
          ))}
        </div>
      </Card>

      {/* Trip History */}
      <div style={{ fontSize: 13, color: COLORS.white, fontWeight: 700, marginBottom: 10 }}>Recent Adventures</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {history.map((h, i) => (
          <Card key={i} style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.teal}33, ${COLORS.purple}33)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌏</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{h.city}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray400 }}>{h.airport} · {h.date} · {h.spots} spots</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: COLORS.amber, fontSize: 13 }}>{'★'.repeat(h.rating)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
        {[{ v: '23', l: 'Adventures', icon: '🗺️' }, { v: '14', l: 'Cities', icon: '🌆' }, { v: '4.8', l: 'Avg Rating', icon: '⭐' }].map(s => (
          <div key={s.l} style={{ background: COLORS.navyLight, borderRadius: 12, padding: 12, textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white }}>{s.v}</div>
            <div style={{ fontSize: 10, color: COLORS.gray500 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { id: 'home', emoji: '🏠', label: 'Home' },
  { id: 'explore', emoji: '🧭', label: 'Explore' },
  { id: 'plan', emoji: '📋', label: 'My Plan' },
  { id: 'alerts', emoji: '🔔', label: 'Alerts' },
  { id: 'profile', emoji: '👤', label: 'Profile' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #0a0a0f; font-family: 'Inter', -apple-system, sans-serif; }
      ::-webkit-scrollbar { display: none; }
      button { font-family: 'Inter', -apple-system, sans-serif; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'explore': return <ExploreScreen />;
      case 'plan': return <PlanScreen />;
      case 'alerts': return <AlertsScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 20% 50%, #1a1f3a22 0%, #0a0a0f 70%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Phone Frame */}
      <div style={{
        width: 375,
        height: 812,
        background: COLORS.navyDark,
        borderRadius: 48,
        overflow: 'hidden',
        border: '2px solid rgba(255,255,255,0.1)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Status Bar + Dynamic Island */}
        <div style={{ background: COLORS.navyDark, flexShrink: 0 }}>
          <StatusBar />
          <DynamicIsland />
        </div>

        {/* Screen Title */}
        <div style={{ padding: '8px 16px 4px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.teal})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Layover Loop</div>
              <div style={{ fontSize: 10, color: COLORS.gray500, fontWeight: 600 }}>Turn dead time into mini-adventures</div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.amberDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✈️</div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          flexShrink: 0,
          background: `rgba(15,18,36,0.97)`,
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '8px 0 20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  padding: '4px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: isActive ? `linear-gradient(135deg, ${COLORS.amber}22, ${COLORS.amber}11)` : 'transparent',
                  border: isActive ? `1px solid ${COLORS.amber}44` : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  transition: 'all 0.2s ease',
                }}>
                  {tab.emoji}
                </div>
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? COLORS.amber : COLORS.gray500,
                  transition: 'color 0.2s ease',
                }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
