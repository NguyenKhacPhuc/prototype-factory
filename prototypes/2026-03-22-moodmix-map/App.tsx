
function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#0D0D14',
      surface: '#16161F',
      surfaceAlt: '#1E1E2C',
      surfaceHigh: '#252535',
      primary: '#A855F7',
      primaryLight: '#C084FC',
      primaryDim: '#7C3AED33',
      secondary: '#06B6D4',
      accent: '#F472B6',
      text: '#F0EEFF',
      textSub: '#9090B0',
      textMuted: '#5A5A7A',
      border: '#2A2A3E',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
      gradA: '#A855F7',
      gradB: '#06B6D4',
      cardGlow: 'rgba(168,85,247,0.15)',
    },
    light: {
      bg: '#F3F0FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE9FE',
      surfaceHigh: '#DDD6FE',
      primary: '#7C3AED',
      primaryLight: '#A855F7',
      primaryDim: '#7C3AED22',
      secondary: '#0891B2',
      accent: '#DB2777',
      text: '#1A1033',
      textSub: '#6B7280',
      textMuted: '#9CA3AF',
      border: '#DDD6FE',
      success: '#059669',
      warning: '#D97706',
      danger: '#DC2626',
      gradA: '#7C3AED',
      gradB: '#0891B2',
      cardGlow: 'rgba(124,58,237,0.1)',
    }
  };

  const [activeTheme, setActiveTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generatedPlaylist, setGeneratedPlaylist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [pressedItem, setPressedItem] = useState(null);
  const [notifOn, setNotifOn] = useState(true);
  const [locationOn, setLocationOn] = useState(true);
  const [calendarOn, setCalendarOn] = useState(false);
  const [weatherOn, setWeatherOn] = useState(true);
  const [currentTime, setCurrentTime] = useState('9:41');

  const t = themes[activeTheme];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const moods = [
    { id: 'calm', label: 'Calm', emoji: '🌊', color: '#06B6D4', desc: 'Serene & steady' },
    { id: 'focus', label: 'Focus', emoji: '🎯', color: '#A855F7', desc: 'Deep & clear' },
    { id: 'energize', label: 'Energize', emoji: '⚡', color: '#FBBF24', desc: 'Pump it up' },
    { id: 'recover', label: 'Recover', emoji: '🌿', color: '#34D399', desc: 'Ease & restore' },
    { id: 'uplift', label: 'Uplift', emoji: '✨', color: '#F472B6', desc: 'Joy & light' },
    { id: 'groove', label: 'Groove', emoji: '🎵', color: '#F97316', desc: 'Move & flow' },
  ];

  const activities = [
    { id: 'commute', label: 'Commute', icon: '🚇', duration: '12 min' },
    { id: 'work', label: 'Deep Work', icon: '💻', duration: '45 min' },
    { id: 'gym', label: 'Post-Gym', icon: '🏋️', duration: '20 min' },
    { id: 'chores', label: 'Chores', icon: '🧹', duration: '30 min' },
    { id: 'creative', label: 'Creative', icon: '🎨', duration: '60 min' },
    { id: 'unwind', label: 'Unwind', icon: '🛋️', duration: '25 min' },
  ];

  const contextCards = [
    { label: '9:41 AM', sub: 'Sunday morning', icon: '☀️', type: 'time' },
    { label: 'Partly Cloudy', sub: '68°F · NYC', icon: '⛅', type: 'weather' },
    { label: 'Free until 12pm', sub: 'Calendar clear', icon: '📅', type: 'calendar' },
    { label: 'Home', sub: 'Location detected', icon: '🏠', type: 'location' },
  ];

  const suggestedMixes = [
    {
      id: 1,
      title: 'Sunday Morning Ease',
      tags: ['Calm', 'Home', '☀️'],
      duration: '28 min · 7 songs',
      color: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4, #7C3AED)',
      tracks: [
        { title: 'Golden Hour', artist: 'Kacey Musgraves', dur: '3:42' },
        { title: 'Sunday Morning', artist: 'Maroon 5', dur: '4:05' },
        { title: 'Slow Burn', artist: 'Kacey Musgraves', dur: '3:46' },
        { title: 'Easy', artist: 'Mac Ayres', dur: '3:12' },
        { title: 'Bloom', artist: 'The Paper Kites', dur: '4:18' },
        { title: 'Georgia', artist: 'Vance Joy', dur: '3:20' },
        { title: 'Holocene', artist: 'Bon Iver', dur: '5:37' },
      ]
    },
    {
      id: 2,
      title: 'Late-Night Creative',
      tags: ['Focus', 'Night', '🎨'],
      duration: '52 min · 12 songs',
      color: '#A855F7',
      gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
      tracks: [
        { title: 'Motion Picture Soundtrack', artist: 'Radiohead', dur: '4:27' },
        { title: 'Retrograde', artist: 'James Blake', dur: '4:15' },
        { title: 'Lush Life', artist: 'Zara Larsson', dur: '3:01' },
        { title: 'Intro', artist: 'The xx', dur: '2:07' },
        { title: 'Lost in the Light', artist: 'Bahamas', dur: '4:32' },
        { title: 'Electric Feel', artist: 'MGMT', dur: '3:49' },
      ]
    },
    {
      id: 3,
      title: 'Confidence Boost',
      tags: ['Energize', 'Morning', '⚡'],
      duration: '15 min · 4 songs',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
      tracks: [
        { title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', dur: '3:56' },
        { title: 'Uptown Funk', artist: 'Bruno Mars', dur: '4:30' },
        { title: 'Happy', artist: 'Pharrell Williams', dur: '3:52' },
        { title: 'Good as Hell', artist: 'Lizzo', dur: '2:39' },
      ]
    }
  ];

  const historyItems = [
    { title: 'Post-Gym Cooldown', time: 'Yesterday · 6:30 PM', songs: 8, mood: 'Recover', color: '#34D399' },
    { title: 'Commute Reset', time: 'Yesterday · 8:15 AM', songs: 5, mood: 'Energize', color: '#FBBF24' },
    { title: 'Friday Focus Block', time: 'Fri · 2:00 PM', songs: 14, mood: 'Focus', color: '#A855F7' },
    { title: 'Late-Night Creative', time: 'Thu · 11:15 PM', songs: 12, mood: 'Focus', color: '#A855F7' },
    { title: 'Morning Uplift', time: 'Thu · 7:45 AM', songs: 6, mood: 'Uplift', color: '#F472B6' },
  ];

  const handleGenerateMix = () => {
    if (!selectedMood) return;
    setIsGenerating(true);
    setGeneratingProgress(0);
    setGeneratedPlaylist(null);
    const interval = setInterval(() => {
      setGeneratingProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          const mood = moods.find(m => m.id === selectedMood);
          const activity = activities.find(a => a.id === selectedActivity);
          setGeneratedPlaylist({
            title: `${mood?.label || 'Custom'} ${activity ? '· ' + activity.label : ''} Mix`,
            color: mood?.color || '#A855F7',
            tracks: suggestedMixes[0].tracks,
            duration: activity?.duration || '20 min',
          });
          return 100;
        }
        return p + 12;
      });
    }, 200);
  };

  const press = (id) => {
    setPressedItem(id);
    setTimeout(() => setPressedItem(null), 150);
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedItem === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  });

  // ──────────────────────────────────────────────
  // Screens
  // ──────────────────────────────────────────────

  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      {/* Hero greeting */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 2, fontWeight: 500 }}>GOOD MORNING</p>
        <h2 style={{ color: t.text, fontSize: 24, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          What's your moment?
        </h2>
        <p style={{ color: t.textSub, fontSize: 13, marginTop: 4 }}>Context detected · 4 signals active</p>
      </div>

      {/* Context chips */}
      <div style={{ display: 'flex', gap: 8, padding: '14px 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {contextCards.map(c => (
          <div key={c.type} style={{
            background: t.surfaceAlt,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 16 }}>{c.icon}</span>
            <div>
              <p style={{ color: t.text, fontSize: 11, fontWeight: 700, margin: 0 }}>{c.label}</p>
              <p style={{ color: t.textMuted, fontSize: 10, margin: 0 }}>{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested for you */}
      <div style={{ padding: '4px 20px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p style={{ color: t.text, fontWeight: 700, fontSize: 16, margin: 0 }}>Suggested for now</p>
          <p style={{ color: t.primary, fontSize: 12, fontWeight: 600, margin: 0 }}>See all</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {suggestedMixes.map((mix, i) => (
            <div
              key={mix.id}
              onClick={() => { press(`mix-${mix.id}`); setGeneratedPlaylist(mix); setActiveScreen('player'); setActiveTab('player'); }}
              style={btnStyle(`mix-${mix.id}`, {
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 16,
                padding: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxShadow: i === 0 ? `0 0 20px ${t.cardGlow}` : 'none',
              })}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: mix.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>🎵</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: t.text, fontWeight: 700, fontSize: 14, margin: '0 0 3px' }}>{mix.title}</p>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {mix.tags.map(tag => (
                    <span key={tag} style={{
                      background: t.primaryDim,
                      color: t.primaryLight,
                      fontSize: 10, fontWeight: 600,
                      padding: '2px 7px', borderRadius: 20,
                    }}>{tag}</span>
                  ))}
                </div>
                <p style={{ color: t.textMuted, fontSize: 11, margin: '4px 0 0' }}>{mix.duration}</p>
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: mix.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 14 }}>▶</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart prompts */}
      <div style={{ padding: '4px 20px 16px' }}>
        <p style={{ color: t.text, fontWeight: 700, fontSize: 16, margin: '0 0 12px' }}>Smart transitions</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['Keep me steady 🧘', 'Ramp me up ⚡', 'Wind me down 🌙', 'Shift my vibe 🔄'].map(prompt => (
            <div key={prompt} style={{
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              borderRadius: 20,
              padding: '8px 14px',
              flexShrink: 0,
              cursor: 'pointer',
            }}>
              <p style={{ color: t.text, fontSize: 12, fontWeight: 600, margin: 0 }}>{prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MixScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 2, fontWeight: 500 }}>MIX BUILDER</p>
        <h2 style={{ color: t.text, fontSize: 24, fontWeight: 800, margin: 0 }}>Build your mix</h2>
        <p style={{ color: t.textSub, fontSize: 13, marginTop: 4 }}>Pick a mood & activity to generate</p>
      </div>

      {/* Mood selector */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>How do you want to feel?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {moods.map(mood => (
            <div
              key={mood.id}
              onClick={() => { press(mood.id); setSelectedMood(mood.id); }}
              style={btnStyle(mood.id, {
                background: selectedMood === mood.id ? mood.color + '22' : t.surfaceAlt,
                border: `2px solid ${selectedMood === mood.id ? mood.color : t.border}`,
                borderRadius: 14,
                padding: '12px 8px',
                textAlign: 'center',
                cursor: 'pointer',
              })}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{mood.emoji}</div>
              <p style={{ color: selectedMood === mood.id ? mood.color : t.text, fontSize: 12, fontWeight: 700, margin: 0 }}>{mood.label}</p>
              <p style={{ color: t.textMuted, fontSize: 10, margin: '2px 0 0' }}>{mood.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity selector */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>What are you doing?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {activities.map(act => (
            <div
              key={act.id}
              onClick={() => { press(act.id); setSelectedActivity(act.id); }}
              style={btnStyle(act.id, {
                background: selectedActivity === act.id ? t.primaryDim : t.surfaceAlt,
                border: `2px solid ${selectedActivity === act.id ? t.primary : t.border}`,
                borderRadius: 14,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
              })}
            >
              <span style={{ fontSize: 20 }}>{act.icon}</span>
              <div>
                <p style={{ color: selectedActivity === act.id ? t.primaryLight : t.text, fontSize: 13, fontWeight: 700, margin: 0 }}>{act.label}</p>
                <p style={{ color: t.textMuted, fontSize: 10, margin: '1px 0 0' }}>{act.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <div style={{ padding: '20px 20px 10px' }}>
        {!isGenerating && !generatedPlaylist && (
          <div
            onClick={() => { press('generate'); handleGenerateMix(); }}
            style={btnStyle('generate', {
              background: selectedMood ? `linear-gradient(135deg, ${t.gradA}, ${t.gradB})` : t.surfaceAlt,
              borderRadius: 16,
              padding: '16px',
              textAlign: 'center',
              cursor: selectedMood ? 'pointer' : 'not-allowed',
              opacity: selectedMood ? 1 : 0.5,
            })}
          >
            <p style={{ color: '#fff', fontSize: 16, fontWeight: 800, margin: 0 }}>✨ Generate My Mix</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: '4px 0 0' }}>
              {selectedMood && selectedActivity ? `${moods.find(m=>m.id===selectedMood)?.label} · ${activities.find(a=>a.id===selectedActivity)?.duration}` : 'Select a mood to continue'}
            </p>
          </div>
        )}

        {isGenerating && (
          <div style={{ background: t.surfaceAlt, borderRadius: 16, padding: 20, textAlign: 'center' }}>
            <p style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>🎧 Building your mix...</p>
            <div style={{ background: t.border, borderRadius: 8, height: 6, overflow: 'hidden' }}>
              <div style={{
                background: `linear-gradient(90deg, ${t.gradA}, ${t.gradB})`,
                height: '100%',
                width: `${generatingProgress}%`,
                borderRadius: 8,
                transition: 'width 0.2s ease',
              }} />
            </div>
            <p style={{ color: t.textSub, fontSize: 12, margin: '10px 0 0' }}>Analyzing context · Matching vibe · Curating tracks</p>
          </div>
        )}

        {generatedPlaylist && !isGenerating && (
          <div style={{ background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{
              background: `linear-gradient(135deg, ${generatedPlaylist.color}CC, ${t.gradB}99)`,
              padding: '16px 16px 14px',
            }}>
              <p style={{ color: '#fff', fontSize: 11, fontWeight: 600, margin: '0 0 2px', opacity: 0.8 }}>YOUR MIX IS READY</p>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: 0 }}>{generatedPlaylist.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: '4px 0 0' }}>{generatedPlaylist.duration} · {generatedPlaylist.tracks.length} songs</p>
            </div>
            <div style={{ padding: '12px 16px' }}>
              {generatedPlaylist.tracks.slice(0, 4).map((track, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ color: t.textMuted, fontSize: 11, width: 14, textAlign: 'center' }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: t.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{track.title}</p>
                    <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{track.artist}</p>
                  </div>
                  <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{track.dur}</p>
                </div>
              ))}
              <div
                onClick={() => { setActiveScreen('player'); setActiveTab('player'); }}
                style={{
                  marginTop: 12, background: `linear-gradient(135deg, ${t.gradA}, ${t.gradB})`,
                  borderRadius: 12, padding: '12px', textAlign: 'center', cursor: 'pointer',
                }}
              >
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>▶ Play Now</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const PlayerScreen = () => {
    const playlist = generatedPlaylist || suggestedMixes[0];
    const track = playlist.tracks[activeTrackIndex];
    const [progress, setProgress] = useState(35);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 90px', overflowY: 'auto' }}>
        {/* Album Art */}
        <div style={{
          width: '100%', aspectRatio: '1',
          background: playlist.gradient || `linear-gradient(135deg, ${playlist.color || t.gradA}, ${t.gradB})`,
          borderRadius: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 72,
          marginBottom: 20,
          boxShadow: `0 20px 60px ${(playlist.color || t.gradA) + '55'}`,
        }}>🎵</div>

        {/* Track info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <p style={{ color: t.text, fontSize: 20, fontWeight: 800, margin: '0 0 2px' }}>{track?.title || 'Unknown'}</p>
            <p style={{ color: t.textSub, fontSize: 14, margin: 0 }}>{track?.artist || 'Unknown'}</p>
          </div>
          <div style={{
            background: t.primaryDim,
            borderRadius: 20,
            padding: '5px 10px',
          }}>
            <p style={{ color: t.primaryLight, fontSize: 11, fontWeight: 600, margin: 0 }}>
              {playlist.title?.split('·')[0]?.trim() || 'Mix'}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{ background: t.border, borderRadius: 4, height: 4, cursor: 'pointer', marginBottom: 6 }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.min(100, Math.max(0, pct)));
            }}
          >
            <div style={{
              background: `linear-gradient(90deg, ${t.gradA}, ${t.gradB})`,
              height: '100%', width: `${progress}%`, borderRadius: 4,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', right: -5, top: '50%',
                transform: 'translateY(-50%)',
                width: 12, height: 12, borderRadius: '50%',
                background: '#fff',
                boxShadow: `0 0 6px ${t.primary}`,
              }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>1:28</p>
            <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{track?.dur || '3:45'}</p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ fontSize: 20, cursor: 'pointer', opacity: 0.7 }}>🔀</div>
          <div
            onClick={() => setActiveTrackIndex(i => Math.max(0, i - 1))}
            style={{ fontSize: 28, cursor: 'pointer' }}
          >⏮</div>
          <div
            onClick={() => setIsPlaying(p => !p)}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.gradA}, ${t.gradB})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, cursor: 'pointer',
              boxShadow: `0 8px 24px ${t.gradA}55`,
            }}
          >{isPlaying ? '⏸' : '▶'}</div>
          <div
            onClick={() => setActiveTrackIndex(i => Math.min(playlist.tracks.length - 1, i + 1))}
            style={{ fontSize: 28, cursor: 'pointer' }}
          >⏭</div>
          <div style={{ fontSize: 20, cursor: 'pointer', opacity: 0.7 }}>❤️</div>
        </div>

        {/* Queue */}
        <div>
          <p style={{ color: t.text, fontWeight: 700, fontSize: 14, margin: '0 0 10px' }}>Up next</p>
          {playlist.tracks.map((track, i) => (
            <div
              key={i}
              onClick={() => setActiveTrackIndex(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 0',
                borderBottom: `1px solid ${t.border}`,
                opacity: i < activeTrackIndex ? 0.4 : 1,
                cursor: 'pointer',
                background: i === activeTrackIndex ? t.primaryDim : 'transparent',
                borderRadius: 8,
                paddingLeft: i === activeTrackIndex ? 8 : 0,
              }}
            >
              <span style={{ color: i === activeTrackIndex ? t.primary : t.textMuted, fontSize: 12, width: 18, textAlign: 'center' }}>
                {i === activeTrackIndex ? '♫' : i + 1}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ color: i === activeTrackIndex ? t.primaryLight : t.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{track.title}</p>
                <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{track.artist}</p>
              </div>
              <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{track.dur}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const HistoryScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 2, fontWeight: 500 }}>YOUR MOMENTS</p>
        <h2 style={{ color: t.text, fontSize: 24, fontWeight: 800, margin: 0 }}>Mix History</h2>
        <p style={{ color: t.textSub, fontSize: 13, marginTop: 4 }}>Moments you've soundtracked</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10, padding: '16px 20px 0' }}>
        {[
          { label: 'Mixes this week', value: '12', icon: '🎵' },
          { label: 'Hrs soundtracked', value: '8.4', icon: '⏱' },
          { label: 'Top mood', value: 'Focus', icon: '🎯' },
        ].map(stat => (
          <div key={stat.label} style={{
            flex: 1, background: t.surfaceAlt, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '10px 8px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 18, margin: 0 }}>{stat.icon}</p>
            <p style={{ color: t.text, fontSize: 16, fontWeight: 800, margin: '2px 0 0' }}>{stat.value}</p>
            <p style={{ color: t.textMuted, fontSize: 9, margin: '2px 0 0', fontWeight: 600 }}>{stat.label.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {/* History list */}
      <div style={{ padding: '16px 20px' }}>
        <p style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Recent mixes</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {historyItems.map((item, i) => (
            <div
              key={i}
              onClick={() => { setActiveScreen('player'); setActiveTab('player'); }}
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 14,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                background: item.color + '33',
                border: `1.5px solid ${item.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>🎵</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: '0 0 2px' }}>{item.title}</p>
                <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{item.time} · {item.songs} songs</p>
              </div>
              <span style={{
                background: item.color + '22',
                color: item.color,
                fontSize: 10, fontWeight: 700,
                padding: '3px 8px', borderRadius: 20,
              }}>{item.mood}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning insight */}
      <div style={{ margin: '0 20px 20px', background: t.primaryDim, border: `1px solid ${t.primary}44`, borderRadius: 16, padding: 16 }}>
        <p style={{ color: t.primaryLight, fontSize: 11, fontWeight: 700, margin: '0 0 4px' }}>🧠 MOODMIX LEARNING</p>
        <p style={{ color: t.text, fontSize: 13, fontWeight: 600, margin: '0 0 4px' }}>You focus best after 2 PM</p>
        <p style={{ color: t.textSub, fontSize: 12, margin: 0, lineHeight: 1.4 }}>
          Based on 8 sessions, your deepest focus blocks happen mid-afternoon. We'll suggest Focus mixes at 2 PM automatically.
        </p>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 2, fontWeight: 500 }}>PREFERENCES</p>
        <h2 style={{ color: t.text, fontSize: 24, fontWeight: 800, margin: 0 }}>Settings</h2>
      </div>

      {/* Profile card */}
      <div style={{ margin: '16px 20px', background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 54, height: 54, borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.gradA}, ${t.gradB})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>🎧</div>
        <div style={{ flex: 1 }}>
          <p style={{ color: t.text, fontSize: 16, fontWeight: 800, margin: '0 0 2px' }}>Alex Rivera</p>
          <p style={{ color: t.textSub, fontSize: 12, margin: 0 }}>Premium · Spotify connected</p>
        </div>
        <div style={{ background: t.success + '22', borderRadius: 8, padding: '4px 8px' }}>
          <p style={{ color: t.success, fontSize: 10, fontWeight: 700, margin: 0 }}>PREMIUM</p>
        </div>
      </div>

      {/* Theme toggle */}
      <div style={{ margin: '0 20px 10px' }}>
        <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 8px', letterSpacing: 1 }}>APPEARANCE</p>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${t.border}`, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{activeTheme === 'dark' ? '🌙' : '☀️'}</span>
              <div>
                <p style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: 0 }}>Theme</p>
                <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{activeTheme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
              </div>
            </div>
            <div
              onClick={() => setActiveTheme(th => th === 'dark' ? 'light' : 'dark')}
              style={{
                width: 48, height: 26, borderRadius: 13,
                background: activeTheme === 'dark' ? t.primary : t.border,
                position: 'relative', cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              <div style={{
                position: 'absolute', top: 3, left: activeTheme === 'dark' ? 25 : 3,
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                transition: 'left 0.3s ease',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Context signals */}
      <div style={{ margin: '10px 20px' }}>
        <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 8px', letterSpacing: 1 }}>CONTEXT SIGNALS</p>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          {[
            { label: 'Location', sub: 'Detect where you are', icon: '📍', val: locationOn, set: setLocationOn },
            { label: 'Notifications', sub: 'Moment suggestions', icon: '🔔', val: notifOn, set: setNotifOn },
            { label: 'Calendar', sub: 'Gap detection', icon: '📅', val: calendarOn, set: setCalendarOn },
            { label: 'Weather', sub: 'Ambient mood cues', icon: '🌤', val: weatherOn, set: setWeatherOn },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <div>
                  <p style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.label}</p>
                  <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{item.sub}</p>
                </div>
              </div>
              <div
                onClick={() => item.set(v => !v)}
                style={{
                  width: 48, height: 26, borderRadius: 13,
                  background: item.val ? t.primary : t.border,
                  position: 'relative', cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
              >
                <div style={{
                  position: 'absolute', top: 3, left: item.val ? 25 : 3,
                  width: 20, height: 20, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.3s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Music service */}
      <div style={{ margin: '10px 20px 20px' }}>
        <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 8px', letterSpacing: 1 }}>MUSIC SERVICE</p>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          {['Spotify', 'Apple Music', 'YouTube Music'].map((svc, i, arr) => (
            <div key={svc} style={{
              display: 'flex', alignItems: 'center', padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              justifyContent: 'space-between',
            }}>
              <p style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{svc}</p>
              {i === 0 ? (
                <span style={{ color: t.success, fontSize: 12, fontWeight: 700 }}>Connected ✓</span>
              ) : (
                <span style={{ color: t.textMuted, fontSize: 12 }}>Connect →</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ──────────────────────────────────────────────
  // Nav tabs config
  // ──────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'mix', label: 'Build Mix', icon: '🎛' },
    { id: 'player', label: 'Player', icon: '🎵' },
    { id: 'history', label: 'History', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'mix': return <MixScreen />;
      case 'player': return <PlayerScreen />;
      case 'history': return <HistoryScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  // ──────────────────────────────────────────────
  // Root render
  // ──────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: '20px 0',
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
      }}>

        {/* Status bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 28px 0',
          flexShrink: 0,
        }}>
          <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{currentTime}</p>
          {/* Dynamic Island */}
          <div style={{
            width: 120, height: 32, borderRadius: 20,
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6,
          }}>
            {isPlaying && (
              <>
                <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
                  {[1,0.5,0.8,0.3,0.9,0.6].map((h, i) => (
                    <div key={i} style={{
                      width: 3, height: `${h * 14}px`, borderRadius: 2,
                      background: t.primary,
                      animation: `eq ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                    }} />
                  ))}
                </div>
                <p style={{ color: '#fff', fontSize: 9, margin: 0, fontWeight: 600 }}>MoodMix</p>
              </>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <p style={{ color: t.text, fontSize: 12, margin: 0 }}>📶</p>
            <p style={{ color: t.text, fontSize: 12, margin: 0 }}>🔋</p>
          </div>
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '10px 20px 8px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: `linear-gradient(135deg, ${t.gradA}, ${t.gradB})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14,
            }}>🎵</div>
            <p style={{
              background: `linear-gradient(90deg, ${t.gradA}, ${t.gradB})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 16, fontWeight: 800, margin: 0,
            }}>MoodMix Map</p>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: t.surfaceAlt,
            border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, cursor: 'pointer',
          }}
            onClick={() => setActiveTheme(th => th === 'dark' ? 'light' : 'dark')}
          >{activeTheme === 'dark' ? '☀️' : '🌙'}</div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.25s ease' }}>
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.surface,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          paddingBottom: 20,
          paddingTop: 8,
          backdropFilter: 'blur(20px)',
          zIndex: 100,
        }}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => { press(`tab-${tab.id}`); setActiveTab(tab.id); setActiveScreen(tab.id); }}
              style={btnStyle(`tab-${tab.id}`, {
                flex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 3, cursor: 'pointer',
                padding: '4px 0',
              })}
            >
              <div style={{
                width: 36, height: 28, borderRadius: 10,
                background: activeTab === tab.id ? t.primaryDim : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17,
                transition: 'background 0.2s',
              }}>{tab.icon}</div>
              <p style={{
                color: activeTab === tab.id ? t.primary : t.textMuted,
                fontSize: 9, fontWeight: 700, margin: 0,
                letterSpacing: 0.3,
                transition: 'color 0.2s',
              }}>{tab.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes eq {
          from { transform: scaleY(0.3); }
          to { transform: scaleY(1); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
