function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [currentMood, setCurrentMood] = useState(null);
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [choiceMade, setChoiceMade] = useState(null);
  const [showChoiceResult, setShowChoiceResult] = useState(false);
  const [savedStories, setSavedStories] = useState(['1', '3']);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [currentTime, setCurrentTime] = useState('9:41');
  const progressRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { background: #1a1a2e; }
    `;
    document.head.appendChild(style);
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0'));
    }, 30000);
    return () => { clearInterval(interval); document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setIsPlaying(false); return 100; }
        return p + 0.5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const colors = {
    bg: '#FAFBFC',
    slate: '#5B7B9A',
    slateLight: '#7A98B5',
    slateDark: '#3D6185',
    blush: '#E8C4C4',
    blushLight: '#F2DADA',
    charcoal: '#3D4F5F',
    charcoalLight: '#6B7F8F',
    white: '#FFFFFF',
    border: '#E8ECF0',
    green: '#7CAE8A',
    amber: '#D4A56A',
  };

  const font = 'IBM Plex Sans, sans-serif';

  const moods = [
    { id: 'thrilled', label: 'Thrilled', emoji: '⚡', color: '#E8C4C4', textColor: '#8B4A4A' },
    { id: 'relaxed', label: 'Relaxed', emoji: '🌿', color: '#C4D4C8', textColor: '#3A5E42' },
    { id: 'curious', label: 'Curious', emoji: '🔭', color: '#C4D0E8', textColor: '#2E4A80' },
    { id: 'melancholy', label: 'Wistful', emoji: '🌙', color: '#D4C4E8', textColor: '#5B3A7A' },
    { id: 'adventurous', label: 'Daring', emoji: '🗺️', color: '#E8D9C4', textColor: '#7A4A1E' },
  ];

  const stories = [
    {
      id: '1',
      title: 'The Last Signal',
      genre: 'Sci-Fi Thriller',
      duration: '5 min',
      episode: 'Ep 3',
      progress: 68,
      cover: '🛸',
      coverColor: '#C4D0E8',
      narrator: 'Mira Chen',
      tagline: 'A distress signal from deep space — and you must decide whether to answer.',
      rating: 4.8,
      listeners: '12.4k',
      moods: ['curious', 'thrilled'],
      choices: [
        { id: 'a', text: 'Broadcast your coordinates', outcome: 'The signal pulses back — it knows you replied.' },
        { id: 'b', text: 'Stay silent, observe', outcome: 'Three hours of silence. Then the lights go out.' },
      ]
    },
    {
      id: '2',
      title: 'Café Nomad',
      genre: 'Romantic Drama',
      duration: '5 min',
      episode: 'Ep 7',
      progress: 0,
      cover: '☕',
      coverColor: '#E8D9C4',
      narrator: 'James Okafor',
      tagline: 'Every city has that one café where strangers become something more.',
      rating: 4.6,
      listeners: '8.1k',
      moods: ['relaxed', 'melancholy'],
      choices: [
        { id: 'a', text: 'Leave a note under the cup', outcome: 'She finds it hours later, just before closing.' },
        { id: 'b', text: 'Walk over and introduce yourself', outcome: 'She looks up. Smiles. "I was hoping you would."' },
      ]
    },
    {
      id: '3',
      title: 'Hollow Ridge',
      genre: 'Mystery',
      duration: '5 min',
      episode: 'Ep 1',
      progress: 22,
      cover: '🌲',
      coverColor: '#C4D4C8',
      narrator: 'Sofia Reyes',
      tagline: 'The town remembers everything. You\'re here to make it forget.',
      rating: 4.9,
      listeners: '19.7k',
      moods: ['curious', 'adventurous'],
      choices: [
        { id: 'a', text: 'Follow the lantern into the woods', outcome: 'The trees thin out. Someone has been here recently.' },
        { id: 'b', text: 'Return to the sheriff\'s office', outcome: 'The door is unlocked. The sheriff is gone.' },
      ]
    },
    {
      id: '4',
      title: 'Mirror Road',
      genre: 'Psychological',
      duration: '6 min',
      episode: 'Ep 2',
      progress: 0,
      cover: '🪞',
      coverColor: '#D4C4E8',
      narrator: 'Alex Winters',
      tagline: 'What if every decision split the timeline — and you could feel the other path?',
      rating: 4.7,
      listeners: '6.3k',
      moods: ['melancholy', 'curious'],
      choices: [
        { id: 'a', text: 'Step through the mirror', outcome: 'The reflection blinks — a half-second after you do.' },
        { id: 'b', text: 'Cover it with the cloth', outcome: 'Silence. The other you watches through the fabric.' },
      ]
    },
    {
      id: '5',
      title: 'Circuit Bones',
      genre: 'Cyberpunk',
      duration: '5 min',
      episode: 'Ep 5',
      progress: 85,
      cover: '🤖',
      coverColor: '#B8C8D8',
      narrator: 'Nyx Protocol',
      tagline: 'In 2049, memories are currency — and yours are worth killing for.',
      rating: 4.5,
      listeners: '14.2k',
      moods: ['thrilled', 'adventurous'],
      choices: [
        { id: 'a', text: 'Sell the memory fragment', outcome: 'The credits hit. So does the guilt.' },
        { id: 'b', text: 'Destroy the chip', outcome: 'Three buyers just lost their investment. They\'ll come for you.' },
      ]
    },
  ];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  const handlePlayEpisode = (story) => {
    setPlayingEpisode(story);
    setIsPlaying(true);
    setProgress(story.progress);
    setChoiceMade(null);
    setShowChoiceResult(false);
    setActiveTab('player');
  };

  const handleChoice = (choice) => {
    setChoiceMade(choice);
    setIsPlaying(false);
    setTimeout(() => setShowChoiceResult(true), 400);
  };

  const toggleSave = (id) => {
    setSavedStories(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const filteredStories = currentMood
    ? stories.filter(s => s.moods.includes(currentMood))
    : stories;

  // ─── Shared Components ───────────────────────────────────────────────────────

  const StoryCard = ({ story, compact = false }) => {
    const isSaved = savedStories.includes(story.id);
    const pressed = pressedBtn === `play-${story.id}`;
    return (
      <div style={{
        background: colors.white,
        borderRadius: 16,
        padding: compact ? '12px' : '16px',
        marginBottom: 12,
        border: `1px solid ${colors.border}`,
        boxShadow: '0 2px 8px rgba(61,79,95,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            width: compact ? 52 : 64, height: compact ? 52 : 64,
            borderRadius: 12, background: story.coverColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: compact ? 22 : 28, flexShrink: 0,
          }}>{story.cover}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: font, fontSize: compact ? 13 : 15, fontWeight: 600, color: colors.charcoal, lineHeight: 1.2 }}>{story.title}</div>
                <div style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight, marginTop: 2 }}>{story.genre} · {story.episode}</div>
              </div>
              <button onClick={() => toggleSave(story.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0,
              }}>
                {React.createElement(isSaved ? window.lucide.BookmarkCheck : window.lucide.Bookmark, {
                  size: 16, color: isSaved ? colors.slate : colors.charcoalLight, strokeWidth: 2,
                })}
              </button>
            </div>
            {!compact && (
              <div style={{ fontFamily: font, fontSize: 12, color: colors.charcoalLight, marginTop: 4, lineHeight: 1.4 }}>{story.tagline}</div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: compact ? 6 : 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {React.createElement(window.lucide.Star, { size: 11, color: colors.amber, fill: colors.amber })}
                <span style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>{story.rating}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {React.createElement(window.lucide.Headphones, { size: 11, color: colors.charcoalLight })}
                <span style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>{story.listeners}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {React.createElement(window.lucide.Clock, { size: 11, color: colors.charcoalLight })}
                <span style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>{story.duration}</span>
              </div>
            </div>
            {story.progress > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ height: 3, background: colors.border, borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${story.progress}%`, background: colors.slate, borderRadius: 99 }} />
                </div>
                <div style={{ fontFamily: font, fontSize: 10, color: colors.charcoalLight, marginTop: 2 }}>{story.progress}% complete</div>
              </div>
            )}
          </div>
        </div>
        <button onClick={() => { handlePress(`play-${story.id}`); handlePlayEpisode(story); }} style={{
          marginTop: 12, width: '100%', background: pressed ? colors.slateDark : colors.slate,
          color: colors.white, border: 'none', borderRadius: 10, padding: '10px 0',
          fontFamily: font, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          transform: pressed ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          {React.createElement(window.lucide.Play, { size: 14, fill: colors.white })}
          {story.progress > 0 ? 'Continue Episode' : 'Start Episode'}
        </button>
      </div>
    );
  };

  // ─── Screen: Home ─────────────────────────────────────────────────────────────

  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: colors.charcoal }}>PlotPulse</div>
            <div style={{ fontFamily: font, fontSize: 13, color: colors.charcoalLight, marginTop: 2 }}>Good morning, Alex ·</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: colors.blush, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18 }}>👤</span>
          </div>
        </div>
      </div>

      {/* Mood Picker */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.charcoal, marginBottom: 10 }}>How are you feeling?</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {moods.map(mood => (
            <button key={mood.id} onClick={() => setCurrentMood(currentMood === mood.id ? null : mood.id)} style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '10px 14px', borderRadius: 12,
              background: currentMood === mood.id ? mood.color : colors.white,
              border: `1.5px solid ${currentMood === mood.id ? mood.textColor + '40' : colors.border}`,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: 18 }}>{mood.emoji}</span>
              <span style={{ fontFamily: font, fontSize: 11, fontWeight: 500, color: currentMood === mood.id ? mood.textColor : colors.charcoalLight }}>{mood.label}</span>
            </button>
          ))}
        </div>
        {currentMood && (
          <div style={{ fontFamily: font, fontSize: 12, color: colors.slate, marginTop: 8 }}>
            Showing {filteredStories.length} stories for your mood
          </div>
        )}
      </div>

      {/* Continue Listening */}
      {stories.some(s => s.progress > 0) && (
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.charcoal, marginBottom: 10 }}>Continue Listening</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {stories.filter(s => s.progress > 0).map(story => (
              <div key={story.id} onClick={() => handlePlayEpisode(story)} style={{
                flexShrink: 0, width: 140, background: colors.white, borderRadius: 14,
                border: `1px solid ${colors.border}`, padding: 12, cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(61,79,95,0.05)',
              }}>
                <div style={{ width: '100%', height: 72, borderRadius: 10, background: story.coverColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 8 }}>{story.cover}</div>
                <div style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: colors.charcoal }}>{story.title}</div>
                <div style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight, marginTop: 2 }}>{story.episode}</div>
                <div style={{ height: 3, background: colors.border, borderRadius: 99, overflow: 'hidden', marginTop: 8 }}>
                  <div style={{ height: '100%', width: `${story.progress}%`, background: colors.slate, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Story List */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.charcoal }}>
            {currentMood ? 'Matched for You' : 'Trending Now'}
          </div>
          <div style={{ fontFamily: font, fontSize: 12, color: colors.slate }}>See all</div>
        </div>
        {filteredStories.map(story => <StoryCard key={story.id} story={story} />)}
      </div>
    </div>
  );

  // ─── Screen: Player ──────────────────────────────────────────────────────────

  const PlayerScreen = () => {
    if (!playingEpisode) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎧</div>
        <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: colors.charcoal, textAlign: 'center' }}>Nothing playing yet</div>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.charcoalLight, textAlign: 'center', marginTop: 6 }}>Pick a story from the home screen to begin your episode.</div>
        <button onClick={() => setActiveTab('home')} style={{
          marginTop: 20, background: colors.slate, color: colors.white, border: 'none',
          borderRadius: 10, padding: '10px 24px', fontFamily: font, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>Browse Stories</button>
      </div>
    );

    const story = playingEpisode;
    const atChoicePoint = progress >= 72 && !choiceMade;
    const displayProgress = Math.min(progress, 72);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {/* Hero */}
        <div style={{ background: story.coverColor, padding: '24px 20px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 10 }}>{story.cover}</div>
          <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: colors.charcoal }}>{story.title}</div>
          <div style={{ fontFamily: font, fontSize: 13, color: colors.charcoalLight, marginTop: 4 }}>{story.genre} · {story.episode} · Narrated by {story.narrator}</div>
          <div style={{ fontFamily: font, fontSize: 12, color: colors.charcoalLight, marginTop: 8, lineHeight: 1.5, maxWidth: 280, margin: '8px auto 0' }}>{story.tagline}</div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          {/* Progress */}
          <div style={{ background: colors.white, borderRadius: 14, padding: 16, border: `1px solid ${colors.border}`, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>Episode progress</span>
              <span style={{ fontFamily: font, fontSize: 11, fontWeight: 600, color: colors.slate }}>{Math.round(displayProgress)}%</span>
            </div>
            <div style={{ height: 6, background: colors.border, borderRadius: 99, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ height: '100%', width: `${displayProgress}%`, background: colors.slate, borderRadius: 99, transition: 'width 0.3s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>0:00</span>
              <button onClick={() => { handlePress('playpause'); setIsPlaying(p => !p); }} style={{
                width: 48, height: 48, borderRadius: 24,
                background: pressedBtn === 'playpause' ? colors.slateDark : colors.slate,
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.15s', transform: pressedBtn === 'playpause' ? 'scale(0.94)' : 'scale(1)',
              }}>
                {React.createElement(isPlaying ? window.lucide.Pause : window.lucide.Play, { size: 20, color: colors.white, fill: colors.white })}
              </button>
              <span style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>5:00</span>
            </div>
          </div>

          {/* Smart Recap */}
          <div style={{ background: colors.blushLight, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${colors.blush}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              {React.createElement(window.lucide.Sparkles, { size: 14, color: colors.slateDark })}
              <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: colors.slateDark }}>Smart Recap</span>
            </div>
            <div style={{ fontFamily: font, fontSize: 12, color: colors.charcoal, lineHeight: 1.5 }}>
              {story.id === '1' && "Previously: You intercepted an encoded signal from the Kepler-22 belt. Dr. Osei's decryption revealed a partial set of coordinates — and something breathing in the static."}
              {story.id === '3' && "Previously: You arrived in Hollow Ridge under cover of a storm. The innkeeper looked away when you mentioned the disappeared hiker. There was mud on her boots."}
              {story.id === '5' && "Previously: Vex offered 800 credits for the memory chip. You stalled. Now you're in the data market and three buyers are watching your every move."}
              {story.id === '2' && "This is your first episode. The story begins now."}
              {story.id === '4' && "Previously: You moved into the Ashwood apartment on the day of the solstice. The mirror in the hallway was covered when you arrived. Nobody told you why."}
            </div>
          </div>

          {/* Choice Point */}
          {atChoicePoint && !showChoiceResult && (
            <div style={{ background: colors.white, borderRadius: 14, padding: 16, border: `1.5px solid ${colors.slate}`, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                {React.createElement(window.lucide.GitBranch, { size: 14, color: colors.slate })}
                <span style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: colors.charcoal }}>Your choice shapes what happens next</span>
              </div>
              {story.choices.map((choice, i) => (
                <button key={choice.id} onClick={() => handleChoice(choice)} style={{
                  width: '100%', textAlign: 'left', background: colors.bg,
                  border: `1.5px solid ${colors.border}`, borderRadius: 10, padding: '12px 14px',
                  marginBottom: i < story.choices.length - 1 ? 8 : 0,
                  fontFamily: font, fontSize: 13, color: colors.charcoal, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                  <span style={{ color: colors.slate, fontWeight: 700, marginRight: 6 }}>{String.fromCharCode(65 + i)}.</span>
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {/* Choice Result */}
          {showChoiceResult && choiceMade && (
            <div style={{ background: colors.charcoal, borderRadius: 14, padding: 16, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {React.createElement(window.lucide.CheckCircle2, { size: 14, color: colors.blush })}
                <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: colors.blush }}>You chose: {choiceMade.text}</span>
              </div>
              <div style={{ fontFamily: font, fontSize: 13, color: '#E8ECF0', lineHeight: 1.5, fontStyle: 'italic' }}>"{choiceMade.outcome}"</div>
              <button onClick={() => { setProgress(73); setIsPlaying(true); }} style={{
                marginTop: 12, background: colors.slate, color: colors.white, border: 'none',
                borderRadius: 8, padding: '8px 16px', fontFamily: font, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {React.createElement(window.lucide.Play, { size: 12, fill: colors.white })}
                Continue the story
              </button>
            </div>
          )}

          {/* Episode metadata */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: colors.white, borderRadius: 12, padding: 12, border: `1px solid ${colors.border}`, textAlign: 'center' }}>
              {React.createElement(window.lucide.Star, { size: 16, color: colors.amber, fill: colors.amber, style: { margin: '0 auto 4px' } })}
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: colors.charcoal }}>{story.rating}</div>
              <div style={{ fontFamily: font, fontSize: 10, color: colors.charcoalLight }}>Rating</div>
            </div>
            <div style={{ flex: 1, background: colors.white, borderRadius: 12, padding: 12, border: `1px solid ${colors.border}`, textAlign: 'center' }}>
              {React.createElement(window.lucide.Headphones, { size: 16, color: colors.slate, style: { margin: '0 auto 4px' } })}
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: colors.charcoal }}>{story.listeners}</div>
              <div style={{ fontFamily: font, fontSize: 10, color: colors.charcoalLight }}>Listeners</div>
            </div>
            <div style={{ flex: 1, background: colors.white, borderRadius: 12, padding: 12, border: `1px solid ${colors.border}`, textAlign: 'center' }}>
              {React.createElement(window.lucide.GitBranch, { size: 16, color: colors.green, style: { margin: '0 auto 4px' } })}
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: colors.charcoal }}>2</div>
              <div style={{ fontFamily: font, fontSize: 10, color: colors.charcoalLight }}>Branches</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Screen: Library ─────────────────────────────────────────────────────────

  const LibraryScreen = () => {
    const [libTab, setLibTab] = useState('saved');
    const saved = stories.filter(s => savedStories.includes(s.id));
    const inProgress = stories.filter(s => s.progress > 0 && s.progress < 100);
    const completed = stories.filter(s => s.progress >= 85);

    const tabs = [
      { id: 'saved', label: 'Saved', count: saved.length },
      { id: 'progress', label: 'In Progress', count: inProgress.length },
      { id: 'finished', label: 'Finished', count: completed.length },
    ];

    const listData = libTab === 'saved' ? saved : libTab === 'progress' ? inProgress : completed;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: colors.charcoal, marginBottom: 4 }}>My Library</div>
          <div style={{ fontFamily: font, fontSize: 13, color: colors.charcoalLight }}>{savedStories.length} stories saved · {inProgress.length} in progress</div>
        </div>

        {/* Offline Banner */}
        <div style={{ margin: '16px 20px 0', background: colors.blushLight, borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${colors.blush}` }}>
          {React.createElement(window.lucide.WifiOff, { size: 16, color: colors.slateDark })}
          <div>
            <div style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: colors.charcoal }}>Offline Ready</div>
            <div style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>3 episodes downloaded for your commute</div>
          </div>
          <button style={{ marginLeft: 'auto', background: colors.slate, color: colors.white, border: 'none', borderRadius: 8, padding: '6px 12px', fontFamily: font, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
            Manage
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, margin: '16px 20px 0', background: colors.border, borderRadius: 10, padding: 3 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setLibTab(tab.id)} style={{
              flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
              background: libTab === tab.id ? colors.white : 'transparent',
              fontFamily: font, fontSize: 12, fontWeight: libTab === tab.id ? 600 : 400,
              color: libTab === tab.id ? colors.charcoal : colors.charcoalLight,
              boxShadow: libTab === tab.id ? '0 1px 4px rgba(61,79,95,0.1)' : 'none',
              transition: 'all 0.2s',
            }}>
              {tab.label} {tab.count > 0 && <span style={{ color: colors.slate }}>({tab.count})</span>}
            </button>
          ))}
        </div>

        <div style={{ padding: '14px 20px 0' }}>
          {listData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📚</div>
              <div style={{ fontFamily: font, fontSize: 14, color: colors.charcoalLight }}>Nothing here yet</div>
            </div>
          ) : (
            listData.map(story => <StoryCard key={story.id} story={story} compact />)
          )}
        </div>
      </div>
    );
  };

  // ─── Screen: Discover ────────────────────────────────────────────────────────

  const DiscoverScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const genres = ['All', 'Sci-Fi', 'Mystery', 'Romance', 'Thriller', 'Psychological', 'Cyberpunk'];
    const [activeGenre, setActiveGenre] = useState('All');

    const filtered = stories.filter(s => {
      const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchGenre = activeGenre === 'All' || s.genre.includes(activeGenre);
      return matchSearch && matchGenre;
    });

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '20px 20px 12px' }}>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: colors.charcoal, marginBottom: 14 }}>Discover</div>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
              {React.createElement(window.lucide.Search, { size: 15, color: colors.charcoalLight })}
            </div>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search stories, genres, narrators..."
              style={{
                width: '100%', padding: '11px 12px 11px 36px',
                background: colors.white, border: `1px solid ${colors.border}`, borderRadius: 12,
                fontFamily: font, fontSize: 13, color: colors.charcoal, outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Genre filter */}
        <div style={{ paddingLeft: 20, paddingBottom: 8, display: 'flex', gap: 8, overflowX: 'auto' }}>
          {genres.map(genre => (
            <button key={genre} onClick={() => setActiveGenre(genre)} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 99,
              background: activeGenre === genre ? colors.charcoal : colors.white,
              border: `1px solid ${activeGenre === genre ? colors.charcoal : colors.border}`,
              fontFamily: font, fontSize: 12, fontWeight: 500,
              color: activeGenre === genre ? colors.white : colors.charcoalLight,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>{genre}</button>
          ))}
        </div>

        {/* Featured */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.charcoal, marginBottom: 10 }}>Editor's Pick</div>
          <div onClick={() => handlePlayEpisode(stories[2])} style={{
            background: stories[2].coverColor, borderRadius: 16, padding: 20, cursor: 'pointer',
            marginBottom: 16, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>{stories[2].cover}</div>
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: colors.charcoal }}>{stories[2].title}</div>
            <div style={{ fontFamily: font, fontSize: 12, color: colors.charcoalLight, marginTop: 4 }}>{stories[2].genre}</div>
            <div style={{ fontFamily: font, fontSize: 13, color: colors.charcoal, marginTop: 6, lineHeight: 1.5 }}>{stories[2].tagline}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
              <div style={{ background: colors.slate, color: colors.white, borderRadius: 99, padding: '6px 16px', fontFamily: font, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                {React.createElement(window.lucide.Play, { size: 12, fill: colors.white })} Listen Now
              </div>
              <div style={{ fontFamily: font, fontSize: 12, color: colors.charcoalLight }}>{stories[2].listeners} listeners this week</div>
            </div>
          </div>

          {filtered.map(story => <StoryCard key={story.id} story={story} compact />)}
        </div>
      </div>
    );
  };

  // ─── Screen: Profile ─────────────────────────────────────────────────────────

  const ProfileScreen = () => {
    const [notifOn, setNotifOn] = useState(true);
    const [offlineOn, setOfflineOn] = useState(true);
    const [autoPlay, setAutoPlay] = useState(false);

    const Toggle = ({ value, onChange }) => (
      <div onClick={() => onChange(!value)} style={{
        width: 44, height: 24, borderRadius: 12,
        background: value ? colors.slate : colors.border,
        position: 'relative', cursor: 'pointer', transition: 'background 0.25s',
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: 9, background: colors.white,
          position: 'absolute', top: 3, left: value ? 23 : 3,
          transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }} />
      </div>
    );

    const stats = [
      { label: 'Episodes', value: '47', icon: '🎧' },
      { label: 'Hours', value: '12.3', icon: '⏱️' },
      { label: 'Choices', value: '94', icon: '🔀' },
      { label: 'Streak', value: '8 days', icon: '🔥' },
    ];

    const preferences = ['Sci-Fi', 'Mystery', 'Psychological'];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {/* Profile Hero */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, background: colors.blush, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>👤</div>
            <div>
              <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: colors.charcoal }}>Alex Rivera</div>
              <div style={{ fontFamily: font, fontSize: 12, color: colors.charcoalLight }}>Member since Jan 2025 · Free Plan</div>
              <div style={{ fontFamily: font, fontSize: 12, color: colors.slate, marginTop: 2, fontWeight: 500 }}>Upgrade to Premium →</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
            {stats.map(stat => (
              <div key={stat.label} style={{ background: colors.white, borderRadius: 12, padding: '10px 8px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{stat.icon}</div>
                <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: colors.charcoal }}>{stat.value}</div>
                <div style={{ fontFamily: font, fontSize: 10, color: colors.charcoalLight }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Prefs */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.charcoal, marginBottom: 10 }}>Genre Preferences</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Sci-Fi', 'Mystery', 'Psychological', 'Romance', 'Cyberpunk', 'Thriller'].map(g => (
              <div key={g} style={{
                padding: '6px 12px', borderRadius: 99,
                background: preferences.includes(g) ? colors.slate : colors.white,
                border: `1px solid ${preferences.includes(g) ? colors.slate : colors.border}`,
                fontFamily: font, fontSize: 12, fontWeight: 500,
                color: preferences.includes(g) ? colors.white : colors.charcoalLight,
              }}>{g}</div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.charcoal, marginBottom: 10 }}>Settings</div>
          <div style={{ background: colors.white, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            {[
              { label: 'Episode Notifications', sub: 'Get notified when new episodes drop', value: notifOn, onChange: setNotifOn, icon: window.lucide.Bell },
              { label: 'Offline Downloads', sub: 'Auto-save episodes for commutes', value: offlineOn, onChange: setOfflineOn, icon: window.lucide.Download },
              { label: 'Auto-play Next Episode', sub: 'Continue to next chapter automatically', value: autoPlay, onChange: setAutoPlay, icon: window.lucide.FastForward },
            ].map((item, i, arr) => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  {React.createElement(item.icon, { size: 16, color: colors.slate })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: colors.charcoal }}>{item.label}</div>
                  <div style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>{item.sub}</div>
                </div>
                <Toggle value={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </div>

        {/* Listening History */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.charcoal, marginBottom: 10 }}>Recent History</div>
          {stories.slice(0, 3).map(story => (
            <div key={story.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: story.coverColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{story.cover}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: colors.charcoal }}>{story.title}</div>
                <div style={{ fontFamily: font, fontSize: 11, color: colors.charcoalLight }}>{story.episode} · {story.duration}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 14, color: colors.charcoalLight })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Nav ──────────────────────────────────────────────────────────────────────

  const navItems = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'player', label: 'Now Playing', icon: window.lucide.Headphones },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'library', label: 'Library', icon: window.lucide.Library },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = { home: HomeScreen, player: PlayerScreen, discover: DiscoverScreen, library: LibraryScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeTab];

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font }}>
      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, background: colors.bg,
        borderRadius: 48, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Status Bar */}
        <div style={{ height: 44, background: colors.bg, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 6px', flexShrink: 0 }}>
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: colors.charcoal }}>{currentTime}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: colors.charcoal })}
            {React.createElement(window.lucide.Battery, { size: 14, color: colors.charcoal })}
          </div>
        </div>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#0a0a0a', borderRadius: 20, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {isPlaying && (
            <>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: colors.green }} />
              <span style={{ fontFamily: font, fontSize: 9, color: '#aaa', fontWeight: 500 }}>PlotPulse</span>
              {React.createElement(window.lucide.Music, { size: 10, color: '#aaa' })}
            </>
          )}
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 80, background: colors.white,
          borderTop: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'flex-start', paddingTop: 8,
        }}>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            const hasIndicator = item.id === 'player' && isPlaying;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', position: 'relative',
              }}>
                {hasIndicator && (
                  <div style={{ position: 'absolute', top: 2, right: '28%', width: 7, height: 7, borderRadius: 3.5, background: colors.green, border: `2px solid ${colors.white}` }} />
                )}
                {React.createElement(item.icon, { size: 20, color: isActive ? colors.slate : colors.charcoalLight, strokeWidth: isActive ? 2.5 : 1.8 })}
                <span style={{ fontFamily: font, fontSize: 10, fontWeight: isActive ? 600 : 400, color: isActive ? colors.slate : colors.charcoalLight }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
