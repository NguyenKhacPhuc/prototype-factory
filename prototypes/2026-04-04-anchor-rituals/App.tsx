const { useState, useEffect, useRef } = React;

const THEMES = {
  dark: {
    bg: '#181A16', surf: '#212420', surfAlt: '#292D26',
    border: '#363B31', text: '#EDE8DB', sub: '#A8A090',
    muted: '#686460', accent: '#C8A05C', green: '#527A47',
    greenMid: '#3E5E36', greenDim: '#243022', slate: '#6A7880',
    tag: '#2A2F28', red: '#C05050',
  },
  light: {
    bg: '#F5F0E4', surf: '#EAE4D4', surfAlt: '#E0D9C8',
    border: '#C4B8A4', text: '#1C1E18', sub: '#5C5A52',
    muted: '#8C8A80', accent: '#8A5E28', green: '#3A6030',
    greenMid: '#C8DABB', greenDim: '#DDF0D4', slate: '#586870',
    tag: '#D8D0C0', red: '#A03030',
  }
};

const avatarColors = ['#527A47','#C8A05C','#6A7880','#8A5E28','#4A5E7A','#7A5A4A'];

const Icon = ({ name, size = 18, color, sw = 1.5 }) => {
  const C = window.lucide?.[name];
  if (!C) return null;
  return React.createElement(C, { size, color, strokeWidth: sw });
};

const Avatar = ({ letter, bg, size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.38, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
    {letter}
  </div>
);

function HomeScreen({ t, setActiveScreen, isDark, setIsDark }) {
  return (
    <div style={{ padding: '28px 24px 16px', color: t.text }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.muted, marginBottom: 5 }}>Saturday, April 4</div>
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.15 }}>Good morning,<br /><span style={{ color: t.accent }}>Alex.</span></div>
        </div>
        <button onClick={() => setIsDark(!isDark)} style={{ background: t.surfAlt, border: `1px solid ${t.border}`, borderRadius: 20, padding: '7px 11px', color: t.sub, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name={isDark ? 'Sun' : 'Moon'} size={13} color={t.accent} />
        </button>
      </div>

      {/* Asymmetric stats strip with left accent bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingLeft: 14, borderLeft: `3px solid ${t.green}` }}>
        {[['14','Day Streak'],['42','Hours'],['28','Circles']].map(([val, label], i) => (
          <React.Fragment key={i}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color: t.text }}>{val}</div>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.muted }}>{label}</div>
            </div>
            {i < 2 && <div style={{ width: 1, height: 34, background: t.border }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.muted, marginBottom: 10 }}>Next circle</div>

      {/* Featured circle card — asymmetric, editorial */}
      <div onClick={() => setActiveScreen('live')} style={{ background: t.greenDim, border: `1px solid ${t.greenMid}`, borderRadius: 14, padding: '20px', marginBottom: 24, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -24, right: -24, width: 110, height: 110, borderRadius: '50%', background: t.green, opacity: 0.12 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.25, marginBottom: 3 }}>Dawn Writers Circle</div>
            <div style={{ fontSize: 11, color: t.sub, fontStyle: 'italic', marginBottom: 12 }}>Morning Writers Guild</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, background: t.tag, color: t.sub, padding: '3px 8px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Icon name="Clock" size={9} color={t.muted} /> 7:00 AM · 30 min
              </span>
              <span style={{ fontSize: 10, background: t.tag, color: t.accent, padding: '3px 8px', borderRadius: 20 }}>2 spots left</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: t.green, lineHeight: 1 }}>6:48</div>
            <div style={{ fontSize: 9, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>starts in</div>
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 5 }}>
          {['A','M','R','J'].map((l, i) => <Avatar key={i} letter={l} bg={avatarColors[i]} size={26} />)}
          <span style={{ fontSize: 11, color: t.sub, marginLeft: 6 }}>+2 joining</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.muted }}>My rituals</div>
        <span style={{ fontSize: 11, color: t.accent, cursor: 'pointer' }}>Manage</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { name: 'Morning Pages', dur: '30 min', icon: 'PenLine', done: true },
          { name: 'Spanish Study', dur: '45 min', icon: 'BookOpen', done: false },
          { name: 'Breath & Stillness', dur: '15 min', icon: 'Wind', done: false },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: t.surf, border: `1px solid ${t.border}`, borderRadius: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: r.done ? t.greenMid : t.surfAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={r.done ? 'Check' : r.icon} size={14} color={r.done ? t.green : t.sub} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: r.done ? t.muted : t.text }}>{r.name}</div>
              <div style={{ fontSize: 10, color: t.muted }}>{r.dur}</div>
            </div>
            {r.done && <span style={{ fontSize: 9, color: t.green, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Done</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreScreen({ t, setActiveScreen }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Writing', 'Meditation', 'Focus', 'Art', 'Learning'];
  const circles = [
    { name: 'Dawn Writers Circle', time: '7:00 AM', dur: 30, spots: 2, guild: 'Morning Writers Guild', type: 'Writing', live: true },
    { name: 'Deep Work Session', time: '9:00 AM', dur: 60, spots: 1, guild: 'Deep Work Druids', type: 'Focus', live: false },
    { name: 'Midday Breath Circle', time: '12:00 PM', dur: 15, spots: 3, guild: 'Stillness Seekers', type: 'Meditation', live: false },
    { name: 'Evening Sketchers', time: '7:30 PM', dur: 45, spots: 0, guild: 'Visual Arts Atelier', type: 'Art', live: false },
    { name: 'Language Lab', time: '8:00 PM', dur: 30, spots: 4, guild: 'Polyglot Society', type: 'Learning', live: false },
    { name: 'Night Writers', time: '10:00 PM', dur: 30, spots: 5, guild: 'Morning Writers Guild', type: 'Writing', live: false },
  ];
  const filtered = filter === 'All' ? circles : circles.filter(c => c.type === filter);

  return (
    <div style={{ color: t.text }}>
      {/* Asymmetric editorial header with large bg number */}
      <div style={{ padding: '28px 24px 0', position: 'relative', marginBottom: 4 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.muted, marginBottom: 6 }}>Today's Sessions</div>
        <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.1, marginBottom: 4 }}>Ritual<br /><span style={{ fontStyle: 'italic', color: t.accent }}>Circles.</span></div>
        <div style={{ position: 'absolute', top: 24, right: 20, fontSize: 80, fontWeight: 700, color: t.border, opacity: 0.45, lineHeight: 1, userSelect: 'none' }}>{filtered.length}</div>
      </div>

      <div style={{ padding: '12px 24px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 20, border: `1px solid ${filter === f ? t.accent : t.border}`, background: filter === f ? t.accent : 'transparent', color: filter === f ? t.bg : t.sub, fontSize: 11, cursor: 'pointer' }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 24px 16px' }}>
        {filtered.map((c, i) => (
          <div key={i} onClick={() => c.live && setActiveScreen('live')} style={{ padding: '16px 0', borderBottom: `1px solid ${t.border}`, cursor: c.live ? 'pointer' : 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, paddingRight: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  {c.live && <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.red, display: 'inline-block', flexShrink: 0 }} />}
                  <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{c.name}</span>
                </div>
                <div style={{ fontSize: 11, color: t.muted, fontStyle: 'italic', marginBottom: 8 }}>{c.guild}</div>
                <div style={{ display: 'flex', gap: 5 }}>
                  <span style={{ fontSize: 10, color: t.sub, background: t.tag, padding: '2px 7px', borderRadius: 10 }}>{c.type}</span>
                  <span style={{ fontSize: 10, color: t.sub, background: t.tag, padding: '2px 7px', borderRadius: 10 }}>{c.dur} min</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 4 }}>{c.time}</div>
                <div style={{ fontSize: 11, color: c.spots === 0 ? t.muted : t.accent }}>{c.spots === 0 ? 'Full' : `${c.spots} spots`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveScreen({ t, setActiveScreen }) {
  const [elapsed, setElapsed] = useState(847);
  const [showReflect, setShowReflect] = useState(false);
  const [reflectText, setReflectText] = useState('');

  useEffect(() => {
    if (!showReflect) {
      const iv = setInterval(() => setElapsed(e => e + 1), 1000);
      return () => clearInterval(iv);
    }
  }, [showReflect]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const progress = Math.min(elapsed / 1800, 1);
  const participants = [
    { l: 'A', n: 'Aiden' }, { l: 'M', n: 'Maya' }, { l: 'R', n: 'Rumi' },
    { l: 'J', n: 'Jess' }, { l: 'K', n: 'Kai' }, { l: 'Y', n: 'You' },
  ];

  if (showReflect) return (
    <div style={{ padding: '40px 24px', color: t.text, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.muted, marginBottom: 8 }}>Post-ritual reflection</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25 }}>Dawn Writers Circle</div>
        <div style={{ fontSize: 12, color: t.sub, fontStyle: 'italic', marginTop: 4 }}>30 minutes · completed</div>
      </div>
      <div style={{ background: t.surf, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, color: t.sub, fontStyle: 'italic', lineHeight: 1.65, marginBottom: 14 }}>
          "What emerged in your writing today that surprised you?"
        </div>
        <textarea value={reflectText} onChange={e => setReflectText(e.target.value)} placeholder="Write freely for a moment..." style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 13, lineHeight: 1.75, resize: 'none', height: 90, boxSizing: 'border-box' }} />
      </div>
      <div style={{ background: t.greenDim, border: `1px solid ${t.greenMid}`, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="Flame" size={18} color={t.accent} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>15-day streak unlocked!</div>
          <div style={{ fontSize: 11, color: t.sub }}>You've earned "Devoted Practitioner"</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => { setShowReflect(false); setActiveScreen('profile'); }} style={{ flex: 1, padding: '13px', background: t.green, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          <span>Save & Finish</span>
        </button>
        <button onClick={() => { setShowReflect(false); setActiveScreen('home'); }} style={{ padding: '13px 16px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 10, color: t.sub, fontSize: 14, cursor: 'pointer' }}>
          <span>Skip</span>
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '28px 0 0', color: t.text }}>
      <div style={{ padding: '0 24px', marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.muted }}>Live now</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>Dawn Writers Circle</div>
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: t.red, background: t.red + '18', padding: '4px 9px', borderRadius: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.red, display: 'inline-block' }} />
            Live
          </span>
        </div>
      </div>

      {/* Timer — large editorial centered */}
      <div style={{ textAlign: 'center', padding: '4px 24px 16px' }}>
        <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: '-3px', lineHeight: 1, color: t.text }}>{fmt(elapsed)}</div>
        <div style={{ fontSize: 10, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 5 }}>of 30:00 · morning pages</div>
        <div style={{ height: 2, background: t.border, borderRadius: 2, marginTop: 14 }}>
          <div style={{ height: '100%', width: `${progress * 100}%`, background: t.green, borderRadius: 2, transition: 'width 1s linear' }} />
        </div>
      </div>

      {/* Participant 3x2 grid */}
      <div style={{ padding: '8px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {participants.map((p, i) => (
          <div key={i} style={{ background: t.surf, border: `1px solid ${t.border}`, borderRadius: 10, padding: '14px 8px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative' }}>
            <Avatar letter={p.l} bg={avatarColors[i]} size={40} />
            <div style={{ fontSize: 11, color: i === 5 ? t.accent : t.sub, fontWeight: i === 5 ? 600 : 400 }}>{p.n}</div>
            <div style={{ position: 'absolute', top: 7, right: 7 }}><Icon name="MicOff" size={10} color={t.muted} /></div>
          </div>
        ))}
      </div>

      <div style={{ margin: '0 20px 16px', padding: '11px 16px', background: t.surfAlt, border: `1px solid ${t.border}`, borderRadius: 10, borderLeft: `3px solid ${t.accent}` }}>
        <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.muted, marginBottom: 3 }}>Your ritual</div>
        <div style={{ fontSize: 13, color: t.text, fontStyle: 'italic' }}>Morning Pages · unfiltered stream-of-consciousness</div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', gap: 10 }}>
        <button onClick={() => setShowReflect(true)} style={{ flex: 1, padding: '13px', background: t.green, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          <span>Complete Ritual</span>
        </button>
        <button style={{ padding: '13px 16px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 10, color: t.sub, cursor: 'pointer' }}>
          <Icon name="LogOut" size={16} color={t.muted} />
        </button>
      </div>
    </div>
  );
}

function GuildsScreen({ t, setActiveScreen }) {
  const guilds = [
    { name: 'Morning Writers Guild', arch: 'The Chroniclers', members: 847, active: 23, color: '#C8A05C', joined: true, quote: 'We gather at dawn to fill blank pages with intention.' },
    { name: 'Deep Work Druids', arch: 'The Focused', members: 1203, active: 45, color: '#527A47', joined: true },
    { name: 'Stillness Seekers', arch: 'The Present', members: 634, active: 18, color: '#6A7880', joined: false },
    { name: 'Visual Arts Atelier', arch: 'The Makers', members: 412, active: 11, color: '#8A5E28', joined: false },
    { name: 'Polyglot Society', arch: 'The Wanderers', members: 589, active: 34, color: '#5A4A7A', joined: false },
  ];

  return (
    <div style={{ color: t.text, paddingBottom: 16 }}>
      {/* Asymmetric editorial header — two columns */}
      <div style={{ padding: '28px 24px 20px', display: 'grid', gridTemplateColumns: '1fr 72px', gap: 12, alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.muted, marginBottom: 6 }}>Communities</div>
          <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.1 }}>Guilds &<br /><span style={{ fontStyle: 'italic', color: t.accent }}>Archetypes.</span></div>
          <div style={{ fontSize: 12, color: t.sub, marginTop: 8, lineHeight: 1.6 }}>Find your circle of deliberate practitioners.</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: t.text, lineHeight: 1 }}>5</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.muted }}>Guilds<br />active</div>
        </div>
      </div>

      {/* Featured guild — full-width editorial block */}
      <div style={{ margin: '0 24px 16px', background: t.surf, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ height: 5, background: guilds[0].color }} />
        <div style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.muted, marginBottom: 4 }}>Featured guild</div>
              <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{guilds[0].name}</div>
              <div style={{ fontSize: 11, color: t.sub, fontStyle: 'italic', marginTop: 2 }}>{guilds[0].arch}</div>
            </div>
            <div style={{ background: guilds[0].color + '22', border: `1px solid ${guilds[0].color}44`, borderRadius: 20, padding: '4px 10px' }}>
              <span style={{ fontSize: 10, color: guilds[0].color }}>Joined</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: t.sub, fontStyle: 'italic', lineHeight: 1.65, marginBottom: 14 }}>"{guilds[0].quote}"</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div><div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{guilds[0].members.toLocaleString()}</div><div style={{ fontSize: 9, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Members</div></div>
            <div><div style={{ fontSize: 20, fontWeight: 700, color: t.green }}>{guilds[0].active}</div><div style={{ fontSize: 9, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active now</div></div>
          </div>
        </div>
      </div>

      {/* Asymmetric two-column grid (wider left) */}
      <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 10 }}>
        {guilds.slice(1).map((g, i) => (
          <div key={i} style={{ background: t.surf, border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 4, background: g.color }} />
            <div style={{ padding: '12px 12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 3 }}>{g.name}</div>
              <div style={{ fontSize: 10, color: t.sub, fontStyle: 'italic', marginBottom: 10 }}>{g.arch}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{g.members}</div><div style={{ fontSize: 9, color: t.muted, textTransform: 'uppercase' }}>members</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: 15, fontWeight: 700, color: t.green }}>{g.active}</div><div style={{ fontSize: 9, color: t.muted, textTransform: 'uppercase' }}>active</div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ t }) {
  const milestones = [
    { name: 'First Circle', desc: 'Attended your first Ritual Circle', earned: true, date: 'Mar 21', icon: 'Star' },
    { name: 'Seven Days', desc: 'Completed a 7-day practice streak', earned: true, date: 'Mar 28', icon: 'Flame' },
    { name: 'Devoted Practitioner', desc: '15 consecutive days of practice', earned: false, date: null, icon: 'Award' },
    { name: 'Guild Elder', desc: 'Complete 50 circles in one guild', earned: false, date: null, icon: 'Crown' },
  ];
  const reflections = [
    { date: 'Apr 3', circle: 'Dawn Writers Circle', entry: 'Found a metaphor I\'d been searching for weeks. The silence helped me hear it.' },
    { date: 'Apr 2', circle: 'Deep Work Session', entry: 'Eight out of ten for focus. The shared presence grounded me.' },
    { date: 'Apr 1', circle: 'Midday Breath Circle', entry: 'Released the morning\'s tensions. Lighter by minute five.' },
  ];

  return (
    <div style={{ color: t.text, paddingBottom: 16 }}>
      {/* Profile header */}
      <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: avatarColors[5], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Alex Chen</div>
            <div style={{ fontSize: 12, color: t.sub, fontStyle: 'italic', marginTop: 2 }}>Morning Writer · Deep Work Druid</div>
          </div>
        </div>
        {/* Stats — editorial large numbers in thirds */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[['42','Hours'],['14','Streak'],['28','Circles']].map(([v, l], i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 0', borderRight: i < 2 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.muted, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.muted, marginBottom: 12 }}>Momentum Milestones</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: m.earned ? t.surf : 'transparent', border: `1px solid ${m.earned ? t.border : t.border + '55'}`, borderRadius: 10, opacity: m.earned ? 1 : 0.5 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.earned ? t.greenMid : t.surfAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={m.earned ? m.icon : 'Lock'} size={14} color={m.earned ? t.green : t.muted} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{m.name}</div>
                <div style={{ fontSize: 11, color: t.muted }}>{m.desc}</div>
              </div>
              {m.earned && <div style={{ fontSize: 10, color: t.muted, flexShrink: 0 }}>{m.date}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Reflections */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.muted, marginBottom: 12 }}>Recent Reflections</div>
        {reflections.map((r, i) => (
          <div key={i} style={{ padding: '14px 0', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.sub }}>{r.circle}</div>
              <div style={{ fontSize: 10, color: t.muted }}>{r.date}</div>
            </div>
            <div style={{ fontSize: 13, color: t.text, fontStyle: 'italic', lineHeight: 1.65 }}>"{r.entry}"</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav({ activeScreen, setActiveScreen, t }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Circles', icon: 'Circle' },
    { id: 'live', label: 'Practice', icon: 'Play' },
    { id: 'guilds', label: 'Guilds', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${t.border}`, background: t.surf, paddingBottom: 10, flexShrink: 0 }}>
      {tabs.map(tab => {
        const active = activeScreen === tab.id;
        return (
          <button key={tab.id} onClick={() => setActiveScreen(tab.id)} style={{ flex: 1, padding: '10px 0 5px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Icon name={tab.icon} size={19} color={active ? t.accent : t.muted} sw={active ? 2.2 : 1.5} />
            <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: active ? t.accent : t.muted }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? THEMES.dark : THEMES.light;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    live: LiveScreen,
    guilds: GuildsScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[activeScreen];

  return (
    <div style={{ background: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Lora', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        button { font-family: 'Lora', Georgia, serif; }
        textarea { font-family: 'Lora', Georgia, serif; }
      `}</style>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.3), 0 0 0 8px #222220' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <CurrentScreen t={t} setActiveScreen={setActiveScreen} isDark={isDark} setIsDark={setIsDark} />
          </div>
          <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} t={t} />
        </div>
      </div>
    </div>
  );
}
