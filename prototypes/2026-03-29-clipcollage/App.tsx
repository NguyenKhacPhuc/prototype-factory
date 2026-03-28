const { useState, useEffect, useRef } = React;

// ─── FONTS ──────────────────────────────────────────────────────────────────
const _fontEl = document.createElement('style');
_fontEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{display:none;}
`;
document.head.appendChild(_fontEl);

const PF = { fontFamily: "'Playfair Display', serif" };
const SS = { fontFamily: "'Source Sans 3', sans-serif" };

// ─── THEMES ─────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#1A1410', surface: '#241C14', surface2: '#2E2318',
    card: '#241C14', cardAlt: '#302518',
    coral: '#E8735A', coralMid: '#D4614A', coralGlow: 'rgba(232,115,90,0.15)',
    text: '#FAF7F2', textSec: '#C4A882', textMuted: '#7A6050',
    border: '#3D2E22', borderLight: '#4A3828',
    navBg: '#1A1410', tag: '#3D2E22', tagText: '#C4A882',
    success: '#6BAA7A', warning: '#E8C450',
  },
  light: {
    bg: '#FAF7F2', surface: '#FFFFFF', surface2: '#F5EDE3',
    card: '#FFFFFF', cardAlt: '#FFF8F2',
    coral: '#E8735A', coralMid: '#D4614A', coralGlow: 'rgba(232,115,90,0.1)',
    text: '#1C1208', textSec: '#6B4E30', textMuted: '#9C8060',
    border: '#E8D8C4', borderLight: '#F0E4D4',
    navBg: '#FFFFFF', tag: '#F0E4D4', tagText: '#6B4E30',
    success: '#4A8060', warning: '#C4942A',
  }
};

// ─── SHARED ──────────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  return (
    <div style={{ height: 50, paddingTop: 12, paddingLeft: 20, paddingRight: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: t.bg, flexShrink: 0 }}>
      <span style={{ ...PF, fontSize: 14, fontWeight: 700, color: t.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <WifiIcon size={14} color={t.text} />
        <BatteryIcon size={16} color={t.text} />
      </div>
    </div>
  );
}

function Tag({ label, t, coral }) {
  return (
    <span style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 3, background: coral ? t.coral : t.tag, color: coral ? '#FFF' : t.tagText }}>
      {label}
    </span>
  );
}

// ─── ONBOARDING ──────────────────────────────────────────────────────────────
function OnboardingScreen({ onDone, t }) {
  const [step, setStep] = useState(0);
  const slides = [
    {
      tag: 'Welcome to ClipCollage',
      title: 'Learn by\nRemixing\nCreativity',
      body: 'Cut clips from any lesson, podcast, or doc — and mash them into your own story.',
      accent: t.coral,
      graphic: (
        <div style={{ position: 'relative', height: 200, marginTop: 8 }}>
          <div style={{ position: 'absolute', top: 30, left: 20, width: 160, height: 110, background: t.surface2, borderRadius: 12, border: `2px solid ${t.border}`, transform: 'rotate(-4deg)', overflow: 'hidden' }}>
            <div style={{ height: 60, background: '#4A6B8A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...SS, color: '#FFF', fontSize: 12 }}>Biology 101</span>
            </div>
            <div style={{ padding: 8 }}>
              <div style={{ height: 8, background: t.border, borderRadius: 4, marginBottom: 5 }} />
              <div style={{ height: 8, background: t.border, borderRadius: 4, width: '70%' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', top: 60, left: 80, width: 160, height: 110, background: t.surface2, borderRadius: 12, border: `2px solid ${t.coral}`, transform: 'rotate(3deg)', overflow: 'hidden', zIndex: 2 }}>
            <div style={{ height: 60, background: '#7A4A6B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...SS, color: '#FFF', fontSize: 12 }}>History Doc</span>
            </div>
            <div style={{ padding: 8 }}>
              <div style={{ height: 8, background: t.border, borderRadius: 4, marginBottom: 5 }} />
              <div style={{ height: 8, background: t.coral, borderRadius: 4, width: '50%', opacity: 0.4 }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 50, width: 200, height: 40, background: t.coral, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
            <span style={{ ...PF, color: '#FFF', fontSize: 13, fontStyle: 'italic' }}>Your Remix ✦</span>
          </div>
        </div>
      ),
    },
    {
      tag: 'Unique Feature',
      title: 'Temporal\nLayering',
      body: 'Sync multiple clips in time to see multiple perspectives simultaneously — a biology lecture over a historical doc.',
      accent: '#4A6B8A',
      graphic: (
        <div style={{ margin: '12px 0', background: t.surface2, borderRadius: 14, padding: 16, border: `1px solid ${t.border}` }}>
          {[{ label: 'Biology Talk', color: '#4A6B8A', w: '80%' }, { label: 'History Doc', color: '#7A4A6B', w: '55%' }, { label: 'Your Notes', color: t.coral, w: '65%' }].map((track, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 10 : 0 }}>
              <div style={{ ...SS, fontSize: 10, color: t.textMuted, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{track.label}</div>
              <div style={{ height: 28, background: t.border, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: track.w, background: track.color, borderRadius: 6, opacity: 0.8 }} />
                <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', ...SS, fontSize: 10, color: '#FFF', fontWeight: 600 }}>{track.label}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, height: 2, background: t.coral, borderRadius: 1, position: 'relative', opacity: 0.6 }}>
            <div style={{ position: 'absolute', left: '40%', top: -4, width: 10, height: 10, borderRadius: '50%', background: t.coral }} />
          </div>
        </div>
      ),
    },
    {
      tag: 'Community',
      title: 'Battle &\nCollaborate',
      body: 'Weekly remix battles, real-time co-editing, and a community that turns learning into creative expression.',
      accent: '#7A4A6B',
      graphic: (
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[
            { user: 'maya_remixes', score: '2.4k', rank: '01', hot: true },
            { user: 'jaylen.edu', score: '1.8k', rank: '02', hot: false },
          ].map((entry, i) => (
            <div key={i} style={{ flex: 1, background: t.surface2, borderRadius: 12, padding: 12, border: `1px solid ${entry.hot ? t.coral : t.border}`, transform: i === 0 ? 'rotate(-2deg)' : 'rotate(2deg)' }}>
              <div style={{ ...SS, fontSize: 32, fontWeight: 900, color: entry.hot ? t.coral : t.borderLight, opacity: entry.hot ? 1 : 0.5, lineHeight: 1 }}>{entry.rank}</div>
              <div style={{ ...SS, fontSize: 12, color: t.textSec, marginTop: 6, fontWeight: 600 }}>{entry.user}</div>
              <div style={{ ...PF, fontSize: 18, color: t.text, fontWeight: 700, marginTop: 2 }}>{entry.score}</div>
              <div style={{ ...SS, fontSize: 10, color: t.textMuted }}>remix points</div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const slide = slides[step];
  return (
    <div style={{ height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', padding: '24px 28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ height: 3, width: i === step ? 24 : 8, borderRadius: 2, background: i === step ? t.coral : t.border, transition: 'all 0.3s ease' }} />
          ))}
        </div>
        <button onClick={onDone} style={{ ...SS, fontSize: 13, color: t.textMuted, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Skip</button>
      </div>
      <Tag label={slide.tag} t={t} />
      <h1 style={{ ...PF, fontSize: 38, fontWeight: 900, color: t.text, lineHeight: 1.1, marginTop: 12, whiteSpace: 'pre-line' }}>{slide.title}</h1>
      <p style={{ ...SS, fontSize: 15, color: t.textSec, lineHeight: 1.6, marginTop: 12 }}>{slide.body}</p>
      <div style={{ flex: 1, marginTop: 8 }}>{slide.graphic}</div>
      <button
        onClick={() => step < slides.length - 1 ? setStep(step + 1) : onDone()}
        style={{ marginTop: 16, width: '100%', padding: '16px', background: t.coral, border: 'none', borderRadius: 12, ...PF, fontSize: 17, fontWeight: 700, color: '#FFF', cursor: 'pointer', letterSpacing: '0.01em' }}
      >
        {step < slides.length - 1 ? 'Continue →' : 'Start Remixing'}
      </button>
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [likedItems, setLikedItems] = useState(new Set());
  const HeartIcon = window.lucide.Heart;
  const PlayIcon = window.lucide.Play;
  const BookmarkIcon = window.lucide.Bookmark;

  const toggleLike = (id) => {
    setLikedItems(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const trending = [
    { id: 't1', title: 'Quantum Loops', sub: 'Physics × Music', color: '#4A6B8A', clips: 4, likes: '1.2k' },
    { id: 't2', title: 'Silk Road Remix', sub: 'History × Poetry', color: '#7A4A6B', clips: 7, likes: '980' },
    { id: 't3', title: 'Neural Beats', sub: 'Bio × Sound', color: '#4A7A5A', clips: 3, likes: '2.1k' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 16, background: t.bg }}>
      {/* Editorial Header */}
      <div style={{ padding: '12px 20px 0', borderBottom: `1px solid ${t.border}`, paddingBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.coral, marginBottom: 2 }}>The Daily</div>
            <h1 style={{ ...PF, fontSize: 28, fontWeight: 900, color: t.text, lineHeight: 1.05 }}>ClipCollage</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.coral, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...SS, color: '#FFF', fontSize: 13, fontWeight: 700 }}>M</span>
            </div>
          </div>
        </div>
        <div style={{ ...SS, fontSize: 11, color: t.textMuted, marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sunday, March 29 — Issue No. 47</div>
      </div>

      {/* Weekly Challenge Banner */}
      <div style={{ margin: '16px 20px 0', background: t.coral, borderRadius: 14, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', right: 20, bottom: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <Tag label="This Week's Battle" t={t} />
        <h2 style={{ ...PF, fontSize: 20, fontWeight: 800, color: '#FFF', marginTop: 6, lineHeight: 1.2 }}>Remix the Scientific Revolution</h2>
        <div style={{ ...SS, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Blend Galileo docs + modern physics clips</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ ...SS, fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>347 entries · 2d 14h left</div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '5px 12px', ...SS, fontSize: 12, color: '#FFF', fontWeight: 700 }}>Enter →</div>
        </div>
      </div>

      {/* Featured Remix — Overlapping Angled Cards */}
      <div style={{ margin: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div>
            <div style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.coral }}>Featured Remix</div>
            <h2 style={{ ...PF, fontSize: 19, fontWeight: 800, color: t.text, lineHeight: 1.2 }}>Editor's Pick</h2>
          </div>
          <span style={{ ...SS, fontSize: 12, color: t.textMuted, cursor: 'pointer' }}>See all</span>
        </div>

        {/* Angled Card Stack */}
        <div style={{ position: 'relative', height: 210 }}>
          {/* Back card */}
          <div style={{ position: 'absolute', top: 0, left: 10, right: 10, height: 180, background: '#4A6B8A', borderRadius: 16, transform: 'rotate(-3deg)', transformOrigin: 'bottom center' }}>
            <div style={{ padding: 14 }}>
              <div style={{ ...SS, fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Source Clip</div>
              <div style={{ ...PF, fontSize: 16, color: '#FFF', fontWeight: 700, marginTop: 2 }}>Biology of Time Perception</div>
            </div>
          </div>
          {/* Mid card */}
          <div style={{ position: 'absolute', top: 8, left: 5, right: 5, height: 180, background: '#7A4A6B', borderRadius: 16, transform: 'rotate(1.5deg)', transformOrigin: 'bottom center' }}>
            <div style={{ padding: 14 }}>
              <div style={{ ...SS, fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Source Clip</div>
              <div style={{ ...PF, fontSize: 16, color: '#FFF', fontWeight: 700, marginTop: 2 }}>The Philosophy of Now</div>
            </div>
          </div>
          {/* Front card — the remix */}
          <div style={{ position: 'absolute', top: 18, left: 0, right: 0, height: 180, background: t.card, borderRadius: 16, border: `2px solid ${t.coral}`, overflow: 'hidden', boxShadow: `0 8px 24px rgba(0,0,0,0.25)` }}>
            <div style={{ height: 90, background: `linear-gradient(135deg, #3A2A1C 0%, #5A3820 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 2, opacity: 0.3 }}>
                {[80,60,90,50,75,40,85,55,70,45].map((h,i) => <div key={i} style={{ flex: 1, background: t.coral, alignSelf: 'center', height: `${h}%`, borderRadius: 2 }} />)}
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: t.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                <PlayIcon size={20} color="#FFF" fill="#FFF" />
              </div>
            </div>
            <div style={{ padding: '10px 14px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Tag label="Remix" t={t} coral />
                <div style={{ ...PF, fontSize: 16, fontWeight: 800, color: t.text, marginTop: 4, lineHeight: 1.2 }}>What Is Time, Really?</div>
                <div style={{ ...SS, fontSize: 12, color: t.textSec, marginTop: 2 }}>by maya_remixes · 4 clips · 3:12</div>
              </div>
              <button onClick={() => toggleLike('feat')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <HeartIcon size={20} color={likedItems.has('feat') ? t.coral : t.textMuted} fill={likedItems.has('feat') ? t.coral : 'none'} />
                <span style={{ ...SS, fontSize: 10, color: t.textMuted }}>1.2k</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Now */}
      <div style={{ margin: '24px 0 0' }}>
        <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ ...PF, fontSize: 19, fontWeight: 800, color: t.text }}>Trending Now</h2>
          <span style={{ ...SS, fontSize: 12, color: t.textMuted, cursor: 'pointer' }}>Browse →</span>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 4px' }}>
          {trending.map(item => (
            <div key={item.id} style={{ flexShrink: 0, width: 150, background: t.card, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 80, background: item.color, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                <div style={{ ...SS, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.clips} clips</div>
              </div>
              <div style={{ padding: '8px 10px 10px' }}>
                <div style={{ ...PF, fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{item.title}</div>
                <div style={{ ...SS, fontSize: 11, color: t.textMuted, marginTop: 2 }}>{item.sub}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <div style={{ ...SS, fontSize: 11, color: t.coral, fontWeight: 700 }}>♥ {item.likes}</div>
                  <button onClick={() => toggleLike(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <BookmarkIcon size={14} color={likedItems.has(item.id) ? t.coral : t.textMuted} fill={likedItems.has(item.id) ? t.coral : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ margin: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ ...PF, fontSize: 19, fontWeight: 800, color: t.text }}>Recent Activity</h2>
        </div>
        {[
          { user: 'jaylen.edu', action: 'remixed your clip', clip: 'Nervous System Basics', time: '2m ago', avatar: 'J' },
          { user: 'priya_learns', action: 'started a collab on', clip: 'Ancient Trade Routes', time: '1h ago', avatar: 'P' },
          { user: 'tomasz_k', action: 'liked your remix', clip: 'What Is Time, Really?', time: '3h ago', avatar: 'T' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: [t.coral, '#4A6B8A', '#7A4A6B'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ ...SS, color: '#FFF', fontSize: 13, fontWeight: 700 }}>{item.avatar}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...SS, fontSize: 13, color: t.text, lineHeight: 1.4 }}>
                <span style={{ fontWeight: 700 }}>{item.user}</span>
                <span style={{ color: t.textSec }}> {item.action} </span>
                <span style={{ color: t.coral, fontWeight: 600 }}>{item.clip}</span>
              </div>
              <div style={{ ...SS, fontSize: 11, color: t.textMuted, marginTop: 2 }}>{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CREATE SCREEN ────────────────────────────────────────────────────────────
function CreateScreen({ t }) {
  const [layeringMode, setLayeringMode] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const PlayIcon = window.lucide.Play;
  const PauseIcon = window.lucide.Pause;
  const PlusIcon = window.lucide.Plus;
  const LayersIcon = window.lucide.Layers;
  const ScissorsIcon = window.lucide.Scissors;
  const ShareIcon = window.lucide.Share2;

  const tracks = [
    { label: 'Biology: Cell Division', color: '#4A6B8A', duration: '2:14', clips: [{ w: '45%', label: 'Intro' }, { w: '30%', label: 'Phase 1' }] },
    { label: 'Music: Bach Cello Suite', color: '#7A4A6B', duration: '1:48', clips: [{ w: '60%', label: 'Opening' }] },
    { label: 'My Notes (Voice)', color: t.coral, duration: '0:38', clips: [{ w: '20%', label: 'Thought' }] },
  ];

  const clips = [
    { title: 'Cell Division Pt.1', source: 'Khan Academy', color: '#4A6B8A', dur: '1:12' },
    { title: 'Mitosis Explained', source: 'CrashCourse Bio', color: '#3A8A6A', dur: '2:34' },
    { title: 'Bach Suite No.1', source: 'Classic FM', color: '#7A4A6B', dur: '3:50' },
    { title: 'Cellular Analogy', source: 'TED-Ed', color: '#8A6A3A', dur: '0:58' },
  ];

  return (
    <div style={{ height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div>
          <div style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.coral }}>Clip & Blend Editor</div>
          <h2 style={{ ...PF, fontSize: 20, fontWeight: 800, color: t.text, lineHeight: 1.1 }}>Cell Division Remix</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '7px 14px', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, ...SS, fontSize: 12, color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
            <ShareIcon size={13} color={t.text} /> Export
          </button>
        </div>
      </div>

      {/* Temporal Layering Toggle */}
      <div style={{ margin: '12px 20px 0', padding: '10px 14px', background: layeringMode ? t.coralGlow : t.surface2, borderRadius: 12, border: `1px solid ${layeringMode ? t.coral : t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LayersIcon size={18} color={layeringMode ? t.coral : t.textMuted} />
          <div>
            <div style={{ ...SS, fontSize: 13, fontWeight: 700, color: layeringMode ? t.coral : t.text }}>Temporal Layering</div>
            <div style={{ ...SS, fontSize: 11, color: t.textMuted }}>Sync multiple clips in time</div>
          </div>
        </div>
        <div onClick={() => setLayeringMode(!layeringMode)} style={{ width: 44, height: 24, borderRadius: 12, background: layeringMode ? t.coral : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0 }}>
          <div style={{ position: 'absolute', top: 2, left: layeringMode ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#FFF', transition: 'left 0.2s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </div>
      </div>

      {/* Playhead Controls */}
      <div style={{ margin: '12px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setIsPlaying(!isPlaying)} style={{ width: 44, height: 44, borderRadius: '50%', background: t.coral, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          {isPlaying ? <PauseIcon size={18} color="#FFF" fill="#FFF" /> : <PlayIcon size={18} color="#FFF" fill="#FFF" />}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ height: 4, background: t.border, borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '35%', height: '100%', background: t.coral, borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: '35%', top: -6, width: 3, height: 16, background: t.coral, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ ...SS, fontSize: 11, color: t.textMuted }}>1:05</span>
            <span style={{ ...SS, fontSize: 11, color: t.textMuted }}>3:02</span>
          </div>
        </div>
        <button style={{ padding: '8px 12px', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
          <ScissorsIcon size={14} color={t.textSec} />
          <span style={{ ...SS, fontSize: 12, color: t.textSec, fontWeight: 600 }}>Split</span>
        </button>
      </div>

      {/* Tracks */}
      <div style={{ margin: '12px 20px 0' }}>
        <div style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 8 }}>Tracks {layeringMode && '— Layered Mode'}</div>
        {tracks.map((track, i) => (
          <div key={i} onClick={() => setSelectedTrack(i)} style={{ marginBottom: 8, background: selectedTrack === i ? t.surface2 : t.card, borderRadius: 10, border: `1px solid ${selectedTrack === i ? track.color : t.border}`, padding: '8px 10px', cursor: 'pointer', transition: 'all 0.15s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ ...SS, fontSize: 12, fontWeight: 700, color: track.color }}>{track.label}</div>
              <div style={{ ...SS, fontSize: 11, color: t.textMuted }}>{track.duration}</div>
            </div>
            <div style={{ height: 28, background: t.bg, borderRadius: 6, display: 'flex', gap: 3, alignItems: 'center', padding: '3px 4px', overflow: 'hidden' }}>
              {track.clips.map((clip, j) => (
                <div key={j} style={{ height: '100%', width: clip.w, background: track.color, borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 6, opacity: 0.85, flexShrink: 0 }}>
                  <span style={{ ...SS, fontSize: 10, color: '#FFF', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden' }}>{clip.label}</span>
                </div>
              ))}
              {layeringMode && <div style={{ height: '60%', width: '15%', background: track.color, borderRadius: 4, opacity: 0.3, marginLeft: 'auto' }} />}
            </div>
          </div>
        ))}
        <button style={{ width: '100%', padding: '10px', background: 'none', border: `1.5px dashed ${t.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
          <PlusIcon size={16} color={t.textMuted} />
          <span style={{ ...SS, fontSize: 13, color: t.textMuted, fontWeight: 600 }}>Add Track</span>
        </button>
      </div>

      {/* Clip Library */}
      <div style={{ margin: '16px 20px 0' }}>
        <div style={{ ...PF, fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 10 }}>Clip Library</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {clips.map((clip, i) => (
            <div key={i} style={{ background: t.card, borderRadius: 10, overflow: 'hidden', border: `1px solid ${t.border}`, cursor: 'pointer' }}>
              <div style={{ height: 48, background: clip.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlayIcon size={18} color="rgba(255,255,255,0.8)" />
              </div>
              <div style={{ padding: '6px 8px' }}>
                <div style={{ ...SS, fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{clip.title}</div>
                <div style={{ ...SS, fontSize: 10, color: t.textMuted, marginTop: 2 }}>{clip.source} · {clip.dur}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EXPLORE SCREEN ───────────────────────────────────────────────────────────
function ExploreScreen({ t }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const SearchIcon = window.lucide.Search;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const SparklesIcon = window.lucide.Sparkles;

  const categories = ['All', 'Science', 'History', 'Art', 'Music', 'Literature', 'Philosophy'];
  const suggestions = [
    { title: 'The RNA World Hypothesis', type: 'Video', source: 'MIT OpenCourseWare', color: '#4A6B8A', duration: '18 min', forYou: true },
    { title: 'Dadaism & Modern Protest', type: 'Article', source: 'The Atlantic', color: '#8A6A3A', duration: '7 min', forYou: true },
    { title: 'Polyphony in Bach', type: 'Podcast', source: 'Musicology Now', color: '#7A4A6B', duration: '34 min', forYou: false },
    { title: 'Stoic Daily Practice', type: 'Video', source: 'The Daily Stoic', color: '#4A7A5A', duration: '12 min', forYou: false },
    { title: 'Medieval Trade Routes', type: 'Documentary', source: 'Curiosity Stream', color: '#6A4A8A', duration: '52 min', forYou: true },
    { title: 'Fermat\'s Last Theorem', type: 'Lecture', source: 'Cambridge Open', color: '#3A6A8A', duration: '45 min', forYou: false },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 16, background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '12px 20px 14px', borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ ...PF, fontSize: 24, fontWeight: 900, color: t.text }}>Explore</h2>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10, background: t.surface2, borderRadius: 12, padding: '10px 14px', border: `1px solid ${t.border}` }}>
          <SearchIcon size={18} color={t.textMuted} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search clips, subjects, creators..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', ...SS, fontSize: 14, color: t.text, fontWeight: 400 }}
          />
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 20, background: activeCategory === cat ? t.coral : t.surface2, border: `1px solid ${activeCategory === cat ? t.coral : t.border}`, ...SS, fontSize: 13, color: activeCategory === cat ? '#FFF' : t.textSec, fontWeight: activeCategory === cat ? 700 : 400, cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* For You Section */}
      <div style={{ margin: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <SparklesIcon size={16} color={t.coral} />
          <h3 style={{ ...PF, fontSize: 17, fontWeight: 800, color: t.text }}>Adapted For You</h3>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {suggestions.filter(s => s.forYou).map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: 170, background: t.card, borderRadius: 14, overflow: 'hidden', border: `1px solid ${t.border}`, cursor: 'pointer' }}>
              <div style={{ height: 85, background: item.color, position: 'relative', display: 'flex', alignItems: 'flex-start', padding: 10 }}>
                <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: 5, padding: '3px 7px' }}>
                  <span style={{ ...SS, fontSize: 10, color: '#FFF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.type}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.5)', borderRadius: 5, padding: '3px 6px' }}>
                  <span style={{ ...SS, fontSize: 10, color: '#FFF' }}>{item.duration}</span>
                </div>
              </div>
              <div style={{ padding: '8px 10px 10px' }}>
                <div style={{ ...PF, fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.25 }}>{item.title}</div>
                <div style={{ ...SS, fontSize: 11, color: t.textMuted, marginTop: 3 }}>{item.source}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Content */}
      <div style={{ margin: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <TrendingUpIcon size={16} color={t.textSec} />
          <h3 style={{ ...PF, fontSize: 17, fontWeight: 800, color: t.text }}>Trending in {activeCategory}</h3>
        </div>
        {suggestions.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, background: t.card, borderRadius: 12, padding: '10px 12px', border: `1px solid ${t.border}`, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 10, background: item.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...SS, fontSize: 10, color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2, padding: '0 4px' }}>{item.type}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...PF, fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.25 }}>{item.title}</div>
              <div style={{ ...SS, fontSize: 12, color: t.textMuted, marginTop: 2 }}>{item.source} · {item.duration}</div>
            </div>
            {item.forYou && <div style={{ ...SS, fontSize: 10, fontWeight: 700, color: t.coral, flexShrink: 0 }}>For You</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMMUNITY SCREEN ─────────────────────────────────────────────────────────
function CommunityScreen({ t }) {
  const [tab, setTab] = useState('battles');
  const UsersIcon = window.lucide.Users;
  const TrophyIcon = window.lucide.Trophy;
  const ZapIcon = window.lucide.Zap;

  const battles = [
    { id: 'b1', title: 'Remix the Scientific Revolution', theme: 'Science × History', entries: 347, days: 2, prize: 'Featured', hot: true },
    { id: 'b2', title: 'Music & Mathematics', theme: 'Music Theory × Calculus', entries: 128, days: 5, prize: 'Collab Credit', hot: false },
    { id: 'b3', title: 'Poetry of the Cosmos', theme: 'Astrophysics × Literature', entries: 214, days: 1, prize: 'Featured', hot: false },
  ];

  const leaderboard = [
    { rank: 1, user: 'maya_remixes', score: 4820, badge: '🏆', delta: '+3' },
    { rank: 2, user: 'dr_jaylen', score: 3940, badge: '🥈', delta: '+1' },
    { rank: 3, user: 'priya_learns', score: 3210, badge: '🥉', delta: '-1' },
    { rank: 4, user: 'tomasz_k', score: 2780, badge: null, delta: '+2' },
    { rank: 5, user: 'you', score: 2340, badge: null, delta: '+5', isMe: true },
  ];

  const collabs = [
    { title: 'Ancient Trade Routes Remix', members: ['J', 'P', 'M'], status: 'Active', clips: 8 },
    { title: 'Quantum Mechanics × Jazz', members: ['T', 'Y'], status: 'Invite Pending', clips: 3 },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 16, background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '12px 20px 0', borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ ...PF, fontSize: 24, fontWeight: 900, color: t.text }}>Community</h2>
        <div style={{ display: 'flex', gap: 0, marginTop: 12, background: t.surface2, borderRadius: 10, padding: 3, border: `1px solid ${t.border}` }}>
          {[{ id: 'battles', label: 'Battles' }, { id: 'leaderboard', label: 'Leaderboard' }, { id: 'collabs', label: 'Collabs' }].map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '8px 4px', borderRadius: 8, background: tab === id ? t.coral : 'none', border: 'none', ...SS, fontSize: 12, fontWeight: 700, color: tab === id ? '#FFF' : t.textSec, cursor: 'pointer', transition: 'all 0.15s ease' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'battles' && (
        <div style={{ padding: '16px 20px 0' }}>
          {/* Angled Battle Cards */}
          <div style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.coral, marginBottom: 14 }}>Live Remix Battles</div>
          <div style={{ position: 'relative', height: 220, marginBottom: 200 }}>
            {/* Back card */}
            <div style={{ position: 'absolute', top: 0, left: 8, right: 8, background: '#3A8A6A', borderRadius: 16, padding: '14px 16px', transform: 'rotate(-2.5deg)', transformOrigin: 'center bottom' }}>
              <Tag label="Battle #3" t={t} />
              <div style={{ ...PF, fontSize: 18, fontWeight: 800, color: '#FFF', marginTop: 8, lineHeight: 1.2 }}>{battles[2].title}</div>
              <div style={{ ...SS, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{battles[2].theme}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <span style={{ ...SS, fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{battles[2].entries} entries</span>
                <span style={{ ...SS, fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{battles[2].days}d left</span>
              </div>
            </div>
            {/* Mid card */}
            <div style={{ position: 'absolute', top: 10, left: 4, right: 4, background: '#6A4A8A', borderRadius: 16, padding: '14px 16px', transform: 'rotate(1.5deg)', transformOrigin: 'center bottom' }}>
              <Tag label="Battle #2" t={t} />
              <div style={{ ...PF, fontSize: 18, fontWeight: 800, color: '#FFF', marginTop: 8, lineHeight: 1.2 }}>{battles[1].title}</div>
              <div style={{ ...SS, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{battles[1].theme}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <span style={{ ...SS, fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{battles[1].entries} entries</span>
                <span style={{ ...SS, fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{battles[1].days}d left</span>
              </div>
            </div>
            {/* Front — Hot battle */}
            <div style={{ position: 'absolute', top: 22, left: 0, right: 0, background: t.coral, borderRadius: 16, padding: '16px 18px', boxShadow: '0 10px 30px rgba(232,115,90,0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Tag label="🔥 This Week's Battle" t={t} />
                <ZapIcon size={18} color="rgba(255,255,255,0.9)" />
              </div>
              <div style={{ ...PF, fontSize: 22, fontWeight: 900, color: '#FFF', marginTop: 10, lineHeight: 1.15 }}>{battles[0].title}</div>
              <div style={{ ...SS, fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 5 }}>{battles[0].theme}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                <div>
                  <div style={{ ...SS, fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>{battles[0].entries} entries</div>
                  <div style={{ ...SS, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{battles[0].days}d {' '} left</div>
                </div>
                <button style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 10, padding: '9px 18px', ...SS, fontSize: 13, color: '#FFF', fontWeight: 800, cursor: 'pointer' }}>Enter Battle →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'leaderboard' && (
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.coral, marginBottom: 14 }}>Weekly Rankings</div>
          {leaderboard.map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, background: entry.isMe ? t.coralGlow : t.card, borderRadius: 12, padding: '10px 14px', border: `1px solid ${entry.isMe ? t.coral : t.border}`, cursor: 'pointer' }}>
              <div style={{ ...PF, fontSize: 20, fontWeight: 900, color: i < 3 ? t.coral : t.textMuted, width: 28, textAlign: 'center' }}>{entry.rank}</div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: [t.coral, '#4A6B8A', '#7A4A6B', '#4A7A5A', '#8A6A3A'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ ...SS, color: '#FFF', fontSize: 13, fontWeight: 700 }}>{entry.user[0].toUpperCase()}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...SS, fontSize: 14, fontWeight: 700, color: entry.isMe ? t.coral : t.text }}>{entry.user}{entry.isMe ? ' (you)' : ''}</div>
                <div style={{ ...SS, fontSize: 12, color: t.textMuted }}>{entry.score.toLocaleString()} pts</div>
              </div>
              <div style={{ ...SS, fontSize: 12, fontWeight: 700, color: t.success }}>{entry.delta}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'collabs' && (
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ ...SS, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.coral, marginBottom: 14 }}>Active Collaborations</div>
          {collabs.map((c, i) => (
            <div key={i} style={{ background: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 12, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ ...PF, fontSize: 16, fontWeight: 800, color: t.text, lineHeight: 1.25 }}>{c.title}</div>
                  <div style={{ ...SS, fontSize: 12, color: t.textMuted, marginTop: 3 }}>{c.clips} clips in timeline</div>
                </div>
                <div style={{ ...SS, fontSize: 11, fontWeight: 700, color: c.status === 'Active' ? t.success : t.warning, marginLeft: 8, flexShrink: 0 }}>{c.status}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                <div style={{ display: 'flex', gap: -6 }}>
                  {c.members.map((m, j) => (
                    <div key={j} style={{ width: 28, height: 28, borderRadius: '50%', background: [t.coral, '#4A6B8A', '#7A4A6B'][j], border: `2px solid ${t.card}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: j > 0 ? -8 : 0 }}>
                      <span style={{ ...SS, color: '#FFF', fontSize: 11, fontWeight: 700 }}>{m}</span>
                    </div>
                  ))}
                </div>
                <span style={{ ...SS, fontSize: 12, color: t.textSec }}>{c.members.length} collaborators</span>
              </div>
            </div>
          ))}
          <button style={{ width: '100%', padding: '12px', background: 'none', border: `1.5px dashed ${t.border}`, borderRadius: 14, ...SS, fontSize: 14, color: t.textMuted, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <UsersIcon size={16} color={t.textMuted} /> Invite to Collab
          </button>
        </div>
      )}
    </div>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark }) {
  const SettingsIcon = window.lucide.Settings;
  const EditIcon = window.lucide.Edit3;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const AwardIcon = window.lucide.Award;
  const LogOutIcon = window.lucide.LogOut;

  const stats = [
    { label: 'Remixes', value: '47' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Remix Pts', value: '2.3k' },
    { label: 'Battles', value: '12' },
  ];

  const myRemixes = [
    { title: 'What Is Time, Really?', clips: 4, likes: '1.2k', color: '#4A6B8A' },
    { title: 'Cell Division × Bach', clips: 3, likes: '840', color: '#7A4A6B' },
    { title: 'Stoic Morning Ritual', clips: 6, likes: '620', color: '#4A7A5A' },
  ];

  const badges = [
    { label: 'Temporal Pro', desc: 'Used layering on 10 remixes', earned: true },
    { label: 'Battle Winner', desc: 'Won weekly challenge', earned: true },
    { label: 'Collab Master', desc: 'Co-edited 5 remixes', earned: false },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 16, background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '12px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ ...PF, fontSize: 24, fontWeight: 900, color: t.text }}>Profile</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ width: 34, height: 34, borderRadius: '50%', background: t.surface2, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SettingsIcon size={16} color={t.textSec} />
          </button>
        </div>
      </div>

      {/* User Card */}
      <div style={{ margin: '16px 20px 0', background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: t.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `3px solid ${t.border}` }}>
            <span style={{ ...PF, color: '#FFF', fontSize: 24, fontWeight: 800 }}>M</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...PF, fontSize: 20, fontWeight: 800, color: t.text }}>maya_remixes</div>
            <div style={{ ...SS, fontSize: 13, color: t.textSec, marginTop: 1 }}>Curious learner & creative remixer</div>
            <div style={{ ...SS, fontSize: 11, color: t.coral, marginTop: 4, fontWeight: 600 }}>🔥 23-day streak</div>
          </div>
          <button style={{ width: 32, height: 32, borderRadius: 8, background: t.surface2, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <EditIcon size={14} color={t.textSec} />
          </button>
        </div>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 0, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}` }}>
          {stats.map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < stats.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ ...PF, fontSize: 18, fontWeight: 900, color: t.text }}>{s.value}</div>
              <div style={{ ...SS, fontSize: 10, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* My Remixes */}
      <div style={{ margin: '20px 20px 0' }}>
        <div style={{ ...PF, fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 10 }}>My Remixes</div>
        {myRemixes.map((remix, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10, cursor: 'pointer' }}>
            <div style={{ width: 50, height: 50, borderRadius: 10, background: remix.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ ...PF, fontSize: 14, fontWeight: 700, color: t.text }}>{remix.title}</div>
              <div style={{ ...SS, fontSize: 12, color: t.textMuted, marginTop: 2 }}>{remix.clips} clips · ♥ {remix.likes}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ margin: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <AwardIcon size={16} color={t.coral} />
          <div style={{ ...PF, fontSize: 17, fontWeight: 800, color: t.text }}>Achievements</div>
        </div>
        {badges.map((badge, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8, opacity: badge.earned ? 1 : 0.45 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: badge.earned ? t.coral : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AwardIcon size={18} color={badge.earned ? '#FFF' : t.textMuted} />
            </div>
            <div>
              <div style={{ ...SS, fontSize: 13, fontWeight: 700, color: t.text }}>{badge.label}</div>
              <div style={{ ...SS, fontSize: 12, color: t.textMuted }}>{badge.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ margin: '20px 20px 0', background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
        {/* Theme Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isDark ? <MoonIcon size={18} color={t.textSec} /> : <SunIcon size={18} color={t.textSec} />}
            <div>
              <div style={{ ...SS, fontSize: 14, fontWeight: 600, color: t.text }}>Appearance</div>
              <div style={{ ...SS, fontSize: 12, color: t.textMuted }}>{isDark ? 'Dark mode' : 'Light mode'}</div>
            </div>
          </div>
          <div onClick={() => setIsDark(!isDark)} style={{ width: 48, height: 26, borderRadius: 13, background: isDark ? t.coral : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: 3, left: isDark ? 25 : 3, width: 20, height: 20, borderRadius: '50%', background: '#FFF', transition: 'left 0.2s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </div>
        </div>
        {[
          { label: 'Notification Preferences', sub: 'Battles, collabs, suggestions' },
          { label: 'Privacy Settings', sub: 'Profile & remix visibility' },
          { label: 'Connected Sources', sub: '12 sources linked' },
        ].map((setting, i) => (
          <div key={i} style={{ padding: '13px 16px', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ ...SS, fontSize: 14, fontWeight: 600, color: t.text }}>{setting.label}</div>
              <div style={{ ...SS, fontSize: 12, color: t.textMuted }}>{setting.sub}</div>
            </div>
            <span style={{ ...SS, fontSize: 16, color: t.textMuted }}>›</span>
          </div>
        ))}
      </div>

      <div style={{ margin: '12px 20px 0' }}>
        <button style={{ width: '100%', padding: '13px', background: 'none', border: `1px solid ${t.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
          <LogOutIcon size={16} color={t.textMuted} />
          <span style={{ ...SS, fontSize: 14, color: t.textMuted, fontWeight: 600 }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(true);

  const t = isDark ? themes.dark : themes.light;

  const HomeIcon = window.lucide.Home;
  const SearchIcon = window.lucide.Search;
  const PlusIcon = window.lucide.PlusCircle;
  const UsersIcon = window.lucide.Users;
  const UserIcon = window.lucide.User;

  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'explore', label: 'Explore', icon: SearchIcon },
    { id: 'create', label: 'Create', icon: PlusIcon },
    { id: 'community', label: 'Community', icon: UsersIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  const screens = {
    home: () => <HomeScreen t={t} />,
    explore: () => <ExploreScreen t={t} />,
    create: () => <CreateScreen t={t} />,
    community: () => <CommunityScreen t={t} />,
    profile: () => <ProfileScreen t={t} isDark={isDark} setIsDark={setIsDark} />,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, borderRadius: 44, border: '8px solid #111', overflow: 'hidden', position: 'relative', boxShadow: '0 30px 70px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset', background: t.bg, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 32, borderRadius: 20, background: '#000', zIndex: 100 }} />

        {/* Status Bar */}
        <StatusBar t={t} />

        {showOnboarding ? (
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <OnboardingScreen onDone={() => setShowOnboarding(false)} t={t} />
          </div>
        ) : (
          <>
            {/* Content */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {screens[activeTab]()}
            </div>

            {/* Bottom Nav */}
            <div style={{ height: 72, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 8, flexShrink: 0 }}>
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 10px', borderRadius: 10, transition: 'all 0.15s ease', background: isActive && tab.id === 'create' ? t.coral : 'none', minWidth: 52 }}>
                    <Icon size={tab.id === 'create' ? 26 : 22} color={tab.id === 'create' && isActive ? '#FFF' : isActive ? t.coral : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span style={{ ...SS, fontSize: 10, fontWeight: isActive ? 700 : 400, color: tab.id === 'create' && isActive ? '#FFF' : isActive ? t.coral : t.textMuted, letterSpacing: '0.02em' }}>{tab.label}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
