const { useState, useRef } = React;

const themes = {
  light: {
    bg: '#F5F3FF',
    phoneBg: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceAlt: '#EEE9FF',
    primary: '#7C5CFC',
    primaryDk: '#6245E0',
    grad: 'linear-gradient(135deg,#7C5CFC 0%,#A855F7 100%)',
    gradH: 'linear-gradient(135deg,#6245E0 0%,#9333EA 100%)',
    faint: '#EDE9FF',
    accent: '#EC4899',
    accentFaint: '#FDE8F3',
    text: '#1A0F40',
    sub: '#6B6089',
    muted: '#C0B8D8',
    border: '#EDE9F5',
    card: '#FFFFFF',
    nav: '#FFFFFF',
    navBorder: '#EDE9F5',
    green: '#10B981',
    greenFaint: '#D1FAE5',
    amber: '#F59E0B',
    amberFaint: '#FEF3C7',
    red: '#EF4444',
    redFaint: '#FEE2E2',
    inputBg: '#F5F3FF',
    shadow: '0 4px 20px rgba(124,92,252,0.12)',
    shadow2: '0 2px 12px rgba(0,0,0,0.06)',
  },
  dark: {
    bg: '#0C0A17',
    phoneBg: '#110E1E',
    surface: '#18152A',
    surfaceAlt: '#211B38',
    primary: '#9B7EFF',
    primaryDk: '#8B6BEE',
    grad: 'linear-gradient(135deg,#9B7EFF 0%,#C084FC 100%)',
    gradH: 'linear-gradient(135deg,#8B6BEE 0%,#A855F7 100%)',
    faint: '#271E48',
    accent: '#F472B6',
    accentFaint: '#3B1930',
    text: '#EEEAFF',
    sub: '#9590B5',
    muted: '#4A4268',
    border: '#27204A',
    card: '#1C1830',
    nav: '#0F0C1C',
    navBorder: '#27204A',
    green: '#34D399',
    greenFaint: '#0A2920',
    amber: '#FBBF24',
    amberFaint: '#2B1E08',
    red: '#F87171',
    redFaint: '#2E0E0E',
    inputBg: '#18152A',
    shadow: '0 4px 20px rgba(0,0,0,0.5)',
    shadow2: '0 2px 12px rgba(0,0,0,0.4)',
  },
};

const people = [
  { id: 1, name: 'Maya Chen', ini: 'MC', color: '#7C5CFC', situation: 'Relocating to NYC', tags: ['New in NYC', 'Remote worker'], match: 94, dist: '0.3 mi', energy: 'high', mode: 'in-person', bio: 'Just moved from SF. Looking for neighborhood spots, honest restaurant recs, and friendly faces to grab coffee with.', mutuals: 2, verified: true },
  { id: 2, name: 'Jordan Lee', ini: 'JL', color: '#EC4899', situation: 'Recovering from burnout', tags: ['Tech industry', 'Need rest'], match: 88, dist: '0.7 mi', energy: 'low', mode: 'chat', bio: "Been going at full speed for 3 years. Taking a breath. Would love to talk to someone who genuinely gets it.", mutuals: 1, verified: true },
  { id: 3, name: 'Sam Rivera', ini: 'SR', color: '#10B981', situation: 'Building a side project', tags: ['Full-stack dev', 'Co-founder hunt'], match: 82, dist: '1.2 mi', energy: 'medium', mode: 'call', bio: 'Have a solid product idea and the tech skills. Looking for a design or business co-builder to go further faster.', mutuals: 0, verified: false },
  { id: 4, name: 'Priya Nair', ini: 'PN', color: '#F59E0B', situation: 'New parent, 2am mode', tags: ['3mo baby', 'Sleep deprived'], match: 79, dist: '0.5 mi', energy: 'low', mode: 'chat', bio: 'First-time mom navigating the fog. Any solidarity and practical tips welcome. No advice pressure, just honesty.', mutuals: 3, verified: true },
  { id: 5, name: 'Marcus Webb', ini: 'MW', color: '#EF4444', situation: 'Career pivot at 35', tags: ['Ex-finance', 'Learning code'], match: 73, dist: '1.8 mi', energy: 'medium', mode: 'in-person', bio: '10 years in banking, now learning React. Need mentors, accountability buddies, and a community that gets late-career change.', mutuals: 1, verified: true },
];

const circles = [
  { id: 1, name: '2am Parenting Circle', emoji: '🌙', desc: 'For parents awake at impossible hours. No judgment, just survival mode solidarity.', members: 12, max: 20, hours: 47, tags: ['Parenting', 'Support'], color: '#F59E0B', joined: true },
  { id: 2, name: 'NYC Newcomers', emoji: '🗽', desc: "Just moved? Let's swap neighborhood tips and meet for coffee or a walk around the block.", members: 34, max: 50, hours: 68, tags: ['Relocation', 'Social'], color: '#7C5CFC', joined: true },
  { id: 3, name: 'Burnout Recovery', emoji: '🌱', desc: 'A low-pressure space to step back from overwork. No hustle culture, no performance. Rest here.', members: 8, max: 15, hours: 23, tags: ['Wellness', 'Mental health'], color: '#10B981', joined: false },
  { id: 4, name: 'Side Project Saturday', emoji: '🚀', desc: 'Find your co-builder. Share progress, stay accountable, and build something real together.', members: 21, max: 30, hours: 6, tags: ['Startup', 'Collab'], color: '#EC4899', joined: false },
  { id: 5, name: 'Career Pivot Crew', emoji: '🔄', desc: 'Making a major change? Compare notes with others mid-transition and find your footing.', members: 17, max: 25, hours: 82, tags: ['Career', 'Transition'], color: '#EF4444', joined: false },
];

const boardItems = [
  { id: 1, type: 'offer', title: 'Resume review (tech roles)', user: 'Maya C.', ini: 'MC', tags: ['Career', 'Free'], dist: '0.3 mi', ago: '2h ago', color: '#7C5CFC' },
  { id: 2, type: 'request', title: 'Need a ladder for 30 min', user: 'Tom B.', ini: 'TB', tags: ['Home', 'Quick'], dist: '0.6 mi', ago: '45m ago', color: '#F59E0B' },
  { id: 3, type: 'offer', title: 'Homemade soup for anxious days', user: 'Yuki S.', ini: 'YS', tags: ['Food', 'Kindness'], dist: '1.1 mi', ago: '3h ago', color: '#10B981' },
  { id: 4, type: 'request', title: 'Interview prep buddy wanted', user: 'Carlos M.', ini: 'CM', tags: ['Career', 'Practice'], dist: '0.9 mi', ago: '1h ago', color: '#EC4899' },
  { id: 5, type: 'offer', title: 'Quiet coworking spot + coffee', user: 'Alex R.', ini: 'AR', tags: ['Work', 'Free'], dist: '0.4 mi', ago: '30m ago', color: '#6366F1' },
  { id: 6, type: 'request', title: 'Walk buddy — new to the area', user: 'Priya N.', ini: 'PN', tags: ['Social', 'Outdoors'], dist: '0.5 mi', ago: '15m ago', color: '#EF4444' },
];

const Icon = ({ name, size = 20, color = 'currentColor', sw = 2 }) => {
  const C = window.lucide && window.lucide[name];
  if (!C) return null;
  return React.createElement(C, { size, color, strokeWidth: sw });
};

function App() {
  const [tab, setTab] = useState('discover');
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState(null);
  const [energy, setEnergy] = useState('all');
  const [boardFilter, setBoardFilter] = useState('all');
  const [joinedIds, setJoinedIds] = useState([1, 2]);
  const [pressed, setPressed] = useState(null);
  const [situation, setSituation] = useState('Newly remote, exploring NYC');
  const [editSit, setEditSit] = useState(false);
  const [sitInput, setSitInput] = useState('');
  const [connected, setConnected] = useState([4]);
  const [requested, setRequested] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const t = themes[dark ? 'dark' : 'light'];

  const tap = (id, fn) => {
    setPressed(id);
    setTimeout(() => { setPressed(null); fn && fn(); }, 160);
  };

  // ── Sub-components ──────────────────────────────────────────────

  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
    </div>
  );

  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 24px 6px', height: 20 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: t.text, letterSpacing: 0.2 }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Icon name="Wifi" size={13} color={t.text} sw={2.5} />
        <Icon name="Signal" size={13} color={t.text} sw={2.5} />
        <Icon name="Battery" size={15} color={t.text} sw={2.5} />
      </div>
    </div>
  );

  const Avatar = ({ ini, color, size = 40, ring = false }) => (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color || t.primary,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.33, fontWeight: 800,
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      ...(ring ? { outline: `3px solid ${t.primary}`, outlineOffset: 2 } : {}),
    }}>{ini}</div>
  );

  const Chip = ({ label, bg, color }) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: 20,
      fontSize: 11, fontWeight: 600,
      background: bg || t.faint, color: color || t.primary,
    }}>{label}</span>
  );

  const MatchBadge = ({ pct }) => (
    <div style={{
      padding: '3px 9px', borderRadius: 20,
      background: t.grad, color: '#fff',
      fontSize: 11, fontWeight: 700, flexShrink: 0,
    }}>{pct}% match</div>
  );

  const EnergyPip = ({ level }) => {
    const c = { low: '#F59E0B', medium: '#10B981', high: '#7C5CFC' }[level] || t.muted;
    return <div style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />;
  };

  // ── Circle Card ──────────────────────────────────────────────────

  const CircleCard = ({ c }) => {
    const joined = joinedIds.includes(c.id);
    const pct = Math.round((c.members / c.max) * 100);
    const urgent = c.hours <= 12;
    return (
      <div style={{
        background: t.card, borderRadius: 20, padding: 16,
        border: `1px solid ${t.border}`, boxShadow: t.shadow2,
        transform: pressed === `circ-${c.id}` ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.15s',
      }} onMouseDown={() => setPressed(`circ-${c.id}`)} onMouseUp={() => setPressed(null)}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14, flexShrink: 0,
            background: `${c.color}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>{c.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: t.text, flex: 1, marginRight: 8, lineHeight: 1.3 }}>{c.name}</span>
              {urgent
                ? <span style={{ fontSize: 10, fontWeight: 700, color: t.red, background: dark ? t.redFaint : '#FEE2E2', padding: '2px 7px', borderRadius: 20, flexShrink: 0 }}>⏱ {c.hours}h</span>
                : <span style={{ fontSize: 11, color: t.sub, flexShrink: 0 }}>{c.hours}h left</span>
              }
            </div>
            <div style={{ fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.5 }}>{c.desc}</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
              {c.tags.map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: `${c.color}18`, color: c.color }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 5, borderRadius: 4, background: t.surfaceAlt, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${c.color},${c.color}99)`, borderRadius: 4, transition: 'width 0.4s' }} />
              </div>
              <span style={{ fontSize: 11, color: t.sub, flexShrink: 0 }}>{c.members}/{c.max} members</span>
            </div>
            <button onClick={() => { joined ? setJoinedIds(j => j.filter(id => id !== c.id)) : setJoinedIds(j => [...j, c.id]); }} style={{
              padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: joined ? t.surfaceAlt : t.grad,
              color: joined ? t.sub : '#fff',
              fontSize: 12, fontWeight: 700,
              transform: pressed === `join-${c.id}` ? 'scale(0.92)' : 'scale(1)',
              transition: 'transform 0.15s, background 0.2s',
            }} onMouseDown={() => setPressed(`join-${c.id}`)} onMouseUp={() => setPressed(null)}>
              {joined ? 'Leave circle' : 'Join circle'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── Screens ──────────────────────────────────────────────────────

  const DiscoverScreen = () => {
    const filtered = people.filter(p => energy === 'all' || p.energy === energy);
    const energyOpts = [
      { id: 'all', label: 'All' },
      { id: 'low', label: 'Low energy' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High energy' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 12px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 8, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: t.text }}>Hi, Alex</div>
            <div style={{ fontSize: 13, color: t.sub, marginTop: 1 }}>3 new matches nearby</div>
          </div>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => tap('notif')}>
            <div style={{
              width: 40, height: 40, borderRadius: 14, background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${t.border}`,
              transform: pressed === 'notif' ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.15s',
            }}>
              <Icon name="Bell" size={18} color={t.sub} />
            </div>
            <div style={{
              position: 'absolute', top: -4, right: -4,
              width: 18, height: 18, borderRadius: '50%',
              background: t.accent, color: '#fff',
              fontSize: 10, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>3</div>
          </div>
        </div>

        {/* Situation pill */}
        <div style={{
          background: dark ? t.faint : `linear-gradient(135deg,${t.faint},#F9F7FF)`,
          borderRadius: 16, padding: '12px 14px', marginBottom: 16,
          border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
        }} onClick={() => { setSitInput(situation); setEditSit(true); }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12, flexShrink: 0,
            background: t.grad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="Target" size={16} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: t.sub, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 2 }}>Your situation</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{situation}</div>
          </div>
          <Icon name="Pencil" size={14} color={t.primary} />
        </div>

        {/* Energy filters */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }}>
          {energyOpts.map(e => (
            <button key={e.id} onClick={() => setEnergy(e.id)} style={{
              padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', flexShrink: 0,
              background: energy === e.id ? t.primary : t.surfaceAlt,
              color: energy === e.id ? '#fff' : t.sub,
              fontSize: 12, fontWeight: 600,
              transition: 'all 0.15s',
            }}>{e.label}</button>
          ))}
        </div>

        {/* People cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => setSelected(p)} style={{
              background: t.card, borderRadius: 20, padding: 16,
              border: `1px solid ${t.border}`, boxShadow: t.shadow2, cursor: 'pointer',
              transform: pressed === `p-${p.id}` ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s',
            }} onMouseDown={() => setPressed(`p-${p.id}`)} onMouseUp={() => setPressed(null)}>
              <div style={{ display: 'flex', gap: 12 }}>
                <Avatar ini={p.ini} color={p.color} size={48} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{p.name}</span>
                      {p.verified && <Icon name="BadgeCheck" size={14} color={t.primary} />}
                    </div>
                    <MatchBadge pct={p.match} />
                  </div>
                  <div style={{ fontSize: 12, color: t.sub, marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>{p.situation}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                    {p.tags.map(tag => <Chip key={tag} label={tag} />)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="MapPin" size={11} color={t.sub} />
                      <span style={{ fontSize: 11, color: t.sub }}>{p.dist}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <EnergyPip level={p.energy} />
                      <span style={{ fontSize: 11, color: t.sub }}>{p.energy}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name={p.mode === 'chat' ? 'MessageCircle' : p.mode === 'call' ? 'Phone' : 'Users'} size={11} color={t.sub} />
                      <span style={{ fontSize: 11, color: t.sub }}>{p.mode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CirclesScreen = () => {
    const mine = circles.filter(c => joinedIds.includes(c.id));
    const nearby = circles.filter(c => !joinedIds.includes(c.id));
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: t.text }}>Circles</div>
            <div style={{ fontSize: 13, color: t.sub, marginTop: 1 }}>Time-limited groups near you</div>
          </div>
          <button onClick={() => setShowCreate(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: t.grad, color: '#fff', fontSize: 12, fontWeight: 700,
            transform: pressed === 'newcirc' ? 'scale(0.92)' : 'scale(1)', transition: 'transform 0.15s',
          }} onMouseDown={() => setPressed('newcirc')} onMouseUp={() => setPressed(null)}>
            <Icon name="Plus" size={14} color="#fff" /> Create
          </button>
        </div>

        {mine.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 800, color: t.sub, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Your active circles</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {mine.map(c => <CircleCard key={c.id} c={c} />)}
            </div>
          </>
        )}
        <div style={{ fontSize: 11, fontWeight: 800, color: t.sub, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Nearby circles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {nearby.map(c => <CircleCard key={c.id} c={c} />)}
        </div>
      </div>
    );
  };

  const BoardScreen = () => {
    const filtered = boardItems.filter(b => boardFilter === 'all' || b.type === boardFilter);
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: t.text }}>Kindness Board</div>
            <div style={{ fontSize: 13, color: t.sub, marginTop: 1 }}>Local offers & requests</div>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: t.grad, color: '#fff', fontSize: 12, fontWeight: 700,
          }}>
            <Icon name="Plus" size={14} color="#fff" /> Post
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['all', 'offer', 'request'].map(f => (
            <button key={f} onClick={() => setBoardFilter(f)} style={{
              padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: boardFilter === f ? t.primary : t.surfaceAlt,
              color: boardFilter === f ? '#fff' : t.sub,
              fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
            }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(b => (
            <div key={b.id} style={{
              background: t.card, borderRadius: 20, padding: 14,
              border: `1px solid ${t.border}`, boxShadow: t.shadow2, cursor: 'pointer',
              transform: pressed === `b-${b.id}` ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s',
            }} onMouseDown={() => setPressed(`b-${b.id}`)} onMouseUp={() => setPressed(null)}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Avatar ini={b.ini} color={b.color} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: t.text, flex: 1, marginRight: 8, lineHeight: 1.3 }}>{b.title}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 800,
                      padding: '2px 8px', borderRadius: 20, flexShrink: 0,
                      background: b.type === 'offer' ? (dark ? t.greenFaint : '#D1FAE5') : (dark ? t.amberFaint : '#FEF3C7'),
                      color: b.type === 'offer' ? t.green : t.amber,
                    }}>{b.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: t.sub, marginBottom: 8, fontWeight: 500 }}>{b.user}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                    {b.tags.map(tag => <Chip key={tag} label={tag} bg={`${b.color}18`} color={b.color} />)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Icon name="MapPin" size={11} color={t.sub} />
                      <span style={{ fontSize: 11, color: t.sub }}>{b.dist}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Icon name="Clock" size={11} color={t.sub} />
                      <span style={{ fontSize: 11, color: t.sub }}>{b.ago}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProfileScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 12px' }}>
      <div style={{ paddingTop: 8, marginBottom: 6 }}>
        {/* Profile card */}
        <div style={{
          background: dark ? t.faint : `linear-gradient(135deg,#EDE9FF,#FDE8F3)`,
          borderRadius: 22, padding: 20, marginBottom: 14,
          border: `1px solid ${t.border}`,
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
            <div style={{ position: 'relative' }}>
              <Avatar ini="AX" color={t.primary} size={66} ring />
              <div style={{
                position: 'absolute', bottom: 1, right: 1,
                width: 16, height: 16, borderRadius: '50%',
                background: t.green, border: `2px solid ${t.phoneBg}`,
              }} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Alex Rivera</div>
              <div style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>SoHo, NYC  ·  Joined Mar 2026</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
                <span style={{ fontSize: 12, color: t.primary, fontWeight: 700 }}>4 vouches</span>
                <span style={{ fontSize: 12, color: t.sub }}>2 circles</span>
                <span style={{ fontSize: 12, color: t.sub }}>4.8 trust</span>
              </div>
            </div>
          </div>
          <div style={{
            background: t.card, borderRadius: 12, padding: '10px 14px',
            border: `1px solid ${t.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
          }} onClick={() => { setSitInput(situation); setEditSit(true); }}>
            <div>
              <div style={{ fontSize: 10, color: t.sub, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>Current situation</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{situation}</div>
            </div>
            <Icon name="Pencil" size={14} color={t.primary} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          {[['12', 'Connections'], ['2', 'Circles'], ['4.8★', 'Trust']].map(([val, lbl]) => (
            <div key={lbl} style={{
              flex: 1, background: t.card, borderRadius: 16, padding: '12px 8px',
              border: `1px solid ${t.border}`, textAlign: 'center',
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.primary, marginBottom: 2 }}>{val}</div>
              <div style={{ fontSize: 11, color: t.sub, fontWeight: 600 }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Settings rows */}
        {[
          { icon: 'Moon', label: 'Dark mode', action: () => setDark(d => !d), toggle: true, val: dark },
          { icon: 'Bell', label: 'Notifications', right: 'On' },
          { icon: 'MapPin', label: 'Location radius', right: '2 mi' },
          { icon: 'Shield', label: 'Trust & privacy' },
          { icon: 'Bookmark', label: 'Saved situations' },
          { icon: 'HelpCircle', label: 'Help & feedback' },
          { icon: 'LogOut', label: 'Sign out', danger: true },
        ].map(item => (
          <div key={item.label} onClick={item.action} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 0', borderBottom: `1px solid ${t.border}`,
            cursor: 'pointer',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 11,
              background: item.danger ? (dark ? t.redFaint : '#FEE2E2') : t.faint,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={item.icon} size={16} color={item.danger ? t.red : t.primary} />
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: item.danger ? t.red : t.text }}>{item.label}</span>
            {item.toggle ? (
              <div style={{
                width: 44, height: 24, borderRadius: 12,
                background: item.val ? t.primary : t.muted,
                position: 'relative', transition: 'background 0.3s',
              }}>
                <div style={{
                  position: 'absolute', top: 3, left: item.val ? 23 : 3,
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }} />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {item.right && <span style={{ fontSize: 13, color: t.sub }}>{item.right}</span>}
                {!item.danger && <Icon name="ChevronRight" size={16} color={t.muted} />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ── Overlays ──────────────────────────────────────────────────────

  const PersonSheet = ({ p }) => {
    const isConn = connected.includes(p.id);
    const isReq = requested.includes(p.id);
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 40,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        borderRadius: 'inherit',
      }} onClick={() => setSelected(null)}>
        <div style={{
          background: t.surface,
          borderRadius: '26px 26px 0 0',
          padding: '0 18px 88px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
          maxHeight: '82%', overflowY: 'auto',
        }} onClick={e => e.stopPropagation()}>
          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 10px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 3, background: t.muted }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <button onClick={() => setSelected(null)} style={{
              background: t.surfaceAlt, border: 'none', cursor: 'pointer',
              width: 30, height: 30, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="X" size={14} color={t.sub} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
            <Avatar ini={p.ini} color={p.color} size={62} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: t.text }}>{p.name}</span>
                {p.verified && <Icon name="BadgeCheck" size={16} color={t.primary} />}
              </div>
              <div style={{ fontSize: 13, color: t.sub, marginBottom: 6 }}>{p.situation}</div>
              <MatchBadge pct={p.match} />
            </div>
          </div>
          <div style={{
            background: t.surfaceAlt, borderRadius: 16, padding: 14,
            border: `1px solid ${t.border}`, marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.65 }}>{p.bio}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {[
              { label: 'Energy', val: p.energy },
              { label: 'Prefers', val: p.mode },
              { label: 'Distance', val: p.dist },
              ...(p.mutuals > 0 ? [{ label: 'Mutuals', val: `${p.mutuals}` }] : []),
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: t.surfaceAlt, borderRadius: 14, padding: '9px 6px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, color: t.sub, fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: s.label === 'Mutuals' ? t.primary : t.text, textTransform: 'capitalize' }}>{s.val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              flex: 1, padding: 14, borderRadius: 18, border: 'none', cursor: 'pointer',
              background: isConn ? t.green : isReq ? t.surfaceAlt : t.grad,
              color: isConn || isReq ? (isConn ? '#fff' : t.sub) : '#fff',
              fontSize: 14, fontWeight: 700, transition: 'all 0.2s',
            }} onClick={() => { if (!isConn && !isReq) setRequested(r => [...r, p.id]); }}>
              {isConn ? '✓ Connected' : isReq ? 'Request sent' : 'Connect'}
            </button>
            <button style={{
              width: 50, height: 50, borderRadius: 18, border: `1px solid ${t.border}`,
              background: t.surfaceAlt, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="MessageCircle" size={20} color={t.primary} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditSituationSheet = () => (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      borderRadius: 'inherit',
    }} onClick={() => setEditSit(false)}>
      <div style={{
        background: t.surface,
        borderRadius: '26px 26px 0 0',
        padding: '20px 18px 40px',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ width: 36, height: 4, borderRadius: 3, background: t.muted }} />
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 4 }}>Update your situation</div>
        <div style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>What are you going through right now?</div>
        <input
          value={sitInput}
          onChange={e => setSitInput(e.target.value)}
          placeholder="e.g. Relocating to a new city..."
          style={{
            width: '100%', padding: '13px 16px', borderRadius: 14,
            border: `2px solid ${t.primary}`, outline: 'none',
            background: t.inputBg, color: t.text,
            fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14, marginBottom: 18 }}>
          {['New in the city', 'Career change', 'New parent', 'Burnout recovery', 'Starting a project', 'Going through a loss', 'Learning something new'].map(s => (
            <button key={s} onClick={() => setSitInput(s)} style={{
              padding: '6px 12px', borderRadius: 20,
              border: `1.5px solid ${sitInput === s ? t.primary : t.border}`,
              background: sitInput === s ? t.faint : t.surfaceAlt,
              color: sitInput === s ? t.primary : t.sub,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setEditSit(false)} style={{
            flex: 1, padding: 14, borderRadius: 16,
            border: `1px solid ${t.border}`, background: t.surfaceAlt,
            color: t.sub, fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Cancel</button>
          <button onClick={() => { setSituation(sitInput); setEditSit(false); }} style={{
            flex: 2, padding: 14, borderRadius: 16, border: 'none',
            background: t.grad, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Update</button>
        </div>
      </div>
    </div>
  );

  const CreateCircleSheet = () => (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      borderRadius: 'inherit',
    }} onClick={() => setShowCreate(false)}>
      <div style={{
        background: t.surface, borderRadius: '26px 26px 0 0',
        padding: '20px 18px 44px',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ width: 36, height: 4, borderRadius: 3, background: t.muted }} />
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 4 }}>Create a circle</div>
        <div style={{ fontSize: 13, color: t.sub, marginBottom: 18 }}>Start a time-limited group for a specific need</div>
        {[
          { label: 'Circle name', placeholder: 'e.g. Job hunt prep group' },
          { label: 'Description', placeholder: 'What will people talk about or do together?' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.sub, marginBottom: 6 }}>{f.label}</div>
            <input placeholder={f.placeholder} style={{
              width: '100%', padding: '12px 14px', borderRadius: 14,
              border: `1.5px solid ${t.border}`, outline: 'none',
              background: t.inputBg, color: t.text, fontSize: 13, fontFamily: 'inherit',
              boxSizing: 'border-box',
            }} />
          </div>
        ))}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.sub, marginBottom: 8 }}>Duration</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['24h', '48h', '72h', '1 week'].map(d => (
              <button key={d} style={{
                flex: 1, padding: '8px 0', borderRadius: 12,
                border: `1.5px solid ${d === '48h' ? t.primary : t.border}`,
                background: d === '48h' ? t.faint : t.surfaceAlt,
                color: d === '48h' ? t.primary : t.sub,
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>{d}</button>
            ))}
          </div>
        </div>
        <button onClick={() => setShowCreate(false)} style={{
          width: '100%', padding: 15, borderRadius: 18, border: 'none',
          background: t.grad, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer',
        }}>Create circle</button>
      </div>
    </div>
  );

  // ── Bottom nav ────────────────────────────────────────────────────

  const navItems = [
    { id: 'discover', icon: 'Compass', label: 'Discover' },
    { id: 'circles', icon: 'Users', label: 'Circles' },
    { id: 'board', icon: 'Heart', label: 'Board' },
    { id: 'profile', icon: 'User', label: 'Me' },
  ];

  const renderScreen = () => {
    switch (tab) {
      case 'discover': return <DiscoverScreen />;
      case 'circles': return <CirclesScreen />;
      case 'board': return <BoardScreen />;
      case 'profile': return <ProfileScreen />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { background: #DDD8F0; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        input, button { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div style={{
        width: 375, height: 812,
        background: dark ? '#110E1E' : '#FFFFFF',
        borderRadius: 50, overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(0,0,0,0.12)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <DynamicIsland />
        <StatusBar />

        {/* Screen */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', background: dark ? '#0C0A17' : '#F8F6FF' }}>
          {renderScreen()}

          {/* Overlays */}
          {selected && <PersonSheet p={selected} />}
          {editSit && <EditSituationSheet />}
          {showCreate && <CreateCircleSheet />}
        </div>

        {/* Bottom nav */}
        <div style={{
          display: 'flex',
          background: dark ? '#0F0C1C' : '#FFFFFF',
          borderTop: `1px solid ${dark ? '#27204A' : '#EDE9F5'}`,
          padding: '8px 4px 20px',
        }}>
          {navItems.map(item => {
            const active = tab === item.id;
            return (
              <button key={item.id} onClick={() => setTab(item.id)} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 3,
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                transform: pressed === `nav-${item.id}` ? 'scale(0.84)' : 'scale(1)',
                transition: 'transform 0.15s',
              }} onMouseDown={() => setPressed(`nav-${item.id}`)} onMouseUp={() => setPressed(null)}>
                <div style={{
                  width: active ? 44 : 34, height: 30,
                  borderRadius: 20,
                  background: active ? (dark ? '#271E48' : '#EDE9FF') : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <Icon name={item.icon} size={20} color={active ? (dark ? '#9B7EFF' : '#7C5CFC') : (dark ? '#4A4268' : '#C0B8D8')} sw={active ? 2.5 : 2} />
                </div>
                <span style={{
                  fontSize: 10, fontWeight: active ? 800 : 500,
                  color: active ? (dark ? '#9B7EFF' : '#7C5CFC') : (dark ? '#4A4268' : '#C0B8D8'),
                  transition: 'color 0.2s',
                }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
