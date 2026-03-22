const { useState, useEffect, useRef } = React;

// ─── Theme System ───────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#080810',
    surface: '#10101C',
    surfaceElevated: '#161626',
    surfaceHighlight: '#1E1E30',
    text: '#F0F0FF',
    textSecondary: '#7878A8',
    textMuted: '#3E3E5A',
    primary: '#00E5A0',
    primaryDim: 'rgba(0,229,160,0.13)',
    primaryGlow: 'rgba(0,229,160,0.28)',
    secondary: '#8B5CF6',
    secondaryDim: 'rgba(139,92,246,0.15)',
    accent: '#FF6B9D',
    accentDim: 'rgba(255,107,157,0.15)',
    border: '#1E1E30',
    navBg: '#0C0C18',
    success: '#00E5A0',
    warning: '#FFBE0B',
    error: '#FF4B6E',
    scanGradient: 'linear-gradient(160deg, #0a0a1e 0%, #0e0e2a 50%, #060618 100%)',
  },
  light: {
    bg: '#F0F0F8',
    surface: '#FFFFFF',
    surfaceElevated: '#F8F8FC',
    surfaceHighlight: '#EAEAF4',
    text: '#08081E',
    textSecondary: '#5A5A80',
    textMuted: '#ABABC8',
    primary: '#00B882',
    primaryDim: 'rgba(0,184,130,0.1)',
    primaryGlow: 'rgba(0,184,130,0.22)',
    secondary: '#7C3AED',
    secondaryDim: 'rgba(124,58,237,0.1)',
    accent: '#E91E8C',
    accentDim: 'rgba(233,30,140,0.1)',
    border: '#E2E2F0',
    navBg: '#FFFFFF',
    success: '#00B882',
    warning: '#F59E0B',
    error: '#EF4444',
    scanGradient: 'linear-gradient(160deg, #1a1a3e 0%, #16163a 50%, #0e0e2e 100%)',
  },
};

// ─── Status Bar ─────────────────────────────────────────────────────────────
function StatusBar({ theme }) {
  return (
    <div style={{
      height: 54,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 28,
      paddingRight: 20,
      paddingBottom: 8,
      flexShrink: 0,
      zIndex: 10,
      position: 'relative',
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, fontVariantNumeric: 'tabular-nums' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: theme.text })}
        {React.createElement(window.lucide.Signal, { size: 14, color: theme.text })}
        {React.createElement(window.lucide.Battery, { size: 14, color: theme.text })}
      </div>
    </div>
  );
}

// ─── Score Ring ──────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 60, color, theme }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.border} strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <span style={{ fontSize: size * 0.22, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ value, onChange, color }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: 46, height: 26, borderRadius: 13,
      background: value ? (color || '#00E5A0') : 'rgba(128,128,128,0.25)',
      position: 'relative', cursor: 'pointer', transition: 'background 0.3s',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 23 : 3,
        width: 20, height: 20, borderRadius: 10,
        background: '#fff', transition: 'left 0.3s',
        boxShadow: '0 1px 5px rgba(0,0,0,0.35)',
      }} />
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  const [pressedId, setPressedId] = useState(null);

  const recentScans = [
    { id: 1, name: 'Home Office', emoji: '💻', score: 87, issues: 2, time: '2h ago', color: '#00E5A0' },
    { id: 2, name: 'Product Shelf', emoji: '🛍️', score: 61, issues: 5, time: 'Yesterday', color: '#8B5CF6' },
    { id: 3, name: 'Dining Table', emoji: '🍽️', score: 93, issues: 1, time: '3 days ago', color: '#FF6B9D' },
  ];

  const tips = [
    { icon: '↔', title: 'Rule of Thirds', body: 'Divide your space into a 3×3 grid and place focal items at the intersections for natural balance.' },
    { icon: '◉', title: '60-30-10 Color Rule', body: 'Use 60% dominant tone, 30% secondary, and 10% accent to create visual harmony.' },
    { icon: '↑', title: 'Vertical Lift', body: 'Add one tall element per zone—a plant, lamp, or shelf—to draw the eye upward and open up the space.' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      {/* Header */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: theme.textSecondary, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Good morning</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: theme.text, marginTop: 2, lineHeight: 1.1 }}>Design Your Space</div>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 21,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, color: '#fff', fontWeight: 800,
            boxShadow: `0 4px 14px ${theme.primaryGlow}`,
          }}>S</div>
        </div>
      </div>

      {/* Hero CTA */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}1A 0%, ${theme.secondary}1A 100%)`,
          border: `1.5px solid ${theme.primary}40`,
          borderRadius: 22,
          padding: '20px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${theme.primary}20 0%, transparent 70%)` }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${theme.secondary}15 0%, transparent 70%)` }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: theme.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 20px ${theme.primaryGlow}`,
              flexShrink: 0,
            }}>
              {React.createElement(window.lucide.Camera, { size: 26, color: '#000' })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: theme.text }}>Scan a Space</div>
              <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 3, lineHeight: 1.4 }}>Point your camera and get instant redesign suggestions</div>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: theme.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {React.createElement(window.lucide.ChevronRight, { size: 18, color: '#000' })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
        {[
          { label: 'Scanned', value: '24', icon: window.lucide.ScanLine, color: theme.primary },
          { label: 'Saved', value: '12', icon: window.lucide.Heart, color: theme.accent },
          { label: 'Style Score', value: '8.4', icon: window.lucide.Star, color: theme.warning },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: theme.surface, borderRadius: 16, padding: '12px 10px',
            border: `1px solid ${theme.border}`, textAlign: 'center',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6, color: s.color }}>
              {React.createElement(s.icon, { size: 15 })}
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>{s.value}</div>
            <div style={{ fontSize: 10, color: theme.textSecondary, fontWeight: 600, marginTop: 2, letterSpacing: 0.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Scans */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: theme.text }}>Recent Scans</div>
          <div style={{ fontSize: 12, color: theme.primary, fontWeight: 700, cursor: 'pointer' }}>See all</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {recentScans.map(scan => (
            <div key={scan.id}
              onMouseDown={() => setPressedId(scan.id)}
              onMouseUp={() => setPressedId(null)}
              style={{
                background: theme.surface,
                borderRadius: 16, padding: '13px 15px',
                border: `1px solid ${theme.border}`,
                display: 'flex', alignItems: 'center', gap: 13,
                cursor: 'pointer',
                transform: pressedId === scan.id ? 'scale(0.98)' : 'scale(1)',
                transition: 'transform 0.15s',
              }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13,
                background: `${scan.color}1A`,
                border: `1px solid ${scan.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{scan.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{scan.name}</div>
                <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2 }}>
                  {scan.time} &nbsp;·&nbsp; {scan.issues} issue{scan.issues !== 1 ? 's' : ''} found
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: scan.color }}>{scan.score}%</div>
                <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' }}>Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Tips */}
      <div style={{ padding: '0 20px 36px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Design Tips</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {tips.map((tip, i) => (
            <div key={i} style={{
              background: theme.surface, borderRadius: 14,
              padding: '13px 15px', border: `1px solid ${theme.border}`,
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: theme.primaryDim,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, color: theme.primary, fontWeight: 700,
              }}>{tip.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 3 }}>{tip.title}</div>
                <div style={{ fontSize: 11, color: theme.textSecondary, lineHeight: 1.55 }}>{tip.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCAN SCREEN ─────────────────────────────────────────────────────────────
function ScanScreen({ theme }) {
  const [phase, setPhase] = useState('camera');
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startScan = () => {
    setPhase('scanning');
    setProgress(0);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 2.5;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(intervalRef.current);
        setPhase('results');
      }
    }, 50);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setPhase('camera');
    setProgress(0);
  };

  const metrics = [
    { label: 'Spacing', score: 72, color: theme.primary },
    { label: 'Symmetry', score: 58, color: theme.secondary },
    { label: 'Color Balance', score: 45, color: theme.accent },
    { label: 'Visual Hierarchy', score: 81, color: theme.warning },
  ];

  const issues = [
    { label: 'Object Crowding', detail: 'Left zone holds 40% more visual mass than right', sev: 'high', color: theme.error },
    { label: 'Color Clash', detail: 'Blue and orange items lack a neutral transition', sev: 'medium', color: theme.warning },
    { label: 'Dead Space', detail: 'Upper-right quadrant is visually underused', sev: 'low', color: theme.success },
  ];

  const overallScore = Math.round(metrics.reduce((a, m) => a + m.score, 0) / metrics.length);

  if (phase === 'results') {
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: theme.textSecondary, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Analysis Complete</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, marginTop: 2 }}>Home Office</div>
            </div>
            <ScoreRing score={overallScore} size={64} color={theme.primary} theme={theme} />
          </div>

          {/* Metric Bars */}
          <div style={{ background: theme.surface, borderRadius: 18, padding: '16px', border: `1px solid ${theme.border}`, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.textSecondary, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 14 }}>Score Breakdown</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>{m.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>{m.score}</span>
                  </div>
                  <div style={{ height: 6, background: theme.surfaceHighlight, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${m.score}%`, height: '100%', background: m.color, borderRadius: 3, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issues */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 10 }}>Issues Found ({issues.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {issues.map((issue, i) => (
                <div key={i} style={{
                  background: theme.surface, borderRadius: 14,
                  padding: '12px 14px', border: `1px solid ${theme.border}`,
                  display: 'flex', alignItems: 'flex-start', gap: 11,
                }}>
                  <div style={{ width: 9, height: 9, borderRadius: 5, background: issue.color, marginTop: 4, flexShrink: 0, boxShadow: `0 0 6px ${issue.color}80` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{issue.label}</div>
                    <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2, lineHeight: 1.45 }}>{issue.detail}</div>
                  </div>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: issue.color,
                    background: `${issue.color}18`, padding: '3px 8px', borderRadius: 6,
                    textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0,
                  }}>{issue.sev}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, paddingBottom: 30 }}>
            <div style={{
              flex: 2, background: theme.primary, borderRadius: 14, padding: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              cursor: 'pointer', boxShadow: `0 6px 20px ${theme.primaryGlow}`,
            }}>
              {React.createElement(window.lucide.LayoutGrid, { size: 16, color: '#000' })}
              <span style={{ fontSize: 13, fontWeight: 800, color: '#000' }}>View Redesigns</span>
            </div>
            <div onClick={reset} style={{
              flex: 1, background: theme.surface, borderRadius: 14, padding: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              cursor: 'pointer', border: `1px solid ${theme.border}`,
            }}>
              {React.createElement(window.lucide.RotateCcw, { size: 16, color: theme.textSecondary })}
              <span style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary }}>Rescan</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', background: '#000', display: 'flex', flexDirection: 'column' }}>
      {/* Camera View */}
      <div style={{ flex: 1, background: theme.scanGradient, position: 'relative', overflow: 'hidden' }}>
        {/* Room Silhouettes */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%', background: 'rgba(120,80,50,0.25)', borderTop: '1px solid rgba(180,140,90,0.2)' }} />
        <div style={{ position: 'absolute', bottom: '38%', left: 0, right: 0, height: '30%', background: 'rgba(200,200,240,0.04)' }} />
        <div style={{ position: 'absolute', bottom: '36%', left: '8%', width: '38%', height: '28%', background: 'rgba(90,70,50,0.5)', borderRadius: 3 }} />
        <div style={{ position: 'absolute', bottom: '36%', right: '10%', width: '22%', height: '45%', background: 'rgba(60,60,90,0.45)', borderRadius: 3 }} />
        <div style={{ position: 'absolute', bottom: '64%', left: '18%', width: '16%', height: '22%', background: 'rgba(30,80,50,0.5)', borderRadius: '50% 50% 0 0' }} />
        <div style={{ position: 'absolute', bottom: '36%', left: '22%', width: '12%', height: '14%', background: 'rgba(180,160,80,0.3)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', bottom: '36%', right: '18%', width: '8%', height: '18%', background: 'rgba(100,180,160,0.2)', borderRadius: 4 }} />

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '33.3% 33.3%' }} />

        {/* Scan overlay */}
        {phase === 'scanning' && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {/* Corner brackets */}
            {[
              { top: 28, left: 28, borderTop: true, borderLeft: true, borderRadius: '8px 0 0 0' },
              { top: 28, right: 28, borderTop: true, borderRight: true, borderRadius: '0 8px 0 0' },
              { bottom: 28, left: 28, borderBottom: true, borderLeft: true, borderRadius: '0 0 0 8px' },
              { bottom: 28, right: 28, borderBottom: true, borderRight: true, borderRadius: '0 0 8px 0' },
            ].map((b, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: b.top, left: b.left, right: b.right, bottom: b.bottom,
                width: 28, height: 28,
                borderTop: b.borderTop ? `2.5px solid ${theme.primary}` : 'none',
                borderBottom: b.borderBottom ? `2.5px solid ${theme.primary}` : 'none',
                borderLeft: b.borderLeft ? `2.5px solid ${theme.primary}` : 'none',
                borderRight: b.borderRight ? `2.5px solid ${theme.primary}` : 'none',
                borderRadius: b.borderRadius,
              }} />
            ))}

            {/* Scan line */}
            <div style={{
              position: 'absolute', left: 0, right: 0,
              top: `${progress}%`,
              height: 2,
              background: `linear-gradient(90deg, transparent 0%, ${theme.primary} 40%, ${theme.primary} 60%, transparent 100%)`,
              boxShadow: `0 0 16px ${theme.primaryGlow}, 0 0 4px ${theme.primary}`,
              transition: 'top 0.05s linear',
            }} />

            {/* Detection points */}
            {progress > 35 && (
              <div style={{ position: 'absolute', top: '42%', left: '26%', width: 10, height: 10, borderRadius: 5, background: theme.primary, boxShadow: `0 0 10px ${theme.primary}`, border: '2px solid #fff' }} />
            )}
            {progress > 55 && (
              <div style={{ position: 'absolute', top: '52%', right: '24%', width: 10, height: 10, borderRadius: 5, background: theme.accent, boxShadow: `0 0 10px ${theme.accent}`, border: '2px solid #fff' }} />
            )}
            {progress > 72 && (
              <div style={{ position: 'absolute', top: '35%', left: '58%', width: 10, height: 10, borderRadius: 5, background: theme.warning, boxShadow: `0 0 10px ${theme.warning}`, border: '2px solid #fff' }} />
            )}
          </div>
        )}

        {/* Top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
          padding: '14px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
            {phase === 'scanning' ? `Analyzing space... ${Math.round(progress)}%` : 'Point at your space'}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {React.createElement(window.lucide.Zap, { size: 17, color: '#fff' })}
            {React.createElement(window.lucide.Grid, { size: 17, color: '#fff' })}
          </div>
        </div>

        {/* Progress bar */}
        {phase === 'scanning' && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: theme.primary, transition: 'width 0.05s linear' }} />
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <div style={{
        background: '#0a0a12',
        padding: '22px 30px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 14,
          background: 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          {React.createElement(window.lucide.Image, { size: 20, color: '#888' })}
        </div>

        <div onClick={phase === 'camera' ? startScan : undefined} style={{ cursor: phase === 'camera' ? 'pointer' : 'default' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36,
            border: `3px solid ${phase === 'scanning' ? theme.warning : theme.primary}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 24px ${phase === 'scanning' ? theme.warning + '60' : theme.primaryGlow}`,
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28,
              background: phase === 'scanning' ? theme.warning : theme.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.3s',
            }}>
              {React.createElement(
                phase === 'scanning' ? window.lucide.Loader : window.lucide.Scan,
                { size: 26, color: '#000' }
              )}
            </div>
          </div>
        </div>

        <div onClick={reset} style={{
          width: 46, height: 46, borderRadius: 14,
          background: 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          {React.createElement(window.lucide.RefreshCw, { size: 20, color: '#888' })}
        </div>
      </div>
    </div>
  );
}

// ─── DESIGNS SCREEN ───────────────────────────────────────────────────────────
function DesignsScreen({ theme }) {
  const [filter, setFilter] = useState('All');
  const [showBefore, setShowBefore] = useState({});

  const filters = ['All', 'Office', 'Retail', 'Dining', 'Dorm'];

  const designs = [
    {
      id: 1, name: 'Home Office Desk', space: 'Office', style: 'Minimal',
      beforeScore: 61, afterScore: 89, changes: 4,
      tags: ['Minimal', 'Focused'],
      desc: 'Centre the monitor, clear the left pile, and introduce a small plant to break visual monotony in the right corner.',
      annotations: ['Move monitor to center', 'Add plant (right)'],
      beforeBg: 'linear-gradient(145deg, #1a1420 0%, #221a2a 100%)',
      afterBg: 'linear-gradient(145deg, #0e1820 0%, #162028 100%)',
      accentColor: '#00E5A0',
    },
    {
      id: 2, name: 'Product Display Shelf', space: 'Retail', style: 'Editorial',
      beforeScore: 54, afterScore: 87, changes: 6,
      tags: ['Editorial', 'Bold'],
      desc: 'Group items by colour family, elevate hero products on risers, and apply odd-number groupings for visual rhythm.',
      annotations: ['Hero riser (center)', 'Color-group left'],
      beforeBg: 'linear-gradient(145deg, #1a1800 0%, #282600 100%)',
      afterBg: 'linear-gradient(145deg, #0a1400 0%, #142000 100%)',
      accentColor: '#8B5CF6',
    },
    {
      id: 3, name: 'Dining Table Setting', space: 'Dining', style: 'Cozy',
      beforeScore: 70, afterScore: 94, changes: 3,
      tags: ['Cozy', 'Warm'],
      desc: 'Centre the arrangement symmetrically, soften with linen napkins, and place candles at equal intervals.',
      annotations: ['Centre arrangement', 'Candle symmetry'],
      beforeBg: 'linear-gradient(145deg, #10101e 0%, #1a1a2a 100%)',
      afterBg: 'linear-gradient(145deg, #201200 0%, #2e1e08 100%)',
      accentColor: '#FF6B9D',
    },
  ];

  const filtered = filter === 'All' ? designs : designs.filter(d => d.space === filter);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '10px 20px 12px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: theme.text }}>Redesigns</div>
        <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>AI-powered layout transformations</div>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {filters.map(f => (
          <div key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 14px', borderRadius: 20,
            background: filter === f ? theme.primary : theme.surface,
            color: filter === f ? '#000' : theme.textSecondary,
            fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer',
            border: `1px solid ${filter === f ? theme.primary : theme.border}`,
            transition: 'all 0.2s',
          }}>{f}</div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {filtered.map(d => {
          const isBefore = showBefore[d.id];
          return (
            <div key={d.id} style={{
              background: theme.surface, borderRadius: 20, overflow: 'hidden',
              border: `1px solid ${theme.border}`,
            }}>
              {/* Visual */}
              <div style={{ height: 170, position: 'relative', background: isBefore ? d.beforeBg : d.afterBg, transition: 'background 0.4s' }}>
                {/* Floor plane */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.08)' }} />

                {/* Scene objects */}
                {isBefore ? (
                  <>
                    <div style={{ position: 'absolute', bottom: '33%', left: '5%', width: '42%', height: '32%', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
                    <div style={{ position: 'absolute', bottom: '33%', left: '12%', width: '18%', height: '20%', background: 'rgba(255,255,255,0.07)', borderRadius: 3 }} />
                    <div style={{ position: 'absolute', bottom: '33%', right: '4%', width: '32%', height: '44%', background: 'rgba(255,255,255,0.09)', borderRadius: 4 }} />
                    <div style={{ position: 'absolute', bottom: '33%', right: '14%', width: '10%', height: '24%', background: `${d.accentColor}20`, borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', bottom: '65%', left: '8%', width: '20%', height: '10%', background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
                  </>
                ) : (
                  <>
                    <div style={{ position: 'absolute', bottom: '33%', left: '16%', width: '34%', height: '32%', background: 'rgba(255,255,255,0.11)', borderRadius: 4 }} />
                    <div style={{ position: 'absolute', bottom: '33%', right: '16%', width: '24%', height: '38%', background: 'rgba(255,255,255,0.09)', borderRadius: 4 }} />
                    <div style={{ position: 'absolute', bottom: '62%', left: '40%', width: '10%', height: '22%', background: `${d.accentColor}35`, borderRadius: '50% 50% 0 0' }} />
                    {/* Annotation dots */}
                    <div style={{ position: 'absolute', top: '28%', left: '30%', width: 16, height: 16, borderRadius: 8, background: d.accentColor, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#000' }}>1</div>
                    <div style={{ position: 'absolute', top: '40%', right: '26%', width: 16, height: 16, borderRadius: 8, background: theme.secondary, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>2</div>
                  </>
                )}

                {/* Toggle */}
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  display: 'flex', background: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: 2,
                }}>
                  {['Before', 'After'].map(m => (
                    <div key={m} onClick={() => setShowBefore(p => ({ ...p, [d.id]: m === 'Before' }))} style={{
                      padding: '4px 11px', borderRadius: 18, cursor: 'pointer',
                      background: (m === 'Before') === isBefore ? 'rgba(255,255,255,0.22)' : 'transparent',
                      color: '#fff', fontSize: 11, fontWeight: 700, transition: 'background 0.2s',
                    }}>{m}</div>
                  ))}
                </div>

                {/* Score delta badge */}
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  background: isBefore ? 'rgba(0,0,0,0.65)' : `${d.accentColor}CC`,
                  borderRadius: 10, padding: '4px 10px',
                  fontSize: 12, fontWeight: 800,
                  color: isBefore ? '#fff' : '#000',
                }}>
                  {isBefore ? `${d.beforeScore}%` : `+${d.afterScore - d.beforeScore}pts`}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: theme.text }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2 }}>{d.changes} changes · {d.style} aesthetic</div>
                  </div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {d.tags.map(t => (
                      <div key={t} style={{
                        fontSize: 9, fontWeight: 700, color: d.accentColor,
                        background: `${d.accentColor}18`, padding: '3px 8px', borderRadius: 6, letterSpacing: 0.3,
                      }}>{t.toUpperCase()}</div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.55, marginBottom: 13 }}>{d.desc}</div>

                {/* Annotation list */}
                {!isBefore && (
                  <div style={{ marginBottom: 13, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {d.annotations.map((a, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 8, background: idx === 0 ? d.accentColor : theme.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: idx === 0 ? '#000' : '#fff', flexShrink: 0 }}>{idx + 1}</div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: theme.text }}>{a}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{
                    flex: 2, background: d.accentColor, borderRadius: 11, padding: '11px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer',
                    boxShadow: `0 4px 14px ${d.accentColor}40`,
                  }}>
                    {React.createElement(window.lucide.Download, { size: 14, color: '#000' })}
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#000' }}>Export Guide</span>
                  </div>
                  <div style={{
                    flex: 1, background: theme.surfaceElevated, borderRadius: 11, padding: '11px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer',
                    border: `1px solid ${theme.border}`,
                  }}>
                    {React.createElement(window.lucide.Heart, { size: 14, color: theme.textSecondary })}
                    <span style={{ fontSize: 12, fontWeight: 700, color: theme.textSecondary }}>Save</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── STYLE SCREEN ─────────────────────────────────────────────────────────────
function StyleScreen({ theme }) {
  const [selected, setSelected] = useState(['Minimal', 'Editorial']);
  const [colorPref, setColorPref] = useState('Neutral');
  const [roomFocus, setRoomFocus] = useState('Office');

  const aesthetics = [
    { name: 'Minimal', icon: '◻', desc: 'Clean lines, negative space, intentional objects', color: '#9898C8' },
    { name: 'Cozy', icon: '🕯', desc: 'Warm textures, layered light, lived-in comfort', color: '#FFB347' },
    { name: 'Bold', icon: '◆', desc: 'Strong contrasts, statement pieces, drama', color: '#FF6B9D' },
    { name: 'Editorial', icon: '✦', desc: 'Curated, magazine-ready, artfully composed', color: '#00E5A0' },
    { name: 'Organic', icon: '❋', desc: 'Natural materials, biophilic elements, earth tones', color: '#77DD77' },
    { name: 'Industrial', icon: '⟳', desc: 'Raw materials, functional forms, urban texture', color: '#B0B0D0' },
  ];

  const colorFamilies = ['Neutral', 'Warm', 'Cool', 'Monochrome', 'Earthy'];
  const rooms = ['Office', 'Living Room', 'Bedroom', 'Kitchen', 'Retail'];

  const insights = [
    { text: 'Your spaces lean toward horizontal symmetry', icon: window.lucide.TrendingUp, positive: true },
    { text: 'Strong preference for negative space over density', icon: window.lucide.TrendingUp, positive: true },
    { text: 'Color variety could be more deliberate', icon: window.lucide.AlertCircle, positive: false },
    { text: 'You consistently nail lighting placement', icon: window.lucide.TrendingUp, positive: true },
  ];

  const toggle = (name) => setSelected(p => p.includes(name) ? p.filter(s => s !== name) : [...p, name]);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '10px 20px 16px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: theme.text }}>Style Profile</div>
        <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>Train your personal aesthetic AI</div>
      </div>

      {/* Match card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}18 0%, ${theme.secondary}18 100%)`,
          border: `1.5px solid ${theme.primary}35`,
          borderRadius: 20, padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Your Aesthetic Match</div>
              <div style={{ fontSize: 26, fontWeight: 900, background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Minimal–Editorial</div>
              <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 4 }}>Based on 24 scanned spaces</div>
            </div>
            <ScoreRing score={88} size={68} color={theme.primary} theme={theme} />
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            {['Minimal', 'Editorial'].map(s => (
              <div key={s} style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: theme.primaryDim, color: theme.primary, border: `1px solid ${theme.primary}40`,
              }}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Aesthetic grid */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Your Aesthetic Preferences</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          {aesthetics.map(a => {
            const on = selected.includes(a.name);
            return (
              <div key={a.name} onClick={() => toggle(a.name)} style={{
                background: on ? `${a.color}18` : theme.surface,
                border: `1.5px solid ${on ? a.color : theme.border}`,
                borderRadius: 16, padding: '13px 12px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: 22, marginBottom: 7 }}>{a.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: on ? a.color : theme.text, marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontSize: 10, color: theme.textSecondary, lineHeight: 1.45 }}>{a.desc}</div>
                {on && (
                  <div style={{ marginTop: 8, width: 18, height: 18, borderRadius: 9, background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(window.lucide.Check, { size: 11, color: '#000' })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Color family */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Preferred Colour Family</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colorFamilies.map(c => (
            <div key={c} onClick={() => setColorPref(c)} style={{
              padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
              background: colorPref === c ? theme.secondary : theme.surface,
              color: colorPref === c ? '#fff' : theme.textSecondary,
              fontSize: 12, fontWeight: 700,
              border: `1px solid ${colorPref === c ? theme.secondary : theme.border}`,
              transition: 'all 0.2s',
            }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Room focus */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Space Focus</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {rooms.map(r => (
            <div key={r} onClick={() => setRoomFocus(r)} style={{
              padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
              background: roomFocus === r ? theme.accent : theme.surface,
              color: roomFocus === r ? '#fff' : theme.textSecondary,
              fontSize: 12, fontWeight: 700,
              border: `1px solid ${roomFocus === r ? theme.accent : theme.border}`,
              transition: 'all 0.2s',
            }}>{r}</div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div style={{ padding: '0 20px 34px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Design Insights</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {insights.map((ins, i) => (
            <div key={i} style={{
              background: theme.surface, borderRadius: 13, padding: '12px 14px',
              border: `1px solid ${theme.border}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: ins.positive ? theme.primaryDim : `${theme.warning}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: ins.positive ? theme.primary : theme.warning,
              }}>
                {React.createElement(ins.icon, { size: 15 })}
              </div>
              <div style={{ fontSize: 12, color: theme.text, flex: 1, lineHeight: 1.45 }}>{ins.text}</div>
              <div style={{
                width: 8, height: 8, borderRadius: 4,
                background: ins.positive ? theme.success : theme.warning,
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────
function SettingsScreen({ theme, isDark, setIsDark }) {
  const [notifs, setNotifs] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [haptics, setHaptics] = useState(false);
  const [exportFmt, setExportFmt] = useState('PDF');

  const fmts = ['PDF', 'Images', 'Checklist'];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      {/* Profile */}
      <div style={{
        margin: '10px 20px 20px',
        background: theme.surface, borderRadius: 20,
        border: `1px solid ${theme.border}`, overflow: 'hidden',
      }}>
        <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 54, height: 54, borderRadius: 27,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: '#fff', fontWeight: 800,
            boxShadow: `0 4px 16px ${theme.primaryGlow}`,
          }}>S</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: theme.text }}>Sarah Kim</div>
            <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>Minimal–Editorial enthusiast</div>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 18, color: theme.textMuted })}
        </div>
        <div style={{
          margin: '0 14px 14px',
          background: `linear-gradient(135deg, ${theme.primary}18, ${theme.secondary}18)`,
          border: `1px solid ${theme.primary}30`,
          borderRadius: 12, padding: '10px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {React.createElement(window.lucide.Zap, { size: 14, color: theme.primary })}
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Space Stitch Pro</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color: theme.primary }}>Active ✓</span>
        </div>
      </div>

      {/* Settings sections */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Appearance */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 9 }}>Appearance</div>
          <div style={{ background: theme.surface, borderRadius: 18, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: isDark ? theme.secondaryDim : `${theme.warning}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? theme.secondary : theme.warning }}>
                {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 17 })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>Dark Mode</div>
                <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 1 }}>Switch interface theme</div>
              </div>
              <Toggle value={isDark} onChange={setIsDark} color={theme.secondary} />
            </div>
          </div>
        </div>

        {/* Notifications & Behaviour */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 9 }}>Preferences</div>
          <div style={{ background: theme.surface, borderRadius: 18, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
            {[
              { label: 'Push Notifications', sub: 'Redesign ideas and style tips', value: notifs, set: setNotifs, icon: window.lucide.Bell, color: theme.accentDim, iconColor: theme.accent },
              { label: 'Auto-Save Scans', sub: 'Keep all analysed spaces in library', value: autoSave, set: setAutoSave, icon: window.lucide.Save, color: theme.primaryDim, iconColor: theme.primary },
              { label: 'Haptic Feedback', sub: 'Vibrate on scan completion', value: haptics, set: setHaptics, icon: window.lucide.Vibrate, color: theme.secondaryDim, iconColor: theme.secondary },
            ].map((item, idx, arr) => (
              <div key={item.label} style={{
                padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: idx < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.iconColor }}>
                  {React.createElement(item.icon, { size: 16 })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 1 }}>{item.sub}</div>
                </div>
                <Toggle value={item.value} onChange={item.set} color={theme.primary} />
              </div>
            ))}
          </div>
        </div>

        {/* Export Format */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 9 }}>Export</div>
          <div style={{ background: theme.surface, borderRadius: 18, border: `1px solid ${theme.border}`, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Setup Guide Format</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {fmts.map(f => (
                <div key={f} onClick={() => setExportFmt(f)} style={{
                  flex: 1, padding: '9px 4px', borderRadius: 11, cursor: 'pointer',
                  background: exportFmt === f ? theme.primary : theme.surfaceElevated,
                  color: exportFmt === f ? '#000' : theme.textSecondary,
                  fontSize: 12, fontWeight: 700, textAlign: 'center',
                  border: `1px solid ${exportFmt === f ? theme.primary : theme.border}`,
                  transition: 'all 0.2s',
                }}>{f}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Account */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 9 }}>Account</div>
          <div style={{ background: theme.surface, borderRadius: 18, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
            {[
              { label: 'Edit Profile', sub: 'Name, avatar, style bio', icon: window.lucide.UserCircle },
              { label: 'Sync to Cloud', sub: 'Back up designs and history', icon: window.lucide.Cloud },
              { label: 'Invite a Friend', sub: 'Share Space Stitch', icon: window.lucide.Share2 },
            ].map((item, idx, arr) => (
              <div key={item.label} style={{
                padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                borderBottom: idx < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.surfaceHighlight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textSecondary }}>
                  {React.createElement(item.icon, { size: 16 })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 1 }}>{item.sub}</div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size: 17, color: theme.textMuted })}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: theme.textMuted, paddingBottom: 32, marginTop: -6 }}>
          Space Stitch v2.1.0 &nbsp;·&nbsp; Built with care
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      *::-webkit-scrollbar { display: none; }
      * { scrollbar-width: none; }
    `;
    document.head.appendChild(style);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'scan', label: 'Scan', icon: window.lucide.Camera },
    { id: 'designs', label: 'Designs', icon: window.lucide.LayoutGrid },
    { id: 'style', label: 'Style', icon: window.lucide.Palette },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    scan: ScanScreen,
    designs: DesignsScreen,
    style: StyleScreen,
    settings: SettingsScreen,
  };

  const CurrentScreen = screens[activeTab];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0e0e0e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* Ambient glow behind phone */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: `radial-gradient(circle, ${themes.dark.primary}12 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Phone Frame */}
      <div style={{
        width: 375,
        height: 812,
        background: theme.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 100px rgba(0,0,0,0.7), 0 20px 40px rgba(0,0,0,0.5)',
        transition: 'background 0.35s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 14, left: '50%',
          transform: 'translateX(-50%)',
          width: 122, height: 35,
          background: '#000', borderRadius: 22,
          zIndex: 200,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
        }} />

        {/* Status Bar */}
        <StatusBar theme={theme} />

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <CurrentScreen theme={theme} isDark={isDark} setIsDark={setIsDark} />
        </div>

        {/* Bottom Navigation */}
        <div style={{
          background: theme.navBg,
          borderTop: `1px solid ${theme.border}`,
          paddingTop: 8,
          paddingBottom: 22,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          flexShrink: 0,
          transition: 'background 0.35s ease',
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  padding: '2px 12px 0',
                  color: isActive ? theme.primary : theme.textMuted,
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: -8,
                    width: 28, height: 3,
                    borderRadius: 2,
                    background: theme.primary,
                    boxShadow: `0 0 8px ${theme.primaryGlow}`,
                  }} />
                )}
                {React.createElement(tab.icon, { size: 22 })}
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
