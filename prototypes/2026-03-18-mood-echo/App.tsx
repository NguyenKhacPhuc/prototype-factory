function App() {
  const { useState, useEffect, useRef } = React;

  // Google Fonts
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');
    @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.08);opacity:0.85} }
    @keyframes wave1 { 0%,100%{height:20px} 50%{height:40px} }
    @keyframes wave2 { 0%,100%{height:30px} 50%{height:10px} }
    @keyframes wave3 { 0%,100%{height:15px} 50%{height:35px} }
    @keyframes wave4 { 0%,100%{height:25px} 50%{height:8px} }
    @keyframes wave5 { 0%,100%{height:18px} 50%{height:42px} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes heartBeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.3)} 28%{transform:scale(1)} 42%{transform:scale(1.3)} 70%{transform:scale(1)} }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 0; }
  `;

  const [activeTab, setActiveTab] = useState('home');
  const [prevTab, setPrevTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [volume, setVolume] = useState(72);
  const [liked, setLiked] = useState({});
  const [savedScapes, setSavedScapes] = useState([1, 4]);
  const [wearableConnected, setWearableConnected] = useState(false);
  const [time, setTime] = useState('');
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [following, setFollowing] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [moodInput, setMoodInput] = useState('');

  // Colors
  const C = {
    bg: '#FFF5EE',
    amber: '#F6A623',
    pink: '#FFB6C1',
    plum: '#6B3A5B',
    plumLight: '#8B5A7B',
    plumDark: '#4A2540',
    cream: '#FFF0E8',
    peach: '#FDDCCC',
    text: '#3A1F30',
    textMuted: '#9B7A8A',
    white: '#FFFFFF',
    grad1: 'linear-gradient(135deg, #F6A623 0%, #FFB6C1 50%, #C97BB0 100%)',
    grad2: 'linear-gradient(135deg, #6B3A5B 0%, #8B5A7B 100%)',
    grad3: 'linear-gradient(180deg, #FFF5EE 0%, #FDDCCC 100%)',
    gradCard: 'linear-gradient(135deg, #FFF0E8 0%, #FDDCCC 100%)',
  };

  const moods = [
    { id: 'calm', label: 'Calm', emoji: '🌿', color: '#A8D8B9', desc: 'Serene & peaceful' },
    { id: 'focus', label: 'Focus', emoji: '🧠', color: '#A3C4F3', desc: 'Deep concentration' },
    { id: 'happy', label: 'Happy', emoji: '☀️', color: '#FFD580', desc: 'Bright & uplifting' },
    { id: 'melancholy', label: 'Reflective', emoji: '🌙', color: '#C7AEDE', desc: 'Thoughtful & deep' },
    { id: 'energize', label: 'Energize', emoji: '⚡', color: '#FFB347', desc: 'Vibrant & alive' },
    { id: 'sleep', label: 'Sleep', emoji: '🌌', color: '#8BA7D0', desc: 'Drift away gently' },
  ];

  const soundscapes = [
    { id: 1, title: 'Forest at Dawn', mood: 'calm', duration: '45 min', plays: '12.4k', creator: 'NatureAI', tags: ['Birds', 'Stream', 'Wind'], gradient: 'linear-gradient(135deg,#A8D8B9,#7EC8A4)', img: '🌲' },
    { id: 2, title: 'Deep Focus Flow', mood: 'focus', duration: '60 min', plays: '28.1k', creator: 'MindWave', tags: ['Binaural', 'Rain', 'Low Hum'], gradient: 'linear-gradient(135deg,#A3C4F3,#6B9FE4)', img: '🌊' },
    { id: 3, title: 'Golden Hour Drift', mood: 'happy', duration: '30 min', plays: '8.7k', creator: 'SunSounds', tags: ['Piano', 'Breeze', 'Chimes'], gradient: 'linear-gradient(135deg,#FFD580,#FFA94D)', img: '🌅' },
    { id: 4, title: 'Midnight Reverie', mood: 'melancholy', duration: '52 min', plays: '15.2k', creator: 'LunaLab', tags: ['Cello', 'Rain', 'City'], gradient: 'linear-gradient(135deg,#C7AEDE,#8B6BAE)', img: '🌙' },
    { id: 5, title: 'Electric Jungle', mood: 'energize', duration: '35 min', plays: '21.9k', creator: 'BeatForest', tags: ['Drums', 'Nature', 'Bass'], gradient: 'linear-gradient(135deg,#FFB347,#E8832A)', img: '🌿' },
    { id: 6, title: 'Ocean Lullaby', mood: 'sleep', duration: '8 hr', plays: '45.3k', creator: 'DreamWave', tags: ['Waves', 'Wind', 'Whale'], gradient: 'linear-gradient(135deg,#8BA7D0,#5C7FAD)', img: '🌊' },
    { id: 7, title: 'Rainy Café Afternoon', mood: 'focus', duration: '90 min', plays: '33.6k', creator: 'UrbanSounds', tags: ['Rain', 'Coffee', 'Jazz'], gradient: 'linear-gradient(135deg,#B5C8D8,#7DA2B8)', img: '☕' },
    { id: 8, title: 'Cherry Blossom Walk', mood: 'calm', duration: '25 min', plays: '9.1k', creator: 'ZenAudio', tags: ['Birds', 'Flute', 'Steps'], gradient: 'linear-gradient(135deg,#FFB6C1,#F08090)', img: '🌸' },
  ];

  const socialPosts = [
    { id: 1, user: 'Aria Chen', handle: '@ariazen', avatar: '🧘', sound: 'Morning Mist Ritual', likes: 847, shares: 124, time: '2h ago', caption: 'My morning ritual just got a whole new dimension ✨ This soundscape literally shifted my whole energy. Highly recommend for sunrise meditation!', tags: ['morning', 'meditation', 'calm'] },
    { id: 2, user: 'Marcus Webb', handle: '@mwebb_sounds', avatar: '🎵', sound: 'Thunderstorm Focus', likes: 2341, shares: 456, time: '5h ago', caption: 'Created this one during a late-night coding session — binaural beats + distant thunder = 4 hours of uninterrupted flow state 🔥', tags: ['focus', 'coding', 'productivity'] },
    { id: 3, user: 'Sofia Reyes', handle: '@sofialuna', avatar: '🌙', sound: 'Desert Stars & Silence', likes: 1203, shares: 289, time: '1d ago', caption: 'Inspired by my trip to Joshua Tree. Crickets, wind, and the hum of nothing. This one heals something deep.', tags: ['sleep', 'nature', 'healing'] },
    { id: 4, user: 'Kai Tanaka', handle: '@kaibeats', avatar: '⚡', sound: 'Neon Tokyo Rush', likes: 3891, shares: 678, time: '2d ago', caption: 'Channeling city energy without leaving home. Layered street sounds with lo-fi synth — this is my pre-gym anthem now.', tags: ['energy', 'urban', 'workout'] },
  ];

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const navigate = (tab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const handlePlaySound = (sound) => {
    if (currentSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sound);
      setIsPlaying(true);
    }
  };

  const handleGenerateMood = () => {
    if (!selectedMood && !moodInput) return;
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2200);
  };

  const toggleSave = (id) => {
    setSavedScapes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFollow = (id) => {
    setFollowing(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ─── Status Bar ───
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600, color: C.plumDark }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.5C9.8 2.5 11.9 3.4 13.4 4.9L14.8 3.5C12.9 1.6 10.3 0.5 7.5 0.5C4.7 0.5 2.1 1.6 0.2 3.5L1.6 4.9C3.1 3.4 5.2 2.5 7.5 2.5Z" fill={C.plumDark}/><path d="M7.5 5.5C9.0 5.5 10.4 6.1 11.4 7.1L12.8 5.7C11.4 4.3 9.5 3.5 7.5 3.5C5.5 3.5 3.6 4.3 2.2 5.7L3.6 7.1C4.6 6.1 6.0 5.5 7.5 5.5Z" fill={C.plumDark}/><circle cx="7.5" cy="9.5" r="1.5" fill={C.plumDark}/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke={C.plumDark} strokeWidth="1" fill="none"/><rect x="23" y="3.5" width="1.5" height="5" rx="0.75" fill={C.plumDark}/><rect x="2" y="2" width="16" height="8" rx="2" fill={C.plumDark}/></svg>
      </div>
    </div>
  );

  // ─── Dynamic Island ───
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0 8px' }}>
      <div style={{ width: isPlaying ? 120 : 90, height: 30, background: '#1A0A14', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'width 0.4s cubic-bezier(0.34,1.56,0.64,1)', cursor: 'pointer' }} onClick={() => isPlaying && setPlayerExpanded(true)}>
        {isPlaying && currentSound ? (
          <>
            <span style={{ fontSize: 12 }}>{currentSound.img}</span>
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ width: 2.5, background: C.amber, borderRadius: 2, animation: `wave${i} 0.8s ease-in-out infinite`, animationDelay: `${i*0.12}s` }} />
              ))}
            </div>
          </>
        ) : (
          <div style={{ width: 10, height: 10, background: '#333', borderRadius: '50%' }} />
        )}
      </div>
    </div>
  );

  // ─── Bottom Nav ───
  const BottomNav = () => {
    const tabs = [
      { id: 'home', icon: window.lucide.Home, label: 'Discover' },
      { id: 'player', icon: window.lucide.Music2, label: 'Player' },
      { id: 'library', icon: window.lucide.Library, label: 'Library' },
      { id: 'social', icon: window.lucide.Users, label: 'Social' },
      { id: 'profile', icon: window.lucide.User, label: 'Profile' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 72, background: C.white, borderTop: `1px solid ${C.peach}`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 4px 8px', zIndex: 100 }}>
        {tabs.map(({ id, icon: Icon, label }) => {
          const active = activeTab === id;
          return (
            <button key={id} onClick={() => navigate(id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px 0', transition: 'transform 0.15s', transform: active ? 'scale(1.1)' : 'scale(1)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: active ? C.grad1 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s', boxShadow: active ? '0 4px 12px rgba(246,166,35,0.35)' : 'none' }}>
                <Icon size={18} color={active ? C.white : C.textMuted} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span style={{ fontSize: 9.5, fontFamily: "'Sora', sans-serif", fontWeight: active ? 700 : 500, color: active ? C.plum : C.textMuted, letterSpacing: 0.3 }}>{label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // ─── Screen: Home ───
  const HomeScreen = () => {
    const featured = soundscapes.filter(s => [1,3,4,6].includes(s.id));
    const trending = soundscapes.filter(s => [2,5,7,8].includes(s.id));

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, animation: 'fadeIn 0.35s ease' }}>
        {/* Header */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontFamily: "'Sora', sans-serif", color: C.textMuted, fontWeight: 500 }}>Good evening, Maya 🌅</p>
              <h1 style={{ margin: '2px 0 0', fontSize: 22, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark, lineHeight: 1.2 }}>How are you<br/>feeling today?</h1>
            </div>
            <button onClick={() => navigate('profile')} style={{ width: 40, height: 40, borderRadius: 20, background: C.grad2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(107,58,91,0.35)' }}>
              <span style={{ fontSize: 18 }}>🎧</span>
            </button>
          </div>
        </div>

        {/* Mood Selector */}
        <div style={{ padding: '0 16px 20px' }}>
          <div style={{ background: C.gradCard, borderRadius: 20, padding: 16, border: `1px solid ${C.peach}` }}>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>Select Your Mood</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {moods.map(mood => (
                <button key={mood.id} onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)} style={{ background: selectedMood === mood.id ? mood.color : C.white, border: selectedMood === mood.id ? `2px solid ${C.amber}` : `1.5px solid ${C.peach}`, borderRadius: 14, padding: '10px 6px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', transform: selectedMood === mood.id ? 'scale(1.05)' : 'scale(1)', boxShadow: selectedMood === mood.id ? '0 4px 16px rgba(246,166,35,0.3)' : 'none' }}>
                  <div style={{ fontSize: 20, marginBottom: 3 }}>{mood.emoji}</div>
                  <div style={{ fontSize: 11, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{mood.label}</div>
                  <div style={{ fontSize: 9, fontFamily: "'Quicksand', sans-serif", color: C.textMuted, marginTop: 1 }}>{mood.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={handleGenerateMood} disabled={!selectedMood && !moodInput} style={{ width: '100%', marginTop: 12, padding: '12px 0', background: selectedMood || moodInput ? C.grad1 : C.peach, border: 'none', borderRadius: 14, cursor: selectedMood || moodInput ? 'pointer' : 'default', fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: selectedMood || moodInput ? C.white : C.textMuted, boxShadow: selectedMood || moodInput ? '0 6px 20px rgba(246,166,35,0.4)' : 'none', transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {generating ? (
                <>
                  <div style={{ width: 14, height: 14, border: `2.5px solid rgba(255,255,255,0.4)`, borderTopColor: C.white, borderRadius: '50%', animation: 'spinRing 0.7s linear infinite' }} />
                  Generating your soundscape...
                </>
              ) : generated ? '✨ Play Your Echo' : '✨ Generate My Soundscape'}
            </button>
            {generated && (
              <div style={{ marginTop: 10, padding: '10px 14px', background: 'linear-gradient(135deg, rgba(246,166,35,0.15), rgba(255,182,193,0.15))', borderRadius: 12, border: `1px solid ${C.amber}`, animation: 'fadeIn 0.4s ease', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => { handlePlaySound(soundscapes.find(s => s.mood === selectedMood) || soundscapes[0]); navigate('player'); }}>
                <span style={{ fontSize: 22 }}>{moods.find(m => m.id === selectedMood)?.emoji || '🌿'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>AI Echo Generated ✓</div>
                  <div style={{ fontSize: 10.5, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>Tap to listen now</div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <window.lucide.Play size={14} color={C.white} fill={C.white} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Featured */}
        <div style={{ paddingBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 12px' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>Featured Echoes</h2>
            <button style={{ border: 'none', background: 'transparent', fontSize: 12, fontFamily: "'Sora', sans-serif", color: C.amber, fontWeight: 600, cursor: 'pointer' }}>See all</button>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
            {featured.map(s => (
              <div key={s.id} onClick={() => { handlePlaySound(s); navigate('player'); }} style={{ minWidth: 150, borderRadius: 18, background: s.gradient, padding: 16, cursor: 'pointer', position: 'relative', overflow: 'hidden', flexShrink: 0, boxShadow: '0 8px 24px rgba(107,58,91,0.18)', transition: 'transform 0.2s', transform: 'scale(1)' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{s.img}</div>
                <div style={{ fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.white, marginBottom: 3, textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>{s.title}</div>
                <div style={{ fontSize: 10, fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>{s.duration} • {s.plays} plays</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {s.tags.slice(0,2).map(t => (
                    <span key={t} style={{ fontSize: 9, background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '2px 7px', color: C.white, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <button onClick={e => { e.stopPropagation(); toggleSave(s.id); }} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <window.lucide.Bookmark size={13} color={C.white} fill={savedScapes.includes(s.id) ? C.white : 'none'} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div style={{ padding: '0 20px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 16, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>Trending Now 🔥</h2>
          {trending.map(s => (
            <div key={s.id} onClick={() => { handlePlaySound(s); navigate('player'); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: C.white, borderRadius: 16, marginBottom: 8, cursor: 'pointer', border: `1px solid ${C.peach}`, transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}
              onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ width: 46, height: 46, borderRadius: 14, background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{s.title}</div>
                <div style={{ fontSize: 11, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{s.creator} • {s.plays} plays</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={e => { e.stopPropagation(); toggleSave(s.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <window.lucide.Heart size={16} color={liked[s.id] ? '#E85D8A' : C.textMuted} fill={liked[s.id] ? '#E85D8A' : 'none'} />
                </button>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(246,166,35,0.35)' }}>
                  <window.lucide.Play size={13} color={C.white} fill={C.white} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Screen: Player ───
  const PlayerScreen = () => {
    const s = currentSound || soundscapes[0];
    const [progress, setProgress] = useState(34);

    useEffect(() => {
      if (!isPlaying) return;
      const id = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 0.1), 300);
      return () => clearInterval(id);
    }, [isPlaying]);

    const moodInfo = moods.find(m => m.id === s.mood);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px', paddingBottom: 80, animation: 'fadeIn 0.35s ease', overflowY: 'auto' }}>
        {/* Art */}
        <div style={{ margin: '8px 0 20px', borderRadius: 28, background: s.gradient, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 16px 48px rgba(107,58,91,0.25)', flexShrink: 0 }}>
          <div style={{ fontSize: 80, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))', animation: isPlaying ? 'pulse 2.5s ease-in-out infinite' : 'none' }}>{s.img}</div>
          {isPlaying && (
            <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'flex-end', height: 44 }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ width: 5, background: 'rgba(255,255,255,0.7)', borderRadius: 3, animation: `wave${i} ${0.6 + i*0.1}s ease-in-out infinite`, animationDelay: `${i*0.08}s` }} />
              ))}
            </div>
          )}
          <button onClick={() => toggleSave(s.id)} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
            <window.lucide.Bookmark size={16} color={C.white} fill={savedScapes.includes(s.id) ? C.white : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{s.title}</h2>
            <p style={{ margin: '3px 0 0', fontSize: 13, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>by {s.creator} • {s.duration}</p>
          </div>
          <button onClick={() => toggleLike(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', animation: liked[s.id] ? 'heartBeat 0.8s ease' : 'none', padding: 4 }}>
            <window.lucide.Heart size={24} color={liked[s.id] ? '#E85D8A' : C.textMuted} fill={liked[s.id] ? '#E85D8A' : 'none'} />
          </button>
        </div>

        {/* Mood tag */}
        {moodInfo && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: moodInfo.color + '55', borderRadius: 20, padding: '4px 12px', marginBottom: 16, width: 'fit-content' }}>
            <span style={{ fontSize: 12 }}>{moodInfo.emoji}</span>
            <span style={{ fontSize: 11, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{moodInfo.label} Mode</span>
          </div>
        )}

        {/* Progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ height: 5, background: C.peach, borderRadius: 4, overflow: 'hidden', cursor: 'pointer', marginBottom: 6 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: C.grad1, borderRadius: 4, transition: 'width 0.3s linear', position: 'relative' }}>
              <div style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)', width: 10, height: 10, borderRadius: '50%', background: C.amber, boxShadow: '0 2px 8px rgba(246,166,35,0.5)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: "'Sora', sans-serif", color: C.textMuted }}>
            <span>{Math.floor(progress / 100 * 45)}:{String(Math.floor((progress / 100 * 45 * 60) % 60)).padStart(2,'0')}</span>
            <span>{s.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <window.lucide.Shuffle size={20} color={C.textMuted} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <window.lucide.SkipBack size={24} color={C.plumDark} />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} style={{ width: 64, height: 64, borderRadius: '50%', background: C.grad1, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(246,166,35,0.45)', transition: 'transform 0.15s', transform: 'scale(1)' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.92)'}
            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isPlaying ? <window.lucide.Pause size={26} color={C.white} fill={C.white} /> : <window.lucide.Play size={26} color={C.white} fill={C.white} style={{ marginLeft: 3 }} />}
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <window.lucide.SkipForward size={24} color={C.plumDark} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <window.lucide.Repeat size={20} color={C.textMuted} />
          </button>
        </div>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <window.lucide.Volume1 size={16} color={C.textMuted} />
          <div style={{ flex: 1, height: 4, background: C.peach, borderRadius: 4, cursor: 'pointer', position: 'relative' }} onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setVolume(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
            <div style={{ width: `${volume}%`, height: '100%', background: C.grad1, borderRadius: 4 }} />
          </div>
          <window.lucide.Volume2 size={16} color={C.textMuted} />
          <span style={{ fontSize: 11, fontFamily: "'Sora', sans-serif", color: C.textMuted, minWidth: 28 }}>{volume}%</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {s.tags.map(t => (
            <span key={t} style={{ fontSize: 11, fontFamily: "'Quicksand', sans-serif", fontWeight: 600, background: C.gradCard, border: `1px solid ${C.peach}`, borderRadius: 20, padding: '4px 12px', color: C.plumDark }}>{t}</span>
          ))}
        </div>

        {/* Share */}
        <button style={{ width: '100%', padding: '13px 0', background: 'transparent', border: `2px solid ${C.plum}`, borderRadius: 16, cursor: 'pointer', fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: C.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <window.lucide.Share2 size={16} color={C.plum} />
          Share this Soundscape
        </button>
      </div>
    );
  };

  // ─── Screen: Library ───
  const LibraryScreen = () => {
    const filters = ['All', 'Calm', 'Focus', 'Happy', 'Sleep', 'Energy'];
    const filtered = activeFilter === 'All' ? soundscapes : soundscapes.filter(s => s.mood.toLowerCase().includes(activeFilter.toLowerCase()) || (activeFilter === 'Energy' && s.mood === 'energize'));

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, animation: 'fadeIn 0.35s ease' }}>
        <div style={{ padding: '0 20px 16px' }}>
          <h1 style={{ margin: 0, fontSize: 22, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>My Library</h1>
          <p style={{ margin: '2px 0 0', fontSize: 13, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{savedScapes.length} saved soundscapes</p>
        </div>

        {/* Playlists */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { name: 'Morning Rituals', count: 5, emoji: '🌅', gradient: 'linear-gradient(135deg,#FFD580,#FFA94D)' },
              { name: 'Late Night', count: 8, emoji: '🌙', gradient: 'linear-gradient(135deg,#C7AEDE,#8B6BAE)' },
              { name: 'Work Mode', count: 12, emoji: '💻', gradient: 'linear-gradient(135deg,#A3C4F3,#6B9FE4)' },
            ].map(p => (
              <div key={p.name} style={{ flex: 1, borderRadius: 16, background: p.gradient, padding: '12px 10px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(107,58,91,0.15)' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{p.emoji}</div>
                <div style={{ fontSize: 11, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.white, lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontSize: 10, fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{p.count} echoes</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 16px', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ whiteSpace: 'nowrap', padding: '7px 16px', borderRadius: 20, border: 'none', background: activeFilter === f ? C.grad1 : C.white, color: activeFilter === f ? C.white : C.textMuted, fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, cursor: 'pointer', boxShadow: activeFilter === f ? '0 4px 14px rgba(246,166,35,0.35)' : '0 1px 4px rgba(107,58,91,0.08)', transition: 'all 0.2s', flexShrink: 0 }}>
              {f}
            </button>
          ))}
        </div>

        {/* Saved Sounds */}
        <div style={{ padding: '0 20px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 15, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>All Echoes</h3>
          {filtered.map(s => (
            <div key={s.id} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: savedScapes.includes(s.id) ? C.gradCard : C.white, borderRadius: 18, marginBottom: 8, border: savedScapes.includes(s.id) ? `1.5px solid ${C.amber}` : `1px solid ${C.peach}`, cursor: 'pointer', transition: 'all 0.2s', boxShadow: savedScapes.includes(s.id) ? '0 4px 16px rgba(246,166,35,0.15)' : '0 2px 8px rgba(107,58,91,0.06)' }}
              onClick={() => { handlePlaySound(s); navigate('player'); }}
            >
              <div style={{ width: 50, height: 50, borderRadius: 14, background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{s.img}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</div>
                <div style={{ fontSize: 11, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{s.creator} • {s.duration}</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  {s.tags.slice(0,2).map(t => <span key={t} style={{ fontSize: 9, background: C.peach, borderRadius: 20, padding: '1px 7px', color: C.plum, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>{t}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <button onClick={e => { e.stopPropagation(); toggleSave(s.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                  <window.lucide.Bookmark size={16} color={savedScapes.includes(s.id) ? C.amber : C.textMuted} fill={savedScapes.includes(s.id) ? C.amber : 'none'} />
                </button>
                <window.lucide.MoreVertical size={14} color={C.textMuted} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Screen: Social ───
  const SocialScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, animation: 'fadeIn 0.35s ease' }}>
      <div style={{ padding: '0 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>Community</h1>
          <p style={{ margin: '2px 0 0', fontSize: 13, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>Shared soundscapes from the world</p>
        </div>
        <button style={{ padding: '8px 14px', background: C.grad2, border: 'none', borderRadius: 20, cursor: 'pointer', fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 700, color: C.white, boxShadow: '0 4px 14px rgba(107,58,91,0.35)' }}>+ Share</button>
      </div>

      {/* Trending Creators */}
      <div style={{ padding: '0 20px 20px' }}>
        <h3 style={{ margin: '0 0 10px', fontSize: 14, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>Top Creators</h3>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { name: 'NatureAI', emoji: '🌿', followers: '24k' },
            { name: 'MindWave', emoji: '🧠', followers: '18k' },
            { name: 'LunaLab', emoji: '🌙', followers: '31k' },
            { name: 'DreamWave', emoji: '🌊', followers: '45k' },
            { name: 'ZenAudio', emoji: '🌸', followers: '12k' },
          ].map((c, i) => (
            <div key={c.name} style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ width: 52, height: 52, borderRadius: 18, background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 4px', boxShadow: '0 4px 14px rgba(246,166,35,0.3)', border: following[i] ? `2.5px solid ${C.plum}` : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => toggleFollow(i)}>
                {c.emoji}
              </div>
              <div style={{ fontSize: 10, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{c.name}</div>
              <div style={{ fontSize: 9, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{c.followers}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div style={{ padding: '0 20px' }}>
        {socialPosts.map(post => (
          <div key={post.id} style={{ background: C.white, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${C.peach}`, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 3px 10px rgba(246,166,35,0.3)' }}>{post.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{post.user}</div>
                <div style={{ fontSize: 11, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{post.handle} • {post.time}</div>
              </div>
              <button onClick={() => toggleFollow(post.id + 100)} style={{ padding: '5px 12px', background: following[post.id + 100] ? C.peach : C.grad2, border: 'none', borderRadius: 20, cursor: 'pointer', fontSize: 11, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: following[post.id + 100] ? C.plum : C.white, transition: 'all 0.2s' }}>
                {following[post.id + 100] ? 'Following' : 'Follow'}
              </button>
            </div>

            <p style={{ margin: '0 0 10px', fontSize: 13, fontFamily: "'Quicksand', sans-serif", color: C.text, lineHeight: 1.5 }}>{post.caption}</p>

            {/* Sound card */}
            <div style={{ background: C.gradCard, borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, border: `1px solid ${C.peach}`, cursor: 'pointer' }} onClick={() => { handlePlaySound(soundscapes[post.id - 1]); navigate('player'); }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{soundscapes[post.id - 1]?.img || '🎵'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{post.sound}</div>
                <div style={{ fontSize: 10, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>Soundscape • Tap to preview</div>
              </div>
              <window.lucide.Play size={16} color={C.amber} fill={C.amber} />
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {post.tags.map(t => <span key={t} style={{ fontSize: 10, fontFamily: "'Quicksand', sans-serif", fontWeight: 600, color: C.plumLight, background: C.peach, borderRadius: 20, padding: '2px 9px' }}>#{t}</span>)}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 16, borderTop: `1px solid ${C.peach}`, paddingTop: 10 }}>
              <button onClick={() => toggleLike(`post_${post.id}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, color: liked[`post_${post.id}`] ? '#E85D8A' : C.textMuted }}>
                <window.lucide.Heart size={16} color={liked[`post_${post.id}`] ? '#E85D8A' : C.textMuted} fill={liked[`post_${post.id}`] ? '#E85D8A' : 'none'} />
                {liked[`post_${post.id}`] ? post.likes + 1 : post.likes}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, color: C.textMuted }}>
                <window.lucide.Share2 size={16} color={C.textMuted} />
                {post.shares}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, color: C.textMuted }}>
                <window.lucide.MessageCircle size={16} color={C.textMuted} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Screen: Profile ───
  const ProfileScreen = () => {
    const stats = [
      { label: 'Echoes', value: '47' },
      { label: 'Hours', value: '128' },
      { label: 'Followers', value: '1.2k' },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, animation: 'fadeIn 0.35s ease' }}>
        {/* Header */}
        <div style={{ background: C.grad2, padding: '0 20px 24px', borderRadius: '0 0 28px 28px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.white }}>Profile</h2>
            <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 20, padding: '6px 14px', cursor: 'pointer', fontSize: 11, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.white }}>Edit</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 66, height: 66, borderRadius: 22, background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, border: '3px solid rgba(255,255,255,0.3)' }}>🎧</div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.white }}>Maya Solis</h3>
              <p style={{ margin: '2px 0', fontSize: 12, fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.75)' }}>@mayazen • Sound enthusiast 🌿</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {stats.map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.white }}>{s.value}</div>
                    <div style={{ fontSize: 9, fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.7)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wearable */}
        <div style={{ margin: '0 20px 16px' }}>
          <div style={{ background: C.white, borderRadius: 20, padding: 16, border: `1px solid ${C.peach}`, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 14, background: wearableConnected ? 'linear-gradient(135deg,#A8D8B9,#7EC8A4)' : C.peach, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⌚</div>
                <div>
                  <div style={{ fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>Wearable Integration</div>
                  <div style={{ fontSize: 11, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{wearableConnected ? 'Apple Watch connected' : 'Not connected'}</div>
                </div>
              </div>
              <button onClick={() => setWearableConnected(!wearableConnected)} style={{ width: 44, height: 24, borderRadius: 12, background: wearableConnected ? C.grad1 : C.peach, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                <div style={{ position: 'absolute', top: 2, left: wearableConnected ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: C.white, transition: 'left 0.3s', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
              </button>
            </div>
            {wearableConnected && (
              <div style={{ background: 'linear-gradient(135deg,rgba(168,216,185,0.2),rgba(126,200,164,0.1))', borderRadius: 12, padding: '10px 12px', display: 'flex', gap: 14, animation: 'fadeIn 0.3s ease' }}>
                {[{ icon: '❤️', label: 'Heart Rate', value: '68 bpm' }, { icon: '😴', label: 'Sleep Score', value: '84/100' }, { icon: '🧘', label: 'Stress', value: 'Low' }].map(m => (
                  <div key={m.label} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: 16, marginBottom: 2 }}>{m.icon}</div>
                    <div style={{ fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>{m.value}</div>
                    <div style={{ fontSize: 9, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Preferences */}
        <div style={{ margin: '0 20px 16px' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 15, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>AI Sound Preferences</h3>
          <div style={{ background: C.white, borderRadius: 20, overflow: 'hidden', border: `1px solid ${C.peach}`, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
            {[
              { label: 'Nature Sounds', value: 85, color: '#A8D8B9' },
              { label: 'Binaural Beats', value: 60, color: '#A3C4F3' },
              { label: 'Ambient Music', value: 75, color: '#C7AEDE' },
              { label: 'Instrumental', value: 45, color: '#FFD580' },
            ].map((p, i, arr) => (
              <div key={p.label} style={{ padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.peach}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, color: C.plumDark }}>{p.label}</span>
                  <span style={{ fontSize: 12, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.textMuted }}>{p.value}%</span>
                </div>
                <div style={{ height: 5, background: C.peach, borderRadius: 4 }}>
                  <div style={{ width: `${p.value}%`, height: '100%', background: p.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ margin: '0 20px' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 15, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.plumDark }}>Settings</h3>
          <div style={{ background: C.white, borderRadius: 20, overflow: 'hidden', border: `1px solid ${C.peach}`, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
            {[
              { icon: window.lucide.Bell, label: 'Notifications', right: '🔔' },
              { icon: window.lucide.Download, label: 'Offline Downloads', right: '→' },
              { icon: window.lucide.Shield, label: 'Privacy & Data', right: '→' },
              { icon: window.lucide.Headphones, label: 'Audio Quality', right: 'High' },
              { icon: window.lucide.LogOut, label: 'Sign Out', right: null, danger: true },
            ].map((item, i, arr) => (
              <button key={item.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', borderBottom: i < arr.length - 1 ? `1px solid ${C.peach}` : 'none', cursor: 'pointer', textAlign: 'left' }}>
                <item.icon size={18} color={item.danger ? '#E85D8A' : C.plumLight} />
                <span style={{ flex: 1, fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 600, color: item.danger ? '#E85D8A' : C.plumDark }}>{item.label}</span>
                {item.right && <span style={{ fontSize: 12, fontFamily: "'Quicksand', sans-serif", color: C.textMuted }}>{item.right}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const screens = { home: HomeScreen, player: PlayerScreen, library: LibraryScreen, social: SocialScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeTab] || HomeScreen;

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{ minHeight: '100vh', background: '#1A0A14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Sora', sans-serif" }}>
        {/* Phone Frame */}
        <div style={{ width: 375, height: 812, background: C.bg, borderRadius: 52, position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 10px #2A1A24, 0 0 0 12px #3A2A34', display: 'flex', flexDirection: 'column' }}>
          <StatusBar />
          <DynamicIsland />
          <ActiveScreen />
          <BottomNav />
        </div>
      </div>
    </>
  );
}
