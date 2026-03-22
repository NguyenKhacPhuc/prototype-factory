const { useState, useEffect, useRef } = React;

// ── Inject Google Font ────────────────────────────────────────────────────────
const _fontLink = document.createElement('link');
_fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap';
_fontLink.rel = 'stylesheet';
document.head.appendChild(_fontLink);

const _globalStyle = document.createElement('style');
_globalStyle.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { display: none; }
  input, textarea, button { font-family: 'Outfit', sans-serif; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse-glow { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
  @keyframes slide-up { from { transform:translateY(30px); opacity:0; } to { transform:translateY(0); opacity:1; } }
  @keyframes fade-in { from { opacity:0; } to { opacity:1; } }
  @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
  @keyframes scan-line { 0% { top: 10%; } 100% { top: 90%; } }
  @keyframes ripple { 0% { transform:scale(0); opacity:0.6; } 100% { transform:scale(2.5); opacity:0; } }
`;
document.head.appendChild(_globalStyle);

// ── Theme System ──────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#08080F',
    surface: '#111120',
    surfaceElevated: '#181828',
    surfaceHigh: '#1E1E32',
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDim: 'rgba(139,92,246,0.15)',
    primaryGlow: 'rgba(139,92,246,0.35)',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    accentDim: 'rgba(245,158,11,0.15)',
    teal: '#06B6D4',
    tealDim: 'rgba(6,182,212,0.15)',
    green: '#10B981',
    red: '#EF4444',
    text: '#F0F0FF',
    textSec: '#9090B8',
    textMuted: '#50506A',
    border: '#1E1E35',
    borderLight: '#252540',
    inputBg: '#0D0D1A',
    tabBar: '#0C0C18',
    tabBarBorder: '#1A1A2E',
    statusBar: '#060612',
    overlay: 'rgba(0,0,0,0.7)',
    cardShadow: '0 4px 24px rgba(0,0,0,0.4)',
  },
  light: {
    bg: '#F4F2FF',
    surface: '#FFFFFF',
    surfaceElevated: '#FAFAFE',
    surfaceHigh: '#F0EEFF',
    primary: '#7C3AED',
    primaryLight: '#8B5CF6',
    primaryDim: 'rgba(124,58,237,0.1)',
    primaryGlow: 'rgba(124,58,237,0.25)',
    accent: '#D97706',
    accentLight: '#F59E0B',
    accentDim: 'rgba(217,119,6,0.1)',
    teal: '#0891B2',
    tealDim: 'rgba(8,145,178,0.1)',
    green: '#059669',
    red: '#DC2626',
    text: '#1A1830',
    textSec: '#6B6888',
    textMuted: '#9B99B8',
    border: '#E8E5F5',
    borderLight: '#EDE9F8',
    inputBg: '#F5F3FF',
    tabBar: '#FFFFFF',
    tabBarBorder: '#EDE9F8',
    statusBar: '#F4F2FF',
    overlay: 'rgba(0,0,0,0.4)',
    cardShadow: '0 4px 20px rgba(124,58,237,0.08)',
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const moodPresets = [
  {
    label: 'Calm & Expensive',
    keywords: ['calm', 'expensive', 'luxury', 'quiet', 'minimal', 'clean'],
    colors: ['#C9B99A', '#E8E0D0', '#8B7355', '#4A4035', '#F5F0EA'],
    colorNames: ['Driftwood', 'Parchment', 'Tobacco', 'Espresso', 'Cream'],
    textures: ['Brushed linen weave', 'Smooth matte paper', 'Soft sand grain'],
    composition: 'Wide negative space · Centered subjects · Generous margins',
    lighting: 'Soft diffused · Warm golden hour · Low contrast shadows',
    vibe: 'Understated opulence',
    tags: ['minimal', 'luxury', 'warm'],
    gradient: 'linear-gradient(135deg, #4A4035, #8B7355, #C9B99A)',
  },
  {
    label: 'Moody but Hopeful',
    keywords: ['moody', 'hopeful', 'dramatic', 'cinematic', 'blue', 'deep'],
    colors: ['#1B2A40', '#2F4F78', '#6B9AC4', '#B8D4EA', '#E8F4FD'],
    colorNames: ['Midnight', 'Navy Depth', 'Storm Blue', 'Sky Mist', 'Dawn'],
    textures: ['Deep matte finish', 'Soft film grain', 'Subtle bokeh blur'],
    composition: 'Low angle · Silhouettes with rim light · Leading lines',
    lighting: 'Backlit glow · Cool blue shadows · Single key source',
    vibe: 'Cinematic introspection',
    tags: ['cinematic', 'blue', 'moody'],
    gradient: 'linear-gradient(135deg, #1B2A40, #2F4F78, #6B9AC4)',
  },
  {
    label: 'Energetic & Bold',
    keywords: ['energetic', 'bold', 'vivid', 'loud', 'pop', 'vibrant', 'energy'],
    colors: ['#FF4500', '#FF8C42', '#FFD700', '#1A1A2E', '#FF006E'],
    colorNames: ['Firestarter', 'Amber Rush', 'Electric Gold', 'Void', 'Hot Pink'],
    textures: ['High contrast halftone', 'Gritty urban grain', 'Glossy pop finish'],
    composition: 'Dynamic diagonals · Rule of thirds · Motion blur trails',
    lighting: 'Harsh directional · Neon rim lights · Deep shadows',
    vibe: 'Kinetic maximalism',
    tags: ['bold', 'vivid', 'pop'],
    gradient: 'linear-gradient(135deg, #1A1A2E, #FF4500, #FFD700)',
  },
  {
    label: 'Soft & Romantic',
    keywords: ['soft', 'romantic', 'dreamy', 'gentle', 'feminine', 'tender', 'warm'],
    colors: ['#F2C4CE', '#E0899A', '#C5607A', '#FBF0F3', '#F7D5DC'],
    colorNames: ['Rose Petal', 'Dusty Rose', 'Cranberry', 'Blush', 'Blush Lite'],
    textures: ['Gauzy soft focus', 'Floral bokeh overlay', 'Linen whisper'],
    composition: 'Close crops · Shallow depth · Warm vignette edges',
    lighting: 'Soft window diffuse · Golden bokeh · Warm fill',
    vibe: 'Tender warmth',
    tags: ['romantic', 'soft', 'pink'],
    gradient: 'linear-gradient(135deg, #C5607A, #E0899A, #F2C4CE)',
  },
  {
    label: 'Dark & Editorial',
    keywords: ['dark', 'editorial', 'fashion', 'stark', 'bold', 'contrast', 'bw'],
    colors: ['#0D0D0D', '#1C1C1C', '#B0B0B0', '#8B0000', '#2C2C2C'],
    colorNames: ['Jet Black', 'Charcoal', 'Silver', 'Blood', 'Graphite'],
    textures: ['Sharp high-contrast grain', 'Polished leather', 'Raw concrete'],
    composition: 'Stark geometric framing · Strong shadow play · Bold crop',
    lighting: 'Hard directional · Deep blacks · Specular highlights',
    vibe: 'Avant-garde tension',
    tags: ['editorial', 'dark', 'fashion'],
    gradient: 'linear-gradient(135deg, #0D0D0D, #2C2C2C, #8B0000)',
  },
];

const moodBoards = [
  {
    id: 1,
    name: 'Campaign Spring 24',
    tags: ['minimal', 'fresh'],
    colors: ['#D4E8C2', '#89B4A0', '#4A7B5E', '#F5F9F0', '#B8D4C2'],
    lastEdited: '2 days ago',
    items: 12,
    mood: 'Calm & Natural',
  },
  {
    id: 2,
    name: 'Client Pitch Deck',
    tags: ['corporate', 'trust'],
    colors: ['#1B3A6B', '#2B5BA8', '#4A90D9', '#E8F4FD', '#C5D9F0'],
    lastEdited: '5 days ago',
    items: 8,
    mood: 'Professional & Confident',
  },
  {
    id: 3,
    name: 'Personal Brand',
    tags: ['bold', 'creative'],
    colors: ['#6B2FBE', '#9B59F5', '#C89BF0', '#F5EDFF', '#3D1A7A'],
    lastEdited: '1 week ago',
    items: 15,
    mood: 'Vibrant & Authentic',
  },
  {
    id: 4,
    name: 'Weekend Shoot',
    tags: ['golden', 'warm'],
    colors: ['#C87940', '#E8A857', '#F5D08A', '#FBF0DC', '#8B5020'],
    lastEdited: '3 days ago',
    items: 6,
    mood: 'Golden Hour Warmth',
  },
];

const sceneResults = [
  {
    scene: 'Café Interior',
    detected: ['warm lighting', 'wood textures', 'soft bokeh'],
    preset: moodPresets[0],
    confidence: 94,
  },
  {
    scene: 'City at Dusk',
    detected: ['blue hour', 'artificial lights', 'urban geometry'],
    preset: moodPresets[1],
    confidence: 88,
  },
];

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('capture');
  const [dark, setDark] = useState(true);
  const [selectedChips, setSelectedChips] = useState([]);
  const [moodInput, setMoodInput] = useState('');
  const [generatedMood, setGeneratedMood] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [scanIdx, setScanIdx] = useState(0);
  const [exportSubTab, setExportSubTab] = useState('check');
  const [consistencyScore, setConsistencyScore] = useState(null);
  const [pressed, setPressed] = useState(null);
  const [savedBoards, setSavedBoards] = useState([1, 3]);
  const [showExportSheet, setShowExportSheet] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notifMsg, setNotifMsg] = useState('');

  const t = dark ? themes.dark : themes.light;

  const showNotif = (msg) => {
    setNotifMsg(msg);
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 2500);
  };

  const moodChips = [
    'calm', 'moody', 'hopeful', 'bold', 'dreamy',
    'minimal', 'warm', 'dark', 'editorial', 'soft',
    'energetic', 'luxe', 'romantic', 'cinematic', 'raw',
  ];

  const toggleChip = (chip) => {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
    setGeneratedMood(null);
  };

  const handleGenerate = () => {
    if (selectedChips.length === 0 && !moodInput.trim()) return;
    setIsGenerating(true);
    setGeneratedMood(null);
    setTimeout(() => {
      const combined = [...selectedChips, ...moodInput.toLowerCase().split(/\s+/)];
      let best = moodPresets[Math.floor(Math.random() * moodPresets.length)];
      let maxMatch = -1;
      moodPresets.forEach(preset => {
        const match = preset.keywords.filter(k =>
          combined.some(c => c.includes(k) || k.includes(c))
        ).length;
        if (match > maxMatch) { maxMatch = match; best = preset; }
      });
      setGeneratedMood(best);
      setIsGenerating(false);
    }, 1800);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanDone(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanDone(true);
      setScanIdx(Math.floor(Math.random() * sceneResults.length));
    }, 2800);
  };

  const handleConsistencyCheck = () => {
    setConsistencyScore(null);
    setTimeout(() => setConsistencyScore(78), 1200);
  };

  const btn = (id, style, onClick, children) => (
    <div
      key={id}
      onMouseDown={() => setPressed(id)}
      onMouseUp={() => setPressed(null)}
      onMouseLeave={() => setPressed(null)}
      onTouchStart={() => setPressed(id)}
      onTouchEnd={() => { setPressed(null); onClick && onClick(); }}
      onClick={onClick}
      style={{
        ...style,
        transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
        transition: 'transform 0.1s ease, opacity 0.1s ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );

  // ── Capture Screen ────────────────────────────────────────────────────────
  const renderCapture = () => {
    const HomeIcon = window.lucide.Sparkles;
    const MicIcon = window.lucide.Mic;
    const ZapIcon = window.lucide.Zap;
    const PlusIcon = window.lucide.Plus;
    const SaveIcon = window.lucide.Bookmark;
    const ArrowRight = window.lucide.ArrowRight;

    const canGenerate = selectedChips.length > 0 || moodInput.trim().length > 0;

    return (
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>
                MoodFrame
              </div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, marginTop: 1 }}>
                Turn feelings into visual direction
              </div>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 20,
              background: t.primaryDim, border: `1px solid ${t.borderLight}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ZapIcon size={18} color={t.primary} />
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Describe your mood
          </div>
          <div style={{
            background: t.inputBg,
            borderRadius: 16,
            border: `1px solid ${t.border}`,
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <input
              value={moodInput}
              onChange={e => { setMoodInput(e.target.value); setGeneratedMood(null); }}
              placeholder='"calm but expensive" or "moody with hope"...'
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 14, color: t.text, fontFamily: 'Outfit, sans-serif',
                fontWeight: 400,
              }}
            />
            <div style={{
              width: 32, height: 32, borderRadius: 12,
              background: t.primaryDim,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <MicIcon size={15} color={t.primary} />
            </div>
          </div>
        </div>

        {/* Chips */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Or pick keywords
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {moodChips.map(chip => {
              const active = selectedChips.includes(chip);
              return btn(`chip-${chip}`,
                {
                  padding: '7px 14px',
                  borderRadius: 20,
                  background: active ? t.primary : t.surfaceElevated,
                  border: `1px solid ${active ? t.primary : t.border}`,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#FFFFFF' : t.textSec,
                  boxShadow: active ? `0 2px 12px ${t.primaryGlow}` : 'none',
                },
                () => toggleChip(chip),
                chip
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <div style={{ padding: '16px 20px 0' }}>
          {btn('gen',
            {
              width: '100%',
              padding: '15px',
              borderRadius: 18,
              background: canGenerate
                ? `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`
                : t.surfaceElevated,
              border: `1px solid ${canGenerate ? 'transparent' : t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: canGenerate ? `0 4px 20px ${t.primaryGlow}` : 'none',
            },
            handleGenerate,
            <>
              {isGenerating ? (
                <>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#FFFFFF',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: canGenerate ? '#FFFFFF' : t.textMuted }}>
                    Translating mood...
                  </span>
                </>
              ) : (
                <>
                  <HomeIcon size={17} color={canGenerate ? '#FFFFFF' : t.textMuted} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: canGenerate ? '#FFFFFF' : t.textMuted }}>
                    Translate to Visual Direction
                  </span>
                </>
              )}
            </>
          )}
        </div>

        {/* Generated Result */}
        {generatedMood && (
          <div style={{ padding: '18px 20px 20px', animation: 'slide-up 0.4s ease' }}>
            {/* Result Header */}
            <div style={{
              background: t.surfaceElevated,
              borderRadius: 20,
              border: `1px solid ${t.borderLight}`,
              overflow: 'hidden',
              boxShadow: t.cardShadow,
            }}>
              {/* Gradient Banner */}
              <div style={{
                height: 72,
                background: generatedMood.gradient,
                position: 'relative',
                display: 'flex', alignItems: 'flex-end', padding: '12px 16px',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))',
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
                    {generatedMood.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 1 }}>
                    {generatedMood.vibe}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {generatedMood.tags.map(tag => (
                      <div key={tag} style={{
                        padding: '3px 8px', borderRadius: 10,
                        background: 'rgba(255,255,255,0.2)',
                        fontSize: 10, fontWeight: 600, color: '#FFFFFF',
                        backdropFilter: 'blur(4px)',
                      }}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '14px 16px' }}>
                {/* Color Palette */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Color Palette
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {generatedMood.colors.map((c, i) => (
                      <div key={i} style={{ flex: 1 }}>
                        <div style={{
                          height: 42, borderRadius: 10,
                          background: c,
                          border: `1px solid rgba(255,255,255,0.08)`,
                          boxShadow: `0 2px 8px rgba(0,0,0,0.2)`,
                        }} />
                        <div style={{ fontSize: 9, color: t.textMuted, textAlign: 'center', marginTop: 4, fontWeight: 500 }}>
                          {generatedMood.colorNames[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Texture & Composition */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    flex: 1, background: t.surface, borderRadius: 12,
                    padding: '10px 12px', border: `1px solid ${t.border}`,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                      Textures
                    </div>
                    {generatedMood.textures.map((tex, i) => (
                      <div key={i} style={{ fontSize: 11, color: t.textSec, marginBottom: i < 2 ? 3 : 0, fontWeight: 400 }}>
                        · {tex}
                      </div>
                    ))}
                  </div>
                  <div style={{
                    flex: 1, background: t.surface, borderRadius: 12,
                    padding: '10px 12px', border: `1px solid ${t.border}`,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                      Lighting
                    </div>
                    <div style={{ fontSize: 11, color: t.textSec, fontWeight: 400, lineHeight: 1.5 }}>
                      {generatedMood.lighting}
                    </div>
                  </div>
                </div>

                {/* Composition */}
                <div style={{
                  background: t.surface, borderRadius: 12,
                  padding: '10px 12px', border: `1px solid ${t.border}`, marginBottom: 12,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: t.teal, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    Composition
                  </div>
                  <div style={{ fontSize: 11, color: t.textSec, fontWeight: 400 }}>
                    {generatedMood.composition}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {btn('save-mood', {
                    flex: 1, padding: '10px', borderRadius: 12,
                    background: t.primaryDim, border: `1px solid ${t.primary}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }, () => showNotif('Saved to Mood Boards'),
                    <>
                      <SaveIcon size={14} color={t.primary} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: t.primary }}>Save to Boards</span>
                    </>
                  )}
                  {btn('export-mood', {
                    flex: 1, padding: '10px', borderRadius: 12,
                    background: t.accentDim, border: `1px solid ${t.accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }, () => showNotif('Export brief ready'),
                    <>
                      <ArrowRight size={14} color={t.accent} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: t.accent }}>Export Brief</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!generatedMood && !isGenerating && (
          <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🎨</div>
            <div style={{ fontSize: 14, color: t.textMuted, fontWeight: 400, lineHeight: 1.6 }}>
              Choose keywords or type a mood description,{'\n'}then tap Translate to get your visual direction.
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Scan Screen ───────────────────────────────────────────────────────────
  const renderScan = () => {
    const CameraIcon = window.lucide.Camera;
    const ZapIcon = window.lucide.Zap;
    const EyeIcon = window.lucide.Eye;
    const LayersIcon = window.lucide.Layers;
    const result = scanDone ? sceneResults[scanIdx] : null;

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>Scene Scan</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 1 }}>Point at any scene to extract its visual DNA</div>
        </div>

        {/* Viewfinder */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{
            height: 260, borderRadius: 24,
            background: dark ? '#0A0A15' : '#1A1A2E',
            border: `1px solid ${t.border}`,
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Simulated camera background */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #0D1520 0%, #1A2540 40%, #0D1520 100%)',
              opacity: 0.9,
            }} />

            {/* Grid overlay */}
            {[...Array(3)].map((_, i) => (
              <div key={`h${i}`} style={{
                position: 'absolute',
                top: `${33 * (i + 1)}%`, left: 0, right: 0,
                height: 1, background: 'rgba(255,255,255,0.08)',
              }} />
            ))}
            {[...Array(3)].map((_, i) => (
              <div key={`v${i}`} style={{
                position: 'absolute',
                left: `${33 * (i + 1)}%`, top: 0, bottom: 0,
                width: 1, background: 'rgba(255,255,255,0.08)',
              }} />
            ))}

            {/* Corner brackets */}
            {[
              { top: 16, left: 16, borderTop: true, borderLeft: true },
              { top: 16, right: 16, borderTop: true, borderRight: true },
              { bottom: 16, left: 16, borderBottom: true, borderLeft: true },
              { bottom: 16, right: 16, borderBottom: true, borderRight: true },
            ].map((corner, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...corner,
                width: 20, height: 20,
                borderTop: corner.borderTop ? `2px solid ${t.primary}` : 'none',
                borderBottom: corner.borderBottom ? `2px solid ${t.primary}` : 'none',
                borderLeft: corner.borderLeft ? `2px solid ${t.primary}` : 'none',
                borderRight: corner.borderRight ? `2px solid ${t.primary}` : 'none',
              }} />
            ))}

            {/* Scan line */}
            {isScanning && (
              <div style={{
                position: 'absolute', left: 0, right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`,
                animation: 'scan-line 1.2s ease-in-out infinite alternate',
                boxShadow: `0 0 12px ${t.primaryGlow}`,
              }} />
            )}

            {/* Scene placeholder items */}
            {!isScanning && !scanDone && (
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 32,
                  background: t.primaryDim,
                  border: `2px solid ${t.primary}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <CameraIcon size={26} color={t.primary} />
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  Camera Preview
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
                  Tap Scan to analyze scene
                </div>
              </div>
            )}

            {isScanning && (
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 32,
                  border: `2px solid ${t.primary}`,
                  borderTopColor: 'transparent',
                  animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 10px',
                }} />
                <div style={{ fontSize: 13, color: t.primaryLight, fontWeight: 600 }}>
                  Analyzing scene...
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>
                  Detecting colors, textures, mood
                </div>
              </div>
            )}

            {scanDone && result && (
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
                <div style={{
                  fontSize: 13, color: t.green, fontWeight: 700,
                  background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                  padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginBottom: 8,
                }}>
                  ✓ Scene Detected
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>
                  {result.scene}
                </div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {result.detected.map((d, i) => (
                    <div key={i} style={{
                      padding: '3px 8px', borderRadius: 8,
                      background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.4)',
                      fontSize: 10, color: '#A78BFA', fontWeight: 500,
                    }}>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confidence badge */}
            {scanDone && result && (
              <div style={{
                position: 'absolute', top: 12, right: 12,
                padding: '4px 10px', borderRadius: 10,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                fontSize: 11, fontWeight: 700, color: t.accentLight,
              }}>
                {result.confidence}% match
              </div>
            )}
          </div>
        </div>

        {/* Scan Button */}
        <div style={{ padding: '14px 20px 0' }}>
          {btn('scan-btn', {
            width: '100%', padding: '14px',
            borderRadius: 18,
            background: isScanning
              ? t.surfaceElevated
              : `linear-gradient(135deg, ${t.teal}, ${t.primary})`,
            border: `1px solid ${isScanning ? t.border : 'transparent'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: isScanning ? 'none' : `0 4px 20px rgba(6,182,212,0.3)`,
          }, isScanning ? null : handleScan,
            <>
              {isScanning ? (
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: t.teal, animation: 'spin 0.7s linear infinite' }} />
              ) : (
                <ZapIcon size={17} color='#FFFFFF' />
              )}
              <span style={{ fontSize: 15, fontWeight: 600, color: isScanning ? t.textMuted : '#FFFFFF' }}>
                {isScanning ? 'Scanning...' : 'Scan Scene'}
              </span>
            </>
          )}
        </div>

        {/* Scan Result Details */}
        {scanDone && result && (
          <div style={{ padding: '16px 20px 20px', animation: 'slide-up 0.4s ease' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Matched Visual Direction
            </div>
            <div style={{
              background: t.surfaceElevated, borderRadius: 18,
              border: `1px solid ${t.borderLight}`, overflow: 'hidden',
            }}>
              <div style={{ height: 6, background: result.preset.gradient }} />
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 3 }}>
                  {result.preset.label}
                </div>
                <div style={{ fontSize: 12, color: t.textSec, marginBottom: 10 }}>{result.preset.vibe}</div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {result.preset.colors.map((c, i) => (
                    <div key={i} style={{ flex: 1, height: 28, borderRadius: 7, background: c }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {btn('use-scene', {
                    flex: 1, padding: '10px', borderRadius: 12,
                    background: t.primaryDim, border: `1px solid ${t.primary}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }, () => showNotif('Direction applied to project'),
                    <>
                      <LayersIcon size={14} color={t.primary} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: t.primary }}>Apply to Project</span>
                    </>
                  )}
                  {btn('save-scene', {
                    padding: '10px 14px', borderRadius: 12,
                    background: t.surfaceHigh, border: `1px solid ${t.border}`,
                  }, () => showNotif('Saved to Boards'),
                    <EyeIcon size={16} color={t.textSec} />
                  )}
                </div>
              </div>
            </div>

            {/* Recent Scans */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Recent Scans
              </div>
              {sceneResults.map((sc, i) => (
                <div key={i} style={{
                  background: t.surfaceElevated, borderRadius: 14,
                  border: `1px solid ${t.border}`, padding: '10px 12px',
                  marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: sc.preset.gradient }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{sc.scene}</div>
                    <div style={{ fontSize: 11, color: t.textMuted }}>{sc.preset.label}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.accentLight }}>{sc.confidence}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Boards Screen ─────────────────────────────────────────────────────────
  const renderBoards = () => {
    const GridIcon = window.lucide.LayoutGrid;
    const PlusIcon = window.lucide.Plus;
    const BookmarkIcon = window.lucide.Bookmark;
    const MoreIcon = window.lucide.MoreHorizontal;
    const EditIcon = window.lucide.Pencil;

    if (selectedBoard !== null) {
      const board = moodBoards.find(b => b.id === selectedBoard);
      const BackIcon = window.lucide.ArrowLeft;
      const ShareIcon = window.lucide.Share2;

      return (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Board Header */}
          <div style={{
            padding: '12px 20px 14px',
            borderBottom: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            {btn('back', {
              width: 36, height: 36, borderRadius: 12,
              background: t.surfaceElevated, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }, () => setSelectedBoard(null),
              <BackIcon size={18} color={t.text} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.text, letterSpacing: '-0.3px' }}>{board.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>{board.items} items · Edited {board.lastEdited}</div>
            </div>
            {btn('share-board', {
              width: 36, height: 36, borderRadius: 12,
              background: t.primaryDim, border: `1px solid ${t.primary}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }, () => showNotif('Brief link copied'),
              <ShareIcon size={16} color={t.primary} />
            )}
          </div>

          {/* Color Palette */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Project Palette
            </div>
            <div style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden', height: 56, border: `1px solid ${t.border}` }}>
              {board.colors.map((c, i) => (
                <div key={i} style={{ flex: 1, background: c }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, justifyContent: 'space-between' }}>
              {board.colors.map((c, i) => (
                <div key={i} style={{ fontSize: 9, color: t.textMuted, textAlign: 'center', flex: 1 }}>{c}</div>
              ))}
            </div>
          </div>

          {/* Mood Tag */}
          <div style={{ padding: '12px 20px 0' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 20,
              background: t.primaryDim, border: `1px solid ${t.primary}`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: t.primary }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: t.primary }}>{board.mood}</span>
            </div>
          </div>

          {/* Mock Grid Items */}
          <div style={{ padding: '14px 20px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Board Items
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[...Array(board.items)].map((_, i) => {
                const c = board.colors[i % board.colors.length];
                const c2 = board.colors[(i + 2) % board.colors.length];
                return (
                  <div key={i} style={{
                    height: 80, borderRadius: 12,
                    background: `linear-gradient(135deg, ${c}, ${c2})`,
                    border: `1px solid ${t.border}`,
                  }} />
                );
              })}
              {btn('add-item', {
                height: 80, borderRadius: 12,
                background: t.surfaceElevated,
                border: `2px dashed ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }, () => showNotif('Add item — coming soon'),
                <PlusIcon size={20} color={t.textMuted} />
              )}
            </div>
          </div>

          {/* Tags */}
          <div style={{ padding: '14px 20px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Tags
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {board.tags.map(tag => (
                <div key={tag} style={{
                  padding: '5px 12px', borderRadius: 14,
                  background: t.surfaceElevated, border: `1px solid ${t.border}`,
                  fontSize: 12, color: t.textSec, fontWeight: 500,
                }}>
                  #{tag}
                </div>
              ))}
              {btn('add-tag', {
                padding: '5px 12px', borderRadius: 14,
                background: 'transparent', border: `1px dashed ${t.border}`,
                display: 'flex', alignItems: 'center', gap: 4,
              }, null,
                <>
                  <PlusIcon size={11} color={t.textMuted} />
                  <span style={{ fontSize: 12, color: t.textMuted }}>Add tag</span>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>Mood Boards</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 1 }}>Your project visual directions</div>
          </div>
          {btn('new-board', {
            width: 36, height: 36, borderRadius: 12,
            background: t.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 14px ${t.primaryGlow}`,
          }, () => showNotif('New board — coming soon'),
            <PlusIcon size={18} color='#FFFFFF' />
          )}
        </div>

        {/* Stats Row */}
        <div style={{ padding: '14px 20px 0', display: 'flex', gap: 10 }}>
          {[
            { label: 'Boards', value: '4', color: t.primary },
            { label: 'Items', value: '41', color: t.accent },
            { label: 'Exports', value: '7', color: t.teal },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1, background: t.surfaceElevated, borderRadius: 14,
              border: `1px solid ${t.border}`, padding: '10px 12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Board List */}
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            All Boards
          </div>
          {moodBoards.map(board => (
            <div
              key={board.id}
              onClick={() => setSelectedBoard(board.id)}
              style={{
                background: t.surfaceElevated, borderRadius: 18,
                border: `1px solid ${t.border}`, marginBottom: 10,
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: t.cardShadow,
                transition: 'transform 0.15s ease',
              }}
            >
              {/* Color Strip */}
              <div style={{ height: 48, display: 'flex' }}>
                {board.colors.map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }} />
                ))}
              </div>
              <div style={{ padding: '10px 14px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 3 }}>{board.name}</div>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    {board.tags.map(tag => (
                      <div key={tag} style={{
                        padding: '2px 7px', borderRadius: 7,
                        background: t.primaryDim,
                        fontSize: 10, color: t.primaryLight, fontWeight: 600,
                      }}>
                        {tag}
                      </div>
                    ))}
                    <div style={{ fontSize: 11, color: t.textMuted, marginLeft: 2 }}>
                      {board.items} items
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: t.textMuted }}>{board.lastEdited}</div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: t.surfaceHigh, border: `1px solid ${t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginLeft: 'auto', marginTop: 4,
                  }}>
                    <MoreIcon size={14} color={t.textMuted} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Export Screen ─────────────────────────────────────────────────────────
  const renderExport = () => {
    const ShareIcon = window.lucide.Share2;
    const CheckCircle = window.lucide.CheckCircle2;
    const AlertTriangle = window.lucide.AlertTriangle;
    const FilesIcon = window.lucide.FileText;
    const UserIcon = window.lucide.Users;
    const TrendingUpIcon = window.lucide.TrendingUp;

    const scoreColor = consistencyScore === null ? t.textMuted
      : consistencyScore >= 80 ? t.green
      : consistencyScore >= 60 ? t.accent
      : t.red;

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>Style & Export</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 1 }}>Check consistency · Build briefs · Share</div>
        </div>

        {/* Sub Tabs */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{
            display: 'flex', background: t.surfaceElevated, borderRadius: 14,
            padding: 4, border: `1px solid ${t.border}`,
          }}>
            {[
              { id: 'check', label: 'Style Check' },
              { id: 'export', label: 'Export Pack' },
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => setExportSubTab(tab.id)}
                style={{
                  flex: 1, padding: '8px', borderRadius: 10, textAlign: 'center',
                  background: exportSubTab === tab.id ? t.primary : 'transparent',
                  fontSize: 13, fontWeight: 600,
                  color: exportSubTab === tab.id ? '#FFFFFF' : t.textSec,
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  boxShadow: exportSubTab === tab.id ? `0 2px 10px ${t.primaryGlow}` : 'none',
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {exportSubTab === 'check' && (
          <div style={{ padding: '16px 20px 0' }}>
            {/* Select Board */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Select Project
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
              {moodBoards.map(board => (
                <div key={board.id} style={{
                  minWidth: 100, borderRadius: 12, overflow: 'hidden',
                  border: `2px solid ${board.id === 3 ? t.primary : t.border}`,
                  cursor: 'pointer', boxShadow: board.id === 3 ? `0 2px 12px ${t.primaryGlow}` : 'none',
                }}>
                  <div style={{ height: 32, display: 'flex' }}>
                    {board.colors.slice(0, 3).map((c, i) => (
                      <div key={i} style={{ flex: 1, background: c }} />
                    ))}
                  </div>
                  <div style={{ padding: '5px 7px', background: t.surfaceElevated }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {board.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* New Idea Input */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              New Idea to Check
            </div>
            <div style={{
              background: t.inputBg, borderRadius: 14,
              border: `1px solid ${t.border}`, padding: '10px 14px',
              marginBottom: 12,
            }}>
              <input
                placeholder='Describe a new concept or direction...'
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 13, color: t.text, fontFamily: 'Outfit, sans-serif', fontWeight: 400,
                }}
              />
            </div>

            {/* Check Button */}
            {btn('check-btn', {
              width: '100%', padding: '13px', borderRadius: 16,
              background: `linear-gradient(135deg, ${t.teal}, ${t.primary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: `0 4px 16px rgba(6,182,212,0.25)`,
              marginBottom: 18,
            }, handleConsistencyCheck,
              <>
                <TrendingUpIcon size={16} color='#FFFFFF' />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Run Consistency Check</span>
              </>
            )}

            {/* Score Result */}
            {consistencyScore !== null && (
              <div style={{ animation: 'slide-up 0.4s ease' }}>
                <div style={{
                  background: t.surfaceElevated, borderRadius: 18, padding: '18px 16px',
                  border: `1px solid ${t.borderLight}`, marginBottom: 14,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Style Consistency Score
                  </div>
                  {/* Score Ring */}
                  <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 12px' }}>
                    <svg width='100' height='100' style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx='50' cy='50' r='42' fill='none' stroke={t.surfaceHigh} strokeWidth='8' />
                      <circle
                        cx='50' cy='50' r='42' fill='none'
                        stroke={scoreColor} strokeWidth='8'
                        strokeLinecap='round'
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - consistencyScore / 100)}`}
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                      />
                    </svg>
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ fontSize: 26, fontWeight: 900, color: scoreColor }}>{consistencyScore}</div>
                      <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase' }}>score</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: scoreColor, marginBottom: 4 }}>
                    {consistencyScore >= 80 ? 'Strong Alignment' : consistencyScore >= 60 ? 'Minor Drift Detected' : 'Significant Drift'}
                  </div>
                  <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5 }}>
                    {consistencyScore >= 80
                      ? 'This direction matches your Personal Brand palette well.'
                      : 'Some color temperatures and texture choices are veering off-tone from your project palette.'}
                  </div>
                </div>

                {/* Recommendations */}
                <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Recommendations
                </div>
                {[
                  { ok: true, text: 'Color temperature is consistent with project palette' },
                  { ok: true, text: 'Typography direction aligns well' },
                  { ok: false, text: 'Texture contrast is higher than established baseline' },
                  { ok: false, text: 'Lighting tone suggests warmer reference — project skews cool' },
                ].map((rec, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    marginBottom: 8, padding: '10px 12px',
                    background: t.surfaceElevated, borderRadius: 12,
                    border: `1px solid ${rec.ok ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                  }}>
                    {rec.ok
                      ? <CheckCircle size={15} color={t.green} style={{ marginTop: 1, flexShrink: 0 }} />
                      : <AlertTriangle size={15} color={t.accent} style={{ marginTop: 1, flexShrink: 0 }} />
                    }
                    <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5 }}>{rec.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {exportSubTab === 'export' && (
          <div style={{ padding: '16px 20px 20px' }}>
            {/* Pack Types */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Export Format
            </div>
            {[
              {
                icon: UserIcon, label: 'Designer Brief',
                desc: 'Color palette, textures, composition, lighting guidance for creatives',
                color: t.primary, dim: t.primaryDim,
              },
              {
                icon: FilesIcon, label: 'Client Pitch PDF',
                desc: 'Clean one-pager with mood summary and visual direction',
                color: t.teal, dim: t.tealDim,
              },
              {
                icon: ShareIcon, label: 'Social Media Pack',
                desc: 'Palette swatches + tone guidelines formatted for social teams',
                color: t.accent, dim: t.accentDim,
              },
            ].map((pack, i) => (
              btn(`pack-${i}`, {
                display: 'flex', alignItems: 'center', gap: 12,
                background: t.surfaceElevated, borderRadius: 16,
                border: `1px solid ${t.borderLight}`, padding: '14px',
                marginBottom: 10,
              },
              () => showNotif(`${pack.label} exported`),
              <>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: pack.dim, border: `1px solid ${pack.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <pack.icon size={20} color={pack.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 }}>{pack.label}</div>
                  <div style={{ fontSize: 11, color: t.textSec, lineHeight: 1.4 }}>{pack.desc}</div>
                </div>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: pack.dim,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShareIcon size={13} color={pack.color} />
                </div>
              </>
              )
            ))}

            {/* Recent Exports */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 8 }}>
              Recent Exports
            </div>
            {[
              { name: 'Personal Brand – Designer Brief', date: '2 days ago', type: 'Designer Brief' },
              { name: 'Campaign Spring 24 – Social Pack', date: '5 days ago', type: 'Social Pack' },
              { name: 'Client Pitch – PDF', date: '1 week ago', type: 'Client PDF' },
            ].map((exp, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 12,
                background: t.surfaceElevated, border: `1px solid ${t.border}`,
                marginBottom: 8,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: t.surfaceHigh, border: `1px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FilesIcon size={14} color={t.textSec} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{exp.name}</div>
                  <div style={{ fontSize: 10, color: t.textMuted }}>{exp.date} · {exp.type}</div>
                </div>
                <ShareIcon size={14} color={t.textMuted} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── Settings Screen ───────────────────────────────────────────────────────
  const renderSettings = () => {
    const UserIcon = window.lucide.User;
    const BellIcon = window.lucide.Bell;
    const PaletteIcon = window.lucide.Palette;
    const LockIcon = window.lucide.Lock;
    const HelpIcon = window.lucide.HelpCircle;
    const LogoutIcon = window.lucide.LogOut;
    const SunIcon = window.lucide.Sun;
    const MoonIcon = window.lucide.Moon;
    const ChevronRight = window.lucide.ChevronRight;
    const StarIcon = window.lucide.Star;

    const SettingRow = ({ icon: Icon, label, sublabel, color, rightEl, onClick }) => (
      <div
        onClick={onClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px', cursor: 'pointer',
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={17} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
          {sublabel && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{sublabel}</div>}
        </div>
        {rightEl || <ChevronRight size={15} color={t.textMuted} />}
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Profile Card */}
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{
            background: `linear-gradient(135deg, ${t.primary}22, ${t.primaryDim})`,
            borderRadius: 20, padding: '18px 16px',
            border: `1px solid ${t.primary}33`,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 58, height: 58, borderRadius: 22,
              background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 800, color: '#FFFFFF',
              boxShadow: `0 4px 16px ${t.primaryGlow}`,
            }}>
              A
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.text, letterSpacing: '-0.3px' }}>Alex Rivera</div>
              <div style={{ fontSize: 12, color: t.textSec, marginTop: 1 }}>Freelance Creative Director</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                {[{ n: '4', l: 'Boards' }, { n: '41', l: 'Items' }, { n: '7', l: 'Exports' }].map(s => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: t.primary }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: t.textMuted }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Plan Badge */}
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{
            background: `linear-gradient(135deg, ${t.accent}22, ${t.accentDim})`,
            borderRadius: 14, padding: '12px 14px',
            border: `1px solid ${t.accent}33`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <StarIcon size={18} color={t.accent} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>MoodFrame Pro</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>Unlimited boards · Priority AI · All export formats</div>
            </div>
            <div style={{
              padding: '4px 10px', borderRadius: 8,
              background: t.accent, fontSize: 11, fontWeight: 700, color: '#FFFFFF',
            }}>Active</div>
          </div>
        </div>

        {/* Appearance */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Appearance
          </div>
          <div style={{
            background: t.surfaceElevated, borderRadius: 16,
            border: `1px solid ${t.border}`, overflow: 'hidden',
          }}>
            {/* Theme Toggle */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderBottom: `1px solid ${t.border}`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: dark ? 'rgba(139,92,246,0.15)' : 'rgba(245,158,11,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {dark ? <MoonIcon size={17} color={t.primary} /> : <SunIcon size={17} color={t.accent} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Theme</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>{dark ? 'Dark mode active' : 'Light mode active'}</div>
              </div>
              {/* Toggle Switch */}
              <div
                onClick={() => setDark(d => !d)}
                style={{
                  width: 50, height: 28, borderRadius: 14,
                  background: dark ? t.primary : t.border,
                  position: 'relative', cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  boxShadow: dark ? `0 0 12px ${t.primaryGlow}` : 'none',
                }}
              >
                <div style={{
                  position: 'absolute', top: 4, width: 20, height: 20, borderRadius: 10,
                  background: '#FFFFFF',
                  left: dark ? 26 : 4,
                  transition: 'left 0.25s ease',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {dark
                    ? <MoonIcon size={11} color={t.primary} />
                    : <SunIcon size={11} color={t.accent} />
                  }
                </div>
              </div>
            </div>
            <SettingRow icon={PaletteIcon} label='Accent Color' sublabel='Currently Violet' color={t.primary} />
          </div>
        </div>

        {/* App Settings */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Preferences
          </div>
          <div style={{
            background: t.surfaceElevated, borderRadius: 16,
            border: `1px solid ${t.border}`, overflow: 'hidden',
          }}>
            <SettingRow icon={UserIcon} label='Edit Profile' sublabel='Name, role, bio' color={t.teal} />
            <SettingRow icon={BellIcon} label='Notifications' sublabel='Style drift alerts, export ready' color={t.accent} />
            <SettingRow icon={LockIcon} label='Privacy & Data' sublabel='Manage your mood data' color={t.primary} />
            <SettingRow icon={HelpIcon} label='Help & Feedback' sublabel='Docs, support, report a bug' color={t.green} />
          </div>
        </div>

        {/* Sign Out */}
        <div style={{ padding: '14px 20px 24px' }}>
          {btn('signout', {
            width: '100%', padding: '13px', borderRadius: 16,
            background: 'rgba(239,68,68,0.08)', border: `1px solid rgba(239,68,68,0.2)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }, () => showNotif('Signed out'),
            <>
              <LogoutIcon size={15} color={t.red} />
              <span style={{ fontSize: 14, fontWeight: 600, color: t.red }}>Sign Out</span>
            </>
          )}
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: t.textMuted }}>
            MoodFrame v1.0.0 · Made with intention
          </div>
        </div>
      </div>
    );
  };

  // ── Tab Icons ─────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'capture', iconName: 'Sparkles', label: 'Create' },
    { id: 'scan', iconName: 'Camera', label: 'Scan' },
    { id: 'boards', iconName: 'LayoutGrid', label: 'Boards' },
    { id: 'export', iconName: 'Share2', label: 'Export' },
    { id: 'settings', iconName: 'User', label: 'Profile' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'capture': return renderCapture();
      case 'scan': return renderScan();
      case 'boards': return renderBoards();
      case 'export': return renderExport();
      case 'settings': return renderSettings();
      default: return renderCapture();
    }
  };

  // ── Root Render ───────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? '#0F0D18' : '#D8D4EE',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Outfit', sans-serif",
      padding: '20px',
    }}>
      {/* Ambient glow behind phone */}
      <div style={{
        position: 'fixed', width: 300, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, ${dark ? 'rgba(139,92,246,0.15)' : 'rgba(124,58,237,0.12)'}, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      }} />

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 52,
        overflow: 'hidden',
        position: 'relative', zIndex: 1,
        boxShadow: dark
          ? '0 50px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.03)'
          : '0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.6)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Status Bar */}
        <div style={{
          height: 44, background: t.statusBar,
          display: 'flex', alignItems: 'center',
          padding: '0 28px',
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, flex: 1 }}>9:41</div>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 120, height: 34, borderRadius: 20,
            background: '#000000',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 12px',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: '#1A1A1A', border: '1px solid #333' }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: '#1C1C1C', border: '1px solid #2A2A2A' }} />
          </div>
          {/* Status icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {/* Signal */}
            <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
              {[4, 6, 8, 11].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i < 3 ? t.text : t.textMuted }} />
              ))}
            </div>
            {/* Wifi */}
            <svg width='15' height='11' viewBox='0 0 15 11'>
              {[
                { r: 13, sw: 1.5, opacity: 1 },
                { r: 9, sw: 1.5, opacity: 0.7 },
                { r: 5, sw: 1.5, opacity: 0.5 },
              ].map((arc, i) => (
                <path key={i} d={`M${7.5 - arc.r/2} ${10 - arc.r * 0.3} Q7.5 ${10 - arc.r} ${7.5 + arc.r/2} ${10 - arc.r * 0.3}`}
                  stroke={t.text} strokeWidth={arc.sw} fill='none' strokeLinecap='round' opacity={arc.opacity} />
              ))}
              <circle cx='7.5' cy='10' r='1.2' fill={t.text} />
            </svg>
            {/* Battery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{
                width: 24, height: 12, borderRadius: 3.5,
                border: `1.5px solid ${t.textSec}`,
                display: 'flex', alignItems: 'center', padding: '2px',
              }}>
                <div style={{ width: '75%', height: '100%', borderRadius: 1.5, background: t.text }} />
              </div>
              <div style={{ width: 2, height: 5, borderRadius: 1, background: t.textSec }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{
          flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          paddingTop: 4,
        }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <div style={{
          height: 82, background: t.tabBar,
          borderTop: `1px solid ${t.tabBarBorder}`,
          display: 'flex', alignItems: 'flex-start', paddingTop: 10,
          flexShrink: 0,
          backdropFilter: 'blur(20px)',
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            const TabIcon = window.lucide[tab.iconName];
            return (
              <div
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id !== 'boards') setSelectedBoard(null); }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4, cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <div style={{
                  width: 44, height: 30, borderRadius: 14,
                  background: active ? t.primaryDim : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? `0 2px 10px ${t.primaryGlow}` : 'none',
                }}>
                  {TabIcon && <TabIcon size={20} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 1.8} />}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: active ? 700 : 500,
                  color: active ? t.primary : t.textMuted,
                  transition: 'color 0.2s ease',
                }}>
                  {tab.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast Notification */}
      {notifVisible && (
        <div style={{
          position: 'fixed', bottom: 60, left: '50%', transform: 'translateX(-50%)',
          background: dark ? 'rgba(20,20,35,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${t.border}`,
          borderRadius: 16, padding: '10px 18px',
          fontSize: 13, fontWeight: 600, color: t.text,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          zIndex: 100,
          animation: 'slide-up 0.3s ease',
          display: 'flex', alignItems: 'center', gap: 8,
          whiteSpace: 'nowrap',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: t.green }} />
          {notifMsg}
        </div>
      )}
    </div>
  );
}
