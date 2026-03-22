const { useState, useEffect, useRef } = React;

// ─── THEMES ──────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#08080F',
    surface: '#0E0E1C',
    card: '#141428',
    cardAlt: '#1C1C38',
    primary: '#A855F7',
    primaryLight: '#C084FC',
    primaryDark: '#7C3AED',
    primaryDim: 'rgba(168,85,247,0.13)',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%)',
    secondary: '#22D3EE',
    accent: '#F59E0B',
    text: '#F0EEFF',
    textSub: '#9087AC',
    textMuted: '#4A4268',
    border: '#22203C',
    success: '#34D399',
    pillText: '#C084FC',
    navBg: 'rgba(8,8,15,0.97)',
    overlay: 'rgba(8,8,15,0.6)',
  },
  light: {
    bg: '#F4F0FF',
    surface: '#FFFFFF',
    card: '#FDFBFF',
    cardAlt: '#EDE6FF',
    primary: '#7C3AED',
    primaryLight: '#9F67FF',
    primaryDark: '#5B21B6',
    primaryDim: 'rgba(124,58,237,0.1)',
    primaryGrad: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9F67FF 100%)',
    secondary: '#0891B2',
    accent: '#D97706',
    text: '#120E2A',
    textSub: '#4D3F6B',
    textMuted: '#A89DC4',
    border: '#E2D9F5',
    success: '#059669',
    pillText: '#6D28D9',
    navBg: 'rgba(255,255,255,0.97)',
    overlay: 'rgba(244,240,255,0.6)',
  },
};

// ─── FONT LOADER ─────────────────────────────────────────────────────────────
function FontLoader() {
  return React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
    * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    div { -webkit-tap-highlight-color: transparent; }
  `);
}

// ─── DYNAMIC ISLAND ──────────────────────────────────────────────────────────
function DynamicIsland() {
  return React.createElement('div', {
    style: {
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 34,
      background: '#000',
      borderRadius: 20,
      zIndex: 200,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
    },
  });
}

// ─── STATUS BAR ──────────────────────────────────────────────────────────────
function StatusBar({ theme }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    fmt();
    const t = setInterval(fmt, 1000);
    return () => clearInterval(t);
  }, []);

  const Wifi = window.lucide.Wifi;
  const Battery = window.lucide.Battery;
  const Signal = window.lucide.Signal;

  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 22px 6px',
      position: 'relative',
      zIndex: 10,
    },
  },
    React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: theme.text, letterSpacing: 0.3 } }, time),
    React.createElement('div', { style: { width: 130 } }),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
      React.createElement(Signal, { size: 12, color: theme.text }),
      React.createElement(Wifi, { size: 13, color: theme.text }),
      React.createElement(Battery, { size: 17, color: theme.text }),
    ),
  );
}

// ─── PILL TAG ────────────────────────────────────────────────────────────────
function PillTag({ label, theme, variant }) {
  const bg = variant === 'accent' ? 'rgba(245,158,11,0.15)' : theme.primaryDim;
  const color = variant === 'accent' ? '#F59E0B' : theme.pillText;
  return React.createElement('div', {
    style: {
      display: 'inline-flex',
      padding: '3px 9px',
      background: bg,
      borderRadius: 100,
      color,
      fontSize: 11,
      fontWeight: 600,
    },
  }, label);
}

// ─── MOOD CHIP ───────────────────────────────────────────────────────────────
function MoodChip({ label, emoji, selected, theme, onClick }) {
  const [pressed, setPressed] = useState(false);
  return React.createElement('div', {
    onClick,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 15px',
      borderRadius: 100,
      background: selected ? theme.primary : theme.card,
      border: `1.5px solid ${selected ? theme.primary : theme.border}`,
      color: selected ? '#fff' : theme.textSub,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      transform: pressed ? 'scale(0.93)' : 'scale(1)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      boxShadow: selected ? `0 0 18px rgba(168,85,247,0.35)` : 'none',
    },
  },
    React.createElement('span', { style: { fontSize: 15 } }, emoji),
    React.createElement('span', null, label),
  );
}

// ─── SONG CARD ───────────────────────────────────────────────────────────────
function SongCard({ song, theme }) {
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const Heart = window.lucide.Heart;
  const Play = window.lucide.Play;
  const Pause = window.lucide.Pause;

  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 14px',
      background: theme.card,
      borderRadius: 16,
      border: `1px solid ${theme.border}`,
      marginBottom: 8,
      transition: 'border-color 0.2s',
      borderColor: playing ? theme.primary : theme.border,
    },
  },
    React.createElement('div', {
      style: {
        width: 50,
        height: 50,
        borderRadius: 12,
        background: song.gradient,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        boxShadow: `0 4px 14px rgba(0,0,0,0.25)`,
      },
    }, song.emoji),
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', {
        style: { color: theme.text, fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 },
      }, song.title),
      React.createElement('div', { style: { color: theme.textSub, fontSize: 12, marginBottom: 5 } }, song.artist),
      React.createElement(PillTag, { label: song.why, theme }),
    ),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 } },
      React.createElement('div', {
        onClick: () => setLiked(!liked),
        style: { cursor: 'pointer', padding: 4, display: 'flex' },
      },
        React.createElement(Heart, { size: 17, color: liked ? '#F87171' : theme.textMuted, fill: liked ? '#F87171' : 'none', strokeWidth: 2 }),
      ),
      React.createElement('div', {
        onClick: () => setPlaying(!playing),
        style: {
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: playing ? theme.primary : theme.primaryGrad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: `0 3px 12px rgba(168,85,247,0.4)`,
          transition: 'transform 0.1s ease',
        },
      },
        playing
          ? React.createElement(Pause, { size: 14, color: '#fff', fill: '#fff' })
          : React.createElement(Play, { size: 14, color: '#fff', fill: '#fff' }),
      ),
    ),
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  const [selectedMood, setSelectedMood] = useState('foggy');
  const MapPin = window.lucide.MapPin;
  const Cloud = window.lucide.Cloud;
  const Clock = window.lucide.Clock;
  const Calendar = window.lucide.Calendar;
  const ChevronRight = window.lucide.ChevronRight;
  const Sparkles = window.lucide.Sparkles;
  const RefreshCw = window.lucide.RefreshCw;

  const moods = [
    { id: 'tense', label: 'Tense', emoji: '😤' },
    { id: 'foggy', label: 'Foggy', emoji: '🌫️' },
    { id: 'calm', label: 'Calm', emoji: '🌊' },
    { id: 'focus', label: 'Focus', emoji: '🎯' },
    { id: 'charged', label: 'Charged', emoji: '⚡' },
    { id: 'melancholy', label: 'Melancholy', emoji: '🌧️' },
    { id: 'celebratory', label: 'Celebratory', emoji: '🎉' },
  ];

  const songs = [
    { title: 'Weightless', artist: 'Marconi Union', emoji: '🌀', gradient: 'linear-gradient(135deg, #4338CA, #7C3AED)', why: 'Cuts anxiety' },
    { title: 'Gymnopédie No.1', artist: 'Erik Satie', emoji: '🎹', gradient: 'linear-gradient(135deg, #0369A1, #0EA5E9)', why: 'Clears fog' },
    { title: 'Motion', artist: 'Nils Frahm', emoji: '🌙', gradient: 'linear-gradient(135deg, #7C3AED, #EC4899)', why: 'Morning ease-in' },
  ];

  const ctxItems = [
    { icon: MapPin, label: 'Subway · Transit', color: '#FCD34D' },
    { icon: Cloud, label: 'Overcast · 58°F', color: '#93C5FD' },
    { icon: Clock, label: '8:42 AM · Morning', color: '#FCA5A5' },
    { icon: Calendar, label: '3 meetings today', color: '#6EE7B7' },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 16px 16px' } },
    // Greeting
    React.createElement('div', { style: { marginBottom: 18 } },
      React.createElement('div', { style: { color: theme.textSub, fontSize: 13, fontWeight: 500, marginBottom: 3 } }, 'Good morning, Alex'),
      React.createElement('div', { style: { color: theme.text, fontSize: 23, fontWeight: 800, lineHeight: 1.2 } }, 'What does your\nworld feel like?'),
    ),

    // Context card
    React.createElement('div', {
      style: {
        padding: '14px 16px',
        background: theme.primaryGrad,
        borderRadius: 20,
        marginBottom: 18,
        boxShadow: '0 8px 32px rgba(124,58,237,0.35)',
      },
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('div', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' } }, 'Live Context'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600, cursor: 'pointer' },
        },
          React.createElement(RefreshCw, { size: 11 }),
          React.createElement('span', null, 'Refresh'),
        ),
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
        ctxItems.map(({ icon: Icon, label, color }, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 7 },
          },
            React.createElement(Icon, { size: 13, color }),
            React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 600 } }, label),
          ),
        ),
      ),
    ),

    // Mood compass
    React.createElement('div', { style: { marginBottom: 18 } },
      React.createElement('div', { style: { color: theme.text, fontSize: 15, fontWeight: 700, marginBottom: 10 } }, '✦ Mood Compass'),
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 } },
        moods.map(m => React.createElement(MoodChip, {
          key: m.id,
          label: m.label,
          emoji: m.emoji,
          selected: selectedMood === m.id,
          theme,
          onClick: () => setSelectedMood(m.id),
        })),
      ),
    ),

    // Recommendations
    React.createElement('div', { style: { marginBottom: 16 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('div', { style: { color: theme.text, fontSize: 15, fontWeight: 700 } }, '⚡ Right Now'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, color: theme.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer' } },
          'See all',
          React.createElement(ChevronRight, { size: 14 }),
        ),
      ),
      songs.map((s, i) => React.createElement(SongCard, { key: i, song: s, theme })),
    ),

    // Transition playlist banner
    React.createElement('div', {
      style: {
        padding: '14px 16px',
        background: theme.card,
        borderRadius: 18,
        border: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        cursor: 'pointer',
      },
    },
      React.createElement('div', {
        style: {
          width: 46,
          height: 46,
          borderRadius: 13,
          background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
        },
      },
        React.createElement(Sparkles, { size: 20, color: '#fff' }),
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { color: theme.text, fontWeight: 700, fontSize: 14 } }, 'Commute → Work Mode'),
        React.createElement('div', { style: { color: theme.textSub, fontSize: 12, marginTop: 2 } }, '5-min bridge · 3 transition tracks'),
      ),
      React.createElement(ChevronRight, { size: 18, color: theme.textMuted }),
    ),
  );
}

// ─── DISCOVER SCREEN ─────────────────────────────────────────────────────────
function DiscoverScreen({ theme }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [feedback, setFeedback] = useState({});
  const Info = window.lucide.Info;
  const ThumbsUp = window.lucide.ThumbsUp;
  const ThumbsDown = window.lucide.ThumbsDown;

  const filters = ['all', 'ambient', 'focus', 'energetic', 'emotional'];

  const tracks = [
    {
      title: 'Golden Hour Drift',
      artist: 'Nils Frahm',
      bpm: 72,
      energy: 22,
      emoji: '🌅',
      gradient: 'linear-gradient(135deg, #B45309, #F59E0B)',
      tags: ['ambient', 'emotional'],
      why: 'Matches overcast morning energy — low stimulation, rich atmospheric texture for commute',
    },
    {
      title: 'Carbon',
      artist: 'Moderat',
      bpm: 118,
      energy: 65,
      emoji: '⚡',
      gradient: 'linear-gradient(135deg, #374151, #6366F1)',
      tags: ['focus', 'energetic'],
      why: 'Transit rhythm sync — BPM paced for subway movement, moderate intensity for sustained attention',
    },
    {
      title: 'Porcelain',
      artist: 'Moby',
      bpm: 96,
      energy: 38,
      emoji: '🫧',
      gradient: 'linear-gradient(135deg, #0369A1, #6366F1)',
      tags: ['ambient', 'focus'],
      why: 'Pre-meeting calm — helps regulate cortisol before your 10am high-pressure block',
    },
    {
      title: 'Breathe (Reprise)',
      artist: 'Imogen Heap',
      bpm: 84,
      energy: 32,
      emoji: '🌿',
      gradient: 'linear-gradient(135deg, #047857, #34D399)',
      tags: ['emotional'],
      why: 'Matches foggy mood — soft harmonic tension release, minimal lyrical distraction',
    },
  ];

  const filtered = activeFilter === 'all' ? tracks : tracks.filter(t => t.tags.includes(activeFilter));

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 16px 16px' } },
    React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 3 } }, 'Discover'),
    React.createElement('div', { style: { fontSize: 13, color: theme.textSub, marginBottom: 16 } }, 'Context-matched for right now'),

    // Why this card
    React.createElement('div', {
      style: {
        padding: '13px 15px',
        background: theme.card,
        borderRadius: 18,
        border: `1px solid ${theme.border}`,
        marginBottom: 14,
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 } },
        React.createElement(Info, { size: 14, color: theme.primary }),
        React.createElement('span', { style: { color: theme.text, fontSize: 13, fontWeight: 700 } }, 'Why these recommendations?'),
      ),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
        ['🌥 Overcast', '🚇 In transit', '⏰ 8:42 AM', '😤 Tense mood', '📅 Busy day'].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '4px 10px',
              background: theme.primaryDim,
              borderRadius: 100,
              color: theme.pillText,
              fontSize: 12,
              fontWeight: 600,
            },
          }, s),
        ),
      ),
    ),

    // Filters
    React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 } },
      filters.map(f =>
        React.createElement('div', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            padding: '7px 16px',
            borderRadius: 100,
            background: activeFilter === f ? theme.primary : theme.card,
            border: `1.5px solid ${activeFilter === f ? theme.primary : theme.border}`,
            color: activeFilter === f ? '#fff' : theme.textSub,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
            textTransform: 'capitalize',
            boxShadow: activeFilter === f ? '0 4px 14px rgba(168,85,247,0.3)' : 'none',
          },
        }, f),
      ),
    ),

    // Track cards
    filtered.map((track, i) =>
      React.createElement('div', {
        key: i,
        style: {
          padding: 14,
          background: theme.card,
          borderRadius: 18,
          border: `1px solid ${feedback[i] ? theme.primary : theme.border}`,
          marginBottom: 10,
          transition: 'border-color 0.2s',
        },
      },
        // Header row
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
          React.createElement('div', {
            style: {
              width: 54,
              height: 54,
              borderRadius: 14,
              background: track.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            },
          }, track.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { color: theme.text, fontWeight: 700, fontSize: 15, marginBottom: 2 } }, track.title),
            React.createElement('div', { style: { color: theme.textSub, fontSize: 12, marginBottom: 6 } }, track.artist),
            React.createElement('div', { style: { display: 'flex', gap: 5 } },
              track.tags.map(tag =>
                React.createElement('div', {
                  key: tag,
                  style: {
                    padding: '2px 8px',
                    background: theme.primaryDim,
                    borderRadius: 100,
                    color: theme.pillText,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  },
                }, tag),
              ),
            ),
          ),
        ),

        // Energy bar
        React.createElement('div', { style: { marginBottom: 10 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', color: theme.textSub, fontSize: 11, fontWeight: 600, marginBottom: 5 } },
            React.createElement('span', null, 'Energy level'),
            React.createElement('span', null, `${track.energy}%  ·  ${track.bpm} BPM`),
          ),
          React.createElement('div', { style: { height: 4, background: theme.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%',
                width: `${track.energy}%`,
                background: theme.primaryGrad,
                borderRadius: 4,
              },
            }),
          ),
        ),

        // Why text
        React.createElement('div', {
          style: {
            padding: '9px 11px',
            background: theme.primaryDim,
            borderRadius: 10,
            color: theme.textSub,
            fontSize: 12,
            lineHeight: 1.55,
            marginBottom: 11,
          },
        }, `💡 ${track.why}`),

        // Feedback row
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 8 } },
          React.createElement('div', {
            onClick: () => setFeedback({ ...feedback, [i]: 'down' }),
            style: {
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 13px',
              background: feedback[i] === 'down' ? 'rgba(248,113,113,0.15)' : theme.cardAlt,
              borderRadius: 100,
              color: feedback[i] === 'down' ? '#F87171' : theme.textSub,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            },
          },
            React.createElement(ThumbsDown, { size: 13 }),
            React.createElement('span', null, 'Not now'),
          ),
          React.createElement('div', {
            onClick: () => setFeedback({ ...feedback, [i]: 'up' }),
            style: {
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 13px',
              background: feedback[i] === 'up' ? 'rgba(52,211,153,0.2)' : theme.primaryDim,
              borderRadius: 100,
              color: feedback[i] === 'up' ? '#34D399' : theme.pillText,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            },
          },
            React.createElement(ThumbsUp, { size: 13 }),
            React.createElement('span', null, feedback[i] === 'up' ? 'Logged!' : 'This fits'),
          ),
        ),
      ),
    ),
  );
}

// ─── MIXES SCREEN ────────────────────────────────────────────────────────────
function MixesScreen({ theme }) {
  const [activeMix, setActiveMix] = useState(null);
  const [playing, setPlaying] = useState(null);
  const Play = window.lucide.Play;
  const Pause = window.lucide.Pause;
  const Clock = window.lucide.Clock;
  const Music = window.lucide.Music;
  const ChevronDown = window.lucide.ChevronDown;
  const ChevronUp = window.lucide.ChevronUp;

  const mixes = [
    {
      id: 'commute',
      name: 'Morning Commute',
      emoji: '🚇',
      gradient: 'linear-gradient(135deg, #1E1B4B, #4F46E5)',
      tracks: 12,
      duration: '47 min',
      tags: ['Transit', 'Moderate BPM', 'Immersive'],
      mood: 'Grounded · Alert',
      description: 'Optimized for loud environments with consistent BPM that syncs with movement — keeps you present without sensory overload.',
      preview: ['Carbon · Moderat', 'Dissolve · Absurd Minds', 'Vessel · Bicep'],
    },
    {
      id: 'deepwork',
      name: 'Deep Work',
      emoji: '🎯',
      gradient: 'linear-gradient(135deg, #0C1220, #0EA5E9)',
      tracks: 18,
      duration: '1h 12 min',
      tags: ['Flow State', 'No Lyrics', 'Low BPM'],
      mood: 'Focused · Still',
      description: 'Wordless tracks engineered to minimize distraction and sustain deep cognitive focus across long sessions.',
      preview: ['Says · Nils Frahm', 'Glassworks · Philip Glass', 'Gymnopédie No.1 · Satie'],
    },
    {
      id: 'workout',
      name: 'Pre-Workout',
      emoji: '⚡',
      gradient: 'linear-gradient(135deg, #7C0000, #F59E0B)',
      tracks: 10,
      duration: '38 min',
      tags: ['130+ BPM', 'High Energy', 'Peak Build'],
      mood: 'Charged · Powerful',
      description: 'Peak intensity tracks that build from warm-up energy to maximum effort — structured for progressive activation.',
      preview: ['Quartz · Skrillex', 'Holdin On · Flume', 'Centipede · Knife Party'],
    },
    {
      id: 'decompression',
      name: 'Decompression',
      emoji: '🌊',
      gradient: 'linear-gradient(135deg, #022C22, #34D399)',
      tracks: 8,
      duration: '32 min',
      tags: ['Calm', 'Ambient', 'Nervous System Reset'],
      mood: 'Releasing · Open',
      description: 'A gradual wind-down arc designed to dissolve accumulated tension — especially effective after high-stimulation periods.',
      preview: ['Weightless · Marconi Union', 'Xtal · Aphex Twin', 'Porcelain · Moby'],
    },
    {
      id: 'winddown',
      name: 'Sleep Transition',
      emoji: '🌙',
      gradient: 'linear-gradient(135deg, #0F0A2E, #4338CA)',
      tracks: 6,
      duration: '24 min',
      tags: ['Sleep', 'Delta Waves', '< 60 BPM'],
      mood: 'Soft · Drifting',
      description: 'Descending tempo and dropping frequency content guides the body from alert to rest — built on sleep science research.',
      preview: ['Delta Waves · Transparent Sound', 'Lullaby · Brian Eno', 'Night · Nils Frahm'],
    },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 16px 16px' } },
    React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 3 } }, 'Situational Mixes'),
    React.createElement('div', { style: { fontSize: 13, color: theme.textSub, marginBottom: 16 } }, 'Press play, not search'),

    mixes.map(mix =>
      React.createElement('div', {
        key: mix.id,
        style: {
          marginBottom: 10,
          borderRadius: 20,
          overflow: 'hidden',
          border: `1.5px solid ${activeMix === mix.id ? theme.primary : theme.border}`,
          transition: 'border-color 0.2s ease',
        },
      },
        // Mix header (always visible)
        React.createElement('div', {
          onClick: () => setActiveMix(activeMix === mix.id ? null : mix.id),
          style: {
            padding: '15px 16px',
            background: mix.gradient,
            display: 'flex',
            alignItems: 'center',
            gap: 13,
            cursor: 'pointer',
          },
        },
          React.createElement('div', { style: { fontSize: 30, flexShrink: 0 } }, mix.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 2 } }, mix.name),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 500 } }, mix.mood),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('div', {
              onClick: (e) => { e.stopPropagation(); setPlaying(playing === mix.id ? null : mix.id); },
              style: {
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              },
            },
              playing === mix.id
                ? React.createElement(Pause, { size: 16, color: '#fff', fill: '#fff' })
                : React.createElement(Play, { size: 16, color: '#fff', fill: '#fff' }),
            ),
            activeMix === mix.id
              ? React.createElement(ChevronUp, { size: 18, color: 'rgba(255,255,255,0.7)' })
              : React.createElement(ChevronDown, { size: 18, color: 'rgba(255,255,255,0.7)' }),
          ),
        ),

        // Expanded details
        activeMix === mix.id && React.createElement('div', {
          style: { padding: '14px 16px', background: theme.card },
        },
          React.createElement('div', { style: { color: theme.textSub, fontSize: 13, lineHeight: 1.6, marginBottom: 12 } }, mix.description),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, color: theme.textSub, fontSize: 12, fontWeight: 600 } },
              React.createElement(Music, { size: 13, color: theme.primary }),
              React.createElement('span', null, `${mix.tracks} tracks`),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, color: theme.textSub, fontSize: 12, fontWeight: 600 } },
              React.createElement(Clock, { size: 13, color: theme.primary }),
              React.createElement('span', null, mix.duration),
            ),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 } },
            mix.tags.map(tag =>
              React.createElement('div', {
                key: tag,
                style: {
                  padding: '4px 10px',
                  background: theme.primaryDim,
                  borderRadius: 100,
                  color: theme.pillText,
                  fontSize: 11,
                  fontWeight: 600,
                },
              }, tag),
            ),
          ),
          React.createElement('div', { style: { borderTop: `1px solid ${theme.border}`, paddingTop: 10 } },
            React.createElement('div', { style: { color: theme.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 7 } }, 'Preview'),
            mix.preview.map((p, i) =>
              React.createElement('div', {
                key: i,
                style: { color: theme.textSub, fontSize: 13, fontWeight: 500, marginBottom: 4, paddingLeft: 2 },
              }, `${i + 1}. ${p}`),
            ),
          ),
        ),
      ),
    ),
  );
}

// ─── ATLAS SCREEN ────────────────────────────────────────────────────────────
function AtlasScreen({ theme }) {
  const Headphones = window.lucide.Headphones;
  const TrendingUp = window.lucide.TrendingUp;
  const Zap = window.lucide.Zap;

  const timeline = [
    { time: '6:30 AM', context: 'Wake-up · Home', mix: 'Sleep Transition', emoji: '🌙', energy: 15, active: false, fit: 94 },
    { time: '7:15 AM', context: 'Morning Routine · Home', mix: 'Morning Ambient', emoji: '☀️', energy: 32, active: false, fit: 88 },
    { time: '8:42 AM', context: 'Subway · Transit', mix: 'Commute Mix', emoji: '🚇', energy: 55, active: true, fit: 91 },
    { time: '9:30 AM', context: 'Office · Work', mix: 'Deep Work Mode', emoji: '💼', energy: 68, active: false, fit: 96 },
    { time: '12:00 PM', context: 'Lunch Break · Café', mix: 'Midday Reset', emoji: '☕', energy: 42, active: false, fit: 85 },
  ];

  const insights = [
    { label: 'Context reads', value: '12', icon: '📡' },
    { label: 'Mood shifts', value: '4', icon: '🧭' },
    { label: 'Avg fit score', value: '91%', icon: '✨' },
  ];

  const bars = [18, 32, 55, 70, 42, 78, 65, 50, 35, 22, 14, 10];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 16px 16px' } },
    React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 3 } }, 'Your Sound Atlas'),
    React.createElement('div', { style: { fontSize: 13, color: theme.textSub, marginBottom: 16 } }, "Today's listening journey"),

    // Insights row
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 } },
      insights.map((ins, i) =>
        React.createElement('div', {
          key: i,
          style: {
            padding: '13px 10px',
            background: theme.card,
            borderRadius: 16,
            border: `1px solid ${theme.border}`,
            textAlign: 'center',
          },
        },
          React.createElement('div', { style: { fontSize: 20, marginBottom: 5 } }, ins.icon),
          React.createElement('div', { style: { color: theme.text, fontWeight: 800, fontSize: 20, marginBottom: 2 } }, ins.value),
          React.createElement('div', { style: { color: theme.textMuted, fontSize: 10, fontWeight: 600, lineHeight: 1.3 } }, ins.label),
        ),
      ),
    ),

    // Energy arc visualization
    React.createElement('div', {
      style: {
        padding: '14px 14px 10px',
        background: theme.card,
        borderRadius: 18,
        border: `1px solid ${theme.border}`,
        marginBottom: 16,
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 } },
        React.createElement(TrendingUp, { size: 15, color: theme.primary }),
        React.createElement('span', { style: { color: theme.text, fontSize: 14, fontWeight: 700 } }, 'Energy Arc'),
        React.createElement('div', {
          style: {
            marginLeft: 'auto',
            padding: '3px 9px',
            background: theme.primaryDim,
            borderRadius: 100,
            color: theme.pillText,
            fontSize: 11,
            fontWeight: 600,
          },
        }, 'Today'),
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 5, height: 64, marginBottom: 8 } },
        bars.map((h, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              height: `${h}%`,
              background: i === 2
                ? theme.primary
                : `linear-gradient(to top, ${theme.primaryDark}55, ${theme.primaryLight}44)`,
              borderRadius: '4px 4px 0 0',
              position: 'relative',
            },
          },
            i === 2 && React.createElement(Zap, {
              size: 10,
              color: '#fff',
              style: { position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' },
            }),
          ),
        ),
      ),
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', color: theme.textMuted, fontSize: 10, fontWeight: 600 },
      },
        ['6am', '8am', '10am', '12pm', '2pm', '4pm', 'Now'].map((t, i) =>
          React.createElement('span', { key: t }, t),
        ),
      ),
    ),

    // Timeline
    React.createElement('div', { style: { color: theme.text, fontSize: 15, fontWeight: 700, marginBottom: 12 } }, 'Timeline'),
    timeline.map((item, i) =>
      React.createElement('div', {
        key: i,
        style: { display: 'flex', gap: 12, marginBottom: i < timeline.length - 1 ? 0 : 0 },
      },
        // Connector
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 16 } },
          React.createElement('div', {
            style: {
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: item.active ? theme.primary : theme.border,
              border: item.active ? `2px solid ${theme.primaryLight}` : `2px solid ${theme.textMuted}`,
              marginTop: 10,
              boxShadow: item.active ? `0 0 10px ${theme.primary}` : 'none',
              flexShrink: 0,
            },
          }),
          i < timeline.length - 1 && React.createElement('div', {
            style: { width: 1.5, flex: 1, background: theme.border, marginTop: 4, marginBottom: 4, minHeight: 20 },
          }),
        ),

        // Card
        React.createElement('div', {
          style: {
            flex: 1,
            padding: '10px 12px',
            background: item.active ? theme.primaryDim : theme.card,
            borderRadius: 14,
            border: `1px solid ${item.active ? theme.primary : theme.border}`,
            marginBottom: 8,
            transition: 'all 0.2s',
          },
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('div', { style: { color: item.active ? theme.primaryLight : theme.textMuted, fontSize: 11, fontWeight: 600, marginBottom: 2 } }, item.time),
              React.createElement('div', { style: { color: theme.text, fontWeight: 700, fontSize: 13 } }, `${item.emoji} ${item.context}`),
              React.createElement('div', { style: { color: theme.textSub, fontSize: 12, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Headphones, { size: 11, color: theme.textMuted }),
                item.mix,
              ),
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
              item.active && React.createElement('div', {
                style: { padding: '3px 8px', background: theme.primary, borderRadius: 100, color: '#fff', fontSize: 10, fontWeight: 700 },
              }, 'NOW'),
              React.createElement('div', { style: { color: theme.textMuted, fontSize: 11, fontWeight: 600 } }, `${item.fit}% fit`),
            ),
          ),
        ),
      ),
    ),
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
function ProfileScreen({ theme, isDark, setIsDark }) {
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const Bell = window.lucide.Bell;
  const Shield = window.lucide.Shield;
  const ChevronRight = window.lucide.ChevronRight;
  const Headphones = window.lucide.Headphones;
  const Star = window.lucide.Star;
  const BarChart2 = window.lucide.BarChart2;
  const LogOut = window.lucide.LogOut;

  const stats = [
    { label: 'Hours', value: '142h' },
    { label: 'Contexts', value: '89' },
    { label: 'Fit score', value: '91%' },
    { label: 'Day streak', value: '23' },
  ];

  const topMoods = [
    { label: 'Focus', pct: 38 },
    { label: 'Calm', pct: 27 },
    { label: 'Charged', pct: 21 },
    { label: 'Foggy', pct: 14 },
  ];

  const settings = [
    { icon: Bell, label: 'Notifications', sub: 'Context-aware check-in alerts' },
    { icon: Shield, label: 'Privacy', sub: 'Location & calendar access' },
    { icon: Headphones, label: 'Connected Services', sub: 'Spotify · Apple Music' },
    { icon: Star, label: 'Go Premium', sub: 'Unlimited mixes & deeper atlas', accent: true },
    { icon: BarChart2, label: 'Listening Data', sub: 'Export your full atlas' },
    { icon: LogOut, label: 'Sign Out', sub: '' },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 16px 16px' } },
    // Avatar + name
    React.createElement('div', { style: { textAlign: 'center', marginBottom: 20 } },
      React.createElement('div', {
        style: {
          width: 76,
          height: 76,
          borderRadius: '50%',
          background: theme.primaryGrad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30,
          margin: '0 auto 10px',
          border: `3px solid ${theme.primaryLight}`,
          boxShadow: `0 6px 24px rgba(168,85,247,0.4)`,
        },
      }, '🎧'),
      React.createElement('div', { style: { color: theme.text, fontWeight: 800, fontSize: 19, marginBottom: 3 } }, 'Alex Rivera'),
      React.createElement('div', { style: { color: theme.textSub, fontSize: 12, fontWeight: 500 } }, 'Premium Listener · Since Jan 2024'),
    ),

    // Stats grid
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7, marginBottom: 16 } },
      stats.map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            padding: '11px 6px',
            background: theme.card,
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            textAlign: 'center',
          },
        },
          React.createElement('div', { style: { color: theme.text, fontWeight: 800, fontSize: 16 } }, s.value),
          React.createElement('div', { style: { color: theme.textMuted, fontSize: 9, fontWeight: 600, marginTop: 3, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: 0.3 } }, s.label),
        ),
      ),
    ),

    // Mood breakdown
    React.createElement('div', {
      style: { padding: 14, background: theme.card, borderRadius: 18, border: `1px solid ${theme.border}`, marginBottom: 10 },
    },
      React.createElement('div', { style: { color: theme.text, fontSize: 14, fontWeight: 700, marginBottom: 12 } }, '🧭 Top Moods This Month'),
      topMoods.map((m, i) =>
        React.createElement('div', { key: i, style: { marginBottom: i < topMoods.length - 1 ? 10 : 0 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', color: theme.textSub, fontSize: 12, fontWeight: 600, marginBottom: 4 } },
            React.createElement('span', null, m.label),
            React.createElement('span', null, `${m.pct}%`),
          ),
          React.createElement('div', { style: { height: 5, background: theme.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%',
                width: `${m.pct}%`,
                background: theme.primaryGrad,
                borderRadius: 4,
              },
            }),
          ),
        ),
      ),
    ),

    // Theme toggle
    React.createElement('div', {
      style: {
        padding: '14px 16px',
        background: theme.card,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', {
          style: {
            width: 38,
            height: 38,
            borderRadius: 11,
            background: isDark ? '#1E1B4B' : '#FEF9C3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
          isDark
            ? React.createElement(Moon, { size: 19, color: '#818CF8' })
            : React.createElement(Sun, { size: 19, color: '#D97706' }),
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { color: theme.text, fontWeight: 700, fontSize: 14 } }, isDark ? 'Dark Mode' : 'Light Mode'),
          React.createElement('div', { style: { color: theme.textSub, fontSize: 12 } }, 'Tap to switch theme'),
        ),
      ),
      React.createElement('div', {
        onClick: () => setIsDark(!isDark),
        style: {
          width: 50,
          height: 28,
          borderRadius: 14,
          background: isDark ? theme.primary : theme.border,
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.25s ease',
          boxShadow: isDark ? `0 3px 12px rgba(168,85,247,0.4)` : 'none',
        },
      },
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 4,
            left: isDark ? 'calc(100% - 24px)' : 4,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.25s ease',
            boxShadow: '0 1px 5px rgba(0,0,0,0.3)',
          },
        }),
      ),
    ),

    // Settings rows
    settings.map((s, i) =>
      React.createElement('div', {
        key: i,
        style: {
          padding: '12px 16px',
          background: theme.card,
          borderRadius: 14,
          border: `1px solid ${s.accent ? theme.primary : theme.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 8,
          cursor: 'pointer',
          background: s.accent ? theme.primaryDim : theme.card,
        },
      },
        React.createElement('div', {
          style: {
            width: 38,
            height: 38,
            borderRadius: 11,
            background: s.accent ? theme.primary : theme.primaryDim,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          },
        },
          React.createElement(s.icon, { size: 17, color: s.accent ? '#fff' : theme.primary }),
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { color: s.accent ? theme.primaryLight : theme.text, fontWeight: 700, fontSize: 14 } }, s.label),
          s.sub && React.createElement('div', { style: { color: theme.textSub, fontSize: 12, marginTop: 1 } }, s.sub),
        ),
        React.createElement(ChevronRight, { size: 16, color: s.accent ? theme.primary : theme.textMuted }),
      ),
    ),
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = themes[isDark ? 'dark' : 'light'];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'mixes', label: 'Mixes', icon: window.lucide.Music },
    { id: 'atlas', label: 'Atlas', icon: window.lucide.Globe },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    mixes: MixesScreen,
    atlas: AtlasScreen,
    profile: ProfileScreen,
  };

  const screenProps = {
    home: { theme, isDark },
    discover: { theme },
    mixes: { theme },
    atlas: { theme },
    profile: { theme, isDark, setIsDark },
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
    },
  },
    React.createElement(FontLoader),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: theme.surface,
        borderRadius: 50,
        overflow: 'hidden',
        boxShadow: '0 50px 130px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      },
    },
      React.createElement(DynamicIsland),
      React.createElement(StatusBar, { theme }),

      // Screen content area
      React.createElement('div', {
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: theme.bg,
        },
      },
        React.createElement(screens[activeTab], screenProps[activeTab]),
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          background: theme.navBg,
          borderTop: `1px solid ${theme.border}`,
          padding: '8px 0 18px',
          display: 'flex',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '6px 0',
              cursor: 'pointer',
              position: 'relative',
            },
          },
            activeTab === tab.id && React.createElement('div', {
              style: {
                position: 'absolute',
                top: -1,
                width: 32,
                height: 2.5,
                background: theme.primary,
                borderRadius: 4,
                boxShadow: `0 0 10px ${theme.primary}`,
              },
            }),
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? theme.primary : theme.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.75,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? theme.primary : theme.textMuted,
                letterSpacing: 0.2,
              },
            }, tab.label),
          ),
        ),
      ),
    ),
  );
}
