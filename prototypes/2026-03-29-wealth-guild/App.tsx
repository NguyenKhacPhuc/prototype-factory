const { useState, useEffect, useRef } = React;

const THEMES = {
  dark: {
    bg: '#1A1208',
    surface: '#241A0E',
    surfaceAlt: '#2E2214',
    card: '#281E10',
    primary: '#E8634A',
    primarySoft: 'rgba(232,99,74,0.14)',
    primaryBorder: 'rgba(232,99,74,0.30)',
    accent: '#C49A5A',
    accentSoft: 'rgba(196,154,90,0.14)',
    green: '#4CAF82',
    greenSoft: 'rgba(76,175,130,0.14)',
    blue: '#5A8EE8',
    blueSoft: 'rgba(90,142,232,0.14)',
    text: '#F8F0E6',
    textSub: '#B09070',
    textMuted: '#7A6050',
    textFaint: '#4A3828',
    border: '#382A18',
    navBg: '#1A1208',
    shadow: '0 8px 32px rgba(0,0,0,0.60)',
    cardShadow: '0 4px 20px rgba(0,0,0,0.50)',
  },
  light: {
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F5EDE2',
    card: '#FFFFFF',
    primary: '#E8634A',
    primarySoft: 'rgba(232,99,74,0.09)',
    primaryBorder: 'rgba(232,99,74,0.25)',
    accent: '#8B6238',
    accentSoft: 'rgba(139,98,56,0.09)',
    green: '#2E8B57',
    greenSoft: 'rgba(46,139,87,0.09)',
    blue: '#3A6BC8',
    blueSoft: 'rgba(58,107,200,0.09)',
    text: '#1A1208',
    textSub: '#5A4030',
    textMuted: '#9A7860',
    textFaint: '#C0A888',
    border: '#EAE0D0',
    navBg: '#FFFFFF',
    shadow: '0 8px 32px rgba(0,0,0,0.08)',
    cardShadow: '0 4px 20px rgba(0,0,0,0.07)',
  },
};

const feedData = [
  {
    id: 1,
    user: 'Amara K.',
    avatar: '🌟',
    challenge: '30-Day Side Hustle Sprint',
    day: 18,
    update: 'Just landed my third freelance client this week. The momentum is absolutely real. Started at $0 on day 1—now sitting at $840 this month.',
    amount: '+$840',
    amountLabel: 'earned this month',
    likes: 42,
    comments: 8,
    time: '2h ago',
    tag: 'Hustle',
    tagColor: '#E8634A',
    rotate: -1.8,
  },
  {
    id: 2,
    user: 'Marcus T.',
    avatar: '💪',
    challenge: 'Debt Paydown Relay',
    day: 22,
    update: 'Knocked out $1,200 from my credit card this month. The relay format keeps me accountable—can\'t let the team down!',
    amount: '$1,200',
    amountLabel: 'debt cleared',
    likes: 67,
    comments: 14,
    time: '5h ago',
    tag: 'Debt Free',
    tagColor: '#4CAF82',
    rotate: 1.2,
  },
  {
    id: 3,
    user: 'Zoe L.',
    avatar: '✨',
    challenge: 'Emergency Fund Quest',
    day: 45,
    update: 'Hit 3 months of expenses saved! The guild milestones really pushed me. Already planning for 6 months. Thank you all.',
    amount: '$4,500',
    amountLabel: 'fully saved',
    likes: 89,
    comments: 21,
    time: '1d ago',
    tag: 'Savings',
    tagColor: '#5A8EE8',
    rotate: -0.7,
  },
];

const challengeData = [
  { id: 1, title: '30-Day Side Hustle Sprint', members: 48, votes: 234, category: 'Income', description: 'Launch or grow a side income in 30 days. Daily story check-ins required.', difficulty: 'Medium', creator: 'Amara K.', active: true, progress: 60 },
  { id: 2, title: 'Debt Paydown Relay', members: 32, votes: 187, category: 'Debt', description: 'Team relay where each member targets their highest-interest debt first.', difficulty: 'Hard', creator: 'David R.', active: true, progress: 73 },
  { id: 3, title: 'No-Spend November', members: 61, votes: 312, category: 'Savings', description: 'Zero discretionary spending for 30 days. Document every temptation you resisted.', difficulty: 'Hard', creator: 'Maya S.', active: false, progress: 100 },
  { id: 4, title: 'Investment Initiation', members: 27, votes: 145, category: 'Invest', description: 'Open and fund your first brokerage account. Document your research journey.', difficulty: 'Easy', creator: 'Chris P.', active: false, progress: 100 },
  { id: 5, title: 'Grocery Game $50 Week', members: 38, votes: 198, category: 'Budget', description: 'Feed yourself on $50/week. Share recipes, hacks, and meal prep wins.', difficulty: 'Medium', creator: 'Zoe L.', active: false, progress: 0 },
  { id: 6, title: '10% Savings Pact', members: 55, votes: 221, category: 'Savings', description: 'Auto-save 10% of every paycheck, no exceptions. Track the compounding.', difficulty: 'Easy', creator: 'Marcus T.', active: false, progress: 0 },
];

const milestonesData = [
  { level: 1, label: 'Founding', xp: 0, feature: 'Basic Journal Posts', unlocked: true },
  { level: 2, label: 'Rising', xp: 500, feature: 'Photo & Media Posts', unlocked: true },
  { level: 3, label: 'Climbing', xp: 1200, feature: 'Challenge Voting', unlocked: true },
  { level: 4, label: 'Thriving', xp: 2000, feature: 'Relay Challenges', unlocked: true },
  { level: 5, label: 'Legendary', xp: 3000, feature: 'Guild Treasury', unlocked: false },
  { level: 6, label: 'Elite', xp: 5000, feature: 'Expert Mentors', unlocked: false },
];

const membersData = [
  { name: 'Zoe L.', avatar: '✨', streak: 31, role: 'Co-Leader', saved: '$4.5K' },
  { name: 'Amara K.', avatar: '🌟', streak: 23, role: 'Guild Leader', saved: '$3.2K' },
  { name: 'Marcus T.', avatar: '💪', streak: 18, role: 'Member', saved: '$2.8K' },
  { name: 'Chris P.', avatar: '📈', streak: 15, role: 'Member', saved: '$1.9K' },
  { name: 'David R.', avatar: '🎯', streak: 12, role: 'Member', saved: '$1.4K' },
  { name: 'Maya S.', avatar: '🔥', streak: 8, role: 'Member', saved: '$0.9K' },
];

const badgeData = [
  { id: 1, name: 'First Quest', emoji: '⚔️', earned: true, desc: 'Completed first challenge' },
  { id: 2, name: 'Storyteller', emoji: '📖', earned: true, desc: '10 journal updates posted' },
  { id: 3, name: 'Vote Influencer', emoji: '🗳️', earned: true, desc: 'Challenge hit top 3' },
  { id: 4, name: 'Relay Runner', emoji: '🏃', earned: true, desc: 'Completed relay challenge' },
  { id: 5, name: 'Milestone Maker', emoji: '🏆', earned: false, desc: 'Help guild reach Level 5' },
  { id: 6, name: 'Guild Founder', emoji: '🌟', earned: false, desc: 'Create a top-voted challenge' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const t = isDark ? THEMES.dark : THEMES.light;
  const pf = { fontFamily: "'Playfair Display', Georgia, serif" };
  const ff = { fontFamily: "'Inter', system-ui, sans-serif" };

  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px 4px', ...ff }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Signal, { size: 14, color: t.text })}
        {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
      </div>
    </div>
  );

  const HomeScreen = () => {
    const [liked, setLiked] = useState({});
    const [pressed, setPressed] = useState(null);

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        {/* Header */}
        <div style={{ padding: '16px 22px 14px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ ...pf, fontSize: 30, fontWeight: 800, color: t.text, letterSpacing: '-0.5px', lineHeight: 1.05 }}>
                Wealth<br /><span style={{ color: t.primary }}>Guild</span>
              </div>
              <div style={{ ...ff, fontSize: 10, color: t.textMuted, marginTop: 3, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                The Phoenix Chapter
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingTop: 4 }}>
              <div style={{ position: 'relative' }}>
                {React.createElement(window.lucide.Bell, { size: 20, color: t.textSub })}
                <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: t.primary, border: `1.5px solid ${t.bg}` }} />
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: `0 0 0 2px ${t.bg}, 0 0 0 4px ${t.primaryBorder}` }}>
                🌟
              </div>
            </div>
          </div>

          {/* Guild XP bar */}
          <div style={{ marginTop: 14, padding: '10px 14px', background: t.surfaceAlt, borderRadius: 12, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ ...ff, fontSize: 10, fontWeight: 700, color: t.primary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Level 4 · Thriving</span>
              </div>
              <span style={{ ...ff, fontSize: 11, color: t.textMuted }}>2,340 / 3,000 XP</span>
            </div>
            <div style={{ height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '78%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3 }} />
            </div>
            <div style={{ ...ff, fontSize: 10, color: t.textMuted, marginTop: 5 }}>660 XP until Guild Treasury unlocks</div>
          </div>
        </div>

        {/* Active Challenge Banner */}
        <div style={{ margin: '18px 22px 0' }}>
          <div style={{
            background: t.primary,
            borderRadius: 16,
            padding: '18px 20px 16px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 8px 28px rgba(232,99,74,0.35)`,
          }}>
            <div style={{ position: 'absolute', right: -8, top: -12, ...pf, fontSize: 90, fontWeight: 800, color: 'rgba(255,255,255,0.07)', lineHeight: 1, pointerEvents: 'none' }}>18</div>
            <div style={{ ...ff, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>Your Active Quest</div>
            <div style={{ ...pf, fontSize: 21, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 12 }}>
              30-Day Side<br />Hustle Sprint
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {React.createElement(window.lucide.Users, { size: 13, color: 'rgba(255,255,255,0.75)' })}
                <span style={{ ...ff, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>48 members</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {React.createElement(window.lucide.Flame, { size: 13, color: 'rgba(255,255,255,0.75)' })}
                <span style={{ ...ff, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>Day 18 of 30</span>
              </div>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 14, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '60%', background: 'rgba(255,255,255,0.8)', borderRadius: 2 }} />
            </div>
            <button style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 9, padding: '8px 18px', ...ff, fontSize: 13, fontWeight: 600, color: '#FFFFFF', cursor: 'pointer' }}>
              Post Today's Update →
            </button>
          </div>
        </div>

        {/* Section heading */}
        <div style={{ padding: '26px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ ...pf, fontSize: 23, fontWeight: 700, color: t.text }}>Guild Journal</div>
          <div style={{ ...ff, fontSize: 12, color: t.primary, fontWeight: 500 }}>All posts →</div>
        </div>

        {/* Feed — overlapping angled cards */}
        <div style={{ padding: '14px 22px 28px', position: 'relative' }}>
          {feedData.map((post, idx) => (
            <div
              key={post.id}
              style={{
                background: t.card,
                borderRadius: 18,
                padding: '16px 16px 14px',
                border: `1px solid ${t.border}`,
                transform: `rotate(${post.rotate}deg)`,
                position: 'relative',
                zIndex: idx + 1,
                marginTop: idx > 0 ? -10 : 0,
                boxShadow: t.cardShadow,
              }}
            >
              {/* Post header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${t.primary}`, flexShrink: 0 }}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{ ...ff, fontSize: 13, fontWeight: 600, color: t.text }}>{post.user}</div>
                    <div style={{ ...ff, fontSize: 11, color: t.textMuted }}>Day {post.day} · {post.time}</div>
                  </div>
                </div>
                <div style={{ background: post.tagColor + '18', border: `1px solid ${post.tagColor}40`, borderRadius: 7, padding: '3px 9px', flexShrink: 0 }}>
                  <span style={{ ...ff, fontSize: 10, fontWeight: 700, color: post.tagColor, letterSpacing: '0.06em' }}>{post.tag}</span>
                </div>
              </div>

              {/* Challenge */}
              <div style={{ ...pf, fontSize: 12, fontStyle: 'italic', color: t.textSub, marginBottom: 7 }}>
                {post.challenge}
              </div>

              {/* Update */}
              <div style={{ ...ff, fontSize: 13, color: t.text, lineHeight: 1.55, marginBottom: 12 }}>
                {post.update}
              </div>

              {/* Amount */}
              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 5, background: t.primarySoft, border: `1px solid ${t.primaryBorder}`, borderRadius: 9, padding: '5px 12px', marginBottom: 12 }}>
                <span style={{ ...pf, fontSize: 20, fontWeight: 700, color: t.primary }}>{post.amount}</span>
                <span style={{ ...ff, fontSize: 10, color: t.textSub }}>{post.amountLabel}</span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 18, borderTop: `1px solid ${t.border}`, paddingTop: 10 }}>
                <button
                  onClick={() => setLiked(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {React.createElement(window.lucide.Heart, { size: 15, color: liked[post.id] ? t.primary : t.textMuted, fill: liked[post.id] ? t.primary : 'none' })}
                  <span style={{ ...ff, fontSize: 12, color: liked[post.id] ? t.primary : t.textMuted }}>{post.likes + (liked[post.id] ? 1 : 0)}</span>
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {React.createElement(window.lucide.MessageCircle, { size: 15, color: t.textMuted })}
                  <span style={{ ...ff, fontSize: 12, color: t.textMuted }}>{post.comments}</span>
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {React.createElement(window.lucide.Share2, { size: 15, color: t.textMuted })}
                  <span style={{ ...ff, fontSize: 12, color: t.textMuted }}>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ExploreScreen = () => {
    const [voted, setVoted] = useState({});
    const [activeFilter, setActiveFilter] = useState('All');
    const [joined, setJoined] = useState({ 1: true, 2: true });
    const filters = ['All', 'Income', 'Debt', 'Savings', 'Budget', 'Invest'];
    const filtered = activeFilter === 'All' ? challengeData : challengeData.filter(c => c.category === activeFilter);
    const diffColors = { Easy: t.green, Medium: t.accent, Hard: t.primary };
    const maxVotes = Math.max(...challengeData.map(c => c.votes));

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        {/* Header */}
        <div style={{ padding: '16px 22px 14px' }}>
          <div style={{ ...pf, fontSize: 28, fontWeight: 800, color: t.text, marginBottom: 2 }}>Explore</div>
          <div style={{ ...ff, fontSize: 13, color: t.textSub }}>Discover · vote · create challenges</div>

          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, borderRadius: 12, padding: '11px 14px', border: `1px solid ${t.border}` }}>
            {React.createElement(window.lucide.Search, { size: 15, color: t.textMuted })}
            <span style={{ ...ff, fontSize: 13, color: t.textFaint }}>Search challenges…</span>
          </div>
        </div>

        {/* Monthly Vote */}
        <div style={{ margin: '0 22px 18px', padding: '16px', background: t.surfaceAlt, borderRadius: 16, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ ...ff, fontSize: 10, fontWeight: 700, color: t.primary, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>
                March Vote · 4 days left
              </div>
              <div style={{ ...pf, fontSize: 18, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>
                Choose Next Month's<br />Featured Quest
              </div>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: t.primarySoft, border: `1px solid ${t.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ ...pf, fontSize: 22, fontWeight: 800, color: t.primary }}>4</div>
            </div>
          </div>

          <div style={{ height: 1, background: t.border, marginBottom: 12 }} />

          {challengeData.slice(0, 3).map((c, idx) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: idx < 2 ? 10 : 0 }}>
              <div style={{ ...pf, fontSize: 17, fontWeight: 800, color: idx === 0 ? t.primary : t.textFaint, width: 18, textAlign: 'center', flexShrink: 0 }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...ff, fontSize: 12, fontWeight: 500, color: t.text, marginBottom: 4 }}>{c.title}</div>
                <div style={{ height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(c.votes / maxVotes) * 100}%`, background: idx === 0 ? t.primary : t.accent, borderRadius: 2 }} />
                </div>
              </div>
              <div style={{ ...ff, fontSize: 12, fontWeight: 600, color: t.textMuted, width: 28, textAlign: 'right', flexShrink: 0 }}>{c.votes}</div>
              <button
                onClick={() => setVoted(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                style={{
                  flexShrink: 0,
                  padding: '4px 10px',
                  borderRadius: 7,
                  background: voted[c.id] ? t.primary : 'transparent',
                  border: `1px solid ${voted[c.id] ? t.primary : t.border}`,
                  ...ff, fontSize: 11, fontWeight: 600,
                  color: voted[c.id] ? '#FFFFFF' : t.textMuted,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {voted[c.id] ? '✓' : 'Vote'}
              </button>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div style={{ paddingLeft: 22, paddingBottom: 14, display: 'flex', gap: 8, overflowX: 'auto' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                flexShrink: 0,
                padding: '6px 16px',
                borderRadius: 20,
                background: activeFilter === f ? t.primary : t.surfaceAlt,
                border: `1px solid ${activeFilter === f ? t.primary : t.border}`,
                ...ff, fontSize: 12, fontWeight: 500,
                color: activeFilter === f ? '#FFFFFF' : t.textSub,
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Challenge cards */}
        <div style={{ padding: '0 22px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: t.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${t.border}`, boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.3)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1, paddingRight: 12 }}>
                  <div style={{ ...pf, fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.25, marginBottom: 3 }}>{c.title}</div>
                  <div style={{ ...ff, fontSize: 11, color: t.textMuted, fontStyle: 'italic' }}>by {c.creator}</div>
                </div>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ ...pf, fontSize: 22, fontWeight: 800, color: t.primary, lineHeight: 1 }}>{c.votes}</div>
                  <div style={{ ...ff, fontSize: 9, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>votes</div>
                </div>
              </div>
              <div style={{ ...ff, fontSize: 12, color: t.textSub, lineHeight: 1.5, marginBottom: 12 }}>{c.description}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ padding: '3px 8px', borderRadius: 5, background: diffColors[c.difficulty] + '18', border: `1px solid ${diffColors[c.difficulty]}35` }}>
                    <span style={{ ...ff, fontSize: 10, fontWeight: 700, color: diffColors[c.difficulty] }}>{c.difficulty}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {React.createElement(window.lucide.Users, { size: 12, color: t.textMuted })}
                    <span style={{ ...ff, fontSize: 11, color: t.textMuted }}>{c.members}</span>
                  </div>
                </div>
                <button
                  onClick={() => setJoined(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                  style={{
                    padding: '7px 16px', borderRadius: 9,
                    background: joined[c.id] ? t.primarySoft : t.primary,
                    border: `1px solid ${t.primary}`,
                    ...ff, fontSize: 12, fontWeight: 600,
                    color: joined[c.id] ? t.primary : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  {joined[c.id] ? 'Joined ✓' : 'Join Quest'}
                </button>
              </div>
            </div>
          ))}

          {/* Create CTA */}
          <button style={{ width: '100%', padding: '15px', borderRadius: 14, background: 'transparent', border: `2px dashed ${t.border}`, ...pf, fontSize: 16, fontWeight: 600, color: t.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {React.createElement(window.lucide.Plus, { size: 20, color: t.textMuted })}
            Design New Challenge
          </button>
        </div>
      </div>
    );
  };

  const GuildScreen = () => {
    const currentXP = 2340;
    const currentLevel = 4;

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        {/* Header */}
        <div style={{ padding: '16px 22px 0' }}>
          <div style={{ ...ff, fontSize: 10, fontWeight: 700, color: t.primary, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Your Guild</div>
          <div style={{ ...pf, fontSize: 28, fontWeight: 800, color: t.text, lineHeight: 1.1, marginBottom: 3 }}>
            The Phoenix<br />Chapter
          </div>
          <div style={{ ...ff, fontSize: 12, color: t.textSub, marginBottom: 18 }}>Est. January 2025 · 24 members</div>
        </div>

        {/* Overlapping angled stat cards */}
        <div style={{ padding: '0 22px', position: 'relative', height: 240, marginBottom: 8 }}>
          {/* Card 1 — coral, largest, back-left */}
          <div style={{
            position: 'absolute', left: 22, top: 0, width: 210,
            background: t.primary, borderRadius: 18, padding: '18px 20px',
            transform: 'rotate(-2.8deg)',
            zIndex: 1,
            boxShadow: `0 10px 36px rgba(232,99,74,0.40)`,
          }}>
            <div style={{ ...ff, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>Guild Total Saved</div>
            <div style={{ ...pf, fontSize: 36, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>$48,200</div>
            <div style={{ ...ff, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>+$12,400 this month</div>
          </div>

          {/* Card 2 — surface, top-right */}
          <div style={{
            position: 'absolute', right: 22, top: 16, width: 140,
            background: t.surfaceAlt, borderRadius: 14, padding: '14px 16px',
            border: `1px solid ${t.border}`,
            transform: 'rotate(2.2deg)',
            zIndex: 2,
            boxShadow: t.cardShadow,
          }}>
            <div style={{ ...ff, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Active Quests</div>
            <div style={{ ...pf, fontSize: 40, fontWeight: 800, color: t.text, lineHeight: 1 }}>7</div>
            <div style={{ ...ff, fontSize: 11, color: t.textMuted, marginTop: 4 }}>in progress</div>
          </div>

          {/* Card 3 — accent, bottom overlapping */}
          <div style={{
            position: 'absolute', left: 38, top: 136, width: 165,
            background: t.card, borderRadius: 12, padding: '12px 14px',
            border: `1px solid ${t.border}`,
            transform: 'rotate(-0.6deg)',
            zIndex: 3,
            boxShadow: t.cardShadow,
          }}>
            <div style={{ ...ff, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>🔥 Top Streak</div>
            <div style={{ ...pf, fontSize: 26, fontWeight: 800, color: t.text, lineHeight: 1 }}>31 days</div>
            <div style={{ ...ff, fontSize: 11, color: t.textSub, marginTop: 3 }}>Zoe L. · Co-Leader</div>
          </div>

          {/* Card 4 — small, far right bottom */}
          <div style={{
            position: 'absolute', right: 28, top: 148, width: 115,
            background: t.accentSoft, borderRadius: 10, padding: '10px 12px',
            border: `1px solid ${t.accent}30`,
            transform: 'rotate(1.0deg)',
            zIndex: 4,
            boxShadow: isDark ? '0 3px 12px rgba(0,0,0,0.4)' : '0 3px 12px rgba(0,0,0,0.07)',
          }}>
            <div style={{ ...ff, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>Members</div>
            <div style={{ ...pf, fontSize: 26, fontWeight: 800, color: t.accent, lineHeight: 1 }}>24</div>
          </div>
        </div>

        {/* Milestone Progression */}
        <div style={{ padding: '12px 22px 0' }}>
          <div style={{ ...pf, fontSize: 21, fontWeight: 700, color: t.text, marginBottom: 14 }}>Guild Progression</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {milestonesData.map((m) => (
              <div key={m.level} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: m.unlocked ? t.primary : t.surfaceAlt,
                  border: `2px solid ${m.unlocked ? t.primary : t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {m.unlocked
                    ? React.createElement(window.lucide.Check, { size: 15, color: '#FFFFFF' })
                    : React.createElement(window.lucide.Lock, { size: 13, color: t.textFaint })
                  }
                </div>
                <div style={{
                  flex: 1, padding: '9px 12px',
                  background: m.level === currentLevel ? t.primarySoft : m.unlocked ? t.surfaceAlt : 'transparent',
                  borderRadius: 10,
                  border: `1px solid ${m.level === currentLevel ? t.primaryBorder : t.border}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ ...ff, fontSize: 12, fontWeight: 600, color: m.unlocked ? t.text : t.textFaint }}>
                        Lv {m.level} · {m.label}
                      </div>
                      <div style={{ ...ff, fontSize: 11, color: m.unlocked ? t.textSub : t.textFaint, marginTop: 1 }}>
                        {m.unlocked ? `✓ ${m.feature}` : `🔒 ${m.feature}`}
                      </div>
                    </div>
                    <div style={{ ...ff, fontSize: 11, color: m.unlocked ? t.textMuted : t.textFaint }}>{m.xp.toLocaleString()} XP</div>
                  </div>
                  {m.level === currentLevel && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '78%', background: t.primary, borderRadius: 2 }} />
                      </div>
                      <div style={{ ...ff, fontSize: 10, color: t.primary, marginTop: 4 }}>2,340 / 3,000 XP · 78% to Level 5</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members */}
        <div style={{ padding: '24px 22px 24px' }}>
          <div style={{ ...pf, fontSize: 21, fontWeight: 700, color: t.text, marginBottom: 14 }}>Leaderboard</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {membersData.map((m, idx) => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: idx < 3 ? t.surfaceAlt : 'transparent', borderRadius: 11, border: `1px solid ${idx < 3 ? t.border : t.border + '80'}` }}>
                <div style={{ ...pf, fontSize: 15, fontWeight: 800, color: idx === 0 ? t.primary : idx === 1 ? t.accent : idx === 2 ? t.blue : t.textFaint, width: 20, textAlign: 'center', flexShrink: 0 }}>
                  {idx + 1}
                </div>
                <div style={{ fontSize: 22, flexShrink: 0 }}>{m.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...ff, fontSize: 13, fontWeight: 600, color: t.text }}>{m.name}</div>
                  <div style={{ ...ff, fontSize: 11, color: t.textMuted }}>{m.role}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ ...ff, fontSize: 12, fontWeight: 600, color: t.text }}>{m.saved}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 }}>
                    <span style={{ fontSize: 11 }}>🔥</span>
                    <span style={{ ...ff, fontSize: 11, color: t.textMuted }}>{m.streak}d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    const [section, setSection] = useState('badges');

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
        {/* Profile header */}
        <div style={{ padding: '16px 22px 0', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: t.primary, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, boxShadow: `0 0 0 3px ${t.bg}, 0 0 0 5px ${t.primaryBorder}` }}>
            🌟
          </div>
          <div style={{ ...pf, fontSize: 26, fontWeight: 800, color: t.text }}>Amara K.</div>
          <div style={{ ...ff, fontSize: 12, color: t.primary, fontWeight: 600, marginTop: 3, letterSpacing: '0.04em' }}>Guild Leader · Level 4</div>
          <div style={{ ...ff, fontSize: 12, color: t.textSub, marginTop: 6, fontStyle: 'italic', lineHeight: 1.4 }}>
            "Building generational wealth,<br />one quest at a time"
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginTop: 18, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: '14px 0' }}>
            {[
              { val: '8', label: 'Quests' },
              { val: '23', label: 'Streak' },
              { val: '$12.4K', label: 'Saved' },
              { val: '4', label: 'Badges' },
            ].map((stat, idx) => (
              <div key={stat.label} style={{ flex: 1, textAlign: 'center', borderRight: idx < 3 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ ...pf, fontSize: 20, fontWeight: 800, color: t.text }}>{stat.val}</div>
                <div style={{ ...ff, fontSize: 10, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', padding: '0 22px', marginTop: 16, gap: 0, borderBottom: `1px solid ${t.border}` }}>
          {['badges', 'quests', 'settings'].map(tab => (
            <button key={tab} onClick={() => setSection(tab)} style={{ flex: 1, padding: '10px 0', background: 'none', border: 'none', borderBottom: `2px solid ${section === tab ? t.primary : 'transparent'}`, ...ff, fontSize: 13, fontWeight: section === tab ? 600 : 400, color: section === tab ? t.primary : t.textMuted, cursor: 'pointer', textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '18px 22px 24px' }}>
          {section === 'badges' && (
            <div>
              <div style={{ ...pf, fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 14 }}>Achievement Showcase</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {badgeData.map(badge => (
                  <div key={badge.id} style={{
                    padding: '14px 8px 12px', borderRadius: 14, textAlign: 'center',
                    background: badge.earned ? t.surfaceAlt : 'transparent',
                    border: `1px solid ${badge.earned ? t.primaryBorder : t.border}`,
                    opacity: badge.earned ? 1 : 0.4,
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{badge.emoji}</div>
                    <div style={{ ...ff, fontSize: 11, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{badge.name}</div>
                    <div style={{ ...ff, fontSize: 9, color: t.textMuted, marginTop: 3, lineHeight: 1.4 }}>{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'quests' && (
            <div>
              <div style={{ ...pf, fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 14 }}>Active Quests</div>
              {challengeData.filter(c => c.active).map(c => (
                <div key={c.id} style={{ padding: '14px', background: t.surfaceAlt, borderRadius: 12, border: `1px solid ${t.border}`, marginBottom: 10 }}>
                  <div style={{ ...pf, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 5 }}>{c.title}</div>
                  <div style={{ ...ff, fontSize: 12, color: t.textSub, lineHeight: 1.45, marginBottom: 10 }}>{c.description}</div>
                  <div style={{ height: 5, background: t.border, borderRadius: 3, overflow: 'hidden', marginBottom: 5 }}>
                    <div style={{ height: '100%', width: `${c.progress}%`, background: t.primary, borderRadius: 3 }} />
                  </div>
                  <div style={{ ...ff, fontSize: 11, color: t.textMuted }}>Day 18 of 30 · {c.progress}% complete</div>
                </div>
              ))}

              <div style={{ ...pf, fontSize: 20, fontWeight: 700, color: t.text, margin: '20px 0 14px' }}>Completed</div>
              {challengeData.filter(c => !c.active && c.progress === 100).map(c => (
                <div key={c.id} style={{ padding: '12px 14px', background: 'transparent', borderRadius: 12, border: `1px solid ${t.border}`, marginBottom: 8, opacity: 0.75 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ ...pf, fontSize: 14, fontWeight: 700, color: t.text }}>{c.title}</div>
                    <span style={{ fontSize: 18 }}>✅</span>
                  </div>
                  <div style={{ ...ff, fontSize: 11, color: t.textMuted, marginTop: 3 }}>{c.members} participants · Completed</div>
                </div>
              ))}
            </div>
          )}

          {section === 'settings' && (
            <div>
              <div style={{ ...pf, fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 14 }}>Settings</div>

              {/* Theme toggle */}
              <div style={{ padding: '14px 16px', background: t.surfaceAlt, borderRadius: 12, border: `1px solid ${t.border}`, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ ...ff, fontSize: 13, fontWeight: 600, color: t.text }}>Dark Mode</div>
                  <div style={{ ...ff, fontSize: 11, color: t.textMuted }}>Currently {isDark ? 'dark' : 'light'} theme</div>
                </div>
                <button
                  onClick={() => setIsDark(!isDark)}
                  style={{ width: 50, height: 27, borderRadius: 14, background: isDark ? t.primary : t.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
                >
                  <div style={{ position: 'absolute', top: 3.5, left: isDark ? 27 : 4, width: 20, height: 20, borderRadius: '50%', background: '#FFFFFF', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }} />
                </button>
              </div>

              {[
                { label: 'Notifications', sub: 'Guild updates & reminders', icon: window.lucide.Bell },
                { label: 'Privacy', sub: 'Manage who sees your progress', icon: window.lucide.Shield },
                { label: 'Invite Members', sub: 'Grow your guild', icon: window.lucide.UserPlus },
                { label: 'Help & Feedback', sub: 'Send us your thoughts', icon: window.lucide.HelpCircle },
              ].map(item => (
                <div key={item.label} style={{ padding: '13px 16px', background: t.surfaceAlt, borderRadius: 12, border: `1px solid ${t.border}`, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {React.createElement(item.icon, { size: 17, color: t.primary })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...ff, fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
                    <div style={{ ...ff, fontSize: 11, color: t.textMuted }}>{item.sub}</div>
                  </div>
                  {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textFaint })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'guild', label: 'Guild', icon: window.lucide.Shield },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    guild: GuildScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
        position: 'relative',
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 37, background: '#000000', borderRadius: 20, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1.5px solid #2a2a2a' }} />
          <div style={{ width: 22, height: 7, borderRadius: 4, background: '#0a0a0a', border: '1px solid #2a2a2a' }} />
        </div>

        {/* Status Bar */}
        <StatusBar />

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          padding: '8px 0 20px',
          display: 'flex',
          flexShrink: 0,
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const navItemStyle = {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '4px 0',
              background: 'none',
              border: 'none',
              transition: 'opacity 0.1s',
            };
            const labelStyle = {
              ...ff,
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? t.primary : t.textMuted,
              letterSpacing: '0.02em',
            };
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={navItemStyle}
              >
                <div style={{ position: 'relative' }}>
                  {React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textMuted, strokeWidth: isActive ? 2.2 : 1.8 })}
                  {isActive && (
                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: t.primary }} />
                  )}
                </div>
                <span style={labelStyle}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
