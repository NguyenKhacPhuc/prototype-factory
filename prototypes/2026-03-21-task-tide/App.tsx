function App() {
  const { useState, useEffect } = React;

  // ─── Font & global style injection ───────────────────
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ─── State ────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('now');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedSlot, setExpandedSlot] = useState(null);
  const [taskFilter, setTaskFilter] = useState('All');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [pressedBtn, setPressedBtn] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // ─── Theme ────────────────────────────────────────────
  const C = {
    bg: '#070B12',
    surface: '#0C1220',
    card: '#111928',
    card2: '#161F30',
    border: '#1D2A40',
    primary: '#00DFA2',
    primaryGlow: 'rgba(0,223,162,0.12)',
    primaryDim: 'rgba(0,223,162,0.08)',
    orange: '#FF8C42',
    orangeGlow: 'rgba(255,140,66,0.10)',
    purple: '#8B7FFF',
    purpleGlow: 'rgba(139,127,255,0.10)',
    cyan: '#22D3EE',
    yellow: '#FBBF24',
    red: '#FF5757',
    text: '#EDF1FA',
    textSec: '#7A8BAA',
    textMuted: '#3E4E68',
  };

  // ─── Data ─────────────────────────────────────────────
  const tasks = [
    { id: 1, title: "Reply to Sarah's proposal email", category: 'Communication', duration: 7, energy: 'low', score: 96, location: null },
    { id: 2, title: 'Write Q2 strategy outline', category: 'Deep Work', duration: 45, energy: 'high', score: 82, location: null },
    { id: 3, title: 'Pick up dry cleaning', category: 'Errand', duration: 15, energy: 'low', score: 78, location: 'Main St' },
    { id: 4, title: 'Review design mockups', category: 'Review', duration: 20, energy: 'medium', score: 85, location: null },
    { id: 5, title: 'Update project tracker', category: 'Admin', duration: 10, energy: 'low', score: 71, location: null },
    { id: 6, title: 'Prepare for client call', category: 'Prep', duration: 25, energy: 'medium', score: 88, location: null },
    { id: 7, title: 'Grocery run', category: 'Errand', duration: 30, energy: 'low', score: 65, location: 'Whole Foods' },
  ];

  const timeline = [
    { time: '9:00', type: 'past', title: 'Morning standup', duration: 30 },
    { time: '9:30', type: 'past', title: 'Deep work block', duration: 90 },
    { time: '11:00', type: 'slot', title: '20 min slot', duration: 20, matched: ['Reply to Sarah', 'Update tracker'] },
    { time: '11:20', type: 'past', title: 'Team lunch', duration: 70 },
    { time: '12:30', type: 'past', title: 'Design sync (ended early)', duration: 30, adapted: true },
    { time: '13:00', type: 'current', title: 'Current: 47 min open', duration: 47, matched: ['Review mockups', 'Prep for call'] },
    { time: '13:47', type: 'future', title: 'Design review', duration: 60 },
    { time: '14:47', type: 'slot', title: '13 min gap', duration: 13, matched: ['Reply to Sarah'] },
    { time: '15:00', type: 'future', title: 'Client call', duration: 60 },
    { time: '16:00', type: 'slot', title: '2 hour open block', duration: 120, matched: ['Q2 strategy', 'Review mockups'] },
  ];

  const focusData = [45, 72, 88, 91, 85, 60, 38, 35, 72, 84, 76, 52];
  const heatmap = [[3,4,5,4,3],[2,5,5,4,4],[3,3,4,5,2]];
  const dayLabels = ['Mon','Tue','Wed','Thu','Fri'];
  const patterns = [
    { icon: 'PenTool', title: 'Writing peak', desc: 'Best focus 9–11am', color: C.primary },
    { icon: 'Mail', title: 'Email speed', desc: 'Fastest replies 1–3pm', color: C.cyan },
    { icon: 'Clock', title: 'Procrastination', desc: 'Mondays 3–5pm delay', color: C.orange },
    { icon: 'Cpu', title: 'Deep work', desc: 'Focus peaks at 90 min', color: C.purple },
  ];
  const stats = [
    { v: '23', l: 'Tasks done', c: '+4 this week' },
    { v: '2.4h', l: 'Time saved', c: 'Via slot use' },
    { v: '8', l: 'Day streak', c: 'Keep going!' },
    { v: '87%', l: 'Fit accuracy', c: 'Match rate' },
  ];

  // ─── Helpers ──────────────────────────────────────────
  const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const Icon = ({ name, size, color }) => {
    const LI = window.lucide && window.lucide[name];
    if (!LI) return null;
    return React.createElement(LI, { size: size || 16, color: color || C.textSec, strokeWidth: 1.8, style: { flexShrink: 0, display: 'block' } });
  };

  const energyDot = (e) => ({ low: C.cyan, medium: C.yellow, high: C.orange })[e] || C.textSec;
  const energyText = (e) => ({ low: 'Low focus', medium: 'Medium', high: 'High focus' })[e] || e;

  const filteredTasks = tasks.filter(t => {
    if (taskFilter === 'All') return true;
    if (taskFilter === 'Quick') return t.duration <= 15;
    if (taskFilter === 'Deep Work') return t.energy === 'high';
    if (taskFilter === 'Errand') return t.category === 'Errand';
    if (taskFilter === 'Admin') return t.category === 'Admin';
    return true;
  });

  const press = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 200); };

  // ─── NOW Screen ───────────────────────────────────────
  const renderNow = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      {/* Context header */}
      <div style={{ padding: '18px 20px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.primary, boxShadow: `0 0 10px ${C.primary}` }} />
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.primary, fontWeight: 600, letterSpacing: 1.1 }}>LIVE · ADAPTING</span>
        </div>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 23, fontWeight: 700, color: C.text, marginBottom: 3 }}>Thursday afternoon</h2>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec }}>Low energy window · 47 min open now</p>
      </div>

      {/* Context chips */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 20px 14px', overflowX: 'auto' }}>
        {[
          { icon: 'MapPin', label: 'Home office', color: C.cyan },
          { icon: 'Battery', label: '60% energy', color: C.yellow },
          { icon: 'CloudRain', label: 'Rainy', color: C.textSec },
          { icon: 'Volume2', label: 'Quiet', color: C.primary },
        ].map((tag, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 20, background: C.card2, border: `1px solid ${C.border}`, whiteSpace: 'nowrap', flexShrink: 0 }}>
            <Icon name={tag.icon} size={11} color={tag.color} />
            <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec }}>{tag.label}</span>
          </div>
        ))}
      </div>

      {/* Best match hero card */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 1 }}>BEST MATCH RIGHT NOW</span>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.primary, fontWeight: 600 }}>96 / 100 fit</span>
        </div>
        <div style={{ background: `linear-gradient(145deg, rgba(0,223,162,0.10) 0%, ${C.card} 55%)`, border: '1px solid rgba(0,223,162,0.22)', borderRadius: 22, padding: 20, position: 'relative', overflow: 'hidden' }}>
          {/* Glow orb */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,223,162,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 13 }}>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="Mail" size={20} color={C.bg} />
            </div>
            <div style={{ background: 'rgba(0,223,162,0.12)', border: '1px solid rgba(0,223,162,0.22)', borderRadius: 10, padding: '4px 11px' }}>
              <span style={{ fontFamily: 'Space Grotesk', fontSize: 13, color: C.primary, fontWeight: 600 }}>7 min</span>
            </div>
          </div>

          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 6, lineHeight: 1.35 }}>Reply to Sarah's proposal email</h3>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: C.textSec, marginBottom: 13, lineHeight: 1.55 }}>Matches your current low-energy window. You reply fastest to emails between 1–3pm.</p>

          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            {['Low focus', 'Anywhere', 'Communication'].map((t, i) => (
              <span key={i} style={{ fontFamily: 'Inter', fontSize: 10, color: C.textSec, background: C.card2, borderRadius: 6, padding: '3px 8px', border: `1px solid ${C.border}` }}>{t}</span>
            ))}
          </div>

          {/* Score bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.textMuted }}>Fit score breakdown</span>
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.primary }}>96%</span>
            </div>
            <div style={{ height: 4, background: C.card2, borderRadius: 2 }}>
              <div style={{ height: 4, width: '96%', background: `linear-gradient(90deg, ${C.primary}, ${C.cyan})`, borderRadius: 2 }} />
            </div>
          </div>

          <button
            onMouseDown={() => press('start')}
            onTouchStart={() => press('start')}
            style={{ width: '100%', padding: '13px', borderRadius: 15, background: C.primary, border: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transform: pressedBtn === 'start' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s ease' }}
          >
            <Icon name="Play" size={15} color={C.bg} />
            Start This Task
          </button>
        </div>
      </div>

      {/* Moment slots */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 1 }}>MOMENT SLOTS TODAY</span>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec }}>3 found</span>
        </div>
        {[
          { mins: 47, label: 'Right now', context: 'Medium focus · Home', tasks: ['Review mockups', 'Prep for call'], active: true },
          { mins: 20, label: 'Before lunch (used)', context: 'Past slot · Completed', tasks: ['Reply to Sarah'], active: false },
          { mins: 13, label: 'After design review', context: 'Between meetings', tasks: ['Reply to Sarah'], active: false },
        ].map((slot, i) => (
          <div
            key={i}
            onClick={() => setExpandedSlot(expandedSlot === i ? null : i)}
            style={{ background: C.card, border: `1px solid ${slot.active ? 'rgba(0,223,162,0.22)' : C.border}`, borderRadius: 16, padding: '13px 14px', marginBottom: 9, cursor: 'pointer', transition: 'border-color 0.2s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: slot.active ? 'rgba(0,223,162,0.10)' : C.card2, border: `1px solid ${slot.active ? 'rgba(0,223,162,0.22)' : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 700, color: slot.active ? C.primary : C.text, lineHeight: 1 }}>{slot.mins}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 8, color: C.textMuted }}>min</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: slot.active ? C.text : C.textSec, marginBottom: 2 }}>{slot.label}</p>
                  <p style={{ fontFamily: 'Inter', fontSize: 11, color: C.textMuted }}>{slot.context}</p>
                </div>
              </div>
              <Icon name={expandedSlot === i ? 'ChevronUp' : 'ChevronDown'} size={15} color={C.textMuted} />
            </div>
            {expandedSlot === i && (
              <div style={{ marginTop: 11, paddingTop: 11, borderTop: `1px solid ${C.border}` }}>
                <p style={{ fontFamily: 'Inter', fontSize: 10, color: C.textMuted, marginBottom: 7, letterSpacing: 0.6 }}>SUGGESTED TASKS</p>
                {slot.tasks.map((t, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: C.card2, borderRadius: 9, marginBottom: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.primary, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontSize: 12, color: C.text }}>{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Repack notice */}
      <div style={{ margin: '0 20px 24px', padding: '13px 15px', borderRadius: 15, background: C.orangeGlow, border: '1px solid rgba(255,140,66,0.20)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="RefreshCw" size={15} color={C.orange} />
        <div>
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: C.orange }}>Day replanned · </span>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: C.textSec }}>Meeting ended 30 min early. 3 tasks moved to new gaps.</span>
        </div>
      </div>
    </div>
  );

  // ─── TASKS Screen ─────────────────────────────────────
  const renderTasks = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '18px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 23, fontWeight: 700, color: C.text, marginBottom: 3 }}>Tasks</h2>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec }}>{tasks.length} total · {completedTasks.size} done today</p>
        </div>
        <button
          onMouseDown={() => press('add')}
          onTouchStart={() => press('add')}
          style={{ width: 38, height: 38, borderRadius: 13, background: C.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: pressedBtn === 'add' ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s ease' }}
        >
          <Icon name="Plus" size={20} color={C.bg} />
        </button>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 14px', overflowX: 'auto' }}>
        {['All', 'Quick', 'Deep Work', 'Errand', 'Admin'].map(f => (
          <button key={f} onClick={() => setTaskFilter(f)} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: 12, fontWeight: 500, background: taskFilter === f ? C.primary : C.card2, color: taskFilter === f ? C.bg : C.textSec, whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div style={{ padding: '0 20px' }}>
        {filteredTasks.map(task => {
          const done = completedTasks.has(task.id);
          return (
            <div key={task.id} style={{ background: done ? C.surface : C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: '14px 16px', marginBottom: 10, opacity: done ? 0.5 : 1, transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {/* Checkbox */}
                <div
                  onClick={() => setCompletedTasks(prev => { const n = new Set(prev); n.has(task.id) ? n.delete(task.id) : n.add(task.id); return n; })}
                  style={{ width: 23, height: 23, borderRadius: 8, flexShrink: 0, marginTop: 1, border: `2px solid ${done ? C.primary : C.border}`, background: done ? C.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  {done && <Icon name="Check" size={12} color={C.bg} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <h4 style={{ fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: done ? C.textMuted : C.text, lineHeight: 1.3, flex: 1, paddingRight: 10, textDecoration: done ? 'line-through' : 'none' }}>{task.title}</h4>
                    <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec, background: C.card2, borderRadius: 7, padding: '2px 7px', flexShrink: 0 }}>{task.duration}m</span>
                  </div>

                  {/* Score bar */}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.textMuted }}>Fit score</span>
                      <span style={{ fontFamily: 'Inter', fontSize: 10, color: task.score > 85 ? C.primary : task.score > 70 ? C.yellow : C.orange }}>{task.score}</span>
                    </div>
                    <div style={{ height: 3, background: C.card2, borderRadius: 2 }}>
                      <div style={{ height: 3, width: `${task.score}%`, borderRadius: 2, background: task.score > 85 ? C.primary : task.score > 70 ? C.yellow : C.orange, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>

                  {/* Meta row */}
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: energyDot(task.energy), boxShadow: `0 0 6px ${energyDot(task.energy)}` }} />
                    <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec }}>{energyText(task.energy)}</span>
                    <span style={{ color: C.border }}>·</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec }}>{task.category}</span>
                    {task.location && (
                      <>
                        <span style={{ color: C.border }}>·</span>
                        <Icon name="MapPin" size={10} color={C.cyan} />
                        <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.cyan }}>{task.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── TIDE Screen ──────────────────────────────────────
  const renderTide = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '18px 20px 10px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 23, fontWeight: 700, color: C.text, marginBottom: 3 }}>Today's Tide</h2>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec }}>Adapted twice · 3 slots identified</p>
      </div>

      {/* Smart repack banner */}
      <div style={{ margin: '0 20px 16px', padding: '12px 15px', borderRadius: 15, background: C.purpleGlow, border: '1px solid rgba(139,127,255,0.22)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <Icon name="Zap" size={15} color={C.purple} />
        <span style={{ fontFamily: 'Inter', fontSize: 12, color: C.purple, fontWeight: 600 }}>Smart repack active</span>
        <span style={{ fontFamily: 'Inter', fontSize: 12, color: C.textSec }}>· 47 min freed today</span>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 20px' }}>
        {timeline.map((item, i) => {
          const isCurrent = item.type === 'current';
          const isSlot = item.type === 'slot';
          const isPast = item.type === 'past';
          const dotColor = isCurrent ? C.primary : isSlot ? C.purple : isPast ? C.textMuted : C.textMuted + '50';
          const contentBg = isCurrent ? 'rgba(0,223,162,0.07)' : isSlot ? 'rgba(139,127,255,0.07)' : 'transparent';
          const contentBorder = isCurrent ? '1px solid rgba(0,223,162,0.20)' : isSlot ? '1px solid rgba(139,127,255,0.20)' : 'none';
          const titleColor = isCurrent ? C.primary : isSlot ? C.purple : isPast ? C.textSec : C.text;

          return (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              {/* Time label */}
              <div style={{ width: 42, paddingTop: 14, flexShrink: 0, textAlign: 'right' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.textMuted }}>{item.time}</span>
              </div>

              {/* Dot and line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 14, background: dotColor, border: `2px solid ${isCurrent ? C.primary : isSlot ? C.purple : C.border}`, boxShadow: isCurrent ? `0 0 14px ${C.primary}` : 'none', zIndex: 1, position: 'relative' }}>
                  {isCurrent && <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1px solid ${C.primary}40`, animation: 'none' }} />}
                </div>
                {i < timeline.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 14, background: isPast ? C.textMuted + '25' : C.border + '70', marginTop: 3 }} />
                )}
              </div>

              {/* Content block */}
              <div style={{ flex: 1, paddingBottom: 6 }}>
                <div style={{ padding: isCurrent || isSlot ? '10px 13px' : '10px 0', background: contentBg, border: contentBorder, borderRadius: isCurrent || isSlot ? 13 : 0, marginBottom: isCurrent || isSlot ? 8 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: (item.matched || item.adapted) ? 6 : 0 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: isCurrent || isSlot ? 600 : 400, color: titleColor }}>{item.title}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.textMuted }}>{item.duration}m</span>
                  </div>
                  {item.adapted && (
                    <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.orange, background: 'rgba(255,140,66,0.10)', borderRadius: 5, padding: '2px 8px', display: 'inline-block', marginBottom: 4 }}>Ended early · Repacked</span>
                  )}
                  {item.matched && (
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {item.matched.map((t, j) => (
                        <span key={j} style={{ fontFamily: 'Inter', fontSize: 10, color: isCurrent ? C.primary : C.purple, background: isCurrent ? 'rgba(0,223,162,0.10)' : 'rgba(139,127,255,0.10)', borderRadius: 5, padding: '2px 7px' }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── INSIGHTS Screen ──────────────────────────────────
  const renderInsights = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '18px 20px 14px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 23, fontWeight: 700, color: C.text, marginBottom: 3 }}>Insights</h2>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec }}>Learning your rhythm · Week 3 of 4</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 16px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: '15px 16px' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 2 }}>{s.v}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: C.textSec, marginBottom: 4 }}>{s.l}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: C.primary }}>{s.c}</p>
          </div>
        ))}
      </div>

      {/* Focus chart */}
      <div style={{ margin: '0 20px 14px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 1 }}>FOCUS THROUGH THE DAY</span>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec }}>Avg: 67%</span>
        </div>
        {/* Bar chart using pixel heights */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 58 }}>
          {focusData.map((v, i) => (
            <div key={i} style={{ flex: 1, height: Math.max(Math.round(v * 0.58), 4), background: v > 80 ? C.primary : v > 60 ? C.primary + '70' : v < 40 ? C.red + '55' : C.textMuted + '35', borderRadius: '3px 3px 0 0', transition: 'height 0.5s ease' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
          {['7a','8a','9a','10a','11a','12p','1p','2p','3p','4p','5p','6p'].map((l, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontFamily: 'Inter', fontSize: 8, color: C.textMuted }}>{i % 2 === 0 ? l : ''}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly heatmap */}
      <div style={{ margin: '0 20px 14px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '16px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 1, display: 'block', marginBottom: 12 }}>WEEKLY PRODUCTIVITY HEAT</span>
        {['Morning', 'Afternoon', 'Evening'].map((period, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.textMuted, width: 52 }}>{period}</span>
            {heatmap[ri].map((v, ci) => (
              <div key={ci} style={{ flex: 1, height: 28, borderRadius: 7, background: v === 5 ? C.primary : v === 4 ? C.primary + 'CC' : v === 3 ? C.primary + '66' : C.primary + '22' }} />
            ))}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 5, paddingLeft: 57 }}>
          {dayLabels.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: C.textMuted }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learned patterns */}
      <div style={{ padding: '0 20px 24px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 1, display: 'block', marginBottom: 10 }}>LEARNED PATTERNS</span>
        {patterns.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '13px 14px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 8 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: p.color + '18', border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={p.icon} size={17} color={p.color} />
            </div>
            <div>
              <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{p.title}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 12, color: C.textSec }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Nav config ───────────────────────────────────────
  const tabs = [
    { id: 'now', icon: 'Zap', label: 'Now' },
    { id: 'tasks', icon: 'CheckSquare', label: 'Tasks' },
    { id: 'tide', icon: 'Activity', label: 'Tide' },
    { id: 'insights', icon: 'BarChart2', label: 'Insights' },
  ];

  // ─── Root render ──────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#02040A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      {/* Ambient background glow */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,223,162,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: C.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 60px 140px rgba(0,0,0,0.92), 0 0 0 1px #1D2A40, 0 0 100px rgba(0,223,162,0.05)', display: 'flex', flexDirection: 'column' }}>

        {/* Status bar */}
        <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', paddingBottom: 8, paddingLeft: 28, paddingRight: 24, flexShrink: 0, zIndex: 5, position: 'relative' }}>
          <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: C.text }}>{timeStr}</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="Signal" size={13} color={C.text} />
            <Icon name="Wifi" size={13} color={C.text} />
            <Icon name="Battery" size={15} color={C.text} />
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 126, height: 35, background: '#000', borderRadius: 22, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, gap: 7 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#1A1A1A', border: '1.5px solid #2A2A2A' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#111' }} />
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'now' && renderNow()}
          {activeTab === 'tasks' && renderTasks()}
          {activeTab === 'tide' && renderTide()}
          {activeTab === 'insights' && renderInsights()}
        </div>

        {/* Bottom navigation */}
        <div style={{ height: 74, background: C.surface, borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'flex-start', paddingTop: 8, flexShrink: 0, zIndex: 10 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
            >
              <div style={{ width: 34, height: 30, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: activeTab === tab.id ? 'rgba(0,223,162,0.12)' : 'transparent', transition: 'background 0.2s ease' }}>
                <Icon name={tab.icon} size={19} color={activeTab === tab.id ? C.primary : C.textMuted} />
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: activeTab === tab.id ? C.primary : C.textMuted, fontWeight: activeTab === tab.id ? 600 : 400, letterSpacing: 0.1, transition: 'color 0.2s ease' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
