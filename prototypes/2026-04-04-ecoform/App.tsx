const { useState, useEffect, useRef } = React;

// ===================== THEMES =====================
const themes = {
  dark: {
    bg: '#1C1208', bg2: '#241A0A', card: '#2E2010', surface: '#382815',
    border: '#503A22', text: '#F5EFE6', text2: '#C4A882', text3: '#7A6048',
    pr: '#C4704A', se: '#5C8A6E', ac: '#D4A843',
    earth: '#9B7040', water: '#4A8FD4', air: '#7AB8C8', fire: '#E05A2A',
    earthBg: 'rgba(155,112,64,0.18)', waterBg: 'rgba(74,143,212,0.18)',
    airBg: 'rgba(122,184,200,0.18)', fireBg: 'rgba(224,90,42,0.18)',
    guardianBg: 'linear-gradient(145deg,#2E2010 0%,#3A2815 60%,#2A1C0E 100%)',
  },
  light: {
    bg: '#F5EEE0', bg2: '#EDE5D2', card: '#FDFAF3', surface: '#F0E8D5',
    border: '#D4C0A0', text: '#2A1808', text2: '#6A4828', text3: '#9A7858',
    pr: '#B85A35', se: '#4A7860', ac: '#C09030',
    earth: '#7A5830', water: '#3070B8', air: '#4A90A8', fire: '#C84820',
    earthBg: 'rgba(122,88,48,0.12)', waterBg: 'rgba(48,112,184,0.12)',
    airBg: 'rgba(74,144,168,0.12)', fireBg: 'rgba(200,72,32,0.12)',
    guardianBg: 'linear-gradient(145deg,#E8DCC8 0%,#F0E4CE 60%,#E0D4BC 100%)',
  }
};

// ===================== GUARDIAN SVG =====================
function GuardianSVG({ c, size = 148 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="auraGrad" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor={c.pr} stopOpacity="0.2" />
          <stop offset="100%" stopColor={c.pr} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Aura glow */}
      <ellipse cx="80" cy="95" rx="68" ry="58" fill="url(#auraGrad)" />

      {/* Earth leaf particle — bottom left */}
      <g transform="rotate(-25 26 108)">
        <ellipse cx="26" cy="108" rx="7" ry="11" fill={c.earth} opacity="0.9" />
        <line x1="26" y1="97" x2="26" y2="119" stroke="#6B4A20" strokeWidth="1.5" opacity="0.6" />
      </g>
      {/* Water droplet — right */}
      <path d="M143,86 Q150,101 143,115 Q136,101 143,86Z" fill={c.water} opacity="0.85" />
      {/* Air orbs — top right */}
      <circle cx="140" cy="42" r="7" fill={c.air} opacity="0.75" />
      <circle cx="149" cy="52" r="4.5" fill={c.air} opacity="0.5" />
      <circle cx="132" cy="50" r="3" fill={c.air} opacity="0.4" />
      {/* Fire spark — top left */}
      <path d="M22,50 Q17,40 24,33 Q31,40 27,47 Q32,35 36,30 Q38,42 31,50 Q27,54 22,50Z" fill={c.fire} opacity="0.9" />

      {/* Tail (behind body) */}
      <path d="M97,108 Q135,82 130,118 Q122,145 104,124" fill="#A85030" />
      <path d="M106,122 Q122,143 102,125" fill="#E8B890" opacity="0.6" />

      {/* Body */}
      <ellipse cx="80" cy="102" rx="32" ry="26" fill="#C4704A" />
      <ellipse cx="80" cy="108" rx="18" ry="14" fill="#EBBF9A" />

      {/* Head */}
      <circle cx="80" cy="68" r="27" fill="#C4704A" />

      {/* Left ear */}
      <polygon points="57,53 48,19 73,45" fill="#C4704A" />
      <polygon points="60,51 53,26 71,45" fill="#E07A5A" />
      {/* Right ear */}
      <polygon points="103,53 112,19 87,45" fill="#C4704A" />
      <polygon points="100,51 107,26 89,45" fill="#E07A5A" />

      {/* Cheek blush */}
      <ellipse cx="62" cy="72" rx="9" ry="5" fill="#A85030" opacity="0.25" />
      <ellipse cx="98" cy="72" rx="9" ry="5" fill="#A85030" opacity="0.25" />

      {/* Eyes */}
      <circle cx="70" cy="64" r="9.5" fill="#1A1208" />
      <circle cx="90" cy="64" r="9.5" fill="#1A1208" />
      <circle cx="70" cy="64" r="6.5" fill="#243020" />
      <circle cx="90" cy="64" r="6.5" fill="#243020" />
      <circle cx="67" cy="61" r="3.5" fill="white" />
      <circle cx="87" cy="61" r="3.5" fill="white" />
      <circle cx="68.5" cy="62.5" r="1.5" fill="rgba(255,255,255,0.85)" />
      <circle cx="88.5" cy="62.5" r="1.5" fill="rgba(255,255,255,0.85)" />

      {/* Nose */}
      <ellipse cx="80" cy="71" rx="4" ry="3" fill="#1A1208" />
      {/* Smile */}
      <path d="M76,75 Q80,80 84,75" stroke="#1A1208" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Forehead rune */}
      <circle cx="80" cy="44" r="3.5" fill="rgba(255,220,160,0.45)" />
      <path d="M76,47 Q80,41 84,47" stroke="rgba(255,220,160,0.45)" strokeWidth="1.5" fill="none" />

      {/* Elemental belly dots */}
      <circle cx="72" cy="100" r="3.5" fill={c.earth} opacity="0.75" />
      <circle cx="80" cy="96" r="3.5" fill={c.water} opacity="0.75" />
      <circle cx="88" cy="100" r="3.5" fill={c.air} opacity="0.75" />
      <circle cx="80" cy="107" r="3.5" fill={c.fire} opacity="0.75" />

      {/* Paws */}
      <ellipse cx="57" cy="126" rx="11" ry="7" fill="#B85A35" />
      <ellipse cx="103" cy="126" rx="11" ry="7" fill="#B85A35" />
    </svg>
  );
}

// ===================== WAVE DIVIDER =====================
function WaveDivider({ fill, bg, flip = false }) {
  const path = flip
    ? "M0,0 C80,40 280,0 375,30 L375,0 Z"
    : "M0,48 C100,10 280,42 375,18 L375,48 Z";
  return (
    <svg viewBox="0 0 375 48" style={{ display: 'block', width: '100%', background: bg }} height={48} preserveAspectRatio="none">
      <path d={path} fill={fill} />
    </svg>
  );
}

// ===================== ELEMENTAL BAR =====================
function ElementalBar({ c, label, value, color, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 14, width: 20 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: c.text2, fontFamily: 'Nunito, sans-serif' }}>{label}</span>
          <span style={{ fontSize: 11, fontWeight: 800, color, fontFamily: 'Nunito, sans-serif' }}>{value}%</span>
        </div>
        <div style={{ height: 6, background: c.surface, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 4, transition: 'width 0.8s ease' }} />
        </div>
      </div>
    </div>
  );
}

// ===================== HOME SCREEN =====================
function HomeScreen({ c }) {
  const [pressed, setPressed] = useState(null);
  const energies = { earth: 72, water: 58, air: 85, fire: 41 };
  const elementalBars = [
    { key: 'earth', label: 'Earth', icon: '🌿', value: energies.earth, color: c.earth },
    { key: 'water', label: 'Water', icon: '💧', value: energies.water, color: c.water },
    { key: 'air', label: 'Air', icon: '🌬️', value: energies.air, color: c.air },
    { key: 'fire', label: 'Fire', icon: '🔥', value: energies.fire, color: c.fire },
  ];
  const quickActions = [
    { id: 'walk', label: 'Walk', icon: '🚶', el: 'Earth', color: c.earth, bg: c.earthBg },
    { id: 'swim', label: 'Swim', icon: '🏊', el: 'Water', color: c.water, bg: c.waterBg },
    { id: 'meditate', label: 'Meditate', icon: '🧘', el: 'Air', color: c.air, bg: c.airBg },
    { id: 'run', label: 'Run', icon: '🏃', el: 'Fire', color: c.fire, bg: c.fireBg },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: c.bg, fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: c.text3, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SATURDAY · APR 4</p>
            <h1 style={{ color: c.text, fontSize: 22, fontWeight: 900, margin: '2px 0 1px', lineHeight: 1.2 }}>
              Good morning, Alex ✨
            </h1>
            <p style={{ color: c.text2, fontSize: 13, fontWeight: 500 }}>Your Guardian stirs with new energy</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 38, height: 38, borderRadius: 13, background: c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${c.border}` }}>
              {React.createElement(window.lucide.Bell, { size: 18, color: c.text2 })}
            </div>
            <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: c.pr, border: `2px solid ${c.bg}` }} />
          </div>
        </div>
      </div>

      {/* Guardian Card */}
      <div style={{ margin: '14px 20px 0', borderRadius: 28, background: c.guardianBg, padding: '20px 20px 16px', border: `1px solid ${c.border}`, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle texture lines */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '0 28px 0 120px', background: `rgba(196,112,74,0.06)`, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4AE080', boxShadow: '0 0 6px #4AE080' }} />
              <span style={{ color: c.text3, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>LEVEL 12 · FOREST SPIRIT</span>
            </div>
            <h2 style={{ color: c.text, fontSize: 19, fontWeight: 900, margin: 0 }}>Fenra</h2>
            <p style={{ color: c.text2, fontSize: 12, fontWeight: 500, marginTop: 2 }}>2,840 / 3,200 XP to evolve</p>
            <div style={{ height: 5, width: 120, background: c.surface, borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '88%', background: `linear-gradient(90deg,${c.pr},${c.ac})`, borderRadius: 3 }} />
            </div>
          </div>
          <GuardianSVG c={c} size={130} />
        </div>

        {/* Elemental energy bars */}
        <div style={{ marginTop: 4 }}>
          {elementalBars.map(bar => (
            <ElementalBar key={bar.key} c={c} {...bar} />
          ))}
        </div>

        {/* Coach prompt */}
        <div style={{ marginTop: 12, padding: '10px 14px', background: c.fireBg, borderRadius: 14, border: `1px solid ${c.fire}30`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔥</span>
          <div>
            <p style={{ color: c.fire, fontSize: 12, fontWeight: 800, margin: 0 }}>Fire is low!</p>
            <p style={{ color: c.text2, fontSize: 11, margin: '1px 0 0' }}>Log a vigorous workout to balance Fenra's energy</p>
          </div>
        </div>
      </div>

      {/* Wave divider into today section */}
      <WaveDivider fill={c.bg2} bg={c.bg} />

      {/* Today's Journey */}
      <div style={{ background: c.bg2, padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ color: c.text, fontSize: 16, fontWeight: 800, margin: 0 }}>Today's Journey</h3>
          <span style={{ color: c.pr, fontSize: 12, fontWeight: 700 }}>3 / 5 goals</span>
        </div>
        {[
          { icon: '🚶', name: '35 min Walk', time: '7:12 AM', xp: '+180 XP', color: c.earth, done: true },
          { icon: '🧘', name: '20 min Meditation', time: '8:45 AM', xp: '+120 XP', color: c.air, done: true },
          { icon: '🚴', name: '45 min Cycling', time: '11:00 AM', xp: '+240 XP', color: c.water, done: false },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${c.border}30` : 'none' }}>
            <div style={{ width: 38, height: 38, borderRadius: 14, background: c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, opacity: a.done ? 1 : 0.5 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: a.done ? c.text : c.text3, fontWeight: 700, fontSize: 13, margin: 0 }}>{a.name}</p>
              <p style={{ color: c.text3, fontSize: 11, margin: '2px 0 0' }}>{a.time}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: a.done ? c.ac : c.text3, fontSize: 12, fontWeight: 800 }}>{a.xp}</span>
              {a.done && React.createElement(window.lucide.CheckCircle2, { size: 16, color: c.se })}
            </div>
          </div>
        ))}
      </div>

      {/* Wave divider into quick actions */}
      <WaveDivider fill={c.bg} bg={c.bg2} flip />

      {/* Quick Log */}
      <div style={{ padding: '0 20px 20px' }}>
        <h3 style={{ color: c.text, fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Quick Log</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {quickActions.map(a => (
            <div key={a.id}
              onPointerDown={() => setPressed(a.id)}
              onPointerUp={() => setPressed(null)}
              style={{ padding: '14px 16px', background: pressed === a.id ? a.bg : c.card, borderRadius: 18, border: `1px solid ${a.color}30`, cursor: 'pointer', transition: 'transform 0.1s', transform: pressed === a.id ? 'scale(0.96)' : 'scale(1)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <div>
                <p style={{ color: c.text, fontSize: 13, fontWeight: 800, margin: 0 }}>{a.label}</p>
                <p style={{ color: a.color, fontSize: 11, fontWeight: 600, margin: '2px 0 0' }}>{a.el} energy</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== HAVEN SCREEN =====================
function HavenScreen({ c }) {
  const [selectedFlora, setSelectedFlora] = useState(null);
  const flora = [
    { id: 1, name: 'Ember Blossom', emoji: '🌺', el: 'fire', unlocked: true, rarity: 'Rare' },
    { id: 2, name: 'Mosstone', emoji: '🪨', el: 'earth', unlocked: true, rarity: 'Common' },
    { id: 3, name: 'Dew Fern', emoji: '🌿', el: 'water', unlocked: true, rarity: 'Common' },
    { id: 4, name: 'Whisper Reed', emoji: '🎋', el: 'air', unlocked: true, rarity: 'Uncommon' },
    { id: 5, name: 'Starbloom', emoji: '✨', el: 'air', unlocked: true, rarity: 'Legendary' },
    { id: 6, name: 'Mudroot', emoji: '🍄', el: 'earth', unlocked: true, rarity: 'Common' },
    { id: 7, name: 'Crystal Vine', emoji: '💎', el: 'water', unlocked: false, rarity: 'Rare' },
    { id: 8, name: 'Sunfire Grass', emoji: '🌾', el: 'fire', unlocked: false, rarity: 'Uncommon' },
    { id: 9, name: 'Moon Lily', emoji: '🌸', el: 'air', unlocked: false, rarity: 'Epic' },
  ];
  const elColors = { earth: c.earth, water: c.water, air: c.air, fire: c.fire };
  const rarityColors = { Common: c.text3, Uncommon: c.se, Rare: c.water, Epic: '#A855F7', Legendary: c.ac };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: c.bg, fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px 0' }}>
        <h1 style={{ color: c.text, fontSize: 22, fontWeight: 900, margin: 0 }}>Bio-Haven</h1>
        <p style={{ color: c.text2, fontSize: 13, fontWeight: 500, marginTop: 2 }}>Fenra's living sanctuary</p>
      </div>

      {/* Haven Panorama */}
      <div style={{ margin: '14px 20px 0', borderRadius: 28, background: `linear-gradient(145deg,#1A2E14,#0E2820,#1C1C0A)`, padding: 20, border: `1px solid ${c.se}30`, position: 'relative', overflow: 'hidden', minHeight: 170 }}>
        {/* Sky gradient */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 70, background: 'linear-gradient(180deg,rgba(26,60,80,0.8) 0%,transparent 100%)' }} />
        {/* Ground */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, background: 'linear-gradient(0deg,rgba(40,30,10,0.6) 0%,transparent 100%)' }} />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 130, position: 'relative', gap: 8 }}>
          {/* Treeline emojis */}
          {['🌲','🌿','🌳','🌲','🌿','🍃','🌳'].map((e, i) => (
            <span key={i} style={{ fontSize: i % 2 === 0 ? 28 : 22, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>{e}</span>
          ))}
          {/* Guardian in haven */}
          <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
            <GuardianSVG c={c} size={80} />
          </div>
        </div>

        {/* Haven stats */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8 }}>
          {[
            { label: 'Flora', value: '6/18', icon: '🌿' },
            { label: 'Fauna', value: '2/8', icon: '🦋' },
            { label: 'Elements', value: '4/4', icon: '✨' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 16 }}>{s.icon}</p>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 800, fontSize: 14, margin: '2px 0 0', fontFamily: 'Nunito, sans-serif' }}>{s.value}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 10, margin: '1px 0 0', fontFamily: 'Nunito, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <WaveDivider fill={c.bg2} bg={c.bg} />

      {/* Evolution Stage */}
      <div style={{ background: c.bg2, padding: '0 20px 16px' }}>
        <h3 style={{ color: c.text, fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Evolution Path</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { stage: 'Seedling', emoji: '🌱', done: true },
            { stage: 'Sprout', emoji: '🌿', done: true },
            { stage: 'Forest Spirit', emoji: '🦊', done: true, current: true },
            { stage: 'Elder Grove', emoji: '🌳', done: false },
            { stage: 'Ancient Warden', emoji: '🌌', done: false },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.current ? c.pr : s.done ? c.se : c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, border: s.current ? `2px solid ${c.ac}` : 'none', boxShadow: s.current ? `0 0 12px ${c.pr}60` : 'none' }}>
                  {s.emoji}
                </div>
                <span style={{ color: s.current ? c.ac : s.done ? c.se : c.text3, fontSize: 8, fontWeight: 700, textAlign: 'center', lineHeight: 1.1 }}>{s.stage}</span>
              </div>
              {i < 4 && <div style={{ width: 12, height: 2, background: s.done ? c.se : c.border, marginBottom: 14, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider back to bg */}
      <WaveDivider fill={c.bg} bg={c.bg2} flip />

      {/* Flora Collection */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ color: c.text, fontSize: 16, fontWeight: 800, margin: 0 }}>Flora Collection</h3>
          <span style={{ color: c.text3, fontSize: 12, fontWeight: 600 }}>6 discovered</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {flora.map(f => (
            <div key={f.id}
              onClick={() => setSelectedFlora(selectedFlora?.id === f.id ? null : f)}
              style={{ borderRadius: 18, background: f.unlocked ? c.card : c.surface, border: `1px solid ${f.unlocked ? elColors[f.el] + '40' : c.border}`, padding: '12px 10px', textAlign: 'center', cursor: 'pointer', opacity: f.unlocked ? 1 : 0.5, transition: 'transform 0.1s', transform: selectedFlora?.id === f.id ? 'scale(0.95)' : 'scale(1)' }}>
              <div style={{ fontSize: 26, marginBottom: 4, filter: f.unlocked ? 'none' : 'grayscale(100%)' }}>{f.unlocked ? f.emoji : '🔒'}</div>
              <p style={{ color: f.unlocked ? c.text : c.text3, fontSize: 10, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{f.unlocked ? f.name : '???'}</p>
              {f.unlocked && <p style={{ color: rarityColors[f.rarity], fontSize: 9, fontWeight: 800, margin: '2px 0 0' }}>{f.rarity}</p>}
            </div>
          ))}
        </div>
        {selectedFlora && (
          <div style={{ marginTop: 12, padding: '14px 16px', background: c.card, borderRadius: 18, border: `1px solid ${elColors[selectedFlora.el]}50` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 32 }}>{selectedFlora.emoji}</span>
              <div>
                <p style={{ color: c.text, fontWeight: 800, fontSize: 15, margin: 0 }}>{selectedFlora.name}</p>
                <p style={{ color: rarityColors[selectedFlora.rarity], fontWeight: 700, fontSize: 11, margin: '2px 0' }}>{selectedFlora.rarity} · {selectedFlora.el.charAt(0).toUpperCase() + selectedFlora.el.slice(1)} elemental</p>
                <p style={{ color: c.text2, fontSize: 11, margin: 0 }}>Discovered during your morning walks. Thrives on Earth energy.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== ACTIVITIES SCREEN =====================
function ActivitiesScreen({ c }) {
  const [logging, setLogging] = useState(false);
  const [logDone, setLogDone] = useState(false);
  const [selected, setSelected] = useState(null);

  const categories = [
    { id: 'walk', label: 'Walk / Hike', icon: '🚶', element: 'Earth', color: c.earth, bg: c.earthBg, desc: '+15 XP/min' },
    { id: 'swim', label: 'Swim / Paddle', icon: '🏊', element: 'Water', color: c.water, bg: c.waterBg, desc: '+18 XP/min' },
    { id: 'meditate', label: 'Meditate / Breathe', icon: '🧘', element: 'Air', color: c.air, bg: c.airBg, desc: '+10 XP/min' },
    { id: 'run', label: 'Run / HIIT', icon: '🏃', element: 'Fire', color: c.fire, bg: c.fireBg, desc: '+22 XP/min' },
    { id: 'cycle', label: 'Cycle / Skate', icon: '🚴', element: 'Earth', color: c.earth, bg: c.earthBg, desc: '+14 XP/min' },
    { id: 'yoga', label: 'Yoga / Stretch', icon: '🤸', element: 'Air', color: c.air, bg: c.airBg, desc: '+12 XP/min' },
  ];

  const history = [
    { icon: '🚶', name: '35 min Walk', when: 'Today 7:12 AM', xp: 525, el: 'Earth', color: c.earth },
    { icon: '🧘', name: '20 min Meditation', when: 'Today 8:45 AM', xp: 200, el: 'Air', color: c.air },
    { icon: '🏃', name: '25 min Run', when: 'Yesterday 6:30 PM', xp: 550, el: 'Fire', color: c.fire },
    { icon: '🚴', name: '60 min Cycling', when: 'Yesterday 12:00 PM', xp: 840, el: 'Earth', color: c.earth },
  ];

  const handleLog = () => {
    if (!selected) return;
    setLogging(true);
    setTimeout(() => { setLogging(false); setLogDone(true); setSelected(null); setTimeout(() => setLogDone(false), 2000); }, 1200);
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: c.bg, fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ padding: '12px 20px 0' }}>
        <h1 style={{ color: c.text, fontSize: 22, fontWeight: 900, margin: 0 }}>Move & Restore</h1>
        <p style={{ color: c.text2, fontSize: 13, margin: '2px 0 0' }}>Every step feeds your Guardian</p>
      </div>

      {/* Weekly streak */}
      <div style={{ margin: '14px 20px 0', padding: '14px 18px', background: c.card, borderRadius: 22, border: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ color: c.text3, fontSize: 11, fontWeight: 700, margin: 0, letterSpacing: 0.5 }}>CURRENT STREAK</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
            <span style={{ color: c.ac, fontSize: 28, fontWeight: 900 }}>12</span>
            <span style={{ color: c.text2, fontSize: 14, fontWeight: 600 }}>days</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 26, height: 26, borderRadius: 9, background: i < 6 ? c.pr : c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, border: i === 5 ? `2px solid ${c.ac}` : 'none' }}>
                {i < 6 ? '✓' : ''}
              </div>
              <span style={{ color: c.text3, fontSize: 8, fontWeight: 700 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity categories */}
      <div style={{ padding: '16px 20px 0' }}>
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 800, marginBottom: 10 }}>Choose Activity</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {categories.map(cat => (
            <div key={cat.id}
              onClick={() => setSelected(selected === cat.id ? null : cat.id)}
              style={{ padding: '14px', background: selected === cat.id ? cat.bg : c.card, borderRadius: 18, border: `1.5px solid ${selected === cat.id ? cat.color : c.border}`, cursor: 'pointer', transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                {selected === cat.id && React.createElement(window.lucide.CheckCircle2, { size: 16, color: cat.color })}
              </div>
              <p style={{ color: c.text, fontSize: 12, fontWeight: 800, margin: 0 }}>{cat.label}</p>
              <p style={{ color: cat.color, fontSize: 11, fontWeight: 600, margin: '2px 0 0' }}>{cat.element} · {cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Log button */}
      <div style={{ padding: '14px 20px' }}>
        <div
          onClick={handleLog}
          style={{ width: '100%', padding: '16px', borderRadius: 20, background: logDone ? c.se : selected ? c.pr : c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: selected ? 'pointer' : 'default', opacity: selected && !logging ? 1 : 0.7, transition: 'all 0.3s' }}>
          {logging
            ? React.createElement(window.lucide.Loader2, { size: 20, color: 'white', style: { animation: 'spin 1s linear infinite' } })
            : logDone
              ? React.createElement(window.lucide.CheckCircle2, { size: 20, color: 'white' })
              : React.createElement(window.lucide.Plus, { size: 20, color: selected ? 'white' : c.text3 })
          }
          <span style={{ color: selected ? 'white' : c.text3, fontWeight: 800, fontSize: 15, fontFamily: 'Nunito, sans-serif' }}>
            {logging ? 'Logging...' : logDone ? 'Activity Logged! +XP' : 'Log Activity'}
          </span>
        </div>
      </div>

      {/* Recent history */}
      <div style={{ padding: '0 20px 20px' }}>
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 800, marginBottom: 10 }}>Recent History</h3>
        {history.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: c.card, borderRadius: 16, marginBottom: 8, border: `1px solid ${c.border}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 14, background: h.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{h.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: c.text, fontWeight: 700, fontSize: 13, margin: 0 }}>{h.name}</p>
              <p style={{ color: c.text3, fontSize: 11, margin: '2px 0 0' }}>{h.when}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: c.ac, fontWeight: 800, fontSize: 13, margin: 0 }}>+{h.xp}</p>
              <p style={{ color: h.color, fontSize: 10, fontWeight: 700, margin: '2px 0 0' }}>{h.el}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== DISCOVER SCREEN =====================
function DiscoverScreen({ c }) {
  const [pledgeHovered, setPledgeHovered] = useState(false);

  const events = [
    { id: 1, title: 'Rare: Moonstone Fern', desc: 'Walk 2km before sunset to unlock this legendary flora', icon: '🌙', badge: 'ACTIVE', color: c.ac, timeLeft: '4h 22m' },
    { id: 2, title: 'Fire Surge Event', desc: '2x Fire XP on all vigorous workouts this weekend!', icon: '🔥', badge: 'WEEKEND', color: c.fire, timeLeft: '36h' },
    { id: 3, title: 'Guardian Mutation', desc: 'Balance all 4 elements to unlock Aurora form for Fenra', icon: '✨', badge: 'CHALLENGE', color: '#A855F7', timeLeft: '3 days' },
  ];

  const pledgeProgress = 68;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: c.bg, fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ padding: '12px 20px 0' }}>
        <h1 style={{ color: c.text, fontSize: 22, fontWeight: 900, margin: 0 }}>Discover</h1>
        <p style={{ color: c.text2, fontSize: 13, margin: '2px 0 0' }}>Rare events & world restoration</p>
      </div>

      {/* Featured event */}
      <div style={{ margin: '14px 20px 0', borderRadius: 28, background: `linear-gradient(145deg,#2A1C30,#1A2C2A)`, padding: 20, border: `1px solid rgba(168,85,247,0.3)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(168,85,247,0.1)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ padding: '3px 10px', background: 'rgba(168,85,247,0.2)', borderRadius: 20, border: '1px solid rgba(168,85,247,0.4)' }}>
            <span style={{ color: '#C084FC', fontSize: 10, fontWeight: 800, letterSpacing: 0.5 }}>FEATURED EVENT</span>
          </div>
          <span style={{ fontSize: 30 }}>🌌</span>
        </div>
        <h2 style={{ color: 'white', fontSize: 18, fontWeight: 900, margin: '0 0 6px' }}>Aurora Convergence</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 500, margin: '0 0 14px', lineHeight: 1.5 }}>Balance all four elemental energies above 60% to unlock Fenra's Aurora form — a shimmering, celestial evolution.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 12 }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, margin: 0 }}>TIME LEFT</p>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 800, margin: '2px 0 0' }}>3 days 4h</p>
          </div>
          <div style={{ flex: 1, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 12 }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, margin: 0 }}>PROGRESS</p>
            <p style={{ color: '#C084FC', fontSize: 14, fontWeight: 800, margin: '2px 0 0' }}>2 / 4 elements</p>
          </div>
        </div>
      </div>

      {/* Active events */}
      <div style={{ padding: '16px 20px 0' }}>
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 800, marginBottom: 10 }}>Active Events</h3>
        {events.map(ev => (
          <div key={ev.id} style={{ padding: '14px', background: c.card, borderRadius: 20, border: `1px solid ${ev.color}30`, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{ev.icon}</span>
                <div style={{ padding: '2px 8px', background: ev.color + '25', borderRadius: 10 }}>
                  <span style={{ color: ev.color, fontSize: 9, fontWeight: 800 }}>{ev.badge}</span>
                </div>
              </div>
              <span style={{ color: c.text3, fontSize: 11, fontWeight: 600 }}>{ev.timeLeft}</span>
            </div>
            <p style={{ color: c.text, fontWeight: 800, fontSize: 13, margin: '0 0 4px' }}>{ev.title}</p>
            <p style={{ color: c.text2, fontSize: 11, fontWeight: 500, margin: 0, lineHeight: 1.4 }}>{ev.desc}</p>
          </div>
        ))}
      </div>

      {/* Community Restoration Pledge */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ padding: '18px', background: c.card, borderRadius: 24, border: `1px solid ${c.se}40` }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
            <span style={{ fontSize: 26 }}>🌍</span>
            <div>
              <p style={{ color: c.text3, fontSize: 10, fontWeight: 700, margin: '0 0 2px', letterSpacing: 0.5 }}>COMMUNITY PLEDGE</p>
              <h3 style={{ color: c.text, fontWeight: 900, fontSize: 15, margin: 0 }}>Amazon Reforestation</h3>
              <p style={{ color: c.text2, fontSize: 11, fontWeight: 500, margin: '3px 0 0', lineHeight: 1.4 }}>8,240 Guardians contributing Elemental Essence — unlock 500 real trees</p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: c.text2, fontSize: 11, fontWeight: 700 }}>340,000 / 500,000 Essence</span>
              <span style={{ color: c.se, fontSize: 11, fontWeight: 800 }}>{pledgeProgress}%</span>
            </div>
            <div style={{ height: 10, background: c.surface, borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pledgeProgress}%`, background: `linear-gradient(90deg,${c.se},#8BD48A)`, borderRadius: 6, transition: 'width 0.8s ease' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {['🦊','🦁','🐺','🦅','🐉'].map((e, i) => (
                <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginLeft: i > 0 ? -6 : 0, border: `2px solid ${c.card}`, zIndex: 5 - i }}>
                  {e}
                </div>
              ))}
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: c.text2, marginLeft: -6, border: `2px solid ${c.card}` }}>
                +8k
              </div>
            </div>
            <div
              onPointerEnter={() => setPledgeHovered(true)}
              onPointerLeave={() => setPledgeHovered(false)}
              style={{ padding: '8px 16px', background: pledgeHovered ? c.se : c.se + '25', border: `1px solid ${c.se}50`, borderRadius: 14, cursor: 'pointer', transition: 'all 0.2s' }}>
              <span style={{ color: pledgeHovered ? 'white' : c.se, fontSize: 12, fontWeight: 800, fontFamily: 'Nunito, sans-serif' }}>Contribute</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== PROFILE SCREEN =====================
function ProfileScreen({ c, isDark, setIsDark }) {
  const stats = [
    { label: 'Total XP', value: '42,840', icon: '⚡' },
    { label: 'Activities', value: '247', icon: '🏃' },
    { label: 'Flora Found', value: '6/18', icon: '🌿' },
    { label: 'Streak', value: '12 days', icon: '🔥' },
  ];
  const achievements = [
    { name: 'First Steps', icon: '👣', desc: 'Log your first activity', done: true },
    { name: 'Water Warden', icon: '💧', desc: 'Reach 80% Water energy', done: true },
    { name: 'Earth Tender', icon: '🌿', desc: 'Walk 100km total', done: false },
    { name: 'Elemental Sage', icon: '✨', desc: 'Balance all elements', done: false },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: c.bg, fontFamily: 'Nunito, sans-serif' }}>
      {/* Profile header */}
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ color: c.text, fontSize: 22, fontWeight: 900, margin: 0 }}>Profile</h1>
          <p style={{ color: c.text2, fontSize: 13, margin: '2px 0 0' }}>Guardian of Balance</p>
        </div>
        {React.createElement(window.lucide.Settings, { size: 22, color: c.text3 })}
      </div>

      {/* Avatar card */}
      <div style={{ margin: '14px 20px 0', padding: '20px', background: c.card, borderRadius: 28, border: `1px solid ${c.border}` }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: `linear-gradient(135deg,${c.pr},${c.ac})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>
            🌿
          </div>
          <div>
            <h2 style={{ color: c.text, fontSize: 18, fontWeight: 900, margin: 0 }}>Alex Rivera</h2>
            <p style={{ color: c.text2, fontSize: 12, margin: '3px 0' }}>Level 12 · Forest Spirit Guardian</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ height: 6, width: 100, background: c.surface, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '88%', background: `linear-gradient(90deg,${c.pr},${c.ac})`, borderRadius: 3 }} />
              </div>
              <span style={{ color: c.text3, fontSize: 10, fontWeight: 600 }}>88%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '14px', background: c.card, borderRadius: 18, border: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <p style={{ color: c.text, fontSize: 18, fontWeight: 900, margin: '6px 0 2px' }}>{s.value}</p>
              <p style={{ color: c.text3, fontSize: 11, fontWeight: 600, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ padding: '14px 20px 0' }}>
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 800, marginBottom: 10 }}>Achievements</h3>
        {achievements.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: c.card, borderRadius: 16, marginBottom: 8, border: `1px solid ${a.done ? c.se + '40' : c.border}`, opacity: a.done ? 1 : 0.6 }}>
            <div style={{ width: 38, height: 38, borderRadius: 14, background: a.done ? c.se + '25' : c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: c.text, fontWeight: 700, fontSize: 13, margin: 0 }}>{a.name}</p>
              <p style={{ color: c.text3, fontSize: 11, margin: '2px 0 0' }}>{a.desc}</p>
            </div>
            {a.done && React.createElement(window.lucide.CheckCircle2, { size: 18, color: c.se })}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ padding: '14px 20px 20px' }}>
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 800, marginBottom: 10 }}>Settings</h3>
        <div style={{ background: c.card, borderRadius: 22, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
          {/* Theme toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: c.ac })}
              <span style={{ color: c.text, fontSize: 13, fontWeight: 700 }}>Dark Mode</span>
            </div>
            <div onClick={() => setIsDark(!isDark)} style={{ width: 46, height: 26, borderRadius: 13, background: isDark ? c.pr : c.border, cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: 3, left: isDark ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
            </div>
          </div>
          {[
            { icon: window.lucide.Bell, label: 'Notifications', val: 'On' },
            { icon: window.lucide.MapPin, label: 'Location Access', val: 'While Using' },
            { icon: window.lucide.Shield, label: 'Privacy', val: '' },
            { icon: window.lucide.Heart, label: 'Health Connect', val: 'Linked' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: i < 3 ? `1px solid ${c.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {React.createElement(s.icon, { size: 18, color: c.text3 })}
                <span style={{ color: c.text, fontSize: 13, fontWeight: 700 }}>{s.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: c.text3, fontSize: 12, fontWeight: 600 }}>{s.val}</span>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: c.text3 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const c = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'haven', label: 'Haven', icon: window.lucide.TreePine },
    { id: 'activities', label: 'Move', icon: window.lucide.Zap },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    haven: HavenScreen,
    activities: ActivitiesScreen,
    discover: DiscoverScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        html, body { font-family: 'Nunito', sans-serif; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: c.bg,
        borderRadius: 50,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(255,255,255,0.07)',
        fontFamily: 'Nunito, sans-serif',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Status bar */}
        <div style={{ height: 54, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px 0', position: 'relative', flexShrink: 0 }}>
          <span style={{ color: c.text, fontSize: 14, fontWeight: 800, fontFamily: 'Nunito, sans-serif' }}>9:41</span>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 118, height: 34, background: '#000', borderRadius: 22, zIndex: 10 }} />
          {/* Status icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 12 }}>
              {[4, 6, 9, 12].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: c.text, borderRadius: 1, opacity: i === 3 ? 0.35 : 1 }} />
              ))}
            </div>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="none">
              <path d="M12 3C16.5 3 20.5 5 23 8.5" stroke={c.text} strokeWidth="2" strokeLinecap="round" />
              <path d="M12 3C7.5 3 3.5 5 1 8.5" stroke={c.text} strokeWidth="2" strokeLinecap="round" />
              <path d="M12 9C14 9 15.8 9.8 17 11" stroke={c.text} strokeWidth="2" strokeLinecap="round" />
              <path d="M12 9C10 9 8.2 9.8 7 11" stroke={c.text} strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="15" r="2" fill={c.text} />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 22, height: 11, border: `1.5px solid ${c.text}`, borderRadius: 3, padding: '1.5px 1.5px' }}>
                <div style={{ width: '75%', height: '100%', background: c.text, borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2.5, height: 5, background: c.text, borderRadius: '0 1.5px 1.5px 0', opacity: 0.55 }} />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen c={c} isDark={isDark} setIsDark={setIsDark} />
        </div>

        {/* Bottom navigation */}
        <div style={{ height: 82, background: c.card, borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around', padding: '10px 4px 0', flexShrink: 0 }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const navItemStyle = {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer', padding: '2px 12px', minWidth: 52,
              color: isActive ? c.pr : c.text3,
              transition: 'color 0.18s',
              position: 'relative',
            };
            const labelStyle = {
              fontSize: 10, fontWeight: isActive ? 800 : 600,
              fontFamily: 'Nunito, sans-serif',
              lineHeight: 1,
            };
            return (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={navItemStyle}>
                {isActive && (
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: 32, height: 3, borderRadius: 2, background: c.pr }} />
                )}
                {React.createElement(tab.icon, { size: 22 })}
                <span style={labelStyle}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
