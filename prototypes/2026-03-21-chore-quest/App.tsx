function App() {
  const { useState, useEffect, useRef } = React;

  /* ─── THEME SYSTEM ─────────────────────────────────────────────── */
  const themes = {
    dark: {
      bg: '#0D0B1A',
      surface: '#16122B',
      card: '#1E1A35',
      cardAlt: '#261F42',
      primary: '#8B5CF6',
      primaryLight: '#A78BFA',
      primaryGlow: 'rgba(139,92,246,0.25)',
      accent: '#F59E0B',
      accentLight: '#FCD34D',
      accentGlow: 'rgba(245,158,11,0.25)',
      text: '#F1F0FF',
      textSec: '#9488C9',
      textMute: '#534A7A',
      border: '#2A2347',
      success: '#10B981',
      danger: '#EF4444',
      navBg: '#100D20',
      grad: 'linear-gradient(135deg,#8B5CF6 0%,#6D28D9 100%)',
      gradGold: 'linear-gradient(135deg,#F59E0B 0%,#D97706 100%)',
    },
    light: {
      bg: '#F3F0FF',
      surface: '#FFFFFF',
      card: '#EDE9FE',
      cardAlt: '#E5DFFD',
      primary: '#7C3AED',
      primaryLight: '#8B5CF6',
      primaryGlow: 'rgba(124,58,237,0.15)',
      accent: '#D97706',
      accentLight: '#F59E0B',
      accentGlow: 'rgba(217,119,6,0.15)',
      text: '#1E1B4B',
      textSec: '#5B21B6',
      textMute: '#9F81E8',
      border: '#DDD6FE',
      success: '#059669',
      danger: '#DC2626',
      navBg: '#FFFFFF',
      grad: 'linear-gradient(135deg,#7C3AED 0%,#5B21B6 100%)',
      gradGold: 'linear-gradient(135deg,#D97706 0%,#B45309 100%)',
    },
  };

  /* ─── GLOBAL STATE ──────────────────────────────────────────────── */
  const [theme, setTheme]               = useState('dark');
  const [activeTab, setActiveTab]       = useState('quests');
  const [activeQuest, setActiveQuest]   = useState(null);
  const [coins, setCoins]               = useState(245);
  const [xp, setXp]                     = useState(68);
  const [pressedId, setPressedId]       = useState(null);
  const [questStep, setQuestStep]       = useState(0);
  const [voiceActive, setVoiceActive]   = useState(false);
  const [cameraOpen, setCameraOpen]     = useState(false);
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [notifOn, setNotifOn]           = useState(true);
  const [voiceOn, setVoiceOn]           = useState(true);
  const [doneQuests, setDoneQuests]     = useState(['q1']);
  const [questComplete, setQuestComplete] = useState(false);
  const [showRedeemMsg, setShowRedeemMsg] = useState('');

  const t = themes[theme];
  const level = 7;

  /* ─── FONT ──────────────────────────────────────────────────────── */
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
    * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 2px; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(0.93)} 100%{transform:scale(1)} }
  `;

  /* ─── DATA ──────────────────────────────────────────────────────── */
  const quests = [
    {
      id: 'q1', title: 'The Laundry Kingdom', mission: 'Sort the Royal Garments',
      desc: "The kingdom's enchanted wardrobe has been scrambled by a mischievous sprite! Sort the socks and fold the royal tunics to restore order to the realm.",
      diff: 'Easy', xpR: 30, coinR: 15, time: '5 min', emoji: '🧦', color: '#8B5CF6',
      steps: ['Gather all socks from the basket', 'Match each pair together', 'Fold and stack shirts neatly', 'Return basket to its place'],
    },
    {
      id: 'q2', title: "The Kitchen Dragon", mission: 'Help the Kitchen Dragon',
      desc: "The friendly Kitchen Dragon needs your help! Put the dishes away and wipe the magic countertops to earn the Dragon's blessing and a special reward.",
      diff: 'Medium', xpR: 45, coinR: 25, time: '8 min', emoji: '🐉', color: '#F59E0B',
      steps: ['Rinse any remaining dishes', 'Load items into the dishwasher', 'Wipe down the countertops', 'Sweep the floor clean'],
    },
    {
      id: 'q3', title: 'The Toy Castle', mission: 'Rebuild the Toy Castle',
      desc: "The toy soldiers are scattered across the land! Return them to their castle and sort the realm's treasures to protect the kingdom from chaos.",
      diff: 'Easy', xpR: 25, coinR: 12, time: '10 min', emoji: '🏰', color: '#10B981',
      steps: ['Pick up all toys from the floor', 'Sort by type into their bins', 'Straighten the bookshelf', 'Fluff the pillows'],
    },
    {
      id: 'q4', title: "Hero's Morning Ritual", mission: "Complete the Hero's Morning Quest",
      desc: "Every great hero begins the day with sacred rituals. Complete your full morning routine to unlock the power of the day and earn the Champion's blessing!",
      diff: 'Hard', xpR: 60, coinR: 35, time: '15 min', emoji: '⚔️', color: '#EF4444',
      steps: ['Wake up without being called', 'Make your bed perfectly', 'Brush teeth for 2 full minutes', "Get dressed in your hero's gear", "Eat a champion's breakfast"],
    },
  ];

  const badges = [
    { id: 'b1', name: 'Laundry Legend', emoji: '🧦', earned: true,  desc: 'Completed 5 laundry missions' },
    { id: 'b2', name: 'Dragon Friend',  emoji: '🐉', earned: true,  desc: 'Helped in the kitchen 3 times' },
    { id: 'b3', name: 'Early Bird',     emoji: '🌅', earned: true,  desc: 'Completed morning quest 7 days in a row' },
    { id: 'b4', name: 'Speed Runner',   emoji: '⚡', earned: false, desc: 'Complete any quest under 3 mins' },
    { id: 'b5', name: 'Perfect Week',   emoji: '👑', earned: false, desc: 'Complete all quests for 7 days' },
    { id: 'b6', name: 'World Builder',  emoji: '🌍', earned: false, desc: 'Unlock all 5 kingdom areas' },
  ];

  const worldAreas = [
    { id: 'w1', name: 'The Laundry Kingdom',  unlocked: true,  progress: 100, emoji: '🏰', color: '#8B5CF6' },
    { id: 'w2', name: "Dragon's Kitchen Cave", unlocked: true,  progress: 60,  emoji: '🌋', color: '#F59E0B' },
    { id: 'w3', name: 'The Toy Forest',        unlocked: true,  progress: 30,  emoji: '🌲', color: '#10B981' },
    { id: 'w4', name: 'Morning Sun Temple',    unlocked: false, progress: 0,   emoji: '🌟', color: '#EF4444' },
    { id: 'w5', name: 'The Enchanted Garden',  unlocked: false, progress: 0,   emoji: '🌺', color: '#EC4899' },
  ];

  const storeItems = [
    { name: 'Extra Screen Time (30 min)', cost: 100, emoji: '📱' },
    { name: "Choose Tonight's Dinner",    cost: 200, emoji: '🍕' },
    { name: 'Stay Up 30 Min Later',       cost: 150, emoji: '🌙' },
    { name: 'Skip One Chore (once)',      cost: 300, emoji: '🎟️' },
  ];

  /* ─── HELPERS ───────────────────────────────────────────────────── */
  const press = (id, cb) => {
    setPressedId(id);
    setTimeout(() => { setPressedId(null); if (cb) cb(); }, 180);
  };

  const diffColor = (d) =>
    d === 'Easy' ? t.success : d === 'Medium' ? t.accent : t.danger;

  const diffBg = (d) =>
    d === 'Easy' ? t.success + '22' : d === 'Medium' ? t.accent + '22' : t.danger + '22';

  const openQuest = (q) => {
    setActiveQuest(q);
    setQuestStep(0);
    setVoiceActive(false);
    setCameraOpen(false);
    setQuestComplete(doneQuests.includes(q.id));
    setActiveTab('quest-detail');
  };

  /* ─── SCREEN: QUEST MAP ─────────────────────────────────────────── */
  const QuestMap = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', animation: 'fadeIn 0.3s ease' }}>
      {/* Hero Banner */}
      <div style={{
        background: t.grad, borderRadius: '22px', padding: '20px',
        marginBottom: '18px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -16, top: -16, fontSize: '90px', opacity: 0.12, animation: 'float 4s ease-in-out infinite' }}>⚔️</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '2px' }}>
          GOOD MORNING, HERO!
        </div>
        <div style={{ color: '#fff', fontSize: '21px', fontWeight: '800', marginBottom: '14px' }}>
          3 Epic Quests Await 🗡️
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { val: coins, label: 'Gold', icon: '🪙' },
            { val: `Lv.${level}`, label: 'Rank', icon: '⚔️' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '8px 14px', textAlign: 'center' }}>
              <div style={{ color: '#fff', fontSize: '17px', fontWeight: '800' }}>{s.icon} {s.val}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '8px 14px', flex: 1 }}>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px', fontWeight: '600', marginBottom: '5px' }}>XP PROGRESS</div>
            <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '6px', height: '8px' }}>
              <div style={{ background: 'white', width: `${xp}%`, height: '100%', borderRadius: '6px', transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', marginTop: '3px' }}>{xp}/100</div>
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div style={{
        background: `linear-gradient(135deg, #F9731622 0%, #EF444422 100%)`,
        border: `1px solid #F9731644`,
        borderRadius: '14px', padding: '14px 16px', marginBottom: '18px',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div style={{ fontSize: '30px', animation: 'float 2s ease-in-out infinite' }}>🔥</div>
        <div>
          <div style={{ color: t.text, fontSize: '14px', fontWeight: '700' }}>7-Day Streak!</div>
          <div style={{ color: t.textSec, fontSize: '12px' }}>1 more day to unlock the Perfect Week badge 👑</div>
        </div>
        <div style={{ marginLeft: 'auto', color: '#F97316', fontSize: '12px', fontWeight: '700' }}>+50 🪙</div>
      </div>

      {/* Quest List */}
      <div style={{ color: t.text, fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>Today's Quest Log</div>
      {quests.map(q => {
        const done = doneQuests.includes(q.id);
        const isPressed = pressedId === q.id;
        return (
          <div
            key={q.id}
            onClick={() => press(q.id, () => openQuest(q))}
            style={{
              background: t.surface,
              borderRadius: '16px', padding: '14px', marginBottom: '10px',
              border: `1px solid ${done ? t.border : q.color + '44'}`,
              opacity: done ? 0.6 : 1,
              transform: isPressed ? 'scale(0.96)' : 'scale(1)',
              transition: 'all 0.15s ease', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '13px',
            }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: q.color + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', flexShrink: 0,
              border: `1px solid ${q.color}33`,
            }}>
              {q.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' }}>
                <div style={{ color: t.text, fontSize: '14px', fontWeight: '700', lineHeight: '1.2' }}>{q.mission}</div>
                {done && <div style={{ color: t.success, fontSize: '16px', flexShrink: 0 }}>✓</div>}
              </div>
              <div style={{ color: t.textSec, fontSize: '11px', marginBottom: '7px' }}>{q.title}</div>
              <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                <div style={{ background: diffBg(q.diff), color: diffColor(q.diff), fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px' }}>
                  {q.diff}
                </div>
                <div style={{ color: t.textMute, fontSize: '11px' }}>⏱ {q.time}</div>
                <div style={{ color: t.accent, fontSize: '11px', fontWeight: '700' }}>+{q.coinR} 🪙</div>
                <div style={{ color: t.primaryLight, fontSize: '11px', fontWeight: '600' }}>+{q.xpR} XP</div>
              </div>
            </div>
            <div style={{ color: t.textMute, fontSize: '16px', flexShrink: 0 }}>›</div>
          </div>
        );
      })}
    </div>
  );

  /* ─── SCREEN: QUEST DETAIL ──────────────────────────────────────── */
  const QuestDetail = () => {
    const q = activeQuest;
    if (!q) return null;
    const done = doneQuests.includes(q.id);

    const completeQuest = () => {
      if (!done) {
        setDoneQuests(prev => [...prev, q.id]);
        setCoins(prev => prev + q.coinR);
        setXp(prev => Math.min(100, prev + 15));
        setQuestComplete(true);
      }
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', animation: 'fadeIn 0.3s ease' }}>
        {/* Quest Header */}
        <div style={{
          background: `linear-gradient(160deg, ${q.color} 0%, ${q.color}88 100%)`,
          padding: '16px 16px 20px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, fontSize: '110px', opacity: 0.1, animation: 'float 5s ease-in-out infinite' }}>
            {q.emoji}
          </div>
          <button
            onClick={() => setActiveTab('quests')}
            style={{
              background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '10px',
              padding: '6px 12px', color: 'white', fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px',
            }}
          >
            ← Quest Log
          </button>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', marginBottom: '4px' }}>
            {q.title.toUpperCase()}
          </div>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>{q.mission}</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[`⏱ ${q.time}`, `+${q.coinR} 🪙`, `+${q.xpR} XP`, q.diff].map((tag, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.22)', borderRadius: '8px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '600' }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Mission Briefing */}
          <div style={{
            background: t.card, borderRadius: '16px', padding: '15px', marginBottom: '16px',
            border: `1px solid ${t.border}`,
          }}>
            <div style={{ color: t.textMute, fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '7px', textTransform: 'uppercase' }}>
              📜 Mission Briefing
            </div>
            <div style={{ color: t.textSec, fontSize: '13px', lineHeight: '1.65' }}>{q.desc}</div>
          </div>

          {/* Steps */}
          <div style={{ color: t.text, fontSize: '15px', fontWeight: '800', marginBottom: '10px' }}>Quest Steps</div>
          {q.steps.map((step, i) => (
            <div
              key={i}
              onClick={() => setQuestStep(i)}
              style={{
                background: i === questStep ? q.color + '18' : t.surface,
                borderRadius: '13px', padding: '13px',
                marginBottom: '8px',
                border: `1px solid ${i === questStep ? q.color + '66' : t.border}`,
                display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                background: i < questStep ? t.success : (i === questStep ? q.color : t.cardAlt),
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '700',
              }}>
                {i < questStep ? '✓' : i + 1}
              </div>
              <div style={{
                color: i < questStep ? t.textMute : (i === questStep ? t.text : t.textSec),
                fontSize: '13px', fontWeight: i === questStep ? '700' : '500',
                textDecoration: i < questStep ? 'line-through' : 'none',
              }}>
                {step}
              </div>
              {i === questStep && (
                <div style={{ marginLeft: 'auto', color: q.color, fontSize: '14px' }}>●</div>
              )}
            </div>
          ))}

          {/* Voice & Camera */}
          <div style={{ display: 'flex', gap: '10px', margin: '16px 0' }}>
            {[
              { label: voiceActive ? '🎙️ Stop Guide' : '🎙️ Voice Guide', active: voiceActive, toggle: () => setVoiceActive(!voiceActive), color: t.primary },
              { label: cameraOpen ? '📷 Hide Verify' : '📷 Verify Done', active: cameraOpen, toggle: () => setCameraOpen(!cameraOpen), color: t.accent },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.toggle}
                style={{
                  flex: 1, border: `1px solid ${btn.active ? btn.color : t.border}`,
                  borderRadius: '13px', padding: '13px 8px',
                  background: btn.active ? btn.color + '22' : t.surface,
                  color: btn.active ? btn.color : t.textSec,
                  fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {voiceActive && (
            <div style={{
              background: t.primaryGlow, border: `1px solid ${t.primary}66`,
              borderRadius: '14px', padding: '14px', marginBottom: '12px',
              display: 'flex', alignItems: 'flex-start', gap: '10px',
            }}>
              <div style={{ fontSize: '22px', animation: 'pulse 1.5s ease-in-out infinite' }}>🔊</div>
              <div style={{ color: t.text, fontSize: '13px', lineHeight: '1.6', fontStyle: 'italic' }}>
                "Great work, brave hero! Now it's time for step {questStep + 1}: <strong>{q.steps[questStep]}</strong>. You've totally got this!"
              </div>
            </div>
          )}

          {cameraOpen && (
            <div style={{
              background: t.card, border: `2px dashed ${t.accent}88`,
              borderRadius: '14px', padding: '24px', marginBottom: '12px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '42px', marginBottom: '8px', animation: 'float 3s ease-in-out infinite' }}>📸</div>
              <div style={{ color: t.text, fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>Show Your Work!</div>
              <div style={{ color: t.textSec, fontSize: '12px', lineHeight: '1.5' }}>
                Point the camera at your completed task to verify it and earn bonus coins!
              </div>
              <div style={{
                marginTop: '12px', background: t.accentGlow,
                border: `1px solid ${t.accent}44`, borderRadius: '10px', padding: '10px',
                color: t.accent, fontSize: '12px', fontWeight: '600',
              }}>
                📸 Camera access required — tap to allow
              </div>
            </div>
          )}

          {/* Complete / Done */}
          {questComplete || done ? (
            <div style={{
              background: t.success + '22', border: `1px solid ${t.success}55`,
              borderRadius: '16px', padding: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '6px' }}>🎉</div>
              <div style={{ color: t.success, fontSize: '16px', fontWeight: '800' }}>Quest Complete!</div>
              <div style={{ color: t.textSec, fontSize: '13px', marginTop: '4px' }}>+{q.coinR} coins and +{q.xpR} XP earned!</div>
            </div>
          ) : (
            <button
              onClick={() => press('complete', completeQuest)}
              style={{
                width: '100%', background: t.grad, border: 'none',
                borderRadius: '16px', padding: '16px', color: 'white',
                fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                transform: pressedId === 'complete' ? 'scale(0.96)' : 'scale(1)',
                transition: 'transform 0.15s ease',
                boxShadow: `0 8px 24px ${t.primaryGlow}`,
              }}
            >
              ⚔️ Complete Quest! +{q.coinR} 🪙
            </button>
          )}
        </div>
      </div>
    );
  };

  /* ─── SCREEN: KINGDOM ───────────────────────────────────────────── */
  const Kingdom = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ color: t.textSec, fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
        Complete quests to unlock new lands and grow your magical kingdom ✨
      </div>

      {/* World Map Visual */}
      <div style={{
        background: 'linear-gradient(160deg,#1a0a3d 0%,#0d1a4a 50%,#0a2d1a 100%)',
        borderRadius: '22px', padding: '20px', marginBottom: '20px',
        minHeight: '170px', position: 'relative', overflow: 'hidden',
        border: `1px solid ${t.border}`,
      }}>
        {[
          { emoji: '🏰', top: '14px', left: '18px', size: '32px', unlocked: true },
          { emoji: '🌋', top: '20px', right: '30px', size: '28px', unlocked: true },
          { emoji: '🌲', bottom: '24px', left: '36px', size: '30px', unlocked: true },
          { emoji: '🌟', bottom: '20px', right: '24px', size: '22px', unlocked: false },
          { emoji: '🌺', top: '48%', right: '70px', size: '20px', unlocked: false },
        ].map((a, i) => (
          <div key={i} style={{
            position: 'absolute', fontSize: a.size,
            top: a.top, bottom: a.bottom, left: a.left, right: a.right,
            opacity: a.unlocked ? 1 : 0.25,
            animation: a.unlocked ? `float ${3 + i * 0.5}s ease-in-out infinite` : 'none',
          }}>
            {a.emoji}
          </div>
        ))}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '40px', marginBottom: '8px', animation: 'float 3s ease-in-out infinite' }}>🗺️</div>
          <div style={{ color: 'white', fontSize: '16px', fontWeight: '800' }}>The Realm of Chore Quest</div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px' }}>
            3 of 5 areas discovered
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', height: '6px', margin: '10px auto 0', maxWidth: '140px' }}>
            <div style={{ background: 'rgba(255,255,255,0.8)', width: '60%', height: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      </div>

      {/* World Areas */}
      <div style={{ color: t.text, fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>World Areas</div>
      {worldAreas.map(area => (
        <div key={area.id} style={{
          background: t.surface, borderRadius: '14px', padding: '14px',
          marginBottom: '10px',
          border: `1px solid ${area.unlocked ? area.color + '44' : t.border}`,
          display: 'flex', alignItems: 'center', gap: '13px',
          opacity: area.unlocked ? 1 : 0.5,
        }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: area.color + '22', border: `1px solid ${area.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0,
          }}>
            {area.emoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: t.text, fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>
              {area.name} {!area.unlocked && '🔒'}
            </div>
            <div style={{ background: t.cardAlt, borderRadius: '4px', height: '6px', marginBottom: '3px' }}>
              <div style={{
                background: `linear-gradient(90deg, ${area.color}, ${area.color}bb)`,
                width: `${area.progress}%`, height: '100%', borderRadius: '4px',
                transition: 'width 0.6s ease',
              }} />
            </div>
            <div style={{ color: t.textMute, fontSize: '11px' }}>
              {area.unlocked ? `${area.progress}% explored` : 'Locked — complete more quests to unlock'}
            </div>
          </div>
          {area.progress === 100 && <div style={{ color: t.success, fontSize: '18px' }}>✓</div>}
        </div>
      ))}
    </div>
  );

  /* ─── SCREEN: REWARDS ───────────────────────────────────────────── */
  const Rewards = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', animation: 'fadeIn 0.3s ease' }}>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'Gold Coins', value: coins, icon: '🪙', color: t.accent,    bg: t.accentGlow },
          { label: 'Hero Level', value: `Lv.${level}`, icon: '⚔️', color: t.primaryLight, bg: t.primaryGlow },
          { label: 'Quests Done', value: '24', icon: '✅', color: t.success,  bg: t.success + '22' },
          { label: 'Day Streak', value: '7 🔥', icon: '', color: '#F97316', bg: '#F9731622' },
        ].map((s, i) => (
          <div key={i} style={{
            background: s.bg, border: `1px solid ${s.color}33`,
            borderRadius: '16px', padding: '16px', textAlign: 'center',
          }}>
            {s.icon && <div style={{ fontSize: '26px', marginBottom: '6px' }}>{s.icon}</div>}
            <div style={{ color: s.color, fontSize: '22px', fontWeight: '900', lineHeight: '1' }}>{s.value}</div>
            <div style={{ color: t.textSec, fontSize: '11px', marginTop: '4px', fontWeight: '500' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ color: t.text, fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>
        Badge Collection <span style={{ color: t.textMute, fontSize: '12px', fontWeight: '500' }}>3/6</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {badges.map(b => (
          <div key={b.id} style={{
            background: b.earned ? t.surface : t.card,
            border: `1px solid ${b.earned ? t.primary + '55' : t.border}`,
            borderRadius: '14px', padding: '14px', textAlign: 'center',
            opacity: b.earned ? 1 : 0.45,
          }}>
            <div style={{ fontSize: '30px', marginBottom: '7px', filter: b.earned ? 'none' : 'grayscale(100%)' }}>
              {b.emoji}
            </div>
            <div style={{ color: t.text, fontSize: '10px', fontWeight: '700', lineHeight: '1.3', marginBottom: '6px' }}>
              {b.name}
            </div>
            {b.earned ? (
              <div style={{
                background: t.primary, color: 'white',
                fontSize: '9px', fontWeight: '800', borderRadius: '4px',
                padding: '2px 6px', display: 'inline-block', letterSpacing: '0.5px',
              }}>
                EARNED
              </div>
            ) : (
              <div style={{ color: t.textMute, fontSize: '9px' }}>{b.desc}</div>
            )}
          </div>
        ))}
      </div>

      {/* Reward Store */}
      <div style={{ color: t.text, fontSize: '15px', fontWeight: '800', marginBottom: '4px' }}>Reward Store</div>
      <div style={{ color: t.textSec, fontSize: '12px', marginBottom: '12px' }}>Spend your coins on real-life rewards</div>

      {showRedeemMsg ? (
        <div style={{
          background: t.success + '22', border: `1px solid ${t.success}44`,
          borderRadius: '14px', padding: '14px', marginBottom: '12px',
          textAlign: 'center', animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '4px' }}>🎉</div>
          <div style={{ color: t.success, fontSize: '14px', fontWeight: '700' }}>{showRedeemMsg}</div>
        </div>
      ) : null}

      {storeItems.map((item, i) => {
        const canAfford = coins >= item.cost;
        return (
          <div key={i} style={{
            background: t.surface, borderRadius: '14px', padding: '14px',
            marginBottom: '10px', border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ fontSize: '28px' }}>{item.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: t.text, fontSize: '13px', fontWeight: '600' }}>{item.name}</div>
              <div style={{ color: t.accent, fontSize: '12px', fontWeight: '700', marginTop: '2px' }}>🪙 {item.cost} coins</div>
            </div>
            <button
              disabled={!canAfford}
              onClick={() => {
                if (canAfford) {
                  setCoins(c => c - item.cost);
                  setShowRedeemMsg(`${item.emoji} "${item.name}" sent to parent for approval!`);
                  setTimeout(() => setShowRedeemMsg(''), 3000);
                }
              }}
              style={{
                background: canAfford ? t.gradGold : t.card,
                border: 'none', borderRadius: '10px', padding: '8px 14px',
                color: canAfford ? 'white' : t.textMute,
                fontSize: '12px', fontWeight: '700',
                cursor: canAfford ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              {canAfford ? 'Redeem' : 'Need more'}
            </button>
          </div>
        );
      })}
    </div>
  );

  /* ─── SCREEN: PROFILE / SETTINGS ───────────────────────────────── */
  const Profile = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', animation: 'fadeIn 0.3s ease' }}>
      {/* Hero Profile Card */}
      <div style={{
        background: t.grad, borderRadius: '22px', padding: '22px',
        marginBottom: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: '80px', opacity: 0.1 }}>⚔️</div>
        <div style={{
          width: '76px', height: '76px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          margin: '0 auto 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px',
          border: '3px solid rgba(255,255,255,0.4)',
        }}>
          🧒
        </div>
        <div style={{ color: 'white', fontSize: '19px', fontWeight: '800' }}>Alex the Brave</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', marginTop: '3px' }}>
          Level {level} Hero · {doneQuests.length + 21} quests completed
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
          {['🏅', '🐉', '🌅'].map((e, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '6px 10px', fontSize: '16px' }}>
              {e}
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div style={{ color: t.textMute, fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '4px' }}>
        Appearance
      </div>
      <div style={{ background: t.surface, borderRadius: '14px', padding: '14px', marginBottom: '16px', border: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: t.text, fontSize: '14px', fontWeight: '600' }}>{theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}</div>
          <div style={{ color: t.textSec, fontSize: '12px' }}>Switch app appearance</div>
        </div>
        <button
          onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          style={{
            width: '52px', height: '28px', borderRadius: '14px',
            background: theme === 'dark' ? t.primary : t.border,
            border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
          }}
        >
          <div style={{
            position: 'absolute', top: '3px',
            left: theme === 'dark' ? '26px' : '3px',
            width: '22px', height: '22px', borderRadius: '50%', background: 'white',
            transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }} />
        </button>
      </div>

      {/* App Settings */}
      <div style={{ color: t.textMute, fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '4px' }}>
        App Settings
      </div>
      <div style={{ background: t.surface, borderRadius: '14px', marginBottom: '16px', border: `1px solid ${t.border}`, overflow: 'hidden' }}>
        {[
          { label: 'Notifications', sub: 'Reminders & quest alerts', val: notifOn, set: setNotifOn, icon: '🔔' },
          { label: 'Voice Narration', sub: 'Audio quest guidance', val: voiceOn, set: setVoiceOn, icon: '🎙️' },
        ].map((item, i, arr) => (
          <div key={i} style={{
            padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '20px' }}>{item.icon}</div>
              <div>
                <div style={{ color: t.text, fontSize: '14px', fontWeight: '600' }}>{item.label}</div>
                <div style={{ color: t.textSec, fontSize: '11px' }}>{item.sub}</div>
              </div>
            </div>
            <button
              onClick={() => item.set(!item.val)}
              style={{
                width: '44px', height: '24px', borderRadius: '12px',
                background: item.val ? t.success : t.cardAlt,
                border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
              }}
            >
              <div style={{
                position: 'absolute', top: '2px',
                left: item.val ? '22px' : '2px',
                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </button>
          </div>
        ))}
      </div>

      {/* Parent Controls */}
      <div style={{ color: t.textMute, fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '4px' }}>
        Parent Controls
      </div>
      <div style={{ background: t.surface, borderRadius: '14px', border: `1px solid ${t.border}`, overflow: 'hidden' }}>
        {!parentUnlocked ? (
          <div
            onClick={() => setParentUnlocked(true)}
            style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px', background: t.primaryGlow,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
            }}>🔐</div>
            <div>
              <div style={{ color: t.text, fontSize: '14px', fontWeight: '600' }}>Parent Zone</div>
              <div style={{ color: t.textSec, fontSize: '12px' }}>Enter PIN to manage family settings</div>
            </div>
            <div style={{ color: t.textMute, marginLeft: 'auto', fontSize: '18px' }}>›</div>
          </div>
        ) : (
          <>
            {[
              { label: 'Manage Quests', sub: 'Add, edit & assign chores', icon: '📋' },
              { label: 'Set Schedule', sub: 'Daily routine & timing', icon: '📅' },
              { label: 'Reward Rules', sub: 'Configure store options', icon: '🎁' },
              { label: 'Progress Report', sub: 'Weekly summary & insights', icon: '📊' },
              { label: 'Child Profiles', sub: 'Manage multiple heroes', icon: '👨‍👩‍👧' },
            ].map((item, i, arr) => (
              <div key={i} style={{
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', background: t.primaryGlow,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: t.text, fontSize: '14px', fontWeight: '600' }}>{item.label}</div>
                  <div style={{ color: t.textSec, fontSize: '11px' }}>{item.sub}</div>
                </div>
                <div style={{ color: t.textMute, marginLeft: 'auto', fontSize: '18px' }}>›</div>
              </div>
            ))}
          </>
        )}
      </div>

      <div style={{ height: '16px' }} />
    </div>
  );

  /* ─── NAVIGATION TABS ───────────────────────────────────────────── */
  const tabs = [
    { id: 'quests',  label: 'Quests',  emoji: '⚔️' },
    { id: 'kingdom', label: 'Kingdom', emoji: '🗺️' },
    { id: 'rewards', label: 'Rewards', emoji: '🏆' },
    { id: 'settings', label: 'Profile', emoji: '👤' },
  ];

  /* ─── CONTENT ROUTER ────────────────────────────────────────────── */
  const renderContent = () => {
    switch (activeTab) {
      case 'quests':       return <QuestMap />;
      case 'quest-detail': return <QuestDetail />;
      case 'kingdom':      return <Kingdom />;
      case 'rewards':      return <Rewards />;
      case 'settings':     return <Profile />;
      default:             return <QuestMap />;
    }
  };

  const showNav = activeTab !== 'quest-detail';

  /* ─── RENDER ────────────────────────────────────────────────────── */
  return (
    <>
      <style>{fontStyle}</style>
      <div style={{
        minHeight: '100vh', background: '#e8e4f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif",
        backgroundImage: 'radial-gradient(ellipse at 30% 20%, #d4c9f066 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #c7d2fe44 0%, transparent 60%)',
      }}>
        {/* Phone Frame */}
        <div style={{
          width: '375px', height: '812px', background: t.bg,
          borderRadius: '50px', overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 50px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)',
          transition: 'background 0.4s ease',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
            width: '126px', height: '37px', background: '#000000',
            borderRadius: '20px', zIndex: 200,
          }} />

          {/* Status Bar */}
          <div style={{
            height: '60px', paddingTop: '14px', paddingLeft: '22px', paddingRight: '22px',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexShrink: 0, zIndex: 10,
          }}>
            <div style={{ color: t.text, fontSize: '15px', fontWeight: '700', paddingBottom: '3px' }}>9:41</div>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center', paddingBottom: '3px' }}>
              {/* Signal */}
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                {[4, 7, 10, 13].map((h, i) => (
                  <div key={i} style={{ width: '3px', height: `${h}px`, background: t.text, borderRadius: '1px', opacity: i < 3 ? 1 : 0.4 }} />
                ))}
              </div>
              {/* WiFi */}
              <div style={{ color: t.text, fontSize: '11px', fontWeight: '600' }}>WiFi</div>
              {/* Battery */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                <div style={{
                  border: `1.5px solid ${t.text}`, borderRadius: '3px',
                  width: '22px', height: '12px', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ background: t.text, width: '80%', height: '100%', borderRadius: '1px' }} />
                </div>
                <div style={{ width: '2px', height: '6px', background: t.text, borderRadius: '1px', opacity: 0.6 }} />
              </div>
            </div>
          </div>

          {/* Page Header (not shown in quest detail) */}
          {showNav && (
            <div style={{
              padding: '2px 18px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
            }}>
              <div>
                <div style={{ color: t.primary, fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px' }}>CHORE QUEST</div>
                <div style={{ color: t.text, fontSize: '21px', fontWeight: '900', lineHeight: '1.1' }}>
                  {activeTab === 'quests'  && '⚔️ Quest Log'}
                  {activeTab === 'kingdom' && '🗺️ My Kingdom'}
                  {activeTab === 'rewards' && '🏆 Rewards'}
                  {activeTab === 'settings' && '👤 Profile'}
                </div>
              </div>
              <div style={{
                background: t.accentGlow, borderRadius: '14px', padding: '8px 14px',
                display: 'flex', alignItems: 'center', gap: '5px',
                border: `1px solid ${t.accent}44`,
              }}>
                <span style={{ fontSize: '15px' }}>🪙</span>
                <span style={{ color: t.accent, fontSize: '16px', fontWeight: '900' }}>{coins}</span>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {renderContent()}
          </div>

          {/* Bottom Navigation */}
          {showNav && (
            <div style={{
              height: '80px', background: t.navBg,
              borderTop: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'flex-start', paddingTop: '10px',
              flexShrink: 0,
              transition: 'background 0.4s ease',
            }}>
              {tabs.map(tab => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '0',
                    }}
                  >
                    <div style={{
                      width: '42px', height: '32px',
                      background: active ? t.primaryGlow : 'transparent',
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px',
                      transform: active ? 'scale(1.12)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                    }}>
                      {tab.emoji}
                    </div>
                    <div style={{
                      color: active ? t.primary : t.textMute,
                      fontSize: '10px', fontWeight: active ? '800' : '500',
                      transition: 'color 0.2s',
                    }}>
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
