const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F4F8',
    phoneBg: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceAlt: '#F4F7FB',
    surfaceBorder: '#E2E8F0',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    primary: '#6C3BFF',
    primaryLight: '#EDE9FF',
    primaryDark: '#4F1FE8',
    accent: '#FF6B2C',
    accentLight: '#FFF0EA',
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    navBg: '#FFFFFF',
    navBorder: '#E2E8F0',
    statusBar: '#0F172A',
    cardShadow: '0 2px 12px rgba(0,0,0,0.08)',
    gradient: 'linear-gradient(135deg, #6C3BFF 0%, #9B6BFF 100%)',
    gradientAccent: 'linear-gradient(135deg, #FF6B2C 0%, #FF9A6C 100%)',
  },
  dark: {
    bg: '#0A0E1A',
    phoneBg: '#0F1629',
    surface: '#1A2035',
    surfaceAlt: '#141828',
    surfaceBorder: '#2A3350',
    text: '#E8EEFF',
    textSecondary: '#8892B0',
    textMuted: '#4A5568',
    primary: '#7C52FF',
    primaryLight: '#1E1840',
    primaryDark: '#9B6BFF',
    accent: '#FF7A40',
    accentLight: '#2A1A10',
    success: '#10B981',
    successLight: '#0A2A1E',
    warning: '#F59E0B',
    warningLight: '#2A1E06',
    danger: '#EF4444',
    dangerLight: '#2A0E0E',
    navBg: '#131928',
    navBorder: '#1E2D4A',
    statusBar: '#E8EEFF',
    cardShadow: '0 2px 16px rgba(0,0,0,0.4)',
    gradient: 'linear-gradient(135deg, #7C52FF 0%, #B488FF 100%)',
    gradientAccent: 'linear-gradient(135deg, #FF7A40 0%, #FFB088 100%)',
  }
};

function App() {
  const [theme, setTheme] = useState('light');
  const [tab, setTab] = useState('home');
  const [activeScenario, setActiveScenario] = useState(null);
  const [gamePhase, setGamePhase] = useState('idle'); // idle | planning | consequence | reflection
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [cityStats, setCityStats] = useState({ traffic: 72, power: 55, safety: 88, morale: 64 });
  const [missionsDone, setMissionsDone] = useState([0]);
  const [replayIdx, setReplayIdx] = useState(0);
  const [notif, setNotif] = useState(null);

  const t = themes[theme];

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`;

  const showNotif = (msg, color) => {
    setNotif({ msg, color });
    setTimeout(() => setNotif(null), 2200);
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 180);
  };

  const scenarios = [
    {
      id: 1,
      title: 'Subway Surge',
      type: 'URGENT',
      typeColor: t.danger,
      typeBg: t.dangerLight,
      desc: 'Line 4 is down. 12,000 commuters need rerouting. Buses are at capacity and ambulances are stuck in grid-lock.',
      time: '4 min',
      difficulty: 3,
      icon: '🚇',
      impacts: { traffic: -18, power: -5, safety: -22, morale: -14 },
      choices: [
        { id: 'a', label: 'Deploy emergency buses on alternate routes', risk: 'Low', effect: 'Reduces traffic pressure but delays power grid maintenance.', statChange: { traffic: +12, power: -8, safety: +6, morale: +10 } },
        { id: 'b', label: 'Open contraflow lanes for ambulances only', risk: 'Medium', effect: 'Clears safety routes fast but spikes civilian frustration.', statChange: { traffic: -4, power: 0, safety: +18, morale: -8 } },
        { id: 'c', label: 'Activate park-and-ride overflow hubs', risk: 'Low', effect: 'Gradual relief with long-term morale boost.', statChange: { traffic: +8, power: -2, safety: +4, morale: +16 } },
      ]
    },
    {
      id: 2,
      title: 'Flood Barrier Crisis',
      type: 'CRITICAL',
      typeColor: t.accent,
      typeBg: t.accentLight,
      desc: 'Storm surge detected in Sector 7. Flood barriers need 40% extra power — but that risks a brownout in the hospital district.',
      time: '3 min',
      difficulty: 4,
      icon: '🌊',
      impacts: { traffic: -6, power: -30, safety: -18, morale: -20 },
      choices: [
        { id: 'a', label: 'Divert hospital power to flood barriers', risk: 'High', effect: 'Flood controlled but hospital backup systems strain.', statChange: { traffic: 0, power: -22, safety: +10, morale: -12 } },
        { id: 'b', label: 'Partial barriers + rolling hospital blackout', risk: 'Medium', effect: 'Balanced response — neither system fails completely.', statChange: { traffic: +2, power: -12, safety: +4, morale: +2 } },
        { id: 'c', label: 'Evacuate low-lying zones first', risk: 'Low', effect: 'Safe but slow — morale surges as citizens feel protected.', statChange: { traffic: -10, power: -4, safety: +14, morale: +18 } },
      ]
    },
    {
      id: 3,
      title: 'Power Grid Overload',
      type: 'WARNING',
      typeColor: t.warning,
      typeBg: t.warningLight,
      desc: 'Heatwave pushes grid to 98% capacity. Industrial zone or residential — one sector must accept rolling blackouts.',
      time: '5 min',
      difficulty: 2,
      icon: '⚡',
      impacts: { traffic: -2, power: -35, safety: -8, morale: -18 },
      choices: [
        { id: 'a', label: 'Cut industrial power during peak hours', risk: 'Medium', effect: 'Factories lose shifts but homes stay cool and safe.', statChange: { traffic: 0, power: +28, safety: +6, morale: +14 } },
        { id: 'b', label: 'Rotating residential blackouts (2hr blocks)', risk: 'Low', effect: 'Industry keeps running; citizens manage with notice.', statChange: { traffic: -2, power: +20, safety: -4, morale: -6 } },
        { id: 'c', label: 'Emergency import from grid neighbor', risk: 'High', effect: 'Immediate fix but creates debt dependency next cycle.', statChange: { traffic: +2, power: +32, safety: +4, morale: +8 } },
      ]
    },
  ];

  const replayHistory = [
    { round: 1, scenario: 'Subway Surge', choice: 'Deploy emergency buses', outcome: 'Traffic eased +12 but power dipped -8. Morale surged as commuters felt supported.', score: 74, insight: 'Prioritizing citizen movement over infrastructure maintenance paid off short-term. Watch power reserves next round.' },
    { round: 2, scenario: 'Flood Barrier Crisis', choice: 'Partial barriers + rolling blackout', outcome: 'Balanced response kept all systems operational. No single system failed.', score: 81, insight: 'Medium-risk choices often outperform extremes. You avoided cascading failure by not over-committing resources.' },
    { round: 3, scenario: 'Power Grid Overload', choice: 'Cut industrial power', outcome: 'Residential morale peaked +14. Industrial output fell but recovered by next shift.', score: 88, insight: 'Social stability has compounding value. High morale reduces demand on emergency services in future rounds.' },
  ];

  const renderStatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px 6px', color: t.statusBar, fontSize: 12, fontWeight: 600 }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={t.statusBar}>
          <path d="M0 4h2v8H0zM3 2h2v10H3zM6 0h2v12H6zM9 1h2v11H9zM12 3h2v9h-2z" opacity="0.3"/>
          <path d="M0 4h2v8H0zM3 2h2v10H3zM6 0h2v12H6z"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke={t.statusBar} strokeWidth="2">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/>
          <circle cx="12" cy="20" r="1" fill={t.statusBar}/>
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke={t.statusBar} strokeOpacity="0.5"/>
          <rect x="2" y="2" width="16" height="9" rx="1.5" fill={t.statusBar}/>
          <path d="M24 4.5v4a2 2 0 0 0 0-4z" fill={t.statusBar} opacity="0.4"/>
        </svg>
      </div>
    </div>
  );

  const StatBar = ({ label, value, color, icon }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: t.textSecondary, fontWeight: 500 }}>
        <span>{icon} {label}</span>
        <span style={{ color: t.text, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ background: t.surfaceBorder, borderRadius: 8, height: 7, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', borderRadius: 8, background: color, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );

  const renderHome = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.phoneBg }}>
      {renderStatusBar()}
      <div style={{ padding: '6px 20px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>Grid Tactix</div>
            <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>Commander Maya Chen</div>
          </div>
          <div style={{ background: t.gradient, borderRadius: 12, padding: '6px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Lv.7</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>STRATEGIST</div>
          </div>
        </div>

        {/* City Health Card */}
        <div style={{ background: t.gradient, borderRadius: 20, padding: '18px 20px', marginBottom: 18, boxShadow: '0 8px 24px rgba(108,59,255,0.3)' }}>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>City Health</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            {[
              { label: 'Traffic', val: cityStats.traffic, icon: '🚦' },
              { label: 'Power', val: cityStats.power, icon: '⚡' },
              { label: 'Safety', val: cityStats.safety, icon: '🛡' },
              { label: 'Morale', val: cityStats.morale, icon: '😊' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, height: 6, overflow: 'hidden' }}>
            <div style={{ width: `${Math.round((cityStats.traffic + cityStats.power + cityStats.safety + cityStats.morale) / 4)}%`, height: '100%', background: '#fff', borderRadius: 8 }} />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 6, textAlign: 'right' }}>Overall Score: {Math.round((cityStats.traffic + cityStats.power + cityStats.safety + cityStats.morale) / 4)}%</div>
        </div>

        {/* Daily Streak */}
        <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 18, boxShadow: t.cardShadow, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ background: t.accentLight, borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔥</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>5-Day Streak</div>
            <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>Play today to keep your streak!</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 6, background: i < 5 ? t.accent : t.surfaceBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: i < 5 ? '#fff' : t.textMuted }}>{d}</div>
            ))}
          </div>
        </div>

        {/* Today's Missions */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 }}>Today's Missions</div>
          {scenarios.map((s, i) => (
            <div key={s.id}
              onClick={() => { handlePress(`mission-${s.id}`); setActiveScenario(s); setSelectedChoice(null); setShowConsequence(false); setTab('play'); }}
              style={{
                background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
                boxShadow: t.cardShadow, cursor: 'pointer',
                transform: pressedBtn === `mission-${s.id}` ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                opacity: missionsDone.includes(s.id) ? 0.55 : 1,
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 28, lineHeight: 1 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{s.title}</span>
                    <span style={{ background: s.typeBg, color: s.typeColor, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 6, letterSpacing: 0.5 }}>{s.type}</span>
                    {missionsDone.includes(s.id) && <span style={{ background: t.successLight, color: t.success, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>DONE</span>}
                  </div>
                  <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.4 }}>{s.desc.substring(0, 72)}...</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.surfaceBorder}` }}>
                <span style={{ fontSize: 11, color: t.textMuted }}>⏱ {s.time}</span>
                <span style={{ fontSize: 11, color: t.textMuted }}>{'★'.repeat(s.difficulty)}{'☆'.repeat(5 - s.difficulty)}</span>
                <span style={{ fontSize: 11, color: t.primary, fontWeight: 600, marginLeft: 'auto' }}>Tap to play →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', boxShadow: t.cardShadow }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>This Week's Progress</div>
          {[
            { label: 'Missions Completed', val: '11 / 14', pct: 79 },
            { label: 'Avg Decision Score', val: '81/100', pct: 81 },
            { label: 'XP Earned', val: '1,240 pts', pct: 62 },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.textSecondary, marginBottom: 4 }}>
                <span>{item.label}</span><span style={{ fontWeight: 700, color: t.text }}>{item.val}</span>
              </div>
              <div style={{ background: t.surfaceBorder, borderRadius: 6, height: 5 }}>
                <div style={{ width: `${item.pct}%`, height: '100%', borderRadius: 6, background: t.gradient }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlay = () => {
    const sc = activeScenario || scenarios[0];

    if (showConsequence && selectedChoice) {
      const choice = sc.choices.find(c => c.id === selectedChoice);
      const updatedStats = {
        traffic: Math.min(100, Math.max(0, cityStats.traffic + choice.statChange.traffic)),
        power: Math.min(100, Math.max(0, cityStats.power + choice.statChange.power)),
        safety: Math.min(100, Math.max(0, cityStats.safety + choice.statChange.safety)),
        morale: Math.min(100, Math.max(0, cityStats.morale + choice.statChange.morale)),
      };
      return (
        <div style={{ flex: 1, overflowY: 'auto', background: t.phoneBg }}>
          {renderStatusBar()}
          <div style={{ padding: '8px 20px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📊</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Consequences</div>
              <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>Here's how your decision rippled through the city</div>
            </div>

            <div style={{ background: t.primaryLight, border: `1px solid ${t.primary}22`, borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.primary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your Choice</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{choice.label}</div>
              <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 6, lineHeight: 1.5 }}>{choice.effect}</div>
            </div>

            <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 16, boxShadow: t.cardShadow }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>City Impact</div>
              {[
                { label: 'Traffic', key: 'traffic', icon: '🚦', color: '#3B82F6' },
                { label: 'Power', key: 'power', icon: '⚡', color: t.warning },
                { label: 'Safety', key: 'safety', icon: '🛡', color: t.success },
                { label: 'Morale', key: 'morale', icon: '😊', color: t.accent },
              ].map(stat => {
                const delta = choice.statChange[stat.key];
                return (
                  <div key={stat.key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 16, width: 24 }}>{stat.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: t.textSecondary }}>{stat.label}</span>
                        <span style={{ fontWeight: 700, color: delta >= 0 ? t.success : t.danger }}>
                          {delta >= 0 ? '+' : ''}{delta}
                        </span>
                      </div>
                      <div style={{ background: t.surfaceBorder, borderRadius: 6, height: 6 }}>
                        <div style={{ width: `${updatedStats[stat.key]}%`, height: '100%', borderRadius: 6, background: stat.color, transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: t.successLight, border: `1px solid ${t.success}30`, borderRadius: 16, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.success, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Insight</div>
              <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>This decision mirrors how real-world logistics teams balance immediate relief against long-term resource reserves. Medium-risk choices often prevent cascading failures.</div>
            </div>

            <button
              onClick={() => {
                setCityStats(updatedStats);
                setMissionsDone(prev => [...prev, sc.id]);
                setShowConsequence(false);
                setActiveScenario(null);
                showNotif('Mission complete! +120 XP', t.success);
                setTab('home');
              }}
              style={{ width: '100%', padding: '15px', background: t.gradient, color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(108,59,255,0.35)' }}>
              Complete Mission +120 XP
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.phoneBg }}>
        {renderStatusBar()}
        <div style={{ padding: '8px 20px 24px' }}>
          {/* Scenario Header */}
          <div style={{ background: t.gradient, borderRadius: 20, padding: '16px 18px', marginBottom: 16, boxShadow: '0 6px 20px rgba(108,59,255,0.28)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}>{sc.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{sc.title}</div>
                  <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>{sc.type}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Time limit</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{sc.time}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{sc.desc}</div>
          </div>

          {/* Crisis Impacts */}
          <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '12px 16px', marginBottom: 16, boxShadow: t.cardShadow }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Active Crisis Impact</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Traffic', val: sc.impacts.traffic, icon: '🚦' },
                { label: 'Power', val: sc.impacts.power, icon: '⚡' },
                { label: 'Safety', val: sc.impacts.safety, icon: '🛡' },
                { label: 'Morale', val: sc.impacts.morale, icon: '😊' },
              ].map(s => (
                <div key={s.label} style={{ background: t.surfaceAlt, borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: t.textMuted }}>{s.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.danger }}>{s.val}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decision choices */}
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 }}>Choose Your Action</div>
          {sc.choices.map(choice => (
            <div key={choice.id}
              onClick={() => { handlePress(`choice-${choice.id}`); setSelectedChoice(choice.id); }}
              style={{
                background: selectedChoice === choice.id ? t.primaryLight : t.surface,
                border: `2px solid ${selectedChoice === choice.id ? t.primary : t.surfaceBorder}`,
                borderRadius: 14, padding: '13px 14px', marginBottom: 10, cursor: 'pointer',
                transform: pressedBtn === `choice-${choice.id}` ? 'scale(0.97)' : 'scale(1)',
                transition: 'all 0.15s ease',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text, flex: 1, paddingRight: 8 }}>{choice.label}</div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap',
                  background: choice.risk === 'Low' ? t.successLight : choice.risk === 'Medium' ? t.warningLight : t.dangerLight,
                  color: choice.risk === 'Low' ? t.success : choice.risk === 'Medium' ? t.warning : t.danger,
                }}>{choice.risk} Risk</span>
              </div>
              <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.4 }}>{choice.effect}</div>
              {selectedChoice === choice.id && (
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {Object.entries(choice.statChange).map(([k, v]) => (
                    <span key={k} style={{ fontSize: 10, fontWeight: 700, background: v >= 0 ? t.successLight : t.dangerLight, color: v >= 0 ? t.success : t.danger, padding: '2px 7px', borderRadius: 6 }}>
                      {k}: {v >= 0 ? '+' : ''}{v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {selectedChoice && (
            <button
              onClick={() => { handlePress('confirm'); setShowConsequence(true); }}
              style={{
                width: '100%', padding: '15px', background: t.gradient, color: '#fff', border: 'none',
                borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 6,
                boxShadow: '0 4px 16px rgba(108,59,255,0.35)',
                transform: pressedBtn === 'confirm' ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.15s ease',
              }}>
              Confirm Decision →
            </button>
          )}

          {!activeScenario && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: t.textMuted }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🎮</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Select a mission from Home</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMap = () => {
    const gridItems = [
      { x: 0, y: 0, type: 'power', label: 'Power Grid', status: 'warning', color: t.warning, icon: '⚡' },
      { x: 1, y: 0, type: 'hospital', label: 'Hospital', status: 'ok', color: t.success, icon: '🏥' },
      { x: 2, y: 0, type: 'fire', label: 'Fire Dept', status: 'ok', color: t.success, icon: '🚒' },
      { x: 0, y: 1, type: 'traffic', label: 'Traffic Hub', status: 'critical', color: t.danger, icon: '🚦' },
      { x: 1, y: 1, type: 'city', label: 'City Hall', status: 'ok', color: t.primary, icon: '🏛' },
      { x: 2, y: 1, type: 'flood', label: 'Flood Gate', status: 'warning', color: t.accent, icon: '🌊' },
      { x: 0, y: 2, type: 'park', label: 'Park', status: 'ok', color: t.success, icon: '🌳' },
      { x: 1, y: 2, type: 'subway', label: 'Subway', status: 'critical', color: t.danger, icon: '🚇' },
      { x: 2, y: 2, type: 'shelter', label: 'Shelter', status: 'ok', color: '#3B82F6', icon: '🏠' },
    ];

    const dependencies = [
      { from: [1,1], to: [0,0], label: 'Powers' },
      { from: [1,1], to: [0,1], label: 'Controls' },
      { from: [0,0], to: [1,0], label: 'Feeds' },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.phoneBg }}>
        {renderStatusBar()}
        <div style={{ padding: '8px 20px 24px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 4 }}>Priority Map</div>
          <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 16 }}>Track competing city goals. Red = critical. Yellow = at risk.</div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            {[['ok', t.success, 'Stable'], ['warning', t.warning, 'At Risk'], ['critical', t.danger, 'Critical']].map(([s, c, l]) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: t.textSecondary }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                {l}
              </div>
            ))}
          </div>

          {/* City Grid */}
          <div style={{ background: t.surfaceAlt, borderRadius: 20, padding: 12, marginBottom: 18, border: `1px solid ${t.surfaceBorder}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {gridItems.map((item, i) => (
                <div key={i}
                  onClick={() => handlePress(`grid-${i}`)}
                  style={{
                    background: t.surface, borderRadius: 12, padding: '10px 8px', textAlign: 'center',
                    border: `2px solid ${item.color}44`,
                    boxShadow: item.status === 'critical' ? `0 0 12px ${item.color}55` : t.cardShadow,
                    cursor: 'pointer',
                    transform: pressedBtn === `grid-${i}` ? 'scale(0.93)' : 'scale(1)',
                    transition: 'transform 0.12s ease',
                  }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: t.textSecondary, marginBottom: 4, lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, margin: '0 auto' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Active Dependencies */}
          <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 16, boxShadow: t.cardShadow }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Hidden Dependencies</div>
            {[
              { from: '🏛 City Hall', to: '⚡ Power Grid', type: 'Controls budget allocation' },
              { from: '⚡ Power Grid', to: '🏥 Hospital', type: 'Emergency supply line' },
              { from: '🚦 Traffic Hub', to: '🚒 Fire Dept', type: 'Response route access' },
              { from: '🌊 Flood Gate', to: '🚇 Subway', type: 'Water table pressure' },
            ].map((dep, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingBottom: 8, borderBottom: i < 3 ? `1px solid ${t.surfaceBorder}` : 'none' }}>
                <span style={{ fontSize: 12, color: t.text, fontWeight: 500, flex: 1 }}>{dep.from}</span>
                <span style={{ fontSize: 10, color: t.primary, fontWeight: 600 }}>→</span>
                <span style={{ fontSize: 12, color: t.text, fontWeight: 500, flex: 1, textAlign: 'right' }}>{dep.to}</span>
                <div style={{ fontSize: 10, color: t.textMuted, position: 'absolute', display: 'none' }}>{dep.type}</div>
              </div>
            ))}
          </div>

          {/* Critical Alerts */}
          {[
            { title: 'Traffic Hub overloaded', detail: 'Response time +340% above normal. 3 downstream systems affected.', color: t.danger, bg: t.dangerLight },
            { title: 'Subway offline — Line 4', detail: 'Estimated restore: 2.5hrs. Redirect pressure on bus grid imminent.', color: t.danger, bg: t.dangerLight },
            { title: 'Power Grid at 98% capacity', detail: 'Heatwave demand spike. Recommend load-shedding within 45 min.', color: t.warning, bg: t.warningLight },
          ].map((alert, i) => (
            <div key={i} style={{ background: alert.bg, border: `1px solid ${alert.color}30`, borderRadius: 12, padding: '11px 13px', marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: alert.color, marginBottom: 3 }}>{alert.title}</div>
              <div style={{ fontSize: 11, color: t.textSecondary, lineHeight: 1.4 }}>{alert.detail}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReplay = () => {
    const replay = replayHistory[replayIdx];
    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.phoneBg }}>
        {renderStatusBar()}
        <div style={{ padding: '8px 20px 24px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 4 }}>Reflection Replay</div>
          <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 16 }}>Understand what worked and why. Build real decision-making skills.</div>

          {/* Round Selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {replayHistory.map((r, i) => (
              <button key={i} onClick={() => setReplayIdx(i)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${replayIdx === i ? t.primary : t.surfaceBorder}`, background: replayIdx === i ? t.primaryLight : t.surface, color: replayIdx === i ? t.primary : t.textSecondary, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                Round {r.round}
              </button>
            ))}
          </div>

          {/* Scenario Summary */}
          <div style={{ background: t.gradient, borderRadius: 20, padding: '16px 18px', marginBottom: 16, boxShadow: '0 6px 20px rgba(108,59,255,0.25)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Round {replay.round} — {replay.scenario}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Score: {replay.score}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 6, height: 6 }}>
                <div style={{ width: `${replay.score}%`, height: '100%', background: '#fff', borderRadius: 6 }} />
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{replay.score >= 80 ? 'Excellent' : replay.score >= 60 ? 'Good' : 'Needs Work'}</span>
            </div>
          </div>

          {/* Decision taken */}
          <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14, boxShadow: t.cardShadow }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Decision Made</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{replay.choice}</div>
          </div>

          {/* Outcome */}
          <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14, boxShadow: t.cardShadow }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>City Outcome</div>
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{replay.outcome}</div>
          </div>

          {/* Insight */}
          <div style={{ background: t.accentLight, border: `1px solid ${t.accent}30`, borderRadius: 16, padding: '14px 16px', marginBottom: 18 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Strategic Insight</div>
                <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{replay.insight}</div>
              </div>
            </div>
          </div>

          {/* Real-world connection */}
          <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', boxShadow: t.cardShadow }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Real-World Connection</div>
            <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
              This scenario mirrors <strong style={{ color: t.text }}>project management under competing deadlines</strong>. The same principle applies when juggling urgent client requests, team capacity, and long-term planning at work or home.
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              {['Work Planning', 'Team Logistics', 'Family Priorities'].map(tag => (
                <span key={tag} style={{ background: t.primaryLight, color: t.primary, fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.phoneBg }}>
      {renderStatusBar()}
      <div style={{ padding: '8px 20px 24px' }}>
        {/* Profile */}
        <div style={{ background: t.gradient, borderRadius: 20, padding: '20px', marginBottom: 20, boxShadow: '0 6px 20px rgba(108,59,255,0.25)', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🏙</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Maya Chen</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Level 7 Strategist · 1,240 XP</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14 }}>
            {[['14', 'Missions'], ['5', 'Day Streak'], ['81', 'Avg Score']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{v}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14, boxShadow: t.cardShadow }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Appearance</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{theme === 'light' ? '☀️' : '🌙'}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</div>
                <div style={{ fontSize: 11, color: t.textSecondary }}>Tap to toggle theme</div>
              </div>
            </div>
            <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{ width: 48, height: 26, borderRadius: 13, background: theme === 'dark' ? t.primary : t.surfaceBorder, cursor: 'pointer', position: 'relative', transition: 'background 0.3s ease' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: theme === 'dark' ? 25 : 3, transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14, boxShadow: t.cardShadow }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Difficulty</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Cadet', 'Manager', 'Director'].map((d, i) => (
              <button key={d} onClick={() => handlePress(`diff-${i}`)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${i === 1 ? t.primary : t.surfaceBorder}`, background: i === 1 ? t.primaryLight : t.surface, color: i === 1 ? t.primary : t.textSecondary, fontSize: 11, fontWeight: 700, cursor: 'pointer', transform: pressedBtn === `diff-${i}` ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s' }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14, boxShadow: t.cardShadow }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Achievements</div>
          {[
            { icon: '🏅', name: 'First Responder', desc: 'Complete 5 Safety missions', done: true },
            { icon: '⚡', name: 'Grid Master', desc: 'Keep power above 80% for 3 sessions', done: true },
            { icon: '🧠', name: 'Deep Planner', desc: 'Score 90+ on 3 consecutive missions', done: false },
            { icon: '🌊', name: 'Flood Commander', desc: 'Solve all flood scenarios on Hard', done: false },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, opacity: a.done ? 1 : 0.55 }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{a.name}</div>
                <div style={{ fontSize: 11, color: t.textSecondary }}>{a.desc}</div>
              </div>
              {a.done && <span style={{ fontSize: 10, fontWeight: 700, background: t.successLight, color: t.success, padding: '2px 8px', borderRadius: 6 }}>EARNED</span>}
            </div>
          ))}
        </div>

        {/* Settings options */}
        <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, overflow: 'hidden', boxShadow: t.cardShadow }}>
          {[
            { icon: '🔔', label: 'Daily Reminders', val: 'On' },
            { icon: '📊', label: 'Performance Stats', val: 'Detailed' },
            { icon: '🌍', label: 'Region', val: 'North City' },
            { icon: 'ℹ️', label: 'Version', val: '1.4.2' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${t.surfaceBorder}` : 'none' }}>
              <span style={{ fontSize: 16, marginRight: 12 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: t.text }}>{item.label}</span>
              <span style={{ fontSize: 12, color: t.textMuted }}>{item.val} ›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏙' },
    { id: 'play', label: 'Play', icon: '🎮' },
    { id: 'map', label: 'Map', icon: '🗺' },
    { id: 'replay', label: 'Replay', icon: '📊' },
    { id: 'settings', label: 'Profile', icon: '👤' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{fontLink}</style>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { display: none; }`}</style>

      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: t.phoneBg, borderRadius: 48, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.35)', position: 'relative', display: 'flex', flexDirection: 'column', border: `1px solid ${theme === 'dark' ? '#2A3350' : '#d0d8e8'}` }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Notification Toast */}
        {notif && (
          <div style={{ position: 'absolute', top: 58, left: 20, right: 20, background: notif.color, color: '#fff', padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, zIndex: 200, boxShadow: '0 4px 16px rgba(0,0,0,0.25)', textAlign: 'center', animation: 'none' }}>
            {notif.msg}
          </div>
        )}

        {/* Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 0 }}>
          {tab === 'home' && renderHome()}
          {tab === 'play' && renderPlay()}
          {tab === 'map' && renderMap()}
          {tab === 'replay' && renderReplay()}
          {tab === 'settings' && renderSettings()}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0 24px', flexShrink: 0 }}>
          {navItems.map(item => (
            <button key={item.id}
              onClick={() => { handlePress(`nav-${item.id}`); setTab(item.id); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 12px', borderRadius: 12, transform: pressedBtn === `nav-${item.id}` ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.12s ease' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: tab === item.id ? 700 : 500, color: tab === item.id ? t.primary : t.textMuted }}>{item.label}</span>
              {tab === item.id && <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.primary }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
