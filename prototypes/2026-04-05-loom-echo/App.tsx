const { useState, useEffect, useRef } = React;

function HomeScreen({ theme: t, isDark, setIsDark, setActiveScreen, icons }) {
  const { Bell, Moon, Sun, ChevronRight, Play, Heart, Sparkles } = icons;
  const upcomingRituals = [
    { id: 2, guild: 'Gothic Cyberpunks', time: 'In 2h 30m', participants: 23, theme: 'Digital Shadows', gradient: 'linear-gradient(135deg,#7C3AED,#4338CA)' },
    { id: 3, guild: 'Abstract Expressionists', time: 'Tomorrow 8PM', participants: 31, theme: 'Emotional Geometry', gradient: 'linear-gradient(135deg,#0EA5E9,#2563EB)' },
  ];
  const recentTapestries = [
    { id: 1, name: 'Neon Pulse #42', guild: 'Synthwave Dreamers', likes: 234, gradient: 'linear-gradient(135deg,#EC4899,#8B5CF6,#6366F1)' },
    { id: 2, name: 'Shadow Bloom #7', guild: 'Gothic Cyberpunks', likes: 189, gradient: 'linear-gradient(135deg,#7C3AED,#1E293B)' },
    { id: 3, name: 'Wave Theory #19', guild: 'Abstract Exp.', likes: 312, gradient: 'linear-gradient(135deg,#0EA5E9,#10B981)' },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 13, color: t.textSecondary, fontWeight: 500, margin: 0 }}>Good evening,</p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '2px 0 0', letterSpacing: '-0.5px' }}>Aria_Weaver</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setIsDark(!isDark)} className="btn-press" style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${t.border}`, background: t.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDark ? <Sun size={18} color="#F97316" /> : <Moon size={18} color={t.textSecondary} />}
          </button>
          <button className="btn-press" style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${t.border}`, background: t.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Bell size={18} color={t.textSecondary} />
            <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#F97316' }} />
          </button>
        </div>
      </div>
      <div style={{ padding: '16px 20px 0' }}>
        <div className="btn-press" onClick={() => setActiveScreen('ritual')} style={{ background: 'linear-gradient(135deg,#2563EB 0%,#7C3AED 50%,#EC4899 100%)', borderRadius: 20, padding: 20, cursor: 'pointer', backgroundSize: '300% 300%', animation: 'tapestryFlow 6s ease infinite', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Live Ritual</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Synthwave Dreamers</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '0 0 16px' }}>Neon Nostalgia — 47 weavers active</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: '10px 16px' }}>
              <Play size={16} color="#fff" fill="#fff" />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Join the Weaving</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }}>Upcoming Rituals</h3>
          <button onClick={() => setActiveScreen('guilds')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>See all</span>
            <ChevronRight size={14} color={t.primary} />
          </button>
        </div>
        {upcomingRituals.map(ritual => (
          <div key={ritual.id} className="card-hover" style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: ritual.gradient, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>{ritual.guild}</p>
              <p style={{ fontSize: 12, color: t.textSecondary, margin: 0 }}>{ritual.theme}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: t.primary, margin: '0 0 2px' }}>{ritual.time}</p>
              <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>{ritual.participants} joined</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '20px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }}>Recent Tapestries</h3>
          <button onClick={() => setActiveScreen('gallery')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>Gallery</span>
            <ChevronRight size={14} color={t.primary} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {recentTapestries.map(item => (
            <div key={item.id} className="card-hover btn-press" onClick={() => setActiveScreen('gallery')} style={{ flexShrink: 0, width: 140, cursor: 'pointer' }}>
              <div style={{ width: 140, height: 140, borderRadius: 16, background: item.gradient, marginBottom: 8, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '3px 8px' }}>
                  <Heart size={11} color="#fff" fill="#fff" />
                  <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>{item.likes}</span>
                </div>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text, margin: '0 0 2px' }}>{item.name}</p>
              <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>{item.guild}</p>
            </div>
          ))}
          <div style={{ width: 20, flexShrink: 0 }} />
        </div>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

function RitualScreen({ theme: t, isDark, setIsDark, setActiveScreen, icons }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'weaver', text: 'The ritual begins... I sense a longing for electric dreams. The tapestry stirs with anticipation.' },
    { id: 2, type: 'user', text: 'neon rain, melancholy synth', username: 'Aria_Weaver' },
    { id: 3, type: 'weaver', text: 'Integrating... rain patterns emerge in the upper quadrant. Melancholy resolves as deep indigo threads woven through electric gold.' },
    { id: 4, type: 'user', text: 'add glitch effect', username: 'NightCoder88' },
    { id: 5, type: 'weaver', text: 'Glitch signature accepted. Controlled entropy blooms across the weft — digital fractures alive with chromatic tension.' },
  ]);
  const [inputText, setInputText] = useState('');
  const [promptType, setPromptType] = useState('emotion');
  const [tapestryPhase, setTapestryPhase] = useState(0);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const tapestryGradients = [
    'conic-gradient(from 0deg at 35% 45%, #EC4899, #8B5CF6, #6366F1, #2563EB, #0EA5E9, #EC4899)',
    'conic-gradient(from 90deg at 60% 30%, #8B5CF6, #2563EB, #EC4899, #F97316, #6366F1, #8B5CF6)',
    'conic-gradient(from 200deg at 40% 65%, #2563EB, #0EA5E9, #8B5CF6, #EC4899, #6366F1, #2563EB)',
    'conic-gradient(from 300deg at 55% 40%, #6366F1, #EC4899, #0EA5E9, #2563EB, #8B5CF6, #6366F1)',
  ];
  useEffect(() => {
    const interval = setInterval(() => setTapestryPhase(p => (p + 1) % 4), 3200);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const handleSend = () => {
    if (!inputText.trim() || sending) return;
    const newMsg = { id: Date.now(), type: 'user', text: inputText, username: 'Aria_Weaver' };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setSending(true);
    setTimeout(() => {
      const responses = [
        'Weaving your essence into the tapestry... new patterns emerge as luminous threads across the canvas.',
        'The collective consciousness shifts. Your input resonates with 3 other weavers in harmonic alignment.',
        'Emotional signature integrated. The tapestry evolves with a new layer of textured depth.',
        'Your words become texture. Watch the eastern quadrant transform in real-time...',
        'Synthesizing... the Guild\'s collective voice grows stronger. The weave remembers.',
      ];
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'weaver', text: responses[Math.floor(Math.random() * responses.length)] }]);
      setSending(false);
    }, 1800);
  };
  const influenceActions = [
    { label: 'More Vibrant', color: '#EC4899' },
    { label: 'Minor Key', color: '#6366F1' },
    { label: 'Glitch', color: '#F97316' },
    { label: 'Slow Down', color: '#2563EB' },
    { label: 'Add Chaos', color: '#8B5CF6' },
    { label: 'Ethereal', color: '#0EA5E9' },
  ];
  const promptTypes = [{ id: 'emotion', label: 'Emotion' }, { id: 'keyword', label: 'Keyword' }, { id: 'melody', label: 'Melody' }];
  const { Send, Users, Sparkles } = icons;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }}>
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: tapestryGradients[tapestryPhase], transition: 'background 3s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 75%, rgba(249,115,22,0.25) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(37,99,235,0.3) 0%, transparent 55%)' }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', width: i % 2 === 0 ? 3 : 5, height: i % 2 === 0 ? 3 : 5, borderRadius: '50%', background: '#fff', top: `${15 + i * 12}%`, left: `${8 + i * 16}%`, animation: `pulse ${1 + i * 0.25}s infinite`, opacity: 0.7 }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Weaving in Progress</span>
            </div>
            <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0 }}>Neon Nostalgia #3</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: '2px 0 0' }}>Synthwave Dreamers · Session 3 of 5</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginBottom: 2 }}>
              <Users size={13} color="rgba(255,255,255,0.85)" />
              <span style={{ fontSize: 14, color: '#fff', fontWeight: 800 }}>47</span>
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', margin: 0 }}>weavers active</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 16px 8px', borderBottom: `1px solid ${t.border}`, flexShrink: 0, background: t.surface }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>Influence the Weave</p>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {influenceActions.map(action => (
            <button key={action.label} className="btn-press" onClick={() => { setInputText(action.label.toLowerCase()); }} style={{ flexShrink: 0, padding: '6px 12px', borderRadius: 20, cursor: 'pointer', border: `1.5px solid ${action.color}`, background: `${action.color}18`, fontSize: 12, fontWeight: 600, color: action.color, whiteSpace: 'nowrap' }}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', animation: 'slideUp 0.3s ease', flexDirection: msg.type === 'user' ? 'row-reverse' : 'row' }}>
            {msg.type === 'weaver' && (
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
                <Sparkles size={14} color="#fff" />
              </div>
            )}
            <div style={{ maxWidth: '75%' }}>
              {msg.type === 'weaver' && <p style={{ fontSize: 10, color: t.primary, fontWeight: 700, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Loom Weaver</p>}
              {msg.type === 'user' && <p style={{ fontSize: 10, color: t.textSecondary, fontWeight: 600, margin: '0 0 3px', textAlign: 'right' }}>{msg.username}</p>}
              <div style={{ padding: '10px 14px', borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.type === 'user' ? t.primary : t.surface, border: msg.type === 'weaver' ? `1px solid ${t.border}` : 'none', boxShadow: msg.type === 'user' ? `0 2px 12px ${t.primary}30` : 'none' }}>
                <p style={{ fontSize: 13, color: msg.type === 'user' ? '#fff' : t.text, margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        {sending && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={14} color="#fff" />
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: t.surface, border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: t.primary, animation: `pulse ${0.6 + i * 0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ padding: '8px 16px 12px', borderTop: `1px solid ${t.border}`, background: t.surface, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {promptTypes.map(pt => (
            <button key={pt.id} onClick={() => setPromptType(pt.id)} className="btn-press" style={{ padding: '5px 12px', borderRadius: 20, cursor: 'pointer', fontSize: 12, fontWeight: 600, border: `1.5px solid ${promptType === pt.id ? t.primary : t.border}`, background: promptType === pt.id ? `${t.primary}15` : 'transparent', color: promptType === pt.id ? t.primary : t.textSecondary }}>
              {pt.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder={promptType === 'emotion' ? 'e.g. melancholy euphoria...' : promptType === 'keyword' ? 'e.g. neon city rain...' : 'Hum or describe a melody...'} style={{ flex: 1, padding: '11px 15px', borderRadius: 14, border: `1.5px solid ${t.border}`, background: t.bg, color: t.text, fontSize: 14, outline: 'none', fontFamily: "'Inter', sans-serif" }} />
          <button onClick={handleSend} className="btn-press" style={{ width: 44, height: 44, borderRadius: 14, background: t.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${t.primary}40` }}>
            <Send size={18} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

function GalleryScreen({ theme: t, isDark, setIsDark, setActiveScreen, icons }) {
  const [activeFilter, setActiveFilter] = useState('guild');
  const [likedItems, setLikedItems] = useState(new Set([1, 4]));
  const { Heart, Eye, Layers } = icons;
  const filters = [
    { id: 'guild', label: 'My Guild' },
    { id: 'featured', label: 'Featured' },
    { id: 'all', label: 'All Guilds' },
    { id: 'spatial', label: '3D Explore' },
  ];
  const tapestries = [
    { id: 1, name: 'Neon Pulse #42', guild: 'Synthwave Dreamers', date: 'Apr 4', likes: 234, participants: 47, gradient: 'linear-gradient(135deg,#EC4899,#8B5CF6,#6366F1)', featured: true },
    { id: 2, name: 'Shadow Bloom #7', guild: 'Gothic Cyberpunks', date: 'Apr 3', likes: 189, participants: 31, gradient: 'linear-gradient(135deg,#7C3AED,#1E293B,#4338CA)' },
    { id: 3, name: 'Wave Theory #19', guild: 'Abstract Exp.', date: 'Apr 3', likes: 312, participants: 55, gradient: 'linear-gradient(135deg,#0EA5E9,#10B981,#22D3EE)', featured: true },
    { id: 4, name: 'Circuit Dreams #3', guild: 'Tech Surrealists', date: 'Apr 2', likes: 156, participants: 28, gradient: 'linear-gradient(135deg,#F97316,#2563EB,#7C3AED)' },
    { id: 5, name: 'Velvet Storm #11', guild: 'Synthwave Dreamers', date: 'Apr 1', likes: 278, participants: 42, gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899,#F97316)' },
    { id: 6, name: 'Glitch Garden #8', guild: 'Gothic Cyberpunks', date: 'Mar 31', likes: 201, participants: 36, gradient: 'linear-gradient(135deg,#4338CA,#0F172A,#6366F1)' },
  ];
  const toggleLike = id => {
    setLikedItems(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const myGuilds = ['Synthwave Dreamers', 'Gothic Cyberpunks'];
  const filteredItems = activeFilter === 'guild' ? tapestries.filter(item => myGuilds.includes(item.guild))
    : activeFilter === 'featured' ? tapestries.filter(item => item.featured || item.likes > 200)
    : tapestries;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 2px', letterSpacing: '-0.5px' }}>Echo Gallery</h1>
        <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 16px' }}>Collective tapestries from every ritual</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} className="btn-press" style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 20, cursor: 'pointer', border: `1.5px solid ${activeFilter === f.id ? t.primary : t.border}`, background: activeFilter === f.id ? t.primary : 'transparent', fontSize: 13, fontWeight: 600, color: activeFilter === f.id ? '#fff' : t.textSecondary }}>
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>
      {activeFilter === 'spatial' ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
          <div style={{ width: 260, height: 260, borderRadius: 24, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#EC4899,#8B5CF6,#2563EB)', boxShadow: '0 20px 60px rgba(139,92,246,0.4)', animation: 'weave 20s linear infinite' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 50%)' }} />
            <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(255,255,255,0.25)', borderRadius: 14 }} />
            <div style={{ position: 'absolute', inset: 38, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
            <div style={{ position: 'absolute', inset: 58, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4 }} />
            <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: 15, margin: 0 }}>Neon Pulse #42</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: '4px 0 0' }}>Synthwave Dreamers · 47 weavers</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Rotate', 'Zoom In', 'Immerse'].map(action => (
              <button key={action} className="btn-press" style={{ padding: '10px 16px', borderRadius: 14, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{action}</button>
            ))}
          </div>
          <p style={{ fontSize: 12, color: t.textSecondary, textAlign: 'center', lineHeight: 1.6, maxWidth: 280 }}>Spatial exploration unlocks the full dimensionality of each tapestry — walk through layers of collective expression.</p>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingBottom: 20 }}>
            {filteredItems.map(item => (
              <div key={item.id} className="card-hover btn-press" style={{ cursor: 'pointer', borderRadius: 16, overflow: 'hidden', background: t.surface, border: `1px solid ${t.border}` }}>
                <div style={{ height: 120, background: item.gradient, position: 'relative' }}>
                  {item.featured && <div style={{ position: 'absolute', top: 8, left: 8, background: '#F97316', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, color: '#fff' }}>Featured</div>}
                  <button onClick={e => { e.stopPropagation(); toggleLike(item.id); }} className="btn-press" style={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={13} color={likedItems.has(item.id) ? '#EC4899' : '#fff'} fill={likedItems.has(item.id) ? '#EC4899' : 'none'} />
                  </button>
                  <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '3px 7px' }}>
                    <Eye size={10} color="rgba(255,255,255,0.8)" />
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{item.participants}</span>
                  </div>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: t.textSecondary, margin: '0 0 6px' }}>{item.guild}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Heart size={11} color={t.textMuted} />
                      <span style={{ fontSize: 11, color: t.textMuted }}>{likedItems.has(item.id) ? item.likes + 1 : item.likes}</span>
                    </div>
                    <span style={{ fontSize: 10, color: t.textMuted }}>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GuildsScreen({ theme: t, isDark, setIsDark, setActiveScreen, icons }) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('mine');
  const { Search, Plus, Users, Globe, Lock, ChevronRight } = icons;
  const myGuilds = [
    { id: 1, name: 'Synthwave Dreamers', members: 1247, aesthetic: 'Retro Futurism', gradient: 'linear-gradient(135deg,#EC4899,#8B5CF6)', role: 'Elder Weaver', nextRitual: 'Live Now' },
    { id: 2, name: 'Gothic Cyberpunks', members: 893, aesthetic: 'Dark Digital', gradient: 'linear-gradient(135deg,#7C3AED,#1E293B)', role: 'Weaver', nextRitual: 'In 2h 30m' },
  ];
  const discoverGuilds = [
    { id: 3, name: 'Abstract Expressionists', members: 2156, aesthetic: 'Emotional Geometry', gradient: 'linear-gradient(135deg,#0EA5E9,#6366F1)', type: 'public', tags: ['Abstract', 'Emotion', 'Color'] },
    { id: 4, name: 'Lo-fi Dreamscapes', members: 3421, aesthetic: 'Ambient Melancholy', gradient: 'linear-gradient(135deg,#10B981,#0EA5E9)', type: 'public', tags: ['Lo-fi', 'Chill', 'Ambient'] },
    { id: 5, name: 'Glitch Philosophers', members: 567, aesthetic: 'Digital Corruption', gradient: 'linear-gradient(135deg,#F97316,#EF4444)', type: 'invite', tags: ['Glitch', 'Chaos', 'Art'] },
    { id: 6, name: 'Baroque Futurists', members: 789, aesthetic: 'Classical Digital', gradient: 'linear-gradient(135deg,#D97706,#7C3AED)', type: 'public', tags: ['Classical', 'Future', 'Ornate'] },
    { id: 7, name: 'Chromatic Nomads', members: 1103, aesthetic: 'Wandering Color', gradient: 'linear-gradient(135deg,#2563EB,#10B981)', type: 'public', tags: ['Color', 'Journey', 'Open'] },
  ];
  const filtered = discoverGuilds.filter(g => !searchText || g.name.toLowerCase().includes(searchText.toLowerCase()) || g.aesthetic.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.5px' }}>Loom Guilds</h1>
          <button className="btn-press" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 14, background: '#F97316', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(249,115,22,0.35)' }}>
            <Plus size={16} color="#fff" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Create</span>
          </button>
        </div>
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <Search size={16} color={t.textMuted} />
          </div>
          <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search guilds by aesthetic..." style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 14, border: `1.5px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 14, outline: 'none', fontFamily: "'Inter',sans-serif", boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 4, background: t.surfaceAlt, borderRadius: 12, padding: 4, marginBottom: 4 }}>
          {[{ id: 'mine', label: 'My Guilds' }, { id: 'discover', label: 'Discover' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="btn-press" style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', cursor: 'pointer', background: activeTab === tab.id ? t.surface : 'transparent', color: activeTab === tab.id ? t.text : t.textSecondary, fontSize: 14, fontWeight: 600, boxShadow: activeTab === tab.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 0' }}>
        {activeTab === 'mine' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 20 }}>
            {myGuilds.map(guild => (
              <div key={guild.id} className="card-hover" style={{ background: t.surface, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.border}` }}>
                <div style={{ height: 72, background: guild.gradient, position: 'relative' }}>
                  {guild.nextRitual === 'Live Now' && (
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: '4px 10px' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', animation: 'pulse 1.5s infinite' }} />
                      <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>Live Now</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>{guild.name}</h3>
                      <p style={{ fontSize: 12, color: t.textSecondary, margin: 0 }}>{guild.aesthetic}</p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: t.primary, background: `${t.primary}15`, padding: '4px 9px', borderRadius: 8 }}>{guild.role}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Users size={13} color={t.textMuted} />
                      <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{guild.members.toLocaleString()} members</span>
                    </div>
                    <button onClick={() => setActiveScreen('ritual')} className="btn-press" style={{ padding: '7px 14px', borderRadius: 10, background: guild.nextRitual === 'Live Now' ? t.primary : t.surfaceAlt, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: guild.nextRitual === 'Live Now' ? '#fff' : t.textSecondary }}>
                      {guild.nextRitual === 'Live Now' ? 'Join Ritual' : guild.nextRitual}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
            <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 4px' }}>Explore communities by aesthetic</p>
            {filtered.map(guild => (
              <div key={guild.id} className="card-hover" style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: guild.gradient, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{guild.name}</h3>
                    {guild.type === 'invite' ? <Lock size={11} color={t.textMuted} /> : <Globe size={11} color={t.textMuted} />}
                  </div>
                  <p style={{ fontSize: 11, color: t.textSecondary, margin: '0 0 6px' }}>{guild.members.toLocaleString()} members</p>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {guild.tags.map(tag => <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: t.primary, background: `${t.primary}12`, padding: '2px 7px', borderRadius: 6 }}>{tag}</span>)}
                  </div>
                </div>
                <button className="btn-press" style={{ padding: '8px 14px', borderRadius: 10, background: guild.type === 'invite' ? 'transparent' : t.primary, border: guild.type === 'invite' ? `1.5px solid ${t.border}` : 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: guild.type === 'invite' ? t.textSecondary : '#fff', flexShrink: 0 }}>
                  {guild.type === 'invite' ? 'Request' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const themes = {
    light: { bg: '#F8FAFC', surface: '#FFFFFF', surfaceAlt: '#F1F5F9', border: '#E2E8F0', text: '#0F172A', textSecondary: '#64748B', textMuted: '#94A3B8', primary: '#2563EB', secondary: '#3B82F6', cta: '#F97316', navBg: '#FFFFFF' },
    dark: { bg: '#020617', surface: '#0F172A', surfaceAlt: '#1E293B', border: '#1E293B', text: '#F8FAFC', textSecondary: '#94A3B8', textMuted: '#475569', primary: '#3B82F6', secondary: '#2563EB', cta: '#F97316', navBg: '#080E1E' },
  };

  const t = isDark ? themes.dark : themes.light;
  const { Home, Sparkles, Layers, Users, Moon, Sun, Bell, ChevronRight, Play, Heart, Star, Zap, Music, Globe, Lock, Plus, Search, Clock, Radio, Send, Eye, Share2, Filter, Hash } = window.lucide;
  const icons = { Home, Sparkles, Layers, Users, Moon, Sun, Bell, ChevronRight, Play, Heart, Star, Zap, Music, Globe, Lock, Plus, Search, Clock, Radio, Send, Eye, Share2, Filter, Hash };

  const screens = { home: HomeScreen, ritual: RitualScreen, gallery: GalleryScreen, guilds: GuildsScreen };
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ritual', label: 'Ritual', icon: Sparkles },
    { id: 'gallery', label: 'Gallery', icon: Layers },
    { id: 'guilds', label: 'Guilds', icon: Users },
  ];
  const CurrentScreen = screens[activeScreen];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes weave { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.06); } 100% { transform: rotate(360deg) scale(1); } }
        @keyframes tapestryFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.12) !important; }
        .btn-press { transition: transform 0.1s ease; }
        .btn-press:active { transform: scale(0.95); }
      `}</style>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease' }}>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <CurrentScreen theme={t} isDark={isDark} setIsDark={setIsDark} setActiveScreen={setActiveScreen} icons={icons} />
        </div>
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', padding: '8px 0 22px', transition: 'background 0.3s ease', boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.5)' : '0 -2px 12px rgba(0,0,0,0.06)' }}>
          {navItems.map(item => {
            const IconComp = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button key={item.id} onClick={() => setActiveScreen(item.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', minHeight: 44 }}>
                <div style={{ position: 'relative' }}>
                  <IconComp size={22} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />
                  {item.id === 'ritual' && <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite' }} />}
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? t.primary : t.textMuted }}>
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
