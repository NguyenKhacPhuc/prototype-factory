const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F4F8',
    surface: '#FFFFFF',
    surfaceAlt: '#F7FAFC',
    surfaceCard: '#FFFFFF',
    border: '#E2EAF0',
    text: '#1A2332',
    textSub: '#5A7184',
    textMuted: '#8FA3B1',
    primary: '#00C896',
    primaryDark: '#00A87D',
    primaryLight: '#E0FFF6',
    primaryMid: '#CCFAEE',
    accent: '#FF6B6B',
    accentLight: '#FFE8E8',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    info: '#3B82F6',
    infoLight: '#EFF6FF',
    navBg: '#FFFFFF',
    navBorder: '#E2EAF0',
    statusBar: '#FFFFFF',
    disruption: '#FF6B6B',
    disruptionLight: '#FFF0F0',
    recovery: '#00C896',
    recoveryLight: '#E0FFF6',
    shadow: 'rgba(0,0,0,0.08)',
    pill: '#EDF2F7',
    pillText: '#4A6374',
  },
  dark: {
    bg: '#0D1117',
    surface: '#161B22',
    surfaceAlt: '#0D1117',
    surfaceCard: '#1E2530',
    border: '#2D3748',
    text: '#E8F0FE',
    textSub: '#8FA3B8',
    textMuted: '#556070',
    primary: '#00D9A3',
    primaryDark: '#00B885',
    primaryLight: '#0A2E24',
    primaryMid: '#0D3D2E',
    accent: '#FF7B7B',
    accentLight: '#3D1515',
    warning: '#FBBF24',
    warningLight: '#2D2000',
    info: '#60A5FA',
    infoLight: '#0F1D3D',
    navBg: '#161B22',
    navBorder: '#2D3748',
    statusBar: '#161B22',
    disruption: '#FF7B7B',
    disruptionLight: '#2D0F0F',
    recovery: '#00D9A3',
    recoveryLight: '#0A2E24',
    shadow: 'rgba(0,0,0,0.3)',
    pill: '#1E2530',
    pillText: '#8FA3B8',
  }
};

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [activeRecovery, setActiveRecovery] = useState(null);
  const [energyLevel, setEnergyLevel] = useState('medium');
  const [pressed, setPressed] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [showDisruptionModal, setShowDisruptionModal] = useState(false);
  const [notifDot, setNotifDot] = useState(true);

  const t = themes[theme];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      body { background: #C8D8E8; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const press = (id) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 150);
  };

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.12s ease, opacity 0.12s ease',
    cursor: 'pointer',
  });

  // ─── Status Bar ───────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 20px 4px', background: t.statusBar,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</span>
      <div style={{ width: 120, height: 30, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 13, color: t.text, strokeWidth: 2.5 })}
        {React.createElement(window.lucide.Battery, { size: 16, color: t.text, strokeWidth: 2.5 })}
      </div>
    </div>
  );

  // ─── Bottom Nav ───────────────────────────────────────────────
  const BottomNav = () => {
    const tabs = [
      { id: 'home', icon: window.lucide.Zap, label: 'Today' },
      { id: 'recovery', icon: window.lucide.RefreshCw, label: 'Recovery' },
      { id: 'nearby', icon: window.lucide.MapPin, label: 'Nearby' },
      { id: 'settings', icon: window.lucide.SlidersHorizontal, label: 'Settings' },
    ];
    return (
      <div style={{
        display: 'flex', background: t.navBg,
        borderTop: `1px solid ${t.navBorder}`,
        paddingBottom: 16, paddingTop: 8,
      }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <div key={tab.id} onClick={() => { setActiveTab(tab.id); press('nav-' + tab.id); }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                cursor: 'pointer', transform: pressed === 'nav-' + tab.id ? 'scale(0.9)' : 'scale(1)',
                transition: 'transform 0.12s ease',
                position: 'relative',
              }}>
              <div style={{
                width: 44, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active ? t.primaryLight : 'transparent',
                transition: 'background 0.2s ease',
              }}>
                {React.createElement(tab.icon, { size: 18, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 2 })}
                {tab.id === 'home' && notifDot && (
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: t.accent, position: 'absolute', top: 0, right: 10, border: `1.5px solid ${t.navBg}` }} />
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{tab.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── HOME SCREEN ─────────────────────────────────────────────
  const HomeScreen = () => {
    const disruptions = [
      { id: 'd1', type: 'delay', icon: window.lucide.Train, color: t.accent, bg: t.accentLight, title: 'Train delayed 40 min', sub: 'Line 6 — Southbound', time: '2:15 PM', severity: 'medium' },
      { id: 'd2', type: 'cancel', icon: window.lucide.Scissors, color: t.warning, bg: t.warningLight, title: 'Haircut rescheduled', sub: 'Studio Cuts — moved to 4:30', time: 'Today', severity: 'low' },
    ];
    const quickRec = [
      { id: 'r1', emoji: '☕', title: 'Low Energy', sub: '3 gentle stops', mins: 25, color: t.primary, bg: t.primaryLight },
      { id: 'r2', emoji: '⚡', title: 'Efficient Sprint', sub: '5 clustered errands', mins: 42, color: t.info, bg: t.infoLight },
      { id: 'r3', emoji: '🌧', title: 'Rainy Day', sub: 'Indoor-only options', mins: 30, color: t.warning, bg: t.warningLight },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div style={{ background: t.surface, padding: '8px 20px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 13, color: t.textMuted, fontWeight: 500 }}>Sunday, Mar 22</p>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginTop: 2 }}>Good afternoon, Alex</h1>
            </div>
            <div onClick={() => { setNotifDot(false); press('notif'); }}
              style={{ ...btnStyle('notif'), width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {React.createElement(window.lucide.Bell, { size: 18, color: t.textSub })}
              {notifDot && <div style={{ width: 8, height: 8, borderRadius: 4, background: t.accent, position: 'absolute', top: 8, right: 8, border: `2px solid ${t.surface}` }} />}
            </div>
          </div>

          {/* Day health */}
          <div style={{ marginTop: 16, background: t.primaryLight, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.primaryMid}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: t.primaryDark, textTransform: 'uppercase', letterSpacing: 0.8 }}>Day Health</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: t.primary, marginTop: 2 }}>62%</p>
                <p style={{ fontSize: 12, color: t.primaryDark, marginTop: 1 }}>2 disruptions detected</p>
              </div>
              <div style={{ position: 'relative', width: 64, height: 64 }}>
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke={t.primaryMid} strokeWidth="6" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke={t.primary} strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 26 * 0.62} ${2 * Math.PI * 26 * 0.38}`}
                    strokeLinecap="round" transform="rotate(-90 32 32)" />
                </svg>
                {React.createElement(window.lucide.Zap, { size: 22, color: t.primary, style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' } })}
              </div>
            </div>
          </div>
        </div>

        {/* Active disruptions */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Active Disruptions</h2>
            <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>See all</span>
          </div>
          {disruptions.map(d => (
            <div key={d.id} onClick={() => { press(d.id); setShowDisruptionModal(true); }}
              style={{ ...btnStyle(d.id), background: t.surfaceCard, borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14, boxShadow: `0 2px 8px ${t.shadow}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(d.icon, { size: 20, color: d.color })}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{d.title}</p>
                <p style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{d.sub}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: t.textMuted }}>{d.time}</p>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
              </div>
            </div>
          ))}
        </div>

        {/* Recovery modes */}
        <div style={{ padding: '16px 20px 0' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>Recovery Modes</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            {quickRec.map(r => (
              <div key={r.id} onClick={() => { press(r.id); setActiveTab('recovery'); setActiveRecovery(r.id); }}
                style={{ ...btnStyle(r.id), flex: 1, background: r.bg, borderRadius: 16, padding: '14px 12px', border: `1px solid ${r.bg}`, cursor: 'pointer' }}>
                <span style={{ fontSize: 22 }}>{r.emoji}</span>
                <p style={{ fontSize: 12, fontWeight: 700, color: t.text, marginTop: 8 }}>{r.title}</p>
                <p style={{ fontSize: 11, color: t.textSub, marginTop: 3 }}>{r.sub}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                  {React.createElement(window.lucide.Clock, { size: 11, color: r.color })}
                  <span style={{ fontSize: 11, color: r.color, fontWeight: 600 }}>{r.mins}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Context nudge */}
        <div style={{ padding: '16px 20px 24px' }}>
          <div style={{ background: t.info, borderRadius: 18, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -10, top: -10, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.12)' }} />
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide.Pill, { size: 18, color: '#fff' })}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Act in the next 18 min</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', marginTop: 3, lineHeight: 1.5 }}>You're near Walgreens on 5th Ave — refill your prescription before it closes at 6 PM.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <div onClick={() => press('nudge-act')}
                    style={{ ...btnStyle('nudge-act'), background: '#fff', borderRadius: 10, padding: '8px 16px', cursor: 'pointer' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: t.info }}>Let's go</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 10, padding: '8px 14px', cursor: 'pointer' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Dismiss</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── RECOVERY SCREEN ──────────────────────────────────────────
  const RecoveryScreen = () => {
    const steps = [
      { id: 's1', time: '2:20 PM', duration: '15 min', icon: window.lucide.Coffee, color: t.primary, bg: t.primaryLight, title: 'Charge at Blue Bottle', sub: '0.3 mi • Opens until 7 PM • Fast WiFi', tags: ['Quiet', 'Outlet'], tip: 'Your usual spot — 2 open corner seats right now.' },
      { id: 's2', time: '2:35 PM', duration: '8 min', icon: window.lucide.Pill, color: t.info, bg: t.infoLight, title: 'Walgreens Pharmacy', sub: '5th & Market • Closes 6 PM', tags: ['Errand', 'Urgent'], tip: 'Prescription ready — saved from last visit.' },
      { id: 's3', time: '2:45 PM', duration: '6 min', icon: window.lucide.Package, color: t.warning, bg: t.warningLight, title: 'Pick up dry cleaning', sub: 'Prestige Cleaners • On your route', tags: ['Errand'], tip: 'Been pending 4 days — fits perfectly before haircut.' },
      { id: 's4', time: '3:00 PM', duration: '10 min', icon: window.lucide.ShoppingCart, color: '#8B5CF6', bg: '#EDE9FE', title: 'Trader Joe\'s quick stop', sub: '3 items • 0.2 mi from haircut', tags: ['Optional'], tip: 'Flowers + dinner supplies. Under 10 min with express lane.' },
      { id: 's5', time: '4:30 PM', duration: '45 min', icon: window.lucide.Scissors, color: t.accent, bg: t.accentLight, title: 'Haircut at Studio Cuts', sub: 'Rescheduled — 4:30 PM confirmed', tags: ['Appointment'], tip: '' },
    ];

    const energyModes = ['low', 'medium', 'high'];

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div style={{ background: t.surface, padding: '8px 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>Active Plan</p>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, marginTop: 2 }}>Recovery Path</h1>
            </div>
            <div style={{ background: t.primaryLight, borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              {React.createElement(window.lucide.RefreshCw, { size: 13, color: t.primary })}
              <span style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>Rebuilt 2m ago</span>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            {[
              { label: 'Stops', val: '5', icon: window.lucide.MapPin, color: t.primary },
              { label: 'Total', val: '84m', icon: window.lucide.Clock, color: t.warning },
              { label: 'Saved', val: '40m', icon: window.lucide.TrendingDown, color: t.info },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: t.surfaceAlt, borderRadius: 14, padding: '10px 12px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                  {React.createElement(s.icon, { size: 14, color: s.color })}
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{s.val}</p>
                <p style={{ fontSize: 10, color: t.textMuted, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Energy toggle */}
          <div style={{ display: 'flex', gap: 6, marginTop: 12, background: t.surfaceAlt, borderRadius: 12, padding: 4, border: `1px solid ${t.border}` }}>
            {energyModes.map(m => (
              <div key={m} onClick={() => { press('energy-' + m); setEnergyLevel(m); }}
                style={{ ...btnStyle('energy-' + m), flex: 1, borderRadius: 10, padding: '7px 0', textAlign: 'center', background: energyLevel === m ? t.primary : 'transparent', transition: 'background 0.2s ease', cursor: 'pointer' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: energyLevel === m ? '#fff' : t.textMuted, textTransform: 'capitalize' }}>{m === 'low' ? '🌙 Low' : m === 'medium' ? '⚡ Med' : '🔥 High'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '16px 20px 24px' }}>
          {steps.map((step, i) => {
            const done = checkedItems[step.id];
            return (
              <div key={step.id} style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
                {/* Timeline line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40 }}>
                  <div onClick={() => toggleCheck(step.id)}
                    style={{ ...btnStyle('check-' + step.id), width: 40, height: 40, borderRadius: 14, background: done ? t.primary : step.bg, border: done ? 'none' : `2px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s ease' }}>
                    {done ? React.createElement(window.lucide.Check, { size: 18, color: '#fff', strokeWidth: 3 }) : React.createElement(step.icon, { size: 18, color: step.color })}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 24, background: done ? t.primary : t.border, marginTop: 4, borderRadius: 1 }} />
                  )}
                </div>
                {/* Card */}
                <div style={{ flex: 1, background: done ? t.surfaceAlt : t.surfaceCard, borderRadius: 16, padding: '12px 14px', marginBottom: 10, border: `1px solid ${done ? t.border : t.border}`, opacity: done ? 0.7 : 1, transition: 'opacity 0.2s ease', boxShadow: done ? 'none' : `0 2px 8px ${t.shadow}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: done ? t.textMuted : t.text, textDecoration: done ? 'line-through' : 'none' }}>{step.title}</p>
                      <p style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{step.sub}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: t.textSub }}>{step.time}</p>
                      <p style={{ fontSize: 10, color: t.textMuted }}>{step.duration}</p>
                    </div>
                  </div>
                  {step.tip && !done && (
                    <div style={{ marginTop: 8, background: t.primaryLight, borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      {React.createElement(window.lucide.Sparkles, { size: 12, color: t.primary, style: { flexShrink: 0, marginTop: 1 } })}
                      <p style={{ fontSize: 11, color: t.primaryDark, lineHeight: 1.4 }}>{step.tip}</p>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                    {step.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: t.pillText, background: t.pill, borderRadius: 6, padding: '3px 8px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div onClick={() => press('regenerate')}
            style={{ ...btnStyle('regenerate'), background: t.primary, borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginTop: 4, boxShadow: `0 4px 16px ${t.shadow}` }}>
            {React.createElement(window.lucide.RefreshCw, { size: 16, color: '#fff' })}
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Regenerate Plan</span>
          </div>
        </div>
      </div>
    );
  };

  // ─── NEARBY SCREEN ────────────────────────────────────────────
  const NearbyScreen = () => {
    const [filter, setFilter] = useState('all');
    const filters = ['all', 'urgent', 'food', 'errand', 'transit'];
    const places = [
      { id: 'p1', name: 'Blue Bottle Coffee', type: 'food', dist: '0.3 mi', mins: 6, open: true, closes: '7:00 PM', tags: ['WiFi', 'Outlets', 'Quiet'], score: 98, color: t.primary, bg: t.primaryLight, icon: window.lucide.Coffee, fit: 'Perfect charging spot' },
      { id: 'p2', name: 'Walgreens Pharmacy', type: 'urgent', dist: '0.4 mi', mins: 8, open: true, closes: '6:00 PM', tags: ['Urgent', 'Prescription'], score: 94, color: t.accent, bg: t.accentLight, icon: window.lucide.Pill, fit: 'Closes in 58 min' },
      { id: 'p3', name: 'USPS Post Office', type: 'errand', dist: '0.6 mi', mins: 12, open: false, closes: 'Closed', tags: ['Errand', 'Closed'], score: 0, color: t.textMuted, bg: t.surfaceAlt, icon: window.lucide.Mail, fit: 'Opens tomorrow 9 AM' },
      { id: 'p4', name: 'Prestige Cleaners', type: 'errand', dist: '0.5 mi', mins: 10, open: true, closes: '6:30 PM', tags: ['Pickup'], score: 87, color: t.warning, bg: t.warningLight, icon: window.lucide.Package, fit: 'On your route home' },
      { id: 'p5', name: 'Trader Joe\'s', type: 'food', dist: '0.7 mi', mins: 14, open: true, closes: '9:00 PM', tags: ['Optional', 'Groceries'], score: 75, color: '#8B5CF6', bg: '#EDE9FE', icon: window.lucide.ShoppingCart, fit: 'Express lane available' },
      { id: 'p6', name: 'Powell St. BART', type: 'transit', dist: '0.2 mi', mins: 4, open: true, closes: '12:30 AM', tags: ['Transit', 'Delayed'], score: 60, color: t.info, bg: t.infoLight, icon: window.lucide.Train, fit: 'Line 6 — +40 min delay' },
    ];

    const filtered = filter === 'all' ? places : places.filter(p => p.type === filter);

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Map placeholder */}
        <div style={{ height: 200, background: `linear-gradient(135deg, ${t.primaryLight} 0%, ${t.infoLight} 100%)`, position: 'relative', overflow: 'hidden' }}>
          {/* Grid lines */}
          {[0,1,2,3].map(i => (
            <div key={'h'+i} style={{ position: 'absolute', left: 0, right: 0, top: `${25*i + 12}%`, height: 1, background: `${t.border}80` }} />
          ))}
          {[0,1,2,3,4].map(i => (
            <div key={'v'+i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${20*i + 10}%`, width: 1, background: `${t.border}80` }} />
          ))}
          {/* You are here */}
          <div style={{ position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: t.info, border: '3px solid #fff', boxShadow: `0 0 0 6px ${t.info}40` }} />
          </div>
          {/* Pins */}
          {[
            { l: '35%', t2: '30%', c: t.primary },
            { l: '62%', t2: '42%', c: t.accent },
            { l: '72%', t2: '68%', c: t.warning },
            { l: '28%', t2: '70%', c: '#8B5CF6' },
          ].map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: p.l, top: p.t2, transform: 'translate(-50%,-50%)' }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: p.c, border: '2px solid #fff', boxShadow: `0 2px 6px ${t.shadow}` }} />
            </div>
          ))}
          {/* Route line */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <polyline points="188,110 130,60 248,84 268,136 112,140" fill="none" stroke={t.primary} strokeWidth="2" strokeDasharray="6,4" strokeOpacity="0.6" />
          </svg>
          <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, background: `${t.surface}CC`, backdropFilter: 'blur(10px)', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${t.border}` }}>
            {React.createElement(window.lucide.Navigation2, { size: 14, color: t.primary })}
            <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Optimized route • 5 stops • 1.6 mi total</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: '14px 20px 0', overflowX: 'hidden' }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {filters.map(f => (
              <div key={f} onClick={() => { setFilter(f); press('filter-' + f); }}
                style={{ ...btnStyle('filter-' + f), flexShrink: 0, borderRadius: 20, padding: '6px 14px', background: filter === f ? t.primary : t.surface, border: `1px solid ${filter === f ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.15s ease' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: filter === f ? '#fff' : t.textSub, textTransform: 'capitalize' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Place list */}
        <div style={{ padding: '12px 20px 24px' }}>
          {filtered.map(place => (
            <div key={place.id} onClick={() => press(place.id)}
              style={{ ...btnStyle(place.id), background: t.surfaceCard, borderRadius: 16, padding: '14px', marginBottom: 10, border: `1px solid ${t.border}`, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: `0 2px 8px ${t.shadow}`, opacity: place.open ? 1 : 0.6 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: place.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(place.icon, { size: 20, color: place.color })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{place.name}</p>
                  {place.open && place.score > 0 && (
                    <div style={{ background: place.score >= 90 ? t.primaryLight : t.warningLight, borderRadius: 8, padding: '3px 8px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: place.score >= 90 ? t.primary : t.warning }}>{place.score}%</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {React.createElement(window.lucide.MapPin, { size: 11, color: t.textMuted })}
                    <span style={{ fontSize: 11, color: t.textSub }}>{place.dist}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {React.createElement(window.lucide.Clock, { size: 11, color: t.textMuted })}
                    <span style={{ fontSize: 11, color: t.textSub }}>{place.mins} min walk</span>
                  </div>
                  <span style={{ fontSize: 11, color: place.open ? t.primary : t.accent, fontWeight: 600 }}>{place.closes}</span>
                </div>
                <div style={{ marginTop: 6, background: place.bg, borderRadius: 8, padding: '5px 8px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  {React.createElement(window.lucide.Sparkles, { size: 11, color: place.color })}
                  <span style={{ fontSize: 11, color: place.color, fontWeight: 600 }}>{place.fit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SETTINGS SCREEN ──────────────────────────────────────────
  const SettingsScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [locationMode, setLocationMode] = useState(true);
    const [calSync, setCalSync] = useState(true);
    const [learnMode, setLearnMode] = useState(true);

    const Toggle = ({ val, onChange }) => (
      <div onClick={() => { onChange(!val); press('tog'); }}
        style={{ width: 46, height: 26, borderRadius: 13, background: val ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: val ? 23 : 3, transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
    );

    const SettingRow = ({ icon, label, sub, right, noBorder }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: noBorder ? 'none' : `1px solid ${t.border}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {React.createElement(icon, { size: 17, color: t.primary })}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</p>
          {sub && <p style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{sub}</p>}
        </div>
        {right}
      </div>
    );

    const prefs = [
      { id: 'pref1', label: 'Quiet indoors', emoji: '🤫', active: true },
      { id: 'pref2', label: 'Minimal walking', emoji: '🦶', active: false },
      { id: 'pref3', label: 'Avoid crowds', emoji: '👤', active: true },
      { id: 'pref4', label: 'Coffee stops', emoji: '☕', active: true },
      { id: 'pref5', label: 'Fast routes', emoji: '⚡', active: false },
      { id: 'pref6', label: 'Indoor rain', emoji: '🌧', active: true },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Profile header */}
        <div style={{ background: t.surface, padding: '8px 20px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Settings</h1>
            <div onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light'); press('theme-tog'); }}
              style={{ ...btnStyle('theme-tog'), width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {theme === 'light' ? React.createElement(window.lucide.Moon, { size: 17, color: t.textSub }) : React.createElement(window.lucide.Sun, { size: 17, color: t.warning })}
            </div>
          </div>

          {/* Profile card */}
          <div style={{ marginTop: 14, background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`, borderRadius: 20, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 54, height: 54, borderRadius: 18, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 26 }}>👤</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Alex Chen</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>alex@example.com</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 14px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Pro</p>
            </div>
          </div>

          {/* Learning stat */}
          <div style={{ marginTop: 12, background: t.surfaceAlt, borderRadius: 16, padding: '12px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            {React.createElement(window.lucide.BrainCircuit, { size: 22, color: t.primary })}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Route Reset has learned 48 preferences</p>
              <div style={{ height: 4, background: t.border, borderRadius: 2, marginTop: 6 }}>
                <div style={{ height: 4, width: '72%', background: t.primary, borderRadius: 2 }} />
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: t.primary }}>72%</span>
          </div>
        </div>

        {/* Behavior preferences */}
        <div style={{ padding: '16px 20px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>My Preferences</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {prefs.map(p => {
              const [active, setActive] = useState(p.active);
              return (
                <div key={p.id} onClick={() => { setActive(!active); press(p.id); }}
                  style={{ ...btnStyle(p.id), background: active ? t.primaryLight : t.surface, borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, border: `1.5px solid ${active ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.15s ease' }}>
                  <span style={{ fontSize: 14 }}>{p.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: active ? t.primary : t.textSub }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings sections */}
        <div style={{ padding: '16px 20px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Integrations</p>
          <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}` }}>
            <SettingRow icon={window.lucide.Calendar} label="Calendar Sync" sub="Google Calendar connected" right={<Toggle val={calSync} onChange={setCalSync} />} />
            <SettingRow icon={window.lucide.MapPin} label="Background Location" sub="Enables context-aware nudges" right={<Toggle val={locationMode} onChange={setLocationMode} />} />
            <SettingRow icon={window.lucide.Bell} label="Smart Notifications" sub="Context-rich alerts only" right={<Toggle val={notifs} onChange={setNotifs} />} noBorder />
          </div>
        </div>

        <div style={{ padding: '16px 20px 24px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Intelligence</p>
          <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}` }}>
            <SettingRow icon={window.lucide.BrainCircuit} label="Adaptive Learning" sub="Learns from your choices" right={<Toggle val={learnMode} onChange={setLearnMode} />} />
            <SettingRow icon={window.lucide.Trash2} label="Reset Learned Data" sub="Start fresh from today" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} noBorder />
          </div>
        </div>
      </div>
    );
  };

  // ─── Disruption Modal ─────────────────────────────────────────
  const DisruptionModal = () => (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 100, borderRadius: 44 }}>
      <div style={{ background: t.surface, borderRadius: '24px 24px 44px 44px', width: '100%', padding: '20px 20px 36px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ width: 36, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 20px' }} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: t.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Train, { size: 22, color: t.accent })}
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Train delayed 40 min</p>
            <p style={{ fontSize: 13, color: t.textSub }}>Line 6 Southbound — Powell St</p>
          </div>
        </div>
        <div style={{ background: t.warningLight, borderRadius: 14, padding: '12px 14px', marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>Your 2:30 PM arrival is now 3:10 PM. This affects 3 items in today's plan. Route Reset has already rebuilt a recovery path.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div onClick={() => { setShowDisruptionModal(false); setActiveTab('recovery'); press('modal-accept'); }}
            style={{ ...btnStyle('modal-accept'), flex: 1, background: t.primary, borderRadius: 14, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            {React.createElement(window.lucide.RefreshCw, { size: 15, color: '#fff' })}
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>View Recovery Plan</span>
          </div>
          <div onClick={() => setShowDisruptionModal(false)}
            style={{ width: 52, borderRadius: 14, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.X, { size: 18, color: t.textSub })}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#C8D8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
      <div style={{
        width: 375, height: 812, borderRadius: 44,
        background: t.bg,
        boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        position: 'relative', fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'background 0.3s ease',
      }}>
        <StatusBar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'recovery' && <RecoveryScreen />}
          {activeTab === 'nearby' && <NearbyScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </div>
        <BottomNav />
        {showDisruptionModal && <DisruptionModal />}
      </div>
    </div>
  );
}
