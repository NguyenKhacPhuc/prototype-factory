const { useState, useEffect, useRef } = React;

// Inject Google Fonts
const _fontEl = document.createElement('style');
_fontEl.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(_fontEl);

const themes = {
  light: {
    bg: '#EFF6F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F5FAF7',
    card: '#FFFFFF',
    primary: '#0BB86A',
    primaryDark: '#089455',
    primaryLight: '#D1FAE5',
    secondary: '#F59E0B',
    secondaryLight: '#FEF3C7',
    accent: '#7C3AED',
    accentLight: '#EDE9FE',
    danger: '#EF4444',
    text: '#12211C',
    subtext: '#4A7060',
    muted: '#94B4A8',
    border: '#DDF0E8',
    navBg: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.04)',
    shadow: '0 4px 20px rgba(11,184,106,0.12)',
    cardShadow: '0 2px 12px rgba(18,33,28,0.06)',
    gradient: 'linear-gradient(135deg, #0BB86A 0%, #089455 100%)',
    gradientBg: 'linear-gradient(180deg, #D1FAE5 0%, #EFF6F2 40%)',
    isDark: false,
  },
  dark: {
    bg: '#091410',
    surface: '#111F19',
    surfaceAlt: '#162B22',
    card: '#1A3329',
    primary: '#2EE88A',
    primaryDark: '#0BB86A',
    primaryLight: 'rgba(46,232,138,0.14)',
    secondary: '#FBBF24',
    secondaryLight: 'rgba(251,191,36,0.14)',
    accent: '#A78BFA',
    accentLight: 'rgba(167,139,250,0.14)',
    danger: '#F87171',
    text: '#E4F5EE',
    subtext: '#7BBBA0',
    muted: '#3D6B58',
    border: '#1F3D30',
    navBg: '#111F19',
    overlay: 'rgba(255,255,255,0.04)',
    shadow: '0 4px 20px rgba(0,0,0,0.4)',
    cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
    gradient: 'linear-gradient(135deg, #2EE88A 0%, #0BB86A 100%)',
    gradientBg: 'linear-gradient(180deg, rgba(46,232,138,0.08) 0%, #091410 40%)',
    isDark: true,
  }
};

// ─── Mock Data ───────────────────────────────────────────────────────────────
const FEED_POSTS = [
  {
    id: 1, user: 'Maya Chen', initials: 'MC', avatarColor: '#7C3AED',
    club: 'Dream Trip Savers', clubIcon: '✈️', time: '2h ago', type: 'milestone',
    title: 'Hit $5,000 — halfway to Bali! 🎉',
    content: 'Finally crossed the halfway mark on my Bali fund. Switched to meal prepping 4× a week and saved $280 this month alone. Sunday batch cooking with a $40 grocery run is the secret weapon.',
    amount: '$5,000', goal: '$10,000', progress: 50, likes: 47, comments: 12,
    reactions: ['🎉','💪','🌟'], imgGrad: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  {
    id: 2, user: 'James Park', initials: 'JP', avatarColor: '#E85D4A',
    club: 'Debt Crushers', clubIcon: '⚡', time: '5h ago', type: 'strategy',
    title: 'The 24-hour rule changed everything',
    content: 'Before any purchase over $30, I wait 24 hours. Saved $340 this week just by pausing. Impulse buys down 70% — wish I had started this years ago.',
    amount: '$340', goal: null, progress: null, likes: 89, comments: 23,
    reactions: ['💡','🔥','❤️'], imgGrad: null,
  },
  {
    id: 3, user: 'Sofia R.', initials: 'SR', avatarColor: '#0BB86A',
    club: 'Minimalist Money', clubIcon: '🌿', time: '1d ago', type: 'journal',
    title: 'Week 3 of the Eco-Swap challenge 🌱',
    content: 'Replaced 8 single-use items with reusables. Initial cost: $45. Monthly savings: $67. The shampoo bar alone saves $12/month. Full list in the comments!',
    amount: '$67/mo', goal: null, progress: null, likes: 134, comments: 45,
    reactions: ['🌿','♻️','💚'], imgGrad: 'linear-gradient(135deg, #11998e, #38ef7d)',
  },
  {
    id: 4, user: 'Darius T.', initials: 'DT', avatarColor: '#F59E0B',
    club: 'FIRE Builders', clubIcon: '🔥', time: '2d ago', type: 'milestone',
    title: 'Portfolio crossed $50K for the first time',
    content: 'Three years of consistent $400/mo index fund investing. The compounding is finally visible — last month alone I earned more in returns than I contributed.',
    amount: '$50,240', goal: '$250,000', progress: 20, likes: 201, comments: 67,
    reactions: ['🚀','💎','🙌'], imgGrad: 'linear-gradient(135deg, #f6d365, #fda085)',
  },
];

const CLUBS = [
  { id: 1, name: 'Dream Trip Savers', icon: '✈️', members: 24, goal: 'Hawaii 2026',
    progress: 68, total: '$41,200', mine: '$5,000', color: '#7C3AED',
    badge: 'Gold Voyagers', challenge: 'No-Spend Weekend', streak: 12,
    desc: 'Saving together for dream adventures', joined: true },
  { id: 2, name: 'Debt Crushers', icon: '⚡', members: 18, goal: 'Zero Debt 2025',
    progress: 45, total: '$87,500', mine: '$8,200', color: '#E85D4A',
    badge: 'Lightning Squad', challenge: 'Side Hustle Sprint', streak: 8,
    desc: 'Crushing debt with community power', joined: true },
  { id: 3, name: 'Minimalist Money', icon: '🌿', members: 31, goal: 'Eco Wealth',
    progress: 77, total: '$52,800', mine: '$3,100', color: '#0BB86A',
    badge: 'Green Pioneers', challenge: 'Eco-Swap Month', streak: 21,
    desc: 'Sustainable living, sustainable wealth', joined: true },
  { id: 4, name: 'FIRE Builders', icon: '🔥', members: 42, goal: 'FI by 40',
    progress: 34, total: '$1.2M', mine: null, color: '#F59E0B',
    badge: 'Ember Crew', challenge: 'Invest-a-Day', streak: 0,
    desc: 'Financial independence & early retirement', joined: false },
  { id: 5, name: 'Side Hustlers', icon: '💼', members: 55, goal: '+$1K/mo',
    progress: 58, total: '$320K earned', mine: null, color: '#EC4899',
    badge: 'Hustle Elite', challenge: 'Launch Sprint', streak: 0,
    desc: 'Building income streams together', joined: false },
];

const CHALLENGES = [
  { id: 1, title: 'No-Spend Weekend Warrior', club: 'Dream Trip Savers', clubIcon: '✈️',
    daysLeft: 3, totalDays: 7, participants: 18, reward: '🏆 Voyager Badge',
    color: '#7C3AED', grad: 'linear-gradient(135deg, #667eea, #764ba2)',
    category: 'Saving Sprint',
    tasks: [
      { id: 1, text: 'Log a $0 day', done: true },
      { id: 2, text: 'Share your free activity', done: true },
      { id: 3, text: 'Calculate total saved', done: false },
      { id: 4, text: 'Post your weekend journal', done: false },
    ] },
  { id: 2, title: 'Eco-Swap Month', club: 'Minimalist Money', clubIcon: '🌿',
    daysLeft: 18, totalDays: 30, participants: 28, reward: '🌿 Green Pioneer Badge',
    color: '#0BB86A', grad: 'linear-gradient(135deg, #11998e, #38ef7d)',
    category: 'Eco Living',
    tasks: [
      { id: 1, text: 'Replace 1 single-use item', done: true },
      { id: 2, text: 'Calculate monthly savings', done: true },
      { id: 3, text: 'Share eco-swap hack', done: true },
      { id: 4, text: 'Recruit 1 friend', done: false },
      { id: 5, text: 'Post 2-week reflection', done: false },
    ] },
  { id: 3, title: 'Side Hustle Sprint', club: 'Debt Crushers', clubIcon: '⚡',
    daysLeft: 21, totalDays: 28, participants: 14, reward: '⚡ Hustle Champion Badge',
    color: '#E85D4A', grad: 'linear-gradient(135deg, #f093fb, #f5576c)',
    category: 'Income Boost',
    tasks: [
      { id: 1, text: 'Launch 1 income stream', done: true },
      { id: 2, text: 'Earn first $50', done: false },
      { id: 3, text: 'Document your method', done: false },
      { id: 4, text: 'Share results with club', done: false },
    ] },
];

const BADGES = [
  { id: 1, name: 'First Save', icon: '🌱', earned: true, desc: 'Saved your first $100' },
  { id: 2, name: 'Voyager', icon: '✈️', earned: true, desc: 'Joined Dream Trip Savers' },
  { id: 3, name: 'Streak Master', icon: '🔥', earned: true, desc: '7-day posting streak' },
  { id: 4, name: 'Strategy Star', icon: '⭐', earned: true, desc: 'Hack rated by 50+ members' },
  { id: 5, name: 'Debt Slayer', icon: '⚡', earned: false, desc: 'Pay off $10,000 in debt' },
  { id: 6, name: 'Eco Pioneer', icon: '🌿', earned: false, desc: 'Complete Eco-Swap Month' },
  { id: 7, name: 'Club Founder', icon: '👑', earned: false, desc: 'Create your own club' },
  { id: 8, name: 'Mentor', icon: '🎓', earned: false, desc: 'Help 10 members hit goals' },
];

// ─── Small Reusable Components ────────────────────────────────────────────────
function Avatar({ initials, color, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.38, flexShrink: 0,
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>{initials}</div>
  );
}

function ProgressBar({ value, color, height = 6, bg }) {
  return (
    <div style={{ width: '100%', height, borderRadius: height, background: bg || 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', borderRadius: height, background: color, transition: 'width 0.6s ease' }} />
    </div>
  );
}

function Tag({ text, color, bg }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, borderRadius: 20, padding: '2px 8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {text}
    </span>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  const [liked, setLiked] = useState({});
  const [activeStory, setActiveStory] = useState(null);

  const stories = [
    { id: 0, initials: '+', color: theme.primary, label: 'Add', isAdd: true },
    { id: 1, initials: 'MC', color: '#7C3AED', label: 'Maya', hasNew: true },
    { id: 2, initials: 'JP', color: '#E85D4A', label: 'James', hasNew: true },
    { id: 3, initials: 'SR', color: '#0BB86A', label: 'Sofia', hasNew: false },
    { id: 4, initials: 'DT', color: '#F59E0B', label: 'Darius', hasNew: true },
    { id: 5, initials: 'AL', color: '#EC4899', label: 'Alex', hasNew: false },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 10px', background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: theme.muted, fontWeight: 500, letterSpacing: 0.5 }}>GOOD MORNING</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>Hey, Alex 👋</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              {React.createElement(window.lucide.Bell, { size: 22, color: theme.subtext })}
              <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: theme.danger, border: `2px solid ${theme.surface}` }} />
            </div>
            <Avatar initials="AL" color="#EC4899" size={34} />
          </div>
        </div>
        {/* Savings summary pill */}
        <div style={{ marginTop: 12, background: theme.gradient, borderRadius: 14, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 500 }}>Total Stashed</div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>$16,300</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 500 }}>This Month</div>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>+$840 🎯</div>
          </div>
        </div>
      </div>

      {/* Stories / Club Updates */}
      <div style={{ padding: '12px 0 8px', background: theme.surface, borderBottom: `1px solid ${theme.border}`, marginBottom: 8 }}>
        <div style={{ paddingLeft: 16, marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: theme.subtext, letterSpacing: 0.3 }}>CLUB UPDATES</span>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 16, overflowX: 'auto', paddingRight: 16 }}>
          {stories.map(s => (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', flexShrink: 0 }}
              onClick={() => setActiveStory(s.id)}>
              <div style={{
                width: 52, height: 52, borderRadius: 26,
                background: s.isAdd ? theme.primaryLight : (s.hasNew ? theme.gradient : 'transparent'),
                padding: s.isAdd ? 0 : 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {s.isAdd
                  ? React.createElement(window.lucide.Plus, { size: 22, color: theme.primary })
                  : <div style={{ width: 46, height: 46, borderRadius: 23, background: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                      <Avatar initials={s.initials} color={s.color} size={42} />
                    </div>
                }
              </div>
              <span style={{ fontSize: 10, color: theme.subtext, fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ padding: '0 12px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingTop: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>Club Feed</span>
          {React.createElement(window.lucide.SlidersHorizontal, { size: 18, color: theme.subtext })}
        </div>
        {FEED_POSTS.map(post => (
          <PostCard key={post.id} post={post} theme={theme} liked={liked} setLiked={setLiked} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, theme, liked, setLiked }) {
  const [pressed, setPressed] = useState(false);
  const isLiked = liked[post.id];

  const typeColors = {
    milestone: { bg: theme.primaryLight, color: theme.primary, label: '🏁 Milestone' },
    strategy: { bg: theme.accentLight || '#EDE9FE', color: theme.accent, label: '💡 Strategy' },
    journal: { bg: theme.secondaryLight, color: theme.secondary, label: '📓 Journal' },
  };
  const tc = typeColors[post.type];

  return (
    <div style={{
      background: theme.card, borderRadius: 18, marginBottom: 12,
      boxShadow: theme.cardShadow, overflow: 'hidden', border: `1px solid ${theme.border}`,
      transform: pressed ? 'scale(0.99)' : 'scale(1)', transition: 'transform 0.15s ease',
    }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}>

      {post.imgGrad && (
        <div style={{ height: 120, background: post.imgGrad, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 8, left: 10 }}>
            <Tag text={tc.label} color="#fff" bg="rgba(0,0,0,0.35)" />
          </div>
        </div>
      )}

      <div style={{ padding: '12px 14px' }}>
        {/* Author row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar initials={post.initials} color={post.avatarColor} size={34} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{post.user}</div>
              <div style={{ fontSize: 11, color: theme.muted, display: 'flex', alignItems: 'center', gap: 3 }}>
                <span>{post.clubIcon}</span> {post.club} · {post.time}
              </div>
            </div>
          </div>
          {!post.imgGrad && <Tag text={tc.label} color={tc.color} bg={tc.bg} />}
        </div>

        {/* Content */}
        <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 5 }}>{post.title}</div>
        <div style={{ fontSize: 13, color: theme.subtext, lineHeight: 1.55, marginBottom: 10 }}>{post.content}</div>

        {/* Amount / Progress */}
        {post.amount && (
          <div style={{ background: theme.surfaceAlt, borderRadius: 10, padding: '8px 10px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: post.progress ? 6 : 0 }}>
              <span style={{ fontSize: 12, color: theme.muted, fontWeight: 500 }}>
                {post.goal ? 'Progress' : 'Saved'}
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: theme.primary }}>
                {post.amount}{post.goal ? ` / ${post.goal}` : ''}
              </span>
            </div>
            {post.progress !== null && <ProgressBar value={post.progress} color={theme.primary} bg={theme.border} />}
          </div>
        )}

        {/* Reactions & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {post.reactions.map((r, i) => (
              <span key={i} style={{ fontSize: 16 }}>{r}</span>
            ))}
            <span style={{ fontSize: 12, color: theme.muted, marginLeft: 2, alignSelf: 'center', fontWeight: 600 }}>
              {post.likes + (isLiked ? 1 : 0)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setLiked(p => ({ ...p, [post.id]: !p[post.id] }))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: isLiked ? theme.danger : theme.muted, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, padding: 0 }}>
              {React.createElement(window.lucide.Heart, { size: 16, fill: isLiked ? 'currentColor' : 'none' })}
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: theme.muted, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, padding: 0 }}>
              {React.createElement(window.lucide.MessageCircle, { size: 16 })}
              <span>{post.comments}</span>
            </button>
            {React.createElement(window.lucide.Share2, { size: 16, color: theme.muted, style: { cursor: 'pointer' } })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CLUBS SCREEN ─────────────────────────────────────────────────────────────
function ClubsScreen({ theme }) {
  const [tab, setTab] = useState('mine');
  const myClubs = CLUBS.filter(c => c.joined);
  const discover = CLUBS.filter(c => !c.joined);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ padding: '14px 16px 10px', background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 12 }}>My Clubs</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['mine', 'discover'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: tab === t ? theme.primary : theme.surfaceAlt,
              color: tab === t ? '#fff' : theme.subtext,
              fontFamily: 'inherit', fontWeight: 700, fontSize: 13, transition: 'all 0.2s',
            }}>
              {t === 'mine' ? `My Clubs (${myClubs.length})` : `Discover (${discover.length})`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px' }}>
        {tab === 'mine' ? (
          <>
            {/* Impact summary */}
            <div style={{ background: theme.gradient, borderRadius: 16, padding: '14px 16px', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 500 }}>Clubs</div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>3</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 500 }}>Members</div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>73</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 500 }}>Best Streak</div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>21🔥</div>
              </div>
            </div>
            {myClubs.map(club => <ClubCard key={club.id} club={club} theme={theme} joined={true} />)}
          </>
        ) : (
          <>
            <div style={{ marginBottom: 10, padding: '0 2px' }}>
              <div style={{ background: theme.card, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', border: `1px solid ${theme.border}` }}>
                {React.createElement(window.lucide.Search, { size: 16, color: theme.muted })}
                <span style={{ fontSize: 13, color: theme.muted, fontWeight: 400 }}>Find clubs by goal or interest...</span>
              </div>
            </div>
            {discover.map(club => <ClubCard key={club.id} club={club} theme={theme} joined={false} />)}
          </>
        )}
      </div>
    </div>
  );
}

function ClubCard({ club, theme, joined }) {
  const [joining, setJoining] = useState(false);

  return (
    <div style={{ background: theme.card, borderRadius: 18, marginBottom: 12, padding: '14px', boxShadow: theme.cardShadow, border: `1px solid ${theme.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: `${club.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {club.icon}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: theme.text }}>{club.name}</div>
            <div style={{ fontSize: 12, color: theme.muted }}>
              {React.createElement(window.lucide.Users, { size: 11, style: { display: 'inline', marginRight: 3 } })}
              {club.members} members · 🏅 {club.badge}
            </div>
          </div>
        </div>
        {joined
          ? <div style={{ background: theme.primaryLight, color: theme.primary, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>Joined</div>
          : <button onClick={() => setJoining(true)} style={{
              background: joining ? theme.primaryLight : theme.primary,
              color: joining ? theme.primary : '#fff',
              border: 'none', borderRadius: 20, padding: '6px 14px', fontSize: 12,
              fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>{joining ? 'Requested' : 'Join'}</button>
        }
      </div>

      {joined && (
        <>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: theme.subtext, fontWeight: 500 }}>Goal: {club.goal}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: club.color }}>{club.progress}%</span>
            </div>
            <ProgressBar value={club.progress} color={club.color} bg={theme.border} height={5} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', background: theme.surfaceAlt, borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: theme.muted }}>Total Saved</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: theme.text }}>{club.total}</div>
            </div>
            <div style={{ width: 1, background: theme.border }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: theme.muted }}>My Share</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: theme.primary }}>{club.mine}</div>
            </div>
            <div style={{ width: 1, background: theme.border }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: theme.muted }}>Streak</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: theme.secondary }}>{club.streak}🔥</div>
            </div>
          </div>
          {club.challenge && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, background: `${club.color}12`, borderRadius: 10, padding: '7px 10px' }}>
              {React.createElement(window.lucide.Zap, { size: 13, color: club.color })}
              <span style={{ fontSize: 12, fontWeight: 600, color: club.color }}>Active: {club.challenge}</span>
            </div>
          )}
        </>
      )}
      {!joined && (
        <div style={{ fontSize: 12, color: theme.subtext, marginTop: 2 }}>{club.desc}</div>
      )}
    </div>
  );
}

// ─── CHALLENGES SCREEN ────────────────────────────────────────────────────────
function ChallengesScreen({ theme }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ padding: '14px 16px 12px', background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>Goal Challenges</div>
        <div style={{ fontSize: 13, color: theme.subtext, marginTop: 2 }}>Timed journeys with your clubs</div>
      </div>

      {/* Active stats */}
      <div style={{ margin: '12px', background: theme.gradient, borderRadius: 16, padding: '14px 16px' }}>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>YOUR ACTIVE CYCLE</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>3</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>Challenges</div>
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>7/13</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>Tasks done</div>
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>2</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>Badges near</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 12px 12px' }}>
        {CHALLENGES.map(ch => (
          <ChallengeCard key={ch.id} ch={ch} theme={theme} expanded={expanded === ch.id} onToggle={() => setExpanded(expanded === ch.id ? null : ch.id)} />
        ))}

        {/* Upcoming */}
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.subtext, marginBottom: 10, letterSpacing: 0.3 }}>UPCOMING CYCLES</div>
          {[
            { title: 'Investment Deep-Dive', club: 'FIRE Builders', icon: '🔥', starts: 'Starts in 5 days', color: '#F59E0B' },
            { title: 'Mindful Spending Month', club: 'Minimalist Money', icon: '🌿', starts: 'Starts in 12 days', color: '#0BB86A' },
          ].map((u, i) => (
            <div key={i} style={{ background: theme.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 22 }}>{u.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{u.title}</div>
                  <div style={{ fontSize: 11, color: theme.muted }}>{u.club}</div>
                </div>
              </div>
              <div style={{ background: `${u.color}18`, color: u.color, borderRadius: 20, padding: '4px 10px', fontSize: 10, fontWeight: 700 }}>{u.starts}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({ ch, theme, expanded, onToggle }) {
  const done = ch.tasks.filter(t => t.done).length;
  const pct = Math.round((done / ch.tasks.length) * 100);
  const daysPct = Math.round(((ch.totalDays - ch.daysLeft) / ch.totalDays) * 100);

  return (
    <div style={{ background: theme.card, borderRadius: 18, marginBottom: 12, overflow: 'hidden', boxShadow: theme.cardShadow, border: `1px solid ${theme.border}` }}>
      {/* Header with gradient */}
      <div style={{ background: ch.grad, padding: '14px 14px 12px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Tag text={ch.category} color="#fff" bg="rgba(255,255,255,0.25)" />
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginTop: 6 }}>{ch.title}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{ch.clubIcon} {ch.club}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: '4px 10px', textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{ch.daysLeft}</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 600 }}>DAYS LEFT</div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <ProgressBar value={daysPct} color="rgba(255,255,255,0.9)" bg="rgba(255,255,255,0.3)" height={4} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>Day {ch.totalDays - ch.daysLeft}/{ch.totalDays}</span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>{ch.participants} participants</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 12, color: theme.subtext, fontWeight: 500 }}>Tasks: {done}/{ch.tasks.length}</div>
            <div style={{ background: pct >= 60 ? theme.primaryLight : theme.secondaryLight, color: pct >= 60 ? theme.primary : theme.secondary, borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
              {pct}%
            </div>
          </div>
          <div style={{ fontSize: 12, color: theme.secondary, fontWeight: 600 }}>{ch.reward}</div>
        </div>
        <ProgressBar value={pct} color={ch.color} bg={theme.border} />

        {/* Expandable tasks */}
        <button onClick={onToggle} style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0 2px', fontFamily: 'inherit', color: theme.subtext, fontSize: 13, fontWeight: 600 }}>
          <span>View tasks</span>
          {React.createElement(expanded ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 16 })}
        </button>

        {expanded && (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ch.tasks.map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: task.done ? theme.primaryLight : theme.surfaceAlt, borderRadius: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: task.done ? theme.primary : 'transparent', border: `2px solid ${task.done ? theme.primary : theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {task.done && React.createElement(window.lucide.Check, { size: 12, color: '#fff', strokeWidth: 3 })}
                </div>
                <span style={{ fontSize: 13, color: task.done ? theme.primary : theme.text, fontWeight: task.done ? 500 : 400, textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.8 : 1 }}>
                  {task.text}
                </span>
              </div>
            ))}
            <button style={{ marginTop: 4, background: ch.color, color: '#fff', border: 'none', borderRadius: 12, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              + Add Progress Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen({ theme, toggleTheme, isDark }) {
  const earnedBadges = BADGES.filter(b => b.earned);
  const lockedBadges = BADGES.filter(b => !b.earned);
  const [notifs, setNotifs] = useState(true);
  const [weekly, setWeekly] = useState(true);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: theme.bg, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: theme.gradient, padding: '20px 16px 60px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={toggleTheme} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 20, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600 }}>
            {React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 14 })}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: '3px solid rgba(255,255,255,0.6)', marginBottom: 10 }}>
            👤
          </div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>Alex Lawson</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 }}>@alexlawson · Joined Jan 2025</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <Tag text="✈️ Dream Saver" color="#fff" bg="rgba(255,255,255,0.2)" />
            <Tag text="🌿 Eco Crafter" color="#fff" bg="rgba(255,255,255,0.2)" />
          </div>
        </div>
      </div>

      {/* Stats card — overlapping hero */}
      <div style={{ margin: '-36px 12px 12px', background: theme.card, borderRadius: 18, padding: '14px 16px', boxShadow: theme.shadow, border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[
            { label: 'Total Saved', value: '$16,300', icon: '💰' },
            { label: 'Posts', value: '47', icon: '📝' },
            { label: 'Badges', value: '4', icon: '🏅' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: theme.text, marginTop: 2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: theme.muted, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 12px 12px' }}>
        {/* Badges */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: theme.text }}>Badges</span>
            <span style={{ fontSize: 12, color: theme.primary, fontWeight: 600 }}>{earnedBadges.length}/{BADGES.length} earned</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {BADGES.map(b => (
              <div key={b.id} style={{
                background: b.earned ? theme.primaryLight : theme.surfaceAlt, borderRadius: 14,
                padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                border: `1px solid ${b.earned ? theme.primary + '40' : theme.border}`,
                opacity: b.earned ? 1 : 0.55,
              }}>
                <div style={{ fontSize: 22, filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.icon}</div>
                <div style={{ fontSize: 10, color: b.earned ? theme.primary : theme.muted, fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>{b.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ background: theme.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.subtext, letterSpacing: 0.3 }}>SETTINGS</span>
          </div>
          {[
            { label: 'Push Notifications', icon: window.lucide.Bell, toggle: true, val: notifs, set: setNotifs },
            { label: 'Weekly Digest', icon: window.lucide.Mail, toggle: true, val: weekly, set: setWeekly },
            { label: 'Privacy & Data', icon: window.lucide.Shield, toggle: false },
            { label: 'Invite Friends', icon: window.lucide.UserPlus, toggle: false },
            { label: 'Help & Support', icon: window.lucide.HelpCircle, toggle: false },
          ].map((item, i, arr) => (
            <div key={i} style={{ padding: '13px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: theme.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(item.icon, { size: 16, color: theme.primary })}
                </div>
                <span style={{ fontSize: 14, color: theme.text, fontWeight: 500 }}>{item.label}</span>
              </div>
              {item.toggle
                ? <div onClick={() => item.set(!item.val)} style={{ width: 44, height: 24, borderRadius: 12, background: item.val ? theme.primary : theme.border, cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                    <div style={{ position: 'absolute', top: 3, left: item.val ? 23 : 3, width: 18, height: 18, borderRadius: 9, background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                : React.createElement(window.lucide.ChevronRight, { size: 18, color: theme.muted })
              }
            </div>
          ))}
        </div>

        <button style={{ width: '100%', marginTop: 12, padding: '13px', borderRadius: 14, border: 'none', background: theme.card, color: theme.danger, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', border: `1px solid ${theme.border}` }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
function StatusBar({ theme }) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 6px', background: theme.surface, flexShrink: 0, zIndex: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: theme.text })}
        {React.createElement(window.lucide.Signal, { size: 14, color: theme.text })}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${theme.text}`, display: 'flex', alignItems: 'center', padding: '1.5px', position: 'relative' }}>
            <div style={{ width: '78%', height: '100%', borderRadius: 1.5, background: theme.primary }} />
            <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 3, height: 5, borderRadius: '0 1px 1px 0', background: theme.text }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Feed', icon: window.lucide.Home },
    { id: 'clubs', label: 'Clubs', icon: window.lucide.Users },
    { id: 'challenges', label: 'Quests', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    clubs: ClubsScreen,
    challenges: ChallengesScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      backgroundImage: 'radial-gradient(circle at 30% 20%, #d4f0e4 0%, #e8e8e8 60%)',
    }}>
      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 48,
        background: theme.surface,
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        position: 'relative',
        border: `8px solid ${isDark ? '#1A2E27' : '#E0E0E0'}`,
        outline: `1px solid ${isDark ? '#0A1612' : '#C8C8C8'}`,
      }}>

        {/* Status Bar */}
        <StatusBar theme={theme} />

        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 20,
        }} />

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <ActiveScreen
            theme={theme}
            toggleTheme={() => setIsDark(d => !d)}
            isDark={isDark}
          />
        </div>

        {/* Bottom Nav */}
        <div style={{
          height: 76, background: theme.navBg, borderTop: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 12, flexShrink: 0,
          boxShadow: `0 -4px 20px ${theme.isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)'}`,
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 3, cursor: 'pointer', padding: '6px 14px', borderRadius: 16,
                  background: active ? theme.primaryLight : 'transparent',
                  transition: 'all 0.2s ease',
                  minWidth: 64,
                }}>
                {React.createElement(tab.icon, {
                  size: 22,
                  color: active ? theme.primary : theme.muted,
                  strokeWidth: active ? 2.5 : 1.8,
                })}
                <span style={{
                  fontSize: 10, fontWeight: active ? 700 : 500,
                  color: active ? theme.primary : theme.muted,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
