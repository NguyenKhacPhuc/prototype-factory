function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#08080F',
      surface: '#111119',
      surface2: '#181826',
      surface3: '#202032',
      text: '#EEEEFF',
      textSub: '#7878A8',
      textMuted: '#444465',
      primary: '#8B5CF6',
      primaryLight: '#A78BFA',
      primaryDark: '#6D28D9',
      accent: '#22D3EE',
      accentDark: '#0891B2',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
      pink: '#F472B6',
      border: '#22223A',
      borderLight: '#2C2C48',
      card: '#131320',
      navBg: 'rgba(8,8,15,0.96)',
    },
    light: {
      bg: '#F4F1FF',
      surface: '#FFFFFF',
      surface2: '#EDE8FF',
      surface3: '#DDD5FF',
      text: '#1A1830',
      textSub: '#58567A',
      textMuted: '#9898B8',
      primary: '#7C3AED',
      primaryLight: '#8B5CF6',
      primaryDark: '#6D28D9',
      accent: '#0891B2',
      accentDark: '#0E7490',
      success: '#059669',
      warning: '#D97706',
      danger: '#DC2626',
      pink: '#DB2777',
      border: '#E2DAFF',
      borderLight: '#D0C8FF',
      card: '#FFFFFF',
      navBg: 'rgba(244,241,255,0.96)',
    },
  };

  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTime, setSelectedTime] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [currentStory, setCurrentStory] = useState(null);
  const [storyStep, setStoryStep] = useState(0);
  const [storyChoices, setStoryChoices] = useState([]);
  const [storyComplete, setStoryComplete] = useState(false);
  const [pressed, setPressed] = useState(null);
  const [feedCategory, setFeedCategory] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const t = themes[theme];

  const moods = [
    { id: 'reset', label: 'Commute Reset', emoji: '🚇', color: '#22D3EE', desc: 'Quiet & absorbing' },
    { id: 'win', label: 'Quick Win', emoji: '⚡', color: '#FBBF24', desc: 'Fast & satisfying' },
    { id: 'laugh', label: 'Late-Night Laugh', emoji: '😄', color: '#F472B6', desc: 'Light & playful' },
    { id: 'calm', label: 'Calm Escape', emoji: '🌙', color: '#A78BFA', desc: 'Soft & dreamy' },
    { id: 'mystery', label: 'Mystery Mode', emoji: '🔍', color: '#34D399', desc: 'Tense & curious' },
  ];

  const stories = {
    reset: {
      title: 'The Midnight Express',
      setting: 'Underground Transit',
      ambiance: '🚇  City Sounds  •  Headphone Mode',
      genre: 'Thriller',
      color: '#22D3EE',
      emoji: '🚇',
      intro: 'The train cuts through the dark tunnel. A stranger in seat 7B slides a folded note across the aisle. Your pulse quickens as your fingers close around the paper.',
      steps: [
        {
          scene: "The note reads: 'Don't look behind you. The person in the red coat has been following you since Platform 9.' A chill runs down your spine.",
          choices: [
            { text: 'Open the note wider for more', outcome: 'curious' },
            { text: 'Glance casually behind you', outcome: 'brave' },
            { text: 'Pass the note back silently', outcome: 'cautious' },
          ],
        },
        {
          scene: "You look back — a woman in crimson reads a paperback, totally unaware of you. The stranger has vanished. But something small sits on their empty seat.",
          choices: [
            { text: 'Walk over and pick it up', outcome: 'bold' },
            { text: 'Alert the conductor quietly', outcome: 'safe' },
            { text: 'Stay still and keep watching', outcome: 'strategic' },
          ],
        },
        {
          scene: "It's an antique compass. The needle spins erratically — then locks, pointing directly at you. The train slows. Your stop is next.",
          choices: [
            { text: 'Keep the compass', outcome: 'keeper' },
            { text: 'Leave it on the seat', outcome: 'wise' },
            { text: 'Follow where it points', outcome: 'daring' },
          ],
        },
      ],
      ending: "You step off into the night, lighter than when you boarded. Whatever that was — it was exactly the jolt of aliveness you needed. The city hums around you. ✨",
    },
    calm: {
      title: 'The Glass Forest',
      setting: 'Fantasy Realm',
      ambiance: '🌙  Ambient Tones  •  Stress Relief',
      genre: 'Fantasy',
      color: '#A78BFA',
      emoji: '🌙',
      intro: 'You find yourself in a forest where every tree is made of translucent crystal. They hum in frequencies that ease your shoulders. The air smells like rain on warm stone.',
      steps: [
        {
          scene: "A silver fox steps onto the path. It speaks in a voice like wind through reeds: 'You carry too much. What will you set down here?'",
          choices: [
            { text: 'Release worry about tomorrow', outcome: 'peaceful' },
            { text: "Let go of today's tension", outcome: 'present' },
            { text: 'Set down the need to rush', outcome: 'free' },
          ],
        },
        {
          scene: "The forest brightens. Crystal leaves scatter rainbow light all around you. The fox curls at your feet, warm and purring like distant thunder.",
          choices: [
            { text: 'Rest here a long moment', outcome: 'restored' },
            { text: 'Walk deeper into the light', outcome: 'curious' },
            { text: 'Ask the fox one question', outcome: 'wise' },
          ],
        },
        {
          scene: "The fox whispers: 'Tomorrow is only a dream from here. Tonight, you are already whole.' Stars bloom between the glass branches above you.",
          choices: [
            { text: 'Close your eyes and breathe', outcome: 'centered' },
            { text: 'Count the stars slowly', outcome: 'grounded' },
            { text: 'Thank the fox quietly', outcome: 'grateful' },
          ],
        },
      ],
      ending: "The forest dissolves into warmth. Your breath is even and slow. You feel rested — like five minutes became an hour of sleep. Carry this with you. 🌟",
    },
    mystery: {
      title: 'Case: The Missing Melody',
      setting: 'Jazz Lounge, 11pm',
      ambiance: '🔍  Jazz Club Ambiance  •  Detective Mode',
      genre: 'Mystery',
      color: '#34D399',
      emoji: '🎺',
      intro: "The Velvet Lounge called at 11pm. Their star pianist vanished mid-performance. The only clue left on the bench: a single piano key, painted solid gold.",
      steps: [
        {
          scene: "The bartender heard two voices arguing in French before the music stopped. Three possible leads, all time-sensitive.",
          choices: [
            { text: 'Search backstage immediately', outcome: 'direct' },
            { text: 'Question nearby audience members', outcome: 'thorough' },
            { text: 'Track the French speakers', outcome: 'sharp' },
          ],
        },
        {
          scene: "Backstage: a half-eaten croissant, a burner phone, and a faded photograph of a Paris conservatoire — dated 1987. One missed call on the burner.",
          choices: [
            { text: 'Call the number back now', outcome: 'bold' },
            { text: 'Research the conservatoire first', outcome: 'methodical' },
            { text: 'Show the photo to the staff', outcome: 'collaborative' },
          ],
        },
        {
          scene: "The number connects. A voice: 'I knew you'd find this. Meet me at the fountain at midnight.' Your watch reads 11:58.",
          choices: [
            { text: 'Rush straight to the fountain', outcome: 'daring' },
            { text: 'Set up surveillance first', outcome: 'tactical' },
            { text: 'Negotiate over the phone', outcome: 'clever' },
          ],
        },
      ],
      ending: "Case closed. The pianist staged their own disappearance — a protest against the venue's new owners. Your name spreads through the city's underground. 🎺",
    },
    win: {
      title: 'Sprint to the Summit',
      setting: 'Mountain Ridge',
      ambiance: '⚡  High Energy Beats  •  Achievement Mode',
      genre: 'Adventure',
      color: '#FBBF24',
      emoji: '⚡',
      intro: "The ridge is 200 meters above you. Your legs burn. Your team is counting on the flag you carry. Three minutes to the summit. Everything you've trained for is now.",
      steps: [
        {
          scene: "The path splits. Left is rocky and direct. Right is smooth but winding. Storm clouds are building fast.",
          choices: [
            { text: 'Take the rocky direct path', outcome: 'gutsy' },
            { text: 'Go smooth and conserve energy', outcome: 'strategic' },
            { text: 'Cut directly across the ridge', outcome: 'wild' },
          ],
        },
        {
          scene: "Your footing slips on loose scree. You catch yourself — barely. Ahead, another climber is stuck and calling for help.",
          choices: [
            { text: 'Stop to help them up', outcome: 'heroic' },
            { text: 'Shout guidance and keep going', outcome: 'balanced' },
            { text: 'Race ahead, alert rescuers after', outcome: 'focused' },
          ],
        },
        {
          scene: "Twenty meters from the top. Wind howls. The flag feels heavier. Your lungs are fire. The summit is right there.",
          choices: [
            { text: 'Final sprint — everything you have', outcome: 'legendary' },
            { text: 'Pace yourself and finish strong', outcome: 'disciplined' },
            { text: 'Pause, take it in, then summit', outcome: 'present' },
          ],
        },
      ],
      ending: "The flag goes up. The wind tears past. You stand at the top of something — the mountain, yes, but also something inside yourself. Hell yes. ⚡",
    },
    laugh: {
      title: 'Worst. Wedding. Ever.',
      setting: 'Chaotic Reception Hall',
      ambiance: '😄  Comedy Soundtrack  •  Late Night Mode',
      genre: 'Comedy',
      color: '#F472B6',
      emoji: '🎪',
      intro: "You're the wedding planner. The cake is on fire. The groom is hiding in the bathroom. The DJ is playing funeral dirges. This is your moment.",
      steps: [
        {
          scene: "The fire alarm goes off. Guests scatter. The mother of the bride is sobbing into a shrimp cocktail. First call?",
          choices: [
            { text: 'Handle the cake fire', outcome: 'practical' },
            { text: 'Find the missing groom', outcome: 'priority' },
            { text: 'Fix the DJ playlist', outcome: 'vibes first' },
          ],
        },
        {
          scene: "You find the groom. He's not hiding — he's 'manifesting.' The flower girl has eaten the undamaged tier of cake. She looks extremely pleased.",
          choices: [
            { text: 'Declare this a win and proceed', outcome: 'optimist' },
            { text: 'Order emergency backup cake', outcome: 'prepared' },
            { text: 'Interview the flower girl formally', outcome: 'journalist' },
          ],
        },
        {
          scene: "The DJ finally plays something human. The groom emerges. The remaining cake somehow looks fine. The bride is actually laughing. You might survive.",
          choices: [
            { text: 'Take full credit for the turnaround', outcome: 'bold' },
            { text: 'Quietly fade into the background', outcome: 'humble' },
            { text: 'Charge triple for the chaos premium', outcome: 'entrepreneur' },
          ],
        },
      ],
      ending: "Against all odds, it becomes the most talked-about wedding in the venue's history. Five-star review: 'Absolute chaos. Would 100% recommend.' 😂",
    },
  };

  const feedItems = [
    { id: 1, title: "The Lighthouse Keeper's Lie", mood: 'Mystery', time: '4 min', emoji: '🔦', plays: '2.3k', color: '#34D399', hot: true, moodId: 'mystery' },
    { id: 2, title: 'Tiny Coffee Shop at 6am', mood: 'Calm', time: '3 min', emoji: '☕', plays: '1.8k', color: '#A78BFA', hot: false, moodId: 'calm' },
    { id: 3, title: 'Rooftop Chase at Dusk', mood: 'Action', time: '6 min', emoji: '🌆', plays: '3.1k', color: '#FBBF24', hot: true, moodId: 'win' },
    { id: 4, title: 'The Star Cartographer', mood: 'Wonder', time: '5 min', emoji: '⭐', plays: '987', color: '#22D3EE', hot: false, moodId: 'reset' },
    { id: 5, title: 'Market Day Gone Wrong', mood: 'Comedy', time: '4 min', emoji: '🎪', plays: '1.5k', color: '#F472B6', hot: false, moodId: 'laugh' },
    { id: 6, title: 'Signal Lost in the Storm', mood: 'Drama', time: '7 min', emoji: '⛈️', plays: '765', color: '#818CF8', hot: false, moodId: 'calm' },
  ];

  const press = (id) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 160);
  };

  const handleGenerate = () => {
    if (!selectedMood) return;
    setIsGenerating(true);
    setGenerateProgress(0);
    const iv = setInterval(() => {
      setGenerateProgress(p => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return p + 9;
      });
    }, 90);
    setTimeout(() => {
      clearInterval(iv);
      setGenerateProgress(100);
      setCurrentStory(stories[selectedMood]);
      setStoryStep(0);
      setStoryChoices([]);
      setStoryComplete(false);
      setIsGenerating(false);
      setActiveTab('play');
    }, 1400);
  };

  const handleChoice = (choice, idx) => {
    press(`choice-${idx}`);
    setStoryChoices(prev => [...prev, { step: storyStep, choice }]);
    setTimeout(() => {
      if (storyStep < currentStory.steps.length - 1) {
        setStoryStep(s => s + 1);
      } else {
        setStoryComplete(true);
      }
    }, 280);
  };

  const launchStory = (moodId) => {
    setSelectedMood(moodId);
    setCurrentStory(stories[moodId]);
    setStoryStep(0);
    setStoryChoices([]);
    setStoryComplete(false);
    setActiveTab('play');
  };

  // ── STATUS BAR ──────────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 22px 0', fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: 0.2 }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 20 15" fill={t.textSub}>
          <path d="M10 3.5C7 3.5 4.3 4.7 2.3 6.7L0 4.4C2.7 1.7 6.1 0 10 0s7.3 1.7 10 4.4l-2.3 2.3C15.7 4.7 13 3.5 10 3.5z"/>
          <path d="M10 8c-1.8 0-3.4.7-4.6 1.9L3 7.5C4.8 5.7 7.3 4.6 10 4.6s5.2 1.1 7 2.9l-2.4 2.4C13.4 8.7 11.8 8 10 8z"/>
          <circle cx="10" cy="13" r="2"/>
        </svg>
        <svg width="24" height="12" viewBox="0 0 32 14" fill="none">
          <rect x="0.75" y="0.75" width="27.5" height="12.5" rx="3.25" stroke={t.textSub} strokeWidth="1.5"/>
          <rect x="2" y="2" width="22" height="10" rx="2" fill={t.textSub}/>
          <path d="M29.5 5v4" stroke={t.textSub} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );

  // ── DYNAMIC ISLAND ──────────────────────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 6px' }}>
      <div style={{ width: activeTab === 'play' && currentStory ? 160 : 110, height: 32, backgroundColor: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'width 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
        {activeTab === 'play' && currentStory ? (
          <>
            <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#34D399' }} />
            <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>{currentStory.emoji} Now Playing</span>
          </>
        ) : (
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#222' }} />
        )}
      </div>
    </div>
  );

  // ── BOTTOM NAV ──────────────────────────────────────────────────────────────
  const BottomNav = () => {
    const HomeIcon = window.lucide && window.lucide.Home;
    const PlayIcon = window.lucide && window.lucide.Play;
    const CompassIcon = window.lucide && window.lucide.Compass;
    const UserIcon = window.lucide && window.lucide.User;
    const tabs = [
      { id: 'home', label: 'Home', Icon: HomeIcon },
      { id: 'play', label: 'Play', Icon: PlayIcon },
      { id: 'feed', label: 'Discover', Icon: CompassIcon },
      { id: 'profile', label: 'Profile', Icon: UserIcon },
    ];
    return (
      <div style={{ backgroundColor: t.navBg, backdropFilter: 'blur(20px)', borderTop: `1px solid ${t.border}`, display: 'flex', paddingBottom: 20, paddingTop: 10, flexShrink: 0 }}>
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <div key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', transform: pressed === `nav-${id}` ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s ease' }} onMouseDown={() => press(`nav-${id}`)}>
              <div style={{ width: 40, height: 28, borderRadius: 10, backgroundColor: isActive ? `${t.primary}22` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                {Icon && <Icon size={20} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />}
              </div>
              <span style={{ fontSize: 9.5, fontWeight: isActive ? 700 : 400, color: isActive ? t.primary : t.textMuted, letterSpacing: 0.1 }}>{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // ── HOME SCREEN ─────────────────────────────────────────────────────────────
  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 18px 16px', scrollbarWidth: 'none' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 22 }}>
        <p style={{ color: t.textSub, fontSize: 13, margin: '0 0 3px', letterSpacing: 0.2 }}>Good evening ✦</p>
        <h1 style={{ color: t.text, fontSize: 24, fontWeight: 800, letterSpacing: -0.6, margin: 0, lineHeight: 1.2 }}>What's your vibe<br/>right now?</h1>
      </div>

      {/* Mood Selector */}
      <div style={{ marginBottom: 22 }}>
        <p style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', margin: '0 0 11px' }}>Choose Your Mood</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {moods.map(mood => {
            const isSelected = selectedMood === mood.id;
            return (
              <div key={mood.id} onClick={() => setSelectedMood(mood.id)} onMouseDown={() => press(`mood-${mood.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 14px', borderRadius: 15, border: `2px solid ${isSelected ? mood.color : t.border}`, backgroundColor: isSelected ? `${mood.color}14` : t.surface2, cursor: 'pointer', transition: 'all 0.2s ease', transform: pressed === `mood-${mood.id}` ? 'scale(0.97)' : 'scale(1)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: `${mood.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{mood.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: t.text, fontWeight: 700, fontSize: 13.5, margin: '0 0 2px' }}>{mood.label}</p>
                  <p style={{ color: t.textSub, fontSize: 11.5, margin: 0 }}>{mood.desc}</p>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${isSelected ? mood.color : t.border}`, backgroundColor: isSelected ? mood.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                  {isSelected && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Selector */}
      <div style={{ marginBottom: 22 }}>
        <p style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', margin: '0 0 11px' }}>Available Time</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {[3, 5, 7].map(time => {
            const active = selectedTime === time;
            return (
              <div key={time} onClick={() => setSelectedTime(time)} style={{ flex: 1, padding: '12px 0', borderRadius: 13, textAlign: 'center', border: `2px solid ${active ? t.primary : t.border}`, backgroundColor: active ? `${t.primary}18` : t.surface2, cursor: 'pointer', transition: 'all 0.2s' }}>
                <p style={{ color: active ? t.primaryLight : t.text, fontWeight: 800, fontSize: 20, margin: '0 0 1px' }}>{time}</p>
                <p style={{ color: t.textSub, fontSize: 11, margin: 0 }}>min</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generate Button */}
      <div onClick={handleGenerate} onMouseDown={() => selectedMood && press('generate')} style={{ padding: '17px 0', borderRadius: 17, background: selectedMood ? `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)` : t.surface3, cursor: selectedMood ? 'pointer' : 'not-allowed', textAlign: 'center', transition: 'all 0.3s ease', transform: pressed === 'generate' ? 'scale(0.97)' : 'scale(1)', opacity: selectedMood ? 1 : 0.45, boxShadow: selectedMood ? `0 8px 28px ${t.primary}45` : 'none', marginBottom: 22 }}>
        {isGenerating ? (
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: '0 0 8px', letterSpacing: 0.2 }}>Crafting your scene...</p>
            <div style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 2, margin: '0 24px' }}>
              <div style={{ height: '100%', width: `${generateProgress}%`, backgroundColor: '#fff', borderRadius: 2, transition: 'width 0.12s ease' }} />
            </div>
          </div>
        ) : (
          <p style={{ color: selectedMood ? '#fff' : t.textMuted, fontWeight: 800, fontSize: 15, margin: 0, letterSpacing: 0.3 }}>✦  Generate My Scene</p>
        )}
      </div>

      {/* Recent */}
      <div>
        <p style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', margin: '0 0 11px' }}>Recent Escapes</p>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
          {[
            { title: 'Glass Forest', emoji: '🌙', when: 'Yesterday', color: '#A78BFA', moodId: 'calm' },
            { title: 'Midnight Express', emoji: '🚇', when: '2 days ago', color: '#22D3EE', moodId: 'reset' },
            { title: 'Missing Melody', emoji: '🎺', when: '3 days ago', color: '#34D399', moodId: 'mystery' },
          ].map((item, i) => (
            <div key={i} onClick={() => launchStory(item.moodId)} onMouseDown={() => press(`recent-${i}`)} style={{ minWidth: 112, padding: '13px 12px', borderRadius: 14, backgroundColor: t.surface2, border: `1px solid ${t.border}`, cursor: 'pointer', transform: pressed === `recent-${i}` ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s', flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 8 }}>{item.emoji}</div>
              <p style={{ color: t.text, fontSize: 12, fontWeight: 700, margin: '0 0 2px', lineHeight: 1.3 }}>{item.title}</p>
              <p style={{ color: t.textMuted, fontSize: 10.5, margin: 0 }}>{item.when}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAY SCREEN ─────────────────────────────────────────────────────────────
  const PlayScreen = () => {
    const VolumeIcon = window.lucide && (soundOn ? window.lucide.Volume2 : window.lucide.VolumeX);
    const RefreshIcon = window.lucide && window.lucide.RefreshCw;

    if (!currentStory) {
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center', gap: 14 }}>
          <div style={{ fontSize: 56, marginBottom: 4 }}>🎭</div>
          <h2 style={{ color: t.text, fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: -0.4 }}>No scene loaded yet</h2>
          <p style={{ color: t.textSub, fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>Go to Home, pick a mood and time, then tap Generate to build your personalized micro-escape.</p>
          <div onClick={() => setActiveTab('home')} onMouseDown={() => press('go-home')} style={{ padding: '14px 32px', borderRadius: 14, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, cursor: 'pointer', marginTop: 6, transform: pressed === 'go-home' ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.15s', boxShadow: `0 8px 24px ${t.primary}40` }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>Go to Home</span>
          </div>
        </div>
      );
    }

    const step = currentStory.steps[storyStep];
    const progressPct = storyComplete ? 100 : (storyStep / currentStory.steps.length) * 100;

    return (
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '4px 0 10px' }}>
        {/* Story Header Card */}
        <div style={{ margin: '0 16px 14px', padding: '16px 16px 14px', borderRadius: 18, background: `linear-gradient(145deg, ${t.surface2}, ${t.surface3})`, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <p style={{ color: t.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', margin: '0 0 4px' }}>{currentStory.genre}</p>
              <h2 style={{ color: t.text, fontSize: 19, fontWeight: 800, margin: 0, letterSpacing: -0.4 }}>{currentStory.title}</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div onClick={() => setSoundOn(s => !s)} style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {VolumeIcon && <VolumeIcon size={15} color={soundOn ? t.primary : t.textMuted} />}
              </div>
              <div style={{ padding: '5px 10px', borderRadius: 9, backgroundColor: `${t.success}20`, border: `1px solid ${t.success}45` }}>
                <span style={{ color: t.success, fontSize: 11, fontWeight: 700 }}>{selectedTime} min</span>
              </div>
            </div>
          </div>
          <p style={{ color: currentStory.color, fontSize: 11.5, margin: 0, fontWeight: 500 }}>{currentStory.ambiance}</p>
        </div>

        {/* Progress Bar */}
        <div style={{ margin: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 4, backgroundColor: t.surface3, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, minWidth: 36 }}>{storyComplete ? 'Done ✓' : `${storyStep + 1} / ${currentStory.steps.length}`}</span>
        </div>

        {!storyComplete ? (
          <div style={{ padding: '0 16px' }}>
            {/* Intro (first step only) */}
            {storyStep === 0 && (
              <div style={{ padding: '14px 16px', borderRadius: 15, backgroundColor: `${t.primary}12`, border: `1px solid ${t.primary}28`, marginBottom: 14 }}>
                <p style={{ color: t.text, fontSize: 13.5, lineHeight: 1.75, margin: 0, fontStyle: 'italic', opacity: 0.9 }}>"{currentStory.intro}"</p>
              </div>
            )}
            {/* Scene */}
            <div style={{ padding: '16px', borderRadius: 15, backgroundColor: t.surface2, border: `1px solid ${t.border}`, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 3, borderRadius: 2, backgroundColor: currentStory.color, alignSelf: 'stretch', flexShrink: 0 }} />
                <p style={{ color: t.text, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{step.scene}</p>
              </div>
            </div>
            {/* Choices */}
            <p style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', margin: '0 0 10px' }}>What do you do?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {step.choices.map((choice, i) => (
                <div key={i} onClick={() => handleChoice(choice, i)} onMouseDown={() => press(`choice-${i}`)} style={{ padding: '14px 16px', borderRadius: 14, backgroundColor: t.surface, border: `2px solid ${pressed === `choice-${i}` ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.15s ease', transform: pressed === `choice-${i}` ? 'scale(0.97)' : 'scale(1)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, backgroundColor: `${t.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: t.primary, fontSize: 11, fontWeight: 800 }}>{String.fromCharCode(65 + i)}</span>
                  </div>
                  <span style={{ color: t.text, fontSize: 13.5, fontWeight: 500, lineHeight: 1.45 }}>{choice.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Completion State */
          <div style={{ padding: '0 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>✨</div>
            <h3 style={{ color: t.text, fontSize: 21, fontWeight: 800, margin: '0 0 6px', letterSpacing: -0.4 }}>Scene Complete!</h3>
            <p style={{ color: t.textSub, fontSize: 13, margin: '0 0 18px' }}>Here's how your story unfolded</p>
            <div style={{ padding: '16px', borderRadius: 16, backgroundColor: t.surface2, border: `1px solid ${t.border}`, marginBottom: 16, textAlign: 'left' }}>
              <p style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 8px' }}>Your Ending</p>
              <p style={{ color: t.text, fontSize: 13.5, lineHeight: 1.75, margin: 0 }}>{currentStory.ending}</p>
            </div>
            {/* Choice recap chips */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
              {storyChoices.map((c, i) => (
                <div key={i} style={{ padding: '7px 12px', borderRadius: 20, backgroundColor: `${t.primary}16`, border: `1px solid ${t.primary}30` }}>
                  <span style={{ color: t.primaryLight, fontSize: 11, fontWeight: 700 }}>#{i + 1} {c.choice.outcome}</span>
                </div>
              ))}
            </div>
            <div onClick={() => { setActiveTab('home'); setCurrentStory(null); setSelectedMood(null); }} onMouseDown={() => press('new-escape')} style={{ padding: '16px', borderRadius: 15, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, cursor: 'pointer', marginBottom: 10, transform: pressed === 'new-escape' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s', boxShadow: `0 8px 24px ${t.primary}40` }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>✦  New Escape</span>
            </div>
            <div onClick={() => { setStoryStep(0); setStoryChoices([]); setStoryComplete(false); }} style={{ padding: '13px', borderRadius: 14, border: `2px solid ${t.border}`, cursor: 'pointer' }}>
              <span style={{ color: t.textSub, fontWeight: 600, fontSize: 13.5 }}>↺  Replay Story</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── FEED SCREEN ─────────────────────────────────────────────────────────────
  const FeedScreen = () => {
    const categories = ['For You', 'Trending', '3-min Quick', 'Mystery', 'Calm', 'Comedy'];
    return (
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '4px 0 10px' }}>
        <div style={{ padding: '0 16px 16px' }}>
          <h1 style={{ color: t.text, fontSize: 23, fontWeight: 800, letterSpacing: -0.5, margin: '0 0 3px' }}>Discover</h1>
          <p style={{ color: t.textSub, fontSize: 13, margin: 0 }}>Fresh scenes curated for you</p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 8, padding: '0 16px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map((cat, i) => (
            <div key={i} onClick={() => setFeedCategory(i)} style={{ padding: '7px 15px', borderRadius: 20, whiteSpace: 'nowrap', backgroundColor: feedCategory === i ? t.primary : t.surface2, border: `1px solid ${feedCategory === i ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
              <span style={{ color: feedCategory === i ? '#fff' : t.textSub, fontSize: 12, fontWeight: 600 }}>{cat}</span>
            </div>
          ))}
        </div>

        {/* Featured Hero */}
        <div onClick={() => launchStory('mystery')} onMouseDown={() => press('featured')} style={{ margin: '0 16px 14px', borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(145deg, #0D1020 0%, #1A0D40 50%, #0A1A2A 100%)', border: `1px solid ${t.border}`, padding: '18px 18px 16px', cursor: 'pointer', transform: pressed === 'featured' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 14, right: 14, padding: '4px 10px', borderRadius: 8, backgroundColor: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.45)' }}>
            <span style={{ color: '#FBBF24', fontSize: 10.5, fontWeight: 700 }}>🔥 Featured</span>
          </div>
          <div style={{ fontSize: 30, marginBottom: 10 }}>🎺</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10.5, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 5px' }}>Mystery · 5 min</p>
          <h3 style={{ color: '#fff', fontSize: 19, fontWeight: 800, margin: '0 0 7px', letterSpacing: -0.3 }}>Case: The Missing Melody</h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12.5, lineHeight: 1.55, margin: '0 0 14px' }}>A jazz pianist vanishes mid-set. A golden piano key is all that remains. Can you crack the case?</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex' }}>
              {['#E879F9', '#818CF8', '#34D399'].map((c, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: c, border: '2px solid #000', marginLeft: i > 0 ? -7 : 0 }} />
              ))}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11.5 }}>2.3k played today</span>
          </div>
        </div>

        {/* Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px' }}>
          {feedItems.map(item => (
            <div key={item.id} onClick={() => launchStory(item.moodId)} onMouseDown={() => press(`feed-${item.id}`)} style={{ padding: '14px', borderRadius: 16, backgroundColor: t.surface2, border: `1px solid ${t.border}`, cursor: 'pointer', transform: pressed === `feed-${item.id}` ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{item.emoji}</div>
                {item.hot && <div style={{ padding: '2px 7px', borderRadius: 6, backgroundColor: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)' }}><span style={{ color: '#FBBF24', fontSize: 9, fontWeight: 700 }}>HOT</span></div>}
              </div>
              <p style={{ color: t.text, fontSize: 12.5, fontWeight: 700, margin: '0 0 5px', lineHeight: 1.35 }}>{item.title}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ color: item.color, fontSize: 10.5, fontWeight: 600 }}>{item.mood}</span>
                <span style={{ color: t.textMuted, fontSize: 10.5 }}>{item.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill={t.textMuted}><polygon points="2,1 9,5 2,9"/></svg>
                <span style={{ color: t.textMuted, fontSize: 10.5 }}>{item.plays}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── PROFILE SCREEN ───────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const SunIcon = window.lucide && window.lucide.Sun;
    const MoonIcon = window.lucide && window.lucide.Moon;
    const ChevronRightIcon = window.lucide && window.lucide.ChevronRight;

    const stats = [
      { label: 'Scenes', value: '47', emoji: '🎭' },
      { label: 'Time Saved', value: '3h 12m', emoji: '⏱' },
      { label: 'Day Streak', value: '8', emoji: '🔥' },
    ];
    const achievements = [
      { label: 'First Escape', emoji: '🚀', unlocked: true },
      { label: '5-Day Streak', emoji: '🔥', unlocked: true },
      { label: 'Genre Explorer', emoji: '🗺️', unlocked: true },
      { label: 'Night Owl', emoji: '🦉', unlocked: true },
      { label: 'Scene Master', emoji: '🎭', unlocked: false },
      { label: 'Time Bender', emoji: '⏰', unlocked: false },
    ];
    const prefs = [
      { label: 'Favorite Mood', value: 'Mystery', emoji: '🔍' },
      { label: 'Default Duration', value: '5 minutes', emoji: '⏱' },
      { label: 'Location Mode', value: 'Auto-detect', emoji: '📍' },
      { label: 'Audio Enabled', value: soundOn ? 'On' : 'Off', emoji: '🔊' },
      { label: 'Daily Reminder', value: '6:00 PM', emoji: '🔔' },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '4px 16px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <h1 style={{ color: t.text, fontSize: 23, fontWeight: 800, letterSpacing: -0.5, margin: '0 0 2px' }}>Profile</h1>
            <p style={{ color: t.textSub, fontSize: 13, margin: 0 }}>Your escape stats</p>
          </div>
          {/* Theme Toggle */}
          <div onClick={() => setTheme(th => th === 'dark' ? 'light' : 'dark')} style={{ width: 52, height: 30, borderRadius: 15, backgroundColor: theme === 'dark' ? t.primary : t.surface3, border: `2px solid ${t.border}`, display: 'flex', alignItems: 'center', padding: '0 4px', cursor: 'pointer', justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start', transition: 'all 0.3s ease' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              {theme === 'dark' ? (MoonIcon && <MoonIcon size={11} color={t.primary} />) : (SunIcon && <SunIcon size={11} color="#D97706" />)}
            </div>
          </div>
        </div>

        {/* Avatar Card */}
        <div style={{ padding: '18px', borderRadius: 20, marginBottom: 14, background: `linear-gradient(145deg, ${t.primary}18, ${t.accent}12)`, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🎭</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: t.text, fontSize: 17, fontWeight: 800, margin: '0 0 2px' }}>Alex Rivera</p>
            <p style={{ color: t.textSub, fontSize: 12, margin: '0 0 8px' }}>Scene Adventurer · Level 7</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: t.surface3, maxWidth: 100 }}>
                <div style={{ height: '100%', width: '65%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3 }} />
              </div>
              <span style={{ color: t.textMuted, fontSize: 10.5 }}>65% to Lv8</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, marginBottom: 14 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '13px 8px', borderRadius: 15, textAlign: 'center', backgroundColor: t.surface2, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.emoji}</div>
              <p style={{ color: t.text, fontSize: 16, fontWeight: 800, margin: '0 0 2px' }}>{s.value}</p>
              <p style={{ color: t.textSub, fontSize: 10, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div style={{ marginBottom: 14 }}>
          <p style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', margin: '0 0 10px' }}>Achievements</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {achievements.map((a, i) => (
              <div key={i} style={{ padding: '7px 12px', borderRadius: 11, backgroundColor: a.unlocked ? `${t.primary}16` : t.surface2, border: `1px solid ${a.unlocked ? t.primary + '38' : t.border}`, display: 'flex', alignItems: 'center', gap: 6, opacity: a.unlocked ? 1 : 0.38 }}>
                <span style={{ fontSize: 13 }}>{a.emoji}</span>
                <span style={{ color: a.unlocked ? t.text : t.textMuted, fontSize: 11, fontWeight: 600 }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <p style={{ color: t.textMuted, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', margin: '0 0 10px' }}>Preferences</p>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}` }}>
            {prefs.map((pref, i) => (
              <div key={i} style={{ padding: '13px 15px', backgroundColor: t.surface, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < prefs.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 15 }}>{pref.emoji}</span>
                  <span style={{ color: t.text, fontSize: 13, fontWeight: 500 }}>{pref.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: t.textSub, fontSize: 12.5 }}>{pref.value}</span>
                  {ChevronRightIcon && <ChevronRightIcon size={14} color={t.textMuted} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const screens = { home: HomeScreen, play: PlayScreen, feed: FeedScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeTab] || HomeScreen;

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, backgroundColor: t.bg, borderRadius: 50, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', border: `2px solid ${theme === 'dark' ? '#282838' : '#D8D0FF'}`, position: 'relative' }}>
        <StatusBar />
        <DynamicIsland />

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ActiveScreen />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
