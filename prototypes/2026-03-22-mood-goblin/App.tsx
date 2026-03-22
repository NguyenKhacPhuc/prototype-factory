const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FFF8F0', surface: '#FFFFFF', card: '#FFF0E6', cardBorder: '#FFD6B8',
    text: '#2D1B0E', textSecondary: '#7A4F35', textMuted: '#B8855A',
    primary: '#E8520A', primaryLight: '#FF7A3D', primaryDark: '#C43D00',
    accent: '#7B2D8B', accentLight: '#A855C2',
    success: '#2D8B5A', successLight: '#4CAF82',
    warn: '#D4A017', warnLight: '#F0C040',
    navBg: '#FFFFFF', inputBg: '#FFF4EC',
    divider: '#FFD6B8', overlay: 'rgba(45,27,14,0.5)',
    goblinBg: '#FFE8D0', goblinCard: '#FFF4EC',
    tag: '#FFD6B8', tagText: '#8B3D1A',
  },
  dark: {
    bg: '#130B0A', surface: '#1E1210', card: '#2A1A14', cardBorder: '#3D2518',
    text: '#FFE8D0', textSecondary: '#C49070', textMuted: '#7A5040',
    primary: '#FF7A3D', primaryLight: '#FFA070', primaryDark: '#E8520A',
    accent: '#C084D8', accentLight: '#D4A0E8',
    success: '#4CAF82', successLight: '#6FCC9E',
    warn: '#F0C040', warnLight: '#F5D060',
    navBg: '#1A0E0A', inputBg: '#251510',
    divider: '#3D2518', overlay: 'rgba(0,0,0,0.7)',
    goblinBg: '#1E1210', goblinCard: '#251510',
    tag: '#3D2518', tagText: '#FFA070',
  }
};

const goblinTypes = [
  { id: 'sticky', name: 'Sticky Goblin', emoji: '🟠', desc: 'Clings to old frustrations', color: '#E8520A' },
  { id: 'hungry', name: 'Hungry Goblin', emoji: '🟡', desc: 'Needs fuel and nourishment', color: '#D4A017' },
  { id: 'overstim', name: 'Buzzy Goblin', emoji: '🟣', desc: 'Overloaded by the world', color: '#7B2D8B' },
  { id: 'crumbly', name: 'Crumbly Goblin', emoji: '🔵', desc: 'Tired down to the bones', color: '#2D5A8B' },
  { id: 'pokey', name: 'Pokey Goblin', emoji: '🔴', desc: 'Poked by social friction', color: '#8B2D2D' },
  { id: 'lost', name: 'Lost Goblin', emoji: '🟢', desc: 'Drifting without direction', color: '#2D8B5A' },
];

const rituals = {
  sticky: [
    { title: 'Shake It Off Literally', steps: ['Stand up. Shake both hands for 10 seconds.', 'Say out loud: "Not mine anymore."', 'Drink a full glass of water slowly.'], duration: '90 sec', icon: '🫳' },
    { title: 'The Grudge Drawer', steps: ['Write the thing on a scrap of paper.', 'Fold it up very small.', 'Put it in a physical drawer and close it hard.'], duration: '2 min', icon: '📥' },
  ],
  hungry: [
    { title: 'Emergency Snack Protocol', steps: ['Identify: is it blood sugar or loneliness hunger?', 'Eat something with protein in the next 5 minutes.', 'Set a timer for 20 min before making any decisions.'], duration: '5 min', icon: '🥜' },
    { title: 'Glass of Water First', steps: ['Drink a full glass of water.', 'Wait 3 minutes.', 'Reassess — 40% of hunger is thirst.'], duration: '3 min', icon: '💧' },
  ],
  overstim: [
    { title: 'Sensory Reset', steps: ['Find the quietest room you can.', 'Sit with your eyes closed for 60 seconds.', 'Breathe in for 4, hold for 2, out for 6.'], duration: '90 sec', icon: '🔇' },
    { title: 'Evict the Brain Pigeon', steps: ['Name the last 5 things you heard today.', 'Slowly breathe out each one.', 'Put your phone face-down for 10 minutes.'], duration: '2 min', icon: '🕊️' },
  ],
  crumbly: [
    { title: 'Power Crumble Reset', steps: ['Lie flat on the floor for exactly 3 minutes.', 'One thing you will NOT do today — decide it now.', 'Set a boundary before standing back up.'], duration: '3 min', icon: '🛏️' },
    { title: 'The Snack + Boundary', steps: ['Eat something. Right now. Anything.', 'Text one person: "I\'m low energy today."', 'Cancel or reschedule one non-urgent task.'], duration: '5 min', icon: '🍫' },
  ],
  pokey: [
    { title: 'Reset the Haunted Desk', steps: ['Clear one surface of your space completely.', 'Rearrange 3 objects intentionally.', 'Light a candle or open a window.'], duration: '3 min', icon: '🪔' },
    { title: 'One Clarifying Text', steps: ['Identify the friction point with one person.', 'Write a draft text that starts with "I noticed..."', 'Send it or delete it — both are valid.'], duration: '5 min', icon: '💬' },
  ],
  lost: [
    { title: 'The 12-Minute Escape', steps: ['Set a timer for 12 minutes.', 'Pick ONE tiny task. Ignore everything else.', 'When timer ends, stop regardless.'], duration: '12 min', icon: '⏱️' },
    { title: 'Stand in a Doorway', steps: ['Find a doorway. Stand in it for 30 seconds.', 'You are literally between states.', 'Choose one direction and step through.'], duration: '1 min', icon: '🚪' },
  ],
};

const almanacData = [
  { day: 'Mon', time: '9am', goblin: 'overstim', emoji: '🟣', label: 'Buzzy' },
  { day: 'Mon', time: '3pm', goblin: 'crumbly', emoji: '🔵', label: 'Crumbly' },
  { day: 'Tue', time: '2pm', goblin: 'lost', emoji: '🟢', label: 'Lost' },
  { day: 'Tue', time: '5pm', goblin: 'sticky', emoji: '🟠', label: 'Sticky' },
  { day: 'Wed', time: '10am', goblin: 'hungry', emoji: '🟡', label: 'Hungry' },
  { day: 'Wed', time: '4pm', goblin: 'crumbly', emoji: '🔵', label: 'Crumbly' },
  { day: 'Thu', time: '9am', goblin: 'overstim', emoji: '🟣', label: 'Buzzy' },
  { day: 'Thu', time: '2pm', goblin: 'pokey', emoji: '🔴', label: 'Pokey' },
  { day: 'Fri', time: '3pm', goblin: 'crumbly', emoji: '🔵', label: 'Crumbly' },
  { day: 'Fri', time: '6pm', goblin: 'sticky', emoji: '🟠', label: 'Sticky' },
];

const socialScripts = [
  {
    situation: 'Cancel plans gently',
    goblin: 'crumbly',
    script: "Hey, I'm really sorry but I need to bail tonight. I'm running on empty and I'd be terrible company. Can we reschedule? I really do want to see you — just not like this. 💙",
    tag: 'Low energy'
  },
  {
    situation: 'Ask for space',
    goblin: 'overstim',
    script: "I need some quiet time today — not because of you, just because my brain is very full. I'll be better company tomorrow. Thank you for understanding. 🤍",
    tag: 'Overstimulated'
  },
  {
    situation: 'Delay a response',
    goblin: 'lost',
    script: "Got your message — I want to give it the attention it deserves. Let me come back to you when I'm thinking more clearly, probably [time]. Not ignoring you! 💚",
    tag: 'Needs clarity'
  },
  {
    situation: 'Defuse tension',
    goblin: 'pokey',
    script: "I think I came across wrong earlier and I don't want that to fester. Can we do a quick reset? I'm not upset with you — I was just in a mood. 🧡",
    tag: 'Social friction'
  },
];

const questions = [
  {
    id: 'q1',
    text: 'Your bad mood walks into the room. What does it look like?',
    options: [
      { text: 'A storm cloud that keeps bumping into things', goblin: 'sticky' },
      { text: 'A very small, very tired animal', goblin: 'crumbly' },
      { text: 'A loud radio playing three stations at once', goblin: 'overstim' },
      { text: 'A person who lost their keys somewhere', goblin: 'lost' },
    ]
  },
  {
    id: 'q2',
    text: 'If your irritation had a physical texture right now, it would be:',
    options: [
      { text: 'Sandpaper — rough and catching on everything', goblin: 'pokey' },
      { text: 'Wet wool — heavy, uncomfortable, clingy', goblin: 'sticky' },
      { text: 'Static electricity — jumpy and sharp', goblin: 'overstim' },
      { text: 'Crumbled crackers — falling apart under pressure', goblin: 'crumbly' },
    ]
  },
  {
    id: 'q3',
    text: 'When did you last eat something that actually counted?',
    options: [
      { text: 'Recently. Food is not the problem here.', goblin: null },
      { text: 'Hmm... earlier? Maybe?', goblin: 'hungry' },
      { text: 'I genuinely cannot remember', goblin: 'hungry' },
      { text: 'I had coffee. That counts.', goblin: 'hungry' },
    ]
  },
  {
    id: 'q4',
    text: 'Your mood has a villain origin story. What is it?',
    options: [
      { text: 'Something someone said (or didn\'t say)', goblin: 'pokey' },
      { text: 'Too many things asking for my attention', goblin: 'overstim' },
      { text: 'A thing from yesterday that I didn\'t finish', goblin: 'sticky' },
      { text: 'Honestly no idea. That\'s the problem.', goblin: 'lost' },
    ]
  },
];

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [detectedGoblin, setDetectedGoblin] = useState(null);
  const [checkinPhase, setCheckinPhase] = useState('intro'); // intro, questions, result, ritual
  const [selectedRitual, setSelectedRitual] = useState(null);
  const [ritualStep, setRitualStep] = useState(0);
  const [ritualActive, setRitualActive] = useState(false);
  const [ritualTimer, setRitualTimer] = useState(0);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [selectedScript, setSelectedScript] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const timerRef = useRef(null);

  const t = themes[theme];

  // Load font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
  }, []);

  // Ritual timer
  useEffect(() => {
    if (ritualActive && ritualTimer > 0) {
      timerRef.current = setTimeout(() => setRitualTimer(t => t - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [ritualActive, ritualTimer]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option.goblin];
    setAnswers(newAnswers);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // Tally votes
      const counts = {};
      newAnswers.forEach(g => { if (g) counts[g] = (counts[g] || 0) + 1; });
      const topGoblin = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'lost';
      setDetectedGoblin(topGoblin);
      setCheckinPhase('result');
    }
  };

  const resetCheckin = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setDetectedGoblin(null);
    setCheckinPhase('intro');
    setSelectedRitual(null);
    setRitualStep(0);
    setRitualActive(false);
    setRitualTimer(0);
  };

  const startRitual = (ritual) => {
    setSelectedRitual(ritual);
    setRitualStep(0);
    setRitualActive(false);
    const seconds = ritual.duration.includes('90') ? 90 : ritual.duration.includes('12') ? 720 : ritual.duration.includes('5') ? 300 : ritual.duration.includes('3') ? 180 : 60;
    setRitualTimer(seconds);
    setCheckinPhase('ritual');
  };

  const goblin = detectedGoblin ? goblinTypes.find(g => g.id === detectedGoblin) : null;
  const goblinRituals = detectedGoblin ? rituals[detectedGoblin] : [];

  const press = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.12s ease',
    cursor: 'pointer',
  });

  // Pattern frequency for almanac
  const goblinFreq = {};
  almanacData.forEach(d => { goblinFreq[d.goblin] = (goblinFreq[d.goblin] || 0) + 1; });
  const topPattern = Object.entries(goblinFreq).sort((a, b) => b[1] - a[1])[0];

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const s = {
    phone: {
      width: 375, height: 812,
      background: t.bg,
      borderRadius: 44,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Sora', sans-serif",
      boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.15)',
      display: 'flex', flexDirection: 'column',
    },
    statusBar: {
      height: 44,
      background: t.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0,
    },
    dynamicIsland: {
      width: 120, height: 32,
      background: '#000',
      borderRadius: 20,
      position: 'absolute', top: 8, left: '50%',
      transform: 'translateX(-50%)',
    },
    scroll: {
      flex: 1, overflowY: 'auto',
      padding: '0 0 8px 0',
    },
    navBar: {
      height: 72,
      background: t.navBg,
      borderTop: `1px solid ${t.divider}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 8px 8px',
      flexShrink: 0,
    },
    navItem: (active) => ({
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '6px 12px', borderRadius: 12,
      background: active ? `${t.primary}18` : 'transparent',
      cursor: 'pointer',
    }),
    navLabel: (active) => ({
      fontSize: 10, fontWeight: active ? 600 : 400,
      color: active ? t.primary : t.textMuted,
    }),
    header: {
      padding: '20px 20px 12px',
      background: t.surface,
    },
    card: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 16, padding: 16, marginBottom: 12,
    },
    primaryBtn: {
      background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
      color: '#fff', border: 'none',
      borderRadius: 14, padding: '14px 24px',
      fontSize: 15, fontWeight: 600,
      width: '100%', cursor: 'pointer',
      boxShadow: `0 4px 20px ${t.primary}40`,
    },
    tag: {
      background: t.tag, color: t.tagText,
      borderRadius: 20, padding: '3px 10px',
      fontSize: 11, fontWeight: 600,
      display: 'inline-block',
    },
  };

  const NavIcon = ({ tab, emoji, label }) => {
    const active = activeTab === tab;
    return (
      <div style={s.navItem(active)} onClick={() => { press('nav-' + tab); setActiveTab(tab); }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span style={s.navLabel(active)}>{label}</span>
      </div>
    );
  };

  const renderHome = () => (
    <div style={s.scroll}>
      {/* Hero */}
      <div style={{ ...s.header, paddingBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>Sunday, Mar 22</p>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: '4px 0 2px' }}>
              Hey there 👋
            </h1>
            <p style={{ fontSize: 14, color: t.textSecondary, margin: 0 }}>
              How's your goblin today?
            </p>
          </div>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}22)`,
            border: `2px solid ${t.primary}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>🫙</div>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Quick check-in CTA */}
        <div style={{
          background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
          borderRadius: 20, padding: 20, marginBottom: 16,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 80, opacity: 0.15 }}>🫙</div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 1 }}>Daily Check-in</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
            Feeling off?<br />Let's find your goblin.
          </p>
          <div
            style={btnStyle('checkin-start', {
              background: '#fff', color: t.primary,
              borderRadius: 12, padding: '10px 20px',
              fontSize: 14, fontWeight: 700,
              display: 'inline-block', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            })}
            onClick={() => { press('checkin-start'); setActiveTab('checkin'); setCheckinPhase('intro'); }}
          >
            Start Check-in →
          </div>
        </div>

        {/* Last goblin caught */}
        <div style={s.card}>
          <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Last Caught</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: `${goblinTypes[2].color}22`,
              border: `2px solid ${goblinTypes[2].color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>🟣</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Buzzy Goblin</p>
              <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>Yesterday at 4:30pm · Overstimulated</p>
            </div>
            <span style={s.tag}>Tamed</span>
          </div>
          <div style={{ height: 1, background: t.divider, margin: '12px 0' }} />
          <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>
            Ritual used: <span style={{ fontWeight: 600, color: t.primary }}>Evict the Brain Pigeon</span>
          </p>
        </div>

        {/* Quick rituals row */}
        <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '8px 0 10px' }}>Quick Rituals</p>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Brain Pigeon', emoji: '🕊️', dur: '2 min', color: t.accent },
            { label: 'Snack + Boundary', emoji: '🍫', dur: '5 min', color: '#2D8B5A' },
            { label: '12-Min Escape', emoji: '⏱️', dur: '12 min', color: '#2D5A8B' },
            { label: 'Grudge Drawer', emoji: '📥', dur: '2 min', color: '#8B3D1A' },
          ].map((r, i) => (
            <div key={i} style={{
              background: t.card, border: `1px solid ${t.cardBorder}`,
              borderRadius: 14, padding: '12px 14px', flexShrink: 0, minWidth: 120,
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{r.emoji}</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text, margin: '0 0 2px' }}>{r.label}</p>
              <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>{r.dur}</p>
            </div>
          ))}
        </div>

        {/* Weekly pattern peek */}
        <div style={{ ...s.card, marginTop: 16 }}>
          <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.8 }}>This Week's Pattern</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>🔵</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Crumbly Goblin strikes most</p>
              <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>3× this week, often afternoons</p>
            </div>
          </div>
          <div
            style={{ ...btnStyle('view-almanac'), marginTop: 12, textAlign: 'center', padding: '8px', borderRadius: 10, background: t.goblinBg, cursor: 'pointer' }}
            onClick={() => { press('view-almanac'); setActiveTab('almanac'); }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: t.primary }}>View Goblin Almanac →</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCheckin = () => {
    if (checkinPhase === 'intro') return (
      <div style={s.scroll}>
        <div style={{ padding: '40px 24px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🫙</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.text, margin: '0 0 12px' }}>
            Something's up.
          </h2>
          <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.6, margin: '0 0 32px' }}>
            Let's figure out which goblin is responsible. Answer 4 weird questions. Get a tiny action plan.
          </p>
          <div style={{ textAlign: 'left', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 16, marginBottom: 24 }}>
            {['Takes about 60 seconds', 'No wrong answers. Seriously.', 'Ends with something actually doable'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: i < 2 ? 10 : 0 }}>
                <span style={{ color: t.success, fontSize: 16 }}>✓</span>
                <p style={{ fontSize: 14, color: t.text, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
          <button
            style={btnStyle('start-q', s.primaryBtn)}
            onClick={() => { press('start-q'); setCheckinPhase('questions'); setQuestionIndex(0); setAnswers([]); }}
          >
            Find My Goblin
          </button>
        </div>
      </div>
    );

    if (checkinPhase === 'questions') {
      const q = questions[questionIndex];
      const progress = (questionIndex / questions.length) * 100;
      return (
        <div style={s.scroll}>
          <div style={{ padding: '20px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: t.textMuted }}>Question {questionIndex + 1} of {questions.length}</span>
              <div
                style={{ fontSize: 13, color: t.textSecondary, cursor: 'pointer' }}
                onClick={resetCheckin}
              >Cancel</div>
            </div>
            <div style={{ height: 4, background: t.divider, borderRadius: 4, marginBottom: 24 }}>
              <div style={{ height: '100%', width: `${progress}%`, background: t.primary, borderRadius: 4, transition: 'width 0.3s ease' }} />
            </div>
          </div>
          <div style={{ padding: '0 20px 24px' }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.4, marginBottom: 24 }}>
              {q.text}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => (
                <div
                  key={i}
                  style={btnStyle(`q-opt-${i}`, {
                    background: t.card, border: `1.5px solid ${t.cardBorder}`,
                    borderRadius: 14, padding: '14px 16px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                  })}
                  onClick={() => { press(`q-opt-${i}`); handleAnswer(opt); }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `${t.primary}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: t.primary,
                    flexShrink: 0,
                  }}>{String.fromCharCode(65 + i)}</div>
                  <p style={{ fontSize: 14, color: t.text, margin: 0, lineHeight: 1.4 }}>{opt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (checkinPhase === 'result' && goblin) return (
      <div style={s.scroll}>
        <div style={{ padding: '24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              width: 100, height: 100, borderRadius: 28,
              background: `${goblin.color}22`, border: `3px solid ${goblin.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 56, margin: '0 auto 16px',
            }}>{goblin.emoji}</div>
            <p style={{ fontSize: 13, color: t.textMuted, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>You've got a</p>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: '0 0 8px' }}>{goblin.name}</h2>
            <p style={{ fontSize: 15, color: t.textSecondary }}>{goblin.desc}</p>
          </div>

          <div style={{ ...s.card, marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.8 }}>What this means</p>
            <p style={{ fontSize: 14, color: t.text, lineHeight: 1.6, margin: 0 }}>
              {detectedGoblin === 'overstim' && 'Your nervous system has taken in too much. You need input reduction, not more stimulation. Time to find some quiet.'}
              {detectedGoblin === 'crumbly' && 'You\'re running on empty — energy, fuel, or patience. This isn\'t a character flaw; it\'s a resource issue. Feed and rest the goblin.'}
              {detectedGoblin === 'sticky' && 'Something from earlier is still stuck to you. You\'re carrying residue from a past event into the present moment. Time to unstick.'}
              {detectedGoblin === 'hungry' && 'Basic biological needs are being overlooked. The goblin is almost always less philosophical than it seems. Start with the body.'}
              {detectedGoblin === 'pokey' && 'Social friction is snagging your attention. There\'s an unresolved interpersonal thing draining bandwidth in the background.'}
              {detectedGoblin === 'lost' && 'Direction has gone fuzzy. You\'re between states with no clear next step, which creates an anxious static. You need one small anchor.'}
            </p>
          </div>

          <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 12px' }}>Pick a ritual:</p>
          {goblinRituals.map((ritual, i) => (
            <div
              key={i}
              style={btnStyle(`ritual-${i}`, {
                ...s.card, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                border: `1.5px solid ${t.cardBorder}`,
              })}
              onClick={() => { press(`ritual-${i}`); startRitual(ritual); }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${goblin.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>{ritual.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>{ritual.title}</p>
                <p style={{ fontSize: 12, color: t.textMuted, margin: 0 }}>{ritual.duration} · {ritual.steps.length} steps</p>
              </div>
              <span style={{ fontSize: 18, color: t.textMuted }}>›</span>
            </div>
          ))}

          <div
            style={{ ...btnStyle('try-again'), textAlign: 'center', padding: '12px', cursor: 'pointer', marginTop: 8 }}
            onClick={() => { press('try-again'); resetCheckin(); }}
          >
            <span style={{ fontSize: 13, color: t.textMuted }}>Try again</span>
          </div>
        </div>
      </div>
    );

    if (checkinPhase === 'ritual' && selectedRitual) {
      const done = ritualStep >= selectedRitual.steps.length;
      return (
        <div style={s.scroll}>
          <div style={{ padding: '20px 20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontSize: 22 }}>{selectedRitual.icon}</div>
              <div style={{
                background: t.card, borderRadius: 20, padding: '6px 14px',
                fontSize: 13, fontWeight: 600, color: t.primary,
              }}>{fmtTime(ritualTimer)}</div>
              <div
                style={{ fontSize: 13, color: t.textMuted, cursor: 'pointer' }}
                onClick={() => { setCheckinPhase('result'); setSelectedRitual(null); }}
              >← Back</div>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 6px' }}>{selectedRitual.title}</h2>
            <p style={{ fontSize: 13, color: t.textMuted, margin: '0 0 24px' }}>Duration: {selectedRitual.duration}</p>

            {selectedRitual.steps.map((step, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: i < ritualStep ? t.success : i === ritualStep ? t.primary : t.divider,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#fff',
                  transition: 'background 0.3s ease',
                }}>
                  {i < ritualStep ? '✓' : i + 1}
                </div>
                <div style={{ ...s.card, flex: 1, marginBottom: 0, opacity: i > ritualStep ? 0.5 : 1 }}>
                  <p style={{ fontSize: 14, color: t.text, margin: 0, lineHeight: 1.5 }}>{step}</p>
                </div>
              </div>
            ))}

            {!done ? (
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  style={btnStyle('ritual-timer', {
                    ...s.primaryBtn, flex: 1,
                    background: ritualActive ? t.card : `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
                    color: ritualActive ? t.text : '#fff',
                    border: `1px solid ${t.cardBorder}`,
                  })}
                  onClick={() => { press('ritual-timer'); setRitualActive(!ritualActive); }}
                >
                  {ritualActive ? '⏸ Pause' : '▶ Start Timer'}
                </button>
                <button
                  style={btnStyle('ritual-next', {
                    ...s.primaryBtn, flex: 1,
                    background: `${t.success}22`,
                    color: t.success,
                    boxShadow: 'none',
                  })}
                  onClick={() => { press('ritual-next'); setRitualStep(s => s + 1); }}
                >
                  Done ✓
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>🌿</div>
                <p style={{ fontSize: 18, fontWeight: 700, color: t.text, margin: '0 0 8px' }}>Goblin tamed!</p>
                <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 20px' }}>Ritual complete. Check in again anytime.</p>
                <button
                  style={s.primaryBtn}
                  onClick={resetCheckin}
                >Back to Home</button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderAlmanac = () => (
    <div style={s.scroll}>
      <div style={s.header}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' }}>Goblin Almanac</h2>
        <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>Your emotional weather patterns</p>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {/* Top pattern */}
        <div style={{
          background: `linear-gradient(135deg, ${t.primary}18, ${t.accent}12)`,
          border: `1px solid ${t.primary}30`,
          borderRadius: 16, padding: 16, marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, color: t.primary, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>🔍 Pattern Detected</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 4px' }}>
            Crumbly Goblin haunts your afternoons
          </p>
          <p style={{ fontSize: 13, color: t.textSecondary, margin: 0, lineHeight: 1.5 }}>
            3 of your last 5 afternoon check-ins showed low energy. Consider: snack at 2pm, no meetings after 4pm.
          </p>
        </div>

        {/* This week grid */}
        <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 10px' }}>This Week</p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => {
            const dayEntries = almanacData.filter(d => d.day === day);
            return (
              <div key={day} style={{ flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '8px 6px', textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: t.textMuted, margin: '0 0 6px', fontWeight: 600 }}>{day}</p>
                {dayEntries.map((e, i) => (
                  <div key={i} title={e.label} style={{ fontSize: 16, lineHeight: 1.4 }}>{e.emoji}</div>
                ))}
                {dayEntries.length === 0 && <div style={{ height: 16 }} />}
              </div>
            );
          })}
        </div>

        {/* All entries */}
        <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 10px' }}>Recent Entries</p>
        {almanacData.slice().reverse().map((entry, i) => {
          const gInfo = goblinTypes.find(g => g.id === entry.goblin);
          return (
            <div key={i} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${gInfo?.color || t.primary}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                flexShrink: 0,
              }}>{entry.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: '0 0 1px' }}>{gInfo?.name}</p>
                <p style={{ fontSize: 12, color: t.textMuted, margin: 0 }}>{entry.day} · {entry.time}</p>
              </div>
              <span style={s.tag}>{entry.label}</span>
            </div>
          );
        })}

        {/* Goblin breakdown */}
        <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '16px 0 10px' }}>Goblin Frequency</p>
        {Object.entries(goblinFreq).sort((a, b) => b[1] - a[1]).map(([id, count]) => {
          const gInfo = goblinTypes.find(g => g.id === id);
          const pct = (count / almanacData.length) * 100;
          return (
            <div key={id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{gInfo?.emoji} {gInfo?.name}</span>
                <span style={{ fontSize: 12, color: t.textMuted }}>{count}×</span>
              </div>
              <div style={{ height: 6, background: t.divider, borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: gInfo?.color || t.primary, borderRadius: 3, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderScripts = () => (
    <div style={s.scroll}>
      <div style={s.header}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' }}>Social Scripts</h2>
        <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>Words for when you're running low</p>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ ...s.card, background: `${t.accent}12`, border: `1px solid ${t.accent}30`, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: t.text, lineHeight: 1.6, margin: 0 }}>
            💬 When emotions are overloaded, words get hard. These scripts help you protect relationships without burning energy you don't have.
          </p>
        </div>

        {socialScripts.map((script, i) => (
          <div
            key={i}
            style={btnStyle(`script-${i}`, {
              ...s.card, cursor: 'pointer',
              border: selectedScript === i ? `1.5px solid ${t.primary}` : `1px solid ${t.cardBorder}`,
            })}
            onClick={() => { press(`script-${i}`); setSelectedScript(selectedScript === i ? null : i); setCopiedScript(false); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: selectedScript === i ? 12 : 0 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 3px' }}>{script.situation}</p>
                <span style={s.tag}>{script.tag}</span>
              </div>
              <span style={{ fontSize: 18, color: t.textMuted, transform: selectedScript === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
            </div>
            {selectedScript === i && (
              <div>
                <div style={{ background: t.goblinBg, borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <p style={{ fontSize: 14, color: t.text, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                    "{script.script}"
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={btnStyle('copy-script', {
                      flex: 1, background: copiedScript ? t.success : t.primary,
                      color: '#fff', border: 'none', borderRadius: 10, padding: '10px',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      transition: 'background 0.3s',
                    })}
                    onClick={(e) => {
                      e.stopPropagation();
                      press('copy-script');
                      setCopiedScript(true);
                      setTimeout(() => setCopiedScript(false), 2000);
                    }}
                  >
                    {copiedScript ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  <button
                    style={btnStyle('edit-script', {
                      flex: 1, background: t.card, color: t.text,
                      border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: '10px',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    })}
                    onClick={(e) => { e.stopPropagation(); press('edit-script'); }}
                  >
                    ✏️ Adapt
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Goblin-based suggestion */}
        <div style={{ ...s.card, background: `${t.primary}10`, border: `1px solid ${t.primary}25` }}>
          <p style={{ fontSize: 12, color: t.primary, fontWeight: 700, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Based on your last goblin</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: '0 0 4px' }}>You had a Buzzy Goblin</p>
          <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 10px', lineHeight: 1.5 }}>
            Consider sending the "Ask for space" script before your next interaction.
          </p>
          <button style={{ ...s.primaryBtn, padding: '10px' }}>
            Use Suggested Script
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div style={s.scroll}>
      <div style={s.header}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' }}>Settings</h2>
        <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>Tame your goblin, your way</p>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {/* Profile */}
        <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}>🫙</div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Your Goblin Jar</p>
            <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>Member since March 2026</p>
          </div>
        </div>

        {/* Theme toggle */}
        <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>Appearance</p>
        <div style={{ ...s.card, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{theme === 'light' ? '☀️' : '🌙'}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }}>
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </p>
                <p style={{ fontSize: 12, color: t.textMuted, margin: 0 }}>
                  {theme === 'light' ? 'Warm & bright' : 'Easy on the eyes'}
                </p>
              </div>
            </div>
            <div
              style={btnStyle('theme-toggle', {
                width: 52, height: 28, borderRadius: 14,
                background: theme === 'dark' ? t.primary : t.divider,
                position: 'relative', cursor: 'pointer',
                transition: 'background 0.3s',
              })}
              onClick={() => { press('theme-toggle'); setTheme(theme === 'light' ? 'dark' : 'light'); }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: '#fff',
                position: 'absolute', top: 3,
                left: theme === 'dark' ? 27 : 3,
                transition: 'left 0.25s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }} />
            </div>
          </div>
        </div>

        {/* Notification settings */}
        <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>Check-in Schedule</p>
        <div style={{ marginBottom: 20 }}>
          {[
            { label: 'Morning check-in', time: '8:30am', on: true },
            { label: 'Afternoon nudge', time: '2:00pm', on: true },
            { label: 'Evening wind-down', time: '8:00pm', on: false },
          ].map((item, i) => (
            <div key={i} style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: '0 0 2px' }}>{item.label}</p>
                <p style={{ fontSize: 12, color: t.textMuted, margin: 0 }}>{item.time}</p>
              </div>
              <div style={{ width: 44, height: 24, borderRadius: 12, background: item.on ? t.primary : t.divider, position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: item.on ? 23 : 3, transition: 'left 0.25s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Goblin stats */}
        <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>Your Stats</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Goblins caught', value: '24', emoji: '🫙' },
            { label: 'Rituals done', value: '19', emoji: '✨' },
            { label: 'Day streak', value: '7', emoji: '🔥' },
          ].map((stat, i) => (
            <div key={i} style={{ ...s.card, flex: 1, textAlign: 'center', padding: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.emoji}</div>
              <p style={{ fontSize: 20, fontWeight: 800, color: t.primary, margin: '0 0 2px' }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: t.textMuted, margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* App version */}
        <p style={{ fontSize: 12, color: t.textMuted, textAlign: 'center', marginTop: 8 }}>
          Mood Goblin v1.0 · Made with 🫙 and spite
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#e8e0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={s.phone}>
        {/* Status Bar */}
        <div style={s.statusBar}>
          <div style={{ position: 'absolute', ...s.dynamicIsland }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: i < 3 ? t.text : t.textMuted, borderRadius: 1 }} />
              ))}
            </div>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.4C9.8 2.4 11.4 3.1 12.6 4.2L14 2.8C12.4 1.3 10.3 0.4 8 0.4C5.7 0.4 3.6 1.3 2 2.8L3.4 4.2C4.6 3.1 6.2 2.4 8 2.4Z" fill={t.textMuted}/>
              <path d="M8 5.2C9.2 5.2 10.3 5.7 11.1 6.5L12.5 5.1C11.3 3.9 9.7 3.2 8 3.2C6.3 3.2 4.7 3.9 3.5 5.1L4.9 6.5C5.7 5.7 6.8 5.2 8 5.2Z" fill={t.text}/>
              <circle cx="8" cy="9.6" r="1.6" fill={t.text}/>
            </svg>
            <div style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <div style={{ width: 22, height: 11, border: `1.5px solid ${t.text}`, borderRadius: 3, padding: 1, display: 'flex', gap: 1 }}>
                <div style={{ flex: 1, background: t.text, borderRadius: 1 }} />
                <div style={{ flex: 1, background: t.text, borderRadius: 1 }} />
                <div style={{ flex: 1, background: t.textMuted, borderRadius: 1 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content */}
        {activeTab === 'home' && renderHome()}
        {activeTab === 'checkin' && renderCheckin()}
        {activeTab === 'almanac' && renderAlmanac()}
        {activeTab === 'scripts' && renderScripts()}
        {activeTab === 'settings' && renderSettings()}

        {/* Nav Bar */}
        <div style={s.navBar}>
          <NavIcon tab="home" emoji="🏠" label="Home" />
          <NavIcon tab="checkin" emoji="🫙" label="Check-in" />
          <NavIcon tab="almanac" emoji="📖" label="Almanac" />
          <NavIcon tab="scripts" emoji="💬" label="Scripts" />
          <NavIcon tab="settings" emoji="⚙️" label="Settings" />
        </div>
      </div>
    </div>
  );
}
