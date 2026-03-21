const { useState, useEffect, useRef } = React;

// ─── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const missions = [
    { id: 1, name: 'Clear Email Inbox', urgency: 'HIGH', time: '15min', xp: 250, category: 'Work', icon: 'Mail' },
    { id: 2, name: 'Room Cleanup', urgency: 'MEDIUM', time: '30min', xp: 400, category: 'Home', icon: 'Home' },
    { id: 3, name: 'Call Mom Back', urgency: 'CRITICAL', time: '10min', xp: 150, category: 'Personal', icon: 'Phone' },
  ];
  const urgencyColors = { CRITICAL: '#FF1744', HIGH: '#FF4500', MEDIUM: '#F59E0B', LOW: '#22C55E' };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '0 16px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingTop: 6 }}>
        <div>
          <div style={{ fontSize: 12, color: t.textSecondary, fontWeight: 500, letterSpacing: 0.5 }}>GOOD MORNING</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Ready to Run? 🔥</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${t.primary}55` }}>
          {React.createElement(window.lucide.User, { size: 18, color: t.primary })}
        </div>
      </div>

      {/* Streak Banner */}
      <div style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, borderRadius: 18, padding: '16px 18px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: `0 6px 24px ${t.primary}55` }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: 1, marginBottom: 2 }}>CURRENT STREAK</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#FFF', lineHeight: 1 }}>7 Days 🔥</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>+150 XP streak bonus active</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>TOTAL XP</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#FFF' }}>4,250</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Level 12 Runner</div>
        </div>
      </div>

      {/* Active Critical Mission */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>CRITICAL ALERT</div>
        <div style={{ background: t.surface, borderRadius: 18, padding: 16, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.accent}, ${t.primary})` }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 1, marginBottom: 3 }}>⚡ URGENT MISSION</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>Call Mom Back</div>
              <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>Personal · 10 minutes</div>
            </div>
            <div style={{ background: `${t.accent}22`, borderRadius: 10, padding: '4px 10px' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: t.accent }}>150 XP</span>
            </div>
          </div>
          <div style={{ background: t.surface2, borderRadius: 6, overflow: 'hidden', marginBottom: 10, height: 6 }}>
            <div style={{ width: '65%', height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 6 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: t.textSecondary }}>65% through mission window</span>
            <button style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, border: 'none', borderRadius: 10, padding: '8px 16px', color: '#FFF', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              START RUN →
            </button>
          </div>
        </div>
      </div>

      {/* Today's Missions */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5 }}>TODAY'S MISSIONS</div>
          <span style={{ fontSize: 12, color: t.primary, fontWeight: 700 }}>3 pending</span>
        </div>
        {missions.map(m => (
          <div key={m.id} style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, boxShadow: t.cardShadow }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `${urgencyColors[m.urgency]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(window.lucide[m.icon] || window.lucide.Star, { size: 17, color: urgencyColors[m.urgency] })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{m.name}</div>
              <div style={{ fontSize: 11, color: t.textSecondary }}>{m.category} · {m.time}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: urgencyColors[m.urgency], background: `${urgencyColors[m.urgency]}18`, borderRadius: 6, padding: '2px 8px', marginBottom: 3 }}>{m.urgency}</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>{m.xp} XP</div>
            </div>
          </div>
        ))}
      </div>

      {/* Focus Mode Banner */}
      <div style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', border: `1px solid ${t.border}`, marginTop: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.createElement(window.lucide.Timer, { size: 17, color: t.primary })}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Ambient Focus Mode</div>
          <div style={{ fontSize: 11, color: t.textSecondary }}>Ready to activate during your next run</div>
        </div>
        <div style={{ width: 40, height: 22, borderRadius: 11, background: t.surface2, position: 'relative', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', top: 2, left: 2, width: 18, height: 18, borderRadius: 9, background: t.textMuted }} />
        </div>
      </div>
    </div>
  );
}

// ─── MISSIONS SCREEN ───────────────────────────────────────────────────────────
function MissionsScreen({ t }) {
  const [missions, setMissions] = useState([
    { id: 1, name: 'Clear Email Inbox', urgency: 'HIGH', time: 15, category: 'Work' },
    { id: 2, name: 'Room Cleanup', urgency: 'MEDIUM', time: 30, category: 'Home' },
    { id: 3, name: 'Call Mom Back', urgency: 'CRITICAL', time: 10, category: 'Personal' },
    { id: 4, name: 'Review Project Docs', urgency: 'LOW', time: 45, category: 'Work' },
    { id: 5, name: 'Grocery Shopping', urgency: 'MEDIUM', time: 60, category: 'Errands' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', urgency: 'MEDIUM', time: '15', category: 'Work' });

  const urgencyColors = { CRITICAL: '#FF1744', HIGH: '#FF4500', MEDIUM: '#F59E0B', LOW: '#22C55E' };
  const urgencyBg = { CRITICAL: '#FF174420', HIGH: '#FF450020', MEDIUM: '#F59E0B20', LOW: '#22C55E20' };
  const xpMap = { CRITICAL: 150, HIGH: 250, MEDIUM: 180, LOW: 100 };

  const addMission = () => {
    if (!newTask.name.trim()) return;
    setMissions(prev => [...prev, { id: Date.now(), name: newTask.name, urgency: newTask.urgency, time: parseInt(newTask.time), category: newTask.category }]);
    setNewTask({ name: '', urgency: 'MEDIUM', time: '15', category: 'Work' });
    setShowForm(false);
  };

  const inputStyle = { width: '100%', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: t.text, outline: 'none', fontFamily: "'Space Grotesk', sans-serif", boxSizing: 'border-box' };
  const selectStyle = { flex: 1, background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 10, padding: '9px 10px', fontSize: 12, color: t.text, outline: 'none', fontFamily: "'Space Grotesk', sans-serif" };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '0 16px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 6 }}>
        <div>
          <div style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5 }}>5 PENDING</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Missions</div>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, border: 'none', borderRadius: 12, padding: '8px 14px', color: '#FFF', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, boxShadow: `0 4px 12px ${t.primary}44` }}>
          {React.createElement(window.lucide.Plus, { size: 14, color: '#FFF' })}
          Add Task
        </button>
      </div>

      {showForm && (
        <div style={{ background: t.surface, borderRadius: 18, padding: 16, marginBottom: 16, border: `1px solid ${t.primary}44`, boxShadow: `0 4px 20px ${t.primary}22` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>⚡ Convert Task to Mission</div>
          <input value={newTask.name} onChange={e => setNewTask(p => ({ ...p, name: e.target.value }))} placeholder="What needs to be done?" style={{ ...inputStyle, marginBottom: 10 }} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <select value={newTask.urgency} onChange={e => setNewTask(p => ({ ...p, urgency: e.target.value }))} style={selectStyle}>
              <option value="CRITICAL">🔴 Critical</option>
              <option value="HIGH">🟠 High</option>
              <option value="MEDIUM">🟡 Medium</option>
              <option value="LOW">🟢 Low</option>
            </select>
            <select value={newTask.time} onChange={e => setNewTask(p => ({ ...p, time: e.target.value }))} style={selectStyle}>
              <option value="5">5 min sprint</option>
              <option value="10">10 min run</option>
              <option value="15">15 min mission</option>
              <option value="30">30 min op</option>
              <option value="60">60 min marathon</option>
            </select>
          </div>
          <select value={newTask.category} onChange={e => setNewTask(p => ({ ...p, category: e.target.value }))} style={{ ...selectStyle, flex: 'unset', width: '100%', marginBottom: 12 }}>
            <option>Work</option><option>Home</option><option>Personal</option><option>Errands</option><option>Health</option>
          </select>
          <button onClick={addMission} style={{ width: '100%', background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, border: 'none', borderRadius: 12, padding: 12, color: '#FFF', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            ⚡ Launch Mission
          </button>
        </div>
      )}

      {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(urgency => {
        const filtered = missions.filter(m => m.urgency === urgency);
        if (!filtered.length) return null;
        return (
          <div key={urgency} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: urgencyColors[urgency], textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>
              ● {urgency} PRIORITY
            </div>
            {filtered.map(m => (
              <div key={m.id} style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, boxShadow: t.cardShadow }}>
                <div style={{ width: 4, height: 40, borderRadius: 2, background: urgencyColors[m.urgency], flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: t.textSecondary }}>{m.category} · {m.time} min · {xpMap[m.urgency]} XP</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, background: urgencyBg[m.urgency], color: urgencyColors[m.urgency], borderRadius: 6, padding: '2px 8px' }}>{m.time}min</div>
                  {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── PLAY SCREEN ───────────────────────────────────────────────────────────────
function PlayScreen({ t }) {
  const [gameState, setGameState] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  const [actionFlash, setActionFlash] = useState(false);
  const timerRef = useRef(null);

  const missionList = [
    { id: 1, name: 'Call Mom Back', time: 10, xp: 150, urgency: 'CRITICAL', emoji: '📞' },
    { id: 2, name: 'Clear Email Inbox', time: 15, xp: 250, urgency: 'HIGH', emoji: '📧' },
    { id: 3, name: 'Room Cleanup', time: 30, xp: 400, urgency: 'MEDIUM', emoji: '🧹' },
  ];
  const urgencyColors = { CRITICAL: '#FF1744', HIGH: '#FF4500', MEDIUM: '#F59E0B', LOW: '#22C55E' };

  useEffect(() => {
    if (gameState === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  const startMission = (mission) => {
    setSelectedMission(mission);
    setTimeLeft(mission.time * 60);
    setTotalTime(mission.time * 60);
    setCombo(0);
    setScore(0);
    setGameState('running');
  };

  const handleAction = () => {
    if (gameState !== 'running') return;
    const newCombo = combo + 1;
    setCombo(newCombo);
    setScore(s => s + 10 * newCombo);
    setActionFlash(true);
    setTimeout(() => setActionFlash(false), 150);
  };

  const completeMission = () => { clearInterval(timerRef.current); setGameState('complete'); };
  const resetGame = () => { setGameState('idle'); setSelectedMission(null); setTimeLeft(0); setCombo(0); setScore(0); };
  const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;
  const urgencyColor = selectedMission ? urgencyColors[selectedMission.urgency] : t.primary;

  if (gameState === 'idle') {
    return (
      <div style={{ height: '100%', overflowY: 'auto', padding: '0 16px 16px' }}>
        <div style={{ paddingTop: 6, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5 }}>LAUNCH PAD</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Choose Your Run</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #0D0A08, #2A1A0C)', borderRadius: 20, padding: 20, marginBottom: 16, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: 40, background: `${t.primary}22` }} />
          <div style={{ position: 'absolute', bottom: -10, left: -10, width: 60, height: 60, borderRadius: 30, background: `${t.accent}18` }} />
          <div style={{ fontSize: 44, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>Alert Run</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Turn pressure into momentum</div>
        </div>
        {missionList.map(m => (
          <div key={m.id} style={{ background: t.surface, borderRadius: 18, padding: 16, marginBottom: 10, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 28 }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: t.textSecondary }}>{m.time} minute mission</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: urgencyColors[m.urgency], fontWeight: 700, background: `${urgencyColors[m.urgency]}18`, borderRadius: 6, padding: '2px 8px', marginBottom: 4 }}>{m.urgency}</div>
                <div style={{ fontSize: 12, color: t.secondary, fontWeight: 700 }}>+{m.xp} XP</div>
              </div>
            </div>
            <button onClick={() => startMission(m)} style={{ width: '100%', background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, border: 'none', borderRadius: 12, padding: 11, color: '#FFF', fontSize: 13, fontWeight: 800, cursor: 'pointer', letterSpacing: 1, boxShadow: `0 4px 12px ${t.primary}44` }}>
              START RUN →
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (gameState === 'complete') {
    const earnedXP = selectedMission ? Math.floor(selectedMission.xp * (1 + combo * 0.05)) : 0;
    return (
      <div style={{ height: '100%', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 10 }}>🏆</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 4 }}>Mission Complete!</div>
        <div style={{ fontSize: 14, color: t.textSecondary, marginBottom: 24 }}>{selectedMission?.name}</div>
        <div style={{ background: t.surface, borderRadius: 20, padding: 20, width: '100%', marginBottom: 14, boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.primary }}>+{earnedXP}</div>
              <div style={{ fontSize: 11, color: t.textSecondary }}>XP Earned</div>
            </div>
            <div style={{ width: 1, background: t.border }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.secondary }}>{score}</div>
              <div style={{ fontSize: 11, color: t.textSecondary }}>Score</div>
            </div>
            <div style={{ width: 1, background: t.border }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.accent }}>{combo}x</div>
              <div style={{ fontSize: 11, color: t.textSecondary }}>Max Combo</div>
            </div>
          </div>
          <div style={{ background: `${t.primary}14`, borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.primary, marginBottom: 4 }}>Next Step →</div>
            <div style={{ fontSize: 12, color: t.text, lineHeight: 1.5 }}>Keep the momentum! You have 2 more missions today. Start the next one within 5 minutes for a combo bonus.</div>
          </div>
        </div>
        <button onClick={resetGame} style={{ width: '100%', background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, border: 'none', borderRadius: 14, padding: 14, color: '#FFF', fontSize: 15, fontWeight: 800, cursor: 'pointer', marginBottom: 8, boxShadow: `0 6px 20px ${t.primary}44` }}>
          Next Mission →
        </button>
        <button onClick={resetGame} style={{ width: '100%', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 14, padding: 12, color: t.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Back to Missions
        </button>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: t.bg }}>
      {/* Game header bar */}
      <div style={{ padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={resetGame} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: '5px 12px', fontSize: 12, color: t.textSecondary, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>
          ✕ Quit
        </button>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: 1 }}>MISSION IN PROGRESS</div>
        <button onClick={() => setGameState(s => s === 'running' ? 'paused' : 'running')} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: '5px 12px', fontSize: 12, color: t.primary, cursor: 'pointer', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
          {gameState === 'running' ? '⏸ Pause' : '▶ Resume'}
        </button>
      </div>

      {/* Timer */}
      <div style={{ textAlign: 'center', padding: '6px 0 4px' }}>
        <div style={{ fontSize: 10, color: t.textSecondary, fontWeight: 700, letterSpacing: 1.5, marginBottom: 2 }}>TIME REMAINING</div>
        <div style={{ fontSize: 46, fontWeight: 800, color: timeLeft < 60 ? t.accent : t.text, letterSpacing: -2, lineHeight: 1 }}>
          {formatTime(timeLeft)}
        </div>
        <div style={{ padding: '6px 24px 0' }}>
          <div style={{ background: t.surface2, borderRadius: 4, height: 5, overflow: 'hidden' }}>
            <div style={{ width: `${progress * 100}%`, height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 4, transition: 'width 1s linear' }} />
          </div>
        </div>
      </div>

      {/* Game visual area */}
      <div style={{ flex: 1, margin: '8px 14px', background: 'linear-gradient(180deg, #0D0A08 0%, #1A1008 100%)', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
        {/* Stars */}
        {[12, 28, 45, 62, 78, 90, 15, 35, 55, 70, 85, 5, 40, 65, 95].map((left, i) => (
          <div key={i} style={{ position: 'absolute', width: 2, height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 1, top: `${[10, 25, 15, 40, 8, 30, 55, 20, 45, 12, 38, 65, 5, 50, 22][i]}%`, left: `${left}%` }} />
        ))}

        {/* Mission label */}
        <div style={{ position: 'absolute', top: 12, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{selectedMission?.name}</div>
        </div>

        {/* Combo */}
        {combo > 0 && (
          <div style={{ position: 'absolute', top: 34, right: 12, background: `${t.accent}CC`, borderRadius: 10, padding: '4px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#FFF' }}>x{combo}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', letterSpacing: 1 }}>COMBO</div>
          </div>
        )}

        {/* Score */}
        <div style={{ position: 'absolute', top: 34, left: 12, background: 'rgba(0,0,0,0.5)', borderRadius: 10, padding: '4px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFF' }}>{score}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>SCORE</div>
        </div>

        {/* Obstacles row */}
        <div style={{ position: 'absolute', bottom: 52, left: 0, right: 0, height: 36, paddingLeft: 16, paddingRight: 16 }}>
          <div style={{ position: 'absolute', bottom: 0, left: '22%', width: 18, height: 28, background: `${urgencyColor}BB`, borderRadius: 4 }} />
          <div style={{ position: 'absolute', bottom: 0, left: '52%', width: 14, height: 34, background: `${t.accent}AA`, borderRadius: 4 }} />
          <div style={{ position: 'absolute', bottom: 0, left: '78%', width: 20, height: 22, background: '#FFB347AA', borderRadius: 4 }} />
        </div>

        {/* Ground line */}
        <div style={{ position: 'absolute', bottom: 44, left: 16, right: 16, height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 1 }} />

        {/* Runner + progress track */}
        <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 15, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, boxShadow: `0 0 12px ${t.primary}88` }}>
            🏃
          </div>
          <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${progress * 100}%`, height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 2 }} />
          </div>
          {React.createElement(window.lucide.Flag, { size: 16, color: 'rgba(255,255,255,0.4)' })}
        </div>

        {/* Paused overlay */}
        {gameState === 'paused' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderRadius: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#FFF', marginBottom: 6 }}>⏸ PAUSED</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Tap Resume to continue your run</div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ padding: '6px 14px 8px' }}>
        <button
          onClick={handleAction}
          disabled={gameState !== 'running'}
          style={{ width: '100%', background: actionFlash ? '#FFF' : (gameState === 'running' ? `linear-gradient(135deg, ${t.primary}, ${t.accent})` : t.surface2), border: 'none', borderRadius: 16, padding: 16, color: actionFlash ? t.primary : '#FFF', fontSize: 18, fontWeight: 900, cursor: gameState === 'running' ? 'pointer' : 'default', letterSpacing: 2, boxShadow: gameState === 'running' ? `0 6px 20px ${t.primary}55` : 'none', marginBottom: 8, transition: 'background 0.1s', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ⚡ ACTION
        </button>
        <button onClick={completeMission} style={{ width: '100%', background: `${t.success}18`, border: `1px solid ${t.success}55`, borderRadius: 12, padding: 10, color: t.success, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>
          ✓ Mark Real Task Complete
        </button>
      </div>
    </div>
  );
}

// ─── REWARDS SCREEN ────────────────────────────────────────────────────────────
function RewardsScreen({ t }) {
  const badges = [
    { id: 1, name: 'First Run', icon: '🏃', earned: true, date: 'Mar 15' },
    { id: 2, name: 'Speed Demon', icon: '⚡', earned: true, date: 'Mar 16' },
    { id: 3, name: 'Streak Master', icon: '🔥', earned: true, date: 'Mar 18' },
    { id: 4, name: 'Email Slayer', icon: '📧', earned: false, date: null },
    { id: 5, name: 'Night Owl', icon: '🦉', earned: false, date: null },
    { id: 6, name: 'Combo King', icon: '👑', earned: false, date: null },
  ];
  const completed = [
    { id: 1, name: 'Reply to boss email', xp: 250, combo: '12x', time: 'Mar 22, 9:14am' },
    { id: 2, name: 'Wash dishes', xp: 100, combo: '5x', time: 'Mar 21, 8:30pm' },
    { id: 3, name: 'Call dentist', xp: 150, combo: '8x', time: 'Mar 21, 2:00pm' },
    { id: 4, name: 'File tax docs', xp: 400, combo: '22x', time: 'Mar 20, 7:45pm' },
  ];
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeDay = [true, true, true, true, true, true, false];

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '0 16px 16px' }}>
      <div style={{ paddingTop: 6, marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5 }}>YOUR PROGRESS</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Rewards</div>
      </div>

      {/* XP overview */}
      <div style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, borderRadius: 20, padding: 18, marginBottom: 14, boxShadow: `0 6px 24px ${t.primary}44` }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 14 }}>
          {[['4,250', 'Total XP'], ['12', 'Level'], ['23', 'Missions']].map(([val, label], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#FFF' }}>{val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 6, height: 7, overflow: 'hidden' }}>
          <div style={{ width: '85%', height: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 6 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Level 12</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>750 XP to Level 13</span>
        </div>
      </div>

      {/* Weekly streak */}
      <div style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', marginBottom: 14, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 10 }}>Weekly Streak 🔥</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {weekDays.map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, background: activeDay[i] ? `linear-gradient(135deg, ${t.primary}, ${t.accent})` : t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {activeDay[i] ? <span style={{ fontSize: 14 }}>🔥</span> : <span style={{ fontSize: 10, color: t.textMuted }}>○</span>}
              </div>
              <span style={{ fontSize: 10, color: t.textSecondary, fontWeight: 600 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>BADGES</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {badges.map(b => (
            <div key={b.id} style={{ background: t.surface, borderRadius: 14, padding: '12px 8px', border: `1px solid ${b.earned ? t.primary + '55' : t.border}`, textAlign: 'center', opacity: b.earned ? 1 : 0.45 }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{b.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: b.earned ? t.text : t.textMuted, lineHeight: 1.2 }}>{b.name}</div>
              {b.earned && <div style={{ fontSize: 9, color: t.primary, marginTop: 3, fontWeight: 600 }}>{b.date}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Recent missions */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>RECENT MISSIONS</div>
        {completed.map(m => (
          <div key={m.id} style={{ background: t.surface, borderRadius: 12, padding: '11px 14px', marginBottom: 8, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.success}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 16, color: t.success }}>✓</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{m.name}</div>
              <div style={{ fontSize: 11, color: t.textSecondary }}>{m.time}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>+{m.xp} XP</div>
              <div style={{ fontSize: 11, color: t.textSecondary }}>{m.combo} combo</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ───────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark }) {
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [notifs, setNotifs] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  const Toggle = ({ value, onToggle }) => (
    <div onClick={onToggle} style={{ width: 46, height: 26, borderRadius: 13, background: value ? t.primary : t.surface2, cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: `1px solid ${value ? t.primary : t.border}` }}>
      <div style={{ position: 'absolute', top: 3, left: value ? 22 : 3, width: 18, height: 18, borderRadius: 9, background: '#FFF', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
    </div>
  );

  const Row = ({ icon, label, sub, value, onToggle }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: `1px solid ${t.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.createElement(window.lucide[icon], { size: 16, color: t.primary })}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: t.textSecondary }}>{sub}</div>}
        </div>
      </div>
      <Toggle value={value} onToggle={onToggle} />
    </div>
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '0 16px 16px' }}>
      <div style={{ paddingTop: 6, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5 }}>PREFERENCES</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Settings</div>
      </div>

      {/* Profile card */}
      <div style={{ background: t.surface, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          🏃
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Alex Runner</div>
          <div style={{ fontSize: 12, color: t.textSecondary }}>Level 12 · 4,250 XP · 7-day streak</div>
        </div>
        {React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })}
      </div>

      {/* Appearance */}
      <div style={{ fontSize: 10, fontWeight: 800, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>APPEARANCE</div>
      <div style={{ background: t.surface, borderRadius: 16, padding: '0 16px', marginBottom: 12, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 16, color: t.primary })}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Dark Mode</div>
              <div style={{ fontSize: 11, color: t.textSecondary }}>{isDark ? 'Dark theme active' : 'Light theme active'}</div>
            </div>
          </div>
          <Toggle value={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </div>

      {/* Audio & Haptics */}
      <div style={{ fontSize: 10, fontWeight: 800, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>AUDIO & HAPTICS</div>
      <div style={{ background: t.surface, borderRadius: 16, padding: '0 16px', marginBottom: 12, border: `1px solid ${t.border}` }}>
        <Row icon="Volume2" label="Sound Effects" sub="In-game audio feedback" value={sound} onToggle={() => setSound(!sound)} />
        <div style={{ borderBottom: 'none' }}>
          <Row icon="Smartphone" label="Vibration" sub="Haptic feedback on actions" value={vibration} onToggle={() => setVibration(!vibration)} />
        </div>
      </div>

      {/* Gameplay */}
      <div style={{ fontSize: 10, fontWeight: 800, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>GAMEPLAY</div>
      <div style={{ background: t.surface, borderRadius: 16, padding: '0 16px', marginBottom: 12, border: `1px solid ${t.border}` }}>
        <Row icon="Bell" label="Notifications" sub="Mission reminders & streak alerts" value={notifs} onToggle={() => setNotifs(!notifs)} />
        <div style={{ borderBottom: 'none' }}>
          <Row icon="Eye" label="Focus Mode" sub="Reduce visual distractions" value={focusMode} onToggle={() => setFocusMode(!focusMode)} />
        </div>
      </div>

      {/* About */}
      <div style={{ fontSize: 10, fontWeight: 800, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>ABOUT</div>
      <div style={{ background: t.surface, borderRadius: 16, padding: '0 16px', border: `1px solid ${t.border}` }}>
        {['About Alert Run', 'Privacy Policy', 'Terms of Service'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none' }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{item}</span>
            {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: t.textMuted }}>Alert Run v1.0.0 · Built to fight procrastination</div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const themes = {
    light: {
      bg: '#F6F1EC',
      surface: '#FFFFFF',
      surface2: '#FFF0E6',
      text: '#1A0800',
      textSecondary: '#7A5845',
      textMuted: '#B8987A',
      border: '#EDE0D2',
      primary: '#FF4500',
      secondary: '#FFB347',
      accent: '#FF1744',
      success: '#22C55E',
      navBg: '#FFFFFF',
      cardShadow: '0 2px 14px rgba(255,69,0,0.09)',
    },
    dark: {
      bg: '#0C0805',
      surface: '#1C1410',
      surface2: '#261A12',
      text: '#FFF5F0',
      textSecondary: '#C09880',
      textMuted: '#5A3825',
      border: '#3A2018',
      primary: '#FF4500',
      secondary: '#FFB347',
      accent: '#FF3366',
      success: '#22C55E',
      navBg: '#1C1410',
      cardShadow: '0 2px 16px rgba(0,0,0,0.5)',
    },
  };

  const t = themes[isDark ? 'dark' : 'light'];

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'missions', icon: 'Target', label: 'Missions' },
    { id: 'play', icon: 'Zap', label: 'Play', fab: true },
    { id: 'rewards', icon: 'Trophy', label: 'Rewards' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#181410', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 10px', flexShrink: 0, zIndex: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {React.createElement(window.lucide.Signal, { size: 13, color: t.text })}
            {React.createElement(window.lucide.Wifi, { size: 13, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 13, color: t.text })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {activeTab === 'home' && React.createElement(HomeScreen, { t, isDark })}
          {activeTab === 'missions' && React.createElement(MissionsScreen, { t, isDark })}
          {activeTab === 'play' && React.createElement(PlayScreen, { t, isDark })}
          {activeTab === 'rewards' && React.createElement(RewardsScreen, { t, isDark })}
          {activeTab === 'settings' && React.createElement(SettingsScreen, { t, isDark, setIsDark })}
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '6px 0 18px', borderTop: `1px solid ${t.border}`, background: t.navBg, flexShrink: 0 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: item.fab ? '4px 6px' : '4px 8px' }}>
              {item.fab ? (
                <div style={{ width: 48, height: 48, borderRadius: 24, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -22, boxShadow: `0 4px 18px ${t.primary}77` }}>
                  {React.createElement(window.lucide[item.icon], { size: 22, color: '#FFFFFF' })}
                </div>
              ) : (
                React.createElement(window.lucide[item.icon], { size: 22, color: activeTab === item.id ? t.primary : t.textMuted })
              )}
              <span style={{ fontSize: 10, color: activeTab === item.id ? t.primary : t.textMuted, fontWeight: activeTab === item.id ? 700 : 400, fontFamily: "'Space Grotesk', sans-serif", marginTop: item.fab ? 2 : 0 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
