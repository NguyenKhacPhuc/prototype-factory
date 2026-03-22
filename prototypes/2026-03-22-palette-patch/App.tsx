const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('scan');
  const [theme, setTheme] = useState('light');
  const [scanState, setScanState] = useState('idle');
  const [showOverlay, setShowOverlay] = useState(true);
  const [beforeAfter, setBeforeAfter] = useState('after');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [appliedFixes, setAppliedFixes] = useState(new Set());
  const [scanProgress, setScanProgress] = useState(0);
  const [pressedTab, setPressedTab] = useState(null);

  const themes = {
    light: {
      bg: '#F4F3FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EEEEFF',
      card: '#FFFFFF',
      text: '#1C1A3A',
      textSec: '#6B6894',
      textMuted: '#A8A5C8',
      border: '#E2E0F8',
      primary: '#6366F1',
      primaryLight: '#EEF0FF',
      primaryDark: '#4F46E5',
      primaryGrad: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
      accent: '#F97316',
      accentLight: '#FFF3E8',
      success: '#10B981',
      successLight: '#ECFDF5',
      warning: '#F59E0B',
      warningLight: '#FFFBEB',
      danger: '#EF4444',
      dangerLight: '#FEF2F2',
      navBg: '#FFFFFF',
      navBorder: '#E2E0F8',
      overlay: 'rgba(99,102,241,0.08)',
      shadow: '0 4px 24px rgba(99,102,241,0.12)',
      cardShadow: '0 2px 12px rgba(99,102,241,0.08)',
      statusText: '#1C1A3A',
    },
    dark: {
      bg: '#0D0C1A',
      surface: '#17152B',
      surfaceAlt: '#1F1D35',
      card: '#1F1D35',
      text: '#EEEEFF',
      textSec: '#9896C4',
      textMuted: '#5A5880',
      border: '#2A2845',
      primary: '#818CF8',
      primaryLight: '#1E1B3A',
      primaryDark: '#6366F1',
      primaryGrad: 'linear-gradient(135deg, #818CF8, #A78BFA)',
      accent: '#FB923C',
      accentLight: '#2A1A0A',
      success: '#34D399',
      successLight: '#0A2018',
      warning: '#FBBF24',
      warningLight: '#201A08',
      danger: '#F87171',
      dangerLight: '#200E0E',
      navBg: '#17152B',
      navBorder: '#2A2845',
      overlay: 'rgba(129,140,248,0.08)',
      shadow: '0 4px 24px rgba(0,0,0,0.4)',
      cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
      statusText: '#EEEEFF',
    }
  };
  const t = themes[theme];

  const issues = [
    { id: 1, type: 'contrast', label: 'Low Contrast', severity: 'critical', element: 'Body text on yellow bg', x: 38, y: 42, fix: 'Darken text to #1A1A1A', color: '#EF4444', detail: 'Contrast ratio 2.1:1 — WCAG requires 4.5:1 for normal text.' },
    { id: 2, type: 'hierarchy', label: 'Weak Hierarchy', severity: 'high', element: 'Headline vs subhead size', x: 62, y: 22, fix: 'Increase headline to 32px', color: '#F59E0B', detail: 'Headline (18px) and subhead (16px) are too close in size to establish clear visual order.' },
    { id: 3, type: 'spacing', label: 'Cluttered Spacing', severity: 'medium', element: 'CTA button area', x: 50, y: 68, fix: 'Add 24px padding around CTA', color: '#8B5CF6', detail: 'CTA button has only 6px internal padding, making it hard to tap and visually weak.' },
    { id: 4, type: 'color', label: 'Brand Drift', severity: 'medium', element: 'Accent color mismatch', x: 78, y: 55, fix: 'Replace #FF6B35 → #F97316', color: '#6366F1', detail: 'This orange drifts 14° hue from your saved brand palette. Use your primary accent.' },
  ];

  const paletteSwaps = [
    { id: 1, name: 'Original', colors: ['#FFD600', '#FF6B35', '#1A237E', '#FFFFFF'], active: beforeAfter === 'before' },
    { id: 2, name: 'Accessible', colors: ['#F59E0B', '#F97316', '#1C1A3A', '#FFFFFF'], active: beforeAfter === 'after' && !appliedFixes.has('palette-2') },
    { id: 3, name: 'Bold Contrast', colors: ['#6366F1', '#F97316', '#0D0C1A', '#F4F3FF'], active: false },
    { id: 4, name: 'Soft Professional', colors: ['#818CF8', '#34D399', '#1C1A3A', '#F4F3FF'], active: false },
  ];

  const projects = [
    { id: 1, name: 'Cafe Menu Spring', type: 'Print', issues: 2, score: 82, color: '#10B981', date: 'Mar 20', thumb: '#F59E0B' },
    { id: 2, name: 'Event Flyer — April Gig', type: 'Social', issues: 5, score: 61, color: '#EF4444', date: 'Mar 18', thumb: '#6366F1' },
    { id: 3, name: 'Pitch Deck v3', type: 'Presentation', issues: 1, score: 94, color: '#10B981', date: 'Mar 15', thumb: '#F97316' },
    { id: 4, name: 'Product Packaging', type: 'Print', issues: 3, score: 73, color: '#F59E0B', date: 'Mar 12', thumb: '#8B5CF6' },
    { id: 5, name: 'Instagram Story Kit', type: 'Social', issues: 0, score: 98, color: '#10B981', date: 'Mar 8', thumb: '#34D399' },
  ];

  const recentScans = [
    { label: 'Cafe Menu', color: '#F59E0B', issues: 2 },
    { label: 'Event Flyer', color: '#6366F1', issues: 5 },
    { label: 'Story Kit', color: '#34D399', issues: 0 },
  ];

  const startScan = () => {
    setScanState('scanning');
    setScanProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) { p = 100; clearInterval(interval); setTimeout(() => { setScanState('complete'); setActiveTab('analyze'); }, 400); }
      setScanProgress(Math.min(p, 100));
    }, 160);
  };

  const toggleFix = (id) => {
    setAppliedFixes(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const ScanIcon = window.lucide?.Scan;
  const UploadIcon = window.lucide?.Upload;
  const ZapIcon = window.lucide?.Zap;
  const AlertTriangleIcon = window.lucide?.AlertTriangle;
  const CheckCircleIcon = window.lucide?.CheckCircle;
  const XCircleIcon = window.lucide?.XCircle;
  const FolderIcon = window.lucide?.Folder;
  const SettingsIcon = window.lucide?.Settings;
  const SunIcon = window.lucide?.Sun;
  const MoonIcon = window.lucide?.Moon;
  const EyeIcon = window.lucide?.Eye;
  const PaletteIcon = window.lucide?.Palette;
  const LayersIcon = window.lucide?.Layers;
  const ArrowRightIcon = window.lucide?.ArrowRight;
  const SparklesIcon = window.lucide?.Sparkles;
  const ChevronRightIcon = window.lucide?.ChevronRight;
  const BellIcon = window.lucide?.Bell;
  const ShieldIcon = window.lucide?.Shield;
  const DownloadIcon = window.lucide?.Download;
  const RefreshCwIcon = window.lucide?.RefreshCw;
  const TargetIcon = window.lucide?.Target;
  const TrendingUpIcon = window.lucide?.TrendingUp;
  const InfoIcon = window.lucide?.Info;
  const TypeIcon = window.lucide?.Type;
  const MoveIcon = window.lucide?.Move;

  const severityColor = (s) => s === 'critical' ? t.danger : s === 'high' ? t.warning : t.primary;
  const severityBg = (s) => s === 'critical' ? t.dangerLight : s === 'high' ? t.warningLight : t.primaryLight;

  const ScanScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px' }}>Scan Design</div>
          <div style={{ fontSize: 13, color: t.textSec, marginTop: 2 }}>Point camera or upload a file</div>
        </div>
        {BellIcon && <div style={{ width: 38, height: 38, borderRadius: 12, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.cardShadow }}>
          <BellIcon size={18} color={t.textSec} />
        </div>}
      </div>

      {/* Viewfinder */}
      <div style={{ margin: '12px 20px', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 220, background: '#0D0C1A', boxShadow: t.shadow }}>
        {/* Simulated viewfinder grid */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: `${(i + 1) * 20}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.07)' }} />
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${(i + 1) * 20}%`, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        ))}
        {/* Corner brackets */}
        {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, width: 24, height: 24, borderColor: t.primary, borderStyle: 'solid', borderWidth: 0, ...(i === 0 ? { borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 4 } : i === 1 ? { borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 4 } : i === 2 ? { borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 4 } : { borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 4 }) }} />
        ))}
        {scanState === 'idle' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {ScanIcon && <ScanIcon size={36} color="rgba(255,255,255,0.3)" />}
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 10, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Align your design in frame</div>
          </div>
        )}
        {scanState === 'scanning' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', border: `3px solid ${t.primary}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 14, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Analyzing design…</div>
            <div style={{ width: 140, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 12, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${scanProgress}%`, background: t.primaryGrad, borderRadius: 2, transition: 'width 0.15s ease' }} />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{Math.round(scanProgress)}%</div>
          </div>
        )}
        {scanState === 'complete' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {CheckCircleIcon && <CheckCircleIcon size={40} color={t.success} />}
            <div style={{ color: '#fff', fontSize: 14, marginTop: 10, fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Scan Complete!</div>
          </div>
        )}
        {/* Scan line animation */}
        {scanState === 'scanning' && (
          <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`, animation: 'scanline 1.5s ease-in-out infinite' }} />
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ padding: '0 20px', display: 'flex', gap: 10 }}>
        <button onClick={startScan} disabled={scanState === 'scanning'} style={{ flex: 1, padding: '14px', background: t.primaryGrad, border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: scanState === 'scanning' ? 0.6 : 1, transition: 'opacity 0.2s' }}>
          {ScanIcon && <ScanIcon size={18} color="#fff" />}
          {scanState === 'scanning' ? 'Scanning…' : 'Scan Now'}
        </button>
        <button style={{ width: 52, height: 52, background: t.surface, border: `1.5px solid ${t.border}`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: t.cardShadow }}>
          {UploadIcon && <UploadIcon size={20} color={t.primary} />}
        </button>
      </div>

      {/* Recent Scans */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 12 }}>Recent Scans</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {recentScans.map((s, i) => (
            <div key={i} onClick={() => { setScanState('complete'); setActiveTab('analyze'); }} style={{ flex: 1, background: t.surface, borderRadius: 14, padding: '12px 10px', boxShadow: t.cardShadow, border: `1.5px solid ${t.border}`, cursor: 'pointer', transition: 'transform 0.15s' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color, marginBottom: 8, opacity: 0.85 }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: s.issues > 0 ? t.danger : t.success, marginTop: 4, fontWeight: 600 }}>{s.issues > 0 ? `${s.issues} issues` : 'All clear'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Card */}
      <div style={{ margin: '16px 20px 20px', background: t.primaryLight, borderRadius: 16, padding: '14px 16px', border: `1.5px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          {ZapIcon && <ZapIcon size={18} color={t.primary} style={{ marginTop: 1 }} />}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Pro Tip</div>
            <div style={{ fontSize: 12, color: t.textSec, marginTop: 3, lineHeight: 1.5 }}>For print designs, scan in bright, even lighting. For digital assets, upload a PNG directly for the sharpest analysis.</div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyzeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px' }}>Analysis</div>
          <div style={{ fontSize: 13, color: t.textSec, marginTop: 2 }}>Cafe Menu Spring · Mar 22</div>
        </div>
        <div style={{ background: t.dangerLight, borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
          {AlertTriangleIcon && <AlertTriangleIcon size={14} color={t.danger} />}
          <span style={{ fontSize: 13, fontWeight: 700, color: t.danger, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>4 Issues</span>
        </div>
      </div>

      {/* Design Preview with Annotations */}
      <div style={{ margin: '8px 20px 0', position: 'relative', borderRadius: 16, overflow: 'hidden', height: 200, boxShadow: t.shadow }}>
        {/* Simulated design */}
        <div style={{ position: 'absolute', inset: 0, background: '#FFD600', display: 'flex', flexDirection: 'column', padding: 16 }}>
          <div style={{ fontSize: 11, color: '#FF6B35', fontWeight: 800, letterSpacing: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>CAFÉ SOLEIL</div>
          <div style={{ fontSize: 22, color: '#FFD600', fontWeight: 900, marginTop: 2, fontFamily: 'Plus Jakarta Sans, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>SPRING MENU</div>
          <div style={{ fontSize: 13, color: '#FFE066', marginTop: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Fresh · Seasonal · Local</div>
          <div style={{ flex: 1 }} />
          <div style={{ alignSelf: 'flex-start', background: '#FF6B35', borderRadius: 8, padding: '5px 14px' }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>VIEW FULL MENU</span>
          </div>
        </div>
        {/* Overlay toggle */}
        <button onClick={() => setShowOverlay(!showOverlay)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: 8, padding: '5px 10px', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 5 }}>
          {EyeIcon && <EyeIcon size={12} color="#fff" />} {showOverlay ? 'Hide' : 'Show'} Issues
        </button>
        {/* Issue pins */}
        {showOverlay && issues.map(issue => (
          <button key={issue.id} onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)} style={{ position: 'absolute', left: `${issue.x}%`, top: `${issue.y}%`, transform: 'translate(-50%, -50%)', width: 24, height: 24, borderRadius: '50%', background: issue.color, border: '2.5px solid #fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff', boxShadow: `0 2px 8px ${issue.color}88`, zIndex: 10, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'transform 0.15s' }}>
            {issue.id}
          </button>
        ))}
      </div>

      {/* Selected Issue Detail */}
      {selectedIssue && (
        <div style={{ margin: '10px 20px 0', background: t.surface, borderRadius: 14, padding: '14px', border: `1.5px solid ${selectedIssue.color}55`, boxShadow: t.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedIssue.color }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{selectedIssue.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: selectedIssue.color, background: severityBg(selectedIssue.severity), padding: '2px 8px', borderRadius: 6 }}>{selectedIssue.severity.toUpperCase()}</span>
            </div>
            <button onClick={() => setSelectedIssue(null)} style={{ background: 'none', border: 'none', color: t.textMuted, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5 }}>{selectedIssue.detail}</div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            {SparklesIcon && <SparklesIcon size={13} color={t.primary} />}
            <span style={{ fontSize: 12, fontWeight: 600, color: t.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Fix: {selectedIssue.fix}</span>
          </div>
        </div>
      )}

      {/* Issues List */}
      <div style={{ padding: '14px 20px 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 10 }}>All Issues</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {issues.map(issue => (
            <button key={issue.id} onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)} style={{ background: t.surface, border: `1.5px solid ${selectedIssue?.id === issue.id ? issue.color : t.border}`, borderRadius: 14, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', boxShadow: t.cardShadow, transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: severityBg(issue.severity), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {AlertTriangleIcon && <AlertTriangleIcon size={17} color={issue.color} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{issue.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: issue.color, background: severityBg(issue.severity), padding: '1px 7px', borderRadius: 5 }}>{issue.severity}</span>
                  </div>
                  <div style={{ fontSize: 12, color: t.textSec, marginTop: 2 }}>{issue.element}</div>
                </div>
                {ChevronRightIcon && <ChevronRightIcon size={16} color={t.textMuted} />}
              </div>
            </button>
          ))}
        </div>
        {/* Go to Fixes */}
        <button onClick={() => setActiveTab('fixes')} style={{ width: '100%', marginTop: 14, padding: '15px', background: t.primaryGrad, border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {SparklesIcon && <SparklesIcon size={18} color="#fff" />} See Fixes
          {ArrowRightIcon && <ArrowRightIcon size={16} color="#fff" />}
        </button>
      </div>
    </div>
  );

  const FixesScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px' }}>Fixes</div>
          <div style={{ fontSize: 13, color: t.textSec, marginTop: 2 }}>One-tap repairs for your design</div>
        </div>
        <div style={{ background: t.successLight, borderRadius: 10, padding: '6px 12px' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.success, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{appliedFixes.size} applied</span>
        </div>
      </div>

      {/* Before / After Toggle */}
      <div style={{ margin: '8px 20px 0', display: 'flex', background: t.surface, borderRadius: 12, padding: 3, border: `1.5px solid ${t.border}`, boxShadow: t.cardShadow }}>
        {['before', 'after'].map(v => (
          <button key={v} onClick={() => setBeforeAfter(v)} style={{ flex: 1, padding: '9px', border: 'none', borderRadius: 9, background: beforeAfter === v ? t.primaryGrad : 'transparent', color: beforeAfter === v ? '#fff' : t.textSec, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s' }}>
            {v === 'before' ? 'Before' : 'After Fixes'}
          </button>
        ))}
      </div>

      {/* Design Preview */}
      <div style={{ margin: '12px 20px 0', borderRadius: 16, overflow: 'hidden', height: 180, position: 'relative', boxShadow: t.shadow }}>
        {beforeAfter === 'before' ? (
          <div style={{ position: 'absolute', inset: 0, background: '#FFD600', display: 'flex', flexDirection: 'column', padding: 16 }}>
            <div style={{ fontSize: 10, color: '#FF6B35', fontWeight: 800, letterSpacing: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>CAFÉ SOLEIL</div>
            <div style={{ fontSize: 22, color: '#FFD600', fontWeight: 900, marginTop: 2, fontFamily: 'Plus Jakarta Sans, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>SPRING MENU</div>
            <div style={{ fontSize: 13, color: '#FFE066', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Fresh · Seasonal · Local</div>
            <div style={{ flex: 1 }} />
            <div style={{ alignSelf: 'flex-start', background: '#FF6B35', borderRadius: 8, padding: '5px 14px' }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>VIEW FULL MENU</span>
            </div>
          </div>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: '#F59E0B', display: 'flex', flexDirection: 'column', padding: 16 }}>
            <div style={{ fontSize: 10, color: '#1C1A3A', fontWeight: 800, letterSpacing: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>CAFÉ SOLEIL</div>
            <div style={{ fontSize: 28, color: '#1C1A3A', fontWeight: 900, marginTop: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SPRING MENU</div>
            <div style={{ fontSize: 13, color: '#3D3A5C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Fresh · Seasonal · Local</div>
            <div style={{ flex: 1 }} />
            <div style={{ alignSelf: 'flex-start', background: '#1C1A3A', borderRadius: 8, padding: '10px 20px' }}>
              <span style={{ color: '#F59E0B', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>VIEW FULL MENU</span>
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.55)', borderRadius: 8, padding: '3px 10px' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{beforeAfter === 'before' ? 'BEFORE' : 'AFTER'}</span>
        </div>
      </div>

      {/* Palette Swaps */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          {PaletteIcon && <PaletteIcon size={16} color={t.primary} />} Palette Options
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {paletteSwaps.map(p => (
            <div key={p.id} style={{ flex: 1, background: t.surface, borderRadius: 12, padding: '10px 8px', border: `2px solid ${p.active ? t.primary : t.border}`, cursor: 'pointer', boxShadow: t.cardShadow, transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 7 }}>
                {p.colors.map((c, i) => (
                  <div key={i} style={{ flex: 1, height: 16, borderRadius: 4, background: c }} />
                ))}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: p.active ? t.primary : t.textSec, fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'center' }}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Fixes */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 10 }}>Issue Fixes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {issues.map(issue => {
            const applied = appliedFixes.has(issue.id);
            return (
              <div key={issue.id} style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', border: `1.5px solid ${applied ? t.success + '55' : t.border}`, boxShadow: t.cardShadow }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{issue.label}</div>
                    <div style={{ fontSize: 12, color: t.primary, marginTop: 2, fontWeight: 600 }}>{issue.fix}</div>
                  </div>
                  <button onClick={() => toggleFix(issue.id)} style={{ background: applied ? t.success : t.primaryGrad, border: 'none', borderRadius: 10, padding: '8px 14px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap', transition: 'background 0.2s' }}>
                    {applied ? '✓ Applied' : 'Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => { setAppliedFixes(new Set(issues.map(i => i.id))); setBeforeAfter('after'); }} style={{ width: '100%', marginTop: 14, padding: '15px', background: t.primaryGrad, border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {SparklesIcon && <SparklesIcon size={18} color="#fff" />} Apply All Fixes
        </button>
        <button style={{ width: '100%', marginTop: 8, padding: '14px', background: 'transparent', border: `1.5px solid ${t.border}`, borderRadius: 14, color: t.text, fontSize: 14, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {DownloadIcon && <DownloadIcon size={16} color={t.primary} />} Export Fixed Design
        </button>
      </div>
    </div>
  );

  const ProjectsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px' }}>Projects</div>
          <div style={{ fontSize: 13, color: t.textSec, marginTop: 2 }}>Track brand consistency</div>
        </div>
        <button style={{ width: 38, height: 38, background: t.primaryGrad, borderRadius: 12, border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>+</button>
      </div>

      {/* Brand Health Card */}
      <div style={{ margin: '8px 20px 0', background: t.primaryGrad, borderRadius: 18, padding: '18px 20px', boxShadow: t.shadow, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -30, right: 30, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>Overall Brand Health</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.1, marginTop: 4 }}>81<span style={{ fontSize: 22 }}>/100</span></div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Across 5 projects · 3 active issues</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
          {[{ label: 'Color', val: 88 }, { label: 'Type', val: 76 }, { label: 'Spacing', val: 79 }].map(m => (
            <div key={m.label} style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 4 }}>{m.label}</div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${m.val}%`, background: '#fff', borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 12, color: '#fff', fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', marginTop: 4 }}>{m.val}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 8 }}>
        {['All', 'Social', 'Print', 'Presentation'].map((f, i) => (
          <button key={f} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${i === 0 ? t.primary : t.border}`, background: i === 0 ? t.primaryLight : 'transparent', color: i === 0 ? t.primary : t.textSec, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>{f}</button>
        ))}
      </div>

      {/* Projects List */}
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map(proj => (
          <div key={proj.id} style={{ background: t.surface, borderRadius: 16, padding: '14px', border: `1.5px solid ${t.border}`, boxShadow: t.cardShadow, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: proj.thumb, opacity: 0.85, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {LayersIcon && <LayersIcon size={22} color="#fff" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{proj.name}</div>
                <div style={{ fontSize: 12, color: t.textSec, marginTop: 2 }}>{proj.type} · {proj.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: proj.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{proj.score}</div>
                <div style={{ fontSize: 10, color: t.textMuted }}>score</div>
              </div>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ height: 5, flex: 1, background: t.surfaceAlt, borderRadius: 3, marginRight: 12, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${proj.score}%`, background: proj.color, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 12, color: proj.issues > 0 ? t.danger : t.success, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {proj.issues > 0 ? `${proj.issues} issues` : 'No issues'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px' }}>Settings</div>
        <div style={{ fontSize: 13, color: t.textSec, marginTop: 2 }}>Preferences & account</div>
      </div>

      {/* Profile Card */}
      <div style={{ margin: '8px 20px 0', background: t.surface, borderRadius: 18, padding: '16px', border: `1.5px solid ${t.border}`, boxShadow: t.cardShadow }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>M</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Maya Chen</div>
            <div style={{ fontSize: 13, color: t.textSec }}>maya@freelance.design</div>
            <div style={{ fontSize: 12, color: t.primary, marginTop: 4, fontWeight: 600 }}>Pro Plan · 5 of 20 scans used</div>
          </div>
          {ChevronRightIcon && <ChevronRightIcon size={18} color={t.textMuted} />}
        </div>
        <div style={{ marginTop: 12, height: 5, background: t.surfaceAlt, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '25%', background: t.primaryGrad, borderRadius: 3 }} />
        </div>
      </div>

      {/* Theme Toggle */}
      <div style={{ margin: '14px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Appearance</div>
        <div style={{ background: t.surface, borderRadius: 16, border: `1.5px solid ${t.border}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {theme === 'dark' ? (MoonIcon && <MoonIcon size={17} color={t.primary} />) : (SunIcon && <SunIcon size={17} color={t.primary} />)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Theme</div>
                <div style={{ fontSize: 12, color: t.textSec }}>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</div>
              </div>
            </div>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ width: 50, height: 28, borderRadius: 14, background: theme === 'dark' ? t.primary : t.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
              <div style={{ position: 'absolute', top: 3, left: theme === 'dark' ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      {[
        { label: 'Analysis', items: [
          { icon: TargetIcon, title: 'Scan Context', sub: 'Social, Print, Presentation' },
          { icon: EyeIcon, title: 'Accessibility Mode', sub: 'Check WCAG 2.1 compliance' },
          { icon: PaletteIcon, title: 'Brand Palette', sub: '4 colors saved' },
        ]},
        { label: 'Notifications', items: [
          { icon: BellIcon, title: 'Issue Alerts', sub: 'Notify on critical issues' },
          { icon: TrendingUpIcon, title: 'Weekly Reports', sub: 'Brand consistency digest' },
        ]},
        { label: 'Data & Export', items: [
          { icon: DownloadIcon, title: 'Export Format', sub: 'PNG, PDF, SVG' },
          { icon: ShieldIcon, title: 'Privacy', sub: 'Scans stay on device' },
        ]},
      ].map(section => (
        <div key={section.label} style={{ margin: '14px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{section.label}</div>
          <div style={{ background: t.surface, borderRadius: 16, border: `1.5px solid ${t.border}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
            {section.items.map((item, idx) => (
              <div key={idx} style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: idx < section.items.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon && <item.icon size={16} color={t.primary} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: t.textSec }}>{item.sub}</div>
                </div>
                {ChevronRightIcon && <ChevronRightIcon size={16} color={t.textMuted} />}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ height: 30 }} />
    </div>
  );

  const tabs = [
    { id: 'scan', label: 'Scan', icon: ScanIcon },
    { id: 'analyze', label: 'Analyze', icon: AlertTriangleIcon },
    { id: 'fixes', label: 'Fixes', icon: SparklesIcon },
    { id: 'projects', label: 'Projects', icon: FolderIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'scan': return <ScanScreen />;
      case 'analyze': return <AnalyzeScreen />;
      case 'fixes': return <FixesScreen />;
      case 'projects': return <ProjectsScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <ScanScreen />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#E8E6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif', padding: '20px 0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes scanline { 0% { top: 10%; } 50% { top: 88%; } 100% { top: 10%; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
      `}</style>

      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 48, overflow: 'hidden', position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 8px #1C1A3A, 0 0 0 10px #2A2845', display: 'flex', flexDirection: 'column' }}>

        {/* Status Bar */}
        <div style={{ background: t.bg, padding: '14px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.statusText, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>9:41</span>
          <div style={{ width: 120, height: 30, background: '#0D0C1A', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Signal bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
              {[8, 11, 14, 17].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: t.statusText, borderRadius: 1, opacity: i < 3 ? 1 : 0.3 }} />
              ))}
            </div>
            {/* Wifi */}
            <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
              <path d="M8 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill={t.statusText} />
              <path d="M5 8.5c.8-.9 1.9-1.5 3-1.5s2.2.6 3 1.5" stroke={t.statusText} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 5.5c1.6-2 3.8-3 6-3s4.4 1 6 3" stroke={t.statusText} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            </svg>
            {/* Battery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 22, height: 11, border: `1.5px solid ${t.statusText}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: 1.5 }}>
                <div style={{ width: '80%', height: '100%', background: t.statusText, borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 5, background: t.statusText, borderRadius: '0 1px 1px 0', opacity: 0.6 }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: 4 }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.navBorder}`, padding: '6px 8px 22px', display: 'flex', justifyContent: 'space-around', flexShrink: 0, boxShadow: `0 -4px 20px rgba(0,0,0,0.06)` }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, background: 'none', border: 'none', padding: '6px 4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, transition: 'transform 0.15s', transform: pressedTab === tab.id ? 'scale(0.88)' : 'scale(1)' }}
                onMouseDown={() => setPressedTab(tab.id)} onMouseUp={() => setPressedTab(null)} onTouchStart={() => setPressedTab(tab.id)} onTouchEnd={() => setPressedTab(null)}>
                <div style={{ width: 34, height: 28, borderRadius: 10, background: active ? t.primaryLight : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                  {tab.icon && <tab.icon size={18} color={active ? t.primary : t.textMuted} />}
                </div>
                <span style={{ fontSize: 10, fontWeight: active ? 800 : 500, color: active ? t.primary : t.textMuted, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'color 0.2s' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
