const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FFF8F2',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF1E8',
    surfaceHover: '#FEF3E6',
    primary: '#F4845F',
    primaryDark: '#E06B44',
    primaryLight: '#FDEEE8',
    secondary: '#7C6AF5',
    secondaryLight: '#EEEAFF',
    accent: '#F7C948',
    accentLight: '#FEF9E3',
    success: '#4CAF7D',
    successLight: '#E6F7ED',
    text: '#1C1917',
    textSecondary: '#57534E',
    textMuted: '#A8A29E',
    border: '#E7E5E4',
    navBg: '#FFFFFF',
    statusBar: '#FFF8F2',
    card: '#FFFFFF',
    inputBg: '#F5F5F4',
    divider: '#F5F5F4',
    shadow: 'rgba(244, 132, 95, 0.15)',
  },
  dark: {
    bg: '#13111A',
    surface: '#1E1A2B',
    surfaceAlt: '#261F38',
    surfaceHover: '#2E2644',
    primaryLight: '#3A2035',
    primary: '#FF8C6B',
    primaryDark: '#E87352',
    secondary: '#9D8FFF',
    secondaryLight: '#26234A',
    accent: '#FFD166',
    accentLight: '#2E2710',
    success: '#5DC892',
    successLight: '#102A1E',
    text: '#F7F5F3',
    textSecondary: '#B5B0A8',
    textMuted: '#6B6560',
    border: '#2D2838',
    navBg: '#17131F',
    statusBar: '#13111A',
    card: '#1E1A2B',
    inputBg: '#261F38',
    divider: '#261F38',
    shadow: 'rgba(255, 140, 107, 0.2)',
  },
};

const moods = [
  { id: 'sad',        emoji: '😢', label: 'Sad',         color: '#4A90D9', bg: '#EBF4FF', darkBg: '#0D1F35' },
  { id: 'angry',      emoji: '😠', label: 'Angry',       color: '#E55A4E', bg: '#FFF0EF', darkBg: '#2E0F0D' },
  { id: 'nervous',    emoji: '😰', label: 'Nervous',     color: '#E8A838', bg: '#FFF8EC', darkBg: '#2B1E03' },
  { id: 'leftout',    emoji: '😔', label: 'Left Out',    color: '#9B72CF', bg: '#F5F0FF', darkBg: '#1E1235' },
  { id: 'overwhelmed',emoji: '😵', label: 'Overwhelmed', color: '#D96B9B', bg: '#FFF0F6', darkBg: '#2E0D1D' },
  { id: 'happy',      emoji: '😊', label: 'Happy',       color: '#3CB87A', bg: '#EDFAF3', darkBg: '#052B16' },
];

const scenarios = [
  { id: 'sibling',    icon: '👫', label: 'Sibling Trouble',      desc: 'Problems with a brother or sister' },
  { id: 'playground', icon: '🛝', label: 'Playground Conflict',   desc: 'Someone was mean or unfair' },
  { id: 'school',     icon: '📝', label: 'School Worries',        desc: 'A presentation or big test' },
  { id: 'bedtime',    icon: '🌙', label: 'Bedtime Worries',       desc: 'Hard to settle or fall asleep' },
  { id: 'doctor',     icon: '🩺', label: 'Doctor / Dentist Visit', desc: 'Feeling scared about a visit' },
];

const stories = {
  angry_sibling: {
    title: 'The Squirrel and the Borrowed Acorn',
    character: '🐿️',
    characterName: 'Sammy the Squirrel',
    moodColor: '#E55A4E',
    paragraphs: [
      "Sammy the Squirrel had been saving the most perfect acorn all week long. It was round, shiny, and just right.",
      "One afternoon, his little brother Chip bounded over and picked it up without asking — and started rolling it across the forest floor.",
      "'HEY!' A hot, tight feeling rushed up through Sammy's whole body. His paws balled into fists. That was MY acorn!",
      "A wise old owl named Bea landed nearby. 'Sammy,' she said gently, 'I can see that feeling. It's called angry. That's okay. Can you say what happened and what you need?'",
      "Sammy took one big breath. 'Chip — you took my acorn without asking. I need you to ask me first, and please give it back now.'",
      "Chip's ears drooped. 'Oh. Sorry, Sammy. I didn't know it was special.' He handed it back carefully.",
      "Sammy still felt a little mad. But also a little lighter. Saying what happened — and what he needed — really helped. 🌟",
    ],
    coping: {
      type: 'breathe',
      title: 'Cool-Down Breath',
      instruction: "When anger feels hot, a slow breath cools it down. Let's breathe together like Sammy.",
      breathIn: 4, breathHold: 2, breathOut: 6,
      script: [
        "Say what happened: \"You took my ___ without asking.\"",
        "Say what you need: \"Please give it back / please ask me next time.\"",
      ],
    },
  },
  nervous_school: {
    title: "Mia the Mouse's Big Moment",
    character: '🐭',
    characterName: 'Mia the Mouse',
    moodColor: '#E8A838',
    paragraphs: [
      "Mia the Mouse had been thinking about it for days. Tomorrow she had to stand up in front of the whole class and share her project about cheese.",
      "The night before, her tummy felt full of butterflies — the fluttery, flippy kind that wouldn't sit still.",
      "'What if I forget every single word?' she whispered to her stuffed elephant.",
      "Her mom sat beside her. 'Mia, that fluttery feeling is called nervous. It means your body is getting ready. Even grown-ups feel it before something big.'",
      "'Really?' Mia asked. 'Even you?'",
      "'Especially me. And here's a secret that helps: breathe slowly, then say your very first sentence three times. Your brain calms right down.'",
      "Mia tried it. 'My project is about cheese.' Three times, each one steadier than the last.",
      "The next day her voice wobbled a tiny bit — but her first sentence came out clear. Then the next. Then the next. She did it! 🌟",
    ],
    coping: {
      type: 'breathe',
      title: 'Butterfly Breath',
      instruction: "Breathe in the calm, breathe out the flutters. Let's slow those butterflies down together.",
      breathIn: 4, breathHold: 2, breathOut: 6,
      script: [
        "Practice your very first sentence 3 times out loud.",
        "Say: \"I've felt nervous before, and I got through it.\"",
      ],
    },
  },
  leftout_playground: {
    title: 'Lola the Llama Feels Left Out',
    character: '🦙',
    characterName: 'Lola the Llama',
    moodColor: '#9B72CF',
    paragraphs: [
      "At recess, everyone ran to play the new game — and somehow, in all the rushing, no one said 'Come on, Lola!'",
      "She stood at the edge of the field, watching. A heavy, grey feeling settled in her chest.",
      "She found a bench and sat very still. 'I feel sad,' she said quietly to herself. Just naming it helped — a little.",
      "Her teacher Mr. Flores walked by. 'Hey Lola, you okay?'",
      "'I feel left out,' she said. The words felt shaky but true.",
      "'That's a real feeling,' he said. 'Want to walk over and ask to join? The worst they can say is not right now — and usually they say yes.'",
      "Lola took a breath. She walked over. 'Can I play?'",
      "'Yes!' said three voices at once. The grey cloud got a little lighter. Sometimes asking is all it takes. 🌟",
    ],
    coping: {
      type: 'name',
      title: 'Name It to Tame It',
      instruction: "When we put words on a big feeling, it shrinks a little. Let's practice the three-sentence trick.",
      breathIn: 4, breathHold: 2, breathOut: 6,
      script: [
        "\"I feel ___ because ___.\"",
        "\"I wish ___.\"",
        "\"One thing I can try is ___.\"",
      ],
    },
  },
  sad_bedtime: {
    title: 'Bear Cub and the Worry Jar',
    character: '🐻',
    characterName: 'Bear Cub',
    moodColor: '#4A90D9',
    paragraphs: [
      "Bear Cub couldn't sleep. Worries kept piling up in his mind like leaves in autumn — school tomorrow, the friend who seemed mad, the test he wasn't sure about.",
      "He pulled his blanket tighter. The worries just got louder.",
      "His dad came in. 'What's all this noise in your head, little one?'",
      "'There's too many feelings,' Bear Cub said. 'They won't stop.'",
      "Dad sat on the edge of the bed. 'Let's try the Worry Jar. You say each worry out loud, and we imagine it floating into the jar. Then we put the lid on. We'll open it tomorrow if we need to.'",
      "Bear Cub closed his eyes. 'The test. The friend. Tomorrow's lunchbox.' One by one, they floated out.",
      "It didn't make the worries disappear. But they felt smaller — and farther away. Bear Cub's eyes grew heavy. 🌟",
    ],
    coping: {
      type: 'breathe',
      title: 'Worry Jar Breath',
      instruction: "Breathe out your worries one at a time. Each slow breath out puts a worry in the jar.",
      breathIn: 4, breathHold: 2, breathOut: 8,
      script: [
        "Name one worry out loud (or in your head).",
        "Breathe it out slowly — imagine it floating into the jar.",
        "Say: \"I'll think about that tomorrow. Right now I'm safe.\"",
      ],
    },
  },
};

const parentPrompts = [
  {
    feeling: 'angry', icon: '😠', color: '#E55A4E',
    prompts: [
      '"It\'s okay to feel angry. What made you feel that way?"',
      '"What do you wish had happened differently?"',
      '"What could you say next time, instead of [behavior]?"',
    ],
    insight: 'Anger often covers hurt or fear. Dig one layer deeper.',
  },
  {
    feeling: 'nervous', icon: '😰', color: '#E8A838',
    prompts: [
      '"That nervous feeling means your body is trying to help. What feels scary about it?"',
      '"What\'s the smallest thing that could go right?"',
      '"What has helped you feel brave before?"',
    ],
    insight: 'Validate first, problem-solve second. Rushing to fix dismisses the feeling.',
  },
  {
    feeling: 'sad', icon: '😢', color: '#4A90D9',
    prompts: [
      '"I can see you\'re sad. Do you want a hug, or do you want to talk?"',
      '"It\'s okay to feel sad. What happened?"',
      '"What would help you feel a tiny bit better right now?"',
    ],
    insight: 'Offering choice (hug or talk) gives kids agency when they feel powerless.',
  },
  {
    feeling: 'left out', icon: '😔', color: '#9B72CF',
    prompts: [
      '"Feeling left out is one of the hardest feelings. Who did you wish had included you?"',
      '"What\'s one thing you could try tomorrow?"',
      '"Is there someone you could invite to do something with you?"',
    ],
    insight: 'Shifting from passive ("they left me out") to active ("I can reach out") builds resilience.',
  },
];

const weekHistory = [
  { day: 'M', emotion: 'angry',       emoji: '😠', count: 2, color: '#E55A4E' },
  { day: 'T', emotion: 'happy',       emoji: '😊', count: 3, color: '#3CB87A' },
  { day: 'W', emotion: 'nervous',     emoji: '😰', count: 1, color: '#E8A838' },
  { day: 'T', emotion: 'sad',         emoji: '😢', count: 2, color: '#4A90D9' },
  { day: 'F', emotion: 'happy',       emoji: '😊', count: 4, color: '#3CB87A' },
  { day: 'S', emotion: 'overwhelmed', emoji: '😵', count: 1, color: '#D96B9B' },
  { day: 'S', emotion: 'happy',       emoji: '😊', count: 3, color: '#3CB87A' },
];

const recentStories = [
  { title: 'The Squirrel and the Borrowed Acorn', date: 'Today',      emoji: '🐿️', skill: 'Cool-Down Breath' },
  { title: "Mia the Mouse's Big Moment",          date: 'Yesterday',  emoji: '🐭', skill: 'Butterfly Breath' },
  { title: 'Lola the Llama Feels Left Out',       date: '2 days ago', emoji: '🦙', skill: 'Name It to Tame It' },
];

function App() {
  const [isDark, setIsDark]               = useState(false);
  const [activeTab, setActiveTab]         = useState('home');
  const [selectedMood, setSelectedMood]   = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [storyPhase, setStoryPhase]       = useState('reading');
  const [currentPara, setCurrentPara]     = useState(0);
  const [breathPhase, setBreathPhase]     = useState('idle');
  const [breathCount, setBreathCount]     = useState(0);
  const [pressedId, setPressedId]         = useState(null);
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  const [parentTab, setParentTab]         = useState('prompts');
  const breathTimer = useRef(null);

  const theme = isDark ? themes.dark : themes.light;

  const getStory = () => {
    if (!selectedMood) return null;
    if (selectedMood === 'angry')                          return stories.angry_sibling;
    if (selectedMood === 'nervous')                        return stories.nervous_school;
    if (selectedMood === 'leftout' || selectedMood === 'sad' && selectedScenario === 'playground') return stories.leftout_playground;
    if (selectedMood === 'sad')                            return stories.sad_bedtime;
    return stories.angry_sibling;
  };

  const story = getStory();
  const moodObj = moods.find(m => m.id === selectedMood);

  const press = (id) => { setPressedId(id); setTimeout(() => setPressedId(null), 140); };

  const startBreath = () => {
    if (breathPhase !== 'idle') return;
    setBreathPhase('in');
    breathTimer.current = setTimeout(() => {
      setBreathPhase('hold');
      breathTimer.current = setTimeout(() => {
        setBreathPhase('out');
        breathTimer.current = setTimeout(() => {
          setBreathPhase('idle');
          setBreathCount(c => c + 1);
        }, (story?.coping?.breathOut || 6) * 1000);
      }, (story?.coping?.breathHold || 2) * 1000);
    }, (story?.coping?.breathIn || 4) * 1000);
  };

  useEffect(() => () => clearTimeout(breathTimer.current), []);

  // ── Shared helpers ──────────────────────────────────────────────────────────

  const Pill = ({ children, color, bg }) => (
    <span style={{
      display: 'inline-block', background: bg, color, borderRadius: 20,
      padding: '3px 10px', fontSize: 11, fontWeight: 700,
    }}>{children}</span>
  );

  const Card = ({ children, style = {} }) => (
    <div style={{
      background: theme.surface, borderRadius: 20,
      border: `1.5px solid ${theme.border}`,
      padding: '18px', ...style,
    }}>{children}</div>
  );

  const PrimaryBtn = ({ children, onClick, style = {}, small = false }) => (
    <button
      onClick={() => { press('pb'); onClick && onClick(); }}
      style={{
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        border: 'none', borderRadius: small ? 14 : 18,
        padding: small ? '12px 18px' : '17px 24px',
        color: '#fff', fontFamily: 'inherit',
        fontSize: small ? 14 : 16, fontWeight: 800,
        cursor: 'pointer', width: '100%',
        boxShadow: `0 6px 24px ${theme.shadow}`,
        transform: pressedId === 'pb' ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.12s ease',
        ...style,
      }}
    >{children}</button>
  );

  const GhostBtn = ({ children, onClick, style = {} }) => (
    <button
      onClick={() => { press('gb'); onClick && onClick(); }}
      style={{
        background: theme.surface, border: `1.5px solid ${theme.border}`,
        borderRadius: 16, padding: '15px 20px',
        color: theme.text, fontFamily: 'inherit',
        fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%',
        transform: pressedId === 'gb' ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.12s ease', ...style,
      }}
    >{children}</button>
  );

  // ── HOME ─────────────────────────────────────────────────────────────────────

  const renderHome = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
      {/* Hero greeting */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        borderRadius: 24, padding: '20px',
        marginBottom: 20,
        boxShadow: `0 8px 28px ${theme.shadow}`,
      }}>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '0 0 4px', fontWeight: 600 }}>Good evening, Emma 🌙</p>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.2 }}>
          How are you<br/>feeling right now?
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {moods.map(m => (
            <button
              key={m.id}
              onClick={() => { press(m.id); setSelectedMood(m.id); }}
              style={{
                background: selectedMood === m.id ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)',
                border: selectedMood === m.id ? `2px solid #fff` : '2px solid rgba(255,255,255,0.3)',
                borderRadius: 16, padding: '12px 6px',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 5,
                transform: pressedId === m.id ? 'scale(0.92)' : 'scale(1)',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: 26 }}>{m.emoji}</span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: selectedMood === m.id ? m.color : '#fff',
              }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario picker */}
      <h2 style={{ fontSize: 15, fontWeight: 800, color: theme.text, margin: '0 0 10px' }}>What's happening?</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => { press(`sc-${s.id}`); setSelectedScenario(s.id); }}
            style={{
              background: selectedScenario === s.id ? theme.primaryLight : theme.surface,
              border: `1.5px solid ${selectedScenario === s.id ? theme.primary : theme.border}`,
              borderRadius: 16, padding: '12px 14px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
              textAlign: 'left',
              transform: pressedId === `sc-${s.id}` ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.14s ease',
            }}
          >
            <span style={{
              width: 40, height: 40, borderRadius: 12,
              background: selectedScenario === s.id ? theme.primary : theme.inputBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>{s.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: selectedScenario === s.id ? theme.primary : theme.text }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: 12, color: theme.textMuted }}>{s.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <PrimaryBtn onClick={() => { setActiveTab('story'); setStoryPhase('reading'); setCurrentPara(0); setBreathPhase('idle'); setBreathCount(0); }}>
          ✨ Tell Me a Story
        </PrimaryBtn>
      )}

      {/* Recent stories */}
      <h2 style={{ fontSize: 15, fontWeight: 800, color: theme.text, margin: '24px 0 10px' }}>Recent Stories</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recentStories.map((rs, i) => (
          <div key={i} style={{
            background: theme.surface, border: `1.5px solid ${theme.border}`,
            borderRadius: 16, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: theme.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>{rs.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: theme.text }}>{rs.title}</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: theme.textMuted }}>
                {rs.date} · Skill: {rs.skill}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── STORY ─────────────────────────────────────────────────────────────────────

  const renderStory = () => {
    if (!story) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📚</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 8 }}>Pick a Feeling First</h2>
        <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
          Go to Home, tap how you're feeling, and a story will appear here.
        </p>
        <PrimaryBtn onClick={() => setActiveTab('home')} style={{ maxWidth: 200 }}>Go to Home</PrimaryBtn>
      </div>
    );

    if (storyPhase === 'reading') {
      const progress = (currentPara + 1) / story.paragraphs.length;
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Story header */}
          <div style={{
            padding: '16px 18px 14px',
            background: `linear-gradient(160deg, ${story.moodColor}18 0%, transparent 100%)`,
            borderBottom: `1px solid ${theme.border}`,
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                background: `linear-gradient(135deg, ${story.moodColor}, ${story.moodColor}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, boxShadow: `0 4px 14px ${story.moodColor}44`,
              }}>{story.character}</div>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>
                  A story with {story.characterName}
                </p>
                <p style={{ margin: '3px 0 0', fontSize: 16, fontWeight: 800, color: theme.text, lineHeight: 1.25 }}>
                  {story.title}
                </p>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ background: theme.border, borderRadius: 6, height: 5, overflow: 'hidden' }}>
              <div style={{
                width: `${progress * 100}%`, height: '100%',
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                borderRadius: 6, transition: 'width 0.4s ease',
              }} />
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>
              Page {currentPara + 1} of {story.paragraphs.length}
            </p>
          </div>

          {/* Story text */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px' }}>
            {story.paragraphs.slice(0, currentPara + 1).map((para, i) => (
              <p key={i} style={{
                fontSize: 16, lineHeight: 1.8,
                color: i === currentPara ? theme.text : theme.textMuted,
                fontWeight: i === currentPara ? 500 : 400,
                marginBottom: 14, transition: 'color 0.3s',
              }}>{para}</p>
            ))}
          </div>

          {/* Nav buttons */}
          <div style={{
            padding: '14px 18px 18px', borderTop: `1px solid ${theme.border}`,
            display: 'flex', gap: 10, flexShrink: 0,
          }}>
            {currentPara > 0 && (
              <GhostBtn onClick={() => setCurrentPara(p => p - 1)} style={{ flex: 1 }}>← Back</GhostBtn>
            )}
            <button
              onClick={() => {
                if (currentPara < story.paragraphs.length - 1) setCurrentPara(p => p + 1);
                else setStoryPhase('activity');
              }}
              style={{
                flex: 2, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                border: 'none', borderRadius: 16, padding: '15px',
                color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 800,
                cursor: 'pointer', boxShadow: `0 4px 16px ${theme.shadow}`,
              }}
            >
              {currentPara < story.paragraphs.length - 1 ? 'Keep Reading →' : '✨ Learn the Skill'}
            </button>
          </div>
        </div>
      );
    }

    if (storyPhase === 'activity') {
      const coping = story.coping;
      const breathSize = breathPhase === 'in' ? 120 : breathPhase === 'hold' ? 110 : 80;
      const breathLabel = { idle: 'Tap to breathe', in: `Breathe in... (${coping.breathIn}s)`, hold: 'Hold...', out: `Let it go... (${coping.breathOut}s)` }[breathPhase];
      const breathEmoji = { idle: '👆', in: '😮', hold: '😌', out: '😮‍💨' }[breathPhase];

      return (
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px 24px' }}>
          {/* Coping card */}
          <div style={{
            background: `linear-gradient(160deg, ${theme.primary}18, ${theme.secondary}12)`,
            border: `1.5px solid ${theme.primary}30`,
            borderRadius: 24, padding: '22px', marginBottom: 16,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 6 }}>🌟</div>
              <h2 style={{ fontSize: 21, fontWeight: 900, color: theme.text, margin: '0 0 8px' }}>
                {coping.title}
              </h2>
              <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.65, margin: 0 }}>
                {coping.instruction}
              </p>
            </div>

            {/* Breathing circle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div
                onClick={startBreath}
                style={{
                  width: breathSize, height: breathSize,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, ${theme.primary}CC, ${theme.secondary}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: breathPhase === 'idle' ? 'pointer' : 'default',
                  transition: 'all 2.5s ease-in-out',
                  boxShadow: `0 0 0 ${breathPhase === 'in' ? 18 : 6}px ${theme.primary}22, 0 0 32px ${theme.primary}33`,
                  fontSize: 32,
                }}
              >{breathEmoji}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: theme.primary, margin: 0 }}>{breathLabel}</p>
              {breathCount > 0 && (
                <Pill color={theme.success} bg={theme.successLight}>
                  {breathCount} breath{breathCount > 1 ? 's' : ''} done ✓
                </Pill>
              )}
            </div>
          </div>

          {/* Script */}
          <Card style={{ marginBottom: 16 }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800, color: theme.text }}>
              💬 Try Saying:
            </p>
            {coping.script.map((line, i) => (
              <div key={i} style={{
                background: theme.primaryLight, borderLeft: `3px solid ${theme.primary}`,
                borderRadius: '0 12px 12px 0', padding: '11px 14px',
                marginBottom: i < coping.script.length - 1 ? 8 : 0,
              }}>
                <p style={{ fontSize: 13, color: theme.text, margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
                  {line}
                </p>
              </div>
            ))}
          </Card>

          <PrimaryBtn onClick={() => setStoryPhase('complete')}>
            🎉 I Did It!
          </PrimaryBtn>
        </div>
      );
    }

    if (storyPhase === 'complete') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 22px', textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 12 }}>🌈</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: theme.text, margin: '0 0 10px' }}>Amazing Job!</h1>
        <p style={{ fontSize: 15, color: theme.textSecondary, lineHeight: 1.7, margin: '0 0 28px' }}>
          You named your feeling and practised a new skill.<br/>That's something to be really proud of! ⭐
        </p>
        <Card style={{ width: '100%', marginBottom: 20, textAlign: 'left' }}>
          <p style={{ fontSize: 12, color: theme.textMuted, margin: '0 0 4px', fontWeight: 600 }}>SKILL EARNED</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: theme.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>🌟</div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: theme.primary }}>{story.coping.title}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: theme.textMuted }}>Saved to your skill kit</p>
            </div>
          </div>
        </Card>
        <PrimaryBtn onClick={() => { setActiveTab('home'); setSelectedMood(null); setSelectedScenario(null); }} style={{ marginBottom: 10 }}>
          📚 Read Another Story
        </PrimaryBtn>
        <GhostBtn onClick={() => setActiveTab('parent')}>
          👨‍👩‍👧 Parent Mode
        </GhostBtn>
      </div>
    );
  };

  // ── PARENT ────────────────────────────────────────────────────────────────────

  const renderParent = () => {
    const maxCount = Math.max(...weekHistory.map(d => d.count));
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
        {/* Lock badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            borderRadius: 20, padding: '5px 14px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 13 }}>🔒</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Parent Mode</span>
          </div>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 900, color: theme.text, margin: '0 0 18px', lineHeight: 1.3 }}>
          Continue the<br/>Conversation
        </h1>

        {/* Sub-tabs */}
        <div style={{
          display: 'flex', gap: 0, background: theme.inputBg,
          borderRadius: 14, padding: 4, marginBottom: 18,
        }}>
          {[['prompts', '💬 Prompts'], ['patterns', '📊 Patterns']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setParentTab(id)}
              style={{
                flex: 1, border: 'none', borderRadius: 11, padding: '9px',
                background: parentTab === id ? theme.surface : 'transparent',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
                color: parentTab === id ? theme.text : theme.textMuted,
                cursor: 'pointer',
                boxShadow: parentTab === id ? `0 2px 8px rgba(0,0,0,0.08)` : 'none',
                transition: 'all 0.2s',
              }}
            >{label}</button>
          ))}
        </div>

        {parentTab === 'prompts' && (
          <div>
            {parentPrompts.map((item, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => setExpandedPrompt(expandedPrompt === i ? null : i)}
                  style={{
                    width: '100%', background: theme.surface,
                    border: `1.5px solid ${expandedPrompt === i ? item.color : theme.border}`,
                    borderRadius: expandedPrompt === i ? '16px 16px 0 0' : 16,
                    padding: '14px 16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'inherit',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: item.color + '20',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    }}>{item.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>
                      When they feel {item.feeling}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: theme.textMuted }}>{expandedPrompt === i ? '▲' : '▼'}</span>
                </button>

                {expandedPrompt === i && (
                  <div style={{
                    background: theme.surface,
                    border: `1.5px solid ${item.color}`,
                    borderTop: 'none', borderRadius: '0 0 16px 16px',
                    padding: '14px 16px',
                  }}>
                    {item.prompts.map((p, j) => (
                      <div key={j} style={{
                        background: isDark ? theme.surfaceAlt : '#F9FAFB',
                        borderRadius: 10, padding: '10px 12px', marginBottom: 8,
                      }}>
                        <p style={{ margin: 0, fontSize: 13, color: theme.text, fontStyle: 'italic', lineHeight: 1.6 }}>{p}</p>
                      </div>
                    ))}
                    <div style={{
                      background: theme.accentLight, borderRadius: 10,
                      padding: '10px 12px', borderLeft: `3px solid ${theme.accent}`,
                    }}>
                      <p style={{ margin: 0, fontSize: 12, color: isDark ? theme.accent : '#78600A', fontWeight: 600, lineHeight: 1.5 }}>
                        💡 {item.insight}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {parentTab === 'patterns' && (
          <div>
            <Card style={{ marginBottom: 14 }}>
              <p style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 800, color: theme.text }}>
                📅 This Week's Feelings
              </p>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 90, marginBottom: 8 }}>
                {weekHistory.map((d, i) => {
                  const barH = Math.max(12, (d.count / maxCount) * 68);
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        width: '100%', height: barH, borderRadius: 8,
                        background: d.color + (isDark ? 'BB' : '99'),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: barH > 30 ? 13 : 0, transition: 'height 0.3s',
                      }}>{barH > 30 ? d.emoji : ''}</div>
                      <span style={{ fontSize: 10, color: theme.textMuted, fontWeight: 700 }}>{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Pattern alert */}
            <div style={{
              background: theme.accentLight,
              border: `1.5px solid ${theme.accent}66`,
              borderRadius: 16, padding: '14px 16px', marginBottom: 14,
            }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: isDark ? theme.accent : '#78600A', margin: '0 0 5px' }}>
                🔍 Pattern Spotted
              </p>
              <p style={{ fontSize: 13, color: isDark ? '#C9A84C' : '#92400E', margin: 0, lineHeight: 1.6 }}>
                Emma has felt angry or overwhelmed on 3 of 7 days. Consider checking in about school transitions or after-school energy levels.
              </p>
            </div>

            {/* Skill history */}
            <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 800, color: theme.text }}>Skills Practiced</p>
            {[
              { icon: '🌬️', skill: 'Cool-Down Breath', count: 5 },
              { icon: '🦋', skill: 'Butterfly Breath', count: 3 },
              { icon: '🏷️', skill: 'Name It to Tame It', count: 2 },
            ].map((sk, i) => (
              <div key={i} style={{
                background: theme.surface, border: `1.5px solid ${theme.border}`,
                borderRadius: 14, padding: '12px 14px', marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 22 }}>{sk.icon}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: theme.text }}>{sk.skill}</span>
                <Pill color={theme.primary} bg={theme.primaryLight}>{sk.count}×</Pill>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── SETTINGS ──────────────────────────────────────────────────────────────────

  const renderSettings = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px' }}>
      {/* Profile hero */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        borderRadius: 24, padding: '22px',
        marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: `0 8px 28px ${theme.shadow}`,
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: 20, flexShrink: 0,
          background: 'rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
        }}>🧒</div>
        <div>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 900, margin: 0 }}>Emma, age 7</p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '3px 0 0' }}>
            14 stories · 3 skills earned ⭐
          </p>
        </div>
      </div>

      {/* Theme toggle row */}
      <Card style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{isDark ? '🌙' : '☀️'}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
        <div
          onClick={() => setIsDark(d => !d)}
          style={{
            width: 52, height: 28, borderRadius: 14, cursor: 'pointer',
            background: isDark ? theme.primary : theme.border,
            position: 'relative', transition: 'background 0.3s',
          }}
        >
          <div style={{
            position: 'absolute', width: 22, height: 22, borderRadius: '50%',
            background: '#fff', top: 3, left: isDark ? 27 : 3,
            transition: 'left 0.3s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }} />
        </div>
      </Card>

      {/* Settings list */}
      {[
        { icon: '👤', label: "Child's Profile",    value: 'Emma · Age 7' },
        { icon: '🔔', label: 'Story Reminders',   value: '8:00 PM daily' },
        { icon: '📚', label: 'Reading Level',      value: 'Ages 4-7' },
        { icon: '🌈', label: 'Story Characters',   value: 'Animals' },
        { icon: '📊', label: 'Emotion Tracking',   value: 'On' },
        { icon: '🔒', label: 'Parent PIN',         value: 'Set' },
      ].map((item, i) => (
        <div key={i} style={{
          background: theme.surface, border: `1.5px solid ${theme.border}`,
          borderRadius: 14, padding: '14px 16px',
          marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{item.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: theme.textMuted }}>{item.value}</span>
            <span style={{ fontSize: 12, color: theme.textMuted }}>›</span>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>🗺️</div>
        <p style={{ fontSize: 15, fontWeight: 800, color: theme.text, margin: '0 0 4px' }}>MoodMap Tales</p>
        <p style={{ fontSize: 12, color: theme.textMuted }}>Version 1.0 · Stories that help kids name big feelings</p>
        <p style={{ fontSize: 11, color: theme.textMuted, marginTop: 8 }}>Made with ❤️ for curious kids and caring grown-ups</p>
      </div>
    </div>
  );

  // ── BOTTOM NAV ────────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'home',     emoji: '🏠', label: 'Home'    },
    { id: 'story',    emoji: '📖', label: 'Story'   },
    { id: 'parent',   emoji: '👨‍👩‍👧', label: 'Parent'  },
    { id: 'settings', emoji: '⚙️', label: 'Settings'},
  ];

  // ── RENDER ────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          background: #E8E0D8;
          display: flex; align-items: center; justify-content: center;
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
        }
        ::-webkit-scrollbar { display: none; }
        button { font-family: 'Nunito', sans-serif; }
      `}</style>

      <div style={{
        width: 375, height: 812,
        borderRadius: 52,
        background: theme.bg,
        overflow: 'hidden',
        boxShadow: '0 50px 120px rgba(0,0,0,0.38), 0 0 0 1.5px rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Nunito', sans-serif",
        transition: 'background 0.35s ease',
      }}>

        {/* ── Status Bar ── */}
        <div style={{
          height: 50, flexShrink: 0,
          background: theme.statusBar,
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 28px 6px',
          position: 'relative',
          transition: 'background 0.35s ease',
        }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: theme.text }}>9:41</span>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 122, height: 34, background: '#000', borderRadius: 20,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0"  y="6" width="3" height="6" rx="1" fill={theme.text} opacity="0.4"/>
              <rect x="4"  y="4" width="3" height="8" rx="1" fill={theme.text} opacity="0.6"/>
              <rect x="8"  y="2" width="3" height="10" rx="1" fill={theme.text} opacity="0.8"/>
              <rect x="12" y="0" width="3" height="12" rx="1" fill={theme.text}/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 24 16" fill="none">
              <path d="M2 10 C6 5 18 5 22 10" stroke={theme.text} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              <path d="M5 13 C8 9 16 9 19 13" stroke={theme.text} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
              <circle cx="12" cy="15" r="1.5" fill={theme.text}/>
            </svg>
            <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
              <rect x="0.5" y="0.5" width="22" height="13" rx="3.5" stroke={theme.text} strokeOpacity="0.4"/>
              <rect x="2" y="2" width="17" height="10" rx="2" fill={theme.text}/>
              <path d="M24 4.5V9.5C25.1 9 25.8 8.1 25.8 7C25.8 5.9 25.1 5 24 4.5Z" fill={theme.text} opacity="0.5"/>
            </svg>
          </div>
        </div>

        {/* ── App Header ── */}
        <div style={{
          padding: '10px 18px 8px',
          background: theme.bg,
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.35s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: `0 4px 10px ${theme.shadow}`,
            }}>🗺️</div>
            <span style={{ fontSize: 16, fontWeight: 900, color: theme.text, letterSpacing: '-0.3px' }}>
              MoodMap Tales
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, background: theme.surface,
              border: `1.5px solid ${theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              cursor: 'pointer',
            }}>🔔</div>
          </div>
        </div>

        {/* ── Screen Content ── */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home'     && renderHome()}
          {activeTab === 'story'    && renderStory()}
          {activeTab === 'parent'   && renderParent()}
          {activeTab === 'settings' && renderSettings()}
        </div>

        {/* ── Bottom Nav ── */}
        <div style={{
          height: 76, flexShrink: 0,
          background: theme.navBg,
          borderTop: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center',
          padding: '0 8px 10px',
          transition: 'background 0.35s ease',
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, border: 'none', background: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  padding: '8px 4px',
                }}
              >
                <div style={{
                  width: 42, height: 32, borderRadius: 10,
                  background: active ? theme.primaryLight : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                  transition: 'background 0.2s',
                }}>{tab.emoji}</div>
                <span style={{
                  fontSize: 10, fontWeight: 800,
                  color: active ? theme.primary : theme.textMuted,
                  transition: 'color 0.2s',
                }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
