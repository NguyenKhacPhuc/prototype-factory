// Calm Quest – Turn daily meltdowns into tiny missions.
// Single-file Babel-standalone prototype. No imports needed.

const { useState, useEffect, useRef } = React;

(function injectFont() {
  if (!document.getElementById('cq-font')) {
    const s = document.createElement('style');
    s.id = 'cq-font';
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(s);
  }
})();

// ─── THEME SYSTEM ──────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0C0820',
    bgGrad: 'linear-gradient(180deg, #0C0820 0%, #130A2C 100%)',
    surface: '#180E36',
    card: '#1E1248',
    cardAlt: '#271860',
    cardBorder: 'rgba(148, 100, 255, 0.18)',
    primary: '#9B6BFF',
    primaryDark: '#6B35D4',
    primaryLight: '#C4A8FF',
    primaryGlow: 'rgba(155, 107, 255, 0.35)',
    secondary: '#22D3EE',
    accent: '#FFB347',
    accentGlow: 'rgba(255,179,71,0.3)',
    green: '#4ADE80',
    greenGlow: 'rgba(74,222,128,0.25)',
    red: '#F87171',
    pink: '#F472B6',
    star: '#FFD700',
    text: '#F2EEFF',
    textSub: '#B8A8DC',
    textMuted: '#7A6899',
    navBg: '#0E0924',
    navBorder: 'rgba(148,100,255,0.12)',
    divider: 'rgba(148,100,255,0.1)',
    shadow: '0 32px 80px rgba(0,0,0,0.55)',
    pillBg: 'rgba(155,107,255,0.15)',
  },
  light: {
    bg: '#F6F0FF',
    bgGrad: 'linear-gradient(180deg, #F6F0FF 0%, #EDE5FF 100%)',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#EEE7FF',
    cardBorder: 'rgba(124,58,237,0.14)',
    primary: '#7C3AED',
    primaryDark: '#5B21B6',
    primaryLight: '#8B5CF6',
    primaryGlow: 'rgba(124,58,237,0.25)',
    secondary: '#0891B2',
    accent: '#F59E0B',
    accentGlow: 'rgba(245,158,11,0.2)',
    green: '#10B981',
    greenGlow: 'rgba(16,185,129,0.2)',
    red: '#EF4444',
    pink: '#EC4899',
    star: '#D97706',
    text: '#1A0A42',
    textSub: '#5E4590',
    textMuted: '#9D8EC0',
    navBg: '#FFFFFF',
    navBorder: 'rgba(124,58,237,0.1)',
    divider: 'rgba(124,58,237,0.08)',
    shadow: '0 32px 80px rgba(80,40,160,0.18)',
    pillBg: 'rgba(124,58,237,0.1)',
  },
};

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 26px 0', height:40 }}>
      <span style={{ fontSize:15, fontWeight:800, color:t.text, letterSpacing:-0.2 }}>9:41</span>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill={t.textSub}>
          <path d="M7.5 2.2a8 8 0 015.6 2.3l1.4-1.4A10 10 0 007.5 0 10 10 0 00.5 3.1l1.4 1.4A8 8 0 017.5 2.2z"/>
          <path d="M7.5 5a5 5 0 013.5 1.4l1.4-1.4A7 7 0 007.5 3 7 7 0 003.6 5l1.4 1.4A5 5 0 017.5 5z"/>
          <circle cx="7.5" cy="9.5" r="1.5"/>
        </svg>
        <div style={{ display:'flex', alignItems:'center', gap:2 }}>
          <div style={{ width:22, height:11, border:`1.5px solid ${t.textSub}`, borderRadius:3, padding:'1.5px', display:'flex', alignItems:'center' }}>
            <div style={{ width:'75%', height:'100%', background:t.textSub, borderRadius:1.5 }}/>
          </div>
          <div style={{ width:2, height:5, background:t.textSub, borderRadius:1 }}/>
        </div>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{ display:'flex', justifyContent:'center', marginTop:4, marginBottom:2 }}>
      <div style={{ width:118, height:34, background:'#000', borderRadius:20 }}/>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [selMood, setSelMood] = useState(null);
  const [selTrigger, setSelTrigger] = useState(null);

  const moods = [
    { id:'happy',  emoji:'😊', label:'Happy',     col:'#FFD700' },
    { id:'sad',    emoji:'😢', label:'Sad',       col:'#74B9FF' },
    { id:'angry',  emoji:'😤', label:'Mad',       col:'#FF7675' },
    { id:'scared', emoji:'😰', label:'Scared',    col:'#A29BFE' },
    { id:'too-much', emoji:'🤯', label:'Too Much', col:'#FD79A8' },
    { id:'tired',  emoji:'😴', label:'Tired',     col:'#81ECEC' },
  ];

  const triggers = ['School','Home','Friends','Change in plans','Too loud','Not sure'];

  const recent = [
    { title:'Pack the Worry Clouds', emoji:'☁️', when:'Today',     stars:3, mood:'Mad' },
    { title:'Wake the Sleepy Robot',  emoji:'🤖', when:'Yesterday', stars:3, mood:'Tired' },
    { title:'Find the Brave Color',   emoji:'🎨', when:'2 days ago',stars:2, mood:'Scared' },
  ];

  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'12px 20px 16px', background:t.bgGrad, fontFamily:"'Nunito', sans-serif" }}>
      {/* Greeting */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
        <div>
          <div style={{ fontSize:12, fontWeight:800, color:t.textMuted, letterSpacing:1, textTransform:'uppercase' }}>MON, MARCH 23</div>
          <div style={{ fontSize:26, fontWeight:900, color:t.text, lineHeight:1.15, marginTop:2 }}>Hi, Maya! 👋</div>
          <div style={{ fontSize:13, color:t.textSub, marginTop:2 }}>Ready for today's adventure?</div>
        </div>
        <div style={{ width:46, height:46, borderRadius:15, background:t.card, border:`1.5px solid ${t.cardBorder}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:`0 4px 14px ${t.primaryGlow}` }}>🦸</div>
      </div>

      {/* Mood Checker */}
      <div style={{ background:t.card, borderRadius:24, padding:'16px 14px', marginBottom:14, border:`1px solid ${t.cardBorder}`, boxShadow:`0 4px 20px ${t.primaryGlow}` }}>
        <div style={{ fontSize:15, fontWeight:900, color:t.text, textAlign:'center' }}>How are you feeling right now?</div>
        <div style={{ fontSize:12, color:t.textMuted, textAlign:'center', marginBottom:12, marginTop:2 }}>Tap the face that matches</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          {moods.map(m => (
            <button key={m.id} onClick={() => setSelMood(m.id)} style={{
              padding:'12px 6px', borderRadius:16,
              border:`2px solid ${selMood===m.id ? m.col : 'transparent'}`,
              background: selMood===m.id ? `${m.col}22` : t.cardAlt,
              cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:4,
              transform: selMood===m.id ? 'scale(1.06)' : 'scale(1)', transition:'all 0.15s',
            }}>
              <span style={{ fontSize:28 }}>{m.emoji}</span>
              <span style={{ fontSize:11, fontWeight:800, color: selMood===m.id ? m.col : t.textSub }}>{m.label}</span>
            </button>
          ))}
        </div>

        {selMood && (
          <div style={{ marginTop:12, padding:'12px', background:t.cardAlt, borderRadius:16, border:`1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize:12, fontWeight:800, color:t.text, marginBottom:8 }}>What started this feeling?</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {triggers.map(s => (
                <button key={s} onClick={() => setSelTrigger(s)} style={{
                  padding:'5px 12px', borderRadius:20, cursor:'pointer', fontSize:11, fontWeight:700,
                  background: selTrigger===s ? t.primary : t.pillBg,
                  border:`1px solid ${selTrigger===s ? t.primary : t.cardBorder}`,
                  color: selTrigger===s ? '#fff' : t.primaryLight,
                  transition:'all 0.15s',
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Mission CTA */}
      <div style={{
        borderRadius:24, padding:'18px 18px', marginBottom:14,
        background:`linear-gradient(135deg, ${t.primaryDark} 0%, ${t.primary} 100%)`,
        position:'relative', overflow:'hidden',
        boxShadow:`0 8px 28px ${t.primaryGlow}`,
      }}>
        <div style={{ fontSize:10, fontWeight:900, letterSpacing:2, color:'rgba(255,255,255,0.65)', textTransform:'uppercase', marginBottom:6 }}>⚡ TODAY'S MISSION</div>
        <div style={{ fontSize:22, fontWeight:900, color:'#fff', lineHeight:1.2, marginBottom:4 }}>Pack the Worry Clouds</div>
        <div style={{ fontSize:13, color:'rgba(255,255,255,0.8)', marginBottom:14, lineHeight:1.4 }}>Help Cloudy pack away big feelings in 3 short steps</div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ background:'rgba(255,255,255,0.22)', borderRadius:30, padding:'8px 18px', cursor:'pointer' }}>
            <span style={{ fontSize:13, fontWeight:900, color:'#fff' }}>▶ START MISSION</span>
          </div>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.55)' }}>~3 mins</span>
        </div>
        <div style={{ position:'absolute', right:-12, top:-14, fontSize:72, opacity:0.12 }}>☁️</div>
      </div>

      {/* Recent Adventures */}
      <div style={{ fontSize:14, fontWeight:900, color:t.text, marginBottom:10 }}>Recent Adventures</div>
      {recent.map((a,i) => (
        <div key={i} style={{
          display:'flex', alignItems:'center', gap:12, padding:'11px 14px',
          background:t.card, borderRadius:18, marginBottom:8,
          border:`1px solid ${t.cardBorder}`,
        }}>
          <div style={{ width:44, height:44, borderRadius:12, background:t.cardAlt, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{a.emoji}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:800, color:t.text }}>{a.title}</div>
            <div style={{ fontSize:11, color:t.textMuted, marginTop:1 }}>{a.mood} • {a.when}</div>
          </div>
          <div style={{ display:'flex', gap:1 }}>
            {[1,2,3].map(s => <span key={s} style={{ fontSize:13, color: s<=a.stars ? t.star : t.cardAlt }}>★</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── QUEST SCREEN ─────────────────────────────────────────────────────────────
function QuestScreen({ t }) {
  const [step, setStep] = useState(0);
  const [selFeel, setSelFeel] = useState(null);
  const [selSit, setSelSit] = useState(null);
  const [breathCount, setBreathCount] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);
  const [selColor, setSelColor] = useState(null);

  const feelings = [
    { id:'mad',      emoji:'😤', label:'Mad',         col:'#FF6B6B' },
    { id:'sad',      emoji:'😢', label:'Sad',         col:'#74B9FF' },
    { id:'scared',   emoji:'😰', label:'Scared',      col:'#A29BFE' },
    { id:'toomuch',  emoji:'🤯', label:'Too Much',    col:'#FD79A8' },
    { id:'tired',    emoji:'😴', label:'Very Tired',  col:'#81ECEC' },
    { id:'wiggly',   emoji:'🤪', label:'Silly Wiggles',col:'#FFD93D' },
  ];

  const situations = [
    { id:'school',  emoji:'🏫', label:'School stuff' },
    { id:'home',    emoji:'🏠', label:'Home stuff' },
    { id:'friends', emoji:'👥', label:'With friends' },
    { id:'change',  emoji:'🔄', label:'Change in plans' },
    { id:'loud',    emoji:'📢', label:'Too loud/busy' },
    { id:'unknown', emoji:'🤷', label:'Not sure' },
  ];

  const calmColors = [
    { col:'#74B9FF', label:'Sky Blue' },
    { col:'#81ECEC', label:'Mint' },
    { col:'#A29BFE', label:'Lavender' },
    { col:'#55EFC4', label:'Ocean' },
    { col:'#FDCB6E', label:'Sunny' },
    { col:'#FFB8C6', label:'Soft Rose' },
  ];

  const ProgressBar = ({ pct }) => (
    <div style={{ height:7, background:t.cardAlt, borderRadius:4, overflow:'hidden' }}>
      <div style={{ width:`${pct}%`, height:'100%', background:`linear-gradient(90deg, ${t.primary}, ${t.primaryLight})`, borderRadius:4, transition:'width 0.4s' }}/>
    </div>
  );

  const CircleTap = ({ count, max, color, onTap, doneEmoji, activeEmoji, unit }) => (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <div
        onClick={() => { if(count < max) onTap(); }}
        style={{
          width:140, height:140, borderRadius:'50%',
          background: count>=max ? `${t.green}18` : `${color}18`,
          border: `4px solid ${count>=max ? t.green : color}`,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          cursor: count<max ? 'pointer' : 'default',
          transition:'all 0.2s',
          boxShadow: count>=max ? `0 0 24px ${t.greenGlow}` : `0 0 20px ${color}44`,
        }}
      >
        <span style={{ fontSize:38 }}>{count>=max ? doneEmoji : activeEmoji}</span>
        <span style={{ fontSize:30, fontWeight:900, color: count>=max ? t.green : color }}>{count}/{max}</span>
        <span style={{ fontSize:10, color:t.textMuted, fontWeight:700 }}>{count>=max ? 'Done!' : unit}</span>
      </div>
    </div>
  );

  const BackBtn = ({ to }) => (
    <button onClick={() => setStep(to)} style={{ background:'none', border:'none', color:t.textSub, cursor:'pointer', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', gap:4, marginBottom:16, padding:0, fontFamily:"'Nunito',sans-serif" }}>
      ← Back
    </button>
  );

  const BigBtn = ({ label, disabled, onClick, color }) => (
    <button onClick={onClick} disabled={disabled} style={{
      width:'100%', padding:'15px', borderRadius:18, border:'none',
      background: disabled ? t.cardAlt : (color || `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`),
      color: disabled ? t.textMuted : '#fff',
      fontSize:15, fontWeight:900, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily:"'Nunito',sans-serif", transition:'opacity 0.15s',
      boxShadow: disabled ? 'none' : `0 6px 18px ${t.primaryGlow}`,
    }}>{label}</button>
  );

  const content = () => {
    switch(step) {

      case 0:
        return (
          <div style={{ padding:'16px 20px' }}>
            <div style={{ textAlign:'center', marginBottom:22 }}>
              <div style={{ fontSize:48, marginBottom:8 }}>🌟</div>
              <div style={{ fontSize:22, fontWeight:900, color:t.text, lineHeight:1.2 }}>Start a Calm Mission</div>
              <div style={{ fontSize:13, color:t.textSub, marginTop:5 }}>What feeling needs a mission today?</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {feelings.map(f => (
                <button key={f.id} onClick={() => { setSelFeel(f.id); setStep(1); }} style={{
                  padding:'16px 10px', borderRadius:20,
                  border:`2px solid ${f.col}40`, background:`${f.col}14`,
                  cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                  fontFamily:"'Nunito',sans-serif",
                }}>
                  <span style={{ fontSize:34 }}>{f.emoji}</span>
                  <span style={{ fontSize:13, fontWeight:800, color:t.text }}>{f.label}</span>
                  <div style={{ width:28, height:3, background:f.col, borderRadius:2 }}/>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div style={{ padding:'16px 20px' }}>
            <BackBtn to={0}/>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:44, marginBottom:8 }}>🤔</div>
              <div style={{ fontSize:20, fontWeight:900, color:t.text }}>What started this feeling?</div>
              <div style={{ fontSize:13, color:t.textSub, marginTop:4 }}>This helps pick the right mission</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {situations.map(s => (
                <button key={s.id} onClick={() => { setSelSit(s.id); setStep(2); }} style={{
                  padding:'16px 10px', borderRadius:18,
                  border:`1.5px solid ${t.cardBorder}`, background:t.card,
                  cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                  fontFamily:"'Nunito',sans-serif",
                }}>
                  <span style={{ fontSize:30 }}>{s.emoji}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:t.text, textAlign:'center', lineHeight:1.3 }}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div style={{ padding:'16px 20px', flex:1, display:'flex', flexDirection:'column', height:'100%' }}>
            <BackBtn to={1}/>
            <div style={{
              background:`linear-gradient(145deg, ${t.primaryDark} 0%, ${t.primary} 100%)`,
              borderRadius:24, padding:'24px 20px', flex:1, marginBottom:14,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center',
              boxShadow:`0 10px 32px ${t.primaryGlow}`, position:'relative', overflow:'hidden',
            }}>
              <div style={{ fontSize:72, marginBottom:10 }}>☁️</div>
              <div style={{ fontSize:10, fontWeight:900, letterSpacing:2, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', marginBottom:8 }}>YOUR MISSION</div>
              <div style={{ fontSize:24, fontWeight:900, color:'#fff', lineHeight:1.2, marginBottom:12 }}>Pack the Worry Clouds</div>
              <div style={{ fontSize:14, color:'rgba(255,255,255,0.85)', lineHeight:1.6, maxWidth:260, marginBottom:20 }}>
                "Oh no! The worry clouds are too heavy! Can you help me pack them away in just 3 little steps?"
              </div>
              <div style={{ fontSize:16, color:'rgba(255,255,255,0.8)' }}>— Cloudy ☁️</div>
              <div style={{ display:'flex', gap:8, marginTop:16 }}>
                {[1,2,3].map(i => <div key={i} style={{ width:30, height:4, background:'rgba(255,255,255,0.35)', borderRadius:2 }}/>)}
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:6 }}>3 steps • ~3 minutes</div>
              <div style={{ position:'absolute', right:-18, bottom:-18, fontSize:90, opacity:0.08 }}>☁️</div>
            </div>
            <BigBtn label="🚀 Let's Go!" onClick={() => setStep(3)}/>
          </div>
        );

      case 3:
        return (
          <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', height:'100%' }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:12, fontWeight:800, color:t.textSub }}>Step 1 of 3</span>
                <span style={{ fontSize:12, color:t.textMuted }}>Blow Away the Clouds</span>
              </div>
              <ProgressBar pct={33}/>
            </div>
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, textAlign:'center' }}>
              <div style={{ fontSize:56 }}>💨</div>
              <div style={{ fontSize:20, fontWeight:900, color:t.text, lineHeight:1.2 }}>Blow Away the<br/>Worry Clouds!</div>
              <div style={{ fontSize:13, color:t.textSub, lineHeight:1.5, maxWidth:260 }}>
                Take a big deep breath in, then blow out slowly. Each breath packs one cloud away! 🌬️
              </div>
              <CircleTap count={breathCount} max={3} color={t.primary} onTap={() => setBreathCount(c=>c+1)} doneEmoji="✅" activeEmoji="☁️" unit="tap to breathe"/>
              <div style={{ display:'flex', gap:10 }}>
                {[0,1,2].map(i => <span key={i} style={{ fontSize:22, opacity:i<breathCount ? 0.18 : 1, transition:'opacity 0.4s' }}>☁️</span>)}
              </div>
            </div>
            <BigBtn label={breathCount>=3 ? '✨ Clouds packed! Next →' : `Blow ${3-breathCount} more time${3-breathCount!==1?'s':''}`} disabled={breathCount<3} onClick={() => setStep(4)}/>
          </div>
        );

      case 4:
        return (
          <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', height:'100%' }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:12, fontWeight:800, color:t.textSub }}>Step 2 of 3</span>
                <span style={{ fontSize:12, color:t.textMuted }}>Shake the Worries Out</span>
              </div>
              <ProgressBar pct={66}/>
            </div>
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, textAlign:'center' }}>
              <div style={{ fontSize:56 }}>🕺</div>
              <div style={{ fontSize:20, fontWeight:900, color:t.text, lineHeight:1.2 }}>Shake Your<br/>Worries Loose!</div>
              <div style={{ fontSize:13, color:t.textSub, lineHeight:1.5, maxWidth:260 }}>
                Stand up and wiggle your whole body 5 times! Worries can't hold on when you shake! 🌀
              </div>
              <CircleTap count={shakeCount} max={5} color={t.accent} onTap={() => setShakeCount(c=>c+1)} doneEmoji="✅" activeEmoji="🕺" unit="tap to shake"/>
              <div style={{ display:'flex', gap:6 }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{ width:26, height:8, borderRadius:4, background: i<shakeCount ? t.accent : t.cardAlt, transition:'background 0.2s' }}/>
                ))}
              </div>
            </div>
            <BigBtn label={shakeCount>=5 ? '🎉 Worries shaken! Last step →' : `Shake ${5-shakeCount} more time${5-shakeCount!==1?'s':''}`} disabled={shakeCount<5} onClick={() => setStep(5)} color={shakeCount>=5 ? `linear-gradient(135deg, ${t.accent}cc, ${t.accent}99)` : undefined}/>
          </div>
        );

      case 5:
        return (
          <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', height:'100%' }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:12, fontWeight:800, color:t.textSub }}>Step 3 of 3</span>
                <span style={{ fontSize:12, color:t.textMuted }}>Find Your Calm Color</span>
              </div>
              <ProgressBar pct={100}/>
            </div>
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, textAlign:'center' }}>
              <div style={{ fontSize:56 }}>🎨</div>
              <div style={{ fontSize:20, fontWeight:900, color:t.text, lineHeight:1.2 }}>Find the<br/>Brave Color!</div>
              <div style={{ fontSize:13, color:t.textSub, lineHeight:1.5, maxWidth:260 }}>
                Every brave adventurer has a color that helps them feel steady. Which feels cozy right now?
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, width:'100%' }}>
                {calmColors.map(c => (
                  <button key={c.col} onClick={() => setSelColor(c.col)} style={{
                    padding:'12px 6px', borderRadius:16,
                    border:`3px solid ${selColor===c.col ? c.col : 'transparent'}`,
                    background:`${c.col}22`, cursor:'pointer',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                    transform: selColor===c.col ? 'scale(1.06)' : 'scale(1)', transition:'all 0.15s',
                    fontFamily:"'Nunito',sans-serif",
                  }}>
                    <div style={{ width:38, height:38, borderRadius:'50%', background:c.col, boxShadow:`0 4px 12px ${c.col}66` }}/>
                    <span style={{ fontSize:11, fontWeight:700, color:t.text }}>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <BigBtn
              label={selColor ? '🏆 Complete Mission!' : 'Choose your color first'}
              disabled={!selColor}
              onClick={() => selColor && setStep(6)}
              color={selColor ? `linear-gradient(135deg, ${selColor}cc, ${selColor}99)` : undefined}
            />
          </div>
        );

      case 6:
        return (
          <div style={{ padding:'20px', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap:14 }}>
            <div style={{ fontSize:80 }}>🎉</div>
            <div style={{ fontSize:11, fontWeight:900, letterSpacing:2, color:t.primary, textTransform:'uppercase' }}>MISSION COMPLETE!</div>
            <div style={{ fontSize:28, fontWeight:900, color:t.text, lineHeight:1.2 }}>You Did It,<br/>Maya! ⭐</div>
            <div style={{ fontSize:14, color:t.textSub, lineHeight:1.6, maxWidth:270 }}>
              You blew away 3 worry clouds, shook 5 times, and found your brave color. That's HUGE! 💪
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {[1,2,3].map(i => <span key={i} style={{ fontSize:36, color:t.star }}>★</span>)}
            </div>
            <div style={{ background:t.card, borderRadius:20, padding:'14px 18px', width:'100%', border:`1px solid ${t.cardBorder}` }}>
              <div style={{ fontSize:12, fontWeight:700, color:t.textMuted, marginBottom:10, textAlign:'left' }}>Mission Results</div>
              <div style={{ display:'flex', justifyContent:'space-around' }}>
                {[['3','CLOUDS\nPACKED',t.primary],['5','BODY\nSHAKES',t.accent],['3m','TIME TO\nCALM',t.green]].map(([val,lbl,col],i) => (
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:22, fontWeight:900, color:col }}>{val}</div>
                    <div style={{ fontSize:9, color:t.textMuted, fontWeight:700, whiteSpace:'pre-line', lineHeight:1.3, marginTop:2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => { setStep(0); setBreathCount(0); setShakeCount(0); setSelColor(null); setSelFeel(null); setSelSit(null); }} style={{
              width:'100%', padding:'15px', borderRadius:18, border:'none',
              background:`linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
              color:'#fff', fontSize:15, fontWeight:900, cursor:'pointer',
              fontFamily:"'Nunito',sans-serif",
              boxShadow:`0 8px 22px ${t.primaryGlow}`,
            }}>🌟 Start New Mission</button>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:t.bgGrad, fontFamily:"'Nunito',sans-serif" }}>
      {step === 0 && (
        <div style={{ padding:'14px 20px 10px', borderBottom:`1px solid ${t.divider}` }}>
          <div style={{ fontSize:20, fontWeight:900, color:t.text }}>Calm Missions ✨</div>
          <div style={{ fontSize:13, color:t.textSub }}>Choose a feeling to begin your adventure</div>
        </div>
      )}
      <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column' }}>
        {content()}
      </div>
    </div>
  );
}

// ─── PROGRESS SCREEN ──────────────────────────────────────────────────────────
function ProgressScreen({ t }) {
  const badges = [
    { emoji:'☁️', label:'Cloud Packer',  earned:true,  desc:'5 breathing missions' },
    { emoji:'🌈', label:'Color Finder',  earned:true,  desc:'Found brave color 3x' },
    { emoji:'🦁', label:'Brave Heart',   earned:true,  desc:'Mission while upset' },
    { emoji:'⚡', label:'Quick Reset',   earned:false, desc:'Calm in under 2 min' },
    { emoji:'🔥', label:'7-Day Streak',  earned:false, desc:'7 days in a row' },
    { emoji:'🌟', label:'All-Star',      earned:false, desc:'20 missions total' },
  ];

  const weekMoods = [
    { day:'M', level:85, col:'#FFD700' },
    { day:'T', level:30, col:'#FF6B6B' },
    { day:'W', level:90, col:'#4ADE80' },
    { day:'T', level:55, col:'#81ECEC' },
    { day:'F', level:75, col:'#FD79A8' },
    { day:'S', level:95, col:'#FFD700' },
    { day:'S', level:40, col:'#A29BFE' },
  ];

  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'12px 20px 16px', background:t.bgGrad, fontFamily:"'Nunito',sans-serif" }}>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:22, fontWeight:900, color:t.text }}>Maya's Journey 🗺️</div>
        <div style={{ fontSize:13, color:t.textSub }}>You're getting better every day!</div>
      </div>

      {/* Level Card */}
      <div style={{
        background:`linear-gradient(145deg, ${t.primaryDark} 0%, ${t.primary} 100%)`,
        borderRadius:24, padding:'18px 20px', marginBottom:14,
        position:'relative', overflow:'hidden',
        boxShadow:`0 10px 32px ${t.primaryGlow}`,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
          <div>
            <div style={{ fontSize:10, fontWeight:900, letterSpacing:1.5, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', marginBottom:4 }}>YOUR LEVEL</div>
            <div style={{ fontSize:22, fontWeight:900, color:'#fff' }}>Brave Explorer ⭐</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.75)', marginTop:2 }}>Level 3 · 240/300 XP</div>
          </div>
          <div style={{ fontSize:48, opacity:0.9 }}>🧭</div>
        </div>
        <div style={{ height:8, background:'rgba(255,255,255,0.2)', borderRadius:4, overflow:'hidden', marginBottom:4 }}>
          <div style={{ width:'80%', height:'100%', background:'#fff', borderRadius:4 }}/>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.55)' }}>Level 3</span>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.55)' }}>60 XP to Level 4</span>
        </div>
        <div style={{ position:'absolute', right:-22, bottom:-22, fontSize:90, opacity:0.08 }}>⭐</div>
      </div>

      {/* Stats Row */}
      <div style={{ display:'flex', gap:10, marginBottom:14 }}>
        {[['14','Missions','⚡',t.primary],['4','Day Streak','🔥','#FF6B6B'],['1m 40s','Best Time','⏱️',t.green]].map(([v,l,e,c],i) => (
          <div key={i} style={{ flex:1, background:t.card, borderRadius:16, padding:'12px 6px', textAlign:'center', border:`1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize:16 }}>{e}</div>
            <div style={{ fontSize:17, fontWeight:900, color:c, marginTop:2 }}>{v}</div>
            <div style={{ fontSize:10, color:t.textMuted, fontWeight:700, lineHeight:1.2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Highlight */}
      <div style={{ background:`${t.green}14`, border:`1.5px solid ${t.green}40`, borderRadius:18, padding:'12px 14px', marginBottom:14, display:'flex', gap:10 }}>
        <span style={{ fontSize:20 }}>🎉</span>
        <div>
          <div style={{ fontSize:13, fontWeight:900, color:t.green }}>You recovered faster today!</div>
          <div style={{ fontSize:12, color:t.textSub, lineHeight:1.4, marginTop:2 }}>Yesterday it took 8 minutes. Today just 3 minutes! That's huge! 💪</div>
        </div>
      </div>

      {/* Mood chart */}
      <div style={{ background:t.card, borderRadius:20, padding:'14px 16px', marginBottom:14, border:`1px solid ${t.cardBorder}` }}>
        <div style={{ fontSize:13, fontWeight:800, color:t.text, marginBottom:12 }}>This Week's Mood Journey</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:70 }}>
          {weekMoods.map((m,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <div style={{ width:'100%', minHeight:8, height:`${m.level * 0.55}px`, background:`${m.col}55`, border:`2px solid ${m.col}`, borderRadius:'5px 5px 0 0', transition:'height 0.3s' }}/>
              <span style={{ fontSize:9, color:t.textMuted, fontWeight:800 }}>{m.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ fontSize:14, fontWeight:900, color:t.text, marginBottom:10 }}>Achievement Badges</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
        {badges.map((b,i) => (
          <div key={i} style={{
            background: b.earned ? t.card : t.cardAlt,
            borderRadius:18, padding:'14px 8px', textAlign:'center',
            border:`1.5px solid ${b.earned ? t.cardBorder : 'transparent'}`,
            opacity: b.earned ? 1 : 0.45,
            boxShadow: b.earned ? `0 4px 14px ${t.primaryGlow}` : 'none',
          }}>
            <div style={{ fontSize:28, filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.emoji}</div>
            <div style={{ fontSize:10, fontWeight:800, color: b.earned ? t.text : t.textMuted, marginTop:4, lineHeight:1.3 }}>{b.label}</div>
            <div style={{ fontSize:9, color:t.textMuted, marginTop:2, lineHeight:1.2 }}>{b.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GUIDE SCREEN ─────────────────────────────────────────────────────────────
function GuideScreen({ t }) {
  const patterns = [
    { trigger:'Transitions',      freq:3, trend:'↑', col:'#FF6B6B' },
    { trigger:'Overstimulation',  freq:1, trend:'↓', col:t.green },
    { trigger:'Social conflict',  freq:2, trend:'→', col:t.accent },
  ];

  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'12px 20px 16px', background:t.bgGrad, fontFamily:"'Nunito',sans-serif" }}>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:11, fontWeight:900, color:t.primary, letterSpacing:1.5, textTransform:'uppercase', marginBottom:4 }}>FOR ADULTS</div>
        <div style={{ fontSize:22, fontWeight:900, color:t.text }}>Caregiver Guide 💜</div>
        <div style={{ fontSize:13, color:t.textSub }}>Help Maya navigate big feelings</div>
      </div>

      {/* Current alert */}
      <div style={{ background:`${t.accent}14`, border:`1.5px solid ${t.accent}50`, borderRadius:20, padding:'14px 16px', marginBottom:14 }}>
        <div style={{ fontSize:10, fontWeight:900, color:t.accent, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>⚡ CURRENT CHECK-IN</div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <span style={{ fontSize:32 }}>😤</span>
          <div>
            <div style={{ fontSize:15, fontWeight:900, color:t.text }}>Maya reported: Mad</div>
            <div style={{ fontSize:12, color:t.textSub }}>Trigger: Change in plans · 3 mins ago</div>
          </div>
        </div>
        <div style={{ fontSize:13, color:t.textSub, lineHeight:1.5, paddingTop:10, borderTop:`1px solid ${t.accent}28` }}>
          <strong style={{ color:t.text }}>What Maya is likely experiencing:</strong> Difficulty with transitions. Her nervous system is interpreting the change as a threat. She needs co-regulation before reasoning.
        </div>
      </div>

      {/* What to say */}
      <div style={{ background:t.card, borderRadius:20, padding:'14px 16px', marginBottom:10, border:`1px solid ${t.cardBorder}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:t.green }}/>
          <div style={{ fontSize:13, fontWeight:900, color:t.text }}>✅ What to say</div>
        </div>
        {[
          '"I can see you\'re really upset about the change. That makes sense."',
          '"Let\'s do a quick Calm Mission together before we talk about it."',
          '"You\'re safe. We can figure this out when you\'re ready."',
        ].map((l,i) => (
          <div key={i} style={{ padding:'10px 12px', background:t.cardAlt, borderRadius:12, marginBottom:6, fontSize:13, color:t.text, fontStyle:'italic', lineHeight:1.4, border:`1px solid ${t.green}20` }}>
            {l}
          </div>
        ))}
      </div>

      {/* What NOT to say */}
      <div style={{ background:t.card, borderRadius:20, padding:'14px 16px', marginBottom:14, border:`1px solid ${t.cardBorder}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:t.red }}/>
          <div style={{ fontSize:13, fontWeight:900, color:t.text }}>❌ Avoid saying</div>
        </div>
        {[
          '"Stop overreacting, it\'s not a big deal."',
          '"You\'re too old to act like this."',
          '"If you don\'t calm down right now…"',
        ].map((l,i) => (
          <div key={i} style={{ padding:'10px 12px', background:`${t.red}10`, borderRadius:12, marginBottom:6, fontSize:13, color:t.text, fontStyle:'italic', lineHeight:1.4, border:`1px solid ${t.red}20` }}>
            {l}
          </div>
        ))}
      </div>

      {/* Tip */}
      <div style={{ background:`linear-gradient(135deg, ${t.primary}18, ${t.secondary}14)`, border:`1.5px solid ${t.primary}28`, borderRadius:20, padding:'14px 16px', marginBottom:14 }}>
        <div style={{ fontSize:10, fontWeight:900, color:t.primaryLight, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>💡 TIP OF THE DAY</div>
        <div style={{ fontSize:13, fontWeight:700, color:t.text, lineHeight:1.55 }}>
          When kids face transitions, a "5-minute warning" before change helps the nervous system prepare. Try: "In 5 minutes, we'll switch from X to Y."
        </div>
      </div>

      {/* Patterns */}
      <div style={{ background:t.card, borderRadius:20, padding:'14px 16px', marginBottom:20, border:`1px solid ${t.cardBorder}` }}>
        <div style={{ fontSize:13, fontWeight:900, color:t.text, marginBottom:12 }}>Maya's Patterns This Week</div>
        {patterns.map((p,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 0', borderBottom: i<2 ? `1px solid ${t.divider}` : 'none' }}>
            <span style={{ fontSize:13, color:t.text, fontWeight:700 }}>{p.trigger}</span>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:58, height:6, background:t.cardAlt, borderRadius:3, overflow:'hidden' }}>
                <div style={{ width:`${p.freq*22}%`, height:'100%', background:p.col, borderRadius:3 }}/>
              </div>
              <span style={{ fontSize:15, color:p.col, fontWeight:900, minWidth:16 }}>{p.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark }) {
  const [voiceOn, setVoiceOn] = useState(true);
  const [notifsOn, setNotifsOn] = useState(true);
  const [animOn, setAnimOn] = useState(true);

  const Toggle = ({ value, onChange, color }) => (
    <div onClick={() => onChange(!value)} style={{ width:48, height:26, borderRadius:13, background: value ? (color||t.primary) : t.cardAlt, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3, left: value ? 25 : 3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}/>
    </div>
  );

  const sections = [
    {
      title:'Appearance',
      items:[
        { label:'Dark Mode',    sub:'Better for evenings',        icon: isDark?'🌙':'☀️', ctrl:<Toggle value={isDark} onChange={setIsDark}/> },
        { label:'Animations',   sub:'Motion effects in missions', icon:'✨',               ctrl:<Toggle value={animOn} onChange={setAnimOn}/> },
      ]
    },
    {
      title:'Experience',
      items:[
        { label:'Voice Guidance', sub:'Audio prompts during missions', icon:'🎙️', ctrl:<Toggle value={voiceOn} onChange={setVoiceOn}/> },
        { label:'Reminders',      sub:'Daily check-in notifications',  icon:'🔔', ctrl:<Toggle value={notifsOn} onChange={setNotifsOn}/> },
      ]
    },
    {
      title:'Account',
      items:[
        { label:'Child\'s Age',  sub:'7 years old',             icon:'🎂', ctrl:<span style={{ fontSize:12, color:t.textMuted }}>›</span> },
        { label:'Caregiver PIN', sub:'Protect adult settings',  icon:'🔐', ctrl:<span style={{ fontSize:12, color:t.textMuted }}>›</span> },
        { label:'Reset Progress',sub:'Start journey over',      icon:'🔄', ctrl:<span style={{ fontSize:12, color:t.red, fontWeight:700, fontFamily:"'Nunito',sans-serif" }}>Reset</span> },
      ]
    },
  ];

  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'12px 20px 16px', background:t.bgGrad, fontFamily:"'Nunito',sans-serif" }}>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:22, fontWeight:900, color:t.text }}>Settings ⚙️</div>
        <div style={{ fontSize:13, color:t.textSub }}>Customize the experience</div>
      </div>

      {/* Profile */}
      <div style={{ background:t.card, borderRadius:22, padding:'16px 18px', marginBottom:18, border:`1px solid ${t.cardBorder}`, display:'flex', alignItems:'center', gap:14, boxShadow:`0 4px 18px ${t.primaryGlow}` }}>
        <div style={{ width:56, height:56, borderRadius:18, background:`${t.primary}30`, border:`2.5px solid ${t.primary}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>🦸</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:18, fontWeight:900, color:t.text }}>Maya</div>
          <div style={{ fontSize:12, color:t.textSub }}>Age 7 · Level 3 Brave Explorer</div>
          <div style={{ fontSize:11, color:t.primary, fontWeight:800, marginTop:2 }}>14 missions completed</div>
        </div>
        <div style={{ width:34, height:34, borderRadius:10, background:t.cardAlt, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:16 }}>✏️</div>
      </div>

      {sections.map((sec,si) => (
        <div key={si} style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:900, color:t.textMuted, letterSpacing:1, textTransform:'uppercase', marginBottom:8, paddingLeft:4 }}>{sec.title}</div>
          <div style={{ background:t.card, borderRadius:20, border:`1px solid ${t.cardBorder}`, overflow:'hidden' }}>
            {sec.items.map((item,ii) => (
              <div key={ii} style={{ display:'flex', alignItems:'center', padding:'13px 16px', borderBottom: ii<sec.items.length-1 ? `1px solid ${t.divider}` : 'none', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:11, background:t.cardAlt, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{item.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:t.text }}>{item.label}</div>
                  <div style={{ fontSize:11, color:t.textMuted, marginTop:1 }}>{item.sub}</div>
                </div>
                {item.ctrl}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign:'center', paddingBottom:20, marginTop:6 }}>
        <div style={{ fontSize:13, color:t.textMuted }}>Calm Quest v1.0.0</div>
        <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>Made with 💜 for kids everywhere</div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ tabs, activeTab, setActiveTab, t }) {
  return (
    <div style={{ background:t.navBg, borderTop:`1px solid ${t.navBorder}`, padding:'6px 10px 22px', display:'flex', justifyContent:'space-around' }}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            padding:'6px 12px', borderRadius:14, cursor:'pointer',
            background: active ? `${t.primary}1E` : 'transparent',
            transition:'all 0.15s', minWidth:50,
          }}>
            {React.createElement(Icon, { size:22, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
            <span style={{ fontSize:10, fontWeight: active ? 800 : 600, color: active ? t.primary : t.textMuted, letterSpacing:0.2, fontFamily:"'Nunito',sans-serif" }}>
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id:'home',     label:'Home',    icon:window.lucide.Home },
    { id:'quest',    label:'Quest',   icon:window.lucide.Sparkles },
    { id:'progress', label:'Journey', icon:window.lucide.Star },
    { id:'guide',    label:'Guide',   icon:window.lucide.Heart },
    { id:'settings', label:'Settings',icon:window.lucide.Settings },
  ];

  const screens = {
    home:     HomeScreen,
    quest:    QuestScreen,
    progress: ProgressScreen,
    guide:    GuideScreen,
    settings: SettingsScreen,
  };

  const CurrentScreen = screens[activeTab];

  return (
    <div style={{ minHeight:'100vh', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Nunito', sans-serif" }}>
      <div style={{
        width:375, height:812,
        background:t.bg,
        borderRadius:50,
        overflow:'hidden',
        position:'relative',
        boxShadow: isDark
          ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1.5px rgba(255,255,255,0.07)'
          : '0 32px 80px rgba(80,40,160,0.22), 0 0 0 1.5px rgba(124,58,237,0.15)',
        display:'flex',
        flexDirection:'column',
      }}>
        <StatusBar t={t}/>
        <DynamicIsland/>
        <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
          <CurrentScreen t={t} isDark={isDark} setIsDark={setIsDark}/>
        </div>
        <BottomNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} t={t}/>
      </div>
    </div>
  );
}
