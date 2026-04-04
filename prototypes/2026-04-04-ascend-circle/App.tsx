const { useState, useEffect, useRef } = React;

// ── Themes ──────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#131713',
    surface: '#1c2219',
    surfaceAlt: '#242e22',
    border: '#2c3a2a',
    borderLight: '#344031',
    primary: '#7fa882',
    primaryDim: '#253a27',
    accent: '#c4843a',
    accentLight: '#d4a06a',
    text: '#f0ebe0',
    textSec: '#8a9680',
    textMuted: '#526050',
    tag: '#242e22',
    live: '#e05a42',
    liveAlt: '#3a1c15',
    success: '#5a9e6a',
    pill: '#1e2820',
  },
  light: {
    bg: '#f5f0e8',
    surface: '#ede8dc',
    surfaceAlt: '#e5ddd2',
    border: '#ccc5b4',
    borderLight: '#d8d0c0',
    primary: '#4a7050',
    primaryDim: '#c8dcc8',
    accent: '#b87333',
    accentLight: '#c98e58',
    text: '#1a1e18',
    textSec: '#5a6254',
    textMuted: '#8a9482',
    tag: '#ddd6c8',
    live: '#d44332',
    liveAlt: '#fde8e5',
    success: '#3a8050',
    pill: '#e0d8cc',
  },
};

// ── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  const SignalIcon = window.lucide.Signal;
  return (
    <div style={{
      height: 52, paddingTop: 14,
      paddingLeft: 22, paddingRight: 22,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: 0.3 }}>9:41</span>
      <div style={{ width: 124 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <SignalIcon size={13} color={t.text} />
        <WifiIcon size={13} color={t.text} />
        <BatteryIcon size={15} color={t.text} />
      </div>
    </div>
  );
}

// ── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark }) {
  const [liked, setLiked] = useState({});
  const BellIcon = window.lucide.Bell;
  const FlameIcon = window.lucide.Flame;
  const HeartIcon = window.lucide.Heart;
  const ZapIcon = window.lucide.Zap;
  const UsersIcon = window.lucide.Users;
  const PlayIcon = window.lucide.Play;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;

  const myCircles = [
    { id: 1, name: 'Morning Writers', emoji: '✍️', members: 42, streak: 7 },
    { id: 2, name: 'Mindful Mavericks', emoji: '🧘', members: 128, streak: 12 },
    { id: 3, name: 'Digital Detox', emoji: '📵', members: 67, streak: 4 },
    { id: 4, name: 'Eco Warriors', emoji: '🌿', members: 89, streak: 21 },
  ];

  const upcomingRituals = [
    { id: 1, circle: 'Morning Writers', ritual: 'Wordflow Ritual', time: 'Today 7:00 AM', live: true, participants: 18 },
    { id: 2, circle: 'Mindful Mavericks', ritual: 'Stillness Check-in', time: 'Today 12:00 PM', live: false, participants: 34 },
    { id: 3, circle: 'Eco Warriors', ritual: 'Eco-Commitment', time: 'Fri 6:00 PM', live: false, participants: 52 },
  ];

  const affirmations = [
    { id: 1, user: 'Elena K.', initials: 'EK', text: 'Finished 800 words this morning — felt like flying ✨', likes: 12, circle: 'Morning Writers', time: '2h ago' },
    { id: 2, user: 'Marcus T.', initials: 'MT', text: 'Day 21 of no social media scrolling. My focus is unreal.', likes: 28, circle: 'Digital Detox', time: '4h ago' },
    { id: 3, user: 'Priya S.', initials: 'PS', text: "Composted for the first time! Tiny win but I'm proud 🌱", likes: 19, circle: 'Eco Warriors', time: '6h ago' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 3, fontWeight: 600 }}>
            Saturday, April 4
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>Good morning,</div>
          <div style={{ fontSize: 30, fontWeight: 300, fontStyle: 'italic', color: t.accent, lineHeight: 1.1 }}>Sarah</div>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => setIsDark(!isDark)} style={{ width: 34, height: 34, borderRadius: 17, border: `1px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {isDark ? <SunIcon size={14} color={t.textSec} /> : <MoonIcon size={14} color={t.textSec} />}
          </button>
          <div style={{ width: 34, height: 34, borderRadius: 17, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <BellIcon size={14} color="#fff" />
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: t.border, margin: '0 20px 20px', flexShrink: 0 }} />

      {/* My Circles — horizontal scroll */}
      <div style={{ flexShrink: 0, marginBottom: 20 }}>
        <div style={{ padding: '0 20px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, fontWeight: 600 }}>Your Circles</span>
          <span style={{ fontSize: 14, color: t.accent, fontStyle: 'italic', cursor: 'pointer' }}>See all →</span>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, paddingRight: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {myCircles.map(circle => (
            <div key={circle.id} style={{ flexShrink: 0, width: 128, background: t.surface, borderRadius: 14, padding: 14, border: `1px solid ${t.border}`, cursor: 'pointer' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{circle.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.2, marginBottom: 8 }}>{circle.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                <UsersIcon size={11} color={t.textMuted} />
                <span style={{ fontSize: 11, color: t.textMuted }}>{circle.members} members</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <FlameIcon size={11} color={t.accent} />
                <span style={{ fontSize: 11, color: t.accent }}>{circle.streak} day streak</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Rituals */}
      <div style={{ padding: '0 20px', flexShrink: 0, marginBottom: 20 }}>
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, fontWeight: 600 }}>Rituals</span>
          <span style={{ fontSize: 14, color: t.accent, fontStyle: 'italic', cursor: 'pointer' }}>Schedule →</span>
        </div>
        {upcomingRituals.map(ritual => (
          <div key={ritual.id} style={{ marginBottom: 8, background: t.surface, borderRadius: 12, padding: '12px 14px', border: `1px solid ${ritual.live ? t.accent : t.border}`, display: 'flex', gap: 12, cursor: 'pointer' }}>
            <div style={{ width: 42, height: 42, borderRadius: 8, background: ritual.live ? t.accent : t.tag, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {ritual.live ? <PlayIcon size={17} color="#fff" /> : <ZapIcon size={17} color={t.textSec} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{ritual.ritual}</span>
                {ritual.live && (
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#fff', background: t.live, borderRadius: 4, padding: '2px 6px' }}>LIVE</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 3 }}>{ritual.circle}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: t.textSec }}>{ritual.time}</span>
                <span style={{ fontSize: 11, color: t.textMuted }}>· {ritual.participants} joining</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Affirmation Stream */}
      <div style={{ padding: '0 20px', flexShrink: 0 }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, fontWeight: 600 }}>Affirmation Stream</span>
        </div>
        {affirmations.map(a => (
          <div key={a.id} style={{ marginBottom: 10, background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 17, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: t.primary, flexShrink: 0 }}>{a.initials}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{a.user}</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>{a.circle} · {a.time}</div>
              </div>
            </div>
            <div style={{ fontSize: 15, color: t.text, lineHeight: 1.5, fontStyle: 'italic', marginBottom: 10 }}>"{a.text}"</div>
            <div style={{ display: 'flex', gap: 14 }}>
              <button onClick={() => setLiked(prev => ({ ...prev, [a.id]: !prev[a.id] }))} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <HeartIcon size={14} color={liked[a.id] ? t.live : t.accent} />
                <span style={{ fontSize: 13, color: t.textSec }}>{a.likes + (liked[a.id] ? 1 : 0)}</span>
              </button>
              <span style={{ fontSize: 13, color: t.textMuted, cursor: 'pointer' }}>High-five ✋</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ── Circles Screen ───────────────────────────────────────────────────────────
function CirclesScreen({ t }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [joined, setJoined] = useState({ 1: true, 2: true, 4: true });
  const SearchIcon = window.lucide.Search;
  const UsersIcon = window.lucide.Users;
  const StarIcon = window.lucide.Star;

  const categories = ['All', 'Mindfulness', 'Creativity', 'Wellness', 'Eco', 'Digital', 'Movement'];

  const circles = [
    { id: 1, name: 'Morning Writers Circle', emoji: '✍️', members: 42, category: 'Creativity', tagline: 'Words before world', rituals: 3, rating: 4.9 },
    { id: 2, name: 'Mindfulness Mavericks', emoji: '🧘', members: 128, category: 'Mindfulness', tagline: 'Presence is power', rituals: 5, rating: 4.8 },
    { id: 3, name: 'Digital Detox Decorum', emoji: '📵', members: 67, category: 'Digital', tagline: 'Reclaim your attention', rituals: 2, rating: 4.7 },
    { id: 4, name: 'Sustainable Habits Sanctuary', emoji: '🌿', members: 89, category: 'Eco', tagline: 'Small acts, big shifts', rituals: 4, rating: 4.9 },
    { id: 5, name: 'Somatic Explorers', emoji: '🫀', members: 54, category: 'Movement', tagline: 'Feel to heal', rituals: 3, rating: 4.6 },
    { id: 6, name: 'Cold Plunge Collective', emoji: '🧊', members: 203, category: 'Wellness', tagline: 'Embrace the cold', rituals: 7, rating: 4.8 },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 4, fontWeight: 600 }}>Discover</div>
        <div style={{ fontSize: 30, fontWeight: 700, color: t.text }}>Find Your Circle</div>
        <div style={{ fontSize: 16, fontStyle: 'italic', color: t.textSec, marginTop: 2 }}>Where identity meets intention</div>
      </div>

      <div style={{ padding: '0 20px 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.surface, borderRadius: 10, padding: '10px 14px', border: `1px solid ${t.border}` }}>
          <SearchIcon size={15} color={t.textMuted} />
          <span style={{ fontSize: 15, color: t.textMuted }}>Search circles, rituals, goals...</span>
        </div>
      </div>

      {/* Category pills — horizontal scroll */}
      <div style={{ display: 'flex', gap: 8, paddingLeft: 20, paddingRight: 20, overflowX: 'auto', marginBottom: 16, flexShrink: 0, paddingBottom: 2 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCat(cat)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: `1px solid ${selectedCat === cat ? t.accent : t.border}`, background: selectedCat === cat ? t.accent : t.surface, color: selectedCat === cat ? '#fff' : t.textSec, fontSize: 13, cursor: 'pointer', fontFamily: "'Crimson Pro', serif" }}>{cat}</button>
        ))}
      </div>

      <div style={{ height: 1, background: t.border, margin: '0 20px 16px', flexShrink: 0 }} />

      {/* Featured */}
      <div style={{ padding: '0 20px', flexShrink: 0, marginBottom: 16 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 10, fontWeight: 600 }}>Featured Circle</div>
        <div style={{ background: t.surface, borderRadius: 16, padding: 20, border: `1px solid ${t.accent}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: 65, background: t.accent, opacity: 0.07 }} />
          <div style={{ fontSize: 34, marginBottom: 8 }}>🌿</div>
          <div style={{ fontSize: 19, fontWeight: 700, color: t.text, marginBottom: 4 }}>Sustainable Habits Sanctuary</div>
          <div style={{ fontSize: 14, fontStyle: 'italic', color: t.textSec, marginBottom: 12 }}>"Small acts, big shifts"</div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <UsersIcon size={13} color={t.textMuted} />
              <span style={{ fontSize: 13, color: t.textMuted }}>89 members</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <StarIcon size={13} color={t.accent} />
              <span style={{ fontSize: 13, color: t.textMuted }}>4.9 rating · 4 rituals/wk</span>
            </div>
          </div>
          <button style={{ background: t.accent, color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Crimson Pro', serif" }}>
            Join Circle
          </button>
        </div>
      </div>

      {/* All circles */}
      <div style={{ padding: '0 20px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 10, fontWeight: 600 }}>All Circles</div>
        {circles.map(circle => (
          <div key={circle.id} style={{ marginBottom: 8, background: t.surface, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>{circle.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 2 }}>{circle.name}</div>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: t.textSec, marginBottom: 4 }}>{circle.tagline}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontSize: 11, color: t.textMuted }}>{circle.members} members</span>
                <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
                <span style={{ fontSize: 11, color: t.textMuted }}>{circle.rituals} rituals/wk</span>
              </div>
            </div>
            <button onClick={() => setJoined(prev => ({ ...prev, [circle.id]: !prev[circle.id] }))} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 6, border: `1px solid ${joined[circle.id] ? t.border : t.accent}`, background: joined[circle.id] ? 'transparent' : t.accent, color: joined[circle.id] ? t.textSec : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: "'Crimson Pro', serif" }}>
              {joined[circle.id] ? 'Joined' : 'Join'}
            </button>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ── Rituals Screen ───────────────────────────────────────────────────────────
function RitualsScreen({ t }) {
  const [activeRitual, setActiveRitual] = useState(false);
  const [muted, setMuted] = useState(false);
  const FlameIcon = window.lucide.Flame;
  const PlayIcon = window.lucide.Play;
  const MicIcon = window.lucide.Mic;
  const MicOffIcon = window.lucide.MicOff;
  const VideoIcon = window.lucide.Video;
  const UsersIcon = window.lucide.Users;
  const ClockIcon = window.lucide.Clock;
  const XIcon = window.lucide.X;

  const todayRituals = [
    { id: 1, circle: 'Mindful Mavericks', name: 'Stillness Check-in', time: '12:00', period: 'PM', type: 'audio', participants: 34, rsvpd: false },
    { id: 2, circle: 'Digital Detox', name: 'Offline Pledge', time: '3:00', period: 'PM', type: 'video', participants: 22, rsvpd: true },
    { id: 3, circle: 'Morning Writers', name: 'Evening Reflection', time: '8:00', period: 'PM', type: 'audio', participants: 28, rsvpd: false },
  ];

  const pastDeclarations = [
    { id: 1, name: 'Wordflow Ritual', date: 'Yesterday', declaration: '"Today I will write 500 words before I open any apps"' },
    { id: 2, name: 'Eco-Commitment Ritual', date: 'Apr 2', declaration: '"I\'ll bring my own bag to every store this week"' },
  ];

  const participants = ['Elena K.', 'Marcus T.', 'Priya S.', 'James L.', 'Amara N.', 'Kai H.'];

  if (activeRitual) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 10, color: t.live, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>● LIVE NOW</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: t.text }}>Wordflow Ritual</div>
            <div style={{ fontSize: 13, color: t.textMuted }}>Morning Writers Circle</div>
          </div>
          <button onClick={() => setActiveRitual(false)} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={16} color={t.textSec} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {participants.map((name, i) => (
              <div key={i} style={{ background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${i === 0 ? t.accent : t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: i === 0 ? t.accent : t.tag, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: i === 0 ? '#fff' : t.textSec }}>
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <span style={{ fontSize: 12, color: t.textSec }}>{name}</span>
                {i === 0 && <span style={{ fontSize: 9, color: t.accent, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>HOST</span>}
              </div>
            ))}
          </div>

          <div style={{ background: t.surface, borderRadius: 12, padding: 16, border: `1px solid ${t.border}`, marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>Your Declaration</div>
            <div style={{ fontSize: 16, fontStyle: 'italic', color: t.text, borderLeft: `3px solid ${t.accent}`, paddingLeft: 12, lineHeight: 1.5 }}>
              "Today I will write 500 words before I open any apps"
            </div>
          </div>

          <div style={{ background: t.tag, borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: t.textMuted }}>18 members in this ritual</div>
          </div>
        </div>

        <div style={{ padding: '12px 20px', borderTop: `1px solid ${t.border}`, display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={() => setMuted(!muted)} style={{ flex: 1, padding: 12, borderRadius: 10, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            {muted ? <MicOffIcon size={16} color={t.live} /> : <MicIcon size={16} color={t.textSec} />}
            <span style={{ fontSize: 14, color: muted ? t.live : t.textSec, fontFamily: "'Crimson Pro', serif" }}>{muted ? 'Unmute' : 'Mute'}</span>
          </button>
          <button style={{ flex: 1, padding: 12, borderRadius: 10, background: t.accent, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <FlameIcon size={16} color="#fff" />
            <span style={{ fontSize: 14, color: '#fff', fontWeight: 600, fontFamily: "'Crimson Pro', serif" }}>Declare</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 4, fontWeight: 600 }}>Live & Scheduled</div>
        <div style={{ fontSize: 30, fontWeight: 700, color: t.text }}>Sacred Rituals</div>
        <div style={{ fontSize: 16, fontStyle: 'italic', color: t.textSec, marginTop: 2 }}>The ceremonies that bind your circle</div>
      </div>

      {/* Live now */}
      <div style={{ padding: '0 20px', flexShrink: 0, marginBottom: 16 }}>
        <div style={{ background: t.liveAlt, borderRadius: 16, padding: 16, border: `1px solid ${t.live}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: t.live, letterSpacing: 2.5, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>● Happening Now</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: t.text }}>Wordflow Ritual</div>
              <div style={{ fontSize: 13, color: t.textSec }}>Morning Writers Circle</div>
            </div>
            <button onClick={() => setActiveRitual(true)} style={{ width: 46, height: 46, borderRadius: 23, background: t.live, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <PlayIcon size={18} color="#fff" />
            </button>
          </div>
          <div style={{ fontSize: 14, color: t.textSec, fontStyle: 'italic', lineHeight: 1.45, marginBottom: 12 }}>
            Set your writing intention. Share one word that captures your creative energy.
          </div>
          <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <UsersIcon size={13} color={t.textMuted} />
              <span style={{ fontSize: 12, color: t.textMuted }}>18 in circle</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ClockIcon size={13} color={t.textMuted} />
              <span style={{ fontSize: 12, color: t.textMuted }}>15 min</span>
            </div>
          </div>
          <button onClick={() => setActiveRitual(true)} style={{ width: '100%', padding: 11, background: t.live, border: 'none', borderRadius: 8, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Crimson Pro', serif" }}>
            Join the Ritual →
          </button>
        </div>
      </div>

      {/* Today's schedule */}
      <div style={{ padding: '0 20px', flexShrink: 0, marginBottom: 16 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 10, fontWeight: 600 }}>Today's Schedule</div>
        {todayRituals.map(ritual => (
          <div key={ritual.id} style={{ marginBottom: 8, background: t.surface, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'center', minWidth: 50 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.textSec }}>{ritual.time}</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>{ritual.period}</div>
            </div>
            <div style={{ width: 1, height: 38, background: t.border, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 2 }}>{ritual.name}</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>{ritual.circle}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {ritual.type === 'video' ? <VideoIcon size={13} color={t.textMuted} /> : <MicIcon size={13} color={t.textMuted} />}
              <button style={{ padding: '5px 10px', borderRadius: 6, border: `1px solid ${ritual.rsvpd ? t.border : t.accent}`, background: ritual.rsvpd ? 'transparent' : t.accent, color: ritual.rsvpd ? t.textSec : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: "'Crimson Pro', serif" }}>
                {ritual.rsvpd ? 'Set ✓' : 'RSVP'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past declarations */}
      <div style={{ padding: '0 20px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 10, fontWeight: 600 }}>Past Declarations</div>
        {pastDeclarations.map(r => (
          <div key={r.id} style={{ marginBottom: 8, background: t.surface, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{r.name}</span>
              <span style={{ fontSize: 12, color: t.textMuted }}>{r.date}</span>
            </div>
            <div style={{ fontSize: 14, fontStyle: 'italic', color: t.textSec, borderLeft: `2px solid ${t.accent}`, paddingLeft: 10, lineHeight: 1.4 }}>{r.declaration}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ── Altar Screen ─────────────────────────────────────────────────────────────
function AltarScreen({ t }) {
  const [intentions, setIntentions] = useState([
    { id: 1, text: 'Write 500 words before checking email', done: true, circle: 'Morning Writers', seenBy: 8 },
    { id: 2, text: 'Meditate for 10 minutes at sunrise', done: false, circle: 'Mindful Mavericks', seenBy: 12 },
    { id: 3, text: 'Go 4 hours without checking social media', done: false, circle: 'Digital Detox', seenBy: 5 },
    { id: 4, text: 'Cook a plant-based meal from scratch', done: false, circle: 'Eco Warriors', seenBy: 7 },
  ]);
  const FlameIcon = window.lucide.Flame;
  const CheckIcon = window.lucide.Check;
  const EyeIcon = window.lucide.Eye;
  const PlusIcon = window.lucide.Plus;

  const toggleDone = (id) => setIntentions(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));

  const weekly = [
    { day: 'Mon', done: true }, { day: 'Tue', done: true }, { day: 'Wed', done: true },
    { day: 'Thu', done: true }, { day: 'Fri', done: false }, { day: 'Sat', done: false }, { day: 'Sun', done: false },
  ];

  const completed = intentions.filter(i => i.done).length;

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 4, fontWeight: 600 }}>Your Sacred Space</div>
        <div style={{ fontSize: 30, fontWeight: 700, color: t.text }}>Intention Altar</div>
        <div style={{ fontSize: 16, fontStyle: 'italic', color: t.textSec, marginTop: 2 }}>What you declare, you become</div>
      </div>

      {/* Weekly rhythm */}
      <div style={{ padding: '0 20px 16px', flexShrink: 0 }}>
        <div style={{ background: t.surface, borderRadius: 14, padding: 16, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>Week of Apr 1–7</div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', marginBottom: 14 }}>
            {weekly.map(day => (
              <div key={day.day} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: 34, height: 34, borderRadius: 17, background: day.done ? t.accent : t.tag, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', border: `1px solid ${day.done ? t.accent : t.border}` }}>
                  {day.done && <CheckIcon size={13} color="#fff" />}
                </div>
                <span style={{ fontSize: 10, color: day.done ? t.accent : t.textMuted }}>{day.day}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: t.textSec }}>4 of 7 days complete</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <FlameIcon size={14} color={t.accent} />
              <span style={{ fontSize: 13, fontWeight: 600, color: t.accent }}>12-day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's intentions */}
      <div style={{ padding: '0 20px', flexShrink: 0 }}>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, fontWeight: 600 }}>Today's Intentions</span>
          <span style={{ fontSize: 13, color: t.textSec }}>{completed}/{intentions.length} complete</span>
        </div>
        {intentions.map(intention => (
          <div key={intention.id} style={{ marginBottom: 8, background: t.surface, borderRadius: 12, padding: '12px 14px', border: `1px solid ${intention.done ? t.accent : t.border}`, display: 'flex', gap: 12, alignItems: 'flex-start', opacity: intention.done ? 0.7 : 1 }}>
            <button onClick={() => toggleDone(intention.id)} style={{ width: 24, height: 24, borderRadius: 12, border: `1px solid ${intention.done ? t.accent : t.border}`, background: intention.done ? t.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, marginTop: 2 }}>
              {intention.done && <CheckIcon size={12} color="#fff" />}
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, color: t.text, lineHeight: 1.4, fontStyle: 'italic', textDecoration: intention.done ? 'line-through' : 'none', marginBottom: 6 }}>
                "{intention.text}"
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: t.textMuted }}>{intention.circle}</span>
                <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
                <EyeIcon size={11} color={t.textMuted} />
                <span style={{ fontSize: 11, color: t.textMuted }}>{intention.seenBy} peers</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add intention */}
      <div style={{ padding: '10px 20px', flexShrink: 0 }}>
        <button style={{ width: '100%', padding: '12px 16px', background: t.surface, border: `1px dashed ${t.accent}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <PlusIcon size={16} color={t.accent} />
          <span style={{ fontSize: 15, fontStyle: 'italic', color: t.textMuted, fontFamily: "'Crimson Pro', serif" }}>Declare a new intention...</span>
        </button>
      </div>

      {/* Quote */}
      <div style={{ padding: '4px 20px 20px', flexShrink: 0 }}>
        <div style={{ background: t.tag, borderRadius: 12, padding: '14px 16px', borderLeft: `3px solid ${t.accent}` }}>
          <div style={{ fontSize: 15, fontStyle: 'italic', color: t.textSec, lineHeight: 1.6, marginBottom: 6 }}>
            "The ritual of declaring is the first act of becoming."
          </div>
          <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2, textTransform: 'uppercase' }}>— Circle Wisdom</div>
        </div>
      </div>
    </div>
  );
}

// ── Journey Screen ───────────────────────────────────────────────────────────
function JourneyScreen({ t, isDark, setIsDark }) {
  const StarIcon = window.lucide.Star;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const FlameIcon = window.lucide.Flame;
  const AwardIcon = window.lucide.Award;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const CheckIcon = window.lucide.Check;

  const badges = [
    { id: 1, emoji: '🌅', name: 'Early Riser', desc: '7 morning rituals', earned: true },
    { id: 2, emoji: '🔥', name: 'Flame Keeper', desc: '10-day streak', earned: true },
    { id: 3, emoji: '📝', name: 'Word Weaver', desc: '50 words declared', earned: true },
    { id: 4, emoji: '🧘', name: 'Still Waters', desc: '5 stillness rituals', earned: false },
    { id: 5, emoji: '🌿', name: 'Earth Keeper', desc: '3 eco commitments', earned: false },
    { id: 6, emoji: '💎', name: 'Circle Elder', desc: '30-day streak', earned: false },
  ];

  const milestones = [
    { label: 'Rituals Attended', value: 34, icon: FlameIcon },
    { label: 'Declarations Made', value: 89, icon: StarIcon },
    { label: 'High-fives Given', value: 142, icon: TrendingUpIcon },
    { label: 'Days Active', value: 47, icon: AwardIcon },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 20px 12px', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 4, fontWeight: 600 }}>Your Path</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: t.text }}>Journey</div>
          <div style={{ fontSize: 16, fontStyle: 'italic', color: t.textSec, marginTop: 2 }}>Every step leaves a mark</div>
        </div>
        <button onClick={() => setIsDark(!isDark)} style={{ width: 36, height: 36, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: 4 }}>
          {isDark ? <SunIcon size={15} color={t.textSec} /> : <MoonIcon size={15} color={t.textSec} />}
        </button>
      </div>

      {/* Profile */}
      <div style={{ padding: '0 20px 16px', flexShrink: 0 }}>
        <div style={{ background: t.surface, borderRadius: 16, padding: 18, border: `1px solid ${t.border}`, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 58, height: 58, borderRadius: 29, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0 }}>S</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 2 }}>Sarah Chen</div>
            <div style={{ fontSize: 14, fontStyle: 'italic', color: t.textSec, marginBottom: 10 }}>Aspiring novelist & mindful creator</div>
            <div style={{ display: 'flex', gap: 14 }}>
              {[['3', 'Circles'], ['12', 'Streak'], ['3', 'Badges']].map(([val, label], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: i > 0 ? 14 : 0 }}>
                  {i > 0 && <div style={{ width: 1, height: 32, background: t.border, marginRight: 14 }} />}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: t.accent }}>{val}</div>
                    <div style={{ fontSize: 10, color: t.textMuted }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Milestones — horizontal scroll */}
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <div style={{ padding: '0 20px', marginBottom: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, fontWeight: 600 }}>Milestones</span>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, paddingRight: 20, overflowX: 'auto' }}>
          {milestones.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} style={{ flexShrink: 0, width: 108, background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}`, textAlign: 'center' }}>
                <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                  <Icon size={20} color={t.accent} />
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: t.text, marginBottom: 3 }}>{m.value}</div>
                <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.3 }}>{m.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: '0 20px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.textMuted, marginBottom: 10, fontWeight: 600 }}>Circle Badges</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {badges.map(badge => (
            <div key={badge.id} style={{ background: t.surface, borderRadius: 12, padding: '12px 10px', border: `1px solid ${badge.earned ? t.accent : t.border}`, textAlign: 'center', opacity: badge.earned ? 1 : 0.45 }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{badge.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 3 }}>{badge.name}</div>
              <div style={{ fontSize: 10, color: t.textMuted, lineHeight: 1.3 }}>{badge.desc}</div>
              {badge.earned && (
                <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 8, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckIcon size={9} color="#fff" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ── Bottom Navigation ────────────────────────────────────────────────────────
function BottomNav({ tabs, activeTab, setActiveTab, t }) {
  return (
    <div style={{ height: 72, background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', paddingBottom: 8, flexShrink: 0 }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', paddingTop: 10 }}>
            <tab.icon size={22} color={isActive ? t.accent : t.textMuted} />
            <span style={{ fontSize: 10, color: isActive ? t.accent : t.textMuted, fontFamily: "'Crimson Pro', serif", letterSpacing: 0.3, fontWeight: isActive ? 600 : 400 }}>
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = themes[isDark ? 'dark' : 'light'];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'circles', label: 'Circles', icon: window.lucide.Users },
    { id: 'rituals', label: 'Rituals', icon: window.lucide.Flame },
    { id: 'altar', label: 'Altar', icon: window.lucide.Leaf },
    { id: 'journey', label: 'Journey', icon: window.lucide.TrendingUp },
  ];

  const screens = {
    home: HomeScreen,
    circles: CirclesScreen,
    rituals: RitualsScreen,
    altar: AltarScreen,
    journey: JourneyScreen,
  };

  const fontCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap');
    * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
  `;

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Crimson Pro', Georgia, serif" }}>
      <style dangerouslySetInnerHTML={{ __html: fontCSS }} />
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', transition: 'background 0.25s ease' }}>
        <StatusBar t={t} />
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }} />
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <ActiveScreen t={t} isDark={isDark} setIsDark={setIsDark} />
        </div>
        <BottomNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
      </div>
    </div>
  );
}
