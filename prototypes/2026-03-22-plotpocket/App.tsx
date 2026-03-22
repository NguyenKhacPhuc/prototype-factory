const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F4F1FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE8FF',
    surfaceHover: '#F0ECFF',
    text: '#1C1640',
    textSecondary: '#5C5480',
    textMuted: '#9891B8',
    primary: '#6C3FF5',
    primaryLight: '#A78BFA',
    primaryDark: '#4F2CC0',
    accent: '#F0367A',
    accentAlt: '#FF8C42',
    border: '#E4DFFF',
    borderStrong: '#C9C0F0',
    card: '#FFFFFF',
    navBg: 'rgba(255,255,255,0.95)',
    statusBar: 'rgba(244,241,255,0.97)',
    success: '#10C97B',
    warning: '#F5A623',
    info: '#2EBDE5',
    shadow: 'rgba(108,63,245,0.12)',
    shadowCard: 'rgba(28,22,64,0.07)',
    overlay: 'rgba(28,22,64,0.45)',
  },
  dark: {
    bg: '#0E0B1F',
    surface: '#1A1535',
    surfaceAlt: '#241E45',
    surfaceHover: '#2A2450',
    text: '#EDE8FF',
    textSecondary: '#A098CC',
    textMuted: '#5E567A',
    primary: '#9B72FF',
    primaryLight: '#C4B5FD',
    primaryDark: '#7C3AED',
    accent: '#FF4D8D',
    accentAlt: '#FF9A5C',
    border: '#2B2450',
    borderStrong: '#3D3568',
    card: '#1A1535',
    navBg: 'rgba(14,11,31,0.97)',
    statusBar: 'rgba(14,11,31,0.97)',
    success: '#34D399',
    warning: '#FCD34D',
    info: '#38BDF8',
    shadow: 'rgba(155,114,255,0.18)',
    shadowCard: 'rgba(0,0,0,0.3)',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

const storyData = {
  mystery: {
    id: 'mystery',
    title: 'The Missing Briefcase',
    genre: 'Mystery',
    emoji: '🕵️',
    color: '#6C3FF5',
    time: '8 min',
    plays: '14.2k',
    rating: 4.9,
    scenes: [
      {
        id: 0,
        text: "You're waiting for your coffee at Café Volta when you notice a sleek black briefcase under the adjacent table — completely abandoned. The person sitting there left in a rush two minutes ago. The barista hasn't noticed. The briefcase has a small red LED blinking near the latch.",
        choices: [
          { text: 'Open it discreetly under the table', next: 1 },
          { text: 'Alert the barista quietly', next: 2 },
        ],
      },
      {
        id: 1,
        text: "Inside: a USB drive taped to an encrypted phone, a laminated map with three red circles, and a business card reading 'Dr. Nora Vale — Applied Cryptography, MIT.' One of the circled locations on the map is this exact café. The phone buzzes. One new message: 'Did you find it?'",
        choices: [
          { text: "Reply 'Yes. Who are you?'", next: 3 },
          { text: 'Pocket the drive and slip out', next: 4 },
        ],
      },
      {
        id: 2,
        text: "The barista picks it up with a shrug — 'Happens Tuesdays.' But as she turns, the briefcase emits a sharp beep. She freezes. So do you. The man in the corner booth lowers his newspaper. He's been watching since you walked in.",
        choices: [
          { text: "Say 'I'll take that, actually'", next: 3 },
          { text: 'Follow the man when he leaves', next: 4 },
        ],
      },
      {
        id: 3,
        text: "A woman in a navy lab coat bursts through the door, breathless. 'Don't open it — wait, you already did.' She scans your face. 'You're not them.' She exhales. 'Good. That drive contains a proof of concept for a zero-day exploit targeting three major financial exchanges. I've been running for six hours.'",
        choices: [
          { text: '"How can I help?"', next: 5 },
          { text: '"Call the FBI. Now."', next: 5 },
        ],
      },
      {
        id: 4,
        text: "Two blocks out, someone matches your pace — close, deliberate. You cut into a pharmacy. They stop outside. On your phone, a news alert: 'MIT researcher reported missing.' The photo is the woman from the business card. Your coffee is still back at the café.",
        choices: [
          { text: 'Call the number on the card', next: 5 },
          { text: 'Find a police station immediately', next: 5 },
        ],
      },
      {
        id: 5,
        text: "The drive contained evidence of an algorithmic manipulation scheme targeting pension funds across seven countries. Dr. Vale had been building the case for two years. You spent the next four hours in an FBI field office on West 34th, eating vending machine crackers. Your coffee never happened. Worth it.",
        choices: [],
        ending: true,
      },
    ],
  },
  comedy: {
    id: 'comedy',
    title: 'Wrong Floor, Right Day',
    genre: 'Comedy',
    emoji: '🤠',
    color: '#F5A623',
    time: '6 min',
    plays: '22.8k',
    rating: 4.8,
    scenes: [
      {
        id: 0,
        text: "You step into what you assume is your office elevator. The doors close. The music is a steel guitar rendition of Bohemian Rhapsody. Everyone is wearing cowboy hats. You press 14. There is no 14. Everyone turns to look at you.",
        choices: [
          { text: 'Tip an imaginary hat', next: 1 },
          { text: 'Pretend this is completely normal', next: 2 },
        ],
      },
      {
        id: 1,
        text: "Thunderous approval. A large man with a magnificent mustache says 'I like this one, Earl.' The doors open on a floor labeled 'YEEHAW' in large sans-serif font beside a framed mission statement about 'radical synergistic ranch culture.'",
        choices: [
          { text: 'Step out with full confidence', next: 3 },
          { text: 'Ask what YEEHAW stands for', next: 4 },
        ],
      },
      {
        id: 2,
        text: "It absolutely works. No one questions you. You ride down two floors to what appears to be a full western-themed corporate retreat. There is a mechanical bull next to a whiteboard that says 'Q4 OKRs: Wrangling Growth.' Someone hands you a name badge that says 'Deputy.'",
        choices: [
          { text: 'Get on the mechanical bull', next: 3 },
          { text: 'Contribute to the OKR session', next: 4 },
        ],
      },
      {
        id: 3,
        text: "Eleven seconds on the bull. The room erupts. Earl — who turns out to be the Chief Experience Officer — tells you that no one from corporate has ever lasted past four. 'You've got grit,' he says, pressing a business card into your hand. 'We're hiring.'",
        choices: [
          { text: 'Accept. Text your old boss goodbye.', next: 5 },
          { text: 'Counter-offer for remote', next: 5 },
        ],
      },
      {
        id: 4,
        text: "YEEHAW, Earl explains cheerfully, stands for 'Your Employees Enable Holistic Authentic Workflows.' You nod. By lunch you've rewritten two sections of their customer retention deck and eaten four BBQ sliders. Your actual boss has sent five increasingly confused messages.",
        choices: [
          { text: 'Stay for the afternoon breakout', next: 5 },
          { text: 'Draft a very interesting expense report', next: 5 },
        ],
      },
      {
        id: 5,
        text: "You never found your original floor. Your old boss sent one final text: 'You okay?' You replied: 'Never better. Also I may have a new job. Please water my desk plant.' You start Monday. The elevator still has no floor 14, but floor YEEHAW is always there when you need it.",
        choices: [],
        ending: true,
      },
    ],
  },
  thriller: {
    id: 'thriller',
    title: 'The Last Train Signal',
    genre: 'Thriller',
    emoji: '🚇',
    color: '#E53E3E',
    time: '7 min',
    plays: '9.6k',
    rating: 4.7,
    scenes: [
      {
        id: 0,
        text: "11:51 PM. The subway car is nearly empty. The man three seats away has not blinked once in four minutes. You've been counting. His phone faces toward you — you can just make out a live map. Your stop is circled in red.",
        choices: [
          { text: 'Move to the next car', next: 1 },
          { text: 'Make direct eye contact', next: 2 },
        ],
      },
      {
        id: 1,
        text: "You move. So does he — same gap, same posture. The train slows unexpectedly between stations. Lights flicker once. When they stabilize, he's one seat closer. The intercom crackles: 'Due to signal interference, we will be holding momentarily.'",
        choices: [
          { text: 'Pull the emergency brake handle', next: 3 },
          { text: 'Call someone. Loudly.', next: 4 },
        ],
      },
      {
        id: 2,
        text: "He holds your gaze for two full seconds. Then blinks. Reaches into his jacket. Pulls out a laminated card and slides it across the aisle floor toward your foot. Transit Police. Plainclothes Unit. The back says: 'You appear to be in distress. Are you safe? Nod once for yes.'",
        choices: [
          { text: 'Nod. Exhale deeply.', next: 5 },
          { text: 'Ask him what he saw', next: 5 },
        ],
      },
      {
        id: 3,
        text: "An MTA worker appears from the front car. The man stands calmly, badges her. Plainclothes transit patrol. 'Everything okay back here?' He looks at you with professional neutrality. 'Sir, you pulled that handle. We'll need a statement.'",
        choices: [
          { text: 'Explain what you saw', next: 5 },
          { text: 'Apologize and say it was an accident', next: 5 },
        ],
      },
      {
        id: 4,
        text: "You call your sister, inventing a loud story about a terrible first date. The man glances over — and laughs quietly. Just once. He goes back to his phone. You catch a glimpse of the screen. It's Google Maps. He's trying to find the J train connection. He's been lost the whole time.",
        choices: [
          { text: 'Help him find his transfer', next: 5 },
          { text: 'Ride in mortified silence', next: 5 },
        ],
      },
      {
        id: 5,
        text: "Your stop arrives. The man — whether officer or tourist — nods once as you exit. The platform is warm. You take a deep breath of underground air, which isn't usually something people enjoy, but tonight it feels earned. The train leaves. The city keeps going. So do you.",
        choices: [],
        ending: true,
      },
    ],
  },
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState('');

  // Home screen state
  const [selectedMood, setSelectedMood] = useState('mysterious');
  const [selectedTime, setSelectedTime] = useState('10 min');
  const [selectedContext, setSelectedContext] = useState(null);

  // Play screen state
  const [activeStoryId, setActiveStoryId] = useState('mystery');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [choicePath, setChoicePath] = useState([]);
  const [pressedChoice, setPressedChoice] = useState(null);
  const [pressedCard, setPressedCard] = useState(null);

  // Library state
  const [libraryFilter, setLibraryFilter] = useState('all');

  // Profile state
  const [notifOn, setNotifOn] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [soundOn, setSoundOn] = useState(false);

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  const launchStory = (storyId) => {
    setActiveStoryId(storyId);
    setSceneIndex(0);
    setChoicePath([]);
    setActiveTab('play');
  };

  const handleChoice = (choiceIndex) => {
    const story = storyData[activeStoryId];
    const scene = story.scenes[sceneIndex];
    const choice = scene.choices[choiceIndex];
    setPressedChoice(choiceIndex);
    setTimeout(() => {
      setPressedChoice(null);
      setChoicePath([...choicePath, choiceIndex]);
      setSceneIndex(choice.next);
    }, 180);
  };

  const restartStory = () => {
    setSceneIndex(0);
    setChoicePath([]);
  };

  // ─── Font injection ───────────────────────────────────────────────────────
  const fontEl = React.createElement('style', { key: 'font' }, `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    * { scrollbar-width: none; -ms-overflow-style: none; }
    button, input { font-family: 'Plus Jakarta Sans', sans-serif; }
    input::placeholder { color: ${t.textMuted}; }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .scene-fade { animation: fadeSlideUp 0.3s ease forwards; }
    .blink { animation: pulse 2s ease-in-out infinite; }
  `);

  // ─── Sub-components ───────────────────────────────────────────────────────

  const Toggle = ({ value, onChange }) =>
    React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 46, height: 26, borderRadius: 13,
        background: value ? t.primary : t.border,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.25s', flexShrink: 0,
        boxShadow: value ? `0 0 0 3px ${t.primary}30` : 'none',
      },
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 3,
          left: value ? 23 : 3,
          width: 20, height: 20, borderRadius: '50%',
          background: '#fff', transition: 'left 0.22s cubic-bezier(.4,0,.2,1)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.25)',
        },
      })
    );

  const StarRow = ({ rating }) =>
    React.createElement('div', { style: { display: 'flex', gap: 2 } },
      [1,2,3,4,5].map(n =>
        React.createElement('span', {
          key: n,
          style: { color: n <= Math.round(rating) ? '#F5A623' : t.border, fontSize: 11 },
        }, '★')
      )
    );

  const GenreTag = ({ genre, color }) =>
    React.createElement('span', {
      style: {
        background: `${color}22`, color,
        borderRadius: 20, padding: '3px 10px',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.3px',
      },
    }, genre);

  const PillButton = ({ label, active, color, onClick }) =>
    React.createElement('button', {
      onClick,
      style: {
        background: active ? (color || t.primary) : t.surfaceAlt,
        color: active ? '#fff' : t.textSecondary,
        border: 'none', borderRadius: 20,
        padding: '7px 14px', fontSize: 12, fontWeight: 600,
        cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
        transition: 'all 0.18s',
        boxShadow: active ? `0 4px 12px ${(color||t.primary)}44` : 'none',
      },
    }, label);

  // ─── HOME SCREEN ──────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const moods = [
      { id: 'mysterious', label: '🔮 Mysterious' },
      { id: 'funny', label: '😄 Funny' },
      { id: 'tense', label: '😰 Tense' },
      { id: 'romantic', label: '💕 Romantic' },
      { id: 'weird', label: '🌀 Weird' },
    ];
    const times = ['5 min', '10 min', '15 min', '30 min'];
    const contexts = ['🚇 Commuting', '☕ Coffee Break', '😴 Wind Down', '⏳ Waiting Room'];

    const featuredList = [
      storyData.mystery,
      storyData.comedy,
      storyData.thriller,
      { id: 'romance', title: 'Zero Gravity Date', genre: 'Romance', emoji: '🚀', color: '#F0367A', time: '7 min', plays: '31.4k', rating: 4.9 },
    ];

    const greeting = () => {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning ☀️';
      if (h < 17) return 'Good afternoon 🌤';
      if (h < 21) return 'Good evening 🌆';
      return 'Night owl mode 🌙';
    };

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 84 },
    },
      // ── Hero section
      React.createElement('div', {
        style: {
          background: `linear-gradient(155deg, ${t.primary}28 0%, ${t.accent}12 60%, transparent 100%)`,
          padding: '18px 20px 16px',
        },
      },
        React.createElement('p', { style: { color: t.textMuted, fontSize: 13, marginBottom: 3 } }, greeting()),
        React.createElement('h1', {
          style: { color: t.text, fontSize: 22, fontWeight: 800, lineHeight: 1.25, marginBottom: 6 },
        }, "What's your story\nmoment?"),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('div', {
            style: {
              width: 8, height: 8, borderRadius: '50%',
              background: t.success, flexShrink: 0,
            },
            className: 'blink',
          }),
          React.createElement('span', { style: { color: t.textSecondary, fontSize: 13 } }, '3 stories completed this week · Level 7'),
        )
      ),

      // ── Quick-Start Card
      React.createElement('div', {
        style: {
          margin: '4px 16px 0',
          background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 50%, ${t.accent}CC 130%)`,
          borderRadius: 22, padding: '18px 18px 14px',
          boxShadow: `0 10px 40px ${t.primary}44`,
        },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, letterSpacing: '0.8px', marginBottom: 2 } }, 'QUICK START'),
            React.createElement('h2', { style: { color: '#fff', fontSize: 17, fontWeight: 800 } }, 'Generate My Story'),
          ),
          React.createElement('div', {
            style: {
              background: 'rgba(255,255,255,0.18)', borderRadius: 10,
              padding: '4px 10px', backdropFilter: 'blur(4px)',
            },
          },
            React.createElement('span', { style: { color: '#fff', fontSize: 11, fontWeight: 700 } }, '✦ AI Powered'),
          ),
        ),

        React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', marginBottom: 8 } }, 'MOOD'),
        React.createElement('div', { style: { display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 } },
          moods.map(m =>
            React.createElement('button', {
              key: m.id,
              onClick: () => setSelectedMood(m.id),
              style: {
                background: selectedMood === m.id ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)',
                color: selectedMood === m.id ? t.primary : '#fff',
                border: 'none', borderRadius: 20,
                padding: '6px 12px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.18s',
                boxShadow: selectedMood === m.id ? '0 3px 10px rgba(0,0,0,0.15)' : 'none',
              },
            }, m.label)
          )
        ),

        React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', marginBottom: 8 } }, 'AVAILABLE TIME'),
        React.createElement('div', { style: { display: 'flex', gap: 7, marginBottom: 16 } },
          times.map(tm =>
            React.createElement('button', {
              key: tm,
              onClick: () => setSelectedTime(tm),
              style: {
                flex: 1,
                background: selectedTime === tm ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)',
                color: selectedTime === tm ? t.primary : '#fff',
                border: 'none', borderRadius: 20,
                padding: '7px 0', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.18s',
              },
            }, tm)
          )
        ),

        React.createElement('button', {
          onClick: () => launchStory('mystery'),
          style: {
            width: '100%', background: '#fff',
            color: t.primary, border: 'none', borderRadius: 14,
            padding: '13px', fontSize: 15, fontWeight: 800,
            cursor: 'pointer', letterSpacing: '0.2px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
            transition: 'transform 0.12s',
          },
        }, '✦ Start My Adventure'),
      ),

      // ── Context chips
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('p', { style: { color: t.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', marginBottom: 10 } }, 'YOUR CONTEXT'),
        React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          contexts.map(ctx =>
            React.createElement('button', {
              key: ctx,
              onClick: () => setSelectedContext(ctx === selectedContext ? null : ctx),
              style: {
                background: selectedContext === ctx ? t.surfaceAlt : t.surface,
                color: selectedContext === ctx ? t.primary : t.textSecondary,
                border: `1.5px solid ${selectedContext === ctx ? t.primary + '55' : t.border}`,
                borderRadius: 20, padding: '7px 13px',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.18s',
              },
            }, ctx)
          )
        ),
      ),

      // ── Featured
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 800 } }, 'Featured Stories'),
          React.createElement('span', { style: { color: t.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer' } }, 'See all →'),
        ),
        featuredList.map((story, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => story.scenes ? launchStory(story.id) : setActiveTab('play'),
            style: {
              background: t.surface, borderRadius: 16, padding: '13px 14px',
              marginBottom: 10, display: 'flex', alignItems: 'center', gap: 13,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              boxShadow: `0 2px 12px ${t.shadowCard}`,
              transform: pressedCard === i ? 'scale(0.975)' : 'scale(1)',
              transition: 'transform 0.12s',
            },
            onMouseDown: () => setPressedCard(i),
            onMouseUp: () => setPressedCard(null),
            onMouseLeave: () => setPressedCard(null),
            onTouchStart: () => setPressedCard(i),
            onTouchEnd: () => setPressedCard(null),
          },
            React.createElement('div', {
              style: {
                width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                background: `${story.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 23,
              },
            }, story.emoji),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 } }, story.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(GenreTag, { genre: story.genre, color: story.color }),
                React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `· ${story.time}`),
              ),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('p', { style: { color: t.primary, fontSize: 12, fontWeight: 800 } }, story.plays),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 10 } }, 'plays'),
            ),
          )
        ),
      ),
    );
  };

  // ─── PLAY SCREEN ──────────────────────────────────────────────────────────
  const PlayScreen = () => {
    const story = storyData[activeStoryId];
    const scene = story ? story.scenes[sceneIndex] : null;
    const isEnding = scene && scene.ending;
    const progress = story ? sceneIndex / (story.scenes.length - 1) : 0;

    const storyTabs = Object.values(storyData);

    if (!story || !scene) {
      return React.createElement('div', {
        style: {
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', background: t.bg,
          padding: 30,
        },
      },
        React.createElement('p', { style: { fontSize: 40, marginBottom: 12 } }, '📖'),
        React.createElement('h2', { style: { color: t.text, fontSize: 18, fontWeight: 800, marginBottom: 6, textAlign: 'center' } }, 'Choose a Story'),
        React.createElement('p', { style: { color: t.textSecondary, fontSize: 14, textAlign: 'center', marginBottom: 20 } }, 'Pick an adventure from the tabs above or explore from the Home screen.'),
      );
    }

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg },
    },
      // Story genre tabs
      React.createElement('div', {
        style: {
          padding: '10px 16px', background: t.surface,
          borderBottom: `1px solid ${t.border}`, flexShrink: 0,
        },
      },
        React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto' } },
          storyTabs.map(s =>
            React.createElement(PillButton, {
              key: s.id, label: `${s.emoji} ${s.genre}`,
              active: activeStoryId === s.id, color: s.color,
              onClick: () => launchStory(s.id),
            })
          ),
        ),
      ),

      // Story body
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 18px 0' } },
        // Header
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement(GenreTag, { genre: story.genre, color: story.color }),
          React.createElement('span', { style: { color: t.textMuted, fontSize: 12 } },
            isEnding ? '✦ Ending' : `Scene ${sceneIndex + 1} / ${story.scenes.length}`
          ),
        ),
        React.createElement('h2', {
          style: { color: t.text, fontSize: 19, fontWeight: 800, marginBottom: 10, lineHeight: 1.25 },
        }, story.title),

        // Progress bar
        React.createElement('div', {
          style: { height: 5, background: t.border, borderRadius: 5, overflow: 'hidden', marginBottom: 16 },
        },
          React.createElement('div', {
            style: {
              height: '100%', borderRadius: 5,
              width: `${Math.round(progress * 100)}%`,
              background: `linear-gradient(90deg, ${story.color}, ${t.accent})`,
              transition: 'width 0.5s ease',
            },
          }),
        ),

        // Scene text card
        React.createElement('div', {
          key: sceneIndex,
          className: 'scene-fade',
          style: {
            background: t.surface, borderRadius: 18, padding: '18px 16px',
            marginBottom: 16, border: `1px solid ${t.border}`,
            boxShadow: `0 4px 20px ${t.shadowCard}`,
          },
        },
          React.createElement('p', {
            style: { color: t.text, fontSize: 15, lineHeight: 1.75, fontWeight: 400 },
          }, scene.text),
        ),

        // Choices or Ending
        !isEnding
          ? React.createElement('div', { style: { marginBottom: 20 } },
              React.createElement('p', {
                style: { color: t.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: '0.9px', marginBottom: 10 },
              }, 'WHAT DO YOU DO?'),
              scene.choices.map((choice, i) =>
                React.createElement('button', {
                  key: i,
                  onClick: () => handleChoice(i),
                  style: {
                    width: '100%', textAlign: 'left', cursor: 'pointer',
                    background: pressedChoice === i ? story.color : t.surface,
                    color: pressedChoice === i ? '#fff' : t.text,
                    border: `2px solid ${pressedChoice === i ? story.color : t.border}`,
                    borderRadius: 15, padding: '13px 14px', fontSize: 14, fontWeight: 600,
                    marginBottom: 10, display: 'flex', alignItems: 'center', gap: 11,
                    transition: 'all 0.15s',
                    transform: pressedChoice === i ? 'scale(0.975)' : 'scale(1)',
                    boxShadow: pressedChoice === i ? `0 4px 16px ${story.color}44` : `0 1px 6px ${t.shadowCard}`,
                  },
                },
                  React.createElement('div', {
                    style: {
                      width: 28, height: 28, borderRadius: 9, flexShrink: 0,
                      background: pressedChoice === i ? 'rgba(255,255,255,0.22)' : `${story.color}22`,
                      color: pressedChoice === i ? '#fff' : story.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 900,
                    },
                  }, String.fromCharCode(65 + i)),
                  choice.text,
                )
              ),
            )
          : React.createElement('div', { style: { marginBottom: 24 } },
              React.createElement('div', {
                style: {
                  background: `linear-gradient(135deg, ${story.color}22, ${t.accent}18)`,
                  border: `1.5px solid ${story.color}44`,
                  borderRadius: 16, padding: '18px 16px', marginBottom: 14, textAlign: 'center',
                },
              },
                React.createElement('p', { style: { fontSize: 32, marginBottom: 8 } }, '🎉'),
                React.createElement('h3', { style: { color: t.text, fontSize: 16, fontWeight: 800, marginBottom: 4 } }, 'Story Complete!'),
                React.createElement('p', { style: { color: t.textSecondary, fontSize: 13 } }, `${choicePath.length} choices made · Path unlocked`),
              ),
              React.createElement('button', {
                onClick: restartStory,
                style: {
                  width: '100%',
                  background: `linear-gradient(135deg, ${story.color}, ${t.accent})`,
                  color: '#fff', border: 'none', borderRadius: 14,
                  padding: '14px', fontSize: 15, fontWeight: 800,
                  cursor: 'pointer', marginBottom: 10,
                  boxShadow: `0 6px 20px ${story.color}44`,
                },
              }, '🔄 Play Again — New Path'),
              React.createElement('button', {
                onClick: () => setActiveTab('library'),
                style: {
                  width: '100%',
                  background: t.surface, color: t.primary,
                  border: `2px solid ${t.primary}44`, borderRadius: 14,
                  padding: '13px', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer',
                },
              }, '📚 Save to Library'),
              React.createElement('div', {
                style: { display: 'flex', gap: 8, marginTop: 10 },
              },
                ['🔮 Mystery', '😄 Comedy', '🚇 Thriller'].map((label, i) => {
                  const ids = ['mystery', 'comedy', 'thriller'];
                  return React.createElement('button', {
                    key: i,
                    onClick: () => launchStory(ids[i]),
                    style: {
                      flex: 1, background: t.surfaceAlt,
                      color: t.textSecondary, border: `1px solid ${t.border}`,
                      borderRadius: 12, padding: '10px 6px', fontSize: 11, fontWeight: 700,
                      cursor: 'pointer',
                    },
                  }, label);
                }),
              ),
            ),
      ),
    );
  };

  // ─── DISCOVER SCREEN ──────────────────────────────────────────────────────
  const DiscoverScreen = () => {
    const [query, setQuery] = useState('');

    const categories = [
      { label: 'Commute Mode', emoji: '🚇', color: '#6C3FF5', desc: '5–10 min adventures' },
      { label: 'Coffee Break', emoji: '☕', color: '#F5A623', desc: '3–7 min escapes' },
      { label: 'Wind Down', emoji: '🌙', color: '#8B5CF6', desc: 'Calm, cozy stories' },
      { label: 'Adrenaline', emoji: '⚡', color: '#E53E3E', desc: 'High-stakes thrills' },
      { label: 'Romance', emoji: '💕', color: '#F0367A', desc: 'Heart-warming tales' },
      { label: 'Cosmic Weird', emoji: '🌀', color: '#06B6D4', desc: 'Strange & surreal' },
    ];

    const trending = [
      { title: 'Office Saboteur', genre: 'Comedy', emoji: '💼', color: '#F5A623', time: '8 min', plays: '28.1k' },
      { title: 'Neon Alley Blues', genre: 'Noir', emoji: '🌙', color: '#8B5CF6', time: '11 min', plays: '9.4k' },
      { title: 'Zero Gravity Date', genre: 'Romance', emoji: '🚀', color: '#F0367A', time: '7 min', plays: '31.4k' },
      { title: "The Substitute Villain", genre: 'Comedy', emoji: '🦹', color: '#F5A623', time: '6 min', plays: '11.2k' },
      { title: 'What the AI Knows', genre: 'Sci-Fi', emoji: '🤖', color: '#06B6D4', time: '12 min', plays: '17.9k' },
      { title: 'Midnight in the Museum', genre: 'Horror', emoji: '🏛️', color: '#8B5CF6', time: '9 min', plays: '13.6k' },
    ];

    const remixPremises = [
      { premise: 'A stolen briefcase', variants: ['Mystery', 'Comedy', 'Romance'] },
      { premise: 'Wrong train home', variants: ['Thriller', 'Sci-Fi', 'Comedy'] },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 84 },
    },
      // Search bar
      React.createElement('div', {
        style: { padding: '12px 16px 14px', background: t.surface, borderBottom: `1px solid ${t.border}` },
      },
        React.createElement('div', {
          style: {
            background: t.surfaceAlt, borderRadius: 14,
            padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 9,
            border: `1.5px solid ${t.border}`,
          },
        },
          React.createElement('span', { style: { fontSize: 15, opacity: 0.7 } }, '🔍'),
          React.createElement('input', {
            value: query,
            onChange: e => setQuery(e.target.value),
            placeholder: 'Search stories, moods, genres…',
            style: {
              background: 'transparent', border: 'none', outline: 'none',
              color: t.text, fontSize: 14, flex: 1,
            },
          }),
        ),
      ),

      React.createElement('div', { style: { padding: '16px 16px 0' } },
        // Categories grid
        React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 800, marginBottom: 11 } }, '🎯 Story Contexts'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 22 },
        },
          categories.map((cat, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => launchStory('mystery'),
              style: {
                background: `linear-gradient(140deg, ${cat.color}2A, ${cat.color}10)`,
                border: `1.5px solid ${cat.color}33`,
                borderRadius: 16, padding: '13px 12px', cursor: 'pointer',
                transition: 'transform 0.12s',
              },
            },
              React.createElement('p', { style: { fontSize: 24, marginBottom: 6 } }, cat.emoji),
              React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 } }, cat.label),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 11 } }, cat.desc),
            )
          ),
        ),

        // Plot Remix
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}18)`,
            border: `1.5px solid ${t.primary}33`, borderRadius: 16, padding: 14, marginBottom: 20,
          },
        },
          React.createElement('p', { style: { color: t.primary, fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', marginBottom: 4 } }, '✦ PLOT REMIX'),
          React.createElement('h4', { style: { color: t.text, fontSize: 14, fontWeight: 800, marginBottom: 10 } }, 'Same premise, different genre'),
          remixPremises.map((p, i) =>
            React.createElement('div', { key: i, style: { marginBottom: i < remixPremises.length - 1 ? 10 : 0 } },
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, fontWeight: 600, marginBottom: 6 } }, `"${p.premise}"`),
              React.createElement('div', { style: { display: 'flex', gap: 7 } },
                p.variants.map((v, j) =>
                  React.createElement('button', {
                    key: j,
                    onClick: () => launchStory('mystery'),
                    style: {
                      flex: 1, background: t.surface,
                      color: t.primary, border: `1px solid ${t.primary}44`,
                      borderRadius: 10, padding: '8px 4px', fontSize: 11, fontWeight: 700,
                      cursor: 'pointer',
                    },
                  }, v)
                ),
              ),
            )
          ),
        ),

        // Trending
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 } },
          React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 800 } }, '🔥 Trending Now'),
          React.createElement('span', { style: { color: t.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer' } }, 'See all →'),
        ),
        trending.map((s, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => launchStory('mystery'),
            style: {
              background: t.surface, borderRadius: 14, padding: '11px 13px',
              marginBottom: 9, display: 'flex', alignItems: 'center', gap: 12,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              boxShadow: `0 1px 8px ${t.shadowCard}`,
            },
          },
            React.createElement('span', { style: { color: t.textMuted, fontSize: 11, fontWeight: 800, width: 22, textAlign: 'center', flexShrink: 0 } }, `#${i + 1}`),
            React.createElement('div', {
              style: {
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: `${s.color}22`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 20,
              },
            }, s.emoji),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 } }, s.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(GenreTag, { genre: s.genre, color: s.color }),
                React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `· ${s.time}`),
              ),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('p', { style: { color: t.primary, fontSize: 12, fontWeight: 800 } }, s.plays),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 10 } }, 'plays'),
            ),
          )
        ),
      ),
    );
  };

  // ─── LIBRARY SCREEN ───────────────────────────────────────────────────────
  const LibraryScreen = () => {
    const filters = ['all', 'completed', 'in progress', 'mystery', 'comedy', 'thriller'];

    const savedStories = [
      { ...storyData.mystery, completed: true, progress: 100, userRating: 5, savedChoices: 4 },
      { ...storyData.comedy, completed: true, progress: 100, userRating: 5, savedChoices: 3 },
      { ...storyData.thriller, completed: false, progress: 35, savedChoices: 1 },
      { id: 'horror', title: 'Midnight in the Museum', genre: 'Horror', emoji: '🏛️', color: '#8B5CF6', time: '9 min', completed: true, progress: 100, userRating: 4, savedChoices: 5 },
      { id: 'barista', title: 'The Barista Who Knew Too Much', genre: 'Mystery', emoji: '☕', color: '#6C3FF5', time: '7 min', completed: true, progress: 100, userRating: 5, savedChoices: 6 },
      { id: 'villain', title: 'The Substitute Villain', genre: 'Comedy', emoji: '🦹', color: '#F5A623', time: '6 min', completed: false, progress: 60, savedChoices: 3 },
    ];

    const filtered = savedStories.filter(s => {
      if (libraryFilter === 'all') return true;
      if (libraryFilter === 'completed') return s.completed;
      if (libraryFilter === 'in progress') return !s.completed;
      return s.genre.toLowerCase() === libraryFilter;
    });

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 84 },
    },
      // Header
      React.createElement('div', {
        style: { padding: '14px 16px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` },
      },
        React.createElement('h2', { style: { color: t.text, fontSize: 19, fontWeight: 800, marginBottom: 12 } }, '📚 Your Library'),
        React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto' } },
          filters.map(f =>
            React.createElement(PillButton, {
              key: f, label: f.charAt(0).toUpperCase() + f.slice(1),
              active: libraryFilter === f, color: t.primary,
              onClick: () => setLibraryFilter(f),
            })
          ),
        ),
      ),

      // Stats strip
      React.createElement('div', {
        style: {
          display: 'flex', margin: '14px 16px',
          background: t.surface, borderRadius: 16, overflow: 'hidden',
          border: `1px solid ${t.border}`, gap: 1,
        },
      },
        [
          { label: 'Completed', value: '12', icon: '✅' },
          { label: 'In Progress', value: '3', icon: '⏳' },
          { label: 'Avg Rating', value: '4.8★', icon: '⭐' },
          { label: 'Hours', value: '4.1h', icon: '⏱' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, background: t.surface, padding: '11px 6px', textAlign: 'center' },
          },
            React.createElement('p', { style: { fontSize: 17, marginBottom: 3 } }, stat.icon),
            React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 800 } }, stat.value),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 9, fontWeight: 600 } }, stat.label),
          )
        ),
      ),

      // Story cards
      React.createElement('div', { style: { padding: '0 16px' } },
        filtered.map((story, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.surface, borderRadius: 16, padding: '14px',
              marginBottom: 11, border: `1px solid ${t.border}`,
              boxShadow: `0 2px 12px ${t.shadowCard}`,
            },
          },
            // Top row
            React.createElement('div', { style: { display: 'flex', gap: 13, alignItems: 'flex-start', marginBottom: 11 } },
              React.createElement('div', {
                style: {
                  width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                  background: `${story.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 23, position: 'relative',
                },
              },
                story.emoji,
                !story.completed && React.createElement('div', {
                  style: {
                    position: 'absolute', top: -4, right: -4,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#F5A623', border: `2.5px solid ${t.surface}`,
                  },
                }),
              ),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('h4', { style: { color: t.text, fontSize: 14, fontWeight: 700, marginBottom: 4 } }, story.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
                  React.createElement(GenreTag, { genre: story.genre, color: story.color }),
                  React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `· ${story.time} · ${story.savedChoices} choices`),
                ),
                story.completed
                  ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                      React.createElement('span', {
                        style: {
                          background: '#10C97B22', color: '#10C97B',
                          borderRadius: 20, padding: '3px 9px',
                          fontSize: 11, fontWeight: 700,
                        },
                      }, '✓ Completed'),
                      story.userRating && React.createElement(StarRow, { rating: story.userRating }),
                    )
                  : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                      React.createElement('div', {
                        style: { flex: 1, height: 4, background: t.border, borderRadius: 4, overflow: 'hidden' },
                      },
                        React.createElement('div', {
                          style: { width: `${story.progress}%`, height: '100%', background: '#F5A623', borderRadius: 4 },
                        }),
                      ),
                      React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `${story.progress}%`),
                    ),
              ),
            ),
            // Actions
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                onClick: () => story.scenes ? launchStory(story.id) : setActiveTab('play'),
                style: {
                  flex: 1, background: `${story.color}22`, color: story.color,
                  border: 'none', borderRadius: 10, padding: '9px',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                },
              }, story.completed ? '🔄 Replay' : '▶ Continue'),
              React.createElement('button', {
                onClick: () => setActiveTab('discover'),
                style: {
                  background: t.surfaceAlt, color: t.textSecondary,
                  border: 'none', borderRadius: 10, padding: '9px 13px',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                },
              }, '🎭 Remix'),
            ),
          )
        ),
      ),
    );
  };

  // ─── PROFILE SCREEN ───────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const stats = [
      { label: 'Stories', value: '24', icon: '📖' },
      { label: 'Hours', value: '3.2', icon: '⏱' },
      { label: 'Choices', value: '89', icon: '🎭' },
      { label: 'Endings', value: '16', icon: '🏆' },
    ];

    const genres = [
      { label: '🔮 Mystery', color: '#6C3FF5', active: true },
      { label: '😄 Comedy', color: '#F5A623', active: true },
      { label: '😰 Thriller', color: '#E53E3E', active: false },
      { label: '💕 Romance', color: '#F0367A', active: false },
      { label: '🚀 Sci-Fi', color: '#06B6D4', active: true },
      { label: '🌀 Weird', color: '#8B5CF6', active: false },
    ];

    const SettingRow = ({ icon, label, sub, children }) =>
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '13px 16px',
        },
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('span', { style: { fontSize: 20 } }, icon),
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, label),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 12 } }, sub),
          ),
        ),
        children,
      );

    const SectionCard = ({ title, children }) =>
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 16, overflow: 'hidden',
          border: `1px solid ${t.border}`, marginBottom: 14,
        },
      },
        React.createElement('div', {
          style: { padding: '10px 16px', borderBottom: `1px solid ${t.border}` },
        },
          React.createElement('p', { style: { color: t.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: '1px' } }, title),
        ),
        children,
      );

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 84 },
    },
      // Profile hero
      React.createElement('div', {
        style: {
          background: `linear-gradient(150deg, ${t.primary} 0%, ${t.primaryDark} 55%, ${t.accent}BB 130%)`,
          padding: '22px 20px 28px', position: 'relative', overflow: 'hidden',
        },
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -40, right: -40,
            width: 140, height: 140, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
          },
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -20, left: 60,
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          },
        }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, position: 'relative' } },
          React.createElement('div', {
            style: {
              width: 62, height: 62, borderRadius: 20, flexShrink: 0,
              background: 'rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, border: '2px solid rgba(255,255,255,0.35)',
            },
          }, '🦊'),
          React.createElement('div', null,
            React.createElement('h2', { style: { color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 2 } }, 'Alex Rivera'),
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 5 } }, '🔮 Mystery Enthusiast · Level 7'),
            React.createElement('div', {
              style: {
                display: 'inline-block',
                background: 'rgba(255,255,255,0.18)', borderRadius: 20,
                padding: '3px 10px',
              },
            },
              React.createElement('span', { style: { color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 600 } }, '450 / 600 XP to Level 8'),
            ),
          ),
        ),
      ),

      React.createElement('div', { style: { padding: '14px 16px 0' } },
        // Stats
        React.createElement('div', {
          style: {
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            background: t.surface, borderRadius: 16, overflow: 'hidden',
            border: `1px solid ${t.border}`, gap: 1, marginBottom: 14,
          },
        },
          stats.map((s, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.surface, padding: '12px 6px', textAlign: 'center' },
            },
              React.createElement('p', { style: { fontSize: 18, marginBottom: 3 } }, s.icon),
              React.createElement('p', { style: { color: t.text, fontSize: 16, fontWeight: 800 } }, s.value),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 10, fontWeight: 600 } }, s.label),
            )
          ),
        ),

        // Appearance
        React.createElement(SectionCard, { title: 'APPEARANCE' },
          React.createElement(SettingRow, {
            icon: isDark ? '🌙' : '☀️',
            label: 'Dark Mode',
            sub: isDark ? 'Currently using dark theme' : 'Currently using light theme',
          },
            React.createElement(Toggle, { value: isDark, onChange: setIsDark }),
          ),
        ),

        // Preferences
        React.createElement(SectionCard, { title: 'PREFERENCES' },
          React.createElement('div', null,
            React.createElement('div', { style: { borderBottom: `1px solid ${t.border}` } },
              React.createElement(SettingRow, { icon: '🔔', label: 'Story Reminders', sub: 'Daily nudge to start a story' },
                React.createElement(Toggle, { value: notifOn, onChange: setNotifOn }),
              ),
            ),
            React.createElement('div', { style: { borderBottom: `1px solid ${t.border}` } },
              React.createElement(SettingRow, { icon: '💾', label: 'Auto-Save Progress', sub: 'Save at every scene checkpoint' },
                React.createElement(Toggle, { value: autoSave, onChange: setAutoSave }),
              ),
            ),
            React.createElement(SettingRow, { icon: '🔊', label: 'Sound Effects', sub: 'Ambient audio during stories' },
              React.createElement(Toggle, { value: soundOn, onChange: setSoundOn }),
            ),
          ),
        ),

        // Favorite Genres
        React.createElement(SectionCard, { title: 'FAVORITE GENRES' },
          React.createElement('div', { style: { padding: '13px 16px', display: 'flex', flexWrap: 'wrap', gap: 8 } },
            genres.map((g, i) =>
              React.createElement('button', {
                key: i,
                style: {
                  background: g.active ? `${g.color}22` : t.surfaceAlt,
                  color: g.active ? g.color : t.textSecondary,
                  border: `1.5px solid ${g.active ? g.color + '55' : t.border}`,
                  borderRadius: 20, padding: '7px 13px',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                },
              }, g.label)
            ),
          ),
        ),

        // Footer
        React.createElement('div', { style: { textAlign: 'center', paddingBottom: 20 } },
          React.createElement('p', { style: { color: t.textMuted, fontSize: 12 } }, 'PlotPocket v1.2.0'),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 2 } }, 'Tiny stories, big escapes.'),
        ),
      ),
    );
  };

  // ─── NAV SETUP ────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'play',     label: 'Play',     icon: window.lucide.BookOpen },
    { id: 'library',  label: 'Library',  icon: window.lucide.Library },
    { id: 'profile',  label: 'Profile',  icon: window.lucide.User },
  ];

  const screens = {
    home:     HomeScreen,
    discover: DiscoverScreen,
    play:     PlayScreen,
    library:  LibraryScreen,
    profile:  ProfileScreen,
  };

  // ─── STATUS BAR ICONS ─────────────────────────────────────────────────────
  const WifiIcon = () =>
    React.createElement('svg', { width: 16, height: 12, viewBox: '0 0 24 18', fill: t.text },
      React.createElement('path', { d: 'M12 5C8.1 5 4.6 6.6 2.1 9.2L0 7.1C3.1 3.8 7.3 1.8 12 1.8s8.9 2 12 5.3l-2.1 2.1C19.4 6.6 15.9 5 12 5z', fillOpacity: 0.4 }),
      React.createElement('path', { d: 'M12 10.2c-2.6 0-5 1.1-6.7 2.8L3.2 11C5.5 8.7 8.6 7.2 12 7.2s6.5 1.5 8.8 3.8l-2.1 2C16.9 11.3 14.6 10.2 12 10.2z', fillOpacity: 0.7 }),
      React.createElement('circle', { cx: 12, cy: 15.5, r: 2.3 }),
    );

  const BatteryIcon = () =>
    React.createElement('svg', { width: 24, height: 12, viewBox: '0 0 24 12', fill: 'none' },
      React.createElement('rect', { x: 0.5, y: 0.5, width: 20, height: 11, rx: 3.5, stroke: t.text, strokeOpacity: 0.35 }),
      React.createElement('rect', { x: 2, y: 2, width: 15, height: 8, rx: 2, fill: t.text }),
      React.createElement('path', { d: 'M22 4v4a2 2 0 000-4z', fill: t.text, fillOpacity: 0.4 }),
    );

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: 20,
    },
  },
    fontEl,

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 52,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: [
          '0 50px 120px rgba(0,0,0,0.35)',
          '0 0 0 2px #444',
          '0 0 0 7px #252525',
          '0 0 0 8px #333',
          'inset 0 0 0 1px rgba(255,255,255,0.06)',
        ].join(', '),
        transition: 'background 0.3s',
      },
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 44, background: t.statusBar,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 26px', flexShrink: 0,
          position: 'relative', zIndex: 10,
          backdropFilter: 'blur(12px)',
        },
      },
        React.createElement('span', { style: { color: t.text, fontSize: 15, fontWeight: 700 } }, currentTime || '9:41'),

        // Dynamic Island
        React.createElement('div', {
          style: {
            position: 'absolute', top: 10, left: '50%',
            transform: 'translateX(-50%)',
            width: 122, height: 34,
            background: '#000', borderRadius: 18, zIndex: 20,
          },
        }),

        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(WifiIcon),
          React.createElement(BatteryIcon),
        ),
      ),

      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', position: 'relative' },
      },
        React.createElement(screens[activeTab]),
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 82,
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '4px 4px 14px',
          flexShrink: 0,
          backdropFilter: 'blur(16px)',
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              padding: '7px 14px',
              cursor: 'pointer', borderRadius: 16,
              background: activeTab === tab.id ? `${t.primary}18` : 'transparent',
              transition: 'all 0.18s',
              minWidth: 54,
            },
          },
            React.createElement(tab.icon, {
              size: 21,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              },
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
