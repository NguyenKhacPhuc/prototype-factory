const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#ECFDF5', surface: '#ffffff', surfaceAlt: '#f0fdf4',
    primary: '#059669', secondary: '#10B981', cta: '#0891B2',
    text: '#0f172a', textSec: '#475569', textMute: '#94a3b8',
    border: '#d1fae5', navBg: '#ffffff', progressBg: '#d1fae5',
    gold: '#F59E0B', cardShadow: '0 2px 12px rgba(5,150,105,0.08)',
    inputBg: '#f0fdf4',
  },
  dark: {
    bg: '#071a10', surface: '#0d2619', surfaceAlt: '#102e1d',
    primary: '#10B981', secondary: '#34d399', cta: '#38bdf8',
    text: '#f0fdf4', textSec: '#a7f3d0', textMute: '#4ade80',
    border: '#134726', navBg: '#0a2015', progressBg: '#134726',
    gold: '#FBBF24', cardShadow: '0 2px 12px rgba(0,0,0,0.35)',
    inputBg: '#102e1d',
  },
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [completedQuests, setCompletedQuests] = useState(new Set([0, 2]));
  const [bloomBucks, setBloomBucks] = useState(847);
  const [lotteryEntries, setLotteryEntries] = useState(3);
  const [activeLeaderboard, setActiveLeaderboard] = useState('local');
  const [questFilter, setQuestFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [justCompleted, setJustCompleted] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const existing = document.getElementById('vv-styles');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'vv-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      #vv-scroll::-webkit-scrollbar { display: none; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(28px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.06); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes bloom {
        0% { transform: scale(0.4) rotate(-20deg); opacity: 0; }
        65% { transform: scale(1.08) rotate(3deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      @keyframes ringPulse {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.8); opacity: 0; }
      }
      .vv-screen { animation: fadeIn 0.28s ease-out; }
      .vv-card { transition: transform 0.18s ease, box-shadow 0.18s ease; cursor: pointer; }
      .vv-card:hover { transform: translateY(-2px); }
      .vv-btn { transition: transform 0.14s ease, box-shadow 0.18s ease; cursor: pointer; }
      .vv-btn:hover { transform: translateY(-1px); }
      .vv-btn:active { transform: scale(0.95) !important; }
      .vv-nav { transition: transform 0.13s ease; cursor: pointer; }
      .vv-nav:active { transform: scale(0.85); }
      .vv-float { animation: float 3.2s ease-in-out infinite; }
      .vv-shimmer {
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
        background-size: 200% 100%;
        animation: shimmer 2.2s ease-in-out infinite;
      }
      .vv-bloom { animation: bloom 0.38s cubic-bezier(0.34, 1.56, 0.64, 1); }
      .vv-pulse { animation: pulse 2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => { const el = document.getElementById('vv-styles'); if (el) el.remove(); };
  }, []);

  const completeQuest = (id, bucks) => {
    if (!completedQuests.has(id)) {
      setCompletedQuests(prev => new Set([...prev, id]));
      setBloomBucks(prev => prev + bucks);
      setLotteryEntries(prev => prev + 1);
      setJustCompleted(id);
      setTimeout(() => setJustCompleted(null), 1800);
    }
  };

  const Icon = ({ name, size = 20, color, strokeWidth = 2 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('div', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(LucideIcon, { size, color: color || t.text, strokeWidth });
  };

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  function HomeScreen() {
    const canopyPct = Math.min(100, 67 + (completedQuests.size - 2) * 2);
    return React.createElement('div', { className: 'vv-screen', style: { background: t.bg, minHeight: '100%', paddingBottom: 88 } },
      // Header gradient band
      React.createElement('div', { style: { padding: '22px 20px 0', background: `linear-gradient(160deg, ${t.primary}18 0%, ${t.secondary}0a 100%)` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter', fontWeight: 500, marginBottom: 2 } }, 'Good morning, Alex'),
            React.createElement('h1', { style: { fontSize: 24, fontWeight: 900, color: t.text, fontFamily: 'Inter', lineHeight: 1.15 } }, 'Eco Dashboard')
          ),
          React.createElement('button', { className: 'vv-btn', onClick: () => setIsDark(!isDark),
            style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.cardShadow } },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.primary })
          )
        ),
        // Bloom Bucks hero card
        React.createElement('div', { className: 'vv-float',
          style: { background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, borderRadius: 24, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: `0 6px 28px ${t.primary}45`, marginBottom: 20 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter', fontWeight: 500, marginBottom: 5 } }, 'Your Bloom Bucks'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6 } },
              React.createElement('span', { style: { fontSize: 38, fontWeight: 900, color: '#fff', fontFamily: 'Inter', lineHeight: 1 } }, bloomBucks.toLocaleString()),
              React.createElement('span', { style: { fontSize: 15, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter', fontWeight: 600 } }, 'BB')
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 } },
              React.createElement('div', { style: { background: 'rgba(255,255,255,0.18)', borderRadius: 10, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 } },
                React.createElement(Icon, { name: 'Ticket', size: 13, color: '#fff' }),
                React.createElement('span', { style: { fontSize: 12, color: '#fff', fontFamily: 'Inter', fontWeight: 600 } }, `${lotteryEntries} lottery entries`)
              )
            )
          ),
          React.createElement('div', { style: { width: 64, height: 64, background: 'rgba(255,255,255,0.18)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'Leaf', size: 30, color: '#fff', strokeWidth: 1.5 })
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 20px' } },
        // Community Canopy Fund
        React.createElement('h2', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter', marginBottom: 10, marginTop: 4 } }, 'Community Canopy Fund'),
        React.createElement('div', { style: { background: t.surface, borderRadius: 20, padding: 16, boxShadow: t.cardShadow, border: `1px solid ${t.border}`, marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter' } }, 'Riverside Pollinator Garden'),
              React.createElement('p', { style: { fontSize: 11, color: t.textSec, fontFamily: 'Inter', marginTop: 3 } }, '1,247 contributors this week')
            ),
            React.createElement('div', { style: { background: `${t.primary}18`, borderRadius: 12, padding: '6px 11px' } },
              React.createElement('span', { style: { fontSize: 15, fontWeight: 800, color: t.primary, fontFamily: 'Inter' } }, `${canopyPct}%`)
            )
          ),
          React.createElement('div', { style: { height: 13, background: t.progressBg, borderRadius: 7, overflow: 'hidden', position: 'relative' } },
            React.createElement('div', { style: { height: '100%', width: `${canopyPct}%`, background: `linear-gradient(90deg, ${t.primary} 0%, ${t.secondary} 100%)`, borderRadius: 7, position: 'relative', overflow: 'hidden', transition: 'width 0.8s ease' } },
              React.createElement('div', { className: 'vv-shimmer', style: { position: 'absolute', inset: 0 } })
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 } },
            React.createElement('span', { style: { fontSize: 11, color: t.textMute, fontFamily: 'Inter' } }, `${(canopyPct * 100).toLocaleString()} / 10,000 BB`),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.textSec, fontFamily: 'Inter' } }, `${((1 - canopyPct / 100) * 10000).toFixed(0)} BB to unlock!`)
          )
        ),

        // Today's Quests header
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('h2', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter' } }, "Today's Eco-Quests"),
          React.createElement('button', { className: 'vv-btn', onClick: () => setActiveScreen('quests'),
            style: { fontSize: 12, color: t.cta, fontFamily: 'Inter', fontWeight: 600, background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer' } },
            React.createElement('span', null, 'See all →')
          )
        ),

        // Featured quest
        React.createElement('div', { className: 'vv-card', onClick: () => setActiveScreen('quests'),
          style: { background: `linear-gradient(135deg, ${t.cta}12 0%, ${t.primary}0a 100%)`, borderRadius: 20, padding: 16, border: `1px solid ${t.cta}28`, marginBottom: 10, position: 'relative', overflow: 'hidden' } },
          React.createElement('div', { style: { position: 'absolute', right: -15, top: -15, width: 90, height: 90, background: `${t.cta}0f`, borderRadius: 45 } }),
          React.createElement('div', { style: { display: 'flex', gap: 12 } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 16, background: `${t.cta}1e`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: 'Bus', size: 24, color: t.cta })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 5, background: `${t.cta}1e`, borderRadius: 8, padding: '3px 8px', marginBottom: 6 } },
                React.createElement(Icon, { name: 'Star', size: 11, color: t.cta }),
                React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.cta, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Featured · Transport')
              ),
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter', marginBottom: 4 } }, 'Public Transit Pioneer'),
              React.createElement('p', { style: { fontSize: 12, color: t.textSec, fontFamily: 'Inter', lineHeight: 1.55 } }, 'Take public transport or bike for your commute today'),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Icon, { name: 'Coins', size: 14, color: t.gold }),
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.gold, fontFamily: 'Inter' } }, '+75 BB')
                ),
                React.createElement('span', { style: { fontSize: 11, color: t.textMute, fontFamily: 'Inter' } }, '●●○ Medium')
              )
            )
          )
        ),

        // Mini quests row
        React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 16 } },
          [{ id: 0, icon: 'Coffee', title: 'Zero-Waste Brew', bucks: 35, color: '#92400E' },
           { id: 2, icon: 'ShoppingBag', title: 'Package-Free', bucks: 50, color: t.primary }
          ].map(q => {
            const done = completedQuests.has(q.id);
            const popped = justCompleted === q.id;
            return React.createElement('div', { key: q.id, className: `vv-card${popped ? ' vv-bloom' : ''}`, onClick: () => !done && completeQuest(q.id, q.bucks),
              style: { flex: 1, background: done ? `${t.primary}12` : t.surface, borderRadius: 18, padding: '14px 12px', border: `1px solid ${done ? t.primary + '40' : t.border}`, boxShadow: done ? 'none' : t.cardShadow } },
              React.createElement('div', { style: { width: 38, height: 38, borderRadius: 13, background: done ? `${t.primary}1e` : `${q.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 } },
                React.createElement(Icon, { name: done ? 'CheckCircle' : q.icon, size: 20, color: done ? t.primary : q.color })
              ),
              React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: done ? t.textMute : t.text, fontFamily: 'Inter', marginBottom: 3 } }, q.title),
              React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: done ? t.textMute : t.gold, fontFamily: 'Inter' } }, done ? '✓ Completed' : `+${q.bucks} BB`)
            );
          })
        ),

        // Bloom Box Lottery card
        React.createElement('div', { style: { background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 55%, #0891B2 100%)', borderRadius: 22, padding: '16px 18px', boxShadow: '0 6px 24px rgba(99,102,241,0.38)', display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 46, height: 46, borderRadius: 15, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Gift', size: 24, color: '#fff' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Inter' } }, 'Bloom Box Lottery'),
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.78)', fontFamily: 'Inter', marginTop: 3 } }, `${lotteryEntries} entries · Draw in 2d 14h`)
          ),
          React.createElement('div', { className: 'vv-pulse', style: { background: 'rgba(255,255,255,0.22)', borderRadius: 14, padding: '8px 14px' } },
            React.createElement('span', { style: { fontSize: 16, fontWeight: 900, color: '#fff', fontFamily: 'Inter' } }, `${lotteryEntries}×`)
          )
        )
      )
    );
  }

  // ─── QUESTS SCREEN ─────────────────────────────────────────────────────────
  function QuestsScreen() {
    const quests = [
      { id: 0, cat: 'Food', icon: 'Coffee', title: 'Zero-Waste Coffee Run', desc: 'Bring your reusable cup to a café', bucks: 35, diff: 1, color: '#92400E', tag: 'Daily' },
      { id: 1, cat: 'Transport', icon: 'Bike', title: 'Cycle to Work', desc: 'Bike or e-scooter your commute today', bucks: 80, diff: 2, color: '#059669', tag: 'Daily' },
      { id: 2, cat: 'Shopping', icon: 'ShoppingBag', title: 'Package-Free Shopping', desc: 'Buy 3+ items without plastic packaging', bucks: 50, diff: 2, color: '#0891B2', tag: 'Daily' },
      { id: 3, cat: 'Food', icon: 'UtensilsCrossed', title: 'Meatless Monday Meal', desc: 'Cook a plant-based dinner from scratch', bucks: 45, diff: 1, color: '#10B981', tag: 'Weekly' },
      { id: 4, cat: 'Home', icon: 'Recycle', title: 'Upcycle an Old Item', desc: "Transform something you'd normally bin", bucks: 90, diff: 3, color: '#6366F1', tag: 'Weekly' },
      { id: 5, cat: 'Community', icon: 'Users', title: 'Neighborhood Clean-Up', desc: '30 mins picking litter in your local area', bucks: 120, diff: 2, color: '#F59E0B', tag: 'Weekly' },
      { id: 6, cat: 'Home', icon: 'Zap', title: 'Energy Audit Hour', desc: 'Identify and fix 3 energy drains at home', bucks: 60, diff: 2, color: '#8B5CF6', tag: 'Daily' },
      { id: 7, cat: 'Shopping', icon: 'Store', title: "Farmers' Market Visit", desc: 'Buy seasonal produce direct from growers', bucks: 55, diff: 1, color: '#EA580C', tag: 'Weekly' },
    ];
    const cats = ['All', 'Food', 'Transport', 'Shopping', 'Home', 'Community'];
    const filtered = questFilter === 'All' ? quests : quests.filter(q => q.cat === questFilter);
    const doneCount = quests.filter(q => completedQuests.has(q.id)).length;

    return React.createElement('div', { className: 'vv-screen', style: { background: t.bg, minHeight: '100%', paddingBottom: 88 } },
      React.createElement('div', { style: { padding: '22px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 900, color: t.text, fontFamily: 'Inter', marginBottom: 4 } }, 'Eco-Quests'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
          React.createElement('div', { style: { background: `${t.primary}18`, borderRadius: 10, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(Icon, { name: 'CheckCircle', size: 13, color: t.primary }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary, fontFamily: 'Inter' } }, `${doneCount} / ${quests.length} done`)
          ),
          React.createElement('span', { style: { fontSize: 12, color: t.textMute, fontFamily: 'Inter' } }, `+${quests.filter(q=>completedQuests.has(q.id)).reduce((s,q)=>s+q.bucks,0)} BB earned`)
        )
      ),
      // Category filter scroll
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto', scrollbarWidth: 'none' } },
        cats.map(c => React.createElement('button', { key: c, className: 'vv-btn', onClick: () => setQuestFilter(c),
          style: { flexShrink: 0, padding: '8px 16px', borderRadius: 22, background: questFilter === c ? t.primary : t.surface, color: questFilter === c ? '#fff' : t.textSec, border: `1.5px solid ${questFilter === c ? t.primary : t.border}`, fontSize: 13, fontFamily: 'Inter', fontWeight: 600, cursor: 'pointer' } },
          React.createElement('span', null, c)
        ))
      ),
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 11 } },
        filtered.map(q => {
          const done = completedQuests.has(q.id);
          const popped = justCompleted === q.id;
          return React.createElement('div', { key: q.id, className: `vv-card${popped ? ' vv-bloom' : ''}`,
            style: { background: done ? `${t.primary}0a` : t.surface, borderRadius: 20, padding: 16, border: `1px solid ${done ? t.primary + '30' : t.border}`, boxShadow: done ? 'none' : t.cardShadow, display: 'flex', gap: 13, opacity: done ? 0.72 : 1 } },
            React.createElement('div', { style: { width: 50, height: 50, borderRadius: 17, background: done ? `${t.primary}18` : `${q.color}16`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: done ? 'CheckCircle' : q.icon, size: 25, color: done ? t.primary : q.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 3 } },
                React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: q.color, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px' } }, `${q.tag} · ${q.cat}`),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: done ? t.textMute : t.gold, fontFamily: 'Inter' } }, done ? '✓ Done' : `+${q.bucks} BB`)
              ),
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: done ? t.textSec : t.text, fontFamily: 'Inter', marginBottom: 4 } }, q.title),
              React.createElement('p', { style: { fontSize: 12, color: t.textSec, fontFamily: 'Inter', lineHeight: 1.55, marginBottom: 10 } }, q.desc),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement('div', { style: { display: 'flex', gap: 3 } },
                    [1,2,3].map(d => React.createElement('div', { key: d, style: { width: 7, height: 7, borderRadius: 4, background: d <= q.diff ? q.color : t.progressBg } }))
                  ),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMute, fontFamily: 'Inter' } }, ['Easy','Medium','Hard'][q.diff - 1])
                ),
                !done && React.createElement('button', { className: 'vv-btn', onClick: () => completeQuest(q.id, q.bucks),
                  style: { background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, color: '#fff', border: 'none', borderRadius: 12, padding: '8px 16px', fontSize: 12, fontWeight: 700, fontFamily: 'Inter', cursor: 'pointer', boxShadow: `0 3px 10px ${t.primary}40` } },
                  'Complete ✓'
                )
              )
            )
          );
        })
      )
    );
  }

  // ─── COMMUNITY SCREEN ──────────────────────────────────────────────────────
  function CommunityScreen() {
    const squads = [
      { name: 'Green Riders', members: 8, bucks: 2840, rank: 1, color: '#059669' },
      { name: 'Eco Warriors', members: 12, bucks: 2310, rank: 2, color: '#0891B2' },
      { name: 'Bloom Collective', members: 6, bucks: 1950, rank: 3, color: '#6366F1' },
      { name: 'Solar Squad', members: 5, bucks: 1210, rank: 4, color: '#F59E0B' },
    ];
    const localBoard = [
      { name: 'Sarah K.', bucks: 1240, quests: 18 },
      { name: 'You (Alex)', bucks: bloomBucks, quests: completedQuests.size, you: true },
      { name: 'Marcus T.', bucks: 780, quests: 10 },
      { name: 'Priya M.', bucks: 650, quests: 9 },
      { name: 'James O.', bucks: 520, quests: 7 },
    ].sort((a, b) => b.bucks - a.bucks);
    const globalBoard = [
      { name: 'Emma W.', bucks: 5420, quests: 78 },
      { name: 'Kenji S.', bucks: 4890, quests: 71 },
      { name: 'Amara B.', bucks: 4230, quests: 63 },
      { name: 'You (Alex)', bucks: bloomBucks, quests: completedQuests.size, you: true },
      { name: 'Diego V.', bucks: 720, quests: 11 },
    ].sort((a, b) => b.bucks - a.bucks);
    const board = activeLeaderboard === 'local' ? localBoard : globalBoard;

    return React.createElement('div', { className: 'vv-screen', style: { background: t.bg, minHeight: '100%', paddingBottom: 88 } },
      React.createElement('div', { style: { padding: '22px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 900, color: t.text, fontFamily: 'Inter', marginBottom: 4 } }, 'Community'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter', marginBottom: 16 } }, 'Grow together, impact together')
      ),

      // Bloom Box Lottery
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #0891B2 100%)', borderRadius: 24, padding: 20, boxShadow: '0 6px 28px rgba(99,102,241,0.42)', position: 'relative', overflow: 'hidden' } },
          React.createElement('div', { style: { position: 'absolute', right: -25, top: -25, width: 130, height: 130, background: 'rgba(255,255,255,0.07)', borderRadius: 65 } }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 13, marginBottom: 16 } },
            React.createElement('div', { style: { width: 50, height: 50, borderRadius: 17, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: 'Gift', size: 26, color: '#fff' })
            ),
            React.createElement('div', null,
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: 'Inter' } }, 'Bloom Box Lottery'),
              React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter', marginTop: 2 } }, 'Community goal 67% funded')
            )
          ),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 } },
            [{ label: 'Your Entries', value: `${lotteryEntries}×`, icon: 'Ticket' }, { label: 'Prize Pool', value: '12 items', icon: 'Package' }, { label: 'Draw In', value: '2d 14h', icon: 'Clock' }]
              .map(s => React.createElement('div', { key: s.label, style: { background: 'rgba(255,255,255,0.14)', borderRadius: 14, padding: '11px 10px' } },
                React.createElement(Icon, { name: s.icon, size: 15, color: 'rgba(255,255,255,0.85)' }),
                React.createElement('p', { style: { fontSize: 17, fontWeight: 900, color: '#fff', fontFamily: 'Inter', marginTop: 4 } }, s.value),
                React.createElement('p', { style: { fontSize: 10, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter' } }, s.label)
              ))
          ),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px 14px' } },
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontFamily: 'Inter', lineHeight: 1.5 } }, 'Top prize: Weekend at Eco Lodge + £100 local eco-store voucher')
          )
        )
      ),

      // Eco-Squads
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 } },
          React.createElement('h2', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter' } }, 'Eco-Squads'),
          React.createElement('button', { className: 'vv-btn', style: { fontSize: 12, color: t.cta, fontFamily: 'Inter', fontWeight: 700, background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer' } },
            '+ Create squad'
          )
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 9 } },
          squads.map((s, i) => React.createElement('div', { key: s.name, className: 'vv-card',
            style: { background: t.surface, borderRadius: 16, padding: '13px 15px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow, display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 13, background: `${s.color}1e`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: 'Users', size: 19, color: s.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter' } }, s.name),
              React.createElement('p', { style: { fontSize: 11, color: t.textSec, fontFamily: 'Inter', marginTop: 2 } }, `${s.members} members · ${s.bucks.toLocaleString()} BB`)
            ),
            React.createElement('div', { style: { background: i === 0 ? '#F59E0B20' : t.progressBg, borderRadius: 10, padding: '4px 10px' } },
              React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: i === 0 ? '#F59E0B' : t.textSec, fontFamily: 'Inter' } }, `#${s.rank}`)
            )
          ))
        )
      ),

      // Leaderboard
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter', marginBottom: 11 } }, 'Leaderboard'),
        React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 12, background: t.progressBg, borderRadius: 14, padding: 4 } },
          ['local', 'global'].map(tab => React.createElement('button', { key: tab, className: 'vv-btn', onClick: () => setActiveLeaderboard(tab),
            style: { flex: 1, padding: '8px', background: activeLeaderboard === tab ? t.primary : 'transparent', color: activeLeaderboard === tab ? '#fff' : t.textSec, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: 'Inter', cursor: 'pointer', transition: 'all 0.2s' } },
            React.createElement('span', null, tab === 'local' ? 'Local' : 'Global')
          ))
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          board.map((p, i) => React.createElement('div', { key: p.name,
            style: { background: p.you ? `${t.primary}14` : t.surface, borderRadius: 15, padding: '12px 14px', border: `1px solid ${p.you ? t.primary + '38' : t.border}`, display: 'flex', alignItems: 'center', gap: 11 } },
            React.createElement('div', { style: { width: 30, height: 30, borderRadius: 9, background: i < 3 ? ['#F59E0B1e','#94A3B81e','#CD7F321e'][i] : t.progressBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement('span', { style: { fontSize: 12, fontWeight: 900, color: i < 3 ? ['#F59E0B','#64748B','#CD7F32'][i] : t.textMute, fontFamily: 'Inter' } }, `#${i+1}`)
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 13, fontWeight: p.you ? 800 : 600, color: p.you ? t.primary : t.text, fontFamily: 'Inter' } }, p.name),
              React.createElement('p', { style: { fontSize: 11, color: t.textMute, fontFamily: 'Inter', marginTop: 1 } }, `${p.quests} quests`)
            ),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: p.you ? t.primary : t.textSec, fontFamily: 'Inter' } }, `${p.bucks.toLocaleString()} BB`)
          ))
        )
      )
    );
  }

  // ─── MAP SCREEN ────────────────────────────────────────────────────────────
  function MapScreen() {
    const projects = [
      { id: 1, name: 'Riverside Pollinator Garden', type: 'Garden', status: 'active', bucks: 6700, target: 10000, x: 118, y: 82 },
      { id: 2, name: 'Oak Street Tree Planting', type: 'Trees', status: 'completed', bucks: 5000, target: 5000, x: 218, y: 142 },
      { id: 3, name: 'Community Composting Hub', type: 'Waste', status: 'completed', bucks: 3500, target: 3500, x: 78, y: 178 },
      { id: 4, name: 'Solar Bench Installation', type: 'Energy', status: 'upcoming', bucks: 0, target: 8000, x: 248, y: 62 },
      { id: 5, name: 'Wild Meadow Creation', type: 'Biodiversity', status: 'upcoming', bucks: 0, target: 6000, x: 58, y: 108 },
    ];
    const statusColor = { active: t.cta, completed: t.primary, upcoming: '#94A3B8' };
    const statusLabel = { active: 'Active', completed: 'Completed', upcoming: 'Upcoming' };

    return React.createElement('div', { className: 'vv-screen', style: { background: t.bg, minHeight: '100%', paddingBottom: 88 } },
      React.createElement('div', { style: { padding: '22px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 900, color: t.text, fontFamily: 'Inter', marginBottom: 4 } }, 'Impact Explorer'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter', marginBottom: 16 } }, 'Real projects powered by your Bloom Bucks'),

        // Map container
        React.createElement('div', { style: { background: isDark ? '#0a2518' : '#d1fae5', borderRadius: 24, overflow: 'hidden', border: `1.5px solid ${t.border}`, position: 'relative', height: 238, marginBottom: 16 } },
          React.createElement('svg', { width: '100%', height: '100%', viewBox: '0 0 335 238', style: { position: 'absolute', inset: 0 } },
            React.createElement('defs', null,
              React.createElement('pattern', { id: 'mapgrid', width: 22, height: 22, patternUnits: 'userSpaceOnUse' },
                React.createElement('path', { d: 'M 22 0 L 0 0 0 22', fill: 'none', stroke: isDark ? 'rgba(16,185,129,0.09)' : 'rgba(5,150,105,0.09)', strokeWidth: '0.7' })
              )
            ),
            React.createElement('rect', { width: '100%', height: '100%', fill: 'url(#mapgrid)' }),
            // Roads
            React.createElement('path', { d: 'M 0 118 Q 90 108 168 118 Q 248 128 335 112', stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', strokeWidth: 9, fill: 'none', strokeLinecap: 'round' }),
            React.createElement('path', { d: 'M 148 0 Q 158 78 168 118 Q 173 160 156 238', stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', strokeWidth: 9, fill: 'none', strokeLinecap: 'round' }),
            React.createElement('path', { d: 'M 0 198 Q 118 188 198 198 Q 268 206 335 193', stroke: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)', strokeWidth: 6, fill: 'none', strokeLinecap: 'round' }),
            // Green areas
            React.createElement('ellipse', { cx: 88, cy: 148, rx: 36, ry: 26, fill: isDark ? 'rgba(16,185,129,0.14)' : 'rgba(5,150,105,0.12)', stroke: isDark ? 'rgba(16,185,129,0.22)' : 'rgba(5,150,105,0.2)', strokeWidth: 1 }),
            React.createElement('ellipse', { cx: 264, cy: 98, rx: 28, ry: 20, fill: isDark ? 'rgba(16,185,129,0.1)' : 'rgba(5,150,105,0.08)', stroke: isDark ? 'rgba(16,185,129,0.15)' : 'rgba(5,150,105,0.14)', strokeWidth: 1 }),
            // Project markers
            ...projects.map(p => React.createElement('g', { key: p.id, onClick: () => setSelectedProject(selectedProject?.id === p.id ? null : p), style: { cursor: 'pointer' } },
              p.status === 'active' && React.createElement('circle', { cx: p.x, cy: p.y, r: 17, fill: `${statusColor[p.status]}20`, stroke: statusColor[p.status], strokeWidth: 1.5, strokeDasharray: '4 2' }),
              React.createElement('circle', { cx: p.x, cy: p.y, r: 11, fill: statusColor[p.status], stroke: isDark ? '#0a2015' : '#fff', strokeWidth: 2.5, opacity: p.status === 'upcoming' ? 0.65 : 1 }),
              React.createElement('text', { x: p.x, y: p.y + 26, textAnchor: 'middle', fontSize: 9, fontWeight: '700', fill: isDark ? 'rgba(240,253,244,0.75)' : 'rgba(15,23,42,0.65)', fontFamily: 'Inter' }, p.type)
            ))
          ),
          // Legend
          React.createElement('div', { style: { position: 'absolute', bottom: 10, right: 10, background: isDark ? 'rgba(10,32,21,0.92)' : 'rgba(255,255,255,0.92)', borderRadius: 12, padding: '9px 11px', backdropFilter: 'blur(8px)', border: `1px solid ${t.border}` } },
            ['active','completed','upcoming'].map(s => React.createElement('div', { key: s, style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: s === 'upcoming' ? 0 : 4 } },
              React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: statusColor[s] } }),
              React.createElement('span', { style: { fontSize: 10, color: t.textSec, fontFamily: 'Inter', fontWeight: 500 } }, statusLabel[s])
            ))
          )
        ),

        // Selected project detail
        selectedProject && React.createElement('div', { className: 'vv-bloom',
          style: { background: t.surface, borderRadius: 20, padding: 16, border: `2px solid ${statusColor[selectedProject.status]}3a`, boxShadow: `0 4px 20px ${statusColor[selectedProject.status]}22`, marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: statusColor[selectedProject.status], fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px' } }, `${statusLabel[selectedProject.status]} · ${selectedProject.type}`),
              React.createElement('h3', { style: { fontSize: 15, fontWeight: 800, color: t.text, fontFamily: 'Inter', marginTop: 4 } }, selectedProject.name)
            ),
            React.createElement('button', { onClick: () => setSelectedProject(null), style: { background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 8 } },
              React.createElement(Icon, { name: 'X', size: 18, color: t.textMute })
            )
          ),
          selectedProject.status !== 'upcoming' && React.createElement('div', null,
            React.createElement('div', { style: { height: 9, background: t.progressBg, borderRadius: 5, overflow: 'hidden', marginBottom: 7 } },
              React.createElement('div', { style: { height: '100%', width: `${Math.min(100,(selectedProject.bucks/selectedProject.target)*100)}%`, background: `linear-gradient(90deg, ${statusColor[selectedProject.status]}, ${t.secondary})`, borderRadius: 5 } })
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
              React.createElement('span', { style: { fontSize: 11, color: t.textSec, fontFamily: 'Inter' } }, `${selectedProject.bucks.toLocaleString()} / ${selectedProject.target.toLocaleString()} BB`),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: statusColor[selectedProject.status], fontFamily: 'Inter' } }, selectedProject.status === 'completed' ? '100% Complete!' : `${Math.round((selectedProject.bucks/selectedProject.target)*100)}%`)
            )
          )
        ),

        // Projects list
        React.createElement('h2', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter', marginBottom: 11 } }, 'All Local Projects'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 9 } },
          projects.map(p => React.createElement('div', { key: p.id, className: 'vv-card', onClick: () => setSelectedProject(selectedProject?.id === p.id ? null : p),
            style: { background: selectedProject?.id === p.id ? `${statusColor[p.status]}10` : t.surface, borderRadius: 16, padding: '13px 15px', border: `1px solid ${selectedProject?.id === p.id ? statusColor[p.status]+'38' : t.border}`, boxShadow: t.cardShadow, display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 11, height: 11, borderRadius: 6, background: statusColor[p.status], flexShrink: 0 } }),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter' } }, p.name),
              React.createElement('p', { style: { fontSize: 11, color: t.textSec, fontFamily: 'Inter', marginTop: 2 } }, `${p.type} · ${statusLabel[p.status]}`)
            ),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: statusColor[p.status], fontFamily: 'Inter' } }, p.status === 'upcoming' ? 'Coming soon' : p.status === 'completed' ? '✓ Done' : `${Math.round((p.bucks/p.target)*100)}%`)
          ))
        )
      )
    );
  }

  // ─── PROFILE SCREEN ────────────────────────────────────────────────────────
  function ProfileScreen() {
    const totalDone = completedQuests.size;
    const achievements = [
      { id: 1, name: 'First Steps', icon: 'MapPin', desc: 'Complete first quest', unlocked: totalDone >= 1, color: '#10B981' },
      { id: 2, name: 'Green Rider', icon: 'Bike', desc: 'Transport quests ×5', unlocked: true, color: '#0891B2' },
      { id: 3, name: 'Bloom Buddy', icon: 'Leaf', desc: 'Earn 500 Bloom Bucks', unlocked: bloomBucks >= 500, color: '#059669' },
      { id: 4, name: 'Squad Leader', icon: 'Crown', desc: 'Lead a top-3 squad', unlocked: false, color: '#F59E0B' },
      { id: 5, name: 'Nature Ninja', icon: 'Shield', desc: 'Complete 20 quests', unlocked: totalDone >= 20, color: '#6366F1' },
      { id: 6, name: 'Canopy Champ', icon: 'TreePine', desc: 'Fund 3 projects', unlocked: false, color: '#8B5CF6' },
    ];
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return React.createElement('div', { className: 'vv-screen', style: { background: t.bg, minHeight: '100%', paddingBottom: 88 } },
      // Profile header
      React.createElement('div', { style: { padding: '24px 20px 20px', background: `linear-gradient(160deg, ${t.primary}1c 0%, ${t.secondary}0e 50%, ${t.bg} 100%)` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20 } },
          React.createElement('div', { style: { position: 'relative' } },
            React.createElement('div', { style: { width: 74, height: 74, borderRadius: 24, background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 5px 22px ${t.primary}42` } },
              React.createElement(Icon, { name: 'User', size: 32, color: '#fff', strokeWidth: 1.5 })
            ),
            React.createElement('div', { style: { position: 'absolute', bottom: -4, right: -4, background: '#F59E0B', borderRadius: 9, padding: '2px 7px', border: `2.5px solid ${t.bg}` } },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 900, color: '#fff', fontFamily: 'Inter' } }, 'LV7')
            )
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h2', { style: { fontSize: 21, fontWeight: 900, color: t.text, fontFamily: 'Inter' } }, 'Alex Chen'),
            React.createElement('p', { style: { fontSize: 12, color: t.textSec, fontFamily: 'Inter', marginTop: 3 } }, 'Eco Explorer · Joined Jan 2026'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 8, background: `${t.primary}18`, borderRadius: 9, padding: '4px 9px', alignSelf: 'flex-start', width: 'fit-content' } },
              React.createElement(Icon, { name: 'MapPin', size: 12, color: t.primary }),
              React.createElement('span', { style: { fontSize: 11, color: t.primary, fontFamily: 'Inter', fontWeight: 700 } }, 'London, UK')
            )
          ),
          React.createElement('button', { className: 'vv-btn', onClick: () => setIsDark(!isDark),
            style: { width: 44, height: 44, borderRadius: 14, background: t.surface, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.primary })
          )
        ),
        // Stats grid
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 9 } },
          [{ label: 'Bloom Bucks', value: bloomBucks >= 1000 ? `${(bloomBucks/1000).toFixed(1)}k` : bloomBucks, icon: 'Leaf', color: t.primary },
           { label: 'Quests', value: totalDone, icon: 'CheckCircle', color: '#10B981' },
           { label: 'Streak', value: '12d', icon: 'Flame', color: '#EF4444' },
           { label: 'Local Rank', value: '#2', icon: 'Trophy', color: '#F59E0B' }
          ].map(s => React.createElement('div', { key: s.label, style: { background: t.surface, borderRadius: 16, padding: '12px 8px', boxShadow: t.cardShadow, border: `1px solid ${t.border}`, textAlign: 'center' } },
            React.createElement(Icon, { name: s.icon, size: 18, color: s.color }),
            React.createElement('p', { style: { fontSize: 16, fontWeight: 900, color: t.text, fontFamily: 'Inter', marginTop: 5 } }, s.value),
            React.createElement('p', { style: { fontSize: 10, color: t.textMute, fontFamily: 'Inter', marginTop: 2 } }, s.label)
          ))
        )
      ),

      React.createElement('div', { style: { padding: '0 20px' } },
        // Level progress
        React.createElement('div', { style: { background: t.surface, borderRadius: 20, padding: 16, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter' } }, 'Level 7 → Level 8'),
              React.createElement('p', { style: { fontSize: 11, color: t.textSec, fontFamily: 'Inter', marginTop: 2 } }, '153 BB to next · Eco Guide')
            ),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: t.primary, fontFamily: 'Inter' } }, '85%')
          ),
          React.createElement('div', { style: { height: 9, background: t.progressBg, borderRadius: 5, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: '85%', background: `linear-gradient(90deg, ${t.primary} 0%, ${t.secondary} 100%)`, borderRadius: 5, position: 'relative', overflow: 'hidden' } },
              React.createElement('div', { className: 'vv-shimmer', style: { position: 'absolute', inset: 0 } })
            )
          )
        ),

        // Achievements
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 } },
          React.createElement('h2', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter' } }, 'Achievements'),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary, fontFamily: 'Inter' } }, `${unlockedCount}/${achievements.length}`)
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          achievements.map(a => React.createElement('div', { key: a.id,
            style: { background: a.unlocked ? `${a.color}10` : t.surface, borderRadius: 18, padding: '15px 10px', border: `1px solid ${a.unlocked ? a.color+'28' : t.border}`, textAlign: 'center', opacity: a.unlocked ? 1 : 0.5, boxShadow: a.unlocked ? `0 2px 14px ${a.color}1e` : 'none' } },
            React.createElement('div', { style: { width: 42, height: 42, borderRadius: 14, background: a.unlocked ? `${a.color}22` : t.progressBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 9px' } },
              React.createElement(Icon, { name: a.unlocked ? a.icon : 'Lock', size: 20, color: a.unlocked ? a.color : t.textMute })
            ),
            React.createElement('p', { style: { fontSize: 11, fontWeight: 800, color: a.unlocked ? t.text : t.textMute, fontFamily: 'Inter', lineHeight: 1.3, marginBottom: 3 } }, a.name),
            React.createElement('p', { style: { fontSize: 9, color: t.textMute, fontFamily: 'Inter', lineHeight: 1.4 } }, a.desc)
          ))
        )
      )
    );
  }

  // ─── NAVIGATION & SHELL ────────────────────────────────────────────────────
  const screens = { home: HomeScreen, quests: QuestsScreen, community: CommunityScreen, map: MapScreen, profile: ProfileScreen };
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'quests', label: 'Quests', icon: 'CheckSquare' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '20px 0' }
  },
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 42, overflow: 'hidden', boxShadow: '0 24px 72px rgba(0,0,0,0.28), 0 6px 22px rgba(0,0,0,0.18)', position: 'relative', display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.1)' }
    },
      // Screen area
      React.createElement('div', { id: 'vv-scroll', style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' } },
        React.createElement(screens[activeScreen])
      ),
      // Bottom Navigation
      React.createElement('div', {
        style: { height: 80, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', padding: '0 6px', boxShadow: `0 -4px 20px ${isDark ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.05)'}`, flexShrink: 0 }
      },
        navItems.map(item => React.createElement('button', { key: item.id, className: 'vv-nav', onClick: () => setActiveScreen(item.id),
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 4px 4px', background: 'none', border: 'none', cursor: 'pointer', minHeight: 44, position: 'relative' } },
          activeScreen === item.id && React.createElement('div', { style: { position: 'absolute', top: 0, width: 24, height: 3, background: t.primary, borderRadius: 2 } }),
          React.createElement(Icon, { name: item.icon, size: 22, color: activeScreen === item.id ? t.primary : t.textMute, strokeWidth: activeScreen === item.id ? 2.5 : 1.8 }),
          React.createElement('span', { style: { fontSize: 10, fontFamily: 'Inter', fontWeight: activeScreen === item.id ? 700 : 500, color: activeScreen === item.id ? t.primary : t.textMute } }, item.label)
        ))
      )
    )
  );
}
