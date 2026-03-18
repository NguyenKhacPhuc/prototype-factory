const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [sessionJoined, setSessionJoined] = useState(false);
  const [challengeExpanded, setChallengeExpanded] = useState(null);
  const [followedMentors, setFollowedMentors] = useState([]);
  const [pathProgress, setPathProgress] = useState({ ux: 68, data: 42, product: 25 });
  const [time, setTime] = useState('9:41');
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      .tab-press { transform: scale(0.92) !important; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      .live-dot { animation: pulse 1.5s infinite; }
      .screen-enter { animation: slideUp 0.3s ease-out; }
    `;
    document.head.appendChild(style);

    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2,'0')}`);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  const toggleFollow = (id) => {
    setFollowedMentors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleLike = (id) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const colors = {
    bg: '#FFF5EE',
    amber: '#F6A623',
    pink: '#FFB6C1',
    plum: '#6B3A5B',
    plumLight: '#9B5A8A',
    card: '#FFFFFF',
    textDark: '#2D1A27',
    textMed: '#6B5060',
    textLight: '#9C7A8A',
    gradStart: '#F6A623',
    gradEnd: '#FFB6C1',
  };

  const gradStyle = {
    background: `linear-gradient(135deg, ${colors.amber}, ${colors.pink})`,
  };

  const mentors = [
    { id: 1, name: 'Sarah Chen', role: 'Senior UX Designer', company: 'Google', avatar: '👩‍💼', rating: 4.9, sessions: 142, tags: ['UX Research', 'Figma', 'Design Systems'], available: true },
    { id: 2, name: 'Marcus Rivera', role: 'Data Science Lead', company: 'Netflix', avatar: '👨‍💻', rating: 4.8, sessions: 89, tags: ['Python', 'ML', 'Analytics'], available: false },
    { id: 3, name: 'Priya Patel', role: 'Product Manager', company: 'Stripe', avatar: '👩‍🔬', rating: 5.0, sessions: 203, tags: ['Roadmapping', 'Agile', 'GTM'], available: true },
    { id: 4, name: 'James Ko', role: 'Engineering Manager', company: 'Airbnb', avatar: '👨‍🏫', rating: 4.7, sessions: 67, tags: ['Leadership', 'React', 'System Design'], available: true },
  ];

  const liveSessions = [
    { id: 1, title: 'Breaking into Big Tech', mentor: 'Sarah Chen', time: 'Live Now', attendees: 34, topic: 'UX Design' },
    { id: 2, title: 'Data Science Career Paths', mentor: 'Marcus Rivera', time: 'In 2h', attendees: 18, topic: 'Data Science' },
    { id: 3, title: 'From PM to Director', mentor: 'Priya Patel', time: 'Tomorrow 3PM', attendees: 52, topic: 'Product' },
  ];

  const challenges = [
    { id: 1, title: 'Redesign Spotify\'s Onboarding', company: 'Design Challenge', deadline: '3 days left', difficulty: 'Intermediate', reward: '🏆 Portfolio Boost', desc: 'Reimagine the first-time user experience for music discovery. Focus on personalization, accessibility, and delight.' },
    { id: 2, title: 'Build a Churn Predictor', company: 'Data Challenge', deadline: '5 days left', difficulty: 'Advanced', reward: '💰 $250 Prize', desc: 'Use the provided dataset to predict customer churn with >85% accuracy. Submit your model and a 2-page writeup.' },
    { id: 3, title: 'Launch Feature Spec', company: 'Product Challenge', deadline: '1 week left', difficulty: 'Beginner', reward: '⭐ Mentor Review', desc: 'Write a complete product spec for a social feature on a B2B SaaS platform. Include user stories and metrics.' },
  ];

  const pathways = [
    { id: 'ux', label: 'UX Designer', emoji: '🎨', steps: ['Foundations', 'User Research', 'Prototyping', 'Case Studies', 'Job Ready'], color: '#F6A623' },
    { id: 'data', label: 'Data Scientist', emoji: '📊', steps: ['Python Basics', 'Statistics', 'ML Models', 'Projects', 'Portfolio'], color: '#C47AB6' },
    { id: 'product', label: 'Product Manager', emoji: '🚀', steps: ['PM Basics', 'Discovery', 'Prioritization', 'Metrics', 'Launch'], color: '#FFB6C1' },
  ];

  const qaFeed = [
    { id: 1, q: 'How do I get my first design internship with no experience?', mentor: 'Sarah Chen', answer: 'Start with 3 strong case studies from personal projects. Apply to smaller agencies first — they\'re more open to juniors with potential than polish. Your process matters more than the outcome.', likes: 47, time: '2h ago' },
    { id: 2, q: 'Is a bootcamp enough to become a data scientist at a top company?', mentor: 'Marcus Rivera', answer: 'Bootcamps give you the language but not the depth. Supplement with Kaggle competitions, read actual papers, and most importantly — build 2-3 end-to-end projects that solve real problems. That\'s what gets you interviews.', likes: 83, time: '5h ago' },
    { id: 3, q: 'What skills matter most for transitioning into product management?', mentor: 'Priya Patel', answer: 'Empathy + structured thinking. PMs are translators — between users and engineers, between business goals and customer needs. Practice writing PRDs for products you use. Shadowing eng/design roles helps immensely.', likes: 61, time: '1d ago' },
  ];

  // ─── SCREENS ───────────────────────────────────────────────

  const HomeScreen = () => (
    <div className="screen-enter" style={{ padding: '0 16px 100px', overflowY: 'auto', height: '100%' }}>
      {/* Header */}
      <div style={{ paddingTop: 16, paddingBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'Sora', fontSize: 13, color: colors.textLight }}>Good morning 👋</p>
            <h1 style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 700, color: colors.textDark }}>Alex Johnson</h1>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, ...gradStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            🎓
          </div>
        </div>
      </div>

      {/* Banner */}
      <div style={{ borderRadius: 20, padding: '18px 20px', marginBottom: 20, background: `linear-gradient(135deg, ${colors.plum}, ${colors.plumLight})`, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -10, top: -10, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', right: 20, bottom: -20, width: 60, height: 60, borderRadius: 30, background: 'rgba(255,255,255,0.06)' }} />
        <p style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 500, opacity: 0.8, marginBottom: 4, letterSpacing: 1 }}>LIVE SESSION</p>
        <p style={{ fontFamily: 'Sora', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Breaking into Big Tech</p>
        <p style={{ fontFamily: 'Sora', fontSize: 12, opacity: 0.85, marginBottom: 14 }}>Sarah Chen · 34 attending now</p>
        <button
          onClick={() => { handlePress('join'); setSessionJoined(true); setActiveTab('sessions'); }}
          style={{ background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '8px 20px', color: '#fff', fontFamily: 'Sora', fontSize: 13, fontWeight: 600, cursor: 'pointer', transform: pressedBtn === 'join' ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s' }}
        >
          Join Now →
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Sessions', value: '12', emoji: '📅' },
          { label: 'Challenges', value: '3', emoji: '⚡' },
          { label: 'Connections', value: '28', emoji: '🤝' },
        ].map((s) => (
          <div key={s.label} style={{ flex: 1, background: colors.card, borderRadius: 16, padding: '14px 10px', textAlign: 'center', boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
            <p style={{ fontSize: 20 }}>{s.emoji}</p>
            <p style={{ fontFamily: 'Sora', fontSize: 18, fontWeight: 700, color: colors.textDark }}>{s.value}</p>
            <p style={{ fontFamily: 'Sora', fontSize: 10, color: colors.textLight }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recommended Mentors */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Sora', fontSize: 16, fontWeight: 700, color: colors.textDark }}>Recommended Mentors</h2>
          <span onClick={() => setActiveTab('mentors')} style={{ fontFamily: 'Sora', fontSize: 12, color: colors.plum, fontWeight: 600, cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {mentors.slice(0, 3).map(m => (
            <div key={m.id} style={{ minWidth: 130, background: colors.card, borderRadius: 16, padding: '14px 12px', boxShadow: '0 2px 12px rgba(107,58,91,0.07)', flexShrink: 0 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.avatar}</div>
              <p style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: colors.textDark, marginBottom: 2 }}>{m.name.split(' ')[0]}</p>
              <p style={{ fontFamily: 'Sora', fontSize: 10, color: colors.textLight, marginBottom: 8 }}>{m.company}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: 4, background: m.available ? '#4CAF50' : '#ccc' }} />
                <span style={{ fontFamily: 'Sora', fontSize: 10, color: m.available ? '#4CAF50' : colors.textLight }}>{m.available ? 'Available' : 'Busy'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenge */}
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontFamily: 'Sora', fontSize: 16, fontWeight: 700, color: colors.textDark, marginBottom: 12 }}>Active Challenge</h2>
        <div style={{ background: colors.card, borderRadius: 18, padding: '16px', boxShadow: '0 2px 12px rgba(107,58,91,0.07)', borderLeft: `4px solid ${colors.amber}` }}>
          <p style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: colors.amber, marginBottom: 4 }}>⚡ {challenges[0].company}</p>
          <p style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 4 }}>{challenges[0].title}</p>
          <p style={{ fontFamily: 'Sora', fontSize: 12, color: colors.textMed, marginBottom: 10 }}>{challenges[0].deadline} · {challenges[0].difficulty}</p>
          <div style={{ height: 6, borderRadius: 3, background: '#F0E0E8', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '35%', borderRadius: 3, ...gradStyle }} />
          </div>
          <p style={{ fontFamily: 'Sora', fontSize: 10, color: colors.textLight, marginTop: 4 }}>35% complete</p>
        </div>
      </div>
    </div>
  );

  const SessionsScreen = () => (
    <div className="screen-enter" style={{ padding: '0 16px 100px', overflowY: 'auto', height: '100%' }}>
      <div style={{ paddingTop: 16, marginBottom: 16 }}>
        <h1 style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 700, color: colors.textDark }}>Live Sessions</h1>
        <p style={{ fontFamily: 'Sora', fontSize: 13, color: colors.textLight }}>Connect with experts in real time</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
        {['All', 'UX Design', 'Data Science', 'Product', 'Engineering'].map((f, i) => (
          <button key={f} style={{ flexShrink: 0, borderRadius: 20, padding: '6px 14px', border: 'none', background: i === 0 ? colors.plum : '#F2E8EE', color: i === 0 ? '#fff' : colors.textMed, fontFamily: 'Sora', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Live Session Banner */}
      {sessionJoined && (
        <div style={{ borderRadius: 18, padding: '16px', marginBottom: 16, background: `linear-gradient(135deg, ${colors.plum}, #9B5A8A)`, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="live-dot" style={{ width: 8, height: 8, borderRadius: 4, background: '#FF5C5C', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>YOU'RE LIVE</span>
          </div>
          <p style={{ fontFamily: 'Sora', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Breaking into Big Tech</p>
          <p style={{ fontFamily: 'Sora', fontSize: 12, opacity: 0.85, marginBottom: 12 }}>Sarah Chen · 34 participants</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => handlePress('mic')} style={{ flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 12, padding: '10px', color: '#fff', fontFamily: 'Sora', fontSize: 12, cursor: 'pointer', transform: pressedBtn === 'mic' ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s' }}>🎤 Unmute</button>
            <button onClick={() => handlePress('hand')} style={{ flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 12, padding: '10px', color: '#fff', fontFamily: 'Sora', fontSize: 12, cursor: 'pointer', transform: pressedBtn === 'hand' ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s' }}>✋ Raise Hand</button>
            <button onClick={() => setSessionJoined(false)} style={{ flex: 1, background: 'rgba(255,80,80,0.3)', border: 'none', borderRadius: 12, padding: '10px', color: '#fff', fontFamily: 'Sora', fontSize: 12, cursor: 'pointer' }}>Leave</button>
          </div>
        </div>
      )}

      {/* Sessions List */}
      {liveSessions.map(s => (
        <div key={s.id} style={{ background: colors.card, borderRadius: 18, padding: '16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <span style={{ background: s.time === 'Live Now' ? '#FF5C5C' : '#F2E8EE', color: s.time === 'Live Now' ? '#fff' : colors.textMed, borderRadius: 10, padding: '3px 10px', fontFamily: 'Sora', fontSize: 11, fontWeight: 600 }}>
              {s.time === 'Live Now' && <span className="live-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3, background: '#fff', marginRight: 4 }} />}
              {s.time}
            </span>
            <span style={{ fontFamily: 'Sora', fontSize: 11, color: colors.textLight }}>👥 {s.attendees}</span>
          </div>
          <p style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 3 }}>{s.title}</p>
          <p style={{ fontFamily: 'Sora', fontSize: 12, color: colors.textMed, marginBottom: 12 }}>{s.mentor} · {s.topic}</p>
          <button
            onClick={() => { handlePress(`s${s.id}`); if (s.time === 'Live Now') setSessionJoined(true); }}
            style={{ width: '100%', borderRadius: 12, padding: '10px', border: 'none', background: s.time === 'Live Now' ? colors.plum : '#F2E8EE', color: s.time === 'Live Now' ? '#fff' : colors.plum, fontFamily: 'Sora', fontSize: 13, fontWeight: 600, cursor: 'pointer', transform: pressedBtn === `s${s.id}` ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}
          >
            {s.time === 'Live Now' ? '🔴 Join Session' : '📅 RSVP'}
          </button>
        </div>
      ))}

      {/* Upcoming Q&A */}
      <div style={{ background: `linear-gradient(135deg, rgba(246,166,35,0.12), rgba(255,182,193,0.18))`, borderRadius: 18, padding: '16px', border: `1px solid ${colors.pink}` }}>
        <p style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 700, color: colors.plum, marginBottom: 8 }}>💬 Ask the Community</p>
        <input
          placeholder="Ask a question to get mentor advice..."
          style={{ width: '100%', border: `1.5px solid #E8D0DC`, borderRadius: 12, padding: '10px 14px', fontFamily: 'Sora', fontSize: 12, color: colors.textDark, background: colors.bg, outline: 'none' }}
        />
        <button onClick={() => handlePress('ask')} style={{ marginTop: 10, width: '100%', borderRadius: 12, padding: '10px', border: 'none', ...gradStyle, color: '#fff', fontFamily: 'Sora', fontSize: 13, fontWeight: 600, cursor: 'pointer', transform: pressedBtn === 'ask' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}>
          Post Question
        </button>
      </div>
    </div>
  );

  const MentorsScreen = () => (
    <div className="screen-enter" style={{ padding: '0 16px 100px', overflowY: 'auto', height: '100%' }}>
      <div style={{ paddingTop: 16, marginBottom: 16 }}>
        <h1 style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 700, color: colors.textDark }}>Find Mentors</h1>
        <p style={{ fontFamily: 'Sora', fontSize: 13, color: colors.textLight }}>Industry professionals ready to guide you</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <input
          placeholder="Search by name, role, or skill..."
          style={{ width: '100%', border: `1.5px solid #E8D0DC`, borderRadius: 14, padding: '11px 16px 11px 40px', fontFamily: 'Sora', fontSize: 13, color: colors.textDark, background: colors.card, outline: 'none', boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}
        />
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
      </div>

      {/* Q&A Feed */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 12 }}>Expert Q&A Feed</h2>
        {qaFeed.map(item => (
          <div key={item.id} style={{ background: colors.card, borderRadius: 18, padding: '16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
            <p style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: colors.textDark, marginBottom: 8, lineHeight: 1.4 }}>"{item.q}"</p>
            <div style={{ background: `linear-gradient(135deg, rgba(246,166,35,0.08), rgba(255,182,193,0.12))`, borderRadius: 12, padding: '12px', marginBottom: 10, borderLeft: `3px solid ${colors.amber}` }}>
              <p style={{ fontFamily: 'Sora', fontSize: 10, color: colors.plum, fontWeight: 600, marginBottom: 4 }}>{item.mentor}</p>
              <p style={{ fontFamily: 'Sora', fontSize: 12, color: colors.textMed, lineHeight: 1.5 }}>{item.answer}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Sora', fontSize: 11, color: colors.textLight }}>{item.time}</span>
              <button onClick={() => toggleLike(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Sora', fontSize: 12, color: likedPosts.includes(item.id) ? '#FF5C8D' : colors.textLight }}>
                {likedPosts.includes(item.id) ? '❤️' : '🤍'} {item.likes + (likedPosts.includes(item.id) ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mentor Cards */}
      <h2 style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 12 }}>All Mentors</h2>
      {mentors.map(m => (
        <div key={m.id} style={{ background: colors.card, borderRadius: 18, padding: '16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, ...gradStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
              {m.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark }}>{m.name}</p>
                  <p style={{ fontFamily: 'Sora', fontSize: 12, color: colors.textMed }}>{m.role}</p>
                  <p style={{ fontFamily: 'Sora', fontSize: 11, color: colors.plum, fontWeight: 500 }}>{m.company}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 700, color: colors.amber }}>⭐ {m.rating}</p>
                  <p style={{ fontFamily: 'Sora', fontSize: 10, color: colors.textLight }}>{m.sessions} sessions</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {m.tags.map(t => (
              <span key={t} style={{ background: '#F2E8EE', borderRadius: 10, padding: '3px 10px', fontFamily: 'Sora', fontSize: 10, color: colors.plum, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { handlePress(`book${m.id}`); }}
              style={{ flex: 1, borderRadius: 12, padding: '9px', border: 'none', background: m.available ? colors.plum : '#E8D8E0', color: m.available ? '#fff' : colors.textLight, fontFamily: 'Sora', fontSize: 12, fontWeight: 600, cursor: m.available ? 'pointer' : 'default', transform: pressedBtn === `book${m.id}` ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.15s' }}
            >
              {m.available ? '📅 Book Session' : 'Unavailable'}
            </button>
            <button
              onClick={() => toggleFollow(m.id)}
              style={{ width: 40, height: 38, borderRadius: 12, border: `1.5px solid ${followedMentors.includes(m.id) ? colors.pink : '#E8D0DC'}`, background: followedMentors.includes(m.id) ? '#FFF0F3' : 'transparent', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {followedMentors.includes(m.id) ? '💜' : '🤍'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const PathwayScreen = () => (
    <div className="screen-enter" style={{ padding: '0 16px 100px', overflowY: 'auto', height: '100%' }}>
      <div style={{ paddingTop: 16, marginBottom: 16 }}>
        <h1 style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 700, color: colors.textDark }}>Career Pathway</h1>
        <p style={{ fontFamily: 'Sora', fontSize: 13, color: colors.textLight }}>Track your journey to your dream career</p>
      </div>

      {/* Challenges */}
      <h2 style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 12 }}>⚡ Real-World Challenges</h2>
      {challenges.map(c => (
        <div key={c.id} style={{ background: colors.card, borderRadius: 18, marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.07)', overflow: 'hidden' }}>
          <div
            onClick={() => setChallengeExpanded(challengeExpanded === c.id ? null : c.id)}
            style={{ padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span style={{ background: '#FFF0DC', borderRadius: 8, padding: '2px 8px', fontFamily: 'Sora', fontSize: 10, color: colors.amber, fontWeight: 600 }}>{c.company}</span>
                  <span style={{ background: '#F2E8EE', borderRadius: 8, padding: '2px 8px', fontFamily: 'Sora', fontSize: 10, color: colors.plum, fontWeight: 500 }}>{c.difficulty}</span>
                </div>
                <p style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 3 }}>{c.title}</p>
                <p style={{ fontFamily: 'Sora', fontSize: 12, color: colors.textMed }}>{c.deadline} · {c.reward}</p>
              </div>
              <span style={{ fontFamily: 'Sora', fontSize: 18, color: colors.textLight, marginLeft: 8 }}>{challengeExpanded === c.id ? '▲' : '▼'}</span>
            </div>
          </div>
          {challengeExpanded === c.id && (
            <div style={{ padding: '0 16px 16px', borderTop: '1px solid #F5EAF0' }}>
              <p style={{ fontFamily: 'Sora', fontSize: 13, color: colors.textMed, lineHeight: 1.6, marginBottom: 12 }}>{c.desc}</p>
              <button onClick={() => handlePress(`start${c.id}`)} style={{ width: '100%', borderRadius: 12, padding: '10px', border: 'none', ...gradStyle, color: '#fff', fontFamily: 'Sora', fontSize: 13, fontWeight: 600, cursor: 'pointer', transform: pressedBtn === `start${c.id}` ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}>
                Start Challenge →
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Career Paths */}
      <h2 style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 12, marginTop: 8 }}>🗺️ Your Career Tracks</h2>
      {pathways.map(p => (
        <div key={p.id} style={{ background: colors.card, borderRadius: 18, padding: '16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>{p.emoji}</span>
              <p style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: colors.textDark }}>{p.label}</p>
            </div>
            <p style={{ fontFamily: 'Sora', fontSize: 14, fontWeight: 700, color: p.color }}>{pathProgress[p.id]}%</p>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: '#F0E0E8', overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ height: '100%', width: `${pathProgress[p.id]}%`, borderRadius: 4, background: `linear-gradient(90deg, ${p.color}, ${colors.pink})`, transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {p.steps.map((step, i) => {
              const done = (pathProgress[p.id] / 100) * p.steps.length > i;
              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 9, background: done ? p.color : '#E8D8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: done ? '#fff' : colors.textLight, fontWeight: 700 }}>
                    {done ? '✓' : i + 1}
                  </span>
                  <span style={{ fontFamily: 'Sora', fontSize: 10, color: done ? colors.textDark : colors.textLight, fontWeight: done ? 500 : 400 }}>{step}</span>
                  {i < p.steps.length - 1 && <span style={{ fontFamily: 'Sora', fontSize: 10, color: '#E8D8E8', margin: '0 2px' }}>›</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'sessions', label: 'Sessions', icon: '🎙️' },
    { id: 'mentors', label: 'Mentors', icon: '👥' },
    { id: 'pathway', label: 'Pathway', icon: '🗺️' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'sessions': return <SessionsScreen />;
      case 'mentors': return <MentorsScreen />;
      case 'pathway': return <PathwayScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora, sans-serif', padding: '20px 0' }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, borderRadius: 50, background: colors.bg, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 2px #3A2040, inset 0 0 0 1px rgba(255,255,255,0.1)', position: 'relative', display: 'flex', flexDirection: 'column' }}>

        {/* Status Bar */}
        <div style={{ height: 44, background: colors.bg, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 6px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
          <span style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: colors.textDark }}>{time}</span>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8, width: 120, height: 34, background: '#1A0F1E', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: '#2A1F2E' }} />
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#3A2A42' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'Sora', fontSize: 11, color: colors.textDark, fontWeight: 500 }}>5G</span>
            <span style={{ fontFamily: 'Sora', fontSize: 11, color: colors.textDark }}>📶</span>
            <span style={{ fontFamily: 'Sora', fontSize: 11, color: colors.textDark }}>🔋</span>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <div style={{ height: 82, background: colors.card, borderTop: '1px solid #F0E0EA', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around', padding: '10px 8px 0', flexShrink: 0, boxShadow: '0 -4px 20px rgba(107,58,91,0.08)' }}>
          {navItems.map(item => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { handlePress(`nav${item.id}`); setActiveTab(item.id); }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px', borderRadius: 14, transform: pressedBtn === `nav${item.id}` ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s', minWidth: 60 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 12, background: active ? colors.plum : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, transition: 'all 0.2s', boxShadow: active ? `0 4px 12px rgba(107,58,91,0.35)` : 'none' }}>
                  {item.icon}
                </div>
                <span style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: active ? 700 : 400, color: active ? colors.plum : colors.textLight, transition: 'color 0.2s' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
