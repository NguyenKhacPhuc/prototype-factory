const { useState, useEffect, useRef } = React;

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F3F0FA', surface: '#FFFFFF', surfaceAlt: '#F8F6FD', card: '#FFFFFF',
    text: '#1A1333', textSec: '#6B5F8A', textMuted: '#B0A8C8',
    primary: '#7C5CFC', primaryDim: 'rgba(124,92,252,0.1)', primaryBorder: 'rgba(124,92,252,0.25)',
    primaryGrad: 'linear-gradient(135deg, #7C5CFC 0%, #A97BFD 100%)',
    calm: '#4CC9A0', calmDim: 'rgba(76,201,160,0.12)',
    warm: '#FF9A3C', warmDim: 'rgba(255,154,60,0.12)',
    energy: '#FF6B9D', energyDim: 'rgba(255,107,157,0.12)',
    focus: '#3ABEFF', focusDim: 'rgba(58,190,255,0.12)',
    border: '#EAE5F8', borderLight: '#F3F0FA',
    navBg: '#FFFFFF', notch: '#1A1333',
    success: '#4CC9A0', warning: '#FF9A3C', danger: '#FF6B9D',
    shadow: '0 2px 16px rgba(124,92,252,0.1)',
  },
  dark: {
    bg: '#0D0B18', surface: '#16122A', surfaceAlt: '#1D1835', card: '#16122A',
    text: '#EDE9FF', textSec: '#8B7EAD', textMuted: '#3D3560',
    primary: '#9B7BFF', primaryDim: 'rgba(155,123,255,0.15)', primaryBorder: 'rgba(155,123,255,0.3)',
    primaryGrad: 'linear-gradient(135deg, #7C5CFC 0%, #B794FF 100%)',
    calm: '#3BB88B', calmDim: 'rgba(59,184,139,0.15)',
    warm: '#E8873A', warmDim: 'rgba(232,135,58,0.15)',
    energy: '#E0558A', energyDim: 'rgba(224,85,138,0.15)',
    focus: '#2E9FE0', focusDim: 'rgba(46,159,224,0.15)',
    border: '#221E3A', borderLight: '#1D1835',
    navBg: '#0D0B18', notch: '#000',
    success: '#3BB88B', warning: '#E8873A', danger: '#E0558A',
    shadow: '0 2px 20px rgba(0,0,0,0.4)',
  }
};

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const MOODS = [
  { id: 'drained',  emoji: '😩', label: 'Drained',  color: 'warm',   desc: 'Low energy, need to recharge' },
  { id: 'stressed', emoji: '😤', label: 'Stressed',  color: 'energy', desc: 'Tense, need to decompress' },
  { id: 'neutral',  emoji: '😶', label: 'Neutral',   color: 'focus',  desc: 'Okay, open to anything' },
  { id: 'calm',     emoji: '😌', label: 'Calm',      color: 'calm',   desc: 'Relaxed, feeling good' },
  { id: 'wired',    emoji: '⚡', label: 'Wired',     color: 'primary', desc: 'High energy, need focus' },
];

const RECIPES = [
  {
    id: 'decompress', name: 'Decompress Corner', emoji: '🌙', color: 'calm', duration: '7 min',
    mood: 'stressed', desc: 'Shed the day. Soften the room.',
    steps: [
      { id: 1, icon: '💡', action: 'Dim lights to 30%', detail: 'Warm tone, bedside lamp only', time: 60 },
      { id: 2, icon: '🎵', action: 'Play Lo-fi Rain', detail: 'Spotify: "Rainy Lofi Study" playlist', time: 120 },
      { id: 3, icon: '🧹', action: 'Clear one surface', detail: 'Move items to the hidden tray', time: 90 },
      { id: 4, icon: '🌿', action: 'Lavender diffuser', detail: '3 drops, 15-min timer mode', time: 30 },
      { id: 5, icon: '🛋️', action: 'Settle your spot', detail: 'Blanket out, phone face-down', time: 30 },
    ]
  },
  {
    id: 'focus', name: 'Deep Focus Mode', emoji: '🔬', color: 'focus', duration: '10 min',
    mood: 'wired', desc: 'Channel energy into clear space.',
    steps: [
      { id: 1, icon: '💡', action: 'Bright white light', detail: '80% brightness, cool temperature', time: 30 },
      { id: 2, icon: '🧹', action: 'Clear desk completely', detail: 'Only keep: laptop, water, notebook', time: 180 },
      { id: 3, icon: '🎵', action: 'Brown noise on', detail: 'YouTube: "10hr Brown Noise"', time: 30 },
      { id: 4, icon: '📴', action: 'Phone in drawer', detail: 'Face down, silent. DND on.', time: 30 },
      { id: 5, icon: '🌿', action: 'Peppermint mist', detail: 'Spritz pillow or diffuser', time: 30 },
      { id: 6, icon: '🧊', action: 'Open a window', detail: 'Cool air boosts focus', time: 30 },
    ]
  },
  {
    id: 'recharge', name: 'Power Recharge', emoji: '🔋', color: 'warm', duration: '5 min',
    mood: 'drained', desc: 'Small changes, big energy lift.',
    steps: [
      { id: 1, icon: '💡', action: 'Natural or warm light', detail: 'Open blinds or warm floor lamp', time: 30 },
      { id: 2, icon: '🎵', action: 'Upbeat acoustic', detail: 'Something calm but rhythmic', time: 30 },
      { id: 3, icon: '🧹', action: 'Move one thing back', detail: 'Pick the most annoying item', time: 60 },
      { id: 4, icon: '🍵', action: 'Make a warm drink', detail: 'Tea, coffee, or hot water + lemon', time: 180 },
    ]
  },
  {
    id: 'guest', name: 'Guest-Ready Sprint', emoji: '🎉', color: 'energy', duration: '15 min',
    mood: 'neutral', desc: 'Visible areas first. Fast.',
    steps: [
      { id: 1, icon: '🧹', action: 'Clear the entryway', detail: 'Shoes away, no bags on floor', time: 120 },
      { id: 2, icon: '🧹', action: 'Surface sweep: living room', detail: 'Toss loose items in a box', time: 180 },
      { id: 3, icon: '💡', action: 'Warm ambient lighting', detail: 'No harsh overheads. Side lamps.', time: 30 },
      { id: 4, icon: '🌿', action: 'Scent check', detail: 'Candle or diffuser in main space', time: 30 },
      { id: 5, icon: '🎵', action: 'Background music', detail: 'Soft chill or jazz instrumental', time: 30 },
      { id: 6, icon: '🛁', action: 'Quick bathroom check', detail: 'Fresh towel, wipe sink, close lid', time: 120 },
      { id: 7, icon: '🪴', action: 'Arrange one centerpiece', detail: 'A plant, candle, or fruit bowl', time: 60 },
    ]
  },
  {
    id: 'sleep', name: 'Sleep Prep', emoji: '💤', color: 'calm', duration: '8 min',
    mood: 'calm', desc: 'Signal your body: it\'s time.',
    steps: [
      { id: 1, icon: '💡', action: 'All lights off except nightstand', detail: 'Warm orange tone, lowest setting', time: 30 },
      { id: 2, icon: '🌡️', action: 'Lower temperature', detail: 'Open window or set AC to 68°F', time: 60 },
      { id: 3, icon: '🧹', action: 'Clothes off floor', detail: 'Chair or hamper — not bed', time: 60 },
      { id: 4, icon: '📴', action: 'Charger spot, phone away', detail: 'Plug in across the room', time: 30 },
      { id: 5, icon: '🎵', action: 'Sleep sounds on', detail: '30min timer: Rain or White Noise', time: 30 },
      { id: 6, icon: '🌿', action: 'Chamomile scent', detail: 'Pillow spray or diffuser off soon', time: 30 },
    ]
  }
];

const MEMORY = [
  { id: 1, date: 'Today, 6:12 PM', recipe: 'Decompress Corner', mood: '😤 Stressed → 😌 Calm', rating: 5, note: 'The lavender + lofi combo actually worked.', saved: true },
  { id: 2, date: 'Yesterday, 2:30 PM', recipe: 'Deep Focus Mode', mood: '⚡ Wired → 🔬 Focused', rating: 4, note: 'Brown noise helped a lot. Desk clear was key.', saved: true },
  { id: 3, date: 'Mar 20, 9:00 PM', recipe: 'Sleep Prep', mood: '😶 Neutral → 💤 Ready', rating: 4, note: 'Phone away rule made a real difference.', saved: false },
  { id: 4, date: 'Mar 19, 5:45 PM', recipe: 'Power Recharge', mood: '😩 Drained → ⚡ Better', rating: 3, note: 'Tea helped. Could use a longer rest next time.', saved: false },
  { id: 5, date: 'Mar 18, 7:30 PM', recipe: 'Guest-Ready Sprint', mood: '😤 Stressed → 😌 Calm', rating: 5, note: 'Finished before they arrived. Perfect.', saved: true },
];

const PLAYBOOK = [
  { situation: 'After tough workday', recipe: 'Decompress Corner', wins: 8, emoji: '🌙' },
  { situation: 'Deep work session', recipe: 'Deep Focus Mode', wins: 5, emoji: '🔬' },
  { situation: 'Low energy afternoon', recipe: 'Power Recharge', wins: 4, emoji: '🔋' },
  { situation: 'Before hosting guests', recipe: 'Guest-Ready Sprint', wins: 3, emoji: '🎉' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function ProgressBar({ value, max, color, height = 6, t }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: t.border, borderRadius: 99, height, overflow: 'hidden', width: '100%' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.5s ease' }} />
    </div>
  );
}

function StarRating({ rating, t }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: 12, color: i <= rating ? t.warm : t.textMuted }}>★</span>
      ))}
    </div>
  );
}

function Chip({ label, color, bg, size = 11 }) {
  return (
    <span style={{ background: bg, color, borderRadius: 99, padding: '3px 9px', fontSize: size, fontWeight: 600 }}>{label}</span>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ t, onStartRecipe, onSetMood, currentMood, setActiveTab }) {
  const [showCheckIn, setShowCheckIn] = useState(!currentMood);
  const [pressed, setPressed] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const moodObj = MOODS.find(m => m.id === currentMood);
  const suggestedRecipe = currentMood
    ? RECIPES.find(r => r.mood === currentMood) || RECIPES[0]
    : null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: t.textSec, fontWeight: 500 }}>{greeting}</p>
            <h2 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 700, color: t.text }}>Sarah</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {currentMood && (
              <div style={{ background: t.primaryDim, borderRadius: 12, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 16 }}>{moodObj?.emoji}</span>
                <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>{moodObj?.label}</span>
              </div>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              style={{ background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {React.createElement(window.lucide.Settings, { size: 18, color: t.textSec })}
            </button>
          </div>
        </div>
      </div>

      {/* Mood Check-In */}
      <div style={{ margin: '16px 20px 0', background: showCheckIn ? t.surface : t.surfaceAlt, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: showCheckIn ? t.shadow : 'none' }}>
        {showCheckIn ? (
          <div style={{ padding: '18px 18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, color: t.textSec }}>Daily check-in</p>
                <p style={{ margin: '2px 0 0', fontSize: 16, fontWeight: 700, color: t.text }}>How are you feeling right now?</p>
              </div>
              {React.createElement(window.lucide.Sparkles, { size: 20, color: t.primary })}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {MOODS.map(m => (
                <button
                  key={m.id}
                  onMouseDown={() => setPressed(m.id)}
                  onMouseUp={() => setPressed(null)}
                  onTouchStart={() => setPressed(m.id)}
                  onTouchEnd={() => setPressed(null)}
                  onClick={() => { onSetMood(m.id); setShowCheckIn(false); }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    background: pressed === m.id ? t.primaryDim : t.surfaceAlt,
                    border: `1.5px solid ${pressed === m.id ? t.primary : t.border}`,
                    borderRadius: 14, padding: '10px 12px', cursor: 'pointer',
                    transform: pressed === m.id ? 'scale(0.95)' : 'scale(1)',
                    transition: 'all 0.15s ease', flex: '1 1 calc(20% - 8px)', minWidth: 52
                  }}>
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: t.textSec }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowCheckIn(true)}
            style={{ width: '100%', background: 'none', border: 'none', padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(window.lucide.RefreshCw, { size: 14, color: t.textSec })}
            <span style={{ fontSize: 12, color: t.textSec }}>Update how you're feeling</span>
          </button>
        )}
      </div>

      {/* Suggested Space Shift */}
      {suggestedRecipe && (
        <div style={{ margin: '14px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your Space Shift</p>
            <button onClick={() => setActiveTab('nest')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: t.primary, fontWeight: 600 }}>See all →</button>
          </div>
          <div style={{ background: t.surface, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
            <div style={{ background: t.primaryGrad, padding: '18px 18px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: 32 }}>{suggestedRecipe.emoji}</span>
                <h3 style={{ margin: '6px 0 2px', fontSize: 18, fontWeight: 700, color: '#fff' }}>{suggestedRecipe.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{suggestedRecipe.desc}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '4px 10px' }}>
                <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{suggestedRecipe.duration}</span>
              </div>
            </div>
            <div style={{ padding: '12px 18px 16px' }}>
              <p style={{ margin: '0 0 10px', fontSize: 12, color: t.textSec }}>
                {suggestedRecipe.steps.length} steps · Lighting, Sound, Scent & Space
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {suggestedRecipe.steps.slice(0, 4).map(s => (
                  <span key={s.id} style={{ background: t.surfaceAlt, borderRadius: 8, padding: '4px 8px', fontSize: 11, color: t.textSec }}>
                    {s.icon} {s.action.split(' ').slice(0, 2).join(' ')}
                  </span>
                ))}
                {suggestedRecipe.steps.length > 4 && (
                  <span style={{ background: t.surfaceAlt, borderRadius: 8, padding: '4px 8px', fontSize: 11, color: t.textSec }}>+{suggestedRecipe.steps.length - 4} more</span>
                )}
              </div>
              <button
                onClick={() => { onStartRecipe(suggestedRecipe); setActiveTab('reset'); }}
                style={{ width: '100%', background: t.primaryGrad, border: 'none', borderRadius: 12, padding: '12px 0', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Start Space Shift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Recipes */}
      <div style={{ margin: '18px 20px 0' }}>
        <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>Quick Recipes</p>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {RECIPES.map(r => {
            const col = t[r.color] || t.primary;
            const dimCol = t[r.color + 'Dim'] || t.primaryDim;
            return (
              <button key={r.id}
                onClick={() => { onStartRecipe(r); setActiveTab('reset'); }}
                style={{ flexShrink: 0, background: t.surface, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '12px 14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 110, textAlign: 'left' }}>
                <span style={{ fontSize: 24 }}>{r.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1.3 }}>{r.name}</span>
                <span style={{ fontSize: 10, color: col, fontWeight: 600, background: dimCol, borderRadius: 6, padding: '2px 6px', display: 'inline-block' }}>{r.duration}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ margin: '18px 20px 0', display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, background: t.surface, borderRadius: 16, padding: '14px', border: `1px solid ${t.border}` }}>
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: t.primary }}>12</p>
          <p style={{ margin: 0, fontSize: 11, color: t.textSec }}>Space shifts this month</p>
        </div>
        <div style={{ flex: 1, background: t.surface, borderRadius: 16, padding: '14px', border: `1px solid ${t.border}` }}>
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: t.calm }}>4.2 ★</p>
          <p style={{ margin: 0, fontSize: 11, color: t.textSec }}>Average mood lift</p>
        </div>
        <div style={{ flex: 1, background: t.surface, borderRadius: 16, padding: '14px', border: `1px solid ${t.border}` }}>
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: t.warm }}>🔥 5</p>
          <p style={{ margin: 0, fontSize: 11, color: t.textSec }}>Day streak</p>
        </div>
      </div>
    </div>
  );
}

// ─── NEST SCREEN (Recipes) ─────────────────────────────────────────────────────
function NestScreen({ t, onStartRecipe, setActiveTab }) {
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'calm', label: '🌙 Calm' },
    { id: 'focus', label: '🔬 Focus' },
    { id: 'warm', label: '🔋 Recharge' },
    { id: 'energy', label: '🎉 Social' },
  ];
  const colorMap = { calm: 'calm', focus: 'focus', warm: 'warm', energy: 'energy', primary: 'primary' };
  const filtered = filter === 'all' ? RECIPES : RECIPES.filter(r => r.color === filter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: t.text }}>Nest Recipes</h2>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: t.textSec }}>Curated space shifts for every state.</p>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              style={{ flexShrink: 0, background: filter === f.id ? t.primary : t.surface, color: filter === f.id ? '#fff' : t.textSec, border: `1.5px solid ${filter === f.id ? t.primary : t.border}`, borderRadius: 99, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(r => {
          const col = t[r.color] || t.primary;
          const dimCol = t[r.color + 'Dim'] || t.primaryDim;
          const isExp = expandedId === r.id;
          return (
            <div key={r.id} style={{ background: t.surface, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
              <button
                onClick={() => setExpandedId(isExp ? null : r.id)}
                style={{ width: '100%', background: 'none', border: 'none', padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: dimCol, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {r.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{r.name}</span>
                    <span style={{ fontSize: 11, color: col, background: dimCol, borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{r.duration}</span>
                  </div>
                  <p style={{ margin: '3px 0 6px', fontSize: 12, color: t.textSec }}>{r.desc}</p>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ fontSize: 10, color: t.textMuted, background: t.surfaceAlt, borderRadius: 6, padding: '2px 6px' }}>{r.steps.length} steps</span>
                    <span style={{ fontSize: 10, color: t.textMuted, background: t.surfaceAlt, borderRadius: 6, padding: '2px 6px' }}>💡 Sound 🌿</span>
                  </div>
                </div>
                <div style={{ color: t.textMuted, transform: isExp ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  {React.createElement(window.lucide.ChevronDown, { size: 18 })}
                </div>
              </button>

              {isExp && (
                <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${t.border}` }}>
                  <p style={{ margin: '12px 0 10px', fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>Steps Preview</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                    {r.steps.map((s, i) => (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: dimCol, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                          {s.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{s.action}</span>
                          <p style={{ margin: 0, fontSize: 11, color: t.textSec }}>{s.detail}</p>
                        </div>
                        <span style={{ fontSize: 10, color: t.textMuted }}>{s.time}s</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => { onStartRecipe(r); setActiveTab('reset'); }}
                    style={{ width: '100%', background: col, border: 'none', borderRadius: 12, padding: '12px 0', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                    Start this Recipe
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── RESET SCREEN (Timer) ─────────────────────────────────────────────────────
function ResetScreen({ t, activeRecipe, setActiveRecipe }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [rating, setRating] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (activeRecipe) {
      setStepIndex(0);
      setTimeLeft(activeRecipe.steps[0].time);
      setRunning(false);
      setDone(false);
      setCompleted([]);
      setRating(0);
    }
  }, [activeRecipe]);

  useEffect(() => {
    if (running && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (running && timeLeft === 0) {
      handleComplete();
    }
    return () => clearTimeout(timerRef.current);
  }, [running, timeLeft]);

  const handleComplete = () => {
    const steps = activeRecipe.steps;
    const newCompleted = [...completed, stepIndex];
    setCompleted(newCompleted);
    setRunning(false);
    if (stepIndex + 1 < steps.length) {
      setStepIndex(stepIndex + 1);
      setTimeLeft(steps[stepIndex + 1].time);
    } else {
      setDone(true);
    }
  };

  const handleSkip = () => {
    const steps = activeRecipe.steps;
    if (stepIndex + 1 < steps.length) {
      setRunning(false);
      setStepIndex(stepIndex + 1);
      setTimeLeft(steps[stepIndex + 1].time);
    } else {
      setDone(true);
    }
  };

  const formatTime = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  const pct = activeRecipe ? ((activeRecipe.steps.length - (activeRecipe.steps.length - stepIndex)) / activeRecipe.steps.length) * 100 : 0;

  if (!activeRecipe) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>⏱️</div>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: t.text, textAlign: 'center' }}>No active reset</h3>
        <p style={{ margin: 0, fontSize: 13, color: t.textSec, textAlign: 'center', lineHeight: 1.5 }}>Start a space shift from Home or pick a recipe in Nest.</p>
      </div>
    );
  }

  const step = activeRecipe.steps[stepIndex];
  const col = t[activeRecipe.color] || t.primary;
  const dimCol = t[activeRecipe.color + 'Dim'] || t.primaryDim;
  const totalTime = activeRecipe.steps.reduce((a, s) => a + s.time, 0);
  const elapsed = activeRecipe.steps.slice(0, stepIndex).reduce((a, s) => a + s.time, 0) + (step.time - timeLeft);

  if (done) {
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '30px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 64 }}>✨</div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: t.text }}>Space Shift Complete!</h2>
          <p style={{ margin: 0, fontSize: 14, color: t.textSec }}>{activeRecipe.name} · {activeRecipe.steps.length} steps done</p>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: '18px 22px', width: '100%', marginTop: 8 }}>
            <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 600, color: t.text }}>How did it go?</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              {[1,2,3,4,5].map(i => (
                <button key={i} onClick={() => setRating(i)}
                  style={{ fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', transform: rating >= i ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.15s', filter: rating >= i ? 'none' : 'grayscale(1)' }}>
                  ⭐
                </button>
              ))}
            </div>
            {rating > 0 && (
              <div style={{ background: t.surfaceAlt, borderRadius: 12, padding: '10px 14px', marginBottom: 12 }}>
                <p style={{ margin: 0, fontSize: 12, color: t.textSec }}>
                  {rating >= 4 ? '🎉 Great! This recipe gets saved to your Playbook.' : rating >= 3 ? '👍 Good. Noted for next time.' : '💡 Hmm. We\'ll adjust for next time.'}
                </p>
              </div>
            )}
            {rating > 0 && (
              <button onClick={() => { setActiveRecipe(null); setDone(false); }}
                style={{ width: '100%', background: col, border: 'none', borderRadius: 12, padding: '12px 0', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Save to Memory & Close
              </button>
            )}
          </div>
        </div>
        <div style={{ padding: '16px 24px 0' }}>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>What you did</p>
          {activeRecipe.steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 99, background: t.calmDim || dimCol, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide.Check, { size: 14, color: t.calm })}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.text }}>{s.icon} {s.action}</p>
                <p style={{ margin: 0, fontSize: 11, color: t.textSec }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 52;
  const timerPct = step.time > 0 ? timeLeft / step.time : 0;

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
      {/* Header */}
      <div style={{ padding: '18px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: t.textSec }}>Active Reset</p>
          <h3 style={{ margin: '2px 0 0', fontSize: 18, fontWeight: 700, color: t.text }}>{activeRecipe.name}</h3>
        </div>
        <button onClick={() => setActiveRecipe(null)}
          style={{ background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 10, padding: '6px 12px', cursor: 'pointer', fontSize: 12, color: t.textSec, fontWeight: 600 }}>
          Cancel
        </button>
      </div>

      {/* Progress */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: t.textSec }}>Step {stepIndex + 1} of {activeRecipe.steps.length}</span>
          <span style={{ fontSize: 12, color: t.textSec }}>{formatTime(totalTime - elapsed)} left total</span>
        </div>
        <ProgressBar value={stepIndex} max={activeRecipe.steps.length} color={col} height={6} t={t} />
      </div>

      {/* Timer Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px 20px', gap: 16 }}>
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <svg width={120} height={120} style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
            <circle cx={60} cy={60} r={52} fill="none" stroke={t.border} strokeWidth={8} />
            <circle cx={60} cy={60} r={52} fill="none" stroke={col} strokeWidth={8}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - timerPct)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: t.text, lineHeight: 1 }}>{formatTime(timeLeft)}</span>
            <span style={{ fontSize: 22 }}>{step.icon}</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: t.text }}>{step.action}</h3>
          <p style={{ margin: 0, fontSize: 13, color: t.textSec }}>{step.detail}</p>
        </div>

        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button onClick={handleSkip}
            style={{ flex: 1, background: t.surfaceAlt, border: `1.5px solid ${t.border}`, borderRadius: 12, padding: '12px 0', fontSize: 14, fontWeight: 600, color: t.textSec, cursor: 'pointer' }}>
            Skip
          </button>
          <button onClick={() => setRunning(!running)}
            style={{ flex: 2, background: running ? t.surfaceAlt : col, border: `1.5px solid ${running ? t.border : col}`, borderRadius: 12, padding: '12px 0', fontSize: 14, fontWeight: 700, color: running ? t.text : '#fff', cursor: 'pointer' }}>
            {running ? '⏸ Pause' : timeLeft === step.time ? '▶ Start Step' : '▶ Resume'}
          </button>
          <button onClick={handleComplete}
            style={{ flex: 1, background: dimCol, border: `1.5px solid ${col}`, borderRadius: 12, padding: '12px 0', fontSize: 14, fontWeight: 700, color: col, cursor: 'pointer' }}>
            ✓
          </button>
        </div>
      </div>

      {/* Steps List */}
      <div style={{ padding: '0 20px' }}>
        <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>All Steps</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {activeRecipe.steps.map((s, i) => {
            const isDone = completed.includes(i);
            const isCurrent = i === stepIndex;
            return (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12,
                background: isCurrent ? dimCol : isDone ? t.surfaceAlt : 'transparent',
                border: `1.5px solid ${isCurrent ? col : t.border}`,
                opacity: !isDone && !isCurrent && i > stepIndex ? 0.5 : 1
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, background: isDone ? (t.calmDim || dimCol) : isCurrent ? dimCol : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                  {isDone ? React.createElement(window.lucide.Check, { size: 13, color: t.calm }) : s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: isCurrent ? 700 : 500, color: isDone ? t.textMuted : t.text, textDecoration: isDone ? 'line-through' : 'none' }}>{s.action}</p>
                  {isCurrent && <p style={{ margin: '2px 0 0', fontSize: 11, color: t.textSec }}>{s.detail}</p>}
                </div>
                <span style={{ fontSize: 10, color: t.textMuted }}>{formatTime(s.time)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── MEMORY SCREEN ────────────────────────────────────────────────────────────
function MemoryScreen({ t }) {
  const [view, setView] = useState('log');
  const days = ['M','T','W','T','F','S','S'];
  const streakData = [3,4,5,3,4,5,4];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: t.text }}>Room Memory</h2>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: t.textSec }}>Your private playbook of what works.</p>

        {/* View Toggle */}
        <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 12, padding: 3, marginBottom: 16 }}>
          {['log', 'playbook'].map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ flex: 1, background: view === v ? t.surface : 'transparent', border: 'none', borderRadius: 10, padding: '8px 0', fontSize: 12, fontWeight: 700, color: view === v ? t.text : t.textSec, cursor: 'pointer', boxShadow: view === v ? t.shadow : 'none', transition: 'all 0.2s' }}>
              {v === 'log' ? '📋 Session Log' : '🗺️ Playbook'}
            </button>
          ))}
        </div>

        {/* Mood trend mini chart */}
        {view === 'log' && (
          <div style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 14 }}>
            <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>This Week's Mood Lift</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 40 }}>
              {streakData.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', background: t.primaryGrad, borderRadius: 4, height: v * 7, opacity: i === 6 ? 1 : 0.5 + (i * 0.07) }} />
                  <span style={{ fontSize: 9, color: t.textMuted }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {view === 'log' ? (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MEMORY.map(m => (
            <div key={m.id} style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: t.text }}>{m.recipe}</p>
                  <p style={{ margin: 0, fontSize: 11, color: t.textSec }}>{m.date}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {m.saved && (
                    <span style={{ background: t.primaryDim, color: t.primary, fontSize: 10, fontWeight: 700, borderRadius: 6, padding: '2px 7px' }}>Saved</span>
                  )}
                  <StarRating rating={m.rating} t={t} />
                </div>
              </div>
              <div style={{ background: t.surfaceAlt, borderRadius: 10, padding: '8px 10px', marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 12, color: t.textSec }}>
                  <span style={{ fontWeight: 600 }}>Mood:</span> {m.mood}
                </p>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: t.textSec, fontStyle: 'italic' }}>"{m.note}"</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '0 20px' }}>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: t.textSec, lineHeight: 1.5 }}>Patterns learned from your sessions. The app gets smarter the more you use it.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PLAYBOOK.map((p, i) => (
              <div key={i} style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {p.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 700, color: t.text }}>{p.situation}</p>
                  <p style={{ margin: '0 0 6px', fontSize: 12, color: t.primary, fontWeight: 600 }}>→ {p.recipe}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ProgressBar value={p.wins} max={10} color={t.primary} height={4} t={t} />
                    <span style={{ fontSize: 10, color: t.textMuted, whiteSpace: 'nowrap' }}>{p.wins}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: t.primaryDim, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.primaryBorder}` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {React.createElement(window.lucide.Brain, { size: 20, color: t.primary })}
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 700, color: t.primary }}>MoodNest is learning</p>
                <p style={{ margin: 0, fontSize: 12, color: t.textSec }}>After 5 more sessions, you'll unlock personalized suggestions.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ t, themeKey, setThemeKey }) {
  const [notifs, setNotifs] = useState(true);
  const [contextReminders, setContextReminders] = useState(true);
  const [sound, setSound] = useState(false);

  const Toggle = ({ on, onToggle, col }) => (
    <button onClick={onToggle}
      style={{ width: 44, height: 26, borderRadius: 13, background: on ? (col || t.primary) : t.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: on ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </button>
  );

  const Row = ({ icon, label, sub, right }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: `1px solid ${t.border}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text }}>{label}</p>
        {sub && <p style={{ margin: '1px 0 0', fontSize: 11, color: t.textSec }}>{sub}</p>}
      </div>
      {right}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 22, fontWeight: 700, color: t.text }}>Settings</h2>

        {/* Profile */}
        <div style={{ background: t.surface, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}`, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>😌</div>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 16, fontWeight: 700, color: t.text }}>Sarah Chen</p>
            <p style={{ margin: 0, fontSize: 12, color: t.textSec }}>Member since Feb 2026 · 12 space shifts</p>
          </div>
        </div>

        {/* Theme */}
        <div style={{ background: t.surface, borderRadius: 20, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 14 }}>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>Appearance</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {['light', 'dark'].map(tk => (
              <button key={tk} onClick={() => setThemeKey(tk)}
                style={{ flex: 1, border: `2px solid ${themeKey === tk ? t.primary : t.border}`, borderRadius: 14, padding: '12px', background: tk === 'light' ? '#F3F0FA' : '#0D0B18', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 20 }}>{tk === 'light' ? '☀️' : '🌙'}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: tk === 'light' ? '#1A1333' : '#EDE9FF', textTransform: 'capitalize' }}>{tk}</span>
                {themeKey === tk && <div style={{ width: 6, height: 6, borderRadius: 99, background: t.primary }} />}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: t.surface, borderRadius: 20, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 14 }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>Notifications</p>
          <Row icon={React.createElement(window.lucide.Bell, { size: 16, color: t.primary })} label="Daily check-in reminder" sub="7:30 PM each evening" right={<Toggle on={notifs} onToggle={() => setNotifs(!notifs)} />} />
          <Row icon={React.createElement(window.lucide.Clock, { size: 16, color: t.primary })} label="Context reminders" sub="After commute, before sleep" right={<Toggle on={contextReminders} onToggle={() => setContextReminders(!contextReminders)} />} />
          <Row icon={React.createElement(window.lucide.Volume2, { size: 16, color: t.primary })} label="Timer sounds" sub="Play audio cues during resets" right={<Toggle on={sound} onToggle={() => setSound(!sound)} />} />
        </div>

        {/* About */}
        <div style={{ background: t.surface, borderRadius: 20, padding: '14px 16px', border: `1px solid ${t.border}` }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 }}>About</p>
          <Row icon={React.createElement(window.lucide.Info, { size: 16, color: t.primary })} label="MoodNest v1.0" sub="Turn your space into support." right={null} />
          <Row icon={React.createElement(window.lucide.Shield, { size: 16, color: t.primary })} label="Privacy" sub="All data stays on your device." right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
          <div style={{ padding: '13px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: t.energyDim || t.warmDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(window.lucide.Heart, { size: 16, color: t.energy || t.warm })}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: t.textSec, lineHeight: 1.4 }}>Made with care for people who deserve a home that supports them.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [themeKey, setThemeKey] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [currentMood, setCurrentMood] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const t = themes[themeKey];

  // Google Font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
  }, []);

  const handleStartRecipe = (recipe) => {
    setActiveRecipe(recipe);
    setActiveTab('reset');
  };

  const navItems = [
    { id: 'home',     icon: 'Home',      label: 'Home'   },
    { id: 'nest',     icon: 'Leaf',      label: 'Nest'   },
    { id: 'reset',    icon: 'Timer',     label: 'Reset'  },
    { id: 'memory',   icon: 'BookOpen',  label: 'Memory' },
    { id: 'settings', icon: 'Settings',  label: 'Me'     },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#DDDDDD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: t.notch, borderRadius: 20, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ padding: '16px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, paddingTop: 54 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home' && (
            <HomeScreen t={t} onStartRecipe={handleStartRecipe} onSetMood={setCurrentMood} currentMood={currentMood} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'nest' && (
            <NestScreen t={t} onStartRecipe={handleStartRecipe} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'reset' && (
            <ResetScreen t={t} activeRecipe={activeRecipe} setActiveRecipe={setActiveRecipe} />
          )}
          {activeTab === 'memory' && (
            <MemoryScreen t={t} />
          )}
          {activeTab === 'settings' && (
            <SettingsScreen t={t} themeKey={themeKey} setThemeKey={setThemeKey} />
          )}
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 20px', borderTop: `1px solid ${t.border}`, background: t.navBg }}>
          {navItems.map(nav => {
            const isActive = activeTab === nav.id;
            const hasIndicator = nav.id === 'reset' && activeRecipe;
            return (
              <button key={nav.id} onClick={() => setActiveTab(nav.id)}
                style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 10px', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                  {React.createElement(window.lucide[nav.icon], { size: 22, color: isActive ? t.primary : t.textMuted, strokeWidth: isActive ? 2.5 : 1.8 })}
                  {hasIndicator && (
                    <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: t.energy || t.warm, border: `1.5px solid ${t.navBg}` }} />
                  )}
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted }}>{nav.label}</span>
                {isActive && <div style={{ width: 4, height: 4, borderRadius: 2, background: t.primary }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
