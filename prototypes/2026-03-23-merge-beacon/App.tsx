function App() {
  const { useState, useEffect } = React;

  // ─── THEME SYSTEM ────────────────────────────────────────────────────────────
  const themes = {
    dark: {
      bg: '#050c1a',
      surface: '#0b1628',
      surfaceAlt: '#0f1e38',
      surfaceHover: '#162540',
      border: '#1a2d4a',
      borderLight: '#20385c',
      text: '#ddeeff',
      textSecondary: '#6b8fbb',
      textMuted: '#2d4a6e',
      primary: '#00d4ff',
      primaryDim: '#0099bb',
      primaryGlow: 'rgba(0,212,255,0.1)',
      primaryGlowMid: 'rgba(0,212,255,0.18)',
      primaryGlowStrong: 'rgba(0,212,255,0.35)',
      secondary: '#9b5de5',
      secondaryGlow: 'rgba(155,93,229,0.15)',
      accent: '#ff6b35',
      accentGlow: 'rgba(255,107,53,0.12)',
      success: '#00d09e',
      successGlow: 'rgba(0,208,158,0.12)',
      warning: '#ffb347',
      warningGlow: 'rgba(255,179,71,0.12)',
      danger: '#ff4757',
      dangerGlow: 'rgba(255,71,87,0.12)',
      navBg: '#070f20',
      gradient: 'linear-gradient(135deg, #00d4ff 0%, #9b5de5 100%)',
      gridColor: 'rgba(26,45,74,0.9)',
    },
    light: {
      bg: '#edf2ff',
      surface: '#ffffff',
      surfaceAlt: '#f4f7ff',
      surfaceHover: '#edf2ff',
      border: '#dce6f5',
      borderLight: '#c8d8f0',
      text: '#0a1628',
      textSecondary: '#445577',
      textMuted: '#8a9fc0',
      primary: '#0080cc',
      primaryDim: '#006699',
      primaryGlow: 'rgba(0,128,204,0.1)',
      primaryGlowMid: 'rgba(0,128,204,0.18)',
      primaryGlowStrong: 'rgba(0,128,204,0.3)',
      secondary: '#7c3aed',
      secondaryGlow: 'rgba(124,58,237,0.1)',
      accent: '#f97316',
      accentGlow: 'rgba(249,115,22,0.1)',
      success: '#10b981',
      successGlow: 'rgba(16,185,129,0.1)',
      warning: '#d97706',
      warningGlow: 'rgba(217,119,6,0.1)',
      danger: '#ef4444',
      dangerGlow: 'rgba(239,68,68,0.1)',
      navBg: '#ffffff',
      gradient: 'linear-gradient(135deg, #0080cc 0%, #7c3aed 100%)',
      gridColor: 'rgba(220,230,245,0.8)',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
      @keyframes fadeSlideUp {
        from { transform: translateY(12px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      @keyframes pulseRing {
        0%   { transform: scale(1);   opacity: 0.7; }
        100% { transform: scale(1.6); opacity: 0;   }
      }
      @keyframes confBarFill {
        from { width: 0%; }
      }
      @keyframes glowPulse {
        0%, 100% { opacity: 0.5; }
        50%       { opacity: 1;   }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // ─── SHARED: STATUS BAR ───────────────────────────────────────────────────────
  function StatusBar() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '52px 22px 8px', color: t.text }}>
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.3px' }}>{h}:{m}</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {React.createElement(window.lucide.Signal,  { size: 13, color: t.text })}
          {React.createElement(window.lucide.Wifi,    { size: 13, color: t.text })}
          {React.createElement(window.lucide.Battery, { size: 17, color: t.text })}
        </div>
      </div>
    );
  }

  // ─── SCREEN: HOME ─────────────────────────────────────────────────────────────
  function HomeScreen() {
    const [activeMetric, setActiveMetric] = useState(null);
    const riskColor = r => r === 'high' ? t.danger : r === 'medium' ? t.warning : t.success;
    const riskBg    = r => r === 'high' ? t.dangerGlow : r === 'medium' ? t.warningGlow : t.successGlow;

    const changes = [
      { file: 'src/api/payments.ts',            author: 'sarah.k',  time: '2m ago',  risk: 'high',   diff: '+142 −38', owners: ['S', 'A'] },
      { file: 'packages/auth/middleware.ts',     author: 'david.l',  time: '18m ago', risk: 'medium', diff: '+27 −12',  owners: ['D'] },
      { file: 'services/notification/index.ts',  author: 'priya.s',  time: '1h ago',  risk: 'low',    diff: '+8 −3',    owners: ['P', 'M'] },
      { file: 'lib/cache/redis-client.ts',       author: 'alex.m',   time: '3h ago',  risk: 'medium', diff: '+55 −20',  owners: ['A'] },
    ];

    const metrics = [
      { label: 'Files',     value: '2,847', icon: window.lucide.Code,          color: t.primary,   bg: t.primaryGlow,   sub: 'tracked' },
      { label: 'Owners',   value: '23',    icon: window.lucide.Users,          color: t.secondary, bg: t.secondaryGlow, sub: 'active' },
      { label: 'Hot Zones', value: '7',    icon: window.lucide.AlertTriangle,  color: t.warning,   bg: t.warningGlow,   sub: 'flagged' },
    ];

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <StatusBar />

        {/* Header */}
        <div style={{ padding: '0 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${t.primaryGlowMid}` }}>
                {React.createElement(window.lucide.Crosshair, { size: 16, color: '#fff' })}
              </div>
              <span style={{ fontSize: 19, fontWeight: 700, color: t.text, letterSpacing: '-0.5px' }}>Merge Beacon</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 38 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.success, boxShadow: `0 0 6px ${t.success}`, animation: 'glowPulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, color: t.textSecondary }}>frontend-monorepo · main</span>
            </div>
          </div>
          <div style={{ position: 'relative', width: 38, height: 38, borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Bell, { size: 17, color: t.textSecondary })}
            <div style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: t.danger, border: `2px solid ${t.bg}` }} />
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ padding: '0 20px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {metrics.map(m => {
            const isActive = activeMetric === m.label;
            return (
              <div key={m.label}
                onClick={() => setActiveMetric(isActive ? null : m.label)}
                style={{ background: t.surface, border: `1px solid ${isActive ? m.color : t.border}`, borderRadius: 16, padding: '14px 12px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: isActive ? `0 0 18px ${m.bg}` : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  {React.createElement(m.icon, { size: 15, color: m.color })}
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: '-0.5px' }}>{m.value}</div>
                <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{m.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Blast radius banner */}
        <div style={{ margin: '0 20px 18px', padding: '14px 16px', background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: t.primaryGlow, filter: 'blur(24px)', pointerEvents: 'none' }} />
          <div style={{ width: 42, height: 42, borderRadius: 13, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 16px ${t.primaryGlowMid}` }}>
            {React.createElement(window.lucide.Zap, { size: 20, color: '#fff' })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Analyze Blast Radius</div>
            <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>Paste a diff or file path to trace impact</div>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
        </div>

        {/* Recent changes */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Recent Changes</span>
            <span style={{ fontSize: 12, color: t.primary, cursor: 'pointer' }}>View all →</span>
          </div>
          {changes.map((c, i) => (
            <div key={i} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', transition: 'border-color 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1, marginRight: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: t.text, fontFamily: 'monospace', marginBottom: 3 }}>{c.file}</div>
                  <div style={{ fontSize: 10, color: t.textMuted }}>by {c.author} · {c.time}</div>
                </div>
                <div style={{ padding: '3px 8px', borderRadius: 6, background: riskBg(c.risk), color: riskColor(c.risk), fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.7px', flexShrink: 0 }}>{c.risk}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {c.owners.map((o, j) => (
                    <div key={j} style={{ width: 22, height: 22, borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>{o}</div>
                  ))}
                </div>
                <span style={{ fontSize: 11, color: t.success, fontFamily: 'monospace', fontWeight: 600 }}>{c.diff}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
    );
  }

  // ─── SCREEN: MAP ──────────────────────────────────────────────────────────────
  function MapScreen() {
    const [selNode, setSelNode] = useState(null);
    const [blastOn, setBlastOn] = useState(false);

    const nodes = [
      { id: 'api',      label: 'API Gateway', x: 187, y: 60,  type: 'gateway', risk: 'low',    files: 34 },
      { id: 'auth',     label: 'Auth',        x: 80,  y: 148, type: 'service', risk: 'medium', files: 18 },
      { id: 'payments', label: 'Payments',    x: 294, y: 148, type: 'service', risk: 'high',   files: 47 },
      { id: 'cache',    label: 'Cache',       x: 187, y: 218, type: 'infra',   risk: 'medium', files: 8  },
      { id: 'users',    label: 'Users',       x: 80,  y: 292, type: 'service', risk: 'low',    files: 23 },
      { id: 'notify',   label: 'Notify',      x: 294, y: 292, type: 'service', risk: 'low',    files: 12 },
      { id: 'db',       label: 'Database',    x: 187, y: 358, type: 'infra',   risk: 'low',    files: 15 },
    ];

    const edges = [
      ['api','auth'],['api','payments'],['api','users'],
      ['auth','cache'],['payments','cache'],['payments','notify'],
      ['users','db'],['cache','db'],
    ];

    const isAffected = id => selNode && blastOn && edges.some(e => (e[0]===selNode.id&&e[1]===id)||(e[1]===selNode.id&&e[0]===id));
    const isBlastEdge = (a, b) => selNode && blastOn && (selNode.id===a||selNode.id===b||isAffected(a)||isAffected(b));

    const nodeColor = n => {
      if (selNode && selNode.id === n.id) return t.primary;
      if (blastOn && isAffected(n.id)) return t.warning;
      if (n.risk === 'high')   return t.danger;
      if (n.risk === 'medium') return t.warning;
      return t.success;
    };

    const depCount = id => edges.filter(e => e[0]===id||e[1]===id).length;

    return (
      <div style={{ height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', fontFamily: "'Space Grotesk', sans-serif" }}>
        <StatusBar />
        <div style={{ padding: '0 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>Dependency Map</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>frontend-monorepo · 7 modules</div>
          </div>
          <div
            onClick={() => setBlastOn(!blastOn)}
            style={{ padding: '6px 13px', borderRadius: 20, background: blastOn ? t.warning : t.surface, border: `1px solid ${blastOn ? t.warning : t.border}`, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'all 0.2s' }}>
            {React.createElement(window.lucide.Zap, { size: 12, color: blastOn ? '#000' : t.textSecondary })}
            <span style={{ fontSize: 11, fontWeight: 600, color: blastOn ? '#000' : t.textSecondary }}>Blast</span>
          </div>
        </div>

        {/* SVG map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <svg width="375" height="420" style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <pattern id="mapgrid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke={t.gridColor} strokeWidth="0.5" />
              </pattern>
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect width="375" height="420" fill="url(#mapgrid)" />

            {/* Edges */}
            {edges.map(([from, to], i) => {
              const a = nodes.find(n => n.id === from);
              const b = nodes.find(n => n.id === to);
              const blast = isBlastEdge(from, to);
              return (
                <line key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={blast ? t.warning : t.borderLight}
                  strokeWidth={blast ? 2 : 1}
                  strokeDasharray={blast ? '6,4' : 'none'}
                  opacity={blast ? 1 : 0.45}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const isSel    = selNode && selNode.id === node.id;
              const affected = isAffected(node.id);
              const color    = nodeColor(node);
              return (
                <g key={node.id} onClick={() => setSelNode(isSel ? null : node)} style={{ cursor: 'pointer' }}>
                  {isSel    && <circle cx={node.x} cy={node.y} r={30} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="4,4" opacity={0.5} />}
                  {affected && <circle cx={node.x} cy={node.y} r={26} fill={t.warningGlow} stroke={t.warning} strokeWidth={1.5} opacity={0.6} />}
                  <circle cx={node.x} cy={node.y} r={20} fill={t.surface} stroke={color} strokeWidth={isSel ? 2.5 : 1.5} filter={isSel ? 'url(#nodeGlow)' : 'none'} />
                  <circle cx={node.x} cy={node.y} r={6} fill={color} />
                  <text x={node.x} y={node.y + 35} textAnchor="middle" fontSize="10" fill={t.textSecondary} fontFamily="'Space Grotesk', sans-serif" fontWeight="500">{node.label}</text>
                </g>
              );
            })}
          </svg>

          {/* Detail / hint panel */}
          {selNode ? (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: t.surface, borderTop: `1px solid ${t.border}`, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: '16px 20px 20px', animation: 'fadeSlideUp 0.2s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{selNode.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{selNode.type} · {selNode.files} files</div>
                </div>
                <div style={{ padding: '4px 10px', borderRadius: 8, background: selNode.risk==='high' ? t.dangerGlow : selNode.risk==='medium' ? t.warningGlow : t.successGlow, color: selNode.risk==='high' ? t.danger : selNode.risk==='medium' ? t.warning : t.success, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {selNode.risk} risk
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { l: 'Connections', v: String(depCount(selNode.id)) },
                  { l: 'Last change',  v: '2h ago' },
                  { l: 'Top owner',    v: 'sarah.k' },
                ].map(s => (
                  <div key={s.l} style={{ background: t.surfaceAlt, borderRadius: 10, padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center', color: t.textMuted, fontSize: 11 }}>
              Tap a node to explore · Toggle Blast to trace impact
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── SCREEN: TICKETS ──────────────────────────────────────────────────────────
  function TicketsScreen() {
    const [query,     setQuery]     = useState('');
    const [activeIdx, setActiveIdx] = useState(0);

    const analyses = [
      {
        id: 'LIN-2847', title: 'Payment timeout on high-load checkout', source: 'Linear',
        hotspots: [
          { shortFile: 'payments.ts',    fullPath: 'src/api/payments.ts',          confidence: 94, lines: '112–145' },
          { shortFile: 'webhook.ts',     fullPath: 'services/stripe/webhook.ts',   confidence: 87, lines: '23–67'  },
          { shortFile: 'redis-client.ts',fullPath: 'lib/cache/redis-client.ts',    confidence: 72, lines: '89–102' },
        ],
        owners: ['S','A'], risk: 'high',
      },
      {
        id: 'GH-1293', title: 'Auth token not refreshing after session expiry', source: 'GitHub',
        hotspots: [
          { shortFile: 'middleware.ts',   fullPath: 'packages/auth/middleware.ts',    confidence: 97, lines: '44–78'  },
          { shortFile: 'token-manager.ts',fullPath: 'packages/auth/token-manager.ts', confidence: 85, lines: '12–34' },
        ],
        owners: ['D'], risk: 'medium',
      },
    ];

    const active      = analyses[activeIdx];
    const riskColor   = r => r==='high' ? t.danger : r==='medium' ? t.warning : t.success;
    const confColor   = c => c >= 90 ? t.primary : c >= 80 ? t.secondary : t.warning;

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <StatusBar />
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>Ticket Analyzer</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>Convert issues → code hotspots instantly</div>
        </div>

        {/* Search input */}
        <div style={{ padding: '0 20px 18px' }}>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(window.lucide.Search, { size: 15, color: t.textMuted })}
            <input
              placeholder="Paste a Jira, Linear, or GitHub URL..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 12, color: t.text, fontFamily: "'Space Grotesk', sans-serif" }}
            />
            {query.length > 0 && React.createElement(window.lucide.ArrowRight, { size: 14, color: t.primary })}
          </div>
        </div>

        {/* Analysis tabs */}
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 10 }}>Recent Analyses</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {analyses.map((a, i) => (
              <div key={a.id} onClick={() => setActiveIdx(i)}
                style={{ padding: '5px 12px', borderRadius: 20, background: activeIdx===i ? t.primaryGlow : t.surface, border: `1px solid ${activeIdx===i ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: activeIdx===i ? t.primary : t.textSecondary }}>{a.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result card */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, overflow: 'hidden', animation: 'fadeSlideUp 0.2s ease' }}>
            {/* Ticket header */}
            <div style={{ padding: '16px', borderBottom: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ padding: '2px 8px', borderRadius: 6, background: t.surfaceAlt, fontSize: 10, fontWeight: 600, color: t.textSecondary }}>{active.source}</div>
                <span style={{ fontSize: 10, color: t.textMuted }}>{active.id}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.4, marginBottom: 12 }}>{active.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {active.owners.map((o, i) => (
                    <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>{o}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(window.lucide.AlertTriangle, { size: 11, color: riskColor(active.risk) })}
                  <span style={{ fontSize: 11, color: riskColor(active.risk), fontWeight: 600 }}>{active.risk === 'high' ? 'High Impact' : 'Medium Impact'}</span>
                </div>
              </div>
            </div>

            {/* Hotspots */}
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: 10 }}>Code Hotspots</div>
              {active.hotspots.map((h, i) => (
                <div key={i} style={{ marginBottom: 10, background: t.surfaceAlt, borderRadius: 12, padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.text, fontFamily: 'monospace' }}>{h.shortFile}</span>
                    <span style={{ fontSize: 11, color: confColor(h.confidence), fontWeight: 700 }}>{h.confidence}%</span>
                  </div>
                  <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 7, fontFamily: 'monospace' }}>{h.fullPath} · L{h.lines}</div>
                  <div style={{ height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${h.confidence}%`, height: '100%', background: confColor(h.confidence), borderRadius: 2, transition: 'width 0.7s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    );
  }

  // ─── SCREEN: ALERTS ───────────────────────────────────────────────────────────
  function AlertsScreen() {
    const [filter,   setFilter]   = useState('all');
    const [expanded, setExpanded] = useState(null);

    const alerts = [
      { id: 1, type: 'deploy', sev: 'info',    title: 'Deploy #4821 succeeded',          time: '3m ago',  summary: 'payments-service deployed to production. 3 files changed in the checkout flow.',              affected: ['payments.ts', 'webhook.ts'],  sanity: 'Monitor checkout funnel in Datadog' },
      { id: 2, type: 'risk',   sev: 'warning', title: 'High-risk merge pending review',  time: '27m ago', summary: 'auth/middleware.ts has 3 dependents not covered by current PR tests.',                       affected: ['middleware.ts'],              sanity: 'Run auth integration tests before merge' },
      { id: 3, type: 'owner',  sev: 'info',    title: 'Unknown file touched',            time: '1h ago',  summary: 'redis-client.ts modified by alex.m — no prior ownership. sarah.k may want to review.',      affected: ['redis-client.ts'],           sanity: 'Tag sarah.k on this PR for review' },
      { id: 4, type: 'deploy', sev: 'danger',  title: 'Deploy #4819 rolled back',        time: '4h ago',  summary: 'notification-service rollback triggered. Latency spike detected in SNS integration.',       affected: ['sns.ts', 'index.ts'],        sanity: 'SNS queue depth still elevated — monitor' },
    ];

    const filters  = ['all', 'deploy', 'risk', 'owner'];
    const visible  = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);
    const sevColor = s => s==='danger' ? t.danger  : s==='warning' ? t.warning  : t.primary;
    const sevBg    = s => s==='danger' ? t.dangerGlow : s==='warning' ? t.warningGlow : t.primaryGlow;
    const typeIcon = type => type==='deploy' ? window.lucide.Send : type==='risk' ? window.lucide.AlertTriangle : window.lucide.User;

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <StatusBar />
        <div style={{ padding: '0 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>Alerts</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{alerts.length} alerts · 1 needs action</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Sliders, { size: 15, color: t.textSecondary })}
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 6 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setFilter(f)}
              style={{ padding: '5px 12px', borderRadius: 20, background: filter===f ? t.primaryGlow : t.surface, border: `1px solid ${filter===f ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.2s' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: filter===f ? t.primary : t.textSecondary, textTransform: 'capitalize' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Alert cards */}
        <div style={{ padding: '0 20px' }}>
          {visible.map(alert => {
            const Icon  = typeIcon(alert.type);
            const isExp = expanded === alert.id;
            return (
              <div key={alert.id} onClick={() => setExpanded(isExp ? null : alert.id)}
                style={{ background: t.surface, border: `1px solid ${t.border}`, borderLeft: `3px solid ${sevColor(alert.sev)}`, borderRadius: 14, padding: '13px 14px', marginBottom: 10, cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: sevBg(alert.sev), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {React.createElement(Icon, { size: 15, color: sevColor(alert.sev) })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, flex: 1, marginRight: 8, lineHeight: 1.3 }}>{alert.title}</div>
                      <span style={{ fontSize: 10, color: t.textMuted, flexShrink: 0 }}>{alert.time}</span>
                    </div>
                    <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 4, lineHeight: 1.5 }}>{alert.summary}</div>
                  </div>
                </div>
                {isExp && (
                  <div style={{ marginTop: 12, animation: 'fadeSlideUp 0.15s ease' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                      {alert.affected.map((f, i) => (
                        <div key={i} style={{ padding: '3px 8px', borderRadius: 6, background: t.surfaceAlt, fontSize: 10, fontFamily: 'monospace', color: t.textSecondary }}>{f}</div>
                      ))}
                    </div>
                    <div style={{ background: t.surfaceAlt, borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {React.createElement(window.lucide.CheckCircle, { size: 12, color: t.primary })}
                      <span style={{ fontSize: 11, color: t.textSecondary }}>{alert.sanity}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ height: 24 }} />
      </div>
    );
  }

  // ─── SCREEN: SETTINGS ─────────────────────────────────────────────────────────
  function SettingsScreen() {
    const [notif,       setNotif]       = useState(true);
    const [autoAnalyze, setAutoAnalyze] = useState(true);
    const [blastWarn,   setBlastWarn]   = useState(true);

    const repos = [
      { name: 'frontend-monorepo', branch: 'main',    status: 'synced',  files: '2,847' },
      { name: 'backend-services',  branch: 'develop', status: 'syncing', files: '1,203' },
    ];

    function Toggle({ value, onChange }) {
      return (
        <div onClick={() => onChange(!value)}
          style={{ width: 44, height: 24, borderRadius: 12, background: value ? t.primary : t.border, cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
          <div style={{ position: 'absolute', top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
        </div>
      );
    }

    const sectionLabel = text => (
      <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: 8 }}>{text}</div>
    );

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <StatusBar />
        <div style={{ padding: '0 20px 18px' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>Settings</div>
        </div>

        {/* Profile */}
        <div style={{ margin: '0 20px 18px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SK</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>sarah.k</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>sarah@company.io</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.success }} />
              <span style={{ fontSize: 10, color: t.success }}>Connected to 2 repos</span>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div style={{ margin: '0 20px 16px' }}>
          {sectionLabel('Appearance')}
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16 }}>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDark
                    ? React.createElement(window.lucide.Moon, { size: 15, color: t.secondary })
                    : React.createElement(window.lucide.Sun,  { size: 15, color: t.warning   })}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
                  <div style={{ fontSize: 10, color: t.textMuted }}>Tap to switch theme</div>
                </div>
              </div>
              <div
                onClick={() => setIsDark(!isDark)}
                style={{ width: 44, height: 24, borderRadius: 12, background: isDark ? t.secondary : t.warning, cursor: 'pointer', position: 'relative', transition: 'background 0.25s' }}>
                <div style={{ position: 'absolute', top: 3, left: isDark ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Repos */}
        <div style={{ margin: '0 20px 16px' }}>
          {sectionLabel('Connected Repositories')}
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
            {repos.map((r, i) => (
              <div key={r.name} style={{ padding: '13px 16px', borderBottom: i < repos.length - 1 ? `1px solid ${t.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(window.lucide.GitBranch, { size: 14, color: t.primary })}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: t.textMuted }}>{r.branch} · {r.files} files</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: r.status === 'synced' ? t.success : t.warning }} />
                  <span style={{ fontSize: 10, color: r.status === 'synced' ? t.success : t.warning }}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={{ margin: '0 20px 16px' }}>
          {sectionLabel('Notifications')}
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
            {[
              { label: 'Push notifications',   sub: 'Deployment alerts, risk flags',        value: notif,       set: setNotif       },
              { label: 'Auto-analyze PRs',      sub: 'Trace blast radius on open',           value: autoAnalyze, set: setAutoAnalyze },
              { label: 'Blast radius warnings', sub: 'Alert before merging high-risk changes', value: blastWarn, set: setBlastWarn   },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{row.label}</div>
                  <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{row.sub}</div>
                </div>
                <Toggle value={row.value} onChange={row.set} />
              </div>
            ))}
          </div>
        </div>

        {/* Disconnect */}
        <div style={{ margin: '0 20px 24px' }}>
          <div style={{ background: t.dangerGlow, border: `1px solid rgba(255,71,87,0.25)`, borderRadius: 14, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            {React.createElement(window.lucide.LogOut, { size: 15, color: t.danger })}
            <span style={{ fontSize: 13, fontWeight: 600, color: t.danger }}>Disconnect from Merge Beacon</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── NAVIGATION CONFIG ────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home     },
    { id: 'map',      label: 'Map',      icon: window.lucide.Map      },
    { id: 'tickets',  label: 'Tickets',  icon: window.lucide.Tag      },
    { id: 'alerts',   label: 'Alerts',   icon: window.lucide.Bell     },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home:     HomeScreen,
    map:      MapScreen,
    tickets:  TicketsScreen,
    alerts:   AlertsScreen,
    settings: SettingsScreen,
  };

  const navItemStyle = active => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
    padding: '6px 12px', cursor: 'pointer',
    color: active ? t.primary : t.textMuted,
    transition: 'all 0.2s ease',
  });

  const labelStyle = { fontSize: 10, fontWeight: 500, letterSpacing: '0.2px' };

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ width: '100vw', height: '100vh', background: isDark ? '#030810' : '#c8d8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', boxShadow: isDark ? '0 40px 120px rgba(0,5,30,0.85), 0 0 0 1.5px rgba(0,212,255,0.07), 0 0 80px rgba(0,212,255,0.04)' : '0 40px 100px rgba(70,100,180,0.28), 0 0 0 1.5px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 36, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Active screen */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {React.createElement(screens[activeTab])}
        </div>

        {/* Bottom navigation */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 4px 22px', display: 'flex', justifyContent: 'space-around', zIndex: 10 }}>
          {tabs.map(tab => React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle(activeTab === tab.id),
          },
            React.createElement(tab.icon, { size: 22 }),
            React.createElement('span', { style: labelStyle }, tab.label)
          ))}
        </div>
      </div>
    </div>
  );
}
