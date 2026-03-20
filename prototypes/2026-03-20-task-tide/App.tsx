function App() {
  const { useState, useEffect, useRef } = React;

  // Icons
  const HomeIcon = window.lucide.Home;
  const PlusIcon = window.lucide.Plus;
  const ZapIcon = window.lucide.Zap;
  const CheckIcon = window.lucide.Check;
  const CalendarIcon = window.lucide.Calendar;
  const MicIcon = window.lucide.Mic;
  const CameraIcon = window.lucide.Camera;
  const TypeIcon = window.lucide.Type;
  const ArrowRightIcon = window.lucide.ArrowRight;
  const ArrowLeftIcon = window.lucide.ArrowLeft;
  const ClockIcon = window.lucide.Clock;
  const BrainIcon = window.lucide.Brain;
  const WavesIcon = window.lucide.Waves;
  const SlidersIcon = window.lucide.Sliders;
  const TagIcon = window.lucide.Tag;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const RefreshCwIcon = window.lucide.RefreshCw;
  const XIcon = window.lucide.X;
  const FilterIcon = window.lucide.Filter;
  const MapPinIcon = window.lucide.MapPin;
  const UsersIcon = window.lucide.Users;
  const BatteryFullIcon = window.lucide.BatteryFull;
  const WifiIcon = window.lucide.Wifi;
  const SignalIcon = window.lucide.Signal;
  const SparklesIcon = window.lucide.Sparkles;
  const AlertCircleIcon = window.lucide.AlertCircle;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const PlayIcon = window.lucide.Play;
  const MoreHorizontalIcon = window.lucide.MoreHorizontal;

  const [activeTab, setActiveTab] = useState('home');
  const [recoveryStep, setRecoveryStep] = useState(0);
  const [recoveryAnswers, setRecoveryAnswers] = useState(['', '', '']);
  const [recoveryDone, setRecoveryDone] = useState(false);
  const [actionFilter, setActionFilter] = useState('now');
  const [captureMode, setCaptureMode] = useState('type');
  const [captureText, setCaptureText] = useState('');
  const [recentCaptures, setRecentCaptures] = useState([
    { id: 1, text: 'Call Dr. Mehta about lab results', time: '2m ago', sorted: false },
    { id: 2, text: 'Pick up milk + check if we need coffee', time: '14m ago', sorted: true },
    { id: 3, text: 'Slack Alex re: budget approval', time: '32m ago', sorted: true },
  ]);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [showCaptureSuccess, setShowCaptureSuccess] = useState(false);
  const [tideLevel, setTideLevel] = useState(65);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const colors = {
    bg: '#080D1A',
    surface: '#0F1829',
    surface2: '#162034',
    surface3: '#1D2B42',
    primary: '#38BDF8',
    primaryDim: '#0C3F5C',
    secondary: '#34D399',
    secondaryDim: '#0A3D2B',
    accent: '#A78BFA',
    accentDim: '#2D1F5A',
    warning: '#FBBF24',
    warningDim: '#3D2F08',
    danger: '#F87171',
    dangerDim: '#3D1515',
    text: '#F1F5F9',
    textMuted: '#64748B',
    textSoft: '#94A3B8',
    border: '#1E2D42',
    borderLight: '#243447',
  };

  const fonts = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    input, textarea { outline: none; border: none; background: transparent; font-family: 'DM Sans', sans-serif; }
    @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes waveAnim { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.4); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
    @keyframes spinPulse { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes tideWave { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-10px); } }
  `;

  const press = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 150); };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  });

  // ─── STATUS BAR ───────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px 0', height: '44px' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: colors.text, fontFamily: 'DM Mono, monospace', letterSpacing: 0.3 }}>{currentTime || '9:41 AM'}</span>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0 }} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <SignalIcon size={12} color={colors.text} />
        <WifiIcon size={12} color={colors.text} />
        <BatteryFullIcon size={14} color={colors.text} />
      </div>
    </div>
  );

  // ─── BOTTOM NAV ───────────────────────────────────────────────────────────
  const BottomNav = () => {
    const tabs = [
      { id: 'home', icon: WavesIcon, label: 'Tide' },
      { id: 'capture', icon: PlusIcon, label: 'Capture' },
      { id: 'recovery', icon: BrainIcon, label: 'Recover' },
      { id: 'actions', icon: ZapIcon, label: 'Actions' },
      { id: 'schedule', icon: CalendarIcon, label: 'Schedule' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 84, background: colors.surface, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'flex-start', paddingTop: 10, paddingBottom: 8, backdropFilter: 'blur(20px)' }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <div key={t.id} onClick={() => { press(`nav-${t.id}`); setActiveTab(t.id); if (t.id === 'recovery') { setRecoveryStep(0); setRecoveryDone(false); setRecoveryAnswers(['', '', '']); } }}
              style={btnStyle(`nav-${t.id}`, { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' })}>
              <div style={{ width: 44, height: 30, borderRadius: 14, background: active ? colors.primaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}>
                {t.id === 'capture'
                  ? <div style={{ width: 28, height: 28, borderRadius: '50%', background: active ? colors.primary : colors.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active ? `0 0 12px ${colors.primary}66` : 'none' }}>
                      <Icon size={14} color={active ? '#000' : colors.textMuted} />
                    </div>
                  : <Icon size={18} color={active ? colors.primary : colors.textMuted} strokeWidth={active ? 2.5 : 1.8} />
                }
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? colors.primary : colors.textMuted, letterSpacing: 0.2 }}>{t.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── SCREEN: HOME ─────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const [waveAnim, setWaveAnim] = useState(false);
    useEffect(() => { const t = setTimeout(() => setWaveAnim(true), 100); return () => clearTimeout(t); }, []);

    const interruptions = [
      { label: 'Slack from Priya', type: 'message', ago: '4m', urgency: 'high' },
      { label: 'Budget doc needs review', type: 'task', ago: '18m', urgency: 'medium' },
      { label: 'Pick up Ben at 5pm', type: 'reminder', ago: '1h', urgency: 'low' },
    ];

    const urgencyColor = (u) => ({ high: colors.danger, medium: colors.warning, low: colors.secondary }[u]);
    const urgencyBg = (u) => ({ high: colors.dangerDim, medium: colors.warningDim, low: colors.secondaryDim }[u]);

    const tideColor = tideLevel > 70 ? colors.danger : tideLevel > 40 ? colors.warning : colors.secondary;
    const tideLabel = tideLevel > 70 ? 'High Tide' : tideLevel > 40 ? 'Rising' : 'Calm';
    const tideDesc = tideLevel > 70 ? 'Many open loops — time to sort' : tideLevel > 40 ? 'A few things building up' : 'You\'re in good shape';

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
        {/* Header */}
        <div style={{ animation: 'fadeSlideUp 0.4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 13, color: colors.textMuted, fontWeight: 400, marginBottom: 2 }}>Good afternoon</p>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.text, lineHeight: 1.2 }}>Sarah</h1>
            </div>
            <div onClick={() => { press('avatar'); }} style={btnStyle('avatar', { width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' })}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>S</span>
            </div>
          </div>

          {/* Tide Meter */}
          <div style={{ background: colors.surface, borderRadius: 20, padding: '18px 20px', marginBottom: 16, border: `1px solid ${colors.border}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(135deg, ${tideColor}08, transparent)`, borderRadius: 20 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, position: 'relative' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: tideColor, boxShadow: `0 0 8px ${tideColor}` }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: tideColor, letterSpacing: 0.5, textTransform: 'uppercase' }}>{tideLabel}</span>
                </div>
                <p style={{ fontSize: 12, color: colors.textMuted }}>{tideDesc}</p>
              </div>
              <span style={{ fontSize: 28, fontWeight: 700, color: tideColor }}>{tideLevel}%</span>
            </div>
            {/* Wave bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32, position: 'relative' }}>
              {Array.from({ length: 20 }).map((_, i) => {
                const h = 8 + Math.sin(i * 0.7) * 6 + Math.random() * 4;
                const filled = (i / 20) * 100 < tideLevel;
                return (
                  <div key={i} style={{ flex: 1, height: h + 'px', borderRadius: 3, background: filled ? tideColor : colors.surface3, opacity: filled ? 0.7 + i * 0.015 : 0.3, transition: 'all 0.3s ease', animationName: waveAnim && filled ? 'waveAnim' : 'none', animationDuration: `${1.2 + i * 0.05}s`, animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: `${i * 0.05}s` }} />
                );
              })}
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {[
              { n: '7', label: 'Captured', color: colors.accent, icon: TagIcon },
              { n: '3', label: 'Done today', color: colors.secondary, icon: CheckIcon },
              { n: '2', label: 'In focus', color: colors.primary, icon: ZapIcon },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ flex: 1, background: colors.surface, borderRadius: 16, padding: '12px 10px', border: `1px solid ${colors.border}`, textAlign: 'center', animation: `fadeSlideUp ${0.4 + i * 0.1}s ease` }}>
                  <Icon size={16} color={s.color} style={{ marginBottom: 6 }} />
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 3, fontWeight: 500 }}>{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <div onClick={() => { press('q-capture'); setActiveTab('capture'); }}
              style={btnStyle('q-capture', { flex: 1, background: colors.primary, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' })}>
              <PlusIcon size={16} color="#000" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#000' }}>Quick Capture</span>
            </div>
            <div onClick={() => { press('q-recover'); setActiveTab('recovery'); setRecoveryStep(0); setRecoveryDone(false); setRecoveryAnswers(['', '', '']); }}
              style={btnStyle('q-recover', { flex: 1, background: colors.surface2, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', border: `1px solid ${colors.border}` })}>
              <BrainIcon size={16} color={colors.accent} />
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Recover</span>
            </div>
          </div>

          {/* Recent Interruptions */}
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 0.2 }}>Recent Interruptions</span>
              <span style={{ fontSize: 11, color: colors.primary, fontWeight: 600 }}>See all</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {interruptions.map((item, i) => (
                <div key={i} style={{ background: colors.surface, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${colors.border}`, animation: `fadeSlideUp ${0.5 + i * 0.1}s ease` }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: urgencyColor(item.urgency), boxShadow: `0 0 6px ${urgencyColor(item.urgency)}66`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: colors.text, fontWeight: 500, marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontSize: 11, color: colors.textMuted }}>{item.ago} ago · {item.type}</p>
                  </div>
                  <div style={{ padding: '3px 8px', borderRadius: 8, background: urgencyBg(item.urgency) }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: urgencyColor(item.urgency), textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.urgency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Reset CTA */}
          <div onClick={() => { press('focus-reset'); setActiveTab('recovery'); setRecoveryStep(0); setRecoveryDone(false); setRecoveryAnswers(['', '', '']); }}
            style={btnStyle('focus-reset', { marginTop: 16, background: `linear-gradient(135deg, ${colors.accentDim}, ${colors.surface2})`, borderRadius: 16, padding: '14px 16px', border: `1px solid ${colors.accent}44`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' })}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: colors.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCwIcon size={18} color={colors.accent} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 2 }}>5-Minute Focus Reset</p>
              <p style={{ fontSize: 11, color: colors.textMuted }}>Restart your momentum now</p>
            </div>
            <PlayIcon size={16} color={colors.accent} />
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: CAPTURE ──────────────────────────────────────────────────────
  const CaptureScreen = () => {
    const [localText, setLocalText] = useState(captureText);
    const [recording, setRecording] = useState(false);
    const [recordingSecs, setRecordingSecs] = useState(0);
    const timerRef = useRef(null);

    const handleAdd = () => {
      if (!localText.trim()) return;
      press('add-cap');
      const newCapture = { id: Date.now(), text: localText, time: 'just now', sorted: false };
      setRecentCaptures(prev => [newCapture, ...prev]);
      setLocalText('');
      setCaptureText('');
      setShowCaptureSuccess(true);
      setTideLevel(prev => Math.min(100, prev + 5));
      setTimeout(() => setShowCaptureSuccess(false), 2000);
    };

    const startRecording = () => {
      setRecording(true);
      setRecordingSecs(0);
      timerRef.current = setInterval(() => setRecordingSecs(s => s + 1), 1000);
    };
    const stopRecording = () => {
      setRecording(false);
      clearInterval(timerRef.current);
      setLocalText('Call mom about Thanksgiving plans and check if we have enough parking');
    };

    useEffect(() => () => clearInterval(timerRef.current), []);

    const modes = [
      { id: 'type', icon: TypeIcon, label: 'Type' },
      { id: 'voice', icon: MicIcon, label: 'Voice' },
      { id: 'photo', icon: CameraIcon, label: 'Photo' },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
        <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Capture</h2>
            <p style={{ fontSize: 13, color: colors.textMuted }}>Dump it now, sort it later</p>
          </div>

          {/* Mode Selector */}
          <div style={{ display: 'flex', background: colors.surface, borderRadius: 14, padding: 4, marginBottom: 16, border: `1px solid ${colors.border}` }}>
            {modes.map(m => {
              const Icon = m.icon;
              const active = captureMode === m.id;
              return (
                <div key={m.id} onClick={() => { press(`mode-${m.id}`); setCaptureMode(m.id); }}
                  style={btnStyle(`mode-${m.id}`, { flex: 1, padding: '8px 0', borderRadius: 10, background: active ? colors.primary : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'all 0.2s ease' })}>
                  <Icon size={16} color={active ? '#000' : colors.textMuted} />
                  <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? '#000' : colors.textMuted }}>{m.label}</span>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          {captureMode === 'type' && (
            <div style={{ background: colors.surface, borderRadius: 16, border: `1.5px solid ${localText ? colors.primary + '66' : colors.border}`, padding: 16, marginBottom: 16, transition: 'border-color 0.2s ease' }}>
              <textarea
                value={localText}
                onChange={e => setLocalText(e.target.value)}
                placeholder="What's on your mind? A half-thought is fine…"
                style={{ width: '100%', minHeight: 100, resize: 'none', fontSize: 15, color: colors.text, lineHeight: 1.6, background: 'transparent', fontFamily: 'DM Sans, sans-serif', letterSpacing: 0.1 }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 11, color: colors.textMuted }}>{localText.length} chars</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {localText && <div onClick={() => setLocalText('')} style={{ padding: '6px 12px', borderRadius: 10, cursor: 'pointer' }}><XIcon size={14} color={colors.textMuted} /></div>}
                  <div onClick={handleAdd}
                    style={btnStyle('add-cap', { padding: '8px 18px', borderRadius: 10, background: localText ? colors.primary : colors.surface3, cursor: localText ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 6 })}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: localText ? '#000' : colors.textMuted }}>Add</span>
                    {localText && <ArrowRightIcon size={12} color="#000" />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {captureMode === 'voice' && (
            <div style={{ background: colors.surface, borderRadius: 16, border: `1.5px solid ${recording ? colors.danger + '66' : colors.border}`, padding: 24, marginBottom: 16, textAlign: 'center' }}>
              {!recording ? (
                <div>
                  <div onClick={startRecording} style={btnStyle('rec-start', { width: 72, height: 72, borderRadius: '50%', background: colors.dangerDim, border: `2px solid ${colors.danger}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', cursor: 'pointer' })}>
                    <MicIcon size={28} color={colors.danger} />
                  </div>
                  <p style={{ fontSize: 13, color: colors.textMuted }}>Tap to start recording</p>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 4, height: 40, marginBottom: 12 }}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} style={{ width: 4, borderRadius: 2, background: colors.danger, animationName: 'waveAnim', animationDuration: `${0.6 + i * 0.08}s`, animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: `${i * 0.07}s`, height: 8 + Math.random() * 20 }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 20, fontWeight: 700, color: colors.danger, fontFamily: 'DM Mono, monospace', marginBottom: 4 }}>
                    0:{String(recordingSecs).padStart(2, '0')}
                  </p>
                  <p style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>Recording...</p>
                  <div onClick={stopRecording} style={btnStyle('rec-stop', { padding: '10px 24px', borderRadius: 12, background: colors.danger, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' })}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: '#000' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#000' }}>Stop</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {captureMode === 'photo' && (
            <div style={{ background: colors.surface, borderRadius: 16, border: `1.5px dashed ${colors.border}`, padding: 24, marginBottom: 16, textAlign: 'center' }}>
              <CameraIcon size={32} color={colors.textMuted} style={{ marginBottom: 12 }} />
              <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>Snap a whiteboard, sticky note, or screenshot</p>
              <div style={{ padding: '10px 20px', borderRadius: 12, background: colors.surface2, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', border: `1px solid ${colors.border}` }}>
                <CameraIcon size={14} color={colors.primary} />
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.primary }}>Open Camera</span>
              </div>
            </div>
          )}

          {showCaptureSuccess && (
            <div style={{ background: colors.secondaryDim, border: `1px solid ${colors.secondary}44`, borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10, animation: 'popIn 0.2s ease' }}>
              <CheckIcon size={16} color={colors.secondary} />
              <span style={{ fontSize: 13, color: colors.secondary, fontWeight: 600 }}>Captured! It'll get sorted soon.</span>
            </div>
          )}

          {/* Recent Captures */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Recent Captures</span>
              <span style={{ fontSize: 11, color: colors.textMuted }}>{recentCaptures.length} items</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentCaptures.map((c, i) => (
                <div key={c.id} style={{ background: colors.surface, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 10, border: `1px solid ${c.sorted ? colors.secondaryDim : colors.border}`, animation: `fadeSlideUp ${0.1 + i * 0.08}s ease` }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.sorted ? colors.secondaryDim : colors.surface3, border: `1.5px solid ${c.sorted ? colors.secondary : colors.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 }}>
                    {c.sorted && <CheckIcon size={10} color={colors.secondary} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: c.sorted ? colors.textMuted : colors.text, fontWeight: 500, marginBottom: 2, textDecoration: c.sorted ? 'none' : 'none' }}>{c.text}</p>
                    <p style={{ fontSize: 10, color: colors.textMuted }}>{c.time} · {c.sorted ? 'sorted' : 'unsorted'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: RECOVERY ─────────────────────────────────────────────────────
  const RecoveryScreen = () => {
    const [localAnswers, setLocalAnswers] = useState([...recoveryAnswers]);
    const steps = [
      {
        q: 'What were you working on?',
        hint: 'e.g. "Writing the Q3 report" or "planning dinner"',
        icon: BrainIcon,
        color: colors.accent,
        suggestions: ['Q3 budget report', 'Client proposal', 'Email catchup', 'Project planning'],
      },
      {
        q: 'What interrupted you?',
        hint: 'e.g. "A Slack message" or "phone call from school"',
        icon: AlertCircleIcon,
        color: colors.warning,
        suggestions: ['Slack notification', 'Unexpected meeting', 'Phone call', 'Fire drill task'],
      },
      {
        q: 'What would count as progress?',
        hint: 'e.g. "Finishing the intro section" or "sending 3 emails"',
        icon: TrendingUpIcon,
        color: colors.secondary,
        suggestions: ['Finish one section', 'Send a key email', 'Make a decision', 'Clear 10 minutes of work'],
      },
    ];

    const setAnswer = (val) => {
      const copy = [...localAnswers];
      copy[recoveryStep] = val;
      setLocalAnswers(copy);
    };

    const advance = () => {
      const copy = [...localAnswers];
      setRecoveryAnswers(copy);
      if (recoveryStep < 2) setRecoveryStep(recoveryStep + 1);
      else { setRecoveryDone(true); }
    };

    const step = steps[recoveryStep] || steps[0];
    const StepIcon = step.icon;

    if (recoveryDone) {
      const plan = [
        { time: '2 min', action: 'Close all tabs except the report doc', effort: 'low' },
        { time: '3 min', action: 'Re-read your last paragraph to rebuild context', effort: 'low' },
        { time: '5 min', action: `Complete: ${localAnswers[2] || 'your next step'}`, effort: 'medium' },
      ];
      return (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
          <div style={{ animation: 'popIn 0.3s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: colors.secondaryDim, border: `2px solid ${colors.secondary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <SparklesIcon size={24} color={colors.secondary} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 6 }}>Recovery Plan Ready</h2>
              <p style={{ fontSize: 13, color: colors.textMuted }}>Your 10-minute restart sequence</p>
            </div>

            <div style={{ background: colors.surface, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${colors.border}` }}>
              <p style={{ fontSize: 11, color: colors.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Context Recap</p>
              {[
                { label: 'Was doing', val: localAnswers[0] || 'Not specified' },
                { label: 'Interrupted by', val: localAnswers[1] || 'Not specified' },
                { label: 'Progress = ', val: localAnswers[2] || 'Not specified' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 8 : 0 }}>
                  <span style={{ fontSize: 12, color: colors.textMuted, width: 90, flexShrink: 0 }}>{r.label}</span>
                  <span style={{ fontSize: 12, color: colors.text, fontWeight: 500 }}>{r.val}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: colors.text, marginBottom: 10, letterSpacing: 0.3 }}>RESTART SEQUENCE</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {plan.map((p, i) => (
                <div key={i} style={{ background: colors.surface, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${colors.border}`, animation: `slideIn ${0.3 + i * 0.12}s ease` }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: colors.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: colors.primary }}>{i + 1}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: colors.text, fontWeight: 500 }}>{p.action}</p>
                    <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{p.time} · {p.effort} effort</p>
                  </div>
                </div>
              ))}
            </div>

            <div onClick={() => { press('start-recovery'); setActiveTab('actions'); }}
              style={btnStyle('start-recovery', { background: colors.secondary, borderRadius: 14, padding: '14px', textAlign: 'center', cursor: 'pointer' })}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>Start Sequence</span>
            </div>

            <div onClick={() => { press('redo'); setRecoveryStep(0); setRecoveryDone(false); setLocalAnswers(['', '', '']); setRecoveryAnswers(['', '', '']); }}
              style={btnStyle('redo', { marginTop: 10, borderRadius: 14, padding: '12px', textAlign: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` })}>
              <span style={{ fontSize: 13, color: colors.textMuted, fontWeight: 500 }}>Start over</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
        <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Recovery Mode</h2>
            <p style={{ fontSize: 13, color: colors.textMuted }}>3 quick questions to get back on track</p>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= recoveryStep ? step.color : colors.surface3, transition: 'background 0.3s ease' }} />
            ))}
          </div>

          {/* Step */}
          <div key={recoveryStep} style={{ animation: 'slideIn 0.3s ease' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: step.color + '22', border: `1.5px solid ${step.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <StepIcon size={24} color={step.color} />
            </div>
            <p style={{ fontSize: 11, color: step.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Step {recoveryStep + 1} of 3</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.text, marginBottom: 6, lineHeight: 1.3 }}>{step.q}</h3>
            <p style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>{step.hint}</p>

            <div style={{ background: colors.surface, borderRadius: 16, border: `1.5px solid ${localAnswers[recoveryStep] ? step.color + '66' : colors.border}`, padding: 14, marginBottom: 16, transition: 'border-color 0.2s ease' }}>
              <textarea
                value={localAnswers[recoveryStep]}
                onChange={e => setAnswer(e.target.value)}
                placeholder={step.hint}
                style={{ width: '100%', minHeight: 70, resize: 'none', fontSize: 14, color: colors.text, lineHeight: 1.6, background: 'transparent', fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>

            {/* Suggestions */}
            <p style={{ fontSize: 11, color: colors.textMuted, marginBottom: 8, fontWeight: 600 }}>QUICK PICK</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {step.suggestions.map((s, i) => (
                <div key={i} onClick={() => setAnswer(s)}
                  style={{ padding: '7px 12px', borderRadius: 10, background: localAnswers[recoveryStep] === s ? step.color + '22' : colors.surface2, border: `1px solid ${localAnswers[recoveryStep] === s ? step.color + '66' : colors.border}`, cursor: 'pointer', transition: 'all 0.15s ease' }}>
                  <span style={{ fontSize: 12, color: localAnswers[recoveryStep] === s ? step.color : colors.textSoft, fontWeight: localAnswers[recoveryStep] === s ? 600 : 400 }}>{s}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {recoveryStep > 0 && (
                <div onClick={() => setRecoveryStep(s => s - 1)} style={btnStyle('back-r', { padding: '13px 16px', borderRadius: 14, border: `1px solid ${colors.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 })}>
                  <ArrowLeftIcon size={16} color={colors.textMuted} />
                  <span style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600 }}>Back</span>
                </div>
              )}
              <div onClick={advance}
                style={btnStyle('next-r', { flex: 1, padding: '13px', borderRadius: 14, background: localAnswers[recoveryStep] ? step.color : colors.surface3, cursor: localAnswers[recoveryStep] ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 })}>
                <span style={{ fontSize: 14, fontWeight: 700, color: localAnswers[recoveryStep] ? '#000' : colors.textMuted }}>
                  {recoveryStep < 2 ? 'Next' : 'Get My Plan'}
                </span>
                <ArrowRightIcon size={16} color={localAnswers[recoveryStep] ? '#000' : colors.textMuted} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: ACTIONS ──────────────────────────────────────────────────────
  const ActionsScreen = () => {
    const filters = ['now', 'waiting', 'later'];
    const allActions = {
      now: [
        { id: 1, text: 'Reply to Priya\'s Slack about launch date', context: 'desk', effort: 'low', time: '3m', tags: ['#work', '#comms'], done: false },
        { id: 2, text: 'Review budget doc Alex sent', context: 'desk', effort: 'medium', time: '15m', tags: ['#finance'], done: false },
        { id: 3, text: 'Call Dr. Mehta about lab results', context: 'phone', effort: 'low', time: '5m', tags: ['#health'], done: true },
      ],
      waiting: [
        { id: 4, text: 'Wait for Marcus to confirm meeting time', context: 'people', effort: 'none', time: '—', tags: ['#work', '#calendar'], done: false },
        { id: 5, text: 'HR to send updated benefits form', context: 'email', effort: 'none', time: '—', tags: ['#admin'], done: false },
      ],
      later: [
        { id: 6, text: 'Plan weekend grocery run', context: 'errand', effort: 'low', time: '20m', tags: ['#home'], done: false },
        { id: 7, text: 'Write Q3 retrospective notes', context: 'desk', effort: 'high', time: '45m', tags: ['#work'], done: false },
        { id: 8, text: 'Schedule car service appointment', context: 'phone', effort: 'low', time: '5m', tags: ['#errands'], done: false },
      ],
    };

    const effortColor = { low: colors.secondary, medium: colors.warning, high: colors.danger, none: colors.textMuted };
    const contextIcon = { desk: ZapIcon, phone: MicIcon, errand: MapPinIcon, people: UsersIcon, email: TypeIcon };

    const [doneItems, setDoneItems] = useState([3]);
    const toggleDone = (id) => {
      press(`done-${id}`);
      setDoneItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const current = allActions[actionFilter] || [];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
        <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Actions</h2>
              <p style={{ fontSize: 13, color: colors.textMuted }}>Sorted by effort and context</p>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 10, background: colors.surface, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <FilterIcon size={14} color={colors.textMuted} />
              <span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>Filter</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', background: colors.surface, borderRadius: 14, padding: 4, marginBottom: 20, border: `1px solid ${colors.border}` }}>
            {filters.map(f => {
              const active = actionFilter === f;
              const count = allActions[f].length;
              return (
                <div key={f} onClick={() => { press(`filter-${f}`); setActionFilter(f); }}
                  style={btnStyle(`filter-${f}`, { flex: 1, padding: '8px 4px', borderRadius: 10, background: active ? colors.primary : 'transparent', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s ease' })}>
                  <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? '#000' : colors.textMuted, textTransform: 'capitalize' }}>{f}</span>
                  <span style={{ display: 'inline-block', marginLeft: 5, width: 16, height: 16, borderRadius: '50%', background: active ? '#000' + '22' : colors.surface3, fontSize: 9, fontWeight: 700, color: active ? '#000' : colors.textMuted, lineHeight: '16px' }}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* Action Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.map((a, i) => {
              const done = doneItems.includes(a.id);
              const CtxIcon = contextIcon[a.context] || ZapIcon;
              return (
                <div key={a.id} style={{ background: done ? colors.surface + '88' : colors.surface, borderRadius: 16, padding: '14px', border: `1px solid ${done ? colors.secondaryDim : colors.border}`, animation: `fadeSlideUp ${0.1 + i * 0.08}s ease`, opacity: done ? 0.65 : 1, transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div onClick={() => toggleDone(a.id)}
                      style={btnStyle(`done-${a.id}`, { width: 22, height: 22, borderRadius: '50%', border: `2px solid ${done ? colors.secondary : colors.borderLight}`, background: done ? colors.secondaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: 1, flexShrink: 0, transition: 'all 0.2s ease' })}>
                      {done && <CheckIcon size={12} color={colors.secondary} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, color: done ? colors.textMuted : colors.text, fontWeight: 500, marginBottom: 8, textDecoration: done ? 'line-through' : 'none', lineHeight: 1.4 }}>{a.text}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8, background: colors.surface3 }}>
                          <CtxIcon size={10} color={colors.textMuted} />
                          <span style={{ fontSize: 10, color: colors.textMuted, fontWeight: 500 }}>{a.context}</span>
                        </div>
                        {a.time !== '—' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8, background: colors.surface3 }}>
                            <ClockIcon size={10} color={colors.textMuted} />
                            <span style={{ fontSize: 10, color: colors.textMuted }}>{a.time}</span>
                          </div>
                        )}
                        <div style={{ padding: '3px 8px', borderRadius: 8, background: effortColor[a.effort] + '22' }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: effortColor[a.effort], textTransform: 'capitalize' }}>{a.effort}</span>
                        </div>
                        {a.tags.map((t, ti) => (
                          <span key={ti} style={{ fontSize: 10, color: colors.accent, fontWeight: 500 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <MoreHorizontalIcon size={16} color={colors.textMuted} style={{ marginTop: 3, cursor: 'pointer' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {current.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <CheckIcon size={32} color={colors.secondary} style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ fontSize: 14, color: colors.textMuted }}>All clear here</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── SCREEN: SCHEDULE ─────────────────────────────────────────────────────
  const ScheduleScreen = () => {
    const blocks = [
      { time: '9:00 AM', duration: '30m', label: 'Team standup', type: 'meeting', energy: 'medium', done: true },
      { time: '9:30 AM', duration: '45m', label: 'Deep work: Q3 report', type: 'focus', energy: 'high', done: true },
      { time: '10:15 AM', duration: '15m', label: 'Email catchup', type: 'admin', energy: 'low', done: false, current: true },
      { time: '10:30 AM', duration: '1h', label: 'Product review meeting', type: 'meeting', energy: 'medium', done: false },
      { time: '11:30 AM', duration: '30m', label: 'Lunch + recharge', type: 'break', energy: 'restore', done: false },
      { time: '12:00 PM', duration: '45m', label: 'Captured tasks sprint', type: 'focus', energy: 'high', done: false },
      { time: '12:45 PM', duration: '15m', label: 'Commute window', type: 'mobile', energy: 'low', done: false },
      { time: '1:00 PM', duration: '2h', label: 'Client proposal writing', type: 'focus', energy: 'high', done: false },
    ];

    const typeColor = { meeting: colors.warning, focus: colors.primary, admin: colors.textMuted, break: colors.secondary, mobile: colors.accent };
    const typeBg = { meeting: colors.warningDim, focus: colors.primaryDim, admin: colors.surface3, break: colors.secondaryDim, mobile: colors.accentDim };
    const energyEmoji = { low: '🌿', medium: '⚡', high: '🔥', restore: '☀️' };

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
        <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Today</h2>
              <p style={{ fontSize: 13, color: colors.textMuted }}>Reality-adjusted · Fri, Mar 20</p>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 10, background: colors.primaryDim, border: `1px solid ${colors.primary}44`, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <SlidersIcon size={13} color={colors.primary} />
              <span style={{ fontSize: 12, color: colors.primary, fontWeight: 600 }}>Adjust</span>
            </div>
          </div>

          {/* Energy Overview */}
          <div style={{ background: colors.surface, borderRadius: 16, padding: '14px 16px', marginBottom: 20, border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 11, color: colors.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Energy Curve Today</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
              {[4,6,8,9,7,8,6,5,7,8,6,4].map((v, i) => (
                <div key={i} style={{ flex: 1, height: v * 4 + 'px', borderRadius: '3px 3px 0 0', background: i < 4 ? colors.secondary : i < 8 ? colors.primary : colors.warning, opacity: i < 3 ? 0.4 : 1 }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 9, color: colors.textMuted }}>8 AM</span>
              <span style={{ fontSize: 9, color: colors.primary, fontWeight: 700 }}>Now</span>
              <span style={{ fontSize: 9, color: colors.textMuted }}>8 PM</span>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 44, top: 0, bottom: 0, width: 1.5, background: colors.border }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {blocks.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 0, alignItems: 'flex-start', animation: `fadeSlideUp ${0.1 + i * 0.06}s ease` }}>
                  {/* Time */}
                  <div style={{ width: 44, paddingTop: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: b.current ? colors.primary : colors.textMuted, fontWeight: b.current ? 700 : 400, fontFamily: 'DM Mono, monospace', display: 'block', textAlign: 'right', paddingRight: 8 }}>{b.time.split(' ')[0]}</span>
                    <span style={{ fontSize: 8, color: colors.textMuted, display: 'block', textAlign: 'right', paddingRight: 8 }}>{b.time.split(' ')[1]}</span>
                  </div>
                  {/* Dot */}
                  <div style={{ width: 10, marginTop: 14, flexShrink: 0, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                    <div style={{ width: b.current ? 10 : 8, height: b.current ? 10 : 8, borderRadius: '50%', background: b.done ? colors.secondary : b.current ? colors.primary : typeColor[b.type], boxShadow: b.current ? `0 0 10px ${colors.primary}` : 'none', border: b.current ? `2px solid ${colors.bg}` : 'none' }} />
                  </div>
                  {/* Block */}
                  <div style={{ flex: 1, paddingLeft: 10, paddingBottom: 12 }}>
                    <div style={{ background: b.current ? colors.primaryDim : b.done ? colors.surface + '66' : colors.surface, borderRadius: 14, padding: '10px 12px', border: `1px solid ${b.current ? colors.primary + '44' : b.done ? colors.border + '66' : colors.border}`, opacity: b.done ? 0.6 : 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: b.current ? 700 : 500, color: b.done ? colors.textMuted : colors.text, textDecoration: b.done ? 'line-through' : 'none', marginBottom: 4 }}>{b.label}</p>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <div style={{ padding: '2px 7px', borderRadius: 6, background: typeBg[b.type] }}>
                              <span style={{ fontSize: 9, fontWeight: 700, color: typeColor[b.type], textTransform: 'uppercase', letterSpacing: 0.4 }}>{b.type}</span>
                            </div>
                            <span style={{ fontSize: 11, color: colors.textMuted }}>{b.duration}</span>
                            <span style={{ fontSize: 11 }}>{energyEmoji[b.energy]}</span>
                          </div>
                        </div>
                        {b.done && <CheckIcon size={14} color={colors.secondary} />}
                        {b.current && <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.primary, animation: 'pulse 1.5s infinite' }} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  const screens = { home: HomeScreen, capture: CaptureScreen, recovery: RecoveryScreen, actions: ActionsScreen, schedule: ScheduleScreen };
  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#050A14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{fonts}</style>

      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 52, boxShadow: '0 0 0 10px #111827, 0 0 0 12px #1E293B, 0 40px 120px rgba(0,0,0,0.9)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1.5px solid #2a2a2a' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#222' }} />
        </div>

        {/* Screen glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: `radial-gradient(ellipse at 50% -20%, ${colors.primary}12, transparent 70%)`, pointerEvents: 'none', zIndex: 1 }} />

        {/* Status Bar */}
        <StatusBar />

        {/* App Header */}
        <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <WavesIcon size={14} color="#000" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: colors.text, letterSpacing: -0.3 }}>Task Tide</span>
        </div>

        {/* Screen Content */}
        <div key={activeTab} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 2, animation: 'fadeSlideUp 0.25s ease' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}
