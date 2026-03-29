const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5EDD6',
    cardBg: '#EDE5C8',
    cardBg2: '#E4D9B8',
    primary: '#2D5016',
    secondary: '#E8722A',
    text: '#1A2E0D',
    textMuted: '#6B7E5A',
    navBg: '#EDE5C8',
    accent: '#7BAB35',
    accentLight: '#C8E6A0',
    border: '#C8BB9C',
    gold: '#C8920A',
    success: '#4A8C2A',
    inputBg: '#F9F4E8',
  },
  dark: {
    bg: '#1A2E0D',
    cardBg: '#243B13',
    cardBg2: '#2E4A18',
    primary: '#8DB048',
    secondary: '#E8722A',
    text: '#F0E8CC',
    textMuted: '#8AAA72',
    navBg: '#152509',
    accent: '#6A9B30',
    accentLight: '#3A5A18',
    border: '#3E5A1A',
    gold: '#DEB024',
    success: '#66BB6A',
    inputBg: '#1E3610',
  },
};

const LeafDecor = ({ color, size = 1, style: extraStyle = {}, flip = false }) => (
  <svg
    width={40 * size}
    height={54 * size}
    viewBox="0 0 40 54"
    style={{ ...extraStyle, transform: `${extraStyle.transform || ''} ${flip ? 'scaleX(-1)' : ''}` }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 4 C27 9, 37 23, 35 42 C29 39, 20 44, 12 46 C7 38, 5 22, 11 9 Z" fill={color} opacity="0.32" />
    <path d="M20 8 C21 16, 21 27, 19 46" stroke={color} strokeWidth="1.1" fill="none" opacity="0.45" />
    <path d="M19 20 C15 17, 11 18, 8 23" stroke={color} strokeWidth="0.9" fill="none" opacity="0.38" />
    <path d="M20 30 C24 26, 28 26, 30 31" stroke={color} strokeWidth="0.9" fill="none" opacity="0.38" />
    <path d="M19 14 C23 11, 27 12, 29 16" stroke={color} strokeWidth="0.7" fill="none" opacity="0.3" />
  </svg>
);

const SeedBubble = ({ color, size = 1, style: extraStyle = {} }) => (
  <svg width={22 * size} height={30 * size} viewBox="0 0 22 30" style={extraStyle} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="11" cy="18" rx="9" ry="12" fill={color} opacity="0.22" />
    <line x1="11" y1="6" x2="11" y2="30" stroke={color} strokeWidth="1.2" opacity="0.28" />
  </svg>
);

const SeedCard = ({ seed, theme, small = false }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: seed.bg || theme.cardBg,
        borderRadius: small ? 14 : 20,
        padding: small ? '10px 11px' : '14px 15px',
        border: `1.5px solid ${seed.borderColor || theme.border}`,
        transform: pressed ? 'scale(0.94)' : 'scale(1)',
        transition: 'transform 0.14s ease',
        cursor: 'pointer',
        minWidth: small ? 94 : 130,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: small ? 26 : 34, marginBottom: 4, lineHeight: 1 }}>{seed.emoji}</div>
      <div style={{ fontSize: small ? 10 : 12, fontWeight: '700', color: seed.nameColor || theme.primary, fontFamily: "'Lora', serif" }}>{seed.name}</div>
      <div style={{ fontSize: small ? 8 : 10, color: theme.textMuted, fontFamily: "'Lora', serif", marginTop: 2 }}>{seed.region}</div>
      {seed.rare && (
        <div style={{ position: 'absolute', top: 5, right: 5, background: seed.rareBg || theme.gold, borderRadius: 5, padding: '1px 5px', fontSize: 7, color: '#fff', fontWeight: '700', fontFamily: "'Lora', serif", letterSpacing: '0.3px' }}>RARE</div>
      )}
    </div>
  );
};

const ActivityRing = ({ value, max, color, label, unit, theme }) => {
  const pct = Math.min(value / max, 1);
  const r = 27;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <div style={{ position: 'relative', width: 68, height: 68 }}>
        <svg width="68" height="68" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="34" cy="34" r={r} fill="none" stroke={theme.cardBg2} strokeWidth="7" />
          <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="7" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: '700', color: theme.text, fontFamily: "'Lora', serif", lineHeight: 1 }}>{value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}</div>
          <div style={{ fontSize: 8, color: theme.textMuted, fontFamily: "'Lora', serif" }}>{unit}</div>
        </div>
      </div>
      <span style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif" }}>{label}</span>
    </div>
  );
};

// ─────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────
function HomeScreen({ theme, isDark }) {
  const seeds = [
    { emoji: '🌿', name: 'Wild Fern', region: 'Pacific NW', bg: isDark ? '#1E3910' : '#E3EDD5', borderColor: '#7BAB35', nameColor: isDark ? '#9FCC50' : '#2D5016' },
    { emoji: '🌸', name: 'Cherry Blossom', region: 'East Asia', bg: isDark ? '#36182A' : '#F5E0EC', borderColor: '#CC7AAE', nameColor: isDark ? '#E8A0C8' : '#7A2252', rare: true, rareBg: '#B0458A' },
    { emoji: '🌵', name: 'Desert Sage', region: 'Sonoran Desert', bg: isDark ? '#25280E' : '#EAEDCE', borderColor: '#9BAB40', nameColor: isDark ? '#B0C450' : '#4A5816' },
    { emoji: '🍄', name: 'Forest Cap', region: 'Borneo', bg: isDark ? '#2A1A0A' : '#F0E4D0', borderColor: '#C4803C', nameColor: isDark ? '#D8A060' : '#7A4010', rare: true, rareBg: '#B06020' },
  ];

  return (
    <div style={{ padding: '10px 20px 24px', overflowX: 'hidden', minHeight: '100%' }}>
      {/* Greeting with leaf decor */}
      <div style={{ position: 'relative', marginBottom: 18, paddingRight: 48 }}>
        <LeafDecor color={theme.primary} size={1.05} extraStyle={{}} style={{ position: 'absolute', right: -6, top: -10, opacity: 0.55 }} />
        <LeafDecor color={theme.accent} size={0.65} style={{ position: 'absolute', right: 28, top: 6, opacity: 0.35, transform: 'rotate(-18deg)' }} />
        <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'Lora', serif", marginBottom: 2, fontStyle: 'italic' }}>Sunday, March 29</div>
        <div style={{ fontSize: 23, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", lineHeight: 1.2 }}>Good morning,</div>
        <div style={{ fontSize: 23, fontWeight: '700', color: theme.secondary, fontFamily: "'Lora', serif" }}>Eco Warrior 🌱</div>
      </div>

      {/* Streak + seeds banner */}
      <div style={{ background: theme.secondary, borderRadius: 18, padding: '12px 16px', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 14px rgba(232,114,42,0.3)' }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.82)', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>Current Streak</div>
          <div style={{ fontSize: 21, fontWeight: '700', color: '#fff', fontFamily: "'Lora', serif" }}>🔥 14 days</div>
        </div>
        <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.25)' }} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.82)', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>Seeds Collected</div>
          <div style={{ fontSize: 21, fontWeight: '700', color: '#fff', fontFamily: "'Lora', serif" }}>47 🌾</div>
        </div>
      </div>

      {/* Today's activity rings */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 14, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 10 }}>Today's Activity</div>
        <div style={{ background: theme.cardBg, borderRadius: 20, padding: '16px 8px', display: 'flex', justifyContent: 'space-around', border: `1.5px solid ${theme.border}`, position: 'relative', overflow: 'hidden' }}>
          <SeedBubble color={theme.primary} size={1.8} style={{ position: 'absolute', right: 8, top: 8, opacity: 0.6 }} />
          <ActivityRing value={6240} max={10000} color={theme.secondary} label="Steps" unit="steps" theme={theme} />
          <ActivityRing value={15} max={20} color={theme.accent} label="Meditate" unit="min" theme={theme} />
          <ActivityRing value={5} max={15} color={theme.primary} label="Cycle" unit="km" theme={theme} />
        </div>
      </div>

      {/* Seeds earned today */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>Seeds Earned Today</div>
          <div style={{ fontSize: 11, color: theme.secondary, fontFamily: "'Lora', serif", cursor: 'pointer', fontStyle: 'italic' }}>View all →</div>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {seeds.map((seed, i) => <SeedCard key={i} seed={seed} theme={theme} small />)}
        </div>
      </div>

      {/* Ecosystem quick stats */}
      <div style={{ background: theme.cardBg, borderRadius: 20, padding: '14px 16px', border: `1.5px solid ${theme.border}`, position: 'relative', overflow: 'hidden' }}>
        <LeafDecor color={theme.primary} size={1.6} style={{ position: 'absolute', right: -18, bottom: -14, opacity: 0.10 }} />
        <div style={{ fontSize: 14, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 12 }}>Your Ecosystem</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[
            { label: 'Plants', value: '23', emoji: '🌿' },
            { label: 'Hybrids', value: '5', emoji: '✨' },
            { label: 'Trees', value: '12', emoji: '🌳' },
            { label: 'CO₂ Offset', value: '156kg', emoji: '💚' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>{stat.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: '700', color: theme.text, fontFamily: "'Lora', serif" }}>{stat.value}</div>
              <div style={{ fontSize: 9, color: theme.textMuted, fontFamily: "'Lora', serif" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// GARDEN SCREEN
// ─────────────────────────────────────────
function GardenScreen({ theme, isDark }) {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [labOpen, setLabOpen] = useState(false);

  const plants = [
    { id: 1, emoji: '🌿', name: 'Wild Fern', level: 3, health: 95, type: 'Fern' },
    { id: 2, emoji: '🌸', name: 'Cherry Blossom', level: 5, health: 88, type: 'Flower', rare: true },
    { id: 3, emoji: '🌵', name: 'Desert Sage', level: 2, health: 72, type: 'Succulent' },
    { id: 4, emoji: '🍀', name: 'Lucky Clover', level: 4, health: 100, type: 'Herb' },
    { id: 5, emoji: '🌺', name: 'Hibiscus', level: 3, health: 81, type: 'Flower' },
    { id: 6, emoji: '🌾', name: 'Wild Wheat', level: 2, health: 65, type: 'Grass' },
    { id: 7, emoji: '🍄', name: 'Forest Cap', level: 1, health: 90, type: 'Fungi', rare: true },
    { id: 8, emoji: '🌻', name: 'Giant Sunflower', level: 4, health: 78, type: 'Flower' },
  ];

  const healthColor = (h) => h > 80 ? theme.accent : h > 50 ? '#E09020' : '#CC3C3C';

  return (
    <div style={{ padding: '10px 20px 24px' }}>
      {/* Header with leaf motifs on both sides */}
      <div style={{ position: 'relative', marginBottom: 16, paddingTop: 2 }}>
        <LeafDecor color={theme.accent} size={0.78} style={{ position: 'absolute', left: -14, top: -6, opacity: 0.48 }} flip />
        <LeafDecor color={theme.primary} size={0.88} style={{ position: 'absolute', right: -8, top: -6, opacity: 0.42, transform: 'rotate(12deg)' }} />
        <div style={{ paddingLeft: 22 }}>
          <div style={{ fontSize: 22, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>Your Garden</div>
          <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>23 plants growing · 5 ready to harvest</div>
        </div>
      </div>

      {/* Crossbreeding Lab toggle */}
      <div
        onClick={() => setLabOpen(!labOpen)}
        style={{ background: labOpen ? theme.primary : theme.secondary, borderRadius: 16, padding: '11px 16px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.25s', boxShadow: labOpen ? '0 3px 12px rgba(45,80,22,0.35)' : '0 3px 12px rgba(232,114,42,0.3)' }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: '700', color: '#fff', fontFamily: "'Lora', serif" }}>🧬 Crossbreeding Lab</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.78)', fontFamily: "'Lora', serif' " }}>Combine plants for rare hybrids</div>
        </div>
        <span style={{ fontSize: 20 }}>{labOpen ? '🔼' : '🔬'}</span>
      </div>

      {/* Lab panel */}
      {labOpen && (
        <div style={{ background: theme.cardBg, borderRadius: 16, padding: '14px', marginBottom: 14, border: `1.5px dashed ${theme.primary}` }}>
          <div style={{ fontSize: 11, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 10, textAlign: 'center' }}>Select 2 plants to crossbreed</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {[{ emoji: '🌿', name: 'Wild Fern' }, null, { emoji: '🌸', name: 'Cherry Blossom' }, null, { emoji: '🌸', name: 'Fern Blossom', result: true }].map((item, i) => {
              if (item === null) return <div key={i} style={{ fontSize: 18, color: theme.textMuted }}>{i === 1 ? '✕' : '→'}</div>;
              return (
                <div key={i} style={{ background: item.result ? `${theme.accent}28` : theme.bg, borderRadius: 12, padding: '8px 10px', border: `1.5px ${item.result ? 'solid' : 'dashed'} ${item.result ? theme.accent : theme.border}`, textAlign: 'center', minWidth: 72 }}>
                  <div style={{ fontSize: 26 }}>{item.emoji}</div>
                  <div style={{ fontSize: 8, color: item.result ? theme.accent : theme.text, fontFamily: "'Lora', serif", fontWeight: item.result ? '700' : '400', marginTop: 2 }}>{item.name}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <div style={{ background: theme.primary, borderRadius: 10, padding: '8px 22px', cursor: 'pointer' }}>
              <span style={{ color: '#fff', fontSize: 11, fontFamily: "'Lora', serif", fontWeight: '700' }}>Crossbreed (costs 3 Seeds)</span>
            </div>
          </div>
        </div>
      )}

      {/* Plant grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9, marginBottom: 12 }}>
        {plants.map(plant => (
          <div
            key={plant.id}
            onClick={() => setSelectedPlant(selectedPlant?.id === plant.id ? null : plant)}
            style={{
              background: selectedPlant?.id === plant.id ? `${theme.primary}25` : theme.cardBg,
              borderRadius: 15,
              padding: '9px 7px',
              textAlign: 'center',
              border: `1.5px solid ${selectedPlant?.id === plant.id ? theme.primary : theme.border}`,
              cursor: 'pointer',
              transition: 'all 0.14s',
              position: 'relative',
            }}
          >
            {plant.rare && <div style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', background: theme.gold }} />}
            <div style={{ fontSize: 27 }}>{plant.emoji}</div>
            <div style={{ fontSize: 8, color: theme.text, fontFamily: "'Lora', serif", fontWeight: '600', marginTop: 3, lineHeight: 1.2 }}>{plant.name}</div>
            <div style={{ fontSize: 7, color: theme.textMuted, fontFamily: "'Lora', serif" }}>Lv.{plant.level}</div>
            <div style={{ marginTop: 5, height: 3, background: theme.cardBg2, borderRadius: 2 }}>
              <div style={{ width: `${plant.health}%`, height: '100%', background: healthColor(plant.health), borderRadius: 2, transition: 'width 0.4s' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Selected plant detail */}
      {selectedPlant && (
        <div style={{ background: theme.cardBg, borderRadius: 18, padding: '13px 15px', border: `1.5px solid ${theme.primary}`, animation: 'none' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: 46, lineHeight: 1 }}>{selectedPlant.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>{selectedPlant.name}</div>
              <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif" }}>Level {selectedPlant.level} · {selectedPlant.type} · Health {selectedPlant.health}%</div>
              <div style={{ display: 'flex', gap: 7, marginTop: 8 }}>
                <div style={{ background: '#3A8FD4', borderRadius: 8, padding: '5px 11px', cursor: 'pointer' }}>
                  <span style={{ color: '#fff', fontSize: 10, fontFamily: "'Lora', serif" }}>Water 💧</span>
                </div>
                <div style={{ background: theme.accent, borderRadius: 8, padding: '5px 11px', cursor: 'pointer' }}>
                  <span style={{ color: '#fff', fontSize: 10, fontFamily: "'Lora', serif" }}>Fertilize 🌱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// QUESTS SCREEN
// ─────────────────────────────────────────
function QuestsScreen({ theme, isDark }) {
  const [checked, setChecked] = useState([false, true, false]);

  const toggle = (i) => {
    const n = [...checked];
    n[i] = !n[i];
    setChecked(n);
  };

  const dailies = [
    { text: 'Walk 8,000 steps', reward: '🌿 Wild Fern Seed', xp: 50 },
    { text: 'Meditate for 10 minutes', reward: '🧘 Calm Lotus Seed', xp: 35 },
    { text: 'Log a plant-based meal', reward: '🥗 Garden Herb Pack', xp: 40 },
  ];

  return (
    <div style={{ padding: '10px 20px 24px' }}>
      {/* Header */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <LeafDecor color={theme.secondary} size={0.82} style={{ position: 'absolute', right: -8, top: -6, opacity: 0.45, transform: 'rotate(22deg)' }} />
        <div style={{ fontSize: 22, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>Eco Quests</div>
        <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>Complete quests to earn rare seeds & real impact</div>
      </div>

      {/* Seasonal quest */}
      <div style={{ background: `linear-gradient(140deg, #2D5016 0%, #5A8A22 100%)`, borderRadius: 20, padding: '16px 16px 14px', marginBottom: 16, position: 'relative', overflow: 'hidden', boxShadow: '0 6px 20px rgba(45,80,22,0.28)' }}>
        <div style={{ position: 'absolute', right: -8, bottom: -8, fontSize: 72, opacity: 0.22, lineHeight: 1 }}>🌸</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', fontFamily: "'Lora', serif", letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 4 }}>Seasonal Quest</div>
        <div style={{ fontSize: 19, fontWeight: '700', color: '#fff', fontFamily: "'Lora', serif" }}>Spring Migration</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.82)', fontFamily: "'Lora', serif", marginTop: 3, marginBottom: 12 }}>Track 5 migratory species in your area this week</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.78)', fontFamily: "'Lora', serif" }}>3 / 5 species spotted</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.78)', fontFamily: "'Lora', serif" }}>4 days left</span>
        </div>
        <div style={{ height: 7, background: 'rgba(255,255,255,0.22)', borderRadius: 4 }}>
          <div style={{ width: '60%', height: '100%', background: '#fff', borderRadius: 4 }} />
        </div>
        <div style={{ marginTop: 10, display: 'inline-block', background: 'rgba(255,255,255,0.18)', borderRadius: 9, padding: '4px 12px' }}>
          <span style={{ color: '#fff', fontSize: 10, fontFamily: "'Lora', serif" }}>🦋 Reward: Monarch Seed (RARE)</span>
        </div>
      </div>

      {/* Daily challenges */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 10 }}>Daily Challenges</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {dailies.map((d, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{ background: checked[i] ? `${theme.accent}20` : theme.cardBg, borderRadius: 14, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11, border: `1.5px solid ${checked[i] ? theme.accent : theme.border}`, cursor: 'pointer', transition: 'all 0.18s' }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${checked[i] ? theme.accent : theme.border}`, background: checked[i] ? theme.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.18s' }}>
                {checked[i] && <span style={{ color: '#fff', fontSize: 12, lineHeight: 1 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: theme.text, fontFamily: "'Lora', serif", fontWeight: '600', textDecoration: checked[i] ? 'line-through' : 'none', opacity: checked[i] ? 0.55 : 1, transition: 'all 0.18s' }}>{d.text}</div>
                <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif", marginTop: 2 }}>{d.reward}</div>
              </div>
              <div style={{ background: `${theme.secondary}22`, borderRadius: 8, padding: '3px 8px', flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: theme.secondary, fontFamily: "'Lora', serif", fontWeight: '700' }}>+{d.xp}XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly task */}
      <div style={{ background: theme.cardBg, borderRadius: 18, padding: '13px 15px', border: `1px solid ${theme.border}`, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: 13, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>🌍 Weekly Eco-Task</div>
          <div style={{ fontSize: 9, color: theme.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>Ends Sunday</div>
        </div>
        <div style={{ fontSize: 12, color: theme.text, fontFamily: "'Lora', serif", marginBottom: 10, lineHeight: 1.5 }}>Plant a native species in your neighborhood and log it with a photo</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif" }}>🌱 Reward: +1 Real Tree Planted</div>
          <div style={{ background: theme.primary, borderRadius: 9, padding: '5px 13px', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontSize: 10, fontFamily: "'Lora', serif", fontWeight: '600' }}>Log Activity</span>
          </div>
        </div>
      </div>

      {/* Community progress */}
      <div style={{ background: theme.cardBg, borderRadius: 18, padding: '13px 15px', border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 13, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 6 }}>🏆 Community Quest</div>
        <div style={{ fontSize: 11, color: theme.text, fontFamily: "'Lora', serif", marginBottom: 8 }}>Together, plant 1,000 trees by Earth Day (April 22)</div>
        <div style={{ height: 9, background: theme.cardBg2, borderRadius: 5, marginBottom: 5 }}>
          <div style={{ width: '73%', height: '100%', background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`, borderRadius: 5 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif" }}>730 / 1,000 trees planted</span>
          <span style={{ fontSize: 10, color: theme.accent, fontFamily: "'Lora', serif", fontWeight: '700' }}>73%</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// FOREST (IMPACT) SCREEN
// ─────────────────────────────────────────
function ForestScreen({ theme, isDark }) {
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    { name: 'Amazon Rainforest', country: 'Brazil 🇧🇷', trees: 412, area: '2.4 ha', emoji: '🌳', desc: 'Restoring vital canopy in Para state alongside local communities.' },
    { name: 'Borneo Restoration', country: 'Indonesia 🇮🇩', trees: 287, area: '1.8 ha', emoji: '🌿', desc: 'Regenerating orangutan habitat with native dipterocarps.' },
    { name: 'Scottish Highlands', country: 'Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿', trees: 156, area: '0.9 ha', emoji: '🍀', desc: 'Ancient Caledonian pine forest rewilding project.' },
  ];

  const seedSets = [
    { emoji: '🌿', name: 'Wild Fern', collected: 8, needed: 10 },
    { emoji: '🌸', name: 'Cherry Blossom', collected: 10, needed: 10, ready: true },
    { emoji: '🌵', name: 'Desert Sage', collected: 4, needed: 10 },
  ];

  return (
    <div style={{ padding: '10px 20px 24px' }}>
      {/* Header with leaf decor on both sides */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <LeafDecor color={theme.primary} size={1.0} style={{ position: 'absolute', right: -8, top: -10, opacity: 0.50, transform: 'rotate(8deg)' }} />
        <LeafDecor color={theme.accent} size={0.65} style={{ position: 'absolute', right: 30, top: 2, opacity: 0.28, transform: 'rotate(-22deg)' }} />
        <div style={{ fontSize: 22, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>Real Forest</div>
        <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>Your digital journey powers real reforestation</div>
      </div>

      {/* Impact stats card */}
      <div style={{ background: 'linear-gradient(140deg, #2D5016 0%, #4E8020 100%)', borderRadius: 20, padding: '15px 16px', marginBottom: 16, position: 'relative', overflow: 'hidden', boxShadow: '0 6px 22px rgba(45,80,22,0.32)' }}>
        <div style={{ position: 'absolute', right: 8, top: 8, fontSize: 64, opacity: 0.14, lineHeight: 1 }}>🌲</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', fontFamily: "'Lora', serif", marginBottom: 8, fontStyle: 'italic' }}>Your Total Impact</div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[
            { value: '12', label: 'Trees Planted', emoji: '🌳' },
            { value: '156 kg', label: 'CO₂ Offset', emoji: '💨' },
            { value: '47 m²', label: 'Habitat Created', emoji: '🦋' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18 }}>{s.emoji}</div>
              <div style={{ fontSize: 18, fontWeight: '700', color: '#fff', fontFamily: "'Lora', serif" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.72)', fontFamily: "'Lora', serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Seed-to-tree converter */}
      <div style={{ background: theme.cardBg, borderRadius: 20, padding: '13px 15px', border: `1px solid ${theme.border}`, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 5 }}>🌱 Plant a Real Tree</div>
        <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif", marginBottom: 11, lineHeight: 1.4 }}>Collect 10 seeds of the same species to plant a real tree with our NGO partners</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {seedSets.map((s, i) => (
            <div key={i} style={{ flex: 1, background: s.ready ? `${theme.accent}20` : theme.bg, borderRadius: 13, padding: '8px 6px', border: `1.5px solid ${s.ready ? theme.accent : theme.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{s.emoji}</div>
              <div style={{ fontSize: 8, color: theme.text, fontFamily: "'Lora', serif", marginTop: 3, lineHeight: 1.2 }}>{s.name}</div>
              <div style={{ height: 4, background: theme.cardBg2, borderRadius: 2, margin: '5px 0 3px' }}>
                <div style={{ width: `${(s.collected / s.needed) * 100}%`, height: '100%', background: s.ready ? theme.accent : theme.secondary, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 7, color: s.ready ? theme.accent : theme.textMuted, fontFamily: "'Lora', serif", fontWeight: s.ready ? '700' : '400' }}>{s.collected}/{s.needed}</div>
            </div>
          ))}
        </div>
        <div style={{ background: theme.accent, borderRadius: 11, padding: '9px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 3px 10px rgba(123,171,53,0.3)' }}>
          <span style={{ color: '#fff', fontSize: 12, fontFamily: "'Lora', serif", fontWeight: '700' }}>🌳 Plant Cherry Blossom Tree Now</span>
        </div>
      </div>

      {/* Active reforestation projects */}
      <div>
        <div style={{ fontSize: 14, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 10 }}>Active Projects</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(i)}
              style={{ background: selectedProject === i ? `${theme.primary}14` : theme.cardBg, borderRadius: 16, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11, border: `1.5px solid ${selectedProject === i ? theme.primary : theme.border}`, cursor: 'pointer', transition: 'all 0.15s' }}
            >
              <div style={{ fontSize: 34, lineHeight: 1 }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: '700', color: theme.text, fontFamily: "'Lora', serif" }}>{p.name}</div>
                <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif" }}>{p.country}</div>
                {selectedProject === i && <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif", marginTop: 3, lineHeight: 1.4, fontStyle: 'italic' }}>{p.desc}</div>}
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 16, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>{p.trees}</div>
                <div style={{ fontSize: 8, color: theme.textMuted, fontFamily: "'Lora', serif" }}>trees</div>
                <div style={{ fontSize: 8, color: theme.textMuted, fontFamily: "'Lora', serif" }}>{p.area}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────
function ProfileScreen({ theme, isDark, toggleTheme }) {
  const achievements = [
    { emoji: '🌱', label: 'First Seed', unlocked: true },
    { emoji: '🔥', label: '7-Day Streak', unlocked: true },
    { emoji: '🌳', label: 'Tree Planter', unlocked: true },
    { emoji: '🧬', label: 'Hybridist', unlocked: true },
    { emoji: '🦋', label: 'Rare Collector', unlocked: false },
    { emoji: '🌍', label: 'Earth Guardian', unlocked: false },
  ];

  return (
    <div style={{ padding: '10px 20px 24px' }}>
      {/* Profile header with leaf motifs */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: 18, paddingTop: 6 }}>
        <LeafDecor color={theme.primary} size={0.9} style={{ position: 'absolute', left: 0, top: -6, opacity: 0.38, transform: 'rotate(-18deg)' }} />
        <LeafDecor color={theme.secondary} size={0.75} style={{ position: 'absolute', right: 0, top: -4, opacity: 0.32, transform: 'rotate(22deg)' }} flip />
        <div style={{ width: 74, height: 74, borderRadius: '50%', background: `linear-gradient(140deg, ${theme.primary}, ${theme.accent})`, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, border: `3px solid ${theme.secondary}`, boxShadow: '0 4px 14px rgba(45,80,22,0.25)' }}>🌿</div>
        <div style={{ fontSize: 19, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>EcoWarrior_Sam</div>
        <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'Lora', serif", fontStyle: 'italic', marginBottom: 8 }}>Level 14 · Eco Guardian</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          <div style={{ background: `${theme.secondary}22`, borderRadius: 10, padding: '4px 12px' }}>
            <span style={{ fontSize: 11, color: theme.secondary, fontFamily: "'Lora', serif", fontWeight: '700' }}>🔥 14 day streak</span>
          </div>
          <div style={{ background: `${theme.accent}22`, borderRadius: 10, padding: '4px 12px' }}>
            <span style={{ fontSize: 11, color: theme.accent, fontFamily: "'Lora', serif", fontWeight: '700' }}>⭐ 1,240 XP</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ background: theme.cardBg, borderRadius: 18, padding: '13px 16px', marginBottom: 16, border: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between' }}>
        {[
          { label: 'Seeds', value: '47' },
          { label: 'Plants', value: '23' },
          { label: 'Trees', value: '12' },
          { label: 'Quests', value: '31' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'Lora', serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: '700', color: theme.primary, fontFamily: "'Lora', serif", marginBottom: 10 }}>Achievements</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
          {achievements.map((a, i) => (
            <div key={i} style={{ background: a.unlocked ? theme.cardBg : theme.cardBg + '99', borderRadius: 13, padding: '9px 8px', textAlign: 'center', border: `1px solid ${a.unlocked ? theme.border : theme.border + '55'}`, opacity: a.unlocked ? 1 : 0.48 }}>
              <div style={{ fontSize: 24, filter: a.unlocked ? 'none' : 'grayscale(1)' }}>{a.emoji}</div>
              <div style={{ fontSize: 9, color: theme.text, fontFamily: "'Lora', serif", marginTop: 3 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings list */}
      <div style={{ background: theme.cardBg, borderRadius: 18, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
        {[
          { icon: '🌙', label: isDark ? 'Light Mode' : 'Dark Mode', action: toggleTheme, isToggle: true, toggled: isDark },
          { icon: '🔔', label: 'Notifications', action: () => {} },
          { icon: '👥', label: 'Connect Friends', action: () => {} },
          { icon: '🌍', label: 'Reforestation Region', action: () => {} },
          { icon: '❓', label: 'Help & FAQ', action: () => {} },
        ].map((item, i, arr) => (
          <div
            key={i}
            onClick={item.action}
            style={{ display: 'flex', alignItems: 'center', padding: '12px 15px', cursor: 'pointer', borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}44` : 'none', gap: 12 }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: 12, color: theme.text, fontFamily: "'Lora', serif" }}>{item.label}</span>
            {item.isToggle ? (
              <div style={{ width: 40, height: 22, borderRadius: 11, background: item.toggled ? theme.primary : theme.cardBg2, position: 'relative', transition: 'background 0.2s', border: `1px solid ${theme.border}`, flexShrink: 0 }}>
                <div style={{ width: 17, height: 17, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: item.toggled ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.22)' }} />
              </div>
            ) : (
              <span style={{ color: theme.textMuted, fontSize: 16, lineHeight: 1 }}>›</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'garden', label: 'Garden', icon: window.lucide.Leaf },
    { id: 'quests', label: 'Quests', icon: window.lucide.Zap },
    { id: 'forest', label: 'Forest', icon: window.lucide.Globe },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    garden: GardenScreen,
    quests: QuestsScreen,
    forest: ForestScreen,
    profile: ProfileScreen,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        width: 375,
        height: 812,
        borderRadius: 46,
        overflow: 'hidden',
        background: theme.bg,
        position: 'relative',
        fontFamily: "'Lora', serif",
        boxShadow: '0 50px 100px rgba(0,0,0,0.28), 0 0 0 9px #1a1a1a, 0 0 0 11px #2e2e2e',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s',
      }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 26px 9px', flexShrink: 0, zIndex: 10 }}>
          <span style={{ fontSize: 14, fontWeight: '600', color: theme.text, fontFamily: "'Lora', serif" }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {React.createElement(window.lucide.Signal, { size: 14, color: theme.text })}
            {React.createElement(window.lucide.Wifi, { size: 14, color: theme.text })}
            {React.createElement(window.lucide.Battery, { size: 14, color: theme.text })}
          </div>
        </div>

        {/* Scrollable screen content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {React.createElement(screens[activeTab], { theme, isDark, toggleTheme: () => setIsDark(!isDark) })}
        </div>

        {/* Bottom Navigation */}
        <div style={{ height: 74, background: theme.navBg, borderTop: `1px solid ${theme.border}55`, display: 'flex', alignItems: 'center', flexShrink: 0, paddingBottom: 6 }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const navItemStyle = {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: 3,
              padding: '7px 0',
              transition: 'all 0.15s',
            };
            const labelStyle = {
              fontSize: 9,
              color: isActive ? theme.secondary : theme.textMuted,
              fontFamily: "'Lora', serif",
              fontWeight: isActive ? '600' : '400',
              transition: 'color 0.15s',
            };
            return React.createElement(
              'div',
              { key: tab.id, onClick: () => setActiveTab(tab.id), style: navItemStyle },
              React.createElement(tab.icon, { size: 22, color: isActive ? theme.secondary : theme.textMuted }),
              React.createElement('span', { style: labelStyle }, tab.label)
            );
          })}
        </div>
      </div>
    </div>
  );
}
