const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [captureType, setCaptureType] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [alchemyStep, setAlchemyStep] = useState('select');
  const [alchemyMedium, setAlchemyMedium] = useState('writing');
  const [generating, setGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState(null);
  const [activeTrail, setActiveTrail] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeMoodIdx, setActiveMoodIdx] = useState(0);

  const themes = {
    dark: {
      bg: '#0C0B15',
      surface: '#131122',
      card: '#1C1A2E',
      cardAlt: '#211E35',
      border: '#2A2640',
      primary: '#A855F7',
      primaryLight: '#C084FC',
      primaryDim: 'rgba(168,85,247,0.14)',
      accent: '#FB923C',
      accentDim: 'rgba(251,146,60,0.14)',
      coral: '#F43F5E',
      coralDim: 'rgba(244,63,94,0.12)',
      teal: '#2DD4BF',
      tealDim: 'rgba(45,212,191,0.12)',
      text: '#F2EEFF',
      textMuted: '#8B82A8',
      textDim: '#4A4360',
      navBg: '#0F0E1E',
      grad: 'linear-gradient(135deg, #1C1A2E, #251F3E)',
    },
    light: {
      bg: '#F8F5FF',
      surface: '#FFFFFF',
      card: '#FDFAFF',
      cardAlt: '#F3EEFF',
      border: '#E0D5F5',
      primary: '#7C3AED',
      primaryLight: '#A855F7',
      primaryDim: 'rgba(124,58,237,0.08)',
      accent: '#C2410C',
      accentDim: 'rgba(194,65,12,0.08)',
      coral: '#E11D48',
      coralDim: 'rgba(225,29,72,0.08)',
      teal: '#0D9488',
      tealDim: 'rgba(13,148,136,0.08)',
      text: '#1A1028',
      textMuted: '#6B5B8A',
      textDim: '#B0A0CC',
      navBg: '#FFFFFF',
      grad: 'linear-gradient(135deg, #EDE9FF, #F5F0FF)',
    },
  };

  const c = themes[theme];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
    body { margin: 0; background: #120D1F; }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.15);opacity:0.2} 100%{transform:scale(1);opacity:0.6} }
    @keyframes wave { 0%,100%{transform:scaleY(0.5)} 50%{transform:scaleY(1)} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes fade-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
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

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handlePress = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 150); };
  const btn = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.94)' : 'scale(1)',
    transition: 'transform 0.12s ease',
    cursor: 'pointer',
  });

  const moments = [
    { id: 1, type: 'photo', title: 'Neon-lit Diner, 2am', time: '2h ago', tag: 'Atmosphere', mood: 'Haunting', emoji: '🌆', color: '#A855F7', palette: ['#A855F7','#F43F5E','#1C1A2E'], desc: 'Rows of vinyl stools, a lone customer, coffee steam curling under pink neon. The clock says 2:07.' },
    { id: 2, type: 'voice', title: 'Morning commute monologue', time: '5h ago', tag: 'Tension', mood: 'Restless', emoji: '🎤', color: '#FB923C', palette: ['#FB923C','#FCD34D','#1C1A2E'], desc: '"There\'s a man on the train who\'s been looking at the same page for twenty minutes..."' },
    { id: 3, type: 'text', title: 'Overheard: flower shop', time: 'Yesterday', tag: 'Warmth', mood: 'Tender', emoji: '✍️', color: '#2DD4BF', palette: ['#2DD4BF','#A855F7','#131122'], desc: '"These aren\'t for anyone — they\'re just to have something alive in the apartment."' },
    { id: 4, type: 'photo', title: 'Concrete stairwell geometry', time: 'Yesterday', tag: 'Structure', mood: 'Precise', emoji: '📷', color: '#F43F5E', palette: ['#F43F5E','#FB923C','#1C1A2E'], desc: 'Brutalist spiral — shadows make it look infinite. Found in a 1970s municipal building.' },
    { id: 5, type: 'voice', title: 'Brand feeling — Verdant', time: '2 days ago', tag: 'Identity', mood: 'Earthy', emoji: '🌿', color: '#34D399', palette: ['#34D399','#2DD4BF','#131122'], desc: '"Like damp soil after rain. Rough hands, clean product. The kind of brand that doesn\'t need to shout."' },
  ];

  const trails = [
    { id: 1, name: 'Urban Solitude', count: 7, lastUpdated: '2h ago', color: '#A855F7', tags: ['Night','City','Quiet'], moments: ['Neon-lit Diner, 2am','Glass Tower Shadow Grid','"Cities breathe at night…"','+4 more'], desc: 'A thread exploring the strange loneliness of populated spaces.' },
    { id: 2, name: 'Found Dialogues', count: 4, lastUpdated: 'Yesterday', color: '#2DD4BF', tags: ['Voice','Human','Overheard'], moments: ['Overheard: flower shop','Morning commute monologue','Market argument','+1 more'], desc: 'Real words from strangers, too good to lose.' },
    { id: 3, name: 'Material World', count: 5, lastUpdated: '3 days ago', color: '#FB923C', tags: ['Texture','Form','Design'], moments: ['Concrete stairwell geometry','Worn leather journal','Grid shadow pattern','+2 more'], desc: 'Objects and structures with storytelling surfaces.' },
  ];

  const alchemyResults = {
    writing: [
      { type: 'Story Opening', icon: '📖', text: 'The clock above the counter had stopped at 2:07, which Della found oddly comforting — proof that some things refused to keep moving forward.' },
      { type: 'Dialogue Prompt', icon: '💬', text: '"You come here every night," the waitress said. It wasn\'t a question. / "The coffee\'s terrible," he agreed. / "Then why—" / "Same reason you\'re still here."' },
      { type: 'Scene Fragment', icon: '🎬', text: 'Twelve stools. One customer. A jukebox that nobody fed money anymore but still remembered the songs it used to play.' },
    ],
    design: [
      { type: 'Palette Direction', icon: '🎨', text: 'Neon magenta (#FF2D78) bleeds into industrial grey (#2C2C34). Accent with cream (#FFF4E0). The warmth is earned, not given.' },
      { type: 'Typography Cue', icon: '✒️', text: 'Headline: condensed serif, like old signage. Body: slightly worn mono. The tension between nostalgia and precision.' },
      { type: 'Visual Metaphor', icon: '🖼️', text: 'Steam rising from coffee as the only motion in the frame. Everything else held in suspension — the diner as a snow globe.' },
    ],
    brainstorm: [
      { type: 'Campaign Concept', icon: '💡', text: '"After Hours" — a series about the people and places that exist between midnight and 5am. Real stories, real light.' },
      { type: 'Character Seed', icon: '👤', text: 'Someone who only thinks clearly in diners at odd hours. Not broken — calibrated differently. A detective? A writer? A regretful parent?' },
      { type: 'Theme Hook', icon: '🎯', text: 'Permanence vs. impermanence: the diner outlasts the people. The vinyl remembers the shapes of those who sat there.' },
    ],
  };

  const moodData = [
    { title: 'Neon-lit Diner, 2am', emoji: '🌆', mood: 'Haunting · Electric', palette: ['#A855F7','#F43F5E','#FB923C','#1C1A2E','#F2EEFF'], tags: ['Urban','Solitude','Night'], bars: { Tension: 75, Warmth: 30, Mystery: 90, Energy: 50 }, note: 'High contrast. Neon against dark. Cinematic still-life energy.' },
    { title: 'Overheard: flower shop', emoji: '✍️', mood: 'Tender · Quiet', palette: ['#2DD4BF','#A855F7','#F2EEFF','#131122','#FDF4FF'], tags: ['Intimate','Human','Connection'], bars: { Tension: 15, Warmth: 85, Mystery: 40, Energy: 25 }, note: 'Soft focus. Muted greens and lavender. A held breath.' },
    { title: 'Morning commute monologue', emoji: '🎤', mood: 'Restless · Alert', palette: ['#FB923C','#FCD34D','#F43F5E','#0C0B15','#FFF7ED'], tags: ['Urban','Tension','Voice'], bars: { Tension: 68, Warmth: 20, Mystery: 55, Energy: 80 }, note: 'Stop-start rhythm. Amber urgency. Motion without destination.' },
  ];

  // ── STATUS BAR ──────────────────────────────────────────────
  const StatusBar = () =>
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', height: '44px', position: 'relative', zIndex: 10 }
    },
      React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: '700', color: c.text } }, '9:41'),
      React.createElement('div', { style: { width: '126px', height: '34px', background: '#000', borderRadius: '20px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '6px' } }),
      React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
        React.createElement('svg', { width: '16', height: '12', viewBox: '0 0 24 18', fill: c.text },
          React.createElement('path', { d: 'M12 3C7.3 3 3.1 4.8 0 7.8l2.4 2.4C4.8 7.7 8.2 6 12 6s7.2 1.7 9.6 4.2L24 7.8C20.9 4.8 16.7 3 12 3z' }),
          React.createElement('path', { d: 'M12 9c-3 0-5.7 1.2-7.6 3.2l2.4 2.4C8.1 13.1 9.9 12 12 12s3.9 1.1 5.2 2.6l2.4-2.4C17.7 10.2 15 9 12 9z' }),
          React.createElement('circle', { cx: '12', cy: '17', r: '2' })
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '2px' } },
          React.createElement('div', { style: { width: '24px', height: '12px', border: `1.5px solid ${c.text}`, borderRadius: '3px', padding: '1.5px', display: 'flex' } },
            React.createElement('div', { style: { width: '70%', background: c.text, borderRadius: '1.5px' } })
          ),
          React.createElement('div', { style: { width: '2px', height: '5px', background: c.text, borderRadius: '1px', marginLeft: '1px' } })
        )
      )
    );

  // ── NAV BAR ──────────────────────────────────────────────────
  const NavBar = () => {
    const tabs = [
      { id: 'home', label: 'Capture', Icon: window.lucide.Camera },
      { id: 'alchemy', label: 'Alchemy', Icon: window.lucide.Sparkles },
      { id: 'trails', label: 'Trails', Icon: window.lucide.GitBranch },
      { id: 'mood', label: 'Mood Map', Icon: window.lucide.Palette },
      { id: 'profile', label: 'Profile', Icon: window.lucide.User },
    ];
    return React.createElement('div', {
      style: { position: 'absolute', bottom: 0, left: 0, right: 0, background: c.navBg, borderTop: `1px solid ${c.border}`, display: 'flex', padding: '8px 4px 24px', borderRadius: '0 0 44px 44px', zIndex: 10 }
    },
      ...tabs.map(({ id, label, Icon }) =>
        React.createElement('button', {
          key: id,
          onClick: () => { setActiveTab(id); setAlchemyStep('select'); setGeneratedPrompts(null); setActiveTrail(null); setCaptureType(null); setIsRecording(false); },
          onMouseDown: () => handlePress(`nav-${id}`),
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 2px', color: activeTab === id ? c.primary : c.textDim, transform: pressedBtn === `nav-${id}` ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.1s ease' }
        },
          React.createElement(Icon, { size: 21, strokeWidth: activeTab === id ? 2.5 : 1.8 }),
          React.createElement('span', { style: { fontSize: '9px', fontFamily: "'DM Sans',sans-serif", fontWeight: activeTab === id ? '700' : '400', letterSpacing: '0.2px' } }, label)
        )
      )
    );
  };

  // ── HOME SCREEN ───────────────────────────────────────────────
  const HomeScreen = () => {
    if (captureType) return CaptureModal();
    const filters = ['All', 'photo', 'voice', 'text'];
    const filtered = activeFilter === 'All' ? moments : moments.filter(m => m.type === activeFilter);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: '110px' } },
      // Header
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('h1', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '30px', fontWeight: '700', color: c.text, margin: '0 0 2px', letterSpacing: '-0.5px' } }, 'Moments'),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: 0 } }, 'Catch it before it fades')
          ),
          React.createElement('div', {
            style: { width: '38px', height: '38px', borderRadius: '50%', background: c.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${c.primary}33` },
            onClick: () => setActiveTab('profile'),
          }, React.createElement(window.lucide.User, { size: 17, color: c.primary }))
        )
      ),
      // Quick Capture
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', { style: { background: c.grad, borderRadius: '22px', padding: '18px', border: `1px solid ${c.border}` } },
          React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: c.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' } }, 'Quick Capture'),
          React.createElement('div', { style: { display: 'flex', gap: '10px' } },
            [
              { id: 'photo', label: 'Photo', Icon: window.lucide.Camera, color: c.primary, dim: c.primaryDim },
              { id: 'voice', label: 'Voice', Icon: window.lucide.Mic, color: c.accent, dim: c.accentDim },
              { id: 'text', label: 'Text', Icon: window.lucide.Type, color: c.teal, dim: c.tealDim },
            ].map(({ id, label, Icon, color, dim }) =>
              React.createElement('button', {
                key: id,
                onClick: () => setCaptureType(id),
                onMouseDown: () => handlePress(`cap-${id}`),
                style: btn(`cap-${id}`, { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '14px 6px', borderRadius: '16px', background: dim, border: `1px solid ${color}30`, cursor: 'pointer' })
              },
                React.createElement(Icon, { size: 20, color }),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: '600', color } }, label)
              )
            )
          )
        )
      ),
      // Filters
      React.createElement('div', { style: { display: 'flex', gap: '8px', padding: '0 20px 16px', overflowX: 'auto' } },
        ...filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setActiveFilter(f),
            style: { padding: '6px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: '600', background: activeFilter === f ? c.primary : c.card, color: activeFilter === f ? '#fff' : c.textMuted, transition: 'all 0.2s' }
          }, f === 'All' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1))
        )
      ),
      // Cards
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' } },
        ...filtered.map(m =>
          React.createElement('div', {
            key: m.id,
            onClick: () => { setSelectedMoment(m); setAlchemyStep('select'); setGeneratedPrompts(null); setActiveTab('alchemy'); },
            onMouseDown: () => handlePress(`m-${m.id}`),
            style: btn(`m-${m.id}`, { background: c.card, borderRadius: '20px', border: `1px solid ${c.border}`, padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' })
          },
            React.createElement('div', { style: { width: '48px', height: '48px', borderRadius: '14px', background: `${m.color}22`, border: `1px solid ${m.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 } }, m.emoji),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
                React.createElement('h3', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '17px', fontWeight: '700', color: c.text, margin: 0, letterSpacing: '-0.2px' } }, m.title),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: c.textMuted, flexShrink: 0, marginLeft: '8px', marginTop: '2px' } }, m.time)
              ),
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: c.textMuted, margin: '0 0 10px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }, m.desc),
              React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
                React.createElement('span', { style: { padding: '3px 10px', borderRadius: '20px', background: `${m.color}22`, fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: '600', color: m.color } }, m.tag),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textDim } }, `· ${m.mood}`),
                React.createElement('div', { style: { marginLeft: 'auto', display: 'flex' } },
                  ...m.palette.slice(0, 3).map((p, i) => React.createElement('div', { key: i, style: { width: '14px', height: '14px', borderRadius: '50%', background: p, border: `2px solid ${c.card}`, marginLeft: i > 0 ? '-4px' : 0 } }))
                )
              )
            )
          )
        )
      )
    );
  };

  // ── CAPTURE MODAL ─────────────────────────────────────────────
  const CaptureModal = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 20px 120px' } },
      React.createElement('button', { onClick: () => { setCaptureType(null); setIsRecording(false); }, style: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: c.primary, fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '500', padding: '8px 0 16px' } },
        React.createElement(window.lucide.ChevronLeft, { size: 18 }), 'Back'
      ),
      React.createElement('h2', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '28px', fontWeight: '700', color: c.text, margin: '0 0 4px' } },
        captureType === 'photo' ? 'Photo Capture' : captureType === 'voice' ? 'Voice Memo' : 'Text Note'
      ),
      React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: '0 0 22px' } }, 'Add context to make your prompts richer'),

      captureType === 'photo' && React.createElement('div', {
        style: { background: c.card, borderRadius: '22px', height: '210px', border: `2px dashed ${c.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '18px', cursor: 'pointer' }
      },
        React.createElement(window.lucide.Camera, { size: 36, color: c.textDim }),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: c.textMuted, margin: 0 } }, 'Tap to open camera'),
        React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textDim } }, 'or drag an image here')
      ),

      captureType === 'voice' && React.createElement('div', {
        style: { background: c.card, borderRadius: '22px', padding: '32px 20px', border: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '18px' }
      },
        React.createElement('div', {
          onClick: () => setIsRecording(r => !r),
          style: { width: '80px', height: '80px', borderRadius: '50%', background: isRecording ? c.accent : c.accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `3px solid ${isRecording ? c.accent : 'transparent'}`, boxShadow: isRecording ? `0 0 0 10px ${c.accentDim}` : 'none', transition: 'all 0.3s ease', position: 'relative' }
        },
          React.createElement(isRecording ? window.lucide.Square : window.lucide.Mic, { size: 32, color: isRecording ? '#fff' : c.accent })
        ),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: c.textMuted, margin: 0, fontVariantNumeric: 'tabular-nums' } },
          isRecording ? `Recording — ${fmt(recordingTime)}` : 'Tap to record'
        ),
        isRecording && React.createElement('div', { style: { display: 'flex', gap: '3px', alignItems: 'center', height: '28px' } },
          ...[4,8,14,6,12,9,15,5,11,7,13,4,9].map((h, i) =>
            React.createElement('div', { key: i, style: { width: '3px', borderRadius: '2px', background: c.accent, height: `${h}px`, animation: `wave ${0.6 + i * 0.08}s ease-in-out infinite alternate` } })
          )
        )
      ),

      captureType === 'text' && React.createElement('div', {
        style: { background: c.card, borderRadius: '22px', border: `1px solid ${c.border}`, marginBottom: '18px', overflow: 'hidden' }
      },
        React.createElement('textarea', {
          placeholder: 'Describe what you noticed, heard, felt...\n\n"The man at the corner table ordered the same thing three times, each time like it was a decision."',
          style: { width: '100%', minHeight: '180px', background: 'transparent', border: 'none', padding: '18px', resize: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: c.text, outline: 'none', lineHeight: '1.75', boxSizing: 'border-box' }
        })
      ),

      React.createElement('div', { style: { marginBottom: '18px' } },
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textMuted, margin: '0 0 10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' } }, 'Set the mood'),
        React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
          ...['Tense', 'Warm', 'Eerie', 'Playful', 'Melancholy', 'Electric', 'Grounded'].map((mood, i) =>
            React.createElement('button', { key: mood, style: { padding: '7px 14px', borderRadius: '20px', background: i === 0 ? c.primaryDim : c.card, border: `1px solid ${i === 0 ? c.primary : c.border}`, fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: i === 0 ? c.primary : c.textMuted, cursor: 'pointer' } }, mood)
          )
        )
      ),
      React.createElement('button', {
        onClick: () => setCaptureType(null),
        onMouseDown: () => handlePress('save-cap'),
        style: btn('save-cap', { width: '100%', padding: '16px', borderRadius: '18px', background: `linear-gradient(135deg, ${c.primary}, ${c.coral})`, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: '#fff', letterSpacing: '0.2px' })
      }, 'Save Moment')
    );

  // ── ALCHEMY SCREEN ────────────────────────────────────────────
  const AlchemyScreen = () => {
    if (alchemyStep === 'result' && generatedPrompts) return AlchemyResult();
    const mediums = [
      { id: 'writing', label: 'Writing', Icon: window.lucide.PenLine, color: c.primary },
      { id: 'design', label: 'Design', Icon: window.lucide.Palette, color: c.accent },
      { id: 'brainstorm', label: 'Brainstorm', Icon: window.lucide.Lightbulb, color: c.teal },
    ];
    const handleGenerate = () => {
      setGenerating(true);
      setTimeout(() => { setGenerating(false); setGeneratedPrompts(alchemyResults[alchemyMedium]); setAlchemyStep('result'); }, 1800);
    };
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: '110px' } },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h1', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '30px', fontWeight: '700', color: c.text, margin: '0 0 2px', letterSpacing: '-0.5px' } }, 'Prompt Alchemy'),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: 0 } }, 'Transform moments into creative fuel')
      ),

      // Moment selector
      React.createElement('div', { style: { padding: '0 20px 18px' } },
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textMuted, margin: '0 0 10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' } }, 'Selected Moment'),
        selectedMoment
          ? React.createElement('div', { style: { background: c.card, borderRadius: '18px', border: `1.5px solid ${c.primary}44`, padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' } },
              React.createElement('div', { style: { width: '46px', height: '46px', borderRadius: '14px', background: `${selectedMoment.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' } }, selectedMoment.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h3', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '16px', fontWeight: '700', color: c.text, margin: '0 0 3px' } }, selectedMoment.title),
                React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: c.textMuted, margin: 0 } }, `${selectedMoment.mood} · ${selectedMoment.tag}`)
              ),
              React.createElement('button', { onClick: () => setSelectedMoment(null), style: { background: 'none', border: 'none', color: c.textDim, cursor: 'pointer', padding: '4px' } },
                React.createElement(window.lucide.X, { size: 16 })
              )
            )
          : React.createElement('div', {
              onClick: () => setActiveTab('home'),
              style: { background: c.card, borderRadius: '18px', border: `2px dashed ${c.border}`, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }
            },
              React.createElement(window.lucide.Plus, { size: 22, color: c.textDim }),
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: 0 } }, 'Choose from your captured moments')
            )
      ),

      // Medium
      React.createElement('div', { style: { padding: '0 20px 18px' } },
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textMuted, margin: '0 0 10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' } }, 'Creative Medium'),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          ...mediums.map(({ id, label, Icon, color }) =>
            React.createElement('button', {
              key: id,
              onClick: () => setAlchemyMedium(id),
              style: { flex: 1, padding: '14px 8px', borderRadius: '16px', background: alchemyMedium === id ? `${color}18` : c.card, border: `1.5px solid ${alchemyMedium === id ? color : c.border}`, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }
            },
              React.createElement(Icon, { size: 20, color: alchemyMedium === id ? color : c.textDim }),
              React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: '600', color: alchemyMedium === id ? color : c.textMuted } }, label)
            )
          )
        )
      ),

      // Tone
      React.createElement('div', { style: { padding: '0 20px 24px' } },
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textMuted, margin: '0 0 10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' } }, 'Tone'),
        React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
          ...['Cinematic', 'Intimate', 'Surreal', 'Gritty', 'Lyrical'].map((t, i) =>
            React.createElement('button', { key: t, style: { padding: '7px 14px', borderRadius: '20px', background: i === 0 ? c.primaryDim : c.card, border: `1px solid ${i === 0 ? c.primary : c.border}`, fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: i === 0 ? c.primary : c.textMuted, cursor: 'pointer' } }, t)
          )
        )
      ),

      // Generate
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('button', {
          onClick: selectedMoment && !generating ? handleGenerate : null,
          onMouseDown: () => selectedMoment && handlePress('gen'),
          style: btn('gen', { width: '100%', padding: '18px', borderRadius: '18px', background: selectedMoment ? `linear-gradient(135deg, ${c.primary}, ${c.coral})` : c.card, border: 'none', cursor: selectedMoment ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: "'DM Sans',sans-serif", fontSize: '16px', fontWeight: '700', color: selectedMoment ? '#fff' : c.textDim, letterSpacing: '0.2px' })
        },
          generating
            ? React.createElement('div', { style: { width: '20px', height: '20px', borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin-slow 0.8s linear infinite' } })
            : React.createElement(window.lucide.Sparkles, { size: 20 }),
          generating ? 'Generating prompts...' : 'Generate Prompts'
        )
      )
    );
  };

  const AlchemyResult = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: '110px' } },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('button', { onClick: () => { setAlchemyStep('select'); setGeneratedPrompts(null); }, style: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: c.primary, fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '500', padding: '0 0 10px' } },
          React.createElement(window.lucide.ChevronLeft, { size: 18 }), 'Back'
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderRadius: '14px', background: c.card, border: `1px solid ${c.primary}33`, marginBottom: '16px' } },
          React.createElement('span', { style: { fontSize: '20px' } }, selectedMoment?.emoji),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '15px', fontWeight: '700', color: c.text, margin: 0 } }, selectedMoment?.title),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.primary, margin: 0, textTransform: 'capitalize' } }, `${alchemyMedium} · Cinematic`)
          )
        ),
        React.createElement('h2', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '26px', fontWeight: '700', color: c.text, margin: '0 0 4px' } }, 'Your Prompts'),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: '0 0 18px' } }, '3 prompts generated · Tap to copy')
      ),
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...generatedPrompts.map((p, i) =>
          React.createElement('div', {
            key: i,
            onMouseDown: () => handlePress(`pr-${i}`),
            style: btn(`pr-${i}`, { background: c.card, borderRadius: '20px', border: `1px solid ${c.border}`, padding: '18px', cursor: 'pointer', animation: 'fade-in 0.4s ease both', animationDelay: `${i * 0.1}s` })
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                React.createElement('span', { style: { fontSize: '18px' } }, p.icon),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: '700', color: c.primary, textTransform: 'uppercase', letterSpacing: '0.8px' } }, p.type)
              ),
              React.createElement(window.lucide.Copy, { size: 14, color: c.textDim })
            ),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: c.text, margin: 0, lineHeight: '1.75', fontStyle: p.type === 'Dialogue Prompt' ? 'italic' : 'normal' } }, p.text)
          )
        )
      ),
      React.createElement('div', { style: { padding: '18px 20px', display: 'flex', gap: '10px' } },
        React.createElement('button', { style: { flex: 1, padding: '14px', borderRadius: '14px', background: c.card, border: `1px solid ${c.border}`, fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '600', color: c.textMuted, cursor: 'pointer' } }, 'Save All'),
        React.createElement('button', {
          onMouseDown: () => handlePress('to-trail'),
          onClick: () => setActiveTab('trails'),
          style: btn('to-trail', { flex: 1, padding: '14px', borderRadius: '14px', background: c.primaryDim, border: `1px solid ${c.primary}44`, fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '600', color: c.primary, cursor: 'pointer' })
        }, 'Add to Trail')
      )
    );

  // ── TRAILS SCREEN ─────────────────────────────────────────────
  const TrailsScreen = () => {
    if (activeTrail) {
      const trail = trails.find(t => t.id === activeTrail);
      return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: '110px' } },
        React.createElement('div', { style: { padding: '8px 20px 16px' } },
          React.createElement('button', { onClick: () => setActiveTrail(null), style: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: c.primary, fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '500', padding: '0 0 10px' } },
            React.createElement(window.lucide.ChevronLeft, { size: 18 }), 'Trails'
          ),
          React.createElement('div', { style: { width: '44px', height: '44px', borderRadius: '14px', background: `${trail.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', border: `1px solid ${trail.color}44` } },
            React.createElement(window.lucide.GitBranch, { size: 22, color: trail.color })
          ),
          React.createElement('h1', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '28px', fontWeight: '700', color: c.text, margin: '0 0 6px' } }, trail.name),
          React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: '0 0 14px', lineHeight: '1.6' } }, trail.desc),
          React.createElement('div', { style: { display: 'flex', gap: '6px' } },
            ...trail.tags.map(tag => React.createElement('span', { key: tag, style: { padding: '4px 10px', borderRadius: '20px', background: `${trail.color}22`, fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: '600', color: trail.color } }, tag))
          )
        ),
        React.createElement('div', { style: { padding: '0 20px', position: 'relative' } },
          React.createElement('div', { style: { position: 'absolute', left: '38px', top: 0, bottom: 0, width: '2px', background: `${trail.color}33` } }),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
            ...trail.moments.map((m, i) =>
              React.createElement('div', { key: i, style: { display: 'flex', gap: '16px', alignItems: 'flex-start' } },
                React.createElement('div', { style: { width: '18px', height: '18px', borderRadius: '50%', background: m.startsWith('+') ? c.card : trail.color, border: `2px solid ${trail.color}`, flexShrink: 0, marginTop: '16px', zIndex: 1 } }),
                m.startsWith('+')
                  ? React.createElement('div', { style: { flex: 1, padding: '14px', borderRadius: '14px', background: c.card, border: `1px dashed ${c.border}`, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' } },
                      React.createElement(window.lucide.Plus, { size: 15, color: c.textDim }),
                      React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted } }, m)
                    )
                  : React.createElement('div', { style: { flex: 1, padding: '14px', borderRadius: '14px', background: c.card, border: `1px solid ${c.border}` } },
                      React.createElement('h3', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '16px', fontWeight: '700', color: c.text, margin: '0 0 4px' } }, m),
                      React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: c.textMuted, margin: 0 } }, `${3 - i} prompts generated`)
                    )
              )
            )
          )
        )
      );
    }
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: '110px' } },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('h1', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '30px', fontWeight: '700', color: c.text, margin: '0 0 2px', letterSpacing: '-0.5px' } }, 'Creative Trails'),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: 0 } }, 'Evolving threads of ideas')
          ),
          React.createElement('button', {
            onMouseDown: () => handlePress('new-trail'),
            style: btn('new-trail', { width: '38px', height: '38px', borderRadius: '50%', background: c.primaryDim, border: `1px solid ${c.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' })
          }, React.createElement(window.lucide.Plus, { size: 18, color: c.primary }))
        )
      ),
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...trails.map(trail =>
          React.createElement('div', {
            key: trail.id,
            onClick: () => setActiveTrail(trail.id),
            onMouseDown: () => handlePress(`tr-${trail.id}`),
            style: btn(`tr-${trail.id}`, { background: c.card, borderRadius: '22px', border: `1px solid ${c.border}`, padding: '18px', cursor: 'pointer' })
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' } },
              React.createElement('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
                React.createElement('div', { style: { width: '44px', height: '44px', borderRadius: '14px', background: `${trail.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${trail.color}44` } },
                  React.createElement(window.lucide.GitBranch, { size: 20, color: trail.color })
                ),
                React.createElement('div', null,
                  React.createElement('h3', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '19px', fontWeight: '700', color: c.text, margin: '0 0 2px' } }, trail.name),
                  React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textMuted } }, `${trail.count} moments · ${trail.lastUpdated}`)
                )
              ),
              React.createElement(window.lucide.ChevronRight, { size: 18, color: c.textDim })
            ),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: '0 0 14px', lineHeight: '1.6' } }, trail.desc),
            React.createElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
              ...trail.moments.slice(0, 3).map((m, i) =>
                React.createElement('span', { key: i, style: { padding: '4px 10px', borderRadius: '20px', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', border: `1px solid ${c.border}`, fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textMuted, maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, m)
              )
            )
          )
        )
      )
    );
  };

  // ── MOOD MAP SCREEN ───────────────────────────────────────────
  const MoodScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: '110px' } },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h1', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '30px', fontWeight: '700', color: c.text, margin: '0 0 2px', letterSpacing: '-0.5px' } }, 'Mood Map'),
        React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: 0 } }, 'Emotional themes extracted from your moments')
      ),
      // Tab pills
      React.createElement('div', { style: { display: 'flex', gap: '8px', padding: '0 20px 18px', overflowX: 'auto' } },
        ...moodData.map((item, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => setActiveMoodIdx(i),
            style: { padding: '7px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: '600', background: activeMoodIdx === i ? c.primary : c.card, color: activeMoodIdx === i ? '#fff' : c.textMuted, transition: 'all 0.2s', flexShrink: 0 }
          }, item.emoji + ' ' + item.title.split(',')[0].split(':')[0])
        )
      ),
      // Active mood card
      React.createElement('div', { style: { padding: '0 20px', animation: 'fade-in 0.3s ease' } },
        (() => {
          const item = moodData[activeMoodIdx];
          return React.createElement('div', { style: { background: c.card, borderRadius: '24px', border: `1px solid ${c.border}`, padding: '22px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' } },
              React.createElement('span', { style: { fontSize: '28px' } }, item.emoji),
              React.createElement('div', null,
                React.createElement('h3', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '20px', fontWeight: '700', color: c.text, margin: '0 0 3px' } }, item.title),
                React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: c.textMuted, margin: 0 } }, item.mood)
              )
            ),
            // Palette
            React.createElement('div', { style: { marginBottom: '20px' } },
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: c.textMuted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' } }, 'Color Palette'),
              React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
                ...item.palette.map((p, i) =>
                  React.createElement('div', {
                    key: i,
                    title: p,
                    style: { width: i === 0 ? '52px' : '38px', height: '38px', borderRadius: '12px', background: p, border: `1px solid rgba(255,255,255,0.1)`, flexShrink: 0, transition: 'transform 0.2s', cursor: 'pointer' }
                  })
                )
              )
            ),
            // Bars
            React.createElement('div', { style: { marginBottom: '20px' } },
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: c.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' } }, 'Emotional Spectrum'),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
                ...Object.entries(item.bars).map(([key, val]) =>
                  React.createElement('div', { key, style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                    React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: c.textMuted, width: '65px' } }, key),
                    React.createElement('div', { style: { flex: 1, height: '7px', borderRadius: '4px', background: c.border, overflow: 'hidden' } },
                      React.createElement('div', { style: { width: `${val}%`, height: '100%', borderRadius: '4px', background: `linear-gradient(90deg, ${c.primary}, ${c.coral})`, transition: 'width 0.8s ease' } })
                    ),
                    React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textDim, width: '30px', textAlign: 'right' } }, `${val}%`)
                  )
                )
              )
            ),
            // Style note
            React.createElement('div', { style: { padding: '14px', borderRadius: '14px', background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', border: `1px solid ${c.border}` } },
              React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted, margin: '0 0 10px', fontStyle: 'italic', lineHeight: '1.65' } }, `"${item.note}"`),
              React.createElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
                ...item.tags.map(tag => React.createElement('span', { key: tag, style: { padding: '3px 10px', borderRadius: '20px', background: c.primaryDim, fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: '600', color: c.primary } }, tag))
              )
            )
          );
        })()
      ),
      // Style cues card
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', { style: { background: c.grad, borderRadius: '22px', border: `1px solid ${c.border}`, padding: '18px' } },
          React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: c.textMuted, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' } }, 'Scene Builder Preview'),
          React.createElement('p', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '16px', fontStyle: 'italic', color: c.text, lineHeight: '1.7', margin: '0 0 14px' } }, '"Neon bleeds. Coffee cools. The booth holds the shape of everyone who\'s ever sat in it."'),
          React.createElement('div', { style: { display: 'flex', gap: '10px' } },
            React.createElement('button', { style: { flex: 1, padding: '11px', borderRadius: '12px', background: c.primaryDim, border: `1px solid ${c.primary}44`, fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: '600', color: c.primary, cursor: 'pointer' } }, 'Expand Scene'),
            React.createElement('button', { style: { padding: '11px 14px', borderRadius: '12px', background: c.card, border: `1px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide.Share2, { size: 15, color: c.textDim })
            )
          )
        )
      )
    );

  // ── PROFILE SCREEN ────────────────────────────────────────────
  const ProfileScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: '110px' } },
      React.createElement('div', { style: { padding: '8px 20px 20px' } },
        React.createElement('h1', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '30px', fontWeight: '700', color: c.text, margin: '0 0 18px', letterSpacing: '-0.5px' } }, 'Profile'),
        // User card
        React.createElement('div', { style: { background: c.card, borderRadius: '22px', border: `1px solid ${c.border}`, padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '18px' } },
          React.createElement('div', { style: { width: '62px', height: '62px', borderRadius: '50%', background: `linear-gradient(135deg, ${c.primary}, ${c.coral})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 } }, '✨'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h2', { style: { fontFamily: "'Cormorant Garant',serif", fontSize: '22px', fontWeight: '700', color: c.text, margin: '0 0 2px' } }, 'Mara Voss'),
            React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: c.textMuted, margin: '0 0 10px' } }, 'Novelist & Visual Storyteller'),
            React.createElement('div', { style: { display: 'flex', gap: '16px' } },
              ...[['23', 'Moments'], ['3', 'Trails'], ['67', 'Prompts']].map(([n, l]) =>
                React.createElement('div', { key: l },
                  React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: c.primary } }, n),
                  React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: c.textMuted, marginLeft: '3px' } }, l)
                )
              )
            )
          )
        ),
        // Theme toggle
        React.createElement('div', { style: { background: c.card, borderRadius: '22px', border: `1px solid ${c.border}`, padding: '6px', marginBottom: '14px' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
              React.createElement('div', { style: { width: '38px', height: '38px', borderRadius: '11px', background: c.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(theme === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: c.primary })
              ),
              React.createElement('div', null,
                React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '600', color: c.text, margin: '0 0 1px' } }, 'Appearance'),
                React.createElement('p', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: c.textMuted, margin: 0 } }, theme === 'dark' ? 'Dark mode' : 'Light mode')
              )
            ),
            React.createElement('button', {
              onClick: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
              style: { width: '52px', height: '30px', borderRadius: '15px', background: theme === 'dark' ? c.primary : c.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s ease' }
            },
              React.createElement('div', { style: { width: '24px', height: '24px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: theme === 'dark' ? '25px' : '3px', transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' } })
            )
          )
        ),
        // Settings list
        React.createElement('div', { style: { background: c.card, borderRadius: '22px', border: `1px solid ${c.border}`, padding: '6px', marginBottom: '14px' } },
          ...[
            { Icon: window.lucide.Sparkles, label: 'Creative Focus', value: 'Novelist', color: c.primary },
            { Icon: window.lucide.Bell, label: 'Inspiration Nudges', value: 'Daily 9am', color: c.accent },
            { Icon: window.lucide.Globe, label: 'Language', value: 'English', color: c.teal },
            { Icon: window.lucide.Lock, label: 'Privacy', value: 'Private', color: c.coral },
          ].map(({ Icon, label, value, color }, i, arr) =>
            React.createElement('div', { key: label, style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                React.createElement('div', { style: { width: '38px', height: '38px', borderRadius: '11px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { size: 17, color })
                ),
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '500', color: c.text } }, label)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                React.createElement('span', { style: { fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: c.textMuted } }, value),
                React.createElement(window.lucide.ChevronRight, { size: 16, color: c.textDim })
              )
            )
          )
        ),
        React.createElement('button', { style: { width: '100%', padding: '15px', borderRadius: '16px', background: c.coralDim, border: `1px solid ${c.coral}33`, fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: '600', color: c.coral, cursor: 'pointer' } }, 'Sign Out')
      )
    );

  // ── RENDER ────────────────────────────────────────────────────
  const screens = { home: HomeScreen, alchemy: AlchemyScreen, trails: TrailsScreen, mood: MoodScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#120D1F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'DM Sans',sans-serif" }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: { width: '375px', height: '812px', borderRadius: '44px', background: c.bg, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 50px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)', transition: 'background 0.4s ease' }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
        React.createElement(ActiveScreen)
      ),
      React.createElement(NavBar)
    )
  );
}
