const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCard, setActiveCard] = useState(null);
  const [captureMode, setCaptureMode] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generatingBoard, setGeneratingBoard] = useState(false);
  const [boardGenerated, setBoardGenerated] = useState(false);
  const [activeBoard, setActiveBoard] = useState(null);
  const [sparkExpanded, setSparkExpanded] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [filterTag, setFilterTag] = useState('All');

  const colors = {
    bg: '#08080F',
    surface: '#101018',
    card: '#14141F',
    cardAlt: '#1A1A2A',
    border: '#2A2A3A',
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDim: 'rgba(139,92,246,0.15)',
    amber: '#F59E0B',
    amberDim: 'rgba(245,158,11,0.15)',
    cyan: '#06B6D4',
    cyanDim: 'rgba(6,182,212,0.12)',
    rose: '#F43F5E',
    roseDim: 'rgba(244,63,94,0.12)',
    emerald: '#10B981',
    emeraldDim: 'rgba(16,185,129,0.12)',
    text: '#F0EFFE',
    textMuted: '#7B7A8E',
    textDim: '#4A4A5E',
    white: '#FFFFFF',
  };

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
    body { margin: 0; background: #04040A; }
  `;

  const recordingRef = useRef(null);
  useEffect(() => {
    if (isRecording) {
      recordingRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      clearInterval(recordingRef.current);
      setRecordingTime(0);
    }
    return () => clearInterval(recordingRef.current);
  }, [isRecording]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const inspirationCards = [
    { id: 1, type: 'image', title: 'Neon Rain Reflections', time: '2h ago', tag: 'Tension', color: colors.primary, emoji: '🌆', mood: 'Electric', palette: ['#8B5CF6','#F43F5E','#1A1A2A'], desc: 'Street corner after rain — neon signs bleeding into puddles. Contrast of industrial cold and warm light.', theme: 'Urban Noir' },
    { id: 2, type: 'audio', title: 'Subway Rhythm Loop', time: '4h ago', tag: 'Pulse', color: colors.cyan, emoji: '🎵', mood: 'Kinetic', palette: ['#06B6D4','#8B5CF6','#101018'], desc: 'Underground percussion — wheels on track, announcement echo, crowd murmur building to a crescendo.', theme: 'Motion' },
    { id: 3, type: 'voice', title: 'Concept: Brand Voice', time: 'Yesterday', tag: 'Warmth', color: colors.amber, emoji: '🎤', mood: 'Intimate', palette: ['#F59E0B','#F97316','#14141F'], desc: '"Feels like a worn leather jacket — protective but broken-in. Not luxury, not rough. Honest."', theme: 'Identity' },
    { id: 4, type: 'image', title: 'Morning Market Texture', time: 'Yesterday', tag: 'Organic', color: colors.emerald, emoji: '🌿', mood: 'Grounded', palette: ['#10B981','#84CC16','#0A0A0F'], desc: 'Wooden crates, loose vegetables, hand-chalked signs. Imperfect and real. Saturday energy.', theme: 'Artisanal' },
    { id: 5, type: 'image', title: 'Glass Tower Shadow Grid', time: '2 days ago', tag: 'Geometry', color: '#EC4899', emoji: '🏙️', mood: 'Precise', palette: ['#EC4899','#8B5CF6','#14141F'], desc: 'Midday shadows from a glass facade forming a perfect grid on concrete. Clean, corporate, cold.', theme: 'Structure' },
    { id: 6, type: 'audio', title: 'Coffee Shop Ambience', time: '2 days ago', tag: 'Focus', color: colors.amber, emoji: '☕', mood: 'Contemplative', palette: ['#92400E','#F59E0B','#1A1A2A'], desc: 'Espresso machine hiss, low jazz, muffled conversation. Space for thinking.', theme: 'Ritual' },
    { id: 7, type: 'voice', title: 'Story Hook Draft', time: '3 days ago', tag: 'Narrative', color: colors.rose, emoji: '✍️', mood: 'Suspense', palette: ['#F43F5E','#FB923C','#08080F'], desc: '"She left the key under the door mat — not for me. For whoever came after."', theme: 'Fiction' },
  ];

  const boards = [
    { id: 1, name: 'Night City Campaign', cards: 3, status: 'Active', lastEdit: '1h ago', color: colors.primary, tags: ['Urban','Dark','Electric'], cover: ['🌆','🎵','🏙️'] },
    { id: 2, name: 'Autumn Brand Identity', cards: 5, status: 'Shared', lastEdit: 'Yesterday', color: colors.amber, tags: ['Warmth','Organic','Artisan'], cover: ['🍂','☕','🌿'] },
    { id: 3, name: 'Fiction Collection Vol.3', cards: 4, status: 'Draft', lastEdit: '3 days ago', color: colors.rose, tags: ['Narrative','Tension','Visual'], cover: ['✍️','🎤','🌆'] },
  ];

  const sparkCards = [
    { id: 1, title: 'Foggy Bridge at 6am', time: '3 weeks ago', reason: 'You captured fog visuals last month — this matches today\'s overcast sky', tag: 'Atmosphere', emoji: '🌉', color: colors.cyan },
    { id: 2, title: 'Rustic Market Voice Note', time: '6 weeks ago', reason: 'Spring farmers market is back. You tagged this "seasonal launch material"', tag: 'Seasonal', emoji: '🌾', color: colors.emerald },
    { id: 3, title: 'Metro Station Echo Loop', time: '2 months ago', reason: 'Similar to the Subway Rhythm you captured today — potential companion piece', tag: 'Sound', emoji: '🚇', color: colors.primary },
    { id: 4, title: '"Cities breathe at night…"', time: '10 weeks ago', reason: 'Your Night City board needs a narrative anchor. This voice note fits', tag: 'Writing', emoji: '🌃', color: colors.rose },
  ];

  const collabBoards = [
    { id: 1, name: 'Spring Launch — Verdant Co.', team: ['M','A','L'], role: 'Editor', cards: 12, activity: '2h ago', color: colors.emerald },
    { id: 2, name: 'Podcast Visuals — Static Wave', team: ['J','K'], role: 'Viewer', cards: 8, activity: 'Yesterday', color: colors.cyan },
  ];

  const tags = ['All', 'Tension', 'Pulse', 'Warmth', 'Organic', 'Geometry', 'Focus', 'Narrative'];

  const filteredCards = filterTag === 'All' ? inspirationCards : inspirationCards.filter(c => c.tag === filterTag);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.94)' : 'scale(1)',
    transition: 'transform 0.12s ease, opacity 0.12s ease',
    cursor: 'pointer',
  });

  const typeIcon = (type) => {
    if (type === 'image') return window.lucide.Image;
    if (type === 'audio') return window.lucide.Music;
    if (type === 'voice') return window.lucide.Mic;
    return window.lucide.File;
  };

  // ─── SCREENS ──────────────────────────────────────────────────────────────

  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', marginBottom: 4 }}>SATURDAY, MAR 21</div>
            <div style={{ color: colors.text, fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>Your Echo</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingTop: 4 }}>
            <div onClick={() => handlePress('search')} style={btnStyle('search', { width: 36, height: 36, borderRadius: 12, background: colors.card, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
              {React.createElement(window.lucide.Search, { size: 16, color: colors.textMuted })}
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${colors.primary}, #EC4899)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>M</div>
          </div>
        </div>
        <div style={{ color: colors.textMuted, fontSize: 13, fontWeight: 400, marginTop: 4 }}>
          <span style={{ color: colors.primaryLight }}>7 captures</span> this week · <span style={{ color: colors.amber }}>2 boards in progress</span>
        </div>
      </div>

      {/* Quick Capture Strip */}
      <div style={{ padding: '16px 20px 4px', display: 'flex', gap: 8 }}>
        {[
          { icon: window.lucide.Camera, label: 'Photo', color: colors.primary, mode: 'photo' },
          { icon: window.lucide.Mic, label: 'Voice', color: colors.rose, mode: 'voice' },
          { icon: window.lucide.Music2, label: 'Sound', color: colors.cyan, mode: 'audio' },
          { icon: window.lucide.MapPin, label: 'Place', color: colors.emerald, mode: 'place' },
        ].map(item => (
          <div key={item.mode} onClick={() => { setActiveTab('capture'); setCaptureMode(item.mode); }} style={btnStyle(`qc-${item.mode}`, {
            flex: 1, background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14,
            padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5
          })}>
            {React.createElement(item.icon, { size: 18, color: item.color })}
            <span style={{ color: colors.textMuted, fontSize: 10, fontWeight: 600 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Filter Tags */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 20px 4px', overflowX: 'auto' }}>
        {tags.map(t => (
          <div key={t} onClick={() => setFilterTag(t)} style={btnStyle(`tag-${t}`, {
            flexShrink: 0, padding: '5px 12px', borderRadius: 20,
            background: filterTag === t ? colors.primary : colors.card,
            border: `1px solid ${filterTag === t ? colors.primary : colors.border}`,
            color: filterTag === t ? colors.white : colors.textMuted,
            fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap'
          })}>
            {t}
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      <div style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredCards.map(card => {
          const Icon = typeIcon(card.type);
          const isSelected = selectedCards.includes(card.id);
          return (
            <div key={card.id} onClick={() => {
              if (selectedCards.length > 0) {
                setSelectedCards(s => s.includes(card.id) ? s.filter(x => x !== card.id) : [...s, card.id]);
              } else {
                setActiveCard(card);
              }
            }}
            onContextMenu={(e) => { e.preventDefault(); setSelectedCards(s => [...s, card.id]); }}
            style={btnStyle(`card-${card.id}`, {
              background: colors.card, borderRadius: 18, overflow: 'hidden',
              border: `1px solid ${isSelected ? card.color : colors.border}`,
              boxShadow: isSelected ? `0 0 0 2px ${card.color}40` : 'none',
            })}>
              {/* Card visual header */}
              <div style={{ height: 80, background: `linear-gradient(135deg, ${card.color}22, ${card.palette[1]}22)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {card.palette.map((c, i) => (
                    <div key={i} style={{ width: 20, height: 20, borderRadius: 6, background: c, border: `1px solid rgba(255,255,255,0.1)` }} />
                  ))}
                </div>
                <div style={{ fontSize: 36 }}>{card.emoji}</div>
                <div style={{ position: 'absolute', top: 10, left: 14, background: `${card.color}30`, borderRadius: 8, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(Icon, { size: 10, color: card.color })}
                  <span style={{ color: card.color, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{card.type}</span>
                </div>
                {isSelected && (
                  <div style={{ position: 'absolute', top: 10, right: 12, width: 22, height: 22, borderRadius: '50%', background: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(window.lucide.Check, { size: 12, color: '#fff' })}
                  </div>
                )}
              </div>
              {/* Card content */}
              <div style={{ padding: '12px 16px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ color: colors.text, fontSize: 15, fontWeight: 700, lineHeight: 1.2, flex: 1, paddingRight: 8 }}>{card.title}</div>
                  <div style={{ color: colors.textMuted, fontSize: 11, whiteSpace: 'nowrap', paddingTop: 2 }}>{card.time}</div>
                </div>
                <div style={{ color: colors.textMuted, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{card.desc.substring(0, 80)}…</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ background: `${card.color}20`, borderRadius: 8, padding: '3px 9px' }}>
                    <span style={{ color: card.color, fontSize: 11, fontWeight: 700 }}>#{card.tag}</span>
                  </div>
                  <div style={{ background: colors.cardAlt, borderRadius: 8, padding: '3px 9px' }}>
                    <span style={{ color: colors.textMuted, fontSize: 11 }}>{card.theme}</span>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                    {React.createElement(window.lucide.Heart, { size: 14, color: colors.textDim })}
                    {React.createElement(window.lucide.Share2, { size: 14, color: colors.textDim })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Board CTA (when cards selected) */}
      {selectedCards.length >= 2 && (
        <div style={{ position: 'sticky', bottom: 0, padding: '12px 20px', background: `linear-gradient(to top, ${colors.bg} 60%, transparent)` }}>
          <div onClick={() => { handlePress('gen'); setShowGenerateModal(true); }} style={btnStyle('gen', {
            background: `linear-gradient(135deg, ${colors.primary}, #EC4899)`, borderRadius: 16,
            padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          })}>
            {React.createElement(window.lucide.Wand2, { size: 18, color: '#fff' })}
            <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Generate Board from {selectedCards.length} Cards</span>
          </div>
        </div>
      )}
    </div>
  );

  const CaptureScreen = () => {
    const modes = [
      { id: 'photo', icon: window.lucide.Camera, label: 'Photo', color: colors.primary, desc: 'Snap a visual moment' },
      { id: 'voice', icon: window.lucide.Mic, label: 'Voice', color: colors.rose, desc: 'Record a voice note' },
      { id: 'audio', icon: window.lucide.Music2, label: 'Ambient', color: colors.cyan, desc: 'Capture surrounding sound' },
      { id: 'place', icon: window.lucide.MapPin, label: 'Place', color: colors.emerald, desc: 'Tag your location' },
    ];

    const moodTags = ['Tension', 'Warmth', 'Pulse', 'Organic', 'Geometry', 'Quiet', 'Electric', 'Melancholy', 'Euphoria', 'Focus'];
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [captureTitle, setCaptureTitle] = useState('');
    const [saved, setSaved] = useState(false);

    const activeModeData = modes.find(m => m.id === captureMode) || modes[0];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 3 }}>CAPTURE</div>
            <div style={{ color: colors.text, fontSize: 22, fontWeight: 800 }}>New Echo</div>
          </div>
          {React.createElement(window.lucide.Sparkles, { size: 22, color: colors.amber })}
        </div>

        {/* Mode Selector */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 8 }}>
          {modes.map(m => (
            <div key={m.id} onClick={() => { setCaptureMode(m.id); setIsRecording(false); }} style={btnStyle(`mode-${m.id}`, {
              flex: 1, background: captureMode === m.id ? `${m.color}20` : colors.card,
              border: `1px solid ${captureMode === m.id ? m.color : colors.border}`,
              borderRadius: 14, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5
            })}>
              {React.createElement(m.icon, { size: 18, color: captureMode === m.id ? m.color : colors.textMuted })}
              <span style={{ fontSize: 10, fontWeight: 600, color: captureMode === m.id ? m.color : colors.textMuted }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Capture Area */}
        <div style={{ margin: '0 20px', borderRadius: 20, overflow: 'hidden', border: `1px solid ${colors.border}`, marginBottom: 16 }}>
          {captureMode === 'photo' && (
            <div style={{ height: 220, background: `linear-gradient(135deg, #1A1A2E, #16213E)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr' }}>
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} style={{ border: `0.5px solid rgba(255,255,255,0.06)` }} />
                ))}
              </div>
              {React.createElement(window.lucide.Camera, { size: 40, color: `${colors.primary}80` })}
              <span style={{ color: colors.textMuted, fontSize: 13 }}>Tap to open camera</span>
              <div style={{ position: 'absolute', bottom: 14, right: 14, background: `${colors.primary}30`, borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                {React.createElement(window.lucide.Layers, { size: 12, color: colors.primaryLight })}
                <span style={{ color: colors.primaryLight, fontSize: 11, fontWeight: 600 }}>AI Analysis On</span>
              </div>
            </div>
          )}
          {(captureMode === 'voice' || captureMode === 'audio') && (
            <div style={{ height: 220, background: `linear-gradient(135deg, #0D0D1A, #1A0D1A)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative' }}>
              {isRecording ? (
                <>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 50 }}>
                    {Array(20).fill(0).map((_, i) => (
                      <div key={i} style={{
                        width: 3, borderRadius: 2,
                        height: `${20 + Math.sin(i * 0.8 + recordingTime * 0.5) * 15 + Math.random() * 10}px`,
                        background: captureMode === 'voice' ? colors.rose : colors.cyan,
                        opacity: 0.8, transition: 'height 0.15s ease'
                      }} />
                    ))}
                  </div>
                  <div style={{ color: colors.text, fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatTime(recordingTime)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.rose, animation: 'pulse 1s infinite' }} />
                    <span style={{ color: colors.rose, fontSize: 12, fontWeight: 600 }}>RECORDING</span>
                  </div>
                </>
              ) : (
                <>
                  {React.createElement(captureMode === 'voice' ? window.lucide.Mic : window.lucide.Music2, { size: 40, color: `${captureMode === 'voice' ? colors.rose : colors.cyan}80` })}
                  <span style={{ color: colors.textMuted, fontSize: 13 }}>Press record to begin</span>
                </>
              )}
            </div>
          )}
          {captureMode === 'place' && (
            <div style={{ height: 220, background: `linear-gradient(135deg, #0A1F0A, #0A1020)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              {React.createElement(window.lucide.MapPin, { size: 40, color: `${colors.emerald}80` })}
              <span style={{ color: colors.text, fontSize: 14, fontWeight: 600 }}>Chinatown, San Francisco</span>
              <span style={{ color: colors.textMuted, fontSize: 12 }}>37.7905° N, 122.4063° W</span>
              <div style={{ background: `${colors.emerald}20`, borderRadius: 10, padding: '5px 12px', marginTop: 4 }}>
                <span style={{ color: colors.emerald, fontSize: 11, fontWeight: 600 }}>Saturday 11:42 AM · Mostly Cloudy</span>
              </div>
            </div>
          )}
          {/* Action Row */}
          <div style={{ background: colors.card, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            {(captureMode === 'voice' || captureMode === 'audio') && (
              <div onClick={() => setIsRecording(r => !r)} style={btnStyle('rec-btn', {
                width: 56, height: 56, borderRadius: '50%', background: isRecording ? colors.rose : `${activeModeData.color}20`,
                border: `2px solid ${isRecording ? colors.rose : activeModeData.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              })}>
                {React.createElement(isRecording ? window.lucide.Square : window.lucide.Mic, { size: 22, color: isRecording ? '#fff' : activeModeData.color })}
              </div>
            )}
            {captureMode === 'photo' && (
              <div style={btnStyle('cam-btn', {
                width: 64, height: 64, borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.primary}, #EC4899)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 20px ${colors.primary}50`
              })}>
                {React.createElement(window.lucide.Camera, { size: 26, color: '#fff' })}
              </div>
            )}
            {captureMode === 'place' && (
              <div style={btnStyle('pin-btn', {
                width: 56, height: 56, borderRadius: '50%', background: `${colors.emerald}20`,
                border: `2px solid ${colors.emerald}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              })}>
                {React.createElement(window.lucide.Check, { size: 22, color: colors.emerald })}
              </div>
            )}
          </div>
        </div>

        {/* Mood Tags */}
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: '0.06em' }}>TAG THE MOOD</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {moodTags.map(m => (
              <div key={m} onClick={() => setSelectedMoods(s => s.includes(m) ? s.filter(x => x !== m) : [...s, m])} style={btnStyle(`mood-${m}`, {
                padding: '5px 12px', borderRadius: 20,
                background: selectedMoods.includes(m) ? `${colors.primary}25` : colors.card,
                border: `1px solid ${selectedMoods.includes(m) ? colors.primary : colors.border}`,
                color: selectedMoods.includes(m) ? colors.primaryLight : colors.textMuted,
                fontSize: 12, fontWeight: 600
              })}>
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Add to Board */}
        {!saved ? (
          <div style={{ padding: '0 20px' }}>
            <div onClick={() => { handlePress('save'); setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={btnStyle('save', {
              background: `linear-gradient(135deg, ${colors.primary}, #A855F7)`,
              borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            })}>
              {React.createElement(window.lucide.Plus, { size: 18, color: '#fff' })}
              <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Save Echo</span>
            </div>
          </div>
        ) : (
          <div style={{ padding: '0 20px' }}>
            <div style={{ background: `${colors.emerald}20`, border: `1px solid ${colors.emerald}`, borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {React.createElement(window.lucide.CheckCircle2, { size: 18, color: colors.emerald })}
              <span style={{ color: colors.emerald, fontSize: 15, fontWeight: 700 }}>Echo Saved!</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BoardsScreen = () => {
    const boardDetail = boards.find(b => b.id === activeBoard);

    if (activeBoard && boardDetail) {
      const boardCards = inspirationCards.slice(0, boardDetail.cards);
      return (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
          {/* Board Header */}
          <div style={{ padding: '16px 20px 0' }}>
            <div onClick={() => setActiveBoard(null)} style={btnStyle('back', { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 })}>
              {React.createElement(window.lucide.ChevronLeft, { size: 20, color: colors.textMuted })}
              <span style={{ color: colors.textMuted, fontSize: 13, fontWeight: 600 }}>Boards</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: colors.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{boardDetail.name}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {boardDetail.tags.map(t => (
                    <div key={t} style={{ background: `${boardDetail.color}20`, borderRadius: 8, padding: '3px 8px' }}>
                      <span style={{ color: boardDetail.color, fontSize: 11, fontWeight: 600 }}>#{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {React.createElement(window.lucide.Share2, { size: 18, color: colors.textMuted })}
                {React.createElement(window.lucide.MoreHorizontal, { size: 18, color: colors.textMuted })}
              </div>
            </div>
          </div>

          {/* Generated Concept */}
          <div style={{ margin: '16px 20px', borderRadius: 18, background: `linear-gradient(135deg, ${boardDetail.color}18, ${boardDetail.color}08)`, border: `1px solid ${boardDetail.color}40`, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
              {React.createElement(window.lucide.Wand2, { size: 14, color: boardDetail.color })}
              <span style={{ color: boardDetail.color, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em' }}>AI CONCEPT</span>
            </div>
            <div style={{ color: colors.text, fontSize: 14, fontWeight: 600, lineHeight: 1.5, marginBottom: 10 }}>
              {boardDetail.id === 1 && '"A campaign built on the electricity of city-after-dark — neon persistence against institutional grey. The tension is the message."'}
              {boardDetail.id === 2 && '"Warmth without nostalgia. The brand lives in the honest imperfection of handmade things — texture over polish, presence over perfection."'}
              {boardDetail.id === 3 && '"Stories about the moments between decisions — not the choices themselves, but the held breath before them."'}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div onClick={() => handlePress('edit-concept')} style={btnStyle('edit-concept', { flex: 1, background: `${boardDetail.color}20`, borderRadius: 10, padding: '8px 12px', textAlign: 'center' })}>
                <span style={{ color: boardDetail.color, fontSize: 12, fontWeight: 700 }}>Edit</span>
              </div>
              <div onClick={() => handlePress('export-concept')} style={btnStyle('export-concept', { flex: 1, background: `${boardDetail.color}20`, borderRadius: 10, padding: '8px 12px', textAlign: 'center' })}>
                <span style={{ color: boardDetail.color, fontSize: 12, fontWeight: 700 }}>Export</span>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div style={{ padding: '0 20px 14px' }}>
            <div style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>EXTRACTED PALETTE</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {boardCards.flatMap(c => c.palette).slice(0, 7).map((c, i) => (
                <div key={i} style={{ flex: 1, height: 40, borderRadius: 10, background: c, border: '1px solid rgba(255,255,255,0.08)' }} />
              ))}
            </div>
          </div>

          {/* Source Cards */}
          <div style={{ padding: '0 20px' }}>
            <div style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 10 }}>SOURCE ECHOES</div>
            {boardCards.map(card => {
              const Icon = typeIcon(card.type);
              return (
                <div key={card.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${colors.border}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${card.color}20`, border: `1px solid ${card.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>{card.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{card.title}</div>
                    <div style={{ color: colors.textMuted, fontSize: 11 }}>{card.desc.substring(0, 55)}…</div>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    {React.createElement(Icon, { size: 14, color: card.color })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Writing Prompt */}
          <div style={{ margin: '14px 20px 0', borderRadius: 16, background: colors.card, border: `1px solid ${colors.border}`, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
              {React.createElement(window.lucide.PenLine, { size: 13, color: colors.amber })}
              <span style={{ color: colors.amber, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em' }}>WRITING PROMPT</span>
            </div>
            <div style={{ color: colors.text, fontSize: 13, lineHeight: 1.6 }}>
              {boardDetail.id === 1 && 'Describe a city that never fully sleeps — but never fully wakes either. What does the light look like at 3am?'}
              {boardDetail.id === 2 && 'Write about a product that has been repaired so many times it has a different personality than when it was new.'}
              {boardDetail.id === 3 && 'Write a first chapter that ends on the line: "She didn\'t decide. The decision made itself."'}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 3 }}>CREATIVE STUDIO</div>
            <div style={{ color: colors.text, fontSize: 26, fontWeight: 800 }}>Boards</div>
          </div>
          <div onClick={() => handlePress('new-board')} style={btnStyle('new-board', { background: colors.primary, borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 })}>
            {React.createElement(window.lucide.Plus, { size: 15, color: '#fff' })}
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>New</span>
          </div>
        </div>

        {/* My Boards */}
        <div style={{ padding: '0 20px 8px' }}>
          <div style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>MY BOARDS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {boards.map(board => (
              <div key={board.id} onClick={() => { handlePress(`board-${board.id}`); setActiveBoard(board.id); }} style={btnStyle(`board-${board.id}`, {
                background: colors.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${colors.border}`
              })}>
                <div style={{ height: 70, background: `linear-gradient(135deg, ${board.color}22, ${board.color}08)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
                  <div style={{ display: 'flex', gap: 10, fontSize: 26 }}>
                    {board.cover.map((e, i) => <span key={i}>{e}</span>)}
                  </div>
                  <div style={{ background: board.status === 'Active' ? `${board.color}30` : board.status === 'Shared' ? `${colors.cyan}30` : `${colors.textDim}30`, borderRadius: 8, padding: '4px 10px' }}>
                    <span style={{ color: board.status === 'Active' ? board.color : board.status === 'Shared' ? colors.cyan : colors.textMuted, fontSize: 11, fontWeight: 700 }}>{board.status}</span>
                  </div>
                </div>
                <div style={{ padding: '12px 18px 14px' }}>
                  <div style={{ color: colors.text, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{board.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ color: colors.textMuted, fontSize: 12 }}>{board.cards} echoes</span>
                      <span style={{ color: colors.textDim, fontSize: 12 }}>·</span>
                      <span style={{ color: colors.textMuted, fontSize: 12 }}>Edited {board.lastEdit}</span>
                    </div>
                    {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textDim })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collab Boards */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>SHARED WITH YOU</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {collabBoards.map(board => (
              <div key={board.id} onClick={() => handlePress(`cb-${board.id}`)} style={btnStyle(`cb-${board.id}`, {
                background: colors.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 14
              })}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${board.color}20`, border: `1px solid ${board.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide.Users, { size: 18, color: board.color })}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: colors.text, fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{board.name}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: -4 }}>
                      {board.team.map((m, i) => (
                        <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: `hsl(${i * 60 + 200}, 60%, 50%)`, border: `1px solid ${colors.card}`, marginLeft: i > 0 ? -5 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{m}</div>
                      ))}
                    </div>
                    <span style={{ color: colors.textMuted, fontSize: 11 }}>{board.cards} echoes · {board.activity}</span>
                  </div>
                </div>
                <div style={{ background: `${board.color}20`, borderRadius: 8, padding: '3px 8px' }}>
                  <span style={{ color: board.color, fontSize: 10, fontWeight: 700 }}>{board.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SparkScreen = () => {
    const [sparkMode, setSparkMode] = useState('today');
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 12px' }}>
          <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 3 }}>DAILY RITUAL</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: colors.text, fontSize: 26, fontWeight: 800 }}>Spark Trail</div>
            {React.createElement(window.lucide.Flame, { size: 22, color: colors.amber })}
          </div>
          <div style={{ color: colors.textMuted, fontSize: 13, marginTop: 4 }}>Forgotten echoes, resurfaced at the right time.</div>
        </div>

        {/* Today's Context Card */}
        <div style={{ margin: '0 20px 16px', borderRadius: 18, background: `linear-gradient(135deg, ${colors.amber}15, ${colors.primary}10)`, border: `1px solid ${colors.amber}35`, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {React.createElement(window.lucide.Sun, { size: 14, color: colors.amber })}
            <span style={{ color: colors.amber, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em' }}>TODAY'S CONTEXT</span>
          </div>
          <div style={{ color: colors.text, fontSize: 14, fontWeight: 600, lineHeight: 1.5, marginBottom: 10 }}>
            Overcast Saturday · You're near Chinatown · You have a boards draft in progress.
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#Urban', '#Atmosphere', '#Saturdays'].map(t => (
              <div key={t} style={{ background: `${colors.amber}20`, borderRadius: 8, padding: '3px 8px' }}>
                <span style={{ color: colors.amber, fontSize: 11, fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Toggle */}
        <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
          {['today', 'week', 'archive'].map(m => (
            <div key={m} onClick={() => setSparkMode(m)} style={btnStyle(`sm-${m}`, {
              flex: 1, padding: '8px 0', borderRadius: 12, textAlign: 'center',
              background: sparkMode === m ? colors.primary : colors.card,
              border: `1px solid ${sparkMode === m ? colors.primary : colors.border}`
            })}>
              <span style={{ color: sparkMode === m ? '#fff' : colors.textMuted, fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{m}</span>
            </div>
          ))}
        </div>

        {/* Spark Cards */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sparkCards.map(card => {
            const expanded = sparkExpanded === card.id;
            return (
              <div key={card.id} onClick={() => setSparkExpanded(expanded ? null : card.id)} style={btnStyle(`spark-${card.id}`, {
                background: colors.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${expanded ? card.color : colors.border}`,
                transition: 'border-color 0.2s ease'
              })}>
                <div style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `${card.color}20`, border: `1px solid ${card.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>{card.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: colors.text, fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{card.title}</div>
                    <div style={{ color: colors.textMuted, fontSize: 11, marginBottom: 6 }}>Captured {card.time}</div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                      {React.createElement(window.lucide.Sparkles, { size: 11, color: colors.amber, style: { flexShrink: 0, marginTop: 1 } })}
                      <span style={{ color: colors.textMuted, fontSize: 11, lineHeight: 1.4 }}>{card.reason}</span>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, transition: 'transform 0.2s ease', transform: expanded ? 'rotate(180deg)' : 'none' }}>
                    {React.createElement(window.lucide.ChevronDown, { size: 16, color: colors.textDim })}
                  </div>
                </div>
                {expanded && (
                  <div style={{ padding: '0 16px 14px', borderTop: `1px solid ${colors.border}` }}>
                    <div style={{ paddingTop: 12, display: 'flex', gap: 8 }}>
                      <div onClick={(e) => { e.stopPropagation(); handlePress(`spark-add-${card.id}`); }} style={btnStyle(`spark-add-${card.id}`, {
                        flex: 1, background: `${card.color}20`, border: `1px solid ${card.color}40`, borderRadius: 12, padding: '9px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                      })}>
                        {React.createElement(window.lucide.Plus, { size: 13, color: card.color })}
                        <span style={{ color: card.color, fontSize: 12, fontWeight: 700 }}>Add to Board</span>
                      </div>
                      <div onClick={(e) => { e.stopPropagation(); handlePress(`spark-view-${card.id}`); }} style={btnStyle(`spark-view-${card.id}`, {
                        flex: 1, background: colors.cardAlt, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '9px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                      })}>
                        {React.createElement(window.lucide.Eye, { size: 13, color: colors.textMuted })}
                        <span style={{ color: colors.textMuted, fontSize: 12, fontWeight: 700 }}>View Echo</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Streak */}
        <div style={{ margin: '16px 20px 0', borderRadius: 16, background: colors.card, border: `1px solid ${colors.border}`, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: `${colors.amber}20`, border: `1px solid ${colors.amber}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 22 }}>🔥</span>
          </div>
          <div>
            <div style={{ color: colors.text, fontSize: 16, fontWeight: 800 }}>11-day streak</div>
            <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>You've reviewed your Spark Trail 11 days in a row</div>
          </div>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    const [notifOn, setNotifOn] = useState(true);
    const [aiTagOn, setAiTagOn] = useState(true);
    const stats = [
      { label: 'Echoes', value: '127', icon: window.lucide.Layers, color: colors.primary },
      { label: 'Boards', value: '14', icon: window.lucide.LayoutGrid, color: colors.amber },
      { label: 'Sparks Used', value: '38', icon: window.lucide.Flame, color: colors.rose },
      { label: 'Day Streak', value: '11', icon: window.lucide.Zap, color: colors.emerald },
    ];
    const Toggle = ({ on, onToggle }) => (
      <div onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: on ? colors.primary : colors.border, position: 'relative', transition: 'background 0.2s ease', cursor: 'pointer', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: on ? 22 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s ease' }} />
      </div>
    );
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {/* Profile Hero */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(135deg, ${colors.primary}, #EC4899)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: '#fff' }}>M</div>
            <div>
              <div style={{ color: colors.text, fontSize: 20, fontWeight: 800 }}>Maya Ortega</div>
              <div style={{ color: colors.textMuted, fontSize: 13, marginTop: 2 }}>Writer · Designer · San Francisco</div>
              <div style={{ marginTop: 5, background: `${colors.primary}20`, borderRadius: 8, padding: '2px 8px', display: 'inline-block' }}>
                <span style={{ color: colors.primaryLight, fontSize: 11, fontWeight: 700 }}>Pro · echoes.maya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: colors.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                {React.createElement(s.icon, { size: 16, color: s.color })}
              </div>
              <div style={{ color: colors.text, fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Top Themes */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 10 }}>YOUR TOP THEMES</div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {[{ t: 'Urban Noir', w: 28, c: colors.primary }, { t: 'Organic', w: 22, c: colors.emerald }, { t: 'Tension', w: 18, c: colors.rose }, { t: 'Narrative', w: 14, c: colors.amber }, { t: 'Motion', w: 10, c: colors.cyan }].map(item => (
              <div key={item.t} style={{ padding: '5px 12px', borderRadius: 20, background: `${item.c}15`, border: `1px solid ${item.c}40` }}>
                <span style={{ color: item.c, fontSize: 12, fontWeight: 600 }}>{item.t}</span>
                <span style={{ color: `${item.c}80`, fontSize: 11, marginLeft: 4 }}>{item.w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ color: colors.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 10 }}>SETTINGS</div>
          <div style={{ background: colors.card, borderRadius: 18, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            {[
              { label: 'Daily Spark Notifications', sub: '9am · Based on your context', toggle: notifOn, onToggle: () => setNotifOn(n => !n), icon: window.lucide.Bell, color: colors.amber },
              { label: 'AI Auto-Tagging', sub: 'Automatically analyze mood and theme', toggle: aiTagOn, onToggle: () => setAiTagOn(n => !n), icon: window.lucide.Sparkles, color: colors.primary },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < 1 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(item.icon, { size: 16, color: item.color })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: colors.text, fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ color: colors.textMuted, fontSize: 11, marginTop: 1 }}>{item.sub}</div>
                </div>
                <Toggle on={item.toggle} onToggle={item.onToggle} />
              </div>
            ))}
            {[
              { label: 'Export All Echoes', icon: window.lucide.Download, color: colors.cyan },
              { label: 'Manage Subscription', icon: window.lucide.CreditCard, color: colors.emerald },
              { label: 'Privacy & Data', icon: window.lucide.Shield, color: colors.textMuted },
            ].map((item, i) => (
              <div key={i} onClick={() => handlePress(`setting-${i}`)} style={btnStyle(`setting-${i}`, { padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${colors.border}` })}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: colors.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(item.icon, { size: 16, color: item.color })}
                </div>
                <div style={{ flex: 1, color: colors.text, fontSize: 14, fontWeight: 500 }}>{item.label}</div>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textDim })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── CARD DETAIL MODAL ────────────────────────────────────────────────────

  const CardModal = () => {
    if (!activeCard) return null;
    const card = activeCard;
    const Icon = typeIcon(card.type);
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={() => setActiveCard(null)}>
        <div onClick={e => e.stopPropagation()} style={{ background: colors.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 36px', maxHeight: '80%', overflowY: 'auto' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: colors.border, margin: '0 auto 20px' }} />
          <div style={{ height: 120, borderRadius: 16, background: `linear-gradient(135deg, ${card.color}25, ${card.palette[1]}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 50, position: 'relative' }}>
            {card.emoji}
            <div style={{ position: 'absolute', top: 12, left: 14, background: `${card.color}30`, borderRadius: 8, padding: '3px 8px', display: 'flex', gap: 5, alignItems: 'center' }}>
              {React.createElement(Icon, { size: 11, color: card.color })}
              <span style={{ color: card.color, fontSize: 11, fontWeight: 700 }}>{card.type.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ color: colors.text, fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{card.title}</div>
          <div style={{ color: colors.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{card.desc}</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {card.palette.map((c, i) => <div key={i} style={{ width: 32, height: 32, borderRadius: 10, background: c }} />)}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Add to Board', icon: window.lucide.LayoutGrid, color: colors.primary },
              { label: 'Generate', icon: window.lucide.Wand2, color: colors.amber },
              { label: 'Share', icon: window.lucide.Share2, color: colors.cyan },
            ].map(action => (
              <div key={action.label} onClick={() => { handlePress(action.label); if (action.label === 'Generate') { setActiveCard(null); setShowGenerateModal(true); setSelectedCards([card.id]); } }} style={btnStyle(action.label, { flex: 1, background: `${action.color}15`, border: `1px solid ${action.color}40`, borderRadius: 12, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 })}>
                {React.createElement(action.icon, { size: 15, color: action.color })}
                <span style={{ color: action.color, fontSize: 11, fontWeight: 700 }}>{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── GENERATE MODAL ───────────────────────────────────────────────────────

  const GenerateModal = () => {
    if (!showGenerateModal) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ background: colors.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 40px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: colors.border, margin: '0 auto 20px' }} />
          {!boardGenerated ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ color: colors.text, fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Generate Creative Output</div>
                <div style={{ color: colors.textMuted, fontSize: 13 }}>From {selectedCards.length} selected echo{selectedCards.length > 1 ? 's' : ''}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'Mood Board', desc: 'Visual layout with palette and imagery', icon: window.lucide.LayoutGrid, color: colors.primary },
                  { label: 'Creative Brief', desc: 'Structured concept outline for campaigns', icon: window.lucide.FileText, color: colors.amber },
                  { label: 'Writing Prompts', desc: '3 story or copy starting points', icon: window.lucide.PenLine, color: colors.rose },
                  { label: 'Color Palette', desc: 'Extracted and harmonized colors', icon: window.lucide.Palette, color: colors.cyan },
                ].map(item => (
                  <div key={item.label} onClick={() => { handlePress(`gen-${item.label}`); setGeneratingBoard(true); setTimeout(() => { setGeneratingBoard(false); setBoardGenerated(true); }, 1800); }} style={btnStyle(`gen-${item.label}`, { background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' })}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {React.createElement(item.icon, { size: 18, color: item.color })}
                    </div>
                    <div>
                      <div style={{ color: colors.text, fontSize: 14, fontWeight: 700 }}>{item.label}</div>
                      <div style={{ color: colors.textMuted, fontSize: 12 }}>{item.desc}</div>
                    </div>
                    {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textDim, style: { marginLeft: 'auto' } })}
                  </div>
                ))}
              </div>
              <div onClick={() => { setShowGenerateModal(false); setSelectedCards([]); }} style={{ padding: '12px', textAlign: 'center' }}>
                <span style={{ color: colors.textMuted, fontSize: 14 }}>Cancel</span>
              </div>
            </>
          ) : generatingBoard ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: 50, marginBottom: 16 }}>✨</div>
              <div style={{ color: colors.text, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Crafting your board…</div>
              <div style={{ color: colors.textMuted, fontSize: 13 }}>Analyzing themes, extracting palette, generating prompts</div>
              <div style={{ marginTop: 20, height: 3, background: colors.border, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '60%', background: `linear-gradient(90deg, ${colors.primary}, #EC4899)`, borderRadius: 2, animation: 'none' }} />
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>🎨</div>
              <div style={{ color: colors.text, fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Board Created!</div>
              <div style={{ color: colors.textMuted, fontSize: 13, marginBottom: 20 }}>Your new mood board is ready to explore</div>
              <div onClick={() => { setShowGenerateModal(false); setBoardGenerated(false); setSelectedCards([]); setActiveTab('boards'); }} style={{ background: `linear-gradient(135deg, ${colors.primary}, #EC4899)`, borderRadius: 14, padding: '14px', marginBottom: 10 }}>
                <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>View Board</span>
              </div>
              <div onClick={() => { setShowGenerateModal(false); setBoardGenerated(false); setSelectedCards([]); }} style={{ padding: '10px' }}>
                <span style={{ color: colors.textMuted, fontSize: 14 }}>Done</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── NAV TABS ─────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'home', icon: window.lucide.Home, label: 'Echo' },
    { id: 'capture', icon: window.lucide.Plus, label: 'Capture', special: true },
    { id: 'boards', icon: window.lucide.LayoutGrid, label: 'Boards' },
    { id: 'spark', icon: window.lucide.Flame, label: 'Spark' },
    { id: 'profile', icon: window.lucide.User, label: 'Me' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'capture': return <CaptureScreen />;
      case 'boards': return <BoardsScreen />;
      case 'spark': return <SparkScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#04040A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif", padding: '20px 0' }}>
      <style>{fontStyle}</style>
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', marginRight: 6 }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0a3a0a' }} />
        </div>

        {/* Status Bar */}
        <div style={{ height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 8px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
          <span style={{ color: colors.text, fontSize: 13, fontWeight: 700 }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: colors.text })}
            {React.createElement(window.lucide.Signal, { size: 14, color: colors.text })}
            <div style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${colors.text}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '75%', height: '100%', background: colors.text, borderRadius: 1 }} />
              </div>
              <div style={{ width: 2, height: 5, background: colors.text, borderRadius: 1, marginLeft: 1 }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {renderScreen()}
          <CardModal />
          <GenerateModal />
        </div>

        {/* Bottom Nav */}
        <div style={{ height: 78, background: colors.surface, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around', padding: '12px 10px 0', flexShrink: 0, position: 'relative', zIndex: 10 }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            if (tab.special) {
              return (
                <div key={tab.id} onClick={() => { setActiveTab(tab.id); handlePress('nav-capture'); setCaptureMode('photo'); }} style={btnStyle('nav-capture', { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 50 })}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: `linear-gradient(135deg, ${colors.primary}, #EC4899)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -20, boxShadow: `0 4px 20px ${colors.primary}60` }}>
                    {React.createElement(tab.icon, { size: 22, color: '#fff' })}
                  </div>
                  <span style={{ color: isActive ? colors.primary : colors.textMuted, fontSize: 10, fontWeight: 600 }}>{tab.label}</span>
                </div>
              );
            }
            return (
              <div key={tab.id} onClick={() => { setActiveTab(tab.id); handlePress(`nav-${tab.id}`); if (tab.id !== 'boards') setActiveBoard(null); }} style={btnStyle(`nav-${tab.id}`, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 50 })}>
                <div style={{ width: 40, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {isActive && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 20, height: 3, borderRadius: 2, background: colors.primary }} />}
                  {React.createElement(tab.icon, { size: 22, color: isActive ? colors.primaryLight : colors.textMuted })}
                </div>
                <span style={{ color: isActive ? colors.primaryLight : colors.textMuted, fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{tab.label}</span>
              </div>
            );
          })}
        </div>

        {/* Home Indicator */}
        <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.surface }}>
          <div style={{ width: 120, height: 4, background: colors.border, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}
