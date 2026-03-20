function App() {
  const { useState, useEffect, useRef } = React;

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('capture');
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [activeDir, setActiveDir] = useState(0);
  const [pinnedItems, setPinnedItems] = useState({});
  const [showPinModal, setShowPinModal] = useState(null);
  const [pinLabel, setPinLabel] = useState('');
  const [pressedEl, setPressedEl] = useState(null);
  const [exportFmt, setExportFmt] = useState('pack');
  const [exportDone, setExportDone] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [animIn, setAnimIn] = useState(true);
  const [voiceActive, setVoiceActive] = useState(false);

  // ── Fonts ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(0.92); } }
      @keyframes wave { 0%,100% { transform:scaleY(0.4); } 50% { transform:scaleY(1); } }
      @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    setAnimIn(false);
    const t = setTimeout(() => setAnimIn(true), 60);
    return () => clearTimeout(t);
  }, [activeTab]);

  // ── Theme ──────────────────────────────────────────────────────────────────
  const C = {
    bg: '#09071A',
    surface: '#100D24',
    card: '#16122E',
    elevated: '#1E1A3A',
    border: '#262048',
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDim: '#8B5CF622',
    pink: '#F472B6',
    amber: '#FBB040',
    teal: '#34D399',
    text: '#EDE9FA',
    textMuted: '#7C6FA8',
    textDim: '#3D3568',
  };

  // ── Data ───────────────────────────────────────────────────────────────────
  const directions = [
    {
      name: 'Soft Dissolution',
      subtitle: 'Warm · Organic · Unhurried',
      type: 'Reflective',
      colors: ['#C4A882', '#E8D5C0', '#8B7355', '#F5EDD8', '#6B5B45'],
      blobs: [
        { c: ['#C4A882CC', '#E8C89A88'], x: -30, y: -30, s: 200, op: 0.85 },
        { c: ['#8B735588', '#C4A88266'], x: 100, y: 50, s: 160, op: 0.7 },
        { c: ['#F5EDD866', '#E8D5C044'], x: 30, y: 120, s: 120, op: 0.55 },
      ],
      shapes: 'Organic · Rounded · Overlapping forms',
      textures: ['grain', 'linen', 'watercolor wash'],
      keywords: ['tender', 'warm', 'unhurried', 'present', 'soft'],
      description: 'A palette that dissolves rather than cuts — edges blur, forms merge into each other like memory.',
    },
    {
      name: 'Charged Stillness',
      subtitle: 'Deep · Electric · Contemplative',
      type: 'Introspective',
      colors: ['#2C2040', '#5B3F8A', '#9B7EC8', '#E8D5F5', '#7B55B0'],
      blobs: [
        { c: ['#5B3F8ACC', '#3A286888'], x: -40, y: -10, s: 220, op: 0.75 },
        { c: ['#9B7EC866', '#6B4FA044'], x: 70, y: 80, s: 160, op: 0.55 },
        { c: ['#E8D5F533', '#C4A8E822'], x: 10, y: 140, s: 100, op: 0.45 },
      ],
      shapes: 'Geometric · Tension · Contained energy',
      textures: ['velvet', 'smooth glass', 'matte stone'],
      keywords: ['deep', 'electric', 'restrained', 'heavy', 'present'],
      description: 'Still on the surface with energy underneath — darkness that holds light like a storm at dusk.',
    },
    {
      name: 'Living Archive',
      subtitle: 'Layered · Vivid · Earthen',
      type: 'Energetic',
      colors: ['#8B2020', '#C4714A', '#E8A87C', '#F5D4B0', '#5A1515'],
      blobs: [
        { c: ['#C4714ACC', '#8B403088'], x: -10, y: 10, s: 190, op: 0.8 },
        { c: ['#8B202088', '#5A151566'], x: 100, y: 60, s: 150, op: 0.7 },
        { c: ['#F5D4B055', '#E8A87C44'], x: 20, y: 130, s: 130, op: 0.5 },
      ],
      shapes: 'Layered · Archival · Collage-like',
      textures: ['aged paper', 'rust', 'terracotta clay'],
      keywords: ['vivid', 'historical', 'layered', 'raw', 'alive'],
      description: 'Like flipping through decades of memory — warm reds and earth tones with unexpected depth.',
    },
  ];

  const savedBoards = [
    {
      id: 1, title: 'Sunday afternoon light',
      prompt: 'Sunlight hitting dust particles in an empty room',
      colors: ['#F5DEB3', '#DEB887', '#C8A96E', '#8B7355', '#E8D5B0'],
      mood: ['warm', 'nostalgic', 'hazy'], dir: 'Soft Dissolution', date: 'Mar 18',
    },
    {
      id: 2, title: 'Nova Café rebrand',
      prompt: 'Premium but approachable, earthy but fresh, specialty coffee',
      colors: ['#2D5016', '#6B8F3E', '#C8B98A', '#F2EDD7', '#4A7A28'],
      mood: ['organic', 'premium', 'alive'], dir: 'Charged Stillness', date: 'Mar 15',
    },
    {
      id: 3, title: 'Chapter 7 atmosphere',
      prompt: 'Abandoned train station, 3am, winter — the protagonist arrives',
      colors: ['#1A1A2E', '#16213E', '#4A6FA5', '#A8C4E0', '#0F3460'],
      mood: ['cold', 'lonely', 'cinematic'], dir: 'Living Archive', date: 'Mar 12',
    },
    {
      id: 4, title: 'Home office refresh',
      prompt: 'Focused but not sterile — somewhere to actually think',
      colors: ['#E8E0D5', '#C4B5A0', '#7D6E63', '#3D3530', '#A89888'],
      mood: ['focused', 'quiet', 'warm'], dir: 'Soft Dissolution', date: 'Mar 10',
    },
  ];

  const promptSuggestions = [
    'That anxious energy before a big conversation',
    'A Sunday morning that felt like goodbye',
    'The vibe of an old bookshop in heavy rain',
    'How I want my living space to feel',
    'A memory that is mostly light and smell',
  ];

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleGenerate = () => {
    if (!inputText.trim() && inputMode === 'text') return;
    setIsGenerating(true);
    setGenStep(0);
    [0, 1, 2, 3].forEach((s, i) => setTimeout(() => setGenStep(s), i * 550));
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentBoard({
        title: inputText.length > 38 ? inputText.slice(0, 38) + '…' : inputText || 'Captured moment',
        prompt: inputText || 'Untitled capture',
      });
      setActiveDir(0);
      setActiveTab('board');
    }, 2500);
  };

  const press = (id) => { setPressedEl(id); setTimeout(() => setPressedEl(null), 160); };

  const openPin = (id) => { setShowPinModal(id); setPinLabel(pinnedItems[id] || ''); };

  const confirmPin = () => {
    if (pinLabel.trim()) setPinnedItems(p => ({ ...p, [showPinModal]: pinLabel.trim() }));
    else { const n = { ...pinnedItems }; delete n[showPinModal]; setPinnedItems(n); }
    setShowPinModal(null);
    setPinLabel('');
  };

  const doExport = () => {
    setExportDone(true);
    setTimeout(() => setExportDone(false), 2800);
  };

  // ── Icon helper ────────────────────────────────────────────────────────────
  const Icon = ({ name, size = 20, color = C.text, sw = 1.8 }) => {
    const L = window.lucide?.[name];
    if (!L) return null;
    return React.createElement(L, { size, color, strokeWidth: sw });
  };

  // ── Screen transition wrapper ──────────────────────────────────────────────
  const Screen = ({ children }) => (
    <div style={{
      flex: 1, overflowY: 'auto', overflowX: 'hidden',
      opacity: animIn ? 1 : 0,
      transform: animIn ? 'translateY(0)' : 'translateY(14px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      padding: '20px 20px 16px',
    }}>
      {children}
    </div>
  );

  // ── CAPTURE SCREEN ─────────────────────────────────────────────────────────
  const CaptureScreen = () => (
    <Screen>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <p style={{ color: C.textMuted, fontSize: 12, margin: '0 0 5px', fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.03em' }}>
            Saturday, Mar 21
          </p>
          <h1 style={{ color: C.text, fontSize: 23, fontWeight: 800, margin: 0, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.15 }}>
            What are you<br />feeling right now?
          </h1>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.primary}, ${C.pink})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name="User" size={17} color="#fff" />
        </div>
      </div>

      {/* Input Mode Tabs */}
      <div style={{ display: 'flex', background: C.surface, borderRadius: 12, padding: 4, marginBottom: 14, border: `1px solid ${C.border}` }}>
        {[{ id: 'text', icon: 'Type', label: 'Text' }, { id: 'voice', icon: 'Mic', label: 'Voice' }, { id: 'photo', icon: 'Camera', label: 'Photo' }].map(m => (
          <button key={m.id} onClick={() => setInputMode(m.id)} style={{
            flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
            background: inputMode === m.id ? C.elevated : 'transparent',
            color: inputMode === m.id ? C.text : C.textMuted,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Plus Jakarta Sans',
            transition: 'all 0.18s',
          }}>
            <Icon name={m.icon} size={13} color={inputMode === m.id ? C.primary : C.textMuted} />
            {m.label}
          </button>
        ))}
      </div>

      {/* Text Input */}
      {inputMode === 'text' && (
        <div style={{ background: C.card, borderRadius: 16, padding: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type a feeling, a memory, a color you can't name, a mood you're chasing..."
            style={{
              width: '100%', minHeight: 104, background: 'transparent', border: 'none', outline: 'none',
              color: C.text, fontSize: 14, lineHeight: 1.65, fontFamily: 'Plus Jakarta Sans', resize: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
            <span style={{ color: C.textDim, fontSize: 10, fontFamily: 'Plus Jakarta Sans' }}>{inputText.length} chars</span>
            {inputText && (
              <button onClick={() => setInputText('')} style={{
                background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 7,
                padding: '4px 10px', color: C.textMuted, fontSize: 11, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
              }}>Clear</button>
            )}
          </div>
        </div>
      )}

      {/* Voice Input */}
      {inputMode === 'voice' && (
        <div style={{ background: C.card, borderRadius: 16, padding: 22, border: `1px solid ${C.border}`, marginBottom: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setVoiceActive(v => !v)} style={{
            width: 72, height: 72, borderRadius: '50%',
            background: voiceActive ? `linear-gradient(135deg, ${C.primary}, ${C.pink})` : C.elevated,
            border: `2px solid ${voiceActive ? C.primary : C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: voiceActive ? `0 0 24px ${C.primary}66` : 'none',
            animation: voiceActive ? 'pulse 1.5s ease-in-out infinite' : 'none',
          }}>
            <Icon name="Mic" size={28} color={voiceActive ? '#fff' : C.textMuted} />
          </button>
          <p style={{ color: C.textMuted, fontSize: 12, margin: 0, textAlign: 'center', fontFamily: 'Plus Jakarta Sans' }}>
            {voiceActive ? 'Listening… speak freely' : 'Tap to start recording your mood'}
          </p>
          {/* Waveform */}
          <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 28 }}>
            {[4, 9, 6, 14, 8, 18, 10, 7, 15, 9, 5, 12, 7, 10, 4, 13, 6, 9].map((h, i) => (
              <div key={i} style={{
                width: 3, height: voiceActive ? h : 4, borderRadius: 2,
                background: voiceActive ? C.primary : C.textDim,
                transition: 'all 0.2s',
                animation: voiceActive ? `wave ${0.4 + (i % 4) * 0.15}s ease-in-out infinite` : 'none',
                animationDelay: `${i * 0.05}s`,
              }} />
            ))}
          </div>
          <p style={{ color: C.textDim, fontSize: 10, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>
            Last: "That kind of blue you feel in November" · 14s
          </p>
        </div>
      )}

      {/* Photo Input */}
      {inputMode === 'photo' && (
        <div style={{
          background: C.card, borderRadius: 16, padding: 24, marginBottom: 14,
          border: `2px dashed ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: C.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="Image" size={24} color={C.textDim} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: C.textMuted, fontSize: 13, margin: '0 0 4px', fontFamily: 'Plus Jakarta Sans', fontWeight: 500 }}>
              Drop a photo or tap to upload
            </p>
            <p style={{ color: C.textDim, fontSize: 11, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>
              Screenshot, street photo, texture, anything with a feeling
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 14px', color: C.textMuted, fontSize: 12, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans' }}>
              Camera Roll
            </button>
            <button style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 14px', color: C.textMuted, fontSize: 12, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans' }}>
              Take Photo
            </button>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        onMouseDown={() => press('gen')}
        disabled={isGenerating}
        style={{
          width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
          background: (inputText.trim() || inputMode !== 'text')
            ? `linear-gradient(135deg, ${C.primary} 0%, ${C.pink} 100%)`
            : C.elevated,
          color: (inputText.trim() || inputMode !== 'text') ? '#fff' : C.textDim,
          fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
          transform: pressedEl === 'gen' ? 'scale(0.97)' : 'scale(1)',
          transition: 'all 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: inputText.trim() ? `0 10px 28px ${C.primary}44` : 'none',
          marginBottom: 20,
        }}
      >
        {isGenerating ? (
          <>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
            {['Analyzing feeling…', 'Reading texture…', 'Mapping mood…', 'Building mosaic…'][genStep]}
          </>
        ) : (
          <>
            <Icon name="Wand2" size={18} color={inputText.trim() || inputMode !== 'text' ? '#fff' : C.textDim} />
            Generate Mood Mosaic
          </>
        )}
      </button>

      {/* Prompt Suggestions */}
      <p style={{ color: C.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px', fontFamily: 'Plus Jakarta Sans' }}>
        Try a prompt
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {promptSuggestions.map((p, i) => (
          <button key={i} onClick={() => { setInputText(p); setInputMode('text'); }} style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 14px',
            color: C.textMuted, fontSize: 12, textAlign: 'left', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.15s',
          }}>
            <span>"{p}"</span>
            <Icon name="ArrowRight" size={13} color={C.textDim} />
          </button>
        ))}
      </div>
    </Screen>
  );

  // ── BOARD SCREEN ───────────────────────────────────────────────────────────
  const BoardScreen = () => {
    const dir = directions[activeDir];
    const board = currentBoard || { title: 'Sunday afternoon light', prompt: 'Sunlight hitting dust particles in an empty room' };

    return (
      <Screen>
        {/* Header */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ background: `${C.primary}22`, color: C.primaryLight, fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 6, fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {dir.type}
            </span>
            <div style={{ display: 'flex', gap: 7 }}>
              <button onClick={() => openPin('board-bookmark')} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Icon name="Bookmark" size={14} color={pinnedItems['board-bookmark'] ? C.amber : C.textMuted} />
              </button>
              <button onClick={() => setActiveTab('export')} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Icon name="Share2" size={14} color={C.textMuted} />
              </button>
            </div>
          </div>
          <h2 style={{ color: C.text, fontSize: 19, fontWeight: 700, margin: '0 0 3px', fontFamily: 'Plus Jakarta Sans', lineHeight: 1.2 }}>
            {board.title}
          </h2>
          <p style={{ color: C.textMuted, fontSize: 11, margin: 0, fontFamily: 'Plus Jakarta Sans', fontStyle: 'italic' }}>
            {board.prompt.length > 58 ? board.prompt.slice(0, 58) + '…' : board.prompt}
          </p>
        </div>

        {/* Direction Selector */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
          {directions.map((d, i) => (
            <button key={i} onClick={() => setActiveDir(i)} style={{
              flexShrink: 0, padding: '5px 13px', borderRadius: 20,
              border: `1.5px solid ${i === activeDir ? C.primary : C.border}`,
              background: i === activeDir ? `${C.primary}1A` : C.card,
              color: i === activeDir ? C.primaryLight : C.textMuted,
              fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
              transition: 'all 0.18s', whiteSpace: 'nowrap',
            }}>
              {d.name}
            </button>
          ))}
        </div>

        {/* Visual Mood Board */}
        <div style={{
          borderRadius: 20, overflow: 'hidden', position: 'relative', height: 195,
          background: `linear-gradient(145deg, ${dir.colors[0]}DD 0%, ${dir.colors[1]}BB 45%, ${dir.colors[2]}99 100%)`,
          marginBottom: 14, cursor: 'pointer',
        }} onClick={() => openPin('visual-board')}>
          {/* Gradient blobs */}
          {dir.blobs.map((b, i) => (
            <div key={i} style={{
              position: 'absolute', left: b.x, top: b.y, width: b.s, height: b.s,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${b.c[0]}, ${b.c[1]})`,
              opacity: b.op, filter: 'blur(28px)', mixBlendMode: 'overlay',
            }} />
          ))}
          {/* Direction name */}
          <div style={{ position: 'absolute', top: 14, left: 16, right: 16 }}>
            <span style={{
              background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(6px)',
              color: 'rgba(255,255,255,0.75)', fontSize: 11, padding: '4px 10px', borderRadius: 8,
              fontFamily: 'Plus Jakarta Sans',
            }}>
              {dir.description.length > 52 ? dir.description.slice(0, 52) + '…' : dir.description}
            </span>
          </div>
          {/* Bottom overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontFamily: 'DM Serif Display', fontStyle: 'italic', fontSize: 24, color: 'rgba(255,255,255,0.92)', margin: '0 0 2px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {dir.name}
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                {dir.subtitle}
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', borderRadius: 8, padding: '4px 9px' }}>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }}>
                {activeDir + 1}/{directions.length}
              </span>
            </div>
          </div>
          {/* Pin badge */}
          {pinnedItems['visual-board'] && (
            <div style={{ position: 'absolute', top: 46, right: 12, background: C.amber, borderRadius: 8, padding: '3px 8px' }}>
              <span style={{ fontSize: 9, color: '#000', fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>"{pinnedItems['visual-board']}"</span>
            </div>
          )}
        </div>

        {/* Color Palette */}
        <div style={{ background: C.card, borderRadius: 16, padding: 14, border: `1px solid ${C.border}`, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
            <span style={{ color: C.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans' }}>Color Palette</span>
            <button onClick={() => openPin('palette')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: pinnedItems['palette'] ? C.amber : C.textDim, fontSize: 10, fontFamily: 'Plus Jakarta Sans' }}>
              <Icon name="Pin" size={11} color={pinnedItems['palette'] ? C.amber : C.textDim} sw={2} />
              {pinnedItems['palette'] ? `"${pinnedItems['palette']}"` : 'Pin'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {dir.colors.map((c, i) => (
              <div key={i} onClick={() => openPin(`clr-${i}`)} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, cursor: 'pointer' }}>
                <div style={{
                  height: 46, borderRadius: 9, background: c,
                  boxShadow: `0 4px 14px ${c}55`,
                  border: `2px solid ${pinnedItems[`clr-${i}`] ? C.amber : 'transparent'}`,
                  transition: 'border-color 0.15s',
                }} />
                <span style={{ fontSize: 8, color: pinnedItems[`clr-${i}`] ? C.amber : C.textDim, textAlign: 'center', fontFamily: 'Plus Jakarta Sans' }}>
                  {pinnedItems[`clr-${i}`] ? `"${pinnedItems[`clr-${i}`]}"` : c}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Words + Textures */}
        <div style={{ display: 'flex', gap: 9, marginBottom: 10 }}>
          <div style={{ flex: 1, background: C.card, borderRadius: 14, padding: 13, border: `1px solid ${C.border}` }}>
            <span style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans', display: 'block', marginBottom: 9 }}>
              Mood Words
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {dir.keywords.map((kw, i) => (
                <span key={i} onClick={() => openPin(`kw-${i}`)} style={{
                  background: pinnedItems[`kw-${i}`] ? `${C.amber}20` : C.elevated,
                  color: pinnedItems[`kw-${i}`] ? C.amber : C.textMuted,
                  border: `1px solid ${pinnedItems[`kw-${i}`] ? C.amber : C.border}`,
                  borderRadius: 7, padding: '4px 8px', fontSize: 11,
                  fontFamily: 'Plus Jakarta Sans', cursor: 'pointer', fontStyle: 'italic',
                }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, background: C.card, borderRadius: 14, padding: 13, border: `1px solid ${C.border}` }}>
            <span style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans', display: 'block', marginBottom: 9 }}>
              Textures
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {dir.textures.map((tx, i) => (
                <div key={i} onClick={() => openPin(`tx-${i}`)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                    background: pinnedItems[`tx-${i}`]
                      ? `linear-gradient(135deg, ${dir.colors[i % dir.colors.length]}, ${dir.colors[(i + 2) % dir.colors.length]})`
                      : C.elevated,
                    border: `1px solid ${pinnedItems[`tx-${i}`] ? C.amber : C.border}`,
                  }} />
                  <span style={{ fontSize: 11, color: pinnedItems[`tx-${i}`] ? C.text : C.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{tx}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Language */}
        <div style={{ background: C.card, borderRadius: 14, padding: 12, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 11, marginBottom: 6 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 11, flexShrink: 0,
            background: `linear-gradient(135deg, ${dir.colors[0]}44, ${dir.colors[2]}44)`,
            border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="Layers" size={18} color={C.primaryLight} />
          </div>
          <div>
            <span style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans', display: 'block', marginBottom: 2 }}>Form Language</span>
            <span style={{ color: C.text, fontSize: 12, fontFamily: 'Plus Jakarta Sans' }}>{dir.shapes}</span>
          </div>
        </div>
      </Screen>
    );
  };

  // ── GALLERY SCREEN ─────────────────────────────────────────────────────────
  const GalleryScreen = () => (
    <Screen>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: '0 0 3px', fontFamily: 'Plus Jakarta Sans' }}>My Mosaics</h2>
        <p style={{ color: C.textMuted, fontSize: 12, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>{savedBoards.length} boards saved</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }}>
        {['All', 'Recent', 'Pinned', 'Shared'].map(f => (
          <button key={f} onClick={() => setGalleryFilter(f.toLowerCase())} style={{
            flexShrink: 0, padding: '5px 14px', borderRadius: 20,
            border: `1.5px solid ${galleryFilter === f.toLowerCase() ? C.primary : C.border}`,
            background: galleryFilter === f.toLowerCase() ? `${C.primary}1A` : C.card,
            color: galleryFilter === f.toLowerCase() ? C.primaryLight : C.textMuted,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Board Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {savedBoards.map(board => (
          <div key={board.id} onClick={() => {
            setCurrentBoard({ title: board.title, prompt: board.prompt });
            setActiveTab('board');
          }} style={{
            background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
            overflow: 'hidden', cursor: 'pointer',
          }}>
            {/* Color strip */}
            <div style={{ display: 'flex', height: 7 }}>
              {board.colors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
            </div>
            <div style={{ padding: '13px 15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
                <div style={{ flex: 1, paddingRight: 10 }}>
                  <h3 style={{ color: C.text, fontSize: 14, fontWeight: 700, margin: '0 0 3px', fontFamily: 'Plus Jakarta Sans' }}>{board.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 11, margin: 0, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.45 }}>
                    {board.prompt.length > 52 ? board.prompt.slice(0, 52) + '…' : board.prompt}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                  <span style={{ color: C.textDim, fontSize: 10, fontFamily: 'Plus Jakarta Sans' }}>{board.date}</span>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {board.colors.slice(0, 4).map((c, i) => (
                      <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {board.mood.map((tag, i) => (
                  <span key={i} style={{ background: C.elevated, color: C.textMuted, fontSize: 10, padding: '2px 8px', borderRadius: 6, fontFamily: 'Plus Jakarta Sans', fontStyle: 'italic' }}>
                    {tag}
                  </span>
                ))}
                <span style={{ background: `${C.primary}1A`, color: C.primaryLight, fontSize: 10, padding: '2px 8px', borderRadius: 6, fontFamily: 'Plus Jakarta Sans' }}>
                  {board.dir}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );

  // ── EXPORT SCREEN ──────────────────────────────────────────────────────────
  const ExportScreen = () => {
    const dir = directions[activeDir];
    const board = currentBoard || { title: 'Sunday afternoon light', prompt: 'Sunlight hitting dust particles in an empty room' };

    return (
      <Screen>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: '0 0 3px', fontFamily: 'Plus Jakarta Sans' }}>Export & Share</h2>
          <p style={{ color: C.textMuted, fontSize: 12, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>Package your mood board for the world</p>
        </div>

        {/* Board Preview */}
        <div style={{ background: C.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${C.border}`, marginBottom: 20 }}>
          <div style={{
            height: 90, position: 'relative',
            background: `linear-gradient(135deg, ${dir.colors[0]}EE, ${dir.colors[1]}AA, ${dir.colors[2]}88)`,
            display: 'flex', alignItems: 'flex-end', padding: '0 16px 12px',
          }}>
            {dir.blobs.slice(0, 2).map((b, i) => (
              <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.s * 0.6, height: b.s * 0.6, borderRadius: '50%', background: `radial-gradient(circle, ${b.c[0]}, ${b.c[1]})`, opacity: b.op, filter: 'blur(16px)' }} />
            ))}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 13, fontWeight: 700, margin: '0 0 2px', fontFamily: 'Plus Jakarta Sans' }}>{board.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>{dir.name} · {dir.type}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, padding: '10px 14px' }}>
            {dir.colors.map((c, i) => <div key={i} style={{ flex: 1, height: 22, borderRadius: 5, background: c }} />)}
          </div>
          <div style={{ padding: '0 14px 12px', display: 'flex', gap: 5 }}>
            {dir.keywords.map((kw, i) => (
              <span key={i} style={{ background: C.elevated, color: C.textMuted, fontSize: 9, padding: '2px 7px', borderRadius: 5, fontFamily: 'Plus Jakarta Sans', fontStyle: 'italic' }}>{kw}</span>
            ))}
          </div>
        </div>

        {/* Format Options */}
        <p style={{ color: C.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px', fontFamily: 'Plus Jakarta Sans' }}>
          Export Format
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          {[
            { id: 'pack', icon: 'Package', title: 'Mood Pack', sub: 'Full board with colors, textures, keywords — ideal for presentations' },
            { id: 'png', icon: 'Image', title: 'Visual PNG', sub: 'Clean export for client decks and moodboards' },
            { id: 'palette', icon: 'Palette', title: 'Color Palette', sub: 'Hex codes + swatches for Figma, Sketch, and code' },
            { id: 'pdf', icon: 'FileText', title: 'PDF Brief', sub: 'Creative direction document with full context' },
          ].map(fmt => (
            <button key={fmt.id} onClick={() => setExportFmt(fmt.id)} style={{
              background: exportFmt === fmt.id ? `${C.primary}12` : C.card,
              border: `1.5px solid ${exportFmt === fmt.id ? C.primary : C.border}`,
              borderRadius: 14, padding: '11px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left', transition: 'all 0.18s',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: exportFmt === fmt.id ? `${C.primary}22` : C.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={fmt.icon} size={17} color={exportFmt === fmt.id ? C.primary : C.textMuted} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: exportFmt === fmt.id ? C.text : C.textMuted, fontSize: 13, fontWeight: 600, margin: '0 0 2px', fontFamily: 'Plus Jakarta Sans' }}>{fmt.title}</p>
                <p style={{ color: C.textDim, fontSize: 10, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>{fmt.sub}</p>
              </div>
              {exportFmt === fmt.id && <Icon name="CheckCircle2" size={17} color={C.primary} />}
            </button>
          ))}
        </div>

        {/* Export Button */}
        <button onClick={() => { press('exp'); doExport(); }} onMouseDown={() => press('exp')} style={{
          width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
          background: exportDone
            ? `linear-gradient(135deg, ${C.teal}, #059669)`
            : `linear-gradient(135deg, ${C.primary}, ${C.pink})`,
          color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
          transform: pressedEl === 'exp' ? 'scale(0.97)' : 'scale(1)',
          transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: `0 10px 28px ${exportDone ? C.teal : C.primary}44`, marginBottom: 12,
        }}>
          <Icon name={exportDone ? 'Check' : 'Download'} size={18} color="#fff" />
          {exportDone ? 'Export Ready!' : `Export as ${exportFmt.toUpperCase()}`}
        </button>

        {/* Share shortcuts */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'link', icon: 'Link2', label: 'Copy Link' },
            { id: 'notion', icon: 'BookOpen', label: 'Notion' },
            { id: 'send', icon: 'Send', label: 'Send' },
          ].map(s => (
            <button key={s.id} style={{
              flex: 1, padding: '11px 0', background: C.card,
              border: `1px solid ${C.border}`, borderRadius: 12, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            }}>
              <Icon name={s.icon} size={17} color={C.textMuted} />
              <span style={{ fontSize: 10, color: C.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{s.label}</span>
            </button>
          ))}
        </div>
      </Screen>
    );
  };

  // ── PIN MODAL ──────────────────────────────────────────────────────────────
  const PinModal = () => !showPinModal ? null : (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'flex-end', zIndex: 200 }}>
      <div style={{ width: '100%', background: C.card, borderRadius: '22px 22px 0 0', padding: '16px 20px 44px', border: `1px solid ${C.border}` }}>
        <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: '0 auto 18px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Icon name="Pin" size={16} color={C.primary} sw={2} />
          <h3 style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>Pin this element</h3>
        </div>
        <p style={{ color: C.textMuted, fontSize: 12, margin: '0 0 14px', fontFamily: 'Plus Jakarta Sans', lineHeight: 1.5 }}>
          Add a label to capture exactly what this means to you — like "this warmth" or "calm but premium."
        </p>
        <input
          value={pinLabel}
          onChange={e => setPinLabel(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && confirmPin()}
          placeholder='e.g. "this texture exactly" or "warm but elevated"'
          autoFocus
          style={{
            width: '100%', padding: '12px 15px', background: C.elevated,
            border: `1.5px solid ${C.border}`, borderRadius: 12,
            color: C.text, fontSize: 13, fontFamily: 'Plus Jakarta Sans', outline: 'none',
            marginBottom: 12,
          }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowPinModal(null)} style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: `1px solid ${C.border}`, background: 'transparent', color: C.textMuted, fontSize: 13, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans' }}>
            Cancel
          </button>
          <button onClick={confirmPin} style={{
            flex: 2, padding: '12px 0', borderRadius: 12, border: 'none',
            background: pinLabel.trim() ? `linear-gradient(135deg, ${C.primary}, ${C.pink})` : C.elevated,
            color: pinLabel.trim() ? '#fff' : C.textDim, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
          }}>
            {pinLabel.trim() ? 'Pin with Label' : 'Remove Pin'}
          </button>
        </div>
      </div>
    </div>
  );

  // ── BOTTOM NAV ─────────────────────────────────────────────────────────────
  const NavBar = () => {
    const tabs = [
      { id: 'capture', icon: 'Wand2', label: 'Capture' },
      { id: 'board', icon: 'LayoutGrid', label: 'Board' },
      { id: 'gallery', icon: 'Grid', label: 'Gallery' },
      { id: 'export', icon: 'Share2', label: 'Export' },
    ];
    return (
      <div style={{ height: 70, background: C.surface, borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'stretch', padding: '0 4px', flexShrink: 0 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, background: 'transparent', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
            cursor: 'pointer', paddingBottom: 4,
          }}>
            <div style={{
              width: 42, height: 30, borderRadius: 11,
              background: activeTab === tab.id ? `${C.primary}22` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
              <Icon name={tab.icon} size={20} color={activeTab === tab.id ? C.primary : C.textDim} sw={activeTab === tab.id ? 2 : 1.6} />
            </div>
            <span style={{ fontSize: 9.5, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? C.primaryLight : C.textDim, fontFamily: 'Plus Jakarta Sans' }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    );
  };

  // ── STATUS BAR ─────────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0, position: 'relative' }}>
      <span style={{ color: C.text, fontSize: 13, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' }}>9:41</span>
      {/* Dynamic Island */}
      <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 118, height: 34, background: '#000', borderRadius: 20 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Icon name="Signal" size={13} color={C.text} sw={2} />
        <Icon name="Wifi" size={13} color={C.text} sw={2} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 24, height: 12, border: `1.5px solid ${C.text}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '1.5px 1.5px' }}>
            <div style={{ width: '72%', height: '100%', background: C.teal, borderRadius: 2 }} />
          </div>
          <div style={{ width: 3, height: 6, background: C.text, borderRadius: '0 1.5px 1.5px 0' }} />
        </div>
      </div>
    </div>
  );

  // ── RENDER ─────────────────────────────────────────────────────────────────
  const screens = {
    capture: CaptureScreen,
    board: BoardScreen,
    gallery: GalleryScreen,
    export: ExportScreen,
  };
  const CurrentScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#040310', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{
        width: 375, height: 812, background: C.bg, borderRadius: 52,
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 50px 130px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        <StatusBar />
        <CurrentScreen />
        <NavBar />
        <PinModal />
      </div>
    </div>
  );
}
