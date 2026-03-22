const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0D0B14', surface: '#1A1625', card: '#221D32', cardBorder: '#2D2640',
    text: '#F0EBFF', textSecondary: '#9B8FBF', textMuted: '#6B5F8F',
    primary: '#A855F7', primaryLight: '#C084FC', accent: '#EC4899',
    accentOrange: '#F97316', success: '#10B981', navBg: '#12101C',
    inputBg: '#161225', divider: '#2D2640',
  },
  light: {
    bg: '#F8F5FF', surface: '#FFFFFF', card: '#F0EBFF', cardBorder: '#E4D9FF',
    text: '#1A0F33', textSecondary: '#6B5F8F', textMuted: '#9B8FBF',
    primary: '#7C3AED', primaryLight: '#A855F7', accent: '#DB2777',
    accentOrange: '#EA580C', success: '#059669', navBg: '#FFFFFF',
    inputBg: '#F0EBFF', divider: '#E4D9FF',
  }
};

const moodResults = {
  'Anxious': {
    colors: ['#2D3561', '#C05C7E', '#F5A7A7', '#E8D5C4', '#6C5B7B'],
    colorNames: ['Deep Dusk', 'Tension Rose', 'Soft Flush', 'Warm Relief', 'Quiet Purple'],
    typography: 'Condensed Sans + Italic Serif',
    typographyMood: 'urgent yet searching',
    composition: 'Tight grid breaking at edges',
    texture: 'Paper grain, ink bleed',
    prompts: ['Fragmented geometric forms', 'Text as texture', 'Compressed space with breathing room']
  },
  'Joyful': {
    colors: ['#FFD93D', '#FF6B6B', '#6BCB77', '#4D96FF', '#FF9F43'],
    colorNames: ['Sunshine', 'Coral Pop', 'Fresh Green', 'Sky Blue', 'Warm Citrus'],
    typography: 'Rounded Display + Bold Sans',
    typographyMood: 'playful and energetic',
    composition: 'Dynamic asymmetry, overlapping elements',
    texture: 'Flat with pops of grain',
    prompts: ['Overlapping circles of joy', 'Bold type as decoration', 'Confetti composition']
  },
  'Melancholic': {
    colors: ['#4A5568', '#718096', '#B794F4', '#9F7AEA', '#E2E8F0'],
    colorNames: ['Slate Dusk', 'Muted Grey', 'Wistful Violet', 'Dreamy Mauve', 'Pale Mist'],
    typography: 'Light Serif + Thin Sans',
    typographyMood: 'quiet and reflective',
    composition: 'Low horizon, vast negative space',
    texture: 'Soft watercolor, paper tooth',
    prompts: ['Fading gradients', 'Solitary figure framing', 'Whispered type weight']
  },
  'Bold': {
    colors: ['#1A1A2E', '#E94560', '#0F3460', '#533483', '#FFFFFF'],
    colorNames: ['Obsidian', 'Power Red', 'Deep Navy', 'Authority Purple', 'Clean White'],
    typography: 'Heavy Display + All Caps Sans',
    typographyMood: 'commanding and decisive',
    composition: 'Strong diagonals, full bleed',
    texture: 'Smooth, high contrast',
    prompts: ['Stark black and red contrast', 'Oversized type', 'Bold geometric structure']
  },
  'Dreamy': {
    colors: ['#C3B1E1', '#E8D5F5', '#F9E4FF', '#B5D5E8', '#FFF0F5'],
    colorNames: ['Lavender Dream', 'Soft Lilac', 'Petal Mist', 'Sky Whisper', 'Blush Cloud'],
    typography: 'Flowing Script + Thin Serif',
    typographyMood: 'ethereal and soft',
    composition: 'Floating elements, soft vignette',
    texture: 'Iridescent sheen, soft blur',
    prompts: ['Translucent layering', 'Cloud-like forms', 'Dreamy double exposure']
  },
  'Grounded': {
    colors: ['#5C4033', '#8B7355', '#C4A882', '#D4C5A9', '#F5F0E8'],
    colorNames: ['Earth Core', 'Warm Bark', 'Sand Stone', 'Linen', 'Natural Cream'],
    typography: 'Slab Serif + Regular Sans',
    typographyMood: 'rooted and honest',
    composition: 'Stable thirds, anchored baseline',
    texture: 'Linen, rough grain, natural',
    prompts: ['Organic shapes and forms', 'Earthy color blocks', 'Tactile textures']
  },
  'Electric': {
    colors: ['#00F5FF', '#FF00FF', '#0A0A0A', '#FFFF00', '#FF6B00'],
    colorNames: ['Neon Cyan', 'Hot Magenta', 'Void Black', 'Electric Yellow', 'Surge Orange'],
    typography: 'Monospace + Glitch Display',
    typographyMood: 'high-voltage and digital',
    composition: 'Tight grid, data-driven layout',
    texture: 'Scanlines, digital noise',
    prompts: ['Neon on black', 'Glitch art effect', 'Circuit board geometry']
  },
  'Tender': {
    colors: ['#FFB7C5', '#FFDDD2', '#E8C4B8', '#D4A5A5', '#FFF5F5'],
    colorNames: ['Soft Blush', 'Peach Glow', 'Warm Nude', 'Dusty Rose', 'Petal White'],
    typography: 'Handwritten + Light Italic Serif',
    typographyMood: 'intimate and personal',
    composition: 'Off-center balance, soft margins',
    texture: 'Soft grain, watercolor wash',
    prompts: ['Handmade aesthetic', 'Personal photo feel', 'Gentle color softening']
  },
  'default': {
    colors: ['#A855F7', '#EC4899', '#8B5CF6', '#F97316', '#1A1625'],
    colorNames: ['Violet Core', 'Rose Energy', 'Deep Purple', 'Warm Ember', 'Midnight'],
    typography: 'Geometric Sans + Light Italic',
    typographyMood: 'modern and introspective',
    composition: 'Centered focus with breathing room',
    texture: 'Subtle noise, soft gradients',
    prompts: ['Emotional color blocking', 'Layered transparency', 'Type as visual anchor']
  }
};

const emotionChips = ['Anxious', 'Joyful', 'Melancholic', 'Bold', 'Dreamy', 'Grounded', 'Electric', 'Tender'];
const placeholders = ['calm but restless...', 'rainy subway ride...', 'birthday for a shy friend...', 'first day of something new...', 'missing someone far away...'];

const recentCaptures = [
  { id: 1, name: 'Rainy Commute', desc: 'Storm blue, concrete grey, neon yellow', time: '2h ago', colors: ['#2C3E6B', '#8B9BAE', '#F4FF41'] },
  { id: 2, name: 'Morning Coffee Shop', desc: 'Warm amber, cream, forest green', time: 'Yesterday', colors: ['#D4813A', '#F5F0E8', '#2D5A3D'] },
  { id: 3, name: 'Late Night Creative', desc: 'Deep indigo, electric violet, rose gold', time: '2 days ago', colors: ['#2D1B69', '#9B59FF', '#C4956A'] },
];

const libraryRecipes = [
  { id: 1, name: 'Gratitude Journal', emotion: 'Thankful', colors: ['#88B04B', '#F7F5F0', '#D4A5A5', '#E8DCC8', '#A8C09A'], tags: ['Saved', 'Emotions'] },
  { id: 2, name: 'Brand Identity - Bold', emotion: 'Confident', colors: ['#0057FF', '#FFFFFF', '#2D3436', '#636E72', '#00CEC9'], tags: ['Saved'] },
  { id: 3, name: 'Event Invite - Ethereal', emotion: 'Dreamy', colors: ['#C3B1E1', '#C0C0C0', '#F7E7CE', '#E8D5F5', '#B8D4E8'], tags: ['Emotions'] },
  { id: 4, name: 'Social Post - Energetic', emotion: 'Joyful', colors: ['#FF6B6B', '#FFE66D', '#003049', '#F77F00', '#FCBF49'], tags: ['Emotions'] },
  { id: 5, name: 'Personal Journal - Melancholic', emotion: 'Reflective', colors: ['#1A535C', '#B5838D', '#A89080', '#4E4E50', '#6B4226'], tags: ['Saved', 'Emotions'] },
];

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('forge');
  const [moodInput, setMoodInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [selectedChip, setSelectedChip] = useState(null);
  const [expandedCapture, setExpandedCapture] = useState(null);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('All');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [captureAnalyzing, setCaptureAnalyzing] = useState(false);
  const [captureResult, setCaptureResult] = useState(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [revealedColor, setRevealedColor] = useState(null);
  const [intensity, setIntensity] = useState(70);

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setPlaceholderIdx(i => (i + 1) % placeholders.length), 3000);
    return () => clearInterval(iv);
  }, []);

  const handleGenerate = () => {
    if (!moodInput && !selectedChip) return;
    setGenerating(true);
    setGenerated(null);
    setTimeout(() => {
      const key = selectedChip || 'default';
      setGenerated(moodResults[key] || moodResults['default']);
      setGenerating(false);
    }, 2000);
  };

  const handleChipPress = (chip) => {
    setSelectedChip(chip === selectedChip ? null : chip);
    if (!moodInput) setMoodInput('');
  };

  const handleCapture = () => {
    setCaptureAnalyzing(true);
    setCaptureResult(null);
    setTimeout(() => {
      setCaptureResult({ colors: ['#4A6FA5', '#7FB3D3', '#C4DFE6', '#E8F4FD', '#2C3E50'], mood: 'Calm & Overcast', suggestion: 'Muted blues with silver linings' });
      setCaptureAnalyzing(false);
    }, 2000);
  };

  const btn = (id) => ({
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.1s ease',
    cursor: 'pointer',
  });

  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const ZapIcon = window.lucide.Zap;
  const CameraIcon = window.lucide.Camera;
  const BookmarkIcon = window.lucide.Bookmark;
  const SettingsIcon = window.lucide.Settings;
  const SearchIcon = window.lucide.Search;
  const SaveIcon = window.lucide.Save;
  const ShareIcon = window.lucide.Share2;
  const ChevronDownIcon = window.lucide.ChevronDown;
  const ChevronUpIcon = window.lucide.ChevronUp;
  const SparklesIcon = window.lucide.Sparkles;
  const UserIcon = window.lucide.User;
  const LogOutIcon = window.lucide.LogOut;
  const SlidersIcon = window.lucide.Sliders;

  const shimmer = {
    background: `linear-gradient(90deg, ${t.card} 25%, ${t.cardBorder} 50%, ${t.card} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  };

  const filteredRecipes = libraryRecipes.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.emotion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filterTab === 'All' || r.tags.includes(filterTab) || (filterTab === 'Emotions' && r.tags.includes('Emotions')) || (filterTab === 'Places' && false);
    return matchSearch && matchFilter;
  });

  const renderForge = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 700, background: 'linear-gradient(135deg, #A855F7, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>MoodForge</div>
        <div style={{ fontSize: 13, color: t.textSecondary }}>What are you feeling right now?</div>
      </div>
      <textarea
        value={moodInput}
        onChange={e => setMoodInput(e.target.value)}
        placeholder={placeholders[placeholderIdx]}
        style={{ width: '100%', minHeight: 80, background: t.inputBg, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '12px 14px', color: t.text, fontSize: 14, fontFamily: 'Space Grotesk, sans-serif', resize: 'none', outline: 'none', boxSizing: 'border-box', lineHeight: 1.5 }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
        {emotionChips.map(chip => (
          <div key={chip} onClick={() => handleChipPress(chip)} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${selectedChip === chip ? t.primary : t.cardBorder}`, background: selectedChip === chip ? `${t.primary}22` : 'transparent', color: selectedChip === chip ? t.primary : t.textSecondary, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', transform: selectedChip === chip ? 'scale(1.05)' : 'scale(1)' }}>
            {chip}
          </div>
        ))}
      </div>
      <div
        onClick={handleGenerate}
        onMouseDown={() => setPressedBtn('gen')}
        onMouseUp={() => setPressedBtn(null)}
        style={{ ...btn('gen'), marginTop: 16, padding: '14px', borderRadius: 14, background: (moodInput || selectedChip) ? 'linear-gradient(135deg, #A855F7, #EC4899)' : t.cardBorder, color: '#fff', fontSize: 15, fontWeight: 600, textAlign: 'center', opacity: (moodInput || selectedChip) ? 1 : 0.5 }}
      >
        {generating ? 'Forging...' : 'Generate Brief'}
      </div>
      {generating && (
        <div style={{ marginTop: 20 }}>
          {[80, 50, 100, 65].map((w, i) => (
            <div key={i} style={{ ...shimmer, height: 16, borderRadius: 8, marginBottom: 10, width: `${w}%`, animation: 'shimmer 1.5s infinite, pulse 1.5s infinite' }} />
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[1,2,3,4,5].map(i => <div key={i} style={{ ...shimmer, width: 44, height: 44, borderRadius: 8 }} />)}
          </div>
        </div>
      )}
      {generated && !generating && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Color Palette</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {generated.colors.map((c, i) => (
              <div key={i} onClick={() => setRevealedColor(revealedColor === `${c}${i}` ? null : `${c}${i}`)} style={{ flex: 1, cursor: 'pointer' }}>
                <div style={{ height: 48, borderRadius: 10, background: c, border: `2px solid ${revealedColor === `${c}${i}` ? '#fff' : 'transparent'}`, transition: 'all 0.15s' }} />
                <div style={{ fontSize: 9, color: t.textMuted, textAlign: 'center', marginTop: 4, fontFamily: 'monospace' }}>{revealedColor === `${c}${i}` ? c : generated.colorNames[i].split(' ')[0]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: t.card, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>TYPOGRAPHY MOOD</div>
            <div style={{ fontSize: 14, color: t.text, fontWeight: 600 }}>{generated.typography}</div>
            <div style={{ fontSize: 12, color: t.textSecondary }}>{generated.typographyMood}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <div style={{ flex: 1, background: t.card, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.cardBorder}` }}>
              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>COMPOSITION</div>
              <div style={{ fontSize: 12, color: t.text }}>{generated.composition}</div>
            </div>
            <div style={{ flex: 1, background: t.card, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.cardBorder}` }}>
              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>TEXTURE</div>
              <div style={{ fontSize: 12, color: t.text }}>{generated.texture}</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 8 }}>CREATIVE DIRECTIONS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {generated.prompts.map((p, i) => (
                <div key={i} style={{ padding: '6px 12px', borderRadius: 20, background: `${t.primary}1A`, border: `1px solid ${t.primary}44`, color: t.primaryLight, fontSize: 12 }}>{p}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <div onMouseDown={() => setPressedBtn('save')} onMouseUp={() => setPressedBtn(null)} style={{ ...btn('save'), flex: 1, padding: '12px', borderRadius: 12, background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <SaveIcon size={14} /> Save Recipe
            </div>
            <div onMouseDown={() => setPressedBtn('exp')} onMouseUp={() => setPressedBtn(null)} style={{ ...btn('exp'), flex: 1, padding: '12px', borderRadius: 12, border: `1.5px solid ${t.primary}`, color: t.primary, fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <ShareIcon size={14} /> Export
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCapture = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 16 }}>Moment Capture</div>
      <div style={{ width: '100%', height: 220, borderRadius: 16, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)', position: 'relative', overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ position: 'absolute', top: 12, left: 12, width: 20, height: 20, border: '2px solid rgba(255,255,255,0.6)', borderRight: 'none', borderBottom: 'none', borderRadius: '2px 0 0 0' }} />
        <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, border: '2px solid rgba(255,255,255,0.6)', borderLeft: 'none', borderBottom: 'none', borderRadius: '0 2px 0 0' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 12, width: 20, height: 20, border: '2px solid rgba(255,255,255,0.6)', borderRight: 'none', borderTop: 'none', borderRadius: '0 0 0 2px' }} />
        <div style={{ position: 'absolute', bottom: 12, right: 12, width: 20, height: 20, border: '2px solid rgba(255,255,255,0.6)', borderLeft: 'none', borderTop: 'none', borderRadius: '0 0 2px 0' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 48, height: 48, border: '2px solid rgba(255,255,255,0.5)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 6, height: 6, background: 'rgba(255,255,255,0.8)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 10, right: '50%', transform: 'translateX(50%)', background: 'rgba(255,0,0,0.8)', borderRadius: 4, padding: '2px 8px', fontSize: 10, color: '#fff', fontWeight: 600 }}>● REC</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, background: t.card, borderRadius: 12, padding: '10px 14px', border: `1px solid ${t.cardBorder}` }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: t.textMuted }}>TIME</div>
          <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>12:41 PM</div>
        </div>
        <div style={{ width: 1, background: t.divider }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: t.textMuted }}>WEATHER</div>
          <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>☁ 16°C</div>
        </div>
        <div style={{ width: 1, background: t.divider }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: t.textMuted }}>LOCATION</div>
          <div style={{ fontSize: 11, color: t.text, fontWeight: 500 }}>📍 Midtown</div>
        </div>
      </div>
      <div onMouseDown={() => setPressedBtn('cap')} onMouseUp={() => { setPressedBtn(null); handleCapture(); }} style={{ ...btn('cap'), padding: '13px', borderRadius: 13, background: 'linear-gradient(135deg, #A855F7, #EC4899)', color: '#fff', fontSize: 14, fontWeight: 600, textAlign: 'center', marginBottom: 16 }}>
        {captureAnalyzing ? 'Analyzing...' : 'Analyze Moment'}
      </div>
      {captureResult && (
        <div style={{ background: t.card, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.primary}44`, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.primaryLight, marginBottom: 8 }}>Mood Detected: {captureResult.mood}</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            {captureResult.colors.map((c, i) => <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: c }} />)}
          </div>
          <div style={{ fontSize: 12, color: t.textSecondary }}>{captureResult.suggestion}</div>
        </div>
      )}
      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 10 }}>Recent Captures</div>
      {recentCaptures.map(cap => (
        <div key={cap.id} onClick={() => setExpandedCapture(expandedCapture === cap.id ? null : cap.id)} style={{ background: t.card, borderRadius: 12, padding: '12px 14px', marginBottom: 10, border: `1px solid ${t.cardBorder}`, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{cap.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{cap.time}</div>
            </div>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {cap.colors.map((c, i) => <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: c }} />)}
              {expandedCapture === cap.id ? <ChevronUpIcon size={14} color={t.textMuted} /> : <ChevronDownIcon size={14} color={t.textMuted} />}
            </div>
          </div>
          {expandedCapture === cap.id && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.divider}` }}>
              <div style={{ fontSize: 12, color: t.textSecondary }}>{cap.desc}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {cap.colors.map((c, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ height: 32, borderRadius: 8, background: c }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const filterTabs = ['All', 'Saved', 'Emotions', 'Places'];

  const renderLibrary = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 14 }}>Creative Recipes</div>
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <SearchIcon size={14} color={t.textMuted} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search recipes..." style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: '10px 12px 10px 32px', color: t.text, fontSize: 13, fontFamily: 'Space Grotesk, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {filterTabs.map(tab => (
          <div key={tab} onClick={() => setFilterTab(tab)} style={{ padding: '6px 14px', borderRadius: 20, background: filterTab === tab ? t.primary : 'transparent', border: `1.5px solid ${filterTab === tab ? t.primary : t.cardBorder}`, color: filterTab === tab ? '#fff' : t.textSecondary, fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
            {tab}
          </div>
        ))}
      </div>
      {filteredRecipes.map(recipe => (
        <div key={recipe.id} onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)} style={{ background: t.card, borderRadius: 14, padding: '14px', marginBottom: 12, border: `1px solid ${t.cardBorder}`, cursor: 'pointer', transition: 'border-color 0.15s', borderColor: expandedRecipe === recipe.id ? t.primary : t.cardBorder }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{recipe.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>Emotion: {recipe.emotion}</div>
            </div>
            {expandedRecipe === recipe.id ? <ChevronUpIcon size={16} color={t.textMuted} /> : <ChevronDownIcon size={16} color={t.textMuted} />}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {recipe.colors.map((c, i) => <div key={i} style={{ flex: 1, height: 24, borderRadius: 6, background: c }} />)}
          </div>
          {expandedRecipe === recipe.id && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.divider}` }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {recipe.tags.map(tag => <span key={tag} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 10, background: `${t.primary}22`, color: t.primaryLight }}>{tag}</span>)}
              </div>
              <div onMouseDown={() => setPressedBtn(`use${recipe.id}`)} onMouseUp={() => setPressedBtn(null)} style={{ ...btn(`use${recipe.id}`), padding: '10px', borderRadius: 10, background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>
                Use Recipe
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 20 }}>Settings</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.cardBorder}` }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #A855F7, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff' }}>AK</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Alex Kim</div>
          <div style={{ fontSize: 12, color: t.textSecondary }}>Creative Designer</div>
        </div>
      </div>
      <div style={{ background: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.cardBorder}`, marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Appearance</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isDark ? <MoonIcon size={16} color={t.primary} /> : <SunIcon size={16} color={t.accentOrange} />}
            <span style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <div onClick={() => setIsDark(!isDark)} style={{ width: 48, height: 26, borderRadius: 13, background: isDark ? t.primary : t.cardBorder, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
            <div style={{ position: 'absolute', top: 3, left: isDark ? 25 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
          </div>
        </div>
      </div>
      <div style={{ background: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.cardBorder}`, marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Preferences</div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: t.text }}>Emotion Intensity</span>
            <span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>{intensity}%</span>
          </div>
          <div style={{ position: 'relative', height: 4, background: t.cardBorder, borderRadius: 2 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${intensity}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 2 }} />
            <input type="range" min={0} max={100} value={intensity} onChange={e => setIntensity(+e.target.value)} style={{ position: 'absolute', top: -8, left: 0, width: '100%', opacity: 0, cursor: 'pointer', height: 20 }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: t.text, marginBottom: 8 }}>Export Format</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['PDF', 'PNG', 'JSON'].map(fmt => (
              <div key={fmt} onClick={() => setExportFormat(fmt)} style={{ flex: 1, padding: '8px', borderRadius: 10, textAlign: 'center', background: exportFormat === fmt ? t.primary : 'transparent', border: `1.5px solid ${exportFormat === fmt ? t.primary : t.cardBorder}`, color: exportFormat === fmt ? '#fff' : t.textSecondary, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
                {fmt}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.cardBorder}`, marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>About</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: t.text }}>Version</span>
          <span style={{ fontSize: 13, color: t.textSecondary }}>1.0.0 beta</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: t.text }}>MoodForge Lab</span>
          <span style={{ fontSize: 13, color: t.primary, fontWeight: 500 }}>Visit ↗</span>
        </div>
      </div>
      <div style={{ padding: '13px', borderRadius: 13, border: `1.5px solid #EF444444`, color: '#EF4444', fontSize: 14, fontWeight: 600, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
        <LogOutIcon size={15} /> Sign Out
      </div>
    </div>
  );

  const tabs = [
    { id: 'forge', label: 'Forge', Icon: ZapIcon },
    { id: 'capture', label: 'Capture', Icon: CameraIcon },
    { id: 'library', label: 'Library', Icon: BookmarkIcon },
    { id: 'settings', label: 'Settings', Icon: SettingsIcon },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f0f0', fontFamily: 'Space Grotesk, sans-serif' }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column', position: 'relative', border: `1px solid ${isDark ? '#333' : '#ddd'}` }}>
        {/* Dynamic Island + Status Bar */}
        <div style={{ background: t.bg, paddingTop: 14, paddingBottom: 8, paddingLeft: 20, paddingRight: 20, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, background: '#1a1a1a', borderRadius: '50%', border: '1.5px solid #333' }} />
              <div style={{ width: 60, height: 10, background: '#0a0a0a', borderRadius: 6 }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>12:41</div>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {[3,4,5,6].map(h => <div key={h} style={{ width: 3, height: h, background: t.text, borderRadius: 1 }} />)}
              </div>
              <div style={{ fontSize: 11, color: t.text }}>WiFi</div>
              <div style={{ width: 22, height: 12, border: `1.5px solid ${t.text}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: 1 }}>
                <div style={{ width: '80%', height: '60%', background: t.success, borderRadius: 1 }} />
                <div style={{ width: 2, height: 5, background: t.text, borderRadius: 1, position: 'absolute', right: -3, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'forge' && renderForge()}
          {activeTab === 'capture' && renderCapture()}
          {activeTab === 'library' && renderLibrary()}
          {activeTab === 'settings' && renderSettings()}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.divider}`, display: 'flex', paddingBottom: 16, paddingTop: 8, flexShrink: 0 }}>
          {tabs.map(({ id, label, Icon }) => (
            <div key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', transition: 'all 0.15s' }}>
              <Icon size={20} color={activeTab === id ? t.primary : t.textMuted} />
              <div style={{ fontSize: 10, color: activeTab === id ? t.primary : t.textMuted, fontWeight: activeTab === id ? 600 : 400 }}>{label}</div>
              {activeTab === id && <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.primary }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
