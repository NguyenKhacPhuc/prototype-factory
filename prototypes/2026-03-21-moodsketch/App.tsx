const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('capture');
  const [capturing, setCapturing] = useState(false);
  const [moodValue, setMoodValue] = useState(65);
  const [selectedColor, setSelectedColor] = useState('#B49FCC');
  const [showCardDetail, setShowCardDetail] = useState(null);
  const [remixSelected, setRemixSelected] = useState([]);
  const [remixResult, setRemixResult] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [captureStep, setCaptureStep] = useState(0);
  const [savedNotif, setSavedNotif] = useState(false);
  const [activeCollection, setActiveCollection] = useState(null);
  const [inputType, setInputType] = useState('mood');

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Serif+Display:ital@0;1&display=swap');
  `;

  const palette = {
    bg: '#0F0D14',
    surface: '#1A1724',
    surfaceAlt: '#221E2E',
    card: '#2A2438',
    cardHover: '#312D42',
    primary: '#B49FCC',
    primaryLight: '#D4C2E8',
    accent: '#E8956D',
    accentSoft: '#F2B99A',
    teal: '#7EC8C8',
    rose: '#E8808A',
    gold: '#DDB96A',
    text: '#F0EBF8',
    textMuted: '#9A92AA',
    textDim: '#5A5468',
    border: '#2E2A3A',
    glass: 'rgba(180,159,204,0.08)',
  };

  const moodColors = ['#B49FCC','#7EC8C8','#E8956D','#E8808A','#DDB96A','#90C4A0','#8AA8E8','#C4A0B0'];

  const ideaCards = [
    { id:1, title:'Rainy Commute', mood:'melancholic calm', color:'#7EC8C8', moodVal:42, emoji:'🌧️', time:'2h ago', tags:['design','palette'], prompt:'A grey-blue palette with soft textures — moisture on glass, muted streetlights, the comfort of being in motion while the world blurs.', type:'photo', category:'calm winter ideas' },
    { id:2, title:'Late-Night Memory', mood:'nostalgic warmth', color:'#DDB96A', moodVal:70, emoji:'🕯️', time:'yesterday', tags:['writing','scene'], prompt:'A scene opening with amber light — someone setting a table for two, the scrape of a chair, the smell of garlic in old oil. What were they hoping for?', type:'voice', category:'post-conversation reflections' },
    { id:3, title:'After the Argument', mood:'restless tension', color:'#E8808A', moodVal:28, emoji:'⚡', time:'2 days ago', tags:['journal','raw'], prompt:'Start mid-sentence. No context. Let the reader feel the static before they know what sparked it.', type:'mood', category:'post-conversation reflections' },
    { id:4, title:'Sunday Morning Light', mood:'slow contentment', color:'#90C4A0', moodVal:88, emoji:'☀️', time:'3 days ago', tags:['branding','soft'], prompt:'Sage green and cream — unhurried, linen textures, no sharp edges. A brand that feels like the first hour of a day off.', type:'color', category:'calm winter ideas' },
    { id:5, title:"Child's Drawing", mood:'pure wonder', color:'#8AA8E8', moodVal:92, emoji:'🎨', time:'4 days ago', tags:['keepsake','scrapbook'], prompt:"A four-year-old's astronaut riding a horse on the moon. Caption: 'He lives up there now and eats stars.' Keep it exactly as said.", type:'photo', category:'family moments' },
    { id:6, title:'Pre-Show Nerves', mood:'electric anticipation', color:'#B49FCC', moodVal:55, emoji:'🎭', time:'5 days ago', tags:['content','energy'], prompt:'The moment before the lights go down. Write it without using the word nervous, scared, or excited.', type:'voice', category:'creative momentum' },
  ];

  const collections = [
    { name:'calm winter ideas', count:4, color:'#7EC8C8', emoji:'❄️' },
    { name:'post-conversation reflections', count:5, color:'#E8808A', emoji:'💬' },
    { name:'family moments', count:3, color:'#DDB96A', emoji:'🌟' },
    { name:'creative momentum', count:6, color:'#B49FCC', emoji:'⚡' },
  ];

  const moodLabel = (v) => {
    if (v < 25) return 'heavy & still';
    if (v < 45) return 'tender & low';
    if (v < 60) return 'quietly present';
    if (v < 75) return 'open & warm';
    if (v < 90) return 'bright & full';
    return 'overflowing joy';
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  const handleSave = () => {
    handlePress('save');
    setSavedNotif(true);
    setTimeout(() => { setSavedNotif(false); setCaptureStep(0); setInputType('mood'); setMoodValue(65); setSelectedColor('#B49FCC'); }, 2200);
  };

  const toggleRemix = (id) => {
    setRemixSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const handleRemix = () => {
    handlePress('remix');
    const selected = ideaCards.filter(c => remixSelected.includes(c.id));
    const combEmoji = selected.map(c => c.emoji).join('');
    const combMood = selected.map(c => c.mood).join(' × ');
    const themes = selected.map(c => c.tags).flat();
    setRemixResult({ emoji: combEmoji, mood: combMood, themes: [...new Set(themes)], prompt: `A new creative direction from ${selected.map(c => c.title).join(', ')} — the quiet space between all three moods, where ${selected[0]?.mood} softens into something you didn't expect to find.` });
  };

  const s = {
    root: { fontFamily: "'DM Sans', sans-serif", background: '#06050A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    phone: { width: 375, height: 812, background: palette.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)' },
    statusBar: { height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px 0 28px', flexShrink: 0 },
    island: { width: 120, height: 32, background: '#000', borderRadius: 20, position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 20, boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' },
    time: { fontSize: 14, fontWeight: 600, color: palette.text, letterSpacing: '-0.3px' },
    icons: { display: 'flex', gap: 5, alignItems: 'center' },
    screen: { flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' },
    navBar: { height: 82, background: palette.surface, borderTop: `1px solid ${palette.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 12, flexShrink: 0 },
    navItem: (active) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s', opacity: active ? 1 : 0.4 }),
    navLabel: (active) => ({ fontSize: 10, color: active ? palette.primary : palette.textMuted, fontWeight: active ? 600 : 400, letterSpacing: '0.3px' }),
    card: { background: palette.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${palette.border}`, transition: 'all 0.2s' },
    btn: (id, color) => ({ background: color || palette.primary, color: pressedBtn === id ? 'rgba(0,0,0,0.6)' : palette.bg, borderRadius: 14, padding: '14px 24px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)', transition: 'all 0.15s', width: '100%' }),
    tag: (color) => ({ background: color ? color + '22' : palette.glass, color: color || palette.primaryLight, fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20, border: `1px solid ${color ? color + '33' : 'transparent'}` }),
    sectionTitle: { fontSize: 22, fontWeight: 600, color: palette.text, fontFamily: "'DM Serif Display', serif", marginBottom: 4 },
    subTitle: { fontSize: 13, color: palette.textMuted, marginBottom: 20 },
    notif: { position: 'absolute', top: 70, left: '50%', transform: 'translateX(-50%)', background: palette.primary, color: palette.bg, padding: '10px 20px', borderRadius: 30, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(180,159,204,0.4)', transition: 'all 0.3s', opacity: savedNotif ? 1 : 0 },
  };

  // CAPTURE SCREEN
  const CaptureScreen = () => (
    <div style={{ padding: '0 0 16px 0' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 12, color: palette.primary, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>New Idea Seed</p>
        <h1 style={{ ...s.sectionTitle, marginBottom: 2 }}>What are you<br /><em>feeling right now?</em></h1>
        <p style={{ ...s.subTitle }}>Capture a moment before it fades</p>
      </div>

      {/* Input type selector */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', marginBottom: 16 }}>
        {[['mood','Mood'],['voice','Voice'],['color','Color'],['photo','Photo']].map(([type, label]) => (
          <button key={type} onClick={() => { setInputType(type); handlePress('itype'+type); }} style={{ flex: 1, padding: '8px 0', borderRadius: 12, border: `1px solid ${inputType===type ? palette.primary : palette.border}`, background: inputType===type ? palette.primary+'22' : 'transparent', color: inputType===type ? palette.primary : palette.textMuted, fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', transform: pressedBtn==='itype'+type ? 'scale(0.94)' : 'scale(1)' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Mood Slider */}
      {inputType === 'mood' && (
        <div style={{ ...s.card, margin: '0 20px 16px', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: palette.textMuted }}>Emotional tone</span>
            <span style={{ fontSize: 13, color: palette.primary, fontWeight: 600 }}>{moodLabel(moodValue)}</span>
          </div>
          <div style={{ position: 'relative', height: 6, background: palette.border, borderRadius: 3, marginBottom: 20 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${moodValue}%`, background: `linear-gradient(90deg, #7EC8C8, ${selectedColor})`, borderRadius: 3, transition: 'width 0.1s' }} />
            <input type="range" min="0" max="100" value={moodValue} onChange={e => setMoodValue(+e.target.value)} style={{ position: 'absolute', top: -8, left: 0, width: '100%', opacity: 0, cursor: 'pointer', height: 22 }} />
            <div style={{ position: 'absolute', top: '50%', left: `${moodValue}%`, transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: selectedColor, border: `3px solid ${palette.bg}`, boxShadow: `0 0 0 2px ${selectedColor}`, transition: 'left 0.1s' }} />
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {['heavy','tender','still','searching','open','bright','buzzing','full'].map(w => (
              <span key={w} style={{ ...s.tag(), fontSize: 11 }}>{w}</span>
            ))}
          </div>
        </div>
      )}

      {/* Voice */}
      {inputType === 'voice' && (
        <div style={{ ...s.card, margin: '0 20px 16px', padding: 20, textAlign: 'center' }}>
          <div onClick={() => { setCapturing(!capturing); handlePress('mic'); }} style={{ width: 80, height: 80, borderRadius: '50%', background: capturing ? palette.accent + '22' : palette.primary + '22', border: `2px solid ${capturing ? palette.accent : palette.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', cursor: 'pointer', transform: pressedBtn === 'mic' ? 'scale(0.92)' : 'scale(1)', transition: 'all 0.2s', boxShadow: capturing ? `0 0 30px ${palette.accent}44` : 'none' }}>
            {React.createElement(capturing ? window.lucide.Square : window.lucide.Mic, { size: 32, color: capturing ? palette.accent : palette.primary })}
          </div>
          {capturing ? (
            <div>
              <p style={{ color: palette.accent, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Recording... 0:07</p>
              <div style={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'flex-end', height: 24 }}>
                {[8,14,20,12,18,24,10,16,22,8,15,20].map((h,i) => (
                  <div key={i} style={{ width: 3, height: h, background: palette.accent, borderRadius: 2, opacity: 0.6 + i * 0.03 }} />
                ))}
              </div>
            </div>
          ) : (
            <p style={{ color: palette.textMuted, fontSize: 13 }}>Tap to capture a voice snippet<br /><span style={{ fontSize: 11, color: palette.textDim }}>30 seconds max</span></p>
          )}
        </div>
      )}

      {/* Color */}
      {inputType === 'color' && (
        <div style={{ ...s.card, margin: '0 20px 16px', padding: 20 }}>
          <p style={{ fontSize: 13, color: palette.textMuted, marginBottom: 12 }}>Pick a color that matches this moment</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {moodColors.map(c => (
              <button key={c} onClick={() => { setSelectedColor(c); handlePress('col'+c); }} style={{ width: 40, height: 40, borderRadius: 12, background: c, border: `3px solid ${selectedColor === c ? palette.text : 'transparent'}`, cursor: 'pointer', transform: pressedBtn === 'col'+c ? 'scale(0.9)' : selectedColor === c ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s', boxShadow: selectedColor === c ? `0 4px 16px ${c}66` : 'none' }} />
            ))}
          </div>
          <div style={{ height: 60, borderRadius: 12, background: `linear-gradient(135deg, ${selectedColor}66, ${selectedColor}22)`, border: `1px solid ${selectedColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: selectedColor, fontWeight: 600, fontSize: 13 }}>{selectedColor} · This feels like {moodLabel(moodValue)}</span>
          </div>
        </div>
      )}

      {/* Photo */}
      {inputType === 'photo' && (
        <div style={{ ...s.card, margin: '0 20px 16px', padding: 20 }}>
          <div style={{ height: 140, borderRadius: 12, background: `linear-gradient(135deg, ${palette.surfaceAlt}, ${palette.card})`, border: `2px dashed ${palette.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 12 }}
            onClick={() => handlePress('photo')}>
            {React.createElement(window.lucide.Camera, { size: 32, color: palette.textDim })}
            <span style={{ color: palette.textDim, fontSize: 13 }}>Tap to add a photo</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['🌧️','🕯️','🌿','📖'].map((e,i) => (
              <div key={i} style={{ flex: 1, height: 60, borderRadius: 10, background: palette.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, cursor: 'pointer' }}>{e}</div>
            ))}
          </div>
        </div>
      )}

      {/* Color picker row */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: palette.textMuted, marginBottom: 10, fontWeight: 500 }}>Mood color</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {moodColors.map(c => (
            <button key={c} onClick={() => setSelectedColor(c)} style={{ width: 28, height: 28, borderRadius: 8, background: c, border: `2px solid ${selectedColor === c ? palette.text : 'transparent'}`, cursor: 'pointer', transition: 'all 0.2s', transform: selectedColor === c ? 'scale(1.15)' : 'scale(1)', flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: palette.textMuted, marginBottom: 10, fontWeight: 500 }}>Quick tags</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['writing','design','journal','branding','keepsake','social','scrapbook','scene'].map(t => (
            <span key={t} style={{ ...s.tag(palette.primary), fontSize: 12, padding: '5px 12px', cursor: 'pointer' }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <button onClick={handleSave} style={{ ...s.btn('save', palette.primary), fontSize: 15 }}>
          Save Idea Seed ✦
        </button>
      </div>
    </div>
  );

  // LIBRARY SCREEN
  const LibraryScreen = () => (
    <div style={{ padding: '0 0 16px 0' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 12, color: palette.primary, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Your Library</p>
        <h1 style={{ ...s.sectionTitle, marginBottom: 2 }}>Idea <em>Seeds</em></h1>
        <p style={{ ...s.subTitle }}>6 seeds · 4 collections</p>
      </div>

      {!activeCollection ? (
        <>
          {/* Collections */}
          <div style={{ padding: '0 20px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: palette.textMuted, fontWeight: 500, marginBottom: 12 }}>Collections</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {collections.map(col => (
                <button key={col.name} onClick={() => { setActiveCollection(col.name); handlePress('col'+col.name); }} style={{ background: col.color + '15', border: `1px solid ${col.color}33`, borderRadius: 16, padding: '14px 14px', textAlign: 'left', cursor: 'pointer', transform: pressedBtn === 'col'+col.name ? 'scale(0.96)' : 'scale(1)', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: 22 }}>{col.emoji}</span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: palette.text, marginTop: 8, marginBottom: 2, lineHeight: 1.3 }}>{col.name}</p>
                  <p style={{ fontSize: 11, color: col.color }}>{col.count} seeds</p>
                </button>
              ))}
            </div>
          </div>

          {/* All cards */}
          <div style={{ padding: '0 20px' }}>
            <p style={{ fontSize: 13, color: palette.textMuted, fontWeight: 500, marginBottom: 12 }}>Recent seeds</p>
            {ideaCards.slice(0,4).map(card => (
              <button key={card.id} onClick={() => { setShowCardDetail(card); handlePress('card'+card.id); }} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: 'pointer', transform: pressedBtn === 'card'+card.id ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.2s', padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: card.color + '33', border: `1px solid ${card.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{card.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{card.title}</p>
                      <span style={{ fontSize: 11, color: palette.textDim }}>{card.time}</span>
                    </div>
                    <p style={{ fontSize: 12, color: card.color, marginBottom: 6 }}>{card.mood}</p>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {card.tags.map(t => <span key={t} style={{ ...s.tag(card.color), fontSize: 10 }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: '0 20px' }}>
          <button onClick={() => setActiveCollection(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: palette.primary, cursor: 'pointer', fontSize: 13, marginBottom: 16, padding: 0 }}>
            {React.createElement(window.lucide.ChevronLeft, { size: 16 })} Back to collections
          </button>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 28 }}>{collections.find(c => c.name === activeCollection)?.emoji}</span>
            <div>
              <p style={{ fontSize: 16, fontWeight: 600, color: palette.text, textTransform: 'capitalize' }}>{activeCollection}</p>
              <p style={{ fontSize: 12, color: palette.textMuted }}>{ideaCards.filter(c => c.category === activeCollection).length} seeds in this collection</p>
            </div>
          </div>
          {ideaCards.filter(c => c.category === activeCollection).map(card => (
            <button key={card.id} onClick={() => { setShowCardDetail(card); }} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', padding: '14px 16px', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: card.color + '33', border: `1px solid ${card.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{card.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: palette.text, marginBottom: 3 }}>{card.title}</p>
                  <p style={{ fontSize: 12, color: card.color, marginBottom: 6 }}>{card.mood}</p>
                  <p style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.5 }}>{card.prompt.slice(0, 80)}...</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Card Detail Modal */}
      {showCardDetail && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,5,10,0.92)', zIndex: 50, display: 'flex', flexDirection: 'column', padding: 20, overflowY: 'auto' }}>
          <button onClick={() => setShowCardDetail(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: palette.primary, cursor: 'pointer', fontSize: 13, marginBottom: 20, padding: 0 }}>
            {React.createElement(window.lucide.X, { size: 16 })} Close
          </button>
          <div style={{ width: '100%', height: 160, borderRadius: 20, background: `linear-gradient(135deg, ${showCardDetail.color}33, ${showCardDetail.color}11)`, border: `1px solid ${showCardDetail.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, marginBottom: 20 }}>
            {showCardDetail.emoji}
          </div>
          <p style={{ fontSize: 11, color: showCardDetail.color, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{showCardDetail.mood}</p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: palette.text, fontFamily: "'DM Serif Display', serif", marginBottom: 6 }}>{showCardDetail.title}</h2>
          <p style={{ fontSize: 12, color: palette.textDim, marginBottom: 16 }}>{showCardDetail.time} · captured as {showCardDetail.type}</p>
          <div style={{ ...s.card, background: showCardDetail.color + '0F', border: `1px solid ${showCardDetail.color}22`, marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: showCardDetail.color, fontWeight: 500, marginBottom: 6 }}>✦ Generated Prompt</p>
            <p style={{ fontSize: 14, color: palette.text, lineHeight: 1.7, fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>{showCardDetail.prompt}</p>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {showCardDetail.tags.map(t => <span key={t} style={{ ...s.tag(showCardDetail.color) }}>{t}</span>)}
          </div>
          <p style={{ fontSize: 12, color: palette.textMuted, fontWeight: 500, marginBottom: 10 }}>Use this prompt for</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
            {['Writing','Design','Journal','Social post'].map(f => (
              <button key={f} onClick={() => handlePress('fmt'+f)} style={{ padding: '10px', borderRadius: 12, background: palette.surfaceAlt, border: `1px solid ${palette.border}`, color: palette.textMuted, fontSize: 12, fontWeight: 500, cursor: 'pointer', transform: pressedBtn === 'fmt'+f ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.2s' }}>{f}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setShowCardDetail(null)} style={{ ...s.btn('close2', showCardDetail.color), flex: 1 }}>Use Prompt</button>
            <button onClick={() => { handlePress('share'); setShowCardDetail(null); }} style={{ padding: '14px', borderRadius: 14, background: palette.surfaceAlt, border: `1px solid ${palette.border}`, cursor: 'pointer', transform: pressedBtn === 'share' ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.2s' }}>
              {React.createElement(window.lucide.Share2, { size: 18, color: palette.textMuted })}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // REMIX SCREEN
  const RemixScreen = () => (
    <div style={{ padding: '0 0 16px 0' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 12, color: palette.accent, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Memory Remix</p>
        <h1 style={{ ...s.sectionTitle, marginBottom: 2 }}>Combine &amp; <em>rediscover</em></h1>
        <p style={{ ...s.subTitle }}>Select up to 3 seeds to remix into something new</p>
      </div>

      {/* Remix result */}
      {remixResult && (
        <div style={{ margin: '0 20px 20px', padding: 20, borderRadius: 20, background: `linear-gradient(135deg, ${palette.accent}15, ${palette.primary}10)`, border: `1px solid ${palette.accent}33` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 11, color: palette.accent, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>✦ Remix Result</p>
              <p style={{ fontSize: 24, marginBottom: 4 }}>{remixResult.emoji}</p>
              <p style={{ fontSize: 12, color: palette.accentSoft, fontStyle: 'italic', marginBottom: 8 }}>{remixResult.mood}</p>
            </div>
            <button onClick={() => { setRemixResult(null); setRemixSelected([]); }} style={{ background: 'none', border: 'none', color: palette.textDim, cursor: 'pointer' }}>
              {React.createElement(window.lucide.X, { size: 16 })}
            </button>
          </div>
          <p style={{ fontSize: 13, color: palette.text, lineHeight: 1.7, fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', marginBottom: 12 }}>{remixResult.prompt}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {remixResult.themes.map(t => <span key={t} style={{ ...s.tag(palette.accent), fontSize: 11 }}>{t}</span>)}
          </div>
          <button onClick={() => handlePress('savemix')} style={{ ...s.btn('savemix', palette.accent), fontSize: 13 }}>Save as New Seed</button>
        </div>
      )}

      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: 12, color: palette.textMuted, fontWeight: 500, marginBottom: 12 }}>
          {remixSelected.length === 0 ? 'Your seeds' : `${remixSelected.length} selected`}
          {remixSelected.length > 0 && <span style={{ color: palette.accent }}> · tap again to deselect</span>}
        </p>
        {ideaCards.map(card => {
          const sel = remixSelected.includes(card.id);
          return (
            <button key={card.id} onClick={() => { toggleRemix(card.id); handlePress('remix'+card.id); }} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: 'pointer', border: `1px solid ${sel ? card.color : palette.border}`, background: sel ? card.color + '15' : palette.card, transform: pressedBtn === 'remix'+card.id ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.2s', padding: '12px 14px', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: card.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{card.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>{card.title}</p>
                    {sel && React.createElement(window.lucide.CheckCircle2, { size: 16, color: card.color })}
                  </div>
                  <p style={{ fontSize: 11, color: palette.textMuted }}>{card.mood}</p>
                </div>
              </div>
            </button>
          );
        })}

        {remixSelected.length >= 2 && !remixResult && (
          <button onClick={handleRemix} style={{ ...s.btn('remix', palette.accent), marginTop: 8 }}>
            ✦ Remix {remixSelected.length} Seeds
          </button>
        )}
      </div>
    </div>
  );

  // INSIGHTS SCREEN
  const InsightsScreen = () => (
    <div style={{ padding: '0 0 16px 0' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 12, color: palette.teal, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Your Patterns</p>
        <h1 style={{ ...s.sectionTitle, marginBottom: 2 }}>Mood <em>Insights</em></h1>
        <p style={{ ...s.subTitle }}>Patterns from your last 30 days</p>
      </div>

      {/* Mood wave chart */}
      <div style={{ margin: '0 20px 20px', padding: 20, borderRadius: 20, background: palette.card, border: `1px solid ${palette.border}` }}>
        <p style={{ fontSize: 12, color: palette.textMuted, fontWeight: 500, marginBottom: 14 }}>Emotional tone — this week</p>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
          {[42, 65, 38, 72, 55, 88, 62].map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: v * 0.6, borderRadius: 4, background: v > 65 ? palette.primary + '99' : v > 45 ? palette.teal + '88' : palette.rose + '77', transition: 'height 0.3s' }} />
              <span style={{ fontSize: 9, color: palette.textDim }}>{'SMTWTFS'[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color palette this month */}
      <div style={{ margin: '0 20px 20px', padding: 20, borderRadius: 20, background: palette.card, border: `1px solid ${palette.border}` }}>
        <p style={{ fontSize: 12, color: palette.textMuted, fontWeight: 500, marginBottom: 12 }}>Your mood palette — March</p>
        <div style={{ display: 'flex', gap: 0, height: 36, borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
          {[['#7EC8C8',35],['#B49FCC',25],['#DDB96A',20],['#E8808A',12],['#90C4A0',8]].map(([c,w]) => (
            <div key={c} style={{ height: '100%', width: `${w}%`, background: c }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[['#7EC8C8','calm'],['#B49FCC','tender'],['#DDB96A','warm']].map(([c,l]) => (
            <div key={c} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
              <span style={{ fontSize: 11, color: palette.textMuted }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top themes */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: palette.textMuted, fontWeight: 500, marginBottom: 12 }}>Most captured themes</p>
        {[['writing',8,palette.primary],['design',6,palette.teal],['journal',5,palette.gold],['keepsake',3,palette.rose]].map(([theme,count,color]) => (
          <div key={theme} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: palette.textMuted, width: 60 }}>{theme}</span>
            <div style={{ flex: 1, height: 6, background: palette.border, borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${(count/8)*100}%`, background: color, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 12, color: color, fontWeight: 600, width: 20, textAlign: 'right' }}>{count}</span>
          </div>
        ))}
      </div>

      {/* Profile avatar */}
      <div style={{ margin: '0 20px', padding: 16, borderRadius: 20, background: palette.card, border: `1px solid ${palette.border}`, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🌙</div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>Your creative self</p>
          <p style={{ fontSize: 12, color: palette.textMuted }}>6 seeds · 4 collections · 2 remixes</p>
          <p style={{ fontSize: 11, color: palette.primary, marginTop: 3 }}>Most creative: evenings & rainy days</p>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'capture', label: 'Capture', icon: window.lucide.Feather },
    { id: 'library', label: 'Library', icon: window.lucide.BookOpen },
    { id: 'remix', label: 'Remix', icon: window.lucide.Shuffle },
    { id: 'insights', label: 'Insights', icon: window.lucide.Sparkles },
  ];

  return (
    <div style={s.root}>
      <style>{fontStyle}</style>
      <style>{`
        *::-webkit-scrollbar { display: none; }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: ${selectedColor}; cursor: pointer; }
      `}</style>

      {/* Notification */}
      <div style={s.notif}>✦ Idea seed saved!</div>

      {/* Phone */}
      <div style={s.phone}>
        {/* Dynamic Island */}
        <div style={s.island} />

        {/* Status Bar */}
        <div style={s.statusBar}>
          <span style={s.time}>9:41</span>
          <div style={s.icons}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: palette.text })}
            {React.createElement(window.lucide.Signal, { size: 14, color: palette.text })}
            {React.createElement(window.lucide.BatteryFull, { size: 16, color: palette.text })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(812px - 50px - 82px)', overflow: 'hidden' }}>
          <div style={s.screen}>
            {activeTab === 'capture' && <CaptureScreen />}
            {activeTab === 'library' && <LibraryScreen />}
            {activeTab === 'remix' && <RemixScreen />}
            {activeTab === 'insights' && <InsightsScreen />}
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={s.navBar}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowCardDetail(null); setActiveCollection(null); handlePress('nav'+tab.id); }} style={{ ...s.navItem(activeTab === tab.id), background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.2s', transform: pressedBtn === 'nav'+tab.id ? 'scale(0.9)' : activeTab === tab.id ? 'scale(1.05)' : 'scale(1)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: activeTab === tab.id ? palette.primary + '22' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                {React.createElement(tab.icon, { size: 20, color: activeTab === tab.id ? palette.primary : palette.textMuted, strokeWidth: activeTab === tab.id ? 2 : 1.5 })}
              </div>
              <span style={s.navLabel(activeTab === tab.id)}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
