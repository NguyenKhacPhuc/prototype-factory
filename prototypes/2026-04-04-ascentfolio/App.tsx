const { useState, useEffect, useRef } = React;

// ── Icon Helper ─────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) => {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return React.createElement('span', { style: { display: 'inline-block', width: size, height: size } });
  return React.createElement(LucideIcon, { size, color, strokeWidth });
};

// ── Themes ──────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0f1614',
    surface: '#152019',
    card: '#1a2720',
    cardAlt: '#1f2f26',
    primary: '#28604a',
    primaryBright: '#358563',
    accent: '#c97a3e',
    accentLight: '#e0955a',
    textPrimary: '#f0ebe0',
    textSecondary: '#8a9e93',
    textMuted: '#4e6258',
    border: '#263832',
    borderLight: '#2e4540',
    navBg: '#0d1410',
    badge: '#1b2e26',
    success: '#3d9e72',
  },
  light: {
    bg: '#f5f0e8',
    surface: '#ede7da',
    card: '#faf7f1',
    cardAlt: '#f0ebe0',
    primary: '#28604a',
    primaryBright: '#358563',
    accent: '#c97a3e',
    accentLight: '#e0955a',
    textPrimary: '#1a2320',
    textSecondary: '#4a6258',
    textMuted: '#8a9e94',
    border: '#d5ccb8',
    borderLight: '#e0d8c8',
    navBg: '#e8e2d5',
    badge: '#e4ddd0',
    success: '#2d7a56',
  },
};

// ── Mock Data ────────────────────────────────────────────────────────────────
const mockFootprints = [
  {
    id: 1, user: 'Maya Chen', av: 'MC', guildColor: '#28604a',
    guild: 'First Home Forge', type: 'screenshot', ago: '2h ago',
    title: 'Crossed the 20% down payment threshold!',
    body: 'After 14 months of consistent saving, my home fund hit $40K. Here\'s my annotated breakdown — auto-transfers, overtime, and side hustle income all mapped out clearly.',
    insights: 23, forks: 7, fire: 41, clap: 28,
    tags: ['milestone', 'savings', 'housing'],
  },
  {
    id: 2, user: 'Jordan Rivers', av: 'JR', guildColor: '#c97a3e',
    guild: 'Debt Buster Bloc', type: 'voice', ago: '5h ago',
    title: 'Avalanche vs Snowball — my honest 6-month take',
    body: 'Recorded a 3-min voice note about why the debt avalanche finally clicked after months of struggle. It came down to one mindset shift nobody talks about.',
    insights: 18, forks: 12, fire: 29, clap: 54,
    tags: ['debt', 'strategy', 'mindset'],
  },
  {
    id: 3, user: 'Priya Mehta', av: 'PM', guildColor: '#4a7fa5',
    guild: 'Index Investors Club', type: 'video', ago: '1d ago',
    title: 'My first 6-month investment review — $8,400 → $9,127',
    body: 'Short walkthrough of my brokerage dashboard at 6 months. Total invested: $8,400, now worth $9,127. Sharing what I\'d do differently and why I\'m adding to small-cap.',
    insights: 45, forks: 19, fire: 67, clap: 43,
    tags: ['investing', 'review', 'index-funds'],
  },
];

const mockGuilds = [
  { id: 1, name: 'First Home Forge', members: 2847, active: 234, cat: 'Housing', color: '#28604a', emoji: '🏠', progress: 68, mine: true },
  { id: 2, name: 'Debt Buster Bloc', members: 5120, active: 891, cat: 'Debt Freedom', color: '#c97a3e', emoji: '⚡', progress: 45, mine: true },
  { id: 3, name: 'Index Investors Club', members: 3291, active: 412, cat: 'Investing', color: '#4a7fa5', emoji: '📈', progress: 72, mine: false },
  { id: 4, name: 'Emergency Fund Crew', members: 1876, active: 167, cat: 'Safety Net', color: '#7a5ca5', emoji: '🛡️', progress: 53, mine: false },
  { id: 5, name: 'Side Hustle Syndicate', members: 4203, active: 623, cat: 'Income', color: '#a55c6a', emoji: '🚀', progress: 38, mine: false },
];

const mockAchievements = [
  { id: 1, name: 'First Footprint', desc: 'Shared your first Milestone Footprint', icon: '👣', earned: true, date: 'Jan 15' },
  { id: 2, name: 'Insight Giver', desc: 'Provided 10 Collective Insights', icon: '💡', earned: true, date: 'Feb 2' },
  { id: 3, name: 'Guild Pioneer', desc: 'Active in 2+ Guilds for 30 days', icon: '🏔️', earned: true, date: 'Feb 28' },
  { id: 4, name: 'Knowledge Forker', desc: 'Forked 5 inspiring Footprints', icon: '🌿', earned: false, progress: 3, total: 5 },
  { id: 5, name: 'Ascent Legend', desc: '100 total reactions received', icon: '⭐', earned: false, progress: 67, total: 100 },
  { id: 6, name: 'Consistency Crown', desc: '30-day posting streak', icon: '👑', earned: false, progress: 12, total: 30 },
];

// ── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [activeGuild, setActiveGuild] = useState('all');
  const [pressed, setPressed] = useState(null);

  const guildFilters = [
    { id: 'all', label: 'All Guilds' },
    { id: 'fhf', label: 'Home Forge' },
    { id: 'dbb', label: 'Debt Busters' },
    { id: 'iic', label: 'Investors' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Manrope, sans-serif' }}>

      {/* ── HEADER with diagonal accent geometry ── */}
      <div style={{ padding: '18px 20px 12px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {/* Diagonal bg block — ascent motif */}
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 220, height: 150,
          background: t.primary, opacity: 0.1,
          transform: 'rotate(-18deg)', borderRadius: 18,
          pointerEvents: 'none',
        }} />
        {/* Thin copper diagonal bar */}
        <div style={{
          position: 'absolute', top: 14, right: 16,
          width: 90, height: 3,
          background: t.accent, opacity: 0.5,
          transform: 'rotate(-12deg)', borderRadius: 2,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 22, right: 24,
          width: 60, height: 3,
          background: t.accent, opacity: 0.25,
          transform: 'rotate(-12deg)', borderRadius: 2,
          pointerEvents: 'none',
        }} />

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 3 }}>
              ASCENTFOLIO
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: t.textPrimary, lineHeight: 1.15 }}>
              Morning, <span style={{ color: t.accent }}>Alex</span>
            </div>
            <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 3, fontWeight: 500 }}>
              18 new Footprints across your guilds
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              background: t.card, border: `1.5px solid ${t.border}`,
              borderRadius: 8, padding: '5px 10px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ fontSize: 13 }}>🔥</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: t.accent }}>12</span>
            </div>
            <button onClick={() => setIsDark(!isDark)} style={{
              background: t.card, border: `1.5px solid ${t.border}`,
              borderRadius: 8, width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Icon name={isDark ? 'Sun' : 'Moon'} size={15} color={t.textSecondary} />
            </button>
          </div>
        </div>

        {/* Home Fund Progress bar — asymmetric layout */}
        <div style={{ marginTop: 14, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              HOME FUND
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>$40,120</span>
              <span style={{ fontSize: 9, color: t.textMuted }}>of</span>
              <span style={{ fontSize: 12, fontWeight: 900, color: t.accent }}>$60,000</span>
            </div>
          </div>
          <div style={{ height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '67%', height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3 }} />
          </div>
        </div>
      </div>

      {/* ── GUILD FILTER PILLS ── */}
      <div style={{ paddingLeft: 20, marginBottom: 10, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingRight: 20 }}>
          {guildFilters.map(g => (
            <button key={g.id} onClick={() => setActiveGuild(g.id)} style={{
              flexShrink: 0, padding: '6px 13px',
              borderRadius: 5, border: `1.5px solid ${activeGuild === g.id ? t.primary : t.border}`,
              background: activeGuild === g.id ? t.primary : 'transparent',
              color: activeGuild === g.id ? '#fff' : t.textSecondary,
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
            }}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── FOOTPRINT FEED ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
        {mockFootprints.map(fp => (
          <div
            key={fp.id}
            onMouseDown={() => setPressed(fp.id)}
            onMouseUp={() => setPressed(null)}
            onTouchStart={() => setPressed(fp.id)}
            onTouchEnd={() => setPressed(null)}
            style={{
              background: t.card, border: `1.5px solid ${t.border}`,
              borderRadius: 10, marginBottom: 12, overflow: 'hidden',
              transform: pressed === fp.id ? 'scale(0.985)' : 'scale(1)',
              transition: 'transform 0.12s',
            }}
          >
            {/* Media preview region */}
            <div style={{
              height: fp.type === 'screenshot' ? 104 : 66,
              background: fp.type === 'screenshot' ? `${t.primary}18`
                : fp.type === 'voice' ? '#7a5ca518' : '#a55c6a18',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderBottom: `1px solid ${t.border}`,
              position: 'relative',
            }}>
              {fp.type === 'screenshot' && (
                <>
                  <div style={{
                    width: '76%', background: t.cardAlt,
                    borderRadius: 6, border: `1px solid ${t.border}`,
                    padding: '8px 10px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <div style={{ height: 5, width: 50, background: t.textMuted, borderRadius: 2, opacity: 0.35 }} />
                      <div style={{ height: 5, width: 38, background: t.accent, borderRadius: 2, opacity: 0.65 }} />
                    </div>
                    {[85, 62, 90].map((w, i) => (
                      <div key={i} style={{ height: 4, width: `${w}%`, background: t.border, borderRadius: 2, marginBottom: 3 }} />
                    ))}
                    <div style={{ height: 16, background: `${t.primary}28`, borderRadius: 3, marginTop: 5 }} />
                  </div>
                  <div style={{
                    position: 'absolute', top: 8, right: 12,
                    background: t.accent, color: '#fff',
                    borderRadius: 4, fontSize: 9, fontWeight: 800,
                    padding: '2px 6px', letterSpacing: 0.5,
                  }}>
                    ✎ ANNOTATED
                  </div>
                </>
              )}
              {fp.type === 'voice' && (
                <>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#7a5ca5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, flexShrink: 0 }}>
                    <Icon name="Mic" size={16} color="#fff" />
                  </div>
                  <div style={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                    {[4, 8, 14, 9, 6, 12, 7, 16, 10, 6, 9, 5, 11].map((h, i) => (
                      <div key={i} style={{ width: 3, height: h * 2.2, background: '#7a5ca5', borderRadius: 2, opacity: 0.7 }} />
                    ))}
                  </div>
                  <span style={{ marginLeft: 10, fontSize: 11, fontWeight: 700, color: '#7a5ca5' }}>3:24</span>
                </>
              )}
              {fp.type === 'video' && (
                <>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#a55c6a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, flexShrink: 0 }}>
                    <Icon name="Play" size={17} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: t.textPrimary }}>2:47</div>
                    <div style={{ fontSize: 10, color: t.textMuted }}>Video Footprint</div>
                  </div>
                </>
              )}
            </div>

            {/* Card body */}
            <div style={{ padding: '11px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 31, height: 31, borderRadius: 7,
                    background: fp.guildColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 900, color: '#fff',
                  }}>
                    {fp.av}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: t.textPrimary }}>{fp.user}</div>
                    <div style={{ fontSize: 10, color: t.textMuted }}>{fp.guild}</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, color: t.textMuted }}>{fp.ago}</span>
              </div>

              <div style={{ fontSize: 14, fontWeight: 800, color: t.textPrimary, lineHeight: 1.3, marginBottom: 5 }}>
                {fp.title}
              </div>
              <div style={{ fontSize: 11, color: t.textSecondary, lineHeight: 1.55, marginBottom: 9 }}>
                {fp.body.slice(0, 92)}...
              </div>

              <div style={{ display: 'flex', gap: 5, marginBottom: 9, flexWrap: 'wrap' }}>
                {fp.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, fontWeight: 700,
                    padding: '2px 7px', borderRadius: 4,
                    background: t.badge, color: t.textSecondary,
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: `1px solid ${t.border}` }}>
                <div style={{ display: 'flex', gap: 11 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary }}>🔥 {fp.fire}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary }}>👏 {fp.clap}</span>
                </div>
                <div style={{ display: 'flex', gap: 7 }}>
                  <button style={{
                    background: 'none', border: `1.5px solid ${t.border}`,
                    borderRadius: 5, padding: '4px 9px',
                    fontSize: 11, fontWeight: 700, color: t.textSecondary,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3,
                    fontFamily: 'Manrope, sans-serif',
                  }}>
                    <Icon name="MessageCircle" size={12} color={t.textSecondary} />
                    {fp.insights}
                  </button>
                  <button style={{
                    background: t.primary, border: 'none',
                    borderRadius: 5, padding: '4px 9px',
                    fontSize: 11, fontWeight: 800, color: '#fff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3,
                    fontFamily: 'Manrope, sans-serif',
                  }}>
                    <Icon name="GitFork" size={12} color="#fff" />
                    Fork
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── GUILDS SCREEN ────────────────────────────────────────────────────────────
function GuildsScreen({ t, setActiveScreen }) {
  const [tab, setTab] = useState('mine');
  const featured = mockGuilds.find(g => g.mine);
  const displayed = tab === 'mine' ? mockGuilds.filter(g => g.mine) : mockGuilds.filter(g => !g.mine);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Manrope, sans-serif' }}>

      <div style={{ padding: '18px 20px 14px', flexShrink: 0 }}>
        <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 3 }}>ASCENT GUILDS</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: t.textPrimary }}>Your Communities</div>
        <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 3 }}>2 active guilds · 127 in your network</div>
      </div>

      {/* Featured Guild Card (asymmetric diagonal) */}
      {featured && (
        <div style={{ margin: '0 20px 14px', flexShrink: 0 }}>
          <div style={{
            background: featured.color,
            borderRadius: 12, padding: '16px 18px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Diagonal decorative block */}
            <div style={{ position: 'absolute', top: -25, right: -35, width: 200, height: 140, background: 'rgba(255,255,255,0.07)', transform: 'rotate(-16deg)', borderRadius: 14 }} />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 70, height: 70, opacity: 0.18, fontSize: 52, lineHeight: 1, userSelect: 'none' }}>
              {featured.emoji}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, position: 'relative' }}>
              <div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>{featured.cat}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>{featured.name}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 6, padding: '3px 9px' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>● Active</span>
              </div>
            </div>

            {/* Stats — bold asymmetric row */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 14, position: 'relative' }}>
              {[
                { val: featured.members.toLocaleString(), label: 'Members' },
                { val: featured.active, label: 'Today' },
                { val: '#14', label: 'Your rank' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5 }}>COLLECTIVE PROGRESS</span>
                <span style={{ fontSize: 12, fontWeight: 900, color: '#fff' }}>{featured.progress}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }}>
                <div style={{ width: `${featured.progress}%`, height: '100%', background: 'rgba(255,255,255,0.75)', borderRadius: 3 }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab switcher */}
      <div style={{ display: 'flex', margin: '0 20px 12px', background: t.card, borderRadius: 8, border: `1.5px solid ${t.border}`, padding: 3, flexShrink: 0 }}>
        {[{ id: 'mine', label: 'My Guilds (2)' }, { id: 'discover', label: 'Discover' }].map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{
            flex: 1, padding: '7px', borderRadius: 6, border: 'none',
            background: tab === tb.id ? t.primary : 'transparent',
            color: tab === tb.id ? '#fff' : t.textSecondary,
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
          }}>
            {tb.label}
          </button>
        ))}
      </div>

      {/* Guild list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }}>
        {displayed.map(g => (
          <div key={g.id} style={{
            background: t.card, border: `1.5px solid ${t.border}`,
            borderRadius: 10, marginBottom: 10,
            padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 46, height: 46, borderRadius: 11, background: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {g.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: t.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: 8 }}>
                  {g.name}
                </div>
                <button style={{
                  flexShrink: 0,
                  background: g.mine ? t.badge : t.primary,
                  border: g.mine ? `1px solid ${t.border}` : 'none',
                  borderRadius: 5, padding: '3px 10px',
                  fontSize: 10, fontWeight: 800,
                  color: g.mine ? t.textSecondary : '#fff',
                  cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                }}>
                  {g.mine ? 'Joined' : 'Join'}
                </button>
              </div>
              <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 6 }}>
                {g.cat} · {g.members.toLocaleString()} members
              </div>
              <div style={{ height: 3, background: t.border, borderRadius: 2 }}>
                <div style={{ width: `${g.progress}%`, height: '100%', background: g.color, borderRadius: 2, opacity: 0.75 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CREATE SCREEN ────────────────────────────────────────────────────────────
function CreateScreen({ t, setActiveScreen }) {
  const [selectedType, setSelectedType] = useState('screenshot');
  const [selectedGuild, setSelectedGuild] = useState(1);

  const contentTypes = [
    { id: 'screenshot', label: 'Screenshot', icon: 'Image', color: '#28604a', desc: 'Annotate a chart or doc' },
    { id: 'voice', label: 'Voice Note', icon: 'Mic', color: '#7a5ca5', desc: 'Record your reflection' },
    { id: 'video', label: 'Video Clip', icon: 'Video', color: '#a55c6a', desc: 'Show your progress' },
    { id: 'text', label: 'Written Post', icon: 'FileText', color: '#c97a3e', desc: 'Share in your own words' },
  ];

  const myGuilds = mockGuilds.filter(g => g.mine);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Manrope, sans-serif' }}>

      <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 3 }}>NEW FOOTPRINT</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: t.textPrimary }}>Share a Milestone</div>
        <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 3 }}>Document your financial journey for your guild</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 100px' }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 18 }}>
          {[
            { n: 1, label: 'Type' },
            { n: 2, label: 'Content' },
            { n: 3, label: 'Guild' },
          ].map((s, i) => (
            <React.Fragment key={s.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: s.n <= 2 ? t.primary : t.card,
                  border: `1.5px solid ${s.n <= 2 ? t.primary : t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 900,
                  color: s.n <= 2 ? '#fff' : t.textMuted,
                }}>
                  {s.n <= 1 ? <Icon name="Check" size={12} color="#fff" strokeWidth={3} /> : s.n}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: s.n <= 2 ? t.textPrimary : t.textMuted }}>{s.label}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: s.n < 2 ? t.primary : t.border, borderRadius: 1 }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Content type grid */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>FOOTPRINT TYPE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {contentTypes.map(ct => (
              <button key={ct.id} onClick={() => setSelectedType(ct.id)} style={{
                background: selectedType === ct.id ? `${ct.color}1a` : t.card,
                border: `1.5px solid ${selectedType === ct.id ? ct.color : t.border}`,
                borderRadius: 9, padding: '12px 12px', textAlign: 'left',
                cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: selectedType === ct.id ? ct.color : t.badge,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 9,
                }}>
                  <Icon name={ct.icon} size={16} color={selectedType === ct.id ? '#fff' : t.textSecondary} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: t.textPrimary, marginBottom: 3 }}>{ct.label}</div>
                <div style={{ fontSize: 10, color: t.textSecondary, lineHeight: 1.4 }}>{ct.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Title field */}
        <div style={{ marginBottom: 13 }}>
          <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>FOOTPRINT TITLE</div>
          <div style={{ background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 8, padding: '11px 13px' }}>
            <span style={{ fontSize: 13, color: t.textMuted }}>e.g., "Hit my 6-month savings goal early!"</span>
          </div>
        </div>

        {/* Story field */}
        <div style={{ marginBottom: 13 }}>
          <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>YOUR STORY</div>
          <div style={{ background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 8, padding: '11px 13px', minHeight: 78 }}>
            <span style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>Describe your milestone, challenge, or what you learned. Be specific — specific stories inspire the most action...</span>
          </div>
        </div>

        {/* Guild selector */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>POST TO GUILD</div>
          {myGuilds.map(g => (
            <button key={g.id} onClick={() => setSelectedGuild(g.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              width: '100%', marginBottom: 8,
              background: selectedGuild === g.id ? `${g.color}15` : t.card,
              border: `1.5px solid ${selectedGuild === g.id ? g.color : t.border}`,
              borderRadius: 9, padding: '10px 14px', cursor: 'pointer',
              fontFamily: 'Manrope, sans-serif',
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{g.emoji}</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary }}>{g.name}</div>
                <div style={{ fontSize: 10, color: t.textMuted }}>{g.members.toLocaleString()} members</div>
              </div>
              {selectedGuild === g.id && (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="Check" size={12} color="#fff" strokeWidth={2.5} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Post CTA */}
        <button onClick={() => setActiveScreen('home')} style={{
          width: '100%', padding: '15px',
          background: `linear-gradient(130deg, ${t.primary} 0%, ${t.accent} 100%)`,
          border: 'none', borderRadius: 10,
          fontSize: 14, fontWeight: 900, color: '#fff',
          cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          letterSpacing: 0.3,
        }}>
          <Icon name="Send" size={18} color="#fff" />
          Share Footprint
        </button>
      </div>
    </div>
  );
}

// ── JOURNEY SCREEN — asymmetric diagonal layout ──────────────────────────────
function JourneyScreen({ t, setActiveScreen }) {
  const tracks = [
    { name: 'Home Fund Track', guild: 'First Home Forge', progress: 68, milestone: '$40,120 / $60,000', color: '#28604a', level: 4 },
    { name: 'Debt Elimination', guild: 'Debt Buster Bloc', progress: 45, milestone: '$8,100 cleared', color: '#c97a3e', level: 2 },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Manrope, sans-serif' }}>

      <div style={{ padding: '18px 20px 14px', flexShrink: 0 }}>
        <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 3 }}>YOUR JOURNEY</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: t.textPrimary }}>Achievement Tracks</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }}>

        {/* ── ASYMMETRIC DIAGONAL STATS SECTION ── */}
        <div style={{ position: 'relative', marginBottom: 14, borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${t.border}` }}>
          {/* Diagonal fill block for bg */}
          <div style={{ position: 'absolute', inset: 0, background: t.card, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', top: -10, right: -15,
            width: '52%', height: '160%',
            background: t.primary, opacity: 0.09,
            transform: 'rotate(-9deg)',
            pointerEvents: 'none',
          }} />
          {/* SVG ascending line — the ascent motif */}
          <svg
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 55, pointerEvents: 'none' }}
            viewBox="0 0 335 55"
            preserveAspectRatio="none"
          >
            <polyline
              points="0,52 60,42 130,30 210,18 290,9 335,4"
              fill="none"
              stroke={t.accent}
              strokeWidth="1.5"
              strokeOpacity="0.22"
              strokeDasharray="5 4"
            />
          </svg>

          {/* Asymmetric 60/40 content split */}
          <div style={{ position: 'relative', display: 'flex', padding: '18px 18px 22px', gap: 0 }}>
            {/* LEFT: large singular metric */}
            <div style={{ flex: '0 0 58%', paddingRight: 16, borderRight: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>ASCENT SCORE</div>
              <div style={{ fontSize: 52, fontWeight: 900, color: t.accent, lineHeight: 1, letterSpacing: -3, marginBottom: 6 }}>
                847
              </div>
              <div style={{ fontSize: 11, color: t.textSecondary, fontWeight: 500, marginBottom: 12 }}>
                Top <strong style={{ color: t.textPrimary }}>23%</strong> of guild members
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['🔥', '💡', '🏔️'].map(b => (
                  <div key={b} style={{ width: 28, height: 28, borderRadius: 7, background: t.badge, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{b}</div>
                ))}
                <div style={{ width: 28, height: 28, borderRadius: 7, background: t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: t.textMuted }}>+3</div>
              </div>
            </div>

            {/* RIGHT: stacked micro-stats, visually offset lower */}
            <div style={{ flex: 1, paddingLeft: 14, paddingTop: 10 }}>
              {[
                { label: 'Footprints', val: '23', icon: '👣' },
                { label: 'Insights', val: '47', icon: '💬' },
                { label: 'Forks Made', val: '3', icon: '🌿' },
                { label: 'Reactions', val: '67', icon: '⚡' },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: i < 3 ? 9 : 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 12 }}>{stat.icon}</span>
                    <span style={{ fontSize: 9, color: t.textSecondary, fontWeight: 700, letterSpacing: 0.5 }}>{stat.label}</span>
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 900, color: t.textPrimary }}>{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Streak banner */}
        <div style={{
          background: `${t.accent}15`, border: `1.5px solid ${t.accent}45`,
          borderRadius: 10, padding: '11px 14px', marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🔥</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: t.textPrimary }}>12-Day Streak</div>
              <div style={{ fontSize: 10, color: t.textSecondary }}>Post tomorrow to keep it going</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: t.accent }}>+36</div>
            <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 700 }}>pts/day</div>
          </div>
        </div>

        {/* Active Tracks */}
        <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>ACTIVE TRACKS</div>
        {tracks.map((track, i) => (
          <div key={i} style={{
            background: t.card, border: `1.5px solid ${t.border}`,
            borderRadius: 10, padding: '14px', marginBottom: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: t.textPrimary }}>{track.name}</div>
                <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{track.guild}</div>
              </div>
              <div style={{ background: `${track.color}22`, border: `1px solid ${track.color}45`, borderRadius: 6, padding: '3px 9px' }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: track.color }}>Lvl {track.level}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary }}>{track.milestone}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: track.color }}>{track.progress}%</span>
            </div>
            <div style={{ height: 8, background: t.border, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: `${track.progress}%`, height: '100%', background: track.color, borderRadius: 4 }} />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {Array(5).fill(0).map((_, j) => (
                <div key={j} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: j < track.level ? track.color : t.border,
                  opacity: j < track.level ? 1 : 0.5,
                }} />
              ))}
            </div>
          </div>
        ))}

        {/* Achievements grid */}
        <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10, marginTop: 14 }}>ACHIEVEMENTS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          {mockAchievements.map(ach => (
            <div key={ach.id} style={{
              background: ach.earned ? `${t.primary}18` : t.card,
              border: `1.5px solid ${ach.earned ? t.primary + '50' : t.border}`,
              borderRadius: 9, padding: '12px',
              opacity: ach.earned ? 1 : 0.7,
            }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{ach.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: t.textPrimary, lineHeight: 1.25, marginBottom: 4 }}>{ach.name}</div>
              {ach.earned ? (
                <div style={{ fontSize: 10, color: t.primary, fontWeight: 700 }}>✓ Earned {ach.date}</div>
              ) : (
                <>
                  <div style={{ height: 3, background: t.border, borderRadius: 2, marginBottom: 3 }}>
                    <div style={{ width: `${(ach.progress / ach.total) * 100}%`, height: '100%', background: t.accent, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 700 }}>{ach.progress} / {ach.total}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen({ t, setActiveScreen, isDark, setIsDark }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Manrope, sans-serif' }}>

      {/* Identity card */}
      <div style={{ margin: '18px 20px 0', background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 12, padding: '18px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: -30, right: -25, width: 130, height: 130, background: t.primary, opacity: 0.07, borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 58, height: 58, borderRadius: 14, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: '#fff', flexShrink: 0, border: `2px solid ${t.accent}` }}>
            AJ
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: t.textPrimary }}>Alex Johnson</div>
            <div style={{ fontSize: 11, color: t.textSecondary }}>@alexj · member since Jan 2024</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 6, alignItems: 'center' }}>
              {['🔥', '💡', '🏔️'].map(b => <span key={b} style={{ fontSize: 15 }}>{b}</span>)}
              <span style={{ fontSize: 10, color: t.textMuted, marginLeft: 3, fontWeight: 600 }}>3 badges</span>
            </div>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display: 'flex', borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>
          {[{ label: 'Footprints', val: '23' }, { label: 'Insights', val: '47' }, { label: 'Forks Given', val: '12' }].map((s, i) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < 2 ? `1px solid ${t.border}` : 'none',
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: t.textPrimary }}>{s.val}</div>
              <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 700, letterSpacing: 0.5 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 100px' }}>

        {/* My Guilds */}
        <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>MY GUILDS</div>
        {mockGuilds.filter(g => g.mine).map(g => (
          <div key={g.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.card, border: `1.5px solid ${t.border}`,
            borderRadius: 9, padding: '11px 13px', marginBottom: 8,
          }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{g.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: t.textPrimary }}>{g.name}</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>{g.active} active today</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ height: 3, width: 56, background: t.border, borderRadius: 2, marginBottom: 3 }}>
                <div style={{ width: `${g.progress}%`, height: '100%', background: g.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 800 }}>{g.progress}%</div>
            </div>
          </div>
        ))}

        {/* Recent footprints */}
        <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10, marginTop: 16 }}>RECENT FOOTPRINTS</div>
        {mockFootprints.slice(0, 2).map(fp => (
          <div key={fp.id} style={{
            background: t.card, border: `1.5px solid ${t.border}`,
            borderRadius: 9, padding: '12px 14px', marginBottom: 8,
            display: 'flex', gap: 11,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 9,
              background: `${fp.guildColor}22`,
              border: `1px solid ${fp.guildColor}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon name={fp.type === 'screenshot' ? 'Image' : fp.type === 'voice' ? 'Mic' : 'Video'} size={16} color={fp.guildColor} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textPrimary, lineHeight: 1.3, marginBottom: 5 }}>
                {fp.title}
              </div>
              <div style={{ display: 'flex', gap: 9, fontSize: 11, color: t.textMuted, fontWeight: 600 }}>
                <span>🔥 {fp.fire}</span>
                <span>👏 {fp.clap}</span>
                <span>💬 {fp.insights}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Preferences */}
        <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10, marginTop: 16 }}>PREFERENCES</div>
        <div style={{ background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 10, overflow: 'hidden' }}>
          {[
            { label: 'Dark Mode', isToggle: true, value: isDark, action: () => setIsDark(!isDark) },
            { label: 'Notifications', icon: 'Bell', action: () => {} },
            { label: 'Privacy & Data', icon: 'Shield', action: () => {} },
            { label: 'Help & Support', icon: 'HelpCircle', action: () => {} },
          ].map((item, i) => (
            <div
              key={item.label}
              onClick={item.action}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 14px',
                borderBottom: i < 3 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary }}>{item.label}</span>
              {item.isToggle ? (
                <div style={{
                  width: 38, height: 21, borderRadius: 11,
                  background: item.value ? t.primary : t.border,
                  position: 'relative', transition: 'background 0.2s',
                }}>
                  <div style={{
                    width: 17, height: 17, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 2,
                    left: item.value ? 19 : 2,
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
              ) : (
                <Icon name="ChevronRight" size={16} color={t.textMuted} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      *::-webkit-scrollbar { display: none; }
      * { -ms-overflow-style: none; scrollbar-width: none; }
      button { outline: none; }
    `;
    document.head.appendChild(style);
    return () => { try { document.head.removeChild(style); } catch(e) {} };
  }, []);

  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    guilds: GuildsScreen,
    create: CreateScreen,
    journey: JourneyScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'guilds', label: 'Guilds', icon: 'Users' },
    { id: 'create', label: 'Create', icon: 'Plus' },
    { id: 'journey', label: 'Journey', icon: 'TrendingUp' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Manrope, sans-serif',
      padding: '20px',
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 40,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark
          ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)',
        position: 'relative',
      }}>

        {/* Screen area */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {React.createElement(screens[activeScreen], { t, setActiveScreen, isDark, setIsDark })}
        </div>

        {/* Bottom navigation */}
        <div style={{
          height: 72,
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          paddingBottom: 6,
        }}>
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            const isCreate = item.id === 'create';
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '6px 0',
                  fontFamily: 'Manrope, sans-serif',
                  position: 'relative',
                }}
              >
                {isCreate ? (
                  <>
                    <div style={{
                      width: 46, height: 46, borderRadius: 13,
                      background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: -12,
                      boxShadow: `0 4px 18px ${t.primary}70`,
                    }}>
                      <Icon name="Plus" size={22} color="#fff" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: isActive ? t.accent : t.textMuted, letterSpacing: 0.4 }}>
                      Create
                    </span>
                  </>
                ) : (
                  <>
                    {isActive && (
                      <div style={{
                        position: 'absolute', top: 4,
                        width: 18, height: 3, borderRadius: 2,
                        background: t.accent,
                      }} />
                    )}
                    <Icon name={item.icon} size={20} color={isActive ? t.accent : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span style={{ fontSize: 9, fontWeight: isActive ? 800 : 600, color: isActive ? t.accent : t.textMuted, letterSpacing: 0.4 }}>
                      {item.label}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
