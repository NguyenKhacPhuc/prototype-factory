const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F2F4F7',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FAFB',
    card: '#FFFFFF',
    cardBorder: '#E8EDF2',
    text: '#0F1923',
    textSecondary: '#5A6878',
    textMuted: '#9BA8B4',
    primary: '#0EA5E9',
    primaryDark: '#0284C7',
    primaryLight: '#E0F2FE',
    primaryGlow: 'rgba(14,165,233,0.15)',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    success: '#10B981',
    successLight: '#D1FAE5',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    navBg: '#FFFFFF',
    navBorder: '#E8EDF2',
    statusBar: '#0F1923',
    pill: '#E8EDF2',
    pillText: '#5A6878',
    pillActive: '#0EA5E9',
    pillActiveText: '#FFFFFF',
    mapBg: '#D6E4EE',
    shadow: 'rgba(15,25,35,0.08)',
    overlay: 'rgba(15,25,35,0.4)',
    inputBg: '#F2F4F7',
    divider: '#EDF0F4',
    tagBg: '#E0F2FE',
    tagText: '#0284C7',
  },
  dark: {
    bg: '#0A0F1A',
    surface: '#111827',
    surfaceAlt: '#141D2B',
    card: '#1A2335',
    cardBorder: '#1E2D40',
    text: '#F0F4F8',
    textSecondary: '#8FA3BA',
    textMuted: '#4A5E74',
    primary: '#38BDF8',
    primaryDark: '#0EA5E9',
    primaryLight: '#0C2A40',
    primaryGlow: 'rgba(56,189,248,0.18)',
    accent: '#FBBF24',
    accentLight: '#2D2008',
    success: '#34D399',
    successLight: '#042C20',
    danger: '#F87171',
    dangerLight: '#2D0A0A',
    navBg: '#111827',
    navBorder: '#1E2D40',
    statusBar: '#F0F4F8',
    pill: '#1A2335',
    pillText: '#8FA3BA',
    pillActive: '#38BDF8',
    pillActiveText: '#0A0F1A',
    mapBg: '#0F1E2D',
    shadow: 'rgba(0,0,0,0.4)',
    overlay: 'rgba(0,0,0,0.6)',
    inputBg: '#1A2335',
    divider: '#1E2D40',
    tagBg: '#0C2A40',
    tagText: '#38BDF8',
  }
};

const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeKey, setThemeKey] = useState('light');
  const [selectedRole, setSelectedRole] = useState('commuter');
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [briefMode, setBriefMode] = useState('quick');
  const [notifToggle, setNotifToggle] = useState({ transit: true, weather: true, civic: false, finance: true });
  const [pressedTab, setPressedTab] = useState(null);
  const t = themes[themeKey];

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = fontLink + `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const toggleTheme = () => setThemeKey(k => k === 'light' ? 'dark' : 'light');

  const containerStyle = {
    minHeight: '100vh',
    background: '#C8CDD4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    padding: '24px 0',
  };

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 48,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: `0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.08)`,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={phoneStyle}>
        <StatusBar t={t} themeKey={themeKey} toggleTheme={toggleTheme} />
        <DynamicIsland t={t} />
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home' && <HomeScreen t={t} briefMode={briefMode} setBriefMode={setBriefMode} selectedBrief={selectedBrief} setSelectedBrief={setSelectedBrief} />}
          {activeTab === 'impact' && <ImpactScreen t={t} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />}
          {activeTab === 'pulse' && <PulseScreen t={t} />}
          {activeTab === 'alerts' && <AlertsScreen t={t} notifToggle={notifToggle} setNotifToggle={setNotifToggle} />}
          {activeTab === 'settings' && <SettingsScreen t={t} themeKey={themeKey} toggleTheme={toggleTheme} />}
        </div>
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
          padding: '10px 0 20px', borderTop: `1px solid ${t.navBorder}`, background: t.navBg,
          flexShrink: 0,
        }}>
          {[
            { id: 'home', icon: window.lucide.Newspaper, label: 'Briefs' },
            { id: 'impact', icon: window.lucide.Layers, label: 'Impact' },
            { id: 'pulse', icon: window.lucide.MapPin, label: 'Pulse' },
            { id: 'alerts', icon: window.lucide.Bell, label: 'Alerts' },
            { id: 'settings', icon: window.lucide.Settings2, label: 'Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseDown={() => setPressedTab(tab.id)}
              onMouseUp={() => setPressedTab(null)}
              style={{
                background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 10px',
                transform: pressedTab === tab.id ? 'scale(0.88)' : 'scale(1)',
                transition: 'transform 0.1s ease',
              }}>
              {React.createElement(tab.icon, {
                size: 22,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
              })}
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: 0.2,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ t, themeKey, toggleTheme }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 24px 4px', flexShrink: 0, background: t.bg,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: t.text, strokeWidth: 2.2 })}
        {React.createElement(window.lucide.Signal, { size: 14, color: t.text, strokeWidth: 2.2 })}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${t.text}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '78%', height: '100%', borderRadius: 1.5, background: t.success }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicIsland({ t }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0 8px', background: t.bg, flexShrink: 0 }}>
      <div style={{ width: 120, height: 32, background: '#000', borderRadius: 20 }} />
    </div>
  );
}

const briefs = [
  {
    id: 1, category: 'Transit', urgency: 'high', icon: 'Train', color: '#EF4444',
    headline: 'BART Line Delays Up to 25 Minutes',
    summary: 'Signal disruption near Civic Center affecting southbound trains. Expect significant delays on the Daly City line through 8:45 PM.',
    detail: 'A signal equipment failure near Civic Center Station is causing cascading delays across the southbound BART network. Trains are single-tracking between 16th St Mission and Balboa Park. AC Transit buses 14 and 38 are available as alternates. The agency estimates normal service resumes by 9:00 PM. If you normally take the 6:22 PM train, consider departing 35 minutes early or switching to Muni Metro Line J.',
    readTime: 45, impact: 'Your commute', tags: ['Transit', 'SF Bay Area'],
    time: '6 min ago',
  },
  {
    id: 2, category: 'Weather', urgency: 'medium', icon: 'CloudRain', color: '#F59E0B',
    headline: 'Evening Storm Advisory: 0.8" Rain Expected',
    summary: 'A Pacific system arrives by 7 PM bringing heavy rain and gusty winds to the Bay Area. Streets may flood in low-lying areas.',
    detail: 'The National Weather Service has issued a Winter Storm Advisory for the SF Bay Area effective 7:00 PM through midnight. Rainfall of 0.8 to 1.2 inches is expected with wind gusts up to 45 mph in exposed areas. Caltrain has pre-positioned extra equipment but warns of possible debris on tracks. Keep umbrellas and rain gear accessible. School districts are monitoring conditions for potential morning delays.',
    readTime: 40, impact: 'Evening plans', tags: ['Weather', 'Bay Area'],
    time: '18 min ago',
  },
  {
    id: 3, category: 'Policy', urgency: 'low', icon: 'FileText', color: '#10B981',
    headline: 'CA Rent Control Expansion Passes Committee',
    summary: 'AB 1420 advances to full Assembly vote next week. If signed, the law would cap annual rent increases at 3% for units built before 2010.',
    detail: 'The California Assembly Housing Committee voted 7-4 to advance AB 1420, which would extend rent control protections to buildings constructed before January 1, 2010 statewide. Current law exempts most single-family homes and condos. The bill now heads to a full Assembly vote expected the week of April 7. If passed and signed by the Governor, the cap would take effect July 1. Landlords have 60 days to notify tenants of any pending increases before the effective date.',
    readTime: 55, impact: 'Housing costs', tags: ['Policy', 'Housing'],
    time: '1 hr ago',
  },
  {
    id: 4, category: 'Local', urgency: 'low', icon: 'Store', color: '#8B5CF6',
    headline: 'Mission District Weekend Road Closures',
    summary: 'Valencia Street closed between 16th and 24th for the Carnaval Festival setup Sat–Sun. Reroute via Guerrero.',
    detail: 'The San Francisco Department of Public Works has issued permits for Carnaval SF 2026 setup, closing Valencia Street to through traffic from 16th to 24th Street starting Friday midnight. The closure lasts through Sunday at 8 PM. Muni Route 49 will reroute via Mission Street. Parking restrictions are also in effect on adjacent blocks. Festival attendance is expected to exceed 80,000 visitors this weekend.',
    readTime: 30, impact: 'Weekend travel', tags: ['Local', 'Events'],
    time: '2 hrs ago',
  },
];

const contexts = ['Commute', 'At Home', 'Work', 'School Run', 'Travel'];

function HomeScreen({ t, briefMode, setBriefMode, selectedBrief, setSelectedBrief }) {
  const [activeContext, setActiveContext] = useState('Commute');
  const [expandedId, setExpandedId] = useState(null);

  if (selectedBrief) {
    return <BriefDetail t={t} brief={selectedBrief} onBack={() => setSelectedBrief(null)} />;
  }

  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px 12px', background: t.bg }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>Good evening, Alex</p>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2 }}>Your Signal Brief</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
            <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>Live</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {contexts.map(ctx => (
            <button key={ctx} onClick={() => setActiveContext(ctx)} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none',
              background: activeContext === ctx ? t.primary : t.pill,
              color: activeContext === ctx ? '#fff' : t.pillText,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>{ctx}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 20px', background: t.bg, display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, marginRight: 4 }}>Length:</span>
        {['quick', 'standard', 'deep'].map(mode => (
          <button key={mode} onClick={() => setBriefMode(mode)} style={{
            padding: '5px 12px', borderRadius: 16, border: 'none',
            background: briefMode === mode ? t.primaryLight : 'transparent',
            color: briefMode === mode ? t.primary : t.textMuted,
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textTransform: 'capitalize', transition: 'all 0.2s',
          }}>{mode === 'quick' ? '2 min' : mode === 'standard' ? '5 min' : '10 min'}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 16px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
          borderRadius: 20, padding: '14px 16px', marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {React.createElement(window.lucide.Zap, { size: 16, color: '#fff' })}
          <div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 1 }}>Context: Evening Commute</p>
            <p style={{ fontSize: 12, color: '#fff', fontWeight: 600, lineHeight: 1.4 }}>
              3 stories directly affect your commute tonight. BART delays are the top priority.
            </p>
          </div>
        </div>

        {briefs.map((brief, i) => (
          <BriefCard key={brief.id} brief={brief} t={t} onPress={() => setSelectedBrief(brief)} index={i} mode={briefMode} />
        ))}
      </div>
    </div>
  );
}

function BriefCard({ brief, t, onPress, index, mode }) {
  const [pressed, setPressed] = useState(false);
  const urgencyColors = { high: t.danger, medium: t.accent, low: t.success };

  return (
    <div
      onClick={onPress}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: t.card,
        borderRadius: 18,
        padding: '14px 16px',
        marginBottom: 10,
        border: `1px solid ${t.cardBorder}`,
        cursor: 'pointer',
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        boxShadow: pressed ? 'none' : `0 2px 12px ${t.shadow}`,
      }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: `${brief.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide[brief.icon] || window.lucide.Circle, { size: 16, color: brief.color })}
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: brief.color, textTransform: 'uppercase', letterSpacing: 0.4 }}>{brief.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: urgencyColors[brief.urgency] }} />
              <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 500 }}>{brief.urgency} priority</span>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 500, paddingTop: 2 }}>{brief.time}</span>
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.35, marginBottom: 6 }}>{brief.headline}</h3>
      {mode !== 'quick' && (
        <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5, marginBottom: 8 }}>{brief.summary}</p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {brief.tags.map(tag => (
            <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: t.tagText, background: t.tagBg, padding: '3px 8px', borderRadius: 8 }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {React.createElement(window.lucide.Clock, { size: 11, color: t.textMuted })}
          <span style={{ fontSize: 10, color: t.textMuted }}>{brief.readTime}s read</span>
        </div>
      </div>
    </div>
  );
}

function BriefDetail({ t, brief, onBack }) {
  const [saved, setSaved] = useState(false);
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px 12px', background: t.bg }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          {React.createElement(window.lucide.ArrowLeft, { size: 18, color: t.text })}
          <span style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Back to Briefs</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${brief.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide[brief.icon] || window.lucide.Circle, { size: 20, color: brief.color })}
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: brief.color, textTransform: 'uppercase', letterSpacing: 0.4 }}>{brief.category}</span>
            <p style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{brief.time} · {brief.readTime}s read</p>
          </div>
          <button onClick={() => setSaved(s => !s)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Bookmark, { size: 20, color: saved ? t.primary : t.textMuted, fill: saved ? t.primary : 'none' })}
          </button>
        </div>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: t.text, lineHeight: 1.3, marginBottom: 12 }}>{brief.headline}</h2>
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ background: t.card, borderRadius: 18, padding: 16, marginBottom: 12, border: `1px solid ${t.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            {React.createElement(window.lucide.Zap, { size: 14, color: t.primary })}
            <span style={{ fontSize: 11, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.4 }}>Quick Takeaway</span>
          </div>
          <p style={{ fontSize: 13, color: t.text, lineHeight: 1.5, fontWeight: 500 }}>{brief.summary}</p>
        </div>

        <div style={{ background: t.card, borderRadius: 18, padding: 16, marginBottom: 12, border: `1px solid ${t.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            {React.createElement(window.lucide.AlignLeft, { size: 14, color: t.textSecondary })}
            <span style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 0.4 }}>Full Context</span>
          </div>
          <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.65 }}>{brief.detail}</p>
        </div>

        <div style={{ background: t.primaryLight, borderRadius: 18, padding: 16, border: `1px solid ${t.primaryGlow}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            {React.createElement(window.lucide.GitBranch, { size: 14, color: t.primary })}
            <span style={{ fontSize: 11, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.4 }}>Source Trail</span>
          </div>
          {['BART Service Alerts (official)', 'SF Gate Transit Desk', 'Signal Brief AI synthesis'].map((src, i) => (
            <div key={src} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i < 2 ? 8 : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.primary, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: t.primary, fontWeight: 500 }}>{src}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const roles = [
  { id: 'commuter', label: 'Commuter', icon: 'Train', color: '#0EA5E9' },
  { id: 'parent', label: 'Parent', icon: 'Baby', color: '#8B5CF6' },
  { id: 'renter', label: 'Renter', icon: 'Home', color: '#10B981' },
  { id: 'freelancer', label: 'Freelancer', icon: 'Laptop', color: '#F59E0B' },
  { id: 'traveler', label: 'Traveler', icon: 'Plane', color: '#EF4444' },
];

const impactData = {
  commuter: [
    { headline: 'BART Signal Disruption', impact: 'Your evening southbound train may run 25+ min late. Leave now or switch to Muni Metro Line J at 16th St.', severity: 'high' },
    { headline: 'Storm Advisory Tonight', impact: 'Wet roads and wind gusts expected. Your bike commute home carries risk. Consider Lyft or Muni.', severity: 'medium' },
    { headline: 'Mission Street Closure', impact: 'Your usual weekend route via Valencia is blocked Sat–Sun. Reroute via Guerrero Street.', severity: 'low' },
  ],
  parent: [
    { headline: 'Storm Advisory Tonight', impact: 'Check with your school: morning may bring delays or late start if rain continues overnight.', severity: 'medium' },
    { headline: 'CA Rent Control Expansion', impact: 'If you rent, a 3% annual cap could reduce housing cost pressure and family budget stress from July.', severity: 'low' },
    { headline: 'Mission Street Closure', impact: 'Street festival this weekend. Keep kids away from Valencia corridor — crowds and road closures through Sunday 8 PM.', severity: 'low' },
  ],
  renter: [
    { headline: 'CA Rent Control Expansion', impact: 'If your unit was built before 2010, AB 1420 caps increases at 3% annually. Your landlord has 60 days to issue any pending notices before July 1.', severity: 'high' },
    { headline: 'Storm Advisory Tonight', impact: 'Check for any roof or window leaks tonight. Document with photos for your landlord if water damage occurs.', severity: 'medium' },
    { headline: 'BART Signal Disruption', impact: 'If you rely on transit to view rentals tonight, showings may need to be rescheduled.', severity: 'low' },
  ],
  freelancer: [
    { headline: 'CA Rent Control Expansion', impact: 'If you work from a rented home studio, a 3% cap protects your fixed overhead from July. Good for budget forecasting.', severity: 'medium' },
    { headline: 'Storm Advisory Tonight', impact: 'Client meetings tonight? Suggest switching to video call. Road and transit disruptions make in-person risky.', severity: 'medium' },
    { headline: 'Mission Street Closure', impact: 'If you invoice near the Mission district, plan extra 20–30 min travel time for weekend client visits.', severity: 'low' },
  ],
  traveler: [
    { headline: 'Storm Advisory Tonight', impact: "SFO may see ground delays tonight. Check your flight status now and arrive 90 min early if departing before 11 PM.", severity: 'high' },
    { headline: 'BART Signal Disruption', impact: 'SFO-bound BART is impacted. Consider rideshare from SFO to downtown until service normalizes (est. 9 PM).', severity: 'high' },
    { headline: 'Mission Street Closure', impact: 'If your hotel is near the Mission, expect noise and foot traffic from Carnaval festival this weekend.', severity: 'low' },
  ],
};

function ImpactScreen({ t, selectedRole, setSelectedRole }) {
  const items = impactData[selectedRole] || [];
  const severityColor = { high: t.danger, medium: t.accent, low: t.success };

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px 12px', background: t.bg }}>
        <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Impact Lens</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>How news affects you</h1>
        <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.5 }}>Select your life role to see personalized implications.</p>
      </div>

      <div style={{ padding: '0 20px 12px', background: t.bg }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {roles.map(role => (
            <button key={role.id} onClick={() => setSelectedRole(role.id)} style={{
              flexShrink: 0, padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: selectedRole === role.id ? role.color : t.pill,
              color: selectedRole === role.id ? '#fff' : t.pillText,
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all 0.2s',
            }}>
              {React.createElement(window.lucide[role.icon] || window.lucide.Circle, {
                size: 13, color: selectedRole === role.id ? '#fff' : t.textMuted,
              })}
              <span style={{ fontSize: 12, fontWeight: 600 }}>{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 20px 20px' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            background: t.card, borderRadius: 18, padding: '14px 16px', marginBottom: 10,
            border: `1px solid ${t.cardBorder}`, boxShadow: `0 2px 10px ${t.shadow}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: t.text, flex: 1, paddingRight: 8, lineHeight: 1.35 }}>{item.headline}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: severityColor[item.severity] }} />
                <span style={{ fontSize: 10, color: severityColor[item.severity], fontWeight: 700, textTransform: 'capitalize' }}>{item.severity}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {React.createElement(window.lucide.User, { size: 13, color: t.primary })}
              </div>
              <p style={{ fontSize: 12.5, color: t.textSecondary, lineHeight: 1.55 }}>{item.impact}</p>
            </div>
          </div>
        ))}

        <div style={{ background: t.surfaceAlt, borderRadius: 18, padding: 16, border: `1px solid ${t.divider}`, marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {React.createElement(window.lucide.Info, { size: 14, color: t.textMuted })}
            <span style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 }}>About Impact Lens</span>
          </div>
          <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.55 }}>
            Signal Brief rewrites news stories into plain-language consequences for your selected life role using context from your calendar, location, and priorities.
          </p>
        </div>
      </div>
    </div>
  );
}

const pulseItems = [
  { zone: 'Your Block', items: ['Water main repair: Oak & 18th — expect noise 7–10 AM', 'Nextdoor alert: bike theft reported near Dolores Park'], color: '#8B5CF6' },
  { zone: 'Mission District', items: ['Carnaval setup: Valencia 16th–24th closed Fri midnight', '3 new businesses opened this month on 24th St corridor'], color: '#0EA5E9' },
  { zone: 'Civic Center', items: ['BART signal disruption affecting all downtown stations', 'City Hall public hearing: housing density vote at 6 PM'], color: '#F59E0B' },
  { zone: 'Weather Layer', items: ['Storm front arrives 7 PM — 0.8" rain, winds to 45 mph', 'Flood risk: low-lying areas near Caltrain corridor'], color: '#10B981' },
];

function PulseScreen({ t }) {
  const [activeZone, setActiveZone] = useState(0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px 12px', background: t.bg }}>
        <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Neighborhood Pulse</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Your local radar</h1>
      </div>

      <div style={{
        margin: '0 20px 16px',
        borderRadius: 24,
        overflow: 'hidden',
        height: 200,
        background: t.mapBg,
        position: 'relative',
        border: `1px solid ${t.cardBorder}`,
        flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 17}%`, height: 1, background: t.textMuted }} />
          ))}
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 14}%`, width: 1, background: t.textMuted }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 28, left: '42%', width: 14, height: 14, borderRadius: '50%', background: t.primary, boxShadow: `0 0 0 8px ${t.primaryGlow}`, zIndex: 2 }}>
          <div style={{ position: 'absolute', top: -20, left: -20, width: 54, height: 54, borderRadius: '50%', border: `1.5px solid ${t.primary}`, opacity: 0.3 }} />
        </div>
        {[
          { x: '28%', y: '30%', color: '#8B5CF6', label: 'Roadwork' },
          { x: '60%', y: '50%', color: '#EF4444', label: 'BART' },
          { x: '72%', y: '22%', color: '#F59E0B', label: 'Storm' },
          { x: '18%', y: '60%', color: '#10B981', label: 'Festival' },
        ].map((pin, i) => (
          <div key={i} style={{ position: 'absolute', left: pin.x, top: pin.y, zIndex: 2 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: pin.color, boxShadow: `0 0 0 3px ${pin.color}30` }} />
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ background: 'rgba(0,0,0,0.55)', borderRadius: 10, padding: '4px 10px' }}>
            <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>SF Mission / Civic Center</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.55)', borderRadius: 10, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            {React.createElement(window.lucide.Navigation, { size: 11, color: t.primary })}
            <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>Live</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 8px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {pulseItems.map((zone, i) => (
          <button key={i} onClick={() => setActiveZone(i)} style={{
            flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: activeZone === i ? zone.color : t.pill,
            color: activeZone === i ? '#fff' : t.pillText,
            fontSize: 11, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'all 0.2s',
          }}>{zone.zone}</button>
        ))}
      </div>

      <div style={{ padding: '12px 20px 20px' }}>
        {pulseItems[activeZone].items.map((item, i) => (
          <div key={i} style={{
            background: t.card, borderRadius: 16, padding: '12px 14px', marginBottom: 8,
            border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: pulseItems[activeZone].color, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: t.text, lineHeight: 1.4, fontWeight: 500 }}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const alertsData = [
  { id: 1, title: 'BART Southbound Delayed', body: 'Signal issue near Civic Center. Your 6:22 PM train running 25 min late.', time: '6 min ago', icon: 'Train', color: '#EF4444', priority: true },
  { id: 2, title: 'Storm Advisory Issued', body: '0.8" rain expected by 7 PM. Evening plans may be affected.', time: '18 min ago', icon: 'CloudRain', color: '#F59E0B', priority: true },
  { id: 3, title: 'Rent Control Bill Advances', body: 'AB 1420 heads to Assembly vote. Affects your Renter profile.', time: '1 hr ago', icon: 'FileText', color: '#10B981', priority: false },
  { id: 4, title: 'Carnaval Festival Setup', body: 'Valencia St closed Fri midnight through Sunday. Affects your saved route.', time: '2 hrs ago', icon: 'Store', color: '#8B5CF6', priority: false },
];

function AlertsScreen({ t, notifToggle, setNotifToggle }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px 12px', background: t.bg }}>
        <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Smart Alerts</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>Context-based alerts</h1>
        <p style={{ fontSize: 13, color: t.textSecondary }}>Only notified when it actually matters to you.</p>
      </div>

      <div style={{ padding: '4px 20px 16px' }}>
        <div style={{ background: t.card, borderRadius: 20, padding: '6px 4px', border: `1px solid ${t.cardBorder}`, marginBottom: 16 }}>
          {[
            { key: 'transit', label: 'Transit alerts', icon: 'Train' },
            { key: 'weather', label: 'Weather advisories', icon: 'CloudRain' },
            { key: 'civic', label: 'Civic & local news', icon: 'Building2' },
            { key: 'finance', label: 'Finance & policy', icon: 'TrendingUp' },
          ].map(({ key, label, icon }, i, arr) => (
            <div key={key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 14px', borderBottom: i < arr.length - 1 ? `1px solid ${t.divider}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {React.createElement(window.lucide[icon] || window.lucide.Circle, { size: 15, color: notifToggle[key] ? t.primary : t.textMuted })}
                <span style={{ fontSize: 13, fontWeight: 500, color: notifToggle[key] ? t.text : t.textMuted }}>{label}</span>
              </div>
              <div
                onClick={() => setNotifToggle(prev => ({ ...prev, [key]: !prev[key] }))}
                style={{
                  width: 42, height: 24, borderRadius: 12, cursor: 'pointer',
                  background: notifToggle[key] ? t.primary : t.pill,
                  position: 'relative', transition: 'background 0.2s',
                }}>
                <div style={{
                  position: 'absolute', top: 3, left: notifToggle[key] ? 20 : 3,
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Recent Alerts</p>
        {alertsData.map(alert => (
          <div key={alert.id} style={{
            background: t.card, borderRadius: 18, padding: '13px 15px', marginBottom: 8,
            border: `1px solid ${alert.priority ? `${alert.color}40` : t.cardBorder}`,
            boxShadow: alert.priority ? `0 2px 12px ${alert.color}18` : `0 2px 8px ${t.shadow}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `${alert.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide[alert.icon] || window.lucide.Bell, { size: 16, color: alert.color })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{alert.title}</p>
                  {alert.priority && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: alert.color, padding: '2px 7px', borderRadius: 8 }}>NOW</span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.45, marginBottom: 4 }}>{alert.body}</p>
                <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 500 }}>{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen({ t, themeKey, toggleTheme }) {
  const [pressed, setPressed] = useState(null);

  const rows = [
    { section: 'Profile', items: [
      { icon: 'User', label: 'Edit profile & roles', sub: 'Commuter · Renter · Freelancer' },
      { icon: 'MapPin', label: 'Saved locations', sub: 'Home, Work, Mission District' },
      { icon: 'CalendarDays', label: 'Calendar integration', sub: 'Google Calendar connected' },
    ]},
    { section: 'Preferences', items: [
      { icon: 'Clock', label: 'Brief length default', sub: '2 min (Quick)' },
      { icon: 'Globe', label: 'Coverage areas', sub: 'SF Bay Area · National' },
      { icon: 'Languages', label: 'Language', sub: 'English' },
    ]},
    { section: 'Account', items: [
      { icon: 'Shield', label: 'Privacy settings', sub: 'Location: Only when in use' },
      { icon: 'HelpCircle', label: 'Help & feedback', sub: '' },
      { icon: 'LogOut', label: 'Sign out', sub: '', danger: true },
    ]},
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 20px', background: t.bg }}>
        <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Settings</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Preferences</h1>
      </div>

      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ background: t.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.cardBorder}`, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {React.createElement(themeKey === 'light' ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: t.primary })}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Appearance</p>
                <p style={{ fontSize: 11, color: t.textMuted }}>{themeKey === 'light' ? 'Light mode' : 'Dark mode'}</p>
              </div>
            </div>
            <div
              onClick={toggleTheme}
              style={{
                width: 52, height: 28, borderRadius: 14, cursor: 'pointer',
                background: themeKey === 'dark' ? t.primary : t.pill,
                position: 'relative', transition: 'background 0.25s',
              }}>
              <div style={{
                position: 'absolute', top: 4, left: themeKey === 'dark' ? 26 : 4,
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }} />
            </div>
          </div>
        </div>

        {rows.map(({ section, items }) => (
          <div key={section} style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, paddingLeft: 4 }}>{section}</p>
            <div style={{ background: t.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.cardBorder}` }}>
              {items.map((item, i) => (
                <div
                  key={item.label}
                  onMouseDown={() => setPressed(item.label)}
                  onMouseUp={() => setPressed(null)}
                  onMouseLeave={() => setPressed(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                    borderBottom: i < items.length - 1 ? `1px solid ${t.divider}` : 'none',
                    background: pressed === item.label ? t.surfaceAlt : 'transparent',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: item.danger ? t.dangerLight : t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(window.lucide[item.icon] || window.lucide.Circle, { size: 15, color: item.danger ? t.danger : t.primary })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: item.danger ? t.danger : t.text }}>{item.label}</p>
                    {item.sub ? <p style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{item.sub}</p> : null}
                  </div>
                  {!item.danger && React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
          <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>Signal Brief v2.4.1 · Powered by context-aware AI</p>
        </div>
      </div>
    </div>
  );
}
