
const { useState, useEffect, useRef } = React;

// ─── Google Font ────────────────────────────────────────────────────────────
const fontStyle = document.createElement('style');
fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;
document.head.appendChild(fontStyle);

// ─── Themes ─────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0B0B14',
    surface: '#13131F',
    surface2: '#1C1C2E',
    surface3: '#252540',
    primary: '#9B6DFF',
    primaryLight: '#B899FF',
    primaryDark: '#7C4FE0',
    accent: '#FF6B9D',
    accentWarm: '#FFB86C',
    text: '#EEE8FF',
    textSecondary: '#8A7FBB',
    textMuted: '#4A4470',
    border: '#2A2645',
    cardBg: '#181828',
    success: '#00E5A0',
    error: '#FF5B5B',
    navBg: '#0F0F1E',
    tag: '#2A2050',
    tagText: '#B899FF',
  },
  light: {
    bg: '#F2EEFF',
    surface: '#FFFFFF',
    surface2: '#F7F4FF',
    surface3: '#EDE7FF',
    primary: '#7C4FE0',
    primaryLight: '#9B6DFF',
    primaryDark: '#6038C8',
    accent: '#E8457A',
    accentWarm: '#E07B00',
    text: '#1A1035',
    textSecondary: '#5B4E8C',
    textMuted: '#9B8EC4',
    border: '#DDD5FF',
    cardBg: '#FFFFFF',
    success: '#00A870',
    error: '#DC2626',
    navBg: '#FFFFFF',
    tag: '#EDE7FF',
    tagText: '#7C4FE0',
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const moods = [
  { id: 'curious', emoji: '🤔', label: 'Curious', color: '#9B6DFF' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: '#00E5A0' },
  { id: 'playful', emoji: '😄', label: 'Playful', color: '#FFB86C' },
  { id: 'tense', emoji: '😤', label: 'Tense', color: '#FF6B9D' },
  { id: 'dreamy', emoji: '😴', label: 'Dreamy', color: '#6BBFFF' },
  { id: 'melancholy', emoji: '🥺', label: 'Melancholy', color: '#C0B4FF' },
];

const contextOptions = [
  { id: 'commute', icon: '🚇', label: 'Commute', time: '8 min' },
  { id: 'waiting', icon: '⏳', label: 'Waiting', time: '5 min' },
  { id: 'break', icon: '☕', label: 'Lunch Break', time: '15 min' },
  { id: 'wind-down', icon: '🌙', label: 'Wind Down', time: '12 min' },
];

const featuredStories = [
  {
    id: 1,
    title: 'The Last Signal',
    genre: 'Sci-Fi Thriller',
    duration: '6 min',
    chapter: 'Chapter 3: Static',
    progress: 0.58,
    description: 'A lone radio operator on a deep-space relay station intercepts a signal that should not exist.',
    mood: 'curious',
    color: '#9B6DFF',
    plays: 2841,
  },
  {
    id: 2,
    title: 'Noodles at Midnight',
    genre: 'Surreal Comedy',
    duration: '4 min',
    chapter: 'Episode 1',
    progress: 0,
    description: 'A convenience store ramen bowl gains sentience and must navigate the existential horrors of expiration dates.',
    mood: 'playful',
    color: '#FFB86C',
    plays: 5102,
  },
  {
    id: 3,
    title: 'Rain on Platform 9',
    genre: 'Noir Mystery',
    duration: '7 min',
    chapter: 'Episode 2: The Witness',
    progress: 0.22,
    description: 'A detective with a photographic memory wakes up unable to remember last Tuesday — the day of the murder.',
    mood: 'tense',
    color: '#FF6B9D',
    plays: 3390,
  },
  {
    id: 4,
    title: 'Borrowed Afternoon',
    genre: 'Gentle Drama',
    duration: '5 min',
    chapter: 'Episode 1',
    progress: 0,
    description: 'Two strangers share a park bench during a rainstorm and discover they are from the same small town, decades apart.',
    mood: 'melancholy',
    color: '#6BBFFF',
    plays: 1890,
  },
];

const sceneCards = [
  {
    id: 1,
    story: 'The Last Signal',
    quote: '"The message repeated every 11 seconds. By the 200th repetition, I realized it wasn\'t asking for help. It was warning."',
    genre: 'Sci-Fi Thriller',
    likes: 412,
    color: '#9B6DFF',
  },
  {
    id: 2,
    story: 'Noodles at Midnight',
    quote: '"I am broth. I am noodles. I am the MSG that binds them. And I have approximately 14 months to make meaning of this."',
    genre: 'Surreal Comedy',
    likes: 873,
    color: '#FFB86C',
  },
  {
    id: 3,
    story: 'Rain on Platform 9',
    quote: '"The one day I cannot remember is the one day everyone else cannot forget."',
    genre: 'Noir Mystery',
    likes: 290,
    color: '#FF6B9D',
  },
];

const achievements = [
  { id: 1, icon: '🎙️', label: 'First Story', desc: 'Completed your debut', unlocked: true },
  { id: 2, icon: '🔀', label: 'Twist Maker', desc: '10 branching choices', unlocked: true },
  { id: 3, icon: '🌙', label: 'Night Owl', desc: '5 late-night sessions', unlocked: true },
  { id: 4, icon: '⚡', label: 'Quick Listener', desc: 'Finished a 3-min story', unlocked: true },
  { id: 5, icon: '📖', label: 'Chapter Master', desc: 'Complete 20 chapters', unlocked: false },
  { id: 6, icon: '🌍', label: 'World Traveler', desc: '5 location contexts', unlocked: false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useTheme(isDark) {
  return isDark ? themes.dark : themes.light;
}

// ─── Status Bar ──────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const Wifi = window.lucide.Wifi;
  const Battery = window.lucide.Battery;
  const Signal = window.lucide.Signal;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: 44, zIndex: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: '-0.3px' }}>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center', color: t.text }}>
        <Signal size={12} />
        <Wifi size={12} />
        <Battery size={14} />
      </div>
    </div>
  );
}

// ─── Dynamic Island ──────────────────────────────────────────────────────────
function DynamicIsland({ playing, storyTitle }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: -8, position: 'relative', zIndex: 20 }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          background: '#000',
          borderRadius: expanded ? 20 : 50,
          width: expanded ? 240 : 110,
          height: expanded ? 56 : 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          overflow: 'hidden',
          gap: expanded ? 10 : 0,
          padding: expanded ? '0 14px' : 0,
        }}
      >
        {playing && expanded && (
          <>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              {[4, 7, 5, 9, 6].map((h, i) => (
                <div key={i} style={{
                  width: 3, height: h, background: '#9B6DFF', borderRadius: 2,
                  animation: `bounce-bar-${i} 0.6s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                }} />
              ))}
            </div>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 600, flex: 1 }}>{storyTitle}</span>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#9B6DFF' }} />
          </>
        )}
        {!expanded && playing && (
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            {[3, 6, 4, 8, 5].map((h, i) => (
              <div key={i} style={{ width: 2, height: h, background: '#9B6DFF', borderRadius: 2 }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ active, setActive, t }) {
  const Home = window.lucide.Home;
  const PlayCircle = window.lucide.PlayCircle;
  const BookOpen = window.lucide.BookOpen;
  const User = window.lucide.User;

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'player', icon: PlayCircle, label: 'Player' },
    { id: 'library', icon: BookOpen, label: 'Library' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: t.navBg,
      borderTop: `1px solid ${t.border}`,
      display: 'flex',
      paddingBottom: 20,
      paddingTop: 10,
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <div
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              width: 36, height: 36,
              borderRadius: 12,
              background: isActive ? `${t.primary}22` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}>
              <Icon size={20} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span style={{
              fontSize: 10, fontWeight: isActive ? 700 : 400,
              color: isActive ? t.primary : t.textMuted,
              letterSpacing: '0.3px',
            }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setActive, setCurrentStory }) {
  const [selectedMood, setSelectedMood] = useState('curious');
  const [selectedContext, setSelectedContext] = useState('commute');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(false);

  const MapPin = window.lucide.MapPin;
  const Sparkles = window.lucide.Sparkles;
  const Clock = window.lucide.Clock;
  const ChevronRight = window.lucide.ChevronRight;
  const Play = window.lucide.Play;
  const Zap = window.lucide.Zap;

  const handleGenerate = () => {
    if (generating) return;
    setPressedBtn(true);
    setTimeout(() => setPressedBtn(false), 150);
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  };

  const handlePlay = (story) => {
    setCurrentStory(story);
    setActive('player');
  };

  const ctx = contextOptions.find(c => c.id === selectedContext);
  const mood = moods.find(m => m.id === selectedMood);

  const genStory = {
    title: selectedMood === 'curious' ? 'The Last Signal' :
           selectedMood === 'playful' ? 'Noodles at Midnight' :
           selectedMood === 'tense' ? 'Rain on Platform 9' :
           selectedMood === 'calm' ? 'Borrowed Afternoon' :
           selectedMood === 'dreamy' ? 'Paper Skies' : 'The Quiet Hours',
    genre: selectedMood === 'curious' ? 'Sci-Fi Thriller' :
           selectedMood === 'playful' ? 'Surreal Comedy' :
           selectedMood === 'tense' ? 'Noir Mystery' :
           selectedMood === 'calm' ? 'Gentle Drama' :
           selectedMood === 'dreamy' ? 'Dreamscape' : 'Literary Fiction',
    duration: ctx.time,
    chapter: 'Episode 1',
    progress: 0,
    color: mood.color,
    description: 'Crafted for your moment. Just for you.',
    plays: 0,
    mood: selectedMood,
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 13, color: t.textSecondary, margin: 0, fontWeight: 500 }}>Good evening</p>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: t.text, margin: '2px 0 0', letterSpacing: '-0.5px' }}>
              What's the vibe?
            </h1>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: t.surface2,
            border: `1px solid ${t.border}`,
            borderRadius: 20, padding: '6px 12px',
          }}>
            <MapPin size={12} color={t.primary} />
            <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>On the train</span>
          </div>
        </div>
      </div>

      {/* Context Banner */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${t.primary}18, ${t.accent}10)`,
          border: `1px solid ${t.primary}35`,
          borderRadius: 16, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: 22 }}>🚇</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text }}>Evening commute detected</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: t.textSecondary }}>You have ~8 minutes · Quiet headphones mode</p>
          </div>
          <div style={{ background: t.primary, borderRadius: 8, padding: '4px 9px' }}>
            <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>Auto</span>
          </div>
        </div>
      </div>

      {/* Mood Selector */}
      <div style={{ padding: '18px 0 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: '0 0 10px 20px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Your Mood</p>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, overflowX: 'auto', paddingRight: 20, scrollbarWidth: 'none' }}>
          {moods.map(m => (
            <div
              key={m.id}
              onClick={() => { setSelectedMood(m.id); setGenerated(false); }}
              style={{
                flexShrink: 0,
                background: selectedMood === m.id ? `${m.color}25` : t.surface2,
                border: `1.5px solid ${selectedMood === m.id ? m.color : t.border}`,
                borderRadius: 20,
                padding: '8px 14px',
                display: 'flex', alignItems: 'center', gap: 7,
                cursor: 'pointer',
                transition: 'all 0.2s',
                transform: selectedMood === m.id ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: 16 }}>{m.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: selectedMood === m.id ? 700 : 500, color: selectedMood === m.id ? m.color : t.textSecondary, whiteSpace: 'nowrap' }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Context Selector */}
      <div style={{ padding: '16px 0 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: '0 0 10px 20px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Moment</p>
        <div style={{ display: 'flex', gap: 8, paddingLeft: 20, overflowX: 'auto', paddingRight: 20, scrollbarWidth: 'none' }}>
          {contextOptions.map(c => (
            <div
              key={c.id}
              onClick={() => { setSelectedContext(c.id); setGenerated(false); }}
              style={{
                flexShrink: 0,
                background: selectedContext === c.id ? `${t.primary}20` : t.surface2,
                border: `1.5px solid ${selectedContext === c.id ? t.primary : t.border}`,
                borderRadius: 14, padding: '10px 14px',
                cursor: 'pointer', transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 18 }}>{c.icon}</div>
              <p style={{ margin: '4px 0 0', fontSize: 11, fontWeight: 700, color: selectedContext === c.id ? t.primary : t.text, whiteSpace: 'nowrap' }}>{c.label}</p>
              <p style={{ margin: '1px 0 0', fontSize: 10, color: t.textMuted }}>{c.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div style={{ padding: '18px 20px 0' }}>
        <div
          onClick={handleGenerate}
          style={{
            background: generating
              ? t.surface2
              : `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
            borderRadius: 18, padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer',
            transform: pressedBtn ? 'scale(0.97)' : 'scale(1)',
            transition: 'all 0.15s',
            boxShadow: generating ? 'none' : `0 8px 30px ${t.primary}50`,
          }}
        >
          {generating ? (
            <>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `2px solid ${t.primary}40`,
                borderTop: `2px solid ${t.primary}`,
                animation: 'spin 0.8s linear infinite',
              }} />
              <span style={{ fontSize: 15, fontWeight: 700, color: t.textSecondary }}>Crafting your story...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} color="#fff" />
              <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Generate My Story</span>
            </>
          )}
        </div>
      </div>

      {/* Generated Result */}
      {generated && (
        <div style={{ padding: '14px 20px 0', animation: 'fadeSlideUp 0.4s ease' }}>
          <div style={{
            background: `linear-gradient(135deg, ${genStory.color}20, ${genStory.color}08)`,
            border: `1.5px solid ${genStory.color}50`,
            borderRadius: 20, padding: '16px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${genStory.color}15` }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                  <Sparkles size={12} color={genStory.color} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: genStory.color, letterSpacing: '0.6px', textTransform: 'uppercase' }}>Just for you</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: t.text, letterSpacing: '-0.3px' }}>{genStory.title}</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: t.textSecondary }}>{genStory.genre} · {genStory.duration}</p>
              </div>
              <div
                onClick={() => handlePlay(genStory)}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: genStory.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: `0 4px 16px ${genStory.color}60`,
                }}
              >
                <Play size={18} color="#fff" fill="#fff" />
              </div>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: 12, color: t.textSecondary, lineHeight: 1.5 }}>
              Crafted for your evening commute — a story that wraps up cleanly in {genStory.duration}.
            </p>
          </div>
        </div>
      )}

      {/* Featured Stories */}
      <div style={{ padding: '20px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 10px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: 0, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Popular Right Now</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
            <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>See all</span>
            <ChevronRight size={13} color={t.primary} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px' }}>
          {featuredStories.map(story => (
            <div
              key={story.id}
              onClick={() => handlePlay(story)}
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 16, padding: '14px',
                display: 'flex', gap: 12, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${story.color}60, ${story.color}20)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>
                {story.mood === 'curious' ? '🔭' : story.mood === 'playful' ? '🍜' : story.mood === 'tense' ? '🕵️' : '☔'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>{story.title}</h4>
                  <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{story.duration}</span>
                </div>
                <p style={{ margin: '2px 0 6px', fontSize: 11, color: story.color, fontWeight: 600 }}>{story.genre}</p>
                {story.progress > 0 && (
                  <div style={{ height: 3, background: t.surface3, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${story.progress * 100}%`, height: '100%', background: story.color, borderRadius: 2, transition: 'width 0.3s' }} />
                  </div>
                )}
                {story.progress === 0 && (
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Zap size={10} color={t.textMuted} />
                    <span style={{ fontSize: 11, color: t.textMuted }}>{story.plays.toLocaleString()} plays</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Player Screen ────────────────────────────────────────────────────────────
function PlayerScreen({ t, story, setActive }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(story ? story.progress : 0);
  const [choiceMade, setChoiceMade] = useState(null);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [interrupted, setInterrupted] = useState(false);
  const [liking, setLiking] = useState(false);
  const intervalRef = useRef(null);

  const Play = window.lucide.Play;
  const Pause = window.lucide.Pause;
  const SkipForward = window.lucide.SkipForward;
  const SkipBack = window.lucide.SkipBack;
  const Heart = window.lucide.Heart;
  const Share2 = window.lucide.Share2;
  const ChevronDown = window.lucide.ChevronDown;
  const Zap = window.lucide.Zap;
  const AlertCircle = window.lucide.AlertCircle;

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => Math.min(p + 0.004, 1));
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  useEffect(() => {
    if (progress >= 1) {
      setPlaying(false);
      setProgress(1);
    }
  }, [progress]);

  const choices = [
    ['Follow the stranger into the tunnel', 'Call out from the platform edge'],
    ['Open the encrypted file', 'Trace the signal back to the source'],
    ['Trust the informant', 'Go alone to the warehouse'],
  ];

  const currentChoices = choices[chapterIndex % choices.length];

  const handleChoice = (choice) => {
    setChoiceMade(choice);
    setTimeout(() => {
      setChoiceMade(null);
      setChapterIndex(c => c + 1);
      setProgress(0);
      setPlaying(false);
    }, 600);
  };

  const totalSecs = 360;
  const elapsed = Math.floor(progress * totalSecs);
  const remaining = totalSecs - elapsed;
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const activeStory = story || featuredStories[0];
  const storyColor = activeStory.color;

  const bars = Array.from({ length: 40 }, (_, i) => {
    const base = Math.sin(i * 0.4) * 0.4 + 0.6;
    return base * (0.4 + Math.random() * 0.6);
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: t.bg, overflow: 'hidden', paddingBottom: 90 }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px 0' }}>
        <div onClick={() => setActive('home')} style={{ cursor: 'pointer', color: t.textSecondary }}>
          <ChevronDown size={22} />
        </div>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Now Playing</span>
        </div>
        <div
          onClick={() => { setLiking(true); setTimeout(() => setLiking(false), 400); }}
          style={{ cursor: 'pointer', transition: 'transform 0.2s', transform: liking ? 'scale(1.3)' : 'scale(1)' }}
        >
          <Heart size={20} color={liking ? t.accent : t.textSecondary} fill={liking ? t.accent : 'none'} />
        </div>
      </div>

      {/* Album Art */}
      <div style={{ padding: '16px 30px 0' }}>
        <div style={{
          borderRadius: 24,
          background: `linear-gradient(145deg, ${storyColor}30, ${storyColor}08, ${t.surface3})`,
          border: `1px solid ${storyColor}30`,
          height: 200,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 12px 40px ${storyColor}30`,
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 160, height: 160, borderRadius: '50%',
            background: `${storyColor}12`,
          }} />
          <div style={{
            position: 'absolute', bottom: -30, left: -30,
            width: 120, height: 120, borderRadius: '50%',
            background: `${storyColor}10`,
          }} />
          <span style={{ fontSize: 52 }}>
            {activeStory.mood === 'curious' ? '🔭' : activeStory.mood === 'playful' ? '🍜' : activeStory.mood === 'tense' ? '🕵️' : activeStory.mood === 'dreamy' ? '🌙' : '☔'}
          </span>
          <div style={{
            marginTop: 12,
            background: `${storyColor}20`,
            borderRadius: 20, padding: '4px 12px',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: storyColor }}>{activeStory.genre}</span>
          </div>
        </div>
      </div>

      {/* Story Info */}
      <div style={{ padding: '14px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: '-0.4px' }}>{activeStory.title}</h2>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: t.textSecondary }}>{activeStory.chapter || 'Chapter 1'} · {activeStory.duration}</p>
        </div>
        <div style={{ cursor: 'pointer', marginTop: 4 }}>
          <Share2 size={18} color={t.textSecondary} />
        </div>
      </div>

      {/* Waveform */}
      <div style={{ padding: '14px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1.5, height: 36 }}>
          {bars.map((h, i) => {
            const isPlayed = i / bars.length < progress;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h * 100}%`,
                  borderRadius: 2,
                  background: isPlayed ? storyColor : `${storyColor}30`,
                  transition: 'background 0.1s',
                }}
              />
            );
          })}
        </div>

        {/* Scrubber */}
        <div style={{ marginTop: 6 }}>
          <div
            style={{ height: 3, background: t.surface3, borderRadius: 2, cursor: 'pointer', position: 'relative' }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress((e.clientX - rect.left) / rect.width);
            }}
          >
            <div style={{ width: `${progress * 100}%`, height: '100%', background: storyColor, borderRadius: 2, position: 'relative' }}>
              <div style={{
                position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)',
                width: 12, height: 12, borderRadius: '50%', background: storyColor,
                boxShadow: `0 0 0 3px ${storyColor}30`,
              }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>{fmt(elapsed)}</span>
            <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>-{fmt(remaining)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: '10px 24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
        <div onClick={() => setProgress(Math.max(0, progress - 0.05))} style={{ cursor: 'pointer', color: t.textSecondary }}>
          <SkipBack size={26} />
        </div>
        <div
          onClick={() => setPlaying(!playing)}
          style={{
            width: 62, height: 62, borderRadius: '50%',
            background: `linear-gradient(135deg, ${storyColor}, ${t.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 6px 24px ${storyColor}60`,
            transition: 'transform 0.15s',
          }}
        >
          {playing
            ? <Pause size={26} color="#fff" fill="#fff" />
            : <Play size={26} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />}
        </div>
        <div onClick={() => { setProgress(Math.min(1, progress + 0.05)); }} style={{ cursor: 'pointer', color: t.textSecondary }}>
          <SkipForward size={26} />
        </div>
      </div>

      {/* Branch Choice */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          background: t.surface,
          border: `1px solid ${storyColor}40`,
          borderRadius: 18, padding: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Zap size={13} color={storyColor} />
            <span style={{ fontSize: 11, fontWeight: 700, color: storyColor, letterSpacing: '0.5px', textTransform: 'uppercase' }}>The Moment of Choice</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentChoices.map((choice, i) => (
              <div
                key={i}
                onClick={() => handleChoice(choice)}
                style={{
                  background: choiceMade === choice ? `${storyColor}25` : t.surface2,
                  border: `1.5px solid ${choiceMade === choice ? storyColor : t.border}`,
                  borderRadius: 12, padding: '10px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: choiceMade === choice ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: choiceMade === choice ? storyColor : t.text }}>
                  {String.fromCharCode(65 + i)}. {choice}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interrupted Banner */}
      {interrupted && (
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{
            background: `${t.accentWarm}15`, border: `1px solid ${t.accentWarm}40`,
            borderRadius: 12, padding: '10px 14px',
            display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <AlertCircle size={14} color={t.accentWarm} />
            <span style={{ fontSize: 12, color: t.textSecondary, fontWeight: 500 }}>
              Paused after interruption. <span style={{ color: t.primary, fontWeight: 700 }}>Quick recap ready</span>
            </span>
          </div>
        </div>
      )}

      {/* Simulate interruption */}
      <div style={{ padding: '8px 20px 0', display: 'flex', justifyContent: 'center' }}>
        <span
          onClick={() => setInterrupted(!interrupted)}
          style={{ fontSize: 11, color: t.textMuted, cursor: 'pointer', textDecoration: 'underline dotted' }}
        >
          {interrupted ? 'Clear interruption' : 'Simulate interruption'}
        </span>
      </div>
    </div>
  );
}

// ─── Library Screen ───────────────────────────────────────────────────────────
function LibraryScreen({ t, setActive, setCurrentStory }) {
  const [tab, setTab] = useState('history');
  const [likedCards, setLikedCards] = useState({ 1: false, 2: true, 3: false });

  const BookMarked = window.lucide.BookMarked;
  const Clock = window.lucide.Clock;
  const Heart = window.lucide.Heart;
  const Play = window.lucide.Play;
  const Share2 = window.lucide.Share2;
  const Sparkles = window.lucide.Sparkles;

  const tabs = [
    { id: 'history', label: 'History' },
    { id: 'scenes', label: 'Scene Cards' },
    { id: 'saved', label: 'Saved' },
  ];

  const historyItems = [
    { ...featuredStories[0], playedAt: 'Today, 7:42 PM', completed: true },
    { ...featuredStories[2], playedAt: 'Today, 12:15 PM', completed: false },
    { ...featuredStories[1], playedAt: 'Yesterday, 9:08 AM', completed: true },
    { ...featuredStories[3], playedAt: 'March 20, 8:30 PM', completed: true },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: t.bg, paddingBottom: 90 }}>
      <div style={{ padding: '8px 20px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.5px' }}>Library</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '14px 20px 0', gap: 8 }}>
        {tabs.map(tb => (
          <div
            key={tb.id}
            onClick={() => setTab(tb.id)}
            style={{
              padding: '7px 16px',
              borderRadius: 20,
              background: tab === tb.id ? t.primary : t.surface2,
              border: `1.5px solid ${tab === tb.id ? t.primary : t.border}`,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: tab === tb.id ? '#fff' : t.textSecondary }}>{tb.label}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 0' }}>
        {tab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {historyItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => { setCurrentStory(item); setActive('player'); }}
                style={{
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: 16, padding: '14px',
                  display: 'flex', gap: 12, cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: `${item.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>
                  {item.mood === 'curious' ? '🔭' : item.mood === 'playful' ? '🍜' : item.mood === 'tense' ? '🕵️' : '☔'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>{item.title}</h4>
                    {item.completed
                      ? <span style={{ fontSize: 10, background: `${t.success}20`, color: t.success, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>Done</span>
                      : <span style={{ fontSize: 10, background: `${item.color}20`, color: item.color, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{Math.round(item.progress * 100)}%</span>
                    }
                  </div>
                  <p style={{ margin: '2px 0 6px', fontSize: 11, color: item.color, fontWeight: 600 }}>{item.genre}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} color={t.textMuted} />
                    <span style={{ fontSize: 11, color: t.textMuted }}>{item.playedAt}</span>
                  </div>
                  {!item.completed && (
                    <div style={{ marginTop: 8, height: 3, background: t.surface3, borderRadius: 2 }}>
                      <div style={{ width: `${item.progress * 100}%`, height: '100%', background: item.color, borderRadius: 2 }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'scenes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: t.textSecondary }}>Your saved scene cards from recent stories.</p>
            {sceneCards.map(card => (
              <div key={card.id} style={{
                background: `linear-gradient(145deg, ${card.color}20, ${card.color}06)`,
                border: `1.5px solid ${card.color}40`,
                borderRadius: 20, padding: '18px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: `${card.color}10` }} />
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: card.color, letterSpacing: '0.6px', textTransform: 'uppercase' }}>{card.genre} · {card.story}</span>
                </div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.6, fontStyle: 'italic' }}>{card.quote}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div
                      onClick={() => setLikedCards(l => ({ ...l, [card.id]: !l[card.id] }))}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}
                    >
                      <Heart size={14} color={likedCards[card.id] ? t.accent : t.textMuted} fill={likedCards[card.id] ? t.accent : 'none'} />
                      <span style={{ fontSize: 12, color: likedCards[card.id] ? t.accent : t.textMuted, fontWeight: 600 }}>
                        {likedCards[card.id] ? card.likes + 1 : card.likes}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                      <Share2 size={14} color={t.textMuted} />
                      <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>Share</span>
                    </div>
                  </div>
                  <div style={{ background: card.color, borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}>
                    <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>Save Image</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'saved' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {featuredStories.slice(0, 3).map((story, i) => (
              <div
                key={i}
                onClick={() => { setCurrentStory(story); setActive('player'); }}
                style={{
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: 16, padding: '14px',
                  display: 'flex', gap: 12, cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${story.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>
                  {story.mood === 'curious' ? '🔭' : story.mood === 'playful' ? '🍜' : story.mood === 'tense' ? '🕵️' : '☔'}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>{story.title}</h4>
                  <p style={{ margin: '2px 0 6px', fontSize: 11, color: story.color, fontWeight: 600 }}>{story.genre} · {story.duration}</p>
                  <p style={{ margin: 0, fontSize: 11, color: t.textSecondary, lineHeight: 1.4 }}>{story.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${story.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Play size={14} color={story.color} fill={story.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, toggleTheme }) {
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const ChevronRight = window.lucide.ChevronRight;
  const Bell = window.lucide.Bell;
  const MapPin = window.lucide.MapPin;
  const Headphones = window.lucide.Headphones;
  const Star = window.lucide.Star;
  const Trophy = window.lucide.Trophy;
  const Sparkles = window.lucide.Sparkles;
  const Settings = window.lucide.Settings;

  const stats = [
    { label: 'Stories', value: '24' },
    { label: 'Minutes', value: '186' },
    { label: 'Choices', value: '73' },
  ];

  const settings = [
    { icon: Bell, label: 'Notifications', value: 'Daily nudge' },
    { icon: MapPin, label: 'Location Context', value: 'Enabled' },
    { icon: Headphones, label: 'Audio Quality', value: 'High' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '8px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.5px' }}>Profile</h1>
        <div
          onClick={toggleTheme}
          style={{
            width: 38, height: 38, borderRadius: 12,
            background: t.surface2,
            border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          {isDark ? <Sun size={16} color={t.accentWarm} /> : <Moon size={16} color={t.primary} />}
        </div>
      </div>

      {/* User Card */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${t.primary}25, ${t.accent}12)`,
          border: `1px solid ${t.primary}30`,
          borderRadius: 20, padding: '18px',
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 58, height: 58, borderRadius: 18,
              background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>
              🎧
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: t.text }}>Alex Rivera</h2>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: t.textSecondary }}>Story Explorer · Level 4</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <Star size={11} color={t.accentWarm} fill={t.accentWarm} />
                <Star size={11} color={t.accentWarm} fill={t.accentWarm} />
                <Star size={11} color={t.accentWarm} fill={t.accentWarm} />
                <Star size={11} color={t.accentWarm} fill={t.accentWarm} />
                <Star size={11} color={t.textMuted} />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', marginTop: 16, gap: 8 }}>
            {stats.map(s => (
              <div key={s.label} style={{ flex: 1, background: t.surface, borderRadius: 12, padding: '10px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.primary }}>{s.value}</p>
                <p style={{ margin: '2px 0 0', fontSize: 10, color: t.textSecondary, fontWeight: 600 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Trophy size={14} color={t.accentWarm} />
            <span style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Achievements</span>
          </div>
          <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>4/6</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {achievements.map(a => (
            <div
              key={a.id}
              style={{
                background: a.unlocked ? t.surface : t.surface2,
                border: `1px solid ${a.unlocked ? t.primary + '40' : t.border}`,
                borderRadius: 14, padding: '12px 8px',
                textAlign: 'center',
                opacity: a.unlocked ? 1 : 0.4,
              }}
            >
              <div style={{ fontSize: 22 }}>{a.icon}</div>
              <p style={{ margin: '6px 0 2px', fontSize: 11, fontWeight: 700, color: t.text }}>{a.label}</p>
              <p style={{ margin: 0, fontSize: 9, color: t.textMuted, lineHeight: 1.3 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '18px 20px 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: '0 0 10px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Preferences</p>
        <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}` }}>
          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            style={{
              display: 'flex', alignItems: 'center', padding: '14px 16px',
              borderBottom: `1px solid ${t.border}`, cursor: 'pointer',
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `${t.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              {isDark ? <Moon size={15} color={t.primary} /> : <Sun size={15} color={t.primary} />}
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text }}>Appearance</span>
            <div style={{
              width: 46, height: 26, borderRadius: 13,
              background: isDark ? t.primary : t.surface3,
              border: `1.5px solid ${isDark ? t.primary : t.border}`,
              position: 'relative', cursor: 'pointer', transition: 'all 0.3s',
            }}>
              <div style={{
                position: 'absolute', top: 2,
                left: isDark ? 22 : 2,
                width: 18, height: 18, borderRadius: '50%',
                background: isDark ? '#fff' : t.textMuted,
                transition: 'left 0.3s',
              }} />
            </div>
          </div>
          {settings.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', padding: '14px 16px',
                  borderBottom: i < settings.length - 1 ? `1px solid ${t.border}` : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `${t.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Icon size={15} color={t.primary} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text }}>{s.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: t.textMuted }}>{s.value}</span>
                  <ChevronRight size={14} color={t.textMuted} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${t.accentWarm}18, ${t.accent}10)`,
          border: `1px solid ${t.accentWarm}35`,
          borderRadius: 16, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 28 }}>🔥</span>
          <div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: t.text }}>7-day streak!</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: t.textSecondary }}>Keep it up — come back tomorrow to reach 8.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CSS Animations ───────────────────────────────────────────────────────────
const animStyle = document.createElement('style');
animStyle.textContent = `
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(animStyle);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentStory, setCurrentStory] = useState(featuredStories[0]);
  const t = useTheme(isDark);

  const toggleTheme = () => setIsDark(d => !d);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen t={t} isDark={isDark} setActive={setActiveTab} setCurrentStory={setCurrentStory} />;
      case 'player':
        return <PlayerScreen t={t} story={currentStory} setActive={setActiveTab} />;
      case 'library':
        return <LibraryScreen t={t} setActive={setActiveTab} setCurrentStory={setCurrentStory} />;
      case 'profile':
        return <ProfileScreen t={t} isDark={isDark} toggleTheme={toggleTheme} />;
      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: '20px',
    }}>
      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812,
        borderRadius: 52,
        background: t.bg,
        border: '8px solid #1a1a1a',
        boxShadow: '0 0 0 2px #333, 0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 0.3s',
      }}>
        {/* Status Bar */}
        <StatusBar t={t} />

        {/* Dynamic Island */}
        <DynamicIsland playing={activeTab === 'player'} storyTitle={currentStory?.title || ''} />

        {/* Screen Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <BottomNav active={activeTab} setActive={setActiveTab} t={t} />
      </div>
    </div>
  );
}
