function App() {
  const { useState, useEffect, useRef } = React;

  // Inject Google Fonts
  const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');`;

  const [activeTab, setActiveTab] = useState('home');
  const [focusActive, setFocusActive] = useState(false);
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [selectedTechnique, setSelectedTechnique] = useState('pomodoro');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [toggleStates, setToggleStates] = useState({ smartReminders: true, adaptiveSchedule: true, distractionAlert: false });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (focusActive) {
      intervalRef.current = setInterval(() => {
        setFocusSeconds(s => s > 0 ? s - 1 : 0);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [focusActive]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const toggleSwitch = (key) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const colors = {
    bg: '#FFF5EE',
    amber: '#F6A623',
    amberLight: '#FDD878',
    pink: '#FFB6C1',
    pinkDark: '#F07090',
    plum: '#6B3A5B',
    plumLight: '#9B6B8B',
    plumDark: '#4A2540',
    white: '#FFFFFF',
    gray: '#8A8A9A',
    lightGray: '#F0EBE8',
    text: '#2D1F2B',
    textLight: '#7A6070',
  };

  const gradients = {
    sunset: 'linear-gradient(135deg, #F6A623 0%, #FFB6C1 50%, #6B3A5B 100%)',
    amberPink: 'linear-gradient(135deg, #F6A623 0%, #FFB6C1 100%)',
    pinkPlum: 'linear-gradient(135deg, #FFB6C1 0%, #6B3A5B 100%)',
    plumAmber: 'linear-gradient(135deg, #6B3A5B 0%, #F6A623 100%)',
    softBg: 'linear-gradient(180deg, #FFF5EE 0%, #FFF0E8 100%)',
  };

  // ── Screens ──────────────────────────────────────────────────────────────

  const HomeScreen = () => {
    const distractions = [
      { label: 'Social Media', pct: 38, color: colors.pinkDark },
      { label: 'Phone Notifications', pct: 27, color: colors.amber },
      { label: 'Background Noise', pct: 20, color: colors.plumLight },
      { label: 'Context Switching', pct: 15, color: colors.gray },
    ];

    const insights = [
      { icon: window.lucide.Zap, text: 'You focus best between 9–11 AM', color: colors.amber },
      { icon: window.lucide.AlertCircle, text: 'Social apps spike after lunch', color: colors.pinkDark },
      { icon: window.lucide.TrendingUp, text: 'Deep work up 12% this week!', color: colors.plum },
    ];

    return (
      <div style={{ padding: '0 16px 16px', overflowY: 'auto', height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 13, color: colors.textLight, fontFamily: 'Quicksand', fontWeight: 500 }}>Good morning,</p>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', margin: 0 }}>Alex 👋</h2>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 21, background: gradients.amberPink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Bell, { size: 18, color: '#fff' })}
          </div>
        </div>

        {/* Focus Score Card */}
        <div style={{ background: gradients.sunset, borderRadius: 20, padding: '20px', marginBottom: 16, color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: -10, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.07)' }} />
          <p style={{ fontSize: 12, opacity: 0.85, fontFamily: 'Quicksand', fontWeight: 600, marginBottom: 4 }}>TODAY'S FOCUS SCORE</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 52, fontWeight: 700, fontFamily: 'Sora', lineHeight: 1 }}>78</span>
            <span style={{ fontSize: 18, opacity: 0.8, marginBottom: 8 }}>/100</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 6, height: 8, marginBottom: 8 }}>
            <div style={{ background: '#fff', borderRadius: 6, height: 8, width: '78%' }} />
          </div>
          <p style={{ fontSize: 12, opacity: 0.85, fontFamily: 'Quicksand' }}>+6 pts from yesterday · Keep it up!</p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Deep Work', value: '3h 20m', icon: window.lucide.Clock, color: colors.amber },
            { label: 'Breaks Taken', value: '4', icon: window.lucide.Coffee, color: colors.pinkDark },
            { label: 'Tasks Done', value: '7 / 9', icon: window.lucide.CheckCircle, color: colors.plum },
          ].map((stat) => (
            <div key={stat.label} style={{ flex: 1, background: colors.white, borderRadius: 14, padding: '12px 10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(107,58,91,0.08)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: stat.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                {React.createElement(stat.icon, { size: 16, color: stat.color })}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: colors.text, fontFamily: 'Sora', margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 500 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            {React.createElement(window.lucide.Sparkles, { size: 16, color: colors.amber })}
            <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', margin: 0 }}>AI Insights</p>
          </div>
          {insights.map((ins, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < insights.length - 1 ? `1px solid ${colors.lightGray}` : 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: ins.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(ins.icon, { size: 14, color: ins.color })}
              </div>
              <p style={{ fontSize: 12, color: colors.textLight, fontFamily: 'Quicksand', fontWeight: 600, margin: 0 }}>{ins.text}</p>
            </div>
          ))}
        </div>

        {/* Top Distractions */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 12 }}>Top Distractions Today</p>
          {distractions.map((d) => (
            <div key={d.label} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: colors.text, fontFamily: 'Quicksand', fontWeight: 600 }}>{d.label}</span>
                <span style={{ fontSize: 12, color: d.color, fontFamily: 'Quicksand', fontWeight: 700 }}>{d.pct}%</span>
              </div>
              <div style={{ background: colors.lightGray, borderRadius: 4, height: 6 }}>
                <div style={{ background: d.color, borderRadius: 4, height: 6, width: `${d.pct}%`, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FocusScreen = () => {
    const techniques = [
      { id: 'pomodoro', name: 'Pomodoro', desc: '25 min focus, 5 min break', mins: 25, icon: window.lucide.Timer },
      { id: 'deep', name: 'Deep Work', desc: '90 min focused session', mins: 90, icon: window.lucide.Brain },
      { id: 'short', name: 'Quick Burst', desc: '10 min micro sessions', mins: 10, icon: window.lucide.Zap },
      { id: 'flow', name: 'Flow State', desc: 'Unlimited until done', mins: 60, icon: window.lucide.Waves },
    ];

    const currentTech = techniques.find(t => t.id === selectedTechnique);
    const totalSecs = currentTech.mins * 60;
    const progress = (totalSecs - focusSeconds) / totalSecs;

    const circumference = 2 * Math.PI * 85;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <div style={{ padding: '0 16px 16px', overflowY: 'auto', height: '100%' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 4 }}>Focus Session</h2>
        <p style={{ fontSize: 13, color: colors.textLight, fontFamily: 'Quicksand', marginBottom: 20 }}>Choose your technique and start</p>

        {/* Technique Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {techniques.map((tech) => (
            <div
              key={tech.id}
              onClick={() => { setSelectedTechnique(tech.id); setFocusActive(false); setFocusSeconds(tech.mins * 60); }}
              style={{
                background: selectedTechnique === tech.id ? gradients.amberPink : colors.white,
                borderRadius: 14,
                padding: 12,
                cursor: 'pointer',
                boxShadow: selectedTechnique === tech.id ? '0 4px 16px rgba(246,166,35,0.3)' : '0 2px 8px rgba(107,58,91,0.06)',
                transition: 'all 0.2s ease',
                border: `2px solid ${selectedTechnique === tech.id ? 'transparent' : colors.lightGray}`,
              }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: selectedTechnique === tech.id ? 'rgba(255,255,255,0.3)' : colors.amber + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                {React.createElement(tech.icon, { size: 16, color: selectedTechnique === tech.id ? '#fff' : colors.amber })}
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: selectedTechnique === tech.id ? '#fff' : colors.text, fontFamily: 'Sora', margin: 0 }}>{tech.name}</p>
              <p style={{ fontSize: 10, color: selectedTechnique === tech.id ? 'rgba(255,255,255,0.8)' : colors.gray, fontFamily: 'Quicksand', fontWeight: 500 }}>{tech.desc}</p>
            </div>
          ))}
        </div>

        {/* Timer Ring */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r="85" fill="none" stroke={colors.lightGray} strokeWidth="12" />
              <circle cx="100" cy="100" r="85" fill="none" stroke="url(#timerGrad)" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{ transition: 'stroke-dashoffset 1s linear' }} />
              <defs>
                <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={colors.amber} />
                  <stop offset="100%" stopColor={colors.pinkDark} />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: 38, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', margin: 0, lineHeight: 1 }}>{formatTime(focusSeconds)}</p>
              <p style={{ fontSize: 12, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 600 }}>{currentTech.name}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          <div
            onClick={() => { setFocusActive(false); setFocusSeconds(currentTech.mins * 60); handlePress('reset'); }}
            style={{ width: 50, height: 50, borderRadius: 25, background: colors.lightGray, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transform: pressedBtn === 'reset' ? 'scale(0.92)' : 'scale(1)', transition: 'transform 0.15s' }}
          >
            {React.createElement(window.lucide.RotateCcw, { size: 20, color: colors.gray })}
          </div>
          <div
            onClick={() => { setFocusActive(!focusActive); handlePress('play'); }}
            style={{ width: 70, height: 70, borderRadius: 35, background: gradients.amberPink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 6px 20px rgba(246,166,35,0.4)', transform: pressedBtn === 'play' ? 'scale(0.92)' : 'scale(1)', transition: 'transform 0.15s' }}
          >
            {React.createElement(focusActive ? window.lucide.Pause : window.lucide.Play, { size: 28, color: '#fff' })}
          </div>
          <div
            onClick={() => { setFocusActive(false); setFocusSeconds(5 * 60); handlePress('break'); }}
            style={{ width: 50, height: 50, borderRadius: 25, background: colors.pink + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transform: pressedBtn === 'break' ? 'scale(0.92)' : 'scale(1)', transition: 'transform 0.15s' }}
          >
            {React.createElement(window.lucide.Coffee, { size: 20, color: colors.pinkDark })}
          </div>
        </div>

        {/* Current Task */}
        <div style={{ background: colors.white, borderRadius: 16, padding: 14, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', margin: 0 }}>Current Task</p>
            {React.createElement(window.lucide.Edit2, { size: 14, color: colors.gray })}
          </div>
          <div style={{ background: gradients.softBg, borderRadius: 10, padding: '10px 12px', marginBottom: 8 }}>
            <p style={{ fontSize: 13, color: colors.text, fontFamily: 'Quicksand', fontWeight: 600, margin: 0 }}>📝 Write quarterly report draft</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Work', 'Writing', 'Q1'].map(tag => (
              <span key={tag} style={{ fontSize: 10, fontFamily: 'Quicksand', fontWeight: 700, color: colors.plumLight, background: colors.pink + '30', padding: '3px 8px', borderRadius: 6 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsScreen = () => {
    const weekData = [
      { day: 'Mon', hours: 4.5, score: 72 },
      { day: 'Tue', hours: 3.2, score: 58 },
      { day: 'Wed', hours: 5.8, score: 89 },
      { day: 'Thu', hours: 4.0, score: 65 },
      { day: 'Fri', hours: 6.1, score: 93 },
      { day: 'Sat', hours: 2.0, score: 40 },
      { day: 'Sun', hours: 1.5, score: 30 },
    ];

    const maxHours = Math.max(...weekData.map(d => d.hours));

    const hourlyData = [
      { hour: '8AM', focus: 30 }, { hour: '9AM', focus: 82 }, { hour: '10AM', focus: 91 },
      { hour: '11AM', focus: 88 }, { hour: '12PM', focus: 45 }, { hour: '1PM', focus: 38 },
      { hour: '2PM', focus: 62 }, { hour: '3PM', focus: 75 }, { hour: '4PM', focus: 70 },
      { hour: '5PM', focus: 40 }, { hour: '6PM', focus: 22 },
    ];

    return (
      <div style={{ padding: '0 16px 16px', overflowY: 'auto', height: '100%' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 4 }}>Analytics</h2>
        <p style={{ fontSize: 13, color: colors.textLight, fontFamily: 'Quicksand', marginBottom: 20 }}>Your productivity patterns this week</p>

        {/* Weekly Summary Cards */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Avg Daily Focus', value: '4.2h', change: '+18%', up: true },
            { label: 'Best Streak', value: '3 days', change: 'New!', up: true },
            { label: 'Distractions', value: '12/day', change: '-24%', up: true },
          ].map((card) => (
            <div key={card.label} style={{ flex: 1, background: colors.white, borderRadius: 14, padding: 12, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', margin: 0 }}>{card.value}</p>
              <p style={{ fontSize: 9, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 600, marginBottom: 4 }}>{card.label}</p>
              <span style={{ fontSize: 10, fontWeight: 700, color: card.up ? '#4CAF50' : colors.pinkDark, fontFamily: 'Quicksand' }}>{card.change}</span>
            </div>
          ))}
        </div>

        {/* Weekly Bar Chart */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 16 }}>Deep Work Hours · This Week</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
            {weekData.map((d) => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '100%', borderRadius: '6px 6px 0 0',
                  height: `${(d.hours / maxHours) * 80}px`,
                  background: d.day === 'Fri' ? gradients.amberPink : d.score >= 70 ? colors.amber + 'AA' : colors.lightGray,
                  transition: 'height 0.5s ease',
                  minHeight: 8,
                }} />
                <p style={{ fontSize: 9, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 600 }}>{d.day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Focus Chart */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 4 }}>Peak Focus Hours</p>
          <p style={{ fontSize: 11, color: colors.textLight, fontFamily: 'Quicksand', marginBottom: 12 }}>Your focus intensity throughout the day</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 70 }}>
            {hourlyData.map((d) => (
              <div key={d.hour} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: '100%', borderRadius: '4px 4px 0 0',
                  height: `${d.focus * 0.6}px`,
                  background: d.focus >= 80 ? gradients.pinkPlum : d.focus >= 60 ? colors.amber + 'BB' : colors.pink + '88',
                  minHeight: 4,
                }} />
                <p style={{ fontSize: 7, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 600, transform: 'rotate(-30deg)', transformOrigin: 'top center', whiteSpace: 'nowrap' }}>{d.hour}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distraction Breakdown */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 4 }}>AI Behavior Report</p>
          <p style={{ fontSize: 11, color: colors.textLight, fontFamily: 'Quicksand', marginBottom: 12 }}>Personalized patterns detected this week</p>
          {[
            { insight: 'You check Instagram ~18x/day during work', severity: 'high', icon: window.lucide.Smartphone },
            { insight: 'Focus dips 40% after lunch (12–2 PM)', severity: 'med', icon: window.lucide.TrendingDown },
            { insight: 'Noise cancelling boosts your output by 27%', severity: 'good', icon: window.lucide.Headphones },
            { insight: 'Tuesday mornings are your weakest sessions', severity: 'med', icon: window.lucide.Calendar },
          ].map((item, i) => {
            const severityColor = item.severity === 'high' ? colors.pinkDark : item.severity === 'med' ? colors.amber : '#4CAF50';
            return (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '9px 0', borderBottom: i < 3 ? `1px solid ${colors.lightGray}` : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: severityColor + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {React.createElement(item.icon, { size: 13, color: severityColor })}
                </div>
                <p style={{ fontSize: 12, color: colors.textLight, fontFamily: 'Quicksand', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{item.insight}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const PlaylistScreen = () => {
    const playlists = [
      { id: 'deep', name: 'Deep Work Mode', desc: 'Lo-fi & ambient for sustained focus', tracks: 24, duration: '1h 52m', color: colors.plum, icon: '🧠' },
      { id: 'flow', name: 'Flow State', desc: 'Binaural beats & nature sounds', tracks: 16, duration: '2h 10m', color: colors.amber, icon: '🌊' },
      { id: 'morning', name: 'Morning Energy', desc: 'Upbeat instrumentals to start the day', tracks: 20, duration: '1h 28m', color: colors.pinkDark, icon: '☀️' },
      { id: 'study', name: 'Study Session', desc: 'Classical & jazz for creative thinking', tracks: 30, duration: '2h 45m', color: '#5B8A6B', icon: '📚' },
      { id: 'break', name: 'Break Time', desc: 'Relaxing tunes to recharge', tracks: 12, duration: '0h 48m', color: '#6B8ABB', icon: '☕' },
    ];

    const currentTrack = { title: 'Midnight Rain (Lo-fi)', artist: 'ChillHop Records', duration: '3:24', progress: 0.38 };

    return (
      <div style={{ padding: '0 16px 16px', overflowY: 'auto', height: '100%' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 4 }}>Focus Playlists</h2>
        <p style={{ fontSize: 13, color: colors.textLight, fontFamily: 'Quicksand', marginBottom: 16 }}>AI-curated music for your focus moods</p>

        {/* Now Playing */}
        {playingPlaylist && (
          <div style={{ background: gradients.pinkPlum, borderRadius: 18, padding: 16, marginBottom: 16, color: '#fff' }}>
            <p style={{ fontSize: 10, opacity: 0.7, fontFamily: 'Quicksand', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>NOW PLAYING</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎵</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Sora', margin: 0 }}>{currentTrack.title}</p>
                <p style={{ fontSize: 11, opacity: 0.75, fontFamily: 'Quicksand', fontWeight: 500 }}>{currentTrack.artist}</p>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 4, height: 4, marginBottom: 8 }}>
              <div style={{ background: '#fff', borderRadius: 4, height: 4, width: `${currentTrack.progress * 100}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 10, opacity: 0.7, fontFamily: 'Quicksand' }}>1:17</span>
              <span style={{ fontSize: 10, opacity: 0.7, fontFamily: 'Quicksand' }}>{currentTrack.duration}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center' }}>
              {React.createElement(window.lucide.SkipBack, { size: 18, color: 'rgba(255,255,255,0.8)', style: { cursor: 'pointer' } })}
              <div onClick={() => setMusicPlaying(!musicPlaying)} style={{ width: 44, height: 44, borderRadius: 22, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {React.createElement(musicPlaying ? window.lucide.Pause : window.lucide.Play, { size: 20, color: colors.plum })}
              </div>
              {React.createElement(window.lucide.SkipForward, { size: 18, color: 'rgba(255,255,255,0.8)', style: { cursor: 'pointer' } })}
            </div>
          </div>
        )}

        {/* Playlist List */}
        {playlists.map((pl) => (
          <div
            key={pl.id}
            onClick={() => { setPlayingPlaylist(pl.id); setMusicPlaying(true); }}
            style={{
              background: playingPlaylist === pl.id ? pl.color + '18' : colors.white,
              border: `2px solid ${playingPlaylist === pl.id ? pl.color + '60' : 'transparent'}`,
              borderRadius: 16, padding: 14, marginBottom: 10,
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(107,58,91,0.06)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: pl.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{pl.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', margin: 0 }}>{pl.name}</p>
                <p style={{ fontSize: 11, color: colors.textLight, fontFamily: 'Quicksand', fontWeight: 500, marginBottom: 4 }}>{pl.desc}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 10, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 600 }}>{pl.tracks} tracks</span>
                  <span style={{ fontSize: 10, color: colors.gray, fontFamily: 'Quicksand' }}>·</span>
                  <span style={{ fontSize: 10, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 600 }}>{pl.duration}</span>
                </div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: playingPlaylist === pl.id ? pl.color : colors.lightGray, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(playingPlaylist === pl.id ? window.lucide.Pause : window.lucide.Play, { size: 16, color: playingPlaylist === pl.id ? '#fff' : colors.gray })}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ProfileScreen = () => {
    const achievements = [
      { title: '7-Day Streak', icon: '🔥', unlocked: true },
      { title: 'Deep Diver', icon: '🏊', unlocked: true },
      { title: '50h Focus', icon: '⏱️', unlocked: true },
      { title: 'Zen Master', icon: '🧘', unlocked: false },
      { title: 'Night Owl', icon: '🦉', unlocked: false },
      { title: 'Early Bird', icon: '🐦', unlocked: false },
    ];

    return (
      <div style={{ padding: '0 16px 16px', overflowY: 'auto', height: '100%' }}>
        {/* Profile Header */}
        <div style={{ background: gradients.amberPink, borderRadius: 20, padding: 20, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>🧑‍💻</div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'Sora', margin: 0 }}>Alex Rivera</h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'Quicksand', fontWeight: 500, marginBottom: 6 }}>Freelance Designer · Level 12</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ fontSize: 10, fontFamily: 'Quicksand', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.25)', padding: '3px 8px', borderRadius: 6 }}>🏆 Top 8%</span>
                <span style={{ fontSize: 10, fontFamily: 'Quicksand', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.25)', padding: '3px 8px', borderRadius: 6 }}>⚡ 7-day streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lifetime Stats */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 12 }}>All-Time Stats</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Total Focus Time', value: '213 hours', icon: window.lucide.Clock, color: colors.amber },
              { label: 'Sessions Completed', value: '486', icon: window.lucide.CheckCircle, color: colors.plum },
              { label: 'Avg Focus Score', value: '74 / 100', icon: window.lucide.BarChart2, color: colors.pinkDark },
              { label: 'Best Day', value: '9.2h', icon: window.lucide.Star, color: '#F0A500' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: colors.bg, borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: stat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(stat.icon, { size: 15, color: stat.color })}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', margin: 0 }}>{stat.value}</p>
                  <p style={{ fontSize: 9, color: colors.gray, fontFamily: 'Quicksand', fontWeight: 600 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 12 }}>Achievements</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {achievements.map((ach) => (
              <div key={ach.title} style={{ textAlign: 'center', padding: 10, borderRadius: 12, background: ach.unlocked ? colors.amber + '18' : colors.lightGray, opacity: ach.unlocked ? 1 : 0.5 }}>
                <p style={{ fontSize: 24, margin: '0 0 4px', filter: ach.unlocked ? 'none' : 'grayscale(1)' }}>{ach.icon}</p>
                <p style={{ fontSize: 9, color: ach.unlocked ? colors.plumDark : colors.gray, fontFamily: 'Quicksand', fontWeight: 700, margin: 0 }}>{ach.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Toggles */}
        <div style={{ background: colors.white, borderRadius: 18, padding: 16, boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora', marginBottom: 12 }}>Preferences</p>
          {[
            { key: 'smartReminders', label: 'Smart Reminders', desc: 'AI-timed nudges based on your patterns', icon: window.lucide.Bell },
            { key: 'adaptiveSchedule', label: 'Adaptive Schedule', desc: 'Auto-adjust blocks to your energy', icon: window.lucide.Calendar },
            { key: 'distractionAlert', label: 'Distraction Alerts', desc: 'Notify when focus drops detected', icon: window.lucide.AlertTriangle },
          ].map((setting, i) => (
            <div key={setting.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${colors.lightGray}` : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: colors.amber + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(setting.icon, { size: 15, color: colors.amber })}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.text, fontFamily: 'Quicksand', margin: 0 }}>{setting.label}</p>
                <p style={{ fontSize: 10, color: colors.gray, fontFamily: 'Quicksand', margin: 0 }}>{setting.desc}</p>
              </div>
              <div
                onClick={() => toggleSwitch(setting.key)}
                style={{ width: 44, height: 24, borderRadius: 12, background: toggleStates[setting.key] ? gradients.amberPink : colors.lightGray, cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: 3, left: toggleStates[setting.key] ? 22 : 3, width: 18, height: 18, borderRadius: 9, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Nav Items ──────────────────────────────────────────────────────────────
  const navItems = [
    { id: 'home', icon: window.lucide.Home, label: 'Home' },
    { id: 'focus', icon: window.lucide.Timer, label: 'Focus' },
    { id: 'analytics', icon: window.lucide.BarChart2, label: 'Stats' },
    { id: 'playlists', icon: window.lucide.Music, label: 'Music' },
    { id: 'profile', icon: window.lucide.User, label: 'Profile' },
  ];

  const screenMap = {
    home: HomeScreen,
    focus: FocusScreen,
    analytics: AnalyticsScreen,
    playlists: PlaylistScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screenMap[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#1A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora, sans-serif' }}>
      <style>{fontStyle}</style>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; }
        body { margin: 0; padding: 0; }
      `}</style>

      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, borderRadius: 44, background: colors.bg, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.15)', display: 'flex', flexDirection: 'column' }}>

        {/* Status Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px 8px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: colors.plumDark, fontFamily: 'Sora' }}>9:41</span>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)', width: 120, height: 34, background: '#1A0F1E', borderRadius: 20, zIndex: 20 }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: colors.plumDark })}
            {React.createElement(window.lucide.Signal, { size: 14, color: colors.plumDark })}
            <div style={{ width: 24, height: 12, border: `1.5px solid ${colors.plumDark}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: '0 1px' }}>
              <div style={{ width: '75%', height: 7, background: colors.plumDark, borderRadius: 1 }} />
              <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 2, height: 5, background: colors.plumDark, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8 }}>
          <ActiveScreen />
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', background: colors.white, borderTop: `1px solid ${colors.lightGray}`, paddingBottom: 16, paddingTop: 8, flexShrink: 0, boxShadow: '0 -4px 20px rgba(107,58,91,0.08)' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 0', transition: 'opacity 0.15s' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 12, background: isActive ? gradients.amberPink : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', transform: isActive ? 'scale(1.05)' : 'scale(1)' }}>
                  {React.createElement(item.icon, { size: 18, color: isActive ? '#fff' : colors.gray })}
                </div>
                <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? colors.plumDark : colors.gray, fontFamily: 'Quicksand', transition: 'color 0.2s' }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
