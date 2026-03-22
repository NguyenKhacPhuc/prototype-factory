const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0C10',
    surface: '#12161E',
    surfaceAlt: '#1A1F2E',
    surfaceHover: '#222840',
    border: '#1E2540',
    borderAccent: '#2A3560',
    text: '#E8EEFF',
    textSub: '#7B8DB0',
    textMuted: '#4A5580',
    primary: '#4DFFCC',
    primaryDim: '#1A5544',
    primaryGlow: 'rgba(77,255,204,0.15)',
    secondary: '#7B6DFF',
    secondaryDim: '#2A2460',
    accent: '#FF6B9D',
    warn: '#FFB347',
    success: '#4DFFCC',
    error: '#FF5A7A',
    overlay: 'rgba(0,0,0,0.7)',
    glass: 'rgba(18,22,30,0.92)',
    gradient: 'linear-gradient(135deg, #0A0C10 0%, #12161E 100%)',
  },
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF2FF',
    surfaceHover: '#E4EAFF',
    border: '#D8E0FF',
    borderAccent: '#B8C8FF',
    text: '#0D1230',
    textSub: '#4A5A8A',
    textMuted: '#8A9AC0',
    primary: '#00C896',
    primaryDim: '#D0FFF3',
    primaryGlow: 'rgba(0,200,150,0.15)',
    secondary: '#6355E8',
    secondaryDim: '#EAE8FF',
    accent: '#E8406A',
    warn: '#F07800',
    success: '#00C896',
    error: '#E8406A',
    overlay: 'rgba(0,0,0,0.5)',
    glass: 'rgba(255,255,255,0.95)',
    gradient: 'linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 100%)',
  },
};

const shotPresets = [
  { id: 1, name: 'Renovation Progress', icon: '🏠', count: 12, lastUsed: '2d ago', color: '#4DFFCC', category: 'Home', thumbnail: null },
  { id: 2, name: 'Outfit of the Day', icon: '👗', count: 28, lastUsed: '1d ago', color: '#7B6DFF', category: 'Content', thumbnail: null },
  { id: 3, name: 'Product Listing', icon: '📦', count: 7, lastUsed: '5d ago', color: '#FF6B9D', category: 'Business', thumbnail: null },
  { id: 4, name: 'Before & After Fitness', icon: '💪', count: 16, lastUsed: '3d ago', color: '#FFB347', category: 'Fitness', thumbnail: null },
  { id: 5, name: 'Travel Spot Revisit', icon: '✈️', count: 4, lastUsed: '12d ago', color: '#4DC8FF', category: 'Travel', thumbnail: null },
  { id: 6, name: 'Real Estate Tour', icon: '🏢', count: 23, lastUsed: '1d ago', color: '#B84DFF', category: 'Business', thumbnail: null },
];

const timelineItems = [
  { id: 1, preset: 'Renovation Progress', date: 'Mar 22, 2026', matchScore: 97, label: 'Week 8' },
  { id: 2, preset: 'Renovation Progress', date: 'Mar 1, 2026', matchScore: 94, label: 'Week 6' },
  { id: 3, preset: 'Renovation Progress', date: 'Feb 8, 2026', matchScore: 89, label: 'Week 4' },
  { id: 4, preset: 'Renovation Progress', date: 'Jan 18, 2026', matchScore: 91, label: 'Week 2' },
  { id: 5, preset: 'Outfit of the Day', date: 'Mar 21, 2026', matchScore: 98, label: 'Look #28' },
  { id: 6, preset: 'Outfit of the Day', date: 'Mar 19, 2026', matchScore: 96, label: 'Look #27' },
];

function App() {
  const [themeKey, setThemeKey] = useState('dark');
  const [activeTab, setActiveTab] = useState('camera');
  const [ghostOpacity, setGhostOpacity] = useState(0.45);
  const [ghostActive, setGhostActive] = useState(true);
  const [matchScore, setMatchScore] = useState(73);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(shotPresets[0]);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [filterCat, setFilterCat] = useState('All');
  const [notif, setNotif] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [sliderX, setSliderX] = useState(50);
  const [horizonWarn, setHorizonWarn] = useState(true);
  const [lightWarn, setLightWarn] = useState(false);
  const [capturedCount, setCapturedCount] = useState(3);
  const animRef = useRef(null);

  const t = themes[themeKey];

  // Simulate score drift
  useEffect(() => {
    const drift = setInterval(() => {
      setMatchScore(prev => {
        const delta = (Math.random() - 0.4) * 3;
        return Math.max(40, Math.min(99, Math.round(prev + delta)));
      });
    }, 1800);
    return () => clearInterval(drift);
  }, []);

  useEffect(() => {
    if (notif) {
      const t = setTimeout(() => setNotif(null), 2500);
      return () => clearTimeout(t);
    }
  }, [notif]);

  const showNotif = (msg, type = 'success') => setNotif({ msg, type });

  const handleCapture = () => {
    setIsRecording(true);
    setCapturedCount(p => p + 1);
    showNotif(`Shot captured! Match: ${matchScore}%`, 'success');
    setTimeout(() => setIsRecording(false), 1000);
  };

  const btn = (id) => ({
    transform: pressedBtn === id ? 'scale(0.93)' : 'scale(1)',
    transition: 'all 0.12s ease',
    cursor: 'pointer',
  });

  const press = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 150); };

  const scoreColor = matchScore >= 90 ? t.success : matchScore >= 70 ? t.warn : t.error;

  // Font loader
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');*{font-family:'Space Grotesk',sans-serif;box-sizing:border-box;margin:0;padding:0;}`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const NavBar = () => {
    const tabs = [
      { id: 'camera', icon: window.lucide.Camera, label: 'Capture' },
      { id: 'library', icon: window.lucide.Layout, label: 'Library' },
      { id: 'timeline', icon: window.lucide.GitCompare, label: 'Timeline' },
      { id: 'settings', icon: window.lucide.Settings, label: 'Settings' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 78, background: t.glass, borderTop: `1px solid ${t.border}`, backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 8, zIndex: 100 }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <div key={tab.id} onClick={() => { setActiveTab(tab.id); press(tab.id); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '6px 14px', borderRadius: 14, background: active ? t.primaryGlow : 'transparent', transition: 'all 0.2s ease', ...btn(tab.id) }}>
              <Icon size={22} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{ fontSize: 10, color: active ? t.primary : t.textMuted, fontWeight: active ? 600 : 400, letterSpacing: '0.02em' }}>{tab.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const StatusBar = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 6px', zIndex: 200 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: activeTab === 'camera' ? '#fff' : t.text }}>9:41</span>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 34, background: '#000', borderRadius: 20 }} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: activeTab === 'camera' ? '#fff' : t.textSub })}
        {React.createElement(window.lucide.Battery, { size: 16, color: activeTab === 'camera' ? '#fff' : t.textSub })}
      </div>
    </div>
  );

  // ── CAMERA SCREEN ──
  const CameraScreen = () => {
    const cameraGrad = 'linear-gradient(170deg, #1a2438 0%, #0d1520 40%, #152030 70%, #1a1428 100%)';
    return (
      <div style={{ position: 'absolute', inset: 0, background: cameraGrad, overflow: 'hidden' }}>
        {/* Scene elements */}
        <div style={{ position: 'absolute', bottom: '28%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '15%', right: '15%', height: 60, background: 'rgba(255,255,255,0.03)', borderRadius: 4 }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '20%', width: 40, height: 90, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '25%', width: 30, height: 70, background: 'rgba(255,255,255,0.04)', borderRadius: 4 }} />

        {/* Ghost overlay */}
        {ghostActive && (
          <div style={{ position: 'absolute', inset: 0, opacity: ghostOpacity, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', bottom: '28%', left: 0, right: 0, height: 1, background: t.primary }} />
            <div style={{ position: 'absolute', bottom: '20%', left: '12%', right: '12%', height: 62, border: `2px solid ${t.primary}`, borderRadius: 4, background: 'transparent' }} />
            <div style={{ position: 'absolute', bottom: '20%', left: '17%', width: 42, height: 92, border: `2px solid ${t.primary}`, borderRadius: 4 }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '22%', width: 32, height: 72, border: `1.5px solid ${t.primary}`, borderRadius: 4 }} />
            {/* Ghost person silhouette */}
            <div style={{ position: 'absolute', bottom: '21%', left: '43%', width: 56, height: 110, border: `2px solid ${t.primary}`, borderRadius: '30% 30% 0 0', background: `${t.primary}18` }} />
            <div style={{ position: 'absolute', bottom: '21%', left: '43%', width: 56, height: 110, borderRadius: '30% 30% 0 0', background: `${t.primary}08` }} />
          </div>
        )}

        {/* Rule of thirds grid */}
        {gridEnabled && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.25 }}>
            {[1,2].map(i => (
              <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 33.33}%`, width: 1, background: '#fff' }} />
            ))}
            {[1,2].map(i => (
              <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 33.33}%`, height: 1, background: '#fff' }} />
            ))}
          </div>
        )}

        {/* Corner brackets */}
        {['tl','tr','bl','br'].map(c => {
          const isTop = c.startsWith('t'), isLeft = c.endsWith('l');
          return (
            <div key={c} style={{ position: 'absolute', top: isTop ? 80 : undefined, bottom: !isTop ? 100 : undefined, left: isLeft ? 16 : undefined, right: !isLeft ? 16 : undefined, width: 22, height: 22, borderTop: isTop ? `2.5px solid ${t.primary}` : 'none', borderBottom: !isTop ? `2.5px solid ${t.primary}` : 'none', borderLeft: isLeft ? `2.5px solid ${t.primary}` : 'none', borderRight: !isLeft ? `2.5px solid ${t.primary}` : 'none' }} />
          );
        })}

        {/* Top HUD */}
        <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Preset label */}
          <div style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 13 }}>{selectedPreset.icon}</span>
            <span style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>{selectedPreset.name}</span>
          </div>
          {/* Match score */}
          <div style={{ background: `${scoreColor}22`, backdropFilter: 'blur(12px)', borderRadius: 20, padding: '5px 12px', border: `1px solid ${scoreColor}55`, display: 'flex', alignItems: 'center', gap: 6 }}>
            {React.createElement(window.lucide.Target, { size: 13, color: scoreColor })}
            <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor }}>{matchScore}%</span>
          </div>
        </div>

        {/* Warning badges */}
        <div style={{ position: 'absolute', top: 102, left: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {horizonWarn && (
            <div style={{ background: 'rgba(255,179,71,0.18)', border: `1px solid ${t.warn}55`, borderRadius: 10, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(8px)' }}>
              {React.createElement(window.lucide.AlertTriangle, { size: 12, color: t.warn })}
              <span style={{ fontSize: 11, color: t.warn, fontWeight: 500 }}>Horizon tilt: +2.3°</span>
            </div>
          )}
        </div>

        {/* Right controls */}
        <div style={{ position: 'absolute', right: 14, top: '35%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: window.lucide.Layers, label: 'Ghost', active: ghostActive, action: () => setGhostActive(p => !p) },
            { icon: window.lucide.Grid, label: 'Grid', active: gridEnabled, action: () => setGridEnabled(p => !p) },
            { icon: window.lucide.Zap, label: 'Flash', active: false, action: () => showNotif('Flash toggled') },
          ].map(ctrl => (
            <div key={ctrl.label} onClick={() => { ctrl.action(); press(ctrl.label); }} style={{ width: 42, height: 42, borderRadius: 14, background: ctrl.active ? `${t.primary}22` : 'rgba(0,0,0,0.5)', border: `1.5px solid ${ctrl.active ? t.primary : 'rgba(255,255,255,0.15)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', cursor: 'pointer', ...btn(ctrl.label) }}>
              {React.createElement(ctrl.icon, { size: 17, color: ctrl.active ? t.primary : 'rgba(255,255,255,0.7)' })}
            </div>
          ))}
        </div>

        {/* Ghost opacity slider */}
        {ghostActive && (
          <div style={{ position: 'absolute', left: 14, top: '38%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>GHOST</span>
            <input type="range" min="10" max="90" value={Math.round(ghostOpacity * 100)} onChange={e => setGhostOpacity(Number(e.target.value) / 100)}
              style={{ writingMode: 'vertical-lr', direction: 'rtl', WebkitAppearance: 'slider-vertical', width: 4, height: 80, cursor: 'pointer', accentColor: t.primary }} />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{Math.round(ghostOpacity * 100)}%</span>
          </div>
        )}

        {/* Bottom controls */}
        <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          {/* Thumbnail */}
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>🏠</span>
          </div>

          {/* Capture button */}
          <div onClick={() => { handleCapture(); press('capture'); }} style={{ width: 72, height: 72, borderRadius: '50%', border: `3px solid ${t.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', ...btn('capture') }}>
            <div style={{ width: 58, height: 58, borderRadius: '50%', background: isRecording ? t.error : '#fff', transition: 'all 0.2s', transform: isRecording ? 'scale(0.7)' : 'scale(1)', borderRadius: isRecording ? 8 : '50%' }} />
          </div>

          {/* Flip camera */}
          <div onClick={() => { press('flip'); showNotif('Camera flipped'); }} style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', ...btn('flip') }}>
            {React.createElement(window.lucide.RefreshCw, { size: 20, color: 'rgba(255,255,255,0.8)' })}
          </div>
        </div>

        {/* Spatial tracking bar */}
        <div style={{ position: 'absolute', bottom: 170, left: 24, right: 24, background: 'rgba(0,0,0,0.5)', borderRadius: 12, padding: '8px 12px', backdropFilter: 'blur(12px)', border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>SPATIAL MATCH</span>
            <span style={{ fontSize: 11, color: scoreColor, fontWeight: 700 }}>{matchScore}% aligned</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Distance', val: 82, color: t.success },
              { label: 'Tilt', val: 65, color: t.warn },
              { label: 'Angle', val: 88, color: t.success },
            ].map(s => (
              <div key={s.label} style={{ flex: 1 }}>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.val}%`, background: s.color, borderRadius: 2, transition: 'width 1s ease' }} />
                </div>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 3, display: 'block' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── LIBRARY SCREEN ──
  const LibraryScreen = () => {
    const cats = ['All', 'Home', 'Content', 'Business', 'Fitness', 'Travel'];
    const filtered = filterCat === 'All' ? shotPresets : shotPresets.filter(p => p.category === filterCat);
    return (
      <div style={{ position: 'absolute', inset: 0, background: t.bg, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '60px 16px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>Shot Library</h1>
              <p style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>{shotPresets.length} templates saved</p>
            </div>
            <div onClick={() => { press('newpreset'); showNotif('New preset created!'); }} style={{ width: 38, height: 38, borderRadius: 12, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', ...btn('newpreset') }}>
              {React.createElement(window.lucide.Plus, { size: 20, color: '#000' })}
            </div>
          </div>

          {/* Search */}
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, marginTop: 12 }}>
            {React.createElement(window.lucide.Search, { size: 16, color: t.textMuted })}
            <span style={{ fontSize: 14, color: t.textMuted }}>Search presets...</span>
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 16, scrollbarWidth: 'none' }}>
            {cats.map(cat => (
              <div key={cat} onClick={() => setFilterCat(cat)} style={{ padding: '6px 14px', borderRadius: 20, background: filterCat === cat ? t.primary : t.surface, border: `1px solid ${filterCat === cat ? t.primary : t.border}`, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: filterCat === cat ? '#000' : t.textSub }}>{cat}</span>
              </div>
            ))}
          </div>

          {/* Preset cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(preset => (
              <div key={preset.id} onClick={() => { setSelectedPreset(preset); setActiveTab('camera'); showNotif(`Loaded: ${preset.name}`); press(`preset${preset.id}`); }}
                style={{ background: t.surface, borderRadius: 18, border: `1px solid ${selectedPreset.id === preset.id ? preset.color : t.border}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.15s', ...btn(`preset${preset.id}`) }}>
                {/* Thumbnail area */}
                <div style={{ height: 90, background: `${preset.color}12`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${t.border}` }}>
                  <span style={{ fontSize: 36 }}>{preset.icon}</span>
                  {/* Ghost overlay preview */}
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 60, height: 50, border: `1.5px dashed ${preset.color}`, borderRadius: 4 }} />
                  </div>
                  {selectedPreset.id === preset.id && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: preset.color, borderRadius: 8, padding: '3px 8px' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>ACTIVE</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '3px 8px' }}>
                    <span style={{ fontSize: 10, color: '#fff', fontWeight: 500 }}>{preset.category}</span>
                  </div>
                </div>
                <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{preset.name}</p>
                    <p style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{preset.count} shots · Last used {preset.lastUsed}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: `${preset.color}18`, border: `1px solid ${preset.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {React.createElement(window.lucide.Camera, { size: 15, color: preset.color })}
                    </div>
                    {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.border}`, padding: '14px 16px', marginTop: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: t.textSub, marginBottom: 10, letterSpacing: '0.05em' }}>THIS WEEK</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'Shots taken', val: capturedCount + 41, icon: window.lucide.Camera, color: t.primary },
                { label: 'Avg match', val: '91%', icon: window.lucide.Target, color: t.secondary },
                { label: 'Presets used', val: 4, icon: window.lucide.Layers, color: t.accent },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: `1px solid ${t.border}` }}>
                  {React.createElement(s.icon, { size: 16, color: s.color, style: { margin: '0 auto 4px' } })}
                  <p style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{s.val}</p>
                  <p style={{ fontSize: 10, color: t.textSub }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── TIMELINE SCREEN ──
  const TimelineScreen = () => {
    const groups = {};
    timelineItems.forEach(i => { if (!groups[i.preset]) groups[i.preset] = []; groups[i.preset].push(i); });

    return (
      <div style={{ position: 'absolute', inset: 0, background: t.bg, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '60px 16px 8px' }}>
          <div style={{ marginBottom: 16 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>Timeline</h1>
            <p style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Progress · Storytelling · Comparisons</p>
          </div>

          {/* Compare toggle */}
          <div style={{ background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, padding: '12px 14px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {React.createElement(window.lucide.GitCompare, { size: 16, color: t.primary })}
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Split Compare Mode</p>
                <p style={{ fontSize: 11, color: t.textSub }}>Drag slider to compare shots</p>
              </div>
            </div>
            <div onClick={() => setCompareMode(p => !p)} style={{ width: 46, height: 26, borderRadius: 13, background: compareMode ? t.primary : t.surfaceAlt, position: 'relative', cursor: 'pointer', border: `1px solid ${compareMode ? t.primary : t.border}`, transition: 'all 0.2s' }}>
              <div style={{ position: 'absolute', top: 3, left: compareMode ? 22 : 3, width: 18, height: 18, borderRadius: 9, background: compareMode ? '#000' : t.textMuted, transition: 'all 0.2s' }} />
            </div>
          </div>

          {/* Split compare view */}
          {compareMode && (
            <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ height: 200, position: 'relative', background: '#0d1520' }}>
                {/* Left (old) */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a2438,#0d1520)', clipPath: `polygon(0 0, ${sliderX}% 0, ${sliderX}% 100%, 0 100%)` }}>
                  <div style={{ position: 'absolute', bottom: 16, left: 14, background: 'rgba(0,0,0,0.6)', borderRadius: 8, padding: '4px 8px' }}>
                    <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>JAN 2026</span>
                  </div>
                  <div style={{ position: 'absolute', top: '30%', left: '25%', width: 40, height: 80, border: `1.5px solid rgba(255,255,255,0.2)`, borderRadius: 4 }} />
                </div>
                {/* Right (new) */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#152030,#1a1428)', clipPath: `polygon(${sliderX}% 0, 100% 0, 100% 100%, ${sliderX}% 100%)` }}>
                  <div style={{ position: 'absolute', bottom: 16, right: 14, background: `${t.primary}22`, borderRadius: 8, padding: '4px 8px', border: `1px solid ${t.primary}44` }}>
                    <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>MAR 2026</span>
                  </div>
                  <div style={{ position: 'absolute', top: '25%', left: '55%', width: 44, height: 90, border: `1.5px solid ${t.primary}66`, borderRadius: 4 }} />
                </div>
                {/* Slider */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderX}%`, width: 2, background: t.primary, transform: 'translateX(-50%)' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: 14, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 12px ${t.primary}` }}>
                    {React.createElement(window.lucide.ChevronsLeftRight, { size: 14, color: '#000' })}
                  </div>
                </div>
                <input type="range" min={10} max={90} value={sliderX} onChange={e => setSliderX(Number(e.target.value))}
                  style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'ew-resize', height: '100%' }} />
              </div>
              <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: t.textSub }}>Renovation Progress</span>
                <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>8 weeks tracked</span>
              </div>
            </div>
          )}

          {/* Timeline groups */}
          {Object.entries(groups).map(([preset, items]) => (
            <div key={preset} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{preset}</p>
                <span style={{ fontSize: 12, color: t.primary, fontWeight: 500 }}>{items.length} shots</span>
              </div>
              {/* Horizontal scroll strip */}
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
                {items.map(item => {
                  const sc = item.matchScore >= 95 ? t.success : item.matchScore >= 85 ? t.warn : t.error;
                  return (
                    <div key={item.id} onClick={() => { setSelectedTimeline(item); press(`tl${item.id}`); }} style={{ minWidth: 110, background: selectedTimeline?.id === item.id ? `${t.primary}18` : t.surface, borderRadius: 14, border: `1.5px solid ${selectedTimeline?.id === item.id ? t.primary : t.border}`, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, ...btn(`tl${item.id}`) }}>
                      <div style={{ height: 72, background: `linear-gradient(135deg, ${sc}18, ${sc}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ width: 36, height: 50, border: `1.5px solid ${sc}66`, borderRadius: 4 }} />
                        <div style={{ position: 'absolute', top: 6, right: 6, background: `${sc}22`, borderRadius: 6, padding: '2px 6px' }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: sc }}>{item.matchScore}%</span>
                        </div>
                      </div>
                      <div style={{ padding: '8px 10px' }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: t.text }}>{item.label}</p>
                        <p style={{ fontSize: 10, color: t.textSub }}>{item.date.split(',')[0]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div style={{ background: t.surface, borderRadius: 12, padding: '10px 12px', marginTop: 8, border: `1px solid ${t.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: t.textSub }}>Avg match quality</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.primary }}>93%</span>
                </div>
                <div style={{ height: 6, background: t.surfaceAlt, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '93%', background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 3 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── SETTINGS SCREEN ──
  const SettingsScreen = () => {
    const sections = [
      {
        title: 'Appearance',
        items: [
          { label: 'Dark Mode', sub: 'Switch color theme', icon: themeKey === 'dark' ? window.lucide.Moon : window.lucide.Sun, toggle: true, val: themeKey === 'dark', action: () => setThemeKey(p => p === 'dark' ? 'light' : 'dark') },
          { label: 'Ghost Opacity', sub: `${Math.round(ghostOpacity * 100)}%`, icon: window.lucide.Layers, slider: true },
          { label: 'Rule of Thirds', sub: 'Show composition grid', icon: window.lucide.Grid, toggle: true, val: gridEnabled, action: () => setGridEnabled(p => !p) },
        ],
      },
      {
        title: 'Tracking',
        items: [
          { label: 'Spatial Tracking', sub: 'Distance & angle guidance', icon: window.lucide.Crosshair, toggle: true, val: true, action: () => showNotif('Spatial tracking active') },
          { label: 'Horizon Warnings', sub: 'Alert on tilt mismatch', icon: window.lucide.AlertTriangle, toggle: true, val: horizonWarn, action: () => setHorizonWarn(p => !p) },
          { label: 'Lighting Alerts', sub: 'Warn on light direction change', icon: window.lucide.Sun, toggle: true, val: lightWarn, action: () => setLightWarn(p => !p) },
        ],
      },
      {
        title: 'Storage',
        items: [
          { label: 'Auto-save to Photos', sub: 'Save after each capture', icon: window.lucide.Image, toggle: true, val: true, action: () => showNotif('Setting updated') },
          { label: 'Cloud Sync', sub: 'Sync presets to iCloud', icon: window.lucide.Cloud, toggle: false, val: false, action: () => showNotif('Enable iCloud in settings') },
          { label: 'Storage Used', sub: '2.4 GB of presets', icon: window.lucide.HardDrive, arrow: true, action: () => showNotif('Storage details') },
        ],
      },
    ];
    return (
      <div style={{ position: 'absolute', inset: 0, background: t.bg, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '60px 16px 8px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 4, letterSpacing: '-0.02em' }}>Settings</h1>
          <p style={{ fontSize: 13, color: t.textSub, marginBottom: 20 }}>Customize your Angle Ghost experience</p>

          {/* Profile card */}
          <div style={{ background: `linear-gradient(135deg, ${t.primary}18, ${t.secondary}12)`, borderRadius: 20, border: `1px solid ${t.primary}33`, padding: '16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              👻
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Angle Ghost Pro</p>
              <p style={{ fontSize: 12, color: t.textSub }}>Active subscription · Renews Apr 22</p>
            </div>
            <div style={{ background: t.primary, borderRadius: 10, padding: '5px 10px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#000' }}>PRO</span>
            </div>
          </div>

          {sections.map(section => (
            <div key={section.title} style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', marginBottom: 8, paddingLeft: 4 }}>{section.title.toUpperCase()}</p>
              <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
                {section.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <div onClick={() => { item.action && item.action(); press(`setting${item.label}`); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', cursor: 'pointer', ...btn(`setting${item.label}`) }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={17} color={t.primary} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{item.label}</p>
                          <p style={{ fontSize: 11, color: t.textSub }}>{item.sub}</p>
                          {item.slider && (
                            <input type="range" min={10} max={90} value={Math.round(ghostOpacity * 100)} onChange={e => setGhostOpacity(Number(e.target.value) / 100)}
                              style={{ width: '100%', marginTop: 6, accentColor: t.primary }} />
                          )}
                        </div>
                        {item.toggle && (
                          <div style={{ width: 44, height: 24, borderRadius: 12, background: item.val ? t.primary : t.surfaceAlt, position: 'relative', border: `1px solid ${item.val ? t.primary : t.border}`, transition: 'all 0.2s', flexShrink: 0 }}>
                            <div style={{ position: 'absolute', top: 2, left: item.val ? 20 : 2, width: 18, height: 18, borderRadius: 9, background: item.val ? '#000' : t.textMuted, transition: 'all 0.2s' }} />
                          </div>
                        )}
                        {item.arrow && React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
                      </div>
                      {idx < section.items.length - 1 && <div style={{ height: 1, background: t.border, marginLeft: 60 }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Version */}
          <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
            <p style={{ fontSize: 12, color: t.textMuted }}>Angle Ghost v2.4.1 · Made with precision</p>
          </div>
        </div>
      </div>
    );
  };

  const screens = { camera: CameraScreen, library: LibraryScreen, timeline: TimelineScreen, settings: SettingsScreen };
  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, borderRadius: 52, background: t.bg, position: 'relative', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)', border: '8px solid #1c1c2e' }}>
        <StatusBar />
        <ActiveScreen />
        <NavBar />

        {/* Notification toast */}
        {notif && (
          <div style={{ position: 'absolute', top: 60, left: 20, right: 20, background: notif.type === 'success' ? `${t.primary}22` : `${t.error}22`, border: `1px solid ${notif.type === 'success' ? t.primary : t.error}55`, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(20px)', zIndex: 1000, animation: 'fadeIn 0.2s ease', boxShadow: `0 4px 20px ${notif.type === 'success' ? t.primary : t.error}22` }}>
            {React.createElement(notif.type === 'success' ? window.lucide.CheckCircle : window.lucide.AlertCircle, { size: 15, color: notif.type === 'success' ? t.primary : t.error })}
            <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{notif.msg}</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
