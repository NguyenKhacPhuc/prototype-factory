function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const themes = {
    light: {
      bg: '#F5F3FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE9FE',
      primary: '#7C3AED',
      primaryLight: '#EDE9FE',
      primaryDark: '#5B21B6',
      secondary: '#0891B2',
      secondaryLight: '#E0F2FE',
      text: '#170F2E',
      textSecondary: '#5B4F8A',
      textMuted: '#9D8FBE',
      border: '#E5DEFF',
      success: '#059669',
      successLight: '#D1FAE5',
      warning: '#D97706',
      warningLight: '#FEF3C7',
      danger: '#DC2626',
      dangerLight: '#FEE2E2',
      navBg: '#FFFFFF',
      cardShadow: '0 2px 12px rgba(124,58,237,0.07)',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #0891B2 100%)',
      gradientSoft: 'linear-gradient(135deg, #EDE9FE 0%, #E0F2FE 100%)',
    },
    dark: {
      bg: '#0D0920',
      surface: '#16102E',
      surfaceAlt: '#1F1640',
      primary: '#A78BFA',
      primaryLight: '#2D1F5C',
      primaryDark: '#7C3AED',
      secondary: '#22D3EE',
      secondaryLight: '#0C2D35',
      text: '#F0EBFF',
      textSecondary: '#BBA8F0',
      textMuted: '#6D5FA0',
      border: '#2A1F50',
      success: '#34D399',
      successLight: '#022C22',
      warning: '#FCD34D',
      warningLight: '#1C1002',
      danger: '#F87171',
      dangerLight: '#1C0404',
      navBg: '#16102E',
      cardShadow: '0 2px 16px rgba(0,0,0,0.5)',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #0891B2 100%)',
      gradientSoft: 'linear-gradient(135deg, #2D1F5C 0%, #0C2D35 100%)',
    },
  };

  const [activeTheme, setActiveTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const t = themes[activeTheme];

  const toggleTheme = () => setActiveTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Icon refs
  const HomeIcon = window.lucide.Home;
  const MicIcon = window.lucide.Mic;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const FileTextIcon = window.lucide.FileText;
  const SettingsIcon = window.lucide.Settings;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const BellIcon = window.lucide.Bell;
  const HeartIcon = window.lucide.Heart;
  const ActivityIcon = window.lucide.Activity;
  const CloudRainIcon = window.lucide.CloudRain;
  const WindIcon = window.lucide.Wind;
  const ZapIcon = window.lucide.Zap;
  const DropletIcon = window.lucide.Droplet;
  const CalendarIcon = window.lucide.Calendar;
  const ClockIcon = window.lucide.Clock;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const CheckCircleIcon = window.lucide.CheckCircle;
  const DownloadIcon = window.lucide.Download;
  const ShareIcon = window.lucide.Share2;
  const StarIcon = window.lucide.Star;
  const BrainIcon = window.lucide.Brain;
  const SmileIcon = window.lucide.Smile;
  const FrownIcon = window.lucide.Frown;
  const MehIcon = window.lucide.Meh;
  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  const PlusIcon = window.lucide.Plus;
  const RefreshCwIcon = window.lucide.RefreshCw;
  const ShieldIcon = window.lucide.Shield;
  const LinkIcon = window.lucide.Link;
  const EyeIcon = window.lucide.Eye;
  const ThermometerIcon = window.lucide.Thermometer;
  const AlertCircleIcon = window.lucide.AlertCircle;

  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'log', label: 'Log', icon: MicIcon },
    { id: 'insights', label: 'Insights', icon: TrendingUpIcon },
    { id: 'reports', label: 'Reports', icon: FileTextIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  // ── HOME SCREEN ─────────────────────────────────────────────
  function HomeScreen() {
    const [checkedIn, setCheckedIn] = useState(false);
    const [pressedAction, setPressedAction] = useState(null);
    const riskLevel = 68;

    const actions = [
      { action: 'Drink 2 glasses of water now', icon: DropletIcon, done: true, time: '8:30 AM', color: t.secondary },
      { action: 'Avoid screens 1 hr before bed', icon: EyeIcon, done: false, time: 'Tonight 9 PM', color: t.primary },
      { action: 'Take Sumatriptan if onset begins', icon: ZapIcon, done: false, time: 'On onset', color: t.danger },
      { action: 'Short walk (15 min) outside', icon: ActivityIcon, done: false, time: '2:00 PM', color: t.success },
    ];

    return (
      <div style={{ height: '100%', overflowY: 'auto', backgroundColor: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted, fontWeight: 500 }}>Good morning,</p>
            <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: t.text }}>Sarah</h2>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.cardShadow }}>
            <BellIcon size={17} color={t.primary} />
          </div>
        </div>

        {/* Flare Risk Card */}
        <div style={{ margin: '10px 20px 0', borderRadius: 22, background: t.gradient, padding: '18px 20px 16px', color: '#fff', boxShadow: '0 8px 28px rgba(124,58,237,0.35)' }}>
          <p style={{ margin: 0, fontSize: 10, opacity: 0.8, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Today's Flare Risk</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 52, fontWeight: 800, lineHeight: 1 }}>{riskLevel}%</span>
                <span style={{ fontSize: 14, opacity: 0.75, fontWeight: 500 }}>Moderate</span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 12, opacity: 0.75, lineHeight: 1.4 }}>Migraine risk elevated today.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '6px 10px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 10, opacity: 0.8 }}>Pollen</p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>HIGH</p>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '6px 10px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 10, opacity: 0.8 }}>Sleep</p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>5.2h</p>
              </div>
            </div>
          </div>
          {/* Risk bar */}
          <div style={{ marginTop: 14, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 100, height: 6 }}>
            <div style={{ width: `${riskLevel}%`, height: '100%', backgroundColor: '#fff', borderRadius: 100 }} />
          </div>
          {/* Factors */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {['↓ Sleep 5.2h', '⬆ Pollen HIGH', '↓ Pressure -3 hPa', '↑ Screen Time'].map(f => (
              <span key={f} style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 100, padding: '3px 9px', fontSize: 10, fontWeight: 600 }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Quick Check-in */}
        <div style={{ margin: '14px 20px 0', backgroundColor: t.surface, borderRadius: 18, padding: '15px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>Quick Check-in</h3>
            <span style={{ fontSize: 10, color: t.textMuted, backgroundColor: t.surfaceAlt, padding: '3px 8px', borderRadius: 100, fontWeight: 700 }}>~30 sec</span>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: t.textSecondary }}>How are you feeling right now?</p>
          {checkedIn ? (
            <div style={{ padding: '10px 12px', backgroundColor: t.successLight, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircleIcon size={15} color={t.success} />
              <span style={{ fontSize: 13, color: t.success, fontWeight: 700 }}>Logged! Updating your forecast...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: 'Good', Icon: SmileIcon, color: t.success },
                { label: 'Okay', Icon: MehIcon, color: t.warning },
                { label: 'Rough', Icon: FrownIcon, color: t.danger },
              ].map(({ label, Icon, color }) => (
                <button key={label} onClick={() => setCheckedIn(true)} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: `1.5px solid ${t.border}`, backgroundColor: t.bg, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, transition: 'all 0.15s' }}>
                  <Icon size={20} color={color} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.text }}>{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Today's Actions */}
        <div style={{ margin: '14px 20px 0' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: t.text }}>Today's Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {actions.map(({ action, icon: Icon, done, time, color }) => (
              <div key={action} onClick={() => setPressedAction(action)} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', backgroundColor: t.surface, borderRadius: 13, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, opacity: done ? 0.55 : 1, cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: done ? t.surfaceAlt : `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {done ? <CheckCircleIcon size={15} color={t.textMuted} /> : <Icon size={15} color={color} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: done ? t.textMuted : t.text, textDecoration: done ? 'line-through' : 'none' }}>{action}</p>
                  <p style={{ margin: 0, fontSize: 10, color: t.textMuted }}>{time}</p>
                </div>
                {!done && <ChevronRightIcon size={14} color={t.textMuted} />}
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Discovered */}
        <div style={{ margin: '14px 20px 20px', backgroundColor: t.primaryLight, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
            <BrainIcon size={15} color={t.primary} />
            <span style={{ fontSize: 12, fontWeight: 800, color: t.primary, letterSpacing: '0.3px' }}>Pattern Discovered</span>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.55 }}>
            "Your migraines are <strong style={{ color: t.text }}>3.4× more likely</strong> when sleep is under 6 hours and barometric pressure drops over 3 hPa."
          </p>
          <button style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: t.primary, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            View all insights →
          </button>
        </div>
      </div>
    );
  }

  // ── LOG SCREEN ───────────────────────────────────────────────
  function LogScreen() {
    const [recording, setRecording] = useState(false);
    const [severity, setSeverity] = useState(4);
    const [selectedSymptoms, setSelectedSymptoms] = useState(['Headache']);
    const [saved, setSaved] = useState(false);

    const symptoms = ['Headache', 'Nausea', 'Fatigue', 'Brain fog', 'Sensitivity', 'Dizziness', 'Visual aura', 'Neck tension'];

    const toggleSymptom = s => setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const severityColor = severity <= 3 ? t.success : severity <= 6 ? t.warning : t.danger;
    const severityLabel = severity <= 3 ? 'Mild' : severity <= 6 ? 'Moderate' : 'Severe';

    return (
      <div style={{ height: '100%', overflowY: 'auto', backgroundColor: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ padding: '16px 20px 6px' }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: t.text }}>Log Check-in</h2>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: t.textSecondary }}>Monday, March 23 · 9:14 AM</p>
        </div>

        {/* Voice Check-in */}
        <div style={{ margin: '12px 20px 0', backgroundColor: t.surface, borderRadius: 20, padding: '18px 18px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}`, textAlign: 'center' }}>
          <p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: t.text }}>Voice Check-in</p>
          <div
            onClick={() => setRecording(!recording)}
            style={{ width: 76, height: 76, borderRadius: 38, margin: '0 auto 10px', background: recording ? t.gradient : t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: recording ? '0 0 0 10px rgba(124,58,237,0.12), 0 0 0 20px rgba(124,58,237,0.06)' : 'none', transition: 'all 0.3s' }}
          >
            <MicIcon size={30} color={recording ? '#fff' : t.primary} />
          </div>
          <p style={{ margin: 0, fontSize: 12, color: recording ? t.primary : t.textMuted, fontWeight: recording ? 700 : 400 }}>
            {recording ? '● Recording... tap to stop' : 'Tap to start voice log'}
          </p>
          {recording && (
            <div style={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 24 }}>
              {[4, 9, 6, 14, 8, 18, 10, 16, 7, 12, 5, 9, 4].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, backgroundColor: t.primary, borderRadius: 2, opacity: 0.6 + (i % 4) * 0.1 }} />
              ))}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
            <div style={{ height: 1, flex: 1, backgroundColor: t.border }} />
            <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: '0.5px' }}>OR LOG MANUALLY</span>
            <div style={{ height: 1, flex: 1, backgroundColor: t.border }} />
          </div>
        </div>

        {/* Symptoms */}
        <div style={{ margin: '14px 20px 0' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: t.text }}>Symptoms</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {symptoms.map(s => (
              <button key={s} onClick={() => toggleSymptom(s)} style={{ padding: '7px 13px', borderRadius: 100, fontSize: 12, fontWeight: 600, border: `1.5px solid ${selectedSymptoms.includes(s) ? t.primary : t.border}`, backgroundColor: selectedSymptoms.includes(s) ? t.primaryLight : t.surface, color: selectedSymptoms.includes(s) ? t.primary : t.textSecondary, cursor: 'pointer', transition: 'all 0.15s' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Severity */}
        <div style={{ margin: '14px 20px 0', backgroundColor: t.surface, borderRadius: 16, padding: '14px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>Severity</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: severityColor }}>{severity}/10</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: severityColor, backgroundColor: `${severityColor}18`, padding: '2px 7px', borderRadius: 6 }}>{severityLabel}</span>
            </div>
          </div>
          <input type="range" min="1" max="10" value={severity} onChange={e => setSeverity(Number(e.target.value))} style={{ width: '100%', accentColor: t.primary, cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>Mild</span>
            <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>Severe</span>
          </div>
        </div>

        {/* Auto-captured Context */}
        <div style={{ margin: '14px 20px 0', backgroundColor: t.surface, borderRadius: 16, padding: '14px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
            <ZapIcon size={13} color={t.primary} />
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text }}>Auto-captured Context</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { Icon: CloudRainIcon, label: 'Weather', value: '62°F, Partly cloudy', sub: '↓ Pressure -3.2 hPa' },
              { Icon: ActivityIcon, label: 'Last Night Sleep', value: '5h 12min', sub: '2 interruptions detected' },
              { Icon: WindIcon, label: 'Air Quality', value: 'Pollen: HIGH', sub: 'AQI 87 — Moderate' },
              { Icon: HeartIcon, label: 'Heart Rate', value: '78 BPM avg', sub: 'HRV 32ms (low)' },
            ].map(({ Icon, label, value, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color={t.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 10, color: t.textMuted }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.text }}>{value}</p>
                </div>
                <span style={{ fontSize: 10, color: t.textSecondary, textAlign: 'right', maxWidth: 90 }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div style={{ margin: '14px 20px 20px' }}>
          {saved && (
            <div style={{ marginBottom: 10, padding: '10px 14px', backgroundColor: t.successLight, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircleIcon size={15} color={t.success} />
              <span style={{ fontSize: 12, color: t.success, fontWeight: 700 }}>Check-in saved! Forecast updated.</span>
            </div>
          )}
          <button onClick={handleSave} style={{ width: '100%', padding: '14px', borderRadius: 16, border: 'none', background: t.gradient, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 18px rgba(124,58,237,0.38)', letterSpacing: '0.2px' }}>
            Save Check-in
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: t.textMuted, marginTop: 7 }}>Updates your flare forecast in real time</p>
        </div>
      </div>
    );
  }

  // ── INSIGHTS SCREEN ──────────────────────────────────────────
  function InsightsScreen() {
    const [activeFilter, setActiveFilter] = useState('30d');

    const weekData = [
      { day: 'M', risk: 45, symptom: true },
      { day: 'T', risk: 62, symptom: false },
      { day: 'W', risk: 78, symptom: true },
      { day: 'T', risk: 55, symptom: false },
      { day: 'F', risk: 40, symptom: false },
      { day: 'S', risk: 35, symptom: false },
      { day: 'S', risk: 68, symptom: true },
    ];

    const triggers = [
      { trigger: 'Sleep under 6 hours', correlation: 84, Icon: ClockIcon, color: t.danger },
      { trigger: 'High pollen + low sleep', correlation: 79, Icon: WindIcon, color: t.warning },
      { trigger: 'Barometric drop > 3 hPa', correlation: 71, Icon: CloudRainIcon, color: t.secondary },
      { trigger: 'Evening screen time > 3h', correlation: 65, Icon: EyeIcon, color: t.primary },
      { trigger: 'Skipped or delayed meals', correlation: 58, Icon: CalendarIcon, color: t.warning },
    ];

    return (
      <div style={{ height: '100%', overflowY: 'auto', backgroundColor: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ padding: '16px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: t.text }}>Insights</h2>
          <div style={{ display: 'flex', gap: 4 }}>
            {['7d', '30d', '90d'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: activeFilter === f ? t.primary : t.surface, color: activeFilter === f ? '#fff' : t.textSecondary, transition: 'all 0.15s' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Trend Chart */}
        <div style={{ margin: '12px 20px 0', backgroundColor: t.surface, borderRadius: 20, padding: '16px 16px 14px', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>Risk Trend</h3>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: t.textMuted }}>This week · 3 migraine days</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: 10, color: t.textMuted }}>Avg risk</p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.primary }}>54%</p>
            </div>
          </div>
          {/* Bar chart */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 72 }}>
            {weekData.map(({ day, risk, symptom }) => (
              <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: `${risk * 0.72}px`, backgroundColor: risk > 70 ? t.danger : risk > 45 ? t.warning : t.success, borderRadius: '4px 4px 0 0', opacity: 0.85, position: 'relative', minHeight: 8, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                  {symptom && <div style={{ width: 5, height: 5, backgroundColor: '#fff', borderRadius: '50%', marginTop: -2.5, position: 'absolute', top: -3 }} />}
                </div>
                <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{day}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', border: `1.5px solid ${t.textMuted}`, backgroundColor: 'transparent' }} />
              <span style={{ fontSize: 10, color: t.textMuted }}>Symptom day</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 8, borderRadius: 2, backgroundColor: t.danger, opacity: 0.85 }} />
              <span style={{ fontSize: 10, color: t.textMuted }}>High risk</span>
            </div>
          </div>
        </div>

        {/* Top Triggers */}
        <div style={{ margin: '14px 20px 0' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: t.text }}>Your Top Triggers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {triggers.map(({ trigger, correlation, Icon, color }) => (
              <div key={trigger} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', backgroundColor: t.surface, borderRadius: 13, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: `${color}16`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 5px', fontSize: 12, fontWeight: 600, color: t.text }}>{trigger}</p>
                  <div style={{ backgroundColor: t.surfaceAlt, borderRadius: 100, height: 5 }}>
                    <div style={{ width: `${correlation}%`, height: '100%', backgroundColor: color, borderRadius: 100, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: color, flexShrink: 0 }}>{correlation}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plain Language Insights */}
        <div style={{ margin: '14px 20px 0' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: t.text }}>Plain Language Insights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { insight: 'Your headaches spike when sleep is under 6 hours and pollen is high.', confidence: 'High confidence · 47 data points', tag: 'MIGRAINE', tagColor: t.danger },
              { insight: 'Attacks are 2.8× more likely on days when barometric pressure drops by more than 3 hPa.', confidence: 'High confidence · 31 data points', tag: 'MIGRAINE', tagColor: t.danger },
              { insight: 'Taking Sumatriptan within 30 min of onset reduces episode duration by ~65%.', confidence: 'Medium confidence · 12 data points', tag: 'MEDICATION', tagColor: t.success },
            ].map(({ insight, confidence, tag, tagColor }) => (
              <div key={insight} style={{ padding: '13px 14px', backgroundColor: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <p style={{ margin: 0, fontSize: 12, color: t.text, lineHeight: 1.55, flex: 1 }}>"{insight}"</p>
                  <span style={{ fontSize: 9, fontWeight: 800, color: tagColor, backgroundColor: `${tagColor}16`, padding: '3px 7px', borderRadius: 5, flexShrink: 0, letterSpacing: '0.3px' }}>{tag}</span>
                </div>
                <p style={{ margin: '7px 0 0', fontSize: 10, color: t.textMuted }}>{confidence}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Stats */}
        <div style={{ margin: '14px 20px 20px', backgroundColor: t.surface, borderRadius: 16, padding: '14px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
          <h3 style={{ margin: '0 0 11px', fontSize: 14, fontWeight: 700, color: t.text }}>March Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Migraine Days', value: '7', Icon: HeartIcon, color: t.danger },
              { label: 'Avg Risk Score', value: '54%', Icon: ActivityIcon, color: t.warning },
              { label: 'Check-in Streak', value: '12d', Icon: StarIcon, color: t.primary },
              { label: 'Avg Sleep', value: '6.1h', Icon: ClockIcon, color: t.secondary },
            ].map(({ label, value, Icon, color }) => (
              <div key={label} style={{ padding: '11px 12px', backgroundColor: t.surfaceAlt, borderRadius: 11, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={17} color={color} />
                <div>
                  <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: t.text }}>{value}</p>
                  <p style={{ margin: 0, fontSize: 10, color: t.textMuted }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── REPORTS SCREEN ───────────────────────────────────────────
  function ReportsScreen() {
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);

    const generate = () => {
      setGenerating(true);
      setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
    };

    const pastReports = [
      { title: 'February 2026', date: 'Feb 28, 2026', episodes: 5, pages: 4 },
      { title: 'January 2026', date: 'Jan 31, 2026', episodes: 8, pages: 5 },
      { title: 'December 2025', date: 'Dec 31, 2025', episodes: 6, pages: 4 },
      { title: 'November 2025', date: 'Nov 30, 2025', episodes: 4, pages: 3 },
    ];

    return (
      <div style={{ height: '100%', overflowY: 'auto', backgroundColor: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ padding: '16px 20px 6px' }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: t.text }}>Reports</h2>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: t.textSecondary }}>Clinician-ready summaries</p>
        </div>

        {/* Generate Card */}
        <div style={{ margin: '12px 20px 0', borderRadius: 22, background: t.gradient, padding: '18px 20px', color: '#fff', boxShadow: '0 8px 28px rgba(124,58,237,0.3)' }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>Generate New Report</h3>
          <p style={{ margin: '0 0 14px', fontSize: 12, opacity: 0.8, lineHeight: 1.5 }}>Summarize the last 30 days of symptoms, triggers, and medication response for your next appointment.</p>
          <button onClick={generate} style={{ padding: '10px 18px', borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(4px)' }}>
            {generating
              ? React.createElement(RefreshCwIcon, { size: 15 })
              : React.createElement(FileTextIcon, { size: 15 })
            }
            {generating ? 'Generating report...' : 'Generate Report'}
          </button>
        </div>

        {/* Generated Preview */}
        {generated && (
          <div style={{ margin: '12px 20px 0', backgroundColor: t.surface, borderRadius: 18, padding: '15px 16px', border: `2px solid ${t.primary}`, boxShadow: `0 0 0 4px ${t.primaryLight}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <p style={{ margin: 0, fontSize: 10, color: t.primary, fontWeight: 800, letterSpacing: '0.6px' }}>NEW REPORT READY</p>
                <h3 style={{ margin: '3px 0 0', fontSize: 15, fontWeight: 800, color: t.text }}>March 2026 Summary</h3>
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                {[ShareIcon, DownloadIcon].map((Icon, i) => (
                  <button key={i} style={{ width: 32, height: 32, borderRadius: 9, border: `1px solid ${t.border}`, backgroundColor: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Icon size={13} color={t.textSecondary} />
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 11 }}>
              {['7 migraine days', '54% avg risk', '12-day streak', 'Sumatriptan ×5'].map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 700, color: t.textSecondary, backgroundColor: t.surfaceAlt, padding: '3px 8px', borderRadius: 6 }}>{tag}</span>
              ))}
            </div>
            <div style={{ padding: '11px 12px', backgroundColor: t.surfaceAlt, borderRadius: 10 }}>
              <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
                <strong style={{ color: t.text }}>Key finding:</strong> Migraine frequency increased by 2 episodes vs February. Primary triggers: sleep deprivation (84% correlation) and barometric drops. Sumatriptan showed 65% efficacy when taken within 30 min of onset.
              </p>
            </div>
          </div>
        )}

        {/* Past Reports */}
        <div style={{ margin: '14px 20px 0' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: t.text }}>Past Reports</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {pastReports.map(({ title, date, episodes, pages }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', backgroundColor: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
                <div style={{ width: 40, height: 44, borderRadius: 9, backgroundColor: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileTextIcon size={17} color={t.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text }}>{title}</p>
                  <p style={{ margin: 0, fontSize: 10, color: t.textMuted }}>{date} · {episodes} episodes · {pages} pages</p>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[ShareIcon, DownloadIcon].map((Icon, i) => (
                    <button key={i} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${t.border}`, backgroundColor: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Icon size={12} color={t.textSecondary} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share with Doctor */}
        <div style={{ margin: '14px 20px 20px', backgroundColor: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ShieldIcon size={16} color={t.primary} />
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text }}>Share with Your Doctor</h3>
          </div>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.5 }}>
            Generate a secure link or PDF for your care team. Data shared only with your explicit consent.
          </p>
          <button style={{ width: '100%', padding: '11px', borderRadius: 12, border: `1.5px solid ${t.primary}`, backgroundColor: t.primaryLight, color: t.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <LinkIcon size={14} />
            Create Secure Share Link
          </button>
        </div>
      </div>
    );
  }

  // ── SETTINGS SCREEN ──────────────────────────────────────────
  function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [wearable, setWearable] = useState(true);
    const [weather, setWeather] = useState(true);

    const Toggle = ({ value, onToggle }) => (
      <div onClick={onToggle} style={{ width: 42, height: 24, borderRadius: 12, backgroundColor: value ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff', position: 'absolute', top: 3, left: value ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
      </div>
    );

    return (
      <div style={{ height: '100%', overflowY: 'auto', backgroundColor: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ padding: '16px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: t.text }}>Settings</h2>
          <button onClick={toggleTheme} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: t.cardShadow }}>
            {activeTheme === 'light'
              ? React.createElement(MoonIcon, { size: 17, color: t.primary })
              : React.createElement(SunIcon, { size: 17, color: t.primary })
            }
          </button>
        </div>

        {/* Profile */}
        <div style={{ margin: '12px 20px 0', backgroundColor: t.surface, borderRadius: 16, padding: '14px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 19, color: '#fff', fontWeight: 800 }}>S</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Sarah Mitchell</h3>
              <p style={{ margin: 0, fontSize: 11, color: t.textMuted }}>sarah.m@email.com</p>
            </div>
            <ChevronRightIcon size={17} color={t.textMuted} />
          </div>
        </div>

        {/* My Conditions */}
        <div style={{ margin: '14px 20px 0' }}>
          <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 800, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.7px' }}>My Conditions</p>
          <div style={{ backgroundColor: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
            {['Chronic Migraine', 'Endometriosis'].map((cond, i) => (
              <div key={cond} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 15px', borderBottom: i === 0 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: i === 0 ? t.danger : t.primary, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: t.text }}>{cond}</span>
                <ChevronRightIcon size={15} color={t.textMuted} />
              </div>
            ))}
            <div style={{ padding: '11px 15px', borderTop: `1px solid ${t.border}` }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: t.primary, fontSize: 12, fontWeight: 700 }}>
                <PlusIcon size={14} />Add condition
              </button>
            </div>
          </div>
        </div>

        {/* Connected Devices */}
        <div style={{ margin: '14px 20px 0' }}>
          <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 800, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Connected Devices</p>
          <div style={{ backgroundColor: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
            {[
              { name: 'Apple Watch Series 9', status: 'Connected', Icon: ActivityIcon },
              { name: 'iPhone Health App', status: 'Connected', Icon: HeartIcon },
            ].map(({ name, status, Icon }, i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 15px', borderBottom: i === 0 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} color={t.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.text }}>{name}</p>
                  <p style={{ margin: 0, fontSize: 10, color: t.success, fontWeight: 600 }}>{status}</p>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: t.success }} />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div style={{ margin: '14px 20px 0' }}>
          <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 800, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Preferences</p>
          <div style={{ backgroundColor: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
            {[
              { label: 'Push Notifications', value: notifications, toggle: () => setNotifications(p => !p) },
              { label: 'Wearable Sync', value: wearable, toggle: () => setWearable(p => !p) },
              { label: 'Weather & Pollen Data', value: weather, toggle: () => setWeather(p => !p) },
            ].map(({ label, value, toggle }, i, arr) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 15px', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: t.text }}>{label}</span>
                <Toggle value={value} onToggle={toggle} />
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div style={{ margin: '14px 20px 0' }}>
          <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 800, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Appearance</p>
          <div style={{ backgroundColor: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, padding: '12px 15px', boxShadow: t.cardShadow }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: t.text }}>Theme</span>
              <div style={{ display: 'flex', gap: 6, backgroundColor: t.surfaceAlt, borderRadius: 10, padding: 3 }}>
                {['light', 'dark'].map(val => (
                  <button key={val} onClick={() => setActiveTheme(val)} style={{ padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: activeTheme === val ? t.primary : 'transparent', color: activeTheme === val ? '#fff' : t.textSecondary, transition: 'all 0.15s', textTransform: 'capitalize' }}>
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div style={{ margin: '14px 20px 20px', backgroundColor: t.surface, borderRadius: 14, padding: '12px 15px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <ShieldIcon size={15} color={t.success} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ margin: 0, fontSize: 11, color: t.textSecondary, lineHeight: 1.55 }}>Your health data is end-to-end encrypted and stored on your device. Never sold or shared without explicit consent.</p>
        </div>
      </div>
    );
  }

  const screens = {
    home: HomeScreen,
    log: LogScreen,
    insights: InsightsScreen,
    reports: ReportsScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e8e4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 20 }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, backgroundColor: t.bg, borderRadius: 50, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Status Bar */}
        <div style={{ height: 44, backgroundColor: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', flexShrink: 0, position: 'relative' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>9:41</span>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 118, height: 32, backgroundColor: '#000', borderRadius: 18 }} />
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <WifiIcon size={13} color={t.text} />
            <BatteryIcon size={14} color={t.text} />
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{ height: 78, backgroundColor: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'flex-start', paddingTop: 6, flexShrink: 0, boxShadow: `0 -4px 20px rgba(0,0,0,0.05)` }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '5px 0' }}
              >
                <div style={{ width: 40, height: 26, borderRadius: 13, backgroundColor: isActive ? t.primaryLight : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {React.createElement(tab.icon, { size: 19, color: isActive ? t.primary : t.textMuted })}
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 800 : 500, color: isActive ? t.primary : t.textMuted, transition: 'color 0.15s' }}>
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
