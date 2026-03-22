const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F4F2FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F0EEFF',
    surfaceCard: '#FFFFFF',
    border: '#E8E4FF',
    text: '#1A1433',
    textSecondary: '#6B5FA6',
    textMuted: '#9B8EC4',
    primary: '#7C5CFC',
    primaryLight: '#EDE8FF',
    primaryGrad: 'linear-gradient(135deg, #7C5CFC 0%, #A78BFA 100%)',
    accent: '#F97316',
    accentLight: '#FFF0E6',
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    navBg: '#FFFFFF',
    statusBar: '#1A1433',
    shadow: '0 4px 24px rgba(124,92,252,0.10)',
    cardShadow: '0 2px 12px rgba(124,92,252,0.08)',
  },
  dark: {
    bg: '#0F0B1E',
    surface: '#1A1433',
    surfaceAlt: '#231B45',
    surfaceCard: '#1E1638',
    border: '#2D2260',
    text: '#F0EEFF',
    textSecondary: '#B8ABEC',
    textMuted: '#6B5FA6',
    primary: '#9D7FFF',
    primaryLight: '#2D2260',
    primaryGrad: 'linear-gradient(135deg, #9D7FFF 0%, #C4B5FD 100%)',
    accent: '#FB923C',
    accentLight: '#3D2010',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    danger: '#F87171',
    dangerLight: '#450A0A',
    navBg: '#1A1433',
    statusBar: '#F0EEFF',
    shadow: '0 4px 24px rgba(0,0,0,0.4)',
    cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
  }
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const [pressedButton, setPressedButton] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set([0, 2]));
  const [selectedMood, setSelectedMood] = useState(null);
  const [expandedGap, setExpandedGap] = useState(null);
  const [activeCluster, setActiveCluster] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);

  const t = isDark ? themes.dark : themes.light;

  // Inject Google Font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handlePress = (id) => {
    setPressedButton(id);
    setTimeout(() => setPressedButton(null), 150);
  };

  const toggleTask = (idx) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const S = {
    page: { fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh', background: '#e8e4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    phone: { width: 375, height: 812, background: t.bg, borderRadius: 48, overflow: 'hidden', position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', transition: 'background 0.3s' },
    island: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 },
    statusBar: { height: 52, paddingTop: 14, paddingLeft: 20, paddingRight: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
    statusTime: { fontSize: 15, fontWeight: '700', color: t.statusBar, letterSpacing: 0.2 },
    statusIcons: { display: 'flex', gap: 6, alignItems: 'center' },
    content: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 },
    navBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 16, paddingTop: 8, zIndex: 50, transition: 'background 0.3s, border-color 0.3s' },
    navItem: (active) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 12px', borderRadius: 12, background: active ? t.primaryLight : 'transparent', transition: 'all 0.2s' }),
    navLabel: (active) => ({ fontSize: 10, fontWeight: active ? '700' : '500', color: active ? t.primary : t.textMuted, transition: 'color 0.2s' }),
    card: { background: t.surfaceCard, borderRadius: 20, padding: '16px', marginBottom: 12, boxShadow: t.cardShadow, border: `1px solid ${t.border}`, transition: 'all 0.3s' },
    pill: (color, bg) => ({ background: bg, color: color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: '600', display: 'inline-block' }),
    btn: (id) => ({ cursor: 'pointer', transform: pressedButton === id ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s' }),
  };

  // ── TODAY SCREEN ──────────────────────────────────────────────
  const todayTasks = [
    { time: '8:30', label: 'Morning Run', tag: 'Health', tagColor: t.success, tagBg: t.successLight, icon: 'Activity', energy: 'high', done: true },
    { time: '9:15', label: 'Team Standup', tag: 'Work', tagColor: t.primary, tagBg: t.primaryLight, icon: 'Users', energy: 'med', done: false },
    { time: '10:00', label: 'Deep Work: Q2 Report', tag: 'Focus', tagColor: t.accent, tagBg: t.accentLight, icon: 'FileText', energy: 'high', done: true },
    { time: '12:30', label: 'Lunch + Short Walk', tag: 'Reset', tagColor: t.success, tagBg: t.successLight, icon: 'Coffee', energy: 'low', done: false },
    { time: '2:00', label: 'Client Call — Apex Co.', tag: 'Work', tagColor: t.primary, tagBg: t.primaryLight, icon: 'Phone', energy: 'med', done: false },
    { time: '3:45', label: 'Gap: Reply to 3 emails', tag: 'Quick', tagColor: t.warning, tagBg: t.warningLight, icon: 'Mail', energy: 'low', done: false },
    { time: '5:30', label: 'Grocery Run + Pharmacy', tag: 'Errands', tagColor: '#8B5CF6', tagBg: isDark ? '#2D1B69' : '#EDE9FE', icon: 'ShoppingBag', energy: 'low', done: false },
    { time: '7:00', label: 'Dinner + Family Time', tag: 'Life', tagColor: '#EC4899', tagBg: isDark ? '#4A1942' : '#FCE7F3', icon: 'Heart', energy: 'low', done: false },
  ];

  const TodayScreen = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const doneCnt = [...completedTasks].length;
    const pct = Math.round((doneCnt / todayTasks.length) * 100);

    return (
      <div style={{ padding: '0 16px 16px' }}>
        {/* Hero greeting */}
        <div style={{ ...S.card, background: t.primaryGrad, border: 'none', padding: '20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '500', marginBottom: 4 }}>Sunday, March 22</div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: '800', lineHeight: 1.2 }}>Good morning,</div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: '800', lineHeight: 1.2, marginBottom: 12 }}>Jordan! ☀️</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.5 }}>Your day has been reflowed around a 40-min commute delay. 2 tasks rescheduled.</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: '12px 14px', textAlign: 'center', minWidth: 60 }}>
              <div style={{ color: '#fff', fontSize: 26, fontWeight: '800' }}>{pct}%</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '600' }}>DONE</div>
            </div>
          </div>
          <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.25)', borderRadius: 100, height: 6 }}>
            <div style={{ background: '#fff', borderRadius: 100, height: 6, width: `${pct}%`, transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* Reflow alert */}
        {notifVisible && (
          <div style={{ ...S.card, background: t.warningLight, border: `1px solid ${t.warning}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 18 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: '700', color: t.warning }}>Smart Reflow Active</div>
              <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>Client call moved to 2:30pm — commute delay detected on I-95.</div>
            </div>
            <div onClick={() => setNotifVisible(false)} style={{ cursor: 'pointer', color: t.textMuted, fontSize: 16, lineHeight: 1 }}>×</div>
          </div>
        )}

        {/* Mood selector */}
        <div style={{ ...S.card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: '700', color: t.text, marginBottom: 12 }}>How are you feeling?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ e: '😴', l: 'Low' }, { e: '😐', l: 'Okay' }, { e: '😊', l: 'Good' }, { e: '🔥', l: 'Fired up' }, { e: '😓', l: 'Stressed' }].map((m, i) => (
              <div key={i} onClick={() => setSelectedMood(i)} style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 14, background: selectedMood === i ? t.primaryLight : t.surfaceAlt, border: `2px solid ${selectedMood === i ? t.primary : 'transparent'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ fontSize: 20, lineHeight: 1.3 }}>{m.e}</div>
                <div style={{ fontSize: 9, fontWeight: '600', color: selectedMood === i ? t.primary : t.textMuted, marginTop: 2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ fontSize: 13, fontWeight: '700', color: t.text, marginBottom: 10, paddingLeft: 2 }}>Today's Flow</div>
        {todayTasks.map((task, i) => {
          const done = completedTasks.has(i);
          const IconComp = window.lucide[task.icon];
          return (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <div style={{ fontSize: 10, fontWeight: '700', color: t.textMuted, width: 36, textAlign: 'right' }}>{task.time}</div>
                {i < todayTasks.length - 1 && <div style={{ width: 1, height: 28, background: t.border, marginTop: 4 }} />}
              </div>
              <div onClick={() => toggleTask(i)} style={{ flex: 1, ...S.card, marginBottom: 0, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, opacity: done ? 0.6 : 1, cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: done ? t.successLight : task.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {done ? <span style={{ fontSize: 16 }}>✓</span> : (IconComp ? React.createElement(IconComp, { size: 16, color: task.tagColor }) : <span style={{ fontSize: 16 }}>•</span>)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: '600', color: t.text, textDecoration: done ? 'line-through' : 'none' }}>{task.label}</div>
                  <div style={{ marginTop: 4 }}><span style={S.pill(task.tagColor, task.tagBg)}>{task.tag}</span></div>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${done ? t.success : t.border}`, background: done ? t.success : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  {done && <span style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── GAPS SCREEN ───────────────────────────────────────────────
  const gaps = [
    { time: '11:45 AM', duration: '12 min', context: 'Before client call', suggestions: [{ icon: 'Package', label: 'Pack tomorrow\'s gym bag', effort: 'Low', type: 'Prep', color: t.success }, { icon: 'MessageSquare', label: 'Reply to Maya\'s text', effort: 'Quick', type: 'Social', color: '#EC4899' }, { icon: 'Wind', label: 'Reset walk around block', effort: 'Reset', type: 'Health', color: t.primary }] },
    { time: '3:30 PM', duration: '25 min', context: 'Post deep-work slump', suggestions: [{ icon: 'Mail', label: 'Clear 5 inbox emails', effort: 'Low', type: 'Admin', color: t.warning }, { icon: 'ShoppingCart', label: 'Order groceries online', effort: 'Med', type: 'Errand', color: '#8B5CF6' }, { icon: 'Dumbbell', label: '15-min stretch routine', effort: 'Low', type: 'Health', color: t.success }] },
    { time: '5:15 PM', duration: '8 min', context: 'Commute buffer', suggestions: [{ icon: 'Mic', label: 'Voice memo tomorrow\'s priorities', effort: 'Quick', type: 'Planning', color: t.primary }, { icon: 'BookOpen', label: 'Read 2 saved articles', effort: 'Low', type: 'Learn', color: t.accent }] },
    { time: '8:45 PM', duration: '18 min', context: 'Wind-down window', suggestions: [{ icon: 'CheckSquare', label: 'Prep tomorrow\'s outfit', effort: 'Low', type: 'Prep', color: t.success }, { icon: 'Moon', label: '4-7-8 breathing exercise', effort: 'Reset', type: 'Wellness', color: '#8B5CF6' }] },
  ];

  const GapsScreen = () => (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{ paddingTop: 8, marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: '800', color: t.text }}>Gap Finder</div>
        <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>4 pockets found today · 63 min total</div>
      </div>

      <div style={{ ...S.card, background: t.primaryGrad, border: 'none', padding: '16px', marginBottom: 16, display: 'flex', gap: 16 }}>
        {[{ val: '4', label: 'Gaps Found' }, { val: '63m', label: 'Free Time' }, { val: '8', label: 'Tasks Possible' }].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>{s.val}</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: '600', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {gaps.map((gap, i) => {
        const open = expandedGap === i;
        return (
          <div key={i} style={{ ...S.card, marginBottom: 12, padding: 0, overflow: 'hidden' }}>
            <div onClick={() => setExpandedGap(open ? null : i)} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: '800', color: t.primary }}>{gap.duration}</div>
                  <div style={{ fontSize: 9, color: t.textMuted, fontWeight: '600' }}>FREE</div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: '700', color: t.text }}>{gap.time}</div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{gap.context}</div>
              </div>
              <div style={{ fontSize: 18, color: t.textMuted, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</div>
            </div>
            {open && (
              <div style={{ borderTop: `1px solid ${t.border}`, padding: '12px 16px', background: t.surfaceAlt }}>
                <div style={{ fontSize: 11, fontWeight: '700', color: t.textMuted, marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>Best matches for this gap</div>
                {gap.suggestions.map((sg, j) => {
                  const IconComp = window.lucide[sg.icon];
                  return (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: j < gap.suggestions.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {IconComp ? React.createElement(IconComp, { size: 16, color: sg.color }) : <span>•</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{sg.label}</div>
                        <div style={{ marginTop: 3, display: 'flex', gap: 6 }}>
                          <span style={S.pill(sg.color, isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)')}>{sg.type}</span>
                          <span style={S.pill(t.textMuted, t.surfaceAlt)}>{sg.effort} effort</span>
                        </div>
                      </div>
                      <div style={{ width: 30, height: 30, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <span style={{ color: t.primary, fontSize: 14, fontWeight: '700' }}>+</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── ERRANDS SCREEN ─────────────────────────────────────────────
  const clusters = [
    { name: 'North Loop', time: '5:30 PM', duration: '~45 min', stops: 4, fuel: '2.1 mi', errands: [{ icon: '🛒', label: 'Whole Foods', sub: 'Weekly groceries + supplements' }, { icon: '💊', label: 'CVS Pharmacy', sub: 'Prescription pickup' }, { icon: '🧺', label: 'Dry Cleaner', sub: 'Drop off 3 items' }, { icon: '🐾', label: 'Pet Supply Co.', sub: 'Dog food + chew toys' }], color: t.primary },
    { name: 'Downtown Quick', time: '12:00 PM', duration: '~20 min', stops: 2, fuel: '0.8 mi', errands: [{ icon: '✉️', label: 'Post Office', sub: 'Send package to Chicago' }, { icon: '🏦', label: 'Chase Bank', sub: 'Deposit check' }], color: t.accent },
    { name: 'Weekend Batch', time: 'Sat 10 AM', duration: '~90 min', stops: 5, fuel: '4.2 mi', errands: [{ icon: '🔧', label: 'AutoZone', sub: 'Wiper blades replacement' }, { icon: '🌱', label: 'Home Depot', sub: 'Potting soil + herb seeds' }, { icon: '📦', label: 'UPS Store', sub: 'Return Amazon order' }, { icon: '🍞', label: 'Farmer\'s Market', sub: 'Bread + seasonal produce' }, { icon: '🧹', label: 'Target', sub: 'Cleaning supplies run' }], color: '#8B5CF6' },
  ];

  const ErrandsScreen = () => (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{ paddingTop: 8, marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: '800', color: t.text }}>Errand Clusters</div>
        <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>Batched by location · save ~2.3 hrs/week</div>
      </div>

      {/* Map preview placeholder */}
      <div style={{ ...S.card, padding: 0, overflow: 'hidden', marginBottom: 16, height: 160, position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', background: isDark ? 'linear-gradient(135deg, #1E1638 0%, #2D2260 100%)' : 'linear-gradient(135deg, #EDE8FF 0%, #DDD5FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* Fake map grid */}
          {[...Array(6)].map((_, r) => (
            <div key={r} style={{ position: 'absolute', left: 0, right: 0, top: `${r * 26}px`, height: 1, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }} />
          ))}
          {[...Array(8)].map((_, c) => (
            <div key={c} style={{ position: 'absolute', top: 0, bottom: 0, left: `${c * 47}px`, width: 1, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }} />
          ))}
          {/* Route dots */}
          {[[80, 60], [140, 90], [200, 70], [260, 100]].map(([x, y], i) => (
            <div key={i} style={{ position: 'absolute', left: x, top: y, width: 18, height: 18, borderRadius: '50%', background: t.primary, border: `3px solid ${t.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 8, fontWeight: '800' }}>{i + 1}</span>
            </div>
          ))}
          {/* Route line */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <polyline points="89,69 149,99 209,79 269,109" stroke={t.primary} strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.6" />
          </svg>
          <div style={{ position: 'absolute', bottom: 10, right: 12, background: t.navBg, borderRadius: 10, padding: '6px 12px', fontSize: 11, fontWeight: '700', color: t.primary }}>Optimized Route</div>
        </div>
      </div>

      {/* Cluster tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }}>
        {clusters.map((c, i) => (
          <div key={i} onClick={() => setActiveCluster(i)} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 20, background: activeCluster === i ? c.color : t.surfaceAlt, color: activeCluster === i ? '#fff' : t.textSecondary, fontSize: 12, fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>{c.name}</div>
        ))}
      </div>

      {/* Active cluster */}
      {(() => {
        const cl = clusters[activeCluster];
        return (
          <div style={{ ...S.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: '800', color: t.text }}>{cl.name}</div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 3 }}>{cl.time} · {cl.duration} · {cl.stops} stops · {cl.fuel}</div>
              </div>
              <div style={{ background: cl.color, borderRadius: 12, padding: '6px 12px', fontSize: 11, fontWeight: '700', color: '#fff' }}>Navigate</div>
            </div>
            {cl.errands.map((er, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: j < cl.errands.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{er.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: '700', color: t.text }}>{er.label}</div>
                  <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>{er.sub}</div>
                </div>
                <div style={{ marginLeft: 'auto', width: 24, height: 24, borderRadius: 8, border: `2px solid ${t.border}`, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );

  // ── INSIGHTS SCREEN ────────────────────────────────────────────
  const InsightsScreen = () => {
    const bars = [65, 80, 45, 90, 55, 70, 85];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const patterns = [
      { icon: '🌙', title: 'Late-Night Scroll', desc: 'You lose ~47 min after 10:30pm on screens before bed. Costs 1hr of next-day focus.', severity: 'warn', action: 'Set a screen curfew reminder' },
      { icon: '📉', title: 'Afternoon Slump', desc: '3–4pm drop happens 5x/week. You\'re scheduling high-focus work during your lowest energy window.', severity: 'warn', action: 'Move admin tasks to 3pm slot' },
      { icon: '✅', title: 'Morning Momentum', desc: 'You complete 73% of tasks before noon. Your peak productivity window is 9–11:30am.', severity: 'good', action: 'Protect this block' },
      { icon: '🔄', title: 'Schedule Overruns', desc: 'Tuesday meetings run 15+ min over 4 out of 5 weeks, cascading into your focus blocks.', severity: 'warn', action: 'Add 15-min buffer after standup' },
    ];

    return (
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ paddingTop: 8, marginBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: '800', color: t.text }}>Life Patterns</div>
          <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>Based on 3 weeks of data</div>
        </div>

        {/* Weekly bar chart */}
        <div style={{ ...S.card, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: '700', color: t.text }}>Daily Completion Rate</div>
              <div style={{ fontSize: 12, color: t.textSecondary }}>This week avg: 70%</div>
            </div>
            <span style={S.pill(t.success, t.successLight)}>+12% vs last week</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: i === 6 ? t.primary : t.primaryLight, borderRadius: '6px 6px 4px 4px', height: `${b * 0.7}px`, transition: 'height 0.4s', position: 'relative' }}>
                  {i === 6 && <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: '700', color: t.primary, whiteSpace: 'nowrap' }}>{b}%</div>}
                </div>
                <div style={{ fontSize: 10, color: i === 6 ? t.primary : t.textMuted, fontWeight: i === 6 ? '700' : '500' }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Energy heatmap */}
        <div style={{ ...S.card, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: '700', color: t.text, marginBottom: 12 }}>Energy Heatmap</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['6am','8am','10am','12pm','2pm','4pm','6pm','8pm','10pm'].map((h, i) => {
              const energyLevels = [0.2, 0.6, 0.9, 0.7, 0.5, 0.3, 0.6, 0.4, 0.15];
              const e = energyLevels[i];
              const r = Math.round(124 * (1 - e) + 124 * e);
              const g = Math.round(92 * (1 - e) + 252 * e);
              return (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: 40, background: `rgba(124, ${g}, 252, ${0.15 + e * 0.7})`, borderRadius: 8, marginBottom: 4 }} />
                  <div style={{ fontSize: 8, color: t.textMuted, fontWeight: '600' }}>{h}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: t.primaryLight }} /><span style={{ fontSize: 10, color: t.textMuted }}>Low energy</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: t.primary }} /><span style={{ fontSize: 10, color: t.textMuted }}>Peak energy</span></div>
          </div>
        </div>

        {/* Pattern cards */}
        <div style={{ fontSize: 13, fontWeight: '700', color: t.text, marginBottom: 10 }}>Detected Patterns</div>
        {patterns.map((p, i) => (
          <div key={i} style={{ ...S.card, marginBottom: 10, borderLeft: `4px solid ${p.severity === 'good' ? t.success : t.warning}` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22 }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: '700', color: t.text }}>{p.title}</div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 4, lineHeight: 1.5 }}>{p.desc}</div>
                <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, background: p.severity === 'good' ? t.successLight : t.warningLight, borderRadius: 10, padding: '5px 10px' }}>
                  <span style={{ fontSize: 10 }}>💡</span>
                  <span style={{ fontSize: 11, fontWeight: '600', color: p.severity === 'good' ? t.success : t.warning }}>{p.action}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── SETTINGS SCREEN ────────────────────────────────────────────
  const SettingsScreen = () => {
    const SunIcon = window.lucide?.Sun;
    const MoonIcon = window.lucide?.Moon;
    const ChevronRightIcon = window.lucide?.ChevronRight;

    const sections = [
      { title: 'Profile', items: [{ icon: '👤', label: 'Jordan Chen', sub: 'jordan@email.com', action: '›' }, { icon: '🎯', label: 'Life Goals Setup', sub: '5 active goals', action: '›' }] },
      { title: 'Smart Features', items: [{ icon: '🔄', label: 'Smart Day Reflow', sub: 'Auto-reschedule on delay', toggle: true, on: true }, { icon: '⚡', label: 'Gap Finder', sub: 'Micro-task suggestions', toggle: true, on: true }, { icon: '🗺️', label: 'Errand Clustering', sub: 'Group by proximity', toggle: true, on: true }, { icon: '🧠', label: 'Energy Learning', sub: 'Adapt to your patterns', toggle: true, on: false }] },
      { title: 'Notifications', items: [{ icon: '🔔', label: 'Gap Alerts', sub: '15 min before gap', toggle: true, on: true }, { icon: '📍', label: 'Location Triggers', sub: 'Errand reminders near stops', toggle: true, on: false }] },
      { title: 'About', items: [{ icon: '⭐', label: 'Rate Orbit Habit', sub: '', action: '›' }, { icon: '💬', label: 'Send Feedback', sub: '', action: '›' }, { icon: 'ℹ️', label: 'Version 1.0.0', sub: 'Up to date', action: '' }] },
    ];

    return (
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ paddingTop: 8, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: '800', color: t.text }}>Settings</div>
            <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>Customize your orbit</div>
          </div>
          {/* Theme toggle */}
          <div onClick={() => setIsDark(!isDark)} style={{ width: 48, height: 48, borderRadius: 16, background: isDark ? t.primaryLight : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', border: `2px solid ${t.border}` }}>
            {isDark ? (SunIcon ? React.createElement(SunIcon, { size: 20, color: t.primary }) : '☀️') : (MoonIcon ? React.createElement(MoonIcon, { size: 20, color: t.primary }) : '🌙')}
          </div>
        </div>

        {/* Profile hero */}
        <div style={{ ...S.card, background: t.primaryGrad, border: 'none', padding: '20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 20, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🧑‍💼</div>
          <div>
            <div style={{ color: '#fff', fontSize: 17, fontWeight: '800' }}>Jordan Chen</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 }}>Member since Jan 2025 · Pro Plan</div>
            <div style={{ marginTop: 6 }}><span style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 10, fontWeight: '700' }}>PRO</span></div>
          </div>
        </div>

        {sections.map((sec, si) => (
          <div key={si} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: '700', color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>{sec.title}</div>
            <div style={{ ...S.card, padding: 0, overflow: 'hidden' }}>
              {sec.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: ii < sec.items.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{item.label}</div>
                    {item.sub && <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>{item.sub}</div>}
                  </div>
                  {item.toggle ? (
                    <div style={{ width: 44, height: 26, borderRadius: 13, background: item.on ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: item.on ? 21 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                  ) : item.action ? (
                    <span style={{ color: t.textMuted, fontSize: 16 }}>{item.action}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const screens = { today: <TodayScreen />, gaps: <GapsScreen />, errands: <ErrandsScreen />, insights: <InsightsScreen />, settings: <SettingsScreen /> };
  const navItems = [
    { id: 'today', icon: 'Sun', label: 'Today' },
    { id: 'gaps', icon: 'Zap', label: 'Gaps' },
    { id: 'errands', icon: 'MapPin', label: 'Errands' },
    { id: 'insights', icon: 'TrendingUp', label: 'Insights' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  return (
    <div style={S.page}>
      <div style={S.phone}>
        {/* Dynamic Island */}
        <div style={S.island} />

        {/* Status Bar */}
        <div style={S.statusBar}>
          <span style={S.statusTime}>9:41</span>
          <div style={S.statusIcons}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill={t.statusBar} opacity="0.8"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="0" width="3" height="12" rx="1"/><rect x="13.5" y="1" width="2.5" height="11" rx="1"/></svg>
            <svg width="16" height="12" viewBox="0 0 20 14" fill="none" stroke={t.statusBar} strokeWidth="1.5" opacity="0.8"><path d="M1 4.5C4.5 1.5 8 0 10 0s5.5 1.5 9 4.5M4 7.5C6.5 5.5 8.5 4.5 10 4.5s3.5 1 6 3M7 10.5C8 9.5 9 9 10 9s2 .5 3 1.5"/><circle cx="10" cy="13" r="1.5" fill={t.statusBar}/></svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${t.statusBar}`, padding: 2, display: 'flex', alignItems: 'center', opacity: 0.8 }}>
                <div style={{ width: '70%', height: '100%', background: t.statusBar, borderRadius: 1 }} />
              </div>
              <div style={{ width: 2, height: 5, background: t.statusBar, borderRadius: '0 1px 1px 0', opacity: 0.8 }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={S.content}>
          {screens[activeTab]}
        </div>

        {/* Bottom Nav */}
        <div style={S.navBar}>
          {navItems.map(item => {
            const active = activeTab === item.id;
            const IconComp = window.lucide[item.icon];
            return (
              <div key={item.id} onClick={() => setActiveTab(item.id)} style={S.navItem(active)}>
                {IconComp ? React.createElement(IconComp, { size: 20, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 2 }) : <span>{item.label[0]}</span>}
                <span style={S.navLabel(active)}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
