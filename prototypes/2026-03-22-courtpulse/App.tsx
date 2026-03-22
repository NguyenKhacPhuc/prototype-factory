const { useState, useEffect, useRef } = React;

// ─── Fonts ────────────────────────────────────────────────────────────────────
const fontStyle = document.createElement('style');
fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`;
document.head.appendChild(fontStyle);

// ─── Themes ──────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#EDF4EE',
    surface: '#FFFFFF',
    surfaceAlt: '#F4FAF5',
    surfaceElevated: '#FFFFFF',
    text: '#0C1810',
    textSecondary: '#3D5A45',
    textMuted: '#8BA896',
    primary: '#00C896',
    primaryDark: '#009E78',
    primaryLight: '#D6FAF0',
    primaryGrad: 'linear-gradient(135deg, #00C896, #00A87E)',
    secondary: '#FF6B35',
    secondaryLight: '#FFF0EA',
    accent: '#4B6EFF',
    accentLight: '#EBF0FF',
    border: '#DAE8DC',
    borderLight: '#EDF4EE',
    navBg: '#FFFFFF',
    mapGrass: '#C8E6C9',
    mapPath: '#D7CCC8',
    mapWater: '#B3E5FC',
    mapBuilding: '#CFD8DC',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    success: '#10B981',
    successLight: '#D1FAE5',
    scoreGreen: '#00C896',
    scoreYellow: '#F59E0B',
    scoreRed: '#EF4444',
    shadow: 'rgba(0,0,0,0.08)',
    shadowMd: 'rgba(0,0,0,0.12)',
    overlay: 'rgba(12,24,16,0.4)',
  },
  dark: {
    bg: '#070D08',
    surface: '#101A11',
    surfaceAlt: '#162018',
    surfaceElevated: '#1D2A1F',
    text: '#EAF4EB',
    textSecondary: '#7AAB84',
    textMuted: '#3D5A45',
    primary: '#00D4A1',
    primaryDark: '#00B589',
    primaryLight: '#002D22',
    primaryGrad: 'linear-gradient(135deg, #00D4A1, #00B589)',
    secondary: '#FF7B4D',
    secondaryLight: '#2A1008',
    accent: '#6B8FFF',
    accentLight: '#0D1830',
    border: '#1C2E1F',
    borderLight: '#142018',
    navBg: '#070D08',
    mapGrass: '#0A2210',
    mapPath: '#1A1410',
    mapWater: '#062030',
    mapBuilding: '#101A14',
    danger: '#F87171',
    dangerLight: '#2A0E0E',
    warning: '#FBBF24',
    warningLight: '#2A1A04',
    success: '#34D399',
    successLight: '#042A18',
    scoreGreen: '#00D4A1',
    scoreYellow: '#FBBF24',
    scoreRed: '#F87171',
    shadow: 'rgba(0,0,0,0.3)',
    shadowMd: 'rgba(0,0,0,0.5)',
    overlay: 'rgba(7,13,8,0.7)',
  }
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const COURTS = [
  {
    id: 1, name: 'Riverside Basketball Court', sport: 'basketball',
    distance: '0.3 mi', score: 88, address: 'Riverside Park, North End',
    surface: 'Asphalt', status: 'playable',
    conditions: { wetness: 8, wind: 11, glare: 15, crowding: 30, lighting: 92 },
    reports: ['Surface dry', 'East hoop needs net'], lastReport: '8 min ago',
    openTil: '9:30 PM', players: 3, maxPlayers: 10, lat: 38, lng: 55,
    tip: null,
  },
  {
    id: 2, name: 'Greenway Tennis Courts', sport: 'tennis',
    distance: '0.7 mi', score: 61, address: 'Greenway Sports Complex',
    surface: 'Hard Court', status: 'caution',
    conditions: { wetness: 22, wind: 18, glare: 74, crowding: 55, lighting: 70 },
    reports: ['Serving into glare', 'Court 3 has puddle'], lastReport: '22 min ago',
    openTil: '8:00 PM', players: 8, maxPlayers: 8, lat: 52, lng: 38,
    tip: 'Wait 35 min for sun to drop below tree line',
  },
  {
    id: 3, name: 'Meadowbrook Soccer Field', sport: 'soccer',
    distance: '1.1 mi', score: 34, address: 'Meadowbrook Recreation Area',
    surface: 'Natural Grass', status: 'poor',
    conditions: { wetness: 78, wind: 22, glare: 10, crowding: 15, lighting: 85 },
    reports: ['Goal area flooded', 'Churned up near midfield'], lastReport: '5 min ago',
    openTil: '7:00 PM', players: 2, maxPlayers: 22, lat: 65, lng: 68,
    tip: 'Turf field at Cedar Park is open — 5 blocks away',
  },
  {
    id: 4, name: 'Cedar Park Futsal Cage', sport: 'futsal',
    distance: '1.4 mi', score: 91, address: 'Cedar Park, East Entrance',
    surface: 'Rubber Turf', status: 'playable',
    conditions: { wetness: 5, wind: 8, glare: 20, crowding: 25, lighting: 88 },
    reports: ['Perfect grip', 'Lights just turned on'], lastReport: '3 min ago',
    openTil: '10:00 PM', players: 6, maxPlayers: 12, lat: 75, lng: 30,
    tip: null,
  },
  {
    id: 5, name: 'Harbor View Pickleball', sport: 'pickleball',
    distance: '1.8 mi', score: 73, address: 'Harbor View Recreation Center',
    surface: 'Painted Asphalt', status: 'caution',
    conditions: { wetness: 30, wind: 25, glare: 35, crowding: 60, lighting: 80 },
    reports: ['Some wind gusts', 'Wait list for court 2'], lastReport: '15 min ago',
    openTil: '9:00 PM', players: 12, maxPlayers: 16, lat: 28, lng: 72,
    tip: 'Court 1 opens in ~20 min',
  },
];

const ALERTS = [
  {
    id: 1, type: 'depart', court: 'Riverside Basketball Court', sport: 'basketball',
    message: 'Leave by 5:48 PM to arrive before 6:00 PM', detail: '12 min commute • Court opens at 5:50 PM',
    icon: 'Clock', color: 'primary', time: '5:48 PM', active: true,
  },
  {
    id: 2, type: 'condition', court: 'Greenway Tennis Courts', sport: 'tennis',
    message: 'Glare clears at 6:22 PM', detail: 'Score will jump from 61 → 84 when sun drops',
    icon: 'Sun', color: 'warning', time: '6:22 PM', active: true,
  },
  {
    id: 3, type: 'crowd', court: 'Cedar Park Futsal Cage', sport: 'futsal',
    message: 'Crowd peak predicted at 6:30–7:30 PM', detail: 'Go now or after 7:45 PM for best availability',
    icon: 'Users', color: 'accent', time: '6:30 PM', active: false,
  },
  {
    id: 4, type: 'weather', court: 'Meadowbrook Soccer Field', sport: 'soccer',
    message: 'Field may drain by 8:00 PM', detail: 'Rain stopped 1h ago. Surface recovery in progress.',
    icon: 'Droplets', color: 'info', time: '8:00 PM', active: false,
  },
];

const COMMUNITY_REPORTS = [
  { user: 'Marcus T.', court: 'Riverside Basketball', ago: '8 min', tag: 'Surface dry', sport: 'basketball', positive: true },
  { user: 'Leila K.', court: 'Greenway Tennis Ct 3', ago: '22 min', tag: 'Glare on serve side', sport: 'tennis', positive: false },
  { user: 'Dev P.', court: 'Meadowbrook Field', ago: '5 min', tag: 'Goal area flooded', sport: 'soccer', positive: false },
  { user: 'Ash R.', court: 'Cedar Park Futsal', ago: '3 min', tag: 'Lights on, perfect grip', sport: 'futsal', positive: true },
];

const SPORT_ICONS = { basketball: '🏀', tennis: '🎾', soccer: '⚽', futsal: '⚽', pickleball: '🏓', all: '🏅' };
const SPORT_LABELS = { basketball: 'Basketball', tennis: 'Tennis', soccer: 'Soccer', futsal: 'Futsal', pickleball: 'Pickleball', all: 'All Sports' };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getScoreColor(score, t) {
  if (score >= 75) return t.scoreGreen;
  if (score >= 50) return t.scoreYellow;
  return t.scoreRed;
}
function getScoreLabel(score) {
  if (score >= 75) return 'Playable';
  if (score >= 50) return 'Caution';
  return 'Poor';
}
function getStatusBg(status, t) {
  if (status === 'playable') return t.successLight;
  if (status === 'caution') return t.warningLight;
  return t.dangerLight;
}
function getStatusColor(status, t) {
  if (status === 'playable') return t.success;
  if (status === 'caution') return t.warning;
  return t.danger;
}

// ─── PlayabilityRing ─────────────────────────────────────────────────────────
function PlayabilityRing({ score, size = 52, stroke = 5, t }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = getScoreColor(score, t);
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.border} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size * 0.27, fontWeight: 700, color, lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  );
}

// ─── ConditionBar ─────────────────────────────────────────────────────────────
function ConditionBar({ label, value, invert = false, t }) {
  const score = invert ? 100 - value : 100 - value;
  const color = getScoreColor(score, t);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>{value}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: t.border, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 3, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

// ─── SportPill ────────────────────────────────────────────────────────────────
function SportPill({ sport, active, onClick, t }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 5, padding: '7px 13px',
        borderRadius: 20, border: active ? 'none' : `1.5px solid ${t.border}`,
        background: active ? t.primary : t.surface,
        color: active ? '#fff' : t.textSecondary,
        fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk',
        transform: pressed ? 'scale(0.93)' : 'scale(1)',
        transition: 'all 0.15s ease', whiteSpace: 'nowrap', flexShrink: 0,
        boxShadow: active ? `0 2px 8px ${t.primary}44` : 'none',
      }}>
      <span>{SPORT_ICONS[sport]}</span>
      <span>{SPORT_LABELS[sport]}</span>
    </button>
  );
}

// ─── CourtCard ────────────────────────────────────────────────────────────────
function CourtCard({ court, onClick, t }) {
  const [pressed, setPressed] = useState(false);
  const Icon = window.lucide;
  return (
    <div
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      style={{
        background: t.surface, borderRadius: 16, padding: '14px 16px',
        marginBottom: 10, cursor: 'pointer', border: `1.5px solid ${t.border}`,
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
        boxShadow: pressed ? 'none' : `0 2px 12px ${t.shadow}`,
      }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <PlayabilityRing score={court.score} t={t} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.3, flex: 1, marginRight: 8 }}>{court.name}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: getStatusColor(court.status, t),
              background: getStatusBg(court.status, t), padding: '3px 8px', borderRadius: 10, flexShrink: 0 }}>
              {getScoreLabel(court.score)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: t.textMuted }}>{SPORT_ICONS[court.sport]} {SPORT_LABELS[court.sport]}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: t.textMuted }}/>
            <span style={{ fontSize: 11, color: t.textMuted }}>{court.distance}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: t.textMuted }}/>
            <span style={{ fontSize: 11, color: t.textMuted }}>Open til {court.openTil}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {court.reports.map((r, i) => (
              <span key={i} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8,
                background: t.surfaceAlt, color: t.textSecondary, border: `1px solid ${t.border}` }}>{r}</span>
            ))}
          </div>
        </div>
      </div>
      {court.tip && (
        <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 10,
          background: t.accentLight, borderLeft: `3px solid ${t.accent}`,
          display: 'flex', alignItems: 'center', gap: 7 }}>
          <Icon.Zap size={13} color={t.accent} />
          <span style={{ fontSize: 11, color: t.accent, fontWeight: 600 }}>{court.tip}</span>
        </div>
      )}
    </div>
  );
}

// ─── MapPin ───────────────────────────────────────────────────────────────────
function MapPin({ court, active, onClick, t }) {
  const color = getScoreColor(court.score, t);
  return (
    <div onClick={onClick} style={{
      position: 'absolute', left: `${court.lng}%`, top: `${court.lat}%`,
      transform: 'translate(-50%, -100%)', cursor: 'pointer', zIndex: active ? 10 : 5,
    }}>
      <div style={{
        background: active ? color : t.surface, border: `2.5px solid ${color}`,
        borderRadius: active ? '12px 12px 12px 0' : '50%',
        width: active ? 'auto' : 28, height: active ? 'auto' : 28,
        padding: active ? '5px 9px' : 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 3px 10px ${color}55`, transition: 'all 0.2s ease',
        gap: 4,
      }}>
        {active ? (
          <>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>
              {SPORT_ICONS[court.sport]} {court.score}
            </span>
          </>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 700, color }}>
            {court.score}
          </span>
        )}
      </div>
      {active && <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent', borderTop: `7px solid ${color}`, marginLeft: 4 }} />}
    </div>
  );
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [filter, setFilter] = useState('all');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const Icon = window.lucide;

  const filtered = filter === 'all' ? COURTS : COURTS.filter(c => c.sport === filter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 10px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted, fontWeight: 500 }}>📍 Lower East Side, NY</p>
            <h2 style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 700, color: t.text }}>Nearby Courts</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ background: t.surfaceAlt, borderRadius: 12, padding: '8px 10px',
              display: 'flex', alignItems: 'center', gap: 6, border: `1.5px solid ${t.border}` }}>
              <Icon.Search size={14} color={t.textMuted} />
              <span style={{ fontSize: 12, color: t.textMuted }}>Search</span>
            </div>
          </div>
        </div>
        {/* Weather banner */}
        <div style={{ background: t.primaryGrad, borderRadius: 14, padding: '10px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>⛅</span>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#fff' }}>Partly Cloudy · 68°F</p>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Wind 11 mph · Humidity 45% · Sunset 7:42 PM</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Overall</p>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>Good</p>
          </div>
        </div>
        {/* Sport filters */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {['all', 'basketball', 'tennis', 'soccer', 'futsal', 'pickleball'].map(s => (
            <SportPill key={s} sport={s} active={filter === s} onClick={() => setFilter(s)} t={t} />
          ))}
        </div>
      </div>

      {/* Court list */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: t.textSecondary }}>
            {filtered.length} venue{filtered.length !== 1 ? 's' : ''} found
          </span>
          <span style={{ fontSize: 11, color: t.textMuted }}>Updated just now</span>
        </div>
        {filtered.map(court => (
          <CourtCard key={court.id} court={court} t={t} onClick={() => setSelectedCourt(court)} />
        ))}
      </div>

      {/* Court Detail Modal */}
      {selectedCourt && (
        <div style={{ position: 'absolute', inset: 0, background: t.overlay, zIndex: 50,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedCourt(null); }}>
          <div style={{ background: t.surface, borderRadius: '20px 20px 0 0', maxHeight: '80%', overflowY: 'auto',
            padding: '0 0 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border }} />
            </div>
            <div style={{ padding: '0 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: t.text }}>{selectedCourt.name}</h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: t.textMuted }}>{selectedCourt.address}</p>
                </div>
                <PlayabilityRing score={selectedCourt.score} size={58} t={t} />
              </div>
              {/* Status */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                {[
                  { label: 'Surface', val: selectedCourt.surface },
                  { label: 'Players', val: `${selectedCourt.players}/${selectedCourt.maxPlayers}` },
                  { label: 'Open until', val: selectedCourt.openTil },
                  { label: 'Last report', val: selectedCourt.lastReport },
                ].map(item => (
                  <div key={item.label} style={{ background: t.surfaceAlt, borderRadius: 10, padding: '7px 12px',
                    border: `1px solid ${t.border}`, flex: 1, minWidth: 80, textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 10, color: t.textMuted, fontWeight: 500 }}>{item.label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 700, color: t.text }}>{item.val}</p>
                  </div>
                ))}
              </div>
              {/* Conditions */}
              <div style={{ background: t.surfaceAlt, borderRadius: 14, padding: '13px 14px', marginBottom: 14,
                border: `1px solid ${t.border}` }}>
                <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: t.text }}>Condition Breakdown</p>
                <ConditionBar label="Surface Wetness" value={selectedCourt.conditions.wetness} t={t} />
                <ConditionBar label="Wind Interference" value={selectedCourt.conditions.wind} t={t} />
                <ConditionBar label="Glare / Visibility" value={selectedCourt.conditions.glare} t={t} />
                <ConditionBar label="Crowding" value={selectedCourt.conditions.crowding} t={t} />
              </div>
              {/* Tip */}
              {selectedCourt.tip && (
                <div style={{ background: t.accentLight, borderRadius: 12, padding: '10px 13px',
                  display: 'flex', gap: 9, alignItems: 'center', marginBottom: 14,
                  border: `1px solid ${t.accent}33` }}>
                  <Icon.Zap size={16} color={t.accent} />
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.accent }}>{selectedCourt.tip}</p>
                </div>
              )}
              {/* Report buttons */}
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: t.text }}>Quick Report</p>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 14 }}>
                {['Surface dry ✅', 'Slick / wet ⚠️', 'Too crowded 👥', 'Great conditions 🏆'].map(r => (
                  <ReportButton key={r} label={r} t={t} />
                ))}
              </div>
              {/* Get Directions */}
              <button style={{ width: '100%', padding: '13px', borderRadius: 14, border: 'none',
                background: t.primaryGrad, color: '#fff', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Space Grotesk',
                boxShadow: `0 4px 16px ${t.primary}55` }}>
                🧭  Get Directions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportButton({ label, t }) {
  const [pressed, setPressed] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onClick={() => { setDone(true); setTimeout(() => setDone(false), 1500); }}
      style={{ padding: '7px 12px', borderRadius: 20, border: `1.5px solid ${done ? t.primary : t.border}`,
        background: done ? t.primaryLight : t.surfaceAlt, color: done ? t.primary : t.textSecondary,
        fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk',
        transform: pressed ? 'scale(0.93)' : 'scale(1)', transition: 'all 0.15s ease' }}>
      {done ? '✓ Sent!' : label}
    </button>
  );
}

// ─── Screen: Map ──────────────────────────────────────────────────────────────
function MapScreen({ t }) {
  const [activePin, setActivePin] = useState(null);
  const [filter, setFilter] = useState('all');
  const Icon = window.lucide;

  const filtered = filter === 'all' ? COURTS : COURTS.filter(c => c.sport === filter);
  const activeCourt = COURTS.find(c => c.id === activePin);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 10px', background: t.surface, borderBottom: `1px solid ${t.border}`, zIndex: 10 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 700, color: t.text }}>Court Map</h2>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {['all', 'basketball', 'tennis', 'soccer', 'futsal'].map(s => (
            <SportPill key={s} sport={s} active={filter === s} onClick={() => setFilter(s)} t={t} />
          ))}
        </div>
      </div>

      {/* Map area */}
      <div style={{ flex: 1, position: 'relative', background: t.mapGrass, overflow: 'hidden' }}>
        {/* Map decorations */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Paths */}
          <div style={{ position: 'absolute', left: '30%', top: 0, width: 8, height: '100%', background: t.mapPath, opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '40%', left: 0, width: '100%', height: 8, background: t.mapPath, opacity: 0.6 }} />
          <div style={{ position: 'absolute', left: '70%', top: '40%', width: 8, height: '60%', background: t.mapPath, opacity: 0.6 }} />
          {/* Water feature */}
          <div style={{ position: 'absolute', left: '35%', top: '55%', width: 60, height: 40,
            background: t.mapWater, borderRadius: '50%', opacity: 0.7 }} />
          {/* Buildings */}
          <div style={{ position: 'absolute', left: '15%', top: '15%', width: 40, height: 35,
            background: t.mapBuilding, borderRadius: 4, opacity: 0.8 }} />
          <div style={{ position: 'absolute', left: '78%', top: '10%', width: 30, height: 25,
            background: t.mapBuilding, borderRadius: 4, opacity: 0.8 }} />
          {/* Trees */}
          {[[8,20],[12,50],[25,75],[85,45],[90,75],[42,80],[55,20],[68,55]].map(([l,t2], i) => (
            <div key={i} style={{ position: 'absolute', left: `${l}%`, top: `${t2}%`,
              width: 14, height: 14, background: '#2D7A3A', borderRadius: '50%', opacity: 0.5 }} />
          ))}
        </div>

        {/* Court pins */}
        {filtered.map(court => (
          <MapPin key={court.id} court={court} active={activePin === court.id}
            onClick={() => setActivePin(activePin === court.id ? null : court.id)} t={t} />
        ))}

        {/* Legend */}
        <div style={{ position: 'absolute', top: 10, right: 12, background: t.surface + 'EE',
          borderRadius: 12, padding: '8px 10px', border: `1px solid ${t.border}` }}>
          {[[t.scoreGreen, '75+'], [t.scoreYellow, '50–74'], [t.scoreRed, '<50']].map(([c, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              <span style={{ fontSize: 10, color: t.textSecondary, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom panel */}
      <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, padding: '12px 16px',
        maxHeight: activeCourt ? 200 : 80, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        {activeCourt ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>{activeCourt.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: t.textMuted }}>
                  {SPORT_ICONS[activeCourt.sport]} {activeCourt.distance} · {activeCourt.reports[0]}
                </p>
              </div>
              <PlayabilityRing score={activeCourt.score} size={44} stroke={4} t={t} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: 12, border: `1.5px solid ${t.border}`,
                background: t.surfaceAlt, color: t.textSecondary, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Space Grotesk' }}>
                Details
              </button>
              <button style={{ flex: 2, padding: '10px', borderRadius: 12, border: 'none',
                background: t.primaryGrad, color: '#fff', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Space Grotesk' }}>
                🧭 Go Here
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Icon.MapPin size={18} color={t.textMuted} style={{ marginBottom: 4 }} />
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted }}>Tap a court pin to see details</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Alerts ──────────────────────────────────────────────────────────
function AlertsScreen({ t }) {
  const [activeAlerts, setActiveAlerts] = useState(
    ALERTS.reduce((acc, a) => ({ ...acc, [a.id]: a.active }), {})
  );
  const Icon = window.lucide;

  const alertColor = (color, t) => ({
    primary: t.primary, warning: t.warning, accent: t.accent, info: t.accent,
  }[color] || t.primary);

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: t.text }}>Smart Alerts</h2>
        <p style={{ margin: 0, fontSize: 12, color: t.textMuted }}>Departure times & condition updates</p>
      </div>

      <div style={{ padding: '14px 16px' }}>
        {/* Depart Now card */}
        <div style={{ background: t.primaryGrad, borderRadius: 18, padding: '16px 18px', marginBottom: 16,
          boxShadow: `0 4px 20px ${t.primary}44` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon.Zap size={16} color="rgba(255,255,255,0.9)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>BEST TIME TO LEAVE</span>
          </div>
          <p style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, color: '#fff' }}>Leave by 5:48 PM</p>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            Riverside Basketball · 12 min away · Score 88 right now
          </p>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon.Clock size={13} color="rgba(255,255,255,0.9)" />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
              Court stays dry until ~7:30 PM · Current time is 5:36 PM
            </span>
          </div>
        </div>

        {/* Alert list */}
        <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: t.text }}>Your Alerts</p>
        {ALERTS.map(alert => {
          const color = alertColor(alert.color, t);
          const isActive = activeAlerts[alert.id];
          return (
            <div key={alert.id} style={{ background: t.surface, borderRadius: 14, padding: '13px 14px',
              marginBottom: 10, border: `1.5px solid ${isActive ? color + '40' : t.border}`,
              boxShadow: `0 2px 8px ${t.shadow}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? color + '20' : t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {alert.icon === 'Clock' && <Icon.Clock size={17} color={isActive ? color : t.textMuted} />}
                  {alert.icon === 'Sun' && <Icon.Sun size={17} color={isActive ? color : t.textMuted} />}
                  {alert.icon === 'Users' && <Icon.Users size={17} color={isActive ? color : t.textMuted} />}
                  {alert.icon === 'Droplets' && <Icon.Droplets size={17} color={isActive ? color : t.textMuted} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 700,
                        color: isActive ? t.text : t.textMuted }}>{alert.message}</p>
                      <p style={{ margin: '0 0 4px', fontSize: 11, color: t.textMuted }}>{alert.detail}</p>
                      <span style={{ fontSize: 10, color: color, fontWeight: 600,
                        background: color + '20', padding: '2px 7px', borderRadius: 8 }}>
                        {SPORT_ICONS[alert.sport]} {alert.court}
                      </span>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => setActiveAlerts(p => ({ ...p, [alert.id]: !p[alert.id] }))}
                      style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
                        background: isActive ? t.primary : t.border,
                        position: 'relative', transition: 'background 0.2s', flexShrink: 0, marginLeft: 10, marginTop: 2 }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff',
                        position: 'absolute', top: 3, left: isActive ? 21 : 3,
                        transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Community Reports */}
        <p style={{ margin: '16px 0 10px', fontSize: 13, fontWeight: 700, color: t.text }}>Live Community Reports</p>
        {COMMUNITY_REPORTS.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
            borderBottom: i < COMMUNITY_REPORTS.length - 1 ? `1px solid ${t.border}` : 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: r.positive ? t.primaryLight : t.dangerLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              fontSize: 14, fontWeight: 700, color: r.positive ? t.primary : t.danger }}>
              {r.user[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{r.user}</span>
                <span style={{ fontSize: 10, color: t.textMuted }}>{r.ago}</span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: t.textSecondary }}>
                <span style={{ marginRight: 4 }}>{SPORT_ICONS[r.sport]}</span>
                <span style={{ fontWeight: 600, color: r.positive ? t.primary : t.danger }}>"{r.tag}"</span>
                <span style={{ color: t.textMuted }}> at {r.court}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Profile ─────────────────────────────────────────────────────────
function ProfileScreen({ t, darkMode, setDarkMode }) {
  const Icon = window.lucide;
  const sports = ['basketball', 'tennis', 'soccer'];
  const [favSports, setFavSports] = useState(['basketball', 'tennis']);
  const [notifs, setNotifs] = useState({ depart: true, crowd: true, weather: false, reports: true });

  const SettingRow = ({ icon, label, value, toggle, onToggle, muted }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
      borderBottom: `1px solid ${t.border}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: muted ? t.textMuted : t.text }}>{label}</p>
        {value && <p style={{ margin: '1px 0 0', fontSize: 11, color: t.textMuted }}>{value}</p>}
      </div>
      {toggle !== undefined ? (
        <button onClick={onToggle} style={{ width: 40, height: 22, borderRadius: 11, border: 'none',
          cursor: 'pointer', background: toggle ? t.primary : t.border, position: 'relative', transition: 'background 0.2s' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 3, left: toggle ? 21 : 3, transition: 'left 0.2s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
        </button>
      ) : (
        <Icon.ChevronRight size={16} color={t.textMuted} />
      )}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '14px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: t.text }}>Profile</h2>
        <p style={{ margin: 0, fontSize: 12, color: t.textMuted }}>Preferences & settings</p>
      </div>

      <div style={{ padding: '14px 16px' }}>
        {/* User card */}
        <div style={{ background: t.primaryGrad, borderRadius: 18, padding: '18px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏃</div>
          <div>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#fff' }}>Alex Rivera</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              47 reports · 12 courts saved
            </p>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              {['🏀', '🎾', '⚽'].map(s => (
                <span key={s} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8,
                  padding: '2px 7px', fontSize: 12 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Fav sports */}
        <div style={{ background: t.surface, borderRadius: 14, padding: '13px 14px', marginBottom: 12,
          border: `1.5px solid ${t.border}` }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: t.text }}>Favorite Sports</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {['basketball', 'tennis', 'soccer', 'futsal'].map(s => {
              const fav = favSports.includes(s);
              return (
                <button key={s} onClick={() => setFavSports(p => fav ? p.filter(x => x !== s) : [...p, s])}
                  style={{ padding: '7px 12px', borderRadius: 12, border: `1.5px solid ${fav ? t.primary : t.border}`,
                    background: fav ? t.primaryLight : t.surfaceAlt, color: fav ? t.primary : t.textSecondary,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk',
                    transition: 'all 0.15s' }}>
                  {SPORT_ICONS[s]} {SPORT_LABELS[s]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appearance */}
        <div style={{ background: t.surface, borderRadius: 14, padding: '4px 14px', marginBottom: 12,
          border: `1.5px solid ${t.border}` }}>
          <p style={{ margin: '12px 0 4px', fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>Appearance</p>
          <SettingRow
            icon={darkMode ? <Icon.Moon size={16} color={t.accent} /> : <Icon.Sun size={16} color={t.warning} />}
            label="Dark Mode"
            value={darkMode ? 'Dark theme active' : 'Light theme active'}
            toggle={darkMode}
            onToggle={() => setDarkMode(p => !p)}
          />
        </div>

        {/* Notifications */}
        <div style={{ background: t.surface, borderRadius: 14, padding: '4px 14px', marginBottom: 12,
          border: `1.5px solid ${t.border}` }}>
          <p style={{ margin: '12px 0 4px', fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>Notifications</p>
          <SettingRow icon={<Icon.Clock size={16} color={t.primary} />}
            label="Departure Alerts" value="Notifies when to leave" toggle={notifs.depart}
            onToggle={() => setNotifs(p => ({ ...p, depart: !p.depart }))} />
          <SettingRow icon={<Icon.Users size={16} color={t.accent} />}
            label="Crowd Warnings" value="When courts get busy" toggle={notifs.crowd}
            onToggle={() => setNotifs(p => ({ ...p, crowd: !p.crowd }))} />
          <SettingRow icon={<Icon.CloudRain size={16} color={t.warning} />}
            label="Weather Alerts" value="Rain & condition changes" toggle={notifs.weather}
            onToggle={() => setNotifs(p => ({ ...p, weather: !p.weather }))} />
          <SettingRow icon={<Icon.MessageCircle size={16} color={t.secondary} />}
            label="Community Reports" value="Nearby player updates" toggle={notifs.reports}
            onToggle={() => setNotifs(p => ({ ...p, reports: !p.reports }))} />
        </div>

        {/* Other settings */}
        <div style={{ background: t.surface, borderRadius: 14, padding: '4px 14px', marginBottom: 20,
          border: `1.5px solid ${t.border}` }}>
          <p style={{ margin: '12px 0 4px', fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>Account</p>
          <SettingRow icon={<Icon.MapPin size={16} color={t.primary} />} label="Home Location" value="Lower East Side, NY" />
          <SettingRow icon={<Icon.Navigation size={16} color={t.accent} />} label="Commute Radius" value="1.5 miles" />
          <SettingRow icon={<Icon.Star size={16} color={t.warning} />} label="Saved Courts" value="12 courts" />
          <SettingRow icon={<Icon.LogOut size={16} color={t.danger} />} label="Sign Out" muted />
        </div>

        <p style={{ textAlign: 'center', fontSize: 10, color: t.textMuted, marginBottom: 10 }}>
          CourtPulse v1.0.0 · Know when every court is actually playable.
        </p>
      </div>
    </div>
  );
}

// ─── StatusBar ────────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const [time, setTime] = useState('5:36');
  const Icon = window.lucide;
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px 0 24px', background: t.surface }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' }}>{time} PM</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Icon.Wifi size={13} color={t.text} />
        <Icon.Signal size={13} color={t.text} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 12 }}>
            {[4,7,10,13].map((h, i) => (
              <div key={i} style={{ width: 3, height: h, background: t.text, borderRadius: 1 }} />
            ))}
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, color: t.text, marginLeft: 3 }}>87%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ activeTab, setActiveTab, t }) {
  const Icon = window.lucide;
  const tabs = [
    { id: 'home', label: 'Nearby', icon: 'Home' },
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'alerts', label: 'Alerts', icon: 'Bell', badge: 2 },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return (
    <div style={{ height: 68, background: t.navBg, borderTop: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 8px 8px', boxShadow: `0 -4px 20px ${t.shadow}` }}>
      {tabs.map(tab => {
        const active = activeTab === tab.id;
        const IconComp = Icon[tab.icon];
        const [pressed, setPressed] = useState(false);
        return (
          <button key={tab.id}
            onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
            onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}
            onClick={() => setActiveTab(tab.id)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
              transform: pressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.12s ease',
              fontFamily: 'Space Grotesk', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 42, height: 28, borderRadius: 14, background: active ? t.primaryLight : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                <IconComp size={19} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 2} />
              </div>
              {tab.badge && !active && (
                <div style={{ position: 'absolute', top: -2, right: -2, width: 15, height: 15, borderRadius: '50%',
                  background: t.danger, border: `2px solid ${t.navBg}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>{tab.badge}</span>
                </div>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500,
              color: active ? t.primary : t.textMuted, transition: 'color 0.2s' }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const t = darkMode ? themes.dark : themes.light;

  const screenStyle = { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' };

  return (
    <div style={{ minHeight: '100vh', background: '#D0D8D2', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif' }}>

      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 44,
        overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)',
      }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 32, background: '#000', borderRadius: 20, zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }} />

        {/* Status bar */}
        <StatusBar t={t} />

        {/* Main content */}
        <div style={{ ...screenStyle, marginTop: 0 }}>
          {activeTab === 'home' && <HomeScreen t={t} />}
          {activeTab === 'map' && <MapScreen t={t} />}
          {activeTab === 'alerts' && <AlertsScreen t={t} />}
          {activeTab === 'profile' && <ProfileScreen t={t} darkMode={darkMode} setDarkMode={setDarkMode} />}
        </div>

        {/* Bottom nav */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
      </div>
    </div>
  );
}
