function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('garden');
  const [captureMode, setCaptureMode] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showNewCapture, setShowNewCapture] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [weeklyExpanded, setWeeklyExpanded] = useState(null);
  const recordingRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRecording) {
      recordingRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      clearInterval(recordingRef.current);
      setRecordingTime(0);
    }
    return () => clearInterval(recordingRef.current);
  }, [isRecording]);

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(124,58,237,0.4)} 50%{box-shadow:0 0 20px rgba(124,58,237,0.8)} }
    @keyframes slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes ripple { 0%{transform:scale(0);opacity:1} 100%{transform:scale(4);opacity:0} }
    @keyframes wave { 0%,100%{height:8px} 25%{height:20px} 50%{height:14px} 75%{height:22px} }
    .pulse-anim { animation: pulse 2s infinite; }
    .float-anim { animation: float 3s ease-in-out infinite; }
    .glow-anim { animation: glow 2s ease-in-out infinite; }
    .slide-up { animation: slideUp 0.4s ease forwards; }
    .fade-in { animation: fadeIn 0.3s ease forwards; }
    ::-webkit-scrollbar { display: none; }
  `;

  const colors = {
    bg: '#080612',
    surface: '#110D22',
    card: '#1A1433',
    cardHover: '#221B42',
    border: '#2A2250',
    primary: '#7C3AED',
    primaryLight: '#9D5FF5',
    primaryDim: 'rgba(124,58,237,0.15)',
    secondary: '#F59E0B',
    secondaryDim: 'rgba(245,158,11,0.12)',
    accent: '#06B6D4',
    accentDim: 'rgba(6,182,212,0.12)',
    green: '#10B981',
    pink: '#EC4899',
    text: '#F0EBF8',
    textMuted: '#8B7AA8',
    textDim: '#5A4E72',
    white: '#FFFFFF',
  };

  const clusters = [
    {
      id: 'c1', label: 'Café Mural Series', color: colors.secondary,
      x: 28, y: 18, size: 80, count: 7,
      tags: ['visual', 'color', 'inspiration'],
      preview: 'Color palette from Tuesday visit — ochre walls, deep teal trim...',
      cards: [
        { id: 'i1', type: 'photo', title: 'Ochre + Teal combo', time: '2 days ago', note: 'The mural at Blue Bottle. Something about the warmth against coolness.' },
        { id: 'i2', type: 'voice', title: 'Color mood voice note', time: '2 days ago', duration: '0:34', note: 'Described the feeling of the colors — nostalgic, forward-looking at once.' },
        { id: 'i3', type: 'text', title: 'Palette hex codes', time: '1 day ago', note: '#D4832A, #1B6B6B, #F2E8D0 — works for the brand refresh project.' },
      ]
    },
    {
      id: 'c2', label: 'Novel Fragment Pool', color: colors.pink,
      x: 60, y: 12, size: 72, count: 12,
      tags: ['writing', 'fiction', 'voice'],
      preview: '"She counted backwards from eleven every time she needed to feel real."',
      cards: [
        { id: 'i4', type: 'text', title: 'Overheard on the train', time: '5 hours ago', note: '"I never said I was good, I said I was consistent." — old man in a suit.' },
        { id: 'i5', type: 'voice', title: 'Character backstory idea', time: '3 days ago', duration: '1:12', note: 'What if she forgot things on purpose? Not trauma — strategy.' },
        { id: 'i6', type: 'text', title: 'Opening line draft', time: '1 week ago', note: 'She counted backwards from eleven every time she needed to feel real.' },
      ]
    },
    {
      id: 'c3', label: 'Product Insight Loop', color: colors.accent,
      x: 20, y: 52, size: 88, count: 5,
      tags: ['product', 'research', 'ux'],
      preview: 'Three users said "too many clicks" in one week. Pattern?',
      cards: [
        { id: 'i7', type: 'text', title: 'User complaint cluster', time: '1 day ago', note: '"Too many clicks to get started" — heard this 3 times in a week.' },
        { id: 'i8', type: 'voice', title: 'Onboarding friction idea', time: '4 days ago', duration: '0:52', note: 'What if first action was capture, not setup? Zero config to begin.' },
        { id: 'i9', type: 'photo', title: 'Competitor UX screenshot', time: '5 days ago', note: 'Their onboarding has one screen. We have seven. Opportunity here.' },
      ]
    },
    {
      id: 'c4', label: 'Morning Walk Sparks', color: colors.green,
      x: 58, y: 50, size: 65, count: 9,
      tags: ['ambient', 'location', 'daily'],
      preview: 'Recurring theme: transitions. Light, seasons, conversations...',
      cards: [
        { id: 'i10', type: 'location', title: 'Riverside path — fog', time: '6 hours ago', note: 'The fog was so thick it felt like thinking in slow motion. Use that.' },
        { id: 'i11', type: 'photo', title: 'Shadow geometry', time: '2 days ago', note: 'Leaf shadows on concrete. Perfect hexagonal grid. Nature as designer.' },
        { id: 'i12', type: 'text', title: 'Transition theme note', time: '3 days ago', note: 'Everything I\'ve captured this week is about transitions. Light, seasons, phases.' },
      ]
    },
    {
      id: 'c5', label: 'Sound & Texture', color: colors.primaryLight,
      x: 38, y: 72, size: 58, count: 4,
      tags: ['sensory', 'audio', 'ambient'],
      preview: 'Sound of rain on a bus roof. That specific tempo.',
      cards: [
        { id: 'i13', type: 'voice', title: 'Bus rain ambient', time: '1 week ago', duration: '2:04', note: 'Recorded rain on bus roof. The tempo is 140bpm approximately.' },
        { id: 'i14', type: 'text', title: 'Texture vocabulary', time: '1 week ago', note: 'Vellichor. Sonder. Need more words for sensory memories without names.' },
      ]
    },
  ];

  const weeklySynthesis = {
    date: 'Week of March 17',
    totalCaptures: 34,
    topThemes: ['transitions', 'color theory', 'human patterns'],
    collisions: [
      { title: 'Fog + Character Voice', desc: 'Your riverside fog note and the "thinking in slow motion" metaphor could anchor a character\'s internal monologue style.', strength: 92 },
      { title: 'Café Palette → Brand Project', desc: 'The ochre-teal combination you captured twice maps directly to your pending brand refresh color exploration.', strength: 87 },
      { title: 'UX Friction → First Principles', desc: 'The "too many clicks" pattern + zero-config onboarding idea suggests a product philosophy shift worth exploring.', strength: 79 },
    ],
    nextSteps: [
      'Develop the "backwards from eleven" character into a full scene',
      'Export café palette to brand project folder',
      'Write a one-pager on zero-config product philosophy',
    ]
  };

  const recentCaptures = [
    { id: 'r1', type: 'voice', title: 'Overheard: train conversation', time: '5h ago', cluster: 'Novel Fragment Pool', clusterColor: colors.pink, duration: '0:18' },
    { id: 'r2', type: 'photo', title: 'Window light at golden hour', time: '9h ago', cluster: 'Morning Walk Sparks', clusterColor: colors.green },
    { id: 'r3', type: 'text', title: 'Thought on creative resistance', time: '1d ago', cluster: null, clusterColor: null },
    { id: 'r4', type: 'location', title: 'Bookshop on Clement St', time: '2d ago', cluster: 'Morning Walk Sparks', clusterColor: colors.green },
    { id: 'r5', type: 'voice', title: 'Product idea: ambient status', time: '2d ago', cluster: 'Product Insight Loop', clusterColor: colors.accent, duration: '1:03' },
  ];

  const captureTypes = [
    { id: 'text', label: 'Text', icon: 'PenLine', color: colors.primary },
    { id: 'voice', label: 'Voice', icon: 'Mic', color: colors.pink },
    { id: 'photo', label: 'Photo', icon: 'Camera', color: colors.secondary },
    { id: 'location', label: 'Place', icon: 'MapPin', color: colors.green },
  ];

  const typeIcon = (type) => {
    const map = { text: 'PenLine', voice: 'Mic', photo: 'Image', location: 'MapPin', sketch: 'Pencil' };
    return map[type] || 'Sparkles';
  };

  const typeColor = (type) => {
    const map = { text: colors.primary, voice: colors.pink, photo: colors.secondary, location: colors.green, sketch: colors.accent };
    return map[type] || colors.textMuted;
  };

  const formatRecording = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const s = {
    phone: { width: 375, height: 812, borderRadius: 44, background: colors.bg, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)', fontFamily: "'Inter', sans-serif", color: colors.text },
    statusBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px 0', height: 44, flexShrink: 0 },
    dynamicIsland: { width: 120, height: 34, borderRadius: 20, background: '#000', position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 50 },
    screen: { flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' },
    scroll: { flex: 1, overflowY: 'auto', overflowX: 'hidden' },
    bottomNav: { height: 80, background: colors.surface, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px 8px', flexShrink: 0, backdropFilter: 'blur(20px)' },
    navItem: (id) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 16px', borderRadius: 16, cursor: 'pointer', transition: 'all 0.15s', transform: pressedTab === id ? 'scale(0.9)' : 'scale(1)', background: activeTab === id ? colors.primaryDim : 'transparent' }),
    navLabel: (id) => ({ fontSize: 10, fontWeight: 600, color: activeTab === id ? colors.primary : colors.textDim, transition: 'color 0.2s' }),
    card: { background: colors.card, borderRadius: 20, padding: '16px', border: `1px solid ${colors.border}`, marginBottom: 12 },
    pill: (color) => ({ background: `${color}22`, color: color, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }),
    btn: (color, outline) => ({ background: outline ? 'transparent' : color, border: outline ? `1px solid ${color}` : 'none', color: outline ? color : colors.bg, borderRadius: 14, padding: '12px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.15s' }),
    fabBtn: { width: 56, height: 56, borderRadius: 28, background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 8px 24px ${colors.primaryDim}`, transition: 'all 0.15s' },
    captureTypePill: (id) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '14px 12px', borderRadius: 18, cursor: 'pointer', background: captureMode === id ? `${typeColor(id)}22` : colors.card, border: `1px solid ${captureMode === id ? typeColor(id) : colors.border}`, transition: 'all 0.2s', flex: 1 }),
  };

  // === GARDEN SCREEN ===
  const GardenScreen = () => (
    <div style={{ ...s.screen }}>
      <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", background: `linear-gradient(135deg, ${colors.text}, ${colors.primaryLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mind Garden</div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>37 ideas across 5 clusters</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Search, { size: 16, color: colors.textMuted })}
          </button>
          <button style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.SlidersHorizontal, { size: 16, color: colors.textMuted })}
          </button>
        </div>
      </div>

      {selectedCluster ? (
        <ClusterDetail cluster={selectedCluster} onBack={() => setSelectedCluster(null)} />
      ) : selectedCard ? (
        <CardDetail card={selectedCard} onBack={() => setSelectedCard(null)} />
      ) : (
        <div style={s.scroll}>
          {/* Visual garden */}
          <div style={{ margin: '8px 20px 16px', borderRadius: 24, background: colors.surface, border: `1px solid ${colors.border}`, height: 320, position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow bg */}
            <div style={{ position: 'absolute', top: '30%', left: '30%', width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primaryDim} 0%, transparent 70%)`, filter: 'blur(20px)' }} />
            <div style={{ position: 'absolute', top: '10%', left: '55%', width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)`, filter: 'blur(15px)' }} />

            {clusters.map((c, i) => (
              <button key={c.id} onClick={() => setSelectedCluster(c)}
                style={{ position: 'absolute', left: `${c.x}%`, top: `${c.y}%`, width: c.size, height: c.size, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${c.color}44, ${c.color}18)`, border: `1.5px solid ${c.color}66`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.color, textAlign: 'center', lineHeight: 1.2, padding: '0 6px', maxWidth: c.size - 16 }}>{c.count}</div>
                <div style={{ fontSize: 8, color: `${c.color}AA`, fontWeight: 500, textAlign: 'center', padding: '0 4px', maxWidth: c.size - 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.label.split(' ').slice(0, 2).join(' ')}</div>
              </button>
            ))}

            {/* Connection lines hint */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <line x1="28%" y1="30%" x2="60%" y2="22%" stroke={`${colors.border}`} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <line x1="28%" y1="58%" x2="38%" y2="78%" stroke={`${colors.border}`} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <line x1="62%" y1="58%" x2="38%" y2="78%" stroke={`${colors.border}`} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            </svg>

            <div style={{ position: 'absolute', bottom: 12, right: 12, background: `${colors.bg}CC`, borderRadius: 10, padding: '4px 10px', fontSize: 10, color: colors.textMuted }}>Tap a cluster to explore</div>
          </div>

          {/* Recent captures */}
          <div style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Recent Captures</div>
              <div style={{ fontSize: 12, color: colors.primary, fontWeight: 600 }}>See all</div>
            </div>
            {recentCaptures.map(item => (
              <button key={item.id} onClick={() => setSelectedCard(item)} style={{ ...s.card, width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${typeColor(item.type)}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide[typeIcon(item.type)], { size: 18, color: typeColor(item.type) })}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                    <span style={{ fontSize: 11, color: colors.textMuted }}>{item.time}</span>
                    {item.cluster && <span style={{ ...s.pill(item.clusterColor), fontSize: 10 }}>{item.cluster.split(' ').slice(0, 2).join(' ')}</span>}
                    {item.type === 'voice' && item.duration && <span style={{ fontSize: 10, color: colors.textMuted }}>{item.duration}</span>}
                    {!item.cluster && <span style={{ ...s.pill(colors.textDim), fontSize: 10 }}>Unlinked</span>}
                  </div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textDim })}
              </button>
            ))}
            <div style={{ height: 20 }} />
          </div>
        </div>
      )}
    </div>
  );

  const ClusterDetail = ({ cluster, onBack }) => (
    <div style={{ ...s.scroll, animation: 'slideUp 0.3s ease forwards' }}>
      <div style={{ padding: '0 20px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: colors.primary, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 16, padding: 0 }}>
          {React.createElement(window.lucide.ArrowLeft, { size: 16 })} Back to Garden
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: cluster.color }}>{cluster.label}</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>{cluster.count} ideas captured</div>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: 26, background: `${cluster.color}22`, border: `2px solid ${cluster.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Layers, { size: 22, color: cluster.color })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {cluster.tags.map(t => <span key={t} style={s.pill(cluster.color)}>{t}</span>)}
        </div>

        <div style={{ ...s.card, borderLeft: `3px solid ${cluster.color}` }}>
          <div style={{ fontSize: 11, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>LATEST FRAGMENT</div>
          <div style={{ fontSize: 13, color: colors.text, fontStyle: 'italic', lineHeight: 1.6 }}>"{cluster.preview}"</div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: colors.textMuted, marginBottom: 12, marginTop: 4 }}>IDEAS IN THIS CLUSTER</div>
        {cluster.cards.map(card => (
          <button key={card.id} onClick={() => { setSelectedCard(card); setSelectedCluster(null); }} style={{ ...s.card, width: '100%', textAlign: 'left', display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${typeColor(card.type)}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              {React.createElement(window.lucide[typeIcon(card.type)], { size: 16, color: typeColor(card.type) })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{card.title}</div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 3, lineHeight: 1.5 }}>{card.note}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 10, color: colors.textDim }}>{card.time}</span>
                {card.duration && <span style={{ fontSize: 10, color: typeColor(card.type) }}>{card.duration}</span>}
              </div>
            </div>
          </button>
        ))}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );

  const CardDetail = ({ card, onBack }) => (
    <div style={{ ...s.scroll, animation: 'slideUp 0.3s ease forwards' }}>
      <div style={{ padding: '0 20px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: colors.primary, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 16, padding: 0 }}>
          {React.createElement(window.lucide.ArrowLeft, { size: 16 })} Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: `${typeColor(card.type)}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide[typeIcon(card.type)], { size: 20, color: typeColor(card.type) })}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{card.title}</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>{card.time || '2 days ago'}</div>
          </div>
        </div>

        {card.type === 'voice' && (
          <div style={{ ...s.card, background: `${colors.pink}11`, border: `1px solid ${colors.pink}33`, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: colors.pink, fontWeight: 600 }}>VOICE NOTE · {card.duration || '0:34'}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[...Array(18)].map((_, i) => (
                  <div key={i} style={{ width: 3, borderRadius: 2, background: colors.pink, height: Math.random() > 0.5 ? 16 + Math.random() * 10 : 6 + Math.random() * 8, opacity: 0.7 }} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button style={{ width: 40, height: 40, borderRadius: 20, background: colors.pink, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {React.createElement(window.lucide.Play, { size: 18, color: '#fff' })}
              </button>
              <div style={{ flex: 1, height: 3, background: colors.border, borderRadius: 2 }}>
                <div style={{ width: '35%', height: '100%', background: colors.pink, borderRadius: 2 }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ ...s.card, marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 8 }}>NOTES</div>
          <div style={{ fontSize: 14, color: colors.text, lineHeight: 1.7 }}>{card.note || 'No additional notes.'}</div>
        </div>

        <div style={{ ...s.card, background: colors.primaryDim, border: `1px solid ${colors.primary}33` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {React.createElement(window.lucide.Sparkles, { size: 14, color: colors.primaryLight })}
            <div style={{ fontSize: 12, color: colors.primaryLight, fontWeight: 600 }}>SUGGESTED CONNECTIONS</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: colors.card, borderRadius: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${colors.pink}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.BookOpen, { size: 13, color: colors.pink })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Novel Fragment Pool</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>87% thematic match</div>
              </div>
              <button style={{ fontSize: 11, color: colors.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Link</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: colors.card, borderRadius: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${colors.green}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.Leaf, { size: 13, color: colors.green })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Morning Walk Sparks</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>72% contextual match</div>
              </div>
              <button style={{ fontSize: 11, color: colors.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Link</button>
            </div>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );

  // === CAPTURE SCREEN ===
  const CaptureScreen = () => (
    <div style={s.screen}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", background: `linear-gradient(135deg, ${colors.text}, ${colors.primaryLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Capture</div>
        <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>What's on your mind right now?</div>
      </div>

      <div style={s.scroll}>
        <div style={{ padding: '0 20px' }}>
          {/* Capture type selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {captureTypes.map(ct => (
              <button key={ct.id} onClick={() => setCaptureMode(ct.id)} style={s.captureTypePill(ct.id)}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${ct.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide[ct.icon], { size: 17, color: ct.color })}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: captureMode === ct.id ? ct.color : colors.textMuted }}>{ct.label}</span>
              </button>
            ))}
          </div>

          {/* Text input area */}
          {(!captureMode || captureMode === 'text') && (
            <div style={{ ...s.card, marginBottom: 16 }}>
              <textarea placeholder="Type a thought, fragment, quote, or observation..." style={{ width: '100%', background: 'none', border: 'none', color: colors.text, fontSize: 15, lineHeight: 1.7, resize: 'none', outline: 'none', fontFamily: "'Inter', sans-serif", minHeight: 100, boxSizing: 'border-box' }} />
            </div>
          )}

          {/* Voice capture */}
          {captureMode === 'voice' && (
            <div style={{ ...s.card, background: isRecording ? `${colors.pink}11` : colors.card, border: `1px solid ${isRecording ? colors.pink : colors.border}`, marginBottom: 16, transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0' }}>
                {isRecording && (
                  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 40, marginBottom: 16 }}>
                    {[...Array(12)].map((_, i) => (
                      <div key={i} style={{ width: 4, borderRadius: 2, background: colors.pink, animation: `wave ${0.5 + i * 0.1}s ease-in-out infinite`, animationDelay: `${i * 0.05}s` }} />
                    ))}
                  </div>
                )}
                {!isRecording && (
                  <div style={{ width: 48, height: 48, borderRadius: 24, background: `${colors.pink}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    {React.createElement(window.lucide.Mic, { size: 22, color: colors.pink })}
                  </div>
                )}
                <div style={{ fontSize: isRecording ? 28 : 14, fontWeight: 700, color: isRecording ? colors.pink : colors.textMuted, marginBottom: 12, fontVariantNumeric: 'tabular-nums' }}>
                  {isRecording ? formatRecording(recordingTime) : 'Ready to record'}
                </div>
                <button onClick={() => setIsRecording(r => !r)} style={{ background: isRecording ? colors.pink : `${colors.pink}22`, border: isRecording ? 'none' : `2px solid ${colors.pink}`, borderRadius: 24, padding: '12px 28px', color: isRecording ? '#fff' : colors.pink, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
            </div>
          )}

          {/* Photo capture */}
          {captureMode === 'photo' && (
            <div style={{ ...s.card, marginBottom: 16 }}>
              <div style={{ height: 160, border: `2px dashed ${colors.secondary}44`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer' }}>
                {React.createElement(window.lucide.Camera, { size: 32, color: colors.secondary })}
                <div style={{ fontSize: 14, color: colors.textMuted, textAlign: 'center' }}>Take a photo or<br />choose from library</div>
                <button style={{ ...s.btn(colors.secondary, true), padding: '8px 20px', fontSize: 13 }}>Open Camera</button>
              </div>
            </div>
          )}

          {/* Location capture */}
          {captureMode === 'location' && (
            <div style={{ ...s.card, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${colors.green}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide.MapPin, { size: 18, color: colors.green })}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Blue Bottle Coffee, Hayes Valley</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>San Francisco, CA · Now</div>
                </div>
              </div>
              <div style={{ height: 100, borderRadius: 12, background: `${colors.green}11`, border: `1px solid ${colors.green}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 3, opacity: 0.3 }}>
                  {[...Array(24)].map((_, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: colors.green }} />)}
                </div>
                {React.createElement(window.lucide.MapPin, { size: 24, color: colors.green, style: { position: 'absolute' } })}
              </div>
            </div>
          )}

          {/* Context tags */}
          <div style={{ ...s.card, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 10 }}>CLUSTER CONTEXT (optional)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {clusters.slice(0, 4).map(c => (
                <button key={c.id} style={{ ...s.pill(c.color), cursor: 'pointer', border: 'none', fontFamily: "'Inter', sans-serif" }}>{c.label.split(' ').slice(0, 2).join(' ')}</button>
              ))}
              <button style={{ ...s.pill(colors.textMuted), cursor: 'pointer', border: 'none', fontFamily: "'Inter', sans-serif" }}>+ New cluster</button>
            </div>
          </div>

          {/* Muse prompt */}
          <div style={{ ...s.card, background: colors.primaryDim, border: `1px solid ${colors.primary}33`, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              {React.createElement(window.lucide.Sparkles, { size: 14, color: colors.primaryLight })}
              <div style={{ fontSize: 11, fontWeight: 700, color: colors.primaryLight }}>MUSE PROMPT</div>
            </div>
            <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.6 }}>What detail about this moment would you regret not writing down?</div>
          </div>

          <button style={{ ...s.btn(colors.primary), width: '100%', textAlign: 'center', padding: '15px', fontSize: 16 }}>
            Save to Garden
          </button>
          <div style={{ height: 20 }} />
        </div>
      </div>
    </div>
  );

  // === DISCOVER / SYNTHESIS SCREEN ===
  const DiscoverScreen = () => (
    <div style={s.screen}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", background: `linear-gradient(135deg, ${colors.text}, ${colors.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Discover</div>
        <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Patterns, collisions, and creative sparks</div>
      </div>

      <div style={s.scroll}>
        <div style={{ padding: '0 20px' }}>
          {/* Weekly synthesis card */}
          <div style={{ ...s.card, background: `linear-gradient(135deg, ${colors.primaryDim}, ${colors.secondaryDim})`, border: `1px solid ${colors.primary}44`, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: colors.primaryLight, marginBottom: 4 }}>WEEKLY SYNTHESIS</div>
                <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{weeklySynthesis.date}</div>
              </div>
              <div style={{ background: `${colors.primary}22`, borderRadius: 12, padding: '6px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.primaryLight }}>{weeklySynthesis.totalCaptures}</div>
                <div style={{ fontSize: 9, color: colors.textMuted, fontWeight: 600 }}>CAPTURES</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {weeklySynthesis.topThemes.map(t => (
                <span key={t} style={{ background: `${colors.secondary}22`, color: colors.secondary, borderRadius: 20, padding: '4px 10px', fontSize: 10, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <button style={{ ...s.btn(colors.primary), width: '100%', textAlign: 'center', padding: '10px' }}>
              Read Full Synthesis
            </button>
          </div>

          {/* Creative collisions */}
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.textMuted, marginBottom: 12 }}>CREATIVE COLLISIONS</div>
          {weeklySynthesis.collisions.map((col, i) => (
            <button key={i} onClick={() => setWeeklyExpanded(weeklyExpanded === i ? null : i)} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: colors.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide.Zap, { size: 18, color: colors.primaryLight })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{col.title}</div>
                    <div style={{ fontSize: 12, color: colors.primaryLight, fontWeight: 700 }}>{col.strength}%</div>
                  </div>
                  <div style={{ width: '100%', height: 3, background: colors.border, borderRadius: 2, marginTop: 6 }}>
                    <div style={{ width: `${col.strength}%`, height: '100%', background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`, borderRadius: 2 }} />
                  </div>
                  {weeklyExpanded === i && (
                    <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 10, lineHeight: 1.6 }}>{col.desc}</div>
                  )}
                </div>
              </div>
            </button>
          ))}

          {/* Next steps */}
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.textMuted, marginBottom: 12, marginTop: 4 }}>SUGGESTED NEXT STEPS</div>
          {weeklySynthesis.nextSteps.map((step, i) => (
            <div key={i} style={{ ...s.card, display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, border: `2px solid ${colors.secondary}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: colors.secondary }}>{i + 1}</span>
              </div>
              <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.6, flex: 1 }}>{step}</div>
            </div>
          ))}

          {/* Themes over time */}
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.textMuted, marginBottom: 12, marginTop: 4 }}>RECURRING THEMES</div>
          {[
            { label: 'Transitions', count: 11, bar: 88, color: colors.primary },
            { label: 'Color & Light', count: 8, bar: 65, color: colors.secondary },
            { label: 'Human Patterns', count: 7, bar: 56, color: colors.pink },
            { label: 'Product Thinking', count: 5, bar: 40, color: colors.accent },
            { label: 'Language & Voice', count: 4, bar: 32, color: colors.green },
          ].map(theme => (
            <div key={theme.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 90, fontSize: 12, fontWeight: 600, color: colors.text }}>{theme.label}</div>
              <div style={{ flex: 1, height: 6, background: colors.border, borderRadius: 3 }}>
                <div style={{ width: `${theme.bar}%`, height: '100%', background: theme.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ fontSize: 11, color: colors.textMuted, width: 20, textAlign: 'right' }}>{theme.count}</div>
            </div>
          ))}
          <div style={{ height: 20 }} />
        </div>
      </div>
    </div>
  );

  // === PROFILE SCREEN ===
  const ProfileScreen = () => (
    <div style={s.screen}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", background: `linear-gradient(135deg, ${colors.text}, ${colors.primaryLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>You</div>
        <button style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {React.createElement(window.lucide.Settings, { size: 16, color: colors.textMuted })}
        </button>
      </div>

      <div style={s.scroll}>
        <div style={{ padding: '0 20px' }}>
          {/* Profile hero */}
          <div style={{ ...s.card, background: `linear-gradient(135deg, ${colors.primaryDim}, ${colors.accentDim})`, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                M
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Mina Okafor</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Brand Designer · San Francisco</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  {React.createElement(window.lucide.Flame, { size: 13, color: colors.secondary })}
                  <span style={{ fontSize: 12, color: colors.secondary, fontWeight: 600 }}>14-day streak</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[{ val: '147', label: 'Ideas' }, { val: '5', label: 'Clusters' }, { val: '3', label: 'Syntheses' }].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center', background: `${colors.bg}AA`, borderRadius: 12, padding: '10px 6px' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>{stat.val}</div>
                  <div style={{ fontSize: 10, color: colors.textMuted, fontWeight: 600, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity heatmap placeholder */}
          <div style={{ ...s.card, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Capture Activity</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', gap: 3 }}>
              {[...Array(91)].map((_, i) => {
                const intensity = Math.random();
                const alpha = intensity > 0.7 ? 0.9 : intensity > 0.4 ? 0.5 : intensity > 0.15 ? 0.25 : 0.08;
                return <div key={i} style={{ aspectRatio: 1, borderRadius: 2, background: `rgba(124,58,237,${alpha})` }} />;
              })}
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 10, color: colors.textDim }}>Less</span>
              {[0.08, 0.25, 0.5, 0.9].map(a => <div key={a} style={{ width: 10, height: 10, borderRadius: 2, background: `rgba(124,58,237,${a})` }} />)}
              <span style={{ fontSize: 10, color: colors.textDim }}>More</span>
            </div>
          </div>

          {/* Settings rows */}
          {[
            { icon: 'Bell', label: 'Daily capture reminders', val: '9:00 AM', color: colors.primary },
            { icon: 'Sparkles', label: 'Weekly synthesis', val: 'Sundays', color: colors.secondary },
            { icon: 'MapPin', label: 'Location tagging', val: 'On', color: colors.green },
            { icon: 'Link', label: 'Auto-link threshold', val: '75%', color: colors.accent },
            { icon: 'Download', label: 'Export garden', val: 'PDF / JSON', color: colors.pink },
          ].map(item => (
            <div key={item.label} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide[item.icon], { size: 16, color: item.color })}
              </div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>{item.val}</div>
              {React.createElement(window.lucide.ChevronRight, { size: 14, color: colors.textDim })}
            </div>
          ))}
          <div style={{ height: 20 }} />
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'garden', label: 'Garden', icon: 'Layers' },
    { id: 'capture', label: 'Capture', icon: 'Plus' },
    { id: 'discover', label: 'Discover', icon: 'Sparkles' },
    { id: 'profile', label: 'You', icon: 'User' },
  ];

  const screenMap = { garden: GardenScreen, capture: CaptureScreen, discover: DiscoverScreen, profile: ProfileScreen };
  const ActiveScreen = screenMap[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#030209', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <style dangerouslySetInnerHTML={{ __html: fontStyle }} />
      {/* Ambient background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Phone frame */}
      <div style={s.phone}>
        {/* Status bar */}
        <div style={s.statusBar}>
          <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{currentTime}</span>
          <div style={s.dynamicIsland} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: colors.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: colors.text })}
          </div>
        </div>

        {/* Active screen */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <ActiveScreen />
        </div>

        {/* Bottom nav */}
        <div style={s.bottomNav}>
          {tabs.map(tab => (
            <button key={tab.id}
              onMouseDown={() => setPressedTab(tab.id)}
              onMouseUp={() => setPressedTab(null)}
              onMouseLeave={() => setPressedTab(null)}
              onClick={() => { setActiveTab(tab.id); setSelectedCluster(null); setSelectedCard(null); setCaptureMode(null); setIsRecording(false); }}
              style={s.navItem(tab.id)}>
              {tab.id === 'capture' ? (
                <div style={{ width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px ${colors.primaryDim}`, transform: pressedTab === 'capture' ? 'scale(0.9)' : 'scale(1)', transition: 'all 0.15s', marginBottom: -4 }}>
                  {React.createElement(window.lucide.Plus, { size: 22, color: '#fff' })}
                </div>
              ) : (
                <>
                  {React.createElement(window.lucide[tab.icon], { size: 22, color: activeTab === tab.id ? colors.primary : colors.textDim })}
                  <span style={s.navLabel(tab.id)}>{tab.label}</span>
                </>
              )}
              {tab.id !== 'capture' && activeTab === tab.id && (
                <div style={{ width: 4, height: 4, borderRadius: 2, background: colors.primary, marginTop: 2 }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
