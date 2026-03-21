const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F0FF', surface: '#FFFFFF', surfaceAlt: '#EDE8FE', surfaceCard: '#FEFCFF',
    text: '#1A0A3D', textSub: '#5B4E8A', textMuted: '#9E92C0',
    primary: '#7C3AED', primaryLight: '#A78BFA', primaryDark: '#5B21B6',
    accent: '#F59E0B', accentLight: '#FEF3C7', success: '#059669', successLight: '#D1FAE5',
    border: '#E5D9FF', shadow: 'rgba(124,58,237,0.10)', navBg: '#FFFFFF',
    gradStart: '#7C3AED', gradEnd: '#A855F7', chip: '#EDE8FE', chipText: '#7C3AED',
    card2: '#F8F5FF', streakBg: '#FFF7ED', streakText: '#D97706',
  },
  dark: {
    bg: '#0D0820', surface: '#1A1035', surfaceAlt: '#231848', surfaceCard: '#1F1540',
    text: '#F0EBFF', textSub: '#C4B0FF', textMuted: '#6B5B9E',
    primary: '#9D6FF5', primaryLight: '#C4B0FF', primaryDark: '#7C3AED',
    accent: '#F59E0B', accentLight: '#451A03', success: '#10B981', successLight: '#064E3B',
    border: '#2D1F5E', shadow: 'rgba(0,0,0,0.45)', navBg: '#130D2A',
    gradStart: '#5B21B6', gradEnd: '#7C3AED', chip: '#2D1F5E', chipText: '#C4B0FF',
    card2: '#1F1540', streakBg: '#2D1F0D', streakText: '#FCD34D',
  }
};

const QUESTS = [
  { id:1, title:'Inbox Blitz', desc:'Archive 3 old emails you no longer need', duration:60, points:80, type:'focus', icon:'Mail', situation:'Waiting Room', color:'#7C3AED' },
  { id:2, title:'Grocery Brain Dump', desc:'List 8 things you need from the store from memory', duration:45, points:60, type:'organize', icon:'ShoppingCart', situation:'Commuting', color:'#059669' },
  { id:3, title:'One Reply', desc:'Reply to one message you have been putting off', duration:90, points:100, type:'focus', icon:'MessageCircle', situation:'Airport', color:'#7C3AED' },
  { id:4, title:'Quick To-Do', desc:'Write 5 things you need to do this week', duration:60, points:70, type:'organize', icon:'CheckSquare', situation:'Lunch Break', color:'#059669' },
  { id:5, title:'Breath Reset', desc:'Follow the breathing pattern to calm your nervous system', duration:60, points:50, type:'calm', icon:'Wind', situation:'Doctor\'s Office', color:'#0EA5E9' },
  { id:6, title:'Posture Check', desc:'Roll your shoulders, sit tall, and hold for 30 seconds', duration:30, points:40, type:'calm', icon:'Activity', situation:'Any', color:'#0EA5E9' },
  { id:7, title:'Receipt Sort', desc:'Sort through 5 digital receipts in your photos', duration:75, points:90, type:'organize', icon:'Receipt', situation:'Commuting', color:'#059669' },
  { id:8, title:'Mind Wipe', desc:'Name 5 things you can see, 4 you can touch, 3 you can hear', duration:45, points:55, type:'calm', icon:'Eye', situation:'Any', color:'#0EA5E9' },
];

const BADGES = [
  { id:1, name:'First Quest', icon:'⭐', earned:true, desc:'Complete your first quest' },
  { id:2, name:'3-Day Streak', icon:'🔥', earned:true, desc:'Complete quests 3 days in a row' },
  { id:3, name:'Inbox Hero', icon:'📧', earned:true, desc:'Complete 5 focus quests' },
  { id:4, name:'Chill Master', icon:'🧘', earned:false, desc:'Complete 10 calm quests' },
  { id:5, name:'Week Warrior', icon:'🏆', earned:false, desc:'7-day streak' },
  { id:6, name:'100 Points', icon:'💎', earned:true, desc:'Earn 100 total points' },
];

const SITUATIONS = ['Waiting Room','Commuting','Lunch Break','Airport','Any'];

function App() {
  const [theme, setTheme] = useState('light');
  const [tab, setTab] = useState('home');
  const [situation, setSituation] = useState('Waiting Room');
  const [activeQuest, setActiveQuest] = useState(null);
  const [questPhase, setQuestPhase] = useState('idle'); // idle | active | done
  const [timer, setTimer] = useState(0);
  const [timerMax, setTimerMax] = useState(60);
  const [points, setPoints] = useState(340);
  const [streak, setStreak] = useState(5);
  const [completedQuests, setCompletedQuests] = useState([1,2,5,6]);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale | hold | exhale
  const [breathCount, setBreathCount] = useState(0);
  const [breathActive, setBreathActive] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const timerRef = useRef(null);
  const breathRef = useRef(null);

  const t = themes[theme];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box;}`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (questPhase === 'active') {
      timerRef.current = setInterval(() => {
        setTimer(p => {
          if (p >= timerMax) {
            clearInterval(timerRef.current);
            setQuestPhase('done');
            setPoints(prev => prev + (activeQuest?.points || 0));
            setCompletedQuests(prev => [...prev, activeQuest?.id]);
            return timerMax;
          }
          return p + 1;
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [questPhase]);

  useEffect(() => {
    if (!breathActive) { clearInterval(breathRef.current); return; }
    const phases = ['inhale','hold','exhale'];
    const durations = { inhale:4000, hold:4000, exhale:6000 };
    let idx = 0;
    const cycle = () => {
      setBreathPhase(phases[idx]);
      breathRef.current = setTimeout(() => {
        idx = (idx + 1) % 3;
        if (idx === 0) setBreathCount(c => c + 1);
        cycle();
      }, durations[phases[idx]]);
    };
    cycle();
    return () => clearTimeout(breathRef.current);
  }, [breathActive]);

  const filteredQuests = QUESTS.filter(q => q.situation === situation || q.situation === 'Any');

  const btn = (id) => ({
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  });

  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    if (fn) fn();
  };

  function StatusBar() {
    return (
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px 6px', fontSize:12, fontWeight:600, color:t.text }}>
        <span>9:41</span>
        <div style={{ display:'flex', gap:5, alignItems:'center' }}>
          {React.createElement(window.lucide.Wifi, { size:13, color:t.text })}
          {React.createElement(window.lucide.Signal, { size:13, color:t.text })}
          {React.createElement(window.lucide.Battery, { size:15, color:t.text })}
        </div>
      </div>
    );
  }

  function DynamicIsland() {
    return (
      <div style={{ display:'flex', justifyContent:'center', marginTop:2 }}>
        <div style={{ width:120, height:34, background:'#000', borderRadius:20 }} />
      </div>
    );
  }

  function HomeScreen() {
    const daily = [
      { label:'Quests Done', val:3, icon:'CheckCircle', color:t.success },
      { label:'Points Today', val:220, icon:'Zap', color:t.accent },
      { label:'Streak', val:`${streak}d`, icon:'Flame', color:'#EF4444' },
    ];
    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
        {/* Header */}
        <div style={{ background:`linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, padding:'18px 20px 24px', borderRadius:'0 0 28px 28px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div>
              <p style={{ color:'rgba(255,255,255,0.75)', fontSize:13, fontWeight:500 }}>Good afternoon,</p>
              <p style={{ color:'#fff', fontSize:20, fontWeight:800 }}>Jordan 👋</p>
            </div>
            <div style={{ background:'rgba(255,255,255,0.18)', borderRadius:14, padding:'6px 12px', display:'flex', alignItems:'center', gap:6 }}
              onClick={() => press('coins')}
              {...btn('coins')}>
              <span style={{ fontSize:14 }}>💎</span>
              <span style={{ color:'#fff', fontWeight:700, fontSize:14 }}>{points}</span>
            </div>
          </div>
          {/* Daily summary */}
          <div style={{ display:'flex', gap:8 }}>
            {daily.map(d => (
              <div key={d.label} style={{ flex:1, background:'rgba(255,255,255,0.15)', borderRadius:14, padding:'10px 8px', textAlign:'center' }}>
                <p style={{ color:'#fff', fontWeight:800, fontSize:17 }}>{d.val}</p>
                <p style={{ color:'rgba(255,255,255,0.75)', fontSize:10, fontWeight:500 }}>{d.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding:'16px 16px 0' }}>
          {/* Situation selector */}
          <p style={{ fontSize:13, fontWeight:700, color:t.textSub, marginBottom:10, letterSpacing:0.5, textTransform:'uppercase' }}>Your Situation</p>
          <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4, scrollbarWidth:'none' }}>
            {SITUATIONS.map(s => (
              <div key={s}
                style={{ ...btn(`sit-${s}`), flexShrink:0, padding:'7px 14px', borderRadius:20, background: situation===s ? t.primary : t.chip, color: situation===s ? '#fff' : t.chipText, fontSize:12, fontWeight:600, border:`1.5px solid ${situation===s ? t.primary : t.border}` }}
                onClick={() => press(`sit-${s}`, () => setSituation(s))}>
                {s}
              </div>
            ))}
          </div>

          {/* Featured quest */}
          {filteredQuests[0] && (
            <div style={{ marginTop:18 }}>
              <p style={{ fontSize:13, fontWeight:700, color:t.textSub, marginBottom:10, letterSpacing:0.5, textTransform:'uppercase' }}>Featured Quest</p>
              <div style={{ ...btn('featured'), background:`linear-gradient(135deg, ${filteredQuests[0].color}22, ${filteredQuests[0].color}08)`, border:`1.5px solid ${filteredQuests[0].color}44`, borderRadius:20, padding:18, position:'relative', overflow:'hidden' }}
                onClick={() => press('featured', () => { setActiveQuest(filteredQuests[0]); setTimer(0); setTimerMax(filteredQuests[0].duration); setQuestPhase('idle'); setTab('quest'); })}>
                <div style={{ position:'absolute', right:-10, top:-10, fontSize:60, opacity:0.08 }}>🎯</div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:filteredQuests[0].color+'22', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {React.createElement(window.lucide[filteredQuests[0].icon] || window.lucide.Star, { size:22, color:filteredQuests[0].color })}
                  </div>
                  <div>
                    <p style={{ fontWeight:800, fontSize:16, color:t.text }}>{filteredQuests[0].title}</p>
                    <p style={{ fontSize:12, color:t.textSub, fontWeight:500 }}>{filteredQuests[0].situation}</p>
                  </div>
                </div>
                <p style={{ fontSize:13, color:t.textSub, marginBottom:14, lineHeight:1.5 }}>{filteredQuests[0].desc}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ display:'flex', gap:8 }}>
                    <span style={{ background:filteredQuests[0].color+'22', color:filteredQuests[0].color, padding:'4px 10px', borderRadius:10, fontSize:11, fontWeight:700 }}>
                      ⏱ {filteredQuests[0].duration}s
                    </span>
                    <span style={{ background:t.accentLight, color:t.accent, padding:'4px 10px', borderRadius:10, fontSize:11, fontWeight:700 }}>
                      +{filteredQuests[0].points} pts
                    </span>
                  </div>
                  <div style={{ background:filteredQuests[0].color, borderRadius:12, padding:'6px 16px', display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ color:'#fff', fontSize:13, fontWeight:700 }}>Start</span>
                    {React.createElement(window.lucide.ArrowRight, { size:14, color:'#fff' })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* More quests */}
          <div style={{ marginTop:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <p style={{ fontSize:13, fontWeight:700, color:t.textSub, letterSpacing:0.5, textTransform:'uppercase' }}>More Quests</p>
              <span style={{ fontSize:12, color:t.primary, fontWeight:600 }}>See all</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {filteredQuests.slice(1,4).map(q => (
                <div key={q.id} style={{ ...btn(`q-${q.id}`), display:'flex', alignItems:'center', gap:12, background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:16, padding:'12px 14px' }}
                  onClick={() => press(`q-${q.id}`, () => { setActiveQuest(q); setTimer(0); setTimerMax(q.duration); setQuestPhase('idle'); setTab('quest'); })}>
                  <div style={{ width:40, height:40, borderRadius:12, background:q.color+'18', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {React.createElement(window.lucide[q.icon] || window.lucide.Star, { size:18, color:q.color })}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:700, fontSize:14, color:t.text }}>{q.title}</p>
                    <p style={{ fontSize:11, color:t.textMuted, fontWeight:500 }}>{q.desc.substring(0,42)}…</p>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <p style={{ fontWeight:700, fontSize:13, color:t.accent }}>+{q.points}</p>
                    <p style={{ fontSize:10, color:t.textMuted }}>{q.duration}s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function QuestScreen() {
    if (!activeQuest) return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24, gap:16 }}>
        {React.createElement(window.lucide.MapPin, { size:48, color:t.textMuted })}
        <p style={{ color:t.textSub, fontWeight:600, fontSize:16 }}>Pick a quest from Home</p>
        <div style={{ ...btn('go-home'), background:t.primary, borderRadius:16, padding:'12px 28px' }}
          onClick={() => press('go-home', () => setTab('home'))}>
          <span style={{ color:'#fff', fontWeight:700 }}>Browse Quests</span>
        </div>
      </div>
    );

    const progress = timerMax > 0 ? (timer / timerMax) * 100 : 0;
    const circumference = 2 * Math.PI * 54;
    const strokeDash = circumference - (progress / 100) * circumference;

    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'12px 20px 80px', gap:16 }}>
        {/* Back */}
        <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}
          onClick={() => { setQuestPhase('idle'); setTab('home'); }}>
          {React.createElement(window.lucide.ArrowLeft, { size:18, color:t.textSub })}
          <span style={{ color:t.textSub, fontWeight:600, fontSize:13 }}>Back</span>
        </div>

        {/* Quest info */}
        <div style={{ background:`linear-gradient(135deg, ${activeQuest.color}18, ${activeQuest.color}06)`, border:`1.5px solid ${activeQuest.color}30`, borderRadius:20, padding:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:activeQuest.color+'22', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {React.createElement(window.lucide[activeQuest.icon] || window.lucide.Star, { size:20, color:activeQuest.color })}
            </div>
            <div>
              <p style={{ fontWeight:800, fontSize:17, color:t.text }}>{activeQuest.title}</p>
              <div style={{ display:'flex', gap:6, marginTop:2 }}>
                <span style={{ background:activeQuest.color+'22', color:activeQuest.color, padding:'2px 8px', borderRadius:8, fontSize:11, fontWeight:700 }}>{activeQuest.type}</span>
                <span style={{ background:t.accentLight, color:t.accent, padding:'2px 8px', borderRadius:8, fontSize:11, fontWeight:700 }}>+{activeQuest.points} pts</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize:13, color:t.textSub, lineHeight:1.6 }}>{activeQuest.desc}</p>
        </div>

        {questPhase === 'done' ? (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, textAlign:'center' }}>
            <div style={{ fontSize:64 }}>🎉</div>
            <p style={{ fontWeight:800, fontSize:22, color:t.text }}>Quest Complete!</p>
            <p style={{ color:t.textSub, fontSize:14 }}>You earned <strong style={{ color:t.accent }}>+{activeQuest.points} points</strong></p>
            <div style={{ background:t.successLight, borderRadius:16, padding:'10px 20px', border:`1.5px solid ${t.success}40` }}>
              <p style={{ color:t.success, fontWeight:700, fontSize:14 }}>Total: {points} pts · {streak}-day streak 🔥</p>
            </div>
            <div style={{ ...btn('next'), background:t.primary, borderRadius:16, padding:'14px 36px', marginTop:8 }}
              onClick={() => press('next', () => { setActiveQuest(null); setQuestPhase('idle'); setTab('home'); })}>
              <span style={{ color:'#fff', fontWeight:700, fontSize:15 }}>Find Next Quest</span>
            </div>
          </div>
        ) : (
          <>
            {/* Timer circle */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'8px 0' }}>
              <svg width={130} height={130} style={{ transform:'rotate(-90deg)' }}>
                <circle cx={65} cy={65} r={54} fill="none" stroke={t.border} strokeWidth={8} />
                <circle cx={65} cy={65} r={54} fill="none" stroke={activeQuest.color} strokeWidth={8}
                  strokeDasharray={circumference} strokeDashoffset={strokeDash}
                  strokeLinecap="round" style={{ transition:'stroke-dashoffset 0.1s linear' }} />
              </svg>
              <div style={{ marginTop:-78, textAlign:'center', zIndex:1, position:'relative' }}>
                <p style={{ fontWeight:800, fontSize:26, color:t.text }}>{questPhase==='active' ? Math.max(0, timerMax - timer) : timerMax}s</p>
                <p style={{ fontSize:11, color:t.textMuted, fontWeight:500 }}>
                  {questPhase==='idle' ? 'Ready?' : questPhase==='active' ? 'In progress' : 'Done!'}
                </p>
              </div>
            </div>

            {/* Steps */}
            <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:16, padding:14 }}>
              <p style={{ fontWeight:700, fontSize:13, color:t.textSub, marginBottom:10, textTransform:'uppercase', letterSpacing:0.5 }}>Steps</p>
              {['Open your email app', 'Find 3 emails older than 1 week', 'Archive or delete each one'].map((step, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom: i<2 ? 8 : 0 }}>
                  <div style={{ width:22, height:22, borderRadius:11, background: questPhase==='active' && timer > (i*timerMax/3) ? t.success : t.border, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'background 0.3s' }}>
                    {questPhase==='active' && timer > (i*timerMax/3)
                      ? React.createElement(window.lucide.Check, { size:12, color:'#fff' })
                      : <span style={{ fontSize:10, fontWeight:700, color:t.textMuted }}>{i+1}</span>
                    }
                  </div>
                  <span style={{ fontSize:13, color: questPhase==='active' && timer > (i*timerMax/3) ? t.textMuted : t.text, fontWeight:500, textDecoration: questPhase==='active' && timer > (i*timerMax/3) ? 'line-through' : 'none' }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ ...btn('startq'), background: questPhase==='active' ? t.surfaceAlt : t.primary, borderRadius:18, padding:'15px', textAlign:'center', marginTop:'auto' }}
              onClick={() => press('startq', () => setQuestPhase(questPhase==='idle' ? 'active' : 'idle'))}>
              <span style={{ color: questPhase==='active' ? t.textSub : '#fff', fontWeight:800, fontSize:16 }}>
                {questPhase==='idle' ? '▶  Start Quest' : '⏸  Pause'}
              </span>
            </div>
          </>
        )}
      </div>
    );
  }

  function ProgressScreen() {
    const weekDays = ['M','T','W','T','F','S','S'];
    const weekData = [3,5,2,4,3,0,1];
    const maxW = Math.max(...weekData);

    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:80, padding:'12px 16px 80px' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <p style={{ fontWeight:800, fontSize:22, color:t.text }}>Your Progress</p>
          <div style={{ background:t.streakBg, borderRadius:12, padding:'6px 12px', display:'flex', alignItems:'center', gap:5 }}>
            <span>🔥</span>
            <span style={{ fontWeight:800, fontSize:14, color:t.streakText }}>{streak}-day streak</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display:'flex', gap:10, marginBottom:16 }}>
          {[
            { label:'Total Points', val:points, icon:'💎', color:t.primary },
            { label:'Quests Done', val:completedQuests.length, icon:'✅', color:t.success },
            { label:'Best Streak', val:'7d', icon:'🏆', color:'#F59E0B' },
          ].map(s => (
            <div key={s.label} style={{ flex:1, background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:16, padding:'12px 10px', textAlign:'center' }}>
              <p style={{ fontSize:20 }}>{s.icon}</p>
              <p style={{ fontWeight:800, fontSize:16, color:s.color, margin:'2px 0' }}>{s.val}</p>
              <p style={{ fontSize:10, color:t.textMuted, fontWeight:500 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly chart */}
        <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:18, padding:16, marginBottom:16 }}>
          <p style={{ fontWeight:700, fontSize:14, color:t.text, marginBottom:14 }}>This Week</p>
          <div style={{ display:'flex', gap:8, alignItems:'flex-end', height:80 }}>
            {weekDays.map((d, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:'100%', background: weekData[i]>0 ? t.primary : t.border, borderRadius:6, height: maxW > 0 ? (weekData[i]/maxW)*64+4 : 4, transition:'height 0.3s', opacity: i === 6 ? 0.4 : 1 }} />
                <span style={{ fontSize:10, color: i===4 ? t.primary : t.textMuted, fontWeight: i===4 ? 700 : 500 }}>{d}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize:11, color:t.textMuted, marginTop:10 }}>18 quests completed this week ↑ 20% from last week</p>
        </div>

        {/* Quest breakdown */}
        <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:18, padding:16, marginBottom:16 }}>
          <p style={{ fontWeight:700, fontSize:14, color:t.text, marginBottom:12 }}>Quest Types</p>
          {[
            { type:'Focus Tasks', count:7, color:'#7C3AED', icon:'🎯' },
            { type:'Organize', count:6, color:'#059669', icon:'📋' },
            { type:'Calm Mode', count:5, color:'#0EA5E9', icon:'🌊' },
          ].map(qt => (
            <div key={qt.type} style={{ marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:600, color:t.text }}>{qt.icon} {qt.type}</span>
                <span style={{ fontSize:13, fontWeight:700, color:qt.color }}>{qt.count}</span>
              </div>
              <div style={{ background:t.border, borderRadius:6, height:6, overflow:'hidden' }}>
                <div style={{ background:qt.color, borderRadius:6, height:'100%', width:`${(qt.count/18)*100}%`, transition:'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:18, padding:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
            <p style={{ fontWeight:700, fontSize:14, color:t.text }}>Badges</p>
            <span style={{ fontSize:12, color:t.primary, fontWeight:600 }}>{BADGES.filter(b=>b.earned).length}/{BADGES.length} earned</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
            {BADGES.map(b => (
              <div key={b.id} style={{ textAlign:'center', padding:'10px 6px', background: b.earned ? t.chip : t.surfaceAlt, borderRadius:14, border:`1.5px solid ${b.earned ? t.primary+'44' : t.border}`, opacity: b.earned ? 1 : 0.5 }}>
                <div style={{ fontSize:26, marginBottom:4, filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.icon}</div>
                <p style={{ fontSize:10, fontWeight:700, color: b.earned ? t.chipText : t.textMuted }}>{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function CalmScreen() {
    const breathLabels = { inhale:'Breathe In', hold:'Hold', exhale:'Breathe Out' };
    const breathColors = { inhale:t.primary, hold:'#0EA5E9', exhale:'#059669' };
    const breathScale = breathActive ? (breathPhase==='inhale' ? 1.4 : breathPhase==='hold' ? 1.4 : 1.0) : 1.0;

    const calmQuests = QUESTS.filter(q => q.type === 'calm');

    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
        <div style={{ background:`linear-gradient(160deg, #0EA5E922, #7C3AED18)`, padding:'16px 20px 20px' }}>
          <p style={{ fontWeight:800, fontSize:22, color:t.text, marginBottom:4 }}>Calm Mode</p>
          <p style={{ fontSize:13, color:t.textSub }}>Breathe, reset, and come back stronger</p>
        </div>

        <div style={{ padding:'16px 16px 0' }}>
          {/* Breathing exercise */}
          <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:20, padding:20, marginBottom:16, textAlign:'center' }}>
            <p style={{ fontWeight:700, fontSize:15, color:t.text, marginBottom:4 }}>Box Breathing</p>
            <p style={{ fontSize:12, color:t.textSub, marginBottom:20 }}>4-4-6 pattern · reduces cortisol in 2 minutes</p>

            <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
              <div style={{ width:120, height:120, borderRadius:60, background:`${breathColors[breathPhase] || t.primary}18`, border:`3px solid ${breathColors[breathPhase] || t.primary}55`, display:'flex', alignItems:'center', justifyContent:'center', transform:`scale(${breathScale})`, transition:'transform 0.8s ease-in-out' }}>
                <div style={{ width:80, height:80, borderRadius:40, background:`${breathColors[breathPhase] || t.primary}30`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:11, fontWeight:800, color: breathColors[breathPhase] || t.primary }}>{breathLabels[breathPhase]}</span>
                </div>
              </div>
            </div>

            {breathActive && (
              <p style={{ fontSize:12, color:t.textSub, marginBottom:12 }}>Cycle {breathCount + 1} · {breathPhase} phase</p>
            )}

            <div style={{ ...btn('breath'), background: breathActive ? '#EF444418' : t.primary, border:`1.5px solid ${breathActive ? '#EF4444' : t.primary}`, borderRadius:14, padding:'12px 24px', display:'inline-block' }}
              onClick={() => press('breath', () => setBreathActive(!breathActive))}>
              <span style={{ color: breathActive ? '#EF4444' : '#fff', fontWeight:700, fontSize:14 }}>
                {breathActive ? '⏹  Stop' : '▶  Start Breathing'}
              </span>
            </div>
          </div>

          {/* Calm quests */}
          <p style={{ fontSize:13, fontWeight:700, color:t.textSub, marginBottom:10, letterSpacing:0.5, textTransform:'uppercase' }}>Calm Quests</p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {calmQuests.map(q => (
              <div key={q.id} style={{ ...btn(`cq-${q.id}`), display:'flex', alignItems:'center', gap:12, background:t.surface, border:`1.5px solid ${'#0EA5E9'}33`, borderRadius:16, padding:'12px 14px' }}
                onClick={() => press(`cq-${q.id}`, () => { setActiveQuest(q); setTimer(0); setTimerMax(q.duration); setQuestPhase('idle'); setTab('quest'); })}>
                <div style={{ width:40, height:40, borderRadius:12, background:'#0EA5E918', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {React.createElement(window.lucide[q.icon] || window.lucide.Wind, { size:18, color:'#0EA5E9' })}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:700, fontSize:14, color:t.text }}>{q.title}</p>
                  <p style={{ fontSize:11, color:t.textMuted }}>{q.desc.substring(0,40)}…</p>
                </div>
                <div style={{ flexShrink:0 }}>
                  <span style={{ background:'#0EA5E918', color:'#0EA5E9', padding:'4px 10px', borderRadius:10, fontSize:11, fontWeight:700 }}>{q.duration}s</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stress tips */}
          <div style={{ background:`linear-gradient(135deg, #0EA5E912, #7C3AED08)`, border:`1.5px solid #0EA5E933`, borderRadius:18, padding:16, marginTop:16 }}>
            <p style={{ fontWeight:700, fontSize:13, color:t.text, marginBottom:10 }}>💡 Quick Resets</p>
            {['Roll your shoulders back 3 times','Look away from your screen for 20 seconds','Unclench your jaw and relax your brow'].map((tip, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom: i<2 ? 8 : 0 }}>
                <div style={{ width:6, height:6, borderRadius:3, background:'#0EA5E9', flexShrink:0 }} />
                <span style={{ fontSize:12, color:t.textSub }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ProfileScreen() {
    const notifs = [
      { label:'Idle reminders', on:true },
      { label:'Streak warnings', on:true },
      { label:'Quest unlocks', on:false },
    ];
    const [notifState, setNotifState] = useState({ 0:true, 1:true, 2:false });

    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
        {/* Profile header */}
        <div style={{ background:`linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, padding:'20px 20px 28px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:60, height:60, borderRadius:30, background:'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>👤</div>
            <div>
              <p style={{ color:'#fff', fontWeight:800, fontSize:18 }}>Jordan Kim</p>
              <p style={{ color:'rgba(255,255,255,0.75)', fontSize:12 }}>Member since March 2026</p>
              <div style={{ background:'rgba(255,255,255,0.2)', borderRadius:10, padding:'3px 10px', marginTop:4, display:'inline-block' }}>
                <span style={{ color:'#fff', fontSize:11, fontWeight:700 }}>⚡ Level 5 Quester</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding:'16px 16px 0' }}>
          {/* Theme toggle */}
          <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:18, padding:'14px 16px', marginBottom:14 }}>
            <p style={{ fontWeight:700, fontSize:13, color:t.textSub, marginBottom:12, textTransform:'uppercase', letterSpacing:0.5 }}>Appearance</p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                {React.createElement(theme==='light' ? window.lucide.Sun : window.lucide.Moon, { size:20, color:t.primary })}
                <span style={{ fontWeight:600, fontSize:14, color:t.text }}>{theme==='light' ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
              <div style={{ ...btn('themetoggle'), width:50, height:28, borderRadius:14, background: theme==='dark' ? t.primary : t.border, padding:'3px', display:'flex', alignItems:'center', justifyContent: theme==='dark' ? 'flex-end' : 'flex-start', transition:'background 0.3s' }}
                onClick={() => press('themetoggle', () => setTheme(theme==='light' ? 'dark' : 'light'))}>
                <div style={{ width:22, height:22, borderRadius:11, background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,0.2)', transition:'all 0.2s' }} />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:18, padding:'14px 16px', marginBottom:14 }}>
            <p style={{ fontWeight:700, fontSize:13, color:t.textSub, marginBottom:12, textTransform:'uppercase', letterSpacing:0.5 }}>Notifications</p>
            {notifs.map((n, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: i<notifs.length-1 ? 12 : 0 }}>
                <span style={{ fontSize:14, color:t.text, fontWeight:500 }}>{n.label}</span>
                <div style={{ ...btn(`notif-${i}`), width:44, height:26, borderRadius:13, background: notifState[i] ? t.primary : t.border, padding:'2px', display:'flex', alignItems:'center', justifyContent: notifState[i] ? 'flex-end' : 'flex-start', transition:'background 0.3s' }}
                  onClick={() => press(`notif-${i}`, () => setNotifState(s => ({ ...s, [i]: !s[i] })))}>
                  <div style={{ width:20, height:20, borderRadius:10, background:'#fff', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Situation preferences */}
          <div style={{ background:t.surface, border:`1.5px solid ${t.border}`, borderRadius:18, padding:'14px 16px', marginBottom:14 }}>
            <p style={{ fontWeight:700, fontSize:13, color:t.textSub, marginBottom:12, textTransform:'uppercase', letterSpacing:0.5 }}>Preferred Situations</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {SITUATIONS.map(s => (
                <div key={s} style={{ ...btn(`ps-${s}`), padding:'6px 12px', borderRadius:14, background: situation===s ? t.primary : t.chip, color: situation===s ? '#fff' : t.chipText, fontSize:12, fontWeight:600 }}
                  onClick={() => press(`ps-${s}`, () => setSituation(s))}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Stats summary */}
          <div style={{ background:t.chip, borderRadius:18, padding:'14px 16px' }}>
            <p style={{ fontWeight:700, fontSize:13, color:t.chipText, marginBottom:10 }}>Account Stats</p>
            {[
              { label:'Total quests completed', val: completedQuests.length },
              { label:'Total points earned', val: points },
              { label:'Longest streak', val: '7 days' },
              { label:'Favorite quest type', val: 'Focus Tasks' },
            ].map((s, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom: i<3 ? 8 : 0 }}>
                <span style={{ fontSize:13, color:t.textSub }}>{s.label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:t.text }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id:'home', label:'Home', icon:'Home' },
    { id:'quest', label:'Quest', icon:'Swords' },
    { id:'progress', label:'Progress', icon:'BarChart2' },
    { id:'calm', label:'Calm', icon:'Wind' },
    { id:'profile', label:'Profile', icon:'User' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#e8e0f8', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ width:375, height:812, background:t.bg, borderRadius:50, boxShadow:`0 30px 80px rgba(0,0,0,0.25), 0 0 0 10px #1a1a1a, 0 0 0 12px #3a3a3a`, overflow:'hidden', display:'flex', flexDirection:'column', position:'relative' }}>
        <StatusBar />
        <DynamicIsland />

        {/* Screens */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {tab === 'home' && <HomeScreen />}
          {tab === 'quest' && <QuestScreen />}
          {tab === 'progress' && <ProgressScreen />}
          {tab === 'calm' && <CalmScreen />}
          {tab === 'profile' && <ProfileScreen />}
        </div>

        {/* Bottom Nav */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:t.navBg, borderTop:`1px solid ${t.border}`, display:'flex', paddingBottom:16, paddingTop:8, boxShadow:`0 -4px 20px ${t.shadow}` }}>
          {TABS.map(tb => {
            const active = tab === tb.id;
            return (
              <div key={tb.id} style={{ ...btn(`tab-${tb.id}`), flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer' }}
                onClick={() => press(`tab-${tb.id}`, () => setTab(tb.id))}>
                <div style={{ width:32, height:32, borderRadius:10, background: active ? t.primary+'18' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.2s' }}>
                  {React.createElement(window.lucide[tb.icon] || window.lucide.Circle, { size:18, color: active ? t.primary : t.textMuted })}
                </div>
                <span style={{ fontSize:10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted }}>{tb.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
