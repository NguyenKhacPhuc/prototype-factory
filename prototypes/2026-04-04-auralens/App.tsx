const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0618', surface: '#150D30', surfaceAlt: '#1E1445',
    border: '#B87333', borderSubtle: '#3A2255',
    text: '#EDE8F5', textMuted: '#9B8CB8',
    accent: '#B87333', accentLight: '#D4956A',
    aubergine: '#4A1050', lavender: '#C4B5D8',
    navBg: '#0A0618', promptCard: '#1C0E40',
  },
  light: {
    bg: '#EDE8F5', surface: '#FFFFFF', surfaceAlt: '#F5F0FF',
    border: '#B87333', borderSubtle: '#C4B5D8',
    text: '#150D30', textMuted: '#6B5C80',
    accent: '#B87333', accentLight: '#D4956A',
    aubergine: '#4A1050', lavender: '#C4B5D8',
    navBg: '#FFFFFF', promptCard: '#F0EBF8',
  }
};

const vistaEntries = [
  { id: 1, title: "Neon in Rain", theme: "Urban Symphony", date: "Mar 28", type: "photo", auraScore: 94, analysis: "Your eye gravitates toward chromatic aberration at the threshold of visibility — a trait shared with photographer Saul Leiter's luminous street work.", emoji: '🌧️' },
  { id: 2, title: "Construction Grid", theme: "Urban Symphony", date: "Mar 25", type: "text", auraScore: 87, analysis: "Strong geometric intuition; your framing connects to Mondrian's De Stijl philosophy of ordered abstraction from chaotic reality.", emoji: '🏗️' },
  { id: 3, title: "Echo Texture", theme: "Urban Symphony", date: "Mar 21", type: "audio", auraScore: 91, analysis: "Your sonic capture reveals a layered awareness of urban soundscapes reminiscent of Pierre Schaeffer's musique concrète compositions.", emoji: '🎵' },
  { id: 4, title: "Shadow Geometry", theme: "Urban Symphony", date: "Mar 18", type: "photo", auraScore: 88, analysis: "You instinctively frame negative space over positive form — deeply aligned with the Japanese concept of 'Ma' (間), the art of the interval.", emoji: '🌑' },
  { id: 5, title: "Market Rhythm", theme: "Urban Symphony", date: "Mar 15", type: "photo", auraScore: 82, analysis: "Pattern recognition in chaos — your approach mirrors principles of emergent systems theory and complexity science.", emoji: '🎭' },
  { id: 6, title: "Steel & Rust", theme: "Urban Symphony", date: "Mar 12", type: "text", auraScore: 79, analysis: "Your prose shows a Ruskin-esque attention to the beauty found in industrial decay and oxidation's slow transformation.", emoji: '⚙️' },
];

const auraTraits = [
  { trait: "Chromatic Sensitivity", score: 92, desc: "You notice subtle color relationships invisible to most observers — a rare perceptual gift.", link: "Impressionist color theory" },
  { trait: "Geometric Intuition", score: 87, desc: "Your compositions demonstrate a natural grasp of structural harmony within apparent disorder.", link: "De Stijl movement principles" },
  { trait: "Temporal Awareness", score: 79, desc: "You capture moments at their threshold — neither fully formed nor dissolved into the past.", link: "Buddhist impermanence (Anicca)" },
];

const tiers = [
  { id: 1, name: 'OBSERVER', emoji: '👁️', desc: 'Just beginning to look', min: 0 },
  { id: 2, name: 'AESTHETE', emoji: '🎨', desc: 'Pattern seeker', min: 10 },
  { id: 3, name: 'CURATOR', emoji: '🏛️', desc: 'Context builder', min: 25 },
  { id: 4, name: 'VISIONARY', emoji: '✦', desc: 'Perspective shaper', min: 50 },
  { id: 5, name: 'LUMINARY', emoji: '◈', desc: 'Light caster', min: 100 },
];

function HomeScreen({ t }) {
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
      {/* Parallax background blocks */}
      <div style={{ position: 'absolute', top: -30 + scrollY * 0.4, right: -40, width: 180, height: 180, background: t.aubergine, opacity: 0.22, transform: 'rotate(12deg)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 130 - scrollY * 0.2, left: -50, width: 130, height: 130, border: `4px solid ${t.accent}`, opacity: 0.12, transform: 'rotate(-6deg)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '8px 16px 120px' }}>
        {/* Season Banner — asymmetric */}
        <div style={{ background: t.surface, border: `3px solid ${t.accent}`, boxShadow: `6px 6px 0 #000`, padding: '20px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 90, height: 90, background: t.aubergine, opacity: 0.35, transform: 'translate(25px,-25px)' }} />
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.28em', color: t.accent, marginBottom: 6 }}>SEASON 2 — ACTIVE</div>
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 30, color: t.text, lineHeight: 0.95, marginBottom: 14 }}>URBAN<br/>SYMPHONY</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 50, height: 3, background: t.accent }} />
            <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted }}>23 of 90 days</span>
          </div>
          <div style={{ background: t.borderSubtle, height: 5 }}>
            <div style={{ width: '25%', height: '100%', background: t.accent }} />
          </div>
        </div>

        {/* Today's Prompt — overlapping label */}
        <div style={{ background: t.promptCard, border: `3px solid ${t.text}`, boxShadow: `5px 5px 0 ${t.accent}`, padding: '20px', marginBottom: 16, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -12, left: 16, background: t.accent, color: '#000', fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.22em', padding: '4px 10px' }}>TODAY'S PROMPT</div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 19, color: t.text, lineHeight: 1.15, marginBottom: 8 }}>Find a reflection that distorts reality</div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 12, color: t.textMuted, lineHeight: 1.55, marginBottom: 14 }}>Look for surfaces that mirror the world in unexpected ways — puddles, chrome, glass, shadows.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: t.accent, color: '#000', fontFamily: "'Archivo Black',sans-serif", fontSize: 11, letterSpacing: '0.18em', padding: '11px', textAlign: 'center', cursor: 'pointer' }}>CAPTURE NOW</div>
              <div style={{ padding: '11px 12px', border: `2px solid ${t.borderSubtle}`, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                {React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[{ v: '89', l: 'AURA SCORE' }, { v: '23', l: 'SUBMISSIONS' }].map(s => (
            <div key={s.l} style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '14px 12px', boxShadow: `3px 3px 0 ${t.accent}` }}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 32, color: t.accent, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 9, color: t.textMuted, letterSpacing: '0.14em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tier status */}
        <div style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.22em', color: t.textMuted, marginBottom: 4 }}>CURATOR TIER</div>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 17, color: t.text }}>AESTHETE 🎨</div>
            </div>
            <div style={{ background: t.accent, color: '#000', fontFamily: "'Archivo Black',sans-serif", fontSize: 9, padding: '4px 8px', letterSpacing: '0.16em' }}>TIER II</div>
          </div>
          <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted, marginBottom: 8 }}>2 submissions to unlock CURATOR tier</div>
          <div style={{ background: t.borderSubtle, height: 4 }}>
            <div style={{ width: '80%', height: '100%', background: t.accent }} />
          </div>
        </div>

        {/* Aura Insights label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 14, height: 3, background: t.accent }} />
          <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.22em', color: t.textMuted }}>AURA INSIGHTS</span>
        </div>

        {auraTraits.map(a => (
          <div key={a.trait} style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '14px', marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 13, color: t.text, flex: 1, paddingRight: 8 }}>{a.trait}</div>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 22, color: t.accent, lineHeight: 1 }}>{a.score}</div>
            </div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 12, color: t.textMuted, lineHeight: 1.5, marginBottom: 6 }}>{a.desc}</div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 10, color: t.accent, letterSpacing: '0.06em' }}>↗ {a.link}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaptureScreen({ t }) {
  const [mode, setMode] = useState('photo');
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const [btnDown, setBtnDown] = useState(false);
  const modes = [
    { id: 'photo', label: 'PHOTO', icon: window.lucide.Camera },
    { id: 'audio', label: 'AUDIO', icon: window.lucide.Mic },
    { id: 'text', label: 'TEXT', icon: window.lucide.Type },
  ];

  if (done) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ border: `4px solid ${t.accent}`, boxShadow: `8px 8px 0 #000`, padding: 32, background: t.surface, width: '100%', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 52, color: t.accent, marginBottom: 10, lineHeight: 1 }}>✦</div>
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 24, color: t.text, marginBottom: 8 }}>SUBMITTED</div>
        <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 20 }}>Your Aura Analysis is being prepared. A deeply personal insight into your perception awaits.</div>
        <div onClick={() => { setDone(false); setText(''); }} style={{ background: t.accent, color: '#000', fontFamily: "'Archivo Black',sans-serif", fontSize: 12, letterSpacing: '0.18em', padding: '14px', cursor: 'pointer', border: '2px solid #000' }}>CAPTURE AGAIN</div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 120px' }}>
      {/* Prompt reminder */}
      <div style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        {React.createElement(window.lucide.Eye, { size: 15, color: t.accent })}
        <div>
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 12, color: t.text }}>Find a reflection that distorts reality</div>
          <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 9, color: t.textMuted, marginTop: 2, letterSpacing: '0.1em' }}>DAY 23 — URBAN SYMPHONY</div>
        </div>
      </div>

      {/* Mode selector */}
      <div style={{ display: 'flex', border: `2px solid ${t.accent}`, marginBottom: 14 }}>
        {modes.map((m, i) => (
          <div key={m.id} onClick={() => setMode(m.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0', background: mode === m.id ? t.accent : 'transparent', borderRight: i < 2 ? `2px solid ${t.accent}` : 'none', cursor: 'pointer' }}>
            {React.createElement(m.icon, { size: 15, color: mode === m.id ? '#000' : t.textMuted })}
            <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.16em', color: mode === m.id ? '#000' : t.textMuted }}>{m.label}</span>
          </div>
        ))}
      </div>

      {mode === 'photo' && (
        <div style={{ background: t.surface, border: `3px solid ${t.text}`, boxShadow: `6px 6px 0 ${t.accent}`, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 14, position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: t.borderSubtle, opacity: 0.5 }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: t.borderSubtle, opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 10, left: 10, width: 22, height: 22, borderTop: `3px solid ${t.accent}`, borderLeft: `3px solid ${t.accent}` }} />
          <div style={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderTop: `3px solid ${t.accent}`, borderRight: `3px solid ${t.accent}` }} />
          <div style={{ position: 'absolute', bottom: 10, left: 10, width: 22, height: 22, borderBottom: `3px solid ${t.accent}`, borderLeft: `3px solid ${t.accent}` }} />
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: 22, height: 22, borderBottom: `3px solid ${t.accent}`, borderRight: `3px solid ${t.accent}` }} />
          {React.createElement(window.lucide.Camera, { size: 36, color: t.textMuted })}
          <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted, marginTop: 10, letterSpacing: '0.1em' }}>TAP TO CAPTURE</div>
        </div>
      )}

      {mode === 'audio' && (
        <div style={{ background: t.surface, border: `3px solid ${t.text}`, boxShadow: `6px 6px 0 ${t.accent}`, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, marginBottom: 14 }}>
          <div style={{ width: 80, height: 80, border: `4px solid ${t.accent}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `3px 3px 0 ${t.accent}` }}>
            {React.createElement(window.lucide.Mic, { size: 32, color: t.accent })}
          </div>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 46 }}>
            {[12,24,18,34,14,28,20,36,12,26,18,34,14,22,10].map((h, i) => (
              <div key={i} style={{ width: 4, height: h, background: t.accent, opacity: 0.65 }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted, letterSpacing: '0.1em' }}>HOLD TO RECORD</div>
        </div>
      )}

      {mode === 'text' && (
        <div style={{ background: t.surface, border: `3px solid ${t.text}`, boxShadow: `6px 6px 0 ${t.accent}`, marginBottom: 14, position: 'relative' }}>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Describe what you observe. Let your perception unfold freely..." style={{ width: '100%', height: 220, background: 'transparent', border: 'none', outline: 'none', padding: '16px', fontFamily: "'Archivo',sans-serif", fontSize: 14, color: t.text, resize: 'none', lineHeight: 1.6 }} />
          <div style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: "'Archivo',sans-serif", fontSize: 9, color: t.textMuted }}>{text.length}/500</div>
        </div>
      )}

      {/* AI hint */}
      <div style={{ border: `1px solid ${t.borderSubtle}`, padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 14 }}>
        {React.createElement(window.lucide.Sparkles, { size: 13, color: t.accent })}
        <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted, lineHeight: 1.55, fontStyle: 'italic' }}>Consider how Monet's series paintings capture light's transformation across time and season...</div>
      </div>

      <div
        onClick={() => setDone(true)}
        onMouseDown={() => setBtnDown(true)}
        onMouseUp={() => setBtnDown(false)}
        onMouseLeave={() => setBtnDown(false)}
        style={{ background: t.accent, color: '#000', fontFamily: "'Archivo Black',sans-serif", fontSize: 13, letterSpacing: '0.22em', padding: '16px', textAlign: 'center', cursor: 'pointer', border: '2px solid #000', boxShadow: btnDown ? '1px 1px 0 #000' : '5px 5px 0 #000', transform: btnDown ? 'translate(4px,4px)' : 'translate(0,0)', transition: 'all 0.1s' }}
      >SUBMIT TO AURA</div>
    </div>
  );
}

function VistaLogScreen({ t }) {
  const [sel, setSel] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  if (sel) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 120px' }}>
      <div onClick={() => setSel(null)} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer' }}>
        {React.createElement(window.lucide.ArrowLeft, { size: 16, color: t.accent })}
        <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 11, letterSpacing: '0.18em', color: t.accent }}>ALL VISTAS</span>
      </div>
      <div style={{ background: t.surface, border: `3px solid ${t.text}`, boxShadow: `6px 6px 0 ${t.accent}`, padding: 20, marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: t.aubergine, opacity: 0.25, transform: 'translate(20px,-20px)' }} />
        <div style={{ fontSize: 44, marginBottom: 12 }}>{sel.emoji}</div>
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 22, color: t.text, marginBottom: 10 }}>{sel.title}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ background: t.accent, color: '#000', fontFamily: "'Archivo Black',sans-serif", fontSize: 9, padding: '3px 8px', letterSpacing: '0.12em' }}>{sel.type.toUpperCase()}</span>
          <span style={{ border: `1px solid ${t.borderSubtle}`, fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted, padding: '3px 8px' }}>{sel.date}</span>
        </div>
      </div>
      <div style={{ background: t.promptCard, border: `2px solid ${t.accent}`, padding: '16px', marginBottom: 12 }}>
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.22em', color: t.accent, marginBottom: 8 }}>AURA ANALYSIS · SCORE {sel.auraScore}</div>
        <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: t.text, lineHeight: 1.6 }}>{sel.analysis}</div>
      </div>
      <div style={{ border: `1px solid ${t.borderSubtle}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        {React.createElement(window.lucide.BookOpen, { size: 13, color: t.textMuted })}
        <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted }}>Urban Symphony · Day {10 + sel.id}</span>
      </div>
    </div>
  );

  return (
    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
      {/* Parallax elements */}
      <div style={{ position: 'absolute', top: -20 + scrollY * 0.35, right: -30, width: 160, height: 160, background: t.accent, opacity: 0.07, transform: 'rotate(8deg)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 160 - scrollY * 0.18, left: -60, width: 120, height: 200, background: t.aubergine, opacity: 0.12, transform: 'rotate(-4deg)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '8px 16px 120px' }}>
        {/* Asymmetric header block */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <div style={{ position: 'absolute', top: -6, left: -6, width: 110, height: 58, background: t.aubergine, opacity: 0.22, zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 32, color: t.text, lineHeight: 0.95 }}>VISTA</div>
            <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 32, color: t.accent, lineHeight: 0.95 }}>LOG</div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 10, color: t.textMuted, letterSpacing: '0.18em', marginTop: 8 }}>23 PERCEPTIONS CAPTURED</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {['ALL', 'PHOTO', 'AUDIO', 'TEXT'].map((f, i) => (
            <div key={f} style={{ background: i === 0 ? t.accent : 'transparent', border: `2px solid ${i === 0 ? t.accent : t.borderSubtle}`, color: i === 0 ? '#000' : t.textMuted, fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.16em', padding: '5px 12px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{f}</div>
          ))}
        </div>

        {/* Asymmetric grid — first card spans full width */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {vistaEntries.map((entry, i) => (
            <div key={entry.id} onClick={() => setSel(entry)} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1', background: t.surface, border: `2px solid ${t.borderSubtle}`, boxShadow: `${i % 2 === 0 ? 4 : 3}px ${i % 2 === 0 ? 4 : 3}px 0 ${t.accent}`, padding: i === 0 ? '20px' : '14px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              {i === 0 && <div style={{ position: 'absolute', right: 0, top: 0, width: 80, height: 80, background: t.aubergine, opacity: 0.25, transform: 'translate(20px,-20px)' }} />}
              <div style={{ fontSize: i === 0 ? 38 : 24, marginBottom: 8 }}>{entry.emoji}</div>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: i === 0 ? 16 : 12, color: t.text, lineHeight: 1.15, marginBottom: 4 }}>{entry.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 10, color: t.textMuted }}>{entry.date}</span>
                <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 14, color: t.accent }}>{entry.auraScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ t, theme, setTheme }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 120px' }}>
      {/* Profile card */}
      <div style={{ background: t.surface, border: `3px solid ${t.accent}`, boxShadow: `6px 6px 0 #000`, padding: '22px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -15, top: -15, width: 110, height: 110, background: t.aubergine, opacity: 0.25, transform: 'rotate(12deg)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ width: 58, height: 58, background: t.accent, border: '3px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo Black',sans-serif", fontSize: 24, color: '#000', marginBottom: 12 }}>A</div>
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, color: t.text }}>alex_sees</div>
          <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: t.textMuted, marginTop: 3 }}>Perception artist since March 2024</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[{ v: '23', l: 'CAPTURES' }, { v: '89', l: 'AVG AURA' }, { v: '12', l: 'STREAK' }].map(s => (
          <div key={s.l} style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '12px 8px', textAlign: 'center', boxShadow: `3px 3px 0 ${t.accent}` }}>
            <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 24, color: t.accent, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 8, color: t.textMuted, letterSpacing: '0.12em', marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tier progression */}
      <div style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '16px', marginBottom: 16 }}>
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.22em', color: t.textMuted, marginBottom: 14 }}>CURATOR PROGRESSION</div>
        {tiers.map((tier, i) => (
          <div key={tier.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, opacity: i <= 1 ? 1 : 0.38 }}>
            <div style={{ width: 36, height: 36, background: i <= 1 ? t.accent : 'transparent', border: `2px solid ${i <= 1 ? t.accent : t.borderSubtle}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{tier.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 12, color: i === 1 ? t.accent : t.text }}>{tier.name}{i === 1 ? ' ← YOU' : ''}</div>
              <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 10, color: t.textMuted }}>{tier.desc} · {tier.min}+ captures</div>
            </div>
            {i === 0 && React.createElement(window.lucide.CheckCircle, { size: 14, color: t.accent })}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: '0.22em', color: t.textMuted, marginBottom: 10 }}>SETTINGS</div>

      <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {React.createElement(theme === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 15, color: t.accent })}
          <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: t.text }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
        <div style={{ width: 42, height: 22, background: theme === 'dark' ? t.accent : t.borderSubtle, border: '2px solid #000', position: 'relative', transition: 'background 0.2s' }}>
          <div style={{ position: 'absolute', top: 2, left: theme === 'dark' ? 20 : 2, width: 14, height: 14, background: '#000', transition: 'left 0.2s' }} />
        </div>
      </div>

      {[
        { label: 'Notification Prompts', icon: window.lucide.Bell },
        { label: 'Privacy & Data', icon: window.lucide.Shield },
        { label: 'Aesthetic Filters', icon: window.lucide.Settings },
      ].map(item => (
        <div key={item.label} style={{ background: t.surface, border: `2px solid ${t.borderSubtle}`, padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(item.icon, { size: 15, color: t.accent })}
            <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: t.text }}>{item.label}</span>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const t = themes[theme];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'capture', label: 'Capture', icon: window.lucide.Camera },
    { id: 'vistas', label: 'VistaLog', icon: window.lucide.BookOpen },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    capture: CaptureScreen,
    vistas: VistaLogScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        textarea { font-family: inherit; }
      `}</style>

      <div style={{ width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative', background: t.bg, border: '10px solid #1a1a1a', boxShadow: '0 40px 80px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column' }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 122, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px 8px', flexShrink: 0, zIndex: 10 }}>
          <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 13, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 13, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 15, color: t.text })}
          </div>
        </div>

        {/* App header */}
        <div style={{ padding: '4px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, borderBottom: `2px solid ${t.borderSubtle}` }}>
          <div>
            <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 19, color: t.text }}>AURA</span>
            <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 19, color: t.accent }}>LENS</span>
          </div>
          <div style={{ background: t.accent, color: '#000', fontFamily: "'Archivo Black',sans-serif", fontSize: 9, padding: '4px 9px', letterSpacing: '0.14em', border: '1px solid #000' }}>AESTHETE ✦</div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <ActiveScreen t={t} theme={theme} setTheme={setTheme} />
        </div>

        {/* Bottom navigation */}
        <div style={{ display: 'flex', borderTop: `3px solid ${t.text}`, background: t.navBg, flexShrink: 0, boxShadow: `0 -3px 0 ${t.accent}` }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const navItemStyle = {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 0 14px',
              cursor: 'pointer',
              borderRight: tab.id !== 'profile' ? `1px solid ${t.borderSubtle}` : 'none',
              background: isActive ? t.accent : 'transparent',
              transition: 'background 0.15s',
            };
            const labelStyle = {
              fontFamily: "'Archivo Black',sans-serif",
              fontSize: 8,
              letterSpacing: '0.08em',
              color: isActive ? '#000' : t.textMuted,
              marginTop: 3,
            };
            return (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={navItemStyle}>
                {React.createElement(tab.icon, { size: 20, color: isActive ? '#000' : t.textMuted })}
                <span style={labelStyle}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
