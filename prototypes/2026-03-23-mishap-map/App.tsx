function App() {
  const { useState, useEffect, useRef } = React;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap';
    document.head.appendChild(link);
    document.body.style.margin = '0';
    document.body.style.background = '#ddd8ee';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.minHeight = '100vh';
  }, []);

  const themes = {
    light: {
      bg: '#F5F3FF', surface: '#FFFFFF', surfaceAlt: '#F0EEFF',
      text: '#1A1033', sub: '#5B4F7A', muted: '#9B90C0',
      primary: '#7C3AED', primaryBg: '#EDE9FF', primaryDark: '#5B21B6',
      green: '#10B981', greenBg: '#D1FAE5',
      red: '#EF4444', redBg: '#FEE2E2',
      amber: '#F59E0B', amberBg: '#FEF3C7',
      border: '#E5E0FF', nav: '#FFFFFF',
    },
    dark: {
      bg: '#0F0B1E', surface: '#1C1535', surfaceAlt: '#160F2A',
      text: '#EDE9FF', sub: '#C4B5FD', muted: '#7B6FA0',
      primary: '#A78BFA', primaryBg: '#2D1B69', primaryDark: '#7C3AED',
      green: '#34D399', greenBg: '#064E3B',
      red: '#F87171', redBg: '#450A0A',
      amber: '#FCD34D', amberBg: '#422006',
      border: '#2D2460', nav: '#160F2A',
    }
  };

  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [mapStep, setMapStep] = useState(0);
  const [mishapType, setMishapType] = useState(null);
  const [feelingIdx, setFeelingIdx] = useState(null);
  const [actionIdx, setActionIdx] = useState(null);
  const [helperIdx, setHelperIdx] = useState(null);
  const [toolMode, setToolMode] = useState('menu');
  const [breathPhase, setBreathPhase] = useState('idle');
  const [breathScale, setBreathScale] = useState(1);
  const [timerVal, setTimerVal] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [stretchIdx, setStretchIdx] = useState(0);
  const [moodPick, setMoodPick] = useState(null);

  const breathAnimRef = useRef(null);
  const timerRef = useRef(null);

  const c = themes[theme];
  const font = "'Nunito', sans-serif";

  useEffect(() => {
    if (breathAnimRef.current) cancelAnimationFrame(breathAnimRef.current);
    if (breathPhase === 'idle') { setBreathScale(1); return; }
    if (breathPhase === 'hold') {
      const t = setTimeout(() => setBreathPhase('exhale'), 2000);
      return () => clearTimeout(t);
    }
    const startScale = breathPhase === 'inhale' ? 1 : 1.65;
    const endScale = breathPhase === 'inhale' ? 1.65 : 1;
    const nextPhase = breathPhase === 'inhale' ? 'hold' : 'inhale';
    const start = Date.now();
    const animate = () => {
      const t = Math.min((Date.now() - start) / 4000, 1);
      setBreathScale(startScale + (endScale - startScale) * t);
      if (t < 1) { breathAnimRef.current = requestAnimationFrame(animate); }
      else { setBreathPhase(nextPhase); }
    };
    breathAnimRef.current = requestAnimationFrame(animate);
    return () => { if (breathAnimRef.current) cancelAnimationFrame(breathAnimRef.current); };
  }, [breathPhase]);

  useEffect(() => {
    if (timerRunning && timerVal > 0) {
      timerRef.current = setTimeout(() => setTimerVal(v => v - 1), 1000);
    } else if (timerRunning && timerVal === 0) {
      setTimerRunning(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timerRunning, timerVal]);

  const mishaps = [
    { emoji: '🥤', label: 'Spilled something', color: '#3B82F6', bg: '#EFF6FF',
      actions: ['Say sorry and help clean up', 'Ask a grown-up for help', 'Take a breath — accidents happen', 'Try again more carefully next time'] },
    { emoji: '🔍', label: 'Lost something', color: '#8B5CF6', bg: '#F5F3FF',
      actions: ['Check the last place you had it', 'Ask someone to help you look', 'Make a plan to find it later', 'Let a grown-up know'] },
    { emoji: '😢', label: 'Got teased', color: '#EC4899', bg: '#FDF2F8',
      actions: ['Walk away and find a safe spot', 'Tell a trusted adult right away', 'Use your words calmly', "Remember their words don't define you"] },
    { emoji: '😔', label: 'Felt left out', color: '#F59E0B', bg: '#FFFBEB',
      actions: ['Ask if you can join in', 'Find another friend to play with', 'Tell a grown-up how you feel', 'Do something you enjoy on your own'] },
    { emoji: '💔', label: 'Something broke', color: '#EF4444', bg: '#FEF2F2',
      actions: ['Say sorry if it was an accident', 'Ask a grown-up to help fix it', 'Remember mistakes happen to everyone', 'Think about what to do differently next time'] },
    { emoji: '😤', label: 'Had an argument', color: '#10B981', bg: '#F0FDF4',
      actions: ['Take 3 deep breaths first', 'Listen to what they are saying', 'Say how YOU feel, not what THEY did', 'Ask a grown-up to help you both'] },
  ];

  const feelings = [
    { emoji: '😡', label: 'Really Angry', intensity: 5 },
    { emoji: '😢', label: 'Really Sad', intensity: 4 },
    { emoji: '😰', label: 'Scared', intensity: 4 },
    { emoji: '😤', label: 'Frustrated', intensity: 3 },
    { emoji: '😕', label: 'Confused', intensity: 2 },
    { emoji: '😮', label: 'Surprised', intensity: 2 },
  ];

  const helpers = [
    { emoji: '👨‍👩‍👧', label: 'Mom or Dad' },
    { emoji: '👩‍🏫', label: 'My Teacher' },
    { emoji: '👫', label: 'A Friend' },
    { emoji: '🦸', label: 'Myself!' },
  ];

  const stretches = [
    { emoji: '🦁', label: 'Lion Breath', desc: 'Open your mouth wide, stick out your tongue, and breathe out with a big ROAR!' },
    { emoji: '🌈', label: 'Rainbow Arms', desc: 'Reach both arms up high and make a big rainbow shape. Hold for 5 seconds!' },
    { emoji: '🐢', label: 'Turtle Tuck', desc: 'Hug yourself tight like a turtle in its shell. Take one slow breath in and out.' },
    { emoji: '⭐', label: 'Star Pose', desc: 'Stand with arms and legs spread wide like a star! Shake your hands and feet!' },
  ];

  const insightData = [
    { day: 'Mon', count: 1 }, { day: 'Tue', count: 0 }, { day: 'Wed', count: 2 },
    { day: 'Thu', count: 1 }, { day: 'Fri', count: 3 }, { day: 'Sat', count: 0 }, { day: 'Sun', count: 1 },
  ];
  const maxCount = Math.max(...insightData.map(d => d.count), 1);

  const resetMap = () => { setMapStep(0); setMishapType(null); setFeelingIdx(null); setActionIdx(null); setHelperIdx(null); };

  const BackBtn = ({ onClick }) => (
    <div onClick={onClick} style={{ width: 36, height: 36, borderRadius: 10, background: c.surfaceAlt,
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      border: `1px solid ${c.border}`, flexShrink: 0 }}>
      {React.createElement(window.lucide.ChevronLeft, { size: 18, color: c.text })}
    </div>
  );

  const ProgressBar = ({ step, total }) => (
    <div style={{ display: 'flex', gap: 5, flex: 1 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ height: 4, flex: 1, borderRadius: 2,
          background: i < step ? c.primary : c.border, transition: 'background 0.3s' }} />
      ))}
    </div>
  );

  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: c.muted, fontWeight: 700, marginBottom: 3, letterSpacing: 0.3 }}>Good morning! 🌟</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: c.text, lineHeight: 1.25 }}>How's your day<br />going, Alex?</div>
      </div>

      <div style={{ background: c.surface, borderRadius: 16, padding: '14px', marginBottom: 14,
        border: `1px solid ${c.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: c.muted, marginBottom: 10, letterSpacing: 0.6 }}>HOW ARE YOU FEELING?</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['😊', '😐', '😤', '😢', '😰'].map((em, i) => (
            <div key={i} onClick={() => setMoodPick(i)} style={{ flex: 1, textAlign: 'center', padding: '10px 0',
              borderRadius: 12, fontSize: 22, cursor: 'pointer', transition: 'all 0.18s',
              background: moodPick === i ? c.primaryBg : c.surfaceAlt,
              border: `2px solid ${moodPick === i ? c.primary : 'transparent'}`,
              transform: moodPick === i ? 'scale(1.12)' : 'scale(1)' }}>
              {em}
            </div>
          ))}
        </div>
      </div>

      <div onClick={() => { resetMap(); setActiveTab('map'); }} style={{ background: `linear-gradient(135deg, #7C3AED, #9333EA)`,
        borderRadius: 20, padding: '18px 20px', marginBottom: 14, cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(124,58,237,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: 'white', marginBottom: 3 }}>I had a mishap!</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Let's figure it out together</div>
        </div>
        <div style={{ fontSize: 42 }}>🗺️</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div onClick={() => setActiveTab('toolkit')} style={{ background: c.surface, border: `1px solid ${c.border}`,
          borderRadius: 16, padding: '14px', cursor: 'pointer' }}>
          <div style={{ fontSize: 26, marginBottom: 6 }}>🧘</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: c.text }}>Calm Down</div>
          <div style={{ fontSize: 11, color: c.muted, fontWeight: 600 }}>Breathing & stretches</div>
        </div>
        <div onClick={() => setActiveTab('insights')} style={{ background: c.surface, border: `1px solid ${c.border}`,
          borderRadius: 16, padding: '14px', cursor: 'pointer' }}>
          <div style={{ fontSize: 26, marginBottom: 6 }}>📊</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: c.text }}>My Patterns</div>
          <div style={{ fontSize: 11, color: c.muted, fontWeight: 600 }}>For parents to see</div>
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 800, color: c.text, marginBottom: 10 }}>Recent Mishaps</div>
      {[
        { emoji: '😤', label: 'Had an argument', time: '2h ago', ok: true },
        { emoji: '🔍', label: 'Lost something', time: 'Yesterday', ok: true },
        { emoji: '😢', label: 'Got teased', time: '3 days ago', ok: false },
      ].map((m, i) => (
        <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
          padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 22 }}>{m.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{m.label}</div>
            <div style={{ fontSize: 11, color: c.muted, fontWeight: 600 }}>{m.time}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8,
            color: m.ok ? c.green : c.amber,
            background: m.ok ? c.greenBg : c.amberBg }}>
            {m.ok ? '✓ Fixed' : '⏳ Soon'}
          </div>
        </div>
      ))}
    </div>
  );

  const MapScreen = () => {
    const sm = mishapType !== null ? mishaps[mishapType] : null;

    if (mapStep === 0) return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 4 }}>What happened? 🤔</div>
        <div style={{ fontSize: 13, color: c.muted, fontWeight: 600, marginBottom: 16 }}>Tap the one that fits best</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {mishaps.map((m, i) => (
            <div key={i} onClick={() => { setMishapType(i); setMapStep(1); }}
              style={{ background: theme === 'light' ? m.bg : c.surface, border: `2px solid ${theme === 'light' ? m.color + '25' : c.border}`,
                borderRadius: 18, padding: '18px 12px', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 34, marginBottom: 8 }}>{m.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: c.text, lineHeight: 1.3 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    );

    if (mapStep === 1) return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
          <BackBtn onClick={() => setMapStep(0)} />
          <ProgressBar step={1} total={4} />
        </div>
        <div style={{ background: theme === 'light' ? sm.bg : c.surface, border: `2px solid ${sm.color}25`,
          borderRadius: 14, padding: '12px 14px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 26 }}>{sm.emoji}</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: c.text }}>{sm.label}</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 4 }}>How do you feel? 💭</div>
        <div style={{ fontSize: 13, color: c.muted, fontWeight: 600, marginBottom: 14 }}>It's okay to feel all the feelings</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {feelings.map((f, i) => (
            <div key={i} onClick={() => { setFeelingIdx(i); setMapStep(2); }}
              style={{ background: feelingIdx === i ? c.primaryBg : c.surface,
                border: `2px solid ${feelingIdx === i ? c.primary : c.border}`,
                borderRadius: 14, padding: '12px 16px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s' }}>
              <span style={{ fontSize: 28 }}>{f.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: c.text, flex: 1 }}>{f.label}</span>
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} style={{ width: 6, height: 6, borderRadius: 3,
                    background: j < f.intensity ? c.primary : c.border }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (mapStep === 2) return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
          <BackBtn onClick={() => setMapStep(1)} />
          <ProgressBar step={2} total={4} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 4 }}>What can you do? 💪</div>
        <div style={{ fontSize: 13, color: c.muted, fontWeight: 600, marginBottom: 14 }}>Pick one repair step</div>
        <div style={{ background: c.primaryBg, borderRadius: 14, padding: '10px 14px', marginBottom: 14,
          display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{feelings[feelingIdx]?.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: c.primary }}>Feeling {feelings[feelingIdx]?.label}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {sm?.actions.map((a, i) => (
            <div key={i} onClick={() => { setActionIdx(i); setMapStep(3); }}
              style={{ background: actionIdx === i ? c.primaryBg : c.surface,
                border: `2px solid ${actionIdx === i ? c.primary : c.border}`,
                borderRadius: 14, padding: '14px', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: c.primary, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.text, lineHeight: 1.4 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    );

    if (mapStep === 3) return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
          <BackBtn onClick={() => setMapStep(2)} />
          <ProgressBar step={3} total={4} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 4 }}>Who can help? 🤝</div>
        <div style={{ fontSize: 13, color: c.muted, fontWeight: 600, marginBottom: 16 }}>You don't have to do this alone!</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {helpers.map((h, i) => (
            <div key={i} onClick={() => setHelperIdx(i)}
              style={{ background: helperIdx === i ? c.primaryBg : c.surface,
                border: `2px solid ${helperIdx === i ? c.primary : c.border}`,
                borderRadius: 18, padding: '20px 12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
              <div style={{ fontSize: 34, marginBottom: 8 }}>{h.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: c.text }}>{h.label}</div>
            </div>
          ))}
        </div>
        {helperIdx !== null && (
          <div onClick={() => setMapStep(4)} style={{ background: `linear-gradient(135deg, #7C3AED, #9333EA)`,
            borderRadius: 16, padding: '15px', textAlign: 'center', cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(124,58,237,0.3)' }}>
            <span style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>I'm ready! Let's do this! ✨</span>
          </div>
        )}
      </div>
    );

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '20px 24px', fontFamily: font, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: c.primary, marginBottom: 8 }}>Amazing job!</div>
        <div style={{ fontSize: 14, color: c.sub, fontWeight: 600, lineHeight: 1.55, marginBottom: 20 }}>
          You named your mishap, found your feeling, and picked a plan. That's being a real problem-solver!
        </div>
        <div style={{ background: c.surface, border: `2px solid ${c.border}`, borderRadius: 20,
          padding: '18px', width: '100%', marginBottom: 18, textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: c.muted, marginBottom: 12, letterSpacing: 0.5 }}>YOUR PLAN</div>
          {[
            { emoji: sm?.emoji, text: sm?.label },
            { emoji: feelings[feelingIdx]?.emoji, text: `Feeling ${feelings[feelingIdx]?.label}` },
            { emoji: helpers[helperIdx]?.emoji, text: `Asking ${helpers[helperIdx]?.label}` },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>{row.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{row.text}</span>
            </div>
          ))}
          <div style={{ background: c.primaryBg, borderRadius: 12, padding: '10px 12px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: c.primary }}>💡 {sm?.actions[actionIdx]}</span>
          </div>
        </div>
        <div onClick={resetMap} style={{ background: `linear-gradient(135deg, #7C3AED, #9333EA)`, borderRadius: 16,
          padding: '14px 32px', cursor: 'pointer', color: 'white', fontSize: 15, fontWeight: 900,
          boxShadow: '0 6px 20px rgba(124,58,237,0.3)' }}>
          Start Fresh 🗺️
        </div>
      </div>
    );
  };

  const ToolkitScreen = () => {
    const breathLabel = breathPhase === 'idle' ? 'Tap to start' : breathPhase === 'inhale' ? 'Breathe in slowly...' : breathPhase === 'hold' ? 'Hold it...' : 'Breathe out slowly...';

    if (toolMode === 'breath') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', fontFamily: font }}>
        <div style={{ display: 'flex', width: '100%', marginBottom: 16 }}>
          <BackBtn onClick={() => { setToolMode('menu'); setBreathPhase('idle'); }} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 4, textAlign: 'center' }}>Bubble Breathing 🫧</div>
        <div style={{ fontSize: 12, color: c.muted, fontWeight: 600, marginBottom: 44, textAlign: 'center' }}>Imagine blowing a big soap bubble</div>
        <div onClick={() => breathPhase === 'idle' && setBreathPhase('inhale')}
          style={{ width: 160, height: 160, borderRadius: '50%', cursor: 'pointer',
            background: `radial-gradient(circle at 35% 35%, rgba(167,139,250,0.85), rgba(109,40,217,0.6))`,
            border: `4px solid ${c.primary}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `scale(${breathScale})`,
            boxShadow: `0 0 ${Math.round(breathScale * 40)}px rgba(124,58,237,${Math.min(breathScale * 0.18, 0.35)})` }}>
          <span style={{ fontSize: 44 }}>🫧</span>
        </div>
        <div style={{ marginTop: 52, fontSize: 18, fontWeight: 800, color: c.primary, textAlign: 'center' }}>{breathLabel}</div>
        {breathPhase !== 'idle' && (
          <div onClick={() => setBreathPhase('idle')} style={{ marginTop: 18, padding: '9px 22px', borderRadius: 12,
            background: c.surfaceAlt, border: `1px solid ${c.border}`, fontSize: 13, fontWeight: 700, color: c.muted, cursor: 'pointer' }}>
            Stop
          </div>
        )}
      </div>
    );

    if (toolMode === 'stretch') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', fontFamily: font }}>
        <div style={{ display: 'flex', width: '100%', marginBottom: 16 }}>
          <BackBtn onClick={() => setToolMode('menu')} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 14 }}>Silly Stretches 🤸</div>
        <div style={{ background: `linear-gradient(135deg, ${c.primaryBg}, ${c.surfaceAlt})`,
          border: `2px solid ${c.primary}30`, borderRadius: 24, padding: '28px 20px',
          textAlign: 'center', marginBottom: 16, flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 14 }}>{stretches[stretchIdx].emoji}</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 10 }}>{stretches[stretchIdx].label}</div>
          <div style={{ fontSize: 14, color: c.sub, fontWeight: 600, lineHeight: 1.55 }}>{stretches[stretchIdx].desc}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
            {stretches.map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: i === stretchIdx ? c.primary : c.border }} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div onClick={() => setStretchIdx(i => Math.max(0, i - 1))} style={{ flex: 1, padding: '13px',
            borderRadius: 14, background: c.surfaceAlt, border: `1px solid ${c.border}`,
            textAlign: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 800, color: c.text }}>← Back</div>
          <div onClick={() => setStretchIdx(i => Math.min(stretches.length - 1, i + 1))} style={{ flex: 1, padding: '13px',
            borderRadius: 14, background: `linear-gradient(135deg, #7C3AED, #9333EA)`,
            textAlign: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 800, color: 'white',
            boxShadow: '0 4px 14px rgba(124,58,237,0.3)' }}>Next →</div>
        </div>
      </div>
    );

    if (toolMode === 'timer') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', fontFamily: font }}>
        <div style={{ display: 'flex', width: '100%', marginBottom: 16 }}>
          <BackBtn onClick={() => { setToolMode('menu'); setTimerRunning(false); setTimerVal(60); }} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text, marginBottom: 4, textAlign: 'center' }}>Cool-Down Timer ⏱️</div>
        <div style={{ fontSize: 12, color: c.muted, fontWeight: 600, marginBottom: 40, textAlign: 'center' }}>Give yourself space to feel better</div>
        <div style={{ width: 190, height: 190, borderRadius: '50%', border: `8px solid ${c.border}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: c.surface, boxShadow: `0 0 40px ${c.primary}15` }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: c.primary, lineHeight: 1 }}>
            {String(Math.floor(timerVal / 60)).padStart(2, '0')}:{String(timerVal % 60).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 11, color: c.muted, fontWeight: 600, marginTop: 4 }}>
            {timerRunning ? 'Cooling down...' : 'Ready when you are'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          <div onClick={() => setTimerRunning(r => !r)} style={{ padding: '13px 28px', borderRadius: 15, cursor: 'pointer',
            background: timerRunning ? c.surfaceAlt : `linear-gradient(135deg, #7C3AED, #9333EA)`,
            border: timerRunning ? `2px solid ${c.border}` : 'none',
            fontSize: 15, fontWeight: 900, color: timerRunning ? c.text : 'white',
            boxShadow: timerRunning ? 'none' : '0 6px 18px rgba(124,58,237,0.3)' }}>
            {timerRunning ? '⏸ Pause' : '▶ Start'}
          </div>
          <div onClick={() => { setTimerRunning(false); setTimerVal(60); }} style={{ padding: '13px 18px', borderRadius: 15,
            cursor: 'pointer', background: c.surfaceAlt, border: `1px solid ${c.border}`,
            fontSize: 16, fontWeight: 900, color: c.text }}>↺</div>
        </div>
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: c.text, marginBottom: 4 }}>Calm-Down Kit 🧘</div>
        <div style={{ fontSize: 13, color: c.muted, fontWeight: 600, marginBottom: 18 }}>Pick a tool to feel better</div>
        {[
          { emoji: '🫧', title: 'Bubble Breathing', desc: 'Slow your breath, slow your heart', mode: 'breath', color: '#7C3AED', bg: '#EDE9FF' },
          { emoji: '🤸', title: 'Silly Stretches', desc: 'Move your body to move your mood', mode: 'stretch', color: '#10B981', bg: '#D1FAE5' },
          { emoji: '⏱️', title: 'Cool-Down Timer', desc: 'Give yourself time to feel better', mode: 'timer', color: '#F59E0B', bg: '#FEF3C7' },
        ].map((tool, i) => (
          <div key={i} onClick={() => setToolMode(tool.mode)} style={{ background: theme === 'light' ? tool.bg : c.surface,
            border: `2px solid ${theme === 'light' ? tool.color + '28' : c.border}`,
            borderRadius: 20, padding: '18px', marginBottom: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 42 }}>{tool.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: c.text, marginBottom: 3 }}>{tool.title}</div>
              <div style={{ fontSize: 12, color: c.sub, fontWeight: 600 }}>{tool.desc}</div>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 20, color: c.muted })}
          </div>
        ))}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: '16px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: c.text, marginBottom: 8 }}>🌟 Today's Tip</div>
          <div style={{ fontSize: 13, color: c.sub, fontWeight: 600, lineHeight: 1.55 }}>
            "When you feel a big feeling, pause before you act. Count to 5 in your head. You've got this!"
          </div>
        </div>
      </div>
    );
  };

  const InsightsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: c.text }}>Parent Insights 📊</div>
          <div style={{ fontSize: 12, color: c.muted, fontWeight: 600 }}>Alex's patterns this week</div>
        </div>
        <div style={{ background: c.primaryBg, borderRadius: 10, padding: '5px 10px',
          fontSize: 11, fontWeight: 800, color: c.primary }}>🔒 Parent View</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Total Mishaps', value: '8', sub: 'this week', icon: '📍' },
          { label: 'Resolved', value: '6', sub: 'on their own', icon: '✅' },
          { label: 'Most Common', value: 'Arguments', sub: '3 times', icon: '💬' },
          { label: 'Best Day', value: 'Tuesday', sub: '0 mishaps', icon: '⭐' },
        ].map((s, i) => (
          <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '14px' }}>
            <div style={{ fontSize: 18, marginBottom: 5 }}>{s.icon}</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: c.primary }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{s.label}</div>
            <div style={{ fontSize: 10, color: c.muted, fontWeight: 600 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: '16px', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: c.text, marginBottom: 14 }}>This Week's Mishaps</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
          {insightData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: '100%', borderRadius: 6, transition: 'height 0.5s',
                background: d.count > 0 ? c.primary : c.border,
                height: d.count === 0 ? 4 : `${(d.count / maxCount) * 58}px` }} />
              <div style={{ fontSize: 9, fontWeight: 700, color: c.muted }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: '16px', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: c.text, marginBottom: 12 }}>🔍 Patterns Spotted</div>
        {[
          { icon: '🌙', label: 'Bedtime resistance', count: 3, hi: true, tip: 'Try a consistent wind-down routine' },
          { icon: '🏫', label: 'Playground conflict', count: 4, hi: true, tip: 'Practice sharing strategies at home' },
          { icon: '🏠', label: 'Sibling arguments', count: 2, hi: false, tip: 'Set clear personal space boundaries' },
        ].map((p, i) => (
          <div key={i} style={{ borderRadius: 13, padding: '12px', marginBottom: i < 2 ? 10 : 0,
            background: p.hi ? c.redBg : c.amberBg,
            border: `1px solid ${p.hi ? c.red + '40' : c.amber + '40'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 17 }}>{p.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: c.text, flex: 1 }}>{p.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: p.hi ? c.red : c.amber }}>{p.count}x this week</span>
            </div>
            <div style={{ fontSize: 11, color: c.sub, fontWeight: 600, paddingLeft: 25 }}>💡 {p.tip}</div>
          </div>
        ))}
      </div>

      <div style={{ background: c.greenBg, border: `1px solid ${c.green}40`, borderRadius: 16, padding: '14px 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: c.green, marginBottom: 4 }}>✨ Great news!</div>
        <div style={{ fontSize: 12, color: c.sub, fontWeight: 600, lineHeight: 1.55 }}>
          Alex resolved 75% of mishaps independently this week — up from 50% last week!
        </div>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontFamily: font }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: c.text, marginBottom: 18 }}>Settings ⚙️</div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: '16px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', fontSize: 30, background: c.primaryBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: c.text }}>Alex</div>
            <div style={{ fontSize: 12, color: c.muted, fontWeight: 600 }}>Age 7 · 2nd Grade</div>
          </div>
          <div style={{ padding: '7px 14px', borderRadius: 10, background: c.primaryBg,
            fontSize: 12, fontWeight: 700, color: c.primary, cursor: 'pointer' }}>Edit</div>
        </div>
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: '16px', marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: c.muted, marginBottom: 12, letterSpacing: 0.6 }}>APPEARANCE</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{theme === 'light' ? '☀️' : '🌙'}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</div>
              <div style={{ fontSize: 11, color: c.muted, fontWeight: 600 }}>Switch display theme</div>
            </div>
          </div>
          <div onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{ width: 50, height: 28, borderRadius: 14, cursor: 'pointer',
              background: theme === 'dark' ? c.primary : c.border, position: 'relative', transition: 'background 0.3s' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute',
              top: 3, left: theme === 'dark' ? 25 : 3, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </div>
        </div>
      </div>

      {[
        { label: 'SOUND & VOICE', items: [
          { icon: '🔊', title: 'Voice Guidance', sub: 'Read instructions aloud', on: true },
          { icon: '🎵', title: 'Sound Effects', sub: 'Celebration sounds', on: false },
        ]},
        { label: 'PRIVACY', items: [
          { icon: '🔒', title: 'Parent Lock', sub: 'Protect insights with PIN', on: true },
          { icon: '📊', title: 'Share Insights', sub: 'Export to PDF for teachers', on: true },
        ]},
      ].map((section, si) => (
        <div key={si} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: c.muted, marginBottom: 12, letterSpacing: 0.6 }}>{section.label}</div>
          {section.items.map((item, ii) => (
            <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 10,
              paddingBottom: ii < section.items.length - 1 ? 12 : 0,
              marginBottom: ii < section.items.length - 1 ? 12 : 0,
              borderBottom: ii < section.items.length - 1 ? `1px solid ${c.border}` : 'none' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{item.title}</div>
                <div style={{ fontSize: 11, color: c.muted, fontWeight: 600 }}>{item.sub}</div>
              </div>
              <div style={{ width: 44, height: 24, borderRadius: 12, background: item.on ? c.primary : c.border,
                position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white',
                  position: 'absolute', top: 3, left: item.on ? 23 : 3, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ textAlign: 'center', fontSize: 11, color: c.muted, fontWeight: 600, paddingBottom: 8 }}>
        Mishap Map v1.0 · Made with love for kids
      </div>
    </div>
  );

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'map', label: 'My Map', icon: window.lucide.Map },
    { id: 'toolkit', label: 'Calm', icon: window.lucide.Wind },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    map: MapScreen,
    toolkit: ToolkitScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: '#ddd8ee', padding: '20px', fontFamily: font }}>
      <div style={{ width: 375, height: 812, background: c.bg, borderRadius: 54, overflow: 'hidden',
        position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
        border: '8px solid #111' }}>

        {/* Status bar */}
        <div style={{ background: c.bg, padding: '14px 24px 0', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: c.text }}>{timeStr}</span>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10,
            width: 118, height: 34, background: '#000', borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#222', border: '1px solid #333' }} />
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#222', border: '1px solid #333' }} />
          </div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: c.text })}
            {React.createElement(window.lucide.Battery, { size: 17, color: c.text })}
          </div>
        </div>

        {/* App header */}
        <div style={{ padding: '10px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🗺️</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: c.primary }}>Mishap Map</span>
          </div>
          <span style={{ fontSize: 18, cursor: 'pointer' }}>🔔</span>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          {React.createElement(screens[activeTab])}
        </div>

        {/* Bottom nav */}
        <div style={{ background: c.nav, borderTop: `1px solid ${c.border}`, padding: '8px 4px 20px', display: 'flex' }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '5px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: isActive ? c.primaryBg : 'transparent', transition: 'all 0.2s' }}>
                  {React.createElement(tab.icon, { size: 20, color: isActive ? c.primary : c.muted, strokeWidth: isActive ? 2.5 : 1.8 })}
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 800 : 600, color: isActive ? c.primary : c.muted }}>
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
