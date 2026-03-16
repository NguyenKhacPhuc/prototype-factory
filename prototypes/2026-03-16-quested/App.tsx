const { useState, useEffect } = React;

function App() {
  const [tab, setTab] = useState('map');
  const [questStep, setQuestStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [pressed, setPressed] = useState(null);
  const [avatarColor, setAvatarColor] = useState('#7C3AED');
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap';
    document.head.appendChild(link);
    setTimeout(() => setShowNotif(true), 2000);
    setTimeout(() => setShowNotif(false), 5000);
  }, []);

  const c = {
    bg: '#0D0B1E', surface: '#1A1535', surfaceHigh: '#231E45',
    purple: '#7C3AED', purpleLight: '#A78BFA', purpleDark: '#5B21B6',
    gold: '#F59E0B', goldLight: '#FCD34D', green: '#10B981',
    red: '#EF4444', blue: '#3B82F6', pink: '#EC4899',
    text: '#F1F0FF', textSoft: '#C4BBDF', textMuted: '#8B82A7',
    border: '#2D2755', borderLight: '#3D3568',
  };
  const f = { fontFamily: "'Nunito', sans-serif" };

  const questData = [
    { id: 1, title: 'The Ancient Library', subject: 'History', emoji: '📚', xp: 250, progress: 65, difficulty: 'Medium', bg: '#7C3AED', desc: 'Uncover secrets of ancient civilizations in the mystical library of Alexandria.', active: true },
    { id: 2, title: "Dragon's Math Peak", subject: 'Mathematics', emoji: '🐉', xp: 300, progress: 0, difficulty: 'Hard', bg: '#DC2626', desc: 'Solve mathematical puzzles to defeat the dragon guarding the summit.', active: false },
    { id: 3, title: 'Crystal Science Cave', subject: 'Science', emoji: '🔬', xp: 200, progress: 100, difficulty: 'Easy', bg: '#059669', desc: 'Discover the properties of matter in the enchanted crystal caves.', active: false, completed: true },
    { id: 4, title: 'Storm Code Temple', subject: 'Coding', emoji: '⚡', xp: 350, progress: 20, difficulty: 'Hard', bg: '#2563EB', desc: 'Learn the magic of code to unlock the ancient storm temple.', active: false },
  ];

  const storySteps = [
    { scene: 'The Grand Library — Entry Hall', gradient: 'linear-gradient(135deg, #4C1D95, #7C3AED)', icon: '📚', story: 'You enter the magnificent Library of Alexandria. Ancient scrolls line every wall, and the air carries the scent of old parchment and mystery. A robed librarian materializes from the shadows.', npc: 'Wise Librarian Kira', dialogue: '"Ah, a new scholar! To access the forbidden scrolls, you must prove your historical knowledge. Answer wisely, young one!"', question: 'Which ancient civilization is credited with building the Great Pyramids of Giza?', options: ['The Roman Empire', 'Ancient Egypt', 'Ancient Greece', 'The Mesopotamians'], correct: 1, xpReward: 50 },
    { scene: 'The Celestial Scroll Chamber', gradient: 'linear-gradient(135deg, #1E3A8A, #3B82F6)', icon: '📜', story: 'Deeper in the library, you discover a chamber filled with celestial maps and glowing orreries. A ghostly astronomer drifts toward you, pointing at the stars.', npc: 'Ghost Astronomer Ptolemy', dialogue: '"These maps show the heavens as we understood them! But can you tell me — how long does it take for Earth to orbit the Sun?"', question: 'How long does it take for Earth to complete one full orbit around the Sun?', options: ['24 hours', '28 days', '365 days', '100 years'], correct: 2, xpReward: 60 },
    { scene: 'The Hidden Archives', gradient: 'linear-gradient(135deg, #064E3B, #10B981)', icon: '🗝️', story: 'A secret door behind an ancient bookshelf leads you to a hidden archive. A magical chest glows with emerald light. An inscription on the wall poses a final challenge.', npc: 'Ancient Scholar Marcus', dialogue: '"This chest holds treasures of knowledge! Tell me — which philosopher is known as the father of Western philosophy?"', question: 'Which ancient Greek philosopher is often called the father of Western philosophy?', options: ['Aristotle', 'Plato', 'Socrates', 'Pythagoras'], correct: 2, xpReward: 75 },
  ];

  const currentStep = storySteps[questStep % storySteps.length];

  const handleAnswer = (idx) => { if (answered) return; setSelectedAnswer(idx); setAnswered(true); };
  const nextStep = () => { setQuestStep(q => q + 1); setSelectedAnswer(null); setAnswered(false); };

  const ansStyle = (idx) => {
    const base = { borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s', ...f };
    if (!answered) return { ...base, background: c.surfaceHigh, border: `1.5px solid ${c.border}`, color: c.text, transform: pressed === `ans-${idx}` ? 'scale(0.97)' : 'scale(1)' };
    if (idx === currentStep.correct) return { ...base, background: 'rgba(16,185,129,0.18)', border: `1.5px solid ${c.green}`, color: c.text };
    if (idx === selectedAnswer) return { ...base, background: 'rgba(239,68,68,0.18)', border: `1.5px solid ${c.red}`, color: c.text };
    return { ...base, background: c.surfaceHigh, border: `1.5px solid ${c.border}`, color: c.textMuted };
  };

  const leaderboard = [
    { rank: 1, name: 'Emma W.', avatar: '🧙‍♀️', xp: 5240, level: 18, streak: 14, medal: '👑' },
    { rank: 2, name: 'Jake M.', avatar: '⚔️', xp: 4890, level: 17, streak: 9, medal: '🥈' },
    { rank: 3, name: 'You', avatar: '🧝', xp: 2340, level: 12, streak: 7, medal: '🥉', isUser: true },
    { rank: 4, name: 'Sofia L.', avatar: '🔮', xp: 2100, level: 11, streak: 5, medal: null },
    { rank: 5, name: 'Aiden T.', avatar: '🛡️', xp: 1850, level: 10, streak: 3, medal: null },
    { rank: 6, name: 'Priya K.', avatar: '📖', xp: 1620, level: 9, streak: 2, medal: null },
  ];

  const achievements = [
    { icon: '🔥', name: 'Week Warrior', desc: '7-day streak', earned: true },
    { icon: '📚', name: 'Scholar', desc: 'Complete 5 quests', earned: true },
    { icon: '⚡', name: 'Quick Learner', desc: 'Answer in <5s', earned: true },
    { icon: '🌟', name: 'Perfect Score', desc: 'All correct in quest', earned: false },
    { icon: '🤝', name: 'Team Player', desc: 'Join a study party', earned: false },
    { icon: '🐉', name: 'Dragon Slayer', desc: 'Complete hard quest', earned: false },
  ];

  const subjects = [
    { name: 'Science', icon: '🔬', progress: 88, color: c.green, xp: 1020 },
    { name: 'History', icon: '📜', progress: 72, color: c.purple, xp: 840 },
    { name: 'Mathematics', icon: '🔢', progress: 45, color: c.gold, xp: 520 },
    { name: 'Coding', icon: '💻', progress: 30, color: c.blue, xp: 380 },
  ];

  const renderMap = () => (
    <div style={{ ...f, flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '14px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 700 }}>Welcome back,</div>
          <div style={{ fontSize: 19, fontWeight: 900, color: c.text }}>Aria Stormblade 🧝</div>
        </div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 15 }}>⚡</span>
          <span style={{ fontWeight: 900, color: c.gold, fontSize: 14 }}>2,340 XP</span>
        </div>
      </div>
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ background: c.surface, borderRadius: 12, padding: '10px 14px', border: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: c.textMuted, fontWeight: 700 }}>Level 12 → 13</span>
            <span style={{ fontSize: 11, color: c.gold, fontWeight: 800 }}>2,340 / 3,000 XP</span>
          </div>
          <div style={{ background: c.surfaceHigh, borderRadius: 6, height: 8, overflow: 'hidden' }}>
            <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, ${c.purple}, ${c.gold})`, borderRadius: 6 }} />
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ background: 'linear-gradient(135deg, #4C1D95, #7C3AED)', borderRadius: 16, padding: '16px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transform: pressed === 'aq' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s', border: '1px solid rgba(167,139,250,0.3)' }} onMouseDown={() => setPressed('aq')} onMouseUp={() => { setPressed(null); setTab('quest'); }}>
          <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 90, opacity: 0.12 }}>📚</div>
          <div style={{ fontSize: 10, color: '#A78BFA', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>▶ Active Quest</div>
          <div style={{ fontSize: 17, fontWeight: 900, color: c.text, marginBottom: 4 }}>The Ancient Library</div>
          <div style={{ fontSize: 12, color: 'rgba(241,240,255,0.65)', marginBottom: 10 }}>Uncover secrets of ancient civilizations...</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: 5, height: 6 }}>
              <div style={{ width: '65%', height: '100%', background: c.gold, borderRadius: 5 }} />
            </div>
            <span style={{ fontSize: 11, color: c.gold, fontWeight: 800 }}>65%</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: '5px 12px' }}>
            <span style={{ fontSize: 13, color: c.text, fontWeight: 800 }}>Continue Quest →</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>Quest Board</div>
        {questData.slice(1).map((q) => (
          <div key={q.id} style={{ background: c.surface, borderRadius: 14, padding: '12px', border: `1px solid ${q.completed ? c.green + '40' : c.border}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, cursor: 'pointer', transform: pressed === `q${q.id}` ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s' }} onMouseDown={() => setPressed(`q${q.id}`)} onMouseUp={() => setPressed(null)}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(135deg, ${q.bg}90, ${q.bg})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{q.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 145 }}>{q.title}</div>
                {q.completed && <span style={{ fontSize: 13 }}>✅</span>}
              </div>
              <div style={{ fontSize: 10, color: c.textMuted, marginBottom: 5, fontWeight: 700 }}>{q.subject} · {q.difficulty}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, background: c.surfaceHigh, borderRadius: 4, height: 4 }}>
                  <div style={{ width: `${q.progress}%`, height: '100%', background: q.completed ? c.green : q.bg, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 10, color: c.gold, fontWeight: 800 }}>+{q.xp} XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>Daily Challenges 🌟</div>
        {[
          { task: 'Answer 5 questions correctly', progress: 3, total: 5, reward: '+50 XP', icon: '❓', done: false },
          { task: 'Complete a quest chapter', progress: 0, total: 1, reward: '+100 XP', icon: '📖', done: false },
          { task: 'Help a classmate', progress: 1, total: 1, reward: 'Done!', icon: '🤝', done: true },
        ].map((ch, i) => (
          <div key={i} style={{ background: c.surface, borderRadius: 12, padding: '10px 12px', marginBottom: 8, border: `1px solid ${ch.done ? c.green + '35' : c.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 20, width: 30, textAlign: 'center' }}>{ch.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: ch.done ? c.green : c.text, marginBottom: ch.done ? 0 : 4 }}>{ch.task}</div>
              {!ch.done && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ flex: 1, background: c.surfaceHigh, borderRadius: 3, height: 4 }}><div style={{ width: `${(ch.progress / ch.total) * 100}%`, height: '100%', background: c.purple, borderRadius: 3 }} /></div><span style={{ fontSize: 10, color: c.textMuted, fontWeight: 700 }}>{ch.progress}/{ch.total}</span></div>}
            </div>
            <div style={{ background: ch.done ? `${c.green}20` : `${c.gold}20`, border: `1px solid ${ch.done ? c.green : c.gold}40`, borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 800, color: ch.done ? c.green : c.gold }}>{ch.reward}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuest = () => (
    <div style={{ ...f, flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ margin: '12px 16px', borderRadius: 16, overflow: 'hidden', background: currentStep.gradient, padding: '18px 16px 14px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', fontSize: 78, opacity: 0.15 }}>{currentStep.icon}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>Chapter {(questStep % storySteps.length) + 1} of {storySteps.length}</div>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 12 }}>{currentStep.scene}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {storySteps.map((_, i) => (
            <div key={i} style={{ height: 4, flex: 1, borderRadius: 3, background: i <= questStep % storySteps.length ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px', marginBottom: 12 }}>
        <div style={{ background: c.surface, borderRadius: 12, padding: '12px 14px', border: `1px solid ${c.border}`, fontSize: 13, color: c.textSoft, lineHeight: 1.65, fontWeight: 600 }}>{currentStep.story}</div>
      </div>
      <div style={{ padding: '0 16px', marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg, ${c.purple}, ${c.purpleLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${c.purpleLight}` }}>🧙‍♂️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: c.purpleLight, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{currentStep.npc}</div>
            <div style={{ background: c.surfaceHigh, borderRadius: '4px 12px 12px 12px', padding: '10px 12px', fontSize: 13, color: c.text, fontWeight: 600, lineHeight: 1.5, border: `1px solid ${c.borderLight}`, fontStyle: 'italic' }}>{currentStep.dialogue}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px', marginBottom: 12 }}>
        <div style={{ background: `${c.purple}15`, border: `1px solid ${c.purple}45`, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 10, color: c.purpleLight, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>❓ Knowledge Challenge · +{currentStep.xpReward} XP</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: c.text, lineHeight: 1.45 }}>{currentStep.question}</div>
        </div>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {currentStep.options.map((opt, idx) => (
          <div key={idx} style={ansStyle(idx)} onMouseDown={() => { if (!answered) setPressed(`ans-${idx}`); }} onMouseUp={() => { setPressed(null); handleAnswer(idx); }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: answered && idx === currentStep.correct ? `${c.green}30` : answered && idx === selectedAnswer ? `${c.red}30` : `${c.border}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: c.textSoft }}>
              {answered && idx === currentStep.correct ? '✓' : answered && idx === selectedAnswer && idx !== currentStep.correct ? '✗' : String.fromCharCode(65 + idx)}
            </div>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{opt}</span>
          </div>
        ))}
      </div>
      {answered && (
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ background: selectedAnswer === currentStep.correct ? `${c.green}15` : `${c.red}12`, border: `1px solid ${selectedAnswer === currentStep.correct ? c.green : c.red}40`, borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: selectedAnswer === currentStep.correct ? c.green : c.red, marginBottom: 3 }}>
              {selectedAnswer === currentStep.correct ? `⚡ Brilliant! +${currentStep.xpReward} XP earned!` : '❌ Not quite — keep going!'}
            </div>
            <div style={{ fontSize: 12, color: c.textSoft, lineHeight: 1.5 }}>
              {selectedAnswer === currentStep.correct ? `"${currentStep.options[currentStep.correct]}" is correct! Great historical knowledge!` : `The correct answer was "${currentStep.options[currentStep.correct]}". Study this and try the next chapter!`}
            </div>
          </div>
          <div style={{ background: `linear-gradient(90deg, ${c.purpleDark}, ${c.purple})`, borderRadius: 12, padding: '13px', textAlign: 'center', color: c.text, fontWeight: 900, fontSize: 15, cursor: 'pointer', transform: pressed === 'next' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s', ...f }} onMouseDown={() => setPressed('next')} onMouseUp={() => { setPressed(null); nextStep(); }}>
            Next Chapter →
          </div>
        </div>
      )}
    </div>
  );

  const renderHero = () => (
    <div style={{ ...f, flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '16px 16px 12px', textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: 28, margin: '0 auto 12px', background: `linear-gradient(135deg, ${avatarColor}BB, ${avatarColor})`, border: `3px solid ${c.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, boxShadow: `0 8px 32px ${avatarColor}50` }}>🧝</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text }}>Aria Stormblade</div>
        <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 700, marginBottom: 8 }}>Level 12 · Time Mage · Class of 2026</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${c.gold}20`, borderRadius: 20, padding: '4px 14px', border: `1px solid ${c.gold}35` }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: c.gold }}>2,340 Total XP</span>
        </div>
      </div>
      <div style={{ padding: '0 16px 14px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Class Aura</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {['#7C3AED', '#DC2626', '#059669', '#2563EB', '#D97706', '#DB2777'].map(clr => (
            <div key={clr} style={{ width: 30, height: 30, borderRadius: 9, background: clr, cursor: 'pointer', border: `2.5px solid ${avatarColor === clr ? '#fff' : 'transparent'}`, transform: pressed === clr ? 'scale(0.88)' : 'scale(1)', transition: 'all 0.15s' }} onMouseDown={() => setPressed(clr)} onMouseUp={() => { setPressed(null); setAvatarColor(clr); }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>⚔️ Character Stats</div>
        {[
          { stat: 'Intelligence', val: 78, icon: '🧠', color: c.purple },
          { stat: 'Wisdom', val: 65, icon: '📜', color: c.gold },
          { stat: 'Speed', val: 52, icon: '⚡', color: c.blue },
          { stat: 'Creativity', val: 88, icon: '✨', color: c.pink },
        ].map(({ stat, val, icon, color }) => (
          <div key={stat} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 14 }}>{icon}</span><span style={{ fontSize: 13, fontWeight: 700, color: c.textSoft }}>{stat}</span></div>
              <span style={{ fontSize: 13, fontWeight: 900, color }}>{val}/100</span>
            </div>
            <div style={{ background: c.surfaceHigh, borderRadius: 6, height: 8 }}>
              <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: 6 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>🏅 Achievements</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {achievements.map((ach, i) => (
            <div key={i} style={{ background: ach.earned ? `${c.gold}10` : c.surface, border: `1px solid ${ach.earned ? c.gold + '35' : c.border}`, borderRadius: 12, padding: '10px 12px', opacity: ach.earned ? 1 : 0.45 }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{ach.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: ach.earned ? c.text : c.textMuted }}>{ach.name}</div>
              <div style={{ fontSize: 10, color: c.textMuted }}>{ach.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeague = () => (
    <div style={{ ...f, flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '14px 16px 12px' }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text }}>Weekly League 🏆</div>
        <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 700 }}>Resets in 3 days · 21 hrs</div>
      </div>
      <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'flex-end', gap: 6, height: 155 }}>
        {[
          { player: leaderboard[1], pos: 2, height: 105, medalBg: `${c.textMuted}20`, medBorder: c.textMuted },
          { player: leaderboard[0], pos: 1, height: 135, medalBg: `${c.gold}20`, medBorder: c.gold },
          { player: leaderboard[2], pos: 3, height: 85, medalBg: 'rgba(180,120,60,0.18)', medBorder: '#B87333' },
        ].map(({ player, pos, height, medalBg, medBorder }) => (
          <div key={pos} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div style={{ fontSize: 26, marginBottom: 3 }}>{player.avatar}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: player.isUser ? c.purpleLight : c.text, marginBottom: 4, textAlign: 'center' }}>{player.name}</div>
            <div style={{ width: '100%', height, background: medalBg, border: `1px solid ${medBorder}50`, borderRadius: '8px 8px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <div style={{ fontSize: pos === 1 ? 22 : 16 }}>{pos === 1 ? '👑' : pos === 2 ? '🥈' : '🥉'}</div>
              <div style={{ fontSize: 10, color: c.textMuted, fontWeight: 800 }}>{player.xp.toLocaleString()} XP</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>All Scholars</div>
        {leaderboard.map((player, i) => (
          <div key={i} style={{ background: player.isUser ? `${c.purple}18` : c.surface, border: `1px solid ${player.isUser ? c.purple + '45' : c.border}`, borderRadius: 12, padding: '10px 12px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, textAlign: 'center', fontSize: 14, fontWeight: 900, color: i < 3 ? [c.gold, c.textSoft, '#CD7F32'][i] : c.textMuted }}>{player.medal || `#${player.rank}`}</div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: player.isUser ? `linear-gradient(135deg, ${c.purple}, ${c.purpleLight})` : c.surfaceHigh, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `1px solid ${player.isUser ? c.purpleLight : c.border}` }}>{player.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: player.isUser ? c.purpleLight : c.text }}>{player.name}{player.isUser ? ' (You)' : ''}</div>
              <div style={{ fontSize: 10, color: c.textMuted }}>Level {player.level} · 🔥 {player.streak}d streak</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 900, color: c.gold }}>{player.xp.toLocaleString()}</div>
              <div style={{ fontSize: 10, color: c.textMuted }}>XP</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: `${c.green}10`, border: `1px solid ${c.green}30`, borderRadius: 14, padding: '14px' }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: c.green, marginBottom: 4 }}>🤝 Study Party Open!</div>
          <div style={{ fontSize: 12, color: c.textSoft, marginBottom: 10, lineHeight: 1.5 }}>Emma's group is taking on Dragon's Math Peak! Join for bonus XP and collaboration rewards.</div>
          <div style={{ display: 'flex', marginBottom: 12 }}>
            {['🧙‍♀️', '⚔️', '🔮', '+2'].map((av, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: 9, background: c.surfaceHigh, border: `2px solid ${c.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: i < 3 ? 18 : 10, color: c.textMuted, fontWeight: 900, marginLeft: i ? -8 : 0 }}>{av}</div>
            ))}
          </div>
          <div style={{ background: c.green, borderRadius: 10, padding: '9px 14px', textAlign: 'center', fontSize: 13, fontWeight: 900, color: '#fff', cursor: 'pointer', transform: pressed === 'jp' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s', ...f }} onMouseDown={() => setPressed('jp')} onMouseUp={() => setPressed(null)}>Join Party (+50 Bonus XP)</div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div style={{ ...f, flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '14px 16px 12px' }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: c.text }}>Your Progress 📊</div>
        <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 700 }}>March 2026 · Week 11</div>
      </div>
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'Quests Done', value: '8', icon: '⚔️', color: c.purple },
          { label: 'Day Streak', value: '7🔥', icon: null, color: '#F97316' },
          { label: 'Accuracy', value: '84%', icon: '🎯', color: c.green },
        ].map(({ label, value, icon, color }) => (
          <div key={label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
            {icon && <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>}
            <div style={{ fontSize: 20, fontWeight: 900, color }}>{value}</div>
            <div style={{ fontSize: 10, color: c.textMuted, fontWeight: 700, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>XP This Week</div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '14px 12px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 80 }}>
            {[
              { day: 'M', pct: 60 }, { day: 'T', pct: 38 }, { day: 'W', pct: 100 },
              { day: 'T', pct: 75 }, { day: 'F', pct: 45 }, { day: 'S', pct: 92 }, { day: 'S', pct: 25 },
            ].map(({ day, pct }, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <div style={{ width: '100%', height: `${pct}%`, background: i === 5 ? `linear-gradient(180deg, ${c.purpleLight}, ${c.purple})` : `${c.purple}45`, borderRadius: '4px 4px 0 0' }} />
                <div style={{ fontSize: 9, color: c.textMuted, marginTop: 5, fontWeight: 700 }}>{day}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 10, color: c.textMuted }}>870 XP this week</span>
            <span style={{ fontSize: 10, color: c.green, fontWeight: 700 }}>↑ 23% vs last week</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>Subject Mastery</div>
        {subjects.map(({ name, icon, progress, color, xp }) => (
          <div key={name} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 15 }}>{icon}</span><span style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{name}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: c.gold, fontWeight: 800 }}>{xp} XP</span>
                <span style={{ fontSize: 12, fontWeight: 900, color }}>{progress}%</span>
              </div>
            </div>
            <div style={{ background: c.surfaceHigh, borderRadius: 6, height: 8 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: 6 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.text, marginBottom: 10 }}>Badges Earned</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {achievements.filter(a => a.earned).map((ach, i) => (
            <div key={i} style={{ background: `${c.gold}10`, border: `1px solid ${c.gold}30`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 68 }}>
              <div style={{ fontSize: 28, marginBottom: 5 }}>{ach.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: c.gold, textAlign: 'center' }}>{ach.name}</div>
            </div>
          ))}
          {achievements.filter(a => !a.earned).map((ach, i) => (
            <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 68, opacity: 0.4 }}>
              <div style={{ fontSize: 28, marginBottom: 5, filter: 'grayscale(1)' }}>{ach.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: c.textMuted, textAlign: 'center' }}>???</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'map', emoji: '🗺️', label: 'Map' },
    { id: 'quest', emoji: '⚔️', label: 'Quest' },
    { id: 'hero', emoji: '🧝', label: 'Hero' },
    { id: 'league', emoji: '🏆', label: 'League' },
    { id: 'progress', emoji: '📊', label: 'Stats' },
  ];

  const renderContent = () => {
    switch (tab) {
      case 'map': return renderMap();
      case 'quest': return renderQuest();
      case 'hero': return renderHero();
      case 'league': return renderLeague();
      case 'progress': return renderProgress();
      default: return renderMap();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% 30%, #1a0d3a 0%, #080612 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...f, padding: '20px 0' }}>
      <div style={{ width: 375, height: 812, background: c.bg, borderRadius: 54, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 80px rgba(0,0,0,0.85), 0 0 0 8px #1A1535, 0 0 0 11px #0a0818' }}>
        {/* Status Bar */}
        <div style={{ height: 44, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: c.text }}>9:41</span>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8, width: 126, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', border: '1.5px solid #2a2a2a' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#111' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <rect x="0" y="7" width="3" height="4" rx="1" fill={c.text} />
              <rect x="4" y="4.5" width="3" height="6.5" rx="1" fill={c.text} />
              <rect x="8" y="2" width="3" height="9" rx="1" fill={c.text} />
              <rect x="12" y="0" width="3" height="11" rx="1" fill={c.text} />
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path d="M7.5 2C4.5 2 1.8 4.2 0.5 6L2.2 7.5C3.2 6.2 5.2 4.8 7.5 4.8C9.8 4.8 11.8 6.2 12.8 7.5L14.5 6C13.2 4.2 10.5 2 7.5 2Z" fill={c.text} />
              <circle cx="7.5" cy="9.5" r="1.5" fill={c.text} />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${c.text}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '72%', height: '100%', background: c.green, borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 5, background: c.text, borderRadius: '0 1px 1px 0', marginLeft: 1 }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderContent()}
        </div>

        {/* Bottom Nav */}
        <div style={{ height: 78, background: c.surface, borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 4px 8px', flexShrink: 0 }}>
          {tabs.map(({ id, emoji, label }) => {
            const active = tab === id;
            return (
              <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 8px', borderRadius: 12, background: active ? `${c.purple}20` : 'transparent', flex: 1, transform: pressed === `t${id}` ? 'scale(0.88)' : 'scale(1)', transition: 'all 0.14s' }} onMouseDown={() => setPressed(`t${id}`)} onMouseUp={() => { setPressed(null); setTab(id); }}>
                <div style={{ fontSize: 20, filter: active ? 'none' : 'grayscale(60%) opacity(0.55)' }}>{emoji}</div>
                <span style={{ fontSize: 9, fontWeight: active ? 900 : 600, color: active ? c.purpleLight : c.textMuted }}>{label}</span>
                {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.purple, marginTop: -1 }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast Notification */}
      {showNotif && (
        <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', zIndex: 100, ...f }}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: c.text }}>7-Day Streak Achieved!</div>
            <div style={{ fontSize: 11, color: c.textMuted }}>You've earned +100 bonus XP today</div>
          </div>
        </div>
      )}
    </div>
  );
}
