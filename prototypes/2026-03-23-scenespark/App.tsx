const { useState, useEffect, useRef } = React;

// ── THEMES ───────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F2EEFE',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F9F6FF',
    primary: '#7C3AED',
    primarySoft: '#EDE9FE',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    accentGrad: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    accent: '#F59E0B',
    text: '#0E0B1E',
    textSub: '#4A4070',
    textMuted: '#9187B5',
    border: '#E5D9FA',
    tabBg: '#FFFFFF',
    tabBorder: '#EFE6FC',
    chipBg: '#EDE9FE',
    chipText: '#6D28D9',
    success: '#059669',
    danger: '#EF4444',
    glow: '0 8px 32px rgba(124,58,237,0.22)',
    shadow: '0 2px 14px rgba(124,58,237,0.12)',
    statusText: '#0E0B1E',
    scrim: 'rgba(124,58,237,0.04)',
  },
  dark: {
    bg: '#09061A',
    surface: '#120D2A',
    card: '#1A1335',
    cardAlt: '#1E1840',
    primary: '#A78BFA',
    primarySoft: '#1E1647',
    primaryGrad: 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)',
    accentGrad: 'linear-gradient(135deg, #D97706 0%, #DC2626 100%)',
    accent: '#FBBF24',
    text: '#EDE6FF',
    textSub: '#A699CC',
    textMuted: '#4D3F78',
    border: '#201848',
    tabBg: '#0B081E',
    tabBorder: '#170F30',
    chipBg: '#1E1647',
    chipText: '#C4B5FD',
    success: '#34D399',
    danger: '#F87171',
    glow: '0 8px 32px rgba(0,0,0,0.65)',
    shadow: '0 2px 14px rgba(0,0,0,0.45)',
    statusText: '#EDE6FF',
    scrim: 'rgba(255,255,255,0.02)',
  },
};

// ── SCENE DATA ────────────────────────────────────────────────────────────────
const SCENES = [
  {
    id: 'rain-detective',
    title: 'The Last Rain',
    genre: 'Mystery',
    genreColor: '#7C3AED',
    genreColorDark: '#A78BFA',
    genreBg: 'linear-gradient(135deg, #3B0764 0%, #6D28D9 50%, #A21CAF 100%)',
    mood: 'tense',
    moodEmoji: '😤',
    duration: 5,
    emoji: '🕵️',
    tagline: 'A noir mystery for a rainy evening',
    steps: [
      {
        id: 0,
        text: 'The rain hammers the café glass as a damp envelope slides onto your table. You look up — no one nearby. Inside: a tarnished key and a note that reads "Locker 7. Before midnight." Your coffee has gone cold.',
        choices: [
          { label: '🔑 Head to the station', next: 1 },
          { label: '🚶 Ignore it and leave', next: 2 },
        ],
      },
      {
        id: 1,
        text: 'Locker 7 at Union Station. Inside: a burner phone buzzing with a single message — a photo of you, taken ten minutes ago, right here in that café. Someone\'s been watching.',
        choices: [
          { label: '📱 Call the number back', next: 3 },
          { label: '🏃 Get out fast', next: 4 },
        ],
      },
      {
        id: 2,
        text: 'You pocket the note and step into the rain. A black car idles by the curb. As you pass, the window rolls down — and the driver holds up a key. Identical to yours.',
        choices: [
          { label: '🚗 Get in the car', next: 3 },
          { label: '📞 Call for backup', next: 5 },
        ],
      },
      {
        id: 3,
        ending: true,
        text: 'A steady voice: "You passed the test. We\'ve been watching for someone who notices. The Agency needs eyes like yours." Through the rain-blurred glass, you see the city differently now — layered with envelopes and open lockers, waiting.',
        outcome: '🎭 To be continued...',
        vibe: 'You\'re in the game now.',
      },
      {
        id: 4,
        ending: true,
        text: 'You burst through the exit into the rain. Nothing follows. Just the city hum and your heartbeat. The phone buzzes once more: "Smart. Meet us Tuesday." The rain smells electric, alive, full of new possibility.',
        outcome: '✨ New arc unlocked',
        vibe: 'Trust your instincts.',
      },
      {
        id: 5,
        ending: true,
        text: 'The officer listens patiently, takes the key. "This happens sometimes," she says — then slides her card across the desk. Blank, except for three words: "Don\'t call us." She winks. The rain outside intensifies.',
        outcome: '🔍 Chapter complete',
        vibe: 'Nothing is what it seems.',
      },
    ],
  },
  {
    id: 'coffee-comedy',
    title: 'Café Confessionals',
    genre: 'Comedy',
    genreColor: '#D97706',
    genreColorDark: '#FBBF24',
    genreBg: 'linear-gradient(135deg, #78350F 0%, #D97706 50%, #F59E0B 100%)',
    mood: 'happy',
    moodEmoji: '😄',
    duration: 2,
    emoji: '☕',
    tagline: 'A quick laugh between tasks',
    steps: [
      {
        id: 0,
        text: 'You\'ve been trying to order a "medium coffee" for three minutes. The barista — Jaxon, apparently — insists you choose between "velvet bold," "sunrise whisper," or "existential dark roast." The line behind you grows.',
        choices: [
          { label: '☀️ "Sunrise whisper, please"', next: 1 },
          { label: '😤 "Darkest one. Now."', next: 2 },
        ],
      },
      {
        id: 1,
        text: '"Sunrise whisper! Beautiful choice." Jaxon leans in conspiratorially: "That\'s what we called medium roast... before the rebrand." He slides you a cup with HOPE written in Sharpie. Perfectly ordinary coffee.',
        choices: [
          { label: '😂 Ask what HOPE stands for', next: 3 },
          { label: '🏃 Take it and escape', next: 4 },
        ],
      },
      {
        id: 2,
        text: '"Existential dark roast. Absolute." Two minutes later: an espresso with a tiny card: "Warning: May cause introspection." You realize this is just espresso. With theatre.',
        choices: [
          { label: '🎭 Lean into the drama', next: 3 },
          { label: '🤦 Ask for oat milk', next: 4 },
        ],
      },
      {
        id: 3,
        ending: true,
        text: '"HOPE stands for Highly Optimized Pour Experience." Jaxon produces a laminated FAQ. Behind you, a queue of people who also asked. You\'ve accidentally joined a cult. A very caffeinated, strangely wholesome cult.',
        outcome: '☕ Barista Cult Member',
        vibe: 'Jaxon was right all along.',
      },
      {
        id: 4,
        ending: true,
        text: 'You escape with your coffee. It tastes completely fine. Normal. You notice every other customer is deep in conversation with Jaxon, nodding like converts. You check your cup. It says CHOSEN. You walk faster.',
        outcome: '🏃 Escaped (probably)',
        vibe: 'Some questions are safer unasked.',
      },
    ],
  },
  {
    id: 'radio-signal',
    title: 'The Signal',
    genre: 'Sci-Fi',
    genreColor: '#0891B2',
    genreColorDark: '#22D3EE',
    genreBg: 'linear-gradient(135deg, #164E63 0%, #0891B2 50%, #0E7490 100%)',
    mood: 'curious',
    moodEmoji: '🤔',
    duration: 5,
    emoji: '📡',
    tagline: 'For curious minds winding down',
    steps: [
      {
        id: 0,
        text: 'Your old radio — silent for years — crackles to life at 11:47 PM. Not static. A pattern. Repeating. You grab a notepad and realize: it\'s prime numbers, ascending, stopping at 997. Then silence. Then your name.',
        choices: [
          { label: '📡 Try to respond', next: 1 },
          { label: '📓 Record and research', next: 2 },
        ],
      },
      {
        id: 1,
        text: 'You key in primes in response. Silence for forty seconds. Then: coordinates. Two miles east, a field you\'ve driven past a hundred times without stopping.',
        choices: [
          { label: '🚗 Go there tonight', next: 3 },
          { label: '⏰ Wait until daylight', next: 4 },
        ],
      },
      {
        id: 2,
        text: 'The pattern repeats six times — always ending with your name in Morse-adjacent code. Cross-referenced: a signal recorded in 1977 over Norway. Declassified last year. Tagged: "Source unknown. Possibly recursive."',
        choices: [
          { label: '🔬 Dig into 1977 records', next: 3 },
          { label: '📡 Broadcast the signal back', next: 4 },
        ],
      },
      {
        id: 3,
        ending: true,
        text: 'The field is empty except for a perfect circle of flattened grass and one object: a radio, identical to yours, manufactured in 1963. Inside the battery compartment: a handwritten note — "You were always meant to find this. — You." The sky is very quiet.',
        outcome: '🛸 First Contact',
        vibe: 'The universe knows your name.',
      },
      {
        id: 4,
        ending: true,
        text: 'By morning, the signal is gone. But your radio has retuned itself to a frequency that doesn\'t appear on any dial. It plays something that sounds — you realize with a slow chill — like music you haven\'t written yet.',
        outcome: '🎵 Temporal Echo',
        vibe: 'Some signals travel backward.',
      },
    ],
  },
  {
    id: 'group-chat',
    title: 'The Group Chat',
    genre: 'Drama',
    genreColor: '#BE185D',
    genreColorDark: '#F9A8D4',
    genreBg: 'linear-gradient(135deg, #500724 0%, #BE185D 50%, #DB2777 100%)',
    mood: 'calm',
    moodEmoji: '😌',
    duration: 3,
    emoji: '💬',
    tagline: 'A relatable late-night unwind',
    steps: [
      {
        id: 0,
        text: 'It\'s 11 PM. Your group chat — dormant for three weeks — suddenly lights up. "We need to talk about the thing from Mia\'s birthday." You have no idea what the thing is. Neither, apparently, does anyone else. But no one will say so.',
        choices: [
          { label: '🙋 "What thing exactly?"', next: 1 },
          { label: '👀 Read and observe', next: 2 },
        ],
      },
      {
        id: 1,
        text: 'Three typing indicators appear. Then stop. Then: "You know what thing." Another adds a single period. The third reacts to the period with 😶. This resolves nothing. You are now the story\'s protagonist.',
        choices: [
          { label: '📞 Call Mia directly', next: 3 },
          { label: '🤷 Send a shrug emoji', next: 4 },
        ],
      },
      {
        id: 2,
        text: 'Theories emerge. A counter-theory. Someone references 2019. There is now a poll. The question: "Should we talk about it?" — 4 votes yes, 1 no, 1 vote: "What is it though"',
        choices: [
          { label: '✋ "I vote we drop it"', next: 3 },
          { label: '😭 Vote yes and commit', next: 4 },
        ],
      },
      {
        id: 3,
        ending: true,
        text: 'Mia picks up immediately. "Oh," she says. "Nobody told you? I adopted a dog at my birthday. His name is Thing. He chewed through someone\'s charger." Silence in the chat. Then laughter — the real kind, the 11 PM kind — coming through your headphones.',
        outcome: '🐶 Thing is a dog',
        vibe: 'The simplest answer is usually a dog.',
      },
      {
        id: 4,
        ending: true,
        text: 'Forty seconds of silence after the shrug. Then: "honestly fair." Then: "goodnight everyone." Then: "love u guys." The chat fades. You put your phone down feeling, inexplicably, like everything is fine. And it is.',
        outcome: '💙 Group chat solidarity',
        vibe: 'Sometimes a shrug is enough.',
      },
    ],
  },
];

const MOODS = [
  { id: 'calm', label: 'Calm', emoji: '😌', color: '#0891B2' },
  { id: 'happy', label: 'Happy', emoji: '😄', color: '#D97706' },
  { id: 'curious', label: 'Curious', emoji: '🤔', color: '#7C3AED' },
  { id: 'tense', label: 'Tense', emoji: '😤', color: '#DC2626' },
  { id: 'cozy', label: 'Cozy', emoji: '🥰', color: '#BE185D' },
];

const TIMES = [
  { id: 2, label: '2 min' },
  { id: 5, label: '5 min' },
  { id: 10, label: '10 min' },
];

const CATEGORIES = [
  { id: 'mystery', label: 'Mystery', emoji: '🕵️', color: '#7C3AED', darkColor: '#A78BFA', count: 24, bg: 'linear-gradient(135deg, #3B0764, #7C3AED)' },
  { id: 'comedy', label: 'Comedy', emoji: '😂', color: '#D97706', darkColor: '#FBBF24', count: 18, bg: 'linear-gradient(135deg, #78350F, #D97706)' },
  { id: 'sci-fi', label: 'Sci-Fi', emoji: '🛸', color: '#0891B2', darkColor: '#22D3EE', count: 31, bg: 'linear-gradient(135deg, #164E63, #0891B2)' },
  { id: 'drama', label: 'Drama', emoji: '💔', color: '#BE185D', darkColor: '#F9A8D4', count: 22, bg: 'linear-gradient(135deg, #500724, #BE185D)' },
  { id: 'horror', label: 'Horror', emoji: '👻', color: '#DC2626', darkColor: '#FCA5A5', count: 15, bg: 'linear-gradient(135deg, #450A0A, #DC2626)' },
  { id: 'fantasy', label: 'Fantasy', emoji: '🧙', color: '#059669', darkColor: '#6EE7B7', count: 27, bg: 'linear-gradient(135deg, #022C22, #059669)' },
];

const TRAIL_ITEMS = [
  { id: 1, title: 'The Last Rain', genre: 'Mystery', emoji: '🕵️', outcome: 'New arc unlocked', date: 'Today', genreColor: '#7C3AED' },
  { id: 2, title: 'Café Confessionals', genre: 'Comedy', emoji: '☕', outcome: 'Escaped (probably)', date: 'Yesterday', genreColor: '#D97706' },
  { id: 3, title: 'Station 12', genre: 'Sci-Fi', emoji: '🚀', outcome: 'First Contact', date: '2 days ago', genreColor: '#0891B2' },
  { id: 4, title: 'The Neighbor\'s Dog', genre: 'Drama', emoji: '🐕', outcome: 'Happy ending', date: '3 days ago', genreColor: '#BE185D' },
];

// ── HELPER COMPONENTS ─────────────────────────────────────────────────────────
function DynamicIsland() {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 116,
      height: 32,
      backgroundColor: '#000',
      borderRadius: 20,
      zIndex: 200,
    }} />
  );
}

function StatusBar({ t }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  const SignalIcon = window.lucide.Signal;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '54px 22px 4px',
      color: t.statusText,
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.2px' }}>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <SignalIcon size={13} strokeWidth={2.5} color={t.statusText} />
        <WifiIcon size={13} strokeWidth={2.5} color={t.statusText} />
        <BatteryIcon size={15} strokeWidth={2.5} color={t.statusText} />
      </div>
    </div>
  );
}

function GenreBadge({ genre, color, size = 'sm' }) {
  const fontSize = size === 'sm' ? 10 : 12;
  const padding = size === 'sm' ? '3px 8px' : '4px 10px';
  return (
    <span style={{
      fontSize,
      fontWeight: 700,
      color: '#fff',
      backgroundColor: color,
      borderRadius: 20,
      padding,
      letterSpacing: '0.3px',
      textTransform: 'uppercase',
    }}>
      {genre}
    </span>
  );
}

function SceneCard({ scene, t, isDark, onPlay, compact }) {
  const [pressed, setPressed] = useState(false);
  const color = isDark ? scene.genreColorDark : scene.genreColor;
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onPlay}
      style={{
        background: scene.genreBg,
        borderRadius: 16,
        padding: compact ? '14px' : '16px',
        minWidth: compact ? 160 : 200,
        cursor: 'pointer',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.15s ease',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>{scene.emoji}</div>
      <GenreBadge genre={scene.genre} color="rgba(255,255,255,0.25)" />
      <div style={{ color: '#fff', fontWeight: 700, fontSize: compact ? 13 : 15, marginTop: 6, lineHeight: 1.3 }}>{scene.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>⏱ {scene.duration} min</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>{scene.moodEmoji}</span>
      </div>
    </div>
  );
}

// ── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setActiveTab, startScene }) {
  const [selectedMood, setSelectedMood] = useState('curious');
  const [selectedTime, setSelectedTime] = useState(5);
  const [sparkPressed, setSparkPressed] = useState(false);

  const handleSpark = () => {
    const matched = SCENES.find(s => s.mood === selectedMood && s.duration <= selectedTime)
      || SCENES.find(s => s.duration <= selectedTime)
      || SCENES[0];
    startScene(matched);
  };

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const contextIcon = hour < 6 ? '🌙' : hour < 18 ? '☀️' : '🌧️';
  const contextText = hour < 18 ? 'Sunny · On the go · ' : 'Rainy · Home · ';
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ padding: '0 0 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '4px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500, marginBottom: 2 }}>{greeting}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
              What's your scene?
            </div>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 21,
            background: t.primaryGrad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, boxShadow: t.glow,
          }}>
            ✨
          </div>
        </div>
      </div>

      {/* Context Card */}
      <div style={{ margin: '0 20px 20px' }}>
        <div style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.15))'
            : 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(168,85,247,0.05))',
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ fontSize: 22 }}>{contextIcon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>{contextText}{timeStr}</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>Context-aware scenes are ready for you</div>
          </div>
        </div>
      </div>

      {/* Mood Selector */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 10, letterSpacing: '0.3px' }}>
          HOW ARE YOU FEELING?
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {MOODS.map(mood => {
            const active = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px',
                  borderRadius: 30,
                  border: active ? `2px solid ${mood.color}` : `2px solid ${t.border}`,
                  background: active
                    ? isDark ? `${mood.color}25` : `${mood.color}15`
                    : t.surface,
                  color: active ? mood.color : t.textMuted,
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: active ? `0 0 0 3px ${mood.color}25` : 'none',
                }}
              >
                <span style={{ fontSize: 16 }}>{mood.emoji}</span>
                {mood.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selector */}
      <div style={{ padding: '0 20px 22px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 10, letterSpacing: '0.3px' }}>
          HOW LONG DO YOU HAVE?
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {TIMES.map(time => {
            const active = selectedTime === time.id;
            return (
              <button
                key={time.id}
                onClick={() => setSelectedTime(time.id)}
                style={{
                  flex: 1, padding: '10px 0',
                  borderRadius: 12,
                  border: active ? 'none' : `1.5px solid ${t.border}`,
                  background: active ? t.primaryGrad : t.surface,
                  color: active ? '#fff' : t.textMuted,
                  fontSize: 14, fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: active ? t.glow : 'none',
                }}
              >
                {time.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 20px 24px' }}>
        <button
          onMouseDown={() => setSparkPressed(true)}
          onMouseUp={() => setSparkPressed(false)}
          onMouseLeave={() => setSparkPressed(false)}
          onClick={handleSpark}
          style={{
            width: '100%', padding: '16px',
            borderRadius: 16,
            border: 'none',
            background: t.primaryGrad,
            color: '#fff',
            fontSize: 16, fontWeight: 800,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: t.glow,
            transform: sparkPressed ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.15s ease',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            letterSpacing: '-0.2px',
          }}
        >
          <span style={{ fontSize: 20 }}>⚡</span>
          Spark a Scene
          <span style={{ opacity: 0.7 }}>→</span>
        </button>
      </div>

      {/* Trending Scenes */}
      <div style={{ padding: '0 0 8px' }}>
        <div style={{ padding: '0 20px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Trending Now</div>
          <span style={{ fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }}>See all →</span>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 20, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {SCENES.map(scene => (
            <SceneCard key={scene.id} scene={scene} t={t} isDark={isDark} onPlay={() => startScene(scene)} compact />
          ))}
          <div style={{ minWidth: 4, flexShrink: 0 }} />
        </div>
      </div>

      {/* Quick picks */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 }}>Perfect for Right Now</div>
        {[
          { label: 'Commute special', desc: '5-min subway thriller', emoji: '🚇', scene: SCENES[0] },
          { label: 'Wind-down story', desc: '3-min cozy drama', emoji: '🌙', scene: SCENES[3] },
        ].map((pick, i) => (
          <div
            key={i}
            onClick={() => startScene(pick.scene)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px',
              background: t.card,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              marginBottom: 10,
              cursor: 'pointer',
              boxShadow: t.shadow,
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: t.primarySoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>{pick.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{pick.label}</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>{pick.desc}</div>
            </div>
            <div style={{ color: t.textMuted, fontSize: 18 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PLAY SCREEN ───────────────────────────────────────────────────────────────
function PlayScreen({ t, isDark, currentScene, sceneStep, setSceneStep, sceneActive, setSceneActive, savedScenes, setSavedScenes, startScene }) {
  const [choicePressed, setChoicePressed] = useState(null);
  const [saved, setSaved] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const step = currentScene.steps.find(s => s.id === sceneStep) || currentScene.steps[0];
  const totalSteps = currentScene.steps.filter(s => !s.ending).length;
  const currentIndex = currentScene.steps.filter(s => !s.ending).findIndex(s => s.id === sceneStep);
  const progress = step.ending ? 1 : Math.max(0.1, (currentIndex + 1) / (totalSteps + 1));

  const handleChoice = (next) => {
    setAnimKey(k => k + 1);
    setSceneStep(next);
    setChoicePressed(null);
  };

  const handleSave = () => {
    if (!saved) {
      setSavedScenes(prev => [...prev, { ...currentScene, completedAt: new Date(), outcome: step.outcome }]);
      setSaved(true);
    }
  };

  // Pre-scene view
  if (!sceneActive) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {/* Hero */}
        <div style={{
          background: currentScene.genreBg,
          padding: '20px 20px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>{currentScene.emoji}</div>
          <GenreBadge genre={currentScene.genre} color="rgba(255,255,255,0.3)" size="md" />
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginTop: 8, letterSpacing: '-0.4px' }}>
            {currentScene.title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 4 }}>{currentScene.tagline}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>⏱ {currentScene.duration} min</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{currentScene.moodEmoji} {currentScene.mood}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>🌿 Interactive</span>
          </div>
        </div>

        <div style={{ padding: '20px', flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 8 }}>About this scene</div>
          <div style={{ fontSize: 14, color: t.textSub, lineHeight: 1.6, marginBottom: 20 }}>
            An interactive {currentScene.genre.toLowerCase()} story where your choices shape the outcome. Each path leads somewhere unique. No wrong answers.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Branches', val: '3 paths' },
              { label: 'Endings', val: '3 unique' },
              { label: 'Reading', val: `${currentScene.duration} min` },
              { label: 'Genre', val: currentScene.genre },
            ].map((stat, i) => (
              <div key={i} style={{ background: t.cardAlt, borderRadius: 10, padding: '10px 12px', border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginTop: 2 }}>{stat.val}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSceneActive(true)}
            style={{
              width: '100%', padding: '15px',
              borderRadius: 14, border: 'none',
              background: currentScene.genreBg,
              color: '#fff', fontSize: 16, fontWeight: 800,
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            Begin Scene →
          </button>
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <span
              style={{ fontSize: 12, color: t.textMuted, cursor: 'pointer', fontWeight: 500 }}
              onClick={() => startScene(SCENES[(SCENES.findIndex(s => s.id === currentScene.id) + 1) % SCENES.length])}
            >
              Try a different scene →
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Ending screen
  if (step.ending) {
    const color = isDark ? currentScene.genreColorDark : currentScene.genreColor;
    return (
      <div style={{ padding: '16px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎬</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: t.text, letterSpacing: '-0.3px' }}>Scene Complete</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>{currentScene.title}</div>
        </div>

        {/* Outcome badge */}
        <div style={{
          background: isDark ? `${currentScene.genreColor}25` : `${currentScene.genreColor}12`,
          border: `1px solid ${currentScene.genreColor}40`,
          borderRadius: 14, padding: '14px 16px', marginBottom: 16, textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color, marginBottom: 4 }}>{step.outcome}</div>
          <div style={{ fontSize: 12, color: t.textSub, fontStyle: 'italic' }}>&ldquo;{step.vibe}&rdquo;</div>
        </div>

        {/* Ending text */}
        <div style={{
          background: t.card, border: `1px solid ${t.border}`,
          borderRadius: 14, padding: '16px',
          fontSize: 15, color: t.text, lineHeight: 1.75,
          marginBottom: 20,
          boxShadow: t.shadow,
        }}>
          {step.text}
        </div>

        <button
          onClick={handleSave}
          style={{
            width: '100%', padding: '13px',
            borderRadius: 12, border: `2px solid ${saved ? t.success : currentScene.genreColor}`,
            background: saved ? (isDark ? '#06B25618' : '#D1FAE5') : 'transparent',
            color: saved ? t.success : color,
            fontSize: 14, fontWeight: 700,
            cursor: 'pointer', marginBottom: 10,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            transition: 'all 0.2s ease',
          }}
        >
          {saved ? '✓ Saved to Trail' : '🔖 Save to My Trail'}
        </button>

        <button
          onClick={() => {
            setSceneStep(0);
            setSceneActive(false);
            setSaved(false);
            const nextIdx = (SCENES.findIndex(s => s.id === currentScene.id) + 1) % SCENES.length;
            startScene(SCENES[nextIdx]);
          }}
          style={{
            width: '100%', padding: '13px',
            borderRadius: 12, border: 'none',
            background: t.primaryGrad,
            color: '#fff', fontSize: 14, fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: t.glow,
          }}
        >
          Next Scene →
        </button>
      </div>
    );
  }

  // Active scene
  return (
    <div style={{ padding: '12px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Progress header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <GenreBadge genre={currentScene.genre} color={isDark ? currentScene.genreColorDark : currentScene.genreColor} />
        <div style={{ flex: 1, height: 4, background: t.border, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: currentScene.genreBg,
            width: `${progress * 100}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, minWidth: 36 }}>
          {Math.round(progress * 100)}%
        </span>
      </div>

      {/* Scene title */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, marginBottom: 3 }}>{currentScene.emoji} {currentScene.title}</div>
      </div>

      {/* Story card */}
      <div
        key={animKey}
        style={{
          background: t.card,
          border: `1px solid ${t.border}`,
          borderRadius: 16,
          padding: '20px',
          marginBottom: 20,
          boxShadow: t.shadow,
          animation: 'fadeIn 0.35s ease',
        }}
      >
        <div style={{
          fontSize: 15,
          color: t.text,
          lineHeight: 1.8,
          fontWeight: 400,
        }}>
          {step.text}
        </div>
      </div>

      {/* Choices */}
      {step.choices && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 10, letterSpacing: '0.4px' }}>
            WHAT DO YOU DO?
          </div>
          {step.choices.map((choice, i) => (
            <button
              key={i}
              onMouseDown={() => setChoicePressed(i)}
              onMouseUp={() => setChoicePressed(null)}
              onMouseLeave={() => setChoicePressed(null)}
              onClick={() => handleChoice(choice.next)}
              style={{
                width: '100%', padding: '14px 16px',
                borderRadius: 13, border: `1.5px solid ${t.border}`,
                background: choicePressed === i
                  ? isDark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.07)'
                  : t.card,
                color: t.text,
                fontSize: 14, fontWeight: 600,
                cursor: 'pointer', marginBottom: 10,
                textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transform: choicePressed === i ? 'scale(0.98)' : 'scale(1)',
                transition: 'all 0.15s ease',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                boxShadow: t.shadow,
              }}
            >
              {choice.label}
              <span style={{ color: t.primary, fontSize: 16, opacity: 0.6 }}>›</span>
            </button>
          ))}
        </div>
      )}

      {/* Quit */}
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <span
          onClick={() => { setSceneActive(false); setSceneStep(0); }}
          style={{ fontSize: 12, color: t.textMuted, cursor: 'pointer', fontWeight: 500 }}
        >
          ← Back to preview
        </span>
      </div>
    </div>
  );
}

// ── DISCOVER SCREEN ───────────────────────────────────────────────────────────
function DiscoverScreen({ t, isDark, startScene }) {
  const [searchVal, setSearchVal] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const SearchIcon = window.lucide.Search;

  const filters = ['all', 'Mystery', 'Comedy', 'Sci-Fi', 'Drama', 'Horror', 'Fantasy'];

  return (
    <div style={{ padding: '8px 0 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>Discover</div>
        <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>Find your next 5-minute world</div>
      </div>

      {/* Search */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.card, border: `1.5px solid ${t.border}`,
          borderRadius: 14, padding: '10px 14px',
          boxShadow: t.shadow,
        }}>
          <SearchIcon size={16} color={t.textMuted} />
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search scenes, genres, moods..."
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: 14, color: t.text, outline: 'none',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {filters.map(f => {
          const active = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 14px', borderRadius: 20, flexShrink: 0,
                border: active ? 'none' : `1.5px solid ${t.border}`,
                background: active ? t.primaryGrad : t.surface,
                color: active ? '#fff' : t.textMuted,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              {f === 'all' ? 'All Genres' : f}
            </button>
          );
        })}
      </div>

      {/* Genre grid */}
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>Browse by Genre</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              style={{
                background: cat.bg,
                borderRadius: 14, padding: '16px',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{cat.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{cat.count} scenes</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>Today's Featured</div>
        {SCENES.map(scene => {
          const color = isDark ? scene.genreColorDark : scene.genreColor;
          return (
            <div
              key={scene.id}
              onClick={() => startScene(scene)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px', borderRadius: 14,
                background: t.card, border: `1px solid ${t.border}`,
                marginBottom: 10, cursor: 'pointer',
                boxShadow: t.shadow,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: scene.genreBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>
                {scene.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{scene.title}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 3, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color, backgroundColor: isDark ? `${scene.genreColor}20` : `${scene.genreColor}10`, padding: '2px 6px', borderRadius: 6 }}>
                    {scene.genre}
                  </span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>⏱ {scene.duration} min</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{scene.moodEmoji}</span>
                </div>
              </div>
              <div style={{ color: t.textMuted }}>›</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TRAIL SCREEN ──────────────────────────────────────────────────────────────
function TrailScreen({ t, isDark, savedScenes, startScene }) {
  const allTrail = [...TRAIL_ITEMS.slice(savedScenes.length > 0 ? 1 : 0)];
  const displayItems = [
    ...savedScenes.map((s, i) => ({
      id: `saved-${i}`,
      title: s.title,
      genre: s.genre,
      emoji: s.emoji,
      outcome: s.outcome || 'Completed',
      date: 'Just now',
      genreColor: isDark ? s.genreColorDark : s.genreColor,
    })),
    ...TRAIL_ITEMS,
  ].slice(0, 6);

  const BookmarkIcon = window.lucide.Bookmark;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const StarIcon = window.lucide.Star;

  return (
    <div style={{ padding: '8px 0 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>My Trail</div>
        <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>Your personal story universe</div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
        {[
          { label: 'Scenes', val: 12 + savedScenes.length, icon: '🎬' },
          { label: 'Streak', val: '5 days', icon: '🔥' },
          { label: 'Saved', val: 3 + savedScenes.length, icon: '🔖' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '12px 8px', textAlign: 'center',
            boxShadow: t.shadow,
          }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{stat.icon}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>{stat.val}</div>
            <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Characters */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>Characters You've Met</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { name: 'The Detective', emoji: '🕵️', color: '#7C3AED' },
            { name: 'Jaxon', emoji: '☕', color: '#D97706' },
            { name: 'The Voice', emoji: '📡', color: '#0891B2' },
            { name: 'Mia', emoji: '👩', color: '#BE185D' },
            { name: 'Thing 🐶', emoji: '🐕', color: '#059669' },
          ].map((char, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 30,
              background: isDark ? `${char.color}20` : `${char.color}12`,
              border: `1px solid ${char.color}40`,
            }}>
              <span style={{ fontSize: 14 }}>{char.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: isDark ? `${char.color}EE` : char.color }}>{char.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 14 }}>Recent Adventures</div>
        {displayItems.map((item, i) => (
          <div key={item.id || i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {/* Timeline line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${item.genreColor}20`,
                border: `1.5px solid ${item.genreColor}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>{item.emoji}</div>
              {i < displayItems.length - 1 && (
                <div style={{ width: 2, flex: 1, background: t.border, marginTop: 4, marginBottom: -8 }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.title}</div>
                <span style={{ fontSize: 11, color: t.textMuted }}>{item.date}</span>
              </div>
              <div style={{ fontSize: 12, color: item.genreColor, fontWeight: 600, marginTop: 1 }}>{item.genre}</div>
              <div style={{
                fontSize: 12, color: t.textSub, marginTop: 4,
                background: t.cardAlt, borderRadius: 8, padding: '4px 8px',
                display: 'inline-block', border: `1px solid ${t.border}`,
              }}>
                {item.outcome}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SETTINGS SCREEN ───────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);
  const [contextAware, setContextAware] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const BellIcon = window.lucide.Bell;
  const MapPinIcon = window.lucide.MapPin;
  const BookmarkIcon = window.lucide.Bookmark;
  const ChevronRightIcon = window.lucide.ChevronRight;

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: value ? t.primaryGrad : t.border,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, borderRadius: 9,
        width: 18, height: 18, background: '#fff',
        left: value ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }} />
    </div>
  );

  const SettingRow = ({ icon: Icon, label, sub, children }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '13px 16px',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: t.primarySoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={17} color={t.primary} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ padding: '8px 0 24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Profile */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px', marginBottom: 16 }}>Profile</div>
        <div style={{
          background: t.primaryGrad,
          borderRadius: 20, padding: '20px',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: t.glow,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, flexShrink: 0,
          }}>
            🎭
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Alex Rivera</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Scene explorer · 12 scenes completed</div>
          </div>
          <div style={{
            padding: '6px 12px', background: 'rgba(255,255,255,0.2)',
            borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#fff',
          }}>
            Edit
          </div>
        </div>
      </div>

      {/* Theme toggle */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 10, letterSpacing: '0.4px' }}>APPEARANCE</div>
        <div style={{
          background: t.card, border: `1px solid ${t.border}`,
          borderRadius: 16, overflow: 'hidden',
          boxShadow: t.shadow,
        }}>
          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.textSub, marginBottom: 10 }}>Theme</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { id: false, label: 'Light', icon: SunIcon },
                { id: true, label: 'Dark', icon: MoonIcon },
              ].map(opt => {
                const active = isDark === opt.id;
                const Ic = opt.icon;
                return (
                  <button
                    key={String(opt.id)}
                    onClick={() => setIsDark(opt.id)}
                    style={{
                      flex: 1, padding: '10px',
                      borderRadius: 12,
                      border: active ? 'none' : `1.5px solid ${t.border}`,
                      background: active ? t.primaryGrad : t.surface,
                      color: active ? '#fff' : t.textMuted,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      fontSize: 13, fontWeight: 700, cursor: 'pointer',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      boxShadow: active ? t.glow : 'none',
                    }}
                  >
                    <Ic size={14} />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 10, letterSpacing: '0.4px' }}>PREFERENCES</div>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: t.shadow }}>
          <SettingRow icon={BellIcon} label="Scene Notifications" sub="Get nudged during downtime">
            <Toggle value={notifications} onChange={setNotifications} />
          </SettingRow>
          <SettingRow icon={MapPinIcon} label="Context Awareness" sub="Use location & weather for scenes">
            <Toggle value={contextAware} onChange={setContextAware} />
          </SettingRow>
          <SettingRow icon={BookmarkIcon} label="Auto-save Endings" sub="Save completed scenes to Trail">
            <Toggle value={autoSave} onChange={setAutoSave} />
          </SettingRow>
        </div>
      </div>

      {/* Mood preferences */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 10, letterSpacing: '0.4px' }}>MOOD DEFAULTS</div>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadow }}>
          <div style={{ fontSize: 13, color: t.textSub, marginBottom: 10 }}>Favorite genres</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Mystery', 'Sci-Fi', 'Comedy'].map(g => (
              <span key={g} style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: t.chipBg, color: t.chipText,
                border: `1px solid ${t.primary}40`,
              }}>{g}</span>
            ))}
            <span style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: t.scrim, color: t.textMuted, border: `1px solid ${t.border}`, cursor: 'pointer' }}>
              + Add
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '16px', boxShadow: t.shadow, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>⚡</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>SceneSpark</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>Turn downtime into personal entertainment</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 8, opacity: 0.6 }}>v1.0.0 · Made with ✨</div>
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [currentScene, setCurrentScene] = useState(SCENES[0]);
  const [sceneStep, setSceneStep] = useState(0);
  const [sceneActive, setSceneActive] = useState(false);
  const [savedScenes, setSavedScenes] = useState([]);

  const t = isDark ? themes.dark : themes.light;

  const startScene = (scene) => {
    setCurrentScene(scene);
    setSceneStep(0);
    setSceneActive(false);
    setActiveTab('play');
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'play', label: 'Scene', icon: window.lucide.Zap },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'trail', label: 'Trail', icon: window.lucide.BookOpen },
    { id: 'settings', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    play: PlayScreen,
    discover: DiscoverScreen,
    trail: TrailScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  const sharedProps = {
    t, isDark, setIsDark,
    setActiveTab,
    currentScene, setCurrentScene,
    sceneStep, setSceneStep,
    sceneActive, setSceneActive,
    savedScenes, setSavedScenes,
    startScene,
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#e8e3f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      padding: '20px 0',
    }}>
      {/* Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder { color: ${t.textMuted}; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        backgroundColor: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(0,0,0,0.1)',
      }}>
        {/* Dynamic Island */}
        <DynamicIsland />

        {/* Status Bar */}
        <StatusBar t={t} />

        {/* Screen Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}>
          <ActiveScreen {...sharedProps} />
        </div>

        {/* Bottom Navigation */}
        <div style={{
          backgroundColor: t.tabBg,
          borderTop: `1px solid ${t.tabBorder}`,
          display: 'flex',
          alignItems: 'stretch',
          paddingBottom: 12,
          paddingTop: 8,
          flexShrink: 0,
          boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.4)' : '0 -4px 20px rgba(124,58,237,0.06)',
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  padding: '4px 0',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  padding: '5px 14px',
                  borderRadius: 20,
                  background: active ? (isDark ? 'rgba(167,139,250,0.15)' : 'rgba(124,58,237,0.1)') : 'transparent',
                  transition: 'background 0.2s',
                }}>
                  <Icon
                    size={22}
                    color={active ? t.primary : t.textMuted}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                <span style={{
                  fontSize: 10,
                  fontWeight: active ? 700 : 500,
                  color: active ? t.primary : t.textMuted,
                  letterSpacing: '0.1px',
                }}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
