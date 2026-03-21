const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080C18',
    surface: '#111827',
    card: '#1A2236',
    cardAlt: '#1E2940',
    border: '#2A3650',
    text: '#E8EDF8',
    textSub: '#8A99B8',
    textMuted: '#4A5878',
    primary: '#00D4AA',
    primaryDim: 'rgba(0,212,170,0.12)',
    primaryGlow: 'rgba(0,212,170,0.25)',
    secondary: '#7C6FFF',
    secondaryDim: 'rgba(124,111,255,0.12)',
    warning: '#F59E0B',
    warningDim: 'rgba(245,158,11,0.12)',
    danger: '#EF4444',
    dangerDim: 'rgba(239,68,68,0.12)',
    safe: '#10B981',
    safeDim: 'rgba(16,185,129,0.12)',
    navBg: '#0E1525',
    statusBar: '#080C18',
  },
  light: {
    bg: '#EEF2FA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F5F8FF',
    border: '#DDE3F0',
    text: '#0F1729',
    textSub: '#5A6882',
    textMuted: '#9BA8C0',
    primary: '#00A884',
    primaryDim: 'rgba(0,168,132,0.10)',
    primaryGlow: 'rgba(0,168,132,0.20)',
    secondary: '#5B50EE',
    secondaryDim: 'rgba(91,80,238,0.10)',
    warning: '#D97706',
    warningDim: 'rgba(217,119,6,0.10)',
    danger: '#DC2626',
    dangerDim: 'rgba(220,38,38,0.10)',
    safe: '#059669',
    safeDim: 'rgba(5,150,105,0.10)',
    navBg: '#FFFFFF',
    statusBar: '#FFFFFF',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeKey, setThemeKey] = useState('dark');
  const theme = themes[themeKey];

  // Font loader
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
  }, []);

  const toggleTheme = () => setThemeKey(k => k === 'dark' ? 'light' : 'dark');

  const fontBase = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  // Shared status bar
  const StatusBar = () => (
    <div style={{ background: theme.statusBar, padding: '10px 20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...fontBase }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>9:41</span>
      <div style={{ width: 120, height: 28, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: theme.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: theme.text })}
      </div>
    </div>
  );

  // Home Screen
  const HomeScreen = () => {
    const [pressed, setPressed] = useState(null);

    const alerts = [
      { id: 1, level: 'warning', title: 'Pattern Detected', desc: 'Elevated HR + poor sleep for 2 nights. Consider hydration check.', time: '2h ago', confidence: 74 },
      { id: 2, level: 'safe', title: 'Baseline Stable', desc: 'Resting HR and temperature within your normal range today.', time: '4h ago', confidence: 91 },
      { id: 3, level: 'danger', title: 'Stacking Signals', desc: '3 risk signals active. Recommend messaging your clinician.', time: '6h ago', confidence: 82 },
    ];

    const vitals = [
      { label: 'Resting HR', value: '72', unit: 'bpm', trend: '+4', up: true, icon: 'Heart' },
      { label: 'Sleep', value: '5.8', unit: 'hrs', trend: '-1.2', up: false, icon: 'Moon' },
      { label: 'Activity', value: '4,210', unit: 'steps', trend: '-890', up: false, icon: 'Activity' },
      { label: 'HRV', value: '41', unit: 'ms', trend: '-6', up: false, icon: 'Zap' },
    ];

    const levelColor = (l) => l === 'danger' ? theme.danger : l === 'warning' ? theme.warning : theme.safe;
    const levelBg = (l) => l === 'danger' ? theme.dangerDim : l === 'warning' ? theme.warningDim : theme.safeDim;

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, ...fontBase }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: theme.textSub, fontWeight: 500, letterSpacing: 0.5 }}>SUNDAY, MAR 22</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, marginTop: 2 }}>Good morning, Alex</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>A</span>
          </div>
        </div>

        {/* Health Status Card */}
        <div style={{ margin: '0 16px 16px', background: `linear-gradient(135deg, ${theme.primary}22, ${theme.secondary}22)`, border: `1px solid ${theme.primary}40`, borderRadius: 20, padding: '16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: theme.primary, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Health Pulse Score</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: theme.text, lineHeight: 1.1, marginTop: 4 }}>68<span style={{ fontSize: 18, fontWeight: 500, color: theme.textSub }}>/100</span></div>
              <div style={{ fontSize: 13, color: theme.warning, fontWeight: 600, marginTop: 4 }}>Watch — Some signals active</div>
            </div>
            <div style={{ position: 'relative', width: 72, height: 72 }}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="28" fill="none" stroke={theme.border} strokeWidth="5"/>
                <circle cx="36" cy="36" r="28" fill="none" stroke={theme.warning} strokeWidth="5"
                  strokeDasharray={`${2*Math.PI*28*0.68} ${2*Math.PI*28}`}
                  strokeLinecap="round" transform="rotate(-90 36 36)"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.Activity, { size: 22, color: theme.warning })}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {['↑ HR elevated', 'Poor sleep ×2', 'Low activity'].map(tag => (
              <span key={tag} style={{ background: theme.warningDim, border: `1px solid ${theme.warning}40`, borderRadius: 20, padding: '3px 10px', fontSize: 11, color: theme.warning, fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Vitals Row */}
        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.textSub, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Today's Signals</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {vitals.map(v => (
              <div key={v.label} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  {React.createElement(window.lucide[v.icon], { size: 16, color: theme.primary })}
                  <span style={{ fontSize: 11, color: v.up ? theme.danger : theme.warning, fontWeight: 600, background: v.up ? theme.dangerDim : theme.warningDim, borderRadius: 8, padding: '2px 7px' }}>{v.trend}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: theme.text }}>{v.value}<span style={{ fontSize: 11, color: theme.textSub, marginLeft: 2 }}>{v.unit}</span></div>
                <div style={{ fontSize: 11, color: theme.textSub, marginTop: 2 }}>{v.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.textSub, textTransform: 'uppercase', letterSpacing: 0.6 }}>Recent Alerts</div>
            <span style={{ fontSize: 11, color: theme.primary, fontWeight: 600, cursor: 'pointer' }}>See all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {alerts.map(a => (
              <div key={a.id} style={{ background: theme.card, border: `1px solid ${levelColor(a.level)}30`, borderLeft: `3px solid ${levelColor(a.level)}`, borderRadius: 14, padding: '12px 14px', transform: pressed === a.id ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.1s' }}
                onMouseDown={() => setPressed(a.id)} onMouseUp={() => setPressed(null)} onMouseLeave={() => setPressed(null)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{a.title}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: levelColor(a.level), background: levelBg(a.level), borderRadius: 6, padding: '2px 6px' }}>{a.confidence}% conf.</span>
                    </div>
                    <div style={{ fontSize: 12, color: theme.textSub, lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                  <span style={{ fontSize: 10, color: theme.textMuted, marginLeft: 10, whiteSpace: 'nowrap' }}>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Log Button */}
        <div style={{ padding: '0 16px 24px' }}>
          <button onClick={() => setActiveTab('log')} style={{ width: '100%', background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, border: 'none', borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            {React.createElement(window.lucide.Plus, { size: 18, color: '#fff' })}
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', ...fontBase }}>Log Symptoms Now</span>
          </button>
        </div>
      </div>
    );
  };

  // Patterns Screen
  const PatternsScreen = () => {
    const [expanded, setExpanded] = useState(null);

    const patterns = [
      {
        id: 1, status: 'active', severity: 'warning', title: 'Dehydration Cluster',
        signals: ['HR +8bpm above baseline', 'Poor sleep quality (2 nights)', 'Reduced activity (-40%)'],
        explanation: 'These three signals together often precede mild dehydration or early illness. Your heart works harder when fluid levels drop, disrupting sleep.',
        action: 'Drink 500ml water now. Log urine color. Recheck in 2 hours.',
        confidence: 74, since: '2 days'
      },
      {
        id: 2, status: 'watch', severity: 'secondary', title: 'Stress Response',
        signals: ['HRV below 7-day avg', 'Restless sleep segments', 'Caffeine intake ↑'],
        explanation: 'HRV drop combined with sleep fragmentation suggests your nervous system is in a heightened stress state.',
        action: 'Try a 10-minute breathing exercise before sleep tonight.',
        confidence: 61, since: '4 days'
      },
      {
        id: 3, status: 'resolved', severity: 'safe', title: 'Respiratory Alert (Cleared)',
        signals: ['Cough frequency normalized', 'O2 sat stable', 'Activity restored'],
        explanation: 'The respiratory pattern from last week has fully resolved. All signals have returned to your personal baseline.',
        action: null,
        confidence: 94, since: 'Resolved 3 days ago'
      },
      {
        id: 4, status: 'watch', severity: 'danger', title: 'Medication Side Effect',
        signals: ['Nausea logged ×3 this week', 'Appetite reduced', 'New Rx started 8 days ago'],
        explanation: 'Nausea appearing within 10 days of starting a new medication is a pattern worth reviewing with your prescriber.',
        action: 'Review symptoms with your doctor. Message template ready.',
        confidence: 82, since: '5 days'
      },
    ];

    const levelColor = (s) => s === 'danger' ? theme.danger : s === 'warning' ? theme.warning : s === 'secondary' ? theme.secondary : theme.safe;
    const levelBg = (s) => s === 'danger' ? theme.dangerDim : s === 'warning' ? theme.warningDim : s === 'secondary' ? theme.secondaryDim : theme.safeDim;

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, ...fontBase }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Pattern Detection</div>
          <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>AI-identified signal combinations</div>
        </div>

        {/* Legend */}
        <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {[['Active', theme.warning], ['Watching', theme.secondary], ['Danger', theme.danger], ['Resolved', theme.safe]].map(([l, c]) => (
            <span key={l} style={{ background: `${c}18`, border: `1px solid ${c}40`, borderRadius: 20, padding: '4px 12px', fontSize: 11, color: c, fontWeight: 600, whiteSpace: 'nowrap' }}>{l}</span>
          ))}
        </div>

        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {patterns.map(p => (
            <div key={p.id} style={{ background: theme.card, border: `1px solid ${levelColor(p.severity)}30`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: levelColor(p.severity), boxShadow: `0 0 6px ${levelColor(p.severity)}` }} />
                      <span style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{p.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.signals.slice(0, 2).map(s => (
                        <span key={s} style={{ fontSize: 10, color: theme.textSub, background: theme.cardAlt, borderRadius: 6, padding: '2px 8px', border: `1px solid ${theme.border}` }}>{s}</span>
                      ))}
                      {p.signals.length > 2 && <span style={{ fontSize: 10, color: theme.textMuted, background: theme.cardAlt, borderRadius: 6, padding: '2px 8px' }}>+{p.signals.length - 2}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: levelColor(p.severity) }}>{p.confidence}%</span>
                    <span style={{ fontSize: 10, color: theme.textMuted }}>{p.since}</span>
                    {React.createElement(expanded === p.id ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 16, color: theme.textMuted, style: { marginTop: 4 } })}
                  </div>
                </div>
              </div>

              {expanded === p.id && (
                <div style={{ borderTop: `1px solid ${theme.border}`, padding: '14px 16px', background: theme.cardAlt }}>
                  <div style={{ fontSize: 12, color: theme.textSub, lineHeight: 1.6, marginBottom: 12 }}>{p.explanation}</div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>All signals</div>
                    {p.signals.map(s => (
                      <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <div style={{ width: 5, height: 5, borderRadius: 3, background: levelColor(p.severity) }} />
                        <span style={{ fontSize: 12, color: theme.text }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  {p.action && (
                    <div style={{ background: levelBg(p.severity), border: `1px solid ${levelColor(p.severity)}30`, borderRadius: 12, padding: '10px 12px' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: levelColor(p.severity), marginBottom: 3 }}>RECOMMENDED ACTION</div>
                      <div style={{ fontSize: 12, color: theme.text, lineHeight: 1.5 }}>{p.action}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Log Screen
  const LogScreen = () => {
    const [selected, setSelected] = useState([]);
    const [intensity, setIntensity] = useState(3);
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const symptoms = [
      { id: 'fatigue', label: 'Fatigue', icon: 'Battery' },
      { id: 'headache', label: 'Headache', icon: 'Zap' },
      { id: 'nausea', label: 'Nausea', icon: 'AlertCircle' },
      { id: 'cough', label: 'Cough', icon: 'Wind' },
      { id: 'chills', label: 'Chills', icon: 'Thermometer' },
      { id: 'pain', label: 'Body Pain', icon: 'Activity' },
      { id: 'dizzy', label: 'Dizziness', icon: 'RefreshCw' },
      { id: 'appetite', label: 'Low Appetite', icon: 'Coffee' },
    ];

    const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

    if (submitted) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: theme.bg, padding: 32, ...fontBase }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: theme.primaryDim, border: `2px solid ${theme.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          {React.createElement(window.lucide.Check, { size: 36, color: theme.primary })}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 8, textAlign: 'center' }}>Entry Logged</div>
        <div style={{ fontSize: 14, color: theme.textSub, textAlign: 'center', lineHeight: 1.6, marginBottom: 24 }}>PulsePatch is analyzing your signals against your 30-day baseline.</div>
        <button onClick={() => { setSubmitted(false); setSelected([]); setNotes(''); setIntensity(3); }} style={{ background: theme.primaryDim, border: `1px solid ${theme.primary}40`, borderRadius: 14, padding: '12px 28px', cursor: 'pointer', ...fontBase }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: theme.primary }}>Log Another</span>
        </button>
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, ...fontBase }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Log Symptoms</div>
          <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>How are you feeling right now?</div>
        </div>

        <div style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Select Symptoms</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {symptoms.map(s => {
              const active = selected.includes(s.id);
              return (
                <button key={s.id} onClick={() => toggle(s.id)} style={{ background: active ? theme.primaryDim : theme.card, border: `1px solid ${active ? theme.primary : theme.border}`, borderRadius: 14, padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s', ...fontBase }}>
                  {React.createElement(window.lucide[s.icon], { size: 18, color: active ? theme.primary : theme.textSub })}
                  <span style={{ fontSize: 13, fontWeight: 600, color: active ? theme.primary : theme.text }}>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {selected.length > 0 && (
          <div style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Overall Intensity</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setIntensity(n)} style={{ flex: 1, padding: '10px 0', background: intensity >= n ? theme.primary : theme.card, border: `1px solid ${intensity >= n ? theme.primary : theme.border}`, borderRadius: 10, cursor: 'pointer', ...fontBase }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: intensity >= n ? '#fff' : theme.textSub }}>{n}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 10, color: theme.textMuted }}>Mild</span>
              <span style={{ fontSize: 10, color: theme.textMuted }}>Severe</span>
            </div>
          </div>
        )}

        <div style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Notes (Optional)</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any context? e.g. 'started after lunch', 'skipped medication this morning'..."
            style={{ width: '100%', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '12px 14px', fontSize: 13, color: theme.text, resize: 'none', height: 80, outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box', lineHeight: 1.5 }} />
        </div>

        {/* Context tags */}
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Quick Context</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['After meal', 'Morning', 'Post-exercise', 'Before meds', 'Stressed', 'Poor sleep'].map(tag => (
              <button key={tag} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '6px 12px', cursor: 'pointer', fontSize: 12, color: theme.textSub, fontWeight: 500, ...fontBase }}>{tag}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '8px 16px 24px' }}>
          <button onClick={() => setSubmitted(true)} disabled={selected.length === 0}
            style={{ width: '100%', background: selected.length > 0 ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` : theme.card, border: `1px solid ${selected.length > 0 ? 'transparent' : theme.border}`, borderRadius: 16, padding: 14, cursor: selected.length > 0 ? 'pointer' : 'not-allowed', opacity: selected.length > 0 ? 1 : 0.5, ...fontBase }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: selected.length > 0 ? '#fff' : theme.textMuted }}>Submit Entry</span>
          </button>
        </div>
      </div>
    );
  };

  // Insights Screen
  const InsightsScreen = () => {
    const [activeRange, setActiveRange] = useState('7d');

    const triggers = [
      { name: 'Poor sleep', count: 8, pct: 80, color: theme.warning },
      { name: 'Missed meds', count: 5, pct: 50, color: theme.danger },
      { name: 'High stress', count: 4, pct: 40, color: theme.secondary },
      { name: 'Travel', count: 3, pct: 30, color: theme.primary },
      { name: 'Caffeine', count: 2, pct: 20, color: theme.textSub },
    ];

    const episodes = [
      { date: 'Mar 18', title: 'HR Spike + Fatigue', duration: '3 days', resolved: true },
      { date: 'Mar 10', title: 'Respiratory Cluster', duration: '5 days', resolved: true },
      { date: 'Feb 28', title: 'Dehydration Pattern', duration: '2 days', resolved: true },
      { date: 'Feb 14', title: 'Stress Response', duration: '6 days', resolved: true },
    ];

    const hrData = [68, 71, 73, 70, 74, 72, 72];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxHR = Math.max(...hrData);
    const minHR = Math.min(...hrData);

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, ...fontBase }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Insights</div>
          <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>Trends & trigger analysis</div>
        </div>

        {/* Range picker */}
        <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 6 }}>
          {['7d', '30d', '90d'].map(r => (
            <button key={r} onClick={() => setActiveRange(r)} style={{ flex: 1, padding: '7px 0', background: activeRange === r ? theme.primary : theme.card, border: `1px solid ${activeRange === r ? theme.primary : theme.border}`, borderRadius: 10, cursor: 'pointer', ...fontBase }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: activeRange === r ? '#fff' : theme.textSub }}>{r}</span>
            </button>
          ))}
        </div>

        {/* HR Chart */}
        <div style={{ margin: '0 16px 16px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Resting Heart Rate</div>
              <div style={{ fontSize: 11, color: theme.textSub, marginTop: 2 }}>Baseline: 68 bpm</div>
            </div>
            <span style={{ fontSize: 11, color: theme.warning, background: theme.warningDim, padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>↑ Trending up</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 70 }}>
            {hrData.map((v, i) => {
              const h = ((v - minHR + 2) / (maxHR - minHR + 4)) * 60 + 10;
              const isHigh = v > 71;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: h, background: isHigh ? `linear-gradient(180deg, ${theme.warning}, ${theme.warning}80)` : `linear-gradient(180deg, ${theme.primary}, ${theme.primary}80)`, borderRadius: '6px 6px 4px 4px' }} />
                  <span style={{ fontSize: 10, color: theme.textMuted }}>{days[i]}</span>
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: `1px dashed ${theme.border}`, marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: theme.textSub }}>Avg: 71.4 bpm</span>
            <span style={{ fontSize: 11, color: theme.textSub }}>Peak: 74 bpm</span>
          </div>
        </div>

        {/* Triggers */}
        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.textSub, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Top Triggers</div>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {triggers.map(t => (
              <div key={t.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: theme.textSub, fontWeight: 500 }}>{t.count} events</span>
                </div>
                <div style={{ height: 6, background: theme.cardAlt, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: 4, transition: 'width 0.4s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Episode History */}
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.textSub, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Episode History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {episodes.map(e => (
              <div key={e.date} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: theme.textSub, marginTop: 2 }}>{e.date} · {e.duration}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: theme.safe, background: theme.safeDim, borderRadius: 8, padding: '3px 8px' }}>Resolved</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Settings Screen
  const SettingsScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [wearable, setWearable] = useState(true);
    const [docShare, setDocShare] = useState(false);

    const Toggle = ({ value, onChange }) => (
      <div onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? theme.primary : theme.border, cursor: 'pointer', transition: 'background 0.2s', position: 'relative' }}>
        <div style={{ width: 18, height: 18, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, ...fontBase }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Settings</div>
        </div>

        {/* Profile Card */}
        <div style={{ margin: '8px 16px 16px', background: `linear-gradient(135deg, ${theme.primary}18, ${theme.secondary}18)`, border: `1px solid ${theme.primary}30`, borderRadius: 20, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 26, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>A</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>Alex Rivera</div>
            <div style={{ fontSize: 12, color: theme.textSub, marginTop: 2 }}>alex.rivera@email.com</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: theme.primary, background: theme.primaryDim, borderRadius: 6, padding: '2px 8px' }}>30-day baseline</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: theme.secondary, background: theme.secondaryDim, borderRadius: 6, padding: '2px 8px' }}>2 conditions tracked</span>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div style={{ margin: '0 16px 16px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(themeKey === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: theme.primary })}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{themeKey === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ fontSize: 11, color: theme.textSub }}>App appearance</div>
              </div>
            </div>
            <Toggle value={themeKey === 'dark'} onChange={() => toggleTheme()} />
          </div>

          {[
            { label: 'Push Notifications', sub: 'Alert when patterns detected', value: notifs, set: setNotifs, icon: 'Bell' },
            { label: 'Wearable Sync', sub: 'Apple Watch / Fitbit connected', value: wearable, set: setWearable, icon: 'Watch' },
            { label: 'Doctor Sharing', sub: 'Share reports with clinician', value: docShare, set: setDocShare, icon: 'Share2' },
          ].map(row => (
            <div key={row.label} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide[row.icon], { size: 18, color: theme.textSub })}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{row.label}</div>
                  <div style={{ fontSize: 11, color: theme.textSub }}>{row.sub}</div>
                </div>
              </div>
              <Toggle value={row.value} onChange={row.set} />
            </div>
          ))}
        </div>

        {/* Conditions */}
        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.textSub, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 }}>Tracked Conditions</div>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, overflow: 'hidden' }}>
            {[{ name: 'Asthma', since: 'Since Jan 2024', icon: 'Wind', color: theme.secondary }, { name: 'Hypertension', since: 'Since Mar 2023', icon: 'Heart', color: theme.danger }].map((c, i) => (
              <div key={c.name} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i === 0 ? `1px solid ${theme.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(window.lucide[c.icon], { size: 18, color: c.color })}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: theme.textSub }}>{c.since}</div>
                  </div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })}
              </div>
            ))}
          </div>
        </div>

        {/* Version */}
        <div style={{ padding: '0 16px 32px', textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Activity, { size: 20, color: '#fff' })}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>PulsePatch</div>
          <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Version 1.0.0 · Your body's early warning whisper</div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'patterns', label: 'Patterns', icon: 'GitBranch' },
    { id: 'log', label: 'Log', icon: 'Plus' },
    { id: 'insights', label: 'Insights', icon: 'BarChart2' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', ...fontBase }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: theme.bg, borderRadius: 48, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 8px #2a2a3e, 0 0 0 10px #1a1a2e', position: 'relative' }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 126, height: 34, background: '#000', borderRadius: '0 0 22px 22px', zIndex: 50 }} />
        <StatusBar />
        {/* Screen Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginTop: 4 }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'patterns' && <PatternsScreen />}
          {activeTab === 'log' && <LogScreen />}
          {activeTab === 'insights' && <InsightsScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </div>
        {/* Bottom Navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 20px', borderTop: `1px solid ${theme.border}`, background: theme.navBg }}>
          {tabs.map(t => {
            const isActive = activeTab === t.id;
            const isLog = t.id === 'log';
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '0 8px', position: 'relative' }}>
                {isLog ? (
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -16, boxShadow: `0 4px 12px ${theme.primaryGlow}` }}>
                    {React.createElement(window.lucide[t.icon], { size: 22, color: '#fff' })}
                  </div>
                ) : (
                  <>
                    <div style={{ position: 'relative' }}>
                      {React.createElement(window.lucide[t.icon], { size: 22, color: isActive ? theme.primary : theme.textMuted })}
                      {isActive && <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: 2, background: theme.primary }} />}
                    </div>
                  </>
                )}
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isLog ? theme.textSub : isActive ? theme.primary : theme.textMuted, ...fontBase }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
