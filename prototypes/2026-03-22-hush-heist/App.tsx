const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#09091B',
    surface: '#10102A',
    card: '#191934',
    cardAlt: '#21213E',
    accent: '#8B5CF6',
    accentDim: 'rgba(139, 92, 246, 0.14)',
    accentGlow: 'rgba(139, 92, 246, 0.35)',
    secondary: '#10D4A8',
    secondaryDim: 'rgba(16, 212, 168, 0.13)',
    secondaryGlow: 'rgba(16, 212, 168, 0.3)',
    danger: '#FF4757',
    dangerDim: 'rgba(255, 71, 87, 0.15)',
    warning: '#FFD166',
    success: '#06D6A0',
    text: '#E8E8FF',
    textSub: '#8888BB',
    textMuted: '#50508A',
    border: '#23234A',
    borderLight: '#1C1C3E',
    navBg: '#0C0C20',
  },
  light: {
    bg: '#F1EFF9',
    surface: '#FFFFFF',
    card: '#FAFAFF',
    cardAlt: '#EDE8FD',
    accent: '#7C3AED',
    accentDim: 'rgba(124, 58, 237, 0.10)',
    accentGlow: 'rgba(124, 58, 237, 0.25)',
    secondary: '#0891B2',
    secondaryDim: 'rgba(8, 145, 178, 0.10)',
    secondaryGlow: 'rgba(8, 145, 178, 0.2)',
    danger: '#EF4444',
    dangerDim: 'rgba(239, 68, 68, 0.1)',
    warning: '#F59E0B',
    success: '#059669',
    text: '#1C1A3D',
    textSub: '#5A549A',
    textMuted: '#9B95C0',
    border: '#E2DEFF',
    borderLight: '#EDE9FF',
    navBg: '#FFFFFF',
  },
};

const sceneModes = [
  { id: 'restaurant', label: 'Restaurant', icon: '🍽️', color: '#FF6B6B', duration: '5-10 min' },
  { id: 'waiting', label: 'Waiting Room', icon: '⏳', color: '#4ECDC4', duration: '3-8 min' },
  { id: 'carline', label: 'Car Line', icon: '🚗', color: '#45B7D1', duration: '5-15 min' },
  { id: 'church', label: 'Church', icon: '🤫', color: '#A78BFA', duration: '10-20 min' },
  { id: 'airport', label: 'Airport', icon: '✈️', color: '#FBBF24', duration: '15-30 min' },
  { id: 'home', label: 'Home', icon: '🏠', color: '#C084FC', duration: 'Any time' },
];

const allMissions = [
  {
    id: 1,
    title: 'Invisible Package',
    description: 'Pass an invisible object around the group without dropping it. No words, no sounds — only careful, deliberate hand movements. If someone "drops" it, start over from the beginning.',
    category: 'Teamwork',
    difficulty: 1,
    duration: 3,
    setting: ['restaurant', 'waiting', 'church'],
    icon: '📦',
    points: 150,
    tip: 'Pretend it is made of glass.',
  },
  {
    id: 2,
    title: 'Statue Face-Off',
    description: 'Make the most exaggerated silent face you can. Everyone must hold their expression for 30 full seconds without laughing or twitching. The group scores based on collective stillness.',
    category: 'Self-Control',
    difficulty: 2,
    duration: 2,
    setting: ['restaurant', 'waiting', 'home'],
    icon: '😐',
    points: 200,
    tip: 'Think of something boring to avoid laughing.',
  },
  {
    id: 3,
    title: 'Eye Spy Elite',
    description: 'Find 5 objects of the same color in the room. Point only with your eyes — no fingers, no nodding. Your partner must guess each object you found by watching your gaze.',
    category: 'Observation',
    difficulty: 2,
    duration: 5,
    setting: ['restaurant', 'waiting', 'church', 'airport'],
    icon: '👁️',
    points: 175,
    tip: 'Blink once when your partner guesses correctly.',
  },
  {
    id: 4,
    title: 'Shadow Detective',
    description: 'Identify objects only by their shadows on the wall or floor. Take turns silently pointing at shadows while others write guesses on a hand — scored on accuracy and speed.',
    category: 'Observation',
    difficulty: 3,
    duration: 8,
    setting: ['home', 'restaurant'],
    icon: '🔍',
    points: 250,
    tip: 'Shadows near windows work best.',
  },
  {
    id: 5,
    title: 'Blink Code',
    description: 'Communicate a secret number between 1 and 10 using only slow, deliberate blinks. Your partner must silently decode the message and show the answer using fingers.',
    category: 'Teamwork',
    difficulty: 2,
    duration: 4,
    setting: ['church', 'waiting', 'carline'],
    icon: '😉',
    points: 200,
    tip: 'One blink = 1, pause between numbers.',
  },
  {
    id: 6,
    title: 'Slow Motion Walk',
    description: 'Move from one end of your space to the other in the slowest possible motion. No stopping allowed. The most controlled, fluid movement earns the team bonus points.',
    category: 'Self-Control',
    difficulty: 1,
    duration: 3,
    setting: ['home', 'airport'],
    icon: '🐌',
    points: 150,
    tip: 'Pretend you are moving through honey.',
  },
  {
    id: 7,
    title: 'Invisible Menu',
    description: 'Pretend to review an invisible menu and silently "place your order" using gestures and expressions alone. Your partner writes down what they think you ordered — then reveal.',
    category: 'Creativity',
    difficulty: 2,
    duration: 5,
    setting: ['restaurant', 'waiting'],
    icon: '📋',
    points: 225,
    tip: 'Mime eating the food for extra points.',
  },
  {
    id: 8,
    title: 'Pattern Sniper',
    description: 'Find a repeating pattern in the environment — tiles, fabric, wallpaper. Show it using only one slow finger point. Partner gets 30 seconds to trace the full pattern with their eyes.',
    category: 'Observation',
    difficulty: 3,
    duration: 6,
    setting: ['church', 'restaurant', 'airport'],
    icon: '🎯',
    points: 275,
    tip: 'Geometric patterns count, not just color.',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeMission, setActiveMission] = useState(null);
  const [missionTime, setMissionTime] = useState(0);
  const [missionRunning, setMissionRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [challengeStep, setChallengeStep] = useState(0);
  const [playerStars, setPlayerStars] = useState([3, 3]);
  const [score, setScore] = useState(1240);
  const [selectedScene, setSelectedScene] = useState(null);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [movementLevel, setMovementLevel] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10);
  const [completedMissions, setCompletedMissions] = useState([1, 3, 5]);
  const [missionComplete, setMissionComplete] = useState(false);

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    let interval;
    if (missionRunning && !isPaused) {
      interval = setInterval(() => setMissionTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [missionRunning, isPaused]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const startMission = (mission) => {
    setActiveMission(mission);
    setMissionTime(0);
    setMissionRunning(true);
    setIsPaused(false);
    setChallengeStep(0);
    setPlayerStars([3, 3]);
    setMissionComplete(false);
    setActiveTab('mission');
  };

  const completeMission = () => {
    if (activeMission) {
      const earned = activeMission.points + playerStars.reduce((a, b) => a + b, 0) * 10;
      setScore(prev => prev + earned);
      setCompletedMissions(prev => [...new Set([...prev, activeMission.id])]);
      setMissionRunning(false);
      setMissionComplete(true);
    }
  };

  const endMission = () => {
    setMissionRunning(false);
    setActiveMission(null);
    setMissionTime(0);
    setMissionComplete(false);
    setActiveTab('home');
  };

  const missionSteps = activeMission ? [
    'Get into position quietly. Take one slow breath together.',
    activeMission.description,
    `Tip: ${activeMission.tip}`,
    'Final stretch — give it everything you have for 10 more seconds.',
  ] : [];

  const timeLeft = activeMission ? Math.max(0, activeMission.duration * 60 - missionTime) : 0;
  const missionProgress = activeMission ? Math.min(100, (missionTime / (activeMission.duration * 60)) * 100) : 0;

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 50,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: isDark
      ? '0 50px 140px rgba(0,0,0,0.85), 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.02)'
      : '0 40px 100px rgba(90,60,160,0.18), 0 0 0 1.5px rgba(120,80,220,0.12)',
    fontFamily: '"Space Grotesk", sans-serif',
    transition: 'background 0.3s',
  };

  // ── STATUS BAR ──────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px 6px', background: t.bg, position: 'relative', zIndex: 20 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: t.text, letterSpacing: 0.3 }}>9:41</span>
      <div style={{ width: 126, height: 34, background: '#000', borderRadius: 20, position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)' }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 13, color: t.textSub })}
        {React.createElement(window.lucide.Battery, { size: 15, color: t.textSub })}
      </div>
    </div>
  );

  // ── HOME SCREEN ─────────────────────────────────────────────
  const HomeScreen = () => {
    const streak = 5;
    const recommended = allMissions.filter(m => !completedMissions.includes(m.id)).slice(0, 3);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {/* Header */}
        <div style={{ padding: '10px 22px 16px', background: isDark ? `linear-gradient(180deg, ${t.surface}CC 0%, transparent 100%)` : 'transparent' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${t.accent} 0%, ${t.secondary} 100%)`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, boxShadow: `0 4px 14px ${t.accentGlow}` }}>🤫</div>
              <div>
                <div style={{ fontSize: 19, fontWeight: 800, color: t.text, letterSpacing: 0.8 }}>HUSH HEIST</div>
                <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 0.4 }}>Quiet play, loud family fun.</div>
              </div>
            </div>
            <div style={{ background: t.accentDim, border: `1px solid ${t.accent}44`, borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 13 }}>⚡</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: t.accent }}>{score}</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, padding: '0 22px 18px' }}>
          {[
            { label: 'Today', value: completedMissions.length, emoji: '🎯' },
            { label: 'Streak', value: `${streak}🔥`, emoji: null },
            { label: 'Missions', value: allMissions.length, emoji: '📋' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: t.card, borderRadius: 16, padding: '11px 10px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>{s.value}</div>
              <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Emergency Fun Button */}
        <div style={{ padding: '0 22px 20px' }}>
          <div
            onClick={() => startMission(allMissions[Math.floor(Math.random() * allMissions.length)])}
            style={{ background: `linear-gradient(135deg, ${t.accent} 0%, #A855F7 50%, ${t.secondary} 100%)`, borderRadius: 22, padding: '18px 20px', cursor: 'pointer', boxShadow: `0 10px 36px ${t.accentGlow}`, position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
            <div style={{ position: 'absolute', top: -24, right: -24, width: 90, height: 90, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: -10, left: 80, width: 60, height: 60, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 50, height: 50, background: 'rgba(255,255,255,0.18)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, backdropFilter: 'blur(10px)', flexShrink: 0 }}>🚨</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#FFF', letterSpacing: 0.3 }}>Emergency Fun!</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Launch a random stealth mission now</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 20, color: 'rgba(255,255,255,0.7)' })}
            </div>
          </div>
        </div>

        {/* Scene Modes */}
        <div style={{ padding: '0 22px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Quick-Start Scenes</span>
            <span onClick={() => setActiveTab('browse')} style={{ fontSize: 12, color: t.accent, fontWeight: 600, cursor: 'pointer' }}>See all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
            {sceneModes.map(scene => (
              <button
                key={scene.id}
                onClick={() => { setSelectedScene(scene.id); setActiveTab('browse'); }}
                style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '13px 6px', cursor: 'pointer', textAlign: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                <div style={{ fontSize: 22, marginBottom: 5 }}>{scene.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{scene.label}</div>
                <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{scene.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended missions */}
        <div style={{ padding: '0 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Recommended for You</div>
          {recommended.map(mission => (
            <div
              key={mission.id}
              onClick={() => startMission(mission)}
              style={{ background: t.card, borderRadius: 18, padding: '13px 14px', border: `1px solid ${t.border}`, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, background: t.accentDim, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{mission.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 }}>{mission.title}</div>
                <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: t.accent, background: t.accentDim, padding: '2px 8px', borderRadius: 20 }}>{mission.category}</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>⏱ {mission.duration}m</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: t.accent }}>+{mission.points}</div>
                <div style={{ fontSize: 10, color: t.textMuted }}>pts</div>
              </div>
            </div>
          ))}
          {recommended.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: t.textSub, fontSize: 13 }}>
              🎉 You've completed all missions! Check back for new ones.
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── MISSION SCREEN ───────────────────────────────────────────
  const MissionScreen = () => {
    if (!activeMission) {
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ fontSize: 52, marginBottom: 18 }}>🤫</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 8, textAlign: 'center' }}>No Active Mission</div>
          <div style={{ fontSize: 13, color: t.textSub, textAlign: 'center', marginBottom: 28, lineHeight: 1.6 }}>Head to Home to launch a mission or tap the Emergency Fun button.</div>
          <button
            onClick={() => setActiveTab('home')}
            style={{ background: t.accent, color: '#FFF', border: 'none', borderRadius: 14, padding: '13px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', boxShadow: `0 6px 24px ${t.accentGlow}` }}>
            Go to Home
          </button>
        </div>
      );
    }

    if (missionComplete) {
      const earned = activeMission.points + playerStars.reduce((a, b) => a + b, 0) * 10;
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: `linear-gradient(135deg, ${t.accent}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 20, boxShadow: `0 10px 40px ${t.accentGlow}` }}>🏆</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: t.text, marginBottom: 6 }}>Mission Complete!</div>
          <div style={{ fontSize: 14, color: t.textSub, marginBottom: 24 }}>{activeMission.title}</div>
          <div style={{ background: t.card, borderRadius: 20, padding: '20px 28px', border: `1px solid ${t.border}`, width: '100%', marginBottom: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: t.accent, marginBottom: 4 }}>+{earned}</div>
            <div style={{ fontSize: 13, color: t.textMuted }}>Points Earned</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 14 }}>
              {['🕵️ Player 1', '🧒 Player 2'].map((p, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14 }}>{p}</div>
                  <div style={{ fontSize: 13 }}>{'⭐'.repeat(playerStars[i])}</div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={endMission}
            style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.secondary})`, color: '#FFF', border: 'none', borderRadius: 14, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', width: '100%', boxShadow: `0 8px 28px ${t.accentGlow}` }}>
            Back to Home
          </button>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {/* Mission header */}
        <div style={{ background: isDark ? `linear-gradient(160deg, ${t.accent}18 0%, ${t.bg} 55%)` : t.surface, padding: '12px 22px 16px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: t.accentDim, borderRadius: 20, padding: '4px 12px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: isPaused ? t.warning : t.secondary, boxShadow: isPaused ? 'none' : `0 0 8px ${t.secondary}` }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: 1 }}>{isPaused ? 'PAUSED' : 'LIVE'}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: isPaused ? t.warning : t.text, fontVariantNumeric: 'tabular-nums', letterSpacing: 1 }}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 }}>
            {activeMission.icon} {activeMission.title}
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: t.accent, background: t.accentDim, padding: '3px 9px', borderRadius: 20 }}>{activeMission.category}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: t.secondary, background: t.secondaryDim, padding: '3px 9px', borderRadius: 20 }}>{'●'.repeat(activeMission.difficulty) + '○'.repeat(3 - activeMission.difficulty)} Difficulty</span>
          </div>

          <div style={{ height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${missionProgress}%`, background: `linear-gradient(90deg, ${t.accent}, ${t.secondary})`, borderRadius: 2, transition: 'width 0.8s ease' }} />
          </div>
        </div>

        <div style={{ padding: '16px 22px' }}>
          {/* Challenge card */}
          <div style={{ background: t.card, borderRadius: 22, padding: '20px', border: `1px solid ${t.border}`, boxShadow: isDark ? `0 4px 40px ${t.accentGlow}` : 'none', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${t.accentDim} 0%, transparent 70%)` }} />
            <div style={{ background: t.accentDim, borderRadius: 10, padding: '4px 12px', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: t.accent, letterSpacing: 1.2 }}>STEP {challengeStep + 1} / {missionSteps.length}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: t.text, lineHeight: 1.65, marginBottom: 16 }}>
              {missionSteps[challengeStep]}
            </div>
            {challengeStep < missionSteps.length - 1 ? (
              <button
                onClick={() => setChallengeStep(prev => prev + 1)}
                style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.secondary})`, color: '#FFF', border: 'none', borderRadius: 12, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 4px 18px ${t.accentGlow}` }}>
                Next Step {React.createElement(window.lucide.ArrowRight, { size: 13 })}
              </button>
            ) : (
              <button
                onClick={completeMission}
                style={{ background: `linear-gradient(135deg, ${t.success}DD, ${t.secondary})`, color: '#FFF', border: 'none', borderRadius: 12, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 4px 18px ${t.secondaryGlow}` }}>
                Complete Mission! 🏆
              </button>
            )}
          </div>

          {/* Team scores */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1.2, marginBottom: 9 }}>TEAM STEALTH RATING</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['🕵️', '🧒'].map((emoji, i) => (
                <div key={i} style={{ flex: 1, background: t.card, borderRadius: 16, padding: '12px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 5 }}>{emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 6 }}>Player {i + 1}</div>
                  <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 8 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} onClick={() => { const ns = [...playerStars]; ns[i] = s; setPlayerStars(ns); }} style={{ fontSize: 14, color: s <= playerStars[i] ? t.warning : t.border, cursor: 'pointer' }}>★</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{['😬', '😐', '🙂', '😄', '🤩'][playerStars[i] - 1]} {['Struggling', 'OK', 'Good', 'Great', 'Perfect'][playerStars[i] - 1]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Environment indicator */}
          <div style={{ background: t.card, borderRadius: 14, padding: '11px 14px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 18 }}>🔇</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub }}>Noise Allowed</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>{['Silent only', 'Whisper only', 'Low voice', 'Normal voice'][noiseLevel]}</div>
            </div>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ width: 5, height: 6 + i * 4, background: i <= noiseLevel ? t.secondary : t.border, borderRadius: 2 }} />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setIsPaused(p => !p)}
              style={{ flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: '"Space Grotesk", sans-serif', fontSize: 14, fontWeight: 600, color: t.text }}>
              {isPaused ? React.createElement(window.lucide.Play, { size: 15, color: t.secondary }) : React.createElement(window.lucide.Pause, { size: 15, color: t.textSub })}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={endMission}
              style={{ flex: 1, background: t.dangerDim, border: `1px solid ${t.danger}44`, borderRadius: 14, padding: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: '"Space Grotesk", sans-serif', fontSize: 14, fontWeight: 600, color: t.danger }}>
              {React.createElement(window.lucide.Square, { size: 15 })}
              End
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── BROWSE SCREEN ────────────────────────────────────────────
  const BrowseScreen = () => {
    const [catFilter, setCatFilter] = useState('All');
    const [timeFilter, setTimeFilter] = useState('all');

    const categories = ['All', 'Teamwork', 'Observation', 'Self-Control', 'Creativity'];
    const timeOptions = [{ id: 'all', label: 'Any' }, { id: '3', label: '≤3m' }, { id: '5', label: '≤5m' }, { id: '10', label: '≤10m' }];

    const filtered = allMissions.filter(m => {
      const catOk = catFilter === 'All' || m.category === catFilter;
      const timeOk = timeFilter === 'all' || m.duration <= parseInt(timeFilter);
      const sceneOk = !selectedScene || m.setting.includes(selectedScene);
      return catOk && timeOk && sceneOk;
    });

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        <div style={{ padding: '12px 22px 10px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 3 }}>Mission Library</div>
          <div style={{ fontSize: 13, color: t.textSub }}>{filtered.length} missions available</div>
        </div>

        {selectedScene && (
          <div style={{ padding: '0 22px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: t.accentDim, border: `1px solid ${t.accent}55`, borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12 }}>{sceneModes.find(s => s.id === selectedScene)?.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: t.accent }}>{sceneModes.find(s => s.id === selectedScene)?.label}</span>
              <button onClick={() => setSelectedScene(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.accent, fontSize: 15, lineHeight: 1, padding: '0 0 0 2px' }}>×</button>
            </div>
          </div>
        )}

        <div style={{ padding: '0 22px 10px', display: 'flex', gap: 7, overflowX: 'auto' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{ background: catFilter === c ? t.accent : t.card, border: `1px solid ${catFilter === c ? t.accent : t.border}`, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: catFilter === c ? '#FFF' : t.textSub, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: '"Space Grotesk", sans-serif' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ padding: '0 22px 14px', display: 'flex', gap: 7 }}>
          {timeOptions.map(to => (
            <button key={to.id} onClick={() => setTimeFilter(to.id)} style={{ background: timeFilter === to.id ? t.secondaryDim : 'transparent', border: `1px solid ${timeFilter === to.id ? t.secondary : t.border}`, borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600, color: timeFilter === to.id ? t.secondary : t.textMuted, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}>
              {to.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '0 22px' }}>
          {filtered.map(mission => (
            <div
              key={mission.id}
              onClick={() => startMission(mission)}
              style={{ background: t.card, borderRadius: 20, padding: '14px', border: `1px solid ${completedMissions.includes(mission.id) ? t.secondary + '50' : t.border}`, marginBottom: 11, cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 46, height: 46, background: t.accentDim, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{mission.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{mission.title}</span>
                    {completedMissions.includes(mission.id) && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: t.secondary, background: t.secondaryDim, padding: '2px 7px', borderRadius: 10, flexShrink: 0 }}>DONE ✓</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: t.textSub, lineHeight: 1.5, marginBottom: 8 }}>
                    {mission.description.substring(0, 75)}…
                  </div>
                  <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: t.accent, background: t.accentDim, padding: '2px 8px', borderRadius: 10 }}>{mission.category}</span>
                    <span style={{ fontSize: 10, color: t.textMuted }}>⏱ {mission.duration}m</span>
                    <span style={{ fontSize: 10, color: t.textMuted }}>{'●'.repeat(mission.difficulty)}{'○'.repeat(3 - mission.difficulty)}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: t.accent, marginLeft: 'auto' }}>+{mission.points}pts</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
                {mission.setting.map(s => {
                  const sc = sceneModes.find(x => x.id === s);
                  return sc ? (
                    <span key={s} style={{ fontSize: 10, color: t.textMuted, background: t.borderLight, padding: '2px 7px', borderRadius: 7 }}>{sc.icon} {sc.label}</span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── SETTINGS SCREEN ──────────────────────────────────────────
  const SettingsScreen = () => {
    const noiseLevels = ['🔇 Silent', '🤫 Whisper', '🔉 Low Voice', '🔊 Normal'];
    const moveLevels = ['🧊 Stay Still', '💺 Seated OK', '🚶 Moving OK'];

    const Section = ({ title, children }) => (
      <div style={{ padding: '0 22px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1.4, marginBottom: 10 }}>{title}</div>
        <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden' }}>{children}</div>
      </div>
    );

    const Row = ({ label, sub, right, icon, last }) => (
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: last ? 'none' : `1px solid ${t.borderLight}` }}>
        {icon && <span style={{ fontSize: 17 }}>{icon}</span>}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{sub}</div>}
        </div>
        {right}
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        <div style={{ padding: '12px 22px 18px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 3 }}>Parent Controls</div>
          <div style={{ fontSize: 13, color: t.textSub }}>Customize for your environment</div>
        </div>

        <Section title="APPEARANCE">
          <Row
            icon={isDark ? '🌙' : '☀️'}
            label="Theme"
            sub={isDark ? 'Dark Mode' : 'Light Mode'}
            right={
              <button
                onClick={() => setIsDark(p => !p)}
                style={{ width: 48, height: 26, background: isDark ? t.accent : t.border, borderRadius: 13, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 3, left: isDark ? 25 : 3, width: 20, height: 20, background: '#FFF', borderRadius: '50%', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
              </button>
            }
            last />
        </Section>

        <Section title="GAME SETTINGS">
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${t.borderLight}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Max Noise Level</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {noiseLevels.map((l, i) => (
                <button key={i} onClick={() => setNoiseLevel(i)} style={{ background: noiseLevel === i ? t.accent : t.accentDim, border: `1px solid ${noiseLevel === i ? t.accent : 'transparent'}`, borderRadius: 10, padding: '6px 10px', fontSize: 11, fontWeight: 600, color: noiseLevel === i ? '#FFF' : t.textSub, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${t.borderLight}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Movement Allowed</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {moveLevels.map((l, i) => (
                <button key={i} onClick={() => setMovementLevel(i)} style={{ background: movementLevel === i ? t.secondary : t.secondaryDim, border: `1px solid ${movementLevel === i ? t.secondary : 'transparent'}`, borderRadius: 10, padding: '6px 10px', fontSize: 11, fontWeight: 600, color: movementLevel === i ? '#FFF' : t.textSub, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Session Time Limit</div>
              <span style={{ fontSize: 14, fontWeight: 800, color: t.accent }}>{timeLimit} min</span>
            </div>
            <input type="range" min={3} max={30} value={timeLimit} onChange={e => setTimeLimit(parseInt(e.target.value))} style={{ width: '100%', accentColor: t.accent, cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <span style={{ fontSize: 10, color: t.textMuted }}>3 min</span>
              <span style={{ fontSize: 10, color: t.textMuted }}>30 min</span>
            </div>
          </div>
        </Section>

        <Section title="FAMILY PROFILE">
          <Row
            icon="👨‍👩‍👧"
            label="The Smith Family"
            sub="3 players · Ages 5–12"
            right={React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })} />
          <Row icon="🏆" label="Missions Completed" sub="" right={<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{completedMissions.length}</span>} />
          <Row icon="⭐" label="Total Score" sub="" right={<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{score}</span>} />
          <Row icon="🔥" label="Current Streak" sub="" right={<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>5 days</span>} last />
        </Section>

        <Section title="APP INFO">
          <Row label="Version" right={<span style={{ fontSize: 13, color: t.textMuted }}>1.0.0</span>} />
          <Row label="Content Rating" right={<span style={{ fontSize: 13, color: t.textMuted }}>4+</span>} />
          <Row label="Privacy Policy" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: t.accent })} />
          <Row label="Terms of Service" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: t.accent })} last />
        </Section>
      </div>
    );
  };

  // ── RENDER ───────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#060610' : '#C8C0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; width: 100%; }
        input[type=range]::-webkit-slider-runnable-track { height: 4px; background: ${t.border}; border-radius: 2px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${t.accent}; margin-top: -7px; cursor: pointer; box-shadow: 0 2px 8px ${t.accentGlow}; }
      `}</style>

      <div style={phoneStyle}>
        <StatusBar />

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'mission' && <MissionScreen />}
          {activeTab === 'browse' && <BrowseScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 22px', borderTop: `1px solid ${t.border}`, background: t.navBg, position: 'relative', zIndex: 100 }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 18px' }}>
            {React.createElement(window.lucide.Home, { size: 22, color: activeTab === 'home' ? t.accent : t.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'home' ? t.accent : t.textMuted, fontFamily: '"Space Grotesk", sans-serif' }}>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('mission')}
            style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 18px', position: 'relative' }}>
            {activeMission && missionRunning && (
              <div style={{ position: 'absolute', top: 2, right: 14, width: 7, height: 7, background: t.secondary, borderRadius: '50%', boxShadow: `0 0 6px ${t.secondary}` }} />
            )}
            {React.createElement(window.lucide.Crosshair, { size: 22, color: activeTab === 'mission' ? t.accent : t.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'mission' ? t.accent : t.textMuted, fontFamily: '"Space Grotesk", sans-serif' }}>Mission</span>
          </button>

          <button
            onClick={() => setActiveTab('browse')}
            style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 18px' }}>
            {React.createElement(window.lucide.BookOpen, { size: 22, color: activeTab === 'browse' ? t.accent : t.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'browse' ? t.accent : t.textMuted, fontFamily: '"Space Grotesk", sans-serif' }}>Browse</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 18px' }}>
            {React.createElement(window.lucide.Settings, { size: 22, color: activeTab === 'settings' ? t.accent : t.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'settings' ? t.accent : t.textMuted, fontFamily: '"Space Grotesk", sans-serif' }}>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
