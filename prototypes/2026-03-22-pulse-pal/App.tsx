const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [scanState, setScanState] = useState('idle'); // idle | scanning | results
  const [scanProgress, setScanProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('9:41');
  const [pressedTab, setPressedTab] = useState(null);

  const themes = {
    light: {
      bg: '#EEF2F7',
      phoneBg: '#FFFFFF',
      surface: '#F4F7FB',
      card: '#FFFFFF',
      cardAlt: '#F0F4FF',
      primary: '#0EA5E9',
      primaryDark: '#0284C7',
      primaryLight: '#E0F2FE',
      primaryGrad: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
      secondary: '#8B5CF6',
      secondaryLight: '#EDE9FE',
      secondaryGrad: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
      accent: '#06B6D4',
      heroGrad: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
      success: '#10B981',
      successLight: '#D1FAE5',
      warning: '#F59E0B',
      warningLight: '#FEF3C7',
      danger: '#EF4444',
      dangerLight: '#FEE2E2',
      caution: '#06B6D4',
      cautionLight: '#CFFAFE',
      text: '#0F172A',
      textSub: '#334155',
      textSecondary: '#64748B',
      textMuted: '#94A3B8',
      border: '#E2E8F0',
      borderLight: '#F1F5F9',
      navBg: '#FFFFFF',
      navBorder: '#F1F5F9',
      scanBg: '#000000',
      inputBg: '#F8FAFC',
    },
    dark: {
      bg: '#060B18',
      phoneBg: '#0B1120',
      surface: '#0F1929',
      card: '#162035',
      cardAlt: '#1A2640',
      primary: '#38BDF8',
      primaryDark: '#0EA5E9',
      primaryLight: '#0C2340',
      primaryGrad: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
      secondary: '#A78BFA',
      secondaryLight: '#2D1F5E',
      secondaryGrad: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
      accent: '#22D3EE',
      heroGrad: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
      success: '#34D399',
      successLight: '#022C22',
      warning: '#FBBF24',
      warningLight: '#271900',
      danger: '#F87171',
      dangerLight: '#1F0000',
      caution: '#22D3EE',
      cautionLight: '#042F2E',
      text: '#F0F6FF',
      textSub: '#CBD5E1',
      textSecondary: '#94A3B8',
      textMuted: '#475569',
      border: '#1E3050',
      borderLight: '#162035',
      navBg: '#0B1120',
      navBorder: '#162035',
      scanBg: '#000000',
      inputBg: '#162035',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setCurrentTime(`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (scanState !== 'scanning') return;
    setScanProgress(0);
    const id = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) { clearInterval(id); setScanState('results'); return 100; }
        return p + 1.8;
      });
    }, 55);
    return () => clearInterval(id);
  }, [scanState]);

  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home },
    { id: 'scan',     label: 'Scan',     icon: window.lucide.Scan },
    { id: 'timeline', label: 'Timeline', icon: window.lucide.Activity },
    { id: 'reports',  label: 'Reports',  icon: window.lucide.FileText },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  // ─── HOME SCREEN ────────────────────────────────────────────────────────────
  function HomeScreen() {
    const recentScans = [
      { time: '8:32 AM', label: 'Morning Check', status: 'normal',  tags: ['Hydration OK', 'Low stress'] },
      { time: 'Yesterday', label: 'Evening Scan', status: 'warning', tags: ['Mild fatigue', 'Slight tension'] },
      { time: '2 days ago', label: 'Midday Check', status: 'alert',  tags: ['Dehydration', 'Voice strain'] },
    ];

    const statusColor = s => ({ normal: t.success, warning: t.warning, alert: t.danger }[s]);
    const statusBg    = s => ({ normal: t.successLight, warning: t.warningLight, alert: t.dangerLight }[s]);

    const insights = [
      { label: 'Hydration', value: '68%',      Icon: window.lucide.Droplets, color: t.primary,    bg: t.primaryLight },
      { label: 'Stress',    value: 'Moderate', Icon: window.lucide.Brain,    color: t.secondary,  bg: t.secondaryLight },
      { label: 'Breathing', value: 'Normal',   Icon: window.lucide.Wind,     color: t.accent,     bg: t.cautionLight },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.surface, paddingBottom: 80 } },

      // ── Header ──
      React.createElement('div', { style: { background: t.phoneBg, padding: '12px 20px 16px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, marginBottom: 2 } }, 'Good morning,'),
            React.createElement('h1', { style: { color: t.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.5 } }, 'Sarah 👋'),
          ),
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: '50%', background: t.heroGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${t.primary}40` } },
            React.createElement(window.lucide.User, { size: 20, color: '#fff' })
          )
        ),

        // Hero score card
        React.createElement('div', {
          style: { marginTop: 14, background: t.heroGrad, borderRadius: 18, padding: '16px 18px', color: '#fff', boxShadow: `0 8px 24px ${t.primary}40` }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('p', { style: { opacity: 0.85, fontSize: 12, marginBottom: 4, fontWeight: 500, letterSpacing: 0.3 } }, "TODAY'S HEALTH SCORE"),
              React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 4 } },
                React.createElement('span', { style: { fontSize: 42, fontWeight: 800, letterSpacing: -2, lineHeight: 1 } }, '82'),
                React.createElement('span', { style: { opacity: 0.75, fontSize: 14, fontWeight: 500 } }, ' / 100'),
              ),
              React.createElement('p', { style: { opacity: 0.8, fontSize: 12, marginTop: 6, fontWeight: 500 } }, 'Good · slightly below baseline'),
            ),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 } },
                React.createElement(window.lucide.Heart, { size: 26, color: '#fff' })
              ),
              React.createElement('p', { style: { fontSize: 11, opacity: 0.8, fontWeight: 600 } }, '3 scans today')
            )
          )
        )
      ),

      React.createElement('div', { style: { padding: '16px 20px 0' } },

        // Quick insights
        React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.6 } }, 'Quick Insights'),
        React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 16 } },
          insights.map(({ label, value, Icon, color, bg }) =>
            React.createElement('div', { key: label, style: { flex: 1, background: t.card, borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${t.border}` } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
                React.createElement(Icon, { size: 17, color: color })
              ),
              React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 } }, value),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, label)
            )
          )
        ),

        // Pattern alert
        React.createElement('div', { style: { background: t.warningLight, borderRadius: 14, padding: '12px 14px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-start', border: `1px solid ${t.warning}30` } },
          React.createElement('div', { style: { marginTop: 1 } }, React.createElement(window.lucide.AlertTriangle, { size: 16, color: t.warning })),
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 3 } }, 'Pattern Detected'),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, lineHeight: 1.55 } }, 'Fatigue signs appeared 3 days in a row after poor sleep. Consider resting tonight.')
          )
        ),

        // CTA
        React.createElement('button', {
          onClick: () => { setActiveTab('scan'); setScanState('idle'); },
          style: { width: '100%', background: t.heroGrad, border: 'none', borderRadius: 14, padding: '15px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 20, boxShadow: `0 6px 18px ${t.primary}40` }
        },
          React.createElement(window.lucide.Scan, { size: 20, color: '#fff' }),
          'Start 30-Second Scan'
        ),

        // Recent scans
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700 } }, 'Recent Scans'),
          React.createElement('span', { style: { color: t.primary, fontSize: 13, fontWeight: 600 } }, 'See all →')
        ),
        recentScans.map((scan, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 10, border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: statusColor(scan.status) } }),
                React.createElement('span', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, scan.label)
              ),
              React.createElement('span', { style: { color: t.textMuted, fontSize: 12 } }, scan.time)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
              scan.tags.map((tag, j) =>
                React.createElement('span', { key: j, style: { background: statusBg(scan.status), color: statusColor(scan.status), fontSize: 11, fontWeight: 600, borderRadius: 20, padding: '3px 10px' } }, tag)
              )
            )
          )
        )
      )
    );
  }

  // ─── SCAN SCREEN ────────────────────────────────────────────────────────────
  function ScanScreen() {
    const steps = [
      { label: 'Face',      Icon: window.lucide.Scan,        desc: 'Skin tone, eye clarity & symmetry' },
      { label: 'Breathing', Icon: window.lucide.Wind,        desc: 'Rhythm, depth & nasal patterns' },
      { label: 'Voice',     Icon: window.lucide.Mic,         desc: 'Vocal fatigue & hoarseness' },
      { label: 'Hands',     Icon: window.lucide.Fingerprint, desc: 'Nail color, tremor & hydration' },
    ];

    const results = [
      { label: 'Hydration',         value: 'Low pattern detected',    level: 'warning', Icon: window.lucide.Droplets },
      { label: 'Stress Indicators', value: 'Moderate',                level: 'warning', Icon: window.lucide.Brain    },
      { label: 'Breathing Pattern', value: 'Normal rhythm',           level: 'normal',  Icon: window.lucide.Wind     },
      { label: 'Voice Analysis',    value: 'Mild fatigue in tone',    level: 'caution', Icon: window.lucide.Mic      },
    ];

    const lvlColor = l => ({ normal: t.success, warning: t.warning, caution: t.accent, alert: t.danger }[l] || t.primary);
    const lvlBg    = l => ({ normal: t.successLight, warning: t.warningLight, caution: t.cautionLight, alert: t.dangerLight }[l] || t.primaryLight);

    // ── Results view ──
    if (scanState === 'results') {
      return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.surface, paddingBottom: 80 } },
        React.createElement('div', { style: { background: t.phoneBg, padding: '12px 20px 14px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('button', { onClick: () => setScanState('idle'), style: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' } },
            React.createElement(window.lucide.ChevronLeft, { size: 22, color: t.text })
          ),
          React.createElement('h2', { style: { color: t.text, fontSize: 18, fontWeight: 700 } }, 'Scan Results'),
        ),
        React.createElement('div', { style: { padding: 20 } },

          // Summary banner
          React.createElement('div', { style: { background: t.warningLight, borderRadius: 16, padding: 16, marginBottom: 18, border: `1px solid ${t.warning}30` } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('span', { style: { color: t.text, fontWeight: 700, fontSize: 15 } }, 'Assessment'),
              React.createElement('span', { style: { background: t.warning, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 12px' } }, 'Attention')
            ),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, lineHeight: 1.65 } }, 'Possible dehydration pattern with moderate stress. Your voice shows mild fatigue. Drink water and take a short break.')
          ),

          // Detailed results
          React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.6 } }, 'Detailed Analysis'),
          results.map((r, i) =>
            React.createElement('div', { key: i, style: { background: t.card, borderRadius: 12, padding: '12px 14px', marginBottom: 10, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { width: 38, height: 38, borderRadius: 10, background: lvlBg(r.level), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(r.Icon, { size: 18, color: lvlColor(r.level) })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, r.label),
                React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, marginTop: 2 } }, r.value)
              ),
              React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: lvlColor(r.level) } })
            )
          ),

          // Recommendations
          React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 10, marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.6 } }, 'Recommendations'),
          ['Drink 2 glasses of water now', 'Step away from screens for 10 min', 'Monitor if shortness of breath develops'].map((rec, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', { style: { width: 22, height: 22, borderRadius: '50%', background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 } },
                React.createElement(window.lucide.Check, { size: 12, color: t.primary })
              ),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, lineHeight: 1.55 } }, rec)
            )
          ),

          // Share
          React.createElement('button', {
            style: { width: '100%', background: t.card, border: `1px solid ${t.border}`, borderRadius: 13, padding: '14px', color: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, marginTop: 4 }
          },
            React.createElement(window.lucide.Share2, { size: 17 }),
            'Share Doctor Summary'
          )
        )
      );
    }

    // ── Scanning view ──
    if (scanState === 'scanning') {
      const currentStep = Math.min(Math.floor(scanProgress / 25), 3);
      return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', background: '#000', paddingBottom: 80 } },

        // Viewfinder
        React.createElement('div', { style: { flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' } },
          // Face outline
          React.createElement('div', { style: { width: 140, height: 180, borderRadius: '50%', border: `2px solid rgba(255,255,255,0.08)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.User, { size: 70, color: 'rgba(255,255,255,0.12)' })
          ),
          // Corner brackets
          ...['tl','tr','bl','br'].map(c =>
            React.createElement('div', { key: c, style: { position: 'absolute', width: 28, height: 28, borderColor: t.primary, borderStyle: 'solid', borderWidth: 0, ...(c==='tl'?{top:28,left:28,borderTopWidth:3,borderLeftWidth:3}:c==='tr'?{top:28,right:28,borderTopWidth:3,borderRightWidth:3}:c==='bl'?{bottom:110,left:28,borderBottomWidth:3,borderLeftWidth:3}:{bottom:110,right:28,borderBottomWidth:3,borderRightWidth:3}), borderRadius: 3 } })
          ),
          // Scan sweep line
          React.createElement('div', { style: { position: 'absolute', left: 40, right: 40, height: 2, top: `${28 + (scanProgress % 50) * 1.6}px`, background: `linear-gradient(90deg, transparent, ${t.primary}80, ${t.primary}, ${t.primary}80, transparent)`, boxShadow: `0 0 8px ${t.primary}` } }),
          // Step label
          React.createElement('div', { style: { position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' } },
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 12 } }, steps[currentStep]?.desc)
          )
        ),

        // Controls panel
        React.createElement('div', { style: { background: '#0A0F1E', padding: '16px 20px', borderTop: '1px solid #1a2540' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('span', { style: { color: '#fff', fontSize: 14, fontWeight: 700 } }, steps[currentStep]?.label || 'Finalizing…'),
            React.createElement('span', { style: { color: t.primary, fontSize: 15, fontWeight: 800 } }, `${Math.round(scanProgress)}%`)
          ),
          React.createElement('div', { style: { height: 6, background: '#1a2540', borderRadius: 3, overflow: 'hidden', marginBottom: 16 } },
            React.createElement('div', { style: { height: '100%', width: `${scanProgress}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3, transition: 'width 0.1s linear' } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            steps.map((step, i) =>
              React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 } },
                React.createElement('div', { style: { width: 40, height: 40, borderRadius: '50%', background: i < currentStep ? t.primary : i === currentStep ? t.primary : '#1a2540', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.4s', boxShadow: i === currentStep ? `0 0 14px ${t.primary}70` : 'none' } },
                  i < currentStep
                    ? React.createElement(window.lucide.Check, { size: 16, color: '#fff' })
                    : React.createElement(step.Icon, { size: 16, color: i === currentStep ? '#fff' : '#3a4a6a' })
                ),
                React.createElement('span', { style: { color: i <= currentStep ? t.primary : '#3a4a6a', fontSize: 10, fontWeight: 600 } }, step.label)
              )
            )
          )
        )
      );
    }

    // ── Idle / ready view ──
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.surface, paddingBottom: 80 } },
      React.createElement('div', { style: { background: t.phoneBg, padding: '12px 20px 14px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('h2', { style: { color: t.text, fontSize: 18, fontWeight: 700 } }, 'Health Scan'),
        React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, marginTop: 3 } }, 'A guided 30-second check-in')
      ),
      React.createElement('div', { style: { padding: 20 } },

        // Hero
        React.createElement('div', { style: { background: t.heroGrad, borderRadius: 22, padding: '28px 24px', textAlign: 'center', marginBottom: 20, color: '#fff' } },
          React.createElement('div', { style: { width: 76, height: 76, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' } },
            React.createElement(window.lucide.Scan, { size: 34, color: '#fff' })
          ),
          React.createElement('h3', { style: { fontSize: 20, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 } }, 'Ready to Scan'),
          React.createElement('p', { style: { opacity: 0.85, fontSize: 13, lineHeight: 1.65 } }, 'Uses your camera & mic to detect subtle health signals — face, breathing, voice, and hands.')
        ),

        // Steps
        React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.6 } }, 'What We Analyze'),
        steps.map((step, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10, background: t.card, borderRadius: 13, padding: '11px 14px', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(step.Icon, { size: 18, color: t.primary })
            ),
            React.createElement('div', null,
              React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, step.label),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 12, marginTop: 1 } }, step.desc)
            )
          )
        ),

        React.createElement('button', {
          onClick: () => setScanState('scanning'),
          style: { width: '100%', background: t.heroGrad, border: 'none', borderRadius: 14, padding: '16px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, marginTop: 6, boxShadow: `0 6px 18px ${t.primary}40` }
        },
          React.createElement(window.lucide.Play, { size: 20, color: '#fff' }),
          'Begin Scan'
        )
      )
    );
  }

  // ─── TIMELINE SCREEN ────────────────────────────────────────────────────────
  function TimelineScreen() {
    const days = [
      { date: 'Today, Mar 22', items: [
        { time: '8:32 AM',  title: 'Morning scan',  status: 'normal',  summary: 'All clear. Hydration slightly low.', tags: ['Normal'] },
        { time: '12:15 PM', title: 'Midday check',  status: 'warning', summary: 'Stress markers elevated, mild fatigue.', tags: ['Stress', 'Fatigue'] },
      ]},
      { date: 'Yesterday, Mar 21', items: [
        { time: '9:00 AM',  title: 'Morning scan',  status: 'warning', summary: 'Poor sleep detected. Voice tired.', tags: ['Sleep', 'Fatigue'] },
        { time: '7:45 PM',  title: 'Evening scan',  status: 'normal',  summary: 'Recovered. Normal indicators.', tags: ['Normal'] },
      ]},
      { date: 'Mar 20', items: [
        { time: '10:30 AM', title: 'Late morning',  status: 'alert',   summary: 'Dehydration pattern. Respiratory strain.', tags: ['Dehydration', 'Resp.'] },
      ]},
    ];

    const sColor = s => ({ normal: t.success, warning: t.warning, alert: t.danger }[s]);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.surface, paddingBottom: 80 } },
      React.createElement('div', { style: { background: t.phoneBg, padding: '12px 20px 14px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('h2', { style: { color: t.text, fontSize: 18, fontWeight: 700 } }, 'Health Timeline'),
        React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, marginTop: 3 } }, 'Your symptom history & patterns')
      ),

      React.createElement('div', { style: { padding: '14px 20px 0' } },
        // Pattern insight
        React.createElement('div', { style: { background: t.secondaryLight, borderRadius: 14, padding: '13px 15px', marginBottom: 18, display: 'flex', gap: 10, alignItems: 'flex-start', border: `1px solid ${t.secondary}30` } },
          React.createElement(window.lucide.TrendingUp, { size: 17, color: t.secondary }),
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 3 } }, '3-Day Pattern Detected'),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, lineHeight: 1.55 } }, 'Fatigue consistently follows nights under 6 hrs sleep. 3 occurrences this week — consider earlier bedtime.')
          )
        ),

        // Entries
        days.map((day, di) =>
          React.createElement('div', { key: di, style: { marginBottom: 20 } },
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 } }, day.date),
            day.items.map((item, ii) =>
              React.createElement('div', { key: ii, style: { display: 'flex', gap: 12, marginBottom: 10 } },
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 } },
                  React.createElement('div', { style: { width: 11, height: 11, borderRadius: '50%', background: sColor(item.status), flexShrink: 0, boxShadow: `0 0 8px ${sColor(item.status)}60` } }),
                  React.createElement('div', { style: { width: 2, flex: 1, background: t.border, marginTop: 5 } })
                ),
                React.createElement('div', { style: { flex: 1, background: t.card, borderRadius: 13, padding: '11px 13px', border: `1px solid ${t.border}`, marginBottom: 2 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                    React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, item.title),
                    React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, item.time)
                  ),
                  React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, lineHeight: 1.5, marginBottom: 8 } }, item.summary),
                  React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                    item.tags.map((tag, j) =>
                      React.createElement('span', { key: j, style: { background: `${sColor(item.status)}20`, color: sColor(item.status), fontSize: 10, fontWeight: 700, borderRadius: 20, padding: '2px 9px' } }, tag)
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  // ─── REPORTS SCREEN ─────────────────────────────────────────────────────────
  function ReportsScreen() {
    const reports = [
      {
        id: 1, title: 'Weekly Summary', date: 'Mar 16–22, 2026', scans: 14, status: 'ready',
        highlights: ['Recurring fatigue after poor sleep', 'Hydration consistently low', 'Breathing normal throughout'],
      },
      {
        id: 2, title: 'Doctor Visit Report', date: 'Mar 15, 2026', scans: 8, status: 'shared',
        highlights: ['Respiratory data included', 'Voice strain documented', 'Prepared for appointment'],
      },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.surface, paddingBottom: 80 } },
      React.createElement('div', { style: { background: t.phoneBg, padding: '12px 20px 14px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('h2', { style: { color: t.text, fontSize: 18, fontWeight: 700 } }, 'Reports'),
        React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, marginTop: 3 } }, 'Doctor-ready summaries')
      ),
      React.createElement('div', { style: { padding: 20 } },

        // Generate CTA
        React.createElement('div', { style: { background: t.heroGrad, borderRadius: 18, padding: '16px 18px', marginBottom: 20, color: '#fff', boxShadow: `0 8px 24px ${t.primary}40` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontWeight: 700, fontSize: 15, marginBottom: 4 } }, 'Create New Report'),
              React.createElement('p', { style: { opacity: 0.8, fontSize: 12, lineHeight: 1.5 } }, 'Summarize recent scans\nfor your next appointment')
            ),
            React.createElement('button', {
              style: { background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 11, padding: '10px 16px', color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }
            }, 'Generate')
          )
        ),

        React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.6 } }, 'Recent Reports'),

        reports.map(report =>
          React.createElement('div', { key: report.id, style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 14, border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
              React.createElement('div', null,
                React.createElement('h4', { style: { color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 4 } }, report.title),
                React.createElement('p', { style: { color: t.textMuted, fontSize: 12 } }, `${report.date} · ${report.scans} scans`)
              ),
              React.createElement('span', {
                style: { background: report.status === 'shared' ? t.successLight : t.primaryLight, color: report.status === 'shared' ? t.success : t.primary, fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 10px' }
              }, report.status === 'shared' ? '✓ Shared' : 'Ready')
            ),
            React.createElement('div', { style: { marginBottom: 14 } },
              report.highlights.map((h, i) =>
                React.createElement('div', { key: i, style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 7 } },
                  React.createElement(window.lucide.ChevronRight, { size: 13, color: t.primary }),
                  React.createElement('p', { style: { color: t.textSecondary, fontSize: 12 } }, h)
                )
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                style: { flex: 1, background: t.primary, border: 'none', borderRadius: 11, padding: '11px', color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
              },
                React.createElement(window.lucide.Share2, { size: 14 }), 'Share'
              ),
              React.createElement('button', {
                style: { flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 11, padding: '11px', color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
              },
                React.createElement(window.lucide.Download, { size: 14 }), 'Export PDF'
              )
            )
          )
        )
      )
    );
  }

  // ─── SETTINGS SCREEN ────────────────────────────────────────────────────────
  function SettingsScreen() {
    const menuItems = [
      { Icon: window.lucide.Bell,      label: 'Notifications',   sub: 'Daily reminders & alerts' },
      { Icon: window.lucide.Shield,    label: 'Privacy & Data',  sub: 'Manage your health data' },
      { Icon: window.lucide.UserPlus,  label: 'Family Sharing',  sub: 'Monitor a loved one' },
      { Icon: window.lucide.Activity,  label: 'Connect Wearable',sub: 'Apple Watch, Fitbit & more' },
      { Icon: window.lucide.HelpCircle,label: 'Help & Support',  sub: 'FAQs and contact us' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.surface, paddingBottom: 80 } },
      React.createElement('div', { style: { background: t.phoneBg, padding: '12px 20px 14px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('h2', { style: { color: t.text, fontSize: 18, fontWeight: 700 } }, 'Settings'),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 22, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: t.text }
          },
            isDark
              ? React.createElement(window.lucide.Sun, { size: 15, color: t.warning })
              : React.createElement(window.lucide.Moon, { size: 15, color: t.secondary }),
            isDark ? 'Light' : 'Dark'
          )
        )
      ),
      React.createElement('div', { style: { padding: 20 } },

        // Profile card
        React.createElement('div', { style: { background: t.card, borderRadius: 18, padding: 16, marginBottom: 16, border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
            React.createElement('div', { style: { width: 58, height: 58, borderRadius: '50%', background: t.heroGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 14px ${t.primary}40` } },
              React.createElement(window.lucide.User, { size: 26, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { color: t.text, fontSize: 16, fontWeight: 800, letterSpacing: -0.3 } }, 'Sarah Mitchell'),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, marginTop: 2 } }, 'Member since Jan 2026'),
              React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 6 } },
                ['47 scans', '3 conditions', '5 reports'].map((chip, i) =>
                  React.createElement('span', { key: i, style: { background: t.primaryLight, color: t.primary, fontSize: 10, fontWeight: 700, borderRadius: 20, padding: '2px 8px' } }, chip)
                )
              )
            )
          )
        ),

        // Tracked conditions
        React.createElement('div', { style: { background: t.card, borderRadius: 18, padding: 16, marginBottom: 16, border: `1px solid ${t.border}` } },
          React.createElement('h4', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.6 } }, 'Tracked Conditions'),
          ['Asthma', 'Migraines'].map((c, i, arr) =>
            React.createElement('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < arr.length - 1 ? 12 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', marginBottom: i < arr.length - 1 ? 12 : 0 } },
              React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                React.createElement('div', { style: { width: 34, height: 34, borderRadius: 9, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(window.lucide.Heart, { size: 16, color: t.primary })
                ),
                React.createElement('span', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, c)
              ),
              React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
            )
          )
        ),

        // Menu items
        React.createElement('div', { style: { background: t.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}` } },
          menuItems.map((item, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < menuItems.length - 1 ? `1px solid ${t.border}` : 'none' } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(item.Icon, { size: 17, color: t.primary })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, item.label),
                React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 1 } }, item.sub)
              ),
              React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })
            )
          )
        ),

        // Version
        React.createElement('p', { style: { color: t.textMuted, fontSize: 12, textAlign: 'center', marginTop: 20 } }, 'Pulse Pal v1.0.0 · Not medical advice')
      )
    );
  }

  // ─── SCREEN ROUTER ──────────────────────────────────────────────────────────
  const screens = {
    home: HomeScreen,
    scan: ScanScreen,
    timeline: TimelineScreen,
    reports: ReportsScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#D8E2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }
  },
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.phoneBg, borderRadius: 50, overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.35), 0 0 0 11px #1c1c1e, 0 0 0 13px #3a3a3c', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'background 0.3s' }
    },

      // Dynamic Island
      React.createElement('div', { style: { position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)', width: 126, height: 36, background: '#000', borderRadius: 22, zIndex: 100 } }),

      // Status bar
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px 6px', background: scanState === 'scanning' ? '#000' : t.phoneBg, zIndex: 50, transition: 'background 0.3s' } },
        React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: scanState === 'scanning' ? '#fff' : t.text } }, currentTime),
        React.createElement('div', { style: { width: 126 } }),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: scanState === 'scanning' ? '#fff' : t.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: scanState === 'scanning' ? '#fff' : t.text })
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom nav
      React.createElement('div', { style: { display: 'flex', background: t.navBg, borderTop: `1px solid ${t.navBorder}`, paddingBottom: 10, paddingTop: 4, zIndex: 50, transition: 'background 0.3s' } },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', padding: '6px 0', opacity: activeTab === tab.id ? 1 : 0.5, transition: 'opacity 0.2s' }
          },
            tab.id === 'scan'
              ? React.createElement('div', { style: { width: 44, height: 44, borderRadius: '50%', background: activeTab === 'scan' ? t.heroGrad : t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -2, boxShadow: activeTab === 'scan' ? `0 4px 14px ${t.primary}50` : 'none', transition: 'all 0.2s' } },
                  React.createElement(tab.icon, { size: 20, color: activeTab === 'scan' ? '#fff' : t.primary })
                )
              : React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? t.primary : t.textMuted, transition: 'color 0.2s' } }, tab.label)
          )
        )
      )
    )
  );
}
