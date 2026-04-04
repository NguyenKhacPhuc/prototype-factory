const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FFFFFF',
    bgSecondary: '#F5F3EE',
    bgTertiary: '#EDE9E0',
    surface: '#FFFFFF',
    surfaceAlt: '#F9F7F3',
    primary: '#1E3A5F',
    primaryLight: '#2D5490',
    ochre: '#D4882E',
    ochreLight: '#F5C878',
    rose: '#C4748A',
    roseLight: '#EDB8C6',
    teal: '#4A8B8C',
    tealLight: '#9DCBCC',
    text: '#1A1A2E',
    textSecondary: '#5A5A72',
    textMuted: '#9A9AAA',
    border: '#E8E4DC',
    borderStrong: '#D0C8BB',
    navBg: '#1E3A5F',
    navText: '#FFFFFF',
    navInactive: 'rgba(255,255,255,0.45)',
    shadow: 'rgba(30,58,95,0.12)',
  },
  dark: {
    bg: '#0F1E30',
    bgSecondary: '#162840',
    bgTertiary: '#1E3550',
    surface: '#162840',
    surfaceAlt: '#1E3550',
    primary: '#4A85C8',
    primaryLight: '#6AA3E0',
    ochre: '#E8A040',
    ochreLight: '#F5C878',
    rose: '#D88AA0',
    roseLight: '#F0B8CC',
    teal: '#5AABAC',
    tealLight: '#8DCBCC',
    text: '#F0EDE8',
    textSecondary: '#A8B4C4',
    textMuted: '#6A7A8C',
    border: '#243C55',
    borderStrong: '#2E4D6A',
    navBg: '#0A1520',
    navText: '#F0EDE8',
    navInactive: 'rgba(240,237,232,0.4)',
    shadow: 'rgba(0,0,0,0.4)',
  },
};

// ── Icon helpers ──────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) {
  const icons = {
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    grid: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    user: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    zap: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    flame: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    lock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    send: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
    heart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    messageCircle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    sun: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    moon: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    ),
    award: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    target: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    trendingUp: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z"/><path d="M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75z"/>
      </svg>
    ),
  };
  return icons[name] || null;
}

// ── Mosaic tile grid (decorative) ─────────────────────────────────────────────
function MosaicGrid({ t, revealed = 0.42, size = 160 }) {
  const cols = 10;
  const rows = 10;
  const total = cols * rows;
  const colors = [t.primary, t.ochre, t.rose, t.teal, t.primaryLight, t.ochreLight, t.tealLight, t.roseLight];
  const tiles = Array.from({ length: total }, (_, i) => ({
    revealed: i / total < revealed,
    color: colors[i % colors.length],
    delay: (i % cols) * 0.03,
  }));
  const tileSize = size / cols;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`, gap: 1, width: size }}>
      {tiles.map((tile, i) => (
        <div
          key={i}
          style={{
            width: tileSize - 1,
            height: tileSize - 1,
            background: tile.revealed ? tile.color : t.border,
            opacity: tile.revealed ? 1 : 0.35,
            borderRadius: 1,
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, color, bg, height = 6, radius = 3 }) {
  return (
    <div style={{ background: bg, borderRadius: radius, height, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: radius, transition: 'width 0.6s ease' }} />
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ initials, color, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif', fontWeight: 700,
      fontSize: size * 0.35, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// ── Role badge ────────────────────────────────────────────────────────────────
function RoleBadge({ role, t }) {
  const roleColors = {
    Analyst: t.primary,
    Synthesizer: t.teal,
    Illustrator: t.rose,
    Catalyst: t.ochre,
    Architect: t.primaryLight,
  };
  return (
    <span style={{
      background: roleColors[role] || t.primary,
      color: '#fff',
      fontFamily: 'Poppins, sans-serif',
      fontSize: 10,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 2,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    }}>
      {role}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1: HOME
// ─────────────────────────────────────────────────────────────────────────────
function HomeScreen({ t, setActiveScreen }) {
  const [pressed, setPressed] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      {/* Header — asymmetric */}
      <div style={{
        background: t.primary,
        padding: '28px 20px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Geometric accent blocks */}
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: t.ochre, opacity: 0.2, borderRadius: 8, transform: 'rotate(15deg)' }} />
        <div style={{ position: 'absolute', top: 10, right: 30, width: 60, height: 60, background: t.rose, opacity: 0.15, borderRadius: 4, transform: 'rotate(-8deg)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              Saturday · Apr 4
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              Good morning,<br />
              <span style={{ color: t.ochreLight }}>Maya</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 4 }}>
              <Icon name="flame" size={16} color={t.ochreLight} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 800, color: t.ochreLight }}>14</span>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>day streak</div>
          </div>
        </div>

        {/* Mosaic progress strip */}
        <div style={{ marginTop: 20, padding: '12px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Crew Mosaic · 42% revealed
            </span>
            <button
              onClick={() => setActiveScreen('mosaic')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.ochreLight, display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, padding: 0 }}
            >
              <span>View</span>
              <Icon name="chevronRight" size={12} color={t.ochreLight} />
            </button>
          </div>
          <ProgressBar value={42} color={t.ochre} bg="rgba(255,255,255,0.12)" height={5} />
        </div>

        {/* Crew tabs strip */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16, paddingBottom: 0 }}>
          {['🔮 Pixel Forge', '🌊 Flow State', '⚡ Spark Crew'].map((crew, i) => (
            <div
              key={i}
              style={{
                padding: '6px 12px',
                background: i === 0 ? t.ochre : 'rgba(255,255,255,0.1)',
                borderRadius: '6px 6px 0 0',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 11,
                fontWeight: i === 0 ? 700 : 500,
                color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {crew}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Prompt Card — bold geometric */}
      <div style={{ padding: '0 16px', marginTop: 0 }}>
        <div style={{
          background: t.ochre,
          borderRadius: '0 0 12px 12px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 8px 24px ${t.shadow}`,
        }}>
          <div style={{ position: 'absolute', bottom: -15, right: -15, width: 80, height: 80, background: 'rgba(255,255,255,0.12)', borderRadius: 8, transform: 'rotate(12deg)' }} />
          <div style={{ position: 'absolute', top: -10, left: 60, width: 50, height: 50, background: 'rgba(255,255,255,0.08)', borderRadius: 4, transform: 'rotate(-5deg)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Icon name="zap" size={14} color="rgba(255,255,255,0.9)" />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Today's Prompt · Role: Analyst
                </span>
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1.35, marginBottom: 12 }}>
                "Find a pattern hiding in plain sight. Capture it."
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 16 }}>
                Look around you — in textures, shadows, or daily routines. Your observation adds a crucial data layer to the mosaic.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}>
            <button
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onTouchStart={() => setPressed(true)}
              onTouchEnd={() => setPressed(false)}
              onClick={() => setActiveScreen('crew')}
              style={{
                flex: 1,
                background: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                color: t.ochre,
                cursor: 'pointer',
                transform: pressed ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.1s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Icon name="camera" size={16} color={t.ochre} />
              <span>Submit Response</span>
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: 8,
              padding: '12px 14px',
              cursor: 'pointer',
            }}>
              <Icon name="eye" size={16} color="#fff" />
            </button>
          </div>

          {/* Countdown */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>
              Next prompt in 8h 23m · 12 crewmates already responded
            </span>
          </div>
        </div>
      </div>

      {/* Crew Activity — asymmetric layout */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: t.text }}>Crew Activity</span>
          <button onClick={() => setActiveScreen('crew')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: t.primary }}>
            <span>See all</span>
          </button>
        </div>

        {/* Asymmetric feed preview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { name: 'Jordan K.', role: 'Synthesizer', color: t.teal, entry: 'Spiral staircase shadows at noon — repetition in decay', big: true, likes: 8 },
            { name: 'Sam R.', role: 'Illustrator', color: t.rose, entry: 'The coffee ring on my notebook is a perfect orbit', big: false, likes: 5 },
            { name: 'Alex P.', role: 'Catalyst', color: t.ochre, entry: 'Bus stop tiles — imperfect grids everywhere', big: false, likes: 11 },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                gridColumn: item.big ? '1 / -1' : 'auto',
                background: t.surface,
                border: `2px solid ${t.border}`,
                borderRadius: 10,
                padding: '14px',
                cursor: 'pointer',
                transition: 'transform 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar initials={item.name.split(' ').map(n => n[0]).join('')} color={item.color} size={28} />
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: t.text }}>{item.name}</div>
                    <RoleBadge role={item.role} t={t} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Icon name="heart" size={12} color={t.rose} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }}>{item.likes}</span>
                </div>
              </div>
              <div style={{
                background: item.big ? t.bgSecondary : t.bgTertiary,
                borderRadius: 6,
                padding: '10px 12px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                color: t.textSecondary,
                fontStyle: 'italic',
                lineHeight: 1.45,
              }}>
                "{item.entry}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div style={{ padding: '20px 16px 24px' }}>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Next Milestone</div>
        <div style={{
          background: t.primary,
          borderRadius: 12,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, background: t.teal, opacity: 0.15, borderRadius: '50%' }} />
          <div style={{
            width: 44, height: 44, borderRadius: 8,
            background: t.teal,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name="lock" size={20} color="#fff" />
          </div>
          <div style={{ flex: 1, zIndex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              Mosaic Act II Unlocks
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
              8 more contributions needed
            </div>
            <ProgressBar value={68} color={t.tealLight} bg="rgba(255,255,255,0.15)" height={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2: CREW FEED
// ─────────────────────────────────────────────────────────────────────────────
function CrewScreen({ t, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('today');
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (id) => setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const entries = [
    { id: 1, name: 'Jordan K.', initials: 'JK', role: 'Synthesizer', color: t.teal, time: '2h ago', likes: 8, comments: 3, entry: 'Spiral staircase shadows at noon — repetition in decay. Found this near the library. The Fibonacci is unmistakable.', tag: '#geometric #nature', hasImage: true, imageColor: '#9DCBCC' },
    { id: 2, name: 'Sam R.', initials: 'SR', role: 'Illustrator', color: t.rose, time: '3h ago', likes: 5, comments: 1, entry: 'The coffee ring on my notebook is a perfect orbit — the imperfect circle is still a circle.', tag: '#everyday #minimalism', hasImage: false },
    { id: 3, name: 'Alex P.', initials: 'AP', role: 'Catalyst', color: t.ochre, time: '4h ago', likes: 11, comments: 6, entry: 'Bus stop tiles — broken grids everywhere you look. Imperfect grids are still systems.', tag: '#urban #systems', hasImage: true, imageColor: '#F5C878' },
    { id: 4, name: 'Robin T.', initials: 'RT', role: 'Architect', color: t.primaryLight, time: '6h ago', likes: 7, comments: 2, entry: 'My morning routine IS the pattern. Wake, coffee, scroll, desk — same nodes, same edges every day.', tag: '#meta #behaviour', hasImage: false },
    { id: 5, name: 'Casey M.', initials: 'CM', role: 'Analyst', color: t.primary, time: '7h ago', likes: 14, comments: 9, entry: 'The branching of my succulent follows the same angle every time. 137.5°. The golden angle. Nature is obsessed.', tag: '#biology #data', hasImage: true, imageColor: '#4A8B8C' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      {/* Header */}
      <div style={{ background: t.primary, padding: '28px 20px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 120, height: 80, background: t.rose, opacity: 0.15, borderRadius: '60px 0 0 0' }} />
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
          Crew Feed
        </div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
          🔮 Pixel Forge · 16 members
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {['today', 'week', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 0',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.45)',
                borderBottom: activeTab === tab ? `3px solid ${t.ochre}` : '3px solid transparent',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'today' ? "Today's Responses" : tab === 'week' ? 'This Week' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt reminder banner */}
      <div style={{
        background: t.bgSecondary,
        borderLeft: `4px solid ${t.ochre}`,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: t.ochre, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today's Prompt</div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500, color: t.textSecondary, marginTop: 2 }}>
            "Find a pattern hiding in plain sight. Capture it."
          </div>
        </div>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            background: t.ochre,
            border: 'none',
            borderRadius: 6,
            padding: '7px 12px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span>Respond</span>
        </button>
      </div>

      {/* Feed entries */}
      <div style={{ padding: '12px 16px 24px' }}>
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            style={{
              background: t.surface,
              border: `2px solid ${t.border}`,
              borderRadius: 12,
              marginBottom: 14,
              overflow: 'hidden',
            }}
          >
            {/* Entry header */}
            <div style={{ padding: '14px 14px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Avatar initials={entry.initials} color={entry.color} size={36} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: t.text }}>{entry.name}</span>
                    <RoleBadge role={entry.role} t={t} />
                  </div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{entry.time}</div>
                </div>
              </div>
              <div style={{
                width: 10, height: 10, borderRadius: 2,
                background: entry.color,
                marginTop: 4,
                flexShrink: 0,
              }} />
            </div>

            {/* Visual response block */}
            {entry.hasImage && (
              <div style={{
                margin: '12px 14px 0',
                height: 100,
                borderRadius: 8,
                background: entry.imageColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
                <Icon name="camera" size={28} color="rgba(255,255,255,0.6)" />
                <div style={{
                  position: 'absolute',
                  bottom: 8, right: 8,
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 4,
                  padding: '2px 6px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 9,
                  color: '#fff',
                  fontWeight: 600,
                }}>PHOTO</div>
              </div>
            )}

            {/* Entry text */}
            <div style={{ padding: '12px 14px 0' }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.text, lineHeight: 1.55 }}>
                {entry.entry}
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.teal, marginTop: 6, fontWeight: 600 }}>
                {entry.tag}
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: '12px 14px 14px', display: 'flex', gap: 16 }}>
              <button
                onClick={() => toggleLike(entry.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                  color: likedItems[entry.id] ? t.rose : t.textSecondary,
                  padding: 0,
                  transition: 'color 0.2s',
                }}
              >
                <Icon name="heart" size={15} color={likedItems[entry.id] ? t.rose : t.textSecondary} />
                <span>{entry.likes + (likedItems[entry.id] ? 1 : 0)}</span>
              </button>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                color: t.textSecondary, padding: 0,
              }}>
                <Icon name="messageCircle" size={15} color={t.textSecondary} />
                <span>{entry.comments}</span>
              </button>
              <div style={{ flex: 1 }} />
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                color: t.teal, textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                <Icon name="sparkles" size={12} color={t.teal} />
                <span>Adds to mosaic</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3: MOSAIC
// ─────────────────────────────────────────────────────────────────────────────
function MosaicScreen({ t }) {
  const [unlocking, setUnlocking] = useState(false);
  const [revealPct, setRevealPct] = useState(42);

  const handleReveal = () => {
    setUnlocking(true);
    setTimeout(() => {
      setRevealPct(Math.min(revealPct + 5, 100));
      setUnlocking(false);
    }, 1200);
  };

  const milestones = [
    { pct: 25, label: 'Act I', title: 'The Seed', unlocked: true, color: t.teal },
    { pct: 50, label: 'Act II', title: 'Emergence', unlocked: false, color: t.ochre },
    { pct: 75, label: 'Act III', title: 'Convergence', unlocked: false, color: t.rose },
    { pct: 100, label: 'Finale', title: 'The Revelation', unlocked: false, color: t.primary },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      {/* Header */}
      <div style={{ background: t.primary, padding: '28px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 100, background: t.ochre, opacity: 0.12, borderRadius: '0 0 0 80px' }} />
        <div style={{ position: 'absolute', bottom: 0, left: -20, width: 90, height: 90, background: t.teal, opacity: 0.1, borderRadius: '50%' }} />
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🔮 Pixel Forge</div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
          Mystery Mosaic
        </div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
          True nature: <span style={{ color: t.ochreLight, fontWeight: 700 }}>???</span> — keep contributing to reveal
        </div>
      </div>

      {/* Mosaic visual — centered, asymmetric surrounding info */}
      <div style={{ padding: '24px 16px 0' }}>
        {/* Big asymmetric layout: mosaic left, stats right */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
          {/* Mosaic grid */}
          <div style={{
            background: t.surface,
            border: `2px solid ${t.border}`,
            borderRadius: 12,
            padding: 12,
            flexShrink: 0,
          }}>
            <MosaicGrid t={t} revealed={revealPct / 100} size={150} />
            <div style={{
              marginTop: 10, textAlign: 'center',
              fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
              color: t.primary,
            }}>
              {revealPct}% revealed
            </div>
          </div>

          {/* Stats column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Contributions', value: '84', icon: 'sparkles', color: t.ochre },
              { label: 'Active Members', value: '12', icon: 'users', color: t.teal },
              { label: 'Days Running', value: '31', icon: 'flame', color: t.rose },
              { label: 'Crew Rank', value: '#4', icon: 'trendingUp', color: t.primary },
            ].map((stat, i) => (
              <div key={i} style={{
                background: t.surface,
                border: `2px solid ${t.border}`,
                borderRadius: 8,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: stat.color + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon name={stat.icon} size={14} color={stat.color} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 800, color: t.text, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textMuted, marginTop: 2, fontWeight: 500 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlock button */}
        <button
          onClick={handleReveal}
          disabled={unlocking}
          style={{
            width: '100%',
            background: unlocking ? t.teal : t.primary,
            border: 'none',
            borderRadius: 10,
            padding: '14px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
            cursor: unlocking ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.3s',
            marginBottom: 24,
          }}
        >
          <Icon name={unlocking ? 'sparkles' : 'eye'} size={18} color="#fff" />
          <span>{unlocking ? 'Revealing…' : 'Simulate Reveal (+5%)'}</span>
        </button>

        {/* Act milestones */}
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 14 }}>
          Mosaic Acts
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {milestones.map((m, i) => (
            <div
              key={i}
              style={{
                background: m.unlocked ? t.surface : t.bgSecondary,
                border: `2px solid ${m.unlocked ? m.color : t.border}`,
                borderRadius: 10,
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: m.unlocked ? 1 : 0.7,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 8,
                background: m.unlocked ? m.color : t.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name={m.unlocked ? 'sparkles' : 'lock'} size={18} color={m.unlocked ? '#fff' : t.textMuted} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: m.unlocked ? t.text : t.textSecondary }}>{m.title}</span>
                  <span style={{
                    background: m.unlocked ? m.color : t.border,
                    color: m.unlocked ? '#fff' : t.textMuted,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '1px 7px',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>{m.label}</span>
                </div>
                <ProgressBar value={m.unlocked ? 100 : revealPct >= m.pct ? 100 : (revealPct / m.pct) * 100} color={m.color} bg={t.bgTertiary} height={4} />
              </div>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: t.textMuted }}>{m.pct}%</span>
            </div>
          ))}
        </div>

        {/* Recent pixel contributions */}
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>
          Recent Contributions
        </div>
        {[
          { name: 'Casey M.', initials: 'CM', color: t.primary, tile: 'Data Layer #42', added: '2h ago', tileColor: t.teal },
          { name: 'Jordan K.', initials: 'JK', color: t.teal, tile: 'Pattern Segment #38', added: '3h ago', tileColor: t.rose },
          { name: 'Alex P.', initials: 'AP', color: t.ochre, tile: 'Context Block #35', added: '5h ago', tileColor: t.ochre },
        ].map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
            background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: '10px 12px',
          }}>
            <Avatar initials={c.initials} color={c.color} size={30} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: t.text }}>{c.name}</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textMuted }}>{c.tile}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: 2, background: c.tileColor }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textMuted }}>{c.added}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 4: PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark }) {
  const [selectedRole, setSelectedRole] = useState('Analyst');
  const roles = [
    { name: 'Analyst', desc: 'Surface patterns & insights', color: t.primary, icon: 'target' },
    { name: 'Synthesizer', desc: 'Connect disparate ideas', color: t.teal, icon: 'sparkles' },
    { name: 'Illustrator', desc: 'Visualize & express', color: t.rose, icon: 'star' },
    { name: 'Catalyst', desc: 'Energize the crew', color: t.ochre, icon: 'zap' },
    { name: 'Architect', desc: 'Structure the vision', color: t.primaryLight, icon: 'grid' },
  ];

  const achievements = [
    { label: '14-Day Streak', icon: 'flame', color: t.ochre, unlocked: true },
    { label: 'Pattern Seeker', icon: 'eye', color: t.teal, unlocked: true },
    { label: 'First Mosaic', icon: 'grid', color: t.rose, unlocked: true },
    { label: 'Crew Builder', icon: 'users', color: t.primary, unlocked: false },
    { label: 'Grand Reveal', icon: 'sparkles', color: t.ochre, unlocked: false },
    { label: '100 Contributions', icon: 'award', color: t.teal, unlocked: false },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      {/* Profile hero */}
      <div style={{
        background: t.primary,
        padding: '28px 20px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Geometric backdrop */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, background: t.rose, opacity: 0.1, borderRadius: 20, transform: 'rotate(20deg)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: 80, width: 100, height: 100, background: t.teal, opacity: 0.1, borderRadius: '50%' }} />

        {/* Theme toggle */}
        <div style={{ position: 'absolute', top: 24, right: 20, zIndex: 2 }}>
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.25)',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 11, fontWeight: 700, color: '#fff',
            }}
          >
            <Icon name={isDark ? 'sun' : 'moon'} size={14} color="#fff" />
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 14,
            background: t.ochre,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 24, color: '#fff',
            flexShrink: 0,
            border: '3px solid rgba(255,255,255,0.3)',
          }}>
            M
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 800, color: '#fff' }}>Maya Chen</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <RoleBadge role={selectedRole} t={{ ...t, primary: t.ochre, teal: t.tealLight, rose: t.roseLight, ochre: '#fff' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>@maya_patterns</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20, position: 'relative', zIndex: 1 }}>
          {[
            { value: '84', label: 'Contributions' },
            { value: '14', label: 'Day Streak' },
            { value: '3', label: 'Mosaics' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff' }}>{s.value}</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* Role selection */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>
            Your Role
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {roles.map((role) => (
              <button
                key={role.name}
                onClick={() => setSelectedRole(role.name)}
                style={{
                  background: selectedRole === role.name ? role.color + '14' : t.surface,
                  border: `2px solid ${selectedRole === role.name ? role.color : t.border}`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: selectedRole === role.name ? role.color : t.bgTertiary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}>
                  <Icon name={role.icon} size={16} color={selectedRole === role.name ? '#fff' : t.textMuted} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: selectedRole === role.name ? role.color : t.text }}>{role.name}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary, marginTop: 1 }}>{role.desc}</div>
                </div>
                {selectedRole === role.name && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: role.color, flexShrink: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements — asymmetric grid */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>
            Achievements
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {achievements.map((ach, i) => (
              <div
                key={i}
                style={{
                  background: ach.unlocked ? t.surface : t.bgSecondary,
                  border: `2px solid ${ach.unlocked ? ach.color + '40' : t.border}`,
                  borderRadius: 10,
                  padding: '14px 10px',
                  textAlign: 'center',
                  opacity: ach.unlocked ? 1 : 0.55,
                  gridColumn: i === 0 ? '1 / span 1' : 'auto',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: ach.unlocked ? ach.color : t.border,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px',
                }}>
                  <Icon name={ach.icon} size={18} color={ach.unlocked ? '#fff' : t.textMuted} />
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: ach.unlocked ? t.text : t.textMuted, lineHeight: 1.3 }}>{ach.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly activity heatmap */}
        <div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Activity · Last 4 Weeks</div>
          <div style={{ background: t.surface, border: `2px solid ${t.border}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} style={{ fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 600, color: t.textMuted, textAlign: 'center' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: 28 }, (_, i) => {
                const activityLevels = [0, 1, 2, 3, 2, 1, 0, 1, 3, 2, 1, 3, 2, 0, 1, 2, 3, 3, 2, 1, 0, 2, 3, 2, 3, 3, 2, 1];
                const level = activityLevels[i] || 0;
                const bgColors = [t.border, t.primary + '30', t.primary + '60', t.primary];
                return (
                  <div key={i} style={{
                    aspectRatio: '1',
                    borderRadius: 3,
                    background: bgColors[level],
                    transition: 'background 0.2s',
                  }} />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    crew: CrewScreen,
    mosaic: MosaicScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'crew', label: 'Crew', icon: 'users' },
    { id: 'mosaic', label: 'Mosaic', icon: 'grid' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];

  const ActiveScreen = screens[activeScreen];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; }
        button { outline: none; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 0 0 8px #1A1A1A, 0 0 0 10px #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background 0.3s ease',
      }}>
        {/* Content area */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <ActiveScreen
            t={t}
            setActiveScreen={setActiveScreen}
            isDark={isDark}
            setIsDark={setIsDark}
          />
        </div>

        {/* Bottom navigation */}
        <div style={{
          background: t.navBg,
          display: 'flex',
          paddingBottom: 8,
          paddingTop: 4,
          borderTop: `2px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}`,
          flexShrink: 0,
        }}>
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  padding: '8px 4px',
                  transition: 'transform 0.15s',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    width: 28,
                    height: 3,
                    background: t.ochre,
                    borderRadius: '0 0 3px 3px',
                    top: 0,
                    marginBottom: 4,
                  }} />
                )}
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: isActive ? t.ochre : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}>
                  <Icon
                    name={item.icon}
                    size={18}
                    color={isActive ? '#fff' : t.navInactive}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </div>
                <span style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? t.navText : t.navInactive,
                  transition: 'color 0.2s',
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
