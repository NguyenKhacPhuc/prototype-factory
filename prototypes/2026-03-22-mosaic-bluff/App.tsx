function App() {
  const { useState, useEffect } = React;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap');
    * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 2px; }
    button { font-family: 'Plus Jakarta Sans', sans-serif; }
  `;

  const themes = {
    light: {
      bg: '#F4F1FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE9FE',
      text: '#180F36',
      textSecondary: '#5A4B85',
      textMuted: '#9B91B8',
      primary: '#7C3AED',
      primaryLight: '#A78BFA',
      accent: '#EC4899',
      secondary: '#F97316',
      border: '#E4DCFF',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      navBg: '#FFFFFF',
      tagBg: '#EDE9FE',
      tagText: '#7C3AED',
      cardShadow: '0 2px 14px rgba(0,0,0,0.07)',
      heroGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 60%, #EC4899 100%)',
      drillGrad: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
    },
    dark: {
      bg: '#0C0A1F',
      surface: '#161230',
      surfaceAlt: '#1E1945',
      text: '#EFE9FF',
      textSecondary: '#A497D0',
      textMuted: '#5C5180',
      primary: '#A78BFA',
      primaryLight: '#C4B5FD',
      accent: '#F472B6',
      secondary: '#FB923C',
      border: '#27215A',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
      navBg: '#100D28',
      tagBg: '#27215A',
      tagText: '#C4B5FD',
      cardShadow: '0 2px 14px rgba(0,0,0,0.35)',
      heroGrad: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 60%, #BE185D 100%)',
      drillGrad: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
    },
  };

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  // --- Game state ---
  const [gamePhase, setGamePhase] = useState('scenario');
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selIntent, setSelIntent] = useState(null);
  const [selTone, setSelTone] = useState(null);
  const [selContext, setSelContext] = useState(null);
  const [selResponse, setSelResponse] = useState(null);
  const [scoreAnim, setScoreAnim] = useState(false);

  // --- Drill state ---
  const [drillPhase, setDrillPhase] = useState('ready');
  const [drillTime, setDrillTime] = useState(180);
  const [drillRound, setDrillRound] = useState(0);
  const [drillScore, setDrillScore] = useState(0);
  const [drillAnswered, setDrillAnswered] = useState(null);

  const scenarios = [
    {
      id: 1, category: 'Work', catColor: '#6366F1',
      situation: 'After you miss a project deadline, your coworker posts in the team Slack:',
      message: '"No worries, I\'ll just handle it myself."',
      author: 'Jordan (teammate)', difficulty: 'Medium',
      intentCards: [
        { id:'i1', label:'Passive Aggression', desc:'Expressing frustration through forced martyrdom', correct: true },
        { id:'i2', label:'Genuine Offer', desc:'They have bandwidth and are simply volunteering', correct: false },
        { id:'i3', label:'Boundary Setting', desc:'Declining to collaborate any further on this task', correct: false },
      ],
      toneCards: [
        { id:'t1', label:'Cold & Clipped', desc:'Minimum words — deliberate, loaded brevity', correct: true },
        { id:'t2', label:'Warm & Reassuring', desc:'Calm support, wanting to ease your stress', correct: false },
        { id:'t3', label:'Professional Neutral', desc:'Task-focused, no real emotional subtext', correct: false },
      ],
      contextCards: [
        { id:'c1', label:'Pattern of Lateness', desc:'This is the 3rd missed deadline — Jordan\'s patience has worn thin', correct: true },
        { id:'c2', label:'First Occurrence', desc:'This is unusual — Jordan is just being practical', correct: false },
        { id:'c3', label:'Manager Is Watching', desc:'Your boss is also in this Slack channel', correct: false },
      ],
      responses: [
        { id:'r1', text:'"Sorry about that, I\'ll catch it next time."', score: 44, feedback:'Acknowledges the issue but dismisses it too quickly. Jordan may feel even less heard.' },
        { id:'r2', text:'"Let me take it back — I can have it done by 3pm today."', score: 94, feedback:'Owns the mistake, offers a concrete fix, removes the burden entirely. Highly defusing.' },
        { id:'r3', text:'"Thanks for stepping up, Jordan — you\'re a lifesaver!"', score: 18, feedback:'Catastrophically misreads the room. Treating passive aggression as generosity will escalate.' },
        { id:'r4', text:'"Why didn\'t you just ping me first?"', score: 12, feedback:'Deflects blame and sounds defensive. This reply almost certainly starts a conflict.' },
      ],
      aiNote: '"No worries" delivered without warmth, in a public channel rather than a DM, is one of the clearest passive-aggressive signals in workplace messaging. The winning move decodes the real need: ownership + a concrete path forward. Nothing else addresses what Jordan actually wants to see.',
      best: 'r2',
    },
    {
      id: 2, category: 'Dating', catColor: '#EC4899',
      situation: 'After a disagreement about weekend plans, your partner texts you:',
      message: '"It\'s fine. Do whatever you want."',
      author: 'Your partner', difficulty: 'Hard',
      intentCards: [
        { id:'i1', label:'Emotional Withdrawal', desc:'Pulling back to signal hurt — they\'ve stopped advocating', correct: true },
        { id:'i2', label:'True Indifference', desc:'Genuinely doesn\'t care and is giving you real freedom', correct: false },
        { id:'i3', label:'Testing You', desc:'Checking if you\'ll push back or just take the pass', correct: false },
      ],
      toneCards: [
        { id:'t1', label:'Flat & Resigned', desc:'The energy has gone — deliberate absence of warmth', correct: true },
        { id:'t2', label:'Generous & Warm', desc:'Flexible, open, accommodating your preferences', correct: false },
        { id:'t3', label:'Playful', desc:'Light and teasing — telling you to have fun', correct: false },
      ],
      contextCards: [
        { id:'c1', label:'Repeated Cancellations', desc:'You\'ve changed or cancelled plans several times recently', correct: true },
        { id:'c2', label:'They\'re Busy', desc:'They genuinely have their own things to handle this weekend', correct: false },
        { id:'c3', label:'Their Normal Style', desc:'They\'ve always been easygoing about weekend decisions', correct: false },
      ],
      responses: [
        { id:'r1', text:'"Great! I\'ll just hang with the guys then."', score: 6, feedback:'Catastrophically misreads the situation. You are walking into an argument.' },
        { id:'r2', text:'"Wait — are you actually okay with it?"', score: 79, feedback:'Opens real conversation. Shows you noticed the signal. Strong play.' },
        { id:'r3', text:'"I can tell something\'s off. What do you actually want to do?"', score: 96, feedback:'Names the emotional state without accusation and invites honesty. Best possible move.' },
        { id:'r4', text:'"You said it\'s fine, so don\'t be upset later."', score: 3, feedback:'Using their words against them. This always backfires.' },
      ],
      aiNote: '"It\'s fine" + "do whatever you want" together is one of the most universally recognized emotional retreat phrases. The speaker has stopped fighting for what they want — not because they don\'t care, but because they feel unheard. The winning response gently names what\'s beneath the surface without forcing a confrontation.',
      best: 'r3',
    },
    {
      id: 3, category: 'Family', catColor: '#10B981',
      situation: 'You announce a major career change at family dinner. Your mom responds:',
      message: '"Oh. Well... you know what\'s best for yourself, I suppose."',
      author: 'Your mom', difficulty: 'Hard',
      intentCards: [
        { id:'i1', label:'Masked Disapproval', desc:'Communicating doubt while maintaining plausible deniability', correct: true },
        { id:'i2', label:'Reluctant Support', desc:'Struggling to express support but genuinely trying', correct: false },
        { id:'i3', label:'Sincere Affirmation', desc:'Trusting your judgment and stepping back graciously', correct: false },
      ],
      toneCards: [
        { id:'t1', label:'Loaded Pause', desc:'The "Oh" does heavy lifting — leaking the real reaction', correct: true },
        { id:'t2', label:'Warm Acceptance', desc:'Processing the news openly and positively', correct: false },
        { id:'t3', label:'Businesslike', desc:'Neutral, just acknowledging the information', correct: false },
      ],
      contextCards: [
        { id:'c1', label:'She Wanted Stability', desc:'She\'s always pushed the "safe career" narrative for you', correct: true },
        { id:'c2', label:'Just Surprised', desc:'She literally just heard this — still processing', correct: false },
        { id:'c3', label:'Audience Present', desc:'Other family members are watching how she reacts', correct: false },
      ],
      responses: [
        { id:'r1', text:'"You don\'t sound convinced."', score: 68, feedback:'Calls out the subtext directly. Can feel confrontational at the dinner table.' },
        { id:'r2', text:'"I\'d love your actual thoughts when you\'re ready."', score: 90, feedback:'Opens space without pressure. Shows you value her real opinion. Very strong.' },
        { id:'r3', text:'"You think it\'s a mistake, don\'t you?"', score: 52, feedback:'Directness has merit but leading with assumption puts her on defense.' },
        { id:'r4', text:'"I knew you\'d react like this."', score: 8, feedback:'Dismisses her feelings and turns dinner into a battleground.' },
      ],
      aiNote: '"I suppose" is a linguistic hedge signaling disapproval while allowing the speaker to claim neutrality later. The "Oh" pause at the start leaks the genuine unfiltered reaction before the censor kicks in. The winning players don\'t argue — they create conditions for an honest conversation later, not in public.',
      best: 'r2',
    },
  ];

  const drills = [
    {
      q: 'Your friend hasn\'t replied to 3 messages in 2 weeks, then texts "hey stranger!" — what\'s most likely happening?',
      opts: [
        { text:'They forgot and feel guilty — humor is a social lubricant to defuse the awkward reentry', correct: true },
        { text:'They were testing whether you\'d reach out first', correct: false },
        { text:'They genuinely think the friendship is totally fine', correct: false },
        { text:'They\'re being subtly passive aggressive', correct: false },
      ],
    },
    {
      q: 'In a work meeting, someone says "That\'s… an interesting approach." — what\'s the emotional cue?',
      opts: [
        { text:'Genuine intrigue and curiosity about your idea', correct: false },
        { text:'Polite skepticism — they have doubts but aren\'t voicing them directly', correct: true },
        { text:'Enthusiasm they\'re holding back for the group', correct: false },
        { text:'They want to explore and build on it', correct: false },
      ],
    },
    {
      q: 'Someone responds to your detailed explanation with just "k." — what\'s the most accurate read?',
      opts: [
        { text:'They\'re busy and shorthand is just their texting style', correct: false },
        { text:'Mildly annoyed or disengaged — acknowledged but unconvinced', correct: true },
        { text:'Confused and need more context', correct: false },
        { text:'Fully on board and ready to move forward', correct: false },
      ],
    },
    {
      q: 'Your colleague says "I\'ll let you take the lead on that" in front of leadership. What\'s likely true?',
      opts: [
        { text:'They fully trust you with the task', correct: false },
        { text:'Strategic distancing — they sense risk and want cover if it fails', correct: true },
        { text:'They\'re being generous about credit', correct: false },
        { text:'They\'re genuinely too busy to take it on', correct: false },
      ],
    },
    {
      q: 'A friend keeps saying "we should hang out soon!" but never follows up with plans. What\'s the signal?',
      opts: [
        { text:'They want to but are overwhelmed with their life right now', correct: false },
        { text:'Maintaining social warmth without commitment — a polite holding pattern', correct: true },
        { text:'They\'re waiting for you to initiate the actual plan', correct: false },
        { text:'Testing whether you\'ll chase them', correct: false },
      ],
    },
  ];

  // Drill timer
  useEffect(() => {
    if (drillPhase !== 'active') return;
    if (drillTime <= 0) { setDrillPhase('complete'); return; }
    const t = setTimeout(() => setDrillTime(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [drillPhase, drillTime]);

  // Auto-complete drill when all rounds done
  useEffect(() => {
    if (drillPhase === 'active' && drillRound >= drills.length) {
      setDrillPhase('complete');
    }
  }, [drillRound, drillPhase]);

  const currentScenario = scenarios[scenarioIdx];

  const readScore = () => {
    const i = selIntent?.correct ? 1 : 0;
    const to = selTone?.correct ? 1 : 0;
    const c = selContext?.correct ? 1 : 0;
    return selIntent && selTone && selContext ? Math.round((i + to + c) / 3 * 100) : 0;
  };

  const fmtTime = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const resetGame = (nextIdx) => {
    setScenarioIdx(nextIdx !== undefined ? nextIdx : (scenarioIdx + 1) % scenarios.length);
    setGamePhase('scenario');
    setSelIntent(null); setSelTone(null); setSelContext(null); setSelResponse(null);
  };

  const selectResponse = (r) => {
    setSelResponse(r);
    setGamePhase('result');
    setScoreAnim(true);
    setTimeout(() => setScoreAnim(false), 600);
  };

  const cardBtn = (selected, color) => ({
    width: '100%', display: 'block', background: selected ? `${color}18` : t.surface,
    border: `2px solid ${selected ? color : t.border}`,
    borderRadius: 12, padding: '11px 13px', marginBottom: 8, cursor: 'pointer',
    textAlign: 'left', transition: 'all 0.18s', fontFamily: 'inherit',
  });

  // ─────────────── HOME SCREEN ───────────────
  const HomeScreen = () => {
    const stats = [
      { label:'Win Rate', val:'73%', icon: window.lucide.TrendingUp, color: t.success },
      { label:'Streak', val:'12d', icon: window.lucide.Flame, color: t.secondary },
      { label:'Rounds', val:'148', icon: window.lucide.Layers, color: t.primary },
      { label:'Rank', val:'#204', icon: window.lucide.Trophy, color:'#F59E0B' },
    ];
    const cats = [
      { name:'Work', emoji:'💼', color:'#6366F1', pct:74 },
      { name:'Dating', emoji:'💕', color:'#EC4899', pct:61 },
      { name:'Family', emoji:'🏠', color:'#10B981', pct:55 },
      { name:'Friends', emoji:'👥', color:'#F97316', pct:68 },
    ];
    const recent = [
      { title:'The "I\'m Fine" Text', cat:'Dating', score:88, result:'Defused' },
      { title:'Team Credit Grab', cat:'Work', score:72, result:'Navigated' },
      { title:'Dinner Guilt Trip', cat:'Family', score:45, result:'Escalated' },
    ];

    return (
      <div style={{ height:'100%', overflowY:'auto', background: t.bg, paddingBottom:20 }}>
        {/* Header */}
        <div style={{ background: t.heroGrad, padding:'18px 20px 26px', borderRadius:'0 0 24px 24px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <p style={{ color:'rgba(255,255,255,0.65)', fontSize:12, margin:0 }}>Good morning,</p>
              <h2 style={{ color:'#fff', fontSize:21, fontWeight:800, margin:'2px 0 0' }}>Alex Rivera</h2>
            </div>
            <div style={{ width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,0.18)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:14,fontWeight:700 }}>AR</div>
          </div>
          <div style={{ marginTop:14, background:'rgba(255,255,255,0.14)', borderRadius:12, padding:'9px 13px', display:'flex', alignItems:'center', gap:8 }}>
            {React.createElement(window.lucide.Flame,{size:16,color:'#FCD34D'})}
            <span style={{ color:'#fff', fontSize:12, fontWeight:600 }}>12-day streak! Keep reading the room.</span>
          </div>
        </div>

        <div style={{ padding:'0 16px' }}>
          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginTop:14 }}>
            {stats.map((s,i) => (
              <div key={i} style={{ background:t.surface, borderRadius:12, padding:'10px 6px', textAlign:'center', boxShadow:t.cardShadow }}>
                {React.createElement(s.icon,{size:15,color:s.color})}
                <div style={{ color:t.text, fontSize:15, fontWeight:800, marginTop:3 }}>{s.val}</div>
                <div style={{ color:t.textMuted, fontSize:9.5, fontWeight:600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Featured Scenario */}
          <div style={{ marginTop:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <h3 style={{ color:t.text, fontSize:14, fontWeight:800, margin:0 }}>Today's Featured Scenario</h3>
              <span style={{ color:t.primary, fontSize:11, fontWeight:700 }}>Work · #47</span>
            </div>
            <div style={{ background:t.surface, borderRadius:16, padding:15, boxShadow:t.cardShadow, border:`1px solid ${t.border}` }}>
              <div style={{ display:'flex', gap:6, marginBottom:11 }}>
                <span style={{ background: isDark?'rgba(99,102,241,0.18)':'#EEF2FF', color:'#6366F1', borderRadius:8, padding:'3px 9px', fontSize:11, fontWeight:700 }}>⚡ MEDIUM</span>
                <span style={{ background:t.surfaceAlt, color:t.textMuted, borderRadius:8, padding:'3px 9px', fontSize:11, fontWeight:600 }}>3 card types</span>
              </div>
              <p style={{ color:t.textSecondary, fontSize:12.5, margin:'0 0 10px', lineHeight:1.55 }}>
                After you miss a project deadline, your coworker posts in the team Slack channel:
              </p>
              <div style={{ background: isDark?'rgba(124,58,237,0.14)':'#F5F3FF', borderRadius:10, padding:'11px 13px', borderLeft:`3px solid ${t.primary}` }}>
                <p style={{ color:t.text, fontSize:13.5, fontWeight:600, margin:0, fontStyle:'italic', lineHeight:1.5 }}>
                  "No worries, I'll just handle it myself."
                </p>
              </div>
              <button onClick={() => { setScenarioIdx(0); resetGame(0); setActiveTab('play'); }}
                style={{ marginTop:13, width:'100%', background:t.heroGrad, border:'none', borderRadius:10, color:'#fff', fontSize:13.5, fontWeight:700, padding:'11px 0', cursor:'pointer' }}>
                Play This Round →
              </button>
            </div>
          </div>

          {/* Categories */}
          <div style={{ marginTop:18 }}>
            <h3 style={{ color:t.text, fontSize:14, fontWeight:800, margin:'0 0 11px' }}>Browse Categories</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {cats.map((c,i) => (
                <div key={i} style={{ background:t.surface, borderRadius:14, padding:13, boxShadow:t.cardShadow, border:`1px solid ${t.border}`, cursor:'pointer' }}>
                  <div style={{ fontSize:22, marginBottom:5 }}>{c.emoji}</div>
                  <div style={{ color:t.text, fontSize:13, fontWeight:700 }}>{c.name}</div>
                  <div style={{ color:t.textMuted, fontSize:10.5, marginTop:1 }}>{Math.floor(Math.random()*8)+14} scenarios</div>
                  <div style={{ marginTop:8, height:3, background:`${c.color}25`, borderRadius:2 }}>
                    <div style={{ width:`${c.pct}%`, height:'100%', background:c.color, borderRadius:2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent */}
          <div style={{ marginTop:18 }}>
            <h3 style={{ color:t.text, fontSize:14, fontWeight:800, margin:'0 0 11px' }}>Recent Rounds</h3>
            {recent.map((r,i) => (
              <div key={i} style={{ background:t.surface, borderRadius:12, padding:'11px 13px', marginBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:t.cardShadow, border:`1px solid ${t.border}` }}>
                <div>
                  <div style={{ color:t.text, fontSize:13, fontWeight:600 }}>{r.title}</div>
                  <div style={{ color:t.textMuted, fontSize:11, marginTop:1 }}>{r.cat}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:15, fontWeight:800, color: r.score>=80?t.success:r.score>=60?t.warning:t.danger }}>{r.score}</div>
                  <div style={{ fontSize:10, fontWeight:700, color: r.result==='Defused'?t.success:r.result==='Navigated'?t.warning:t.danger }}>{r.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─────────────── PLAY SCREEN ───────────────
  const PlayScreen = () => {
    const sc = currentScenario;

    if (gamePhase === 'scenario') return (
      <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'16px 16px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:15 }}>
          <div>
            <h2 style={{ color:t.text, fontSize:18, fontWeight:800, margin:0 }}>Game Round</h2>
            <p style={{ color:t.textMuted, fontSize:12, margin:'2px 0 0' }}>Scenario {scenarioIdx+1} of {scenarios.length}</p>
          </div>
          <span style={{ background:`${sc.catColor}20`, color:sc.catColor, borderRadius:20, padding:'4px 12px', fontSize:11, fontWeight:700 }}>{sc.category}</span>
        </div>

        {/* Message card */}
        <div style={{ background:`linear-gradient(135deg, ${sc.catColor}14, ${t.surface})`, border:`1px solid ${sc.catColor}35`, borderRadius:18, padding:17, marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:12 }}>
            <div style={{ width:34,height:34,borderRadius:'50%',background:`${sc.catColor}28`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15 }}>👤</div>
            <div>
              <div style={{ color:t.text, fontSize:12, fontWeight:600 }}>{sc.author}</div>
              <div style={{ color:t.textMuted, fontSize:10 }}>just now</div>
            </div>
          </div>
          <p style={{ color:t.textSecondary, fontSize:12.5, margin:'0 0 11px', lineHeight:1.6 }}>{sc.situation}</p>
          <div style={{ background: isDark?'rgba(0,0,0,0.28)':'rgba(255,255,255,0.85)', borderRadius:11, padding:13, borderLeft:`4px solid ${sc.catColor}` }}>
            <p style={{ color:t.text, fontSize:14.5, fontWeight:600, margin:0, lineHeight:1.5, fontStyle:'italic' }}>{sc.message}</p>
          </div>
        </div>

        {/* Difficulty pills */}
        <div style={{ display:'flex', gap:7, alignItems:'center', marginBottom:14 }}>
          <span style={{ color:t.textMuted, fontSize:11.5 }}>Difficulty:</span>
          {['Easy','Medium','Hard'].map(d => (
            <span key={d} style={{
              background: d===sc.difficulty ? (d==='Hard'?'#FEE2E2':d==='Medium'?'#FEF3C7':'#D1FAE5') : t.surfaceAlt,
              color: d===sc.difficulty ? (d==='Hard'?t.danger:d==='Medium'?'#D97706':t.success) : t.textMuted,
              borderRadius:20, padding:'3px 10px', fontSize:10.5, fontWeight:700,
            }}>{d}</span>
          ))}
        </div>

        <div style={{ background:t.surfaceAlt, borderRadius:12, padding:13, marginBottom:20 }}>
          <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:7 }}>
            {React.createElement(window.lucide.Info,{size:13,color:t.primary})}
            <span style={{ color:t.primary, fontSize:11.5, fontWeight:700 }}>How to play</span>
          </div>
          <p style={{ color:t.textSecondary, fontSize:12, margin:0, lineHeight:1.6 }}>
            Select one card from each deck — <strong>Intent</strong>, <strong>Tone</strong>, and <strong>Context</strong> — to decode what's really happening in this exchange.
          </p>
        </div>

        <button onClick={() => setGamePhase('cards')} style={{ width:'100%', background:t.heroGrad, border:'none', borderRadius:12, color:'#fff', fontSize:14.5, fontWeight:700, padding:'13px 0', cursor:'pointer', boxShadow:`0 4px 18px ${t.primary}40` }}>
          Build Your Hand →
        </button>
      </div>
    );

    if (gamePhase === 'cards') {
      const can = selIntent && selTone && selContext;
      const decks = [
        { label:'Intent', sub:'What did they mean?', key:'intent', color:'#6366F1', cards: sc.intentCards, sel: selIntent, set: setSelIntent },
        { label:'Tone', sub:'How was it delivered?', key:'tone', color:'#EC4899', cards: sc.toneCards, sel: selTone, set: setSelTone },
        { label:'Context', sub:'What\'s the background?', key:'context', color:'#10B981', cards: sc.contextCards, sel: selContext, set: setSelContext },
      ];
      return (
        <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'16px 16px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <button onClick={() => setGamePhase('scenario')} style={{ background:'none',border:'none',cursor:'pointer',padding:0,color:t.textMuted }}>
              {React.createElement(window.lucide.ChevronLeft,{size:22})}
            </button>
            <h2 style={{ color:t.text, fontSize:18, fontWeight:800, margin:0 }}>Build Your Hand</h2>
          </div>

          {/* Progress bar */}
          <div style={{ display:'flex', gap:5, marginBottom:18 }}>
            {decks.map((d,i) => (
              <div key={i} style={{ flex:1, textAlign:'center' }}>
                <div style={{ height:4, borderRadius:2, marginBottom:4, background: d.sel?d.color:t.border, transition:'background 0.25s' }} />
                <span style={{ fontSize:10, fontWeight:700, color: d.sel?d.color:t.textMuted }}>{d.sel?'✓ ':''}{d.label}</span>
              </div>
            ))}
          </div>

          {decks.map(deck => (
            <div key={deck.key} style={{ marginBottom:18 }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
                <div style={{ width:8,height:8,borderRadius:'50%',background:deck.color }} />
                <span style={{ color:t.text, fontSize:13, fontWeight:700 }}>{deck.label} — {deck.sub}</span>
              </div>
              {deck.cards.map(card => (
                <button key={card.id} onClick={() => deck.set(card)} style={cardBtn(deck.sel?.id===card.id, deck.color)}>
                  <div style={{ fontWeight:700, fontSize:13, color: deck.sel?.id===card.id?deck.color:t.text, marginBottom:2 }}>{card.label}</div>
                  <div style={{ fontSize:11.5, color:t.textSecondary, lineHeight:1.4 }}>{card.desc}</div>
                </button>
              ))}
            </div>
          ))}

          <button onClick={() => { if(can) setGamePhase('response'); }} disabled={!can} style={{ width:'100%', background: can?t.heroGrad:t.border, border:'none', borderRadius:12, color: can?'#fff':t.textMuted, fontSize:14.5, fontWeight:700, padding:'13px 0', cursor: can?'pointer':'not-allowed', transition:'all 0.25s' }}>
            {can ? 'Choose Your Response →' : 'Select all 3 card types to continue'}
          </button>
        </div>
      );
    }

    if (gamePhase === 'response') {
      const rs = readScore();
      return (
        <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'16px 16px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <button onClick={() => setGamePhase('cards')} style={{ background:'none',border:'none',cursor:'pointer',padding:0,color:t.textMuted }}>
              {React.createElement(window.lucide.ChevronLeft,{size:22})}
            </button>
            <h2 style={{ color:t.text, fontSize:18, fontWeight:800, margin:0 }}>Choose Your Response</h2>
          </div>

          {/* Your read summary */}
          <div style={{ background:t.surface, borderRadius:14, padding:13, marginBottom:15, border:`1px solid ${t.border}` }}>
            <div style={{ color:t.textMuted, fontSize:10.5, fontWeight:700, marginBottom:8, textTransform:'uppercase', letterSpacing:0.4 }}>Your Read</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
              <span style={{ background:'#6366F118', color:'#6366F1', borderRadius:20, padding:'3px 10px', fontSize:11, fontWeight:700 }}>{selIntent?.label}</span>
              <span style={{ background:'#EC489918', color:'#EC4899', borderRadius:20, padding:'3px 10px', fontSize:11, fontWeight:700 }}>{selTone?.label}</span>
              <span style={{ background:'#10B98118', color:'#10B981', borderRadius:20, padding:'3px 10px', fontSize:11, fontWeight:700 }}>{selContext?.label}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ flex:1, height:5, background:t.border, borderRadius:3 }}>
                <div style={{ width:`${rs}%`, height:'100%', background: rs>66?t.success:rs>33?t.warning:t.danger, borderRadius:3, transition:'width 0.5s' }} />
              </div>
              <span style={{ fontSize:11.5, fontWeight:800, color: rs>66?t.success:rs>33?t.warning:t.danger }}>Read: {rs}%</span>
            </div>
          </div>

          <p style={{ color:t.textSecondary, fontSize:12.5, marginBottom:13, lineHeight:1.55 }}>
            Based on your read of the situation, which response best navigates it?
          </p>

          {sc.responses.map(r => (
            <button key={r.id} onClick={() => selectResponse(r)} style={{ width:'100%', background:t.surface, border:`2px solid ${t.border}`, borderRadius:12, padding:'12px 14px', marginBottom:9, cursor:'pointer', textAlign:'left', color:t.text, fontSize:13, lineHeight:1.5, fontWeight:500, transition:'border-color 0.15s', fontFamily:'inherit' }}>
              {r.text}
            </button>
          ))}
        </div>
      );
    }

    if (gamePhase === 'result') {
      const sc2 = readScore();
      const sc_color = selResponse?.score>=80?t.success:selResponse?.score>=60?t.warning:t.danger;
      const bestR = sc.responses.find(r => r.id === sc.best);
      return (
        <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'16px 16px 24px' }}>
          {/* Score */}
          <div style={{ background:`linear-gradient(135deg, ${t.primary}14, ${t.surface})`, border:`1px solid ${t.primary}28`, borderRadius:20, padding:20, textAlign:'center', marginBottom:14 }}>
            <div style={{ color:t.textMuted, fontSize:11, fontWeight:700, letterSpacing:0.5, marginBottom:6 }}>RESPONSE SCORE</div>
            <div style={{ fontSize:58, fontWeight:900, color:sc_color, transition:'transform 0.3s', transform: scoreAnim?'scale(1.18)':'scale(1)' }}>
              {selResponse?.score}
            </div>
            <div style={{ color:sc_color, fontSize:14, fontWeight:700, marginTop:4 }}>
              {selResponse?.score>=80 ? '🎯 Room Read!' : selResponse?.score>=60 ? '👍 Decent Play' : '💥 Missed the Signal'}
            </div>
          </div>

          {/* Response feedback */}
          <div style={{ background:t.surface, borderRadius:14, padding:13, marginBottom:11, border:`1px solid ${t.border}` }}>
            <div style={{ color:t.textMuted, fontSize:10.5, fontWeight:700, marginBottom:6, textTransform:'uppercase' }}>Your Response</div>
            <p style={{ color:t.text, fontSize:12.5, margin:'0 0 8px', fontStyle:'italic', lineHeight:1.5 }}>{selResponse?.text}</p>
            <p style={{ color:t.textSecondary, fontSize:12, margin:0, lineHeight:1.6 }}>{selResponse?.feedback}</p>
          </div>

          {/* Card accuracy */}
          <div style={{ background:t.surface, borderRadius:14, padding:13, marginBottom:11, border:`1px solid ${t.border}` }}>
            <div style={{ color:t.textMuted, fontSize:10.5, fontWeight:700, marginBottom:9, textTransform:'uppercase' }}>Card Accuracy</div>
            {[
              { label:'Intent', card:selIntent, color:'#6366F1' },
              { label:'Tone', card:selTone, color:'#EC4899' },
              { label:'Context', card:selContext, color:'#10B981' },
            ].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:7, marginBottom:7 }}>
                <span style={{ color:item.color, fontSize:10.5, fontWeight:700, width:50 }}>{item.label}</span>
                <div style={{ flex:1, background: item.card?.correct?`${t.success}15`:`${t.danger}12`, border:`1px solid ${item.card?.correct?t.success:t.danger}35`, borderRadius:8, padding:'4px 10px', fontSize:12, color: item.card?.correct?t.success:t.danger, fontWeight:600 }}>
                  {item.card?.correct ? '✓' : '✗'} {item.card?.label}
                </div>
              </div>
            ))}
          </div>

          {/* AI Referee */}
          <div style={{ background: isDark?'rgba(124,58,237,0.12)':'#F5F3FF', borderRadius:14, padding:13, marginBottom:11, border:`1px solid ${t.primary}28` }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
              {React.createElement(window.lucide.Sparkles,{size:13,color:t.primary})}
              <span style={{ color:t.primary, fontSize:11.5, fontWeight:700 }}>AI Referee Analysis</span>
            </div>
            <p style={{ color:t.textSecondary, fontSize:12, margin:0, lineHeight:1.7 }}>{sc.aiNote}</p>
          </div>

          {/* Best response */}
          <div style={{ background:`${t.success}12`, border:`1px solid ${t.success}35`, borderRadius:14, padding:13, marginBottom:18 }}>
            <div style={{ color:t.success, fontSize:11, fontWeight:700, marginBottom:5 }}>★ Best Response (Score: {bestR?.score})</div>
            <p style={{ color:t.text, fontSize:12.5, margin:0, lineHeight:1.5, fontStyle:'italic' }}>{bestR?.text}</p>
          </div>

          <button onClick={() => resetGame()} style={{ width:'100%', background:t.heroGrad, border:'none', borderRadius:12, color:'#fff', fontSize:14.5, fontWeight:700, padding:'13px 0', cursor:'pointer' }}>
            Next Scenario →
          </button>
        </div>
      );
    }

    return null;
  };

  // ─────────────── DRILLS SCREEN ───────────────
  const DrillsScreen = () => {
    const drill = drills[drillRound % drills.length];
    const [answerResult, setAnswerResult] = useState(null);

    const answerDrill = (opt) => {
      if (answerResult !== null) return;
      setAnswerResult(opt.correct ? 'correct' : 'wrong');
      if (opt.correct) setDrillScore(s => s + 1);
      setTimeout(() => {
        setAnswerResult(null);
        setDrillRound(r => r + 1);
      }, 900);
    };

    if (drillPhase === 'ready') return (
      <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'20px 16px' }}>
        <h2 style={{ color:t.text, fontSize:20, fontWeight:800, margin:'0 0 3px' }}>Daily Drill</h2>
        <p style={{ color:t.textMuted, fontSize:12.5, margin:'0 0 20px' }}>3-minute burst training</p>

        <div style={{ background:t.drillGrad, borderRadius:20, padding:20, marginBottom:18, color:'#fff' }}>
          <div style={{ fontSize:30, marginBottom:8 }}>⚡</div>
          <h3 style={{ fontSize:18, fontWeight:800, margin:'0 0 7px' }}>Quick Reads</h3>
          <p style={{ fontSize:12.5, opacity:0.9, margin:'0 0 16px', lineHeight:1.55 }}>
            5 rapid-fire questions. Spot subtext, decode tone shifts, and find hidden meaning in everyday messages.
          </p>
          <div style={{ display:'flex', gap:16 }}>
            {[['3:00','TIME'],['5','QS'],['＋20','EQ XP']].map(([v,l],i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:18, fontWeight:800 }}>{v}</div>
                <div style={{ fontSize:9.5, opacity:0.8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:t.surface, borderRadius:14, padding:13, marginBottom:18, display:'flex', alignItems:'center', gap:12, border:`1px solid ${t.border}` }}>
          {React.createElement(window.lucide.Flame,{size:24,color:'#F97316'})}
          <div>
            <div style={{ color:t.text, fontSize:13.5, fontWeight:700 }}>12 Day Streak!</div>
            <div style={{ color:t.textMuted, fontSize:11.5 }}>Complete today's drill to keep it going</div>
          </div>
        </div>

        <h3 style={{ color:t.text, fontSize:13.5, fontWeight:700, margin:'0 0 10px' }}>This Week</h3>
        <div style={{ display:'flex', gap:5, marginBottom:22 }}>
          {['M','T','W','T','F','S','S'].map((day,i) => (
            <div key={i} style={{ flex:1, textAlign:'center' }}>
              <div style={{ height:28, borderRadius:6, background: i<5?t.secondary:t.border, marginBottom:4, opacity: i<5?1:0.35 }} />
              <span style={{ fontSize:9, color:t.textMuted }}>{day}</span>
            </div>
          ))}
        </div>

        <button onClick={() => { setDrillPhase('active'); setDrillTime(180); setDrillScore(0); setDrillRound(0); }}
          style={{ width:'100%', background:t.drillGrad, border:'none', borderRadius:12, color:'#fff', fontSize:14.5, fontWeight:700, padding:'13px 0', cursor:'pointer', boxShadow:`0 4px 18px ${t.secondary}45` }}>
          Start Drill ⚡
        </button>
      </div>
    );

    if (drillPhase === 'active' && drillRound < drills.length) {
      const pct = (drillTime / 180) * 100;
      return (
        <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'16px 16px 24px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <div style={{ fontSize:28, fontWeight:900, color: drillTime<30?t.danger:t.text, fontVariantNumeric:'tabular-nums' }}>{fmtTime(drillTime)}</div>
            <div style={{ textAlign:'right' }}>
              <div style={{ color:t.text, fontSize:14, fontWeight:700 }}>{drillRound+1}/{drills.length}</div>
              <div style={{ color:t.textMuted, fontSize:11 }}>Score: {drillScore}</div>
            </div>
          </div>

          <div style={{ height:5, background:t.border, borderRadius:3, marginBottom:18 }}>
            <div style={{ width:`${pct}%`, height:'100%', background: drillTime<30?t.danger:t.secondary, borderRadius:3, transition:'width 1s linear,background 0.3s' }} />
          </div>

          <div style={{ display:'flex', gap:4, marginBottom:18 }}>
            {drills.map((_,i) => (
              <div key={i} style={{ flex:1, height:3, borderRadius:2, background: i<drillRound?t.secondary:i===drillRound?`${t.secondary}55`:t.border }} />
            ))}
          </div>

          <div style={{ background:t.surface, borderRadius:16, padding:17, marginBottom:14, border:`1px solid ${t.border}`, boxShadow:t.cardShadow }}>
            <div style={{ display:'inline-block', background: isDark?'rgba(249,115,22,0.18)':'#FFF7ED', color:t.secondary, borderRadius:8, padding:'3px 10px', fontSize:10.5, fontWeight:700, marginBottom:11 }}>READ THE ROOM</div>
            <p style={{ color:t.text, fontSize:13.5, fontWeight:600, margin:0, lineHeight:1.6 }}>{drill.q}</p>
          </div>

          {drill.opts.map((opt,i) => {
            let bg = t.surface, borderColor = t.border, textColor = t.text;
            if (answerResult !== null) {
              if (opt.correct) { bg = `${t.success}15`; borderColor = t.success; textColor = t.success; }
              else if (!opt.correct && answerResult === 'wrong') { bg = `${t.danger}10`; borderColor = `${t.danger}40`; }
            }
            return (
              <button key={i} onClick={() => answerDrill(opt)} style={{ width:'100%', background:bg, border:`2px solid ${borderColor}`, borderRadius:11, padding:'11px 13px', marginBottom:8, cursor:'pointer', textAlign:'left', color:textColor, fontSize:12.5, lineHeight:1.5, fontWeight:500, transition:'all 0.2s', fontFamily:'inherit' }}>
                {opt.text}
              </button>
            );
          })}
        </div>
      );
    }

    if (drillPhase === 'complete') {
      const acc = Math.round((drillScore / drills.length) * 100);
      return (
        <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'20px 16px' }}>
          <div style={{ textAlign:'center', marginBottom:22 }}>
            <div style={{ fontSize:46, marginBottom:8 }}>{acc>=80?'🎯':acc>=60?'👍':'📚'}</div>
            <h2 style={{ color:t.text, fontSize:22, fontWeight:900, margin:'0 0 4px' }}>Drill Complete!</h2>
            <p style={{ color:t.textMuted, fontSize:12.5, margin:0 }}>EQ is {acc>=80?'sharp':'still sharpening'}</p>
          </div>

          <div style={{ background:`linear-gradient(135deg, ${t.secondary}18, ${t.surface})`, border:`1px solid ${t.secondary}38`, borderRadius:18, padding:20, textAlign:'center', marginBottom:18 }}>
            <div style={{ fontSize:56, fontWeight:900, color: acc>=80?t.success:acc>=60?t.secondary:t.danger }}>{drillScore}/{drills.length}</div>
            <div style={{ color:t.textMuted, fontSize:13, marginTop:3 }}>{acc}% accuracy</div>
            <div style={{ color:t.primary, fontSize:12.5, fontWeight:700, marginTop:7 }}>+{drillScore*4} EQ XP earned</div>
          </div>

          <div style={{ display:'flex', gap:9, marginBottom:20 }}>
            {[['Time Used', fmtTime(180-drillTime)],['Streak','13d 🔥'],['Rank','#198 ↑']].map(([l,v],i) => (
              <div key={i} style={{ flex:1, background:t.surface, borderRadius:11, padding:11, textAlign:'center', border:`1px solid ${t.border}` }}>
                <div style={{ color:t.text, fontSize:14, fontWeight:700 }}>{v}</div>
                <div style={{ color:t.textMuted, fontSize:10, marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setDrillPhase('ready')} style={{ width:'100%', background:t.drillGrad, border:'none', borderRadius:12, color:'#fff', fontSize:14.5, fontWeight:700, padding:'13px 0', cursor:'pointer' }}>
            Done ✓
          </button>
        </div>
      );
    }

    return null;
  };

  // ─────────────── PARTY SCREEN ───────────────
  const PartyScreen = () => {
    const packs = [
      { title:'Job Interview Prep', desc:'Practice tough behavioral questions. Spot which replies sound defensive vs. confident.', players:'2', time:'15 min', icon:'💼', color:'#6366F1' },
      { title:'Difficult Conversation', desc:'Prep for a real convo — a breakup, confrontation, or raise request. Your group acts it out first.', players:'2–4', time:'20 min', icon:'💬', color:'#7C3AED' },
      { title:'Family Dinner', desc:'Politically charged topics, cross-generational tension, and everyone watching what you say.', players:'3–6', time:'25 min', icon:'🏠', color:'#10B981' },
      { title:'Date Night', desc:'Decode flirtatious ambiguity, social signals, and mixed messages in romantic contexts.', players:'2', time:'15 min', icon:'💕', color:'#EC4899' },
    ];

    return (
      <div style={{ height:'100%', overflowY:'auto', background:t.bg, padding:'20px 16px' }}>
        <h2 style={{ color:t.text, fontSize:20, fontWeight:800, margin:'0 0 3px' }}>Party Mode</h2>
        <p style={{ color:t.textMuted, fontSize:12.5, margin:'0 0 20px' }}>Play together, prep for real conversations</p>

        {/* Room card */}
        <div style={{ background:`linear-gradient(135deg, ${t.accent}18, ${t.surface})`, border:`1px solid ${t.accent}35`, borderRadius:16, padding:15, marginBottom:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ color:t.textMuted, fontSize:10.5, fontWeight:700, marginBottom:3 }}>YOUR ROOM CODE</div>
            <div style={{ color:t.text, fontSize:26, fontWeight:900, letterSpacing:5 }}>MBL-47</div>
          </div>
          <button style={{ background:t.accent, border:'none', borderRadius:10, padding:'8px 14px', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>
            Share
          </button>
        </div>

        {/* Players */}
        <div style={{ background:t.surface, borderRadius:14, padding:13, marginBottom:18, border:`1px solid ${t.border}` }}>
          <div style={{ color:t.textMuted, fontSize:10.5, fontWeight:700, marginBottom:9, textTransform:'uppercase' }}>Players (1/4)</div>
          <div style={{ display:'flex', gap:9, alignItems:'center' }}>
            <div style={{ width:40,height:40,borderRadius:'50%',background:t.heroGrad,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:13,fontWeight:700 }}>AR</div>
            {[0,1,2].map(i => (
              <div key={i} style={{ width:40,height:40,borderRadius:'50%',background:t.surfaceAlt,border:`2px dashed ${t.border}`,display:'flex',alignItems:'center',justifyContent:'center' }}>
                {React.createElement(window.lucide.Plus,{size:15,color:t.textMuted})}
              </div>
            ))}
          </div>
        </div>

        {/* Packs */}
        <h3 style={{ color:t.text, fontSize:13.5, fontWeight:700, margin:'0 0 11px' }}>Choose a Scenario Pack</h3>
        {packs.map((p,i) => (
          <div key={i} style={{ background:t.surface, borderRadius:14, padding:14, marginBottom:9, border:`1px solid ${t.border}`, boxShadow:t.cardShadow, cursor:'pointer' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                  <span style={{ fontSize:18 }}>{p.icon}</span>
                  <span style={{ color:t.text, fontSize:13.5, fontWeight:700 }}>{p.title}</span>
                </div>
                <p style={{ color:t.textSecondary, fontSize:12, margin:'0 0 8px', lineHeight:1.5 }}>{p.desc}</p>
                <div style={{ display:'flex', gap:6 }}>
                  <span style={{ background:t.tagBg, color:t.tagText, borderRadius:20, padding:'2px 9px', fontSize:10.5, fontWeight:600 }}>{p.players} players</span>
                  <span style={{ background:t.tagBg, color:t.tagText, borderRadius:20, padding:'2px 9px', fontSize:10.5, fontWeight:600 }}>{p.time}</span>
                </div>
              </div>
              {React.createElement(window.lucide.ChevronRight,{size:17,color:t.textMuted})}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ─────────────── PROFILE SCREEN ───────────────
  const ProfileScreen = () => {
    const eqStats = [
      { label:'Intent Recognition', score:78, color:'#6366F1' },
      { label:'Tone Detection', score:85, color:'#EC4899' },
      { label:'Context Reading', score:66, color:'#10B981' },
      { label:'Response Crafting', score:72, color:'#F97316' },
    ];
    const achievements = [
      { icon:'🎯', title:'Sharp Reader', desc:'Read intent correctly 10 rounds in a row', earned:true },
      { icon:'🔥', title:'Streak Master', desc:'14-day drill streak', earned:false, pct:86 },
      { icon:'🕊️', title:'Peacekeeper', desc:'Defused 25 escalating situations', earned:true },
      { icon:'🧠', title:'EQ Expert', desc:'Reach 1000 EQ XP', earned:false, pct:62 },
    ];
    const settings = [
      { label:'Notifications', desc:'Daily drill reminders', icon: window.lucide.Bell },
      { label:'Sound Effects', desc:'Card play sounds', icon: window.lucide.Volume2 },
      { label:'Accessibility', desc:'Color blind mode', icon: window.lucide.Eye },
      { label:'Account', desc:'alex@mosaic.app', icon: window.lucide.User },
    ];

    return (
      <div style={{ height:'100%', overflowY:'auto', background:t.bg, paddingBottom:24 }}>
        {/* Hero */}
        <div style={{ background:t.heroGrad, padding:'22px 20px 30px', borderRadius:'0 0 24px 24px' }}>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}>
            <button onClick={() => setIsDark(!isDark)} style={{ background:'rgba(255,255,255,0.18)', border:'none', borderRadius:'50%', width:36,height:36, display:'flex',alignItems:'center',justifyContent:'center', cursor:'pointer' }}>
              {React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, {size:17,color:'#fff'})}
            </button>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ width:68,height:68,borderRadius:'50%',background:'rgba(255,255,255,0.18)',border:'3px solid rgba(255,255,255,0.45)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:800,color:'#fff',margin:'0 auto 10px' }}>AR</div>
            <h2 style={{ color:'#fff', fontSize:20, fontWeight:800, margin:'0 0 3px' }}>Alex Rivera</h2>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:12.5, margin:'0 0 14px' }}>EQ Level 8 · Room Reader</p>
            <div style={{ display:'flex', justifyContent:'center', gap:22 }}>
              {[['620','EQ XP'],['#204','Rank'],['148','Rounds']].map(([v,l],i) => (
                <div key={i} style={{ textAlign:'center' }}>
                  <div style={{ color:'#fff', fontSize:18, fontWeight:800 }}>{v}</div>
                  <div style={{ color:'rgba(255,255,255,0.6)', fontSize:10 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:'16px 16px 0' }}>
          {/* EQ Stats */}
          <h3 style={{ color:t.text, fontSize:14, fontWeight:800, margin:'0 0 12px' }}>EQ Breakdown</h3>
          {eqStats.map((s,i) => (
            <div key={i} style={{ marginBottom:11 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ color:t.textSecondary, fontSize:12, fontWeight:500 }}>{s.label}</span>
                <span style={{ color:s.color, fontSize:12, fontWeight:800 }}>{s.score}%</span>
              </div>
              <div style={{ height:5, background:t.border, borderRadius:3 }}>
                <div style={{ width:`${s.score}%`, height:'100%', background:s.color, borderRadius:3 }} />
              </div>
            </div>
          ))}

          {/* Achievements */}
          <h3 style={{ color:t.text, fontSize:14, fontWeight:800, margin:'18px 0 11px' }}>Achievements</h3>
          {achievements.map((a,i) => (
            <div key={i} style={{ background:t.surface, borderRadius:13, padding:13, marginBottom:8, display:'flex', gap:11, alignItems:'center', border:`1px solid ${a.earned?`${t.success}38`:t.border}`, opacity: a.earned?1:0.9 }}>
              <div style={{ fontSize:27 }}>{a.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ color:t.text, fontSize:13, fontWeight:700 }}>{a.title}</div>
                <div style={{ color:t.textMuted, fontSize:11, marginTop:2, lineHeight:1.4 }}>{a.desc}</div>
                {!a.earned && a.pct && (
                  <div style={{ marginTop:6 }}>
                    <div style={{ height:3, background:t.border, borderRadius:2 }}>
                      <div style={{ width:`${a.pct}%`, height:'100%', background:t.primary, borderRadius:2 }} />
                    </div>
                    <span style={{ color:t.textMuted, fontSize:10, marginTop:2, display:'block' }}>{a.pct}% complete</span>
                  </div>
                )}
              </div>
              {a.earned && React.createElement(window.lucide.Check,{size:18,color:t.success})}
            </div>
          ))}

          {/* Settings */}
          <h3 style={{ color:t.text, fontSize:14, fontWeight:800, margin:'18px 0 11px' }}>Settings</h3>
          {settings.map((s,i) => (
            <div key={i} style={{ background:t.surface, borderRadius:12, padding:'11px 13px', marginBottom:7, display:'flex', alignItems:'center', gap:11, border:`1px solid ${t.border}`, cursor:'pointer' }}>
              {React.createElement(s.icon,{size:17,color:t.primary})}
              <div style={{ flex:1 }}>
                <div style={{ color:t.text, fontSize:13, fontWeight:600 }}>{s.label}</div>
                <div style={{ color:t.textMuted, fontSize:11 }}>{s.desc}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight,{size:15,color:t.textMuted})}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─────────────── RENDER ───────────────
  const navItems = [
    { id:'home', icon: window.lucide.Home, label:'Home' },
    { id:'play', icon: window.lucide.Gamepad2, label:'Play' },
    { id:'drills', icon: window.lucide.Zap, label:'Drills' },
    { id:'party', icon: window.lucide.Users, label:'Party' },
    { id:'profile', icon: window.lucide.User, label:'Profile' },
  ];

  const heroTabs = ['home','profile'];
  const statusColor = heroTabs.includes(activeTab) ? '#fff' : t.text;

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{ minHeight:'100vh', background:'#1A1530', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
        <div style={{ width:375, height:812, background:t.bg, borderRadius:48, overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)', display:'flex', flexDirection:'column', position:'relative', border:'1.5px solid rgba(255,255,255,0.07)' }}>

          {/* Dynamic Island */}
          <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:118, height:34, background:'#000', borderRadius:20, zIndex:100 }} />

          {/* Status bar */}
          <div style={{ height:50, padding:'0 24px', display:'flex', alignItems:'flex-end', paddingBottom:8, justifyContent:'space-between', background: heroTabs.includes(activeTab) ? (activeTab==='home'?t.heroGrad:t.heroGrad) : t.bg, zIndex:50, flexShrink:0 }}>
            <span style={{ fontSize:12.5, fontWeight:700, color:statusColor }}>9:41</span>
            <div style={{ display:'flex', gap:6, alignItems:'center' }}>
              {React.createElement(window.lucide.Wifi,{size:13,color:statusColor})}
              {React.createElement(window.lucide.Battery,{size:13,color:statusColor})}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'play' && <PlayScreen />}
            {activeTab === 'drills' && <DrillsScreen />}
            {activeTab === 'party' && <PartyScreen />}
            {activeTab === 'profile' && <ProfileScreen />}
          </div>

          {/* Bottom nav */}
          <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', padding:'8px 0 16px', background:t.navBg, borderTop:`1px solid ${t.border}`, flexShrink:0 }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'3px 10px', borderRadius:10 }}>
                {React.createElement(item.icon, { size:22, color: activeTab===item.id?t.primary:t.textMuted, strokeWidth: activeTab===item.id?2.5:1.5 })}
                <span style={{ fontSize:10, fontWeight: activeTab===item.id?700:500, color: activeTab===item.id?t.primary:t.textMuted }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
