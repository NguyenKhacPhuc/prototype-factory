const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0FDF4',
    surface: '#FFFFFF',
    surface2: '#F7FEF9',
    card: '#FFFFFF',
    text: '#052E16',
    textSecondary: '#4B7C5E',
    textMuted: '#86BCAA',
    primary: '#16A34A',
    primaryLight: '#22C55E',
    primaryDim: '#DCFCE7',
    accent: '#84CC16',
    accentDim: '#ECFCCB',
    danger: '#EF4444',
    dangerDim: '#FEE2E2',
    warning: '#F59E0B',
    warningDim: '#FFF7ED',
    info: '#3B82F6',
    infoDim: '#EFF6FF',
    border: '#D1FAE5',
    borderStrong: '#86EFAC',
    navBg: '#FFFFFF',
    shadow: '0 2px 12px rgba(22,163,74,0.10)',
    shadowStrong: '0 8px 32px rgba(22,163,74,0.15)',
    purple: '#8B5CF6',
    purpleDim: '#EDE9FE',
  },
  dark: {
    bg: '#061A0E',
    surface: '#0D2B18',
    surface2: '#091E10',
    card: '#122B1B',
    text: '#F0FDF4',
    textSecondary: '#86BCAA',
    textMuted: '#3D6B50',
    primary: '#22C55E',
    primaryLight: '#4ADE80',
    primaryDim: '#14532D',
    accent: '#A3E635',
    accentDim: '#1A3A02',
    danger: '#F87171',
    dangerDim: '#450A0A',
    warning: '#FCD34D',
    warningDim: '#451A03',
    info: '#60A5FA',
    infoDim: '#0F2A4A',
    border: '#1A4731',
    borderStrong: '#22533A',
    navBg: '#0D2B18',
    shadow: '0 2px 12px rgba(0,0,0,0.4)',
    shadowStrong: '0 8px 32px rgba(0,0,0,0.5)',
    purple: '#A78BFA',
    purpleDim: '#1E1245',
  },
};

// ========== CITY BLOCKS DATA ==========
const CITY_BLOCKS = [
  { id: 'A1', type: 'apartment', name: 'Green Terrace', health: 85, emoji: '🏢', issues: [] },
  { id: 'A2', type: 'garden', name: 'Bloom Garden', health: 92, emoji: '🌿', issues: [] },
  { id: 'A3', type: 'cafe', name: 'Eco Café', health: 78, emoji: '☕', issues: ['waste-overflow'] },
  { id: 'B1', type: 'recycling', name: 'Sort Hub', health: 58, emoji: '♻️', issues: ['pest'] },
  { id: 'B2', type: 'apartment', name: 'River Block', health: 63, emoji: '🏠', issues: ['energy-waste'] },
  { id: 'B3', type: 'garden', name: 'Rain Garden', health: 88, emoji: '🌱', issues: [] },
  { id: 'C1', type: 'apartment', name: 'Summit Apts', health: 55, emoji: '🏗️', issues: ['landfill-overflow'] },
  { id: 'C2', type: 'cafe', name: 'Bean & Leaf', health: 90, emoji: '🌾', issues: [] },
  { id: 'C3', type: 'recycling', name: 'Depot East', health: 74, emoji: '🗑️', issues: [] },
];

const SORT_ITEMS = [
  { id: 1, name: 'Apple core', correct: 'compost', emoji: '🍎', fact: 'Fruit scraps compost in 2–5 weeks.' },
  { id: 2, name: 'Plastic bottle', correct: 'recycle', emoji: '🍶', fact: 'Rinsed bottles can be recycled.' },
  { id: 3, name: 'Chip bag', correct: 'landfill', emoji: '🛍️', fact: 'Multi-layer films cannot be recycled.' },
  { id: 4, name: 'Coffee grounds', correct: 'compost', emoji: '☕', fact: 'Coffee grounds add nitrogen to compost.' },
  { id: 5, name: 'Glass jar', correct: 'recycle', emoji: '🫙', fact: 'Glass can be recycled infinitely.' },
  { id: 6, name: 'Greasy pizza box', correct: 'landfill', emoji: '🍕', fact: 'Grease contaminates paper recycling.' },
  { id: 7, name: 'Eggshells', correct: 'compost', emoji: '🥚', fact: 'Eggshells add calcium to compost.' },
];

// ========== STATUS BAR ==========
function StatusBar({ t }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 2px' }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: t.textSecondary })}
        {React.createElement(window.lucide.Signal, { size: 14, color: t.textSecondary })}
        {React.createElement(window.lucide.Battery, { size: 16, color: t.textSecondary })}
      </div>
    </div>
  );
}

// ========== DYNAMIC ISLAND ==========
function DynamicIsland() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 6 }}>
      <div style={{ width: 126, height: 36, background: '#000', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <div style={{ width: 10, height: 10, background: '#111', borderRadius: '50%' }} />
        <div style={{ width: 15, height: 15, background: '#111', borderRadius: '50%' }} />
      </div>
    </div>
  );
}

// ========== HOME SCREEN ==========
function HomeScreen({ t, cityHealth, day, notifications }) {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [blockHealths, setBlockHealths] = useState(() => {
    const map = {};
    CITY_BLOCKS.forEach(b => { map[b.id] = b.health; });
    return map;
  });
  const unread = notifications.filter(n => !n.read).length;

  const healthColor = (h) => h >= 80 ? t.primary : h >= 60 ? t.warning : t.danger;

  const weekBars = [62, 65, 68, 70, 69, 72, cityHealth];

  return (
    <div style={{ flex: 1, overflow: 'auto', paddingBottom: 8 }}>
      {/* Header */}
      <div style={{ padding: '4px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Day {day}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>Compost City</div>
        </div>
        <button
          onClick={() => setShowNotif(v => !v)}
          style={{ position: 'relative', background: t.primaryDim, border: 'none', borderRadius: 14, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {React.createElement(window.lucide.Bell, { size: 18, color: t.primary })}
          {unread > 0 && (
            <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: t.danger, borderRadius: '50%', border: `2px solid ${t.bg}` }} />
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {showNotif && (
        <div style={{ margin: '0 16px 10px', background: t.card, borderRadius: 18, padding: '12px 14px', border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 8 }}>Alerts</div>
          {notifications.map((n, i) => (
            <div key={n.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: i < notifications.length - 1 ? 10 : 0, marginBottom: i < notifications.length - 1 ? 10 : 0, borderBottom: i < notifications.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: n.type === 'alert' ? t.dangerDim : t.accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(n.type === 'alert' ? window.lucide.AlertTriangle : window.lucide.Lightbulb, { size: 13, color: n.type === 'alert' ? t.danger : t.accent })}
              </div>
              <span style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5 }}>{n.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* City Health Banner */}
      <div style={{ margin: '0 16px 12px', background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`, borderRadius: 22, padding: '16px 20px', color: '#fff', boxShadow: '0 6px 24px rgba(22,163,74,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, letterSpacing: 1, textTransform: 'uppercase' }}>City Health</div>
            <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>
              {cityHealth}<span style={{ fontSize: 22, opacity: 0.85 }}>%</span>
            </div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Good — Keep composting!</div>
          </div>
          <div>
            <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 6, textAlign: 'right' }}>7-day trend</div>
            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 32 }}>
              {weekBars.map((v, i) => (
                <div key={i} style={{ width: 5, height: (v / 100) * 32, background: i === 6 ? '#fff' : 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 12 }}>
        {[
          { label: 'Compost', value: '65%', icon: 'Leaf', color: t.primary, dim: t.primaryDim },
          { label: 'Recycle', value: '58%', icon: 'Recycle', color: t.info, dim: t.infoDim },
          { label: 'Energy', value: '81%', icon: 'Zap', color: t.warning, dim: t.warningDim },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: t.card, borderRadius: 16, padding: '12px 8px', textAlign: 'center', border: `1px solid ${t.border}` }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: s.dim, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
              {React.createElement(window.lucide[s.icon], { size: 16, color: s.color })}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{s.value}</div>
            <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Challenge */}
      <div style={{ margin: '0 16px 12px', background: t.warningDim, border: `1px solid #FED7AA`, borderRadius: 16, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
        {React.createElement(window.lucide.AlertTriangle, { size: 18, color: t.warning })}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E' }}>Pest Outbreak — Block B1</div>
          <div style={{ fontSize: 11, color: '#B45309' }}>Sort waste properly to reduce attractants</div>
        </div>
        <div style={{ background: t.warning, borderRadius: 8, padding: '4px 10px', fontSize: 11, color: '#fff', fontWeight: 700 }}>Fix</div>
      </div>

      {/* City Map */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 8 }}>City Map</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {CITY_BLOCKS.map(block => {
            const selected = selectedBlock?.id === block.id;
            const h = blockHealths[block.id];
            const hc = healthColor(h);
            return (
              <button
                key={block.id}
                onClick={() => setSelectedBlock(selected ? null : block)}
                style={{ background: selected ? t.primaryDim : t.card, border: `2px solid ${selected ? t.primary : t.border}`, borderRadius: 16, padding: '10px 6px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', position: 'relative' }}
              >
                {block.issues.length > 0 && (
                  <div style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: t.danger, borderRadius: '50%' }} />
                )}
                <div style={{ fontSize: 26 }}>{block.emoji}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: t.textSecondary, marginTop: 2, lineHeight: 1.2 }}>{block.name}</div>
                <div style={{ fontSize: 10, color: hc, fontWeight: 700, marginTop: 2 }}>{h}%</div>
              </button>
            );
          })}
        </div>

        {selectedBlock && (
          <div style={{ marginTop: 10, background: t.card, borderRadius: 16, padding: 14, border: `1px solid ${t.borderStrong}`, boxShadow: t.shadow }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{selectedBlock.emoji} {selectedBlock.name}</div>
              <div style={{ fontSize: 12, color: healthColor(blockHealths[selectedBlock.id]), fontWeight: 700 }}>
                {blockHealths[selectedBlock.id]}% health
              </div>
            </div>
            <div style={{ height: 7, background: t.surface2, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: `${blockHealths[selectedBlock.id]}%`, height: '100%', background: healthColor(blockHealths[selectedBlock.id]), borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            {selectedBlock.issues.length > 0 ? (
              <div style={{ padding: '7px 10px', background: t.dangerDim, borderRadius: 10, fontSize: 11, color: t.danger, fontWeight: 600 }}>
                ⚠ Active issue: {selectedBlock.issues[0].replace(/-/g, ' ')}
              </div>
            ) : (
              <div style={{ padding: '7px 10px', background: t.primaryDim, borderRadius: 10, fontSize: 11, color: t.primary, fontWeight: 600 }}>
                ✓ No active issues
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ========== WASTE SCREEN ==========
function WasteScreen({ t }) {
  const [streams, setStreams] = useState({ compost: 38, recycle: 34, landfill: 28 });
  const [itemIndex, setItemIndex] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const item = SORT_ITEMS[itemIndex % SORT_ITEMS.length];
  const streamTotal = streams.compost + streams.recycle + streams.landfill;

  const streamMeta = {
    compost: { color: t.primary, emoji: '🌱', label: 'Compost' },
    recycle: { color: t.info, emoji: '♻️', label: 'Recycle' },
    landfill: { color: t.danger, emoji: '🗑️', label: 'Landfill' },
  };

  const handleSort = (bin) => {
    if (lastResult) return;
    const correct = bin === item.correct;
    setLastResult({ correct, bin, item });
    setTotal(t => t + 1);
    if (correct) {
      setScore(s => s + 1);
      setStreams(prev => ({ ...prev, [bin]: Math.min(99, prev[bin] + 2) }));
    } else {
      setStreams(prev => ({ ...prev, landfill: Math.min(99, prev.landfill + 4), [item.correct]: Math.max(1, prev[item.correct] - 2) }));
    }
    setTimeout(() => {
      setLastResult(null);
      setItemIndex(i => i + 1);
    }, 1800);
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 20px' }}>
      {/* Header */}
      <div style={{ padding: '4px 0 12px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Simulator</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Waste Flow</div>
      </div>

      {/* Flow Visualization */}
      <div style={{ background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Stream Distribution</div>
        <div style={{ height: 22, borderRadius: 11, overflow: 'hidden', display: 'flex', marginBottom: 12, gap: 2 }}>
          {Object.entries(streams).map(([key, val]) => (
            <div key={key} style={{ width: `${(val / streamTotal) * 100}%`, background: streamMeta[key].color, transition: 'width 0.6s ease', borderRadius: key === 'compost' ? '11px 0 0 11px' : key === 'landfill' ? '0 11px 11px 0' : 0 }} />
          ))}
        </div>
        {Object.entries(streams).map(([key, val]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: streamMeta[key].color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: t.text, flex: 1, fontWeight: 600 }}>{streamMeta[key].label}</span>
            <div style={{ flex: 3, height: 5, background: t.surface2, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${val}%`, height: '100%', background: streamMeta[key].color, borderRadius: 3, transition: 'width 0.5s' }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: streamMeta[key].color, width: 34, textAlign: 'right' }}>{val}%</span>
          </div>
        ))}
      </div>

      {/* Sorting Game */}
      <div style={{ background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Sort Items</div>
          <div style={{ fontSize: 12, color: t.primary, fontWeight: 700 }}>{score}/{total} correct</div>
        </div>
        <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 14 }}>Tap the correct bin for this item</div>

        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 54, marginBottom: 4 }}>{item.emoji}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{item.name}</div>
        </div>

        {lastResult && (
          <div style={{ textAlign: 'center', padding: '10px 12px', background: lastResult.correct ? t.primaryDim : t.dangerDim, borderRadius: 12, marginBottom: 12, border: `1px solid ${lastResult.correct ? t.borderStrong : '#FCA5A5'}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: lastResult.correct ? t.primary : t.danger }}>
              {lastResult.correct ? '✓ Correct!' : `✗ Goes in ${streamMeta[item.correct].label}`}
            </div>
            <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 3 }}>{item.fact}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          {Object.entries(streamMeta).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => handleSort(key)}
              style={{ flex: 1, background: meta.color + '18', border: `2px solid ${meta.color}`, borderRadius: 16, padding: '12px 4px', cursor: lastResult ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: lastResult ? 0.6 : 1, transition: 'opacity 0.2s' }}
            >
              <span style={{ fontSize: 24 }}>{meta.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: meta.color }}>{meta.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div style={{ background: t.primaryDim, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.borderStrong}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.primary, marginBottom: 4 }}>💡 Real-World Insight</div>
        <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
          Reducing your landfill stream by 5% cuts your household methane contribution by ~2kg CO₂e per week. Start by separating fruit peels and coffee grounds.
        </div>
      </div>
    </div>
  );
}

// ========== ROUTINE SCREEN ==========
function RoutineScreen({ t }) {
  const [events, setEvents] = useState([
    { id: 1, time: '07:00', name: 'Morning shower', cat: 'water', impact: -8, on: true, emoji: '🚿' },
    { id: 2, time: '07:30', name: 'Meal prep + compost scraps', cat: 'compost', impact: +12, on: true, emoji: '🥗' },
    { id: 3, time: '09:00', name: 'Dishwasher (peak hours)', cat: 'energy', impact: -15, on: false, emoji: '🍽️' },
    { id: 4, time: '12:30', name: 'Takeout container sorting', cat: 'recycle', impact: +6, on: true, emoji: '📦' },
    { id: 5, time: '14:00', name: 'Shade tree watering', cat: 'water', impact: +5, on: true, emoji: '🌳' },
    { id: 6, time: '17:00', name: 'Laundry — full load', cat: 'energy', impact: +4, on: true, emoji: '👕' },
    { id: 7, time: '19:30', name: 'Dinner prep + leftovers stored', cat: 'compost', impact: +9, on: true, emoji: '🍲' },
    { id: 8, time: '23:00', name: 'Run dishwasher (off-peak)', cat: 'energy', impact: +11, on: false, emoji: '⚡' },
  ]);

  const toggle = (id) => setEvents(prev => prev.map(e => e.id === id ? { ...e, on: !e.on } : e));
  const score = events.filter(e => e.on).reduce((s, e) => s + e.impact, 0);

  const catColors = { water: t.info, compost: t.primary, energy: t.warning, recycle: t.purple };
  const catDims = { water: t.infoDim, compost: t.primaryDim, energy: t.warningDim, recycle: t.purpleDim };

  const transferTips = [
    'Moved dishwasher to 11PM — saved $4.20/week on energy',
    'Separated coffee grounds — reduced bin odor by 60%',
    'Stored leftovers properly — cut food waste by 30%',
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 20px' }}>
      <div style={{ padding: '4px 0 12px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Planner</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Daily Routine</div>
      </div>

      {/* Impact Score */}
      <div style={{ background: score >= 0 ? t.primaryDim : t.dangerDim, borderRadius: 18, padding: '14px 18px', marginBottom: 12, border: `1px solid ${score >= 0 ? t.borderStrong : '#FCA5A5'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: score >= 0 ? t.primary : t.danger, letterSpacing: 0.5 }}>TODAY'S IMPACT SCORE</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: score >= 0 ? t.primary : t.danger, lineHeight: 1.1 }}>
            {score > 0 ? '+' : ''}{score}
          </div>
        </div>
        <div style={{ fontSize: 42 }}>{score >= 20 ? '🌟' : score >= 0 ? '👍' : '⚠️'}</div>
      </div>

      {/* Tip Banner */}
      <div style={{ background: t.warningDim, borderRadius: 14, padding: '10px 14px', marginBottom: 12, border: `1px solid #FED7AA`, display: 'flex', gap: 8, alignItems: 'center' }}>
        {React.createElement(window.lucide.Zap, { size: 14, color: t.warning })}
        <span style={{ fontSize: 12, color: '#92400E', fontWeight: 600 }}>Switch dishwasher to 11PM for +11 points</span>
      </div>

      {/* Timeline */}
      {events.map((ev, i) => (
        <div key={ev.id} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 44, paddingTop: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: t.textMuted }}>{ev.time}</span>
            {i < events.length - 1 && <div style={{ width: 2, flex: 1, background: t.border, marginTop: 4, minHeight: 16 }} />}
          </div>
          <button
            onClick={() => toggle(ev.id)}
            style={{ flex: 1, background: ev.on ? t.card : t.surface2, border: `1px solid ${ev.on ? t.border : 'transparent'}`, borderRadius: 14, padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', opacity: ev.on ? 1 : 0.5, transition: 'all 0.2s' }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 10, background: ev.on ? catDims[ev.cat] : t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 18 }}>{ev.emoji}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{ev.name}</div>
              <div style={{ fontSize: 10, color: catColors[ev.cat], fontWeight: 700, textTransform: 'capitalize' }}>{ev.cat}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: ev.impact > 0 ? t.primary : t.danger }}>
              {ev.impact > 0 ? '+' : ''}{ev.impact}
            </div>
          </button>
        </div>
      ))}

      {/* Habit Transfer */}
      <div style={{ marginTop: 14, background: t.card, borderRadius: 18, padding: 16, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>🔄 Habit Transfers This Week</div>
        {transferTips.map((tip, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '7px 0', borderBottom: i < transferTips.length - 1 ? `1px solid ${t.border}` : 'none' }}>
            <div style={{ color: t.primary, fontSize: 13, marginTop: 1 }}>✓</div>
            <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5 }}>{tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== DISTRICT SCREEN ==========
function DistrictScreen({ t }) {
  const [activeChallenge, setActiveChallenge] = useState(null);

  const members = [
    { name: 'Maya K.', avatar: 'M', role: 'Compost Lead', score: 234, trend: '+12', color: '#22C55E' },
    { name: 'Jordan P.', avatar: 'J', role: 'Energy Manager', score: 198, trend: '+8', color: '#3B82F6' },
    { name: 'Alex R.', avatar: 'A', role: 'Recycling Chief', score: 187, trend: '+3', color: '#8B5CF6' },
    { name: 'Sam T.', avatar: 'S', role: 'Garden Keeper', score: 165, trend: '-2', color: '#84CC16' },
  ];

  const challenges = [
    { id: 1, title: 'Zero Landfill Week', progress: 68, reward: '🏆 Gold Badge', deadline: '3 days left', type: 'group', desc: 'Reduce landfill stream to under 10% as a team. Everyone must contribute daily.' },
    { id: 2, title: 'Solar Cooking Challenge', progress: 45, reward: '⚡ +50 Energy', deadline: '5 days left', type: 'solo', desc: 'Cook at least 2 meals using solar or off-peak energy during the challenge window.' },
    { id: 3, title: 'Drought Defense', progress: 82, reward: '💧 Rain Collector', deadline: '1 day left', type: 'group', desc: 'Reduce district water usage by 15% during the heat event. Coordinate garden watering schedules.' },
  ];

  const aiAlerts = [
    { emoji: '🌡️', title: 'Heatwave incoming!', msg: 'Plants in Rain Garden need extra water. Coordinate with Sam to adjust drip schedule before Thursday.' },
    { emoji: '🐛', title: 'Pest risk rising', msg: 'Block B1 landfill overflow attracting pests. Schedule a group sorting session this weekend.' },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 20px' }}>
      <div style={{ padding: '4px 0 12px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Collaboration</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>District Mode</div>
      </div>

      {/* District Banner */}
      <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', borderRadius: 22, padding: '16px 20px', marginBottom: 14, color: '#fff', boxShadow: '0 6px 24px rgba(59,130,246,0.3)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, letterSpacing: 1 }}>GREENWAY DISTRICT</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>4 Neighbors</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Ranked #3 citywide</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 32, fontWeight: 800 }}>784</div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>total score</div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Team Members</div>
        {members.map((m, i) => (
          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < members.length - 1 ? `1px solid ${t.border}` : 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: m.color + '22', border: `2px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color, fontSize: 16, fontWeight: 800 }}>{m.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{m.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>{m.role}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{m.score}</div>
              <div style={{ fontSize: 11, color: parseFloat(m.trend) >= 0 ? t.primary : t.danger, fontWeight: 700 }}>{m.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Challenges */}
      <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 8 }}>Active Challenges</div>
      {challenges.map(c => (
        <button
          key={c.id}
          onClick={() => setActiveChallenge(activeChallenge === c.id ? null : c.id)}
          style={{ width: '100%', background: t.card, borderRadius: 16, padding: 14, marginBottom: 8, border: `1px solid ${activeChallenge === c.id ? t.borderStrong : t.border}`, cursor: 'pointer', textAlign: 'left', display: 'block' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{c.title}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{c.deadline} · {c.type === 'group' ? '👥 Group' : '👤 Solo'}</div>
            </div>
            <div style={{ fontSize: 11, color: t.primary, fontWeight: 700 }}>{c.reward}</div>
          </div>
          <div style={{ height: 6, background: t.surface2, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${c.progress}%`, height: '100%', background: c.progress > 70 ? t.primary : t.warning, borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 10, color: t.textMuted, marginTop: 4 }}>{c.progress}% complete</div>
          {activeChallenge === c.id && (
            <div style={{ marginTop: 10, fontSize: 12, color: t.textSecondary, lineHeight: 1.5, background: t.surface2, borderRadius: 10, padding: '8px 10px' }}>
              {c.desc}
            </div>
          )}
        </button>
      ))}

      {/* AI Alerts */}
      <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 8 }}>🤖 AI Neighborhood Alerts</div>
      {aiAlerts.map((a, i) => (
        <div key={i} style={{ background: t.primaryDim, borderRadius: 14, padding: 14, marginBottom: 8, border: `1px solid ${t.borderStrong}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.primary, marginBottom: 4 }}>{a.emoji} {a.title}</div>
          <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5 }}>{a.msg}</div>
        </div>
      ))}
    </div>
  );
}

// ========== PROFILE SCREEN ==========
function ProfileScreen({ t, isDark, setIsDark, cityHealth, day }) {
  const achievements = [
    { name: 'First Composter', earned: true, emoji: '🌱' },
    { name: 'Zero Waste Week', earned: true, emoji: '♻️' },
    { name: 'Community Hero', earned: false, emoji: '🏆' },
    { name: 'Solar Pioneer', earned: false, emoji: '☀️' },
    { name: 'Rain Harvester', earned: true, emoji: '💧' },
    { name: 'Pest Buster', earned: false, emoji: '🐛' },
  ];

  const habits = [
    { title: 'Reduce food waste', status: 'On track', value: 78, color: t.primary },
    { title: 'Bin organization', status: 'Improving', value: 62, color: t.warning },
    { title: 'Energy off-peak use', status: 'Great!', value: 89, color: t.primary },
    { title: 'Compost consistency', status: 'Keep going', value: 71, color: t.warning },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0 12px' }}>
        <div>
          <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Player</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>My Profile</div>
        </div>
        <button
          onClick={() => setIsDark(v => !v)}
          style={{ background: t.primaryDim, border: 'none', borderRadius: 14, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: t.primary })}
        </button>
      </div>

      {/* Player Card */}
      <div style={{ background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`, borderRadius: 22, padding: '20px', marginBottom: 14, color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 6px 24px rgba(22,163,74,0.3)' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', right: 20, bottom: -40, width: 100, height: 100, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.2)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, marginBottom: 12 }}>🌿</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>EcoPlayer_01</div>
        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>Sustainability Apprentice</div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
          <div><div style={{ fontSize: 20, fontWeight: 800 }}>Day {day}</div><div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>Playing</div></div>
          <div><div style={{ fontSize: 20, fontWeight: 800 }}>{cityHealth}%</div><div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>City Health</div></div>
          <div><div style={{ fontSize: 20, fontWeight: 800 }}>784</div><div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>Score</div></div>
        </div>
      </div>

      {/* Habit Insights */}
      <div style={{ background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Habit Transfer Insights</div>
        {habits.map(h => (
          <div key={h.title} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 12, color: t.text, fontWeight: 600 }}>{h.title}</span>
              <span style={{ fontSize: 11, color: h.color, fontWeight: 700 }}>{h.status}</span>
            </div>
            <div style={{ height: 6, background: t.surface2, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${h.value}%`, height: '100%', background: h.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{ background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Achievements</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {achievements.map(a => (
            <div key={a.name} style={{ background: a.earned ? t.primaryDim : t.surface2, borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${a.earned ? t.borderStrong : t.border}`, opacity: a.earned ? 1 : 0.45 }}>
              <div style={{ fontSize: 28 }}>{a.emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: a.earned ? t.primary : t.textMuted, marginTop: 4, lineHeight: 1.3 }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ background: t.card, borderRadius: 20, padding: 16, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Settings</div>
        {[
          { label: 'Notifications', icon: 'Bell', value: 'On' },
          { label: 'Daily Reminder', icon: 'Clock', value: '8:00 AM' },
          { label: 'Difficulty', icon: 'Settings', value: 'Normal' },
          { label: 'Theme', icon: isDark ? 'Moon' : 'Sun', value: isDark ? 'Dark' : 'Light', action: () => setIsDark(v => !v) },
        ].map((s, i, arr) => (
          <button
            key={s.label}
            onClick={s.action}
            style={{ width: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            {React.createElement(window.lucide[s.icon], { size: 16, color: t.textMuted })}
            <span style={{ fontSize: 13, color: t.text, flex: 1, fontWeight: 600 }}>{s.label}</span>
            <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{s.value}</span>
            {React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })}
          </button>
        ))}
      </div>
    </div>
  );
}

// ========== MAIN APP ==========
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const [cityHealth] = useState(72);
  const [day] = useState(14);
  const [notifications] = useState([
    { id: 1, type: 'alert', message: 'Pest outbreak detected in Block B1 — sort waste to reduce attractants.', read: false },
    { id: 2, type: 'tip', message: 'Best time to run dishwasher: 11PM saves 15 energy points.', read: false },
  ]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      html, body { margin: 0; padding: 0; }
    `;
    document.head.appendChild(style);
  }, []);

  const navItems = [
    { id: 'home', icon: 'Home', label: 'City' },
    { id: 'waste', icon: 'Recycle', label: 'Waste' },
    { id: 'routine', icon: 'Calendar', label: 'Routine' },
    { id: 'district', icon: 'Users', label: 'District' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 48, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 48px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)', transition: 'background 0.3s' }}>

        {/* Status Bar */}
        <StatusBar t={t} />

        {/* Dynamic Island */}
        <DynamicIsland />

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home' && <HomeScreen t={t} cityHealth={cityHealth} day={day} notifications={notifications} />}
          {activeTab === 'waste' && <WasteScreen t={t} />}
          {activeTab === 'routine' && <RoutineScreen t={t} />}
          {activeTab === 'district' && <DistrictScreen t={t} />}
          {activeTab === 'profile' && <ProfileScreen t={t} isDark={isDark} setIsDark={setIsDark} cityHealth={cityHealth} day={day} />}
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 20px', borderTop: `1px solid ${t.border}`, background: t.navBg, transition: 'background 0.3s, border-color 0.3s' }}>
          {navItems.map(nav => {
            const active = activeTab === nav.id;
            return (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', color: active ? t.primary : t.textMuted, padding: '2px 10px' }}
              >
                <div style={{ width: active ? 36 : 28, height: active ? 36 : 28, borderRadius: active ? 12 : 8, background: active ? t.primaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {React.createElement(window.lucide[nav.icon], { size: 20, color: active ? t.primary : t.textMuted })}
                </div>
                <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted }}>{nav.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
