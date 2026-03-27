const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A1628',
    surface: '#122040',
    surfaceAlt: '#1A2E50',
    card: '#162848',
    primary: '#5BC8AF',
    primaryGlow: 'rgba(91,200,175,0.18)',
    secondary: '#F4A261',
    text: '#E8F4F0',
    textSecondary: '#7EA8C0',
    textMuted: '#3D5A78',
    border: '#1C3458',
    navBg: '#0D1E38',
    success: '#4CAF87',
    accent2: '#C084FC',
  },
  light: {
    bg: '#EEF2EE',
    surface: '#FAFCFA',
    surfaceAlt: '#F0F5F0',
    card: '#FFFFFF',
    primary: '#2EA88A',
    primaryGlow: 'rgba(46,168,138,0.12)',
    secondary: '#E8935A',
    text: '#1A2E2A',
    textSecondary: '#4A6A60',
    textMuted: '#8AADA5',
    border: '#D6E8E0',
    navBg: '#FFFFFF',
    success: '#2E7D5A',
    accent2: '#9333EA',
  },
};

const destinations = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    ritual: 'Sunrise Awakening',
    description: 'Mindful Tai Chi on volcanic cliffs, syncing breath with ocean waves at dawn',
    stages: 7,
    currentStage: 3,
    colorA: '#F4A261',
    colorB: '#E76F51',
    emoji: '🌅',
    members: 5,
    daysLeft: 12,
    active: true,
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    ritual: 'Evening Tea Ceremony',
    description: 'Zen tea rituals infused with ancient mindfulness practices at dusk',
    stages: 9,
    currentStage: 0,
    colorA: '#A8DADC',
    colorB: '#7FAFC1',
    emoji: '🍵',
    members: 0,
    daysLeft: null,
    active: false,
  },
  {
    id: 'morocco',
    name: 'Marrakech',
    country: 'Morocco',
    ritual: 'Desert Breath',
    description: 'Hammam-inspired breathing and body awareness under open skies',
    stages: 6,
    currentStage: 0,
    colorA: '#E9C46A',
    colorB: '#F4A261',
    emoji: '🏜️',
    members: 0,
    daysLeft: null,
    active: false,
  },
  {
    id: 'iceland',
    name: 'Reykjavik',
    country: 'Iceland',
    ritual: 'Geothermal Stillness',
    description: 'Cold immersion mindfulness and northern lights meditation',
    stages: 8,
    currentStage: 0,
    colorA: '#B5EAD7',
    colorB: '#C7CEEA',
    emoji: '❄️',
    members: 0,
    daysLeft: null,
    active: false,
  },
];

const groupMemberData = [
  { id: 1, name: 'Aiko Tanaka', initials: 'AT', status: 'completed', streak: 15, timezone: 'JST', color: '#A8DADC' },
  { id: 2, name: 'Mia Chen', initials: 'MC', status: 'completed', streak: 12, timezone: 'SGT', color: '#F4A261' },
  { id: 3, name: 'Lars Berg', initials: 'LB', status: 'in-progress', streak: 8, timezone: 'CET', color: '#C084FC' },
  { id: 4, name: 'Sofia Valle', initials: 'SV', status: 'pending', streak: 5, timezone: 'EST', color: '#FFB7C5' },
  { id: 5, name: 'You', initials: 'ME', status: 'completed', streak: 9, timezone: 'PST', color: '#5BC8AF' },
];

const reflectionData = [
  {
    id: 1,
    user: 'Aiko Tanaka',
    initials: 'AT',
    time: '2 hours ago',
    duration: '0:42',
    ritual: 'Bali Sunrise · Stage 3',
    caption: 'The morning light felt different today — I finally understood what stillness means.',
    likes: 8,
    color: '#A8DADC',
    bars: [3, 6, 9, 5, 8, 4, 10, 7, 5, 9, 4, 8, 6, 3, 7],
  },
  {
    id: 2,
    user: 'Mia Chen',
    initials: 'MC',
    time: '5 hours ago',
    duration: '1:12',
    ritual: 'Bali Sunrise · Stage 3',
    caption: 'Day 9 complete! Found myself breathing slower, more intentionally. This ritual changes you.',
    likes: 12,
    color: '#F4A261',
    bars: [5, 8, 4, 10, 6, 9, 3, 7, 5, 8, 4, 9, 7, 5, 8],
  },
  {
    id: 3,
    user: 'Lars Berg',
    initials: 'LB',
    time: 'Yesterday',
    duration: '0:28',
    ritual: 'Bali Sunrise · Stage 2',
    caption: 'Short check-in — the cold morning air reminded me exactly why I started this journey.',
    likes: 5,
    color: '#C084FC',
    bars: [4, 7, 3, 9, 5, 6, 8, 4, 7, 5, 9, 3, 6, 8, 4],
  },
];

const ritualStages = [
  { stage: 1, name: 'Awakening', desc: 'Set your intention. 2-min breath awareness upon waking.', done: true },
  { stage: 2, name: 'Body Greeting', desc: 'Gentle neck and shoulder rolls facing east.', done: true },
  { stage: 3, name: 'Earth Connection', desc: 'Stand barefoot on natural ground for 60 seconds.', done: true, current: false },
  { stage: 4, name: 'Sun Salutation', desc: 'Three slow sun salutations with ocean visualization.', done: false, current: true },
  { stage: 5, name: 'Gratitude Spiral', desc: 'Name three blessings while watching the horizon.', done: false },
  { stage: 6, name: 'Temple Offering', desc: 'Mindfully prepare something kind for another person.', done: false },
  { stage: 7, name: 'Bali Closing', desc: 'Record a 1-min voice reflection on your journey.', done: false },
];

// --- Waveform component ---
function Waveform({ bars, isPlaying, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 28, flex: 1 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            height: isPlaying ? `${h * 2.4}px` : `${Math.min(h * 0.6, 7)}px`,
            background: isPlaying ? color : color + '55',
            transition: `height ${0.1 + (i % 5) * 0.04}s ease`,
          }}
        />
      ))}
    </div>
  );
}

// --- Toggle ---
function Toggle({ value, onToggle, primaryColor, surfaceAlt, borderColor }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 46, height: 26, borderRadius: 13,
        background: value ? primaryColor : surfaceAlt,
        border: `1px solid ${value ? primaryColor : borderColor}`,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.25s, border 0.25s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        width: 18, height: 18,
        borderRadius: '50%',
        background: '#fff',
        top: 3,
        left: value ? 24 : 4,
        transition: 'left 0.25s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }} />
    </div>
  );
}

// --- HomeScreen ---
function HomeScreen({ theme }) {
  const t = themes[theme];
  const [todayDone, setTodayDone] = useState(false);
  const [btnPress, setBtnPress] = useState(false);
  const active = destinations[0];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: t.textSecondary, fontSize: 13, margin: 0, fontWeight: 500 }}>Good morning ✨</p>
          <h2 style={{ color: t.text, fontSize: 22, fontWeight: 700, margin: '3px 0 0', fontFamily: 'Sora, sans-serif' }}>
            Your Journey
          </h2>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 14,
          background: t.primaryGlow,
          border: `1px solid ${t.primary}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>
          🧘
        </div>
      </div>

      {/* Active Quest Card */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          borderRadius: 22,
          background: `linear-gradient(135deg, ${active.colorA}1A, ${active.colorB}33)`,
          border: `1px solid ${active.colorA}44`,
          padding: 20, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -16, right: -10, fontSize: 90, opacity: 0.1, pointerEvents: 'none' }}>
            {active.emoji}
          </div>
          <span style={{
            background: active.colorA + '2A', color: active.colorA,
            fontSize: 11, fontWeight: 700, padding: '3px 10px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: 0.6,
          }}>
            Active Quest
          </span>
          <h3 style={{ color: t.text, fontSize: 19, fontWeight: 700, margin: '10px 0 4px', fontFamily: 'Sora, sans-serif' }}>
            {active.emoji} Bali {active.ritual}
          </h3>
          <p style={{ color: t.textSecondary, fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
            Stage {active.currentStage} of {active.stages} · {active.daysLeft} days remaining
          </p>
          {/* Progress bar */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: t.textSecondary, fontSize: 12 }}>Group Progress</span>
              <span style={{ color: active.colorA, fontSize: 12, fontWeight: 700 }}>
                {Math.round((active.currentStage / active.stages) * 100)}%
              </span>
            </div>
            <div style={{ height: 7, background: t.surfaceAlt, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(active.currentStage / active.stages) * 100}%`,
                background: `linear-gradient(90deg, ${active.colorA}, ${active.colorB})`,
                borderRadius: 4,
              }} />
            </div>
          </div>
          {/* Stage dots */}
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: active.stages }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 5, borderRadius: 3,
                background: i < active.currentStage
                  ? active.colorA
                  : i === active.currentStage
                    ? active.colorA + '55'
                    : t.surfaceAlt,
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Today's Ritual */}
      <div style={{ padding: '0 16px 14px' }}>
        <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
          Today's Ritual
        </p>
        <div style={{
          background: t.card, borderRadius: 18,
          border: `1px solid ${t.border}`, padding: 16,
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{
              width: 50, height: 50, borderRadius: 15,
              background: t.primary + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, flexShrink: 0,
            }}>
              🌅
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: t.text, fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>
                Sunrise Breath Flow
              </h4>
              <p style={{ color: t.textSecondary, fontSize: 12, margin: '0 0 10px', lineHeight: 1.6 }}>
                5-min mindful breathing sequence inspired by Balinese morning traditions
              </p>
              <div style={{ display: 'flex', gap: 10, color: t.textMuted, fontSize: 11 }}>
                <span>⏱ 5 min</span>
                <span>·</span>
                <span>3 of 5 members done</span>
              </div>
            </div>
          </div>
          <button
            onMouseDown={() => setBtnPress(true)}
            onMouseUp={() => setBtnPress(false)}
            onMouseLeave={() => setBtnPress(false)}
            onClick={() => setTodayDone(!todayDone)}
            style={{
              marginTop: 14, width: '100%', padding: '13px',
              borderRadius: 13, border: 'none', cursor: 'pointer',
              background: todayDone
                ? t.primary + '20'
                : `linear-gradient(135deg, ${t.primary}, #2A9070)`,
              color: todayDone ? t.primary : '#fff',
              fontSize: 14, fontWeight: 700,
              transform: btnPress ? 'scale(0.97)' : 'scale(1)',
              transition: 'all 0.15s ease',
            }}
          >
            {todayDone ? '✓  Ritual Completed!' : '▶  Begin Ritual'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Day Streak', value: '9 🔥', sub: 'Personal best!' },
            { label: 'Group Score', value: '840', sub: '+120 this week' },
            { label: 'Rituals Done', value: '23', sub: 'This journey' },
            { label: 'Reflections', value: '11', sub: 'Shared this month' },
          ].map((s, i) => (
            <div key={i} style={{
              background: t.card, borderRadius: 16,
              border: `1px solid ${t.border}`, padding: '14px 16px',
            }}>
              <div style={{ color: t.text, fontSize: 21, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: t.textSecondary, fontSize: 12, marginTop: 2 }}>{s.label}</div>
              <div style={{ color: t.primary, fontSize: 11, marginTop: 5, fontWeight: 600 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Activity */}
      <div style={{ padding: '0 16px 16px' }}>
        <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
          Tribe Activity
        </p>
        {[
          { init: 'AT', name: 'Aiko', action: 'completed Stage 3 ritual', time: '2h ago', icon: '🎯' },
          { init: 'MC', name: 'Mia', action: 'shared a voice reflection', time: '4h ago', icon: '🎙️' },
          { init: 'LB', name: 'Lars', action: 'unlocked bonus meditation', time: '6h ago', icon: '✨' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0',
            borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 11,
              background: t.primary + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: t.primary, fontSize: 11, fontWeight: 800, flexShrink: 0,
            }}>
              {item.init}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: t.text, fontSize: 13, fontWeight: 700 }}>{item.name} </span>
              <span style={{ color: t.textSecondary, fontSize: 13 }}>{item.action}</span>
              <div style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>{item.time}</div>
            </div>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- JourneyScreen ---
function JourneyScreen({ theme }) {
  const t = themes[theme];
  const [selected, setSelected] = useState('bali');
  const dest = destinations.find(d => d.id === selected);

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <h2 style={{ color: t.text, fontSize: 22, fontWeight: 700, margin: 0, fontFamily: 'Sora, sans-serif' }}>
          Ritual Journeys
        </h2>
        <p style={{ color: t.textSecondary, fontSize: 13, margin: '4px 0 0' }}>
          Wellness traditions from around the world
        </p>
      </div>

      {/* Horizontal destination selector */}
      <div style={{ display: 'flex', gap: 10, padding: '0 16px 16px', overflowX: 'auto' }}>
        {destinations.map(d => (
          <div
            key={d.id}
            onClick={() => setSelected(d.id)}
            style={{
              flexShrink: 0, cursor: 'pointer',
              padding: '12px 14px', borderRadius: 16,
              background: selected === d.id
                ? `linear-gradient(135deg, ${d.colorA}, ${d.colorB})`
                : t.card,
              border: `1px solid ${selected === d.id ? 'transparent' : t.border}`,
              transition: 'all 0.2s',
              transform: selected === d.id ? 'scale(1.04)' : 'scale(1)',
              minWidth: 76,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 5 }}>{d.emoji}</div>
            <div style={{ color: selected === d.id ? '#fff' : t.text, fontSize: 12, fontWeight: 700 }}>{d.name}</div>
            <div style={{ color: selected === d.id ? 'rgba(255,255,255,0.75)' : t.textMuted, fontSize: 10, marginTop: 3 }}>
              {d.active ? `${d.members} in tribe` : 'Available'}
            </div>
          </div>
        ))}
      </div>

      {/* Destination detail */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          borderRadius: 22,
          background: `linear-gradient(135deg, ${dest.colorA}22, ${dest.colorB}44)`,
          border: `1px solid ${dest.colorA}55`,
          padding: 22, marginBottom: 16,
        }}>
          <div style={{ fontSize: 42, marginBottom: 10 }}>{dest.emoji}</div>
          <h3 style={{ color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 6px', fontFamily: 'Sora, sans-serif' }}>
            {dest.name} · {dest.ritual}
          </h3>
          <p style={{ color: t.textSecondary, fontSize: 13, margin: '0 0 16px', lineHeight: 1.6 }}>
            {dest.description}
          </p>
          {dest.active && (
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { val: dest.stages, label: 'Stages' },
                { val: dest.members, label: 'Members' },
                { val: `${dest.daysLeft}d`, label: 'Remaining' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ color: dest.colorA, fontSize: 20, fontWeight: 800 }}>{s.val}</div>
                  <div style={{ color: t.textSecondary, fontSize: 11, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {dest.active ? (
          <>
            <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }}>
              Ritual Stages
            </p>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 17, top: 8, bottom: 8, width: 2,
                background: t.border, zIndex: 0,
              }} />
              {ritualStages.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 12, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: s.done ? dest.colorA : s.current ? dest.colorA + '33' : t.card,
                    border: `2px solid ${s.done || s.current ? dest.colorA : t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.done ? '#fff' : s.current ? dest.colorA : t.textMuted,
                    fontSize: s.done ? 13 : 12, fontWeight: 800,
                  }}>
                    {s.done ? '✓' : s.stage}
                  </div>
                  <div style={{
                    flex: 1, background: t.card, borderRadius: 13,
                    border: `1px solid ${s.current ? dest.colorA + '66' : t.border}`,
                    padding: '10px 14px', opacity: !s.done && !s.current ? 0.55 : 1,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{s.name}</span>
                      {s.current && (
                        <span style={{
                          background: dest.colorA + '2A', color: dest.colorA,
                          fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700,
                        }}>NOW</span>
                      )}
                    </div>
                    <p style={{ color: t.textSecondary, fontSize: 12, margin: '4px 0 0', lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <button style={{
            width: '100%', padding: '15px',
            background: `linear-gradient(135deg, ${dest.colorA}, ${dest.colorB})`,
            border: 'none', borderRadius: 15,
            color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }}>
            Begin This Journey
          </button>
        )}
      </div>
    </div>
  );
}

// --- GroupScreen ---
function GroupScreen({ theme }) {
  const t = themes[theme];
  const completed = groupMemberData.filter(m => m.status === 'completed').length;

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <h2 style={{ color: t.text, fontSize: 22, fontWeight: 700, margin: 0, fontFamily: 'Sora, sans-serif' }}>
          Your Tribe
        </h2>
        <p style={{ color: t.textSecondary, fontSize: 13, margin: '4px 0 0' }}>
          Bali Sunrise · Stage 3
        </p>
      </div>

      {/* Group progress card */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: t.card, borderRadius: 22,
          border: `1px solid ${t.border}`, padding: 20,
        }}>
          <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px', textAlign: 'center' }}>
            Today's Group Progress
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 18 }}>
            {groupMemberData.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%',
                    background: m.status === 'completed' ? m.color + '25' : t.surfaceAlt,
                    border: `2.5px solid ${m.status === 'completed' ? m.color : m.status === 'in-progress' ? t.secondary : t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: m.status === 'completed' ? m.color : t.textSecondary,
                    fontSize: 11, fontWeight: 800,
                    transition: 'all 0.3s',
                  }}>
                    {m.initials}
                  </div>
                  {m.status === 'completed' && (
                    <div style={{
                      position: 'absolute', bottom: -2, right: -2,
                      width: 16, height: 16, borderRadius: '50%',
                      background: m.color, color: '#fff', fontSize: 9,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `2px solid ${t.card}`,
                    }}>✓</div>
                  )}
                  {m.status === 'in-progress' && (
                    <div style={{
                      position: 'absolute', bottom: -2, right: -2,
                      width: 16, height: 16, borderRadius: '50%',
                      background: t.secondary, fontSize: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `2px solid ${t.card}`,
                    }}>→</div>
                  )}
                </div>
                <span style={{ color: t.textSecondary, fontSize: 10 }}>{m.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: t.text, fontSize: 30, fontWeight: 800, fontFamily: 'Sora, sans-serif' }}>
              {completed}<span style={{ color: t.textSecondary, fontSize: 18 }}>/{groupMemberData.length}</span>
            </div>
            <div style={{ color: t.textSecondary, fontSize: 13, marginTop: 2 }}>members completed today</div>
            <div style={{
              marginTop: 12, padding: '9px 16px',
              background: t.primary + '18', borderRadius: 12,
              color: t.primary, fontSize: 12, fontWeight: 700,
            }}>
              ✨ One more completion unlocks Stage 4!
            </div>
          </div>
        </div>
      </div>

      {/* Members list */}
      <div style={{ padding: '0 16px 16px' }}>
        <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
          Members
        </p>
        {groupMemberData.map((m, i) => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
            borderBottom: i < groupMemberData.length - 1 ? `1px solid ${t.border}` : 'none',
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: 15,
              background: m.color + '22',
              border: `2px solid ${m.status === 'completed' ? m.color : m.status === 'in-progress' ? t.secondary : t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: m.color, fontSize: 12, fontWeight: 800, flexShrink: 0,
            }}>
              {m.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 10,
                  background: m.status === 'completed'
                    ? m.color + '20'
                    : m.status === 'in-progress'
                      ? t.secondary + '20'
                      : t.surfaceAlt,
                  color: m.status === 'completed'
                    ? m.color
                    : m.status === 'in-progress'
                      ? t.secondary
                      : t.textMuted,
                }}>
                  {m.status === 'completed' ? '✓ Done' : m.status === 'in-progress' ? '→ Active' : '○ Pending'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 5 }}>
                <span style={{ color: t.textSecondary, fontSize: 12 }}>🔥 {m.streak}-day streak</span>
                <span style={{ color: t.textMuted, fontSize: 12 }}>{m.timezone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite */}
      <div style={{ padding: '0 16px 16px' }}>
        <button style={{
          width: '100%', padding: '14px',
          background: 'transparent',
          border: `2px dashed ${t.primary}55`,
          borderRadius: 15, color: t.primary,
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          + Invite to Your Tribe
        </button>
      </div>
    </div>
  );
}

// --- ReflectionsScreen ---
function ReflectionsScreen({ theme }) {
  const t = themes[theme];
  const [playing, setPlaying] = useState(null);
  const [liked, setLiked] = useState({});
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => setRecSeconds(s => s + 1), 1000);
    } else {
      setRecSeconds(0);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const fmtTime = s => `0:${String(s).padStart(2, '0')}`;

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <h2 style={{ color: t.text, fontSize: 22, fontWeight: 700, margin: 0, fontFamily: 'Sora, sans-serif' }}>
          Reflections
        </h2>
        <p style={{ color: t.textSecondary, fontSize: 13, margin: '4px 0 0' }}>
          Soothing voice notes from your tribe
        </p>
      </div>

      {/* Record CTA */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: recording ? 'rgba(255,107,107,0.08)' : t.primaryGlow,
          border: `1px solid ${recording ? '#FF6B6B55' : t.primary + '44'}`,
          borderRadius: 18, padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 16,
          transition: 'all 0.3s',
        }}>
          <div
            onClick={() => setRecording(!recording)}
            style={{
              width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
              background: recording
                ? 'linear-gradient(135deg, #FF6B6B, #E63946)'
                : `linear-gradient(135deg, ${t.primary}, #2A9070)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 24,
              boxShadow: recording ? '0 0 22px rgba(255,107,107,0.5)' : `0 0 18px ${t.primary}40`,
              transition: 'all 0.25s',
            }}
          >
            {recording ? '⏹' : '🎙️'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>
              {recording ? `Recording... ${fmtTime(recSeconds)}` : 'Share a Reflection'}
            </div>
            <div style={{ color: t.textSecondary, fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>
              {recording ? 'Tap to stop and share with your tribe' : 'How did your ritual feel today?'}
            </div>
            {recording && (
              <div style={{ display: 'flex', gap: 2, marginTop: 8, alignItems: 'center', height: 18 }}>
                {[4,7,5,9,6,8,4,10,5,7,3,9,6,4,8].map((h, i) => (
                  <div key={i} style={{
                    width: 3, borderRadius: 2, background: '#FF6B6B',
                    height: `${(h / 10) * 18}px`,
                    opacity: 0.7 + (i % 3) * 0.1,
                  }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reflection cards */}
      <div style={{ padding: '0 16px' }}>
        <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }}>
          Recent Reflections
        </p>
        {reflectionData.map(r => (
          <div key={r.id} style={{
            background: t.card, borderRadius: 18,
            border: `1px solid ${t.border}`, padding: 16, marginBottom: 12,
          }}>
            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 13,
                background: r.color + '25',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: r.color, fontSize: 12, fontWeight: 800,
              }}>
                {r.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{r.user}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>{r.ritual} · {r.time}</div>
              </div>
              <div style={{
                background: r.color + '20', borderRadius: 8,
                padding: '4px 10px', color: r.color, fontSize: 11, fontWeight: 700,
              }}>
                {r.duration}
              </div>
            </div>

            {/* Waveform player */}
            <div
              onClick={() => setPlaying(playing === r.id ? null : r.id)}
              style={{
                background: t.surfaceAlt, borderRadius: 12,
                padding: '10px 14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                border: `1px solid ${playing === r.id ? r.color + '66' : 'transparent'}`,
                transition: 'border 0.2s',
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: playing === r.id ? r.color : r.color + '30',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: playing === r.id ? '#fff' : r.color, fontSize: 13,
                transition: 'all 0.2s',
              }}>
                {playing === r.id ? '⏸' : '▶'}
              </div>
              <Waveform bars={r.bars} isPlaying={playing === r.id} color={r.color} />
              <span style={{ color: t.textMuted, fontSize: 11, marginLeft: 4, flexShrink: 0 }}>{r.duration}</span>
            </div>

            {/* Caption */}
            <p style={{
              color: t.textSecondary, fontSize: 13, lineHeight: 1.65,
              margin: '10px 0', fontStyle: 'italic',
            }}>
              "{r.caption}"
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 18 }}>
              <button
                onClick={() => setLiked(prev => ({ ...prev, [r.id]: !prev[r.id] }))}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: liked[r.id] ? '#FF6B8A' : t.textMuted,
                  fontSize: 13, display: 'flex', alignItems: 'center', gap: 5, padding: 0,
                  fontFamily: 'Sora, sans-serif',
                  transition: 'color 0.2s',
                }}
              >
                {liked[r.id] ? '♥' : '♡'} {r.likes + (liked[r.id] ? 1 : 0)}
              </button>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: t.textMuted, fontSize: 13,
                display: 'flex', alignItems: 'center', gap: 5, padding: 0,
                fontFamily: 'Sora, sans-serif',
              }}>
                💬 Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ProfileScreen ---
function ProfileScreen({ theme, setTheme }) {
  const t = themes[theme];
  const isDark = theme === 'dark';
  const [notifs, setNotifs] = useState(true);
  const [adaptiveTz, setAdaptiveTz] = useState(true);
  const [gentleMode, setGentleMode] = useState(false);

  const toggleProps = { primaryColor: t.primary, surfaceAlt: t.surfaceAlt, borderColor: t.border };

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 80 }}>
      {/* Profile header */}
      <div style={{
        padding: '20px 20px 24px', textAlign: 'center',
        background: `linear-gradient(180deg, ${t.primary}18, transparent)`,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 24,
          background: `linear-gradient(135deg, ${t.primary}, #2A9070)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, margin: '0 auto 12px',
          boxShadow: `0 6px 24px ${t.primary}44`,
        }}>
          🧘
        </div>
        <h2 style={{ color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 4px', fontFamily: 'Sora, sans-serif' }}>
          Alex Journey
        </h2>
        <p style={{ color: t.textSecondary, fontSize: 13, margin: 0 }}>
          Ritual Explorer · Level 4
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 18 }}>
          {[
            { val: 23, label: 'Rituals' },
            { val: '9🔥', label: 'Streak' },
            { val: 2, label: 'Journeys' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ color: t.text, fontSize: 19, fontWeight: 800 }}>{s.val}</div>
              <div style={{ color: t.textSecondary, fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* Appearance */}
        <div style={{ marginBottom: 22 }}>
          <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
            Appearance
          </p>
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.border}` }}>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>{isDark ? '🌙' : '☀️'}</span>
                <span style={{ color: t.text, fontSize: 14 }}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <Toggle value={isDark} onToggle={() => setTheme(isDark ? 'light' : 'dark')} {...toggleProps} />
            </div>
          </div>
        </div>

        {/* Ritual Settings */}
        <div style={{ marginBottom: 22 }}>
          <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
            Ritual Settings
          </p>
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            {[
              { icon: '🔔', label: 'Ritual Reminders', value: notifs, toggle: () => setNotifs(!notifs) },
              { icon: '🌍', label: 'Adaptive Time Zones', value: adaptiveTz, toggle: () => setAdaptiveTz(!adaptiveTz) },
              { icon: '🌿', label: 'Gentle Mode', value: gentleMode, toggle: () => setGentleMode(!gentleMode) },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ color: t.text, fontSize: 14 }}>{item.label}</span>
                </div>
                <Toggle value={item.value} onToggle={item.toggle} {...toggleProps} />
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div style={{ marginBottom: 22 }}>
          <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
            Account
          </p>
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            {[
              { icon: '✈️', label: 'Travel Preferences' },
              { icon: '🤝', label: 'Connected Tribes' },
              { icon: '📊', label: 'Wellness Stats' },
              { icon: '❓', label: 'Help & Support' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i < 3 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ color: t.text, fontSize: 14 }}>{item.label}</span>
                </div>
                <span style={{ color: t.textMuted, fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
            Achievements
          </p>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {[
              { emoji: '🌅', label: 'First Sunrise', earned: true },
              { emoji: '🔥', label: '7-Day Streak', earned: true },
              { emoji: '🎙️', label: 'Voice Sharer', earned: true },
              { emoji: '🗺️', label: 'Globe Trotter', earned: false },
              { emoji: '🏆', label: 'Quest Master', earned: false },
            ].map((a, i) => (
              <div key={i} style={{
                flexShrink: 0, textAlign: 'center', width: 72,
                padding: '12px 8px', borderRadius: 15,
                background: a.earned ? t.primary + '18' : t.surfaceAlt,
                border: `1px solid ${a.earned ? t.primary + '44' : t.border}`,
                opacity: a.earned ? 1 : 0.45,
              }}>
                <div style={{ fontSize: 26 }}>{a.emoji}</div>
                <div style={{ color: a.earned ? t.text : t.textMuted, fontSize: 10, marginTop: 7, lineHeight: 1.3 }}>
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const t = themes[theme];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'journey', label: 'Journey', icon: window.lucide.Map },
    { id: 'group', label: 'Tribe', icon: window.lucide.Users },
    { id: 'reflections', label: 'Echoes', icon: window.lucide.Mic },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    journey: JourneyScreen,
    group: GroupScreen,
    reflections: ReflectionsScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark' ? '#111820' : '#C8D8C8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Sora', sans-serif",
      transition: 'background 0.4s',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        body { margin: 0; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 52,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.65), 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.4s',
      }}>

        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12,
          left: '50%', transform: 'translateX(-50%)',
          width: 122, height: 34,
          background: '#000', borderRadius: 22,
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
        }} />

        {/* Status bar */}
        <div style={{
          height: 54, display: 'flex', alignItems: 'flex-end',
          padding: '0 26px 8px',
          justifyContent: 'space-between', flexShrink: 0,
        }}>
          <span style={{ color: t.text, fontSize: 13, fontWeight: 700 }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ color: t.text, fontSize: 10, letterSpacing: 1 }}>●●●●</span>
            <span style={{ color: t.text, fontSize: 10 }}>WiFi</span>
            <div style={{
              width: 22, height: 12, borderRadius: 3,
              border: `1.5px solid ${t.textSecondary}`,
              padding: 2, display: 'flex', alignItems: 'center',
            }}>
              <div style={{ width: '70%', height: '100%', background: t.text, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ActiveScreen theme={theme} setTheme={setTheme} />
        </div>

        {/* Bottom nav */}
        <div style={{
          height: 80, background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'stretch',
          paddingBottom: 14, flexShrink: 0,
          transition: 'background 0.4s',
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 3, cursor: 'pointer', padding: '8px 4px',
                  color: isActive ? t.primary : t.textMuted,
                  transition: 'color 0.2s, transform 0.15s',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute', top: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20, height: 2, borderRadius: 2,
                    background: t.primary,
                  }} />
                )}
                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400 }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
